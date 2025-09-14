// Minimal starter; expand later.
// Must be on window.* so our loader can find it.
window.TASK_TEMPLATES = [
  {
  id: 'none',
  slug: 'none',
  label: '— Template Picker —',
  kind: 'none',
  categories: ['none'],
  tags: ['type:none','type:helper','use:framework-picker', 'use:template-picker','topic:meta'],
  use_cases: [
    'help me pick the best framework',
    'explain which framework fits my task',
    'produce a ready-to-copy prompt using the chosen framework'
  ],
  boosters: [
    'Ask up to 3 clarifying questions before recommending.',
    'Return 3 candidate frameworks with a short rationale.',
    'Then synthesize a ready-to-copy prompt using the best candidate.'
  ],
  definition: 'A helper that recommends the most suitable tool or generates a prompt to do so.',
  help: 'Describe your goal and context. A full list of the template options will be included when you use the copy/open buttons.',
  fields: [
    
    { key:'goal',        label:'Goal / outcome', type:'textarea', ph:'What do you want to achieve?' },
    { key:'stage',       label:'Where are you in the process?', type:'select',
      options:['explore','define','ideate','plan','analyze','compare/decide','prioritize','evaluate/review','troubleshoot/debug','problom solve','motivate','other']
    },
    { key:'deliverable', label:'Desired deliverable', type:'text', ph:'e.g., one-pager, plan, checklist' },
    { key:'constraints', label:'Constraints', type:'textarea', ph:'Deadlines, tone, tools, privacy…' },
    { key:'include',     label:'Prefer tags (comma/space separated)', type:'text', ph:'e.g., marketing, ideation' },
    { key:'exclude',     label:'Exclude tags (comma/space separated)', type:'text', ph:'e.g., philosophy' }
  ],
  // Visible preview: NO full digest here — a note tells the user it will be added on copy/open.
  template: ({goal,stage,deliverable,constraints,include,exclude,ctx}) => {
    const all = Array.isArray(window.FRAMEWORKS)
      ? window.FRAMEWORKS
      : (Array.isArray(window.TEMPLATES) ? window.TEMPLATES : []);
    const base = (all||[]).filter(f => f && f.id && f.id !== 'none');

    // --- Deduplicate by slug → label (lowercased)
    const seen = new Set();
    const list = [];
    for (const f of base) {
      const key = String(f.slug || f.label || f.id).trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      list.push(f);
    }

    // --- Primitive, lightweight scoring for shortlist (tokens from goal/deliverable/constraints)
    const toWords = s => String(s||'').toLowerCase();
    const toks = toWords([goal,deliverable,constraints].join(' '))
      .split(/[^a-z0-9]+/).filter(Boolean);

    function hay(f){
      return [
        f.label, f.definition, f.help,
        (f.tags||[]).join(' '),
        (f.categories||[]).join(' '),
        (f.use_cases||[]).join(' ')
      ].join(' ').toLowerCase();
    }
    function score(f){
      const h = hay(f);
      let s = 0;
      for (const t of toks){ if (t && h.includes(t)) s += 1; }
      return s;
    }

    const ranked = list.map(f => ({f, s:score(f)}))
      .sort((a,b)=> b.s - a.s || String(a.f.label).localeCompare(String(b.f.label)));

    const shortlist = ranked.slice(0,7)
      .map(x => `- ${x.f.label}`)
      .sort((a,b)=> a.localeCompare(b)) // stable, readable
      .join('\n');

    const total = list.length;

    return [
      'Template Picker — helper',
      ctx && `Context: ${ctx}`,
      goal && `Goal: ${goal}`,
      stage && `Stage: ${stage}`,
      deliverable && `Desired deliverable: ${deliverable}`,
      constraints && `Constraints: ${constraints}`,
      'Task for the assistant:',
      'Your job is to choose the best listed tool (e.g., framework, method, techique, scaffold, etc...) for helping the user achieve their desired goal/outcome or problem based on their situation',
      '1) Ask up to 3 clarifying questions if needed.',
      '2) Recommend the top 3 tools (from the list below) with one-paragraph rationale each.',
      '3) Pick one and produce a ready-to-copy prompt on using that tool, tailored to the Goal, Context, and Constraints.',
      '4) If none fit well, suggest the an alternative or the closest match, and what is missing.'
    ].filter(Boolean).join('\n');
  }
},

  // Example task (keep or remove; it helps smoke-test)
   {
    id: 'task_email',
    slug: 'email-draft-and-polish',
    label: 'Email — Draft & Polish',
    kind: 'task',
    categories: ['communication', 'writing'],
    tags: [
      'type:task','topic:email',
      'use:outreach','use:follow-up','use:networking','use:support','use:ops','use:sales'
    ],
    use_cases: [
      'cold outreach to a prospect or partner',
      'follow-up after a meeting or webinar',
      'warm intro / networking nudge',
      'customer support or service recovery',
      'status/update, scheduling, or request',
      'job application or recruiter reply'
    ],
    definition: 'Compose a targeted, high-conversion email (subject, preheader, body) tailored to your context and goals.',
    help: 'Fill what you can—everything is optional except Recipient and Call to Action. Paste prior thread and samples to match tone. “Additional instructions” will auto-prefill boosters unless you type your own.',
    fields: [
      { key:'recipient',       label:'Recipient',                   type:'text',     ph:'VP of Ops at Acme' },
      { key:'email_type',      label:'Email type',                  type:'select',
        options:[
          {value:'cold outreach',        label:'Cold outreach'},
          {value:'follow-up',            label:'Follow-up'},
          {value:'intro',                label:'Warm intro / networking'},
          {value:'status update',        label:'Project / status update'},
          {value:'support',              label:'Customer support'},
          {value:'apology',              label:'Apology / service recovery'},
          {value:'thank you',            label:'Thank you / appreciation'},
          {value:'meeting scheduling',   label:'Scheduling / logistics'},
          {value:'request',              label:'Request / ask'},
          {value:'job application',      label:'Job application / recruiter'}
        ],
        desc:'Shapes structure & CTA defaults.'
      },

      /* Persona-powered typeahead: draws from persona.data.js (free text allowed) */
      { key:'style_persona',   label:'Style persona (optional)',    type: 'typeahead', autofill: 'persona->textarea',
        ph:'e.g., “Seasoned PM”, “Warm mentor”, “Analytical consultant”',
        desc:'Type to search your persona library.'
      },

      /* Dual-tone selector (second is optional) */
      { key:'tone_primary',    label:'Tone',                        type:'select',
        options:[
          'professional','friendly','polite','confident','humble',
          'direct','concise','warm','empathetic','authoritative',
          'casual','formal','inquisitive','urgent','apologetic','no-nonsense'
        ],
        desc:'Primary tone for the body.'
      },
      { key:'tone_secondary',  label:'Tone (2nd, optional)',        type:'select',
        options:[
          '— none —','professional','friendly','polite','confident','humble',
          'direct','concise','warm','empathetic','authoritative',
          'casual','formal','inquisitive','urgent','apologetic','no-nonsense'
        ],
        desc:'Leave at “— none —” if you don’t want a blend.'
      },

      /* Length control */
      { key:'length',          label:'Length',                      type:'select',
        options:[
          {value:'ultra',  label:'Ultra-short (≤60 words)'},
          {value:'short',  label:'Short (≤120 words)'},
          {value:'medium', label:'Medium (≤200 words)'},
          {value:'long',   label:'Long (≤400 words)'}
        ],
        desc:'Controls body length (subject/preheader not counted).'
      },

      /* Core inputs */
      { key:'context',         label:'Context',                     type:'textarea', ph:'Where you found them / why relevant' },
      { key:'value',           label:'Value to emphasize',          type:'textarea', ph:'What they gain in concrete terms' },
      { key:'cta',             label:'Call to Action',              type:'text',     ph:'Propose 2 time slots next week' },

      /* Subject guidance */
      { key:'subject_hint',    label:'Subject hint (optional)',     type:'text',     ph:'e.g., “Cut churn 12% in 30 days”' },
      { key:'subject_style',   label:'Subject style',               type:'select',
        options:['straightforward','benefit-led','question','numbered','curiosity-safe'],
        desc:'Guides how subject options are phrased.'
      },
      { key:'variants',        label:'How many body variations?',   type:'select',   options:['1','2','3'] },

      /* Continuity & voice control */
      { key:'history',         label:'Prior thread / notes (optional)', type:'textarea', ph:'Paste relevant snippets or the last email' },
      { key:'style_samples',   label:'Your writing samples (optional)', type:'textarea', ph:'Paste 1–2 short samples' },

      /* Guardrails & footer */
      { key:'constraints',     label:'Constraints (optional)',      type:'textarea', ph:'Compliance, banned phrases, legal notes' },
      { key:'signature',       label:'Signature block (optional)',  type:'textarea', ph:'Name · Title · Company · Phone · Links' }
    ],

    /* Default “boosters” auto-fill Additional instructions when box is empty. */
    boosters: [
      'Offer 3 subject line options and one plain preheader (≤85 chars).',
      'Open with a concrete hook from the context—no generic flattery.',
      'Make the CTA easy to accept (specific times / one-click yes).',
      'Grade 6–8 readability; short sentences; scannable line breaks.',
      'If prior thread is provided, maintain continuity with one explicit reference.',
      'Only add a P.S. if it adds new value.'
    ],

    /* Prompt template → becomes the preview text the app copies/opens. */
    template: (f) => {
      const join2 = (a,b)=>[a,b].filter(Boolean).join(' + ');
      const tones = join2(
        f.tone_primary,
        (f.tone_secondary && f.tone_secondary !== '— none —') ? f.tone_secondary : ''
      );
      const lenMap = { ultra:'≤60 words', short:'≤120 words', medium:'≤200 words', long:'≤400 words' };
      const lenStr = lenMap[f.length] || '≤200 words';
      const variants = Math.max(1, parseInt(f.variants || '1', 10));

      const ctx = f.ctx || f.usecase || '';          // common context (left pane)
      const audience = f.audience || '';
      const style = f.style || '';
      const toneCommon = f.tone || '';               // common tone (left pane)

      const persona = f.style_persona ? `Write in the voice of: ${f.style_persona}.` : '';
      const subjPref = f.subject_hint ? `Subject preference: ${f.subject_hint}` : '';
      const subjStyle = f.subject_style ? `Subject style: ${f.subject_style}.` : '';
      const history = f.history ? `Prior context:\n<<<\n${f.history}\n>>>` : '';
      const samples = f.style_samples ? `Writing samples:\n<<<\n${f.style_samples}\n>>>` : '';
      const constraints = f.constraints ? `Constraints: ${f.constraints}` : '';
      const sig = f.signature ? `Signature:\n${f.signature}` : '';

      const outRules = [
        'Output format:',
        '- Line 1: Subject: <one best subject>',
        '- Line 2: Preview: <preheader, ≤85 chars>',
        '- Then: Email body',
        sig && '- Include the provided signature at the end.',
        variants > 1 && '- Separate each body variant with a line containing only: ---'
      ].filter(Boolean).join('\n');

      return [
        'Draft a high-quality email.',
        `Email type: ${f.email_type || 'general'}.`,
        f.recipient && `Recipient: ${f.recipient}`,
        ctx && `Context: ${ctx}`,
        audience && `Audience: ${audience}`,
        style && `Style: ${style}`,
        (tones || toneCommon) && `Tone: ${tones || toneCommon}`,
        `Length: ${lenStr}`,
        persona,
        f.value && `Value to emphasize: ${f.value}`,
        f.cta && `Primary call to action: ${f.cta}`,
        subjPref,
        subjStyle,
        history,
        samples,
        constraints,
        outRules,
        (variants > 1) ? `Produce ${variants} body variants.` : 'Produce 1 body.'
      ].filter(Boolean).join('\n');
    }
  },
/* ---------------------------------------------------------
   TASK: DM — Outreach & Follow-up
--------------------------------------------------------- */
{
  id: 'task_dm',
  slug: 'direct-message',
  label: 'DM — Outreach & Follow-up',
  kind: 'task',
  categories: ['communication','writing'],
  tags: ['type:task','topic:dm','use:outreach','use:follow-up','use:networking'],
  definition: 'Compose a short, platform-aware direct message that earns a quick yes.',
  help: 'Keep it tight. Add context and a single, easy CTA. Leave “Additional instructions” empty to use boosters.',
  fields: [
    { key:'platform',   label:'Platform', type:'select',
      options:[
        'LinkedIn','Twitter/X','Instagram','Facebook','Discord','Slack','Reddit'
      ], desc:'Guides tone, character norms, and link etiquette.'
    },
    { key:'recipient',  label:'Recipient', type:'text', ph:'Product lead at Finix' },
    { key:'relationship', label:'Relationship', type:'select',
      options:['cold','warm (light prior touch)','known colleague','friend/peer','internal teammate']
    },
    { key:'style_persona', label:'Style persona (optional)', type:'typeahead',
      ph:'e.g., “Helpful PM”, “Curious analyst”'
    },
    { key:'tone_primary',  label:'Tone', type:'select',
      options:['professional','friendly','polite','confident','humble','direct','concise','warm','empathetic','authoritative','casual','inquisitive','urgent','no-nonsense']
    },
    { key:'tone_secondary', label:'Tone (2nd, optional)', type:'select',
      options:['— none —','professional','friendly','polite','confident','humble','direct','concise','warm','empathetic','authoritative','casual','inquisitive','urgent','no-nonsense']
    },
    { key:'length',     label:'Length', type:'select',
      options:[
        {value:'ultra',label:'Ultra-short (≤50 words)'},
        {value:'short',label:'Short (≤90 words)'}
      ]
    },
    { key:'context',    label:'Context', type:'textarea', ph:'Where you saw them / why relevant' },
    { key:'value',      label:'Value to emphasize', type:'textarea', ph:'What they gain in concrete terms' },
    { key:'cta',        label:'Call to Action', type:'text', ph:'Quick yes/no ask or 2 slots' },
    { key:'link',       label:'Optional link', type:'text', ph:'URL to include (if any)' },
    { key:'emoji',      label:'Emoji policy', type:'select', options:['none','sparing','friendly'] },
    { key:'variants',   label:'How many DM variants?', type:'select', options:['1','2','3'] },
    { key:'history',    label:'Prior thread / notes (optional)', type:'textarea' },
    { key:'constraints',label:'Constraints (optional)', type:'textarea', ph:'No hype; avoid buzzwords' }
  ],
  boosters: [
    'Make line 1 hooky (≤50 chars) and specific to the recipient.',
    'One ask only. Provide a trivial accept path (button, yes/no, or two times).',
    'Personalize with a concrete detail from Context—no generic flattery.',
    'Respect platform norms: if Twitter/X, keep under 280 chars; avoid link overload on LinkedIn.',
    'Skip signature blocks in DMs; use first name if needed.'
  ],
  template: (f)=>{
    const join2=(a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones=join2(f.tone_primary,(f.tone_secondary&&f.tone_secondary!=='— none —')?f.tone_secondary:'');
    const lenMap={ultra:'≤50 words',short:'≤90 words'};
    const lenStr=lenMap[f.length]||'≤90 words';
    const variants=Math.max(1,parseInt(f.variants||'1',10));
    const ctx=f.ctx||'';
    const toneCommon=f.tone||'';
    const persona=f.style_persona?`Write in the voice of: ${f.style_persona}.`:'';
    const platform=f.platform||'DM';
    const link=f.link?`Include link: ${f.link}`:'';
    const history=f.history?`Prior context:\n<<<\n${f.history}\n>>>`:'';
    const constraints=f.constraints?`Constraints: ${f.constraints}`:'';

    const outRules=[
      'Output format:',
      '- Provide the DM body only (no greeting lines like “Dear”).',
      '- Keep the first line ≤50 characters.',
      (variants>1)&&`- Provide ${variants} variants separated by a line with only: ---`
    ].filter(Boolean).join('\n');

    return [
      `Draft a ${platform} direct message.`,
      f.recipient&&`Recipient: ${f.recipient}`,
      f.relationship&&`Relationship: ${f.relationship}`,
      ctx&&`Context: ${ctx}`,
      (tones||toneCommon)&&`Tone: ${tones||toneCommon}`,
      `Length: ${lenStr}`,
      persona,
      f.value&&`Value to emphasize: ${f.value}`,
      f.cta&&`Primary call to action: ${f.cta}`,
      link,
      history,
      constraints,
      outRules
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Memo — TL;DR + Recommendation
--------------------------------------------------------- */
{
  id: 'task_memo',
  slug: 'memo-draft',
  label: 'Memo — TL;DR + Recommendation',
  kind: 'task',
  categories: ['communication','writing'],
  tags: ['type:task','topic:memo','use:internal','use:decision'],
  definition: 'Draft a crisp memo with TL;DR, background, analysis, recommendation, risks, and next steps.',
  help: 'Great memos are skimmable. Provide key points; the template will structure the rest.',
  fields: [
    { key:'title',      label:'Working title', type:'text', ph:'Reduce churn in Q4' },
    { key:'audience',   label:'Audience', type:'select',
      options:['team','leadership','all-hands','cross-functional','customers'] },
    { key:'purpose',    label:'Purpose', type:'select',
      options:['inform','propose decision','request resources','share update'] },
    { key:'tone_primary', label:'Tone', type:'select',
      options:['professional','direct','concise','authoritative','neutral','empathetic'] },
    { key:'tone_secondary', label:'Tone (2nd, optional)', type:'select',
      options:['— none —','professional','direct','concise','authoritative','neutral','empathetic'] },
    { key:'length',     label:'Length', type:'select',
      options:[
        {value:'short',label:'Short (≈1 page)'},
        {value:'medium',label:'Medium (≈2 pages)'},
        {value:'long',label:'Long (≈3–4 pages)'}
      ]
    },
    { key:'background', label:'Background', type:'textarea', ph:'What led to this memo' },
    { key:'key_points', label:'Key points (bullets)', type:'textarea', ph:'• Point A\n• Point B' },
    { key:'analysis',   label:'Analysis (optional)', type:'textarea' },
    { key:'recommend',  label:'Recommendation', type:'textarea' },
    { key:'risks',      label:'Risks / tradeoffs', type:'textarea' },
    { key:'next_steps', label:'Next steps', type:'textarea', ph:'Owner · Due date' },
    { key:'attachments',label:'Links / appendix (optional)', type:'textarea' },
    { key:'variants',   label:'How many variants?', type:'select', options:['1','2'] },
    { key:'constraints',label:'Constraints (optional)', type:'textarea' }
  ],
  boosters: [
    'Start with “TL;DR” in 2–3 bullets.',
    'Use H2-style section headers; prefer bullets over long paragraphs.',
    'Make the recommendation explicit and testable; add owners/dates in Next steps.',
    'Call out risks with mitigations.',
    'Keep readability around Grade 8–10.'
  ],
  template: (f)=>{
    const join2=(a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones=join2(f.tone_primary,(f.tone_secondary&&f.tone_secondary!=='— none —')?f.tone_secondary:'');
    const lenMap={short:'≈1 page',medium:'≈2 pages',long:'≈3–4 pages'};
    const lenStr=lenMap[f.length]||'≈2 pages';
    const variants=Math.max(1,parseInt(f.variants||'1',10));
    const constraints=f.constraints?`Constraints: ${f.constraints}`:'';

    const outRules=[
      'Output format:',
      '- Title line',
      '- TL;DR (2–3 bullets)',
      '- Background',
      f.key_points&&'- Key points',
      f.analysis&&'- Analysis',
      '- Recommendation',
      f.risks&&'- Risks / Tradeoffs',
      f.next_steps&&'- Next steps (with owners and due dates)',
      f.attachments&&'- Appendix / Links',
      (variants>1)&&`- Provide ${variants} memo variants separated by: ---`
    ].filter(Boolean).join('\n');

    return [
      'Draft an internal memo.',
      f.title&&`Title: ${f.title}`,
      f.audience&&`Audience: ${f.audience}`,
      f.purpose&&`Purpose: ${f.purpose}`,
      (tones||f.tone)&&`Tone: ${tones||f.tone}`,
      `Length: ${lenStr}`,
      f.background&&`Background:\n${f.background}`,
      f.key_points&&`Key points:\n${f.key_points}`,
      f.analysis&&`Analysis:\n${f.analysis}`,
      f.recommend&&`Recommendation:\n${f.recommend}`,
      f.risks&&`Risks / tradeoffs:\n${f.risks}`,
      f.next_steps&&`Next steps:\n${f.next_steps}`,
      f.attachments&&`Appendix:\n${f.attachments}`,
      constraints,
      outRules
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Letter — Formal / Personal
--------------------------------------------------------- */
{
  id: 'task_letter',
  slug: 'letter-draft',
  label: 'Letter — Formal / Personal',
  kind: 'task',
  categories: ['communication','writing'],
  tags: ['type:task','topic:letter','use:formal','use:personal'],
  definition: 'Compose a well-structured letter (formal or personal) with appropriate salutation and sign-off.',
  fields: [
    { key:'recipient',     label:'Recipient', type:'text', ph:'Hiring Manager at Flux' },
    { key:'letter_type',   label:'Letter type', type:'select',
      options:['cover','recommendation','complaint','appreciation','apology','request','general'] },
    { key:'subject_hint',  label:'Subject (optional)', type:'text' },
    { key:'style_persona', label:'Style persona (optional)', type:'typeahead' },
    { key:'tone_primary',  label:'Tone', type:'select',
      options:['formal','professional','warm','respectful','concise','empathetic','apologetic'] },
    { key:'tone_secondary',label:'Tone (2nd, optional)', type:'select',
      options:['— none —','formal','professional','warm','respectful','concise','empathetic','apologetic'] },
    { key:'length',        label:'Length', type:'select',
      options:[
        {value:'short',label:'Short (≤200 words)'},
        {value:'medium',label:'Medium (≤350 words)'},
        {value:'long',label:'Long (≤500 words)'}
      ]
    },
    { key:'context',       label:'Context', type:'textarea' },
    { key:'body_points',   label:'Key points to cover', type:'textarea', ph:'• Reason for writing\n• Supporting detail' },
    { key:'cta',           label:'Ask / CTA (optional)', type:'text' },
    { key:'closing',       label:'Preferred sign-off', type:'select',
      options:['Sincerely','Best regards','Warmly','Respectfully','Thank you'] },
    { key:'signature',     label:'Signature block', type:'textarea', ph:'Name · Title · Contact' },
    { key:'variants',      label:'How many variants?', type:'select', options:['1','2'] },
    { key:'constraints',   label:'Constraints (optional)', type:'textarea' }
  ],
  boosters: [
    'Use an appropriate salutation based on formality.',
    'Open with purpose in the first sentence; add 1–2 supporting paragraphs.',
    'Keep paragraphs short; one idea per paragraph.',
    'End with a clear, polite ask (if CTA provided) and a courteous sign-off.'
  ],
  template: (f)=>{
    const join2=(a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones=join2(f.tone_primary,(f.tone_secondary&&f.tone_secondary!=='— none —')?f.tone_secondary:'');
    const lenMap={short:'≤200 words',medium:'≤350 words',long:'≤500 words'};
    const lenStr=lenMap[f.length]||'≤350 words';
    const variants=Math.max(1,parseInt(f.variants||'1',10));

    const outRules=[
      'Output format:',
      '- Greeting line',
      '- Body (2–4 short paragraphs)',
      f.cta&&'- Include CTA clearly',
      '- Sign-off line',
      f.signature&&'- Signature block',
      (variants>1)&&`- Provide ${variants} letters separated by: ---`
    ].filter(Boolean).join('\n');

    return [
      'Draft a letter.',
      f.letter_type&&`Letter type: ${f.letter_type}`,
      f.recipient&&`Recipient: ${f.recipient}`,
      f.subject_hint&&`Subject preference: ${f.subject_hint}`,
      (tones||f.tone)&&`Tone: ${tones||f.tone}`,
      `Length: ${lenStr}`,
      f.style_persona&&`Write in the voice of: ${f.style_persona}.`,
      f.context&&`Context:\n${f.context}`,
      f.body_points&&`Key points:\n${f.body_points}`,
      f.cta&&`Ask / CTA: ${f.cta}`,
      f.closing&&`Sign-off preference: ${f.closing}`,
      f.signature&&`Signature:\n${f.signature}`,
      f.constraints&&`Constraints: ${f.constraints}`,
      outRules
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Announcement — What/When/Why/Action
--------------------------------------------------------- */
{
  id: 'task_announcement',
  slug: 'announcement-draft',
  label: 'Announcement — Change & Action',
  kind: 'task',
  categories: ['communication','writing'],
  tags: ['type:task','topic:announcement','use:internal','use:external'],
  definition: 'Announce a change with a clear headline, effective date, impact, and action required.',
  fields: [
    { key:'channel',    label:'Channel', type:'select',
      options:['email','Slack/Teams','intranet','blog/website','meeting script'] },
    { key:'audience',   label:'Audience', type:'text', ph:'All customers · Engineering · APAC' },
    { key:'headline',   label:'Headline (optional)', type:'text' },
    { key:'effective',  label:'Effective date/time', type:'text', ph:'Oct 12, 10:00 PT' },
    { key:'tone_primary', label:'Tone', type:'select',
      options:['professional','concise','friendly','supportive','neutral','urgent'] },
    { key:'tone_secondary', label:'Tone (2nd, optional)', type:'select',
      options:['— none —','professional','concise','friendly','supportive','neutral','urgent'] },
    { key:'length',     label:'Length', type:'select',
      options:[
        {value:'short',label:'Short (≤120 words)'},
        {value:'medium',label:'Medium (≤200 words)'}
      ]
    },
    { key:'what',       label:'What is changing', type:'textarea' },
    { key:'why',        label:'Why it matters', type:'textarea' },
    { key:'impact',     label:'Who is impacted', type:'textarea' },
    { key:'action',     label:'Action required', type:'textarea', ph:'Steps, deadlines' },
    { key:'links',      label:'Resources / links', type:'textarea' },
    { key:'contact',    label:'Owner / contact', type:'text', ph:'ops@company.com' },
    { key:'variants',   label:'How many variants?', type:'select', options:['1','2'] },
    { key:'constraints',label:'Constraints (optional)', type:'textarea' }
  ],
  boosters: [
    'Lead with what is changing and the effective date.',
    'State who is impacted and exactly what action is required.',
    'Keep scanning easy: short paragraphs or bullets, bold key terms if channel allows.',
    'Provide a support contact and links for more info.'
  ],
  template: (f)=>{
    const join2=(a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones=join2(f.tone_primary,(f.tone_secondary&&f.tone_secondary!=='— none —')?f.tone_secondary:'');
    const lenMap={short:'≤120 words',medium:'≤200 words'};
    const lenStr=lenMap[f.length]||'≤200 words';
    const variants=Math.max(1,parseInt(f.variants||'1',10));

    const outRules=[
      'Output format:',
      '- Headline',
      '- Body with labeled sections: What, When, Why, Impact, Action, Resources, Contact',
      (variants>1)&&`- Provide ${variants} variants separated by: ---`
    ].filter(Boolean).join('\n');

    return [
      'Draft an announcement.',
      f.channel&&`Channel: ${f.channel}`,
      f.audience&&`Audience: ${f.audience}`,
      f.headline&&`Headline preference: ${f.headline}`,
      (tones||f.tone)&&`Tone: ${tones||f.tone}`,
      `Length: ${lenStr}`,
      f.effective&&`Effective: ${f.effective}`,
      f.what&&`What is changing:\n${f.what}`,
      f.why&&`Why it matters:\n${f.why}`,
      f.impact&&`Who is impacted:\n${f.impact}`,
      f.action&&`Action required:\n${f.action}`,
      f.links&&`Resources:\n${f.links}`,
      f.contact&&`Contact: ${f.contact}`,
      f.constraints&&`Constraints: ${f.constraints}`,
      outRules
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Press Release — AP style
--------------------------------------------------------- */
{
  id: 'task_press_release',
  slug: 'press-release',
  label: 'Press Release — AP Style',
  kind: 'task',
  categories: ['communication','writing'],
  tags: ['type:task','topic:press-release','use:pr','use:launch'],
  definition: 'Standard AP-style press release with headline, subhead, dateline, body, quotes, boilerplate, and media contact.',
  fields: [
    { key:'org',        label:'Organization', type:'text', ph:'Acme, Inc.' },
    { key:'headline',   label:'Headline', type:'text' },
    { key:'subhead',    label:'Subhead (optional)', type:'text' },
    { key:'dateline_city', label:'Dateline city', type:'text', ph:'SAN FRANCISCO' },
    { key:'dateline_date', label:'Dateline date', type:'text', ph:'September 14, 2025' },
    { key:'tone_primary', label:'Tone', type:'select', options:['professional','authoritative','neutral'] },
    { key:'length',     label:'Length', type:'select',
      options:[
        {value:'medium',label:'Medium (≈500–700 words)'},
        {value:'long',label:'Long (≈800–1000 words)'}
      ]
    },
    { key:'summary',    label:'Announcement summary', type:'textarea' },
    { key:'details',    label:'Details / features', type:'textarea' },
    { key:'quotes',     label:'Quotes (one per line, add attribution)', type:'textarea', ph:'“Quote text” — Name, Title' },
    { key:'availability',label:'Availability / timing', type:'text' },
    { key:'pricing',    label:'Pricing (if applicable)', type:'text' },
    { key:'cta',        label:'Call to action / link', type:'text' },
    { key:'boilerplate',label:'Boilerplate (About)', type:'textarea' },
    { key:'media_contact', label:'Media contact', type:'textarea', ph:'Name · Email · Phone' },
    { key:'constraints',label:'Constraints (optional)', type:'textarea' }
  ],
  boosters: [
    'Use inverted pyramid structure; put the news up top.',
    'Write in AP style; avoid marketing superlatives unless in quotes.',
    'Include 1–2 concise quotes with names and titles.',
    'End with boilerplate and media contact; use “###” to indicate end.'
  ],
  template: (f)=>{
    const lenMap={medium:'≈500–700 words',long:'≈800–1000 words'};
    const lenStr=lenMap[f.length]||'≈600–800 words';
    const quotes=f.quotes?`Quotes:\n${f.quotes}`:'';
    const constraints=f.constraints?`Constraints: ${f.constraints}`:'';

    return [
      'Draft a press release in AP style.',
      f.org&&`Organization: ${f.org}`,
      f.headline&&`Headline: ${f.headline}`,
      f.subhead&&`Subhead: ${f.subhead}`,
      (f.dateline_city||f.dateline_date)&&`Dateline: ${[f.dateline_city,f.dateline_date].filter(Boolean).join(', ')}`,
      `Length: ${lenStr}`,
      f.summary&&`Summary:\n${f.summary}`,
      f.details&&`Details / features:\n${f.details}`,
      quotes,
      f.availability&&`Availability: ${f.availability}`,
      f.pricing&&`Pricing: ${f.pricing}`,
      f.cta&&`CTA / Link: ${f.cta}`,
      f.boilerplate&&`Boilerplate:\n${f.boilerplate}`,
      f.media_contact&&`Media contact:\n${f.media_contact}`,
      constraints,
      [
        'Output format:',
        '- HEADLINE',
        '- Subhead',
        '- DATELINE — Lead paragraph',
        '- Body paragraphs (details, context)',
        '- Quotes (properly attributed)',
        '- Boilerplate (About)',
        '- Media contact',
        '- End with: ###'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
}
];