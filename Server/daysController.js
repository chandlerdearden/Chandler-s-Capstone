const days = require('./days.json')



module.exports = {
    getDays: function(req,res) {
        res.status(200).send(days)
    },

    putDays: function(req,res) {
        let {day} = req.params
        let {meal} = req.body

        days[day].push(meal)
        res.status(200).send(days)
    },

    deleteDay: function(req,res) {
        let {day} = req.params
        let {meal} =req.body
        
        let index = days[day].findIndex(value => value === meal)
        
        days[day].splice(index, 1)
        
        res.status(200).send(days)
    }
}