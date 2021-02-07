pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node:15.8.0-alpine'
    }

  }
  stages {
    stage('Kill') {
      steps {
        sh 'sh jenkins/scripts/kill.sh'
      }
    }

    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run client-install'
      }
    }

    stage('Deliver') {
      steps {
        sh 'sh jenkins/scripts/deliver.sh &'
      }
    }

  }
  environment {
    CI = 'true'
  }
}