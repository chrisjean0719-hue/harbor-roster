# Roadmap

Work still ahead on Harbor Roster. The week board, equipment filter, and per-booking menu already ship. The items below are the next slice, about 29 hours, and they match behavior the app already admits it does not have.

## Booking editor (6 hours)

`Edit booking…` currently sets a status line: "Booking editor is not available in this preview." Add a dialog to create a booking and to change start, end, equipment, note, and open/assigned status. Validate that the end is after the start, including bookings that cross midnight.

## Swap (5 hours)

`Swap with…` is the same kind of preview stub. Let the harbormaster pick another booking in the visible week and exchange the two pieces of equipment, then show the result on the board.

## Weeks other than the sample week (4 hours)

Moving off the week of 9 Feb 2026 shows "No bookings have been published for this week yet." Add a way to create the first booking on an empty week so the board is not limited to the built-in sample.

## Keep edits across a refresh (3 hours)

Booking changes live in component state and disappear on reload. Save the working board in `localStorage` and reload it on startup, with a way to restore the built-in sample.

## Equipment list (4 hours)

Equipment is a fixed array in `src/data/roster.ts`. Add a way to add a berth, crane, or launch, change its type, and remove one that has no remaining bookings.

## Coverage warnings (4 hours)

Overnight bookings already span two dates. Warn when two bookings for the same equipment overlap, and when a type has no coverage for a stretch of the harbor day.

## Tests for the new flows (3 hours)

Unit tests cover time math and lane packing. Add tests for the editor validation, swap, and the save/reload path.

Each item can land on its own. The editor and swap are the ones the menu already promises.
