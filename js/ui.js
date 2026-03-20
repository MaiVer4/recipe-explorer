export function renderRecipes(recipes) {
    const container = document.getElementById("recipes-container");

    container.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <p>${recipe.strCategory}</p>
            <p>${recipe.strArea}</p>
            <button data-id="${recipe.idMeal}">Ver detalles</button>
            <button data-id="${recipe.idMeal}">Favorito</button>
        `;

        container.appendChild(card);
    });
}

export function renderHistory(history) {
    const container = document.getElementById("history-container");

    container.innerHTML = "";

    history.forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item;
        btn.classList.add("history-item");
        btn.dataset.query = item;

        container.appendChild(btn);
    });
}

export function paginate(recipes, page, itemsPerPage) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return recipes.slice(start, end);
}

export function renderPagination(state) {
    const container = document.getElementById("pagination-container");

    container.innerHTML = `
        <button id="prev-btn">Anterior</button>
        <span>Página ${state.currentPage} de ${state.totalPages}</span>
        <button id="next-btn">Siguiente</button>

        <select id="items-per-page">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
    `;
    document.getElementById("items-per-page").value = state.itemsPerPage;
}