// nodejs is a JS run time environment
const fs = require('fs');

// fs.writeFile('hey.txt', 'This is Write file fs module', (err) => {
//     if (err) throw ('Error writing file', err);
//     else console.log('File has been written');
// });// Creates a new file or overwrites an existing file with the content you give it.


// fs.appendFile('hey.txt', 'This is append file', (err) => {
//     if (err) throw ('Error appending file', err);
//     else console.log('File has been appended');
// });// Add new content to the end of a file without deleting what's already there.

// fs.readFile('hey.txt', 'utf8', (err, data) => {
//     if (err) throw ('Error reading file', err);
//     else console.log('File content:', data);
// });// Reads a file.


// fs.rename('hey.txt', 'hey2.txt', (err) => {
//     if (err) throw ('Error renaming file', err);
//     else console.log('File has been renamed');
// })// Renames a file


// fs.copyFile('hey2.txt', './copy/copy.txt', (err) => {
//     if (err) throw err.message;
//     console.log('File has been copied!');
//   });
//   // Copies a file


// fs.unlink('hey2.txt',(err)=>
// {
//     if (err) throw err.message;
//     elseconsole.log('File has been deleted!');
// })//to delete the file

// fs.rm('./copy', { recursive: true, force: true }, (err) => {
//     if (err) throw err.message;
//     else console.log('folder has been deleted!');
// })//to delete the folder(work on the both empty and non-empty folder)



/////////////////////////////////////////////////////////////
// http and https

const http = require('http');
const server=http.createServer(function (req, res) {
    res.end("hello world!");
})
server.listen(3000);