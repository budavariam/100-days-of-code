#!/bin/bash

echo "---- collecting twitter data"
pushd utils/twitter || exit 1

DAYNUM="$1"
ID="$2"

sed -i  "s_\]_    ($DAYNUM,$ID),\n\]_g" "progress.py"
source ./venv/bin/activate
python3 main.py
deactivate
popd || exit 1

echo "---- generating progrress chart"
pushd utils/svg-graph || exit 1
npm run build
popd || exit 1
npx svgo progress-chart.svg

echo "---- DONE"