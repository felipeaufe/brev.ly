import { uuidv7 } from "uuidv7"
import { describe, it, expect, vi} from "vitest"
import * as upload from "@/infra/storage/upload-file-to-storage"
import * as dbModule from "@/infra/db"
import { exportLinks } from "./export-links"
import { unwrapEither } from "@/shared/either"
import { PassThrough, Readable } from 'node:stream'
import { faker } from "@faker-js/faker"

describe('export links', () => {
  it('should be able to export links', async () => {
    const stubUrl = 'https://www.localhost.com/test.csv';

    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async ({contentStream}) => {
        contentStream.pipe(new PassThrough())
        return {
          key: `${uuidv7()}.csv`,
          url: stubUrl,
        };
      })

    const rows = Array.from({ length: 5 }, (_, index) => ({
      id: faker.string.uuid(),
      link: `${faker.internet.domainWord()}/${index + 1}`,
      code: faker.string.alphanumeric(8),
      access_count: faker.number.int({ min: 0, max: 100 }),
      created_at: new Date().toISOString(),
    }))


    vi.spyOn(dbModule.pg, 'unsafe').mockImplementation(() => {
      return {
        cursor: () => Readable.from([rows]),
      } as any
    })

    
    const result  = await exportLinks()
    const { data } = unwrapEither(result)
  
    expect(data.url).toBe(stubUrl)
    expect(uploadStub).toHaveBeenCalledTimes(1)
  })
})