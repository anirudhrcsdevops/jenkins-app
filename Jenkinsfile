pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_REPO = "<ECR-URI>"
  }

  stages {

    stage('Checkout') {
      steps {
        git 'https://github.com/<your-username>/sample-app.git'
      }
    }

    stage('Build Image') {
      steps {
        sh 'docker build -t sample-app .'
      }
    }

    stage('ECR Login') {
      steps {
        sh '''
        aws ecr get-login-password --region $AWS_REGION |
        docker login --username AWS --password-stdin $ECR_REPO
        '''
      }
    }

    stage('Push Image') {
      steps {
        sh '''
        docker tag sample-app:latest $ECR_REPO:latest
        docker push $ECR_REPO:latest
        '''
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh '''
        kubectl apply -f deployment.yaml
        kubectl apply -f service.yaml
        '''
      }
    }
  }
}
