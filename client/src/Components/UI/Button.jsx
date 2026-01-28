// client/src/components/ui/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// variant: 'primary' (đỏ), 'music' (xanh), 'glass' (kính)
const Button = ({ children, onClick, variant = 'primary', style }) => {
  return (
    <button 
      className={`btn-ui btn-${variant}`} 
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;