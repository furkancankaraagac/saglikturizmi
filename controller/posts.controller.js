const pool = require("../database/index")
const postsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    //a
    getById: async (req, res) => {//doktorun idsine göre doktoru listeleme
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select h.name as hospitalname,u.username ,b.name as unitname,d2.tag,d2.content,d2.image from branches b  join doktorbranches d ON b.id=d.branches_id join users u  on u.id=d.docktor_id join doktorinfo d2 on u.id=d2.docktor_id join hastaneler h on d2.hospital_id=h.id  where u.id=?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getAlldocktors: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from users s  join doktorinfo d on s.id=d.docktor_id where role='docktor'")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getallhospital: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from hastaneler h ")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    create: async (req, res) => {
        try {
            const { name, content } = req.body
            const sql = "insert into musteri (name, content) values (?,?)"
            const [rows, fields] = await pool.query(sql, [name ,content])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const {name, content } = req.body
            const { id } = req.params
            const sql = "update musteri set name = ?, content = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [name, content, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from musteri where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }

}

module.exports = postsController