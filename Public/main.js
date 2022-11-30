const mealContainer = document.querySelector('#mealsContainer')
const mealSelect = document.querySelector('#meal-selector')
const addMealBtn = document.querySelector("#addMealBtn")



const baseURL = "http://localhost:4056/api/meals"

const mealsCallback = ({ data: meals }) => displayMeals(meals)

const getAllMeals = () => axios.get(baseURL).then(mealsCallback)
const deleteMeal = id => axios.delete(`${baseURL}/${id}`).then(mealsCallback)
const createMeal = body => axios.post(baseURL, body).then(mealsCallback)


function displayMeals(arr) {
    mealContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMealCard(arr[i])
    }
}

function createMealCard(meal) {
    const mealCard = document.createElement('div')
    
    mealCard.innerHTML = `<img alt='meal image' src=${meal.image}/>
    <h3>${meal.name}</h3>
    <p>${meal.ingredients}</p>
    <p>${meal.calories} Calories</p>
    <button onclick="deleteMeal(${meal.id})">delete</button>
    `


    mealContainer.appendChild(mealCard)
}
function getMealOptions () {
    axios.get(baseURL).then(res =>{
        const meals = res.data
        for(i=0; i <meals.length; i++) {
            let option = document.createElement('option')
            option.value = meals[i].name
            option.textContent = meals[i].name
            mealSelect.appendChild(option)
        }
    } )
}

function createMealHandler () {
    let image = document.querySelector('#newMealImage')
    let name = document.querySelector('#newMealName')
    let ingredients = document.querySelector('#newMealIngredients')
    let calories = document.querySelector('#newMealCalories')

    body = {
        name: name.value,
        ingredients: ingredients.value,
        calories: calories.value,
        imageURL: image.value
    }
    createMeal(body)

    name.value = ''
    ingredients.value = ''
    image.value = ''
    calories.value = null
 getAllMeals()
}

getMealOptions()
getAllMeals()
addMealBtn.addEventListener('click', createMealHandler)


