# Study Space

A cozy study planner for organizing subjects, assignments, exam dates, and study progress.

## Features

- Dashboard with the current date, subject totals, assignment completion, deadlines, weekly goals, and upcoming exams.
- Subject pages with assignment tracking.
- Assignment due dates and low/medium/high priority labels.
- Exam tracker with revision topics and confidence statuses.
- Study-session logging, weekly goals, study streaks, and a study calendar.
- Progress reports and achievement badges.
- Data saved in the browser using local storage.

## Run locally

Requires Node.js. Install dependencies and start the development server:

```sh
npm install
npm run dev
```

## Checks

Run the available automated checks with:

```sh
npm test
npm run lint
npm run build
```

Note: the project was updated to refresh the dashboard date while it remains open and to use the browser's local date for a new assignment's default due date. Automated build/tests still need to be run in an environment where dependencies can be installed.
