import { exec, ChildProcess } from "child_process";
import treeKill from "tree-kill";

// initialize childProcess variable
let childProcess: ChildProcess | null = null;
// declare a function to start the grafana port forwarding command. We want this as a function that we are able to call it anytime we reset the server or Nodemon restarts due to changes
const startExecCommand = () => {
  /*
  Execute kubectl port-forward shell command
  Exec method will spawn a shell and execute the specified command within that shell
  This returns a ChildProcess object which we assign as childProcess
  */
  childProcess = exec(
    "kubectl port-forward deployment/prometheus-grafana 3000",
  );

  /*
  Set up event listener for stdout event of the childProcess object 
  when the executed shell command produces any standard output, this event will trigger
  and the provided callback will be exected
  */
  if (childProcess.stdout) {
    childProcess.stdout.on("data", (data: Buffer | string) => {
      console.log(`kubectl stdout: ${data}`);
    });
  }
  /*
  Set up event listener for stderr event of the childProcess object
  when the executed shell command produces any error, this event will trigger
  and the provided callback will be exected
  */
  if (childProcess.stderr) {
    childProcess.stderr.on("data", (data: Buffer | string) => {
      console.error(`kubectl stderr: ${data}`);
    });
  }
  /*
  Set up event listener for close event of the childProcess object
  this event is trigered when the childProcess object has finished and is about to exit the shell.
  The provided callback will be exected when this event occurs 
  */
  childProcess.on("close", (code: number) => {
    console.log(`kubectl process exited with code ${code}`);
  });
};

// Function to stop the child process
const stopChildProcess = (): Promise<void> => {
  // A new Promise is created, which will allow us to handle the asynchronous nature of stopping the child process.
  return new Promise<void>((resolve, reject) => {
    // check if the childProcess variable is defined. If it is, it means there is an active child process that needs to be stopped.
    if (childProcess && childProcess.pid) {
      /* 
      If there is an active child process, the treeKill function is called to send a SIGTERM signal to the child process, requesting it to terminate gracefully.
      The treeKill function takes three arguments: the process ID (childProcess.pid), the signal to send (SIGTERM), and a callback function.
      */
      treeKill(childProcess.pid, "SIGTERM", (err) => {
        if (err) {
          // If err, it means that the child process could not be stopped successfully.
          console.error("Error stopping exec command:", err);
          reject(err);
        } else {
        /* 
       If there is no error, it means the child process was stopped successfully. A log message is printed to the console indicating that the exec command has been stopped.
       The promise is resolved to indicate the successful completion of stopping the child process.
       */
          console.log("Exec command stopped.");
          resolve();
        }
      });
    }
    // If the childProcess variable is not defined, it means there is no active child process. In this case, the promise is immediately resolved without performing any further actions.
    else {
      resolve();
    }
    // The stopChildProcess function returns the promise, allowing the caller to handle the asynchronous stopping of the child process.
  });
};

export { startExecCommand, stopChildProcess };
