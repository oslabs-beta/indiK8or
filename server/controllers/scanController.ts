import { NextFunction, Request, Response } from "express";
import { ChildProcess, exec } from "child_process";
import { ScannedResult } from "../models/scanModel";

const scanController = {
  //middleware to check if an image has been scanned
  isScanned: async (req: Request, res: Response, next: NextFunction) => {
    const { imageName } = req.body;
    try {
      //if image name is found in database send status code of 200 and the scanned result
      const scanned = await ScannedResult.findOne({ imageName });
      if (scanned) {
        return res.status(200).json(scanned.scannedResult);
      } else {
        //if not found return next()
        return next();
      }
    } catch (error) {
      const errMessage = {
        log: `Error occurred scanController.isScanned ${error}`,
        status: 500,
        message: { err: "Error occured scanning images" },
      };
      return next(errMessage);
    }
  },
  //middleware to scan vulnerability for images
  scanImage: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { imageName } = req.body;
    try {
      //use childProcess to execute a shell command on the image per frontend requested
      const command = `grype ${imageName} -o json`;
      const child: ChildProcess = exec(command);
      let chunks = "";
      //if child process has a standard output stream
      if (child.stdout) {
        //conver Buffer object into a string and append it to chunks
        child.stdout.on("data", (chunk: Buffer) => {
          chunks += chunk.toString();
        });
        child.stdout.on("end", async () => {
          const scanned = JSON.parse(chunks);
          res.locals.scanned = scanned;
          // create a new scannedresult instance in database
          try {
            await ScannedResult.create({
              imageName: imageName,
              scannedResult: scanned,
            });
            return next();
          } catch (error) {
            const errMessage = {
              log: `Error occurred in scanController.scanImage ${error}`,
              status: 500,
              message: {
                err: "Error occured while scanning images",
              },
            };
            return next(errMessage);
          }
        });
      }
    } catch (error) {
      const errMessage = {
        log: `Error occurred in scanController.scanImage ${error}`,
        status: 500,
        message: { err: "Error occured while scanning images" },
      };
      return next(errMessage);
    }
  },
};

export { scanController };
