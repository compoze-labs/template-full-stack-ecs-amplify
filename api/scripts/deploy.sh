#!/usr/bin/env bash

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

APP_NAME=$1
VERSION=$2
REGION=$3

if [ -z "${ENV:-}" ]; then
    echo "ENV is not set. Please set ENV to the environment you want to deploy to."
    exit 1
fi


## declare functions
. ./scripts/login.sh
. ./scripts/push.sh
. ./scripts/restart_service.sh

if [[ -z "${ENV}" ]]; then
    echo "$ENV is not a valid environment, must be either dev, stage, or prod; re-run with npm run deploy <environment>"
    exit 1
else
    echo "building docker image"
    "${SCRIPT_DIR}/build_tag.sh" "$APP_NAME" "$VERSION"
    echo "Deploying to $ENV..."
    # AWS_ACCOUNT_ID is an environment variable
    login "$AWS_ACCOUNT_ID" "$REGION"
    echo "login successful"
    push "$AWS_ACCOUNT_ID" "$REGION" "$APP_NAME" "$VERSION" "$ENV"
    echo "successfully pushed to repository"
    restart "$APP_NAME" "$ENV"
fi