// server lib
const express = require('express');
// DB lib
const mongoose = require('mongoose');
// convert requests body
const bodyParser = require('body-parser');
// logging lib
const morgan = require('morgan');
// auto API docs lib
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// env vars lib
require('dotenv/config');
// routes
const lottoRoute = require('./routes/lotto');

const port = process.env.PORT || 1337;

// INIT SERVER
const app = express();

// DEFINE SWAGGER OPTIONS
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Pais API',
            description: 'API for the israeli lottery results' /* + '<br> <img src="../lottoRes.png" width=500 hight=500>'*/,
            contact: {
                name: 'Elchanan Shuky Shukrun',
                email: 'elnn.sh@gmail.com'
            },
            servers: ['http://localhost:1337']
        }
    },
    apis: ['app.js', './routes/*.js']
}

// INIT SWAGGER DOCS
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ALLOW REQUESTS FROM EXTERNALS IPs
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Authorization');
    // ALLOW ONLY GET REQUESTS
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});


// HANDLE ROUTES
// HANDLE BASIC REQUESTS
app.get('/', (req, res) => {
    const apiDocs = 'https://paisapi.azurewebsites.net/api-docs/';
    res.status(200).send("Welcome to paisAPI!\nDocumentation available at " + apiDocs);
});

app.get('/lottoRes.png', (req,res) => {
    console.log("picture");
    res.sendFile('lottoRes.png', { root: __dirname });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/lotto', lottoRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status,
            message: error.message
        }
    });
});


// CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    ()=> console.log("connected to db!")
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// START THE SERVER
app.listen(port);