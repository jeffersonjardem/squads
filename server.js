import app from './index';

app.listen(9000, (err) => {
  if (err) {
    console.log(`SERVER ERROR:`, err);
  }
  console.log(`listen on port ${9000}`);
});
