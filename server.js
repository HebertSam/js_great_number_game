const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: "somestring"}));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    if(!("random" in req.session)){
        req.session.random = Math.floor(Math.random()*100);
    }
    console.log(req.session.random);
    data = {
        guess: Number(req.session.guess),
        number: req.session.random
    }
    console.log(req.session.random);
    res.render("index", data);
})
app.post("/guess", (req, res) =>{
    req.session.guess = req.body.guess;

    res.redirect("/")
})
app.get("/reset", (req, res) =>{
    req.session.destroy();
    res.redirect("/")
    
})


app.listen(8000, () =>{
    console.log("listening on port 8000");
})