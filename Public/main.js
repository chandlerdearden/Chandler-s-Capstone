
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


const baseURL = "http://localhost:4056/api/meals"
const baseURL2 = 'http://localhost:4056/api'

const mealsCallback = ({ data: meals }) => displayMeals(meals)
const daysCallback =({ data: days}) =>  displayDays(days)

const getAllMeals = () => axios.get(baseURL).then(mealsCallback)
const deleteMeal = id => axios.delete(`${baseURL}/${id}`).then(mealsCallback)
const createMeal = body => axios.post(baseURL, body).then(mealsCallback)
const getDays = () => axios.get(`${baseURL2}/days`).then(daysCallback)


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

    let body = {
        "meal": meal
    }

    axios.put(`${baseURL2}/days/${day}`, body).then(daysCallback)
    window.location.reload()
    }

    function displayDays (days){
        for(key in days){
            console.log(days[key].length)
            for(let i  = 0 ; i < days[key].length; i++){
                let list = document.createElement('li')
                list.textContent = (days[key][i])
                if (key === "sunday"){
                    sunday.appendChild(list)
                }
                else if (key === "monday"){
                    monday.appendChild(list)
                }
                else if (key === "tuesday"){
                    tuesday.appendChild(list)
                }
                else if (key === "wednesday"){
                    wednesday.appendChild(list)
                }
                else if (key === "thursday"){
                    thursday.appendChild(list)
                }
                else if (key === "friday"){
                    friday.appendChild(list)
                }
                else if (key === "saturday") {
                    saturday.appendChild(list)
                }
            }            
        }
    }


   
addMealToScheduleBtn.addEventListener('click', addMealToSchedule)
getMealOptions()
getAllMeals()
getDays()
