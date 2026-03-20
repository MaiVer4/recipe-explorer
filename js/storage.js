const ITEMS_KEY = "items_per_page";
const HISTORY_KEY = "search_history"; 

export function saveItemsPerPage(value) {
    localStorage.setItem(ITEMS_KEY, value);
}

export function getItemsPerPage() {
    return Number(localStorage.getItem(ITEMS_KEY)) || 10;
}


export function saveSearchHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getSearchHistory() {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}