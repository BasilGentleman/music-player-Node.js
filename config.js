var path = require('path')
module.exports = {
    port : 3000,
    host:'127.0.0.1',
    uploadPath:path.join(__dirname,'./uploads'), //上传文件时候的根路径
    viewPath:path.join(__dirname,'./views')     //视图页面文件存放的根路径
}