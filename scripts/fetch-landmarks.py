"""
Picks the landmarks round each mapped community from OpenStreetMap (© OpenStreetMap contributors, ODbL) and
writes src/lib/landmarks.generated.ts, for the pins on the communities map.

    python3 scripts/fetch-landmarks.py

Round each community's plot (its outline in OSM, as in build-map.py): the nearest named schools, hospitals,
malls, metro and railway stations, and tech parks, a few of each within a set reach, with clinics, vets, health
centres, government primary schools, shops, single office blocks and parks under construction left out.
Pursuit of the Elements takes its schools and hospitals from Disha's own list (src/lib/nearby.ts), so only the
other kinds are picked for it. A place near two communities is kept once, for the nearer.

Nothing is invented: every name and position is OSM's. No distance is published: each pin opens Google Maps
directions from its community, which give the drive as it is.
"""
import json, math, os, re, subprocess, urllib.parse

ROOT = os.path.join(os.path.dirname(__file__), "..")
UA = {"User-Agent": "site-map-build/1.0"}
PLOTS = [
    ("pursuit-of-the-elements", 1186548889),
    ("disha-pursuit-of-sunshine", 1190134154),
    ("disha-courtyard", 773145599),
    ("disha-central-park", 702716215),
    ("disha-windsor-gardens", 768730167),
]
# kind: (how many, within km)
LIMITS = {"school": (5, 3.0), "hospital": (3, 5.0), "station": (2, 6.0), "mall": (2, 6.0), "tech": (3, 7.0)}
LEAVE_OUT = {
    "school": r"special school|human development|super school|govt|government|anganwadi|\bghps\b|\bglps\b|\bghs\b|urdu|kannada medium|nursery|play ?school|day ?care|creche|tuition|coaching|academy of (music|dance)",
    "hospital": r"health cent|nursing home|veterin|animal|\bpet\b|dental|dentist|skin|hair|eye|ayur|homoeo|homeo|maternity home|clinic",
    "tech": r"\(u/c\)|under construction|block|tower|building|phase|gate|wing|cafe|food|parking|road|apartment|residen|villa|\bbus\b|metro|station",
    "station": r"bus|depot|bmtc",
    "mall": r"big bazaar|reliance|d-?mart|more\b|supermarket",
}
QUERY = """[out:json][timeout:120];
(
  nwr["amenity"="school"]["name"]({b});
  nwr["amenity"="hospital"]["name"]({b});
  nwr["shop"="mall"]["name"]({b});
  nwr["railway"="station"]["name"]({b});
  nwr["public_transport"="station"]["name"]({b});
  nwr["name"~"Tech ?Park|Tech Village|Ecospace|Business Park|Technology Park|ITPL|International Tech",i]["highway"!~"."]["amenity"!~"."]({b});
);
out center tags;"""


def get(url, data=None):
    # through curl: the system Python's TLS is too old for these servers
    cmd = ["curl", "-sf", "--max-time", "180", "-A", UA["User-Agent"], url]
    if data:
        cmd += ["--data-binary", data.decode()]
    return json.loads(subprocess.run(cmd, check=True, capture_output=True, text=True).stdout)


def km(a, b):
    dy = (a[0] - b[0]) * 110.574
    dx = (a[1] - b[1]) * 111.32 * math.cos(math.radians(a[0]))
    return math.hypot(dx, dy)


def kind(t):
    if t.get("amenity") == "school":
        return "school"
    if t.get("amenity") == "hospital":
        return "hospital"
    if t.get("shop") == "mall":
        return "mall"
    if t.get("railway") == "station" or t.get("public_transport") == "station":
        return "station"
    return "tech"


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


centres = {}
for slug, way in PLOTS:
    els = get(f"https://api.openstreetmap.org/api/0.6/way/{way}/full.json")["elements"]
    nodes = [e for e in els if e["type"] == "node"]
    centres[slug] = (sum(n["lat"] for n in nodes) / len(nodes), sum(n["lon"] for n in nodes) / len(nodes))

lats = [c[0] for c in centres.values()]
lons = [c[1] for c in centres.values()]
box = f"{min(lats) - 0.08},{min(lons) - 0.08},{max(lats) + 0.08},{max(lons) + 0.08}"
els = get("https://overpass-api.de/api/interpreter", urllib.parse.urlencode({"data": QUERY.format(b=box)}).encode())["elements"]

places = []
for e in els:
    t = e["tags"]
    name = (t.get("name:en") or t.get("name") or "").strip()
    k = kind(t)
    if not name or re.search(LEAVE_OUT[k], name, re.I):
        continue
    metro = t.get("station") in ("subway", "light_rail") or t.get("subway") == "yes" or "metro" in (t.get("network", "") + t.get("operator", "")).lower()
    if k == "station" and not (t.get("railway") == "station" or metro):
        continue
    at = (e["lat"], e["lon"]) if "lat" in e else (e["center"]["lat"], e["center"]["lon"])
    # one entry per place: the same kind under a like name within 800 m is a duplicate
    if any(p["kind"] == k and (norm(p["name"]) in norm(name) or norm(name) in norm(p["name"])) and km(p["at"], at) < 0.8 for p in places):
        continue
    if k == "station":
        name = f"{name} metro" if metro else f"{name} railway station"
    places.append({"kind": k, "name": name, "at": at})

chosen = {}
for slug, c in centres.items():
    for k, (n, reach) in LIMITS.items():
        if slug == "pursuit-of-the-elements" and k in ("school", "hospital"):
            continue
        near = sorted((p for p in places if p["kind"] == k and km(c, p["at"]) <= reach), key=lambda p: km(c, p["at"]))[:n]
        for p in near:
            key = (p["kind"], p["name"])
            d = km(c, p["at"])
            if key not in chosen or d < chosen[key]["km"]:
                chosen[key] = {**p, "near": slug, "km": d}

rows = sorted(chosen.values(), key=lambda p: (p["near"], p["kind"], p["km"]))
out = [
    {"kind": p["kind"], "name": p["name"], "near": p["near"], "at": [round(p["at"][0], 6), round(p["at"][1], 6)], "rank": round(p["km"], 2)}
    for p in rows
]
body = ",\n".join("  " + json.dumps(o, ensure_ascii=False) for o in out)
centre_body = ",\n".join(f'  "{s}": [{round(c[0], 6)}, {round(c[1], 6)}]' for s, c in centres.items())
ts = f"""/*
 * Generated by scripts/fetch-landmarks.py from OpenStreetMap (© OpenStreetMap contributors, ODbL). Do not edit by hand.
 * The landmarks round each mapped community: kind, name, the community it is nearest, its position (latitude,
 * longitude), and its rank (km in a straight line from the plot's centre, used only to order the names; never shown).
 */
export type LandmarkKind = "school" | "hospital" | "mall" | "station" | "tech";
export type Landmark = {{ kind: LandmarkKind; name: string; near: string; at: [number, number]; rank: number }};

/* Each community's plot centre (latitude, longitude): where its directions start. */
export const plotCentres: Record<string, [number, number]> = {{
{centre_body},
}};

export const landmarks: Landmark[] = [
{body},
];
"""
open(os.path.join(ROOT, "src", "lib", "landmarks.generated.ts"), "w").write(ts)
print(len(out), "landmarks")
