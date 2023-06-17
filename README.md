
<img width="959" alt="Screenshot 2023-06-16 at 4 59 07 PM" src="https://github.com/oslabs-beta/indiK8or/assets/112515781/1183119b-c4bf-4bac-82f0-e3538af90831">

# Built With
![JavaScript](https://img.shields.io/badge/-javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-react-white?style=for-the-badge&logo=react&logoColor=blue)
![ReactRouter](https://img.shields.io/badge/-ReactRouter-white?style=for-the-badge&logo=ReactRouter&logoColor=blue)
![Node](https://img.shields.io/badge/-node-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![RestfulAPI](https://img.shields.io/badge/-RestfulAPI-000000?style=for-the-badge&logo=RestfulAPI&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=green)
![Mongoose](https://img.shields.io/badge/-Mongoose-white?style=for-the-badge&logo=Mongoose&logoColor=brown)
![Bcrypt](https://img.shields.io/badge/-Bcrypt-B65FCF?style=for-the-badge&logo=Bcrypt&logoColor=white)
![Passport](https://img.shields.io/badge/-Passport-black?style=for-the-badge&logo=Passport&logoColor=green)
![OAuth](https://img.shields.io/badge/-OAuth-white?style=for-the-badge&logo=OAuth&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F2F4F9?style=for-the-badge&logo=grafana&logoColor=orange&labelColor=F2F4F9)
![Prometheus](https://img.shields.io/badge/Prometheus-000000?style=for-the-badge&logo=prometheus&labelColor=000000)
![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=Helm&labelColor=0F1689)
![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-white?style=for-the-badge&logo=jest&logoColor=red)
![Supertest](https://img.shields.io/badge/-Supertest-C21325?style=for-the-badge&logo=Supertest&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-white?style=for-the-badge&logo=Vitest&logoColor=yellow)


</div>

# indiK8or


indiK8or is a Kubernetes Cluster Visualization Tool that will display your cluster metrics in real-time, it also provides the ability show security metrics by scanning your pods and display the vulnerabilities.

<img src="https://github.com/oslabs-beta/indiK8or/blob/Ivy-ts/src/assets/appDemo.gif" height="450"/>
# Getting Started

indiK8or functionality assumes that you have Docker and Kubernetes already installed and running on your machine. The simplest way to install both is to follow the instructions for [Docker Desktop](https://www.docker.com/get-started) installation, then enable Kubernetes from the Settings menu.

If you do not have a Kubernetes cluster up and running, use Minikube to quickly set one up, The instructions are laid out below.

NOTE: ONLY RUN STEP 1-13 IF THIS IS YOUR VERY FIRST TIME RUNNING INDIK8TOR!
____________________________________________________________________________________________________________________________________________________

1. Make sure you have Docker installed on your local machine.
2. Once Docker is installed, run the following command:
   ` minikube delete `
3. Start the minikube service with the following command:
   ` minikube start --cpus 4 --memory 8192 --vm-driver Docker `
   
   Note: it may take a while to fully install. Please be patient
4. Make sure you have kubectl installed to add deployments 
   - If you use macOS, run: ` brew install kubectl `
   - If you use Windows, run: ` choco install kubernetes-cli `
   - If you use Linux, run: ` sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl `
5. Install helm
   - If you use macOS, run: ` brew install helm `
   - If you use Windows, run: ` choco install kubernetes-helm `
   - If you use Linux, run:
     ``` $ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
         $ chmod 700 get_helm.sh
         $ ./get_helm.sh 
    NOTE: Refer to this link for more details: 
   https://kubernetes.io/docs/tasks/tools/
6. Copy the code snippet below into your terminal and run it
   ```
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add stable https://kubernetes-charts.storage.googleapis.com/
    helm repo update 
    ```
7. Install Prometheus 

   ` helm install prometheus prometheus-community/kube-prometheus-stack `
8. Configure a yaml file for grafana, replace the part of 'yourChoiceOfName' with the name you want for your yaml file.
    ` kubectl get configmap prometheus-grafana -o yaml > yourChoiceOfName.yaml `
9. Once you generated this yaml file, open it and paste the code below into your yaml file inside of grafana.ini
   ```yaml
      [security]
      allow_embedding: true
      [auth.anonymous]
      enabled: true
      [dataproxy]
      timeout: 600 
   ```
      
    <img src="https://github.com/oslabs-beta/indiK8or/assets/112515781/cf928d70-129e-4ca7-9faa-16091aa8c785" width="350" height="300"/>
10. Apply the yaml file, and replace 'filePath' with the path of your yaml file
    ` kubectl apply -f 'filePath' `
    
    Here is an example if your yaml file resides in your desktop foler:
    ` kubectl apply -f /Users/Ivy/Desktop/newMap.yaml `
_________________________________________________________________________________________________________________________________________

NOTE: START HERE IF YOU HAVE COMPLETED THE INITIAL SETUP

11. Restart minikube by running below commands separately
    ` minikube stop `
    ` minikube start `

12. Open your browser and go to http://localhost:3000 and sign in to your grafana with
   default user: admin
   default password: prom-operator
   
   NOTE: You do not have to do step 15 if you have previously logged before.
   
13. In your terminal, run this command
    ` npm run start `
14. Now visit http://localhost:5000 and Voila! Your will see your kubernetes cluster come alive monitoring real-time data!

# Contributors

|  ![Screenshot 2023-06-16 at 4 23 00 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/5d6998e9-07cf-4189-81d9-291b09188063) | ![Screenshot 2023-06-16 at 4 20 50 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/176051e8-ef3e-410f-bc76-b808f36c28df) |  ![Screenshot 2023-06-16 at 4 22 30 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/120f2037-7659-461d-a762-1c81421ad5e7) |  ![Screenshot 2023-06-16 at 4 23 29 PM](https://github.com/oslabs-beta/indiK8or/assets/112515781/794a60b7-b0b2-461c-b0de-f698ee506387) |
| ------------- | ------------- |------------- | ------------- |
| Tadd Lerocque [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/LeRocque)  [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/taddlerocque/)| Ivy Wang [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/WandefulWorld) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/wanwang12/) | Yueran Li  [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/kneazle714) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/yueranli/)  | Julian Babon [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/babonjmc) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/julianbabon/) |

# License Information
Distributed under the MIT License. See LICENSE for more information.

