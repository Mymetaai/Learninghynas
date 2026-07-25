"""
Main execution script for Extractor & Generator Agent pipeline.
Runs PDF text extraction, Chonkie text chunking, CEFR level tagging,
Pydantic exercise generation, validation, and saves src/data/generated_content.json.
"""

import os
import sys
import json
from datetime import datetime

# Ensure project root is in sys.path
workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if workspace_root not in sys.path:
    sys.path.insert(0, workspace_root)

from src.pipeline.extractor import ExtractorAgent
from src.pipeline.generator import GeneratorAgent
from src.pipeline.models import ExerciseBundle


def run_pipeline():
    print("=" * 70)
    print("SPANISH LEARNING EDUCATIONAL CONTENT EXTRACTION & GENERATION PIPELINE")
    print(f"Timestamp: {datetime.utcnow().isoformat()}Z")
    print("=" * 70)

    # 1. Extractor Agent Execution
    print("\n[1/3] Running Extractor Agent...")
    extractor = ExtractorAgent(workspace_root=workspace_root)
    extracted_lessons, extractor_tool = extractor.extract_all_lessons()
    print(f"  [OK] Extracted text and chunks for {len(extracted_lessons)} lessons using '{extractor_tool}' (Parts 1-7).")

    # Verify CEFR tagging distribution
    cefr_counts = {}
    for l_num, data in extracted_lessons.items():
        lvl = data["cefr_level"]
        cefr_counts[lvl] = cefr_counts.get(lvl, 0) + 1
    print(f"  [OK] CEFR Level Distribution: {cefr_counts}")

    # 2. Generator Agent Execution
    print("\n[2/3] Running Generator Agent...")
    generator = GeneratorAgent()
    bundle, prompt_tok, comp_tok, framework_used, model_used = generator.generate_full_bundle(extracted_lessons)
    print(f"  [OK] Generated content for {bundle.totalLessons} lessons using '{framework_used}' (Engine/Model: '{model_used}').")

    # 3. Validation & Saving Output
    print("\n[3/3] Validating & Saving Generated Content...")
    output_dir = os.path.join(workspace_root, "src", "data")
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "generated_content.json")

    # Serialize bundle to JSON
    json_data = bundle.model_dump_json(indent=2)

    # Verify JSON validity and Pydantic re-validation
    revalidated_bundle = ExerciseBundle.model_validate_json(json_data)
    assert revalidated_bundle.totalLessons == 30, "Total lessons count mismatch!"
    assert len(revalidated_bundle.lessons) == 30, "Lessons map length mismatch!"
    assert revalidated_bundle.userStatsSample.user_id is not None, "UserStats missing user_id!"
    assert len(revalidated_bundle.learnedVocabularySample) > 0, "LearnedVocabulary sample empty!"
    assert len(revalidated_bundle.immersionChatSample) > 0, "ImmersionChatMessage sample empty!"

    # Save to src/data/generated_content.json
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(json_data)

    file_size = os.path.getsize(output_file)
    print(f"  [OK] Successfully wrote {output_file} ({file_size:,} bytes).")
    print("  [OK] Strict Pydantic Schema Validation: PASSED")

    print("\n" + "=" * 70)
    print("PIPELINE SUMMARY:")
    print(f"  - Total Lessons Processed: {revalidated_bundle.totalLessons}")
    print(f"  - Output JSON: {output_file}")
    print(f"  - File Size: {file_size / 1024:.2f} KB")
    print(f"  - UserStats Sample ID: {revalidated_bundle.userStatsSample.id}")
    print(f"  - LearnedVocab Sample Count: {len(revalidated_bundle.learnedVocabularySample)}")
    print(f"  - ImmersionChat Sample Count: {len(revalidated_bundle.immersionChatSample)}")
    print("=" * 70)
    print("Pipeline Execution Complete!")


if __name__ == "__main__":
    run_pipeline()
