import * as crypto from 'crypto';
import * as mime from 'mime-types';
import { diskStorage } from 'multer';

export class FileUpload{
  private fileDestination: string;

  constructor() {
    this.fileDestination = './uploads'
  }

  editFileName (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }

  getLocalOptions(){
    const _fileDestination = this.fileDestination

    return {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, _fileDestination)
        },
        filename: this.editFileName
      }),
    }
  }
}