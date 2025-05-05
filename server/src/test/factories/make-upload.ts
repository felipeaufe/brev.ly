import { fakerPT_BR as faker } from "@faker-js/faker";

export const makeUpload = async (overrides: Partial<any> = {}) => {
  return Promise.resolve({
    link: overrides.link ?? faker.internet.url(),
    code: overrides.code ?? faker.string.alphanumeric(8).toLowerCase(),
    accessCount: 0,
    createdAt: overrides.createdAt ?? new Date(),
  });
};