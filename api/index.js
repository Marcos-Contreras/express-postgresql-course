const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

app.listen(port, () => {
  console.log('Working in port ' + port);
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
