pipeline {
    agent any

    stages {
        stage('Clonar el Repositorio') {
            steps {
                git branch: 'main', credentialsId: 'git-jenkins', url: 'https://github.com/julioiud/node-jenkins.git'
            }
        }
        stage('Obtener versión de la imagen existente') {
            steps {
                script {
                    def imageTag = sh(script: 'docker inspect -f \'{{.Config.Labels.version}}\' proyectos-backend-micro:v1', returnStdout: true).trim()
                    env.IMAGE_TAG = imageTag ?: 'v1'
                }
            }
        }
        stage('Construir imagen de Docker') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        // Validar la etiqueta de la imagen
                        def validImageTag = env.IMAGE_TAG =~ /^:[a-zA-Z0-9_]([a-zA-Z0-9_.-]){0,127}$/
                        if (!validImageTag) {
                            error("La etiqueta de la imagen no es válida: ${env.IMAGE_TAG}")
                        }

                        docker.build("proyectos-backend-micro${env.IMAGE_TAG}", "--build-arg MONGO_URI=${MONGO_URI} .")
                    }
                }
            }
        }
        stage('Desplegar contenedores Docker') {
            steps {
                script {
                    withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        sh """
                            sed 's|\\${MONGO_URI}|${MONGO_URI}|g' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        """
                    }
                }
            }
        }
    }
}
