# Home Pros Constructors

Website de licenças de uso das cidades, com Next.js 16, TypeScript, Tailwind 4, PostgreSQL 16 e Prisma 7. Sem CRM. Projeto para revisão, sem implantação pública e sem pagamentos ativos.

## Ver a prévia sem hospedagem

Baixe `preview/homepros-preview.html` pelo botão **Download raw file** do GitHub e abra no navegador do computador. É um HTML autocontido, com navegação, 351 cidades e carrinho. O carrinho depende do armazenamento local do navegador. Se o navegador bloquear arquivos locais, sirva a pasta `preview` com `python3 -m http.server 8080`.

A prévia usa os **mesmos componentes React, dados geográficos, texto e cálculos** da aplicação Next.js. Apenas a navegação e a apresentação de imagens são adaptadas para um arquivo local. Ela não conecta ao banco de dados nem processa pagamentos. No teste automatizado, o HTML foi servido localmente porque o Chromium gerenciado bloqueia `file://`; todas as demais solicitações de rede foram bloqueadas para confirmar que a prévia é autocontida.

Os valores do texto de Boston foram aplicados como modelo às cidades para aprovação. A disponibilidade demonstrativa inclui Chelmsford reservada e Worcester vendida; essas situações não são ofertas nem representam vendas reais. Boston aparece disponível no modelo enviado.

## Desenvolvimento

Requisitos: Node.js 24, npm, Docker com Compose. Use o checkout existente; não é necessário criar um worktree.

```bash
npm ci
npm run env:init
docker compose up -d --wait db
npm run db:generate
npm run db:deploy
npm run db:seed
npm run dev -- --hostname 0.0.0.0
```

`env:init` cria credenciais aleatórias **somente para o PostgreSQL local**, sem exibir seus valores nem sobrescrever `.env` existente. Arquivos `.env` não entram no Git. O banco está exposto apenas em `127.0.0.1:5432`. `.env.example` documenta os nomes necessários.

```bash
npm run lint
npm run typecheck
npm run test
npm run preview:build
npm run build
npm run test:e2e
```

Os testes de navegador usam Chromium em `/usr/bin/chromium` neste ambiente. Em outra máquina, configure `CHROMIUM_PATH` com o executável do Chromium. Os testes de integração precisam do PostgreSQL inicializado; portas 3100, 3101 e 3102 precisam estar livres.

`npm run preview:build` atualiza o HTML distribuído a partir dos componentes reais. `npm run build` prepara a saída standalone e copia seus assets. Para validar a versão compilada: `npm start -- --hostname 127.0.0.1 --port 3000`.

## Catálogo e gerenciamento de disponibilidade

351 municípios reais, com nomes, condados, tipo e identificador do US Census Bureau CitySDK (2022). Fonte em `src/data/SOURCES.md`.

- `CATALOG_MODE=demo`: catálogo para aprovação visual, com condições do modelo de Boston e disponibilidade demonstrativa.
- `CATALOG_MODE=live`: consulta PostgreSQL; nunca converte erros de banco em catálogo vazio ou em demonstração.
- `db:seed`: adiciona os municípios como `DRAFT`, sem preço. Reexecutar não sobrescreve preços, descrições, disponibilidade ou condições existentes.
- `DRAFT`, `AVAILABLE`, `RESERVED`, `SOLD`: estados do catálogo. Rascunhos não são exibidos no modo real.

Exemplo de comando local de gerenciamento — **somente quando a oferta da cidade estiver aprovada**:

```bash
npm run catalog:set -- boston AVAILABLE 99700 348500 18
npm run catalog:set -- boston RESERVED
npm run catalog:set -- boston SOLD
```

Argumentos: identificador da cidade, situação, entrada em centavos de reais, preço total em centavos, número de parcelas. Não existe painel administrativo web nem CRM. `npm run db:studio` é opcional para gerenciamento local; não exponha essa ferramenta à internet.

## Texto e seis fotografias

`src/content/city-page.ts` centraliza o texto compartilhado. `{city}` e `{county}` são substituídos para cada município. O arquivo original enviado está em `docs/content-boston-original.txt`. Comissão informada: 54% sobre marketing; 3% sobre serviços do advogado de imigração parceiro contratados por indicação do licenciado. As projeções são apresentadas sem garantia de resultado.

As seis artes originais recebidas estão em `public/photos/boston`, em ordem de 01 a 06 e sem alteração dos pixels. `photosByCity` associa cada galeria ao identificador da cidade: somente Boston exibe estas artes. O álbum aparece no catálogo antes de entrar nos detalhes e substitui o painel verde no topo da página da cidade, com navegação entre cards e ampliação para leitura. As outras 350 cidades aguardam suas próprias fotos. A logo embutida no card 06 é exibida por uma janela de enquadramento no cabeçalho/rodapé, preservando o original; um SVG de enquadramento também apresenta o símbolo como ícone. Uma logo separada em PNG transparente ou SVG poderá substituir essa origem. Gere novamente a prévia após adicionar imagens. As imagens da prévia são incorporadas ao próprio HTML para funcionar mesmo sem arquivos externos.

O perfil demográfico recebido é **somente de Boston**. Outras cidades exibem nome e condado e aguardam seus indicadores específicos. Os números de Boston são atribuídos ao material fornecido e não foram verificados independentemente.

## Carrinho e preparação para pagamentos

- Identificadores persistem no navegador; não há quantidade maior que um por cidade.
- A entrada do modelo é R$ 997,00; o valor total da licença é R$ 3.485,00.
- Saldo de R$ 2.488,00: 17 parcelas de R$ 138,22 e última de R$ 138,26.
- O total do carrinho inclui **apenas entradas**; o preço integral e o saldo são exibidos separadamente.
- O cálculo usa centavos inteiros para reconciliar a última parcela.
- `POST /api/cart/quote` aceita identificadores, busca preços e disponibilidade no servidor e ignora preços enviados pelo cliente.
- Itens desconhecidos, reservados ou vendidos não contribuem para o total de entradas disponíveis.
- Adicionar ao carrinho não reserva uma cidade. Nenhum pagamento é efetuado.

Antes de vender: configurar provedor de pagamento, pedidos, cobrança das parcelas, reserva transacional com vencimento para impedir duas vendas da mesma cidade, webhooks assinados e idempotentes, transição de disponibilidade após pagamento, contrato e políticas de venda. O status `RESERVED` existe, mas a reserva automática não está implementada.

## Futura VPS Hostinger

A aplicação está preparada para Node.js/PostgreSQL e saída Next.js standalone. Nada foi contratado ou implantado. Uma implantação futura precisará de credenciais de produção, HTTPS, domínio, supervisão do processo, banco privado e backups. A aplicação está marcada `noindex` enquanto é uma prévia.

O build standalone inclui `server.js`, `.next/static` e `public`. Depois de copiar a pasta `.next/standalone` para a VPS, execute seu `server.js` com `HOSTNAME=127.0.0.1`, `PORT` e `DATABASE_URL` configurados de forma segura atrás de um proxy HTTPS. Não copie a `.env` de desenvolvimento para produção.
