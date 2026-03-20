import { searchRecipes } from "./service.js";
import { state } from "./state.js";
import { renderRecipes, renderHistory } from "./ui.js";
import { loadHistory, addToHistory } from "./persistence.js";
import { paginate, renderPagination } from "./ui.js";
import { getItemsPerPage, saveItemsPerPage } from "./storage.js";

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
    state.itemsPerPage = getItemsPerPage();
    
    updateView();

    setupSearch();
    setupHistoryClicks();
    setupPagination();
    saveItemsPerPage(state.itemsPerPage);

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

function setupPagination() {
    const container = document.getElementById("pagination-container");

    container.addEventListener("click", (e) => {

        if (e.target.id === "prev-btn" && state.currentPage > 1) {
            state.currentPage--;
            updateView();
        }

        if (e.target.id === "next-btn" && state.currentPage < state.totalPages) {
            state.currentPage++;
            updateView();
        }
    });

    container.addEventListener("change", (e) => {
        if (e.target.id === "items-per-page") {
            state.itemsPerPage = Number(e.target.value);
            state.currentPage = 1;

            state.totalPages = Math.ceil(state.recipes.length / state.itemsPerPage);

            localStorage.setItem("itemsPerPage", state.itemsPerPage);

            updateView();
        }
    });
}