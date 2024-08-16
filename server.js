const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');

//Important for future for displaying dynamic content -- hbs is a view engine
/*app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'view')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/view'));
*/
mongoose.connect('mongodb+srv://rahulkumarsingh9389:MWDbtAVmWqvApjo1@cluster0.or6qwjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    dbName: 'DS_International'
}).then(() => { console.log('Database connected'); }).catch((err) => { console.log(err); });

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const userModel = mongoose.model('user Model', userSchema);

async function createUser() {
    let data = await userModel.create(user);
    console.log(data);
}

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
const userRouter = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, '/views/responsive.html'));
});

/*userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
*/
app.post('/signup', signup);
app.post('/login', login);

var user = {};

function signup(req, res) {
    console.log(req.url);
    user = req.body;
    console.log(user);
    createUser();
    res.send("User successfully signedup");
}


async function login(req, res) {
    console.log(req.body);
    console.log(userModel.findOne({ email: req.body.email, password: req.body.password }));
    if (await userModel.findOne({
            email: req.body.email,
            password: req.body.password
        })) {
        res.sendFile(path.join(__dirname, "/views/responsive.html"));
    } else {
        res.send('User not reistered');
    }
}

/*app.get('/login', (req, res) => {
    res.render('layout', {
        Login: "Login",
        display_login: true,
        display_signup: false
    })
});
/*app.post('/login', (req, res) => {
    res.redirect('/')
});


app.get('/signup', (req, res) => {
    res.render('layout', {
        Login: 'Login',
        display_login: false,
        display_signup: true
    })
});
*/


app.listen(3000);
