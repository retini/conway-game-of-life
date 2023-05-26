// Positions of neighboring cells in the grid.
const NEIGHBORS_POSITIONS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
];

const MINIMUM_ALIVE_NEIGHBORS = 2;
const MAXIMUM_ALIVE_NEIGHBORS = 3;
const RESURRECTION_NEIGHBORS = 3;

type ConwayPopulation = number[][];

type ConwaySize = {
	rows: number;
	columns: number;
};

// Compute the next generation of a Conway's Game of Life population.
const computeNextGeneration = (population: ConwayPopulation, size: ConwaySize): ConwayPopulation => {
	const nextPopulation = population.map((row) => [...row]); // Create a copy of the population.
	for (let [i, row] of population.entries()) {
		for (const [j, cell] of row.entries()) {
			let aliveNeighborsCount = 0;
			// Count the number of alive neighbors of a cell.
			for (const [rowOffset, columnOffset] of NEIGHBORS_POSITIONS) {
				const neighborRow = i + rowOffset;
				const neighborColumn = j + columnOffset;
				const isOutOfBound =
					neighborRow < 0 || neighborRow >= size.rows || neighborColumn < 0 || neighborColumn >= size.columns;
				if (isOutOfBound) continue;
				const neighbor = population[neighborRow][neighborColumn];
				if (neighbor === 1) aliveNeighborsCount++;
			}
			const isAlive = cell === 1;
			// Check whether the cell should live or die.
			if (
				isAlive &&
				(aliveNeighborsCount < MINIMUM_ALIVE_NEIGHBORS || aliveNeighborsCount > MAXIMUM_ALIVE_NEIGHBORS)
			) {
				nextPopulation[i][j] = 0;
				continue;
			}
			if (!isAlive && aliveNeighborsCount === RESURRECTION_NEIGHBORS) {
				nextPopulation[i][j] = 1;
			}
		}
	}
	return nextPopulation;
};

export { computeNextGeneration };
export type { ConwayPopulation, ConwaySize };
