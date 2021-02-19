#!/usr/bin/env sh

set -x
cp ~/Group-Maker/client/certs/joina.group.crt ./client/certs/joina.group.crt
cp ~/Group-Maker/client/certs/joina.group.key ./client/certs/joina.group.key
npm run dev
sleep 1
echo $! > .pidfile
set +x
