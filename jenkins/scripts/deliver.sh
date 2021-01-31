#!/usr/bin/env sh

echo "start"

set -x
npm start &
sleep 1
echo $! > .pidfile
set +x
