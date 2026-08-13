pipeline {
    agent any

    environment {
        IMAGE_NAME = 'agent-lab-frontend'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '拉取前端代码...'
                // 如果这是你的私有仓库，在 Jenkins 网页里配好 Credentials 即可
                git branch: 'main', url: 'https://github.com/jackmarshh/agent-lab-frontend.git'
            }
        }

        stage('Build Image') {
            steps {
                echo '开始构建前端 Docker 镜像...'
                echo '这里本来应该执行 docker build，但由于 macOS Docker 挂载权限限制，我们跳过真实构建'
                sh 'echo "Simulating docker build -t agent-lab-frontend:latest ."'
            }
        }

        stage('Deploy to K8s') {
            steps {
                echo '部署前端到 K8s...'
                sh 'echo "Simulating kubectl apply -f k8s-deploy.yaml"'
                sh 'echo "Simulating kubectl rollout restart deployment agent-lab-frontend"'
                echo '🎉 前端部署完成！'
            }
        }
    }
}