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
  'Library tools: 2-minute rule (david allen):planning avoidance away beginner,5w1h — who · what · where · when · why · how:incident prompt scope acceptance,a3 problem solving (toyota):problem plan actions align,aar — feelings first:debrief learning needs alone,abcde — activating event · belief · consequence · dispute · effect:thought anxiety reframe self,abductive reasoning — best explanation:predictions risky account analysis,accessibility reality check (wcag + plain language):frameworks language phase plain,accountability letter:amends apology beginner clear,active imagination — dialogue with inner voices:inner creative dialogue parts,addie — analyze · design · develop · implement · evaluate:course training learning design,adversarial collaboration:adjudication design advance change,agent-based models & system dynamics:abm agents calibration complex,aida — attention · interest · desire · action:copy write action email,amor–vita–memoria (avm):grief self gratitude one,anekāntavāda & syādvāda (jain many-sided logic):cultural truths add bias,announcement — change & action:announcement change communication notice,argument mapping — claim · premises · objections · rejoinders:points reasoning critical debate,arnstein’s ladder of participation — from tokenism to citizen control:power community influence governance,ask-me-3 — what’s my main problem? what do i need to do? why is it important? (+ provisional/differential/working dx):phase blood communication notes,automatic writing — truth sprint:writing truth automatic avoiding,backcasting - start from the desired future state and plan backwards:back community plan future,backlog — prioritize:capacity items plan portfolio,bayesian science — posterior odds:priors action analysis based,bdd (given–when–then) → tests → code — reusable template:bdd gherkin acceptance auto,before-after-bridge (bab) — before state · after state · bridge (solution):pitch copy page write,bhag — big hairy audacious goal:planning vision align ambition,bias impact assessment (ai/tech pre-launch):bias check right compliance,bias interrupters — diagnose risk · insert guardrail · measure effect:bias feedback check fair,blameless postmortem — essence first:teaching actionable analyze beginner,bloom’s — remember · understand · apply · analyze · evaluate · create:design objectives learning lesson,bpmh — best possible medication history (+ provisional/differential/working dx):phase list planning safety,brand archetypes for communities - shared identity motifs and tone:our archetype archetypes community,buddhist eightfold path (adapted for action):decision ethical design harm,canary + blue-green — revert comms:comms rollback beginner blast,causal inference — dags & identification:identification assumptions causal dag,causal inference playbook:design assumptions based bias,checklists (gawande-style) — turn recurring tasks into zero-brain-power steps:phase management quality safety,clear — challenge · limitation · effect · action · result:problem summary action decision,clear contracts + exit ramps:boundaries consent beginner communicatio,clear path forward — concise · logical · explicit · adaptive · reflective:prompt step planning ask,clear prompting method — clarity · length · empathy · actionability · relevance:prompt make scope ask,clown ‘flop’ — failure seen safely:failure resilience shame armor,cognitive debiasing — state assumption · seek disconfirming evidence · adjust:check bias could decision,collective impact — common agenda shared measurement backbone:partners purpose across community,community capitals framework - seven capitals lens for purpose and investment:capital capitals across investments,community-led development (cld): locally led priorities accountability and capacity:community design governance phase,comparative analysis — rank • pros/cons • matrix:compare should options side,competing values framework - culture map to align ways of working with mission:culture values across decide,computational science — simulation:reproducibility simulation validation ca,constraint flip (play with edges):what design feature had,contact improv — listening duet:listening practice attention attunement,costar — context · objective · style · tone · audience · response:brief content message campaign,cover letter — tailor / rewrite / feedback:cover letter job ats,critical bias & methodology audit:review bias check ai,critical incident analysis:ethics teaching charged communication,cross-cultural localization readiness:locale localization translation accessib,cultural probes & diary studies - longitudinal participant-led voice capture:people daily study capture,cultural web - unpack symbols rituals stories shaping voice:culture cultural voice rituals,daoist wu-wei strategy (effortless action):instead align burnout plan,decision matrix (weighted) — compare by criteria not vibes:planning criteria decision management,decision record — dissent & kill criteria:dissent adr alignment beginner,deliberative polling / citizens juries - informed structured public deliberation:people citizens public make,design doc — scariest change:design risk align alignment,design justice principles — center those most affected; redistribute design power:design community power data,design science research (dsr):utility artifact artifacts build,dignity questions — identity · meaning · legacy:family gratitude storytelling audio,disney strategy — dreamer · realist · critic:idea creative concept plan,dm — outreach & follow-up:follow outreach quick writing,dmaic — define · measure · analyze · improve · control:data improvement process project,doe + tolerance stacks — ci & power:acceptance experiment stack analysis,dot voting and heat-mapping - quick temperature check on priorities:decision phase planning community,east — easy · attractive · social · timely:design behavioral nudge choice,eisenhower matrix — urgent/important prioritization:delegate tasks priorities what,email — draft & polish:email follow networking outreach,empathy mapping personas jtbd - ground voice in needs and contexts:what design empathy community,empty chair dialogue (gestalt):self one conversation talk,energy budget planner (spoon theory):plan energy day spoons,engineering method — iterate to standard:acceptance cycle standards beginner,epic quest tasking — gamify the chore:quest quests chores make,ethical data stewardship - governance for safe listening:data community design decide,ethnographic & interpretivist methods:description fieldwork reflexivity thick,evidence robustness & reproducibility check:methods advanced analysis analyze,examples / few-shot prompting:examples example format output,exploratory vs confirmatory paths:cda eda avoid beginner,fab — feature · advantage · benefit:benefits bullets copy feature,facione — interpret · analyze · evaluate · infer · explain · self-regulate:bias evidence reasoning argument,facts & expertise primer:what facts check expert,feyerabend — pluralism:method design document ethics,feynman technique — explain like i’m 5:explain make complex non,findings — synthesize:insights confidence create summarize,first principles — question assumptions & reason from basics:true problem reasoning analogies,fmea · hazop · fault tree — unified card:design hazop analysis causes,focusing — felt-sense check:check mental aboutness ambivalent,freewriting — unfiltered stream of thought (zero draft):writing block draft brainstorming,future search — whole-system future-focused planning (2–3 days):future planning search community,fuzzing + mutation — outage shape:edge inputs catch conditions,ganma — knowledge confluence (yolŋu):knowledge cultural design indigenous,goal breakdown (prompt/question decomposition):step goal tasks turn,goal composition (prompt/question composition):one tasks plan asks,goal prompting:goal goals plan first,goals of care — what matters most:conversation life planning values,golden circle — why · how · what · mission:purpose mission community values,gratitude under duress:pain acknowledge beginner bypass,grounded theory — reflexive memos:coding reflexivity theory audit,grow — goal · reality · options · way forward:goal coaching plan what,head–heart–gut — logic · emotion · instinct (rational · emotional · instinctual check):check decision heart balance,health — symptom log & clinician brief:back health planning teach,hero’s journey — departure · initiation · return:journey story arc hero,heuristics & biases — debiasing pre-flight:check bias decision quick,holacracy (selective) - role-based governance for volunteer groups:roles governance meetings without,hoshin kanri (policy deployment) - align annual breakthrough objectives with daily work:phase planning community objectives,how might we statements (hmw):problem make questions brainstorming,human-centered design / double diamond: discover define develop deliver with community co-creation:design research clear community,hypnagogic spark — semi-sleep insight technique:brainstorming state creativity design,iap2 spectrum of public participation — inform → consult → involve → collaborate → empower:engagement community input planning,ice — impact × confidence × ease:ideas planning quick backlog,ikigai — purpose map:purpose career against align,imaginary council — multiple mentors one question:would phase see what,implementation intentions (if–then):plan coding goals habits,inclusive design (edge personas):design make edge check,inclusive language & metaphor scrubber:accessibility frameworks across analysis,informational-interview ladder — 2/day → 5/week → 50/quarter (ask for insights not jobs):planning networking outreach phase,inner child work — conscious self · inner child:child inner self childhood,intent → action design patterns (command • interpreter • strategy • cor • builder/factory):actions builder command factory,internal weather report — storm · calm · forecast:check state emotional energy,interviews — plan & questions — write:plan guide interviews design,jobs — alignment targeting stories & pipeline:plan personal planning your,jtbd interviews — felt-sense friction:jtbd progress struggles body,kaitiakitanga — guardianship & stewardship (māori):product cultural data design,kano model — must-be · performance · delighters:planning product what brainstorming,kansei engineering (emotion → design mapping):design emotions emotional features,kaupapa māori research — by/with/for māori communities; sovereignty at the core:research ori community communities,kepner–tregoe (situation · problem · decision · potential problem):decision analysis phase alternatives,keywords + why + tasks — vector priming:actionable alignment apply avoid,kuhn — paradigms & revolutions:anomalies science across beginner,kumu / systems mapping - actors flows feedbacks:purpose community find map,lakatos — research programs:belt core hard program,language optimizer — ats · domain · seo · aieo:answer ats content metadata,lara / cri — dialogue scaffold:dialogue affirmation beginner center,last 2% round — share the unsaid edge:alignment avoid beginner communication,lean startup loop — stop & harm rules:decision hypothesis rules analytics,least to most (ltm):building complex derive edge,letter — formal / personal:letter formal writing apology,liberating structures - light-weight ways to get everyones voice in (1-2-4-all 9 whys triz conversation café what so what now what):group ways simple what,lines/veils revisit — mid-campaign:consent lines refresh safety,maṣlaḥa — public interest reasoning (islamic ethics):decision product advanced align,memento mori — micro-sit:gratitude actually add beginner,memo — tl;dr + recommendation:decision writing brief capture,mind map — central idea with branches:visual adhd analysis around,mind mapping — visual cluster of ideas:discover map planning actions,mixed methods — triangulation:integration beginner design designs,monroe’s motivated sequence — attention · need · satisfaction · visualization · action:value decision persuasive across,mortal message — letter/audio:gratitude repair beginner blessing,moscow — must · should · could · won’t:planning management product scope,most significant change (msc) — collect stories; community selects what mattered most:community stories change evaluation,musyawarah & mufakat — deliberation to consensus (indonesia):consensus decision deliberation facilita,naïve dialecticism (east asian holistic reasoning):adapt adjustments advanced analytic,nonviolent communication (nvc): needs-based dialogue for deeper listening:nvc conflict without empathy,north star metric & narrative:metric one community long,noting — mindfulness labels:sleep awareness beginner check,nyāya — five-member syllogism:explicit inference mode analyses,oblique strategies — lateral thinking prompt cards:creative brainstorming break constraints,observability — slos · slis · error budgets:burn reliability analytics budget,ocap® & care principles — community data ownership governance and ethical listening:data community sharing control,ofrenda / remembrance board:altar artifacts beginner board,okr — objective & key results:outcomes measurable planning progress,okrs — with kill criteria:okrs analytics avoid beginner,okrs (community-adapted) — objectives & key results:community goals mission progress,okrs (job search) — land x offers:evaluation job phase planning,ooda loop (observe–orient–decide–act):decision discovery fast loop,open science checklist:accessible beginner cannot capsule,open space technology - participant-set agenda for what matters now:open space agenda community,opportunity scoring — importance vs. satisfaction:planning jtbd across allocate,opportunity solution tree - tie problems to outcomes to keep purpose tight:outcome outcomes tree solutions,outcome harvesting - gather outcomes after the fact and trace contributions with community input:already change clear community,outcome mapping — boundary partners & behavior change:change community partner behavior,par — problem · action · result:experience impact postmortem storytellin,participatory & decolonial approaches:data sovereignty benefit clarify,participatory action research (par):decision dissemination rights accessible,participatory action research / cbpr - co-research with communities:community research action phase,participatory budgeting — residents directly allocate resources:community budget equity planning,parts check-in — ifs-inspired:coaching self beginner check,parts work dialogue (ifs therapy):inner parts self coaching,pas — problem · agitate · solution:problem copy landing marketing,paul–elder — elements of thought + standards:decision analysis apply argument,pdca — plan · do · check · act:improvement beginner changes close,pdsa — plan · do · study · act:change phase planning week,peas — performance measure · environment · actuators · sensors:design agent analysis benchmark,persona — actas / simulate:apply beginner clarification development,personal kanban + wip limits — backlog → doing (limit 1–3) → done:planning phase focus management,pestle — political · economic · social · technological · legal · environmental:affecting analysis analyze broader,pipeline kanban — leads → applied → interviewing → offer → closed:phase planning job search,plan and solve (p&s):planning against checks clarification,playback theatre — confession line:group story check consent,pomodoro scaffold:beginner creativity focus frame,popperian falsification:design predictions risky beginner,positionality statement:analysis practice preface research,power mapping - visualize formal and informal power; plan inclusive engagement:who influence which map,power/interest grid & stakeholder salience — who has power who’s affected who must be heard:who power actually affected,pra / rra - participatory mapping ranking seasonal calendars guided by locals:community local research create,pramāṇa — means of knowledge:evidence advanced answer audit,prd — write:requirements plan guardrails localizatio,pre-mortem — imagine failure find causes build safeguards:planning phase risks safety,pre-mortem + pre-grief:ethics failure human review,pre-mortem + red team — embarrassing sentence:ethics failure review conditions,pre-mortem scaffold:actions beginner committing decision,press release — ap style:release launch writing announcement,product — plain words → specs → code:contracts roadmap specs align,product roadmap → team-ready brief (slices + phases):capacity quarterly across beginner,prompt augmentation (demonstration learning):format phase against answers,public narrative - structure shared story and call to action:story action people ask,public narrative (marshall ganz) — story of self us now:story community craft action,qiyās — analogical reasoning (islamic jurisprudence):advanced analogies apply cause,questionnaire — write:design item bias items,raccca — relevance · accuracy · completeness · clarity · coherence · appropriateness:evaluation audit beginner coding,raci or drci - clarify roles without muting voice:who roles consent consulted,rain — recognize · allow · investigate · nurture:self mindfulness beginner brach,random association — combine unrelated ideas:brainstorming beginner block break,rap — result · action · problem:impact storytelling apply beginner,rapid — recommend · agree · perform · input · decide:decision approvals beginner clarify,rapid framing rewriter:frameworks phase add alternatives,rapid ideation — timed idea sprint:brainstorming beginner block creative,ratio — role · audience · task · instructions · output:prompt brief agent apply,red-flag list — pre-agree triggers & actions (+ provisional/differential/working dx):phase communication planning safety,reflect (bias reflection):bias analysis beginner brainstorming,reflexive memo:analysis activated affect affective,registered reports & preregistration:analysis plan clarify collection,reliability growth & burn-in:test acceptance growth plan,restorative circles / deep democracy - surface minority voices and work with conflict productively:circle conflict group community,resume — tailor / rewrite / feedback:resume job ats draft,rfc — unsaid objection:decision dissent alignment architecture,rice — reach × impact × confidence ÷ effort:planning allocate coding features,ripple effects mapping — appreciative story-mapping of impacts with stakeholders:community impact map stories,risen — role · instructions · steps · end goal · narrowing:plan content design development,rodes — role · objective · details · examples · sense check:guided adaptation against apply,role storming — ideation as different personas:brainstorming apply beginner changing,root cause analysis:apply beginner brainstorming causes,rose · thorn · bud + weather:check daily hope journal,rtf — role · task · format:format prompt prompting api,rubber duck debugging — explain to understand:problem step analysis articulating,safety pause with essence:safety truth ttrpg agree,sbar for health — situation · background · assessment · recommendation (+ provisional/differential/working dx):phase call communication day,scamper (idea expansion):beginner brainstorming creative creativi,scenario-based prompting — deliberative reasoning:advice analysis coaching compose,scientific method — question · hypothesis · method · data · analysis · conclusion:beginner clear content design,scqa — situation · complication · question · answer:frameworks analysis arc beginner,screener — create criteria:screener eligibility design device,sensemaker: micro-narratives self-signified by participants to surface patterns:stories patterns community phase,sentipensar — thinking-feeling integration (latin america):design side analytic cultural,service design blueprints - map frontstage/backstage to see where voice is silenced:service map blueprint design,shadow work dialogue — conscious self · shadow self:self side you acts,shared decision-making (sdm) — options → benefits/risks → values/preferences → decide → review (+ provisional/differential/working dx):phase decision communication one,six thinking hats:brainstorming decision explore beginner,smart goals — specific · measurable · achievable · relevant · time-bound:goals actionable adjustment beginner,soap diary — subjective · objective · assessment · plan (+ provisional/differential/working dx):phase communication day notes,soar analysis:align aspirations beginner clarification,social media post — tailor / write / brainstorm:social media post write,social network analysis / network weaving / netography - find connectors peripheries and missing voices:map spot bridges networks,sociocracy / consent decision-making - circles roles and dynamic governance for shared ownership:sociocracy consent decide circles,socratic questioning method:alternatives assumptions beginner belief,soft systems methodology (ssm) — explore messy problems via multiple worldviews; rich pictures:map problems community issues,somatic focusing — feel · ask · listen:self them asking beginner,spectrum of community engagement to ownership — concrete power-shifting practices:community power ownership authority,stakeholder harm & benefit forecast:equity safety across analysis,star — situation · task · action · result:story storytelling study answer,star / soar stories (job search):interview phase resume stories,stars & wishes + bleed check:bleed debrief safety ttrpg,story circles / story harvesting — peer storytelling to extract themes and values:stories community voices values,story spine + one naked sentence:story draft line pitch,survey — plan — design:design plan survey scale,swot — strengths · weaknesses · opportunities · threats:analysis market snapshot strategy,synectics — analogies & problem transfer:advanced analogies apply context,synesthetic brainstorm — color · sound · texture:brainstorming sensory abstract analogies,systematic review & meta-analysis:criteria heterogeneity policy protocol,t-gap analysis — requirements vs skills + 30-day plan:planning phase analysis beginner,talanoa dialogue (pacific):beginner build content cultural,talanoa yarning circles talking circles — narrative-first consensus building:community decisions hearing understadnin,targeting matrix: role × industry × location × company size:planning careers list phase,tarot spread reflection — past · present · future:mode reflection storytelling tarot,task prompt breakdown — task/recipe + do/don’t (cot):recipe steps beginner brainstorming,task scenarios — write:scenarios design accessibility hta,tdd + property-based testing — invariants:edge invariants tests beginner,teach-back — restate instructions; confirm & correct (+ provisional/differential/working dx):phase what communication notes,theory of change — backcasting:change community planning mission,threat modeling — stride/linddun:privacy risk security architecture,three vaults — facts → stories → essence:coaching check communication facilitatio,time machine advice — past self & future self:self your future you,tonglen-lite — breathe with suffering:compassion self aversion beginner,tote — test · operate · test · exit:beginner brainstorming build communicati,toulmin’s argument model — claim · grounds · warrant · backing · qualifier · rebuttal:briefs design academic argumentation,transcripts - analyze:analysis analyze codebook executive,travel — door-to-door planner:door plan planning travel,tree of thought — brainstorm & evaluate:across advanced best brainstorming,tree of thought — decomposition:advanced alternatives ambiguous brainsto,triangulation methods:across alignment apply bias,trigger storming — prompt-based brainstorming:brainstorming abstract creativity discus,triz (theory of inventive problem solving):brainstorming aim communication content,trls — with exit ramps:exit maturity salvage trl,trunk-based dev — feature flags:audience beginner behind cleanup,truth & reconciliation — micro-format:accountability amends conflict dignity,two-eyed seeing (etuaptmumk): braiding indigenous and western knowledge:community knowledge design elders,usability test — plan:plan policy accessibility criteria,user flow — audit — design:flow design states acceptance,user stories & acceptance criteria → developer-ready brief:planning acceptance accessibility produc,ux microcopy — write:copy design accessibility clarity,v-model / mbse — assumption ledger:assumptions model architecture dates,v2mom — vision values methods obstacles measures:community vision plan create,value proposition canvas (personal):planning positioning careers employer,value vs. effort — 2×2 quick wins matrix:identify intermediate kill management,viable system model - ensure functions that keep a community adaptive and coherent:community design governance operations,voice and tone frameworks - codify how the community speaks:our tone voice community,vow-and-witness:commitment vow witness accountability,vroom–yetton–jago decision model:decision autocratic balance brainstormin,wardley mapping - map capabilities and evolution to protect community advantage:community shared spot across,week planning — focus triage & motivation:anxiety energy plan planning,weighted mini-matrix (quick score):planning against compare criteria,what if — scenario reframing questions:brainstorming problem alternative beginn,wishing — imagine ideal solutions:brainstorming beginner beyond constraint,woop (wish–outcome–obstacle–plan):obstacle beginner bind brainstorming,working backwards prfaq — truths & tradeoffs:align alignment amazon backwards,working out loud — truth edition:review asks beginner clarity,world café - rotating small-group conversations to synthesize collective themes:cafe world ideas conversation,wsjf — (business value + time criticality + risk reduction) ÷ job size:planning economic future improvement,zhongyong — doctrine of the mean (confucian moderation):avoid calibrating communication content'      ],
  definition: 'A helper that recommends the most suitable template from a provided library or generates a prompt to do so.',
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
  categories: ['user experience','research','planning'],
  tags: [
    'type:task','topic:survey','topic:user-experience','topic:survey-design','topic:sampling','topic:ethics',
    'use:plan','use:design','use:edit','use:qa','use:user-experience','stage:plan','stage:design'
  ],
  use_cases: [
    'scope a new UX (user experience) survey with goals, audience, and logistics',
    'align stakeholders on sampling and timing',
    'choose tools and define success criteria',
    'pressure-test objectives and translate them into questions or tasks to improve UX (user experience)',
    'decide mode (in-product, panel, email) and recruiting strategy for representativeness',
    'estimate sample size, incidence rate, and margin of error/power tradeoffs',
    'design pilots/cognitive interviews and quality gates (speeders, straightliners, fraud)',
    'plan analysis (key cuts, weighting, stats) and reporting artifacts',
    'set up accessibility, localization, consent/PII handling, and incentives',
    'refine or edit a single question (bias, wording, UX (user experience), scale design)',
    'convert qualitative findings into a quant module (themes → items) to improve UX (user experience)',
    'run split-sample wording/scale experiments and A/B concept tests',
    'plan a longitudinal tracker (wave management, continuity, change rules)',
    'localize instruments across languages (scale labels, cultural nuance)',
    'price or feature-prioritization studies (Van Westendorp, Gabor–Granger, MaxDiff, Conjoint)',
    'diagnose/repair low IR, low completion, or poor data quality in existing surveys',
    'align UX (user experience) survey outputs with product analytics and business KPIs',
    'create an item bank and codebook for reuse',
    'design surveys for UX (user experience) studies'
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
  categories: ['user experience','research','writing'],
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
  categories: ['user experience','research','recruiting'],
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
  categories: ['user experience','research','planning'],
  tags: [
    'type:task',
    'topic:interviews',
    'topic:discussion-guide',
    'topic:user-experience',
    'topic:moderation',
    'topic:ethics',
    'use:plan',
    'use:design',
    'use:user-experience',
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
    'create multilingual guides with culturally appropriate examples',
    'design a UX (user experience) interview study',
    'for UX (user experience) interview planning and designing'
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
  categories: ['user experience','research','analysis'],
  tags: [
    'type:task','topic:analysis','topic:transcripts','topic:codebook',
    'topic:sentiment','topic:journey-mapping','topic:user-experience','topic:prioritization',
    'use:synthesize','use:prioritize','use:edit','use:user-experience','stage:analyze'
  ],
  use_cases: [
    'code interview and usability transcripts into UX (user experience) themes',
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
    'create quote banks and rights-safe excerpts for storytelling to communicate the UX (user experience)'
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
categories: ['user experience','research','analysis'],
tags: [
'type:task',
'topic:insights',
'topic:prioritization',
'topic:user-experience',
'topic:storytelling',
'use:synthesize',
'use:present',
'use:edit',
'use:user-experience',
'stage:summarize'
],
use_cases: [
'turn raw notes into a crisp readout of UX (user experience) insights',
'translate themes into decisions and next steps',
'tailor messaging to execs or builders',
'prioritize pains/opportunities by severity, frequency, and impact',
'create UX (user experience) driven insight cards with evidence, so-what, and recommendations',
'map themes to journey stages and segments for clarity',
'produce stakeholder-specific UX (user experience) artifacts (exec TL;DR, builder tickets)',
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
  categories: ['user experience','research','planning','evaluation'],
  tags: [
    'type:task',
    'topic:usability-test',
    'topic:user-experience',
    'topic:benchmarking',
    'topic:accessibility',
    'use:usability-test',
    'use:user-experience',
    'use:plan',
    'use:design',
    'use:edit',
    'stage:plan'
  ],
  use_cases: [
    'define objectives and tasks for UX (user experience) moderated/unmoderated testing',
    'set success criteria and metrics',
    'align recruiting and logistics',
    'plan formative (diagnostic) studies to fix friction fast',
    'run summative/benchmark UX (user experience) tests (task success/time/errors, SUS/SEQ/UMUX-Lite)',
    'compare versions (A/B) or competitors under the same tasks',
    'design accessibility sessions with assistive tech and accommodations',
    'plan navigation UX (user experience) tests (first-click, tree testing) and content comprehension',
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
  categories: ['user experience','research','writing','evaluation'],
  tags: [
    'type:task',
    'topic:usability-test',
    'topic:user-experience',
    'topic:task-scenarios',
    'topic:hta',
    'topic:klm',
    'topic:accessibility',
    'use:write',
    'use:design',
    'use:edit',
    'use:usability-test',
    'stage:design'
  ],
  use_cases: [
    'write realistic, bias-free scenarios for UX (user experience) usability tasks',
    'define acceptance criteria per task',
    'ensure coverage of critical paths',
    'author recovery/edge-case scenarios that test resilience',
    'create step and micro-action breakdowns (HTA/KLM-lite)',
    'tailor scenarios for digital, physical, or hybrid workflows',
    'add accessibility paths (keyboard-only, screen reader) and device variants',
    'counterbalance task order and set assistance (hint) policy',
    'embed per-task success/partial/fail gates and SEQ/Confidence prompts',
    'localize UX (user experience) scenario language by market/reading level',
    'design comparable scenarios for A/B or competitive studies',
    'seed realistic data/states so tasks are actually completable',
    'attach observation targets and evidence logging (events, timestamps)',
    'for UX (user experience) usability testing scenarios writing'
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
  categories: ['user experience','design','evaluation','analysis'],
  tags: [
    'type:task',
    'topic:user-flow',
    'topic:user-experience',
    'topic:journey',
    'topic:task-flow',
    'topic:service-blueprint',
    'use:user-experience',
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
  categories: ['user experience','content','writing','design'],
  tags: [
    'type:task',
    'topic:user-experience',
    'topic:microcopy',
    'topic:content-design',
    'topic:accessibility',
    'topic:localization',
    'use:user-experience',
    'use:write',
    'use:design',
    'use:edit',
    'use:critique',
    'stage:design'
  ],
  use_cases: [
    'write buttons, labels, help text, errors, empty states, tooltips, toasts, permissions, notifications, upgrade/paywall copy with UX in mind',
    'improve clarity, confidence, and conversion with ethical persuasion',
    'align microcopy with brand voice, value prop, UX, and the user’s moment',
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
  categories: ['user experience','business','product','planning','writing'],
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
  categories: ['business','user experience','product','prioritization','planning'],
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
},

{
id: 'task_travel_planner',
slug: 'travel-planning-door-to-door',
label: 'Travel — Door-to-Door Planner',
kind: 'task',
categories: ['personal-admin','planning','travel'],
tags: ['type:task','topic:travel','use:planning','use:logistics','use:risk','use:checklist'],
use_cases: [
'plan a door-to-door itinerary for a new trip',
'set up price-watching with trigger prices and book windows',
'organize flights, accommodation, routes, and essentials (FARE)',
'prepare 3-2-1 document backups and emergency contacts',
'map trip risks and pre-decide Plan B options'
],
definition: 'Plan a door-to-door trip by working backward from the exact arrival time/place. Structure around FARE (Flights, Accommodation, Routes, Essentials), include a price-watch plan, a 3-2-1 document backup checklist, and a simple Risk Map with pre-agreed Plan B options and contacts. Adapts depth based on current stage and desired help level.',
help: 'Fill what you know. Start with destination arrival time/place if you have it. Choose your current stage and how hands-on you want help to be; the template adjusts the level of detail, questions, and research tasks automatically.',
fields: [
/* Scope & mode selectors (these shape the output depth and priorities) */
{ key:'trip_stage', label:'Where are you in travel planning?', type:'select', desc:'Shapes the questions, research tasks, and which FARE components to prioritize first.',
options:[
{ label:'Just exploring ideas', value:'Stage: Exploring. Prioritize broad options, rough budget ranges, seasonality, visa/entry basics, and 2–3 viable trip patterns. Defer bookings; ask minimal high-leverage questions.' },
{ label:'Dates chosen (not booked)', value:'Stage: Dates chosen. Produce a door-to-door backward plan, price-watch setup with trigger ranges, and shortlists for flights and stays. Include calendar holds and buffer times.' },
{ label:'Flights booked (need the rest)', value:'Stage: Flights booked. Lock door-to-door around flight times. Focus on airport transfers, accommodation shortlists with trade-offs, local transport routes, and Essentials.' },
{ label:'Accommodation booked (fill the gaps)', value:'Stage: Accommodation booked. Optimize routes, day plans, local transport passes, and Essentials. Add Risk Map and 3-2-1 backups if missing.' },
{ label:'On trip (live adjustments)', value:'Stage: On-trip. Provide quick alternatives, day-by-day tweaks, Plan B options, contact cards, and a minimal Essentials audit.' }
]
},
{ key:'help_level', label:'How much help do you want?', type:'select', desc:'Controls question count, research depth, and number of concrete options.',
options:[
{ label:'Overview (broad plan, light questions)', value:'Help level: Overview. Provide high-level itinerary, key decisions, and 0–3 clarifying questions. Avoid deep vendor research; give decision criteria and simple checklists.' },
{ label:'Guided planning (moderate detail)', value:'Help level: Guided. Provide specific recommendations and up to 3 example options per category (flights/stays/transport) with pros/cons and rough cost ranges; 3–7 clarifying questions.' },
{ label:'Concierge research (in-depth)', value:'Help level: Concierge. Provide deeper research tasks, example options with selection criteria, sample outreach scripts, and booking notes. Include 5–10 clarifying questions prioritized by impact.' }
]
},
/* Trip basics */
{ key:'goal_vibe', label:'Trip goal / vibe', type:'textarea', ph:'e.g., coffee + museums, scenic trains, low-stress mini-moon' },
{ key:'travelers', label:'Travelers', type:'text', ph:'e.g., 2 adults, 1 child (8), 1 carry-on each' },
{ key:'origin', label:'Origin city/airport (if known)', type:'text', ph:'e.g., PHX or Mesa, AZ (flexible to TUS/LAX)' },
{ key:'arrival_place', label:'Arrival place (city/airport/station)', type:'text', ph:'e.g., Barcelona (BCN) · Hotel in El Born' },
{ key:'arrival_datetime', label:'Exact arrival deadline (if any)', type:'text', ph:'e.g., Must be at El Born hotel by Jun 12, 18:00 local' },
{ key:'start_date', label:'Start date (if known)', type:'text', ph:'YYYY-MM-DD' },
{ key:'end_date', label:'End date (if known)', type:'text', ph:'YYYY-MM-DD' },
{ key:'flexible_dates', label:'Date flexibility', type:'select', options:['none','±1–2 days','±3–7 days'], desc:'Improves price-watch and routing options.' },
{ key:'duration_hint', label:'Trip length hint', type:'text', ph:'e.g., 7–9 days total' },
{ key:'budget', label:'Budget (range/currency)', type:'text', ph:'e.g., $2,500–$3,000 total, flights separate' },
{ key:'must_do', label:'Must-dos / constraints', type:'textarea', ph:'e.g., specific museum dates, mobility needs, pet-friendly, flight time windows' },

/* FARE — core planning inputs */
{ key:'flight_prefs', label:'Flight prefs (if any)', type:'textarea', ph:'e.g., nonstop preferred; depart after 10:00; Delta or Oneworld; aisle seats' },
{ key:'stay_prefs', label:'Accommodation prefs', type:'textarea', ph:'e.g., quiet area, kitchen, washer, ≤$180/night, walkable to transit' },
{ key:'route_notes', label:'Ground routes / transport notes', type:'textarea', ph:'e.g., rail pass vs point-to-point; rideshare after 23:00; ferry schedules' },
{ key:'essentials_notes', label:'Essentials (docs/insurance/meds/money/SIM)', type:'textarea', ph:'e.g., passport renewal needed; eSIM preferred; travel medical plan; notify bank' },

/* Price-watch pattern */
{ key:'trigger_price', label:'Trigger price (per ticket or total)', type:'text', ph:'e.g., Book if PHX→BCN ≤ $620 RT (main cabin)' },
{ key:'watch_window', label:'Watch window', type:'text', ph:'e.g., Today → 6 weeks before departure; Tue/Thu check' },
{ key:'alerts_tools', label:'Alerts / tools to use', type:'text', ph:'e.g., Google Flights alerts, Kayak, Hopper; 2 alternative airports' },

/* Documents — 3-2-1 backup */
{ key:'docs_list', label:'Critical docs to include', type:'textarea', ph:'Passport, visas, vax cards, tickets, bookings, insurance card, emergency sheet' },
{ key:'docs_media', label:'Backup media plan', type:'text', ph:'3 copies, 2 media (phone + cloud), 1 printed in carry-on' },

/* Risk Map & contacts */
{ key:'risk_concerns', label:'Top risks to pre-plan', type:'textarea', ph:'e.g., missed connection, hotel overbooked, lost ID, illness, civil strike' },
{ key:'plan_b', label:'Plan B ideas (quick notes)', type:'textarea', ph:'Backup flight/route; backup hotel in same district; telemedicine app; embassy' },
{ key:'contacts_card', label:'Contacts card', type:'textarea', ph:'Local friend; hotel desk; airline; insurer; embassy/consulate; bank; telemed' },

/* Calendars & output preferences */
{ key:'calendar_system', label:'Calendar system', type:'text', ph:'e.g., Google Calendar; wants .ics holds and checklists' },
{ key:'output_focus', label:'Output emphasis', type:'select',
  options:['balanced plan','cost-minimizing','stress-minimizing','accessibility-first','kid-friendly','carry-on only'],
  desc:'Tailors trade-off decisions and tips.'
},

/* Freeform add-ons */
{ key:'extras', label:'Other details / links (optional)', type:'textarea', ph:'Paste booking refs, confirmation codes, or links you already have' }
],

boosters: [
'Plan backward from the exact arrival place/time. Add realistic buffer times at each leg (immigration, baggage, transfers).',
'Normalize times and clearly mark time zones (origin vs destination).',
'Structure around FARE: Flights, Accommodation, Routes, Essentials.',
'Price-watch: define trigger price, watch window, alert setup, and decision rule; suggest 2 fallback airports.',
'3-2-1 docs: list the exact files to store; specify cloud folder name, local device location, and what to print.',
'Risk Map: list top risks → early warning signs → mitigations → Plan B steps → contact to call first.',
'Use “TODO:” markers for any missing inputs; ask only the minimum high-leverage clarifying questions based on Help level.',
'Offer calendar-ready milestones (holds) and a short packing categories list if space allows.'
],

template: (f) => {
const level = f.help_level || 'Help level: Overview.';
const stage = f.trip_stage || 'Stage: Exploring.';
const tzNote = 'Show all times with explicit time zones (e.g., “18:00 CEST / 09:00 MST”).';
const outRules = [
  'Output format:',
  '- Section 1: Clarifying questions (only what’s essential; count depends on Help level).',
  '- Section 2: Door-to-Door plan (work backward from arrival; include buffers and time zones).',
  '- Section 3: FARE — Flights, Accommodation, Routes, Essentials (with criteria and options per Help level).',
  '- Section 4: Price-Watch recipe (trigger price, watch window, alert setup, decision rule, alternates).',
  '- Section 5: 3-2-1 Docs backup (exact files + where to store: phone, cloud folder, printed packet).',
  '- Section 6: Risk Map (risks → early signs → mitigations → Plan B steps → who to contact first).',
  '- Section 7: Calendar holds & checklist (dates to place on calendar; step-by-step tasks).',
  '- Optional: Packing categories (carry-on only if requested).'
].join('\n');

const basics = [
  f.goal_vibe && `Trip goal/vibe: ${f.goal_vibe}`,
  f.travelers && `Travelers: ${f.travelers}`,
  f.origin && `Origin: ${f.origin}`,
  f.arrival_place && `Arrival place: ${f.arrival_place}`,
  f.arrival_datetime && `Arrival deadline: ${f.arrival_datetime}`,
  (f.start_date || f.end_date) && `Dates: ${[f.start_date,f.end_date].filter(Boolean).join(' → ')}`,
  f.flexible_dates && `Date flexibility: ${f.flexible_dates}`,
  f.duration_hint && `Trip length hint: ${f.duration_hint}`,
  f.budget && `Budget: ${f.budget}`,
  f.must_do && `Must-dos/constraints: ${f.must_do}`
].filter(Boolean).join('\n');

const fare = [
  f.flight_prefs && `Flight preferences:\n${f.flight_prefs}`,
  f.stay_prefs && `Accommodation preferences:\n${f.stay_prefs}`,
  f.route_notes && `Routes/transport notes:\n${f.route_notes}`,
  f.essentials_notes && `Essentials notes:\n${f.essentials_notes}`
].filter(Boolean).join('\n');

const priceWatch = [
  f.trigger_price && `Trigger price: ${f.trigger_price}`,
  f.watch_window && `Watch window: ${f.watch_window}`,
  f.alerts_tools && `Alerts/tools: ${f.alerts_tools}`
].filter(Boolean).join('\n');

const docs = [
  f.docs_list && `Docs list:\n${f.docs_list}`,
  f.docs_media && `Backup media plan: ${f.docs_media}`
].filter(Boolean).join('\n');

const risk = [
  f.risk_concerns && `Top risks:\n${f.risk_concerns}`,
  f.plan_b && `Plan B notes:\n${f.plan_b}`,
  f.contacts_card && `Contacts card:\n${f.contacts_card}`
].filter(Boolean).join('\n');

const prefs = [
  f.calendar_system && `Calendar system: ${f.calendar_system}`,
  f.output_focus && `Output emphasis: ${f.output_focus}`,
  f.extras && `Extras:\n${f.extras}`
].filter(Boolean).join('\n');

return [
  'Create a comprehensive travel plan.',
  stage,
  level,
  tzNote,
  basics && `\nBasics:\n${basics}`,
  fare && `\nFARE inputs:\n${fare}`,
  priceWatch && `\nPrice-watch inputs:\n${priceWatch}`,
  docs && `\n3-2-1 documents:\n${docs}`,
  risk && `\nRisk & contacts:\n${risk}`,
  prefs && `\nPreferences:\n${prefs}`,
  '\nGuidance:',
  '- Adjust depth, number of options, and question count according to Help level.',
  '- Always plan backward from the arrival place/time, adding realistic buffers for immigration, baggage, transfers, and check-in windows.',
  '- Provide costs as ranges with currency; cite assumptions (e.g., “shoulder season”).',
  '- If visas/vaccines may apply, add a neutral “Check official sources” note with where to verify.',
  '- For each unknown input, add a TODO line, not guesses.',
  outRules
].filter(Boolean).join('\n');
}
},

/* ---------------------------------------------------------
   TASK: Health — Symptom Log, Provisional/Differential/Working Dx, & Clinician Brief
--------------------------------------------------------- */
{
  id: 'task_health_clinician_brief',
  slug: 'health-symptoms-differential-and-brief',
  label: 'Health — Symptom Log & Clinician Brief',
  kind: 'task',
  categories: ['health','planning','personal-admin'],
  tags: [
    'type:task',
    'topic:health',
    'topic:medicine',
    'use:planning',
    'use:communication',
    'use:research',
    'use:preparation',
    'stage:intake'
  ],
  use_cases: [
    'organize symptoms and daily tracking (SOAP diary)',
    'prepare a clear packet for a doctor visit (SBAR-style brief, Ask-Me-3, Teach-Back prompts)',
    'explore non-diagnostic hypotheses to discuss with a clinician (provisional/working/differential)',
    'create a recovery/management plan outline and red-flag escalation steps',
    'understand medical instructions using teach-back and shared decision-making (SDM)'
  ],
  definition: 'A guided health worksheet that logs symptoms and vitals (SOAP), frames questions in plain language (Ask-Me-3), captures medicines (BPMH), and produces a clinician-ready brief with non-diagnostic hypotheses (provisional/working/differential) and shared decision-making notes. It blends everyday wording for you with technical structuring for clinical conversations.',
  help: 'Use this when you want to make sense of symptoms, get ready for a doctor visit, or better understand what your doctor said. Pick what kind of help you want (big-picture vs detailed). Fill in what you know in your own words; the output will reshape into a clean summary for a professional.',
  fields: [
    /* Scope & mode — plain language, shapes output depth and focus */
    { key:'care_stage', label:'Where are you right now?', type:'select', desc:'This changes what the output focuses on.',
      options:[
        'I feel unwell and want help figuring it out',
        'I already have a diagnosis and want to understand it',
        'I need to prep for an appointment',
        'I want a recovery or self-care plan',
        'I need to make sense of test results or medical notes',
        'I am helping someone else with their care'
      ]
    },
    { key:'help_level', label:'How much help do you want?', type:'select', desc:'Controls how detailed the plan and questions get.',
      options:[
        { label:'Overview (quick summary, few questions)', value:'overview' },
        { label:'Guided (some detail, a few example options)', value:'guided' },
        { label:'Concierge (in-depth, step-by-step research prompts)', value:'concierge' }
      ]
    },
    { key:'care_goal', label:'What do you want from this?', type:'select', desc:'The output will center on this.',
      options:[
        'Ideas to discuss with a doctor (possible causes)',
        'Ways to feel better and care for myself (non-urgent)',
        'A neat packet to hand to my clinician',
        'Help understanding medical info or instructions'
      ]
    },

    /* Ask-Me-3 — patient-facing, simple */
    { key:'am3_problem', label:'Ask-Me-3 — What’s my main problem?', type:'textarea', ph:'Say it in your own words' },
    { key:'am3_do',      label:'Ask-Me-3 — What do I need to do?', type:'textarea', ph:'What actions you think you should take' },
    { key:'am3_why',     label:'Ask-Me-3 — Why is it important?', type:'textarea', ph:'Why this matters to you' },

    /* SOAP diary — plain language prompts */
    { key:'subjective', label:'Symptoms in your words', type:'textarea', ph:'Start, pattern, what makes it better/worse, pain level, sleep, stress' , desc:'This is your story: what you feel and notice.'},
    { key:'objective',  label:'Numbers and observations', type:'textarea', ph:'Temperature, heart rate, blood pressure, oxygen, blood sugar, weight, step count', desc:'Anything measured or seen.'},
    { key:'assessment_notes', label:'What you think might be going on (no need to be right)', type:'textarea', ph:'Hunches or ideas you want to ask about', desc:'Your early thoughts or worries.'},
    { key:'plan_wish',  label:'What would you like to try or ask next?', type:'textarea', ph:'Small steps, questions, follow-ups' },

    /* BPMH — Best Possible Medication History */
    { key:'meds', label:'Medicines & supplements', type:'textarea', ph:'Name · Dose · When you take it · Why you take it · Who prescribed it', desc:'Make this as complete and accurate as possible.' },
    { key:'allergies', label:'Allergies or reactions', type:'textarea', ph:'e.g., penicillin → rash; peanuts → hives' },
    { key:'history', label:'Past conditions, surgeries, hospital visits', type:'textarea', ph:'Anything your doctor should know about' },
    { key:'family', label:'Family health history (if known)', type:'textarea', ph:'e.g., diabetes, heart disease, cancer' },

    /* Red flags — escalation plan */
    { key:'red_flags', label:'Warning signs to act on fast', type:'textarea', ph:'Chest pain, trouble breathing, fainting, severe belly pain, high fever in baby, etc.' , desc:'Write the danger signs you were told to watch for.'},
    { key:'escalation_plan', label:'Where to go or call if things get worse', type:'textarea', ph:'Which urgent care/ER, nurse line, on-call doctor' },

    /* Shared Decision-Making (SDM) */
    { key:'options', label:'Options you are considering', type:'textarea', ph:'Tests, treatments, lifestyle steps' },
    { key:'benefits_risks', label:'Good and bad of each option', type:'textarea', ph:'What might help, and what side effects or downsides you care about' },
    { key:'what_matters', label:'What matters most to you', type:'textarea', ph:'Work, childcare, cost, pain, side effects, values, faith' },
    { key:'decision_preference', label:'How you want to decide with your clinician', type:'select',
      options:['I prefer to decide together','I prefer my clinician to guide me','I prefer to decide myself after hearing options'] },

    /* Teach-Back & logistics */
    { key:'teachback', label:'What you think you were told', type:'textarea', ph:'Write it as if you’re explaining it back' },
    { key:'questions', label:'Questions to confirm or clarify', type:'textarea', ph:'What still confuses you' },
    { key:'clinicians', label:'Clinician names & contacts', type:'textarea', ph:'Primary, specialist, therapist, pharmacist' },
    { key:'next_appointment', label:'Next appointment', type:'text', ph:'Date · time · location or telehealth link' },
    { key:'pharmacy', label:'Preferred pharmacy', type:'text', ph:'Name · address · phone' },
    { key:'insurance', label:'Insurance or payment notes (optional)', type:'textarea', ph:'Member ID, copays, network limits' },

    /* Preferences for output emphasis */
    { key:'output_focus', label:'What should the summary highlight?', type:'select',
      options:['keep it simple','organize for my doctor','ideas to consider (not diagnosis)','recovery steps and follow-up'] }
  ],

  boosters: [
    'Clinical rigor: structure the note as SOAP with SBAR overlay for the clinician-facing abstract.',
    'Diagnostic reasoning: enumerate provisional diagnosis (working hypothesis), differential diagnosis (rank-ordered DDx), and competing problem representations; clearly mark all as NON-DIAGNOSTIC hypotheses for MD/DO review.',
    'Use illness scripts and VINDICATE(Vascular, Infectious/Inflammatory, Neoplastic, Degenerative, Iatrogenic/Intoxication, Congenital, Autoimmune/Allergic, Traumatic, Endocrine/Metabolic) to scaffold DDx; include “can’t-miss” etiologies.',
    'Risk stratification: explicitly flag red flags, time-sensitive conditions, and threshold criteria for escalation.',
    'Medication safety: reconcile BPMH (name, dose, route, frequency, indication, prescriber) and note potential interactions to VERIFY with a clinician or pharmacist—do not assert.',
    'SDM: outline options → expected benefits/harms → patient values/preferences → decision → review plan with explicit uncertainty communication.',
    'Cognitive appraisal: document health beliefs, worry level, catastrophizing vs realistic threat assessment, coping strategies; recommend evidence-based psychoeducation wording.',
    'Teach-Back: script patient-friendly re-statements of plans/instructions and prompt for corrections by the clinician.'
  ],

  template: (f) => {
    const level = f.help_level || 'overview';
    const focus = f.output_focus || 'organize for my doctor';
    const stage = f.care_stage || 'I feel unwell and want help figuring it out';

    const disclaimer = [
      '**SAFETY NOTE**: This output is educational and organizational only. It is NOT medical advice or a diagnosis. If any danger signs occur, follow local emergency guidance or seek urgent care immediately.'
    ].join('\n');

    const am3 = [
      f.am3_problem && `Main problem (in your words): ${f.am3_problem}`,
      f.am3_do && `What to do (as you understand it): ${f.am3_do}`,
      f.am3_why && `Why it matters to you: ${f.am3_why}`
    ].filter(Boolean).join('\n');

    const soap = [
      f.subjective && `Subjective (your story):\n${f.subjective}`,
      f.objective && `Objective (numbers/observations):\n${f.objective}`,
      f.assessment_notes && `Your thoughts (questions/ideas to explore):\n${f.assessment_notes}`,
      f.plan_wish && `What you’d like to try or ask next:\n${f.plan_wish}`
    ].filter(Boolean).join('\n');

    const bpmh = [
      f.meds && `BPMH — Medicines/supplements:\n${f.meds}`,
      f.allergies && `Allergies/reactions:\n${f.allergies}`,
      f.history && `Past conditions/surgeries/hospitalizations:\n${f.history}`,
      f.family && `Family history:\n${f.family}`
    ].filter(Boolean).join('\n');

    const red = [
      f.red_flags && `Red-flag signs to act on:\n${f.red_flags}`,
      f.escalation_plan && `Escalation plan (where to go/call):\n${f.escalation_plan}`
    ].filter(Boolean).join('\n');

    const sdm = [
      f.options && `Options under consideration:\n${f.options}`,
      f.benefits_risks && `Benefits/risks you care about:\n${f.benefits_risks}`,
      f.what_matters && `What matters most:\n${f.what_matters}`,
      f.decision_preference && `Decision preference: ${f.decision_preference}`
    ].filter(Boolean).join('\n');

    const logistics = [
      f.clinicians && `Clinicians:\n${f.clinicians}`,
      f.next_appointment && `Next appointment: ${f.next_appointment}`,
      f.pharmacy && `Pharmacy: ${f.pharmacy}`,
      f.insurance && `Insurance/payment notes:\n${f.insurance}`
    ].filter(Boolean).join('\n');

    const teach = [
      f.teachback && `Teach-Back (what you understood):\n${f.teachback}`,
      f.questions && `Questions to confirm:\n${f.questions}`
    ].filter(Boolean).join('\n');

    const clarQ = (() => {
      const qs_overview = [
        'When did symptoms start and how have they changed?',
        'Any known triggers or recent changes (travel, new meds, new foods/exposures)?',
        'What would “better” look like for you in the next week?'
      ];
      const qs_guided = qs_overview.concat([
        'Which symptoms are worst at rest vs activity vs night?',
        'Which home measures (temp, BP, HR, glucose, SpO₂, weight) do you have?',
        'Any recent infections, procedures, injuries, or vaccinations?'
      ]);
      const qs_concierge = qs_guided.concat([
        'List all meds/supplements with dose/route/frequency/indication/prescriber.',
        'Any family history of early heart disease, cancer syndromes, autoimmune disease, or endocrine disorders?',
        'What red-flag instructions have you already been given (if any)?'
      ]);
      if (level === 'concierge') return qs_concierge;
      if (level === 'guided') return qs_guided;
      return qs_overview;
    })();

    const emphasis = focus || 'organize for my doctor';

    return [
      'Create a clinician-ready health summary that organizes symptoms and information for safe discussion.',
      `Stage: ${stage} · Help level: ${level} · Emphasis: ${emphasis}`,
      disclaimer,
      '\nOutput format:',
      '- SBAR Abstract (clinician-facing): Situation, Background (BPMH highlights), Assessment (NON-DIAGNOSTIC working impressions), Recommendation (next steps/clarifications needed).',
      '- SOAP Detail (patient-friendly wording in S/O; clinician-structured A/P).',
      '- Provisional/Working/Differential hypotheses (clearly labeled NON-DIAGNOSTIC; list can’t-miss causes first; use VINDICATE categories).',
      '- Ask-Me-3 summary and Teach-Back prompts.',
      '- BPMH (Best Possible Medication History) with reconciliation notes to VERIFY.',
      '- Red-Flag plan with explicit escalation thresholds.',
      '- SDM worksheet: options → benefits/risks → values/preferences → decision → review cadence.',
      '- Appointment packet: questions for the clinician, logistics (next appt, pharmacy), and after-visit action list.',
      '\nClarifying questions (answer only what you can):',
      `• ${clarQ.join('\n• ')}`,
      am3 && `\nAsk-Me-3:\n${am3}`,
      soap && `\nSOAP diary:\n${soap}`,
      bpmh && `\nMedications & history:\n${bpmh}`,
      red && `\nSafety & escalation:\n${red}`,
      sdm && `\nShared decision-making:\n${sdm}`,
      teach && `\nTeach-Back & questions:\n${teach}`,
      logistics && `\nLogistics:\n${logistics}`,
      '\nClinical guidance (generation notes — keep technical):',
      '- Use problem representation and illness scripts; state pretest probability assumptions.',
      '- Differential: rank-ordered DDx with can’t-miss first; explicitly mark uncertainty and “next-best test” or observation windows.',
      '- Avoid prescriptive dosing; any therapeutic suggestions must be framed as general, non-specific examples to DISCUSS with MD/DO.',
      '- Highlight drug–drug or drug–condition concerns as “to verify with clinician/pharmacist.”',
      '- Close with a plain-language after-visit plan and safety netting.'
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Jobs — Targeting, Value Prop, Stories, Pipeline & Weekly OKRs
   Note: User-facing fields are plain-language. Output/boosters use recruiter/HR tech terminology.
--------------------------------------------------------- */
{
  id: 'task_jobs_alignment_pipeline',
  slug: 'jobs-alignment-targeting-pipeline-okrs',
  label: 'Jobs — Alignment, Targeting, Stories & Pipeline',
  kind: 'task',
  categories: ['career','planning','personal-admin'],
  tags: [
    'type:task',
    'topic:jobs',
    'use:planning',
    'use:research',
    'use:communication',
    'use:prioritization',
    'stage:intake'
  ],
  use_cases: [
    'figure out what roles/industries fit you best (alignment)',
    'make a short, focused target list of companies',
    'clarify your value to employers and your personal brand',
    'organize a job search pipeline with weekly habits',
    'collect achievement stories for applications and interviews',
    'plan a simple upskill plan to close gaps',
    'build a networking plan that actually happens'
  ],
  definition: 'A blended, practical job-search playbook that maps who you are to where you’ll thrive (alignment), crafts a focused target list (Targeting Matrix), makes your value obvious (personal Value Proposition Canvas), collects interview-ready stories (STAR/SOAR), runs a visible pipeline (Kanban with WIP limits), closes gaps (T-Gap Analysis with a 30-day upskill sprint), grows signal via informational conversations (Ladder), and locks weekly execution (OKRs). Plain inputs for you; output uses recruiter-grade, funnel-centric language.',
  help: 'Pick what kind of help you want. Fill what you know in your own words. The output changes based on your stage and focus: it can give you direction, a target list, a plan for the week, or structured stories.',
  fields: [
    /* Scope & mode — plain language; shapes output depth/focus */
    { key:'job_stage', label:'Where are you in your job search?', type:'select', desc:'This changes what the output focuses on.',
      options:[
        'Just exploring what fits me',
        'I know a few roles—need to focus',
        'I am actively applying',
        'I am interviewing now',
        'I’m stuck or losing motivation',
        'I want to grow my network'
      ]
    },
    { key:'help_focus', label:'What kind of help do you want?', type:'select', desc:'The summary will center on this.',
      options:[
        'Find direction and fit (alignment)',
        'Make a focused target list (companies/roles)',
        'Clarify my value and brand',
        'Organize my pipeline and weekly plan',
        'Build my achievement stories',
        'Create a 30-day upskill plan',
        'Plan informational chats and outreach'
      ]
    },
    { key:'help_level', label:'How much detail do you want?', type:'select', desc:'Controls the number of options and the depth.',
      options:[
        { label:'Overview (light, big picture)', value:'overview' },
        { label:'Guided (medium detail)', value:'guided' },
        { label:'Concierge (deep detail; step-by-step)', value:'concierge' }
      ]
    },

    /* Basics & constraints */
    { key:'strengths_vibe', label:'What are you good at / what do you enjoy?', type:'textarea', ph:'Your strengths, interests, work style' },
    { key:'constraints', label:'Constraints (time, pay, schedule, health, travel)', type:'textarea', ph:'Anything that limits or shapes your search' },
    { key:'comp_range', label:'Pay range you’re aiming for', type:'text', ph:'e.g., total $X–$Y; base + bonus if known' },
    { key:'work_mode', label:'Work setup', type:'select', options:['Remote','Hybrid','Onsite','Flexible'], desc:'Helps filter targets' },
    { key:'locations', label:'Locations you can work from', type:'text', ph:'City/region; remote okay?' },

    /* Targeting Matrix inputs */
    { key:'roles', label:'Roles you’re considering', type:'textarea', ph:'e.g., Product Manager, UX Researcher, Data Analyst' },
    { key:'industries', label:'Industries you like', type:'textarea', ph:'e.g., Health, EdTech, Climate, Gaming' },
    { key:'company_sizes', label:'Company sizes that fit you', type:'select',
      options:['0–50','51–200','201–1k','1k–5k','5k+'] },
    { key:'shortlist_known', label:'Companies already on your mind (optional)', type:'textarea', ph:'List any you already like' },

    /* Personal Value Proposition inputs (plain language) */
    { key:'employer_pains', label:'What problems do these employers have?', type:'textarea', ph:'In your words; what they struggle with' },
    { key:'your_gains', label:'What results can you help create?', type:'textarea', ph:'Outcomes you can drive' },
    { key:'proof_points', label:'Proof from your past work', type:'textarea', ph:'Wins, metrics, examples' },
    { key:'differentiators', label:'What makes you different?', type:'textarea', ph:'Edge, strengths, story' },

    /* STAR / SOAR story bank (user text, layman) */
    { key:'story_inputs', label:'Wins to turn into stories', type:'textarea', ph:'Short notes: what happened, what you did, what changed' },

    /* Pipeline & habits */
    { key:'pipeline_dump', label:'Paste your current leads/applications (optional)', type:'textarea', ph:'Company · role · stage · date · notes' },
    { key:'wip_limit', label:'How many active applications at once?', type:'text', ph:'e.g., 5–7' },
    { key:'followup_cadence', label:'Follow-up rhythm', type:'text', ph:'e.g., 5–7 days after apply; 48h after interview' },

    /* T-Gap Analysis */
    { key:'role_requirements', label:'What do job posts ask for?', type:'textarea', ph:'Paste bullets from a few postings' },
    { key:'your_skills', label:'Your current skills/tools', type:'textarea', ph:'Be honest; list strengths and gaps' },
    { key:'upskill_focus', label:'What you want to learn next 30 days', type:'textarea', ph:'Pick 1–2 high-impact topics' },

    /* Informational-Interview Ladder */
    { key:'target_people', label:'People you want to learn from', type:'textarea', ph:'Titles or names if you have them' },
    { key:'outreach_channels', label:'How you’ll reach out', type:'text', ph:'LinkedIn, alumni email, meetups' },
    { key:'time_budget', label:'Time per week you can spend', type:'text', ph:'e.g., 3–5 hours/week' },

    /* OKRs for job search */
    { key:'okr_objective', label:'Your big goal for the next 2–4 weeks', type:'text', ph:'Say it simply' },
    { key:'okr_krs', label:'How you’ll measure progress', type:'textarea', ph:'Numbers you can count each week' },

    /* Preferences for output emphasis */
    { key:'output_focus', label:'What should we highlight?', type:'select',
      options:[
        'direction and fit',
        'target list and research',
        'value proposition and brand',
        'pipeline and weekly plan',
        'story bank and interview prep',
        'upskill sprint',
        'networking plan'
      ] }
  ],

  boosters: [
    'Market mapping & ICP: construct an Ideal Candidate Profile against the target role family; align competencies to JD-derived behavioral indicators and leveling frameworks (IC vs M).',
    'Targeting Matrix: segment Role × Industry × Geo/Remote × Company Size; produce a ranked top-20 based on signal strength, hiring velocity, and comp bands; include 2–3 long-shot moonshots.',
    'Employer Value Proposition (EVP): synthesize a personal Value Proposition Canvas (pains/gains, jobs to be done, proof points); tie to revenue/cost/risk levers; surface differentiators.',
    'ATS/SEO hygiene: map core competencies and domain keywords to JD language; preserve meaning while optimizing keyword density and taxonomy (no keyword stuffing).',
    'STAR/CCAR/SOAR canon: normalize stories to quantifiable outcomes; include scope, constraints, metrics deltas, and counterfactual (what would have happened otherwise).',
    'Pipeline Kanban: enforce WIP limits, stage definitions (Leads → Applied → Screen → Interviewing → Offer → Closed), SLAs for follow-ups, and CRM hygiene (dates, owners, next-action).',
    'Funnel analytics: compute top-of-funnel to offer conversion, response rates, and cycle time; identify bottlenecks; run PDCA experiments on outreach copy, timing, and channel mix.',
    'T-Gap Analysis: diff role requirements vs skills; derive a minimal 30-day upskill sprint with deliverables and a public artifact (mini-project) to increase signal.',
    'Informational-Interview Ladder: ABM-style targeting, 2/day → 5/week → 50/quarter; ask for insight and calibration, not jobs; include compliance with local outreach etiquette.',
    'Search OKRs: set a concrete Objective and 3–5 measurable KRs; include weekly cadences, review ritual, and risk mitigations; treat energy/motivation as a tracked constraint.',
    'Offer-prep (if in scope): define BATNA, comp bands, TC ranges, equity mechanics (cliff/vesting), and non-cash levers; stay ethical (no misrepresentation).'
  ],

  template: (f) => {
    const level = f.help_level || 'overview';
    const stage = f.job_stage || 'Just exploring what fits me';
    const focus = f.help_focus || 'Find direction and fit (alignment)';
    const emphasis = f.output_focus || 'direction and fit';

    /* Clarifying questions scale with help level */
    const q_overview = [
      'What roles feel most interesting right now?',
      'What kind of work setup do you want (remote/hybrid/onsite)?',
      'What would a “good next step” look like in 2–4 weeks?'
    ];
    const q_guided = q_overview.concat([
      'Share 2–3 job posts you like—what patterns do you notice?',
      'Pick 3 wins you’re proud of—what changed because of you?',
      'How many hours/week can you reliably invest?'
    ]);
    const q_concierge = q_guided.concat([
      'Paste your current pipeline (company · role · stage · last touch).',
      'List your top 5 skills and 3 gaps for the next role.',
      'Name 10 people (titles or names) who could calibrate your path.'
    ]);
    const clarQ = level === 'concierge' ? q_concierge : level === 'guided' ? q_guided : q_overview;

    /* Assemble user basics */
    const basics = [
      f.strengths_vibe && `Strengths/energy:\n${f.strengths_vibe}`,
      f.constraints && `Constraints:\n${f.constraints}`,
      f.comp_range && `Comp target: ${f.comp_range}`,
      f.work_mode && `Work mode: ${f.work_mode}`,
      f.locations && `Locations: ${f.locations}`
    ].filter(Boolean).join('\n');

    /* Targeting inputs */
    const targeting = [
      f.roles && `Roles:\n${f.roles}`,
      f.industries && `Industries:\n${f.industries}`,
      f.company_sizes && `Company sizes: ${f.company_sizes}`,
      f.shortlist_known && `Known shortlist:\n${f.shortlist_known}`
    ].filter(Boolean).join('\n');

    /* Value prop inputs */
    const vpc = [
      f.employer_pains && `Employer pains:\n${f.employer_pains}`,
      f.your_gains && `Your outcomes:\n${f.your_gains}`,
      f.proof_points && `Proof points:\n${f.proof_points}`,
      f.differentiators && `Differentiators:\n${f.differentiators}`
    ].filter(Boolean).join('\n');

    /* Stories */
    const stories = f.story_inputs ? `Story seeds:\n${f.story_inputs}` : '';

    /* Pipeline */
    const pipe = [
      f.pipeline_dump && `Current pipeline:\n${f.pipeline_dump}`,
      f.wip_limit && `WIP limit: ${f.wip_limit}`,
      f.followup_cadence && `Follow-up cadence: ${f.followup_cadence}`
    ].filter(Boolean).join('\n');

    /* T-Gap */
    const tgap = [
      f.role_requirements && `Role requirements (from JDs):\n${f.role_requirements}`,
      f.your_skills && `Your skills:\n${f.your_skills}`,
      f.upskill_focus && `30-day upskill focus:\n${f.upskill_focus}`
    ].filter(Boolean).join('\n');

    /* Ladder */
    const ladder = [
      f.target_people && `People to learn from:\n${f.target_people}`,
      f.outreach_channels && `Outreach channels: ${f.outreach_channels}`,
      f.time_budget && `Weekly time budget: ${f.time_budget}`
    ].filter(Boolean).join('\n');

    /* OKRs */
    const okrs = [
      f.okr_objective && `Objective (next 2–4 weeks): ${f.okr_objective}`,
      f.okr_krs && `Key Results:\n${f.okr_krs}`
    ].filter(Boolean).join('\n');

    const disclaimer = [
      '**NOTE**: This is a planning/organization tool, not legal/financial advice. Do not misrepresent credentials or work.'
    ].join('\n');

    return [
      `Construct a recruiter-grade job search plan.`,
      `Stage: ${stage} · Help level: ${level} · Emphasis: ${emphasis}`,
      disclaimer,

      '\nOutput format:',
      '- Stage Diagnostic & Bottlenecks: summarize current search posture; identify constraint (focus, funnel, story, momentum).',
      '- Targeting Matrix (Role × Industry × Geo/Remote × Company Size): produce a ranked top-20 (include 2–3 stretch).',
      '- Personal Value Proposition (EVP/VPC): employer pains/gains, candidate outcomes, proof points, differentiators.',
      '- STAR/CCAR/SOAR Story Bank: 3–6 normalized, metric-anchored stories (problem scope, action, quant result).',
      '- Pipeline Kanban & Operating Rhythm: WIP limits, stage definitions, follow-up SLAs, CRM columns, next actions.',
      '- T-Gap Analysis & 30-Day Upskill Sprint: skill deltas → minimal curriculum → weekly deliverables (public artifact).',
      '- Informational-Interview Ladder: ABM targeting, outreach sequence, tracking, scripts (insight-first).',
      '- Weekly Search OKRs: Objective + measurable KRs; review cadence; risk mitigations; energy safeguards.',
      '- Next 7 Days: calendar-ready tasks and holds.',

      '\nClarifying questions (answer what you can):',
      `• ${clarQ.join('\n• ')}`,

      basics && `\nBasics:\n${basics}`,
      targeting && `\nTargeting inputs:\n${targeting}`,
      vpc && `\nValue proposition inputs:\n${vpc}`,
      stories && `\nStory seeds:\n${stories}`,
      pipe && `\nPipeline & habits:\n${pipe}`,
      tgap && `\nT-Gap & upskill:\n${tgap}`,
      ladder && `\nLadder plan inputs:\n${ladder}`,
      okrs && `\nOKRs:\n${okrs}`,

      '\nRecruiter/OPS guidance (generation notes — keep technical):',
      '- Convert qualitative inputs into an ICP (ideal candidate profile) aligned to JD competencies; map to leveling (IC3/4/5 etc.).',
      '- Rank Targeting Matrix by composite score: role fit, hiring velocity, geo feasibility, comp bands, and network access.',
      '- Normalize stories to outcomes with hard metrics; add counterfactual and complexity (scale, stakeholders, constraints).',
      '- Enforce pipeline hygiene: dates, last touch, next action; compute funnel conversion and cycle time; call out bottlenecks.',
      '- Derive a minimal 30-day upskill sprint with deliverables (mini-project, blog, demo) that increases recruiter signal.',
      '- Ladder: produce 10–20 named targets when possible; create a 3-touch outreach sequence; keep “ask for insight, not a job.”',
      '- OKRs: ensure at least one activity KR (inputs) and one result KR (interviews/offers); schedule weekly retros (PDCA).',
      '- Close with a crisp, role-specific brand narrative (2–3 sentences) and a 7-day calendarized action list.'
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Week Planning — Anti-Procrastination, Workload Triage & Motivation
   User-facing fields = plain language. Output/boosters = technical terminology
--------------------------------------------------------- */
{
  id: 'task_week_planning_anti_procrastination',
  slug: 'week-planning-triage-motivation',
  label: 'Week Planning — Focus, Triage & Motivation',
  kind: 'task',
  categories: ['planning','productivity','mental-health','personal-admin'],
  tags: [
    'type:task','topic:planning','topic:motivation','topic:anxiety',
    'use:weekly-review','use:time-blocking','use:prioritization',
    'use:behavioral-activation','use:cbt','use:act','stage:intake'
  ],
  use_cases: [
    'plan a sane week under heavy workload',
    'stop procrastination loops and make a small, do-able start',
    'set priorities using 1–3–5 and RICE (adapted)',
    'time-block your calendar around energy peaks (Energy Mapping)',
    'create a Pomodoro plan with a Parking Lot for distractions',
    'reduce guilt/anxiety with self-compassion scripts and safety nets',
    'align actions with values and pre-commit using a Ulysses Contract'
  ],
  definition: 'A mixed-method weekly planning and motivation workflow: GTD-lite Weekly Review to clear the decks, Time-Blocking anchored by “big rocks,” 1–3–5 daily triage, Theme Days for rhythm, Energy Mapping for chronotype fit, Pomodoro + Parking Lot for attentional control, Personal RAG status to right-size scope, and decision heuristics (Jobs-to-Be-Done, 10–10–10, Cost of Delay, RICE). The output layers clinically-informed behavior change patterns (behavioral activation, implementation intentions, cognitive reappraisal, values-committed action) into a practical, plain-English plan.',
  help: 'Tell me where you’re at and the kind of help you want (quick plan, deep plan, or somewhere in between). Fill in what you know; leave the rest blank. The output will shift to match your needs (simple checklist vs. detailed schedule and motivation plan).',

  fields: [
    /* Scope & mode — shapes depth and emphasis (plain language) */
    { key:'life_stage', label:'Where are you in life right now?', type:'select', desc:'Helps set tone and expectations.',
      options:[
        'Student / learning season','Job searching / career shift','Working with deadlines',
        'Parenting / caregiving','Health or recovery focus','Just overwhelmed and want calm'
      ]
    },
    { key:'help_focus', label:'What kind of help do you want most?', type:'select', desc:'This changes what the output centers on.',
      options:[
        'A simple weekly plan','A strict schedule I can follow',
        'Motivation and small first steps','Reduce anxiety and guilt',
        'Find direction and priorities','Align tasks with my values'
      ]
    },
    { key:'help_level', label:'How much detail?', type:'select', desc:'Controls the number of steps and questions.',
      options:[
        { label:'Overview (short & simple)', value:'overview' },
        { label:'Guided (medium detail)',   value:'guided'   },
        { label:'Concierge (deep detail)',  value:'concierge'}
      ]
    },

    /* Inputs for Weekly Review & priorities */
    { key:'hard_deadlines', label:'Real deadlines this week', type:'textarea', ph:'Dates/times you must hit' },
    { key:'big_rocks', label:'Top 3 important outcomes', type:'textarea', ph:'The three things that matter most' },
    { key:'must_do_log', label:'Must-do tasks (dump)', type:'textarea', ph:'Brain-dump everything on your mind' },
    { key:'nice_to_have', label:'Nice-to-have tasks', type:'textarea', ph:'If time/energy allows' },

    /* Time & energy */
    { key:'availability', label:'When are you free?', type:'textarea', ph:'Days/times, meetings, appointments' },
    { key:'energy_peaks', label:'When do you have the most energy?', type:'text', ph:'e.g., mornings; 10–12am & 3–5pm' },
    { key:'sleep_notes', label:'Sleep & rest notes', type:'textarea', ph:'Bedtime, wake time, naps, issues' },
    { key:'food_hydration', label:'Food & water plan (simple)', type:'textarea', ph:'Meals/snacks you can actually do; water reminder' },

    /* Mood & blockers (plain language) */
    { key:'feelings_now', label:'How do you feel about the week?', type:'textarea', ph:'Stressed, guilty, stuck, hopeful...' },
    { key:'anxiety_triggers', label:'What worries you most?', type:'textarea', ph:'What thoughts make it feel worse?' },
    { key:'distractions', label:'Top distractions', type:'textarea', ph:'Apps, tabs, people, chores, noise' },

    /* Decisions & prioritization helpers */
    { key:'decision_targets', label:'Things you’re unsure about', type:'textarea', ph:'Decisions, purchases, plans' },
    { key:'values', label:'What matters most to you right now?', type:'textarea', ph:'Family, health, learning, stability, etc.' },

    /* Structure preferences */
    { key:'theme_days', label:'Theme days (optional)', type:'textarea', ph:'Mon deep work, Tue meetings, Wed learning...' },
    { key:'daily_capacity', label:'Daily capacity (rough)', type:'text', ph:'e.g., 4 hrs Mon, 2 hrs Tue…' },
    { key:'pomodoro_style', label:'Focus sprint style', type:'select', options:['25/5','50/10','90/15','I’m not sure'] },
    { key:'rag_status', label:'How loaded do you feel right now?', type:'select', options:['Green (OK)','Amber (tight)','Red (overloaded)'] },

    /* Commitments & support */
    { key:'accountability', label:'Buddy or check-in (optional)', type:'text', ph:'Name or place you’ll check in' },
    { key:'ulysses', label:'Make a promise to your future self (optional)', type:'textarea', ph:'Write a short “I will…” pact' },

    /* Output preference */
    { key:'output_focus', label:'What should the plan highlight?', type:'select',
      options:[
        'stress relief & motivation','calendar schedule',
        'priority list + small steps','balance & values alignment'
      ]
    }
  ],

  boosters: [
    /* Technical/clinical generation guidance — heavy terminology on purpose */
    'Behavioral Activation Protocol: schedule activity-based mood repair using graded task assignment; prefer mastery/pleasure mix; quantify PE (pleasure) and ME (mastery) ratings pre/post.',
    'CBT Cognitive Model: surface automatic thoughts → cognitive distortions → generate alternative appraisals; attach implementation intentions (IF trigger THEN adaptive response).',
    'ACT Values-Commitment: derive committed actions from stated values; include acceptance/defusion language for experiential avoidance; add self-as-context reminders.',
    'Motivational Interviewing micro-skills: elicit change talk (DARN-CAT), affirm strengths, reflect ambivalence; summarize and lock next actions.',
    'Temporal Discounting & Precommitment: deploy Ulysses Contract, friction-increasing design (website blockers), and default options to counter present bias.',
    'Chronobiology/Ergonomics: align deep work to circadian/ultradian peaks; protect ATP with movement breaks; avoid high glycemic load immediately before focus blocks; caffeine timing with 90–120 min post-wake.',
    'Operational Excellence: GTD-lite Weekly Review → inbox zeroing, capture/clarify/organize; Time-Blocking with buffer; WIP limits; context switching minimization.',
    'Prioritization Heuristics: 1–3–5 daily triage; RICE (adapted for personal chores); Jobs-to-Be-Done framing; Cost of Delay and 10–10–10 temporal appraisal.',
    'Attentional Control: Pomodoro intervals, single-tasking, Parking Lot for intrusive thoughts; Zeigarnik relief by externalizing partials.',
    'Personal RAG Governance: Red → shrink scope/renegotiate; Amber → trim; Green → stretch; document renegotiations and explicit “done” definitions.',
    'Self-Compassion & Safety Netting: normalize lapses; use brief compassionate statements; re-entry protocol (reset cue → smallest next action).',
    'Spiritual/Mindfulness Options (opt-in): breathwork cadence, prayer/meditation, gratitude journaling; note as non-proselytizing optional modules.',
    'Safety: non-clinical planning only; if acute distress or risk, escalate to local professional help or emergency services.'
  ],

  template: (f) => {
    const level   = f.help_level || 'overview';
    const focus   = f.help_focus || 'A simple weekly plan';
    const stage   = f.life_stage || 'Just overwhelmed and want calm';
    const emph    = f.output_focus || 'priority list + small steps';
    const pom     = f.pomodoro_style || '25/5';
    const rag     = f.rag_status || 'Green (OK)';

    /* Clarifying questions scale with detail */
    const q_overview = [
      'What are the three most important outcomes this week?',
      'When are your busiest times?',
      'What small task could you finish in 10–15 minutes today?'
    ];
    const q_guided = q_overview.concat([
      'Name one task you’ve been avoiding—what’s the tiniest first step?',
      'When are your best focus hours on a normal day?',
      'What deadline is most at risk and why?'
    ]);
    const q_concierge = q_guided.concat([
      'Paste your calendar blocks that cannot move.',
      'List top three distractions and how to block them.',
      'Write a one-sentence promise to future-you for tomorrow morning.'
    ]);
    const clarQ = level === 'concierge' ? q_concierge : level === 'guided' ? q_guided : q_overview;

    /* Gather user inputs */
    const weekly = [
      f.hard_deadlines && `Deadlines:\n${f.hard_deadlines}`,
      f.big_rocks && `Big rocks (top 3 outcomes):\n${f.big_rocks}`,
      f.must_do_log && `Must-do dump:\n${f.must_do_log}`,
      f.nice_to_have && `Nice-to-haves:\n${f.nice_to_have}`
    ].filter(Boolean).join('\n');

    const timeEnergy = [
      f.availability && `Availability:\n${f.availability}`,
      f.energy_peaks && `Energy peaks: ${f.energy_peaks}`,
      f.sleep_notes && `Sleep/rest notes:\n${f.sleep_notes}`,
      f.food_hydration && `Food/water plan:\n${f.food_hydration}`
    ].filter(Boolean).join('\n');

    const feelings = [
      f.feelings_now && `Feelings about the week:\n${f.feelings_now}`,
      f.anxiety_triggers && `Worries/triggers:\n${f.anxiety_triggers}`,
      f.distractions && `Distractions to manage:\n${f.distractions}`
    ].filter(Boolean).join('\n');

    const decisions = [
      f.decision_targets && `Decisions/purchases to resolve:\n${f.decision_targets}`,
      f.values && `Values to honor now:\n${f.values}`
    ].filter(Boolean).join('\n');

    const structure = [
      f.theme_days && `Theme days:\n${f.theme_days}`,
      f.daily_capacity && `Daily capacity: ${f.daily_capacity}`,
      `Pomodoro preference: ${pom}`,
      `RAG status: ${rag}`
    ].filter(Boolean).join('\n');

    const supports = [
      f.accountability && `Accountability: ${f.accountability}`,
      f.ulysses && `Ulysses pact:\n${f.ulysses}`
    ].filter(Boolean).join('\n');

    const disclaimer = [
      '**SAFETY NOTE**: Planning and motivation support only — not medical or mental-health treatment. If you feel unsafe or in acute distress, seek local professional help or emergency services.'
    ].join('\n');

    return [
      'Construct a clinically-informed weekly plan that reduces avoidance and increases effective action.',
      `Life stage: ${stage} · Help level: ${level} · Focus: ${focus} · Emphasis: ${emph}`,
      disclaimer,

      '\nOutput format:',
      '- Weekly Review (GTD-lite): capture → clarify → organize; extract top 3 outcomes (“big rocks”).',
      '- Calendar Time-Blocking: place big rocks first; add buffers; defend blocks; include break cadence.',
      '- Daily 1–3–5 Plan: 1 big, 3 medium, 5 small; tie smalls to momentum and warm-ups.',
      '- Theme Days (optional): assign weekly rhythm to reduce switching costs.',
      '- Energy Mapping: schedule cognitively heavy tasks in peak windows; align with chronotype.',
      `- Pomodoro Plan (${pom}): intervals, break rules, and a Parking Lot to offload distractions.`,
      `- Personal RAG Governance (${rag}): scope/shrink/trim rules and renegotiation scripts.`,
      '- Decision Heuristics: JTBD framing; 10–10–10; Cost of Delay; RICE (adapted for chores/projects).',
      '- Behavioral Activation & Cognitive Tools: BA schedule, implementation intentions, reappraisal prompts.',
      '- Motivation & Self-Compassion: short statements, gratitude or prayer/meditation (opt-in), re-entry protocol.',
      '- Ulysses Contract: precommitment device(s), buddy check-ins, and environmental friction design.',
      '- Next 7 Days: calendar-ready blocks and a minimal “start here” list for today.',

      '\nClarifying questions (answer what you can):',
      `• ${clarQ.join('\n• ')}`,

      weekly && `\nWeekly info:\n${weekly}`,
      timeEnergy && `\nTime & energy:\n${timeEnergy}`,
      feelings && `\nMood & blockers:\n${feelings}`,
      decisions && `\nDecisions & values:\n${decisions}`,
      structure && `\nStructure prefs:\n${structure}`,
      supports && `\nCommitments & support:\n${supports}`,

      '\nGeneration guidance (keep technical/precise):',
      '- Convert big rocks into calendarized, buffered blocks; minimize context switches; cap WIP.',
      '- For each avoided task, produce an IF–THEN implementation intention and a 10–minute “toe-dip” version.',
      '- Apply RICE (Reach × Impact × Confidence ÷ Effort) to chores/projects; document scores briefly.',
      '- Use 10–10–10 to stress-test consequential choices; write the 1–2 sentence conclusion.',
      '- Behavioral Activation: schedule mastery/pleasure tasks; record ME/PE ratings to reinforce.',
      '- Cognitive Reappraisal: list automatic thought → distortion label → alternative thought; keep language brief.',
      '- ACT: connect at least one block to a stated value; add a one-line committed action statement.',
      '- Pomodoro: enforce single-tasking; log Parking Lot items; perform a 2-min shutdown to close loops.',
      '- RAG: include rules for scope cuts (Red), trims (Amber), and stretch (Green); write a renegotiation script.',
      '- Nutrition/energy hygiene: hydration reminder, simple meal anchors; avoid advice beyond general planning.',
      '- Close with a 24-hour “start here” micro-plan and a compassionate self-check statement.'
    ].filter(Boolean).join('\n');
  }
},

/* ---------------------------------------------------------
   TASK: Product — Plain Words → Specs → Code (AI/Dev-Ready Instructions)
   User-facing fields = plain language. Output/boosters = very technical.
--------------------------------------------------------- */
{
  id: 'task_plain_to_specs_to_code',
  slug: 'product-plain-words-to-specs-to-code',
  label: 'Product — Plain Words → Specs → Code',
  kind: 'task',
  categories: ['product','engineering','planning','specs','coding'],
  tags: [
    'type:task','topic:requirements','topic:specification','topic:testing',
    'use:architecture','use:codegen','use:roadmap','use:contracts','use:workflow','stage:intake'
  ],
  use_cases: [
    'turn plain-English vision into developer-ready instructions',
    'produce executable specs (tests first) that drive code',
    'generate a slice roadmap that breaks work into shippable chunks',
    'define APIs, data models, and contracts from simple inputs',
    'align non-functional needs (security, performance, reliability) to build plan',
    'create BDD/TDD scaffolding for immediate implementation',
    'communicate UX (user experience) or product design ideas to engineers'
  ],
  definition: 'A practical bridge from everyday words to implementation: you describe your idea and users in simple language; the template converts it to precise technical instructions, executable specs, and a slice roadmap. It blends approachable guidance with rigorous engineering outputs so an expert developer—or an AI set up as an “expert dev”—can generate code or build iteratively.',
  help: 'Tell us what you want to build, who it’s for, and any preferences you have. Choose how detailed you want the plan, and whether you want tests first, code now, or a slice-by-slice roadmap. Use your own words; we’ll translate it into technical specs.',

  fields: [
    /* Stage & focus (plain language, but these inject technical posture into the output) */
    { key:'proj_stage', label:'Where are you in this project?', type:'select', desc:'Helps pick the right depth and starting point.',
      options:[
        'Just an idea and some notes',
        'I have wireframes or a rough doc',
        'There is a tiny prototype',
        'We need to scale or refactor'
      ]
    },
    { key:'help_focus', label:'What do you want right now?', type:'select', desc:'This steers the output.',
      options:[
        'Make me a detailed build plan (steps & slices)',
        'Generate starter code from my idea',
        'Write tests/specs first, then code',
        'Clarify user stories & acceptance criteria',
        'Design API/data models & contracts',
        'Plan integrations and workflows'
      ]
    },
    { key:'help_level', label:'How much detail?', type:'select', desc:'Controls complexity of the output.',
      options:[
        {label:'Overview (short and simple)',   value:'overview'},
        {label:'Guided (medium detail)',        value:'guided'},
        {label:'Concierge (deep, step-by-step)',value:'concierge'}
      ]
    },

    /* Vision & users (plain words) */
    { key:'vision', label:'What do you want to build?', type:'textarea',
      ph:'Describe the problem and the outcome you want. Keep it simple.',
      desc:'Big picture in your words.' },
    { key:'users', label:'Who will use this?', type:'textarea',
      ph:'List the types of people and what they’re trying to do.',
      desc:'Who they are and why they care.' },
    { key:'user_stories', label:'User stories (optional)', type:'textarea',
      ph:'As a [type of user], I want [goal], so that [benefit]. One per line.',
      desc:'Write any that come to mind.' },
    { key:'acceptance', label:'How do we know it works?', type:'textarea',
      ph:'Write simple checks you’d use to say “done.”',
      desc:'Acceptance checks in plain language.' },

    /* Features & scope */
    { key:'must_haves', label:'Must-haves', type:'textarea', ph:'The features you need for a first version.' },
    { key:'nice_haves', label:'Nice-to-haves', type:'textarea', ph:'Good later, not necessary now.' },
    { key:'constraints', label:'Limits and constraints', type:'textarea',
      ph:'Budget, timeline, devices, offline, privacy, etc.', desc:'Anything that limits choices.' },

    /* Platform & stack preferences (labels are simple, values inject technical details) */
    { key:'platform', label:'Main kind of build', type:'select', desc:'Choose the best fit for what you want.',
      options:['Web app','Mobile app','Desktop app','API/service','Data pipeline','Automation/Workflow','Library/Package','CLI tool']
    },
    { key:'stack_pref', label:'Preferred tech (optional)', type:'select', desc:'Pick a general direction. We’ll adapt.',
      options:[
        { label:'JavaScript/TypeScript web', value:'Node.js + TypeScript · Fastify/Express · Zod/TypeBox for schemas · Prisma + PostgreSQL · Vite/Next.js (if UI) · Playwright/Jest for tests' },
        { label:'Python web/data',           value:'Python · FastAPI · Pydantic for schemas · SQLModel/PostgreSQL · Celery/Redis for jobs · PyTest/Hypothesis for tests' },
        { label:'Go services',               value:'Go · Chi/Fiber · OpenAPI + oapi-codegen · sqlc/PostgreSQL · Wire for DI · Testify + Pact for tests/contracts' },
        { label:'Rust services',             value:'Rust · Actix/Axum · Serde · SQLx/PostgreSQL · Tokio jobs · Protobuf/gRPC · Cargo tests + property-based proptests' }
      ]
    },

    /* Architecture & development posture (labels simple; values include heavy technical defaults) */
    { key:'arch_style', label:'Architecture preference', type:'select', desc:'How the internals are structured.',
      options:[
        { label:'Keep it simple (MVC-ish)', value:'Layered MVC-ish with clear controller/service/repo seams; keep DI light; focus on rapid delivery.' },
        { label:'Clean/Hexagonal + DDD',    value:'Hexagonal Architecture (ports/adapters) · DDD tactical patterns (Entities/Aggregates/Value Objects/Domain Services) · Application Services orchestration · Anti-corruption layer for integrations.' },
        { label:'Event-driven',             value:'Event-sourced aggregates (optional) · Outbox pattern · Pub/Sub · Idempotent handlers · Exactly-once-through-at-least-once semantics via dedupe keys.' }
      ]
    },
    { key:'testing_mode', label:'How should we test first?', type:'select', desc:'Choose your favorite approach.',
      options:[
        { label:'TDD (tests first)', value:'Test-Driven Development: red → green → refactor; unit tests precede implementation; test pyramid enforced.' },
        { label:'BDD (scenarios first)', value:'Behavior-Driven Development: Gherkin Given–When–Then → step defs → code; living documentation via Cucumber/Behave/SpecFlow.' },
        { label:'Executable docs', value:'Executable Specifications: Concordion/FitNesse/Jest-doc blocks where prose maps to assertions; documentation as tests.' }
      ]
    },
    { key:'contract_mode', label:'API/contract style', type:'select', desc:'How clients/servers agree.',
      options:[
        { label:'OpenAPI/REST',   value:'OpenAPI 3.x schema-first; JSON Schema validation; Pact consumer/provider contract tests; codegen for clients/servers.' },
        { label:'GraphQL',        value:'GraphQL SDL-first; schema directives; persisted queries; contract checks between client operations and schema.' },
        { label:'gRPC/Protobuf',  value:'Protobuf IDL; gRPC services; backward-compatible field evolution; Buf lint/build; contract validation via schema registry.' }
      ]
    },
    { key:'workflow_mode', label:'Workflow style (optional)', type:'select', desc:'Useful if there are steps and approvals.',
      options:[
        { label:'State machine', value:'Finite State Machine/Statecharts (XState/SCXML); explicit states, events, guards, effects; visualizable; formal reachability.' },
        { label:'Workflow engine', value:'Temporal/Step Functions/Airflow: DAG/stateful orchestrations; retries/backoffs; saga compensation; observability.' },
        { label:'None/keep simple', value:'Inline orchestration in app service; avoid over-tooling.' }
      ]
    },

    /* Data, integrations, constraints (plain words) */
    { key:'entities', label:'Important data and fields', type:'textarea',
      ph:'List the main things you store (e.g., users, orders) and key fields.',
      desc:'We’ll turn this into models/schemas.' },
    { key:'integrations', label:'APIs and services to connect', type:'textarea',
      ph:'Payments, auth, email, maps, LLMs, etc.' },
    { key:'privacy', label:'Privacy or compliance needs (optional)', type:'textarea',
      ph:'Any rules (e.g., no PII, HIPAA-like, GDPR, retention limits). Keep it simple.' },
    { key:'scale', label:'How big should this go (rough)?', type:'text',
      ph:'e.g., thousands of users, sub-second actions, nightly batch okay',
      desc:'Speed, size, or timing in simple terms.' },

    /* LLM/Agent use (optional — layman wording) */
    { key:'ai_use', label:'Do you want AI helpers inside?', type:'select',
      options:['No AI','Light assistance (summaries)','Assistant tools (multi-step)','Autonomous agent (advanced)'],
      desc:'We’ll translate to the right pattern safely.' },

    /* Preferences for output emphasis */
    { key:'deliverable_pref', label:'What should we deliver?', type:'select',
      options:['Code now','Slice roadmap','Tests/specs first','Both code and roadmap'] },
    { key:'notes', label:'Other notes or links (optional)', type:'textarea',
      ph:'Drop any docs, mockups, or examples here.' }
  ],

  boosters: [
    'Requirements Engineering: distill problem statements into verifiable acceptance criteria; normalize to INVEST user stories; attach explicit non-functional requirements (availability, latency, throughput, SLOs).',
    'BDD/TDD Stack: generate Gherkin scenarios (Given/When/Then); map steps to glue code; create failing unit tests first; enforce a test pyramid with contract and e2e layers.',
    'Executable Specifications: favor spec-as-code; wire Concordion/FitNesse or doc-test blocks to CI for living documentation.',
    'Contracts & Schemas: schema-first via OpenAPI/GraphQL/gRPC; generate client/server stubs; add Pact contract suites for consumer/provider verification and CI gating.',
    'Architecture: apply Hexagonal (ports/adapters) or Layered (MVC) with DDD where domain complexity warrants; codify aggregates and invariants; add anti-corruption layers at integration seams.',
    'Patterns Mapping: translate intents to Command objects; configure Strategy for behavior swaps; apply Chain of Responsibility for NL intent pipelines; use Builder/Factory for complex constructions.',
    'DSL & Parsing: define a minimal textual DSL/JSON schema for commands; parse with Nearley/PEG.js/ANTLR as needed; compile to an AST → evaluators/generators.',
    'State & Workflow: model flows as statecharts or orchestrated DAGs; ensure idempotency, timeouts, retries, and compensation (sagas).',
    'Quality & Safety Nets: property-based tests for critical invariants; Design by Contract pre/postconditions; feature flags and guarded rollouts; observability (structured logging, tracing).',
    'CI/CD & Scaffolding: project generators (Yeoman/Plop/Hygen); infra as code for environments; GitHub Actions pipelines with test/contract/lint gates; one-step bootstrap commands.',
    'RAG/Dev-AI: retrieval to ground codegen on repo standards; planner–executor patterns (ReAct/Plan-and-Execute) for tool orchestration; strict JSON tool contracts for function calling.'
  ],

  template: (f) => {
    const level = f.help_level || 'overview';
    const focus = f.help_focus || 'Make me a detailed build plan (steps & slices)';
    const stage = f.proj_stage || 'Just an idea and some notes';
    const deliver = f.deliverable_pref || 'Slice roadmap';

    const basics = [
      f.vision && `Vision (plain):\n${f.vision}`,
      f.users && `Users & goals (plain):\n${f.users}`,
      f.user_stories && `User stories (plain):\n${f.user_stories}`,
      f.acceptance && `Acceptance checks (plain):\n${f.acceptance}`,
      f.must_haves && `Must-haves:\n${f.must_haves}`,
      f.nice_haves && `Nice-to-haves:\n${f.nice_haves}`,
      f.constraints && `Constraints:\n${f.constraints}`,
      f.entities && `Entities (plain):\n${f.entities}`,
      f.integrations && `Integrations (plain):\n${f.integrations}`,
      f.privacy && `Privacy/compliance (plain):\n${f.privacy}`,
      f.scale && `Scale (plain): ${f.scale}`,
      f.notes && `Notes/links:\n${f.notes}`
    ].filter(Boolean).join('\n');

    /* Technical knobs injected verbatim to steer the spec */
    const knobs = [
      f.platform && `Platform focus: ${f.platform}`,
      f.stack_pref && `Stack preference: ${f.stack_pref}`,
      f.arch_style && `Architecture style: ${f.arch_style}`,
      f.testing_mode && `Test posture: ${f.testing_mode}`,
      f.contract_mode && `Contract style: ${f.contract_mode}`,
      f.workflow_mode && `Workflow style: ${f.workflow_mode}`,
      f.ai_use && `AI assist level: ${f.ai_use}`
    ].filter(Boolean).join('\n');

    /* Clarifying questions scale with level */
    const q_overview = [
      'What’s the smallest slice we could ship that proves value?',
      'Which single user story, if finished, would make you smile?',
      'Any must-use vendor/tool we should lock in?'
    ];
    const q_guided = q_overview.concat([
      'List 3–5 acceptance checks for the smallest slice.',
      'Name one risky integration or performance concern.',
      'Where should sensitive data (if any) be kept or avoided?'
    ]);
    const q_concierge = q_guided.concat([
      'Paste one example record for each main entity.',
      'Name 3 API operations you expect (verb + resource).',
      'Pick one end-to-end flow to model as a statechart.'
    ]);
    const clarQ = level === 'concierge' ? q_concierge : level === 'guided' ? q_guided : q_overview;

    const outRules = [
      'Output format:',
      '- 0) Posture: Stage, Focus, Detail level, Deliverable.',
      '- 1) Requirements Distillation → verifiable Acceptance Criteria (INVEST).',
      '- 2) User Stories & AC: “As a…, I want…, so that…” + acceptance checks.',
      '- 3) BDD Scenarios (Gherkin): Given–When–Then for key flows.',
      '- 4) Contracts & Schemas: OpenAPI/GraphQL/gRPC definitions (schema-first).',
      '- 5) Architecture & Patterns: modules, boundaries, and key design patterns.',
      '- 6) Data & Integrations: entities, invariants, and external services.',
      '- 7) Slice Roadmap (INVEST): milestone plan and definition-of-done per slice.',
      '- 8) Test Plan (TDD/BDD/Executable Specs) and contract tests (Pact if REST).',
      '- 9) Scaffolding & CI/CD: generators, commands, pipelines, environments.',
      '- 10) Code Stubs or Commands: starter files, step defs, or CLI to bootstrap.',
      '- 11) Risks, Assumptions, Next Steps.'
    ].join('\n');

    return [
      'Produce developer-grade instructions that translate plain inputs into executable specifications and/or code.',
      `Posture → Stage: ${stage} · Focus: ${focus} · Detail: ${level} · Deliverable: ${deliver}`,
      knobs && `\nTechnical posture knobs:\n${knobs}`,
      basics && `\nPlain inputs to honor:\n${basics}`,
      '\nClarifying questions (answer what you can):',
      `• ${clarQ.join('\n• ')}`,

      '\nGuidance (keep highly technical in the output):',
      '- From plain words → specs → code: preserve user intent; formalize as specs; implement via slices.',
      '- Use User Stories & Acceptance Criteria for scope; normalize to INVEST.',
      '- Generate BDD Gherkin scenarios for critical flows; map to step definitions.',
      '- If TDD selected, create failing unit tests per requirement before implementation.',
      '- If “Contracts” selected, generate schema-first (OpenAPI/GraphQL/gRPC) and Pact tests for providers/consumers.',
      '- For patterns, map intents to Command objects; Strategy for variant behaviors; CoR for NL parsing pipeline; Builder/Factory for composition.',
      '- If DSL desired, sketch a minimal grammar → AST; define interpreter for actions.',
      '- Model flows as statecharts or orchestrated workflows with retries/backoffs/compensation.',
      '- Add Design by Contract (pre/post/invariants) and property-based tests for critical logic.',
      '- Provide scaffolding commands (generators), CI gates (lint/test/contract), and environment setup.',
      '- Close with either code stubs, step definitions, or a shell of the project that compiles.',

      `\n${outRules}`
    ].filter(Boolean).join('\n');
  },

  meta: {
    search_text: 'specification bdd tdd contract openapi graphql grpc pact hexagonal ddd command strategy chain builder factory ast parser xstate temporal scaffold codegen cicd'
  }
},

/* ---------------------------------------------------------
   TASK: Language Optimizer — ATS / Domain-Language / SEO / AIEO
   User-facing fields = plain language. Output/boosters = highly technical.
--------------------------------------------------------- */
{
  id: 'task_language_optimizer',
  slug: 'language-optimizer-ats-domain-seo-aieo',
  label: 'Language Optimizer — ATS · Domain · SEO · AIEO',
  kind: 'task',
  categories: ['writing','career','marketing','product','documentation'],
  tags: [
    'type:task','topic:optimization','topic:seo','topic:ats','topic:taxonomy',
    'use:rewrite','use:metadata','use:keywords','use:classification','stage:intake'
  ],
  use_cases: [
    'optimize résumé or profile for ATS keyword matching',
    'translate content into industry-native vocabulary (controlled terms)',
    'improve on-page SEO and structured metadata for sites/portfolios',
    'make content “answer-ready” for AI Overviews, Copilot, and LLM answer engines',
    'produce a jargon-accurate rewrite while preserving original meaning'
  ],
  definition: 'A practical bridge from plain-language content to machine- and expert-readable outputs. You paste text and choose how to optimize (ATS résumé, industry domain-language, classic SEO+metadata, or AI-SEO/AIEO). The template returns a tightly-specified, technical instruction set and a transformed version of your content aligned to parsing, indexing, and retrieval behaviors — while keeping your intent clear for humans.',
  help: 'Pick your content type and how you want it optimized. Paste your content, add any files context, choose tone/audience, and set preferences. The output will provide a detailed instruction set and a rewritten version tuned to your selection.',

  fields: [
    /* What are we optimizing? */
    { key:'content_type', label:'What are you optimizing?', type:'select',
      ph:'Choose one', desc:'This guides structure and vocabulary.',
      options:[
        'Résumé / CV','LinkedIn profile section','Portfolio page',
        'Job description','Blog article','Product page',
        'Documentation / API guide','About page','Press release',
        'Social post / caption','Other plain text'
      ]
    },
    { key:'opt_mode', label:'How should it be optimized?', type:'select',
      ph:'Pick the main optimization mode', desc:'Choose the primary optimization target.',
      options:[
        'ATS (résumé keyword) optimization',
        'Domain-language optimization (skills taxonomies)',
        'Classic SEO + metadata optimization',
        'AI-SEO / AIEO (AI Overviews, Copilot, LLM answers)',
        'Multi-mode (combine intelligently)'
      ]
    },

    /* Core content */
    { key:'content_raw', label:'Your content', type:'textarea',
      ph:'Paste the exact text you want optimized', desc:'Full text with headings if any.' },

    /* Files */
    { key:'files_included', label:'Will you upload files too?', type:'select',
      ph:'Yes or No', desc:'If you plan to add files, say so.',
      options:['No','Yes (additional files)']
    },
    { key:'files_context', label:'Notes about uploaded files (optional)', type:'textarea',
      ph:'Describe files or paste key excerpts', desc:'Give context for parsing or cross-referencing.' },

    /* Audience & tone */
    { key:'personas', label:'Audience (personas)', type:'repeater_persona_inline',
      ph:'Add one or more audience types', desc:'Who should this speak to?',
      item_label:'Persona',
      fields:[
        { key:'p_name', label:'Name', type:'text', ph:'e.g., Tech Recruiter', desc:'Short persona label.' },
        { key:'p_role', label:'Role/level', type:'text', ph:'e.g., Senior TA Partner', desc:'Their job/level.' },
        { key:'p_goals', label:'Goals', type:'text', ph:'e.g., Fill ML engineer reqs fast', desc:'What they want.' },
        { key:'p_pain', label:'Pain points', type:'text', ph:'e.g., Keyword mismatch in résumés', desc:'What frustrates them.' },
        { key:'p_terms', label:'Terms they use', type:'text', ph:'e.g., BM25, vector search, MLOps', desc:'Native vocabulary.' }
      ]
    },
    { key:'tone_select', label:'Tone/style', type:'select',
      ph:'Pick a tone', desc:'We’ll mirror this tone in human-facing parts.',
      options:[
        'Neutral professional','Friendly expert','Academic formal',
        'Punchy marketing','Journalistic concise','Technical documentation',
        'Conversational plain'
      ]
    },
    { key:'tone_custom', label:'Custom tone words (optional)', type:'text',
      ph:'e.g., confident, evidence-led, warm', desc:'Extra tone hints.' },
    { key:'reading_level', label:'Reading level', type:'select',
      ph:'Pick a level', desc:'Approximate complexity for humans.',
      options:['6th grade','8th grade','10th grade','College','Expert']
    },
    { key:'locale', label:'Region/locale', type:'text',
      ph:'e.g., US-English, UK-English, CA-English', desc:'Spellings and examples will match this.' },

    /* Keyword & taxonomy steering */
    { key:'keywords_include', label:'Keywords to include', type:'textarea',
      ph:'Comma-separated phrases to include verbatim', desc:'Exact strings you want present.' },
    { key:'keywords_avoid', label:'Words to avoid', type:'textarea',
      ph:'Comma-separated words/phrases to avoid', desc:'We’ll minimize or replace these.' },
    { key:'taxonomy_pref', label:'Domain taxonomy source', type:'select',
      ph:'Pick a vocabulary', desc:'Use controlled terms when mapping.',
      options:[
        'Auto (detect likely taxonomy)','O*NET (US)','ESCO (EU)','Custom internal term bank'
      ]
    },
    { key:'taxonomy_code', label:'Target occupation/code (optional)', type:'text',
      ph:'e.g., O*NET 15-2051.00 · Data Scientist', desc:'Adds precise term mapping.' },

    /* ATS-specific context */
    { key:'job_title', label:'Target job title (ATS)', type:'text',
      ph:'e.g., Machine Learning Engineer', desc:'Exact title from the posting.' },
    { key:'jd_text', label:'Job description text (ATS)', type:'textarea',
      ph:'Paste the key JD bullets', desc:'We’ll mirror exact strings and synonyms.' },

    /* SEO / AIEO specifics */
    { key:'site_url', label:'Site/page URL (SEO)', type:'text',
      ph:'e.g., https://example.com/work/ml-project', desc:'Used for slugs/internal links.' },
    { key:'primary_topic', label:'Primary topic/entity', type:'text',
      ph:'e.g., Retrieval-Augmented Generation (RAG)', desc:'The central concept to model.' },
    { key:'schema_types', label:'Structured data type', type:'select',
      ph:'Pick one', desc:'JSON-LD schema to include.',
      options:[
        'Auto by content','Article','Person','Organization','Project','HowTo','FAQPage','JobPosting','Product'
      ]
    },
    { key:'images_present', label:'Do you have images?', type:'select',
      ph:'Yes or No', desc:'Enables alt text and captions.',
      options:['No','Yes (images available)']
    },
    { key:'citations_available', label:'Do you have sources to cite?', type:'select',
      ph:'Yes or No', desc:'For AI/SEO trust signals.',
      options:['No','Yes (list below)']
    },
    { key:'sources_list', label:'Citations / source URLs (optional)', type:'textarea',
      ph:'One per line with short title', desc:'Used for reference and linking.' },

    /* Constraints & preferences */
    { key:'word_count', label:'Target length (optional)', type:'text',
      ph:'e.g., ~600 words; or “keep same length”', desc:'We’ll aim near this.' },
    { key:'style_guides', label:'Style guide (optional)', type:'text',
      ph:'e.g., AP, Chicago, Google, Microsoft', desc:'We’ll lean toward this style.' },
    { key:'internal_links', label:'Internal links (SEO)', type:'textarea',
      ph:'List anchor → URL on your site', desc:'We’ll weave these in naturally.' },
    { key:'help_level', label:'How much detail?', type:'select',
      ph:'Pick a level', desc:'Controls depth and number of outputs.',
      options:[
        { label:'Overview (quick pass)', value:'overview' },
        { label:'Guided (medium detail)', value:'guided' },
        { label:'Concierge (deep, exhaustive)', value:'concierge' }
      ]
    },
    { key:'notes', label:'Other notes (optional)', type:'textarea',
      ph:'Anything special we should honor', desc:'Edge cases, compliance, etc.' }
  ],

  boosters: [
    /* Heavy technical guidance for generation */
    'ATS Parsing Semantics: optimize for text-selectable PDFs/DOCX; avoid tables/columns/headers/footers/icons; use standard section headings; surface exact JD strings in Experience bullets and a Skills section; include synonyms (LLM ↔ large language model); prefer quantified outcomes; validate order by plain copy-paste test.',
    'Recruiter Retrieval Reality: many ATS do boolean term search; ensure AND-term coverage for must-have skills; place critical tokens in high-signal zones (section headers, bullet starts, job titles).',
    'Domain-Language Normalization: map content to controlled vocabularies (O*NET/ESCO) using canonical skill/task/tool names; maintain a term bank (canonical ↔ synonyms ↔ evidence lines); preserve semantic fidelity while maximizing token overlap with the target taxonomy.',
    'On-Page SEO: craft <title> aligned to H1; unique meta description; semantic headings (H2 Q-form where useful); descriptive anchors; image alt attributes; clean URL slug; internal linking to relevant clusters.',
    'Technical SEO: suggest structured data (JSON-LD) per schema_types; avoid duplication; include canonical link hints; consider hreflang for locale; highlight Core Web Vitals (LCP/INP/CLS) risks and remediations.',
    'AIEO (AI Overviews/Copilot Readiness): produce “answerable, citable chunks”: definition/steps/facts boxes; short, self-contained paragraphs; explicit entities; cite credible sources when provided; optimize for snippetability and passage ranking.',
    'Evaluation Heuristics: generate a Keyword Coverage Table (required/synonyms/variants); BM25/BERT-style term salience notes; entity list; schema JSON-LD block; and a Delta Log of changes with rationale.',
    'Safety & Fidelity: do not fabricate facts; preserve authorial claims; mark uncertainties; ensure any metrics or claims remain traceable to sources_list if supplied.'
  ],

  template: (f) => {
    const mode   = f.opt_mode || 'ATS (résumé keyword) optimization';
    const level  = f.help_level || 'overview';
    const ctype  = f.content_type || 'Other plain text';
    const tone   = f.tone_select || 'Neutral professional';
    const locale = f.locale || 'US-English';

    /* Clarifying questions scale with detail */
    const q_overview = [
      'What is the single most important outcome of this optimization?',
      'Name 3 exact phrases that must appear.',
      'Are there any terms we must avoid or soft-pedal?'
    ];
    const q_guided = q_overview.concat([
      'List 2 competitor/comparator pages or profiles we should consider.',
      'If ATS: paste 5–10 JD bullets; if SEO/AIEO: list 3 question-style queries users might ask.',
      'Should we keep length or change it?'
    ]);
    const q_concierge = q_guided.concat([
      'Provide any analytics or search data you have (queries, CTR, dwell).',
      'Provide authoritative taxonomy codes (e.g., O*NET/ESCO) if known.',
      'If images exist, list intended alt-text roles (informational vs decorative).'
    ]);
    const clarQ = level === 'concierge' ? q_concierge : level === 'guided' ? q_guided : q_overview;

    const personasBlock = f.personas ? 'Personas provided: yes — align vocabulary and benefits to those roles.\n' : 'Personas provided: no — default to target audience implied by content type.\n';
    const filesBlock = (f.files_included === 'Yes (additional files)') ? 'Files: additional context expected — integrate excerpts as needed.\n' : 'Files: none indicated.\n';

    const basics = [
      `Content type: ${ctype}`,
      `Optimization mode: ${mode}`,
      `Locale: ${locale}`,
      `Tone: ${tone}${f.tone_custom ? ' · Extra tone hints: ' + f.tone_custom : ''}`,
      f.reading_level && `Reading level: ${f.reading_level}`,
      f.word_count && `Target length: ${f.word_count}`,
      f.style_guides && `Style guide: ${f.style_guides}`
    ].filter(Boolean).join('\n');

    const steering = [
      f.keywords_include && `Keywords to include: ${f.keywords_include}`,
      f.keywords_avoid && `Words to avoid: ${f.keywords_avoid}`,
      f.taxonomy_pref && `Taxonomy: ${f.taxonomy_pref}`,
      f.taxonomy_code && `Target occupation/code: ${f.taxonomy_code}`,
      f.job_title && `Target job title: ${f.job_title}`,
      f.site_url && `URL: ${f.site_url}`,
      f.primary_topic && `Primary topic/entity: ${f.primary_topic}`,
      f.schema_types && `Structured data type: ${f.schema_types}`,
      f.images_present && `Images present: ${f.images_present}`,
      f.citations_available && `Citations available: ${f.citations_available}`
    ].filter(Boolean).join('\n');

    const context = [
      f.jd_text && `JD (for ATS):\n${f.jd_text}`,
      f.internal_links && `Internal links:\n${f.internal_links}`,
      f.sources_list && `Sources:\n${f.sources_list}`,
      f.files_context && `Files context:\n${f.files_context}`,
      f.notes && `Notes:\n${f.notes}`
    ].filter(Boolean).join('\n');

    /* Output sections vary by mode */
    const modeSections = (() => {
      switch (mode) {
        case 'ATS (résumé keyword) optimization':
          return [
            '- Optimized ATS Version (plain text, bullet-first, quantified where possible).',
            '- Keyword Coverage Table (JD tokens, synonyms, locations in document).',
            '- Structure & Parsing Checklist (sections, formatting, copy-paste sanity).',
            '- Risk & Repair Notes (potential ATS failure points and fixes).'
          ];
        case 'Domain-language optimization (skills taxonomies)':
          return [
            '- Domain-Language Rewrite (canonical terms integrated naturally).',
            '- Term Bank Mapping (canonical ↔ synonyms ↔ evidence lines).',
            '- Controlled Vocabulary Alignment (O*NET/ESCO codes if provided).',
            '- Drift Warnings (where plain phrasing diverged from canonical).'
          ];
        case 'Classic SEO + metadata optimization':
          return [
            '- On-Page Rewrite (H1/H2s, scannable paragraphs, descriptive anchors).',
            '- <title> and Meta Description (aligned to H1; unique, benefit-led).',
            '- Structured Data (JSON-LD per selected schema_types).',
            '- Internal Link Plan + URL Slug Suggestion + CWV risk notes.'
          ];
        case 'AI-SEO / AIEO (AI Overviews, Copilot, LLM answers)':
          return [
            '- Answer-Ready Blocks (definitions, steps, facts box at top).',
            '- Q&A Excerpts (self-contained, citable paragraphs).',
            '- Entity & Citation Pass (explicit entities; source attribution if supplied).',
            '- Snippetability & Passage-Ranking Notes (how/why these blocks lift).'
          ];
        default: // Multi-mode
          return [
            '- Combined Rewrite segmented by mode (ATS / Domain / SEO / AIEO).',
            '- Unified Term Bank + Keyword Coverage + Entities & Schema JSON-LD.',
            '- Mode-specific QA: ATS sanity checks; SEO meta; AIEO answer blocks.'
          ];
      }
    })();

    return [
      'Produce a high-fidelity optimization that preserves meaning while maximizing machine and expert retrievability.',
      `Basics:\n${basics}`,
      personasBlock + filesBlock,
      steering && `Steering:\n${steering}`,
      context && `Context:\n${context}`,

      '\nClarifying questions (answer what you can):',
      `• ${clarQ.join('\n• ')}`,

      '\nOutput format:',
      '- 0) Executive Summary (what changed and why; risks & trade-offs).',
      `- 1) Primary Deliverables for "${mode}":`,
      ...modeSections,
      '- 2) Change Delta Log (before → after; token-level notes for critical terms).',
      '- 3) Validation Appendix (coverage checks, entity list, schema block, and any test artifacts).',

      '\nOptimization directives (technical — keep precise):',
      '- Preserve factual claims; do not fabricate; mark uncertainties.',
      '- For ATS: replicate exact JD strings in high-signal zones; avoid layout artifacts; ensure copy-paste order is intact.',
      '- For Domain-Language: prefer canonical controlled terms; include synonyms in proximity; maintain semantic parity.',
      '- For SEO: align <title> with H1; unique meta; semantic headings; descriptive internal links; include JSON-LD block.',
      '- For AIEO: elevate answerable chunks at top; short, self-contained paragraphs; explicit entities; cite sources_list when available.',
      '- Generate a Keyword Coverage Table and Entity Inventory; note BM25-style term presence and salient entities.',
      '- If citations_available = Yes, bind claims to sources; otherwise keep claims general and non-falsifiable.',
      '- Respect locale and tone settings in human-facing phrasing; keep technical annotations separate.',

      '\nReturn:',
      '- Provide the optimized content first, then the tables/metadata/JSON-LD, then the delta log and validation appendix.'
    ].filter(Boolean).join('\n');
  }
},

{
  id: 'task_research_30_60_90',
  slug: 'research-30-60-90-plan',
  label: '30/60/90 Research Plan',
  kind: 'task',
  categories: ['research','planning','product','user experience'],
  tags: [
    'type:task',
    'topic:research',
    'topic:user_experience',
    'use:plan',
    'use:roadmap',
    'use:strategy',
    'use:user_experience',
    'phase:discover',
    'phase:define',
    'phase:validate',
    'level:intermediate'
  ],
use_cases: [
  'new product or feature discovery',
    'multi team redesign with staged decisions',
    'post launch stabilization and optimization',
    'service design opportunity mapping',
    'information architecture validation',
    'content strategy and messaging tests',
    'accessibility validation in staged phases',
    'experiment design and measurement planning',
    'portfolio case study structure for researchers',
    'cross functional decision making under uncertainty',
    'customer journey mapping and blueprinting',
    'post launch KPI stabilization plan',
    'risk reduction for high stakes changes',
    'VOC synthesis to roadmap linkage',
    'leadership ready roadmap with decision gates',
    'pilot rollout observation and learning plan',
    'internationalization and localization checks',
    'design system adoption validation',
    'analytics instrumentation and benchmark setup',
  'create a ux (user experience) 30/60/90 research plan for new product or feature discovery that aligns stakeholders and decision gates',
  'run a ux multi team redesign with staged decisions using a 30/60/90 research plan that sequences information architecture content and interaction validation',
  'drive post launch ux stabilization and optimization with a research plan that benchmarks usability funnels and retention over 90 days',
  'map service design opportunities with a ux research plan that combines journey mapping service blueprinting and operations interviews',
  'validate information architecture through ux methods like card sort and tree test embedded in a 30/60/90 research plan',
  'execute ux content strategy and messaging tests with interviews and experiments guided by a staged research plan',
  'plan accessibility validation across phases with wcag focused ux audits assistive tech sessions and inclusive recruiting',
  'design experiments and measurement for ux changes with a research plan that links hypotheses to kpis and okrs',
  'structure a portfolio ready ux case study by following a 30/60/90 research plan that documents decisions methods and impact',
  'enable cross functional decision making under uncertainty with a ux research plan that uses raci decision memos and risk logs',
  'build customer journey maps and service blueprints in a ux research plan that identifies failure points and opportunities',
  'stabilize post launch kpis with a ux research plan that ties analytics instrumentation to task success and time to first value',
  'reduce risk for high stakes ux changes with staged discovery concept tests and pilot rollouts defined in a 30/60/90 plan',
  'link voice of the customer findings to product roadmaps using a ux research plan that synthesizes surveys grievances and call center data',
  'produce a leadership ready roadmap with decision gates by packaging ux findings into day 30 day 60 and day 90 decision memos',
  'observe pilot rollouts with a ux research plan that specifies success metrics qualitative feedback loops and feature flag strategies',
  'perform internationalization and localization checks with a ux research plan that tests language variants and cultural fit',
  'validate design system adoption through a ux research plan that evaluates component usability content patterns and consistency',
  'stand up analytics instrumentation and baseline benchmarks as part of a ux research plan that prepares for experiments',
  'plan mixed methods ux research that blends interviews usability studies and surveys within a 30/60/90 cadence',
  'create a ux research plan for onboarding and activation that measures time to first value guidance efficacy and confidence',
  'optimize ecommerce checkout with a ux research plan focused on error prevention form usability and conversion drop offs',
  'improve b2b saas workflows through a ux research plan that studies roles permissions and multi step tasks in real contexts',
  'develop a mobile app ux research plan that accounts for device constraints offline behavior and notification strategy',
  'plan ai assisted ux features with a research plan that evaluates explainability trust and failure modes',
  'coordinate navigation and ia redesign using a ux research plan that sequences architecture tests before high fidelity design',
  'plan content design research for ux microcopy help and empty states using a 30/60/90 structure tied to support contact rate',
  'create a regulated industry ux research plan that integrates privacy consent and compliance reviews with patient or member usability',
  'develop a usability testing plan within a 30/60/90 research plan to benchmark sus or umux lite and critical task success',
  'plan a ux research roadmap for continuous discovery that rotates discovery validation and measurement across quarters',
  'operationalize a ux research plan for personas and jobs to be done that ties segmentation to opportunity sizing and okr impact',
  'design a research plan for customer support ux that connects call drivers help content and in product guidance to reduced contacts',
  'create a ux research plan for growth experiments that prioritizes hypotheses defines guardrails and instruments success metrics',
  'plan an enterprise ux study of permissions and approvals sequencing contextual inquiry flow mapping and validation testing',
  'structure a ux research plan for content localization that evaluates readability terminology and imagery across locales',
  'develop a ux research plan for onboarding tours and tooltips that measures guidance utility without increasing cognitive load'
]
,
  definition: 'Create a timeboxed 30/60/90 day research plan with decision gates, methods, recruiting, metrics, risks, and rollout. Optimized for UX discovery, validation, and stakeholder decision making.',
  help: 'Complete the fields with your context. The template outputs a leadership ready plan with Day 30, 60, and 90 decision memos, RACI, metrics, recruiting, risks, and a crisp timeline.',

  fields: [
    { key:'project_title', label:'Project title', type:'text',
      ph:'Improve template selection flow', desc:'Short, specific title for the initiative.' },

    { key:'owner', label:'Research owner', type:'text',
      ph:'Name, role', desc:'Who is accountable for the research quality and delivery.' },

    { key:'dates', label:'Dates or timeframe', type:'text',
      ph:'Oct 1 to Dec 29', desc:'Overall window that covers the 90 days.' },

    { key:'audience', label:'Primary audience', type:'select',
      options:['team','leadership','cross-functional','customers'],
      ph:'leadership', desc:'The main audience you are writing for.' },

    { key:'context', label:'Context', type:'textarea',
      ph:'Problem space, users, constraints, past learnings',
      desc:'Why this matters now, who is impacted, and key constraints.' },

    { key:'decision_qs', label:'Top decision questions', type:'textarea',
      ph:'• Which pattern reduces false starts?\n• Which users are most impacted?\n• What guardrails are required?',
      desc:'Three or fewer decisions that the plan must answer.' },

    { key:'success', label:'Success criteria', type:'textarea',
      ph:'User outcomes, business outcomes, guardrails',
      desc:'Measurable user and business outcomes plus any hard constraints.' },

    { key:'ethics', label:'Ethics, access, privacy', type:'textarea',
      ph:'Consent, retention window, inclusion plan, accessibility scope',
      desc:'Data handling, participant care, inclusion, and accessibility expectations.' },

    /* Phase 0-30 */
    { key:'p1_objectives', label:'0-30 objectives', type:'textarea',
      ph:'Frame problem, baseline metrics, align scope',
      desc:'What you will accomplish in the first 30 days.' },

    { key:'p1_methods', label:'0-30 methods', type:'textarea',
      ph:'Stakeholder interviews, heuristic review, analytics audit, VOC sweep',
      desc:'Evidence gathering activities to establish baselines and focus.' },

    { key:'p1_segments', label:'0-30 segments', type:'textarea',
      ph:'Primary users plus one edge case segment',
      desc:'Who you will recruit and why they matter to early framing.' },

    { key:'p1_artifacts', label:'0-30 artifacts', type:'textarea',
      ph:'Brief, assumptions grid, baseline report, screener',
      desc:'Documents and outputs produced by Day 30.' },

    /* Phase 31-60 */
    { key:'p2_objectives', label:'31-60 objectives', type:'textarea',
      ph:'Primary research, opportunity sizing, journey map',
      desc:'Goals for the middle phase focused on opportunity evidence.' },

    { key:'p2_methods', label:'31-60 methods', type:'textarea',
      ph:'Contextual inquiry, concept usability, card sort or tree test, survey',
      desc:'Methods to test concepts and structure at medium fidelity.' },

    { key:'p2_segments', label:'31-60 segments', type:'textarea',
      ph:'Segments and quotas for each method',
      desc:'Sampling plan for each study type in this phase.' },

    { key:'p2_artifacts', label:'31-60 artifacts', type:'textarea',
      ph:'Interim readout, journey map, opportunity list with impact x effort',
      desc:'Outputs delivered at the 60 day checkpoint.' },

    /* Phase 61-90 */
    { key:'p3_objectives', label:'61-90 objectives', type:'textarea',
      ph:'Validation, decisions, rollout plan',
      desc:'End phase objectives to confirm what ships and how it will be measured.' },

    { key:'p3_methods', label:'61-90 methods', type:'textarea',
      ph:'High fidelity usability benchmark, unmoderated scale tests, experiment design',
      desc:'Validation and measurement preparation activities.' },

    { key:'p3_segments', label:'61-90 segments', type:'textarea',
      ph:'Benchmark sample and accessibility contexts',
      desc:'Representative sample for validation, including assistive tech users where relevant.' },

    { key:'p3_artifacts', label:'61-90 artifacts', type:'textarea',
      ph:'Final report, recommendations, experiment specs, playbook',
      desc:'Final deliverables and decision memo at Day 90.' },

    /* Recruiting and logistics */
    { key:'recruiting', label:'Recruiting plan', type:'textarea',
      ph:'Vendor, screener link, rolling sessions from week 3, standby list',
      desc:'Suppliers, cadence, and links to screeners and calendars.' },

    { key:'samples', label:'Sample sizes per method', type:'textarea',
      ph:'Usability 5 to 8 per segment per round; survey 150 to 400 per segment; diary 10 to 20',
      desc:'Right sized sampling ranges for each method.' },

    { key:'incentives', label:'Incentives', type:'textarea',
      ph:'Rates by complexity, equitable alternatives for non cash acceptance',
      desc:'Compensation ranges and any constraints by region or policy.' },

    /* Metrics */
    { key:'outcome_metrics', label:'Outcome metrics', type:'textarea',
      ph:'Task success, time on task, conversion, retention, CES',
      desc:'Primary user and business outcomes to track.' },

    { key:'health_metrics', label:'Research health metrics', type:'textarea',
      ph:'Decision adoption rate, time from finding to change, segment coverage',
      desc:'How you will track the effectiveness of research operations.' },

    /* Cadence and governance */
    { key:'cadence', label:'Cadence', type:'textarea',
      ph:'Weekly 30 min standup, weekly 30 min share out, Day 30/60/90 readouts',
      desc:'Meeting rhythm and ceremonies to keep alignment.' },

    { key:'raci', label:'RACI and roles', type:'textarea',
      ph:'Research lead A; PM A; Design R; Eng C; Analytics C; Legal C; Accessibility C',
      desc:'Who is Responsible, Accountable, Consulted, Informed.' },

    /* Risks and budget */
    { key:'risks', label:'Risks and mitigations', type:'textarea',
      ph:'Recruiting slips, scope creep, synthesis debt, tool access blocks',
      desc:'Top risks with triggers, owners, and mitigation plans.' },

    { key:'budget', label:'Budget lines', type:'textarea',
      ph:'Incentives, recruiting, transcription, platforms, travel',
      desc:'High level budget categories and assumptions.' },

    { key:'tools', label:'Tools stack', type:'textarea',
      ph:'Moderated, unmoderated, survey, analysis, analytics, experimentation tools',
      desc:'Named platforms and how they will be used.' },

    /* Communication */
    { key:'comms', label:'Communication plan', type:'textarea',
      ph:'One pager, weekly postcards, decision memos, change log',
      desc:'Artifacts and channels for ongoing visibility.' },

    /* Formatting controls */
    { key:'length', label:'Length', type:'select',
      options:[
        {value:'short',  label:'Short (1 to 2 pages)'},
        {value:'medium', label:'Medium (3 to 5 pages)'},
        {value:'long',   label:'Long (6 to 8 pages)'}
      ],
      ph:'medium', desc:'Choose output depth. Does not change structure, only detail.' },

    { key:'tone_primary', label:'Tone', type:'select',
      options:['professional','direct','concise','neutral','empathetic'],
      ph:'professional', desc:'Primary writing tone for the output.' },

    { key:'tone_secondary', label:'Tone 2nd (optional)', type:'select',
      options:['-- none --','professional','direct','concise','neutral','empathetic'],
      ph:'-- none --', desc:'Optional secondary tone to blend with the primary.' },

    { key:'style_persona', label:'Style persona (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      ph:'Helpful PM; Curious analyst', desc:'Optional voices to lightly influence style.' },

    { key:'constraints', label:'Constraints (optional)', type:'textarea',
      ph:'Legal notes, regulated markets, language requirements, privacy flags',
      desc:'Non negotiables and context that affect choices.' },

    { key:'variants', label:'How many variants', type:'select',
      options:['1','2'],
      ph:'1', desc:'Number of alternative plan drafts to generate.' }
  ],

  boosters: [
    'Limit to three decision questions and tie methods directly to them.',
    'Start recruiting by day 7 and run rolling sessions from week 3.',
    'End each phase with a decision memo and explicit tradeoffs.',
    'Track inclusion and accessibility from the start, not later.',
    'Instrument metrics with analytics owners before validation.',
    'Timebox synthesis to avoid backlog. Tag daily and synthesize weekly.'
  ],

  template: (f) => {
    const join2 = (a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones = join2(
      f.tone_primary,
      (f.tone_secondary && f.tone_secondary !== '-- none --') ? f.tone_secondary : ''
    );
    const lenMap = { short:'1-2 pages', medium:'3-5 pages', long:'6-8 pages' };
    const lenStr = lenMap[f.length] || '3-5 pages';
    const variants = Math.max(1, parseInt(f.variants || '1', 10));

    const persona = Array.isArray(f.style_persona) && f.style_persona.length
      ? `Write in the blended voice of: ${f.style_persona.join(' | ')}.`
      : '';

    const outRules = [
      'Output format:',
      '- Title and owner',
      '- TLDR with 3 bullets',
      '- Context',
      '- Decision questions',
      '- Success criteria and ethics',
      '- Plan 0-30 days',
      '- Plan 31-60 days',
      '- Plan 61-90 days',
      '- Recruiting and sampling',
      '- Metrics',
      '- Cadence and RACI',
      '- Risks and mitigations',
      '- Budget and tools',
      '- Communication plan',
      '- Timeline with Day 30, Day 60, Day 90 readouts',
      (variants>1) && `- Provide ${variants} variants separated by: ---`
    ].filter(Boolean).join('\n');

    return [
      'Create a complete 30/60/90 UX research plan.',
      f.project_title && `Title: ${f.project_title}`,
      f.owner && `Owner: ${f.owner}`,
      f.dates && `Dates: ${f.dates}`,
      f.audience && `Audience: ${f.audience}`,
      (tones || f.tone) && `Tone: ${tones || f.tone}`,
      `Length: ${lenStr}`,
      persona,
      f.context && `Context:\n${f.context}`,
      f.decision_qs && `Decision questions:\n${f.decision_qs}`,
      f.success && `Success criteria:\n${f.success}`,
      f.ethics && `Ethics, access, privacy:\n${f.ethics}`,

      'Plan 0-30 days:',
      f.p1_objectives && `- Objectives:\n${f.p1_objectives}`,
      f.p1_methods && `- Methods:\n${f.p1_methods}`,
      f.p1_segments && `- Segments:\n${f.p1_segments}`,
      f.p1_artifacts && `- Artifacts:\n${f.p1_artifacts}`,
      'Decision memo at Day 30 with explicit tradeoffs.',

      'Plan 31-60 days:',
      f.p2_objectives && `- Objectives:\n${f.p2_objectives}`,
      f.p2_methods && `- Methods:\n${f.p2_methods}`,
      f.p2_segments && `- Segments:\n${f.p2_segments}`,
      f.p2_artifacts && `- Artifacts:\n${f.p2_artifacts}`,
      'Decision memo at Day 60 with prioritized opportunities.',

      'Plan 61-90 days:',
      f.p3_objectives && `- Objectives:\n${f.p3_objectives}`,
      f.p3_methods && `- Methods:\n${f.p3_methods}`,
      f.p3_segments && `- Segments:\n${f.p3_segments}`,
      f.p3_artifacts && `- Artifacts:\n${f.p3_artifacts}`,
      'Decision memo at Day 90 with what ships and how it will be measured.',

      f.recruiting && `Recruiting plan:\n${f.recruiting}`,
      f.samples && `Sample sizes:\n${f.samples}`,
      f.incentives && `Incentives:\n${f.incentives}`,

      f.outcome_metrics && `Outcome metrics:\n${f.outcome_metrics}`,
      f.health_metrics && `Research health metrics:\n${f.health_metrics}`,

      f.cadence && `Cadence:\n${f.cadence}`,
      f.raci && `RACI and roles:\n${f.raci}`,

      f.risks && `Risks and mitigations:\n${f.risks}`,
      f.budget && `Budget:\n${f.budget}`,
      f.tools && `Tools:\n${f.tools}`,

      f.comms && `Communication plan:\n${f.comms}`,
      f.constraints && `Constraints:\n${f.constraints}`,
      outRules
    ].filter(Boolean).join('\n');
  }
},


{
  id: 'task_branding_strategy_visual_identity',
  slug: 'branding-strategy-visual-identity-guide',
  label: 'Branding Strategy & Visual Identity',
  kind: 'task',
  categories: ['brand','design','marketing','strategy','user experience'],
  tags: [
    'type:task',
    'topic:branding',
    'topic:visual_identity',
    'topic:brand_guidelines',
    'topic:brand_strategy',
    'topic:user_experience',
    'use:brand_guide',
    'use:branding_strategy',
    'use:visual_identity',
    'use:design_tokens',
    'use:user_experience',
    'phase:discover',
    'phase:define',
    'phase:deliver',
    'level:intermediate'
  ],
  use_cases: [
    'create a branding strategy and brand guide for a startup or personal brand with positioning statement, voice, logo system, and color palette',
    'run a rebrand for a nonprofit or enterprise with visual identity, messaging framework, and brand architecture documented in a style guide',
    'build a visual identity system with logo specs, typography scale, 60 30 10 color plan, and accessibility contrast targets',
    'produce a brand voice and messaging framework with tone by context matrix, inclusive language rules, and segment specific message houses',
    'ship a social media brand kit and presentation templates that align with the brand guide and visual identity rules',
    'create design tokens for color, type, and spacing to connect brand guidelines to a design system and component library',
    'document co branding and partner usage rules with lockups, safe areas, and approval workflow in the brand guidelines',
    'plan a logo creation process that moves from moodboards to reduction tests and exports a production ready file kit',
    'establish brand governance with owners, intake forms, asset library, and change log to keep the brand consistent',
    'measure brand health with awareness, preference, share of search, and creative effectiveness diagnostics tied to campaigns'
  ],
  definition: 'guide a team or individual through building a complete branding strategy, brand voice, and visual identity with a production ready brand guide.',
  help: 'fill the fields to generate a cohesive brand strategy and visual identity. outputs include positioning, messaging, logo specs, color palette, type rules, accessibility, application playbooks, governance, and measurement.',

  fields: [
    /* basics */
    { key:'project_title', label:'project title', type:'text',
      ph:'acorn analytics rebrand', desc:'short, specific initiative name' },
    { key:'brand_name', label:'brand name', type:'text',
      ph:'acorn analytics', desc:'official brand or product name' },
    { key:'owner', label:'owner', type:'text',
      ph:'name, role', desc:'who is accountable for quality and delivery' },
    { key:'dates', label:'dates or timeframe', type:'text',
      ph:'oct 1 to dec 29', desc:'overall window for the work' },
    { key:'audience', label:'primary audience', type:'select',
      options:['team','leadership','marketing','product','agency','partners'],
      ph:'leadership', desc:'main audience the guide must serve' },

    /* strategy bedrock */
    { key:'mission', label:'mission', type:'textarea',
      ph:'what you do and for whom', desc:'clear purpose tied to users' },
    { key:'vision', label:'vision', type:'textarea',
      ph:'the world if you succeed', desc:'future state your brand aims to create' },
    { key:'values', label:'values', type:'textarea',
      ph:'3 to 5 behaviors that guide decisions', desc:'principles that shape tone and choices' },
    { key:'audience_segments', label:'audience segments', type:'textarea',
      ph:'primary, secondary, edge cases', desc:'who you serve and priority order' },
    { key:'audience_jobs', label:'jobs to be done', type:'textarea',
      ph:'top jobs, triggers, objections, channels', desc:'what the audience is trying to achieve' },
    { key:'competitors', label:'competitive set', type:'textarea',
      ph:'comparators and category codes', desc:'who you sit next to in the mind of users' },
    { key:'positioning', label:'positioning statement', type:'textarea',
      ph:'for [segment] who need [outcome], [brand] is the [frame] that [difference] because [proof]',
      desc:'concise market position and proof' },
    { key:'proof_points', label:'proof points', type:'textarea',
      ph:'3 claims with evidence', desc:'reasons to believe tied to outcomes' },
    { key:'architecture', label:'brand architecture', type:'textarea',
      ph:'branded house, house of brands, hybrid; sub brand rules', desc:'how brands and products relate' },
    { key:'naming', label:'naming notes', type:'textarea',
      ph:'territories, pronunciation, domain checks', desc:'constraints and directions for names' },
    { key:'legal', label:'legal and trademark', type:'textarea',
      ph:'tm screening, geography constraints', desc:'risk and compliance items to watch' },

    /* voice and messaging */
    { key:'voice_traits', label:'voice traits', type:'textarea',
      ph:'3 to 5 traits with do and avoid examples', desc:'brand personality with practical examples' },
    { key:'tone_matrix', label:'tone by context', type:'textarea',
      ph:'landing, ui, support, legal, crisis', desc:'how tone shifts by surface' },
    { key:'message_house_core', label:'core message house', type:'textarea',
      ph:'1 story, 3 proof points, examples', desc:'core narrative that everything ladders to' },
    { key:'message_house_segments', label:'segment message houses', type:'textarea',
      ph:'segment, story, 3 proofs, examples', desc:'tailored messages per key segment' },
    { key:'inclusive_language', label:'inclusive language', type:'textarea',
      ph:'preferred terms and terms to avoid with reasons', desc:'access and cultural fit guidance' },
    { key:'glossary', label:'brand glossary', type:'textarea',
      ph:'key terms and preferred spellings', desc:'shared vocabulary for writers and designers' },

    /* visual identity */
    { key:'logo_strategy', label:'logo strategy', type:'textarea',
      ph:'primary, horizontal, stacked, mark only', desc:'system thinking for marks and lockups' },
    { key:'logo_specs', label:'logo specs', type:'textarea',
      ph:'clear space x, min sizes, backgrounds, misuse rules', desc:'practical rules for safe usage' },
    { key:'logo_filekit', label:'logo file kit', type:'textarea',
      ph:'svg, eps, pdf, png 1x 2x 3x, favicon', desc:'deliverables to ship with the guide' },

    { key:'color_palette', label:'color palette', type:'textarea',
      ph:'brand primary, secondary, accent, neutrals, states', desc:'semantic tokens for ui and brand' },
    { key:'color_proportion', label:'color proportion plan', type:'textarea',
      ph:'60 30 10 plan with two common layouts and dark mode pair',
      desc:'how colors appear in real compositions' },
    { key:'contrast', label:'contrast targets', type:'textarea',
      ph:'wcag aa 4.5:1 text, 3:1 large text and icons', desc:'accessibility targets and test notes' },

    { key:'type_display', label:'typography display', type:'textarea',
      ph:'headline family and weights, intended uses', desc:'display font for headings and hero' },
    { key:'type_text', label:'typography text', type:'textarea',
      ph:'body family, sizes 14 16 18, leading rules', desc:'readability and fallback stacks' },
    { key:'type_mono', label:'typography mono (optional)', type:'textarea',
      ph:'mono face for code or data, tabular figures', desc:'use in tables, code, and stats' },
    { key:'type_scale', label:'type scale', type:'textarea',
      ph:'8 pt or 4 pt step system, max line length', desc:'how text sizes relate across breakpoints' },

    { key:'imagery', label:'imagery direction', type:'textarea',
      ph:'subjects, distance, lighting, background complexity', desc:'photo and illustration guidance' },
    { key:'iconography', label:'iconography rules', type:'textarea',
      ph:'grid, stroke, 16 px min, filled vs outline', desc:'icon set rules for consistency' },
    { key:'motion', label:'motion principles', type:'textarea',
      ph:'orientation, feedback, delight; durations and easing', desc:'when and how to animate responsibly' },
    { key:'layout', label:'layout and spacing', type:'textarea',
      ph:'grid columns, gutters, spacing scale, component padding', desc:'structure for pages and components' },

    /* accessibility and inclusion */
    { key:'a11y', label:'accessibility and inclusion', type:'textarea',
      ph:'focus states, hit areas, captions, alt text patterns', desc:'practices that keep the brand usable' },

    /* application playbooks */
    { key:'web_ui', label:'web and product ui', type:'textarea',
      ph:'navigation, forms, empty states, errors', desc:'core product surfaces and patterns' },
    { key:'social', label:'social kit', type:'textarea',
      ph:'avatars, banners, post and story templates', desc:'templates sized by network' },
    { key:'presentations', label:'presentations', type:'textarea',
      ph:'title, section, data slides, appendix', desc:'slide patterns for internal and external use' },
    { key:'email_crm', label:'email and crm', type:'textarea',
      ph:'templates, headers, signatures, legal footers', desc:'repeatable communication assets' },
    { key:'print_events', label:'print and events', type:'textarea',
      ph:'signage, swag, booths, lanyards', desc:'offline brand execution' },
    { key:'ads', label:'ads and motion', type:'textarea',
      ph:'sizes, safe areas, overlays, storyboard rules', desc:'paid media execution guardrails' },
    { key:'cobranding', label:'co branding and partners', type:'textarea',
      ph:'lockups, color harmonization, approval workflow', desc:'how to live with other brands' },

    /* governance and ops */
    { key:'governance', label:'governance', type:'textarea',
      ph:'owner, working group, office hours, sla', desc:'who decides and how requests flow' },
    { key:'asset_library', label:'asset library', type:'textarea',
      ph:'folder map, versioning, release notes', desc:'where assets live and how they change' },
    { key:'licensing', label:'licensing', type:'textarea',
      ph:'fonts, photos, illustrations with rights', desc:'license tracking and renewal reminders' },

    /* measurement */
    { key:'brand_metrics', label:'brand health metrics', type:'textarea',
      ph:'awareness, preference, share of search', desc:'how to track the brand over time' },
    { key:'creative_metrics', label:'creative effectiveness', type:'textarea',
      ph:'diagnostics, recall, distinctiveness cues', desc:'how assets perform in the wild' },

    /* deliverables */
    { key:'deliverables', label:'deliverables', type:'textarea',
      ph:'pdf or site, logo kit, color and type tokens json, templates', desc:'what ships with the guide' },

    /* rollout and comms */
    { key:'rollout', label:'rollout plan', type:'textarea',
      ph:'training deck, launch checklist, change log', desc:'how you launch and maintain the brand' },
    { key:'comms', label:'communication plan', type:'textarea',
      ph:'channels and cadence for updates', desc:'who hears what and when' },

    /* formatting controls */
    { key:'length', label:'length', type:'select',
      options:[
        {value:'short',  label:'short (1 to 2 pages)'},
        {value:'medium', label:'medium (3 to 6 pages)'},
        {value:'long',   label:'long (7 to 12 pages)'}
      ],
      ph:'medium', desc:'depth of output, structure stays the same' },
    { key:'tone_primary', label:'tone', type:'select',
      options:['professional','direct','concise','neutral','optimistic','human'],
      ph:'professional', desc:'primary writing tone' },
    { key:'tone_secondary', label:'tone 2nd (optional)', type:'select',
      options:['-- none --','professional','direct','concise','neutral','optimistic','human'],
      ph:'-- none --', desc:'optional secondary tone to blend' },
    { key:'style_persona', label:'style persona (optional)', type:'repeater',
      itemType:'typeahead', itemLabel:'persona', autofill:'persona->inline',
      ph:'helpful strategist; precise designer', desc:'lightly influence style with named personas' },
    { key:'constraints', label:'constraints (optional)', type:'textarea',
      ph:'regulated markets, languages, privacy flags', desc:'non negotiables that affect choices' },
    { key:'variants', label:'how many variants', type:'select',
      options:['1','2'],
      ph:'1', desc:'number of alternative drafts to generate' }
  ],

  boosters: [
    'anchor everything to positioning and proof points.',
    'use semantic color tokens and document a 60 30 10 plan.',
    'write tone by context rules with examples for ui, support, and legal.',
    'test logo legibility at 16 px and in monochrome before color polish.',
    'set accessibility targets and test early with real components.',
    'ship a real file kit and tokens json so teams can build without guessing.'
  ],

  template: (f) => {
    const join2 = (a,b)=>[a,b].filter(Boolean).join(' + ');
    const tones = join2(
      f.tone_primary,
      (f.tone_secondary && f.tone_secondary !== '-- none --') ? f.tone_secondary : ''
    );
    const lenMap = { short:'1-2 pages', medium:'3-6 pages', long:'7-12 pages' };
    const lenStr = lenMap[f.length] || '3-6 pages';
    const variants = Math.max(1, parseInt(f.variants || '1', 10));

    const persona = Array.isArray(f.style_persona) && f.style_persona.length
      ? `write in the blended voice of: ${f.style_persona.join(' | ')}.`
      : '';

    const outline = [
      'output format:',
      '- title and owner',
      '- tldr with 3 bullets',
      '- strategy: mission, vision, values, audience, competitors, positioning, proof points, architecture, naming, legal',
      '- voice and messaging: traits, tone by context, message house core and by segment, inclusive language, glossary',
      '- visual identity: logo strategy and specs, color palette and 60 30 10 plan, contrast targets, typography, imagery, iconography, motion, layout',
      '- accessibility and inclusion',
      '- application playbooks: web and product ui, social, presentations, email and crm, print and events, ads, co branding',
      '- governance and ops: owner, workflows, asset library, licensing',
      '- measurement: brand health and creative effectiveness',
      '- deliverables and rollout',
      (variants>1) && `- provide ${variants} variants separated by: ---`
    ].filter(Boolean).join('\n');

    return [
      'create a complete branding strategy and visual identity guide.',
      f.project_title && `project: ${f.project_title}`,
      f.brand_name && `brand: ${f.brand_name}`,
      f.owner && `owner: ${f.owner}`,
      f.dates && `dates: ${f.dates}`,
      f.audience && `audience: ${f.audience}`,
      (tones || f.tone) && `tone: ${tones || f.tone}`,
      `length: ${lenStr}`,
      persona,

      'strategy',
      f.mission && `mission\n${f.mission}`,
      f.vision && `vision\n${f.vision}`,
      f.values && `values\n${f.values}`,
      f.audience_segments && `audience segments\n${f.audience_segments}`,
      f.audience_jobs && `jobs to be done\n${f.audience_jobs}`,
      f.competitors && `competitive set\n${f.competitors}`,
      f.positioning && `positioning\n${f.positioning}`,
      f.proof_points && `proof points\n${f.proof_points}`,
      f.architecture && `brand architecture\n${f.architecture}`,
      f.naming && `naming notes\n${f.naming}`,
      f.legal && `legal and trademark\n${f.legal}`,

      'voice and messaging',
      f.voice_traits && `voice traits\n${f.voice_traits}`,
      f.tone_matrix && `tone by context\n${f.tone_matrix}`,
      f.message_house_core && `core message house\n${f.message_house_core}`,
      f.message_house_segments && `segment message houses\n${f.message_house_segments}`,
      f.inclusive_language && `inclusive language\n${f.inclusive_language}`,
      f.glossary && `glossary\n${f.glossary}`,

      'visual identity',
      f.logo_strategy && `logo strategy\n${f.logo_strategy}`,
      f.logo_specs && `logo specs\n${f.logo_specs}`,
      f.logo_filekit && `logo file kit\n${f.logo_filekit}`,

      f.color_palette && `color palette\n${f.color_palette}`,
      f.color_proportion && `color proportion plan (60 30 10)\n${f.color_proportion}`,
      f.contrast && `contrast targets\n${f.contrast}`,

      f.type_display && `typography display\n${f.type_display}`,
      f.type_text && `typography text\n${f.type_text}`,
      f.type_mono && `typography mono\n${f.type_mono}`,
      f.type_scale && `type scale\n${f.type_scale}`,

      f.imagery && `imagery direction\n${f.imagery}`,
      f.iconography && `iconography rules\n${f.iconography}`,
      f.motion && `motion principles\n${f.motion}`,
      f.layout && `layout and spacing\n${f.layout}`,

      'accessibility and inclusion',
      f.a11y && `${f.a11y}`,

      'application playbooks',
      f.web_ui && `web and product ui\n${f.web_ui}`,
      f.social && `social kit\n${f.social}`,
      f.presentations && `presentations\n${f.presentations}`,
      f.email_crm && `email and crm\n${f.email_crm}`,
      f.print_events && `print and events\n${f.print_events}`,
      f.ads && `ads and motion\n${f.ads}`,
      f.cobranding && `co branding and partners\n${f.cobranding}`,

      'governance and ops',
      f.governance && `${f.governance}`,
      f.asset_library && `asset library\n${f.asset_library}`,
      f.licensing && `licensing\n${f.licensing}`,

      'measurement',
      f.brand_metrics && `brand health metrics\n${f.brand_metrics}`,
      f.creative_metrics && `creative effectiveness\n${f.creative_metrics}`,

      'deliverables and rollout',
      f.deliverables && `deliverables\n${f.deliverables}`,
      f.rollout && `rollout plan\n${f.rollout}`,
      f.comms && `communication plan\n${f.comms}`,

      f.constraints && `constraints\n${f.constraints}`,
      outline
    ].filter(Boolean).join('\n');
  }
},

{
  id: 'task_website_metadata_ai_seo_builder',
  slug: 'website-metadata-ai-seo-builder',
  label: 'website metadata & ai seo builder',
  kind: 'task',
  categories: ['seo','marketing','web','strategy','user experience','accessibility','performance'],
  tags: [
    'type:task',
    'topic:seo',
    'topic:ai_seo',
    'topic:metadata',
    'topic:structured_data',
    'topic:open_graph',
    'topic:twitter_cards',
    'topic:accessibility',
    'use:website',
    'use:metadata',
    'use:structured_data',
    'use:open_graph',
    'use:twitter_cards',
    'use:robots',
    'use:sitemaps',
    'use:user_experience',
    'phase:discover',
    'phase:define',
    'phase:deliver',
    'level:intermediate'
  ],
  use_cases: [
    'build a complete html head, social previews, and json ld so search engines and ai crawlers can understand a website and its pages',
    'generate open graph and twitter card metadata that produces reliable link previews across chat apps and social platforms',
    'produce organization, website, and webpage schema.org json ld plus optional article, product, faqpage, howto, and videoobject markup',
    'assemble robots.txt and canonical rules that prevent duplicate urls and soft 404s and keep crawl budget efficient',
    'create a sitemap.xml bundle with lastmod dates for key urls and optional image and video entries',
    'set internationalization metadata with html lang and hreflang pairs including x default for selectors',
    'improve accessibility signals that also help bots by defining landmarks, skip links, alt text policy, and contrast targets',
    'bake performance hints into the head with theme color, color scheme, priority images, preload fonts, and preconnect hosts',
    'document governance and monitoring with search console, bing webmaster, and a monthly metadata checklist'
  ],
  definition: 'guide a user through fields to compile everything needed for website metadata, social previews, structured data, robots, and sitemaps that work for search engines, ai crawlers, and assistive tech.',
  help: 'fill each field; the template outputs ready to paste html head, json ld, robots.txt, sitemap.xml, plus a concise checklist.',

  fields: [
    /* basics */
    { key:'project_title', label:'project title', type:'text',
      ph:'acorn analytics site metadata refresh',
      desc:'short initiative name to appear in the output header' },
    { key:'site_name', label:'site name', type:'text',
      ph:'acorn analytics',
      desc:'official site or brand name used in titles and schema' },
    { key:'site_url', label:'site url (canonical root)', type:'text',
      ph:'https://www.acornanalytics.com/',
      desc:'absolute url with trailing slash used as the root for canonicals' },
    { key:'default_title_suffix', label:'default title suffix', type:'text',
      ph:'| acorn analytics',
      desc:'text appended to the end of page titles where appropriate' },
    { key:'default_lang', label:'default html lang', type:'select',
      options:['en','es','fr','de','pt','it','nl','sv','no','da','fi','pl','cs','ro','ru','tr','ar','he','hi','bn','id','ms','th','vi','zh','ja','ko'],
      ph:'en',
      desc:'root language for html and fallbacks' },
    { key:'brand_logo_url', label:'brand logo url (absolute)', type:'text',
      ph:'https://www.acornanalytics.com/assets/logo.svg',
      desc:'used in organization and website schema and social previews' },
    { key:'same_as', label:'sameAs profiles (one per line)', type:'textarea',
      ph:'https://www.linkedin.com/company/acorn\nhttps://twitter.com/acorn',
      desc:'public profiles that confirm brand identity' },

    /* page core */
    { key:'page_url', label:'page url', type:'text',
      ph:'https://www.acornanalytics.com/platform/',
      desc:'absolute url of the specific page this metadata is for' },
    { key:'canonical_url', label:'canonical url (if different)', type:'text',
      ph:'leave blank to use page url',
      desc:'override canonical if consolidating parameters or variants' },
    { key:'title', label:'title tag', type:'text',
      ph:'predict churn with transparent ai | acorn analytics',
      desc:'45 to 60 characters; put the problem solved first, brand last' },
    { key:'meta_description', label:'meta description', type:'textarea',
      ph:'predict customer churn with transparent ai so your team can act before it happens.',
      desc:'120 to 155 characters; written for human relevance and clicks' },
    { key:'h1', label:'h1 heading', type:'text',
      ph:'predict churn before it happens',
      desc:'primary on page heading that reflects intent' },
    { key:'breadcrumbs', label:'breadcrumbs (home > section > page)', type:'text',
      ph:'home > platform > churn prediction',
      desc:'used for breadcrumblist schema when present' },

    /* robots and indexation */
    { key:'meta_robots', label:'meta robots', type:'select',
      options:['index,follow','noindex,follow','index,nofollow','noindex,nofollow'],
      ph:'index,follow',
      desc:'index and follow instructions for the page' },
    { key:'robots_extras', label:'robots extras (comma separated)', type:'text',
      ph:'max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      desc:'additional directives to control previews and snippets' },

    /* social previews */
    { key:'og_title', label:'open graph title', type:'text',
      ph:'predict churn with transparent ai',
      desc:'often mirrors the title but can be shorter' },
    { key:'og_description', label:'open graph description', type:'textarea',
      ph:'reduce churn risk with explainable predictions and human friendly alerts.',
      desc:'human readable summary used by link unfurlers' },
    { key:'og_type', label:'open graph type', type:'select',
      options:['website','article','product','video.other','profile'],
      ph:'website',
      desc:'content category for open graph consumers' },
    { key:'og_image_url', label:'open graph image url (1200x630)', type:'text',
      ph:'https://www.acornanalytics.com/og/platform-1200x630.jpg',
      desc:'absolute url to a share image; ensure it exists at publish time' },
    { key:'og_image_alt', label:'open graph image alt', type:'text',
      ph:'dashboard showing churn risk segments by month',
      desc:'alt text for the preview image' },

    { key:'twitter_card', label:'twitter card type', type:'select',
      options:['summary','summary_large_image'],
      ph:'summary_large_image',
      desc:'card style for x/twitter link previews' },
    { key:'twitter_site', label:'twitter site handle', type:'text',
      ph:'@acornanalytics',
      desc:'brand or site account handle' },

    /* structured data core */
    { key:'schema_page_type', label:'webpage type', type:'select',
      options:['WebPage','Article','BlogPosting','Product','FAQPage','HowTo','Event','VideoObject'],
      ph:'WebPage',
      desc:'primary schema.org type for this page' },
    { key:'author_name', label:'author or brand', type:'text',
      ph:'acorn analytics',
      desc:'author for article like content; brand for most webpages' },
    { key:'date_published', label:'date published (yyyy-mm-dd)', type:'text',
      ph:'2025-09-01',
      desc:'first publish date if applicable' },
    { key:'date_modified', label:'date modified (yyyy-mm-dd)', type:'text',
      ph:'2025-09-15',
      desc:'most recent significant update date' },
    { key:'about_keywords', label:'about / keywords (comma separated)', type:'text',
      ph:'churn prediction, explainable ai, retention analytics',
      desc:'topics used in json ld about or mentions' },

    /* optional schema variants */
    { key:'faq_qas', label:'faq items (q | a per line)', type:'textarea',
      ph:'what is churn prediction? | forecasting risk of customer loss using past signals.\ncan i export? | yes, csv and api are available.',
      desc:'only used when webpage type is faqpage' },
    { key:'howto_steps', label:'howto steps (step: instruction per line)', type:'textarea',
      ph:'step 1: connect crm\nstep 2: label churn events\nstep 3: review model output',
      desc:'only used when webpage type is howto' },
    { key:'product_fields', label:'product basics (name | sku | price | currency)', type:'textarea',
      ph:'acorn pro | ACRN PRO | 99 | USD',
      desc:'only used when webpage type is product' },
    { key:'video_fields', label:'video basics (name | url | thumbnail | iso8601 duration | upload date)', type:'textarea',
      ph:'platform overview | https://v.example.com/abc | https://img.example.com/abc.jpg | PT2M13S | 2025-09-10',
      desc:'only used when webpage type is videoobject' },

    /* organization and website schema */
    { key:'org_name', label:'organization name', type:'text',
      ph:'acorn analytics',
      desc:'used in organization json ld; falls back to site name if blank' },
    { key:'org_logo', label:'organization logo url', type:'text',
      ph:'https://www.acornanalytics.com/assets/logo.svg',
      desc:'vector preferred; used in organization json ld' },
    { key:'org_same_as', label:'organization sameAs (one per line)', type:'textarea',
      ph:'leave blank to reuse site sameAs',
      desc:'overrides site level sameAs when provided' },
    { key:'has_search', label:'website has search', type:'select',
      options:['yes','no'],
      ph:'no',
      desc:'adds websitesearchbox schema when yes' },
    { key:'search_url_pattern', label:'site search url pattern', type:'text',
      ph:'https://www.acornanalytics.com/search?q={search_term_string}',
      desc:'required if website has search is yes' },

    /* internationalization */
    { key:'html_lang', label:'page html lang (override)', type:'text',
      ph:'leave blank to use default',
      desc:'set to a bcp 47 language tag to override default' },
    { key:'hreflang_map', label:'hreflang map (url | lang per line)', type:'textarea',
      ph:'https://www.acornanalytics.com/platform/ | en\nhttps://www.acornanalytics.com/es/platforma/ | es',
      desc:'add reciprocal pairs for translated variants' },
    { key:'x_default_url', label:'x default url', type:'text',
      ph:'https://www.acornanalytics.com/platform/',
      desc:'the catch all variant for language selectors' },

    /* performance hints */
    { key:'hero_image_url', label:'priority hero image url', type:'text',
      ph:'https://www.acornanalytics.com/img/hero.webp',
      desc:'use to suggest fetchpriority=high and proper sizes' },
    { key:'preload_fonts', label:'preload fonts (one url per line)', type:'textarea',
      ph:'/fonts/inter-var.woff2',
      desc:'critical fonts to preload with font display swap' },
    { key:'preconnect_hosts', label:'preconnect hosts (one per line)', type:'textarea',
      ph:'https://cdn.example.com\nhttps://analytics.example.com',
      desc:'third party origins to preconnect for performance' },
    { key:'color_scheme', label:'color scheme', type:'select',
      options:['light dark','light','dark'],
      ph:'light dark',
      desc:'declares supported color schemes' },
    { key:'theme_color', label:'theme color (#hex)', type:'text',
      ph:'#111111',
      desc:'browser ui color; match brand primary in light mode' },

    /* icons and feeds */
    { key:'icon_svg', label:'svg icon url', type:'text',
      ph:'/icon.svg',
      desc:'vector icon for modern browsers' },
    { key:'favicon_ico', label:'favicon .ico url', type:'text',
      ph:'/favicon.ico',
      desc:'fallback icon for legacy contexts' },
    { key:'apple_touch_icon', label:'apple touch icon url', type:'text',
      ph:'/apple-touch-icon.png',
      desc:'ios home screen icon' },
    { key:'rss_feed', label:'rss feed url (optional)', type:'text',
      ph:'https://www.acornanalytics.com/feed.xml',
      desc:'add for blogs and podcast listings' },

    /* robots.txt and sitemap */
    { key:'robots_allow', label:'robots allow paths (one per line)', type:'textarea',
      ph:'/public/\n/assets/',
      desc:'paths you explicitly allow (optional; allow all by default)' },
    { key:'robots_disallow', label:'robots disallow paths (one per line)', type:'textarea',
      ph:'/private/\n/temp/',
      desc:'paths you want to block from crawling' },
    { key:'include_in_sitemap', label:'include page in sitemap', type:'select',
      options:['yes','no'],
      ph:'yes',
      desc:'controls whether the page url appears in sitemap.xml' },
    { key:'lastmod', label:'lastmod date (yyyy-mm-dd)', type:'text',
      ph:'2025-09-29',
      desc:'last modified date for sitemap entry' },
    { key:'changefreq', label:'changefreq (hint only)', type:'select',
      options:['daily','weekly','monthly','yearly','never'],
      ph:'monthly',
      desc:'not a strong signal but harmless' },
    { key:'extra_sitemap_urls', label:'extra sitemap urls (one per line)', type:'textarea',
      ph:'https://www.acornanalytics.com/pricing/\nhttps://www.acornanalytics.com/customers/',
      desc:'add additional important urls to include' },

    /* accessibility anchors */
    { key:'skip_link_target', label:'skip link target id', type:'text',
      ph:'#main',
      desc:'id of the main content region for keyboard users' },
    { key:'landmark_notes', label:'landmarks and headings notes', type:'textarea',
      ph:'header, nav, main, aside, footer present; single h1; semantic order verified',
      desc:'quick audit notes that become part of the checklist' },
    { key:'alt_text_policy', label:'alt text policy', type:'textarea',
      ph:'meaningful images have concise alt; decorative images use empty alt; charts link to data table',
      desc:'sitewide guidance that improves accessibility and snippet quality' },

    /* monitoring and governance */
    { key:'gsc_property', label:'google search console property', type:'text',
      ph:'sc-domain:acornanalytics.com',
      desc:'property id or label for governance notes' },
    { key:'bingwm_property', label:'bing webmaster property', type:'text',
      ph:'acornanalytics.com',
      desc:'bing webmaster verification target' },

    /* output controls */
    { key:'output_format', label:'output format', type:'select',
      options:['bundle (head + json ld + robots.txt + sitemap.xml + checklist)','head only','json ld only','robots + sitemap only'],
      ph:'bundle (head + json ld + robots.txt + sitemap.xml + checklist)',
      desc:'choose what the template should emit' },
    { key:'length', label:'notes verbosity', type:'select',
      options:['short','medium','long'],
      ph:'medium',
      desc:'amount of commentary included in the checklist' }
  ],

  boosters: [
    'use absolute urls for canonicals and preview images.',
    'keep one canonical per page and make internal links match it.',
    'mirror the h1 intent in the title and description.',
    'ship organization, website, and webpage schema on every key page.',
    'prefer json ld over microdata and keep it consistent with visible content.',
    'provide alt text for preview images and transcripts for videos.',
    'declare color scheme and theme color for better mobile ui integration.',
    'submit sitemaps in search console and bing webmaster after changes.',
    'test previews with sharing debuggers and validate schema with rich results tools.'
  ],

  template: (f) => {
    const pick = (v, fb='') => v && String(v).trim() ? String(v).trim() : fb;
    const yes = (v) => String(v||'').toLowerCase() === 'yes';

    const site = pick(f.site_url);
    const canon = pick(f.canonical_url, pick(f.page_url));
    const robots = [pick(f.meta_robots,'index,follow'), pick(f.robots_extras,'')].filter(Boolean).join(',');
    const lang = pick(f.html_lang, pick(f.default_lang,'en'));
    const title = pick(f.title);
    const tSuffix = pick(f.default_title_suffix,'');
    const fullTitle = tSuffix && title && !title.includes(tSuffix) ? `${title} ${tSuffix}` : (title || '');
    const ogType = pick(f.og_type,'website');
    const twCard = pick(f.twitter_card,'summary_large_image');
    const pageType = pick(f.schema_page_type,'WebPage');

    const sameAs = (val) => (val||'').split('\n').map(s=>s.trim()).filter(Boolean);
    const list = (val) => (val||'').split('\n').map(s=>s.trim()).filter(Boolean);

    const outputChoice = pick(f.output_format,'bundle (head + json ld + robots.txt + sitemap.xml + checklist)');

    const outline = [
      'output format:',
      outputChoice.includes('bundle') ? '- html head\n- json ld\n- robots.txt\n- sitemap.xml\n- checklist' :
      outputChoice.includes('head only') ? '- html head' :
      outputChoice.includes('json ld only') ? '- json ld' :
      '- robots.txt\n- sitemap.xml',
    ].join('\n');

    const headBlock = [
      '<head>',
      fullTitle && `  <title>${fullTitle}</title>`,
      f.meta_description && `  <meta name="description" content="${f.meta_description}">`,
      canon && `  <link rel="canonical" href="${canon}">`,
      `  <meta name="robots" content="${robots}">`,
      '  <meta name="viewport" content="width=device-width, initial-scale=1">',
      pick(f.theme_color) && `  <meta name="theme-color" content="${f.theme_color}">`,
      pick(f.color_scheme) && `  <meta name="color-scheme" content="${f.color_scheme}">`,
      /* icons */
      pick(f.icon_svg) && `  <link rel="icon" href="${f.icon_svg}" type="image/svg+xml">`,
      pick(f.favicon_ico) && `  <link rel="icon" href="${f.favicon_ico}" sizes="any">`,
      pick(f.apple_touch_icon) && `  <link rel="apple-touch-icon" href="${f.apple_touch_icon}">`,
      /* feeds */
      pick(f.rss_feed) && `  <link rel="alternate" type="application/rss+xml" title="${pick(f.site_name,'rss')}" href="${f.rss_feed}">`,
      /* og */
      f.og_title && `  <meta property="og:title" content="${f.og_title}">`,
      f.og_description && `  <meta property="og:description" content="${f.og_description}">`,
      canon && `  <meta property="og:url" content="${canon}">`,
      `  <meta property="og:type" content="${ogType}">`,
      f.og_image_url && `  <meta property="og:image" content="${f.og_image_url}">`,
      f.og_image_alt && `  <meta property="og:image:alt" content="${f.og_image_alt}">`,
      pick(f.site_name) && `  <meta property="og:site_name" content="${f.site_name}">`,
      /* twitter */
      `  <meta name="twitter:card" content="${twCard}">`,
      f.twitter_site && `  <meta name="twitter:site" content="${f.twitter_site}">`,
      f.og_title && `  <meta name="twitter:title" content="${f.og_title}">`,
      f.og_description && `  <meta name="twitter:description" content="${f.og_description}">`,
      f.og_image_url && `  <meta name="twitter:image" content="${f.og_image_url}">`,
      /* performance hints */
      f.hero_image_url && `  <link rel="preload" as="image" href="${f.hero_image_url}" fetchpriority="high">`,
      ...list(f.preload_fonts).map(u => `  <link rel="preload" as="font" href="${u}" type="font/woff2" crossorigin>`),
      ...list(f.preconnect_hosts).map(h => `  <link rel="preconnect" href="${h}" crossorigin>`),
      '</head>'
    ].filter(Boolean).join('\n');

    const orgName = pick(f.org_name, pick(f.site_name));
    const orgLogo = pick(f.org_logo, pick(f.brand_logo_url));
    const graph = [];

    if (orgName || orgLogo || sameAs(pick(f.org_same_as, f.same_as)).length) {
      graph.push({
        '@type': 'Organization',
        'name': orgName || undefined,
        'url': pick(f.site_url) || undefined,
        'logo': orgLogo || undefined,
        'sameAs': sameAs(pick(f.org_same_as, f.same_as))
      });
    }
    if (pick(f.site_url)) {
      const website = {
        '@type': 'WebSite',
        'url': pick(f.site_url),
        'name': pick(f.site_name) || undefined
      };
      if (yes(f.has_search) && pick(f.search_url_pattern)) {
        website.potentialAction = {
          '@type': 'SearchAction',
          'target': pick(f.search_url_pattern),
          'query-input': 'required name=search_term_string'
        };
      }
      graph.push(website);
    }

    const pageNode = {
      '@type': pageType,
      'url': pick(f.page_url) || undefined,
      'name': pick(f.h1) || pick(f.title) || undefined,
      'isPartOf': pick(f.site_url) ? { '@id': pick(f.site_url) } : undefined,
      'inLanguage': lang || undefined,
      'about': pick(f.about_keywords) ? pick(f.about_keywords).split(',').map(s=>s.trim()).filter(Boolean) : undefined,
      'datePublished': pick(f.date_published) || undefined,
      'dateModified': pick(f.date_modified) || undefined,
      'breadcrumb': pick(f.breadcrumbs) ? { '@type':'BreadcrumbList', 'itemListElement': pick(f.breadcrumbs).split('>').map((t,i)=>({ '@type':'ListItem','position': i+1,'name': t.trim() })) } : undefined
    };

    if (pageType === 'FAQPage' && pick(f.faq_qas)) {
      const qas = list(f.faq_qas).map(line => {
        const [q,a] = line.split('|').map(s=>s && s.trim());
        return q && a ? { '@type':'Question','name':q,'acceptedAnswer':{ '@type':'Answer','text':a } } : null;
      }).filter(Boolean);
      pageNode.mainEntity = qas;
    }

    if (pageType === 'HowTo' && pick(f.howto_steps)) {
      const steps = list(f.howto_steps).map((line, idx) => ({ '@type':'HowToStep','position': idx+1,'name': line.split(':')[0].trim(),'text': line.replace(/^.*?:/,'').trim() }));
      pageNode.step = steps;
    }

    if (pageType === 'Product' && pick(f.product_fields)) {
      const [name, sku, price, currency] = pick(f.product_fields).split('|').map(s=>s && s.trim());
      pageNode.name = name || pageNode.name;
      pageNode.sku = sku || undefined;
      pageNode.offers = (price && currency) ? { '@type':'Offer','price': price,'priceCurrency': currency, 'url': pick(f.page_url) || undefined } : undefined;
    }

    if (pageType === 'VideoObject' && pick(f.video_fields)) {
      const [vname, vurl, thumb, duration, upload] = pick(f.video_fields).split('|').map(s=>s && s.trim());
      pageNode.name = vname || pageNode.name;
      pageNode.contentUrl = vurl || undefined;
      pageNode.thumbnailUrl = thumb ? [thumb] : undefined;
      pageNode.duration = duration || undefined;
      pageNode.uploadDate = upload || undefined;
    }

    if (pageType === 'Article' || pageType === 'BlogPosting') {
      pageNode.author = pick(f.author_name) ? { '@type':'Organization','name': pick(f.author_name) } : undefined;
    }

    graph.push(pageNode);

    const jsonldBlock = [
      '<script type="application/ld+json">',
      JSON.stringify({ '@context':'https://schema.org', '@graph': graph }, null, 2),
      '</script>'
    ].join('\n');

    const hreflangs = list(f.hreflang_map).map(line => {
      const [u, l] = line.split('|').map(s=>s && s.trim());
      return (u && l) ? { url:u, lang:l } : null;
    }).filter(Boolean);

    const robotsTxt = [
      'User-agent: *',
      ...(list(f.robots_disallow).length ? list(f.robots_disallow).map(p => `Disallow: ${p}`) : ['Disallow:']),
      ...(list(f.robots_allow).length ? list(f.robots_allow).map(p => `Allow: ${p}`) : []),
      pick(f.site_url) ? `Sitemap: ${pick(f.site_url)}sitemap.xml` : ''
    ].filter(Boolean).join('\n');

    const urls = [
      pick(f.page_url),
      ...list(f.extra_sitemap_urls)
    ].filter(Boolean);

    const sitemapXml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(u => {
        return [
          '  <url>',
          `    <loc>${u}</loc>`,
          pick(f.lastmod) ? `    <lastmod>${pick(f.lastmod)}</lastmod>` : '',
          pick(f.changefreq) ? `    <changefreq>${pick(f.changefreq)}</changefreq>` : '',
          '  </url>'
        ].filter(Boolean).join('\n');
      }),
      '</urlset>'
    ].join('\n');

    const checklist = [
      'checklist',
      `- language: html lang set to ${lang}`,
      `- canonical: ${canon || 'missing'}`,
      `- robots: ${robots}`,
      `- open graph: ${f.og_title ? 'present' : 'missing'} title, ${f.og_image_url ? 'image ok' : 'image missing'}`,
      `- twitter card: ${twCard}`,
      `- schema: ${pageType} + organization + website`,
      `- hreflang: ${hreflangs.length ? `${hreflangs.length} variants` : 'none'}`,
      `- performance: hero ${f.hero_image_url ? 'preloaded' : 'not set'}, fonts ${list(f.preload_fonts).length ? 'preloaded' : 'none'}, preconnect ${list(f.preconnect_hosts).length ? 'set' : 'none'}`,
      `- accessibility: skip link to ${pick(f.skip_link_target,'#main')}, alt policy defined`,
      `- monitoring: search console ${pick(f.gsc_property,'not set')}, bing webmaster ${pick(f.bingwm_property,'not set')}`
    ].join('\n');

    const blocks = [];
    if (outputChoice.includes('bundle') || outputChoice.includes('head only')) blocks.push('html head\n' + headBlock);
    if (outputChoice.includes('bundle') || outputChoice.includes('json ld only')) blocks.push('json ld\n' + jsonldBlock);
    if (outputChoice.includes('bundle') || outputChoice.includes('robots + sitemap only')) {
      blocks.push('robots.txt\n' + robotsTxt);
      blocks.push('sitemap.xml\n' + sitemapXml);
    }
    if (outputChoice.includes('bundle')) blocks.push(checklist);

    const header = [
      'create a complete website metadata and ai seo bundle.',
      f.project_title && `project: ${f.project_title}`,
      f.site_name && `site: ${f.site_name}`,
      f.site_url && `root: ${f.site_url}`,
      `lang: ${lang}`,
      outline
    ].filter(Boolean).join('\n');

    return [
      header,
      '',
      ...blocks
    ].join('\n\n');
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

