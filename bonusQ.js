const fs = require('fs');

// Read data from the JSON file
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// Print the contents of the data.json file
console.log(data);
