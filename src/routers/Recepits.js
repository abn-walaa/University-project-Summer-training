const router = require('express').Router()
const Receipts = require('../modules/Receipts')

router.get('/:id', async (req, res) => {
    try {
        let data = await Receipts.getOfStudent(req.params.id)
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.post('/:id', async (req, res) => {
    try {
        let { id } = req.params
        let { amount } = req.body
        await Receipts.insertOne(id, amount)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

module.exports = router
