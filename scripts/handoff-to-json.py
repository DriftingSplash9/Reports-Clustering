#!/usr/bin/env python3
"""
Convert a branch hand-off note (`EU/G.<n>.md`, `NZ/G.<n>.md`, `AU/G.<n>.md`)
into a machine-readable sidecar (`<branch>/G.<n>.json`). Branches: EU, NZ, AU —
add new branch folder names to BRANCHES below.

The Markdown stays the document of record — it is what a human or an agent
reads. The JSON is a structured index of it: the state of the branch, the
priorities, the corrections, the open checks. It exists so that hand-off state
can be queried without re-reading prose, and so nothing depends on remembering
to do it by hand.

Usage:
    python scripts/handoff-to-json.py                 # convert every G.*.md in all branches
    python scripts/handoff-to-json.py NZ/G.4.md       # convert one
    python scripts/handoff-to-json.py --check         # report drift, write nothing

Idempotent: re-running on unchanged input rewrites identical output.
"""
from __future__ import annotations

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
BRANCHES = ["EU", "NZ", "AU"]
EU = os.path.join(ROOT, "EU")  # kept for backwards compatibility in messages

# Sections the spec in G.18 requires. Order matters; it is the spec's order.
KNOWN_SECTIONS = [
    "Orientation",
    "Session conditions",
    "Headline result",
    "Findings",
    "Secondary observations",
    "Corrections to prior sessions",
    "Thomas's stated priority for the remaining work",
    "Cheap checks still outstanding",
    "What to pass at the start of next thread",
]


def canonical_section(heading: str) -> str | None:
    """Map a real heading onto a spec section name, tolerating the em-dash tails."""
    h = heading.strip().lower()
    for known in KNOWN_SECTIONS:
        if h.startswith(known.lower()):
            return known
    return None


def split_blocks(md: str):
    """
    Yield (level, heading, body) for every ATX heading in the file.

    Fenced code blocks are skipped when looking for headings. This matters: the
    hand-off spec embeds a fenced skeleton of the required section list, so a
    naive scan finds a second, empty `## Headline result` inside the fence and
    silently overwrites the real one with "".
    """
    lines = md.split("\n")
    blocks = []
    cur = None
    in_fence = False
    fence_marker = None
    for raw in lines:
        line = raw.rstrip("\r")
        fm = re.match(r"^\s*(```+|~~~+)", line)
        if fm:
            marker = fm.group(1)[:3]
            if not in_fence:
                in_fence, fence_marker = True, marker
            elif marker == fence_marker:
                in_fence, fence_marker = False, None
            if cur:
                cur["lines"].append(line)
            continue

        m = None if in_fence else re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            if cur:
                blocks.append(cur)
            cur = {"level": len(m.group(1)), "heading": m.group(2).strip(), "lines": []}
        elif cur:
            cur["lines"].append(line)
    if cur:
        blocks.append(cur)
    for b in blocks:
        b["body"] = "\n".join(b["lines"]).strip()
    return blocks


def numbered_items(body: str):
    """Pull `1. ...` / `**1.` style enumerated items out of a section body."""
    items = []
    for m in re.finditer(
        r"^\s*(?:\*\*)?(\d+)[.)]\s*(?:\*\*)?\s*(.+?)(?=^\s*(?:\*\*)?\d+[.)]|\Z)",
        body,
        re.S | re.M,
    ):
        text = re.sub(r"\s+", " ", m.group(2)).strip()
        items.append({"n": int(m.group(1)), "text": text})
    return items


def bullet_items(body: str):
    out = []
    for m in re.finditer(r"^\s*[-*]\s+(.+?)(?=^\s*[-*]\s|\Z)", body, re.S | re.M):
        text = re.sub(r"\s+", " ", m.group(1)).strip()
        if text:
            out.append(text)
    return out


def parse(path: str) -> dict:
    with open(path, encoding="utf-8") as f:
        md = f.read()

    base = os.path.basename(path)
    num = None
    mnum = re.search(r"G[._](\d+)", base)
    if mnum:
        num = int(mnum.group(1))

    blocks = split_blocks(md)

    title = next((b["heading"] for b in blocks if b["level"] == 1), base)

    # Header lines sit in the body of the H1, before the first H2.
    header_body = next((b["body"] for b in blocks if b["level"] == 1), "")

    def header_field(name: str):
        m = re.search(rf"^{name}\s*:\s*(.+)$", header_body, re.I | re.M)
        return m.group(1).strip() if m else None

    out = {
        "_generated_by": "scripts/handoff-to-json.py",
        "_note": "Sidecar index of the Markdown hand-off. The .md is the document of record.",
        "file": base,
        "number": num,
        "title": title,
        "date": header_field("Date"),
        "governing_briefs": header_field("Governing briefs"),
        "predecessor": header_field("Predecessor"),
        "sections_present": [],
        "sections_missing": [],
        "headline_result": None,
        "findings": [],
        "corrections": [],
        "priorities": [],
        "cheap_checks": [],
        "pass_to_next_thread": [],
        "session_conditions": None,
    }

    seen = set()
    i = 0
    while i < len(blocks):
        b = blocks[i]
        if b["level"] != 2:
            i += 1
            continue
        sec = canonical_section(b["heading"])
        if sec:
            seen.add(sec)

        # Collect any H3 children belonging to this H2.
        children = []
        j = i + 1
        while j < len(blocks) and blocks[j]["level"] > 2:
            if blocks[j]["level"] == 3:
                children.append(blocks[j])
            j += 1

        if sec == "Headline result":
            out["headline_result"] = b["body"]
        elif sec == "Session conditions":
            out["session_conditions"] = b["body"]
        elif sec == "Findings":
            for c in children:
                out["findings"].append(
                    {"heading": c["heading"], "body": c["body"]}
                )
            if not children and b["body"]:
                out["findings"] = [
                    {"heading": None, "body": t["text"]} for t in numbered_items(b["body"])
                ] or [{"heading": None, "body": b["body"]}]
        elif sec == "Corrections to prior sessions":
            out["corrections"] = numbered_items(b["body"]) or bullet_items(b["body"])
        elif sec == "Thomas's stated priority for the remaining work":
            # Lettered blocks (A/B/C/D) appear as bold lines or H3s.
            blocks_found = []
            for m in re.finditer(
                r"\*\*([A-Z])\s*[—–-]\s*(.+?)\*\*(.*?)(?=\*\*[A-Z]\s*[—–-]|\Z)",
                b["body"],
                re.S,
            ):
                blocks_found.append(
                    {
                        "letter": m.group(1),
                        "label": re.sub(r"\s+", " ", m.group(2)).strip(),
                        "items": numbered_items(m.group(3)) or bullet_items(m.group(3)),
                    }
                )
            for c in children:
                mm = re.match(r"^([A-Z])\s*[—–-]\s*(.*)$", c["heading"])
                blocks_found.append(
                    {
                        "letter": mm.group(1) if mm else None,
                        "label": (mm.group(2) if mm else c["heading"]).strip(),
                        "items": numbered_items(c["body"]) or bullet_items(c["body"]),
                    }
                )
            out["priorities"] = blocks_found
        elif sec == "Cheap checks still outstanding":
            out["cheap_checks"] = numbered_items(b["body"]) or bullet_items(b["body"])
        elif sec == "What to pass at the start of next thread":
            out["pass_to_next_thread"] = numbered_items(b["body"]) or bullet_items(b["body"])

        i = j if j > i + 1 else i + 1

    out["sections_present"] = [s for s in KNOWN_SECTIONS if s in seen]
    out["sections_missing"] = [s for s in KNOWN_SECTIONS if s not in seen]
    return out


def targets(argv):
    explicit = [a for a in argv if not a.startswith("--")]
    if explicit:
        return [os.path.abspath(a) for a in explicit]
    found = []
    for branch in BRANCHES:
        branch_dir = os.path.join(ROOT, branch)
        if not os.path.isdir(branch_dir):
            continue
        for name in os.listdir(branch_dir):
            if re.fullmatch(r"G[._]\d+\.md", name):
                found.append(os.path.join(branch_dir, name))
    return sorted(found)


def hook_mode() -> int:
    """
    Read a Claude Code hook payload on stdin and convert only if the file that
    was just written is a hand-off note. Silent and exit-0 for everything else,
    so it is safe to attach to a broad Write|Edit matcher.
    """
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0

    path = ""
    ti = payload.get("tool_input")
    if isinstance(ti, dict):
        path = ti.get("file_path") or ""
    if not path:
        tr = payload.get("tool_response")
        if isinstance(tr, dict):
            path = tr.get("filePath") or ""
    if not path:
        return 0

    norm = path.replace("\\", "/")
    if not re.search(r"/(EU|NZ|AU)/G[._]\d+\.md$", norm):
        return 0
    if not os.path.exists(path):
        return 0

    try:
        data = parse(path)
        out_path = re.sub(r"\.md$", ".json", path)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    except Exception as e:
        print(json.dumps({"systemMessage": f"hand-off JSON sidecar failed: {e}"}))
        return 0

    msg = f"Wrote {os.path.basename(out_path)} alongside {os.path.basename(path)}"
    if data["sections_missing"]:
        msg += f" — missing sections: {', '.join(data['sections_missing'])}"
    print(json.dumps({"systemMessage": msg, "suppressOutput": True}))
    return 0


def main():
    argv = sys.argv[1:]
    if "--hook" in argv:
        return hook_mode()
    check_only = "--check" in argv
    paths = targets(argv)
    if not paths:
        print("no G.*.md hand-off files found in", ", ".join(BRANCHES))
        return 0

    problems = 0
    for p in paths:
        data = parse(p)
        out_path = re.sub(r"\.md$", ".json", p)
        rendered = json.dumps(data, indent=2, ensure_ascii=False) + "\n"

        if data["sections_missing"]:
            print(f"  ! {data['file']}: missing sections -> {', '.join(data['sections_missing'])}")
            problems += 1

        if check_only:
            existing = None
            if os.path.exists(out_path):
                with open(out_path, encoding="utf-8") as f:
                    existing = f.read()
            state = "up to date" if existing == rendered else "STALE / missing"
            print(f"  {data['file']} -> {os.path.basename(out_path)}: {state}")
            continue

        with open(out_path, "w", encoding="utf-8") as f:
            f.write(rendered)
        print(
            f"  wrote {os.path.basename(out_path)} "
            f"({len(data['findings'])} findings, {len(data['corrections'])} corrections, "
            f"{len(data['priorities'])} priority blocks, {len(data['cheap_checks'])} cheap checks)"
        )

    return 1 if (check_only and problems) else 0


if __name__ == "__main__":
    sys.exit(main())
