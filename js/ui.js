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