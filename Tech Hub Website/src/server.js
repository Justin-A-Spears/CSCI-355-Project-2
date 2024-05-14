const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config")

const app = express()
// convert into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static("Images"));
app.use(express.static("src"));
app.use(express.static("views"));
//get each page and render 
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/index", (req, res) => {
    res.render("index");
})
app.get("/techspot", (req, res) => {
    res.render("techspot");
})
app.get("/forum", (req, res) => {
    res.render("forum");
})
app.get("/help", (req, res) => {
    res.render("help");
})
app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/registration", (req, res) => {
    res.render("registration")
})
// registration
app.post("/registration", async (req, res) => {
    const data = { 
        name: req.body.username, 
        password: req.body.password 
    }
    // check existing user 
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser) {
        res.send("User already exists");
    } else {
        // bcrypt
        const saltRounds = 10; // number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds); 
        data.password = hashedPassword; // replace hashed pw with orginal 
        // add to database
        const userdata = await collection.insertMany(data); 
        console.log(userdata);
    }
})
//login
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            res.send("Username cannot be found")
        }
        // compare hashed password 
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("index");
        } else {
            req.send("Wrong password");
        }
    } catch {
        res.send("Wrong credentials")
    }
})
// port 
const port = 3000;
app.listen(port, ()=> {
    console.log(`Port: ${port} is connected...`);
})
