const multer = require("multer");

//storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//data users
const users = [
  {
    id: 1,
    nama: "John",
  },
  {
    id: 2,
    nama: "Doe",
  },
  {
    id: 3,
    nama: "Smith",
  },
];

class adminController {
  index(req, res) {
    let pesan = "";

    if (req.query.nama) {
      const user = users.find((user) => user.nama == req.query.nama);
      pesan = `Tampilkan data ${user.nama}!`;
    } else {
      pesan = "Tampilkan semua data!";
    }

    res.json({
      pesan: pesan,
    });
  }

  show(req, res) {
    //query
    // const user = users.find((user) => user.id == req.params.id);
    // user.id, user.nama

    //destructuring
    const { id, nama } = users.find((user) => user.id == req.params.id);

    res.json({
      id: id,
      nama: nama,
      pesan: `Selamat bergabung ${nama}!`,
    });
  }

  store(req, res) {
    res.json({
      admin: req.user,
      pesan: `Data nama ${req.body.nama} dengan umur ${req.body.umur} berhasil disimpan!`,
    });
  }

  delete(req, res) {
    //destructuring
    const { nama } = users.find((user) => user.id == req.params.id);

    res.json({
      pesan: `Data dengan nama ${nama} berhasil dihapus!`,
    });
  }

  upload(req, res) {
    formData.single("avatar")(req, res, function (err) {
      if (err) {
        return res.status(500).json({
          pesan: err.message,
        });
      } else {
        res.json({
          pesan: "Upload avatar berhasil!",
          file: req.file,
        });
      }
    });
  }
}

// function index(req, res) {
//   res.json({
//     pesan: "Tampilkan semua data!",
//   });
// }

// function store(req, res) {
//   res.json({
//     pesan: "Data berhasil disimpan!",
//   });
// }

// module.exports = { index, store, show };

module.exports = new adminController();
