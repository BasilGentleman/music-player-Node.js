//导入 url 模块
var url = require('url');
//导入 fs 模块
var fs =require('fs');
//导入path 模块
var path = require('path');

//导入musicCtrl函数
var musicCtrl = require('./controllers/musicCtrl.js');

module.exports = function(req,res){
     //使用url模块解析请求的url路径
     var urlObj = url.parse(req.url,true);
     //请求的路径，其中不包含查询的字符串
     var pathname = urlObj.pathname;
     //为req对象，追加自定义属性query ，属性值从 urlobj.query 获取
     req.query = urlObj.query;
 
     var method = req.method.toLowerCase();   //转换为小写
 
 
     if ( method==='get' && pathname === '/') {   //主页
        musicCtrl.showIndex(req,res);
     } else if (method==='get' && pathname === '/add'){  //添加音乐界面
        musicCtrl.showAdd(req,res);
     } else if (method==='post' && pathname === '/add'){  //添加音乐
        musicCtrl.addMusic(req,res);
     } else if (method==='get' && pathname === '/remove'){  //移除音乐
        musicCtrl.removeMusic(req,res);
     } else if (method==='get' && pathname === '/edit'){    //显示编辑页面
       musicCtrl.showEdit(req,res);
     }  else if (method==='post' && pathname === '/edit'){     //编辑歌曲信息
       musicCtrl.doEdit(req,res);
     } else if (method==='get' && pathname.startsWith('/node_modules/')) {           //处理静态资源
         fs.readFile(path.join(__dirname,pathname) ,(err,data)=>{
             if(err) return res.end('404.');
             res.end(data);
         });
     }
}