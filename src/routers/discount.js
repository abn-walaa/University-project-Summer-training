const router = require('express').Router()
const Discount = require('../modules/discount')

router.get('/', async (req, res) => {
    try {
        let data = await Discount.getAll()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        let { name, amount } = req.body
        await Discount.insert(name, amount)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {

        await Discount.delete(req.params.id)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})


module.exports = router