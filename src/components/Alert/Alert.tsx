import './Alert.css';

type AlertProps = {
	message: string;
};

const Alert = ({ message }: AlertProps) => {
	return <div className='alert'>{message}</div>;
};

export default Alert;
