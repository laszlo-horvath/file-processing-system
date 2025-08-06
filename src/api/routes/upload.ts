import { Router } from 'express';
import multer from 'multer';

import { config } from '../../shared/config';

const router = Router();
const upload = multer({ dest: `${config.dataFolderPath}/inbox/` });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  console.log(`File uploaded: ${req.file.filename}`);

  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

export default router;