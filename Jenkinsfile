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
        input(message: 'npm install done, continue?', ok: 'yes')
      }
    }

    stage('Deliver') {
      steps {
        sh 'sh jenkins/scripts/deliver.sh'
      }
    }

  }
  environment {
    CI = 'true'
  }
}