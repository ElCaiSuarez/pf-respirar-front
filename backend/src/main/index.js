const Routes = require('./routes');
const Express = require('express');
const bodyParser = require('body-parser');
const app = Express();
const cors = require("cors");
var Application = require('./models/application');
var Station = require('./models/station');

const listeningPort = 3000

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Health check!')
})

app.use('/station', Routes.stationRouter);
app.use('/user', Routes.userRouter);
app.use('/application', Routes.applicationRouter);

Application.Applications = Application.getAll();
Station.Stations = Station.getAll();

app.listen(listeningPort, () => {
  console.log("El servidor está inicializado en el puerto " + listeningPort);
});
