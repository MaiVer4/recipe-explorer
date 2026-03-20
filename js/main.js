import { searchRecipes } from "./service.js";
import { state } from "./state.js";
import { renderRecipes, renderHistory } from "./ui.js";
import { loadHistory, addToHistory } from "./persistence.js";
import { paginate, renderPagination } from "./ui.js";

async function handleSearch(query) {
    state.searchQuery = query;
    state.currentPage = 1;

    state.recipes = await searchRecipes(query);
    state.totalPages = Math.ceil(state.recipes.length / state.itemsPerPage);

    addToHistory(state, query);

    updateView();
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
    state.totalPages = Math.ceil(state.recipes.length / state.itemsPerPage);

    updateView();

    setupSearch();
    setupHistoryClicks();
    setupPagination();
}  setupHistoryClicks();

document.addEventListener("DOMContentLoaded", init);

function updateView() {
    const paginated = paginate(
        state.recipes,
        state.currentPage,
        state.itemsPerPage
    );

    renderRecipes(paginated);
    renderPagination(state);
    renderHistory(state.searchHistory);
}