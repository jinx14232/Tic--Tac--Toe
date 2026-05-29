# Tic-Tac-Toe

A browser-based Tic-Tac-Toe game built with vanilla HTML, CSS, and JavaScript. Supports both **Two Player** and **Single Player (vs Computer)** modes.

---

## Features

- **Two Player Mode** — Play locally against a friend, taking turns on the same device.
- **Single Player Mode** — Play against a computer opponent with basic AI.
- **Symbol Selection** — In Single Player mode, choose to play as **X** or **O** before the game starts.
- **Smart Computer AI** — The computer will:
  1. Win if it has a winning move available.
  2. Block you if you're about to win.
  3. Otherwise, pick a strategic empty cell.
- **Win Detection** — Highlights the winning row, column, or diagonal.
- **Draw Detection** — Detects and announces a draw when all 9 cells are filled with no winner.
- **Reset Game** — Clears the board and replays with the same settings.
- **New Game** — Returns to symbol selection (Single Player) or starts a fresh round (Two Player).
- **Navigation** — Easy back-to-home button available from any game screen.

---

## Project Structure

```
tic-tac-toe/
├── home.html          # Landing page — choose Two Player or Single Player
├── index.html         # Two Player game board
├── selectTurns.html   # Single Player symbol selection (X or O)
├── single.html        # Single Player game board
├── app.js             # Game logic for Two Player mode
├── single.js          # Game logic for Single Player mode (with AI)
├── localStorage.js    # Saves chosen symbol to localStorage and redirects
├── style.css          # Shared stylesheet for all pages
└── README.md
```

---

## How It Works

### Page Flow

```
home.html
├── Two Player    →  index.html         (app.js)
└── Single Player →  selectTurns.html   (localStorage.js)
                         └── single.html   (single.js)
```

### Two Player Mode (`index.html` + `app.js`)
- Players alternate turns as **X** and **O**.
- A turn indicator at the top shows whose turn it is.
- The game checks all 8 win patterns after every move.
- Winning cells are highlighted; a congratulations overlay is shown.
- **Reset Game** clears the board for a rematch; **New Game** restarts with alternating first-turn.

### Single Player Mode (`selectTurns.html` → `single.html` + `single.js`)
- The player picks **X** or **O** on `selectTurns.html`; the choice is saved in `localStorage`.
- On `single.html`, the computer always takes the opposite symbol.
- The player always moves first.
- The AI uses a priority-based strategy: **win > block > fill**.
- The computer move is delayed by 1 second for a natural feel.
- The result overlay shows **"THE WINNER"** or **"THE LOSER"** based on who won.

---

## Getting Started

No build tools or dependencies required — this is a pure frontend project.

### Run Locally

**Option 1 — Live Server (recommended)**

Open the project folder in VS Code and use the **Live Server** extension:
1. Right-click `home.html`
2. Select **"Open with Live Server"**

**Option 2 — Any local HTTP server**

```bash
# Python
python -m http.server 8000
```
Then open `http://localhost:8000/home.html` in your browser.

> **Note:** Opening HTML files directly via `file://` may cause `localStorage` issues in some browsers. A local server is recommended.

---

## Win Patterns

The game checks all 8 possible winning combinations:

```
[0, 1, 2]  →  Top row
[3, 4, 5]  →  Middle row
[6, 7, 8]  →  Bottom row
[0, 3, 6]  →  Left column
[1, 4, 7]  →  Middle column
[2, 5, 8]  →  Right column
[0, 4, 8]  →  Diagonal (top-left to bottom-right)
[2, 4, 6]  →  Diagonal (top-right to bottom-left)
```

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and layout |
| CSS3 | Styling and visual effects |
| JavaScript (ES6) | Game logic, AI, and DOM manipulation |
| localStorage | Persisting symbol choice between pages |

---

## License

This project is open source and available under the [MIT License](LICENSE).