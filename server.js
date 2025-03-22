require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const session=require("express-session")
const MongoStore=require("connect-mongo")
const methodOverride=require("method-override")
const app = express();

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine','ejs');

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Session Management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    cookie: {maxAge: 1000 * 60 * 60} //1 hour
}));

//Routes
app.use('/',require('./routes/adminRoutes'));
app.use('/users',require('./routes/userRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
