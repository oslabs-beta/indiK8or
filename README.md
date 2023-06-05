# Getting Started

indiK8or functionality assumes that you have Docker and Kubernetes already installed and running on your machine. The simplest way to install both is to follow the instructions for [Docker Desktop](https://www.docker.com/get-started) installation, then enable Kubernetes from the Settings menu.

If you do not have a Kubernetes cluster up and running, use Minikube to quickly set one up, The instructions are laid out below.

1. Make sure you have Docker installed on your local machine.
2. Once Docker is installed, run the following command:
- `brew install minikube`
- Note: it may take a while to fully install. Please be patient
1. Confirm that minikube is successfully installed by running the following command:
- `which minikube`
1. Start the minikube service with the following command:
- `minikube start`
1. Make sure you have kubectl installed to add deployments 
- `brew install kubectl`
