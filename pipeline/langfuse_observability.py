"""
Langfuse Observability Layer for Spanish Learning Educational Pipeline.
Integrates Langfuse SDK for end-to-end tracing and monitoring of every agent execution:
1. Extraction span (marker-pdf / chonkie latency, chunk count, file size)
2. Generation span (DSPy / Instructor / Gemini model call latencies, token usages, model names)
3. QA Validation span (confidence scores, pass/fail status, error categories)
4. Mixer span (content distribution counts per feature)
"""

import json
import os
import time
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone

try:
    from langfuse import Langfuse
    LANGFUSE_AVAILABLE = True
except ImportError:
    LANGFUSE_AVAILABLE = False


class LangfuseObservability:
    """Observability wrapper using Langfuse SDK with local fallback logging."""

    def __init__(self, log_dir: str = "pipeline/logs"):
        self.log_dir = log_dir
        os.makedirs(log_dir, exist_ok=True)
        self.local_trace_log = os.path.join(log_dir, "langfuse_trace_logs.json")

        self.public_key = os.getenv("LANGFUSE_PUBLIC_KEY", "pk-lf-mock-key-12345")
        self.secret_key = os.getenv("LANGFUSE_SECRET_KEY", "sk-lf-mock-key-67890")
        self.host = os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")

        self.client = None
        if LANGFUSE_AVAILABLE and os.getenv("LANGFUSE_PUBLIC_KEY") and not self.public_key.startswith("pk-lf-mock"):
            try:
                self.client = Langfuse(
                    public_key=self.public_key,
                    secret_key=self.secret_key,
                    base_url=self.host
                )
            except Exception as e:
                print(f"[LangfuseObservability] Initialized in local trace mode: {e}")

    def _get_utc_timestamp(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def create_pipeline_trace(self, trace_name: str = "spanish_educational_pipeline", metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Initialize a new pipeline trace record."""
        trace_id = f"trace-{int(time.time() * 1000)}"
        timestamp = self._get_utc_timestamp()

        trace_data = {
            "trace_id": trace_id,
            "name": trace_name,
            "timestamp": timestamp,
            "metadata": metadata or {},
            "spans": [],
            "status": "RUNNING"
        }

        return trace_data

    def log_extraction_span(
        self,
        trace_data: Dict[str, Any],
        pdf_path: str,
        file_size_bytes: int,
        chunk_count: int,
        latency_ms: float,
        extractor_tool: str = "python_word_splitter"
    ) -> Dict[str, Any]:
        """
        Record Extraction Span metrics:
        marker-pdf / chonkie latency, chunk count, file size, input PDF path.
        """
        span_data = {
            "span_name": "extraction_span",
            "extractor_tool": extractor_tool,
            "pdf_path": pdf_path,
            "file_size_bytes": file_size_bytes,
            "file_size_mb": round(file_size_bytes / (1024 * 1024), 2),
            "chunk_count": chunk_count,
            "latency_ms": round(latency_ms, 2),
            "timestamp": self._get_utc_timestamp()
        }

        trace_data["spans"].append(span_data)

        if self.client:
            try:
                obs = self.client.start_observation(
                    name="extraction_span",
                    as_type="span",
                    input={"pdf_path": pdf_path, "file_size_bytes": file_size_bytes},
                    output={"chunk_count": chunk_count},
                    metadata={
                        "extractor_tool": extractor_tool,
                        "latency_ms": latency_ms,
                        "file_size_mb": span_data["file_size_mb"]
                    }
                )
                if hasattr(obs, "end"):
                    obs.end()
            except Exception as e:
                print(f"[Langfuse Span Note - Extraction] {e}")

        return span_data

    def log_generation_span(
        self,
        trace_data: Dict[str, Any],
        model_name: str,
        prompt_tokens: int,
        completion_tokens: int,
        latency_ms: float,
        items_generated: int,
        framework: str = "Pydantic Engine"
    ) -> Dict[str, Any]:
        """
        Record Generation Span metrics:
        DSPy / Instructor / Gemini model call latencies, token usages, model names.
        """
        total_tokens = prompt_tokens + completion_tokens

        span_data = {
            "span_name": "generation_span",
            "framework": framework,
            "model_name": model_name,
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens": total_tokens,
            "items_generated": items_generated,
            "latency_ms": round(latency_ms, 2),
            "timestamp": self._get_utc_timestamp()
        }

        trace_data["spans"].append(span_data)

        if self.client:
            try:
                obs = self.client.start_observation(
                    name="generation_span",
                    as_type="generation",
                    model=model_name,
                    usage_details={"prompt_tokens": prompt_tokens, "completion_tokens": completion_tokens, "total_tokens": total_tokens},
                    metadata={
                        "framework": framework,
                        "items_generated": items_generated,
                        "latency_ms": latency_ms
                    }
                )
                if hasattr(obs, "end"):
                    obs.end()
            except Exception as e:
                print(f"[Langfuse Span Note - Generation] {e}")

        return span_data

    def log_qa_validation_span(
        self,
        trace_data: Dict[str, Any],
        total_items: int,
        passed_items: int,
        quarantined_items: int,
        avg_confidence: float,
        latency_ms: float,
        error_categories: Dict[str, int]
    ) -> Dict[str, Any]:
        """
        Record QA Validation Span metrics:
        Confidence scores, pass/fail status, error categories, quarantine counts.
        """
        pass_rate = round(passed_items / total_items, 4) if total_items > 0 else 1.0

        span_data = {
            "span_name": "qa_validation_span",
            "total_items": total_items,
            "passed_items": passed_items,
            "quarantined_items": quarantined_items,
            "pass_rate": pass_rate,
            "average_confidence": round(avg_confidence, 4),
            "latency_ms": round(latency_ms, 2),
            "error_categories": error_categories,
            "timestamp": self._get_utc_timestamp()
        }

        trace_data["spans"].append(span_data)

        if self.client:
            try:
                obs = self.client.start_observation(
                    name="qa_validation_span",
                    as_type="span",
                    input={"total_items": total_items},
                    output={
                        "passed_items": passed_items,
                        "quarantined_items": quarantined_items,
                        "pass_rate": pass_rate,
                        "average_confidence": avg_confidence
                    },
                    metadata={
                        "error_categories": error_categories,
                        "latency_ms": latency_ms
                    }
                )
                if hasattr(obs, "end"):
                    obs.end()
            except Exception as e:
                print(f"[Langfuse Span Note - QA Validation] {e}")

        return span_data

    def log_mixer_span(
        self,
        trace_data: Dict[str, Any],
        distribution_counts: Dict[str, int],
        total_distributed: int,
        latency_ms: float
    ) -> Dict[str, Any]:
        """
        Record Mixer Span metrics:
        Content distribution counts per feature across the 8 web features.
        """
        span_data = {
            "span_name": "mixer_span",
            "total_distributed_items": total_distributed,
            "distribution_counts_per_feature": distribution_counts,
            "latency_ms": round(latency_ms, 2),
            "timestamp": self._get_utc_timestamp()
        }

        trace_data["spans"].append(span_data)

        if self.client:
            try:
                obs = self.client.start_observation(
                    name="mixer_span",
                    as_type="span",
                    input={"total_distributed": total_distributed},
                    output=distribution_counts,
                    metadata={"latency_ms": latency_ms}
                )
                if hasattr(obs, "end"):
                    obs.end()
            except Exception as e:
                print(f"[Langfuse Span Note - Mixer] {e}")

        return span_data

    def finalize_trace(self, trace_data: Dict[str, Any], status: str = "COMPLETED") -> Dict[str, Any]:
        """Finalize and save trace logs locally and flush Langfuse SDK buffer."""
        trace_data["status"] = status
        trace_data["end_timestamp"] = self._get_utc_timestamp()

        logs = []
        if os.path.exists(self.local_trace_log):
            try:
                with open(self.local_trace_log, "r", encoding="utf-8") as f:
                    logs = json.load(f)
            except Exception:
                logs = []

        logs.append(trace_data)

        with open(self.local_trace_log, "w", encoding="utf-8") as f:
            json.dump(logs, f, indent=2, ensure_ascii=False)

        if self.client:
            try:
                self.client.flush()
            except Exception as e:
                print(f"[Langfuse Flush Note] {e}")

        return trace_data
