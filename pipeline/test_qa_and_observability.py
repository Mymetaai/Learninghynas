"""
Automated Test Suite for QA/Validator Agent and Langfuse Observability Layer.
Verifies QA confidence scoring, quarantine mechanisms, auto-retry loops,
and Langfuse SDK tracing telemetry across all 4 pipeline spans.
"""

import json
import os
import unittest
from pipeline.qa_validator import QAValidator, QuarantineManager
from pipeline.langfuse_observability import LangfuseObservability
from pipeline.run_pipeline import run_pipeline, fallback_prompt_generator


class TestQAAndObservability(unittest.TestCase):

    def setUp(self):
        self.validator = QAValidator(confidence_threshold=0.85)
        self.quarantine_mgr = QuarantineManager(storage_dir="pipeline/quarantine")
        self.obs = LangfuseObservability(log_dir="pipeline/logs")

    def test_01_valid_exercise_confidence(self):
        """Verify high-quality Spanish exercise receives confidence score >= 0.85."""
        valid_item = {
            "id": "test_valid_001",
            "level": "A1",
            "type": "multiple-choice",
            "prompt": "¿Cómo te llamas?",
            "answer": "Me llamo Maria",
            "options": ["Me llamo Maria", "Buenas noches", "Tengo frío", "Gracias"]
        }
        res = self.validator.validate_item(valid_item)
        self.assertTrue(res.is_valid)
        self.assertGreaterEqual(res.confidence_score, 0.85)
        self.assertEqual(res.error_category, "NONE")
        print(f"\n[Test 1 PASSED] Valid exercise confidence score: {res.confidence_score}")

    def test_02_quarantine_schema_error(self):
        """Verify exercise with missing options triggers quarantine (< 0.85 & SCHEMA_ERROR)."""
        invalid_item = {
            "id": "test_invalid_schema",
            "level": "A1",
            "type": "multiple-choice",
            "prompt": "¿Dónde vives?",
            "answer": "Vivo en Madrid",
            "options": [] # Empty options
        }
        res = self.validator.validate_item(invalid_item)
        self.assertFalse(res.is_valid)
        self.assertLess(res.confidence_score, 0.85)
        self.assertEqual(res.error_category, "SCHEMA_ERROR")
        print(f"[Test 2 PASSED] Schema error quarantined (Confidence: {res.confidence_score}, Category: {res.error_category})")

    def test_03_quarantine_grammar_and_unnatural(self):
        """Verify exercise with grammar mismatch and unnatural phrasing triggers quarantine."""
        grammar_item = {
            "id": "test_grammar_fail",
            "level": "A1",
            "type": "translation",
            "prompt": "Ese argumento no hace sentido en el casa.", # "hace sentido" + "el casa"
            "answer": "That argument makes no sense in the house.",
            "options": ["That argument makes no sense", "Other option"]
        }
        res = self.validator.validate_item(grammar_item)
        self.assertFalse(res.is_valid)
        self.assertLess(res.confidence_score, 0.85)
        self.assertIn(res.error_category, ["GRAMMAR_ERROR", "UNNATURAL_PHRASING"])
        print(f"[Test 3 PASSED] Grammar/Unnatural error quarantined (Confidence: {res.confidence_score}, Category: {res.error_category})")

    def test_04_auto_retry_fallback_loop(self):
        """Verify auto-retry loop recovers quarantined item using fallback prompt generator."""
        quarantined = [{
            "item": {
                "id": "retry_item_001",
                "level": "A1",
                "type": "multiple-choice",
                "prompt": "Ese plan no hace sentido en el casa.",
                "answer": "That plan makes no sense",
                "options": ["That plan makes no sense", "Other"]
            },
            "validation_result": {
                "item_id": "retry_item_001",
                "confidence_score": 0.55,
                "is_valid": False,
                "claimed_cefr": "A1",
                "error_category": "UNNATURAL_PHRASING",
                "details": ["Unnatural phrasing: hace sentido"]
            }
        }]

        retry_result = self.quarantine_mgr.auto_retry_loop(
            quarantined_items=quarantined,
            validator=self.validator,
            generator_fallback_func=fallback_prompt_generator,
            max_retries=3
        )

        self.assertEqual(retry_result["recovered_count"], 1)
        self.assertEqual(retry_result["failed_count"], 0)
        recovered_item = retry_result["recovered_items"][0]
        self.assertTrue(recovered_item.get("_retry_recovered"))
        print(f"[Test 4 PASSED] Auto-retry recovered quarantined item after {recovered_item['_retry_attempts']} attempt(s).")

    def test_05_langfuse_observability_spans(self):
        """Verify Langfuse Observability layer generates all 4 spans and saves trace logs."""
        trace = self.obs.create_pipeline_trace("test_trace")

        ext_span = self.obs.log_extraction_span(trace, "test.pdf", 1048576, 12, 150.0)
        gen_span = self.obs.log_generation_span(trace, "gemini-2.0-flash", 500, 200, 300.0, 10)
        qa_span = self.obs.log_qa_validation_span(trace, 10, 8, 2, 0.89, 120.0, {"GRAMMAR_ERROR": 2})
        mix_span = self.obs.log_mixer_span(trace, {"Basic Español": 4, "Quest Journey": 4}, 8, 25.0)

        final_trace = self.obs.finalize_trace(trace, status="COMPLETED")

        self.assertEqual(len(final_trace["spans"]), 4)
        self.assertEqual(final_trace["status"], "COMPLETED")
        self.assertTrue(os.path.exists(self.obs.local_trace_log))
        print(f"[Test 5 PASSED] Langfuse observability generated trace '{final_trace['trace_id']}' with all 4 spans.")

    def test_06_end_to_end_pipeline_execution(self):
        """Verify full end-to-end pipeline run produces clean traces and quarantine outputs."""
        trace = run_pipeline()
        self.assertIsNotNone(trace)
        self.assertEqual(trace["status"], "COMPLETED")
        self.assertEqual(len(trace["spans"]), 4)
        print("\n[Test 6 PASSED] Full end-to-end pipeline execution completed successfully.")


if __name__ == "__main__":
    unittest.main()
