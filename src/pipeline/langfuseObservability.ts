/**
 * Langfuse Observability Layer (TypeScript implementation).
 * Provides structured telemetry span creation for Extraction, Generation,
 * QA Validation, and Content Mixer spans across web app interactions.
 */

export interface TraceSpan {
  spanName: string;
  timestamp: string;
  latencyMs: number;
  [key: string]: any;
}

export interface PipelineTrace {
  traceId: string;
  name: string;
  timestamp: string;
  metadata: Record<string, any>;
  spans: TraceSpan[];
  status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  endTimestamp?: string;
}

export class LangfuseObservabilityTS {
  private traces: PipelineTrace[] = [];

  public createPipelineTrace(name = 'spanish_educational_pipeline', metadata: Record<string, any> = {}): PipelineTrace {
    const trace: PipelineTrace = {
      traceId: `trace-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      timestamp: new Date().toISOString(),
      metadata,
      spans: [],
      status: 'RUNNING',
    };
    this.traces.push(trace);
    return trace;
  }

  public logExtractionSpan(
    trace: PipelineTrace,
    pdfPath: string,
    fileSizeBytes: number,
    chunkCount: number,
    latencyMs: number,
    extractorTool = 'marker-pdf + chonkie'
  ): TraceSpan {
    const span: TraceSpan = {
      spanName: 'extraction_span',
      extractorTool,
      pdfPath,
      fileSizeBytes,
      fileSizeMb: Number((fileSizeBytes / (1024 * 1024)).toFixed(2)),
      chunkCount,
      latencyMs: Number(latencyMs.toFixed(2)),
      timestamp: new Date().toISOString(),
    };
    trace.spans.push(span);
    return span;
  }

  public logGenerationSpan(
    trace: PipelineTrace,
    modelName: string,
    promptTokens: number,
    completionTokens: number,
    latencyMs: number,
    itemsGenerated: number,
    framework = 'DSPy + Instructor + Gemini'
  ): TraceSpan {
    const span: TraceSpan = {
      spanName: 'generation_span',
      framework,
      modelName,
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      itemsGenerated,
      latencyMs: Number(latencyMs.toFixed(2)),
      timestamp: new Date().toISOString(),
    };
    trace.spans.push(span);
    return span;
  }

  public logQAValidationSpan(
    trace: PipelineTrace,
    totalItems: number,
    passedItems: number,
    quarantinedItems: number,
    avgConfidence: number,
    latencyMs: number,
    errorCategories: Record<string, number>
  ): TraceSpan {
    const span: TraceSpan = {
      spanName: 'qa_validation_span',
      totalItems,
      passedItems,
      quarantinedItems,
      passRate: totalItems > 0 ? Number((passedItems / totalItems).toFixed(4)) : 1.0,
      averageConfidence: Number(avgConfidence.toFixed(4)),
      latencyMs: Number(latencyMs.toFixed(2)),
      errorCategories,
      timestamp: new Date().toISOString(),
    };
    trace.spans.push(span);
    return span;
  }

  public logMixerSpan(
    trace: PipelineTrace,
    distributionCounts: Record<string, number>,
    totalDistributed: number,
    latencyMs: number
  ): TraceSpan {
    const span: TraceSpan = {
      spanName: 'mixer_span',
      totalDistributedItems: totalDistributed,
      distributionCountsPerFeature: distributionCounts,
      latencyMs: Number(latencyMs.toFixed(2)),
      timestamp: new Date().toISOString(),
    };
    trace.spans.push(span);
    return span;
  }

  public finalizeTrace(trace: PipelineTrace, status: 'COMPLETED' | 'FAILED' = 'COMPLETED'): PipelineTrace {
    trace.status = status;
    trace.endTimestamp = new Date().toISOString();
    return trace;
  }

  public getTraces(): PipelineTrace[] {
    return this.traces;
  }
}
