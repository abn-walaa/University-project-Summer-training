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
            where  deleted=false
            `)
        return rows
    }

    static async getByID(id) {
        if (!id)
            throw new Error("massing info!")
        let { rows } = await Pool.query(`
            select id,name from category
            where id=$1 and deleted=false

            `, [id])
        if (rows.length === 0) {
            throw new Error("not found !")
        }
        return rows
    }

    static async delete(id) {
        if (!id) throw new Error("massing info!")
        await Pool.query(`update category set deleted=true where id=$1`, [id])
        return
    }

}

module.exports = category