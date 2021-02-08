//Function that called when submit button clicked
function handleMealSearch() {
    //Setting page to initial state
    document.getElementById("meal-list").innerHTML = "";
    document.getElementById("meal-detail").style = "display : none";

    const searchedMeal = document.getElementById("searched-meal").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
        .then(response => response.json())
        .then(data => renderMeals(data))
        .catch(error => showError(error))
};

//function to render meals list
function renderMeals(mealList) {
    const mealsDiv = document.getElementById("meal-list");
    const mealsArray = mealList.meals;

    mealsArray.forEach(element => {
        const mealName = element.strMeal;
        const mealImage = element.strMealThumb;
        const newMeal = document.createElement('div');
        const mealCard =
            `<div class="card meal-card">
                <img src="${mealImage}" class="card-img-top" style = "height: 80%;">
                <div class="card-body">
                    <h5 class="card-title text-center">${mealName}</h5>
                </div>
            </div>`

        newMeal.className = "col-12 col-md-6 col-lg-3 mt-5";
        newMeal.innerHTML = mealCard;
        mealsDiv.appendChild(newMeal);

        newMeal.addEventListener("click", () => {
            const mealId = element.idMeal;

            document.getElementById("ingredient-list").innerHTML = "";

            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => renderMealDetail(data))
                .catch(error => console.log(error))
        });
    });
}

//Function to render meals detail
function renderMealDetail(meal) {
    const mealObject = meal.meals[0];
    const mealName = mealObject.strMeal;
    const mealImage = mealObject.strMealThumb;

    document.getElementById("meal-image").innerHTML = `<img src="${mealImage}">`;
    document.getElementById("meal-name").innerHTML = `<h1 class="mt-3" style = "width: 60%;">${mealName}</h1>`;

    //Creating ingredients list
    for (let i = 1; i <= 20; i++) {
        const ingredientKey = "strIngredient" + i;
        const measurementKey = "strMeasure" + i;
        const ingredientName = mealObject[ingredientKey];
        const ingredientMeasurement = mealObject[measurementKey];

        if (ingredientName === "" || ingredientName === null) {
            break;
        } else {
            const ingredientList = document.getElementById("ingredient-list");
            const ingredient = document.createElement("li");
            ingredient.innerText = ingredientMeasurement + " " + ingredientName;
            ingredientList.appendChild(ingredient);
        }
    }
    document.getElementById("meal-detail").style = "display : block";
}

//function that called when response is null
function showError(error) {
    console.log(error);
    document.getElementById("meal-list").innerHTML = `
    <h1 class="text-center">Oops!</h1>
    <h3 class="text-center">No Meal Matched To Your Search</h3>
    `
}