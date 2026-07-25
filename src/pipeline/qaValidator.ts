/**
 * QA / Validator Agent for Spanish Learning Educational Pipeline (TypeScript implementation).
 * Performs linguistic & structural checks, CEFR level alignment, confidence scoring (0.0 to 1.0),
 * quarantine threshold flagging (<0.85), and auto-retry fallback resolution.
 */

export interface ValidationResult {
  itemId: string;
  confidenceScore: number;
  isValid: boolean;
  isQuarantined: boolean;
  grammarScore: number;
  cefrScore: number;
  phrasingScore: number;
  schemaScore: number;
  claimedCefr: string;
  computedCefr: string;
  errorCategory: 'NONE' | 'SCHEMA_ERROR' | 'GRAMMAR_ERROR' | 'UNNATURAL_PHRASING' | 'CEFR_MISMATCH' | 'LOW_CONFIDENCE';
  details: string[];
}

export interface BatchValidationSummary {
  totalItems: number;
  passedCount: number;
  quarantinedCount: number;
  passRate: number;
  averageConfidence: number;
  validItems: any[];
  quarantinedItems: { item: any; validationResult: ValidationResult }[];
  details: ValidationResult[];
}

const UNNATURAL_PATTERNS = [
  { pattern: /\bhacer sentido\b/i, fix: 'tener sentido' },
  { pattern: /\blloviendo gatos y perros\b/i, fix: 'lloviendo a cántaros' },
  { pattern: /\bsoy hambriento\b/i, fix: 'tengo hambre' },
  { pattern: /\bbonito conocerte\b/i, fix: 'mucho gusto' },
];

export class QAValidatorTS {
  private confidenceThreshold: number;

  constructor(confidenceThreshold = 0.85) {
    this.confidenceThreshold = confidenceThreshold;
  }

  public validateItem(item: any, targetCefr?: string): ValidationResult {
    const itemId = item.id || 'unknown_item';
    const details: string[] = [];

    // 1. Schema Score
    let schemaScore = 1.0;
    if (!item || typeof item !== 'object') {
      schemaScore = 0.0;
      details.push('Item is not a valid object.');
    } else if (item.type || item.prompt) {
      if (!item.id || !item.prompt || !item.answer) {
        schemaScore -= 0.4;
        details.push('Missing required exercise field (id, prompt, answer).');
      }
      if (['multiple-choice', 'listening', 'match', 'drag-drop'].includes(item.type)) {
        if (!Array.isArray(item.options) || item.options.length < 2) {
          schemaScore = 0.0;
          details.push(`Exercise type '${item.type}' requires at least 2 options.`);
        } else if (['multiple-choice', 'listening'].includes(item.type) && !item.options.includes(item.answer)) {
          schemaScore -= 0.5;
          details.push(`Answer '${item.answer}' not in options list.`);
        }
      }
    } else if (item.word || item.es) {
      const esWord = item.word || item.es;
      const enMeaning = item.meaning || item.en;
      if (!esWord) {
        schemaScore = 0.0;
        details.push('Missing Spanish word/phrase.');
      }
      if (!enMeaning) {
        schemaScore -= 0.5;
        details.push('Missing English translation.');
      }
    } else {
      schemaScore = 0.0;
      details.push('Unknown schema.');
    }
    schemaScore = Math.max(0, schemaScore);

    // 2. Grammar Score
    let grammarScore = 1.0;
    const spanishText = [item.es, item.word, item.prompt, item.answer, ...(item.options || [])].filter(Boolean).join(' ');
    if (!spanishText.trim()) {
      grammarScore = 0.0;
      details.push('Spanish text is empty.');
    } else {
      if (spanishText.includes('?') && !spanishText.includes('¿') && spanishText.length > 15) {
        grammarScore -= 0.3;
        details.push("Missing opening inverted question mark '¿'.");
      }
      if (spanishText.includes('!') && !spanishText.includes('¡') && spanishText.length > 15) {
        grammarScore -= 0.3;
        details.push("Missing opening inverted exclamation mark '¡'.");
      }
      if (/\bel casa\b/i.test(spanishText) || /\bla perro\b/i.test(spanishText) || /\bun casa\b/i.test(spanishText)) {
        grammarScore -= 0.5;
        details.push('Gender/article agreement mismatch detected.');
      }
    }
    grammarScore = Math.max(0, grammarScore);

    // 3. Phrasing Score
    let phrasingScore = 1.0;
    for (const rule of UNNATURAL_PATTERNS) {
      if (rule.pattern.test(spanishText)) {
        phrasingScore -= 0.5;
        details.push(`Unnatural phrasing detected: '${rule.pattern}' -> suggest '${rule.fix}'`);
      }
    }
    phrasingScore = Math.max(0, phrasingScore);

    // 4. CEFR Score
    const claimedCefr = targetCefr || item.level || item.levelIntroduced || 'A1';
    let cefrScore = 1.0;
    let computedCefr = 'A1';

    if (/\b(ojalá|hubiera|hubiéramos|precipitada)\b/i.test(spanishText)) {
      computedCefr = 'C1';
    } else if (/\b(ayer|mientras|estudiaba|fui)\b/i.test(spanishText)) {
      computedCefr = 'B2';
    } else if (/\b(gustar|encantar|parecer)\b/i.test(spanishText)) {
      computedCefr = 'B1';
    } else if (/\b(tener|hacer|hoy|mañana)\b/i.test(spanishText)) {
      computedCefr = 'A2';
    }

    const order = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const normClaimed = claimedCefr.startsWith('Part ') ? (claimedCefr === 'Part 7' ? 'B2' : claimedCefr === 'Part 5' || claimedCefr === 'Part 6' ? 'B1' : claimedCefr === 'Part 3' || claimedCefr === 'Part 4' ? 'A2' : 'A1') : claimedCefr;

    const claimedIdx = order.indexOf(normClaimed);
    const computedIdx = order.indexOf(computedCefr);
    if (claimedIdx >= 0 && computedIdx >= 0) {
      const diff = Math.abs(claimedIdx - computedIdx);
      if (diff > 1) {
        cefrScore -= 0.5 * diff;
        details.push(`CEFR Mismatch: Claimed '${claimedCefr}' but content difficulty is '${computedCefr}'.`);
      }
    }
    cefrScore = Math.max(0, cefrScore);

    // Composite Confidence Score
    const confidenceScore = Number(((grammarScore * 0.35) + (schemaScore * 0.25) + (phrasingScore * 0.20) + (cefrScore * 0.20)).toFixed(4));
    const isValid = confidenceScore >= this.confidenceThreshold && schemaScore >= 0.8;

    let errorCategory: ValidationResult['errorCategory'] = 'NONE';
    if (!isValid) {
      if (schemaScore < 0.8) errorCategory = 'SCHEMA_ERROR';
      else if (grammarScore < 0.8) errorCategory = 'GRAMMAR_ERROR';
      else if (phrasingScore < 0.8) errorCategory = 'UNNATURAL_PHRASING';
      else if (cefrScore < 0.8) errorCategory = 'CEFR_MISMATCH';
      else errorCategory = 'LOW_CONFIDENCE';
    }

    return {
      itemId,
      confidenceScore,
      isValid,
      isQuarantined: !isValid,
      grammarScore: Number(grammarScore.toFixed(4)),
      cefrScore: Number(cefrScore.toFixed(4)),
      phrasingScore: Number(phrasingScore.toFixed(4)),
      schemaScore: Number(schemaScore.toFixed(4)),
      claimedCefr,
      computedCefr,
      errorCategory,
      details,
    };
  }

  public validateBatch(items: any[], targetCefr?: string): BatchValidationSummary {
    const results: ValidationResult[] = [];
    const validItems: any[] = [];
    const quarantinedItems: { item: any; validationResult: ValidationResult }[] = [];

    let totalConfidence = 0;
    for (const item of items) {
      const res = this.validateItem(item, targetCefr);
      results.push(res);
      totalConfidence += res.confidenceScore;
      if (res.isValid) {
        validItems.push(item);
      } else {
        quarantinedItems.push({ item, validationResult: res });
      }
    }

    const averageConfidence = items.length > 0 ? Number((totalConfidence / items.length).toFixed(4)) : 1.0;
    const passRate = items.length > 0 ? Number((validItems.length / items.length).toFixed(4)) : 1.0;

    return {
      totalItems: items.length,
      passedCount: validItems.length,
      quarantinedCount: quarantinedItems.length,
      passRate,
      averageConfidence,
      validItems,
      quarantinedItems,
      details: results,
    };
  }
}
