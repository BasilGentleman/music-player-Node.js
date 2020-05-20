var fs = require('fs');
var path = require('path');
var config = require('../config.js');
var _ = require('underscore');

module.exports = function(res) {
    /**
     * 为res 对象追加render 函数，使用这个函数可以很方便渲染指定页面
     * 其中 viewname 为 要渲染页面的名称
     * dataObj 为 要渲染的页面数据
     */
    res.render = function(viewname , dataObj) {
        fs.readFile(path.join(config.viewPath,viewname +'.html') ,(err,data)=>{        //处理请求
            if(err) return res.end('404.');
            //调用underscore的template，把要渲染的模板字符串传递进去，得到一个渲染函数
            var compile =  _.template(data.toString());
            //调用渲染函数，把要渲染的数据，传递给它，就得到渲染的页面字符串
            var htmlstr = compile(dataObj);
            //把渲染好的页面字符串，通过res.end，返回浏览器显示
            res.end(htmlstr);
            
        });
    }
}