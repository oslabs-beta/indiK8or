import { spawn, ChildProcess, exec } from 'child_process';
import { Request, Response, NextFunction } from 'express';
import { PodRow } from '../../types';
import { promisify } from 'util';

const podController = {
getPods: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
console.log('INSIDE GETPODS MIDDLEWARE');
  try {
    const child: ChildProcess = spawn('kubectl', [ 'get', 'pod', '-o', 'wide']);
    const chunks: Buffer[] = [];
    if (child.stdout){
    child.stdout.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
      console.log('chunks:', chunks);
    })

    child.stdout.on('end', () => {
      const data: string = Buffer.concat(chunks).toString();
      console.log('data is: ', data);
      const lines: string[] = data.split('\n');

      console.log('lines are: ', lines);
      const headers: string[] = lines[0].split(/\s{2,}/);
      console.log('headers are:', headers);
      const results: PodRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values: string[] = lines[i].split(/\s{2,}/);
        if (values.length === headers.length) {

          const pod: PodRow = {} as PodRow;

          for (let j = 0; j < headers.length; j++) {
            pod[headers[j]] = values[j];
          }
          results.push(pod);
        }
      }
      console.log('results are: ', results);

      res.locals.pods = results;
      return next();
    })
    }
  } catch (error) {
    console.log(`error ${error}`);
    const errMessage = {
      log: 'Error occurred from getting pods',
      status: 500,
      message: `${error} error occured in podController.getPods`,
    };
    return next(errMessage);
  }
},

getImages: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pods = res.locals.pods;
    // create promise based version of exec func
    const execPromise = promisify(exec);
    for (let i = 0; i < pods.length; i++) {
      const command = `kubectl get pod ${pods[i].NAME} -o jsonpath='{.spec.containers[*].image}'`;
      const { stdout } = await execPromise(command);
      // removed leading or trailing whitespace and split into array of strings
      const images: string[] = stdout.trim().split(' ');
      // initialize images property with value of images array
      pods[i].IMAGES = images;
    }
    return next();
  } catch (error) {
    console.log(`error ${error}`);
    const errMessage = {
      log: 'Error occurred from getting images',
      status: 500,
      message: `${error} error occured in podController.getImages`,
    };
    return next(errMessage);
  }
}
};
export { podController };