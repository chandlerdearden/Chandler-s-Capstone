const mealSelect = document.querySelector('#meal-selector')
const addMealBtn = document.querySelector("#addMealBtn")
const editBtn = document.querySelector("#editBtn")
const editMealSection = document.querySelector("#editMeal")

const baseURL = "http://localhost:4056/api/meals"


const createMeal = body => axios.post(baseURL, body).then(getMealOptions)
const updateMeal = (id, body) => axios.put(`${baseURL}/${id}`, body).then(getMealOptions)


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
function editMeal () {
    let mealName = mealSelect.value
    console.log("the button is working")
    axios.get(baseURL).then(res => {
        let meals = res.data
        let id = meals.findIndex(meal => meal.name === mealName)
        let editor = document.createElement('div')
        editor.innerHTML = `<input id="editMealName" type="text" placeholder="Meal name">
        <input id="editMealIngredients" type="text" placeholder="Ingredients">
        <input id="editMealImage" type="text" placeholder="Image URL">
        <input id ='editMealCalories' type="number" placeholder="Calories">
        <button id ="editMealBtn"> Update ${mealName} </button>`
        editMealSection.appendChild(editor)
        
    })
}


editBtn.addEventListener('click', editMeal)
addMealBtn.addEventListener('click', createMealHandler)

getMealOptions()