# Cointab Frontend

This repository consist of the frontend part of Cointab, created in collaboration with [Parag Vishwakarma](https://github.com/paragvish03)\
Please feel free to visit the backend part at [Cointab](https://github.com/paragvish03/cointab).

You may need to resolve CORS issues before running the backend with frontend and might want to change the port, as I've used 8008 for backend api consumption.

### CORS
(for backend)
1. 'npm i cors'
2. const cors = require('cors')
3. const WHITELISTED_ORIGINS = ['http://localhost:3000']
4. app.use(cors((req, cb) => {\
    let corsOptions = { origin: false, credentials: false };\
    if (WHITELISTED_ORIGINS.indexOf(req.headers.origin) !== -1) {\
        corsOptions.origin = true;\
        corsOptions.credentials = true;\
    }\
    cb(null, corsOptions);\
    }));

Please find the link of [reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to read more about CORS.