var express = require("express")
const req = require("express/lib/request")
const res = require("express/lib/response")
var mysql = require("mysql")
var app = express()
app.use(express.json())

const con = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database:'demoservice'
})

con.connect((err)=>{

    if (err) {
        console.log(err)
    }else{
        console.log("connected!!")
    }
})

app.post('/auth',(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    con.query('SELECT fullname, api_key from auth where username = ? AND password = ?', [username, password],(err,result)=>{
        
        if (err) {
            console.log(err)
        }
        if (result.length === 0) {
            return res.status(403).send("Sorry, user not found")
        }
      
        if (result[0].api_key === null) {  
            
            var length = 3;
            let randAPI = '';
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            const charsLength = chars.length;
            let counter = 0;
            while (counter < length) {
              randAPI += chars.charAt(Math.floor(Math.random() * charsLength));
              counter += 1;
            }
            console.log("adding a random api: " + randAPI)
            con.query('UPDATE auth SET api_key = ? WHERE username = ?', [randAPI, username], (err, result)=>{
                if (err) {
                    console.log(err)
                }else{
                    console.log("ADDED!")
                }
            })
        }
        else{
            var value = result
            var data = 
            {
            "full_name" : result[0].fullname, 
            "api_token" : result[0].api_key
            }
            var jsonObj = JSON.stringify(data,null,2)
            console.log(jsonObj)
            
        }
    })
})

app.get("/fetchbyAPI/:api_key", (req,res)=>{ // pass in a url and extract api_token from there. 

    const fetchAPI = req.params.api_key;

    con.query('SELECT api_key, fullname from auth where api_key = ?', [fetchAPI],(err,result)=>{
        
        if (err) {
            console.log(err)
        }else{
            var value = result
            var data =
            {
            "full_name" : result[0].fullname, 
            "api_token" : result[0].api_key
            }
            var jsonObj = JSON.stringify(data,null,2)
            console.log(jsonObj)
        }
    })
})

app.get('/loads', (req, res) => {

    const tokenOBJ = req.get("Authorization")
    const token = tokenOBJ.substring(tokenOBJ.indexOf('=') + 1);
                 
    con.query('SELECT id, display_identifier, sort, order_number, load_status, load_status_label, active, current FROM loads WHERE api_key = ?', [token], (err, result)=>{
        if (err) {
            console.log(err)
        }
        else{
            var value = JSON.parse(JSON.stringify(result));
            console.log(value)
        }
    })
})

app.listen(3001,(err)=>{    
    if (err) {
        console.log(err)
    }else{
        console.log("on port 3001")
    }
})

