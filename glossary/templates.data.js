

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
      options:['explore','define','ideate','plan','analyze','compare/decide','prioritize','evaluate/review','troubleshoot/debug','problem solve','motivate','other']
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
      'Your job is to choose the best listed tool (e.g., framework, method, technique, scaffold, etc...) for helping the user achieve their desired goal/outcome or problem based on their situation',
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
  categories: ['psychology','self-reflection','coaching','resilience'],
  tags: [
    'type:framework','topic:cbt','topic:rebt','topic:reframing',
    'use:cognitive-bias','use:thought-challenge','use:emotional-regulation',
    'level:intermediate','method:structured-questioning'
  ],
  use_cases: [
    'reframe negative thoughts or assumptions',
    'self-coaching through emotional situations',
    'journaling for stress or anxiety',
    'cognitive bias analysis',
    'coaching or mentoring dialogue'
  ],
  boosters: [
    'Maintain a calm, validating tone when presenting the dispute.',
    'Always ground the dispute in logic or evidence rather than platitudes.',
    'Offer at least one alternative, balanced belief to replace the negative one.',
    'Ensure the Effect links back to reduced distress or constructive behavior.',
    'Encourage iteration: note that disputing may need to be repeated over time.',
    'Suggest rating emotion intensity before vs. after (0–100%) to measure shift.',
    'Use multiple disputing angles: evidence, logic, perspective, pragmatism.'
  ],
  definition: 'A structured cognitive restructuring tool from REBT/CBT that traces the chain from an Activating event → Belief → Consequence, then challenges the belief (Dispute) and envisions a healthier Effect. Used for self-coaching, journaling, and therapy.',
  help: 'Fill in each step A–E with concise statements (1–3 sentences). Use Dispute to logically test the belief. Add an Alternative belief to reinforce constructive thinking. Rate emotions before/after to see the effect. Revisit the exercise as beliefs recur.',
  fields: [
    { key: 'event', label: 'Activating event', type: 'textarea',
      desc: 'Trigger or situation that set off the reaction.',
      ph: 'e.g., My manager criticized my report in the team meeting.' },
    { key: 'belief', label: 'Belief or thought', type: 'textarea',
      desc: 'Your interpretation, assumption, or judgment.',
      ph: 'e.g., "I must be bad at my job."' },
    { key: 'consequence', label: 'Consequence (feelings/behavior)', type: 'textarea',
      desc: 'The emotional and behavioral outcome of that belief.',
      ph: 'e.g., I felt anxious and avoided new projects.' },
    { key: 'dispute', label: 'Dispute (challenge the belief)', type: 'textarea',
      desc: 'Evidence, logic, or perspective that challenges the belief.',
      ph: 'e.g., Feedback helps me grow; one report doesn’t define me.' },
    { key: 'alt_belief', label: 'Alternative belief (optional)', type: 'textarea',
      desc: 'Balanced replacement thought that is true and helpful.',
      ph: 'e.g., I can learn from mistakes and still be competent.' },
    { key: 'effect', label: 'Effect (new outcome)', type: 'textarea',
      desc: 'Healthier emotions, thoughts, or behaviors after disputing.',
      ph: 'e.g., I feel motivated to improve and more confident about my skills.' },
    { key: 'coach_notes', label: 'Coach/Guide notes (optional)', type: 'textarea',
      desc: 'Extra reflections or guidance if working with a coach or mentor.',
      ph: 'Coach suggests practicing self-compassion statements.' }
  ],
  template: ({ event, belief, consequence, dispute, alt_belief, effect, coach_notes, ctx, audience, style, tone }) => [
    'Apply the ABCDE cognitive restructuring flow.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    event && ('A — Activating event:\n' + event),
    belief && ('B — Belief:\n' + belief),
    consequence && ('C — Consequence:\n' + consequence),
    dispute && ('D — Dispute:\n' + dispute),
    alt_belief && ('Alternative belief:\n' + alt_belief),
    effect && ('E — Effect:\n' + effect),
    coach_notes && ('Coach/Guide notes:\n' + coach_notes),
    'Output:\n1) Clear chain A→B→C\n2) Disputed belief with logical alternative\n3) Healthier effect or outlook\n\nChecklist:\n- [ ] All steps A–E filled\n- [ ] Dispute grounded in evidence/logic\n- [ ] Alternative belief stated\n- [ ] Effect shows reduced distress or constructive behavior'
  ].filter(Boolean).join('\n')
},
  
{
  id: 'addie',
  slug: 'addie-instructional-design',
  label: 'ADDIE — Analyze · Design · Develop · Implement · Evaluate',
  kind: 'framework',
  categories: [
    'education','planning','training','curriculum-design','evaluation'
  ],
  tags: [
    'type:framework','topic:instructional-design','topic:learning-design',
    'phase:plan','phase:develop','phase:evaluate',
    'level:beginner','use:course-development','use:lesson-planning',
    'use:training-strategy','use:e-learning','method:addie'
  ],
  use_cases: [
    'plan and structure an educational course or program',
    'develop training or e-learning materials systematically',
    'design corporate or professional development training',
    'align learning outcomes with assessments',
    'review, evaluate, and improve instructional content'
  ],
  boosters: [
    'In Analyze, prompt for learner profile, prior knowledge, and constraints before moving on.',
    'In Design, enforce alignment between objectives, strategies, and assessments.',
    'In Develop, ensure deliverables are concrete (slides, exercises, quizzes).',
    'In Implement, specify delivery method (online, in-person, blended) and timeline.',
    'In Evaluate, include both formative (ongoing) and summative (end) evaluation methods.',
    'Check alignment: every objective should map to a strategy, activity, and assessment.',
    'Encourage iteration: capture improvements after pilot delivery.'
  ],
  definition: 'An instructional design framework with five phases—Analyze, Design, Develop, Implement, Evaluate—for creating and improving learning experiences. ADDIE is iterative and cyclical: insights from evaluation feed into future cycles of analysis and design.',
  help: 'Provide the training topic, learner personas, objectives, and delivery context. The model will expand these through each ADDIE phase to produce a structured instructional design plan. Remember: each phase informs the next, and evaluation loops back to improve the whole design.',
  fields: [
    { key: 'topic', label: 'Training topic', type: 'text',
      desc: 'The subject matter or skill to be taught.',
      ph: 'e.g., Basics of Data Science' },
    {
      key: 'audience',
      label: 'Learner audience',
      type: 'repeater',
      itemType: 'typeahead',
      autofill: 'persona->inline',
      itemLabel: 'learner',
      min: 1,
      max: 10,
      desc: 'Who the learners are, including role, age, or prior knowledge.',
      ph: 'e.g., Junior marketing analysts with no coding background, Nurse Trainee, Sales Manager, New Hire'
    },
    { key: 'objectives', label: 'Learning objectives (optional)', type: 'textarea',
      desc: 'Specific goals or outcomes for the learning.',
      ph: 'e.g., Understand key Python libraries; build a simple regression model.' },
    { key: 'assessment', label: 'Assessment methods (optional)', type: 'textarea',
      desc: 'How learning will be measured.',
      ph: 'e.g., Quizzes, project work, peer review, certification exam' },
    { key: 'delivery', label: 'Delivery mode/timeline (optional)', type: 'textarea',
      desc: 'How and when training will be delivered.',
      ph: 'e.g., 4-week blended course with weekly online sessions + in-person workshop' },
    { key: 'resources', label: 'Resources or constraints (optional)', type: 'textarea',
      desc: 'Budget, tools, platforms, or limits that affect design.',
      ph: 'e.g., LMS required; budget capped at $10k' }
  ],
  template: ({ topic, audience, objectives, assessment, delivery, resources, ctx, style, tone }) => [
    'Apply the ADDIE instructional design framework.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    topic && `Topic: ${topic}`,
    audience && (
      'Learner audience:\n' + String(audience)
        .split(/\n+/).map(s => s.trim()).filter(Boolean)
        .map((x,i) => `${i+1}. ${x}`)
        .join('\n')
    ),
    objectives && ('Objectives:\n' + objectives),
    assessment && ('Assessment methods:\n' + assessment),
    delivery && ('Delivery mode/timeline:\n' + delivery),
    resources && ('Resources/constraints:\n' + resources),
    'Output (five phases):',
    '1) Analyze: learner needs, gaps, constraints, and context.',
    '2) Design: learning objectives, strategies, assessments, sequencing, and alignment.',
    '3) Develop: concrete materials and activities tied to design.',
    '4) Implement: delivery plan (who, when, where, how).',
    '5) Evaluate: formative and summative evaluation methods linked to objectives.',
    'Checklist:\n- [ ] Objectives measurable\n- [ ] Assessments aligned\n- [ ] Delivery plan realistic\n- [ ] Evaluation cycle clear'
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
  id: 'argument-map',
  slug: 'argument-mapping',
  label: 'Argument Mapping — Claim · Premises · Objections · Rejoinders',
  kind: 'framework',
  categories: [
    'reasoning patterns','critical thinking','debate','philosophy','rhetoric'
  ],
  tags: [
    'type:framework','topic:argumentation','topic:toulmin',
    'phase:structure','phase:analyze',
    'level:beginner','use:debate-prep','use:analysis','use:policy-brief',
    'use:fallacy-detection','use:critical-writing'
  ],
  use_cases: [
    'debate preparation and rebuttal planning',
    'design trade-offs and product decisions',
    'policy briefs and litigation memos',
    'essay planning and thesis testing',
    'negotiation strategy',
    'ethical reasoning and value debates',
    'teaching logic and critical thinking',
    'debiasing reasoning by mapping assumptions'
  ],
  definition: 'Argument mapping lays out claims, supporting premises, objections, and rebuttals as a tree. It surfaces hidden assumptions, clarifies logical structure, and reveals weaknesses. Toulmin elements (grounds, warrant, backing, qualifier, rebuttal) can be layered in for depth.',
  help: 'Provide a thesis, premises, objections, and rejoinders. Optionally add warrants, backing, qualifiers, and a counter-thesis. The output includes a structured ASCII tree, an assessment of strengths/weaknesses, and suggestions for refinement.',
  fields: [
    { key:'thesis',   label:'Thesis / main claim', type:'text',
      ph:'e.g., We should adopt Option B.' },
    { key:'premises', label:'Premises (one per line)', type:'textarea',
      ph:'e.g., Lower cost\\nHigher reliability\\nFaster to ship' },
    { key:'evidence', label:'Evidence / grounds', type:'textarea',
      ph:'Studies, metrics, citations' },
    { key:'warrant',  label:'Warrant (optional)', type:'textarea',
      desc:'The reasoning principle that links premises to claim.',
      ph:'e.g., Lower costs usually improve sustainability.' },
    { key:'backing',  label:'Backing (optional)', type:'textarea',
      desc:'Further support for the warrant (laws, principles, expert opinion).',
      ph:'Industry reports; legal precedents' },
    { key:'qualifier',label:'Qualifier (optional)', type:'text',
      desc:'How strongly the claim is asserted.',
      ph:'e.g., probably, almost certainly' },
    { key:'counter',  label:'Counter-thesis (optional)', type:'textarea',
      desc:'The strongest opposing claim.',
      ph:'e.g., We should adopt Option A.' },
    { key:'objections',label:'Objections (one per line)', type:'textarea',
      ph:'e.g., Vendor risk\\nMigration cost' },
    { key:'rejoinders',label:'Rejoinders (one per line)', type:'textarea',
      ph:'e.g., Multi-vendor strategy\\nStaged rollout' },
    { key:'implications',label:'Implications (optional)', type:'textarea',
      desc:'Consequences if thesis is accepted or rejected.',
      ph:'If adopted: cost savings; If rejected: lost market share' },
    { key:'standard', label:'Standard of proof', type:'text',
      ph:'preponderance | clear & convincing | beyond reasonable doubt' }
  ],
  boosters: [
    'Always generate at least one objection, even if the input is one-sided.',
    'Map each rejoinder directly to its objection for clarity.',
    'Highlight the warrant if provided; if missing, suggest one.',
    'Return a 1–5 confidence score and note which missing element would strengthen the argument most.',
    'Flag if the claim relies heavily on assumptions rather than evidence.',
    'Include both empirical (fact-based) and normative (value-based) premises if possible.',
    'Identify any logical fallacies that weaken the argument.'
  ],
  template: ({ thesis, premises, evidence, warrant, backing, qualifier, counter, objections, rejoinders, implications, standard, ctx }) => [
    'Construct an argument map with Toulmin elements where possible.',
    ctx && `Context: ${ctx}`,
    thesis && `Thesis: ${thesis}`,
    counter && `Counter-thesis: ${counter}`,
    evidence && `Evidence: ${evidence}`,
    warrant && `Warrant: ${warrant}`,
    backing && `Backing: ${backing}`,
    qualifier && `Qualifier: ${qualifier}`,
    standard && `Standard of proof: ${standard}`,
    'Output:',
    'A) ASCII tree:',
    'Claim',
    '├─ Premises',
    premises && String(premises).split(/\\n+/).filter(Boolean).map((p,i)=>`│  ├─ P${i+1}: ${p}`).join('\\n'),
    warrant && `├─ Warrant: ${warrant}`,
    backing && `├─ Backing: ${backing}`,
    qualifier && `├─ Qualifier: ${qualifier}`,
    '├─ Objections',
    objections && String(objections).split(/\\n+/).filter(Boolean).map((o,i)=>`│  ├─ O${i+1}: ${o}`).join('\\n'),
    '└─ Rejoinders',
    rejoinders && String(rejoinders).split(/\\n+/).filter(Boolean).map((r,i)=>`   ├─ R${i+1}: ${r}`).join('\\n'),
    implications && `Implications:\n${implications}`,
    'B) Assessment:',
    '- Strongest premise and strongest objection.',
    '- Confidence score (1–5).',
    '- Note missing premise, warrant, or evidence.',
    '- Flag any logical fallacies if present.',
    'C) Revision:',
    '- Suggest a refined thesis or structure if warranted.',
    '- Propose additional evidence or counter-arguments.'
  ].filter(Boolean).join('\n')
},

{
  id: 'bab',
  slug: 'before-after-bridge-formula',
  label: 'Before-After-Bridge (BAB) — Before state · After state · Bridge (solution)',
  kind: 'framework',
  categories: ['messaging frameworks','marketing','storytelling','persuasion'],
  tags: [
    'type:framework','topic:copywriting','topic:storytelling',
    'phase:compose','level:beginner',
    'use:value-proposition','use:ad-copy','use:pitch','use:onboarding',
    'use:fundraising','use:branding','use:sales-email'
  ],
  use_cases: [
    'highlight a product’s impact by contrasting life before vs. after its use',
    'craft persuasive marketing copy, landing page sections, or fundraising appeals',
    'design pitch deck slides or investor messaging',
    'frame user onboarding as a transformation journey',
    'write social media hooks or cold outreach emails'
  ],
  boosters: [
    'Exaggerate the pain of the Before with vivid, relatable detail drawn from the audience’s world.',
    'Make the After state aspirational but credible—avoid unrealistic hype.',
    'Present the Bridge as the natural, indispensable connector between the two states.',
    'If available, add proof (e.g., stats, testimonials) to make the Bridge more trustworthy.',
    'Anchor the After state with a sensory image (what they see, hear, feel).',
    'If an Objection is provided, weave a reassuring response into the Bridge.',
    'Keep language emotionally engaging—focus on how it feels, not just what it is.'
  ],
  definition: 'A persuasion formula that contrasts the audience’s current state (Before) with their desired future (After), positioning the offering as the Bridge that enables the transformation. It frames the gap as a story of change.',
  help: 'Fill in the current pain point (Before), the desired outcome (After), and your solution (Bridge). Add audience, emotional words, objections, or proof if available. Write in the second person for resonance. The model will create a narrative showing transformation and end with a tagline.',
  fields: [
    { key: 'before', label: 'Before — current pain point', type: 'textarea',
      desc: 'The problem state or frustration your audience faces.',
      ph: 'e.g., Small business owners manually track invoices, causing errors and late payments.' },
    { key: 'after', label: 'After — desired outcome', type: 'textarea',
      desc: 'The improved state or benefit once the problem is solved.',
      ph: 'e.g., Invoices are tracked automatically, paid on time, and stress-free.' },
    { key: 'product', label: 'Bridge — solution/offering', type: 'text',
      desc: 'The product, service, or idea that connects Before to After.',
      ph: 'e.g., PayEasy automated invoicing software' },
    { key: 'audience', label: 'Audience/Persona (optional)', type: 'typeahead',
      autofill: 'persona->inline',
      desc: 'Define who this is for to tailor tone and imagery.',
      ph: 'e.g., Busy small business owners' },
    { key: 'emotions', label: 'Emotion words (optional)', type: 'textarea',
      desc: 'Key feelings in the Before and After states.',
      ph: 'Before: stressed, overwhelmed\nAfter: confident, relieved' },
    { key: 'objection', label: 'Likely objection/hesitation (optional)', type: 'textarea',
      desc: 'What resistance the audience might raise.',
      ph: 'e.g., Too expensive; Hard to learn' },
    { key: 'proof', label: 'Proof/Credibility (optional)', type: 'textarea',
      desc: 'Evidence that makes the Bridge trustworthy (stats, testimonials, authority).',
      ph: 'e.g., Used by 10,000+ businesses; saves an average of 8 hours/week' }
  ],
  template: ({ before, after, product, audience, emotions, objection, proof, ctx, style, tone }) => [
    'Apply the Before-After-Bridge formula to craft a persuasive narrative.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    audience && `Audience: ${audience}`,
    before && `Before (pain): ${before}`,
    emotions && emotions.includes('Before:') && emotions.split('\n').find(e => e.startsWith('Before:')),
    after && `After (desired): ${after}`,
    emotions && emotions.includes('After:') && emotions.split('\n').find(e => e.startsWith('After:')),
    product && `Bridge (solution): ${product}`,
    objection && `Objection/hesitation: ${objection}\nResponse: (weave reassurance here)`,
    proof && `Proof: ${proof}`,
    'Output:\n1) Paint the BEFORE (painful present).\n2) Imagine the AFTER (desirable future).\n3) Position the BRIDGE (solution) as the connector.\n4) Reinforce with proof if provided.\n5) Address objections if present.\n6) Conclude with a one-line tagline blending After + Bridge.',
    'Checklist:\n- [ ] Before vivid\n- [ ] After aspirational but credible\n- [ ] Bridge clear and indispensable\n- [ ] Proof provided if possible\n- [ ] Objection addressed'
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
  id: 'blooms',
  slug: 'blooms-taxonomy',
  label: 'Bloom’s — Remember · Understand · Apply · Analyze · Evaluate · Create',
  kind: 'framework',
  categories: ['education','critical thinking frameworks','assessment','curriculum design'],
  tags: [
    'type:framework','topic:learning','topic:assessment',
    'phase:design','phase:evaluate','level:beginner',
    'use:learning-objectives','use:quiz-items','use:lesson-plans','use:tutoring',
    'use:rubric-design','use:competency-framework'
  ],
  use_cases: [
    'write measurable learning objectives',
    'design quiz, homework, or exam items',
    'plan lessons and projects across difficulty levels',
    'generate competency checklists for training or self-study',
    'design rubrics and performance assessments'
  ],
  definition: 'A taxonomy of cognitive skills arranged in six levels: Remember, Understand, Apply, Analyze, Evaluate, Create. It helps structure objectives, questions, and assessments so they move from recall to higher-order thinking. Though often shown hierarchically, learners can move flexibly across levels.',
  help: 'Choose a Bloom’s level or enable progression. Provide topic, number of items, and optional verbs, assessment methods, or constraints. The model generates objectives/questions with measurable verbs, success criteria, and suggested assessment formats.',
  fields: [
    { key: 'topic', label: 'Topic', type: 'text',
      ph: 'e.g., Binary search trees' },
    { key: 'level', label: 'Bloom level', type: 'select',
      options: [
        { value:'remember', label:'Remember' },
        { value:'understand', label:'Understand' },
        { value:'apply', label:'Apply' },
        { value:'analyze', label:'Analyze' },
        { value:'evaluate', label:'Evaluate' },
        { value:'create', label:'Create' }
      ],
      ph: 'Pick one Bloom level' },
    { key: 'n', label: '# of items', type: 'text',
      ph: 'e.g., 3' },
    { key: 'progression', label: 'Progression across levels (true/false)', type: 'text',
      ph: 'true' },
    { key: 'verbs', label: 'Custom verbs (optional)', type: 'textarea',
      ph: 'e.g., List, Compare, Design' },
    { key: 'assessment', label: 'Assessment method (optional)', type: 'text',
      ph: 'e.g., Quiz, coding project, oral exam' },
    { key: 'criteria', label: 'Success criteria (optional)', type: 'textarea',
      ph: 'e.g., At least 80% test accuracy; working prototype; coherent argument' },
    { key: 'constraints', label: 'Constraints', type: 'text',
      ph: 'e.g., ≤120 words each; measurable verbs only' }
  ],
  boosters: [
    'Always select verbs aligned to the specified Bloom level; if level is missing, scaffold from Remember → Create.',
    'If progression is true, generate one task per ascending level.',
    'Include success criteria or observable outcomes for each objective.',
    'Suggest assessment methods aligned to the task type (quiz, project, discussion).',
    'Avoid vague verbs like “learn” or “understand” without measurable criteria.',
    'Where relevant, combine cognitive with affective/creative verbs for richer objectives.'
  ],
  template: ({ topic, level, n, progression, verbs, assessment, criteria, constraints, ctx, audience, style, tone }) => {
    const N = Number.parseInt(n || '3', 10) || 3;
    return [
      'Generate Bloom-aligned learning objectives or tasks.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      topic && `Topic: ${topic}`,
      level && `Level: ${level}`,
      progression && `Progression: ${progression}`,
      verbs && `Custom verbs: ${verbs}`,
      assessment && `Preferred assessment method: ${assessment}`,
      criteria && `Custom success criteria: ${criteria}`,
      constraints && `Constraints: ${constraints}`,
      `Output: ${N} ${progression === 'true' ? 'progressive tasks across levels' : `${level || 'Bloom'}-level tasks`} including:`,
      '- Verb aligned to Bloom’s level',
      '- Objective phrased for the topic',
      '- Success criteria or assessment notes',
      '- Suggested assessment method',
      'Checklist:\n- [ ] Verb measurable\n- [ ] Objective clear\n- [ ] Criteria observable\n- [ ] Assessment aligned'
    ].filter(Boolean).join('\n');
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
  id: 'cognitive_debiasing',
  slug: 'cognitive-debiasing',
  label: 'Cognitive Debiasing',
  kind: 'pattern',
  categories: ['ethics','bias','critical thinking'],
  tags: [
    'type:pattern','topic:debiasing','topic:consider-the-opposite',
    'level:beginner','use:analysis','use:strategy','use:review',
    'use:decision-audit','use:risk-assessment'
  ],
  use_cases: [
    'document a current assumption and actively seek disconfirming evidence',
    'run a quick pre-mortem on a plan',
    'decide next adjustment with rationale',
    'audit reasoning in board reviews or strategic planning',
    'perform sanity checks on research or forecasts'
  ],
  definition: 'A meta-cognitive scaffold that surfaces assumptions, tests them with opposites and alternatives, and documents disconfirming evidence, missing data, and follow-up. It cannot remove bias, but it structures accountability against common reasoning errors.',
  help: 'State the bias risk and your assumption. Generate an opposite scenario and an alternative hypothesis. Gather at least two pieces of disconfirming evidence (and note any missing). Run a pre-mortem on failure, adjust the plan, and set a follow-up checkpoint. Optionally invite another persona to argue the opposite.',
  boosters: [
    'Cite at least 2 credible, independent sources that challenge the assumption.',
    'Include one perspective outside your immediate cultural or disciplinary bubble.',
    'Rank disconfirming evidence by strength/credibility.',
    'Add a one-line pre-mortem: “If this failed in [chosen timeframe], it would be because…”',
    'Log a missing piece of evidence you expected but did not find.',
    'Have another persona (or the model) argue the opposite side for you.',
    'Note any secondary biases (anchoring + confirmation + sunk cost) influencing the reasoning.'
  ],
  fields: [
    { key: 'bias', label: 'Bias in question', type: 'text',
      ph: 'Anchoring / Confirmation / Availability / Other' },
    { key: 'stake', label: 'Stake / Impact if wrong', type: 'textarea',
      ph: 'What’s at risk if this assumption fails?' },
    { key: 'initial', label: 'My initial assumption', type: 'textarea',
      ph: 'Write it down plainly.' },
    { key: 'opposite', label: 'Opposite scenario — What if the opposite is true?', type: 'textarea',
      ph: 'Spell the plausible opposite.' },
    { key: 'alt_hypothesis', label: 'Alternative hypothesis (not strict opposite)', type: 'textarea',
      ph: 'Another plausible framing of reality.' },
    { key: 'disconfirm', label: 'Disconfirming evidence (≥2, one per line)', type: 'textarea',
      ph: 'Source, fact, or datapoint per line.' },
    { key: 'missing', label: 'Missing evidence (expected but absent)', type: 'textarea',
      ph: 'What did you expect to find that you could not?' },
    { key: 'premortem', label: 'Pre-mortem — If this failed, why?', type: 'textarea',
      ph: 'Top 1–3 failure reasons. Specify timeframe.' },
    { key: 'decision', label: 'Next step decision — What will I adjust?', type: 'textarea',
      ph: 'Change of plan, metric, gate, or experiment.' },
    { key: 'persona', label: 'Persona check (optional)', type: 'typeahead',
      autofill: 'persona->inline',
      ph: 'Pick a persona to argue the opposite (e.g., Skeptical Analyst, External Critic)' },
    { key: 'followup', label: 'Follow-up checkpoint', type: 'text',
      ph: 'When/how will I revisit this assumption?' }
  ],
  template: ({ bias, stake, initial, opposite, alt_hypothesis, disconfirm, missing, premortem, decision, persona, followup, ctx, audience, style, tone }) => [
    'Apply a cognitive debiasing pass.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    bias && `Bias in question: ${bias}`,
    stake && `Stake / Impact if wrong:\n${stake}`,
    initial && ('Initial assumption:\n' + initial),
    opposite && ('Opposite scenario:\n' + opposite),
    alt_hypothesis && ('Alternative hypothesis:\n' + alt_hypothesis),
    disconfirm && (
      'Disconfirming evidence:\n' +
      String(disconfirm).split(/\n+/).map(s=>s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    missing && ('Missing evidence:\n' + missing),
    premortem && ('Pre-mortem:\n' + premortem),
    decision && ('Next step decision:\n' + decision),
    persona && (`Persona check — Opposing voice:\n${persona}`),
    followup && ('Follow-up checkpoint:\n' + followup),
    'Output:\n1) Bias summary\n2) Assumption vs. opposite vs. alternative\n3) Disconfirming evidence (≥2, ranked)\n4) Missing evidence noted\n5) Pre-mortem failure modes\n6) Decision & rationale\n7) Follow-up accountability',
    'Checklist:\n- [ ] ≥2 disconfirming sources\n- [ ] One external perspective included\n- [ ] Missing evidence logged\n- [ ] Pre-mortem stated\n- [ ] Decision adjusted\n- [ ] Follow-up scheduled'
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
  id: 'constraint_flip',
  slug: 'constraint-flip',
  label: 'Constraint Flip (play with edges)',
  kind: 'pattern',
  categories: ['creativity','strategy','cultural frameworks'],
  tags: [
    'type:pattern','topic:constraints','topic:inversion',
    'use:ideation','use:innovation-workshop','use:design-sprint','level:beginner'
  ],
  use_cases: [
    'turn blockers into creative triggers',
    'explore exaggerated, inverted, or removed constraints',
    'design for edge cases or paradoxes',
    'run innovation workshops or design sprints under tight limits',
    'brainstorm alternatives when resources are scarce'
  ],
  definition: 'A creativity scaffold that flips limits into design prompts: exaggerate, remove, invert, or design for edge cases. By reframing constraints, hidden opportunities emerge and can be prototyped.',
  help: 'Identify a real constraint. Explore it exaggerated, removed, inverted, and at its edge. Generate ≥3 ideas per flip. Add a cultural or artistic analogy. End with a synthesis and a prototype step to test feasibility.',
  boosters: [
    'Generate ≥3 ideas per flip direction (exaggerate, remove, invert, edge-case).',
    'Include at least one non-Western or artistic example of constraint-play.',
    'Link at least one flipped idea to a concrete user need.',
    'Compare feasibility vs. originality across flips.',
    'End with a synthesis sentence: what hidden possibility emerged?',
    'Close with a feasible prototype step.'
  ],
  fields: [
    { key: 'limiting', label: 'What’s limiting me right now?', type: 'textarea',
      ph: 'e.g., Budget cap; only 2 engineers; limited space' },
    { key: 'exaggerate', label: 'If I exaggerated that constraint, what new ideas emerge?', type: 'textarea',
      ph: 'e.g., If budget were $0, how would we still deliver value?' },
    { key: 'remove', label: 'If I removed it entirely, what could I try?', type: 'textarea',
      ph: 'e.g., If time were unlimited, what would I build?' },
    { key: 'invert', label: 'If I turned it into a mandatory rule, what happens?', type: 'textarea',
      ph: 'e.g., If delays were required, what experience would we design?' },
    { key: 'edge', label: 'What if I designed only for edge/worst-case users?', type: 'textarea',
      ph: 'e.g., For people with no internet access; for extreme climates' },
    { key: 'analogy', label: 'Cultural/artistic analogy (optional)', type: 'textarea',
      ph: 'e.g., Japanese wabi-sabi approach; jazz improvisation; African fractal design' },
    { key: 'prototype', label: 'Prototype step', type: 'textarea',
      ph: 'What’s one small, testable experiment to try now?' },
    { key: 'synthesis', label: 'Synthesis insight', type: 'textarea',
      ph: 'What hidden possibility or new direction did this reveal?' }
  ],
  template: ({ limiting, exaggerate, remove, invert, edge, analogy, prototype, synthesis, ctx, audience, style, tone }) => [
    'Run a Constraint Flip session (play with edges).',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    limiting && ('Constraint:\n' + limiting),
    exaggerate && ('Exaggerated constraint → ideas:\n' + exaggerate),
    remove && ('Removed constraint → ideas:\n' + remove),
    invert && ('Inverted constraint (make it a rule) → ideas:\n' + invert),
    edge && ('Edge-case design → ideas:\n' + edge),
    analogy && ('Cultural/artistic analogy:\n' + analogy),
    prototype && ('Prototype step:\n' + prototype),
    synthesis && ('Synthesis insight:\n' + synthesis),
    'Output:\n1) Constraint summary\n2) Divergent ideas (all flips)\n3) Cultural/artistic analogies\n4) Prototype step\n5) Synthesis insight',
    'Checklist:\n- [ ] ≥3 ideas per flip\n- [ ] Analogy included\n- [ ] Prototype feasible\n- [ ] Insight captured'
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
  categories: ['productivity','prioritization','psychology','decision-making'],
  tags: [
    'type:framework','topic:time-management','topic:decision-making',
    'phase:plan','level:beginner','level:intermediate',
    'use:task-prioritization','use:workflow','use:team-alignment',
    'use:strategic-planning','use:stress-reduction','use:leadership-retreat'
  ],
  use_cases: [
    'categorize tasks by urgency and importance',
    'decide what to do now, schedule for later, delegate, or drop',
    'facilitate team sprint or project prioritization',
    'improve personal productivity and reduce stress',
    'ensure proactive time is spent on long-term strategic goals',
    'prevent burnout by identifying tasks to eliminate or delegate',
    'use in leadership workshops to realign on priorities'
  ],
  definition: 'The Eisenhower Matrix is a time-management and decision-making tool that classifies tasks by urgency and importance. It divides work into four quadrants: Do (urgent & important), Schedule (important but not urgent), Delegate (urgent but not important), and Eliminate (neither). It helps reduce stress, improve focus, and rebalance effort toward long-term goals.',
  help: 'List tasks one per line, adding deadlines, importance cues, or stakeholders in context. The model will assign tasks to quadrants, provide justifications, and highlight workload imbalances. Use delegation and elimination proactively to free time for strategic (Schedule) work.',
  boosters: [
    'Write a one-sentence justification for why each task falls into its category.',
    'If multiple tasks land in one category, rank them or suggest which to tackle first.',
    'Identify at least one “Schedule” (Quadrant II) task to put on the calendar this week.',
    'Notice overload in “Do now” (Quadrant I) — consider prevention strategies.',
    'Highlight if one quadrant dominates and suggest rebalancing.',
    'Ensure at least one low-value task is dropped (Eliminate).',
    'Flag delegation friction: what prevents handing tasks off?'
  ],
  fields: [
    { key: 'tasks', label: 'Tasks (one per line)', type: 'textarea',
      desc: 'List tasks you want to prioritize. Be specific: include verbs, deadlines, and owners if known.',
      ph: 'Write report (due tomorrow)\nWeekly 1:1 with team member\nScroll social media\nPrep strategy deck for client' },
    { key: 'context', label: 'Context (optional)', type: 'textarea',
      desc: 'Extra info: deadlines, importance signals, stakeholders, constraints.',
      ph: 'Task 1 due tomorrow; Task 2 optional cleanup; Task 3 critical for client meeting.' },
    { key: 'delegation', label: 'Delegation options (optional)', type: 'textarea',
      desc: 'List people, teams, or tools that could take tasks off your plate.',
      ph: 'Virtual assistant, teammate, automation bot' },
    { key: 'deadline_sensitivity', label: 'Deadline sensitivity (optional)', type: 'textarea',
      desc: 'Flag tasks that are time-critical vs. flexible.',
      ph: 'Report due in 24h = high sensitivity; backlog grooming = low sensitivity.' },
    { key: 'strategic_goals', label: 'Strategic goals alignment (optional)', type: 'textarea',
      desc: 'Link tasks to long-term objectives or KPIs.',
      ph: 'Client growth, team retention, Q2 OKRs' }
  ],
  template: ({ tasks, context, delegation, deadline_sensitivity, strategic_goals, ctx, style, tone }) => [
    'Apply the Eisenhower Matrix to categorize tasks by urgency and importance.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    tasks && (
      'Tasks:\n' + String(tasks).split(/\n+/).map(s => s.trim()).filter(Boolean).map((t,i) => `${i+1}. ${t}`).join('\n')
    ),
    context && ('Context:\n' + context),
    delegation && ('Delegation options:\n' + delegation),
    deadline_sensitivity && ('Deadline sensitivity:\n' + deadline_sensitivity),
    strategic_goals && ('Strategic goals:\n' + strategic_goals),
    '---',
    'Return:',
    '1) Tasks grouped into 4 quadrants:',
    '   - Do (Urgent & Important)',
    '   - Schedule (Important but Not Urgent)',
    '   - Delegate (Urgent but Not Important)',
    '   - Eliminate (Neither)',
    '2) One-sentence justification for each placement',
    '3) Ranking within quadrants (if >1 item)',
    '4) Highlight workload imbalances (quadrants overloaded or empty)',
    '5) Recommend 1 “Schedule” task to calendar this week',
    '6) Optional: show ASCII matrix with tasks in each quadrant',
    'Checklist:\n- [ ] Do quadrant manageable\n- [ ] ≥1 Schedule task prioritized\n- [ ] Delegation attempted\n- [ ] At least 1 Eliminate task identified'
  ].filter(Boolean).join('\n')
},
  
{
  id: 'fab',
  slug: 'feature-advantage-benefit',
  label: 'FAB — Feature · Advantage · Benefit',
  kind: 'framework',
  categories: ['messaging frameworks','marketing','sales','copywriting','communication'],
  tags: [
    'type:framework','topic:copywriting','topic:value-prop','topic:sales-enablement',
    'topic:persuasion','topic:resume-optimization',
    'phase:craft','phase:apply',
    'level:beginner','level:intermediate',
    'use:product-marketing','use:sales-copy','use:value-messaging','use:resume-writing',
    'use:ad-copy','use:pitch-decks'
  ],
  use_cases: [
    'Turn product features into user-focused benefits for marketing copy.',
    'Train a model to articulate why a feature matters to customers.',
    'Create sales bullets or product descriptions emphasizing value.',
    'Reframe technical jargon into plain language for non-technical audiences.',
    'Craft resume or LinkedIn bullets by translating responsibilities into achievements.',
    'Translate engineering specs into customer-facing copy.',
    'Reframe B2B SaaS features into executive-level benefits.',
    'Build persuasive pitch decks for investors.',
    'Highlight transferable skills in job applications.'
  ],
  boosters: [
    'Translate technical features into plain advantages and user benefits.',
    'Ensure the benefit addresses a specific customer need or pain point.',
    'Include at least one emotional or human-centered benefit, not just functional.',
    'Pair each benefit with a potential customer persona (“For busy professionals…”).',
    'Offer an alternate phrasing that works as a sales bullet or ad headline.',
    'Force-test each benefit with “So what?” until it resonates at a human level.',
    'Provide one micro-FAB version (short-form for ads, resumes, or social posts).',
    'Tailor at least one FAB to a secondary persona for versatility testing.'
  ],
  definition: 'A classic product messaging formula that starts with a Feature of a product, explains the Advantage (what it does or why it’s better), and concludes with the Benefit (why it matters to the user). It is widely used in marketing, sales, resumes, and persuasion writing.',
  help: 'Provide a key product feature. Optionally add target audience and customer pain point. The model will respond with a clear FAB breakdown: feature, advantage, and benefit — plus variations for different messaging contexts and lengths.',
  fields: [
    { key: 'feature', label: 'Product feature(s)', type: 'textarea',
      desc: 'Enter one or more product features, one per line.',
      ph: 'Real-time analytics dashboard\nAutomated reporting engine' },
    {
      key: 'aud_target',
      label: 'Target audience (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Who the message should be tailored for.',
      ph: 'Marketing managers, busy parents, enterprise buyers'
    },
    { key: 'painpoint', label: 'Customer need/pain point (optional)', type: 'textarea',
      desc: 'The underlying problem this feature helps solve.',
      ph: 'Teams waste hours compiling reports manually.' },
    { key: 'advantage_override', label: 'Advantage (optional, pre-written)', type: 'textarea',
      desc: 'Seed your own draft of how the feature helps. If blank, the model will generate it.',
      ph: 'Gives managers real-time visibility into campaign ROI.' },
    { key: 'benefit_override', label: 'Benefit (optional, pre-written)', type: 'textarea',
      desc: 'Seed your own draft of why it matters to the user. If blank, the model will generate it.',
      ph: 'Saves hours each week and reduces stress for the team.' },
    { key: 'format', label: 'Output format (optional)', type: 'text',
      desc: 'Preferred output style.',
      ph: 'Bullets, headline, paragraph, LinkedIn bullet' },
    { key: 'constraints', label: 'Constraints (optional)', type: 'text',
      desc: 'Any format or length constraints.',
      ph: '1 sentence per item; ≤20 words each.' }
  ],
  template: ({ feature, aud_target, painpoint, advantage_override, benefit_override, format, constraints, ctx, audience, style, tone }) => [
    'Use the FAB framework to highlight the feature, what it does, and why it matters.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    feature && (
      'Feature(s):\n' + String(feature).split(/\n+/).map((f,i)=>`${i+1}. ${f}`).join('\n')
    ),
    painpoint && `Customer pain point:\n${painpoint}`,
    aud_target && (
      'Target audience:\n' + String(aud_target).split(/\n+/).map((a,i)=>`${i+1}. ${a}`).join('\n')
    ),
    advantage_override && `Advantage (pre-provided): ${advantage_override}`,
    benefit_override && `Benefit (pre-provided): ${benefit_override}`,
    format && `Preferred format: ${format}`,
    constraints && `Constraints: ${constraints}`,
    'Output:\n1) Full FAB breakdown (Feature → Advantage → Benefit)\n2) Emotional + functional benefit covered\n3) Persona-tailored version\n4) Micro-FAB (short-form version)\n5) Alternate phrasing for ads/resumes\n\nChecklist:\n- [ ] Feature stated clearly\n- [ ] Advantage explained in plain terms\n- [ ] Benefit tied to audience need/pain\n- [ ] Includes emotional + functional benefit\n- [ ] One short-form version provided'
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
  categories: ['education','learning','critical thinking','communication','pedagogy'],
  tags: [
    'type:pattern','topic:simplification','topic:teaching','topic:critical-thinking',
    'topic:pedagogy','topic:learning-strategies',
    'level:beginner','use:explanation','use:study','use:teaching','use:debug-understanding',
    'use:simplification','use:executive-briefs','use:teaching-kids'
  ],
  use_cases: [
    'Simplify complex concepts for learners or non-experts.',
    'Debug your own understanding by explaining simply.',
    'Teach difficult topics with analogies and stories.',
    'Prepare clear communication for executives or children.',
    'Break down technical terms into everyday language.',
    'Pitch complex research to non-specialists.',
    'Design tiered learning materials (kids → teens → peers → experts).',
    'Identify and fix gaps in understanding during onboarding or training.'
  ],
  boosters: [
    'Draft the explanation in plain words, then refine it until no jargon remains.',
    'Offer at least one analogy or real-world example matched to the audience.',
    'Create layered explanations: ELI5 → teen → peer → expert.',
    'End with a short “Because… Therefore…” justification to show reasoning is intact.',
    'Match tone and examples to the selected audience level or persona.',
    'Provide a progression ladder if requested (stepwise across levels).'
  ],
  definition: 'A learning strategy (from Richard Feynman) that reveals true understanding by forcing you to explain a concept in simple, jargon-free terms, tailored to the audience’s level of age or expertise.',
  help: 'Provide a concept or topic, select an audience level from the drop-down, and optionally add personas or examples. The model will generate a clear, step-by-step explanation, simplify jargon, use analogies, and include a self-check line.',
  fields: [
    { key: 'concept', label: 'Concept or topic', type: 'textarea',
      desc: 'The subject you want explained in simple, audience-appropriate terms.',
      ph: 'e.g., Quantum entanglement' },
{ 
  key: 'audience_level', 
  label: 'Audience level', 
  type: 'select',
  options: [
    { value: 'Explain as if to a 5-year-old child: use very simple language, short sentences, playful analogies (toys, games, animals), and avoid abstractions.', label: 'Child (around 5 years old)' },
    { value: 'Explain as if to a 10–12 year-old: simple but not babyish, use concrete examples from school or hobbies, allow light abstraction but anchor in stories or visuals.', label: 'Child (10–12 years old)' },
    { value: 'Explain as if to a teenager (13–17): balance simplicity with nuance, connect to school, social life, hobbies, identity, introduce moderate abstraction and cause-effect reasoning.', label: 'Teenager (13–17)' },
    { value: 'Explain as if to a non-expert adult: avoid jargon, use workplace or everyday analogies, emphasize clarity over technical precision, highlight practical takeaways.', label: 'Adult — non-expert' },
    { value: 'Explain as if to a peer/executive adult: clear, concise, professional tone, mix plain language with light domain-specific terms, focus on decision relevance and high-level reasoning.', label: 'Adult — peer/executive' },
    { value: 'Explain as if to an expert audience: rigorous and precise, keep technical vocabulary, assume shared background, focus on clarity of logic and highlighting subtleties.', label: 'Expert audience' }
  ],
  desc: 'Select the age or expertise level. The choice adjusts tone, vocabulary, examples, and level of abstraction in the explanation.',
  ph: 'Choose an age/expertise group'
},
    {
      key: 'audience_persona',
      label: 'Audience persona(s) (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Add persona details to further tailor the explanation (e.g., Busy parent, Software engineer, 10-year-old gamer).',
      ph: 'Start typing to pick or add personas'
    },
    { key: 'examples', label: 'Examples or analogies (optional)', type: 'textarea',
      desc: 'Optional real-world examples or analogies you want the model to include.',
      ph: 'e.g., magnets, playground swings, Legos' },
    { key: 'constraints', label: 'Constraints (optional)', type: 'text',
      desc: 'Formatting or length requirements.',
      ph: 'e.g., 1 paragraph max; bullet points only; ≤100 words' }
  ],
  template: ({ concept, audience_level, audience_persona, examples, constraints, ctx, style, tone }) => [
    'Apply the Feynman Technique: explain simply, refine, clarify.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    concept && `Concept: ${concept}`,
    audience_level && `Audience level selected: ${audience_level}`,
    audience_persona && (
      'Audience persona(s):\n' +
      String(audience_persona).split(/\n+/).map((p,i)=>`${i+1}. ${p}`).join('\n')
    ),
    examples && `Examples/analogies to include: ${examples}`,
    constraints && `Constraints: ${constraints}`,
    'Output:\n1) Explanation tailored to the chosen audience level\n2) Simplify or expand detail depending on age/expertise\n3) At least one analogy or example matched to audience or persona\n4) Clarify tricky terms in simpler words\n5) End with a “Because… Therefore…” justification line\n\nChecklist:\n- [ ] Explanation fits audience level\n- [ ] Persona context used if provided\n- [ ] Analogy/example included\n- [ ] Reasoning intact and clear'
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
  id: 'facione-core',
  slug: 'facione-core-skills',
  label: 'Facione — Interpret · Analyze · Evaluate · Infer · Explain · Self-regulate',
  kind: 'framework',
  categories: ['critical thinking frameworks','education','reasoning','decision-making'],
  tags: [
    'type:framework','topic:critical-thinking','topic:argumentation',
    'topic:bias-checking','topic:decision-quality','topic:evidence-based-reasoning',
    'phase:analyze','phase:evaluate',
    'level:intermediate','level:advanced'
  ],
  use_cases: [
    'Appraise evidence for and against a claim.',
    'Write critical research summaries or peer reviews.',
    'Conduct root cause analysis in complex problems.',
    'Run ethics or policy evaluations with balance.',
    'Teach or practice structured critical thinking.',
    'Prepare debate arguments and rebuttals.',
    'Evaluate scientific or academic work during peer review.',
    'Develop policy whitepapers with rigorous reasoning.',
    'Practice bias-awareness training exercises.'
  ],
  definition: 'A six-skill model of critical thinking (Facione, Delphi Report) that operationalizes interpretation, analysis, evaluation, inference, explanation, and self-regulation. It is widely used in education, policy, debate, and scientific reasoning to structure balanced, evidence-based thinking.',
  help: 'Provide a topic/claim/problem and supporting/opposing evidence. Optionally add stakeholders, alternative explanations, and criteria. The model will step through all six skills, surface counterarguments, flag bias, and finish with a concise justification, confidence rating, and next step.',
  fields: [
    { key:'topic', label:'Topic / claim / problem', type:'text',
      desc:'The statement or issue under consideration.', 
      ph:'e.g., “Feature X reduces churn by 10%.”' },
    { key:'evidence', label:'Evidence supporting', type:'textarea',
      desc:'Main supporting data, arguments, or reasoning.',
      ph:'Key studies, metrics, examples…' },
    { key:'counter', label:'Evidence opposing', type:'textarea',
      desc:'Counterevidence or disconfirming data.',
      ph:'Limitations, critiques, contrary findings…' },
    { key:'alt_explanations', label:'Alternative explanations / hypotheses', type:'textarea',
      desc:'Other plausible causes or interpretations.',
      ph:'Market seasonality, user bias, sampling issues…' },
    { key:'criteria', label:'Evaluation criteria (optional)', type:'textarea',
      desc:'Standards for judging evidence or claims.',
      ph:'Validity, reliability, fairness, impact' },
    { key:'stakeholders', label:'Stakeholders (optional)', type:'textarea',
      desc:'Who is affected by the conclusion or decision.',
      ph:'Executives, customers, regulators, peers' },
    {
      key:'explain_aud',
      label:'Explanation audience',
      type:'repeater',
      itemType:'typeahead',
      itemLabel:'persona',
      autofill:'persona->inline',
      desc:'Who the reasoning will be explained to.',
      ph:'Executives, peers, students, customers…'
    },
    { key:'selfreg_checks', label:'Bias / self-regulation notes', type:'text',
      desc:'Bias checks, personal reflection, or quality controls.',
      ph:'Seek disconfirming data; avoid anchoring; confidence rating…' }
  ],
  boosters: [
    'Always state your confidence level (low/medium/high) and uncertainty range.',
    'Test each conclusion against at least one counterexample.',
    'Strengthen at least one opposing argument before rebutting.',
    'Make bias explicit and propose a mitigation strategy.',
    'Connect inference to real-world implications or decisions.',
    'Finish with a 2-line “Because–Therefore” justification and 1 actionable next step.'
  ],
  template: ({ topic, evidence, counter, alt_explanations, criteria, stakeholders, explain_aud, selfreg_checks, ctx }) => [
    'Apply Facione’s six core critical thinking skills.',
    ctx && `Context: ${ctx}`,
    topic && `Target issue: ${topic}`,
    'Output:',
    '1) Interpretation — Clarify what the issue and evidence mean in plain terms.',
    evidence && `2) Analysis — Identify key structures, relations, or assumptions in the evidence:\n${evidence}`,
    counter && `3) Evaluation — Weigh credibility and logical strength of supporting vs. opposing evidence:\n${counter}`,
    alt_explanations && `4) Inference — Draw a conclusion, with uncertainty and alternatives:\n${alt_explanations}`,
    criteria && `Criteria — Standards applied for evaluation:\n${criteria}`,
    stakeholders && `Stakeholders — Who is impacted:\n${stakeholders}`,
    explain_aud && (
      '5) Explanation — Frame the conclusion in terms suitable for the audience(s):\n' +
      String(explain_aud).split(/\n+/).map((a,i)=>`${i+1}. ${a}`).join('\n')
    ),
    selfreg_checks && `6) Self-regulation — Bias/quality checks applied:\n${selfreg_checks}`,
    'Close with:\n- Because–Therefore justification\n- Confidence level & uncertainty range\n- One next step (experiment, check, or action)\n\nChecklist:\n- [ ] All six skills addressed\n- [ ] At least one counterargument strengthened\n- [ ] Bias check included\n- [ ] Confidence level stated\n- [ ] Actionable next step proposed'
  ].filter(Boolean).join('\n')
},
{
  id: 'first_principles',
  slug: 'first-principles-analysis',
  label: 'First Principles — Question assumptions & reason from basics',
  kind: 'framework',
  categories: ['reasoning','innovation','analysis','creativity','philosophy','science','entrepreneurship'],
  tags: [
    'type:framework','topic:problem-solving','topic:assumptions','topic:critical-thinking','topic:innovation',
    'topic:reductionism','topic:scientific-method','level:intermediate',
    'use:strategy','use:research','use:inventive-thinking','use:decision-making',
    'use:validation','use:product-design','use:teaching'
  ],
  use_cases: [
    'Solve complex problems by breaking them down to fundamental truths.',
    'Challenge default assumptions to find innovative or unexpected solutions.',
    'Reverse-engineer a claim or idea by testing its foundational basis.',
    'Analyze feasibility by building up from basic principles.',
    'Make personal or strategic decisions with clarity about true constraints.',
    'De-bias reasoning by stripping analogies and defaults.',
    'Develop radically new product designs where conventional wisdom blocks progress.',
    'Teach critical thinking and structured problem decomposition.'
  ],
  boosters: [
    'Explicitly list core facts or principles that are undeniably true in this context.',
    'For each assumption, ask “Why must this be true?” and explore what happens if it’s not.',
    'Translate truths into measurable criteria or physical/economic limits when possible.',
    'Force at least 3 rounds of “Why?” questioning for each assumption.',
    'If a fact is missing, flag it as an unknown needing research.',
    'Propose at least 2 alternative solutions rebuilt from the same truths.',
    'End with a short “Because–Therefore” reasoning chain that ties facts to the conclusion.'
  ],
  definition: 'A problem-solving approach that strips an issue down to fundamental truths and rebuilds solutions from the ground up. It challenges assumptions and analogies to unlock novel thinking, drawing from philosophy, science, and entrepreneurship.',
  help: 'State the problem, list assumptions, known truths, unknowns, and optionally a desired outcome. The model will reduce the issue to basics, test assumptions, highlight gaps, and rebuild reasoning from first principles.',
  fields: [
    { key: 'problem', label: 'Problem or question', type: 'textarea',
      desc: 'The issue to solve or question to answer, stated as clearly and concretely as possible.',
      ph: 'e.g., How can we create a low-cost, sustainable water filter for remote areas?' },
    { key: 'assumptions', label: 'Assumptions (optional, one per line)', type: 'textarea',
      desc: 'Assumptions or constraints you think apply. These will be tested and possibly challenged.',
      ph: 'Water must be boiled to purify...\nWe can only use local materials...' },
    { key: 'facts', label: 'Known truths/evidence (optional)', type: 'textarea',
      desc: 'List what you know for sure: scientific laws, validated data, or observable facts.',
      ph: 'Clean water requires removing microbes and particulates.\nGravity filtration works without power.' },
    { key: 'unknowns', label: 'Unknowns / gaps in knowledge (optional)', type: 'textarea',
      desc: 'What information is missing or uncertain and needs to be researched further.',
      ph: 'Exact cost of local materials\nLifespan of ceramic filters' },
    { key: 'goal', label: 'Desired outcome (optional)', type: 'text',
      desc: 'The ultimate goal or success state you want to achieve.',
      ph: 'Affordable filter accessible to rural households' }
  ],
  template: ({ problem, assumptions, facts, unknowns, goal, ctx, style, tone }) => [
    'Apply first principles reasoning.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    problem && `Problem: ${problem}`,
    assumptions && (
      'Assumptions:\n' + String(assumptions).split(/\n+/).map(s => s.trim()).filter(Boolean).map((a,i) => `${i+1}. ${a}`).join('\n')
    ),
    facts && (
      'Known truths:\n' + String(facts).split(/\n+/).map(s => s.trim()).filter(Boolean).map((f,i) => `${i+1}. ${f}`).join('\n')
    ),
    unknowns && (
      'Unknowns / gaps:\n' + String(unknowns).split(/\n+/).map(s => s.trim()).filter(Boolean).map((u,i) => `${i+1}. ${u}`).join('\n')
    ),
    goal && `Desired outcome: ${goal}`,
    'Output:\n1) Reduced fundamentals (core truths)\n2) Challenges to assumptions (what if false?)\n3) Alternative reconstructions from truths\n4) Because–Therefore justification\n5) Research agenda: what unknowns must be resolved to proceed'
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
  id: 'golden',
  slug: 'golden-circle-framework',
  label: 'Golden Circle — Why · How · What · Mission',
  kind: 'framework',
  categories: ['messaging frameworks','cultural frameworks','strategy','leadership','personal-development','branding'],
  tags: [
    'type:framework','topic:purpose','topic:messaging','topic:mission','topic:vision','topic:values',
    'phase:overview','level:beginner',
    'use:brand-messaging','use:mission-vision','use:pitch-deck',
    'use:community-engagement','use:personal-purpose','use:leadership-alignment','use:storytelling'
  ],
  use_cases: [
    'Craft an authentic brand or organizational purpose statement.',
    'Align team or community around shared mission and values.',
    'Shape a nonprofit’s narrative for funders and community members.',
    'Frame an individual’s life or career direction with clarity.',
    'Design communication that respects cultural diversity and shared well-being.',
    'Craft leadership speeches or keynotes that inspire through purpose.',
    'Develop culture documents or onboarding material for new employees.',
    'Shape personal mission statements or life purpose frameworks.'
  ],
  boosters: [
    "Lead with *Why* — begin with belief or cause, not with the product.",
    "Keep each section clear, 2–3 sentences max; avoid jargon.",
    "Mission should emphasize contribution to others, not just self-gain.",
    "End with a one-line *Because…* or *So that…* summary linking back to well-being.",
    "Check coherence: the *What* must clearly express the *How*, and both must embody the *Why*.",
    "Test resonance with the intended audience — would they feel inspired and aligned?",
    "Use culturally respectful and inclusive language; avoid centering only profit or self-interest."
  ],
  definition: 'A purpose-first communication model (popularized by Simon Sinek) that moves from belief (Why) to methods (How) to concrete offerings (What). This adaptation adds Mission — a clear, outward-facing purpose or cause that ties personal or organizational actions to broader well-being.',
  help: 'Use this scaffold to clarify and communicate purpose. Begin with Mission and Why (belief), then How (principles), then What (offerings). The output includes a coherence check and an inspiring summary line.',
  fields: [
    { key:'mission', label:'Mission (guiding purpose/goal)', type:'textarea',
      desc:'A clear purpose or larger cause that directs action and emphasizes well-being beyond the self.',
      ph:'e.g., To ensure every child has access to clean drinking water.' },
    { key:'why', label:'Why (belief/purpose)', type:'textarea',
      desc:'The underlying belief or cause driving your work.',
      ph:'e.g., Everyone deserves privacy by default.' },
    { key:'how', label:'How (principles/approach)', type:'textarea',
      desc:'The unique values, methods, or approach that bring the purpose to life.',
      ph:'e.g., Strong encryption and zero-knowledge design.' },
    { key:'what', label:'What (offerings/actions)', type:'textarea',
      desc:'The tangible actions, services, or products that express the Why and Mission.',
      ph:'e.g., Encrypted email; secure file sharing; advocacy workshops.' },
    { key:'aud_beneficiaries', label:'Audience / Beneficiaries (optional)', type:'textarea',
      desc:'Who this mission and message is meant to serve or inspire.',
      ph:'e.g., Rural communities, students, nonprofit partners.' },
    { key:'impact', label:'Impact / Outcomes (optional)', type:'textarea',
      desc:'What positive change or effect should result if the mission succeeds.',
      ph:'e.g., Reduced child mortality; stronger community trust.' }
  ],
  template: ({ mission, why, how, what, aud_beneficiaries, impact, ctx, audience, style, tone }) => [
    'Craft a message using the Golden Circle (adapted with Mission).',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    mission && `Mission: ${mission}`,
    why && `Why: ${why}`,
    how && `How: ${how}`,
    what && `What: ${what}`,
    aud_beneficiaries && `Beneficiaries: ${aud_beneficiaries}`,
    impact && `Impact/Outcomes: ${impact}`,
    '---',
    'Output:',
    '1) Golden Circle narrative (Why → How → What → Mission).',
    '2) Coherence check: Do all layers align and reinforce each other?',
    '3) Audience/beneficiary resonance check.',
    '4) One-line summary linking back to broader contribution (“Because/So that…”).',
    '5) Vision impact statement describing the change this mission creates.'
  ].filter(Boolean).join('\n')
},
  
{
  id: 'grow',
  slug: 'grow-coaching-model',
  label: 'GROW — Goal · Reality · Options · Way Forward',
  kind: 'framework',
  categories: ['coaching','planning','reflection','leadership','therapy','teamwork'],
  tags: [
    'type:framework','topic:goal-setting','topic:coaching','topic:decision-making',
    'topic:reflection','phase:plan','level:beginner',
    'use:personal-development','use:mentoring','use:problem-solving',
    'use:team-alignment','use:career-development','use:therapy-coaching','use:leadership-alignment'
  ],
  use_cases: [
    'Structure a coaching or mentoring conversation with clarity.',
    'Set personal or team goals with grounded reality-checks and next steps.',
    'Explore different paths forward by weighing multiple options.',
    'Support reflective practice, journaling, or therapy-style goal work.',
    'Facilitate group planning sessions where alignment is needed.',
    'Use in career coaching and performance reviews.',
    'Guide conflict resolution or mediation conversations.',
    'Provide structure for group coaching or community workshops.'
  ],
  boosters: [
    'Offer at least 3 distinct Options, including unconventional or stretch ones, before narrowing down.',
    'Encourage a specific, time-bound commitment in the Way Forward step (who, what, when).',
    'If relevant, include collective or community goals, not just individual ones (to reduce Western individualism bias).',
    'Highlight potential barriers and how the plan accounts for them.',
    'Use scaling questions (1–10) to assess motivation or readiness.',
    'Encourage users to set accountability partners (peer, mentor, community).'
  ],
  definition: 'A coaching and decision-making framework that guides reflection and action by moving through Goal (what you want), Reality (where you are now), Options (what you could do), and Way Forward (what you will do).',
  help: 'Provide the goal and current reality. You can also suggest options, barriers, motivation, or tentative actions if you have them. The model will expand with realistic strategies, diverse possibilities, and clear commitments.',
  fields: [
    { 
      key: 'goal', 
      label: 'Goal', 
      type: 'textarea',
      desc: 'The outcome or aspiration to achieve. Can be short-term (session), medium-term (project), or long-term (life/career).',
      ph: 'e.g., Improve my public speaking confidence for work presentations.' 
    },
    { 
      key: 'reality', 
      label: 'Reality (current situation)', 
      type: 'textarea',
      desc: 'Facts, context, strengths, obstacles, and constraints related to the goal.',
      ph: 'e.g., I get nervous, my last presentation had pacing issues and I avoided eye contact.' 
    },
    { 
      key: 'motivation', 
      label: 'Motivation (optional)', 
      type: 'textarea',
      desc: 'Why this goal matters to you. Optionally include a 1–10 readiness rating.',
      ph: 'e.g., This would help me grow at work and feel more confident. Readiness: 7/10.' 
    },
    { 
      key: 'options', 
      label: 'Options (ideas, one per line)', 
      type: 'textarea',
      desc: 'Possible strategies to reach the goal. Brainstorm freely (no judgment, even “wild” ideas welcome).',
      ph: 'Join a public speaking group...\nPractice with a friend...\nWatch online tutorials...' 
    },
    { 
      key: 'barriers', 
      label: 'Barriers (optional)', 
      type: 'textarea',
      desc: 'Anticipated challenges or risks, and potential strategies to handle them.',
      ph: 'e.g., Lack of time → schedule shorter daily practices.' 
    },
    { 
      key: 'will', 
      label: 'Way Forward (commitment & accountability)', 
      type: 'textarea',
      desc: 'The chosen step(s) you commit to taking, with timeline and accountability structures.',
      ph: 'e.g., I will enroll in a Toastmasters club and ask my colleague to check in monthly.' 
    }
  ],
  template: ({ goal, reality, motivation, options, barriers, will, ctx, style, tone, audience }) => [
    'Apply the GROW coaching model to structure reflection and action.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    goal && `Goal: ${goal}`,
    reality && (`Reality:\n${reality}`),
    motivation && (`Motivation:\n${motivation}`),
    options && (
      'Options:\n' + String(options).split(/\n+/).map(s => s.trim()).filter(Boolean).map((opt,i) => `${i+1}. ${opt}`).join('\n')
    ),
    barriers && (`Barriers:\n${barriers}`),
    will && (`Way Forward (commitment & accountability):\n${will}`),
    '---',
    'Output:',
    '1) Restate the Goal clearly.',
    '2) Summarize Reality factors (context, strengths, challenges).',
    '3) Expand on Options (≥3, diverse, including stretch ideas).',
    '4) Note Motivation/readiness (if given).',
    '5) Anticipate and address Barriers (if given).',
    '6) Define Way Forward with commitments, timelines, and accountability structures.',
    '7) Reflection question: What support or next check-in will help sustain progress?'
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
  id: 'two_min_rule',
  slug: 'two-minute-rule',
  label: '2-Minute Rule (David Allen)',
  kind: 'pattern',
  categories: ['productivity','behavior','workflow','time-management'],
  tags: [
    'type:pattern','topic:two-minute','topic:getting-things-done',
    'use:starter','use:micro-task','use:anti-procrastination',
    'level:beginner','method:gtd','principle:action-first'
  ],
  use_cases: [
    'reduce friction by doing a tiny version now',
    'convert avoidance into a first motion',
    'empty inboxes quickly',
    'chip away at procrastination',
    'prime focus for deeper work'
  ],
  definition: 'If a task takes ≤2 minutes, finish it immediately. If not, break it down into a concrete 2-minute “starter” step you can schedule, lowering resistance and priming momentum.',
  help: '1) Write the task clearly. 2) Decide Yes/No — can it be done in under 2 minutes? 3) If Yes, do it immediately. 4) If No, define a frictionless starter step (≤2 minutes) and schedule it. 5) Optionally add a small reward.',
  boosters: [
    'If “Yes,” push the user to complete the task right now—logging it wastes more time than finishing.',
    'If “No,” guide the user to schedule a concrete 2-minute starter step in their calendar or task manager.',
    'Ensure any starter step is purely mechanical and frictionless (e.g., “open doc and type title”).',
    'Encourage momentum stacking: celebrate 3 small wins in sequence to build flow.',
    'Suggest pairing the 2-Minute Rule with Pomodoro cycles to bridge from micro-tasks into deep work.',
    'Prompt reflection: if resistance remains even at ≤2 minutes, what hidden friction is at play?'
  ],
  fields: [
    { key:'task', label:'Task — what am I avoiding?', type:'textarea',
      desc:'State the exact action, not the project.', ph:'Reply to client email' },

    { key:'two_min_possible', label:'Can I do a 2-minute version? (Yes/No)',
      type:'text', ph:'Yes / No', desc:'Gut check—under 2 minutes of real effort?' },

    { key:'starter', label:'If No → 2-minute starter step',
      type:'textarea', ph:'Open doc and write title; create folder…',
      desc:'Write the smallest visible action that lowers resistance.' },

    { key:'reward', label:'Tiny reward (optional)',
      type:'text', ph:'Stretch, sip coffee, mark ✔️',
      desc:'Acknowledge progress to reinforce habit.' },

    { key:'timebox', label:'Timebox (auto ≤2 min)',
      type:'text', ph:'2 min max',
      desc:'Keeps scope small and safe from creep.' }
  ],
  template: ({ task, two_min_possible, starter, reward, timebox, ctx, audience, style, tone }) => [
    'Apply the 2-Minute Rule to force a start.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    task && ('Task:\n' + task),
    typeof two_min_possible === 'string' && two_min_possible && `Can do ≤2 min now? ${two_min_possible}`,
    (two_min_possible||'').toLowerCase().startsWith('y') 
      ? 'Action: Do it now.' 
      : (starter && ('Starter step:\n' + starter)),
    `Timebox: ${timebox || '≤2 minutes'}`,
    reward && `Reward: ${reward}`,
    'Output:\n1) Task\n2) Immediate action or starter\n3) Timebox (≤2 min)\n4) Optional tiny reward'
  ].filter(Boolean).join('\n')
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
  id: 'a3_ps',
  slug: 'a3-problem-solving-toyota',
  label: 'A3 Problem Solving (Toyota)',
  kind: 'framework',
  categories: [
    'quality','operations','reasoning','prompt development techniques',
    'lean','continuous improvement','pdca'
  ],
  tags: [
    'type:framework','topic:problem-solving','topic:lean',
    'topic:root-cause','phase:plan','phase:analyze','phase:improve',
    'level:intermediate','use:countermeasures','use:one-page-brief'
  ],
  use_cases: [
    'structure a one-page problem brief',
    'analyze current vs. target condition',
    'design countermeasures and follow-up',
    'facilitate PDCA cycles',
    'align teams on root cause and actions',
    'summarize post-mortem or retrospective findings'
  ],
  boosters: [
    'Ensure each section is concise: bullet points or ≤3 lines.',
    'Always connect each countermeasure directly to a specific root cause and owner.',
    'Validate that the target condition is measurable and time-bound.',
    'Prompt for evidence and data in the “current condition” before moving forward.',
    'Close the loop: include explicit follow-up metrics tied back to goals.',
    'Add a simple cause ↔ countermeasure mapping (table or bullets).',
    'Highlight priority countermeasures (high impact, low effort) if applicable.',
    'Ensure the A3 tells a coherent story from Background → Target → Follow-up.'
  ],
  definition: 'A structured, one-page problem-solving method from Toyota that frames background, problem, current vs. target condition, root cause analysis, countermeasures, and follow-up. It standardizes PDCA (Plan–Do–Check–Act) thinking in a concise, visual format.',
  help: 'Fill sections in order. Use objective data in Current, measurable outcomes in Target, then map every Countermeasure to a cause and owner. Treat the page as both a planning tool and a communication tool.',
  fields: [
    { key:'background', label:'Background (why this matters)', type:'textarea',
      desc:'Context and importance; why solving this matters.', ph:'Business impact, urgency, relevance' },
    { key:'problem', label:'Problem statement', type:'textarea',
      desc:'The specific issue to solve (one sentence).', ph:'Overtime rates increasing despite stable demand' },
    { key:'current', label:'Current condition (facts/metrics)', type:'textarea',
      desc:'Baseline data, observable facts, and pain points.', ph:'Error rate 12%; 25% overtime' },
    { key:'target', label:'Target condition (measurable)', type:'textarea',
      desc:'Define clear, numeric, or time-based goals.', ph:'Reduce overtime to <10% by Q4' },
    { key:'analysis', label:'Root-cause analysis', type:'textarea',
      desc:'Causal chain using 5 Whys, fishbone, etc.', ph:'Defective supplier parts → excess rework' },
    { key:'countermeasures', label:'Countermeasures', type:'textarea',
      desc:'Actions mapped 1:1 to causes with owners.', ph:'Add incoming inspection; assign QA lead' },
    { key:'plan', label:'Implementation plan', type:'textarea',
      desc:'Owners, dates, checkpoints, and milestones.', ph:'QA team, start 10/1, review weekly' },
    { key:'follow_up', label:'Follow-up / learnings', type:'textarea',
      desc:'Metrics, validation, and captured lessons.', ph:'Check KPI weekly; adjust if >5% scrap' },
    { key:'owner', label:'Owner / Team (optional)', type:'text',
      desc:'Person or team responsible for overall A3.', ph:'Ops manager; QA team' }
  ],
  template: ({ background, problem, current, target, analysis, countermeasures, plan, follow_up, owner, ctx, audience, style, tone }) => [
    'Apply the A3 problem-solving structure.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    background && `Background:\n${background}`,
    problem && `Problem statement:\n${problem}`,
    current && `Current condition:\n${current}`,
    target && `Target condition:\n${target}`,
    analysis && `Root-cause analysis:\n${analysis}`,
    countermeasures && `Countermeasures (linked to causes):\n${countermeasures}`,
    plan && `Implementation plan (owners + dates):\n${plan}`,
    follow_up && `Follow-up / learnings:\n${follow_up}`,
    owner && `Owner / Team: ${owner}`,
    'Output:\n1) One-page problem brief\n2) Cause ↔ Countermeasure map\n3) Implementation timeline\n4) Follow-up checks linked to target condition\n\nChecklist:\n- [ ] Problem clearly stated\n- [ ] Target measurable & time-bound\n- [ ] Each cause linked to countermeasure\n- [ ] Follow-up defined'
  ].filter(Boolean).join('\n')
},

  {
  id: 'anekantavada_syadvada',
  slug: 'anekantavada-syadvada-jain',
  label: 'Anekāntavāda & Syādvāda (Jain Many-Sided Logic)',
  kind: 'framework',
  categories: [
    'reasoning','philosophy','cultural frameworks','ethics','pluralism'
  ],
  tags: [
    'type:framework','topic:dialectic','topic:many-sidedness','topic:jainism','topic:pluralism',
    'phase:explore','phase:analyze','level:advanced',
    'use:ambiguity-management','use:policy','use:ethical-tradeoffs',
    'use:bias-mitigation','use:cross-cultural-dialogue','use:conflict-resolution',
    'principle:pluralism'
  ],
  use_cases: [
    'frame a contentious issue via multiple partial truths',
    'generate sevenfold qualified statements (syādvāda)',
    'surface context-conditional claims',
    'analyze bias in reasoning by surfacing missing standpoints',
    'design inclusive policies or ethical frameworks with pluralist grounding',
    'support cross-cultural dialogue and conflict resolution'
  ],
  boosters: [
    'Always present at least 3 distinct standpoints drawn from different cultural or disciplinary perspectives.',
    'Use “in some respect…” qualifiers to avoid absolutist claims.',
    'Explicitly acknowledge Jain origins of the framework to prevent cultural erasure.',
    'Encourage recognition of whose voices are absent or marginalized in the standpoints.',
    'Preserve conditionality—never collapse perspectives into a single universal truth.',
    'Map out the sevenfold Syādvāda forms where possible: it is; it is not; it is and it is not; it is indescribable; it is and is indescribable; it is not and is indescribable; it is, it is not, and is indescribable.'
  ],
  definition: 'A Jain philosophical method: Anekāntavāda (many-sidedness) affirms that truth is always partial, while Syādvāda formalizes this via sevenfold conditional predication. Together, they model pluralism, humility, and inclusivity in reasoning and decision-making.',
  help: 'List the issue or claim. Provide multiple standpoints, including marginalized perspectives. Generate syādvāda-style qualified statements (“in some respect it is…”). Then synthesize by highlighting limits, contradictions, and coexisting truths, while noting cultural origins.',
  fields: [
    { key: 'issue', label: 'Issue/claim under analysis', type: 'textarea',
      ph: 'Describe the claim or debate.' },
    { key: 'standpoints', label: 'Standpoints (naya)', type: 'textarea',
      desc: 'List viewpoints from disciplines, cultures, or contexts.',
      ph: 'Economic…\nEcological…\nLegal…' },
    { key: 'cultural', label: 'Cultural/marginalized perspectives', type: 'textarea',
      desc: 'Perspectives often excluded from dominant narratives.',
      ph: 'Indigenous view…\nDalit perspective…\nNon-Western epistemology…' },
    { key: 'evidence', label: 'Key evidence by standpoint', type: 'textarea',
      ph: 'Map data or reasoning to each standpoint.' },
    { key: 'bias', label: 'Bias/absence check', type: 'textarea',
      desc: 'Who is missing or stereotyped? How might bias distort the framing?',
      ph: 'Women’s voices missing; overemphasis on economic lens.' },
    { key: 'predications', label: 'Qualified statements (syād-…)', type: 'textarea',
      ph: 'In some respect it is…\nIn some respect it is not…' },
    { key: 'sevenfold', label: 'Sevenfold Syādvāda mapping (optional)', type: 'textarea',
      desc: 'Explicitly write each of the 7 forms to discipline reasoning.',
      ph: '1. In some respect it is...\n2. In some respect it is not...\n...' },
    { key: 'application', label: 'Application/implication (optional)', type: 'textarea',
      desc: 'How plural reasoning could inform action, design, or policy.',
      ph: 'e.g., Inclusive policy design; mediation strategy.' }
  ],
  template: ({ issue, standpoints, cultural, evidence, bias, predications, sevenfold, application, ctx }) => [
    'Apply Anekāntavāda / Syādvāda (many-sided conditional reasoning).',
    ctx && `Context: ${ctx}`,
    issue && `Issue:\n${issue}`,
    standpoints && ('Standpoints:\n' + String(standpoints).split(/\n+/).map((x,i)=>`${i+1}. ${x}`).join('\n')),
    cultural && ('Cultural/marginalized perspectives:\n' + cultural),
    evidence && `Evidence (by standpoint):\n${evidence}`,
    bias && `Bias/absence check:\n${bias}`,
    predications && `Qualified statements (syādvāda style):\n${predications}`,
    sevenfold && `Sevenfold mapping:\n${sevenfold}`,
    application && `Application/implication:\n${application}`,
    'Synthesis:\n1) Summarize conditional truths.\n2) Highlight the limits and contradictions of each perspective.\n3) Acknowledge missing voices.\n4) Note the Jain origins of the framework.\n5) Suggest applications in pluralist reasoning or inclusive policy.'
  ].filter(Boolean).join('\n')
},

  {
  id: 'dao_wu_wei',
  slug: 'daoist-wu-wei-strategy',
  label: 'Daoist Wu-Wei Strategy (Effortless Action)',
  kind: 'framework',
  categories: ['strategy','ethics','cultural frameworks'],
  tags: [
    'type:framework','topic:wu-wei','topic:minimal-intervention',
    'topic:timing','topic:yielding','phase:plan','level:intermediate',
    'use:governance','use:ops-simplification','use:change-management',
    'use:leadership-ethics','use:personal-practice'
  ],
  use_cases: [
    'design minimal-intervention strategies',
    'align with existing flows instead of forcing change',
    'choose timing and points of least-effort leverage',
    'practice yielding and redirection instead of resistance',
    'develop sustainable strategies that prevent burnout',
    'practice ethical leadership rooted in cultural wisdom'
  ],
  definition: 'Wu-wei (effortless action) is a Daoist principle of acting with the grain of natural flows rather than forcing outcomes. It emphasizes minimal, well-timed interventions, yielding over resistance, and cultivating space (emptiness) as a source of power. In strategic use, it guides leaders and teams to reduce friction, simplify operations, and harmonize with larger patterns.',
  help: 'Observe flows and frictions. Identify timing, leverage, and minimal moves. List deliberate non-actions. Compare what forcing the issue would look like versus wu-wei. Use natural metaphors (water, bamboo, valley) as reasoning tools. Close with a next step or practice.',
  boosters: [
    'Prefer removing steps over adding steps, unless timing calls for a single decisive move.',
    'Name non-actions explicitly (what you will not do).',
    'Check if the move harmonizes with larger flows and cycles rather than forcing against them.',
    'Add at least one yielding or redirection move (like water flowing around stone).',
    'Contrast a forcing strategy with the wu-wei version.',
    'Reflect on emptiness: what space is created by restraint?',
    'Close with a Daoist metaphor or image that reflects the strategy.'
  ],
  fields: [
    { key: 'goal', label: 'Goal/outcome', type: 'text',
      ph: 'Desired state.' },
    { key: 'flows', label: 'Existing flows (where energy already moves)', type: 'textarea',
      ph: 'User habits, market currents, team rhythms…' },
    { key: 'frictions', label: 'Friction points', type: 'textarea',
      ph: 'Bottlenecks, resistances.' },
    { key: 'leverage', label: 'Leverage points', type: 'textarea',
      ph: 'Small moves with outsized effect.' },
    { key: 'timing', label: 'Timing (ripe moments, natural cycles)', type: 'textarea',
      ph: 'Seasonal, market, or team rhythms.' },
    { key: 'yielding_moves', label: 'Yielding or redirecting moves', type: 'textarea',
      ph: 'Flowing around resistance, reframing.' },
    { key: 'non_actions', label: 'Non-actions (deliberate restraint)', type: 'textarea',
      ph: 'What not to do.' },
    { key: 'minimal_moves', label: 'Minimal enabling actions', type: 'textarea',
      ph: 'Remove, nudge, or re-sequence.' },
    { key: 'alignment', label: 'Alignment check', type: 'textarea',
      ph: 'Does this harmonize with larger natural, cultural, or organizational patterns?' },
    { key: 'tradeoffs', label: 'Trade-offs / risks (optional)', type: 'textarea',
      ph: 'What hidden costs could minimalism create?' },
    { key: 'imagery', label: 'Daoist metaphor or imagery', type: 'textarea',
      ph: 'Water, valley, bamboo, empty space…' },
    { key: 'outcome', label: 'Next step / practice (optional)', type: 'textarea',
      ph: 'What small action or reminder will embody wu-wei here?' }
  ],
  template: ({ goal, flows, frictions, leverage, timing, yielding_moves, non_actions, minimal_moves, alignment, tradeoffs, imagery, outcome, ctx }) => [
    'Apply Wu-Wei planning (effortless action).',
    ctx && `Context: ${ctx}`,
    goal && `Goal: ${goal}`,
    flows && `Existing flows:\n${flows}`,
    frictions && `Friction points:\n${frictions}`,
    leverage && `Leverage points:\n${leverage}`,
    timing && `Timing (ripe moments):\n${timing}`,
    yielding_moves && `Yielding/redirecting moves:\n${yielding_moves}`,
    non_actions && `Non-actions:\n${non_actions}`,
    minimal_moves && `Minimal enabling actions:\n${minimal_moves}`,
    alignment && `Alignment check:\n${alignment}`,
    tradeoffs && `Trade-offs / risks:\n${tradeoffs}`,
    imagery && `Daoist metaphor:\n${imagery}`,
    outcome && `Next step / practice:\n${outcome}`,
    'Output:\n1) Flow/energy map\n2) Minimal/yielding moves\n3) Explicit non-actions\n4) Alignment check\n5) Daoist metaphor summary\n6) Actionable next step',
    'Checklist:\n- [ ] Non-actions recorded\n- [ ] Minimal moves only\n- [ ] Harmonizes with flows/timing\n- [ ] Metaphor included\n- [ ] Next step identified'
  ].filter(Boolean).join('\n')
},

{
  id: 'dmaic',
  slug: 'dmaic-six-sigma',
  label: 'DMAIC — Define · Measure · Analyze · Improve · Control',
  kind: 'framework',
  categories: ['quality','operations','decision','critical thinking'],
  tags: [
    'type:framework','topic:six-sigma','topic:logic','topic:process-improvement',
    'phase:execute','level:intermediate',
    'use:process-improvement','use:root-cause','use:experiment-design',
    'use:continuous-improvement','use:quality-audit'
  ],
  use_cases: [
    'structure a data-driven improvement',
    'tie logic and evidence to countermeasures',
    'design sustainable monitoring plans',
    'prepare Six Sigma project reports',
    'audit processes for quality or compliance'
  ],
  definition: 'DMAIC is a five-phase Six Sigma method for continuous improvement. It cycles through Define, Measure, Analyze, Improve, and Control. It emphasizes evidence-based problem solving, root cause validation, and sustainable controls. It is iterative—insights from Control can restart the cycle.',
  help: 'Work step by step: Define the problem and scope, Measure baseline metrics, Analyze causes with evidence and disconfirmation, Improve via tested interventions, and design Control mechanisms that sustain gains. At each stage, surface assumptions and validate with data.',
  boosters: [
    'Each root cause must link back to at least one measured metric.',
    'Each Improve action must map to a validated cause and include a success test.',
    'Control plan must specify metric, threshold, owner, and cadence.',
    'Surface one assumption and one disconfirming data point in Analyze.',
    'Use visual tools: control charts, Pareto, fishbone diagrams where possible.',
    'Anticipate drift/slippage in Control and plan mitigation.'
  ],
  fields: [
    { key: 'define', label: 'Define', type: 'textarea',
      ph: 'Problem statement, scope, customers, assumptions.' },
    { key: 'measure', label: 'Measure', type: 'textarea',
      ph: 'Baseline metrics, KPIs, operational definitions.' },
    { key: 'baseline', label: 'Baseline snapshot (optional)', type: 'text',
      ph: 'Numeric summary of current state (e.g., defect rate = 7%)' },
    { key: 'analyze', label: 'Analyze', type: 'textarea',
      ph: 'Root causes, 5 Whys, evidence, disconfirmation.' },
    { key: 'assumptions', label: 'Key assumptions (explicit)', type: 'textarea',
      ph: 'What do we believe that must be tested?' },
    { key: 'improve', label: 'Improve', type: 'textarea',
      ph: 'Interventions, pilots, experiments, counterfactuals.' },
    { key: 'risks', label: 'Risks / limits (optional)', type: 'textarea',
      ph: 'Constraints, trade-offs, unintended effects.' },
    { key: 'control', label: 'Control', type: 'textarea',
      ph: 'Metrics, thresholds, owners, review cadence.' },
    { key: 'owners', label: 'Control plan ownership (optional)', type: 'textarea',
      ph: 'Who owns each metric or process check?' }
  ],
  template: ({ define, measure, baseline, analyze, assumptions, improve, risks, control, owners, ctx }) => [
    'Run DMAIC (Define → Measure → Analyze → Improve → Control).',
    ctx && `Context: ${ctx}`,
    define && `Define:\n${define}`,
    measure && `Measure:\n${measure}`,
    baseline && `Baseline snapshot:\n${baseline}`,
    analyze && `Analyze:\n${analyze}`,
    assumptions && `Key assumptions:\n${assumptions}`,
    improve && `Improve:\n${improve}`,
    risks && `Risks / limits:\n${risks}`,
    control && `Control:\n${control}`,
    owners && `Control owners:\n${owners}`,
    'Output:\n1) Problem → Data → Cause → Action → Control chain\n2) Cause-action-metric mapping\n3) Control plan with metrics, thresholds, owners\n4) Assumptions & disconfirmation noted',
    'Checklist:\n- [ ] Root causes linked to metrics\n- [ ] Improve actions mapped to causes & tests\n- [ ] Risks acknowledged\n- [ ] Control plan sustainable\n- [ ] Owners accountable'
  ].filter(Boolean).join('\n')
},

{
  id: 'east_nudge',
  slug: 'east-behavioral-nudge',
  label: 'EAST — Easy · Attractive · Social · Timely',
  kind: 'framework',
  categories: ['behavior','design','strategy'],
  tags: [
    'type:framework','topic:nudge','topic:behavioral-science',
    'phase:design','level:beginner',
    'use:behavior-change','use:ux','use:policy','use:cross-cultural',
    'use:a-b-testing'
  ],
  use_cases: [
    'design nudges for adoption',
    'reduce friction in flows',
    'translate insights into micro-interventions',
    'adapt behavioral design for different cultural contexts',
    'improve default settings in digital services',
    'run A/B tests of behavioral interventions'
  ],
  definition: 'EAST is a behavioral design heuristic from the UK Behavioural Insights Team. It makes desired behaviors more likely by making them Easy, Attractive, Social, and Timely—while checking for cultural fit and ethical safeguards. It works best when paired with iterative testing.',
  help: 'Define the target behavior and audience (persona). Identify barriers. Apply each EAST lever with concrete design changes. Add an if–then plan for risky barriers. Include a cultural/equity safeguard. Conclude with a single highest-leverage nudge and test plan.',
  boosters: [
    'Pair each tactic with a measurable behavior and metric.',
    'Generate at least one low-cost nudge per EAST element.',
    'Add a tiny “if–then” plan for the riskiest barrier.',
    'Stress-test against cultural differences: what is attractive or social in one context may not be in another.',
    'Check equity and inclusivity: ensure ease and salience do not unintentionally exclude vulnerable groups.',
    'Document at least one unintended consequence to monitor.'
  ],
  fields: [
    { key: 'behavior', label: 'Target behavior', type: 'text', desc: 'The action you want your audience to take, stated clearly.',
      ph: 'What should happen?' },

    // UPDATED FIELD
    {
      key: 'audience',
      label: 'Audience/Personas',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->textarea',
      desc: 'Pick one or more personas to represent your audience. Full persona profiles will autofill here for richer context.',
      ph: 'Who is acting?'
    },

    { key: 'barriers', label: 'Barriers (optional)', type: 'textarea',
      desc: 'List the main obstacles that prevent the target behavior.',
      ph: 'What blocks the target behavior now?' },

    { key: 'easy', label: 'Easy (reduce effort)', type: 'textarea',
      desc: 'How can you reduce friction and simplify the behavior?',
      ph: 'Defaults, autofill, fewer steps…' },

    { key: 'attractive', label: 'Attractive (salience/incentive)', type: 'textarea',
      desc: 'How will you make the behavior more appealing or rewarding?',
      ph: 'Visual priority, rewards…' },

    { key: 'social', label: 'Social (norms/reciprocity)', type: 'textarea',
      desc: 'How can social influence, norms, or reciprocity encourage action?',
      ph: 'Testimonials, peer stats…' },

    { key: 'timely', label: 'Timely (moment/trigger)', type: 'textarea',
      desc: 'How can you deliver the nudge at the most effective moment?',
      ph: 'Just-in-time prompts, reminders…' },

    { key: 'if_then_plan', label: 'If–Then plan (optional)', type: 'textarea',
      desc: 'Write a contingency: “If [barrier], then [nudge].”',
      ph: 'If [barrier], then [nudge]…' },

    { key: 'metric', label: 'Success metric', type: 'text',
      desc: 'Define how you’ll measure success.',
      ph: 'Conversion, completion time…' },

    { key: 'cultural', label: 'Cultural/contextual factors', type: 'textarea',
      desc: 'Account for norms, accessibility, or inclusivity across contexts.',
      ph: 'Norms, accessibility, inclusivity checks…' },

    { key: 'equity_check', label: 'Equity/inclusion safeguard', type: 'textarea',
      desc: 'Ensure the nudge does not unintentionally exclude or harm vulnerable groups.',
      ph: 'How will this nudge avoid excluding vulnerable groups?' }
  ],
  template: ({ behavior, audience, barriers, easy, attractive, social, timely, if_then_plan, metric, cultural, equity_check, ctx, style, tone }) => [
    'Apply EAST (behavioral design) with inclusivity checks.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    behavior && `Behavior: ${behavior}`,
    audience && (
      'Audience Personas:\n' +
      String(audience).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    barriers && `Barriers:\n${barriers}`,
    easy && `Easy:\n${easy}`,
    attractive && `Attractive:\n${attractive}`,
    social && `Social:\n${social}`,
    timely && `Timely:\n${timely}`,
    if_then_plan && `If–Then plan:\n${if_then_plan}`,
    metric && `Metric:\n${metric}`,
    cultural && `Cultural/contextual factors:\n${cultural}`,
    equity_check && `Equity/inclusion safeguard:\n${equity_check}`,
    'Output:\n1) EAST-mapped plan\n2) Highest-leverage nudge\n3) Quick test plan (metric + if–then)\n4) Equity/inclusion safeguard\n5) Next iteration note'
  ].filter(Boolean).join('\n')
},

  {
  id: 'eightfold_path',
  slug: 'buddhist-eightfold-path-adapted',
  label: 'Buddhist Eightfold Path (Adapted for Action)',
  kind: 'framework',
  categories: ['ethics','reasoning','cultural frameworks','spiritual frameworks','critical thinking'],
  tags: [
    'type:framework','topic:mindfulness','topic:ethics','topic:buddhism','topic:nonwestern-philosophy',
    'phase:plan','level:intermediate',
    'use:policy-guardrails','use:communication','use:self-management','use:leadership',
    'use:cross-cultural-dialogue','use:leadership-training','use:design-ethics'
  ],
  use_cases: [
    'design ethical guardrails for decision-making',
    'structure mindful decision steps in organizations',
    'review potential impacts on others with inclusivity in mind',
    'teach non-Western ethical frameworks in education or leadership training',
    'support activism, policy, or design processes that emphasize non-harm and compassion',
    'mediate cross-cultural or interfaith dialogue'
  ],
  definition: 'A practical adaptation of the Buddhist Eightfold Path (View, Intention, Speech, Action, Livelihood, Effort, Mindfulness, Concentration). This framework honors its Buddhist origins while making each factor actionable for decision-making, ethics, leadership, and cross-cultural contexts.',
  help: 'Begin by naming the decision or task. Map it to each factor of the Eightfold Path. Keep language culturally respectful, actionable, and inclusive. Always acknowledge Buddhist roots, surface tensions between factors, and close with a compassionate, non-harming recommendation.',
  boosters: [
    'Map each factor into a concrete, actionable reflection relevant to the task.',
    'Acknowledge Buddhist origins to avoid cultural erasure or whitewashing.',
    'Emphasize compassion and non-harming (ahimsa) as a throughline.',
    'Check each step for bias: surface whose voices or needs are missing.',
    'Note tensions between factors (e.g., Livelihood vs. Action).',
    'Adapt language to secular or organizational contexts while preserving ethical depth.'
  ],
  fields: [
    { key: 'decision', label: 'Decision or task under review', type: 'textarea',
      ph: 'e.g., Launching a new product; setting hiring policy' },
    { key: 'view', label: 'Right View (assumptions/realities)', type: 'textarea',
      ph: 'e.g., Are we seeing the situation clearly, or through bias?' },
    { key: 'intention', label: 'Right Intention (aims)', type: 'textarea',
      ph: 'e.g., Are our goals rooted in compassion and goodwill?' },
    { key: 'speech', label: 'Right Speech (communication)', type: 'textarea',
      ph: 'e.g., How are we communicating—truthful, kind, and purposeful?' },
    { key: 'action', label: 'Right Action (conduct)', type: 'textarea',
      ph: 'e.g., What behaviors align with non-harm and integrity?' },
    { key: 'livelihood', label: 'Right Livelihood (means)', type: 'textarea',
      ph: 'e.g., Is the work or method of earning aligned with ethics?' },
    { key: 'effort', label: 'Right Effort (discipline)', type: 'textarea',
      ph: 'e.g., How are we sustaining wholesome actions and avoiding harm?' },
    { key: 'mindfulness', label: 'Right Mindfulness (attention)', type: 'textarea',
      ph: 'e.g., Are we fully aware of context, impacts, and interdependence?' },
    { key: 'concentration', label: 'Right Concentration (focus)', type: 'textarea',
      ph: 'e.g., How are we cultivating clarity and deep focus?' },
    { key: 'cultural', label: 'Cultural context / inclusivity check', type: 'textarea',
      ph: 'e.g., Which cultural or marginalized perspectives must be included?' },
    { key: 'compassion', label: 'Compassion / non-harm reflection', type: 'textarea',
      ph: 'e.g., How does this reduce harm and foster well-being for all involved?' },
    { key: 'tradeoffs', label: 'Trade-offs or risks (optional)', type: 'textarea',
      ph: 'e.g., Profit vs. sustainability; efficiency vs. inclusivity' },
    { key: 'outcome', label: 'Outcome / next steps (optional)', type: 'textarea',
      ph: 'e.g., Adjust hiring plan; add inclusivity review; pause launch' }
  ],
  template: ({ decision, view, intention, speech, action, livelihood, effort, mindfulness, concentration, cultural, compassion, tradeoffs, outcome, ctx }) => [
    'Eightfold Path (adapted for action) — Ethical and inclusive review:',
    ctx && `Context: ${ctx}`,
    decision && `Decision/Task:\n${decision}`,
    view && `Right View:\n${view}`,
    intention && `Right Intention:\n${intention}`,
    speech && `Right Speech:\n${speech}`,
    action && `Right Action:\n${action}`,
    livelihood && `Right Livelihood:\n${livelihood}`,
    effort && `Right Effort:\n${effort}`,
    mindfulness && `Right Mindfulness:\n${mindfulness}`,
    concentration && `Right Concentration:\n${concentration}`,
    cultural && `Cultural / inclusivity check:\n${cultural}`,
    compassion && `Compassion / non-harm reflection:\n${compassion}`,
    tradeoffs && `Trade-offs / risks:\n${tradeoffs}`,
    outcome && `Outcome / next steps:\n${outcome}`,
    'Synthesis:\n1) Ethical adjustment or refinement.\n2) Inclusivity reflection.\n3) Tensions noted between factors.\n4) Explicit acknowledgment of Buddhist origins.',
    'Checklist:\n- [ ] Cultural respect upheld\n- [ ] Compassion and non-harm prioritized\n- [ ] Bias and exclusions surfaced\n- [ ] Actionable next step recorded'
  ].filter(Boolean).join('\n')
},

{
  id: 'ganma_confluence',
  slug: 'ganma-knowledge-confluence',
  label: 'Ganma — Knowledge Confluence (Yolŋu)',
  kind: 'framework',
  categories: [
    'research','cultural frameworks','strategy','dialogue','education','ethics'
  ],
  tags: [
    'type:framework','topic:knowledge-pluralism','topic:two-way-learning',
    'topic:Indigenous-wisdom','topic:Indigenous-methodologies',
    'phase:explore','phase:dialogue','level:advanced',
    'use:interdisciplinary-synthesis','use:policy','use:design-research',
    'use:co-creation','use:cross-cultural-dialogue','use:ethics-check'
  ],
  use_cases: [
    'Explore how Indigenous and Western (or other) knowledge systems meet without collapsing differences.',
    'Document shared insights while respecting boundaries and incommensurables.',
    'Design confluence processes in education, ecology, health, or policy contexts.',
    'Facilitate dialogue where multiple knowledge traditions are present.',
    'Reflect on safeguards to prevent erasure or domination of one knowledge stream by another.',
    'Teach knowledge plurality in classrooms and workshops.',
    'Support co-research between Indigenous and non-Indigenous partners.',
    'Inform policy development with cultural legitimacy and shared authority.',
    'Guide environmental stewardship that respects both Country and science.'
  ],
  boosters: [
    'Center Yolŋu framing: fresh water and salt water mixing in a lagoon; avoid reducing this to “integration” or “assimilation.”',
    'Surface tensions as valuable knowledge rather than as obstacles.',
    'Respect that some knowledge may be restricted, sacred, or not shareable — note boundaries clearly.',
    'Emphasize reciprocity, responsibility, and ongoing protocols, not just outcomes.',
    'Name who is speaking and whose voices are missing.',
    'Include relationships to land, ancestors, and community as part of the streams.',
    'Recognize that confluence is often slow and relational — not a single event.'
  ],
  definition: 'Ganma is a Yolŋu metaphor describing the meeting of fresh water and salt water, used as a way to think about knowledge confluence. Each stream keeps its identity while creating new qualities in the mixing. It is a practice of holding difference, dialogue, and shared emergence without erasing cultural integrity.',
  help: 'Use this when exploring two or more knowledge systems or traditions. Map where they overlap, where they remain distinct, and what new insights emerge at the confluence. Always note cultural protocols, boundaries, and responsibilities.',
  fields: [
    { key: 'stream_a', label: 'Knowledge Stream A', type: 'textarea',
      desc: 'One knowledge source or tradition (e.g., Yolŋu ecological knowledge, community practice, lived experience).',
      ph: 'e.g., Yolŋu kinship laws about water; Community practice of fire management' },
    { key: 'stream_b', label: 'Knowledge Stream B', type: 'textarea',
      desc: 'Another knowledge source or tradition (e.g., Western science, academic research, policy knowledge).',
      ph: 'e.g., Hydrological science data; Academic theory' },
    { key: 'participants', label: 'Participants / voices involved (optional)', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'People, communities, or roles carrying each knowledge stream.',
      ph: 'Elder, Scientist, Policy-maker, Student' },
    { key: 'context', label: 'Context / setting (optional)', type: 'textarea',
      desc: 'Where the confluence happens — classroom, policy meeting, research collaboration, on Country.',
      ph: 'e.g., Joint management meeting for a National Park' },
    { key: 'overlaps', label: 'Shared Resonances / Overlaps', type: 'textarea',
      desc: 'Where the streams align, resonate, or find common ground.',
      ph: 'e.g., Both emphasize cyclical patterns in water flows' },
    { key: 'tensions', label: 'Tensions / Incommensurables', type: 'textarea',
      desc: 'Places where the streams do not align, cannot be translated, or should not be forced together.',
      ph: 'e.g., Scientific demand for measurement vs. Yolŋu spiritual responsibility' },
    { key: 'synthesis', label: 'Confluence (Emergent Insight)', type: 'textarea',
      desc: 'What arises at the mixing point — new practice, method, or understanding that emerges when both streams meet.',
      ph: 'e.g., A co-designed water management plan blending observation, ritual, and data' },
    { key: 'safeguards', label: 'Safeguards / Protocols', type: 'textarea',
      desc: 'Cultural protocols, agreements, or ethical practices to protect both streams and prevent erasure.',
      ph: 'e.g., Yolŋu authority over sacred knowledge; data-sharing agreements' }
  ],
  template: ({ stream_a, stream_b, participants, context, overlaps, tensions, synthesis, safeguards, ctx, audience, style, tone }) => [
    'Apply Ganma (knowledge confluence).',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    context && `Setting:\n${context}`,
    participants && (
      'Participants / voices:\n' +
      String(participants).split(/\n+/).map((p,i)=>`${i+1}. ${p}`).join('\n')
    ),
    stream_a && `Stream A:\n${stream_a}`,
    stream_b && `Stream B:\n${stream_b}`,
    overlaps && `Shared Resonances:\n${overlaps}`,
    tensions && `Tensions / Incommensurables:\n${tensions}`,
    synthesis && `Confluence (emergent insight):\n${synthesis}`,
    safeguards && `Safeguards / Protocols:\n${safeguards}`,
    'Return: A reflective summary that respects both streams, honors differences, and proposes shared next steps without erasing cultural boundaries.\nClose with: Reciprocity and future responsibilities (who continues the dialogue, how, under what protocols).'
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
  id: 'kipling_5w1h',
  slug: 'five-w-one-h-kipling',
  label: '5W1H — Who · What · Where · When · Why · How',
  kind: 'framework',
  categories: [
    'analysis frameworks','prompt development techniques',
    'journalism','problem-solving','research','ux-discovery'
  ],
  tags: [
    'type:framework','topic:clarification','topic:analysis',
    'phase:compose','phase:scope','level:beginner',
    'use:requirements','use:prompt-scoping','use:root-cause',
    'principle:holistic','method:structured-questioning',
    'qa:requirements','qa:scope-check','journalism:interrogative'
  ],
  use_cases: [
    'clarify task requirements',
    'scope a prompt before execution',
    'capture acceptance criteria',
    'analyze a problem or incident',
    'design interview or survey questions',
    'structure a research or UX discovery plan',
    'prep structured Jira tickets',
    'incident postmortem structuring'
  ],
  boosters: [
    'Ensure each W/H answer is one crisp, testable line; avoid vagueness.',
    'If an element is missing, generate a clarifying question before output.',
    'Translate answers into concrete acceptance criteria for the task.',
    'After “How,” append a “Not in scope” section to limit scope creep.',
    'Cross-check that Who + Why align logically (actor ↔ motivation).',
    'Rank the W/H elements by criticality (e.g., Why > Who > What) to guide prioritization.',
    'Highlight any inconsistencies (e.g., “Who = busy executives” but “Where = TikTok comments”).'
  ],
  definition: 'A universal clarifying scaffold that ensures every prompt or problem has complete coverage across six essentials: actor, deliverable, context, timing, rationale, and approach. Prevents vague tasks, scope creep, and mismatched expectations.',
  help: 'Answer each W/H in a single crisp line; if an answer isn’t known, ask a clarifying question. Once filled, review the six together to check for coherence: Who ↔ Why, What ↔ How, When ↔ Where. Finally, add exclusions in “Not in scope” to keep boundaries clear.',
  fields: [
    { key:'who',   label:'Who',   type:'typeahead',
      desc:'Stakeholders, audience, or responsible actor. Type to search personas',
      ph:'Target user, product team, external client' },
    { key:'what',  label:'What',  type:'text',
      desc:'The desired outcome, deliverable, or artifact.',
      ph:'Draft onboarding email; working prototype' },
    { key:'where', label:'Where', type:'text',
      desc:'Location, channel, or context where it applies.',
      ph:'Slack channel, mobile app, user’s home' },
    { key:'when',  label:'When',  type:'text',
      desc:'Timeline, deadline, or cadence.',
      ph:'Within 2 weeks; daily at 9am; Q3 2025' },
    { key:'why',   label:'Why',   type:'text',
      desc:'Purpose, impact, or rationale.',
      ph:'Reduce churn; meet compliance; improve usability' },
    { key:'how',   label:'How',   type:'textarea',
      desc:'Approach, process, or constraints.',
      ph:'Run usability study with 5 users; follow WCAG 2.1' },
    { key:'not',   label:'Not in scope (optional)', type:'textarea',
      desc:'Explicit exclusions or anti-goals.',
      ph:'Do not cover backend architecture; exclude iOS app' },
    { key:'priority', label:'Priority (optional)', type:'text',
      desc:'Mark which W/H is most critical (e.g., Why > Who > What).',
      ph:'Why, then Who' }
  ],
  template: ({ who, what, where, when, why, how, not, priority, ctx }) => [
    'Use 5W1H to clarify scope and intent.',
    ctx && `Context: ${ctx}`,
    who   && `Who: ${who}`,
    what  && `What: ${what}`,
    where && `Where: ${where}`,
    when  && `When: ${when}`,
    why   && `Why: ${why}`,
    how   && `How:\n${how}`,
    not   && `Not in scope:\n${not}`,
    priority && `Priority: ${priority}`,
    'Synthesis:\n- Summarize the answers into a 1–2 paragraph plan.\n- Ensure completeness across all six dimensions.\n- Flag any gaps or conflicts.\n- Propose 1 clarifying question if needed.\n\nChecklist:\n- [ ] All six answered\n- [ ] Who ↔ Why consistent\n- [ ] Scope boundaries noted'
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
},

{
  id: 'random_assoc',
  slug: 'random-association',
  label: 'Random Association — Combine unrelated ideas',
  kind: 'pattern',
  categories: ['creativity', 'ideation'],
  tags: ['type:technique', 'topic:random', 'use:brainstorm', 'level:beginner'],
  use_cases: [
    'break creative block with random prompts',
    'discover unconventional ideas by forced connections'
  ],
  boosters: [
    'Pick truly unrelated elements for bigger creativity leaps.',
    'Encourage humorous or absurd connections; even silly ideas can contain a seed of insight.'
  ],
  definition: 'A method to introduce two random, unrelated items or concepts and force a connection between them, spurring innovative thinking by linking disparate ideas:contentReference[oaicite:0]{index=0}.',
  help: 'Provide a short description of your problem or topic. Optionally, suggest two random elements (objects, concepts) to connect. The model will find creative ways to link these with your problem, generating novel ideas.',
  fields: [
    { key: 'problem', label: 'Problem or topic', type: 'textarea', ph: 'e.g., Improving public transportation' },
    { key: 'random1', label: 'Random element 1 (optional)', type: 'text', ph: 'e.g., Coffee mug' },
    { key: 'random2', label: 'Random element 2 (optional)', type: 'text', ph: 'e.g., Jellyfish' }
  ],
  template: ({ problem, random1, random2, ctx }) => [
    'Apply Random Association to spur new ideas.',
    ctx && `Context: ${ctx}`,
    problem && `Problem: ${problem}`,
    random1 && `Random element 1: ${random1}`,
    random2 && `Random element 2: ${random2}`,
    !random1 && !random2 && 'Pick two unrelated concepts and connect them to the problem.',
    'List creative ideas combining these elements with the problem context.'
  ].filter(Boolean).join('\n')
},

{
  id: 'role_storming',
  slug: 'role-storming',
  label: 'Role Storming — Ideation as different personas',
  kind: 'pattern',
  categories: ['creativity', 'ideation'],
  tags: ['type:technique', 'topic:role-play', 'use:brainstorm', 'level:beginner'],
  use_cases: [
    'get fresh ideas by changing perspective',
    'uncover insights via imaginary roles'
  ],
  boosters: [
    'Adopt extreme or unusual personas to push boundaries of thinking.',
    'Stay in character for each role to fully explore its viewpoint before switching.'
  ],
  definition: 'A brainstorming variation where you imagine yourself (or your team) in a different role or persona and generate ideas from that perspective:contentReference[oaicite:1]{index=1}. By role-playing as someone else (e.g., a customer, a famous innovator), you can gain new insights and break habitual thinking.',
  help: 'Describe your problem or goal. Optionally list specific roles to adopt (one per line). The model will generate ideas from the perspective of each role in turn.',
  fields: [
    { key: 'problem', label: 'Problem or goal', type: 'textarea', ph: 'e.g., Increase recycling participation' },
    { key: 'roles', label: 'Roles or personas (one per line)', type: 'textarea', ph: 'e.g., Environmental activist\nCity mayor\nElementary school student' }
  ],
  template: ({ problem, roles, ctx }) => [
    'Apply Role Storming to generate ideas from different perspectives.',
    ctx && `Context: ${ctx}`,
    problem && `Problem: ${problem}`,
    roles
      ? 'Roles:\n' + String(roles).split(/\n+/).map(r => `- ${r}`).join('\n')
      : 'Role: (the assistant will assume an imaginative persona if none provided)',
    'For each role, imagine how that persona would approach the problem and list their ideas or solutions.'
  ].filter(Boolean).join('\n')
},

{
  id: 'mind_map',
  slug: 'mind-mapping',
  label: 'Mind Mapping — Visual cluster of ideas',
  kind: 'pattern',
  categories: ['creativity', 'organization'],
  tags: ['type:technique', 'topic:mind-map', 'use:ideas', 'level:beginner'],
  use_cases: [
    'brainstorm non-linearly around a central idea',
    'see connections among subtopics'
  ],
  boosters: [
    'Allow partial or fragmented thoughts; organize them later into branches.',
    'Use indentation or bullet nesting to mimic the structure of a mind map.'
  ],
  definition: 'A visual brainstorming technique where you write a central concept and branch out with associated ideas in an organic, non-linear manner:contentReference[oaicite:2]{index=2}. Mind mapping leverages associative thinking by connecting related ideas in clusters around the main topic, which can stimulate holistic and imaginative thought:contentReference[oaicite:3]{index=3}.',
  help: 'State the central topic. Optionally list some initial subtopics or first-level branches (one per line). The model will expand on each branch with sub-ideas and show connections between them in an outline form.',
  fields: [
    { key: 'topic', label: 'Central topic', type: 'text', ph: 'e.g., Renewable Energy' },
    { key: 'branches', label: 'Primary branches (optional, one per line)', type: 'textarea', ph: 'e.g., Solar\nWind\nHydro\nGeothermal' }
  ],
  template: ({ topic, branches, ctx }) => [
    'Create a Mind Map of ideas.',
    ctx && `Context: ${ctx}`,
    topic && `Central Topic: ${topic}`,
    branches
      ? 'Primary Branches:\n' + String(branches).split(/\n+/).map(b => `- ${b}`).join('\n')
      : 'Think of major subtopics branching out from the central topic.',
    'Expand each branch with sub-ideas, using indented bullet points to show connections.'
  ].filter(Boolean).join('\n')
},

{
  id: 'wishing',
  slug: 'wishing-technique',
  label: 'Wishing — Imagine ideal solutions',
  kind: 'pattern',
  categories: ['creativity', 'ideation'],
  tags: ['type:technique', 'topic:ideation', 'use:brainstorm', 'level:beginner'],
  use_cases: [
    'think beyond realistic constraints',
    'identify features of an ideal outcome'
  ],
  boosters: [
    'Encourage even absurd or impossible wishes; they can spark real ideas:contentReference[oaicite:4]{index=4}.',
    'After listing wishes, examine each to find elements you *can* actually implement.'
  ],
  definition: 'An ideation method where you freely wish for the perfect or even impossible solutions to a problem:contentReference[oaicite:5]{index=5}. By articulating “magic wand” wishes without restraint, you can then work backward to figure out how to incorporate aspects of those ideal solutions into practical reality:contentReference[oaicite:6]{index=6}.',
  help: 'Describe your problem or goal. The model will generate a list of "I wish..." statements – ideal, unconstrained solutions – and then suggest ways to adapt elements of those wishes into feasible ideas or actions.',
  fields: [
    { key: 'problem', label: 'Problem or goal', type: 'textarea', ph: 'e.g., Traffic congestion in city center' }
  ],
  template: ({ problem, ctx }) => [
    'Use the Wishing technique to generate ideal solutions.',
    ctx && `Context: ${ctx}`,
    problem && `Problem: ${problem}`,
    'First, list several "I wish..." statements describing perfect-world solutions, even if they are impractical.',
    'Then, for each wish, suggest how a part of it could be adapted into a realistic solution or plan.'
  ].filter(Boolean).join('\n')
},

{
  id: 'rapid_ideation',
  slug: 'rapid-ideation',
  label: 'Rapid Ideation — Timed idea sprint',
  kind: 'technique',
  categories: ['creativity', 'ideation'],
  tags: ['type:technique', 'topic:brainstorm', 'use:quantity-over-quality', 'level:beginner'],
  use_cases: [
    'generate lots of ideas under time pressure',
    'overcome creative block by not overthinking'
  ],
  boosters: [
    'Suspend judgment during the idea sprint – no idea is too silly initially:contentReference[oaicite:7]{index=7}.',
    'Set a clear timer or target idea count; the constraint can boost focus and output.'
  ],
  definition: 'A brainstorming approach focusing on quantity over quality: set a short time limit and produce as many ideas as possible without filtering:contentReference[oaicite:8]{index=8}. The goal is to bypass your inner critic and get a broad list of thoughts, which can later be reviewed for viable options or refined ideas.',
  help: 'State the problem or question. Optionally specify a time limit or target number of ideas. The model will simulate a rapid ideation session, listing a high number of quick ideas, then help highlight the most promising ones for further exploration.',
  fields: [
    { key: 'problem', label: 'Problem or question', type: 'textarea', ph: 'e.g., New app features to engage users' },
    { key: 'time', label: 'Time/quantity constraint (optional)', type: 'text', ph: 'e.g., 5 minutes or 20 ideas' }
  ],
  template: ({ problem, time, ctx }) => [
    'Conduct Rapid Ideation to generate many ideas quickly.',
    ctx && `Context: ${ctx}`,
    problem && `Focus: ${problem}`,
    time && `Constraint: ${time}`,
    'Brainstorm as many ideas as possible without self-censorship or evaluation.',
    'Afterwards, review the list and highlight a few of the most promising or intriguing ideas for development.'
  ].filter(Boolean).join('\n')
},

{
  id: 'trigger_storming',
  slug: 'trigger-storming',
  label: 'Trigger Storming — Prompt-based brainstorming',
  kind: 'technique',
  categories: ['creativity', 'ideation'],
  tags: ['type:technique', 'topic:prompts', 'use:brainstorm', 'level:intermediate'],
  use_cases: [
    'spark discussion with provocative prompts',
    'generate ideas from abstract or incomplete statements'
  ],
  boosters: [
    'Use unusual or even provocative triggers to jolt thinking in new directions:contentReference[oaicite:9]{index=9}.',
    'Build on whatever associations the trigger evokes, no matter how tangential or odd they seem.'
  ],
  definition: 'A brainstorming method where you use specific prompts or "triggers" – such as open-ended sentences or abstract statements – to inspire new thoughts:contentReference[oaicite:10]{index=10}. The triggers are designed to provoke or challenge assumptions, helping the group or individual break out of conventional ideas.',
  help: 'Provide your problem or topic. Optionally include some trigger prompts (one per line). The model will either use your triggers or generate its own, then explore ideas that arise from responding to each trigger.',
  fields: [
    { key: 'problem', label: 'Problem or topic', type: 'textarea', ph: 'e.g., Low participation in community events' },
    { key: 'triggers', label: 'Custom triggers (optional, one per line)', type: 'textarea', ph: 'e.g., "What if nobody had cars?"\n"Imagine this problem 50 years in the future..."' }
  ],
  template: ({ problem, triggers, ctx }) => [
    'Apply Trigger Storming with prompts to spur ideas.',
    ctx && `Context: ${ctx}`,
    problem && `Problem: ${problem}`,
    triggers
      ? 'Triggers:\n' + String(triggers).split(/\n+/).map(t => `- ${t}`).join('\n')
      : 'Trigger: (the assistant will provide provocative prompts related to the topic)',
    'For each trigger, respond with ideas or insights it inspires. Finally, compile the most useful ideas from these responses.'
  ].filter(Boolean).join('\n')
},

{
  id: 'what_if',
  slug: 'what-if-scenarios',
  label: 'What If — Scenario reframing questions',
  kind: 'technique',
  categories: ['creativity', 'ideation'],
  tags: ['type:technique', 'topic:reframing', 'use:brainstorm', 'level:beginner'],
  use_cases: [
    'reframe a problem by changing context or constraints',
    'explore alternative outcomes or perspectives'
  ],
  boosters: [
    'Pose wild "what if" questions beyond realistic bounds to expand thinking:contentReference[oaicite:11]{index=11}.',
    'After exploring an imagined scenario, extract any ideas that could be applied (even partially) to the real situation.'
  ],
  definition: 'A technique of reframing problems by asking "What if...?" questions that introduce new scenarios or constraints:contentReference[oaicite:12]{index=12}. By imagining how the issue would look under different circumstances (e.g., different people, times, or rules), you gain fresh perspectives that can lead to innovative solutions.',
  help: 'Describe your problem. Optionally provide a specific "What if" scenario to explore. The model will propose its own additional "What if" questions, examine each hypothetical scenario, and then connect insights back to your actual problem.',
  fields: [
    { key: 'problem', label: 'Problem or topic', type: 'textarea', ph: 'e.g., Difficulty in remote team collaboration' },
    { key: 'scenario', label: 'What-if scenario (optional)', type: 'text', ph: 'e.g., All communication had to be asynchronous' }
  ],
  template: ({ problem, scenario, ctx }) => [
    'Use the "What If" method to rethink the problem via alternate scenarios.',
    ctx && `Context: ${ctx}`,
    problem && `Problem: ${problem}`,
    scenario && `Scenario to explore: What if ${scenario}?`,
    'Propose a few other "What if...?" questions that dramatically change some aspect of the problem.',
    'For each hypothetical question, explore how the situation and solutions might differ.',
    'Finally, identify any useful insights from these scenarios that could inform real-world solutions.'
  ].filter(Boolean).join('\n')
},

{
  id: 'freewrite',
  slug: 'freewriting-zero-draft',
  label: 'Freewriting — Unfiltered Stream of Thought (Zero Draft)',
  kind: 'technique',
  categories: [
    'creativity','writing','self-reflection',
    'creativity techniques','mental health','productivity','coaching'
  ],
  tags: [
    'type:technique','topic:writing','topic:flow-state','topic:idea-generation',
    'topic:subconscious','topic:unblocking',
    'use:brainstorm','use:prewriting','use:therapy-journaling',
    'use:creative-block','use:idea-mining','level:beginner'
  ],
  use_cases: [
    'Overcome writer’s block or creative block.',
    'Discover latent ideas by writing without stopping.',
    'Generate raw content for later essays, stories, or articles.',
    'Surface hidden emotions or subconscious associations.',
    'Warm-up exercise before structured work or research.',
    'Kick off group workshops or brainstorming sessions.',
    'Explore metaphors and imagery for fiction or poetry.',
    'Reveal subconscious patterns useful in therapy or coaching.'
  ],
  boosters: [
    'Do not stop or edit mid-flow; even nonsense is acceptable in the draft.',
    'If stuck, keep typing the same word or phrase until new thoughts emerge.',
    'Use looping: after finishing, pull out a phrase and restart writing from it.',
    'Allow emotional honesty; if strong feelings surface, capture them without judgment.',
    'After the freewrite, highlight surprising phrases, images, or insights for further use.',
    'Experiment with sensory writing: describe sounds, smells, textures.',
    'Switch perspective mid-way (write as a rival, child, or future self).',
    'Apply playful constraints (no adjectives, only questions, all ocean metaphors).'
  ],
  definition: 'A technique where you write continuously about a topic without worrying about structure, grammar, or correctness. Also called a “zero draft,” it helps bypass inner censorship, overcome creative block, and produce raw material for later refinement.',
  help: 'Provide a topic, emotion, or question to explore. Optionally add time, length, or constraints. The model will generate a continuous freewriting draft, then highlight key patterns, images, and next steps.',
  fields: [
    { key: 'topic', label: 'Topic, question, or emotion', type: 'textarea',
      desc: 'What you want to explore — could be a subject, feeling, or random prompt.',
      ph: 'e.g., Reflections on technology in education; “Why am I restless today?”' },
    { key: 'timer', label: 'Timebox (optional)', type: 'text',
      desc: 'How long you want to freewrite (minutes). Short = 5, Long = 20.',
      ph: 'e.g., 10 minutes' },
    { key: 'tone', label: 'Starting tone (optional)', type: 'text',
      desc: 'Initial mood or style to begin with. It may shift mid-flow.',
      ph: 'Reflective, ranting, playful, meditative' },
    { key: 'length', label: 'Target length (optional)', type: 'text',
      desc: 'Approximate target word count or paragraphs.',
      ph: 'e.g., 300 words; 3 paragraphs' },
    { key: 'constraints', label: 'Constraints (optional)', type: 'textarea',
      desc: 'Rules or limits to spark creativity.',
      ph: 'e.g., Only questions; all sentences start with “What if…”' },
    { key: 'persona_voice', label: 'Persona voice (optional)', type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Write in the perspective of a persona or role (e.g., Pirate, Future Self, Therapist).',
      ph: 'Start typing to pick a persona...' },
    { key: 'postprocess', label: 'Post-processing focus (optional)', type: 'textarea',
      desc: 'How you want to analyze or use the draft afterward.',
      ph: 'Summarize key themes; extract story ideas; highlight emotions.' }
  ],
  template: ({ topic, timer, tone, length, constraints, persona_voice, postprocess, ctx }) => [
    'Begin a Freewriting (Zero Draft) session.',
    ctx && `Context: ${ctx}`,
    topic && `Topic: ${topic}`,
    timer && `Timebox: ${timer}`,
    tone && `Starting tone: ${tone}`,
    length && `Target length: ${length}`,
    constraints && `Constraints: ${constraints}`,
    persona_voice && (
      'Persona voice:\n' +
      String(persona_voice).split(/\n+/).map((p,i)=>`${i+1}. ${p}`).join('\n')
    ),
    '---',
    'Stream of Consciousness Draft (no edits, raw flow):',
    '... (continuous unfiltered writing here) ...',
    '---',
    postprocess && `Post-process: After the draft, ${postprocess}`,
    'Output:\n1) Raw unfiltered draft\n2) Highlighted phrases, images, or patterns\n3) One-sentence summary of surprising or useful insights\n4) Suggested next step: how to use the material'
  ].filter(Boolean).join('\n')
},

{
  id: 'oblique_strategies',
  slug: 'oblique-strategies-cards',
  label: 'Oblique Strategies — Lateral thinking prompt cards',
  kind: 'technique',
  categories: ['creativity', 'ideation'],
  tags: ['type:technique', 'topic:cards', 'use:creative-block', 'level:intermediate'],
  use_cases: [
    'break out of a creative rut with random prompts',
    'find new approaches when stuck on an artistic problem'
  ],
  boosters: [
    'Interpret the card prompts loosely; any personal meaning you derive is valid:contentReference[oaicite:14]{index=14}.',
    'If a prompt seems cryptic or disruptive, embrace it — use it as an opportunity to change your approach entirely.'
  ],
  definition: 'A card-based method invented by musician Brian Eno and artist Peter Schmidt to overcome creative blocks:contentReference[oaicite:15]{index=15}. Each Oblique Strategies card presents a cryptic instruction or dilemma (e.g., "Remove specifics and convert to ambiguities") designed to break down artistic barriers and spark creative insight:contentReference[oaicite:16]{index=16}. Following these prompts encourages lateral thinking. Similarly, some creators use random oracle systems (like the I Ching, as John Cage did) for the same purpose of injecting randomness to spur innovation:contentReference[oaicite:17]{index=17}.',
  help: 'Describe your situation or creative project where you feel stuck. The model will draw an "Oblique Strategy" card (a random abstract prompt) and present it. Then it will help you interpret that prompt in the context of your situation and suggest ways it could inspire a next step or solution.',
  fields: [
    { key: 'situation', label: 'Creative situation or block', type: 'textarea', ph: 'e.g., Stuck on the melody for a song' },
    { key: 'draws', label: 'Number of cards to draw (optional)', type: 'text', ph: 'e.g., 1 or 2' }
  ],
  template: ({ situation, draws, ctx }) => [
    'Use Oblique Strategies to generate lateral thinking prompts.',
    ctx && `Context: ${ctx}`,
    situation && `Situation: ${situation}`,
    `Draw ${draws || 1} prompt card(s) and apply the instruction(s) to the situation.`,
    'For each drawn prompt, consider its meaning and brainstorm how to apply it to your work or problem.'
  ].filter(Boolean).join('\n')
},

{
  id: 'disney_creative',
  slug: 'disney-dreamer-realist-critic',
  label: 'Disney Strategy — Dreamer · Realist · Critic',
  kind: 'framework',
  categories: ['creativity','evaluation','storytelling'],
  tags: [
    'type:framework','topic:perspective-taking','topic:iteration',
    'use:develop-idea','use:creative-randomness','use:innovation-sprints','use:team-workshops',
    'level:intermediate'
  ],
  use_cases: [
    'develop an idea from wild concept to practical plan',
    'balance imaginative thinking with realism and critical review',
    'loop ideas through multiple creative lenses',
    'run innovation sprints or workshops with role rotation',
    'teach creative problem-solving through structured perspectives'
  ],
  definition: 'A structured creative process (from Walt Disney, modeled by Robert Dilts) that cycles through Dreamer (imagination), Realist (planning), and Critic (evaluation). Iterative looping transforms wild ideas into feasible, ethical, and innovative plans while preserving imaginative richness.',
  help: 'Provide an idea or project to develop. Begin with Dreamer ideas (suspend all judgment). Translate selected ideas into Realist steps grounded in resources and constraints. Critic evaluates risks and ethics, but must pair each flaw with a mitigation. Observer reflects on balance and suggests looping back to Dreamer. Use different voices or spaces for each role to encourage perspective shift.',
  boosters: [
    'Dreamer: Generate ≥5 ideas, with ≥2 absurd or magical. Suspend judgment completely.',
    'Realist: Translate at least 1 Dreamer idea into concrete steps, including timeline or milestones.',
    'Critic: Each risk/weakness must propose a fix or mitigation, not just a flaw.',
    'Critic: Explicitly check for cultural/ethical inclusivity.',
    'Observer: Reflect on balance and propose the next loop back to Dreamer.',
    'End with a checklist confirming all roles contributed.'
  ],
  fields: [
    { key: 'idea', label: 'Idea or project description', type: 'textarea',
      ph: 'e.g., A device that translates animal thoughts into human language' },
    { key: 'dreamer_seed', label: 'Dreamer seed (optional)', type: 'textarea',
      ph: 'Image, theme, metaphor, or random word to spark ideas' },
    { key: 'dream_triggers', label: 'Dreamer triggers (optional)', type: 'textarea',
      ph: 'Random word, metaphor, or character to inspire dreaming' },

    // NEW FIELD
    {
      key: 'dreamer_persona',
      label: 'Dreamer’s Persona',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->textarea',
      ph: 'Start typing to pick one or more personas for the Dreamer role'
    },

    { key: 'constraints', label: 'Constraints (Realist must respect)', type: 'textarea',
      ph: 'Budget, time, tech limits' },
    { key: 'realist_resources', label: 'Resources available (optional)', type: 'textarea',
      ph: 'Funding, team, tools, partnerships' },
    { key: 'critic_focus', label: 'Critic focus (optional)', type: 'textarea',
      ph: 'Lens for critique: technical, financial, ethical, cultural' },
    { key: 'ethics', label: 'Ethical/cultural considerations', type: 'textarea',
      ph: 'Potential bias, sustainability, inclusivity' },
    { key: 'observer', label: 'Observer reflection (optional)', type: 'textarea',
      ph: 'What balance or insight emerged?' }
  ],
  template: ({ idea, dreamer_seed, dream_triggers, dreamer_persona, constraints, realist_resources, critic_focus, ethics, observer, ctx }) => [
    'Apply the Disney Creative Strategy.',
    ctx && `Context: ${ctx}`,
    idea && `Idea: ${idea}`,
    dreamer_seed && `Dreamer seed:\n${dreamer_seed}`,
    dream_triggers && `Dreamer triggers:\n${dream_triggers}`,
    dreamer_persona && (
      'Dreamer’s Persona(s):\n' +
      String(dreamer_persona).split(/\n+/).map(s => s.trim()).filter(Boolean).map((x,i)=>`${i+1}. ${x}`).join('\n')
    ),
    constraints && `Constraints:\n${constraints}`,
    realist_resources && `Resources available:\n${realist_resources}`,
    critic_focus && `Critic focus:\n${critic_focus}`,
    ethics && `Ethical/cultural considerations:\n${ethics}`,
    '---',
    'Dreamer: Bold, playful, and unconstrained ideas (≥5, include magical/absurd). Use Dreamer’s Persona(s) to guide imagination.',
    'Realist: Translate selected Dreamer ideas into concrete plans, with timeline and resources, respecting constraints.',
    'Critic: Identify risks and weaknesses (technical, ethical, cultural), but pair each with mitigation.',
    observer && ('Observer:\n' + observer),
    'Output:\n1) Dreamer ideas\n2) Realist plan\n3) Critic risks + fixes\n4) Observer reflection',
    'Checklist:\n- [ ] ≥5 Dreamer ideas\n- [ ] Dreamer personas included\n- [ ] Realist plan respects constraints/resources\n- [ ] Critic includes fixes & ethical checks\n- [ ] Observer reflection included'
  ].filter(Boolean).join('\n')
},

{
  id: 'synectics',
  slug: 'synectics-analogies',
  label: 'Synectics — Analogies & Problem Transfer',
  kind: 'framework',
  categories: ['creativity', 'problem-solving'],
  tags: ['type:framework', 'topic:analogies', 'use:innovate', 'level:advanced'],
  use_cases: [
    'find solutions by drawing analogies from unrelated domains',
    'unstick a problem by reframing it in a different context'
  ],
  boosters: [
    'Encourage wild analogies – even if the link is tenuous, it may spark a novel idea:contentReference[oaicite:24]{index=24}.',
    'After solving the analogy problem, carefully map the insights back to the original problem to ensure relevance:contentReference[oaicite:25]{index=25}.'
  ],
  definition: 'A creative problem-solving approach that "joins together different and apparently irrelevant elements" by using analogies:contentReference[oaicite:26]{index=26}. In Synectics, you reframe the problem into an analogous situation in a distant or unrelated context (using direct, personal, symbolic, or fantasy analogies):contentReference[oaicite:27]{index=27}, brainstorm solutions for that analogy, and then translate those solutions back to the original problem:contentReference[oaicite:28]{index=28}. This leverages the mind’s ability to find connections and can yield truly novel solutions.',
  help: 'Describe your problem. Optionally suggest a domain or scenario to use as an analogy. The model will rephrase your problem as an analogy in another context, solve that analogous problem, and then map the insights back to your original situation.',
  fields: [
    { key: 'problem', label: 'Original problem', type: 'textarea', ph: 'e.g., Improving team communication' },
    { key: 'analogy', label: 'Analogy scenario (optional)', type: 'text', ph: 'e.g., An ant colony coordinating tasks' }
  ],
  template: ({ problem, analogy, ctx }) => [
    'Use Synectics to solve the problem via analogies.',
    ctx && `Context: ${ctx}`,
    problem && `Original Problem: ${problem}`,
    analogy
      ? `Analogy: Imagine the problem in a different context — ${analogy}.`
      : 'Analogy: Transform the problem into a different context (choose an unrelated scenario with a similar core issue).',
    'In that analogy scenario, brainstorm solutions to the analogous problem.',
    'Now translate those solutions back to the original context and suggest how they can apply to the original problem.'
  ].filter(Boolean).join('\n')
},

{
  id: 'active_imagination',
  slug: 'active-imagination-dialogue',
  label: 'Active Imagination — Dialogue with Inner Voices',
  kind: 'technique',
  categories: ['psychology','creativity','self-reflection','symbolic-dialogue'],
  tags: [
    'type:technique','topic:jungian','topic:archetypes','topic:dreamwork','topic:imagination',
    'use:self-reflection','use:shadow-work','use:creative-insight','use:archetype-exploration',
    'use:creative-writing','use:therapeutic-dialogue',
    'level:advanced','method:dialogue'
  ],
  use_cases: [
    'gain insight by conversing with parts of yourself or imagined characters',
    'resolve inner conflicts through symbolic dialogue',
    'explore archetypes such as Shadow, Inner Child, or Sage',
    'unlock creative or unconscious material for art, writing, or problem-solving',
    'process dreams or symbolic imagery',
    'develop characters or themes for creative writing'
  ],
  boosters: [
    'Maintain a consistent voice for each inner figure; let them sound distinct from the Self.',
    'Allow symbolic or metaphorical language if it arises; do not over-rationalize.',
    'If new figures emerge, introduce them naturally and allow them to interact.',
    'Ensure the Self pauses at intervals to reflect on what was revealed.',
    'If strong emotion arises, pause to note it explicitly before continuing.',
    'Dialogue should run at least 3–5 exchanges before synthesis.',
    'Conclude with reflection and, if useful, an integration step (action, ritual, or affirmation).',
    'If a voice becomes overwhelming, return to the Self and close with grounding.'
  ],
  definition: 'A Jungian method for engaging the unconscious by entering into dialogue with inner figures or voices. The process surfaces hidden thoughts, emotions, archetypes, and symbols, bridging conscious and unconscious and fostering creativity, healing, and self-awareness.',
  help: 'Start with an intention, question, or mood. Choose one or more inner figures (e.g., Inner Critic, Shadow, Guide). The model will script a dialogue where Self and the inner figures exchange perspectives. Allow new figures or symbols to appear naturally. Conclude by synthesizing insights, themes, or imagery, and consider a closing ritual to integrate the experience.',
  fields: [
    { key: 'intention', label: 'Intention or entry question (optional)', type: 'textarea',
      ph: 'e.g., What is blocking my creativity? What do I need to learn?' },
    { key: 'issue', label: 'Issue or theme to explore', type: 'textarea',
      ph: 'e.g., Feeling blocked in my creative work' },
    {
      key: 'figures',
      label: 'Inner figure(s) or voices',
      type: 'repeater',
      itemType: 'typeahead',
      autofill: 'persona->inline',
      itemLabel: 'figure',
      min: 1,
      max: 5,
      ph: 'Start typing to pick or name an inner voice (e.g., Inner Critic, Wise Old Man, Future Self)…'
    },
    { key: 'tone', label: 'Tone/style of the voices (optional)', type: 'text',
      ph: 'e.g., Harsh, playful, wise, cryptic' },
    { key: 'scenario', label: 'Scenario or mood (optional)', type: 'textarea',
      ph: 'Describe the emotional entry point, e.g., “I felt anxious before bed.”' },
    { key: 'symbols', label: 'Symbols or imagery (optional)', type: 'textarea',
      ph: 'Any recurring images, dream fragments, colors, animals, places…' },
    { key: 'closing', label: 'Closing ritual or integration step (optional)', type: 'textarea',
      ph: 'e.g., Thank the figure, visualize integration, commit to one action' }
  ],
  template: ({ intention, issue, figures, tone, scenario, symbols, closing, ctx }) => [
    'Initiate an Active Imagination dialogue.',
    ctx && `Context: ${ctx}`,
    intention && `Intention/entry question: ${intention}`,
    issue && `Issue: ${issue}`,
    scenario && `Scenario/mood: ${scenario}`,
    figures && (
      'Inner figures:\n' + String(figures)
        .split(/\n+/).map(s => s.trim()).filter(Boolean)
        .map((x,i) => `${i+1}. ${x}${tone ? ` (tone: ${tone})` : ''}`)
        .join('\n')
    ),
    symbols && `Symbols/imagery: ${symbols}`,
    'Dialogue:\nSelf: (Begin by addressing the figure(s) about the issue.)\n<Each figure responds in turn, with distinct voices>\n... (Continue alternating for at least 3–5 exchanges) ...',
    'Synthesis:\nSummarize in 2–3 sentences the main insights, archetypes, or symbols revealed.',
    closing && `Closing ritual/integration: ${closing}`,
    'Checklist:\n- [ ] At least one intention/question stated\n- [ ] Distinct voices for each figure\n- [ ] Dialogue runs multiple exchanges\n- [ ] Symbols noted and reflected on\n- [ ] Concluding synthesis provided\n- [ ] Optional closing ritual/integration step recorded'
  ].filter(Boolean).join('\n')
},

{
  id: 'head_heart_gut',
  slug: 'head-heart-gut-decision',
  label: 'Head-Heart-Gut — Rational · Emotional · Instinctual check',
  kind: 'framework',
  categories: ['decision-making', 'self-reflection'],
  tags: ['type:framework', 'topic:embodied-cognition', 'use:decision-support', 'level:intermediate'],
  use_cases: [
    'make well-rounded decisions considering logic, feelings, and intuition',
    'resolve internal conflict by aligning thoughts, values, and instincts'
  ],
  boosters: [
    'Acknowledge differences: it’s normal if Head, Heart, and Gut say different things:contentReference[oaicite:37]{index=37}.',
    'If one perspective (e.g., Gut) flags a concern the others don’t, take it seriously and investigate that aspect further:contentReference[oaicite:38]{index=38}.'
  ],
  definition: 'A decision-making technique that ensures you consider three facets of knowing: the Head (intellect and logic), the Heart (emotions and values), and the Gut (intuition and instinct):contentReference[oaicite:39]{index=39}. Each of these "three brains" provides essential information – the Head analyzes data and facts, the Heart weighs what matters to you emotionally, and the Gut offers instinctive insights:contentReference[oaicite:40]{index=40}. Checking in with all three leads to choices that are more balanced and authentic:contentReference[oaicite:41]{index=41}.',
  help: 'State the decision or dilemma you are facing. The model will articulate three perspectives on it: what your Head thinks (rational analysis), what your Heart feels (emotional standpoint), and what your Gut says (instinctual response). It will then help integrate these perspectives into a final recommendation.',
  fields: [
    { key: 'decision', label: 'Decision or question', type: 'textarea', ph: 'e.g., Whether to accept a new job offer in another city' }
  ],
  template: ({ decision, ctx }) => [
    'Perform a Head-Heart-Gut decision analysis.',
    ctx && `Context: ${ctx}`,
    decision && `Decision: ${decision}`,
    'Head (Logical Perspective): ...',
    'Heart (Emotional Perspective): ...',
    'Gut (Instinctual Perspective): ...',
    'Conclusion: Synthesize the reasoning, feelings, and intuition into one decision or actionable plan.'
  ].filter(Boolean).join('\n')
},

{
  id: 'hypnagogic_spark',
  slug: 'hypnagogic-spark-creativity',
  label: 'Hypnagogic Spark — Semi-sleep insight technique',
  kind: 'technique',
  categories: ['creativity', 'brainstorming'],
  tags: ['type:technique', 'topic:consciousness', 'use:creative-block', 'level:advanced'],
  use_cases: [
    'find novel ideas by tapping the twilight state between waking and sleeping',
    'generate creative solutions through relaxed, dreamlike thinking'
  ],
  boosters: [
    'If doing this in real life, hold an object (like Dalí’s spoon or a set of keys) so it drops when you doze off, waking you up to capture ideas:contentReference[oaicite:42]{index=42}.',
    'In the simulation, allow thoughts to become slightly surreal or illogical – this mimics the hypnagogic state where unique connections form:contentReference[oaicite:43]{index=43}:contentReference[oaicite:44]{index=44}.'
  ],
  definition: 'A creativity technique famously used by inventor Thomas Edison and artist Salvador Dalí, involving the brief moments of semi-sleep (the hypnagogic state) to capture imaginative insights:contentReference[oaicite:45]{index=45}. The person lets their mind drift toward sleep and then interrupts it (for example, by a falling object that wakes them) to recall the fleeting, dreamlike ideas that surface:contentReference[oaicite:46]{index=46}. This early sleep stage (N1) lasts only a few minutes but is considered an "ideal cocktail for creativity" where reality blurs with imagination:contentReference[oaicite:47]{index=47}.',
  help: 'Describe the problem or topic you want to get new ideas about. The model will mimic a hypnagogic brainstorming session: first producing a series of dreamy, free-associative thoughts related to the topic (as if half-asleep), and then "waking up" to interpret those strange ideas and highlight any useful insights.',
  fields: [
    { key: 'problem', label: 'Problem or topic to drift on', type: 'textarea', ph: 'e.g., Designing a new kind of umbrella' }
  ],
  template: ({ problem, ctx }) => [
    'Use the Hypnagogic Spark technique for fresh insights.',
    ctx && `Context: ${ctx}`,
    problem && `Focus problem: ${problem}`,
    '...(Imagine drifting into a light semi-dream state while thinking about the problem)...',
    'Hypnagogic impressions: (List a few whimsical or surreal thoughts/ideas that come to mind in this drowsy state)',
    '...(Now imagine "waking up")...',
    'Review these odd ideas and interpret how one or more of them could inspire a real solution or creative direction for the problem.'
  ].filter(Boolean).join('\n')
},

{
  id: 'parts_work',
  slug: 'parts-work-dialogue',
  label: 'Parts Work Dialogue (IFS therapy)',
  kind: 'pattern',
  categories: ['psychology', 'self-reflection'],
  tags: [
    'type:pattern','topic:parts-work','topic:IFS','level:intermediate',
    'use:internal-conflict','use:self-discovery','use:trauma-processing'
  ],
  use_cases: [
    'resolve internal conflicts by giving each part a voice',
    'understand the needs and fears of your inner “family” members',
    'foster self-compassion by mediating between your inner voices'
  ],
  boosters: [
    'Clearly define each part’s role (e.g., Inner Critic vs. Vulnerable Child).',
    'Allow each part to speak without judgment, then have your core Self respond with empathy.'
  ],
  definition: 'An internal dialogue technique (from Internal Family Systems therapy) where you personify and converse with different parts of yourself to unearth and harmonize conflicting inner voices.',
  help: 'Name two parts of you in tension (e.g., a protective part and a wounded part), plus any context about their conflict. The model will script a dialogue between them, facilitated by your core Self.',
  fields: [
    { key: 'part_a', label: 'Part A (name/role)', type: 'text', ph: 'e.g., Inner Critic' },
    { key: 'part_b', label: 'Part B (name/role)', type: 'text', ph: 'e.g., Inner Child' },
    { key: 'issue',  label: 'Conflict or concern between them', type: 'textarea', ph: 'Briefly describe what they disagree on or feel.' }
  ],
  template: ({ part_a, part_b, issue, ctx, audience, style, tone }) => [
    'Facilitate a Parts Work dialogue between two inner parts.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    part_a && `Part A: ${part_a}`,
    part_b && `Part B: ${part_b}`,
    issue && `Issue:\n${issue}`,
    'Output:\n1) Dialogue script where Part A and Part B each express their perspective and needs\n2) Interventions or reassurance from the core Self to mediate and move toward understanding'
  ].filter(Boolean).join('\n')
},
{
  id: 'empty_chair',
  slug: 'empty-chair-technique',
  label: 'Empty Chair Dialogue (Gestalt)',
  kind: 'pattern',
  categories: ['psychology', 'self-reflection'],
  tags: [
    'type:pattern','topic:gestalt','topic:empty-chair','level:intermediate',
    'use:resolve-feelings','use:closure','use:internal-conflict'
  ],
  use_cases: [
    'express thoughts and feelings to someone (or a part of yourself) as if they were present',
    'gain closure or clarity by role-playing both sides of a difficult conversation',
    'integrate conflicting feelings by voicing each side in turn'
  ],
  boosters: [
    'Be honest and unfiltered when voicing each side—let emotions flow.',
    'Switch perspective after each statement: fully embody the other person or part when responding.'
  ],
  definition: 'A Gestalt therapy exercise where you imagine someone (or a part of yourself) in an empty chair and have a candid dialogue to express unresolved feelings or internal conflicts.',
  help: 'Pick who you are (or a part of you) and who is “in the chair,” then describe the topic. The model will alternate voices and end with a brief reflection.',
fields: [
  { key: 'you',   label: 'Your identity or role',             type: 'typeahead_textarea', autofill: 'persona->textarea',
    ph: 'Start typing to pick a persona/part (e.g., Inner Critic, Younger Self, Therapist)…' },
  { key: 'other', label: 'Other person or part in the chair', type: 'typeahead_textarea', autofill: 'persona->textarea',
    ph: 'Start typing to pick a persona/part (e.g., My Manager, Future Self)…' },
  { key: 'topic', label: 'Topic or emotion to explore',       type: 'textarea',
    ph: 'Briefly describe the issue, conflict, or feeling you want to address.' }
],

  template: ({ you, other, topic, ctx, audience, style, tone }) => [
  'Use the Empty Chair technique to dialogue between two perspectives.',
  ctx && `Context: ${ctx}`,
  audience && `Audience: ${audience}`,
  style && `Style: ${style}`,
  tone && `Tone: ${tone}`,
  you && `You profile:\n${you}`,
  other && `Other profile:\n${other}`,
  topic && `Topic:\n${topic}`,
  'Output:\n1) Scripted dialogue alternating between You and the Other, each expressing their thoughts/feelings\n2) A concluding reflection or resolution after several exchanges'
].filter(Boolean).join('\n')

},

{
  id: 'somatic_focusing',
  slug: 'somatic-focusing-felt-sense',
  label: 'Somatic Focusing — Feel · Ask · Listen',
  kind: 'pattern',
  categories: ['psychology', 'self-reflection'],
  tags: [
    'type:pattern','topic:somatic','topic:felt-sense','level:intermediate',
    'use:anxiety-management','use:inner-wisdom','use:emotional-processing'
  ],
  use_cases: [
    'tune into a bodily sensation to discover the message or emotion it holds',
    'reduce overwhelm by patiently listening to what your body is telling you',
    'clarify vague feelings by describing them and “asking” them questions'
  ],
  boosters: [
    'Describe the sensation with metaphor (e.g., “a knot of fire in my belly”) to capture its quality.',
    'After describing, gently ask the sensation what it wants or needs, and wait for an intuitive answer.'
  ],
  definition: 'A mindfulness-based introspection where you focus on a physical feeling (“felt sense”), describe it, and then dialogue with it to reveal insights or relief.',
  help: 'Note what you feel in your body (location, quality of sensation) and any context for your feelings. The model will guide you through noticing the sensation, describing it vividly, and intuitively questioning it for understanding.',
  fields: [
    { key: 'sensation', label: 'Bodily sensation (location & quality)', type: 'textarea', ph: 'e.g., A heavy tightness in my chest.' },
    { key: 'context',   label: 'Context or emotion (optional)', type: 'textarea', ph: 'What’s happening or what emotion might be tied to this sensation?' }
  ],
  template: ({ sensation, context, ctx, audience, style, tone }) => [
    'Engage in somatic focusing to interpret a bodily felt sense.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    sensation && `Felt sensation:\n${sensation}`,
    context && `Context:\n${context}`,
    'Output:\n1) Guided description of the sensation (size, shape, color, mood, etc.)\n2) An inquiry where you “ask” the sensation what it signifies or needs\n3) A reflective answer that arises, providing insight or easing the feeling'
  ].filter(Boolean).join('\n')
},
{
  id: 'spoon_planner',
  slug: 'spoon-theory-energy-planner',
  label: 'Energy Budget Planner (Spoon Theory)',
  kind: 'framework',
  categories: ['productivity','self-care','mental health','wellbeing'],
  tags: [
    'type:framework','topic:spoon-theory','topic:energy-management',
    'topic:mental-health','topic:neurodiversity',
    'level:beginner','use:daily-planning','use:adhd','use:chronic-illness',
    'use:burnout-prevention','use:inclusion','use:disability-advocacy',
    'use:self-advocacy','use:therapy-support'
  ],
  use_cases: [
    'Plan your day according to limited energy or focus (“spoons”).',
    'Prioritize tasks when fatigued, neurodivergent, or living with chronic illness.',
    'Balance high-effort tasks with restorative activities to avoid burnout.',
    'Communicate limits and plan accommodations with colleagues, caregivers, or therapists.',
    'Create weekly or cyclical plans aligned with fluctuating energy.',
    'Share energy plans as a self-advocacy tool in health or workplace contexts.'
  ],
  definition: 'Spoon Theory is a planning method from chronic illness and disability advocacy that treats energy or focus as a limited budget (“spoons”) to spend on tasks. This framework helps prioritize, schedule, and balance activities with intentional rest, delegation, and recovery. It supports sustainable productivity, wellbeing, and communication.',
  help: 'Input how many spoons (energy units) you have and list your tasks with estimated spoon costs. Include non-negotiables and restorative activities. Optionally note timeframe, support, or energy boosters. The model will build a plan showing what to do, what to defer, and how to recharge. Review midway and adjust if your spoon levels change.',
  boosters: [
    'Balance each high-cost task with a planned recovery break or restorative activity.',
    'If tasks exceed the spoon budget, propose trade-offs, delegation, or simplifications.',
    'Always include at least one low-spoon backup task to preserve momentum.',
    'Translate spoons into an alternative metaphor (battery %, water jars, rice bowls) if inclusivity or preference suggests it.',
    'Check: Are non-negotiables realistic given today’s spoon budget?',
    'Balance across domains (work, health, social, personal).',
    'Suggest pacing strategies (Pomodoro, zoning, micro-rests).'
  ],
  fields: [
    { key: 'timeframe', label: 'Timeframe', type: 'text',
      desc: 'State whether you are planning for today, this week, or another period.',
      ph: 'e.g., Today / This week' },
    { key: 'spoons', label: 'Available spoons (energy for the day)', type: 'text',
      desc: 'Your estimated energy budget for the chosen timeframe.',
      ph: 'e.g., 10' },
    { key: 'tasks', label: 'Tasks (one per line, with optional spoon cost)', type: 'textarea',
      desc: 'List activities and their estimated spoon costs (1 = easy, 5 = very demanding).',
      ph: 'Do laundry - 2\nFinish report - 4\nCall a friend - 1\nMake dinner - 3' },
    { key: 'nonnegotiables', label: 'Non-negotiable tasks', type: 'textarea',
      desc: 'Tasks that must be done regardless of cost. Use this to surface essentials.',
      ph: 'Pick up medication - 3' },
    { key: 'restoratives', label: 'Restorative activities', type: 'textarea',
      desc: 'Things that help recharge energy during the day.',
      ph: 'Nap - restores 2 spoons\nMeditation - restores 1 spoon' },
    { key: 'delegation_support', label: 'Delegation/support (optional)', type: 'textarea',
      desc: 'Who or what could take tasks off your plate (people, tools, accommodations).',
      ph: 'Spouse does dishes; use grocery delivery app' },
    { key: 'energy_boosters', label: 'Energy boosters (optional)', type: 'textarea',
      desc: 'Small, quick actions that help you recover spoons temporarily.',
      ph: 'Snack, stretch, step outside, hydration' }
  ],
  template: ({ timeframe, spoons, tasks, nonnegotiables, restoratives, delegation_support, energy_boosters, ctx, audience, style, tone }) => [
    'Plan using Spoon Theory (energy budgeting).',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    timeframe && `Timeframe: ${timeframe}`,
    spoons && `Spoons available: ${spoons}`,
    nonnegotiables && `Non-negotiable tasks:\n${nonnegotiables}`,
    tasks && (
      'Tasks:\n' + String(tasks)
        .split(/\n+/)
        .map(s => s.trim())
        .filter(Boolean)
        .map((t,i) => `${i+1}. ${t}`)
        .join('\n')
    ),
    restoratives && `Restorative activities:\n${restoratives}`,
    delegation_support && `Delegation/support:\n${delegation_support}`,
    energy_boosters && `Energy boosters:\n${energy_boosters}`,
    'Output:',
    '1) Spoon budget math: total available vs. planned spend',
    '2) Prioritized task plan with rationale',
    '3) Scheduled rest breaks or restorative activities',
    '4) Delegation/support suggestions',
    '5) Backup low-spoon task(s)',
    '6) Over-budget warning if applicable + trade-offs',
    '7) Alternative metaphor if user prefers',
    'Checklist:\n- [ ] Non-negotiables included\n- [ ] Restoratives balanced\n- [ ] ≥1 low-spoon task available\n- [ ] Delegation considered\n- [ ] Buffer for surprises added'
  ].filter(Boolean).join('\n')
},
{
  id: 'internal_weather',
  slug: 'internal-weather-report',
  label: 'Internal Weather Report — Storm · Calm · Forecast',
  kind: 'pattern',
  categories: ['self-reflection', 'creativity'],
  tags: [
    'type:pattern','topic:emotions','topic:metaphor','level:beginner',
    'use:journal','use:emotional-awareness','use:stress-relief'
  ],
  use_cases: [
    'articulate your current mood or emotional state using weather metaphors',
    'gain perspective on emotional ups and downs by “forecasting” possible changes',
    'playfully externalize feelings to reduce their intensity and understand them'
  ],
  boosters: [
    'Don’t shy away from dramatic weather—intense storm imagery can help validate strong feelings (just include a shift toward resolution).',
    'End the report with a gentle forecast or hope (e.g., “skies clearing later”) to remind yourself that emotions change.'
  ],
  definition: 'A reflective journaling exercise that describes one’s mood and feelings as a weather report, complete with current conditions, any changes on the horizon, and a short-term forecast for emotional climate.',
  help: 'Describe how you feel right now in plain terms (e.g., anxious, relieved, etc.). The model will turn it into a creative “weather report” of your inner world, mentioning the current weather (emotional state), any transitions, and an outlook for the near future.',
  fields: [
    { key: 'mood', label: 'Current mood or feeling', type: 'textarea', ph: 'e.g., I feel nervous but also a bit hopeful about my new job.' }
  ],
  template: ({ mood, ctx, audience, style, tone }) => [
    'Draft an internal weather report for the current emotional state.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    mood && `Mood description:\n${mood}`,
    'Output:\n1) “Current conditions” describing the emotion as weather (e.g., thunderstorms of anxiety, or a sunny calm)\n2) Any “shifts” or changes happening (e.g., storm passing, clouds gathering)\n3) A short “forecast” for the near future mood (e.g., clearing skies, a chance of lightheartedness)'
  ].filter(Boolean).join('\n')
},
{
  id: 'synesthetic_brainstorm',
  slug: 'synesthetic-brainstorm',
  label: 'Synesthetic Brainstorm — Color · Sound · Texture',
  kind: 'pattern',
  categories: ['creativity', 'ideation'],
  tags: [
    'type:pattern','topic:metaphor','topic:sensory','level:beginner',
    'use:idea-generation','use:perspective-shift','use:creative-block'
  ],
  use_cases: [
    'generate fresh ideas by translating an abstract problem into sensory metaphors',
    'unlock intuition about a concept by describing its color, sound, texture, or taste',
    'use cross-sensory analogies to discover surprising angles on a design or story challenge'
  ],
  boosters: [
    'Include at least three senses (e.g., sight, sound, touch) in your exploration; the more variety, the more insights.',
    'After listing sensory metaphors, reflect on why each metaphor might resonate and what new ideas it suggests.'
  ],
  definition: 'A creative thinking exercise that treats an idea or problem through multiple sensory lenses (color, sound, texture, etc.), using synesthesia-like metaphors to spark new insights.',
  help: 'Provide a problem, idea, or theme. The model will assign it a color, a sound, a texture, etc., explaining each choice, to help you think about the concept in new ways.',
  fields: [
    { key: 'concept', label: 'Problem or concept to explore', type: 'text', ph: 'e.g., “Time management” or “My novel’s hero”.' }
  ],
  template: ({ concept, ctx, audience, style, tone }) => [
    'Use a synesthetic brainstorm to explore the concept through different senses.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    concept && `Concept: ${concept}`,
    'Output:\n1) Color – What color best represents the concept, and why?\n2) Sound – If it had a sound or music, what would it be?\n3) Texture – Describe its texture or physical feel metaphorically\n(Optionally include taste or smell if relevant)\n4) Brief insight: how these metaphors shed new light on the concept'
  ].filter(Boolean).join('\n')
},
{
  id: 'tarot_spread',
  slug: 'tarot-spread-reflection',
  label: 'Tarot Spread Reflection — Past · Present · Future',
  kind: 'framework',
  categories: ['creativity', 'self-reflection'],
  tags: [
    'type:framework','topic:tarot','topic:storytelling','level:intermediate',
    'use:personal-insight','use:creative-inspiration','use:journal'
  ],
  use_cases: [
    'gain personal insight by interpreting a situation through symbolic cards',
    'use archetypal imagery to brainstorm solutions or perspectives on a problem',
    'practice creative storytelling or introspection using a 3-card tarot format'
  ],
  boosters: [
    'Even if you don’t know tarot meanings, focus on the imagery or themes each card suggests and how it might relate to your life.',
    'If a card interpretation feels negative, include an empowering reframe or advice to balance it.'
  ],
  definition: 'A three-card spread (often Past-Present-Future) used as a reflective tool. Each card’s meaning is applied metaphorically to the user’s question or situation, providing narrative insight and guidance.',
  help: 'Provide a question or topic you’d like insight on. Optionally, list three tarot cards you drew (or let the model pick symbolic ones). The model will interpret each card in relation to your question, covering past influences, present situation, and future guidance.',
  fields: [
    { key: 'question', label: 'Question or situation for guidance', type: 'textarea', ph: 'e.g., “What should I focus on in my career right now?”' },
    { key: 'cards',    label: 'Drawn cards (optional, one per line)', type: 'textarea', ph: 'e.g., Past: The Tower\nPresent: Two of Cups\nFuture: The Star' }
  ],
  template: ({ question, cards, ctx, audience, style, tone }) => [
    'Perform a 3-card tarot-style reflection for guidance.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    question && `Question:\n${question}`,
    cards && ('Cards:\n' + cards),
    'Output:\n1) Past card – interpretation and how past events or influences relate to the question\n2) Present card – what it says about the current situation\n3) Future card – guidance or probable outcome\n(Each explained in a few sentences tying back to the question.)'
  ].filter(Boolean).join('\n')
},
{
  id: 'head_heart_gut',
  slug: 'head-heart-gut-check',
  label: 'Head-Heart-Gut — Logic · Emotion · Instinct',
  kind: 'framework',
  categories: ['decision', 'psychology'],
  tags: [
    'type:framework','topic:decision-making','topic:emotional-intelligence','level:beginner',
    'use:personal-decisions','use:values-check','use:intuition'
  ],
  use_cases: [
    'weigh a difficult decision by examining it from rational, emotional, and instinctual angles',
    'resolve indecision when your “head” and “heart” disagree by explicitly hearing both out',
    'ensure a choice aligns with logic, feelings, and gut intuition before committing'
  ],
  boosters: [
    'Phrase each perspective in the first person (e.g., “My head says...”).',
    'If one perspective dominates, consciously give voice to the quieter one (e.g., ask “Heart, what do you feel about this?”).'
  ],
  definition: 'A self-alignment check where you consider what your Head (logical mind), Heart (emotions/values), and Gut (intuition) each say about a decision or situation, to reach a balanced conclusion.',
  help: 'State the decision or dilemma you’re facing. The model will articulate the viewpoint of your head (logic), your heart (feelings/values), and your gut (instinct), then help synthesize them.',
  fields: [
    { key: 'decision', label: 'Decision or dilemma to consider', type: 'textarea', ph: 'e.g., Accepting a new job in a different city.' }
  ],
  template: ({ decision, ctx, audience, style, tone }) => [
    'Do a Head-Heart-Gut check on the decision, exploring each perspective.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    decision && `Decision:\n${decision}`,
    'Output:\n1) Head – Rational thoughts (pros, cons, facts, logic)\n2) Heart – Emotional response and values (hopes, fears, desires)\n3) Gut – Instincts or intuitive hunches\n4) A brief reconciliation or advice that considers all three'
  ].filter(Boolean).join('\n')
},
{
  id: 'imaginary_council',
  slug: 'imaginary-mentor-council',
  label: 'Imaginary Council — Multiple Mentors, One Question',
  kind: 'pattern',
  categories: ['creativity', 'strategy'],
  tags: [
    'type:pattern','topic:roleplay','topic:perspective-shift','level:intermediate',
    'use:brainstorming','use:decision-support','use:ideation'
  ],
  use_cases: [
    'get advice on a problem by imagining a panel of diverse mentors or characters',
    'break out of one-track thinking by considering how different personalities would tackle your issue',
    'indulge in a creative self-coaching exercise by channeling wisdom from fictional or real figures'
  ],
  boosters: [
    'Choose a mix of “advisors” with wildly different viewpoints or expertise (e.g., a scientist, an artist, a child, a rebel).',
    'Include at least one fun or unexpected persona (like your pet or a favorite fictional character) for creative insight.'
  ],
  definition: 'A brainstorming method where you pose a question to an imaginary panel of mentors or characters. Each “advisor” gives their perspective or solution, helping you see the issue from many angles.',
  help: 'List 2-5 imaginary council members (could be famous people, fictional characters, or archetypes) and state your question or problem. The model will present advice or answers from each member in turn.',
fields: [
  {
    key: 'advisors',
    label: 'Council members',
    type: 'repeater',
    itemType: 'typeahead',   // each item is a persona-backed textarea
    autofill: 'persona->textarea',    // on pick, dump full profile via personaText()
    itemLabel: 'member',              // label for the + Add button
    min: 2,
    max: 10,
    ph: 'Start typing to pick a persona (e.g., Marie Curie, Tony Stark, Future Self)…'
  },
  { key: 'question', label: 'Problem or question for the council', type: 'textarea', ph: 'Describe what you want advice or ideas about.' }
],
  template: ({ advisors, question, ctx, audience, style, tone }) => [
    'Consult an imaginary mentor council for advice.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    advisors && (
      'Council Members:\n' + String(advisors)
        .split(/\n+/).map(s => s.trim()).filter(Boolean)
        .map((x,i) => `${i+1}. ${x}`)
        .join('\n')
    ),
    question && `Question:\n${question}`,
    'Output:\nEach listed member provides their advice or answer in character, labeled with their name. Conclude with a synthesis or your own reflection on their perspectives.'
  ].filter(Boolean).join('\n')
},
{
  id: 'rubber_duck',
  slug: 'rubber-duck-debugging',
  label: 'Rubber Duck Debugging — Explain to Understand',
  kind: 'pattern',
  categories: ['analysis', 'productivity'],
  tags: [
    'type:pattern','topic:explaining','topic:debugging','level:beginner',
    'use:problem-solving','use:learning','use:clarification'
  ],
  use_cases: [
    'work through a tricky problem by explaining it step-by-step as if to a complete novice (or a rubber duck)',
    'clarify your understanding of a bug or question by articulating every detail and assumption',
    'discover gaps in logic or missing pieces by teaching the problem to an imaginary listener'
  ],
  boosters: [
    'Imagine the “duck” is totally new to the subject – define even basic terms as you explain.',
    'Have the duck ask simple clarification questions if something isn’t clear, and then answer them.'
  ],
  definition: 'A problem-solving technique where you explain your issue or question aloud in simple terms (often to an inanimate object or imaginary friend). The act of explaining reveals gaps in understanding and often leads to the solution.',
  help: 'Describe the problem you’re trying to solve, including relevant details. The model will have you explain it clearly (as if to a rubber duck), possibly ask a couple of clarifying questions, and then guide you toward a solution or next step.',
  fields: [
    { key: 'problem', label: 'Problem or question to explain', type: 'textarea', ph: 'Describe the issue in detail as if teaching someone with no background.' }
  ],
  template: ({ problem, ctx, audience, style, tone }) => [
    'Employ Rubber Duck Debugging on the described problem.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    problem && `Problem:\n${problem}`,
    'Output:\n1) A simple, step-by-step rephrasing of the problem (as if explaining to a novice)\n2) Identification of any unclear or problematic steps/assumptions (the “duck” asks questions, and you answer)\n3) A potential solution or next action based on the newfound understanding'
  ].filter(Boolean).join('\n')
},
{
  id: 'shadow_work',
  slug: 'shadow-work-dialogue',
  label: 'Shadow Work Dialogue — Conscious Self · Shadow Self',
  kind: 'pattern',
  categories: ['psychology', 'self-reflection'],
  tags: [
    'type:pattern','topic:shadow','topic:unconscious','level:advanced',
    'use:inner-demons','use:self-acceptance','use:emotional-healing'
  ],
  use_cases: [
    'confront a “shadow” side of yourself (traits or emotions you’ve repressed) by personifying it',
    'gain insight into negative patterns by dialoguing with the part of you that acts them out',
    'integrate and heal shame or anger by compassionately engaging with your darker side'
  ],
  boosters: [
    'Approach the shadow with curiosity, not hostility – it often protects a hurt part of you in a misguided way.',
    'Let the Shadow Self speak bluntly. Have your Conscious Self acknowledge its points before gently offering an alternative perspective.'
  ],
  definition: 'A Jungian-inspired exercise where you have a written conversation between your everyday conscious self and your “Shadow” (the hidden, negative, or feared aspects of you) to acknowledge and integrate these aspects.',
  help: 'Pick a shadow feeling from the list or type your own. Optionally attach personas to both your Shadow Self and your Conscious Self (these use the same typeahead+autofill you already have). The model will script a dialogue, then summarize insights.',
  fields: [
    // --- Shadow feeling (universal, no new UI code) ---
    { key: 'shadow_feeling', label: 'Shadow feeling (common list)', type: 'select',
      options: [
        { value:'', label:'— Select feeling —' },
                  // Shadow / difficult feelings
  'anger','anxiety','apathy','avoidance','bitterness','burnout','conflict-seeking',
  'confusion','control-fixation','defensiveness','despair','disgust','distrust',
  'envy','fear','frustration','guilt','hopelessness','imposter feelings',
  'inadequacy','insecurity','jealousy','judgment','loneliness','melancholy',
  'numbness','perfectionism','procrastination','rage','regret','resentment',
  'self-criticism','self-loathing','shame','spite','stress','withdrawal',

  // Expansive / positive feelings
  'acceptance','affection','awe','calm','caring','compassion','confidence',
  'contentment','curiosity','empathy','enthusiasm','excitement','forgiveness',
  'freedom','friendliness','fun','generosity','gratitude','happiness',
  'hope','inspiration','joy','kindness','laughter','love','motivation',
  'optimism','peace','playfulness','pride','relief','relaxation','satisfaction',
  'security','serenity','trust','wonder','zest'
      ]
    },
    { key: 'shadow_trait', label: 'Shadow traits/feelings', type: 'textarea',
      ph: 'e.g., jealousy, rage, self-sabotage', desc:'Type to search your persona library.',  desc: 'Write freely. It’s safe to name whatever surfaces — clarity grows when you give the shadow a voice.' },

    // --- Optional: attach Shadow persona (uses existing typeahead + autofill to companion _text) ---
    { key: 'shadow_name', label: 'Name your Shadow', type: 'text',
      ph: 'e.g., The Saboteur, The Critic, Trickster, UX designer, Stoic philosopher', desc: 'Trust what comes up — no right or wrong answers.' },
      
      { key: 'shadow_persona', label: 'Shadow persona (type to search personas)', type:'repeater',
  itemType:'typeahead',
  itemLabel:'persona',
  autofill:'persona->inline',
      ph: 'e.g., The Saboteur, The Critic, Trickster, UX designer, Stoic philosopher', desc: 'Type to search personas' },    
      
      
    { key: 'shadow_text', label: 'Shadow persona details (optional)', type: 'textarea',
      ph: 'Optionally add more persona details', desc: 'Write freely. It’s safe to name whatever surfaces — clarity grows when you give the shadow a voice.' },

    // --- Optional: attach Conscious Self persona (same pairing) ---
        { key: 'you_feeling', label: 'Opposite feeling (common list)', type: 'select',
      options: [
        { value:'', label:'— Select feeling —' },
          // Shadow / difficult feelings
  'anger','anxiety','apathy','avoidance','bitterness','burnout','conflict-seeking',
  'confusion','control-fixation','defensiveness','despair','disgust','distrust',
  'envy','fear','frustration','guilt','hopelessness','imposter feelings',
  'inadequacy','insecurity','jealousy','judgment','loneliness','melancholy',
  'numbness','perfectionism','procrastination','rage','regret','resentment',
  'self-criticism','self-loathing','shame','spite','stress','withdrawal',

  // Expansive / positive feelings
  'acceptance','affection','awe','calm','caring','compassion','confidence',
  'contentment','curiosity','empathy','enthusiasm','excitement','forgiveness',
  'freedom','friendliness','fun','generosity','gratitude','happiness',
  'hope','inspiration','joy','kindness','laughter','love','motivation',
  'optimism','peace','playfulness','pride','relief','relaxation','satisfaction',
  'security','serenity','trust','wonder','zest'
      ]
    },
    
     { key: 'you_trait', label: 'Conscious Self traits/feelings', type: 'textarea',
      ph: 'e.g., supportive, happy, content', desc:'Type to search your persona library.',  desc: 'Write freely. It’s safe to name whatever surfaces — clarity grows when you give the Conscious Self a voice.' },
    
    
    { key: 'you_name', label: 'Name your Conscious Self', type: 'text',
      ph: 'e.g., Compassionate Coach, Pragmatic PM, Therapist, Mentor', desc: 'Trust what comes up — no right or wrong answers.' },
          { key: 'you_persona', label: 'Conscious Self persona (type to search personas)', type:'repeater',
  itemType:'typeahead',
  itemLabel:'persona',
  autofill:'persona->inline',
      ph: 'e.g., Compassionate Coach, Pragmatic PM, Therapist, Mentor', desc: 'Type to search personas' },
    { key: 'you_text', label: 'Conscious persona details (optional)', type: 'textarea',
      ph: 'Optionally add more persona details',  desc: 'Write freely. It’s safe to name whatever surfaces — clarity grows when you give the Conscious Self a voice.' },

    // --- Scenario/context remains optional ---
    { key: 'scenario', label: 'Triggering scenario (optional)', type: 'textarea',
      ph: 'When or why does this shadow usually appear?', desc: 'Trust what comes up — no right or wrong answers.' }
  ],

template: ({
  shadow_feeling, shadow_trait, shadow_name, shadow_persona, shadow_text,
  you_feeling, you_trait, you_name, you_persona, you_text,
  scenario, ctx, audience, style, tone
}) => {
  const clean = v => (v && String(v).trim()) || '';
  const oneLine = s => String(s||'').replace(/\s*\n+\s*/g,' ').replace(/\s{2,}/g,' ').trim();

  // Gather feelings/traits (never overridden by persona details)
  const shadowFeelings = [clean(shadow_feeling), clean(shadow_trait)].filter(Boolean).join(', ');
  const youFeelings    = [clean(you_feeling), clean(you_trait)].filter(Boolean).join(', ');

  // Gather persona info
  const shadowBlock = [
    shadow_name && `Shadow persona: ${clean(shadow_name)}`,
    shadow_persona && `Additional persona(s): ${Array.isArray(shadow_persona) ? shadow_persona.join(', ') : clean(shadow_persona)}`,
    shadow_text && `Details: ${oneLine(shadow_text)}`
  ].filter(Boolean).join('\n');

  const youBlock = [
    you_name && `Conscious persona: ${clean(you_name)}`,
    you_persona && `Additional persona(s): ${Array.isArray(you_persona) ? you_persona.join(', ') : clean(you_persona)}`,
    you_text && `Details: ${oneLine(you_text)}`
  ].filter(Boolean).join('\n');

  return [
    'Initiate a Shadow Work dialogue between the conscious self and the shadow self.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    shadowFeelings && `Shadow feelings/traits: ${shadowFeelings}`,
    youFeelings && `Conscious feelings/traits: ${youFeelings}`,
    scenario && `Trigger:\n${scenario}`,
    shadowBlock && shadowBlock,
    youBlock && youBlock,
    'Output:\n1) Dialogue exchange where “You” (Conscious Self) and “Shadow” each speak\n' +
    '2) The Shadow explains its perspective/need; You respond with empathy but firmness\n' +
    '3) A final reflection or agreement indicating some healing or integration'
  ].filter(Boolean).join('\n');
}
},

{
  id: 'inner_child',
  slug: 'inner-child-dialogue',
  label: 'Inner Child Work — Conscious Self · Inner Child',
  kind: 'pattern',
  categories: ['psychology', 'self-reflection'],
  tags: [
    'type:pattern','topic:inner-child','topic:wounded-self','level:intermediate',
    'use:healing','use:re-parenting','use:emotional-integration'
  ],
  use_cases: [
    'connect with and comfort your “inner child” (wounded or vulnerable parts of yourself)',
    'practice re-parenting: respond with the compassion and guidance you needed then',
    'explore childhood experiences that shape your current patterns and emotions'
  ],
  boosters: [
    'Approach the inner child gently — think of how you would speak to a child you love.',
    'Let the Inner Child voice fears or needs freely. Respond with validation and steady care.'
  ],
  definition: 'A popular therapeutic exercise (John Bradshaw, Homecoming) where you dialogue between your adult conscious self and your “inner child” — the vulnerable, wounded, or playful child-part inside you — to re-parent, validate, and integrate them.',
  help: 'Pick a feeling from the list or type your own. Optionally attach personas to both your Inner Child and your Conscious Self (uses the same typeahead+autofill you already have). The model will script a dialogue, then summarize insights.',
  fields: [
    // --- Inner Child feelings ---
    { key: 'child_feeling', label: 'Inner Child feeling (common list)', type: 'select',
      options: [
        { value:'', label:'— Select feeling —' },
        // Shadow / difficult
        'anger','anxiety','apathy','avoidance','bitterness','burnout','confusion','defensiveness',
        'despair','distrust','envy','fear','frustration','guilt','hopelessness','insecurity',
        'jealousy','loneliness','melancholy','numbness','perfectionism','procrastination','rage',
        'regret','resentment','self-criticism','self-loathing','shame','stress','withdrawal',
        // Positive / expansive
        'acceptance','affection','awe','calm','caring','compassion','confidence','contentment',
        'curiosity','empathy','enthusiasm','excitement','forgiveness','freedom','friendliness',
        'fun','generosity','gratitude','happiness','hope','inspiration','joy','kindness',
        'laughter','love','motivation','optimism','peace','playfulness','pride','relief',
        'relaxation','satisfaction','security','serenity','trust','wonder','zest'
      ]
    },
    { key: 'child_trait', label: 'Inner Child traits/feelings', type: 'textarea',
      ph: 'e.g., scared, playful, abandoned, joyful',
      desc: 'Write freely. It’s safe to name whatever surfaces — clarity grows when you give the child a voice.' },

    // --- Inner Child persona ---
    { key: 'child_name', label: 'Name your Inner Child', type: 'text',
      ph: 'e.g., Little Me, Scared Kid, Playful One',
      desc: 'Trust what comes up — no right or wrong answers.' },
    { key: 'child_persona', label: 'Inner Child persona (type to search personas)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      ph: 'e.g., Little Me at 7, Lonely Teenager, Curious Explorer',
      desc: 'Type to search personas' },
    { key: 'child_text', label: 'Inner Child persona details (optional)', type: 'textarea',
      ph: 'Optionally add more persona details',
      desc: 'Write freely. It’s safe to name whatever surfaces.' },

    // --- Conscious Self persona (unchanged) ---
    { key: 'you_feeling', label: 'Conscious Self feeling (common list)', type: 'select',
      options: [ /* same combined feelings list as above */ ]
    },
    { key: 'you_trait', label: 'Conscious Self traits/feelings', type: 'textarea',
      ph: 'e.g., supportive, calm, wise',
      desc: 'Give words to the qualities of your adult self you want to bring here.' },

    { key: 'you_name', label: 'Name your Conscious Self', type: 'text',
      ph: 'e.g., Compassionate Parent, Wise Mentor',
      desc: 'Trust what comes up — no right or wrong answers.' },
    { key: 'you_persona', label: 'Conscious Self persona (type to search personas)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      ph: 'e.g., Compassionate Parent, Pragmatic Coach',
      desc: 'Type to search personas' },
    { key: 'you_text', label: 'Conscious persona details (optional)', type: 'textarea',
      ph: 'Optionally add more persona details',
      desc: 'Write freely. It’s safe to name whatever surfaces.' },

    { key: 'scenario', label: 'Triggering scenario (optional)', type: 'textarea',
      ph: 'When or why does this child usually appear?',
      desc: 'Briefly describe what brings your Inner Child up.' }
  ],

  template: ({
    child_feeling, child_trait, child_name, child_persona, child_text,
    you_feeling, you_trait, you_name, you_persona, you_text,
    scenario, ctx, audience, style, tone
  }) => {
    const clean = v => (v && String(v).trim()) || '';
    const oneLine = s => String(s||'').replace(/\s*\n+\s*/g,' ').replace(/\s{2,}/g,' ').trim();

    const childFeelings = [clean(child_feeling), clean(child_trait)].filter(Boolean).join(', ');
    const youFeelings   = [clean(you_feeling), clean(you_trait)].filter(Boolean).join(', ');

    const childBlock = [
      child_name && `Inner Child persona: ${clean(child_name)}`,
      child_persona && `Additional persona(s): ${Array.isArray(child_persona) ? child_persona.join(', ') : clean(child_persona)}`,
      child_text && `Details: ${oneLine(child_text)}`
    ].filter(Boolean).join('\n');

    const youBlock = [
      you_name && `Conscious persona: ${clean(you_name)}`,
      you_persona && `Additional persona(s): ${Array.isArray(you_persona) ? you_persona.join(', ') : clean(you_persona)}`,
      you_text && `Details: ${oneLine(you_text)}`
    ].filter(Boolean).join('\n');

    return [
      'Initiate an Inner Child dialogue between the conscious self and the inner child.',
      ctx && `Context: ${ctx}`,
      audience && `Audience: ${audience}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      childFeelings && `Inner Child feelings/traits: ${childFeelings}`,
      youFeelings && `Conscious feelings/traits: ${youFeelings}`,
      scenario && `Trigger:\n${scenario}`,
      childBlock && childBlock,
      youBlock && youBlock,
      'Output:\n1) Dialogue exchange where “You” (Conscious Self) and “Inner Child” each speak\n' +
      '2) The Inner Child shares its needs or fears; You respond with empathy, validation, and re-parenting care\n' +
      '3) A final reflection or practice to nurture integration'
    ].filter(Boolean).join('\n');
  }
},
{
  id:'toulmin',
  slug:'toulmin-argument-model',
  label:'Toulmin’s Argument Model — Claim · Grounds · Warrant · Backing · Qualifier · Rebuttal',
  kind:'framework',
  categories:['reasoning patterns','critical thinking','debate','philosophy','rhetoric'],
  tags:[
    'type:framework','topic:argumentation','topic:toulmin','phase:structure',
    'level:intermediate','use:debate-prep','use:analysis','use:policy-brief','use:legal-writing'
  ],
  use_cases:[
    'debate prep and competitive argumentation',
    'legal briefs and litigation strategy',
    'ux/product design debates',
    'policy briefs and position papers',
    'academic essays and research arguments',
    'negotiation and conflict resolution'
  ],
  boosters:[
    'State at least one explicit warrant that bridges grounds to claim.',
    'Support the warrant with credible backing (data, authority, mechanism).',
    'Add a realistic qualifier (scope, probability, or conditions).',
    'Name a plausible rebuttal and address how you’d handle it.'
  ],
  definition:'Breaks an argument into six parts: Claim, Grounds, Warrant, Backing, Qualifier, Rebuttal. Exposes assumptions, clarifies evidence, and adds nuance.',
  help:'Fill what helps; empty fields are omitted. The Qualifier and Rebuttal keep arguments credible and context-aware.',
  fields:[
    { key:'claim',     label:'Claim',                 type:'textarea',
      desc:'Your main conclusion or thesis.',
      ph:'e.g., We should ban single-use plastic bags.' },

    { key:'grounds',   label:'Grounds (Evidence)',    type:'textarea',
      desc:'Facts, observations, or data supporting the claim.',
      ph:'e.g., Plastic bags contribute to ocean pollution and harm wildlife.' },

    { key:'warrant',   label:'Warrant',               type:'textarea',
      desc:'Assumption or principle that links grounds to claim.',
      ph:'e.g., If something causes serious environmental harm, society should regulate or ban it.' },

    { key:'backing',   label:'Backing',               type:'textarea',
      desc:'Additional support for the warrant (authority, mechanism, precedent).',
      ph:'e.g., Studies show sea turtles and seabirds ingest plastic at high rates, increasing mortality.' },

    { key:'qualifier', label:'Qualifier',             type:'text',
      desc:'Strength/conditions of the claim (probability, scope, constraints).',
      ph:'e.g., In most cases… / Generally… / Except where biodegradable alternatives aren’t feasible.' },

    { key:'rebuttal',  label:'Rebuttal / Reservations', type:'textarea',
      desc:'Counterarguments or conditions where the claim may not hold, plus how you’d address them.',
      ph:'e.g., Some argue bans hurt low-income communities; provide subsidies for reusables.' }
  ],
  template:({claim,grounds,warrant,backing,qualifier,rebuttal,ctx})=>[
    'Structure an argument using Toulmin’s model.',
    ctx && `Context: ${ctx}`,
    claim     && `Claim:\n${claim}`,
    grounds   && `Grounds (Evidence):\n${grounds}`,
    warrant   && `Warrant:\n${warrant}`,
    backing   && `Backing:\n${backing}`,
    qualifier && `Qualifier:\n${qualifier}`,
    rebuttal  && `Rebuttal / Reservations:\n${rebuttal}`
  ].filter(Boolean).join('\n')
},


{
  id: 'epic_quest',
  slug: 'epic-quest-tasking',
  label: 'Epic Quest Tasking — Gamify the Chore',
  kind: 'pattern',
  categories: ['productivity', 'creativity', 'storytelling', 'motivation', 'self-care'],
  tags: [
    'type:pattern','topic:gamification','topic:play','topic:game-theory','topic:narrative-design',
    'method:story-scaffold',
    'level:intermediate',
    'use:motivation','use:adhd','use:routine','use:habit-building','use:executive-function','use:therapy'
  ],
  use_cases: [
    'Transform chores or tasks into engaging quests through narrative play.',
    'Help neurodivergent individuals overcome task resistance by reframing them as heroic missions.',
    'Make goal-setting fun and sustainable with characters, villains, and rewards.',
    'Gamify self-care or wellbeing routines into “daily quests.”',
    'Encourage children or groups to collaborate on chores as “party quests.”',
    'Reframe routine activities into therapeutic storytelling for resilience.',
    'Stack habits by turning recurring routines into progressive quest chains.'
  ],
  boosters: [
    'Always dramatize at least one obstacle or villain linked to friction in the task.',
    'Invent a persona if none provided, themed to the task (e.g., dishes = Water Mage).',
    'Add XP or loot-style rewards, even if the user only provides a real-world reward.',
    'Introduce urgency with a countdown, rival, or time-sensitive stakes.',
    'Provide at least 3 alternate quest names/titles for variety.',
    'Tie the villain to a specific pain point or blocker in the real task.',
    'Keep endings celebratory — frame setbacks as plot twists, not failures.',
    'End with a sequel hook for tomorrow’s quest or next stage.'
  ],
  definition: 'A narrative productivity pattern that reframes chores and tasks as quests in a story-driven world, using roleplay, game mechanics, and rewards to turn resistance into playful motivation. Rooted in gamification, game theory, and therapeutic storytelling. It helps individuals (including ADHD and chronic illness communities) build habits, overcome resistance, and sustain motivation.',
  help: 'Enter a task you want to gamify. Optionally specify a hero persona, quest type, world theme, villain/obstacle, XP value, or reward. The model will generate a short quest narrative where you (the hero) undertake the task as an epic mission, with obstacles, triumph, and reward.',
  fields: [
    { key: 'task', label: 'Task or chore to gamify', type: 'textarea',
      ph: 'e.g., cleaning my room',
      desc: 'The real-world activity you want reframed as a quest.' },
    { key: 'persona', label: 'Hero persona or theme (optional)', type: 'text',
      ph: 'e.g., a pirate captain, a wizard, a secret agent',
      desc: 'Who you are in this story. If left blank, the AI will invent one.' },
    { key: 'quest_type', label: 'Quest type (optional)', type: 'text',
      ph: 'e.g., Main Quest, Side Quest, Daily Ritual',
      desc: 'Helps frame priority and style of the task.' },
    { key: 'villain', label: 'Villain or obstacle (optional)', type: 'text',
      ph: 'e.g., the Dust Goblin, the Chaos Horde',
      desc: 'An adversary that represents the hardest part of the task.' },
    { key: 'lore', label: 'Lore / world theme (optional)', type: 'textarea',
      ph: 'e.g., Arcane Library, Cosmic Empire, Pirate Seas',
      desc: 'The setting or story world the task takes place in.' },
    { key: 'difficulty', label: 'Difficulty level (optional)', type: 'select',
      options: ['Easy', 'Moderate', 'Epic', 'Legendary'],
      desc: 'How challenging this quest should feel to set tone and stakes.' },
    { key: 'allies', label: 'Party members / allies (optional)', type: 'textarea',
      ph: 'e.g., my sibling, my dog, a friendly robot',
      desc: 'Who joins you on this quest — real or imagined allies.' },
    { key: 'xp', label: 'XP or points to award (optional)', type: 'text',
      ph: 'e.g., 50 XP, 1 skill point',
      desc: 'Points earned for completing the quest. Can be symbolic or tracked.' },
    { key: 'reward', label: 'Reward for completion (optional)', type: 'text',
      ph: 'e.g., 15 minutes of video game time, a snack',
      desc: 'Real-life or symbolic reward to celebrate quest completion.' }
  ],
  template: ({ task, persona, reward, quest_type, villain, xp, lore, difficulty, allies, ctx, audience, style, tone }) => [
    'Transform the task into an epic quest narrative.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    task && `Quest (task): ${task}`,
    quest_type && `Quest type: ${quest_type}`,
    persona && `Hero persona: ${persona}`,
    villain && `Villain/obstacle: ${villain}`,
    lore && `World theme:\n${lore}`,
    difficulty && `Difficulty: ${difficulty}`,
    allies && `Allies/party:\n${allies}`,
    reward && `Reward for success: ${reward}`,
    xp && `XP awarded: ${xp}`,
    'Output:\n1) Adventurous setup: hero identity, stakes, quest title\n2) Challenges and villainous obstacles dramatized as story beats\n3) Allies or supports (if any)\n4) Heroic completion with XP, loot, and celebratory reward\n5) Sequel hook to carry narrative momentum forward\n\nChecklist:\n- [ ] Quest has name/title\n- [ ] Villain dramatized\n- [ ] Reward + XP clear\n- [ ] Ending celebratory\n- [ ] Sequel hook included'
  ].filter(Boolean).join('\n')
},
{
  id: 'time_machine',
  slug: 'time-machine-perspectives',
  label: 'Time Machine Advice — Past Self & Future Self',
  kind: 'pattern',
  categories: ['self-reflection', 'planning'],
  tags: [
    'type:pattern','topic:future-self','topic:reflection','level:beginner',
    'use:life-choices','use:personal-growth','use:perspective'
  ],
  use_cases: [
    'gain wisdom on a current challenge by imagining advice from your younger and older self',
    'practice self-compassion by viewing your situation through the eyes of a past you and a future you',
    'clarify your next steps by hearing what your hopeful future self would tell you to do'
  ],
  boosters: [
    'Visualize your past self vividly (age, surroundings, mindset) to ground their voice. Do the same for your future self at, say, 20 years from now.',
    'Have the future self focus on encouragement and long-term perspective, while the past self might offer innocence or fundamental values you had.'
  ],
  definition: 'A reflective exercise where you imagine your past self and future self giving their perspectives on your current situation. The past self offers a reminder of where you came from, and the future self gives guidance looking back with wisdom.',
  help: 'Optionally specify an age or time for your past self, and describe your current challenge. The model will produce two voices: one from your past self (reacting to the present you) and one from your future self (offering advice), helping you see your situation in a new light.',
  fields: [
    { key: 'past',      label: 'Past self (age or year, optional)', type: 'text', ph: 'e.g., 15 or “college senior year”' },
    { key: 'situation', label: 'Current situation or problem', type: 'textarea', ph: 'Describe what you are dealing with now.' }
  ],
  template: ({ past, situation, ctx, audience, style, tone }) => [
    'Seek guidance by imagining perspectives from your past and future selves.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    past && `Past self timeframe: ${past}`,
    situation && `Current situation:\n${situation}`,
    'Output:\n1) Past Self – a message or reaction from your younger self upon seeing your current situation\n2) Future Self – advice or reassurance from an older, wiser you to your present self\n(Each in a distinct voice, followed by a brief reflection on the guidance.)'
  ].filter(Boolean).join('\n')
},
{
  id: 'mind_map',
  slug: 'mind-map-outline',
  label: 'Mind Map — Central Idea with Branches',
  kind: 'framework',
  categories: ['creativity', 'analysis'],
  tags: [
    'type:framework','topic:mind-mapping','topic:nonlinear','level:beginner',
    'use:brainstorm','use:note-taking','use:idea-organization'
  ],
  use_cases: [
    'quickly brainstorm and organize ideas around a central topic in a visual hierarchy (textually represented)',
    'generate an outline of subtopics and details for a broad subject',
    'assist ADHD or visual thinkers in structuring thoughts without strict linear order'
  ],
  boosters: [
    'Keep each node label short (1-3 words) as in a real mind map, for clarity and focus.',
    'Allow some branches to be unconventional or playful – creative tangents can lead to useful insights.'
  ],
  definition: 'A visual thinking tool that starts with one central idea, then branches into related subtopics, which further expand into details. Here, the mind map will be presented as an indented text outline.',
  help: 'Enter a central topic. Optionally list some main branches. The model will produce a mind map-style outline: the central idea, major branches (first-level nodes), and a few sub-points for each branch.',
  fields: [
    { key: 'topic',    label: 'Central topic', type: 'text', ph: 'e.g., Climate Change' },
    { key: 'branches', label: 'Main branches (optional, one per line)', type: 'textarea', ph: 'e.g., Causes\nImpacts\nSolutions' }
  ],
  template: ({ topic, branches, ctx, audience, style, tone }) => [
    'Create a mind map outline for the given topic.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    topic && `Central Topic: ${topic}`,
    branches && (
      'Main Branches:\n' + String(branches)
        .split(/\n+/).map(s => s.trim()).filter(Boolean)
        .map((b,i) => `${i+1}. ${b}`)
        .join('\n')
    ),
    'Output:\n- [Central Topic]\n  - [Branch 1]\n    - Sub-point 1\n    - Sub-point 2\n  - [Branch 2]\n    - Sub-point...\n(etc., an indented list representing the mind map)'
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
