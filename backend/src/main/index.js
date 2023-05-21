const Routes = require('./routes');
const Express = require('express');
const bodyParser = require('body-parser');
const app = Express();
//const cors = require("cors");

const listeningPort = 3000

app.use(bodyParser.json());
//app.use(cors);

app.get('/', (req, res) => {
  res.send('Health check!')
})

app.use('/station', Routes.stationRouter);

app.listen(listeningPort, () => {
  console.log("El servidor está inicializado en el puerto " + listeningPort);
});
