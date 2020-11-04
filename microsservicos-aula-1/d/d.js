const http = require('http');

const host = 'localhost';
const port = 9093;

const json = JSON.stringify({
    Status: "OK",
});

const requestListen = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200);
    res.end(json)
}

const server = http.createServer(requestListen);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port }`)
});