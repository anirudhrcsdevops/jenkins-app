pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_REPO = "xxxxxxxx.dkr.ecr.ap-south-1.amazonaws.com/sample-app"
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
    | docker login --username AWS --password-stdin xxxxxxxx.dkr.ecr.ap-south-1.amazonaws.com
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
