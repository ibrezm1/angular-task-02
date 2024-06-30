const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('dist/app.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Add the dist folder contents to the zip
archive.directory('dist/taskmanager/', false);

archive.finalize();