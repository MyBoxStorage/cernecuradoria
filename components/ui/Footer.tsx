import Link from "next/link";
import { AREAS_SERVED, SITE_LAUNCHED } from "@/lib/constants";
import "./ui.css";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer__wordmark">
          CERNE
          <span>Curadoria</span>
        </div>
        <p className="footer__area">{AREAS_SERVED}</p>
      </div>

      <div>
        <div className="footer__col-title">Contato</div>
        <div className="footer__links">
          {/* TODO: link real */}
          <a href="#">Instagram</a>
          {/* TODO: link real */}
          <a href="#">WhatsApp</a>
        </div>
      </div>

      <div>
        {SITE_LAUNCHED ? (
          <>
            <div className="footer__col-title">Legal</div>
            <div className="footer__links">
              <Link href="/politica-de-privacidade">Política de Privacidade</Link>
              <Link href="/termos-de-uso">Termos de Uso</Link>
            </div>
          </>
        ) : null}
      </div>
    </footer>
  );
}
