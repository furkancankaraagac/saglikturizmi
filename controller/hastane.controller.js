const pool = require("../database/index")
//a
const hastaneController = {

    getAllclients: async (req, res) => {
        try {
            const { userId } = req.user;//bu kısımda userıd hastane id olarak login authorize kısmından alınıyor
            const sql= "SELECT * FROM users u join usershastane u2 on u.id =u2.users_id  where u.role='client' and u2.hastane_id=?"
            const [rows, fields] = await pool.query(sql, [userId])
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
    createClient: async (req, res) => {
        try {
            const { email, password, name } = req.body
            const [user, ] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.status(401).json({ error: "Email already exists!" })
            const sql = "insert into users (email, password, name,role) values (?, ?, ?,'client')"
            const [rows, fields] = await pool.query(sql, [email, hash, name])

            if (rows.affectedRows) {
                return res.status(200).json({ message: "Kullanıcı Başarıyla Oluşturuldu" })
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
    getAlldocktor: async (req, res) => {
        try {
            const { userId } = req.user;
            const { username } = req.user;
            const [rows, fields] = await pool.query("select u.username ,u.`role`,d.tag ,d.content ,d.image ,h.name  from users u join doktorinfo d on u.id =d.docktor_id join hastaneler h on d.hospital_id =h.id where d.isactive =1 and h.name=?", [username]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                res.status(401).json({ status: "error", message: "Doktor Bulunamadı!" }); // hata mesajı gönder
            }
    
            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },
    createdocktor: async (req, res) => {
        try {
            const { email, password, username } = req.body
            const [user, ] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.status(401).json({ error: "Email already exists!" })
            
        const salt = await bcryptjs.genSaltSync(8);
        const hash = await bcryptjs.hashSync(password, salt);

            const sql = "insert into users (email, password, username,role) values (?, ?, ?,'docktor')"
            const [rows, fields] = await pool.query(sql, [email, hash, username])

            if (rows.affectedRows) {
                return res.status(200).json({ message: "Doktor Kaydedildi" })
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
    createbranches: async (req, res) => {
        try {
            const { name,hastane_id,image,branch_id} = req.body
            const { userId } = req.user;
            const sql = "INSERT INTO hospital.branches (parent_id, name, hastane_id, isactive, image)VALUES(0, ?, ?, 1, ?);"
            const [rows, fields] = await pool.query(sql, [name,hastane_id,image])

            if (rows.affectedRows) {
                return res.status(200).json({ message: "Branch Kaydedildi" })
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

module.exports = hastaneController