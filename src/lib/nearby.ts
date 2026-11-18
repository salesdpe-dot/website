/*
 * The schools and hospitals round Pursuit of the Elements, as Disha's sales team listed them on 18 November 2026:
 * the distance and the drive by road from the site, in their words. Names are as Google Maps gives them, and each
 * place is the one the team's own Maps link pointed to, with the position that link carried (`at`, latitude and
 * longitude), so the community map can pin it. Two links carried no position: Crestwood High's, and National Public
 * School's, which arrived cut short. Those two are listed but not pinned until Disha sends them again.
 *
 * Kept apart from proof.ts so the map can use it without loading the projects.
 */
export const siteQuery = "Disha Pursuit of the Elements, Gunjur, Bengaluru";

/* Driving directions in Google Maps, from the site unless another start is given. */
export function directionsUrl(destination: string, origin = siteQuery) {
  const q = new URLSearchParams({ api: "1", origin, destination, travelmode: "driving" });
  return `https://www.google.com/maps/dir/?${q.toString()}`;
}

export type NearbyKind = "school" | "hospital";
export type Nearby = { name: string; km: number; minutes: number; place: string; at?: [number, number] };
export const nearbyCheckedOn = "November 2026";
export const nearby: { kind: NearbyKind; title: string; places: Nearby[] }[] = [
  {
    kind: "school",
    title: "Schools",
    places: [
      { name: "The Foundation School", km: 0.2, minutes: 1, place: "The Foundation School - Gunjur Campus, Varthur, Bengaluru", at: [12.920663, 77.756891] },
      { name: "EuroSchool Gunjur", km: 0.7, minutes: 2, place: "EuroSchool Gunjur, Gunjur - Mugalur Road, Bengaluru", at: [12.917716, 77.755083] },
      { name: "Basil Woods International School", km: 1.1, minutes: 3, place: "Basil Woods International School, Gunjur - Mugalur Road, Bengaluru", at: [12.9188546, 77.7517383] },
      { name: "Deens Academy", km: 1.2, minutes: 4, place: "Deens Academy, Gunjur - Mugalur Road, Bengaluru", at: [12.9157919, 77.7616184] },
      { name: "Chrysalis High", km: 1.5, minutes: 4, place: "Chrysalis High Gunjur, Bengaluru", at: [12.919911, 77.748433] },
      { name: "Kangaroo Kids International Preschool", km: 1.6, minutes: 4, place: "Kangaroo Kids International PreSchool, Gunjur - Nerige Road, Bengaluru", at: [12.919241, 77.747065] },
      { name: "Crestwood High", km: 2.5, minutes: 6, place: "Crestwood High, State Highway 35, Varthur, Bengaluru" },
      { name: "Naksha Academy", km: 2.5, minutes: 6, place: "Naksha Academy, Devasthanagalu, Varthur, Bengaluru", at: [12.9208213, 77.7388268] },
      { name: "National Public School", km: 2.9, minutes: 9, place: "National Public School near Gunjur, Bengaluru" },
    ],
  },
  {
    kind: "hospital",
    title: "Hospitals",
    places: [
      { name: "Sahasra Hospitals", km: 3.3, minutes: 14, place: "Sahasra Hospitals, MKS Towers, Varthur Road, Bengaluru", at: [12.9338125, 77.7431875] },
      { name: "Krish Hospital", km: 3.1, minutes: 15, place: "Krish Hospital - Gunjur, Bengaluru", at: [12.9240979, 77.7367605] },
      { name: "Lakshmi Nursing Home", km: 3.1, minutes: 15, place: "Lakshmi Nursing Home, Chennaraya Swamy Temple Street, Varthur, Bengaluru", at: [12.9411861, 77.7462629] },
      { name: "Swastik Hospitals, Dommasandra", km: 6.5, minutes: 20, place: "Swastik Hospitals, Dommasandra, Bengaluru", at: [12.8845154, 77.7494632] },
      { name: "Manipal Hospital, Varthur Road", km: 5.4, minutes: 22, place: "Manipal Hospital Varthur Road, Whitefield, Bengaluru", at: [12.9581418, 77.7455758] },
      { name: "Spandana Heart & Super Speciality Hospital", km: 8, minutes: 22, place: "Spandana Heart & Super Speciality Hospital, Sarjapur, Bengaluru", at: [12.8671939, 77.767433] },
      { name: "Apollo Hospitals, Sarjapur Road", km: 7.4, minutes: 24, place: "Apollo Hospitals - Sarjapur Road, Bengaluru", at: [12.9012497, 77.7087785] },
      { name: "Snehadaan Hospital", km: 7, minutes: 26, place: "Snehadaan Hospital, Carmelaram, Sarjapur Road, Bengaluru", at: [12.9016174, 77.7147052] },
      { name: "SPARSH Hospital, Sarjapur Road", km: 8.4, minutes: 29, place: "SPARSH Hospital Sarjapur Road, Carmelaram, Bengaluru", at: [12.9044189, 77.7015339] },
    ],
  },
];

/*
 * Where a latitude and longitude falls on the community map, in its metres from the area's north-west corner:
 * the projection of scripts/build-map.py (metres from 13.11° N, 77.55° E, scaled at 12.985° N), less the area's
 * corner, which build-map.py placed 7,680 m east of that origin and on the same line north.
 */
const KX = 111320 * Math.cos((12.985 * Math.PI) / 180);
const AREA_X0 = 7680;
export function toMap([lat, lng]: [number, number]): [number, number] {
  return [(lng - 77.55) * KX - AREA_X0, (13.11 - lat) * 110574];
}

/* Every pinned place, nearest first within its kind, in the map's metres. */
export const nearbyPins = nearby.flatMap((g) =>
  g.places
    .filter((p): p is Nearby & { at: [number, number] } => !!p.at)
    .map((p) => {
      const [x, y] = toMap(p.at);
      return { kind: g.kind, name: p.name, km: p.km, minutes: p.minutes, href: directionsUrl(p.place), x, y };
    }),
);
