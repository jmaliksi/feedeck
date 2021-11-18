export const plateOutcomes = [
  4, // Stolen base
  5, // Walk
  6, // Strikeout
  7, // Flyout
  8, // Ground out
  9, // Home run
  10, // Hit (single/double/triple)
  22, // Hit by pitch
  23, // Player skipped due to being Shelled or Elsewhere
  27, // Mild pitch
];

export const changes = [
  24, // Partying
  35, // Birds free shelled player
  40, // Feedback blocked
  41, // Feedback
  47, // Allergic reaction
  49, // Reverb shuffle
  51, // Blooddrain
  52, // Siphon
  54, // Incineration
  67, // Consumers attack
  72, // Peanut Mister
  74, // Tasting the infinite (Shelling)
  84, // Return from Elsewhere

  109, // Player recruited (including Postseason Births)
  110, // Player sent to shadows and replaced (necromancy)
  111, // Player removed and replaced from shadows (Returned)
  112, // ECHO STATIC player removed from team
  113, // Player trade
  114, // Player changing position
  115, // Player joining team
  116, // New player after incineration
  117, // Player stat increase
  118, // Player stat decrease
  119, // Player reroll
  125, // Player enters the Hall of Flame
  126, // Player exits the Hall of Flame
  127, // Player gained item
  130, // Reverb shuffle (full)
  132, // Reverb shuffle (rotation)
  137, // Player hatched
  139, // Player Evolves
  145, // Player becomes an Alternate
  149, // Necromancy narration
  150, // Returned player is permitted to stay
  161, // Player gained blood type
  168, // Peanut allergy cured (Nut Button)
  170, // Echo player becomes Static
  179, // Player hidden stat increase
  180, // Player hidden stat decrease
];

export const neat = [
  34, // Murder of crows
  36, // Triple Threat
  37, // Free Refill
  39, // Wired
  48, // Reverberating
  55, // Fire eating
  62, // Flood
  63, // Salmon swim upstream
  65, // Entering the Secret Base
  66, // Exiting the Secret Base
  70, // Grind Rail
];

export const team = [
  56, // Flag planted
  57, // Renovation built
  60, // Blessing won
  61, // Will received
  78, // Solar Panels start-up text
  79, // Solar Panels overflow run collection
  135, // New team
  136, // New player (excluding incinerations)
  141, // Team wins Internet Series
  166, // Lineup optimized
];

/*
 * 0: Plays
 * 1: Changes
 * 2: Special
 * 3: Outcomes
 * 4: Narrative
 */

export const types = [...plateOutcomes, ...changes, ...neat, ...team];

export const knownTypes = [
  {value: 0, desc: "Game start"},
  {value: 1, desc: "Play ball!"},
  {value: 2, desc: "Half-inning"},
  {value: 3, desc: "Pitcher change"},
  {value: 4, desc: "Stolen base"},
  {value: 5, desc: "Walk"},
  {value: 6, desc: "Strikeout"},
  {value: 7, desc: "Flyout"},
  {value: 8, desc: "Ground out"},
  {value: 9, desc: "Home run"},
  {value: 10, desc: "Hit (single/double/triple)"},
  {value: 11, desc: "Game end"},
  {value: 12, desc: "Plate appearance"},
  {value: 13, desc: "Strike (not including Foul Balls)"},
  {value: 14, desc: "Ball"},
  {value: 15, desc: "Foul Ball"},
  {value: 20, desc: "Runs are overflowing"},
  {value: 21, desc: "Home Field Advantage activation"},
  {value: 22, desc: "Hit by pitch"},
  {value: 23, desc: "Player skipped due to being Shelled or Elsewhere"},
  {value: 24, desc: "Partying"},
  {value: 25, desc: "Strike zapped by Electric blood"},
  {value: 26, desc: "Weather change"},
  {value: 27, desc: "Mild pitch"},
  {value: 28, desc: "End of inning"},
  {value: 29, desc: "Site takeover text"},
  {value: 30, desc: "Black Hole: collect 10 (in-game)"},
  {value: 31, desc: "Sun 2: collect 10 (in-game)"},
  {value: 33, desc: "Birds: circling, no shelled player"},
  {value: 34, desc: "Birds: Friend of Crows proc"},
  {value: 35, desc: "Birds: freeing a shelled player"},
  {value: 36, desc: "Coffee 3s: gaining Triple Threat"},
  {value: 37, desc: "Coffee 2: gaining a Free Refill"},
  {value: 39, desc: "Coffee: gaining/losing Wired/Tired"},
  {value: 40, desc: "Feedback: swap blocked"},
  {value: 41, desc: "Feedback: swap"},
  {value: 45, desc: "Peanuts: Superallergic reaction"},
  {value: 47, desc: "Peanuts: allergic reaction"},
  {value: 48, desc: "Reverb: becoming Reverberating"},
  {value: 49, desc: "Reverb: roster shuffle message"},
  {value: 51, desc: "Blooddrain: normal transfusion"},
  {value: 52, desc: "Blooddrain: Siphon proc"},
  {value: 53, desc: "Blooddrain: transfusion (either normal/Siphon) blocked by Sealant"},
  {value: 54, desc: "Solar Eclipse: Incineration"},
  {value: 55, desc: "Solar Eclipse: Incineration blocked"},
  {value: 56, desc: "Flag planted"},
  {value: 57, desc: "Renovation built"},
  {value: 58, desc: "Light switch is now OFF/ON"},
  {value: 59, desc: "Decree passed"},
  {value: 60, desc: "Blessing won"},
  {value: 61, desc: "Will received"},
  {value: 62, desc: "Flooding"},
  {value: 63, desc: "Salmon: salmon swim upstream"},
  {value: 64, desc: "Polarity: polarity shift"},
  {value: 65, desc: "Entering the Secret Base"},
  {value: 66, desc: "Exiting the Secret Base"},
  {value: 67, desc: "Consumers attack"},
  {value: 69, desc: "Echo Chamber"},
  {value: 70, desc: "Grind Rail"},
  {value: 71, desc: "Tunnels used"},
  {value: 72, desc: "Peanut Mister"},
  {value: 73, desc: "Peanuts: flavor text"},
  {value: 74, desc: "Tasting the infinite (Shelling)"},
  {value: 76, desc: "Event Horizon activates"},
  {value: 77, desc: "Event Horizon awaits"},
  {value: 78, desc: "Solar Panels start-up text"},
  {value: 79, desc: "Solar Panels overflow run collection"},
  {value: 81, desc: "Tarot reading"},
  {value: 82, desc: "Emergency Alert"},
  {value: 84, desc: "Return from Elsewhere"},
  {value: 85, desc: "Over Under"},
  {value: 86, desc: "Under Over"},
  {value: 88, desc: "Undersea"},
  {value: 91, desc: "Homebody"},
  {value: 92, desc: "Superyummy"},
  {value: 93, desc: "Perk"},
  {value: 96, desc: "Earlbirds"},
  {value: 97, desc: "Late to the Party"},
  {value: 99, desc: "Shame Donor"},
  {value: 106, desc: "Added modification"},
  {value: 107, desc: "Removed modification"},
  {value: 108, desc: "Timed modification expires"},
  {value: 109, desc: "Player recruited (including Postseason Births)"},
  {value: 110, desc: "Player sent to shadows and replaced (necromancy)"},
  {value: 111, desc: "Player removed and replaced from shadows (Returned)"},
  {value: 112, desc: "Player removed from team"},
  {value: 113, desc: "Player trade"},
  {value: 114, desc: "Player position swap within team"},
  {value: 115, desc: "Player moved from one team to another"},
  {value: 116, desc: "Player incineration replacement"},
  {value: 117, desc: "Player rating increase"},
  {value: 118, desc: "Player rating decrease"},
  {value: 119, desc: "Player reroll"},
  {value: 122, desc: "Rating change from Superallergic reaction"},
  {value: 124, desc: "Failed player move due to Force"},
  {value: 125, desc: "Player enters the Hall of Flame"},
  {value: 126, desc: "Player exits the Hall of Flame"},
  {value: 127, desc: "Player gained item"},
  {value: 128, desc: "Player lost item"},
  {value: 130, desc: "Reverb shuffle (full)"},
  {value: 131, desc: "Reverb shuffle (lineup)"},
  {value: 132, desc: "Reverb shuffle (rotation)"},
  {value: 133, desc: "Team incineration replacement"},
  {value: 135, desc: "New Challenger (team joins the league)"},
  {value: 136, desc: "Existing player joins the ILB"},
  {value: 137, desc: "Player hatched / Replica created"},
  {value: 138, desc: "Team joins the league (Library)"},
  {value: 139, desc: "Player Evolves"},
  {value: 141, desc: "Team wins Internet Series"},
  {value: 142, desc: "Postseason spot"},
  {value: 143, desc: "Final Regular Season standings"},
  {value: 144, desc: "Modification replaced"},
  {value: 145, desc: "Player becomes an Alternate"},
  {value: 146, desc: "Added modification due to another mod"},
  {value: 147, desc: "Removed modification added by another mod"},
  {value: 148, desc: "Replaced modification due to another mod"},
  {value: 149, desc: "Narration for necromancy / extraplanar plunder"},
  {value: 150, desc: "Returned player is permitted to stay"},
  {value: 151, desc: "Decree narration"},
  {value: 152, desc: "Will results"},
  {value: 153, desc: "Team stat adjustments (S15+)"},
  {value: 154, desc: "Team shamed by another"},
  {value: 155, desc: "Team shames another"},
  {value: 156, desc: "Sun 2 grants a Win (pre-S20)"},
  {value: 157, desc: "Black Hole swallows a Win (pre-S20)"},
  {value: 158, desc: "Eliminated from postseason"},
  {value: 159, desc: "Postseason advance"},
  {value: 161, desc: "Player gained blood type"},
  {value: 165, desc: "High Pressure"},
  {value: 166, desc: "Roster sorted"},
  {value: 168, desc: "Peanut allergy cured (Nut Button)"},
  {value: 169, desc: "Echoed player"},
  {value: 170, desc: "Echo into Static"},
  {value: 171, desc: "Removed multiple modifications due to another mod (Echo)"},
  {value: 172, desc: "Added multiple modifications due to another mod (Echo)"},
  {value: 173, desc: "PsychoAcoustics"},
  {value: 174, desc: "Receiver becomes an Echo"},
  {value: 175, desc: "Investigation progress (upshellable for fish)"},
  {value: 176, desc: "Election results: Tidings subsection"},
  {value: 177, desc: "Glitter: Crate drop"},
  {value: 178, desc: "Middling"},
  {value: 179, desc: "Player hidden stat increase"},
  {value: 180, desc: "Player hidden stat decrease"},
  {value: 181, desc: "Entering a Crime Scene"},
  {value: 182, desc: "Ambitious"},
  {value: 183, desc: "Unambitious"},
  {value: 184, desc: "Coasting"},
  {value: 185, desc: "Item breaks"},
  {value: 186, desc: "Item damaged"},
  {value: 187, desc: "Broken item repaired"},
  {value: 188, desc: "Damaged item repaired"},
  {value: 189, desc: "Community Chest opens"},
  {value: 190, desc: "No free item slot"},
  {value: 191, desc: "Fax Machine activation"},
  {value: 192, desc: "Holiday Inning"},
  {value: 193, desc: "Prize Match (declaring what the prize is)"},
  {value: 194, desc: "Team received gifts"},
  {value: 195, desc: "Smithy activation"},
  {value: 196, desc: "Player enters the Vault"},
  {value: 198, desc: "A Blood Type"},
  {value: 199, desc: "Player soul increase"},
  {value: 201, desc: "Narrative being actions"},
  {value: 202, desc: "Library: Pre-season message"},
  {value: 203, desc: "Ballpark mod Ratified into Non-Physical Law"},
  {value: 204, desc: "SMASH"},
  {value: 206, desc: "Hype built in ballpark"},
  {value: 208, desc: "Practicing Moderation"},
  {value: 209, desc: "Runs scored"},
  {value: 210, desc: "League modification added"},
  {value: 211, desc: "League modification removed"},
  {value: 213, desc: "Ballons inflated from win"},
  {value: 214, desc: "Win collected (Regular Season, S20+)"},
  {value: 215, desc: "Win collected (Postseason, S20+)"},
  {value: 216, desc: "Game over"},
  {value: 217, desc: "Sun(Sun) pressure change"},
  {value: 218, desc: "Tunnel used, nothing found"},
  {value: 219, desc: "Tunnel used, fled Elsewhere"},
  {value: 220, desc: "Tunnel used, stole item"},
  {value: 223, desc: "Weather event"},
  {value: 224, desc: "Element added to item"},
  {value: 226, desc: "Sun 30 smiles"},
  {value: 228, desc: "Voicemail activation"},
  {value: 230, desc: "Phantom Thieves Guild steals item"},
  {value: 231, desc: "Phantom Thieves Guild steals player"},
  {value: 232, desc: "[TUMBLEWEED SOUNDS]"},
  {value: 233, desc: "Trader/Traitor"},
  {value: 234, desc: "Item trade failed"},
  {value: 236, desc: "Item traded"},
  {value: 238, desc: "[Unknown - redacted] (Library)"},
  {value: 241, desc: "Vault revealed"},
  {value: 246, desc: "Game cancelled"},
  {value: 247, desc: "Sun(Sun) Supernova"},
  {value: 249, desc: "Black Hole (Black Hole)"},
  {value: 251, desc: "Jazz"},
  {value: 256, desc: "From diagonal, glood"},
];

export const listenFeed = function(cb) {
  let stream = new EventSource(`https://api.sibr.dev/eventually/sse`);
  stream.addEventListener("message", (event) => {
    const f = JSON.parse(event.data);
    if (types.includes(f.type)) {
      cb(JSON.parse(event.data));
    }
  });
  stream.addEventListener("error", () => {
    console.log("allyoops");
    if (stream !== undefined) {
      stream.close();
    }
    setTimeout(() => listenFeed(cb), 2000);
  });
};

export const fetchFeed = ({playerIds, teamIds, eventTypes, beings, categories, after, limit, before, unredacted, ids, season, day}) => {
  if (unredacted) {
    return fetch(`https://api.sibr.dev/upnuts/upstream`)
      .then(res => res.json())
      .then(events => events.filter((e) => e.type === 'THRESHOLD_PASSED_SCALES'))
      .then(events => events.map((e) => e.event))
  }

  const events = eventTypes?.filter((t) => t >= 0);
  const phases = eventTypes?.filter((t) => t <0).map((t) => -t);

  let params = new URLSearchParams();
  if (playerIds && playerIds.length > 0) {
    params.append("playerTags", playerIds.join("_or_"));
  }
  if (teamIds && teamIds.length > 0) {
    params.append("teamTags", teamIds.join("_or_"));
  }
  if (events && events.length > 0) {
    params.append("type", events.join("_or_"));
  }
  if (phases && phases.length > 0) {
    params.append("phase", phases.join("_or_"));
  }
  if (beings && beings.length > 0) {
    params.append("metadata.being", beings.join("_or_"));
  }
  if (categories && categories.length > 0) {
    params.append("category", categories.join("_or_"));
  }
  if (after) {
    params.append("after", after);
  }
  if (before) {
    params.append("before", before);
  }
  if (ids && ids.length > 0) {
    params.append("id", ids.join("_or_"));
  }
  if (season) {
    params.append("season", season - 1);
  }
  if (day) {
    params.append("day", day - 1);
  }
  params.append("limit", limit || 100);
  return fetch(`https://api.sibr.dev/eventually/v2/events?${params.toString()}`)
    .then(res => res.json());
};
