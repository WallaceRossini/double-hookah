import { S3Storage } from "../configs/S3Storage";

export class S3StorageService {
  
  async execute(file: Express.Multer.File): Promise<string> {
    const s3 = new S3Storage();

    const url = await s3.save_file(file.filename);

    return url;
  }

  async delete(filename: string){
    const s3 = new S3Storage();

    await s3.delete(filename)
      .then(data =>
        console.log(data)
      )
      .catch(e => {
        return new Error(e)
      });

  }
}
