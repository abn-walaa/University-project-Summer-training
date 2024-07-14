const express = require("express")
const app = express()
const category = require('./routers/category')
const discount = require('./routers/discount')
const Recepits = require('./routers/Recepits')
const stage = require('./routers/stage')
const type = require('./routers/type')
const student = require('./routers/student')
app.use(express.json())

app.use('/category/', category)
app.use('/discount/', discount)
app.use('/Recepits/', Recepits)
app.use('/stage', stage)
app.use('/student', student)
app.use('/type', type)



app.listen(3000, () => {
    console.log("Server is Up")
})