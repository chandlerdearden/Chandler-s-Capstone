const mealContainer = document.querySelector('#mealsContainer')
const mealSelectMain =document.querySelector('#mealSelectMain')
const addMealToScheduleBtn = document.querySelector("#addMealToScheduleBtn")
const daySelect = document.querySelector("#daySelect")
const sunday = document.querySelector("#sunday")
const monday = document.querySelector("#monday")
const tuesday = document.querySelector("#tuesday")
const wednesday = document.querySelector("#wednesday")
const thursday = document.querySelector("#thursday")
const friday = document.querySelector("#friday")
const saturday = document.querySelector("#saturday")


const baseURL = "http://localhost:4056/api/meals"

const mealsCallback = ({ data: meals }) => displayMeals(meals)

const getAllMeals = () => axios.get(baseURL).then(mealsCallback)
const deleteMeal = id => axios.delete(`${baseURL}/${id}`).then(mealsCallback)
const createMeal = body => axios.post(baseURL, body).then(mealsCallback)


function displayMeals(arr) {
    mealContainer.innerHTML = `
    <h1>Saved Meals</h1>
            `
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
            mealSelectMain.appendChild(option)
        }
    } )
    
}
function addMealToSchedule () {
    let day = daySelect.value
    let meal = mealSelectMain.value
    axios.get(baseURL)
    .then(res => {
         const meals = res.data
        let index = meals.findIndex(meals => meals.name === meal)
        let addedMeal = document.createElement('div')
        addedMeal.innerHTML = `
        <img alt='meal image' src=${meals[index].image}/>
        <p>${meals[index].name}</p>
        <p>${meals[index].calories}</p>
        <button class = "removeMeal" onclick = "deleteFromSchedule()" >Remove</button>
        `
        if(day === "sunday"){
            sunday.appendChild(addedMeal)
        } 
        else if ( day === "monday") {
            monday.appendChild(addedMeal)
        }
        else if ( day === "tuesday") {
            tuesday.appendChild(addedMeal)
        }
        else if ( day === "wednesday") {
            wednesday.appendChild(addedMeal)
        }
        else if ( day === "thursday") {
            thursday.appendChild(addedMeal)
        }
        else if ( day === "friday") {
            friday.appendChild(addedMeal)
        } 
        else if ( day === "saturday") {
            saturday.appendChild(addedMeal)
        } else (
            alert('choose a day')
        )
    })
    
    
}
function deleteFromSchedule () {
    const removeMealBtn = document.querySelector(".removeMeal")
      removeMealBtn.parentElement.remove()

}

addMealToScheduleBtn.addEventListener('click', addMealToSchedule)
getMealOptions()
getAllMeals()



