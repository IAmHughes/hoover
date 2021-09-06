# Roomba Navigator
A command-line app (written in JavaScript) that takes inputs from a text file, `input.txt`, and outputs the final position of the Roomba and how many patches of dirt were cleaned up.

## Usage
### Pre-requisites
Create an `input.txt` file with a format following the example `input.txt` in this repository whereby:
- The first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
- The second line holds the Roomba's position
- Subsequent lines contain the zero or more positions of patches of dirt (one per line)
- The final line then always contains the driving instructions (at least one)

### Run the program
- Install the node modules
  - `npm install`
- Run the script:
  - `node roomba.js`
- You can log the output of the terminal to a file:
  - `node roomba.js | tee <output_file>`

### Output
The output is logged to the console in the following input:
- The first line displays the `X` and `Y` coordinates marking the final position of the Roomba
- The second line displays the number of patches of dirt were cleaned up

## License
The scripts and documentation in this project are released under the [GNU License](LICENSE)
