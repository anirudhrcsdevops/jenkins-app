pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_REPO = "131127508996.dkr.ecr.ap-south-1.amazonaws.com/myapp"
    IMAGE_TAG = "${BUILD_NUMBER}"
    CLUSTER_NAME = "eks-demo"
  }

  stages {

    stage('Checkout') {
      steps {
        echo "Code checked out"
      }
    }

    stage('Login to ECR') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'aws-creds']]) {
          sh '''
          aws ecr get-login-password --region $AWS_REGION |
          docker login --username AWS --password-stdin $ECR_REPO
          '''
        }
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        sh '''
        docker build -t eks-app .
        docker tag eks-app:latest $ECR_REPO:$IMAGE_TAG
        docker push $ECR_REPO:$IMAGE_TAG
        '''
      }
    }

    stage('Configure kubectl') {
      steps {
        sh '''
        aws eks update-kubeconfig \
          --region $AWS_REGION \
          --name $CLUSTER_NAME
        '''
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh '''
        sed -i "s|IMAGE_PLACEHOLDER|$ECR_REPO:$IMAGE_TAG|" k8s/deployment.yaml
        kubectl apply -f k8s/
        '''
      }
    }
  }
}
