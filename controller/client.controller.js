const pool = require("../database/index")
//aa
const clientController = {
    doktorlarım: async (req, res) => {
        try {
            const { userId } = req.user;
            const [rows, fields] = await pool.query("select d.tag,u.username,d.content,u.`role`,b.name,u.email from users u join doktorinfo d on u.id=d.docktor_id join doktorbranches db on d.docktor_id=db.docktor_id join branches b on db.branches_id=b.id where u.id=(select docktor_id  from usershastane  where users_id=?)", [userId]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Hastanın Herhangi Bir Doktoru yoktur" }); // hata mesajı gönder
            }

            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
        
    },
    mesajlarim: async (req, res) => {//aktif mesajları gösterir hastanın sildiği görünmez
        try {
            const { userId } = req.user;
            const [rows, fields] = await pool.query("select messages ,u2.username ,u2.`role`,h.name  from usersmessages u join users u2 on u.docktor_id=u2.id join doktorinfo d on u.docktor_id=d.docktor_id join hastaneler h on d.hospital_id=h.id where users_id =? and u.isactive=1", [userId]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Hastaya ait mesajlaşma kayıtları bulunamadı" }); // hata mesajı gönder
            }

            res.json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
        
    },
    mesaj_gonder: async (req, res) => {
        try {
            const {messages,docktor_id}=req.body;
            const { userId } = req.user;
            const sql = "insert into usersmessages (messages,users_id,isactive,docktor_id) values (?,?,1,?)"
            const [rows, fields] = await pool.query(sql, [messages, userId,docktor_id])  
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.json({ status: "error", message: "Hastaya ait mesajlaşma kayıtları bulunamadı" }); // hata mesajı gönder
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
module.exports = clientController