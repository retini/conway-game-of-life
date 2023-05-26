import './Cell.css';

type CellProps = {
	isAlive: boolean;
};

const Cell = ({ isAlive }: CellProps) => {
	return <div className={`cell${isAlive ? ' alive' : ''}`}></div>;
};

export default Cell;
