import store from "./store";
import { v4 as uuidv4 } from "uuid";

export const addColumn = function({key, title, playerIds, teamIds, eventTypes, beings, categories, unredacted}) {
  return store.dispatch({
    type: "columnDefs/add",
    payload: {
      key: key || uuidv4(),
      title: title,
      playerIds: playerIds || [],
      teamIds: teamIds || [],
      eventTypes: eventTypes || [],
      beings: beings || [],
      categories: categories || [],
      unredacted: false
    }
  });
};

export const setColumns = function(columns) {
  return store.dispatch({
    type: 'columnDefs/set',
    payload: columns
  });
};

export const removeColumn = function(key) {
  return store.dispatch({
    type: "columnDefs/remove",
    payload: key
  })
};

export const updateColumn = function(key, payload) {
  return store.dispatch({
    type: "columnDefs/update",
    payload: {
      key: key,
      title: payload.title,
      playerIds: payload.playerIds,
      teamIds: payload.teamIds,
      eventTypes: payload.eventTypes,
      beings: payload.beings,
      categories: payload.categories,
      unredacted: payload.unredacted
    }
  });
};

export const moveColumn = function(key, direction) {
  return store.dispatch({
    type: 'columnDefs/move',
    payload: {
      id: key,
      delta: direction
    }
  });
}

export const feedsMe = function(id, entries, reset, prepend, limit) {
  return store.dispatch({
    type: "feeds/append",
    payload: {
      id: id,
      entries: entries,
      reset: reset,
      prepend: prepend,
      limit: limit
    }
  });
};

export const setTeamOptions = function(options) {
  return store.dispatch({
    type: "setOptions/teams",
    payload: options
  });
};

export const setPlayerOptions = function(options) {
  return store.dispatch({
    type: "setOptions/players",
    payload: options
  });
};

export const setLastUpdate = () => {
  return store.dispatch({
    type: "lastUpdate/set",
    payload: Date.now()
  });
};

export const toggleAutoRefresh = () => {
  return store.dispatch({
    type: 'autoRefresh/toggle',
  });
};

export const setShowCurrentSeason = (payload) => {
  return store.dispatch({
    type: 'showCurrentSeason/set',
    payload: payload
  });
};

export const setAutoRefresh = (ar) => {
  return store.dispatch({
    type: 'autoRefresh/set',
    payload: ar
  });
}

export const toggleExpandMetadata = () => {
  return store.dispatch({
    type: 'metadata/toggle'
  });
};

export const toggleShowApple = () => {
  return store.dispatch({type: 'apple/toggle'});
};
