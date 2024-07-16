const router = require('express').Router()
const Stage = require('../modules/stage')

router.get('/', async (req, res) => {
    try {
        let data = await Stage.getAll()
        res.send(data)

    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        let { name, type_id, is_end } = req.body
        let data = await Stage.insert(name, type_id, is_end)
        res.send({ id: data })
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

module.exports = router