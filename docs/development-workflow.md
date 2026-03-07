# Development Workflow

This document describes the task workflow used in the project and defines the conditions under which tasks are considered ready for development and completed.

## Definition of Ready (DoR)

A task is considered **Ready for development** when the development team has enough information to start implementation without significant additional clarification.

A task must meet the following criteria:

* The task description clearly explains the goal.
* Acceptance criteria or design reference is provided (if required).
* Technical requirements are clear.
* Dependencies or related tasks are identified.
* The scope of the task is small enough to be completed within a sprint.

Only tasks that meet these conditions may be moved to the **Ready** column and taken into development.

---

## Definition of Done (DoD)

A task is considered **Done** when the implemented changes meet the project quality standards and the review process has been successfully completed.

The Definition of Done checklist is enforced through the Pull Request template located in:

`.github/pull_request_template.md`

A task can only be considered **Done** when:

* The pull request checklist has been completed by the author.
* The pull request has been reviewed and approved.
* All CI checks have passed.
* The pull request has been merged into the development branch.

Only tasks that satisfy these conditions may be moved to the **Done** column.

---

## Task Flow

Tasks typically move through the following stages in the project board:

Backlog → Ready → In Progress → In Review → Done

* **Backlog** – task is defined but not prepared for development.
* **Ready** – task satisfies Definition of Ready and can be taken by a developer.
* **In Progress** – implementation is underway.
* **In Review** – a pull request is opened and awaiting review.
* **Done** – the pull request has been approved and merged.
