const express = require('express');
const app = express();
const morgan = require('morgan');

const PORT = 3000;

//morgan
app.use(morgan('dev'));

//cors
const cors = require('cors');

//public middleware
app.use(cors())
//json
app.use(express.json());


//router
app.use('/api/member', require('./router/member'));
app.use('/api/activity', require('./router/activity'));


app.listen(PORT, () => {
    console.log('server is running...in 3000 port')
})





