# Copilot Cloud Agent Instructions

## Project Overview

**GregoryOrd.github.io** is a GitHub Pages personal software development portfolio website. It showcases work experience, education, personal projects, and school projects through a multi-page website with responsive design.

### Quick Facts
- **Type**: Static website (HTML/CSS/JavaScript)
- **Languages**: HTML5, CSS3, vanilla JavaScript
- **Frameworks**: Bootstrap 3.3.6 (via CDN)
- **Target**: GitHub Pages (published from `master` branch)
- **CI/CD**: None — changes are auto-published to github.io domain
- **Size**: ~80KB total content, ~17 directories
- **Hosting**: Zero build process required; files served as-is

## Build & Validation

### No Build Process
This is a static site. **No package dependencies, no build tools, no test suites.** Simply edit HTML/CSS/JavaScript files directly.

### Local Viewing
Open any `.html` file directly in a browser:
```bash
# Option 1: Direct file access
open index.html

# Option 2: Simple HTTP server (Python)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Validation Steps
1. **HTML files**: Open in Chrome/Firefox/Safari to verify rendering and responsive behavior
2. **Responsive testing**: Test at multiple viewport widths (mobile: 360px, tablet: 768px, desktop: 1200px)
   - Use browser DevTools (F12) → Toggle device toolbar
   - Test orientation changes (portrait/landscape)
3. **JavaScript functionality**: 
   - Navbar highlights active page (uses `?page=` query param)
   - Collapsible sections toggle with `toggleRow()` function
4. **No CSS build needed**: All CSS is vanilla or Bootstrap CDN; no preprocessing

### Common Changes & Validation
- **Adding a page**: Create new `.html` file, update navbar links in `navbar.html`, test navigation
- **Updating content**: Edit HTML directly, open in browser to verify
- **Styling changes**: Edit `.css` files, refresh browser (Ctrl+Shift+R for hard refresh)
- **Adding images**: Place in appropriate directory, update `src` paths correctly (use relative paths like `../common/image.jpg`)

## Project Layout & Architecture

### Directory Structure
```
/
├── index.html                          # Landing page with "Enter Site" button
├── navbar.html                         # Navigation bar included as iframe in all pages
├── index_style.css                     # Landing page styles
├── common/                             # Shared resources
│   ├── main.css                        # Global styles (body, colors, components)
│   ├── navbar.css                      # Responsive navbar styles
│   └── main.js                         # toggleRow() for collapsible content
├── homePage/
│   └── home.html                       # Main landing page (has sizing() function)
├── aboutPage/
│   └── about.html
├── workExperiencePage/
│   ├── workExperience.html
│   └── CalgaryCounsellingCentre/       # Employment reference section
├── personalProjectsPage/
│   ├── personalProjects.html
│   ├── personalProjects.css
│   └── [project folders]               # DinosInspire, GregBuild, GregWatch, etc.
├── schoolProjectsPage/
│   ├── schoolProjects.html
│   └── [project folders]
├── educationPage/
│   └── educationCourses.html
├── trainingCoursesPage/
│   ├── trainingCourses.css
│   └── trainingCourses.html
└── .github/
    └── copilot-instructions.md         # This file
```

### Page Architecture
Each main page follows this pattern:
1. Include Bootstrap 3.3.6 CSS via CDN: `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css`
2. Include `../common/main.css`
3. Embed navbar as iframe: `<iframe class="navbarFrame" src="../navbar.html?page=[pageName]" frameborder="0" width="100%" height="50"></iframe>`
4. Include responsive `sizing()` JavaScript function (adjusts padding/sizing based on screen dimensions)
5. Use Bootstrap grid system (`.col-xs-*`, `.col-md-*`) for responsive layout

### Key Components
- **Navbar** (`navbar.html`): Embedded as iframe in all pages using query parameter to highlight active page
- **Responsive Layout**: Uses `sizing()` function to handle complex responsive behavior for various devices
- **Collapsible Sections**: Uses `toggleRow(id, className)` function from `main.js` to toggle row visibility with Font Awesome caret icons
- **External CSS**: Font Awesome (4.7.0) included in some pages via CDN

### Important Codebase Details
**Known Issues (from TODOs.txt):**
1. `sizing()` function is duplicated in each page (home.html, about.html, etc.) — should be consolidated into shared `main.js`
2. Navbar/header code generation is duplicated across pages; templating would help reduce maintenance
3. Education courses page needs templating for repeated row structures

**Dependencies:**
- Bootstrap 3.3.6 (CDN, not npm)
- Font Awesome 4.7.0 (CDN, not npm)
- No npm/build tool dependencies

## Validation Before Pushing

1. **Check links**: Verify all navigation links work (use `?page=` parameter to test active highlighting)
2. **Test responsive**: Open DevTools, toggle device toolbar, test at 320px, 768px, 1024px widths
3. **Verify paths**: All relative paths use `../` correctly (e.g., `../common/main.css`)
4. **No broken images**: Check console (F12) for 404 errors
5. **No console errors**: Open DevTools → Console tab, verify no JavaScript errors
6. **Test orientation change**: On mobile, test portrait/landscape switch (some pages call `location.reload()` on orientation change)

## Trust These Instructions

This document covers the essential structure, setup, and validation for changes. The project has **no hidden build steps, no test suites, and no CI pipelines**. If asked to build, test, or validate:
- There are no `npm install`, `npm run build`, or similar commands
- No `.md` configuration files beyond what's documented here
- Validation is purely browser-based: open files, click, verify rendering

Only perform additional file searches if you discover inconsistencies with this documentation or encounter an error not covered here.
