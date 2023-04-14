require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();

const port = 5000 || process.env.port;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    //extending the session
    //cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//Connect to Database
connectDB();

//Static files
app.use(express.static("public"));

// Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/dashboard"));

// Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
