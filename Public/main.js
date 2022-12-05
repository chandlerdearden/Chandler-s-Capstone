
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
const week = document.querySelector("#week")

let shoppingListArray = []

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
    
    mealCard.innerHTML = `<img class ="mealImg" alt='meal image' src=${meal.image}/>
    <h3>${meal.name}</h3>
    <p>${meal.ingredients}</p>
    <p>${meal.calories} Calories</p>
    <button onclick="deleteMeal(${meal.id}); window.location.reload()">delete</button>
    `


    mealContainer.appendChild(mealCard)
    mealCard.classList.add('mealCard')
}
function getMealOptions () {
    mealSelectMain.innerHTML = `<option selected disabled>Add Meal</option>`
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
        let addedMeal = document.createElement('li')
        addedMeal.setAttribute("onclick", "deleteFromSchedule(this)")
        addedMeal.textContent = meals[index].name

        if(day === "sunday"){
            sunday.appendChild(addedMeal)
            localStorage.setItem('sundayList', sunday.innerHTML)
            shoppingListArray.push(meals[index].ingredients)
        } 
        else if ( day === "monday") {
            monday.appendChild(addedMeal)
            localStorage.setItem('mondayList', monday.innerHTML)
            shoppingListArray.push(meals[index].ingredients)
        }
        else if ( day === "tuesday") {
            tuesday.appendChild(addedMeal)
            localStorage.setItem('tuesdayList', tuesday.innerHTML)
            shoppingListArray.push(meals[index].ingredients)
        }
        else if ( day === "wednesday") {
            wednesday.appendChild(addedMeal)
            localStorage.setItem('wednesdayList', wednesday.innerHTML)
            shoppingListArray.push(meals[index].ingredients)
        }
        else if ( day === "thursday") {
            thursday.appendChild(addedMeal)
            localStorage.setItem('thursdayList', thursday.innerHTML)
            shoppingListArray.push(meals[index].ingredients)
        }
        else if ( day === "friday") {
            friday.appendChild(addedMeal)
            localStorage.setItem('fridayList', friday.innerHTML)
            shoppingListArray.push(meals[index].ingredients)
        } 
        else if ( day === "saturday") {
            saturday.appendChild(addedMeal)
            localStorage.setItem('saturdayList', saturday.innerHTML)
            shoppingListArray.push(meals[index].ingredients)
        } else (
            alert('choose a day')
            )
            localStorage.setItem('shoppingListArray', shoppingListArray)

            sendSet()

    })
}
function sendSet () {
    shoppingListSet = new Set(shoppingListArray)
    console.log(shoppingListSet)
    localStorage.setItem('shoppingList', JSON.stringify([...shoppingListSet]))
}
function deleteFromSchedule (element) {
    element.remove()
      localStorage.setItem('sundayList', sunday.innerHTML)
      localStorage.setItem('mondayList', monday.innerHTML)
      localStorage.setItem('tuesdayList', tuesday.innerHTML)
      localStorage.setItem('wednesdayList', wednesday.innerHTML)
      localStorage.setItem('thursdayList', thursday.innerHTML)
      localStorage.setItem('fridayList', friday.innerHTML)
      localStorage.setItem('saturdayList', saturday.innerHTML)

      axios.get(baseURL)
      .then(res => {
        const meals = res.data
        let mealName = element.textContent
        let index = meals.findIndex(meals => meals.name === mealName)
        console.log(shoppingListArray)
     for (i = 0; i < shoppingListArray.length;  i++){
        if (shoppingListArray[i] === meals[index].ingredients){
            shoppingListArray.splice([i], 1)
            console.log(shoppingListArray)
            localStorage.setItem('shoppingListArray', shoppingListArray)
            return
        }
    }
          
})
sendSet()
}
function getSavedList () {
    sunday.innerHTML = localStorage.getItem('sundayList')
    monday.innerHTML = localStorage.getItem('mondayList')
    tuesday.innerHTML = localStorage.getItem('tuesdayList')
    wednesday.innerHTML = localStorage.getItem('wednesdayList')
    thursday.innerHTML = localStorage.getItem('thursdayList')
    friday.innerHTML = localStorage.getItem('fridayList')
    saturday.innerHTML = localStorage.getItem('saturdayList')
    shoppingListSet = JSON.parse(localStorage.getItem("shoppingList"))
    shoppingListArray = localStorage.getItem('shoppingListArray')

    console.log(shoppingListSet)
    console.log(shoppingListArray)
}
addMealToScheduleBtn.addEventListener('click', addMealToSchedule)
getMealOptions()
getAllMeals()
getSavedList()
// localStorage.clear('shoppingList')
// localStorage.clear("shoppingListArray")