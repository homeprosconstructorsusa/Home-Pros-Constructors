#!/usr/bin/env bash
set -euo pipefail
cd /workspace/Home-Pros-Constructors
export npm_config_cache=/tmp/homepros-npm
npm ci
npm run env:init
docker compose up -d --wait db
npm run db:generate
npm run db:deploy
npm run db:seed
npm run lint
npm run typecheck
npm run test
npm run preview:build
npm run build
