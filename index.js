let express = require('express');
let app = express();

//serve static files
app.use(express.static('public'));

//listen for requests
app.listen(process.env.port || 3000, () => {});
