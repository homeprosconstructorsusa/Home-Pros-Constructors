# Estado do projeto para aprovação

## Antes desta continuação

Existiam arquivos Next.js/Tailwind, páginas inicial, catálogo vazio, detalhe e carrinho, schema/migration Prisma e configuração Docker. Não existiam commits no repositório, 351 registros de cidades, cliente Prisma funcional, catálogo navegável completo nem uma prévia portátil.

## Implementado nesta continuação

- Catálogo dos 351 municípios reais de Massachusetts, com 14 condados e fonte US Census Bureau.
- Busca por nome, filtros de condado/disponibilidade e estados de busca vazia.
- Rota individual para cada cidade; modelo compartilhado com o texto enviado.
- Comissões e estimativas conforme esclarecimento do responsável; projeções sem garantia.
- Álbum de cards no catálogo e no topo da página, com navegação e ampliação acessível para leitura.
- Perfil demográfico apenas em Boston, sem propagação de números para outras cidades.
- Condições de pagamento do modelo em reais e separação de entrada, total e saldo.
- Carrinho persistente, sem duplicidades, com remoção e limpeza.
- API de cotação por identificadores e valores calculados no servidor.
- PostgreSQL e Prisma 7 com migrations e seed de 351 rascunhos, sem sobrescrever dados existentes.
- Comando local para gerenciar situações, preços e parcelamento; sem painel web administrativo.
- Página inicial refinada em verde-escuro, branco e dourado, com chamada para trabalho remoto, imagem ilustrativa e percurso de escolha da cidade.
- Design responsivo, navegação acessível, metadados, tratamento de falhas e páginas inexistentes.
- HTML interativo autocontido para revisão sem hospedagem, usando os mesmos componentes React.
- Saída standalone e scripts para início em VPS no futuro.

## Pendente

- Receber as imagens específicas das outras 350 cidades. As seis artes de Boston já estão inseridas somente em Boston; a logo do último card está no cabeçalho, rodapé e ícone. Um arquivo separado da logo poderá substituir o enquadramento atual.
- Aprovação visual, final do texto/contrato e ofertas de cada cidade.
- Indicadores populacionais/econômicos específicos das outras 350 cidades.
- Painel administrativo web com autenticação, caso seja solicitado; hoje o gerenciamento é local.
- Pedidos, reserva automática transacional com vencimento, pagamentos, webhooks e cobrança de parcelas.
- Contrato definitivo, termos, privacidade e condições de cancelamento.
- Implantação, domínio, HTTPS e backups — fora da etapa atual.

A prévia não efetua vendas. Valores do modelo de Boston são aplicados às cidades apenas para revisão. A disponibilidade demonstrativa não representa inventário real. O banco real permanece em rascunho até as ofertas serem aprovadas.

## Validação nesta máquina

Instalação com lockfile, lint, TypeScript e build de produção passaram. Seis testes de dados/cálculo e nove testes de navegador passaram, incluindo os modos demonstrativo e PostgreSQL real, preservação de ofertas ao reexecutar o seed, filtros, páginas, carrinho, HTML autocontido e layout de desktop/celular. O teste do banco restaurou os dados temporários; os 351 registros reais continuam em rascunho.

A prévia HTML foi testada por um servidor local, bloqueando todas as outras requisições de rede. A abertura direta por file:// não pôde ser testada no Chromium gerenciado por restrição administrativa; o arquivo não depende de servidor para renderização.
