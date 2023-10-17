const input = document.getElementById("input-recipe");
const inputBtn = document.getElementById("input-btn");

const apiUrl = "https://forkify-api.herokuapp.com/api/search?q=";

const getRecipes = async (recipes) => {
  const response = await fetch(apiUrl + recipes);
  const data = await response.json();
  //   console.log(data);
  showFoodItems(data);
};
const recipeCards = document.getElementById("recipe-cards");
const recipeListHeading = document.getElementById("recipe-list");

const showFoodItems = (data) => {
  //   console.log(data.recipes);
  recipeCards.innerHTML = "";

  data.recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("Card");
    console.log(recipe);
    recipeListHeading.innerText = "Recipe List for : " + inputVal;
    card.innerHTML = `
    <img id="card-img" src="${recipe.image_url}" alt="">
    <div id="div-title">
    <h3 id="title">${recipe.title}</h3>
    </div>
    <div id="div-Publisher">
        <h4 id="publisher">${recipe.publisher}</h4>
    </div>
    <div id="buttons">
      
        <button class="details-button" data-recipe-id="${recipe.recipe_id}">Details</button>
        <a id="recipe-url" href="${recipe.source_url}">Recipe Url</a>
    </div>
    `;
    recipeCards.appendChild(card);
  });
};
{
  /* <a class="details-button" id="${recipe.recipe_id}" href="">Details</a> */
}

// -------------------
recipeCards.addEventListener("click", (event) => {
  const clickedElement = event.target;

  // Check if the clicked element is a "Details" button
  if (clickedElement.classList.contains("details-button")) {
    // Get the recipe ID from the data attribute
    const recipeId = clickedElement.dataset.recipeId;

    // Encode the recipe ID to pass as a query parameter
    const encodedRecipeId = encodeURIComponent(recipeId);

    // Create the URL for the recipe details page with the recipe ID as a query parameter
    const detailsPageURL = `recipeDetails.html?id=${encodedRecipeId}`;

    // Navigate to the recipe details page
    window.location.href = detailsPageURL;
  }
});
// --------------------

var inputVal;

inputBtn.addEventListener("click", () => {
  inputVal = input.value;
  // console.log(inputVal);
  getRecipes(inputVal);
});

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    // If Enter key is pressed (keyCode 13), trigger the search
    inputVal = input.value;
    getRecipes(inputVal);
  }
});