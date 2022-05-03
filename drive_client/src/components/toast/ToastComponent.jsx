import './Toast.scss';

function ToastComponent({ type, message }) {
  const className = `toast ${type} white`;

  return (
    <div className={className}>
      <img src={`src/icons/${type}_white.svg`} width="24" height="24" />
      <p>{message}</p>
    </div>
  );
}

export default ToastComponent;
