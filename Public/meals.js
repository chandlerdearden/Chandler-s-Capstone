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
    axios.get(baseURL).then(res => {
        let meals = res.data
        let index= meals.findIndex(meal => meal.name === mealName)
        let editor = document.createElement('div')
        editor.innerHTML = `
        <label for ="editmealName">Name:</label>
        <input id="editMealName" type="text" value= '${meals[index].name}'><br>

        <label for ="editmealImage">ImageURL:</label>
        <input id="editMealImage" type="text" value="${meals[index].image}"><br>

        <label for ="editmealCalories">Calories:</label>
        <input id ='editMealCalories' type="number" value="${meals[index].calories}"><br>

        <label for ="editMealIngredients">Ingredients:</label>
        <input id="editMealIngredients" size = 50 type="text" value="${meals[index].ingredients}"><br>

        <button id ="editMealBtn"> Update ${mealName} </button>`
        editMealSection.appendChild(editor)

       
    
    })
   
}


editBtn.addEventListener('click', editMeal)
addMealBtn.addEventListener('click', createMealHandler)

getMealOptions()