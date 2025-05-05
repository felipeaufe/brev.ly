import { makeSuccess } from "@/shared/either";
import { stringify } from "csv-stringify";
import { pipeline } from "stream/promises";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { uuidv7 } from "uuidv7";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { desc } from "drizzle-orm";
import { PassThrough, Transform } from "stream";

export async function exportLinks () {
  
  const { sql, params } = db
    .select({
      link: schema.links.link,
      code: schema.links.code,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .orderBy(desc(schema.links.createdAt))
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(50)

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "link", header: "URL Original" },
      { key: "code", header: "URL Encurtada" },
      { key: "access_count", header: "Contagem de acessos" },
      { key: "created_at", header: "Criado em" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCsvPipeline = pipeline(
    cursor,
    new Transform({
      objectMode:true,
      transform(chunks: unknown[], encoding, callback) {
        for(const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      }
    }),
    csv,
    uploadToStorageStream
  )

  const fileName = `${uuidv7()}.csv`;
  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'csv',
    fileName,
    contentStream: uploadToStorageStream
  })


  const [{ url }] = await Promise.all([ 
    uploadToStorage,
    convertToCsvPipeline
  ])

  return makeSuccess({ data: {
    url,
    fileName
  }})
}