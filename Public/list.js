let mealsSelected = document.querySelector("#meals-selected")
let ingredientsList = document.querySelector('#list')


const baseURL2 = 'http://localhost:4056/api'
const baseURL = "http://localhost:4056/api/meals"

const getDays = () => axios.get(`${baseURL2}/days`).then(daysCallback)

const daysCallback =({ data: days}) =>  displayList(days)


function displayList (days) {
    let array = []
        for (key in days){
            for (let i  = 0 ; i < days[key].length; i++){
                array.push(days[key][i])
            }
        }
        let mealNames = new Set(array)
        for(value of mealNames){
            let name = document.createElement('p')
            name.textContent = value
            mealsSelected.appendChild(name)

        }
        console.log(mealNames)
        axios.get(baseURL).then(res => {
            meals = res.data
            for(value of mealNames){
                let index = meals.findIndex(meals => meals.name === value)
                let ingredients = meals[index].ingredients
                let list = document.createElement('li')
                list.textContent = ingredients
                ingredientsList.appendChild(list)
            }
        })
}

getDays()


