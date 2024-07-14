const Pool = require('./../db/db')

class logs {
    static async insert(student_id, why, amount, client) {
        if (!student_id || !why || !amount) throw new Error("massing info")
        const pool = client || Pool
        await pool.query(`
            insert into logs_amount(student_id,amount,why) values($1,$2,$3)
            `, [student_id, amount, why])

    }
}

module.exports = logs