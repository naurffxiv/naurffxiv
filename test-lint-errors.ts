// Test file with intentional linting errors
const x = 1; // missing semicolon, bad spacing
const y = 2; // inconsistent spacing

function badFunction() {
  // bad spacing
  console.log(x, y); // missing semicolon
}

export default badFunction;
