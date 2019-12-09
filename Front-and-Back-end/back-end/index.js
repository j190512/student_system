let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let path = require('path')
app.use(bodyParser.urlencoded({ extended: false }))
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'stu_system',
    connectTimeout: 3000, //连接超时
    multiplStatements: true //是否允许一个query中包含多条sql语句
})
// let history = require('connect-history-api-fallback');
// app.use('/',history());
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/dist/index.html"))
// })
// app.use(express.static(path.join(__dirname,"public")));


//解决 跨域问题  Access-Control-Allow-Origin
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//登录
app.post('/login',  (req, res) =>{
    let sql = `select 1 from admin where account = ?    and pass = ?`
    conn.query(sql,[req.body.account,req.body.pass],(err,results)=>{
        if(err){
            return res.json({
                code:'101',//系统错误
            })
        }
        //查找不到则返回空数组  长度不等于1
        if(results.length != 1) return res.json({
            code: '102',//账号 或  密码 错误
        })
        res.json({
            code:'103'//成功
        })
    })
 })
 //请求数据
app.get('/getStudents',(req,res)=>{
    let sql = `select * from students`
    conn.query(sql,(err,results)=>{
        if(err){
            return res.json({
                code:'101',
            })
        }
        //没有数据
        if(results.length == 0){
            return res.json({
                code:'104'//没有找到数据
            })
        }
        res.json(results)
    })
})
 //修改 
app.post('/modify',(req,res)=>{
    const sql = `update students set id = ?,name=?,sex=?,age=?,major=?,grade=? where id = ?`
    conn.query(sql,[req.body.id,req.body.name,req.body.sex,req.body.age,req.body.major,req.body.grade,req.body.oldId],(err,results)=>{
        if(err){
            return res.json({
                code:'101'
            })
        }

        //修改成功的行数等于1
        if(results.affectedRows !== 1) return res.json({
            code:'105'//修改失败
        })
        res.json({
            code:'106', //修改成功
        })
    })
})
//新增
app.post('/add',(req,res)=>{
    let sql = `insert into students (id,name,sex,age,major,grade) values(?,?,?,?,?,?)`
    conn.query(sql,[req.body.id,req.body.name,req.body.sex,req.body.age,req.body.major,req.body.grade],(err,results)=>{
        if(err){
            res.json({
                code:'101'
            })
        }
        if(results.affectedRows && results.affectedRows != 1){
            return res.json({
                code:'107' //新增失败
            })
        }
        res.json({
            code:'108' //新增成功
        })
    })
})
//删除
app.get('/del',(req,res)=>{
    let str = req.query.id.join()
    let sql = `delete from students where id in (${str}) `
    conn.query(sql,(err,results)=>{
        if(err){
            return res.json({
                code:"101"
            })
        }
        if(results.affectedRows == 0){
            return res.json({
                code:"109"
            })
        }else{
            res.json({
                code:"110",
                affectedRows:results.affectedRows
            })
        }
        
    })
})
let server = app.listen(8081, 'localhost', ()=> {
    let host = server.address().address
    let port = server.address().port
    console.log("服务端 访问地址为 http://%s:%s", host, port)
})