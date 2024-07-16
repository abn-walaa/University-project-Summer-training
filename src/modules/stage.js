const Pool = require("../db/db")
const category = require("./category")
const logs = require("./logsAmount")
const Logs = require('./logsAmount')
class stage {
    static async insert(name, type_id, is_end) {
        if (!name || !type_id) {
            throw new Error('massing info')
        }
        let { rows } = await Pool.query(`insert into stage(name,type_id,is_end) values($1,$2,$3) returning id`, [name, type_id, is_end])
        return rows[0].id;
    }

    static async getAll() {
        let { rows } = await Pool.query(`
            select s.id,s.name,s.is_end,c.name as category_name,t.amount,t.name as type_name,c.id as category_id from stage s
            inner join type_of_studey t on t.id=s.type_id
            inner join category c on c.id=t.category_id
            where s.deleted=false
            `)
        return rows
    }
    static async getById(id) {
        if (!id) throw new Error("massing info!")
        let { rows } = await Pool.query(`
            select s.id,s.name,s.is_end,c.name as category_name,t.amount,t.name as type_name,t.category_id as category_id from stage s
            inner join type_of_studey t on t.id=s.type_id
            inner join category c on c.id=t.category_id
            where s.id=$1 and  s.deleted=false
            `, [id])
        if (rows.length === 0) {
            throw new Error("the stage not found !")
        }
        return rows[0]
    }
    static async getByTypeId(id) {
        if (!id) throw new Error("massing info!")
        let { rows } = await Pool.query(`
            select s.id,s.name,s.is_end,c.name as category_id,t.amount,t.name as type_name from stage s
            inner join type_of_studey t on t.id=s.type_id
            inner join category c on c.id=t.category_id
            where s.type_id=$1 and  s.deleted=false
            `, [id])
        return rows
    }
    static async delete(id) {
        if (!id) throw new Error("massing info!")
        await Pool.query(`update stage set deleted=true where id=$1`, [id])
        return
    }

}

module.exports = stage