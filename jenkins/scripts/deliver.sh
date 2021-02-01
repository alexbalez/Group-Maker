#!/usr/bin/env sh

set -x
npm run build
sleep 1
echo $! > .pidfile
set +x