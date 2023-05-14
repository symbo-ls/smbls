#! /bin/bash
# This script MUST be run from the root of the smbls repository

GEN_DIR="${1:-uikit/react-generated}"
SRC_DIR="uikit/domql"

rimraf -I "$GEN_DIR" && \
    smbls convert "$SRC_DIR" "$GEN_DIR" --react --internal-uikit "${@:2}"
