 let mealNames = document.querySelector("#meals-selected")
 let mealNamesSet = JSON.parse(localStorage.getItem("shoppingList"))
 const ingredientsNeeded = document.querySelector("#ingredients")
 const baseURL = "http://localhost:4056/api/meals"
 console.log(mealNamesSet)
 

 for( let i = 0; i < mealNamesSet.length; i++) {
    axios.get(baseURL)
    .then(res => {
        console.log(mealNamesSet[i])
         const meals = res.data

        let index = meals.findIndex(meals => meals.ingredients === mealNamesSet[i])

        let list = document.createElement('p')
        let mealIngredients = document.createElement('li')

        mealIngredients.textContent = meals[index].ingredients
        list.textContent = meals[index].name


        ingredientsNeeded.appendChild(mealIngredients)
        mealNames.appendChild(list)     
    })
}
