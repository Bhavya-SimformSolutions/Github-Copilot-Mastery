# Week 2 – Advanced Prompt Engineering

## Best Performing Prompt Structure (Node.js)

The most effective prompts followed this structure:
Context → Instruction → Constraints → Output format

Using multi-line comments or docstrings produced significantly better results
than single-line comments.

---

## Observations

- Docstrings provide stronger context than inline comments
- Structured prompts reduce hallucinations
- Explicit constraints (async/await, TTL, exports) improve correctness
- Inline prompts are faster but less reliable

---

## Examples That Worked Best

1. Redis caching utility with context + constraints
2. Refactoring callbacks using selection-based inline prompts
3. Explicit output expectations (export function, reusable utility)

---

## Key Learning

Copilot behaves like a junior developer:
clear requirements = high-quality output  
vague instructions = unpredictable output
