import express, { json } from 'express';
import { writeFile, readdir } from 'fs';


const app = express();
const port = 3000; 

app.use(json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.post('/createTextFile', (req, res) => {
    const folderPath = './textFiles';
    const currentDate = new Date();
    const fileName = `${currentDate.toISOString().replace(/:/g, '-')}.txt`;// to avoid same file name replace used
  
    const filePath = `${folderPath}/${fileName}`;
    const fileContent = currentDate.toString();
  
    writeFile(filePath, fileContent, (err) => {
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
  
    readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve text files.');
      } else {
        const textFiles = files.filter((file) => file.endsWith('.txt'));
        res.json(textFiles);
      }
    });
  });
  