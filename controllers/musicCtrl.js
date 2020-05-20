var formidable =  require('formidable');


var storage =[
    {id: 1, title:'寓士山下',singer: '陈奕迅',music:'陈奕迅-宫士山下.mp3',poster: '陈奕迅.jpg' },
    {id: 2, title:'石头记',singer: '达明-派',music:'达明一派-石头记.mp3',poster: '达明-派.jpg' },
    {id: 3, title:'十年',singer: '陈奕迅',music:'陈奕迅-十年.mp3',poster: '陈奕迅.jpg' },
    {id: 4, title:'一直很安静',singer: '阿桑',music:'阿桑-一直很安静.mp3',poster: '阿桑.jpg' },
    {id: 5, title:'蓝',singer: '石白其',music:'石白其-蓝.mp3',poster: '石白其.jpg' },
    {id: 6, title:'用心良苦',singer: '张宇',music:'张宇-用心良苦.mp3',poster: '张宇.jpg' }]


//展示首页
module.exports.showIndex = function (req,res) {
    res.render('index',{ title:'首页' ,musicList:storage })
}

//展示添加音乐页面
module.exports.showAdd = function(req,res) {
    res.render('add',{ title :'添加音乐' })
}
 //添加音乐
module.exports.addMusic = function(req,res) {
    
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) =>{
        if(err) return res.end('404.');
        var newId = 0;
        storage.forEach(item =>{
            if (item.id  > newId) {
                newId = item.id
            }
        });

        newId++;

        var info = {
            id:newId,
            title:fields.title,
            singer:fields.singer,
            music:files.music.name,
            poster:files.poster.name
        }

        storage.push(info);
        res.writeHeader(302,{'Location':'/'});
        res.end();

    })
}

//删除音乐
module.exports.removeMusic = function(req,res) {
    var id = req.query.id
    //使用数组的some循环，根据指定条件查找对应一项，如果找到了直接，rerun true 借宿循环
    storage.some((item,i)=>{
        //item.id等于传递过来的id 证明找到了对应数据
        if (item.id == id) {
            //删除对应的歌曲信息
            storage.splice(i,1);
            //找到，终止当前循环
            return true;
        }
    });

    res.writeHeader(302,{'Location':'/'});
    res.end();

}

//展示修改页面
module.exports.showEdit = function(req,res) {
    //拿到当前要编辑的音乐id
    var id = req.query.id;
    //创建保存将要编辑的音乐信息的对象
    var musicInfo = {};
    storage.some(item =>{
        if (item.id == id) {
            musicInfo = item;
            return true;
        }
    });
    res.render('edit',{title:'修改音乐信息',music:musicInfo})
}

//修改歌曲信息
module.exports.doEdit = function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        if (err) return res.end(err);
        //拿到当前要编辑的音乐id
        var id = req.query.id;
        storage.some((item,i) =>{
            if (item.id ==id) {
                item.title = fields.title;
                item.singer = fields.singer; 
                return true;
            }
        });
        
        res.writeHeader(302,{'Location':'/'});
        res.end();

    });
}