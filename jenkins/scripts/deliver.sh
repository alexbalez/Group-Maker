#!/usr/bin/env sh

set -x
npm run dev &
sleep 1
echo $! > .pidfile
set +x