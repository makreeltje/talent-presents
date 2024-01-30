# Opdracht 4b

**Opdracht 4b**

Nu is het ook mogelijk om een led te laten knipperen of pulseren. Probeer in de functies ledPulse en ledBlink nu een interval mee te geven zodat de led gaat knipperen.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**Oplossing 4a**

Als je opdracht a nog niet werkend hebt is dit een mogelijke oplossing:

```ts
export async function ledOn(port: number) {
  return fetch("http://localhost:" + port + "/api/led-on", {
    method: "POST",
  });
}

export async function ledOff(port: number) {
  return fetch("http://localhost:" + port + "/api/led-off", {
    method: "POST",
  });
}
```
