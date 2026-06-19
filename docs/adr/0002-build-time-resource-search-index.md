# Build the resource search index at build time

Resurssök i V1 använder ett statiskt index som genereras under bygget från repo-innehåll och skickas med den statiska sajten. Vi valde detta i stället för server-side sök eller extern söktjänst för att hålla driften enkel, minimera JavaScript och samtidigt ge riktig fritextsök över resurskatalogen.
