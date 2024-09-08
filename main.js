const serch = document.getElementById("search");
const submit = document.getElementById("submit");
//console.log(submit);
const random = document.getElementById("random");
//console.log(random);
const resultHeading = document.getElementById("meal-result-heading");
//console.log(resultHeading);
const mealsE1 = document.getElementById("meals");
//console.log(mealsE1);
const single_mealsE1 = document.getElementById("single-meal-container");
//console.log(single_mealsE1);


// serch and submit button*********************
submit.addEventListener('submit', findmeal);

// click random button
random.addEventListener('click',getRanDomMeal );

function getRanDomMeal(e){
    //e.preventDefault();
         fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
         .then((res)=>res.json())
         .then((data)=>{
            const meal =data.meals[0]; 
            addMealToDOM(meal);
         });


}

function findmeal(e) {
    e.preventDefault();
    const item = serch.value

     if(item.trim()){

    //feth api call
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
        .then((res) => res.json())
        .then((data) => {
            //resultHeading.innerHTML = `Search Result for ${item}`;
            //if condition
            if (data.meals == null) {
                resultHeading.innerHTML = `Oops !! No result for meal ${item}`
            } else {
                mealsE1.innerHTML = data.meals.map((meal) => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
            <div class="meal-info" data-mealId="${meal.idMeal}">
                 <h3>${meal.strMeal}</h3>
            </div>
            
            </div>`).join("");
            }

            serch.value = "";
        });
    } else{
        alert("Pls Serch the name")
    }



}




//click meal  button******************
mealsE1.addEventListener("click", (e) => {

    const mealInfo = e.composedPath().find((single_item) => {
        if (single_item.classList) {
            return single_item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealId");
        getSingleItemID(mealID);
    }
});

function getSingleItemID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];
            console.log(meal);
            addMealToDOM(meal);
        });
}


function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} = ${meal[`strMeasure${i}`]}`);

        } else {
            break;
        }
    }

    single_mealsE1.innerHTML = `
          <div class="single-meal">
              <h1>${meal.strMeal}</h1>
               <div class="single-meal-info">
               ${meal.strCategory ?`<p>${meal.strCategory}</p>`:""}
               ${meal.strArea?`<p>${meal.strArea}</p>`:""}
               </div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="main">
                 <h2>Ingredients</h2>
                <ul>
                ${ingredients.map((ing)=>`<li>${ing}</li>`).join("")}
                </ul>
                <h2>Instruction</h2>
                <P>${meal.strInstructions}</p>
                </div>
           </div>
          
          `;
}
