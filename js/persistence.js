import { saveSearchHistory, getSearchHistory } from "./storage.js";

export function loadHistory(state) {
    state.searchHistory = getSearchHistory();
}

export function addToHistory(state, query) {
    if (!query) return;

    // evitar duplicados
    const filtered = state.searchHistory.filter(item => item !== query);

    state.searchHistory = [query, ...filtered].slice(0, 5);

    saveSearchHistory(state.searchHistory);
}