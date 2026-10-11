// Shared copy supplied by the owner. {city} and {county} substitute municipality data.
export type CityPagePhoto = { src: string; alt: string; caption?: string };
export const cityPageContent: {
  introduction: string | null;
  photos: CityPagePhoto[];
  sections: { title: string; body: string }[];
} = {
  introduction:
    "Trabalhe de casa representando a Home Pros Constructors em {city}, com treinamento, materiais personalizados e suporte para atender clientes e comercializar serviços de marketing digital.\n\nAtendemos companhias de brasileiros e americanos nos Estados Unidos e no Canadá, ajudando profissionais da construção e de serviços residenciais a fortalecer sua presença na internet, divulgar seus trabalhos e alcançar mais clientes.\n\nVocê pode atuar de qualquer lugar do mundo, mesmo começando sem conhecimento de inglês. A capacitação começa pelo atendimento a brasileiros e inclui o aprendizado progressivo do idioma, preparando o licenciado para atender clientes americanos com maior autonomia.",
  photos: [], // Waiting for the owner's six photographs, order and alt descriptions.
  sections: [
    {
      title: "Serviços que comercializamos",
      body: "• Criação de websites.\n• Filmagens em campo e com drone.\n• Produção de vídeos publicitários.\n• Criação de logomarcas.\n• Administração de redes sociais.\n• Criação e otimização do Google Business Profile — Google Meu Negócio.\n• Gestão de anúncios no Google e no Facebook.\n• Criação de cartões digitais.\n• Divulgação em guia de serviços locais.\n• Apoio na apresentação de serviços e elaboração de orçamentos.\n\nNosso foco abrange 100 categorias de serviços da construção e de manutenção residencial, incluindo pintura, limpeza, reformas e outras especialidades. Ajudamos essas companhias a ampliar sua presença digital e a serem encontradas por clientes da região.",
    },
    {
      title: "Assessorias e serviços de parceiros",
      body: "Além das soluções de marketing digital, o licenciado poderá apresentar aos clientes serviços de parceiros especializados, como:\n\n• Assessoria para solicitação de visto americano de turismo.\n• Assessoria para processos de imigração e residência permanente nos Estados Unidos.\n• Atendimento jurídico com advogados especializados em imigração.\n\nA análise de cada caso e a execução desses serviços ficam sob responsabilidade dos respectivos profissionais. A contratação da assessoria não garante a aprovação de vistos ou de processos de imigração.",
    },
    {
      title: "Remuneração do licenciado",
      body: "O licenciado receberá comissão de 54% sobre as vendas dos serviços de marketing digital comercializados, conforme os critérios e condições definidos no contrato de licença.\n\nNos serviços de imigração contratados com o advogado parceiro por indicação do licenciado, a comissão prevista é de 3%, conforme os critérios e condições do respectivo acordo. A execução desses serviços fica sob responsabilidade do advogado parceiro.",
    },
    {
      title: "Sua atuação como licenciado",
      body: "Você não precisa criar websites nem executar os serviços de marketing digital vendidos. A Home Pros Constructors fica responsável pela produção e execução dos serviços contratados.\n\nSeu papel será atender os clientes vinculados à sua cidade de representação, apresentar as soluções disponíveis, acompanhar as solicitações e manter o relacionamento comercial, com treinamento e suporte da Home Pros Constructors.",
    },
    {
      title: "Materiais e treinamento",
      body: "O licenciado receberá:\n\n• Website direcionado à cidade de {city}.\n• Videoaulas e orientações para organizar a presença digital do projeto.\n• Treinamento para atendimento ao cliente e apresentação dos serviços.\n• Capacitação progressiva em inglês, do nível inicial ao atendimento com maior autonomia.\n• Arquivos personalizados para {city}, incluindo identidade visual, banners, descrições das redes sociais e textos para conteúdos.\n• Materiais para estruturar a presença do projeto no YouTube, Facebook, Instagram e X.\n• Suporte para desenvolver sua atuação na cidade de representação.",
    },
    {
      title: "Projeção comercial — sem garantia de resultado",
      body: "A projeção comercial informada pela Home Pros Constructors é de R$ 11.000,00 a R$ 18.000,00 de faturamento bruto mensal, após um período estimado de implementação de seis meses.\n\nEssa projeção não representa garantia de resultado. O faturamento depende das vendas realizadas, dos clientes atendidos e do desenvolvimento da operação. Os valores brutos são anteriores a custos e despesas; não representam lucro líquido nem a remuneração individual do licenciado.\n\nA faixa projetada de R$ 4.000,00 a R$ 8.000,00 mensais refere-se à remuneração líquida estimada do licenciado, conforme esclarecimento do responsável. É uma estimativa comercial, não uma garantia de renda; o resultado individual dependerá das vendas, dos custos e das condições contratuais.",
    },
  ],
};
export function cityCopy(text: string, city: string, county: string) {
  return text.replaceAll("{city}", city).replaceAll("{county}", county);
}
