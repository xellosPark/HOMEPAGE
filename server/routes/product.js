const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");
//=================================
//             Product
//=================================
///////////////////////////multer////////////////////////////////////////
var storage = multer.diskStorage({
    // 파일 위치 설정
    destination: function (req, file, cb) {
      cb(null, 'uploads/')  // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    // 파일 명
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  })
  // single 꼭 해야한다.
  var upload = multer({ storage: storage }).single("file")
/////////////////////////////////////////////////////////////////////////////


router.post('/image', (req, res) => {

  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, err => {
      if (err) {
          return req.json({ success: false, err })
      }
      return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })

})

// router.post ('/api/product/ ', 값)
// router.post('/', (req, res) => {
//   //받아온 정보들을 DB에 넣어 준다.
//   const product = new Product(req.body)
//   product.save((err) => {
//       if (err) return res.status(400).json({ success: false, err })
//       return res.status(200).json({ success: true })
//   })
// })
router.post('/products', (req, res) => {
  // product collection에 들어 있는 모든 상품 정보를 가져오기 
  // MONGODB 자료 가져오기
  //.find() DB 다 가져오기 .find({조건})
  Product.find()
    .populate("writer") // 작성자 데이터 가져올수있다. email, id .....
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({
        success: true, productInfo })
        //postSize: productInfo.length
      
    })

})



module.exports = router;
