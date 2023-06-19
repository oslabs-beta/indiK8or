import { exec, ChildProcess } from 'child_process';
import { Request, Response, NextFunction } from 'express';

const scanController = {
  scanImage: async (req: Request, res: Response, next: NextFunction) => {
    console.log('INSIDE SCANIMAGE MIDDLEWARE');
    const { imageName } = req.body;
    console.log('imageName', imageName);
    try {
      const command = `grype ${imageName} -o json`;
      const child: ChildProcess = exec(command);
      let chunks = '';
      if (child.stdout) {
        child.stdout.on('data', (chunk: Buffer) => {
          chunks += chunk.toString();
        });
        child.stdout.on('end', () => {
          const scanned = JSON.parse(chunks);
          res.locals.scanned = scanned;
          console.log('res.locals.scanned: ', res.locals.scanned);
          return next();
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