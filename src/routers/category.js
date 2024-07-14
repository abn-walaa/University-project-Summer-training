const router = require('express').Router()
const Category = require('../modules/category')

// جلب
router.get("/", async (req, res) => {
    try {
        let data = await Category.getAll()

        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})
// اضافة
router.post("/", async (req, res) => {
    try {
        let { name } = req.body

        await Category.insert(name)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

module.exports = router