import { Board, Led } from "johnny-five";
let board = new Board();

board.on("ready", () => {
    let led = new Led(13);
    led.blink(1000);
});