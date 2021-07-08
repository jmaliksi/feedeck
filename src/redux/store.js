import { createStore } from 'redux';

const initialState = {
  filterOptions: [],
  feed: [],
  columnDefs: [
    {
      key: '21cbbfaa-100e-48c5-9cea-7118b0d08a34',
      title: 'Juice Collins',
      playerIds: ['21cbbfaa-100e-48c5-9cea-7118b0d08a34'],
      teamIds: [],
      eventTypes: []
    },
    {
      key: 'asdfasdf',
      title: '',
      playerIds: [],
      teamIds: [],
      eventTypes: []
    },
  ],
  lastUpdate: Date.now(),
  feeds: {},
  teamOptions: [],
  playerOptions: []
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
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
    case 'columnDefs/add':
      return {
        ...state,
        columnDefs: [...state.columnDefs, action.payload]
      };
    case 'columnDefs/remove':
      return {
        ...state,
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
            eventTypes: action.payload.eventTypes === undefined ? entry.eventTypes : action.payload.eventTypes
          };
        })
      };
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
      copy.feeds[action.payload.id] = [
        ...action.payload.entries,
        ...prev
      ];
      return copy;
    default:
      return state;
  }
}

const store = createStore(mainReducer);

export default store;
