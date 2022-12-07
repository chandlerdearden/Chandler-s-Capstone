const meals = require('./db.json')
let globalId = 7

module.exports = {

    getMeals: function(req,res) {
        res.status(200).send(meals)
    },

    postMeals: function(req,res) {
        let {name, ingredients, calories, image } = req.body

        let newMeal = {
            id: globalId,
            name,
            ingredients,
            calories,
            image
        }
        meals.push(newMeal)
        res.status(200).send(meals)
        globalId++
    },

    deleteMeals: function(req,res) {
        let index = meals.findIndex(meals => meals.id === +req.params.id)

        meals.splice(index,1)

        res.status(200).send(meals)
    },

    updateNameMeals: function (req,res) {
        console.log(req.body)
        let {name, calories, image, ingredients} = req.body
        let {id} = req.params

        let index = meals.findIndex(meals => meals.id === +id)

        meals[index].name = name
        meals[index].calories = +calories
        meals[index].image = image
        meals[index].ingredients = ingredients

        res.status(200).send(meals)

    }
}