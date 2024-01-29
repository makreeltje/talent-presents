let five = require("johnny-five");
let board = new five.Board();
let status_led;
let led;

board.on("ready", () => {
    status_led = new five.Led(13);
    led = new five.Led(5);
    status_led.on();
    led.off();
    board.repl.inject({
        led
      });
});