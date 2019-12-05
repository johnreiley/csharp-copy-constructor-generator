const app = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

app()
  .use(app.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));