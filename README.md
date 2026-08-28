# Zenus Employees Dashboard

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-in%20development-yellow?style=flat-square)

<img width="1280" height="800" alt="dashboard-preview" src="https://github.com/user-attachments/assets/fced4848-6396-41cf-9cd3-f271bf91b03e" />


A frontend HR/employee-management dashboard UI concept for a fictional company, "Zenus Inc." Built with vanilla HTML, CSS, and JavaScript — no framework, no build step.

## Features

- **Overview stats** — total, active, and inactive employee counts, department count
- **New Hires vs. Exits chart** — bar chart with legend, built without a charting library
- **Employee directory table** — search, sort by joined date, filter by status
- **Editable columns** — toggle which table columns are visible via an "Edit Table" modal
- **CSV export** of employee data
- **Collapsible sidebar navigation** with a nested Performance submenu and a Favorites shortcut list
- **Toast notifications** for save actions
- Icons via [Ionicons](https://ionic.io/ionicons), typography via Google Fonts (Inter)

## Tech Stack

| Layer | Tech |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 |
| Behavior | Vanilla JavaScript |
| Icons | Ionicons (CDN) |
| Fonts | Google Fonts — Inter |

## Project Structure

```
dashboard-landing-page/
├── css/
│   └── style.css
├── js/
│   └── main.js
└── index.html
```

## Getting Started

No build tools required.

```bash
git clone https://github.com/NSniha/dashboard-landing-page.git
cd dashboard-landing-page
```

Open `index.html` directly in a browser, or serve it locally for the most reliable font/icon loading:

```bash
npx serve .
```

## Known Limitations

- Mobile and tablet responsiveness is still being refined — tracked in [Issues](https://github.com/NSniha/dashboard-landing-page/issues).
- Employee data and stats are static placeholder content, not wired to a backend or API.

## Live Demo

https://iridescent-marigold-3c5af6.netlify.app/

## License

No license file yet. Adding one (MIT is the common choice for portfolio projects) tells visitors they're free to reference the code.
