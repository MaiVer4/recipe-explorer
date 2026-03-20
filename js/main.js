import { searchRecipes } from "./service.js";
import { state } from "./state.js";
import { renderRecipes } from "./ui.js";

async function init() {
    state.recipes = await searchRecipes();
    renderRecipes(state.recipes);
}

document.addEventListener("DOMContentLoaded", init);