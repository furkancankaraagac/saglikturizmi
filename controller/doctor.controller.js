const pool = require("../database/index")

const docktorController = {

    getdocktorsclient: async (req, res) => {
        try {
            const { userId } = req.user;
            const [rows, fields] = await pool.query("select u2.id,u2.email,u2.username,h.name,u2.role from usershastane u join users u2 on u.users_id=u2.id join hastaneler h on u.hastane_id =h.id where u.docktor_id = ?", [userId]);

            if (rows.length === 0) { // veritabanından sonuç gelmezse
                return res.status(401).json({ status: "error", message: "Doktor Hastası Bulunamadı" }); // hata mesajı gönder
            }

            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },
    getdocktorinfo: async (req, res) => {
        try {
            const { userId } = req.user;
            const [rows, fields] = await pool.query("select tag,role,u.username,h.name,d.content   from   doktorinfo d join hastaneler h on  d.hospital_id = h.id join users u on  d.docktor_id = u.id join doktorbranches d2 on  d.docktor_id =d2.docktor_id where d.docktor_id =  ?", [userId]);

            if (rows.length === 0) { // veritabanından sonuç gelmezse
                return res.status(401).json({ status: "error", message: "Doktor Hakkında Bulunamadı!" }); // hata mesajı gönder
            }

            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },

    updatedocktorinfo: async (req, res) => {
        try {
            const { tag, content } = req.body;
            const { userId } = req.user;
            const sql = "update doktorinfo set tag = ?, content = ?  where docktor_id = ? "
            const [rows, fields] = await pool.query(sql, [tag, content, userId])
            if (rows.length === 0) { // veritabanından sonuç gelmezse
                res.status(401).json({ status: "error", message: "Doktor Hakkında Bulunamadı!" }); // hata mesajı gönder
            }

            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }
    },
    doktormesajlarim: async (req, res) => {//aktif mesajları gösterir hastanın sildiği görünmez
        try {
            const { hasta_id } = req.body;//tıklanınlan id doktorun tıkladığı hasta
            const { userId } = req.user;
            const sql = ("select * from usersmessages u where docktor_id =? and u.hasta_id=? and u.isactive=1 ORDER BY gönderim_zamanı DESC;");
            const [rows, fields] = await pool.query(sql, [userId, hasta_id])
            if (rows.length === 0) { // veritabanından sonuç gelmezse
                res.status(401).json({ status: "error", message: "Hastaya ait mesajlaşma kayıtları bulunamadı" }); // hata mesajı gönder
            }

            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }

    },
    docktor_mesaj_gonder: async (req, res) => {
        try {
            const { messages, patient_id } = req.body;//tıklanılan hasta id sol menüden
            const { userId } = req.user;
            const sql = "insert into usersmessages (messages,hasta_id,isactive,docktor_id,gönderen_id,gönderim_zamanı) values (?,?,1,?,?,sysdate())"
            const [rows, fields] = await pool.query(sql, [messages, patient_id, userId, userId])
            if (rows.length === 0) { // veritabanından sonuç gelmezse
                res.status(401).json({ status: "error", message: "Doktora ait mesajlaşma kayıtları bulunamadı" }); // hata mesajı gönder
            }
            else {
                res.status(200).json({ status: "succes", message: "Mesaj Başarıyla gönderildi" });
            }

            res.status(200).json({ data: rows }); // veritabanından dönen sonuçları gönder
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: "error", message: "Veri Tabanından İsteğe Dönüş Alınamadı" }); // hata mesajı gönder
        }

    },
    createdocktoroperations: async (req, res) => {
        try {
            const { name, operation_date, operation_description, branch_id } = req.body
            const { userId } = req.user;
            const sql = "insert into doctoroperations (doctor_id,operation_name,operation_date,operation_description,branch_id) values ( ?, ?, ?, ? , ? )"
            const [rows, fields] = await pool.query(sql, [userId, name, operation_date, operation_description, branch_id])

            if (rows.affectedRows) {
                return res.status(200).json({ message: "Doktor Operasyonu Kaydedildi" })
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
}

module.exports = docktorController