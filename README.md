# Ninja Axolotl — HTML MVP

Open `index.html` in a modern browser. No installation, build, internet, or server is required. All artwork is copied into `assets/`. Two people play on the same device; there is no AI opponent.

## Play

Choose exactly three different fighters per player and explicitly mark a starting fighter. Both players may choose the same cards. Player 1 calls Odd or Even, rolls a six-sided die, and the matching player starts. Click Enter Arena after reading the result.

Players gain one energy at the start of their turn (cap 3). Unspent energy stays with the player. Take one action: attack (cost 1, 2, or 3 energy), switch to a living reserve (free), or pass. The action ends the turn. The starting player must switch or pass on turn 1 under default rules. Only the active fighter attacks. Damage persists through switches; zero HP means knockout. Choose a living replacement for free, then receive the normal turn energy once. Defeat all three enemies to win.

Default health: Ninja 760; Warrior 780; Dark Ninja 820; Fire 850; Flying 800. There is no healing, evolution, status system, random damage, deck drawing, or type advantage. Fire's Blazing Slash uses the requested 250 damage, while the original artwork prints 260. Inspect shows both printed and playtest statistics.

## Rules Lab

Open Rules Lab from the menu to edit HP, attack damage and energy cost, energy cap, and the opening restriction. Save validates all values. Restore defaults saves the original rules. Browser local storage preserves saved settings when supported; otherwise they last for the session. Rules are copied at the opening step and cannot change during the match. Exported JSON includes the complete snapshot, configuration identifier, teams, turn history, actual damage removed, and knockouts.

## Files

- `cards.js`: character IDs, names, artwork, default HP, attack names and values.
- `rules.js`: configuration defaults, validation, storage loading, configuration identifier.
- `game.js`: authoritative state machine, turn transitions, legal actions, scoring and export.
- `app.js`: screens, interaction, dialogs, download, and rules form.
- `styles.css`: responsive presentation and accessibility styling.
- `tests.js`: independent rules-engine tests. Run with Node: `node tests.js`.

## Limitations

This is a combat playtest, not a balanced final game. Only the five requested fighters are playable. Matches are not saved across refreshes; saved rules are. Download histories before leaving if needed. Restart and return-to-menu require confirmation during a match. Standard browser reload/close controls remain available. Simultaneous online play and an automated opponent are outside scope. The configuration ID is a lightweight reproducibility checksum, not a security hash.

## Publish on GitHub Pages

See UPLOAD-INSTRUCTIONS.txt for the complete browser upload and publishing steps. Upload the contents of this folder into the repository root: index.html must appear beside README.md, with assets/ beside it. No build step, package installation, or backend is required. Relative paths support project sites such as https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/.

## Verification of this upload package

The 19 included engine tests passed on October 30, 2026, including all six die results for both choices and a complete 26-turn match. JavaScript syntax and local asset references are checked during packaging. Check the published game on desktop and phone after deployment; hosted embedding is not yet verified.

## Rights

No open-source license is included in this package. Third-party components or assets, if introduced later, retain their applicable terms.
