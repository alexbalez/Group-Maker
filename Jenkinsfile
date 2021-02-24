pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run client-install'
      }
    }

    stage('Deliver') {
      steps {
        sh 'sh jenkins/scripts/deliver.sh &'
        input(message: 'Kill the server?', ok: 'Yes')
      }
    }

    stage('Kill') {
      steps {
        sh 'sh scripts/jenkins/kill.sh'
      }
    }

  }
  environment {
    CI = 'true'
  }
}