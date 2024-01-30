# Opdracht 4c

**Opdracht 4c**

Als je opdracht b nog niet werkend hebt is dit een mogelijke oplossing:

```ts
export async function ledBlink(port: number, interval: number) {
  return fetch("http://localhost:" + port + "/api/led-blink", {
    method: "POST",
    body: JSON.stringify({ interval: interval }),
  });
}

export async function ledPulse(port: number, interval: number) {
  return fetch("http://localhost:" + port + "/api/led-pulse", {
    method: "POST",
    body: JSON.stringify({ interval: interval }),
  });
}
```
