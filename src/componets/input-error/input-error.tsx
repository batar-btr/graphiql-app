import './index.scss';

interface InputErrorProps {
  message: string | undefined;
}

const InputError = ({ message }: InputErrorProps) => {
  return <p className="input-error">{message}</p>;
};

export default InputError;
