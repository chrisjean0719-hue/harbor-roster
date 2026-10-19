# Roadmap

Work still ahead on Harbor Roster. The week board, role filter, and per-shift menu already ship. The items below are the next slice, about 29 hours, and they match behavior the app already admits it does not have.

## Shift editor (6 hours)

`Edit shift…` currently sets a status line: "Shift editor is not available in this preview." Add a dialog to create a shift and to change start, end, staff member, note, and open/assigned status. Validate that the end is after the start, including shifts that cross midnight.

## Swap (5 hours)

`Swap with…` is the same kind of preview stub. Let a manager pick another shift in the visible week and exchange the two staff members, then show the result on the board.

## Weeks other than the sample week (4 hours)

Moving off the week of 9 Feb 2026 shows "No shifts have been published for this week yet." Add a way to create the first shift on an empty week so the board is not limited to the built-in sample.

## Keep edits across a refresh (3 hours)

Shift changes live in component state and disappear on reload. Save the working roster in `localStorage` and reload it on startup, with a way to restore the built-in sample.

## Staff list (4 hours)

Staff are a fixed array in `src/data/roster.ts`. Add a way to add a person, change their role, and remove someone who has no remaining shifts.

## Coverage warnings (4 hours)

Night shifts already span two dates. Warn when two shifts for the same person overlap, and when a role has no coverage for a stretch of the clinic day.

## Tests for the new flows (3 hours)

Unit tests cover time math and lane packing. Add tests for the editor validation, swap, and the save/reload path.

Each item can land on its own. The editor and swap are the ones the menu already promises.
