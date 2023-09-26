import React from "react";
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import loadingMP4 from '../assets/Scan.mp4';
import Scan from "./Scan";
import { Pod, PodTableProps } from "../../types";

const PodTable: React.FC<PodTableProps> = ({
  pods,
  handleOpen,
  handleClose,
  loading,
  scannedImage,
  setImageName,
  open,
}) => {
  return (
    <TableContainer component={Paper} className="pod-table">
      <Table className="pod-table-head" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>READY</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>STATUS</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>RESTARTS</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>AGE</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>IP</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>NODE</TableCell>
            <TableCell className="scan-cell" sx={{ fontWeight: "bold" }}>
              IMAGES & VULNERABILITY SCAN
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pods.map((pod: Pod, podIndex: number) => (
            <TableRow
              key={podIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {pod.NAME}
              </TableCell>
              <TableCell className="body-rows">{pod.READY}</TableCell>
              <TableCell className="body-rows">{pod.STATUS}</TableCell>
              <TableCell className="body-rows">{pod.RESTARTS}</TableCell>
              <TableCell className="body-rows">{pod.AGE}</TableCell>
              <TableCell className="body-rows">{pod.IP}</TableCell>
              <TableCell className="body-rows">{pod.NODE}</TableCell>
              <TableCell className="body-rows">
                {pod.IMAGES.map((image: string, imageIndex: number) => (
                  <div key={imageIndex} className="images">
                    {image}
                    <Button
                      className="scan-button"
                      size="small"
                      variant="contained"
                      onClick={handleOpen}
                      onClickCapture={() => setImageName(image)}
                    >
                      Scan
                    </Button>
                  </div>
                ))}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="scanModal"
                >
                  {loading ? (
                    <div id="videoContainer">
                      <video id="nowScanning" autoPlay loop>
                        <source src={loadingMP4} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <Scan scannedImages={scannedImage} />
                  )}
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PodTable;
