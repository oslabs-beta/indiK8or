import Box from '@mui/material/Box';
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import '../css/Scan.css';

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

  const getSeverityClassName = (severity: string): string => {
    if (severity === 'Negligible') { return 'severity-negligible';}
    else if (severity === 'Low') { return 'severity-low';}
    else if (severity === 'Medium') { return 'severity-medium';}
    else if (severity === 'High') { return 'severity-high';}
    else if (severity === 'Critical') { return 'severity-critical';}
    else { return 'severity-unknown';}
  }

  return (
    <Box className="modal">
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Vulnerabilities
      </Typography>
       <TableContainer id="modal-modal-description">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='modal-table-row-head'>ID</TableCell>
            <TableCell className='modal-table-row-head'>Description</TableCell>
            <TableCell className='modal-table-row-head'>Severity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vulnerabilities.map((vulnerability: Vulnerabilities, index: number) => (
            <TableRow key={index}>
              <TableCell id='v-id'>{vulnerability.id}</TableCell>
              <TableCell id='v-desc'>{vulnerability.description}</TableCell>
              <TableCell id='v-sev' className={getSeverityClassName(vulnerability.severity)}>
                {vulnerability.severity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
});

export default Scan;
