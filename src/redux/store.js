import { createStore } from 'redux';

const initialState = {
  feed: [],
  columnDefs: [],
  lastUpdate: Date.now(),
  autoRefresh: false,
  feeds: {},
  teamOptions: [],
  playerOptions: [],
  showCurrentSeason: false,
  showMetadata: true,
  showApple: false
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'autoRefresh/toggle':
      return {
        ...state,
        autoRefresh: !state.autoRefresh
      };
    case 'showCurrentSeason/set':
      return {
        ...state,
        showCurrentSeason: action.payload
      };
    case 'autoRefresh/set':
      return {
        ...state,
        autoRefresh: action.payload
      };
    case 'setOptions/teams':
      return {
        ...state,
        teamOptions: action.payload
      };
    case 'setOptions/players':
      return {
        ...state,
        playerOptions: action.payload
      };
    case 'columnDefs/set':
      return {
        ...state,
        columnDefs: [...action.payload]
      };
    case 'columnDefs/add':
      return {
        ...state,
        columnDefs: [...state.columnDefs, action.payload]
      };
    case 'columnDefs/remove':
      let feeds = {...state.feeds};
      delete feeds[action.payload];
      return {
        ...state,
        feeds: feeds,
        columnDefs: state.columnDefs.filter((entry) => {
          return entry.key !== action.payload;
        })
      };
    case 'columnDefs/update':
      return {
        ...state,
        columnDefs: state.columnDefs.map((entry) => {
          if (entry.key !== action.payload.key) {
            return entry;
          }
          return {
            key: entry.key,
            title: action.payload.title === undefined ? entry.title : action.payload.title,
            playerIds: action.payload.playerIds === undefined ? entry.playerIds : action.payload.playerIds,
            teamIds: action.payload.teamIds === undefined ? entry.teamIds : action.payload.teamIds,
            eventTypes: action.payload.eventTypes === undefined ? entry.eventTypes : action.payload.eventTypes,
            beings: action.payload.beings === undefined ? entry.beings : action.payload.beings,
            categories: action.payload.categories === undefined ? entry.categories : action.payload.categories
          };
        })
      };
    case 'columnDefs/move':
      let i = state.columnDefs.findIndex((e) => e.key === action.payload.id);
      let swap = i + action.payload.delta;
      if (swap < 0 || swap >= state.columnDefs.length) {
        return {...state}
      }
      let tmp = state.columnDefs[i];
      state.columnDefs[i] = state.columnDefs[swap];
      state.columnDefs[swap] = tmp;
      return {
        ...state,
        columnDefs: [
          ...state.columnDefs
        ]
      }
    case 'feeds/append':
      let copy = {
        ...state,
        feeds: {
          ...state.feeds
        }
      };
      let prev = [];
      if (!action.payload.reset) {
        prev = state.feeds[action.payload.id] || [];
      }
      let existingIds = new Set(prev.map(e => e.id));
      let prepend = [];
      if (action.payload.prepend) {
        prepend = prev;
        prev = [];
      }
      copy.feeds[action.payload.id] = [
        ...prepend,
        ...action.payload.entries.filter(e => !existingIds.has(e.id)),
        ...prev
      ];
      if (action.payload.limit !== undefined) {
        copy.feeds[action.payload.id] = copy.feeds[action.payload.id].slice(0, action.payload.limit);
      }
      return copy;
    case 'lastUpdate/set':
      return {
        ...state,
        lastUpdate: action.payload
      };
    case 'metadata/toggle':
      return {
        ...state,
        showMetadata: !state.showMetadata
      };
    case 'apple/toggle':
      return {
        ...state,
        showApple: !state.showApple
      };
    default:
      return state;
  }
}

const store = createStore(mainReducer);

export default store;
