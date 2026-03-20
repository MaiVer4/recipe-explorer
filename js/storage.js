const HISTORY_KEY = "recipe_search_history";

export function saveItemsPerPage(value) {
    localStorage.setItem(ITEMS_KEY, value);
}

export function getSearchHistory() {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}

