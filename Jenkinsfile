pipeline {
    agent any

    environment {
        IMAGE = 'techshala'
        CONTAINER = 'techshala'
        PORT = '8080'
    }

    stages {
        stage('Build image') {
            steps {
                sh 'docker build -t ${IMAGE}:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop ${CONTAINER} || true
                    docker rm ${CONTAINER} || true
                    docker run -d \
                        --name ${CONTAINER} \
                        --restart unless-stopped \
                        -p ${PORT}:80 \
                        ${IMAGE}:latest
                '''
            }
        }
    }
}
