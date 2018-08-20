#!/bin/sh

SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
PRO_PATH=${SHELL_FOLDER/\/hooks/}
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E ".html$|.vue$|.js$|.css$")
if [[ "$STAGED_FILES"=="" ]]; then
  exit 0
fi

PASS=true

# Check for eslint
# Which eslint &> /dev/null
# if [[ "$?"==0]]; then
if [[ ! -f $PRO_PATH/node_modules/eslint/bin/eslint.js ]]; then
  echo "please install Eslint"
  exit 1
fi

for FILE in $STAGED_FILES
do
  # eslint "$FILE"
  $PRO_PATH/node_modules/eslint/bin/eslint.js --format $PRO_PATH/node_modules/eslint-friendly-formatter "$FILE" --fix
  if [[ "$?" == 0 ]]; then
    echo "Eslint Passed: $FILE"
  else
    echo "Eslint Failed: $FILE"
    PASS=false
  fi
done

if ! $PASS; then
  echo "Commit Failed: Your commit contains files that should pass Eslint but do not. Please fix the Eslint errors
  and try again."
  exit 1
else
  echo "Commit Succeeded"
fi
exit $?