## Vi ska:

1. Skriva en funktion att testa
2. Skriva test för funktionen
3. Köra testet med Jest

## I terminalen (Bash):

1.
``` npm init -y  ```
//Skapar package.json

2.
``` npm install --save-dev jest //Installerar Jest som utvecklingsberoende ```
 //--save-dev betyder att Jest bara behövs i utvecklingsmiljö (inte i produktion). 

## I package.json:

Lägg till:

```
´{
"type": "module",
"scripts": {
"test": "jest"
}
}´
 ```

"type": "module" gör att Node.js känner igen ES-moduler (import/export).

## ES6-moduler

Jest har inte fullständigt stöd för ES-moduler utan extra konfiguration. För enklare projekt räcker det ofta med att:

1. Sätta "type": "module" i package.json — för att Node ska känna igen ES-moduler.

2. Skapa en jest.config.js i projektets rot med:
 ```
export default {
testEnvironment: "node", // Byt till "jsdom" för React-tester
};
 ```

3. Använda senaste Jest-versionen som har förbättrat stöd för ESM.

Dock kan vi behöva använda babel (se nästa steg)

### Skapa babel.config.cjs i projektets rot:

 ```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-jest
 ```

 ```
module.exports = {
presets: [
['@babel/preset-env', { targets: { node: 'current' } }], // för Node.js (Jest kör i Node)
'@babel/preset-react', // för JSX (React)
],
};
 ```

eller

 ```
module.exports = {
presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
 ```

## 📄 sum.js

Skapa en fil med funktionen vi ska testa:
 ```
export function sum(a, b) {
return a + b;
}
 ```
## 📄 sum.test.js

Skapa en testfil med detta innehåll:

 ```
import { sum } from './sum.js';

test('adds 2 + 3 to equal 5', () => {
expect(sum(2, 3)).toBe(5);
});
 ```

## Syntax

 ```
expect(value).toBe(expected); // Jämför med === (primitiva värden)
expect(value).toEqual(expected); // Jämför objekt och arrayer (djupjämförelse)
expect(value).toBeTruthy(); // Värdet är "sant"
expect(value).toBeFalsy(); // Värdet är "falskt"
expect(value).toBeNull(); // Värdet är null
expect(value).toBeDefined(); // Värdet är inte undefined
expect(value).toBeUndefined(); // Värdet är undefined
expect(value).toContain(item); // Array eller sträng innehåller item
expect(value).toHaveLength(number); // Array eller sträng har length == number
expect(() => fn()).toThrow(); // Funktion kastar ett fel
 ```

### Testa asynkron kod (t ex med fetch):

 ```
test('fetch returns data', async () => {
const data = await fetchData();
expect(data).toBeDefined();
});
 ```

## 🧪 Kör testet

 ```npm test ```

✅ Förväntat resultat
Du bör se något liknande:

´PASS ./sum.test.js //PASS – Testfilen sum.test.js kördes och alla tester i den klarade sig utan fel.
✓ adds 2 + 3 to equal 5 (X ms) //Det här är namnet på ett specifikt test (från test('adds 2 + 3 to equal 5', () => { ... })). Bocken visar att det lyckades. Så lång tid det tog att köra det testet. Exakt tid varierar (ersatt med X här).

Test Suites: 1 passed, 1 total //Vi har 1 testfil (sum.test.js) och den passerade (inga fel i testfilen).
Tests: 1 passed, 1 total´ //→ Vi har 1 test totalt och det gick igenom.

## Skillnad på Babel och Jest-konfiguration:

babel.config.cjs — konfigurerar Babel, som transpilerar modern JS (ES6+, JSX osv) till kod som kan köras i Node eller webbläsare. Används om du har syntax som Node inte förstår direkt.

jest.config.js — konfigurerar Jest, t.ex. testmiljö och andra inställningar för testkörningen.

Du kan behöva båda om du har avancerad syntax (React, TS, nyare JS-funktioner). Men för enklare ES6-importer räcker det oftast med att sätta "type": "module" och skapa jest.config.js med ESM-export.

