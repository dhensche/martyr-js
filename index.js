var fs = require('fs'),
    path = require('path');

function importSolutions(directory) {
  exports[directory] = {};
  fs.readdir(path.join(__dirname, directory), function(err, files) {
    files.forEach(function(file) {
      if (path.extname(file) === '.js') {
        var solution = require('./' + path.join(directory, file));
        exports[directory][solution.name || file] = solution;
      }
    });
  });
};

importSolutions('Numbers');
importSolutions('Text');