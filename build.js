var process = require('child_process');

process.exec('publicPath=./ npm run build', function (error, stdout, stderr) {
  console.log(stdout)
});