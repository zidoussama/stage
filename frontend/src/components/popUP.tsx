// components/Popup.tsx
import React from 'react';

type PopupProps = {
  message: string;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      backgroundColor: '#4BB543',
      color: '#fff',
      padding: '16px 24px',
      borderRadius: '8px',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    }}>
      {message}
      <button onClick={onClose} style={{
        marginLeft: 12,
        background: 'none',
        border: 'none',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>X</button>
    </div>
  );
};

export default Popup;
