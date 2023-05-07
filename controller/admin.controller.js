const pool = require("../database/index")
const bcryptjs = require ("bcryptjs");

const adminController = {
    getAllclients: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users where role='client'")
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

    createClient: async (req, res) => {
        try {
            const { email, password, name } = req.body
            const [user, ] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })
            
        const salt = await bcryptjs.genSaltSync(8);
        const hash = await bcryptjs.hashSync(password, salt);

            const sql = "insert into users (email, password, name,role) values (?, ?, ?,'client')"
            const [rows, fields] = await pool.query(sql, [email, hash, name])

            if (rows.affectedRows) {
                return res.json({ message: "Kullanıcı Başarıyla Oluşturuldu" })
            } else {
                return res.json({ error: "Error" })
            }
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },

    getAlldocktor: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users where role='docktor'")
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
    createdocktor: async (req, res) => {
        try {
            const { email, password, username } = req.body
            const [user, ] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })
            
        const salt = await bcryptjs.genSaltSync(8);
        const hash = await bcryptjs.hashSync(password, salt);

            const sql = "insert into users (email, password, username,role) values (?, ?, ?,'docktor')"
            const [rows, fields] = await pool.query(sql, [email, hash, username])

            if (rows.affectedRows) {
                return res.json({ message: "Doktor Kaydedildi" })
            } else {
                return res.json({ error: "Error" })
            }
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    updateusers: async (req, res) => {
        try {
            const {username, email } = req.body
            const { id } = req.params
            const sql = "update users set username = ?, email = ? where id = ? "
            const [rows, fields] = await pool.query(sql, [username, email, id])
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
    deleteusers: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from users where id = ? ", [id])
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
    createhastane: async (req, res) => {
        try {
            const { parent_id,name,adress,lat,lng} = req.body
            const sql = "insert into hastaneler (id,parent_id,name,adress,lat,lng,isactive) values ((select count(*)+1 from hastaneler h) , ?, ?, ?, ? , ? , 1)"
            const [rows, fields] = await pool.query(sql, [parent_id,name,adress,lat,lng])

            if (rows.affectedRows) {
                return res.json({ message: "Hastane Kaydedildi" })
            } else {
                return res.json({ error: "Error" })
            }
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    updatehastane: async (req, res) => {
        try {
            const { hastane_id,parent_id,name,adress,lat,lng} = req.body
            const { id } = req.params
            const sql = "update hastaneler set  name = ?, parent_id = ? ,adress = ?, lat = ? , lng = ?   where id = ? "
            const [rows, fields] = await pool.query(sql, [ name,parent_id,adress,lat,lng,hastane_id])
          
            if (rows.affectedRows) {
                return res.json({ message: "Hastane Kaydedildi" })
            } else {
                return res.json({ error: "Error" })
            }
           
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    // deletehastane: async (req, res) => {
    //     try {
    //         const { id } = req.params
    //         const [rows, fields] = await pool.query("delete from hastaneler where id = ?", [id])
    //         res.json({
    //             data: rows
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         res.json({
    //             status: "error"
    //         })
    //     }
    // },
    createbranches: async (req, res) => {
        try {
            const { doctor_id,name,operation_date,operation_description,branch_id} = req.body
            const sql = "insert into doctoroperations (id,doctor_id,operation_name,operation_date,operation_description,branch_id) values ((select count(*)+1 from doctoroperations d) , ?, ?, ?, ? , ? )"
            const [rows, fields] = await pool.query(sql, [doctor_id,name,operation_date,operation_description,branch_id])

            if (rows.affectedRows) {
                return res.json({ message: "Doktor Operasyonu Kaydedildi" })
            } else {
                return res.json({ error: "Error" })
            }
            sadasd
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
}


module.exports = adminController