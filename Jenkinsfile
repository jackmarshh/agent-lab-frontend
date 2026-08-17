pipeline {
    agent any

    stages {
        stage('Deploy to K8s') {
            steps {
                echo '部署前端到 K8s（in-cluster）...'
                sh '''
                    set -e
                    TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
                    CA=/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
                    KUBE="kubectl --server=https://kubernetes.default.svc --token=$TOKEN --certificate-authority=$CA"

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
