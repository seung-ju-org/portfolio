pipeline {
  agent {
    kubernetes {
      defaultContainer "node"
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:22-alpine
      command:
        - cat
      tty: true
    - name: kaniko
      image: gcr.io/kaniko-project/executor:v1.23.2-debug
      command:
        - /busybox/cat
      tty: true
"""
    }
  }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    IMAGE_REPO = "ghcr.io/seung-ju/portfolio"
    HELM_VALUES_FILE = "helm/portfolio/values-prod.yaml"
  }

  stages {
    stage("Checkout") {
      steps {
        checkout scm
      }
    }

    stage("Setup") {
      steps {
        container("node") {
          sh """
            set -eu
            apk add --no-cache git openssh-client perl bash
            corepack enable
            node --version
            pnpm --version
          """
        }
      }
    }

    stage("Install") {
      steps {
        container("node") {
          sh """
            set -eu
            pnpm install --frozen-lockfile
          """
        }
      }
    }

    stage("Verify") {
      steps {
        container("node") {
          sh """
            set -eu
            pnpm prisma:generate
            pnpm lint
            pnpm test
            pnpm build
          """
        }
      }
    }

    stage("Prepare Image Tag") {
      steps {
        sh """
          set -eu
          SHORT_SHA="$(echo "${GIT_COMMIT:-local}" | cut -c1-7)"
          SAFE_BRANCH="$(echo "${BRANCH_NAME:-main}" | tr '/' '-')"
          IMAGE_TAG="${SAFE_BRANCH}-${BUILD_NUMBER}-${SHORT_SHA}"
          echo "IMAGE_TAG=${IMAGE_TAG}" > image.env
        """
      }
    }

    stage("Kaniko Build & Push") {
      steps {
        container("kaniko") {
          withCredentials([
            usernamePassword(credentialsId: "ghcr-credentials", usernameVariable: "REGISTRY_USER", passwordVariable: "REGISTRY_TOKEN"),
            string(credentialsId: "sentry-auth-token", variable: "SENTRY_AUTH_TOKEN")
          ]) {
            sh """
              set -eu
              . ./image.env

              AUTH_B64="$(
                printf "%s:%s" "${REGISTRY_USER}" "${REGISTRY_TOKEN}" | base64 | tr -d '\\n'
              )"
              mkdir -p /kaniko/.docker
              cat > /kaniko/.docker/config.json <<EOF
{
  "auths": {
    "ghcr.io": {
      "auth": "${AUTH_B64}"
    }
  }
}
EOF

              /kaniko/executor \
                --context "${WORKSPACE}" \
                --dockerfile "${WORKSPACE}/Dockerfile" \
                --destination "${IMAGE_REPO}:${IMAGE_TAG}" \
                --destination "${IMAGE_REPO}:ci-latest" \
                --build-arg "SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}"
            """
          }
        }
      }
    }

    stage("Update Helm Tag Commit") {
      steps {
        container("node") {
          withCredentials([usernamePassword(credentialsId: "git-push-credentials", usernameVariable: "GIT_PUSH_USER", passwordVariable: "GIT_PUSH_TOKEN")]) {
            sh """
              set -eu
              . ./image.env

              git config user.name "Jenkins"
              git config user.email "no-reply@jenkins.seung-ju.com"

              perl -0pi -e 's/(tag:\\s*").*(")/$1'"${IMAGE_TAG}"'$2/' "${HELM_VALUES_FILE}"

              if git diff --quiet -- "${HELM_VALUES_FILE}"; then
                echo "No Helm values changes to commit."
                exit 0
              fi

              git add "${HELM_VALUES_FILE}"
              git commit -m "ci: update portfolio image tag to ${IMAGE_TAG} [skip ci]"

              ORIGIN_URL="$(git remote get-url origin)"
              case "${ORIGIN_URL}" in
                https://*)
                  BASE_URL="${ORIGIN_URL}"
                  ;;
                git@github.com:*)
                  BASE_URL="https://github.com/${ORIGIN_URL#git@github.com:}"
                  ;;
                ssh://git@github.com/*)
                  BASE_URL="https://github.com/${ORIGIN_URL#ssh://git@github.com/}"
                  ;;
                *)
                  echo "Unsupported origin URL for push: ${ORIGIN_URL}"
                  exit 1
                  ;;
              esac

              AUTH_URL="https://${GIT_PUSH_USER}:${GIT_PUSH_TOKEN}@${BASE_URL#https://}"
              TARGET_BRANCH="${BRANCH_NAME:-main}"
              git push "${AUTH_URL}" "HEAD:${TARGET_BRANCH}"
            """
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: "image.env", allowEmptyArchive: true
    }
  }
}
