"use client";
import { useState } from "react";
export function DemoPartnershipContact({ target }: { target: string }) {
  const [visible, setVisible] = useState(false);
  return <div className="demo-partnership-contact">
    <button className="btn" type="button" onClick={() => setVisible((current) => !current)} aria-expanded={visible}>Contato · Demonstração</button>
    {visible && <div className="demo-contact-details" role="status"><strong>Contato fictício · {target}</strong><p>O contato comercial definitivo será publicado aqui. Este exemplo não envia mensagens nem abre ligações.</p><button type="button" className="apple-text-link" onClick={() => setVisible(false)}>Fechar contato</button></div>}
  </div>;
}
