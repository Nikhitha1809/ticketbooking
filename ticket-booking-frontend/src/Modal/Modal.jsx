// Modal.jsx
import './Modal.css';
import { Navigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children} 
        {/* <button onClick={onClose} className="close-button">Continue Booking</button> */}
      </div>
    </div>
  );
};

export default Modal;
