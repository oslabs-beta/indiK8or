
# indiK8or
indiK8or is a Kubernetes Visualization Tool that will display your cluster in real-time

# Getting Started

indiK8or functionality assumes that you have Docker and Kubernetes already installed and running on your machine. The simplest way to install both is to follow the instructions for [Docker Desktop](https://www.docker.com/get-started) installation, then enable Kubernetes from the Settings menu.

If you do not have a Kubernetes cluster up and running, use Minikube to quickly set one up, The instructions are laid out below.

NOTE: ONLY RUN STEP 1-13 IF THIS IS YOUR VERY FIRST TIME RUNNING INDIK8TOR!
____________________________________________________________________________________________________________________________________________________

1. Make sure you have Docker installed on your local machine.
2. Once Docker is installed, run the following command:
  < minikube delete >
3. Start the minikube service with the following command:
  < minikube start --cpus 4 --memory 8192 --vm-driver hyperkit >
   Note: it may take a while to fully install. Please be patient
5. Make sure you have kubectl installed to add deployments 
   < brew install kubectl >
6. install helm
   < brew install helm >
7. copy the code snippet below into your terminal and run it
   < helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add stable https://kubernetes-charts.storage.googleapis.com/
    helm repo update >
9. install prometheus
   < helm install prometheus prometheus-community/kube-prometheus-stack >
11. configure a yaml file for grafana, replace the part of 'yourChoiceOfName' with the name you want for your yaml file.
   < kubectl get configmap prometheus-grafana -o yaml > yourChoiceOfName.yaml
12. Once you generated this yaml file, open it and paste the code below into your yaml file inside of grafana.ini
   < [security]
      allow_embedding: true
      [auth.anonymous]
      enabled: true
      [dataproxy]
      timeout: 600 >
13. Apply the yaml file, and replace 'filePath' with the path of your yaml file
    < kubectl apply -f 'filePath' >
    
    Here is an example if your yaml file resides in your desktop foler:
    kubectl apply -f /Users/Ivy/Desktop/newMap.yaml
_________________________________________________________________________________________________________________________________________

NOTE: START HERE IF YOU HAVE COMPLETED THE INITIAL SETUP

14. Restart minikube by running below commands separately
    < minikube stop >
    < minikube start >
15. Forward your grafana to port 3000
    < kubectl port-forward deployment/prometheus-grafana 3000 >
16. Open your browser and go to http://localhost:3000 and sign in to your grafana with
   default user: admin
   default password: prom-operator
   
17. In your terminal, run this command
    < npm run start >
18. Now open your browser and go to http://localhost:5000 and Voila! Your will see your kubernetes cluster come alive monitoring real-time data!



