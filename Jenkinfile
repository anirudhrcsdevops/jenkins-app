pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_REPO = "131127508996.dkr.ecr.ap-south-1.amazonaws.com/myapp"
    IMAGE_TAG = "${BUILD_NUMBER}"
    CLUSTER_NAME = "ecs-cluster"
    SERVICE_NAME = "ecs_task-service"
  }

  stages {

    stage('Checkout') {
      steps {
        echo "Code already checked out"
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

    stage('Build & Push') {
      steps {
        sh '''
        docker build -t ecs-app .
        docker tag ecs-app:latest $ECR_REPO:$IMAGE_TAG
        docker push $ECR_REPO:$IMAGE_TAG
        '''
      }
    }

    stage('Deploy to ECS') {
      steps {
        sh '''
        aws ecs update-service \
          --cluster $CLUSTER_NAME \
          --service $SERVICE_NAME \
          --force-new-deployment
        '''
      }
    }
  }
}
