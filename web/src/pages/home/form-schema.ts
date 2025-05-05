import type { Link } from "@/store/links.store";
import { z } from "zod"

export const createFormSchema = (links: Link[]) => {
  const existing = new Set(links.map(link => link.code))

  return z.object({
    link: z
    .string()
    .trim()
    .transform((value) => (RegExp(/^https?:\/\//).exec(value) ? value : `https://${value}`))
    .refine((value) => {
      try {
        return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i.test(new URL(value).hostname);
      } catch {
        return false;
      }
    }, { message: 'Informe uma URL válida.' }),
    
    code: z
      .string()
      .min(3, { message: 'Informe pelo menos 3 caracteres.' })
      .regex(/^[a-zA-Z0-9-]+$/, {
        message:
          'A URL deve conter apenas letras, números e hífens.',
      })
      .refine(value => !existing.has(value), {
        message: 'Este link encurtado é reservado.',
      }), 
  })
}