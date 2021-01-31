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

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Deliver') {
      steps {
        sh '''npm run dev
npm start &
sleep 1
echo $! > .pidfile'''
      }
    }

  }
  environment {
    CI = 'true'
  }
}