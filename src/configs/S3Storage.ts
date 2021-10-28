import aws, { S3 } from 'aws-sdk';
import path from 'path';
import multer from '../configs/Multer';
import mime from 'mime-types';
import { unlinkSync, readFileSync } from 'fs';

export class S3Storage {

  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
  }

  async save_file(filename: string): Promise<string> {

    const original_path = path.resolve(multer.directory, filename);

    const ContentType = mime.contentType(original_path);

    if (!ContentType)
      throw new Error('Image not found!');

    const fileContent = await readFileSync(original_path)

    this.client.putObject({
      Bucket: String(process.env.AWS_BUCKET_NAME),
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();

    await unlinkSync(original_path)

    return `${String(process.env.AWS_S3_URL)}/${filename}`

  }

  async delete(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: String(process.env.AWS_BUCKET_NAME),
        Key: filename,
      })
      .promise();
  }
}
