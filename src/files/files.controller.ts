import { Controller, Get, StreamableFile, Response, Res, Param } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FilesController {
  constructor() {}


  @Get(':filename')
  async getUser(
    @Response() res,
    @Param('filename') filename: string,
  ) {
    try{
      const root = join(`${process.cwd()}\\uploads`, filename)
      const file = createReadStream(root);

      let extension:any = filename.split(".")
      extension = extension[1]

      res.set({
        'Content-Type': `image/${extension}`,
        // 'Content-Disposition': `attachment; filename="${filename}"`,
      });

      file.pipe(res)
    }catch (e){
      return {
        status:"error",
        message: e.message
      }
    }
  }
}