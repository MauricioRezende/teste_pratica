// var Db  = require('./dboperations');
const dboperations = require('./operations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/technical').get((request,response)=>{
    dboperations.getTechnical().then(result => {
       response.json(result[0]);
    })
})

router.route('/technician/:id').get((request,response)=>{
    dboperations.getTechnician(request.params.id).then(result => {
       response.json(result[0]);
    })
})

router.route('/technician/:id').delete((request,response)=>{
   dboperations.delTechnician(request.params.id).then(result => {
      response.json({"message" : "deleted"});
   })
})

router.route('/technician').post((request,response)=>{
    let technician = {...request.body}
    dboperations.addTechnician(technician).then(result => {
       response.status(201).json(result);
    })
})

router.route('/technician/:id').put((request,response)=>{
   let technician = {...request.body, id: request.params.id}
   dboperations.putTechnician(technician).then(result => {
      response.status(200).json(result);
   })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



