import NodeCache from "node-cache";
const cache = new NodeCache();

const neatPitchEvents = [
  /hits a (Single|Double|Triple|Quadruple|grand slam)/,
  /hits a (solo|2-run|3-run|4-run) home run/,
  /strikes out/,
  /hits [\w\s]+ with a pitch/,
  /draws a walk/,
  /charms/
];

const neatHitEvents = [
  /hits a (Single|Double|Triple|Quadruple|grand slam)/,
  /hits a (solo|2-run|3-run|4-run) home run/,
  /strikes out/,
  /hits [\w\s]+ with a pitch/,
  /draws a walk/,
  /steals (second base|third base|fourth base|fifth base|home)/,
  /scores/,
  /Red Hot/,
  /flyout/,
  /ground out/,
  /charms/
];

const neatChangeEvents = [
  /Rogue Umpire/,
  /feedback/,
  /Reverb/,
  /(yummy|allergic) reaction/,
  /they peck [\w\s]+ free!/,
  /Big Peanut/,
  /tastes the infinite/,
  /is now being Observed/,
  /surge of Immateria/,
  /Elsewhere/,
  /CONSUMERS ATTACK/,
  /ECHO/,
  /STATIC/,
  /Echoed/
];

export const blaseballPhases = [
  {value: -1, desc: "Pre-season"},
  {value: -2, desc: "EarlSeason"},
  {value: -3, desc: "EarlSiesta"},
  {value: -4, desc: "MidSeason"},
  {value: -5, desc: "LateSiesta"},
  {value: -6, desc: "LateSeason"},
  {value: -7, desc: "Season End"},
  {value: -8, desc: "Pre-Postseason"},
  {value: -9, desc: "Early Postseason"},
  {value: -10, desc: "Early Postseason End"},
  {value: -11, desc: "Postseason"},
  {value: -12, desc: "Postseason End"},
  {value: -13, desc: "Election"},
];

const BASE_URL = "https://api.sibr.dev/corsmechanics/blaseball/"

function isPitching(update) {
  for (const pattern of neatPitchEvents) {
    if (pattern.test(update)) {
      return true;
    }
  }
  return false;
}

function isNeat(update) {
  for (const pattern of [...neatHitEvents, ...neatChangeEvents]) {
    if (pattern.test(update)) {
      return true;
    }
  }
  return false;
}

export const scheduleToFeed = function(schedule) {
  return schedule.map((game) => {
    let feed = {
      id: `${game.id}_${game.playCount}`,
      playerTags: [],
      teamTags: [
        game.awayTeam,
        game.homeTeam
      ],
      gameTags: [
        game.id
      ],
      season: game.season,
      tournament: game.tournament,
      day: game.day,
      phase: game.phase,
      category: 0, // uh
      description: game.lastUpdate,
      nuts: 0,
      playerNames: [],
      teamNames: [
        game.awayTeamName,
        game.homeTeamName,
      ],
      created: null,
      type: null, // TODO lmao
      metadata: {}
    };
    let players = [];
    if (isPitching(game.lastUpdate)) {
      if (game.topOfInning) {
        players.push(game.homePitcher);
      } else {
        players.push(game.awayPitcher);
      }
    }
    feed.playerTags = players;
    if (players.length || isNeat(game.lastUpdate)) {
      return feed;
    }
    return undefined;
  }).filter(f => f !== undefined);
};

const cachedFetch = function(url, ttl) {
  const cached = cache.get(url);
  if (cached !== undefined) {
    return Promise.resolve(cached);
  }
  const promised = cache.get(`promised${url}`);
  if (promised !== undefined) {
    return promised;
  }
  const p = fetch(url).then(res => res.json()).then(js => {
    cache.set(url, js, ttl);
    return js;
  });
  cache.set(`promised${url}`, p, 5);
  return p;
};

export const getSimulationData = function() {
  return cachedFetch(`${BASE_URL}database/simulationData`, 1800);
};

export const getMod = function(id) {
  if (!id) {
    return Promise.resolve([]);
  }
  return cachedFetch(`${BASE_URL}database/mods?ids=${id}`, 6000);
};

export const getItem = function(id) {
  if (!id) {
    return Promise.resolve([]);
  }
  return cachedFetch(`${BASE_URL}database/items?ids=${id}`, 300);
};

export const getTeam = function(id) {
  return cachedFetch(`${BASE_URL}database/team?id=${id}`, 300);
}
