const pool = require("../database/index")
const bcryptjs = require ("bcryptjs");

const adminController = {
    updateusers: async (req, res) => {
        try {
            const {username, email } = req.body
            const { id } = req.params
            const sql = "update users set username = ?, email = ? where id = ? "
            const [rows, fields] = await pool.query(sql, [username, email, id])
            res.status(200).json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.status(401).json({
                status: "error"
            })
        }
    }, 
    createhastane: async (req, res) => {
        try {
            const { parent_id,name,adress,lat,lng} = req.body
            const sql = "insert into hastaneler (parent_id,name,adress,lat,lng,isactive) values ( ?, ?, ?, ? , ? , 1)"
            const [rows, fields] = await pool.query(sql, [parent_id,name,adress,lat,lng])

            if (rows.affectedRows) {
                return res.status(200).json({ message: "Hastane Kaydedildi" })
            } else {
                return res.status(401).json({ error: "Error" })
            }
            
        } catch (error) {
            console.log(error)
            res.status(401).json({
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
                return res.status(200).json({ message: "Hastane Kaydedildi" })
            } else {
                return res.status(401).json({ error: "Error" })
            }
           
        } catch (error) {
            console.log(error)
            res.status(401).json({
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
            const sql = "insert into doctoroperations (doctor_id,operation_name,operation_date,operation_description,branch_id) values ( ?, ?, ?, ? , ? )"
            const [rows, fields] = await pool.query(sql, [doctor_id,name,operation_date,operation_description,branch_id])

            if (rows.affectedRows) {
                return res.status(200).json({ message: "Doktor Operasyonu Kaydedildi" })
            } else {
                return res.status(401).json({ error: "Error" })
            }
            sadasd
            
        } catch (error) {
            console.log(error)
            res.status(401).json({
                error: error.message
            })
        }
    },
}


module.exports = adminController