require('dotenv').config()
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port http://localhost:${port}`)
})
