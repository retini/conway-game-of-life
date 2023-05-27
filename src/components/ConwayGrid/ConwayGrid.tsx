import './ConwayGrid.css';
import Cell from '../Cell/Cell';
import { ConwayPopulation, ConwaySize } from '../../lib/conway';
import { ExtendedCSSProperties } from '../../types/styles.types';

const CELL_SIZE = 50;

type ConwayGridProps = {
	population: ConwayPopulation;
	gridSize: ConwaySize;
};

const ConwayGrid = ({ population, gridSize }: ConwayGridProps) => {
	const cells = [];
	for (const [i, row] of population.entries()) {
		for (const [j, cell] of row.entries()) {
			const id = `${i}-${j}`;
			cells.push(<Cell key={id} isAlive={cell === 1} />);
		}
	}

	const styles: ExtendedCSSProperties = {
		'--grid-columns-count': gridSize.columns,
		'--grid-cell-size': `${CELL_SIZE}px`,
	};

	return (
		<div className='conwayGrid' style={styles}>
			{cells}
		</div>
	);
};

export default ConwayGrid;
