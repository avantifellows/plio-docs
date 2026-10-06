## What data does Plio collect?

Say you send a plio link to your students over WhatsApp. What does Plio record when a student opens it, and what does each number in your report actually mean? This section walks you through it.

### How a student is identified

A link you share on WhatsApp (or anywhere else) is just the normal plio link. Plio needs to know *who* is watching before it records anything, and there are two ways this can happen:

- **Through your own student ID (recommended for organizations).** Add your student's ID and your organization's API key to the link, as explained in [Single Sign-On (SSO)](#single-sign-on-sso). The student skips the login screen, and all their data is tied to the ID that *you* use for them. The link looks like this:

  ```:no-line-numbers
  https://app.plio.in/play/<plio-id>?unique_id=<your student id>&api_key=<your org api key>
  ```

- **By logging in.** If the link doesn't have these two parameters, the student logs in to Plio with their phone number (using an OTP) or with their Google account.

::: warning NOTE
Nothing is recorded for someone who is not logged in, and nothing is recorded when you (or anyone else) open a plio in preview mode.
:::

### What happens while a student watches

1. **The student opens the link.** Plio creates a new *session* for them. A new session is created on every visit. If the student has watched this plio before, they resume from where they left off, and their earlier answers and progress carry over into the new session.
2. **The student watches the video.** Every 20 seconds, the player saves their progress (how long they have watched and which parts of the video they have seen).
3. **A question pops up.** The video pauses until the student answers or skips the question.
4. **The student submits an answer.** The answer is saved right away. Once submitted, an answer can't be changed.
5. **Everything is logged.** Every interaction along the way (play, pause, jumping around in the video, selecting an option, submitting, and so on) is saved as an *event*.

### What we measure and how

| Data point | What it means | How it is measured and stored |
| --- | --- | --- |
| **Watch time** | The total number of seconds the student has spent watching the video. | Measured by the player while the video is playing and saved every 20 seconds. It is cumulative across all visits, so the student's latest session holds their total. |
| **Retention** | For every second of the video, how many times the student reached that second. If they rewatch a part, those seconds are counted again. | Stored as a comma-separated list of numbers, one per second of the video (e.g. `1,1,1,2,2,0,...`). Like watch time, it is cumulative across visits. |
| **Answers** | What the student answered for each question. For an `MCQ` question, the option they chose; for a `Checkbox` question, the set of options they chose; for a `Subjective` question, the text they typed. | Saved when the student submits. A question the student did not answer is left empty. Plio does not store whether an answer was correct. That is worked out by comparing it with the correct answer you set (a subjective answer counts as correct if it is not empty). Survey questions have no correct answer. |
| **Events** | A log of everything the student did in the player (see the list below). | Each event has a type, the point in the video where it happened (`player_time`, in seconds from the start of the video) and the real-world date and time when it happened. Some events have extra details, described below. |
| **Session** | One visit by a student to a plio. | Records when the visit started, when it was last updated and whether it was the student's first visit to this plio. |

These are the types of events that Plio records:

- `played` / `paused`: the student played or paused the video.
- `video_seeked`: the student jumped to a different point in the video. The details include the time they jumped to.
- `item_opened`: a question appeared on the screen.
- `option_selected`: the student clicked an option before submitting. Every click is recorded, so you can see if they changed their mind.
- `question_answered`: the student submitted an answer.
- `question_skipped`: the student skipped the question.
- `question_revised`: the student went back to rewatch the part of the video before the question.
- `question_proceed`: the student continued with the video after answering.
- `enter_fullscreen` / `exit_fullscreen`: the student switched to or out of fullscreen.
- `watching`: a heartbeat that is updated every 20 seconds while the student watches. Plio uses it to resume the video from the right point.

::: tip
Question and option numbers inside the details of an event start from 0. So the first question of a plio is question `0` and its first option is option `0`.
:::

Plio does not collect information about the student's device, browser or location from the player.

::: tip Good to know
- Watch time is a close approximation calculated by the player, not an exact measurement.
- Since progress is saved every 20 seconds, up to about 20 seconds of watching just before a student closes the tab may not be recorded.
- To get a student's totals (watch time, retention, answers), look at their **most recent session** for that plio. Totals carry over from one session to the next, so adding up all of a student's sessions would count the same watching more than once.
:::

### How the data is organised

The diagram below shows the main pieces of data and how they are connected. Tap or click on a box to see what it contains. Each line shows how many of one thing can be linked to another: for example, **one** plio can have **many** sessions.

<div class="erd" :class="{ 'erd--ready': erdReady, 'erd--active': erdSelected }">
<svg class="erd__svg" viewBox="0 0 624 360" role="group" aria-label="Diagram showing how Plio's data is organised">
<g v-for="r in erdRels" :key="r.id" class="erd__rel" :class="{ 'is-on': erdRelOn(r) }">
<path :d="r.d" class="erd__line" fill="none" stroke="#6a8bad" stroke-width="1.5" />
<text v-for="(l, i) in r.labels" :key="i" :x="l.x" :y="l.y" :text-anchor="l.a" class="erd__card" fill="#4e6e8e" font-size="15">{{ l.t }}</text>
</g>
<g class="erd__legend" aria-hidden="true">
<text x="8" y="232" class="erd__legend-title" font-size="15" font-weight="600">How to read a line</text>
<path d="M8 262 H168" class="erd__line" fill="none" stroke="#6a8bad" stroke-width="1.5" />
<text x="12" y="255" class="erd__card" fill="#4e6e8e" font-size="15">1</text>
<text x="164" y="255" text-anchor="end" class="erd__card" fill="#4e6e8e" font-size="15">many</text>
<text x="8" y="284" class="erd__legend-text" fill="#4e6e8e" font-size="15" font-style="italic">one plio … many sessions</text>
</g>
<g v-for="e in erdEntities" :key="e.id" class="erd__entity" :class="erdEntityClass(e.id)" tabindex="0" role="button" :aria-label="e.name + ': show details'" :aria-pressed="erdSelected === e.id ? 'true' : 'false'" v-on:click="erdSelect(e.id)" v-on:focus="erdSelect(e.id)" v-on:keydown.enter.prevent="erdSelect(e.id)" v-on:keydown.space.prevent="erdSelect(e.id)">
<rect :x="e.x" :y="e.y" width="160" height="50" rx="8" class="erd__box" fill="transparent" stroke="#6a8bad" stroke-width="1.5" />
<text :x="e.x + 80" :y="e.y + 31" text-anchor="middle" class="erd__name" font-size="18" font-weight="600">{{ e.name }}</text>
</g>
</svg>
<p v-if="erdReady && !erdSelected" class="erd__hint">Tap or click on a box to see its details.</p>
<div class="erd__panel" aria-live="polite">
<div v-for="e in erdCards" :key="e.id" class="erd__info">
<p class="erd__info-title">{{ e.name }}</p>
<p class="erd__info-desc">{{ e.desc }}</p>
<dl class="erd__fields">
<template v-for="f in e.fields" :key="f[0]">
<dt><code>{{ f[0] }}</code></dt>
<dd>{{ f[1] }}</dd>
</template>
</dl>
<p class="erd__links"><strong>Connected to:</strong> {{ erdRelText(e.id) }}</p>
</div>
</div>
</div>

<script>
// Interactive diagram for the section above. The SVG also carries plain presentation
// attributes so that it stays readable if the page's styles/scripts don't load.
const W = 160, H = 50
const COL = [8, 232, 456]
const ROW = [8, 106, 204, 302]
const ENTITIES = [
  { id: 'organization', name: 'Organization', col: 0, row: 0,
    desc: 'Your organization. It has its own workspace, and its data is kept separate from every other workspace.',
    fields: [['name', "Your organization's name."], ['api_key', 'The secret key you add to SSO links so that students skip the login screen.']] },
  { id: 'user', name: 'Student (user)', col: 0, row: 1,
    desc: 'Anyone who watches a plio while logged in. Students who open your SSO link are linked to your organization.',
    fields: [['unique_id', 'Your own ID for the student, if they came through your SSO link.'], ['mobile', 'Their phone number, if they logged in with an OTP.'], ['email', 'Their email address, if they logged in with Google.']] },
  { id: 'event', name: 'Event', col: 1, row: 0,
    desc: 'One thing the student did in the player during a session, like playing, pausing or answering.',
    fields: [['type', 'What happened, e.g. played, paused or question_answered.'], ['player_time', 'Where in the video it happened, in seconds from the start.'], ['details', 'Extra information, e.g. the option clicked or the time jumped to.'], ['created_at', 'The real-world date and time when it happened.']] },
  { id: 'session', name: 'Session', col: 1, row: 1,
    desc: 'One visit by one student to one plio. A new session is created on every visit.',
    fields: [['watch_time', 'Total seconds watched, including earlier visits.'], ['retention', 'For each second of the video, how many times the student reached it.'], ['is_first', "Whether this was the student's first visit to this plio."], ['created_at', 'When the visit started.'], ['updated_at', 'When the visit was last saved.']] },
  { id: 'answer', name: 'Session answer', col: 1, row: 2,
    desc: "The student's answer to one question, within a session.",
    fields: [['answer', 'The option chosen (MCQ), the options chosen (checkbox) or the text typed (subjective). Empty if not answered.']] },
  { id: 'video', name: 'Video', col: 2, row: 0,
    desc: 'The video that a plio is built on. The same video can be used in many plios.',
    fields: [['url', "The video's link."], ['title', "The video's title."], ['duration', 'The length of the video in seconds.']] },
  { id: 'plio', name: 'Plio', col: 2, row: 1,
    desc: 'An interactive video: a video plus the questions placed on it.',
    fields: [['uuid', "The plio's ID, i.e. the part after /play/ in its link."], ['name', "The plio's title."], ['status', 'Whether the plio is a draft or published.']] },
  { id: 'item', name: 'Item', col: 2, row: 2,
    desc: 'A point in the video where a question appears.',
    fields: [['time', 'When the question appears, in seconds from the start of the video.']] },
  { id: 'question', name: 'Question', col: 2, row: 3,
    desc: 'The question shown at an item.',
    fields: [['type', 'mcq, checkbox or subjective.'], ['text', 'The question itself.'], ['options', 'The answer choices (for MCQ and checkbox questions).'], ['correct_answer', 'The right answer, used to work out accuracy.'], ['survey', 'Whether it is a survey question, which has no correct answer.']] },
]
const cx = (c) => COL[c] + W / 2
const cy = (r) => ROW[r] + H / 2
// a vertical line between two boxes in the same column; `top`/`bottom` are the labels at each end
const vRel = (id, a, b, col, rowTop, top, bottom, text) => {
  const x = cx(col), y1 = ROW[rowTop] + H, y2 = ROW[rowTop + 1]
  return { id, a, b, text, d: `M${x} ${y1} V${y2}`,
    labels: [{ x: x + 8, y: y1 + 16, t: top, a: 'start' }, { x: x + 8, y: y2 - 6, t: bottom, a: 'start' }] }
}
// a horizontal line between two boxes in the same row; `left`/`right` are the labels at each end
const hRel = (id, a, b, row, colLeft, left, right, text) => {
  const y = cy(row), x1 = COL[colLeft] + W, x2 = COL[colLeft + 1]
  return { id, a, b, text, d: `M${x1} ${y} H${x2}`,
    labels: [{ x: x1 + 4, y: y - 7, t: left, a: 'start' }, { x: x2 - 4, y: y - 7, t: right, a: 'end' }] }
}
const RELS = [
  vRel('org-user', 'organization', 'user', 0, 0, '1', 'many', 'An organization has many students (those who come through its SSO link).'),
  vRel('event-session', 'event', 'session', 1, 0, 'many', '1', 'A session has many events.'),
  vRel('video-plio', 'video', 'plio', 2, 0, '1', 'many', 'A video can be used in many plios.'),
  hRel('user-session', 'user', 'session', 1, 0, '1', 'many', 'A student has many sessions (one per visit, across plios).'),
  hRel('session-plio', 'session', 'plio', 1, 1, 'many', '1', 'A plio has many sessions.'),
  vRel('session-answer', 'session', 'answer', 1, 1, '1', 'many', 'A session has many session answers (one per question).'),
  hRel('answer-item', 'answer', 'item', 2, 1, 'many', '1', 'An item has many session answers (one per session).'),
  vRel('plio-item', 'plio', 'item', 2, 1, '1', 'many', 'A plio has many items.'),
  vRel('item-question', 'item', 'question', 2, 2, '1', '1', 'An item has exactly one question.'),
]

export default {
  data() {
    return {
      erdReady: false,
      erdSelected: null,
      erdEntities: ENTITIES.map((e) => ({ ...e, x: COL[e.col], y: ROW[e.row] })),
      erdRels: RELS,
    }
  },
  computed: {
    // without JavaScript (server-rendered HTML) every entity's details are listed;
    // once the page is interactive, only the selected entity is shown
    erdCards() {
      if (!this.erdReady) return this.erdEntities
      return this.erdEntities.filter((e) => e.id === this.erdSelected)
    },
  },
  mounted() {
    this.erdReady = true
  },
  methods: {
    erdSelect(id) {
      this.erdSelected = id
    },
    erdRelOn(r) {
      return r.a === this.erdSelected || r.b === this.erdSelected
    },
    erdEntityClass(id) {
      if (!this.erdSelected) return {}
      const linked = this.erdRels.some((r) => this.erdRelOn(r) && (r.a === id || r.b === id))
      return { 'is-selected': id === this.erdSelected, 'is-linked': linked && id !== this.erdSelected }
    },
    erdRelText(id) {
      return this.erdRels.filter((r) => r.a === id || r.b === id).map((r) => r.text).join(' ')
    },
  },
}
</script>

<style scoped>
.erd { margin: 1.5rem 0; }
.erd__svg { display: block; width: 100%; height: auto; max-width: 680px; margin: 0 auto; overflow: visible; }
.erd__line { stroke: var(--c-text-lightest); stroke-width: 1.5; fill: none; transition: stroke 0.15s, opacity 0.15s; }
.erd__card { fill: var(--c-text-lighter); font-size: 15px; transition: opacity 0.15s; }
.erd__legend-title { fill: var(--c-text-light); font-size: 15px; font-weight: 600; }
.erd__legend-text { fill: var(--c-text-lighter); font-size: 15px; font-style: italic; }
.erd__box { fill: var(--c-bg); stroke: var(--c-text-lightest); stroke-width: 1.5; transition: stroke 0.15s, fill 0.15s; }
.erd__name { fill: var(--c-text); font-size: 18px; font-weight: 600; pointer-events: none; }
.erd__entity { transition: opacity 0.15s; }
.erd--ready .erd__entity { cursor: pointer; }
.erd__entity:focus { outline: none; }
.erd__entity:hover .erd__box, .erd__entity:focus-visible .erd__box { stroke: var(--c-brand); }
.erd--active .erd__entity, .erd--active .erd__rel { opacity: 0.35; }
.erd--active .erd__entity.is-selected, .erd--active .erd__entity.is-linked, .erd--active .erd__rel.is-on { opacity: 1; }
.erd__entity.is-selected .erd__box { stroke: var(--c-brand); stroke-width: 3; fill: var(--c-bg-light); }
.erd__entity.is-linked .erd__box { stroke: var(--c-brand); }
.erd__rel.is-on .erd__line { stroke: var(--c-brand); stroke-width: 2.5; }
.erd__rel.is-on .erd__card { fill: var(--c-text); font-weight: 600; }
.erd__hint { text-align: center; color: var(--c-text-lighter); font-size: 0.9rem; margin: 0.75rem 0 0; }
.erd__panel { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.75rem; margin-top: 0.75rem; }
.erd--ready .erd__panel { grid-template-columns: 1fr; }
.erd__info { border: 1px solid var(--c-border-dark); border-left: 4px solid var(--c-brand); border-radius: 6px; background: var(--c-bg-light); padding: 0.75rem 1rem; }
.erd__info p { margin: 0 0 0.5rem; }
.erd__info-title { font-weight: 600; font-size: 1.05rem; }
.erd__fields { margin: 0 0 0.5rem; }
.erd__fields dt { margin-top: 0.4rem; }
.erd__fields dd { margin: 0.1rem 0 0 1rem; }
.erd__links { font-size: 0.9rem; color: var(--c-text-light); margin-bottom: 0 !important; }
</style>

All of this data lives inside your organization's workspace. Each organization's workspace is a separate space, so your data is never mixed with another organization's.

### How the dashboard numbers are calculated

The dashboard of each plio shows a few summary numbers. All of them use each student's **latest session** for that plio.

- **Unique viewers**: the number of different logged-in students who have a session for the plio.
- **Average watch time**: the average of each student's total watch time.
- **1-minute retention**: the percentage of viewers who watched beyond the first minute of the video. This is not shown for videos shorter than 1 minute.
- **Accuracy**: for each student, the number of questions they got right divided by the number they answered. This is then averaged over all students who answered at least one question. Survey questions are not counted.
- **Average questions answered**: the average number of questions answered per student.
- **Completion**: the percentage of viewers who answered all the questions (survey questions are not counted).

::: warning NOTE
Completion is about answering every question, not about finishing the video. A student who watched the whole video but skipped a question is not counted as complete.
:::

### Getting the data

There are two ways to get this data out of Plio.

**1. Download the report from the plio's dashboard.** You get a ZIP file containing these CSV files:

- `sessions.csv`: one row per session, with watch time and retention.
- `responses.csv`: the answers given by students to each question.
- `events.csv`: the full log of events.
- `user-level-metrics.csv`: summary numbers for each student.
- `plio-interaction-details.csv`: the questions in the plio, with their options and correct answers.
- `plio-meta-details.csv`: details about the plio itself, like its name and video.
- A `READ-ME-FIRST` guide explaining the files.

For regular members of your workspace, the student identifier in the report is masked. If the person downloading the report is an `Admin` or a `Super Admin`, the report shows the real identifier: the `unique_id` you passed in the SSO link, or the student's phone number or email. See [Mapping data to users](#mapping-data-to-users) for more.

**2. Get a recurring export to BigQuery.** If you want to build your own dashboards or combine Plio's data with your other data, see [Data analysis using BigQuery](#data-analysis-using-bigquery).
