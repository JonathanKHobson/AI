

;(function(root){
  // === Data ===
  const TEMPLATES = [

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

  
    {
    id: 'abcde',
    slug: 'abcde-cbt-framework',
    label: 'ABCDE — Activating event · Belief · Consequence · Dispute · Effect',
    kind: 'framework',
    categories: ['psychology', 'self-reflection'],
    tags: [
      'type:framework','topic:cbt','topic:reframing','level:intermediate',
      'use:cognitive-bias','use:personal-coaching','use:thought-challenge'
    ],
    use_cases: [
      'reframe negative thoughts or assumptions',
      'self-coaching through emotional situations',
      'cognitive bias or stress analysis'
    ],
    boosters: [
      'Keep a calm, supportive tone when disputing the belief.',
      'Cite evidence or alternative viewpoints that challenge the negative belief.'
    ],
    definition: 'A cognitive restructuring tool to challenge a belief by examining an event, the belief, its consequence, disputing the belief, and envisioning a positive effect.',
    help: 'Describe the triggering event, your belief about it, and the outcome. The model will help dispute the belief and suggest a healthier outcome.',
    fields: [
      { key: 'event', label: 'Activating event', type: 'textarea',
        desc: 'What happened? The trigger or situation.',
        ph: 'e.g., My manager criticized my report in the team meeting.' },
      { key: 'belief', label: 'Belief or thought', type: 'textarea',
        desc: 'Your interpretation or assumption about the event.',
        ph: 'e.g., "I must be bad at my job."' },
      { key: 'consequence', label: 'Consequence (feelings/behavior)', type: 'textarea',
        desc: 'Emotions or actions that resulted from that belief.',
        ph: 'e.g., I felt anxious and avoided taking on new projects.' }
    ],
    template: ({ event, belief, consequence, ctx, audience, style, tone }) => [
      'Apply the ABCDE framework to reframe the situation.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      event && ('Activating event:\n' + event),
      belief && ('Belief:\n' + belief),
      consequence && ('Consequence:\n' + consequence),
      'Dispute: Identify evidence against the belief or an alternative perspective.',
      'Effect: Describe a healthier outcome or feeling once the belief is adjusted.'
    ].filter(Boolean).join('\n')
  },
  
  {
    id: 'addie',
    slug: 'addie-instructional-design',
    label: 'ADDIE — Analyze · Design · Develop · Implement · Evaluate',
    kind: 'framework',
    categories: ['education', 'planning'],
    tags: [
      'type:framework','topic:instructional-design','phase:plan','level:beginner',
      'use:course-development','use:lesson-planning','use:training-strategy'
    ],
    use_cases: [
      'plan and structure an educational course or program',
      'develop training materials systematically',
      'review and improve learning content'
    ],
    boosters: [
      'In Analyze, identify learner needs and constraints; in Evaluate, include metrics or feedback methods.',
      'Ensure each development step ties back to the learning objectives.'
    ],
    definition: 'An instructional design model outlining five phases for creating effective learning experiences.',
    help: 'Provide the training topic and audience. The model will walk through Analyze, Design, Develop, Implement, and Evaluate steps for a structured learning plan.',
    fields: [
      { key: 'topic', label: 'Training topic', type: 'text',
        desc: 'Subject matter or skill to be taught.',
        ph: 'e.g., Basics of Data Science' },
      { key: 'audience', label: 'Learner audience', type: 'text',
        desc: 'Who the learners are (age, role, prior knowledge).',
        ph: 'e.g., Junior marketing analysts with no coding background' },
      { key: 'objectives', label: 'Learning objectives (optional)', type: 'textarea',
        desc: 'Specific goals or outcomes for the learning (if already defined).',
        ph: 'e.g., Understand key Python libraries; build a simple regression model.' }
    ],
    template: ({ topic, audience, objectives, ctx, style, tone }) => [
      'Use the ADDIE model to design a learning experience.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      topic && `Topic: ${topic}`,
      audience && `Audience: ${audience}`,
      objectives && ('Objectives:\n' + objectives),
      'Output:\n1) Analyze: needs & constraints\n2) Design: outline format & strategy\n3) Develop: materials & activities\n4) Implement: delivery plan\n5) Evaluate: assessment & feedback method'
    ].filter(Boolean).join('\n')
  },
  
  {
    id:'aida',
    slug:'aida-model',
    label:'AIDA — Attention · Interest · Desire · Action',
    kind:'framework',
    categories:['messaging frameworks','prompt development techniques'],
    tags:[
  'type:framework','topic:messaging','phase:apply','level:beginner',
  'use:ad-copy','use:landing-page','use:email-campaign','use:social-post'
],
use_cases: [
  'ad copy',
  'landing page messaging',
  'email campaign copy',
  'social post copy',
  'ad headlines & CTAs',
  'video script teaser',
  'push notification blurb'
],
boosters: [
  "Return 3 headline/CTA variants; rank them and state the top-1 reason in one short line."
],
    definition:'A classic four-stage persuasion model that moves an audience from attention to action.',
    help:'Classic marketing flow for persuasive outputs.',
    fields:[
      {key:'product',     label:'Product/offer',            type:'text',     desc:'What you are promoting.',           ph:'e.g., Email warmup tool'},
      {key:'key_benefit', label:'Key benefit',              type:'text',     desc:'Primary value to highlight.',      ph:'e.g., Better deliverability in 2 weeks'},
      {key:'cta',         label:'Primary call-to-action',   type:'text',     desc:'The action to take.',              ph:'e.g., Start free trial'},
      {key:'constraints', label:'Constraints',              type:'textarea', desc:'Rules/limits to follow.',          ph:'e.g., <=120 words; no jargon'}
    ],
    template:({product,key_benefit,cta,constraints,ctx,audience,style,tone})=>[
      `Use AIDA to craft a persuasive message.`,
      ctx&&`Context: ${ctx}`,
      product&&`Offer: ${product}`,
      audience&&`Audience: ${audience}`,
      key_benefit&&`Key benefit/value: ${key_benefit}`,
      style&&`Style: ${style}`,
      tone&&`Tone: ${tone}`,
      constraints&&`Constraints: ${constraints}`,
      cta&&`End with this CTA: ${cta}`
    ].filter(Boolean).join('\n')
  },
  
    {
  id:'argument-map',
  slug:'argument-mapping',
  label:'Argument Mapping — Claim · Premises · Objections · Rejoinders',
  kind:'framework',
  categories:['reasoning patterns'],
  tags:[
    'type:framework','topic:argumentation','phase:structure','level:beginner'
  ],
  use_cases:[
    'Debate prep','Design trade-offs','Policy briefs','Litigation memos'
  ],
  definition:'Lay out claims, supporting premises, objections, and rebuttals as a clear tree.',
  help:'Give a thesis, premises, likely objections, and evidence. You’ll get an ASCII map and a short strength assessment.',
  fields:[
    {key:'thesis',      label:'Thesis / main claim', type:'text',     ph:'e.g., We should adopt Option B.'},
    {key:'premises',    label:'Premises (one per line)', type:'textarea', ph:'e.g., Lower cost\\nHigher reliability\\nFaster to ship'},
    {key:'evidence',    label:'Key evidence',        type:'textarea', ph:'Studies, metrics, sources'},
    {key:'objections',  label:'Objections (one per line)',type:'textarea', ph:'e.g., Vendor risk\\nMigration cost'},
    {key:'rejoinders',  label:'Rejoinders (one per line)',type:'textarea', ph:'e.g., Multi-vendor strategy\\nStaged rollout'},
    {key:'standard',    label:'Standard of proof',   type:'text',     ph:'preponderance | clear & convincing | beyond reasonable doubt'}
  ],
  boosters:[
    'Return a 1–5 confidence score and the top missing premise or evidence that would improve it most.'
  ],
  template:({thesis,premises,evidence,objections,rejoinders,standard,ctx})=>[
    'Construct an argument map.',
    ctx && `Context: ${ctx}`,
    thesis && `Thesis: ${thesis}`,
    evidence && `Evidence: ${evidence}`,
    standard && `Standard of proof: ${standard}`,
    'Output:',
    'A) ASCII tree:',
    'Claim',
    '├─ Premises',
    premises && String(premises).split(/\\n+/).filter(Boolean).map((p,i)=>`│  ├─ P${i+1}: ${p}`).join('\\n'),
    '├─ Objections',
    objections && String(objections).split(/\\n+/).filter(Boolean).map((o,i)=>`│  ├─ O${i+1}: ${o}`).join('\\n'),
    '└─ Rejoinders',
    rejoinders && String(rejoinders).split(/\\n+/).filter(Boolean).map((r,i)=>`   ├─ R${i+1}: ${r}`).join('\\n'),
    'B) Assessment: note strongest premise, strongest objection, and net strength.',
    'C) Revision: refined thesis if warranted.'
  ].filter(Boolean).join('\n')
},

{
    id: 'bab',
    slug: 'before-after-bridge-formula',
    label: 'Before-After-Bridge (BAB) — Before state · After state · Bridge (solution)',
    kind: 'framework',
    categories: ['messaging frameworks', 'marketing'],
    tags: [
      'type:framework','topic:copywriting','phase:compose','level:beginner',
      'use:value-proposition','use:ad-copy','use:pitch'
    ],
    use_cases: [
      'highlight a product’s impact by contrasting life before vs. after its use',
      'craft persuasive marketing copy or landing page sections',
      'explain change by showing the transformation a solution provides'
    ],
    boosters: [
      'Make the "Before" scenario relatable and painful; make the "After" state clearly desirable.',
      'Present the solution (Bridge) as the unique link that makes the positive after-state possible.'
    ],
    definition: 'A persuasion formula that contrasts the audience’s world before and after a solution, then positions the solution as the bridge to get from before to after.',
    help: 'Describe the target audience’s current situation (Before) and the ideal future (After), and specify your solution. The model will craft a message that amplifies the pain of the before state, the appeal of the after state, and shows the solution as the bridge.',
    fields: [
      { key: 'before', label: 'Before — current pain point', type: 'textarea',
        desc: 'The problem state or situation the audience is facing now.',
        ph: 'e.g., Small business owners manually track invoices, causing errors and late payments.' },
      { key: 'after', label: 'After — desired outcome', type: 'textarea',
        desc: 'The improved state or benefit once the problem is solved.',
        ph: 'e.g., They have an automated system, so all invoices are tracked and paid on time with no effort.' },
      { key: 'product', label: 'Bridge — solution/offering', type: 'text',
        desc: 'The product or service that bridges the gap (your offering).',
        ph: 'e.g., PayEasy automated invoicing software' }
    ],
    template: ({ before, after, product, ctx, audience, style, tone }) => [
      'Use the Before-After-Bridge formula to craft a persuasive message.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      before && ('Before:\n' + before),
      after && ('After:\n' + after),
      product && (`Bridge (solution): ${product}`),
      'Output:\n1) Paint the “before” scenario (pain)\n2) Describe the “after” scenario (gain)\n3) Introduce the solution as the bridge between them'
    ].filter(Boolean).join('\n')
  },

{
  id:'bias_interrupters',
  slug:'bias-interrupters',
  label:'Bias Interrupters (process checks)',
  kind:'pattern',
  categories:['people','ethics','operations'],
  tags:[
    'type:pattern','topic:bias-interrupters','topic:rubrics','level:intermediate',
    'use:hiring','use:evaluation','use:promotion'
  ],
  use_cases:[
    'add measurable process tweaks to interrupt bias',
    'operationalize fair evaluation',
    'track change over time'
  ],
  definition:'System-level checks to interrupt bias in hiring, evaluation, and promotion using measurable tweaks.',
  help:'Choose a process step, name bias risks, add an interrupter strategy, pick a metric, and plan iteration.',
  boosters:[
    'Force a named owner per metric.',
    'Define success and a review cadence (e.g., quarterly).'
  ],
  fields:[
    { key:'process_step', label:'Process step', type:'text', ph:'Hiring / Evaluation / Promotion / Review' },
    { key:'bias_risk',    label:'Bias risk(s)', type:'textarea', ph:'Gut-feel; halo effect; similarity bias…' },
    { key:'strategy',     label:'Interrupter strategy', type:'textarea', ph:'Structured interviews; rubrics; anonymization…' },
    { key:'metric',       label:'Metric to track', type:'textarea', ph:'e.g., Score variance by rubric item; pass-through by group…' },
    { key:'iteration',    label:'Iteration plan', type:'textarea', ph:'What to refine next cycle and when.' }
  ],
  template: ({ process_step, bias_risk, strategy, metric, iteration, ctx, audience, style, tone }) => [
    'Design a bias-interrupter for a people process with clear metrics.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    process_step && `Process step: ${process_step}`,
    bias_risk && ('Bias risks:\n' + bias_risk),
    strategy && ('Interrupter strategy:\n' + strategy),
    metric && ('Metric(s) to track:\n' + metric),
    iteration && ('Iteration plan:\n' + iteration),
    'Output:\n1) Interrupter spec\n2) Owner + start date\n3) Metric w/ target\n4) Review cadence\n5) Risks & mitigations'
  ].filter(Boolean).join('\n')
},

{
  id:'bias_impact_assessment',
  slug:'bias-impact-assessment',
  label:'Bias Impact Assessment (AI/tech)',
  kind:'pattern',
  categories:['ai','ethics','risk'],
  tags:[
    'type:pattern','topic:impact-assessment','topic:transparency','level:advanced',
    'use:pre-launch','use:model-review','use:policy'
  ],
  use_cases:[
    'assess bias risks for systems before launch',
    'define mitigations and transparency steps',
    'plan follow-up monitoring'
  ],
  definition:'Pre-launch assessment modeled on impact reports to surface stakeholders, risks, mitigations, and monitoring.',
  help:'Name the system and purpose, list stakeholders, map bias risks, define mitigations & transparency, add monitoring.',
  boosters:[
    'Include an explainability note (e.g., model cards/datasheets).',
    'Propose a drift/impact monitoring threshold and response path.'
  ],
  fields:[
    { key:'system',       label:'System / algorithm / product name', type:'text', ph:'Name/version' },
    { key:'purpose',      label:'Intended purpose', type:'textarea', ph:'Primary task and success measures.' },
    { key:'stakeholders', label:'Stakeholders affected (one per line)', type:'textarea', ph:'Groups/roles.' },
    { key:'risks',        label:'Bias risks identified', type:'textarea', ph:'Inputs, labels, sampling, shift, proxy variables…' },
    { key:'mitigation',   label:'Mitigation steps', type:'textarea', ph:'Data/process/model changes; human-in-the-loop…' },
    { key:'transparency', label:'Transparency / explainability measures', type:'textarea', ph:'Docs, disclosures, appeal paths…' },
    { key:'monitoring',   label:'Follow-up monitoring plan', type:'textarea', ph:'Metrics, thresholds, cadence, owner.' }
  ],
  template: ({ system, purpose, stakeholders, risks, mitigation, transparency, monitoring, ctx, audience, style, tone }) => [
    'Create a Bias Impact Assessment for an AI/tech system.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    system && `System: ${system}`,
    purpose && ('Intended purpose:\n' + purpose),
    stakeholders && (
      'Stakeholders:\n' + String(stakeholders).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    risks && ('Bias risks:\n' + risks),
    mitigation && ('Mitigation steps:\n' + mitigation),
    transparency && ('Transparency / explainability:\n' + transparency),
    monitoring && ('Monitoring plan:\n' + monitoring),
    'Output:\n1) System + purpose\n2) Stakeholders\n3) Risks\n4) Mitigations\n5) Transparency plan\n6) Monitoring plan (metric + threshold + owner)'
  ].filter(Boolean).join('\n')
},

{
  id:'blooms',
  slug:'blooms-taxonomy',
  label:'Bloom’s — Remember · Understand · Apply · Analyze · Evaluate · Create',
  kind:'framework',
  categories:['education','critical thinking frameworks'],
  tags:[
    'type:framework','topic:learning','phase:design','level:beginner',
    'use:learning-objectives','use:quiz-items','use:lesson-plans'
  ],
  use_cases:[
    'Write learning objectives','Create quiz/homework items','Plan lessons/projects'
  ],
  definition:'Generate objectives or questions aligned to a chosen Bloom level.',
  help:'Pick the level and topic; get measurable verbs and aligned tasks.',
  fields:[
    {key:'topic',    label:'Topic',     type:'text',     ph:'e.g., Binary search trees'},
    {key:'level',    label:'Bloom level',type:'text',    ph:'remember | understand | apply | analyze | evaluate | create'},
    {key:'n',        label:'# of items', type:'text',    ph:'e.g., 3'},
    {key:'constraints',label:'Constraints',type:'text',  ph:'e.g., measurable verbs; ≤120 words each'}
  ],
  boosters:[
    'Use measurable verbs; include success criteria; scaffold from easier to harder.'
  ],
  template:({topic,level,n,constraints,ctx,audience,style,tone})=>{
    const N = Number.parseInt(n||'3',10) || 3;
    return [
      'Create Bloom-aligned outputs.',
      ctx && `Context: ${ctx}`,
      topic && `Topic: ${topic}`,
      level && `Level: ${level}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      constraints && `Constraints: ${constraints}`,
      `Output: ${N} ${level||'level'} learning ${level && level.match(/create|analy|evalu/i)?'tasks':'objectives/questions'} with:`,
      '- Measurable verb; prompt; expected answer traits; success criteria.'
    ].filter(Boolean).join('\n')
  }
},
  
  {
    id:'clear',
    slug:'clear-framework',
    label:'CLEAR — Challenge · Limitation · Effect · Action · Result',
    kind:'framework',
    categories:['analysis frameworks','prompt development techniques'],
    tags:[
  'type:framework','topic:analysis','phase:apply','level:beginner',
  'use:problem-framing','use:retrospective','use:decision-record'
],
use_cases: [
  'problem framing',
  'decision record',
  'risk assessment',
  'root-cause write-up',
  'retrospective summary',
  'proposal justification',
  'change request rationale'
],
boosters: [
  "End with a one-paragraph “Decision record” that links Action→Effect→Result explicitly."
],
    definition:'A problem-framing flow that surfaces constraints and outcomes.',
    help:'Problem-framing flow to surface constraints and outcomes.',
    fields:[
      {key:'challenge',  label:'Challenge',  type:'textarea', desc:'Problem context.',      ph:'e.g., Low onboarding completion'},
      {key:'limitation', label:'Limitation', type:'textarea', desc:'Constraints/risks.',    ph:'e.g., No in-app messaging yet'},
      {key:'effect',     label:'Effect',     type:'textarea', desc:'Observed impact.',      ph:'e.g., High drop-off at step 2'},
      {key:'action',     label:'Action',     type:'textarea', desc:'Intervention/plan.',    ph:'e.g., Add email nudge + tooltip'},
      {key:'result',     label:'Result',     type:'textarea', desc:'Outcome/measure.',      ph:'e.g., Onboarding completion +15%'}
    ],
    template:({challenge,limitation,effect,action,result,ctx})=>[
      ctx&&`Context: ${ctx}`,
      `Use the CLEAR framing to structure the answer.`,
      challenge&&`Challenge: ${challenge}`,
      limitation&&`Limitation: ${limitation}`,
      effect&&`Effect: ${effect}`,
      action&&`Action: ${action}`,
      result&&`Result: ${result}`
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'clear_path',
  slug:'clear-path-forward-framework',
  label:'CLEAR Path Forward — Concise · Logical · Explicit · Adaptive · Reflective',
  kind:'framework',
  categories:['prompt development techniques','prompt literacy'],
  tags:[
    'type:framework','topic:prompting','phase:apply','level:beginner',
    'use:prompt-optimization','use:prompt-iteration','use:clarifying-questions','use:next-step'
  ],
  use_cases: [
    'prompt optimization','clarifying prompts','next-step planning',
    'teaching prompt literacy','debugging failed prompts'
  ],
  definition:'An AI prompt literacy framework that shapes a next best prompt via concise goals, logical steps, explicit constraints, adaptive context, and reflective checks.',
  help:'Use to tighten a messy prompt and identify the next concrete step.',
  fields:[
    {key:'concise',   label:'Concise (goal in one line)',       type:'text',     desc:'Single-sentence objective.',         ph:'e.g., Summarize the paper for a lay audience'},
    {key:'logical',   label:'Logical (steps/structure)',        type:'textarea', desc:'Outline reasoning or steps.',         ph:'e.g., Read → Extract key claims → Simplify → Check terms'},
    {key:'explicit',  label:'Explicit (rules/format/defs)',     type:'textarea', desc:'Constraints, definitions, formats.',  ph:'e.g., 120–150 words; define “overfitting”; Markdown'},
    {key:'adaptive',  label:'Adaptive (audience/context)',      type:'textarea', desc:'Who/where this applies; edge cases.', ph:'e.g., For non-technical policy analysts; US context'},
    {key:'reflective',label:'Reflective (checks/criteria)',     type:'textarea', desc:'Quality checks or acceptance tests.', ph:'e.g., No jargon; 2 factual references; no policy claims'}
  ],
  boosters:[
    'Propose an improved next prompt (≤3 lines) and one concrete next action.'
  ],
  template:({concise,logical,explicit,adaptive,reflective,ctx})=>[
    `Apply the CLEAR Path Forward framework to optimize the prompt and next action.`,
    ctx&&`Context: ${ctx}`,
    concise&&`Concise goal: ${concise}`,
    logical&&`Logical plan: ${logical}`,
    explicit&&`Explicit constraints/format: ${explicit}`,
    adaptive&&`Adaptive context: ${adaptive}`,
    reflective&&`Reflective checks: ${reflective}`
  ].filter(Boolean).join('\n')
},

{
  id:'clear_pm',
  slug:'clear-prompting-method',
  label:'CLEAR Prompting Method — Clarity · Length · Empathy · Actionability · Relevance',
  kind:'framework',
  categories:['prompt development techniques'],
  tags:[
    'type:framework','topic:prompting','phase:apply','level:beginner',
    'use:prompt-hygiene','use:length-control','use:audience-empathy','use:scope-management'
  ],
  use_cases: [
    'prompt hygiene','length control','audience fit',
    'scope management','instruction cleanup'
  ],
  definition:'A prompting checklist to improve clarity, respect length, empathize with the reader, ensure actionability, and maintain relevance.',
  help:'Use to “clean up” instructions before sending to a model.',
  fields:[
    {key:'clarity',       label:'Clarity (must-include info)', type:'textarea', desc:'Remove ambiguity; define terms.',      ph:'e.g., Define “qualified lead”; include timeframe'},
    {key:'length',        label:'Length (limit)',               type:'text',     desc:'Word/token/section limits.',          ph:'e.g., ≤150 words'},
    {key:'empathy',       label:'Empathy (audience needs)',     type:'textarea', desc:'Reader persona/concerns.',            ph:'e.g., Busy execs; prefer bullet points'},
    {key:'actionability', label:'Actionability (doable steps)', type:'textarea', desc:'What the model should do/produce.',   ph:'e.g., Provide 3 options + 1 pick with rationale'},
    {key:'relevance',     label:'Relevance (in/out of scope)',  type:'textarea', desc:'Focus and exclusions.',               ph:'e.g., Focus on onboarding; exclude pricing'}
  ],
  boosters:[
    'Return an edited, tightened prompt honoring the length; list any removed ambiguity in one line.'
  ],
  template:({clarity,length,empathy,actionability,relevance,ctx})=>[
    `Apply the CLEAR Prompting Method to refine the instructions.`,
    ctx&&`Context: ${ctx}`,
    clarity&&`Clarity requirements: ${clarity}`,
    length&&`Length limit: ${length}`,
    empathy&&`Audience empathy: ${empathy}`,
    actionability&&`Actionability: ${actionability}`,
    relevance&&`Relevance (scope): ${relevance}`
  ].filter(Boolean).join('\n')
},

{
  id:'cognitive_debiasing',
  slug:'cognitive-debiasing',
  label:'Cognitive Debiasing',
  kind:'pattern',
  categories:['ethics','bias','critical thinking'],
  tags:[
    'type:pattern','topic:debiasing','topic:consider-the-opposite','level:beginner',
    'use:analysis','use:strategy','use:review'
  ],
  use_cases:[
    'document a current assumption and actively seek disconfirming evidence',
    'run a quick pre-mortem on a plan',
    'decide next adjustment with rationale'
  ],
  definition:'A light-weight scaffold combining “consider the opposite,” disconfirming evidence, and pre-mortem moves.',
  help:'Name the bias risk, state the assumption, generate an opposite scenario, list disconfirming evidence, choose a next step.',
  boosters:[
    'Cite at least 2 credible, independent sources that challenge your assumption.',
    'Add a one-line pre-mortem: “If this failed in 6 weeks, it would be because…”'
  ],
  fields:[
    { key:'bias',        label:'Bias in question', type:'text', ph:'Anchoring / Confirmation / Availability / Other' },
    { key:'initial',     label:'My initial assumption', type:'textarea', ph:'Write it down plainly.' },
    { key:'opposite',    label:'Opposite scenario — What if the opposite is true?', type:'textarea', ph:'Spell the plausible opposite.' },
    { key:'disconfirm',  label:'Disconfirming evidence (≥2, one per line)', type:'textarea', ph:'Source, fact, or datapoint per line.' },
    { key:'premortem',   label:'Pre-mortem (optional) — If this failed, why?', type:'textarea', ph:'Top 1–3 failure reasons.' },
    { key:'decision',    label:'Next step decision — What will I adjust?', type:'textarea', ph:'Change of plan, metric, gate, or experiment.' }
  ],
  template: ({ bias, initial, opposite, disconfirm, premortem, decision, ctx, audience, style, tone }) => [
    'Apply a cognitive debiasing pass.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    bias && `Bias in question: ${bias}`,
    initial && ('Initial assumption:\n' + initial),
    opposite && ('Opposite scenario:\n' + opposite),
    disconfirm && (
      'Disconfirming evidence:\n' + String(disconfirm).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    premortem && ('Pre-mortem:\n' + premortem),
    decision && ('Next step decision:\n' + decision),
    'Output:\n1) Assumption vs. opposite\n2) Disconfirming evidence (≥2)\n3) Decision & rationale\n4) Follow-up check in 2–4 weeks'
  ].filter(Boolean).join('\n')
},


{
    id:'comparative_analysis',
    slug:'comparative-analysis',
    label:'Comparative Analysis — rank • pros/cons • matrix',
    kind:'framework',
    categories:['analysis frameworks','decision support'],
    tags:[
      'type:framework','topic:comparison','topic:evaluation','phase:apply','level:intermediate'
    ],
    use_cases:[
      'choose between options','competitive analysis','tool selection','feature trade-offs'
    ],
    definition:'Compare multiple options using a selected comparison style (ranking, pros/cons, table, weighted matrix, etc.).',
    help:'Pick a comparison style, list the options (one per line), and optionally add criteria (weights with "name:weight").',
    boosters:[
      'End with a concise recommendation and next steps.',
      'Surface key trade-offs in one short line per option.',
      'If criteria are provided with weights, show the score math simply (no long reasoning).'
    ],
    fields:[
      { key:'topic',   label:'Topic / decision context', type:'text',
        ph:'e.g., Choose a JavaScript charting library for dashboards' },

      { key:'compare_style', label:'Comparison style', type:'select',
        desc:'The prompt adapts to your choice.',
        options:[
          { value:'pros-cons', label:'Pros & Cons' },
          { value:'for-against', label:'For & Against' },
          { value:'benefits-risks', label:'Benefits vs. Risks' },
          { value:'strengths-weaknesses', label:'Strengths & Weaknesses' },
          { value:'similarities-differences', label:'Similarities & Differences' },
          { value:'chart', label:'Chart' },
          { value:'venn', label:'Venn' },
          { value:'decision-tree', label:'Decision Tree' },
          { value:'heatmap', label:'Heat Map' },
          { value:'rank',      label:'Ranked List' },
          { value:'rating',    label:'Rating Scale' },
          { value:'weighted-matrix', label:'Weighted Criteria Matrix' },
          { value:'tiering',   label:'Tiering (S/A/B...)' },
          { value:'table',     label:'Side-by-Side Table' },
          { value:'point-by-point', label:'Point-by-Point' },
          { value:'block',     label:'Block Comparison' },
          { value:'benchmarking', label:'Benchmarking (vs gold standard)' },
          { value:'case-studies', label:'Case Studies' },
          { value:'analogies', label:'Analogies & Metaphors' },
          { value:'before-after', label:'Before vs After' },
          { value:'scenario',  label:'Scenario-Based' }
        ]
      },

      { key:'items',   label:'Options to compare (one per line)', type:'textarea',
        ph:'Option A\nOption B\nOption C' },

      { key:'criteria',label:'Criteria (one per line, optional weights)', type:'textarea',
        desc:'Optionally add weights like "cost:30", "ease of use:20". Unweighted criteria default to equal weight.',
        ph:'cost:30\necosystem:20\nperformance:25\nlearning curve:25' },

      { key:'scale_max',label:'Rating scale max (only for Rating Scale)', type:'text',
        ph:'10' },

      { key:'rules',  label:'Output rules / format preferences (optional)', type:'textarea',
        ph:'e.g., Markdown table; keep each pro/con ≤12 words; include tie-break rules.' }
    ],
    template:({topic,compare_style,items,criteria,scale_max='10',rules,ctx,audience,style,tone})=>{
      const list = String(items||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
      const critList = String(criteria||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
      const parsed = critList.map(c=>{
        const m = c.match(/^(.+?):\s*([0-9]+(?:\.[0-9]+)?)\s*$/i);
        return m ? {name:m[1].trim(), weight:parseFloat(m[2])} : {name:c, weight:null};
      });
      const hasWeights = parsed.some(c=>c.weight!==null);
      const simpleCriteria = parsed.map(c=>c.name).join(', ');
      const weightedLine = hasWeights
        ? parsed.map(c=>`${c.name} (${c.weight}%)`).join(', ')
        : simpleCriteria;

      const styleLine = (()=>{
        switch(compare_style){
          case 'for-against':
            return 'Lay out arguments "for" and "against" each option, then weigh balance of evidence.';
           case 'benefits-risks':
            return 'Lay out the benefits and risks for each option, then weigh and compare the benefits vs. the risks.';
          case 'strengths-weaknesses':
            return 'List strengths and weaknesses per option with one-line explanations.';
          case 'similarities-differences':
            return 'Make a two-column list: similarities on the left, differences on the right.';
          case 'rank':
            return 'Produce a ranked list (best → worst) with one-line justification per item.';
          case 'rating':
            return `Rate each item on a 1–${scale_max} scale for each criterion, show subtotals and a final average; break ties with a brief rationale.`;
          case 'weighted-matrix':
            return `Build a weighted criteria matrix. Criteria${hasWeights? ' (with weights)':''}: ${weightedLine}. Show per-criterion scores and a weighted total.`;
          case 'tiering':
            return 'Assign each item to tiers (S/A/B...) with one-line reason per assignment.';
          case 'table':
            return 'Create a side-by-side Markdown table: rows = criteria/features, columns = options. Keep cells concise.';
          case 'point-by-point':
            return 'Compare point-by-point across criteria: list each criterion and discuss how each option fares.';
          case 'block':
            return 'Write compact blocks: Option A summary, Option B summary, Option C summary; end with synthesis.';
          case 'benchmarking':
            return 'Benchmark each item against a named gold standard; call out gaps and advantages.';
          case 'case-studies':
            return 'Use short case snippets to illustrate differences; cite realistic scenarios.';
          case 'analogies':
            return 'Use clear analogies/metaphors to contrast items; keep analogies concrete.';
          case 'before-after':
            return 'Show before/after outcomes per option for the same scenario.';
          case 'scenario':
            return 'Test each option in the same hypothetical scenario; report outcomes and risks.';
          case 'chart':
            return 'Render comparison as a chart (bar, radar, scatter, etc.); include axis/legend labels.';
            case 'venn':
    return 'Draw a Venn diagram: overlapping area = shared traits, outer zones = unique traits.';
    case 'decision-tree':
    return 'Map a decision tree: branches show which option applies under which condition.';
    case 'heatmap':
    return 'Build a heatmap grid of items × criteria; color intensity signals performance.';
          default:
            return 'List pros & cons per option in bullet form, then synthesize trade-offs.';
        }
      })();

      const itemsBlock = list.length ? ('Options:\n' + list.map((t,i)=>`${i+1}. ${t}`).join('\n')) : '';
      const critBlock  = parsed.length ? (`Criteria:${hasWeights? ' (weights in %)':''}\n` + parsed.map(c=>`- ${c.name}${c.weight!==null?`: ${c.weight}%`:''}`).join('\n')) : '';

      return [
        'Perform a comparative analysis.',
        topic && `Topic/decision: ${topic}`,
        ctx && `Context: ${ctx}`,
        audience && `Audience: ${audience}`,
        style && `Style: ${style}`,
        tone && `Tone: ${tone}`,
        itemsBlock,
        critBlock,
        `Comparison mode: ${compare_style || 'pros-cons'}`,
        styleLine,
        rules && `Output rules: ${rules}`,
        'End with: (1) succinct recommendation, (2) key trade-offs in one line, (3) next steps or what could change the decision.'
      ].filter(Boolean).join('\n');
    }
  },
  
  {
  id:'constraint_flip',
  slug:'constraint-flip',
  label:'Constraint Flip (play with edges)',
  kind:'pattern',
  categories:['creativity','strategy'],
  tags:['type:pattern','topic:constraints','use:ideation','level:beginner'],
  use_cases:[
    'turn constraints into generators of ideas',
    'explore exaggerated and removed constraint states'
  ],
  definition:'Treat a constraint as a lever: exaggerate it to find new ideas; remove it to find alternatives.',
  help:'Name a real blocker; brainstorm both exaggerated and removed scenarios.',
  boosters:[
    'Write at least 3 ideas in each direction.',
    'Pick one idea to prototype this week.'
  ],
  fields:[
    { key:'limiting',   label:'What’s limiting me right now?', type:'textarea' },
    { key:'exaggerate', label:'If I exaggerated that constraint, what new idea emerges?', type:'textarea' },
    { key:'remove',     label:'If I removed it entirely, what could I try?', type:'textarea' }
  ],
  template: ({ limiting, exaggerate, remove, ctx, audience, style, tone }) => [
    'Flip the constraint to generate options.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    limiting && ('Constraint:\n' + limiting),
    exaggerate && ('Exaggerated constraint → ideas:\n' + exaggerate),
    remove && ('Removed constraint → ideas:\n' + remove),
    'Output:\n1) Constraint summary\n2) Ideas (exaggerate)\n3) Ideas (remove)\n4) One prototype to run'
  ].filter(Boolean).join('\n')
},
  
  {
    id:'costar',
    slug:'costar-framework',
    label:'COSTAR — Context · Objective · Style · Tone · Audience · Response',
    kind:'pattern',
    categories:['prompt development techniques','messaging frameworks'],
    tags:[
  'type:pattern','topic:prompting','phase:apply','level:beginner',
  'use:creative-brief','use:message-brief','use:content-brief'
],
use_cases: [
  'creative brief',
  'message brief',
  'content brief',
  'campaign brief',
  'UX copy brief',
  'press/news announcement brief'
],
boosters: [
  "Verify each COSTAR element is addressed; then output the final message under “Final response:”"
],
    definition:'A context-first messaging recipe encoding context, objective, style, tone, audience, and response format.',
    help:'Popular structure that bakes in style/tone and output format.',
    fields:[
      {key:'context',  label:'Context',  type:'textarea', desc:'Background, problem, scenario.',           ph:'e.g., Announcing a new feature to free users'},
      {key:'objective',label:'Objective',type:'text',     desc:'What the message must achieve.',           ph:'e.g., Drive upgrades to Pro'},
      {key:'style',    label:'Style (overrides common)', type:'text',  desc:'Writing style.',               ph:'e.g., Practical, plain language'},
      {key:'tone',     label:'Tone (overrides common)',  type:'text',  desc:'Emotional flavor.',            ph:'e.g., Friendly, confident'},
      {key:'audience', label:'Audience (overrides common)', type:'text', desc:'Who this is for.',           ph:'e.g., Busy SMB owners'},
      {key:'response', label:'Response format', type:'text', desc:'Desired output structure.',             ph:'e.g., Markdown outline with H2s'}
    ],
    template:({context,objective,style,tone,audience,response,ctx})=>[
      (ctx||context)&&`Context: ${ctx?ctx:context}`,
      objective&&`Objective: ${objective}`,
      (style)&&`Style: ${style}`,
      (tone)&&`Tone: ${tone}`,
      audience&&`Audience: ${audience}`,
      response&&`Response format: ${response}`,
      `Follow COSTAR. Ask clarifying Qs only if blocking.`
    ].filter(Boolean).join('\n')
  },
  
   {
    id: 'eisenhower_matrix',
    slug: 'eisenhower-priority-matrix',
    label: 'Eisenhower Matrix — Urgent/Important Prioritization',
    kind: 'framework',
    categories: ['productivity', 'prioritization'],
    tags: [
      'type:framework','topic:time-management','phase:plan','level:beginner',
      'use:task-prioritization','use:time-management','use:workflow'
    ],
    use_cases: [
      'categorize tasks by urgency and importance',
      'decide what to do now, schedule for later, delegate, or drop',
      'improve personal productivity or team task management'
    ],
    boosters: [
      'Include a brief justification for why each task falls into its category.',
      'If multiple tasks land in one category, rank them or suggest which to tackle first.'
    ],
    definition: 'A time-management framework that sorts tasks into four categories: Do (urgent & important), Schedule (important but not urgent), Delegate (urgent but not important), and Eliminate (neither).',
    help: 'List your tasks. Optionally provide context like deadlines or importance. The model will assign each task to one of four categories (Do now, Schedule, Delegate, Eliminate) using the Eisenhower urgency/importance matrix.',
    fields: [
      { key: 'tasks', label: 'Tasks (one per line)', type: 'textarea',
        desc: 'A list of tasks or to-dos to be prioritized.',
        ph: 'Task 1…\nTask 2…\nTask 3…' },
      { key: 'context', label: 'Context (optional)', type: 'textarea',
        desc: 'Deadlines, importance cues, or other info for the tasks (if any).',
        ph: 'e.g., Task 1 due tomorrow; Task 2 is optional cleanup; Task 3 critical for client meeting.' }
    ],
    template: ({ tasks, context, ctx, style, tone }) => [
      'Apply the Eisenhower Matrix to categorize the tasks by urgency and importance.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      context && ('Additional context:\n' + context),
      tasks && (
        'Tasks:\n' + String(tasks).split(/\n+/).map(s => s.trim()).filter(Boolean).map((t,i) => `${i+1}. ${t}`).join('\n')
      ),
      'Return tasks grouped into 4 categories (with labels): Do (Urgent & Important), Schedule (Important but Not Urgent), Delegate (Urgent but Not Important), Eliminate (Neither).'
    ].filter(Boolean).join('\n')
  },
  
  {
    id: 'fab',
    slug: 'feature-advantage-benefit',
    label: 'FAB — Feature · Advantage · Benefit',
    kind: 'framework',
    categories: ['messaging frameworks', 'marketing'],
    tags: [
      'type:framework','topic:copywriting','phase:apply','level:beginner',
      'use:product-marketing','use:sales-copy','use:value-messaging'
    ],
    use_cases: [
      'turn product features into user-focused benefits for marketing copy',
      'train a model to articulate why a feature matters to customers',
      'create sales bullets or product descriptions emphasizing value'
    ],
    boosters: [
      'Translate technical features into plain advantages and user benefits.',
      'Ensure the benefit addresses a specific customer need or pain point.'
    ],
    definition: 'A classic product messaging formula that starts with a Feature of a product, explains the Advantage (what it does), and concludes with the Benefit (why it matters to the user).',
    help: 'Provide a key product feature. The model will respond with the feature, its advantage, and the benefit to the customer, helping make your messaging more customer-centric.',
    fields: [
      { key: 'feature', label: 'Product feature', type: 'text',
        desc: 'A specific feature or attribute of your product/offer.',
        ph: 'e.g., Real-time analytics dashboard' },
      { key: 'constraints', label: 'Constraints (optional)', type: 'text',
        desc: 'Any format or length constraints.',
        ph: 'e.g., 1 sentence per item; use bullet points.' }
    ],
    template: ({ feature, constraints, ctx, audience, style, tone }) => [
      'Use the FAB framework to highlight the feature, what it does, and why it matters.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      feature && `Feature: ${feature}`,
      'Advantage: <the model will explain what the feature does or how it\'s better>',
      'Benefit: <the model will explain why that advantage is valuable to the user>',
      constraints && `Constraints: ${constraints}`
    ].filter(Boolean).join('\n')
  },
  
    {
    id:'facts_primer',
    slug:'facts-expertise-primer',
    label:'Facts & Expertise Primer',
    kind:'framework',
    categories:['prompt development techniques','quality scaffolds'],
    tags:[
      'type:framework','topic:priming','topic:fact-checking','phase:setup','level:beginner'
    ],
    use_cases:[
      'prime a conversation with domain facts',
      'reduce hallucinations',
      'scope an expert role before a task'
    ],
    definition:'Prime the model with verified facts, role, and scope constraints before asking for an output.',
    help:'List facts one-per-line (or use the add-row control). The prompt will ground itself in those facts and mark unknowns.',
    boosters:[
      'Explicitly mark unknowns and ask up to 3 clarifying questions if needed.',
      'Prefer verifiable facts over speculation.',
      'Keep rationales to one short sentence unless asked to elaborate.'
    ],
    fields:[
      { key:'role',    label:'Role to embody (optional)', type:'text',
        ph:'e.g., Senior epidemiologist focused on respiratory viruses' },
      { key:'domain',  label:'Domain / scope', type:'text',
        ph:'e.g., US healthcare billing (2023–2025) • EU privacy law • K-12 math' },
      { key:'facts',   label:'Facts / known truths (one per line)', type:'textarea',
        desc:'One fact per line. Commas are OK; they will be split. Add short notes with ":" if useful.',
        ph:'e.g., HIPAA applies to covered entities\nGDPR requires lawful basis for processing' },
      { key:'pitfalls',label:'Known pitfalls / myths to avoid', type:'textarea',
        ph:'e.g., “Vitamin C cures colds” is a myth; do not claim it.' },
      { key:'task',    label:'Initial task or question', type:'textarea',
        ph:'e.g., Draft a one-page overview of consent requirements for telehealth.' },
      { key:'rigor',   label:'Rigor / citation expectations (optional)', type:'text',
        ph:'e.g., Cite authoritative sources; avoid fabricated citations.' }
    ],
    template:({role,domain,facts,pitfalls,task,rigor,ctx,audience,style,tone})=>{
      const factLines = String(facts||'')
        .split(/\n+|,/)
        .map(s=>s.trim())
        .filter(Boolean)
        .map((t,i)=>`${i+1}. ${t}`)
        .join('\n');

      return [
        'You are being primed with facts and scope before performing a task.',
        role   && `Adopt role: ${role}`,
        domain && `Domain/scope: ${domain}`,
        ctx    && `Context: ${ctx}`,
        audience && `Audience: ${audience}`,
        style  && `Style: ${style}`,
        tone   && `Tone: ${tone}`,
        factLines && `Facts (treat as ground truth):\n${factLines}`,
        pitfalls && `Avoid known pitfalls/myths:\n${pitfalls}`,
        rigor && `Rigor expectations: ${rigor}`,
        'Behavioral rules:',
        '- Prefer verifiable facts; do not invent sources.',
        '- If information is missing or ambiguous, explicitly list unknowns and ask up to 3 clarifying questions.',
        '- Keep rationales concise; do not reveal hidden chain-of-thought.',
        task && `Initial task:\n${task}`
      ].filter(Boolean).join('\n');
    }
  },
  
  {
    id: 'feynman',
    slug: 'feynman-technique',
    label: 'Feynman Technique — Explain Like I’m 5',
    kind: 'pattern',
    categories: ['education', 'learning'],
    tags: [
      'type:pattern','topic:simplification','topic:teaching','level:beginner',
      'use:explanation','use:knowledge-check','use:debug-understanding'
    ],
    use_cases: [
      'simplify complex concepts for a broader audience',
      'identify gaps in understanding by attempting a simple explanation',
      'learn or teach a new topic by breaking it down'
    ],
    boosters: [
      'Use analogies a child would understand to explain difficult concepts.',
      'Identify any technical terms in the explanation and immediately clarify them in simpler words.'
    ],
    definition: 'A learning strategy where you try to explain a concept in simple terms (as if to a child), revealing gaps in understanding to address.',
    help: 'Provide a topic or concept. The model will give a simple explanation (ELI5 style) and clarify any parts that might still be confusing, following the Feynman Technique.',
    fields: [
      { key: 'concept', label: 'Concept or topic', type: 'textarea',
        desc: 'The subject you want explained simply.',
        ph: 'e.g., Quantum entanglement' }
    ],
    template: ({ concept, ctx, style, tone }) => [
      'Explain the concept as if teaching a 5-year-old, then clarify any tricky parts.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      concept && `Concept: ${concept}`,
      'Output:\n1) Simple Explanation\n2) Clarifications for any complex terms or ideas'
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'few_shot',
  slug:'few-shot-examples',
  label:'Examples / Few-Shot Prompting',
  kind:'pattern',
  categories:['prompt development techniques','prompt literacy'],
  tags:[
    'type:pattern','topic:examples','topic:few-shot','phase:apply','level:beginner',
    'use:format-guidance','use:style-transfer','use:output-shaping'
  ],
  use_cases:[
    'show ideal output format with 1+ shots',
    'demonstrate style/voice to imitate',
    'constrain outputs to examples'
  ],
  definition:'Guide the model by supplying one or more example outputs (“shots”) to anchor format and tone.',
  help:'Add a main brief/goal, then list examples (one per line). The model mirrors structure/style from the shots.',
  boosters:[
    'Begin with a short description of the desired format before listing examples.',
    'Number the examples and refer back to them explicitly.',
    'Prefer short, high-signal examples over long rambles.'
  ],
  fields:[
    { key:'main',     label:'Main brief / goal',     type:'textarea',
      desc:'What you want, in plain language.',
      ph:'e.g., Generate a product description in the style below.' },
    { key:'examples', label:'Examples / shots (one per line)', type:'textarea',
      desc:'Provide one example per line (short is fine).',
      ph:'Example 1…\nExample 2…\nExample 3…' },
    { key:'dos',      label:"Do's (must do)",        type:'textarea',
      desc:'Positive constraints the output must follow.',
      ph:'Use the given headings; keep under 200 words; cite the example number used.' },
    { key:'donts',    label:"Don'ts / constraints",  type:'textarea',
      desc:'Things to avoid or hard limits.',
      ph:"Don't invent facts; avoid slang; no emojis." }
  ],
  template: ({ main, examples, dos, donts, ctx, audience, style, tone }) => [
    'Use few-shot prompting. Mirror the structure/style demonstrated by the examples.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    main && `Goal: ${main}`,
    examples && (
      'Examples:\n' + String(examples)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((ex,i)=> `${i+1}. ${ex}`)
        .join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don't:\n${donts}`,
    'First restate the intended format in one line, then produce the output consistent with the examples.'
  ].filter(Boolean).join('\n')
},

{
  id:'facione-core',
  slug:'facione-core-skills',
  label:'Facione — Interpret · Analyze · Evaluate · Infer · Explain · Self-regulate',
  kind:'framework',
  categories:['critical thinking frameworks'],
  tags:[
    'type:framework','topic:critical-thinking','phase:analyze','level:intermediate'
  ],
  use_cases:[
    'Evidence appraisal','Research summaries','Root cause analysis','Design/ethics reviews'
  ],
  definition:'Operationalize the six core skills of critical thinking on a target claim/problem.',
  help:'Run the six-skill loop briefly and finish with a self-check.',
  fields:[
    {key:'topic',         label:'Topic/claim/problem', type:'text',     ph:'e.g., “Feature X reduces churn by 10%.”'},
    {key:'evidence',      label:'Evidence for',        type:'textarea', ph:'Key supporting evidence'},
    {key:'counter',       label:'Evidence against',    type:'textarea', ph:'Counterevidence / disconfirming data'},
    {key:'alt_hypotheses',label:'Alternative hypotheses',type:'textarea', ph:'Other explanations/causes'},
    {key:'explain_aud',   label:'Explanation audience',type:'text',     ph:'e.g., exec team, students, customers'},
    {key:'selfreg_checks',label:'Self-regulation checks',type:'text',   ph:'e.g., seek disconfirming data; avoid anchoring'}
  ],
  boosters:[
    'Finish with a 2-line “Because-Therefore” justification and 1 actionable next test.'
  ],
  template:({topic,evidence,counter,alt_hypotheses,explain_aud,selfreg_checks,ctx})=>[
    'Use Facione’s six skills on the target.',
    ctx && `Context: ${ctx}`,
    topic && `Target: ${topic}`,
    'Output:',
    '1) Interpretation (what the information means).',
    evidence && `2) Analysis (structures/relations in the evidence): ${evidence}`,
    counter && `3) Evaluation (credibility and strength of pro vs con): ${counter}`,
    alt_hypotheses && `4) Inference (best-supported conclusion + uncertainty; consider alternatives): ${alt_hypotheses}`,
    explain_aud && `5) Explanation (concise, audience-appropriate): audience=${explain_aud}`,
    selfreg_checks && `6) Self-regulation (bias/quality checks applied): ${selfreg_checks}`
  ].filter(Boolean).join('\n')
},

{
    id: 'first_principles',
    slug: 'first-principles-analysis',
    label: 'First Principles — Question assumptions & reason from basics',
    kind: 'framework',
    categories: ['reasoning', 'innovation'],
    tags: [
      'type:framework','topic:problem-solving','topic:assumptions','level:intermediate',
      'use:strategy','use:research','use:inventive-thinking'
    ],
    use_cases: [
      'solve complex problems by breaking them down to fundamental truths',
      'challenge default assumptions to find innovative solutions',
      'analyze feasibility by building up from basic principles'
    ],
    boosters: [
      'Explicitly list core facts or principles that are undeniably true in this context.',
      'For each assumption, ask “Why must this be true?” and explore what happens if it’s not.'
    ],
    definition: 'A problem-solving approach that strips a problem down to fundamental truths and builds solutions from the ground up, rather than relying on assumptions or analogies.',
    help: 'State the problem and any assumptions. The model will break the problem into basics, challenge assumptions, and propose a solution derived from first principles thinking.',
    fields: [
      { key: 'problem', label: 'Problem or question', type: 'textarea',
        desc: 'The issue to solve or question to answer, as specifically stated as possible.',
        ph: 'e.g., How can we create a low-cost, sustainable water filter for remote areas?' },
      { key: 'assumptions', label: 'Assumptions (optional, one per line)', type: 'textarea',
        desc: 'Any existing assumptions or constraints you have in mind.',
        ph: 'Water must be boiled to purify...\nWe can only use local materials...' }
    ],
    template: ({ problem, assumptions, ctx, style, tone }) => [
      'Solve using first principles reasoning.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      problem && `Problem: ${problem}`,
      assumptions && (
        'Assumptions:\n' + String(assumptions).split(/\n+/).map(s => s.trim()).filter(Boolean).map((a,i) => `${i+1}. ${a}`).join('\n')
      ),
      'Output:\n1) Fundamental truths (list core facts)\n2) Assumption challenges (what if each assumption is false?)\n3) Solution idea built from the fundamental truths'
    ].filter(Boolean).join('\n')
  },

{
  id:'goal_breakdown',
  slug:'goal-breakdown-decomposition',
  label:'Goal Breakdown (Prompt/Question Decomposition)',
  kind:'pattern',
  categories:['planning','prompt development techniques'],
  tags:[
    'type:pattern','topic:decomposition','topic:questions','phase:plan','level:beginner',
    'use:breakdown','use:micro-tasks','use:research-questions'
  ],
  use_cases:[
    'break a complex goal into micro-tasks',
    'turn a vague prompt into concrete sub-questions',
    'plan-first before execution'
  ],
  definition:'Break a complex goal/prompt into smaller, verifiable sub-tasks and sub-questions before doing the work.',
  help:'Enter a complex goal or prompt. The model will decompose it into a deep, numbered hierarchy and propose a minimal execution plan.',
  boosters:[
    'Show a numbered hierarchy (1, 1.1, 1.1.1…) before any deliverable.',
    'Flag assumptions and unknowns as explicit sub-questions.',
    'Suggest the smallest next action at the end.'
  ],
  fields:[
    { key:'main',  label:'Goal / complex task', type:'textarea',
      desc:'The overarching task or question to decompose.',
      ph:'e.g., Build a go-to-market plan for a B2B SaaS in 6 weeks.' },
    { key:'dos',   label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Use numbered hierarchy; identify dependencies.' },
    { key:'donts', label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No speculative claims; ≤500 words in plan.' }
  ],
  template: ({ main, dos, donts, ctx, audience, style, tone }) => [
    'Perform prompt/question decomposition for the goal into micro-tasks and sub-questions.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    main && `Goal/complex task: ${main}`,
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output format:\n1) Decomposition (numbered hierarchy)\n2) Minimal execution plan\n3) Assumptions & unknowns\n4) Next action'
  ].filter(Boolean).join('\n')
},

{
  id:'goal_composition',
  slug:'goal-composition',
  label:'Goal Composition (Prompt/Question Composition)',
  kind:'pattern',
  categories:['planning','prompt development techniques'],
  tags:[
    'type:pattern','topic:composition','topic:goals','phase:plan','level:beginner',
    'use:synthesis','use:roadmap','use:prioritization'
  ],
  use_cases:[
    'compose a broader goal from many sub-prompts/actions',
    'derive an objective and plan from granular tasks',
    'summarize scattered asks into one coherent brief'
  ],
  definition:'Synthesize a broader objective from a list of sub-prompts/actions, then propose a coherent plan.',
  help:'List sub-prompts/actions one per line. Optionally add an intended direction for the composed goal.',
  boosters:[
    'Cluster similar actions before composing.',
    'State explicit success criteria for the composed goal.',
    'End with one “north-star” metric.'
  ],
  fields:[
    { key:'direction', label:'Intended direction (optional)', type:'textarea',
      desc:'Theme or constraints to guide composition.',
      ph:'e.g., Emphasize ROI and low lift.' },
    { key:'actions',   label:'Sub-prompts / actions (one per line)', type:'textarea',
      desc:'Granular items to synthesize into a broader goal.',
      ph:'Draft FAQ page…\nInterview 5 users…\nDefine ICP…' },
    { key:'dos',       label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Quantify effort; produce a one-paragraph composed goal.' },
    { key:'donts',     label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No jargon; ≤300 words total.' }
  ],
  template: ({ direction, actions, dos, donts, ctx, audience, style, tone }) => [
    'Compose a broader goal from specific sub-prompts/actions, then produce a concise plan.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    direction && `Intended direction: ${direction}`,
    actions && (
      'Inputs (actions):\n' + String(actions)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((a,i)=> `${i+1}. ${a}`).join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output:\n1) Composed goal (1 paragraph)\n2) 3–5 key objectives\n3) High-level plan by objective\n4) Single next action'
  ].filter(Boolean).join('\n')
},


{
  id:'goal_prompting',
  slug:'goal-prompting',
  label:'Goal Prompting',
  kind:'pattern',
  categories:['planning','prompt development techniques'],
  tags:[
    'type:pattern','topic:goals','phase:plan','level:beginner',
    'use:brainstorm','use:roadmap','use:prioritize'
  ],
  use_cases:[
    'state a primary goal and supporting goals',
    'ask the model to prioritize or plan',
    'structure outputs around explicit objectives'
  ],
  definition:'Center the request on a primary goal, with optional supporting goals listed separately.',
  help:'Write the main brief/goal, then list additional goals one per line, plus do/don’t guardrails.',
  boosters:[
    'Ask for a numbered plan tied to each goal.',
    'Request a brief risk or dependency note per goal.',
    'End with a next-action recommendation.'
  ],
  fields:[
    { key:'main',   label:'Primary goal (brief)', type:'textarea',
      desc:'One clear objective in your own words.',
      ph:'e.g., Launch a newsletter in 4 weeks.' },
    { key:'goals',  label:'Additional goals (one per line)', type:'textarea',
      desc:'List zero or more supporting goals.',
      ph:'Audience growth to 1k…\n≥40% open rate…\nMonetize by week 8…' },
    { key:'dos',    label:"Do's (must do)", type:'textarea',
      desc:'Positive constraints.',
      ph:'Quantify time/effort; provide a week-by-week outline.' },
    { key:'donts',  label:"Don'ts / constraints", type:'textarea',
      desc:'Limits or exclusions.',
      ph:"Don't exceed 700 words; avoid paid tools." }
  ],
  template: ({ main, goals, dos, donts, ctx, audience, style, tone }) => [
    'Focus on explicit objectives and produce a concise, actionable plan.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    main && `Primary goal: ${main}`,
    goals && (
      'Additional goals:\n' + String(goals)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((g,i)=> `${i+1}. ${g}`)
        .join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don't:\n${donts}`,
    'Provide a short plan tied to each goal, then a single next action.'
  ].filter(Boolean).join('\n')
},

  
  {
    id:'golden',
    slug:'golden-circle-framework',
    label:'Golden Circle — Why · How · What',
    kind:'framework',
    categories:['messaging frameworks','prompt development techniques'],
    tags:[
  'type:framework','topic:messaging','phase:overview','level:beginner',
  'use:brand-messaging','use:mission-vision','use:pitch-deck'
],
use_cases: [
  'brand messaging',
  'mission/vision alignment',
  'about page narrative',
  'investor pitch framing',
  'employer brand messaging',
  'product purpose statement'
],
boosters: [
  "Lead with “Why”; keep each section 2–3 sentences; end with a one-line “Because…” summary."
],
    definition:'A purpose-first communication model that moves from belief (why) to methods (how) to concrete offerings (what).',
    help:'Purpose-first messaging scaffold.',
    fields:[
      {key:'why', label:'Why (purpose/belief)',         type:'textarea', desc:'Belief/purpose.',     ph:'e.g., Everyone deserves privacy by default'},
      {key:'how', label:'How (principles/approach)',    type:'textarea', desc:'Methods/approach.',   ph:'e.g., Strong encryption; zero-knowledge design'},
      {key:'what',label:'What (products/services/actions)', type:'textarea', desc:'Offerings/actions.', ph:'e.g., Encrypted email; secure file share'}
    ],
    template:({why,how,what,ctx})=>[
      ctx&&`Context: ${ctx}`,
      `Craft a message using the Golden Circle.`,
      why&&`Why: ${why}`,
      how&&`How: ${how}`,
      what&&`What: ${what}`
    ].filter(Boolean).join('\n')
  },
  
  {
    id: 'grow',
    slug: 'grow-coaching-model',
    label: 'GROW — Goal · Reality · Options · Way Forward',
    kind: 'framework',
    categories: ['coaching', 'planning'],
    tags: [
      'type:framework','topic:goal-setting','topic:coaching','level:beginner',
      'use:personal-development','use:mentoring','use:problem-solving'
    ],
    use_cases: [
      'structure a coaching conversation or self-reflection',
      'set and plan personal or team goals with clear next steps',
      'evaluate options to overcome a challenge and commit to an action'
    ],
    boosters: [
      'Offer at least 3 distinct Options, even unconventional ones, before recommending a way forward.',
      'Encourage a specific, time-bound commitment in the Way Forward step (who, what, when).'
    ],
    definition: 'A coaching framework for goal-oriented conversations, progressing through defining a Goal, assessing the current Reality, brainstorming Options, and deciding the Way Forward (action plan).',
    help: 'Fill in the goal and current reality; the model will suggest options and a concrete plan. You can optionally provide any options you’ve considered or a tentative plan, and the model will build on it.',
    fields: [
      { key: 'goal', label: 'Goal', type: 'textarea',
        desc: 'The goal or outcome to achieve.',
        ph: 'e.g., Improve my public speaking confidence for work presentations.' },
      { key: 'reality', label: 'Reality (current situation)', type: 'textarea',
        desc: 'Current facts, obstacles, and context regarding the goal.',
        ph: 'e.g., I get very nervous, my last presentation had pacing issues and I avoided eye contact.' },
      { key: 'options', label: 'Options (optional, one per line)', type: 'textarea',
        desc: 'Any ideas or strategies already thought of to achieve the goal.',
        ph: 'Join a public speaking group...\nPractice with a friend...\nWatch online tutorials...' },
      { key: 'will', label: 'Way Forward (if decided, optional)', type: 'textarea',
        desc: 'A chosen action or commitment (if you already have one in mind).',
        ph: 'e.g., I will enroll in a Toastmasters club and practice weekly.' }
    ],
    template: ({ goal, reality, options, will, ctx, style, tone }) => [
      'Use the GROW model to structure the plan.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      goal && `Goal: ${goal}`,
      reality && (`Reality:\n` + reality),
      options && (
        'Options:\n' + String(options).split(/\n+/).map(s => s.trim()).filter(Boolean).map((opt,i) => `${i+1}. ${opt}`).join('\n')
      ),
      will && (`Way Forward (given):\n` + will),
      'Output:\n1) Goal\n2) Reality factors\n3) Options analysis\n4) Way Forward (specific next steps)'
    ].filter(Boolean).join('\n')
  },
  
  {
    id: 'heros_journey',
    slug: 'heros-journey-narrative',
    label: 'Hero’s Journey — Departure · Initiation · Return',
    kind: 'framework',
    categories: ['storytelling frameworks', 'creative writing'],
    tags: [
      'type:framework','topic:storytelling','phase:compose','level:intermediate',
      'use:plot-outline','use:mythic-narrative','use:character-development'
    ],
    use_cases: [
      'generate a mythic or epic story outline following a hero’s journey structure',
      'develop a character’s transformative arc in creative writing',
      'brainstorm plot points for novels, games, or scenarios with a hero protagonist'
    ],
    boosters: [
      'Ensure the hero undergoes a meaningful transformation by the end of the journey.',
      'Include classic stages like Call to Adventure, Mentor/Helper, Trials, Crisis, Reward, and Return with the Elixir.'
    ],
    definition: 'A 12-stage narrative framework (Monomyth) where a hero leaves their ordinary world, faces trials and transformation, and returns home with newfound wisdom or power.',
    help: 'Provide details about the hero, their goal, and the world or antagonist. The model will outline a story following Hero’s Journey stages, covering departure, initiation, and return.',
    fields: [
      { key: 'hero', label: 'Hero / Protagonist', type: 'text',
        desc: 'Main character (name, role, traits).',
        ph: 'e.g., Aria, a cautious village girl with secret magic powers' },
      { key: 'quest', label: 'Quest / Goal', type: 'textarea',
        desc: 'The mission, challenge, or adventure the hero must undertake.',
        ph: 'e.g., Save her village from a spreading curse by finding the ancient healing stone.' },
      { key: 'nemesis', label: 'Antagonist or main challenge (optional)', type: 'text',
        desc: 'The villain or obstacle that opposes the hero.',
        ph: 'e.g., An evil sorcerer who thrives on the curse' },
      { key: 'setting', label: 'Setting (optional)', type: 'text',
        desc: 'The world or context where the story takes place.',
        ph: 'e.g., A medieval land where magic is feared and rare' }
    ],
    template: ({ hero, quest, nemesis, setting, ctx, style, tone }) => [
      'Craft a Hero’s Journey narrative outline.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      hero && `Hero: ${hero}`,
      quest && `Goal/Quest: ${quest}`,
      nemesis && `Antagonist/Challenge: ${nemesis}`,
      setting && `Setting: ${setting}`,
      'Output:\n1) Departure (ordinary world, call to adventure, mentor, crossing threshold)\n2) Initiation (trials, allies, crisis, victory)\n3) Return (road back, transformation, return home with reward)'
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'debiasing-checklist',
  slug:'heuristics-biases',
  label:'Heuristics & Biases — Debiasing Pre-flight',
  kind:'framework',
  categories:['critical thinking frameworks','quality checks'],
  tags:[
    'type:framework','topic:debiasing','phase:review','level:intermediate',
    'use:decisions','use:forecasts','use:research-summaries'
  ],
  use_cases:[
    'Review a draft answer/decision','Forecasting sanity check','Risk review'
  ],
  definition:'Run a short checklist to catch common cognitive biases and revise.',
  help:'Describe the decision/draft, stakes, time pressure, and known risks; get a bias scan and a revision.',
  fields:[
    {key:'decision',     label:'Decision/draft to check', type:'textarea', ph:'Paste the answer/decision you want to sanity-check'},
    {key:'stakes',       label:'Stakes/impact',           type:'text',     ph:'e.g., medium; reputational + cost'},
    {key:'time_pressure',label:'Time pressure',           type:'text',     ph:'e.g., high / moderate / low'},
    {key:'known_biases', label:'Known risks',             type:'text',     ph:'e.g., anchoring, confirmation, sunk cost'},
    {key:'tactics',      label:'Debiasing tactics',       type:'text',     ph:'base rates; outside view; premortem; reference class; “what would change my mind?”'}
  ],
  boosters:[
    'End with a one-line “If wrong, it’s because…” and a quick red-team question.'
  ],
  template:({decision,stakes,time_pressure,known_biases,tactics,ctx})=>[
    'Run a cognitive bias pre-flight check.',
    ctx && `Context: ${ctx}`,
    stakes && `Stakes: ${stakes}`,
    time_pressure && `Time pressure: ${time_pressure}`,
    known_biases && `Known risks: ${known_biases}`,
    tactics && `Preferred tactics: ${tactics}`,
    decision && `Draft under review:\n${decision}`,
    'Output:',
    '1) Bias scan (anchoring, availability, confirmation, sunk cost, overconfidence, base-rate neglect, scope insensitivity).',
    '2) Evidence/assumption spot-check; note priors/base rates.',
    '3) Revised answer/decision with explicit uncertainties.',
    '4) Premortem: top failure mode + mitigation.',
    '5) Decide: go / iterate / stop, with reason.'
  ].filter(Boolean).join('\n')
},
  
  {
  id:'hmw_statements',
  slug:'how-might-we-statements-hmw',
  label:'How Might We Statements (HMW)',
  kind:'pattern',
  categories:['design thinking','ideation'],
  tags:[
    'type:pattern','topic:problem-framing','topic:ideation','phase:explore','level:beginner',
    'use:brainstorm','use:problem-statement','use:workshop'
  ],
  use_cases:[
    'frame challenges as opportunities', 
    'product design', 'ux', 'problem solving',
    'generate multiple solution directions',
    'align teams around a crisp, positive prompt'
  ],
  definition:'A guiding question that reframes a need into an opportunity: “How might we [action] for [who] so that [outcome]?”',
  help:'Provide a concise need/challenge, who is affected, and the positive outcome you want.',
  boosters:[
    'Offer 3–5 phrasing variants that change the verb or scope.',
    'Keep each statement ≤20 words.',
    'Avoid embedded solutions—stay problem-oriented.'
  ],
  fields:[
    { key:'need',   label:'Need / challenge',        type:'textarea',
      desc:'What problem or opportunity are we framing?',
      ph:'Low onboarding completion for new users…' },
    { key:'action', label:'Action to explore',       type:'text',
      desc:'Open-ended action (no baked-in solution).',
      ph:'improve onboarding clarity' },
    { key:'who',    label:'Who is affected?',        type:'text',
      desc:'Audience or segment.',
      ph:'new SaaS signups' },
    { key:'outcome',label:'Positive outcome',        type:'text',
      desc:'Intended impact.',
      ph:'reach value in the first session' },
    { key:'dos',    label:"Do's (must do)",          type:'textarea',
      desc:'Positive guardrails.',
      ph:'Make variants; keep neutral tone.' },
    { key:'donts',  label:"Don\'ts / constraints",   type:'textarea',
      desc:'Limits to respect.',
      ph:'No solutioning; avoid jargon.' }
  ],
  template: ({ need, action, who, outcome, dos, donts, ctx, audience, style, tone }) => [
    'Create a clear, positive How-Might-We statement and a few concise variants.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    need && `Need/challenge: ${need}`,
    (action || who || outcome) && `HMW: How might we ${action||'[action]'} for ${who||'[who]'} so that ${outcome||'[outcome]'}?`,
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Provide 3–5 short variant phrasings with different verbs/scope.'
  ].filter(Boolean).join('\n')
},

{
  id:'implementation_intentions',
  slug:'if-then-planning',
  label:'Implementation Intentions (If–Then)',
  kind:'pattern',
  categories:['behavior','productivity'],
  tags:['type:pattern','topic:if-then','use:habit','level:beginner'],
  use_cases:[
    'bind a trigger to a specific action to reduce choice friction',
    'translate goals into cues'
  ],
  definition:'If [trigger/situation], then I will [specific action].',
  help:'Name a reliable trigger and a crisp then-action. Optional: add 1–2 backup plans.',
  boosters:[
    'Make the trigger observable and frequent.',
    'Write the action so “half-asleep you” could do it.'
  ],
  fields:[
    { key:'trigger', label:'If [trigger/situation]…', type:'textarea', ph:'e.g., When I open my laptop…' },
    { key:'action',  label:'…then I will [specific action]', type:'textarea', ph:'Open draft doc instead of email.' },
    { key:'backups', label:'Backup plans (optional, one per line)', type:'textarea' }
  ],
  template: ({ trigger, action, backups, ctx, audience, style, tone }) => [
    'Create an If–Then implementation intention.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    trigger && ('If ' + trigger),
    action && ('Then I will ' + action),
    backups && (
      'Backups:\n' + String(backups).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    'Output:\n1) Trigger\n2) Specific action\n3) Backup(s)\n4) First check-in time'
  ].filter(Boolean).join('\n')
},

{
  id:'inclusive_design',
  slug:'inclusive-design-framework',
  label:'Inclusive Design (edge personas)',
  kind:'pattern',
  categories:['design','ethics','accessibility'],
  tags:[
    'type:pattern','topic:inclusive-design','topic:edge-cases','level:beginner',
    'use:product','use:content','use:service-design'
  ],
  use_cases:[
    'identify edge personas and barriers',
    'design adaptations that reduce exclusion',
    'articulate benefits to all users'
  ],
  definition:'Design for “edge cases” to reduce exclusion, following Microsoft’s Inclusive Design principles.',
  help:'Pick an edge persona, name the barrier, propose an adaptation, and explain the universal benefit.',
  boosters:[
    'Name concrete assistive tech or environmental constraints where relevant.',
    'Suggest a quick hallway/usability test to validate the adaptation.'
  ],
  fields:[
    { key:'edge_persona', label:'Persona at the edge — who might struggle most?', type:'textarea', ph:'e.g., Low-vision user; one-handed; low bandwidth…' },
    { key:'barrier',      label:'Barrier — what prevents full use?', type:'textarea', ph:'Perception, cognition, motor, language, network…' },
    { key:'adaptation',   label:'Adaptation — design change to reduce exclusion', type:'textarea', ph:'Concrete UI/content/process change.' },
    { key:'benefit',      label:'Benefit to all — how does this help beyond the edge user?', type:'textarea', ph:'Explicit generalization.' }
  ],
  template: ({ edge_persona, barrier, adaptation, benefit, ctx, audience, style, tone }) => [
    'Apply Inclusive Design to reduce exclusion.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    edge_persona && ('Edge persona:\n' + edge_persona),
    barrier && ('Barrier:\n' + barrier),
    adaptation && ('Adaptation:\n' + adaptation),
    benefit && ('Benefit to all:\n' + benefit),
    'Output:\n1) Edge case summary\n2) Barrier(s)\n3) Adaptation(s)\n4) Validation step\n5) Expected universal benefit'
  ].filter(Boolean).join('\n')
},
  
  {
  id:'kwy_vector',
  slug:'keywords-why-tasks-vector',
  label:'Keywords + Why + Tasks — Vector Priming',
  kind:'pattern',
  categories:['prompt development techniques','planning'],
  tags:[
    'type:pattern','topic:keywords','topic:why','topic:tasking','phase:plan','level:intermediate',
    'use:vector-priming','use:context-packing','use:negative-avoidance'
  ],
  use_cases:[
    'prime the model with topical vectors via keywords',
    'explain situational “why” for better alignment',
    'list actionable tasks and explicit negatives to avoid'
  ],
  definition:'Prime with keywords (vector hinting) and a clear “why,” list tasks, and name what to avoid.',
  help:'Fill the goal, why/context, comma-separated keywords, and tasks (one per line). Add avoid/constraints as needed.',
  boosters:[
    'Normalize keywords to canonical forms (singulars, lowercase) before using them.',
    'Tie each task to at least one keyword.',
    'Call out conflicts between “why” and constraints in one line.'
  ],
  fields:[
    { key:'goal',     label:'Goal / request', type:'textarea',
      desc:'The core ask in plain language.',
      ph:'e.g., Draft a press release for our seed round.' },
    { key:'why',      label:'Why / context', type:'textarea',
      desc:'Situation, constraints, or motivation that explains the request.',
      ph:'Positioning shift, investor expectations, embargo timing…' },
    { key:'keywords', label:'Keywords (comma-separated)', type:'text',
      desc:'Topical terms to prime the model’s “vector space.”',
      ph:'fintech, compliance, SOC2, runway, ARR, seed, product-market-fit' },
    { key:'tasks',    label:'Tasks (one per line)', type:'textarea',
      desc:'Concrete actions the model should take.',
      ph:'Draft headline…\nWrite summary paragraph…\nAdd 3 quotes…' },
    { key:'avoid',    label:'Avoid (comma-separated negatives)', type:'text',
      desc:'Phrases, angles, or topics to avoid.',
      ph:'hype, unverified metrics, jargon, inside jokes' },
    { key:'dos',      label:"Do's (must do)", type:'textarea',
      desc:'Positive constraints.',
      ph:'Cite sources; 150–250 words; AP style.' },
    { key:'donts',    label:"Don'ts / constraints", type:'textarea',
      desc:'Hard limits beyond “Avoid.”',
      ph:"Don't mention confidential partners; no sensitive data." }
  ],
  template: ({ goal, why, keywords, tasks, avoid, dos, donts, ctx, audience, style, tone }) => [
    'Use vector priming (keywords) plus explicit why/context and actionable tasks.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    goal && `Goal: ${goal}`,
    why && `Why/context: ${why}`,
    keywords && ('Keywords: ' + String(keywords).split(',').map(s=>s.trim()).filter(Boolean).join(', ')),
    tasks && (
      'Tasks:\n' + String(tasks)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((t,i)=> `${i+1}. ${t}`)
        .join('\n')
    ),
    avoid && ('Avoid: ' + String(avoid).split(',').map(s=>s.trim()).filter(Boolean).join(', ')),
    dos && `Do:\n${dos}`,
    donts && `Don't:\n${donts}`,
    'Execute the tasks, honoring keywords and avoid lists; if conflicts appear, state them briefly before proceeding.'
  ].filter(Boolean).join('\n')
},

{
  id:'least_to_most',
  slug:'least-to-most-ltm',
  label:'Least to Most (LtM)',
  kind:'pattern',
  categories:['reasoning','planning'],
  tags:[
    'type:pattern','topic:progressive-complexity','topic:reasoning','phase:solve','level:intermediate',
    'use:scaffolding','use:math','use:algorithms','use:teaching'
  ],
  use_cases:[
    'tackle problems by escalating from simple to complex',
    'derive a general method from trivial and small cases',
    'surface edge cases after building intuition'
  ],
  definition:'Solve by starting with the simplest instances, generalizing patterns, and stepping up complexity until the full problem is solved.',
  help:'Enter the problem, optionally outline a “complexity ladder” (one per line) from simplest to hardest, and add guardrails.',
  boosters:[
    'Keep each rung to one or two sentences.',
    'State the rule learned at each rung before moving up.',
    'End with a single, general solution and a quick edge-case check.'
  ],
  fields:[
    { key:'problem', label:'Problem / goal', type:'textarea',
      desc:'What should be solved or decided?',
      ph:'e.g., Explain and implement a function to validate parentheses.' },
    { key:'ladder',  label:'Complexity ladder (one per line, optional)', type:'textarea',
      desc:'From simplest to most complex cases.',
      ph:'Trivial case…\nSmall inputs…\nGeneral case…\nEdge cases…' },
    { key:'dos',     label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Show the rule discovered at each rung; keep total under 300 words.' },
    { key:'donts',   label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No lengthy proofs; avoid unexplained jumps.' }
  ],
  template: ({ problem, ladder, dos, donts, ctx, audience, style, tone }) => [
    'Use Least-to-Most reasoning: start with simple instances, extract a rule, scale up, then solve the full problem.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    problem && `Problem: ${problem}`,
    ladder && (
      'Complexity ladder:\n' + String(ladder)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((r,i)=> `${i+1}. ${r}`).join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output format:\n1) Rungs (least→most) with the rule learned at each\n2) General solution\n3) Quick edge-case check'
  ].filter(Boolean).join('\n')
},

{
    id: 'monroe_sequence',
    slug: 'monroes-motivated-sequence',
    label: 'Monroe’s Motivated Sequence — Attention · Need · Satisfaction · Visualization · Action',
    kind: 'framework',
    categories: ['messaging frameworks', 'persuasion'],
    tags: [
      'type:framework','topic:persuasion','phase:compose','level:intermediate',
      'use:speechwriting','use:advocacy','use:public-speaking'
    ],
    use_cases: [
      'structure persuasive speeches or pitches for maximum impact',
      'guide the audience from feeling a need to taking an action',
      'formulate outreach messages (e.g., campaign appeals, motivational talks)'
    ],
    boosters: [
      'Open with a compelling hook (story or statistic) to grab Attention in the first step.',
      'In the Visualization step, paint a vivid picture of the future where the need is resolved (positive or negative outcomes).'
    ],
    definition: 'A five-step persuasive framework that grabs attention, establishes a need, presents a satisfying solution, helps the audience visualize the outcome, and ends with a call to action.',
    help: 'Provide the audience’s problem/need and your proposed solution. Optionally include an attention-grabber or desired call-to-action. The model will generate a structured persuasive message through all five steps of Monroe’s sequence.',
    fields: [
      { key: 'attention', label: 'Attention (hook, optional)', type: 'textarea',
        desc: 'An opening hook (question, anecdote, startling fact) to get attention.',
        ph: 'e.g., "Did you know nearly 40% of food gets thrown away while millions go hungry?"' },
      { key: 'audience_need', label: 'Need (audience problem)', type: 'textarea',
        desc: 'The problem or need affecting the audience that must be addressed.',
        ph: 'e.g., Working parents struggle to find time to cook healthy meals.' },
      { key: 'solution', label: 'Satisfaction (solution)', type: 'text',
        desc: 'Your solution or idea that will satisfy the need.',
        ph: 'e.g., A meal prep delivery service that provides ready-to-eat healthy dinners.' },
      { key: 'cta', label: 'Action (call-to-action, optional)', type: 'text',
        desc: 'The specific action you want the audience to take at the end.',
        ph: 'e.g., Sign up for a free week of our service today.' }
    ],
    template: ({ attention, audience_need, solution, cta, ctx, audience, style, tone }) => [
      'Use Monroe’s Motivated Sequence to structure a persuasive message.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      attention && ('Attention:\n' + attention),
      audience_need && ('Need:\n' + audience_need),
      solution && (`Satisfaction (Solution): ${solution}`),
      'Visualization: <the model will describe outcomes with the solution vs. without it>',
      cta && (`Action: ${cta}`),
      'Output:\n1) Attention\n2) Need\n3) Solution\n4) Visualization\n5) Action'
    ].filter(Boolean).join('\n')
  },

{
  id:'ooda_loop',
  slug:'ooda-loop',
  label:'OODA Loop (Observe–Orient–Decide–Act)',
  kind:'pattern',
  categories:['decision','strategy','ops'],
  tags:['type:pattern','topic:ooda','use:decision','level:beginner'],
  use_cases:[
    'cut through indecision with a tight OODA pass',
    'establish a clear next action under uncertainty'
  ],
  definition:'A rapid decision cadence: Observe → Orient → Decide → Act.',
  help:'Keep each stage concise; bias toward action with feedback.',
  boosters:[
    'Add a quick feedback note: how you’ll check results after acting.',
    'Limit Observe/Orient to facts relevant to the next step.'
  ],
  fields:[
    { key:'observe', label:'Observe — What’s the situation / facts?', type:'textarea', ph:'Crisp, decision-relevant facts only.' },
    { key:'orient',  label:'Orient — What matters most right now?', type:'textarea', ph:'Priorities, constraints, values.' },
    { key:'decide',  label:'Decide — What’s the next best step?', type:'textarea', ph:'One sentence.' },
    { key:'act',     label:'Act — What will I actually do now?', type:'textarea', ph:'Concrete action and owner.' }
  ],
  template: ({ observe, orient, decide, act, ctx, audience, style, tone }) => [
    'Run an OODA pass to unblock a decision.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    observe && ('Observe (facts):\n' + observe),
    orient && ('Orient (what matters):\n' + orient),
    decide && ('Decide (next best step):\n' + decide),
    act && ('Act (now):\n' + act),
    'Output:\n1) Key facts\n2) Priority frame\n3) Decision\n4) Immediate action + feedback check'
  ].filter(Boolean).join('\n')
},

{
    id: 'okr',
    slug: 'okr-goal-setting',
    label: 'OKR — Objective & Key Results',
    kind: 'framework',
    categories: ['strategy', 'planning'],
    tags: [
      'type:framework','topic:goals','topic:metrics','level:beginner',
      'use:strategic-planning','use:team-goals','use:performance-management'
    ],
    use_cases: [
      'define clear organizational or personal goals with measurable outcomes',
      'break down a vision into concrete targets',
      'evaluate progress by looking at quantifiable results tied to objectives'
    ],
    boosters: [
      'Make each Key Result specific, with a clear metric, target value, and timeframe.',
      'Ensure Key Results are outcomes (what is achieved), not tasks (what is done).'
    ],
    definition: 'A goal-setting framework pairing a qualitative Objective (what you want to achieve) with a set of quantitative Key Results (how you measure achievement).',
    help: 'Enter a high-level objective and optionally some initial key result ideas. The model will generate/refine a set of Key Results that make the objective specific and measurable.',
    fields: [
      { key: 'objective', label: 'Objective (qualitative goal)', type: 'textarea',
        desc: 'The significant goal to achieve (concise and inspirational).',
        ph: 'e.g., Become the market leader in customer satisfaction.' },
      { key: 'key_results', label: 'Key Results (optional, one per line)', type: 'textarea',
        desc: 'Draft key results (metrics/targets) if you have any, one per line.',
        ph: 'e.g., NPS score ≥ 60 by Q4\nRepeat purchase rate 30% higher by year-end' }
    ],
    template: ({ objective, key_results, ctx, audience, style, tone }) => [
      'Develop an OKR with a strong Objective and 2–5 measurable Key Results.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      objective && `Objective: ${objective}`,
      key_results && (
        'Given Key Result ideas:\n' + String(key_results).split(/\n+/).map(s => s.trim()).filter(Boolean).map((kr,i) => `${i+1}. ${kr}`).join('\n')
      ),
      'Output:\n1) Objective (qualitative)\n2) 2–5 Key Results (with metrics & targets)'
    ].filter(Boolean).join('\n')
  },


  {
    id:'par',
    slug:'par-method',
    label:'PAR — Problem · Action · Result',
    kind:'framework',
    categories:['storytelling frameworks','prompt development techniques'],
    tags:[
  'type:framework','topic:storytelling','phase:apply','level:beginner',
  'use:resume-bullet','use:case-study','use:status-update'
],
use_cases: [
  'resume bullet',
  'performance review note',
  'status update',
  'case study snapshot',
  'incident summary',
  'customer story outline'
],
boosters: [
  "Quantify results where possible (%, Δ, time); if no metrics given, propose proxy metrics."
],
    definition:'A compressed alternative to STAR that focuses on the core: problem, action, and result.',
    help:'Concise alternative to STAR.',
    fields:[
      {key:'problem', label:'Problem', type:'textarea', desc:'The obstacle or issue.', ph:'e.g., High churn after trial'},
      {key:'action',  label:'Action',  type:'textarea', desc:'What you did.',         ph:'e.g., Onboarding emails + in-app tips'},
      {key:'result',  label:'Result',  type:'textarea', desc:'Outcome/impact.',       ph:'e.g., Churn reduced from 14%→8%'}
    ],
    template:({problem,action,result,ctx})=>[
      ctx&&`Context: ${ctx}`,
      problem&&`Problem: ${problem}`,
      action&&`Action: ${action}`,
      result&&`Result: ${result}`,
      `Format the response as short bullets.`
    ].filter(Boolean).join('\n')
  },
  
  {
    id: 'pas',
    slug: 'pas-copywriting',
    label: 'PAS — Problem · Agitate · Solution',
    kind: 'framework',
    categories: ['messaging frameworks', 'marketing'],
    tags: [
      'type:framework','topic:copywriting','phase:compose','level:beginner',
      'use:ad-copy','use:email-copy','use:landing-page'
    ],
    use_cases: [
      'write persuasive copy by addressing the reader’s pain and offering relief',
      'structure marketing messages or support tickets by focusing on problem then solution',
      'craft introductions for pitches or blogs that hook with a problem and promise a solution'
    ],
    boosters: [
      'In the Agitate step, delve into emotional or practical consequences of the problem to make it feel urgent.',
      'Keep the Solution clear and directly tied to resolving the specific problem that was agitated.'
    ],
    definition: 'A copywriting formula that presents a Problem, amplifies it (Agitate), then provides a Solution to resolve the discomfort.',
    help: 'Provide the audience’s problem and your solution. The model will emphasize the pain of the problem (agitation) and then introduce the solution as the remedy.',
    fields: [
      { key: 'problem', label: 'Problem', type: 'textarea',
        desc: 'The core problem or pain point your audience faces.',
        ph: 'e.g., Project managers struggle to get timely updates from team members.' },
      { key: 'agitate', label: 'Agitate (pain details, optional)', type: 'textarea',
        desc: 'Details that exacerbate the problem or the feelings it causes.',
        ph: 'e.g., They spend hours chasing updates and feel constant stress as deadlines approach.' },
      { key: 'solution', label: 'Solution', type: 'text',
        desc: 'Your product or idea that solves the problem.',
        ph: 'e.g., SyncMaster auto-updates project status in real-time.' }
    ],
    template: ({ problem, agitate, solution, ctx, audience, style, tone }) => [
      'Use the PAS formula to write a persuasive message.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      problem && ('Problem:\n' + problem),
      agitate && ('Agitate:\n' + agitate),
      solution && (`Solution: ${solution}`),
      'Output:\n1) State the problem\n2) Agitate with vivid detail\n3) Present the solution and its relief'
    ].filter(Boolean).join('\n')
  },
  
  {
    id: 'pestle',
    slug: 'pestle-analysis',
    label: 'PESTLE — Political · Economic · Social · Technological · Legal · Environmental',
    kind: 'framework',
    categories: ['analysis frameworks', 'strategy'],
    tags: [
      'type:framework','topic:environment-scan','phase:overview','level:intermediate',
      'use:market-analysis','use:risk-analysis','use:strategic-planning'
    ],
    use_cases: [
      'analyze external factors affecting a business or project',
      'scan the macro-environment before launching an initiative',
      'identify opportunities and threats in the broader context'
    ],
    boosters: [
      'For each category, include at least one specific factor and its potential impact on the subject.',
      'Differentiate clearly between internal issues (not included here) and these external factors.'
    ],
    definition: 'A strategic analysis framework examining six external factors — Political, Economic, Social, Technological, Legal, and Environmental — that can impact an organization or initiative.',
    help: 'Specify the subject (project, company, strategy, etc.) and, if desired, any known factors under each PESTLE category. The model will produce an analysis touching on each category.',
    fields: [
      { key: 'subject', label: 'Subject of analysis', type: 'text',
        desc: 'The project, company, or scenario being analyzed.',
        ph: 'e.g., Expansion of ACME Corp into Asian markets' },
      { key: 'political', label: 'Political factors (optional, one per line)', type: 'textarea',
        desc: 'Government, policy, or regulatory factors to consider.',
        ph: 'Trade regulations...\nStability of local governments...' },
      { key: 'economic', label: 'Economic factors (optional, one per line)', type: 'textarea',
        desc: 'Market or financial conditions to consider.',
        ph: 'Currency exchange rate volatility...\nLocal labor cost trends...' },
      { key: 'social', label: 'Social factors (optional, one per line)', type: 'textarea',
        desc: 'Cultural, demographic, or consumer trends to consider.',
        ph: 'Population’s tech-savviness...\nShifts in consumer preferences...' },
      { key: 'technological', label: 'Technological factors (optional, one per line)', type: 'textarea',
        desc: 'Relevant technology trends or barriers.',
        ph: 'Internet infrastructure quality...\nAdoption of smartphones...' },
      { key: 'legal', label: 'Legal factors (optional, one per line)', type: 'textarea',
        desc: 'Laws, regulations, or legal risks to consider.',
        ph: 'Data protection laws...\nPatent or licensing issues...' },
      { key: 'environmental', label: 'Environmental factors (optional, one per line)', type: 'textarea',
        desc: 'Ecological or environmental considerations.',
        ph: 'Climate-related risks...\nLocal environmental regulations...' }
    ],
    template: ({ subject, political, economic, social, technological, legal, environmental, ctx }) => [
      `Conduct a PESTLE analysis${subject ? ` of ${subject}` : ''}.`,
      ctx && `Context: ${ctx}`,
      political && (
        'Political:\n' + String(political).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i) => `${i+1}. ${x}`).join('\n')
      ),
      economic && (
        'Economic:\n' + String(economic).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i) => `${i+1}. ${x}`).join('\n')
      ),
      social && (
        'Social:\n' + String(social).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i) => `${i+1}. ${x}`).join('\n')
      ),
      technological && (
        'Technological:\n' + String(technological).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i) => `${i+1}. ${x}`).join('\n')
      ),
      legal && (
        'Legal:\n' + String(legal).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i) => `${i+1}. ${x}`).join('\n')
      ),
      environmental && (
        'Environmental:\n' + String(environmental).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i) => `${i+1}. ${x}`).join('\n')
      ),
      'Output:\nProvide insights under each PESTLE category, noting key opportunities or threats in each.'
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'paul-elder',
  slug:'paul-elder',
  label:'Paul–Elder — Elements of Thought + Standards',
  kind:'framework',
  categories:['critical thinking frameworks','prompt development techniques'],
  tags:[
    'type:framework','topic:critical-thinking','phase:analyze','level:intermediate',
    'use:argument-critique','use:decision-memo','use:policy-analysis'
  ],
  use_cases:[
    'Argument/brief critique','Decision memos','Policy/position analysis','Lesson planning checks'
  ],
  definition:'Structure reasoning via the Elements of Thought (purpose, question, info, concepts, assumptions, implications, point of view, inference) and judge it with Intellectual Standards (clarity, accuracy, precision, relevance, depth, breadth, logic, significance, fairness).',
  help:'Fill what you know for each element; pick standards to apply; get a structured critique and improvement.',
  fields:[
    {key:'purpose',       label:'Purpose',        type:'textarea', desc:'Goal/why this reasoning?', ph:'e.g., Decide if we should ship feature X this quarter'},
    {key:'key_question',  label:'Central question',type:'text',    desc:'Main question being answered', ph:'e.g., Should we ship feature X in Q4?'},
    {key:'information',   label:'Information',    type:'textarea', desc:'Key facts/data/sources',      ph:'e.g., user studies, cost estimates, incident data'},
    {key:'concepts',      label:'Concepts',       type:'textarea', desc:'Theories/principles/models',  ph:'e.g., opportunity cost, risk tolerance, SLA/SLO'},
    {key:'assumptions',   label:'Assumptions',    type:'textarea', desc:'What is taken for granted',   ph:'e.g., adoption rate, partner readiness'},
    {key:'pov',           label:'Point(s) of view',type:'textarea',desc:'Perspectives considered',     ph:'e.g., users, SRE, legal, finance'},
    {key:'inferences',    label:'Inferences',     type:'textarea', desc:'Conclusions drawn',           ph:'e.g., delaying reduces churn risk'},
    {key:'implications',  label:'Implications',   type:'textarea', desc:'Consequences of conclusions', ph:'e.g., revenue impact, reliability'},
    {key:'alternatives',  label:'Alternatives',   type:'textarea', desc:'Options/competing claims',    ph:'e.g., partial rollout, behind flag'},
    {key:'standards',     label:'Standards to apply', type:'text', desc:'Comma-sep list of standards', ph:'clarity, accuracy, precision, relevance, depth, breadth, logic, significance, fairness'}
  ],
  boosters:[
    'Give a 3-sentence synthesis and 2 sharper follow-up questions that would most improve the reasoning.'
  ],
  template:({purpose,key_question,information,concepts,assumptions,pov,inferences,implications,alternatives,standards,ctx,audience,style,tone})=>[
    'Apply the Paul–Elder framework to analyze reasoning.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    purpose && `Purpose: ${purpose}`,
    key_question && `Question: ${key_question}`,
    information && `Information: ${information}`,
    concepts && `Concepts: ${concepts}`,
    assumptions && `Assumptions: ${assumptions}`,
    pov && `Points of view: ${pov}`,
    inferences && `Inferences: ${inferences}`,
    implications && `Implications: ${implications}`,
    alternatives && `Alternatives: ${alternatives}`,
    standards && `Intellectual standards to apply: ${standards}`,
    'Output:',
    '1) Brief map of the eight elements (1–2 lines each).',
    '2) Critique using the listed standards (name the standard → note → fix).',
    '3) Revised conclusion with rationale.',
    '4) Evidence or info that would most change the answer.'
  ].filter(Boolean).join('\n')
},

  {
  id:'peas',
  slug:'peas-framework',
  label:'PEAS — Performance measure · Environment · Actuators · Sensors',
  kind:'framework',
  categories:['AI systems design','analysis frameworks'],
  tags:[
    'type:framework','topic:ai-systems','phase:design','level:intermediate',
    'use:agent-spec','use:task-modeling','use:benchmarking','use:requirements-doc'
  ],
  use_cases: [
    'agent specification','requirements doc','benchmark design',
    'task environment mapping','simulation setup'
  ],
  definition:'A canonical way to specify intelligent agents by defining success metrics, the environment, possible actions, and percepts.',
  help:'Use to design/evaluate agents or tools before building.',
  fields:[
    {key:'performance', label:'Performance measure', type:'textarea', desc:'Metrics, goals, constraints.',  ph:'e.g., Success@K, latency < 500ms, ≤2% hallucination rate'},
    {key:'environment', label:'Environment',        type:'textarea', desc:'World, resources, interfaces.', ph:'e.g., Web browser + internal docs + API with rate-limits'},
    {key:'actuators',   label:'Actuators',          type:'textarea', desc:'Actions the agent can take.',   ph:'e.g., Click, type, call API, write file'},
    {key:'sensors',     label:'Sensors',            type:'textarea', desc:'Observations/inputs.',          ph:'e.g., DOM snapshot, API responses, tool outputs'},
    {key:'assumptions', label:'Assumptions (opt.)', type:'textarea', desc:'Assumptions/risks/trust model.',ph:'e.g., Auth tokens valid; pages stable; tool outputs reliable'}
  ],
  boosters:[
    'Summarize as a PEAS tuple and include two evaluation scenarios with success/failure traces.'
  ],
  template:({performance,environment,actuators,sensors,assumptions,ctx})=>[
    `Define the agent using the PEAS framework.`,
    ctx&&`Context: ${ctx}`,
    performance&&`Performance measure: ${performance}`,
    environment&&`Environment: ${environment}`,
    actuators&&`Actuators: ${actuators}`,
    sensors&&`Sensors: ${sensors}`,
    assumptions&&`Assumptions/risks: ${assumptions}`
  ].filter(Boolean).join('\n')
},

{
  id:'persona',
  slug:'persona-actas',
  label:'Persona — ActAs / Simulate',
  kind:'pattern',
  categories:['prompt development techniques','persona prompting'],
  tags:[
    'type:pattern','topic:persona','phase:apply','level:beginner',
    'use:act-as','use:simulation','use:roleplay','use:agent-spec'
  ],
  boosters:[
    "Stay in-character. Prefer precise, domain-correct terminology. Cite trade-offs briefly before final answer."
  ],
  definition:'Simulate a specific persona (role) with domain skills, vocabulary, and constraints; then apply it to the user’s end goal.',
  help:'Type to search a persona. Picking one autofills the rest; or type your own persona free-form.',
  fields:[
    { key:'end',           label:'End goal / Task to Complete', type:'text',     ph:'e.g., Draft a 5-step onboarding plan' },

    // The special typeahead field (wired in renderFields)
    { key:'persona_name',  label:'Persona (who the AI will be)', type:'typeahead', ph:'e.g., UX designer, Data scientist, PM' },

    // Autofilled when a suggestion is chosen (editable)
    { key:'profession',    label:'Profession',   type:'text',     ph:'e.g., Designer' },
    { key:'summary',       label:'Summary',      type:'textarea', ph:'1–2 lines that define this persona' },
    { key:'description',   label:'Additional Description (optional)', type:'textarea', ph:'Longer narrative if available' },
    { key:'core_tasks',    label:'Core tasks (one per line)', type:'textarea', ph:'Plan tests\nWireframe flows\nSynthesize insights' },
    { key:'skills',        label:'Skills (comma or one per line)', type:'textarea', ph:'Wireframing, Prototyping, IA' },
    { key:'vocabulary',    label:'Vocabulary (comma or one per line)', type:'textarea', ph:'affordance, heuristic, persona' },
    { key:'goals',         label:'Goals (one per line)', type:'textarea', ph:'Improve task success\nReduce friction' },
    { key:'pain_points',   label:'Pain points (one per line)', type:'textarea', ph:'Stakeholder misalignment\nLegacy systems' },
    { key:'tools',         label:'Tools (comma or one per line)', type:'textarea', ph:'Figma, Lookback, Maze' }
  ],
  template:({ end, persona_name, profession, summary, description, core_tasks, skills, vocabulary, goals, pain_points, tools, ctx })=>{
    const asList = s => String(s||'').split(/[\n,]+/).map(v=>v.trim()).filter(Boolean);
    const asCSV  = s => asList(s).join(', ');
    const asBul  = s => asList(s).map(x=>'• ' + x).join('\n');

    return [
      ctx && `Context: ${ctx}`,
      (persona_name || profession) && `You are ${persona_name || 'the requested persona'}${profession ? `, a ${profession}` : ''}.`,
      summary && `Persona Summary: ${summary}`,
      description && `Persona Description: ${description}`,
      core_tasks && `You commonly do:\n${asBul(core_tasks)}`,
      skills && `Core skills: ${asCSV(skills)}`,
      vocabulary && `Vocabulary keywords: ${asCSV(vocabulary)}`,
      goals && `Common goals:\n${asBul(goals)}`,
      pain_points && `Common pain points:\n${asBul(pain_points)}`,
      tools && `Tools: ${asCSV(tools)}`,
      end && `\nUnderstanding your persona, complete this end goal objective: ${end}`
    ].filter(Boolean).join('\n');
  }
},

{
  id:'plan_solve',
  slug:'plan-and-solve-ps',
  label:'Plan and Solve (P&S)',
  kind:'pattern',
  categories:['reasoning','planning'],
  tags:[
    'type:pattern','topic:plan-first','topic:execution','topic:verification','phase:solve','level:intermediate',
    'use:math','use:coding','use:ops-procedures'
  ],
  use_cases:[
    'create a short plan before executing a solution',
    'separate planning from working to reduce errors',
    'verify results against explicit checks'
  ],
  definition:'Draft a minimal plan, execute it, and verify the result against stated checks.',
  help:'Enter the problem. Optionally provide a plan (one per line) and verification checks (one per line). The model will plan → solve → verify.',
  boosters:[
    'Keep the plan to 2–5 concise steps.',
    'Separate planning text from solution text.',
    'Verify against explicit checks; note any discrepancies.'
  ],
  fields:[
    { key:'problem', label:'Problem / question', type:'textarea',
      desc:'What needs to be solved?',
      ph:'e.g., Given an array, return indices of two numbers that add up to target.' },
    { key:'plan',    label:'Plan (one per line, optional)', type:'textarea',
      desc:'High-level steps before solving.',
      ph:'Understand inputs…\nOutline approach…\nExecute steps…\nValidate…' },
    { key:'checks',  label:'Verification checks (one per line, optional)', type:'textarea',
      desc:'Tests or criteria to validate the result.',
      ph:'Test with empty input…\nCheck off-by-one…\nTime complexity ≤ O(n log n)…' },
    { key:'dos',     label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'State assumptions; keep total under 300 words.' },
    { key:'donts',   label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No hidden reasoning; avoid unnecessary jargon.' }
  ],
  template: ({ problem, plan, checks, dos, donts, ctx, audience, style, tone }) => [
    'Use Plan-and-Solve: draft a minimal plan, execute it, then verify the result.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    problem && `Problem: ${problem}`,
    plan && (
      'Plan:\n' + String(plan)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((p,i)=> `${i+1}. ${p}`).join('\n')
    ),
    checks && (
      'Verification checks:\n' + String(checks)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((c,i)=> `${i+1}. ${c}`).join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output format:\n1) Plan\n2) Solution/working\n3) Verification (reference the checks)'
  ].filter(Boolean).join('\n')
},

{
  id:'pomodoro',
  slug:'pomodoro-scaffold',
  label:'Pomodoro Scaffold',
  kind:'pattern',
  categories:['productivity','focus'],
  tags:['type:pattern','topic:pomodoro','use:focus','level:beginner'],
  use_cases:[
    'frame a single 25-minute focus sprint',
    'pair a micro-goal with a reward and next step'
  ],
  definition:'25-minute focused work block with short breaks.',
  help:'Pick one task and a tiny goal for this block; name your break reward; plan the next block.',
  boosters:[
    'Hide distractions: list top 3 and how you’ll block them.',
    'Write an “opening move” you’ll do in the first 60 seconds.'
  ],
  fields:[
    { key:'task',      label:'Task to tackle', type:'textarea' },
    { key:'micro',     label:'One 25-min micro-goal', type:'textarea' },
    { key:'reward',    label:'Break reward', type:'textarea' },
    { key:'next_step', label:'Next Pomodoro step', type:'textarea' }
  ],
  template: ({ task, micro, reward, next_step, ctx, audience, style, tone }) => [
    'Plan a Pomodoro to get moving.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    task && ('Task:\n' + task),
    micro && ('Micro-goal (25 min):\n' + micro),
    reward && ('Break reward:\n' + reward),
    next_step && ('Next Pomodoro step:\n' + next_step),
    'Output:\n1) Task + micro-goal\n2) First 60-sec move\n3) Reward\n4) Next block'
  ].filter(Boolean).join('\n')
},

{
  id:'premortem',
  slug:'pre-mortem-scaffold',
  label:'Pre-Mortem Scaffold',
  kind:'pattern',
  categories:['risk','planning','decision'],
  tags:['type:pattern','topic:premortem','use:planning','level:beginner'],
  use_cases:[
    'surface failure modes before committing',
    'turn risks into preventive steps and immediate actions'
  ],
  definition:'Imagine the project failed and ask why, so you can prevent it.',
  help:'Name the decision/project, list plausible failure causes, define prevention, then pick one immediate move.',
  boosters:[
    'Force at least 3 realistic failure causes.',
    'Assign owners and a check date for each preventive step.'
  ],
  fields:[
    { key:'decision',  label:'Decision / project at hand', type:'textarea', ph:'Name + scope.' },
    { key:'failed',    label:'Imagine it failed — what went wrong? (one per line)', type:'textarea', ph:'3–5 failure causes.' },
    { key:'prevent',   label:'Preventive step(s)', type:'textarea', ph:'Countermeasures mapped to causes.' },
    { key:'immediate', label:'Immediate action', type:'textarea', ph:'What starts today.' }
  ],
  template: ({ decision, failed, prevent, immediate, ctx, audience, style, tone }) => [
    'Run a pre-mortem to convert risks into action.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    decision && ('Decision / project:\n' + decision),
    failed && (
      'Failure causes (envisioned):\n' + String(failed).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    prevent && ('Preventive steps:\n' + prevent),
    immediate && ('Immediate action:\n' + immediate),
    'Output:\n1) Top risks\n2) Mapped preventions\n3) Today’s move\n4) Owners + dates'
  ].filter(Boolean).join('\n')
},

  {
  id:'prompt_augmentation',
  slug:'prompt-augmentation-demonstration-learning',
  label:'Prompt Augmentation (Demonstration Learning)',
  kind:'pattern',
  categories:['prompt development techniques','prompt literacy'],
  tags:[
    'type:pattern','topic:examples','topic:demonstrations','phase:apply','level:intermediate',
    'use:format-guidance','use:style-transfer','use:pattern-learning'
  ],
  use_cases:[
    'teach the model a Q→A pattern by example',
    'lock in output format and tone via paired demonstrations',
    'evaluate consistency against provided answers'
  ],
  definition:'Provide multiple prompt→answer pairs so the model infers and follows the desired pattern.',
  help:'Enter your current brief (optional), then list prompts and answers line-by-line in parallel.',
  boosters:[
    'Keep pairs short and high-signal; avoid ambiguity.',
    'Use consistent structure across all answers.',
    'If counts mismatch, ignore extra lines.'
  ],
  fields:[
    { key:'main',     label:'Brief / request (optional)', type:'textarea',
      desc:'What you want now, guided by the examples.',
      ph:'e.g., Classify the following support ticket.' },
    { key:'prompts',  label:'Example prompts (one per line)', type:'textarea',
      desc:'Each line is a prompt/question.',
      ph:'Prompt A…\nPrompt B…\nPrompt C…' },
    { key:'answers',  label:'Example answers (one per line)', type:'textarea',
      desc:'Each line is the corresponding answer. Keep counts aligned with prompts.',
      ph:'Answer A…\nAnswer B…\nAnswer C…' },
    { key:'dos',      label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Follow the demonstrated headings exactly.' },
    { key:'donts',    label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No extra commentary; ≤150 words per answer.' }
  ],
  template: ({ main, prompts, answers, dos, donts, ctx, audience, style, tone }) => [
    'Use demonstration learning: infer the desired format and tone from the prompt→answer pairs, then apply consistently.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    main && `Brief: ${main}`,
    (prompts || answers) && (function(){
      const ps = String(prompts||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
      const as = String(answers||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
      const n = Math.min(ps.length, as.length);
      if (!n) return null;
      return 'Demonstrations:\n' + ps.slice(0,n).map((p,i)=>`${i+1}. Prompt: ${p}\n   Answer: ${as[i]}`).join('\n');
    })(),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'After the demonstrations, respond in the same pattern.'
  ].filter(Boolean).join('\n')
},

  
  {
  id:'raccca',
  slug:'raccca-framework',
  label:'RACCCA — Relevance · Accuracy · Completeness · Clarity · Coherence · Appropriateness',
  kind:'framework',
  categories:['evaluation frameworks','prompt development techniques'],
  tags:[
    'type:framework','topic:evaluation','phase:evaluate','level:beginner',
    'use:output-evaluation','use:rubric-scoring','use:quality-review','use:model-comparison'
  ],
  use_cases: [
    'quality review','rubric evaluation','model comparison',
    'content audit','risk screening'
  ],
  definition:'A rubric to evaluate generative outputs across six dimensions: relevance, accuracy, completeness, clarity, coherence, and appropriateness.',
  help:'Use to score or compare outputs and identify concrete fixes.',
  fields:[
    {key:'artifact',        label:'Artifact to evaluate', type:'textarea', desc:'Paste or describe the output.',      ph:'e.g., The draft blog intro…'},
    {key:'scale',           label:'Scale',                type:'text',     desc:'Scoring scale.',                    ph:'e.g., 1–5'},
    {key:'weights',         label:'Weights (opt.)',       type:'text',     desc:'Criterion weights.',                ph:'e.g., R:1,A:2,C:2,Cl:1,Co:1,Ap:1'},
    {key:'context',         label:'Context/requirements', type:'textarea', desc:'Intended use and constraints.',     ph:'e.g., Audience: Dev managers; tone: practical'},
    {key:'improvement_goal',label:'Improvement goal',     type:'textarea', desc:'Desired fix or target quality.',    ph:'e.g., Make it accurate and concise'}
  ],
  boosters:[
    'Return a table with RACCCA scores (on your scale) + 1-line justifications, a weighted overall score, and top-3 fixes. If suitable, include a revised draft.'
  ],
  template:({artifact,scale,weights,context,improvement_goal,ctx})=>[
    `Evaluate using the RACCCA framework.`,
    ctx&&`Context: ${ctx}`,
    artifact&&`Artifact: ${artifact}`,
    scale&&`Scale: ${scale}`,
    weights&&`Weights: ${weights}`,
    context&&`Requirements: ${context}`,
    improvement_goal&&`Improvement goal: ${improvement_goal}`
  ].filter(Boolean).join('\n')
},
  
  {
    id:'ratio',
    slug:'ratio-framework',
    label:'RATIO — Role · Audience · Task · Instructions · Output',
    kind:'pattern',
    categories:['prompt development techniques'],
   tags:[
  'type:pattern','topic:prompting','phase:apply','level:beginner',
  'use:prompt-spec','use:instructional-prompt','use:task-brief'
],
use_cases: [
  'prompt specification',
  'instructional prompt',
  'task brief',
  'agent/system prompt',
  'handoff brief',
  'template for graded output'
],
boosters: [
  "Validate format exactly (schema first, then fill); if schema can’t be met, output a minimal valid stub and list missing fields."
],
    definition:'An audience-centered prompt that captures role, target audience, the task, guiding instructions, and the required output shape.',
    help:'Audience-centered prompt with explicit output spec.',
    fields:[
      {key:'role',         label:'Role',         type:'text',     desc:'Who the model should emulate.', ph:'e.g., Product marketer'},
      {key:'audience',     label:'Audience',     type:'text',     desc:'Who this is for.',              ph:'e.g., New parents'},
      {key:'task',         label:'Task',         type:'textarea', desc:'What should be produced.',      ph:'e.g., Write a landing-page headline and 3 benefit bullets.'},
      {key:'instructions', label:'Instructions', type:'textarea', desc:'Constraints/steps to follow.',  ph:'e.g., Avoid jargon; use active voice; 120 words max.'},
      {key:'output',       label:'Output',       type:'text',     desc:'Exact deliverable shape.',      ph:'e.g., 1 headline + 3 bullets + CTA'}
    ],
    template:({role,audience,task,instructions,output,ctx})=>[
      role&&`You are ${role}.`,
      ctx&&`Context: ${ctx}`,
      audience&&`Target audience: ${audience}`,
      task&&`Task: ${task}`,
      instructions&&`Instructions: ${instructions}`,
      output&&`Output: ${output}`,
      `Use the RATIO pattern. Validate assumptions briefly before final output.`
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'reflect_bias',
  slug:'reflect-bias-scaffold',
  label:'REFLECT (bias reflection)',
  kind:'pattern',
  categories:['ethics','bias','critical thinking'],
  tags:[
    'type:pattern','topic:bias','topic:reflection','level:beginner',
    'use:interviews','use:analysis','use:synthesis'
  ],
  use_cases:[
    'spot potential bias during interviews, analysis, or synthesis',
    'reframe a problem from multiple perspectives',
    'turn reflection into concrete next steps'
  ],
  definition:'A structured reflection scaffold to identify, check, and transform bias in your approach.',
  help:'Move through Recognize → Evaluate → Frame → Listen → Empathize → Check → Transform.',
  boosters:[
    'Keep tone neutral and specific; avoid moralizing.',
    'Return a bulleted summary + 3 concrete changes and 1 monitoring check.'
  ],
  fields:[
    { key:'recognize',  label:'Recognize — What bias might be at play?', type:'textarea', ph:'e.g., Confirmation bias; availability bias…' },
    { key:'evaluate',   label:'Evaluate — How does it influence my thinking?', type:'textarea', ph:'e.g., Overweighting a single user quote…' },
    { key:'frame',      label:'Frame — Restate the problem from a different perspective', type:'textarea', ph:'e.g., From a low-vision user; from operations…' },
    { key:'listen',     label:'Listen — Whose voices are missing?', type:'textarea', ph:'e.g., Non-English speakers; caregivers…' },
    { key:'empathize',  label:'Empathize — How would it feel in that missing perspective?', type:'textarea', ph:'Short, concrete description.' },
    { key:'check',      label:'Check — What assumption should I test?', type:'textarea', ph:'List 1–3 assumptions with test ideas.' },
    { key:'transform',  label:'Transform — How will I change my approach?', type:'textarea', ph:'e.g., Add recruitment quotas; change success metric…' }
  ],
  template: ({ recognize, evaluate, frame, listen, empathize, check, transform, ctx, audience, style, tone }) => [
    'Use the REFLECT scaffold to surface and mitigate bias.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    recognize && ('Recognize:\n' + recognize),
    evaluate && ('Evaluate:\n' + evaluate),
    frame && ('Frame (alt perspective):\n' + frame),
    listen && (
      'Listen (missing voices):\n' + String(listen).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    empathize && ('Empathize (experience sketch):\n' + empathize),
    check && (
      'Check (assumptions + tests):\n' + String(check).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    transform && ('Transform (changes to approach):\n' + transform),
    'Output:\n1) Key bias risks\n2) Reframed problem\n3) Missing voices to include\n4) 3 action changes + 1 monitoring check'
  ].filter(Boolean).join('\n')
},
  
  {
    id:'risen',
    slug:'risen-framework',
    label:'RISEN — Role · Instructions · Steps · End goal · Narrowing',
    kind:'pattern',
    categories:['prompt development techniques'],
    tags:[
  'type:pattern','topic:prompting','phase:plan','level:intermediate',
  'use:project-plan','use:workflow-design','use:research-plan'
],
use_cases: [
  'project plan',
  'research plan',
  'workflow design',
  'content production plan',
  'experiment plan',
  'learning plan'
],
boosters: [
  "State the 1–2 biggest tradeoffs; confirm the narrowed scope."
],
    definition:'A plan-then-focus scaffold: set role and instructions, outline steps, state the end goal, then narrow scope and priorities.',
    help:'Good for complex tasks with stepwise planning then focus.',
    fields:[
      {key:'role',        label:'Role',        type:'text',     desc:'Who the model should be.',          ph:'e.g., Program manager'},
      {key:'instructions',label:'Instructions',type:'textarea', desc:'Rules/constraints to honor.',       ph:'e.g., Prioritize clarity; reference internal style guide.'},
      {key:'steps',       label:'Steps',       type:'textarea', desc:'High-level plan or checklist.',     ph:'e.g., Research → Outline → Draft → Review → Finalize'},
      {key:'end_goal',    label:'End goal',    type:'text',     desc:'Definition of success.',            ph:'e.g., Publishable first draft by Friday EOD'},
      {key:'narrowing',   label:'Narrowing',   type:'textarea', desc:'Prioritization/scope cuts.',        ph:'e.g., Focus on onboarding, skip billing edge cases'}
    ],
    template:({role,instructions,steps,end_goal,narrowing,ctx})=>[
      role&&`You are ${role}.`,
      ctx&&`Context: ${ctx}`,
      instructions&&`Instructions: ${instructions}`,
      steps&&`Proposed steps: ${steps}`,
      end_goal&&`End goal: ${end_goal}`,
      narrowing&&`Focus/narrowing: ${narrowing}`,
      `Follow RISEN. Reflect on tradeoffs before final.`
    ].filter(Boolean).join('\n')
  },
  {
    id:'rodes',
    slug:'rodes-framework',
    label:'RODES — Role · Objective · Details · Examples · Sense check',
    kind:'pattern',
    categories:['prompt development techniques'],
    tags:[
  'type:pattern','topic:prompting','phase:apply','level:intermediate',
  'use:example-guided-writing','use:ux-microcopy','use:quality-check'
],
use_cases: [
  'example-guided rewriting',
  'UX microcopy',
  'tone/style adaptation',
  'product messaging variants',
  'quality check against criteria',
  'rubric-guided output'
],
boosters: [
  "Run the sense-check as a bullet list tied to the acceptance criteria, then deliver Final."
],
    definition:'Evidence-guided production: set role and objective, supply details and examples, then perform a brief sense-check before delivery.',
    help:'When you have exemplars and want a final self-check.',
    fields:[
      {key:'role',        label:'Role',        type:'text',     desc:'Who the model should be.',            ph:'e.g., UX writer'},
      {key:'objective',   label:'Objective',   type:'text',     desc:'Primary goal of the output.',         ph:'e.g., Improve sign-up microcopy'},
      {key:'details',     label:'Details',     type:'textarea', desc:'Key facts, constraints, resources.',  ph:'e.g., Product is mobile-only; support link must appear once.'},
      {key:'examples',    label:'Examples',    type:'textarea', desc:'Short exemplars to imitate.',         ph:'e.g., “Welcome aboard!” → concise, friendly tone'},
      {key:'sense_check', label:'Sense check', type:'textarea', desc:'Acceptance criteria/guardrails.',      ph:'e.g., At most 25 words; no slang; include link text'}
    ],
    template:({role,objective,details,examples,sense_check,ctx})=>[
      role&&`You are ${role}.`,
      ctx&&`Context: ${ctx}`,
      objective&&`Objective: ${objective}`,
      details&&`Details: ${details}`,
      examples&&`Examples: ${examples}`,
      sense_check&&`Sense-check before final: ${sense_check}`,
      `Apply RODES. Show brief reasoning if uncertain.`
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'root_cause',
  slug:'root-cause-analysis',
  label:'Root Cause Analysis',
  kind:'pattern',
  categories:['quality','operations','reasoning'],
  tags:[
    'type:pattern','topic:5-whys','topic:causality','phase:diagnose','level:beginner',
    'use:incident-review','use:bug-analysis','use:process-improvement'
  ],
  use_cases:[
    'identify primary causes vs symptoms',
    'propose targeted countermeasures',
    'document verification steps'
  ],
  definition:'Identify the underlying cause of a problem (e.g., via 5 Whys), then propose countermeasures and checks.',
  help:'State the problem, list observed symptoms/evidence, and any guardrails.',
  boosters:[
    'Run at least 3–5 “Why?” steps until causes stop being actionable.',
    'Tie each countermeasure to a specific cause.',
    'Include verification and owner for each action.'
  ],
  fields:[
    { key:'problem',   label:'Problem statement', type:'textarea',
      desc:'What went wrong or what is undesired?',
      ph:'App crash rate spiked after v1.2…' },
    { key:'symptoms',  label:'Symptoms / evidence (one per line)', type:'textarea',
      desc:'Observed facts supporting the problem.',
      ph:'Crash logs show null ptr at …\nSpike at 10:42 UTC…' },
    { key:'dos',       label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Quantify impact; assign owners.' },
    { key:'donts',     label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No blame; ≤400 words.' }
  ],
  template: ({ problem, symptoms, dos, donts, ctx, audience, style, tone }) => [
    'Perform Root Cause Analysis using the 5 Whys and propose targeted countermeasures.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    problem && `Problem: ${problem}`,
    symptoms && (
      'Symptoms / evidence:\n' + String(symptoms)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((s,i)=> `${i+1}. ${s}`).join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output:\n1) 5 Whys chain\n2) Root cause(s)\n3) Countermeasures (owner, due, verification)\n4) Residual risks'
  ].filter(Boolean).join('\n')
},

  
  {
    id:'rtf',
    slug:'rtf-framework',
    label:'RTF — Role · Task · Format',
    kind:'pattern',
    categories:['prompt development techniques'],
    tags:[
  'type:pattern','topic:prompting','phase:apply','level:beginner',
  'use:general-purpose','use:format-enforcement','use:starter-prompt'
],
use_cases: [
  'general-purpose prompting',
  'format enforcement',
  'role simulation',
  'structured data output',
  'template scaffold',
  'API-doc-style response',
  'quickstarter prompt'
],
boosters: [
  "Validate format exactly (schema first, then fill); if schema can’t be met, output a minimal valid stub and list missing fields."
],
    definition:'A general-purpose scaffold that specifies who the model is, what to do, and how to format the answer.',
    help:'General-purpose scaffold: define who the model is, what to do, and the response shape.',
    fields:[
      {key:'role',   label:'Role',   type:'text',     desc:'Who the model should act as.', ph:'e.g., Senior technical writer'},
      {key:'task',   label:'Task',   type:'textarea', desc:'Describe the work to be done.', ph:'e.g., Draft a user guide section explaining 2FA setup.'},
      {key:'format', label:'Format', type:'text',     desc:'The structure/shape of the output.', ph:'e.g., Markdown with H2s and code blocks'}
    ],
    template:({role,task,format,ctx})=>[
      role&&`You are ${role}.`,
      ctx&&`Context: ${ctx}`,
      task&&`Task: ${task}`,
      format&&`Respond in this format: ${format}`,
      `Follow the RTF pattern. Ask concise clarifying questions if needed.`
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'scamper',
  slug:'scamper-framework',
  label:'SCAMPER (idea expansion)',
  kind:'pattern',
  categories:['creativity','ideation'],
  tags:['type:pattern','topic:scamper','use:ideas','level:beginner'],
  use_cases:[
    'systematically generate variants of an idea',
    'unstick creative exploration'
  ],
  definition:'Seven moves to push an idea: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.',
  help:'Start with a current idea; write brief prompts for each SCAMPER move.',
  boosters:[
    'Demand at least 2 candidates per move (bullet them).',
    'End with one “crazy but testable” option.'
  ],
  fields:[
    { key:'current', label:'Current idea', type:'textarea', ph:'Describe the starting point.' },
    { key:'sub',     label:'Substitute — what element could you replace?', type:'textarea' },
    { key:'comb',    label:'Combine — what can be merged?', type:'textarea' },
    { key:'adapt',   label:'Adapt — what can be borrowed?', type:'textarea' },
    { key:'mod',     label:'Modify — exaggerated/minimized?', type:'textarea' },
    { key:'use',     label:'Put to other use — where else could it apply?', type:'textarea' },
    { key:'elim',    label:'Eliminate — what can you cut?', type:'textarea' },
    { key:'rev',     label:'Reverse — what if you flipped it?', type:'textarea' }
  ],
  template: ({ current, sub, comb, adapt, mod, use, elim, rev, ctx, audience, style, tone }) => [
    'Run SCAMPER to expand the idea space.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    current && ('Current idea:\n' + current),
    sub && ('Substitute:\n' + sub),
    comb && ('Combine:\n' + comb),
    adapt && ('Adapt:\n' + adapt),
    mod && ('Modify:\n' + mod),
    use && ('Put to other use:\n' + use),
    elim && ('Eliminate:\n' + elim),
    rev && ('Reverse:\n' + rev),
    'Output:\n1) 7 move list\n2) Top 3 candidates\n3) One testable “wild” option'
  ].filter(Boolean).join('\n')
},
  
   {
    id:'scenario_deliberative',
    slug:'scenario-based-deliberative',
    label:'Scenario-based Prompting — Deliberative reasoning',
    kind:'framework',
    categories:['prompt development techniques','reasoning'],
    tags:[
      'type:framework','topic:prompting','phase:compose','level:intermediate',
      'use:scenario','use:empathy','use:deliberation','use:edge-cases'
    ],
    use_cases:[
      'coaching & advice','policy-sensitive responses','support empathy','edge-case analysis'
    ],
    definition:'Grounds the model in a concrete situation and explicitly asks it to reason deliberately before answering.',
    help:'Set a vivid scenario and desired outcome. The framework slows the model down and separates thinking from the final recommendation.',
    fields:[
      {key:'role',        label:'Role (optional)',                    type:'text',     desc:'Perspective to adopt.',                         ph:'e.g., Emergency operations lead'},
      {key:'scenario',    label:'Scenario (specific, even extreme)',  type:'textarea', desc:'Describe actors, stakes, and context.',         ph:'e.g., ICU power outage during a heatwave; backups at 60 minutes…'},
      {key:'goal',        label:'Outcome goal',                       type:'text',     desc:'What success looks like.',                      ph:'e.g., Keep all patients safe until mains power returns'},
      {key:'constraints', label:'Constraints',                        type:'textarea', desc:'Non-negotiables, policies, risks.',             ph:'e.g., No transport; limited staff; HIPAA-safe comms only'},
      {key:'format',      label:'Response format (optional)',         type:'textarea', desc:'Headings/checklists to structure the output.',  ph:'e.g., 1) Immediate actions 2) Comms plan 3) Risks & mitigations'}
    ],
    boosters:[
      'Take a deep breath. Think step by step. First list assumptions and unknowns; then reason in numbered steps; then propose actions; end with a short checklist.',
      'Separate “Reasoning” from “Recommendation” using clear headings. Flag trade-offs and edge cases.'
    ],
    template:({role,scenario,goal,constraints,format,ctx})=>[
      'Engage in deliberate reasoning before answering.',
      ctx&&`Context: ${ctx}`,
      role&&`Role: ${role}`,
      scenario&&`Scenario: ${scenario}`,
      goal&&`Primary goal: ${goal}`,
      constraints&&`Constraints: ${constraints}`,
      'Deliberate: Take a deep breath; think step by step; state assumptions and unknowns; evaluate trade-offs.',
      format&&`Format: ${format}`,
      'Return:\n1) Reasoning\n2) Recommendation\n3) Checklist'
    ].filter(Boolean).join('\n')
  },
  
  {
  id:'six_hats',
  slug:'six-thinking-hats',
  label:'Six Thinking Hats',
  kind:'pattern',
  categories:['decision-making','ideation'],
  tags:[
    'type:pattern','topic:perspective-taking','topic:facilitation','phase:explore','level:beginner',
    'use:workshops','use:brainstorm','use:alignment'
  ],
  use_cases:[
    'explore multiple perspectives on a topic',
    'structure a discussion or solo reasoning',
    'surface risks, data, feelings, creativity, control'
  ],
  definition:'A role-play model (White, Red, Black, Yellow, Green, Blue) to examine a topic from six perspectives.',
  help:'Provide the topic and (optionally) the hat order (one per line).',
  boosters:[
    'Keep each hat’s notes to 2–3 bullets.',
    'End with a Blue hat summary decision.',
    'If no order is given, use White→Red→Black→Yellow→Green→Blue.'
  ],
  fields:[
    { key:'topic', label:'Topic / decision', type:'textarea',
      desc:'What are we evaluating or deciding?',
      ph:'Should we sunset Feature X?' },
    { key:'order', label:'Hat order (one per line, optional)', type:'textarea',
      desc:'Any subset/order of: White, Red, Black, Yellow, Green, Blue.',
      ph:'White\nRed\nBlack\nYellow\nGreen\nBlue' },
    { key:'dos',   label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'2–3 bullets per hat; be concrete.' },
    { key:'donts', label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No digressions; ≤350 words total.' }
  ],
  template: ({ topic, order, dos, donts, ctx, audience, style, tone }) => [
    'Use Six Thinking Hats to examine the topic from multiple perspectives, then conclude.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    topic && `Topic: ${topic}`,
    order && (
      'Hat order:\n' + String(order)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((h,i)=> `${i+1}. ${h}`).join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output each hat with 2–3 bullets, then a Blue-hat summary decision.'
  ].filter(Boolean).join('\n')
},

{
    id: 'smart',
    slug: 'smart-goals',
    label: 'SMART Goals — Specific · Measurable · Achievable · Relevant · Time-bound',
    kind: 'framework',
    categories: ['planning', 'productivity'],
    tags: [
      'type:framework','topic:goal-setting','phase:plan','level:beginner',
      'use:personal-goals','use:project-planning','use:performance-goals'
    ],
    use_cases: [
      'refine vague goals into actionable statements',
      'ensure project objectives have clear success criteria and timelines',
      'evaluate if a goal is well-defined or needs adjustment'
    ],
    boosters: [
      'If any SMART element is missing (e.g., no timeframe), the model will propose one to complete the goal definition.',
      'Present the output as 5 brief points (S, M, A, R, T) to clearly delineate each aspect.'
    ],
    definition: 'A goal-setting checklist ensuring an objective is Specific, Measurable, Achievable, Relevant, and Time-bound.',
    help: 'Enter a general goal. The model will break it down into the five SMART components, helping to make the goal clear and trackable.',
    fields: [
      { key: 'goal', label: 'General goal', type: 'textarea',
        desc: 'A short description of what you want to accomplish.',
        ph: 'e.g., Grow the mailing list for our newsletter.' }
    ],
    template: ({ goal, ctx, audience, style, tone }) => [
      'Convert the goal into a SMART format.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      goal && `Goal: ${goal}`,
      'Output each SMART element with details:\n- Specific: <what exactly will be done?>\n- Measurable: <quantify or measure success>\n- Achievable: <is it realistic/how to attain?>\n- Relevant: <why it matters/aligns>\n- Time-bound: <deadline or timeframe>'
    ].filter(Boolean).join('\n')
  },

{
  id:'soar',
  slug:'soar-analysis',
  label:'SOAR Analysis',
  kind:'pattern',
  categories:['strategy','planning'],
  tags:[
    'type:pattern','topic:strategy','topic:positive-deviance','phase:plan','level:beginner',
    'use:offsites','use:visioning','use:roadmapping'
  ],
  use_cases:[
    'forward-looking strategic discussion',
    'align aspirations with measurable results',
    'find opportunity in strengths'
  ],
  definition:'Strengths, Opportunities, Aspirations, Results—an appreciative, forward-looking alternative to SWOT.',
  help:'Provide context (optional) and list SOAR elements (one per line each).',
  boosters:[
    'Tie each Aspiration to at least one Strength and Opportunity.',
    'Make Results measurable (metric, target, date).',
    'End with next steps.'
  ],
  fields:[
    { key:'context',       label:'Context (optional)', type:'textarea',
      desc:'Brief background or scope.',
      ph:'Q4 planning for self-serve growth…' },
    { key:'strengths',     label:'Strengths (one per line)', type:'textarea',
      desc:'What we already do well.',
      ph:'Fast release cadence…\nHighly engaged community…' },
    { key:'opportunities', label:'Opportunities (one per line)', type:'textarea',
      desc:'External possibilities to leverage.',
      ph:'Partnership with …\nUntapped EDU market…' },
    { key:'aspirations',   label:'Aspirations (one per line)', type:'textarea',
      desc:'Where we want to go.',
      ph:'Be the default for …\nNPS ≥ 50…' },
    { key:'results',       label:'Results (one per line)', type:'textarea',
      desc:'Measurable outcomes (metric & target).',
      ph:'ARR $5M by Q4; DAU 50k…' },
    { key:'dos',           label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Be specific and measurable.' },
    { key:'donts',         label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'Avoid vague aspirations.' }
  ],
  template: ({ context, strengths, opportunities, aspirations, results, dos, donts, ctx, audience, style, tone }) => [
    'Run a SOAR analysis (forward-looking strategy).',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    context && `Scope/context: ${context}`,
    strengths && (
      'Strengths:\n' + String(strengths)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((x,i)=> `${i+1}. ${x}`).join('\n')
    ),
    opportunities && (
      'Opportunities:\n' + String(opportunities)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((x,i)=> `${i+1}. ${x}`).join('\n')
    ),
    aspirations && (
      'Aspirations:\n' + String(aspirations)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((x,i)=> `${i+1}. ${x}`).join('\n')
    ),
    results && (
      'Results (measurable):\n' + String(results)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((x,i)=> `${i+1}. ${x}`).join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Close with 3 next steps linked to the SOAR items.'
  ].filter(Boolean).join('\n')
},

{
  id:'socratic',
  slug:'socratic-method',
  label:'Socratic Questioning Method',
  kind:'pattern',
  categories:['reasoning','critical thinking'],
  tags:[
'type:pattern','topic:socratic','topic:assumptions','phase:explore','level:beginner',
    'use:analysis','use:teaching','use:debiasing'
  ],
  use_cases:[
    'interrogate claims and assumptions',
    'separate knowledge from belief',
    'surface implications and alternatives'
  ],
  definition:'A disciplined questioning method to clarify, probe assumptions, test evidence, explore viewpoints, and examine implications.',
  help:'Provide a claim/topic, plus any assumptions, evidence, or alternatives (one per line).',
  boosters:[
    'Keep questions sharp and answerable.',
    'Avoid leading or loaded wording.',
    'End with a synthesis and next inquiry.'
  ],
  fields:[
    { key:'claim',       label:'Claim / topic', type:'textarea',
      desc:'What are we questioning?',
      ph:'“We must pivot to enterprise immediately.”' },
    { key:'assumptions', label:'Assumptions (one per line, optional)', type:'textarea',
      desc:'Suspected premises.',
      ph:'SMB cannot pay…\nSales cycle is too long…' },
    { key:'evidence',    label:'Evidence (one per line, optional)', type:'textarea',
      desc:'Facts or data offered.',
      ph:'Churn 12%…\n2/5 enterprise pilots failed…' },
    { key:'alternatives',label:'Alternatives (one per line, optional)', type:'textarea',
      desc:'Other viewpoints/paths.',
      ph:'PLG focus…\nMid-market first…' },
    { key:'dos',         label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Neutral tone; concrete questions.' },
    { key:'donts',       label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'No ad hominem; ≤300 words.' }
  ],
  template: ({ claim, assumptions, evidence, alternatives, dos, donts, ctx, audience, style, tone }) => [
    'Apply Socratic questioning to probe the topic and synthesize a position.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    claim && `Topic: ${claim}`,
    assumptions && (
      'Assumptions:\n' + String(assumptions)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((x,i)=> `${i+1}. ${x}`).join('\n')
    ),
    evidence && (
      'Evidence:\n' + String(evidence)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((x,i)=> `${i+1}. ${x}`).join('\n')
    ),
    alternatives && (
      'Alternatives:\n' + String(alternatives)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((x,i)=> `${i+1}. ${x}`).join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output:\n1) Clarification questions\n2) Probe assumptions\n3) Test evidence\n4) Explore viewpoints\n5) Implications\n6) Synthesis & next inquiry'
  ].filter(Boolean).join('\n')
},

  
  {
    id:'star',
    slug:'star-technique',
    label:'STAR — Situation · Task · Action · Result',
    kind:'framework',
    categories:['storytelling frameworks','prompt development techniques'],
   tags:[
  'type:framework','topic:storytelling','phase:apply','level:beginner',
  'use:behavioral-interview','use:resume-bullet','use:case-study'
],
use_cases: [
  'behavioral interview answer',
  'resume bullet',
  'case study write-up',
  'performance self-review',
  'success story for stakeholders',
  'incident/postmortem story'
],
boosters: [
  "Quantify results where possible (%, Δ, time); if no metrics given, propose proxy metrics."
],
    definition:'A structured storytelling method for accomplishments and case studies.',
    help:'Great for case studies, resumes, performance stories.',
    fields:[
      {key:'situation', label:'Situation', type:'textarea', desc:'Context and constraints.', ph:'e.g., Missed quarterly target; low trial conversions'},
      {key:'task',      label:'Task',      type:'textarea', desc:'Goal or responsibility.',   ph:'e.g., Improve conversion rate by 20%'},
      {key:'action',    label:'Action',    type:'textarea', desc:'What you did.',            ph:'e.g., Ran pricing test; rewrote trial emails'},
      {key:'result',    label:'Result',    type:'textarea', desc:'Outcome/impact.',          ph:'e.g., +24% conversions; +18% MRR'}
    ],
    template:({situation,task,action,result,ctx,audience})=>[
      ctx&&`Context: ${ctx}`,
      audience&&`Target reader: ${audience}`,
      `Narrative using STAR:`,
      situation&&`• Situation: ${situation}`,
      task&&`• Task: ${task}`,
      action&&`• Action: ${action}`,
      result&&`• Result: ${result}`
    ].filter(Boolean).join('\n')
  },
  {
    id:'swot',
    slug:'swot-analysis',
    label:'SWOT — Strengths · Weaknesses · Opportunities · Threats',
    kind:'framework',
    categories:['analysis frameworks','prompt development techniques'],
    tags:[
  'type:framework','topic:analysis','phase:overview','level:beginner',
  'use:competitive-analysis','use:market-analysis','use:product-strategy'
],
use_cases: [
  'competitive analysis',
  'market scan',
  'product strategy snapshot',
  'business strategy review',
  'go-to-market assessment',
  'campaign planning snapshot'
],
boosters: [
  "Sort each list most-specific → least; avoid duplicates; flag any misclassified items (internal vs external)."
],
    definition:'A 2×2 strategic scan that separates internal factors (S/W) from external forces (O/T).',
    help:'Strategic scan of an idea, product, or org.',
    fields:[
      {key:'subject',      label:'Subject',            type:'text',     desc:'What we are analyzing.', ph:'e.g., New B2B email tool'},
      {key:'strengths',    label:'Known strengths',    type:'textarea', desc:'Optional seed inputs.',   ph:'e.g., Easy setup; strong analytics'},
      {key:'weaknesses',   label:'Known weaknesses',   type:'textarea', desc:'Optional seed inputs.',   ph:'e.g., Limited integrations'},
      {key:'opportunities',label:'Known opportunities',type:'textarea', desc:'Optional seed inputs.',   ph:'e.g., Growing SMB market'},
      {key:'threats',      label:'Known threats',      type:'textarea', desc:'Optional seed inputs.',   ph:'e.g., Mailbox policy changes'}
    ],
    template:({subject,strengths,weaknesses,opportunities,threats,ctx})=>[
      `Conduct a SWOT analysis${subject?` of ${subject}`:''}.`,
      ctx&&`Context: ${ctx}`,
      (strengths||weaknesses||opportunities||threats)?`Seed facts to consider:`:null,
      strengths&&`• Strengths (given): ${strengths}`,
      weaknesses&&`• Weaknesses (given): ${weaknesses}`,
      opportunities&&`• Opportunities (given): ${opportunities}`,
      threats&&`• Threats (given): ${threats}`,
      `Return as four labeled lists with 3–6 bullets each, most specific first.`
    ].filter(Boolean).join('\n')
  },

{
  id:'task_breakdown',
  slug:'task-recipe-cot',
  label:'Task Prompt Breakdown — Task/Recipe + Do/Don’t (CoT)',
  kind:'pattern',
  categories:['prompt development techniques','planning'],
  tags:[
    'type:pattern','topic:tasking','topic:reasoning','phase:plan','level:beginner',
    'use:project-steps','use:recipe','use:breakdown','use:delegation'
  ],
  use_cases: [
    'break a goal into concrete steps',
    'write a procedural recipe',
    'handoff a task with crisp Do/Don’t guardrails',
    'guide short “explain-your-steps” reasoning'
  ],
  definition:'Decompose a goal into explicit steps (tasks), with optional Do/Don’t constraints, then produce the deliverable.',
  help:'Provide a main brief, enumerate tasks (add as many as needed), then add Do/Don’t guardrails.',
  boosters:[
    'Show the step plan as a numbered list before the final deliverable.',
    'Keep reasoning concise and procedural (no hidden chain-of-thought).',
    'List assumptions in one line if any are required.'
  ],
  fields:[
    { key:'main',  label:'Main brief / goal', type:'textarea',
      desc:'High-level objective or problem statement.',
      ph:'e.g., Create a study plan for a 6-week data structures course.'
    },
    // You can switch this to "dynamic_tasks" after Step 2
    { key:'tasks', label:'Tasks (one per line)', type:'textarea',
      desc:'Enter one task/step per line.',
      ph:'Task 1…\nTask 2…\nTask 3…'
    },
    { key:'dos',   label:'Do’s (must do)', type:'textarea',
      desc:'Positive guardrails the output must follow.',
      ph:'e.g., Use simple language; include references; keep under 500 words.'
    },
    { key:'donts', label:'Don’ts / Constraints', type:'textarea',
      desc:'Negative guardrails or constraints.',
      ph:'e.g., Don’t assume prior knowledge; avoid vendor-specific terms.'
    }
  ],
  template: ({ main, tasks, dos, donts, ctx, audience, style, tone }) => [
    'Use task/recipe chain of thought reasoning to break the goal into explicit steps, then produce the deliverable.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    main && `Goal: ${main}`,
    tasks && (
      'Tasks:\n' + String(tasks)
        .split(/\n+/)
        .map(s => s.trim())
        .filter(Boolean)
        .map((t, i) => `${i + 1}. ${t}`)
        .join('\n')
    ),
    dos && `Do:\n${dos}`,
    donts && `Don’t:\n${donts}`,
    'First show the numbered plan, then execute it to produce the final output. Keep reasoning concise (procedural, verifiable).'
  ].filter(Boolean).join('\n')
},

{
  id:'tot_brainstorm',
  slug:'tree-of-thought-brainstorm',
  label:'Tree of Thought — Brainstorm & Evaluate',
  kind:'pattern',
  categories:['reasoning','planning'],
  tags:[
    'type:pattern','topic:reasoning','topic:branching','phase:explore','level:advanced',
    'use:brainstorm','use:compare-alternatives','use:decision'
  ],
  use_cases:[
    'generate multiple solution paths before deciding',
    'compare tradeoffs across ideas using a scoring rubric',
    'pick a best path with justification and a reflect pass'
  ],
  definition:'Explore three distinct reasoning branches (fast/minimal; thorough/future-proof; creative alternative), score them with a rubric, select/synthesize, deliver, then reflect.',
  help:'Describe the task, constraints, and what “good” looks like. Optionally paste custom evaluation criteria (one per line). Guardrails include arithmetic checks, terminology clarity, source-of-truth checks for time-varying info, and bias/inclusion calls.',
  boosters:[
    'Keep branches shallow (depth 2–3) to avoid overthinking.',
    'Use explicit labels: Branch A, A1, A2… Branch B… Branch C…',
    'Score on 1–5 with one-line justifications per criterion.',
    'Run a quick reflect pass: math/terms/bias/constraints.',
    'If the user supplied criteria, use them; otherwise use the default rubric included below.'
  ],
  fields:[
    { key:'problem',  label:'Task / problem', type:'textarea',
      desc:'What should be solved or decided?',
      ph:'e.g., Choose a pricing model for a new SaaS.' },
    { key:'constraints', label:'Constraints (time/tools/tone/privacy)', type:'textarea',
      desc:'Limits to respect; hard requirements.',
      ph:'e.g., Launch in 2 weeks; no paid ads; tone: friendly/expert.' },
    { key:'success', label:'Success criteria (what “good” looks like)', type:'textarea',
      desc:'How the output will be judged.',
      ph:'e.g., Clear pricing tiers, easy to A/B test, predictable revenue.' },
    { key:'criteria', label:'Evaluation criteria (optional, one per line)', type:'textarea',
      desc:'If empty, a default rubric will be used.',
      ph:'Plausibility…\nEvidence…\nConstraint fit…\nRisk profile…\nInclusivity…\nSimplicity…\nNovelty…' }
  ],
  template: ({ problem, constraints, success, criteria, ctx, audience, style, tone }) => {
    const rubricLines = String(criteria||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
    const rubric = rubricLines.length
      ? 'Evaluation criteria:\n' + rubricLines.map((c,i)=>`${i+1}. ${c}`).join('\n')
      : [
          'Default scoring rubric (1–5 each):',
          '1) Plausibility — internally coherent and realistic.',
          '2) Evidence — verifiable facts; cite when needed.',
          '3) Constraint fit — matches time, tools, and tone.',
          '4) Risk profile — failure modes, ambiguity, hidden costs.',
          '5) Inclusivity — avoid Western-centric defaults; note lenses.',
          '6) Simplicity — minimum moving parts.',
          '7) Novelty — useful creativity without hand-waving.'
        ].join('\n');

    return [
      'You are in Tree-of-Thought mode.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      problem && `Task: ${problem}`,
      constraints && `Constraints: ${constraints}`,
      success && `Success criteria: ${success}`,
      rubric,
      'Procedure:',
      '1) Generate 3 branches with different assumptions:',
      '   • Branch A: fast/minimal solution',
      '   • Branch B: thorough/future-proof solution',
      '   • Branch C: creative alternative',
      '   For each branch, list: assumptions, 3–5 steps, facts needed, risks, brief cost/benefit.',
      '2) Expand only the 2 most promising steps per branch to avoid overthinking.',
      '3) Score each branch on the rubric (1–5) with one-line justifications.',
      '4) Select the winning branch or synthesize a blend (2–4 lines on why).',
      '5) Produce the final deliverable.',
      '6) Reflect pass: check math (digit-by-digit if any), clarify terminology on first use, verify time-varying info against a source of truth, call out potential bias/assumptions, and list trade-offs in 3 bullets.',
      'Output format:',
      'Root',
      '├─ Branch A',
      '│  ├─ A1 …',
      '│  ├─ A2 …',
      '│  └─ …',
      '├─ Branch B',
      '│  ├─ B1 …',
      '│  ├─ B2 …',
      '│  └─ …',
      '└─ Branch C',
      '   ├─ C1 …',
      '   ├─ C2 …',
      '   └─ …',
      '→ Scores table → Selected path/synthesis → Final answer → Reflect pass.'
    ].filter(Boolean).join('\n');
  }
},


{
  id:'tot_decompose',
  slug:'tree-of-thought-decomposition',
  label:'Tree of Thought — Decomposition',
  kind:'pattern',
  categories:['reasoning','planning'],
  tags:[
    'type:pattern','topic:decomposition','topic:branching','phase:plan','level:advanced',
    'use:breakdown','use:alternatives','use:execution-plan'
  ],
  use_cases:[
    'break a complex goal into a branching plan with alternatives',
    'surface trade-offs at ambiguous nodes with scoring',
    'select a minimal viable critical path with checkpoints'
  ],
  definition:'Decompose a complex goal into a branching hierarchy with alternative sub-steps, score branch strategies, select a critical path, then reflect.',
  help:'Provide the goal, constraints, and any focus areas or risks. The model will build a numbered tree, compare strategies, choose a minimal viable path, and list next actions.',
  boosters:[
    'Show a numbered hierarchy (1, 1.1, 1.1.1).',
    'Offer 2–3 alternative sub-steps at ambiguous nodes.',
    'Label dependencies and the critical path.',
    'End with a smallest-next-action checklist and a reflect pass.'
  ],
  fields:[
    { key:'goal',  label:'Goal / complex task', type:'textarea',
      desc:'What should be decomposed?',
      ph:'e.g., Launch a developer portal in 6 weeks.' },
    { key:'constraints', label:'Constraints (time/tools/tone/privacy)', type:'textarea',
      desc:'Limits to respect; hard requirements.',
      ph:'e.g., 2 engineers, budget $5k, HIPAA data.' },
    { key:'success', label:'Success criteria (what “good” looks like)', type:'textarea',
      desc:'How the outcome will be judged.',
      ph:'e.g., Docs coverage ≥80%, SSO, <200ms P95.' },
    { key:'facets',   label:'Focus areas (one per line, optional)', type:'textarea',
      desc:'Dimensions to branch on (e.g., people, process, tooling).',
      ph:'Docs…\nAuth…\nDX metrics…\nContent strategy…' },
    { key:'risks',    label:'Known risks & assumptions (one per line, optional)', type:'textarea',
      desc:'Things that could change the plan.',
      ph:'Limited writer bandwidth…\nPending legal review…' },
    { key:'criteria', label:'Evaluation criteria (optional, one per line)', type:'textarea',
      desc:'If empty, a default rubric will be used.',
      ph:'Plausibility…\nEvidence…\nConstraint fit…\nRisk profile…\nInclusivity…\nSimplicity…\nNovelty…' }
  ],
  template: ({ goal, constraints, success, facets, risks, criteria, ctx, audience, style, tone }) => {
    const rubricLines = String(criteria||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
    const rubric = rubricLines.length
      ? 'Evaluation criteria:\n' + rubricLines.map((c,i)=>`${i+1}. ${c}`).join('\n')
      : [
          'Default scoring rubric (1–5 each):',
          '1) Plausibility — internally coherent and realistic.',
          '2) Evidence — verifiable facts; cite when needed.',
          '3) Constraint fit — matches time, tools, and tone.',
          '4) Risk profile — failure modes, ambiguity, hidden costs.',
          '5) Inclusivity — avoid Western-centric defaults; note lenses.',
          '6) Simplicity — minimum moving parts.',
          '7) Novelty — useful creativity without hand-waving.'
        ].join('\n');

    const facetsBlock = String(facets||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
    const risksBlock = String(risks||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);

    return [
      'You are in Tree-of-Thought mode.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      goal && `Goal: ${goal}`,
      constraints && `Constraints: ${constraints}`,
      success && `Success criteria: ${success}`,
      facetsBlock.length && ('Focus areas:\n' + facetsBlock.map((f,i)=>`${i+1}. ${f}`).join('\n')),
      risksBlock.length && ('Known risks & assumptions:\n' + risksBlock.map((r,i)=>`${i+1}. ${r}`).join('\n')),
      rubric,
      'Procedure:',
      '1) Build a branching decomposition as a numbered tree (depth 2–3). Where a node is ambiguous, show 2–3 alternative sub-steps with brief pros/cons.',
      '2) Propose 3 branch strategies at the top level:',
      '   • Branch A: fast/minimal deliverable',
      '   • Branch B: thorough/future-proof deliverable',
      '   • Branch C: creative or non-obvious approach',
      '   For each, list assumptions, 3–5 major steps, key dependencies, and risks.',
      '3) Score the 3 branches on the rubric (1–5) with one-line justifications and a short cost/benefit.',
      '4) Select the critical path (minimal viable plan) and label it in the tree. Include dependencies and 2–4 checkpoints.',
      '5) Next actions: a checklist of 5–8 smallest steps to start in the next 1–2 days.',
      '6) Reflect pass: check math (digit-by-digit if any), clarify terminology on first use, verify time-varying info against a source of truth, call out potential bias/assumptions, and list any trade-offs in 3 bullets.',
      'Output format:',
      '1) Numbered tree (1, 1.1, 1.1.1) with alternatives annotated',
      '2) Branch A/B/C summaries',
      '3) Scores table',
      '4) Selected critical path with dependencies + checkpoints',
      '5) Next-actions checklist',
      '6) Reflect pass notes'
    ].filter(Boolean).join('\n');
  }
},

{
  id:'triangulation',
  slug:'triangulation-methods',
  label:'Triangulation Methods',
  kind:'pattern',
  categories:['research','ethics','bias'],
  tags:[
    'type:pattern','topic:triangulation','topic:validation','level:intermediate',
    'use:ux-research','use:analytics','use:mixed-methods'
  ],
  use_cases:[
    'reduce single-method bias by cross-checking findings',
    'document alignment/divergence across methods',
    'decide where to deepen research'
  ],
  definition:'Use multiple methods/sources to converge on more reliable findings and reduce researcher bias.',
  help:'Capture A/B (and optional C) methods + findings; then cross-check alignment and note dominance risks.',
  boosters:[
    'Label each method with its sampling limits.',
    'End with a “What we’ll do next” line for resolving divergences.'
  ],
  fields:[
    { key:'question',  label:'Question being investigated', type:'textarea', ph:'Research focus / decision at stake.' },
    { key:'method_a',  label:'Method A', type:'text', ph:'Survey / Interview / Analytics…' },
    { key:'findings_a',label:'Findings from A', type:'textarea', ph:'Bullets; one per line.' },
    { key:'method_b',  label:'Method B', type:'text', ph:'Different lens' },
    { key:'findings_b',label:'Findings from B', type:'textarea', ph:'Bullets; one per line.' },
    { key:'method_c',  label:'Method C (optional)', type:'text', ph:'Third lens' },
    { key:'findings_c',label:'Findings from C (optional)', type:'textarea', ph:'Bullets; one per line.' },
    { key:'cross',     label:'Cross-check — where do findings align/diverge?', type:'textarea', ph:'Note convergences and tensions.' },
    { key:'bias_risk', label:'Bias risk — which perspective dominates?', type:'textarea', ph:'Recruitment, sampling, analyst bias…' }
  ],
  template: ({ question, method_a, findings_a, method_b, findings_b, method_c, findings_c, cross, bias_risk, ctx, audience, style, tone }) => [
    'Run a triangulation summary to reduce single-method bias.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    question && ('Question:\n' + question),
    (method_a || findings_a) && [
      `Method A: ${method_a||''}`,
      findings_a && ('Findings A:\n' + String(findings_a).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`- ${x}`).join('\n'))
    ].filter(Boolean).join('\n'),
    (method_b || findings_b) && [
      `Method B: ${method_b||''}`,
      findings_b && ('Findings B:\n' + String(findings_b).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`- ${x}`).join('\n'))
    ].filter(Boolean).join('\n'),
    (method_c || findings_c) && [
      `Method C: ${method_c||''}`,
      findings_c && ('Findings C:\n' + String(findings_c).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`- ${x}`).join('\n'))
    ].filter(Boolean).join('\n'),
    cross && ('Cross-check:\n' + cross),
    bias_risk && ('Bias risk:\n' + bias_risk),
    'Output:\n1) Convergences\n2) Divergences\n3) Dominance risks\n4) Next research step'
  ].filter(Boolean).join('\n')
},

{
  id:'triz',
  slug:'triz-inventive-problem-solving',
  label:'TRIZ (Theory of Inventive Problem Solving)',
  kind:'pattern',
  categories:['innovation','engineering','reasoning'],
  tags:[
    'type:pattern','topic:contradictions','topic:ideality','phase:invent','level:intermediate',
    'use:product-ideas','use:process-innovation','use:technical-problems'
  ],
  use_cases:[
    'resolve contradictions without trade-offs',
    'generate inventive principles to explore',
    'aim toward an Ideal Final Result (IFR)'
  ],
  definition:'A method that analyzes contradictions and patterns of invention to propose principle-driven solutions toward an ideal outcome.',
  help:'State the problem, list contradictions and available resources, and describe the Ideal Final Result (IFR).',
  boosters:[
    'Map each contradiction to candidate inventive principles.',
    'Offer at least 3 distinct concepts referencing principles.',
    'Briefly test each concept against constraints/resources.'
  ],
  fields:[
    { key:'problem',        label:'Problem statement', type:'textarea',
      desc:'What needs an inventive solution?',
      ph:'We need high throughput without increasing cost…' },
    { key:'contradictions', label:'Contradictions (one per line)', type:'textarea',
      desc:'Conflicts like speed vs quality.',
      ph:'Increase speed vs maintain accuracy…\nReduce cost vs keep reliability…' },
    { key:'resources',      label:'Available resources (one per line)', type:'textarea',
      desc:'Internal/external resources, fields, effects.',
      ph:'Idle CPU cycles…\nUser-generated data…\nCapacitors…' },
    { key:'ifr',            label:'Ideal Final Result (IFR)', type:'textarea',
      desc:'Describe the near-perfect outcome.',
      ph:'Zero defects at current cost and time…' },
    { key:'dos',            label:"Do's (must do)", type:'textarea',
      desc:'Positive guardrails.',
      ph:'Reference named principles; give 3+ concepts.' },
    { key:'donts',          label:"Don\'ts / constraints", type:'textarea',
      desc:'Limits to respect.',
      ph:'Avoid vague “be more efficient”.' }
  ],
  template: ({ problem, contradictions, resources, ifr, dos, donts, ctx, audience, style, tone }) => [
    'Apply TRIZ: analyze contradictions, aim for the Ideal Final Result, propose principle-based concepts.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    problem && `Problem: ${problem}`,
    contradictions && (
      'Contradictions:\n' + String(contradictions)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((c,i)=> `${i+1}. ${c}`).join('\n')
    ),
    resources && (
      'Resources:\n' + String(resources)
        .split(/\n+/).map(s=>s.trim()).filter(Boolean)
        .map((r,i)=> `${i+1}. ${r}`).join('\n')
    ),
    ifr && `Ideal Final Result (IFR): ${ifr}`,
    dos && `Do:\n${dos}`,
    donts && `Don\'t:\n${donts}`,
    'Output:\n1) Map contradictions → candidate inventive principles\n2) 3–5 concepts referencing principles\n3) Quick feasibility/impact check'
  ].filter(Boolean).join('\n')
},

{
  id:'two_min_rule',
  slug:'two-minute-rule',
  label:'2-Minute Rule (David Allen)',
  kind:'pattern',
  categories:['productivity','behavior'],
  tags:['type:pattern','topic:two-minute','use:starter','level:beginner'],
  use_cases:[
    'reduce friction by doing a tiny version now',
    'convert avoidance into a first motion'
  ],
  definition:'If it takes ≤2 minutes, do it now. Otherwise, define a 2-minute starter.',
  help:'Name the task; answer Yes/No; either do it now or write a 2-minute starter step.',
  boosters:[
    'If “No,” schedule the starter step on your calendar.',
    'Write the starter so it’s purely mechanical.'
  ],
  fields:[
    { key:'task',           label:'Task — what am I avoiding?', type:'textarea' },
    { key:'two_min_possible',label:'Can I do a 2-minute version? (Yes/No)', type:'text', ph:'Yes / No' },
    { key:'starter',        label:'If No → 2-minute starter step', type:'textarea', ph:'Open doc and write title; create folder…' }
  ],
  template: ({ task, two_min_possible, starter, ctx, audience, style, tone }) => [
    'Apply the 2-Minute Rule to force a start.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    task && ('Task:\n' + task),
    typeof two_min_possible==='string' && two_min_possible && `Can do ≤2 min now? ${two_min_possible}`,
    (two_min_possible||'').toLowerCase().startsWith('y') ? 'Action: Do it now.' : (starter && ('Starter step:\n' + starter)),
    'Output:\n1) Task\n2) Immediate action or starter\n3) Timebox (≤2 min) + tiny reward'
  ].filter(Boolean).join('\n')
},

{
  id:'vars_delims',
  slug:'variables-and-delimiters',
  label:'Variables & Delimiters — Define once, reuse cleanly',
  kind:'framework',
  categories:['prompt development techniques','structuring'],
  tags:[
    'type:framework','topic:prompting','phase:compose','level:beginner',
    'use:variables','use:delimiters','use:glossary','use:spec'
  ],
  use_cases:[
    'long prompts with reusable terms','glossaries & specs','persona/role libraries','data field definitions'
  ],
  definition:'Declare variables once (names + definitions aligned by line). We auto-fence a VARIABLES block so the model resolves {NAME} unambiguously.',
  help:'In “Variables”, list names one per line (e.g., USER_ROLE). In “Definitions”, list matching definitions one per line (e.g., Senior data analyst…). Lines are zipped by index. Reference variables later as {USER_ROLE}.',
  fields:[
    { key:'variables',   label:'Variables (one per line)',      type:'textarea',
      desc:'Each line is a variable NAME. Uppercase is recommended (e.g., USER_ROLE).',
      ph:'USER_ROLE\nDATASET\nSUCCESS_CRITERIA' },

    { key:'definitions', label:'Definitions (one per line)',    type:'textarea',
      desc:'Each line defines the variable at the same line-number.',
      ph:'Senior data analyst reporting to the VP of Growth\nCSV with columns date, clicks, cost, conversions\nClear, testable outcomes within 30 days' },

    { key:'task',        label:'Primary task',                  type:'textarea',
      desc:'What you want done using the variables.',
      ph:'Write a 150–200 word onboarding email that references {USER_ROLE} and {SUCCESS_CRITERIA} and uses data from {DATASET}.' },

    { key:'constraints', label:'Constraints (optional)',        type:'textarea',
      desc:'Rules, limits, must-haves.',
      ph:'Plain language; cite {DATASET} column names exactly; avoid jargon.' },

    { key:'format',      label:'Response format (optional)',    type:'textarea',
      desc:'Headings/structure for output.',
      ph:'Markdown: Summary, Steps, Checklist' }
  ],
  boosters:[
    'Treat each {NAME} as canonical. If any mapping is missing, ask one concise clarifying question, then proceed.',
    'Keep variables verbatim (case-sensitive) when referencing, e.g., {USER_ROLE}.'
  ],
  template:({variables,definitions,task,constraints,format,ctx})=>{
    const toLines = s => (s||'').split('\n').map(x=>x.trim()).filter(x=>x.length>0);
    const names = toLines(variables);
    const defs  = toLines(definitions);

    const max = Math.max(names.length, defs.length);
    const pairs = [];
    for (let i=0;i<max;i++){
      const name = (names[i]||'').trim();
      const def  = (defs[i] || '(define)').trim();
      // skip fully empty lines
      if (!name && !def) continue;
      // provide a fallback name if definition appears without a name
      pairs.push([ name || `VAR_${i+1}`, def ]);
    }

    const mapped = pairs.map(([n,d])=>`${n} = ${d}`).join('\n');

    const issues = [];
    if (names.length !== defs.length){
      issues.push(`Note: ${names.length} variable(s) and ${defs.length} definition(s).`);
    }
    const bad = names.filter(n => n && !/^[A-Z][A-Z0-9_]*$/.test(n));
    if (bad.length){
      issues.push(`Suggestion: Normalize to UPPER_SNAKE_CASE → ${bad.join(', ')}`);
    }

    return [
      'Use the following variable definitions. Treat them as canonical.',
      '```VARIABLES',
      mapped,
      '```',
      ctx && `Context: ${ctx}`,
      task && `Task: ${task}`,
      constraints && `Constraints: ${constraints}`,
      issues.length ? `Validator: ${issues.join(' ')}` : null,
      'Rules: Always resolve placeholders like {NAME} from the VARIABLES block above. If any value is "(define)", ask one concise question, then proceed.',
      format && `Format: ${format}`
    ].filter(Boolean).join('\n');
  }
},

{
  id:'weighted_mini_matrix',
  slug:'weighted-mini-matrix',
  label:'Weighted Mini-Matrix (quick score)',
  kind:'pattern',
  categories:['decision','prioritization'],
  tags:['type:pattern','topic:matrix','use:prioritize','level:intermediate'],
  use_cases:[
    'compare up to 3 options against 2–3 criteria',
    'force a transparent, quick pick'
  ],
  definition:'Tiny decision matrix: options × criteria with 1–5 ratings; totals pick the frontrunner.',
  help:'Enter options (one per line) and criteria (one per line). In “Quick ratings,” add one line per option like “Option Name: 4, 3, 5” matching criteria order.',
  boosters:[
    'If a criterion matters more, duplicate it (acts as a simple weight).',
    'Break ties with a 5-minute spike test you’ll define at the end.'
  ],
  fields:[
    { key:'options',   label:'Options (≤3, one per line)', type:'textarea', ph:'Option A\nOption B\nOption C' },
    { key:'criteria',  label:'Criteria (2–3, one per line)', type:'textarea', ph:'Impact\nEffort\nRisk' },
    { key:'ratings',   label:'Quick ratings (1–5) — one line per option', type:'textarea', ph:'Option A: 5,2,4\nOption B: 4,3,5' }
  ],
  template: ({ options, criteria, ratings, ctx, audience, style, tone }) => {
    const opts = String(options||'').split(/\n+/).map(s=>s.trim()).filter(Boolean).slice(0,3);
    const crit = String(criteria||'').split(/\n+/).map(s=>s.trim()).filter(Boolean).slice(0,3);
    const rateLines = String(ratings||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
    const scoreMap = {};
    rateLines.forEach(line=>{
      const parts = line.split(':');
      const name = (parts[0]||'').trim();
      const nums = (parts[1]||'').split(/[, \t]+/).map(n=>parseFloat(n)).filter(n=>!isNaN(n)).slice(0,crit.length);
      if(name) scoreMap[name]=nums;
    });
    const totals = opts.map(name=>{
      const arr = (scoreMap[name]||[]);
      const total = arr.reduce((a,b)=>a+b,0);
      return { name, arr, total };
    });
    const best = totals.reduce((a,b)=> (b.total>(a?.total??-Infinity)?b:a), null);

    const header = [
      'Run a quick weighted mini-matrix.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      opts.length && ('Options:\n' + opts.map((o,i)=>`${i+1}. ${o}`).join('\n')),
      crit.length && ('Criteria (order = rating order):\n' + crit.map((c,i)=>`${i+1}. ${c}`).join('\n'))
    ].filter(Boolean).join('\n');

    const table = totals.length ? [
      'Ratings & totals:',
      ...totals.map(t => {
        const cells = t.arr.map((n,i)=>`${crit[i]??`C${i+1}`}=${n}`).join(', ');
        return `- ${t.name}: ${cells} | Total=${t.total||0}`;
      })
    ].join('\n') : '';

    const pick = best ? `Highest score → Next action: ${best.name}` : 'Highest score → Next action: (insufficient ratings)';

    return [header, table, pick, 'Output:\n1) Matrix summary\n2) Pick + one 5-min spike to validate'].filter(Boolean).join('\n');
  }
},

{
  id:'woop',
  slug:'woop-wish-outcome-obstacle-plan',
  label:'WOOP (Wish–Outcome–Obstacle–Plan)',
  kind:'pattern',
  categories:['behavior','motivation'],
  tags:['type:pattern','topic:woop','use:motivation','level:beginner'],
  use_cases:[
    'contrast desired outcome with the main obstacle',
    'bind an if–then plan to the obstacle'
  ],
  definition:'Wish → Outcome → Obstacle → Plan (if obstacle, then I will X).',
  help:'Write a short, specific wish; name the tangible best outcome; identify the likely obstacle; define the if–then plan.',
  boosters:[
    'Phrase the wish so it’s completable in ≤2 weeks.',
    'Make the obstacle internal (habit/thought) when possible.'
  ],
  fields:[
    { key:'wish',     label:'Wish — what do I want to complete?', type:'textarea' },
    { key:'outcome',  label:'Outcome — benefit if I succeed?', type:'textarea' },
    { key:'obstacle', label:'Obstacle — what usually gets in the way?', type:'textarea' },
    { key:'plan',     label:'Plan — if obstacle, then I will…', type:'textarea' }
  ],
  template: ({ wish, outcome, obstacle, plan, ctx, audience, style, tone }) => [
    'Use WOOP to turn motivation into a plan.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    wish && ('Wish:\n' + wish),
    outcome && ('Outcome:\n' + outcome),
    obstacle && ('Obstacle:\n' + obstacle),
    plan && ('Plan (if obstacle, then I will…):\n' + plan),
    'Output:\n1) Wish\n2) Outcome\n3) Obstacle\n4) If–then plan\n5) First checkpoint'
  ].filter(Boolean).join('\n')
},

  {
    id:'a3_ps',
    slug:'a3-problem-solving-toyota',
    label:'A3 Problem Solving (Toyota)',
    kind:'framework',
    categories:['quality','operations','reasoning','prompt development techniques'],
    tags:[
      'type:framework','topic:problem-solving','topic:lean','phase:plan','level:intermediate',
      'use:root-cause','use:countermeasures','use:one-page-brief'
    ],
    use_cases:[
      'structure a one-page problem brief',
      'analyze current vs. target condition',
      'design countermeasures and follow-up'
    ],
    boosters:[
      'Keep it one “page”: terse bullets per section.',
      'Tie each countermeasure to a specific cause and owner.'
    ],
    definition:'A visual one-page flow to frame background, analyze causes, plan countermeasures, and follow through.',
    help:'Fill the sections succinctly; prefer facts and direct measures.',
    fields:[
      { key:'background', label:'Background (why this matters)', type:'textarea', ph:'Context and business impact.' },
      { key:'current',    label:'Current condition (facts/metrics)', type:'textarea', ph:'Where we are now.' },
      { key:'target',     label:'Target condition (measurable)', type:'textarea', ph:'Where we need to be by when.' },
      { key:'analysis',   label:'Root-cause analysis', type:'textarea', ph:'Causal chain; key drivers.' },
      { key:'countermeasures', label:'Countermeasures', type:'textarea', ph:'Proposed fixes mapped to causes.' },
      { key:'plan',       label:'Implementation plan', type:'textarea', ph:'Owners, dates, checkpoints.' },
      { key:'follow_up',  label:'Follow-up / learnings', type:'textarea', ph:'How we’ll verify and iterate.' }
    ],
    template:({background,current,target,analysis,countermeasures,plan,follow_up,ctx,audience,style,tone})=>[
      'Use the A3 problem-solving flow.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      background && `Background:\n${background}`,
      current && `Current condition:\n${current}`,
      target && `Target condition (measurable):\n${target}`,
      analysis && `Root-cause analysis:\n${analysis}`,
      countermeasures && `Countermeasures:\n${countermeasures}`,
      plan && `Implementation plan:\n${plan}`,
      follow_up && `Follow-up / learnings:\n${follow_up}`,
      'Output:\n1) Problem brief\n2) Causes→Countermeasures map\n3) Plan with owners/dates\n4) Follow-up checks'
    ].filter(Boolean).join('\n')
  },

  {
    id:'anekantavada_syadvada',
    slug:'anekantavada-syadvada-jain',
    label:'Anekāntavāda & Syādvāda (Jain Many-Sided Logic)',
    kind:'framework',
    categories:['reasoning','philosophy','cultural frameworks'],
    tags:[
      'type:framework','topic:dialectic','topic:many-sidedness','phase:explore','level:advanced',
      'use:ambiguity-management','use:policy','use:ethical-tradeoffs'
    ],
    use_cases:[
      'frame a contentious issue via multiple partial truths',
      'generate sevenfold qualified statements',
      'surface context-conditional claims'
    ],
    boosters:[
      'Force at least 3 distinct standpoints before synthesis.',
      'Use “in some respect…” qualifiers to avoid overclaiming.'
    ],
    definition:'Reasoning that treats claims as conditionally true from different standpoints; includes sevenfold predication (syād-asti… etc.).',
    help:'List standpoints, then produce qualified statements and a synthesis.',
    fields:[
      { key:'issue',       label:'Issue/claim under analysis', type:'textarea', ph:'Describe the claim.' },
      { key:'standpoints', label:'Standpoints (naya), one per line', type:'textarea', ph:'Economic…\nEcological…\nLegal…' },
      { key:'evidence',    label:'Key evidence by standpoint', type:'textarea', ph:'Map data to each standpoint.' },
      { key:'predications',label:'Qualified statements (syād-…)', type:'textarea', ph:'In some respect it is…\nIn some respect it is not…' }
    ],
    template:({issue,standpoints,evidence,predications,ctx})=>[
      'Apply Anekāntavāda / Syādvāda (many-sided qualified reasoning).',
      ctx && `Context: ${ctx}`,
      issue && `Issue:\n${issue}`,
      standpoints && ('Standpoints:\n' + String(standpoints).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      evidence && `Evidence (by standpoint):\n${evidence}`,
      predications && `Qualified statements:\n${predications}`,
      'End with a synthesis that preserves conditionality and states limits.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'dao_wu_wei',
    slug:'daoist-wu-wei-strategy',
    label:'Daoist Wu-Wei Strategy (Effortless Action)',
    kind:'framework',
    categories:['strategy','ethics','cultural frameworks'],
    tags:[
      'type:framework','topic:wu-wei','topic:minimal-intervention','phase:plan','level:intermediate',
      'use:governance','use:ops-simplification','use:change-management'
    ],
    use_cases:[
      'design minimal-intervention strategies',
      'align with existing flows instead of forcing change',
      'choose points of least-effort leverage'
    ],
    boosters:[
      'Prefer removing steps over adding steps.',
      'Name non-actions explicitly (what you will not do).'
    ],
    definition:'Plan by aligning with natural flows; act sparingly at points of leverage; reduce friction and over-control.',
    help:'Map flows and frictions; select smallest moves that unlock progress.',
    fields:[
      { key:'goal',         label:'Goal/outcome', type:'text', ph:'Desired state.' },
      { key:'flows',        label:'Existing flows (where energy already moves)', type:'textarea', ph:'User habits, market currents, team rhythms…' },
      { key:'frictions',    label:'Friction points', type:'textarea', ph:'Bottlenecks, resistances.' },
      { key:'leverage',     label:'Leverage points', type:'textarea', ph:'Small moves with outsized effect.' },
      { key:'non_actions',  label:'Non-actions (deliberate restraint)', type:'textarea', ph:'What not to do.' },
      { key:'minimal_moves',label:'Minimal enabling actions', type:'textarea', ph:'Remove, nudge, or re-sequence.' }
    ],
    template:({goal,flows,frictions,leverage,non_actions,minimal_moves,ctx})=>[
      'Use Wu-Wei planning: align with flows; intervene minimally at leverage points.',
      ctx && `Context: ${ctx}`,
      goal && `Goal: ${goal}`,
      flows && `Existing flows:\n${flows}`,
      frictions && `Friction points:\n${frictions}`,
      leverage && `Leverage points:\n${leverage}`,
      non_actions && `Non-actions (deliberate restraint):\n${non_actions}`,
      minimal_moves && `Minimal enabling actions:\n${minimal_moves}`,
      'Output: small set of low-effort moves with rationale and expected downstream effects.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'dmaic',
    slug:'dmaic-six-sigma',
    label:'DMAIC — Define · Measure · Analyze · Improve · Control',
    kind:'framework',
    categories:['quality','operations','decision'],
    tags:[
      'type:framework','topic:six-sigma','phase:execute','level:intermediate',
      'use:process-improvement','use:experiment-design'
    ],
    use_cases:[
      'structure a data-driven improvement',
      'turn metrics into countermeasures',
      'plan control/monitoring'
    ],
    boosters:[
      'Tie each Improve action to a measured root cause.',
      'Specify Control metrics, thresholds, and owners.'
    ],
    definition:'A five-phase improvement method that moves from definition and measurement to analysis, improvement, and sustained control.',
    help:'Good for quantitative problem solving with clear KPIs.',
    fields:[
      { key:'define',  label:'Define',  type:'textarea', ph:'Problem statement, scope, customer.' },
      { key:'measure', label:'Measure', type:'textarea', ph:'Baseline metrics and data quality.' },
      { key:'analyze', label:'Analyze', type:'textarea', ph:'Root causes; key drivers.' },
      { key:'improve', label:'Improve', type:'textarea', ph:'Interventions and pilots.' },
      { key:'control', label:'Control', type:'textarea', ph:'Monitoring plan; owners; thresholds.' }
    ],
    template:({define,measure,analyze,improve,control,ctx})=>[
      'Run DMAIC on the problem.',
      ctx && `Context: ${ctx}`,
      define && `Define:\n${define}`,
      measure && `Measure:\n${measure}`,
      analyze && `Analyze:\n${analyze}`,
      improve && `Improve:\n${improve}`,
      control && `Control:\n${control}`
    ].filter(Boolean).join('\n')
  },

  {
    id:'east_nudge',
    slug:'east-behavioral-nudge',
    label:'EAST — Easy · Attractive · Social · Timely',
    kind:'framework',
    categories:['behavior','design','strategy'],
    tags:[
      'type:framework','topic:nudge','phase:design','level:beginner',
      'use:behavior-change','use:ux','use:policy'
    ],
    use_cases:[
      'design nudges for adoption',
      'reduce friction in flows',
      'translate insights into micro-interventions'
    ],
    boosters:[
      'Pair each tactic with a measurable behavior and metric.',
      'Add a tiny “if–then” plan for the riskiest barrier.'
    ],
    definition:'A behavioral design checklist to make the desired behavior easy, attractive, social, and timely.',
    help:'Map barriers and pick EAST levers with concrete UI/content changes.',
    fields:[
      { key:'behavior', label:'Target behavior', type:'text', ph:'What should happen?' },
      { key:'audience', label:'Audience/segment', type:'text', ph:'Who is acting?' },
      { key:'easy',     label:'Easy (reduce effort)', type:'textarea', ph:'Defaults, autofill, fewer steps…' },
      { key:'attractive',label:'Attractive (salience/incentive)', type:'textarea', ph:'Visual priority, rewards…' },
      { key:'social',   label:'Social (norms/reciprocity)', type:'textarea', ph:'Testimonials, peer stats…' },
      { key:'timely',   label:'Timely (moment/trigger)', type:'textarea', ph:'Just-in-time prompts, reminders…' },
      { key:'metric',   label:'Success metric', type:'text', ph:'Conversion, completion time…' }
    ],
    template:({behavior,audience,easy,attractive,social,timely,metric,ctx})=>[
      'Apply EAST (behavioral design).',
      ctx && `Context: ${ctx}`,
      behavior && `Behavior: ${behavior}`,
      audience && `Audience: ${audience}`,
      easy && `Easy:\n${easy}`,
      attractive && `Attractive:\n${attractive}`,
      social && `Social:\n${social}`,
      timely && `Timely:\n${timely}`,
      metric && `Metric:\n${metric}`,
      'Return: the single highest-leverage nudge with a quick test plan.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'eightfold_path',
    slug:'buddhist-eightfold-path-adapted',
    label:'Buddhist Eightfold Path (Adapted for Action)',
    kind:'framework',
    categories:['ethics','reasoning','cultural frameworks'],
    tags:[
      'type:framework','topic:mindfulness','topic:ethics','phase:plan','level:intermediate',
      'use:policy-guardrails','use:communication','use:self-management'
    ],
    use_cases:[
      'design ethical guardrails',
      'structure mindful decision steps',
      'review impacts on others'
    ],
    boosters:[
      'Translate each factor into a concrete check for the task.',
      'State one “harm minimization” change before final.'
    ],
    definition:'Use the eight factors (View, Intention, Speech, Action, Livelihood, Effort, Mindfulness, Concentration) as a practical checklist.',
    help:'Map the task to the eight factors; keep language secular and actionable.',
    fields:[
      { key:'view',         label:'Right View (assumptions/realities)', type:'textarea' },
      { key:'intention',    label:'Right Intention (aims)', type:'textarea' },
      { key:'speech',       label:'Right Speech (communication)', type:'textarea' },
      { key:'action',       label:'Right Action (conduct)', type:'textarea' },
      { key:'livelihood',   label:'Right Livelihood (means)', type:'textarea' },
      { key:'effort',       label:'Right Effort (discipline)', type:'textarea' },
      { key:'mindfulness',  label:'Right Mindfulness (attention)', type:'textarea' },
      { key:'concentration',label:'Right Concentration (focus)', type:'textarea' }
    ],
    template:({view,intention,speech,action,livelihood,effort,mindfulness,concentration,ctx})=>[
      'Run an Eightfold Path check (adapted).',
      ctx && `Context: ${ctx}`,
      view && `View:\n${view}`,
      intention && `Intention:\n${intention}`,
      speech && `Speech:\n${speech}`,
      action && `Action:\n${action}`,
      livelihood && `Livelihood:\n${livelihood}`,
      effort && `Effort:\n${effort}`,
      mindfulness && `Mindfulness:\n${mindfulness}`,
      concentration && `Concentration:\n${concentration}`,
      'Close with a one-line ethical adjustment and an acceptance test.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'ganma_confluence',
    slug:'ganma-knowledge-confluence',
    label:'Ganma — Knowledge Confluence (Yolŋu)',
    kind:'framework',
    categories:['research','cultural frameworks','strategy'],
    tags:[
      'type:framework','topic:knowledge-pluralism','topic:integration','phase:explore','level:advanced',
      'use:interdisciplinary-synthesis','use:policy','use:design-research'
    ],
    use_cases:[
      'braid two knowledge systems without erasing differences',
      'document tensions and synthesis',
      'design shared next steps'
    ],
    boosters:[
      'Make tensions explicit; do not collapse differences.',
      'Name shared safeguards for continued collaboration.'
    ],
    definition:'A metaphor of mixing “freshwater” and “saltwater” knowledge streams to create a productive confluence.',
    help:'Capture sources A/B, overlaps, tensions, synthesis, and safeguards.',
    fields:[
      { key:'stream_a',  label:'Knowledge Stream A', type:'textarea', ph:'e.g., Community practice' },
      { key:'stream_b',  label:'Knowledge Stream B', type:'textarea', ph:'e.g., Academic research' },
      { key:'overlaps',  label:'Overlaps (shared truths)', type:'textarea' },
      { key:'tensions',  label:'Tensions (incommensurables)', type:'textarea' },
      { key:'synthesis', label:'Confluence (new practice/insight)', type:'textarea' },
      { key:'safeguards',label:'Safeguards / protocols', type:'textarea' }
    ],
    template:({stream_a,stream_b,overlaps,tensions,synthesis,safeguards,ctx})=>[
      'Apply Ganma (knowledge confluence).',
      ctx && `Context: ${ctx}`,
      stream_a && `Stream A:\n${stream_a}`,
      stream_b && `Stream B:\n${stream_b}`,
      overlaps && `Overlaps:\n${overlaps}`,
      tensions && `Tensions:\n${tensions}`,
      synthesis && `Confluence (synthesis):\n${synthesis}`,
      safeguards && `Safeguards:\n${safeguards}`,
      'Return: shared next step that respects both streams.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'kaitiakitanga',
    slug:'kaitiakitanga-guardianship',
    label:'Kaitiakitanga — Guardianship & Stewardship (Māori)',
    kind:'framework',
    categories:['ethics','governance','cultural frameworks'],
    tags:[
      'type:framework','topic:stewardship','topic:intergenerational','phase:plan','level:intermediate',
      'use:ai-governance','use:impact-assessment'
    ],
    use_cases:[
      'assess long-term impacts and duties of care',
      'plan safeguards for taonga (valued things)',
      'design community accountability'
    ],
    boosters:[
      'Add an intergenerational horizon (e.g., 25–50 years).',
      'Name kaitiaki roles and escalation paths.'
    ],
    definition:'A stewardship lens that emphasizes protection of valued things (taonga), obligations to community, and long-term balance.',
    help:'Map impacts, duties, and guardianship actions.',
    fields:[
      { key:'taonga',      label:'What are we safeguarding (taonga)?', type:'textarea' },
      { key:'stakeholders',label:'Affected people/places (one per line)', type:'textarea' },
      { key:'impacts',     label:'Potential impacts (near/long term)', type:'textarea' },
      { key:'principles',  label:'Guardianship principles/policies', type:'textarea' },
      { key:'actions',     label:'Actions & accountability', type:'textarea' }
    ],
    template:({taonga,stakeholders,impacts,principles,actions,ctx})=>[
      'Apply Kaitiakitanga (guardianship).',
      ctx && `Context: ${ctx}`,
      taonga && `Taonga:\n${taonga}`,
      stakeholders && ('Stakeholders:\n' + String(stakeholders).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      impacts && `Impacts:\n${impacts}`,
      principles && `Principles/policies:\n${principles}`,
      actions && `Actions & accountability:\n${actions}`,
      'End with: intergenerational check and reporting cadence.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'kansei_engineering',
    slug:'kansei-engineering',
    label:'Kansei Engineering (Emotion→Design Mapping)',
    kind:'framework',
    categories:['design','research','analysis frameworks'],
    tags:[
      'type:framework','topic:emotion-design','phase:design','level:intermediate',
      'use:feature-mapping','use:experience-goals'
    ],
    use_cases:[
      'translate target feelings into design parameters',
      'build a testable emotion→stimulus map',
      'prioritize features by affective impact'
    ],
    boosters:[
      'Pick ≤5 emotion words and operationalize each with observable cues.',
      'Plan a small test to validate the mapping.'
    ],
    definition:'A method to connect desired emotional responses with concrete design attributes.',
    help:'Define emotion goals; map to stimuli/features; plan validation.',
    fields:[
      { key:'emotions', label:'Target emotion words (one per line)', type:'textarea', ph:'Calm\nTrust\nExcited' },
      { key:'stimuli',  label:'Design stimuli/features (one per line)', type:'textarea', ph:'Color palette…\nMicrocopy tone…\nLatency…' },
      { key:'mapping',  label:'Emotion→Feature hypotheses', type:'textarea', ph:'Which feature drives which feeling, and why.' },
      { key:'test',     label:'Validation plan', type:'textarea', ph:'Method, sample, success criteria.' }
    ],
    template:({emotions,stimuli,mapping,test,ctx})=>[
      'Use Kansei Engineering to map emotion goals to design features.',
      ctx && `Context: ${ctx}`,
      emotions && `Emotions:\n${emotions}`,
      stimuli && `Stimuli/features:\n${stimuli}`,
      mapping && `Hypothesized mapping:\n${mapping}`,
      test && `Validation plan:\n${test}`,
      'Output: prioritized features with expected affect and a test plan.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'kepner_tregoe',
    slug:'kepner-tregoe-psdm',
    label:'Kepner–Tregoe (Situation–Problem–Decision–Potential Problem)',
    kind:'framework',
    categories:['decision','quality','operations'],
    tags:[
      'type:framework','topic:psdm','phase:plan','level:intermediate',
      'use:option-selection','use:risk-management'
    ],
    use_cases:[
      'separate problem analysis from decision analysis',
      'pick criteria and evaluate alternatives',
      'anticipate downstream risks'
    ],
    boosters:[
      'Weight criteria explicitly; show score math simply.',
      'List preventive and contingent actions for top risks.'
    ],
    definition:'A structured sequence for situation appraisal, problem analysis, decision analysis, and potential-problem analysis.',
    help:'Fill each stage concisely; end with a decision record.',
    fields:[
      { key:'situation', label:'Situation appraisal', type:'textarea' },
      { key:'problem',   label:'Problem analysis (is/is not, specs)', type:'textarea' },
      { key:'decision',  label:'Decision analysis (criteria, options)', type:'textarea' },
      { key:'potential', label:'Potential-problem analysis (risks)', type:'textarea' }
    ],
    template:({situation,problem,decision,potential,ctx})=>[
      'Apply Kepner–Tregoe.',
      ctx && `Context: ${ctx}`,
      situation && `Situation:\n${situation}`,
      problem && `Problem analysis:\n${problem}`,
      decision && `Decision analysis:\n${decision}`,
      potential && `Potential-problem analysis:\n${potential}`,
      'Close with: chosen option, justification, and next actions.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'kipling_5w1h',
    slug:'five-w-one-h-kipling',
    label:'5W1H — Who · What · Where · When · Why · How',
    kind:'framework',
    categories:['analysis frameworks','prompt development techniques'],
    tags:[
      'type:framework','topic:clarification','phase:compose','level:beginner',
      'use:requirements','use:prompt-scoping'
    ],
    use_cases:[
      'clarify task requirements',
      'scope a prompt before execution',
      'capture acceptance criteria'
    ],
    boosters:[
      'Answer each element with one crisp, testable line.',
      'Add a “not-in-scope” line after How.'
    ],
    definition:'A universal clarifying scaffold that forces six essential answers before action.',
    help:'Fill each W/H succinctly; keep to one line each.',
    fields:[
      { key:'who',   label:'Who', type:'text', ph:'Audience/persona/owner' },
      { key:'what',  label:'What', type:'text', ph:'Desired outcome or artifact' },
      { key:'where', label:'Where', type:'text', ph:'Channel/place/context' },
      { key:'when',  label:'When', type:'text', ph:'Deadline/cadence/timebox' },
      { key:'why',   label:'Why', type:'text', ph:'Purpose/impact' },
      { key:'how',   label:'How', type:'textarea', ph:'Approach, resources, constraints' },
      { key:'not',   label:'Not in scope (optional)', type:'textarea', ph:'Exclusions/anti-goals' }
    ],
    template:({who,what,where,when,why,how,not,ctx})=>[
      'Use 5W1H to pin down scope.',
      ctx && `Context: ${ctx}`,
      who && `Who: ${who}`,
      what && `What: ${what}`,
      where && `Where: ${where}`,
      when && `When: ${when}`,
      why && `Why: ${why}`,
      how && `How:\n${how}`,
      not && `Not in scope:\n${not}`,
      'Return: a one-paragraph plan derived from the answers.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'maslaha_public_interest',
    slug:'maslaha-public-interest-reasoning',
    label:'Maṣlaḥa — Public Interest Reasoning (Islamic Ethics)',
    kind:'framework',
    categories:['ethics','governance','cultural frameworks'],
    tags:[
      'type:framework','topic:public-interest','topic:harm-benefit','phase:plan','level:advanced',
      'use:policy','use:governance','use:risk-balancing'
    ],
    use_cases:[
      'weigh harms and benefits to the public',
      'craft proportionate, transparent justifications',
      'design exceptions and safeguards'
    ],
    boosters:[
      'Show explicit harm/benefit tradeoffs and the least-harm alternative.',
      'Document conditions/limits and a review cadence.'
    ],
    definition:'A normative lens that prioritizes public benefit and harm minimization with transparent justification.',
    help:'State the issue, stakeholders, harms/benefits, precedents, and your proportional ruling.',
    fields:[
      { key:'issue',      label:'Issue/decision', type:'textarea' },
      { key:'stakeholders',label:'Stakeholders (one per line)', type:'textarea' },
      { key:'harms',      label:'Harms/risks', type:'textarea' },
      { key:'benefits',   label:'Benefits', type:'textarea' },
      { key:'precedent',  label:'Precedents/principles', type:'textarea' },
      { key:'ruling',     label:'Proportional ruling/decision', type:'textarea' }
    ],
    template:({issue,stakeholders,harms,benefits,precedent,ruling,ctx})=>[
      'Apply Maṣlaḥa (public interest reasoning).',
      ctx && `Context: ${ctx}`,
      issue && `Issue:\n${issue}`,
      stakeholders && ('Stakeholders:\n' + String(stakeholders).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      harms && `Harms/risks:\n${harms}`,
      benefits && `Benefits:\n${benefits}`,
      precedent && `Precedents/principles:\n${precedent}`,
      ruling && `Proportional ruling:\n${ruling}`,
      'Include monitoring plan and appeal/override criteria.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'musyawarah_mufakat',
    slug:'musyawarah-mufakat-indonesia',
    label:'Musyawarah & Mufakat — Deliberation to Consensus (Indonesia)',
    kind:'framework',
    categories:['decision','facilitation','cultural frameworks'],
    tags:[
      'type:framework','topic:consensus','topic:deliberation','phase:decide','level:intermediate',
      'use:group-decisions','use:policy','use:community'
    ],
    use_cases:[
      'facilitate inclusive deliberation',
      'surface objections and modify options',
      'craft a consensus statement'
    ],
    boosters:[
      'Require an objection-handling pass before closing.',
      'Record the consensus statement and follow-up tasks.'
    ],
    definition:'A culturally grounded process emphasizing inclusive deliberation (musyawarah) culminating in consensus (mufakat).',
    help:'List participants, options, concerns; co-author a consensus statement.',
    fields:[
      { key:'issue',       label:'Issue/decision', type:'textarea' },
      { key:'participants',label:'Participants (one per line)', type:'textarea' },
      { key:'options',     label:'Options (one per line)', type:'textarea' },
      { key:'concerns',    label:'Concerns/objections (one per line)', type:'textarea' },
      { key:'consensus',   label:'Consensus statement (draft)', type:'textarea' },
      { key:'follow_up',   label:'Follow-up actions & owners', type:'textarea' }
    ],
    template:({issue,participants,options,concerns,consensus,follow_up,ctx})=>[
      'Run Musyawarah→Mufakat.',
      ctx && `Context: ${ctx}`,
      issue && `Issue:\n${issue}`,
      participants && ('Participants:\n' + String(participants).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      options && ('Options:\n' + String(options).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      concerns && ('Concerns:\n' + String(concerns).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      consensus && `Consensus statement (draft):\n${consensus}`,
      follow_up && `Follow-up:\n${follow_up}`,
      'Output: final consensus text + action list with owners/dates.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'naive_dialecticism',
    slug:'naive-dialecticism-east-asia',
    label:'Naïve Dialecticism (East Asian Holistic Reasoning)',
    kind:'framework',
    categories:['reasoning','philosophy','cultural frameworks'],
    tags:[
      'type:framework','topic:both-and','topic:contradiction','phase:explore','level:advanced',
      'use:paradox-framing','use:change-over-time'
    ],
    use_cases:[
      'embrace change and contradiction in planning',
      'craft both/and integrations',
      'generate harmony-seeking adjustments'
    ],
    boosters:[
      'Write an explicit “both can be true” statement for the core tension.',
      'Propose a small harmonizing step that reduces conflict.'
    ],
    definition:'A belief system that expects change, tolerates contradiction, and reasons holistically across context.',
    help:'Name poles, context factors, tensions, and harmony moves.',
    fields:[
      { key:'poles',     label:'Opposed poles (A vs. B)', type:'textarea', ph:'Efficiency vs. Quality…' },
      { key:'context',   label:'Context factors (one per line)', type:'textarea', ph:'Time horizon… Stakeholders…' },
      { key:'tensions',  label:'Areas of tension', type:'textarea' },
      { key:'harmony',   label:'Harmony-seeking moves', type:'textarea' },
      { key:'both_and',  label:'Both-and statement', type:'textarea' }
    ],
    template:({poles,context,tensions,harmony,both_and,ctx})=>[
      'Apply Naïve Dialecticism.',
      ctx && `Context: ${ctx}`,
      poles && `Poles:\n${poles}`,
      context && ('Context factors:\n' + String(context).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      tensions && `Tensions:\n${tensions}`,
      harmony && `Harmony moves:\n${harmony}`,
      both_and && `Both-and statement:\n${both_and}`,
      'End with a “change over time” note and a follow-up review date.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'nyaya_syllogism',
    slug:'nyaya-five-member-syllogism',
    label:'Nyāya — Five-Member Syllogism',
    kind:'framework',
    categories:['reasoning','philosophy','cultural frameworks'],
    tags:[
      'type:framework','topic:logic','phase:structure','level:intermediate',
      'use:argumentation','use:explain-like-i\'m-5'
    ],
    use_cases:[
      'structure explanations with example and application',
      'justify conclusions with explicit inference steps'
    ],
    boosters:[
      'Keep each member one line.',
      'Choose a vivid, relevant example.'
    ],
    definition:'Classical Indian argument form: Proposition, Reason, Example, Application, Conclusion.',
    help:'Fill each member; keep language crisp.',
    fields:[
      { key:'proposition', label:'Proposition (pratijñā)', type:'text' },
      { key:'reason',      label:'Reason (hetu)', type:'textarea' },
      { key:'example',     label:'Example (udāharaṇa)', type:'textarea' },
      { key:'application', label:'Application (upanaya)', type:'textarea' },
      { key:'conclusion',  label:'Conclusion (nigamana)', type:'textarea' }
    ],
    template:({proposition,reason,example,application,conclusion,ctx})=>[
      'Use the Nyāya five-member syllogism.',
      ctx && `Context: ${ctx}`,
      proposition && `Proposition: ${proposition}`,
      reason && `Reason: ${reason}`,
      example && `Example: ${example}`,
      application && `Application: ${application}`,
      conclusion && `Conclusion: ${conclusion}`
    ].filter(Boolean).join('\n')
  },

  {
  id:'pdca_cycle',
  slug:'pdca-deming-cycle',
  label:'PDCA — Plan · Do · Check · Act',
  kind:'framework',
  categories:['quality','operations','education'],
  tags:[
    'type:framework','topic:iteration','phase:iterate','level:beginner',
    'use:continuous-improvement','use:lesson-planning'
  ],
  use_cases:[
    'design small learning or improvement loops',
    'close the feedback loop on changes'
  ],
  boosters:[
    'Timebox each loop and define a “check” metric.',
    'Always propose the next PDCA cycle.'
  ],
  definition:'A continuous improvement loop for planning, executing, checking outcomes, and acting on learnings.',
  help:'Keep cycles tight; pick a single metric for Check.',
  fields:[
    { key:'plan',  label:'Plan',  type:'textarea', ph:'Hypothesis; steps; metric.' },
    { key:'do',    label:'Do',    type:'textarea', ph:'Execute; note deviations.' },
    { key:'check', label:'Check', type:'textarea', ph:'Results vs. metric; surprises.' },
    { key:'act',   label:'Act',   type:'textarea', ph:'Adjustments; next cycle.' }
  ],
  template: ({ plan, do: do_step, check, act, ctx }) => [
    'Run a PDCA loop.',
    ctx && `Context: ${ctx}`,
    plan && `Plan:\n${plan}`,
    do_step && `Do:\n${do_step}`,
    check && `Check:\n${check}`,
    act && `Act:\n${act}`,
    'End with a scheduled next cycle.'
  ].filter(Boolean).join('\n')
},

  {
    id:'pramana',
    slug:'pramana-means-of-knowledge',
    label:'Pramāṇa — Means of Knowledge',
    kind:'framework',
    categories:['reasoning','research','philosophy'],
    tags:[
      'type:framework','topic:evidence','phase:validate','level:advanced',
      'use:source-triangulation','use:epistemic-audit'
    ],
    use_cases:[
      'audit evidence types supporting a claim',
      'decide what new evidence would change the answer'
    ],
    boosters:[
      'Name the weakest link and how to strengthen it.',
      'Add a “what would falsify this?” line.'
    ],
    definition:'Classical Indian epistemology enumerating means of knowledge (e.g., perception, inference, analogy, testimony, postulation, non-apprehension).',
    help:'Select applicable pramāṇas for the claim; summarize their strength.',
    fields:[
      { key:'claim',   label:'Claim under review', type:'textarea' },
      { key:'pramanas',label:'Applicable pramāṇas (one per line)', type:'textarea', ph:'Perception…\nInference…\nAnalogy…\nTestimony…\nPostulation…\nNon-apprehension…' },
      { key:'evidence',label:'Evidence summary', type:'textarea' },
      { key:'gaps',    label:'Gaps/uncertainties', type:'textarea' }
    ],
    template:({claim,pramanas,evidence,gaps,ctx})=>[
      'Run a Pramāṇa evidence audit.',
      ctx && `Context: ${ctx}`,
      claim && `Claim:\n${claim}`,
      pramanas && ('Means of knowledge:\n' + String(pramanas).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      evidence && `Evidence summary:\n${evidence}`,
      gaps && `Gaps/uncertainties:\n${gaps}`,
      'Close with: additional evidence that would most change the conclusion.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'qiyas_analogy',
    slug:'qiyas-analogical-reasoning',
    label:'Qiyās — Analogical Reasoning (Islamic Jurisprudence)',
    kind:'framework',
    categories:['reasoning','philosophy','cultural frameworks'],
    tags:[
      'type:framework','topic:analogy','phase:apply','level:advanced',
      'use:policy-analogy','use:case-based-reasoning'
    ],
    use_cases:[
      'extend rulings by identifying effective cause',
      'structure analogies between known and novel cases'
    ],
    boosters:[
      'Make the effective cause explicit and test for relevant differences.',
      'State conditions that would break the analogy.'
    ],
    definition:'Infer a ruling for a new case by analogy to a known case that shares the effective cause.',
    help:'Fill original case, new case, effective cause, ruling, and differences.',
    fields:[
      { key:'original',   label:'Original case (aṣl)', type:'textarea' },
      { key:'newcase',    label:'New case (far‘)', type:'textarea' },
      { key:'cause',      label:'Effective cause (ʿillah)', type:'textarea' },
      { key:'ruling',     label:'Ruling to extend (ḥukm)', type:'textarea' },
      { key:'differences',label:'Relevant differences/limits', type:'textarea' }
    ],
    template:({original,newcase,cause,ruling,differences,ctx})=>[
      'Apply Qiyās (analogical reasoning).',
      ctx && `Context: ${ctx}`,
      original && `Original case:\n${original}`,
      newcase && `New case:\n${newcase}`,
      cause && `Effective cause:\n${cause}`,
      ruling && `Proposed ruling:\n${ruling}`,
      differences && `Relevant differences:\n${differences}`,
      'Add a test or precedent that could invalidate the analogy.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'rapid_decision_rights',
    slug:'rapid-decision-rights',
    label:'RAPID — Recommend · Agree · Perform · Input · Decide',
    kind:'framework',
    categories:['decision','operations','governance'],
    tags:[
      'type:framework','topic:decision-rights','phase:plan','level:beginner',
      'use:roles-responsibility','use:decision-record'
    ],
    use_cases:[
      'clarify who does what in a decision',
      'speed up approvals by defining roles'
    ],
    boosters:[
      'Name individuals by role; include dates and escalation path.',
      'Add “disagree and commit” rule where needed.'
    ],
    definition:'A roles framework that assigns decision rights and contributions to avoid bottlenecks.',
    help:'Fill each letter with names and responsibilities.',
    fields:[
      { key:'recommend', label:'Recommend (R)', type:'textarea', ph:'Propose options with rationale.' },
      { key:'agree',     label:'Agree (A)', type:'textarea', ph:'Those who must sign off.' },
      { key:'perform',   label:'Perform (P)', type:'textarea', ph:'Owners who will execute.' },
      { key:'input',     label:'Input (I)', type:'textarea', ph:'Who supplies facts/perspectives.' },
      { key:'decide',    label:'Decide (D)', type:'textarea', ph:'Final decision authority.' },
      { key:'timeline',  label:'Timeline & checkpoints', type:'textarea' }
    ],
    template:({recommend,agree,perform,input,decide,timeline,ctx})=>[
      'Set decision roles with RAPID.',
      ctx && `Context: ${ctx}`,
      recommend && `Recommend (R):\n${recommend}`,
      agree && `Agree (A):\n${agree}`,
      perform && `Perform (P):\n${perform}`,
      input && `Input (I):\n${input}`,
      decide && `Decide (D):\n${decide}`,
      timeline && `Timeline:\n${timeline}`,
      'Return a one-line decision statement and next steps.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'scientific_method',
    slug:'scientific-method',
    label:'Scientific Method — Question · Hypothesis · Method · Data · Analysis · Conclusion',
    kind:'framework',
    categories:['research','education','reasoning'],
    tags:[
      'type:framework','topic:experiment','phase:test','level:beginner',
      'use:ab-testing','use:literature-replication'
    ],
    use_cases:[
      'design an experiment or A/B test',
      'replicate a result with clear hypotheses'
    ],
    boosters:[
      'Include falsifiable predictions and a pre-commit metric.',
      'Plan replication or follow-up.'
    ],
    definition:'A structured cycle for investigating questions via testable hypotheses and evidence.',
    help:'Fill each step; specify variables, controls, and success criteria.',
    fields:[
      { key:'question',  label:'Research question', type:'textarea' },
      { key:'hypothesis',label:'Hypothesis (falsifiable)', type:'textarea' },
      { key:'method',    label:'Method / protocol', type:'textarea' },
      { key:'data',      label:'Data to collect', type:'textarea' },
      { key:'analysis',  label:'Analysis plan', type:'textarea' },
      { key:'conclusion',label:'Expected interpretation / decision rule', type:'textarea' }
    ],
    template:({question,hypothesis,method,data,analysis,conclusion,ctx})=>[
      'Run a Scientific Method plan.',
      ctx && `Context: ${ctx}`,
      question && `Question:\n${question}`,
      hypothesis && `Hypothesis (falsifiable):\n${hypothesis}`,
      method && `Method:\n${method}`,
      data && `Data:\n${data}`,
      analysis && `Analysis plan:\n${analysis}`,
      conclusion && `Decision rule / conclusion:\n${conclusion}`
    ].filter(Boolean).join('\n')
  },

  {
    id:'scqa',
    slug:'scqa-situation-complication-question-answer',
    label:'SCQA — Situation · Complication · Question · Answer',
    kind:'framework',
    categories:['storytelling frameworks','analysis frameworks'],
    tags:[
      'type:framework','topic:structure','phase:compose','level:beginner',
      'use:briefs','use:memos','use:presentations'
    ],
    use_cases:[
      'structure memos or executive summaries',
      'turn research into a compelling arc'
    ],
    boosters:[
      'Keep each section to 1–3 sentences.',
      'End with one explicit decision or ask.'
    ],
    definition:'A narrative logic that sets context, introduces the tension, asks the key question, and delivers the answer.',
    help:'Fill each part briefly; prefer high-signal prose.',
    fields:[
      { key:'situation',    label:'Situation', type:'textarea' },
      { key:'complication', label:'Complication', type:'textarea' },
      { key:'question',     label:'Key question', type:'text' },
      { key:'answer',       label:'Answer', type:'textarea' }
    ],
    template:({situation,complication,question,answer,ctx})=>[
      'Use SCQA to structure the message.',
      ctx && `Context: ${ctx}`,
      situation && `Situation:\n${situation}`,
      complication && `Complication:\n${complication}`,
      question && `Question:\n${question}`,
      answer && `Answer:\n${answer}`
    ].filter(Boolean).join('\n')
  },

  {
    id:'sentipensar',
    slug:'sentipensar-thinking-feeling',
    label:'Sentipensar — Thinking-Feeling Integration (Latin America)',
    kind:'framework',
    categories:['reasoning','design','cultural frameworks'],
    tags:[
      'type:framework','topic:affect-cognition','phase:plan','level:intermediate',
      'use:research-synthesis','use:ethics','use:co-design'
    ],
    use_cases:[
      'integrate analytic and experiential knowledge',
      'design with empathy and evidence side-by-side'
    ],
    boosters:[
      'Document divergences between data and felt sense.',
      'End with a decision that honors both.'
    ],
    definition:'A method to braid rational analysis with lived experience and emotion for wiser action.',
    help:'Capture analytic facts and felt perspectives; reconcile deliberately.',
    fields:[
      { key:'analysis',   label:'Rational analysis (facts/metrics)', type:'textarea' },
      { key:'felt',       label:'Felt sense (stories/experiences)', type:'textarea' },
      { key:'divergence', label:'Where they diverge', type:'textarea' },
      { key:'convergence',label:'How to converge responsibly', type:'textarea' }
    ],
    template:({analysis,felt,divergence,convergence,ctx})=>[
      'Apply Sentipensar (thinking-feeling integration).',
      ctx && `Context: ${ctx}`,
      analysis && `Analysis:\n${analysis}`,
      felt && `Felt sense:\n${felt}`,
      divergence && `Divergences:\n${divergence}`,
      convergence && `Convergence plan:\n${convergence}`,
      'Return: integrated decision + small experiment to validate.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'talanoa_dialogue',
    slug:'talanoa-dialogue',
    label:'Talanoa Dialogue (Pacific)',
    kind:'framework',
    categories:['facilitation','cultural frameworks','decision'],
    tags:[
      'type:framework','topic:story-sharing','topic:trust','phase:explore','level:beginner',
      'use:conflict-resolution','use:policy-dialogue'
    ],
    use_cases:[
      'build empathy and trust before negotiating',
      'surface shared issues via story-first dialogue'
    ],
    boosters:[
      'Open with story; only then move to issues and solutions.',
      'End with clear commitments and owners.'
    ],
    definition:'An inclusive, story-led dialogue method emphasizing empathy, relationship, and consensus building.',
    help:'Capture stories, shared issues, co-created solutions, and commitments.',
    fields:[
      { key:'stories',      label:'Stories (what matters, in participants’ words)', type:'textarea' },
      { key:'shared',       label:'Shared issues (one per line)', type:'textarea' },
      { key:'solutions',    label:'Co-created solutions', type:'textarea' },
      { key:'commitments',  label:'Commitments & owners', type:'textarea' }
    ],
    template:({stories,shared,solutions,commitments,ctx})=>[
      'Run a Talanoa-style dialogue.',
      ctx && `Context: ${ctx}`,
      stories && `Stories:\n${stories}`,
      shared && ('Shared issues:\n' + String(shared).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')),
      solutions && `Co-created solutions:\n${solutions}`,
      commitments && `Commitments & owners:\n${commitments}`
    ].filter(Boolean).join('\n')
  },

  {
    id:'tote',
    slug:'tote-test-operate-test-exit',
    label:'TOTE — Test · Operate · Test · Exit',
    kind:'pattern',
    categories:['planning','cognitive models'],
    tags:[
      'type:pattern','topic:control-loop','phase:iterate','level:beginner',
      'use:rapid-iteration','use:prompt-tuning'
    ],
    use_cases:[
      'build a minimal control loop for a task',
      'decide when to stop iterating'
    ],
    boosters:[
      'Define exit criteria upfront (avoid endless loops).',
      'Log each test quickly with pass/fail.'
    ],
    definition:'A simple cybernetic loop: test the state, operate to change it, test again, then exit when criteria are met.',
    help:'State tests, operations, and exit rule before starting.',
    fields:[
      { key:'test',   label:'Initial test (state/criteria)', type:'textarea' },
      { key:'operate',label:'Operate (action)', type:'textarea' },
      { key:'retest', label:'Re-test (check)', type:'textarea' },
      { key:'exit',   label:'Exit criteria', type:'textarea' }
    ],
    template:({test,operate,retest,exit,ctx})=>[
      'Use TOTE for a tight feedback loop.',
      ctx && `Context: ${ctx}`,
      test && `Test:\n${test}`,
      operate && `Operate:\n${operate}`,
      retest && `Re-test:\n${retest}`,
      exit && `Exit criteria:\n${exit}`
    ].filter(Boolean).join('\n')
  },

  {
    id:'vroom_yetton',
    slug:'vroom-yetton-jago-decision',
    label:'Vroom–Yetton–Jago Decision Model',
    kind:'framework',
    categories:['decision','leadership','operations'],
    tags:[
      'type:framework','topic:leadership','topic:participation','phase:plan','level:intermediate',
      'use:meeting-design','use:time-critical-decisions'
    ],
    use_cases:[
      'choose an autocratic, consultative, or group style',
      'balance decision quality vs. speed and commitment'
    ],
    boosters:[
      'Answer each diagnostic question explicitly; show the path to the style.',
      'Note risks if a faster/slower style is chosen.'
    ],
    definition:'A diagnostic tree to select the appropriate decision style given quality, expertise, commitment, and time constraints.',
    help:'Fill the diagnostics; get a recommended style and rationale.',
    fields:[
      { key:'problem',   label:'Problem/decision', type:'textarea' },
      { key:'quality',   label:'Importance of decision quality', type:'text', ph:'low | medium | high' },
      { key:'expertise', label:'Leader expertise on this problem', type:'text', ph:'low | medium | high' },
      { key:'commitment',label:'Need for team commitment', type:'text', ph:'low | medium | high' },
      { key:'time',      label:'Time constraints', type:'text', ph:'tight | normal' }
    ],
    template:({problem,quality,expertise,commitment,time,ctx})=>[
      'Use the Vroom–Yetton–Jago decision style diagnostic.',
      ctx && `Context: ${ctx}`,
      problem && `Problem:\n${problem}`,
      quality && `Quality importance: ${quality}`,
      expertise && `Leader expertise: ${expertise}`,
      commitment && `Team commitment needed: ${commitment}`,
      time && `Time constraints: ${time}`,
      'Return: recommended style (AI, AII, CI, CII, GII) with rationale and next step.'
    ].filter(Boolean).join('\n')
  },

  {
    id:'zhongyong_mean',
    slug:'zhongyong-doctrine-of-the-mean',
    label:'Zhongyong — Doctrine of the Mean (Confucian Moderation)',
    kind:'framework',
    categories:['ethics','reasoning','cultural frameworks'],
    tags:[
      'type:framework','topic:moderation','topic:context','phase:plan','level:intermediate',
      'use:policy-guardrails','use:communication'
    ],
    use_cases:[
      'avoid extremes by calibrating to context',
      'craft proportionate responses and tone'
    ],
    boosters:[
      'Name the two extremes explicitly, then the principled middle.',
      'Set acceptance criteria for “balanced enough”.'
    ],
    definition:'A practical method for finding a context-appropriate middle path between harmful extremes.',
    help:'List extremes, principles guiding the mean, adjustment steps, and acceptance criteria.',
    fields:[
      { key:'extremes',   label:'Harmful extremes (A and B)', type:'textarea' },
      { key:'principles', label:'Principles for the mean', type:'textarea' },
      { key:'adjust',     label:'Adjustment steps', type:'textarea' },
      { key:'criteria',   label:'Acceptance criteria', type:'textarea' }
    ],
    template:({extremes,principles,adjust,criteria,ctx})=>[
      'Apply Zhongyong (context-sensitive moderation).',
      ctx && `Context: ${ctx}`,
      extremes && `Extremes:\n${extremes}`,
      principles && `Principles:\n${principles}`,
      adjust && `Adjustment steps:\n${adjust}`,
      criteria && `Acceptance criteria:\n${criteria}`,
      'Return: balanced recommendation + conditions that would shift it.'
    ].filter(Boolean).join('\n')
  },
  
  {
  id: 'moscow',
  slug: 'moscow-prioritization',
  label: 'MoSCoW — Must · Should · Could · Won’t',
  kind: 'framework',
  categories: ['prioritization', 'planning', 'product management'],
  tags: [
    'type:framework','topic:prioritization','topic:requirements','level:beginner',
    'use:project-planning','use:backlog-refinement','use:scope-management'
  ],
  use_cases: [
    'prioritize product features or requirements',
    'ux research',
    'clarify scope during project planning',
    'communicate priorities to stakeholders'
  ],
  boosters: [
    'Keep each category concise (1–2 sentences per item).',
    'Explicitly state why each item is in its category to prevent scope creep.'
  ],
  definition: 'A prioritization method that groups requirements into Must have, Should have, Could have, and Won’t have for a project or release.',
  help: 'List tasks or features under each category. The model will produce a clear prioritization summary.',
  fields: [
    { key: 'must', label: 'Must have (critical)', type: 'textarea',
      desc: 'Essential items without which the project fails.',
      ph: 'e.g., Secure login system; Payment processing' },
    { key: 'should', label: 'Should have (important but not critical)', type: 'textarea',
      desc: 'High-value items that can be deferred if necessary.',
      ph: 'e.g., Multi-language support; Advanced analytics' },
    { key: 'could', label: 'Could have (nice-to-have)', type: 'textarea',
      desc: 'Desirable features to include if time/resources allow.',
      ph: 'e.g., Dark mode; Customizable dashboards' },
    { key: 'wont', label: 'Won’t have (this time)', type: 'textarea',
      desc: 'Items explicitly excluded to manage scope.',
      ph: 'e.g., Virtual reality interface; Blockchain integration' }
  ],
  template: ({ must, should, could, wont, ctx, audience, style, tone }) => [
    'Apply the MoSCoW method to prioritize items.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    must && ('Must have:\n' + must),
    should && ('Should have:\n' + should),
    could && ('Could have:\n' + could),
    wont && ('Won’t have:\n' + wont),
    'Output:\n1) List by MoSCoW categories\n2) Short rationale for each item\n3) Final scope note (clarify exclusions)'
  ].filter(Boolean).join('\n')
},

{
  id: 'kano_model',
  slug: 'kano-model',
  label: 'Kano Model — Must-be, Performance, Delighters',
  kind: 'framework',
  categories: ['prioritization', 'product management', 'ux'],
  tags: [
    'type:framework', 'topic:prioritization', 'topic:user-satisfaction',
    'use:backlog-refinement', 'use:research-synthesis'
  ],
  use_cases: [
    'separate basics from delighters',
    'decide what prevents complaints vs. what creates delight',
    'facilitate feature trade-offs in workshops'
  ],
  boosters: [
    'Add 1–2 sentence rationale per item.',
    'Note any risks or assumptions after each list.'
  ],
  definition: 'Kano groups features by how they affect user satisfaction: Must-be, Performance, Delighters, and Indifferent/Reverse.',
  help: 'List features under each bucket. Keep entries short; include why each belongs there.',
  fields: [
    { key: 'must_be', label: 'Must-be (expected basics)', type: 'textarea', ph: 'e.g., Reliable login; Basic search' },
    { key: 'performance', label: 'Performance (more is better)', type: 'textarea', ph: 'e.g., Page load speed; Reporting depth' },
    { key: 'delighters', label: 'Delighters (unexpected extras)', type: 'textarea', ph: 'e.g., Auto-summaries; Magic import' },
    { key: 'indifferent', label: 'Indifferent / Reverse', type: 'textarea', ph: 'e.g., Flashy splash screen; Noisy confetti' },
    { key: 'notes', label: 'Notes (optional)', type: 'textarea', ph: 'Research sources, risks, assumptions' }
  ],
  template: ({ must_be, performance, delighters, indifferent, notes, usecase: ctx, audience, style, tone }) => [
    'Apply the Kano Model to categorize features by user satisfaction impact.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    must_be && ('Must-be (expected basics):\n' + must_be),
    performance && ('Performance (more is better):\n' + performance),
    delighters && ('Delighters (unexpected extras):\n' + delighters),
    indifferent && ('Indifferent / Reverse:\n' + indifferent),
    notes && ('Notes:\n' + notes),
    'Output:\n1) Clean lists per bucket with a 1–2 sentence rationale each\n2) Brief risks/assumptions\n3) Final recommendation: what to ship now vs. later'
  ].filter(Boolean).join('\n')
},

{
  id: 'rice_scoring',
  slug: 'rice-scoring',
  label: 'RICE — Reach × Impact × Confidence ÷ Effort',
  kind: 'framework',
  categories: ['prioritization', 'product management'],
  tags: [
    'type:framework','topic:scoring','use:backlog-prioritization','use:roadmap'
  ],
  use_cases: ['rank features quantitatively','allocate scarce resources'],
  boosters: ['Show the formula and numbers; round to 2 decimals.'],
  definition: 'RICE prioritizes by Reach, Impact, Confidence, and Effort. Score = (R × I × C) / E.',
  help: 'Enter the estimates. The prompt will compute and explain the score.',
  fields: [
    { key: 'item', label: 'Feature / item name', type: 'text', ph: 'e.g., In-app onboarding checklist' },
    { key: 'reach', label: 'Reach (users / period)', type: 'text', ph: 'e.g., 1200 / month' },
    { key: 'impact', label: 'Impact (e.g., 0.25/0.5/1/2/3)', type: 'text', ph: 'e.g., 1.5' },
    { key: 'confidence', label: 'Confidence (0–1)', type: 'text', ph: 'e.g., 0.7' },
    { key: 'effort', label: 'Effort (person-months)', type: 'text', ph: 'e.g., 2.5' },
    { key: 'notes', label: 'Notes (assumptions, caveats)', type: 'textarea', ph: 'Surveys n=312; data last quarter' }
  ],
  template: (f) => {
    const toN = x => {
      const n = Number(String(x||'').replace(/[^0-9.\-]/g,''));
      return Number.isFinite(n) ? n : NaN;
    };
    const R = toN(f.reach), I = toN(f.impact), C = toN(f.confidence), E = toN(f.effort);
    const score = (Number.isFinite(R) && Number.isFinite(I) && Number.isFinite(C) && Number.isFinite(E) && E>0)
      ? ((R*I*C)/E) : null;
    const fmt = n => (n==null ? '' : n.toFixed(2));
    return [
      'Prioritize using RICE (Reach × Impact × Confidence ÷ Effort).',
      f.usecase && `Context: ${f.usecase}`,
      f.audience && `Audience: ${f.audience}`,
      f.style && `Style: ${f.style}`,
      f.tone && `Tone: ${f.tone}`,
      f.item && `Item: ${f.item}`,
      (f.reach||f.impact||f.confidence||f.effort) && `Estimates:\nReach: ${f.reach}\nImpact: ${f.impact}\nConfidence: ${f.confidence}\nEffort: ${f.effort}`,
      (score!=null) && `RICE Score: ${fmt(score)}`,
      f.notes && ('Notes:\n' + f.notes),
      'Output:\n1) RICE breakdown + computed score\n2) Rationale for each estimate\n3) Sensitivity: how score changes if E↑ or C↓\n4) Recommendation: ship/next/park'
    ].filter(Boolean).join('\n');
  }
},

{
  id: 'ice_scoring',
  slug: 'ice-scoring',
  label: 'ICE — Impact × Confidence × Ease',
  kind: 'framework',
  categories: ['prioritization', 'growth', 'experimentation'],
  tags: [
    'type:framework','topic:scoring','use:backlog-grooming','use:experiments'
  ],
  use_cases: ['fast triage of ideas','growth experiments','ops improvements'],
  boosters: ['Keep scales consistent (e.g., 1–10).'],
  definition: 'ICE is a lightweight scoring model: Impact × Confidence × Ease.',
  help: 'Use quick gut-checks for each dimension, then multiply.',
  fields: [
    { key: 'item', label: 'Idea / experiment', type: 'text', ph: 'e.g., Exit-intent survey' },
    { key: 'impact', label: 'Impact (1–10)', type: 'text', ph: 'e.g., 6' },
    { key: 'confidence', label: 'Confidence (1–10)', type: 'text', ph: 'e.g., 7' },
    { key: 'ease', label: 'Ease (1–10)', type: 'text', ph: 'e.g., 8' },
    { key: 'notes', label: 'Notes (optional)', type: 'textarea', ph: 'Risks, pre-requisites' }
  ],
  template: (f) => {
    const n = x => Number(String(x||'').replace(/[^0-9.\-]/g,'')); 
    const I = n(f.impact), C = n(f.confidence), E = n(f.ease);
    const score = (Number.isFinite(I)&&Number.isFinite(C)&&Number.isFinite(E)) ? (I*C*E) : null;
    return [
      'Score with ICE (Impact × Confidence × Ease).',
      f.usecase && `Context: ${f.usecase}`,
      f.item && `Item: ${f.item}`,
      (f.impact||f.confidence||f.ease) && `Estimates:\nImpact: ${f.impact}\nConfidence: ${f.confidence}\nEase: ${f.ease}`,
      (score!=null) && `ICE Score: ${score}`,
      f.notes && ('Notes:\n' + f.notes),
      'Output:\n1) ICE breakdown + score\n2) Rationale + quick risks\n3) Recommendation + next step'
    ].filter(Boolean).join('\n');
  }
},

{
  id: 'value_effort_matrix',
  slug: 'value-effort-matrix',
  label: 'Value vs. Effort — 2×2 Quick Wins Matrix',
  kind: 'framework',
  categories: ['prioritization', 'workshops', 'product management'],
  tags: [
    'type:framework','topic:matrix','use:stakeholder-workshop','use:portfolio-triage'
  ],
  use_cases: ['visualize trade-offs','identify quick wins','kill time sinks'],
  boosters: ['Sort final list by “Quick Wins” first.'],
  definition: 'Plot backlog items on High/Low Value vs. High/Low Effort. Prioritize Quick Wins.',
  help: 'List items (one per line). If you have rough scores, include them like "Item | value | effort".',
  fields: [
    { key: 'items', label: 'Items (one per line)', type: 'textarea', ph: 'Feature A | 5 | 2\nFeature B | 2 | 5\nFeature C' },
    { key: 'scales', label: 'Scale hint (optional)', type: 'text', ph: 'Value & Effort scale: 1 (low) – 5 (high)' },
    { key: 'notes', label: 'Notes (optional)', type: 'textarea', ph: 'Constraints, deadlines, dependencies' }
  ],
  template: ({ items, scales, notes, usecase: ctx, audience, style, tone }) => [
    'Classify backlog with a Value vs. Effort 2×2.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    items && ('Items:\n' + items),
    scales && ('Scale:\n' + scales),
    notes && ('Notes:\n' + notes),
    'Output:\n1) Quadrants: Quick Wins (High V, Low E), Major Projects (High V, High E), Fill-ins (Low V, Low E), Time Sinks (Low V, High E)\n2) Rationale per placement\n3) Top 5 action list with owners & next step'
  ].filter(Boolean).join('\n')
},

{
  id: 'wsjf',
  slug: 'wsjf-weighted-shortest-job-first',
  label: 'WSJF — (Business Value + Time Criticality + Risk Reduction) ÷ Job Size',
  kind: 'framework',
  categories: ['agile', 'prioritization', 'safe'],
  tags: [
    'type:framework','topic:wsjf','use:program-increment','use:flow-optimization'
  ],
  use_cases: ['maximize economic throughput','PI planning in SAFe'],
  boosters: ['Call out assumptions; avoid gaming Job Size.'],
  definition: 'WSJF prioritizes by Cost of Delay over Job Size. CoD ≈ Business Value + Time Criticality + Risk Reduction.',
  help: 'Enter relative scores (e.g., Fibonacci or 1–10).',
  fields: [
    { key: 'item', label: 'Job / feature', type: 'text', ph: 'e.g., Payment retries' },
    { key: 'business_value', label: 'Business Value', type: 'text', ph: 'e.g., 8' },
    { key: 'time_criticality', label: 'Time Criticality', type: 'text', ph: 'e.g., 5' },
    { key: 'risk_reduction', label: 'Risk Reduction / Opportunity Enablement', type: 'text', ph: 'e.g., 3' },
    { key: 'job_size', label: 'Job Size', type: 'text', ph: 'e.g., 5' },
    { key: 'notes', label: 'Notes (optional)', type: 'textarea', ph: 'Dependencies, sequencing, WSJF ties' }
  ],
  template: (f) => {
    const n = x => Number(String(x||'').replace(/[^0-9.\-]/g,''));
    const BV = n(f.business_value), TC = n(f.time_criticality), RR = n(f.risk_reduction), JS = n(f.job_size);
    const CoD = (BV||0) + (TC||0) + (RR||0);
    const score = (Number.isFinite(JS) && JS>0) ? (CoD/JS) : null;
    const fmt = s => (s==null ? '' : s.toFixed(2));
    return [
      'Prioritize with WSJF = (Business Value + Time Criticality + Risk Reduction) ÷ Job Size.',
      f.usecase && `Context: ${f.usecase}`,
      f.item && `Item: ${f.item}`,
      `Inputs:\nBusiness Value: ${f.business_value}\nTime Criticality: ${f.time_criticality}\nRisk Reduction: ${f.risk_reduction}\nJob Size: ${f.job_size}`,
      `Cost of Delay (approx.): ${CoD}`,
      (score!=null) && `WSJF Score: ${fmt(score)}`,
      f.notes && ('Notes:\n' + f.notes),
      'Output:\n1) WSJF breakdown + score\n2) Rationale & risks\n3) Sequencing recommendation for next increment'
    ].filter(Boolean).join('\n');
  }
},

{
  id: 'opportunity_scoring',
  slug: 'opportunity-scoring-gap-analysis',
  label: 'Opportunity Scoring — Importance vs. Satisfaction',
  kind: 'framework',
  categories: ['research', 'prioritization', 'product discovery'],
  tags: [
    'type:framework','topic:opportunity','use:voice-of-customer','use:gap-analysis'
  ],
  use_cases: ['surface unmet needs','turn surveys into priorities'],
  boosters: ['Flag items with high importance and low satisfaction as top opportunities.'],
  definition: 'Compare importance vs. satisfaction to find largest gaps and prioritize opportunities.',
  help: 'Add lines like "Item | importance (1–5) | satisfaction (1–5)".',
  fields: [
    { key: 'items', label: 'Items (one per line, with optional scores)', type: 'textarea', ph: 'Faster checkout | 5 | 2\nBetter docs | 4 | 3\nMobile offline | 5 | 1' },
    { key: 'method', label: 'Research method (optional)', type: 'text', ph: 'e.g., Survey n=214 + 8 interviews' },
    { key: 'notes', label: 'Notes (optional)', type: 'textarea', ph: 'Segments, anomalies, caveats' }
  ],
  template: ({ items, method, notes, usecase: ctx, audience, style, tone }) => [
    'Perform Opportunity Scoring (Importance vs. Satisfaction) to find unmet needs.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    method && ('Research method:\n' + method),
    items && ('Raw items:\n' + items),
    notes && ('Notes:\n' + notes),
    'Output:\n1) Table with Item | Importance | Satisfaction | Gap (Imp–Sat)\n2) Top 5 opportunities with rationale\n3) Suggested next step per opportunity (experiment or design task)'
  ].filter(Boolean).join('\n')
}


  ];

  // === Lightweight search hooks (optional) ===
  // Mirrors how the app scores matches (label/slug/defs/tags/categories/use_cases/boosters/fields)
   for (const t of TEMPLATES){
    t.meta = t.meta || {};
    const bits = [
      t.label, t.slug, t.definition, t.help,
      ...(t.tags||[]), ...(t.categories||[]), ...(t.use_cases||[]),
      ...(t.boosters||[]),
      ...(Array.isArray(t.fields) ? t.fields.map(f => f?.label || f?.key || '') : [])
    ].filter(Boolean).join(' ').toLowerCase();
    t.meta.search_text = bits;
  }

  // 3) Export to the window under both names while you migrate wording
  root.TEMPLATES  = TEMPLATES;
  root.FRAMEWORKS = TEMPLATES;

  // 4) Node/CommonJS convenience (harmless in browser)
  if (typeof module !== 'undefined') module.exports = TEMPLATES;
})(typeof window !== 'undefined' ? window : globalThis);