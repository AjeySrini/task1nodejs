const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; 

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.post('/createTextFile', (req, res) => {
    const folderPath = './textFiles';
    const currentDate = new Date();
    const fileName = `${currentDate.toISOString().replace(/:/g, '-')}.txt`;// to avoid same file name replace used
  
    const filePath = `${folderPath}/${fileName}`;
    const fileContent = currentDate.toString();
  
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to create the text file.');
      } else {
        res.status(201).send('Text file created successfully.');
      }
    });
  });

  app.get('/getTextFiles', (req, res) => {
    const folderPath = './textFiles'; 
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve text files.');
      } else {
        const textFiles = files.filter((file) => file.endsWith('.txt'));
        res.json(textFiles);
      }
    });
  });
  