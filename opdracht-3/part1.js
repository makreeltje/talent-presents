import { Board } from "johnny-five";
let board = new Board();

board.on("ready", () => {
  console.log("Program is ready!");
});
