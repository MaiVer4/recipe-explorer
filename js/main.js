import { searchRecipes } from "./service.js";
import { state } from "./state.js";
import { renderRecipes, renderHistory } from "./ui.js";
import { loadHistory, addToHistory } from "./persistence.js";

async function handleSearch(query) {
    state.searchQuery = query;
    state.recipes = await searchRecipes(query);

    addToHistory(state, query);

    renderRecipes(state.recipes);
    renderHistory(state.searchHistory);
}

function setupSearch() {
    const input = document.getElementById("search-input");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleSearch(input.value.trim());
        }
    });
}

function setupHistoryClicks() {
    const container = document.getElementById("history-container");

    container.addEventListener("click", (e) => {
        if (e.target.matches(".history-item")) {
            const query = e.target.dataset.query;
            handleSearch(query);
        }
    });
}

async function init() {
    loadHistory(state);

    state.recipes = await searchRecipes();
    
    renderRecipes(state.recipes);
    renderHistory(state.searchHistory);

    setupSearch();
    setupHistoryClicks();
}

document.addEventListener("DOMContentLoaded", init);