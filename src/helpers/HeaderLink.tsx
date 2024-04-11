import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export function HeaderLink({ children, to }: { children: React.ReactNode, to: string }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant='button'
      underline="hover"
      sx={{
        fontSize: '1rem',
        color: '#9e9e9e',
        margin: '20px', 
        '@media (min-width: 768px)': { 
          fontSize: '1.2rem',
          margin: '40px', 
        },
      }}
    >
      {children}
    </Link>
  );
};

