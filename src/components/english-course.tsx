import Image from "next/image";
import Link from "next/link";
import { englishCourseOffer } from "@/content/english-course";
import { money } from "@/lib/license";

export function EnglishCourse() {
  const course = englishCourseOffer;
  return (
    <section className="shell page-space information-page english-school-page">
      <p className="eyebrow">Inglês online · Oferta em preparação</p>
      <h1 className="page-title">{course.title}.</h1>
      <p className="information-lead">Pratique seu inglês. Desenvolva sua comunicação.</p>
      <p>Uma proposta de curso predominantemente online, com prática de escrita e atividades para desenvolver sua comunicação em inglês.</p>
      <div className="english-school-layout">
        <div>
          <Image src="/photos/real/team.webp" alt="Pessoas reunidas à mesa com um laptop e materiais de trabalho." width={1920} height={2880} sizes="(min-width: 1200px) 700px, (min-width: 760px) 60vw, 100vw" className="english-school-photo" />
          <div className="english-school-details">
            <article><h2>Prática de escrita</h2><p>Atividades online para praticar a escrita, construir vocabulário e desenvolver a comunicação. O programa e os níveis do curso serão detalhados antes da abertura das inscrições.</p></article>
            <article><h2>Conversação com IA · Planejada</h2><p>A proposta inclui sessões de {course.proposedConversationMinutes} minutos para praticar inglês. A frequência, os limites e o formato ainda estão em definição. Este recurso ainda não está disponível.</p></article>
            <article><h2>Área do aluno · Em preparação</h2><p>Um acesso individual para acompanhar as atividades está planejado. O cadastro, o login e o acesso às aulas ainda não estão habilitados nesta prévia.</p></article>
            <article><h2>Curso avançado</h2><p>Início das aulas previsto para o {course.advancedCourseStart}. O calendário completo será apresentado antes das inscrições.</p></article>
          </div>
        </div>
        <aside className="summary-card english-school-summary" aria-label="Proposta da Home Pros School">
          <span className="badge status-draft">Em preparação</span>
          <h2>{course.title}</h2>
          <p>Preço proposto</p>
          <strong className="complete-course-price">{money(course.priceCents, course.currency)}</strong>
          <p>{course.billingDescription}</p>
          <button className="btn w-full" disabled>Inscrição ainda não habilitada</button>
          <p>Pagamento, acesso às aulas e conversação serão habilitados após a definição das condições e a implementação dos recursos.</p>
          <Link href="/courses/video-editing" className="apple-text-link">Conhecer edição de vídeos →</Link>
        </aside>
      </div>
    </section>
  );
}
