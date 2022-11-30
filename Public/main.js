const mealContainer = document.querySelector('#mealsContainer')
const mealSelect = document.querySelector('#meal-selector')



const baseURL = "http://localhost:4056/api/meals"

const mealsCallback = ({ data: meals }) => displayMeals(meals)

const getAllMeals = () => axios.get(baseURL).then(mealsCallback)
const deleteMeal = id => axios.delete(`${baseURL}/${id}`).then(mealsCallback)


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

getMealOptions()
getAllMeals()


