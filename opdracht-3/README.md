# Opdracht 3
## Part 1
**Arduino besturen met Node**

Nu alle vorige opdrachten zijn gedaan, kunnen we eens gaan kijken naar hoe we een Arduino kunnen besturen met JavaScript.

**Arduino**
1. Bouw het volgende schema op je breadboard en Arduino

![opdracht-3](./opdracht-3.svg)

2. Steek de Arduino in je laptop
3. Open de Arduino IDE
4. Selecteer de correcte port en board

![port-board-selection](../images/port-board-selection.jpeg)

5. In de Arduino IDE ga naar File > Examples > Firmata > Standardfirmata

![example-selection](../images/example-selection.jpeg)

6. Upload het programma naar je board

![upload-program](../images/upload-program.jpeg)

**Node app (deel 1)**
1. Open de terminal
2. Zorg dat je in de folder van opdracht-3 zit met `cd opdracht-3`
3. Run het command `npm install`
4. Run het command `node part1.js`

Nu het programma start is het de bedoeling dat het ledje dat is ingestoken op poort 13 van de Arduino gaat branden. Zo niet probeer de stappen nogmaals uit te voeren en kijk of dit de situatie verbeterd.

**Node app (deel 2)**

Nu je het status ledje werkend hebt, kunnen we er ook voor zorgen dat het status lampje gaat knipperen met een bepaalde interval.

1. Importeer nu ook Led van `johnny-five` (dit kan naast `Board`)
2. In de methode `on` van `board` kun je een extra actie uitvoeren. Echter dien je eerst het ledje te definieren. In de `on` methode, definieer het ledje met `let led = new Led(13);`, waarbij 13 de pinnummer is van de Arduino.
3. Voeg een extra regel toe waar je het ledje aanstuurd door `led.blink()|pulse()|strobe()` te gebruiken, tussen de `()` kun je een `number` meegeven. Hiermee kun je aangeven hoe lang het ledje moet doen over het gekozen effect in **ms**.

Indien het niet lukt, kun je altijd kijken in de **solution** folder voor de oplossing van **part 1**.

## Part 2

Om het volgende onderdeel uit te voeren is het volgende nodig.

1. Stop het huidige node programma met Ctrl-C
2. Run het command `node part2.js`

Als het programma gestart is, is het de bedoeling dat het ledje die is ingestoken op poort 13 van de Arduino continue blijft branden. Zo niet probeer de stappen nogmaals uit en kijk of dit de situatie verbeterd.

Op dit moment kan er met het ledje op poort 5 gespeeld worden. Zo kunnen de volgende commando's uitgevoerd worden.

```js
led.toggle()
led.off()
led.on()
led.blink(delay in ms)
led.pulse(delay in ms)
```

Met `blink` en `pulse` kan er aangegeven worden hoe lang het effect moet duren. Zo kan er tussen de `()` een waarde meegestuurd worden wat de delay is van het effect. Denk bijvoorbeeld aan 1000 voor een seconde of meer. Als er geen waarde meegestuurd wordt, gaat de snelheid naar zijn default en dat bedraagd 100ms. Als je het effect van `blink` of `pulse` wilt stoppen dien je `led.stop()` te sturen als command. Zo niet is het niet mogelijk om `toggle`, `on` of `off` te gebruiken.