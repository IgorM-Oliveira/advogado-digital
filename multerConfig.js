const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve('uploads/')); // Pasta onde os arquivos serão armazenados
    },
    filename: function (req, file, callback) {
        const time = new Date().getTime();

        callback(null, `${time}_${file.originalname}`); // Nome original do arquivo
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
