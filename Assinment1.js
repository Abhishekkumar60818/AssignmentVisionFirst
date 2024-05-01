class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.sort();
    }

    dequeue() {
        return this.elements.shift().element;
    }

    sort() {
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const current = pq.dequeue();

        if (current === end) {
            const path = [];
            let node = end;
            while (node) {
                path.unshift(node);
                node = previous[node];
            }
            return path;
        }

        for (const neighbor in graph[current]) {
            const distance = distances[current] + graph[current][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = current;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    return null;
}

function findShortestRoute(nodes, edges, start, end) {
    const graph = {};
    for (const node of nodes) {
        graph[node] = {};
    }
    for (const edge of edges) {
        graph[edge.from][edge.to] = edge.weight;
        graph[edge.to][edge.from] = edge.weight;
    }

    return dijkstra(graph, start, end);
}

// Example input
const nodes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const edges = [
    { from: "A", to: "B", weight: 1 },
    { from: "B", to: "C", weight: 3 },
    { from: "B", to: "E", weight: 3.5 },
    { from: "C", to: "E", weight: 4 },
    { from: "C", to: "D", weight: 2.5 },
    { from: "D", to: "G", weight: 2.5 },
    { from: "G", to: "F", weight: 3.5 },
    { from: "E", to: "F", weight: 2 },
    { from: "F", to: "H", weight: 2.5 },
    { from: "H", to: "I", weight: 1 }
];

const startNode = "C";
const endNode = "F";

// Find the shortest route
const shortestRoute = findShortestRoute(nodes, edges, startNode, endNode);
console.log(shortestRoute);
