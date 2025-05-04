[X]  Deve ser possível criar um link
  [X]  Não deve ser possível criar um link com URL encurtada mal formatada
  [X]  Não deve ser possível criar um link com URL encurtada já existente
[X]  Deve ser possível deletar um link
[X]  Deve ser possível obter a URL original por meio de uma URL encurtada
[X]  Deve ser possível listar todas as URL’s cadastradas
[ ]  Deve ser possível incrementar a quantidade de acessos de um link
[ ]  Deve ser possível exportar os links criados em um CSV
  [ ]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  [ ]  Deve ser gerado um nome aleatório e único para o arquivo
  [ ]  Deve ser possível realizar a listagem de forma performática
  [ ]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.


--

Veja que não especificamos se nas funcionalidades de deletar ou incrementar acessos, deve ser utilizado um campo `id` ou URL encurtada para realizar tais operações. Essa é uma decisão que cabe a você, desenvolvedor, escolher. Não há certo ou errado aqui, mas o recomendado é manter um padrão, se escolher `id`, que seja em ambas. Consistência e padrão são importantes.

*Lembrando que essa escolha irá impactar também no front-end.*

## Docker

Para esse projeto back-end você deve construir um `Dockerfile`, seguindo as boas práticas, que deve ser responsável por gerar a imagem da aplicação.

## Dicas

- Não se esqueça de habilitar o CORS na aplicação.
- Em caso de dúvidas, utilize o espaço da comunidade e do nosso fórum para interagir com outros alunos/instrutores e encontrar uma solução que funcione para você.

## Ferramentas

[] Node: Motor Javascript
[] Fastify: Servidor HTTP
[] TypeScript: Linguagem
[] ZOD: Ferramenta de validação de dados
[] vitest: Ferramenta de testes
[] Swagger: Documentação de rotas
[] Docker: Conteinerização
[] PostgreSQL: Banco de Dados
[] Biome: Formatador de código
[] DotEnv: Gerenciador de variáveis de ambiente
[] Drizzle: ORM para banco de dados