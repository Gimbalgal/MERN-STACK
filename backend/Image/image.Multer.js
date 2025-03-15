const multer = require('multer');

// Multer Storage (Store image as Buffer)
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

module.exports = upload;


