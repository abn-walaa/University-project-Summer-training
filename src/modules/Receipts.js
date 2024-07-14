const Pool = require('../db/db')
const Student = require('./student')
class Receipts {
    static async insertOne(student_id, amount) {
        const client = await Pool.connect()
        try {
            await client.query(`BEGIN`);
            await client.query(`insert into Receipts(student_id,amount) values($1,$2)`, [student_id, amount])
            await Student.decAmount(amount, student_id, client)

            await client.query(`Commit`)
        } catch (error) {
            await client.query(`ROLLBACK`)
            throw error
        } finally {
            client.release()
        }
    }
    static async getOfStudent(id) {
        if (!id) throw new Error("massing info!")
        let { rows } = await Pool.query(`
    select id,amount,created_at from Receipts
    where id=$1
    `, [id])
        return rows
    }

}

module.exports = Receipts