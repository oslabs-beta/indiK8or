
![Screenshot 2023-06-17 at 11 13 09 AM](https://github.com/oslabs-beta/indiK8or/assets/112515781/3c4128be-a2f6-4d27-a998-fd162597118c)


❤️❤️ IF YOU LIKE OUR PRODUCT, YOU CAN SHOW LOVE AND SUPPORT BY ⭐️ THIS REPOSITORY!  ❤️❤️
<br>

# Built with
![JavaScript](https://img.shields.io/badge/-javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-react-white?style=for-the-badge&logo=react&logoColor=blue)
![ReactRouter](https://img.shields.io/badge/-ReactRouter-white?style=for-the-badge&logo=ReactRouter&logoColor=blue)
![Node](https://img.shields.io/badge/-node-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=green)
![Mongoose](https://img.shields.io/badge/-Mongoose-white?style=for-the-badge&logo=Mongoose&logoColor=brown)
![Passport](https://img.shields.io/badge/-Passport-black?style=for-the-badge&logo=Passport&logoColor=green)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F2F4F9?style=for-the-badge&logo=grafana&logoColor=orange&labelColor=F2F4F9)
![Prometheus](https://img.shields.io/badge/Prometheus-000000?style=for-the-badge&logo=prometheus&labelColor=000000)
![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=Helm&labelColor=0F1689)
![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-white?style=for-the-badge&logo=scss3&logoColor=pink)
![Jest](https://img.shields.io/badge/-jest-white?style=for-the-badge&logo=jest&logoColor=red)
![Supertest](https://img.shields.io/badge/-Supertest-C21325?style=for-the-badge&logo=Supertest&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-white?style=for-the-badge&logo=Vitest&logoColor=yellow)
<br>

# Introduction
Welcome to indiK8or, the ultimate Kubernetes Cluster Visualization Tool. With real-time display of your cluster metrics, you can stay informed about its performance at all times. In addition, indiK8or goes a step further by scanning your pods and presenting any vulnerabilities, which ensures your cluster remains fortified against potential threats. Experience seamless monitoring and enhanced security with indiK8or today!

<img width="400" src="https://github.com/oslabs-beta/indiK8or/assets/112515781/049f991a-a41f-44ce-9018-79593beb97b1">
<img width="400" src="https://github.com/oslabs-beta/indiK8or/assets/112515781/ce3e3b5a-220d-4f8f-966b-c5a0c84c594c">
<img width="800" src="https://github.com/oslabs-beta/indiK8or/assets/112515781/33249af8-ae02-45d5-81f8-b39cae52e9d4">
<br>

# Features
- indiK8or provides an intuitive K8s cluster visualization, making it easy for users to access key metrics on their clusters without manually running kubectl commands.
- indiK8or allows users to scan images of each pod in the cluster and provides a comprehensive display of any vulnerabilities detected.
- The built-in Prometheus integration allows users to easily monitor cluster performance with no need for additional configuration.
- Seamless Grafana integration allows access to insightful visualizations of critical cluster metrics without any setup hassles.

# Getting started
indiK8or assumes that you have Docker and Kubernetes installed and running on your machine. The simplest way to install both is to follow the instructions for [Docker Desktop](https://www.docker.com/get-started) installation, then enable Kubernetes from the Settings menu.

If you do not have a Kubernetes cluster up and running, use Minikube to quickly set one up, The instructions are laid out below.

NOTE: ONLY RUN STEP 1-16 IF THIS IS YOUR **VERY FIRST TIME** USING INDIK8TOR!
____________________________________________________________________________________________________________________________________________________

1. Make sure you have node.js installed, you can check if you have it by running ` node -v `
2. Run ` npm i` to install all package dependencies.
3. Create a MongoDB database and set up Github OAuth credentials to use within the app.
4. The Homepage url should be http://localhost:5000, and the authorization callback URL should be       
   http://localhost:4000/auth/github/callback.
5. Create a .env file and assign the following environment variables according to your MongoDB and OAuth set up.
   ```env
       MONGO_URI=''
       SESSION_SECRET='(Randomly generated string)' 
       GitHubClientID=''
       GitHubClientSecret=''
   
6. Make sure you have Docker installed on your local machine.
7. Once Docker is installed, run the following command:
   ` minikube delete `
8. Start the minikube service with the following command:
   ` minikube start --cpus 4 --memory 8192 --vm-driver Docker `
   
   Note: it may take a while to fully install. Please be patient
9. Make sure you have kubectl installed to add deployments 
   - If you use macOS, run: ` brew install kubectl `
   - If you use Windows, run: ` choco install kubernetes-cli `
   - If you use Linux, run: ` sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl `
10. Install helm
   - If you use macOS, run: ` brew install helm `
   - If you use Windows, run: ` choco install kubernetes-helm `
   - If you use Linux, run:
     ``` $ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
         $ chmod 700 get_helm.sh
         $ ./get_helm.sh 
     ```
     NOTE: Refer to this link for more details: https://kubernetes.io/docs/tasks/tools/
11. Copy the code snippet below into your terminal and run it
   ```
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add stable https://kubernetes-charts.storage.googleapis.com/
    helm repo update
   ```

12. Install Prometheus 

   ` helm install prometheus prometheus-community/kube-prometheus-stack `
   
13. Configure a yaml file for grafana, replace the part of 'yourFile' with the name you want for your yaml file

   ` kubectl get configmap prometheus-grafana -o yaml > yourFile.yaml `
   
14. Once you generated this yaml file, open it and paste the code below into your yaml file inside of grafana.ini
   ```yaml
      [security]
      allow_embedding: true
      [auth.anonymous]
      enabled: true
      [dataproxy]
      timeout: 600 
   ```

15. Apply the yaml file, and replace 'filePath' with the path of your yaml file
    ` kubectl apply -f 'filePath' `
    
    Here is an example if your yaml file resides in your desktop folder:
    ` kubectl apply -f /Users/Ivy/Desktop/newMap.yaml `

16. Install grype, you can find the instructions [here](https://github.com/anchore/grype)
_____________________________________________________________________________________________________________________________________

NOTE: START HERE IF YOU HAVE COMPLETED THE INITIAL SETUP

1. Restart minikube by running below commands separately
    ` minikube stop `
    ` minikube start `

2. Begin port forwarding Grafana with the following command:
   
   ```kubectl port-forward deployment/prometheus-grafana 3000```
   
   Open your browser and go to http://localhost:3000 and sign in to grafana with
   
   default user: admin
   
   default password: prom-operator
   
   finally stop the port forwarding of Grafana (shell commands will execute this automatically every time you start the server)
   
   NOTE: You do not have to do step 2 if you have previously logged in before.
   
4. In your terminal, run this command
    ` npm run dev `
5. Now visit http://localhost:5000 and Voila! You will see your kubernetes cluster come alive monitoring real-time data!

# User guide
## Dashboard
This page of the application will provide a visual overview of your kubernetes cluster's metrics. The dashboard shows metrics on CPU usage, memory, disk, network, etc. 

 <img src="https://github.com/oslabs-beta/indiK8or/assets/112515781/bf10b707-b72b-4b7e-8604-f96767da9d0b" width="700" height="400"/>

## Pods
This page will display the health and status of each pod, providing pod details such as name, status, age, IP, and associated images. Click on the 'SCAN' button to check each image for potential vulnerabilities. Once the scanning process is complete, a pop-up window will list any existing vulnerabilities, if found.

 <img src="https://github.com/oslabs-beta/indiK8or/assets/112515781/13cd8a06-3849-4a95-8853-b0833db0899a" width="700" height="400"/>
<br>
<br>

# Contributing

This product is open source, being actively maintained, and open to contributions. Please inform us of any features or bugs you'd like to see addressed.

## How to contribute
Contributions play a vital role in the open-source community. Any contributions you make are greatly appreciated!

- Fork the project.
- Work off of your feature branch.
- Create a pull request with detailed description of your changes from your feature branch to dev branch.
- Inform us upon PR submission. Once the changes are reviewed and approved, we will merge your code into the main repository.

# Publications
Check our amazing Medium article [here](https://medium.com/@wanwangbtb/a-new-game-player-indik8or-237daac583d6)!
<br>

# Team
|  ![Screenshot 2023-06-16 at 4 23 00 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/5d6998e9-07cf-4189-81d9-291b09188063) | ![Screenshot 2023-06-16 at 4 20 50 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/176051e8-ef3e-410f-bc76-b808f36c28df) | ![Screenshot 2023-06-21 at 12 08 12 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/7d6f4638-f815-4337-87b3-853fe26fe454) |  ![Screenshot 2023-06-16 at 4 23 29 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/794a60b7-b0b2-461c-b0de-f698ee506387) |
| ------------- | ------------- |------------- | ------------- |
| Tadd Lerocque [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/LeRocque)  [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/taddlerocque/)| Ivy Wang [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/WandefulWorld) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/wanwang12/) | Yueran Li  [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/kneazle714) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/yueranli/)  | Julian Babon [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/babonjmc) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/julianbabon/) |

# License
Distributed under the [MIT License](https://github.com/oslabs-beta/indiK8or/blob/main/LICENSE).

<br>
❤️ IF YOU FIND OUR PRODUCT HELPFUL, YOU CAN SHOW YOUR SUPPORT BY ⭐️ THIS REPOSITORY!  ❤️