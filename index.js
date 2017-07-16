let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

//connect to db
mongoose.connect('mongodb://localhost/votedb');
mongoose.Promise = global.Promise;

//serve static files
app.use(express.static('public'));

//Parse fetch requests
app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));

//error handling
app.use((err, req, res, next) => { 
	res.status(422).send({error: err.message});
})

//listen for requests
app.listen(process.env.port || 4000, () => {});
