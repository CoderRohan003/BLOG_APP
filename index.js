const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const path = require("path")
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogger').then((e) => console.log("MongoDB Connected"));

const UserRoute = require("./routes/user");
const BlogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

app.set('view engine' , 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req,res) => {
    res.render("home",{
        user: req.user,   // Passing user obj to home page 
    });
});

app.use("/user" , UserRoute);
app.use("/blog" , BlogRoute);


app.listen(PORT , () => console.log(`Server started at PORT : ${PORT}`));

