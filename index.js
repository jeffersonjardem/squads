import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/index';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(9000, (err) => {
  if (err) {
    console.log(`SERVER ERROR:`, err);
  }
  console.log(`listen on port ${9000}`);
});
