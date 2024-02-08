/**File upload Object **/
const multer = require('multer');

const storage = multer.diskStorage({
       destination: 'public/uploads/',
       filename: function (req, file, cb) {
              cb(null,Date.now()+'.jpg')
       }
})

const uploadObj = multer({ storage: storage });

module.exports = uploadObj;
console.log('File upload obj is ready to use');