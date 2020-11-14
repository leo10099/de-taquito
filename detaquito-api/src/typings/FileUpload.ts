export interface FormDataFileMetadata {
  fieldname: string;
  encoding: string;
  buffer: Buffer;
  originalname: string;
  size: number;
  mimetype: string;
}
