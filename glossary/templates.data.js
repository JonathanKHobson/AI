

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
  label:'Bias Interrupters — diagnose risk · insert guardrail · measure effect',
  kind:'pattern',
  categories:['people','ethics','operations'],
  tags:[
    'type:pattern','topic:bias-interrupters','topic:rubrics','level:intermediate',
    'use:hiring','use:evaluation','use:promotion','use:peer-review','use:calibration'
  ],

  use_cases:[
    'hiring loops (sourcing → screening → interview → debrief)',
    'performance calibration and promo committees',
    'code/content/peer reviews and rubric scoring',
    'vendor selection and grant/program intake'
  ],

  definition:'A lightweight, repeatable change (“interrupter”) applied to a specific process step to reduce bias and increase fairness. Each interrupter is observable (a metric), owned by someone, and reviewed on a cadence to improve over time.',
  help:'Pick a concrete process step, list likely bias risks (gut-feel patterns are valid), then add a small guardrail (anonymization, rubrics, structured prompts, second-reader, rotation, etc.). Attach a metric with a target and an owner. Close by scheduling a review and naming risks of the change itself.',
  boosters:[
    'Baseline first: compute the metric on last cycle before changing the process.',
    'Name a single accountable owner and a review cadence (monthly/quarterly).',
    'Prefer “small + sticky” changes over big, fragile ones.',
    'Record trade-offs: cost, time-to-decision, stakeholder experience.',
    'Pilot on one team for 2–4 weeks; only then standardize.'
  ],

  fields:[
    { key:'process_step', label:'Process step', type:'text',
      ph:'Hiring / Evaluation / Promotion / Review',
      desc:'Scope narrowly so you can observe the change.' },

    // — Bias risks (free text) + library picks
    { key:'bias_risk',    label:'Bias risk(s) you expect', type:'textarea',
      ph:'Gut-feel; halo effect; similarity bias…',
      desc:'Write anything you see or suspect (patterns, anecdotes, “vibes”).' },
    { key:'bias_picks',   label:'Biases (from library)', type:'repeater',
    itemType:'typeahead', dataset:'bias', unit:'bias', autofill:'bias->inline',
      ph:'Start typing to search the bias library…',
      desc:'Optional: attach named biases for clarity & shared language.' },

    // — Strategy (free text) + library techniques
    { key:'strategy',     label:'Interrupter strategy (your guardrail)', type:'textarea',
      ph:'Structured interviews; rubrics; anonymization…',
      desc:'Describe the small change you will actually try.' },
    { key:'technique_picks', label:'Mitigation technique(s) (from library)', type:'repeater',
    itemType:'typeahead', dataset:'bias', unit:'technique', autofill:'bias->inline',
      ph:'Search the library for mitigation patterns…',
      desc:'Prefer items whose kind/category indicates “mitigation/technique”.' },

    { key:'metric',       label:'Metric to track', type:'textarea',
      ph:'e.g., Score variance by rubric item; pass-through by group…',
      desc:'One observable, comparable number. Add a target if known.' },
    { key:'iteration',    label:'Iteration plan', type:'textarea',
      ph:'What to refine next cycle and when.',
      desc:'Name an owner + date. Note trade-offs or new risks.' }
  ],

  template: ({ process_step, bias_risk, bias_picks, strategy, technique_picks, metric, iteration, ctx, audience, style, tone }) => [
    'Design a bias-interrupter for a people/ops process with clear metrics.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    process_step && `Process step: ${process_step}`,

    bias_picks && (
      'Biases (selected from library):\n' +
      String(bias_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),

    bias_risk && ('Bias risks (free text):\n' + bias_risk),

    technique_picks && (
      'Mitigation technique(s) (from library):\n' +
      String(technique_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),

    strategy && ('Interrupter strategy (free text):\n' + strategy),
    metric && ('Metric(s) to track:\n' + metric),
    iteration && ('Iteration plan:\n' + iteration),

    'Output:\n1) Interrupter spec\n2) Owner + start date\n3) Metric w/ target + baseline\n4) Review cadence\n5) Risks & mitigations'
  ].filter(Boolean).join('\n')
},

{
  id:'bias_impact_assessment',
  slug:'bias-impact-assessment',
  label:'Bias Impact Assessment (AI/tech pre-launch)',
  kind:'pattern',
  categories:['ai','ethics','risk'],
  tags:[
    'type:pattern','topic:impact-assessment','topic:transparency','level:advanced',
    'use:pre-launch','use:model-review','use:policy','use:governance'
  ],

  use_cases:[
    'pre-deployment review for ML models or decision systems',
    'dataset/label pipeline changes and retrains',
    'feature launches that alter ranking/recommendation or access',
    'vendor assessments and compliance sign-offs'
  ],

  definition:'A structured pre-launch review to surface stakeholders, plausible bias mechanisms, mitigations, transparency duties, and a monitoring plan with thresholds and owners. Aligns with model cards/datasheets, fairness evaluations, and incident response readiness.',
  help:'Name the system & purpose; list affected stakeholders (by role and demographic where appropriate); select likely bias risks (sampling, labels, shift, proxies, interaction effects); define mitigations (data/process/model/UX); add transparency measures (docs, appeals); and finish with monitoring (metric, threshold, cadence, owner).',
  boosters:[
    'Measure by slice: report metrics across salient groups (not just averages).',
    'Define thresholds & actions (degrade/rollback/human-in-the-loop).',
    'Note uncertainty and evaluation limits; propose follow-ups.',
    'Include impacted communities in stakeholder mapping.',
    'Cite explainability artifacts (model cards, datasheets).'
  ],

  fields:[
    { key:'system',       label:'System / algorithm / product name', type:'text', ph:'Name/version' },
    { key:'purpose',      label:'Intended purpose', type:'textarea', ph:'Primary task and success measures.' },
    { key:'stakeholders', label:'Stakeholders affected (one per line)', type:'textarea', ph:'Groups/roles.' },

    // — Risks (free text) + library picks
    { key:'risks',        label:'Bias risks identified (free text)', type:'textarea',
      ph:'Inputs, labels, sampling, shift, proxy variables, UX copy…' },
    { key:'risks_picks',  label:'Biases (from library)', type:'repeater',
    itemType:'typeahead', dataset:'bias', unit:'bias', autofill:'bias->inline',
      ph:'Start typing to search the bias library…',
      desc:'Optional: attach named biases that match the plausible mechanisms.' },

    // — Mitigations (free text) + library techniques
    { key:'mitigation',   label:'Mitigation steps (free text)', type:'textarea',
      ph:'Data/process/model changes; human-in-the-loop…' },
    { key:'mitigation_picks', label:'Mitigation technique(s) (from library)',     itemType:'typeahead', dataset:'bias', unit:'technique', autofill:'bias->inline',
      ph:'Search for mitigation patterns…',
      desc:'Prefer items whose kind/category indicates “mitigation/technique”.' },

    { key:'transparency', label:'Transparency / explainability measures', type:'textarea',
      ph:'Docs, disclosures, appeal paths…' },
    { key:'monitoring',   label:'Follow-up monitoring plan', type:'textarea',
      ph:'Metric(s), threshold(s), cadence, owner.' }
  ],

  template: ({ system, purpose, stakeholders, risks, risks_picks, mitigation, mitigation_picks, transparency, monitoring, ctx, audience, style, tone }) => [
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

    risks_picks && (
      'Biases (selected from library):\n' +
      String(risks_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),
    risks && ('Bias risks (free text):\n' + risks),

    mitigation_picks && (
      'Mitigation technique(s) (from library):\n' +
      String(mitigation_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),
    mitigation && ('Mitigation steps (free text):\n' + mitigation),

    transparency && ('Transparency / explainability:\n' + transparency),
    monitoring && ('Monitoring plan:\n' + monitoring),

    'Output:\n1) System + purpose\n2) Stakeholders\n3) Risks (library + free text)\n4) Mitigations (library + free text)\n5) Transparency plan\n6) Monitoring plan (metric + threshold + owner)'
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
  label: 'Cognitive Debiasing — state assumption · seek disconfirming evidence · adjust',
  kind: 'pattern',
  categories: ['ethics','bias','critical thinking'],
  tags: [
    'type:pattern','topic:debiasing','topic:consider-the-opposite',
    'level:beginner','use:analysis','use:strategy','use:review',
    'use:decision-audit','use:risk-assessment','use:post-mortem','use:scenario-planning'
  ],
  use_cases: [
    'document a current assumption and actively seek disconfirming evidence',
    'run a quick pre-mortem on a plan or forecast',
    'decide next adjustment with rationale and follow-up',
    'audit reasoning in board reviews or strategic planning',
    'sanity-check research, PRDs, or investment theses'
  ],
  definition: 'A meta-cognitive scaffold that surfaces assumptions, tests them with opposites and alternatives, and documents disconfirming evidence, missing data, mitigations, and follow-up. It cannot remove bias, but it structures accountability against common reasoning errors.',
  help: '1) Name the bias risk and write your assumption plainly. 2) Generate an opposite scenario and a plausible alternative. 3) Gather ≥2 pieces of disconfirming evidence (and log missing). 4) Run a one-line pre-mortem. 5) Decide a concrete adjustment and add mitigations. 6) Set a follow-up checkpoint. Optionally invite a persona to argue the opposite.',
  boosters: [
    'Cite ≥2 credible, independent sources that challenge the assumption.',
    'Include one perspective outside your immediate cultural/disciplinary bubble.',
    'Rank disconfirming evidence by strength/credibility.',
    'Pre-mortem: “If this failed in [timeframe], the most likely reason would be…”',
    'Log at least one expected-but-missing datapoint.',
    'Have another persona (or the model) argue the opposite side.',
    'Name secondary biases (anchoring, confirmation, sunk cost) influencing the reasoning.',
    'Add at least one concrete mitigation tied to the failure mode.'
  ],
  fields: [
    // — Bias: free text + library picker (single-line inline)
    { key: 'bias', label: 'Bias in question', type: 'text',
      ph: 'Anchoring / Confirmation / Availability / Other',
      desc: 'Name the most likely bias influencing your reasoning.' },
    { key: 'bias_picks', label: 'Biases (from library)', type: 'repeater',
      itemType: 'typeahead', dataset: 'bias', unit: 'bias', autofill: 'bias->inline',
      ph: 'Start typing to add named biases…',
      desc: 'Optional: attach named biases for clarity & shared language.' },

    { key: 'stake', label: 'Stake / Impact if wrong', type: 'textarea',
      ph: 'What’s at risk if this assumption fails?',
      desc: 'Spell out cost, reputational risk, time lost, or user impact.' },

    { key: 'initial', label: 'My initial assumption', type: 'textarea',
      ph: 'Write it down plainly.',
      desc: 'Keep it short and falsifiable.' },

    { key: 'opposite', label: 'Opposite scenario — What if the opposite is true?', type: 'textarea',
      ph: 'Spell a plausible opposite.',
      desc: 'Steelman the opposite; do not strawman.' },

    { key: 'alt_hypothesis', label: 'Alternative hypothesis (not strict opposite)', type: 'textarea',
      ph: 'Another plausible framing of reality.',
      desc: 'Different causal path, segmentation, or mechanism.' },

    { key: 'disconfirm', label: 'Disconfirming evidence (≥2, one per line)', type: 'textarea',
      ph: 'Source, fact, or datapoint per line.',
      desc: 'Independent sources preferred. Rank strongest → weakest in your notes.' },

    { key: 'missing', label: 'Missing evidence (expected but absent)', type: 'textarea',
      ph: 'What did you expect to find that you could not?',
      desc: 'Absence can be informative; note gaps & access constraints.' },

    { key: 'premortem', label: 'Pre-mortem — If this failed, why?', type: 'textarea',
      ph: 'Top 1–3 failure reasons. Specify timeframe.',
      desc: 'Name concrete failure modes and when they would show up.' },

    // — Mitigations: free text + library picker (single-line inline)
    { key: 'mitigation', label: 'Mitigation steps', type: 'textarea',
      ph: 'Procedures, gates, prompts, second-reader, measurement, rollback criteria…',
      desc: 'Concrete guardrails you will add now to reduce risk.' },
    { key: 'mitigation_picks', label: 'Mitigation technique(s) (from library)', type: 'repeater',
      itemType: 'typeahead', dataset: 'bias', unit: 'technique', autofill: 'bias->inline',
      ph: 'Search library for mitigation patterns…',
      desc: 'Prefer named techniques that match your bias risks.' },

    { key: 'decision', label: 'Next step decision — What will I adjust?', type: 'textarea',
      ph: 'Change of plan, metric, gate, or experiment.',
      desc: 'Small, testable adjustments beat big, fragile changes.' },

    { key: 'persona', label: 'Persona check (optional)', type: 'typeahead',
      autofill: 'persona->inline',
      ph: 'Pick a persona to argue the opposite (e.g., Skeptical Analyst, External Critic)',
      desc: 'Invite a challenging voice to stress-test reasoning.' },

    { key: 'followup', label: 'Follow-up checkpoint', type: 'text',
      ph: 'When/how will I revisit this assumption?',
      desc: 'Name date/trigger and who is accountable.' }
  ],
  template: ({ bias, bias_picks, stake, initial, opposite, alt_hypothesis, disconfirm, missing, premortem, mitigation, mitigation_picks, decision, persona, followup, ctx, audience, style, tone }) => [
    'Apply a cognitive debiasing pass.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,

    // Bias (free text + picker list)
    bias && `Bias in question: ${bias}`,
    bias_picks && (
      'Biases (selected from library):\n' +
      String(bias_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),

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

    // Mitigations (free text + picker list)
    mitigation && ('Mitigation steps (free text):\n' + mitigation),
    mitigation_picks && (
      'Mitigation technique(s) (from library):\n' +
      String(mitigation_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),

    decision && ('Next step decision:\n' + decision),
    persona && (`Persona check — Opposing voice:\n${persona}`),
    followup && ('Follow-up checkpoint:\n' + followup),

    'Output:\n1) Bias summary (free text + named biases)\n2) Assumption vs. opposite vs. alternative\n3) Disconfirming evidence (≥2, ranked)\n4) Missing evidence noted\n5) Pre-mortem failure modes\n6) Mitigations\n7) Decision & rationale\n8) Follow-up accountability',
    'Checklist:\n- [ ] ≥2 disconfirming sources\n- [ ] One external perspective included\n- [ ] Missing evidence logged\n- [ ] Pre-mortem stated\n- [ ] Mitigations added\n- [ ] Decision adjusted\n- [ ] Follow-up scheduled'
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
    'phase:interpret','phase:analyze','phase:evaluate','phase:infer','phase:explain','phase:self-regulate',
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
    'Practice bias-awareness training exercises.',
    'Pre-read sanity checks before exec or board decisions.'
  ],
  definition: 'A six-skill model of critical thinking (Facione, Delphi Report) that operationalizes interpretation, analysis, evaluation, inference, explanation, and self-regulation. It structures balanced, evidence-based reasoning and makes bias checks explicit.',
  help: 'Provide a topic/claim/problem plus pro/con evidence. Optionally add alternatives, criteria, and stakeholders. The output walks through all six skills, strengthens a counterargument, flags bias, states confidence/uncertainty, and ends with one concrete next step.',
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
      ph:'Seek disconfirming data; avoid anchoring; confidence rating…' },

    // NEW: bias picker directly under self-reg notes (single-line inline inserts)
    { key:'selfreg_bias_picks', label:'Biases (from library)', type:'repeater',
      itemType:'typeahead', dataset:'bias', unit:'bias', autofill:'bias->inline',
      desc:'Optional: attach named biases or techniques to make checks explicit.',
      ph:'Start typing to add named biases…' },

    // Optional finishing helpers so the close-out is explicit
    { key:'confidence', label:'Confidence & uncertainty (optional)', type:'text',
      desc:'State your confidence and uncertainty range.',
      ph:'Confidence: medium; Uncertainty: ±5–7pp' },

    { key:'next_step', label:'Next step (optional)', type:'text',
      desc:'One concrete follow-up action.',
      ph:'Run A/B on alt hypothesis; schedule review in 2 weeks' }
  ],
  boosters: [
    'Always state a confidence level (low/medium/high) and an uncertainty range.',
    'Strengthen at least one opposing argument before rebutting.',
    'Test each key claim against at least one counterexample or alternative mechanism.',
    'Make bias checks explicit; tie each to a mitigation technique.',
    'Connect inference to real-world implications or decisions.',
    'Finish with a 2-line “Because–Therefore” justification and one actionable next step.'
  ],
  template: ({ topic, evidence, counter, alt_explanations, criteria, stakeholders, explain_aud, selfreg_checks, selfreg_bias_picks, confidence, next_step, ctx, audience, style, tone }) => [
    'Apply Facione’s six core critical thinking skills.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,

    topic && `Target issue: ${topic}`,
    'Output:',
    '1) Interpretation — Clarify what the issue and evidence mean in plain terms.',
    evidence && `2) Analysis — Identify key structures, relations, or assumptions in the evidence:\n${evidence}`,
    counter && `3) Evaluation — Weigh credibility and logical strength of supporting vs. opposing evidence:\n${counter}`,
    alt_explanations && `4) Inference — Draw a conclusion, with uncertainty and alternatives:\n${alt_explanations}`,
    criteria && `Criteria — Standards applied for evaluation:\n${criteria}`,
    stakeholders && `Stakeholders — Who is impacted:\n${stakeholders}`,

    explain_aud && (
      '5) Explanation — Frame the conclusion for the audience(s):\n' +
      String(explain_aud).split(/\n+/).map((a,i)=>`${i+1}. ${a}`).join('\n')
    ),

    selfreg_checks && `6) Self-regulation — Bias/quality checks applied:\n${selfreg_checks}`,
    selfreg_bias_picks && (
      'Self-regulation — Named biases/techniques (from library):\n' +
      String(selfreg_bias_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),

    confidence && `Confidence & uncertainty:\n${confidence}`,
    next_step && `Next step:\n${next_step}`,

    'Close with:\n- Because–Therefore justification\n- Confidence level & uncertainty range\n- One next step (experiment, check, or action)\n\nChecklist:\n- [ ] All six skills addressed\n- [ ] One opposing argument strengthened\n- [ ] Bias check included (named where possible)\n- [ ] Confidence level stated\n- [ ] Actionable next step proposed'
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
  categories: ['storytelling frameworks','creative writing','myth-making','personal growth','game design'],
  tags: [
    'type:framework','topic:storytelling','topic:archetypes','topic:mythic-structure',
    'phase:compose','level:intermediate',
    'use:plot-outline','use:character-development','use:mythic-narrative',
    'use:game-design','use:personal-growth','use:autobiographical-storytelling','use:screenwriting'
  ],
  use_cases: [
    'Generate mythic or epic story outlines.',
    'Develop a character’s transformative arc.',
    'Design quests and NPC arcs for tabletop or video games.',
    'Map personal life experiences as a hero’s journey.',
    'Storyboard or create beat sheets for screenwriting or novels.',
    'Frame customer or brand storytelling as a Hero’s Journey.'
  ],
  boosters: [
    'Ensure the hero undergoes meaningful inner and outer transformation.',
    'Adapt stages flexibly — not every story requires all 12 or 17.',
    'Include archetypes (Mentor, Shadow, Ally, Trickster) for richness.',
    'Frame the Return as a gift to the community, not just the self.',
    'Tie the inner journey to the outer — growth mirrors trials.',
    'Use symbols and motifs for thematic resonance.',
    'Explore diverse cultural hero’s journey models, not just Campbell’s.',
    'If any field (Hero, Quest, Nemesis, Setting, Transformation, Gift, or Theme) is missing, suggest ideas, ask guiding questions, or introduce creative constraints to spark inspiration.'
  ],
  definition: 'A narrative pattern (monomyth) where a hero leaves their ordinary world, faces trials and transformation, and returns with wisdom or a gift. Based on Joseph Campbell’s work but adapted across creative traditions.',
  help: 'Provide details about the hero, their world, quest, nemesis, and optional archetypes. The model will outline a story in Departure, Initiation, and Return phases, weaving in transformation, motifs, and a community-oriented Gift.',
  fields: [
    { key: 'audience_persona', label: 'Target Audience Persona', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Who this story is for. Use personas (e.g., child reader, RPG gamer, film audience).',
      ph: 'Start typing to pick or create personas for the target audience.' },

    { key: 'hero', label: 'Hero / Protagonist', type: 'textarea',
      desc: 'The main character (name, role, traits, flaws, backstory, or hidden potential).',
      ph: 'e.g., Aria, a cautious village girl with secret magic powers' },
    { key: 'hero_persona', label: 'Hero Persona', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Attach a persona profile to your hero (e.g., archetypal roles, personality models).',
      ph: 'Search and attach full persona profiles' },

    { key: 'quest', label: 'Quest / Goal', type: 'textarea',
      desc: 'The external mission and internal challenge the hero must face.',
      ph: 'e.g., Save her village (outer) and learn self-trust (inner).' },

    { key: 'nemesis', label: 'Antagonist / Main Challenge', type: 'textarea',
      desc: 'The villain, force, or inner conflict opposing the hero.',
      ph: 'e.g., Evil sorcerer / Aria’s own fear of power' },
    { key: 'nemesis_persona', label: 'Nemesis Persona', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Attach a persona profile to your nemesis or antagonist.',
      ph: 'Search and attach full persona profiles' },

    { key: 'mentor', label: 'Mentor / Guide (optional)', type: 'textarea',
      desc: 'Wise or flawed figure who offers guidance or tools.',
      ph: 'e.g., An eccentric old mage who teaches her control' },
    { key: 'mentor_persona', label: 'Mentor Persona', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Attach a persona profile to your mentor or guide figure.',
      ph: 'Search and attach full persona profiles' },

    { key: 'allies', label: 'Allies / Companions (optional)', type: 'textarea',
      desc: 'Friends, helpers, or fellow travelers who support the hero.',
      ph: 'e.g., Loyal blacksmith, mischievous fox spirit' },
    { key: 'allies_persona', label: 'Allies Persona', type: 'repeater',
    itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Attach persona profiles for the hero’s allies or companions.',
      ph: 'Search and attach full persona profiles' },

    { key: 'shadow', label: 'Shadow Aspect (optional)', type: 'textarea',
      desc: 'The hero’s dark side, flaw, or an antagonist who reflects their inner struggle.',
      ph: 'e.g., Her fear of power, mirrored in the sorcerer' },
    { key: 'shadow_persona', label: 'Shadow Persona', type: 'repeater',
     itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Attach a persona profile to represent the shadow aspect.',
      ph: 'Search and attach full persona profiles' },

    { key: 'setting1', label: 'Setting Option 1', type: 'select',
      options: [
        { value: '', label: '— Select common setting —' },
        // Classic fantasy & mythic
        'Fantasy world','Medieval kingdom','Magical school','Underworld/afterlife',
        // Sci-fi & speculative
        'Sci-fi future','Cyberpunk metropolis','Dystopian megacity','Post-apocalyptic Earth','Outer space','Space opera galaxy',
        // Historical & cultural
        'Historical empire','Ancient civilization','Colonial frontier','Mythic past','Steampunk world',
        // Natural & survival
        'Desert wasteland','Frozen tundra','Tropical island','Jungle ruins','Mountain stronghold','Ocean voyage',
        // Modern & everyday
        'Modern city','Small town','Suburban neighborhood','School campus','Corporate office','Hospital',
        // Horror & gothic
        'Haunted castle','Abandoned asylum','Cursed village','Endless labyrinth',
        // Surreal & abstract
        'Dreamscape','Parallel dimension','Virtual reality world','Multiverse crossroads',
        // Hybrid / misc
        'Lost island','Wild west frontier','Superhero metropolis','Political intrigue court'
      ],
      desc: 'Choose a quick-start setting inspiration. Common genres and worlds included.',
      ph: 'Pick a common genre/world setting'
    },
    { key: 'setting2', label: 'Setting Option 2', type: 'select',
      options: [
        { value: '', label: '— Select common setting —' },
        'Fantasy world','Medieval kingdom','Magical school','Underworld/afterlife',
        'Sci-fi future','Cyberpunk metropolis','Dystopian megacity','Post-apocalyptic Earth','Outer space','Space opera galaxy',
        'Historical empire','Ancient civilization','Colonial frontier','Mythic past','Steampunk world',
        'Desert wasteland','Frozen tundra','Tropical island','Jungle ruins','Mountain stronghold','Ocean voyage',
        'Modern city','Small town','Suburban neighborhood','School campus','Corporate office','Hospital',
        'Haunted castle','Abandoned asylum','Cursed village','Endless labyrinth',
        'Dreamscape','Parallel dimension','Virtual reality world','Multiverse crossroads',
        'Lost island','Wild west frontier','Superhero metropolis','Political intrigue court'
      ],
      desc: 'Choose another setting option (same comprehensive list as Setting 1).',
      ph: 'Pick a secondary genre/world setting'
    },

    { key: 'setting', label: 'World / Setting', type: 'textarea',
      desc: 'Context and world rules (ordinary vs extraordinary).',
      ph: 'e.g., A medieval land where magic is feared' },

    { key: 'transformation', label: 'Transformation', type: 'text',
      desc: 'How the hero changes through the journey.',
      ph: 'e.g., From fearful girl to confident leader' },

    { key: 'gift', label: 'Gift to the World / Community', type: 'text',
      desc: 'What the hero brings back to benefit others.',
      ph: 'e.g., Healing stone that lifts the curse' },

    { key: 'theme1', label: 'Theme Option 1', type: 'select',
      options: [
        { value: '', label: '— Select common theme —' },
        // Core literary themes
        'Good vs. Evil','Love conquers all','Coming of age','Identity and self-discovery','Sacrifice',
        'Freedom vs. control','Power and corruption','Justice vs. revenge','Courage and resilience',
        'Friendship and loyalty','Family bonds','Mortality and legacy',
        // Social & cultural
        'Tradition vs. progress','Class struggle','Colonialism and resistance','Technology vs. humanity',
        'Alienation and belonging','Gender and identity','Environmental survival',
        // Psychological & philosophical
        'Hope in despair','Chaos vs. order','The hero within','Redemption','Fate vs. free will',
        'Illusion vs. reality','The cost of ambition','Knowledge and ignorance',
        // Mythic & spiritual
        'Transformation and rebirth','The trickster’s lesson','Balance and harmony','The journey home'
      ],
      desc: 'Choose a quick-start theme inspiration. Includes core, cultural, and mythic themes.',
      ph: 'Pick a common theme in stories'
    },
    { key: 'theme2', label: 'Theme Option 2', type: 'select',
      options: [
        { value: '', label: '— Select common theme —' },
        'Good vs. Evil','Love conquers all','Coming of age','Identity and self-discovery','Sacrifice',
        'Freedom vs. control','Power and corruption','Justice vs. revenge','Courage and resilience',
        'Friendship and loyalty','Family bonds','Mortality and legacy',
        'Tradition vs. progress','Class struggle','Colonialism and resistance','Technology vs. humanity',
        'Alienation and belonging','Gender and identity','Environmental survival',
        'Hope in despair','Chaos vs. order','The hero within','Redemption','Fate vs. free will',
        'Illusion vs. reality','The cost of ambition','Knowledge and ignorance',
        'Transformation and rebirth','The trickster’s lesson','Balance and harmony','The journey home'
      ],
      desc: 'Choose another theme option (same comprehensive list as Theme 1).',
      ph: 'Pick a secondary theme in stories'
    },

    { key: 'themes', label: 'Themes / Motifs', type: 'textarea',
      desc: 'Underlying values, motifs, or symbols to highlight.',
      ph: 'e.g., sacrifice, identity, freedom; recurring bird imagery' }
  ],
  template: ({ hero, hero_persona, quest, nemesis, nemesis_persona, mentor, mentor_persona, allies, allies_persona, shadow, shadow_persona, setting1, setting2, setting, transformation, gift, theme1, theme2, themes, ctx, audience_persona, style, tone }) => [
    'Craft a Hero’s Journey narrative outline.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    audience_persona && `Target Audience Persona(s): ${audience_persona}`,
    hero && `Hero: ${hero}`,
    hero_persona && `Hero Persona(s): ${hero_persona}`,
    quest && `Quest: ${quest}`,
    nemesis && `Antagonist/Challenge: ${nemesis}`,
    nemesis_persona && `Nemesis Persona(s): ${nemesis_persona}`,
    mentor && `Mentor/Guide: ${mentor}`,
    mentor_persona && `Mentor Persona(s): ${mentor_persona}`,
    allies && `Allies: ${allies}`,
    allies_persona && `Allies Persona(s): ${allies_persona}`,
    shadow && `Shadow Aspect: ${shadow}`,
    shadow_persona && `Shadow Persona(s): ${shadow_persona}`,
    (setting1 || setting2) && `Setting Options: ${[setting1, setting2].filter(Boolean).join(', ')}`,
    setting && `Setting: ${setting}`,
    transformation && `Transformation: ${transformation}`,
    gift && `Gift to Community: ${gift}`,
    (theme1 || theme2) && `Theme Options: ${[theme1, theme2].filter(Boolean).join(', ')}`,
    themes && `Themes/Motifs: ${themes}`,
    '---',
    'Output:',
    '1) Departure – Ordinary world, call to adventure, mentor, threshold.',
    '2) Initiation – Trials, allies, nemesis, crisis, transformation.',
    '3) Return – Road back, the Gift, reintegration with community.',
    '4) Integration – How inner change mirrors the outer journey.',
    '5) Story Spine – One or two sentences summarizing the arc.'
  ].filter(Boolean).join('\n')
},
  
{
  id: 'debiasing-checklist',
  slug: 'heuristics-biases-preflight',
  label: 'Heuristics & Biases — Debiasing Pre-flight',
  kind: 'framework',
  categories: ['critical thinking frameworks','quality checks','decision hygiene'],
  tags: [
    'type:framework','topic:debiasing','topic:heuristics','topic:consider-the-opposite','topic:base-rates',
    'phase:review','phase:premortem',
    'level:intermediate'
  ],

  use_cases: [
    'Review a draft answer/decision before publishing or acting',
    'Sanity-check a forecast or prediction',
    'Run a risk review before committing resources',
    'Surface blind spots in research summaries or analyses',
    'Do a quick “red team” pass under time pressure'
  ],

  definition: 'A structured mental pre-flight that scans for common biases, applies concrete debiasing tactics, and strengthens a draft or decision. Inspired by Kahneman/Tversky’s catalog, Klein’s premortem, and aviation/medical checklists.',
  
  help: 'Paste your draft/decision and context. Name any suspected biases and preferred tactics. Use the pickers to attach named biases and techniques (single-line inline). The checklist will run a bias scan, evidence check, premortem, and propose a revised decision with explicit uncertainties.',

  fields: [
    { 
      key: 'decision',
      label: 'Decision/draft to check',
      type: 'textarea',
      desc: 'The answer, judgment, or plan you want to stress-test. Include reasoning if available.',
      ph: 'e.g., Invest in new product launch Q3; Survey results show 70% interest'
    },

    { 
      key: 'stakes',
      label: 'Stakes/impact',
      type: 'text',
      desc: 'How much does this decision matter? Higher stakes → slower, more thorough debiasing.',
      ph: 'High (strategic pivot, $M impact) | Medium (team workflow) | Low (wording choice)'
    },

    { 
      key: 'time_pressure',
      label: 'Time pressure',
      type: 'text',
      desc: 'Biases amplify under pressure. State the constraint clearly.',
      ph: 'High (hours) | Moderate (days) | Low (weeks)'
    },

    // Known biases (free text) + picker (single-line inline)
    { 
      key: 'known_biases',
      label: 'Known or suspected biases',
      type: 'textarea',
      desc: 'Biases you already suspect may be at play. Naming them upfront sharpens the scan.',
      ph: 'Anchoring, confirmation, sunk cost, halo effect, recency'
    },
    {
      key: 'known_biases_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      dataset: 'bias',
      unit: 'bias',
      autofill: 'bias->inline',
      desc: 'Optional: attach named biases for shared language and quick inline context.',
      ph: 'Start typing to add named biases…'
    },

    // Tactics (free text) + picker (single-line inline)
    { 
      key: 'tactics',
      label: 'Preferred debiasing tactics',
      type: 'textarea',
      desc: 'List tactics you want to emphasize. The AI defaults to a mix if blank.',
      ph: 'Outside view, base rates, premortem, “consider the opposite,” disconfirming evidence'
    },
    {
      key: 'tactics_picks',
      label: 'Debiasing tactics (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      dataset: 'bias',
      unit: 'technique',
      autofill: 'bias->inline',
      desc: 'Pick named mitigation techniques matched to the suspected biases.',
      ph: 'Search library for mitigation patterns…'
    },

    { 
      key: 'mission_alignment',
      label: 'Mission/values alignment (optional)',
      type: 'textarea',
      desc: 'State how this decision should align with broader mission, ethics, or stakeholder values.',
      ph: 'e.g., Consistent with accessibility-first principle; avoids reputational risk'
    },

    { 
      key: 'persona',
      label: 'Decision-maker persona (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Select a decision-maker persona to frame the voice/lens of the review.',
      ph: 'e.g., Analyst, Risk Officer, UX Researcher'
    }
  ],

  boosters: [
    'Ask first: “What would convince me I’m wrong?”',
    'End with a one-liner: “If I’m wrong, it’s because…”',
    'Run a quick premortem: Imagine it failed in 6 months — why?',
    'Check for *bias clusters* (e.g., Anchoring + Confirmation).',
    'Re-state base rates/outside-view statistics explicitly.',
    'List ≥2 disconfirming pieces of evidence before finalizing.',
    'Balance head (logic), heart (values), and gut (instinct) before the call.'
  ],

  template: ({ decision, stakes, time_pressure, known_biases, known_biases_picks, tactics, tactics_picks, mission_alignment, persona, ctx, audience, style, tone }) => [
    'Run a structured Debiasing Pre-flight Checklist.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,

    persona && `Persona lens: ${persona}`,
    stakes && `Stakes: ${stakes}`,
    time_pressure && `Time pressure: ${time_pressure}`,

    known_biases_picks && (
      'Known/suspected biases (from library):\n' +
      String(known_biases_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),
    known_biases && `Known/suspected biases (free text): ${known_biases}`,

    tactics_picks && (
      'Debiasing tactics:\n' +
      String(tactics_picks).split(/\n+/).map((s,i)=>`${i+1}. ${s.trim()}`).join('\n')
    ),
    tactics && `Preferred debiasing tactics: ${tactics}`,

    mission_alignment && `Mission/values alignment: ${mission_alignment}`,
    decision && `Decision/draft under review:\n${decision}`,

    '',
    'Output format:',
    '1) **Bias scan** — Highlight likely biases (anchoring, availability, confirmation, sunk cost, halo effect, overconfidence, base-rate neglect, scope insensitivity, groupthink).',
    '2) **Evidence & assumptions** — Spot-check key assumptions. Flag base rates, missing data, or untested beliefs.',
    '3) **Disconfirming view** — Provide 2+ reasons why this could be wrong. Apply “consider the opposite.”',
    '4) **Premortem** — If this fails in 6–12 months, identify the top 1–2 failure modes and mitigations.',
    '5) **Revised decision** — Rewrite the draft in light of findings. Make uncertainties explicit (confidence ranges, probability).',
    '6) **One-line bias guardrail** — “If I’m wrong, it’s because…” + one red-team style question.',
    '7) **Go / Iterate / Stop** — Final recommendation with rationale, aligned to stakes and mission.'
  ].filter(Boolean).join('\n')
},
  
{
  id: 'hmw_statements',
  slug: 'how-might-we-statements-hmw',
  label: 'How Might We Statements (HMW)',
  kind: 'pattern',
  categories: ['design thinking','ideation','problem framing'],
  tags: [
    'type:pattern','topic:problem-framing','topic:ideation','topic:inclusion','topic:debiasing',
    'phase:explore','level:beginner',
    'use:brainstorm','use:opportunity-mapping','use:workshop','use:discovery'
  ],

  use_cases: [
    'reframe research insights into opportunity questions',
    'kick off brainstorming with human-centered prompts',
    'align cross-functional teams on focus areas',
    'spin variants at different scopes (broad ↔ narrow)',
    'generate inclusive, non-leading prompts that avoid baked-in solutions'
  ],

  definition:
    'HMW reframes a need into an optimistic, solvable question. Good HMWs are human-specific, problem-oriented (not feature-led), Goldilocks-sized, and inclusive. Template: “How might we [improve outcome] for [who] in [context] given [key constraint] so that [benefit]?”',

  help:
    'Add the core need, who is affected, desired outcome, and any constraints. Optionally include research snippets, mission/values, and a persona lens. The template returns a canonical HMW plus de-anchored variants (broad, narrow, opposite), inclusivity rewrites, and a tiny experiment stub.',

  boosters: [
    'Generate 5+ variants: 2 broad, 2 narrow, 1 wild “adjacent possible”.',
    'Strip solutions: replace “add/build/implement” with outcomes (“help, enable, reduce, increase, simplify”).',
    'Add a “so that …” benefit clause to keep purpose sharp.',
    'Run a quick bias scan (anchoring, confirmation, availability, halo, groupthink); rewrite any leading phrasing.',
    'Include one inclusive rewrite (accessibility/equity/safety) and one constraint-aware rewrite.',
    'Attach a smallest-test plan (hypothesis, metric, tiny experiment, decision rule).'
  ],

  fields: [
    {
      key: 'need',
      label: 'Need / challenge',
      type: 'textarea',
      desc: 'Concise description of the problem/opportunity, grounded in evidence or observation.',
      ph: 'New users abandon onboarding at step 2; they do not understand data permissions.'
    },
    {
      key: 'who',
      label: 'Who is affected?',
      type: 'text',
      desc: 'Name a specific audience/segment. Specificity improves ideas.',
      ph: 'First-time Android users on metered data in India'
    },
    
        /* Persona lens */
    {
      key: 'persona',
      label: 'Persona lens (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Select a persona to inform language, values, and constraints.',
      ph: 'e.g., Privacy-first Analyst; Busy Parent; Field Technician'
    },
    
    {
      key: 'outcome',
      label: 'Desired outcome (benefit)',
      type: 'text',
      desc: 'What change in behavior/experience should a good solution achieve?',
      ph: 'Reach first value in under 2 minutes without confusion'
    },
    {
      key: 'context_detail',
      label: 'Context (where/when/conditions)',
      type: 'textarea',
      desc: 'Situational details (device, channel, moment) that meaningfully shape the problem.',
      ph: 'Mobile web at night; low bandwidth; privacy-sensitive forms'
    },
    {
      key: 'constraints',
      label: 'Constraints / non-goals',
      type: 'textarea',
      desc: 'Limits to respect (policy, legal, tech, brand). Also list anti-goals to avoid solution creep.',
      ph: 'No phone number collection; avoid dark patterns; do not increase steps'
    },
    {
      key: 'evidence',
      label: 'Evidence / insight snippets',
      type: 'textarea',
      desc: 'Key quotes, metrics, or observations that justify the need.',
      ph: '“I don’t know why you need this,” • 42% drop at permissions • 18% complete on 3G'
    },

    /* Inclusive + debiasing lenses */
    {
      key: 'inclusion_notes',
      label: 'Inclusion & accessibility notes (optional)',
      type: 'textarea',
      desc: 'Accessibility, equity, and safety considerations to bake into phrasing.',
      ph: 'Screen reader support; low-literacy wording; avoid stigma; multilingual hints'
    },
    {
      key: 'bias_watchouts',
      label: 'Bias watch-outs (optional)',
      type: 'textarea',
      desc: 'Suspected biases to guard against when phrasing HMW.',
      ph: 'Anchoring on last quarter’s complaint; halo effect around premium users'
    },
    {
      key: 'bias_lens',
      label: 'Bias lens (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'Insert bias primers from your library to guide the scan.',
      ph: 'Search your bias library (e.g., anchoring, confirmation, availability)'
    },

    /* Mission/values alignment */
    {
      key: 'mission',
      label: 'Mission/values alignment (optional)',
      type: 'textarea',
      desc: 'How should the HMW reflect mission/values and avoid harm?',
      ph: 'Champion user autonomy; minimize data collection; dignity by default'
    },

    /* Style knobs */
    {
      key: 'scope_pref',
      label: 'Scope preference',
      type: 'select',
      options: [
        { value: 'Broad (exploratory, many directions)',  label: 'Broad (exploratory, many directions)' },
        { value: 'Medium (Goldilocks default)', label: 'Medium (Goldilocks default)' },
        { value: 'Narrow (tightly constrained)', label: 'Narrow (tightly constrained)' }
      ],
      desc: 'Signal the preferred breadth of the canonical HMW.',
      ph: 'Medium'
    },
    {
      key: 'verb_palette',
      label: 'Verb palette (optional)',
      type: 'textarea',
      desc: 'Outcome-oriented verbs to prefer; helps avoid solution verbs.',
      ph: 'help, enable, reduce, increase, simplify, clarify, support, reassure, connect'
    },

    /* Do/Don’t guardrails */
    {
      key: 'dos',
      label: "Do's (must do)",
      type: 'textarea',
      desc: 'Positive guardrails for phrasing and scope.',
      ph: 'Use plain language; add “so that…” benefit; keep ≤ 20 words'
    },
    {
      key: 'donts',
      label: "Don’ts / constraints",
      type: 'textarea',
      desc: 'What to avoid while phrasing HMWs.',
      ph: 'No baked-in solutions; no jargon; avoid majority-culture assumptions'
    },

    /* Success & test */
    {
      key: 'success_metric',
      label: 'Success metric (leading indicator)',
      type: 'text',
      desc: 'How will we know the HMW led to useful solutions?',
      ph: 'Drop-off step-2 −20% in 4 weeks; SUS +10; NPS +6 among new users'
    }
  ],

  template: (f) => {
    const lines = [];

    const scope = f.scope_pref || 'Medium (Goldilocks default)';
    const who = f.who || '[who]';
    const outcome = f.outcome || '[outcome]';
    const context = f.context_detail ? ` in ${f.context_detail}` : '';
    const constraint = f.constraints ? ` given ${f.constraints}` : '';
    const benefit = f.outcome ? ` so that ${f.outcome}` : '';
    const verbs = (f.verb_palette || 'help, enable, reduce, increase, simplify, clarify, support, reassure, connect')
      .split(/[,;]\s*/).map(v => v.trim()).filter(Boolean);

    // Canonical HMW (avoid solution verbs if user put one in "action")
    const safeAction = (f.action || 'help').replace(/\b(add|build|implement|install|integrate|deploy|launch)\b/gi, 'help');
    const canonical = `How might we ${safeAction} for ${who}${context}${constraint}${benefit}?`;

    lines.push('Create a set of high-quality How-Might-We statements with variants and checks.');
    f.ctx && lines.push(`Context: ${f.ctx}`);
    f.persona && lines.push(`Who is affected Persona lens = 
    ${f.persona}`);
    f.mission && lines.push(`Mission/values: ${f.mission}`);
    f.bias_lens && lines.push(`Bias lens: ${f.bias_lens}`);
    f.bias_watchouts && lines.push(`Bias watch-outs: ${f.bias_watchouts}`);
    f.evidence && lines.push(`Evidence: ${f.evidence}`);
    f.inclusion_notes && lines.push(`Inclusion/accessibility: ${f.inclusion_notes}`);
    f.need && lines.push(`Need/challenge: ${f.need}`);
    f.dos && lines.push(`Do:\n${f.dos}`);
    f.donts && lines.push(`Don’t:\n${f.donts}`);
    f.success_metric && lines.push(`Success metric: ${f.success_metric}`);

    lines.push('');
    lines.push('Output:');

    // A) Canonical + scope setting
    lines.push(`A) Canonical HMW (${scope} scope):`);
    lines.push(canonical);

    // B) Variant set using verb palette and scope shifts
    lines.push('B) Variants (5+): generate 2 broad, 2 narrow, 1 wild “adjacent possible”. Prefer outcome verbs such as: ' + verbs.join(', ') + '.');

    // C) Opposite/de-anchored frames
    lines.push('C) Opposite frames: create 2 “consider the opposite” HMWs to break anchoring (e.g., if we cannot reduce steps, how might we make steps feel rewarding?).');

    // D) Inclusivity/safety rewrites
    lines.push('D) Inclusivity rewrites: provide 2 inclusive versions (accessibility, equity, safety) and explain the change briefly.');

    // E) Constraint-aware rewrite
    lines.push('E) Constraint-aware rewrite: 1 version that explicitly respects key constraints without killing creativity.');

    // F) Bias scan checklist
    lines.push('F) Bias scan (flag & fix if present): anchoring, confirmation, availability, halo, groupthink, scope insensitivity. Rewrite any leading or solution-baked phrasing.');

    // G) Quick rubric (score 1–5)
    lines.push('G) Rubric (score 1–5 each): Clarity • Human specificity • Generativity • Strategic fit • Testability. Recommend top 3 HMWs with reasons.');

    // H) Experiment stub
    lines.push('H) Smallest test (for the top HMW):');
    lines.push('- Hypothesis: If we [idea], then [metric] will improve for [who].');
    lines.push('- Metric: Use the provided success metric or propose a leading indicator.');
    lines.push('- Tiny experiment: Paper prototype / copy tweak / concierge test in 1 week.');
    lines.push('- Decision rule: Scale if effect ≥ X; iterate if 0 < effect < X; stop if ≤ 0.');

    // I) One-line synthesis
    lines.push('I) One-line synthesis: “We will explore [theme] via [top HMW] because [evidence/benefit].”');

    return lines.filter(Boolean).join('\n');
  }
},

{
  id: 'implementation_intentions',
  slug: 'if-then-planning',
  label: 'Implementation Intentions (If–Then)',
  kind: 'pattern',
  categories: ['behavior','productivity'],
  tags: [
    'type:pattern','topic:if-then','topic:habit','topic:coping-plan',
    'phase:plan','phase:apply','level:beginner',
    'use:habit','use:focus','use:emotion-regulation','use:adhd-support'
  ],

  use_cases: [
    'bind a reliable cue to a tiny starter action to reduce choice friction',
    'create coping plans for predictable obstacles',
    'stack a new habit after an existing routine',
    'translate goals into daily cues with a 7-day scorecard'
  ],

  definition:
    'Turn intentions into cue-to-action reflexes: If [observable trigger], then I will [single, mechanical action]. Add a coping If–Then for the most likely obstacle, stack after a routine if helpful, and set a tripwire metric to revise early.',

  help:
    'Provide one clear goal, a concrete trigger you actually encounter, and a tiny then-action that starts in under 2 minutes. Optionally add a coping plan for the top obstacle, a habit stack anchor (After I [routine]...), a tiny reward, and a tripwire metric for revising the plan. You can also use WOOP: Wish, Outcome, Obstacle, Plan.',

  boosters: [
    'Make the trigger observable and frequent (time, place, routine, sensation).',
    'Write the action so half-asleep you could do it in under 120 seconds.',
    'Add one coping If–Then targeting the most likely obstacle.',
    'Rehearse once: visualize cue then action firing immediately.',
    'Attach a tiny reward to reinforce the start, not the finish.',
    'Log a 7-day scorecard and a tripwire that forces plan revision.',
    'Use inclusive cues and actions that work across abilities and bandwidth.'
  ],

  fields: [
    /* Goal and WOOP */
    { key:'goal', label:'Goal intention', type:'textarea',
      desc:'What you want to move forward. Keep it single-focus.',
      ph:'Finish a 2-page project brief this week' },
    { key:'wish', label:'WOOP - Wish (optional)', type:'text',
      desc:'Short description of what you want.',
      ph:'Write consistently each morning' },
    { key:'outcome', label:'WOOP - Outcome (optional)', type:'text',
      desc:'Why it matters. One short sentence.',
      ph:'Less stress and a stronger proposal' },
    { key:'obstacle', label:'WOOP - Obstacle (optional)', type:'text',
      desc:'The inner or outer blocker that usually stops you.',
      ph:'Morning email rabbit hole' },

    /* Primary If-Then */
    { key:'trigger', label:'IF - Trigger or situation', type:'textarea',
      desc:'Observable cue types: time, place, after a routine, app open, body sensation.',
      ph:'When I sit at my desk after making coffee at 8:30...' },
    { key:'action', label:'THEN - Single, mechanical action', type:'textarea',
      desc:'2-minute starter, no decisions required.',
      ph:'Start a 15-minute timer and open Brief_Q2.md' },

    /* Coping and stacking */
    { key:'coping', label:'Coping If–Then (obstacle plan)', type:'textarea',
      desc:'If [obstacle shows up], then I will [replacement action].',
      ph:'If I feel the urge to check email, then I toggle Do Not Disturb and write 1 sentence' },
    { key:'stack_anchor', label:'Habit stack (optional)', type:'textarea',
      desc:'After I [existing routine], I will [new tiny action].',
      ph:'After I put the mug down, I type the brief title' },

    /* Logistics and supports */
    { key:'schedule', label:'Schedule window', type:'text',
      desc:'Timebox or daily window when the cue will occur.',
      ph:'Weekdays 8:30–9:00 AM' },
    { key:'duration', label:'Timebox for the block', type:'text',
      desc:'Default minutes for the first block or timer.',
      ph:'15 minutes' },
    { key:'reward', label:'Tiny reward', type:'text',
      desc:'Simple, immediate reinforcement after starting.',
      ph:'Make tea playlist after the first 3 sentences' },
    { key:'environment', label:'Environment tweak', type:'textarea',
      desc:'Remove friction, place prompts, pin files, block distractions.',
      ph:'Pin the brief in the dock, auto-launch timer, block social sites' },

    /* Inclusion, personas, bias lenses */
    { key:'inclusion', label:'Inclusion and accessibility', type:'textarea',
      desc:'Adjust cues and actions for abilities, language, bandwidth.',
      ph:'Use large-font sticky, audio chime, offline doc for low bandwidth' },
    { key:'personas', label:'Persona context (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Pull from your persona library to tailor language and supports.',
      ph:'ADHD knowledge worker • Low-bandwidth mobile user' },
    { key:'bias_lenses', label:'Bias check lenses (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'bias', autofill:'bias->inline',
      desc:'Heuristics to watch for: optimism, planning fallacy, present bias.',
      ph:'Present bias • Planning fallacy' },

    /* Measurement and revision */
    { key:'tripwire', label:'Tripwire metric', type:'text',
      desc:'Condition that triggers revision of the plan.',
      ph:'If I miss 3 cues in a row, shrink the action by 50 percent' },
    { key:'scorecard', label:'Scorecard target', type:'text',
      desc:'Simple adherence goal for the next 7 days.',
      ph:'4 of 5 weekdays' },
    { key:'checkin', label:'First check-in time', type:'text',
      desc:'When you will review and adjust.',
      ph:'Friday 4:30 PM' },

    /* Extra context */
    { key:'ctx', label:'Context (optional)', type:'textarea',
      desc:'Any constraints or notes the AI should honor.',
      ph:'Travel week, limited mornings, use offline-capable apps' }
  ],

  template: (f) => {
    const toLines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const copingLines = toLines(f.coping);
    const personas = String(f.personas || '').trim();
    const biases = String(f.bias_lenses || '').trim();

    const out = [];

    out.push('Create an Implementation Intentions plan with action and coping If–Then, optional habit stack, and a 7-day scorecard. Keep cues observable and actions mechanical.');

    // Context
    f.ctx && out.push(`Context: ${f.ctx}`);
    f.goal && out.push(`Goal: ${f.goal}`);

    // WOOP block if present
    if (f.wish || f.outcome || f.obstacle) {
      out.push('WOOP:');
      f.wish && out.push(`- Wish: ${f.wish}`);
      f.outcome && out.push(`- Outcome: ${f.outcome}`);
      f.obstacle && out.push(`- Obstacle: ${f.obstacle}`);
    }

    // Primary plan
    f.trigger && out.push(`IF: ${f.trigger}`);
    f.action && out.push(`THEN: ${f.action}`);

    // Coping plan(s)
    if (copingLines.length) {
      out.push('Coping If–Then:');
      copingLines.forEach((c, i) => out.push(`${i + 1}. ${c}`));
    }

    // Habit stack
    f.stack_anchor && out.push(`Habit stack: After I ${f.stack_anchor}`);

    // Logistics
    (f.schedule || f.duration || f.reward || f.environment) && out.push('Supports:');
    f.schedule && out.push(`- Schedule window: ${f.schedule}`);
    f.duration && out.push(`- Timebox: ${f.duration}`);
    f.reward && out.push(`- Tiny reward: ${f.reward}`);
    f.environment && out.push(`- Environment tweak: ${f.environment}`);

    // Inclusion and bias hooks
    (f.inclusion || personas || biases) && out.push('Inclusion and bias checks:');
    f.inclusion && out.push(`- Accessibility and inclusion: ${f.inclusion}`);
    personas && out.push(`- Personas: ${personas}`);
    biases && out.push(`- Bias lenses: ${biases}`);

    // Measurement
    (f.scorecard || f.tripwire || f.checkin) && out.push('Measurement and revision:');
    f.scorecard && out.push(`- Scorecard target: ${f.scorecard}`);
    f.tripwire && out.push(`- Tripwire: ${f.tripwire}`);
    f.checkin && out.push(`- First check-in: ${f.checkin}`);

    // Output instructions
    out.push('Output:');
    out.push('1) Final primary If–Then in one line.');
    if (copingLines.length) out.push('2) Coping If–Then in one line.');
    if (f.stack_anchor) out.push('3) Habit stack in one line.');
    out.push('4) 7-day scorecard with checkboxes for adherence.');
    out.push('5) 10-second rehearsal script that visualizes cue then action.');
    out.push('6) Debiasing and quality check: confirm cue is observable, action starts under 2 minutes, coping plan covers the top obstacle, reward reinforces the start, and tripwire is set.');
    out.push('7) One-line revision rule if the tripwire triggers.');

    return out.join('\n');
  }
},

{
  id: 'inclusive_design',
  slug: 'inclusive-design-framework',
  label: 'Inclusive Design (edge personas)',
  kind: 'framework',
  categories: ['design','ethics','accessibility','research','content'],
  tags: [
    'type:framework','topic:inclusive-design','topic:persona-spectrum','topic:wcag',
    'phase:discover','phase:design','phase:test','level:intermediate',
    'use:product','use:content','use:service-design','use:policy'
  ],

  use_cases: [
    'identify edge personas and mismatches (permanent • temporary • situational)',
    'co-design adaptations that reduce exclusion and cognitive load',
    'map designs to WCAG and beyond (cognition, language, environment)',
    'spec edge-first acceptance criteria and lightweight usability tests',
    'articulate “solve for one → extend to many” benefits with metrics'
  ],

  definition:
    'Design for predictable contexts of exclusion by surfacing mismatches (user × environment × interface), co-designing adaptations with edge personas, and validating that improvements lift outcomes for everyone (solve for one → extend to many).',

  help:
    'Start with at least one edge persona and a concrete barrier. Add the environment, assistive tech, and constraints. Propose specific adaptations, map to WCAG where relevant, plan a quick validation, and define success metrics and universal benefits. Use persona/bias autofill to enrich context.',

  boosters: [
    'Recognize exclusion; treat “edge cases” as design inputs, not exceptions.',
    'Use Persona Spectrum (permanent • temporary • situational) for each need.',
    'Co-design: include lived-experience reviewers before code-complete.',
    'Write adaptations as observable behaviors, not vague intentions.',
    'Pair each adaptation with an acceptance test and a success metric.',
    'Specify cognitive load reductions (steps, memory, reading level).',
    'Name assistive tech and environmental constraints explicitly.',
    'Return one small “do now” improvement and one “follow-on” improvement.'
  ],

  fields: [
    /* People & lenses */
    { key: 'edge_persona', label: 'Persona at the edge — who might struggle most?', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Pull from your persona library; include needs, abilities, devices, language, and constraints.',
      ph: 'Low-vision screen-reader user on mobile • One-handed parent on a bus • Newcomer with limited language' },

    { key: 'spectrum', label: 'Persona Spectrum (P • T • S)', type: 'textarea',
      desc: 'Permanent, temporary, and situational variants of the same need.',
      ph: 'Vision: blind (P) • dilated pupils (T) • glare on screen (S)' },

    { key: 'bias_lenses', label: 'Bias lenses (optional)', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'bias', autofill: 'bias->inline',
      desc: 'Heuristics to watch for (e.g., typical user bias, WEIRD bias, optimistic planning).',
      ph: 'Typical-user bias • Language centrism • Present bias' },

    /* Context & environment */
    { key: 'environment', label: 'Environment & constraints', type: 'textarea',
      desc: 'Situational factors: bandwidth, noise, lighting, motion, device, input mode.',
      ph: 'Low bandwidth, bright sun, noisy bus, small phone, one-handed, intermittent power' },

    { key: 'assistive', label: 'Assistive tech & settings', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'AT', autofill: 'assistive->inline',
      desc: 'Relevant AT or OS features the design should honor.',
      ph: 'Screen reader (TalkBack/VoiceOver) • Switch control • High contrast • Reduce motion' },

    /* Problem framing */
    { key: 'flow', label: 'Target task/flow', type: 'text',
      desc: 'The specific interaction to improve.',
      ph: 'Account sign-up → email verification → first run' },

    { key: 'barrier', label: 'Barrier — what prevents full use?', type: 'textarea',
      desc: 'Name the mismatch (perception, cognition, motor, language, economic, cultural).',
      ph: 'Dense jargon; small hit targets; time-limited code; bandwidth-heavy assets' },

    /* Adaptations & content */
    { key: 'adaptation', label: 'Adaptation — design change to reduce exclusion', type: 'textarea',
      desc: 'Concrete change: controls, sequence, copy, media, defaults; 1 change per line.',
      ph: 'Increase target size to 44px; add “resend code” with no timeouts; plain-language alt text' },

    { key: 'content_rules', label: 'Inclusive content rules (optional)', type: 'textarea',
      desc: 'Language, reading level, tone, examples, localization and RTL considerations.',
      ph: 'Plain language at ~8th grade; examples not culture-bound; avoid idioms; provide glossary' },

    /* Standards mapping */
    { key: 'wcag', label: 'WCAG mapping (optional)', type: 'repeater',
      itemType: 'typeahead', itemLabel: 'SC', autofill: 'wcag->sc',
      desc: 'Map each adaptation to relevant WCAG 2.2 success criteria.',
      ph: '1.4.3 Contrast (Minimum) • 2.1.1 Keyboard • 2.5.5 Target Size' },

    /* Measurement & validation */
    { key: 'metrics', label: 'Success metrics', type: 'textarea',
      desc: 'Define measurable outcomes and thresholds.',
      ph: 'Task completion +15% for screen-reader users; error rate –30%; time on task –20%' },

    { key: 'validation', label: 'Validation plan', type: 'textarea',
      desc: 'Lightweight test with edge participants; protocol, tasks, success criteria.',
      ph: 'Hallway test with 3 SR users; success = complete sign-up without sighted assist in ≤3 min' },

    { key: 'universal_benefit', label: 'Benefit to all — generalization', type: 'textarea',
      desc: 'Explain who else benefits (curb-cut effect).',
      ph: 'Larger targets help cold-weather gloves and tremor; plain language helps non-native speakers' },

    /* Ops & follow-through */
    { key: 'acceptance', label: 'Edge-first acceptance criteria', type: 'textarea',
      desc: 'Observable pass/fail statements centering the edge persona.',
      ph: 'Using VoiceOver only, a first-time user can complete verification within 3 minutes without errors' },

    { key: 'handoffs', label: 'Handoffs & documentation', type: 'textarea',
      desc: 'Notes for engineering, QA, localization, and support.',
      ph: 'ARIA roles; tab order; transcript/captions; string keys for i18n; QA scripts' },

    { key: 'next_steps', label: 'Do-now & follow-on improvements', type: 'textarea',
      desc: 'One small change to ship now; one deeper change next.',
      ph: 'Now: enlarge targets • Next: redesign verification to passwordless magic link' },

    /* Extra context */
    { key: 'ctx', label: 'Context (optional)', type: 'textarea',
      desc: 'Constraints or notes the AI should honor.',
      ph: 'Mobile-first, two-sprint window, regulated industry copy requirements' }
  ],

  template: (f) => {
    const toLines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const listBlock = (label, arr) => arr && arr.length ? [label, ...arr.map((x,i)=>`${i+1}. ${x}`)].join('\n') : null;

    const edgeList = toLines(f.edge_persona);
    const adaptList = toLines(f.adaptation);
    const wcagList = toLines(f.wcag);
    const metricList = toLines(f.metrics);
    const nextList = toLines(f.next_steps);

    const out = [];
    out.push('Apply an Inclusive Design pass with Persona Spectrum, concrete adaptations, edge-first acceptance criteria, and a lightweight validation plan. Be specific and measurable.');

    // Context
    f.ctx && out.push(`Context: ${f.ctx}`);
    f.flow && out.push(`Target flow: ${f.flow}`);

    // People & lenses
    edgeList.length && out.push(listBlock('Edge personas:', edgeList));
    f.spectrum && out.push(`Persona Spectrum (P • T • S):\n${f.spectrum}`);
    const biasTxt = String(f.bias_lenses || '').trim();
    biasTxt && out.push(`Bias lenses: ${biasTxt}`);

    // Environment & AT
    f.environment && out.push(`Environment & constraints:\n${f.environment}`);
    const atTxt = String(f.assistive || '').trim();
    atTxt && out.push(`Assistive tech & settings:\n${atTxt}`);

    // Barrier & adaptations
    f.barrier && out.push(`Barrier:\n${f.barrier}`);
    adaptList.length && out.push(listBlock('Adaptations:', adaptList));

    // Content rules & standards
    f.content_rules && out.push(`Inclusive content rules:\n${f.content_rules}`);
    wcagList.length && out.push(listBlock('WCAG mapping:', wcagList));

    // Measurement & validation
    metricList.length && out.push(listBlock('Success metrics:', metricList));
    f.validation && out.push(`Validation plan:\n${f.validation}`);
    f.universal_benefit && out.push(`Benefit to all:\n${f.universal_benefit}`);

    // Ops
    f.acceptance && out.push(`Edge-first acceptance criteria:\n${f.acceptance}`);
    f.handoffs && out.push(`Handoffs & documentation:\n${f.handoffs}`);
    nextList.length && out.push(listBlock('Next steps (now • later):', nextList));

    // Output spec (instructions to AI)
    out.push('Output:');
    out.push('1) Mismatch map: user × environment × interface (3–5 bullets).');
    out.push('2) Adaptations table (bulleted): change → rationale → WCAG/standard (if any) → acceptance test.');
    out.push('3) Inclusive content rewrite (1 short example of improved copy).');
    out.push('4) Validation script: tasks, participants (edge-first), success criteria, and what to measure.');
    out.push('5) Metrics: target thresholds and how they generalize (curb-cut effect).');
    out.push('6) Risks & trade-offs (performance, localization, support) and mitigations.');
    out.push('7) Change log: what to ship now vs. next sprint.');

    return out.filter(Boolean).join('\n');
  }
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
  categories: ['messaging frameworks', 'persuasion', 'public speaking', 'rhetoric'],
  tags: [
    'type:framework','topic:persuasion','topic:monroe','topic:cta',
    'phase:compose','phase:revise','level:intermediate',
    'use:speechwriting','use:advocacy','use:public-speaking','use:fundraising','use:sales-enablement'
  ],
  use_cases: [
    'structure persuasive talks and pitches that move an audience to act',
    'craft fundraising, policy, or campaign appeals with clear next steps',
    'generate variants (positive / negative / contrast) of the visualization step for testing',
    'adapt one core argument across channels (speech, landing page, email, video script)'
  ],
  boosters: [
    'Map each Need point to a matching Satisfaction point (1:1) to prove the solution *specifically* fixes what hurts.',
    'Choose a Visualization mode: Positive (benefits realized), Negative (cost of inaction), or Contrast (before vs after).',
    'End with a single, concrete Action (who/what/when/where) and remove friction (link/QR/script/phone line).',
    'Braid evidence (logos), credibility (ethos), and emotion (pathos) across steps—do not rely on fear alone.',
    'Align the Need with human motivations (e.g., safety, belonging, esteem, purpose) without treating them as strictly hierarchical.',
    'Ethics guardrail: represent risks fairly, cite sources, and avoid coercive fear appeals; include alternatives/safeguards where relevant.',
    'Localization & inclusion: tailor examples and idioms to the personas’ culture and access needs; offer accessible formats.'
  ],
  definition: 'A five-step persuasive pattern (Attention → Need → Satisfaction → Visualization → Action) that first secures attention, then makes the audience *feel and understand* a problem, proposes a credible solution, future-paces the outcome, and ends with a specific, low-friction call to action.',
  help: 'Provide the audience, the problem/need, and your proposed solution. Select a Visualization mode (positive/negative/contrast), channel and length, and specify the exact Action you want. The model will generate a structured message with ethical, audience-aware language and friction-reducing details.',
  fields: [
    {
      key: 'personas',
      label: 'Audience / personas',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Who are you persuading? Drives tone, examples, and cultural references.',
      ph: 'Healthcare donors; City council staffer; Busy parent; Field technicians'
    },
    {
      key: 'channel',
      label: 'Primary delivery channel',
      type: 'select',
      options: ['live speech','webinar','landing page','email','short video script (≤60s)','long video script (2–5 min)','social post thread'],
      desc: 'We will tailor structure, sentence length, and pacing to this channel.',
      ph: 'live speech'
    },
    {
      key: 'length',
      label: 'Target length / duration',
      type: 'select',
      options: ['60 seconds','3 minutes','5 minutes','~300 words','~600 words'],
      desc: 'Controls depth per step and verbosity.',
      ph: '3 minutes'
    },
    {
      key: 'attention',
      label: 'Attention (hook)',
      type: 'textarea',
      desc: 'Opening device: story, startling fact, question, or vivid image tied to audience values.',
      ph: '“Last winter, 1 in 6 local families lost heat at least once.”'
    },
    {
      key: 'need_points',
      label: 'Need — proof points (one per line)',
      type: 'textarea',
      desc: 'Evidence that a real, relevant problem exists (data, anecdotes, stakes).',
      ph: 'Energy shutoffs increased 22%\nKids miss school from cold-related illness\nEnergy debt traps families'
    },
    {
      key: 'need_motivation',
      label: 'Underlying motivations (non-hierarchical)',
      type: 'select',
      options: ['safety & stability','belonging & community','esteem & status','autonomy & mastery','purpose & legacy','other'],
      desc: 'What human motives this problem triggers; used to heighten salience.',
      ph: 'safety & stability'
    },
    {
      key: 'solution',
      label: 'Satisfaction — your solution',
      type: 'textarea',
      desc: 'What exactly should be done; include mechanism-of-action (how it fixes each need point).',
      ph: 'Warmth Fund covers the arrears gap; auto-enrollment via utility partners; <5% admin overhead'
    },
    {
      key: 'objections',
      label: 'Likely objections & pre-buttals (one per line)',
      type: 'textarea',
      desc: 'Top 3–5 concerns and concise responses.',
      ph: '“Overhead is wasteful” → independent audit under 5%\n“People will abuse it” → eligibility checks monthly'
    },
    {
      key: 'credibility',
      label: 'Ethos / credibility',
      type: 'textarea',
      desc: 'Why you/this solution is trustworthy (experience, partners, results, certifications).',
      ph: 'Partnered with City Housing Office; audited by Smith & Co.; 2,300 families helped last winter'
    },
    {
      key: 'visualization_mode',
      label: 'Visualization mode',
      type: 'select',
      options: ['positive (future if we act)','negative (future if we don’t)','contrast (negative then positive)'],
      desc: 'Controls the future-pacing scene in step 4.',
      ph: 'contrast (negative then positive)'
    },
    {
      key: 'visual_details',
      label: 'Visualization details (sensory cues, characters, setting)',
      type: 'textarea',
      desc: 'Images/sounds/emotions to make the future concrete; keep respectful and specific.',
      ph: 'A warm kitchen at 6am; kids doing homework at the table; quiet furnace hum'
    },
    {
      key: 'cta',
      label: 'Action — call-to-action',
      type: 'textarea',
      desc: 'One specific action: who should do what, where, and when.',
      ph: 'Scan the QR code and pledge $25/month before Friday at 6pm'
    },
    {
      key: 'friction_removers',
      label: 'Friction removers',
      type: 'textarea',
      desc: 'Make acting easy: links, QR, phone script, calendar link, default amounts.',
      ph: 'QR code; one-click Apple/Google Pay; prefilled $25; calendar reminder'
    },
    {
      key: 'safeguards',
      label: 'Ethical safeguards / alternatives',
      type: 'textarea',
      desc: 'Disclosure, consent, opt-out, alternative actions—avoid coercion and fear-only appeals.',
      ph: 'Provide hotline for questions; suggest non-monetary volunteering alternative'
    },
    {
      key: 'bias_checks',
      label: 'Bias & blind-spot checks',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'Cognitive or cultural biases to monitor (sampling, confirmation, fear appeal overuse, WEIRD framing).',
      ph: 'confirmation bias; fear appeal escalation; WEIRD examples'
    },
    {
      key: 'metrics',
      label: 'Success metrics & measurement window',
      type: 'textarea',
      desc: 'Define how you’ll know the CTA worked.',
      ph: 'Pledges: 200 by Friday; conversion ≥ 8%; unsubscribe rate < 0.5%'
    },
    {
      key: 'localization',
      label: 'Localization & inclusion notes (optional)',
      type: 'textarea',
      desc: 'Language choices, reading level, cultural references, accessibility format needs.',
      ph: 'US Spanish version; 6th-grade reading level; alt text for images; captions for video'
    }
  ],
  template: (args) => {
    const {
      personas, channel, length, attention, need_points, need_motivation,
      solution, objections, credibility, visualization_mode, visual_details,
      cta, friction_removers, safeguards, bias_checks, metrics, localization,
      ctx, style, tone
    } = args;

    const toLines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const list = (title, s) => s && `${title}\n` + toLines(s).map((x,i)=>`${i+1}. ${x}`).join('\n');

    // Guidance blocks
    const channelGuide = channel ? `Channel: ${channel} — we will match pacing, sentence length, and structure to this medium.` : null;
    const lengthGuide = length ? `Target length: ${length} — adjust depth per step accordingly.` : null;

    const visGuide = (() => {
      const base = visual_details ? `Use these details: ${visual_details}` : 'Use vivid but respectful sensory details.';
      switch ((visualization_mode || '').toLowerCase()) {
        case 'positive (future if we act)':
          return `Visualization (Positive): Show the world *with* the solution in place—benefits realized, harms reduced. ${base}`;
        case 'negative (future if we don’t)':
          return `Visualization (Negative): Show the credible cost of inaction—consequences if we fail to act. Avoid sensationalism. ${base}`;
        case 'contrast (negative then positive)':
          return `Visualization (Contrast): Briefly paint the negative path (if we do nothing), then flip to the positive path (if we act). ${base}`;
        default:
          return 'Visualization: Choose a mode (positive / negative / contrast) and future-pace respectfully.';
      }
    })();

    const ethics = [
      safeguards && `Ethical safeguards: ${safeguards}`,
      bias_checks && (Array.isArray(bias_checks)
        ? 'Bias checks:\n' + bias_checks.map((b,i)=>`${i+1}. ${b}`).join('\n')
        : `Bias checks:\n${bias_checks}`)
    ].filter(Boolean).join('\n');

    return [
      'Use Monroe’s Motivated Sequence to craft a persuasive, ethical message.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      personas && (Array.isArray(personas)
        ? 'Audience / personas:\n' + personas.map((p,i)=>`${i+1}. ${p}`).join('\n')
        : list('Audience / personas:', personas)),
      channelGuide,
      lengthGuide,
      localization && `Localization & inclusion: ${localization}`,

      attention && `\nAttention (Hook):\n${attention}`,

      need_points && `\nNeed (Problem & Stakes):\n${toLines(need_points).map((x,i)=>`${i+1}. ${x}`).join('\n')}`,
      need_motivation && `Underlying motivations: ${need_motivation}`,

      solution && `\nSatisfaction (Solution & Mechanism):\n${solution}`,
      objections && `Likely objections & pre-buttals:\n${toLines(objections).map((x,i)=>`${i+1}. ${x}`).join('\n')}`,
      credibility && `Credibility (Ethos):\n${credibility}`,

      `\n${visGuide}`,

      cta && `\nAction (Single, Concrete CTA):\n${cta}`,
      friction_removers && `Friction removers:\n${friction_removers}`,

      metrics && `\nSuccess metrics:\n${metrics}`,
      ethics && `\n${ethics}`,

      '\nOutput:',
      '1) A channel-appropriate script/text following A→N→S→V→A.',
      '2) A 1–2 sentence “Because → Therefore” summary.',
      '3) Optional variant: swap Visualization mode (positive/negative/contrast) for A/B testing.',
      '4) Compliance note: cite data sources inline or in footnotes; avoid manipulative claims.'
    ].filter(Boolean).join('\n');
  }
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
  id: 'par',
  slug: 'par-problem-action-result',
  label: 'PAR — Problem · Action · Result',
  kind: 'framework',
  categories: ['storytelling frameworks', 'prompt development techniques'],
  tags: [
    'type:framework','topic:storytelling','phase:apply','level:beginner',
    'use:resume-bullet','use:case-study','use:status-update','use:performance-review'
  ],
  use_cases: [
    'summarize work experience on resumes',
    'write concise case study or incident summaries',
    'prepare performance review notes',
    'give crisp updates in team reports'
  ],
  boosters: [
    'Quantify results with metrics or proxies (%, $, Δ, time saved).',
    'Make the Problem clear and show why it mattered (stakes).',
    'Emphasize your unique role in the Action (avoid “we did” unless team impact is key).',
    'Adapt output tone to context: factual (resume), reflective (review), persuasive (case study).'
  ],
  definition: 'A concise storytelling pattern that frames a challenge (Problem), the steps taken (Action), and the measurable outcome (Result). A simpler alternative to STAR.',
  help: 'Use PAR for clear, structured summaries of your work or impact. Start with the challenge, describe what you did, and end with the result.',
  fields: [
    { key: 'problem', label: 'Problem (situation/stakes)', type: 'textarea',
      desc: 'The obstacle, gap, or situation, ideally with stakes or urgency.',
      ph: 'e.g., High churn after trial threatened renewal revenue' },
    { key: 'action', label: 'Action (your steps)', type: 'textarea',
      desc: 'What you did specifically to address the problem.',
      ph: 'e.g., Designed onboarding emails and in-app tutorials' },
    { key: 'result', label: 'Result (outcome/impact)', type: 'textarea',
      desc: 'The measurable or observable impact of your action.',
      ph: 'e.g., Reduced churn from 14% → 8% within 3 months' },
    { key: 'audience', label: 'Audience (optional)', type: 'text',
      desc: 'Who this output is for (recruiter, manager, client).',
      ph: 'e.g., Performance review' },
    { key: 'format', label: 'Output format (optional)', type: 'text',
      desc: 'Preferred structure: bullet point, short paragraph, or case study snippet.',
      ph: 'e.g., Resume bullet' }
  ],
  template: ({ problem, action, result, audience, format, ctx }) => [
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    problem && `Problem: ${problem}`,
    action && `Action: ${action}`,
    result && `Result: ${result}`,
    format && `Format: ${format}`,
    'Output: structured bullets or summary following Problem → Action → Result.'
  ].filter(Boolean).join('\n')
},

{
  id: 'rap',
  slug: 'rap-result-action-problem',
  label: 'RAP — Result · Action · Problem',
  kind: 'framework',
  categories: ['storytelling frameworks', 'prompt development techniques'],
  tags: [
    'type:framework','topic:storytelling','phase:apply','level:beginner',
    'use:resume-bullet','use:sales-pitch','use:cover-letter','use:investor-pitch'
  ],
  use_cases: [
    'write resume bullets that hook with impact first',
    'open sales or investor pitches with outcomes before context',
    'frame cover letters with results up front',
    'craft concise, high-impact marketing copy'
  ],
  boosters: [
    'Lead with a strong, quantified Result as the hook.',
    'Keep Action phrasing tight and use power verbs.',
    'Frame the Problem/Backdrop in one crisp line for context, not complaint.',
    'Adapt tone for audience (resume = factual; pitch = persuasive).'
  ],
  definition: 'An impact-first storytelling pattern. Start with the outcome, show the action taken, and close with the problem that made it necessary. Useful when attention is scarce.',
  help: 'Use RAP when you need brevity and impact. Start with what was achieved, then show how you did it, then give the backdrop that made it matter.',
  fields: [
    { key: 'result', label: 'Result (hook)', type: 'textarea',
      desc: 'The measurable or impressive outcome (numbers if possible).',
      ph: 'e.g., Increased revenue by $1M (12% YoY)' },
    { key: 'action', label: 'Action (what you did)', type: 'textarea',
      desc: 'Your role, decisions, or steps that produced the result.',
      ph: 'e.g., Led cross-functional mid-market campaign' },
    { key: 'problem', label: 'Backdrop / Problem', type: 'textarea',
      desc: 'The challenge, gap, or need that drove the action.',
      ph: 'e.g., Pipeline relied only on enterprise; mid-market gap' },
    { key: 'audience', label: 'Audience (optional)', type: 'text',
      desc: 'Who the output is for (recruiter, investor, manager, customer).',
      ph: 'e.g., Hiring manager reviewing resume' },
    { key: 'format', label: 'Output format (optional)', type: 'text',
      desc: 'Preferred style: bullet point, short paragraph, or headline.',
      ph: 'e.g., Resume bullet' }
  ],
  template: ({ result, action, problem, audience, format, ctx }) => [
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    result && `Result: ${result}`,
    action && `Action: ${action}`,
    problem && `Problem/Backdrop: ${problem}`,
    format && `Format: ${format}`,
    'Output: concise bullets or short statement starting with the Result.'
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
      autofill: 'persona->inline',
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
  id: 'kaitiakitanga',
  slug: 'kaitiakitanga-guardianship',
  label: 'Kaitiakitanga — Guardianship & Stewardship (Māori)',
  kind: 'framework',
  categories: ['ethics','governance','cultural frameworks'],
  tags: [
    'type:framework','topic:stewardship','topic:intergenerational','topic:mauri',
    'topic:whakapapa','topic:co-governance','phase:plan','level:intermediate',
    'use:ai-governance','use:impact-assessment','use:policy','use:product-strategy'
  ],

  use_cases: [
    'assess long-term responsibilities for places, communities, species, data, or knowledge (taonga)',
    'design safeguards (e.g., rāhui triggers) and monitoring with local guardians (kaitiaki)',
    'set co-governance, escalation paths, and reciprocity duties with affected groups'
  ],

  boosters: [
    "Treat kaitiakitanga as relational and place-based. Do not generalize across iwi/hapū; name the specific partners and tikanga you’ll follow.",
    "Add an intergenerational horizon (25–100 years) and define ‘mauri’ indicators you will uphold.",
    "Name kaitiaki roles, decision rights, and escalation paths; specify how and when guardians can pause/stop activity (rāhui).",
    "State tangible reciprocity (manaakitanga): who benefits, how, and how you’ll remain accountable over time.",
    "If any of: partner consent, guardianship roles, or mauri indicators are missing, insert a clear [[MISSING]] note and a next step."
  ],

  definition: "A stewardship lens grounded in Māori values that centers kinship with place and beings, protection of taonga (treasures), guardians' obligations, and long-term balance. It emphasizes mauri (life force), tikanga (correct practice), and co-governance with kaitiaki.",

  help: "Map the taonga, the people/places (whakapapa), the guardians and protocols (tikanga), what strengthens mauri, and the safeguards you’ll use (including rāhui). The output is a practical plan with roles, metrics, reciprocity, and review cadence. This scaffold does not replace iwi/hapū authority; it helps you prepare and show respect.",

  fields: [
    // Core focus
    { key: 'taonga',
      label: 'Taonga — what are we safeguarding?',
      type: 'textarea',
      desc: 'Name the valued thing(s): place, river, species, language, knowledge, datasets, stories, community trust.',
      ph: 'e.g., Coastal estuary and customary fisheries; Whanganui-style river data; local language archives'
    },

    { key: 'place',
      label: 'Place & context (where/whose place?)',
      type: 'textarea',
      desc: 'Name the rohe (area), waterways, mountains, community context; note prior impacts or existing protections.',
      ph: 'e.g., Te Tai Tokerau coastline; existing rāhui after shellfish die-off in 2023; community monitoring group active'
    },

    // Partners & guardians (persona typeaheads)
    { key: 'kaitiaki_partners',
      label: 'Kaitiaki / mana whenua partners',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'partner',
      autofill: 'persona->inline',
      desc: 'Local guardians or authorities (iwi/hapū/whānau, community groups) who hold rangatiratanga or stewardship roles.',
      ph: 'Start typing to add partners (e.g., [Iwi/Hapū Name], Harbour Care, Marae committee)'
    },

    { key: 'steward_team',
      label: 'Your stewarding team (internal)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'role',
      autofill: 'persona->inline',
      desc: 'Internal roles accountable to kaitiaki (product, data, legal, ops, research, ethics). Include decision rights.',
      ph: 'Start typing to add roles (e.g., Head of Data, Community Liaison, Ops Lead)'
    },

    // Tikanga & consent
    { key: 'tikanga_protocols',
      label: 'Tikanga / protocols & consent',
      type: 'textarea',
      desc: 'Protocols you will follow (engagement order, hui cadence, karakia, data protocols, IP/cultural safety, consent form).',
      ph: 'e.g., Hui at marae before kickoff; co-draft data use protocol; cultural safety training for team'
    },

    // Mauri & indicators
    { key: 'mauri_indicators',
      label: 'Mauri indicators — how do we know vitality is upheld?',
      type: 'textarea',
      desc: 'Define qualitative and quantitative indicators for the vitality of the taonga (ecological, cultural, social, trust).',
      ph: 'e.g., Shellfish abundance index; water clarity; language use at school; community trust score'
    },

    // Impacts & horizons
    { key: 'impacts',
      label: 'Potential impacts (near → long term)',
      type: 'textarea',
      desc: 'Positive and negative impacts, including distribution across groups and generations.',
      ph: 'Near (0–2y): access changes; Mid (3–10y): species recovery; Long (25y+): cultural transmission strengthened'
    },

    { key: 'intergen_horizon',
      label: 'Intergenerational horizon (years)',
      type: 'text',
      desc: 'Commit to a long view aligned with kaitiakitanga.',
      ph: 'e.g., 50'
    },

    // Safeguards & rāhui
    { key: 'rahui_triggers',
      label: 'Safeguards — rāhui triggers & thresholds',
      type: 'textarea',
      desc: 'Explicit conditions to pause/stop or restrict activity; who declares and how it’s communicated/lifted.',
      ph: 'e.g., Turbidity > threshold 14 days; health event; species mortality spike; misuse of taonga data'
    },

    { key: 'monitoring',
      label: 'Monitoring & reporting cadence',
      type: 'textarea',
      desc: 'What you measure, by whom, how often, and where results are published. Include co-review with kaitiaki.',
      ph: 'Monthly ecological + cultural health review; quarterly public dashboard; annual hui for adaptive changes'
    },

    // Reciprocity & benefits
    { key: 'reciprocity',
      label: 'Manaakitanga — reciprocity & benefits',
      type: 'textarea',
      desc: 'Tangible benefits to affected communities and places: capability, resources, revenue share, data returns, access.',
      ph: 'e.g., Fund local monitoring gear; paid guardian seats; bilingual materials; data sovereignty tools'
    },

    // Governance & escalation
    { key: 'governance',
      label: 'Governance & escalation paths',
      type: 'textarea',
      desc: 'Decision rights, veto/stop powers, dispute resolution, and escalation to guardians.',
      ph: 'e.g., Joint governance board with guardian veto on ecological risk; independent mediator named'
    },

    // Knowledge & data safety
    { key: 'knowledge_safety',
      label: 'Knowledge & data protocols (taonga, IP, sovereignty)',
      type: 'textarea',
      desc: 'Rules for handling taonga works/data (classification, consent, access, storage, CARE-aligned sharing).',
      ph: 'e.g., Classified “taonga data”; guardians co-own access keys; no secondary use without new consent'
    },

    // Non-actions (restraint)
    { key: 'non_actions',
      label: 'Non-actions (deliberate restraint)',
      type: 'textarea',
      desc: 'What you will not do; removes over-control and reduces harm.',
      ph: 'e.g., No commercial harvest; no model training on taonga data; no drones over wāhi tapu'
    }
  ],

  template: (f) => {
    const toLines = (x) => Array.isArray(x) ? x : String(x || '').split(/\n+/).map(s => s.trim()).filter(Boolean);
    const list = (label, val) => val && toLines(val).length ? `${label}\n` + toLines(val).map((v,i)=>`  ${i+1}. ${v}`).join('\n') : '';
    const simple = (label, val) => val ? `${label}\n${val}` : '';

    const horizon = f.intergen_horizon ? `${f.intergen_horizon} years` : '[[MISSING: intergenerational horizon]]';
    const missing = (k, note) => f[k] ? '' : `[[MISSING: ${note}]]`;

    return [
      'Apply a Kaitiakitanga (guardianship) plan. This scaffold is relational and place-based; it does not replace iwi/hapū authority. Center local kaitiaki.',
      f.ctx && `Context: ${f.ctx}`,

      simple('Taonga (what we are safeguarding):', f.taonga || '[[MISSING: taonga]]'),
      simple('Place & context:', f.place || '[[MISSING: place/rohe context]]'),

      list('Kaitiaki / mana whenua partners:', f.kaitiaki_partners) || '[[MISSING: named kaitiaki/mana whenua partners]]',
      list('Your stewarding team (internal):', f.steward_team) || '[[MISSING: internal stewarding roles]]',

      simple('Tikanga / protocols & consent:', f.tikanga_protocols || '[[MISSING: protocols and consent approach]]'),
      simple('Mauri indicators (how vitality is upheld):', f.mauri_indicators || '[[MISSING: mauri indicators]]'),

      simple('Potential impacts (near → long term):', f.impacts || '[[MISSING: impact mapping]]'),
      `Intergenerational horizon: ${horizon}`,

      simple('Safeguards — rāhui triggers & thresholds:', f.rahui_triggers || '[[MISSING: explicit pause/stop conditions]]'),
      simple('Monitoring & reporting cadence:', f.monitoring || '[[MISSING: cadence and co-review]]'),

      simple('Manaakitanga — reciprocity & benefits:', f.reciprocity || '[[MISSING: concrete reciprocity]]'),
      simple('Governance & escalation paths:', f.governance || '[[MISSING: decision rights, dispute resolution, guardian veto/stop]]'),
      simple('Knowledge & data protocols (taonga, IP, sovereignty):', f.knowledge_safety || '[[MISSING: data/knowledge safety]]'),
      simple('Non-actions (deliberate restraint):', f.non_actions || '[[MISSING: explicit non-actions]]'),

      '',
      'Checklist for the AI (do not omit):',
      '- Treat kaitiakitanga as relational and place-specific; avoid token language.',
      '- Name the kaitiaki partners and their decision rights. If unknown, insert [[MISSING]] with a next-step engagement.',
      '- Keep mauri indicators actionable (ecological + cultural + trust).',
      '- Include rāhui triggers with thresholds and comms plan (who declares, how lifted).',
      '- State reciprocity (manaakitanga) and reporting cadence openly.',
      '- Add a clear intergenerational lens and record how today’s actions strengthen mauri over time.',
      '- If any critical element is missing (partners, consent, mauri, safeguards), flag it explicitly and propose the next respectful step (hui, co-draft protocol, pause).',

      '',
      'Output:',
      '1) Whakapapa map (people/places/taonga touched; partners named).',
      '2) Mauri plan (indicators, baseline, target state, how measured).',
      '3) Safeguards (rāhui triggers, thresholds, comms, release conditions).',
      '4) Governance (roles, decision rights, escalation, dispute-resolution).',
      '5) Manaakitanga & reciprocity (tangible benefits, capacity-building).',
      '6) Intergenerational horizon and “leave-better-than-found” commitment.',
      '7) Monitoring & public reporting cadence (with co-review by kaitiaki).',
      '8) Non-actions (restraints) and risks explicitly accepted.',
      '9) Next respectful step if any [[MISSING]] remains (who, when, where).'
    ].filter(Boolean).join('\n');
  }
},

{
  id: 'kansei_engineering',
  slug: 'kansei-engineering',
  label: 'Kansei Engineering (Emotion → Design Mapping)',
  kind: 'framework',
  categories: ['design', 'research', 'analysis frameworks'],
  tags: [
    'type:framework','topic:emotion-design','topic:user-research',
    'phase:discover','phase:design','phase:validate','level:intermediate',
    'use:feature-mapping','use:experience-goals','use:brand-expression','use:ux-copy'
  ],
  use_cases: [
    'translate target feelings into concrete design parameters',
    'build a testable Emotion → Stimulus map with success criteria',
    'prioritize features and micro-interactions by affective impact',
    'align brand emotions with visual, copy, motion, sound, and material design',
    'validate emotional effects on prototypes before commit'
  ],
  boosters: [
    'Limit to ≤5 core emotion goals; define them in users’ native language (avoid translation drift).',
    'Anchor each emotion on 7-point semantic differential scales with clear antonyms (e.g., Calm ↔ Tense).',
    'Map emotions to multi-sensory levers (visual, microcopy, motion/latency, sound/haptics, material).',
    'Pre-test the emotion lexicon; refine with factor analysis or clustering before feature mapping.',
    'Use counterbalanced stimuli and randomization; document base rates and control conditions.',
    'Quantify links (e.g., regression/Quantification Theory I/II); for lean runs, use A/B + SD ratings.',
    'Include accessibility & ethics checks (contrast, motion sensitivity, cultural color/gesture meanings).',
    'Pre-register decision rules (e.g., Trust ≥ +1.0, Clarity no worse than baseline).'
  ],
  definition: 'A user-centered method (Nagamachi) that captures target emotions (Kansei), maps them to specific design attributes, and validates the mapping empirically—turning feelings into design data.',
  help: '1) Specify audience, context, and ≤5 emotion goals with antonym anchors. 2) List design levers (stimuli). 3) Propose Emotion → Lever hypotheses with rationale. 4) Define measures and a validation study (method, sample, criteria). 5) Add bias/ethics/accessibility checks, confounds, localization, and a decision rule.',
  fields: [
    {
      key: 'audience',
      label: 'Audience / segment',
      type: 'textarea',
      desc: 'Who will feel these emotions? Include culture/locale if relevant.',
      ph: 'e.g., First-time fintech users in Japan (20–35)',
    },
   {
      key: 'audience',
      label: 'Audience / personas',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Who will experience the emotions? Include culture/locale if relevant.',
      ph: 'e.g., First-time fintech users in Japan (20–35)'
    },
    {
      key: 'context',
      label: 'Context of use',
      type: 'textarea',
      desc: 'Scenario, device, constraints, and moments that matter.',
      ph: 'e.g., Mobile onboarding at night; low light; flaky network'
    },
    {
      key: 'emotions',
      label: 'Target emotion words (≤5, one per line)',
      type: 'textarea',
      desc: 'Local-language emotion terms; concise and concrete.',
      ph: 'Calm\nTrust\nDelight\nClarity',
      ui: { repeater: true, typeahead: ['Calm','Trust','Delight','Confidence','Reassured','Playful','Serene','Excited','Premium','Safe'] }
    },
    {
      key: 'anchors',
      label: 'Semantic differential anchors (one per line)',
      type: 'textarea',
      desc: 'Opposite poles for 7-point scales per emotion.',
      ph: 'Calm ↔ Tense\nTrust ↔ Suspicion\nDelight ↔ Dull\nClarity ↔ Confusion'
    },
    {
      key: 'weights',
      label: 'Emotion weights / priorities (optional)',
      type: 'text',
      desc: 'Relative importance for trade-offs.',
      ph: 'Trust: 0.4, Clarity: 0.3, Calm: 0.2, Delight: 0.1'
    },
    {
      key: 'stimuli',
      label: 'Design levers / stimuli (one per line)',
      type: 'textarea',
      desc: 'List levers: visual, microcopy, motion/latency, sound/haptics, material.',
      ph: 'Color palette (muted vs saturated)\nMicrocopy tone (assuring vs playful)\nLatency (TTI under 1000ms)\nMotion (ease-out vs bounce)\nSound (soft chime vs none)'
    },
    {
      key: 'mapping',
      label: 'Emotion → Feature hypotheses (one per line)',
      type: 'textarea',
      desc: 'Link each emotion to specific levers with a short rationale.',
      ph: 'Trust: neutral palette + precise microcopy + visible encryption icon (signals credibility)\nCalm: longer ease-out motion + reduced cognitive load on forms'
    },
    {
      key: 'measures',
      label: 'Measures & scales',
      type: 'textarea',
      desc: 'How emotions and side-effects will be measured.',
      ph: '7-pt SD for each anchor; SUS; task success & time; NASA-TLX; opt-in HRV (optional)'
    },
    {
      key: 'validation',
      label: 'Validation plan',
      type: 'textarea',
      desc: 'Method, sample, counterbalancing, success criteria, analysis.',
      ph: 'Within-subjects SD ratings on 3 prototypes; n=24; counterbalanced order; α=.05; success = +1.0 on Trust & no drop on Clarity; analysis: QTT-I + paired t-tests'
    },
    {
      key: 'confounds',
      label: 'Potential confounds & controls',
      type: 'textarea',
      desc: 'Non-design drivers of emotion you’ll control or record.',
      ph: 'Brand familiarity; price salience; network speed; prior negative incidents'
    },
    {
      key: 'localization',
      label: 'Localization & translation notes',
      type: 'textarea',
      desc: 'Cultural/linguistic nuance for emotion words and cues.',
      ph: '“Warm” maps to “gentle” in JP microcopy; avoid idioms; verify color symbolism'
    },
    {
      key: 'bias_checks',
      label: 'Bias, culture & accessibility checks',
      type: 'textarea',
      desc: 'Enumerate specific biases/risks to monitor and mitigate.',
      ph: 'Add one bias per line with a note on mitigation.',
    },
    {
      key: 'bias_checks',
      label: 'Bias, culture & accessibility checks (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'Capture specific bias or risk items to check during design and validation.',
      ph: 'e.g., Color meanings vary by culture; Motion may trigger vestibular discomfort; Gendered microcopy; WEIRD sampling'
    },
    {
      key: 'guardrails',
      label: 'Ethical & safety guardrails',
      type: 'textarea',
      desc: 'Non-negotiables (e.g., no dark patterns, motion limits, privacy).',
      ph: 'No deceptive urgency; motion respects reduced-motion settings; no fear-priming'
    },
    {
      key: 'risks',
      label: 'Risks & mitigations',
      type: 'textarea',
      desc: 'Top risks to validity or user well-being and how you’ll mitigate.',
      ph: 'Placebo effects → include sham variant; motion nausea → alternate static path'
    },
    {
      key: 'decision_rule',
      label: 'Decision rule',
      type: 'text',
      desc: 'Pre-commit go/no-go or iterate criteria.',
      ph: 'Ship v2 if Trust ≥ +1.0 and Delight ≥ +0.5 with no metric regressions'
    }
  ],
  template: ({ audience, context, emotions, anchors, weights, stimuli, mapping, measures, validation, confounds, localization, bias_checks, guardrails, risks, decision_rule, ctx, style, tone }) => [
    'Apply Kansei Engineering: translate emotions into design and validate empirically.',
    ctx && `Context: ${ctx}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    audience && `Audience: ${audience}`,
    context && `Use context:\n${context}`,
    emotions && `Emotion goals (≤5):\n${emotions}`,
    anchors && `Semantic differential anchors:\n${anchors}`,
    weights && `Emotion weights:\n${weights}`,
    stimuli && `Design levers / stimuli:\n${stimuli}`,
    mapping && `Emotion → Feature hypotheses:\n${mapping}`,
    measures && `Measures & scales:\n${measures}`,
    validation && `Validation plan:\n${validation}`,
    confounds && `Potential confounds & controls:\n${confounds}`,
    localization && `Localization & translation notes:\n${localization}`,
    (bias_checks && String(bias_checks).trim().length > 0) && `Bias/culture/accessibility checks:\n${bias_checks}`,
    guardrails && `Ethical & safety guardrails:\n${guardrails}`,
    risks && `Risks & mitigations:\n${risks}`,
    decision_rule && `Decision rule:\n${decision_rule}`,
    'Output:\n1) Kansei lexicon & 7-pt scales\n2) Mapping table (Emotion → Lever → Rationale)\n3) Prioritized backlog (impact × feasibility)\n4) Validation design & analysis plan\n5) Risks, bias & accessibility mitigations\n6) Decision rule & next steps'
  ].filter(Boolean).join('\n')
},

  {
  id: 'kepner_tregoe',
  slug: 'kepner-tregoe-psdm',
  label: 'Kepner–Tregoe (Situation · Problem · Decision · Potential Problem)',
  kind: 'framework',
  categories: ['decision', 'quality', 'operations', 'risk'],
  tags: [
    'type:framework','topic:psdm','topic:root-cause','topic:criteria-weighting','topic:risk',
    'phase:analyze','phase:decide','phase:plan','level:intermediate',
    'use:option-selection','use:incident-response','use:risk-management','use:change-approval','use:vendor-evaluation'
  ],
  use_cases: [
    'separate problem analysis from decision analysis',
    'choose among alternatives with explicit must/want criteria',
    'stabilize incidents and find verified root causes',
    'anticipate downstream risks and define prevention/contingency',
    'produce an auditable decision record for stakeholders'
  ],
  boosters: [
    'Timebox each track (SA/PA/DA/PPA) to avoid analysis paralysis; loop if stakes demand.',
    'In PA, write an IS / IS-NOT spec for what, where, when, extent; hunt for distinctions & changes.',
    'In DA, screen options with MUSTs first; score WANTs with weights (0–5 or 0–10), then check risks.',
    'In PPA, for each potential problem, capture cause → preventive action → contingent action → trigger → owner.',
    'Record data sources & assumptions; if weak, add a fast test to upgrade the evidence.',
    'Assign owners and dates for every next step; end with a one-line decision record (Because → Therefore).'
  ],
  definition: 'A four-track critical thinking method: Situation Appraisal (prioritize and assign), Problem Analysis (verify root cause), Decision Analysis (select option via must/want criteria and risk), and Potential Problem Analysis (anticipate and mitigate implementation risks).',
  help: 'Fill the four tracks succinctly. Keep facts separate from assumptions. Use MUST/WANT criteria and weighted scoring for decisions. Close with a decision record (choice, rationale, risks, next actions, owners, dates).',
  fields: [
    // People & context
    {
      key: 'audience',
      label: 'Stakeholders / personas',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Who cares about this outcome? Include approvers, users, operators.',
      ph: 'e.g., On-call SRE; Product Owner; Compliance Lead; Customer Success Manager'
    },
    { key: 'context', label: 'Context / scope', type: 'textarea',
      desc: 'Boundaries, constraints, environment, definition of done.',
      ph: 'e.g., Checkout latency incident in EU region; scope: API v2 only; DoD: p95<500ms for 24h'
    },

    // Situation Appraisal (SA)
    { key: 'sa_concerns', label: 'SA — List concerns (one per line)', type: 'textarea',
      desc: 'Issues, decisions, plans, risks to consider.',
      ph: 'Latency spike after release\nCustomer comms plan\nRollback decision' },
    { key: 'sa_priorities', label: 'SA — Priority rationale', type: 'text',
      desc: 'Impact × urgency × trend; what’s first and why.',
      ph: '1) Latency spike (high impact, rising); 2) Rollback; 3) Comms' },
    { key: 'sa_next_steps', label: 'SA — Owners & next steps', type: 'textarea',
      desc: 'Who does what by when.',
      ph: 'Infra: assess DB index by 15:00\nComms: status page update now' },

    // Problem Analysis (PA)
    { key: 'pa_problem', label: 'PA — Problem statement', type: 'text',
      desc: 'Single-sentence description of the symptom.',
      ph: 'p95 latency degraded to 2.5s in EU after 14:55' },
    { key: 'pa_is_is_not', label: 'PA — IS / IS-NOT spec (what/where/when/extent)', type: 'textarea',
      desc: 'Contrast to isolate the cause; include patterns and exclusions.',
      ph: 'WHAT: API v2 IS slow; API v1 IS-NOT\nWHERE: EU IS; US IS-NOT\nWHEN: after 14:55 IS; before 14:55 IS-NOT\nEXTENT: p95=2.5s IS; p99 error rate stable IS-NOT' },
    { key: 'pa_distinctions', label: 'PA — Distinctions & changes', type: 'textarea',
      desc: 'What is different about the IS vs IS-NOT cases; what changed near onset.',
      ph: 'EU DB index rolled out at 14:40; connection pool size reduced in EU only' },
    { key: 'pa_causes', label: 'PA — Possible causes (one per line)', type: 'textarea',
      desc: 'Hypotheses that explain ALL facts in IS/IS-NOT.',
      ph: 'Mis-tuned DB index\nHot code path calling N+1 queries' },
    { key: 'pa_tests', label: 'PA — Tests/verification', type: 'textarea',
      desc: 'How you will confirm the true cause quickly.',
      ph: 'Rollback index in EU; compare latency; trace API v2 for N+1' },

    // Decision Analysis (DA)
    { key: 'da_statement', label: 'DA — Decision statement', type: 'text',
      desc: 'Do what, about what, by when.',
      ph: 'Choose remediation for EU latency by 17:00' },
    { key: 'da_musts', label: 'DA — MUST criteria (one per line)', type: 'textarea',
      desc: 'Non-negotiables; options failing any must are eliminated.',
      ph: 'No data loss\nNo additional downtime\nCompliant with change policy' },
    { key: 'da_wants', label: 'DA — WANT criteria + weights (one per line)', type: 'textarea',
      desc: 'Desirables with weights in ( ), e.g., 0–5 scale.',
      ph: 'Speed of recovery (5)\nLow user impact (4)\nLow effort (2)' },
    { key: 'da_options', label: 'DA — Options (one per line)', type: 'textarea',
      desc: 'Feasible alternatives to choose among.',
      ph: 'Revert index now\nRetune index live\nHotfix code path\nTraffic shift to US' },
    { key: 'da_scoring', label: 'DA — Scoring notes', type: 'textarea',
      desc: 'Which options pass MUSTs; WANT scores & totals; tie-break logic.',
      ph: 'Revert passes MUSTs; total WANT score = 34 > others; tie-break: risk lower' },
    { key: 'da_risks', label: 'DA — Adverse consequences / mitigations', type: 'textarea',
      desc: 'Identify downside of selected option and how you’ll reduce it.',
      ph: 'Overnight job delay → increase batch window; comms to merchants' },

    // Potential Problem Analysis (PPA)
    { key: 'ppa_potential', label: 'PPA — Potential problems (one per line)', type: 'textarea',
      desc: 'What could go wrong with the chosen plan.',
      ph: 'Rollback fails\nJob overrun\nCustomer confusion' },
    { key: 'ppa_causes', label: 'PPA — Likely causes (one per line)', type: 'textarea',
      desc: 'What would make each problem occur.',
      ph: 'Replica lag\nCron overlap\nAmbiguous status page copy' },
    { key: 'ppa_preventive', label: 'PPA — Preventive actions', type: 'textarea',
      desc: 'Reduce the likelihood of each problem.',
      ph: 'Verify replica health; lock cron windows; rewrite status text' },
    { key: 'ppa_contingent', label: 'PPA — Contingent actions', type: 'textarea',
      desc: 'If it happens, what you’ll do.',
      ph: 'Abort rollback and fail forward; manual job pause; targeted email' },
    { key: 'ppa_triggers', label: 'PPA — Triggers / early warnings', type: 'textarea',
      desc: 'Signals that should fire the contingent action.',
      ph: 'Replica lag > 150ms\nBatch runtime > 30m\nCSAT dip > 10%' },
    { key: 'ppa_owners', label: 'PPA — Owners & timing', type: 'textarea',
      desc: 'Who owns each preventive/contingent action and when.',
      ph: 'DBA: replica checks 16:30\nComms: draft update by 16:15' },

    // Evidence, bias & governance
    { key: 'data_sources', label: 'Evidence & data sources', type: 'textarea',
      desc: 'Where facts came from; quality and freshness of data.',
      ph: 'APM traces; DB metrics; release log; customer tickets (last 2h)' },
    { key: 'assumptions', label: 'Assumptions (to validate)', type: 'textarea',
      desc: 'Assumptions still in play; plan a quick test for risky ones.',
      ph: 'Index change caused latency → test by rollback' },
    {
      key: 'bias_checks',
      label: 'Bias / culture / safety checks',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'Specific biases or risks to watch (confirmation, sunk cost, groupthink, etc.).',
      ph: 'e.g., Confirmation bias; Authority bias; Local maxima bias; HIPPO; Overconfidence'
    },

    // Decision record & follow-up
    { key: 'chosen_option', label: 'Decision record — chosen option', type: 'text',
      desc: 'Which option you selected.',
      ph: 'Revert index now; schedule re-index off-peak' },
    { key: 'rationale', label: 'Decision record — rationale (Because → Therefore)', type: 'textarea',
      desc: 'Why this choice best meets MUST/WANT criteria and handles risk.',
      ph: 'Because it restores p95 fastest and meets MUSTs with lowest risk, therefore we revert now and re-index later.' },
    { key: 'next_actions', label: 'Next actions & owners', type: 'textarea',
      desc: 'Concrete steps to execute the decision.',
      ph: 'DBA: revert at 16:45\nSRE: monitor p95\nComms: status page + email\nOwner: Ops lead' },
    { key: 'review', label: 'Review date / success metrics', type: 'text',
      desc: 'When and how you’ll assess success.',
      ph: 'Post-incident review tomorrow 10:00; success = p95<500ms for 24h; no error spikes' }
  ],
  template: (args) => {
    const {
      audience, context,
      sa_concerns, sa_priorities, sa_next_steps,
      pa_problem, pa_is_is_not, pa_distinctions, pa_causes, pa_tests,
      da_statement, da_musts, da_wants, da_options, da_scoring, da_risks,
      ppa_potential, ppa_causes, ppa_preventive, ppa_contingent, ppa_triggers, ppa_owners,
      data_sources, assumptions, bias_checks,
      chosen_option, rationale, next_actions, review,
      ctx, style, tone
    } = args;

    const toLines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const listBlock = (title, s) => s && `${title}\n` + toLines(s).map((x,i)=>`${i+1}. ${x}`).join('\n');

    const out = [
      'Apply Kepner–Tregoe (SA → PA → DA → PPA).',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      audience && ('Stakeholders / personas:\n' + (Array.isArray(audience) ? audience.map((p,i)=>`${i+1}. ${p}`).join('\n') : String(audience))),
      context && `Scope & context:\n${context}`,

      // SA
      listBlock('Situation Appraisal — Concerns:', sa_concerns),
      sa_priorities && `SA — Priority rationale: ${sa_priorities}`,
      listBlock('SA — Owners & next steps:', sa_next_steps),

      // PA
      pa_problem && `Problem Analysis — Problem statement: ${pa_problem}`,
      pa_is_is_not && `PA — IS / IS-NOT spec:\n${pa_is_is_not}`,
      listBlock('PA — Distinctions & changes:', pa_distinctions),
      listBlock('PA — Possible causes:', pa_causes),
      listBlock('PA — Tests / verification:', pa_tests),

      // DA
      da_statement && `Decision Analysis — Decision statement: ${da_statement}`,
      listBlock('DA — MUST criteria:', da_musts),
      listBlock('DA — WANT criteria + weights:', da_wants),
      listBlock('DA — Options:', da_options),
      da_scoring && `DA — Scoring notes:\n${da_scoring}`,
      listBlock('DA — Adverse consequences / mitigations:', da_risks),

      // PPA
      listBlock('PPA — Potential problems:', ppa_potential),
      listBlock('PPA — Likely causes:', ppa_causes),
      listBlock('PPA — Preventive actions:', ppa_preventive),
      listBlock('PPA — Contingent actions:', ppa_contingent),
      listBlock('PPA — Triggers / early warnings:', ppa_triggers),
      listBlock('PPA — Owners & timing:', ppa_owners),

      // Evidence & bias
      data_sources && `Evidence & data sources:\n${data_sources}`,
      assumptions && `Assumptions (to validate):\n${assumptions}`,
      bias_checks && ('Bias / culture / safety checks:\n' + (Array.isArray(bias_checks) ? bias_checks.map((b,i)=>`${i+1}. ${b}`).join('\n') : String(bias_checks))),

      // Decision record
      chosen_option && `Decision record — chosen option: ${chosen_option}`,
      rationale && `Decision record — rationale:\n${rationale}`,
      listBlock('Next actions & owners:', next_actions),
      review && `Review date / success metrics: ${review}`,

      'Output:\n1) SA queue with owners & priorities\n2) PA cause verified by IS/IS-NOT + tests\n3) DA choice with MUST/WANT math + risk plan\n4) PPA register (preventive, contingent, triggers, owners)\n5) Decision record & review checkpoint'
    ];

    return out.filter(Boolean).join('\n');
  }
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
  id: 'maslaha_public_interest',
  slug: 'maslaha-public-interest-reasoning',
  label: 'Maṣlaḥa — Public Interest Reasoning (Islamic Ethics)',
  kind: 'framework',
  categories: ['ethics', 'governance', 'cultural frameworks', 'policy'],
  tags: [
    'type:framework','topic:public-interest','topic:maqasid','topic:harm-benefit',
    'topic:proportionality','topic:legal-maxims','phase:plan','phase:review','level:advanced',
    'use:policy','use:governance','use:risk-balancing','use:equity-impact','use:exception-handling'
  ],
  use_cases: [
    'weigh public harms/benefits for a policy or product decision',
    'craft proportionate, transparent justifications with safeguards and sunset reviews',
    'design culturally aware exceptions and appeal processes',
    'align options with the maqāṣid al-sharīʿa (objectives) and legal maxims',
    'bridge Western risk–benefit methods with Middle Eastern ethical reasoning'
  ],
  boosters: [
    'Rank affected goods by tier: ḍarūrī (necessity) > ḥājī (need) > taḥsīnī (refinement).',
    'Screen options with legal maxims (no harm; hardship brings ease; custom is authoritative) before scoring.',
    'Show an explicit lesser-harm choice when no harmless option exists; document conditions/limits.',
    'Quantify severity × likelihood for harms/benefits; note uncertainty and evidence strength.',
    'State precedents and texts that support or constrain your choice; avoid claims of benefit without proof.',
    'Add equity checks for vulnerable groups; define exceptions, appeal paths, and review cadence.',
    'Write a one-line public rationale (Because → Therefore) and a decision rule for future reevaluation.'
  ],
  definition: 'A public-interest reasoning lens from Islamic legal ethics that prioritizes welfare and harm-minimization within the objectives of the law (maqāṣid). It balances evidence, proportionality, custom, and maxims to select the option that best secures essential goods while averting greater harms.',
  help: '1) State the issue, scope, and stakeholders (personas). 2) Identify maqāṣid impacted and rank by necessity (ḍarūrī/ḥājī/taḥsīnī). 3) List options; screen out those that breach decisive constraints or maxims. 4) For remaining options, compare harms/benefits with severity × likelihood and equity impacts. 5) Propose a proportionate ruling with conditions, safeguards, and a review date. 6) Record precedent, evidence, biases, and a public-facing rationale. Include Western-bridging notes when needed for non-specialist audiences.',
  fields: [
    {
      key: 'issue',
      label: 'Issue / decision',
      type: 'textarea',
      desc: 'What must be decided and why it matters now.',
      ph: 'e.g., Should we enable biometric login for low-end Android devices to reduce account takeovers?'
    },
    {
      key: 'stakeholders',
      label: 'Stakeholders / personas (one per line or typeahead)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'People/groups affected (users, operators, neighbors, regulators, vulnerable groups).',
      ph: 'Frontline delivery workers\nLow-literacy users\nSecurity team\nLocal regulators'
    },
    {
      key: 'context',
      label: 'Context & scope',
      type: 'textarea',
      desc: 'Locale, custom (ʿurf), legal environment, constraints, time horizon.',
      ph: 'MENA markets; high SIM swap fraud; budget-limited; Ramadan peak hours'
    },
    {
      key: 'maqasid',
      label: 'Maqāṣid impacted (objectives)',
      type: 'textarea',
      desc: 'Which objectives are at stake (e.g., life, intellect, property, family/lineage, religion) and how.',
      ph: 'Property (protect users’ funds); Intellect (avoid dark patterns); Life (safety for delivery riders)'
    },
    {
      key: 'tiering',
      label: 'Priority tier (ḍarūrī / ḥājī / taḥsīnī)',
      type: 'text',
      desc: 'Rank the dominant objective(s) by necessity level.',
      ph: 'ḍarūrī (essential) for property protection; ḥājī for convenience'
    },
    {
      key: 'options',
      label: 'Options under consideration (one per line)',
      type: 'textarea',
      desc: 'Feasible alternatives, including “do nothing.”',
      ph: 'A) Enable biometrics for all\nB) Biometrics opt-in with education\nC) SMS OTP only (status quo)\nD) Hardware key pilot for high-risk users'
    },
    {
      key: 'constraints',
      label: 'Constraints / red lines',
      type: 'textarea',
      desc: 'Non-negotiables (legal, security, accessibility, decisive texts/principles).',
      ph: 'No coerced biometrics; must pass accessibility; data storage limits; avoid deception'
    },
    {
      key: 'maxims',
      label: 'Legal maxims screen',
      type: 'textarea',
      desc: 'Apply relevant maxims (no harm; hardship begets facility; custom is authoritative; certainty is not overruled by doubt; actions are by intentions). Note any option eliminated.',
      ph: 'Option A conflicts with “no harm” for survivors of domestic abuse (coercion risk) → eliminate A'
    },
    {
      key: 'harms',
      label: 'Harms / risks (severity × likelihood)',
      type: 'textarea',
      desc: 'List foreseeable harms per option; rate 1–5 for severity and likelihood; mark uncertainty.',
      ph: 'B: Coerced unlock — Sev 4, Lik 2 (uncertain); Data breach impact — Sev 5, Lik 1'
    },
    {
      key: 'benefits',
      label: 'Benefits (magnitude × likelihood)',
      type: 'textarea',
      desc: 'List benefits per option; rate 1–5 for magnitude and likelihood; mark uncertainty.',
      ph: 'B: Reduced ATO — Mag 4, Lik 3; Faster login — Mag 3, Lik 4'
    },
    {
      key: 'equity',
      label: 'Equity & vulnerable groups',
      type: 'textarea',
      desc: 'Who bears the harms? Who gains the benefits? Accessibility and inclusion considerations.',
      ph: 'Blind users; feature phones; refugees without stable IDs'
    },
    {
      key: 'precedent',
      label: 'Precedents / principles / evidence',
      type: 'textarea',
      desc: 'Texts, policies, case analogies, empirical data supporting or constraining action.',
      ph: 'Consumer protection regs; prior rulings on coercion; fraud analytics report; industry codes'
    },
    {
      key: 'bias_checks',
      label: 'Bias & ethical dilemma checks',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'List cognitive/social biases, ethical dilemmas, or cultural blind spots to watch.',
      ph: 'Confirmation bias; WEIRD sampling; urban bias; stigma risk for certain names/accents'
    },
    {
      key: 'proportionality',
      label: 'Proportionality & lesser-harm reasoning',
      type: 'textarea',
      desc: 'Explain why the chosen option secures greater goods or averts greater harms with least side-effects.',
      ph: 'B secures property (ḍarūrī) with lower coercion risk than A; conditions mitigate residual risk'
    },
    {
      key: 'safeguards',
      label: 'Safeguards / conditions / exceptions',
      type: 'textarea',
      desc: 'Preventive measures, carve-outs, consent requirements, rate limits, transparency notices.',
      ph: 'Opt-in + informed consent; easy opt-out; “panic PIN”; rate-limit unlock attempts; audit logs'
    },
    {
      key: 'ruling',
      label: 'Ruling / decision (Because → Therefore)',
      type: 'textarea',
      desc: 'Concise, public-facing conclusion linking evidence, maqāṣid, and proportionality.',
      ph: 'Because B secures essential property interests with minimal harm and passes maxims, therefore adopt B with safeguards'
    },
    {
      key: 'monitoring',
      label: 'Monitoring plan & metrics',
      type: 'textarea',
      desc: 'What to track, early-warning triggers, who monitors, cadence.',
      ph: 'Weekly fraud rate; coercion reports; accessibility complaints; trigger: +20% coercion reports'
    },
    {
      key: 'appeals',
      label: 'Appeal / override & review cadence',
      type: 'textarea',
      desc: 'How affected parties can contest; scheduled review and sunset.',
      ph: 'User appeal channel; external ombud review; 90-day sunset unless renewed'
    },
    {
      key: 'western_bridge',
      label: 'Bridge note for Western audiences (optional)',
      type: 'textarea',
      desc: 'One-paragraph explanation drawing parallels (e.g., proportionality, public interest tests) without erasing differences.',
      ph: 'This balances goods much like proportionality analysis in constitutional law but is bounded by maqāṣid and legal maxims'
    }
  ],
  template: (args) => {
    const {
      issue, stakeholders, context, maqasid, tiering, options, constraints, maxims,
      harms, benefits, equity, precedent, bias_checks, proportionality,
      safeguards, ruling, monitoring, appeals, western_bridge, ctx, style, tone
    } = args;

    const toLines = (s) => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const list = (title, s) => s && `${title}\n` + toLines(s).map((x,i)=>`${i+1}. ${x}`).join('\n');

    return [
      'Apply Maṣlaḥa (public-interest reasoning) with maqāṣid & maxims.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,

      issue && `Issue / decision:\n${issue}`,
      stakeholders && (Array.isArray(stakeholders)
        ? 'Stakeholders / personas:\n' + stakeholders.map((p,i)=>`${i+1}. ${p}`).join('\n')
        : list('Stakeholders / personas:', stakeholders)),
      context && `Context & scope:\n${context}`,

      maqasid && `Maqāṣid impacted:\n${maqasid}`,
      tiering && `Priority tier: ${tiering}`,

      list('Options:', options),
      constraints && `Constraints / red lines:\n${constraints}`,
      maxims && `Legal maxims screen:\n${maxims}`,

      harms && `Harms / risks (severity × likelihood):\n${harms}`,
      benefits && `Benefits (magnitude × likelihood):\n${benefits}`,
      equity && `Equity & vulnerable groups:\n${equity}`,

      precedent && `Precedents / principles / evidence:\n${precedent}`,
      bias_checks && (Array.isArray(bias_checks)
        ? 'Bias & ethical dilemma checks:\n' + bias_checks.map((b,i)=>`${i+1}. ${b}`).join('\n')
        : `Bias & ethical dilemma checks:\n${bias_checks}`),

      proportionality && `Proportionality & lesser-harm reasoning:\n${proportionality}`,
      safeguards && `Safeguards / conditions / exceptions:\n${safeguards}`,
      ruling && `Ruling (Because → Therefore):\n${ruling}`,

      monitoring && `Monitoring plan & metrics:\n${monitoring}`,
      appeals && `Appeal / override & review cadence:\n${appeals}`,
      western_bridge && `Bridge note (Western audience):\n${western_bridge}`,

      'Output:\n1) Screened option set (maxims/constraints)\n2) Ranked harms/benefits with equity notes\n3) Proportionate ruling with safeguards\n4) Monitoring + appeal + review cadence\n5) Public-facing rationale (Because → Therefore)'
    ].filter(Boolean).join('\n');
  }
},
{
  id: 'musyawarah_mufakat',
  slug: 'musyawarah-mufakat-indonesia',
  label: 'Musyawarah & Mufakat — Deliberation to Consensus (Indonesia)',
  kind: 'framework',
  categories: ['decision', 'facilitation', 'cultural frameworks', 'governance'],
  tags: [
    'type:framework','topic:consensus','topic:deliberation','topic:pancasila',
    'phase:decide','phase:facilitate','level:intermediate',
    'use:group-decisions','use:policy','use:community','use:participatory-planning'
  ],
  use_cases: [
    'facilitate inclusive deliberation that leads to a legitimate consensus',
    'surface objections, modify options, and document “can live with” agreements',
    'run village/organizational forums (Musyawarah Desa, coalition meetings)',
    'produce transparent decision records (minutes, consensus text, owners/dates)'
  ],
  boosters: [
    'Representation first: confirm all materially affected groups are present or consulted before seeking consensus.',
    'Use round-robin speaking and “steelman then respond.”',
    'Require one explicit objection-handling pass before closing.',
    'Consent test: “Can you live with option X if we add Y?”—seek explicit assent.',
    'Publish notulen (minutes) + keputusan musyawarah (decision record) with owners/dates and review cadence.',
    'Power checks: rotate facilitation; allow anonymous input; disclose criteria for accepting/rejecting proposals.',
    'Cultural fit: honor adat and gotong royong while staying evidence-informed and accessible.'
  ],
  definition: 'A culturally grounded, consensus-first decision process: open deliberation (musyawarah) that seeks a mutually acceptable agreement (mufakat), prioritizing dignity, inclusion, and social cohesion over adversarial wins.',
  help: 'Provide the issue, participants/personas, options, concerns, and consensus mode. The model will facilitate a musyawarah flow (air views → shape options → test consensus → document mufakat), including objection handling, safeguards, a clear decision record, and follow-up.',
  fields: [
    { key: 'issue', label: 'Issue / decision', type: 'textarea',
      desc: 'What must be decided; scope and constraints.', ph: 'e.g., Priorities for next year’s community budget' },

    { key: 'participants', label: 'Participants (names/roles; one per line)', type: 'textarea',
      desc: 'List attendees or groups represented.', ph: 'Rina — youth lead\nPak Budi — neighborhood chair\nClinic nurse rep' },

    { key: 'personas', label: 'Audience / personas (for inclusive language & examples)',
      type: 'repeater', itemType: 'typeahead', itemLabel: 'persona', autofill: 'persona->inline',
      desc: 'Segments that shape tone, examples, and materials.', ph: 'Urban poor households; Small traders; Disability advocates' },

    { key: 'session_mode', label: 'Session mode', type: 'select',
      options: [
        'Musyawarah Desa (village assembly) — formal, broad participation, recorded minutes',
        'Musrenbang-style planning forum — proposals ladder upward',
        'Organizational/coalition meeting — internal governance with stakeholders'
      ],
      desc: 'Sets procedure, documentation, and escalation paths.',
      ph: 'Musyawarah Desa (village assembly) — formal, broad participation, recorded minutes' },

    /* NEW: English default + optional Bahasa elements */
    { key: 'include_bahasa', label: 'Include Bahasa Indonesia terms & mini-glossary?', type: 'select',
      options: [
        'no (English only — default)',
        'yes — include key terms (musyawarah, mufakat, gotong royong, adat) and a short glossary'
      ],
      desc: 'English is the default output. Choose “yes” if you want Indonesian terms preserved with brief definitions.',
      ph: 'no (English only — default)'
    },

    { key: 'values', label: 'Guiding values / principles (optional)', type: 'textarea',
      desc: 'E.g., Pancasila (especially sila ke-4), adat norms, equity, transparency.',
      ph: 'Pancasila #4 (deliberation/representation); equity; transparency; respect' },

    { key: 'evidence', label: 'Evidence & lived experience inputs', type: 'textarea',
      desc: 'Key data points and community stories to consider.',
      ph: 'Survey: 28% households face water outages; testimony from RT03 caregivers' },

    { key: 'options', label: 'Options (one per line)', type: 'textarea',
      desc: 'Candidate choices; can be adapted during musyawarah.',
      ph: 'Prioritize clean water pumps\nUpgrade clinic night shift\nScholarships for vocational training' },

    { key: 'criteria', label: 'Decision criteria', type: 'textarea',
      desc: 'How options will be judged (fairness, cost, reach, urgency, feasibility).',
      ph: 'Urgency; households helped; cost per household; long-term impact; feasibility this year' },

    { key: 'concerns', label: 'Concerns / objections (one per line)', type: 'textarea',
      desc: 'Known risks or conflicts to address in objection handling.',
      ph: 'Elite capture; affordability; staffing limits; land-use disputes' },

    { key: 'consensus_mode', label: 'Consensus mode', type: 'select',
      options: [
        'Mufakat (full consensus) — explicit assent from all present',
        'Consent (no strong objection) — “can live with it” standard',
        'Layered: seek mufakat, else consent with recorded reservations',
        'Timebound: seek mufakat; if deadlocked, schedule revisit or pilot'
      ],
      desc: 'Defines how agreement is confirmed and what to do if deadlocked.',
      ph: 'Layered: seek mufakat, else consent with recorded reservations' },

    { key: 'fallback_protocol', label: 'Fallback protocol (if no consensus)', type: 'select',
      options: [
        'Revisit after info-gathering (set date & owner)',
        'Pilot a limited option; review before scaling',
        'Escalate to representative body / adat council',
        'Supermajority vote (record minority opinion) — last resort'
      ],
      desc: 'Respectful path that preserves relationships and legitimacy.',
      ph: 'Pilot a limited option; review before scaling' },

    { key: 'inclusion_supports', label: 'Inclusion supports', type: 'textarea',
      desc: 'Practical aids to participation (childcare, stipends, translation, accessibility).',
      ph: 'Childcare; transport voucher; sign-language interpreter; large-print materials' },

    { key: 'bias_checks', label: 'Bias / blind-spot checks',
      type: 'repeater', itemType: 'typeahead', itemLabel: 'bias', autofill: 'bias->inline',
      desc: 'Common risks: elite capture, gender silencing, urban bias, confirmation bias.',
      ph: 'elite capture; gender dynamics; recency bias; tokenism' },

    { key: 'consensus', label: 'Consensus statement (draft)', type: 'textarea',
      desc: 'Plain-language draft to refine (what we’re agreeing to and why).',
      ph: 'We agree to prioritize clean water pumps in RW 1–5 this year, with…' },

    { key: 'follow_up', label: 'Follow-up actions & owners', type: 'textarea',
      desc: 'Who will do what by when; include monitoring & communication.',
      ph: 'Public works maps pumps (Dina) by 1 Aug; budget request (Arif) by 10 Aug; monthly status post' },

    { key: 'cross_cultural_note', label: 'Include cross-cultural explainer?', type: 'select',
      options: [
        'auto (default) — include a short note only if audience is likely unfamiliar',
        'include — always add a concise explainer',
        'include (expanded) — add a brief paragraph with examples',
        'omit — do not include an explainer'
      ],
      desc: 'Controls whether the output includes a ready-made explainer comparing consensus-first Musyawarah to adversarial voting.',
      ph: 'auto (default) — include a short note only if needed' },

    { key: 'audience_familiarity', label: 'Audience familiarity (if known)', type: 'select',
      options: ['mixed / unknown','familiar with Indonesian practice','unfamiliar / Western norms'],
      desc: 'Tuning parameter for the optional explainer.',
      ph: 'mixed / unknown' },

    { key: 'review_date', label: 'Review date / cadence', type: 'text',
      desc: 'When to revisit the decision and assess outcomes.',
      ph: 'Quarterly; next review 30 Nov' }
  ],
  template: (args) => {
    const {
      issue, participants, personas, session_mode, include_bahasa, values, evidence,
      options, criteria, concerns, consensus_mode, fallback_protocol,
      inclusion_supports, bias_checks, consensus, follow_up,
      cross_cultural_note, audience_familiarity, review_date,
      ctx, style, tone
    } = args;

    const toLines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const enumList = (title, s) => s && `${title}\n` + toLines(s).map((x,i)=>`${i+1}. ${x}`).join('\n');

    const wantBahasa = (include_bahasa || '').toLowerCase().startsWith('yes');
    const glossary = wantBahasa
      ? 'Glossary: musyawarah = deliberation; mufakat = consensus; gotong royong = mutual aid; adat = customary law/norms.'
      : null;

    const shouldExplain = (() => {
      const mode = (cross_cultural_note || 'auto').toLowerCase();
      const fam  = (audience_familiarity || 'mixed / unknown').toLowerCase();
      if (mode.startsWith('omit')) return false;
      if (mode.startsWith('include')) return true;
      // auto: include iff unfamiliar or mixed/unknown
      return fam.includes('unfamiliar') || fam.includes('mixed');
    })();

    const explainer = shouldExplain
      ? ((cross_cultural_note || '').toLowerCase().includes('expanded')
          ? 'Cross-cultural explainer: In Musyawarah (deliberation), proposals are modified until stakeholders can accept them; Mufakat (consensus) affirms a solution people can live with. Unlike adversarial majority voting, the emphasis is cohesion and dignity—dissent is addressed by adjusting options or adding safeguards, not outvoting.'
          : 'Cross-cultural explainer: Musyawarah = deliberation; Mufakat = consensus. Rather than a majority defeating a minority, proposals are adjusted until participants can accept them, preserving cohesion and legitimacy.')
      : null;

    return [
      'Facilitate a Musyawarah → Mufakat process (deliberation to consensus) in clear English, honoring Indonesian practice while ensuring inclusion and transparency.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,

      issue && `\nIssue / Decision:\n${issue}`,
      participants && enumList('Participants:', participants),

      personas && (Array.isArray(personas)
        ? 'Audience / personas:\n' + personas.map((p,i)=>`${i+1}. ${p}`).join('\n')
        : enumList('Audience / personas:', personas)),

      session_mode && `Session mode: ${session_mode}`,
      values && `Guiding values / principles:\n${values}`,

      evidence && `\nEvidence & lived experience:\n${evidence}`,
      options && enumList('Initial options:', options),
      criteria && `Decision criteria:\n${criteria}`,
      concerns && enumList('\nKnown concerns / objections:', concerns),

      consensus_mode && `\nConsensus mode: ${consensus_mode}`,
      fallback_protocol && `Fallback protocol (if no consensus): ${fallback_protocol}`,
      inclusion_supports && `Inclusion supports:\n${inclusion_supports}`,

      bias_checks && (Array.isArray(bias_checks)
        ? 'Bias / blind-spot checks:\n' + bias_checks.map((b,i)=>`${i+1}. ${b}`).join('\n')
        : `Bias / blind-spot checks:\n${bias_checks}`),

      explainer && `\n${explainer}`,
      glossary && `${glossary}`,

      '\nProcess:',
      '- 1) Framing: confirm scope, constraints, and representation of affected groups.',
      '- 2) Musyawarah (deliberation): round-robin speaking; “steelman then respond”; log proposals and rationales.',
      '- 3) Option shaping: adapt/merge options; add safeguards to address concerns; map revisions to criteria.',
      '- 4) Consensus test: use the selected mode (mufakat / consent / layered). Seek explicit assent; avoid treating silence as agreement.',
      '- 5) Objection-handling pass: record objections; modify options or add safeguards; retest consensus.',
      '- 6) Mufakat (agreement): read back the agreement; confirm owners/dates; note reservations if any.',
      '- 7) Documentation: publish minutes (notulen) and the decision record (keputusan musyawarah); share appeal/revisit path.',

      consensus && `\nConsensus statement (draft to refine):\n${consensus}`,
      follow_up && `Follow-up actions & owners:\n${follow_up}`,
      review_date && `Review cadence: ${review_date}`,

      '\nOutput:',
      'A) Final consensus text (plain English) with rationale linked to concerns & criteria.',
      'B) Action list with named owners, dates, and monitoring/communication steps.',
      'C) Minutes + decision record, including any reservations.',
      'D) Inclusion log (who was present/consulted, supports provided) and bias-check notes.'
    ].filter(Boolean).join('\n');
  }
},
  {
  id: 'naive_dialecticism',
  slug: 'naive-dialecticism-east-asia',
  label: 'Naïve Dialecticism (East Asian Holistic Reasoning)',
  kind: 'framework',
  categories: ['reasoning', 'philosophy', 'cultural frameworks'],
  tags: [
    'type:framework','topic:both-and','topic:contradiction','topic:holism',
    'phase:explore','phase:integrate','level:advanced',
    'use:paradox-framing','use:change-over-time','use:consensus-design'
  ],
  use_cases: [
    'frame tensions as “both true in different respects” and design coexistence',
    'blend stakeholder views into a context-fitted middle (Zhongyong) or complementary pair (Yin–Yang)',
    'plan reversible probes when conditions are in flux; set triggers for pivots',
    'adapt Western analytic cases to East/Southeast Asian consensus practices (e.g., musyawarah → mufakat)'
  ],
  boosters: [
    'Name *where* each side holds: “A holds under ___; ¬A holds under ___.” Scope beats slogans.',
    'Treat contradictions as signals to **broaden context** or **shift time horizon** before forcing a decision.',
    'Design a “small harmonizing step” that reduces friction without erasing difference.',
    'Log at least one **coexistence pattern** (e.g., time-slicing, space-splitting, role-separating) before any merger.',
    'Respect cultural plurality: avoid essentializing “East vs West”; document local practices (adat, gotong royong) and how they shape the solution.'
  ],
  definition: 'A culturally informed reasoning stance—common across East Asia—that expects change, tolerates contradiction, and reasons holistically across context. It prefers “both–and” integration or respectful coexistence over binary wins, and often locates a fitting middle (Zhongyong), a complement of opposites (Yin–Yang), or a consensus everyone can live with (mufakat).',
  help: 'List opposing poles, contextual factors, and where each claim holds. Choose a dialectical lens (e.g., Yin–Yang, Zhongyong, Musyawarah→Mufakat) and a session goal (divergent discovery, convergent harmonization, probe/pilot). The template will produce both-and statements, coexistence/integration moves, and a time-based plan with pivot triggers. Includes optional cross-cultural notes for Western audiences; adds personas and bias checks.',

  fields: [
    {
      key: 'personas',
      label: 'Audience / personas',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Stakeholder segments whose values/examples should shape tone and design.',
      ph: 'e.g., Factory operators; Village elders; Procurement; Climate advocates'
    },
    {
      key: 'lens',
      label: 'Dialectical lens',
      type: 'select',
      options: [
        'Yin–Yang (complementary opposites; maintain dynamic balance)',
        'Zhongyong / Middle Way (fitting mean after weighing extremes)',
        'Buddhist conditionality (truths are contingent; avoid clinging to absolutes)',
        'Musyawarah → Mufakat (deliberation to consensus; Indonesia)',
        'Tri Hita Karana (harmony among people–nature–the transcendent; Bali)',
        'Coexistence patterning (time/space/role separation rather than fusion)'
      ],
      desc: 'Sets how the “both–and” move is framed and justified.',
      ph: 'Musyawarah → Mufakat (deliberation to consensus; Indonesia)'
    },
    {
      key: 'session_goal',
      label: 'Session goal',
      type: 'select',
      options: [
        'Divergent — surface partial truths & contradictions without solving yet',
        'Convergent — craft a coexistence/integration that parties can live with',
        'Probe — design a small, reversible test to learn before committing',
        'Park & watch — define signals and a review window; defer merger'
      ],
      desc: 'Determines whether to open options, harmonize, experiment, or timebox deferral.',
      ph: 'Convergent — craft a coexistence/integration that parties can live with'
    },

    /* ===== Language handling updated: English default + optional terms/glossary ===== */
    {
      key: 'include_bahasa',
      label: 'Include Bahasa/Indonesian terms & mini-glossary?',
      type: 'select',
      options: [
        'no (English only — default)',
        'yes — include key terms with brief definitions (e.g., musyawarah, mufakat, gotong royong, adat)'
      ],
      desc: 'Output is in English by default. Select “yes” to preserve Indonesian key terms with a mini-glossary.',
      ph: 'no (English only — default)'
    },

    {
      key: 'poles',
      label: 'Opposed poles (A vs. ¬A)',
      type: 'textarea',
      desc: 'Name the tension plainly (no strawmen).',
      ph: 'e.g., Centralized standards (A) vs. Local autonomy (¬A)'
    },
    {
      key: 'scope_a',
      label: 'Scope where A holds',
      type: 'textarea',
      desc: 'Contexts, constraints, and time horizons where A is valid/useful.',
      ph: 'High risk; multi-site compliance; new staff; crisis periods'
    },
    {
      key: 'scope_not_a',
      label: 'Scope where ¬A holds',
      type: 'textarea',
      desc: 'Contexts where the opposite or alternative is valid/useful.',
      ph: 'Mature teams; stable environments; culturally specific practices'
    },
    {
      key: 'context',
      label: 'Context factors (one per line)',
      type: 'textarea',
      desc: 'Field/relationship variables: people, place, time, norms, dependencies.',
      ph: 'Regulatory cycle\nHarvest season\nRelational hierarchies\nSupply constraints'
    },
    {
      key: 'indonesian_practices',
      label: 'Indonesian lenses (optional)',
      type: 'textarea',
      desc: 'Adat/custom, gotong royong (mutual aid), musyawarah/mufakat, Pancasila #4, budi (reason–feeling integration).',
      ph: 'Gotong royong for maintenance days; Musyawarah for policy shifts; Tri Hita Karana for land–water use'
    },
    {
      key: 'tensions',
      label: 'Specific tensions / failure modes',
      type: 'textarea',
      desc: 'Where do frictions show up (status, face, timing, metrics, authority)?',
      ph: 'Face loss in public critique; KPI conflict; vendor lock-in; language register'
    },
    {
      key: 'moves',
      label: 'Harmony-seeking moves (coexistence & integration)',
      type: 'textarea',
      desc: 'Concrete patterns: time-slicing, space-splitting, role separation, layered standards, dual metrics.',
      ph: 'Time-slice: centralize during audits, localize otherwise\nDual metrics: quality (local) + compliance (central)'
    },
    {
      key: 'both_and',
      label: 'Both–and statement (single paragraph)',
      type: 'textarea',
      desc: 'Synthesize without erasing difference; include limits and review window.',
      ph: 'We keep a lean central backbone while granting local parametric freedom within guardrails…'
    },
    {
      key: 'probe',
      label: 'Probe / pilot plan (if goal = Probe)',
      type: 'textarea',
      desc: 'Hypothesis, smallest test, success criteria, ethics/safeguards.',
      ph: 'Run 6-week trial in 2 districts; success if complaint rate ↓20% with ≤2% compliance drift'
    },
    {
      key: 'triggers',
      label: 'Change triggers & pivot thresholds',
      type: 'textarea',
      desc: 'Early signals that flip which side should dominate; include time horizon.',
      ph: 'Spike in non-compliance >3% (A dominates); staff tenure >18mo (¬A dominates)'
    },
    {
      key: 'bias_checks',
      label: 'Bias / blind-spot checks',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'E.g., confirmation, WEIRD framing, majority-imposes-consensus, recency.',
      ph: 'WEIRD examples; elite capture; fear of loss face; false dichotomy'
    },

    /* ===== Replace freeform explainer with toggles like your other template ===== */
    {
      key: 'cross_cultural_note',
      label: 'Include cross-cultural explainer?',
      type: 'select',
      options: [
        'auto (default) — include a short note only if audience is likely unfamiliar',
        'include — always add a concise explainer',
        'include (expanded) — add a brief paragraph with examples',
        'omit — do not include an explainer'
      ],
      desc: 'Controls whether the output includes a ready-made explainer comparing “both–and”/consensus reasoning with adversarial, either–or norms.',
      ph: 'auto (default) — include a short note only if needed'
    },
    {
      key: 'audience_familiarity',
      label: 'Audience familiarity (if known)',
      type: 'select',
      options: ['mixed / unknown','familiar with dialectical practice','unfamiliar / Western norms'],
      desc: 'Tuning parameter for the optional explainer.',
      ph: 'mixed / unknown'
    },

    {
      key: 'review',
      label: 'Review date / cadence',
      type: 'text',
      desc: 'When to revisit the arrangement, with whom, and how.',
      ph: 'Quarterly; Musyawarah-style check-in on 30 Nov'
    }
  ],

  template: (args) => {
    const {
      personas, lens, session_goal, include_bahasa,
      poles, scope_a, scope_not_a, context, indonesian_practices,
      tensions, moves, both_and, probe, triggers, bias_checks,
      cross_cultural_note, audience_familiarity, review, ctx, style, tone
    } = args;

    const toLines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const listBlock = (title, s) => s && `${title}\n` + toLines(s).map((x,i)=>`${i+1}. ${x}`).join('\n');

    // Lens guidance for the AI
    const lensGuide = (() => {
      const L = (lens || '').toLowerCase();
      if (L.includes('yin')) return 'Lens: Yin–Yang — treat A and ¬A as interdependent. Specify what each guards against, how dominance alternates with context/time, and which feedbacks maintain balance.';
      if (L.includes('zhongyong') || L.includes('middle')) return 'Lens: Zhongyong / Middle Way — fully understand extremes, then justify a context-fitted mean (not an average).';
      if (L.includes('buddhist')) return 'Lens: Buddhist conditionality — state conditions under which each claim holds; avoid absolutes; prefer “when/if” clauses.';
      if (L.includes('musyawarah')) return 'Lens: Musyawarah → Mufakat — modify options until parties can live with them; record reservations; run an objection-handling pass; document the decision record.';
      if (L.includes('tri hita')) return 'Lens: Tri Hita Karana — evaluate impacts across people↔people, people↔nature, and the transcendent/cultural duties; ensure no leg is neglected.';
      if (L.includes('coexistence')) return 'Lens: Coexistence patterning — avoid forced fusion; implement time-slicing, space-splitting, or role-separation with clear interfaces.';
      return 'Lens: Dialectical (general) — expect change, accept scoped contradictions, and fit solutions to context.';
    })();

    // Goal guidance for the AI
    const goalGuide = (() => {
      const G = (session_goal || '').toLowerCase();
      if (G.startsWith('divergent')) return 'Goal mode: Divergent — collect partial truths; write paired “A true when ___ / ¬A true when ___”; do not merge yet.';
      if (G.startsWith('convergent')) return 'Goal mode: Convergent — design a coexistence/integration pattern; run consent tests (“can you live with it if…?”); attach safeguards.';
      if (G.startsWith('probe')) return 'Goal mode: Probe — create a reversible pilot with success metrics and ethics guardrails; set pivot thresholds.';
      if (G.startsWith('park')) return 'Goal mode: Park & watch — document known unknowns, define revisit signals, set a firm review date.';
      return null;
    })();

    // Optional Bahasa/terms mini-glossary
    const wantBahasa = (include_bahasa || '').toLowerCase().startsWith('yes');
    const glossary = wantBahasa
      ? 'Glossary (terms preserved with brief defs): musyawarah = deliberation; mufakat = consensus; gotong royong = mutual aid; adat = customary norms.'
      : null;

    // Cross-cultural explainer auto logic
    const shouldExplain = (() => {
      const mode = (cross_cultural_note || 'auto').toLowerCase();
      const fam  = (audience_familiarity || 'mixed / unknown').toLowerCase();
      if (mode.startsWith('omit')) return false;
      if (mode.startsWith('include')) return true;
      // auto: include iff unfamiliar or mixed/unknown
      return fam.includes('unfamiliar') || fam.includes('mixed');
    })();

    const explainer = shouldExplain
      ? ((cross_cultural_note || '').toLowerCase().includes('expanded')
          ? 'Cross-cultural explainer: Dialectical reasoning treats apparently contradictory claims as conditionally true under different scopes (time/place/role). Rather than eliminating one side, we design coexistence or a fitting middle. In consensus-first practice, proposals are adjusted until parties can accept them; dissent is addressed by revising options or adding safeguards rather than outvoting.'
          : 'Cross-cultural explainer: “Both–and” reasoning scopes truths to context and time. Instead of forcing a binary win, we seek coexistence or a fitted middle, and adjust proposals until stakeholders can accept them.')
      : null;

    const inclusion = personas
      ? (Array.isArray(personas)
          ? 'Audience / personas:\n' + personas.map((p,i)=>`${i+1}. ${p}`).join('\n')
          : listBlock('Audience / personas:', personas))
      : null;

    const bias = bias_checks
      ? (Array.isArray(bias_checks)
          ? 'Bias / blind-spot checks:\n' + bias_checks.map((b,i)=>`${i+1}. ${b}`).join('\n')
          : `Bias / blind-spot checks:\n${bias_checks}`)
      : null;

    return [
      'Apply Naïve Dialecticism (East Asian holistic reasoning) in clear English, with cultural respect and anti-essentialism.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,
      lensGuide,
      goalGuide,
      inclusion,

      poles && `\nTension:\n${poles}`,
      scope_a && `Where A holds:\n${scope_a}`,
      scope_not_a && `Where ¬A holds:\n${scope_not_a}`,

      context && `Context factors:\n${toLines(context).map((x,i)=>`${i+1}. ${x}`).join('\n')}`,
      indonesian_practices && `Indonesian lenses applied:\n${indonesian_practices}`,
      tensions && `Specific tensions / failure modes:\n${tensions}`,

      moves && `Harmony-seeking moves (coexistence & integration):\n${moves}`,
      both_and && `Both–and statement:\n${both_and}`,

      probe && `Probe / pilot plan:\n${probe}`,
      triggers && `Change triggers & pivot thresholds:\n${triggers}`,

      bias,
      explainer && `\n${explainer}`,
      glossary && `${glossary}`,

      '\nOutput:',
      '1) Scoped truths for A and ¬A (contexts & limits).',
      '2) Chosen coexistence/integration pattern with safeguards and owners.',
      '3) If Probe: a reversible pilot with success metrics and ethics notes.',
      '4) Decision record suitable for consensus documentation (where applicable).',
      '5) Review plan with triggers acknowledging change over time.'
    ].filter(Boolean).join('\n');
  }
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
  label: 'Kano Model — Must-be · Performance · Delighters',
  kind: 'framework',
  categories: ['prioritization','product management','ux','research'],
  tags: [
    'type:framework','topic:kano','topic:user-satisfaction','phase:prioritize','level:intermediate',
    'use:backlog-refinement','use:research-synthesis','use:roadmap'
  ],

  use_cases: [
    'separate table-stakes from differentiators',
    'decide what prevents complaints vs. what creates delight',
    'synthesize survey/interview findings into a build-now list',
    'facilitate feature trade-offs with product, design, and engineering'
  ],

  boosters: [
    'Give a 1–2 sentence rationale per item grounded in a quote, metric, or observation.',
    'Segment explicitly (e.g., newcomers vs. power users); categories can flip by segment.',
    'If you have data, compute Timko CS (customer satisfaction) and DS (dissatisfaction).',
    'Pair categories with feasibility: add Effort and Strategic Fit to avoid “delight myopia.”',
    'Revisit quarterly; Delighters drift toward Performance or Must-be over time.'
  ],

  definition: 'Kano classifies features by how presence/absence affects satisfaction. Buckets: Must-be (basics), Performance (linear value), Delighters (wow), plus Indifferent/Reverse/Questionable. Optionally quantify with Timko coefficients.',

  help: 'Enter candidate features, segments (personas), and any evidence. Choose a Study mode (the value is a directive the AI will follow). Pick table/chart preferences; their values are also injected as explicit instructions.',

  fields: [
    {
      key: 'study_mode',
      label: 'Study mode',
      type: 'select',
      desc: 'Select how the AI should analyze and synthesize your inputs.',
      options: [
        {
          value: 'Study Mode: Run FULL Kano with paired functional/dysfunctional interpretations. If timko_counts are provided, compute Timko coefficients per feature (CS=(A+O)/(A+O+M+I), DS=-(M+O)/(A+O+M+I)). Flag Questionable/Reverse. Split by segments where provided. Produce category calls with 1–2 sentence rationales, then a validation note on wording/sample/reliability.',
          label: 'Full Kano + Timko (quantitative synthesis)'
        },
        {
          value: 'Study Mode: Run LITE Kano classification from interviews/observations only. Infer categories directionally from quotes/behaviors. For each feature, include a Confidence tag (High/Med/Low) and at least one supporting quote or observation. Highlight where data is thin and propose 2 validation steps.',
          label: 'Lite Kano from qualitative evidence (directional)'
        },
        {
          value: 'Study Mode: Facilitate a WORKSHOP sort. Bucket features collaboratively (Must-be/Performance/Delighters/Indifferent/Reverse). After bucketing, ask 3 clarifying questions if any items are ambiguous. Output a quick action plan: what to test next, who to involve, and a suggested survey script.',
          label: 'Workshop sort (no data)'
        }
      ]
    },

    {
      key: 'stakeholder_segments',
      label: 'Stakeholder segments (by persona)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'segment',
      autofill: 'persona->inline',
      desc: 'Add user/customer segments or internal stakeholders; analysis will consider flips by segment.',
      ph: 'Start typing: New customers · Admins · Compliance · Mobile-only · Low-bandwidth…'
    },

    {
      key: 'features',
      label: 'Candidate features (one per line)',
      type: 'textarea',
      desc: 'List short, user-facing statements (outcomes, not internal tech).',
      ph: 'One-tap sign-in\nOffline mode\nCSV export\nAuto-categorize receipts'
    },

    { key: 'must_be',      label: 'Must-be (expected basics)',        type: 'textarea', desc: 'Absence → strong dissatisfaction; presence → neutral.',       ph: 'Reliable login; Restore password; Export my data' },
    { key: 'performance',  label: 'Performance (more is better)',     type: 'textarea', desc: 'Satisfaction scales with level/quality delivered.',           ph: 'Page load speed; Battery life; Reporting depth' },
    { key: 'delighters',   label: 'Delighters (unexpected extras)',   type: 'textarea', desc: 'Presence delights; absence isn’t punished (initially).',       ph: '1-click migration; Smart defaults; Magical onboarding' },
    { key: 'indifferent',  label: 'Indifferent / Reverse',            type: 'textarea', desc: 'Little impact (Indifferent) or polarizing/negative (Reverse).', ph: 'Auto-play videos; Animated splash; Forced tooltips' },

    {
      key: 'evidence',
      label: 'Evidence (quotes, observations, metrics)',
      type: 'textarea',
      desc: 'Paste key quotes, analytics, or study notes that justify your buckets.',
      ph: '“If I can’t export, I can’t use it.” · 37% bounce on login errors · NPS verbatims…'
    },
    {
      key: 'timko_counts',
      label: 'Timko counts (optional, one feature per line)',
      type: 'textarea',
      desc: 'Format: Feature | A:<n> O:<n> M:<n> I:<n>. AI will compute CS/DS.',
      ph: 'Offline mode | A:21 O:8 M:4 I:7\nCSV export | A:6 O:12 M:19 I:3'
    },

    {
      key: 'effort_map',
      label: 'Effort / complexity (1–5) per feature',
      type: 'textarea',
      desc: 'Format: Feature | Effort score (1=trivial … 5=hard).',
      ph: 'Offline mode | 5\nCSV export | 2'
    },
    {
      key: 'strategic_fit',
      label: 'Strategic fit (1–5) per feature',
      type: 'textarea',
      desc: 'Format: Feature | Fit score (5=strong alignment to OKRs/mission).',
      ph: 'Offline mode | 3\nCSV export | 5'
    },

    // CHART — default is show sketch; only "No chart" suppresses it
    {
      key: 'ascii_chart',
      label: 'ASCII Kano chart',
      type: 'select',
      desc: 'Choose extra chart instructions. If you do nothing, the default sketch below will be rendered.',
      options: [
        {
          value: 'Chart: Render a SIMPLE Kano curve ASCII sketch with axes labeled (Satisfaction ↑, Feature performance →). Annotate top 3 features per category with bullet labels.',
          label: 'Simple curve + annotate top items'
        },
        {
          value: 'Chart: Render a QUADRANT-GRID ASCII with zones for Must-be (lower-left), Performance (diagonal), and Delighters (upper-left). Place top 5 features as short labels; include a legend.',
          label: 'Quadrant grid + placements'
        },
        {
          value: 'Chart: Omit ASCII chart.',
          label: 'No chart'
        }
      ]
    },

    {
      key: 'table_pref',
      label: 'Prioritization table',
      type: 'select',
      desc: 'Select the table detail level.',
      options: [
        {
          value: 'Table: Produce a markdown table with columns: Feature | Category | CS | DS | Effort | Fit | Tag. Compute Tag as Build/Explore/Defer using rule-of-thumb: prioritize (CS·Fit)/max(1,Effort); break ties by |DS| then lower Effort. Sort descending by priority.',
          label: 'Full table (Category, CS, DS, Effort, Fit, Tag)'
        },
        {
          value: 'Table: Produce a compact markdown table with Feature | Category only. No numeric synthesis, just clean buckets.',
          label: 'Category-only table'
        },
        {
          value: 'Table: Omit prioritization table.',
          label: 'No table'
        }
      ]
    },

    {
      key: 'assumptions',
      label: 'Assumptions & risks',
      type: 'textarea',
      desc: 'Unknowns, sampling caveats, wording issues, or segment biases.',
      ph: 'Small n for admins; wording may have primed “Like”; mobile users under-sampled…'
    },
    {
      key: 'horizon',
      label: 'Re-check horizon',
      type: 'text',
      desc: 'When to revisit (Kano drift/market shift).',
      ph: 'e.g., 6 months'
    }
  ],

  template: (f) => {
    const toLines = s => (s||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);

    const features = toLines(f.features);
    const M = toLines(f.must_be);
    const P = toLines(f.performance);
    const D = toLines(f.delighters);
    const INDIFF = toLines(f.indifferent);
    const seg = Array.isArray(f.stakeholder_segments) ? f.stakeholder_segments : toLines(f.stakeholder_segments);

    const parseTimko = (line) => {
      const [name, rest] = line.split('|').map(x=>x.trim());
      const grab = k => {
        const m = new RegExp(`${k}\\s*:\\s*(\\d+)`,'i').exec(rest||'');
        return m ? Number(m[1]) : 0;
      };
      const A=grab('A'), O=grab('O'), Mu=grab('M'), I=grab('I');
      const denom = A+O+Mu+I || 1;
      const CS = (A+O)/denom;
      const DS = - (Mu+O)/denom;
      return { name: name||'(unnamed feature)', A, O, M:Mu, I, CS:+CS.toFixed(2), DS:+DS.toFixed(2) };
    };
    const timko = toLines(f.timko_counts).map(parseTimko);

    const parseScalarMap = (s) => {
      const map = {};
      toLines(s).forEach(line => {
        const [name, val] = line.split('|').map(x=>x.trim());
        const n = Number(val);
        map[name||''] = Number.isFinite(n) ? n : '';
      });
      return map;
    };
    const effort = parseScalarMap(f.effort_map);
    const fit    = parseScalarMap(f.strategic_fit);

    const wantFullTable = (f.table_pref||'').toLowerCase().includes('Feature | Category | CS');
    const rows = (wantFullTable ? (timko.length ? timko.map(r => {
      const eff = effort[r.name] ?? '';
      const ft  = fit[r.name] ?? '';
      const priority = (r.CS||0) * (Number(ft)||0) / (Math.max(1, Number(eff)||1));
      let tag = 'Explore';
      if (priority >= 1) tag = 'Build';
      if (!ft || !eff) tag = 'Explore';
      if ((r.CS||0) < 0.15 && Math.abs(r.DS||0) < 0.15) tag = 'Defer';
      return { name:r.name, CS:r.CS, DS:r.DS, Effort:eff, Fit:ft, priority:+priority.toFixed(2), tag };
    }) : []) : []);

    if (rows.length) {
      rows.sort((a,b)=> b.priority - a.priority || Math.abs(b.DS)-Math.abs(a.DS) || (a.Effort||9)-(b.Effort||9));
    }

    const studyDirective = f.study_mode && (''+f.study_mode);
    const chartDirective = f.ascii_chart && (''+f.ascii_chart);
    const tableDirective = f.table_pref && (''+f.table_pref);

    const defaultSketch =
`ASCII Kano sketch (monospace):
Satisfaction ↑
             |        Delighters (Attractive)
             |         /
             |        /
             |       /     Performance (One-dimensional)
   Neutral ---+-----/-----/----------------→ Feature performance
             |    /     /
             |   /     /
             |  /     /
             | /     /
             |/     /
             Must-be (steep drop if absent)
Dissatisfaction ↓`;

    const showDefaultSketch = !(chartDirective && chartDirective.toLowerCase().includes('omit ascii chart'));

    const parts = [
      'Apply the Kano Model to categorize and prioritize features.',
      studyDirective,
      tableDirective,

      // Render default sketch unless explicitly told "No chart"
      showDefaultSketch && defaultSketch,

      // If they selected a chart instruction (not "No chart"), include it too
      (chartDirective && !chartDirective.toLowerCase().includes('omit ascii chart')) ? chartDirective : null,

      f.usecase && `Context: ${f.usecase}`,
      seg.length && ('Segments:\n' + seg.map((s,i)=>`${i+1}. ${s}`).join('\n')),

      features.length && 'Task: Classify each candidate feature into Must-be / Performance / Delighter / Indifferent (note any Reverse/Questionable).',
      features.length && ('Candidates:\n' + features.map((x,i)=>`${i+1}. ${x}`).join('\n')),

      M.length && ('Must-be (basics):\n' + M.map((x,i)=>`${i+1}. ${x}`).join('\n')),
      P.length && ('Performance (linear value):\n' + P.map((x,i)=>`${i+1}. ${x}`).join('\n')),
      D.length && ('Delighters (wow):\n' + D.map((x,i)=>`${i+1}. ${x}`).join('\n')),
      INDIFF.length && ('Indifferent / Reverse:\n' + INDIFF.map((x,i)=>`${i+1}. ${x}`).join('\n')),

      f.evidence && `Evidence:\n${f.evidence}`,
      f.assumptions && `Assumptions & risks:\n${f.assumptions}`,

      (rows.length && [
        'Prioritization table:',
        '| Feature | Category | CS | DS | Effort | Fit | Tag |',
        '|---|---|---:|---:|---:|---:|---|',
        ...rows.map(r=>`| ${r.name} | (auto) | ${r.CS} | ${r.DS} | ${r.Effort} | ${r.Fit} | ${r.tag} |`)
      ].join('\n')) || null,

      'Output:',
      '1) Bucketed lists with 1–2 sentence rationale each (cite quote/metric).',
      '2) If Timko provided: CS/DS per feature; call out top 3 by ↑CS and top 3 by |DS| risk.',
      '3) If full table requested: include Feature | Category | CS | DS | Effort | Fit | Tag, sorted by priority.',
      '4) Chart: default ASCII sketch is included unless “No chart” selected; if chart instruction chosen, also annotate as directed.',
      '5) Risks & next steps: wording fixes, sampling gaps, validation plan, and re-check horizon.'
    ];

    return parts.filter(Boolean).join('\n');
  }
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
    'type:framework','topic:scoring','topic:prioritization','phase:triage','level:beginner',
    'use:backlog-grooming','use:experiments','use:ops-improvement','use:design-roadmap'
  ],

  use_cases: [
    'fast triage of product ideas or experiments',
    'growth/CRO backlog grooming and sprint planning',
    'ops/process improvements and quick wins identification',
    'research/design workstream prioritization before deeper sizing'
  ],

  definition:
    'ICE multiplies three quick ratings—Impact, Confidence, and Ease—to rank ideas for a first-pass, evidence-aware triage. Keep scales explicit and consistent; justify each score briefly to reduce bias and gaming.',

  help:
    'Provide an idea and rate Impact, Confidence, and Ease using the chosen scale (1–5 or 1–10). Optionally switch to Effort mode (Ease is auto-derived from Effort), set weights, cite evidence and dependencies, add inclusion guardrails, and specify a next test. The template returns a scored breakdown, brief justifications, a recommendation band, and a tiny experiment plan.',

  boosters: [
    'Define and display your scale rubric before scoring (e.g., Impact 1=negligible, 5=step-change).',
    'Require a one-line justification for each dimension; Confidence must cite evidence class.',
    'Include hidden work in Ease (security, legal, data, localization, QA, change mgmt).',
    'Use medians from multiple raters for contentious items; add a comment if spread >2.',
    'Add an inclusion/ethics gate: high-ICE items with harm risk pause for review.',
    'Prefer Effort mode when teams think in cost; Ease = (max+1 − Effort).',
    'Re-score after new evidence; Confidence cannot exceed your strongest evidence rung.'
  ],

  fields: [
    /* Core item */
    { key:'item',       label:'Idea / experiment', type:'text',
      desc:'Short, concrete description of the idea to prioritize.',
      ph:'e.g., Reduce signup fields from 8→4' },

    { key:'summary',    label:'One-line value hypothesis (optional)', type:'text',
      desc:'Crisp because→therefore statement to focus the scoring.',
      ph:'If we halve fields, more users will complete signup, raising activation.' },

    /* Scale & mode */
    { key:'scale',      label:'Scale', type:'select',
      options:[ '1-5','1-10' ],
      desc:'Choose the rating scale. Keep it consistent across items in a session.',
      ph:'1-5' },

    { key:'mode',       label:'Ease vs. Effort', type:'select',
      options:[
        { value:'ease',   label:'Rate Ease directly' },
        { value:'effort', label:'Rate Effort; convert to Ease automatically' }
      ],
      desc:'Pick how you’ll represent cost. Effort mode converts Effort→Ease internally.',
      ph:'ease' },

    /* Scores */
    { key:'impact',     label:'Impact (num)', type:'text',
      desc:'Expected outcome change if it works (use your rubric).',
      ph:'e.g., 4' },
    { key:'confidence', label:'Confidence (num)', type:'text',
      desc:'How strong the evidence is behind your Impact/Ease estimates.',
      ph:'e.g., 3' },
    { key:'ease',       label:'Ease (num, if mode=ease)', type:'text',
      desc:'How easy/cheap/fast this is to execute (higher = easier).',
      ph:'e.g., 3' },
    { key:'effort',     label:'Effort (num, if mode=effort)', type:'text',
      desc:'Total cost/complexity (higher = harder). Converted to Ease = max+1−Effort.',
      ph:'e.g., 3' },

    /* Weights (optional) */
    { key:'w_impact',   label:'Weight: Impact', type:'text',
      desc:'Optional multiplier to emphasize Impact (default 1).',
      ph:'1' },
    { key:'w_conf',     label:'Weight: Confidence', type:'text',
      desc:'Optional multiplier to emphasize Confidence (default 1).',
      ph:'1' },
    { key:'w_ease',     label:'Weight: Ease', type:'text',
      desc:'Optional multiplier to emphasize Ease (default 1).',
      ph:'1' },

    /* Rubric & evidence */
    { key:'rubric_impact',   label:'Impact rubric (quick)', type:'textarea',
      desc:'Your scale definitions for Impact (keeps ratings consistent).',
      ph:'1=negligible; 3=~1–3% on key metric; 5=≥5% or unlocks new capability' },
    { key:'rubric_conf',     label:'Confidence rubric (quick)', type:'textarea',
      desc:'Define evidence classes for Confidence.',
      ph:'1=assumption only; 3=multiple signals; 5=replicated A/Bs in this context' },
    { key:'rubric_ease',     label:'Ease/Effort rubric (quick)', type:'textarea',
      desc:'Define effort bands including hidden work.',
      ph:'1=multi-team, heavy dependencies; 3=one team/1–2 sprints; 5=hours/copy' },

    { key:'evidence',   label:'Best supporting evidence', type:'textarea',
      desc:'Cite the strongest evidence you have (link, metric, study).',
      ph:'A/B showed +2.1 pp on a similar form; usability: users stall on phone field' },

    { key:'dependencies',label:'Dependencies / approvals', type:'textarea',
      desc:'Anything that can slow execution (security, legal, data, localization, QA).',
      ph:'Privacy review; analytics event update; i18n strings' },

    /* Inclusion & lenses */
    { key:'inclusion',  label:'Inclusion / ethics guardrail', type:'textarea',
      desc:'Equity, accessibility, or harm-reduction constraints that must be met.',
      ph:'AA contrast; no dark patterns; minimal PII; translated strings' },

    { key:'persona',    label:'Persona lens (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Pull a persona from your library to color Impact and risks.',
      ph:'e.g., New-to-product user • Screen-reader user' },

    { key:'bias_lens',  label:'Bias lens (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'bias', autofill:'bias->inline',
      desc:'Common pitfalls to watch (anchoring, availability, sunk cost, halo, groupthink).',
      ph:'Search bias library' },

    /* Tie-breakers & next step */
    { key:'tiebreakers',label:'Tie-breakers (optional)', type:'textarea',
      desc:'How to break ICE ties: time-to-impact, strategic fit, learning value, risk reduction.',
      ph:'Prefer sooner impact; prioritize privacy improvements' },

    { key:'next_test',  label:'Next test (≤1 week)', type:'textarea',
      desc:'Smallest viable experiment if this ranks high.',
      ph:'Ship 2 headline variants to 25% traffic; success if +1.5 pp activation' },

    { key:'notes',      label:'Notes (optional)', type:'textarea',
      desc:'Context, risks, or scope assumptions.',
      ph:'Mobile-only first; do not change legal text' }
  ],

  template: (f) => {
    const asNum = v => {
      const n = Number(String(v ?? '').replace(/[^0-9.\-]/g, ''));
      return Number.isFinite(n) ? n : null;
    };
    const scaleStr = f.scale || '1-5';
    const maxMatch = /1-(\d+)/.exec(scaleStr);
    const MAX = maxMatch ? Number(maxMatch[1]) : 5;
    const MIN = 1;

    // read weights
    const wI = asNum(f.w_impact) || 1;
    const wC = asNum(f.w_conf)   || 1;
    const wE = asNum(f.w_ease)   || 1;

    // read scores
    const I = asNum(f.impact);
    const C = asNum(f.confidence);
    let   E = null;

    const mode = (f.mode && (typeof f.mode === 'string') ? f.mode : 'ease').toLowerCase();
    if (mode === 'effort') {
      const Eff = asNum(f.effort);
      if (Eff != null) {
        E = (MAX + 1) - Eff; // convert Effort→Ease
      }
    } else {
      E = asNum(f.ease);
    }

    const inRange = (x) => x != null && x >= MIN && x <= MAX;
    const ready = inRange(I) && inRange(C) && inRange(E);

    // weighted ICE
    const score = ready ? (I * wI) * (C * wC) * (E * wE) : null;
    const maxScore = (MAX * wI) * (MAX * wC) * (MAX * wE);
    const pct = (score != null && maxScore > 0) ? Math.round((score / maxScore) * 100) : null;

    // Recommendation band
    let band = null;
    if (pct != null) {
      if (pct >= 60) band = 'Do now (Quick win)';
      else if (pct >= 40) band = 'Investigate (High potential; add evidence or reduce effort)';
      else if (pct >= 20) band = 'Hold (Needs reframing or prerequisites)';
      else band = 'Drop (Not competitive vs. backlog)';
    }

    // Build output
    const out = [];
    out.push('Score with ICE (Impact × Confidence × Ease). Keep scales explicit and justify each rating.');

    f.item && out.push(`Item: ${f.item}`);
    f.summary && out.push(`Value hypothesis: ${f.summary}`);
    out.push(`Scale: ${scaleStr} • Mode: ${mode === 'effort' ? 'Effort→Ease' : 'Ease'}`);
    (f.rubric_impact || f.rubric_conf || f.rubric_ease) && out.push(
      ['Rubrics:',
       f.rubric_impact && `- Impact: ${f.rubric_impact}`,
       f.rubric_conf   && `- Confidence: ${f.rubric_conf}`,
       f.rubric_ease   && `- Ease/Effort: ${f.rubric_ease}`
      ].filter(Boolean).join('\n')
    );

    // Breakdown
    if (ready) {
      out.push('Ratings:');
      out.push(`- Impact: ${I} ${f.impact_why ? '— ' + f.impact_why : ''}`);
      out.push(`- Confidence: ${C} ${f.conf_why ? '— ' + f.conf_why : ''}`);
      out.push(`- ${mode === 'effort' ? 'Effort' : 'Ease'}: ${mode === 'effort' ? ((MAX + 1) - E) : E} ${f.ease_why ? '— ' + f.ease_why : ''}`);
      (wI !== 1 || wC !== 1 || wE !== 1) && out.push(`Weights: I×${wI}, C×${wC}, E×${wE}`);
      out.push(`ICE Score: ${score} (≈ ${pct}% of max ${maxScore})`);
      band && out.push(`Recommendation: ${band}`);
    } else {
      out.push('Ratings: [missing or out of range] — please provide numeric values within the chosen scale.');
    }

    // Evidence & dependencies
    f.evidence && out.push(`Best evidence: ${f.evidence}`);
    f.dependencies && out.push(`Dependencies/approvals: ${f.dependencies}`);
    f.inclusion && out.push(`Inclusion/ethics guardrail: ${f.inclusion}`);
    f.persona && out.push(`Persona lens: ${f.persona}`);
    f.bias_lens && out.push(`Bias lens: ${f.bias_lens}`);
    f.tiebreakers && out.push(`Tie-breakers: ${f.tiebreakers}`);
    f.notes && out.push(`Notes: ${f.notes}`);

    // Next action
    out.push('Next step:');
    if (band === 'Do now (Quick win)') {
      out.push(f.next_test ? `- ${f.next_test}` : '- Propose a ≤1-week micro-test with a clear success threshold.');
    } else if (band === 'Investigate (High potential; add evidence or reduce effort)') {
      out.push('- Identify 1 new piece of evidence or a change that increases Ease by 1 point, then re-score.');
      f.next_test && out.push(`- Candidate test: ${f.next_test}`);
    } else if (band === 'Hold (Needs reframing or prerequisites)') {
      out.push('- List blockers and a smallest unblocker; consider reframing the idea for lower effort.');
    } else {
      out.push('- Archive with reason; keep a note of what evidence would resurrect this.');
    }

    // Debiasing nudge
    out.push('Debiasing check: Did we anchor on a shiny metric? Double-count Ease? Is Confidence supported by the strongest evidence cited?');

    return out.filter(Boolean).join('\n');
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
  definition: 'A method to introduce two random, unrelated items or concepts and force a connection between them, spurring innovative thinking by linking disparate ideas.',
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
  definition: 'A brainstorming variation where you imagine yourself (or your team) in a different role or persona and generate ideas from that perspective. By role-playing as someone else (e.g., a customer, a famous innovator), you can gain new insights and break habitual thinking.',
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
  categories: ['creativity', 'organization', 'visual thinking', 'learning'],
  tags: [
    'type:technique','topic:mind-map','topic:visual-notes','topic:concept-mapping',
    'phase:discover','phase:design','phase:synthesize','level:beginner',
    'use:ideas','use:workshop','use:research-synthesis','use:study-notes','use:roadmapping'
  ],
  use_cases: [
    'brainstorm non-linearly around a central idea and discover hidden clusters',
    'synthesize research/interviews into themes and questions',
    'plan curricula, talks, or documents (export map → outline)',
    'facilitate workshops and converge on top decisions/actions',
    'decompose projects (WBS/site map) and surface dependencies/risks'
  ],
  boosters: [
    'Limit to 4–7 primary branches; keep one keyword per twig (avoid paragraphs).',
    'Add cross-links between branches and label the relation (“blocks”, “enables”).',
    'Code meaning visually: consistent colors per branch, icons for status/risks, and enclosures for subsystems.',
    'End with “Top 3 decisions + owners + dates” so the map drives action.',
    'Include an “Unknowns/Assumptions” branch and a “Counter-map” (missing voices).',
    'Accessibility: pair color with shape; prefer color-blind-safe palettes; keep text large with good contrast.',
    'For workshops: timebox rounds, rotate scribes, finish with dot-vote → converge.'
  ],
  definition: 'A visual thinking method that radiates from a central topic into labeled branches and sub-branches, using spatial layout, color, and minimal text to reveal structure, gaps, and connections. It supports associative thinking for divergence and quick translation into outlines for convergence.',
  help: 'Provide a central topic. Optionally seed primary branches, choose a map type (radial, concept, affinity, fishbone, causal, argument, sitemap/WBS), and set limits (max branches/depth). The model will expand branches, add cross-links, and return an outline/ASCII/JSON—or, if selected, Python code for a chart or an image-generation prompt. Include personas to tailor language and “bias checks” to avoid blind spots.',
  fields: [
    { key: 'topic', label: 'Central topic', type: 'text', desc: 'Short title that frames scope.', ph: 'e.g., Renewable Energy Transition 2030' },

    {
      key: 'personas',
      label: 'Audience / personas',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Who is this for? Influences wording and examples.',
      ph: 'e.g., City planner; High-school students; CTO; Policy analyst'
    },

    {
      key: 'goal',
      label: 'Session goal',
      type: 'select',
      options: ['diverge (ideas)', 'converge (decisions)', 'both'],
      desc: 'Choose whether to explode ideas, converge to choices, or run a two-phase diverge→converge session.',
      ph: 'diverge (ideas)'
    },

    {
      key: 'map_type',
      label: 'Map type',
      type: 'select',
      options: [
        'radial mind map','concept map (labeled edges)','affinity clusters (KJ)',
        'fishbone (Ishikawa causes)','causal loop (systems)','argument map','sitemap/WBS'
      ],
      desc: 'Pick a structure that matches your task (we will generate detailed, method-specific instructions).',
      ph: 'radial mind map'
    },

    { key: 'branches', label: 'Primary branch seeds (optional, one per line)', type: 'textarea',
      desc: 'Seed 4–7 top categories to guide expansion.',
      ph: 'Policy\nTechnology\nEconomics\nCommunity\nEnvironment\nRisks' },

    { key: 'branch_limit', label: 'Max primary branches', type: 'text',
      desc: 'Recommend 4–7 for legibility.', ph: '6' },

    { key: 'depth_limit', label: 'Max depth', type: 'text',
      desc: 'How many sub-levels to expand.', ph: '2' },

    {
      key: 'cross_links',
      label: 'Cross-links',
      type: 'select',
      options: ['auto (suggest)', 'always add', 'skip'],
      desc: 'Whether to add cross-branch connections and label them.',
      ph: 'auto (suggest)'
    },

    {
      key: 'color_scheme',
      label: 'Color scheme',
      type: 'select',
      options: ['neutral','high-contrast','color-blind-safe'],
      desc: 'Palette guidance for visuals; we will translate this choice into instructions suited to your selected map format.',
      ph: 'color-blind-safe'
    },

    {
      key: 'output',
      label: 'Output format',
      type: 'select',
      options: [
        'indented outline','ASCII tree','JSON (nodes & edges)',
        'python code (graph/chart)','image prompt (for an AI image generator)','verbal description'
      ],
      desc: 'Primary artifact to return (structure vs. code vs. prompt vs. prose).',
      ph: 'indented outline'
    },

    // NEW: Map rendering modality (explicit, richer instructions per choice)
    {
      key: 'map_format',
      label: 'Second Output Format (Optiona)',
      type: 'select',
      options: [
        'ascii (plain text symbols)',
        'python (generate code for a chart/graph)',
        'image prompt (DALL·E or similar)',
        'verbal description (narrative layout instructions)'
      ],
      desc: 'How the map should be produced. We will generate format-specific instructions (e.g., ASCII drawing rules, Python plotting code spec, or an image-generation prompt).',
      ph: 'ascii (plain text symbols)'
    },

    {
      key: 'facilitation',
      label: 'Session mode',
      type: 'select',
      options: ['solo','workshop'],
      desc: 'Solo = fast personal exploration and synthesis. Workshop = structured group facilitation with rounds, dot-votes, and convergence.',
      ph: 'solo'
    },

    { key: 'timebox', label: 'Timebox', type: 'text', desc: 'Duration for the sprint/round.', ph: 'e.g., 12 minutes' },

    {
      key: 'bias_checks',
      label: 'Bias / blind-spot checks',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'Inline prompts to broaden perspectives (sampling, cultural, recency, groupthink…).',
      ph: 'e.g., WEIRD sampling; confirmation bias; urban bias; survivorship bias'
    },

    { key: 'constraints', label: 'Constraints & scope notes (optional)', type: 'textarea',
      desc: 'Boundaries, assumptions, known exclusions.', ph: 'No capex modeling; focus on municipal actions only' },

    {
      key: 'next_artifact',
      label: 'Follow-on artifact',
      type: 'select',
      options: ['outline','task backlog','slide','brief/spec'],
      desc: 'What the model should produce from the map after thinking.',
      ph: 'outline'
    },

    { key: 'explainer', label: 'Audience explainer (optional)', type: 'textarea',
      desc: 'A 2–3 sentence “what is a mind map” primer for newcomers.',
      ph: 'A mind map starts with a central idea and grows branches that hold keywords and connections…' }
  ],
  template: (args) => {
    const {
      topic, personas, goal, map_type, branches, branch_limit, depth_limit,
      cross_links, color_scheme, output, map_format, facilitation, timebox,
      bias_checks, constraints, next_artifact, explainer, ctx, style, tone
    } = args;

    const toLines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const list = (title, s) => s && `${title}\n` + toLines(s).map((x,i)=>`${i+1}. ${x}`).join('\n');
    const seeds = toLines(branches);

    // Detailed instruction blocks per map type
    const mapTypeGuide = (t) => {
      switch ((t||'').toLowerCase()) {
        case 'radial mind map':
          return [
            'Map Type — Radial mind map:',
            '- Place a single CENTRAL NODE (title + 2–4 words).',
            '- Create 4–7 PRIMARY BRANCHES radiating outward; one KEYWORD per branch.',
            '- Add 1–2 SUB-LEVELS with short keywords; avoid sentences.',
            '- Add CROSS-LINKS between branches where ideas relate; label links (e.g., “enables”, “conflicts”).'
          ].join('\n');
        case 'concept map (labeled edges)':
          return [
            'Map Type — Concept map (labeled edges):',
            '- Create a NETWORK of nodes where EACH EDGE has a RELATION LABEL (e.g., causes, requires, contrasts).',
            '- Prioritize precise linking phrases; clarify directionality if causal.',
            '- Group related nodes spatially; avoid duplicate nodes by cross-linking.'
          ].join('\n');
        case 'affinity clusters (kj)':
          return [
            'Map Type — Affinity clusters (KJ):',
            '- Start from many small notes; CLUSTER by similarity without predefined categories.',
            '- Name each cluster with a short THEME label; allow multi-membership via cross-links.',
            '- Surface 3–5 top clusters and any outliers needing further research.'
          ].join('\n');
        case 'fishbone (ishikawa causes)':
          return [
            'Map Type — Fishbone (Ishikawa):',
            '- Put the EFFECT/PROBLEM at the head; draw main bones for cause categories (e.g., People/Process/Tech/Env).',
            '- Add secondary bones for specific causes; use short cause phrases.',
            '- Optionally tag each cause with evidence strength or likelihood.'
          ].join('\n');
        case 'causal loop (systems':
        case 'causal loop (systems)':
          return [
            'Map Type — Causal loop (systems):',
            '- Draw variables as nodes; connect with arrows showing influence (+/−).',
            '- Identify REINFORCING (R) and BALANCING (B) loops; annotate delays (||).',
            '- Focus on feedback structure; keep variable names measurable where possible.'
          ].join('\n');
        case 'argument map':
          return [
            'Map Type — Argument map:',
            '- Center on a CLAIM; attach PREMISES; add OBJECTIONS and REBUTTALS.',
            '- Use short, testable statements; cite strongest evidence.',
            '- Mark confidence and the top missing evidence.'
          ].join('\n');
        case 'sitemap/wbs':
          return [
            'Map Type — Sitemap / WBS:',
            '- Build a HIERARCHICAL tree: product/site sections (level 1), pages/features (level 2), components/tasks (level 3).',
            '- Keep sibling granularity consistent; add cross-links for shared components.',
            '- Tag nodes with owner/priority where relevant.'
          ].join('\n');
        default:
          return null;
      }
    };

    // Session goal guidance
    const sessionGoalGuide = (g) => {
      switch ((g||'').toLowerCase()) {
        case 'diverge (ideas)':
          return [
            'Session Goal — Diverge (ideas):',
            '- Generate breadth first: rapid branching, no judgment, no pruning during the sprint.',
            '- Use timeboxed rounds and prompt shifts (SCAMPER, “what if…”) to expand coverage.'
          ].join('\n');
        case 'converge (decisions)':
          return [
            'Session Goal — Converge (decisions):',
            '- Sift and shape: merge duplicates, prune low-value twigs, and elevate 3–5 themes.',
            '- Close with a decision snapshot: Top 3 decisions, owners, dates, and success criteria.'
          ].join('\n');
        case 'both':
          return [
            'Session Goal — Diverge → Converge:',
            '- Phase 1 (Diverge): fast, judgment-free expansion with timebox.',
            '- Phase 2 (Converge): cluster, cross-link, and select Top 3 decisions with owners and dates.'
          ].join('\n');
        default:
          return null;
      }
    };

    // Color scheme guidance (translated to the format later)
    const colorSchemeGuide = (c) => {
      switch ((c||'').toLowerCase()) {
        case 'high-contrast':
          return 'Color Scheme — High-contrast: assign distinct, saturated colors per primary branch; ensure text on dark fills uses light text, and vice versa.';
        case 'color-blind-safe':
          return 'Color Scheme — Color-blind-safe: use a palette like Okabe–Ito; pair each color with a unique marker (icon/shape) to avoid reliance on color alone.';
        case 'neutral':
          return 'Color Scheme — Neutral: minimal color; use line weight, icons, and enclosure shapes to convey hierarchy and status.';
        default:
          return null;
      }
    };

    // Map rendering modality guidance
    const formatGuide = (f, scheme) => {
      const schemeHint = scheme ? colorSchemeGuide(scheme) : null;
      switch ((f||'').toLowerCase()) {
        case 'ascii (plain text symbols)':
          return [
            'Rendering — ASCII:',
            '- Produce a monospaced ASCII diagram using ├─, └─, │ and indentation for hierarchy.',
            '- Label cross-links inline as “(→ see Branch X)”.',
            '- Keep line length ≤ 100 chars; no color—use emoji/icons sparingly if supported.',
            schemeHint && `- Accessibility translation of color scheme: ${schemeHint}`
          ].filter(Boolean).join('\n');
        case 'python (generate code for a chart/graph)':
          return [
            'Rendering — Python code:',
            '- Output runnable Python that builds the map as a graph/tree using matplotlib (and networkx if needed).',
            '- Do NOT use seaborn; one figure only; avoid external files; ensure code runs in a clean environment.',
            '- Add readable node labels; if color scheme is selected, map branches to a safe palette.',
            schemeHint && `- Apply palette guidance: ${schemeHint}`
          ].filter(Boolean).join('\n');
        case 'image prompt (dall·e or similar)':
          return [
            'Rendering — Image-generation prompt:',
            '- Return a concise, explicit prompt that specifies layout (radial/network/fishbone/etc.), labels, hierarchy depth, and styling.',
            '- Include palette/style notes if color scheme is selected; request high contrast and legible typography.',
            schemeHint && `- Palette/accessibility guidance: ${schemeHint}`
          ].filter(Boolean).join('\n');
        case 'verbal description (narrative layout instructions)':
          return [
            'Rendering — Verbal description:',
            '- Provide a clear paragraph describing the final layout: center, branches, notable cross-links, and visual encoding.',
            schemeHint && `- Mention how color/shape encodes categories: ${schemeHint}`
          ].filter(Boolean).join('\n');
        default:
          return null;
      }
    };

    // Output format guidance (additional artifact spec)
    const outputGuide = (o) => {
      switch ((o||'').toLowerCase()) {
        case 'ascii tree':
          return 'Output — ASCII tree: include a clean, monospaced tree with 1–2 sub-levels and inline cross-link notes.';
        case 'indented outline':
          return 'Output — Indented outline: hierarchical bullets, 1–2 sub-levels, cross-links noted as “(→ Branch X)”.';
        case 'json (nodes & edges)':
          return 'Output — JSON: provide nodes [{id,label,type,tags}] and edges [{from,to,label}] with stable ids.';
        case 'python code (graph/chart)':
          return 'Output — Python code: return runnable code that renders the map as a single matplotlib figure; no seaborn; label nodes clearly.';
        case 'image prompt (for an ai image generator)':
          return 'Output — Image prompt: produce a tight, explicit prompt describing layout, labels, hierarchy, and palette for an AI image generator.';
        case 'verbal description':
          return 'Output — Verbal description: a narrative depiction of the final map layout and key relationships.';
        default:
          return null;
      }
    };

    // Session mode expansion
    const facilitationGuide = (m, tb) => {
      switch ((m||'').toLowerCase()) {
        case 'solo':
          return [
            'Session Mode — Solo:',
            `- Work in ${tb || 'short'} sprints: explode → cluster → cross-link → select Top 3 decisions.`,
            '- Capture “Unknowns/Assumptions” and next research prompts; end with a mini action list.'
          ].join('\n');
        case 'workshop':
          return [
            'Session Mode — Workshop:',
            `- Facilitate timeboxed rounds (${tb || 'e.g., 2×8 minutes diverge + 8 minutes converge'}).`,
            '- Rotate scribes, then dot-vote to converge; assign owners/dates for Top 3 outcomes.'
          ].join('\n');
        default:
          return null;
      }
    };

    const boosters = [
      'Use 4–7 primary branches; one keyword per twig.',
      'Add cross-links and label relationships (e.g., “enables”, “blocks”).',
      'Code meaning visually: color per branch, icons for risks/tasks.',
      'End with Top-3 decisions & owners; mark unknowns.'
    ];

    return [
      'Create a Mind Map that balances divergence and clarity.',
      ctx && `Context: ${ctx}`,
      style && `Style: ${style}`,
      tone && `Tone: ${tone}`,

      topic && `Central Topic: ${topic}`,
      personas && (Array.isArray(personas)
        ? 'Audience / personas:\n' + personas.map((p,i)=>`${i+1}. ${p}`).join('\n')
        : list('Audience / personas:', personas)),

      goal && sessionGoalGuide(goal),
      map_type && mapTypeGuide(map_type),
      (branch_limit || depth_limit) && `Limits: ${branch_limit ? `branches ≤ ${branch_limit}` : ''}${branch_limit && depth_limit ? '; ' : ''}${depth_limit ? `depth ≤ ${depth_limit}` : ''}`,
      cross_links && `Cross-links preference: ${cross_links}`,
      color_scheme && colorSchemeGuide(color_scheme),
      facilitation && facilitationGuide(facilitation, timebox),
      constraints && `Constraints & scope:\n${constraints}`,
      explainer && `Explainer:\n${explainer}`,

      seeds.length ? 'Primary branches (seeds):\n' + seeds.map((b,i)=>`- ${b}`).join('\n') : 'Primary branches: (generate 4–7 from the topic)',

      'Rules:',
      boosters.map(x => `- ${x}`).join('\n'),

      map_format && formatGuide(map_format, color_scheme),
      output && outputGuide(output),

      'Deliverables:',
      '- A) The map artifact per the selected rendering/output instructions.',
      '- B) “Decisions / Actions / Risks / Unknowns” bullets with owners & dates.',
      next_artifact && `- C) Convert map into: ${next_artifact}.`,

      bias_checks && (Array.isArray(bias_checks)
        ? 'Bias / blind-spot checks:\n' + bias_checks.map((b,i)=>`${i+1}. ${b}`).join('\n')
        : `Bias / blind-spot checks:\n${bias_checks}`)
    ].filter(Boolean).join('\n');
  }
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
    'Encourage even absurd or impossible wishes; they can spark real ideas.',
    'After listing wishes, examine each to find elements you *can* actually implement.'
  ],
  definition: 'An ideation method where you freely wish for the perfect or even impossible solutions to a problem. By articulating “magic wand” wishes without restraint, you can then work backward to figure out how to incorporate aspects of those ideal solutions into practical reality.',
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
    'Suspend judgment during the idea sprint – no idea is too silly initially.',
    'Set a clear timer or target idea count; the constraint can boost focus and output.'
  ],
  definition: 'A brainstorming approach focusing on quantity over quality: set a short time limit and produce as many ideas as possible without filtering. The goal is to bypass your inner critic and get a broad list of thoughts, which can later be reviewed for viable options or refined ideas.',
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
    'Use unusual or even provocative triggers to jolt thinking in new directions.',
    'Build on whatever associations the trigger evokes, no matter how tangential or odd they seem.'
  ],
  definition: 'A brainstorming method where you use specific prompts or "triggers" – such as open-ended sentences or abstract statements – to inspire new thoughts. The triggers are designed to provoke or challenge assumptions, helping the group or individual break out of conventional ideas.',
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
    'Pose wild "what if" questions beyond realistic bounds to expand thinking.',
    'After exploring an imagined scenario, extract any ideas that could be applied (even partially) to the real situation.'
  ],
  definition: 'A technique of reframing problems by asking "What if...?" questions that introduce new scenarios or constraints. By imagining how the issue would look under different circumstances (e.g., different people, times, or rules), you gain fresh perspectives that can lead to innovative solutions.',
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
    'Interpret the card prompts loosely; any personal meaning you derive is valid.',
    'If a prompt seems cryptic or disruptive, embrace it — use it as an opportunity to change your approach entirely.'
  ],
  definition: 'A card-based method invented by musician Brian Eno and artist Peter Schmidt to overcome creative blocks. Each Oblique Strategies card presents a cryptic instruction or dilemma (e.g., "Remove specifics and convert to ambiguities") designed to break down artistic barriers and spark creative insight. Following these prompts encourages lateral thinking. Similarly, some creators use random oracle systems (like the I Ching, as John Cage did) for the same purpose of injecting randomness to spur innovation.',
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
    'Encourage wild analogies – even if the link is tenuous, it may spark a novel idea.',
    'After solving the analogy problem, carefully map the insights back to the original problem to ensure relevance.'
  ],
  definition: 'A creative problem-solving approach that "joins together different and apparently irrelevant elements" by using analogies. In Synectics, you reframe the problem into an analogous situation in a distant or unrelated context (using direct, personal, symbolic, or fantasy analogies), brainstorm solutions for that analogy, and then translate those solutions back to the original problem. This leverages the mind’s ability to find connections and can yield truly novel solutions.',
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
  label: 'Head–Heart–Gut — Logic · Emotion · Instinct (Rational · Emotional · Instinctual check)',
  kind: 'framework',
  categories: ['decision-making','self-reflection','psychology','leadership','coaching','ethics'],
  tags: [
    'type:framework','topic:decision-making','topic:emotional-intelligence',
    'topic:embodied-cognition','topic:values','topic:intuition-vs-logic',
    'use:decision-support','use:values-check','use:intuition',
    'use:coaching-conversations','use:leadership-alignment','use:self-awareness',
    'level:intermediate'
  ],
  use_cases: [
    'Make well-rounded decisions by considering logic, feelings, and intuition.',
    'Resolve internal conflict by aligning thoughts, values, and instincts.',
    'Help in coaching or mentoring conversations to surface hidden perspectives.',
    'Evaluate leadership choices, ensuring balance of rational, ethical, and instinctual input.',
    'Support culturally inclusive decision-making by recognizing multiple ways of knowing.',
    'Guide journaling or therapy practices that integrate head/heart/gut awareness.',
    'Facilitate group or organizational choices with a balanced lens.'
  ],
  boosters: [
    'Phrase each perspective in the first person (e.g., “My Head says…”).',
    'Acknowledge differences: it’s normal if Head, Heart, and Gut say different things.',
    'If one perspective dominates, consciously give voice to the quieter one (e.g., ask “Heart, what do you feel about this?”).',
    'If one perspective (e.g., Gut) flags a concern the others don’t, take it seriously and investigate that aspect further.',
    'Use a 1–10 scale to gauge how strongly each voice feels.',
    'Invite metaphors (e.g., Heart as a character, Gut as an animal guide) to make perspectives vivid.',
    'Note one unresolved tension and how you’ll monitor it moving forward.',
    'Respect cultural differences in how Head, Heart, or Gut are prioritized.'
  ],
  definition: 'A decision-making technique that checks alignment across three inner intelligences: the Head (logic/reason), the Heart (emotions/values), and the Gut (instinct/intuition). Considering all three creates choices that are more balanced, authentic, and sustainable.',
  help: 'State the decision or dilemma. Optionally add context, values, or risks. The model will articulate perspectives from your Head (rational analysis), Heart (emotional standpoint), and Gut (instinctual response), then help integrate them into a final recommendation.',
  fields: [
    { key: 'decision', label: 'Decision or dilemma', type: 'textarea',
      desc: 'The choice, challenge, or question you’re facing.',
      ph: 'e.g., Should I accept a new job offer in another city?' },
    { key: 'context', label: 'Context (optional)', type: 'textarea',
      desc: 'The situation or relationships that make this decision meaningful.',
      ph: 'e.g., Family considerations, company culture, long-term career goals.' },
    { key: 'values', label: 'Values to honor (optional)', type: 'textarea',
      desc: 'Personal or shared values you want to uphold.',
      ph: 'e.g., Integrity, growth, community, balance.' },
    { key: 'risks', label: 'Risks / concerns (optional)', type: 'textarea',
      desc: 'Possible pitfalls or red flags you’re aware of.',
      ph: 'e.g., Financial instability, burnout risk, strained relationships.' }
  ],
  template: ({ decision, context, values, risks, ctx, audience, style, tone }) => [
    'Run a Head–Heart–Gut decision check.',
    ctx && `Context: ${ctx}`,
    audience && `Audience: ${audience}`,
    style && `Style: ${style}`,
    tone && `Tone: ${tone}`,
    decision && `Decision:\n${decision}`,
    context && `Context:\n${context}`,
    values && `Values:\n${values}`,
    risks && `Risks/Concerns:\n${risks}`,
    '---',
    'Output:',
    '1) Head – Rational thoughts (facts, pros/cons, logical analysis).',
    '2) Heart – Emotional response and values (hopes, fears, desires, ethical concerns).',
    '3) Gut – Instincts or intuitive hunches (body sense, unease/yes-feel, pattern recognition).',
    '4) Integration – Reconcile the three, highlight alignments and tensions, and propose a balanced next step.',
    '5) Alignment check: Are Head, Heart, and Gut reasonably in harmony? If not, what needs more attention?',
    '6) Commitment: Define one immediate action or decision informed by the integration.'
  ].filter(Boolean).join('\n')
},

{
  id: 'hypnagogic_spark',
  slug: 'hypnagogic-spark-creativity',
  label: 'Hypnagogic Spark — Semi-sleep insight technique',
  kind: 'technique',
  categories: ['creativity','brainstorming','dream-methods','imagination','problem framing'],
  tags: [
    'type:technique','topic:consciousness','topic:sleep','topic:hypnagogia',
    'topic:surrealism','topic:imagination','topic:dream-incubation',
    'use:creative-block','use:metaphor-hunting','use:idea-generation','use:problem-reframing',
    'level:advanced'
  ],

  use_cases: [
    'Unstick creative blocks by skimming the N1 (semi-sleep) state',
    'Generate surprising metaphors, visuals, and symbolic pairings',
    'Reframe problems with dreamlike, non-linear associations',
    'Practice surrealist or Jungian-style ideation',
    'Incubate design, story, or research sparks from hypnagogic imagery',
    'Translate half-dream fragments into testable, real-world prototypes'
  ],

  definition:
    'A short-cycle creativity method that dips into hypnagogia (N1, threshold of sleep) to loosen associations. The state yields fleeting images, sounds, and sensations — often metaphorical and novel. By interrupting gently and capturing fragments immediately, one can translate them into prototypes or insights. Rooted in Edison and Dalí’s “object-drop” naps, ancient dream incubation, and modern creativity research. The AI simulates this drift with configurable surrealism, cycles, and priming cues.',

  help:
    'Provide a focus problem, guardrails, and optional sensory/dream cues. The model simulates hypnagogic drift (fragments, metaphors, sensory oddities), then “wakes” to cluster, interpret, and shortlist viable sparks. Use boosters to keep cycles short, capture raw, and triage the weird into concrete test plans. Bias/inclusion lenses keep the output safe and usable.',

  boosters: [
    'Keep sessions short (≤3 cycles, 2–4 minutes each) to preserve novelty.',
    'Capture raw with no editing — single words, textures, colors, broken phrases.',
    'Use a gentle cue (object in hand, timer, mantra) to simulate real drift entry/exit.',
    'Tag fragments (metaphor • sensory • risk • archetype) to aid clustering.',
    'Do one “wild card” pass: interpret a fragment through an alien lens (astronomy, mythology, cooking).',
    'Same-day triage: shortlist 3 sparks, prototype 1 within 48 hours.',
    'Include an inclusion/safety rewrite if ideas touch people, culture, or ethics.'
  ],

  fields: [
    {
      key: 'problem',
      label: 'Problem or topic to drift on',
      type: 'textarea',
      desc: 'One concise problem, goal, or question. Keep outcome-focused, not feature-led.',
      ph: 'e.g., Help first-time users reach value in 2 minutes without extra data collection'
    },
    {
      key: 'constraints',
      label: 'Constraints / non-goals',
      type: 'textarea',
      desc: 'Hard limits (policy, ethics, brand) and explicit anti-goals.',
      ph: 'No dark patterns • Must support low bandwidth • Avoid stigmatizing language'
    },
    {
      key: 'evidence',
      label: 'Evidence / insight snippets (optional)',
      type: 'textarea',
      desc: 'Quotes, metrics, or observations to ground the session.',
      ph: '“I don’t know why you need this.” • 42% drop at permissions • 18% complete on 3G'
    },
    {
      key: 'dream_cue',
      label: 'Dream cue (optional)',
      type: 'text',
      desc: 'A single word/image/symbol to seed drift, like ancient dream incubation.',
      ph: 'e.g., Lighthouse • Broken clock • Garden gate'
    },
    {
      key: 'persona',
      label: 'Persona lens (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Pull a persona from your library to color language, values, and edge cases.',
      ph: 'e.g., Privacy-first Analyst • Busy Parent • Field Technician'
    },
    {
      key: 'inclusion_guardrail',
      label: 'Inclusion & accessibility notes (optional)',
      type: 'textarea',
      desc: 'Accessibility, equity, cultural, or safety guardrails.',
      ph: 'Plain language • Screen-reader friendly • Avoid stigma'
    },
    {
      key: 'mission',
      label: 'Mission/values alignment (optional)',
      type: 'textarea',
      desc: 'Purpose/principles that final ideas should reflect.',
      ph: 'Champion user autonomy • Minimize data • Dignity by default'
    },
    {
      key: 'bias_lens',
      label: 'Bias lens (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'Bias primers to guide the scan (anchoring, availability, confirmation, sunk cost, halo, groupthink).',
      ph: 'Search your bias library'
    },
    {
      key: 'protocol',
      label: 'Protocol',
      type: 'select',
      options: [
        { value: 'Simulated hypnagogic brainstorm',   label: 'Simulated hypnagogic brainstorm' },
        { value: 'Real-life: object-drop micro-nap (Dalí/Edison) Plan', label: 'Real-life: object-drop micro-nap (Dalí/Edison)' },
        { value: 'Real-life: short timer cycles (2–4 mins) Plan',       label: 'Real-life: short timer cycles (2–4 mins)' },
        { value: 'Real-life: nappuccino (coffee + 10–15 min window) Plan',  label: 'Real-life: nappuccino (coffee + 10–15 min window)' }
      ],
      desc: 'Pick simulated (default) or a safe real-life variant.',
      ph: 'simulated'
    },
    {
      key: 'cycles',
      label: 'Cycles (1–3)',
      type: 'text',
      desc: 'Number of drift→capture passes. 2 is a good default.',
      ph: '2'
    },
    {
      key: 'cycle_minutes',
      label: 'Cycle duration (mins)',
      type: 'text',
      desc: 'Short windows (2–4 minutes) maximize recall.',
      ph: '3'
    },
    {
      key: 'surreal_level',
      label: 'Surreal dial',
      type: 'select',
      options: [
        { value: 'Low (mild remix, analogies)',    label: 'Low (mild remix, analogies)' },
        { value: 'Medium (odd pairings, playful logic)', label: 'Medium (odd pairings, playful logic)' },
        { value: 'High (dreamlike leaps, symbolic material)',   label: 'High (dreamlike leaps, symbolic material)' }
      ],
      desc: 'How loose the associations should be.',
      ph: 'medium'
    },
    {
      key: 'priming',
      label: 'Sensory priming (optional)',
      type: 'textarea',
      desc: 'Any image, texture, sound, or reference that should color the drift.',
      ph: 'Warm brass texture • Distant train sound • Red thread motif'
    },
    {
      key: 'state_hygiene',
      label: 'State hygiene (optional)',
      type: 'textarea',
      desc: 'Real-world prep: lighting, position, interruption strategy.',
      ph: 'Dim light • Reclined but upright • Keys in hand for micro-nap'
    },
    {
      key: 'fragment_tag_style',
      label: 'Fragment tagging scheme',
      type: 'select',
      options: [
        { value: 'metaphor', label: 'Metaphor/analogy tags' },
        { value: 'archetype',label: 'Archetype/symbol tags' },
        { value: 'color_emotion', label: 'Color/emotion pairings' }
      ],
      desc: 'How to tag fragments for clustering later.',
      ph: 'metaphor'
    },
    {
      key: 'opposite_variant',
      label: 'Opposite-frame pass',
      type: 'select',
      options: [
        { value: 'Yes — include an opposite-framing seed', label: 'Yes — include an opposite-framing seed' },
        { value: ' ',  label: 'No' }
      ],
      desc: 'Treat the main constraint as permanent and explore alternate paths.',
      ph: 'yes'
    },
    {
      key: 'capture_mode',
      label: 'Capture mode',
      type: 'select',
      options: [
        { value: 'Voice-first (rich, natural)',  label: 'Voice-first (rich, natural)' },
        { value: 'Bulleted fragments',label: 'Bulleted fragments' },
        { value: 'ASCII sketch notes', label: 'ASCII sketch notes' }
      ],
      desc: 'How to record fragments before analysis.',
      ph: 'voice'
    },
    {
      key: 'success_metric',
      label: 'Success metric',
      type: 'text',
      desc: 'How to judge usefulness of the session.',
      ph: '≥5 sparks • 1 prototype candidate • Novelty+Relevance ≥7/10'
    },
    {
      key: 'next_action',
      label: 'Next action (prototype plan)',
      type: 'textarea',
      desc: 'What you will prototype within 48 hours.',
      ph: 'Storyboard 3 thumbnails • A/B headline test • Concierge demo'
    },
    
    {
  key: 'image_prompt',
  label: 'Generate an image?',
  type: 'select',
  options: [
    { value: 'yes', label: 'Yes — create an image prompt too' },
    { value: 'no',  label: 'No' }
  ],
  desc: 'Do you want the AI to also generate a detailed image prompt for DALL·E (or similar) based on your session?',
  ph: 'no'
}
  ],

  template: (f) => {
    const out = [];
    const protocol = f.protocol || 'simulated';
    const cycles = Number.parseInt(f.cycles || '2', 10);
    const mins = f.cycle_minutes || '3';
    const surreal = f.surreal_level || 'medium';
    const opposite = (f.opposite_variant || 'yes') === 'yes';

    out.push('Run a Hypnagogic Spark session (drift → capture → interpret → test).');
    f.ctx && out.push(`Context: ${f.ctx}`);
    f.persona && out.push(`Persona lens: ${f.persona}`);
    f.mission && out.push(`Mission/values: ${f.mission}`);
    f.inclusion_guardrail && out.push(`Inclusion/accessibility: ${f.inclusion_guardrail}`);
    f.bias_lens && out.push(`Bias lens: ${f.bias_lens}`);
    f.evidence && out.push(`Evidence: ${f.evidence}`);
    f.constraints && out.push(`Constraints: ${f.constraints}`);
    f.dream_cue && out.push(`Dream cue: ${f.dream_cue}`);
    f.state_hygiene && out.push(`State hygiene: ${f.state_hygiene}`);

    out.push('Session plan:');
    out.push(`- Protocol: ${protocol} • Cycles: ${cycles} × ${mins} min • Surreal dial: ${surreal} • Capture: ${f.capture_mode || 'voice'}`);
    f.priming && out.push(`- Sensory priming: ${f.priming}`);
    f.fragment_tag_style && out.push(`- Fragment tagging: ${f.fragment_tag_style}`);
    opposite && out.push('- Include one opposite-frame seed.');

    f.problem && out.push(`Focus problem: ${f.problem}`);

    out.push('Output:');
    out.push('A) Hypnagogic impressions — 7–12 short fragments (words, images, textures, half-phrases). Tag each according to style.');
    if (opposite) {
      out.push('A2) Opposite-frame impressions — 3–5 fragments where the main constraint is treated as permanent.');
    }
    out.push('B) Immediate capture transcript — lightly cleaned, 1–2 lines max per fragment.');
    out.push('C) Interpretation — map each fragment to the problem: why it might help, what it suggests.');
    out.push('D) Clusters — group into 2–3 themes with names and gist.');
    out.push('E) Shortlist — top 3 ideas (Novelty • Relevance • Feasibility scores 1–5). Brief justification.');
    out.push('F) Smallest test plan (for top idea): hypothesis, metric, <60-min prototype, decision rule.');
    out.push('G) Debiasing & inclusion check — flag biases, propose inclusion/safety rewrite if needed.');
    out.push('H) One-line synthesis — “We will explore [theme] via [idea] because [evidence/benefit].”');
    out.push(`I) Next action — ${f.next_action || 'Propose a concrete 48-hour step with owner and timebox.'}`);
    
    if (f.image_prompt === 'yes') {
  out.push('');
  out.push('J) Image generation prompt — Create a detailed prompt for DALL·E (or equivalent) to visualize the session’s top idea or theme. Follow these principles:');
  out.push('- Be specific where it matters (subject, environment, key objects); sparse elsewhere.');
  out.push('- Think like a cinematographer: lock in lighting, composition, lens, color grade, and mood.');
  out.push('- Use concrete nouns and visual attributes (textures, materials, era, perspective).');
  out.push('- Control the frame: suggest aspect ratio suited to purpose (1:1 icon, 16:9 banner, 2:3 poster).');
  out.push('- If text needed, quote exact wording and style (e.g., “headline reads ‘SPARK’ in bold sans”).');
  out.push('- Avoid mimicking living artists; describe style instead (e.g., “hand-inked lines, cel shading, pastel palette”).');
  out.push('- Optionally suggest 2–3 variations with different lighting or composition.');
  out.push('The final output here should be a vivid, cinematic text prompt ready for an image model.');
}


    return out.filter(Boolean).join('\n');
  }
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
  categories: ['psychology','self-reflection','communication','coaching'],
  tags: [
    'type:pattern','topic:gestalt','topic:empty-chair','topic:parts-work',
    'phase:explore','phase:integrate','level:intermediate',
    'use:resolve-feelings','use:closure','use:internal-conflict','use:difficult-conversation'
  ],

  use_cases: [
    'voice unresolved feelings (“unfinished business”) with someone not present',
    'negotiate an internal polarity (e.g., Inner Critic vs. Playful Self)',
    'rehearse a difficult conversation safely and concretely',
    'transform shame/self-attack via two-chair compassion work',
    'arrive at one boundary, one request, and one 24-hour micro-step'
  ],

  definition:
    'A Gestalt experiment that externalizes a person or inner part into an “empty chair.” You alternate speaking from each seat, in present tense, to surface needs, complete unspoken feelings, and integrate a next action.',

  help:
    'Choose the two voices (person or part), add persona overlays if helpful, name the topic, set a short timebox, and pick a switch cadence. The model will script an embodied, present-tense dialogue with deepening moves and close with an integration plan (need, boundary/request, micro-commitment).',

  boosters: [
    'Stay present tense; short sentences; switch often (every 60–90 seconds or 1–2 turns).',
    'Use “I” language and observable behaviors (“I need a 24-hour reply window”) instead of abstractions (“respect”).',
    'Repeat the “hot” line to deepen before problem-solving.',
    'If stuck, add a Third chair (Compassionate Nurturer, Mentor/Guide, or Values/Healthy Adult) for one clarifying pass.',
    'End by de-roling: state what each side protects, then set one boundary/request and a 24-hour micro-step.',
    'Cultural attunement: permit metaphors, indirect speech, or letter-style wording if direct address feels unsafe.'
  ],

  notice:
    'This can evoke strong feelings. If you have recent trauma, active suicidality, psychosis, or dissociation, use only with a qualified clinician. Ground after: breath, cold water, brief walk.',

  fields: [
    /* Seat A (Your role) */
    {
      key: 'you',
      label: 'Your role — Seat A',
      type: 'typeahead_textarea',
      autofill: 'persona->textarea',
      desc: 'Your presenting self or a specific inner part (include strengths, fears, goals).',
      ph: 'e.g., Current Self — exhausted but seeking fairness; values honesty; fears conflict'
    },
    {
      key: 'you_personas',
      label: 'Seat A persona overlays',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Add 0–3 personas to blend into Seat A’s voice (pulls from your persona library).',
      ph: 'Start typing to add overlays (e.g., Inner Protector, Future Self, Coach You)'
    },

    /* Seat B (Other role) */
    {
      key: 'other',
      label: 'Other role — Seat B',
      type: 'typeahead_textarea',
      autofill: 'persona->textarea',
      desc: 'Person/part you’re addressing (include what they protect and their likely concerns).',
      ph: 'e.g., Inner Critic — seeks safety via control; fears failure and rejection'
    },
    {
      key: 'other_personas',
      label: 'Seat B persona overlays',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Add 0–3 personas to enrich Seat B’s stance (e.g., Manager, Parent-mode, Rule-maker).',
      ph: 'Start typing to add overlays'
    },

    /* Third chair selector + persona overlays */
    {
      key: 'third_chair',
      label: 'Third chair (optional)',
      type: 'select',
      options: [
        { value: 'none',           label: '— none —' },
        { value: 'compassion',     label: 'Compassionate Nurturer' },
        { value: 'mentor',         label: 'Mentor / Guide' },
        { value: 'values_self',    label: 'Values / Healthy Adult' }
      ],
      desc: 'Add one supportive, reality-anchored voice for a single pass to help reconcile the polarity.',
      ph: 'Choose one supportive stance'
    },
    {
      key: 'third_chair_personas',
      label: 'Third chair persona overlays (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Optionally blend 1–2 persona traits for the third chair (e.g., Therapist-mode, Elder, Teacher).',
      ph: 'Start typing to add overlays'
    },

    /* Frame & constraints */
    {
      key: 'topic',
      label: 'Topic or emotion to explore',
      type: 'textarea',
      desc: 'Name the issue in one or two lines; keep it specific and present-focused.',
      ph: 'e.g., Anger about last week’s feedback meeting; fear of sending the proposal'
    },
    {
      key: 'goal',
      label: 'Outcome goal (what changes by session end?)',
      type: 'text',
      desc: 'Define a concrete aim to land on behavior.',
      ph: 'e.g., Decide my boundary and draft the first sentence I will say'
    },
    {
      key: 'timebox',
      label: 'Timebox (minutes)',
      type: 'text',
      desc: 'Short, focused sessions are best: 10–20 minutes is typical.',
      ph: 'e.g., 12'
    },
    {
      key: 'switch_interval',
      label: 'Switch cadence',
      type: 'text',
      desc: 'How often to alternate seats (by time or turns).',
      ph: 'e.g., Every 90 seconds or every 2 lines'
    },

    /* Deepening prompts & lenses */
    {
      key: 'deepeners',
      label: 'Deepening prompts (one per line)',
      type: 'textarea',
      desc: 'Cues the model will use to contact the feeling and the need.',
      ph: 'Say that as “I need…”\nWhere is that in your body?\nIf you believed this fully, what would change?\nWhat does this part protect?'
    },
    {
      key: 'bias_lenses',
      label: 'Cognitive/relational lenses (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'bias',
      autofill: 'bias->inline',
      desc: 'Patterns to watch (e.g., mind-reading, all-or-nothing, fundamental attribution error).',
      ph: 'Mind-reading • Catastrophizing • Typical-user bias'
    },

    /* Guardrails */
    {
      key: 'chair_rules',
      label: 'Chair rules',
      type: 'textarea',
      desc: 'Behavioral rules to keep the experiment safe and productive.',
      ph: 'Present tense • Short sentences • “I” statements • No insults or threats • Switch often • Stop if overwhelmed'
    },

    /* Integration targets (pre-seed) */
    {
      key: 'acceptance_targets',
      label: 'Integration targets',
      type: 'textarea',
      desc: 'What the session should produce, stated in observable terms.',
      ph: 'One need; one boundary/request; one 24-hour micro-step; one sentence each chair learned'
    }
  ],

  template: (f) => {
    const toLines = s => String(s||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
    const list = (title, xs) => xs.length ? [title, ...xs.map((x,i)=>`${i+1}. ${x}`)].join('\n') : null;
    const joinIf = (label, block) => block ? `${label}\n${block}` : null;

    const thirdChairDescription = (value) => {
      switch (value) {
        case 'compassion':
          return 'Compassionate Nurturer — warm, non-judgmental, reality-attuned care; de-escalates shame, validates needs, and seeks sustainable pace.';
        case 'mentor':
          return 'Mentor / Guide — seasoned advisor; frames feedback, models skills, sets achievable experiments, privileges learning over perfection.';
        case 'values_self':
          return 'Values / Healthy Adult — principled yet flexible; names core values, balances self/other needs, converts ideals into daily behaviors and boundaries.';
        default:
          return null;
      }
    };

    const deepeners = toLines(f.deepeners);
    const rules = toLines(f.chair_rules);
    const aOverlays = toLines(f.you_personas && f.you_personas.join ? f.you_personas.join('\n') : f.you_personas);
    const bOverlays = toLines(f.other_personas && f.other_personas.join ? f.other_personas.join('\n') : f.other_personas);
    const cOverlays = toLines(f.third_chair_personas && f.third_chair_personas.join ? f.third_chair_personas.join('\n') : f.third_chair_personas);
    const lenses = (f.bias_lenses && f.bias_lenses.length) ? f.bias_lenses.join(' • ') : '';

    const out = [];
    out.push('Run a Gestalt Empty Chair dialogue with two roles (and, if selected, a third supportive chair). Produce embodied, present-tense alternating voices; use deepening prompts; and end with one clear behavior change.');

    // Context & framing
    f.ctx && out.push(`Context: ${f.ctx}`);
    f.goal && out.push(`Outcome goal: ${f.goal}`);
    f.timebox && out.push(`Timebox: ${f.timebox} min`);
    f.switch_interval && out.push(`Switch cadence: ${f.switch_interval}`);

    // Roles
    f.you && out.push(`Seat A — You:\n${f.you}`);
    aOverlays.length && out.push(joinIf('Seat A persona overlays:', aOverlays.map((x,i)=>`${i+1}. ${x}`).join('\n')));

    f.other && out.push(`Seat B — Other:\n${f.other}`);
    bOverlays.length && out.push(joinIf('Seat B persona overlays:', bOverlays.map((x,i)=>`${i+1}. ${x}`).join('\n')));

    if (f.third_chair && f.third_chair !== 'none') {
      const desc = thirdChairDescription(f.third_chair);
      if (desc) out.push(`Third chair:\n${desc}`);
      cOverlays.length && out.push(joinIf('Third chair persona overlays:', cOverlays.map((x,i)=>`${i+1}. ${x}`).join('\n')));
    }

    // Topic & rules
    f.topic && out.push(`Topic:\n${f.topic}`);
    rules.length && out.push(list('Chair rules:', rules));
    lenses && out.push(`Bias/relational lenses to watch: ${lenses}`);
    deepeners.length && out.push(list('Deepening prompts the dialogue should use:', deepeners));
    f.acceptance_targets && out.push(`Integration targets:\n${f.acceptance_targets}`);

    // Output spec
    out.push('Output:');
    out.push('1) Scripted dialogue with labeled turns (A:, B:, and if chosen, C:), present tense, short sentences, switching per cadence. Use at least one deepening prompt every 1–2 exchanges.');
    out.push('2) Hot-line reflection: repeat and respond to the most emotionally charged sentence to surface need/meaning.');
    out.push('3) Integration plan:');
    out.push('   - One explicit Need: “I need … because …”.');
    out.push('   - One Boundary/Request in observable terms (who/what/when).');
    out.push('   - One 24-hour micro-commitment (≤10 minutes; first next step).');
    out.push('   - One-sentence learning from each chair (“What I realized is…”).');
    out.push('4) De-role & ground: a 2–3 line close (breath cue, brief walk/water) and a follow-up time.');
    out.push('5) If the third chair is used: add exactly one pass from that chair to model compassionate, realistic care and help reconcile the polarity.');

    return out.filter(Boolean).join('\n');
  }
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
  categories: ['self-reflection', 'wellbeing', 'communication'],
  tags: [
    'type:pattern','topic:emotions','topic:metaphor','topic:stress-regulation',
    'use:journal','use:check-in','use:team-standup','level:beginner'
  ],

  use_cases: [
    'one-minute mood check to reduce reactivity',
    'pre-meeting “state of me” for clearer collaboration',
    'post-incident decompression and next-step planning',
    'daily self-regulation ritual integrated with spoons/energy tracking'
  ],

  definition:
    'A compact self-report using weather metaphors: name the current “Storm” (nowcast), the “Calm” (anchors/resources), and a short “Forecast” (near-term expectations, boundaries, and next step).',

  help:
    'Describe how you feel in plain words or sliders. The model converts it into a humane “weather report” with a tiny action plan. Keep it brief, concrete, and non-judgmental. Use numbers (0–10) if words are hard today.',

  boosters: [
    'Prefer 1–3 precise feelings and one body signal over long narratives.',
    'Use sliders: Temperature (arousal), Pressure (demands), Visibility (clarity), Wind (context switching), Humidity (uncertainty).',
    'End with one boundary, one 10–20 minute step, and one contingency.',
    'If sharing with others, keep content impact-focused and opt-in only.',
    'Optionally convert the Forecast into an If–Then plan (implementation intention).'
  ],

  fields: [
    {
      key: 'mood',
      label: 'Free text mood (optional)',
      type: 'textarea',
      desc: 'Plain description in your own words. Helpful for nuance.',
      ph: 'Nervous but hopeful; scattered after meetings; low social battery.'
    },
    {
      key: 'mood_personas',
      label: 'Mood persona(s)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Add guiding archetypes to frame tone and needs (e.g., Steady Navigator, Playful Sprite, Anxious Scholar).',
      ph: 'Start typing to insert one or more mood archetypes…'
    },

    {
      key: 'body_signals',
      label: 'Body signals (optional)',
      type: 'textarea',
      desc: 'Where and how it shows up in the body.',
      ph: 'Tight jaw; fluttery stomach; shallow breath; heavy shoulders.'
    },
    {
      key: 'body_persona',
      label: 'Somatic mentor persona(s) (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Somatic coaches/mentors to guide interoception and pacing (e.g., Breath Coach, Gentle Physio, Mindful Yogi).',
      ph: 'Start typing to add one or more somatic mentor personas…'
    },

    {
      key: 'temperature',
      label: 'Temperature (arousal 0–10)',
      type: 'text',
      desc: 'How revved up you feel (0=very calm, 10=amped).',
      ph: 'e.g., 7'
    },
    {
      key: 'pressure',
      label: 'Pressure (demands/stress 0–10)',
      type: 'text',
      desc: 'Obligations, deadlines, social load.',
      ph: 'e.g., 6'
    },
    {
      key: 'visibility',
      label: 'Visibility (clarity 0–10)',
      type: 'text',
      desc: 'How clear the next steps feel (0=fog, 10=clear skies).',
      ph: 'e.g., 5'
    },
    {
      key: 'wind',
      label: 'Wind (context switching 0–10)',
      type: 'text',
      desc: 'Mental churn; number of competing threads.',
      ph: 'e.g., 8'
    },
    {
      key: 'humidity',
      label: 'Humidity (uncertainty low/med/high)',
      type: 'text',
      desc: 'Ambient ambiguity level.',
      ph: 'e.g., high'
    },
    {
      key: 'spoons',
      label: 'Energy spoons (0–10, optional)',
      type: 'text',
      desc: 'Quick energy budget estimate (Spoon Theory).',
      ph: 'e.g., 4'
    },

    {
      key: 'anchors',
      label: 'Calm anchors/resources',
      type: 'textarea',
      desc: 'Routines, people, tools, values that stabilize you.',
      ph: 'Water + walk; focus playlist; “kindness over speed”; pair with Sam at 2pm.'
    },
    {
      key: 'values_persona',
      label: 'Values/mentor persona(s) (optional)',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'persona',
      autofill: 'persona->inline',
      desc: 'Supportive inner mentor/values voices to guide choices (e.g., Compassionate Nurturer, Stoic Coach, Future Self).',
      ph: 'Start typing to add mentor/values personas…'
    },

    {
      key: 'boundary',
      label: 'Boundary (one line)',
      type: 'text',
      desc: 'Behavioral “no” or limit for today.',
      ph: 'No new meetings after 3pm; slack replies after 5pm tomorrow.'
    },
    {
      key: 'request',
      label: 'Request (optional)',
      type: 'textarea',
      desc: 'What you’ll ask of others (who/what/when).',
      ph: 'PM: clarify acceptance criteria by noon; teammate: pair 20m on blockers.'
    },
    {
      key: 'next_step',
      label: 'Tiny next step (10–20 min)',
      type: 'text',
      desc: 'Smallest viable action aligned to current capacity.',
      ph: 'Draft 3 bullets for spec; rename files; 10-minute walk.'
    },
    {
      key: 'contingency',
      label: 'If it worsens → fallback',
      type: 'textarea',
      desc: 'Pre-decided move if “storm” intensifies.',
      ph: 'Ping manager; postpone non-urgent task; breathing box 3 minutes.'
    },

    {
      key: 'share_mode',
      label: 'Share mode',
      type: 'select',
      desc: 'Select how the output should be framed for the intended audience. The selected value injects explicit AI instructions.',
      options: [
        {
          value: 'private log — write in first-person; include feelings + body signals; no audience; no requests; avoid names; ≤120 words; gentle, validating tone.',
          label: 'Private log'
        },
        {
          value: 'team standup — neutral, impact-focused; omit personal details; state availability, one boundary, one request, and one tiny next step as bullets; ≤80 words.',
          label: 'Team standup (impact-focused)'
        },
        {
          value: 'partner/friend check-in — warm, supportive; include feelings + needs and one specific request; de-jargonize; include appreciation; ≤150 words.',
          label: 'Partner/friend check-in (feelings + needs)'
        }
      ]
    },
    {
      key: 'tone_pref',
      label: 'Style tone (optional)',
      type: 'select',
      desc: 'Choose how the language should read. The selected value injects stylistic instructions into the prompt.',
      options: [
        { value: 'plain — everyday language; concrete nouns; short sentences; avoid metaphors unless user provided.', label: 'Plain' },
        { value: 'poetic — concise vivid metaphors; sensory detail; no purple prose; keep it under control.', label: 'Poetic' },
        { value: 'playful — light humor; gentle; no sarcasm; keep safety and care foregrounded.', label: 'Playful' },
        { value: 'clinical — objective descriptions; behavioral/physiological terms; non-judgmental; no advice creep.', label: 'Clinical' },
        { value: 'coach-like — compassionate, action-oriented; normalize emotions; offer one tiny step and one encouragement.', label: 'Coach-like' }
      ]
    },
    {
      key: 'constraints',
      label: 'Constraints (optional)',
      type: 'textarea',
      desc: 'Formatting or privacy constraints.',
      ph: '≤120 words; no medical labels; avoid sensitive details.'
    }
  ],

  template: (f) => {
    const lines = [];
    const asNum = (x) => {
      const v = Number(String(x||'').replace(/[^0-9.]/g,''));
      return Number.isFinite(v) ? v : null;
    };
    const listify = (val) =>
      Array.isArray(val)
        ? val
        : String(val || '')
            .split(/\n+/)
            .map(s => s.trim())
            .filter(Boolean);

    // Metrics
    const T = asNum(f.temperature), P = asNum(f.pressure), V = asNum(f.visibility), W = asNum(f.wind);
    const metrics = [];
    if (T!=null) metrics.push(`Temp=${T}/10`);
    if (P!=null) metrics.push(`Pressure=${P}/10`);
    if (V!=null) metrics.push(`Visibility=${V}/10`);
    if (W!=null) metrics.push(`Wind=${W}/10`);
    if (f.humidity) metrics.push(`Humidity=${f.humidity}`);
    if (f.spoons) metrics.push(`Spoons=${f.spoons}/10`);

    // Header
    lines.push('Create an Internal Weather Report (Storm · Calm · Forecast). Keep it humane, concise, and non-judgmental.');
    if (f.ctx) lines.push(`Context: ${f.ctx}`);
    if (f.share_mode) lines.push(`Audience mode directive: ${f.share_mode}`);
    if (f.tone_pref) lines.push(`Style tone directive: ${f.tone_pref}`);
    if (f.constraints) lines.push(`Constraints: ${f.constraints}`);

    // Storm
    lines.push('Storm — Nowcast:');
    if (f.mood) lines.push(`• Feelings: ${f.mood}`);
    if (f.mood_personas && String(f.mood_personas).trim()) {
      const mp = listify(f.mood_personas);
      if (mp.length) lines.push(`• Mood persona(s): ${mp.join('; ')}`);
    }
    if (f.body_signals) lines.push(`• Body: ${f.body_signals}`);
    if (f.body_persona && String(f.body_persona).trim()) {
      const bp = listify(f.body_persona);
      if (bp.length) lines.push(`• Somatic mentor persona(s): ${bp.join('; ')}`);
    }
    if (metrics.length) lines.push(`• Metrics: ${metrics.join(' · ')}`);

    // Calm
    lines.push('Calm — Anchors & Capacity:');
    if (f.anchors) lines.push(`• Anchors: ${f.anchors}`);
    if (f.values_persona && String(f.values_persona).trim()) {
      const vp = listify(f.values_persona);
      if (vp.length) lines.push(`• Mentor/values persona(s): ${vp.join('; ')}`);
    }
    if (f.boundary) lines.push(`• Boundary: ${f.boundary}`);

    // Forecast
    lines.push('Forecast — Next few hours:');
    if (f.request) lines.push(`• Request: ${f.request}`);
    if (f.next_step) lines.push(`• Tiny next step (10–20m): ${f.next_step}`);
    if (f.contingency) lines.push(`• If worsens → ${f.contingency}`);

    // If–Then (auto-generate a simple implementation intention)
    if (f.next_step) {
      const trigger = (P!=null && P>=7) ? 'when pressure spikes again'
                    : (V!=null && V<=4) ? 'when visibility feels foggy'
                    : 'when I notice avoidance';
      lines.push('Implementation Intention:');
      lines.push(`If ${trigger}, then I will ${f.next_step}.`);
    }

    // Share-safe scaffold (only if sharing externally)
    if (f.share_mode && !/private log/i.test(f.share_mode)) {
      lines.push('Team-safe summary (no private details):');
      lines.push('- Current impact: how conditions affect availability/focus.');
      lines.push('- One request and one boundary, with timing.');
      lines.push('- One tiny next step you commit to.');
    }

    lines.push('Close with one grounding act (water, breath, light, brief stretch). Emotions are weather; they change.');

    // Output spec
    lines.push('Output:');
    lines.push('1) Current conditions (Storm): feelings, body, metrics, and any mood/somatic personas in one short paragraph.');
    lines.push('2) Calm (Anchors): list 2–4 supports (values/mentor persona(s) if provided).');
    lines.push('3) Forecast: expectations for the next few hours + boundary + tiny next step + request + contingency.');
    lines.push('4) Optional team-safe summary aligned to Share mode directive.');
    lines.push('5) One-line Implementation Intention if appropriate.');

    return lines.filter(Boolean).join('\n');
  }
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
  id: 'imaginary_council',
  slug: 'imaginary-mentor-council',
  label: 'Imaginary Council — Multiple Mentors, One Question',
  kind: 'pattern',
  categories: ['creativity', 'strategy', 'decision-making'],
  tags: [
    'type:pattern','topic:roleplay','topic:perspective-shift','topic:red-team',
    'phase:explore','phase:decide','level:intermediate',
    'use:brainstorming','use:decision-support','use:ideation','use:ethics-review'
  ],

  use_cases: [
    'break fixation by sampling diverse lenses before deciding',
    'stress-test a plan with skeptic, user, and ethicist seats',
    'unblock creative work via playful roleplay with constraints',
    'produce a smallest-viable experiment and a minority report'
  ],

  definition:
    'A structured thought experiment: pose one sharply framed question to a diverse council of imagined mentors (real, fictional, archetypal, or future/past selves). Each gives an independent answer, then cross-examines others. You synthesize overlap into a smallest viable next step, record dissent, and set a tripwire metric.',

  help:
    'Add 5–7 council members (mix of lenses). Provide one question, time horizon, success metric, constraints, and an evidence snapshot. Optionally add inclusion guardrails, bias lenses, and personas from your library. The template runs a two-round council (answers → cross-exam → one-line recommendations) and returns a synthesis, minority report, and a 1-week pilot plan.',

  boosters: [
    'Keep it one question only; run another council for additional questions.',
    'Pick at least one User/Community Advocate and one Skeptic/Red Team seat.',
    'Force independence: Round 1 answers without referencing other seats.',
    'Require each seat to state one risk and one measurable success sign.',
    'Include a cultural lens beyond your own background; avoid caricature.',
    'Record a Minority Report and a tripwire metric that triggers review.',
    'Timebox: ≤3 minutes per step; perfection kills perspective.'
  ],

  fields: [
    /* QUESTION & CONTEXT */
    { key:'question', label:'The one question', type:'textarea',
      desc:'Crisp, outcome-oriented, single focus.',
      ph:'What is the smallest action that would raise week-1 retention by 3 pp for low-bandwidth users in 2 weeks?' },

    { key:'horizon', label:'Decision horizon / timeframe', type:'text',
      desc:'When the decision matters; helps size the next step.',
      ph:'2 weeks' },

    { key:'metric', label:'Primary success metric', type:'text',
      desc:'What you will move or observe to judge success.',
      ph:'Activation rate (first session complete)' },

    { key:'constraints', label:'Constraints & non-negotiables', type:'textarea',
      desc:'Budget, policy, brand, legal, accessibility, ethics.',
      ph:'No dark patterns; WCAG AA; no PII expansion; ≤1 sprint' },

    { key:'evidence', label:'Evidence snapshot (strongest 3–5 facts)', type:'textarea',
      desc:'Ground answers in reality; cite your best signals.',
      ph:'Usability shows form abandonment at phone field; 37% on mobile 3G; similar product saw +2.1 pp with guided tour' },
      
          { key:'lenses', label:'Council Member lenses (one per line, aligned with list order)', type:'textarea',
      desc:'What each seat optimizes for (Operator, Scientist, Ethicist, User Advocate, Skeptic, Visionary, Historian, Futurist, Artist…).',
      ph:'Scientist (evidence quality)\nUser Advocate (accessibility & burden)\nSkeptic (failure modes)\nOperator (cost & sequencing)\nVisionary (long-arc value)' },

    /* COUNCIL COMPOSITION */
    {
      key: 'advisors',
      label: 'Council members',
      type: 'repeater',
      itemType: 'typeahead',
      itemLabel: 'member',
      autofill: 'persona->inline',
      min: 3,
      max: 9,
      desc:'Pick diverse mentors (real, fictional, archetypes, future/past self). Type to pull from your persona library.',
      ph:'Marie Curie • Community Health Worker • Skeptic • Visionary Founder • Your Future Self'
    },

    { key:'blind_spots', label:'Known blind spots (one per line, aligned)', type:'textarea',
      desc:'Name each seat’s bias so the model can compensate.',
      ph:'Scientist: narrow on quantified signals\nVisionary: over-index on upside\nOperator: short-termism' },

    /* INCLUSION & BIAS HOOKS */
    { key:'inclusion', label:'Inclusion / ethics guardrail', type:'textarea',
      desc:'Equity, safety, consent, accessibility requirements.',
      ph:'Minimize burden on low-bandwidth cohort; translated strings; opt-in only' },

    { key:'persona', label:'Stakeholder personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Affected groups or key users to keep centered.',
      ph:'First-time user • Screen-reader user • Support agent' },

    { key:'bias_lens', label:'Bias lenses (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'bias', autofill:'bias->inline',
      desc:'Debiasing helpers (anchoring, availability, sunk cost, halo, groupthink).',
      ph:'Anchoring • Sunk cost • Groupthink' },

    /* STYLE & PROCESS */
    { key:'rounds', label:'Process', type:'select',
      options:[ 'two-round (answers → cross-exam → one-line recs)', 'one-pass (answers only + synthesis)' ],
      desc:'Two-round yields better synthesis; one-pass is faster.',
      ph:'two-round (answers → cross-exam → one-line recs)' },

    { key:'voice', label:'Voice style', type:'select',
      options:[ 'clinical', 'roleplay-rich', 'balanced' ],
      desc:'How “in character” the advisors should sound.',
      ph:'balanced' },

    { key:'timebox', label:'Timebox notes (optional)', type:'text',
      desc:'Helpful for workshops and AI verbosity control.',
      ph:'≤3 sentences per advisor; ≤1 sentence in Round 2' },

    { key:'notes', label:'Additional context (optional)', type:'textarea',
      desc:'Anything else that shapes the council’s work.',
      ph:'Executive wants early signal next Friday; mobile first' }
  ],

  template: (f) => {
    const lines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    const advisors = lines(f.advisors);
    const lenses = lines(f.lenses);
    const blind = lines(f.blind_spots);
    const seats = advisors.map((name, i) => {
      const L = lenses[i] ? ` — Lens: ${lenses[i]}` : '';
      const B = blind[i] ? ` — Blind spot: ${blind[i]}` : '';
      return `${i+1}. ${name}${L}${B}`;
    });

    const out = [];
    out.push('Run an Imaginary Council on one question. Keep Round 1 independent; then cross-examine; then synthesize into a smallest viable step with a dissent note and a tripwire metric.');

    // Context
    f.question && out.push(`Question: ${f.question}`);
    f.horizon && out.push(`Horizon: ${f.horizon}`);
    f.metric && out.push(`Primary metric: ${f.metric}`);
    f.constraints && out.push(`Constraints: ${f.constraints}`);
    f.inclusion && out.push(`Inclusion/ethics guardrail: ${f.inclusion}`);
    f.evidence && out.push(`Evidence snapshot:\n${f.evidence}`);
    (f.persona && String(f.persona).trim()) && out.push(`Stakeholder personas: ${f.persona}`);
    (f.bias_lens && String(f.bias_lens).trim()) && out.push(`Bias lenses: ${f.bias_lens}`);
    seats.length && out.push(`Council:\n${seats.join('\n')}`);
    f.voice && out.push(`Voice style: ${f.voice}`);
    f.timebox && out.push(`Timebox: ${f.timebox}`);
    f.notes && out.push(`Notes: ${f.notes}`);

    // Protocol
    const twoRound = !f.rounds || /^two-round/i.test(f.rounds);
    out.push('Protocol:');
    out.push('- Round 1 — Independent answers (3–5 sentences each; no referencing other seats). Include: one concrete move, one risk, and one early metric signal.');
    if (twoRound) {
      out.push('- Cross-exam — Each seat asks one adversarial, testable question to a different seat.');
      out.push('- Round 2 — One-sentence recommendation per seat (imperative voice).');
    }

    // Output scaffolding
    out.push('Output:');
    out.push('A) Round 1 answers by seat (label each with the seat name).');
    if (twoRound) out.push('B) Cross-exam questions (seat → seat).');
    if (twoRound) out.push('C) Round 2 one-line recommendations (seat: recommendation).');
    out.push('D) Synthesis —');
    out.push('   - Overlap: the move most seats would support now (state scope).');
    out.push('   - Smallest viable experiment (≤1 week): owner, steps, sample/traffic, success threshold on the primary metric.');
    out.push('   - Inclusion adjustment: one change to reduce burden on the least advantaged group.');
    out.push('   - Dependencies to clear before starting.');
    out.push('E) Minority Report — one principled dissent with the risk it guards against and a condition under which it becomes the main plan.');
    out.push('F) Pre-mortem — “If this fails in [horizon], the most likely cause is ___; mitigation: ___.”');
    out.push('G) Tripwire — define the metric/condition that triggers rollback or escalation.');
    out.push('H) Decision — choose: go / iterate / stop, with one-line rationale.');

    // Debiasing & hygiene
    out.push('Debiasing check: Did any seat dominate? Are Confidence claims tied to the evidence snapshot? Did we double-count effort? Have we represented affected users fairly?');

    return out.join('\n');
  }
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
