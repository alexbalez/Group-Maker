pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run client-install'
      }
    }

    stage('Deliver') {
      steps {
        sh 'sh jenkins/scripts/deliver.sh'
      }
    }

    stage('Stop') {
      steps {
        input(message: 'Stop the server?', ok: 'Yes')
        sh 'sh jenkins/scripts/kill.sh'
      }
    }

  }
  environment {
    CI = 'true'
  }
}