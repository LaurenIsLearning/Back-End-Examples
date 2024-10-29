import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import lodash from 'lodash';

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 8080;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

app.post('/upload-files', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No files uploaded'
            });
        } else {
            let data = []; 
            
            //loop all files
            lodash.forEach(lodash.keysIn(req.files), (key) => {
                let file = req.files[key];
                
                //move file to uploads directory
                file.mv('./temp/' + file.name);

                //push file details
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                });
            });
    
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/upload-avatar', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            avatar.mv('./temp/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});