#!/usr/bin/env sh

set -x
cp /etc/letsencrypt/live/joina.group/joina.group.crt ./client/certs/joina.group.crt
cp /etc/letsencrypt/live/joina.group/joina.group.key ./client/certs/joina.group.key
npm run dev
sleep 1
echo $! > .pidfile
set +x
