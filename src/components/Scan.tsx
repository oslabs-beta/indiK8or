import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Scan = () => {
  
  return (
    <Box className="modal">
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Vulnerabilities
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Scanned results
      </Typography>
    </Box>
  );
};

export default Scan;
