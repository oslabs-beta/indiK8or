import { forwardRef } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import '../css/Scan.css';
import {  JSONresult, VulnerabilityProps } from '../../types';

// deconstruct scannedImages from props, scannedImages is either type JSONresult or string
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Scan = forwardRef(({ scannedImages }: { scannedImages?: JSONresult | string}, _ref) => {
  /* 
  if vulnerabilities is a string, assign its value to an empty array, otherwise if scannedImages exists and has a property matches, iterate over the matches property and return an array of each property that matches vulnerability. Otherwise if scannedImages is null or undefined or the matches property does not exist, return an empty array
  */
  const vulnerabilities = (typeof scannedImages === 'string' ? [] : scannedImages?.matches?.map((el) => el.vulnerability)) || [];
  
  const getSeverityClassName = (severity: string): string => {
    // set class name based off of input severity, so we can assign diffierent colors in our css file
    if (severity === 'Negligible') { return 'severity-negligible';}
    else if (severity === 'Low') { return 'severity-low';}
    else if (severity === 'Medium') { return 'severity-medium';}
    else if (severity === 'High') { return 'severity-high';}
    else if (severity === 'Critical') { return 'severity-critical';}
    else { return 'severity-unknown';}
  }

  return (
    <Box className="modal">
       <TableContainer id="modal-modal-description">
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <TableRow>
        <TableCell className='vulnerability' sx={{ fontWeight: 'bold' }}>Vulnerability</TableCell>
        <TableCell className='vulnerability'></TableCell>
        <TableCell className='vulnerability'></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='modal-table-row-head' sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell className='modal-table-row-head' sx={{ fontWeight: 'bold' }}>Description</TableCell>
            <TableCell className='modal-table-row-head' sx={{ fontWeight: 'bold' }}>Severity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vulnerabilities.length === 0  ? (
            <TableRow>
              <TableCell colSpan={3} id='no-vul-found'>
                No Vulnerabilities Found
              </TableCell>
            </TableRow>
          ) : (
          vulnerabilities.map((vulnerability: VulnerabilityProps, index: number) => (
            <TableRow key={index}>
              <TableCell id='v-id'><a href={vulnerability.dataSource} target='_blank'>{vulnerability.id}</a></TableCell>
              <TableCell id='v-desc'>{vulnerability.description}</TableCell>
              <TableCell id='v-sev' className={getSeverityClassName(vulnerability.severity)}>
                {vulnerability.severity}
              </TableCell>
            </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
});

export default Scan;