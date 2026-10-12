# Planejamento da área do aluno

Hoje existe somente uma apresentação revisável da Home Pros School. Login, aulas, chat, voz, cobrança e matrícula não foram implementados nem ativados.

## Decisões pendentes

- Periodicidade da cobrança proposta de R$ 99, prazo de acesso e cancelamento.
- Programa, níveis, critérios de avaliação e calendário. A previsão já comunicada para o curso avançado é o primeiro trimestre de 2027.
- Frequência da prática de cinco minutos: por dia, aula, semana ou outro limite.
- Orçamento de uso de IA por aluno, considerando texto e voz.

## Implementação futura

1. Criar contas próprias dos alunos e sessões autenticadas no website. Isso não conecta automaticamente a conta ChatGPT do responsável ou de um aluno.
2. Vincular a matrícula e o acesso à conta, com verificação no servidor e cobrança conforme as condições definidas. A compra de inglês não concede uma licença de cidade nem um cargo de gerente.
3. Integrar a API da OpenAI para prática escrita e, após validação de custo, conversação de voz. Manter a chave da API no servidor; qualquer credencial temporária de voz deve ser emitida somente para alunos autenticados com acesso e quota válidos.
4. Limitar duração, frequência e uso simultâneo no servidor. O cronômetro da interface sozinho não controla a quota. Encerrar sessões ao atingir o limite e registrar o consumo necessário para evitar uso fora do plano.
5. Começar com prática de inglês e simulações de atendimento. Atendimento a clientes reais exige definição própria de canais, responsabilidades e fluxo; não está incluído nesta etapa.
6. Informar como atividades e histórico serão armazenados, com acesso restrito ao aluno e aos responsáveis autorizados. Não exibir dados de outros alunos.

A API possui cobrança própria de uso, separada de uma assinatura ChatGPT. Não há estimativa de custo fixada: o orçamento depende da frequência, dos modelos e do formato aprovados. Nenhuma chamada paga, cadastro de usuário ou envio a clientes foi realizado nesta etapa.
