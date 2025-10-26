<!-- Generated with AI to reproduce it with other AIs lol, remember this -->

# Adding New Projects

## Quick Start

To add a new project, simply create a new Markdown file in the `src/content/projects/` directory.

## File Structure

Each project file should be named with a URL-friendly slug (e.g., `my-awesome-project.md`) and contain frontmatter with project metadata followed by the project description in Markdown.

## Example Project File

```markdown
---
title: "My Awesome Project"
description: "A brief one-line description of the project"
date: 2024-03-15
featured: true
tags: ["Tag1", "Tag2", "Tag3"]
url: "https://example.com/live-project"
github: "https://github.com/username/project"
---

## Project Overview

Write your detailed project description here using Markdown.

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

- Technology 1
- Technology 2

## Results

Share the outcomes and impact of the project.
```

## Frontmatter Fields

### Required Fields

- **title**: The project name (string)
- **description**: A one-line summary (string)
- **date**: Publication date in YYYY-MM-DD format (date)

### Optional Fields

- **featured**: Set to `true` to highlight the project (boolean, default: false)
- **tags**: Array of technology/category tags (array of strings)
- **url**: Live project URL (string, must be valid URL)
- **github**: GitHub repository URL (string, must be valid URL)
- **image**: Path to project image (string) - _coming soon_

## How It Works

1. **Add Project File**: Create a new `.md` file in `src/content/projects/`
2. **Automatic Page Generation**: Astro automatically creates a page at `/projects/your-slug`
3. **Auto-Listing**: The project appears on the homepage (latest 3) and `/projects` page (all projects)
4. **Sorted by Date**: Projects are displayed with newest first

## Tips

- Use descriptive slugs (filename without .md) as they become the URL
- Keep descriptions concise for the listing view
- Use 2-3 relevant tags for best display
- Write detailed content in Markdown for the project page
- Add both `url` and `github` links when available
