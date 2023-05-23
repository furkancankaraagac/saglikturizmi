const pool = require("../database/index")
const jwt = require('jsonwebtoken')
const session = require('express-session');
const bcryptjs = require ("bcryptjs");
//aa
const authController = {
    register: async (req, res) => {
        try {
            const { email, password, username } = req.body
            const [user, ] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.status(401).json({ error: "Email already exists!" })
            
            const hash = await bcryptjs.hashSync(password, 10);

            const sql = "insert into users (email, password, username,role) values (?, ?, ?,'client')"
            const [rows, fields] = await pool.query(sql, [email, hash, username])

            if (rows.affectedRows) {
                return res.status(200).json({ message: "Kullanıcı Başarıyla Oluşturuldu" })
            } else {
                return res.status(401).json({ error: "Error" })
            }
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    login: async (req, res) => {
        try {
          const { email, password } = req.body;
          const [user, ] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
          
          if (!user[0]) {
            return res.status(401).json({ error: "Böyle bir kullanıcı bulunamadı!" });
          }
          
          const { password: hash, id, username, role,...otherDetails } = user[0];
          const check = await bcryptjs.compare(password, hash);
      
          if (check) {
            const accessToken = jwt.sign(
                { 
                  userId: id,
                  role: role,// kullanıcının rolü token payload'ına eklendi
                  username: username
                },
                '3812932sjad34&*@',
                { expiresIn: '1h' }
              );
              res.cookie('accessToken', accessToken, {
                httpOnly: true,
              })
              .status(200)
              .json({ id,details: { ...otherDetails }, role, username });
        
        } else {
            return res.status(401).json({ error: "Wrong password!" });
        }
        } catch (error) {
          console.log(error);
          res.status(401).json({
            error: error.message
          });
        }
      },
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM musteri")
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
    
}

module.exports = authController