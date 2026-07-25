"""
QA / Validator Agent for Spanish Learning Educational Pipeline.
Verifies Spanish grammar, spelling, natural phrasing, CEFR difficulty,
computes confidence scores (0.0 to 1.0), and enforces a quarantine mechanism (<0.85)
with auto-retry loops and fallback prompt generation.
"""

import json
import os
import re
from typing import Dict, List, Any, Optional, Tuple

# Valid CEFR levels
CEFR_LEVELS = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2", "Part 1", "Part 2", "Part 3", "Part 4", "Part 5", "Part 6", "Part 7"]

# Common unnatural or literal English -> Spanish translation mistakes
UNNATURAL_PATTERNS = [
    (r"\bhacer sentido\b", "tener sentido"),
    (r"\blloviendo gatos y perros\b", "lloviendo a cántaros"),
    (r"\bsoy hambriento\b", "tengo hambre"),
    (r"\bsoy caliente\b", "tengo calor"),
    (r"\bsoy frío\b", "tengo frío"),
    (r"\bsoy miedo\b", "tengo miedo"),
    (r"\bsoy 20 años\b", "tengo 20 años"),
    (r"\bordenar comida\b", "pedir comida"),
    (r"\bllamar para atrás\b", "devolver la llamada"),
    (r"\bcorrer para presidente\b", "postularse a la presidencia"),
    (r"\bbonito conocerte\b", "mucho gusto / un placer conocerte"),
    (r"\bembarazada\b.*(embarrassed|avergonzad)", "embarazada means pregnant, not embarrassed"),
]

# Vocabulary indicators for CEFR difficulty heuristics
A1_VOCAB_INDICATORS = {
    "hola", "adiós", "buenos", "días", "tardes", "noches", "gracias", "por", "favor",
    "sí", "no", "yo", "tú", "él", "ella", "nosotros", "ser", "estar", "uno", "dos", "tres",
    "casa", "perro", "gato", "agua", "comer", "beber", "amigo", "libro", "me", "te", "mi", "tu", "llamo", "llamas"
}

A2_VOCAB_INDICATORS = {
    "hoy", "mañana", "ayer", "semana", "mes", "año", "tiempo", "hora", "fecha",
    "tener", "hacer", "ir", "venir", "poder", "querer", "familia", "trabajo", "ciudad",
    "desayuno", "almuerzo", "cena", "autobús", "tren", "comprar", "viajar"
}

B1_VOCAB_INDICATORS = {
    "gustar", "encantar", "parecer", "molestar", "levantarse", "ducharse", "vestirse",
    "siempre", "nunca", "también", "tampoco", "alguno", "ninguno", "mientras", "aunque"
}

B2_VOCAB_INDICATORS = {
    "ayer", "anoche", "mientras", "cuando", "estudiaba", "hacía", "fui", "estuve", "tuve",
    "hice", "dije", "vine", "quise", "comparado", "mayor", "menor", "mejor", "peor",
    "sin embargo", "por lo tanto", "debido a", "en cambio", "a pesar de"
}

C1_VOCAB_INDICATORS = {
    "ojalá", "tal vez", "quizás", "espero que", "dudo que", "para que", "a menos que",
    "con tal de que", "hubiera", "hubiese", "haya", "tenga", "haga", "pueda", "venga",
    "imprescindible", "paradigma", "exhaustivo", "desenlace", "paulatinamente"
}


class ValidationResult:
    """Holds detailed evaluation results for a single content item."""
    def __init__(
        self,
        item_id: str,
        confidence_score: float,
        is_valid: bool,
        grammar_score: float,
        cefr_score: float,
        phrasing_score: float,
        schema_score: float,
        claimed_cefr: str,
        computed_cefr: str,
        error_category: str = "NONE",
        details: Optional[List[str]] = None
    ):
        self.item_id = item_id
        self.confidence_score = round(confidence_score, 4)
        self.is_valid = is_valid
        self.grammar_score = round(grammar_score, 4)
        self.cefr_score = round(cefr_score, 4)
        self.phrasing_score = round(phrasing_score, 4)
        self.schema_score = round(schema_score, 4)
        self.claimed_cefr = claimed_cefr
        self.computed_cefr = computed_cefr
        self.error_category = error_category
        self.details = details or []

    def to_dict(self) -> Dict[str, Any]:
        return {
            "item_id": self.item_id,
            "confidence_score": self.confidence_score,
            "is_valid": self.is_valid,
            "is_quarantined": not self.is_valid,
            "grammar_score": self.grammar_score,
            "cefr_score": self.cefr_score,
            "phrasing_score": self.phrasing_score,
            "schema_score": self.schema_score,
            "claimed_cefr": self.claimed_cefr,
            "computed_cefr": self.computed_cefr,
            "error_category": self.error_category,
            "details": self.details,
        }


class QAValidator:
    """Linguistic and structural QA validator agent."""

    def __init__(self, confidence_threshold: float = 0.85):
        self.confidence_threshold = confidence_threshold

    def validate_item(self, item: Dict[str, Any], target_cefr: Optional[str] = None) -> ValidationResult:
        """
        Validate an exercise or vocabulary item.
        Determines structural, grammatical, CEFR alignment, and natural phrasing scores.
        """
        item_id = item.get("id", "unknown_item")
        details = []

        # 1. Schema & Structural Validation
        schema_score, schema_errors = self._evaluate_schema(item)
        if schema_errors:
            details.extend(schema_errors)

        # 2. Grammar, Spelling & Orthography
        spanish_text = self._extract_spanish_text(item)
        grammar_score, grammar_errors = self._evaluate_spanish_grammar(spanish_text)
        if grammar_errors:
            details.extend(grammar_errors)

        # 3. Natural Phrasing & Idiomatic Correctness
        phrasing_score, phrasing_errors = self._evaluate_natural_phrasing(spanish_text)
        if phrasing_errors:
            details.extend(phrasing_errors)

        # 4. CEFR Difficulty Tag Validation
        claimed_level = target_cefr or item.get("level") or item.get("levelIntroduced") or "A1"
        computed_level, cefr_score, cefr_errors = self._evaluate_cefr_level(spanish_text, claimed_level)
        if cefr_errors:
            details.extend(cefr_errors)

        # 5. Composite Confidence Score Calculation
        # Weights: Grammar (0.35), Schema (0.25), Phrasing (0.20), CEFR (0.20)
        confidence_score = (
            (grammar_score * 0.35) +
            (schema_score * 0.25) +
            (phrasing_score * 0.20) +
            (cefr_score * 0.20)
        )

        is_valid = (confidence_score >= self.confidence_threshold) and (schema_score >= 0.8)

        # Classify Primary Error Category
        error_category = "NONE"
        if not is_valid:
            if schema_score < 0.8:
                error_category = "SCHEMA_ERROR"
            elif grammar_score < 0.8:
                error_category = "GRAMMAR_ERROR"
            elif phrasing_score < 0.8:
                error_category = "UNNATURAL_PHRASING"
            elif cefr_score < 0.8:
                error_category = "CEFR_MISMATCH"
            else:
                error_category = "LOW_CONFIDENCE"

        return ValidationResult(
            item_id=item_id,
            confidence_score=confidence_score,
            is_valid=is_valid,
            grammar_score=grammar_score,
            cefr_score=cefr_score,
            phrasing_score=phrasing_score,
            schema_score=schema_score,
            claimed_cefr=claimed_level,
            computed_cefr=computed_level,
            error_category=error_category,
            details=details,
        )

    def _evaluate_schema(self, item: Dict[str, Any]) -> Tuple[float, List[str]]:
        """Validate JSON schema compliance for exercises and vocabulary items."""
        errors = []
        score = 1.0

        if not isinstance(item, dict):
            return 0.0, ["Item is not a valid dictionary object."]

        # Check if it's an Exercise or VocabWord
        if "type" in item or "prompt" in item:
            required_fields = ["id", "prompt", "answer"]
            for field in required_fields:
                if field not in item or not item[field]:
                    errors.append(f"Missing required exercise field: '{field}'")
                    score -= 0.4

            ex_type = item.get("type", "multiple-choice")
            if ex_type in ["multiple-choice", "listening", "match", "drag-drop"]:
                options = item.get("options")
                if not isinstance(options, list) or len(options) < 2:
                    errors.append(f"Exercise type '{ex_type}' requires at least 2 options.")
                    score = 0.0
                elif item.get("answer") not in options and ex_type in ["multiple-choice", "listening"]:
                    errors.append(f"Exercise answer '{item.get('answer')}' is not included in options.")
                    score -= 0.5
        elif "word" in item or "es" in item:
            es_word = item.get("word") or item.get("es")
            en_meaning = item.get("meaning") or item.get("en")

            if not es_word:
                errors.append("Missing Spanish word/phrase ('word' or 'es').")
                score = 0.0
            if not en_meaning:
                errors.append("Missing English translation ('meaning' or 'en').")
                score -= 0.5
        else:
            errors.append("Unknown content schema: missing exercise or vocabulary fields.")
            score = 0.0

        return max(0.0, score), errors

    def _extract_spanish_text(self, item: Dict[str, Any]) -> str:
        """Extract all Spanish text from an exercise or vocab item for linguistic analysis."""
        texts = []
        if "es" in item:
            texts.append(str(item["es"]))
        if "word" in item:
            texts.append(str(item["word"]))
        if "example" in item:
            texts.append(str(item["example"]))
        if "prompt" in item:
            texts.append(str(item["prompt"]))
        if "answer" in item and isinstance(item["answer"], str):
            texts.append(str(item["answer"]))
        if "options" in item and isinstance(item["options"], list):
            texts.extend([str(opt) for opt in item["options"]])

        return " ".join(texts)

    def _evaluate_spanish_grammar(self, text: str) -> Tuple[float, List[str]]:
        """Verify Spanish orthography, diacritical marks, and basic grammatical constraints."""
        errors = []
        score = 1.0

        if not text.strip():
            return 0.0, ["Spanish text is empty."]

        # Check for missing opening inverted marks in questions or exclamations
        if "?" in text and "¿" not in text and len(text) > 15:
            errors.append("Question mark '?' found without opening inverted '¿'.")
            score -= 0.3
        if "!" in text and "¡" not in text and len(text) > 15:
            errors.append("Exclamation mark '!' found without opening inverted '¡'.")
            score -= 0.3

        # Check for common article-noun agreement mismatches
        mismatches = [
            (r"\bel casa\b", "el casa -> la casa"),
            (r"\bla perro\b", "la perro -> el perro"),
            (r"\bun casa\b", "un casa -> una casa"),
            (r"\buna perro\b", "una perro -> un perro"),
            (r"\blos casa\b", "los casa -> las casas"),
            (r"\blas perro\b", "las perro -> los perros"),
        ]

        for pattern, correction in mismatches:
            if re.search(pattern, text, re.IGNORECASE):
                errors.append(f"Gender agreement mismatch detected: {correction}")
                score -= 0.5

        if "  " in text:
            score -= 0.1

        return max(0.0, score), errors

    def _evaluate_natural_phrasing(self, text: str) -> Tuple[float, List[str]]:
        """Verify natural phrasing and flag literal translations or awkward constructs."""
        errors = []
        score = 1.0

        for pattern, replacement in UNNATURAL_PATTERNS:
            if re.search(pattern, text, re.IGNORECASE):
                errors.append(f"Unnatural phrasing detected: '{pattern}' -> suggest '{replacement}'")
                score -= 0.5

        return max(0.0, score), errors

    def _evaluate_cefr_level(self, text: str, claimed_cefr: str) -> Tuple[str, float, List[str]]:
        """
        Analyze text complexity to compute CEFR level and verify alignment with claimed tag.
        """
        words = set(re.findall(r"\b[a-záéíóúñü]+\b", text.lower()))
        score = 1.0
        errors = []

        c1_matches = len(words.intersection(C1_VOCAB_INDICATORS))
        b2_matches = len(words.intersection(B2_VOCAB_INDICATORS))
        b1_matches = len(words.intersection(B1_VOCAB_INDICATORS))
        a2_matches = len(words.intersection(A2_VOCAB_INDICATORS))

        if c1_matches > 0 or "ojalá" in words or "hubiera" in words or "hubiéramos" in words or "precipitada" in words:
            computed_level = "C1"
        elif b2_matches > 0 or ("ayer" in words and "mientras" in words):
            computed_level = "B2"
        elif b1_matches > 0 or "gustar" in words or "encantar" in words:
            computed_level = "B1"
        elif a2_matches > 0 or "tener" in words or "hacer" in words or "hoy" in words:
            computed_level = "A2"
        else:
            computed_level = "A1"

        norm_claimed = claimed_cefr
        if claimed_cefr in ["Part 1", "Part 2"]:
            norm_claimed = "A1"
        elif claimed_cefr in ["Part 3", "Part 4"]:
            norm_claimed = "A2"
        elif claimed_cefr in ["Part 5", "Part 6"]:
            norm_claimed = "B1"
        elif claimed_cefr == "Part 7":
            norm_claimed = "B2"

        level_order = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"]
        try:
            claimed_idx = level_order.index(norm_claimed)
            computed_idx = level_order.index(computed_level)
            diff = abs(claimed_idx - computed_idx)

            if diff > 1:
                errors.append(f"CEFR Mismatch: Claimed '{claimed_cefr}' ({norm_claimed}) but content difficulty evaluates to '{computed_level}'.")
                score -= 0.5 * diff
        except ValueError:
            pass

        return computed_level, max(0.0, score), errors

    def validate_batch(self, items: List[Dict[str, Any]], target_cefr: Optional[str] = None) -> Dict[str, Any]:
        """Validate a list of items and return aggregated metrics & quarantine flags."""
        results = []
        valid_items = []
        quarantined_items = []

        total_confidence = 0.0

        for item in items:
            res = self.validate_item(item, target_cefr)
            results.append(res.to_dict())
            total_confidence += res.confidence_score

            if res.is_valid:
                valid_items.append(item)
            else:
                quarantined_items.append({
                    "item": item,
                    "validation_result": res.to_dict()
                })

        avg_confidence = (total_confidence / len(items)) if items else 1.0

        return {
            "total_items": len(items),
            "passed_count": len(valid_items),
            "quarantined_count": len(quarantined_items),
            "pass_rate": round(len(valid_items) / len(items), 4) if items else 1.0,
            "average_confidence": round(avg_confidence, 4),
            "valid_items": valid_items,
            "quarantined_items": quarantined_items,
            "details": results
        }


class QuarantineManager:
    """Manages quarantining, logging, and auto-retry fallback loops."""

    def __init__(self, storage_dir: str = "pipeline/quarantine"):
        self.storage_dir = storage_dir
        os.makedirs(storage_dir, exist_ok=True)
        self.quarantine_file = os.path.join(storage_dir, "quarantined_items.json")
        self.failure_file = os.path.join(storage_dir, "quarantine_failures.json")

    def save_quarantined_items(self, quarantined_list: List[Dict[str, Any]]):
        """Save quarantined items to isolation file."""
        with open(self.quarantine_file, "w", encoding="utf-8") as f:
            json.dump(quarantined_list, f, indent=2, ensure_ascii=False)

    def auto_retry_loop(
        self,
        quarantined_items: List[Dict[str, Any]],
        validator: QAValidator,
        generator_fallback_func,
        max_retries: int = 3
    ) -> Dict[str, Any]:
        """
        Auto-retry loop for quarantined items.
        Executes fallback prompt / strict rules generation up to `max_retries` attempts.
        """
        recovered_items = []
        permanently_failed = []

        for q_entry in quarantined_items:
            item = q_entry["item"]
            val_res = q_entry["validation_result"]
            item_id = val_res["item_id"]
            error_cat = val_res["error_category"]

            success = False
            attempts = 0

            while attempts < max_retries and not success:
                attempts += 1
                revised_item = generator_fallback_func(item, error_cat, attempts)
                new_val_res = validator.validate_item(revised_item, target_cefr=val_res["claimed_cefr"])

                if new_val_res.is_valid:
                    success = True
                    revised_item["_retry_recovered"] = True
                    revised_item["_retry_attempts"] = attempts
                    recovered_items.append(revised_item)
                else:
                    item = revised_item

            if not success:
                permanently_failed.append({
                    "item_id": item_id,
                    "final_item": item,
                    "attempts": attempts,
                    "error_category": error_cat,
                    "details": val_res["details"]
                })

        if permanently_failed:
            with open(self.failure_file, "w", encoding="utf-8") as f:
                json.dump(permanently_failed, f, indent=2, ensure_ascii=False)

        return {
            "total_quarantined": len(quarantined_items),
            "recovered_count": len(recovered_items),
            "failed_count": len(permanently_failed),
            "recovered_items": recovered_items,
            "permanently_failed": permanently_failed
        }
