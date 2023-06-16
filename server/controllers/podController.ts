import { spawn } from 'child_process';
import { Request, Response, NextFunction } from 'express';

const podController: any = {};

podController.getPods = (_req: Request, res: Response, next: NextFunction): void => {
console.log('INSIDE GETPODS MIDDLEWARE');
  try {
    const child: any = spawn('kubectl', [ 'get', 'pod', '-o', 'wide']);
    const chunks: Buffer[] = [];

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
      const results: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values: string[] = lines[i].split(/\s{2,}/);
        if (values.length === headers.length) {
          const pod: any = {};
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

    // child.stdout.on('data', (data: Buffer) => {
    //   console.log('data:', data);
    //   const response = JSON.parse(data.toString());
    //   console.log('response:', response);
    //   res.locals.pods = response;
    //   return next();
    // });

    // child.on('error', (error: any) => {
    //     console.log(`command error ${error.errMessage}`);
    // })
  } catch (error) {
    console.log(`error ${error}`);
    const errMessage = {
      log: 'Error occurred from getting pods',
      status: 500,
      message: `${error} error occured in podController.getPods`,
    };
    return next(errMessage);
  }
};

export { podController };
