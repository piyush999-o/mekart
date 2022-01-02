const http = require('http')
const app = require('./app')

const port = process.env.PORT || 8000;

const server = http.createServer(app, (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    };

    res.writeHead(200, headers);
});

server.listen(port, () => {
    console.log("Server is Running")
})