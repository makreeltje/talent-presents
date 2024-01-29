const express = require('express');
const bodyParser = require('body-parser');
const five = require('johnny-five');

const app = express();
const board = new five.Board();
let status;
let led;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/led-blink", function (req, res) {
    led.blink(req.body.interval);
    res.json({ message: 'success!'})
});

app.post("/api/led-pulse", function (req, res) {
    led.pulse(req.body.interval)
    res.json({ message: 'success!'})
});

app.post("/api/led-on", function (req, res) {
    led.stop()
    led.on()
    res.json({ message: 'success!'})
});

app.post("/api/led-off", function (req, res) {
    led.stop()
    led.off()
    res.json({ message: 'success!'})
});

function startServer() {
    app.listen("3001", () => {
        console.log("App listening on port 3001");
    });
}

board.on('ready', () => {
    status = new five.Led(13);
    led = new five.Led(5);
    status.on();
    startServer();
});