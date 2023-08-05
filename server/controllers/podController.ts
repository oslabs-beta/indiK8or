import { NextFunction, Request, Response } from "express";
import { ChildProcess, exec, spawn } from "child_process";
import { PodRow } from "../../types";
import { promisify } from "util";

const podController = {
  //middleware to get all pods on current cluster
  getPods: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      //use childProcess to spawn a shell command
      const child: ChildProcess = spawn("kubectl", [
        "get",
        "pod",
        "-o",
        "wide",
      ]);
      //delcare a variable chunks and assign it to an array of Buffer
      const chunks: Buffer[] = [];
      //if child has standard output stream
      if (child.stdout) {
        //push each buffer chunk into chunks
        child.stdout.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });
        //when stream ends
        child.stdout.on("end", () => {
          //concatenate all the chunks and then convert Buffer object into a string
          const data: string = Buffer.concat(chunks).toString();
          //split the data string into an array of lines
          const lines: string[] = data.split("\n");
          //split the first line of lines array into an array of header values.
          const headers: string[] = lines[0].split(/\s{2,}/);
          //initializes an empty array called results to hold formatted pod objects
          const results: PodRow[] = [];
          //iterate through lines and headers to create pod objects and save them in results
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
          res.locals.pods = results;
          return next();
        });
      }
    } catch (error) {
      const errMessage = {
        log: `Error occurred in podController.getPods ${error}`,
        status: 500,
        message: { err: "Error occured while getting pods" },
      };
      return next(errMessage);
    }
  },
  //middleware to get images on each pod
  getImages: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { pods } = res.locals;
      // create promise based version of exec func
      const execPromise = promisify(exec);
      for (let i = 0; i < pods.length; i++) {
        const command = `kubectl get pod ${pods[i].NAME} -o jsonpath='{.spec.containers[*].image}'`;
        const { stdout } = await execPromise(command);
        // removed leading or trailing whitespace and split into array of strings
        const images: string[] = stdout.trim().split(" ");
        // initialize images property with value of images array
        pods[i].IMAGES = images;
      }
      return next();
    } catch (error) {
      const errMessage = {
        log: `Error occurred in podController.getImages ${error}`,
        status: 500,
        message: { err: "Error occured while getting images" },
      };
      return next(errMessage);
    }
  },
};
export { podController };
