var Gpio = require("onoff").Gpio;

let leds = [
	new Gpio(17, "out"),
	new Gpio(27, "out"),
	new Gpio(22, "out"),
	new Gpio(10, "out")
];

let button = new Gpio(4, 'in', 'rising');

let direction = 'right';
let indexCount = 0;

button.watch((err, value) => {
	if(err) {
		console.error("An error has occured", err);
		return;
	}

	// On button press
	console.log("Button pressed: ", value);

	if(direction === "right") {
		direction = "left";
	} else {
		direction = "right";
	}
});

// var blinkInterval = setInterval(blinkLED, 250);

// function blinkLED() {
// 	if (LED.readSync() === 0) {
// 		LED.writeSync(1);
// 	} else {
// 		LED.writeSync(0);
// 	}
// }

var ledLoop = setInterval(function() {
	// Clear all leds
	leds.forEach(led => {
		led.writeSync(0);
	});

	leds[indexCount].writeSync(1);

	if(direction === "right") {
		indexCount++;
		if(indexCount >= leds.length) {
			indexCount = 0;
		}
	} else {
		indexCount--;
		if(indexCount < 0) {
			indexCount = leds.length - 1;
		}
	}
}, 100);


// Handle CTRL + C
process.on("SIGINT", function () {
	clearInterval(ledLoop);
	// Clean up leds
	leds.forEach((led) => {
		led.writeSync(0);
		led.unexport();
	});

	pushButton.unexport();
});