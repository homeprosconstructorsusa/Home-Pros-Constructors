# Estado do projeto para aprovação

## Antes desta continuação

Existiam arquivos Next.js/Tailwind, páginas inicial, catálogo vazio, detalhe e carrinho, schema/migration Prisma e configuração Docker. Não existiam commits no repositório, 351 registros de cidades, cliente Prisma funcional, catálogo navegável completo nem uma prévia portátil.

## Implementado nesta continuação

- Catálogo dos 351 municípios reais de Massachusetts, com 14 condados e fonte US Census Bureau.
- Busca por nome, filtros de condado/disponibilidade e estados de busca vazia.
- Rota individual para cada cidade; modelo compartilhado com o texto enviado. Abertura personalizada com o nome da cidade, Massachusetts, atendimento de casa e conexão com clientes nos Estados Unidos, seguida de orientação para níveis de inglês: sem inglês, intermediário e avançado.
- Comissões e estimativas conforme esclarecimento do responsável; projeções sem garantia.
- Álbum de cards no catálogo e no topo da página, com navegação e ampliação acessível para leitura. Imagens dos álbuns e da página inicial reduzidas em 10% e depois em mais 15% sobre o tamanho ajustado (23,5% de redução acumulada), incluindo a prévia portátil.
- Seis artes gerais aprovadas nas 351 cidades; Home Pros School por último, com início das aulas no 1º trimestre de 2027; os textos da página especificam o curso avançado.
- Perfil demográfico apenas em Boston, sem propagação de números para outras cidades.
- Condições de pagamento do modelo em reais e separação de entrada, total e saldo.
- Carrinho persistente, sem duplicidades, com remoção e limpeza.
- API de cotação por identificadores e valores calculados no servidor.
- PostgreSQL e Prisma 7 com migrations e seed de 351 rascunhos, sem sobrescrever dados existentes.
- Comando local para gerenciar situações, preços e parcelamento; sem painel web administrativo.
- Design mais claro e minimalista, com tipografia do sistema, verde e detalhes dourados, cartões translúcidos e fundos fotográficos com opacidade e degradê: Estátua da Liberdade na página inicial, Franklin na seção de escolha do estado e em Boston, profissional em Abington e Estátua da Liberdade com bandeira no carrinho e no catálogo de Massachusetts. Os fundos foram preparados a partir das referências enviadas, sem textos publicitários nem barras do celular.
- Design responsivo, navegação acessível, metadados, tratamento de falhas e páginas inexistentes.
- Links oficiais do YouTube, Instagram e Facebook no rodapé de todas as páginas, incluindo a prévia portátil.
- HTML interativo autocontido para revisão sem hospedagem, usando os mesmos componentes React.
- Saída standalone e scripts para início em VPS no futuro.

## Pendente

- Um arquivo separado da logo poderá substituir o enquadramento atual; a marca original já aparece no cabeçalho, rodapé e ícone.
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
