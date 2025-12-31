# Week 3 – Copilot Chat Bug Fix Walkthrough

## Bug Description
A runtime error occurred when a non-existent user ID was passed to
getUserProfile. The service attempted to access properties on a null object.

## Copilot Chat Usage

### Step 1: Understanding the Code
Prompt used:
"Explain this function in plain English"

Copilot explained the function logic and identified the missing null check.

### Step 2: Debugging
Prompt used:
"There is a runtime error when the user does not exist. Identify the bug and suggest a fix."

Copilot identified the null dereference and suggested explicit user existence validation.

### Step 3: Applying the Fix
The suggested fix was applied directly, preventing runtime crashes.

### Step 4: Tests
Used `/tests` slash command to generate Jest unit tests for edge cases.

## Outcome
The bug was fixed entirely using Copilot Chat without manual debugging.
