const pool = require("../database/index")
const postsController = {
    //a
    getAlldocktors: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from users s  join doktorinfo d on s.id=d.docktor_id where role='docktor'")
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
    getByIdDoktors: async (req, res) => {
        try {
          const { id } = req.params;
      
            // Doktor detayları sorgusu
            const [doktorRows, doktorFields] = await pool.query(
            "SELECT h.name as Hastane,d.tag,u.username ,u.email ,d.content ,d.image from users u join doktorinfo d on u.id=d.docktor_id JOIN hastaneler h ON d.hospital_id = h.id WHERE u.id = ?",
            [id]
            );
      
            // Yorumlar sorgusu
            const [yorumRows, yorumFields] = await pool.query(
            "SELECT dy.yorum, u.username, u.email, dy.doktor_id, dy.yorumzamanı FROM doktor_yorumlar dy JOIN users u ON dy.user_id = u.id WHERE dy.doktor_id = ? ORDER BY dy.yorumzamanı DESC",
            [id]
            );
            // Doktorun branşları sorgusu
            const [branchesRows, branchesFields] = await pool.query(
            "select b.name  from doktorbranches d join branches b on d.branches_id =b.id where d.docktor_id =?",
            [id]
            );
            // Doktorun Operasyonları sorgusu
            const [operationRows, operationFields] = await pool.query(
            "select d.id,d.operation_name ,d.operation_description ,d.operation_date ,b.name as UnitName from doctoroperations d  join branches b on b.id =d.branch_id where doctor_id =? ORDER BY d.operation_date  DESC;",
            [id]
            );
      
        // Sonuçları ayrı JSON nesnelerinde döndür
        res.status(200).json({
            doktorDetay: doktorRows,
            yorumlar: yorumRows,
            doktorunbransları:branchesRows,
            doktorunOperasyonları:operationRows

        });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                status: "error"
            });
        }
    },
    getallhospital: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from hastaneler h ")
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
    getByIdHastane: async (req, res) => {//doktorun idsine göre doktoru listeleme
        try {
            const { id } = req.params
            //Hastane genel detaylar
            const [hastaneDetayrows, hastaneDetayfields] = await pool.query("select * from hastaneler h where id =?", [id])
            //Hastane branşlar unitler
            const [branslarrows, branslarfields] = await pool.query("select b.name,b.image  from hastaneler h join branches b on h.id =b.hastane_id  where h.id =?", [id])
            //hastanedeki doktorlar
            const [doktorlarrows, doktorlarfields] = await pool.query("select d.tag,u.username ,u.email ,d.image from doktorinfo d join users u on d.docktor_id =u.id  where d.hospital_id =?", [id])
            //Hastane Yorumlar sorgusu
            const [yorumRows, yorumFields] = await pool.query(
                "select u.username ,u.email ,u.`role`,hy.yorum ,hy.yorumzamanı from hastane_yorumlar hy join users u on hy.user_id =u.id  where hy.hastane_id =? ORDER BY hy.yorumzamanı DESC",
                [id]
                );
            res.status(200).json({
                HastaneDetay: hastaneDetayrows,
                HastaneBranslar:branslarrows,
                HastaneDoktorlar:doktorlarrows,
                HastaneYorumlar:yorumRows
            })
        } catch (error) {
            console.log(error)
            res.status(401).json({
                status: "error"
            })
        }
    },
    getallbranches: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select distinct name, image  from branches b ")
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
    getByIdBranches: async (req, res) => {//doktorun idsine göre doktoru listeleme
        try {
            //burda name olarak kullandık tablo yapısından dolayı
            const {name}=req.params
            //Bransın detayları
            const [bransdetayrows, hastaneDetayfields] = await pool.query("select distinct name,image from branches b where b.name =?", [name])
            //Bransın olduğu hastaneler
            const [branshatanelerrows, branslarfields] = await pool.query("select b.name,b.image as branşresim ,h.name ,h.adress,h.description as hastanedescription,h.image as hastaneresim from branches b join hastaneler h on b.hastane_id =h.id where b.name=?", [name])
            //Bransın sahip olduğu doktorlar
            const [bransdoktorlarrows, doktorlarfields] = await pool.query("select d2.tag ,u.username ,u.email ,d2.image  from doktorbranches d join branches b on b.id =d.branches_id join users u on u.id =d.docktor_id join doktorinfo d2 on d2.docktor_id =d.docktor_id  where b.name=?", [name])

            res.status(200).json({
                BransDetay: bransdetayrows,
                BransHastaneler:branshatanelerrows,
                BransDoktorlar:bransdoktorlarrows
            })
        } catch (error) {
            console.log(error)
            res.status(401).json({
                status: "error"
            })
        }
    },

}


module.exports = postsController