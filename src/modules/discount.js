const Pool = require('../db/db')

class discount {
    static async insert(name, amount) {
        if (!name || !amount) {
            throw new Error("massing info!")
        }
        await Pool.query(`insert into discount(name, amount) values($1,$2)`, [name, amount])
        return;
    }
    static async getAll() {
        let { rows } = await Pool.query(`select id,name,amount from discount`)
        return rows
    }
    static async getById(id) {
        if (!id) throw new Error("massing info!")
        let { rows } = await Pool.query(`
                select id,name,amount from discount
                where id=$1
            `, [id])
        return rows[0]
    }
}

module.exports = discount