rimraf -I uikit/react-generated/
smbls convert uikit/domql/ uikit/react-genearted/ --react --internal-uikit
cp -r build/kalduna/* uikit/react-generated/.
echo 'Run `yarn && yarn start` in react/'