const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// All Router Files
const contactRoutes = require('./api/routes/contactRoutes')
const userRouter = require('./api/routes/userRoutes')


//MiddleWares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Custom Routers
app.use('/api', contactRoutes);
app.use('/api', userRouter);


//@All Error Handling

// ------------------------------

// 404 Error Handling
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)

});

//500 Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
        msg: "Server Not Found  🙄 🧐"
    });
});


// ------------------------------

//Server PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On PORT ${PORT} 😊 😊`));