;(function(root){
  root.TASK_TEMPLATES = [

  {
  id: 'task-picker',
  slug: 'task-picker',
  label: '— Task Picker —',
  kind: 'helper',
  categories: ['template-picker'],
  tags: ['type:helper','use:framework-picker', 'use:template-picker','topic:meta'],
  use_cases: [
    'help me pick the best template for my task',
    'explain which template fits my task',
    'not sure where to start',
    'helping you find out what template best suits you',
    'produce a ready-to-copy prompt for choosing the best template'
  ],
  boosters: [
    'Ask up to 3 clarifying questions before recommending.',
    'Return 3 candidate frameworks with a short rationale.',
    'Then synthesize a ready-to-copy prompt using the best candidate.',
    'Library tools: 2-minute rule (david allen):planning avoidance away beginner brief chip convert copy,5w1h — who · what · where · when · why · how:incident prompt scope acceptance analysis analyze beginner capture,a3 problem solving (toyota):problem plan actions align brief cause countermeasures current,aar — feelings first:debrief learning needs alone beginner body data defensiveness,abcde — activating event · belief · consequence · dispute · effect:thought anxiety reframe self bias coaching management negative,abductive reasoning — best explanation:predictions risky account analysis beginner choice competing decisive,accountability letter:amends apology beginner clear close commitment commitments communication,active imagination — dialogue with inner voices:inner creative dialogue parts self characters child explore,addie — analyze · design · develop · implement · evaluate:course training learning design goals outline plan assessments,adversarial collaboration:adjudication design advance change communication conditions data debate,agent-based models & system dynamics:abm agents calibration complex declare dynamics equations experiments,aida — attention · interest · desire · action:copy write action email hook landing notification page,amor–vita–memoria (avm):grief self gratitude one you memory mentor name,anekāntavāda & syādvāda (jain many-sided logic):cultural truths add bias context cross find frameworks,announcement — change & action:announcement change communication notice update writing access availability,argument mapping — claim · premises · objections · rejoinders:points reasoning critical debate design essay logical map,automatic writing — truth sprint:writing truth automatic avoiding beginner break clarity conversation,backlog — prioritize:capacity items plan portfolio prioritization rank roadmap a11y,bayesian science — posterior odds:priors action analysis based bayes data decision decisions,before-after-bridge (bab) — before state · after state · bridge (solution):pitch copy page write bridge cold deck fundraising,bhag — big hairy audacious goal:planning vision align ambition around audacious bhag cadence,bias impact assessment (ai/tech pre-launch):bias check right compliance dataset ethics feature review,bias interrupters — diagnose risk · insert guardrail · measure effect:bias feedback check fair group make rubric code,blameless postmortem — essence first:teaching actionable analyze beginner blame body corrections defuse,bloom’s — remember · understand · apply · analyze · evaluate · create:design objectives learning lesson plan beginner goals ideas,buddhist eightfold path (adapted for action):decision ethical design harm right check choice cultural,canary + blue-green — revert comms:comms rollback beginner blast blue call canaries compensation,causal inference — dags & identification:identification assumptions causal dag diagnostics did document estimand,causal inference playbook:design assumptions based bias block choose dag dags,clear — challenge · limitation · effect · action · result:problem summary action decision write cause change framing,clear contracts + exit ramps:boundaries consent beginner communication conflict conversations create ethics,clear path forward — concise · logical · explicit · adaptive · reflective:prompt step planning ask make next prompts adaptive,clear prompting method — clarity · length · empathy · actionability · relevance:prompt make scope ask audience hygiene improve instructions,clown ‘flop’ — failure seen safely:failure resilience shame armor bravery build clowning creativity,cognitive debiasing — state assumption · seek disconfirming evidence · adjust:check bias could decision evidence make spot assumption,comparative analysis — rank • pros/cons • matrix:compare should options side which best buy choose,computational science — simulation:reproducibility simulation validation capture engineering environment experiment,constraint flip (play with edges):what design feature had make one work assume,contact improv — listening duet:listening practice attention attunement building consent contact creativity,costar — context · objective · style · tone · audience · response:brief content message campaign copy creative press ux,cover letter — tailor / rewrite / feedback:cover letter job ats draft feedback section admin,critical incident analysis:ethics teaching charged communication data debrief deep dive,daoist wu-wei strategy (effortless action):instead align burnout plan already big choose cultural,decision record — dissent & kill criteria:dissent adr alignment beginner chose communication conditions criteria,design doc — scariest change:design risk align alignment architecture blast constraints engineering,design science research (dsr):utility artifact artifacts build construct contribution criteria design,dignity questions — identity · meaning · legacy:family gratitude storytelling audio beginner capture communication conversation,disney strategy — dreamer · realist · critic:idea creative concept plan balance ideas lenses loop,dm — outreach & follow-up:follow outreach quick writing ask beta call cold,dmaic — define · measure · analyze · improve · control:data improvement process project quality compliance control countermeasures,doe + tolerance stacks — ci & power:acceptance experiment stack analysis analytics analyze clear contributors,east — easy · attractive · social · timely:design behavioral nudge choice friction interventions make nudges,eisenhower matrix — urgent/important prioritization:delegate tasks priorities what decide decision drop important,email — draft & polish:email follow networking outreach support writing application cold,empty chair dialogue (gestalt):self one conversation talk boundary business chair critic,energy budget planner (spoon theory):plan energy day spoons tasks accommodations avoid balance,engineering method — iterate to standard:acceptance cycle standards beginner builds capture design engineering,epic quest tasking — gamify the chore:quest quests chores make self storytelling tasks boss,ethnographic & interpretivist methods:description fieldwork reflexivity thick access analysis codes consent,examples / few-shot prompting:examples example format output show style like phase,exploratory vs confirmatory paths:cda eda avoid beginner confirmatory different exploratory findings,fab — feature · advantage · benefit:benefits bullets copy feature features product pitch value,facione — interpret · analyze · evaluate · infer · explain · self-regulate:bias evidence reasoning argument check claim conclusion critical,facts & expertise primer:what facts check expert give avoid beginner context,feyerabend — pluralism:method design document ethics exploring feyerabend guardrails heterodoxy,feynman technique — explain like i’m 5:explain make complex non break clear experts simple,findings — synthesize:insights confidence create summarize themes acceptance align analysis,first principles — question assumptions & reason from basics:true problem reasoning analogies assumptions brainstorming constraints principle,fmea · hazop · fault tree — unified card:design hazop analysis causes criticality effects engineering event,focusing — felt-sense check:check mental aboutness ambivalent beginner body boundaries clarity,freewriting — unfiltered stream of thought (zero draft):writing block draft brainstorming ideas subconscious warm without,fuzzing + mutation — outage shape:edge inputs catch conditions define flow fuzz generate,ganma — knowledge confluence (yolŋu):knowledge cultural design indigenous shared authority boundaries confluence,goal breakdown (prompt/question decomposition):step goal tasks turn what break first plan,goal composition (prompt/question composition):one tasks plan asks brief goal goals make,goal prompting:goal goals plan first main next objectives one,goals of care — what matters most:conversation life planning values advance align appear around,golden circle — why · how · what · mission:purpose mission values align career craft frameworks statement,gratitude under duress:pain acknowledge beginner bypass check conversation day end,grounded theory — reflexive memos:coding reflexivity theory audit axial beginner building comparison,grow — goal · reality · options · way forward:goal coaching plan what goals next set brainstorming,head–heart–gut — logic · emotion · instinct (rational · emotional · instinctual check):check decision heart balance choice gut head logic,hero’s journey — departure · initiation · return:journey story arc hero writing map outline brand,heuristics & biases — debiasing pre-flight:check bias decision quick review wrong advocate assumptions,how might we statements (hmw):brainstorming prompts align areas avoid baked beginner bias,hypnagogic spark — semi-sleep insight technique:brainstorming design advanced associations beginner blocks creative creativity,ice — impact × confidence × ease:planning process backlog beginner coding cro cultural deeper,ikigai — purpose map:purpose career against align anti beginner breakers clarify,imaginary council — multiple mentors one question:phase decision apply brainstorming break constraints creative creativity,implementation intentions (if–then):action apply beginner bind choice coping copy create,inclusive design (edge personas):design edge acceptance adaptations articulate benefits beyond cognition,inner child work — conscious self · inner child:self your beginner child childhood comfort compassion connect,internal weather report — storm · calm · forecast:self beginner check clearer collaboration daily decompression energy,interviews — plan & questions — write:plan guide interviews design discussion guides research sessions,jtbd interviews — felt-sense friction:jtbd progress struggles body capture discovery friction highest,kaitiakitanga — guardianship & stewardship (māori):affected apply assess brainstorming communities cultural data design,kano model — must-be · performance · delighters:planning product what brainstorming build complaints creates decide,kansei engineering (emotion → design mapping):design affective align analysis brand build coding commit,kepner–tregoe (situation · problem · decision · potential problem):decision analysis phase alternatives among anticipate apply auditable,keywords + why + tasks — vector priming:actionable alignment apply avoid better clarification content decomposition,kuhn — paradigms & revolutions:anomalies science across beginner choice communications crisis field,lakatos — research programs:belt core hard program theory decide degenerating intermediate,lara / cri — dialogue scaffold:dialogue affirmation beginner center communication conflict conversation defensi,last 2% round — share the unsaid edge:alignment avoid beginner communication concerns conflict decision edge,lean startup loop — stop & harm rules:decision hypothesis rules analytics beginner commit cycles document,least to most (ltm):building complex derive edge escalating framing goals healing,letter — formal / personal:letter formal writing apology appeal application appreciation cancellation,lines/veils revisit — mid-campaign:consent lines refresh safety ttrpg veils agree arc,maṣlaḥa — public interest reasoning (islamic ethics):decision product advanced align appeal aware benefit benefits,memento mori — micro-sit:gratitude actually add beginner choose closing decision development,memo — tl;dr + recommendation:decision writing brief capture change communication context cross,mind map — central idea with branches:visual adhd analysis around assist beginner brainstorm brainstorming,mind mapping — visual cluster of ideas:discover map planning actions around beginner brainstorm central,mixed methods — triangulation:integration beginner design designs discrepancies discrepant document explicit,monroe’s motivated sequence — attention · need · satisfaction · visualization · action:value decision persuasive across act adapt appeals argument,mortal message — letter/audio:gratitude repair beginner blessing brief communication contemplative ethics,moscow — must · should · could · won’t:planning management product scope beginner clarify communicate features,musyawarah & mufakat — deliberation to consensus (indonesia):consensus decision deliberation facilitate inclusive modify objections options,naïve dialecticism (east asian holistic reasoning):adapt adjustments advanced analytic asian blend change coexistence,noting — mindfulness labels:sleep awareness beginner check craving development experience focus,nyāya — five-member syllogism:explicit inference mode analyses application arguments asserting beginner,oblique strategies — lateral thinking prompt cards:creative brainstorming break constraints design alternatives approaches artistic,observability — slos · slis · error budgets:burn reliability analytics budget budgets connect decide define,ofrenda / remembrance board:altar artifacts beginner board care create day dead,okr — objective & key results:outcomes measurable planning progress review strategy align alignment,okrs — with kill criteria:okrs analytics avoid beginner cadence conditions criteria explicit,ooda loop (observe–orient–decide–act):decision discovery fast loop ooda product strategy accelerate,open science checklist:accessible beginner cannot capsule checklist code data document,opportunity scoring — importance vs. satisfaction:planning jtbd across allocate clarification compare design discovery,par — problem · action · result:experience impact postmortem storytelling study work agile apply,participatory & decolonial approaches:data sovereignty benefit clarify community consent decision design,participatory action research (par):decision dissemination rights accessible action benefit clarify community,parts check-in — ifs-inspired:coaching self beginner check communication deciding different exiles,parts work dialogue (ifs therapy):inner parts self coaching compassion mental therapy work,pas — problem · agitate · solution:problem copy landing marketing pain relief solution action,paul–elder — elements of thought + standards:decision analysis apply argument brief checks copywriting critical,pdca — plan · do · check · act:improvement beginner changes close design feedback iteration learning,peas — performance measure · environment · actuators · sensors:design agent analysis benchmark brief doc environment frameworks,persona — actas / simulate:apply beginner clarification development goals management phase prompt,pestle — political · economic · social · technological · legal · environmental:affecting analysis analyze broader business context discover environment,plan and solve (p&s):planning against checks clarification coding create errors executing,playback theatre — confession line:group story check consent create deeper empathy facilitation,pomodoro scaffold:beginner creativity focus frame goal micro minute next,popperian falsification:design predictions risky beginner beliefs conjectures could falsifiable,positionality statement:analysis practice preface research standpoint beginner bias blind,pramāṇa — means of knowledge:evidence advanced answer audit change claim decide healing,prd — write:requirements plan guardrails localization telemetry traceability ux a11y,pre-mortem + pre-grief:ethics failure human review clear conditions cost early,pre-mortem + red team — embarrassing sentence:ethics failure review conditions dissent hate imagine install,pre-mortem scaffold:actions beginner committing decision failure immediate modes phase,press release — ap style:release launch writing announcement appointment award board communication,prompt augmentation (demonstration learning):format phase against answers apply consistency demonstrations development,qiyās — analogical reasoning (islamic jurisprudence):advanced analogies apply cause cultural effective extend frameworks,questionnaire — write:design item bias items logic platform question reduce,raccca — relevance · accuracy · completeness · clarity · coherence · appropriateness:evaluation audit beginner coding comparison compose content development,rain — recognize · allow · investigate · nurture:self mindfulness beginner brach check close compassion conversation,random association — combine unrelated ideas:brainstorming beginner block break connections creative creativity discover,rap — result · action · problem:impact storytelling apply beginner bullets concise context copy,rapid — recommend · agree · perform · input · decide:decision approvals beginner clarify defining does making management,rapid ideation — timed idea sprint:brainstorming beginner block creative creativity generate healing ideas,ratio — role · audience · task · instructions · output:prompt brief agent apply beginner development graded handoff,reflect (bias reflection):bias analysis beginner brainstorming concrete critical discover ethics,reflexive memo:analysis activated affect affective assumptions beginner biases capture,registered reports & preregistration:analysis plan clarify collection data degrees design deviations,reliability growth & burn-in:test acceptance growth plan stop acceptable analysis burn,resume — tailor / rewrite / feedback:resume job ats draft admin alongside application career,rfc — unsaid objection:decision dissent alignment architecture beginner begins channels comments,rice — reach × impact × confidence ÷ effort:planning allocate coding features management product quantitatively rank,risen — role · instructions · steps · end goal · narrowing:plan content design development experiment intermediate learning production,rodes — role · objective · details · examples · sense check:guided adaptation against apply check copywriting criteria development,role storming — ideation as different personas:brainstorming apply beginner changing creativity fresh get ideas,root cause analysis:apply beginner brainstorming causes countermeasures document identify improvemen,rose · thorn · bud + weather:check daily hope journal practice affect beginner classes,rtf — role · task · format:format prompt prompting api apply beginner data development,rubber duck debugging — explain to understand:problem step analysis articulating assumption beginner bias bug,safety pause with essence:safety truth ttrpg agree beginner body change communication,scamper (idea expansion):beginner brainstorming creative creativity exploration generate idea storytellin,scenario-based prompting — deliberative reasoning:advice analysis coaching compose development edge empathy intermediate,scientific method — question · hypothesis · method · data · analysis · conclusion:beginner clear content design experiment hypotheses iteration reasoning,scqa — situation · complication · question · answer:frameworks analysis arc beginner brief compelling compose executive,screener — create criteria:screener eligibility design device fraud full have participants,sentipensar — thinking-feeling integration (latin america):design side analytic cultural decomposition empathy evidence experiential,shadow work dialogue — conscious self · shadow self:self side you acts advanced anger beginner brainstorming,six thinking hats:brainstorming decision explore beginner control creativity data discussion,smart goals — specific · measurable · achievable · relevant · time-bound:goals actionable adjustment beginner clear creativity criteria defined,soar analysis:align aspirations beginner clarification decision decomposition discussion find,social media post — tailor / write / brainstorm:social media post write char hashtags hook platform,socratic questioning method:alternatives assumptions beginner belief bias claims communication critical,somatic focusing — feel · ask · listen:self them asking beginner bodily body clarify communication,star — situation · task · action · result:story storytelling study answer apply beginner behavioral bullet,stars & wishes + bleed check:bleed debrief safety ttrpg beginner celebration character check,story spine + one naked sentence:story draft line pitch talk truth align arc,survey — plan — design:design plan survey scale align edit low product,swot — strengths · weaknesses · opportunities · threats:analysis market snapshot strategy assessment beginner business campaign,synectics — analogies & problem transfer:advanced analogies apply context creativity different domains drawing,synesthetic brainstorm — color · sound · texture:brainstorming sensory abstract analogies angles beginner challenge color,systematic review & meta-analysis:criteria heterogeneity policy protocol brief effect evidence inclusion,talanoa dialogue (pacific):beginner build content cultural decision dialogue empathy explore,tarot spread reflection — past · present · future:mode reflection storytelling tarot action archetypal archetypes brainstorm,task prompt breakdown — task/recipe + do/don’t (cot):recipe steps beginner brainstorming break concrete crisp development,task scenarios — write:scenarios design accessibility hta klm paths per realistic,tdd + property-based testing — invariants:edge invariants tests beginner capture design drive engineering,threat modeling — stride/linddun:privacy risk security architecture categories define design ethics,three vaults — facts → stories → essence:coaching check communication facilitation journaling personal beginner beyond,time machine advice — past self & future self:self your future you advice beginner brainstorming challenge,tonglen-lite — breathe with suffering:compassion self aversion beginner breath care check emotion,tote — test · operate · test · exit:beginner brainstorming build communication control decide iterating iteration,toulmin’s argument model — claim · grounds · warrant · backing · qualifier · rebuttal:briefs design academic argumentation arguments competitive conflict copywriting,transcripts - analyze:analysis analyze codebook executive sentiment themes transcripts across,tree of thought — brainstorm & evaluate:across advanced best brainstorming compare deciding decision explore,tree of thought — decomposition:advanced alternatives ambiguous brainstorming branching break checkpoints comple,triangulation methods:across alignment apply bias checking cross decide deepen,trigger storming — prompt-based brainstorming:brainstorming abstract creativity discussion generate ideas incomplete intermedi,triz (theory of inventive problem solving):brainstorming aim communication content contradictions explore final generate,trls — with exit ramps:exit maturity salvage trl avoid beginner commitment define,trunk-based dev — feature flags:audience beginner behind cleanup collection commits data delivery,truth & reconciliation — micro-format:accountability amends conflict dignity affirm apology behavior communication,usability test — plan:plan policy accessibility criteria design sessions set success,user flow — audit — design:flow design states acceptance accessibility blueprint copy criteria,ux microcopy — write:copy design accessibility clarity content critique localization microcopy,v-model / mbse — assumption ledger:assumptions model architecture dates design elements engineering explicit,value vs. effort — 2×2 quick wins matrix:identify intermediate kill management matrix offs operations planning,vow-and-witness:commitment vow witness accountability beginner ceremony check dignity,vroom–yetton–jago decision model:decision autocratic balance brainstorming choose clarification commitment consul,weighted mini-matrix (quick score):planning against compare criteria decision force intermediate matrix,what if — scenario reframing questions:brainstorming problem alternative beginner changing constraints context creativi,wishing — imagine ideal solutions:brainstorming beginner beyond constraints creativity features ideal identify,woop (wish–outcome–obstacle–plan):obstacle beginner bind brainstorming contrast desired evaluation main,working backwards prfaq — truths & tradeoffs:align alignment amazon backwards building communication customer facing,working out loud — truth edition:review asks beginner clarity communication design facilitation help,wsjf — (business value + time criticality + risk reduction) ÷ job size:planning economic future improvement maximize process safe self,zhongyong — doctrine of the mean (confucian moderation):avoid calibrating communication content context craft cultural ethics'
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
          'You are a taxonomy expert for a mixed toolbox library of frameworks, patterns, tasks, helpers, heuristics, strategies, and methods. The library spans phases of work (explore, define, ideate, plan, compose, evaluate, review, prioritize, troubleshoot, compare/decide), topics (prompting, debiasing, logic, ethics, psychology, design, storytelling, etc.), and uses (ideation, decision-making, process improvement, teaching, content, coding). job is to choose the best listed tool (e.g., framework, method, technique, scaffold, etc...) for helping the user achieve their desired goal/outcome or problem based on their situation',
'Guidelines (follow all):',
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
      'send a email',
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
use_cases: [
  'cold outreach to a prospect or partner',
  'follow-up after connecting at an event',
  'reply to an inbound DM',
  'remind about a pending request',
  'schedule a quick call',
  'share a resource or link',
  'invite to a beta or demo',
  'ask for quick feedback',
  'nudge a stalled conversation',
  'introduce two people'
],
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
  use_cases: [
  'propose a decision with tradeoffs',
  'request resources or headcount',
  'share a project update',
  'document a policy change',
  'summarize research or findings',
  'capture risks and mitigations',
  'write a postmortem summary',
  'outline a plan with next steps',
  'brief leadership before a meeting',
  'set context for a cross-functional effort'
],
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
 // id: 'task_letter'
use_cases: [
  'cover letter for a job application',
  'letter of recommendation',
  'customer complaint letter',
  'apology for a service issue',
  'appreciation or thank-you letter',
  'formal request letter',
  'reference verification letter',
  'termination or cancellation notice',
  'appeal or dispute letter',
  'general formal correspondence'
],

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
      // id: 'task_announcement'
use_cases: [
  'product launch or feature update',
  'maintenance window or downtime notice',
  'policy or pricing change',
  'organizational change or new hires',
  'security or privacy update',
  'event announcement or registration',
  'deprecation or end-of-life notice',
  'beta or early access program',
  'incident resolution communication',
  'regional availability or expansion'
],
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
      // id: 'task_press_release'
use_cases: [
  'new product or feature launch',
  'funding announcement',
  'partnership or integration',
  'major customer milestone or case study',
  'executive hire or board appointment',
  'award or recognition',
  'event participation or keynote',
  'research report or data release',
  'geographic expansion',
  'open-source project release'
],

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
    { key:'mode', label:'What do you want with your resume?', type:'select',
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
    'Write a social media post',
    'Social media post',
    'Posting on social media',
    'Sharing on social media',
    'Crafting a social media post',
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
},

/* ---------------------------------------------------------
   Research, UX, and Product Planning
--------------------------------------------------------- */



{
  id: 'task_survey_plan',
  slug: 'survey-plan',
  label: 'Survey — Plan — Design',
  kind: 'task',
  categories: ['ux','research','planning'],
  tags: [
    'type:task','topic:survey','topic:survey-design','topic:sampling','topic:ethics',
    'use:plan','use:design','use:edit','use:qa','stage:plan','stage:design'
  ],
  use_cases: [
    'scope a new survey with goals, audience, and logistics',
    'align stakeholders on sampling and timing',
    'choose tools and define success criteria',
    'pressure-test objectives and translate them into questions or tasks',
    'decide mode (in-product, panel, email) and recruiting strategy for representativeness',
    'estimate sample size, incidence rate, and margin of error/power tradeoffs',
    'design pilots/cognitive interviews and quality gates (speeders, straightliners, fraud)',
    'plan analysis (key cuts, weighting, stats) and reporting artifacts',
    'set up accessibility, localization, consent/PII handling, and incentives',
    'refine or edit a single question (bias, wording, scale design)',
    'convert qualitative findings into a quant module (themes → items)',
    'run split-sample wording/scale experiments and A/B concept tests',
    'plan a longitudinal tracker (wave management, continuity, change rules)',
    'localize instruments across languages (scale labels, cultural nuance)',
    'price or feature-prioritization studies (Van Westendorp, Gabor–Granger, MaxDiff, Conjoint)',
    'diagnose/repair low IR, low completion, or poor data quality in existing surveys',
    'align survey outputs with product analytics and business KPIs',
    'create an item bank and codebook for reuse'
  ],
  definition: 'Plan and (optionally) refine a survey end-to-end: decisions, objectives, hypotheses, audience, sampling, mode, instrument strategy, ethics/privacy, accessibility/localization, field ops, analysis/weighting/reporting, timeline, risks, and success criteria.',
  help: 'Paste prior briefs, drafts, or artifacts. Reference saved personas/segments to prefill audience and quotas. Note any legal/privacy constraints, localization needs, or tooling preferences. This task can scope a full survey, a module, or a single question.',
  fields: [
    { key:'objective',        label:'Research objective(s)', type:'textarea', ph:'What you want to learn', desc:'Keep each objective decision-linked. If it won’t change a decision, cut it.' },
    { key:'decision',         label:'Decision to inform', type:'text', ph:'What decision will this survey help make?', desc:'Design backwards from the decision to avoid “nice-to-know” creep.' },
    { key:'hypotheses',       label:'Hypotheses / assumptions', type:'textarea', ph:'H1, H2… What you currently believe', desc:'Assumptions to test; informs power, subgroups, and item design.' },

    { key:'work_scope', label:'Scope of work', type:'select',
      options:['full survey','module/section','single question','tracker wave update'],
      desc:'Controls how broad the deliverable is.',
      ph:'full survey' },

    { key:'audience',         label:'Target audience', type:'textarea', ph:'Segments, personas, markets', desc:'Who the results should represent. Include markets/regions and exclusions.' },
    { key:'persona_context',  label:'Persona / segment refs (optional)', type:'textarea', ph:'@Persona: Admin Alice; @Segment: SMB Paid', desc:'Reference your saved personas/segments to align language and quotas.' },
    { key:'audience_persona', label:'Audience personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Who you are addressing; select one or more personas.',
      ph:'e.g., VP Operations; Solo founder; Nonprofit ED' },

    { key:'method',           label:'Survey mode', type:'select',
      options:['email','in-product','panel','social','intercept','sms','phone','mail','mixed'],
      desc:'Mode affects coverage, speed, bias, and cost.' },

    { key:'sample_frame',     label:'Sampling frame', type:'textarea', ph:'Lists, sources, coverage, exclusions', desc:'Where the sample comes from (CRM, panel, web/app traffic). Call out coverage gaps.' },
    { key:'sampling_method',  label:'Sampling method', type:'select',
      options:['random','stratified','quota','convenience','snowball','cluster'],
      desc:'Match representativeness and feasibility.' },

    { key:'incidence_rate',   label:'Incidence rate (IR)', type:'text', ph:'≈18% qualify', desc:'Low IR ⇒ more invites/time. Use screeners or soft launch to estimate.' },
    { key:'response_rate',    label:'Expected response rate', type:'text', ph:'e.g., 12–25%', desc:'Helps back-calc required invites and timeline.' },
    { key:'sample_size',      label:'Target sample size', type:'text', ph:'e.g., n=200 completes', desc:'Provide completes target; we’ll back-calc invitations from IR & response rate.' },
    { key:'power_conf',       label:'Confidence / power target', type:'select',
      options:['95% CI','90% CI','80% CI','custom'],
      desc:'Sets rigor for margin of error and subgroup analysis.' },

    { key:'segments',         label:'Segments / quotas', type:'textarea', ph:'e.g., 50% free, 50% paid; 60/40 new vs. existing', desc:'Quota by role, plan, region, tenure, etc. Keep it decision-driven.' },
    { key:'subgroups',        label:'Critical subgroups (for analysis)', type:'textarea', ph:'e.g., region, plan tier, tenure, device', desc:'Name the cuts you must power and report.' },

    { key:'length_target',    label:'Length (LOI) target', type:'select',
      options:['≤5 min','6–10 min','11–15 min','>15 min'],
      desc:'Controls burden/drop-off. Shorter is better.' },

    { key:'instrument_strategy', label:'Instrument strategy', type:'textarea', ph:'Sections, question types, logic, randomization', desc:'High-level blueprint for question design and flow.' },
    { key:'question_type_prefs', label:'Question type preferences', type:'textarea', ph:'rating, single-select, open text, MaxDiff…', desc:'If advanced modules (MaxDiff/Conjoint) are in play, note constraints.' },
    { key:'scale_prefs',      label:'Scale preferences', type:'textarea', ph:'e.g., item-specific 5-pt; 0–10 for NPS; label endpoints', desc:'Direction consistency, labeling, and midpoints.' },

    { key:'privacy_mode',     label:'Privacy mode', type:'select',
      options:['anonymous','confidential','identified'],
      desc:'Identity handling affects consent text and storage.' },
    { key:'consent',          label:'Consent & data handling', type:'textarea', ph:'PII handling, retention window, GDPR/CCPA/IRB notes', desc:'Say what you’ll collect, how you’ll use/store it, and for how long.' },
    { key:'accessibility',    label:'Accessibility considerations', type:'textarea', ph:'Mobile-first, keyboard nav, language level, contrast, SR labels', desc:'Design for inclusivity; list must-haves and constraints.' },
    { key:'localization',     label:'Localization scope', type:'select',
      options:['none','1–3 languages','4–10 languages','>10 languages'],
      desc:'Impacts copy style, scale labels, QA plan, and schedule.' },

   { key:'bias_checks',      label:'Bias/ethics checks (optional)',         label: "Biases (from library)",
          autofill: "bias->inline",
          dataset: "bias",
          key: "risks_picks",
          itemType: "typeahead",
          type: "repeater",
          unit: "bias",
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity' },

    { key:'incentive',        label:'Incentive plan', type:'text', ph:'e.g., $20 gift card or raffle', desc:'Align with effort and audience norms.' },
    { key:'incentive_fulfillment', label:'Incentive fulfillment', type:'text', ph:'e.g., Tremendous, manual codes, post-study email', desc:'Fulfillment channel, timing, and fraud prevention.' },

    { key:'qa_checks',        label:'Quality gates', type:'textarea', ph:'speeders, straightliners, attention checks, duplicate/IP rules', desc:'Pre-register criteria; apply consistently.' },
    { key:'pilot_plan',       label:'Pilot / cognitive testing plan', type:'textarea', ph:'soft launch %, # interviews, success gates', desc:'Test the instrument before full release.' },
    { key:'field_ops',        label:'Field ops / distribution', type:'textarea', ph:'release waves, reminders cadence, panel guardrails, fraud checks', desc:'How you’ll run the study day-to-day.' },
    { key:'reminders',        label:'Reminder strategy', type:'text', ph:'e.g., 2 reminders at 48h and 5d', desc:'Avoid spamming; suppress completes.' },

    { key:'analysis_plan',    label:'Analysis plan', type:'textarea', ph:'key cuts, metrics, tests, visuals', desc:'Name primary tables/graphs and stats; define decision thresholds.' },
    { key:'weighting_targets',label:'Weighting / post-strat targets', type:'textarea', ph:'e.g., region, plan, tenure margins', desc:'State margins and sources for weighting (if any).' },
    { key:'reporting',        label:'Reporting artifact', type:'select',
      options:['executive readout','dashboard','one-pager','raw export + codebook'],
      desc:'Primary deliverable to shape the final output.' },
    { key:'reporting_breakouts', label:'Required reporting breakouts', type:'textarea', ph:'e.g., by plan tier and region', desc:'Guarantee the cuts stakeholders expect.' },

    { key:'timeline',         label:'Timeline', type:'text', ph:'Fielding window & milestones', desc:'Include pilot, full launch, close, analysis, and readout dates.' },
    { key:'stakeholders',     label:'Stakeholders & roles', type:'textarea', ph:'Sponsor, research, design, PM, data, legal', desc:'Owners, approvers, and reviewers.' },
    { key:'budget',           label:'Budget (optional)', type:'text', ph:'Panel cost, incentives, tooling', desc:'Rough cost envelope and constraints.' },
    { key:'risks',            label:'Risks & mitigations', type:'textarea', ph:'coverage gaps, low IR, sensitive topics, timeline risk', desc:'Name risks early and how you’ll handle them.' },

    { key:'metrics',          label:'Success criteria / field KPIs', type:'textarea', ph:'Completion rate, MoE, representativeness, LOI, drop-off', desc:'Define measurable success to avoid post-hoc shifting.' },
    { key:'tools',            label:'Tools', type:'text', ph:'e.g., Typeform, Qualtrics, GSheets, Dovetail', desc:'Survey, analysis, and reporting tools.' },
    { key:'attachments',      label:'Links & artifacts', type:'textarea', ph:'briefs, drafts, Figma, prior waves', desc:'Context for continuity and reuse.' },
    { key:'constraints',      label:'Constraints', type:'textarea', ph:'Legal/privacy, brand tone, data residency, customer fatigue', desc:'Anything that narrows scope or method.' }
  ],
  boosters: [
    'Write the decision first; design backwards from it.',
    'Limit to 1–3 sharp objectives; park “nice-to-know” in a backlog.',
    'Choose mode for coverage and bias, not just speed.',
    'Estimate IR and response rate; back-calc invites and schedule.',
    'Quota only what you’ll analyze; power critical subgroups up front.',
    'Prefer item-specific questions over agree/disagree to curb acquiescence bias.',
    'Commit to accessibility and localization early; it changes copy and QA.',
    'Pilot (soft launch or cognitive interviews) before full release.',
    'Pre-register quality rules (speeders, straightliners, dedupe) and follow them.',
    'Keep LOI ≤10 min unless value exchange is clear and communicated.',
    'Pre-plan tables/graphs and decision thresholds to avoid fishing expeditions.',
    'Map findings → owners → next steps in the reporting plan.'
  ],
  template: (f) => {
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    const scopeNote = {
      'full survey': 'Scope: Produce an end-to-end plan AND instrument blueprint. Include goals→items mapping, sample math (IR/RR→invites), draft sections with example items & scales, logic/randomization plan, field ops, QA rules, and analysis/reporting plan.',
      'module/section': 'Scope: Focus on one module. Define the module’s decision-link, write items & scales, flow/logic for this section, and how it integrates with the broader instrument without inflating LOI.',
      'single question': 'Scope: Surgical edit/design of ONE item. Provide 2–3 alternative phrasings, scale options (with anchors), and bias checks; include rationale and recommended version.',
      'tracker wave update': 'Scope: Optimize continuity. Propose minimal edits to preserve trend; document any breaks-in-series, provide bridge items if necessary, and update wave schedule/quotas.'
    }[f.work_scope];

    const modeNote = {
      'email': 'Mode guidance: Use personalized invites + 1–2 reminders; mobile-first layout; expect moderate response rate; higher self-selection—mitigate with weighting/quotas.',
      'in-product': 'Mode guidance: Trigger contextually (just-in-time) with throttling; excellent coverage of active users; risk of recency/context bias—keep items short and specific.',
      'panel': 'Mode guidance: Faster completes; manage quality via fraud checks, attention items, and consistency rules; ensure quotas mirror your target audience.',
      'social': 'Mode guidance: Broad reach but biased sample; use screening questions and caution in generalization; consider raking to known benchmarks.',
      'intercept': 'Mode guidance: On-site/in-app intercepts capture in-the-moment feedback; keep LOI short; rotate invites to reduce annoyance.',
      'sms': 'Mode guidance: Ultra-short surveys; limit to ≤5 questions; use tap-friendly options; ensure consent per carrier policy.',
      'phone': 'Mode guidance: Higher cost; better for complex/senior audiences; script carefully to reduce interviewer effects.',
      'mail': 'Mode guidance: Slow but inclusive for offline populations; requires clear visual design and return incentives.',
      'mixed': 'Mode guidance: Combine modes intentionally; document mode-specific wording/layout and plan for mode effects in analysis.'
    }[f.method];

    const sampNote = {
      'random': 'Sampling guidance: Simple random sampling; straightforward MOE; ensure de-duplication and frame coverage.',
      'stratified': 'Sampling guidance: Stratify on key subgroups (e.g., region, plan tier); allocate proportionally or by minimum n to power comparisons; weight back to population.',
      'quota': 'Sampling guidance: Non-probability with quotas to mimic population margins; document selection bias; use post-stratification/raking.',
      'convenience': 'Sampling guidance: Fast but biased; be explicit about limits; supplement with targeted recruiting if stakes are high.',
      'snowball': 'Sampling guidance: Useful for hard-to-reach populations; monitor cluster bias; cap referrals per seed.',
      'cluster': 'Sampling guidance: Sample groups first (e.g., stores), then units; account for design effect (DEFF) in n/power.'
    }[f.sampling_method];

    const confNote = {
      '95% CI': 'Rigor: Target 95% confidence; report margins of error and use survey-aware estimators for weighted data.',
      '90% CI': 'Rigor: Target 90% confidence; useful for directional decisions with tighter timelines.',
      '80% CI': 'Rigor: Target 80% confidence; exploratory; pair with strong effect sizes and follow-up testing.',
      'custom': 'Rigor: Specify your desired confidence/power explicitly and align n and analysis accordingly.'
    }[f.power_conf];

    const loiNote = {
      '≤5 min': 'LOI guidance: Keep to micro-survey length; prioritize 1–2 objectives; avoid grids; one open-end max.',
      '6–10 min': 'LOI guidance: Standard length; group items by topic; randomize within blocks; limit matrices.',
      '11–15 min': 'LOI guidance: Higher burden; ensure clear value exchange and incentive; consider save-and-resume.',
      '>15 min': 'LOI guidance: Long form; expect drop-off; split into modules/waves or adopt diary design.'
    }[f.length_target];

    const privacyNote = {
      'anonymous': 'Privacy: Do not collect identifiers; remove metadata; use aggregate reporting only.',
      'confidential': 'Privacy: Collect identifiers separately from responses; restrict access; report de-identified cuts.',
      'identified': 'Privacy: Make PII purpose explicit; offer opt-outs; secure storage; consider legal/IRB review.'
    }[f.privacy_mode];

    const locNote = {
      'none': 'Localization: Single-language instrument; write plainly (grade 7–8 reading level) and avoid idioms.',
      '1–3 languages': 'Localization: Use forward–back translation; harmonize scale labels; run small cognitive checks per language.',
      '4–10 languages': 'Localization: Add centralized glossary, term lock, and in-market reviewers; budget for layout QA.',
      '>10 languages': 'Localization: Industrialize pipeline (TMS); test measurement invariance for key scales across languages.'
    }[f.localization];

    const reportNote = {
      'executive readout': 'Reporting: 6–10 slides with decisions, 3–5 key findings, clear callouts, and next steps.',
      'dashboard': 'Reporting: Live filters for key cuts; trend views if tracker; annotate with field dates and base sizes.',
      'one-pager': 'Reporting: Single-page brief with objective, highlights, and 3 actions; perfect for async leadership updates.',
      'raw export + codebook': 'Reporting: Deliver clean data, weights, and a codebook (variables, labels, scales, skip logic); include README for analysis.'
    }[f.reporting];

    return [
      'Create a comprehensive survey plan and (if applicable) instrument guidance.',
      f.objective && `Objectives:\n${f.objective}`,
      f.decision && `Decision to inform:\n${f.decision}`,
      f.hypotheses && `Hypotheses:\n${f.hypotheses}`,

      f.work_scope && `Scope of work: ${f.work_scope}\n${scopeNote}`,

      f.audience && `Audience:\n${f.audience}`,
      f.persona_context && `Persona/segment refs:\n${f.persona_context}`,
      f.audience_persona && `Audience personas: ${list(f.audience_persona)}`,

      f.method && `Mode: ${f.method}\n${modeNote}`,
      f.sample_frame && `Sampling frame:\n${f.sample_frame}`,
      f.sampling_method && `Sampling method: ${f.sampling_method}\n${sampNote}`,
      f.incidence_rate && `Incidence rate (IR): ${f.incidence_rate}`,
      f.response_rate && `Expected response rate: ${f.response_rate}`,
      f.sample_size && `Target sample size: ${f.sample_size}`,
      f.power_conf && `Confidence/power target: ${f.power_conf}\n${confNote}`,
      f.segments && `Segments / quotas:\n${f.segments}`,
      f.subgroups && `Critical subgroups:\n${f.subgroups}`,
      f.length_target && `LOI target: ${f.length_target}\n${loiNote}`,

      f.instrument_strategy && `Instrument strategy:\n${f.instrument_strategy}`,
      f.question_type_prefs && `Question type prefs:\n${f.question_type_prefs}`,
      f.scale_prefs && `Scale prefs:\n${f.scale_prefs}`,

      f.privacy_mode && `Privacy mode: ${f.privacy_mode}\n${privacyNote}`,
      f.consent && `Consent & data handling:\n${f.consent}`,
      f.accessibility && `Accessibility:\n${f.accessibility}`,
      f.localization && `Localization: ${f.localization}\n${locNote}`,
      f.bias_checks && `Bias/ethics checks: ${list(f.bias_checks)}`,

      f.incentive && `Incentive: ${f.incentive}`,
      f.incentive_fulfillment && `Incentive fulfillment: ${f.incentive_fulfillment}`,

      f.qa_checks && `Quality gates:\n${f.qa_checks}`,
      f.pilot_plan && `Pilot / cognitive testing:\n${f.pilot_plan}`,
      f.field_ops && `Field ops / distribution:\n${f.field_ops}`,
      f.reminders && `Reminders: ${f.reminders}`,

      f.analysis_plan && `Analysis plan:\n${f.analysis_plan}`,
      f.weighting_targets && `Weighting/post-strat targets:\n${f.weighting_targets}`,
      f.reporting && `Reporting artifact: ${f.reporting}\n${reportNote}`,
      f.reporting_breakouts && `Required reporting breakouts:\n${f.reporting_breakouts}`,

      f.timeline && `Timeline: ${f.timeline}`,
      f.stakeholders && `Stakeholders & roles:\n${f.stakeholders}`,
      f.budget && `Budget: ${f.budget}`,
      f.risks && `Risks & mitigations:\n${f.risks}`,

      f.metrics && `Success metrics:\n${f.metrics}`,
      f.tools && `Tools: ${f.tools}`,
      f.attachments && `Links & artifacts:\n${f.attachments}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      [
        'Output format:',
        '- Title: Survey Plan',
        '- Goals & Decision (bullets)',
        '- Audience & Sampling (frame, method, size, quotas, IR, CI, response rate)',
        '- Mode, LOI target, Incentives (incl. fulfillment)',
        '- Ethics (privacy mode, consent/PII), Accessibility, Localization (+ bias checks)',
        '- Instrument Strategy (sections, question types, scales, logic/randomization)',
        '- Pilot & Field Ops (waves, reminders, panel guardrails, fraud checks)',
        '- Quality Rules (speeders, straightliners, dedupe, attention checks)',
        '- Analysis Plan (key cuts, weighting targets, statistical tests)',
        '- Reporting (artifact, required breakouts, owners)',
        '- Timeline, Budget, Tools',
        '- Success Criteria',
        '- Risks & Mitigations'
      ].join('\\n')
    ].filter(Boolean).join('\\n');
  }
},



/* ---------------------------------------------------------
   TASK: Questionnaire — Write (enhanced)
--------------------------------------------------------- */
{
  id: 'task_questionnaire_write',
  slug: 'questionnaire-write',
  label: 'Questionnaire — Write',
  kind: 'task',
  categories: ['ux','research','writing'],
  tags: [
    'type:task',
    'topic:survey',
    'topic:questionnaire',
    'topic:question-design',
    'use:write',
    'use:design',
    'use:edit',
    'stage:design'
  ],
  use_cases: [
    'turn objectives into clear, unbiased questions',
    'structure sections and logic for flow',
    'reduce length while maximizing insight',
    'convert constructs into item banks and scales',
    'rewrite leading/double-barreled/loaded items',
    'design item-specific scales to reduce acquiescence bias',
    'configure skip/display logic, piping, and randomization',
    'replace long rankings with MaxDiff or concise alternatives',
    'design targeted open-ends that elicit actionable reasons',
    'localize items and scale labels across markets',
    'add split-sample tests for wording or scale choices',
    'enforce accessibility and mobile-first matrix guardrails',
    'prepare validation rules (numeric bounds, required, masks)',
    'shrink a bloated instrument while preserving decision power',
    'draft instructions and section primers in brand voice',
    'refactor a single question for clarity and bias reduction',
    'produce platform-ready exports (outline, CSV item bank, platform JSON/QSF-like)'
  ],
  definition: 'Draft or refine a questionnaire (the instrument): sections, items, response options, scales, order, logic, and wording that measure the right constructs with minimal bias and burden.',
  help: 'Paste objectives and any drafts or item lists. Indicate constructs, required sections, and scale preferences. Select scope, reading level, and accessibility/localization needs. Use personas/bias typeahead to guide language choices. Choose an output format and platform so the deliverable is immediately usable.',
  fields: [
    { key:'work_scope', label:'Scope of work', type:'select',
      options:['full instrument','module/section','single question','tracker wave update'],
      desc:'Sets the depth and deliverable. “Full instrument” = end-to-end sections, logic, and exports. “Module/section” = add/edit a focused block. “Single question” = precision rewrite and options/scale. “Tracker wave update” = continuity + change control.',
      ph:'full instrument' },

    { key:'audience', label:'Audience', type:'text', ph:'e.g., paid SMB admins in US',
      desc:'Primary respondent group the instrument is written for.' },
    { key:'audience_persona', label:'Audience personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Select one or more personas to tune tone, examples, and option wording.',
      ph:'e.g., VP Operations; Solo founder; Nonprofit ED' },

    { key:'objectives', label:'Research objectives', type:'textarea',
      ph:'What decisions should this questionnaire inform?',
      desc:'Each objective should map to one or more items/sections.' },
    { key:'decision', label:'Decision to inform', type:'text',
      ph:'What will this questionnaire help decide?',
      desc:'Design backwards from the decision to choose question types and depth.' },
    { key:'constructs', label:'Key constructs', type:'textarea',
      ph:'e.g., awareness, satisfaction, perceived value, barriers',
      desc:'Latent ideas to measure; informs scale choice and item count.' },

    { key:'sections', label:'Section plan', type:'textarea',
      ph:'Consent → Screener → Context → Core topics → Diagnostics → Demographics',
      desc:'High-level outline with titles and purposes.' },

    { key:'length', label:'Length target', type:'select',
      options:['micro (≤5 Qs)','short (≤10 Qs)','medium (11–20 Qs)','long (21–35 Qs)','xl (36–50 Qs)','tracker (≤10 core + ≤10 rotating)','custom'],
      desc:'Controls burden and drop-off; shorter is better on mobile.',
      ph:'short (≤10 Qs)' },

    { key:'reading_level', label:'Reading level', type:'select',
      options:['6th grade','8th grade','10th grade','12th grade','professional'],
      desc:'Target clarity and accessibility; simplifies stems and options.',
      ph:'8th grade' },

    { key:'formats', label:'Preferred formats', type:'textarea',
      ph:'item-specific ratings; single-select; multi-select; MaxDiff; open text; short matrix',
      desc:'Pick formats suited to constructs and analysis (avoid agree/disagree when possible).' },
    { key:'scale_prefs', label:'Scale preferences', type:'textarea',
      ph:'5-pt item-specific; 0–10 intent; label endpoints; consistent direction',
      desc:'Document labels, direction, midpoints, and anchors.' },

    { key:'logic', label:'Skip/branching logic', type:'textarea',
      ph:'Who sees what? Define gates and conditions.',
      desc:'Keep only relevant questions visible to each respondent.' },
    { key:'piping', label:'Piping & substitutions', type:'textarea',
      ph:'Pipe product name or earlier choices into later items',
      desc:'Personalize items with earlier answers to increase relevance.' },
    { key:'randomization', label:'Randomization & rotation', type:'textarea',
      ph:'Randomize option order; rotate concept blocks; pin “Other/None” to bottom',
      desc:'Mitigate order effects while keeping referenced items fixed.' },
    { key:'matrix_policy', label:'Matrix guardrails', type:'select',
      options:['avoid matrices','short matrices only (≤5 items)','allow with mobile safeguards'],
      desc:'Matrices are fatiguing—set policy explicitly.',
      ph:'short matrices only (≤5 items)' },

    { key:'validation', label:'Validation rules', type:'textarea',
      ph:'required; numeric bounds; regex; masks; in-range checks',
      desc:'Prevent junk data and clarify expectations.' },
    { key:'open_end_policy', label:'Open-ends policy', type:'select',
      options:['none','1 targeted open','2–3 targeted opens','topic-specific probe'],
      desc:'Use few, focused opens that ask for reasons/examples.',
      ph:'1 targeted open' },

    { key:'sensitive', label:'Sensitive topics (handle carefully)', type:'textarea',
      ph:'e.g., health, income, security practices',
      desc:'Plan neutral wording, time anchors, and “Prefer not to say”.' },

    { key:'bias_checks', label:'Biases (from library)', type:'repeater',
      itemType:'typeahead', itemLabel:'bias', autofill:'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion, leading/loaded terms, or fear appeals.',
      ph:'e.g., Accessibility; Social desirability; Cultural sensitivity' },

    { key:'accessibility', label:'Accessibility notes', type:'textarea',
      ph:'Mobile-first, keyboard nav, SR labels, contrast, plain language',
      desc:'Guardrails for inclusive item writing and layouts.' },
    { key:'localization', label:'Localization scope', type:'select',
      options:['none','1–3 languages','4–10 languages','>10 languages'],
      desc:'Impacts copy style, scale labels, QA plan, and timeline.',
      ph:'1–3 languages' },

    { key:'tone', label:'Tone / voice', type:'select',
      options:['clear','neutral','friendly','confident','reassuring','formal','playful'],
      desc:'Guides instructions, section intros, and open-end prompts.',
      ph:'neutral' },

    { key:'platform', label:'Target platform', type:'select',
      options:['generic','Qualtrics','SurveyMonkey','Typeform','Google Forms','Alchemer','REDCap','Other'],
      desc:'Adds platform-specific syntax notes (e.g., QSF-like blocks, choice IDs).',
      ph:'generic' },

    { key:'output_format', label:'Output format', type:'select',
      options:[
        'structured outline (Markdown)',
        'platform JSON (generic)',
        'CSV item bank (Item, Stem, Type, Options, Required, Logic)',
        'QSF-like pseudo export (Qualtrics-style)',
        'Google Forms import (CSV-like)',
        'plain text bullets'
      ],
      desc:'Choose the deliverable. CSV/QSF-like options include columns/blocks ready for import/transform.',
      ph:'structured outline (Markdown)' },

    { key:'examples', label:'Examples & primers', type:'textarea',
      ph:'Draft instructions, example responses, or scenario intros',
      desc:'Use sparingly to reduce ambiguity—avoid nudging answers.' },
    { key:'constraints', label:'Constraints', type:'textarea',
      ph:'Brand style, legal/privacy, max time, data residency',
      desc:'Anything that narrows question wording or options.' }
  ],
  boosters: [
    'Design to the decision; every item must earn its keep.',
    'Map each objective to ≥1 item; delete or defer nice-to-know topics.',
    'Favor item-specific questions over agree/disagree to reduce acquiescence bias.',
    'Use behavioral specificity and time anchors (“in the past 30 days”).',
    'Keep scales consistent in direction and labeled at least at endpoints.',
    'Randomize option order; pin “None of the above” and “Other (specify)” at the bottom.',
    'Gate deep dives via logic; show only relevant items per respondent.',
    'Replace long rankings with MaxDiff when prioritization is the goal.',
    'Limit matrices or keep them short (≤5 items) with mobile safeguards.',
    'Use 1–2 targeted open-ends for reasons/examples instead of many vague ones.',
    'Pilot via cognitive interviews or soft launch; fix misinterpretations before full field.',
    'Write for accessibility and localization from the start; avoid idioms and jargon.',
    'Predefine validation and attention checks; apply sparingly and transparently.'
  ],
  template: (f)=>{
    const lenMap = {
      'micro (≤5 Qs)':'Deliver ≤5 essential questions (mobile-first).',
      'short (≤10 Qs)':'Keep under 10 questions; prioritize behavior-first items.',
      'medium (11–20 Qs)':'Allow moderate depth with clear sectioning and logic.',
      'long (21–35 Qs)':'Use strong skip logic; guard against fatigue.',
      'xl (36–50 Qs)':'Only for specialized studies; include rest cues and progress.',
      'tracker (≤10 core + ≤10 rotating)':'Maintain core continuity; rotate experiments carefully.',
      'custom':'Match item count to decision power; justify exceptions.'
    };
    const scopeMap = {
      'full instrument':'Produce an end-to-end questionnaire: sections, numbered items, response options/scales, logic, randomization, and export in the requested format.',
      'module/section':'Create or revise a focused section with clean interfaces to the rest of the instrument and clear entry/exit logic.',
      'single question':'Rewrite/design one question with unbiased stem, MECE options, scale spec, and validation, plus 1–2 alternates.',
      'tracker wave update':'Propose wave-safe edits with continuity notes and change-control justifications.'
    };
    const matrixMap = {
      'avoid matrices':'Replace grids with single items or short item batteries; optimize for mobile and reduce straightlining.',
      'short matrices only (≤5 items)':'Allow brief matrices with full labels, randomized rows, and mobile-friendly rendering.',
      'allow with mobile safeguards':'Permit matrices if necessary; add row limits, randomization, and mobile transformations.'
    };
    const openMap = {
      'none':'Exclude open-ends to minimize burden.',
      '1 targeted open':'Include exactly one reason/probe open-end tied to a key decision.',
      '2–3 targeted opens':'Include a small set of focused open-ends, each with a clear purpose.',
      'topic-specific probe':'Add conditional probes only when certain answers appear.'
    };
    const readMap = {
      '6th grade':'Use very simple sentences, common words, and concrete examples.',
      '8th grade':'Plain language with short clauses and minimal jargon.',
      '10th grade':'General audience prose; define any necessary terms inline.',
      '12th grade':'More technical phrasing allowed; still avoid needless complexity.',
      'professional':'Domain-specific terminology acceptable; add definitions where needed.'
    };
    const platMap = {
      'generic':'No platform-specific syntax; keep exports broadly portable.',
      'Qualtrics':'Add QSF-like block/choice annotations and display logic notes.',
      'SurveyMonkey':'Use page breaks and collector-friendly settings guidance.',
      'Typeform':'Favor conversational, one-question-per-screen phrasing.',
      'Google Forms':'Use section breaks and simple validation compatible with import.',
      'Alchemer':'Note piping/merging and logic in Alchemer-friendly terms.',
      'REDCap':'Prefer field types with code values; flag required fields and branching logic.',
      'Other':'Keep structure generic; call out any assumptions.'
    };
    const outMap = {
      'structured outline (Markdown)':'Return a Markdown outline with sections, numbered items, options, and inline notes for logic/randomization.',
      'platform JSON (generic)':'Return a generic JSON schema: sections[], items[] {id, stem, type, options[], required, validation, logic}.',
      'CSV item bank (Item, Stem, Type, Options, Required, Logic)':'Return a CSV (pipe-delimited options) with columns: ItemID, Section, Stem, Type, Options, Required, Validation, Logic, Randomization.',
      'QSF-like pseudo export (Qualtrics-style)':'Return a QSF-like pseudo export with Blocks, Questions (QuestionText, DataExportTag, Choices, Validation, Logic).',
      'Google Forms import (CSV-like)':'Return a CSV compatible with Forms import (Title, Question, Type, Options, Required, GoToSection).',
      'plain text bullets':'Return concise bullets per question with options and any logic.'
    };
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    return [
      'Write or refine a survey questionnaire.',
      f.work_scope && `Scope of work: ${f.work_scope} — ${scopeMap[f.work_scope]||''}`,
      f.audience && `Audience: ${f.audience}`,
      f.audience_persona && `Audience personas: ${list(f.audience_persona)}`,

      f.objectives && `Objectives:\n${f.objectives}`,
      f.decision && `Decision to inform:\n${f.decision}`,
      f.constructs && `Key constructs:\n${f.constructs}`,

      f.sections && `Section plan:\n${f.sections}`,
      f.length && `Length guidance: ${lenMap[f.length]||f.length}`,
      f.reading_level && `Reading level guidance: ${readMap[f.reading_level]||f.reading_level}`,

      f.formats && `Preferred formats:\n${f.formats}`,
      f.scale_prefs && `Scale preferences:\n${f.scale_prefs}`,

      f.logic && `Skip/branching logic:\n${f.logic}`,
      f.piping && `Piping & substitutions:\n${f.piping}`,
      f.randomization && `Randomization & rotation:\n${f.randomization}`,
      f.matrix_policy && `Matrix policy: ${matrixMap[f.matrix_policy]||f.matrix_policy}`,

      f.validation && `Validation rules:\n${f.validation}`,
      f.open_end_policy && `Open-ends policy: ${openMap[f.open_end_policy]||f.open_end_policy}`,

      f.sensitive && `Handle with care:\n${f.sensitive}`,
      f.bias_checks && `Bias/ethics checks: ${list(f.bias_checks)}`,

      f.accessibility && `Accessibility:\n${f.accessibility}`,
      f.localization && `Localization scope: ${f.localization}`,
      f.tone && `Tone/voice: ${f.tone}`,

      f.examples && `Examples & primers:\n${f.examples}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      f.platform && `Platform guidance: ${platMap[f.platform]||f.platform}`,
      f.output_format && `Deliverable: ${f.output_format} — ${outMap[f.output_format]||''}`,

      [
        'Output format (structure to produce regardless of selected export):',
        '- Section list (title · purpose)',
        '- Numbered questions with response options and scale specs',
        '- Validation & input masks (where relevant)',
        '- Notes: randomization, piping, skip/display logic',
        '- Matrix guardrails and mobile guidance',
        '- Bias/ethics checks applied per section',
        '- Accessibility/localization notes'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Screener — Create Criteria — Write (enhanced+contextual)
   Purpose: Help the AI design or refine a screener/screening survey
   with explicit criteria, quotas, eligibility logic, ethics, and ops.
--------------------------------------------------------- */
{
  id: 'task_screener_criteria',
  slug: 'screener-criteria',
  label: 'Screener — Create Criteria',
  kind: 'task',
  categories: ['ux','research','recruiting'],
  tags: [
    'type:task',
    'topic:screener',
    'topic:recruiting',
    'topic:eligibility',
    'topic:fraud-prevention',
    'use:recruit',
    'use:design',
    'use:edit',
    'stage:plan'
  ],
  use_cases: [
    'recruit qualified participants for interviews or usability tests',
    'define must-have, nice-to-have, and exclude criteria',
    'prevent misrecruits with disqualifiers and soft/hard quotas',
    'convert study objectives into behavioral screeners',
    'estimate incidence rate (IR) and plan quotas before full launch',
    'design screening surveys that capture baseline context for later analysis',
    'auto-generate pass/fail logic and termination messages',
    'set device, locale, and accessibility eligibility for usability sessions',
    'configure fraud checks (speeders, duplicates, geo/device)',
    'route qualified participants to scheduling and incentive flows',
    'localize screener items and ensure inclusive demographic options',
    'adapt a screener for panel vs. CRM vs. intercept recruitment',
    'refine a single eligibility item without rewriting the full screener'
  ],
  definition: 'Create or refine a screener (or screening survey) with explicit must/should/exclude criteria, quotas, pass/fail logic, fraud checks, and ethics/accessibility guardrails. Outputs a tight instrument plus eligibility rules and operational guidance.',
  help: 'Paste your study brief and any prior screeners. Select study type, screener scope, channels, and quota strategy so the instructions fit your context. Use personas/bias libraries to tighten language and avoid exclusionary criteria. This task supports full screeners or single-item edits.',
  fields: [
    { key:'study',   label:'Study name', type:'text', ph:'e.g., Mobile onboarding usability' },

    { key:'screening_objectives', label:'Screening objective(s)', type:'textarea',
      ph:'Admit weekly mobile users; exclude competitors; balance regions; collect contact slots',
      desc:'Decision-linked goals for the screener; keeps criteria purposeful.' },

    { key:'profile', label:'Target participant profile', type:'textarea',
      ph:'role, experience, tools, region',
      desc:'Describe who this screener should admit (in plain, behavioral terms).' },

    {
      key:'audience_persona',
      label:'Audience personas (optional)',
      type:'repeater',
      itemType:'typeahead',
      itemLabel:'persona',
      autofill:'persona->inline',
      desc:'Who you are recruiting; select one or more personas to guide wording and quotas.',
      ph:'e.g., Admin Alice (SMB); Security Lead; Procurement Manager'
    },

    { key:'study_type', label:'Study type', type:'select',
      options:[
        'interviews (moderated)',
        'usability test (moderated)',
        'usability test (unmoderated)',
        'diary/longitudinal',
        'survey (quant)',
        'field/ethnographic',
        'beta/early access'
      ],
      desc:'Alters eligibility focus (e.g., device/setup for usability; breadth for quant).' },

    { key:'screener_scope', label:'Screener scope', type:'select',
      options:['short screener (≤10 items)','screening survey (11–20 items)','single eligibility question'],
      desc:'Determines depth and whether baseline metrics are captured.' },

    { key:'channels', label:'Recruiting channels', type:'textarea',
      ph:'panel, intercept, CRM, community',
      desc:'Source mix influences coverage and fraud risk; list all that apply.' },

    { key:'disqualify_first', label:'Put disqualifiers first?', type:'select', options:['yes','no'],
      desc:'Saves participant time by front-loading high-signal fail gates.' },

    { key:'must', label:'Must-have', type:'textarea',
      ph:'Non-negotiables (behavioral, situational, setup)',
      desc:'Phrase behaviorally with time anchors (e.g., “used X in past 30 days”).' },

    { key:'nice', label:'Nice-to-have', type:'textarea',
      ph:'Priorities used for quotas',
      desc:'Supports diversity of experience without excluding; use for quota balance.' },

    { key:'exclude', label:'Exclude / disqualify', type:'textarea',
      ph:'Conflicts, competitors, age limits, region out-of-scope',
      desc:'Keep clear, fair, and justified. Avoid proxy exclusions that bias the sample.' },

    { key:'verification_items', label:'Behavioral verification items', type:'textarea',
      ph:'Tasks/feature checks (include plausible fakes sparingly)',
      desc:'Validate true users without trick questions; avoid punitive “gotchas”.' },

    { key:'device_requirements', label:'Device / environment requirements', type:'textarea',
      ph:'desktop + webcam; iOS 16+; Chrome only; stable Wi-Fi',
      desc:'Critical for usability tests or recordings; be explicit and testable.' },

    { key:'accessibility_needs', label:'Accessibility eligibility/needs (if relevant)', type:'textarea',
      ph:'screen reader users; captions required; high-contrast UI',
      desc:'Ensure respectful inclusion and accommodations; do not tokenise.' },

    { key:'localization', label:'Localization scope', type:'select',
      options:['none','1–3 languages','4–10 languages','>10 languages'],
      desc:'Impacts copy, QA, and feasibility per market (and demographic labels).' },

    { key:'demographic_policy', label:'Demographic module policy', type:'select',
      options:['none','end-only (optional)','end-only (optional + self-describe)','quota-gated (minimize & justify)'],
      desc:'Where/how to ask identity questions; prefer end-only & optional unless gating quotas.' },

    { key:'quotas', label:'Quotas', type:'textarea',
      ph:'40% SMB / 60% Enterprise; ≥30% EMEA; 50/50 new vs. existing',
      desc:'Quota only what you will analyze; avoid micro-quotas that stall fielding.' },

    { key:'quota_strategy', label:'Quota strategy', type:'select',
      options:['hard gates (terminate overflow)','soft targets (allow slight drift)','monitor-only (no enforcement)'],
      desc:'Controls termination behavior when a cell fills and how strictly balance is enforced.' },

    { key:'incidence_rate', label:'Estimated incidence rate (IR)', type:'text', ph:'~18% qualify',
      desc:'Lower IR → more invites and cost; plan a soft launch to validate.' },

    { key:'expected_show_rate', label:'Expected show/completion rate', type:'text',
      ph:'e.g., 70% show to sessions; 85% complete survey',
      desc:'Back-calc invites and over-recruit buffer.' },

    { key:'length', label:'Screener length', type:'select', options:['≤5 Qs','6–10 Qs','>10 Qs'],
      desc:'Keep it short and decisive; longer flows increase abandonment and cost.' },

    { key:'pass_fail_style', label:'Pass/fail logic style', type:'select',
      options:['question-level gates','score-based composite','quota-based only'],
      desc:'Choose how eligibility is computed and communicated to the participant.' },

    { key:'terminate_message', label:'Terminate message', type:'text',
      ph:'Thanks—this study needs a different profile.',
      desc:'Respectful, short, and transparent—no blame; avoid implying failure.' },

    { key:'qualified_message', label:'Qualified message', type:'text',
      ph:'You qualify! Next, pick a time…',
      desc:'Set expectations for next steps (scheduling, consent, incentive).' },

    { key:'scheduling', label:'Scheduling & contact collection', type:'textarea',
      ph:'Calendly link, time zones, minimal PII, privacy note',
      desc:'Collect only what’s needed; surface time-zone conversion if global.' },

    { key:'incentive_type', label:'Incentive type', type:'select',
      options:['cash','gift card','voucher/credit','charity donation','sweepstakes/raffle','none'],
      desc:'Match effort and norms; avoid coercion.' },

    { key:'incentive', label:'Incentive amount/details', type:'text',
      ph:'$75 for 60 min; $10 survey',
      desc:'Clarity reduces no-shows and disputes.' },

    { key:'incentive_delivery', label:'Incentive delivery', type:'text',
      ph:'Tremendous; manual codes; via email in 5–7 days',
      desc:'State method, timing, and eligibility requirements.' },

    { key:'fraud_checks', label:'Fraud & quality checks', type:'textarea',
      ph:'reCAPTCHA; IP/device dedupe; speeders/straightliners; geo checks',
      desc:'Pre-register thresholds; apply consistently; keep burden low.' },

    { key:'geo_policy', label:'Geo/IP policy', type:'textarea',
      ph:'VPN handling; country restrictions; OFAC compliance',
      desc:'Avoid unfair exclusion; explain rationale if restricting.' },

    { key:'consent', label:'Consent & privacy notes', type:'textarea',
      ph:'Anonymity vs. confidentiality; retention window; withdrawal rights',
      desc:'Explain what’s collected, why, who sees it, and for how long.' },

    { key:'pii_handling', label:'PII handling', type:'textarea',
      ph:'storage, access controls, deletion policy, separate vault',
      desc:'Store PII separately; minimize retention and access.' },

    /* Bias library typeahead (use this exact shape) */
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    },

    { key:'soft_launch', label:'Soft launch & IR monitoring plan', type:'textarea',
      ph:'10% sample; check IR, quota fill, drop-off; fix ambiguous items',
      desc:'Plan an initial wave to validate IR and logic before full field.' },

    { key:'constraints', label:'Constraints', type:'textarea',
      ph:'privacy, exclusions, brand/voice limits, legal/IRB',
      desc:'Anything that narrows criteria or wording.' }
  ],
  boosters: [
    'Lead with high-signal disqualifiers to save time and reduce fatigue.',
    'Phrase criteria behaviorally with time anchors (e.g., “used X in the past 30 days”).',
    'Quota only variables you will analyze; otherwise you’ll stall fielding.',
    'Prefer role/behavior over demographics unless truly decision-relevant.',
    'Soft launch to estimate IR and fix ambiguous items before full release.',
    'Write terminate messages that are respectful and brief; never blame the participant.',
    'For usability: specify device/OS/browser and recording requirements early.',
    'For panel recruits: add fraud checks (dup/IP/device) and simple verification items.',
    'For CRM recruits: suppress recent invitees; cap reminders; respect fatigue.',
    'Keep screener ≤10 items; use a screening survey only when baseline metrics matter.',
    'Document consent, PII handling, and incentive delivery to build trust.'
  ],
  template: (f)=>{
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    // Context-expanding notes that change instructions based on select choices
    const studyTypeGuide = ({
      'interviews (moderated)':
        'Guidance for moderated interviews: include availability windows, consent for recording, and environment checks (quiet space, mic/camera test). Over-recruit 2–3× to cover no-shows.',
      'usability test (moderated)':
        'Guidance for moderated usability: gate by required device/OS/browser, screen size, and stable bandwidth; add task familiarity checks; collect tech check link.',
      'usability test (unmoderated)':
        'Guidance for unmoderated usability: specify compatible platforms and recorder permissions; include single-device requirement and silent environment note.',
      'diary/longitudinal':
        'Guidance for diary/longitudinal: screen for reliability (past completion, motivation), consent for repeated contact, and notification preferences; plan incentives per entry + completion bonus.',
      'survey (quant)':
        'Guidance for quant survey: optimize for breadth and representativeness; avoid over-screening; emphasize quotas and soft gates; keep to ≤3 minutes.',
      'field/ethnographic':
        'Guidance for field/ethnographic: verify site access, safety considerations, and consent for photos/video; include travel radius and availability windows.',
      'beta/early access':
        'Guidance for beta/early access: verify device compatibility, update cadence, and willingness to share logs; include NDA and rollback plan.'
    })[f.study_type];

    const scopeGuide = ({
      'short screener (≤10 items)':
        'Scope note: produce a compact, decisive screener (≤10 items). Prioritize high-signal gates and quotas; defer nice-to-know items.',
      'screening survey (11–20 items)':
        'Scope note: include baseline profiling items (e.g., stack, context, satisfaction) alongside eligibility. Keep total time ≤4 minutes.',
      'single eligibility question':
        'Scope note: craft a single, high-precision eligibility item with unambiguous, behavior-anchored options and clear pass/fail mapping.'
    })[f.screener_scope];

    const dqGuide = f.disqualify_first === 'yes'
      ? 'Placement rule: place high-signal disqualifiers at S1–S3 to minimize burden; route to a respectful terminate message immediately on fail.'
      : (f.disqualify_first === 'no'
          ? 'Placement rule: do not front-load disqualifiers; instead, collect minimal context first, then apply gates just before quotas.'
          : null);

    const logicGuide = ({
      'question-level gates':
        'Eligibility logic: attach pass/fail criteria to individual items; terminate immediately on fail; expose minimal context in messages.',
      'score-based composite':
        'Eligibility logic: compute a composite score from multiple items (e.g., behavior + tenure); set threshold and explain rationale internally; avoid exposing score to participants.',
      'quota-based only':
        'Eligibility logic: admit all scoped respondents until quotas fill; once a cell is full, terminate overflow with a neutral message.'
    })[f.pass_fail_style];

    const quotaGuide = ({
      'hard gates (terminate overflow)':
        'Quota enforcement: treat full cells as hard gates—terminate overflow respondents once the cell target is met.',
      'soft targets (allow slight drift)':
        'Quota enforcement: allow controlled drift (±5–10%) to maintain pace while monitoring balance.',
      'monitor-only (no enforcement)':
        'Quota enforcement: monitor only; do not enforce during field—rebalance via targeted outreach if needed.'
    })[f.quota_strategy];

    const demoGuide = ({
      'none':
        'Demographics: omit identity items entirely unless essential to the decision.',
      'end-only (optional)':
        'Demographics: place at end, optional with “Prefer not to say”; use inclusive, locally appropriate categories.',
      'end-only (optional + self-describe)':
        'Demographics: place at end, optional; include self-describe text fields and multi-select where appropriate.',
      'quota-gated (minimize & justify)':
        'Demographics: include only items that directly drive quotas; justify necessity; keep optional where possible and explain purpose.'
    })[f.demographic_policy];

    const locGuide = ({
      '1–3 languages':
        'Localization: provide parallel copy with shared IDs; verify label parity; plan small pilot per language.',
      '4–10 languages':
        'Localization: use a TMS; freeze English strings; schedule linguistic QA and cognitive checks in high-variance locales.',
      '>10 languages':
        'Localization: prioritize locales by traffic; stagger rollout; maintain a terminology glossary and translation memory.'
    })[f.localization];

    const lenGuide = ({
      '≤5 Qs':'Length: ultra-short; every item must be a gate or routing hook.',
      '6–10 Qs':'Length: short; include 1–2 verification items; avoid matrices.',
      '>10 Qs':'Length: longer flow; justify each item; expect higher abandonment—use only for screening surveys.'
    })[f.length];

    const irGuide = f.incidence_rate
      ? 'IR planning: use a 10% soft launch to validate incidence rate; adjust quotas or gates if IR deviates by >±5 pts.'
      : null;

    return [
      'Draft a participant screener with explicit, testable eligibility and humane operations.',
      f.study && `Study: ${f.study}`,
      f.screening_objectives && `Screening objectives:\n${f.screening_objectives}`,
      f.profile && `Target profile (behavioral):\n${f.profile}`,
      f.audience_persona && `Personas: ${list(f.audience_persona)}`,
      f.study_type && `Study type: ${f.study_type}`,
      studyTypeGuide && `— ${studyTypeGuide}`,
      f.screener_scope && `Screener scope: ${f.screener_scope}`,
      scopeGuide && `— ${scopeGuide}`,
      f.channels && `Recruiting channels:\n${f.channels}`,
      f.disqualify_first && dqGuide,

      f.must && `Must-have criteria:\n${f.must}`,
      f.nice && `Nice-to-have (for quota balance):\n${f.nice}`,
      f.exclude && `Exclude / Disqualify:\n${f.exclude}`,
      f.verification_items && `Behavioral verification items:\n${f.verification_items}`,

      f.device_requirements && `Device / Environment:\n${f.device_requirements}`,
      f.accessibility_needs && `Accessibility eligibility/needs:\n${f.accessibility_needs}`,

      f.localization && `Localization: ${f.localization}`,
      locGuide && `— ${locGuide}`,
      f.demographic_policy && `Demographic module: ${f.demographic_policy}`,
      demoGuide && `— ${demoGuide}`,

      f.quotas && `Quotas:\n${f.quotas}`,
      f.quota_strategy && quotaGuide,
      f.incidence_rate && `Estimated IR: ${f.incidence_rate}`,
      irGuide,
      f.expected_show_rate && `Expected show/completion: ${f.expected_show_rate}`,
      f.length && lenGuide,

      f.pass_fail_style && logicGuide,

      f.terminate_message && `Terminate message (exact copy): ${f.terminate_message}`,
      f.qualified_message && `Qualified message (exact copy): ${f.qualified_message}`,
      f.scheduling && `Scheduling & contact collection:\n${f.scheduling}`,

      f.incentive_type && `Incentive type: ${f.incentive_type}`,
      f.incentive && `Incentive details: ${f.incentive}`,
      f.incentive_delivery && `Incentive delivery: ${f.incentive_delivery}`,

      f.fraud_checks && `Fraud & quality checks:\n${f.fraud_checks}`,
      f.geo_policy && `Geo/IP policy:\n${f.geo_policy}`,

      f.consent && `Consent & privacy notes:\n${f.consent}`,
      f.pii_handling && `PII handling:\n${f.pii_handling}`,

      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,
      f.soft_launch && `Soft launch plan:\n${f.soft_launch}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      [
        'Output format:',
        '- Eligibility summary (must/nice/exclude + rationale)',
        '- Screener instrument (ordered items with explicit pass/fail/route logic)',
        '- Terminate and Qualified messages (exact copy)',
        '- Quotas table (cells, targets, enforcement policy)',
        '- Fraud & Quality checks (rules and thresholds)',
        '- Consent/PII notes and data retention',
        '- Scheduling & Incentives plan',
        '- Soft-launch plan and IR monitoring checkpoints'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Interviews — Plan & Questions — Write (enhanced)
   Purpose: One task that can scope a full interview study,
   draft/refine a complete guide, or help craft a single question.
--------------------------------------------------------- */
{
  id: 'task_interviews_plan',
  slug: 'interviews-plan',
  label: 'Interviews — Plan & Questions — Write',
  kind: 'task',
  categories: ['ux','research','planning'],
  tags: [
    'type:task',
    'topic:interviews',
    'topic:discussion-guide',
    'topic:moderation',
    'topic:ethics',
    'use:plan',
    'use:design',
    'use:write',
    'use:edit',
    'stage:plan'
  ],
  use_cases: [
    'plan moderated 1:1 interviews',
    'align on protocol, schedule, consent, and logistics',
    'establish incentives and risk mitigations',
    'convert research goals into a timed discussion guide',
    'draft specific-open prompts and probing sequences',
    'configure frameworks (BEI, JTBD switch, contextual inquiry, cognitive interviewing)',
    'set up recording/transcription and privacy modes',
    'define observer roles and note-taking workflow',
    'prepare pilot sessions and debrief templates',
    'localize guides and plan accessibility accommodations',
    'adapt for expert/stakeholder/churn interviews',
    'tune guide length to timebox while preserving depth',
    'author a single question or refine a tricky prompt',
    'design group sessions (focus groups) with speaking-order safeguards',
    'plan analysis & coding schema (themes, tags, decision links)',
    'create multilingual guides with culturally appropriate examples'
  ],
  definition: 'Plan user/stakeholder interviews and author/refine the discussion guide: objectives, participant profile, method/framework, sections, prompts, probes, logic, ethics/consent, accessibility, logistics, roles, incentives, and analysis plan. Also supports crafting or rewriting a single high-impact question.',
  help: 'Paste any brief, prior guides, or themes. Pick interview scope, method, and framework so instructions adapt. Use personas and the bias library to shape language. This can plan a full study, produce a complete guide, or help you craft one question.',
  fields: [
    /* Scope & intent */
    { key:'interview_scope', label:'Scope of work', type:'select',
      options:[
        'full study plan + guide (end-to-end)',
        'guide only (discussion guide with timing & probes)',
        'single question (craft/refine one prompt)'
      ],
      desc:'Sets depth and deliverables.',
      ph:'full study plan + guide (end-to-end)'
    },
    { key:'decision', label:'Decision to inform', type:'text',
      ph:'What decision will these interviews help make?',
      desc:'Design backwards from the decision to keep the guide tight.'
    },
    { key:'goals', label:'Research goals', type:'textarea',
      ph:'2–4 goals tied to the decision',
      desc:'Each goal should map to 1–2 guide sections.'
    },
    { key:'constructs', label:'Key constructs', type:'textarea',
      ph:'e.g., triggers, barriers, mental model, value perception',
      desc:'Latent ideas to probe; informs prompts and probes.'
    },

    /* Who & how */
    { key:'profile', label:'Participant profile', type:'textarea',
      ph:'role, experience, tools, region',
      desc:'Who must be represented (include edge cases if relevant).'
    },
    { key:'audience_persona', label:'Audience personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Select one or more personas to align tone and depth.',
      ph:'e.g., Admin Alice (SMB); Security Lead; Procurement Manager'
    },
    { key:'modality', label:'Interview modality', type:'select',
      options:['remote (moderated)','in-person','unmoderated','diary follow-up'],
      desc:'Affects logistics, consent, and observation options.',
      ph:'remote (moderated)'
    },
    { key:'method', label:'Interview method', type:'select',
      options:[
        'semi-structured',
        'structured',
        'unstructured (listening session)',
        'contextual inquiry',
        'behavioral event interview (BEI)',
        'JTBD switch interview',
        'cognitive interview (question testing)',
        'stakeholder/expert',
        'churn/exit'
      ],
      desc:'Select to tailor the guide structure and prompts.',
      ph:'semi-structured'
    },
    { key:'framework', label:'Guide framework', type:'select',
      options:[
        'Funnel (broad→narrow)',
        'Inverted funnel (specific→general)',
        'Critical Incident Technique',
        'JTBD forces & timeline',
        'Means-end laddering (attributes→values)',
        'Think-aloud (usability)'
      ],
      desc:'Shapes the order and style of prompts.',
      ph:'Funnel (broad→narrow)'
    },

    /* Timing & scope */
    { key:'length', label:'Session length', type:'select',
      options:['20–30 min','45–60 min','90 min'],
      desc:'Allocate time to sections; leave ~10% buffer.',
      ph:'45–60 min'
    },
    { key:'participants', label:'# of participants (target)', type:'text',
      ph:'e.g., 8–12 total; 3–5 per segment',
      desc:'Plan enough for pattern-finding while respecting feasibility.'
    },

    /* Guide & questions */
    { key:'sections', label:'Guide sections', type:'textarea',
      ph:'Warm-up & context; Trigger & timeline; Evaluation & decision; First-run; Value & outcomes; Wrap',
      desc:'Outline sections in order; add time budgets per section.'
    },
    { key:'prompts', label:'Core prompts (specific-open)', type:'textarea',
      ph:'“Tell me about the last time you…”, “Walk me through… step by step”',
      desc:'Intent-based prompts; avoid leading wording.'
    },
    { key:'probes', label:'Probe toolkit', type:'textarea',
      ph:'silence; echo; example ask; laddering (“What made that important?”); contrast (“best/worst”); quantify (“how many/long?”)',
      desc:'Reusable probes to deepen answers across sections.'
    },
    { key:'single_question', label:'Single question to craft/refine (optional)', type:'textarea',
      ph:'Paste the tricky question to improve',
      desc:'We’ll rewrite for specificity, neutrality, and clarity.'
    },
    { key:'avoid', label:'Topics/wording to avoid', type:'textarea',
      ph:'leading claims, brand-loaded terms, double-barreled phrasing',
      desc:'Guardrails for neutral interviewing.'
    },

    /* Ethics, privacy, inclusion */
    { key:'privacy_mode', label:'Privacy mode', type:'select',
      options:['anonymous','confidential','identified'],
      desc:'Impacts consent language and storage.',
      ph:'confidential'
    },
    { key:'consent', label:'Consent / Recording policy', type:'textarea',
      ph:'Recording permission text, retention window',
      desc:'Be explicit about purpose, use, retention, and right to withdraw.'
    },
    { key:'accessibility', label:'Accessibility accommodations', type:'textarea',
      ph:'ASL/captions, breaks, screen reader awareness, plain language',
      desc:'Plan accommodations and pace.'
    },
    { key:'localization', label:'Localization scope', type:'select',
      options:['none','1–3 languages','4–10 languages','>10 languages'],
      desc:'Impacts wording, examples, and scheduling.',
      ph:'1–3 languages'
    },

    /* Bias library (exact shape for typeahead) */
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    },

    /* Logistics & ops */
    { key:'roles', label:'Team & roles', type:'textarea',
      ph:'moderator, note-taker, observer(s) and etiquette',
      desc:'Define who does what; include observer rules (no coaching).'
    },
    { key:'tools', label:'Tools', type:'text',
      ph:'e.g., Zoom, Lookback, Calendly, Otter/Dovetail',
      desc:'Video/recording/scheduling/transcription stack.'
    },
    { key:'logistics', label:'Logistics', type:'textarea',
      ph:'scheduling, time zones, backups, stimulus management',
      desc:'Add backups for tech failures; share materials early.'
    },

    /* Incentives & scheduling */
    { key:'incentive_type', label:'Incentive type', type:'select',
      options:['cash','gift card','voucher/credit','charity donation','sweepstakes/raffle','none'],
      desc:'Match effort and norms; avoid coercion.',
      ph:'gift card'
    },
    { key:'incentive', label:'Incentive amount/details', type:'text',
      ph:'e.g., $75 for 60 min',
      desc:'Set expectations up front.'
    },
    { key:'incentive_delivery', label:'Incentive delivery', type:'text',
      ph:'e.g., Tremendous, manual codes, 5–7 days',
      desc:'Method, timing, eligibility.'
    },
    { key:'scheduling', label:'Scheduling flow', type:'textarea',
      ph:'Calendly link, buffer rules, reminders cadence',
      desc:'Respect time zones; provide reschedule policy.'
    },

    /* Pilot, debrief, analysis */
    { key:'pilot', label:'Pilot plan', type:'textarea',
      ph:'# pilot interviews, success criteria, changes log',
      desc:'Dry-run your guide and fix ambiguous prompts.'
    },
    { key:'debrief', label:'Debrief plan', type:'textarea',
      ph:'10-min post-call notes, tags, hypotheses to test next',
      desc:'Immediate capture of insights and uncertainties.'
    },
    { key:'analysis_plan', label:'Analysis & coding plan', type:'textarea',
      ph:'tag schema, affinity mapping plan, decision links',
      desc:'Pre-plan how notes become decisions; reduces bias and drift.'
    },

    /* Constraints */
    { key:'constraints', label:'Constraints', type:'textarea',
      ph:'legal/privacy, brand tone, scheduling limits',
      desc:'Anything that narrows method or wording.'
    }
  ],
  boosters: [
    'Design to the decision; every section earns its time.',
    'Open with rapport, then broad→narrow; timebox deep dives.',
    'Write specific-open prompts anchored in recent, real events.',
    'Probe with silence, echoing, examples, contrast, and laddering.',
    'Avoid leading or double-barreled wording; one construct per question.',
    'Choose method/framework deliberately (BEI for incidents, JTBD for switching, contextual when environment matters).',
    'Script consent and privacy; set expectations about recording and PII.',
    'Plan accessibility and localization up front; avoid idioms and jargon.',
    'Define observer etiquette and note-taking roles before sessions.',
    'Pilot the guide; fix timing and comprehension issues before full run.',
    'Debrief immediately; tag quotes and uncertainties while fresh.',
    'Triangulate interview findings with analytics/surveys before big bets.'
  ],
  template: (f)=>{
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    /* Explainer maps so select choices inject rich, actionable guidance */
    const scopeExplainer = {
      'full study plan + guide (end-to-end)':
        'Scope: Full study — produce protocol, recruiting notes, consent, complete timed guide with probes, logistics, and analysis plan.',
      'guide only (discussion guide with timing & probes)':
        'Scope: Guide only — produce a ready-to-run discussion guide with minute budgets, prompts, probes, and observer notes.',
      'single question (craft/refine one prompt)':
        'Scope: Single-question — rewrite one prompt for specificity, neutrality, and accessibility; include 3 probe variants.'
    };

    const modalityExplainer = {
      'remote (moderated)':
        'Modality note: Remote — plan recording, backup dial-in, screen-share etiquette, observer backchannel, and timezone-friendly slots.',
      'in-person':
        'Modality note: In-person — plan room setup, consent printouts, stimulus access, travel time, and privacy for sensitive topics.',
      'unmoderated':
        'Modality note: Unmoderated — script tasks and prompts precisely; require on-screen instructions and robust consent screens.',
      'diary follow-up':
        'Modality note: Diary — define cadence, prompts, media uploads, and check-ins; plan incentive split for sustained participation.'
    };

    const methodExplainer = {
      'semi-structured':
        'Method note: Semi-structured — fixed sections with flexible probes; optimize for comparability + depth.',
      'structured':
        'Method note: Structured — fixed questions/order for comparability; limit ad-hoc probes.',
      'unstructured (listening session)':
        'Method note: Unstructured — exploratory rapport-first conversation; keep a light scaffold to avoid drift.',
      'contextual inquiry':
        'Method note: Contextual inquiry — observe real tasks in-situ; use a master–apprentice stance and capture artifacts.',
      'behavioral event interview (BEI)':
        'Method note: BEI — focus on a real incident; reconstruct Situation → Task → Action → Result (STAR) with evidence.',
      'JTBD switch interview':
        'Method note: JTBD — map the switching timeline: triggers, pushes, pulls, anxieties, and habit forces leading to the decision.',
      'cognitive interview (question testing)':
        'Method note: Cognitive interview — test items via comprehension, retrieval, judgment, and response probes; think-aloud protocol.',
      'stakeholder/expert':
        'Method note: Stakeholder/expert — elicit constraints, success metrics, and hidden assumptions; guard against solutioneering.',
      'churn/exit':
        'Method note: Exit — trauma-informed approach; reconstruct precipitating events, alternatives considered, and thresholds.'
    };

    const frameworkExplainer = {
      'Funnel (broad→narrow)':
        'Framework: Funnel — start with context stories, then narrow to decisions, criteria, and exceptions.',
      'Inverted funnel (specific→general)':
        'Framework: Inverted — begin with a concrete case, then generalize patterns and values.',
      'Critical Incident Technique':
        'Framework: CIT — collect extreme success/failure incidents to extract conditions, behaviors, and outcomes.',
      'JTBD forces & timeline':
        'Framework: JTBD — chart progress sought, competing alternatives, forces, and the moment of commitment.',
      'Means-end laddering (attributes→values)':
        'Framework: Laddering — probe attribute → consequence → personal value links using “What made that important?”',
      'Think-aloud (usability)':
        'Framework: Think-aloud — avoid intervening during tasks; debrief after each task with targeted probes.'
    };

    const lengthExplainer = {
      '20–30 min':'Timing: Short session — prioritize 2–3 modules; limit probes per topic.',
      '45–60 min':'Timing: Standard session — 3–5 modules with depth; reserve ~6–8 min for wrap.',
      '90 min':'Timing: Extended session — advanced or in-situ workflows; plan break and vigilance for fatigue.'
    };

    const privacyExplainer = {
      'anonymous':'Privacy: Anonymous — avoid collecting PII; aggregate quotes; no recontact.',
      'confidential':'Privacy: Confidential — separate PII from notes; limited team access; recontact allowed with consent.',
      'identified':'Privacy: Identified — explicit consent for named quotes or internal sharing; strict storage controls.'
    };

    /* Compose instruction lines from selected options */
    const explainers = [];
    if (scopeExplainer[f.interview_scope]) explainers.push(scopeExplainer[f.interview_scope]);
    if (modalityExplainer[f.modality]) explainers.push(modalityExplainer[f.modality]);
    if (methodExplainer[f.method]) explainers.push(methodExplainer[f.method]);
    if (frameworkExplainer[f.framework]) explainers.push(frameworkExplainer[f.framework]);
    if (lengthExplainer[f.length]) explainers.push(lengthExplainer[f.length]);
    if (privacyExplainer[f.privacy_mode]) explainers.push(privacyExplainer[f.privacy_mode]);

    return [
      'Create an interview plan and draft/refine the discussion guide.',
      f.interview_scope && explainers[0] ? explainers[0] : (scopeExplainer['full study plan + guide (end-to-end)']),
      explainers.slice(1).join('\n'),

      f.decision && `Decision to inform:\n${f.decision}`,
      f.goals && `Goals:\n${f.goals}`,
      f.constructs && `Key constructs:\n${f.constructs}`,

      f.profile && `Participant profile:\n${f.profile}`,
      f.audience_persona && `Personas: ${list(f.audience_persona)}`,

      f.modality && `Modality: ${f.modality}`,
      f.method && `Method: ${f.method}`,
      f.framework && `Framework: ${f.framework}`,

      f.length && `Session length: ${f.length}`,
      f.participants && `Target participants: ${f.participants}`,

      f.sections && `Guide sections:\n${f.sections}`,
      f.prompts && `Core prompts:\n${f.prompts}`,
      f.probes && `Probe toolkit:\n${f.probes}`,
      f.single_question && `Single question to craft/refine:\n${f.single_question}`,
      f.avoid && `Topics/wording to avoid:\n${f.avoid}`,

      f.privacy_mode && `Privacy mode: ${f.privacy_mode}`,
      f.consent && `Consent / Recording:\n${f.consent}`,
      f.accessibility && `Accessibility:\n${f.accessibility}`,
      f.localization && `Localization: ${f.localization}`,
      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,

      f.roles && `Team & roles:\n${f.roles}`,
      f.tools && `Tools: ${f.tools}`,
      f.logistics && `Logistics:\n${f.logistics}`,

      f.incentive_type && `Incentive type: ${f.incentive_type}`,
      f.incentive && `Incentive: ${f.incentive}`,
      f.incentive_delivery && `Incentive delivery: ${f.incentive_delivery}`,
      f.scheduling && `Scheduling:\n${f.scheduling}`,

      f.pilot && `Pilot plan:\n${f.pilot}`,
      f.debrief && `Debrief plan:\n${f.debrief}`,
      f.analysis_plan && `Analysis & coding plan:\n${f.analysis_plan}`,

      f.constraints && `Constraints:\n${f.constraints}`,

      [
        'Output format:',
        '- Overview (scope, decision, goals, constructs, participants)',
        '- Method & Framework notes (tailored guidance from selections)',
        '- Session Plan (sections + timing budget; moderator & observer notes)',
        '- Discussion Guide (prompts + probes; specific-open wording)',
        '- Single Question rewrite (if provided, with 3 probe variants)',
        '- Consent & Privacy (recording text, retention; privacy mode practices)',
        '- Accessibility & Localization notes',
        '- Team & Logistics (tools, roles, observer etiquette)',
        '- Incentives & Scheduling',
        '- Pilot & Debrief plans',
        '- Analysis & Coding plan (tags, synthesis approach, decision links)'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Transcripts — Analyze (supercharged, scope-aware)
   Notes:
   - Adds source/type, purpose, org, speaker metadata, anonymization,
     unique terms, upload toggles, richer methods, severity/priority models,
     expanded deliverables with guidance, new export formats, and LLM assist modes.
   - Removes the "quote rights" dropdown per request (use redaction policy instead).
--------------------------------------------------------- */

  {
  id: 'task_transcripts_analyze',
  slug: 'transcripts-analyze',
  label: 'Transcripts - Analyze',
  kind: 'task',
  categories: ['ux','research','analysis'],
  tags: [
    'type:task','topic:analysis','topic:transcripts','topic:codebook',
    'topic:sentiment','topic:journey-mapping','topic:prioritization',
    'use:synthesize','use:prioritize','use:edit','stage:analyze'
  ],
  use_cases: [
    'code interview and usability transcripts into themes',
    'identify patterns, contradictions, and outliers',
    'extract verbatim quotes and evidence',
    'score pain points by severity, frequency, and impact',
    'analyze sentiment and emotion (valence, arousal, discrete labels)',
    'map themes to journeys (stages, triggers, moments of truth)',
    'compare cohorts (personas, roles, regions) and find divergences',
    'run co-occurrence and tension analysis',
    'produce insight cards and an executive readout',
    'deliver a full report with visuals and decision-linked recommendations',
    'build a reusable codebook with tagged exports for auditability',
    'shrink a noisy corpus to a crisp executive summary',
    'triangulate with surveys, tickets, and analytics to strengthen confidence',
    'track saturation and reliability (kappa/alpha) across coders and waves',
    'create quote banks and rights-safe excerpts for storytelling'
  ],
  definition: 'Analyze a corpus end to end: set source and purpose, define scope, choose method and codebook policy, tag sentiment and emotion, surface themes and tensions, curate quotes, and deliver evidence-backed insights with priorities, visuals, and exports.',
  help: 'Paste links or text, or indicate you will upload files. Pick the source and purpose, describe speakers and privacy/redaction, add domain terms, choose methods and priority models, then select deliverables and exports. Every field includes short helper text.',
  fields: [
    /* Source and purpose */
    { key:'source_type', label:'Where is the corpus from?', type:'select',
      options:[
        'none',
        'usability test - moderated',
        'usability test - unmoderated',
        'interview - 1:1',
        'focus group',
        'call center or support',
        'sales or discovery call',
        'research self-audit',
        'research diary or think-aloud (rubberducky)',
        'workshop or session',
        'open-ended survey responses',
        'public hearing',
        'netnography: discussions, messages, or forums',
        'netnography: social posts with comment threads',
        'user feedback forum or community',
        'internal meeting or standup',
        'other (specify below)'
      ],
      desc:'Choose the main source. Corpus can be transcripts, forum text, or other written records.'
    },
    { key:'source_other', label:'Other or additional source context (optional)', type:'text',
      ph:'e.g., exec roundtable; mixed English/Spanish; Zoom VTT',
      desc:'Describe anything about the source you want the AI to know.' },

    { key:'source_reason', label:'Main reason for analysis', type:'select',
      options:[
        'none',
        'diagnose friction and pain points',
        'define the problem',
        'discover opportunities and solution directions',
        'prioritize backlog',
        'inform roadmap and OKRs',
        'evaluate a feature or release',
        'craft messaging and positioning',
        'measure change vs baseline',
        'curate quotes for storytelling',
        'compliance or legal audit',
        'training and enablement',
        'train support or sales',
        'other (specify below)'
      ],
      desc:'Why this analysis matters. Guides tone, depth, and outputs.' },

    { key:'org', label:'Organization or client (optional)', type:'text',
      ph:'Company or team the work is for',
      desc:'Add the audience or sponsor so outputs speak to them.' },

    /* Research questions and audience (moved up) */
    { key:'questions', label:'Research questions', type:'textarea',
      ph:'Which decisions should this analysis inform?',
      desc:'List the questions or decisions that matter. Use bullets if helpful.' },

    { key:'audience_persona', label:'Audience personas or segments (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      ph:'e.g., Admin Alice; New user; Enterprise buyer',
      desc:'Tag personas or segments to unlock subgroup comparisons.' },

    { key:'segments', label:'Cohorts to compare (optional)', type:'textarea',
      ph:'role, plan tier, region, tenure, device, language',
      desc:'Comma or line separated. Used for splits, not for access control.' },

    /* Scope and inputs */
    { key:'analysis_scope', label:'Scope of analysis', type:'select',
      options:[
        'none',
        'full corpus',
        'subset by time or segment',
        'single transcript',
        'top highlights only',
        'quotes only for storytelling',
        'qualitative analysis',
        'quantitative analysis',
        'rapid scan (timeboxed)',
        'comparative groups (A/B)',
        'multi-session comparison',
        'longitudinal (waves)',
        'delta analysis (before vs after)',
        'exhaustive deep dive',
        'incident deep dive',
        'other (specify below)'
      ],
      desc:'Depth and breadth. Comparison and longitudinal scopes add consistency checks.' },

    { key:'time_window', label:'Time window (optional)', type:'text',
      ph:'2025-01-01 to 2025-02-15, or "last 30 days"',
      desc:'Limit to a date range if needed for deltas or waves.' },

    { key:'corpus', label:'Corpus source', type:'textarea',
      ph:'Paste text or link a folder/drive. Note formats (DOCX, TXT, VTT, JSON).',
      desc:'Briefly describe what is in scope. If the corpus spans multiple sources, list them.' },

    { key:'uploading', label:'Are you uploading files?', type:'select',
      options:['no','yes'],
      desc:'Choose yes if you will attach files in this chat. The AI will read them.' },

    { key:'upload_context', label:'Upload file description (optional)', type:'textarea',
      ph:'What is in the attachments? Any must-read sections or filenames?',
      desc:'Describe the attachments. You are not uploading here, only describing.' },

    /* Speaker metadata and privacy */
    { key:'speaker_count', label:'Number of speakers', type:'text',
      ph:'e.g., 2',
      desc:'Total distinct voices in a given session.' },

    { key:'user_count', label:'Number of users or customers', type:'text',
      ph:'e.g., 1',
      desc:'How many participants are end users or customers.' },

    { key:'diarization', label:'Diarization provided?', type:'select',
      options:['yes','no','unknown'],
      desc:'Diarization is who spoke when, with speaker turns labeled.' },

    { key:'speaker_names', label:'Speaker names or IDs (optional)', type:'textarea',
      ph:'One per line (Moderator; P1; P2). Prefer IDs if privacy is required.',
      desc:'Provide known labels to improve quote attribution.' },

    { key:'name_redaction_policy', label:'Name and role redaction', type:'select',
      options:[
        'redact completely',
        'code as IDs (P1/P2/Mod)',
        'pseudonyms (consistent per speaker)',
        'roles only (no names)',
        'keep names as provided',
        'does not apply here',
        'other (specify below)'
      ],
      desc:'How names should appear in quotes and exhibits.' },

    { key:'redact_terms', label:'Terms to redact (optional)', type:'textarea',
      ph:'Specific names, places, account IDs, internal codenames',
      desc:'List any terms that are not obvious PII but must be removed or masked.' },

    { key:'privacy_notes', label:'Other privacy and anonymity notes (optional)', type:'textarea',
      ph:'Consent notes, timestamp policy, storage limits',
      desc:'Anything else the AI should honor about privacy or consent.' },

    /* Vocabulary and language */
    { key:'language', label:'Primary language and dialect', type:'text',
      ph:'e.g., en-US, en-GB, es-MX',
      desc:'Set detection and examples to the correct variant.' },

    { key:'domain_dictionary', label:'Domain dictionary and special terms', type:'textarea',
      ph:'Brand names, acronyms, product codenames, jargon, homophones',
      desc:'Improves tagging accuracy and avoids mis-hears or mistranslations.' },

    { key:'transcript_quality', label:'Quality flags and likely mis-hears (optional)', type:'textarea',
      ph:'[inaudible] tags; overlapping speech; machine-transcribed; language mix; ASR often hears X as Y',
      desc:'Call out issues that affect coding. Add common mis-hear pairs like login vs log-in.' },

    /* Approach and method */
    { key:'coding_approach', label:'Coding approach', type:'select',
      options:['none','inductive (bottom-up)','deductive (top-down)','abductive (mixed)','other (specify below)'],
      desc:'Inductive means emergent codes. Deductive means seeded codes. Abductive blends both.' },

    { key:'method', label:'Primary method', type:'select',
      options:[
        'none',
        'thematic analysis',
        'affinity mapping',
        'grounded theory (open to axial)',
        'content analysis (counts)',
        'journey mapping (stage x theme)',
        'matrix coding (co-occurrence)',
        'JTBD timeline mapping',
        'rapid thematic synthesis',
        'other (specify below)'
      ],
      desc:'We tailor instructions to the selected lens.' },

    { key:'unit_of_analysis', label:'Unit of analysis', type:'select',
      options:['none','excerpt (span)','utterance','turn','episode (story)','session','other (specify below)'],
      desc:'The atomic item you will tag and count.' },

    /* Codebook and rules */
    { key:'codebook_seed', label:'Seed codebook (optional)', type:'textarea',
      ph:'One per line: Code - short definition',
      desc:'Provide a starting set. The AI can expand or refine it.' },

    { key:'inclusion_rules', label:'Inclusion and exclusion rules', type:'textarea',
      ph:'Define boundaries for tricky codes, with short examples',
      desc:'Rules reduce overlap and improve reliability.' },

    { key:'code_styles', label:'Code styles to use', type:'textarea',
      ph:'structural, descriptive, in-vivo, process (gerunds), emotion, causation',
      desc:'Name any preferred styles so the AI mirrors your approach.' },

    { key:'codebook_policy', label:'Codebook policy', type:'select',
      options:[
        'none',
        'generate a codebook',
        'lock after pilot (v1.0)',
        'evolving with change log',
        'strict (no additions)',
        'fork by cohort then reconcile',
        'other (specify below)'
      ],
      desc:'Stability vs discovery, and how changes are managed.' },

    /* Sentiment and emotion */
    { key:'sentiment_model', label:'Sentiment lens', type:'select',
      options:[
        'none',
        'valence (positive to negative)',
        'valence + arousal',
        'valence + arousal + dominance (VAD or PAD)',
        'aspect-based sentiment (targeted)',
        'stance (pro, neutral, anti, uncertain)',
        'subjectivity (objective to subjective)',
        'emotion intensity (0 to 1)',
        'discrete emotions (set below)',
        'Plutchik (8 emotions)',
        'Ekman (basic emotions)',
        'OCC appraisal families',
        'moral sentiment (foundations)',
        'toxicity or politeness',
        'hedging and certainty',
        'sarcasm or irony flag',
        'power or agency connotation',
        'directed sentiment (speaker to target)',
        'sentiment dynamics (shift over time)',
        'lexicon-based (VADER, NRC, AFINN)',
        'LIWC affect categories',
        'transformer classifier (domain tuned)',
        'multi-label emotions (27+ set)',
        'other (specify below)'
      ],
      desc:'Pick one lens. Add labels below if using discrete emotions.' },

    { key:'emotion_labels', label:'Discrete emotion set (optional)', type:'textarea',
      ph:'frustration, anxiety, relief, excitement, delight',
      desc:'Comma or line separated labels to detect.' },

    { key:'sentiment_modifiers', label:'Modifier tags', type:'multiselect',
      options:['intensity','sarcasm','toxicity','hedging','politeness','none','other (specify below)'],
      desc:'Extra pragmatic signals to detect and annotate per excerpt.' },

    { key:'sentiment_units', label:'Sentiment score scale', type:'select',
      options:['none','-1..+1','0..1','0..100','other (specify below)'],
      desc:'Numeric range for any sentiment or emotion scores.' },

    /* Pain scoring and prioritization */
    { key:'severity_scale', label:'Severity scale', type:'select',
      options:[
        'none',
        'Nielsen 0..4 (cosmetic to catastrophe)',
        'Heuristic 1..5 (pass to catastrophe)',
        'High, Medium, Low',
        'Task criticality 1..4',
        'Time or effort penalty 0..4',
        'Frequency x Impact grid',
        'Accessibility impact 0..4 (WCAG)',
        'Ethical or harm severity 0..4',
        'Sentiment intensity -3..+3',
        'Likelihood x Impact (risk matrix)',
        'Likert 1..5 (very low to very high)',
        'Mean Opinion Score 1..5',
        'Qualitative risk matrix 1..5 x 1..5',
        'Bug or incident severities (S1..S5 or P0..P4)',
        'Ops SEV1..SEV4',
        '1..10 (anchored)',
        'FMEA RPN (1..10 factors)',
        'CVSS 0.0..10.0',
        'Numeric Rating Scale 0..10',
        'Borg CR10 0..10',
        'DREAD (0..10 per factor)',
        'Letter grades A..F',
        'other (specify below)'
      ],
      desc:'Pick a scale and anchor it so ratings stay consistent.' },

    { key:'severity_anchors', label:'Severity anchors (if 1..10 or custom)', type:'textarea',
      ph:'1 - cosmetic; 5 - moderate; 8 - severe; 10 - total blocker',
      desc:'One per line: level - label. Add brief examples if helpful.' },

    { key:'impact_domains', label:'Impact domains', type:'textarea',
      ph:'conversion, retention, trust, cost to serve, risk',
      desc:'Name the outcomes your team cares about, to focus prioritization.' },

    { key:'priority_model', label:'Priority model', type:'select',
      options:[
        'none',
        'Severity x Frequency x Impact',
        'ICE (Impact, Confidence, Ease)',
        'RICE-like (Reach, Impact, Confidence, Effort)',
        'WSJF (Cost of Delay / Job Size)',
        'Opportunity scoring (Importance x Satisfaction)',
        'MoSCoW (Must, Should, Could, Won’t)',
        'Kano-informed (Basic, Performance, Delighter)',
        'FMEA RPN (Severity x Occurrence x Detectability)',
        'Risk Exposure (Probability x Impact)',
        'CVSS-style bins 0..10',
        'PIE (Potential, Importance, Ease)',
        'PXL (weighted CRO checklist)',
        'ROI (Value / Cost)',
        'Cost of Delay (absolute)',
        'Expected Value of Learning (EVoL)',
        'Ethical Risk HARM (Harm x Affected users x Reversibility x Mitigation readiness)',
        'Accessibility Priority (Task impact x Affected users x WCAG risk)',
        'Eisenhower (Urgency x Importance)',
        'QFD or House of Quality (weighted requirements)',
        'North Star vs MVP impact score',
        'Value x Effort grid',
        'other (specify below)'
      ],
      desc:'How to rank problems or opportunities. You can switch later.' },

    { key:'theme_threshold', label:'Theme evidence threshold', type:'text',
      ph:'mention in >= 5 interviews or >= 15 excerpts',
      desc:'Minimum evidence required to call something a theme.' },

    /* Reliability and quality */
    { key:'reliability_metric', label:'Reliability plan', type:'select',
      options:['none','consensus only','Cohen’s kappa (subset)','Krippendorff’s alpha (subset)','other (specify below)'],
      desc:'How agreement will be checked if multiple coders are involved.' },

    { key:'double_code_pct', label:'Double-code percent (optional)', type:'text',
      ph:'e.g., 20%',
      desc:'Portion of the corpus that two coders will code to check agreement.' },

    { key:'saturation_check', label:'Saturation tracking', type:'select',
      options:['yes (plot new codes per interview)','no','unsure'],
      desc:'Tracks whether new codes are still emerging over time.' },

    /* Journey context */
    { key:'journey_stages', label:'Journey stages (optional)', type:'textarea',
      ph:'Onboard -> First value -> Routines -> Renewal',
      desc:'Paste your map or stage names so outputs can pivot by stage.' },

    /* Quotes and ethics */
    { key:'quotes', label:'Include verbatim quotes?', type:'select',
      options:['yes','no','unsure'],
      desc:'If yes, the AI will select and redact per your policy.' },

    { key:'quote_length', label:'Quote length policy', type:'select',
      options:['<= 25 words (slide ready)','<= 40 words','no limit'],
      desc:'Shorter quotes fit slides. Longer quotes carry more nuance.' },

    { key:'quote_criteria', label:'Quote selection criteria', type:'textarea',
      ph:'Concrete, decision-linked, self-contained, memorable',
      desc:'How to pick quotes. Add any domain-specific rules.' },

    /* Outputs, visuals, tools */
    { key:'deliverable', label:'Primary deliverable', type:'select',
      options:[
        'none',
        'themes + evidence - named themes with definitions and exemplar quotes',
        'insight cards - card per insight with so-what and owner',
        'journey tensions - stage x theme conflicts and moments of truth',
        'executive summary - top 5 findings with clear decisions',
        'full analysis report - comprehensive analysis with appendices',
        'full narrative report - long-form story with evidence and tradeoffs',
        'research readout deck - slide-ready storyline',
        'stakeholder one-pager - narrative brief for decision-makers',
        'stakeholder presentation deck - bullet-point briefing',
        'spoken presentation script - concise presenter script with cues',
        '30-second impact RAP - Readout, Action, Proof',
        'backlog tickets (issue-ready) - use provided template',
        'persona updates - attributes, needs, quotes',
        'journey blueprint - stages, steps, pain and delight',
        'assumptions and follow-up questions - open questions and next probes',
        'brainstorm and transcript discussion - workshop prompts',
        'quote bank + codebook export - searchable quotes and final codes',
        'tagged CSV or JSON (for audit) - machine-usable export',
        'problem statement and decision memo - framing with recommendation',
        'PR/FAQ - press release style summary and FAQs',
        'experiment plan (A/B) - hypotheses, metrics, variants, risks',
        'training and enablement guide - role-based scenarios and FAQs',
        'support macros and FAQ updates - suggested help center copy',
        'service blueprint - frontstage and backstage with interactions',
        'executive Q&A - anticipated questions with evidence',
        'implementation recommendations - ranked fixes with effort and impact',
        'other (specify below)'
      ],
      desc:'Pick the main packaging for your audience.' },

    { key:'visuals', label:'Visuals', type:'select',
      options:[
        'none',
        'theme map - clusters with exemplar quotes',
        'frequency bar - theme counts',
        'stacked bar - codes by stage or persona',
        'heatmap - stage x theme intensity',
        'co-occurrence matrix - code x code',
        'sentiment timeline - valence or arousal over time',
        'saturation curve - new codes by interview',
        'pareto chart - frequency with cumulative percent',
        'box or violin - distribution of severity or time',
        'scatter or bubble - impact x effort (reach = size)',
        'radar - multi-criteria theme profile',
        'timeline - events or interviews',
        'sankey or alluvial - flow across stages',
        'treemap - hierarchy share',
        'upset plot - set overlaps',
        'adjacency matrix - co-occurrence grid',
        'word bars - top n-grams',
        'confidence x evidence 2x2',
        'funnel - drop-offs by step',
        'theme network - force-directed graph',
        'chord diagram - inter-theme connections',
        'ASCII heatmap or bars (text)',
        'Mermaid text (flow or journey)',
        'DOT or Graphviz text (network or hierarchy)',
        'storyboard - text panels with quotes',
        'other (specify below)'
      ],
      desc:'Pick one for now. You can add more later.' },

    { key:'export_format', label:'Export format', type:'select',
      options:[
        'none',
        'CSV',
        'Airtable-ready CSV',
        'Excel-ready CSV',
        'XLSX export',
        'JSON',
        'NDJSON',
        'Parquet',
        'Feather (Apache Arrow)',
        'SQLite (.db)',
        'GraphML',
        'GEXF (Gephi)',
        'Codebook CSV',
        'REFI-QDA codebook XML (export)',
        'NVivo or ATLAS.ti codebook CSV (export)',
        'Markdown report (md)',
        'HTML report (print ready)',
        'LaTeX (tex) export',
        'written report (doc or pdf outline, paste ready)',
        'stakeholder brief (one pager, paste ready)',
        'spoken presentation notes or teleprompter',
        'slide deck outline (pptx paste ready)',
        'Google Slides outline (paste ready)',
        'PPTX content (paste ready)',
        'Jupyter Notebook (ipynb) export',
        'R script (ggplot2/dplyr) - paste ready',
        'RMarkdown (Rmd) - paste ready',
        'SQL seed (CREATE TABLE + INSERT) - paste ready',
        'Julia script - paste ready',
        'MATLAB script - paste ready',
        'SAS program - paste ready',
        'SPSS syntax - paste ready',
        'Vega-Lite spec (JSON) - paste ready',
        'Looker Studio ready CSV (schema notes)',
        'other (specify below)'
      ],
      desc:'Choose data or communication outputs.' },

    { key:'tools', label:'Tools', type:'text',
      ph:'Dovetail, Airtable, Miro, NVivo',
      desc:'Helps tailor exports and naming.' },

    /* AI assist */
    { key:'ai_assist', label:'AI assist level', type:'select',
      options:[
        'none (manual only)',
        'suggest codes (review required)',
        'auto-tag then human review',
        'summarize themes only',
        'all of the above (combo)',
        'explain every step (transparent)',
        'discussion (back and forth)',
        'full analysis and final report (comprehensive)',
        'other (specify below)'
      ],
      desc:'Sets model involvement and expectations for human QA.' },

    /* Bias and ethics library */
    { key:'risks_picks', label:'Biases (from library)', type:'repeater',
      itemType:'typeahead', unit:'bias', dataset:'bias', autofill:'bias->inline',
      ph:'Accessibility; Fear appeals; Cultural sensitivity',
      desc:'Inline reminders to avoid stereotypes, exclusion, or fear-mongering.' },

    /* Constraints */
    { key:'constraints', label:'Constraints', type:'textarea',
      ph:'privacy, confidentiality, timeline, team availability',
      desc:'Hard limits the AI must respect.' }
  ],

  boosters: [
    'Open coding first, then converge and lock the codebook.',
    'Write include and exclude rules with examples for ambiguous codes and keep a change log.',
    'Tag sentiment and emotion with context like stage or task to avoid false positives.',
    'Prioritize by severity x frequency x impact and temper with confidence and evidence thresholds.',
    'Call out contradictions explicitly and note conditions like role, time, or environment.',
    'Curate quotes that are concrete, decision-linked, and self-contained.',
    'Use co-occurrence to reveal compound problems like billing + mobile + confusion.',
    'Double-code 10 to 20 percent early for kappa or alpha, adjudicate, then freeze v1.0.',
    'Close with insight cards tied to owners, effort, and measurable outcomes.',
    'Document limitations, evidence thresholds, confidence, and privacy choices.'
  ],

  template: (f) => {
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    // Source and purpose notes
    const srcMap = {
      'usability test - moderated': 'Source: moderated usability. Expect tasks, think-aloud, and a hint policy.',
      'usability test - unmoderated': 'Source: unmoderated usability. Task oriented, less probing. Rely on behavior.',
      'interview - 1:1': 'Source: interview. Narrative data. Probe mental models and workflows.',
      'focus group': 'Source: focus group. Watch for consensus effects. Attribute quotes carefully.',
      'call center or support': 'Source: support calls. High-signal pains. Tag by issue type and resolution.',
      'sales or discovery call': 'Source: sales or discovery. Outcome oriented. Separate objections from curiosity.',
      'research self-audit': 'Source: self-audit. Meta-reflection. Expect bias. Triangulate with artifacts.',
      'research diary or think-aloud (rubberducky)': 'Source: research diary or think-aloud. Reflective log with spontaneous narration. Expect fragmented entries and meta-cognition cues.',
      'workshop or session': 'Source: workshop or session. Co-created data with multiple voices. Track facilitators vs participants.',
      'open-ended survey responses': 'Source: open-ended survey responses. Written, self-paced answers. Often terse.',
      'public hearing': 'Source: public hearing. Formal statements and public comment. Note stakeholders and dissent.',
      'netnography: discussions, messages, or forums': 'Source: netnography of discussions or forums. Conversational and peer to peer. Expect slang and anonymity.',
      'netnography: social posts with comment threads': 'Source: social posts with threads. Short-form content and reactions. High volume and noise.',
      'user feedback forum or community': 'Source: community feedback. Noisy but rich. De-duplicate and tag sentiment.',
      'internal meeting or standup': 'Source: internal meeting. Capture decisions, risks, and follow-ups.',
      'other (specify below)': 'Source: other. Use the additional context.'
    };

    const whyMap = {
      'diagnose friction and pain points': 'Purpose: diagnose friction. Emphasize severity, frequency, and recovery.',
      'define the problem': 'Purpose: define the problem. Surface root causes and concrete failure modes.',
      'discover opportunities and solution directions': 'Purpose: discover opportunities. Find unmet needs and solution directions.',
      'prioritize backlog': 'Purpose: prioritize backlog. Identify high impact, high confidence items.',
      'inform roadmap and OKRs': 'Purpose: inform roadmap. Map themes to objectives and targets.',
      'evaluate a feature or release': 'Purpose: evaluate a release. Measure reception, regressions, and rollout issues.',
      'craft messaging and positioning': 'Purpose: craft messaging. Extract user language and proof points.',
      'measure change vs baseline': 'Purpose: compare vs baseline. Align codes to prior taxonomy and report deltas.',
      'curate quotes for storytelling': 'Purpose: quotes. Prioritize self-contained, high-impact excerpts.',
      'compliance or legal audit': 'Purpose: compliance. Tag PII, consent, and risk surfaces.',
      'training and enablement': 'Purpose: training. Produce scenario-based examples and FAQs.',
      'train support or sales': 'Purpose: train support or sales. Create scenarios, objections, and responses.',
      'other (specify below)': 'Purpose: other. Use the additional context.'
    };

    const srcLine = (f.source_type && f.source_type !== 'none') ? srcMap[f.source_type] : null;
    const whyLine = (f.source_reason && f.source_reason !== 'none') ? whyMap[f.source_reason] : null;
    const extraSrc = f.source_other ? `Extra source context: ${f.source_other}` : null;

    // Scope note
    const scopeNote = (() => {
      switch (f.analysis_scope) {
        case 'full corpus': return 'Scope: full corpus with comprehensive pass and full deliverables.';
        case 'subset by time or segment': return 'Scope: subset by specified slices. Report limits vs full population.';
        case 'single transcript': return 'Scope: single transcript. Deep pass with quotes and micro-themes. Caution on generalization.';
        case 'top highlights only': return 'Scope: highlights. Skim for top pains or delights with 3 to 5 quotes.';
        case 'quotes only for storytelling': return 'Scope: quotes only. Extract decision-linked, self-contained quotes with IDs and timestamps.';
        case 'qualitative analysis': return 'Scope: qualitative focus. Meaning and context over counts, with exemplar quotes.';
        case 'quantitative analysis': return 'Scope: quantitative focus. Counts, distributions, sentiment aggregates, and comparisons.';
        case 'rapid scan (timeboxed)': return 'Scope: rapid scan. Lightweight pass and 5 to 7 takeaways with confidence notes.';
        case 'comparative groups (A/B)': return 'Scope: comparative groups. Align codes and report divergences and effect sizes.';
        case 'multi-session comparison': return 'Scope: multi-session comparison. Align codes across sessions.';
        case 'longitudinal (waves)': return 'Scope: longitudinal. Track theme trajectories across waves and saturation.';
        case 'delta analysis (before vs after)': return 'Scope: delta analysis. Compare pre vs post to surface changes in sentiment and theme frequency.';
        case 'exhaustive deep dive': return 'Scope: exhaustive deep dive. Full coding with reliability and saturation tracking.';
        case 'incident deep dive': return 'Scope: incident deep dive. Focus on root causes, recovery, and prevention.';
        case 'other (specify below)': return 'Scope: other. Use the additional context.';
        default: return null;
      }
    })();

    // Approach and method notes
    const approachNote = (() => {
      switch (f.coding_approach) {
        case 'inductive (bottom-up)': return 'Approach: inductive. Begin with open coding and let codes emerge, then cluster into themes.';
        case 'deductive (top-down)': return 'Approach: deductive. Start from the seed codebook and add sparingly with a change log.';
        case 'abductive (mixed)': return 'Approach: abductive. Blend seed codes with emergent ones and track changes.';
        default: return null;
      }
    })();

    const methodNote = (() => {
      switch (f.method) {
        case 'thematic analysis': return 'Method: thematic analysis. Code, cluster, and name themes with boundaries and exemplars.';
        case 'affinity mapping': return 'Method: affinity mapping. Group excerpts spatially and iterate labels until stable.';
        case 'grounded theory (open to axial)': return 'Method: grounded theory. Open coding to axial links across conditions and consequences.';
        case 'content analysis (counts)': return 'Method: content analysis. Categorize consistently and report distributions with caveats.';
        case 'journey mapping (stage x theme)': return 'Method: journey mapping. Index by stage and produce stage x theme heatmaps.';
        case 'matrix coding (co-occurrence)': return 'Method: matrix coding. Examine frequent pairs of codes for compound issues.';
        case 'JTBD timeline mapping': return 'Method: JTBD timeline. Reconstruct triggers, pushes and pulls, anxieties, and habits.';
        case 'rapid thematic synthesis': return 'Method: rapid synthesis. Fast clustering with confidence flags.';
        default: return null;
      }
    })();

    // Sentiment notes
    const sentimentNote = (() => {
      switch (f.sentiment_model) {
        case 'valence (positive to negative)': return 'Sentiment: valence only. Label each excerpt positive, negative, or neutral.';
        case 'valence + arousal': return 'Sentiment: valence plus arousal. Capture tone and intensity.';
        case 'valence + arousal + dominance (VAD or PAD)': return 'Sentiment: VAD or PAD. Add a control or dominance axis.';
        case 'aspect-based sentiment (targeted)': return 'Sentiment: aspect-based. Identify targets and assign sentiment per target.';
        case 'stance (pro, neutral, anti, uncertain)': return 'Sentiment: stance. Classify position toward a proposition or entity.';
        case 'subjectivity (objective to subjective)': return 'Sentiment: subjectivity. Score objective to subjective tone.';
        case 'emotion intensity (0 to 1)': return 'Sentiment: intensity. Regress a 0 to 1 strength score.';
        case 'discrete emotions (set below)': return `Sentiment: discrete emotions. Use the provided labels ${f.emotion_labels ? '(' + f.emotion_labels + ')' : ''}.`;
        case 'Plutchik (8 emotions)': return 'Sentiment: Plutchik. Classify into 8 emotions.';
        case 'Ekman (basic emotions)': return 'Sentiment: Ekman. Classify into basic emotions.';
        case 'OCC appraisal families': return 'Sentiment: OCC appraisal. Tie emotions to appraisals of events and agents.';
        case 'moral sentiment (foundations)': return 'Sentiment: moral foundations. Tag frames like care, fairness, and authority.';
        case 'toxicity or politeness': return 'Sentiment: toxicity or politeness flags.';
        case 'hedging and certainty': return 'Sentiment: hedging and certainty markers.';
        case 'sarcasm or irony flag': return 'Sentiment: sarcasm or irony flags.';
        case 'power or agency connotation': return 'Sentiment: power or agency connotations.';
        case 'directed sentiment (speaker to target)': return 'Sentiment: directed. Record speaker to target pairs.';
        case 'sentiment dynamics (shift over time)': return 'Sentiment: dynamics. Track changes across time or stages.';
        case 'lexicon-based (VADER, NRC, AFINN)': return 'Sentiment: lexicon-based. Dictionary scoring with domain caveats.';
        case 'LIWC affect categories': return 'Sentiment: LIWC categories if licensed.';
        case 'transformer classifier (domain tuned)': return 'Sentiment: domain tuned transformer classifier.';
        case 'multi-label emotions (27+ set)': return 'Sentiment: multi-label emotions allowed per excerpt.';
        default: return null;
      }
    })();

    const sentimentUnitsNote = (() => {
      switch (f.sentiment_units) {
        case '-1..+1': return 'Sentiment scale: -1..+1. Negative to positive. Zero is near neutral.';
        case '0..1': return 'Sentiment scale: 0..1. Probability or strength.';
        case '0..100': return 'Sentiment scale: 0..100. Percentage-like score.';
        default: return null;
      }
    })();

    // Severity and priority notes
    const severityNote = (() => {
      switch (f.severity_scale) {
        case 'Nielsen 0..4 (cosmetic to catastrophe)': return 'Severity: Nielsen 0..4. 0 not a problem, 4 usability catastrophe.';
        case 'Heuristic 1..5 (pass to catastrophe)': return 'Severity: Heuristic 1..5. Anchor examples at 2, 3, and 4.';
        case 'High, Medium, Low': return 'Severity: H, M, L. Triage quickly with examples to prevent drift.';
        case 'Task criticality 1..4': return 'Severity: task criticality. Rate by effect on critical path completion.';
        case 'Time or effort penalty 0..4': return 'Severity: time or effort penalty per task.';
        case 'Frequency x Impact grid': return 'Severity: frequency x impact. Highlight high-high items.';
        case 'Accessibility impact 0..4 (WCAG)': return 'Severity: accessibility impact. 0 none, 4 blocks assistive tech users.';
        case 'Ethical or harm severity 0..4': return 'Severity: ethical or harm severity.';
        case 'Sentiment intensity -3..+3': return 'Severity: sentiment intensity. Use negative intensity as pain magnitude.';
        case 'Likelihood x Impact (risk matrix)': return 'Severity: risk matrix. Score likelihood and impact.';
        case 'Likert 1..5 (very low to very high)': return 'Severity: Likert 1..5 with anchors.';
        case 'Mean Opinion Score 1..5': return 'Severity: MOS 1..5. Include n and variance.';
        case 'Qualitative risk matrix 1..5 x 1..5': return 'Severity: qualitative risk matrix with rationale per rating.';
        case 'Bug or incident severities (S1..S5 or P0..P4)': return 'Severity: map to incident classes like S1 or P0.';
        case 'Ops SEV1..SEV4': return 'Severity: ops SEV scale. Align with on-call definitions.';
        case '1..10 (anchored)': return 'Severity: 1..10 with clear anchors to prevent inflation.';
        case 'FMEA RPN (1..10 factors)': return 'Severity: FMEA RPN. Reduce highest RPN first.';
        case 'CVSS 0.0..10.0': return 'Severity: CVSS style scoring if security related.';
        case 'Numeric Rating Scale 0..10': return 'Severity: numeric rating scale for perceived pain.';
        case 'Borg CR10 0..10': return 'Severity: Borg CR10 with verbal anchors.';
        case 'DREAD (0..10 per factor)': return 'Severity: DREAD factors like damage and reproducibility.';
        case 'Letter grades A..F': return 'Severity: A to F grades with rubric descriptions.';
        default: return null;
      }
    })();

    const priorityNote = (() => {
      switch (f.priority_model) {
        case 'Severity x Frequency x Impact': return 'Priority: S x F x I. Rank by how bad, how often, and how much it moves outcomes.';
        case 'ICE (Impact, Confidence, Ease)': return 'Priority: ICE. Quick stack ranking by impact, confidence, and ease.';
        case 'RICE-like (Reach, Impact, Confidence, Effort)': return 'Priority: RICE-like. Includes reach and effort for different audience sizes.';
        case 'WSJF (Cost of Delay / Job Size)': return 'Priority: WSJF. Sequence by cost of delay divided by job size.';
        case 'Opportunity scoring (Importance x Satisfaction)': return 'Priority: opportunity scoring. Underserved outcomes first.';
        case 'MoSCoW (Must, Should, Could, Won’t)': return 'Priority: MoSCoW buckets with a secondary rule inside each.';
        case 'Kano-informed (Basic, Performance, Delighter)': return 'Priority: Kano informed. Cover basics, then performance, then selected delighters.';
        case 'FMEA RPN (Severity x Occurrence x Detectability)': return 'Priority: FMEA RPN. Address highest RPN first.';
        case 'Risk Exposure (Probability x Impact)': return 'Priority: risk exposure. Focus on high probability x impact items.';
        case 'CVSS-style bins 0..10': return 'Priority: CVSS style bins with vector notes if applicable.';
        case 'PIE (Potential, Importance, Ease)': return 'Priority: PIE. CRO friendly scoring.';
        case 'PXL (weighted CRO checklist)': return 'Priority: PXL. Weighted checklist for experiments.';
        case 'ROI (Value / Cost)': return 'Priority: ROI. Include time to value and confidence.';
        case 'Cost of Delay (absolute)': return 'Priority: cost of delay absolute.';
        case 'Expected Value of Learning (EVoL)': return 'Priority: EVoL. Pick the work that reduces uncertainty fastest.';
        case 'Ethical Risk HARM (Harm x Affected users x Reversibility x Mitigation readiness)': return 'Priority: HARM. Address highest ethical risk first.';
        case 'Accessibility Priority (Task impact x Affected users x WCAG risk)': return 'Priority: accessibility. Rank by task impact, affected users, and WCAG risk.';
        case 'Eisenhower (Urgency x Importance)': return 'Priority: Eisenhower matrix.';
        case 'QFD or House of Quality (weighted requirements)': return 'Priority: QFD weighting with correlations.';
        case 'North Star vs MVP impact score': return 'Priority: balance near term MVP vs progress to North Star metric.';
        case 'Value x Effort grid': return 'Priority: value x effort grid with validation for top right picks.';
        default: return null;
      }
    })();

    // Attachments note
    const attachmentNote = f.uploading === 'yes'
      ? 'Attachments: files will be provided. Read and incorporate uploaded documents as primary evidence.'
      : null;

    // Speaker and privacy summary
    const speakerNote = (() => {
      const parts = [];
      if (f.speaker_count) parts.push(`# speakers: ${f.speaker_count}`);
      if (f.user_count) parts.push(`# users/customers: ${f.user_count}`);
      if (f.diarization) parts.push(`Diarization: ${f.diarization}`);
      if (f.speaker_names) parts.push(`Speakers: ${f.speaker_names}`);
      if (f.name_redaction_policy) parts.push(`Name/redaction: ${f.name_redaction_policy}`);
      if (f.redact_terms) parts.push(`Redact terms: ${f.redact_terms}`);
      return parts.length ? `Participants:\n${parts.join(' · ')}` : null;
    })();

    // Sentiment modifiers list handling (multiselect)
    const sentimentMods = Array.isArray(f.sentiment_modifiers) && f.sentiment_modifiers.length
      ? `Sentiment modifiers:\n${f.sentiment_modifiers.join(', ')}`
      : null;

    return [
      'Analyze the following corpus for decision-useful insights.',
      f.org && `Organization: ${f.org}`,
      srcLine,
      whyLine,
      extraSrc,
      scopeNote,

      f.corpus && `Corpus:\n${f.corpus}`,
      f.time_window && `Time window: ${f.time_window}`,
      attachmentNote,
      f.upload_context && `Upload notes:\n${f.upload_context}`,

      speakerNote,

      // Language and domain terms
      (f.language || f.domain_dictionary || f.transcript_quality) && [
        'Language and terms:',
        f.language && `- Language/dialect: ${f.language}`,
        f.domain_dictionary && `- Domain dictionary: ${f.domain_dictionary}`,
        f.transcript_quality && `- Quality flags: ${f.transcript_quality}`
      ].filter(Boolean).join('\n'),

      f.questions && `Research questions:\n${f.questions}`,

      approachNote,
      methodNote,
      f.unit_of_analysis && `Unit of analysis: ${f.unit_of_analysis}`,

      f.audience_persona && `Personas/segments: ${list(f.audience_persona)}`,
      f.segments && `Cohorts to compare:\n${f.segments}`,
      f.journey_stages && `Journey stages:\n${f.journey_stages}`,

      f.codebook_seed && `Seed codebook:\n${f.codebook_seed}`,
      f.inclusion_rules && `Inclusion and exclusion rules:\n${f.inclusion_rules}`,
      f.code_styles && `Code styles:\n${f.code_styles}`,

      // Codebook policy
      (() => {
        switch (f.codebook_policy) {
          case 'generate a codebook': return 'Codebook policy: generate a candidate codebook for future use.';
          case 'lock after pilot (v1.0)': return 'Codebook policy: lock after a pilot then scale with v1.0.';
          case 'evolving with change log': return 'Codebook policy: evolving with change log and retro-coding if needed.';
          case 'strict (no additions)': return 'Codebook policy: strict. No new codes; note anomalies and limitations.';
          case 'fork by cohort then reconcile': return 'Codebook policy: fork per cohort and reconcile later.';
          default: return null;
        }
      })(),

      // Sentiment and scoring
      sentimentNote,
      sentimentUnitsNote,
      sentimentMods,
      severityNote,
      f.severity_anchors && `Severity anchors:\n${f.severity_anchors}`,
      f.impact_domains && `Impact domains:\n${f.impact_domains}`,
      f.theme_threshold && `Theme evidence threshold: ${f.theme_threshold}`,
      priorityNote,

      // Reliability
      f.reliability_metric && `Reliability plan: ${f.reliability_metric}`,
      f.double_code_pct && `Double-code percent: ${f.double_code_pct}`,
      f.saturation_check && `Saturation tracking: ${f.saturation_check}`,

      // Quotes and privacy
      f.quotes && `Include quotes: ${f.quotes}`,
      f.quote_length && `Quote length policy: ${f.quote_length}`,
      f.quote_criteria && `Quote selection criteria:\n${f.quote_criteria}`,
      f.privacy_notes && `Privacy and anonymity notes:\n${f.privacy_notes}`,

      // Outputs
      (() => {
        const deliverableMap = {
          'themes + evidence - named themes with definitions and exemplar quotes': 'Deliverable: themes with definitions and exemplar quotes.',
          'insight cards - card per insight with so-what and owner': 'Deliverable: insight cards with so-what, owner, and metric.',
          'journey tensions - stage x theme conflicts and moments of truth': 'Deliverable: journey tensions across stages.',
          'executive summary - top 5 findings with clear decisions': 'Deliverable: executive summary for decisions.',
          'full analysis report - comprehensive analysis with appendices': 'Deliverable: full analysis report with appendices.',
          'full narrative report - long-form story with evidence and tradeoffs': 'Deliverable: narrative report with evidence and tradeoffs.',
          'research readout deck - slide-ready storyline': 'Deliverable: readout deck with storyline.',
          'stakeholder one-pager - narrative brief for decision-makers': 'Deliverable: stakeholder one pager.',
          'stakeholder presentation deck - bullet-point briefing': 'Deliverable: stakeholder presentation deck.',
          'spoken presentation script - concise presenter script with cues': 'Deliverable: presenter script.',
          '30-second impact RAP - Readout, Action, Proof': 'Deliverable: 30 second RAP.',
          'backlog tickets (issue-ready) - use provided template': 'Deliverable: issue-ready backlog tickets.',
          'persona updates - attributes, needs, quotes': 'Deliverable: persona updates.',
          'journey blueprint - stages, steps, pain and delight': 'Deliverable: journey blueprint.',
          'assumptions and follow-up questions - open questions and next probes': 'Deliverable: assumptions and follow-up questions.',
          'brainstorm and transcript discussion - workshop prompts': 'Deliverable: brainstorm prompts.',
          'quote bank + codebook export - searchable quotes and final codes': 'Deliverable: quote bank and codebook export.',
          'tagged CSV or JSON (for audit) - machine-usable export': 'Deliverable: tagged export for audit.',
          'problem statement and decision memo - framing with recommendation': 'Deliverable: decision memo.',
          'PR/FAQ - press release style summary and FAQs': 'Deliverable: PR/FAQ.',
          'experiment plan (A/B) - hypotheses, metrics, variants, risks': 'Deliverable: experiment plan.',
          'training and enablement guide - role-based scenarios and FAQs': 'Deliverable: training and enablement guide.',
          'support macros and FAQ updates - suggested help center copy': 'Deliverable: support macros and FAQ updates.',
          'service blueprint - frontstage and backstage with interactions': 'Deliverable: service blueprint.',
          'executive Q&A - anticipated questions with evidence': 'Deliverable: executive Q&A.',
          'implementation recommendations - ranked fixes with effort and impact': 'Deliverable: implementation recommendations.'
        };
        return f.deliverable && f.deliverable !== 'none' ? (deliverableMap[f.deliverable] || `Deliverable: ${f.deliverable}`) : null;
      })(),

      (() => {
        const visualsMap = {
          'theme map - clusters with exemplar quotes': 'Visual: theme map with clusters and exemplar quotes.',
          'frequency bar - theme counts': 'Visual: frequency bars for theme counts.',
          'stacked bar - codes by stage or persona': 'Visual: stacked bars by stage or persona.',
          'heatmap - stage x theme intensity': 'Visual: heatmap of stage x theme intensity.',
          'co-occurrence matrix - code x code': 'Visual: co-occurrence matrix for code pairs.',
          'sentiment timeline - valence or arousal over time': 'Visual: sentiment timeline.',
          'saturation curve - new codes by interview': 'Visual: saturation curve showing new codes over interviews.',
          'pareto chart - frequency with cumulative percent': 'Visual: pareto chart.',
          'box or violin - distribution of severity or time': 'Visual: distribution via box or violin.',
          'scatter or bubble - impact x effort (reach = size)': 'Visual: scatter or bubble chart of impact x effort.',
          'radar - multi-criteria theme profile': 'Visual: radar chart for multi-criteria theme profiles.',
          'timeline - events or interviews': 'Visual: timeline of events or interviews.',
          'sankey or alluvial - flow across stages': 'Visual: sankey or alluvial for flow.',
          'treemap - hierarchy share': 'Visual: treemap of hierarchy share.',
          'upset plot - set overlaps': 'Visual: upset plot for overlaps.',
          'adjacency matrix - co-occurrence grid': 'Visual: adjacency matrix.',
          'word bars - top n-grams': 'Visual: word bars for top n-grams.',
          'confidence x evidence 2x2': 'Visual: confidence x evidence 2x2.',
          'funnel - drop-offs by step': 'Visual: funnel of step drop-offs.',
          'theme network - force-directed graph': 'Visual: force-directed theme network.',
          'chord diagram - inter-theme connections': 'Visual: chord diagram of connections.',
          'ASCII heatmap or bars (text)': 'Visual: ASCII heatmap or bars (text only).',
          'Mermaid text (flow or journey)': 'Visual: Mermaid text for flow or journey.',
          'DOT or Graphviz text (network or hierarchy)': 'Visual: DOT or Graphviz text for networks or hierarchies.',
          'storyboard - text panels with quotes': 'Visual: storyboard as text panels with quotes.'
        };
        return f.visuals && f.visuals !== 'none' ? (visualsMap[f.visuals] || `Visual: ${f.visuals}`) : null;
      })(),

      (() => {
        const exportMap = {
          'CSV': 'Export: CSV with excerpts, codes, and metadata.',
          'Airtable-ready CSV': 'Export: Airtable-ready CSV.',
          'Excel-ready CSV': 'Export: Excel-friendly CSV.',
          'XLSX export': 'Export: XLSX with multiple sheets.',
          'JSON': 'Export: JSON hierarchy of excerpts, codes, and themes.',
          'NDJSON': 'Export: NDJSON, one JSON object per line.',
          'Parquet': 'Export: Parquet columnar format.',
          'Feather (Apache Arrow)': 'Export: Feather (Arrow).',
          'SQLite (.db)': 'Export: SQLite database.',
          'GraphML': 'Export: GraphML for network tools.',
          'GEXF (Gephi)': 'Export: GEXF for Gephi.',
          'Codebook CSV': 'Export: codebook CSV with definitions and rules.',
          'REFI-QDA codebook XML (export)': 'Export: REFI-QDA XML.',
          'NVivo or ATLAS.ti codebook CSV (export)': 'Export: NVivo or ATLAS.ti codebook CSV.',
          'Markdown report (md)': 'Export: Markdown report.',
          'HTML report (print ready)': 'Export: HTML report.',
          'LaTeX (tex) export': 'Export: LaTeX source.',
          'written report (doc or pdf outline, paste ready)': 'Export: doc or pdf outline.',
          'stakeholder brief (one pager, paste ready)': 'Export: one pager.',
          'spoken presentation notes or teleprompter': 'Export: speaker notes.',
          'slide deck outline (pptx paste ready)': 'Export: slide deck outline.',
          'Google Slides outline (paste ready)': 'Export: Google Slides outline.',
          'PPTX content (paste ready)': 'Export: PPTX content outline.',
          'Jupyter Notebook (ipynb) export': 'Export: Jupyter notebook.',
          'R script (ggplot2/dplyr) - paste ready': 'Export: R script.',
          'RMarkdown (Rmd) - paste ready': 'Export: RMarkdown template.',
          'SQL seed (CREATE TABLE + INSERT) - paste ready': 'Export: SQL seed script.',
          'Julia script - paste ready': 'Export: Julia script.',
          'MATLAB script - paste ready': 'Export: MATLAB script.',
          'SAS program - paste ready': 'Export: SAS program scaffold.',
          'SPSS syntax - paste ready': 'Export: SPSS syntax.',
          'Vega-Lite spec (JSON) - paste ready': 'Export: Vega-Lite JSON spec.',
          'Looker Studio ready CSV (schema notes)': 'Export: Looker Studio ready CSV.'
        };
        return f.export_format && f.export_format !== 'none' ? (exportMap[f.export_format] || `Export: ${f.export_format}`) : null;
      })(),

      f.tools && `Tools: ${f.tools}`,

      // AI assist note
      (() => {
        switch (f.ai_assist) {
          case 'none (manual only)': return 'AI assist: none. Human-only coding and synthesis.';
          case 'suggest codes (review required)': return 'AI assist: suggest codes. Human approves or edits.';
          case 'auto-tag then human review': return 'AI assist: auto-tag, then human review a sample plus spot checks.';
          case 'summarize themes only': return 'AI assist: summarize themes only. Human codes evidence.';
          case 'explain every step (transparent)': return 'AI assist: explain every step, reasoning, and evidence.';
          case 'discussion (back and forth)': return 'AI assist: collaborative discussion with probing and challenges.';
          case 'full analysis and final report (comprehensive)': return 'AI assist: comprehensive analysis and final report.';
          case 'all of the above (combo)': return 'AI assist: combo. Explain, suggest, auto-tag, and report.';
          default: return null;
        }
      })(),

      f.risks_picks && `Bias and ethics checks: ${list(f.risks_picks)}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      [
        'Output format:',
        '- Codebook (final): name, definition, include/exclude, examples, relationships, change log summary',
        '- Tagged excerpts: id, timestamp, codes, sentiment/emotion, persona/segment, stage',
        '- Themes: name, description, evidence (quotes with IDs and time), frequency, severity, impact',
        '- Tensions and contradictions: statement, linked excerpts, hypothesized conditions',
        '- Prioritization: scored list per model with confidence and assumptions',
        '- Visuals (if selected): theme map, journey heatmap, co-occurrence, sentiment timeline, saturation curve',
        '- Insight cards: insight, evidence, so-what, recommendation, owner, metric, effort, confidence',
        '- Packaging (per selection): exec summary, readout deck, full report, or one pager',
        '- Exports: CSV, JSON, Excel, Airtable, and narrative artifacts',
        '- Appendix: reliability stats, saturation, limitations, and privacy notes'
      ].join('\n')
    ].filter(Boolean).join('\n');
  },

  meta: {
    search_text: 'transcripts analyze corpus source reason org speakers privacy redaction dictionary upload thematic sentiment severity priority WSJF ICE RICE codebook policy deliverables visuals exports AI assist'
  }
},

/* ---------------------------------------------------------
TASK: Findings — Synthesize (enhanced+context-aware)
--------------------------------------------------------- */
{
id: 'task_findings_synthesize',
slug: 'findings-synthesize',
label: 'Findings — Synthesize',
kind: 'task',
categories: ['ux','research','analysis'],
tags: [
'type:task',
'topic:insights',
'topic:prioritization',
'topic:storytelling',
'use:synthesize',
'use:present',
'use:edit',
'stage:summarize'
],
use_cases: [
'turn raw notes into a crisp readout',
'translate themes into decisions and next steps',
'tailor messaging to execs or builders',
'prioritize pains/opportunities by severity, frequency, and impact',
'create insight cards with evidence, so-what, and recommendations',
'map themes to journey stages and segments for clarity',
'produce stakeholder-specific artifacts (exec TL;DR, builder tickets)',
'triangulate qualitative + quant signals for confidence',
'assemble quote banks and visuals (heatmaps, co-occurrence graphs)',
'convert insights into roadmap slices or OKR candidates',
'summarize limits, confidence, and follow-ups for transparency',
'align insights to objectives/OKRs and define acceptance criteria for change',
'create counterfindings & risks register for balanced decision-making'
],
definition: 'Synthesize research into a small set of decision-ready insights. Cluster evidence into themes and tensions, prioritize by impact and severity (tempered by confidence), tailor the readout to each audience, and attach owners, metrics, and next steps.',
help: 'Paste inputs (themes, notes, coded excerpts, survey cuts, analytics links). Choose a synthesis framework, priority model, narrative tone, and artifact so guidance adapts. Add personas/segments for targeted breakouts and a bias checklist to keep value-inclusive framing.',
fields: [

{ key:'decision', label:'Decision to inform', type:'text', ph:'What will this synthesis help decide?', desc:'Design backwards from the decision to keep focus.' },
{ key:'goals', label:'Project goals (for context)', type:'textarea', ph:'2–4 goals tied to the decision', desc:'Why this study exists and what success looks like.' },

/* Audience & tailoring */
{ key:'audience',      label:'Audience', type:'select',
  options:['product team','leadership','marketing','engineering','design','sales','success/support','data/analytics','compliance/legal','company-wide','board'],
  desc:'Tailors tone, depth, and artifact guidance.' },
{ key:'audience_persona', label:'Audience personas (optional)', type:'repeater',
  itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
  desc:'Stakeholder archetypes to tune language and emphasis.',
  ph:'e.g., Growth PM; Staff Engineer; VP Marketing' },

/* Inputs */
{ key:'inputs',        label:'Inputs (themes/notes links)', type:'textarea',
  ph:'Links to coded excerpts, surveys, analytics, screenshots',
  desc:'Evidence sources to synthesize; include IDs if possible.' },
{ key:'triangulation', label:'Triangulation sources', type:'textarea',
  ph:'Qual interviews, survey cuts, product logs, support tickets',
  desc:'Signals to cross-reference; boosts confidence.' },

/* Framework & lens */
{ key:'framework',     label:'Synthesis lens', type:'select',
  options:['JTBD','5 Whys','AARRR','Heuristics','Goal→Signal→Decision','Thematic clusters','Journey map (stage × theme)','Opportunity-Solution Tree','Tensions mapping'],
  desc:'Organizing logic that shapes theme definitions and narrative.' },

/* Narrative & tone */
{ key:'narrative_tone', label:'Narrative tone', type:'select',
  options:['neutral-analytical','urgent-exec','user-voice storytelling','risk-focused','opportunity-focused'],
  desc:'Controls voice and emphasis in the readout.' },

/* Prioritization */
{ key:'priority_model',label:'Priority model', type:'select',
  options:['Severity × Frequency × Impact (tempered by Confidence)','ICE (Impact, Confidence, Ease)','RICE-like (Reach, Impact, Confidence, Effort)','MoSCoW (Must/Should/Could/Won’t)'],
  desc:'How recommendations will be ranked.' },
{ key:'severity_scale',label:'Severity scale', type:'select',
  options:['Blocker/High/Medium/Low','1–5','custom'],
  desc:'How “bad” a pain is at the moment of use.' },
{ key:'impact_domains',label:'Impact domains', type:'textarea',
  ph:'conversion, retention, activation, adoption, trust, cost to serve, risk',
  desc:'Business levers each insight potentially moves.' },

/* Metrics & scope */
{ key:'kpis',          label:'Target KPI(s)', type:'textarea',
  ph:'e.g., step-3 drop-off, Day-7 retention, CSAT, NPS',
  desc:'The metric each recommendation should influence.' },
{ key:'okrs',          label:'OKR linkage (optional)', type:'textarea',
  ph:'Objective → KR(s) the insight supports',
  desc:'Map insights to objectives & KRs to drive adoption.' },
{ key:'insight_threshold', label:'Evidence threshold', type:'text',
  ph:'e.g., ≥5 excerpts across ≥3 participants or strong extreme case',
  desc:'Minimum evidence needed to promote a theme to an insight.' },
{ key:'confidence_rubric', label:'Confidence rubric', type:'select',
  options:['H/M/L','1–5 numeric','traffic-light'],
  desc:'How you will express confidence/limitations.' },
{ key:'insights_cap',  label:'Insights cap', type:'select',
  options:['3–5','5–7','8–10'],
  desc:'Keeps the readout tight and memorable.' },

/* Artifacts & visuals */
{ key:'artifact',      label:'Artifact', type:'select',
  options:['executive readout','insight cards','recommendations list','PR/FAQ style summary','one-pager TL;DR','roadmap slice','design brief(s)','ticket bundle'],
  desc:'Primary deliverable to generate (we can bundle others).' },
{ key:'visuals',       label:'Visuals', type:'select',
  options:['theme map','journey heatmap','severity × frequency bubble chart','co-occurrence graph','before/after storyboard','none'],
  desc:'Optional visual aids that strengthen the story.' },

/* Quotes & ethics */
{ key:'include_quotes',label:'Include verbatim quotes?', type:'select', options:['yes','no'] },
{ key:'quote_criteria',label:'Quote selection criteria', type:'textarea',
  ph:'Concrete · decision-linked · self-contained · memorable · ethical',
  desc:'How to select “quotes of impact” (IDs + timestamps).' },
{ key:'quote_length',  label:'Max quote length (words)', type:'text', ph:'e.g., 30–40', desc:'Keeps quotes sharp and readable.' },
{ key:'include_counterfindings', label:'Include counterfindings?', type:'select', options:['yes','no'], desc:'Surfaces contradictions and scope limits for balance.' },

/* Bias & framing — exact library shape */
{
  key: 'risks_picks',
  label: 'Biases (from library)',
  type: 'repeater',
  itemType: 'typeahead',
  unit: 'bias',
  dataset: 'bias',
  autofill: 'bias->inline',
  desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
  ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
},

/* Ownership, delivery & constraints */
{ key:'owners_map',    label:'Owner mapping (teams/people)', type:'textarea',
  ph:'e.g., Payments PM; Design Systems; Growth Eng',
  desc:'Who will own top recommendations.' },
{ key:'acceptance_criteria', label:'Acceptance criteria for recommendations', type:'textarea',
  ph:'Definition of done, constraints, non-goals',
  desc:'Clarifies what “shipped” means for each action.' },
{ key:'timeline',      label:'Timeline (delivery/use window)', type:'text',
  ph:'e.g., Q3 release; 6-week sprint window',
  desc:'When recommendations must land to matter.' },
{ key:'distribution',  label:'Distribution plan', type:'textarea',
  ph:'Channels & formats: all-hands, Slack, Confluence, email',
  desc:'How and where the artifact will be shared and consumed.' },
{ key:'constraints',   label:'Constraints', type:'textarea',
  ph:'legal/privacy, brand, data access, bandwidth',
  desc:'Anything that limits scope or shapes messaging.' },
{ key:'limits',        label:'Confidence & limitations', type:'textarea',
  ph:'sample caveats, known biases, open questions',
  desc:'State uncertainties to build credibility.' },
{ key:'followups',     label:'Follow-ups & experiments', type:'textarea',
  ph:'Next tests, guardrail metrics, learning goals',
  desc:'Turn insights into a learning/action plan.' }


],
boosters: [
'Write the decision first; select a framework that naturally answers it.',
'Name themes with boundaries (what’s in/out) and 2–3 exemplars.',
'Prioritize with a simple, consistent model; highlight low-frequency/high-severity risks.',
'Translate user harm to business impact; attach a target KPI/OKR for each insight.',
'Cap insights to keep signal sharp; move extras to an appendix or backlog.',
'Tailor for audience: execs want trajectory/risks; builders want crisp problems + DoD.',
'Use visuals to clarify (heatmaps, bubbles, co-occurrence), not decorate.',
'Choose quotes that are concrete and self-contained; include IDs/timestamps; respect redaction.',
'Be explicit about confidence and limits; triangulate when possible.',
'End with owners, acceptance criteria, and dates—insights die without accountability.'
],
template: (f)=>{
const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

// Audience angle
const audienceNote = (() => {
  switch (f.audience) {
    case 'leadership':
    case 'board':
      return 'Angle: Executive — lead with trajectory, risk, and business levers. TL;DR first.';
    case 'product team':
    case 'engineering':
    case 'design':
      return 'Angle: Builders — frame crisp problem statements, acceptance criteria, and evidence links.';
    case 'marketing':
    case 'sales':
      return 'Angle: GTM — emphasize segments, messages, objections, and proof points.';
    case 'success/support':
      return 'Angle: CS — playbooks for “what to say/do,” early-warning signals, and deflection levers.';
    case 'data/analytics':
      return 'Angle: Analytics — define metrics moved, required instrumentation, and hypotheses to test.';
    case 'compliance/legal':
      return 'Angle: Compliance — call out risk, consent, and data-handling implications.';
    case 'company-wide':
      return 'Angle: Company-wide — simple narrative, 3–5 insights, clear wins, and how to help.';
    default:
      return null;
  }
})();

// Framework guidance
const frameworkNote = (() => {
  switch (f.framework) {
    case 'JTBD': return 'Framework: JTBD — organize by jobs/outcomes, not features; show forces and progress.';
    case '5 Whys': return 'Framework: 5 Whys — ladder causes until root problems emerge; avoid blame-y phrasing.';
    case 'AARRR': return 'Framework: AARRR — tie insights to Acquisition, Activation, Retention, Referral, Revenue.';
    case 'Heuristics': return 'Framework: Heuristics — rate findings against clarity, control, consistency, feedback, error prevention.';
    case 'Goal→Signal→Decision': return 'Framework: Goal→Signal→Decision — for each goal, pick signals, then state the decision.';
    case 'Thematic clusters': return 'Framework: Thematic clusters — cluster codes; name themes with in/out rules and exemplars.';
    case 'Journey map (stage × theme)': return 'Framework: Journey — plot themes by stage; highlight moments of truth.';
    case 'Opportunity-Solution Tree': return 'Framework: OST — outcome → opportunities → solution ideas; keep evidence attached.';
    case 'Tensions mapping': return 'Framework: Tensions — articulate tradeoffs (e.g., Flexibility ↔ Learnability) and where to set the dial.';
    default: return null;
  }
})();

// Prioritization guidance
const priorityNote = (() => {
  switch (f.priority_model) {
    case 'Severity × Frequency × Impact (tempered by Confidence)':
      return 'Priority: Score severity × frequency × impact; temper with confidence.';
    case 'ICE (Impact, Confidence, Ease)':
      return 'Priority: ICE — favor high-impact, high-confidence, low-effort recommendations.';
    case 'RICE-like (Reach, Impact, Confidence, Effort)':
      return 'Priority: RICE-like — include reach/coverage and engineering effort.';
    case 'MoSCoW (Must/Should/Could/Won’t)':
      return 'Priority: MoSCoW — align stakeholders on scope bands instead of exact ranks.';
    default:
      return null;
  }
})();

// Narrative tone
const toneNote = (() => {
  switch (f.narrative_tone) {
    case 'neutral-analytical': return 'Tone: Neutral-analytical — precise, evidence-led, minimal rhetoric.';
    case 'urgent-exec': return 'Tone: Urgent-exec — risk/impact forward, clear asks and dates.';
    case 'user-voice storytelling': return 'Tone: User-voice — thread narrative through emblematic quotes and journeys.';
    case 'risk-focused': return 'Tone: Risk-focused — emphasize failure modes and mitigations.';
    case 'opportunity-focused': return 'Tone: Opportunity-focused — highlight upside and quick wins.';
    default: return null;
  }
})();

// Artifact note
const artifactNote = (() => {
  switch (f.artifact) {
    case 'executive readout': return 'Artifact: Executive readout — 1-slide TL;DR, 5–7 insights, priority list with owners/dates.';
    case 'insight cards': return 'Artifact: Insight cards — per-insight unit: claim, evidence, so-what, recommendation, owner, metric, confidence.';
    case 'recommendations list': return 'Artifact: Recommendations list — ranked table with rationale and effort estimates.';
    case 'PR/FAQ style summary': return 'Artifact: PR/FAQ — narrative announcement + anticipated questions with data-backed answers.';
    case 'one-pager TL;DR': return 'Artifact: One-pager — condensed narrative and top 3 actions.';
    case 'roadmap slice': return 'Artifact: Roadmap slice — convert insights to epics/streams with timing and capacity hints.';
    case 'design brief(s)': return 'Artifact: Design brief — problem statement, constraints, acceptance criteria, risks, and measures.';
    case 'ticket bundle': return 'Artifact: Ticket bundle — ready-to-file issues with DoD and links to evidence.';
    default: return null;
  }
})();

// Confidence rubric note
const confNote = (() => {
  switch (f.confidence_rubric) {
    case 'H/M/L': return 'Confidence rubric: H/M/L with rationale per insight.';
    case '1–5 numeric': return 'Confidence rubric: 1–5 numeric; include what would raise/lower confidence.';
    case 'traffic-light': return 'Confidence rubric: traffic-light (green/amber/red) with criteria.';
    default: return null;
  }
})();

return [
  'Synthesize research findings into a crisp, decision-ready artifact.',
  f.decision && `Decision to inform:\n${f.decision}`,
  f.goals && `Project goals:\n${f.goals}`,

  f.audience && `Audience: ${f.audience}`,
  f.audience_persona && `Stakeholder personas: ${list(f.audience_persona)}`,
  audienceNote,

  f.inputs && `Inputs:\n${f.inputs}`,
  f.triangulation && `Triangulation sources:\n${f.triangulation}`,

  f.framework && frameworkNote,
  toneNote,

  f.priority_model && priorityNote,
  f.severity_scale && `Severity scale: ${f.severity_scale}`,
  f.impact_domains && `Impact domains:\n${f.impact_domains}`,

  f.kpis && `Target KPI(s):\n${f.kpis}`,
  f.okrs && `OKR linkage:\n${f.okrs}`,
  f.insight_threshold && `Evidence threshold for promoting themes:\n${f.insight_threshold}`,
  confNote,
  f.insights_cap && `Insights cap: ${f.insights_cap}`,

  f.artifact && artifactNote,
  f.visuals && `Visuals: ${f.visuals}`,

  f.include_quotes && `Include quotes: ${f.include_quotes}`,
  f.quote_criteria && `Quote criteria:\n${f.quote_criteria}`,
  f.quote_length && `Max quote length: ${f.quote_length} words`,
  f.include_counterfindings && `Include counterfindings: ${f.include_counterfindings}`,

  f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,

  f.owners_map && `Owner mapping:\n${f.owners_map}`,
  f.acceptance_criteria && `Acceptance criteria:\n${f.acceptance_criteria}`,
  f.timeline && `Timeline: ${f.timeline}`,
  f.distribution && `Distribution plan:\n${f.distribution}`,
  f.constraints && `Constraints:\n${f.constraints}`,
  f.limits && `Confidence & limitations:\n${f.limits}`,
  f.followups && `Follow-ups & experiments:\n${f.followups}`,

  [
    'Output format:',
    '- TL;DR (3 bullets tailored to audience & tone)',
    '- Top Insights (name · why it matters · evidence with IDs/timestamps)',
    '- Counterfindings & Scope (where it doesn’t hold; conditions)',
    '- Prioritization (model + ranked list; severity × frequency × impact · confidence)',
    '- Recommendations (owner · acceptance criteria · effort/when · KPI/OKR to move)',
    '- Visuals (if selected): heatmap / bubbles / co-occurrence / storyboard',
    '- Risks, Limits, and Confidence (what could be wrong; data gaps; rubric applied)',
    '- Distribution & Adoption plan (where/who/when)',
    '- Next Steps (owners, dates) and Follow-up experiments',
    '- Appendix: Codebook/links to evidence, quote bank'
  ].join('\n')
].filter(Boolean).join('\n');


}
},

/* ---------------------------------------------------------
   TASK: Usability Test — Plan (enhanced+)
--------------------------------------------------------- */
{
  id: 'task_ut_plan',
  slug: 'usability-test-plan',
  label: 'Usability Test — Plan',
  kind: 'task',
  categories: ['ux','research','planning','evaluation'],
  tags: [
    'type:task',
    'topic:usability-test',
    'topic:benchmarking',
    'topic:accessibility',
    'use:plan',
    'use:design',
    'use:edit',
    'stage:plan'
  ],
  use_cases: [
    'define objectives and tasks for moderated/unmoderated testing',
    'set success criteria and metrics',
    'align recruiting and logistics',
    'plan formative (diagnostic) studies to fix friction fast',
    'run summative/benchmark tests (task success/time/errors, SUS/SEQ/UMUX-Lite)',
    'compare versions (A/B) or competitors under the same tasks',
    'design accessibility sessions with assistive tech and accommodations',
    'plan navigation tests (first-click, tree testing) and content comprehension',
    'specify hint/assistance policy and observer etiquette',
    'counterbalance task order and manage pilot/soft-launch',
    'tie findings to KPIs and acceptance criteria for fixes',
    'set stop rules/rescue policy to avoid participant frustration',
    'document RITE policy (what can be fixed between sessions)',
    'plan data handling (PII, redaction, retention) for recordings'
  ],
  definition: 'Plan a usability study end-to-end: objectives, tasks and scenarios, participants/quotas, devices & environments, moderation style, assistance policy, success metrics/benchmarks, accessibility, logistics, consent, and pilot plan.',
  help: 'Paste prototype links, flows, or stress areas. Select study type, environment, metrics, and accessibility notes so instructions adapt. Use persona and bias libraries for realistic, inclusive tasks and recruiting.',
  fields: [
    /* Strategy & scope */
    { key:'product_area',  label:'Product / area under test', type:'text', ph:'e.g., Billing → Export Invoices', desc:'Name the feature/flow you’ll evaluate.' },
    { key:'decision',      label:'Decision to inform', type:'text', ph:'What decision will this test help make?', desc:'Design backwards from the decision to pick tasks and metrics.' },
    { key:'objectives',    label:'Objectives', type:'textarea', ph:'2–3 goals tied to the decision', desc:'What you must learn or validate.' },
    { key:'hypotheses',    label:'Hypotheses (optional)', type:'textarea', ph:'We believe… This will be true if…', desc:'Testable statements to focus observation.' },

    /* Study design */
    { key:'study_type',    label:'Study type', type:'select',
      options:['formative (diagnostic)','summative (benchmark)','comparative (A/B)','competitive','accessibility-focused','first-click','tree test','prototype (lo/hi-fi)'],
      desc:'Alters tasks, metrics, and success criteria.' },
    { key:'environment',   label:'Environment', type:'select',
      options:['remote moderated','remote unmoderated','in-person lab','in-field'],
      desc:'Where and how the session runs.' },
    { key:'moderation',    label:'Moderation style', type:'select',
      options:['think-aloud (concurrent)','retrospective think-aloud','no think-aloud (silent observation)'],
      desc:'Impacts script and probing guidance.' },
    { key:'session_length',label:'Session length', type:'select',
      options:['20–30 min','45–60 min','90 min'],
      desc:'Pick time budget; shorter sessions need fewer tasks.' },

    /* Participants */
    { key:'users',         label:'Target users', type:'textarea', ph:'roles, experience, markets, devices', desc:'Describe who must be represented (include edge cases).' },
    { key:'audience_persona', label:'Participant personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Pick personas/segments to guide recruiting and scenarios.',
      ph:'e.g., New Admin; Mobile-first Seller; Screen reader user' },
    { key:'sample_size',   label:'Participants (target)', type:'text', ph:'e.g., 6–8 total or 5/user type', desc:'Formative ≈5–8 per user type; summative needs larger n.' },
    { key:'quotas',        label:'Quotas (optional)', type:'textarea', ph:'e.g., 40% SMB / 60% Enterprise; 50/50 new vs existing', desc:'Quota only what you’ll analyze.' },
    { key:'recruit_channels', label:'Recruiting channels', type:'textarea', ph:'panel, CRM, intercept, community', desc:'Source mix influences coverage and speed.' },
    { key:'screener_ref',  label:'Screener link/ref (optional)', type:'text', ph:'URL or ID', desc:'Keep eligibility consistent with your screener.' },

    /* Accessibility & devices */
    { key:'devices',       label:'Devices / OS / browsers', type:'textarea', ph:'Desktop (Chrome 123), iOS 16 Safari, Android 13 Chrome', desc:'Specify required setups and variants.' },
    { key:'assistive_tech',label:'Assistive tech (if any)', type:'textarea', ph:'screen reader, keyboard-only, voice control', desc:'Plan accommodations and success criteria.' },

    /* Tasks & scenarios (high level in plan; details in scenarios task) */
    { key:'tasks_count',   label:'# of tasks', type:'select', options:['3–5','6–8','9–12'], desc:'Aim for depth over breadth; trim after pilot.' },
    { key:'task_themes',   label:'Task themes', type:'textarea', ph:'e.g., discoverability, setup, error recovery, export', desc:'High-level buckets to ensure coverage.' },
    { key:'counterbalance',label:'Task ordering strategy', type:'select', options:['fixed order','counterbalanced','randomized (independent)'], desc:'Reduce order effects where tasks are independent.' },
    { key:'assist_policy', label:'Assistance (hint ladder)', type:'select', options:['no assistance','ladder: restate goal → point region → reveal path','custom'], desc:'Define when/how to help; mark assisted completions.' },
    { key:'stop_rules',    label:'Stop rules', type:'textarea', ph:'e.g., rescue after 3 min stuck or 3 failed attempts', desc:'When to intervene or move on to protect participant well-being.' },
    { key:'rite_policy',   label:'RITE policy (between sessions)', type:'textarea', ph:'What fixes are allowed between sessions? How to verify?', desc:'Rapid Iterative Testing & Evaluation guidance.' },

    /* Prototypes & data */
    { key:'prototype_links',label:'Prototype / build links', type:'textarea', ph:'Figma link(s), staging URLs, test accounts', desc:'Provide stable links and test data.' },
    { key:'data_setup',    label:'Test data & states', type:'textarea', ph:'preloaded records, roles, flags, seeded errors', desc:'Ensure each task is actually completable.' },

    /* Metrics & success criteria */
    { key:'metrics',       label:'Metrics', type:'textarea', ph:'task success, time on task, errors, path deviations, SEQ, SUS/UMUX-Lite', desc:'Pick measures appropriate to study type.' },
    { key:'include_seq',   label:'Per-task SEQ?', type:'select', options:['yes','no'], desc:'1–7 Single Ease Question after each task.' },
    { key:'include_sus',   label:'Post-session SUS/UMUX-Lite?', type:'select', options:['none','SUS','UMUX-Lite'], desc:'Overall usability rating for benchmarks.' },
    { key:'benchmarks',    label:'Targets (if summative)', type:'textarea', ph:'e.g., success ≥85%, median time ≤90s, SUS ≥80', desc:'Define pass/fail up front; avoid post-hoc shifting.' },
    { key:'success',       label:'Success criteria', type:'textarea', ph:'Binary/partial pass definitions per task; error thresholds', desc:'Observable end-states and fail conditions.' },
    { key:'severity_scale',label:'Issue severity scale', type:'select', options:['0–4 (cosmetic→catastrophic)','Blocker/High/Medium/Low','custom'], desc:'Standardize scoring for issues.' },

    /* Ops, observers, incentives */
    { key:'observers',     label:'Observers & etiquette', type:'textarea', ph:'who attends + backchannel; no coaching', desc:'Avoid contaminating sessions; set rules.' },
    { key:'observer_backchannel', label:'Observer backchannel', type:'text', ph:'e.g., #usability-observe (no coaching)', desc:'Where observers talk to each other—not to the moderator.' },
    { key:'logistics',     label:'Logistics', type:'textarea', ph:'scheduling, time zones, backups, consent flow', desc:'Plan reminders and recovery for tech issues.' },
    { key:'privacy_mode',  label:'Privacy mode', type:'select', options:['anonymous','confidential','identified'], desc:'Impacts consent language and storage.' },
    { key:'consent',       label:'Consent / Recording policy', type:'textarea', ph:'recording text, redaction, retention window, PII handling', desc:'Get explicit permission and set expectations.' },
    { key:'incentive_type', label:'Incentive type', type:'select',
      options:['cash','gift card','voucher/credit','charity donation','sweepstakes/raffle','none'],
      desc:'Match effort and norms; avoid coercion.' },
    { key:'incentive',     label:'Incentive amount/details', type:'text', ph:'e.g., $75 for 60 min', desc:'Set expectations up front.' },
    { key:'incentive_delivery', label:'Incentive delivery', type:'text', ph:'e.g., Tremendous, manual codes, 5–7 days', desc:'Method, timing, eligibility.' },

    /* Bias & ethics library (exact shape) */
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    },

    /* Pilot, notes, reporting */
    { key:'pilot',         label:'Pilot plan', type:'textarea', ph:'run 1–2 pilots; fix timing/prototype issues', desc:'Dry-run to de-risk sessions.' },
    { key:'notes_schema',  label:'Notes/coding schema', type:'textarea', ph:'issue severity, frequency, location; SEQ; quotes', desc:'Define how you’ll capture evidence.' },
    { key:'reporting',     label:'Reporting artifact', type:'select',
      options:['issues list (severity×frequency×impact)','insight cards','executive readout','design brief/ticket bundle'],
      desc:'Primary output that teams will act on.' },

    /* Constraints & risks */
    { key:'risks',         label:'Known risks / hypotheses', type:'textarea', ph:'fragile prototype areas; outage windows', desc:'Call out sharp edges and what you expect to break.' },
    { key:'constraints',   label:'Constraints', type:'textarea', ph:'privacy, device limits, bandwidth, legal', desc:'Anything that narrows scope or method.' }
  ],
  boosters: [
    'Write the decision first; choose study type and metrics that answer it.',
    'Test red routes first; fewer, deeper tasks beat many shallow ones.',
    'Describe goals in user language; never embed UI labels in scenarios.',
    'Define binary/partial success and error types before testing.',
    'Counterbalance or randomize task order where tasks are independent.',
    'Set an assistance policy and mark assisted vs. unassisted completions.',
    'Include accessibility from the start (AT, keyboard-only, captions).',
    'Pilot the whole flow (links, data, recording); trim after timing the pilot.',
    'Capture SEQ per task and SUS/UMUX-Lite only when benchmarking makes sense.',
    'Debrief 10 minutes after each session; log issues with severity×frequency×impact and concrete evidence.'
  ],
  template: (f)=>{
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    const typeNote = (() => {
      switch (f.study_type) {
        case 'formative (diagnostic)':
          return 'Study note: Formative — focus on finding and fixing friction; smaller n; prioritize severity over precision.';
        case 'summative (benchmark)':
          return 'Study note: Summative — predefine targets (success/time/errors, SUS/UMUX-Lite); larger n; control for variance.';
        case 'comparative (A/B)':
          return 'Study note: Comparative — counterbalance versions; keep tasks and prompts identical.';
        case 'competitive':
          return 'Study note: Competitive — same tasks across products; report task-level winners and tradeoffs.';
        case 'accessibility-focused':
          return 'Study note: Accessibility — include assistive tech; success = independent completion with accommodations respected.';
        case 'first-click':
          return 'Study note: First-click — measure first interaction accuracy and time; predicts task success.';
        case 'tree test':
          return 'Study note: Tree test — text-only IA; success and time; no UI chrome.';
        case 'prototype (lo/hi-fi)':
          return 'Study note: Prototype — watch for fidelity limits; script around dead ends; mark prototype-driven failures.';
        default:
          return null;
      }
    })();

    const envNote = (() => {
      switch (f.environment) {
        case 'remote moderated': return 'Environment: Remote moderated — prepare conferencing, backups, and observer backchannel.';
        case 'remote unmoderated': return 'Environment: Remote unmoderated — write self-contained tasks and auto-capture metrics; include attention checks sparingly.';
        case 'in-person lab': return 'Environment: Lab — manage room setup, screen/audio capture, and observer glass etiquette.';
        case 'in-field': return 'Environment: Field — plan for noise, connectivity, and contextual constraints; prioritize critical tasks.';
        default: return null;
      }
    })();

    const modNote = (() => {
      switch (f.moderation) {
        case 'think-aloud (concurrent)':
          return 'Moderation: Think-aloud — remind participants to narrate; avoid leading; accept pauses.';
        case 'retrospective think-aloud':
          return 'Moderation: Retrospective — record silently; replay and probe after each task to reduce interference.';
        case 'no think-aloud (silent observation)':
          return 'Moderation: Silent — rely on behavioral evidence; use brief neutral probes only after completion.';
        default:
          return null;
      }
    })();

    const seqNote = f.include_seq === 'yes' ? 'Per-task SEQ enabled (1–7 ease + “What made it a [score]?”).' : null;
    const susNote = (() => {
      switch (f.include_sus) {
        case 'SUS': return 'Post-session SUS enabled (overall usability index).';
        case 'UMUX-Lite': return 'Post-session UMUX-Lite enabled (usefulness + ease short scale).';
        default: return null;
      }
    })();

    const assistNote = (() => {
      switch (f.assist_policy) {
        case 'no assistance': return 'Assistance policy: none — mark only independent outcomes.';
        case 'ladder: restate goal → point region → reveal path': return 'Assistance policy: laddered hints — log level used and mark as assisted completion.';
        case 'custom': return 'Assistance policy: custom — specify hint levels in the protocol.';
        default: return null;
      }
    })();

    const privacyNote = (() => {
      switch (f.privacy_mode) {
        case 'anonymous': return 'Privacy: Anonymous — avoid collecting PII; redact identifiers in recordings and notes.';
        case 'confidential': return 'Privacy: Confidential — store PII separately; restrict access; specify retention.';
        case 'identified': return 'Privacy: Identified — explain purpose and safeguards; confirm consent for any internal sharing.';
        default: return null;
      }
    })();

    return [
      'Draft a usability test plan.',
      f.product_area && `Product area: ${f.product_area}`,
      f.decision && `Decision to inform:\n${f.decision}`,
      f.objectives && `Objectives:\n${f.objectives}`,
      f.hypotheses && `Hypotheses:\n${f.hypotheses}`,

      f.study_type && typeNote,
      f.environment && envNote,
      f.moderation && modNote,
      f.session_length && `Session length: ${f.session_length}`,

      f.users && `Target users:\n${f.users}`,
      f.audience_persona && `Personas/segments: ${list(f.audience_persona)}`,
      f.sample_size && `Participants (target): ${f.sample_size}`,
      f.quotas && `Quotas:\n${f.quotas}`,
      f.recruit_channels && `Recruiting channels:\n${f.recruit_channels}`,
      f.screener_ref && `Screener: ${f.screener_ref}`,

      f.devices && `Devices/OS/browsers:\n${f.devices}`,
      f.assistive_tech && `Assistive tech:\n${f.assistive_tech}`,

      f.tasks_count && `Tasks planned: ${f.tasks_count}`,
      f.task_themes && `Task themes:\n${f.task_themes}`,
      f.counterbalance && `Task ordering: ${f.counterbalance}`,
      assistNote,
      f.stop_rules && `Stop rules:\n${f.stop_rules}`,
      f.rite_policy && `RITE policy:\n${f.rite_policy}`,

      f.prototype_links && `Prototype/build links:\n${f.prototype_links}`,
      f.data_setup && `Test data & states:\n${f.data_setup}`,

      f.metrics && `Metrics:\n${f.metrics}`,
      seqNote,
      susNote,
      f.benchmarks && `Targets (if summative):\n${f.benchmarks}`,
      f.success && `Success criteria:\n${f.success}`,
      f.severity_scale && `Issue severity scale: ${f.severity_scale}`,

      f.observers && `Observers & etiquette:\n${f.observers}`,
      f.observer_backchannel && `Observer backchannel: ${f.observer_backchannel}`,
      f.logistics && `Logistics:\n${f.logistics}`,
      privacyNote,
      f.consent && `Consent / Recording:\n${f.consent}`,

      f.incentive_type && `Incentive type: ${f.incentive_type}`,
      f.incentive && `Incentive: ${f.incentive}`,
      f.incentive_delivery && `Incentive delivery: ${f.incentive_delivery}`,

      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,

      f.pilot && `Pilot plan:\n${f.pilot}`,
      f.notes_schema && `Notes/coding schema:\n${f.notes_schema}`,
      f.reporting && `Reporting artifact: ${f.reporting}`,

      f.risks && `Known risks / hypotheses:\n${f.risks}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      [
        'Output format:',
        '- Overview (decision, objectives, study type, environment, moderation)',
        '- Participants & Recruiting (personas, quotas, channels, sample size)',
        '- Tasks Plan (themes, ordering, stop rules, assistance policy, RITE policy)',
        '- Prototype & Data Setup (links, seeded states)',
        '- Metrics & Success Criteria (SEQ/SUS/UMUX-Lite, targets if benchmarking; severity scale)',
        '- Accessibility & Devices (AT, setups)',
        '- Logistics (observers, backchannel, scheduling, consent/recording, privacy mode)',
        '- Pilot & Notes Schema',
        '- Reporting Plan',
        '- Risks & Constraints'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
},


/* ---------------------------------------------------------
   TASK: Task Scenarios — Write (enhanced v2)
--------------------------------------------------------- */
{
  id: 'task_scenarios_write',
  slug: 'task-scenarios-write',
  label: 'Task Scenarios — Write',
  kind: 'task',
  categories: ['ux','research','writing','evaluation'],
  tags: [
    'type:task',
    'topic:usability-test',
    'topic:task-scenarios',
    'topic:hta',
    'topic:klm',
    'topic:accessibility',
    'use:write',
    'use:design',
    'use:edit',
    'stage:design'
  ],
  use_cases: [
    'write realistic, bias-free scenarios for usability tasks',
    'define acceptance criteria per task',
    'ensure coverage of critical paths',
    'author recovery/edge-case scenarios that test resilience',
    'create step and micro-action breakdowns (HTA/KLM-lite)',
    'tailor scenarios for digital, physical, or hybrid workflows',
    'add accessibility paths (keyboard-only, screen reader) and device variants',
    'counterbalance task order and set assistance (hint) policy',
    'embed per-task success/partial/fail gates and SEQ/Confidence prompts',
    'localize scenario language by market/reading level',
    'design comparable scenarios for A/B or competitive studies',
    'seed realistic data/states so tasks are actually completable',
    'attach observation targets and evidence logging (events, timestamps)'
  ],
  definition: 'Write and refine usability task scenarios with realistic context, prerequisites, starting states, constraints, success/partial/fail criteria, recovery variants, and observation targets. Includes step/micro-action breakdown (HTA, optional KLM timing) and accessibility/device paths.',
  help: 'Name the product area and user objectives in user language. Select modality, scenario style, complexity mix, ordering, and assistance policy so guidance adapts. Provide any seeded data, states, devices/AT, and constraints. Use personas and the bias library to keep language inclusive and avoid path giveaways.',
  fields: [
    /* Scope & context */
    { key:'product_area',  label:'Product / area', type:'text', ph:'e.g., Billing → Export Invoices', desc:'Feature or flow under test.' },
    { key:'objectives',    label:'User objectives (jobs to test)', type:'textarea', ph:'Outcomes in user words (not features)', desc:'Each objective should map to ≥1 scenario.' },

    /* Audience */
    { key:'persona_context', label:'Persona/segment refs (optional)', type:'textarea', ph:'@Persona: Admin Alice; @Segment: SMB Paid', desc:'References to existing personas or segments.' },
    { key:'audience_persona', label:'Personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Select one or more personas to guide language and data.',
      ph:'e.g., New Admin; Mobile-first Seller; Finance Manager' },

    /* Modality & environment */
    { key:'modality',      label:'Modality', type:'select',
      options:['digital','physical','hybrid'],
      desc:'Alters observation targets and constraints.' },
    { key:'environment',   label:'Environment', type:'select',
      options:['remote','in-person','field'],
      desc:'Where the scenario occurs; changes constraints and data needs.' },
    { key:'devices',       label:'Devices / OS / browsers (optional)', type:'textarea',
      ph:'Desktop Chrome 123; iOS 16 Safari; Android 13 Chrome; barcode scanner',
      desc:'Specify setups relevant to the scenario(s).' },

    /* Scenario style & controls */
    { key:'scenario_style', label:'Primary scenario style', type:'select',
      options:['transaction (happy path)','discovery (find/figure-out)','recovery (error/edge)','configuration/setup','comprehension/navigation','cross-channel (physical↔digital)'],
      desc:'Shapes the goal framing and observation targets.' },
    { key:'tasks_count',   label:'# of scenarios to generate', type:'select',
      options:['3','4','5','6','7','8','custom'],
      desc:'Target count for output.' },
    { key:'complexity_mix',label:'Complexity mix', type:'select',
      options:['mixed (default)','mostly easy','mostly medium','mostly hard'],
      desc:'Overall difficulty balance across scenarios.' },
    { key:'counterbalance',label:'Task ordering strategy', type:'select',
      options:['fixed order','counterbalanced','randomized (independent)'],
      desc:'Reduce order effects where tasks are independent.' },

    /* Comparability options */
    { key:'comparison_mode', label:'Comparability', type:'select',
      options:['none','A/B versions','competitive benchmark'],
      desc:'Generates comparable wording and shared success metrics.' },

    /* Scenario ingredients */
    { key:'starting_state',label:'Starting state', type:'text', ph:'e.g., Logged in on Dashboard; cart has 2 items', desc:'Where the participant begins.' },
    { key:'prereqs',       label:'Prerequisites / test data', type:'textarea',
      ph:'accounts, permissions, seeded records, mock payment card',
      desc:'Ensure each scenario is actually completable.' },
    { key:'constraints',   label:'Constraints', type:'textarea',
      ph:'time/budget/device rules; do not use search; no external help',
      desc:'Realistic guardrails that surface risk.' },

    /* Acceptance gates */
    { key:'success',       label:'Success criteria (pass)', type:'textarea',
      ph:'Observable end-states; files created; state changed',
      desc:'Binary pass definition per scenario.' },
    { key:'partial',       label:'Partial success (optional)', type:'textarea',
      ph:'e.g., draft saved but wrong format/date',
      desc:'Acceptable-but-imperfect outcomes.' },
    { key:'fail',          label:'Fail conditions', type:'textarea',
      ph:'e.g., cannot submit; ends in loop; error with no recovery',
      desc:'Explicit fail states remove ambiguity.' },

    /* Variants & accessibility */
    { key:'recovery_variant', label:'Recovery/edge-case variant (optional)', type:'textarea',
      ph:'invalid input; empty state; offline; permission denied',
      desc:'Plan at least one resilience test.' },
    { key:'accessibility_path', label:'Accessibility path (optional)', type:'select',
      options:['none','keyboard-only','screen reader','high zoom/contrast'],
      desc:'Add an inclusive path to the scenario(s).' },
    { key:'reading_level', label:'Reading level', type:'select',
      options:['6th grade','8th grade','10th grade','12th grade','professional'],
      desc:'Target clarity for scenario copy.' },
    { key:'localization',  label:'Localization scope', type:'select',
      options:['none','1–3 languages','4–10 languages','>10 languages'],
      desc:'Impacts copy style and QA plan.' },

    /* Observation & policy */
    { key:'assist_policy', label:'Assistance (hint ladder)', type:'select',
      options:['no assistance','ladder: restate goal → point region → reveal path','custom'],
      desc:'Define when/how to help; assisted passes must be logged.' },
    { key:'observation_focus', label:'Observation targets', type:'textarea',
      ph:'first-click, label interpretation, path deviations, error/recovery, confidence cues',
      desc:'What to watch closely during each scenario.' },
    { key:'timebox',       label:'Timebox (optional)', type:'text',
      ph:'e.g., ~2 min per task if realistic',
      desc:'Only add if time pressure is true to life.' },

    /* Measurement & analysis */
    { key:'include_seq',   label:'Add SEQ (1–7) after each task?', type:'select', options:['yes','no'] },
    { key:'include_confidence', label:'Ask confidence (0–10)?', type:'select', options:['yes','no'] },
    { key:'klm_detail',    label:'Micro-timing detail', type:'select',
      options:['none','KLM-lite (major operators)','full KLM cues (K/P/H/M/R)'],
      desc:'Adds time-estimation prompts per step when selected.' },
    { key:'first_click',   label:'Track first-click accuracy/time?', type:'select', options:['yes','no'] },

    /* Language guardrails */
    { key:'avoid_ui_terms',label:'UI terms to avoid (path giveaways)', type:'textarea',
      ph:'gear icon; “Export” menu; “Settings” tab',
      desc:'Keeps scenarios neutral and outcome-focused.' },

    /* Pre/Post prompts (optional text the AI will include verbatim) */
    { key:'pre_task_prompts',  label:'Pre-task questions (optional)', type:'textarea', ph:'recent use; mental model; expectations', desc:'Short warm-ups before first task.' },
    { key:'post_task_prompts', label:'Post-task questions (optional)', type:'textarea', ph:'What were you expecting? What made it a [SEQ]?', desc:'Keep neutral; avoid blame.' },

    /* Evidence logging */
    { key:'logging_notes', label:'Evidence logging', type:'textarea',
      ph:'events, timestamps, screenshots, quotes schema',
      desc:'How note-takers should capture evidence.' },

    /* Bias & ethics (library shape) */
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    }
  ],
  boosters: [
    'Describe outcomes, not clicks; avoid UI labels and brand-loaded terms.',
    'Anchor tasks in real context and constraints; short scenario text, long prep behind the scenes.',
    'Seed data/permissions/states so success is possible; script edge states intentionally.',
    'Define pass/partial/fail before testing; no vibe-based judgment.',
    'Include at least one recovery/edge-case path to test resilience.',
    'Plan accessibility paths (keyboard-only or screen reader) when relevant.',
    'Use HTA to break tasks into steps; tag micro-actions and decisions (add KLM cues if selected).',
    'Counterbalance task order where independent; otherwise justify fixed order.',
    'Set a clear assistance policy and mark assisted vs. unassisted passes.',
    'Keep language at the chosen reading level; localize idiom-free.',
    'For A/B or competitive modes, keep scenario wording and metrics identical across conditions.'
  ],
  template: (f)=>{
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    const modalityMap = {
      'digital': 'Modality: Digital — emphasize first-click, navigation, labels, and error/recovery states.',
      'physical': 'Modality: Physical — include device handling, reach/visibility, handoffs, and environmental constraints.',
      'hybrid': 'Modality: Hybrid — plan for physical→digital handoffs (e.g., scanning, Bluetooth, camera permissions).'
    };
    const styleMap = {
      'transaction (happy path)': 'Scenario style: Transaction — straightforward completion on a realistic “happy path.”',
      'discovery (find/figure-out)': 'Scenario style: Discovery — avoid hinting that a specific feature exists; watch wayfinding.',
      'recovery (error/edge)': 'Scenario style: Recovery — inject an error or ambiguous state; observe diagnosis and recovery.',
      'configuration/setup': 'Scenario style: Configuration — multi-step setup with prerequisites and confirmation.',
      'comprehension/navigation': 'Scenario style: Comprehension/Navigation — read-to-answer or first-click navigation goals.',
      'cross-channel (physical↔digital)': 'Scenario style: Cross-channel — cover physical→digital handoffs (codes, pairing, signage).'
    };
    const orderMap = {
      'fixed order': 'Ordering: Fixed — order is intentional due to narrative or dependencies.',
      'counterbalanced': 'Ordering: Counterbalanced — alternate task sequences across participants.',
      'randomized (independent)': 'Ordering: Randomized — shuffle independent tasks to reduce order effects.'
    };
    const assistMap = {
      'no assistance': 'Assistance policy: none — only independent outcomes are passes.',
      'ladder: restate goal → point region → reveal path': 'Assistance policy: laddered hints — log level used (L1 restate, L2 point, L3 reveal).',
      'custom': 'Assistance policy: custom — specify hint levels in the protocol.'
    };
    const accMap = {
      'keyboard-only': 'Accessibility path: keyboard-only — ensure focus order, visible focus, and no trap states.',
      'screen reader': 'Accessibility path: screen reader — rely on landmarks, names, roles, and proper announcements.',
      'high zoom/contrast': 'Accessibility path: high zoom/contrast — verify reflow, contrast, and color independence.'
    };
    const compareMap = {
      'A/B versions': 'Comparability: A/B — keep identical scenario wording, data, and success metrics across versions.',
      'competitive benchmark': 'Comparability: Competitive — run identical tasks across products; report task-level winners and tradeoffs.'
    };
    const klmMap = {
      'KLM-lite (major operators)': 'Micro-timing: KLM-lite — estimate time for major operators and note latency thresholds.',
      'full KLM cues (K/P/H/M/R)': 'Micro-timing: Full KLM — include K/P/H/M/R cues and expected bounds.'
    };

    const lines = [
      'Create 3–8 usability task scenarios with step and micro-action breakdowns.',
      f.product_area && `Product area: ${f.product_area}`,
      f.objectives && `User objectives:\n${f.objectives}`,
      f.persona_context && `Persona/segment refs:\n${f.persona_context}`,
      f.audience_persona && `Personas: ${list(f.audience_persona)}`,

      f.modality && modalityMap[f.modality],
      f.environment && `Environment: ${f.environment}`,
      f.devices && `Devices/OS/browsers:\n${f.devices}`,

      f.scenario_style && styleMap[f.scenario_style],
      f.tasks_count && `Scenarios to generate: ${f.tasks_count}`,
      f.complexity_mix && `Complexity mix: ${f.complexity_mix}`,
      f.counterbalance && orderMap[f.counterbalance],
      f.comparison_mode && compareMap[f.comparison_mode],

      f.starting_state && `Starting state: ${f.starting_state}`,
      f.prereqs && `Prerequisites / test data:\n${f.prereqs}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      f.success && `Success criteria (pass):\n${f.success}`,
      f.partial && `Partial success:\n${f.partial}`,
      f.fail && `Fail conditions:\n${f.fail}`,

      f.recovery_variant && `Recovery/edge-case variant:\n${f.recovery_variant}`,
      (f.accessibility_path && f.accessibility_path !== 'none') && accMap[f.accessibility_path],
      f.reading_level && `Reading level: ${f.reading_level}`,
      f.localization && `Localization: ${f.localization}`,

      f.assist_policy && assistMap[f.assist_policy],
      f.observation_focus && `Observation targets:\n${f.observation_focus}`,
      f.timebox && `Timebox: ${f.timebox}`,
      (f.include_seq === 'yes') && 'Measurement: Add SEQ (1–7) after each task with “What made it a [score]?”',
      (f.include_confidence === 'yes') && 'Measurement: Ask perceived confidence (0–10) after each task.',
      (f.first_click === 'yes') && 'Measurement: Track first-click accuracy and time to first interaction.',
      (f.klm_detail && f.klm_detail !== 'none') && klmMap[f.klm_detail],

      f.avoid_ui_terms && `Avoid UI terms:\n${f.avoid_ui_terms}`,
      f.pre_task_prompts && `Pre-task questions:\n${f.pre_task_prompts}`,
      f.post_task_prompts && `Post-task questions:\n${f.post_task_prompts}`,
      f.logging_notes && `Evidence logging:\n${f.logging_notes}`,
      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,

      [
        'Output format (for each scenario):',
        '- Title',
        '- Scenario text (2–3 sentences, user language, no UI labels)',
        '- Starting state · Prereqs/Test data · Constraints',
        '- Success / Partial / Fail criteria',
        '- Recovery/Edge-case variant (if provided)',
        '- Accessibility path notes (if selected)',
        '- Step breakdown (HTA): Step 1… Step 2… Step 3…',
        '- Micro-actions & cognition to watch (scan → decide → act → evaluate)',
        '- (If KLM selected) Operator cues and expected latency bounds',
        '- Observation targets (first-click, errors, recovery, confidence cues)',
        '- Assistance note (if hints used: level L1/L2/L3)',
        '- Post-task prompts (SEQ/Confidence if enabled) and notes'
      ].join('\n')
    ];

    return lines.filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: User Flow — Audit — Design (enhanced)
--------------------------------------------------------- */
{
  id: 'task_user_flow_audit',
  slug: 'user-flow-audit',
  label: 'User Flow — Audit — Design',
  kind: 'task',
  categories: ['ux','design','evaluation','analysis'],
  tags: [
    'type:task',
    'topic:user-flow',
    'topic:journey',
    'topic:task-flow',
    'topic:service-blueprint',
    'use:audit',
    'use:design',
    'use:edit',
    'stage:review'
  ],
  use_cases: [
    'identify friction and drop-off in a key flow',
    'map steps, states, decisions, and detours (incl. empty/error states)',
    'flag usability, content, and accessibility issues',
    'design an ideal-state flow with recovery paths and acceptance criteria',
    'create a service-blueprint view (front-stage/back-stage)',
    'define an event map and instrumentation gaps',
    'prioritize fixes by severity × reach × business impact',
    'localize copy/flows and plan accessibility-first paths',
    'package recommendations for execs, PM/Design/Eng, and CX',
    'align story slices (user stories) to flow states and acceptance criteria',
    'compare current vs. proposed flow performance against KPIs/guardrails',
    'plan experiments (copy/order/component) tied to flow instrumentation'
  ],
  definition: 'Audit and redesign a user flow. Produce a current-state map with annotated pain points and evidence, then propose an ideal-state design with acceptance criteria, event instrumentation, accessibility/localization notes, and ranked recommendations that tie to KPIs.',
  help: 'Link the flow (Figma, video, live) and add current metrics. Pick frameworks (heuristics, journey lens, blueprint), journey scope (before/during/after or end-to-end), notation, priority model, and deliverables so guidance adapts. Use personas and bias checks to keep language inclusive and decisions user-centered.',
  fields: [
    /* Scope & links */
    { key:'flow',             label:'Flow name / link', type:'text', ph:'e.g., Sign up → Verify → Create workspace (Figma/URL)' },
    { key:'goal',             label:'Primary user goal', type:'text', ph:'What the user is trying to achieve, in their words' },
    { key:'decision',         label:'Decision to inform', type:'text', ph:'What will this audit/design help decide?', desc:'Design backwards from the decision to focus the work.' },

    /* Journey breadth */
    { key:'journey_scope',    label:'Journey scope', type:'select',
      options:['before (pre-product)','during (in-product)','after (post-product/support)','end-to-end'],
      desc:'Sets lanes and channels to include in the mapping.' },

    /* Audience & segments */
    { key:'audience_persona', label:'Personas / segments (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Who this flow must serve; informs language, defaults, and paths.',
      ph:'e.g., New Admin; Power User; Procurement' },

    /* Channels & platforms */
    { key:'channels',         label:'Channels', type:'textarea', ph:'web, app, email, SMS, support, docs, sales', desc:'Cross-channel touchpoints relevant to this flow.' },
    { key:'platforms',        label:'Platforms / devices', type:'textarea', ph:'Web (Chrome/Safari), iOS/Android, Email, Support portal', desc:'Where the flow lives; affects constraints.' },

    /* Flow shape */
    { key:'entry',            label:'Entry points', type:'textarea', ph:'deep link, email CTA, search, navigation path', desc:'Where users arrive from (multi-channel included).' },
    { key:'exits',            label:'Exits', type:'textarea', ph:'success states, cancel/save, external handoffs', desc:'All ways out, good or bad.' },
    { key:'scope',            label:'Scope / variants', type:'textarea', ph:'happy path + key branches; platform variants', desc:'Name what’s in/out to avoid map sprawl.' },

    /* Current-state evidence */
    { key:'metrics',          label:'Current metrics', type:'textarea', ph:'conversion %, step drop-off, avg time, error rates', desc:'Add segment cuts if available.' },
    { key:'kpis',             label:'Target KPIs / guardrails', type:'textarea', ph:'activation %, step-3 drop-off, chargeback rate, CSAT', desc:'What success must move or protect.' },
    { key:'friction',         label:'Hypothesized friction', type:'textarea', ph:'where and why users get stuck', desc:'Seed hypotheses to confirm/refute.' },
    { key:'evidence',         label:'Evidence links (optional)', type:'textarea', ph:'session replays, support tickets, research notes' },

    /* Map ingredients */
    { key:'state_inventory',  label:'State inventory (screens/states)', type:'textarea', ph:'screen list incl. loading, empty, error, success', desc:'Name every state that appears in the flow.' },
    { key:'decision_rules',   label:'Decision points & rules', type:'textarea', ph:'conditions, branching logic, validation gates' },
    { key:'edge_paths',       label:'Edge & recovery paths', type:'textarea', ph:'undo, retry, offline, permissions, expired links' },
    { key:'backstage',        label:'Back-stage processes', type:'textarea', ph:'emails, webhooks, queues, verification services', desc:'For blueprinting (system/ops lanes).' },
    { key:'dependencies',     label:'Dependencies', type:'textarea', ph:'integrations, feature flags, rate limits', desc:'Systems and toggles that affect the flow.' },

    /* Copy & a11y */
    { key:'copy_notes',       label:'Copy & content notes', type:'textarea', ph:'labels, help, error messages, tone risks' },
    { key:'a11y_scope',       label:'Accessibility scope', type:'select', options:['keyboard-only','screen reader','high contrast/zoom','multi-language inputs','none'], desc:'Which inclusive paths to design/audit now.' },
    { key:'localization',     label:'Localization scope', type:'select', options:['none','1–3 languages','4–10 languages','>10 languages'], desc:'Impacts copy length, formats, date/number.' },

    /* Frameworks & notation */
    { key:'framework',        label:'Evaluation framework', type:'select',
      options:['Nielsen/Norman heuristics','Gov.UK/USWDS heuristics','ISO 9241-110 (dialog principles)','Cognitive walkthrough','Journey lens (stage × emotion)','Service blueprint (swimlanes)'],
      desc:'Choose the primary lens for the audit.' },
    { key:'notation',         label:'Notation', type:'select',
      options:['FSM (states/transitions)','BPMN-lite','Journey map lanes','Service blueprint'],
      desc:'Shapes the map structure and labels.' },

    /* Instrumentation */
    { key:'events_tracked',   label:'Events tracked (today)', type:'textarea', ph:'signup_start, email_sent, verify_success, billing_error' },
    { key:'instrument_gaps',  label:'Instrumentation gaps', type:'textarea', ph:'missing events, indistinguishable errors, no step IDs' },
    { key:'experiment_hooks', label:'Experiment hooks (optional)', type:'textarea', ph:'copy variants, component swaps, order tests', desc:'Where to A/B and how you’ll detect outcomes.' },

    /* Acceptance & stories */
    { key:'acceptance_style', label:'Acceptance style', type:'select',
      options:['Gherkin (Given/When/Then)','Checklist (per step)','Quant guardrails (targets/thresholds)'],
      desc:'How acceptance will be expressed in the deliverable.' },
    { key:'story_slices',     label:'User stories (optional)', type:'textarea', ph:'As a [persona], I want [goal], so that [value]', desc:'Story seeds tied to flow states.' },

    /* Prioritization */
    { key:'severity_scale',   label:'Severity scale', type:'select', options:['Blocker/High/Medium/Low','1–5','custom'] },
    { key:'priority_model',   label:'Priority model', type:'select',
      options:['Severity × Reach × Impact (tempered by Confidence)','ICE (Impact, Confidence, Ease)','RICE-like (Reach, Impact, Confidence, Effort)'] },
    { key:'impact_domains',   label:'Impact domains', type:'textarea', ph:'activation, conversion, retention, trust, cost to serve, risk' },
{
  key: 'effort_scale',
  label: 'Effort estimate scale',
  type: 'select',
  options: [
    't-shirt (S/M/L/XL)',
    't-shirt (XS/S/M/L/XL)',
    'three-point (S/M/L)',
    '1–5',
    'story points - Fibonacci',
    'story points - modified Fibonacci',
    'powers of 2 (1,2,4,8)',
    'bucketed hours',
    'ideal hours',
    'rough eng-days',
    'full-time weeks',
    'complexity bands (low/med/high)'
  ],
  desc: 'Pick one sizing scheme so recommendations can be ranked and compared consistently across items.',
  ph: 'Select a sizing scheme'
},

    /* Deliverables */
    { key:'deliverables',     label:'Deliverables', type:'select',
      options:[
        'current-state map (annotated)',
        'issues list (severity, heuristic, evidence)',
        'ideal-state flow (proposed)',
        'service blueprint view',
        'state inventory (with empty/error variants)',
        'event map (with gaps)',
        'acceptance criteria per step',
        'executive TL;DR + roadmap slice'
      ],
      desc:'Pick the main artifact to emphasize.' },

    /* Ownership & timing */
    { key:'owners',           label:'Owner teams / people', type:'textarea', ph:'e.g., Growth PM; Billing Eng; Design Systems', desc:'Who will act on recommendations.' },
    { key:'timeline',         label:'Timeline', type:'text', ph:'e.g., Q3 release; 2-sprint implementation window' },

    /* Bias & ethics library (exact shape) */
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    },

    /* Constraints */
    { key:'constraints',      label:'Constraints', type:'textarea', ph:'tech/legal limits, timelines, brand rules' }
  ],
  boosters: [
    'Map every state, including loading, empty, and error; real flows fail in the margins.',
    'Name decisions in user language and show rules; vague diamonds hide work.',
    'Design recovery: undo, retry, drafts, and safe exits reduce risk and support load.',
    'Pair quant (drop-off, time) with qual (replays, quotes); prioritize by severity × reach × business impact.',
    'Draft microcopy with tone and next-step guidance; error text is a design surface.',
    'Instrument the flow: unique step IDs, success/fail pairs, and error classes.',
    'Blueprint backstage: emails/queues/3rd-party calls and their failure modes.',
    'Localize early; budget for longer strings and different formats.',
    'Accessibility-first: keyboard path, SR announcements, contrast/zoom; recruit users with AT for validation.',
    'Package recommendations with effort and owner; convert top items to tickets with acceptance criteria.'
  ],
  template: (f)=>{
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    const frameworkNote = (() => {
      switch (f.framework) {
        case 'Nielsen/Norman heuristics':
          return 'Framework: Heuristics — rate clarity, control, consistency, feedback, error prevention, recognition vs. recall.';
        case 'Gov.UK/USWDS heuristics':
          return 'Framework: GOV/USWDS — plain language, task-based journeys, inclusive design, resilience.';
        case 'ISO 9241-110 (dialog principles)':
          return 'Framework: ISO 9241-110 — suitability for the task, self-descriptiveness, controllability, conformity with expectations, error tolerance, suitability for learning.';
        case 'Cognitive walkthrough':
          return 'Framework: Cognitive walkthrough — ask: will first-time users know what to do, see how to do it, and understand the outcome?';
        case 'Journey lens (stage × emotion)':
          return 'Framework: Journey lens — map stages, moments of truth, and emotions; fix the worst moments first.';
        case 'Service blueprint (swimlanes)':
          return 'Framework: Blueprint — front-stage steps aligned with back-stage systems and policies; highlight handoff risks.';
        default:
          return null;
      }
    })();

    const journeyNote = (() => {
      switch (f.journey_scope) {
        case 'before (pre-product)': return 'Journey scope: Pre-product — include acquisition/expectation setting (ads, sales, docs) and eligibility gates.';
        case 'during (in-product)': return 'Journey scope: In-product — focus on on-screen states, decisions, and recovery inside the app.';
        case 'after (post-product/support)': return 'Journey scope: Post-product — include confirmations, emails, fulfillment, billing/support, and churn loops.';
        case 'end-to-end': return 'Journey scope: End-to-end — stitch pre/during/post across channels; call out moments of truth and handoffs.';
        default: return null;
      }
    })();

    const notationNote = (() => {
      switch (f.notation) {
        case 'FSM (states/transitions)': return 'Notation: FSM — list states and transitions; include empty/loading/error variants and retry loops.';
        case 'BPMN-lite': return 'Notation: BPMN-lite — swimlanes for user/system, gateways for decisions, and events for handoffs.';
        case 'Journey map lanes': return 'Notation: Journey lanes — stages × channels × emotions; evidence pins per lane.';
        case 'Service blueprint': return 'Notation: Service blueprint — front-stage vs. back-stage lanes; policies and SLAs as constraints.';
        default: return null;
      }
    })();

    const a11yNote = (() => {
      switch (f.a11y_scope) {
        case 'keyboard-only': return 'A11y: Verify complete keyboard path, logical focus order, visible focus, no traps.';
        case 'screen reader': return 'A11y: Check names/roles/states, landmarks, announcements, and error messaging.';
        case 'high contrast/zoom': return 'A11y: Test 200% zoom/reflow, contrast ratios, and color independence.';
        case 'multi-language inputs': return 'A11y: Validate input masks, RTL/LTR handling, date/number locale formats.';
        default: return null;
      }
    })();

    const priorityNote = (() => {
      switch (f.priority_model) {
        case 'Severity × Reach × Impact (tempered by Confidence)':
          return 'Priority: Score issues by severity × reach × business impact; temper by confidence.';
        case 'ICE (Impact, Confidence, Ease)':
          return 'Priority: ICE — rank recommendations by impact, confidence, and ease of implementation.';
        case 'RICE-like (Reach, Impact, Confidence, Effort)':
          return 'Priority: RICE-like — include reach and effort for roadmap balance.';
        default: return null;
      }
    })();

    const acceptanceNote = (() => {
      switch (f.acceptance_style) {
        case 'Gherkin (Given/When/Then)': return 'Acceptance: Use Given/When/Then per step/state transition with success and error outcomes.';
        case 'Checklist (per step)': return 'Acceptance: Checklist — per step criteria for success, error messaging, and recovery availability.';
        case 'Quant guardrails (targets/thresholds)': return 'Acceptance: Quant guardrails — targets for success %, time on step, and error rate with alert thresholds.';
        default: return null;
      }
    })();
    
// One-sentence “how to apply it” note per scale
const effortNote = (() => {
  switch (f.effort_scale) {
    case 't-shirt (S/M/L/XL)':
      return 'Effort Scale: Use relative sizes (S, M, L, XL) to compare scope quickly and split L or XL into smaller pieces.';
    case 't-shirt (XS/S/M/L/XL)':
      return 'Effort Scale: Use XS for trivial tasks and S through XL for larger ones, keeping sizing strictly relative rather than time-based.';
    case 'three-point (S/M/L)':
      return 'Effort Scale: Triage fast with S, M, or L using clear team examples for each band to keep sizing consistent.';
    case '1–5':
      return 'Effort Scale: Score 1 (trivial) to 5 (very high) using a shared rubric and apply it consistently across the backlog.';
    case 'story points - Fibonacci':
      return 'Effort Scale: Assign 1, 2, 3, 5, 8, or 13 as relative complexity after discussion, avoiding direct time mapping.';
    case 'story points - modified Fibonacci':
      return 'Effort Scale: Use 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100 to surface very large items that likely need breaking down.';
    case 'powers of 2 (1,2,4,8)':
      return 'Effort Scale: Choose 1, 2, 4, or 8 where each step roughly doubles effort, discouraging false precision.';
    case 'bucketed hours':
      return 'Effort Scale: Pick a bucket like 1–2h, half-day, 1d, 2–3d, or 1w based on focused work time only.';
    case 'ideal hours':
      return 'Effort Scale: Estimate hands-on work hours excluding meetings and blockers, then round to simple values.';
    case 'rough eng-days':
      return 'Effort Scale: Estimate approximate engineer-days of focused work per item and round to halves for comparability.';
    case 'full-time weeks':
      return 'Effort Scale: Size in 0.5w, 1w, 2w, or 3w+ at your team’s typical pace to highlight epics versus stories.';
    case 'complexity bands (low/med/high)':
      return 'Effort Scale: Mark Low, Medium, or High based on integrations, ambiguity, and unknowns to flag where spikes may be needed.';
    default:
      return null;
  }
})();


    return [
      'Audit and redesign the specified user flow.',
      f.flow && `Flow: ${f.flow}`,
      f.goal && `Primary user goal: ${f.goal}`,
      f.decision && `Decision to inform: ${f.decision}`,

      f.journey_scope && journeyNote,
      f.channels && `Channels:\n${f.channels}`,
      f.platforms && `Platforms/devices:\n${f.platforms}`,
      f.audience_persona && `Personas/segments: ${list(f.audience_persona)}`,

      f.entry && `Entry points:\n${f.entry}`,
      f.exits && `Exits:\n${f.exits}`,
      f.scope && `Scope / variants:\n${f.scope}`,

      f.metrics && `Current metrics:\n${f.metrics}`,
      f.kpis && `Target KPIs / guardrails:\n${f.kpis}`,
      f.friction && `Hypothesized friction:\n${f.friction}`,
      f.evidence && `Evidence links:\n${f.evidence}`,

      f.state_inventory && `State inventory:\n${f.state_inventory}`,
      f.decision_rules && `Decision points & rules:\n${f.decision_rules}`,
      f.edge_paths && `Edge & recovery paths:\n${f.edge_paths}`,
      f.backstage && `Back-stage processes:\n${f.backstage}`,
      f.dependencies && `Dependencies:\n${f.dependencies}`,

      f.copy_notes && `Copy/content notes:\n${f.copy_notes}`,
      f.a11y_scope && a11yNote,
      f.localization && `Localization: ${f.localization}`,

      f.framework && frameworkNote,
      f.notation && notationNote,

      f.events_tracked && `Events tracked (today):\n${f.events_tracked}`,
      f.instrument_gaps && `Instrumentation gaps:\n${f.instrument_gaps}`,
      f.experiment_hooks && `Experiment hooks:\n${f.experiment_hooks}`,

      f.acceptance_style && acceptanceNote,
      f.story_slices && `User stories:\n${f.story_slices}`,

      f.severity_scale && `Severity scale: ${f.severity_scale}`,
      f.priority_model && priorityNote,
      f.impact_domains && `Impact domains:\n${f.impact_domains}`,
      f.effort_scale && `Effort estimate scale: ${f.effort_scale}`,

      f.deliverables && `Deliverables: ${f.deliverables}`,
      f.owners && `Owner teams/people:\n${f.owners}`,
      f.timeline && `Timeline: ${f.timeline}`,

      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      [
        'Output format:',
        '- Current-state map (steps · states · decisions · evidence annotations)',
        '- Issues list (severity · reach · impact · heuristic · links)',
        '- Ideal-state flow (screens/states, decision rules, recovery paths)',
        '- Service blueprint view (front-stage/back-stage) if selected',
        '- Copy & A11y notes (errors, labels, announcements, contrast/zoom)',
        '- Event map (tracked vs. gaps, step IDs, success/fail pairs)',
        '- Acceptance (per selected style) tied to KPIs/guardrails',
        '- Recommendations (ranked with effort scale; owners & next steps)',
        '- Executive TL;DR + roadmap slice (if selected)'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: UX Microcopy — Write (enhanced)
--------------------------------------------------------- */
{
  id: 'task_microcopy_write',
  slug: 'ux-microcopy-write',
  label: 'UX Microcopy — Write',
  kind: 'task',
  categories: ['ux','content','writing','design'],
  tags: [
    'type:task',
    'topic:microcopy',
    'topic:content-design',
    'topic:accessibility',
    'topic:localization',
    'use:write',
    'use:design',
    'use:edit',
    'use:critique',
    'stage:design'
  ],
  use_cases: [
    'write buttons, labels, help text, errors, empty states, tooltips, toasts, permissions, notifications, upgrade/paywall copy',
    'improve clarity, confidence, and conversion with ethical persuasion',
    'align microcopy with brand voice, value prop, and the user’s moment',
    'produce alt variants for A/B testing with constraints (tokens, char limits, localization)',
    'tailor copy for personas/segments and accessibility paths (keyboard/screen reader)',
    'rewrite confusing or long strings to reduce error/abandon rates',
    'localize-ready copy with variables and ICU notes',
    'critique existing copy against heuristics (clarity, actionability, honesty, a11y)'
  ],
  definition: 'Draft and refine user-focused microcopy with clear intent, value-forward messaging, and ethical persuasion. Outputs variant options with rationale, accessibility/localization notes, experiment hypotheses, and acceptance criteria for implementation.',
  help: 'Paste screenshots or DOM snippets and describe the user moment. Select surface, platform, tone, target action, and constraints (tokens, char limits, locales). Use personas and the bias library to keep language inclusive and avoid dark patterns.',
  fields: [
    /* Mode & objective */
    { key:'editor_mode',   label:'Mode', type:'select', options:['write net-new','edit existing','critique-only'], desc:'Choose how the AI should engage with your copy.' },
    { key:'existing_copy', label:'Existing copy (if editing/critique)', type:'textarea', ph:'Paste current strings and where they appear', desc:'Used when editing or critiquing.' },

    /* Context & objective */
    { key:'context',        label:'Context / screenshot link', type:'textarea', ph:'URL(s), screenshots, DOM snippet, where this appears', desc:'Give enough context to understand the moment and constraints.' },
    { key:'moment',         label:'User moment & goal', type:'textarea', ph:'What the user is trying to do; risks/concerns; urgency', desc:'User language shapes tone and message priority.' },
    { key:'desired_action', label:'Desired user action (CTA outcome)', type:'text', ph:'e.g., Start free trial (14 days), Send invoice, Confirm email', desc:'The concrete behavior this copy should cause.' },

    /* Audience */
    { key:'persona_context', label:'Persona/segment refs (optional)', type:'textarea', ph:'@Persona: Admin Alice; @Segment: SMB Paid', desc:'Short references to existing personas/segments.' },
    { key:'audience_persona', label:'Personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Select personas to tune vocabulary and risk messaging.',
      ph:'e.g., New Admin; Finance Manager; Mobile-first Seller' },

    /* Platform & surface */
    { key:'platform',      label:'Platform', type:'select', options:['web','iOS','Android','desktop app','email','SMS/push'], desc:'Alters constraints (length, tone, link styles).' },
    { key:'surface',        label:'Surface', type:'select',
      options:['buttons','CTAs (primary)','links','labels','helper text','errors','empty states','tooltips','toasts','banners','modals','confirmation','permissions','notifications','forms','upgrade/paywall'],
      desc:'Surface type changes patterns, constraints, and acceptance criteria.' },
    { key:'state',          label:'UI state (optional)', type:'select',
      options:['default','loading','disabled','success','warning','error','info'],
      desc:'State can alter copy and ARIA announcements.' },

    /* Message architecture */
    { key:'value_prop',     label:'Value prop (this moment)', type:'textarea', ph:'Who it’s for • What it does • Why better • What changes', desc:'One or two lines max; keep it concrete and specific.' },
    { key:'proof_points',   label:'Proof points / risk reversal (optional)', type:'textarea', ph:'numbers, guarantees, no-CC, cancel anytime', desc:'Only what’s relevant to this surface.' },

    /* Tone & style */
    { key:'tone_primary',   label:'Tone', type:'select',
      options:['clear','friendly','confident','reassuring','neutral','playful','formal','trustworthy','urgent (ethical)'] },
    { key:'tone_secondary', label:'Tone (2nd, optional)', type:'select',
      options:['— none —','clear','friendly','confident','reassuring','neutral','playful','formal','trustworthy','urgent (ethical)'] },
    { key:'reading_level',  label:'Reading level', type:'select', options:['6th grade','8th grade','10th grade','12th grade','professional'], desc:'Keep simple unless a specialized audience requires otherwise.' },

    /* Variables & constraints */
    { key:'variables',      label:'Variables/placeholders (optional)', type:'textarea', ph:'{first_name}, {count}, {date}, {price}', desc:'List tokens and intended formats; we’ll protect grammar and spacing.' },
    { key:'string_key',     label:'i18n string key (optional)', type:'text', ph:'e.g., cta.start_trial', desc:'If you maintain a string table.' },
    { key:'limit',          label:'Character/line limit', type:'text', ph:'e.g., ≤28 chars on primary button; 2 lines max', desc:'Implementation tokens and truncation rules.' },

    /* Localization & intl */
    { key:'localization',   label:'Localization scope', type:'select', options:['none','1–3 languages','4–10 languages','>10 languages'], desc:'Affects idioms, lengths, date/number formats.' },
    { key:'reading_direction', label:'Reading direction (if localized)', type:'select', options:['LTR','RTL','BiDi (mixed)'], desc:'Impacts punctuation, ordering, and iconography.' },
    { key:'icu_notes',      label:'ICU/pluralization notes (optional)', type:'textarea', ph:'{count, plural, one {item} other {items}}', desc:'Indicate plural/gender/ordinal needs.' },

    /* Do/Dont language */
    { key:'do_words',       label:'Words to include', type:'textarea', ph:'canonical terms, product names, user vocabulary', desc:'Consistency improves comprehension and trust.' },
    { key:'dont_words',     label:'Words to avoid', type:'textarea', ph:'banned or risky terms, internal jargon', desc:'Prevent confusion or legal risk.' },

    /* Accessibility & implementation */
    { key:'a11y_notes',     label:'Accessibility notes (optional)', type:'textarea', ph:'ARIA-live for toasts; keyboard path; focus order; SR text', desc:'State how dynamic changes are announced; avoid color-only signals.' },
    { key:'sr_only',        label:'Screen-reader only text (optional)', type:'textarea', ph:'Additional context not visible to sighted users', desc:'Use for clarifying icon-only or stateful actions.' },
    { key:'aria_role',      label:'ARIA role/landmark (optional)', type:'text', ph:'role="alertdialog", aria-live="polite"', desc:'For implementers to wire correctly.' },

    /* Ethics, compliance & bias */
    { key:'regulatory_region', label:'Compliance region (if applicable)', type:'select', options:['none','US','EU (GDPR)','UK','CA','AU','Other'], desc:'May change consent/claims tone and disclosures.' },
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    },
    { key:'dark_pattern_check', label:'Dark-pattern guard', type:'select', options:['on','off'], desc:'When “on”, enforce ethical persuasion and call out risks.' },

    /* Experimentation & measurement */
    { key:'variant_count',  label:'How many variants?', type:'select', options:['3','5'], desc:'Number of options to generate (A/B/C…).' },
    { key:'rationale_depth',label:'Rationale depth', type:'select', options:['brief (1 line)','standard (2–3 lines)'], desc:'Controls explanation length per option.' },
    { key:'ab_hypothesis',  label:'A/B hypothesis (optional)', type:'text', ph:'If we [change], [metric] will improve because [reason]', desc:'Pre-register intent to avoid p-hacking.' },
    { key:'success_metric', label:'Success metric (optional)', type:'text', ph:'e.g., task success, form errors ↓, CTR→conversion', desc:'Tie copy to a measurable outcome.' },
    { key:'event_keys',     label:'Instrumentation keys (optional)', type:'textarea', ph:'events: cta_click, form_error; props: variant_id', desc:'So variants are trackable post-implementation.' },

    /* Fallbacks & governance */
    { key:'fallback_copy',  label:'Fallback state copy (optional)', type:'textarea', ph:'What to show if service fails or data is missing', desc:'Resilience text for degraded modes.' },
    { key:'brand_voice',    label:'Brand voice notes (optional)', type:'textarea', ph:'Voice & tone matrix, term dictionary, capitalization rules' },
    { key:'constraints',    label:'Other constraints', type:'textarea', ph:'compliance/legal, privacy, platform tokens, banned claims' }
  ],
  boosters: [
    'Write for the user’s moment and desired outcome; the element is incidental.',
    'Use verb + object for CTAs; say what happens next.',
    'Replace adjectives with specifics (numbers, timeframes, guarantees).',
    'For errors: state what happened, why (if known), and how to fix it.',
    'For empty states: explain value, first step, and show an example.',
    'Respect a11y: announce state changes, avoid color-only cues, keep focus logical.',
    'Plan for localization: avoid idioms, allow longer strings, and design for ICU variables.',
    'Test variants qualitatively first; A/B only once comprehension is solid.',
    'Never use dark patterns (confirmshaming, obstruction); trust compounds.',
    'Map every string to an owner and key; version and instrument variants.'
  ],
  template: (f)=>{
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;
    const join2 = (a,b)=>[a,b].filter(Boolean).join(' + ');

    // Tones
    const tones = join2(
      f.tone_primary,
      (f.tone_secondary && f.tone_secondary !== '— none —') ? f.tone_secondary : ''
    );

    // Notes that adapt to select options
    const surfaceNote = (() => {
      switch (f.surface) {
        case 'buttons':
        case 'CTAs (primary)':
          return 'Surface guidance: Use verb + object; include specific outcome or time window if relevant. One primary action per view.';
        case 'links':
          return 'Surface guidance: Links should describe the destination (“View billing settings”), not “Click here.”';
        case 'labels':
          return 'Surface guidance: Labels must be nouns or noun phrases; avoid placeholders-as-labels. Pair with clear help text only when needed.';
        case 'helper text':
          return 'Surface guidance: Put instructions before interaction; be specific (examples/formats). Keep it short.';
        case 'errors':
          return 'Surface guidance: Error = What happened + Why (if known) + How to fix. Tone is calm and accountable. Place inline and summarize if needed.';
        case 'empty states':
          return 'Surface guidance: Explain value, give first step, and provide an example. Avoid “nothing here yet.”';
        case 'tooltips':
          return 'Surface guidance: Define the unknown term in ≤1 sentence; link to learn more for depth.';
        case 'toasts':
          return 'Surface guidance: Confirm outcome + next-best action. Ensure ARIA-live announcement and auto-dismiss timing.';
        case 'banners':
          return 'Surface guidance: Use for global/system info with clear action or dismissal. Avoid persistent clutter.';
        case 'modals':
          return 'Surface guidance: One primary decision. Support escape routes and keyboard focus-trap handling.';
        case 'confirmation':
          return 'Surface guidance: Restate the exact action/outcome; offer undo when safe instead of “Are you sure?” prompts.';
        case 'permissions':
          return 'Surface guidance: Explain why access is needed, what the user gets, and that it’s controllable later.';
        case 'notifications':
          return 'Surface guidance: Be concise; lead with the event outcome and include a targeted next step.';
        case 'forms':
          return 'Surface guidance: Labels above fields; examples for tricky inputs; validation copy shows fix steps.';
        case 'upgrade/paywall':
          return 'Surface guidance: State the benefit unlocked, honest limits, trial terms, and clear pricing deltas.';
        default:
          return null;
      }
    })();

    const platformNote = (() => {
      switch (f.platform) {
        case 'iOS': return 'Platform: iOS — Observe Apple HIG for capitalization and permission language.';
        case 'Android': return 'Platform: Android — Follow Material guidelines; avoid title case in body text.';
        case 'email': return 'Platform: Email — Subject and preheader clarity; actionable first line; plain-text fallback.';
        case 'SMS/push': return 'Platform: SMS/Push — Keep to one purpose; include clear opt-out and rate limits.';
        default: return null;
      }
    })();

    const localeNote = (() => {
      switch (f.localization) {
        case '1–3 languages': return 'Localization: Keep idiom-free and allow 30–50% length growth.';
        case '4–10 languages': return 'Localization: Avoid metaphors; ensure variables are translatable and gender/number-aware.';
        case '>10 languages': return 'Localization: Provide screenshots/keys for translators; avoid concatenated strings.';
        default: return null;
      }
    })();

    const rdNote = f.reading_direction ? `Reading direction: ${f.reading_direction} — design punctuation, ordering, and mirroring accordingly.` : null;
    const levelNote = f.reading_level ? `Reading level: ${f.reading_level} — use short sentences, concrete nouns, and strong verbs.` : null;
    const ethicsNote = f.dark_pattern_check === 'on' ? 'Ethics: Dark-pattern guard ON — enforce neutral declines, explicit terms, and no confirmshaming.' : null;

    const variants = (() => {
      const n = parseInt(f.variant_count || '3', 10);
      return isNaN(n) ? 3 : Math.max(3, Math.min(n, 5));
    })();

    const rationaleNote = (() => {
      switch (f.rationale_depth) {
        case 'brief (1 line)': return 'Rationale depth: 1 line per option.';
        case 'standard (2–3 lines)': return 'Rationale depth: 2–3 lines per option with tradeoffs.';
        default: return null;
      }
    })();

    const modeNote = (() => {
      switch (f.editor_mode) {
        case 'edit existing': return 'Mode: Edit — rewrite to improve clarity, actionability, a11y, and ethics while preserving intent.';
        case 'critique-only': return 'Mode: Critique — evaluate against heuristics and suggest targeted improvements without rewriting.';
        default: return 'Mode: Net-new — produce fresh copy aligned to the moment and constraints.';
      }
    })();

    return [
      'Write UX microcopy tailored to the user’s moment and desired action.',
      modeNote,
      f.context && `Context:\n${f.context}`,
      f.moment && `User moment & goal:\n${f.moment}`,
      f.desired_action && `Desired action: ${f.desired_action}`,

      f.audience_persona && `Personas: ${list(f.audience_persona)}`,
      f.platform && platformNote,
      f.surface && surfaceNote,
      f.state && `UI state: ${f.state}`,

      f.value_prop && `Value prop (this moment):\n${f.value_prop}`,
      f.proof_points && `Proof points / risk reversal:\n${f.proof_points}`,

      (tones) && `Tone: ${tones}`,
      levelNote,

      f.variables && `Variables/placeholders:\n${f.variables}`,
      f.string_key && `i18n key: ${f.string_key}`,
      f.limit && `Limit: ${f.limit}`,

      f.localization && `Localization scope: ${f.localization}`,
      localeNote,
      rdNote,
      f.icu_notes && `ICU/pluralization:\n${f.icu_notes}`,

      f.do_words && `Prefer: ${f.do_words}`,
      f.dont_words && `Avoid: ${f.dont_words}`,

      f.a11y_notes && `Accessibility notes:\n${f.a11y_notes}`,
      f.sr_only && `Screen-reader only text:\n${f.sr_only}`,
      f.aria_role && `ARIA role/landmark:\n${f.aria_role}`,

      f.regulatory_region && `Compliance region: ${f.regulatory_region}`,
      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,
      ethicsNote,

      f.ab_hypothesis && `A/B hypothesis: ${f.ab_hypothesis}`,
      f.success_metric && `Success metric: ${f.success_metric}`,
      f.event_keys && `Instrumentation keys:\n${f.event_keys}`,

      f.fallback_copy && `Fallback copy:\n${f.fallback_copy}`,
      f.brand_voice && `Brand voice notes:\n${f.brand_voice}`,
      f.constraints && `Constraints:\n${f.constraints}`,

      rationaleNote,

      [
        'Output format:',
        `- ${variants} Options (A, B, C${variants>3?', D':''}${variants>4?', E':''}) respecting tone, limits, variables, and platform`,
        '- If editor_mode=critique-only: Heuristic critique (clarity • actionability • honesty • a11y • localization) + concrete fixes',
        '- Rationale per option (clarity • confidence • compassion); note tradeoffs',
        '- If errors: (1) What happened (2) Why (if known) (3) How to fix',
        '- If empty state: value + first step + example',
        '- If permission: why needed + what you get + control later',
        '- Accessibility notes (ARIA-live, focus handling, color independence) as needed',
        '- Implementation tokens: variables, length/line limits, localization flags, i18n keys',
        '- Acceptance criteria: when this copy appears, success signals, and fallback states'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: PRD — Write (enhanced)
--------------------------------------------------------- */
{
  id: 'task_prd_write',
  slug: 'prd-write',
  label: 'PRD — Write',
  kind: 'task',
  categories: ['ux','business','product','planning','writing'],
  tags: [
    'type:task',
    'topic:prd',
    'topic:requirements',
    'topic:roadmap',
    'topic:traceability',
    'topic:telemetry',
    'topic:accessibility',
    'topic:localization',
    'topic:security',
    'use:plan',
    'use:spec',
    'use:write',
    'use:governance',
    'stage:plan'
  ],
  use_cases: [
    'align teams on problem, scope, and requirements',
    'capture functional and nonfunctional requirements with acceptance criteria',
    'define success metrics, guardrails, and instrumentation',
    'slice delivery into phases (alpha/beta/GA) and vertical value slices',
    'document risks, dependencies, and rollback plans',
    'create traceability from goals → requirements → stories → tests → telemetry',
    'produce developer-ready implementation notes (APIs, data model, flags)',
    'prepare ops/readiness (runbooks, alerts, support playbooks)',
    'harmonize a11y and localization requirements with UX/content',
    'plan experiments (flag ramps, A/B/holdouts) with ethical guardrails',
    'maintain change control (status, versioning, decision log, ADR links)'
  ],
  definition: 'Author a testable, traceable Product Requirements Document: problem, users, scope (incl. non-goals), functional & nonfunctional requirements with acceptance criteria, slices/phases, metrics & telemetry, risks/dependencies, rollout/rollback, and stakeholder ownership. Includes governance (status/version), experimentation, a11y/i18n, and ops readiness.',
  help: 'Paste discovery evidence and links (research, market, analytics). Select phase, a11y/i18n scope, and experimentation/rollout style so guidance adapts. Use personas and the bias library to keep the PRD user-centered and inclusive. Choose a deliverable style (full PRD vs exec summary vs ticket bundle).',
  fields: [
    /* Governance & overview */
    { key:'status',            label:'Doc status', type:'select', options:['Draft','Review','Approved','In development','Released','Archived'], desc:'Communicates maturity and expectations.' },
    { key:'version',           label:'Version', type:'text', ph:'e.g., 0.4 (semver-like for docs)', desc:'Update with every material change.' },
    { key:'owner',             label:'Doc owner', type:'text', ph:'Name · role · team' },
    { key:'reviewers',         label:'Reviewers/approvers', type:'textarea', ph:'Design, Eng, Data, Legal, Support' },
    { key:'title',             label:'Title', type:'text', ph:'Concise name users understand' },
    { key:'one_liner',         label:'One-liner', type:'text', ph:'What this is and for whom', desc:'Single-sentence elevator pitch.' },
    { key:'decision',          label:'Decision to inform', type:'text', ph:'What decision will this PRD enable?', desc:'Keeps doc outcome-focused.' },
    { key:'background',        label:'Background & evidence', type:'textarea', ph:'Problem context, links to research/market, constraints' },

    /* Goals & scope */
    { key:'goals',             label:'Goals (outcomes)', type:'textarea', ph:'Business/user outcomes; tie to KPIs' },
    { key:'okr_alignment',     label:'OKR alignment (optional)', type:'text', ph:'e.g., O: Improve retention · KR: Day-30 +3 pts' },
    { key:'non_goals',         label:'Non-goals (out of scope)', type:'textarea', ph:'Explicit exclusions to prevent creep' },
    { key:'use_cases',         label:'Use cases / scenarios', type:'textarea', ph:'Short “as a… I want… so that…” scenarios' },
    { key:'scope_in',          label:'In-scope capabilities', type:'textarea', ph:'What will ship (features, surfaces, platforms)' },

    /* Audience & personas */
    { key:'persona_context',   label:'User/segment notes (optional)', type:'textarea', ph:'Relevant personas, segments, devices' },
    { key:'audience_persona',  label:'Personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Select personas to align value, scope, and acceptance criteria.',
      ph:'e.g., Finance Manager; New Admin; Field Rep' },

    /* Requirements */
    { key:'requirements_func', label:'Functional requirements', type:'textarea', ph:'One per line with IDs (F-1, F-2…) + short description' },
    { key:'requirements_nfr',  label:'Nonfunctional (NFRs)', type:'textarea', ph:'Performance, reliability, a11y, security, privacy, i18n, observability… with IDs (NFR-1…)' },
    { key:'acceptance',        label:'Acceptance criteria', type:'textarea', ph:'Gherkin-style: Given/When/Then for each requirement' },
    { key:'stories',           label:'User stories', type:'textarea', ph:'As a <role>, I want <goal> so that <value>… (link AC IDs)' },
    { key:'ux_artifacts',      label:'UX artifacts', type:'textarea', ph:'Flows, wireframes/prototypes, content guidelines' },

    /* Compliance, a11y, i18n */
    { key:'a11y_level',        label:'Accessibility scope', type:'select', options:['WCAG 2.2 AA','AA (critical surfaces)','AAA (selected surfaces)','platform-native only'], desc:'Minimum bar to meet for this release.' },
    { key:'localization',      label:'Localization scope', type:'select', options:['none','1–3 languages','4–10 languages','>10 languages'], desc:'Impacts copy, formats, time/currency, RTL.' },
    { key:'data_classification',label:'Data classification', type:'select', options:['Public','Internal','Confidential','Restricted'], desc:'Sets handling & logging constraints.' },
    { key:'privacy_security',  label:'Privacy & security notes', type:'textarea', ph:'PII, lawful basis, retention, encryption, permissions/roles' },

    /* Metrics & telemetry */
    { key:'success_metrics',   label:'Success metrics (targets)', type:'textarea', ph:'Leading/lagging (e.g., success ≥85%, P95 <1s)' },
    { key:'guardrails',        label:'Guardrail metrics', type:'textarea', ph:'Error rate, support tickets, perf budgets' },
    { key:'events',            label:'Event taxonomy', type:'textarea', ph:'event_name, properties, IDs (step_id, error_code, role)' },
    { key:'dashboards',        label:'Dashboards/alerts', type:'textarea', ph:'Where metrics will be monitored; thresholds' },

    /* Release plan (slices & phases) */
    { key:'release_phase',     label:'Phase', type:'select', options:['alpha','beta','GA'], desc:'Phase sets expectations for quality/support.' },
    { key:'slice_strategy',    label:'Slices (vertical value)', type:'textarea', ph:'Deliver complete outcomes to a subset (who/what/where)' },
    { key:'experimentation',   label:'Experimentation style', type:'select', options:['none','feature-flag ramp','A/B test','holdout cohort'], desc:'Shapes rollout, ethics, and telemetry.' },
    { key:'feature_flags',     label:'Feature flags', type:'textarea', ph:'Flag names, owners, default state, kill switch' },
    { key:'rollout',           label:'Rollout plan', type:'textarea', ph:'Rings (internal→% cohorts), schedule, comms' },
    { key:'rollback',          label:'Rollback plan', type:'textarea', ph:'Triggers, steps, data migration reversal' },

    /* Implementation outline */
    { key:'api_plan',          label:'APIs & contracts', type:'textarea', ph:'Endpoints, payloads, auth, rate limits, idempotency' },
    { key:'data_model',        label:'Data model/migrations', type:'textarea', ph:'Tables, columns, indexes, online migration strategy' },
    { key:'perf_targets',      label:'Performance targets', type:'textarea', ph:'P95 latency, throughput, budgets by surface' },
    { key:'observability',     label:'Observability', type:'textarea', ph:'Logs, traces, error classes, alert thresholds' },
    { key:'dependencies',      label:'Dependencies', type:'textarea', ph:'Upstream services, vendors, approvals' },

    /* Ops & readiness */
    { key:'runbooks',          label:'Runbooks & on-call', type:'textarea', ph:'Ownership, escalation, SLO/SLA, paging' },
    { key:'support_playbook',  label:'Support playbook', type:'textarea', ph:'Macro, triage, known issues, comms templates' },
    { key:'training_enablement',label:'Training/enablement', type:'textarea', ph:'Docs, videos, internal launch notes' },

    /* Risks & assumptions */
    { key:'risk_model',        label:'Risk scoring model', type:'select', options:['likelihood × impact','FMEA (S×O×D)','custom'] },
    { key:'risks_register',    label:'Risks & mitigations', type:'textarea', ph:'ID · description · owner · score · mitigation · watch metric' },
    { key:'assumptions',       label:'Assumptions / open questions', type:'textarea', ph:'Items to validate; closure plan' },

    /* People & timing */
    { key:'stakeholders',      label:'Stakeholders & RACI', type:'textarea', ph:'Responsible, Accountable, Consulted, Informed' },
    { key:'timeline',          label:'Timeline / milestones', type:'textarea', ph:'Key dates; criteria to advance phases' },
    { key:'capacity',          label:'Capacity window (optional)', type:'text', ph:'e.g., 2 sprints or 40 eng-days' },

    /* Testing & QA */
    { key:'qa_plan',           label:'Testing & QA plan', type:'textarea', ph:'Unit/integration/E2E, a11y, perf, security, UAT; environments' },
    { key:'test_data',         label:'Test data/fixtures', type:'textarea', ph:'Accounts, roles, seeded records, sample files' },

    /* ADRs & change control */
    { key:'decision_log',      label:'Decision log (summary)', type:'textarea', ph:'Date · decision · rationale · approvers' },
    { key:'adr_links',         label:'ADR links (optional)', type:'textarea', ph:'Architecture Decision Records URLs' },
    { key:'change_log',        label:'Change log', type:'textarea', ph:'v0.4 — what changed, why, by whom' },

    /* Ethics & bias (library shape) */
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    },

    /* Constraints & links */
    { key:'constraints',       label:'Constraints', type:'textarea', ph:'Tech/legal limits, brand rules, SLAs' },
    { key:'links',             label:'Related docs/links', type:'textarea', ph:'Designs, research, tickets, prior PRDs' },

    /* Deliverable style & traceability */
    { key:'deliverable',       label:'Primary output', type:'select',
      options:['full PRD document','insight-to-ticket bundle','one-pager executive summary','traceability matrix + ticket bundle'],
      desc:'Format to emphasize in the output.' },
    { key:'include_traceability', label:'Include traceability matrix?', type:'select', options:['yes','no'], desc:'Maps Goal → Req → Story → Test → Event.' }
  ],
  boosters: [
    'Write the decision first; every requirement should help answer it.',
    'Each requirement (F/NFR) must have acceptance criteria and a metric trace.',
    'Define vertical slices that deliver complete user outcomes to a subset.',
    'Set targets and guardrails before coding; instrument events with queryable IDs.',
    'Add feature flags + rollback triggers; pre-plan comms and support macros.',
    'A11y and localization are NFRs—treat them as first-class requirements.',
    'Maintain status, version, and a decision/change log to avoid stale docs.'
  ],
  template: (f)=>{
    const list = v => Array.isArray(v) ? v.filter(Boolean).join(', ') : v;

    const phaseNote = (() => {
      switch (f.release_phase) {
        case 'alpha': return 'Phase: Alpha — limited scope, faster iteration, explicit caveats; support via PM/Eng on-call.';
        case 'beta':  return 'Phase: Beta — broader cohort behind flags; success + guardrails monitored; ready-to-rollback.';
        case 'GA':    return 'Phase: GA — fully supported, SLOs enforced, documentation and enablement complete.';
        default: return null;
      }
    })();

    const a11yNote = (() => {
      switch (f.a11y_level) {
        case 'WCAG 2.2 AA': return 'A11y: Meet WCAG 2.2 AA across all surfaces (keyboard, SR, contrast, errors).';
        case 'AA (critical surfaces)': return 'A11y: Prioritize AA on critical flows now; backlog non-critical with dates.';
        case 'AAA (selected surfaces)': return 'A11y: AAA on selected surfaces (list in NFRs); AA elsewhere.';
        case 'platform-native only': return 'A11y: Rely on platform standards; document gaps and compensations.';
        default: return null;
      }
    })();

    const l10nNote = (() => {
      switch (f.localization) {
        case '1–3 languages': return 'Localization: keep idiom-free; allow 30–50% length growth; date/number formats.';
        case '4–10 languages': return 'Localization: provide screenshots/keys to translators; avoid concatenated strings.';
        case '>10 languages': return 'Localization: invest in terminology and pseudo-localization QA before ship.';
        default: return null;
      }
    })();

    const riskNote = (() => {
      switch (f.risk_model) {
        case 'likelihood × impact': return 'Risk model: score by Likelihood (1–5) × Impact (1–5); treat ≥12 as high.';
        case 'FMEA (S×O×D)': return 'Risk model: FMEA — Severity × Occurrence × Detectability; reduce highest RPN first.';
        default: return null;
      }
    })();

    const expNote = (() => {
      switch (f.experimentation) {
        case 'feature-flag ramp': return 'Experimentation: Ramp exposure by cohort; monitor success + guardrails each step; define kill-switch triggers.';
        case 'A/B test': return 'Experimentation: Randomized assignment; pre-register primary metric and MDE; respect ethics and eligibility rules.';
        case 'holdout cohort': return 'Experimentation: Maintain a holdout for baseline drift; document duration and re-entry policy.';
        default: return null;
      }
    })();

    const traceNote = f.include_traceability === 'yes'
      ? 'Traceability: Provide matrix Goal → Requirement (ID) → Story (ID) → Test (ID) → Event (name).'
      : null;

    return [
      'Draft a Product Requirements Document (PRD) with testable, traceable requirements.',
      f.status && `Status: ${f.status}`,
      f.version && `Version: ${f.version}`,
      f.owner && `Owner: ${f.owner}`,
      f.reviewers && `Reviewers/Approvers:\n${f.reviewers}`,
      f.title && `Title: ${f.title}`,
      f.one_liner && `One-liner: ${f.one_liner}`,
      f.decision && `Decision to inform: ${f.decision}`,
      f.background && `Background & evidence:\n${f.background}`,

      f.goals && `Goals:\n${f.goals}`,
      f.okr_alignment && `OKR alignment: ${f.okr_alignment}`,
      f.non_goals && `Non-goals (Out of scope):\n${f.non_goals}`,
      f.use_cases && `Use cases / scenarios:\n${f.use_cases}`,
      f.scope_in && `In-scope capabilities:\n${f.scope_in}`,

      f.persona_context && `User/segment notes:\n${f.persona_context}`,
      f.audience_persona && `Personas: ${list(f.audience_persona)}`,

      f.requirements_func && `Functional requirements:\n${f.requirements_func}`,
      f.requirements_nfr && `Nonfunctional requirements:\n${f.requirements_nfr}`,
      f.acceptance && `Acceptance criteria:\n${f.acceptance}`,
      f.stories && `User stories:\n${f.stories}`,
      f.ux_artifacts && `UX artifacts:\n${f.ux_artifacts}`,

      f.a11y_level && a11yNote,
      f.localization && l10nNote,
      f.data_classification && `Data classification: ${f.data_classification}`,
      f.privacy_security && `Privacy & security:\n${f.privacy_security}`,

      f.success_metrics && `Success metrics (targets):\n${f.success_metrics}`,
      f.guardrails && `Guardrail metrics:\n${f.guardrails}`,
      f.events && `Event taxonomy:\n${f.events}`,
      f.dashboards && `Dashboards/alerts:\n${f.dashboards}`,

      f.release_phase && phaseNote,
      f.slice_strategy && `Slices (vertical value):\n${f.slice_strategy}`,
      expNote,
      f.feature_flags && `Feature flags:\n${f.feature_flags}`,
      f.rollout && `Rollout plan:\n${f.rollout}`,
      f.rollback && `Rollback plan:\n${f.rollback}`,

      f.api_plan && `APIs & contracts:\n${f.api_plan}`,
      f.data_model && `Data model/migrations:\n${f.data_model}`,
      f.perf_targets && `Performance targets:\n${f.perf_targets}`,
      f.observability && `Observability:\n${f.observability}`,
      f.dependencies && `Dependencies:\n${f.dependencies}`,

      f.runbooks && `Runbooks & on-call:\n${f.runbooks}`,
      f.support_playbook && `Support playbook:\n${f.support_playbook}`,
      f.training_enablement && `Training/enablement:\n${f.training_enablement}`,

      f.risk_model && riskNote,
      f.risks_register && `Risks & mitigations:\n${f.risks_register}`,
      f.assumptions && `Assumptions / open questions:\n${f.assumptions}`,

      f.stakeholders && `Stakeholders & RACI:\n${f.stakeholders}`,
      f.timeline && `Timeline / milestones:\n${f.timeline}`,
      f.capacity && `Capacity window: ${f.capacity}`,

      f.qa_plan && `Testing & QA plan:\n${f.qa_plan}`,
      f.test_data && `Test data/fixtures:\n${f.test_data}`,

      f.decision_log && `Decision log:\n${f.decision_log}`,
      f.adr_links && `ADR links:\n${f.adr_links}`,
      f.change_log && `Change log:\n${f.change_log}`,

      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,

      f.constraints && `Constraints:\n${f.constraints}`,
      f.links && `Related docs/links:\n${f.links}`,

      f.deliverable && `Primary output: ${f.deliverable}`,
      traceNote,

      [
        'Output format:',
        '- One-liner, Background, Decision to inform',
        '- Goals & Non-goals (explicit out of scope) + OKR alignment',
        '- Users & Use Cases',
        '- Requirements: Functional + NFRs (each with Acceptance Criteria)',
        '- UX Artifacts (flows, content), A11y & Localization notes',
        '- Metrics & Telemetry (targets, events, dashboards, guardrails)',
        '- Slices & Phases (experimentation, flags, rollout, rollback)',
        '- Implementation Outline (APIs, data model, perf, observability, dependencies)',
        '- Ops Readiness (runbooks, support playbook, training/enablement)',
        '- Risks/Assumptions (model, owners, mitigations)',
        '- Stakeholders & RACI, Timeline/Capacity',
        '- Testing & QA plan + Test data',
        '- Governance (status, version, decision/ADR/change logs)',
        '- Links & Constraints',
        '- Traceability matrix (if selected): Goal → Req → Story → Test → Event'
      ].join('\n')
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Backlog — Prioritize (enhanced+)
--------------------------------------------------------- */
{
  id: 'task_backlog_prioritize',
  slug: 'backlog-prioritize',
  label: 'Backlog — Prioritize',
  kind: 'task',
  categories: ['business','ux','product','prioritization','planning'],
  tags: [
    'type:task',
    'topic:prioritization',
    'topic:roadmap',
    'topic:capacity',
    'topic:traceability',
    'topic:portfolio',
    'use:rank',
    'use:plan',
    'use:edit',
    'stage:decide'
  ],
  use_cases: [
    'rank backlog items using a consistent framework',
    'frame tradeoffs with capacity limits',
    'produce a shareable roadmap slice',
    'run tie-breakers transparently and document rationale',
    'stress-test ranking with sensitivity checks (alt methods/assumptions)',
    'group by themes/OKRs and surface dependencies',
    'rebalance portfolio across value buckets (growth/reliability/debt/a11y)',
    'sequence fixed-date and compliance work without derailing capacity',
    'turn ranked list into a Now/Next/Later or 2-sprint executable plan',
    'facilitate scoring workshops with anchors and exemplars',
    'trace items to KPIs and owners for accountability'
  ],
  definition: 'Prioritize a backlog with anchored scoring (RICE/ICE/WSJF/Weighted/Opportunity Gap, plus MoSCoW buckets), explicit tie-breakers, portfolio allocation, and real capacity. Output a ranked list and a shareable roadmap slice (Now/Next/Later or 2-sprint plan) with rationale, risks, and owners.',
  help: 'Paste items (one per line). You can append quick metadata like [feature], [bug], [infra], {effort:L}, {reach:12k/mo}, {impact:2}, {confidence:0.8}, {due:2025-Q3}, {deps:ID-123}. Select a method, define anchored scales, pick normalization and confidence weighting, set capacity/buffer and allocation policy, then choose an output style. Include deadlines and dependencies so sequencing reflects reality.',
  fields: [
    /* Inputs */
    { key:'items', label:'Backlog items', type:'textarea',
      ph:'One per line; support tags [bug]/[infra]/[feature]/[debt]/[a11y], and inline {reach:12k/mo} {impact:2} {confidence:0.8} {effort:M} {due:Q3} {deps:ABC→XYZ}',
      desc:'Titles should be problem-centric. Inline hints can override defaults for specific items.' },

    /* Audience / personas (optional, for Reach/Impact reasoning) */
    { key:'persona_context', label:'Persona/segment refs (optional)', type:'textarea',
      ph:'@Persona: Admin Alice; @Segment: SMB Paid',
      desc:'Short references to target users most affected by this backlog.' },
    { key:'audience_persona', label:'Personas (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      desc:'Select personas to tune Reach/Impact reasoning.',
      ph:'e.g., New Admin; Finance Manager; Field Rep' },

    /* Method & anchors */
    { key:'method', label:'Method', type:'select',
      options:['RICE','ICE','WSJF','Weighted matrix','Opportunity Gap (Imp–Sat)','MoSCoW'],
      desc:'Alters scoring inputs and output columns.' },
    { key:'reach_window', label:'Reach window (for RICE)', type:'select',
      options:['per week','per month','per quarter','custom'],
      desc:'Time basis for Reach counts.' },
    { key:'impact_scale', label:'Impact scale', type:'select',
      options:['anchored: 0.25, 0.5, 1, 2, 3','anchored: 0.5, 1, 2, 3, 5','custom'],
      desc:'Pick anchors so “1” means a meaningful, noticeable effect.' },
    { key:'confidence_scale', label:'Confidence scale', type:'select',
      options:['anchored: 0.5 / 0.8 / 1.0','percent (0–100%)','custom'],
      desc:'Encourage evidence-weighted scoring.' },
    { key:'effort_scale', label:'Effort scale', type:'select',
      options:['t-shirt (S=1, M=2, L=4, XL=8)','story points (1–13 mapped)','eng-days (numeric)'],
      desc:'How effort maps to a numeric denominator/size.' },

    /* WSJF / Weighted / Opportunity anchors */
    { key:'wsjf_anchors', label:'WSJF anchors (if WSJF)', type:'textarea',
      ph:'Value: 1–10 (anchors)… Time Criticality: 1–10… Risk Reduction: 1–10… Job Size mapping…',
      desc:'State anchor definitions so the team scores consistently.' },
    { key:'weights', label:'Weighted matrix weights (if Weighted)', type:'textarea',
      ph:'Impact:0.35; Reach:0.20; StrategicFit:0.20; RiskReduction:0.15; TimeCriticality:0.10',
      desc:'3–5 criteria only; weights sum to 1.00.' },
    { key:'opportunity_inputs', label:'Opportunity Gap inputs (if Imp–Sat)', type:'textarea',
      ph:'Item | importance (1–5) | satisfaction (1–5)',
      desc:'High importance + low satisfaction ⇒ top opportunities.' },

    /* Normalization & confidence handling */
    { key:'normalization', label:'Normalization', type:'select',
      options:['none','min–max (0–100)','z-score'],
      desc:'Use when teams’ scales differ or items mix units.' },
    { key:'confidence_weighting', label:'Confidence weighting', type:'select',
      options:['multiply by Confidence','subtract uncertainty penalty','list Confidence separately'],
      desc:'How to reflect uncertainty in scores.' },

    /* Themes & dependencies */
    { key:'themes', label:'Themes / OKRs', type:'textarea',
      ph:'Activation; Reliability; Monetization',
      desc:'Use themes to group ranked items for storytelling.' },
    { key:'dependencies', label:'Dependencies (global)', type:'textarea',
      ph:'Item A → Item C; Vendor review; Security sign-off',
      desc:'High-level dependency notes. Item-level deps can be inline in items.' },
    { key:'deadlines', label:'Deadlines / windows (optional)', type:'textarea',
      ph:'Compliance date, partner launch window',
      desc:'Time constraints that influence sequencing.' },

    /* Portfolio allocation & classes of service */
    { key:'allocation_policy', label:'Portfolio allocation', type:'textarea',
      ph:'Growth 60% · Reliability 20% · Debt/A11y 15% · Compliance 5%',
      desc:'Capacity split across buckets; helps resist crowding out essentials.' },
    { key:'class_policy', label:'Classes of service', type:'select',
      options:['standard + expedite + fixed-date + intangible','custom'],
      desc:'Make expedite/fixed-date explicit to expose tradeoffs.' },

    /* Capacity & slicing */
    { key:'timeframe', label:'Time frame', type:'text', ph:'e.g., Q4 or next 6 weeks' },
    { key:'capacity', label:'Capacity', type:'text', ph:'e.g., 2 sprints or 40 eng-days' },
    { key:'buffer_percent', label:'Buffer (%)', type:'select', options:['0%','10%','20%','30%'],
      desc:'Reserve for interrupts/incidents to keep WIP sane.' },
    { key:'capacity_by_lane', label:'Capacity by lane (optional)', type:'textarea',
      ph:'Frontend: 6 units; Backend: 8; iOS: 3',
      desc:'Model skill bottlenecks if relevant.' },
    { key:'wip_limits', label:'WIP limits (optional)', type:'textarea',
      ph:'Design: 2; Backend: 3; QA: 2',
      desc:'Encourage finishing over starting and reduce thrash.' },

    /* Tie-breakers & sensitivity */
    { key:'tie_breakers', label:'Tie-breakers', type:'textarea',
      ph:'strategic fit, risk burn-down, learning value, UX debt, team flow',
      desc:'Apply in order when scores tie.' },
    { key:'alt_method', label:'Sensitivity check (alt method)', type:'select',
      options:['none','ICE','RICE','WSJF','Weighted matrix','Opportunity Gap (Imp–Sat)','MoSCoW'],
      desc:'Compute a second ranking to see if the top items are robust.' },

    /* Evidence & owners */
    { key:'evidence_links', label:'Evidence links (optional)', type:'textarea',
      ph:'funnels, support tickets, research, revenue models',
      desc:'Ground claims; boosts Confidence anchors.' },
    { key:'owners_map', label:'Owner mapping (optional)', type:'textarea',
      ph:'Item → PM/Eng/Design owner',
      desc:'Attach accountable owners for top picks.' },

    /* Output */
    { key:'output', label:'Output format', type:'select',
      options:['ranked table','now/next/later','2-sprint plan','one-pager summary','exec + builder bundle'],
      desc:'Choose the primary artifact; we’ll tailor columns accordingly.' },

    /* Ethics & bias library (exact shape) */
    {
      key: 'risks_picks',
      label: 'Biases (from library)',
      type: 'repeater',
      itemType: 'typeahead',
      unit: 'bias',
      dataset: 'bias',
      autofill: 'bias->inline',
      desc:'Inline reminders to avoid stereotypes/exclusion or fear-mongering.',
      ph:'e.g., Accessibility; Fear appeals; Cultural sensitivity'
    },

    /* Constraints */
    { key:'constraints', label:'Constraints', type:'textarea',
      ph:'platform freezes, legal, privacy, partner SLAs',
      desc:'Hard limits that affect sequence or feasibility.' }
  ],
  boosters: [
    'Use anchored scales (write them down); score in silence, discuss outliers, then lock.',
    'Convert t-shirt sizes to units (S=1, M=2, L=4, XL=8) or set a clear mapping before scoring.',
    'Normalize when inputs mix scales; otherwise avoid unnecessary math.',
    'Cut with a hard capacity line and a 20–30% buffer; WIP is a queueing system, not a mood.',
    'Prefer vertical slices that deliver user value each step; avoid horizontal scaffolding.',
    'Document the tie-breaker used when scores tie; future-you will thank you.',
    'Run a sensitivity check (alt method or pessimistic/optimistic effort) on the top 5.',
    'Sequence risk early if it burns down uncertainty for bigger bets.',
    'Make classes of service explicit (standard/expedite/fixed-date); show what gets displaced.',
    'Show dependencies and deadlines on the roadmap slice; no hidden dragons.'
  ],
  template: (f)=>{
    const list = (v)=>Array.isArray(v)?v.filter(Boolean).join(', '):v;

    // Method guidance
    const methodNote = (() => {
      switch (f.method) {
        case 'RICE':
          return `Method: RICE — Reach (${f.reach_window||'per period'}) × Impact (${f.impact_scale||'anchored'}) × Confidence (${f.confidence_scale||'anchored'}) ÷ Effort (${f.effort_scale||'chosen'}).`;
        case 'ICE':
          return `Method: ICE — Impact × Confidence ÷ Effort (${f.effort_scale||'chosen'}). Use when Reach is similar across items.`;
        case 'WSJF':
          return 'Method: WSJF — (User/Business Value + Time Criticality + Risk Reduction/Opportunity Enablement) ÷ Job Size. Use anchored 1–10 scales.';
        case 'Weighted matrix':
          return 'Method: Weighted matrix — weighted sum of 3–5 criteria (weights sum to 1.0); optionally divide by Effort.';
        case 'Opportunity Gap (Imp–Sat)':
          return 'Method: Opportunity Gap — rank by high importance and low satisfaction; prioritize largest gaps.';
        case 'MoSCoW':
          return 'Method: MoSCoW — Must/Should/Could/Won’t. Order within buckets with a secondary rule.';
        default:
          return null;
      }
    })();

    // Normalization & confidence
    const normNote = (() => {
      switch (f.normalization) {
        case 'min–max (0–100)': return 'Normalization: scale criteria to 0–100 for comparability.';
        case 'z-score': return 'Normalization: z-score; centers/standardizes criteria before combining.';
        default: return null;
      }
    })();
    const confNote = (() => {
      switch (f.confidence_weighting) {
        case 'multiply by Confidence': return 'Confidence handling: multiply scores by Confidence (0.5/0.8/1.0).';
        case 'subtract uncertainty penalty': return 'Confidence handling: subtract an uncertainty penalty from scores.';
        case 'list Confidence separately': return 'Confidence handling: list Confidence alongside scores (no math).';
        default: return null;
      }
    })();

    // Output guidance
    const outputNote = (() => {
      switch (f.output) {
        case 'ranked table':
          return 'Output: Ranked table — include method inputs/score, dependencies, owner, size, risk, rationale.';
        case 'now/next/later':
          return 'Output: Now/Next/Later — communicates direction without overpromising dates; show capacity line and allocation buckets.';
        case '2-sprint plan':
          return 'Output: 2-sprint plan — list items per sprint with sizes, buffer, risks, and sequencing notes.';
        case 'one-pager summary':
          return 'Output: One-pager — problem → goals → top bets → capacity slice → risks → decision log link.';
        case 'exec + builder bundle':
          return 'Output: Exec + builder bundle — one TL;DR for leaders plus a detailed ranked table for implementers.';
        default:
          return null;
      }
    })();

    // Capacity & policy notes
    const bufferNote = f.buffer_percent && f.buffer_percent!=='0%' ?
      `Capacity buffer: Reserve ${f.buffer_percent} for interrupts/incidents.` : null;
    const allocationNote = f.allocation_policy ? `Portfolio allocation:\n${f.allocation_policy}` : null;
    const classNote = f.class_policy ? `Classes of service: ${f.class_policy}` : null;
    const wipNote = f.wip_limits ? `WIP limits:\n${f.wip_limits}` : null;
    const altNote = f.alt_method && f.alt_method!=='none'
      ? `Sensitivity: Also produce an ${f.alt_method} ranking to cross-check the top items.`
      : null;

    return [
      'Prioritize the backlog with anchored scoring and a capacity-aware slice.',
      f.items && `Items:\n${f.items}`,

      f.persona_context && `Persona/segment refs:\n${f.persona_context}`,
      f.audience_persona && `Personas: ${list(f.audience_persona)}`,

      f.method && methodNote,
      f.reach_window && `Reach window: ${f.reach_window}`,
      f.impact_scale && `Impact scale: ${f.impact_scale}`,
      f.confidence_scale && `Confidence scale: ${f.confidence_scale}`,
      f.effort_scale && `Effort scale: ${f.effort_scale}`,
      f.wsjf_anchors && `WSJF anchors:\n${f.wsjf_anchors}`,
      f.weights && `Weighted matrix weights:\n${f.weights}`,
      f.opportunity_inputs && `Opportunity inputs:\n${f.opportunity_inputs}`,

      normNote,
      confNote,

      f.themes && `Themes / OKRs:\n${f.themes}`,
      f.dependencies && `Dependencies:\n${f.dependencies}`,
      f.deadlines && `Deadlines/windows:\n${f.deadlines}`,

      f.timeframe && `Time frame: ${f.timeframe}`,
      f.capacity && `Capacity: ${f.capacity}`,
      bufferNote,
      f.capacity_by_lane && `Capacity by lane:\n${f.capacity_by_lane}`,
      allocationNote,
      classNote,
      wipNote,

      f.tie_breakers && `Tie-breakers (apply in order):\n${f.tie_breakers}`,
      f.evidence_links && `Evidence links:\n${f.evidence_links}`,
      f.owners_map && `Owner mapping:\n${f.owners_map}`,
      altNote,

      f.output && outputNote,

      f.risks_picks && `Bias/ethics checks: ${list(f.risks_picks)}`,

      f.constraints && `Constraints:\n${f.constraints}`,

      [
        'Output format:',
        '- Ranked list/table with method-specific columns (and anchor notes)',
        '- Top 5: short rationale + evidence + tie-breaker (if applied)',
        '- Roadmap slice cut at capacity line (show buffer, lane limits, and allocation buckets)',
        '- Dependencies, deadlines, and risk/CoS notes on selected items',
        '- Sensitivity section: alt-method or assumption shift results',
        '- Now/Next/Later or 2-sprint plan (if selected) with owners',
        '- Decision log: method, date, participants, anchors, and capacity math'
      ].join('\n')
    ].filter(Boolean).join('\n');
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

