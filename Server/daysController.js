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
        
        days[day].splice(meal, 1)
        
        res.status(200).send(days)
    }
}