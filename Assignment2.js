const crypto = require('crypto');

function generateNodes(email) {
    // Generate a random seed from the email ID
    const seed = parseInt(crypto.createHash('md5').update(email).digest('hex').substring(0, 8), 16) % 100000000;

    // Use the random seed to determine the number of nodes
    Math.seedrandom(seed);
    const numNodes = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    // Generate unique node names (two characters uppercase alphabets)
    const nodes = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < numNodes; i++) {
        const node = alphabet[Math.floor(Math.random() * 26)] + alphabet[Math.floor(Math.random() * 26)];
        nodes.push(node);
    }

    return nodes;
}

function generateEdges(nodes) {
    // Generate edges based on the nodes
    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < 0.5) { // Adjust probability of edge creation as needed
                const cost = Math.round(Math.random() * (5 - 1) + 1, 1); // Random cost/distance
                edges.push({"from": nodes[i], "to": nodes[j], "cost": cost});
            }
            if (Math.random() < 0.5) { // Create bidirectional edges with probability
                const cost = Math.round(Math.random() * (5 - 1) + 1, 1); // Random cost/distance
                edges.push({"from": nodes[j], "to": nodes[i], "cost": cost});
            }
        }
    }

    return edges;
}

function generateData(email) {
    const nodes = generateNodes(email);
    const edges = generateEdges(nodes);
    return {"Nodes": nodes, "Edges": edges};
}

// Example input
const email = "abc@email.com";

// Generate data for the email
const data = generateData(email);

// Print the generated data
console.log(JSON.stringify(data, null, 4));
