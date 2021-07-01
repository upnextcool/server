const isThere = require('is-there');

if (!isThere(`${__dirname}/key.pem`)) {
  const { exec } = require('child_process');
  exec('yarn generate-key', ((error, stdout, stderr) => {
    if (error) {
      console.error(error, stderr);
    }
    console.log(stdout);
  }))
} else {
  console.log('Key already exists.');
}
