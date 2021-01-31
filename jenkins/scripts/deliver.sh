#!/usr/bin/env sh

set -x
npm start &
sleep 1
echo $! > .pidfile
set +x
