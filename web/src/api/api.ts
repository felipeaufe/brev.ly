const responseValidate = (response: Response) => {
  if (!response.ok) {
    console.error(response)
    throw new Error(response.statusText)
  }

  return response.json()
}


const originalLink = {

  get: async (code: string): Promise<string> => {
    const response = await fetch(`/api/shorten/${code}`)
    
    return responseValidate(response);
  }
}

const shortLink = {
  fetch: async <T>(): Promise<T> => {
    const response = await fetch('/api/shorten')
    return responseValidate(response);  
  },

  delete: async (code: string): Promise<Response> => {
    const response = await fetch(`/api/shorten/${code}`, {
      method: 'DELETE'
    })

    return responseValidate(response);
  }
}


export const http = { originalLink, shortLink,  }