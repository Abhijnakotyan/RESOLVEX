// src/components/Button.js
import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ label, onClick }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      sx={{
        mt: 0.4,
        p:2,
        backgroundColor: "#57cc99",
        color: "#fff",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "16px",
        '&:hover': {
          backgroundColor: "#4cbf87"
        }
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
