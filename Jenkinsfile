pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '拉取前端代码...'
                checkout scm
            }
        }

        stage('Build & Push') {
            steps {
                echo '用 Kaniko 构建镜像并推送到 Docker Hub...'
                script {
                    env.IMAGE_TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }
                echo "本次镜像 tag: ${env.IMAGE_TAG}"
                sh '''
                    set -e
                    /kaniko/executor \
                        --context . \
                        --dockerfile Dockerfile \
                        --destination jackmars/agent-lab-frontend:${IMAGE_TAG}
                '''
            }
        }

        stage('Deploy to K8s') {
            steps {
                echo '更新部署清单镜像 tag 并部署...'
                sh '''
                    set -e
                    TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
                    CA=/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
                    KUBE="kubectl --server=https://kubernetes.default.svc --token=$TOKEN --certificate-authority=$CA"

                    sed -i "s|image: jackmars/agent-lab-frontend:.*|image: jackmars/agent-lab-frontend:${IMAGE_TAG}|" k8s-deploy.yaml
                    echo ">>> 更新后的 image 行:"
                    grep image k8s-deploy.yaml

                    echo ">>> 应用部署清单"
                    $KUBE apply -f k8s-deploy.yaml

                    echo ">>> 等待滚动更新完成"
                    $KUBE rollout status deployment/agent-lab-frontend -n default --timeout=180s

                    echo ">>> 当前 Pod 状态"
                    $KUBE get pods -n default -l app=agent-lab-frontend
                '''
                echo '部署完成！'
            }
        }
    }
}
