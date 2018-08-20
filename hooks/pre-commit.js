var shell = require('shelljs')
var run = shell.exec(__dirname+'/pre-commit.sh')
shell.exit(run.code)