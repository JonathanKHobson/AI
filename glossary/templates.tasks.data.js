;(function(root){
  root.TASK_TEMPLATES = [

  {
  id: 'none',
  slug: 'none',
  label: '— Task Picker —',
  kind: 'helper',
  categories: ['template-picker'],
  tags: ['type:helper','use:framework-picker', 'use:template-picker','topic:meta'],
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
      'type:task','topic:email','topic:writing',
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
      { key:'style_persona',
  label:'Style persona (optional)',
  type:'repeater',
  itemType:'typeahead',
  itemLabel:'persona',
  autofill:'persona->inline',
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
  tags: ['type:task','topic:writing','topic:dm','use:outreach','use:follow-up','use:networking'],

  definition: 'Compose a short, platform-aware direct message that earns a quick yes.',
  help: 'Keep it tight. Add context and a single, easy CTA. Leave “Constraints” empty to let boosters kick in.',

  fields: [
    {
      key:'platform',
      label:'Platform',
      type:'select',
      desc:'Guides tone, character norms, link etiquette, and formatting.',
      options:[
        {
          label:'LinkedIn',
          value:'Platform: LinkedIn DM. Keep it skimmable with short lines. Avoid multiple links (≤1). Professional, friendly. Use a human first-name signoff if needed. No emoji unless “friendly” policy. Mention 1 concrete mutual or role-relevance.'
        },
        {
          label:'Twitter/X',
          value:'Platform: Twitter/X DM. Keep under 280 characters per variant. One link max. Punchy opening (≤50 chars). Use casual but credible tone; no hashtags. If link present, place at end.'
        },
        {
          label:'Instagram',
          value:'Platform: Instagram DM. Conversational, warm, light. Prefer no links; if necessary, 1 link, promise context. Keep lines short; emojis allowed if policy permits.'
        },
        {
          label:'Facebook',
          value:'Platform: Facebook DM. Friendly and concise. Avoid corporate jargon. 1 link max. Reference a shared group/page if relevant.'
        },
        {
          label:'Discord',
          value:'Platform: Discord DM. Casual, concise, low-fluff. No formal signoff. Use inline code/quote sparingly if helpful. Avoid links unless necessary; if included, set context first.'
        },
        {
          label:'Slack',
          value:'Platform: Slack DM. Work-appropriate and concise. Start with a crisp ask; include two times or yes/no. Avoid signatures. No more than one link; add a 3–5 word link label.'
        },
        {
          label:'Reddit',
          value:'Platform: Reddit DM. Neutral-friendly tone, no marketing speak. Cite the exact thread or comment. Avoid links unless requested; if used, describe content plainly.'
        }
      ]
    },

    { key:'recipient',  label:'Recipient', type:'text', ph:'e.g., Product Lead at Finix' },

    {
      key:'relationship',
      label:'Relationship',
      type:'select',
      desc:'Shapes the opener, credibility, and ask size.',
      options:[
        {
          label:'Cold',
          value:'Relationship: Cold outreach. Earn permission in the first line with a concrete relevance hook. Prove you did your homework (1 detail). Keep the ask trivially easy (yes/no or two time slots).'
        },
        {
          label:'Warm (light prior touch)',
          value:'Relationship: Warm touch. Reference the exact prior interaction (event, post, reply). Build from that thread. Slightly bigger ask allowed, but still ≤15 minutes or async reply.'
        },
        {
          label:'Known colleague',
          value:'Relationship: Known colleague. Skip pleasantries; lead with context and the single action needed. Offer mutual benefit and a short deadline window.'
        },
        {
          label:'Friend/peer',
          value:'Relationship: Friend/peer. Personal, light tone. Acknowledge relationship briefly; keep ask respectful of time, include a flexible fallback.'
        },
        {
          label:'Internal teammate',
          value:'Relationship: Internal teammate. Be direct and action-oriented. Include the “why,” the exact deliverable, and a due-by option. No fluff; point to the doc/task link.'
        }
      ]
    },

    {
      key:'style_persona',
      label:'Style persona (optional)',
      type:'repeater',
      itemType:'typeahead',
      itemLabel:'persona',
      autofill:'persona->inline',
      ph:'e.g., “Helpful PM”, “Curious analyst”, “Empathic coach”',
      desc:'Search your persona library to add voice cues. Multiple personas will be blended.'
    },

    {
      key:'tone_primary',
      label:'Tone',
      type:'select',
      options:['professional','friendly','polite','confident','humble','direct','concise','warm','empathetic','authoritative','casual','inquisitive','urgent','no-nonsense']
    },
    {
      key:'tone_secondary',
      label:'Tone (2nd, optional)',
      type:'select',
      options:['— none —','professional','friendly','polite','confident','humble','direct','concise','warm','empathetic','authoritative','casual','inquisitive','urgent','no-nonsense']
    },

    {
      key:'length',
      label:'Length',
      type:'select',
      options:[
        {value:'ultra',label:'Ultra-short (≤50 words)'},
        {value:'short',label:'Short (≤90 words)'}
      ]
    },

    { key:'context',    label:'Context', type:'textarea', ph:'Where you saw them / why relevant / mutuals / thread' },
    { key:'value',      label:'Value to emphasize', type:'textarea', ph:'What they gain in concrete terms' },
    { key:'cta',        label:'Call to Action', type:'text', ph:'Quick yes/no ask or offer 2 time slots' },

    { key:'link',       label:'Optional link', type:'text', ph:'URL to include (if any)' },

    {
      key:'emoji',
      label:'Emoji policy',
      type:'select',
      desc:'Controls whether emojis are allowed and how many.',
      options:[
        {label:'None',     value:'Emoji policy: none. Do not use emojis.'},
        {label:'Sparing',  value:'Emoji policy: sparing. ≤1 emoji, only if it clarifies tone.'},
        {label:'Friendly', value:'Emoji policy: friendly. ≤2 emojis, context-appropriate; never replace crucial words.'}
      ]
    },

    { key:'variants',   label:'How many DM variants?', type:'select', options:['1','2','3'] },

    { key:'history',    label:'Prior thread / notes (optional)', type:'textarea', ph:'Paste relevant snippets or prior exchanges' },
    { key:'constraints',label:'Constraints (optional)', type:'textarea', ph:'No hype; avoid buzzwords; US spelling' }
  ],

  boosters: [
    'Make line 1 hooky (≤50 chars) and specific to the recipient.',
    'One ask only. Provide a trivial accept path (button, yes/no, or two times).',
    'Personalize with a concrete detail from Context—no generic flattery.',
    'Respect platform norms: e.g., Twitter/X ≤280 chars; LinkedIn ≤1 link.',
    'Skip signatures in DMs; first name is fine if needed.'
  ],

  template: (f) => {
    const join2 = (a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones = join2(
      f.tone_primary,
      (f.tone_secondary && f.tone_secondary !== '— none —') ? f.tone_secondary : ''
    );
    const lenMap = { ultra:'≤50 words', short:'≤90 words' };
    const lenStr = lenMap[f.length] || '≤90 words';
    const variants = Math.max(1, parseInt(f.variants||'1',10));

    const personaList = Array.isArray(f.style_persona) ? f.style_persona.filter(Boolean) : (f.style_persona ? [f.style_persona] : []);
    const personaLine = personaList.length ? `Write in the blended voice of: ${personaList.join(' | ')}.` : '';

    const platformDirective   = f.platform ? String(f.platform) : 'Platform: Generic DM. Keep concise and human.';
    const relationshipDirective = f.relationship ? String(f.relationship) : 'Relationship: Unspecified; assume respectful, relevance-first cold intro.';

    const linkLine = f.link ? `Include exactly one link at the end: ${f.link}` : 'No links unless essential.';
    const emojiPolicy = f.emoji ? String(f.emoji) : 'Emoji policy: none.';

    const outRules = [
      'Output format:',
      '- Provide the DM body only (no formal greeting like “Dear”).',
      '- Keep the first line ≤50 characters.',
      `- Target length: ${lenStr}.`,
      (variants>1) && `- Provide ${variants} variants separated by a line with only: ---`
    ].filter(Boolean).join('\n');

    return [
      'Compose a platform-aware direct message that earns a quick yes.',
      platformDirective,
      relationshipDirective,
      (tones || f.tone) && `Tone: ${tones || f.tone}`,
      personaLine,
      f.recipient && `Recipient: ${f.recipient}`,
      f.context   && `Personalization context: ${f.context}`,
      f.value     && `Value to emphasize: ${f.value}`,
      f.cta       && `Primary call to action: ${f.cta}`,
      linkLine,
      emojiPolicy,
      f.history   && `Prior context:\n<<<\n${f.history}\n>>>`,
      f.constraints && `Constraints: ${f.constraints}`,
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
  tags: ['type:task','topic:writing','topic:memo','use:internal','use:decision'],
  definition: 'Draft a crisp memo with TL;DR, background, analysis, recommendation, risks, and next steps.',
  help: 'Great memos are skimmable. Provide key points; the template will structure the rest.',
  fields: [
    { key:'title',      label:'Working title', type:'text', ph:'Reduce churn in Q4' },
    { key:'audience',   label:'Audience', type:'select',
      options:['team','leadership','all-hands','cross-functional','customers'] },
          { key:'style_persona', label:'Style persona (optional)',   
    type:'repeater',
  itemType:'typeahead',
  itemLabel:'persona',
  autofill:'persona->inline',
ph:'e.g., “Helpful PM”, “Curious analyst”',
    desc:'Type to search your persona library.'

    },
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
      f.style_persona&&`Write in the voice of: ${f.style_persona}.`,
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
  tags: ['type:task','topic:writing',
      'use:outreach','topic:letter','use:formal','use:personal'],
  definition: 'Compose a well-structured letter (formal or personal) with appropriate salutation and sign-off.',
  fields: [
    { key:'recipient',     label:'Recipient', type:'text', ph:'Hiring Manager at Flux' },
    { key:'letter_type',   label:'Letter type', type:'select',
      options:['cover','recommendation','complaint','appreciation','apology','request','general'] },
    { key:'subject_hint',  label:'Subject (optional)', type:'text' },
    { key:'style_persona', label:'Style persona (optional)',   type:'repeater', 
    itemType:'typeahead', 
    itemLabel:'persona',
    autofill:'persona->inline', 
ph:'e.g., “Helpful PM”, “Curious analyst”',
    desc:'Type to search your persona library.'
 },
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
  tags: ['type:task','topic:writing',
      'use:outreach','topic:announcement','use:internal','use:external'],
  definition: 'Announce a change with a clear headline, effective date, impact, and action required.',
  fields: [
    { key:'channel',    label:'Channel', type:'select',
      options:['email','Slack/Teams','intranet','blog/website','meeting script'] },
    { key:'audience',   label:'Audience', type:'text', ph:'All customers · Engineering · APAC' },
        { key:'style_persona', label:'Style persona (optional)',   type:'repeater', 
    itemType:'typeahead', 
    itemLabel:'persona',
    autofill:'persona->inline', 
ph:'e.g., “Helpful PM”, “Curious analyst”',
    desc:'Type to search your persona library.'
},
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
      f.style_persona&&`Write in the voice of: ${f.style_persona}.`,
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
  tags: ['type:task','topic:writing',
      'use:outreach','topic:press-release','use:pr','use:launch'],
  definition: 'Standard AP-style press release with headline, subhead, dateline, body, quotes, boilerplate, and media contact.',
  fields: [
    { key:'org',        label:'Organization', type:'text', ph:'Acme, Inc.' },
        { key:'style_persona', label:'Style persona (optional)',   type:'repeater', 
    itemType:'typeahead', 
    itemLabel:'persona',
    autofill:'persona->inline', 
ph:'e.g., “Helpful PM”, “Curious analyst”',
    desc:'Type to search your persona library.'
 },
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
      'Finalize a written press release in AP style.',
      f.org&&`Organization: ${f.org}`,
      f.style_persona&&`Write in the voice of: ${f.style_persona}.`,
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
},

/* ---------------------------------------------------------
   TASK: Resume — Tailor / Rewrite / Feedback
--------------------------------------------------------- */
{
  id: 'resume',
  slug: 'resume-tailor-rewrite-feedback',
  label: 'Resume — Tailor / Rewrite / Feedback',
  kind: 'task',
  categories: ['career','personal-admin'],
  tags: [
    'type:task','topic:writing',
      'topic:resume','use:job','use:job-application',
    'use:ats','use:editing','use:feedback'
  ],

  use_cases: [
    'tailor an existing resume to a specific job description',
    'rewrite a resume from raw notes or outdated draft',
    'receive critique with section scores and example fixes',
    'generate ATS-safe and recruiter-friendly variants',
    'draft an optional cover letter alongside resume'
  ],

  definition: 'Create, tailor, or critique a resume for a specific job — ATS-friendly, concise, and outcome-led using RAP (Result → Action → Problem) bullets.',

  help: 'Paste the job description and resume info. Choose Tailor, Rewrite, Feedback, or Hybrid mode. Fields are grouped by Job Target, Applicant Basics, Content Inputs, and Preferences. Leave blanks if not needed; boosters auto-kick in.',

  fields: [
    // MODE
    { key:'mode', label:'What do you want?', type:'select',
      options:[
    { 
      value:'Tailor my existing resume to this specific job description. Prioritize relevance, mirror JD keywords naturally for ATS, trim unrelated content, and surface my most impactful results.',  
      label:'Tailor my resume to this job' 
    },
    { 
      value:'Rewrite my resume from scratch using the info provided. Reorganize sections, unify tone, generate strong RAP bullets, ensure ATS readiness, and produce a polished, recruiter-friendly draft.', 
      label:'Rewrite from scratch using my info' 
    },
    { 
      value:'Provide detailed critique of my resume without rewriting. Score ATS readiness, clarity, and impact. Give section-by-section notes and propose targeted fixes with example RAP rewrites.', 
      label:'Critique + line edits only' 
    },
    { 
      value:'Provide a hybrid response: critique and prioritized fixes while also lightly tailoring the resume to the job description. Do not perform a full rewrite.',  
      label:'Hybrid: Light tailoring + feedback' 
    }
      ]
    },

    // JOB TARGET
{ 
  key:'target_role', 
  label:'Target role/title', 
  type:'text',  
  desc:'The exact job title as written in the job description. ATS systems match this literally — use “Product Manager” not “Product Mgmt.”',
  ph:'e.g., Senior UX Researcher'
},
{ 
  key:'company', 
  label:'Company', 
  type:'text',
  desc:'The company you’re applying to. Helps tailor values, mission, and impact language.',
  ph:'e.g., OpenAI'
},
{ 
  key:'company_values', 
  label:'Company values / notes', 
  type:'textarea',
  desc:'Cultural or strategic signals you’ve researched — from the careers page, blog, Glassdoor, or news. This guides tone and alignment.',
  ph:'e.g., Emphasizes ethical AI, inclusivity, and fast iteration'
},
  { 
  key:'job_description', 
  label:'Job description (paste full text)', 
  type:'textarea',
  desc:'Paste the full job description from the posting. This lets the AI mirror keywords and tailor your resume for ATS and recruiters.',
  ph:'Copy the entire job listing here, including responsibilities and qualifications.'
},

    // REGION / LOCALIZATION
    { key:'region',          label:'Region / Country', type:'text',
      desc:'Ensures proper spelling, section order, and format for ATS in your region.',
      ph:'e.g., United States' },

    // APPLICANT BASICS
{ 
  key:'full_name', 
  label:'Your name', 
  type:'text',
  desc:'Enter your full legal or professional name as you’d like it to appear at the top of your resume. This forms the resume header.',
  ph:'e.g., Jonathan Kyle Hobson'
},
{ 
  key:'contact_block', 
  label:'Header contact', 
  type:'textarea',
  desc:'Standard header info (ATS prefers plain text, no icons). Include at least email + phone. Optional: LinkedIn, portfolio, GitHub.',
  ph:'Email: name@email.com\nPhone: 123-456-7890\nCity: Austin, TX\nLinkedIn: linkedin.com/in/you'
},
    { key:'career',          label:'Career/discipline', type:'text', ph:'e.g., Product Management' },
    { key:'career_persona',  label:'Career persona (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      ph:'Search your persona library (e.g., UX Researcher, AI Strategist)',
      desc:'Adds domain-specific voice to resume output.' },

    // SUMMARY & KEYWORDS
{ 
  key:'summary_pref', 
  label:'Professional summary (optional)', 
  type:'textarea',
  desc:'A 3–5 sentence overview of your career focus, skills, and value. Optional—AI can generate one, but your input ensures authenticity and voice.',
  ph:'e.g., UX Researcher with 5+ years of experience turning insights into design strategy. Skilled in AI-driven prototyping, stakeholder workshops, and accessibility audits.'
},
{ 
  key:'keywords', 
  label:'Keywords to include (ATS)', 
  type:'textarea',
  desc:'Critical ATS step. Copy keywords directly from the JD (tools, methods, titles). AI will weave them naturally.',
  ph:'User research, Journey mapping, SQL, Agile, Stakeholder management'
},

    // EXPERIENCE
{ 
  key:'work_history', 
  label:'Work history (raw)', 
  type:'textarea',
  desc:'Paste full text or rough notes. AI restructures it into ATS-friendly format. Include job title, company, dates, and location.',
  ph:'Product Manager, Acme Corp — 2018–2021\nNotes: launched 2 SaaS products, led 5 engineers, cut churn by 20%'
},
{ 
  key:'work_bullets', 
  label:'Existing bullet points', 
  type:'textarea',
  desc:'Paste your resume bullets for rewriting. Short and simple is fine — AI will reformat into RAP structure.',
  ph:'Managed cross-team initiative for onboarding\nReduced churn\nPresented to executives'
},
{ 
  key:'rap_notes', 
  label:'RAP notes (Result → Action → Problem)', 
  type:'textarea',
  desc:'Optional advanced input: break each bullet into R/A/P blocks. Makes quantifiable, impact-first bullets.',
  ph:'R: Increased activation 32%\nA: Built lifecycle triggers in Braze\nP: Low onboarding completion blocked conversion'
},

    // OTHER SECTIONS
{ 
  key:'achievements', 
  label:'Major achievements', 
  type:'textarea',
  desc:'Highlight 3–5 standout career or personal achievements. Use metrics (%, $, time saved, users reached) where possible. Think: awards, promotions, recognition, or breakthrough projects.',
  ph:'e.g., Won “Top Innovator Award” at Acme Corp for leading a product launch that grew ARR by 25%.'
},

{ 
  key:'projects', 
  label:'Projects', 
  type:'textarea',
  desc:'Relevant professional, academic, or personal projects that showcase your skills. Include scope, tools, and impact. Especially useful if you’re changing careers or lack formal work experience.',
  ph:'e.g., Designed and launched a mobile app MVP in 6 weeks with 500+ beta users.'
},

{ 
  key:'education', 
  label:'Education', 
  type:'textarea',
  desc:'List degrees, certifications-in-progress, or relevant coursework. Format: Degree · Institution · Year. Can also include honors or key coursework for early-career resumes.',
  ph:'M.S. User Experience Design — Arizona State University, 2024\nB.A. Technical Communication — ASU, 2020'
},

{ 
  key:'certs', 
  label:'Certifications', 
  type:'textarea',
  desc:'Professional certifications, licenses, or ongoing training. Use exact credential names (helps ATS). Include date or “in progress” if applicable.',
  ph:'Certified Scrum Master (CSM), 2022\nGoogle UX Design Certificate, in progress'
},

{ 
  key:'volunteer', 
  label:'Volunteer / community', 
  type:'textarea',
  desc:'Show leadership, service, or community impact. Great for early-career resumes or roles that value social responsibility. Format as Role · Organization · Impact.',
  ph:'Volunteer Researcher, Local Nonprofit — Conducted 50+ user interviews to inform accessibility initiatives'
},
{ 
  key:'skills', 
  label:'Skills', 
  type:'textarea',
  desc:'Hard and soft skills. Use comma- or line-separated lists. AI groups and formats them ATS-friendly.',
  ph:'Figma, R, Python, User testing, Survey design, Communication'
},

    // PREFERENCES
    { key:'tone_primary',    label:'Primary tone', type:'select',
      options:['professional','impactful','concise','technical','friendly','executive'] },
    { key:'tone_secondary',  label:'Secondary tone (optional)', type:'select',
      options:['— none —','professional','impactful','concise','technical','friendly','executive'] },
    { key:'length_pref',     label:'Resume length', type:'select',
      options:[
        {value:'one', label:'One page'},
        {value:'two', label:'Two pages'},
        {value:'flex',label:'Flexible (1–2 pages)'}
      ]
    },
{ 
  key:'format_policy', 
  label:'Formatting', 
  type:'select',
  desc:'Choose format style: ATS-safe (plain), Recruiter-friendly (bold headings, whitespace), or Plain text (for uploads). Avoid tables/columns in ATS mode.',
  options:['ATS-safe','Recruiter-friendly (bold headings)','Plain text only']
},
{ 
  key:'output_style', 
  label:'Output style', 
  type:'select',
  desc:'Decide the final packaging: ATS-only, ATS + recruiter readability, or ATS + cover letter narrative.',
  options:['ATS-only','ATS + Recruiter readability','ATS + Cover letter narrative']
},
    // CONSTRAINTS
    { key:'constraints',     label:'Constraints', type:'textarea',
      ph:'No fabrications; keep dates; follow US spelling; exclude sensitive info' }
  ],

  boosters: [
    'Do not invent or inflate; use placeholders [MISSING INFO] if needed.',
    'Lead bullets with measurable Result → Action → Problem (RAP).',
    'Always quantify impact (%, $, time, users) if provided or infer safe proxies.',
    'Mirror high-signal JD keywords naturally for ATS; avoid stuffing.',
    'Trim irrelevant content aggressively in Tailor mode.',
    'Keep it skimmable: verbs first, ≤2 lines per bullet, no tables/columns.',
    'Provide 2–3 alternate RAP rewrites for weakest bullets.',
    'Offer ATS readiness, clarity, and impact scores (0–10) in Feedback mode.',
    'Generate local formatting aligned with region (dates, spelling, ATS norms).'
  ],

  template: (f) => {
    const join2 = (a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones = join2(
      f.tone_primary,
      (f.tone_secondary && f.tone_secondary !== '— none —') ? f.tone_secondary : ''
    );

    const lengthMap = { one:'1 page', two:'2 pages', flex:'Flexible (1–2 pages)' };
    const lengthStr = lengthMap[f.length_pref] || 'Flexible (1–2 pages)';

    const isFeedback = f.mode === 'feedback';
    const isRewrite  = f.mode === 'rewrite';
    const isHybrid   = f.mode === 'hybrid';
    const isTailor   = !isFeedback && !isRewrite && !isHybrid;

    const outRules = isFeedback ? [
      'Output format:',
      '- Section scores (ATS readiness, clarity, impact)',
      '- Overall critique (structure, clarity, alignment)',
      '- Section-by-section notes (Header, Summary, Skills, Experience, Education, etc.)',
      '- Top 10 prioritized fixes with rationale',
      '- Example rewrites of weakest 3 bullets (Before → After, RAP format)'
    ] : [
      'Output format:',
      '- Resume header (Name | contact line)',
      '- Professional Summary (3–5 lines, tailored to JD)',
      '- Skills (grouped, ATS-safe)',
      '- Experience (role — company — location — dates; 3–6 RAP bullets each)',
      '- Education; Certifications; Volunteer; Projects (if provided)',
      '- RAP bullet bank (2–5 extra variants for most important role)',
      '- Keyword alignment: list top JD keywords included',
      '- Change log: 5–8 bullets summarizing edits',
    ];

    return [
      'Help me produce a high-quality, ATS-aware resume.',
      `Mode: ${f.mode || 'tailor'}`,
      f.target_role && `Target role: ${f.target_role}`,
      f.company && `Company: ${f.company}`,
      f.job_description && `Job description:\n<<<\n${f.job_description}\n>>>`,
      f.company_values && `Company values:\n${f.company_values}`,
      f.region && `Region: ${f.region}`,
      tones && `Tone: ${tones}`,
      `Length: ${lengthStr}`,
      `Formatting: ${f.format_policy || 'ATS-safe'} (${f.output_style || 'ATS-only'})`,
      f.full_name && `Name: ${f.full_name}`,
      f.contact_block && `Contact:\n${f.contact_block}`,
      f.career && `Career: ${f.career}`,
      f.summary_pref && `Preferred summary:\n${f.summary_pref}`,
      f.keywords && `Keywords:\n${f.keywords}`,
      f.work_history && `Work history:\n${f.work_history}`,
      f.work_bullets && `Bullets:\n${f.work_bullets}`,
      f.rap_notes && `RAP notes:\n${f.rap_notes}`,
      f.achievements && `Achievements:\n${f.achievements}`,
      f.projects && `Projects:\n${f.projects}`,
      f.education && `Education:\n${f.education}`,
      f.certs && `Certifications:\n${f.certs}`,
      f.volunteer && `Volunteer:\n${f.volunteer}`,
      f.skills && `Skills:\n${f.skills}`,
      f.constraints && `Constraints:\n${f.constraints}`,
      isTailor && 'Tailor policy: Preserve strong phrasing; prune irrelevant items; emphasize JD-aligned outcomes.',
      isRewrite && 'Rewrite policy: Reorganize freely, unify tone, RAP bullets required, no inventions.',
      isHybrid && 'Hybrid policy: Provide critique with example fixes and light tailoring, no full rewrite.',
      isFeedback && 'Feedback policy: No full rewrite, only critique, scores, and example RAP rewrites.',
      outRules.join('\n')
    ].filter(Boolean).join('\n');
  }
},

{
  id: 'cover_letter',
  slug: 'cover-letter-tailor-rewrite-feedback',
  label: 'Cover Letter — Tailor / Rewrite / Feedback',
  kind: 'task',
  categories: ['career','personal-admin'],
  tags: [
    'type:task','topic:cover-letter','topic:writing','use:job','use:job-application',
    'use:ats','use:editing','use:feedback'
  ],

  use_cases: [
    'tailor a cover letter to a specific job description',
    'rewrite a cover letter from raw notes or outdated draft',
    'receive critique with section-by-section feedback and example rewrites',
    'draft a new, recruiter-engaging and ATS-safe cover letter from scratch'
  ],

  definition: 'Create, tailor, or critique a cover letter — concise, story-driven, and outcome-oriented (Why · How · What).',

  help: 'Paste the job description, your info, and choose Tailor, Rewrite, Feedback, or Hybrid mode. Fields are grouped by Job Target, Applicant Basics, Content Inputs, and Preferences. Leave blanks if not needed; boosters auto-kick in.',

  fields: [
    // MODE
    { key:'mode', label:'What do you want?', type:'select',
      options:[
    { 
      value:'Tailor my existing cover letter to the job description. Align my story with company mission and values, mirror JD keywords, trim irrelevant content, and strengthen hook and closing.',  
      label:'Tailor my cover letter to this job' 
    },
    { 
      value:'Rewrite my cover letter completely from the info provided. Rebuild structure with Hook → Why Them → Why You → Why Now → Closing. Integrate RAP/PAR storytelling and ATS-safe formatting.', 
      label:'Rewrite from scratch using my info' 
    },
    { 
      value:'Provide critique of my cover letter without rewriting. Score Hook, Alignment, Storytelling, and Clarity. Give section-by-section feedback and suggest targeted improvements.', 
      label:'Critique + section notes only' 
    },
    { 
      value:'Provide a hybrid response: critique with targeted fixes and light tailoring of content for the job description. Do not perform a full rewrite.',  
      label:'Hybrid: Light tailoring + feedback' 
    }
      ]
    },

    // JOB TARGET
    { 
      key:'target_role', label:'Target role/title', type:'text',
      desc:'The exact job title from the posting. ATS systems match this literally.',
      ph:'e.g., Senior UX Researcher'
    },
    { 
      key:'company', label:'Company', type:'text',
      desc:'The organization you’re applying to. Guides tone and voice.',
      ph:'e.g., OpenAI'
    },
    { 
      key:'company_values', label:'Company values / notes', type:'textarea',
      desc:'Cultural or mission-related cues you’ve researched. Mirrors values in the letter.',
      ph:'e.g., Inclusive design, ethical AI, rapid prototyping'
    },
    { 
      key:'job_description', label:'Job description (paste full text)', type:'textarea',
      desc:'Paste the full job posting. AI uses this to align keywords and expectations.',
      ph:'Copy/paste entire job listing here, including responsibilities and qualifications.'
    },

    // REGION / LOCALIZATION
    { 
      key:'region', label:'Region / Country', type:'text',
      desc:'Ensures correct spelling (US/UK), etiquette, and format.',
      ph:'e.g., United States'
    },

    // APPLICANT BASICS
    { 
      key:'full_name', label:'Your name', type:'text',
      desc:'Your full name as you’d like it signed.',
      ph:'e.g., Jonathan Kyle Hobson'
    },
    { 
      key:'contact_block', label:'Header contact info', type:'textarea',
      desc:'Plain text only — ATS-friendly. Include at least email and phone. Optional: LinkedIn, portfolio.',
      ph:'Email: name@email.com\nPhone: 123-456-7890\nCity: Austin, TX\nLinkedIn: linkedin.com/in/you'
    },

    // PERSONA + MISSION
    { 
      key:'career_persona', label:'Career persona (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Pulls in a career persona from your library to enrich voice and positioning.',
      ph:'Search persona library (e.g., UX Researcher, AI Strategist)'
    },
    { 
      key:'mission_alignment', label:'Mission alignment (purpose)', type:'textarea',
      desc:'Your broader mission or purpose — a cause beyond self-enrichment. Connects personal values to company goals.',
      ph:'e.g., Dedicated to making technology accessible and ethical for all users.'
    },

    // LETTER CONTENT INPUTS
    { 
      key:'hook', label:'Opening hook (optional)', type:'textarea',
      desc:'Optional: A strong opening line/story. AI can generate one if blank.',
      ph:'e.g., At the intersection of UX research and AI ethics, I design responsibly.'
    },
    { 
      key:'why_them', label:'Why Them (company alignment)', type:'textarea',
      desc:'Why this company matters to you. Pull in mission, product, or culture cues.',
      ph:'e.g., Your commitment to human-centered AI resonates with my values.'
    },
    { 
      key:'why_you', label:'Why You (your value)', type:'textarea',
      desc:'Your skills + results that fit their needs. Use RAP or PAR-style examples.',
      ph:'e.g., Increased retention 25% through user research driving design pivots.'
    },
    { 
      key:'why_now', label:'Why Now (timing/career arc)', type:'textarea',
      desc:'Why this role fits your current trajectory. Explains motivation and timing.',
      ph:'e.g., After leading cross-functional projects, I’m ready to scale impact in a mission-driven company.'
    },
    { 
      key:'closing_pref', label:'Closing preference (optional)', type:'textarea',
      desc:'Closing style (warm, confident, formal). Otherwise AI generates recruiter-friendly close.',
      ph:'e.g., I’d welcome the chance to discuss how I can contribute.'
    },

    // TONE / FORMATTING
    { key:'tone_primary', label:'Primary tone', type:'select',
      options:['professional','impactful','concise','technical','friendly','executive','mission-driven'] },
    { key:'tone_secondary', label:'Secondary tone (optional)', type:'select',
      options:['— none —','professional','impactful','concise','technical','friendly','executive','mission-driven'] },
    { 
      key:'length_pref', label:'Letter length', type:'select',
      desc:'Recruiters skim. Shorter is often better unless depth adds value.',
      options:[
        {value:'short', label:'Short (200–250 words)'},
        {value:'medium',label:'Medium (300–400 words)'},
        {value:'long',  label:'Long (450–500 words)'}
      ]
    },
    { 
      key:'format_policy', label:'Formatting', type:'select',
      desc:'ATS prefers plain. Recruiter-friendly allows more spacing and headings.',
      options:['ATS-safe','Recruiter-friendly (spaced paragraphs)','Plain text only']
    },

    // CONSTRAINTS
    { 
      key:'constraints', label:'Constraints', type:'textarea',
      desc:'Rules to follow (style, tone, things to avoid).',
      ph:'Avoid salary mentions. No buzzwords. Keep US spelling.'
    }
  ],

  boosters: [
    'Open with a hook — avoid “I am writing to apply…” clichés.',
    'Mirror company mission/values explicitly in “Why Them.”',
    'Show value through RAP/PAR storytelling with measurable results.',
    'Tie “Why Now” to your trajectory and their timing.',
    'Close with confidence and a call to action.',
    'Keep paragraphs 3–4 lines max for readability.',
    'Generate 2 alternate hooks + closings in Tailor/Rewrite mode.',
    'Feedback mode: score Hook, Alignment, Storytelling, and Clarity (0–10).'
  ],

  template: (f) => {
    const join2 = (a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones = join2(
      f.tone_primary,
      (f.tone_secondary && f.tone_secondary !== '— none —') ? f.tone_secondary : ''
    );
    const lengthMap = { short:'200–250 words', medium:'300–400 words', long:'450–500 words' };
    const lengthStr = lengthMap[f.length_pref] || '300–400 words';

    const isFeedback = f.mode === 'feedback';
    const isRewrite  = f.mode === 'rewrite';
    const isHybrid   = f.mode === 'hybrid';
    const isTailor   = !isFeedback && !isRewrite && !isHybrid;

    const outRules = isFeedback ? [
      'Output format:',
      '- Section scores (Hook, Alignment, Storytelling, Clarity)',
      '- Overall critique (structure, tone, ATS-readiness)',
      '- Section-by-section notes (Opening, Why Them, Why You, Why Now, Closing)',
      '- Top 5 prioritized fixes with rationale',
      '- Example rewrites of weakest 2 sections (Before → After)'
    ] : [
      'Output format:',
      '- Greeting (with recruiter/hiring manager if known)',
      '- Hook (1–2 sentences)',
      '- Why Them (company/role alignment)',
      '- Why You (skills + outcomes, RAP/PAR style)',
      '- Why Now (career fit, timing)',
      '- Mission Alignment (if provided)',
      '- Closing (confident CTA)',
      '- Alternate opening + closing options (2 each)',
      '- Change log: 3–5 bullets summarizing edits'
    ];

    return [
      'Help me produce a high-quality, ATS-aware cover letter.',
      `Mode: ${f.mode || 'tailor'}`,
      f.target_role && `Target role: ${f.target_role}`,
      f.company && `Company: ${f.company}`,
      f.job_description && `Job description:\n<<<\n${f.job_description}\n>>>`,
      f.company_values && `Company values:\n${f.company_values}`,
      f.region && `Region: ${f.region}`,
      tones && `Tone: ${tones}`,
      `Length: ${lengthStr}`,
      `Formatting: ${f.format_policy || 'ATS-safe'}`,
      f.full_name && `Name: ${f.full_name}`,
      f.contact_block && `Contact:\n${f.contact_block}`,
      f.career_persona && `Career persona: ${f.career_persona}`,
      f.mission_alignment && `Mission alignment:\n${f.mission_alignment}`,
      f.hook && `Opening hook:\n${f.hook}`,
      f.why_them && `Why Them:\n${f.why_them}`,
      f.why_you && `Why You:\n${f.why_you}`,
      f.why_now && `Why Now:\n${f.why_now}`,
      f.closing_pref && `Closing preference:\n${f.closing_pref}`,
      f.constraints && `Constraints:\n${f.constraints}`,
      isTailor && 'Tailor policy: Keep authentic voice; prune irrelevant details; emphasize JD-aligned value.',
      isRewrite && 'Rewrite policy: Rebuild from scratch if needed; unify tone; integrate values; no fabrications.',
      isHybrid && 'Hybrid policy: Provide critique + light tailoring, no full rewrite.',
      isFeedback && 'Feedback policy: Provide critique, scores, and example section fixes only.',
      outRules.join('\n')
    ].filter(Boolean).join('\n');
  }
},


{
  id: 'write_social_post',
  slug: 'write-social-post',
  label: 'Social Media Post — Tailor / Write / Brainstorm',
  kind: 'task',
  categories: ['marketing','social','content'],
  tags: [
    'type:task','use:write','use:social',
    'topic:copywriting','topic:social-media','phase:distribution'
  ],

  use_cases: [
    // Cross-platform + platform-specific scenarios
    'tailor an existing post across platforms while preserving intent',
    'write a net-new post optimized to a platform’s best practices',
    'brainstorm multiple campaign angles with mini-drafts per platform',
    'LinkedIn: thought-leadership with a hook, takeaway, and 3–5 hashtags',
    'X/Twitter: punchy, sub-100-char hooks; 1–2 hashtags; thread planning',
    'Facebook: 40–80-char status + single image; front-load key point',
    'Instagram: first-line hook (<125 chars) + caption + 10–15 relevant hashtags',
    'Reddit: subreddit-native explainer with markdown and genuine tone',
    'Pinterest: keyworded Pin title + 100–300-char description + 3–5 hashtags'
  ],

  definition: 'Compose or adapt platform-native social content based on mode (Tailor / Write / Brainstorm). Injects platform rules, purpose guidance, tone, and length logic to return a polished caption (or idea board), variants, alt-text, and hashtag guidance.',
  help: 'Pick **Task Mode**, then **Platform**. All downstream fields (placeholders/descriptions and length options) adapt to the chosen platform’s 2025 best practices. Provide goal, audience/personas, tone, hook/angle, key points, CTA, and optional source post (for Tailor) or themes (for Brainstorm).',

  fields: [
    // ===== 1) MODE (first) =====
    { key:'task_mode', label:'Task Mode', type:'select',
      options:[
        { label:'Tailor an existing post', value:'Mode: Tailor\nInstruction:\n- Ingest the source post and preserve its original intent while adapting to the chosen platform and purpose.\n- Keep specified elements (voice, key claim, legal disclaimers) and improve clarity, hook, and scannability.\n- Return: adapted primary caption + rationale of changes + 1–3 variants + alt-text + hashtag suggestion.' },
        { label:'Write a new post from scratch', value:'Mode: Write\nInstruction:\n- Generate a new platform-native post from the provided goal, audience, and key points.\n- Lead with a hook; match tone and length; include a clear CTA and optional variants.\n- Return: primary caption + 1–3 variants + alt-text + hashtag suggestion.' },
        { label:'Brainstorm ideas with draft options', value:'Mode: Brainstorm\nInstruction:\n- Produce an idea board: multiple distinct angles with hooks, one-liners, suggested assets, and CTA options.\n- For the top ideas, provide mini-drafts matched to the chosen platform.\n- Return: idea board (N ideas), 1–2 mini-drafts per top idea, plus hashtag seeds and alt-text hints.' }
      ]
    },

    // ===== 2) PLATFORM (drives adaptive UI & instructions) =====
    { key:'platform', label:'Platform', type:'select',
      options:[
        { label:'X / Twitter', value:'Platform: X / Twitter\nGuidance:\n- Char limit: 280 (free); premium up to 25k but collapsed under “Show more”.\n- Best engagement around 70–100 chars; use threads for depth.\n- 0–2 highly relevant hashtags; images/GIFs/polls don’t consume characters.\n- Crisp verbs; data or curiosity hook; thread each idea cleanly.' },
        { label:'Facebook', value:'Platform: Facebook\nGuidance:\n- Very long allowed, but best results at ~40–80 chars + single visual.\n- Front-load key point (mobile truncates around ~150 chars).\n- Hashtags optional and sparse; keep tone conversational.' },
        { label:'LinkedIn', value:'Platform: LinkedIn\nGuidance:\n- Up to 3,000 chars; hook must fit first ~200 chars pre-“See more”.\n- 100–200 words with professional takeaway; 3–5 topic hashtags.\n- Use @mentions for people/companies; value-forward, B2B-appropriate tone.' },
        { label:'Instagram', value:'Platform: Instagram\nGuidance:\n- Captions up to 2,200 chars; first ~125 chars visible in feed.\n- Use a strong first line; 10–15 relevant hashtags (end or first comment).\n- Emojis for scannability; include “link in bio” if applicable.' },
        { label:'Reddit', value:'Platform: Reddit\nGuidance:\n- Subreddit-native value: how-to, data, or lived experience.\n- Clear title + markdown body; avoid salesy tone; disclose affiliations.\n- Engage in comments; follow subreddit rules.' },
        { label:'Pinterest', value:'Platform: Pinterest\nGuidance:\n- Visual first (vertical 2:3). Keyworded title + 100–300-char description.\n- 3–5 specific hashtags; evergreen topics; treat as search (SEO terms).' },
        { label:'TikTok', value:'Platform: TikTok\nGuidance:\n- Short, keyword-rich caption that rides the video hook.\n- 3–5 niche hashtags; medium-native CTA (watch/comment/share).' },
        { label:'YouTube', value:'Platform: YouTube\nGuidance:\n- 60–150 words; name who it’s for and the payoff.\n- 1–3 topic hashtags at end; clear CTA (watch/sub/next step).' },
        { label:'Threads', value:'Platform: Threads\nGuidance:\n- Breezy, friendly; 1–3 sentences.\n- 0–3 tasteful hashtags; personal, non-corporate voice.' }
      ]
    },

    // ===== 3) PLATFORM-AWARE LENGTH (options change by platform) =====
    { key:'length_pref', label:'Length preference', type:'select', dependsOn:'platform',
      // The UI can pick from optionsByPlatform; the template will also restate chosen logic explicitly.
      optionsByPlatform: {
        'X / Twitter': [
          { label:'Micro (≤100 chars)', value:'Length: Micro (X) — ≤100 chars\nInstruction: single idea + hook; 0–1 hashtag.' },
          { label:'Short (101–180 chars)', value:'Length: Short (X) — 101–180 chars\nInstruction: hook + payoff + CTA fragment.' },
          { label:'Thread (3–7 tweets)', value:'Length: Thread (X)\nInstruction: 3–7 tweets; each line stands alone; include a summary close.' }
        ],
        'Facebook': [
          { label:'Punchy (40–80 chars)', value:'Length: Punchy (FB) — 40–80 chars\nInstruction: crisp line + single visual.' },
          { label:'Short (1–2 sentences)', value:'Length: Short (FB) — 1–2 sentences\nInstruction: front-load the value.' }
        ],
        'LinkedIn': [
          { label:'Hook line + 80–120 words', value:'Length: Short (LI) — hook + 80–120 words\nInstruction: 1–2 paras + takeaway.' },
          { label:'Standard (120–200 words)', value:'Length: Standard (LI) — 120–200 words\nInstruction: hook, value bullets, CTA.' },
          { label:'Long (200–300 words)', value:'Length: Long (LI) — 200–300 words\nInstruction: mini-essay with whitespace.' }
        ],
        'Instagram': [
          { label:'Hook line only (≤125 chars)', value:'Length: Hook-only (IG)\nInstruction: first line carries the message; rely on visual.' },
          { label:'Short caption (1–2 lines)', value:'Length: Short (IG) — 1–2 lines\nInstruction: hook + benefit + CTA; hashtags at end.' },
          { label:'Full caption (3–6 lines)', value:'Length: Full (IG)\nInstruction: story beat + CTA; hashtags grouped last.' }
        ],
        'Reddit': [
          { label:'Title + TL;DR (2–3 lines)', value:'Length: TL;DR (Reddit)\nInstruction: clear title + short summary.' },
          { label:'Short explainer (100–200 words)', value:'Length: Short (Reddit)\nInstruction: markdown bullets + links.' },
          { label:'Long form (300–800 words)', value:'Length: Long (Reddit)\nInstruction: headings, lists, sources.' }
        ],
        'Pinterest': [
          { label:'Pin title + 100–200-char desc', value:'Length: Pin short (Pinterest)\nInstruction: keyworded title + concise benefit.' },
          { label:'Pin title + 200–300-char desc', value:'Length: Pin standard (Pinterest)\nInstruction: include 1–2 keywords + CTA.' }
        ],
        'TikTok': [
          { label:'Short (≤80 chars)', value:'Length: Short (TikTok)\nInstruction: hook + keyword; 3–5 niche hashtags.' },
          { label:'Standard (1–2 lines)', value:'Length: Standard (TikTok)\nInstruction: hook + payoff + CTA.' }
        ],
        'YouTube': [
          { label:'Short (60–90 words)', value:'Length: Short (YT)\nInstruction: hook + value + CTA; 1–3 tags.' },
          { label:'Standard (90–150 words)', value:'Length: Standard (YT)\nInstruction: who it’s for + benefit + CTA.' }
        ],
        'Threads': [
          { label:'1–2 sentences', value:'Length: Short (Threads)\nInstruction: breezy, friendly; invite replies.' }
        ]
      },
      options: [
        // Fallback if platform not yet selected
        { label:'Auto (platform-appropriate)', value:'Length: Auto\nInstruction: apply best-practice length for the chosen platform.' }
      ]
    },

    // ===== 4) ROLE / PURPOSE (unchanged but platform-aware later) =====
    { key:'role', label:'Account type / role', type:'select',
      options:[
        { label:'Influencer / Creator', value:'Role: Creator\nInstruction:\n- Authentic, first-person; disclose partnerships (#ad where required).\n- Experience-based claims only.' },
        { label:'Casual individual', value:'Role: Casual individual\nInstruction:\n- Conversational; share a personal micro-story or image idea.' },
        { label:'Professional (personal brand)', value:'Role: Professional\nInstruction:\n- Credibility via 1–2 specifics (metric, client type, method); crisp CTA.' },
        { label:'Business / Brand account', value:'Role: Brand\nInstruction:\n- Align with style guide; add social proof or customer quote.' },
        { label:'Nonprofit / NGO', value:'Role: Nonprofit\nInstruction:\n- Center beneficiaries; include impact stat and donate/volunteer CTA.' },
        { label:'Government / Public agency', value:'Role: Public agency\nInstruction:\n- Clear, accessible, non-partisan; action steps and official link; ADA-friendly alt text.' },
        { label:'Educator / Researcher', value:'Role: Educator/Researcher\nInstruction:\n- Plain-language framing + source link; invite questions.' },
        { label:'Community organizer', value:'Role: Community organizer\nInstruction:\n- Local context, inclusivity, accessibility details; ways to help now.' }
      ]
    },

    { key:'purpose', label:'Post purpose', type:'select',
      options:[
        { label:'Awareness — reach & memorability', value:'Purpose: Awareness\nInstruction:\n- Optimize for recall; simple, concrete idea with a sticky hook.\n- EAST: Easy to grasp at a glance; 1 key message, 1 image idea.\n- AIDA spine with lightweight CTA.' },
        { label:'Engagement — replies, shares, saves', value:'Purpose: Engagement\nInstruction:\n- Ask a focused question or pose a poll-worthy dilemma.\n- Use curiosity gap or social proof; invite specific replies.' },
        { label:'Click-through — traffic to link', value:'Purpose: Click-through\nInstruction:\n- Payoff-forward promise; place link once (platform-dependent).\n- Pre-qualify clicks with concrete benefit.' },
        { label:'Lead gen — signups/demo', value:'Purpose: Lead gen\nInstruction:\n- FAB (Feature→Advantage→Benefit); use compliance-safe verbs (“may help”, “can reduce”).\n- Add a soft disqualifier to improve lead quality.' },
        { label:'Launch/update — product news', value:'Purpose: Launch/Update\nInstruction:\n- BAB (Before→After→Bridge) with 1–2 killer specifics.\n- Add “What’s new vs. old” bullet.' },
        { label:'Thought leadership — teach & frame', value:'Purpose: Thought leadership\nInstruction:\n- Feynman clarity + First Principles rationale; 1 actionable takeaway; invite dissent.' },
        { label:'Event promo — register/attend', value:'Purpose: Event promo\nInstruction:\n- Who it’s for, what they’ll get, and by when; speaker/partner proof.' },
        { label:'Hiring — recruiting & culture', value:'Purpose: Hiring\nInstruction:\n- Mission-first “Why” + 2–3 must-haves; inclusive language; link to JD.' },
        { label:'Support/FAQ — reduce tickets', value:'Purpose: Support/FAQ\nInstruction:\n- Problem → steps → expected result; scannable bullets; alt text for UI refs.' },
        { label:'Apology/issue comms — trust repair', value:'Purpose: Issue comms\nInstruction:\n- Acknowledge → Own → Fix → Timeline; factual, link to status page.' }
      ]
    },

    // ===== 5) AUDIENCE + PERSONAS =====
    { key:'audience', label:'Target audience', type:'text',
      desc:'Who this is for (platform-specific phrasing encouraged).',
      ph:'e.g., LinkedIn → “RevOps leaders at mid-market SaaS” | Instagram → “Home bakers starting out”'
    },
    { key:'personas', label:'Audience personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Stakeholder segments shaping tone, examples, objections.',
      ph:'e.g., Busy PMs; RevOps leads; Indie hackers'
    },

    // ===== 6) TONE & VOICE =====
    { key:'brand', label:'Brand voice (free text)', type:'text',
      desc:'Describe the voice the platform expects (will be blended with “Role”).',
      ph:'Plainspoken, playful, authoritative…'
    },
    { key:'tone_primary', label:'Tone — primary', type:'select',
      options:[
        { label:'Friendly & helpful', value:'Tone: Friendly helpful\nInstruction: approachable language, short sentences, warm verbs.' },
        { label:'Authoritative & concise', value:'Tone: Authoritative concise\nInstruction: lead with facts, prune modifiers, active voice.' },
        { label:'Playful & witty', value:'Tone: Playful witty\nInstruction: tasteful wordplay; 1–2 emojis max if platform-appropriate.' },
        { label:'Inspirational', value:'Tone: Inspirational\nInstruction: future-positive framing; we/you language; avoid cliché.' },
        { label:'Technical & precise', value:'Tone: Technical precise\nInstruction: define terms, concrete specs, scoped claims.' },
        { label:'Empathetic & calming', value:'Tone: Empathetic calming\nInstruction: validate feelings; reduce urgency; clear next step.' }
      ]
    },
    { key:'tone_secondary', label:'Tone — secondary (optional)', type:'select',
      options:[
        { label:'Confident', value:'Sub-tone: Confident\nInstruction: assert benefits with measured certainty; no absolutes.' },
        { label:'Curious', value:'Sub-tone: Curious\nInstruction: ask a genuine question; invite replies for learning.' },
        { label:'Urgent', value:'Sub-tone: Urgent\nInstruction: time-boxed CTA with clear reason; avoid alarmism.' },
        { label:'Luxurious', value:'Sub-tone: Luxurious\nInstruction: sensory detail sparingly; focus on craft.' }
      ]
    },

    // ===== 7) EMOJI / CTA STYLE (platform-aware later) =====
    { key:'emoji_policy', label:'Emoji usage', type:'select',
      options:[
        { label:'None', value:'Emoji policy: None\nInstruction: no emojis; use punctuation/whitespace for rhythm.' },
        { label:'Minimal (sparingly)', value:'Emoji policy: Minimal\nInstruction: 0–2 on-brand emojis for scannability, not decoration.' },
        { label:'Expressive (platform-native)', value:'Emoji policy: Expressive\nInstruction: 2–5 emojis to chunk ideas; avoid generic dumps.' }
      ]
    },
    { key:'cta_style', label:'CTA style', type:'select',
      options:[
        { label:'Direct (click/sign up/buy)', value:'CTA: Direct\nInstruction: explicit action verb + concrete benefit + low-friction step.' },
        { label:'Conversational (ask a question)', value:'CTA: Conversational\nInstruction: 1 precise question inviting stories or tips.' },
        { label:'Soft (learn more/explore)', value:'CTA: Soft\nInstruction: curiosity-driven close with value promise + link.' }
      ]
    },

    // ===== 8) CORE CONTENT (platform-specific desc/ph guided) =====
    { key:'goal',   label:'Goal / objective', type:'text',
      desc:'Primary success (platform-aware phrasing).',
      ph:'Drive saves (IG), comments (LinkedIn), CTR (X), subreddit discussion (Reddit)…'
    },
    { key:'topic',  label:'Topic / product / offer', type:'text',
      desc:'What this post is about (use platform keywords where relevant).',
      ph:'e.g., “New AI notes feature for creators”'
    },
    { key:'angle',  label:'Angle or hook idea', type:'text',
      desc:'Platform-tuned hook style.',
      ph:'X: sharp question | LinkedIn: insight + takeaway | IG: relatable moment + emoji beat'
    },
    { key:'key_points', label:'Key points (bullets)', type:'textarea',
      desc:'Bullets prioritized for the platform (data for LinkedIn; visual cue for IG; TL;DR for Reddit).',
      ph:'• Proof point\n• Benefit\n• Objection to address\n• Feature to highlight'
    },
    { key:'cta', label:'Call to action (specific)', type:'text',
      desc:'CTA phrased to platform norms.',
      ph:'LinkedIn: “What’s your take?” | IG: “Save this for later” | X: “Read the full guide →”'
    },
    { key:'link', label:'Link (optional)', type:'text',
      desc:'Place once per platform norms; avoid multiple repeats.',
      ph:'https://…'
    },
    { key:'hashtag_seeds', label:'Hashtag seeds (optional)', type:'text',
      desc:'Platform-specific hashtag norms: X (0–2), LinkedIn (3–5), IG (10–15, end/first comment), FB (sparse), Reddit (avoid), Pinterest (3–5, keyworded).',
      ph:'#AI #Productivity (comma or space separated)'
    },

    // ===== 9) EXAMPLES & ASSETS =====
    { key:'examples', label:'Reference examples (your past posts or exemplars)', type:'textarea',
      desc:'Paste 1–3 examples to emulate tone/structure (separate with blank lines). Avoid verbatim reuse.',
      ph:'Example 1…\n\nExample 2…'
    },
    { key:'asset_hints', label:'Creative asset hints (image/video/alt text ideas)', type:'textarea',
      desc:'Platform-aware assets: IG → portrait photo/reel; LinkedIn → chart/screenshot; Pinterest → vertical 2:3 with keyworded overlay; X → simple chart/meme; Reddit → diagrams sparingly.',
      ph:'e.g., Dashboard screenshot; “Alt: Line chart showing +18% MoM growth.”'
    },

    // ===== 10) VARIANTS & CONSTRAINTS =====
    { key:'variant_count', label:'Variants (number)', type:'text', ph:'3' },
    { key:'constraints', label:'Constraints', type:'textarea',
      desc:'Compliance or style rules (e.g., claims, emojis, disclosures).',
      ph:'No emojis; avoid medical claims; include #ad on X and IG…'
    },

    // ===== 11) TAILOR / BRAINSTORM SPECIFICS =====
    { key:'source_platform', label:'Source platform (for Tailor)', type:'text',
      visibleIf:{ key:'task_mode', contains:'Tailor' },
      desc:'Original platform → target platform adaptation.',
      ph:'Instagram → LinkedIn'
    },
    { key:'source_post', label:'Source post to tailor (for Tailor)', type:'textarea',
      visibleIf:{ key:'task_mode', contains:'Tailor' },
      desc:'Paste the original caption/content.',
      ph:'(Original post…)'
    },
    { key:'keep_elements', label:'Must-keep elements (for Tailor)', type:'textarea',
      visibleIf:{ key:'task_mode', contains:'Tailor' },
      desc:'Voice cues, phrases, disclaimers, brand names.',
      ph:'Keep the “beta now open” line; keep @partner mention; keep legal disclaimer.'
    },
    { key:'improve_targets', label:'Improvement targets (for Tailor)', type:'textarea',
      visibleIf:{ key:'task_mode', contains:'Tailor' },
      desc:'What to improve when adapting.',
      ph:'Stronger hook; reduce jargon; add concrete benefit; platform-appropriate hashtags.'
    },

    { key:'idea_count', label:'Idea count (for Brainstorm)', type:'text',
      visibleIf:{ key:'task_mode', contains:'Brainstorm' },
      ph:'5'
    },
    { key:'themes', label:'Themes / angles to explore (for Brainstorm)', type:'textarea',
      visibleIf:{ key:'task_mode', contains:'Brainstorm' },
      desc:'Prompt different creative directions.',
      ph:'Counterintuitive lesson\nCustomer win\nBehind-the-scenes\nMyth-busting'
    },
    { key:'draft_depth', label:'Draft depth (for Brainstorm)', type:'select',
      visibleIf:{ key:'task_mode', contains:'Brainstorm' },
      options:[
        { label:'Sketch (hooks + one-liners)', value:'Depth: Sketch\nInstruction: brief hooks + one-liners; no full captions.' },
        { label:'Mini-drafts (2–3 sentences each)', value:'Depth: Mini-drafts\nInstruction: short caption drafts with CTA.' },
        { label:'Mixed (sketches + 2 top mini-drafts)', value:'Depth: Mixed\nInstruction: list all ideas as sketches; fully draft top 2.' }
      ]
    }
  ],

  boosters: [
    'Lead with the payoff; cut warm-up.',
    'Use a strong hook: stat, question, bold claim, contrast, or tiny story.',
    'Prefer concrete benefits over adjectives; show specifics (%, Δ, time saved).',
    'Avoid hashtag walls; pick high-signal tags by platform norms.',
    'Use accessible language and include alt-text suggestions when images are implied.',
    'Offer at least one variant that flips the narrative angle (question → claim; problem → payoff).',
    'Use compliance-safe phrasing (“may help”, “can reduce”) when making claims.'
  ],

  template: (f) => {
    const lines = [];
    const add = (x) => x && lines.push(x);

    // Platform rules (2025 distilled)
    const RULES = {
      'X / Twitter': {
        key: 'X',
        limits: 'Char limit: 280 (free); premium up to 25k (collapsed). Best at 70–100 chars.',
        hashtags: 'Use 0–2 highly relevant hashtags.',
        visuals: 'Images/GIFs/polls do not consume characters; add alt text.',
        style: 'Punchy verbs; single idea per post; use threads for depth.'
      },
      'Facebook': {
        key: 'Facebook',
        limits: 'Very long allowed; best at ~40–80 chars. Mobile truncates ~150 chars.',
        hashtags: 'Hashtags optional; use sparingly.',
        visuals: 'Pair with one clear visual for ~2× engagement.',
        style: 'Conversational, front-load the point.'
      },
      'LinkedIn': {
        key: 'LinkedIn',
        limits: 'Up to 3,000 chars; first ~200 chars before “See more”. Best ~100–200 words.',
        hashtags: '3–5 topic hashtags; use @mentions for people/companies.',
        visuals: 'Charts/screenshots perform well; add brief context.',
        style: 'Professional insights; takeaway and CTA to discuss.'
      },
      'Instagram': {
        key: 'Instagram',
        limits: 'Caption up to 2,200; first ~125 chars visible. Plan a strong first line.',
        hashtags: 'Use 10–15 relevant hashtags at end or first comment.',
        visuals: 'Visual is primary; captions support; emojis aid scannability.',
        style: 'Relatable beats; “link in bio” if off-platform CTA.'
      },
      'Reddit': {
        key: 'Reddit',
        limits: 'Title + long text allowed; readers prefer concise value.',
        hashtags: 'Avoid hashtags; use markdown; disclose affiliations.',
        visuals: 'Use diagrams/screens sparingly; clarity first.',
        style: 'Subreddit-native problem solving, sources if possible.'
      },
      'Pinterest': {
        key: 'Pinterest',
        limits: 'Keyworded title; 100–300-char description; evergreen topics.',
        hashtags: '3–5 targeted hashtags in description.',
        visuals: 'Vertical 2:3 image; readable text overlay with keywords.',
        style: 'Search-oriented; benefit-led copy.'
      },
      'TikTok': {
        key: 'TikTok',
        limits: 'Short, keyword-rich; ride the video hook.',
        hashtags: '3–5 niche hashtags.',
        visuals: 'Video drives meaning; caption reinforces CTA.',
        style: 'Native phrases; prompt interaction.'
      },
      'YouTube': {
        key: 'YouTube',
        limits: '60–150 words; hook sentence first.',
        hashtags: '1–3 topic hashtags at end.',
        visuals: 'Thumbnail/title synergy; caption names payoff.',
        style: 'Who it’s for + value + next step.'
      },
      'Threads': {
        key: 'Threads',
        limits: '1–3 sentences; lightweight and personal.',
        hashtags: '0–3 tasteful hashtags.',
        visuals: 'Optional; conversational tone.',
        style: 'Friendly, human voice.'
      }
    };

    const platformLabel = Object.keys(RULES).find(k => (f.platform||'').includes(k)) || null;
    const P = platformLabel ? RULES[platformLabel] : null;

    add('Task: Create platform-native social content based on the selected **Task Mode** (Tailor / Write / Brainstorm). Include a strong first-line hook and a purpose-aligned CTA.');

    // Mode
    if (f.task_mode) add(String(f.task_mode));

    // Platform brief
    if (P) {
      add(`Platform brief — ${P.key}:\n- ${P.limits}\n- Hashtags: ${P.hashtags}\n- Visuals: ${P.visuals}\n- Style: ${P.style}`);
    } else if (f.platform) {
      add(String(f.platform));
    }

    // Role / Purpose
    if (f.role)    add(String(f.role));
    if (f.purpose) add(String(f.purpose));

    // Length preference (explicit restatement)
    if (f.length_pref && (!platformLabel || !/Auto/.test(String(f.length_pref)))) {
      add(String(f.length_pref));
    } else if (platformLabel) {
      add('Length: Auto\nInstruction: apply best-practice length for the chosen platform.');
    }

    // Core metadata
    if (f.topic)    add('Topic: ' + f.topic);
    if (f.goal)     add('Goal: ' + f.goal);
    if (f.audience) add('Audience: ' + f.audience);

    // Personas
    if (f.personas && Array.isArray(f.personas) && f.personas.length) {
      add('Audience personas:\n' + f.personas.map((p,i)=>`${i+1}. ${p}`).join('\n'));
    }

    // Tone & voice
    if (f.brand) add('Brand voice: ' + f.brand);
    if (f.tone_primary)   add(String(f.tone_primary));
    if (f.tone_secondary) add(String(f.tone_secondary));
    // Emoji policy & CTA style (previously not included in output)
    // Defaults by platform (example; tweak to taste)
if (!f.emoji_policy && P && P.key === 'Instagram') f.emoji_policy = 'Emoji policy: Expressive\nInstruction: 2–5 emojis to chunk ideas; avoid generic dumps.';
if (!f.cta_style) f.cta_style = 'CTA: Conversational\nInstruction: ask 1 precise question inviting stories or tips.';

if (f.emoji_policy) add(String(f.emoji_policy));   // e.g., "Emoji policy: Minimal\nInstruction: ..."
if (f.cta_style)    add(String(f.cta_style));      // e.g., "CTA: Direct\nInstruction: ..."


    // Content specifics (platform-aware nudges)
    if (f.angle)      add('Angle/Hook idea: ' + f.angle);
    if (f.key_points) add('Key points:\n' + f.key_points);
    if (f.cta)        add('Call to action: ' + f.cta);
    if (f.link)       add('Link: ' + f.link);

    // Tailor mode extras
    if ((f.task_mode||'').includes('Tailor')) {
      if (f.source_platform) add('Source platform: ' + f.source_platform);
      if (f.source_post)     add('Source post:\n' + f.source_post);
      if (f.keep_elements)   add('Must-keep elements:\n' + f.keep_elements);
      if (f.improve_targets) add('Improvement targets:\n' + f.improve_targets);
    }

    // Brainstorm extras
    if ((f.task_mode||'').includes('Brainstorm')) {
      if (f.themes)     add('Themes to explore:\n' + f.themes);
      if (f.idea_count) add('Idea count: ' + f.idea_count);
      if (f.draft_depth) add(String(f.draft_depth));
    }

    // Examples & assets
    if (f.examples) {
      add('Reference examples to emulate (tone/structure):\n' + f.examples);
      add('Instruction: Mirror register, rhythm, and length from the examples while avoiding verbatim phrasing.');
    }
    if (f.asset_hints) add('Creative asset hints:\n' + f.asset_hints);

    // Constraints
    if (f.constraints) add('Constraints: ' + f.constraints);

    // Hashtags guidance
    if (f.hashtag_seeds) {
      const seeds = String(f.hashtag_seeds).replace(/[, ]+/g, ' ').trim();
      if (seeds) {
        const platHash = P
          ? P.key === 'X' ? 'Use 0–2 relevant tags.'
          : P.key === 'LinkedIn' ? 'Use 3–5 topic tags.'
          : P.key === 'Instagram' ? 'Use 10–15 relevant tags at end or first comment.'
          : P.key === 'Facebook' ? 'Use hashtags sparingly or omit.'
          : P.key === 'Reddit' ? 'Avoid hashtags; use subreddit flair if applicable.'
          : P.key === 'Pinterest' ? 'Use 3–5 keyworded tags in description.'
          : 'Match platform norms.'
          : 'Match platform norms.';
        add('Hashtag seeds: ' + seeds + `\nGuidance: ${platHash}`);
      }
    }

    // Hook directive (always include)
    add(
      'Hook directive:\n' +
      '- First line must stand alone before truncation.\n' +
      '- Choose one hook pattern: surprising stat, sharp question, bold claim, contrast (before/after), or 1-sentence story beat.\n' +
      '- ≤12 words if possible; no throat-clearing.'
    );

    // Behind-the-scenes frameworks
    add(
      'Framework assist:\n' +
      '- AIDA: Attention → Interest → Desire → Action.\n' +
      '- For launches: BAB (Before → After → Bridge) with one killer specific.\n' +
      '- For features: FAB (Feature → Advantage → Benefit), keep benefit human.\n' +
      '- EAST: make the desired action Easy, Attractive, Social, Timely.'
    );

    // Deliverables depend on mode
    const n = Math.max(0, parseInt(f.variant_count, 10) || 0);
    const hashtagLine = f.hashtag_seeds ? '\n- End with a "Hashtags" line (or skip on platforms that discourage them).' : '';
    const altTextReq  = '\n- If referencing an image or thumbnail, add an "Alt text" suggestion (≤ 2 sentences).';

    if ((f.task_mode||'').includes('Tailor')) {
      add(
        'Deliverables (Tailor mode):\n' +
        '- Adapted primary caption for the chosen platform, preserving must-keep elements and improving the specified targets.\n' +
        (n ? `- ${n} variant${n>1?'s':''} with distinct hooks (not mere synonym swaps).` : '- 2 alternative hooks if variants not requested.') + '\n' +
        '- Rationale of changes (what was preserved and why; what changed and why).\n' +
        '- Platform-native formatting (line breaks, emoji policy, link placement).' +
        altTextReq + hashtagLine + '\n' +
        '- No markdown fences. Plain text only.'
      );
    } else if ((f.task_mode||'').includes('Brainstorm')) {
      const ideas = Math.max(3, parseInt(f.idea_count,10) || 5);
      add(
        'Deliverables (Brainstorm mode):\n' +
        `- Idea board with ${ideas} distinct concepts. For each: Hook, 1-line value, suggested asset, 1–2 CTA options.` + '\n' +
        (String(f.draft_depth||'').includes('Mini-drafts')
          ? '- Provide 1–2 mini-drafts (2–3 sentences) for each idea.'
          : String(f.draft_depth||'').includes('Mixed')
            ? '- Provide sketches for all ideas and 2 mini-drafts for the top 2 ideas.'
            : '- Provide sketches only (hooks + one-liners).') + '\n' +
        '- Include hashtag seeds aligned to each idea and an alt-text hint for any visual.' + '\n' +
        '- Keep formatting native to the chosen platform.' + '\n' +
        '- No markdown fences. Plain text only.'
      );
    } else {
      add(
        'Deliverables (Write mode):\n' +
        '- Primary caption tailored to the chosen platform.\n' +
        (n ? `- ${n} variant${n>1?'s':''} with different hooks (not just synonyms).` : '- 2 alternative hooks if variants not requested.') + '\n' +
        '- Platform-native formatting (line breaks, emoji policy, link placement).' +
        altTextReq + hashtagLine + '\n' +
        '- No markdown fences. Plain text only.'
      );
    }

    return lines.filter(Boolean).join('\n\n');
  }
}






  ];

  // === Lightweight search hooks (optional, but makes search/snippets fast) ===
  // Mirrors how the app scores matches (label/slug/defs/tags/categories/use_cases/boosters/fields)
  for (const t of TASK_TEMPLATES){
    t.meta = t.meta || {};
    const bits = [
      t.label, t.slug, t.definition, t.help,
      ...(t.tags || []),
      ...(t.categories || []),
      ...(t.use_cases || []),
      ...(t.boosters || []),
      ...(Array.isArray(t.fields) ? t.fields.map(f => f?.label || f?.key || '') : [])
    ].filter(Boolean).join(' ').toLowerCase();
    t.meta.search_text = bits;
  }

  // Export under both names (just like TEMPLATES/FRAMEWORKS) to avoid caller drift
  root.TASK_TEMPLATES = TASK_TEMPLATES;
  root.TASKS          = TASK_TEMPLATES;

  // Node/CommonJS convenience (harmless in browser)
  if (typeof module !== 'undefined') module.exports = TASK_TEMPLATES;
})(typeof window !== 'undefined' ? window : globalThis);

