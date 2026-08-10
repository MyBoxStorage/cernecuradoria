# Checklist de Ativação — Site Institucional Cerne Curadoria

> Consolidado a partir dos Sprints 0-7. O site está tecnicamente completo — tudo abaixo é
> operacional, não técnico. Assim que estes itens estiverem prontos, o site pode ir ao ar de
> verdade.

## 1. Contas externas (você precisa criar/configurar)

- [ ] Conectar o repositório `github.com/MyBoxStorage/cernecuradoria` a um projeto na Vercel.
- [ ] Nas configurações do projeto na Vercel: confirmar *Deployment Protection* em **Standard
      Protection** (padrão, gratuito) — mantém o domínio autogerado privado até você conectar o
      `.com.br`.
- [ ] Criar propriedade no Google Analytics 4 → colar o Measurement ID em `NEXT_PUBLIC_GA_ID`.
- [ ] Criar propriedade no Google Search Console → colar o código em
      `NEXT_PUBLIC_GSC_VERIFICATION`.
- [ ] Criar conta no Resend → colar a chave em `RESEND_API_KEY`.
- [ ] Definir `CONTACT_EMAIL_TO` (pode ser seu e-mail pessoal até ter um profissional).
- [ ] Definir `NEXT_PUBLIC_SITE_URL` (o domínio da Vercel por enquanto).

## 2. Quando comprar e conectar o `.com.br`

- [ ] Registrar `cernecuradoria.com.br`.
- [ ] Conectar o domínio ao projeto na Vercel.
- [ ] Atualizar `NEXT_PUBLIC_SITE_URL` para o domínio final e fazer novo deploy.
- [ ] Verificar o domínio no Resend (DNS) e trocar `CONTACT_EMAIL_FROM` para um endereço em
      `@cernecuradoria.com.br`.
- [ ] Criar e-mail profissional (`contato@cernecuradoria.com.br` ou similar).

## 3. Conteúdo que só você pode entregar

- [ ] Foto sua para a página Sobre (substituir o placeholder charcoal).
- [ ] CNPJ formalizado → preencher os placeholders da Política de Privacidade e Termos de Uso.
- [ ] Link real do Instagram da Cerne (quando existir) → footer + `sameAs` do schema.
- [ ] Link do seu LinkedIn (quando organizado) → `sameAs` do schema do fundador.
- [ ] Número real de WhatsApp Business (hoje está com seu número pessoal como placeholder em
      todo o site).

## 4. Liberar as páginas legais

- [ ] Quando tudo acima estiver pronto, mudar `SITE_LAUNCHED` para `true` em
      `lib/constants.ts` — isso faz Política de Privacidade e Termos de Uso aparecerem
      automaticamente na navegação/rodapé, sem precisar mexer em mais nada.

## 5. Antes de divulgar publicamente

- [ ] Rodar o Rich Results Test do Google no domínio real (não substitui o teste local, mas
      confirma que tudo funciona em produção).
- [ ] Conferir o LCP/INP/CLS reais no Vercel Speed Insights depois de alguns dias de tráfego.
- [ ] Escrever e publicar o primeiro artigo do blog (arquivo `.mdx` em `content/posts/`).

## O que NÃO bloqueia a ativação (pode evoluir depois)

- Rotina de posts do blog — começa quando você decidir, sem pressa.
- Ajustes finos de conteúdo — qualquer seção pode ser revisada depois, sempre via sessão comigo
  + Cursor.
- CRM próprio — fica para quando o volume de leads justificar (já registrado no documento
  mestre).
