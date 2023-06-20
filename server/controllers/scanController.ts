import { exec, ChildProcess } from 'child_process';
import { Request, Response, NextFunction } from 'express';
import { ScannedResult } from '../models/scanModel';

const scanController = {
  isScanned: async (req: Request, res: Response, next: NextFunction) => {
    const { imageName } = req.body;
    try {
      const scanned = await ScannedResult.findOne({ imageName });
      if (scanned) {
        return res.status(200).json(scanned.scannedResult);
      } else {
        return next();
      }
    } catch (error) {
      const errMessage = {
        log: 'Error occurred from looking for scanned results',
        status: 500,
        message: `${error} error occured in scanController.isScanned`,
      };
      return next(errMessage);
    }
  },
  // if not found return next(), if found res.200.return saved json on this database document

  scanImage: async (req: Request, res: Response, next: NextFunction) => {
    const { imageName } = req.body;
    try {
      const command = `grype ${imageName} -o json`;
      const child: ChildProcess = exec(command);
      let chunks = '';
      if (child.stdout) {
        child.stdout.on('data', (chunk: Buffer) => {
          chunks += chunk.toString();
        });
        child.stdout.on('end', async () => {
          const scanned = JSON.parse(chunks);
          res.locals.scanned = scanned;
          // save the imageName and res.locals.scanned to database
          try {
            await ScannedResult.create(
              {
                imageName: imageName,
                scannedResult: scanned,
              }
            );
            return next();
          } catch (error) {
            const errMessage = {
              log: 'Error occurred from creating scannedResults',
              status: 500,
              message: `${error} error occured in scanController.scanImage`,
            };
            return next(errMessage);
          }
        });
      }
    } catch (error) {
      const errMessage = {
        log: 'Error occurred from scanning image',
        status: 500,
        message: `${error} error occured in scanController.scanImage`,
      };
      return next(errMessage);
    }
  },
};

export { scanController };
