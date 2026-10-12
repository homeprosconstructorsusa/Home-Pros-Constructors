# Estado do projeto para aprovação

## Antes desta continuação

Existiam arquivos Next.js/Tailwind, páginas inicial, catálogo vazio, detalhe e carrinho, schema/migration Prisma e configuração Docker. Não existiam commits no repositório, 351 registros de cidades, cliente Prisma funcional, catálogo navegável completo nem uma prévia portátil.

## Implementado nesta continuação

- Catálogo dos 351 municípios reais de Massachusetts, com 14 condados e fonte US Census Bureau.
- Busca por nome, filtros de condado/disponibilidade e estados de busca vazia.
- Página individual reorganizada: apresentação curta antes do álbum, entrada e valor total separados, textos completos em seções expansíveis e ordem de leitura adaptada ao celular.
- Rota individual para cada cidade; modelo compartilhado com o texto enviado. Abertura personalizada com o nome da cidade, Massachusetts, atendimento de casa e conexão com clientes nos Estados Unidos, seguida de orientação para níveis de inglês: sem inglês, intermediário e avançado.
- Comissões e estimativas conforme esclarecimento do responsável; projeções sem garantia.
- Álbum de cards no catálogo e após a apresentação curta da página individual, com navegação e ampliação acessível para leitura. Imagens dos álbuns e da página inicial reduzidas em 10% e depois em mais 15% sobre o tamanho ajustado (23,5% de redução acumulada), incluindo a prévia portátil.
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

Instalação com lockfile, lint, TypeScript e build de produção passaram. Seis testes de dados/cálculo e onze testes de navegador passaram, incluindo os modos demonstrativo e PostgreSQL real, preservação de ofertas ao reexecutar o seed, filtros, páginas, carrinho, HTML autocontido e layout de desktop/celular. O teste do banco restaurou os dados temporários; os 351 registros reais continuam em rascunho.

A prévia HTML foi testada por um servidor local, bloqueando todas as outras requisições de rede. A abertura direta por file:// não pôde ser testada no Chromium gerenciado por restrição administrativa; o arquivo não depende de servidor para renderização.

## Modelo em revisão: somente Abington

As últimas alterações de texto estão isoladas em `cityPageOverrides.abington`: trabalho de casa no Brasil ou de qualquer lugar do mundo, materiais personalizados ao longo do ano, 100 vídeos e uma seção final “Escola de inglês Home Pros School”. As outras 350 páginas permanecem com os textos anteriormente aprovados. Replicar este modelo somente após autorização explícita do responsável.

## Cursos e nova página inicial

- Página inicial com blocos de imagens, categorias e apresentação inspirada na clareza da referência Apple, mantendo a marca Home Pros.
- Menu Cursos → Curso de edição de vídeos, com navegação por teclado e celular.
- Duas ofertas aprovadas pelo responsável: R$ 297 com vínculo à Home Pros e direito exclusivo de edição da cidade por 1 ano; R$ 997 para curso completo e atuação independente, sem vínculo ou exclusividade de cidade.
- Busca nas 351 cidades e página própria de curso/direito de edição para cada cidade.
- `EditorCityOffer` mantém inventário independente das licenças comerciais, com 351 ofertas em rascunho. Nenhuma oferta foi reservada ou vendida.
- O vínculo da cidade permite também trabalhos freelancer para responsáveis por outras cidades, sujeito ao contrato específico.
- Preços e condições na configuração de ofertas; nenhuma matrícula, pagamento ou direito é criado na prévia.

Faltam o conteúdo final e acesso às aulas, o contrato da exclusividade (incluindo renovação e alcance), cancelamento, pedidos e pagamento dos cursos. As inscrições permanecem desativadas. A oferta independente não é uma licença comercial de cidade. As revisões específicas de Abington nas páginas de licenças continuam isoladas; não foram replicadas.


## Revisão da página inicial, navegação e fotografias — 12/10/2026

- Categoria e primeiro destaque: Agência Americana de Marketing. Imagens e nomes das categorias ampliados com proporções responsivas; destaque de edição transferido para o final da página inicial.
- Cinco fotografias fornecidas pelo responsável em `imagens .zip`, otimizadas para WebP, substituem as imagens artificiais nas categorias, destaques da página inicial e páginas dos cursos. A foto de escritório também compõe o fundo suave da abertura. Nenhuma fotografia foi gerada com IA nesta revisão. Os fundos previamente aprovados das páginas de licenças e carrinho continuam existentes.
- Cabeçalho Home / Licenças / Loja / Cursos / Contato e carrinho. Painéis amplos para Licenças e Cursos com hover, clique, teclado, toque, fechamento explícito e Escape. Licenças mantém uma entrada geral para futuros estados sem criar novos catálogos.
- Loja apresenta somente as ofertas existentes com links funcionais e informação de preparação; Contato usa somente as redes sociais oficiais fornecidas e informa a falta de dados de contato direto.
- Marca original em favicon ICO com 16/32/48 pixels e ícone Apple de 180 pixels; ícones também incorporados à prévia portátil.
- Preços, condições, disponibilidade, carrinho e conteúdo das licenças preservados. O texto específico de Abington não foi replicado.

Ainda dependem do responsável: e-mail/telefone oficiais para contato direto, eventuais produtos adicionais da loja, programa definitivo e contrato dos cursos, e aprovação final de ofertas/contratos. Pagamentos e inscrições continuam desabilitados. Nenhum website foi publicado e nenhuma hospedagem foi contratada.

A configuração reutilizável de rede do ambiente recebeu os domínios `images.pexels.com` e `www.pexels.com` para uma possível consulta futura de fotografias. Salvar esse rascunho não alterou a rede em execução; nenhuma imagem externa foi baixada. O envio posterior das cinco fotos resolveu a necessidade desta revisão sem dependência desses domínios.
