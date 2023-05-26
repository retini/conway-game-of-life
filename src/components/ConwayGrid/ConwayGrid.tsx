import './ConwayGrid.css';
import Cell from '../Cell/Cell';
import { ConwayPopulation, ConwaySize } from '../../lib/conway';
import { ExtendedCSSProperties } from '../../types/styles.types';

type ConwayGridProps = {
	population: ConwayPopulation;
	gridSize: ConwaySize;
	cellSize: number;
};

const ConwayGrid = ({ population, gridSize, cellSize }: ConwayGridProps) => {
	const cells = [];
	for (const [i, row] of population.entries()) {
		for (const [j, cell] of row.entries()) {
			const id = `${i}-${j}`;
			cells.push(<Cell key={id} isAlive={cell === 1} />);
		}
	}

	const styles: ExtendedCSSProperties = {
		'--grid-columns-count': gridSize.columns,
		'--grid-cell-size': `${cellSize}px`,
	};

	return (
		<div className='conwayGrid' style={styles}>
			{cells}
		</div>
	);
};

export default ConwayGrid;
