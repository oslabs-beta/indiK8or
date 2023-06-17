import { exec, ChildProcess } from 'child_process';
import { Request, Response, NextFunction } from 'express';

const scanController = {
  getImages: async (_req: Request, _res: Response, next: NextFunction) => {
    console.log('INSIDE SCANIMAGES MIDDLEWARE');
    // const { podName } = req.body;
    try {
      const command =
        "kubectl get pods --all-namespaces -o jsonpath=\"{range .items[*]}{'\\n'}{.metadata.name}{':\\t'}{range .spec.containers[*]}{.image}{', '}{end}{end}\" | sort";
        // kubectl get pod alertmanager-prometheus-kube-prometheus-alertmanager-0 -o jsonpath='{.spec.containers[*].image}'
      const child: ChildProcess = exec(command);
      const chunks: Buffer[] = [];
      if (child.stdout) {
        child.stdout.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
          console.log('chunks:', chunk);
        });
        child.stdout.on('end', () => {
          const data: string = chunks.toString();
          console.log('data is: ', data);
          const lines: string[] = data.split('\n');
          console.log('lines are: ', lines);
          const newLines: string[] = lines.slice(1, -1);
          console.log('newLines are: ', newLines);
          const result: any[] = [];
          newLines.forEach((line) => {
            const [podName, images] = line.split(':\t');
            console.log('pod is: ', podName);
            console.log('images are: ', images);
            const imageArr = images.split(',').map((image) => image.trim());
            const imageObj = {[podName]: imageArr};
            result.push(imageObj);
          })
          console.log('result is: ', result);
          return next();
        });
      }
    } catch (error) {
      console.log(`error ${error}`);
      const errMessage = {
        log: 'Error occurred from getting images',
        status: 500,
        message: `${error} error occured in scanController.getImages`,
      };
      return next(errMessage);
    }
  },
};
export { scanController };
