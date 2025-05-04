import { z } from "zod";

const link = z.string().url("URL inválida.");
const code = z.string()
  .min(3, "A URL encurtada deve ter pelo menos 3 caracteres.")
  .regex(
    /^[a-zA-Z0-9-]+$/,
    "A URL encurtada deve conter apenas letras, números e hífen."
  );

export const createLinkSchema = z.object({
  link,
  code
})

export const removeLinkSchema = z.object({
  code
})

export const getLinkSchema = z.object({
  code
})