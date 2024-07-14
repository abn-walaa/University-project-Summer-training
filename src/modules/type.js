const Pool = require('../db/db')

class type {
    static async insert(name, amount, category_id) {
        if (!name || !amount || !category_id) {
            throw new Error("massing info!")
        }
        await Pool.query(`
            insert into type_of_studey(name,category_id,amount) values($1,$2,$3)
            `, [name, category_id, amount])
        return;
    }

    static async getAll() {
        let { rows } = await Pool.query(
            ` 
            select t.id,t.name,t.amount,c.name as category_name from type_of_studey t
            inner join category c on c.id=t.category_id
            `
        )
        return rows
    }

    static async getOfCategory(id) {
        if (!id) throw new Error("massing info!")

        let { rows } = await Pool.query(`
            select t.id,t.name,t.amount,c.name as category_name from type_of_studey t
            inner join category c on c.id=t.category_id
            where t.category_id=$1
            `, [id])
        return rows
    }

    static async getById(id) {
        if (!id) throw new Error("massing info!")
        let { rows } = await Pool.query(`
            select t.id,t.name,t.amount,c.name as category_name from type_of_studey t
            inner join category c on c.id=t.category_id
            where t.id=$1
            `, [id])
        return rows[0]
    }
}

module.exports = type