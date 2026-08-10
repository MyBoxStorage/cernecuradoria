# Sprint 4 — Contato

> Pré-requisito: Sprints 0-3 concluídos. Regras de design e movimento do `sprint-01-home.md`
> valem aqui também. Esta página tem a única parte do site com bastante interatividade real —
> é onde faz sentido usar Client Components sem culpa.

## Contexto importante

Este fluxo em etapas **substitui** a ideia original de "formulário + ferramenta de qualificação
separada" — as duas primeiras etapas já cumprem o papel de qualificação sóbria que havíamos
planejado como algo à parte. Não implementar nenhum widget de quiz adicional além deste fluxo.

Tom: sóbrio e editorial, igual ao resto do site. Sem barra de progresso com porcentagem, sem
ícone de "conquista", sem confete, sem emoji. Indicador de etapa discreto (ex: `1 / 4` em texto
pequeno), nunca um componente chamativo.

## Estrutura da página

### Intro (antes do fluxo)

- Eyebrow: `Contato`
- Título (H1): `Uma conversa sem compromisso.`
- Linha de abertura: `Preencha em menos de um minuto. Uso essas respostas só para entender a
  situação antes da nossa conversa — não existe resposta errada aqui.`

Logo abaixo da linha de abertura, antes do fluxo começar: `Prefere falar direto? Fale pelo
WhatsApp →` (link discreto, não botão, abre `https://wa.me/5521973003715` em nova aba — mesmo
número placeholder do botão flutuante).

### O fluxo (4 etapas, um Client Component controlando o estado local)

Transição entre etapas: fade curto (150–200ms), sem slide lateral decorativo, sem bounce.
Botão "Voltar" discreto disponível a partir da etapa 2. Nenhuma etapa pode travar o usuário —
todas as opções levam adiante, não existe caminho de "recusa" nesta interface.

**Etapa 1 — pergunta de múltipla escolha (botões grandes, um por linha, não dropdown):**
`Em que momento está o processo?`
- Inventário em andamento
- Mudança
- Divórcio
- Ainda não sei

**Etapa 2 — pergunta de múltipla escolha:**
`Como você descreveria o acervo da casa?`
- Muitos móveis e objetos de decoração
- Algumas peças de valor, mas não sei avaliar
- Prefiro conversar antes de decidir

**Etapa 3 — campo de texto curto:**
`Em que bairro fica o imóvel?`
(input livre, sem dropdown — placeholder no campo: "Ex: Leblon")

**Etapa 4 — dados de contato + envio:**
`Como posso te chamar, e por qual telefone posso responder?`
- Campo: Nome
- Campo: Telefone/WhatsApp
- Checkbox, desmarcado por padrão, texto: `Concordo com o uso dos meus dados conforme a
  [Política de Privacidade].` (link real para `/politica-de-privacidade`, mesmo essa página
  estando fora da navegação principal — o link direto funciona)
- Botão: `Solicitar avaliação gratuita` (desabilitado até o checkbox ser marcado e os dois
  campos preenchidos)

### Mensagens de estado

- Sucesso (substitui o fluxo pela mensagem, sem redirecionar de página): `Obrigado. Normalmente
  respondo em até 48 horas com os próximos passos.`
- Erro de envio: `Não foi possível enviar agora. Tente novamente, ou fale direto pelo WhatsApp.`
  (com o mesmo link de WhatsApp da intro)

## Envio via Resend (estruturar agora, ativar depois)

O Pedro Henrique vai criar a conta do Resend e o e-mail profissional só quando o site for
ativado de verdade. Por isso, este sprint deve deixar tudo **estruturado e funcional assim que
as variáveis forem preenchidas**, sem precisar mexer em código depois.

- Instalar o pacote `resend`.
- Criar uma Server Action (não API route) em `app/contato/actions.ts` que recebe os dados do
  fluxo e envia o e-mail via Resend.
- Variáveis de ambiente novas (adicionar ao `.env.example`, substituindo o
  `CONTACT_FORM_ENDPOINT` genérico que ficou do Sprint 0):
  ```
  # Resend — chave de API (criar em resend.com quando o site for ativado)
  RESEND_API_KEY=

  # Endereço de origem do e-mail. Sem domínio verificado ainda, usar o domínio de teste do
  # próprio Resend (onboarding@resend.dev) — funciona sem configuração. Trocar para um
  # endereço em @cernecuradoria.com.br só depois de verificar o domínio no painel do Resend.
  CONTACT_EMAIL_FROM=onboarding@resend.dev

  # Para onde os leads devem chegar. Até existir e-mail profissional, usar um e-mail pessoal
  # do Pedro Henrique aqui como placeholder.
  CONTACT_EMAIL_TO=
  ```
- Se `RESEND_API_KEY` estiver vazia, a Server Action deve falhar de forma controlada e mostrar a
  mensagem de erro já definida acima — nunca quebrar a build por variável ausente.
- Corpo do e-mail: simples, em texto, com todas as respostas do fluxo organizadas (etapa,
  resposta, nome, telefone, bairro) — sem necessidade de template HTML elaborado nesta fase.
- Adicionar um campo honeypot (input escondido via CSS, nunca por `display:none` puro — usar
  posicionamento fora da tela para não ser ignorado por leitores de tela de forma incorreta, ou
  `aria-hidden` combinado com `tabIndex={-1}`) para reduzir spam automatizado, sem exigir
  CAPTCHA nem fricção nenhuma para pessoas reais.

## SEO desta página

- `<title>`: `Contato — Cerne Curadoria`
- `meta description`: `Solicite uma avaliação gratuita e sem compromisso para o acervo da sua
  casa. Atendimento na Zona Sul do Rio de Janeiro e na Barra da Tijuca.`
- `BreadcrumbList` (Home → Contato).
- Adicionar `ContactPoint` dentro do schema `Organization` já existente (não um schema novo
  separado): `telephone` (mesmo placeholder), `contactType`: "customer service",
  `areaServed`: "BR", `availableLanguage`: "Portuguese".

## O que NÃO fazer

- Não adicionar CAPTCHA visível — o honeypot já resolve spam básico sem fricção.
- Não usar barra de progresso decorativa nem qualquer elemento de gamificação.
- Não implementar o envio de forma síncrona bloqueante sem estado de carregamento — o botão deve
  mostrar um estado simples de "enviando" (texto, não spinner colorido) enquanto processa.

## Ao final do sprint

`npm run build`, testar o fluxo completo nas 4 etapas em mobile e desktop, testar navegação só
por teclado (Tab entre opções, Enter confirmando), testar o comportamento com
`RESEND_API_KEY` vazia (deve cair no estado de erro, não quebrar), commit
`"sprint 4: contato"` e push. Reportar como ficou a transição entre etapas e se precisou de
ajuste no comportamento do botão desabilitado.
