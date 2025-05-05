import { describe, expect, it } from "vitest"
import { createLink } from "./create-link"
import { uuidv7 } from "uuidv7"
import { isError, isSuccess, Success, unwrapEither } from "@/shared/either"
import { getLink } from "./get-link"
import { removeLink } from "./remove-link"

describe('should get a link', () => {

  
  it('should get a link by code', async () => {
    
    const code = uuidv7()
    const link = "https://www.example.com";
    
    await createLink({
      link,
      code
    })

    const getResult = await getLink({ code })


    if(isError(getResult)) {
      return expect(isError(getResult)).toBe(false)
    }

    const { data: linkData } = unwrapEither(getResult);

    expect(linkData).toEqual({
      link,
      code,
      accessCount: 1,
      createdAt: expect.any(Date)
    })

    const removeResult = await removeLink({ code })

    if(isError(removeResult)) {
      return expect(isError(removeResult)).toBe(false)
    }

    const { data: isRemoved } = unwrapEither(removeResult);


    expect(isRemoved).toBe(true)

  })
})