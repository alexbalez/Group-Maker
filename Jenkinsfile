pipeline {
  agent any
  stages {
    stage('Kill') {
      steps {
        echo 'sh jenkins/scripts/kill.sh &'
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
        sh 'sh jenkins/scripts/deliver.sh'
      }
    }

  }
  environment {
    CI = 'true'
  }
}