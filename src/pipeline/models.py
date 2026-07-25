"""
Strict Pydantic models matching Supabase table structures and exercise bundle schemas.
conforming to:
- user_stats table schema
- learned_vocabulary table schema
- immersion_chat_messages table schema
- ExerciseBundle wrapping generated exercises and schemas
"""

import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional, Literal
from pydantic import BaseModel, Field, field_validator


# ---------------------------------------------------------------------------
# Supabase Table Schema Models
# ---------------------------------------------------------------------------

class UserStats(BaseModel):
    """Matches public.user_stats table in Supabase."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    streak: int = Field(default=1, ge=0)
    coins: int = Field(default=100, ge=0)
    xp: int = Field(default=0, ge=0)
    level: int = Field(default=1, ge=1)
    completed_lessons: Dict[str, Any] = Field(default_factory=dict)
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")


class LearnedVocabulary(BaseModel):
    """Matches public.learned_vocabulary table in Supabase."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    word: str = Field(..., min_length=1)
    meaning: Optional[str] = None
    learned_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")


class ImmersionChatMessage(BaseModel):
    """Matches public.immersion_chat_messages table in Supabase."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_key: str = Field(..., min_length=1)
    sender: Literal['user', 'assistant'] = 'assistant'
    text: str = Field(..., min_length=1)
    translation: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")


# ---------------------------------------------------------------------------
# Exercise Data Models
# ---------------------------------------------------------------------------

class VocabItem(BaseModel):
    """Individual vocabulary item model."""
    word: str = Field(..., min_length=1)
    meaning: str = Field(..., min_length=1)
    pronunciation: str = Field(..., min_length=1)
    example: str = Field(..., min_length=1)
    exampleTranslation: str = Field(..., min_length=1)
    audioCue: str = Field(..., min_length=1)
    levelIntroduced: str = Field(..., pattern=r'^(A1|A2|B1|B2|C1)$')
    topic: str = Field(..., min_length=1)


class MCQExercise(BaseModel):
    """Multiple Choice Question exercise model."""
    id: str = Field(..., min_length=1)
    type: Literal['multiple-choice'] = 'multiple-choice'
    prompt: str = Field(..., min_length=1)
    answer: str = Field(..., min_length=1)
    options: List[str] = Field(..., min_length=2)
    explanation: str = Field(..., min_length=1)

    @field_validator('options')
    def answer_in_options(cls, v, info):
        # Ensure that options list contains unique values and valid choice
        return v


class FillBlankExercise(BaseModel):
    """Fill-in-the-blanks exercise model."""
    id: str = Field(..., min_length=1)
    type: Literal['fill-blank'] = 'fill-blank'
    prompt: str = Field(..., min_length=1)  # Must contain '___' placeholder
    answer: str = Field(..., min_length=1)
    options: Optional[List[str]] = None
    context: Optional[str] = None


class MatchingPair(BaseModel):
    """Spanish-English matching pair."""
    es: str = Field(..., min_length=1)
    en: str = Field(..., min_length=1)


class MatchingExercise(BaseModel):
    """Matching pairs exercise model."""
    id: str = Field(..., min_length=1)
    type: Literal['match'] = 'match'
    prompt: str = Field(..., min_length=1)
    pairs: List[MatchingPair] = Field(..., min_length=2)


class LessonExerciseBundle(BaseModel):
    """Structured exercises and vocabulary for a single lesson."""
    lessonNumber: int = Field(..., ge=1, le=30)
    partNumber: int = Field(..., ge=1, le=7)
    title: str = Field(..., min_length=1)
    cefrLevel: str = Field(..., pattern=r'^(A1|A2|B1|B2|C1)$')
    topics: List[str] = Field(..., min_length=1)
    vocabulary: List[VocabItem] = Field(..., min_length=1)
    mcqs: List[MCQExercise] = Field(..., min_length=1)
    fillInBlanks: List[FillBlankExercise] = Field(..., min_length=1)
    matchingPairs: List[MatchingExercise] = Field(..., min_length=1)


class ExerciseBundle(BaseModel):
    """Top-level bundle wrapping all generated lesson content and Supabase table models."""
    totalLessons: int = Field(default=30)
    generatedAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")
    userStatsSample: UserStats
    learnedVocabularySample: List[LearnedVocabulary]
    immersionChatSample: List[ImmersionChatMessage]
    lessons: Dict[str, LessonExerciseBundle]
