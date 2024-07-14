const Pool = require('../db/db')

class category {

    static async insert(name) {
        if (!name) {
            throw new Error("massing info !")
        }
        await Pool.query(`
            insert into category(name) values($1)
            `, [name])
        return;
    }

    static async getAll() {
        let { rows } = await Pool.query(`
            select id,name from category
            `)
        return rows
    }

    static async getByID(id) {
        if (!id)
            throw new Error("massing info!")
        let { rows } = await Pool.query(`
            select id,name from category
            where id=$1
            `, [id])
        if (rows.length === 0) {
            throw new Error("not found !")
        }
        return rows
    }

}

module.exports = category