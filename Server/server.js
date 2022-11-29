const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getMeals, postMeals, deleteMeals, updateNameMeals} = require('./controller.js')

app.get('/api/meals', getMeals)
app.post('/api/meals/', postMeals)
app.delete('/api/meals/:id', deleteMeals)
app.put('/api/meals/:id', updateNameMeals)

app.listen(4056, () => console.log( "Server running on 4056"))

