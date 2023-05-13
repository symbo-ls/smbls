#! /bin/bash

GEN_DIR="uikit/react-generated"
SRC_DIR="uikit/domql"

rimraf -I "$GEN_DIR" && \
    smbls convert "$SRC_DIR" "$GEN_DIR" --react --internal-uikit && \
    cp -r build/kalduna/* "${GEN_DIR}/." && \
    echo "Run 'yarn && yarn start' in ${GEN_DIR}/"
