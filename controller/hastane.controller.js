const pool = require("../database/index")
//a
const hastaneController = {

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
            const { userId } = req.user;
            const { username } = req.user;
            const [rows, fields] = await pool.query("select u.username ,u.`role`,d.tag ,d.content ,d.image ,h.name  from users u join doktorinfo d on u.id =d.docktor_id join hastaneler h on d.hospital_id =h.id where d.isactive =1 and h.name=?", [username]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Doktor Bulunamadı!" }); // hata mesajı gönder
            }
    
            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
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
    hastanemesajlarim: async (req, res) => {
        try {
            const { userId } = req.user;
            const { username } = req.user;
            const [rows, fields] = await pool.query("select messages ,u2.username ,u2.`role`,h.name from usersmessages u join users u2 on u.users_id =u2.id join doktorinfo d on u.docktor_id=d.docktor_id join hastaneler h on d.hospital_id=h.id where u.docktor_id=? and u.isactive=1", [userId]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Doktorun Mesajları Bulunamadı!" }); // hata mesajı gönder
            }
    
            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },
    hastane_mesaj_gonder: async (req, res) => {
        try {
            const {messages,patient_id}=req.body;
            const { userId } = req.user;
            const sql = "insert into usersmessages (messages,users_id,isactive,docktor_id) values (?,?,1,?)"
            const [rows, fields] = await pool.query(sql, [messages, patient_id,userId])  
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Doktora ait mesajlaşma kayıtları bulunamadı" }); // hata mesajı gönder
            }
            else{
                return res.json({ status: "succes", message: "Mesaj Başarıyla gönderildi" });
            }

            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
        
    },
    hastanetümmesajlar: async (req, res) => {//tüm mesajları görebilir hastaneyle ilgili
        try {
            const { userId } = req.user;
            const { username } = req.user;
            const [rows, fields] = await pool.query("select messages ,u2.username ,u2.`role`,h.name from usersmessages u join users u2 on u.users_id =u2.id join doktorinfo d on u.docktor_id=d.docktor_id join hastaneler h on d.hospital_id=h.id where  h.name =?", [username]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Doktorun Mesajları Bulunamadı!" }); // hata mesajı gönder
            }
    
            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },
}

module.exports = hastaneController