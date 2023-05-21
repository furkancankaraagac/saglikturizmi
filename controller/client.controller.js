const pool = require("../database/index")
//aa
const clientController = {
    doktorlarım: async (req, res) => {
        try {
            const { userId } = req.user;
            const [rows, fields] = await pool.query("select u.id,d.tag,u.username,d.content,u.`role`,b.name,u.email from users u join doktorinfo d on u.id=d.docktor_id join doktorbranches db on d.docktor_id=db.docktor_id join branches b on db.branches_id=b.id where u.id in (select docktor_id  from usershastane  where users_id=?)", [userId]);
            
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.status(401).json({ status: "error", message: "Hastanın Herhangi Bir Doktoru yoktur" }); // hata mesajı gönder
            }

            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
        
    },
    mesajlarim: async (req, res) => {//aktif mesajları gösterir hastanın sildiği görünmez
        try {
            const {docktor_id}=req.body;//tıklanılan id soldaki doktorlarım menüsünden docktor_id
            const { userId } = req.user;
            const sql = ("select *  from usersmessages u where hasta_id =? and u.docktor_id =? and u.isactive=1 ORDER BY gönderim_zamanı DESC;");
            const [rows, fields] = await pool.query(sql, [userId,docktor_id])
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.status(401).json({ message: "Hastaya ait mesajlaşma kayıtları bulunamadı" }); // hata mesajı gönder
            }

            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: (401), message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
        
    },
    mesaj_gonder: async (req, res) => {
        try {
            const {messages,docktor_id}=req.body;//tıklanılan doktor_id alması lazım
            const { userId } = req.user;
            const sql = "insert into usersmessages (messages,hasta_id,isactive,docktor_id,gönderen_id,gönderim_zamanı) values (?,?,1,?,?,sysdate())"
            const [rows, fields] = await pool.query(sql, [messages, userId,docktor_id,userId])  
            if(rows.length === 0) { // veritabanından sonuç gelmezse
                return res.status(401).json({ status: "error", message: "Hastaya ait mesajlaşma kayıtları gönderilemedi" }); // hata mesajı gönder
            }
            else{
                return res.status(200).json({ status: "succes", message: "Mesaj Başarıyla gönderildi" });
            }

            res.status(401).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
        
    }
}
module.exports = clientController