const mealSelect = document.querySelector('#meal-selector')
const addMealBtn = document.querySelector("#addMealBtn")

const baseURL = "http://localhost:4056/api/meals"


const createMeal = body => axios.post(baseURL, body).then(getMealOptions)


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

    mealSelect.innerHTML = `<option selected disabled>--Please choose a Meal--</option>`
}



addMealBtn.addEventListener('click', createMealHandler)

getMealOptions()