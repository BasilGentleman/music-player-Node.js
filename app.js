//项目主入口
var http = require('http');
//导入配置文件
var config = require('./config.js');


//导入render 函数
var render = require('./common/render.js');
//导入router函数
var router = require('./router.js')
//创建服务器
var server = http.createServer();
//每当客户发出请求，都会触发一次
server.on('request' ,(req,res)=>{

    //调用render 函数
    render(res);
    //调用router 函数
    router(req,res);


});

//监听服务器启动
server.listen(config.port,config.host,()=>{
    console.log('server running at http://' + config.host +':'+config.port)
})

