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
            const { email, password, username,parent_id,adress,lat,lng} = req.body
            const [user, ] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.status(401).json({ error: "Email already exists!" })
            
        const salt = await bcryptjs.genSaltSync(8);
        const hash = await bcryptjs.hashSync(password, salt);
            //userın oluşturulması
            const sql1 = "insert into users (email, password, username,role) values (?, ?, ?,'hastane')"
            const [rows, fields] = await pool.query(sql1, [email, hash, username])
            const sql = "insert into hastaneler (id,parent_id,name,adress,lat,lng,isactive) values ( (select u.id from users u where u.username =?),?, ?, ?, ? , ? , 1)"
            const [rows1, fields1] = await pool.query(sql, [username,parent_id,username,adress,lat,lng])

            if (rows.affectedRows && rows1.affectedRows) {
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
    deletedoctor: async (req, res) => {
        try {
          const { id } = req.body;
      
          await pool.query("DELETE FROM doctoroperations WHERE doctor_id=?", [id]);
          await pool.query("DELETE FROM doktor_yorumlar WHERE doktor_id=?", [id]);
          await pool.query("DELETE FROM usershastane WHERE docktor_id=?", [id]);
          await pool.query("DELETE FROM usersmessages WHERE docktor_id=?", [id]);
          const [rows, fields] = await pool.query("DELETE FROM users WHERE id=?", [id]);
      
          res.status(200).json({
            data: rows
          });
        } catch (error) {
          console.log(error);
          res.json({
            status: "error"
          });
        }
    },
}


module.exports = adminController