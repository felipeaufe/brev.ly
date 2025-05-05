import { describe, expect, it } from "vitest"
import { createLink } from "./create-link"
import { uuidv7 } from "uuidv7"
import { isSuccess, unwrapEither } from "@/shared/either"
import { getLink } from "./get-link"

describe('should get a link', () => {

  const code = uuidv7()
  const link = "https://www.example.com";

  it('should get a link by code', async () => {
    

    await createLink({
      link,
      code
    })

    const result = await getLink({ code })

    if(isSuccess(result)) {

      const { data } = unwrapEither(result);
  
      expect(data).toEqual({
        link,
        code,
        accessCount: 1,
        createdAt: expect.any(Date)
      })
    }
  })

  it('should increment accessCount when het is called', async () => {

    const result = await getLink({ code })

    if(isSuccess(result)) {

      const { data } = unwrapEither(result);
  
      expect(data).toEqual({
        link,
        code,
        accessCount: 2,
        createdAt: expect.any(Date)
      })
    }
  })
})