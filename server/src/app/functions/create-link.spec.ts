import { describe, it, expect} from "vitest"
import { createLink } from "./create-link"
import { uuidv7 } from "uuidv7"
import { isSuccess, unwrapEither } from "@/shared/either"

describe('create link', () => {
  it('should create a new link', async () => {
    const link = "https://www.example.com"
    const code = uuidv7()

    const result = await createLink({
      link,
      code
    })

    if(isSuccess(result)) {
      const {data} = unwrapEither(result);

      expect(data.link).toBe(link)
      expect(data.code).toBe(code)
      expect(data.accessCount).toBe(0)
      expect(data.createdAt).toEqual(expect.any(Date))
    }
  })
})