import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage"
import { z } from "zod";
import { r2 } from "./client";
import { uuidv7 } from "uuidv7";
import { env } from "@/env";

const uploadFileToStorageInput = z.object({
  folder: z.enum(["csv"]),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadFileToStorageInput = z.infer<typeof uploadFileToStorageInput>

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { folder, fileName, contentType, contentStream } = uploadFileToStorageInput.parse(input);


  const fileExtension = extname(fileName)
  const fileNameWithoutExtension = basename(fileName, fileExtension)
  const sanitizedFileName = fileNameWithoutExtension.replace(/[^a-zA-Z0-9]/g, '')
  const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension)

  const uniqueFileName = `${folder}/${uuidv7()}-${sanitizedFileNameWithExtension}`;

  const upload = new Upload({ 
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Body: contentStream,
      ContentType: contentType,
    }
  })

  await upload.done()

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_BUCKET_URL).toString()
  }
}