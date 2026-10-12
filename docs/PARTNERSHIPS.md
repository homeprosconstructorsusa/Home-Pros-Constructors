# Publicação de parcerias locais

O responsável confirmou que a seleção deve mostrar cidades com um responsável e abertas a parceiros. Isso é diferente da disponibilidade de uma licença para compra.

## Prévia

Os exemplos de Abington, Boston e Cambridge foram autorizados para demonstrar o fluxo. São identificados como fictícios e aparecem somente com `CATALOG_MODE=demo` ou na prévia HTML. O botão Contato mostra uma demonstração local, sem endereço real, envio de pedido, mensagem ou ligação.

## Contatos reais

`src/content/partnerships.ts` mantém uma lista vazia de contatos reais. Para publicar uma operação, adicionar um registro confirmado pelo responsável:

```ts
{
  stateSlug: "massachusetts",
  citySlug: "abington",
  responsibleName: "<nome aprovado do responsável>",
  contactHref: "<URL HTTPS, mailto: ou tel: aprovado>",
  acceptingPartnerships: true,
}
```

Os textos entre `<...>` são instruções de preenchimento, não contatos utilizáveis. A aplicação publica como aberta somente uma operação conhecida com nome, canal válido e aceite de parceiros. Operações fechadas, canais incompletos ou registros fictícios em modo real não aparecem como prontos para contato.

`src/lib/partnerships.ts` reaproveita os 351 municípios existentes; o registro de regiões permite adicionar estados aprovados no futuro. As URLs incluem estado e cidade para evitar colisões entre municípios de mesmo nome em estados diferentes. Não foram criados novos catálogos geográficos nesta etapa.

O caminho institucional utiliza a marca Home Pros Constructors e mantém acesso aos canais oficiais já fornecidos. Na prévia há também um contato fictício da empresa. Formulários de envio, pedidos, contratos de parceria, comissões e automações de comunicação não foram implementados nem definidos por esta alteração.
