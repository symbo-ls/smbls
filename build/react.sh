rimraf -I uikit/test-react-components uikit/.smbls_convert_tmp

smbls convert uikit/domql uikit/test-react-components/
cp build/package-react.json uikit/test-react-components/package.json

cp build/package-react.json uikit/test-react-components/package.json

cd uikit/test-react-components
yarn build:button

npm publish
yarn link
