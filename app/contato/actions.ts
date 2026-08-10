"use server";

import { Resend } from "resend";
import { SITE_NAME } from "@/lib/constants";

export type ContactLeadPayload = {
  moment: string;
  acervo: string;
  bairro: string;
  name: string;
  phone: string;
  /** Honeypot — deve permanecer vazio. */
  company?: string;
};

export type ContactActionResult =
  | { ok: true }
  | { ok: false; reason: "config" | "validation" | "send" };

export async function submitContactLead(
  payload: ContactLeadPayload,
): Promise<ContactActionResult> {
  // Bot preenchendo honeypot: responde como sucesso silencioso
  if (payload.company?.trim()) {
    return { ok: true };
  }

  const name = payload.name?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const bairro = payload.bairro?.trim() ?? "";
  const moment = payload.moment?.trim() ?? "";
  const acervo = payload.acervo?.trim() ?? "";

  if (!name || !phone || !bairro || !moment || !acervo) {
    return { ok: false, reason: "validation" };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim();
  const from =
    process.env.CONTACT_EMAIL_FROM?.trim() || "onboarding@resend.dev";

  if (!apiKey || !to) {
    return { ok: false, reason: "config" };
  }

  const text = [
    `Novo lead — ${SITE_NAME}`,
    "",
    `Nome: ${name}`,
    `Telefone/WhatsApp: ${phone}`,
    `Bairro: ${bairro}`,
    "",
    `Etapa 1 — Momento do processo: ${moment}`,
    `Etapa 2 — Acervo: ${acervo}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[${SITE_NAME}] Avaliação — ${name}`,
      text,
    });

    if (error) {
      return { ok: false, reason: "send" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "send" };
  }
}
