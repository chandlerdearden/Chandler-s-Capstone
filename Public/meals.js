const mealSelect = document.querySelector('#meal-selector')
const addMealBtn = document.querySelector("#addMealBtn")
const editBtn = document.querySelector("#editBtn")
const editMealSection = document.querySelector("#editMeal")

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
        image: image.value
    }
    createMeal(body)
    alert(`${name.value} was added to saved meals`)

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
        <p class ="hidden" id = "mealId">${meals[index].id}</p>
        <label for ="editMealName">Name:</label>
        <input id="editMealName" class = 'form_field' type="text" value= '${meals[index].name}'><br>

        <label for ="editMealImage">ImageURL:</label>
        <input id="editMealImage" class = 'form_field' type="text" value="${meals[index].image}"><br>

        <label for ="editMealCalories">Calories:</label>
        <input id ='editMealCalories' class = 'form_field' type="number" value="${meals[index].calories}"><br>

        <label for ="editMealIngredients">Ingredients:</label>
        <input id="editMealIngredients" class = 'form_field' size = 50 type="text" value="${meals[index].ingredients}"><br>
        <button id ="editMealBtn"> Update</button>
        `
        editMealSection.appendChild(editor)
        let editMealBtn = document.querySelector("#editMealBtn")

        editMealBtn.addEventListener("click", sendUpdatedMeal)
        editMealBtn.addEventListener("click", () => editMealSection.removeChild(editor))
        editBtn.classList.add("hidden")

    })
   
    
}
function sendUpdatedMeal () {
        let mealId = document.querySelector('#mealId').textContent
        let editName = document.querySelector("#editMealName")
        let editImage = document.querySelector("#editMealImage")
        let editCalories = document.querySelector("#editMealCalories")
        let ediIngredients = document.querySelector("#editMealIngredients")

        let body = {
            name: editName.value,
            image: editImage.value,
            calories: editCalories.value,
            ingredients: ediIngredients.value
        }
        alert(`${body.name} was succesfully updated!`)
        mealSelect.innerHTML = `<option selected disabled>--Please choose a Meal--</option>`

        axios.put(`${baseURL}/${mealId}`, body).then(getMealOptions)
        


        editBtn.classList.remove("hidden")
}

editBtn.addEventListener('click', editMeal)
addMealBtn.addEventListener('click', createMealHandler)
getMealOptions()