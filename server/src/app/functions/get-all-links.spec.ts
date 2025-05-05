import { describe, expect, it } from "vitest"
import { createLink } from "./create-link"
import { uuidv7 } from "uuidv7"
import { getAllLinks } from "./get-all-links"
import { unwrapEither } from "@/shared/either"

describe('should get all links', () => {

  it('should get a list of links', async () => {
    
    const link = "https://www.example.com";
    const code1 = uuidv7()
    const code2 = uuidv7()
    const code3 = uuidv7()

    await createLink({
      link,
      code: code1
    })
    await createLink({
      link,
      code: code2
      
    })
    await createLink({
      link,
      code: code3
      
    })

    const result = await getAllLinks()
    const { data } = unwrapEither(result);

    expect(data.length).toBeGreaterThan(2);
    expect(data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        link,
        code: code1
      }),
      expect.objectContaining({
        link,
        code: code2
      }),
      expect.objectContaining({
        link,
        code: code3
      }),
    ]))
  })
})