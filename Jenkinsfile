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
        sh '''set -x
npm test'''
      }
    }

    stage('Deliver') {
      steps {
        sh '''set -x
npm run dev
set +x
set -x
npm start &
sleep 1
echo $! > .pidfile
set +x'''
        input 'Finished using the web site? (Click "Proceed" to continue)'
        sh '''set -x
kill $(cat .pidfile)'''
      }
    }

  }
  environment {
    CI = 'true'
  }
}