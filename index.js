const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

app.listen(port, () => {
  console.log('Working in port ' + port);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
