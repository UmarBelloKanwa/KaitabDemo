import React from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';
import { SxProps, Theme } from '@mui/material/styles';

interface ErrAlertProps extends AlertProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const ErrAlert: React.FC<ErrAlertProps> = ({ children, sx, ...props }) => {
    return (
        <Alert
            severity="error"
            sx={{
                width: '100%',
                textAlign: 'left',
                fontWeight: 500,
                fontSize: '1rem',
                borderRadius: 2,
                boxShadow: 2,
                my: 2,
                ...sx,
            }}
            {...props}
        >
            {children}
        </Alert>
    );
};

export default ErrAlert;