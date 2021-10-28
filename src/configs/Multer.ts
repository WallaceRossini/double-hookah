import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const tmp_folder = path.resolve(__dirname, '..', 'tmp');

export default  {
  directory: tmp_folder,
  storage: multer.diskStorage({
    destination: tmp_folder,
    filename(request, file, callback) {

      const file_hash = crypto.randomBytes(10).toString('hex');

      const filename = `${file_hash}-${file.originalname}`

      return callback(null, filename);

    }
  })
}

