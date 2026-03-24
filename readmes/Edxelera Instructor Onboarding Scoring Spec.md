# EdXeLera Instructor Onboarding Scoring Specification

## Purpose

This document defines the instructor onboarding question set, scoring model, state resolution logic, and implementation recommendations for EdXeLera.

The goal of this onboarding flow is to classify new instructors into one of three product states so the platform can present the right next steps, support content, and onboarding experience.

---

## Onboarding Goals

The onboarding should help EdXeLera determine whether an instructor is:

* `launch-ready`
* `content-building`
* `guided-start`

These states should be used to tailor the instructor experience after registration.

---

## Recommended State Names

### Final internal state model

```ts
type InstructorOnboardingState =
  | 'launch-ready'
  | 'content-building'
  | 'guided-start'
```

### Meaning of each state

#### `launch-ready`

The instructor is experienced enough and already has most or all of their content ready.

#### `content-building`

The instructor has some experience or teaching background, but still needs to create or complete course content.

#### `guided-start`

The instructor is new to teaching and course creation and should receive more foundational guidance.

---

## Recommended Data Model

Store both the final state and the supporting answer signals.

```ts
type ExperienceValue =
  | 'new'
  | 'some_teaching'
  | 'created_courses'
  | 'published_courses'

type ContentValue =
  | 'full_content'
  | 'partial_content'
  | 'no_content'

type VideoComfortValue =
  | 'very_comfortable'
  | 'somewhat_comfortable'
  | 'not_comfortable'

type InstructorOnboardingState =
  | 'launch-ready'
  | 'content-building'
  | 'guided-start'

type OnboardingAnswers = {
  experience: ExperienceValue
  content: ContentValue
  video_comfort: VideoComfortValue
}

type InstructorProfile = {
  state: InstructorOnboardingState
  signals: {
    experience: ExperienceValue
    content: ContentValue
    videoComfort: VideoComfortValue
  }
}
```

### Why store both `state` and `signals`

The `state` drives the main onboarding route or result screen.

The `signals` can be used later to:

* personalize dashboard cards
* recommend templates
* show course creation guidance
* offer video recording help
* tailor support content without changing the main state

---

## Final Onboarding Questions

```ts
type OnboardingOption = {
  id: string
  label: string
  value: string
}

type OnboardingStep = {
  id: number
  key: string
  question: string
  helperText?: string
  options: OnboardingOption[]
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    key: 'experience',
    question: 'What best describes your experience as an instructor?',
    helperText: 'Choose the option that feels closest to where you are right now.',
    options: [
      {
        id: 'a',
        value: 'new',
        label: "I'm new to teaching and creating courses",
      },
      {
        id: 'b',
        value: 'some_teaching',
        label: "I've taught, mentored, or coached people before",
      },
      {
        id: 'c',
        value: 'created_courses',
        label: "I've created course materials before, but haven't sold or published a full course",
      },
      {
        id: 'd',
        value: 'published_courses',
        label: "I've created and sold or published courses before",
      },
    ],
  },
  {
    id: 2,
    key: 'content',
    question: 'How much course content do you already have prepared?',
    helperText: 'This includes videos, slides, notes, lesson outlines, or other teaching materials.',
    options: [
      {
        id: 'a',
        value: 'full_content',
        label: 'I already have most or all of my course content ready',
      },
      {
        id: 'b',
        value: 'partial_content',
        label: 'I have some content, but it is not complete yet',
      },
      {
        id: 'c',
        value: 'no_content',
        label: "I haven't created my course content yet",
      },
    ],
  },
  {
    id: 3,
    key: 'video_comfort',
    question: 'How comfortable are you with recording course videos?',
    helperText: 'This helps us know what kind of support to show you.',
    options: [
      {
        id: 'a',
        value: 'very_comfortable',
        label: "I'm very comfortable recording videos",
      },
      {
        id: 'b',
        value: 'somewhat_comfortable',
        label: 'I can do it, but I may need some guidance',
      },
      {
        id: 'c',
        value: 'not_comfortable',
        label: "I'm not confident with video recording yet",
      },
    ],
  },
]
```

---

## Why This Question Structure Works

The question set is intentionally split into two layers:

### Core classification questions

These determine the instructor's main onboarding state.

* Question 1: experience
* Question 2: content readiness

### Support question

This does not decide the main state directly, but helps personalize support.

* Question 3: video comfort

This structure keeps the state model clean while still collecting helpful personalization data.

---

## Scoring Model

A scoring model should be used instead of rigid if-else mapping.

### Experience score map

```ts
const EXPERIENCE_SCORE_MAP: Record<ExperienceValue, number> = {
  new: 0,
  some_teaching: 1,
  created_courses: 2,
  published_courses: 3,
}
```

### Content score map

```ts
const CONTENT_SCORE_MAP: Record<ContentValue, number> = {
  full_content: 2,
  partial_content: 1,
  no_content: 0,
}
```

### Video comfort score map

Video comfort should be tracked as a signal but should not drive the main state directly.

```ts
const VIDEO_COMFORT_SCORE_MAP: Record<VideoComfortValue, number> = {
  very_comfortable: 2,
  somewhat_comfortable: 1,
  not_comfortable: 0,
}
```

Note: the video comfort score is optional and can be used for recommendations, but it should not be part of the primary state resolution unless EdXeLera intentionally wants video skill to affect onboarding classification.

---

## Final State Resolution Using Score

### Recommended score thresholds

* total score `0-1` → `guided-start`
* total score `2-3` → `content-building`
* total score `4-5` → `launch-ready`

### Implementation

```ts
function resolveInstructorOnboardingState(
  answers: OnboardingAnswers
): InstructorOnboardingState {
  const experienceScoreMap: Record<ExperienceValue, number> = {
    new: 0,
    some_teaching: 1,
    created_courses: 2,
    published_courses: 3,
  }

  const contentScoreMap: Record<ContentValue, number> = {
    full_content: 2,
    partial_content: 1,
    no_content: 0,
  }

  const totalScore =
    experienceScoreMap[answers.experience] +
    contentScoreMap[answers.content]

  if (totalScore <= 1) return 'guided-start'
  if (totalScore >= 4) return 'launch-ready'
  return 'content-building'
}
```

---

## State Mapping Reference Table

This shows how the scoring model behaves across the experience and content combinations.

| Experience          |           Content | Score | State              |
| ------------------- | ----------------: | ----: | ------------------ |
| `new`               |      `no_content` |     0 | `guided-start`     |
| `new`               | `partial_content` |     1 | `guided-start`     |
| `new`               |    `full_content` |     2 | `content-building` |
| `some_teaching`     |      `no_content` |     1 | `guided-start`     |
| `some_teaching`     | `partial_content` |     2 | `content-building` |
| `some_teaching`     |    `full_content` |     3 | `content-building` |
| `created_courses`   |      `no_content` |     2 | `content-building` |
| `created_courses`   | `partial_content` |     3 | `content-building` |
| `created_courses`   |    `full_content` |     4 | `launch-ready`     |
| `published_courses` |      `no_content` |     3 | `content-building` |
| `published_courses` | `partial_content` |     4 | `launch-ready`     |
| `published_courses` |    `full_content` |     5 | `launch-ready`     |

---

## Important Note About the Scoring Outcome

Because you chose scoring, the result is slightly more flexible than the simpler rules-based approach.

For example:

* `new + full_content` becomes `content-building` instead of `guided-start`
* `some_teaching + no_content` becomes `guided-start`
* `published_courses + partial_content` becomes `launch-ready`

This is not wrong. It is simply the natural behavior of a weighted scoring model.

If EdXeLera later wants stricter behavior, the scoring system can be combined with override rules.

Example override idea:

```ts
function resolveInstructorOnboardingStateWithOverrides(
  answers: OnboardingAnswers
): InstructorOnboardingState {
  if (answers.experience === 'new' && answers.content !== 'full_content') {
    return 'guided-start'
  }

  const experienceScoreMap: Record<ExperienceValue, number> = {
    new: 0,
    some_teaching: 1,
    created_courses: 2,
    published_courses: 3,
  }

  const contentScoreMap: Record<ContentValue, number> = {
    full_content: 2,
    partial_content: 1,
    no_content: 0,
  }

  const totalScore =
    experienceScoreMap[answers.experience] +
    contentScoreMap[answers.content]

  if (totalScore <= 1) return 'guided-start'
  if (totalScore >= 4) return 'launch-ready'
  return 'content-building'
}
```

Use the pure score model if flexibility is desired.
Use overrides if product behavior needs stronger guardrails.

---

## Role of Question 3

Question 3 should not directly determine the instructor's main state.

Instead, it should shape recommendations and support flows.

### Example uses of `video_comfort`

#### If `very_comfortable`

* show fast-track video upload prompts
* suggest advanced recording tips
* show content publishing checklist

#### If `somewhat_comfortable`

* show practical recording tips
* recommend simple equipment guides
* suggest best practices for lesson recording

#### If `not_comfortable`

* show beginner-friendly video tips
* recommend low-pressure ways to record content
* suggest slide-based or voiceover-first course creation options

---

## Suggested Post-Onboarding Messaging

### `launch-ready`

**Message direction:** confident and momentum-driven

Suggested message:

> You're ready to launch on EdXeLera.
> You already have the experience and course content to get started quickly. Let's help you organize, upload, and publish with confidence.

Suggested next actions:

* Upload course content
* Structure modules and lessons
* Add assessments
* Submit for review

### `content-building`

**Message direction:** supportive and practical

Suggested message:

> You've got the experience. Now let's build your course.
> We'll help you turn your knowledge into a structured learning experience, step by step.

Suggested next actions:

* Create your course outline
* Plan modules and lessons
* Upload or record content
* Add assessments later

### `guided-start`

**Message direction:** warm and encouraging

Suggested message:

> You're in the right place to begin.
> Even if this is your first time teaching or creating a course, EdXeLera will guide you step by step.

Suggested next actions:

* Explore a beginner instructor guide
* Use a course template
* Plan your first lesson
* Learn simple recording basics

---

## Recommended Product Behavior

### Use this setup

* 3 questions
* only 2 questions decide the main state score directly
* question 3 decides support content and recommendations
* store both `state` and `signals`

This makes the onboarding system scalable, clean, and easier to evolve later.

---

## Final Recommendation

EdXeLera should implement the onboarding using the scoring model with the following principles:

1. Use the revised wording for the onboarding questions
2. Use experience and content as the primary scoring inputs
3. Keep video comfort as a personalization signal
4. Store both the resolved onboarding `state` and the raw answer `signals`
5. Use the resolved state to determine the result screen and suggested next steps

This approach keeps the onboarding logic future-proof while still being simple enough to maintain.
