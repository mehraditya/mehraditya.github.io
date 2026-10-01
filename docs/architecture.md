# Architecture

The project is intentionally divided into independent systems.

No system should own responsibilities belonging to another.

---

# Repository

```
app/

components/

layout/

editorial/

background/

home/

content/

research-notes/

writings/

styles/

docs/

public/

lib/

hooks/

types/
```

---

# app/

Only routing.

No presentation logic.

No large components.

---

# components/

Reusable UI.

Grouped by responsibility.

layout/

Global structure.

Container

Header

Footer

ScrollRail

editorial/

Typography primitives.

Entry

Divider

Metadata

Portal

SectionTitle

background/

Procedural canvas systems.

FlowField

CloudField

Noise

Canvas

home/

Homepage-specific components.

Introduction

PortalGrid

NotebookPreview

CurrentReading

---

# content/

Published content only.

Never drafts.

```
content/

research-notes/

writings/
```

All content uses MDX.

---

# styles/

```
tokens.css

base.css

layout.css

typography.css

animations.css

utilities.css
```

Each stylesheet has one responsibility.

Never mix concerns.

---

# docs/

Design documentation.

Architecture.

Roadmap.

Project specification.

---

# Writing Workflow

Reading

↓

Private Notes (Obsidian)

↓

Revision

↓

Publish

↓

Website

The website should never become the note-taking application.

It is only the publication layer.

---

# Design System

CSS owns layout.

Tailwind assists.

Tailwind does not define architecture.

Semantic CSS variables should always exist.

Spacing comes from tokens.

Typography comes from typography.css.

Layout comes from layout.css.

---

# Future

Eventually the site becomes

Markdown

↓

MDX

↓

Build Pipeline

↓

Static Site

↓

GitHub Pages
