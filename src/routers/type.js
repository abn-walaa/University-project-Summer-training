const router = require('express').Router()
const Type = require('../modules/type')

router.get('/', async (req, res) => {
    try {
        let data = await Type.getAll()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        let { name, amount, category_id } = req.body
        await Type.insert(name, amount, category_id)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let data = await Type.getById(req.params.id)
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.get('/category/:id', async (req, res) => {
    try {
        let data = await Type.getOfCategory(req.params.id)
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

module.exports = router