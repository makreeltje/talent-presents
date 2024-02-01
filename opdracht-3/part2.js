import { Board, Led } from "johnny-five";
let board = new Board();
let status_led;
let led;

board.on("ready", () => {
    status_led = new Led(13);
    led = new Led(5);
    status_led.on();
    led.off();
    board.repl.inject({
        led
      });
});