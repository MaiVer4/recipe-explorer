const ITEMS_KEY = "items_per_page";

export function saveItemsPerPage(value) {
    localStorage.setItem(ITEMS_KEY, value);
}

export function getItemsPerPage() {
    return Number(localStorage.getItem(ITEMS_KEY)) || 10;
}

