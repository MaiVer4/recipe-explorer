const HISTORY_KEY = "recipe_search_history";

export function saveSearchHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getSearchHistory() {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}