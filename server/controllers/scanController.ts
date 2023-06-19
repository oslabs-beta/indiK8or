import { exec, ChildProcess } from 'child_process';
import { Request, Response, NextFunction } from 'express';

const scanController = {
  getImages: async (req: Request, res: Response, next: NextFunction) => {
    console.log('INSIDE GETIMAGES MIDDLEWARE');
    const { podName } = req.body;

    try {
      const command = `kubectl get pod ${podName} -o jsonpath='{.spec.containers[*].image}'`;
      const child: ChildProcess = exec(command);
      const chunks: Buffer[] = [];
      if (child.stdout) {
        child.stdout.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        child.stdout.on('end', () => {
          const images: string[] = chunks[0].toString().split(' ');
          //   console.log('images are: ', images);
          res.locals.images = images;
          return next();
        });
      }
    } catch (error) {
      const errMessage = {
        log: 'Error occurred from getting images',
        status: 500,
        message: `${error} error occured in scanController.getImages`,
      };
      return next(errMessage);
    }
  },

  scanImage: async (_req: Request, res: Response, next: NextFunction) => {
    console.log('INSIDE SCANIMAGE MIDDLEWARE');

    try {
      const command = `grype ${res.locals.images[0]} -o json`;
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
