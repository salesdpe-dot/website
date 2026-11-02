#!/bin/bash
# Encodes the site's silent films from the client's renders in assets/ (not in git) into public/media/elements.
# Usage: bash scripts/encode-films.sh [name ...]      (no names: every film; needs ffmpeg)
#
# Each film is cut from one source clip at the in-point and length below, in the renditions src/lib/film.ts
# picks between: 1080 (1920×1080), 720 (1280×720), p (540×960, cropped upright for phones held that way)
# and card (640×800, the amenity row's 4:5 frame). "centre" is where across the frame (0 to 1) the
# upright crops sit. H.264, no sound, the index at the front so a film starts before it has all arrived.
# Each film's poster is its first frame, saved as public/images/pursuit-of-the-elements/<name>.webp; a film
# with a card cut also gets <name>-card.webp, the same frame in the card's 864×1080 crop (card-* films only that).
# A source that is not 1920×1080 is first centre-cropped to 16:9 and scaled to it, so the crops hold.
# The walkthrough shorts (SHORTS, further down) are the client's own edits, kept whole and with their music.
set -e
cd "$(dirname "$0")/.."
ROOT=$PWD
OUT=$ROOT/public/media/elements
POSTERS=$ROOT/public/images/pursuit-of-the-elements
mkdir -p "$OUT"

# Batch one used preset veryslow. Batch two (room-*, club-*, out-*, short-*) used slow: the same picture at the
# same CRF for about 4% more bytes, three times quicker.
X264="-c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv"
preset() { [[ $1 == room-* || $1 == club-* || $1 == out-* || $1 == short-* ]] && echo slow || echo veryslow; }

# name  renditions  in(s)  length(s)  centre  source (under assets/)
FILMS='hero-towers	1080,720,p	0	10	0.5	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/1.MP4
hero-clubhouse	1080,720,p	0	10	0.5	assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Amphitheatre to globe.mp4
hero-outdoors	1080,720,p	0	8	0.5	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Pickleball to Outdoor cafe aerial.mp4
card-pool	card	2	5	0.55	assets 2/Clubhouse Individual shots/Swimming pool Timelapse .mp4
card-terrace	card	0	5	0.5	assets 2/Clubhouse Individual shots/3rd Floor Terrace cafe.mp4
card-lounge	card	0	5	0.5	assets 2/Clubhouse Individual shots/Business Centre 6.mp4
card-gym	card	0	5	0.40	assets 2/Clubhouse Individual shots/Gym 2.mp4
card-theatre	card	4	5	0.60	assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Mini Theatre.mp4
card-badminton	card	5	5	0.5	assets 2/Clubhouse Individual shots/Indoor Badminton 2.mp4
card-courts	card	0	5	0.5	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Pickle ball to fulsall 1.mp4
card-petpark	card	0	5	0.5	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/24.MP4
pote-hero	1080,720,p	5	3	0.60	assets 2/Exterior Individual shots /15.10.2026/BALCONY TO CLUBHOUSE 1.mp4
pote-villas	720,p	0	10	0.5	assets 2/Exterior Individual shots /Individual Shot/villa pull back.mp4
pote-outdoors	720,p	0	8	0.5	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Amphitheatre to Highpoint 1.mp4
pote-night	720,p	0	10	0.5	assets 2/Exterior Individual shots /Individual Shot/Night shot.mp4
pote-home	720,p	0	13.8	0.48	(three clips, below)
room-lobby	720,p,card	0	8	0.6	assets 2/Clubhouse Individual shots/tripple height lobby skylight.mp4
room-reception	720,card	0	6	0.7	assets 2/Clubhouse Individual shots/reception 1.mp4
room-cowork	720,card	0	6	0.75	assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Co working Business centre.mp4
room-conference	720,card	0	6	0.5	assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Conferance business centre.mp4
room-library	720,card	0	6	0.5	assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Library 1.mp4
room-theatre	720	5	5	0.5	assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Mini Theatre.mp4
room-music	720,card	0	5	0.33	assets 2/Clubhouse Individual shots/Music Room 1.mp4
room-dance	720,card	0	6	0.55	assets 2/Clubhouse Individual shots/Dance floor.mp4
room-gym	720,card	0	5	0.47	assets 2/Clubhouse Individual shots/Gym 1.mp4
room-badminton	720,card	0	6	0.4	assets 2/Clubhouse Individual shots/Indoor Badminton 1.mp4
room-tt	720,card	0	5	0.52	assets 2/Clubhouse Individual shots/Table tennis 1.mp4
room-games	720,card	0	5	0.5	assets 2/Clubhouse Individual shots/Indoor Games 1.mp4
room-banquet	720,card	0	5	0.5	assets 2/Clubhouse Individual shots/Banquet Hall 1.mp4
room-guest	720,card	0	5	0.62	assets 2/Clubhouse Individual shots/Guest room .mp4
room-senior	720,card	0	5	0.5	assets 2/Clubhouse Individual shots/senior lounge 1.mp4
room-classroom	720,card	0	6	0.5	assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Classroom 1 - Revise.mp4
room-yoga	720,card	0	6	0.55	assets 2/Clubhouse Individual shots/1st Floor Yoga deck.mp4
room-terrace	720,card	0	6	0.5	assets 2/Clubhouse Individual shots/2nd Floor Terrace Seating.mp4
room-cafe	720	0	6	0.5	assets 2/Clubhouse Individual shots/3rd Floor Terrace cafe.mp4
club-night	720,p	0	5	0.48	assets 2/Clubhouse Individual shots/Clubhouse Night shot .mp4
club-elevation	720,p	0	6	0.58	assets 2/Clubhouse Individual shots/Clubhouse Elevation 1.mp4
club-aerial	720,p	0	6	0.5	assets 2/Clubhouse Individual shots/Clubhouse Semi Aerial .mp4
out-petpark	720,p,card	0	6	0.28	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/PET Park to Aqua 1.mp4
out-golf	720,p,card	0	5	0.5	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/22.MP4
out-elements	720,p,card	0	6	0.45	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Elements to villa 1.mp4
out-villas	720,p	0	6	0.42	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/43.MP4
out-villa-front	720,p	0	6	0.5	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Villa front to aerial 2.mp4
out-yoga-gym	720,p,card	0	6	0.5	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/yoga to outdoor gym 1.mp4
out-door	720,p	0	5	0.42	assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Door opening Close up.mp4
out-balcony	720,p	0	5	0.5	assets 2/Exterior Individual shots /15.10.2026/BALCONY TO CLUBHOUSE 2.mp4
out-volleyball	720,card	0	5	0.6	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/15.MP4
out-skate	720,card	0	5	0.55	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/16.MP4
out-kids-play	720,card	0	5	0.7	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/32.MP4
out-podium	720,card	0	5	0.5	assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/35.MP4'

# The walkthrough shorts: the client's own edited films (about 20 s, with music), kept whole for the click-to-play
# player: 1080 and 720 cuts with AAC 128k stereo. The brief asked for CRF 24/25; at that they came to about 12 MB
# each, so they use 28/29 (1080 cut: VMAF 92–94 against the source). The poster is the frame at the time
# given, not the first frame, which is a white title card.
# name  poster at (s)  source (under assets/)
SHORTS='short-clubhouse-1	12	assets 2/Walkthrough videos/Short Videos /clubhouse short 1.mp4
short-clubhouse-2	10.5	assets 2/Walkthrough videos/Short Videos /clubhouse short 2.mp4
short-1	13.3	assets 2/Walkthrough videos/Short Videos /short video 1.mp4
short-4	10	assets 2/Walkthrough videos/Short Videos /short video 4.mp4'
SHORT_CRF_1080=28
SHORT_CRF_720=29

short() {
  local name=$1 at=$2 src=$3 png
  ffmpeg -nostdin -v error -i "$src" -map 0:v:0 -map 0:a:0 -vf "scale=1920:1080:flags=lanczos,format=yuv420p" \
    -c:a aac -b:a 128k -ac 2 $X264 -preset "$(preset "$name")" -crf $SHORT_CRF_1080 -y "$OUT/$name-1080.mp4"
  echo "  $name-1080.mp4"
  ffmpeg -nostdin -v error -i "$src" -map 0:v:0 -map 0:a:0 -vf "scale=1280:720:flags=lanczos,format=yuv420p" \
    -c:a aac -b:a 128k -ac 2 $X264 -preset "$(preset "$name")" -crf $SHORT_CRF_720 -y "$OUT/$name-720.mp4"
  echo "  $name-720.mp4"
  png=$(mktemp -t poster).png
  ffmpeg -nostdin -v error -ss "$at" -i "$src" -frames:v 1 -vf "scale=in_color_matrix=bt709:in_range=tv:out_range=pc,format=rgb24" -y "$png"
  webp "$png" "$name"
  rm -f "$png"
}

# A source that is not 1920×1080 (two are not) is centre-cropped to 16:9 and scaled to 1920×1080 first.
norm() {
  [[ $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$1") == 1920x1080 ]] ||
    echo "crop=trunc(min(iw\\,ih*16/9)/2)*2:trunc(min(ih\\,iw*9/16)/2)*2,scale=1920:1080:flags=lanczos,"
}

# One rendition: encode <name> <rendition> <source> <in> <length> <centre>
encode() {
  local name=$1 rend=$2 src=$3 in=$4 dur=$5 c=$6 vf crf
  cropx() { python3 -c "w=$1; x=round(($c*1920 - w/2)/2)*2; print(max(0,min(1920-w,x)))"; }
  case $rend in
    1080) vf="scale=1920:1080:flags=lanczos"; crf=30 ;;
    720) vf="scale=1280:720:flags=lanczos"; crf=30 ;;
    p) vf="crop=608:1080:$(cropx 608):0,scale=540:960:flags=lanczos"; crf=29 ;;
    card) vf="crop=864:1080:$(cropx 864):0,scale=640:800:flags=lanczos"; crf=28 ;;
  esac
  ffmpeg -nostdin -v error -ss "$in" -i "$src" -t "$dur" -vf "$(norm "$src")$vf,format=yuv420p" -an $X264 -preset "$(preset "$name")" -crf $crf -y "$OUT/$name-$rend.mp4"
  echo "  $name-$rend.mp4"
}

# pote-home walks in: the front door, the living room, the master bedroom, five seconds each, with 0.6 s crossfades.
home_master() {
  local D="assets/assets 2/Exterior Individual shots /Individual Shot" master=$1
  ffmpeg -nostdin -v error -t 5 -i "$D/Individual shots set 1/41.MP4" -t 5 -i "$D/Living new.mp4" -t 5 -i "$D/Master bedroom new.mp4" \
    -filter_complex "[0:v]fps=24,settb=AVTB,format=yuv420p[a];[1:v]fps=24,settb=AVTB,format=yuv420p[b];[2:v]fps=24,settb=AVTB,format=yuv420p[c];[a][b]xfade=transition=fade:duration=0.6:offset=4.4[ab];[ab][c]xfade=transition=fade:duration=0.6:offset=8.8[v]" \
    -map "[v]" -an -c:v libx264 -preset fast -crf 10 -pix_fmt yuv420p -y "$master"
}

# The poster: the film's first frame, converted as the browser shows the film (BT.709), as WebP at quality 86.
poster() {
  local name=$1 file=$2 c=$3 in=$4 rends=$5 png x
  x=$(python3 -c "x=round(($c*1920 - 432)/2)*2; print(max(0,min(1056,x)))")
  png=$(mktemp -t poster).png
  ffmpeg -nostdin -v error -ss "$in" -i "$file" -frames:v 1 -vf "$(norm "$file")scale=in_color_matrix=bt709:in_range=tv:out_range=pc,format=rgb24" -y "$png"
  if [[ $name == card-* ]]; then
    webp "$png" "$name" "$x"
  else
    webp "$png" "$name"
    if [[ ,$rends, == *,card,* ]]; then webp "$png" "$name-card" "$x"; fi
  fi
  rm -f "$png"
}

# webp <png> <name> [x]: saves the poster, cropped to the card's 864×1080 from x when x is given.
webp() {
  node -e "const [, png, out, x] = process.argv; let s = require('sharp')(png);
    if (x) s = s.extract({ left: +x, top: 0, width: 864, height: 1080 });
    s.webp({ quality: 86 }).toFile(out)" "$1" "$POSTERS/$2.webp" "${3:-}"
}

while IFS=$'\t' read -r name rends in dur c src; do
  [[ $# -gt 0 && ! " $* " =~ " $name " ]] && continue
  echo "$name"
  if [[ $name == pote-home ]]; then
    src=$(mktemp -t pote-home).mp4
    home_master "$src"
  else
    src="assets/$src"
  fi
  for r in ${rends//,/ }; do encode "$name" "$r" "$src" "$in" "$dur" "$c"; done
  poster "$name" "$src" "$c" "$in" "$rends"
done <<< "$FILMS"

while IFS=$'\t' read -r name at src; do
  [[ $# -gt 0 && ! " $* " =~ " $name " ]] && continue
  echo "$name"
  short "$name" "$at" "assets/$src"
done <<< "$SHORTS"
