pipeline {
  agent any

  environment {
    AWS_REGION   = "ap-south-1"
    ECR_REGISTRY = "131127508996.dkr.ecr.ap-south-1.amazonaws.com"
    ECR_REPO     = "sample-app"
  }

  stages {

    stage('Build Image') {
      steps {
        sh 'docker build -t sample-app .'
      }
    }

    stage('ECR Login') {
      steps {
        sh '''
        aws ecr get-login-password --region $AWS_REGION \
        | docker login --username AWS --password-stdin $ECR_REGISTRY
        '''
      }
    }

    stage('Push Image') {
      steps {
        sh '''
        docker tag sample-app:latest $ECR_REGISTRY/$ECR_REPO:latest
        docker push $ECR_REGISTRY/$ECR_REPO:latest
        '''
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh '''
        kubectl apply -f deployment.yaml --validate=false
        kubectl apply -f service.yaml --validate=false
        '''
      }
    }
  }
}
