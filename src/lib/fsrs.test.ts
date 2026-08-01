import { describe, it, expect } from 'vitest';
import { Rating, State } from 'ts-fsrs';
import { getDefaultCard, scheduleCard, getCardsDue, getCardsByState } from '../lib/fsrs';

const Card = { State };

describe('FSRS Algorithm', () => {

  it('creates a default card with correct initial values', () => {
    const card = getDefaultCard('word-1', 'hola', 'hello', 'A1', 'greetings');
    
    expect(card.wordId).toBe('word-1');
    expect(card.word).toBe('hola');
    expect(card.translation).toBe('hello');
    expect(card.level).toBe('A1');
    expect(card.category).toBe('greetings');
    expect(card.state).toBe(Card.State.New);
    expect(card.due).toBeInstanceOf(Date);
  });

  it('schedules a card with Again rating', () => {
    const card = getDefaultCard('word-1', 'hola', 'hello', 'A1', 'greetings');
    const result = scheduleCard(card, Rating.Again);
    
    expect(result.card.state).toBe(Card.State.Learning);
    expect(result.interval).toBe(0);
    expect(result.nextReview).toBeInstanceOf(Date);
  });

  it('schedules a card with Good rating', () => {
    const card = getDefaultCard('word-1', 'hola', 'hello', 'A1', 'greetings');
    const result = scheduleCard(card, Rating.Good);
    
    expect(result.card.state).toBe(Card.State.Review);
    expect(result.interval).toBeGreaterThan(0);
    expect(result.nextReview).toBeInstanceOf(Date);
  });

  it('schedules a card with Easy rating', () => {
    const card = getDefaultCard('word-1', 'hola', 'hello', 'A1', 'greetings');
    const result = scheduleCard(card, Rating.Easy);
    
    expect(result.card.state).toBe(Card.State.Review);
    expect(result.interval).toBeGreaterThan(0);
    expect(result.nextReview).toBeInstanceOf(Date);
  });

  it('filters due cards correctly', () => {
    const pastDate = new Date(Date.now() - 86400000); // 1 day ago
    const futureDate = new Date(Date.now() + 86400000); // 1 day from now
    
    const card1 = getDefaultCard('word-1', 'hola', 'hello', 'A1', 'greetings');
    card1.due = pastDate;
    
    const card2 = getDefaultCard('word-2', 'adios', 'goodbye', 'A1', 'greetings');
    card2.due = futureDate;
    
    const cards = [card1, card2];
    const dueCards = getCardsDue(cards);
    
    expect(dueCards).toHaveLength(1);
    expect(dueCards[0].wordId).toBe('word-1');
  });

  it('filters cards by state correctly', () => {
    const card1 = getDefaultCard('word-1', 'hola', 'hello', 'A1', 'greetings');
    card1.state = Card.State.New;
    
    const card2 = getDefaultCard('word-2', 'adios', 'goodbye', 'A1', 'greetings');
    card2.state = Card.State.Review;
    
    const cards = [card1, card2];
    const newCards = getCardsByState(cards, Card.State.New);
    const reviewCards = getCardsByState(cards, Card.State.Review);
    
    expect(newCards).toHaveLength(1);
    expect(newCards[0].wordId).toBe('word-1');
    expect(reviewCards).toHaveLength(1);
    expect(reviewCards[0].wordId).toBe('word-2');
  });

  it('progresses through learning steps correctly', () => {
    let card = getDefaultCard('word-1', 'hola', 'hello', 'A1', 'greetings');
    
    // First review - Again (learning step 1)
    let result = scheduleCard(card, Rating.Again);
    expect(result.card.state).toBe(Card.State.Learning);
    card = result.card;
    
    // Second review - Good (graduates to review)
    result = scheduleCard(card, Rating.Good);
    expect(result.card.state).toBe(Card.State.Review);
    expect(result.card.interval).toBeGreaterThan(0);
  });
});

describe('Rating Labels', () => {
  it('has correct labels for all ratings', async () => {
    const { RATING_LABELS } = await import('../lib/fsrs');
    
    expect(RATING_LABELS[Rating.Again].label).toBe('Again');
    expect(RATING_LABELS[Rating.Hard].label).toBe('Hard');
    expect(RATING_LABELS[Rating.Good].label).toBe('Good');
    expect(RATING_LABELS[Rating.Easy].label).toBe('Easy');
  });
});