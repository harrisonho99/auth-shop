const formmidable = require('formidable');
const fs = require('fs');
const path = require('path');
var dir = './images';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
require('http')
  .createServer((req, res) => {
    if (
      req.url === '/api/upload' &&
      req.method.toLocaleLowerCase() === 'post'
    ) {
      const form = formmidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
          res.end(String(err));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        //by default node save the file into /temp
        const filePath = files.filetoupload.path;
        console.log(filePath);
        var newPath = path.join(__dirname, 'images', files.filetoupload.name);
        fs.rename(filePath, newPath, (err) => {
          if (err) {
            res.end('error occured');
            return console.log(String(err));
          }
          res.end('upload succcess!');
        });
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //render form
    res.write(
      '<form action="/api/upload" method="post" enctype="multipart/form-data">'
    );
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<button type="submit">Upload</button>');
    res.write('</form>');
    return res.end();
  })
  .listen(4000, () => {
    console.log('server listen on port 4000');
  });
