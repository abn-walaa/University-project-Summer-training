const Pool = require('../db/db')
const Stage = require('./stage')
const Discount = require('./discount')
const Logs = require('./logsAmount')
class student {
    static async insert(name, stage_id, discount_id, start_date) {
        if (!name || !stage_id || !discount_id || !start_date) {
            throw new Error("massing info")
        }
        let endDate = new Date(start_date)
        endDate.setMonth(endDate.getMonth() + 12)
        let stage = await Stage.getById(stage_id)
        if (!stage) {
            throw new Error("NOT FOUND THE STAGE ID!")
        }
        let discount = await Discount.getById(discount_id)
        let amount = (Number(stage.amount) - (Number(stage.amount) * Number(discount.amount)))
        await Pool.query(`insert into student(name,discount_id,stage_id,start_date,end_date,amount) values($1,$2,$3,$4,$5,$6)`, [name, discount_id, stage_id, start_date, endDate, amount])
        return;
    }

    static async getAll() {
        let { rows } = await Pool.query(`
            select s.id,s.name,s.discount_id,s.start_date,s.end_date,s.amount,st.name as stage_name , t.name as type_name , c.name as category_name from student s
            inner join stage st on s.stage_id=st.id
            inner join type_of_studey t on t.id=st.type_id
            inner join category c on c.id=t.category_id
            inner join discount d on s.discount_id=d.id
            where s.deleted=false
            `)
        return rows
    }
    static async getById(id) {
        if (!id) throw new Error("massing info!")
        let { rows } = await Pool.query(`
            select s.id,s.name,s.stage_id,s.discount_id,s.start_date,s.end_date,s.amount,st.name as stage_name , t.name as type_name , c.name as category_name,st.is_end,t.amount as stage_amount from student s
            inner join stage st on s.stage_id=st.id
            inner join type_of_studey t on t.id=st.type_id
            inner join category c on c.id=t.category_id
            inner join discount d on s.discount_id=d.id
            where s.id=$1  and s.deleted=false
            `, [id])
        if (rows.length === 0) throw new Error("the student not found !")
        return rows[0]
    }
    static async decAmount(amount, id, client) {
        if (!amount || !id) {
            throw new Error("massig info")
        }
        await client.query(`update student set amount=amount-$1 where id=$2`, [amount, id])
        await Logs.insert(id, "Receipts", (amount * -1), client)
        return;
    }

    static async patch(student_id, stage_id, discount_id, start_date) {
        if (!student_id || !stage_id) {
            throw new Error("massing info !")
        }
        let student = await this.getById(student_id)
        if (student.is_end) {
            throw new Error("student is Ended")
        }
        let stage = await Stage.getById(stage_id)

        let discount;
        if (discount_id) {
            discount = await Discount.getById(discount_id)
        } else {
            discount = await Discount.getById(student.discount_id)
        }

        let amount = (Number(stage.amount) - (Number(stage.amount) * Number(discount.amount)))
        student.amount = amount + Number(student.amount);
        let endDate = new Date(start_date)
        endDate.setMonth(endDate.getMonth() + 12)

        const client = await Pool.connect()
        try {
            await client.query(`BEGIN`);
            await client.query(`
            update student set amount=$1,discount_id=$2,stage_id=$3,start_date=$5,end_date=$6,is_end=$7 where id=$4
            `, [student.amount, discount.id, stage_id, student_id, start_date, endDate, stage.is_end])
            Logs.insert(student_id, "go for next stage", amount, client)
            await client.query(`Commit`)
        } catch (error) {
            await client.query(`ROLLBACK`)
            throw error
        } finally {
            client.release()
        }
    }
    static async addingMothns(student_id, monthes) {
        if (!student_id || !monthes) {
            throw new Error("massing info !")
        }
        let student = await this.getById(student_id)
        if (student.is_end) {
            throw new Error("student is Ended")
        }

        let stage = await Stage.getById(student.stage_id)
        let discount = await Discount.getById(student.discount_id)

        let amount = (Number(stage.amount) - (Number(stage.amount) * Number(discount.amount))) / 12;

        let endDate = new Date(student.end_date)
        endDate.setMonth(endDate.getMonth() + monthes)
        amount = amount * monthes;
        amount += Number(student.amount)
        const client = await Pool.connect()
        try {
            await client.query(`BEGIN`);
            await client.query(`
            update student set amount=$1,end_date=$2 where id=$3
            `, [amount, endDate, student_id])
            Logs.insert(student_id, "adding more monthes : " + monthes, amount, client)
            await client.query(`Commit`)
        } catch (error) {
            await client.query(`ROLLBACK`)
            throw error
        } finally {
            client.release()
        }
    }
    static async delete(id) {
        if (!id) throw new Error("massing info!")
        await Pool.query(`update student set deleted=true where id=$1`, [id])
        return
    }
}

module.exports = student