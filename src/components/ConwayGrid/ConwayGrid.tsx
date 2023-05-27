import './ConwayGrid.css';
import Cell from '../Cell/Cell';
import { ConwayData } from '../../lib/conway';
import { ExtendedCSSProperties } from '../../types/styles.types';

const CELL_SIZE = 50;

type ConwayGridProps = {
	conwayData: ConwayData;
};

const ConwayGrid = ({ conwayData }: ConwayGridProps) => {
	const { population, size, generationNumber } = conwayData;

	const cells = [];
	for (const [i, row] of population.entries()) {
		for (const [j, cell] of row.entries()) {
			const id = `${i}-${j}`;
			cells.push(<Cell key={id} isAlive={cell === '*'} />);
		}
	}

	const styles: ExtendedCSSProperties = {
		'--grid-columns-count': size.columns,
		'--grid-cell-size': `${CELL_SIZE}px`,
	};

	return (
		<div className='conwayGrid' style={styles}>
			{cells}
		</div>
	);
};

export default ConwayGrid;
