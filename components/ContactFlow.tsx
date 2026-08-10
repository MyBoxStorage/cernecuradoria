"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  submitContactLead,
  type ContactActionResult,
} from "@/app/contato/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getWhatsAppUrl } from "@/lib/constants";
import "@/styles/contato.css";

const MOMENT_OPTIONS = [
  "Inventário em andamento",
  "Mudança",
  "Divórcio",
  "Ainda não sei",
] as const;

const ACERVO_OPTIONS = [
  "Muitos móveis e objetos de decoração",
  "Algumas peças de valor, mas não sei avaliar",
  "Prefiro conversar antes de decidir",
] as const;

const TOTAL_STEPS = 4;
const FADE_MS = 180;

type Status = "form" | "success" | "error";

export function ContactFlow() {
  const [step, setStep] = useState(1);
  const [panelVisible, setPanelVisible] = useState(true);
  const [status, setStatus] = useState<Status>("form");
  const [submitting, setSubmitting] = useState(false);

  const [moment, setMoment] = useState("");
  const [acervo, setAcervo] = useState("");
  const [bairro, setBairro] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const reduceMotionRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const goToStep = useCallback((next: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (reduceMotionRef.current) {
      setStep(next);
      setPanelVisible(true);
      return;
    }

    setPanelVisible(false);
    timerRef.current = setTimeout(() => {
      setStep(next);
      setPanelVisible(true);
    }, FADE_MS);
  }, []);

  function selectMoment(value: string) {
    setMoment(value);
    goToStep(2);
  }

  function selectAcervo(value: string) {
    setAcervo(value);
    goToStep(3);
  }

  function continueFromBairro(event: FormEvent) {
    event.preventDefault();
    if (!bairro.trim()) return;
    goToStep(4);
  }

  const canSubmit =
    Boolean(name.trim() && phone.trim() && consent) && !submitting;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    let result: ContactActionResult;

    try {
      result = await submitContactLead({
        moment,
        acervo,
        bairro: bairro.trim(),
        name: name.trim(),
        phone: phone.trim(),
        company: honeypot,
      });
    } catch {
      result = { ok: false, reason: "send" };
    }

    setSubmitting(false);

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-flow">
        <div className="contact-flow__inner contact-status">
          <p className="contact-status__text">
            Obrigado. Normalmente respondo em até 48 horas com os próximos
            passos.
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="contact-flow">
        <div className="contact-flow__inner contact-status">
          <p className="contact-status__text">
            Não foi possível enviar agora. Tente novamente, ou{" "}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              fale direto pelo WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-flow">
      <div className="contact-flow__inner">
        <div className="contact-flow__meta">
          <span className="contact-flow__step-count" aria-live="polite">
            {step} / {TOTAL_STEPS}
          </span>
          {step > 1 ? (
            <button
              type="button"
              className="contact-flow__back"
              onClick={() => goToStep(step - 1)}
            >
              Voltar
            </button>
          ) : (
            <span />
          )}
        </div>

        <div
          className={`contact-flow__panel${panelVisible ? "" : " contact-flow__panel--leaving"}`}
          aria-hidden={!panelVisible}
        >
          {step === 1 ? (
            <div>
              <h2 className="contact-flow__question">
                Em que momento está o processo?
              </h2>
              <ul className="contact-options">
                {MOMENT_OPTIONS.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      className="contact-option"
                      onClick={() => selectMoment(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <h2 className="contact-flow__question">
                Como você descreveria o acervo da casa?
              </h2>
              <ul className="contact-options">
                {ACERVO_OPTIONS.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      className="contact-option"
                      onClick={() => selectAcervo(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {step === 3 ? (
            <form onSubmit={continueFromBairro}>
              <h2 className="contact-flow__question">
                Em que bairro fica o imóvel?
              </h2>
              <div className="contact-fields">
                <Input
                  label="Bairro"
                  placeholder="Ex: Leblon"
                  value={bairro}
                  onChange={(event) => setBairro(event.target.value)}
                  autoComplete="address-level2"
                  required
                />
                <Button
                  type="submit"
                  className="contact-flow__submit"
                  disabled={!bairro.trim()}
                >
                  Continuar
                </Button>
              </div>
            </form>
          ) : null}

          {step === 4 ? (
            <form onSubmit={handleSubmit}>
              <h2 className="contact-flow__question">
                Como posso te chamar, e por qual telefone posso responder?
              </h2>
              <div className="contact-fields">
                <div className="contact-honeypot" aria-hidden="true">
                  <label>
                    Empresa
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                    />
                  </label>
                </div>

                <Input
                  label="Nome"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
                <Input
                  label="Telefone/WhatsApp"
                  placeholder="(21) 90000-0000"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  required
                />

                <label className="contact-consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  <span>
                    Concordo com o uso dos meus dados conforme a{" "}
                    <Link href="/politica-de-privacidade">
                      Política de Privacidade
                    </Link>
                    .
                  </span>
                </label>

                <Button
                  type="submit"
                  className="contact-flow__submit"
                  disabled={!canSubmit}
                >
                  {submitting ? "Enviando…" : "Solicitar avaliação gratuita"}
                </Button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}
