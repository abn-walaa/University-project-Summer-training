const router = require('express').Router()
const Student = require('../modules/student')
router.get('/', async (req, res) => {
    try {
        let { discount_id, stage_id, type_id, name } = req.query
        let data = await Student.getAll(discount_id, stage_id, type_id, name)
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let data = await Student.getById(req.params.id)
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})
router.post("/", async (req, res) => {
    try {
        let { name, stage_id, discount_id, start_date } = req.body
        await Student.insert(name, stage_id, discount_id, start_date)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})
// الترحيل
router.patch('/:id', async (req, res) => {
    try {
        let { stage_id, discount_id, start_date } = req.body
        let { id } = req.params

        await Student.patch(id, stage_id, discount_id, start_date)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.patch('/adding/:id', async (req, res) => {
    try {
        let { monthes } = req.body
        let { id } = req.params
        await Student.addingMothns(id, monthes)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {

        await Student.delete(req.params.id)
        res.send()
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: error.message })
    }
})



module.exports = router