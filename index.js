var express = require("express"); // call express to be used by the application.
var app = express();

app.use(express.static("style"))
app.use(express.static("views")); 
app.use(express.static("images")); 


var mysql = require('mysql');
// ******************************** Start of SQL **************************************** //
// First we need to tell the application where to find the database
const db = mysql.createConnection({
host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'E'
 });

// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.")
    } 
     else{
        console.log('Looking good the database connected')
    }
})





// set the template engine 
app.set('view engine', 'ejs'); 
var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));

// function to render the home page
app.get('/', function(req, res){
    let sql = 'SELECT * FROM music';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('home', {result})   
    });

});

app.get('/add', function(req, res){
    
        res.render('add')

});
// handles the form submission for the add page
app.post('/add', function(req,res){
    var x = req.body.track
    var y = req.body.artist
    var z = req.body.length
    var a = req.body.album
    var b = req.body.cover
    let sql = 'insert into music (track, artist, length,  cover) values (?,?,?,?);';
    let query = db.query(sql,[x, y, z, b],(err,result) => {
        if(err) throw err;
        
        res.redirect('/')  
    });
// shows the page for a specific item    
 })
 app.get('/music/:Id', function(req, res){
    let sql = 'SELECT * FROM music where Id = ?';
    let query = db.query(sql, [req.params.Id], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('theone', {result})   
    });

});
//This will edit the data
 app.post('/edit/:id', function(req,res){
    var x = req.body.track
    var y = req.body.artist
    var z = req.body.length

    var b = req.body.cover
    let sql = 'UPDATE music SET track = ?, artist = ?, length = ?, cover = ? where Id = ?'
    let query = db.query(sql,[x, y, z, b, req.params.id],(err,result) => {
        if(err) throw err;
        
        res.redirect('/')  
    });
    
 });


 app.get('/edit/:id', function(req, res){
    let sql = 'SELECT * FROM music where Id = ?';
    let query = db.query(sql,[req.params.id], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('edit', {result})   
    });

});

app.get('/make/:artist', function(req, res){
    let sql = 'SELECT * FROM music where artist = ?';
    let query = db.query(sql, [req.params.artist], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('make', {result})   
    });

});
// We need to set the requirements for teh application to run

app.listen(process.env.PORT || 3001, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!")
});


app.get('/Music/:Id', function(req, res){
    let sql = 'SELECT * FROM music where Id = ?';
    let query = db.query(sql, [req.params.Id], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('theone', {result})   
    });
})
