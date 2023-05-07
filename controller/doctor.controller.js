const pool = require("../database/index")

const docktorController = {

    getdocktorsclient: async (req, res) => {
        try {
            const { userId } = req.user;
            const [rows, fields] = await pool.query("select u2.id,u2.email,u2.username,h.name,u2.role from usershastane u join users u2 on u.users_id=u2.id join hastaneler h on u.hastane_id =h.id where u.docktor_id = ?", [userId]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Doktor Hastası Bulunamadı" }); // hata mesajı gönder
            }
    
            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },
    getdocktorinfo: async (req, res) => {
        try {
            const { userId } = req.user;
            const [rows, fields] = await pool.query("select tag,role,u.username,h.name,d.content   from   doktorinfo d join hastaneler h on  d.hospital_id = h.id join users u on  d.docktor_id = u.id join doktorbranches d2 on  d.docktor_id =d2.docktor_id where d.docktor_id =  ?", [userId]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Doktor Hakkında Bulunamadı!" }); // hata mesajı gönder
            }
    
            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },

    updatedocktorinfo: async (req, res) => {
        try {
            const {tag,content,isactive}=req.body;
            const { userId } = req.user;
            const sql = "update doktorinfo set tag = ?, content = ? ,isactive=? where docktor_id = ? "
            const [rows, fields] = await pool.query(sql, [tag, content, isactive,userId])
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Doktor Hakkında Bulunamadı!" }); // hata mesajı gönder
            }
    
            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },
    doktormesajlarim: async (req, res) => {
        try {
            const { userId } = req.user;
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
    docktor_mesaj_gonder: async (req, res) => {
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
        
    }
}

module.exports = docktorController//aa