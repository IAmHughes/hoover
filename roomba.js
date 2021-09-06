const fs = require('fs');
const readline = require('readline');

// Keep track of lines in input file to map data
let lineNumber = 1;

// Initialize arrays for room, current position, driving instructions, and dirt patches
let room = [];
let currentPosition = [];
let drivingInstructions =[];
let dirtPatches = [];
let dirtCleaned = 0;

// Read input file
const fileStream = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false,
});

// Parse input.txt, handling first, second, and last line specifically
// - 1st line = room size
// - 2nd line = roomba's currentPosition
// - Last line = drivingInstructions
fileStream
    .on('line', (line) => {
      if (lineNumber === 1) {
        room = line.split(' ').map( Number );
      } else if (lineNumber === 2) {
        currentPosition = line.split(' ').map( Number );
        // Check for instructions line
      } else if (isNaN(line.substring(0, 1))) {
        drivingInstructions = line.split('');
        // Catch-all for positions of dirt patches
      } else {
        dirtPatches.push(line.split(' ').map( Number ));
      }
      // Move to next line, incrementing counter
      lineNumber += 1;
    })
    .on('close', (line) => {
        startCleaning(room, currentPosition, drivingInstructions, dirtPatches);
    });

function startCleaning(room, currentPosition, instructions, dirtPaches) {
  for (let i = 0; i < instructions.length; i++) {
    // Move based on instructions
    switch (instructions[i]) {
        case 'N':
            // Check if against wall
            if (currentPosition[1] + 1 <= room[0]) {
                // Go North
                currentPosition[1] += 1;
            }
            break;
        case 'S':
            // Check if against wall
            if (currentPosition[1] - 1 >= 0) {
                // Go South
                currentPosition[1] -= 1;
            }
            break;
        case 'E':
            // Check if against wall
            if (currentPosition[0] + 1 <= room[1]) {
                // Go East
                currentPosition[0] += 1;
            }
            break;
        case 'W':
            // Check if against wall
            if (currentPosition[0] - 1 >= 0) {
                // Go West
                currentPosition[0] -= 1;
            }
            break;
        default:
            console.log('Instructions did not match format of \'N\', \'S\', \'E\', or \'W\'');
    }

    // Check if position has dirt under it, if so, clean it
    const positionAsString = JSON.stringify(currentPosition);
    for (let j = 0; j < dirtPaches.length; j++) {
      if (JSON.stringify(dirtPaches[j]) === positionAsString) {
        dirtPaches.splice(j, 1);
        dirtCleaned += 1;
        break;
      }
    }
  }

  // Log final position and number of dirt patches cleaned
  console.log(currentPosition[0] + ' ' + currentPosition[1]);
  console.log(dirtCleaned);
}
