const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
const mongoose = require("mongoose")
//const mongostore = require("connect-mongo")(session)
const {Post} = require("./model/Post.js")
const {Tag} = require("./model/Tag.js")
const {User} = require("./model/User.js")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/memeNumbaWan", {
    useNewUrlParser: true
});

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.set("view engine", "hbs");
app.use(express.static(__dirname+"/views"));
app.use(express.static(__dirname+"/storage/images"));
app.use(express.static(__dirname+"/css"));
app.use(express.static(__dirname+"/model"))
app.use(express.static(__dirname+"/public"))

//
// var staticResourse = '/Users/adrianmendoza/Desktop/Git/WEBAPDE-MP/storage/images';
// app.use(express.static(path.join(staticResourse, 'public2')));

// app.use(express.static(path.join(__dirname, "views")))

app.use(session({
    secret: "super secret",
    name: "super secret",
    resave: true,
    saveUnitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7*3
    }
}))



app.get("/", (req, res, next) => {
    console.log("GET /");
    
//    User.find().then((users)=>{
//        console.log(users)
//    })
    
    if(req.session.username != null){
        Post.find().then((posts)=>{
            res.render("home.hbs", {
                posts : posts
            });
        }, (err)=>{
            res.render("landing.hbs")
        })
    }
    else{
        Post.find().then((posts)=>{
            res.render("landing.hbs", {
                posts : posts
            });
        }, (err)=>{
            res.render("landing.hbs")
        })
        
    }

});

app.post("/login", urlencoder, (req, res) => {
    console.log("POST /login");
    
    var username = req.body.logusername;
    var password = req.body.logpassword;
    
    User.findOne({
        username : username,
        password : password
        
    }).then((user)=>{
        if(user != null){
            console.log(user.username + ": " + user.password);
            req.session.username = user.username;
            console.log("uname sesh: "+req.session.username);
            
            
            res.redirect("/")
        }
        else{
            res.render("landing.hbs")
            console.log("cannot login")
        }
    }, (err)=>{
        res.render("landing.hbs")
    })
    
    
});

app.get("/redirectprofile", (req, res, next) => {
    console.log("GET /redirect profile");
    
    if(req.session.username != null){
        Post.find().then((posts)=>{
            res.render("profile.hbs", {
                posts : posts
            });
        }, (err)=>{
            res.render("landing.hbs")
        })
    }
    else{
        Post.find().then((posts)=>{
            res.render("profileNA.hbs", {
                posts : posts
            });
        }, (err)=>{
            res.render("landing.hbs")
    })
        
    }
});

app.get("/redirectmeme", (req, res) => {
    console.log("GET /meme");

    if(req.session.username != null){
        Post.find().then((posts)=>{
            res.render("meme.hbs", {
                posts : posts
            });
        }, (err)=>{
            res.render("landing.hbs")
        })
    }
    else{
        Post.find().then((posts)=>{
            res.render("memeNA.hbs", {
                posts : posts
            });
        }, (err)=>{
            res.render("landing.hbs")
    })
        
    }
});

app.post("/addTag", urlencoder, (req, res) => {
    console.log("GET /addTag");
    
    var newtag = req.body.addtagname;
    console.log("NEW TAG ADDED: "+newtag)
    
    
    res.redirect("/redirectmeme")
});

app.post("/register", urlencoder, (req, res) => {
    console.log("POST /register");
    
    var username = req.body.regusername;
    var name = req.body.regname;
    var password = req.body.regpassword;
    var conpassword = req.body.regconfirmpassword;
    var description = req.body.regshortdescription;
    
    User.findOne({
        username : username
    }).then((user)=>{
        if(user == null){
            if(password == conpassword){
                var f = new User({
                    username, name, password, description
                })

                f.save().then(()=>{
                    //things were correct
                    console.log("UName:" + username + " Name:" + name + " Password:" + password + " Description:" + description)
                    res.redirect("/")
                }, (err)=>{
                    console.log("ERROR: Somethings wrong")
                    res.render("landing.hbs")
                })
                
                req.session.username = username
            }
            else{
                // not same password
                console.log("ERROR: Not same password")
                res.render("landing.hbs")
            }
        }
        else{
            console.log("ERROR: Username taken")
            res.render("landing.hbs")
            // username exists
        }
    }, (err)=>{
        res.render("landing.hbs")
    })
});

app.get("/profile", (req, res) => {
    console.log("GET /profile");
    console.log("uname sesh: "+req.session.username);

//    Post.find().then((posts)=>{
//            res.render("profile.hbs", {
//                posts : posts
//            });
//        }, (err)=>{
//            res.render("landing.hbs")
//    })
    res.redirect("/redirectprofile");
    
//    res.render("profile.hbs");
});

app.get("/profileNA", (req, res) => {
    console.log("GET /profileNA");
    
//    res.render("profileNA.hbs");
    res.redirect("/redirectprofile");
});

app.get("/landing", (req, res) => {
    console.log("GET /landing");
    res.redirect("/");
//    res.render("landing.hbs");
});

app.get("/home", (req, res) => {
    console.log("uname sesh: "+req.session.username);
    console.log("GET /home");

    res.redirect("/")
});

app.get("/uploadmeme", (req, res) => {
    console.log("get /upload");
    console.log("uname sesh: "+req.session.username);

    res.render("uploadmeme.hbs");
});

app.post("/upload", urlencoder, (req, res) => {
    console.log("post /uploadmeme");
    console.log("uname sesh: "+req.session.username);
    
    var title = req.body.memetitle;
    var likes;
    var id;
    var user = req.session.username;
    User.findOne({
        username : user
    }).then((user)=>{
        if(user != null){
            id = user._id;
            
        }
        else{
            id = 0000;
        }
    })
            
    var tags = req.body.tags; //process csv
    var likers; //default null
    var unlikers; //default null
    var time; //set to now
    var privacy = req.body.privacy; 
    var sharedTo; //default null
    
    //process to boolean
    if(privacy=="private"){
        privacy = true;
    }
    else {
        privacy = false;
    }
    
    var f = new Post({
        title, likes, id, user, tags, likers, unlikers, time, privacy, sharedTo
    })
    
    f.save().then(()=>{
        //things were correct
        console.log("title:" + title + 
                    " id:" + id + 
                    " user:" + user + 
                    " tags:" + tags +
                    " privacy:" + privacy)
        
        res.redirect("/")
    }, (err)=>{
        console.log("ERROR: Somethings wrong")
        res.render("landing.hbs")
    })
});

app.get("/logout", (req, res) => {
    console.log("GET /logout");
    
    req.session.destroy((err)=> {
        if(err){
            console.log(err)
        } else {
            console.log("Destroyed sesh")
        }
        
    })
    res.redirect("/");
//    res.render("landing.hbs");
});

app.get("/memeNA", (req, res) => {
    console.log("GET /memeNA");
    
    res.redirect("/redirectmeme");
});

app.get("/meme", (req, res) => {
    console.log("GET /meme");

    res.redirect("/redirectmeme");
});

app.get("/tag", (req, res) => {
    console.log("GET /tag");

    res.render("tag.hbs");
});

app.get("/tagNA", (req, res) => {
    console.log("GET /tagNA");

    res.render("tagNA.hbs");
});

app.post("/postDelete", urlencoder, (req, res) => {
    console.log("POST /postDelete");
    
    console.log("Body id is: " + req.body.id) 
    
    Post.deleteOne({
        _id: req.body.id
    }).then((post)=>{
        res.redirect("/redirectprofile")

    })
    
});

app.post("/postEdit", urlencoder, (req, res) => {
    console.log("POST /postEdit");
    
   
    var id = req.body.id // for finding one post
    console.log("Body id = " + id)
    var title = req.body.edittitle
    console.log("Title = " + title)
    var likes;
    var Uid;
    var user = req.session.username;
    User.findOne({
        username : user
    }).then((user)=>{
        if(user != null){
            Uid = user._id;
            
        }
        else{
            Uid = 0000;
        }
    })
    var tags = req.body.tags; //process csv
    var likers; //default null
    var unlikers; //default null
    var time; //set to now
    
    var tags = req.body.edittags
    
    var privacy = req.body.editprivacy
    if(privacy=="private"){
        privacy = true;
    }
    else {
        privacy = false;
    }
    console.log("Privacy: " + privacy)
    
    var sharedTo; //default null
    
    Post.findOne({
        _id : id
    }).then((post)=>{
        if(post != null){
            if(!req.body.edittitle){
                console.log("WALANG LAMAN TITLE!!")
                console.log("post.title="+ post.title)
                title = post.title
            }
            if(!req.body.edittags){
                console.log("WALANG LAMAN TAGS!!")
                tags = post.tags
            }
        }
        else{
            console.log("ERROR IN FINDING ONE IN POST")
        }
    })

    let newPost = {
        title, likes, id:Uid, user, tags, likers, unlikers, time, privacy, sharedTo
    }
    
    Post.findOneAndUpdate({
        _id : id,
        user : user
    }, newPost).then(()=>{
        res.redirect("/redirectprofile")
    })
    
});


app.use("*", (request, response)=> {
    response.status(404).send("These are not the sites you are looking for");
});

app.listen(3000, () => {
    console.log("listening in port 3000")
});

