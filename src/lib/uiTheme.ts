/**
 * The UI chrome theme — every colour the DOM panels use, as CSS variables on
 * a `data-theme` attribute. Only 'dark' since blueprint's deletion
 * (2026-08-19); the paper variable set went with it.
 *
 * Why variables and not two style objects: the panels' styles live as inline
 * `React.CSSProperties` across six components, written long before there were
 * two themes. Threading a theme prop into every one of them would touch every
 * signature for what is, in the end, a paint decision — while a variable
 * resolves at paint time, exactly where the decision belongs, and the inline
 * styles keep their structure with `var(--x)` where a literal used to be.
 * (Round 10, Thomas: "brighten the expandable menus so they match the lighter
 * look... give all the boxes really nice glassy looks".)
 *
 * The SCENE reads none of this. Node fills, rims, edges and pulses take their
 * colours from palette.ts/view.ts through the material system; these
 * variables style the instrument panels around the scene. Keep it that way —
 * a scene colour in a CSS variable would be invisible to the screenshot-pixel
 * tuning the scene colours are all chosen by.
 *
 * One ground: **dark** — machined instrument panels: near-black gradient
 * surfaces, a 1px top bevel and a bottom seam (the "3D" Thomas asked for,
 * machined rather than bubbly). The glow and blur that briefly joined them
 * are gone (see --panel-shadow).
 *
 * The ink ladder runs strong → body → mid → label → mute → dim → faint →
 * faintest. Mapping literals to rungs (not to per-use names) is what let 60+
 * inline colours collapse into eight variables.
 */
export const THEME_CSS = /* css */ `
/* The masthead gradient's angle, registered so it can ANIMATE — an
 * unregistered custom property snaps between keyframes instead of
 * interpolating. Chrome-only syntax, which is where this app lives; a
 * browser that ignores @property just renders the title at its initial
 * angle, stationary, which is the correct fallback. */
@property --rig-title-angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 118deg;
}

/* One full turn of the title gradient — see \`masthead\` in App.tsx for the
 * duration and the request behind it. */
@keyframes rigTitleTurn {
  from { --rig-title-angle: 118deg; }
  to   { --rig-title-angle: 478deg; }
}

[data-theme='dark'] {
  /* Alphas raised toward opaque on 2026-08-19 when the backdrop blur came
   * off — an unblurred translucent panel lets the graph's stars show
   * through the text, so the surface itself has to do the separating the
   * blur used to. */
  --panel-bg: linear-gradient(178deg, rgba(21, 28, 44, 0.96) 0%, rgba(10, 14, 24, 0.95) 46%, rgba(7, 10, 18, 0.97) 100%);
  --panel-bg-solid: linear-gradient(180deg, rgba(15, 20, 33, 0.98), rgba(8, 11, 20, 0.98));
  /* The glow's whole history, one day long: Phase 3.5 morning asked for "a
   * nice blue shadow effect or some kind of blue border"; by evening,
   * against the near-black background, the doubled field glow read as the
   * HUD taking over the scene — Thomas: "it is time for the glow to go. no
   * glow or blur on the boxes." So: the crisp blue KEYLINE stays (that is
   * --line, the border half of the original ask), every soft shadow and
   * every glow goes, and the 1px machined bevels stay because they are
   * lines, not light. The panels now separate from the scene by edge and
   * surface, the way an instrument panel actually does. */
  --panel-shadow: 0 1px 2px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(165, 195, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.4);
  /* No backdrop blur — same request, same reasoning as the shadow. */
  --glass-filter: none;
  --btn-bg: rgba(255, 255, 255, 0.03);
  --line: rgba(112, 152, 220, 0.38);
  --line-strong: rgba(130, 170, 230, 0.55);
  --line-faint: rgba(90, 115, 160, 0.17);
  --ink-strong: #e2eafa;
  --ink-body: #c7d3e7;
  --ink-mid: #a3b2ca;
  --ink-label: #8fa3c0;
  --ink-mute: #7d8ea8;
  --ink-dim: #5e6f8a;
  --ink-faint: #54637d;
  --ink-faintest: #3d4a5e;
  --ink-gold: #c2a86e;
  --accent: #6ea8ff;
  --accent-soft: rgba(110, 168, 255, 0.13);
  --accent-line: rgba(110, 168, 255, 0.42);
  --accent-active: rgba(70, 115, 190, 0.30);
  --sel-ring: rgba(230, 237, 250, 0.6);
  --title-ink: linear-gradient(var(--rig-title-angle), #8ab6ff 0%, #b79dff 52%, #74d6c3 108%);
  --title-depth: drop-shadow(0 2px 9px rgba(90, 140, 255, 0.35));
  --frame-line: rgba(150, 190, 255, 0.30);
  --frame-glow: rgba(0, 102, 204, 0.50);
}

/* [data-theme='paper'] went with blueprint mode, 2026-08-19. */

/* .rig-sweep, its rigShelfRipple keyframes, and the --ripple-tint
   custom property above were removed 2026-08-21 -- orphaned since 5m
   replaced the unlinked shelf dot grid (this rule was its sheen effect)
   with a summary pill. Flagged in 5l/5m, deleted this round now that
   shell access is available. See _to_delete/README.md and HANDOFF.md. */
`

/**
 * The menu bar's height, and the top edge everything below it now starts at.
 *
 * Added 2026-08-19 with the menu bar (Phase 4 §6). Before it, three separate
 * blocks each hard-coded `top: 20` — the two `PanelShell` tabs, the search
 * field, and the calendar button — and a fourth (the calendar panel itself)
 * hard-coded 64 as "20 plus the button". A bar across the top of the viewport
 * collides with all four, so the offset is a shared constant rather than four
 * numbers that drift apart the next time the bar changes height.
 *
 * 14px of air below the bar, not 20: the bar already carries its own bottom
 * border, so the old 20 read as a gap-plus-a-line and looked slack.
 */
export const MENU_BAR_HEIGHT = 30
export const HUD_TOP = MENU_BAR_HEIGHT + 14
