#!/bin/bash
set -e
SOURCE_DIR=$(pwd)
DEPLOY_DIR="${SOURCE_DIR}"
PORT_BASE=${PORT_BASE:-8000}
PORT=$PORT_BASE
while lsof -i :$PORT -sTCP:LISTEN -P -n 2>/dev/null | grep -q LISTEN; do
    echo "Port $PORT is in use, trying next..."
    PORT=$((PORT + 1))
done
echo "Using port: $PORT"
PID_FILE="/tmp/http-server-e.pid"
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        echo "Killing old server PID $OLD_PID"
        kill "$OLD_PID" 2>/dev/null || true
        sleep 1
    fi
    rm -f "$PID_FILE"
fi
cd "$DEPLOY_DIR"
nohup python3 -m http.server "$PORT" > "/tmp/http-server-e-${PORT}.log" 2>&1 &
PID=$!
echo $PID > "$PID_FILE"
echo "Server started with PID $PID on port $PORT"
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "Verification successful: HTTP 200 on http://localhost:$PORT"
else
    echo "Warning: Server returned HTTP $HTTP_CODE. Check /tmp/http-server-e-${PORT}.log for details."
fi
echo "Deployment completed. Access at http://localhost:$PORT"

# 打开默认浏览器
if command -v open &> /dev/null; then
    open "http://localhost:$PORT"
elif command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:$PORT"
else
    echo "Cannot automatically open browser. Please manually open http://localhost:$PORT"
fi
