import Box from '@mui/material/Box';
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface ScanProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scannedImage: any;

}
interface Vulnerabilities {
  id: string;
  description: string;
  severity: string;
}

const Scan = React.forwardRef((props: ScanProps, ref) => {
  console.log(ref);
  const { scannedImage } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vulnerabilities = scannedImage.matches.map((el: any) => el.vulnerability)
  console.log('vulnerabilities', vulnerabilities);
  return (
    <Box className="modal">
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Vulnerabilities
      </Typography>
       <TableContainer id="modal-modal-description" sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Severity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vulnerabilities.map((vulnerability: Vulnerabilities, index: number) => (
            <TableRow key={index}>
              <TableCell>{vulnerability.id}</TableCell>
              <TableCell>{vulnerability.description}</TableCell>
              <TableCell>{vulnerability.severity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
});

export default Scan;
