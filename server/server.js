const app = require('./app');
const appConfig = require('./config');

app.listen(appConfig.port, () => console.log(`[Server] running on port ${appConfig.port}`));
