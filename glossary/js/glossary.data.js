

(function(g){ g.GLOSSARY = Array.isArray(g.GLOSSARY) ? g.GLOSSARY : []; })(globalThis);


(function initGlossaryRuntime(global) {
  // Allow multiple loads safely
  if (global.__VIBE_GLOSSARY_CORE__) return;
  global.__VIBE_GLOSSARY_CORE__ = true;

  // --------------- Data container ---------------
  // If the host page defines GLOSSARY earlier, reuse it.
  global.GLOSSARY = global.GLOSSARY || [];

  // --------------- Utilities --------------------
  const toSlug = (s) =>
    String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[\s_/]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

  const uniq = (arr) => Array.from(new Set((arr || []).filter(Boolean)));

  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

  // --------------- Schema defaults --------------
  const DEFAULT = {
    slug: "",
    term: "",
    aliases: [],
    definition: "",
    sources: [],        // [{ title, url }]
    categories: [],     // e.g., ["overarching"]
    tags: [],           // e.g., ["type:concept","topic:llm"]
    related: [],        // array of slugs
    status: "draft",    // "draft" | "verified" | "deprecated"
    notes: ""
  };

  // --------------- Push guard -------------------
  // We wrap Array.push so that all entries are normalized as they're added.
  const __rawPush = Array.prototype.push;
  const __normalizeEntry = (e) => {
    if (!isObj(e)) return null;

    const out = {
      ...DEFAULT,
      ...e,
      aliases: uniq(e.aliases || []),
      categories: uniq(e.categories || []),
      tags: uniq(e.tags || []),
      related: uniq(e.related || []),
      sources: (e.sources || []).map((s) =>
        isObj(s) ? { title: s.title || "", url: s.url || "" } : null
      ).filter(Boolean),
      status: e.status || DEFAULT.status,
      notes: e.notes || ""
    };

    // Slug: prefer provided, otherwise derive from term
    out.slug = toSlug(out.slug || out.term);
    // Basic required fields
    if (!out.term) out.term = out.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return out;
  };

  // Install guarded push on the GLOSSARY instance
  // Any downstream code that calls GLOSSARY.push([...]) is normalized here.
  global.GLOSSARY.push = function guardedPush() {
    const args = Array.from(arguments);
    const flattened = args.flat(Infinity);
    const cleaned = flattened
      .map(__normalizeEntry)
      .filter(Boolean);

    return __rawPush.apply(this, cleaned);
  };

  // Expose small helpers during data ingestion.
  global.__VIBE_GLOSSARY_UTILS__ = { toSlug, uniq };
})(typeof window !== "undefined" ? window : globalThis);



GLOSSARY.push(
  {
    slug: "ai-human-research-and-analysis",
    term: "AI-Human Research and Analysis",
    aliases: ["human–AI research", "AI UX research", "HCI for AI", "AI usability studies", "AI trust & safety research"],
    definition: `A human-centered discipline focused on how people perceive, use, and collaborate with AI systems. It blends UX research, behavioral science, HCI, and safety evaluation to uncover needs, pain points, mental models, and trust dynamics—then feeds those insights into product decisions, prompts, policies, and metrics so AI feels capable *and* respectful of users.`,
    sources: [],
    categories: ["human-centered AI", "evaluation", "ux & research"],
    tags: [
      "kind:term",
      "type:discipline",
      "topic:human-ai",
      "phase:evaluation",
      "use:research",
      "level:intermediate"
    ],
    related: ["ai-human-technical-communication", "human-and-ai-behavior", "prompt-engineering-and-development", "alignment"],
    status: "verified",
    notes: `Use-cases: • Discovery studies to map user goals and risks • Comparative UX tests across model versions or guardrails • Trust calibration experiments (confidence displays, citations) • Longitudinal field studies of assistants at work
Boosters: • Triangulate qual + quant (think-aloud + logs/telemetry) • Pre-register success metrics (task success, satisfaction, error classes) • Include diverse users and contexts; sample edge cases • Close the loop: convert findings into prompts, policies, and KPIs
Caveats: Lab results may not generalize—validate in real workflows and monitor drift over time.`
  },
  {
    slug: "ai-human-technical-communication",
    term: "AI-Human Technical Communication",
    aliases: ["AI documentation", "AI product narratives", "explainable AI comms", "LLM prompt specs", "model behavior guides"],
    definition: `Translating model behavior, limits, and design choices into language that works for *both* experts and non-experts. Spans docs, quick-starts, prompt specs, change logs, and rationale write-ups so teams and users know what to expect, what to avoid, and how to get reliable results.`,
    sources: [],
    categories: ["human-centered AI", "documentation", "governance"],
    tags: [
      "kind:term",
      "type:discipline",
      "topic:communication",
      "phase:ideation",
      "use:documentation",
      "level:beginner"
    ],
    related: ["ai-human-research-and-analysis", "prompt-engineering-and-development", "rubric-approach", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Prompt specification and style guides • “Known limits & pitfalls” pages • Model update notes with behavior changes • Internal comms for risk reviews
Boosters: • Write for tasks not tech: examples before internals • Surface guardrails and failure modes up front • Provide copy-pasteable patterns and checklists • Maintain a glossary with consistent tags
Caveats: Overclaiming harms trust—mark uncertainty, cite sources, date assumptions.`
  },
  {
    slug: "alignment",
    term: "Alignment",
    aliases: ["AI alignment", "value alignment", "behavioral alignment", "safety alignment"],
    definition: `The ongoing process of steering AI systems toward human goals and constraints (helpful, honest, harmless). Combines data/finetuning methods (instruction tuning, RLHF/RLAIF), policy and UX design, eval suites, and post-deployment monitoring to reduce harmful or misleading behavior while preserving capability.`,
    sources: [],
    categories: ["safety & policy", "training & tuning", "evaluation"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:safety",
      "phase:evaluation",
      "use:governance",
      "level:advanced"
    ],
    related: ["artificial-intelligence-ai", "artificial-general-intelligence-agi", "generative-ai", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Policy design for assistants • Preference data collection and reward modeling • Safety evals and red-teaming • Post-launch incident review
Boosters: • Separate capability and safety metrics; track both • Use staged rollouts with kill switches • Pair automated checks with human review for high stakes • Iterate on prompts + policies + data
Caveats: Alignment is context- and culture-dependent—document scope and values explicitly.`
  },
  {
    slug: "architecture",
    term: "Architecture",
    aliases: ["system architecture", "solution architecture", "LLM stack design"],
    definition: `The blueprint of components and relationships in a system: models, prompts, tools, data flows, policies, and storage. Good architecture makes behavior modular, testable, and evolvable—separating concerns like prompting, retrieval, tool calls, and safety layers.`,
    sources: [],
    categories: ["systems", "design", "orchestration"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:systems",
      "phase:plan",
      "use:system-design",
      "level:intermediate"
    ],
    related: ["prompt-architecture", "prompt-engineering-and-development", "peas-framework"],
    status: "verified",
    notes: `Use-cases: • Designing agent/tool pipelines • Selecting retrieval and memory layers • Isolation of safety filters and audits • Versioning prompts and models cleanly
Boosters: • Define interfaces (contracts) between layers • Add observability (traces, eval hooks) • Plan rollback paths and A/B buckets
Caveats: Overcoupling prompts to tools limits change—favor composable modules.`
  },
  {
    slug: "artificial-intelligence-ai",
    term: "Artificial Intelligence (AI)",
    aliases: ["ai", "machine intelligence", "ai systems"],
    definition: `The field and practice of building systems that perform tasks we associate with human cognition—perception, language, reasoning, decision-making. In products, “AI” broadly covers supervised/unsupervised learning, reinforcement learning, and generative models (LLMs, diffusion).`,
    sources: [],
    categories: ["foundations", "overview"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:llm",
      "phase:ideation",
      "use:education",
      "level:beginner"
    ],
    related: ["artificial-general-intelligence-agi", "artificial-narrow-intelligence-ani", "generative-ai"],
    status: "verified",
    notes: `Use-cases: • Orientation for stakeholders • Scoping AI vs. non-AI solutions • Terminology alignment in docs
Boosters: • Clarify model classes with examples • Distinguish capabilities vs. deployment constraints • Maintain a living glossary
Caveats: “AI” is overloaded—define what you mean per project.`
  },
  {
    slug: "artificial-general-intelligence-agi",
    term: "Artificial General Intelligence",
    aliases: ["agi", "strong ai", "general intelligence"],
    definition: `A hypothetical AI that can learn and apply knowledge broadly across domains at least as well as a human. Used as a planning horizon concept to discuss safety, governance, and capability generalization beyond narrow tasks.`,
    sources: [],
    categories: ["foundations", "safety & policy"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:llm",
      "phase:ideation",
      "use:education",
      "level:advanced"
    ],
    related: ["artificial-intelligence-ai", "artificial-superintelligence-asi", "artificial-narrow-intelligence-ani", "alignment"],
    status: "verified",
    notes: `Use-cases: • Strategy and risk discussions • Long-term governance frameworks • Research roadmaps
Boosters: • Separate speculative scenarios from present-day limits • Tie debates to measurable precursors
Caveats: Highly speculative—avoid letting it derail near-term product safety work.`
  },
  {
    slug: "artificial-narrow-intelligence-ani",
    term: "Artificial Narrow Intelligence",
    aliases: ["ani", "weak ai", "narrow ai"],
    definition: `Today’s dominant AI: systems specialized for a particular task or domain (translation, code assist, routing). Powerful when scoped, brittle when pushed beyond trained contexts.`,
    sources: [],
    categories: ["foundations", "product reality"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:llm",
      "phase:apply",
      "use:education",
      "level:beginner"
    ],
    related: ["artificial-intelligence-ai", "artificial-general-intelligence-agi"],
    status: "verified",
    notes: `Use-cases: • Scoping MVP capabilities • Choosing evaluation datasets • Communicating limits to users
Boosters: • Design guardrails that enforce scope • Route unknowns to fallback flows
Caveats: Overreach invites failure—prefer graceful refusal or handoff.`
  },
  {
    slug: "artificial-superintelligence-asi",
    term: "Artificial Superintelligence",
    aliases: ["asi", "superintelligence"],
    definition: `A speculative system that surpasses human ability across cognitive tasks (science, strategy, social reasoning). A thought tool for governance discussions about control, risk, and societal impact.`,
    sources: [],
    categories: ["foundations", "safety & policy"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:llm",
      "phase:ideation",
      "use:education",
      "level:advanced"
    ],
    related: ["artificial-general-intelligence-agi", "alignment"],
    status: "verified",
    notes: `Use-cases: • Scenario planning • Policy conversations with stakeholders
Boosters: • Anchor claims to current empirical trends • Separate hype from concrete governance needs
Caveats: Speculation isn’t evidence—avoid policy by vibes.`
  },
  {
    slug: "generative-ai",
    term: "Generative AI",
    aliases: ["genai", "generative artificial intelligence", "content generation AI"],
    definition: `Systems that learn data distributions to produce new text, images, audio, video, or code under guidance (prompts, conditions). Includes LLMs and diffusion models; power comes from pairing generation with constraints, tools, and feedback.`,
    sources: [],
    categories: ["foundations", "applications"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:generative",
      "phase:prompting",
      "use:education",
      "level:beginner"
    ],
    related: ["prompt-engineering-and-development", "artificial-intelligence-ai"],
    status: "verified",
    notes: `Use-cases: • Creative drafting • Data transformation • Prototype UX flows
Boosters: • Add structure (schemas, sections) • Use retrieval/tools for grounding
Caveats: High fluency ≠ high accuracy—verify claims.`
  },
  {
    slug: "human-and-ai-behavior",
    term: "Human and AI Behavior",
    aliases: ["human–AI interaction patterns", "behavioral lenses for AI", "AI behavior & UX"],
    definition: `A practical lens for translating human nuance into AI-friendly structures (roles, prompts, constraints) and for mapping AI strengths/limits back into humane, legible experiences. Bridges psychology with prompt and product design.`,
    sources: [],
    categories: ["human-centered AI", "behavior", "design"],
    tags: [
      "kind:term",
      "type:discipline",
      "topic:human-ai",
      "phase:ideation",
      "use:ux",
      "level:intermediate"
    ],
    related: ["ai-human-research-and-analysis", "ai-human-technical-communication"],
    status: "verified",
    notes: `Use-cases: • Behavior mapping for assistants • Tone, refusal, and escalation design • Feedback loops that teach users & models
Boosters: • Write persona/behavior contracts • Instrument for friction points and delight
Caveats: Beware anthropomorphism—communicate limits clearly.`
  },
  {
    slug: "prompt-engineering-and-development",
    term: "Prompt Engineering and Development",
    aliases: ["prompt engineering", "prompt design", "prompt development", "prompt ops"],
    definition: `The craft of shaping model behavior with instructions, examples, constraints, tools, and eval loops. Treats prompts as first-class artifacts with versioning, tests, and governance so outputs are consistent, controllable, and improvable.`,
    sources: [],
    categories: ["orchestration", "quality", "development"],
    tags: [
      "kind:term",
      "type:discipline",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["prompt-architect", "prompt-architecture", "raccca-framework", "rubric-approach"],
    status: "verified",
    notes: `Use-cases: • Designing assistants and agents • Mitigating hallucinations via structured outputs • Multi-model content pipelines
Boosters: • Keep a library of tested patterns • Add evaluation gates on critical paths
Caveats: Prompt magic fades without measurement—invest in evals.`
  },
  {
    slug: "prompt-architect",
    term: "Prompt Architect",
    aliases: ["prompt systems designer", "prompt strategist", "prompt lead"],
    definition: `A role that extends prompt engineering into end-to-end product/system design: defines behaviors, chooses orchestration patterns, aligns UX and safety, and builds reusable prompt components with tests, docs, and versioning.`,
    sources: [],
    categories: ["roles", "orchestration"],
    tags: [
      "kind:term",
      "type:role",
      "topic:prompting",
      "phase:ideation",
      "use:system-design",
      "level:advanced"
    ],
    related: ["prompt-engineering-and-development", "architecture", "prompt-architecture"],
    status: "verified",
    notes: `Use-cases: • Designing RAG/agent stacks • Establishing prompt libraries & governance • Cross-functional prompt reviews
Boosters: • Maintain templates + rubrics • Separate concerns (policy vs. capability) • Instrument outputs for continuous learning
Caveats: Role success depends on tight collaboration with UX, safety, and infra.`
  },
  {
    slug: "waves-of-ai-prompting-evolutions",
    term: "Waves of AI Prompting Evolutions",
    aliases: ["three waves of ai", "darpa three waves", "rule-based → learning → contextual"],
    definition: `A high-level storyline for AI progress: (1) **Rule-based** expert systems with symbolic rules; (2) **Statistical learning** systems that learn from data but are opaque; (3) **Contextual adaptation**, blending knowledge, learning, and tool use to act in context like a helpful assistant.`,
    sources: [
      { title: "Futurism overview", url: "https://futurism.com/artificial-intelligence-tech-will-arrive-in-three-waves" },
      { title: "A DARPA Perspective on AI", url: "https://machinelearning.technicacuriosa.com/2017/03/19/a-darpa-perspective-on-artificial-intelligence/" }
    ],
    categories: ["foundations", "history"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:llm",
      "phase:ideation",
      "use:education",
      "level:beginner"
    ],
    related: ["artificial-intelligence-ai", "generative-ai"],
    status: "verified",
    notes: `Use-cases: • Exec/partner education • Framing product roadmaps • Choosing evaluation styles per wave
Boosters: • Add concrete examples per wave • Call out limits and transitions
Caveats: A simplification—real systems mix elements from multiple waves.`
  }
);

GLOSSARY.push(
  {
    slug: "prompt-architecture",
    term: "Prompt Architecture",
    aliases: ["virtual brain", "prompt system design", "prompt pipeline architecture"],
    definition: `The arrangement of prompts, tools, memory, and evaluators that produce predictable behavior. Emphasizes modular roles (system/user/tool), reusable templates, guardrails, and observability so teams can improve parts without breaking the whole.`,
    sources: [],
    categories: ["orchestration", "design patterns"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:prompting",
      "phase:prompting",
      "use:system-design",
      "level:advanced"
    ],
    related: ["architecture", "prompt-engineering-and-development", "rtf-framework", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Building agent flows with tools • Multi-turn assistants with memory • Structured extraction pipelines
Boosters: • Define contracts for each module • Version prompts and log deltas • Add offline/online evals before shipping
Caveats: Hidden coupling between prompts can regress silently—test end-to-end.`
  },
  {
    slug: "clear-path-forward-framework",
    term: "CLEAR Path Forward Framework",
    aliases: ["CLEAR path", "concise logical explicit adaptive reflective"],
    definition: `A prompt-literacy framework: keep prompts **Concise**, **Logical**, **Explicit**, **Adaptive**, and **Reflective**. It nudges better structure, fit-to-task, and iterative improvement across sessions.`,
    sources: [
      { title: "ScienceDirect (Computers & Education)", url: "https://www.sciencedirect.com/science/article/abs/pii/S0099133323000599" }
    ],
    categories: ["prompt patterns", "education"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:prompting",
      "phase:ideation",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["raccca-framework", "rubric-approach", "clear-prompting-method"],
    status: "verified",
    notes: `Use-cases: • Coaching non-experts to write better prompts • Team prompt reviews • Course materials on AI literacy
Boosters: • Convert each letter into a checklist item • Keep examples per letter for quick reference
Caveats: Frameworks guide, they don’t guarantee—validate with small tests.`
  },
  {
    slug: "clear-prompting-method",
    term: "CLEAR Prompting Method",
    aliases: ["clarity length empathy actionability relevance", "CLEAR checklist"],
    definition: `A quick checklist—**Clarity**, **Length**, **Empathy**, **Actionability**, **Relevance**—for improving instruction quality and fit to audience/context before you hit Enter.`,
    sources: [],
    categories: ["prompt patterns", "quality"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["clear-path-forward-framework", "rubric-approach"],
    status: "verified",
    notes: `Use-cases: • Last-mile edits of prompts • Customer support tone checks • Educational prompts with sensitive audiences
Boosters: • Annotate “who reads this” and “what they need” • Trim filler; promote verbs and constraints
Caveats: Empathy ≠ overpromising—set boundaries explicitly.`
  },
  {
    slug: "clear-framework",
    term: "CLEAR Framework",
    aliases: ["challenge limitation effect action result", "CLEAR problem framing"],
    definition: `A problem-framing scaffold: define the **Challenge** and **Limitations**, describe the **Effect** (impact), propose the **Action**, and state the desired **Result**. Helps align teams on constraints and outcomes before prompting.`,
    sources: [
      { title: "LinkedIn article", url: "https://www.linkedin.com/pulse/demystifying-prompt-engineering-unveiling-art-behind-effective" }
    ],
    categories: ["problem framing", "planning"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:ideation",
      "use:decision-support",
      "level:beginner"
    ],
    related: ["par-method", "star-technique", "aida-model", "swot-analysis"],
    status: "verified",
    notes: `Use-cases: • Framing AI features or experiments • Writing crisp tickets/specs • Scoping risks and guardrails
Boosters: • Keep each field to one or two lines • Add success metrics linked to Result
Caveats: Don’t skip limitations—naming constraints reduces rework later.`
  },
  {
    slug: "swot-analysis",
    term: "SWOT Analysis",
    aliases: ["strengths weaknesses opportunities threats", "SWOT matrix"],
    definition: `A classic situational scan: list internal **Strengths/Weaknesses** and external **Opportunities/Threats** to guide strategy, eval prompts, or product bets.`,
    sources: [
      { title: "MindTools SWOT overview", url: "https://www.mindtools.com/amtbj63/swot-analysis" }
    ],
    categories: ["analysis", "strategy"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:ideation",
      "use:decision-support",
      "level:beginner"
    ],
    related: ["aida-model", "par-method", "star-technique", "clear-framework"],
    status: "verified",
    notes: `Use-cases: • Choosing models/tools • Competitive scans • Prompt pattern trade-offs
Boosters: • Convert each quadrant into an action • Revisit quarterly to catch drift
Caveats: Lists without decisions waste time—end with a pick.`
  },
  {
    slug: "par-method",
    term: "PAR Method",
    aliases: ["problem action result", "PAR story"],
    definition: `A concise narrative: state the **Problem**, the **Action** taken, and the **Result**. Useful for specs, case studies, and prompt examples that demonstrate impact.`,
    sources: [
      { title: "Indeed: PAR Method", url: "https://www.indeed.com/career-advice/interviewing/par-method" }
    ],
    categories: ["communication", "evidence"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:messaging",
      "level:beginner"
    ],
    related: ["star-technique", "clear-framework"],
    status: "verified",
    notes: `Use-cases: • Prompt exemplars • Release notes and changelogs • Portfolio bullets
Boosters: • Quantify results where possible • Keep one clear action per story
Caveats: Avoid vague results—tie to metrics or user outcomes.`
  },
  {
    slug: "aida-model",
    term: "AIDA Model",
    aliases: ["attention interest desire action", "AIDA copy formula"],
    definition: `A persuasion flow: capture **Attention**, build **Interest**, create **Desire**, and drive **Action**. Works for prompts that need to inform *and* motivate.`,
    sources: [
      { title: "Siege Media: AIDA", url: "https://www.siegemedia.com/creation/aida-model" }
    ],
    categories: ["messaging", "persuasion"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:ideation",
      "use:messaging",
      "level:beginner"
    ],
    related: ["swot-analysis", "par-method"],
    status: "verified",
    notes: `Use-cases: • Landing pages and emails • Educational prompts that drive next steps
Boosters: • Make actions explicit with constraints and deadlines
Caveats: Don’t oversell—align claims with evidence.`
  },
  {
    slug: "star-technique",
    term: "STAR Technique",
    aliases: ["situation task action result", "STAR response"],
    definition: `A structured response: describe the **Situation**, define the **Task**, detail the **Action**, and report the **Result**. Helps prompts elicit complete, auditable answers.`,
    sources: [
      { title: "The Muse: STAR method", url: "https://www.themuse.com/advice/star-interview-method" }
    ],
    categories: ["communication", "evaluation"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:messaging",
      "level:beginner"
    ],
    related: ["par-method", "clear-framework"],
    status: "verified",
    notes: `Use-cases: • Interview sims • RCA/postmortems • Testimony-style summaries
Boosters: • Limit each section to 2–3 lines • Attach metrics to Results
Caveats: Story ≠ proof—link to evidence or logs.`
  },
  {
    slug: "peas-framework",
    term: "PEAS Framework",
    aliases: ["performance environment actuators sensors", "PEAS agent spec"],
    definition: `A compact agent spec: define **Performance** measures, **Environment**, **Actuators** (actions/tools), and **Sensors** (inputs). Clarifies scope, metrics, and interfaces before building.`,
    sources: [
      { title: "Analytics Vidhya: PEAS", url: "https://www.analyticsvidhya.com/blog/2022/08/simplifying-ai-models-with-the-peas-representation-system" }
    ],
    categories: ["agent design", "planning"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:llm",
      "phase:ideation",
      "use:system-design",
      "level:intermediate"
    ],
    related: ["architecture", "prompt-architecture"],
    status: "verified",
    notes: `Use-cases: • Scoping agent capabilities • Tool/API interface planning • Evaluation setup
Boosters: • List negative rewards/penalties • Add safety constraints and timeouts
Caveats: Keep measures aligned with user value, not proxy gaming.`
  },
  {
    slug: "rtf-framework",
    term: "RTF Framework",
    aliases: ["role-task-format", "RTF prompt scaffold"],
    definition: `A versatile scaffold: set the **Role** (persona/constraints), state the **Task** (goal and success criteria), and specify the **Format** (schema/sections). Useful default for most prompts.`,
    sources: [],
    categories: ["prompt patterns"],
    tags: [
      "kind:pattern",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["risen-framework", "ratio-framework", "rodes-framework", "costar-framework"],
    status: "verified",
    notes: `Use-cases: • Rapid prompt drafting • Constraining outputs to JSON/tables • Teaching newcomers a consistent style
Boosters: • Add examples and edge cases under Format • Include refusal/safety notes in Role
Caveats: Overlong roles can waste tokens—keep tight.`
  },
  {
    slug: "risen-framework",
    term: "RISEN Framework",
    aliases: ["role instructions steps end-goal narrowing", "RISEN prompt scaffold"],
    definition: `A scaffold for complex work: set **Role**, precise **Instructions**, enumerated **Steps**, the **End goal**, and **Narrowing** guidance to keep scope tight.`,
    sources: [],
    categories: ["prompt patterns"],
    tags: [
      "kind:pattern",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["rtf-framework", "costar-framework", "rodes-framework", "ratio-framework"],
    status: "verified",
    notes: `Use-cases: • Multi-stage analyses • Complex content transformations • Guided coding tasks
Boosters: • Add “ask to clarify when blocked” • Cap steps and require a final checklist
Caveats: Too many steps can rigidify—allow deviations with justification.`
  },
  {
    slug: "ratio-framework",
    term: "RATIO Framework",
    aliases: ["role audience task instructions output", "RATIO prompt scaffold"],
    definition: `Centers the **Audience**: define **Role**, **Audience**, **Task**, **Instructions**, and **Output**. Ensures tone and content match the reader and destination.`,
    sources: [],
    categories: ["prompt patterns"],
    tags: [
      "kind:pattern",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["rtf-framework", "risen-framework", "rodes-framework"],
    status: "verified",
    notes: `Use-cases: • Marketing/education prompts • Support responses by tier • Exec vs. engineer versions of the same output
Boosters: • Specify reading level and prior knowledge • Provide an example of “voice”
Caveats: Audience drift happens—restate who you’re writing for.`
  },
  {
    slug: "rodes-framework",
    term: "RODES Framework",
    aliases: ["role objective details examples sense-check", "RODES prompt scaffold"],
    definition: `Specify **Role** and **Objective**, list essential **Details**, add **Examples**, and finish with a **Sense Check** that verifies requirements are met.`,
    sources: [],
    categories: ["prompt patterns"],
    tags: [
      "kind:pattern",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["ratio-framework", "rtf-framework", "costar-framework"],
    status: "verified",
    notes: `Use-cases: • Outputs with strict criteria • Compliance-heavy drafting • Technical how-tos
Boosters: • Encode the sense-check as a short rubric • Require a pass/fail note before final output
Caveats: Examples can anchor too strongly—vary them across runs.`
  },
  {
    slug: "costar-framework",
    term: "COSTAR Framework",
    aliases: ["context objective style tone audience response", "COSTAR prompt scaffold"],
    definition: `Guide the model with **Context**, **Objective**, **Style**, **Tone**, **Audience**, and **Response** format. Useful when tone and formatting matter as much as content.`,
    sources: [],
    categories: ["prompt patterns"],
    tags: [
      "kind:pattern",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["rtf-framework", "risen-framework", "ratio-framework", "rodes-framework"],
    status: "verified",
    notes: `Use-cases: • Brand-consistent copy • Public announcements • UX microcopy
Boosters: • Provide one on-brand example and one anti-example • Lock required sections under Response
Caveats: Tone conflicts with objective can confuse—resolve priority explicitly.`
  },
  {
    slug: "golden-circle-framework",
    term: "Golden Circle Framework",
    aliases: ["what-why-how", "why-how-what framework"],
    definition: `Purpose-first messaging: start with **WHY** (purpose), then **HOW** (approach), then **WHAT** (deliverable). Aligns prompts and outputs to mission and audience motivation.`,
    sources: [
      { title: "Business Model Ideas", url: "https://www.businessmodelideas.com/blog/why-how-what-the-golden-circle-as-a-leadership-tool" }
    ],
    categories: ["messaging", "strategy"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:ideation",
      "use:messaging",
      "level:beginner"
    ],
    related: ["aida-model", "swot-analysis"],
    status: "verified",
    notes: `Use-cases: • Mission statements • Product one-pagers • Prompt headers that align teams
Boosters: • Keep WHY to one sentence • Tie HOW to differentiators
Caveats: Inspirational fluff is easy—ground WHY in user outcomes.`
  },
  {
    slug: "rubric-approach",
    term: "Rubric Approach",
    aliases: ["criteria-led prompting", "scored rubric"],
    definition: `Use explicit criteria (a rubric) to guide or evaluate outputs. Encourages consistency, fairness, and faster iteration when paired with examples and pass/fail thresholds.`,
    sources: [],
    categories: ["evaluation", "quality"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:evaluation",
      "phase:evaluation",
      "use:review",
      "level:intermediate"
    ],
    related: ["raccca-framework", "prompt-fine-tuning", "ai-human-technical-communication"],
    status: "verified",
    notes: `Use-cases: • Grading generated answers • Enforcing formatting/style • Hiring and support quality bars
Boosters: • Keep criteria few and observable • Pilot inter-rater reliability • Show exemplar good/bad outputs
Caveats: Rubrics can encode bias—review periodically with diverse stakeholders.`
  },
  {
    slug: "prompt-template-engineering",
    term: "Prompt Template Engineering",
    aliases: ["prompt templating", "template libraries"],
    definition: `Design reusable prompt templates/functions that capture proven patterns for a class of tasks. Increases consistency, speeds iteration, and reduces cognitive load for authors.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["orchestration", "quality"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["manual-template-engineering", "automated-template-learning", "prompt-architecture"],
    status: "verified",
    notes: `Use-cases: • Standardizing support replies • Data extraction schemas • Agent tool-call wrappers
Boosters: • Version and test templates • Provide slot-level guidance and defaults
Caveats: Templates can fossilize—refresh with evals and user feedback.`
  },
  {
    slug: "manual-template-engineering",
    term: "Manual Template Engineering",
    aliases: ["hand-crafted templates", "expert-authored prompts"],
    definition: `Create templates via expert iteration, qualitative testing, and targeted evals. Best when domain stakes are high or data is scarce.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["orchestration"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["prompt-template-engineering", "automated-template-learning"],
    status: "verified",
    notes: `Use-cases: • Regulated domains • Style-critical outputs • Small-data scenarios
Boosters: • Pair with rubrics and examples • Capture rationale in docs
Caveats: Slower coverage—combine with automation when safe.`
  },
  {
    slug: "automated-template-learning",
    term: "Automated Template Learning",
    aliases: ["auto-prompt search", "prompt optimization"],
    definition: `Use search/optimization (LLM rewriters, genetic edits, eval loops) to discover high-performing templates at scale. Great for broad intent catalogs.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["orchestration", "automation"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:advanced"
    ],
    related: ["prompt-template-engineering", "manual-template-engineering"],
    status: "verified",
    notes: `Use-cases: • Large FAQ/intent libraries • Multi-lingual prompt sets • Rapid A/B exploration
Boosters: • Hold out test sets to avoid overfitting • Blend human review for safety/brand
Caveats: Optimizing for the wrong metric yields perverse outputs—choose carefully.`
  },
  {
    slug: "raccca-framework",
    term: "RACCCA Framework",
    aliases: ["relevance accuracy completeness clarity coherence appropriateness", "RACCCA checklist"],
    definition: `A review lens: check **Relevance**, **Accuracy**, **Completeness**, **Clarity**, **Coherence**, and **Appropriateness**. Use as a self-critique or evaluation rubric for outputs.`,
    sources: [
      { title: "Andrew Maynard: Intro to Prompt Engineering", url: "https://andrewmaynard.net/an-introduction-to-basic-prompt-engineering-with-chatgpt/" }
    ],
    categories: ["evaluation", "quality"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:evaluation",
      "phase:evaluation",
      "use:review",
      "level:beginner"
    ],
    related: ["rubric-approach", "clear-path-forward-framework"],
    status: "verified",
    notes: `Use-cases: • QA before shipping • Peer reviews • Tuning prompts for reliability
Boosters: • Convert to a 0–2 scoring scale • Require fixes for any 0s
Caveats: Keep it fast—long checklists won’t be used.`
  },
  {
    slug: "prompt-fine-tuning",
    term: "Prompt Fine-Tuning",
    aliases: ["iterative prompting", "prompt tweaks"],
    definition: `Make small, targeted changes—constraints, examples, steps, formatting—to lift output quality. Treat each change as a hypothesis and test against a tiny eval set.`,
    sources: [],
    categories: ["quality", "debugging"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:prompting",
      "phase:debugging",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["raccca-framework", "rubric-approach"],
    status: "verified",
    notes: `Use-cases: • Reducing hallucinations • Fixing formatting drift • Improving tone/voice match
Boosters: • Change one variable at a time • Keep before/after examples
Caveats: Diminishing returns—revisit data, tools, or model when plateauing.`
  },
  {
    slug: "clarity-and-precision",
    term: "Clarity and Precision",
    aliases: ["be explicit", "state requirements clearly"],
    definition: `Explicit, unambiguous instructions align token-by-token behavior with your intent. More clarity → less model guessing → more stable outputs.`,
    sources: [],
    categories: ["principles"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["desired-format", "verbosity-control", "contextual-information"],
    status: "verified",
    notes: `Use-cases: • Regulated or high-stakes drafts • Structured extraction • Multi-author prompts
Boosters: • Replace adjectives with criteria • Add acceptance tests/examples
Caveats: Over-detailing can bloat tokens—prioritize constraints that matter.`
  },
  {
    slug: "contextual-information",
    term: "Contextual Information",
    aliases: ["provide context", "background + constraints"],
    definition: `Give background, goals, constraints, and examples so the model can ground its choices. Context reduces ambiguity and mismatched assumptions.`,
    sources: [],
    categories: ["principles"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["clarity-and-precision", "scaffolding"],
    status: "verified",
    notes: `Use-cases: • Domain-specific outputs • Cross-team collaborations • Long-running projects with drift
Boosters: • Separate facts vs. preferences • Date volatile facts
Caveats: Too much context can distract—front-load only essentials.`
  },
  {
    slug: "desired-format",
    term: "Desired Format",
    aliases: ["output schema", "target structure"],
    definition: `Specify schemas/sections (JSON, tables, bullets) to shape outputs for readability or downstream parsing. Format is a constraint that improves reliability.`,
    sources: [],
    categories: ["principles"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["verbosity-control", "clarity-and-precision"],
    status: "verified",
    notes: `Use-cases: • API-bound outputs • BI tables and summaries • Rubric-based reports
Boosters: • Provide a minimal valid example • Validate JSON with a checker
Caveats: Rigid schemas can fail on edge cases—allow optional fields.`
  },
  {
    slug: "verbosity-control",
    term: "Verbosity Control",
    aliases: ["set length", "concise vs. elaborate"],
    definition: `Control response length and detail (brief, concise, detailed) to match cognitive load and channel. Saves tokens and attention while improving scanability.`,
    sources: [],
    categories: ["principles"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["desired-format", "clarity-and-precision"],
    status: "verified",
    notes: `Use-cases: • Executive briefs vs. deep dives • Chat vs. docs • SMS/email constraints
Boosters: • Set explicit word/token caps • Ask for TL;DR + appendix patterns
Caveats: Over-trimming can hide assumptions—offer expandable detail.`
  },
  {
    slug: "scaffolding",
    term: "Scaffolding",
    aliases: ["decomposition", "stepwise prompting", "break down tasks"],
    definition: `Split complex tasks into ordered steps with intermediate checks. Keeps focus tight, reduces errors, and supports self-verification before final output.`,
    sources: [],
    categories: ["reasoning", "prompt patterns"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:reasoning",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["fallback-pattern", "contextual-information"],
    status: "verified",
    notes: `Use-cases: • Multi-hop analysis • Procedural code tasks • Data transformations
Boosters: • Add checkpoints and criteria per step • Allow early stop on failure
Caveats: Too many steps add latency—prune to essentials.`
  },
  {
    slug: "fallback-pattern",
    term: "Fallback Pattern",
    aliases: ["graceful degradation", "backup plan prompting"],
    definition: `Plan contingencies when confidence is low or a method fails: try an alternate approach, ask a clarifying question, reduce scope, or route to a human/tool.`,
    sources: [],
    categories: ["resilience", "prompt patterns"],
    tags: [
      "kind:pattern",
      "type:method",
      "topic:prompting",
      "phase:debugging",
      "use:reliability",
      "level:intermediate"
    ],
    related: ["scaffolding", "prompt-fine-tuning"],
    status: "verified",
    notes: `Use-cases: • Production assistants • Tool failures or timeouts • Ambiguous queries
Boosters: • Define confidence thresholds • Log fallback decisions for learning
Caveats: Infinite fallbacks loop—cap attempts and escalate.`
  },
  {
    slug: "easy-for-you-easy-for-it",
    term: "Easy for You, Easy for It",
    aliases: ["layer your asks", "human difficulty proxy"],
    definition: `Heuristic: if a task is hard for a person in one pass, it’s probably hard for the model. Layer the work into stages/outputs or multiple prompts to match cognitive limits on both sides.`,
    sources: [],
    categories: ["principles"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:ideation",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["scaffolding", "fallback-pattern"],
    status: "verified",
    notes: `Use-cases: • Complex analyses • Long creative briefs • Data pipelines
Boosters: • Add milestones and artifacts per stage • Review after each stage before proceeding
Caveats: Too many stages increase overhead—strike a balance.`
  },
  {
    slug: "put-smart-get-smart",
    term: "Put Smart, Get Smart",
    aliases: ["garbage in, garbage out (prompting)", "be specific"],
    definition: `Heuristic: the more specific, structured, and example-rich your prompt, the smarter the output appears. Invest upfront to reduce downstream cleanup.`,
    sources: [],
    categories: ["principles"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["clarity-and-precision", "desired-format"],
    status: "verified",
    notes: `Use-cases: • High-volume content generation • Strict formatting tasks • Cross-lingual prompts
Boosters: • Provide one gold example and one near-miss • State success criteria explicitly
Caveats: Overspecifying can overfit style—leave room for model strengths.`
  },
  {
    slug: "the-divergent-intern",
    term: "The Divergent Intern",
    aliases: ["intern model", "bright but literal intern"],
    definition: `A mental model: treat the AI like a bright, tireless, slightly literal intern. Explain *why*, give context, set boundaries, and check the work—then it shines.`,
    sources: [],
    categories: ["mental models", "education"],
    tags: [
      "kind:heuristic",
      "type:metaphor",
      "topic:prompting",
      "phase:ideation",
      "use:ux",
      "level:beginner"
    ],
    related: ["the-collaborative-partner", "the-10000-experts", "rtf-framework"],
    status: "verified",
    notes: `Use-cases: • Teaching new users how to prompt • Setting tone for reviews and guardrails • Coaching expectations about errors
Boosters: • Provide checklists and examples • Encourage asking clarifying questions
Caveats: Don’t anthropomorphize—skills are statistical, not sentient.`
  },
  {
    slug: "the-collaborative-partner",
    term: "The Collaborative Partner",
    aliases: ["dialogue with the model", "co-worker framing"],
    definition: `A mental model that treats prompting as a back-and-forth collaboration, not a one-shot command. Encourages clarifications, drafts, and shared review criteria.`,
    sources: [],
    categories: ["mental models", "workflow"],
    tags: [
      "kind:heuristic",
      "type:metaphor",
      "topic:prompting",
      "phase:ideation",
      "use:ux",
      "level:beginner"
    ],
    related: ["the-divergent-intern", "the-10000-experts"],
    status: "verified",
    notes: `Use-cases: • Co-writing and pair programming • Requirements gathering • Iterative design sprints
Boosters: • Establish roles and check-ins • Keep a running issues list
Caveats: Collaboration still needs ownership—assign decisions to humans.`
  },
  {
    slug: "the-10000-experts",
    term: "The 10,000 Experts",
    aliases: ["ten-thousand-experts", "10000-experts", "expert persona selection"],
    definition: `A metaphor: imagine a room of experts—be explicit about which expert you want (persona), with what constraints and evidence standards. Persona specificity reduces drift.`,
    sources: [],
    categories: ["mental models", "prompt patterns"],
    tags: [
      "kind:heuristic",
      "type:metaphor",
      "topic:prompting",
      "phase:ideation",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["rtf-framework", "ratio-framework", "the-collaborative-partner", "the-divergent-intern"],
    status: "verified",
    notes: `Use-cases: • Role-based coaching/feedback • Legal/medical style constraints (with disclaimers) • Multi-perspective analyses
Boosters: • Define the expert’s scope, sources, and refusal rules • Provide one mini bio to anchor tone
Caveats: Personas can smuggle bias—audit and rotate perspectives.`
  }
);


GLOSSARY.push(
  {
    slug: "composition",
    term: "Composition",
    aliases: ["prompt composition", "prompt elements", "prompt structure", "instruction mix"],
    definition: `The mix of building blocks inside a prompt (role, goals, constraints, examples, schemas, safety notes, tool hints, evaluation criteria) and how they work together. Good composition clarifies *what matters* and *how to respond*, reducing guesswork and variance. It’s the “ingredient list” of a prompt architecture that shapes tone, scope, and reliability.`,
    sources: [],
    categories: ["prompt architecture", "orchestration", "design patterns"],
    tags: [
      "kind:pattern",
      "type:component",
      "topic:prompting",
      "topic:architecture",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["sequence", "contextual-cues", "master-prompts", "desired-format", "scaffolding", "rtf-framework", "prompt-architecture"],
    status: "verified",
    notes: `Use-cases: • Designing a reusable prompt template • Turning messy asks into clear goals + constraints • Adding safety and formatting without bloating • Standardizing prompts across a product surface
Boosters: • Separate *facts, rules, examples, format* into labeled sections • Put must-have constraints near the ask • Keep examples short and high-signal • Include a tiny acceptance checklist for the model to self-check
Caveats: Too many ingredients cause token bloat and contradictions—favor essentials and link to external context when possible.`
  },
  {
    slug: "sequence",
    term: "Sequence",
    aliases: ["ordering", "prompt order", "instruction sequencing", "step ordering"],
    definition: `The order in which prompt elements appear. Ordering changes what the model attends to: early content frames interpretation; late content benefits from recency. Effective sequences front-load goals and constraints, then examples, then the concrete request and output format.`,
    sources: [],
    categories: ["prompt architecture", "orchestration", "design patterns"],
    tags: [
      "kind:pattern",
      "type:component",
      "topic:prompting",
      "topic:architecture",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["composition", "contextual-cues", "master-prompts", "verbosity-control", "rtf-framework", "rodes-framework"],
    status: "verified",
    notes: `Use-cases: • Moving format rules after the task to reduce verbosity • Placing safety/policy before creative guidance • Few-shot before the ask to anchor style • Tool hints just before the callable section
Boosters: • Use a consistent section order across prompts • Put “do/don’t” right before the ask • End with a validation step (schema/rubric) • When in doubt: Role → Goal → Constraints → Examples → Ask → Format → Checks
Caveats: Conflicting late instructions can override earlier ones—avoid re-stating rules with different wording.`
  },
  {
    slug: "contextual-cues",
    term: "Contextual Cues",
    aliases: ["hints", "metadata cues", "examples & constraints", "context hints", "task context"],
    definition: `Small, targeted signals that steer interpretation: brief domain facts, constraints, positive/negative examples, audience, tone, and success criteria. Contextual cues act like soft rails—reducing ambiguity while keeping generation flexible.`,
    sources: [],
    categories: ["prompt architecture", "orchestration", "design patterns"],
    tags: [
      "kind:pattern",
      "type:component",
      "topic:prompting",
      "topic:architecture",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["composition", "sequence", "master-prompts", "few-shot-examples", "facts-expertise-primer", "clarity-and-precision", "desired-format"],
    status: "verified",
    notes: `Use-cases: • Grounding responses with 3–5 key facts • Teaching style with one gold + one anti-example • Narrowing scope (audience, length, domain) • Reducing hallucinations with brief constraints
Boosters: • Label cues explicitly (Facts:, Audience:, Don’ts:) • Keep each cue one line • Date volatile facts • Add 1–2 “anti-pattern” mini-examples to avoid common traps
Caveats: Over-long context dilutes signal—prefer succinct, high-precision cues over encyclopedic dumps.`
  },
  {
    slug: "master-prompts",
    term: "Master Prompts",
    aliases: ["overarching prompts", "system prompts", "governing prompts", "root prompts"],
    definition: `Persistent, high-level prompts that set role, scope, tone, policy, and success principles for a whole experience or agent. Sub-prompts inherit this umbrella, keeping behavior consistent across tasks while allowing local variation.`,
    sources: [],
    categories: ["prompt architecture", "orchestration", "governance"],
    tags: [
      "kind:pattern",
      "type:component",
      "topic:prompting",
      "topic:architecture",
      "phase:prompting",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["composition", "sequence", "contextual-cues", "prompt-architecture", "system-prompt", "rubric-approach", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Defining an assistant’s durable persona and refusal policy • Brand/voice consistency across surfaces • Multi-agent systems that share common values and interfaces • Versioned policy updates without rewriting every prompt
Boosters: • Keep the master short and principle-based; push details to local prompts • Version and changelog master prompts • Include a compact policy section and an escalation/refusal pattern • Add an “interpretation order” (policy > safety > user ask > style)
Caveats: Overly prescriptive masters cause brittleness; hidden or conflicting masters cause drift—document and test inheritance explicitly.`
  }
);


GLOSSARY.push(
  // --- Art of Prompting ---
  {
    slug: "creativity",
    term: "Creativity",
    aliases: ["creative prompting", "inventive prompting", "lateral prompting"],
    definition: `A practice of exploring multiple approaches, styles, and constraints to unlock novel, engaging outputs. In prompting, creativity means mixing formats (lists, tables, scripts), switching lenses (audience, tone), and running safe experiments to discover higher-signal instructions that the model responds to consistently.`,
    sources: [],
    categories: ["art of prompting", "skills", "ideation"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:ideation",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["intuition", "iterative-refinement", "personalization-and-adaptation", "strategic-thinking", "few-shot-examples"],
    status: "verified",
    notes: `Use-cases: • Brainstorming many angles before selecting one • Reframing tasks with unusual formats to spark ideas • Turning dry instructions into vivid, audience-aware prompts
Boosters: • Force variety with style/format lotteries • Pair one “wild” variant with one conservative baseline • Keep a swipe file of high-signal prompts and remix them
Caveats: Novel ≠ useful—always tie experiments to a measurable goal (clarity, accuracy, engagement).`
  },
  {
    slug: "intuition",
    term: "Intuition",
    aliases: ["prompting intuition", "tacit prompting know-how", "pattern sense"],
    definition: `Skill at reading the room: using tacit knowledge from prior runs, domain context, and user expectations to choose a promising structure quickly. Intuition narrows the search space so you test fewer, better prompts first.`,
    sources: [],
    categories: ["art of prompting", "skills"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:prompting",
      "phase:ideation",
      "use:prompt-selection",
      "level:intermediate"
    ],
    related: ["experiential-knowledge", "strategic-thinking", "iterative-refinement", "facts-expertise-primer"],
    status: "verified",
    notes: `Use-cases: • Choosing between role-play vs. rubric-first prompts • Estimating example count for few-shot setups • Guessing where a format constraint will help most
Boosters: • Write your intuition as a hypothesis and test it • Keep quick notes of wins/misses to train future instincts • Pair intuition with a tiny eval set to avoid bias
Caveats: Intuition can fixate—schedule deliberate “anti-intuitive” trials to sanity-check.`
  },
  {
    slug: "iterative-refinement",
    term: "Iterative Refinement",
    aliases: ["prompt iteration", "iterative prompting", "prompt sanding"],
    definition: `A tight loop of test → inspect → tweak. You adjust one variable at a time (constraint, example, order, format), compare outputs against a small rubric, and keep only changes that move the metric. This turns prompting from art into an evidence-guided craft.`,
    sources: [],
    categories: ["art of prompting", "quality", "debugging"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:prompting",
      "phase:debugging",
      "use:prompt-improvement",
      "level:beginner"
    ],
    related: ["prompt-fine-tuning", "raccca-framework", "rubric-approach", "strategic-thinking"],
    status: "verified",
    notes: `Use-cases: • Reducing hallucinations with tighter constraints • Fixing format drift for API-bound outputs • Improving tone/voice alignment across audiences
Boosters: • Change one knob per run; label diffs • Keep before/after exemplars • Stop iterating when gains flatten—try data/tooling instead
Caveats: Endless tinkering burns time—predefine a budget and exit criteria.`
  },
  {
    slug: "personalization-and-adaptation",
    term: "Personalization and Adaptation",
    aliases: ["adaptive prompting", "personalized prompting", "audience-aware prompting"],
    definition: `Tailor prompts to the person and the moment: reading level, tone, prior knowledge, domain norms, and channel. Adaptation keeps instructions relevant over time (e.g., updating context facts, shortening for mobile, or switching to checklists for experts).`,
    sources: [],
    categories: ["art of prompting", "ux", "communication"],
    tags: [
      "kind:strategy",
      "type:technique",
      "topic:human-ai",
      "phase:prompting",
      "use:audience-fit",
      "level:intermediate"
    ],
    related: ["collaboration-and-interdisciplinary-knowledge", "few-shot-examples", "facts-expertise-primer", "verbosity-control"],
    status: "verified",
    notes: `Use-cases: • Multiple audience versions of the same output • Accessibility-aware reformats • Localization and style transfer
Boosters: • Add “Audience:” and “Prior knowledge:” fields • Provide one gold sample per audience • Store user prefs and reuse them
Caveats: Personalization can leak bias—document defaults and provide opt-outs.`
  },
  {
    slug: "collaboration-and-interdisciplinary-knowledge",
    term: "Collaboration and Interdisciplinary Knowledge",
    aliases: ["interdisciplinary prompting", "cross-domain prompting", "HCI-informed prompting"],
    definition: `Borrow tools from linguistics, psychology, design, philosophy, and statistics to build richer prompts and better evaluations. Collaboration multiplies perspectives and catches blind spots early.`,
    sources: [],
    categories: ["art of prompting", "team process"],
    tags: [
      "kind:strategy",
      "type:principle",
      "topic:human-ai",
      "phase:ideation",
      "use:prompt-design",
      "level:intermediate"
    ],
    related: ["technical-knowledge", "personalization-and-adaptation", "rubric-approach", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Co-design workshops for assistant behaviors • Safety reviews with ethicists and domain experts • Usability tests that inform prompt changes
Boosters: • Write shared rubrics; agree on success signals • Use paired “writer/reviewer” roles • Circulate prompt change logs with rationale
Caveats: Committee design can stall—timebox and ship small improvements.`
  },
  {
    slug: "technical-knowledge",
    term: "Technical Knowledge",
    aliases: ["model know-how", "tokenization awareness", "embedding literacy"],
    definition: `Understanding models, tokenization, context windows, sampling, embeddings, and tool-calling so prompts align with the machinery. Technical literacy prevents accidental failure modes (e.g., truncation, invalid JSON, or missing tool arguments).`,
    sources: [],
    categories: ["art of prompting", "foundations"],
    tags: [
      "kind:term",
      "type:principle",
      "topic:llm",
      "phase:prompting",
      "use:reliability",
      "level:intermediate"
    ],
    related: ["experiential-knowledge", "prompt-architecture", "desired-format", "clarity-and-precision"],
    status: "verified",
    notes: `Use-cases: • Choosing context budgets and example counts • Designing tool schemas and validators • Setting temperature/top-p for stability vs. creativity
Boosters: • Add JSON schema + example payloads • Validate outputs automatically • Monitor truncation and retries
Caveats: Over-optimizing knobs can hide bigger issues like missing context or poor task framing.`
  },
  {
    slug: "experiential-knowledge",
    term: "Experiential Knowledge",
    aliases: ["practice wisdom", "prompting scars", "lived prompting experience"],
    definition: `Lessons from real projects—what actually worked, what failed, and why. Capturing and sharing this experience (with examples and counterexamples) accelerates team learning and improves prompt reuse.`,
    sources: [],
    categories: ["art of prompting", "skills", "knowledge management"],
    tags: [
      "kind:heuristic",
      "type:principle",
      "topic:human-ai",
      "phase:prompting",
      "use:prompt-reuse",
      "level:beginner"
    ],
    related: ["intuition", "technical-knowledge", "iterative-refinement", "prompt-template-engineering"],
    status: "verified",
    notes: `Use-cases: • Building a prompt pattern library • Postmortems on failures and regressions • Onboarding guides with do/don’t examples
Boosters: • Save “gold” and “near-miss” cases • Tag examples by domain and goal • Record why a change helped or hurt
Caveats: Anecdotes can mislead—pair stories with small eval sets.`
  },
  {
    slug: "strategic-thinking",
    term: "Strategic Thinking",
    aliases: ["prompt strategy", "goal-driven prompting", "outcome-first prompting"],
    definition: `Start with the outcome and constraints, then pick structures that maximize signal (roles, rubrics, examples, tools). Strategy ensures prompting choices serve goals—accuracy, tone, safety—rather than habit.`,
    sources: [],
    categories: ["art of prompting", "planning"],
    tags: [
      "kind:strategy",
      "type:principle",
      "topic:prompting",
      "phase:ideation",
      "use:decision-support",
      "level:intermediate"
    ],
    related: ["iterative-refinement", "clarity-and-precision", "scaffolding", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Selecting between CoT, rubric, or examples • Deciding when to split multi-step tasks • Allocating context budget where it matters
Boosters: • Write success criteria first • Choose one primary and one secondary objective • Add a fallback path for low confidence
Caveats: Strategy without measurement is theater—define metrics.`
  },

  // --- Types of Prompts ---
  {
    slug: "reductive-prompts",
    term: "Reductive Prompts",
    aliases: ["summarization prompts", "compression prompts", "condense prompts"],
    definition: `Prompts that compress content while preserving key meaning. Often specify target length, must-include entities, and forbidden omissions to keep summaries faithful and dense.`,
    sources: [],
    categories: ["types of prompts", "prompt patterns"],
    tags: [
      "kind:pattern",
      "type:prompt",
      "topic:reduction",
      "phase:prompting",
      "use:summarization",
      "level:beginner"
    ],
    related: ["extractive-prompting", "evaluation-prompting", "chain-of-density-cod", "desired-format"],
    status: "verified",
    notes: `Use-cases: • Executive briefs • Meeting minutes • TL;DR with entity guarantees
Boosters: • Set inclusion lists (names, numbers) • Specify target length + tolerance • Ask for a final accuracy check against source
Caveats: Extreme compression risks nuance—offer an expandable appendix.`
  },
  {
    slug: "transformative-prompts",
    term: "Transformative Prompts",
    aliases: ["rewriting prompts", "reframing prompts", "style transfer prompts"],
    definition: `Prompts that rephrase, translate, or reshape existing content—changing voice, structure, or audience while preserving intent. Great for tone fixes, format conversions, or accessibility.`,
    sources: [],
    categories: ["types of prompts", "prompt patterns"],
    tags: [
      "kind:pattern",
      "type:prompt",
      "topic:transformation",
      "phase:prompting",
      "use:rewriting",
      "level:beginner"
    ],
    related: ["expansion-prompting", "generative-prompts", "desired-format", "verbosity-control"],
    status: "verified",
    notes: `Use-cases: • Converting notes into a spec • Translating expert text for lay readers • Rewriting for brand voice
Boosters: • Provide a style guide snippet • Include one gold output as a target • Lock required sections with a schema
Caveats: Heavy style constraints can distort meaning—add a fidelity check.`
  },
  {
    slug: "generative-prompts",
    term: "Generative Prompts",
    aliases: ["greenfield prompts", "from-scratch prompts", "creative generation prompts"],
    definition: `Prompts that create new content (ideas, drafts, plans, images) from instructions and constraints. Power increases when paired with examples, rubrics, and retrieval/tools for grounding.`,
    sources: [],
    categories: ["types of prompts", "content creation"],
    tags: [
      "kind:pattern",
      "type:prompt",
      "topic:generative",
      "phase:prompting",
      "use:creation",
      "level:beginner"
    ],
    related: ["expansion-prompting", "evaluation-prompting", "few-shot-examples", "facts-expertise-primer"],
    status: "verified",
    notes: `Use-cases: • Idea generation • First-draft copy • Outlines and plans
Boosters: • Add constraints (audience, length, tone) • Provide one positive and one negative example • Use a rubric to score and iterate
Caveats: Fluency can mask errors—route claims through verification.`
  },
  {
    slug: "extractive-prompting",
    term: "Extractive Prompting",
    aliases: ["targeted extraction", "span extraction prompts"],
    definition: `A focused pattern that pulls specific items (entities, facts, fields) from longer text. Often paired with strict schemas for downstream parsing and audits.`,
    sources: [],
    categories: ["types of prompts", "information extraction"],
    tags: [
      "kind:pattern",
      "type:prompt",
      "topic:reduction",
      "phase:prompting",
      "use:information-extraction",
      "level:beginner"
    ],
    related: ["reductive-prompts", "transformative-prompts", "desired-format", "rubric-approach"],
    status: "verified",
    notes: `Use-cases: • Pulling totals, dates, names from reports • Contract clause extraction • Support ticket triage fields
Boosters: • Provide a JSON schema + example • Require “unknown” when absent • Add a confidence field per item
Caveats: Ambiguous spans need policy—define tie-breakers and “not found”.`
  },
  {
    slug: "evaluation-prompting",
    term: "Evaluation Prompting",
    aliases: ["critique prompting", "grading prompts", "rubric-led evaluation"],
    definition: `Prompts that assess content against criteria (clarity, accuracy, policy, tone) and produce scores or pass/fail. Useful for QA, moderation, and auto-review loops.`,
    sources: [],
    categories: ["types of prompts", "quality", "evaluation"],
    tags: [
      "kind:pattern",
      "type:prompt",
      "topic:evaluation",
      "phase:evaluation",
      "use:review",
      "level:intermediate"
    ],
    related: ["generative-prompts", "reductive-prompts", "rubric-approach", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Pre-ship QA checks • Moderation triage • A/B testing outcome scoring
Boosters: • Keep criteria observable and few • Calibrate with exemplars • Report rationales alongside scores
Caveats: Evaluators inherit model bias—spot-check with humans, refresh samples.`
  },
  {
    slug: "expansion-prompting",
    term: "Expansion Prompting",
    aliases: ["elaboration prompts", "detail expansion", "depth prompts"],
    definition: `Prompts that extend a seed with more detail, examples, or options—useful when breadth or depth is missing. Often specify scope, level, and number of additions.`,
    sources: [],
    categories: ["types of prompts", "content development"],
    tags: [
      "kind:pattern",
      "type:prompt",
      "topic:transformation",
      "phase:prompting",
      "use:elaboration",
      "level:beginner"
    ],
    related: ["generative-prompts", "transformative-prompts", "few-shot-examples"],
    status: "verified",
    notes: `Use-cases: • Turning bullets into paragraphs • Adding examples to docs • Generating alternatives or variants
Boosters: • Specify N items and acceptance criteria • Ask for edge cases and counterexamples • Gate with a short quality check
Caveats: Expansion can ramble—set length and relevance constraints.`
  },
  {
    slug: "discrete-prompts",
    term: "Discrete Prompts",
    aliases: ["hard prompts", "natural-language prompts", "handwritten prompts"],
    definition: `Human-readable prompt templates expressed in natural language tokens. Easy to author and review, portable across models, and auditable—but less fine-grained than learned vectors.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["types of prompts", "foundations"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:prompting",
      "phase:prompting",
      "use:authoring",
      "level:beginner"
    ],
    related: ["continuous-prompts", "prompt-template-engineering", "manual-template-engineering"],
    status: "verified",
    notes: `Use-cases: • Rapid prototyping • Policy-auditable instructions • Cross-model experiments
Boosters: • Keep sections labeled (Role/Task/Format) • Add minimal, crisp examples • Version templates and track diffs
Caveats: Can underperform in narrow tasks vs. learned soft prompts—compensate with examples and structure.`
  },
  {
    slug: "continuous-prompts",
    term: "Continuous Prompts",
    aliases: ["soft prompts", "learned prompts", "prompt tuning vectors"],
    definition: `Prompt representations learned directly in embedding space (vectors) instead of natural language. They can be optimized to steer a model efficiently, often with small parameter budgets; great for stable, high-volume tasks.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["types of prompts", "training & tuning"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:embedding",
      "phase:training",
      "use:optimization",
      "level:advanced"
    ],
    related: ["discrete-prompts", "automated-template-learning", "prompt-template-engineering"],
    status: "verified",
    notes: `Use-cases: • High-scale, repeatable tasks • Latency/cost-sensitive pipelines • Domains where natural language prompts plateau
Boosters: • Hold out eval sets to avoid overfitting • Combine with lightweight adapters or LoRA when needed • Monitor drift across model updates
Caveats: Opaque to non-experts and harder to audit—pair with documentation and guardrails.`
  }
);


GLOSSARY.push(
  // --- Multi-prompt Strategies ---
  {
    slug: "sequential-linear-prompting",
    term: "Sequential (Linear) Prompting",
    aliases: ["linear prompting", "chained prompting", "stepwise prompting"],
    definition: `A choreography of prompts where each message depends on the last. You decompose a task, pass forward key outputs (facts, decisions, JSON), and progressively refine until done. This reduces cognitive load per step and makes failures easier to isolate and fix.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies", "orchestration"],
    tags: [
      "kind:strategy",
      "type:method",
      "topic:prompting",
      "topic:orchestration",
      "phase:prompting",
      "use:multi-step",
      "level:beginner"
    ],
    related: ["parallel-prompting", "multi-step-interactions", "output-layering", "prompt-decomposition", "scaffolding"],
    status: "verified",
    notes: `Use-cases: • Break complex workflows into reliable stages • Move from research → outline → draft → polish • Tool-using agents that alternate plan/execute
Boosters: • Pass small, typed artifacts (IDs, lists, JSON) between steps • Add a mini “done/next” checklist each hop • Log intermediate context for auditability
Caveats: Over-long chains risk drift; cap hop count and add verification gates.`
  },
  {
    slug: "parallel-prompting",
    term: "Parallel Prompting",
    aliases: ["concurrent prompting", "fan-out prompting", "batch prompting"],
    definition: `Run several prompts at once—same task with different styles, or different sub-tasks on the same input—and compare results. Parallelism increases exploration speed and provides natural ensembling options.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies", "orchestration"],
    tags: [
      "kind:strategy",
      "type:workflow",
      "topic:prompting",
      "topic:search",
      "phase:prompting",
      "use:divergence",
      "level:intermediate"
    ],
    related: ["sequential-linear-prompting", "shotgun-generation", "prompt-ensembling", "multi-step-interactions"],
    status: "verified",
    notes: `Use-cases: • Creative ideation across tones • Generating N variants for selection • Splitting a document into shards for speed
Boosters: • Fix a selection rubric ahead of time • Tag each branch with parameters used • Merge with a judge/selector prompt
Caveats: Costs scale with fan-out; set a hard cap and early-stop rules.`
  },
  {
    slug: "conditional-prompting",
    term: "Conditional Prompting",
    aliases: ["branching prompts", "rule-based prompting", "guarded prompting"],
    definition: `Trigger different prompts only when predicates are met (schema present, confidence low, red-flag terms found, user segment = X). Think “if-then-else” for conversations, tools, and safety flows.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies", "governance"],
    tags: [
      "kind:strategy",
      "type:method",
      "topic:prompting",
      "topic:control",
      "phase:prompting",
      "use:risk-mitigation",
      "level:intermediate"
    ],
    related: ["constraint-prompting", "contextual-adjustment", "meta-prompting", "fallback-pattern", "rubric-approach"],
    status: "verified",
    notes: `Use-cases: • Escalate to verification when confidence < threshold • Swap personas by audience • Invoke tool use only when fields are missing
Boosters: • Centralize conditions as explicit rules • Log which branch fires and why • Add a default safe fallback path
Caveats: Branch explosions get messy—review predicates quarterly.`
  },
  {
    slug: "contextual-prompting",
    term: "Contextual Prompting",
    aliases: ["priming", "context seeding", "context injection"],
    definition: `Send a short, dedicated context (facts, constraints, audience, style) before the main request to anchor interpretation. This improves relevance, reduces hallucinations, and standardizes tone.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies", "grounding"],
    tags: [
      "kind:pattern",
      "type:technique",
      "topic:context",
      "phase:prompting",
      "use:grounding",
      "level:beginner"
    ],
    related: ["priming-prompt", "domain-priming", "facts-expertise-primer", "desired-format", "clarity-and-precision"],
    status: "verified",
    notes: `Use-cases: • Domain briefs before tasks • Providing policy snippets • Establishing audience and tone
Boosters: • Keep context < 10 lines, labeled • Date volatile facts • Include 1 “anti-example” to avoid common traps
Caveats: Too much context dilutes signal—prefer crisp bullets over essays.`
  },
  {
    slug: "constraint-prompting",
    term: "Constraint Prompting",
    aliases: ["rules-first prompting", "guardrailed prompting"],
    definition: `State explicit boundaries (formats, do/don’t lists, policies, budgets). Constraints shrink the search space so outputs are consistent and compliant—especially for API-bound or regulated tasks.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies", "governance", "quality"],
    tags: [
      "kind:pattern",
      "type:technique",
      "topic:constraints",
      "phase:prompting",
      "use:compliance",
      "level:beginner"
    ],
    related: ["constraint-based-prompting", "prompt-composition", "rubric-approach", "desired-format"],
    status: "verified",
    notes: `Use-cases: • Valid JSON/CSV generation • Safety-aligned responses • Brand/style enforcement
Boosters: • Put constraints near the ask • Use schemas with examples • Add a final self-check checklist
Caveats: Over-constraining can harm creativity—separate “musts” from “nice-to-haves”.`
  },
  {
    slug: "multi-shot-strategies",
    term: "Multi-shot Prompting",
    aliases: ["multi-input strategies", "few-shot chaining", "shot-stacking"],
    definition: `Use several inputs across turns: seed with examples, then chain outputs into subsequent prompts. This combines the anchoring power of examples with the control of stepwise execution.`,
    sources: [],
    categories: ["multi-prompt strategies", "learning-from-examples"],
    tags: [
      "kind:strategy",
      "type:method",
      "topic:prompting",
      "phase:prompting",
      "use:chaining",
      "level:intermediate"
    ],
    related: ["sequential-linear-prompting", "few-shot-examples", "output-layering", "prompt-composition"],
    status: "verified",
    notes: `Use-cases: • Train format/style then apply to new data • Progressive drafting with example-guided revisions • Multi-turn tutoring flows
Boosters: • Keep examples short and diverse • Swap examples per audience • Cache good shots for reuse
Caveats: Context windows fill fast—rotate or compress examples as you go.`
  },
  {
    slug: "output-layering",
    term: "Output Layering",
    aliases: ["progressive refinement", "layered drafting"],
    definition: `Build a result in layers: outline → rough draft → detailed draft → polish → QA. Each layer has its own micro-rubric and acceptance criteria. Great for long-form or high-stakes outputs.`,
    sources: [],
    categories: ["multi-prompt strategies", "quality"],
    tags: [
      "kind:pattern",
      "type:technique",
      "topic:prompting",
      "phase:prompting",
      "use:refinement",
      "level:intermediate"
    ],
    related: ["sequential-linear-prompting", "multi-step-interactions", "rubric-approach", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Reports, proposals, legal-style drafts • Code scaffolding then test writing • Lesson plans from outline to materials
Boosters: • Freeze each approved layer • Add a short checklist per layer • Automate diff-based reviews
Caveats: Too many layers add latency—pick the few that change quality.`
  },
  {
    slug: "shotgun-generation",
    term: "Shotgun Generation",
    aliases: ["generate-and-select", "wide search prompting"],
    definition: `Fire off many diverse variants at once (different seeds, temperatures, styles), then choose the best via rubric or a separate “judge” model. Useful when quality is spiky and exploration pays off.`,
    sources: [],
    categories: ["multi-prompt strategies", "search"],
    tags: [
      "kind:strategy",
      "type:workflow",
      "topic:prompting",
      "phase:prompting",
      "use:divergence",
      "level:intermediate"
    ],
    related: ["parallel-prompting", "prompt-ensembling", "evaluation-prompting", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Taglines, subject lines, UI microcopy • Creative brainstorming • Multiple SQL query candidates
Boosters: • Fix N and sampling params • Score with a simple, observable rubric • Keep the top K and archive near-misses
Caveats: Watch cost and bias toward flashy but wrong—include accuracy checks.`
  },
  {
    slug: "infinite-generation",
    term: "Infinite Generation",
    aliases: ["templatized prompting", "reusable prompt set", "prompt pipeline"],
    definition: `Design a stable prompt or pipeline that works across many inputs without editing. You parameterize fields (audience, length, schema) and feed new data indefinitely—a production-ready pattern.`,
    sources: [
      { title: "arXiv 2302.11382", url: "https://arxiv.org/abs/2302.11382" }
    ],
    categories: ["multi-prompt strategies", "productionization"],
    tags: [
      "kind:strategy",
      "type:framework",
      "topic:prompting",
      "phase:prompting",
      "use:scaling",
      "level:advanced"
    ],
    related: ["shotgun-generation", "prompt-template-engineering", "manual-template-engineering", "automated-template-learning"],
    status: "verified",
    notes: `Use-cases: • Ongoing newsletters/reports • Batch doc summarization • Programmatic SEO content with guardrails
Boosters: • Lock schemas and validations • Version prompts and track drift • Add canary tests before full runs
Caveats: Domain shifts break “infinite” patterns—schedule periodic re-tuning.`
  },
  {
    slug: "multi-step-interactions",
    term: "Multi-step Interactions",
    aliases: ["multi-turn orchestration", "dialog workflows"],
    definition: `Back-and-forth exchanges where each turn advances the task (ask → clarify → propose → revise). This mirrors real collaboration and allows clarifying questions and course-corrections.`,
    sources: [],
    categories: ["multi-prompt strategies", "conversation"],
    tags: [
      "kind:strategy",
      "type:method",
      "topic:conversation",
      "phase:prompting",
      "use:collaboration",
      "level:beginner"
    ],
    related: ["sequential-linear-prompting", "output-layering", "contextual-prompting", "fallback-pattern"],
    status: "verified",
    notes: `Use-cases: • Requirements elicitation • Coaching and tutoring • Code review and refactor sessions
Boosters: • Limit each turn to one goal • Summarize state every 2–3 turns • Capture “open questions” explicitly
Caveats: Wandering is common—pin a shared goal and stop when criteria met.`
  },

  // --- Meta-Prompt, Multi-input, Fine-tuning Strategies ---
  {
    slug: "self-discover-framework",
    term: "Self-discover Framework",
    aliases: ["SELF-DISCOVER", "self discover framework", "self-discover prompting"],
    definition: `Let the model choose *how* to think before it thinks: SELECT useful reasoning modules, ADAPT them to the task, and IMPLEMENT a plan. This meta-step often improves reliability on complex problems by fitting the reasoning style to the instance.`,
    sources: [
      { title: "arXiv 2402.03620", url: "https://arxiv.org/abs/2402.03620" }
    ],
    categories: ["meta-prompt strategies", "reasoning"],
    tags: [
      "kind:framework",
      "type:method",
      "topic:meta",
      "phase:prompting",
      "use:reasoning",
      "level:advanced"
    ],
    related: ["meta-prompting", "prompt-ensembling", "prompt-decomposition", "graph-of-thought-got"],
    status: "verified",
    notes: `Use-cases: • Hard math/logic problems • Multi-constraint planning • Choosing between CoT/GoT/AoT styles
Boosters: • Ask for a brief “reasoning plan” before solving • Cap meta-tokens to control cost • Save successful plans for reuse
Caveats: Meta-deliberation adds latency—use only when task complexity warrants.`
  },
  {
    slug: "domain-specific-language-creation",
    term: "Domain-Specific Language (DSL) Creation",
    aliases: ["dsl creation", "ad-hoc DSL prompting", "mini-language prompting"],
    definition: `Have the model define a compact vocabulary and syntax for a domain (slots, commands, tags), then use it to think and output consistently. DSLs reduce ambiguity and enable deterministic post-processing.`,
    sources: [
      { title: "arXiv 2303.07839", url: "https://arxiv.org/abs/2303.07839" }
    ],
    categories: ["meta-prompt strategies", "formalization"],
    tags: [
      "kind:strategy",
      "type:method",
      "topic:meta",
      "phase:training",
      "use:structure",
      "level:advanced"
    ],
    related: ["few-shot-code-example-generation", "prompt-composition", "desired-format"],
    status: "verified",
    notes: `Use-cases: • Test case specs • Incident taxonomies • Marketing brief schemas
Boosters: • Define grammar + examples • Provide a validator • Map DSL → JSON for pipelines
Caveats: Too-clever DSLs confuse collaborators—keep human-readable.`
  },
  {
    slug: "few-shot-code-example-generation",
    term: "Few-shot Code Example Generation",
    aliases: ["teaching by examples", "API demo prompting"],
    definition: `Create small, high-signal code snippets (API calls, IO samples) that demonstrate correct usage. The model copies patterns and slot-fills reliably, cutting errors and format drift.`,
    sources: [
      { title: "arXiv 2303.07839", url: "https://arxiv.org/abs/2303.07839" }
    ],
    categories: ["meta-prompt strategies", "learning-from-examples"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:code",
      "phase:training",
      "use:priming",
      "level:beginner"
    ],
    related: ["domain-specific-language-creation", "few-shot-examples", "prompt-template-engineering"],
    status: "verified",
    notes: `Use-cases: • Tool/Function calling • SDK quickstarts • Structured extraction demos
Boosters: • Prefer minimal compilable examples • Show 1 success + 1 “don’t” • Label inputs/outputs explicitly
Caveats: Overlong examples eat context—keep tight and scoped.`
  },
  {
    slug: "prompt-ensembling",
    term: "Prompt Ensembling",
    aliases: ["multi-prompt voting", "mixture-of-prompts"],
    definition: `Combine outputs from multiple prompts—vote, average, or use a judge model—to boost robustness. Works like model ensembling but at the instruction level.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies", "evaluation"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:ensemble",
      "phase:training",
      "use:robustness",
      "level:intermediate"
    ],
    related: ["prompt-augmentation", "shotgun-generation", "evaluation-prompting", "raccca-framework"],
    status: "verified",
    notes: `Use-cases: • Fact checking via agreement • Style control by weighted votes • Safety screening with multiple perspectives
Boosters: • Keep prompts diverse • Use a simple, observable judge rubric • Track tie-breaker rules
Caveats: Can amplify shared biases—mix truly different prompts.`
  },
  {
    slug: "prompt-augmentation",
    term: "Prompt Augmentation",
    aliases: ["demonstration learning", "answer-conditioned prompting"],
    definition: `Attach small, solved examples (Q→A) or partial solutions to the prompt so the model imitates desirable behavior. Especially effective for format fidelity and tricky edge cases.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies", "learning-from-examples"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:prompting",
      "phase:training",
      "use:alignment",
      "level:beginner"
    ],
    related: ["prompt-ensembling", "prompt-composition", "few-shot-examples"],
    status: "verified",
    notes: `Use-cases: • Enforcing schema/format • Teaching tone/voice • Guarding against specific mistakes
Boosters: • Curate few, high-signal examples • Rotate stale examples • Mark why each demo is “gold”
Caveats: Examples can overfit—refresh and diversify routinely.`
  },
  {
    slug: "prompt-composition",
    term: "Prompt Composition",
    aliases: ["composed prompts", "modular prompts"],
    definition: `Assemble a complex prompt from labeled sub-prompts (Role, Goals, Constraints, Examples, Format, Checks). Modularity improves reuse, testing, and version control.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies", "architecture"],
    tags: [
      "kind:framework",
      "type:template",
      "topic:prompting",
      "phase:prompting",
      "use:prompt-design",
      "level:beginner"
    ],
    related: ["prompt-decomposition", "rtf-framework", "risen-framework", "prompt-architecture"],
    status: "verified",
    notes: `Use-cases: • Product-wide prompt systems • Compliance-heavy outputs • A/B testing prompt sections
Boosters: • Keep sections short • Version each section • Validate with small eval sets
Caveats: Duped rules across sections conflict—dedupe and centralize.`
  },
  {
    slug: "prompt-decomposition",
    term: "Prompt Decomposition",
    aliases: ["split-and-solve prompts", "task decomposition prompting"],
    definition: `Break a hard ask into simpler sub-prompts (collect facts, decide criteria, generate, verify). Improves control and enables parallelization.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies", "architecture"],
    tags: [
      "kind:pattern",
      "type:technique",
      "topic:prompting",
      "phase:prompting",
      "use:problem-solving",
      "level:intermediate"
    ],
    related: ["prompt-composition", "scaffolding", "sequential-linear-prompting", "contextual-prompting"],
    status: "verified",
    notes: `Use-cases: • Research → synthesis → summary • Code plan → implement → test • Policy draft → critique → revise
Boosters: • Define interfaces between steps • Add success criteria per sub-task • Log artifacts for reuse
Caveats: Too many parts = overhead—merge low-value steps.`
  },
  {
    slug: "meta-prompting",
    term: "Meta-Prompting",
    aliases: ["prompt about prompting", "reasoning-style selection"],
    definition: `Tell the model about reasoning options, benchmarks, or failure modes so it can pick a fitting strategy (e.g., “choose CoT vs. outline-first, explain choice”). Makes the process explicit and improvable.`,
    sources: [],
    categories: ["meta-prompt strategies", "reasoning"],
    tags: [
      "kind:strategy",
      "type:method",
      "topic:meta",
      "phase:prompting",
      "use:reasoning",
      "level:advanced"
    ],
    related: ["self-discover-framework", "contextual-adjustment", "graph-of-thought-got", "chain-of-thought-cot"],
    status: "verified",
    notes: `Use-cases: • Hard reasoning tasks • Choosing search vs. recall • Balancing speed vs. accuracy
Boosters: • Ask for a brief strategy note • Limit meta length • Cache effective strategies
Caveats: Meta chatter can bloat tokens—enforce a short plan.`
  },
  {
    slug: "contextual-adjustment",
    term: "Contextual Adjustment",
    aliases: ["on-the-fly tuning", "context refreshing"],
    definition: `Modify instructions when context changes (new constraints, user goals, data recency). Keeps responses aligned to reality instead of a stale initial brief.`,
    sources: [],
    categories: ["meta-prompt strategies", "grounding"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:context",
      "phase:prompting",
      "use:adaptation",
      "level:beginner"
    ],
    related: ["meta-prompting", "contextual-prompting", "facts-expertise-primer", "verbosity-control"],
    status: "verified",
    notes: `Use-cases: • Live data updates • Role or audience switch mid-session • Policy change incorporation
Boosters: • Summarize deltas explicitly • Reconfirm goals after big shifts • Re-run critical checks post-adjust
Caveats: Frequent shifts cause thrash—batch updates when possible.`
  },
  {
    slug: "bias-mitigation",
    term: "Bias Mitigation or Awareness",
    aliases: ["bias awareness", "fairness prompting", "bias checks"],
    definition: `Embed fairness checks and prompts that surface sensitive attributes, request counterfactuals, or apply rubrics to reduce disparate errors. Awareness + mitigation reduces harm and increases trust.`,
    sources: [],
    categories: ["meta-prompt strategies", "safety"],
    tags: [
      "kind:strategy",
      "type:template",
      "topic:safety",
      "phase:evaluation",
      "use:fairness",
      "level:intermediate"
    ],
    related: ["addressing-biases-and-ethical-concerns", "rubric-approach", "calibrated-confidence-prompting-ccp"],
    status: "verified",
    notes: `Use-cases: • Hiring/credit summaries with bias flags • Counterfactual prompts (“if the name changed…”) • Balanced dataset sampling checks
Boosters: • Add explicit protected-attribute guidance • Log flagged cases for review • Use diverse exemplars
Caveats: Prompts can’t fix biased data alone—pair with dataset and policy work.`
  },
  {
    slug: "prompt-modification",
    term: "Prompt Modification or Poly-Prompting",
    aliases: ["poly-prompting", "pre-flight rewriting", "prompt rewriting"],
    definition: `Rewrite or augment a user’s prompt (for inclusivity, safety, clarity) before sending to the model. Think spell-check + bias-check + schema-fit pass ahead of generation.`,
    sources: [],
    categories: ["meta-prompt strategies", "governance"],
    tags: [
      "kind:strategy",
      "type:method",
      "topic:prompting",
      "phase:prompting",
      "use:normalization",
      "level:intermediate"
    ],
    related: ["bias-mitigation", "contextual-adjustment", "desired-format", "clarity-and-precision"],
    status: "verified",
    notes: `Use-cases: • Normalizing free-text into schemas • Softening exclusionary language • Expanding underspecified asks
Boosters: • Keep an audit trail of changes • Ask consent for meaning-altering edits • Provide before/after previews
Caveats: Over-editing harms intent—prefer minimally invasive rewrites.`
  },
  {
    slug: "temperature-topk-sampling",
    term: "Temperature and Top-k Sampling",
    aliases: ["decoding controls", "sampling parameters"],
    definition: `Tune output diversity and determinism. Temperature controls randomness; top-k limits choices to the k most probable tokens. Together they shape creativity vs. stability for a task.`,
    sources: [],
    categories: ["meta-prompt strategies", "decoding"],
    tags: [
      "kind:technique",
      "type:parameter",
      "topic:training",
      "phase:prompting",
      "use:variance-control",
      "level:beginner"
    ],
    related: ["shotgun-generation", "prompt-ensembling", "verbosity-control"],
    status: "verified",
    notes: `Use-cases: • Creative writing (higher temp) • Deterministic APIs (lower temp, small top-k) • Generating alternatives quickly
Boosters: • Record params with outputs • Use small grids to find sweet spots • Pair with a judge/QA for quality
Caveats: Extreme settings cause babble (too high) or dullness (too low)—tune per task.`
  },
  {
    slug: "rat-retrieval-augmented-thoughts",
    term: "RAT (Retrieval Augmented Thoughts)",
    aliases: ["retrieval-augmented chain-of-thought", "RAG + CoT"],
    definition: `Fuse retrieval with reasoning: at each step, fetch evidence and let the chain-of-thought cite it. This keeps intermediate steps grounded and reduces error propagation.`,
    sources: [],
    categories: ["meta-prompt strategies", "grounding", "reasoning"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:rag",
      "topic:reasoning",
      "phase:prompting",
      "use:grounded-reasoning",
      "level:advanced"
    ],
    related: ["reflection-or-reasoning-prompting", "system-query", "chain-of-verification", "agentic-rag"],
    status: "verified",
    notes: `Use-cases: • Research with citations • Financial or legal analyses • Complex Q&A requiring sources
Boosters: • Limit retrieval per step • De-duplicate evidence • Add a final citation check pass
Caveats: Retrieval noise derails chains—tune queries and add quality filters.`
  },

  // --- Challenges and Opportunities ---
  {
    slug: "addressing-biases-and-ethical-concerns",
    term: "Addressing Biases and Ethical Concerns",
    aliases: ["ethical prompting", "fairness & safety"],
    definition: `Identify, surface, and mitigate biased or harmful behavior across the prompt pipeline. Pair prompts with policies, audits, and human review to reduce disparate impact and build trust.`,
    sources: [],
    categories: ["challenges and opportunities", "safety"],
    tags: [
      "kind:task",
      "type:challenge",
      "topic:safety",
      "phase:evaluation",
      "use:governance",
      "level:intermediate"
    ],
    related: ["bias-mitigation", "rubric-approach", "raccca-framework", "content-moderation"],
    status: "verified",
    notes: `Use-cases: • Pre-launch risk reviews • Ongoing bias monitoring • Incident response and remediation
Boosters: • Define measurable fairness metrics • Maintain red-team playbooks • Document decisions and trade-offs
Caveats: This is socio-technical—tools help, but humans and policy are essential.`
  },
  {
    slug: "handling-specialized-domains",
    term: "Handling Specialized Domains",
    aliases: ["domain-aware prompting", "expert-domain prompting"],
    definition: `Adapt prompts for high-stakes fields (law, medicine, finance). Involve experts, ground with authoritative sources, and constrain outputs to safe, auditable formats.`,
    sources: [],
    categories: ["challenges and opportunities", "domain adaptation"],
    tags: [
      "kind:task",
      "type:challenge",
      "topic:domain",
      "phase:prompting",
      "use:accuracy",
      "level:advanced"
    ],
    related: ["domain-priming", "fact-check-prompting", "chain-of-verification", "rat-retrieval-augmented-thoughts"],
    status: "verified",
    notes: `Use-cases: • Clinical guideline summaries • Contract clause extraction • Risk disclosures with citations
Boosters: • Cite sources inline • Use schemas and disclaimers • Add confidence and uncertainty notes
Caveats: Don’t replace professional judgment—clearly label limitations.`
  },
  {
    slug: "adapting-to-evolving-ai-capabilities",
    term: "Adapting to Evolving AI Capabilities",
    aliases: ["prompt maintenance", "prompt drift management"],
    definition: `As models, tools, and policies change, refresh prompts, examples, and evaluations so performance doesn’t silently degrade. Treat prompts like living code.`,
    sources: [],
    categories: ["challenges and opportunities", "operations"],
    tags: [
      "kind:task",
      "type:challenge",
      "topic:prompting",
      "phase:prompting",
      "use:maintenance",
      "level:intermediate"
    ],
    related: ["infinite-generation", "prompt-template-engineering", "raccca-framework", "evaluation-prompting"],
    status: "verified",
    notes: `Use-cases: • Post-model-update regression checks • Rotating example sets • Refreshing style guides and policies
Boosters: • Add smoke tests and canaries • Track metrics across versions • Keep a rollback path
Caveats: Silent regressions happen—schedule periodic audits even when users are happy.`
  }
);


GLOSSARY.push(
  // --- Conversational Design ---
  {
    slug: "conversational-design",
    term: "Conversational Design",
    aliases: ["conversation design", "dialogue design", "CX conversation design"],
    definition: `The end-to-end practice of shaping natural, goal-directed conversations between people and systems. It covers how turns flow, how intent and context are captured, what language and tone are used, and how errors, confirmations, and handoffs are handled—so interactions feel human, helpful, and efficient.`,
    sources: [
      { title: "Google: Intro to Conversational Design (YouTube #1)", url: "https://www.youtube.com/watch?v=OV3qmkVuLxk" },
      { title: "Google: Conversational Design (YouTube #2)", url: "https://www.youtube.com/watch?v=vafh50qmWMM" }
    ],
    categories: ["conversational design", "ux", "linguistics"],
    tags: [
      "kind:strategy",
      "type:discipline",
      "topic:human-ai",
      "topic:conversation",
      "phase:ideation",
      "use:dialog-flow",
      "level:intermediate"
    ],
    related: ["interaction-flows","conversational-ui","voice-user-interface-vui","brand-persona","inclusivity-in-conversation-design","ai-human-technical-communication","cooperative-principle"],
    status: "verified",
    notes: `Use-cases: • Design a task flow for booking, support, or onboarding • Reduce drop-offs by clarifying next actions • Standardize tone and safety across channels
Boosters: Define success metrics per turn (task completion, latency, satisfaction). Maintain a language guide (voice, tone, escalation rules). Prototype with sample dialogues before building.
Caveats: Over-scripted flows can feel rigid—balance guardrails with free text recovery.`
  },
  {
    slug: "socio-linguistics",
    term: "Socio-linguistics",
    aliases: ["sociolinguistics", "social linguistics"],
    definition: `The study of how language varies with social context—region, class, culture, gender, age—and how those variables shape interpretation and trust. In conversation design it informs dialect support, register, politeness strategies, and equity.`,
    sources: [],
    categories: ["conversational design", "linguistics"],
    tags: [
      "kind:term",
      "type:foundation",
      "topic:linguistics",
      "phase:ideation",
      "use:audience-fit",
      "level:intermediate"
    ],
    related: ["linguistic-diversity","linguistic-bias","inclusivity-in-conversation-design","brand-persona"],
    status: "verified",
    notes: `Use-cases: • Choose register and politeness norms for a locale • Audit prompts for dialect bias • Localize examples and error messages
Boosters: Co-design with target users; include vernacular examples; avoid prescriptive grammar policing.
Caveats: Over-generalizing cultural traits leads to stereotypes—validate with real users.`
  },
  {
    slug: "conversational-repair",
    term: "Conversational Repair",
    aliases: ["repair strategies", "misunderstanding recovery", "dialog recovery"],
    definition: `Design patterns that detect misunderstanding or ambiguity and steer back to shared meaning. Includes clarifying questions, rephrasing, explicit confirmations, and graceful handoffs when confidence is low.`,
    sources: [],
    categories: ["conversational design", "quality"],
    tags: [
      "kind:pattern",
      "type:technique",
      "topic:conversation",
      "phase:debugging",
      "use:error-recovery",
      "level:beginner"
    ],
    related: ["ambiguity-reduction","escalated-errors","turn-taking","conversational-ui","maxim-of-relevance"],
    status: "verified",
    notes: `Use-cases: • Low ASR/NLU confidence repair • Disambiguate multi-intent utterances • Recover after off-topic inputs
Boosters: Set confidence thresholds; prefer single, specific clarifiers; summarize what’s known before asking.
Caveats: Too many clarifiers feel like interrogation—cap retries and escalate.`
  },
  {
    slug: "conversational-ui",
    term: "Conversational UI",
    aliases: ["chat UI", "voice UI surfaces", "dialog UI"],
    definition: `The visual and interaction surfaces that scaffold conversation—message bubbles, chips, forms, confirmations, system hints, error states, and accessibility affordances—so users see what the system heard, can correct it, and know what to do next.`,
    sources: [],
    categories: ["conversational design", "ui"],
    tags: [
      "kind:pattern",
      "type:ui",
      "topic:design",
      "phase:implementation",
      "use:affordance",
      "level:beginner"
    ],
    related: ["voice-user-interface-vui","smart-display","interaction-flows","conversational-actions"],
    status: "verified",
    notes: `Use-cases: • Show NLU parse for confirmation • Provide quick-reply chips for common intents • Visualize multi-turn progress
Boosters: Mirror conversational state (heard/understood/next). Add inline “fix it” controls. Respect accessibility (contrast, screen readers).
Caveats: Overloading UI with controls can distract from natural language.`
  },
  {
    slug: "linguistic-diversity",
    term: "Linguistic Diversity",
    aliases: ["language diversity", "dialect inclusion"],
    definition: `Designing for multiple languages, dialects, registers, and vernaculars so systems recognize and respond inclusively—not just “standard” forms.`,
    sources: [],
    categories: ["conversational design", "inclusion"],
    tags: [
      "kind:strategy",
      "type:principle",
      "topic:inclusion",
      "phase:ideation",
      "use:localization",
      "level:intermediate"
    ],
    related: ["socio-linguistics","inclusivity-in-conversation-design","linguistic-bias","brand-persona"],
    status: "verified",
    notes: `Use-cases: • Add dialect examples to training • Offer language choice with plain labels • Tune polite forms per culture
Boosters: Include varied names, dates, honorifics. Test with code-switching. Provide fallback to human agent where appropriate.
Caveats: Partial support can backfire—set expectations clearly.`
  },
  {
    slug: "interaction-flows",
    term: "Interaction Flows",
    aliases: ["dialogue flows", "conversation maps", "flowcharts"],
    definition: `The planned sequence of turns that guide users from entry to goal, including prompts, validations, side paths, and exits. Good flows anticipate detours and bake in repair and escalation.`,
    sources: [],
    categories: ["conversational design", "orchestration"],
    tags: [
      "kind:framework",
      "type:artifact",
      "topic:conversation",
      "phase:design",
      "use:task-completion",
      "level:beginner"
    ],
    related: ["turn-taking","conversational-design","sample-dialogue","interaction-model","conversational-repair"],
    status: "verified",
    notes: `Use-cases: • Map intents/entities to journeys • Design handoffs to tools/humans • Visualize confirmations and summaries
Boosters: Keep flows shallow; add guardrails for loops; annotate with success metrics.
Caveats: Real speech is messy—flows must allow out-of-band jumps.`
  },
  {
    slug: "discourse-markers",
    term: "Discourse Markers",
    aliases: ["connectives", "cue phrases", "discourse cues"],
    definition: `Small words/phrases (e.g., “so,” “well,” “anyway”) that structure discourse, signal topic shifts, hedge claims, or manage turn transitions. Used thoughtfully, they make AI tone feel less robotic without adding fluff.`,
    sources: [],
    categories: ["conversational design", "linguistics"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:linguistics",
      "phase:ideation",
      "use:tone",
      "level:beginner"
    ],
    related: ["pauses","turn-taking","brand-persona","ambiguity-of-language"],
    status: "verified",
    notes: `Use-cases: • Smooth topic transitions • Signal uncertainty before asking a clarifier • Reduce bluntness in refusals
Boosters: Use sparingly; prefer short, plain cues; align with brand voice.
Caveats: Overuse reads as filler—prioritize clarity over chit-chat.`
  },
  {
    slug: "brand-persona",
    term: "Brand Persona",
    aliases: ["voice & tone", "brand voice", "system persona"],
    definition: `A consistent voice/tone and set of linguistic choices that reflect brand values across channels. Defines how the agent greets, hedges, apologizes, and celebrates—without breaking clarity or safety.`,
    sources: [],
    categories: ["conversational design", "content design"],
    tags: [
      "kind:strategy",
      "type:principle",
      "topic:style",
      "phase:design",
      "use:consistency",
      "level:beginner"
    ],
    related: ["conversational-design","inclusivity-in-conversation-design","discourse-markers","cooperative-principle"],
    status: "verified",
    notes: `Use-cases: • Style guides for responses • Calibration prompts and examples • Consistent escalation language
Boosters: Provide do/don’t lists and exemplar snippets. Include “hard lines” (never do) to protect safety.
Caveats: Persona cannot override compliance—safety first, style second.`
  },
  {
    slug: "action-driven-conversations",
    term: "Action-Driven Conversations",
    aliases: ["goal-oriented dialogue", "task-oriented conversation"],
    definition: `Conversations structured explicitly around user goals and the actions that accomplish them—collect inputs, confirm details, execute steps, and summarize results.`,
    sources: [],
    categories: ["conversational design", "task design"],
    tags: [
      "kind:strategy",
      "type:principle",
      "topic:conversation",
      "phase:design",
      "use:task-completion",
      "level:beginner"
    ],
    related: ["interaction-flows","intent","conversational-actions","conversational-ui"],
    status: "verified",
    notes: `Use-cases: • Book/Buy/Build flows • Support troubleshooting • Form-filling by conversation
Boosters: Write success criteria per task. Use confirmations with short paraphrases. Provide receipts/summaries.
Caveats: Don’t bury actions under small talk—make the next step obvious.`
  },
  {
    slug: "linguistic-bias",
    term: "Linguistic Bias",
    aliases: ["language bias", "dialect bias"],
    definition: `The preferential treatment of certain language forms (e.g., “standard” dialects) over others, which can marginalize users and skew intent detection. Designers should detect, mitigate, and monitor such bias.`,
    sources: [],
    categories: ["conversational design", "safety"],
    tags: [
      "kind:term",
      "type:risk",
      "topic:safety",
      "phase:evaluation",
      "use:fairness",
      "level:intermediate"
    ],
    related: ["inclusivity-in-conversation-design","socio-linguistics","bias-mitigation","linguistic-diversity"],
    status: "verified",
    notes: `Use-cases: • Audit training data/regex for exclusion • Add dialectal synonyms/entities • Calibrate ASR for accents
Boosters: Collect representative utterances; measure performance by subgroup; add counterfactual evaluations.
Caveats: Eliminating bias requires policy + data + design—prompts alone aren’t enough.`
  },
  {
    slug: "turn-taking",
    term: "Turn-Taking",
    aliases: ["turn management", "turn coordination"],
    definition: `The rhythm of who speaks when: detecting end-of-turn, managing interruptions, allowing barge-in, and signaling when the system is “listening” or “thinking.” Crucial for natural pacing and reduced overlap.`,
    sources: [],
    categories: ["conversational design", "interaction"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:conversation",
      "phase:design",
      "use:pacing",
      "level:intermediate"
    ],
    related: ["interaction-flows","pauses","conversational-ui","voice-user-interface-vui"],
    status: "verified",
    notes: `Use-cases: • Voice barge-in and duplex modes • Multi-party meeting assistants • Rapid Q&A kiosks
Boosters: Visual/aural cues (“listening…”, typing indicator). Tune end-pointer thresholds by context.
Caveats: Aggressive end-pointing truncates users; conservative settings feel laggy—test with real speech.`
  },
  {
    slug: "multimodal-conversation-design",
    term: "Multimodal Conversation Design",
    aliases: ["multimodal dialog design", "text+voice+visual design"],
    definition: `Designing conversations that blend text, voice, visuals, gestures, and haptics. Each modality supports the others: voice for speed, visuals for precision, touch for correction.`,
    sources: [],
    categories: ["conversational design", "multimodal"],
    tags: [
      "kind:strategy",
      "type:discipline",
      "topic:multimodal",
      "phase:design",
      "use:rich-feedback",
      "level:advanced"
    ],
    related: ["conversational-ui","smart-display","voice-forward-device","interaction-model"],
    status: "verified",
    notes: `Use-cases: • Map/route setup (voice + map taps) • Smart-home dashboards • Wearables with glanceable cards
Boosters: Assign jobs to modalities; ensure parity (e.g., captions); provide cross-modal confirmations.
Caveats: Don’t split critical info across modalities—repeat essentials.`
  },
  {
    slug: "inclusivity-in-conversation-design",
    term: "Inclusivity in Conversation Design",
    aliases: ["inclusive conversation design", "inclusive dialog design"],
    definition: `A commitment to language and interaction choices that respect diverse cultures, abilities, and identities—covering readability, accessibility, pronouns, dialects, and safety considerations.`,
    sources: [],
    categories: ["conversational design", "inclusion", "accessibility"],
    tags: [
      "kind:strategy",
      "type:principle",
      "topic:inclusion",
      "phase:design",
      "use:accessibility",
      "level:intermediate"
    ],
    related: ["linguistic-diversity","linguistic-bias","brand-persona","conversational-repair"],
    status: "verified",
    notes: `Use-cases: • Accessible confirmations and alternatives • Respectful name/pronoun handling • Low-literacy and ESL support
Boosters: Plain-language checks; ARIA and captioning; cultural review by native speakers.
Caveats: Inclusivity is ongoing—monitor feedback and iterate.`
  },
  {
    slug: "cooperative-principle",
    term: "Cooperative Principle",
    aliases: ["gricean cooperative principle", "grice’s cooperative principle"],
    definition: `Grice’s idea that conversation works because participants generally aim to be informative, truthful, relevant, and clear. Use it as a north star for how agents phrase, omit, or ask for info.`,
    sources: [],
    categories: ["conversational design", "pragmatics"],
    tags: [
      "kind:framework",
      "type:principle",
      "topic:pragmatics",
      "phase:ideation",
      "use:style-guidance",
      "level:beginner"
    ],
    related: ["maxim-of-relevance","ambiguity-reduction","brand-persona"],
    status: "verified",
    notes: `Use-cases: • Draft refusal language that remains cooperative • Tune clarifiers for relevance • Balance brevity with clarity
Boosters: Translate each maxim into concrete writing rules and examples.
Caveats: Real users sometimes violate maxims—design repair paths.`
  },
  {
    slug: "maxim-of-relevance",
    term: "Maxim of Relevance",
    aliases: ["gricean relevance maxim", "relevance maxim"],
    definition: `One of Grice’s maxims: contribute only what’s relevant to the current context. For agents, it means trimming digressions, answering the actual question, and signaling when info is out of scope.`,
    sources: [],
    categories: ["conversational design", "pragmatics"],
    tags: [
      "kind:heustric",
      "type:principle",
      "topic:pragmatics",
      "phase:ideation",
      "use:focus",
      "level:beginner"
    ],
    related: ["cooperative-principle","conversational-repair","verbosity-control"],
    status: "verified",
    notes: `Use-cases: • Keep answers tight in support chats • Filter search snippets to the user’s ask • Write on-topic clarifiers
Boosters: Add “out-of-scope” phrasing; provide links instead of tangents.
Caveats: Over-trimming can hide caveats—reserve a brief “notes” section.`
  },
  {
    slug: "sample-dialogue",
    term: "Sample Dialogue",
    aliases: ["sample conversation", "dialogue script", "happy path script"],
    definition: `A scripted exchange that demonstrates how the system should respond in a scenario, including edge cases and repair. Serves as a living spec for writers, PMs, and engineers.`,
    sources: [],
    categories: ["conversational design", "specification"],
    tags: [
      "kind:pattern",
      "type:artifact",
      "topic:conversation",
      "phase:design",
      "use:spec",
      "level:beginner"
    ],
    related: ["interaction-flows","utterance","intent","entity","interaction-model"],
    status: "verified",
    notes: `Use-cases: • Onboard new team members • Align tone/repair examples • Validate flows with stakeholders
Boosters: Include annotations (confidence, entities, errors). Provide both happy and unhappy paths.
Caveats: Scripts rot—review after model or policy changes.`
  },
  {
    slug: "ambiguity-of-language",
    term: "Ambiguity of Language",
    aliases: ["language ambiguity", "polysemy & pragmatics"],
    definition: `Many words/phrases have multiple meanings. Interpretation depends on context, world knowledge, and discourse cues. Good designs expect ambiguity and provide clarifiers.`,
    sources: [],
    categories: ["conversational design", "linguistics"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:linguistics",
      "phase:ideation",
      "use:risk-awareness",
      "level:beginner"
    ],
    related: ["conversational-repair","ambiguity-reduction","discourse-markers","maxim-of-relevance"],
    status: "verified",
    notes: `Use-cases: • Build clarifier lists for ambiguous slots • Disambiguate colloquialisms • Detect double meanings in safety reviews
Boosters: Keep a “confusables” library; add examples; show parsed meaning to users.
Caveats: Don’t guess silently—ask when stakes are high.`
  },
  {
    slug: "pauses",
    term: "Pauses",
    aliases: ["silence", "hesitations"],
    definition: `Intentional or natural gaps in conversation that signal thinking, uncertainty, or turn transitions. In voice, timing and filler balance affect perceived competence and warmth.`,
    sources: [],
    categories: ["conversational design", "paralinguistics"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:conversation",
      "phase:design",
      "use:pacing",
      "level:beginner"
    ],
    related: ["turn-taking","discourse-markers","voice-user-interface-vui"],
    status: "verified",
    notes: `Use-cases: • Indicate “working…” during tool calls • Add micro-pauses before sensitive topics • Reduce over-talk in duplex voice
Boosters: Use brief visual/aural cues during long operations.
Caveats: Long silence feels broken—set max wait and offer to notify.`
  },
  {
    slug: "conversational-actions",
    term: "Conversational Actions",
    aliases: ["assistant actions", "voice app actions", "chat actions"],
    definition: `Custom conversational experiences that invoke services via dialog (e.g., “actions” on voice platforms). They map intents/entities to APIs and present confirmations and results conversationally.`,
    sources: [],
    categories: ["conversational design", "platform"],
    tags: [
      "kind:pattern",
      "type:artifact",
      "topic:platform",
      "phase:implementation",
      "use:service-integration",
      "level:intermediate"
    ],
    related: ["voice-user-interface-vui","intent","utterance","entity","interaction-model","conversational-ui"],
    status: "verified",
    notes: `Use-cases: • Order/booking flows • Smart-home control • Account management tasks
Boosters: Provide concise confirmations and undo options; log API errors as user-readable messages.
Caveats: Platform policies change—monitor capabilities and privacy rules.`
  },
  {
    slug: "voice-user-interface-vui",
    term: "Voice User Interface (VUI)",
    aliases: ["vui", "voice interface"],
    definition: `Interfaces controlled primarily via speech. Encompass wake-words, ASR, NLU, TTS, barge-in, and repair strategies so users can speak naturally and still complete tasks efficiently.`,
    sources: [],
    categories: ["conversational design", "voice"],
    tags: [
      "kind:framework",
      "type:ui",
      "topic:voice",
      "phase:implementation",
      "use:voice-first",
      "level:intermediate"
    ],
    related: ["smart-display","voice-forward-device","conversational-ui","turn-taking","pauses"],
    status: "verified",
    notes: `Use-cases: • Hands-busy environments • Accessibility scenarios • In-car assistants
Boosters: Tune wake word sensitivity; add earcons; support barge-in; expose what was heard.
Caveats: Noise and accents challenge ASR—offer visual/text alternatives.`
  },
  {
    slug: "smart-display",
    term: "Smart Display",
    aliases: ["voice display", "assistant display"],
    definition: `Voice-enabled devices with screens that show visual context—cards, media, confirmations—augmenting what’s said and enabling touch corrections.`,
    sources: [],
    categories: ["conversational design", "devices"],
    tags: [
      "kind:term",
      "type:device",
      "topic:multimodal",
      "phase:implementation",
      "use:visual-support",
      "level:beginner"
    ],
    related: ["voice-user-interface-vui","conversational-ui","voice-forward-device","multimodal-conversation-design"],
    status: "verified",
    notes: `Use-cases: • Show options instead of reading lists • Visual confirmations for transactions • Map/image interactions
Boosters: Keep glanceable layouts; support voice + touch parity.
Caveats: Don’t rely solely on visuals—read essentials aloud for accessibility.`
  },
  {
    slug: "voice-forward-device",
    term: "Voice-forward Device",
    aliases: ["voice-first device", "voice-led device"],
    definition: `Devices primarily driven by voice input but capable of limited visual or haptic feedback. Optimize for quick commands, confirmations, and hands-free control.`,
    sources: [],
    categories: ["conversational design", "devices"],
    tags: [
      "kind:term",
      "type:device",
      "topic:voice",
      "phase:implementation",
      "use:hands-free",
      "level:beginner"
    ],
    related: ["voice-user-interface-vui","smart-display","conversational-ui"],
    status: "verified",
    notes: `Use-cases: • Kitchen timers and controls • Car navigation • Wearable assistants
Boosters: Short prompts, robust confirmations, offline fallbacks where possible.
Caveats: Limited screen = limited disambiguation—design concise clarifiers.`
  },
  {
    slug: "subvocalization",
    term: "Subvocalization",
    aliases: ["silent articulation sensing", "non-audible speech sensing"],
    definition: `Capturing inaudible speech signals (e.g., muscle/nerve or throat activity) to enable silent command input—useful for privacy or noisy environments.`,
    sources: [],
    categories: ["conversational design", "emerging tech"],
    tags: [
      "kind:term",
      "type:technology",
      "topic:voice",
      "phase:research",
      "use:private-input",
      "level:advanced"
    ],
    related: ["silent-speech","voice-user-interface-vui"],
    status: "verified",
    notes: `Use-cases: • Private control in public • Accessibility for speech impairments • Military/industrial comms
Boosters: Pair with confirmation cues to prevent accidental triggers.
Caveats: Early tech; calibration and privacy implications require care.`
  },
  {
    slug: "silent-speech",
    term: "Silent Speech",
    aliases: ["non-audible speech", "silent command input"],
    definition: `Interaction methods that allow users to communicate without audible sound—via lip, muscle, or neural signals—to protect privacy and reduce disturbance.`,
    sources: [],
    categories: ["conversational design", "emerging tech"],
    tags: [
      "kind:term",
      "type:technology",
      "topic:voice",
      "phase:research",
      "use:privacy",
      "level:advanced"
    ],
    related: ["subvocalization","voice-user-interface-vui"],
    status: "verified",
    notes: `Use-cases: • Commuting and shared spaces • Medical settings • High-noise workplaces
Boosters: Clear feedback that input was captured; configurable sensitivity.
Caveats: Risk of misreads; require safe undo and logs.`
  },
  {
    slug: "escalated-errors",
    term: "Escalated Errors",
    aliases: ["progressive remediation", "tiered recovery"],
    definition: `A remediation pattern: start with gentle clarifiers, then offer structured choices, then escalate to human/harder fallback as confusion persists. Each stage increases specificity and support.`,
    sources: [],
    categories: ["conversational design", "quality"],
    tags: [
      "kind:pattern",
      "type:technique",
      "topic:ux",
      "phase:debugging",
      "use:recovery",
      "level:beginner"
    ],
    related: ["conversational-repair","ambiguity-reduction","fallback-pattern","interaction-flows"],
    status: "verified",
    notes: `Use-cases: • Payment/address failures • Repeated low-confidence parses • Tool/API outages
Boosters: Define step thresholds; script empathetic language; log root causes for fixes.
Caveats: Don’t loop users—hard-stop after N attempts and handoff.`
  },
  {
    slug: "utterance",
    term: "Utterance",
    aliases: ["user phrase", "sample utterance", "training phrase"],
    definition: `Any phrase or text a user says/types. Utterances train NLU and document real requests; they also seed clarifiers and examples in UX copy.`,
    sources: [],
    categories: ["conversational design", "nlu"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:nlu",
      "phase:design",
      "use:training",
      "level:beginner"
    ],
    related: ["intent","entity","interaction-model","sample-dialogue"],
    status: "verified",
    notes: `Use-cases: • Create training sets • Generate clarifier examples • Map paraphrases to intents
Boosters: Collect real user data; include slang/misspellings; tag entities inline.
Caveats: Synthetic-only utterances distort reality—refresh with live data.`
  },
  {
    slug: "intent",
    term: "Intent",
    aliases: ["user intent", "action intent"],
    definition: `A labeled goal the user wants to achieve (e.g., “pay bill”). It’s triggered by training utterances, may require entities/slots, and routes to fulfillment logic.`,
    sources: [],
    categories: ["conversational design", "nlu"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:nlu",
      "phase:design",
      "use:routing",
      "level:beginner"
    ],
    related: ["utterance","entity","interaction-model","interaction-flows"],
    status: "verified",
    notes: `Use-cases: • Define scope of a skill • Map to APIs/workflows • Drive analytics on task success
Boosters: Keep intents action-oriented; avoid overlaps; document required slots.
Caveats: Too many granular intents hurt accuracy—merge where sensible.`
  },
  {
    slug: "entity",
    term: "Entity",
    aliases: ["slot", "parameter"],
    definition: `A variable captured from an utterance (date, amount, location). Entities supply the parameters needed to fulfill an intent.`,
    sources: [],
    categories: ["conversational design", "nlu"],
    tags: [
      "kind:term",
      "type:concept",
      "topic:nlu",
      "phase:design",
      "use:data-capture",
      "level:beginner"
    ],
    related: ["utterance","intent","interaction-model","conversational-repair"],
    status: "verified",
    notes: `Use-cases: • Fill forms conversationally • Validate inputs (format/range) • Disambiguate partial requests
Boosters: Provide examples; confirm critical values; allow corrections.
Caveats: Ambiguous entity types (e.g., “charge”) need clarifiers.`
  },
  {
    slug: "interaction-model",
    term: "Interaction Model",
    aliases: ["dialog model", "skill model", "NLU model schema"],
    definition: `The spec that ties everything together: intents, training utterances, entities (slots), prompts, rules, and transitions. It defines how the agent understands and acts in conversations.`,
    sources: [],
    categories: ["conversational design", "architecture"],
    tags: [
      "kind:framework",
      "type:artifact",
      "topic:nlu",
      "phase:design",
      "use:system-spec",
      "level:intermediate"
    ],
    related: ["utterance","intent","entity","interaction-flows","conversational-ui","voice-user-interface-vui"],
    status: "verified",
    notes: `Use-cases: • Platform skill/app definitions • Cross-team alignment on behavior • Regression testing of updates
Boosters: Version control the model; add eval suites; annotate with confidence thresholds.
Caveats: Drift happens—schedule periodic data refresh and re-evaluation.`
  },

  // --- Reasoning Models or Structures ---
  {
    slug: "reasoning-models-or-structures",
    term: "Reasoning Models or Structures",
    aliases: ["reasoning structures", "reasoning patterns", "thought structures"],
    definition: `An umbrella category for patterns that shape a model’s intermediate thinking: linear chains, branching searches, plan-first execution, outline→detail, decomposition, summarization, scratchpads, and code-as-reasoning. Choosing the right structure improves clarity, controllability, and reliability of answers.`,
    sources: [
      { title: "Self-Discover (arXiv 2402.03620)", url: "https://arxiv.org/abs/2402.03620" }
    ],
    categories: ["reasoning models or structures", "prompting strategies", "problem solving"],
    tags: [
      "kind:term",
      "type:category",
      "topic:reasoning",
      "phase:prompting",
      "use:organize-cognition",
      "level:beginner"
    ],
    related: [
      "chain-of-thought-cot",
      "tree-of-thought-tot",
      "graph-of-thought-got",
      "algorithm-of-thought-aot",
      "skeleton-of-thought-sot",
      "plan-and-solve-p-s",
      "least-to-most-ltm",
      "question-decomposition",
      "scratchpad-reasoning",
      "program-generation"
    ],
    status: "verified",
    notes: `Use-cases: • Pick a thought pattern for a task family (math proofs vs. product strategy) • Standardize internal “how to think” prompts across a team • Diagnose failure modes by mapping the structure that was (not) used
Boosters: Start with a small “structure chooser” (If search space is large → ToT; if clarity is low → Summarize → Decompose; if procedure known → Plan & Solve). Log which structure you used to compare outcomes later.
Caveats: For simple tasks, heavy structures can add latency without gains—prefer minimal scaffolding.`
  },
  {
    slug: "chain-of-thought-cot",
    term: "Chain of Thought (CoT)",
    aliases: ["cot","chain-of-thought","step-by-step reasoning"],
    definition: `A linear, step-by-step explanation that surfaces intermediate decisions before giving the final answer. CoT improves transparency and often accuracy on multi-step problems by making the model spell out the path it’s taking.`,
    sources: [],
    categories: ["reasoning models or structures", "prompting strategies"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:reasoning",
      "phase:prompting",
      "use:explain-steps",
      "level:beginner"
    ],
    related: ["least-to-most-ltm","plan-and-solve-p-s","tree-of-thought-tot","chain-of-verification-cove","self-refine","rephrase-and-respond-rar"],
    status: "verified",
    notes: `Use-cases: • Word problems and logic puzzles • Walkthroughs of troubleshooting steps • Transparent policy or rubric application
Boosters: Prime with “show your working briefly, then answer.” Cap length to avoid rambling. Add a final “Answer:” line to separate result from reasoning.
Caveats: Verbose CoT can drift—add a verification pass or summary check.`
  },
  {
    slug: "tree-of-thought-tot",
    term: "Tree of Thought (ToT)",
    aliases: ["tot","tree-of-thought","branch-and-bound reasoning"],
    definition: `A branching search over multiple reasoning paths with the option to backtrack, score, and select the best candidate. Useful when solutions require exploration rather than a single straight line.`,
    sources: [],
    categories: ["reasoning models or structures", "search and planning"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:reasoning",
      "phase:prompting",
      "use:search-space",
      "level:advanced"
    ],
    related: ["chain-of-thought-cot","plan-and-solve-p-s","least-to-most-ltm","graph-of-thought-got","algorithm-of-thought-aot"],
    status: "verified",
    notes: `Use-cases: • Creative ideation with evaluation • Game/strategy lines of play • Decomposition with alternative subplans
Boosters: Set breadth/depth limits; define a scoring rubric; periodically prune weak branches. Summarize the winning path at the end.
Caveats: Cost grows quickly—control token budget and stop criteria.`
  },
  {
    slug: "scratchpad-reasoning",
    term: "Scratchpad Reasoning",
    aliases: ["working memory", "notes-and-tables", "intermediate workspace"],
    definition: `Externalizing interim notes—lists, tables, equations, variable bindings, or small diagrams—so the model can keep track of state. Scratchpads reduce cognitive load and make multi-constraint problems tractable.`,
    sources: [],
    categories: ["reasoning models or structures", "working memory aids"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:reasoning",
      "phase:prompting",
      "use:state-tracking",
      "level:intermediate"
    ],
    related: ["question-decomposition","program-generation","chain-of-symbol","skeleton-of-thought-sot"],
    status: "verified",
    notes: `Use-cases: • Scheduling/packing with constraints • Data reconciliation and mini-calculations • Requirements mapping before writing
Boosters: Provide a table schema; name variables; ask for a final clean answer after the scratchpad.
Caveats: Don’t leak private CoT if outputs must be terse—request a final “short answer only” section.`
  },
  {
    slug: "question-summarization",
    term: "Question Summarization (Cognitive Verifier)",
    aliases: ["cognitive verifier","question distillation","core question extraction"],
    definition: `Distills a long or messy prompt into the essential question(s) so the model knows exactly what to answer. Improves alignment, reduces scope creep, and sets up better downstream reasoning.`,
    sources: [
      { title: "arXiv 2302.11382", url: "https://arxiv.org/abs/2302.11382" }
    ],
    categories: ["reasoning models or structures", "clarification"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:clarity",
      "phase:prompting",
      "use:disambiguation",
      "level:beginner"
    ],
    related: ["question-decomposition","ambiguity-reduction","rephrase-and-respond-rar","chain-of-verification-cove"],
    status: "verified",
    notes: `Use-cases: • Clean up stakeholder walls-of-text • Extract key asks from email threads • Define acceptance criteria before solving
Boosters: Ask for a 1–2 sentence “core ask,” plus explicit out-of-scope notes. Confirm with the user before proceeding.
Caveats: Over-summarization can drop constraints—keep a “must include” list.`
  },
  {
    slug: "question-decomposition",
    term: "Question Decomposition",
    aliases: ["task decomposition","subquestioning","breakdown prompting"],
    definition: `Splits a complex prompt into smaller sub-questions, answers each, and then synthesizes a coherent final response. Reduces error by tackling one bite at a time.`,
    sources: [],
    categories: ["reasoning models or structures", "prompting strategies"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:reasoning",
      "phase:prompting",
      "use:divide-and-conquer",
      "level:intermediate"
    ],
    related: ["scaffolding","least-to-most-ltm","plan-and-solve-p-s","context-aware-decomposition-cad"],
    status: "verified",
    notes: `Use-cases: • Research briefs with many unknowns • Multi-criteria decisions • Long-document Q&A
Boosters: Label sub-answers; track open assumptions; finish with a synthesis and confidence notes.
Caveats: Fragmentation risk—maintain a “big picture” reminder at the top.`
  },
  {
    slug: "program-generation",
    term: "Program Generation",
    aliases: ["code-as-reasoning","algorithmic scratchpad","executable reasoning"],
    definition: `Writes code or algorithmic steps as an intermediate tool—for precise math, data transformation, simulation, or validation—then uses the results to answer the original question.`,
    sources: [],
    categories: ["reasoning models or structures", "tool use"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:code",
      "phase:prompting",
      "use:tool-use",
      "level:advanced"
    ],
    related: ["scratchpad-reasoning","plan-and-solve-p-s","function-calling","toolformer"],
    status: "verified",
    notes: `Use-cases: • Calculations and unit conversions • Parsing/transforming semi-structured data • Running small simulations
Boosters: Specify the language, constraints, and tests. Ask for “show code + output + plain-English conclusion.”
Caveats: Sandboxing and correctness matter—add checks and guardrails.`
  },
  {
    slug: "plan-and-solve-p-s",
    term: "Plan and Solve (P&S)",
    aliases: ["plan-and-solve","plan then act","plan→execute"],
    definition: `First draft a plan of sub-goals/steps, then execute them in order (with occasional re-planning). This structure improves reliability by separating strategy from action.`,
    sources: [],
    categories: ["reasoning models or structures", "planning"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:reasoning",
      "phase:prompting",
      "use:planning",
      "level:intermediate"
    ],
    related: ["least-to-most-ltm","chain-of-thought-cot","tree-of-thought-tot","plan-and-execute-agent","react"],
    status: "verified",
    notes: `Use-cases: • Project outlines before writing • Multi-tool agent tasks • Troubleshooting procedures
Boosters: Require a brief plan with numbered steps and exit criteria. After execution, compare result to plan and note deviations.
Caveats: Over-planning wastes tokens—keep plans lightweight.`
  },
  {
    slug: "least-to-most-ltm",
    term: "Least to Most (LtM)",
    aliases: ["least-to-most","curriculum-style solving","simple→complex"],
    definition: `Tackle the simplest subproblems first, using those results to take on progressively harder pieces. Functions like a mini-curriculum the model builds for itself.`,
    sources: [],
    categories: ["reasoning models or structures", "prompting strategies"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:reasoning",
      "phase:prompting",
      "use:progressive-difficulty",
      "level:beginner"
    ],
    related: ["plan-and-solve-p-s","question-decomposition","skeleton-of-thought-sot"],
    status: "verified",
    notes: `Use-cases: • Proofs and derivations • Refactoring messy requirements • Building up from definitions to applications
Boosters: Ask the model to list “prerequisite mini-questions,” then solve them in order. Summarize carry-over facts at each step.
Caveats: Don’t stall on trivialities—limit the number of “least” steps.`
  },
  {
    slug: "decomposed-prompting",
    term: "Decomposed Prompting",
    aliases: ["split-and-solve","modular prompting","pipeline prompting"],
    definition: `A general approach that splits a task into modular parts (retrieve, analyze, draft, verify, finalize). Each part has a focused prompt, and outputs are composed into a final answer.`,
    sources: [],
    categories: ["reasoning models or structures", "prompting pipelines"],
    tags: [
      "kind:strategy",
      "type:technique",
      "topic:reasoning",
      "phase:prompting",
      "use:modularity",
      "level:beginner"
    ],
    related: ["question-decomposition","scaffolding","prompt-composition","chain-of-verification-cove","corrective-rag-crag"],
    status: "verified",
    notes: `Use-cases: • Long-form reports with citations • Complex tool workflows • Safety-critical answers with checks
Boosters: Name each stage and its contract; cache intermediate artifacts; run a final “coherence & coverage” sweep.
Caveats: Hand-offs can lose context—carry forward a brief state summary between stages.`
  }
);


GLOSSARY.push(
  // --- Additional Reasoning Models — Logical and Analytical Reasoning ---
  {
    slug: "analogical-reasoning",
    term: "Analogical Reasoning",
    aliases: ["analogy mapping", "structure-mapping", "case-based analogy"],
    definition: `Infers new insights by mapping relational similarities between a well-understood source situation and a target situation. By aligning roles, constraints, and causal relations—not just surface features—it transfers patterns (“A is to B as C is to D”) to generate hypotheses, designs, or explanations that fit the target.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "problem solving"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:reasoning",
      "phase:ideation",
      "use:transfer-insight",
      "level:intermediate"
    ],
    related: ["abductive-reasoning","inductive-reasoning","narrative-reasoning","cross-domain-reasoning","design-thinking"],
    status: "verified",
    notes: `Use-cases: • Borrow UX patterns from another industry • Generate novel product concepts by analogy • Explain unfamiliar ideas using familiar comparisons
Boosters: Name the source domain explicitly; list structural correspondences; check for brittle, surface-only matches with a quick counterexample scan.
Caveats: Superficial analogies mislead—prioritize relational structure over aesthetics.`
  },
  {
    slug: "counterfactual-reasoning",
    term: "Counterfactual Reasoning",
    aliases: ["what-if analysis", "contrary-to-fact reasoning", "but-for causation"],
    definition: `Explores “what would have happened if X were different?” to test causal claims, stress-test plans, and estimate impact. Varies antecedents, holds controls fixed, and compares outcomes to infer plausible cause–effect links.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "causal analysis"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:causality",
      "phase:ideation",
      "use:hypothesis-test",
      "level:advanced"
    ],
    related: ["causal-reasoning","probabilistic-reasoning","systems-thinking","abductive-reasoning"],
    status: "verified",
    notes: `Use-cases: • Policy alternatives evaluation • Incident postmortems (“if we’d throttled earlier…”) • Marketing lift estimation with pseudo-controls
Boosters: State your factual baseline; vary one factor at a time; record assumptions; quantify expected direction and magnitude when possible.
Caveats: Hidden confounders can break conclusions—pair with sensitivity checks.`
  },
  {
    slug: "narrative-reasoning",
    term: "Narrative Reasoning",
    aliases: ["story-based reasoning", "scenario reasoning", "narrative framing"],
    definition: `Builds coherent stories (actors, goals, conflicts, arcs) to make sense of motives and outcomes. Turns scattered facts into cause-and-effect sequences that humans readily grasp, improving retention and meaning-making.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "communication"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:narrative",
      "phase:ideation",
      "use:explanation",
      "level:beginner"
    ],
    related: ["analogical-reasoning","holistic-reasoning","design-thinking","chain-of-thought-cot"],
    status: "verified",
    notes: `Use-cases: • Executive brief storytelling • Root-cause narratives for incidents • Brand and change-management narratives
Boosters: Explicitly list assumptions; separate facts from invented connective tissue; end with “evidence check” bullets.
Caveats: Good stories can seduce—verify claims against data.`
  },
  {
    slug: "holistic-reasoning",
    term: "Holistic Reasoning",
    aliases: ["whole-system perspective", "context-first reasoning"],
    definition: `Frames problems as interconnected wholes, emphasizing relationships, context, and side effects over isolated parts. Looks for patterns across boundaries before optimizing subcomponents.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "systems"],
    tags: [
      "kind:strategy",
      "type:reasoning",
      "topic:systems",
      "phase:ideation",
      "use:big-picture",
      "level:intermediate"
    ],
    related: ["systems-thinking","ecological-reasoning","complex-adaptive-systems-cas-thinking","strategic-reasoning"],
    status: "verified",
    notes: `Use-cases: • Portfolio trade-offs • Policy with cross-sector effects • Product changes with ecosystem partners
Boosters: Draw a quick influence diagram; list likely externalities; set guardrails to avoid local optimizations harming the whole.
Caveats: Can become vague—anchor with measurable subsystem outcomes.`
  },
  {
    slug: "intuitive-reasoning",
    term: "Intuitive Reasoning",
    aliases: ["expert intuition", "fast heuristic judgment", "System-1 style"],
    definition: `Leverages tacit patterns built from experience to make rapid, low-effort judgments. Useful under time pressure or when formal models are unavailable—best when calibrated with feedback.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "heuristics"],
    tags: [
      "kind:pattern",
      "type:reasoning",
      "topic:heuristics",
      "phase:ideation",
      "use:rapid-judgment",
      "level:intermediate"
    ],
    related: ["experiential-reasoning","reflective-reasoning","heuristic-systematic-model","probabilistic-reasoning"],
    status: "verified",
    notes: `Use-cases: • Triage decisions • Creative concept selection • Early anomaly spotting
Boosters: Add a quick “calibration check” (confidence + prior hits/misses); pair with later systematic review.
Caveats: Prone to bias—log reasons briefly to enable audit and learning.`
  },
  {
    slug: "deductive-reasoning",
    term: "Deductive Reasoning",
    aliases: ["formal deduction", "rule-to-case reasoning"],
    definition: `Applies general premises to derive specific conclusions that must be true if the premises and logic form are valid. Guarantees validity under sound structure (e.g., syllogisms, implications).`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "logic"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:logic",
      "phase:prompting",
      "use:prove",
      "level:beginner"
    ],
    related: ["syllogistic-reasoning","inductive-reasoning","abductive-reasoning","chain-of-symbol"],
    status: "verified",
    notes: `Use-cases: • Policy compliance checks • Type and interface reasoning in code • Formal argument validation
Boosters: State premises explicitly; test with counterexample search; separate validity (form) from soundness (premises true).
Caveats: True form + false premises ⇒ false conclusions still possible.`
  },
  {
    slug: "inductive-reasoning",
    term: "Inductive Reasoning",
    aliases: ["generalization from cases", "pattern induction"],
    definition: `Generalizes from observations to candidate rules or trends. Conclusions are probabilistic and improve with representative, sufficient, and unbiased samples.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "inference"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:inference",
      "phase:prompting",
      "use:generalize",
      "level:intermediate"
    ],
    related: ["probabilistic-reasoning","abductive-reasoning","deductive-reasoning"],
    status: "verified",
    notes: `Use-cases: • User research patterning • Market trend spotting • Error log clustering
Boosters: Document sampling frame; quantify uncertainty; validate on held-out cases.
Caveats: Hasty generalization and survivorship bias distort results—triangulate.`
  },
  {
    slug: "abductive-reasoning",
    term: "Abductive Reasoning",
    aliases: ["inference to best explanation", "IBE"],
    definition: `Infers the most plausible hypothesis that would explain observed facts among competing candidates, balancing simplicity, scope, and fit.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "diagnostics"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:hypothesis",
      "phase:prompting",
      "use:explain-observation",
      "level:advanced"
    ],
    related: ["inductive-reasoning","deductive-reasoning","counterfactual-reasoning","causal-reasoning"],
    status: "verified",
    notes: `Use-cases: • Medical/ops diagnostics • Forensics and incident RCA • Product metric anomalies
Boosters: List competing hypotheses; score against evidence; seek a “killer” disconfirming test.
Caveats: “Best” explanation can still be wrong—keep updating with new evidence.`
  },
  {
    slug: "syllogistic-reasoning",
    term: "Syllogistic Reasoning",
    aliases: ["syllogism", "categorical syllogism"],
    definition: `A formal deductive pattern combining a major premise and a minor premise to reach a conclusion (e.g., All A are B; C is A; therefore C is B). Useful for clear, auditable argument structures.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "logic"],
    tags: [
      "kind:pattern",
      "type:reasoning",
      "topic:logic",
      "phase:prompting",
      "use:argument-structure",
      "level:beginner"
    ],
    related: ["deductive-reasoning","chain-of-symbol","chain-of-thought-cot"],
    status: "verified",
    notes: `Use-cases: • Policy and permission derivations • Knowledge base rule checks • Philosophy and logic instruction
Boosters: Label each premise; verify term distribution; test with Venn/sets sketch.
Caveats: Fallacies of undistributed middle or equivocation lurk—watch definitions.`
  },
  {
    slug: "probabilistic-reasoning",
    term: "Probabilistic Reasoning",
    aliases: ["Bayesian reasoning", "uncertainty modeling"],
    definition: `Represents uncertainty with probabilities and updates beliefs as evidence arrives. Supports decision-making under risk via expected value, likelihoods, and posterior updates.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "statistics"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:statistics",
      "phase:prompting",
      "use:manage-uncertainty",
      "level:advanced"
    ],
    related: ["inductive-reasoning","counterfactual-reasoning","causal-reasoning","calibrated-confidence-prompting-ccp"],
    status: "verified",
    notes: `Use-cases: • Risk analysis and prioritization • Experiment interpretation • Forecasting and decision graphs
Boosters: State priors; show likelihood assumptions; report posterior and sensitivity; add confidence calibration.
Caveats: Garbage priors/likelihoods ⇒ brittle outputs—document sources.`
  },
  {
    slug: "computational-reasoning",
    term: "Computational Reasoning",
    aliases: ["algorithmic reasoning", "formal procedure reasoning"],
    definition: `Thinks in algorithms, data structures, and invariants to solve problems precisely and repeatably. Ideal for tasks that benefit from stepwise procedures or executable checks.`,
    sources: [],
    categories: ["additional reasoning models", "logical and analytical reasoning", "computing"],
    tags: [
      "kind:strategy",
      "type:reasoning",
      "topic:computing",
      "phase:prompting",
      "use:algorithmize",
      "level:intermediate"
    ],
    related: ["computational-thinking","program-generation","plan-and-solve-p-s","chain-of-symbol"],
    status: "verified",
    notes: `Use-cases: • Workflow automation plans • Data transformation designs • Constraint satisfaction sketches
Boosters: Specify inputs/outputs; define invariants; propose pseudocode or tests.
Caveats: Over-formalization can slow creative tasks—blend with analogical or narrative when needed.`
  },

  // --- Additional Reasoning Models — Scientific and Empirical Reasoning ---
  {
    slug: "causal-reasoning",
    term: "Causal Reasoning",
    aliases: ["cause-effect inference", "causal modeling"],
    definition: `Identifies and validates cause→effect relationships to explain or predict outcomes. Uses interventions, counterfactuals, and DAGs/criteria to separate correlation from causation.`,
    sources: [],
    categories: ["additional reasoning models", "scientific and empirical reasoning", "causal analysis"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:causality",
      "phase:prompting",
      "use:explain-predict",
      "level:advanced"
    ],
    related: ["counterfactual-reasoning","probabilistic-reasoning","systems-thinking","chain-of-verification-cove"],
    status: "verified",
    notes: `Use-cases: • Feature impact on KPIs • Safety investigations • Policy evaluation
Boosters: Draw a simple causal graph; state identifiability assumptions; consider back-doors and instruments if applicable.
Caveats: Causal claims without testable assumptions risk pseudo-rigor.`
  },
  {
    slug: "systems-thinking",
    term: "Systems Thinking",
    aliases: ["system dynamics", "feedback-loop thinking"],
    definition: `Understands behavior emerging from interacting parts, feedback loops, delays, and stocks/flows. Looks beyond linear chains to cyclical dynamics and leverage points.`,
    sources: [],
    categories: ["additional reasoning models", "scientific and empirical reasoning", "interdisciplinary and complex reasoning"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:systems",
      "phase:ideation",
      "use:map-system",
      "level:intermediate"
    ],
    related: ["holistic-reasoning","complex-adaptive-systems-cas-thinking","critical-systems-thinking-cst","strategic-reasoning"],
    status: "verified",
    notes: `Use-cases: • Churn and growth loop analysis • Environmental policy effects • Org change ripple mapping
Boosters: Sketch causal loop diagrams; identify balancing vs reinforcing loops; test small leverage experiments.
Caveats: Diagrams can look right yet be wrong—validate with data or simulation.`
  },
  {
    slug: "ecological-reasoning",
    term: "Ecological Reasoning",
    aliases: ["ecosystem reasoning", "environmental constraints framing"],
    definition: `Centers ecological relationships, carrying capacities, and constraints to reason about sustainable actions and impacts across time and space.`,
    sources: [],
    categories: ["additional reasoning models", "scientific and empirical reasoning", "social and ethical reasoning"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:environment",
      "phase:ideation",
      "use:impact-assessment",
      "level:intermediate"
    ],
    related: ["systems-thinking","holistic-reasoning","complex-adaptive-systems-cas-thinking"],
    status: "verified",
    notes: `Use-cases: • Sustainability trade-off analysis • Supply-chain footprinting • Land-use planning
Boosters: Include spatial/temporal scales; list externalities; add precautionary constraints.
Caveats: Data gaps are common—flag uncertainty and monitor.`
  },
  {
    slug: "evolutionary-reasoning",
    term: "Evolutionary Reasoning",
    aliases: ["selection-based reasoning", "adaptation framing"],
    definition: `Explains or predicts behavior via selection, variation, and retention dynamics (fitness). Applies beyond biology to markets, ideas, and design search.`,
    sources: [],
    categories: ["additional reasoning models", "scientific and empirical reasoning"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:biology",
      "phase:ideation",
      "use:explain-adaptation",
      "level:intermediate"
    ],
    related: ["causal-reasoning","probabilistic-reasoning","complex-adaptive-systems-cas-thinking"],
    status: "verified",
    notes: `Use-cases: • Competitive strategy narratives • Feature evolution roadmaps • Cultural/idea diffusion analysis
Boosters: Define fitness criteria; track selection pressures; explore mutation (variation) operators in design.
Caveats: Beware “just-so” stories—seek falsifiable predictions.`
  },
  {
    slug: "experiential-reasoning",
    term: "Experiential Reasoning",
    aliases: ["practice-based reasoning", "case experiential learning"],
    definition: `Uses first-hand observations and accumulated practice to inform judgments. Converts experience into heuristics and patterns, ideally recorded and tested over time.`,
    sources: [],
    categories: ["additional reasoning models", "scientific and empirical reasoning"],
    tags: [
      "kind:strategy",
      "type:reasoning",
      "topic:experience",
      "phase:prompting",
      "use:ground-truth",
      "level:beginner"
    ],
    related: ["intuitive-reasoning","reflective-reasoning","reflective-practice"],
    status: "verified",
    notes: `Use-cases: • Clinician diagnostic cues • Operator runbooks • Field ethnography summaries
Boosters: Capture cases and outcomes; convert into checklists; periodically retire stale heuristics.
Caveats: Anecdotes are not evidence—seek triangulation.`
  },

  // --- Additional Reasoning Models — Temporal and Spatial Reasoning ---
  {
    slug: "spatial-reasoning",
    term: "Spatial Reasoning",
    aliases: ["mental rotation", "layout reasoning", "geometric reasoning"],
    definition: `Manipulates shapes, positions, and relations in space to plan layouts, routes, assemblies, or interfaces. Supports visualization, collision checks, and fit testing.`,
    sources: [],
    categories: ["additional reasoning models", "temporal and spatial reasoning"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:spatial",
      "phase:prompting",
      "use:layout",
      "level:intermediate"
    ],
    related: ["computational-reasoning","program-generation","multimodal-reasoning"],
    status: "verified",
    notes: `Use-cases: • Architecture and UI layout • Packaging/knapsack planning • Robotics path previews
Boosters: Ask for sketches/tables of coordinates; define constraints (bounds, clearances); run sanity checks on dimensions.
Caveats: Text-only can be ambiguous—prefer diagrams when possible.`
  },
  {
    slug: "temporal-reasoning",
    term: "Temporal Reasoning",
    aliases: ["timeline reasoning", "event calculus (informal)"],
    definition: `Reasons about order, duration, and dependencies among events. Useful for scheduling, narratives, and causal timelines with lags.`,
    sources: [],
    categories: ["additional reasoning models", "temporal and spatial reasoning"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:time",
      "phase:prompting",
      "use:scheduling",
      "level:intermediate"
    ],
    related: ["plan-and-solve-p-s","least-to-most-ltm","causal-reasoning"],
    status: "verified",
    notes: `Use-cases: • Project plans and Gantt outlines • Incident chronicles • Historical analyses
Boosters: Use explicit timestamps/durations; mark critical path; note assumptions about concurrency.
Caveats: Off-by-one and timezone errors lurk—standardize units.`
  },

  // --- Additional Reasoning Models — Social and Ethical Reasoning ---
  {
    slug: "normative-reasoning",
    term: "Normative Reasoning",
    aliases: ["ethical reasoning", "moral evaluation", "principle-based assessment"],
    definition: `Evaluates actions or policies against norms and ethical principles (rights, duties, consequences, virtues). Clarifies trade-offs and justifies choices beyond technical feasibility.`,
    sources: [],
    categories: ["additional reasoning models", "social and ethical reasoning"],
    tags: [
      "kind:framework",
      "type:reasoning",
      "topic:ethics",
      "phase:evaluation",
      "use:policy-judgment",
      "level:advanced"
    ],
    related: ["bias-mitigation","addressing-biases-and-ethical-concerns","critical-systems-thinking-cst","reflective-reasoning"],
    status: "verified",
    notes: `Use-cases: • Safety policy decisions • Content moderation rationales • Clinical and legal dilemmas
Boosters: State the principle set; present pro/cons explicitly; document stakeholder impacts and reversibility.
Caveats: Competing principles collide—record the reasoning trail for accountability.`
  },

  // --- Additional Reasoning Models — Interdisciplinary and Complex Reasoning ---
  {
    slug: "transactive-reasoning",
    term: "Transactive Reasoning",
    aliases: ["collaborative reasoning", "knowledge-sharing inference"],
    definition: `Emerges through interaction among people or agents—participants specialize, reference each other’s expertise, and co-construct conclusions.`,
    sources: [],
    categories: ["additional reasoning models", "interdisciplinary and complex reasoning"],
    tags: [
      "kind:pattern",
      "type:reasoning",
      "topic:collaboration",
      "phase:prompting",
      "use:co-reasoning",
      "level:intermediate"
    ],
    related: ["parallel-reasoning","dialectical-reasoning","multi-perspective-simulation-mps","prompt-ensembling"],
    status: "verified",
    notes: `Use-cases: • Panel-style analyses • Agent teams with tool specialization • Cross-functional design reviews
Boosters: Assign roles and hand-offs; request citations per role; end with a synthesis pass.
Caveats: Coordination overhead—keep interfaces and artifacts simple.`
  },
  {
    slug: "multimodal-reasoning",
    term: "Multimodal Reasoning",
    aliases: ["cross-modal reasoning", "vision-language-audio integration"],
    definition: `Combines signals from multiple modalities (text, images, audio, etc.) so evidence in one channel constrains interpretations in another, improving robustness and grounding.`,
    sources: [],
    categories: ["additional reasoning models", "interdisciplinary and complex reasoning"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:multimodal",
      "phase:prompting",
      "use:fuse-modalities",
      "level:intermediate"
    ],
    related: ["spatial-reasoning","computational-reasoning","multimodal-prompting","multimodal-chain-of-thought-mm-cot"],
    status: "verified",
    notes: `Use-cases: • Chart/diagram question answering • Scene understanding with instructions • Audio-transcript alignment
Boosters: Specify modality order of operations; summarize cross-modal conflicts; include a final cross-check.
Caveats: Missing modality metadata can derail alignment—label inputs clearly.`
  },
  {
    slug: "quantum-reasoning",
    term: "Quantum Reasoning",
    aliases: ["quantum-inspired reasoning", "superposition inference (conceptual)"],
    definition: `Applies quantum-mechanical ideas (superposition, interference) to model ambiguity and context effects, or to design quantum algorithms for certain problem classes.`,
    sources: [],
    categories: ["additional reasoning models", "interdisciplinary and complex reasoning", "research"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:quantum",
      "phase:research",
      "use:model-uncertainty",
      "level:advanced"
    ],
    related: ["computational-reasoning","probabilistic-reasoning"],
    status: "verified",
    notes: `Use-cases: • Quantum algorithm planning • Cognitive modeling of order effects • Complex search heuristics
Boosters: Clarify whether you mean literal quantum computation or metaphor; define state spaces and measurement rules.
Caveats: Avoid buzzword inflation—tie claims to concrete advantages.`
  },
  {
    slug: "interdisciplinary-reasoning",
    term: "Interdisciplinary Reasoning",
    aliases: ["cross-disciplinary reasoning", "transdisciplinary synthesis"],
    definition: `Combines methods, evidence, and lenses from multiple fields to address complex problems that defy single-discipline solutions.`,
    sources: [],
    categories: ["additional reasoning models", "interdisciplinary and complex reasoning"],
    tags: [
      "kind:strategy",
      "type:reasoning",
      "topic:integration",
      "phase:ideation",
      "use:combine-methods",
      "level:intermediate"
    ],
    related: ["systems-thinking","design-thinking","cross-domain-reasoning","holistic-reasoning"],
    status: "verified",
    notes: `Use-cases: • Health + economics + policy analyses • Climate adaptation planning • Responsible AI reviews
Boosters: Map disciplines to sub-questions; define hand-offs; reconcile conflicting standards explicitly.
Caveats: Method clashes happen—document compromises.`
  },
  {
    slug: "reflective-reasoning",
    term: "Reflective Reasoning",
    aliases: ["metacognitive review", "think-about-thinking"],
    definition: `Examines and revises one’s own reasoning process—checking assumptions, evidence, and strategy choice—to improve judgment quality.`,
    sources: [],
    categories: ["additional reasoning models", "interdisciplinary and complex reasoning"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:metacognition",
      "phase:evaluation",
      "use:self-critique",
      "level:beginner"
    ],
    related: ["meta-reasoning","reflective-practice","chain-of-verification-cove","self-refine"],
    status: "verified",
    notes: `Use-cases: • Pre-mortems and postmortems • Research self-checks • Editorial review of arguments
Boosters: Add a brief assumptions log; run CoVe (verification chain); capture “what I’d do differently next time.”
Caveats: Can stall into analysis-paralysis—timebox the reflection.`
  },
  {
    slug: "parallel-reasoning",
    term: "Parallel Reasoning",
    aliases: ["concurrent subproblem solving", "branch parallelization"],
    definition: `Explores multiple subproblems or solution paths concurrently, then merges results. Increases diversity and can reduce time to a good solution.`,
    sources: [],
    categories: ["additional reasoning models", "interdisciplinary and complex reasoning"],
    tags: [
      "kind:technique",
      "type:reasoning",
      "topic:computation",
      "phase:prompting",
      "use:concurrent-explore",
      "level:advanced"
    ],
    related: ["transactive-reasoning","tree-of-thought-tot","shotgun-generation","skeleton-of-thought-sot"],
    status: "verified",
    notes: `Use-cases: • Candidate solution exploration • Model ensembling across prompts • Design alternatives generation
Boosters: Define merge criteria; cap parallel width; deduplicate similar paths before synthesis.
Caveats: Coordination overhead and redundancy can waste tokens—prune early.`
  },
  {
    slug: "dialectical-reasoning",
    term: "Dialectical Reasoning",
    aliases: ["thesis–antithesis–synthesis", "structured debate"],
    definition: `Resolves tensions by articulating opposing positions, testing them against evidence, and synthesizing a higher-order view that preserves strengths while addressing weaknesses.`,
    sources: [],
    categories: ["additional reasoning models", "interdisciplinary and complex reasoning"],
    tags: [
      "kind:pattern",
      "type:reasoning",
      "topic:debate",
      "phase:prompting",
      "use:resolve-conflict",
      "level:intermediate"
    ],
    related: ["reflective-reasoning","transactive-reasoning","multi-perspective-simulation-mps"],
    status: "verified",
    notes: `Use-cases: • Policy trade-off analysis • Architecture debates • Ethics discussions
Boosters: Assign steel-man roles; require evidence per side; end with synthesis + decision rules.
Caveats: False balance risk—weight positions by evidence quality.`
  },

  // --- Additional Thinking Systems / Structures ---
  {
    slug: "integrated-reasoning",
    term: "Integrated Reasoning",
    aliases: ["blended reasoning", "quant+qual synthesis"],
    definition: `Combines quantitative, verbal, and analytical lenses in one workflow so numbers, narratives, and logic cross-check each other.`,
    sources: [],
    categories: ["additional thinking systems/structures", "problem solving"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:reasoning",
      "phase:prompting",
      "use:balanced-approach",
      "level:intermediate"
    ],
    related: ["computational-thinking","meta-reasoning","narrative-reasoning","probabilistic-reasoning"],
    status: "verified",
    notes: `Use-cases: • Executive briefs with data + story • Strategy docs with metrics and hypotheses • Mixed-methods research
Boosters: Structure outputs into “Data / Logic / Narrative” sections; reconcile contradictions explicitly.
Caveats: Don’t let one mode dominate—track evidence provenance.`
  },
  {
    slug: "critical-systems-thinking-cst",
    term: "Critical Systems Thinking (CST)",
    aliases: ["CST", "critical systems"],
    definition: `A systems approach informed by critical theory that surfaces boundaries, values, and power dynamics while designing interventions. Seeks improvement for multiple stakeholders, not just efficiency.`,
    sources: [],
    categories: ["additional thinking systems/structures", "systems", "ethics"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:systems",
      "phase:ideation",
      "use:boundary-critique",
      "level:advanced"
    ],
    related: ["systems-thinking","complex-adaptive-systems-cas-thinking","normative-reasoning"],
    status: "verified",
    notes: `Use-cases: • Public policy design • Org change with disparate stakeholders • Tech governance
Boosters: Perform boundary critique; map winners/losers; include deliberation mechanisms.
Caveats: Can be process-heavy—timebox and prioritize decisions.`
  },
  {
    slug: "meta-reasoning",
    term: "Meta-Reasoning",
    aliases: ["reasoning about reasoning", "strategy control"],
    definition: `Monitors and controls the reasoning process itself—choosing structures (CoT, ToT), setting stop criteria, verifying, and revising plans.`,
    sources: [],
    categories: ["additional thinking systems/structures", "metacognition"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:metacognition",
      "phase:evaluation",
      "use:monitor-process",
      "level:advanced"
    ],
    related: ["reflective-reasoning","self-discover-framework","chain-of-verification-cove","plan-and-solve-p-s"],
    status: "verified",
    notes: `Use-cases: • Agent controllers • High-stakes analysis reviews • Research protocols
Boosters: Add a “structure selector” step; log decisions and confidence; include verification and fallback patterns.
Caveats: Overhead must pay for itself—apply proportionally to risk.`
  },
  {
    slug: "cross-domain-reasoning",
    term: "Cross-Domain Reasoning",
    aliases: ["cross-pollination", "inter-domain mapping"],
    definition: `Applies models and strategies from one field to another (e.g., epidemiology to misinformation) to unlock fresh angles on stubborn problems.`,
    sources: [],
    categories: ["additional thinking systems/structures", "innovation"],
    tags: [
      "kind:strategy",
      "type:framework",
      "topic:integration",
      "phase:ideation",
      "use:analog-transfer",
      "level:intermediate"
    ],
    related: ["interdisciplinary-reasoning","analogical-reasoning","design-thinking"],
    status: "verified",
    notes: `Use-cases: • Import queueing theory into support • Apply ecology to marketplace health • Use control theory for growth loops
Boosters: Map term equivalences; test limits of transfer; involve domain experts in review.
Caveats: Domain assumptions may not hold—validate with small pilots.`
  },
  {
    slug: "complex-adaptive-systems-cas-thinking",
    term: "Complex Adaptive Systems (CAS) Thinking",
    aliases: ["CAS", "agent-based perspective"],
    definition: `Models systems as interacting agents that adapt, producing emergent patterns. Focuses on local rules, adaptation, and path dependence rather than top-down control.`,
    sources: [],
    categories: ["additional thinking systems/structures", "systems"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:systems",
      "phase:ideation",
      "use:emergence-analysis",
      "level:advanced"
    ],
    related: ["systems-thinking","critical-systems-thinking-cst","evolutionary-reasoning"],
    status: "verified",
    notes: `Use-cases: • Simulation of markets/ecosystems • Epidemic spread sketches • Network effects exploration
Boosters: Specify agent rules; run simple simulations; watch for tipping points and lock-in.
Caveats: Simplicity vs realism trade-off—don’t over-interpret toy worlds.`
  },
  {
    slug: "design-thinking",
    term: "Design Thinking",
    aliases: ["human-centered design", "double diamond (informal)"],
    definition: `Iterative, user-centered approach—empathize, define, ideate, prototype, test—to reduce risk and converge on solutions that fit human needs.`,
    sources: [],
    categories: ["additional thinking systems/structures", "innovation", "product"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:design",
      "phase:ideation",
      "use:problem-framing",
      "level:beginner"
    ],
    related: ["cross-domain-reasoning","integrated-reasoning","strategic-reasoning","prompt-architecture"],
    status: "verified",
    notes: `Use-cases: • New feature discovery • Service blueprinting • Prototype-driven learning
Boosters: Capture JTBD (jobs-to-be-done); test smallest risky assumptions first; keep research artifacts lightweight.
Caveats: Don’t skip the “define” step—teams often jump to solutions.`
  },
  {
    slug: "strategic-reasoning",
    term: "Strategic Reasoning",
    aliases: ["long-horizon planning", "game-theoretic framing"],
    definition: `Plans over long horizons considering incentives, constraints, and interactions with other actors. Balances goals, risks, and optionality.`,
    sources: [],
    categories: ["additional thinking systems/structures", "strategy"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:strategy",
      "phase:ideation",
      "use:plan-long-term",
      "level:intermediate"
    ],
    related: ["probabilistic-reasoning","systems-thinking","causal-reasoning","design-thinking"],
    status: "verified",
    notes: `Use-cases: • Product roadmaps • Market entry decisions • Security posture planning
Boosters: Articulate assumptions; define leading indicators; build decision trees with option values.
Caveats: Beware narrative certainty—revisit plans with fresh signals.`
  },
  {
    slug: "heuristic-systematic-model",
    term: "Heuristic-Systematic Model",
    aliases: ["HSM", "dual-process persuasion model"],
    definition: `A dual-process account where quick heuristic judgments coexist with slower systematic analysis. Predicts when people rely on cues vs. deep processing—useful for communication strategy and bias checks.`,
    sources: [],
    categories: ["additional thinking systems/structures", "cognition"],
    tags: [
      "kind:framework",
      "type:model",
      "topic:cognition",
      "phase:ideation",
      "use:communication-design",
      "level:intermediate"
    ],
    related: ["intuitive-reasoning","reflective-reasoning","probabilistic-reasoning"],
    status: "verified",
    notes: `Use-cases: • Message design and testing • UX microcopy choices • Debiasing prompts (cue vs evidence)
Boosters: Identify likely processing route; pair heuristic cues with easy access to evidence; invite user to switch routes.
Caveats: Route isn’t binary—expect mixtures; measure outcomes.`
  },
  {
    slug: "computational-thinking",
    term: "Computational Thinking",
    aliases: ["decomposition & abstraction", "algorithm design mindset"],
    definition: `Frames problems in computable terms: decompose, abstract, design algorithms, and evaluate. A transferable skill for structuring tasks the model can execute or check.`,
    sources: [],
    categories: ["additional thinking systems/structures", "education", "computing"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:computing",
      "phase:prompting",
      "use:algorithm-design",
      "level:beginner"
    ],
    related: ["computational-reasoning","program-generation","plan-and-solve-p-s","question-decomposition"],
    status: "verified",
    notes: `Use-cases: • Turning briefs into stepwise specs • Designing repeatable pipelines • Writing testable acceptance criteria
Boosters: Specify inputs/outputs/contracts; include edge cases; design simple tests first.
Caveats: Don’t over-engineer exploratory tasks—mix with analogical/narrative.`
  },
  {
    slug: "reflective-practice",
    term: "Reflective Practice",
    aliases: ["after-action reflection", "learning loop"],
    definition: `A deliberate cycle of doing, reflecting, and adjusting. Converts experience into improved practice via journals, debriefs, and small experiments.`,
    sources: [],
    categories: ["additional thinking systems/structures", "professional development"],
    tags: [
      "kind:framework",
      "type:practice",
      "topic:metacognition",
      "phase:evaluation",
      "use:learning-loop",
      "level:beginner"
    ],
    related: ["experiential-reasoning","reflective-reasoning","meta-reasoning"],
    status: "verified",
    notes: `Use-cases: • Team postmortems • Personal growth plans • Craft skill development
Boosters: Keep a lightweight reflection template (what/so-what/now-what); schedule reviews; pick one change per cycle.
Caveats: Reflection without action is wheel-spinning—close the loop with commitments.`
  }
);


GLOSSARY.push(
  // --- Thinking Frameworks ---
  {
    slug: "reflective-judgment-model",
    term: "Reflective Judgment Model",
    aliases: [],
    definition: `Stages of reasoning development in which individuals move from **pre-reflective** to **quasi-reflective** and finally to **reflective** thinking, improving how they justify beliefs and evaluate evidence.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:metacognition","phase:evaluation"],
    related: ["reflective-reasoning","reflective-practice","meta-reasoning"],
    status: "verified",
    notes: "Used in higher education, professional development, ethics."
  },
  {
    slug: "soar-analysis",
    term: "SOAR Analysis",
    aliases: ["soar"],
    definition: `Strategic planning lens focusing on **Strengths**, **Opportunities**, **Aspirations**, and **Results** to drive constructive, forward-looking action.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:strategy","phase:ideation"],
    related: ["swot-analysis","design-thinking","strategic-reasoning"],
    status: "verified",
    notes: "Applied in business strategy, communities, personal growth."
  },
  {
    slug: "faciones-core-critical-thinking-skills",
    term: "Facione’s Core Critical Thinking Skills",
    aliases: ["facione critical thinking"],
    definition: `Defines **analysis**, **evaluation**, **inference**, **explanation**, and **self-regulation** as essential skills in critical thinking.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:critical-thinking","phase:education"],
    related: ["paul-elder-critical-thinking-framework","raccca-framework","rubric-approach"],
    status: "verified",
    notes: "Used in curricula, training, leadership."
  },
  {
    slug: "paul-elder-critical-thinking-framework",
    term: "Paul-Elder Critical Thinking Framework",
    aliases: ["paul elder framework"],
    definition: `Centers on **elements of thought** (purpose, question, information, interpretation, etc.) and **intellectual standards** (clarity, accuracy, precision, relevance, depth, breadth, logic, fairness).`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:critical-thinking","phase:education"],
    related: ["faciones-core-critical-thinking-skills","rubric-approach","raccca-framework"],
    status: "verified",
    notes: "Used in academia and professional training."
  },
  {
    slug: "argument-mapping",
    term: "Argument Mapping",
    aliases: [],
    definition: `Visual diagramming of claims, evidence, and relations (support/attack) to reveal argument structure and gaps.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:technique","topic:logic","phase:analysis"],
    related: ["deductive-reasoning","abductive-reasoning","critical-discourse-analysis"],
    status: "verified",
    notes: "Useful for debate, legal analysis, instruction."
  },
  {
    slug: "blooms-taxonomy",
    term: "Bloom’s Taxonomy",
    aliases: ["blooms taxonomy","bloom taxonomy"],
    definition: `Hierarchy of cognitive skills—from **remember** to **understand**, **apply**, **analyze**, **evaluate**, and **create**—to promote higher-order learning.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:education","phase:design"],
    related: ["design-thinking","rubric-approach","raccca-framework"],
    status: "verified",
    notes: "Used in curriculum design and assessment."
  },
  {
    slug: "critical-discourse-analysis",
    term: "Critical Discourse Analysis",
    aliases: ["cda"],
    definition: `Analyzing texts/speech to uncover social power, ideology, and psychological dynamics influencing language use.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:linguistics","phase:analysis"],
    related: ["socio-linguistics","linguistic-bias","brand-persona"],
    status: "verified",
    notes: "Applied in linguistics, media studies, social sciences."
  },
  {
    slug: "heuristics-and-biases-framework",
    term: "Heuristics and Biases Framework",
    aliases: ["heuristics and biases"],
    definition: `Explores mental shortcuts and systematic errors in judgment (e.g., availability, anchoring, confirmation).`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:decision-making","phase:evaluation"],
    related: ["intuitive-reasoning","heuristic-systematic-model","ambiguity-reduction"],
    status: "verified",
    notes: "Used in psychology, market research, behavioral econ."
  },
  {
    slug: "triz-theory-of-inventive-problem-solving",
    term: "TRIZ (Theory of Inventive Problem Solving)",
    aliases: ["triz"],
    definition: `Inventive problem-solving method derived from patterns across patents; uses contradictions, inventive principles, and trends of evolution.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:innovation","phase:ideation"],
    related: ["design-thinking","cross-domain-reasoning","strategic-reasoning"],
    status: "verified",
    notes: "Used in engineering and product development."
  },
  {
    slug: "root-cause-analysis",
    term: "Root Cause Analysis",
    aliases: ["rca"],
    definition: `Identifies the fundamental cause(s) behind a problem rather than treating symptoms (e.g., 5 Whys, fishbone diagram).`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:technique","topic:quality","phase:debugging"],
    related: ["causal-reasoning","argument-mapping","systems-thinking"],
    status: "verified",
    notes: "Used in quality control, healthcare, PM."
  },
  {
    slug: "socratic-questioning",
    term: "Socratic Questioning",
    aliases: [],
    definition: `Disciplined inquiry surfacing assumptions, evidence, implications, and alternative viewpoints through targeted questions.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:technique","topic:critical-thinking","phase:analysis"],
    related: ["argument-mapping","cooperative-principle","ambiguity-reduction"],
    status: "verified",
    notes: "Applied in education, therapy, coaching."
  },
  {
    slug: "six-thinking-hats",
    term: "Six Thinking Hats",
    aliases: ["6 thinking hats"],
    definition: `Parallel-thinking roles (white=facts, red=feelings, black=risks, yellow=benefits, green=ideas, blue=process) to structure group problem solving.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:collaboration","phase:ideation"],
    related: ["design-thinking","strategic-reasoning","transactive-reasoning"],
    status: "verified",
    notes: "Used in meetings, brainstorming, conflict resolution."
  },
  {
    slug: "critical-realism",
    term: "Critical Realism",
    aliases: [],
    definition: `Philosophy distinguishing between **real** causal mechanisms and **observable** events; seeks explanations beyond appearances.`,
    sources: [],
    categories: ["thinking frameworks"],
    tags: ["type:framework","topic:philosophy","phase:analysis"],
    related: ["causal-reasoning","systems-thinking"],
    status: "verified",
    notes: "Used in social sciences, complex systems analysis."
  },

  // --- Emotional Thinking Frameworks ---
  {
    slug: "golemans-ei-framework",
    term: "Goleman’s EI Framework",
    aliases: ["emotional intelligence framework","ei framework"],
    definition: `Defines EI via **self-awareness**, **self-regulation**, **motivation**, **empathy**, and **social skills**; links emotion to performance and leadership.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:framework","topic:emotion","phase:education"],
    related: ["mayer-salovey-four-branch-model","social-intuition-model","affective-reasoning"],
    status: "verified",
    notes: "Used in leadership, teams, personal growth."
  },
  {
    slug: "mayer-salovey-four-branch-model",
    term: "Mayer and Salovey’s Four-Branch Model",
    aliases: ["four-branch model of ei"],
    definition: `Conceptualizes EI as **perceiving**, **using**, **understanding**, and **managing** emotions, emphasizing ability-based assessment.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:framework","topic:emotion","phase:education"],
    related: ["golemans-ei-framework","empathic-accuracy-model","emotional-aperture-measure"],
    status: "verified",
    notes: "Applied in education, therapy, conflict resolution."
  },
  {
    slug: "compassion-focused-therapy-cft",
    term: "Compassion Focused Therapy (CFT)",
    aliases: ["cft"],
    definition: `Therapeutic approach cultivating self-compassion and compassionate reasoning to reduce shame and improve mental health.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:framework","topic:therapy","phase:practice"],
    related: ["nonviolent-communication-nvc","affective-reasoning"],
    status: "verified",
    notes: "Used in psychotherapy, stress management."
  },
  {
    slug: "nonviolent-communication-nvc",
    term: "Nonviolent Communication (NVC)",
    aliases: ["nvc"],
    definition: `Communication process emphasizing observation, feelings, needs, and requests to foster empathy and clarity.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:framework","topic:communication","phase:practice"],
    related: ["compassion-focused-therapy-cft","empathic-accuracy-model"],
    status: "verified",
    notes: "Applied in mediation, counseling, relationships."
  },
  {
    slug: "emotional-contagion-theory",
    term: "Emotional Contagion Theory",
    aliases: [],
    definition: `Studies how people “catch” emotions from others, highlighting the spread and management of affect in groups.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:theory","topic:emotion","phase:analysis"],
    related: ["emotional-aperture-measure","golemans-ei-framework"],
    status: "verified",
    notes: "Relevant to org behavior, marketing, PR."
  },
  {
    slug: "affective-reasoning",
    term: "Affective Reasoning",
    aliases: [],
    definition: `Decision making guided primarily by feelings, mood, or affective appraisals rather than purely objective criteria.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:concept","topic:emotion","phase:ideation"],
    related: ["social-intuition-model","barrett-constructed-emotion"],
    status: "verified",
    notes: "Seen in design, service, arts."
  },
  {
    slug: "social-intuition-model",
    term: "Social Intuition Model",
    aliases: [],
    definition: `Proposes that many social/moral judgments arise from fast intuitive emotions, with reasoning often post-hoc.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:model","topic:emotion","phase:analysis"],
    related: ["affective-reasoning","golemans-ei-framework"],
    status: "verified",
    notes: "Used in social psychology, marketing, HR."
  },
  {
    slug: "empathic-accuracy-model",
    term: "Empathic Accuracy Model",
    aliases: [],
    definition: `Focuses on accurately inferring others’ thoughts and feelings; depends on cues, motivation, and skill.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:model","topic:empathy","phase:analysis"],
    related: ["golemans-ei-framework","nonviolent-communication-nvc"],
    status: "verified",
    notes: "Used in communication, therapy, negotiation."
  },
  {
    slug: "emotional-aperture-measure",
    term: "Emotional Aperture Measure",
    aliases: [],
    definition: `Assesses the ability to perceive **collective** emotions in groups (not just individuals) to guide leadership decisions.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:measure","topic:emotion","phase:evaluation"],
    related: ["emotional-contagion-theory","mayer-salovey-four-branch-model"],
    status: "verified",
    notes: "Used in team dynamics and org development."
  },
  {
    slug: "barrett-constructed-emotion",
    term: "Barrett’s Theory of Constructed Emotion",
    aliases: ["constructed emotion theory"],
    definition: `Argues emotions are constructed from core affect and conceptual knowledge, varying by context and culture rather than being universal.`,
    sources: [],
    categories: ["emotional thinking frameworks"],
    tags: ["type:theory","topic:emotion","phase:analysis"],
    related: ["affective-reasoning","social-intuition-model"],
    status: "verified",
    notes: "Applied in cross-cultural comms and AI emotion recognition."
  }
);

GLOSSARY.push(
  // --- Innovative Thinking Models/Structures ---
  {
    slug: "non-linear-dynamic-reasoning",
    term: "Non-Linear Dynamic Reasoning",
    aliases: [],
    definition: `Reasoning that follows cyclical or networked paths (rather than strictly sequential), reflecting complex systems dynamics.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:reasoning","topic:systems","phase:ideation"],
    related: ["systems-thinking","holistic-reasoning","chaotic-thinking"],
    status: "verified",
    notes: "Used in ecology, economics, systems theory; aligns with associative styles."
  },
  {
    slug: "multidimensional-pattern-recognition",
    term: "Multidimensional Pattern Recognition",
    aliases: [],
    definition: `Recognizing patterns across multiple dimensions/scales simultaneously, beyond typical human sensory or cognitive limits.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:reasoning","topic:pattern","phase:analysis"],
    related: ["pattern-based-reasoning","computational-thinking"],
    status: "verified",
    notes: "Useful for AGI research and high-dimensional data analysis."
  },
  {
    slug: "fractal-thought-processes",
    term: "Fractal Thought Processes",
    aliases: [],
    definition: `Applying fractal principles (self-similarity, scale invariance) so ideas/solutions repeat patterns at multiple levels.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:reasoning","topic:pattern","phase:ideation"],
    related: ["non-linear-dynamic-reasoning","design-thinking"],
    status: "verified",
    notes: "Useful in creative industries, architecture, strategy."
  },
  {
    slug: "quantum-cognitive-models",
    term: "Quantum Cognitive Models",
    aliases: [],
    definition: `Reasoning inspired by quantum principles (e.g., superposition, entanglement) for simultaneous consideration of alternatives.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:model","topic:quantum","phase:research"],
    related: ["quantum-reasoning","probabilistic-reasoning"],
    status: "verified",
    notes: "For uncertainty, AGI cognition, theoretical research."
  },
  {
    slug: "context-fluid-reasoning",
    term: "Context Fluid Reasoning",
    aliases: [],
    definition: `Reasoning where context and relevance dynamically reshape interpretation and strategy beyond fixed rules.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:reasoning","topic:context","phase:prompting"],
    related: ["context-dependent-reasoning","contextual-adjustment"],
    status: "verified",
    notes: "Adaptive AI, personalized learning, neurocognitive research."
  },
  {
    slug: "emotional-algorithmic-reasoning",
    term: "Emotional Algorithmic Reasoning",
    aliases: [],
    definition: `Integrating emotional signals into algorithmic processes to inform judgments while abstracting human affect for AI use.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:reasoning","topic:emotion","phase:research"],
    related: ["golemans-ei-framework","affective-reasoning"],
    status: "verified",
    notes: "For AI empathy and HCI; useful with neurodivergent perspectives."
  },
  {
    slug: "hybrid-intuitive-logical-models",
    term: "Hybrid Intuitive-Logical Models",
    aliases: [],
    definition: `Structured combination of intuitive and analytic modes, allowing flexible switching between them.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:model","topic:cognition","phase:ideation"],
    related: ["heuristic-systematic-model","intuitive-reasoning","deductive-reasoning"],
    status: "verified",
    notes: "Decision frameworks, education, human-like AI decision making."
  },
  {
    slug: "adaptive-recursive-thinking",
    term: "Adaptive Recursive Thinking",
    aliases: [],
    definition: `Continuously re-entering and updating prior steps (recursion) to refine plans as new information arrives.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:reasoning","topic:iteration","phase:prompting"],
    related: ["iterative-refinement","plan-and-solve-p-s"],
    status: "verified",
    notes: "Good for rapid-change environments; aligns with iterative styles."
  },
  {
    slug: "symbiotic-reasoning-systems",
    term: "Symbiotic Reasoning Systems",
    aliases: [],
    definition: `Cooperative reasoning between humans and AIs, leveraging complementary strengths.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:model","topic:human-ai","phase:design"],
    related: ["transactive-reasoning","the-collaborative-partner"],
    status: "verified",
    notes: "Collaborative AI, team dynamics, inclusive design."
  },
  {
    slug: "parallel-contextual-reasoning",
    term: "Parallel Contextual Reasoning",
    aliases: [],
    definition: `Simultaneously processing multiple contexts or rule-sets and reconciling them during decision making.`,
    sources: [],
    categories: ["innovative thinking models/structures"],
    tags: ["type:reasoning","topic:context","phase:analysis"],
    related: ["parallel-reasoning","domain-priming"],
    status: "verified",
    notes: "Scenario planning; AI operating across diverse cultures."
  },

  // --- Divergent & Creative Thinking/Reasoning Models ---
  {
    slug: "associative-thinking",
    term: "Associative Thinking",
    aliases: [],
    definition: `Making connections between seemingly unrelated concepts to produce novel combinations and ideas.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:creativity","phase:ideation"],
    related: ["analogical-reasoning","lateral-thinking","divergent-thinking"],
    status: "verified",
    notes: "Useful in arts, invention, marketing, interdisciplinarity."
  },
  {
    slug: "pattern-based-reasoning",
    term: "Pattern-Based Reasoning",
    aliases: [],
    definition: `Identifying and analyzing patterns/anomalies to understand complex systems and predict outcomes.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:pattern","phase:analysis"],
    related: ["multidimensional-pattern-recognition","logical-mathematical-exploration"],
    status: "verified",
    notes: "Data analysis, cryptography, composition, physics."
  },
  {
    slug: "visual-spatial-thinking",
    term: "Visual-Spatial Thinking",
    aliases: [],
    definition: `Thinking in images and spatial relations; mentally manipulating forms and layouts.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:spatial","phase:ideation"],
    related: ["spatial-reasoning","design-thinking"],
    status: "verified",
    notes: "Architecture, engineering, graphics, VR."
  },
  {
    slug: "context-dependent-reasoning",
    term: "Context-Dependent Reasoning",
    aliases: [],
    definition: `Reasoning strongly shaped by situational context and nuance.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:context","phase:analysis"],
    related: ["context-fluid-reasoning","domain-priming"],
    status: "verified",
    notes: "Social sciences, UX, cultural studies."
  },
  {
    slug: "divergent-thinking",
    term: "Divergent Thinking",
    aliases: [],
    definition: `Generating many distinct ideas/solutions; exploring alternative perspectives widely.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:creativity","phase:ideation"],
    related: ["associative-thinking","lateral-thinking","speculative-thinking"],
    status: "verified",
    notes: "Brainstorming, creative writing, innovation workshops."
  },
  {
    slug: "hyper-focusing-ability",
    term: "Hyper-Focusing Ability",
    aliases: [],
    definition: `Sustained, intense focus on a narrow subject enabling deep dives and detailed work.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:ability","topic:attention","phase:analysis"],
    related: ["iterative-refinement","integrated-reasoning"],
    status: "verified",
    notes: "Helpful in research, software, arts."
  },
  {
    slug: "logical-mathematical-exploration",
    term: "Logical-Mathematical Exploration",
    aliases: [],
    definition: `Exploring numerical and logical structures to model and explain phenomena.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:logic","phase:analysis"],
    related: ["pattern-based-reasoning","computational-reasoning"],
    status: "verified",
    notes: "Math, programming, scientific research."
  },
  // NOTE: "Emotional Reasoning" overlaps with existing "Affective Reasoning".
  // Prefer treating it as an alias of that canonical entry rather than a duplicate.
  {
    slug: "intuitive-problem-solving",
    term: "Intuitive Problem Solving",
    aliases: [],
    definition: `Relying on gut sense or rapid holistic judgment to act without full analytical steps.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:intuition","phase:ideation"],
    related: ["intuitive-reasoning","heuristic-systematic-model"],
    status: "verified",
    notes: "Entrepreneurship, emergency response, strategy."
  },
  {
    slug: "lateral-thinking",
    term: "Lateral Thinking",
    aliases: [],
    definition: `Indirect, creative approaches that reframe problems to reveal non-obvious solutions.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:technique","topic:creativity","phase:ideation"],
    related: ["divergent-thinking","associative-thinking"],
    status: "verified",
    notes: "Marketing, product, creative writing."
  },
  {
    slug: "intertextual-thinking",
    term: "Intertextual Thinking",
    aliases: [],
    definition: `Drawing connections between texts/works/ideas to create meaning across references.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:literary","phase:ideation"],
    related: ["mythopoetic-thinking","dialogic-thinking"],
    status: "verified",
    notes: "Literary analysis, film, intercultural comms."
  },
  {
    slug: "rhizomatic-thinking",
    term: "Rhizomatic Thinking",
    aliases: [],
    definition: `Non-hierarchical, non-linear exploration where ideas spread in many directions (rhizome metaphor).`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:model","topic:philosophy","phase:ideation"],
    related: ["non-linear-dynamic-reasoning","chaotic-thinking"],
    status: "verified",
    notes: "Educational theory, org structures, philosophy."
  },
  {
    slug: "synesthetic-thinking",
    term: "Synesthetic Thinking",
    aliases: [],
    definition: `Linking or blending sensory modalities (e.g., seeing sounds) to inspire associations and designs.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:ability","topic:senses","phase:ideation"],
    related: ["associative-thinking","biomimetic-thinking"],
    status: "verified",
    notes: "Art/design, composition, branding."
  },
  {
    slug: "chaotic-thinking",
    term: "Chaotic Thinking",
    aliases: [],
    definition: `Finding structure and insight in disorder or unpredictability; embracing non-linearity.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:complexity","phase:ideation"],
    related: ["non-linear-dynamic-reasoning","speculative-thinking"],
    status: "verified",
    notes: "Entrepreneurship, emergency mgmt, arts."
  },
  {
    slug: "transliminal-thinking",
    term: "Transliminal Thinking",
    aliases: [],
    definition: `Crossing thresholds of consciousness to access unusual associations or insights.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:consciousness","phase:ideation"],
    related: ["reflective-reasoning","speculative-thinking"],
    status: "verified",
    notes: "Creativity studies, psychotherapy, meditation."
  },
  {
    slug: "polymathic-thinking",
    term: "Polymathic Thinking",
    aliases: [],
    definition: `Integrating knowledge across many disciplines to tackle problems broadly and flexibly.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:integration","phase:ideation"],
    related: ["cross-domain-reasoning","interdisciplinary-reasoning"],
    status: "verified",
    notes: "R&D, innovation labs, education."
  },
  {
    slug: "morphological-analysis",
    term: "Morphological Analysis",
    aliases: [],
    definition: `Systematically decomposing parameters into all possible combinations and examining outcomes.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:technique","topic:problem-solving","phase:ideation"],
    related: ["design-thinking","root-cause-analysis"],
    status: "verified",
    notes: "Strategy, product innovation, complex problems."
  },
  {
    slug: "dialogic-thinking",
    term: "Dialogic Thinking",
    aliases: [],
    definition: `Using dialogue (internal or with others) to probe assumptions and develop ideas collaboratively.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:technique","topic:collaboration","phase:ideation"],
    related: ["socratic-questioning","transactive-reasoning"],
    status: "verified",
    notes: "Education, conflict resolution, projects."
  },
  {
    slug: "mythopoetic-thinking",
    term: "Mythopoetic Thinking",
    aliases: [],
    definition: `Employing myths, metaphors, and stories to frame meaning and guide action.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:narrative","phase:ideation"],
    related: ["narrative-reasoning","intertextual-thinking"],
    status: "verified",
    notes: "Brand storytelling, psychotherapy, cultural studies."
  },
  {
    slug: "biomimetic-thinking",
    term: "Biomimetic Thinking",
    aliases: [],
    definition: `Deriving solutions from biological forms, processes, and ecosystems.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:technique","topic:nature","phase:ideation"],
    related: ["design-thinking","systems-thinking"],
    status: "verified",
    notes: "Sustainable design, architecture, engineering."
  },
  {
    slug: "reflexive-thinking",
    term: "Reflexive Thinking",
    aliases: [],
    definition: `Critically examining one’s own beliefs and values as part of reasoning.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:metacognition","phase:evaluation"],
    related: ["reflective-reasoning","reflective-practice"],
    status: "verified",
    notes: "Personal development, ethics, leadership."
  },
  {
    slug: "constructivist-thinking",
    term: "Constructivist Thinking",
    aliases: [],
    definition: `Constructing meaning from individual experiences and perspectives rather than fixed truths.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:model","topic:education","phase:ideation"],
    related: ["interdisciplinary-reasoning","critical-realism"],
    status: "verified",
    notes: "Educational methods, social sciences."
  },
  {
    slug: "multivalent-thinking",
    term: "Multivalent Thinking",
    aliases: [],
    definition: `Embracing ambiguity and multiple valid interpretations or solutions simultaneously.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:ambiguity","phase:ideation"],
    related: ["speculative-thinking","rhizomatic-thinking"],
    status: "verified",
    notes: "Poetry, visual arts, philosophy."
  },
  {
    slug: "speculative-thinking",
    term: "Speculative Thinking",
    aliases: [],
    definition: `Imagining futures and possibilities beyond current constraints to explore options and risks.`,
    sources: [],
    categories: ["divergent & creative thinking/reasoning models"],
    tags: ["type:reasoning","topic:futures","phase:ideation"],
    related: ["divergent-thinking","scenario-planning","design-thinking"],
    status: "verified",
    notes: "Futurism, scenario planning, speculative fiction."
  }
);

GLOSSARY.push(
  // --- Non-Traditional Thinking Models ---
  {
    slug: "paradoxical-thinking",
    term: "Paradoxical Thinking",
    aliases: [],
    definition: `Deliberately embracing contradictions or tensions to surface novel solutions that can defy conventional logic.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:reasoning","topic:creativity","phase:ideation"],
    related: ["multivalent-thinking","lateral-thinking","chaotic-thinking"],
    status: "verified",
    notes: "Applied in creative problem solving, philosophy, innovative design."
  },
  {
    slug: "magical-thinking",
    term: "Magical Thinking",
    aliases: [],
    definition: `Attributing causal relationships without logical basis, often grounded in superstition or cultural belief.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:reasoning","topic:culture","phase:ideation"],
    related: ["mythopoetic-thinking","speculative-thinking"],
    status: "verified",
    notes: "Used in art/lit, advertising, therapy exploration."
  },
  {
    slug: "circular-reasoning",
    term: "Circular Reasoning",
    aliases: ["begging the question"],
    definition: `A loop where the conclusion is assumed in a premise; persuasive rhetorically but invalid logically.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:fallback","topic:logic","phase:analysis"],
    related: ["argument-mapping","socratic-questioning"],
    status: "verified",
    notes: "Sometimes used stylistically in narratives/comedy."
  },
  {
    slug: "absurdist-reasoning",
    term: "Absurdist Reasoning",
    aliases: [],
    definition: `Engaging with the irrational/meaningless to expose assumptions and explore existential questions.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:reasoning","topic:philosophy","phase:ideation"],
    related: ["surreal-reasoning","chaotic-thinking"],
    status: "verified",
    notes: "Theater, literature, coping frameworks."
  },
  {
    slug: "dream-logic",
    term: "Dream Logic",
    aliases: [],
    definition: `Illogical, fluid, associative links resembling dreams; invokes symbolism and non-linear jumps.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:reasoning","topic:subconscious","phase:ideation"],
    related: ["transliminal-thinking","synesthetic-thinking","surreal-reasoning"],
    status: "verified",
    notes: "Used in creative arts, psychoanalysis, brainstorming."
  },
  {
    slug: "anarchic-thinking",
    term: "Anarchic Thinking",
    aliases: [],
    definition: `Rejecting established rules/systems in favor of spontaneous, individualistic decisions.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:stance","topic:culture","phase:ideation"],
    related: ["chaotic-thinking","rhizomatic-thinking"],
    status: "verified",
    notes: "Seen in social movements, avant-garde arts, disruptive startups."
  },
  {
    slug: "surreal-reasoning",
    term: "Surreal Reasoning",
    aliases: [],
    definition: `Juxtaposing unrelated elements in unexpected ways to challenge perception and unlock subconscious associations.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:reasoning","topic:surrealism","phase:ideation"],
    related: ["dream-logic","mythopoetic-thinking","synesthetic-thinking"],
    status: "verified",
    notes: "Surrealist art/lit, inventive marketing, depth psychology."
  },
  {
    slug: "recursive-thinking",
    term: "Recursive Thinking",
    aliases: [],
    definition: `Applying a rule/process to its own results repeatedly; powerful in computing but can yield paradoxes cognitively.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:technique","topic:iteration","phase:analysis"],
    related: ["adaptive-recursive-thinking","plan-and-solve-p-s","argument-mapping"],
    status: "verified",
    notes: "Math paradoxes, programming, conceptual art."
  },
  {
    slug: "syncretic-thinking",
    term: "Syncretic Thinking",
    aliases: [],
    definition: `Merging disparate beliefs or systems—often without strict logical consistency—to form new hybrids.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:reasoning","topic:integration","phase:ideation"],
    related: ["cross-domain-reasoning","interdisciplinary-reasoning"],
    status: "verified",
    notes: "Cultural studies, eclectic therapy, new movements."
  },
  {
    slug: "mimetic-thinking",
    term: "Mimetic Thinking",
    aliases: [],
    definition: `Imitating mental models or behaviors from external sources (people, memes, trends) without deep analysis.`,
    sources: [],
    categories: ["non-traditional thinking models"],
    tags: ["type:reasoning","topic:social","phase:ideation"],
    related: ["intertextual-thinking","dialogic-thinking"],
    status: "verified",
    notes: "Performance arts, social learning, viral marketing."
  },

  // --- AI Behavior & Core ML/LLM Terms ---
  {
    slug: "ai-behavior",
    term: "AI Behavior",
    aliases: [],
    definition: `Observable patterns in how AI systems respond to inputs, including strengths, limitations, biases, and failure modes.`,
    sources: [
      { title: "Mozilla AI Guide – AI Basics", url: "https://ai-guide.future.mozilla.org/content/ai-basics/" }
    ],
    categories: ["ai behavior","ml fundamentals"],
    tags: ["type:concept","topic:ai","phase:analysis"],
    related: ["failure-modes","content-safeguards","addressing-biases-and-ethical-concerns"],
    status: "verified",
    notes: ""
  },
  {
    slug: "model-architecture",
    term: "Model Architecture",
    aliases: [],
    definition: `The arrangement of layers, connections, and operations in a model that governs data flow and computation.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:ml","phase:training"],
    related: ["layer","depth","neural-network","language-model"],
    status: "verified",
    notes: ""
  },
  // NOTE: Duplicate with earlier "Artificial Intelligence (AI)". Keep but mark merge candidate.
  {
    slug: "artificial-intelligence-ai-dup",
    term: "Artificial Intelligence (AI)",
    aliases: [],
    definition: `Field aiming to create systems capable of intelligent behavior (reasoning, learning, perception, language).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:ai","phase:overview"],
    related: ["machine-learning-ml","natural-language-processing-nlp","large-language-model-llm"],
    status: "duplicate_candidate",
    notes: "Duplicate of existing AI entry; merge slugs if desired."
  },
  {
    slug: "natural-language-processing-nlp",
    term: "Natural Language Processing (NLP)",
    aliases: ["nlp"],
    definition: `Subfield of AI focused on enabling computers to understand, interpret, and generate human language.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:domain","topic:nlp","phase:overview"],
    related: ["language-model","large-language-model-llm","tokenization"],
    status: "verified",
    notes: ""
  },
  // NOTE: Duplicate with earlier ML basic definition; keep but mark merge candidate if needed.
  {
    slug: "machine-learning-ml",
    term: "Machine Learning (ML)",
    aliases: ["ml"],
    definition: `AI approach where models learn patterns from data to make predictions/decisions without explicit rules.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:ml","phase:overview"],
    related: ["deep-learning","optimization","overfitting"],
    status: "verified",
    notes: "Duplicate of earlier ML entry if present."
  },
  {
    slug: "large-language-model-llm",
    term: "Large Language Model (LLM)",
    aliases: ["llm"],
    definition: `A language model trained on large corpora with high-capacity architectures, capable of many language tasks (e.g., generation, QA, translation).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:model","topic:llm","phase:overview"],
    related: ["language-model","generative-pre-trained-transformer-gpt","context-window-selection","embedding"],
    status: "verified",
    notes: "Usage note: trend toward smaller specialized models alongside large general LLMs."
  },
  {
    slug: "sota-llms",
    term: "SOTA (State of the Art) LLMs",
    aliases: [],
    definition: `The most capable publicly known LLMs at a point in time across benchmarks and practical performance.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:label","topic:benchmarks","phase:evaluation"],
    related: ["bleu-scores","intrinsic-evaluation","extrinsic-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "language-model",
    term: "Language Model",
    aliases: [],
    definition: `A model that assigns probabilities to sequences of tokens and can generate or score text continuations.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:model","topic:nlp","phase:overview"],
    related: ["tokenization","embedding","decoding"],
    status: "verified",
    notes: ""
  },
  {
    slug: "model",
    term: "Model",
    aliases: [],
    definition: `A parameterized function (often a neural network) trained to perform a specific task.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:ml","phase:overview"],
    related: ["neural-network","optimization","loss-function"],
    status: "verified",
    notes: ""
  },
  {
    slug: "generative-pre-trained-transformer-gpt",
    term: "Generative Pre-trained Transformer (GPT)",
    aliases: ["gpt"],
    definition: `Transformer-based model family pre-trained on large corpora and adapted for generation and instruction-following tasks.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:model","topic:transformer","phase:overview"],
    related: ["attention-mechanisms","decoding","context-window-selection"],
    status: "verified",
    notes: ""
  },
  {
    slug: "tokenization",
    term: "Tokenization",
    aliases: [],
    definition: `Splitting text into tokens (often subwords via BPE or similar), forming the discrete units a model processes.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:nlp","phase:preprocessing"],
    related: ["embedding","de-tokenization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "context-window-selection",
    term: "Context Window Selection",
    aliases: ["context window"],
    definition: `The subset of tokens considered at inference time; long prompts may need truncation or chunking to fit limits.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:constraint","topic:llm","phase:prompting"],
    related: ["prompt-cognitive-overload","structured-data-input","delimiter-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "embedding",
    term: "Embedding",
    aliases: [],
    definition: `Mapping tokens to dense vectors capturing semantic/syntactic properties for computation and retrieval.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:representation","topic:embedding","phase:training"],
    related: ["vector-space","vector-store"],
    status: "verified",
    notes: ""
  },
  {
    slug: "forward-pass",
    term: "Forward Pass",
    aliases: [],
    definition: `Propagation of inputs through model layers (e.g., Transformer blocks) to compute outputs.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:nn","phase:training"],
    related: ["attention-mechanisms","gradient","loss-function"],
    status: "verified",
    notes: ""
  },
  {
    slug: "attention-mechanisms",
    term: "Attention Mechanisms",
    aliases: ["self-attention"],
    definition: `Mechanisms that weight token interactions to focus computation on the most relevant context.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:mechanism","topic:transformer","phase:training"],
    related: ["selective-parsing","generative-pre-trained-transformer-gpt"],
    status: "verified",
    notes: ""
  },
  {
    slug: "selective-parsing",
    term: "Selective Parsing",
    aliases: [],
    definition: `Informal notion that models “focus” on salient parts of inputs via attention/embeddings to guide outputs.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:transformer","phase:inference"],
    related: ["attention-mechanisms","embedding"],
    status: "verified",
    notes: "Not a formal technical term; conceptual description."
  },
  {
    slug: "probability-distribution",
    term: "Probability Distribution",
    aliases: [],
    definition: `The predicted next-token probability vector over the vocabulary given the current context.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:math","topic:inference","phase:inference"],
    related: ["token-sampling","decoding"],
    status: "verified",
    notes: ""
  },
  {
    slug: "token-sampling",
    term: "Token Sampling",
    aliases: [],
    definition: `Choosing a token from the next-token distribution (e.g., greedy, temperature, top-k/top-p).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:decoding","phase:inference"],
    related: ["decoding","temperature-topk-sampling"],
    status: "verified",
    notes: ""
  },
  {
    slug: "decoding",
    term: "Decoding",
    aliases: [],
    definition: `Converting model probabilities into text by iteratively sampling/choosing tokens until a stop condition.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:inference","phase:inference"],
    related: ["token-sampling","de-tokenization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "de-tokenization",
    term: "De-Tokenization",
    aliases: ["detokenization"],
    definition: `Reconstructing human-readable text from token IDs, removing special tokens and joining subwords.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:nlp","phase:postprocessing"],
    related: ["tokenization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "output-generation",
    term: "Output Generation",
    aliases: [],
    definition: `The end-to-end process of iterative decoding to produce the final text response.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:inference","phase:inference"],
    related: ["decoding","token-sampling"],
    status: "verified",
    notes: ""
  },
  {
    slug: "vector-space",
    term: "Vector Space",
    aliases: [],
    definition: `Mathematical space where embeddings live; distances/angles encode relationships among tokens or documents.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:representation","topic:embedding","phase:training"],
    related: ["embedding","vector-store","blackbox"],
    status: "verified",
    notes: ""
  },
  {
    slug: "blackbox",
    term: "Blackbox",
    aliases: [],
    definition: `Colloquial reference to opaque internal representations/behaviors not directly interpretable by humans.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:interpretability","phase:analysis"],
    related: ["vector-space","hallucinations","failure-modes"],
    status: "verified",
    notes: ""
  },
  {
    slug: "vector-store",
    term: "Vector Store",
    aliases: [],
    definition: `A datastore for vectors enabling similarity search/recall; in SIMD context, also an instruction writing a vector to memory.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:infrastructure","topic:retrieval","phase:implementation"],
    related: ["retrieval-augmented-generation-rag","embedding"],
    status: "verified",
    notes: ""
  },
  {
    slug: "rules-injector",
    term: "Rules Injector",
    aliases: [],
    definition: `A component that dynamically inserts or updates rules/policies in a system to modify behavior without redeploy.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:component","topic:governance","phase:implementation"],
    related: ["content-safeguards","constraint-application"],
    status: "verified",
    notes: ""
  },
  {
    slug: "thread",
    term: "Thread",
    aliases: [],
    definition: `A single sequence of executable instructions within a process; enables concurrency and async work.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:systems","topic:computing","phase:implementation"],
    related: ["parallel-reasoning","parallel-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "hallucinations",
    term: "Hallucinations",
    aliases: ["model hallucination"],
    definition: `Model outputs that are ungrounded or incorrect relative to facts/context; occasionally used to describe unexpected creative outputs.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:failure","topic:llm","phase:evaluation"],
    related: ["fact-check-prompting","retrieval-augmented-generation-rag","failure-modes"],
    status: "verified",
    notes: ""
  },
  {
    slug: "fine-tune-model",
    term: "Fine-Tune Model",
    aliases: ["fine-tuning"],
    definition: `Adapting a pre-trained model to a narrower task/domain via additional training on curated data.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:training","phase:training"],
    related: ["curated-data-training","distilled-model"],
    status: "verified",
    notes: ""
  },
  {
    slug: "retrieval-augmented-generation-rag",
    term: "Retrieval-Augmented Generation (RAG)",
    aliases: ["rag"],
    definition: `Framework that retrieves external knowledge at inference to ground generation in up-to-date, factual sources.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:framework","topic:retrieval","phase:inference"],
    related: ["vector-store","rat-retrieval-augmented-thoughts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "curated-data-training",
    term: "Curated Data Training",
    aliases: [],
    definition: `Training on carefully selected, cleaned, and relevant data to improve quality and task fit.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:data","phase:training"],
    related: ["fine-tune-model","overfitting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "distilled-model",
    term: "Distilled Model",
    aliases: ["knowledge distillation"],
    definition: `A compact “student” model trained to mimic a larger “teacher” model’s behavior/performance.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:compression","phase:training"],
    related: ["optimization","sota-llms"],
    status: "verified",
    notes: ""
  },
  {
    slug: "stereotypical-imprints",
    term: "Stereotypical Imprints",
    aliases: [],
    definition: `Biases absorbed from training data that can be reproduced or amplified by models.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:risk","topic:bias","phase:evaluation"],
    related: ["bias-mitigation","addressing-biases-and-ethical-concerns","content-safeguards"],
    status: "verified",
    notes: ""
  },
  {
    slug: "bleu-scores",
    term: "Bleu scores",
    aliases: ["bleu"],
    definition: `Automatic metric for MT quality that compares n-grams of candidate translations to references.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:metric","topic:benchmarks","phase:evaluation"],
    related: ["intrinsic-evaluation","extrinsic-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "computer-vision-cv",
    term: "Computer Vision (CV)",
    aliases: ["cv"],
    definition: `Field focused on understanding information from images/video via automated processing.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:domain","topic:vision","phase:overview"],
    related: ["multimodal-reasoning"],
    status: "verified",
    notes: ""
  },
  {
    slug: "content-safeguards",
    term: "Content Safeguards",
    aliases: [],
    definition: `Strategies to reduce harmful/unsafe outputs (filters, policy prompts, classifiers, human review).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:control","topic:safety","phase:deployment"],
    related: ["rules-injector","bias-mitigation","failure-modes"],
    status: "verified",
    notes: ""
  },
  {
    slug: "convergence",
    term: "Convergence",
    aliases: [],
    definition: `State where further training yields marginal improvement—often indicated by plateaued loss/metrics.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:signal","topic:optimization","phase:training"],
    related: ["loss-function","optimization","gradient"],
    status: "verified",
    notes: ""
  },
  {
    slug: "data-ml",
    term: "Data",
    aliases: [],
    definition: `Inputs/labels or evaluation sets used to train and assess models.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:resource","topic:data","phase:training"],
    related: ["curated-data-training","intrinsic-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "data-driven",
    term: "Data-driven",
    aliases: [],
    definition: `Decision-making or processes guided primarily by empirical data and analysis.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:approach","topic:data","phase:analysis"],
    related: ["extrinsic-evaluation","intrinsic-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "deep-learning",
    term: "Deep Learning",
    aliases: [],
    definition: `Machine learning using deep neural networks with many layers for hierarchical representation learning.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:approach","topic:nn","phase:training"],
    related: ["neural-network","optimization","gradient"],
    status: "verified",
    notes: ""
  },
  {
    slug: "depth",
    term: "Depth",
    aliases: [],
    definition: `The number of layers in a neural network or model architecture.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:attribute","topic:nn","phase:training"],
    related: ["model-architecture","layer"],
    status: "verified",
    notes: ""
  },
  {
    slug: "domain-ml",
    term: "Domain",
    aliases: [],
    definition: `A grouping of data/tasks sharing characteristics (e.g., Wikipedia, legal contracts).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:data","phase:analysis"],
    related: ["domain-priming","fact-check-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "extrinsic-evaluation",
    term: "Extrinsic Evaluation",
    aliases: [],
    definition: `Assessing model impact on a broader task/system (downstream performance, user outcomes).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:metric","topic:evaluation","phase:evaluation"],
    related: ["intrinsic-evaluation","bleu-scores"],
    status: "verified",
    notes: ""
  },
  {
    slug: "function-ml",
    term: "Function",
    aliases: [],
    definition: `A mapping from inputs to outputs; in ML, typically parameterized with learnable weights.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:math","topic:ml","phase:training"],
    related: ["model","loss-function"],
    status: "verified",
    notes: ""
  },
  {
    slug: "generative-ai-ml-dup",
    term: "Generative AI",
    aliases: [],
    definition: `Models that produce complex data types (text, images, audio, code) from learned distributions.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:approach","topic:genai","phase:overview"],
    related: ["large-language-model-llm","decoding"],
    status: "duplicate_candidate",
    notes: "Duplicate with earlier Generative AI entry; merge if desired."
  },
  {
    slug: "gradient",
    term: "Gradient",
    aliases: [],
    definition: `Vector of partial derivatives indicating how parameters should change to reduce loss.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:math","topic:optimization","phase:training"],
    related: ["optimization","loss-function"],
    status: "verified",
    notes: ""
  },
  {
    slug: "intrinsic-evaluation",
    term: "Intrinsic Evaluation",
    aliases: [],
    definition: `Measuring performance on test sets/benchmarks independent of application context.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:metric","topic:evaluation","phase:evaluation"],
    related: ["extrinsic-evaluation","bleu-scores"],
    status: "verified",
    notes: ""
  },
  {
    slug: "label",
    term: "Label",
    aliases: [],
    definition: `The target output for supervised learning given an input instance.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:data","topic:supervised","phase:training"],
    related: ["data-ml","intrinsic-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "layer",
    term: "Layer",
    aliases: [],
    definition: `A neural network submodule that transforms representations (e.g., attention, MLP).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:component","topic:nn","phase:training"],
    related: ["depth","model-architecture","neural-network"],
    status: "verified",
    notes: ""
  },
  {
    slug: "loss-function",
    term: "Loss Function",
    aliases: [],
    definition: `Objective comparing predictions to references (e.g., cross-entropy), minimized during training.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:math","topic:optimization","phase:training"],
    related: ["optimization","gradient"],
    status: "verified",
    notes: ""
  },
  {
    slug: "mappings",
    term: "Mappings",
    aliases: [],
    definition: `Specific pairings from inputs to outputs—useful for describing tasks and dataset structure.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:concept","topic:data","phase:design"],
    related: ["function-ml","label"],
    status: "verified",
    notes: ""
  },
  {
    slug: "neural-network",
    term: "Neural Network",
    aliases: ["nn"],
    definition: `A model composed of interconnected layers with learnable parameters, trained via gradient descent.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:model","topic:nn","phase:training"],
    related: ["deep-learning","layer","optimization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "optimization",
    term: "Optimization",
    aliases: [],
    definition: `Algorithms to adjust parameters (e.g., SGD, Adam) to minimize or maximize an objective.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:process","topic:optimization","phase:training"],
    related: ["gradient","loss-function"],
    status: "verified",
    notes: ""
  },
  {
    slug: "overfitting",
    term: "Overfitting",
    aliases: [],
    definition: `When a model memorizes training specifics and performs poorly on novel data.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:failure","topic:generalization","phase:evaluation"],
    related: ["curated-data-training","intrinsic-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "failure-modes",
    term: "Failure modes",
    aliases: [],
    definition: `Common ways a model fails (e.g., hallucinations, bias, brittle prompts, context overflow).`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:failure","topic:llm","phase:evaluation"],
    related: ["hallucinations","prompt-cognitive-overload","content-safeguards"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-cognitive-overload",
    term: "Prompt (Cognitive) Overload",
    aliases: ["prompt overload","cognitive overload"],
    definition: `When a prompt/architecture is overly complex or disorganized—exceeding context limits or obscuring structure—causing failures.`,
    sources: [],
    categories: ["ml fundamentals"],
    tags: ["type:failure","topic:prompting","phase:prompting"],
    related: ["delimiter-prompting","structured-data-input","repetitive-prompting","output-layering"],
    status: "verified",
    notes: "Includes too many injections, unclear examples/templates, or unscaffolded context."
  }
);

GLOSSARY.push(
  // --- Benchmarks & Evaluations (meta) ---
  {
    slug: "benchmarks-and-evaluations",
    term: "Benchmarks & Evaluations",
    aliases: ["evaluation benchmarks"],
    definition: `Methods, datasets, and metrics used to assess model capability, safety, robustness, calibration, and generalization.`,
    sources: [
      { title: "arXiv:2310.07641", url: "https://arxiv.org/pdf/2310.07641.pdf" },
      { title: "arXiv:2211.09110", url: "https://arxiv.org/pdf/2211.09110.pdf" },
      { title: "arXiv:2307.03109", url: "https://arxiv.org/pdf/2307.03109.pdf" },
      { title: "arXiv:1811.08186", url: "https://arxiv.org/pdf/1811.08186.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:category","topic:evaluation","phase:evaluation"],
    related: ["intrinsic-evaluation","extrinsic-evaluation","calibration","robustness"],
    status: "verified",
    notes: ""
  },

  // --- IRT / psychometrics concepts ---
  {
    slug: "item-response-theory-irt",
    term: "Item Response Theory (IRT)",
    aliases: ["irt"],
    definition: `Psychometric models that relate a latent trait (ability) to responses on items, enabling difficulty and discrimination estimation.`,
    sources: [
      { title: "arXiv:2310.07641", url: "https://arxiv.org/pdf/2310.07641.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:model","topic:psychometrics","phase:evaluation"],
    related: ["difficulty-and-discrimination","ability-irt","parameter-estimation-irt","accs-iccs","binary-and-continuous-models-irt"],
    status: "verified",
    notes: ""
  },
  {
    slug: "difficulty-and-discrimination",
    term: "Difficulty and Discrimination (IRT parameters)",
    aliases: [],
    definition: `Difficulty: how challenging an item is. Discrimination: how well an item separates entities of different ability.`,
    sources: [
      { title: "arXiv:2310.07641", url: "https://arxiv.org/pdf/2310.07641.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:psychometrics","phase:evaluation"],
    related: ["item-response-theory-irt","parameter-estimation-irt","accs-iccs"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ability-irt",
    term: "Ability (of a respondent)",
    aliases: ["latent ability"],
    definition: `Latent proficiency parameter inferred from responses under IRT models (human or AI system).`,
    sources: [
      { title: "arXiv:2310.07641", url: "https://arxiv.org/pdf/2310.07641.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:parameter","topic:psychometrics","phase:evaluation"],
    related: ["item-response-theory-irt","difficulty-and-discrimination"],
    status: "verified",
    notes: ""
  },
  {
    slug: "generality",
    term: "Generality",
    aliases: [],
    definition: `Extent to which a system performs consistently across diverse problems and difficulty ranges.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:generalization","phase:evaluation"],
    related: ["downstream-accuracy","robustness"],
    status: "verified",
    notes: ""
  },
  {
    slug: "accs-iccs",
    term: "Agent Characteristic Curves (ACCs) and Item Characteristic Curves (ICCs)",
    aliases: ["accs","iccs"],
    definition: `IRT-style curves: ACCs depict agent correctness vs. item difficulty; ICCs depict item response probability vs. ability.`,
    sources: [
      { title: "arXiv:2310.07641", url: "https://arxiv.org/pdf/2310.07641.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:visualization","topic:psychometrics","phase:evaluation"],
    related: ["item-response-theory-irt","difficulty-and-discrimination"],
    status: "verified",
    notes: ""
  },
  {
    slug: "parameter-estimation-irt",
    term: "Parameter Estimation (in IRT)",
    aliases: [],
    definition: `Estimating item parameters (difficulty, discrimination) and respondent ability from observed responses.`,
    sources: [
      { title: "arXiv:2310.07641", url: "https://arxiv.org/pdf/2310.07641.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:process","topic:psychometrics","phase:evaluation"],
    related: ["item-response-theory-irt","maximum-likelihood-estimation-mle"],
    status: "verified",
    notes: ""
  },
  {
    slug: "binary-and-continuous-models-irt",
    term: "Binary and Continuous Models (in IRT)",
    aliases: [],
    definition: `Binary models assume correct/incorrect responses; continuous models support graded or continuous scores.`,
    sources: [
      { title: "arXiv:2310.07641", url: "https://arxiv.org/pdf/2310.07641.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:model","topic:psychometrics","phase:evaluation"],
    related: ["item-response-theory-irt"],
    status: "verified",
    notes: ""
  },
  {
    slug: "maximum-likelihood-estimation-mle",
    term: "Maximum Likelihood Estimation (MLE)",
    aliases: ["mle"],
    definition: `Statistical method that chooses parameters maximizing the likelihood of observed data under the model.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:method","topic:statistics","phase:analysis"],
    related: ["parameter-estimation-irt","regularization-and-variance"],
    status: "verified",
    notes: ""
  },
  {
    slug: "regularization-and-variance",
    term: "Regularization and Variance",
    aliases: [],
    definition: `Regularization combats overfitting; variance measures performance variability across problems or samples.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:concept","topic:statistics","phase:evaluation"],
    related: ["intrinsic-evaluation","extrinsic-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "populational-vs-non-populational-metrics",
    term: "Populational vs. Non-Populational Metrics",
    aliases: [],
    definition: `Metrics that depend on the evaluated population (e.g., relative ranks) vs. absolute metrics independent of cohort.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:measurement","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- General evaluation concepts ---
  {
    slug: "calibration",
    term: "Calibration",
    aliases: [],
    definition: `Alignment between predicted probabilities and actual outcome frequencies.`,
    sources: [
      { title: "arXiv:2211.09110", url: "https://arxiv.org/pdf/2211.09110.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:uncertainty","phase:evaluation"],
    related: ["self-consistency","robustness"],
    status: "verified",
    notes: ""
  },
  {
    slug: "robustness",
    term: "Robustness",
    aliases: [],
    definition: `Stability of performance under perturbations (paraphrases, noise, adversarial inputs, domain shift).`,
    sources: [
      { title: "arXiv:2211.09110", url: "https://arxiv.org/pdf/2211.09110.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:property","topic:generalization","phase:evaluation"],
    related: ["generalization","promptbench","boss","glue-x"],
    status: "verified",
    notes: ""
  },
  {
    slug: "fairness",
    term: "Fairness",
    aliases: [],
    definition: `Degree to which outputs are unbiased and equitable across groups or scenarios.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:property","topic:safety","phase:evaluation"],
    related: ["performance-disparities","generative-harms","cvalues","trustgpt"],
    status: "verified",
    notes: ""
  },
  {
    slug: "performance-disparities",
    term: "Performance Disparities",
    aliases: [],
    definition: `Differences in model performance across demographics or distributions.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:safety","phase:evaluation"],
    related: ["fairness","generative-harms"],
    status: "verified",
    notes: ""
  },
  {
    slug: "generative-harms",
    term: "Generative Harms",
    aliases: [],
    definition: `Bias, toxicity, misinformation, or other negative externalities arising from generated content.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:risk","topic:safety","phase:evaluation"],
    related: ["toxicity-detection","disinformation","cvalues","trustgpt"],
    status: "verified",
    notes: ""
  },
  {
    slug: "memorization",
    term: "Memorization",
    aliases: [],
    definition: `Tendency to reproduce training data verbatim—raising privacy/copyright concerns.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:failure","topic:data","phase:evaluation"],
    related: ["upstream-perplexity","downstream-accuracy"],
    status: "verified",
    notes: ""
  },
  {
    slug: "disinformation",
    term: "Disinformation",
    aliases: [],
    definition: `Generation or detection of false content intended to mislead.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:risk","topic:safety","phase:evaluation"],
    related: ["generative-harms","safetybench"],
    status: "verified",
    notes: ""
  },
  {
    slug: "comprehensiveness",
    term: "Comprehensiveness",
    aliases: [],
    definition: `Thoroughness and detail of responses across scenarios and tasks.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:quality","phase:evaluation"],
    related: ["accuracy-eval","relevance-eval","fluency-eval"],
    status: "verified",
    notes: ""
  },

  // --- Prompt sensitivity / methodology ---
  {
    slug: "prompting-evaluation",
    term: "Prompting (as evaluation dimension)",
    aliases: [],
    definition: `Sensitivity of performance to prompt format, content, and presence/quality of examples.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:dimension","topic:prompting","phase:evaluation"],
    related: ["few-shot-learning","zero-shot-learning","self-consistency","multiple-choice-adaptation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "multiple-choice-adaptation",
    term: "Multiple Choice Adaptation",
    aliases: [],
    definition: `Evaluating performance on MC tasks by standardizing how scenarios are adapted into prompts/options.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:method","topic:evaluation","phase:evaluation"],
    related: ["prompting-evaluation","mmlu","arb"],
    status: "verified",
    notes: ""
  },
  {
    slug: "upstream-perplexity",
    term: "Upstream Perplexity",
    aliases: [],
    definition: `Language modeling quality (perplexity) used to probe whether early training performance predicts downstream accuracy.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:lm","phase:training"],
    related: ["downstream-accuracy"],
    status: "verified",
    notes: ""
  },
  {
    slug: "downstream-accuracy",
    term: "Downstream Accuracy",
    aliases: [],
    definition: `Performance on applied tasks (classification, QA, etc.) after LM pretraining.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:tasks","phase:evaluation"],
    related: ["upstream-perplexity","generality"],
    status: "verified",
    notes: ""
  },
  {
    slug: "model-scale-trends",
    term: "Model Scale Trends",
    aliases: [],
    definition: `Empirical relationships between parameter count/training data and task performance or emergent abilities.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:observation","topic:scaling","phase:analysis"],
    related: ["sota-llms","downstream-accuracy"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-based-evaluation",
    term: "Prompt-based Evaluation",
    aliases: [],
    definition: `Assessing models by posing prompts and scoring generated responses instead of training task-specific heads.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:method","topic:prompting","phase:evaluation"],
    related: ["zero-shot-learning","few-shot-learning","self-consistency","mt-bench"],
    status: "verified",
    notes: ""
  },
  {
    slug: "zero-shot-learning",
    term: "Zero-shot Learning",
    aliases: ["zero shot"],
    definition: `Evaluating task performance with no task-specific examples in the prompt.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:setting","topic:generation","phase:evaluation"],
    related: ["few-shot-learning"],
    status: "verified",
    notes: ""
  },
  {
    slug: "few-shot-learning",
    term: "Few-shot Learning",
    aliases: ["few shot"],
    definition: `Evaluating with only a few in-context examples to guide the model.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:setting","topic:in-context-learning","phase:evaluation"],
    related: ["zero-shot-learning","prompt-based-evaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "self-consistency",
    term: "Self-consistency",
    aliases: [],
    definition: `Measuring agreement across multiple sampled responses or reformulations to the same query.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:metric","topic:stability","phase:evaluation"],
    related: ["calibration","robustness"],
    status: "verified",
    notes: ""
  },
  {
    slug: "instruction-following",
    term: "Instruction Following",
    aliases: [],
    definition: `Ability to understand and comply with complex natural language instructions.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:capability","topic:alignment","phase:evaluation"],
    related: ["gptinst","neighbor","manual","mt-bench","cello"],
    status: "verified",
    notes: ""
  },
  {
    slug: "generalization",
    term: "Generalization",
    aliases: [],
    definition: `Applying learned knowledge to new, unseen data, tasks, or conditions.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:property","topic:generalization","phase:evaluation"],
    related: ["robustness","generality"],
    status: "verified",
    notes: ""
  },

  // --- Construction methods for adversarial/eval data ---
  {
    slug: "neighbor-instructions",
    term: "Neighbor Instructions (NEIGHBOR)",
    aliases: ["neighbor"],
    definition: `Retrieve a related but distinct instruction from the same dataset to probe instruction following.`,
    sources: [
      { title: "arXiv:2307.03109", url: "https://arxiv.org/pdf/2307.03109.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:method","topic:adversarial","phase:evaluation"],
    related: ["gptinst","gptout","manual"],
    status: "verified",
    notes: ""
  },
  {
    slug: "gptinst",
    term: "GPT-4 Instructions (GPTINST)",
    aliases: ["gptinst"],
    definition: `Use GPT-4 to synthesize similar-but-different instructions for diversity and difficulty control.`,
    sources: [
      { title: "arXiv:2307.03109", url: "https://arxiv.org/pdf/2307.03109.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:method","topic:data","phase:evaluation"],
    related: ["neighbor-instructions","gptout","manual"],
    status: "verified",
    notes: ""
  },
  {
    slug: "gptout",
    term: "GPT-4 Unhelpful Outputs (GPTOUT)",
    aliases: ["gptout"],
    definition: `Directly elicit superficially strong but unhelpful or incorrect outputs to stress-test discernment.`,
    sources: [
      { title: "arXiv:2307.03109", url: "https://arxiv.org/pdf/2307.03109.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:method","topic:adversarial","phase:evaluation"],
    related: ["neighbor-instructions","gptinst","manual"],
    status: "verified",
    notes: ""
  },
  {
    slug: "manual",
    term: "Manual Construction (MANUAL)",
    aliases: ["manual construction"],
    definition: `Human-crafted adversarial/testing items, sometimes combined with automated generation.`,
    sources: [
      { title: "arXiv:2307.03109", url: "https://arxiv.org/pdf/2307.03109.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:method","topic:dataset","phase:evaluation"],
    related: ["gptinst","gptout","neighbor-instructions"],
    status: "verified",
    notes: ""
  },

  // --- Classic NLP/general benchmarks ---
  { slug: "glue", term: "GLUE (General Language Understanding Evaluation)", aliases: ["glue"],
    definition: `Suite of tasks for general language understanding (e.g., sentiment, NLI).`,
    sources: [
      { title: "arXiv:1811.08186", url: "https://arxiv.org/pdf/1811.08186.pdf" }
    ],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:nlp","phase:evaluation"],
    related: ["superglue"],
    status: "verified",
    notes: ""
  },
  { slug: "superglue", term: "SuperGLUE", aliases: [],
    definition: `Harder successor to GLUE for deeper reasoning and understanding.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:nlp","phase:evaluation"],
    related: ["glue"],
    status: "verified",
    notes: ""
  },
  { slug: "squad", term: "SQuAD", aliases: [],
    definition: `Reading comprehension QA over Wikipedia passages.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:dataset","topic:qa","phase:evaluation"],
    related: ["question-answering"],
    status: "verified",
    notes: ""
  },
  { slug: "winograd-schema-challenge", term: "Winograd Schema Challenge", aliases: [],
    definition: `Common-sense coreference test requiring disambiguation via world knowledge.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:commonsense","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "hellaswag", term: "HellaSwag", aliases: [],
    definition: `Narrative commonsense benchmark requiring next-step plausibility.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:commonsense","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "big-bench", term: "BIG-Bench (Beyond the Imitation Game Benchmark)", aliases: ["bigbench"],
    definition: `A comprehensive set of tasks designed to probe models' abilities across various domains and capabilities.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:multi-task","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- Evaluation qualities / rubrics ---
  { slug: "accuracy-eval", term: "Accuracy", aliases: [],
    definition: `Correctness of outputs versus references/ground truth.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:rubric","topic:quality","phase:evaluation"],
    related: ["relevance-eval","fluency-eval","transparency-eval","safety-eval","human-alignment"],
    status: "verified",
    notes: ""
  },
  { slug: "relevance-eval", term: "Relevance", aliases: [],
    definition: `Appropriateness to the user request, context, or task.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:rubric","topic:quality","phase:evaluation"],
    related: ["accuracy-eval","fluency-eval"],
    status: "verified",
    notes: ""
  },
  { slug: "fluency-eval", term: "Fluency", aliases: [],
    definition: `Readability, tone consistency, and grammatical well-formedness.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:rubric","topic:quality","phase:evaluation"],
    related: ["relevance-eval","accuracy-eval"],
    status: "verified",
    notes: ""
  },
  { slug: "transparency-eval", term: "Transparency", aliases: [],
    definition: `Clarity of process and rationale; interpretability of decisions.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:rubric","topic:trust","phase:evaluation"],
    related: ["calibration","self-consistency"],
    status: "verified",
    notes: ""
  },
  { slug: "safety-eval", term: "Safety", aliases: [],
    definition: `Avoidance of harmful, offensive, or policy-violating content.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:rubric","topic:safety","phase:evaluation"],
    related: ["safetybench","cvalues","trustgpt"],
    status: "verified",
    notes: ""
  },
  { slug: "human-alignment", term: "Human Alignment", aliases: [],
    definition: `Degree of alignment with human values, preferences, and ethics.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:rubric","topic:alignment","phase:evaluation"],
    related: ["trustgpt","cvalues"],
    status: "verified",
    notes: ""
  },

  // --- Evaluator context ---
  { slug: "number-of-evaluators", term: "Number of Evaluators", aliases: [],
    definition: `Sample size of human raters; affects reliability and variance.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:setting","topic:methodology","phase:evaluation"],
    related: ["crowd-sourcing-testing","human-in-the-loop","statistical-significance"],
    status: "verified",
    notes: ""
  },
  { slug: "adequate-representation", term: "Adequate Representation", aliases: [],
    definition: `Ensuring diverse perspectives among evaluators for nuanced judgments.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:principle","topic:methodology","phase:evaluation"],
    related: ["fairness","number-of-evaluators"],
    status: "verified",
    notes: ""
  },
  { slug: "statistical-significance", term: "Statistical Significance", aliases: [],
    definition: `Confidence that observed effects are not due to chance; supports generalization.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:concept","topic:statistics","phase:evaluation"],
    related: ["number-of-evaluators"],
    status: "verified",
    notes: ""
  },
  { slug: "evaluation-rubrics", term: "Evaluation Rubrics", aliases: [],
    definition: `Structured criteria (e.g., accuracy, relevance, fluency, transparency, safety, alignment).`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:artifact","topic:methodology","phase:evaluation"],
    related: ["accuracy-eval","relevance-eval","fluency-eval","transparency-eval","safety-eval","human-alignment"],
    status: "verified",
    notes: ""
  },
  { slug: "evaluators-expertise", term: "Evaluator’s Expertise", aliases: [],
    definition: `Domain knowledge, task familiarity, and methodological training required for reliable human evaluation.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:factor","topic:methodology","phase:evaluation"],
    related: ["human-in-the-loop","crowd-sourcing-testing"],
    status: "verified",
    notes: ""
  },

  // --- Evaluation settings (human involvement) ---
  {
    slug: "human-in-the-loop",
    term: "Human-in-the-loop",
    aliases: [],
    definition: `Human evaluators assess or intervene during evaluation or system operation.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:setting","topic:methodology","phase:evaluation"],
    related: ["crowd-sourcing-testing","mt-bench","chatbot-arena"],
    status: "verified",
    notes: ""
  },
  {
    slug: "crowd-sourcing-testing",
    term: "Crowd-sourcing testing",
    aliases: ["crowdsourcing testing"],
    definition: `Leveraging many human raters for scale and diversity of judgments.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:setting","topic:methodology","phase:evaluation"],
    related: ["openllm","chatbot-arena"],
    status: "verified",
    notes: ""
  },

  // --- Task-specific evaluation areas (canonicalized) ---
  { slug: "question-answering", term: "Question Answering", aliases: ["qa"],
    definition: `Accuracy on question answering across domains/datasets.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:task","topic:qa","phase:evaluation"],
    related: ["squad","multimedqa","freshqa","mmlu"],
    status: "verified",
    notes: ""
  },
  { slug: "information-retrieval", term: "Information Retrieval", aliases: ["ir"],
    definition: `Retrieval and ranking performance for relevant information.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:task","topic:retrieval","phase:evaluation"],
    related: ["api-bank","freshqa"],
    status: "verified",
    notes: ""
  },
  { slug: "summarization", term: "Summarization", aliases: [],
    definition: `Ability to produce concise, faithful summaries of source content.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:task","topic:generation","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  {
    slug: "sentiment-analysis",
    term: "Sentiment Analysis",
    aliases: [],
    definition: `Classifying text by emotional polarity (e.g., positive/neutral/negative).`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:task","topic:classification","phase:evaluation"],
    related: ["text-classification","glue"],
    status: "verified",
    notes: "Earlier note about ChatGPT strengths consolidated here."
  },
  {
    slug: "text-classification",
    term: "Text Classification",
    aliases: [],
    definition: `Assigning texts to categories or labels beyond sentiment (e.g., topic, stance).`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:task","topic:classification","phase:evaluation"],
    related: ["glue","mmlu"],
    status: "verified",
    notes: ""
  },
  {
    slug: "natural-language-inference-nli",
    term: "Natural Language Inference (NLI)",
    aliases: ["entailment"],
    definition: `Determining whether a hypothesis is entailed by, contradicts, or is neutral w.r.t. a premise.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:task","topic:nli","phase:evaluation"],
    related: ["glue","superglue"],
    status: "verified",
    notes: ""
  },
  { slug: "semantic-understanding", term: "Semantic Understanding", aliases: [],
    definition: `Grasping meaning, intent, and relations among events/phrases; distinct from surface similarity.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:capability","topic:semantics","phase:evaluation"],
    related: ["glue","mmlu"],
    status: "verified",
    notes: ""
  },

  // --- Classic RL/agent benchmarks ---
  {
    slug: "ale-gvgai",
    term: "Arcade Learning Environment (ALE) and General Video Game AI (GVGAI)",
    aliases: ["ale","gvgai"],
    definition: `Agent benchmarks spanning many games to test general competence and sample efficiency.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:rl","phase:evaluation"],
    related: ["convergence-eval"],
    status: "verified",
    notes: ""
  },
  {
    slug: "convergence-eval",
    term: "Convergence (evaluation)",
    aliases: [],
    definition: `Point at which performance stabilizes such that further training yields negligible gains.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:signal","topic:training","phase:evaluation"],
    related: ["convergence"],
    status: "verified",
    notes: "Distinguished from the general ML concept already defined."
  },

  // --- Multimodal LLM benchmarks ---
  { slug: "mme", term: "MME", aliases: [],
    definition: `Evaluation of multimodal perception/cognition abilities in MLLMs.`,
    sources: [],
    categories: ["benchmarks & evaluations","multimodal llms"],
    tags: ["type:benchmark","topic:multimodal","phase:evaluation"],
    related: ["seed-bench","mmbench","mm-vet","lamm","vltm-ehub"],
    status: "verified",
    notes: ""
  },
  { slug: "seed-bench", term: "SEED-Bench", aliases: [],
    definition: `Generative understanding benchmark for multimodal LLMs.`,
    sources: [],
    categories: ["benchmarks & evaluations","multimodal llms"],
    tags: ["type:benchmark","topic:multimodal","phase:evaluation"],
    related: ["mme","mmbench"],
    status: "verified",
    notes: ""
  },
  { slug: "mmbench", term: "MMBench", aliases: [],
    definition: `Assessment of large vision-language models across multifaceted abilities.`,
    sources: [],
    categories: ["benchmarks & evaluations","multimodal llms"],
    tags: ["type:benchmark","topic:vlm","phase:evaluation"],
    related: ["mm-vet","mme"],
    status: "verified",
    notes: ""
  },
  { slug: "mm-vet", term: "MM-Vet", aliases: [],
    definition: `Evaluates integrated vision-language skills on complex tasks.`,
    sources: [],
    categories: ["benchmarks & evaluations","multimodal llms"],
    tags: ["type:benchmark","topic:vlm","phase:evaluation"],
    related: ["mmbench"],
    status: "verified",
    notes: ""
  },
  { slug: "lamm", term: "LAMM", aliases: [],
    definition: `Multimodal point-cloud oriented evaluation with task-specific metrics.`,
    sources: [],
    categories: ["benchmarks & evaluations","multimodal llms"],
    tags: ["type:benchmark","topic:point-clouds","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "vltm-ehub", term: "LVLM-eHub", aliases: ["lvlm-ehub"],
    definition: `Centralized hub for evaluating large vision-language models.`,
    sources: [],
    categories: ["benchmarks & evaluations","multimodal llms"],
    tags: ["type:platform","topic:vlm","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- Comprehensive multi-metric ---
  { slug: "xiezhi", term: "Xiezhi", aliases: [],
    definition: `Overall performance benchmark spanning domains for comprehensive knowledge.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:multi-domain","phase:evaluation"],
    related: ["helm","mmlu"],
    status: "verified",
    notes: ""
  },
  { slug: "helm", term: "HELM", aliases: [],
    definition: `Holistic Evaluation of Language Models with multi-metric lens across tasks.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:framework","topic:holistic","phase:evaluation"],
    related: ["xiezhi","mmlu"],
    status: "verified",
    notes: ""
  },

  // --- Legal / script learning ---
  { slug: "choice-75", term: "Choice-75", aliases: [],
    definition: `Script learning evaluation of LLMs (procedural/temporal understanding).`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:scripts","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "cuad", term: "CUAD", aliases: [],
    definition: `Contract Understanding Atticus Dataset—legal contract review and clause extraction.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:dataset","topic:legal","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- Ethics / emotion ---
  { slug: "trustgpt", term: "TRUSTGPT", aliases: [],
    definition: `Ethics-oriented evaluation covering toxicity, bias, and value alignment.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:safety","phase:evaluation"],
    related: ["cvalues","emotionbench","safetybench"],
    status: "verified",
    notes: ""
  },
  { slug: "emotionbench", term: "EmotionBench", aliases: [],
    definition: `Evaluates empathy and recognition of emotional changes.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:emotion","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- General language & multitask suites ---
  { slug: "mmlu", term: "MMLU", aliases: [],
    definition: `Massive multitask evaluation across many subjects with multiple-choice format.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:multi-task","phase:evaluation"],
    related: ["cmmlu","gaokao-bench","arb"],
    status: "verified",
    notes: ""
  },
  { slug: "boss", term: "BOSS", aliases: [],
    definition: `OOD robustness evaluation in NLP.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:robustness","phase:evaluation"],
    related: ["glue-x"],
    status: "verified",
    notes: ""
  },
  { slug: "glue-x", term: "GLUE-X", aliases: [],
    definition: `OOD robustness evaluation suite for general NLP tasks.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:robustness","phase:evaluation"],
    related: ["boss"],
    status: "verified",
    notes: ""
  },
  { slug: "kola", term: "KoLA", aliases: [],
    definition: `Knowledge-oriented evaluation for general language tasks.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:knowledge","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "agieval", term: "AGIEval", aliases: [],
    definition: `Human-centered evaluation set for general language tasks.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:multi-task","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "promptbench", term: "PromptBench", aliases: [],
    definition: `Adversarial/robustness evaluation for prompt variations in general language tasks.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:robustness","phase:evaluation"],
    related: ["robustness"],
    status: "verified",
    notes: ""
  },
  { slug: "mt-bench", term: "MT-Bench", aliases: [],
    definition: `Multi-turn conversation evaluation, typically judged by GPT-4 or strong models.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:dialogue","phase:evaluation"],
    related: ["chatbot-arena","alpacaeval"],
    status: "verified",
    notes: ""
  },
  { slug: "llmeval2", term: "LLMEval2", aliases: [],
    definition: `LLM evaluator emphasizing accuracy, macro-F1, and kappa agreement.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:framework","topic:metrics","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- Specific downstream tasks ---
  { slug: "math", term: "MATH", aliases: [],
    definition: `Benchmark for mathematical problem solving.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:dataset","topic:math","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "apps", term: "APPS", aliases: [],
    definition: `Code generation/program synthesis benchmark.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:dataset","topic:code","phase:evaluation"],
    related: ["toolbench"],
    status: "verified",
    notes: ""
  },
  { slug: "cello", term: "CELLO", aliases: [],
    definition: `Evaluation focused on understanding complex instructions.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:dataset","topic:instructions","phase:evaluation"],
    related: ["instruction-following"],
    status: "verified",
    notes: ""
  },
  { slug: "cmmlu", term: "CMMLU", aliases: [],
    definition: `Chinese multi-task language understanding suite.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:chinese","phase:evaluation"],
    related: ["mmlu","gaokao-bench"],
    status: "verified",
    notes: ""
  },
  { slug: "api-bank", term: "API-Bank", aliases: [],
    definition: `Evaluation of tool-use including API calling, retrieval, and planning.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:tools","phase:evaluation"],
    related: ["toolbench"],
    status: "verified",
    notes: ""
  },
  { slug: "m3ke", term: "M3KE", aliases: [],
    definition: `Multi-task accuracy benchmark (varied capabilities).`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:multi-task","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "uhgeval", term: "UHGEval", aliases: [],
    definition: `Hallucination-focused evaluation for Chinese LLMs.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:hallucination","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "arb", term: "ARB", aliases: [],
    definition: `Advanced reasoning benchmark across multiple domains.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:reasoning","phase:evaluation"],
    related: ["mmlu","big-bench"],
    status: "verified",
    notes: ""
  },
  { slug: "multimedqa", term: "MultiMedQA", aliases: [],
    definition: `Medical QA benchmark blending accuracy with human eval.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:medical","phase:evaluation"],
    related: ["cmb","m3exam"],
    status: "verified",
    notes: ""
  },
  { slug: "toolbench", term: "ToolBench", aliases: [],
    definition: `Evaluates tool-use execution success (APIs, planning).`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:tools","phase:evaluation"],
    related: ["api-bank"],
    status: "verified",
    notes: ""
  },
  { slug: "freshqa", term: "FRESHQA", aliases: [],
    definition: `Dynamic QA requiring freshness; evaluates correctness and hallucination resistance.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:retrieval","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "cmb", term: "CMB", aliases: [],
    definition: `Chinese comprehensive medicine benchmark.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:medical","phase:evaluation"],
    related: ["multimedqa"],
    status: "verified",
    notes: ""
  },
  { slug: "mint", term: "MINT", aliases: [],
    definition: `Evaluates multi-turn interaction success rate.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:dialogue","phase:evaluation"],
    related: ["mt-bench"],
    status: "verified",
    notes: ""
  },
  { slug: "dialogue-cot", term: "Dialogue CoT", aliases: [],
    definition: `Assesses dialogue with chain-of-thought depth and user help/acceptance.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:dialogue","phase:evaluation"],
    related: ["mt-bench","self-consistency"],
    status: "verified",
    notes: ""
  },
  { slug: "safetybench", term: "SafetyBench", aliases: [],
    definition: `Safety ability evaluation (toxicity, policy adherence, risky prompts).`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:safety","phase:evaluation"],
    related: ["trustgpt","cvalues"],
    status: "verified",
    notes: ""
  },
  { slug: "m3exam", term: "M3Exam", aliases: [],
    definition: `Multilingual, multimodal, multilevel evaluations suite.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:multi","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "gaokao-bench", term: "GAOKAO-Bench", aliases: [],
    definition: `Chinese Gaokao exam-based evaluation with accuracy and scoring metrics.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:education","phase:evaluation"],
    related: ["cmmlu","mmlu"],
    status: "verified",
    notes: ""
  },
  { slug: "vitc", term: "VITC (Vision-in-Text Challenge)", aliases: ["vision-in-text-challenge"],
    definition: `Evaluates LLMs’ ability to parse and reason over ASCII-art style visual prompts presented as text.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:vision-in-text","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- Chatbots & automated evals ---
  { slug: "openllm", term: "OpenLLM", aliases: [],
    definition: `Leaderboard-style evaluation of chat assistants.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:platform","topic:leaderboard","phase:evaluation"],
    related: ["chatbot-arena","alpacaeval","dynabench","pandalm"],
    status: "verified",
    notes: ""
  },
  { slug: "chatbot-arena", term: "Chatbot Arena", aliases: [],
    definition: `Crowdsourced head-to-head chat comparisons with Elo-style ranking.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:platform","topic:crowdsourcing","phase:evaluation"],
    related: ["openllm"],
    status: "verified",
    notes: ""
  },
  { slug: "alpacaeval", term: "AlpacaEval", aliases: [],
    definition: `Automated evaluation emphasizing robustness, diversity, and simple win-rate metrics.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:framework","topic:automation","phase:evaluation"],
    related: ["chatbot-arena"],
    status: "verified",
    notes: ""
  },
  { slug: "dynabench", term: "DynaBench", aliases: [],
    definition: `Dynamic evaluation platform covering NLI, QA, sentiment, hate speech, and more.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:platform","topic:dynamic-eval","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },
  { slug: "pandalm", term: "PandaLM", aliases: [],
    definition: `Instruction-tuning evaluation using win-rate judged by PandaLM.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:framework","topic:instruction-tuning","phase:evaluation"],
    related: [],
    status: "verified",
    notes: ""
  },

  // --- Safety & responsibility ---
  { slug: "cvalues", term: "CVALUES", aliases: [],
    definition: `Alignment evaluation on safety and responsibility dimensions.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:alignment","phase:evaluation"],
    related: ["trustgpt","safetybench"],
    status: "verified",
    notes: ""
  },

  // --- Advanced reasoning / multilingual (extras & dup guard) ---
  { slug: "arb-adv", term: "ARB (Advanced Reasoning Benchmark)", aliases: ["arb"],
    definition: `Multidomain advanced reasoning ability evaluation.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:benchmark","topic:reasoning","phase:evaluation"],
    related: ["mmlu","big-bench"],
    status: "duplicate_candidate",
    notes: "Alias of ARB—keep one canonical."
  },
  { slug: "big-bench-dup", term: "BIG-bench", aliases: [],
    definition: `Assesses capabilities and limitations of LMs on model performance and calibration.`,
    sources: [],
    categories: ["benchmarks & evaluations"],
    tags: ["type:cleanup","topic:admin","phase:maintenance"],
    related: ["big-bench"],
    status: "duplicate_candidate",
    notes: "Can be merged to canonical BIG-Bench."
  }
);

GLOSSARY.push(
  // --- Security & Safety (meta/topic hub) ---
  {
    slug: "security-and-safety",
    term: "Security and Safety",
    aliases: ["ai security","ai safety"],
    definition: `Risks, attacks, defenses, and governance methods that keep AI systems reliable, resilient, and policy-aligned.`,
    sources: [
      { title: "NIST AI RMF 1.0/1.1 family", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" },
      { title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }
    ],
    categories: ["security & safety"],
    tags: ["type:category","topic:security","phase:deployment"],
    related: ["content-safeguards","rules-injector","bias-mitigation","failure-modes"],
    status: "verified",
    notes: ""
  },

  // --- Threats / Attacks / Access models ---
  {
    slug: "availability-attack",
    term: "Availability Attack",
    aliases: ["dos-against-ml"],
    definition: `Adversarial action that degrades a model’s overall performance or uptime (e.g., input flooding, resource exhaustion, or distribution shifts).`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:availability","phase:deployment"],
    related: ["robustness","convergence-eval"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ai-system-hardening",
    term: "AI System Hardening",
    aliases: ["model hardening","llm hardening"],
    definition: `Engineering practices that increase resilience to compromise (e.g., input validation, sandboxing tools, rate limits, monitoring, layered policy prompts).`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:defense","topic:security","phase:deployment"],
    related: ["content-safeguards","rules-injector","safety-alignment"],
    status: "verified",
    notes: ""
  },
  {
    slug: "data-poisoning",
    term: "Data Poisoning",
    aliases: [],
    definition: `Training-time attack where an adversary controls part of the dataset to induce harmful behaviors or degrade accuracy.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:training","phase:training"],
    related: ["poisoning-attacks","model-poisoning","regularization-and-variance"],
    status: "verified",
    notes: "“Part of training data under adversary control.”"
  },
  {
    slug: "model-poisoning",
    term: "Model Poisoning",
    aliases: [],
    definition: `Training-time attack where an adversary alters model parameters/gradients directly (often in federated learning).`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:training","phase:training"],
    related: ["data-poisoning","poisoning-attacks"],
    status: "verified",
    notes: "“Model parameters under adversary control.”"
  },
  {
    slug: "model-extraction",
    term: "Model Extraction",
    aliases: ["model stealing"],
    definition: `Privacy/intellectual-property attack that reconstructs a model’s parameters or decision boundary via queries.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:privacy","phase:deployment"],
    related: ["black-box-access","white-box-access"],
    status: "verified",
    notes: "“Extract architecture and parameters.”"
  },
  {
    slug: "poisoning-attacks",
    term: "Poisoning Attacks",
    aliases: [],
    definition: `Umbrella term for training-time manipulations (data/model) intended to degrade or redirect learned behavior.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:training","phase:training"],
    related: ["data-poisoning","model-poisoning"],
    status: "verified",
    notes: ""
  },

  // --- Prompt-based attacks & jailbreaks ---
  {
    slug: "prompt-injection",
    term: "Prompt Injection",
    aliases: [],
    definition: `Malicious text crafted to override instructions, exfiltrate secrets, or trigger unintended tool actions in LLMs.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:prompting","phase:inference"],
    related: ["indirect-prompt-injection","zero-width-prompt-injection","jailbreaking-jailbreak-attack","cloaked-prompt","masked-prompt-word-masking"],
    status: "verified",
    notes: ""
  },
  {
    slug: "indirect-prompt-injection",
    term: "Indirect Prompt Injection",
    aliases: ["supply-chain prompt injection"],
    definition: `Injection delivered via third-party content that the LLM ingests (e.g., web page, document), rather than typed by the user.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:prompting","phase:inference"],
    related: ["prompt-injection","rules-injector"],
    status: "verified",
    notes: ""
  },
  {
    slug: "zero-width-prompt-injection",
    term: "Zero-Width Prompt Injection",
    aliases: ["zwsp jailbreak"],
    definition: `Hidden instructions embedded with zero-width characters/markdown so they’re invisible to humans but parsed by the model.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:obfuscation","phase:inference"],
    related: ["cloaked-prompt","masked-prompt-word-masking"],
    status: "verified",
    notes: ""
  },
  {
    slug: "adversarial-prompts",
    term: "Adversarial Prompts",
    aliases: [],
    definition: `Inputs crafted to elicit unsafe, biased, or policy-violating outputs from the model.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:prompting","phase:evaluation"],
    related: ["safetybench","promptbench","jailbreaking-jailbreak-attack"],
    status: "verified",
    notes: ""
  },
  {
    slug: "jailbreaking-jailbreak-attack",
    term: "Jailbreaking | Jailbreak Attack",
    aliases: ["jailbreak"],
    definition: `A class of attacks that bypass guardrails/safety alignment to induce restricted behaviors.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:safety","phase:evaluation"],
    related: ["cloaked-prompt","masked-prompt-word-masking","artprompt","ascii-art"],
    status: "verified",
    notes: ""
  },
  {
    slug: "red-teaming",
    term: "Red Teaming",
    aliases: [],
    definition: `Authorized adversarial testing that emulates real-world attackers to expose weaknesses and improve defenses.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:process","topic:assurance","phase:deployment"],
    related: ["safetybench","content-safeguards"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ascii-art",
    term: "ASCII Art",
    aliases: [],
    definition: `Text-based graphics. In jailbreak contexts, used to encode/obfuscate sensitive terms to slip past filters.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:obfuscation","topic:prompting","phase:evaluation"],
    related: ["artprompt","cloaked-prompt","masked-prompt-word-masking","vitc"],
    status: "verified",
    notes: ""
  },
  {
    slug: "artprompt",
    term: "ArtPrompt",
    aliases: [],
    definition: `ASCII-art–based jailbreak technique designed to elicit policy-violating outputs.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:prompting","phase:evaluation"],
    related: ["ascii-art","jailbreaking-jailbreak-attack"],
    status: "verified",
    notes: ""
  },
  {
    slug: "safety-alignment",
    term: "Safety Alignment",
    aliases: [],
    definition: `Training and policy techniques that reduce harmful/biased outputs and enforce usage restrictions.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:defense","topic:alignment","phase:training"],
    related: ["content-safeguards","trustgpt","cvalues"],
    status: "verified",
    notes: ""
  },
  {
    slug: "cloaked-prompt",
    term: "Cloaked Prompt",
    aliases: [],
    definition: `Jailbreak variant where trigger words are masked/encoded (e.g., via ASCII or homoglyphs) to evade filters.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:obfuscation","phase:evaluation"],
    related: ["masked-prompt-word-masking","ascii-art"],
    status: "verified",
    notes: ""
  },
  {
    slug: "masked-prompt-word-masking",
    term: "Masked Prompt | Word Masking",
    aliases: ["masked prompt","word masking"],
    definition: `Replacing/obscuring sensitive tokens in a prompt to avoid trigger-based defenses.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:obfuscation","phase:evaluation"],
    related: ["cloaked-prompt","ascii-art"],
    status: "verified",
    notes: ""
  },
  {
    slug: "black-box-access",
    term: "Black-Box Access",
    aliases: [],
    definition: `Interacting with a model via its API/IO only—no visibility into parameters or architecture.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:setting","topic:threat-model","phase:evaluation"],
    related: ["gptout","pair","deepinception"],
    status: "verified",
    notes: ""
  },
  {
    slug: "white-box-access",
    term: "White-Box Access",
    aliases: [],
    definition: `Full internal access (architecture, parameters, gradients), enabling gradient-based or parameter-level attacks.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:setting","topic:threat-model","phase:evaluation"],
    related: ["gcg","autodan"],
    status: "verified",
    notes: ""
  },
  {
    slug: "unsafe-behaviors",
    term: "Unsafe Behaviors",
    aliases: [],
    definition: `Outputs/actions that are harmful, biased, misleading, privacy-violating, or policy-violating.`,
    sources: [{ title: "NIST AI guidance", url: "https://csrc.nist.gov/pubs/ai/100/2/e2023/final" }],
    categories: ["security & safety"],
    tags: ["type:risk","topic:safety","phase:evaluation"],
    related: ["generative-harms","safetybench","content-safeguards"],
    status: "verified",
    notes: ""
  },

  // --- Named jailbreak techniques / evaluators ---
  {
    slug: "direct-instruction-di",
    term: "Direct Instruction (DI)",
    aliases: ["di"],
    definition: `Directly instructing the model to perform disallowed actions—baseline jailbreak probe.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:prompting","phase:evaluation"],
    related: ["gptout","deepinception"],
    status: "verified",
    notes: ""
  },
  {
    slug: "gcg",
    term: "Greedy Coordinate Gradient (GCG)",
    aliases: [],
    definition: `White-box, gradient-based optimization to discover token sequences that bypass safety filters.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:optimization","phase:evaluation"],
    related: ["autodan"],
    status: "verified",
    notes: ""
  },
  {
    slug: "autodan",
    term: "AutoDAN",
    aliases: [],
    definition: `Automated jailbreak using a hierarchical genetic algorithm to evolve effective prompts (usually white-box).`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:evolutionary","phase:evaluation"],
    related: ["gcg"],
    status: "verified",
    notes: ""
  },
  {
    slug: "pair",
    term: "Prompt Automatic Iterative Refinement (PAIR)",
    aliases: ["pair"],
    definition: `Black-box optimization that iteratively refines prompts to bypass guardrails.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:optimization","phase:evaluation"],
    related: ["gptout","deepinception"],
    status: "verified",
    notes: ""
  },
  {
    slug: "deepinception",
    term: "DeepInception",
    aliases: [],
    definition: `Black-box jailbreak that leverages roleplay/nested narratives to induce restricted behavior.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:attack","topic:prompting","phase:evaluation"],
    related: ["pair","direct-instruction-di"],
    status: "verified",
    notes: ""
  },

  // --- Metrics for jailbreak evaluation ---
  {
    slug: "helpful-rate-hpr",
    term: "Helpful Rate (HPR)",
    aliases: ["hpr"],
    definition: `Share of queries not refused by the LLM.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety","benchmarks & evaluations"],
    tags: ["type:metric","topic:safety","phase:evaluation"],
    related: ["harmfulness-score-hs","attack-success-rate-asr","dict-judge"],
    status: "verified",
    notes: "HPR = (# non-refused) / (total queries)."
  },
  {
    slug: "harmfulness-score-hs",
    term: "Harmfulness Score (HS)",
    aliases: ["hs"],
    definition: `Rating 1–5 for the potential harm of a response (5 = extreme harm).`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety","benchmarks & evaluations"],
    tags: ["type:metric","topic:safety","phase:evaluation"],
    related: ["helpful-rate-hpr","attack-success-rate-asr"],
    status: "verified",
    notes: ""
  },
  {
    slug: "attack-success-rate-asr",
    term: "Attack Success Rate (ASR)",
    aliases: ["asr"],
    definition: `Share of responses with HS = 5.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety","benchmarks & evaluations"],
    tags: ["type:metric","topic:safety","phase:evaluation"],
    related: ["harmfulness-score-hs","helpful-rate-hpr"],
    status: "verified",
    notes: "ASR = (# HS=5) / (total responses)."
  },
  {
    slug: "dict-judge",
    term: "Dict-Judge",
    aliases: [],
    definition: `Evaluator/tooling that counts non-refusal responses to quantify bypasses of safety policies.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety","benchmarks & evaluations"],
    tags: ["type:tool","topic:evaluation","phase:evaluation"],
    related: ["helpful-rate-hpr","attack-success-rate-asr"],
    status: "verified",
    notes: ""
  },
  {
    slug: "gradient-based-approach",
    term: "Gradient-Based Approach",
    aliases: [],
    definition: `Optimization method that uses gradients to search token sequences that evade safety constraints (white-box setting).`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:method","topic:optimization","phase:evaluation"],
    related: ["gcg"],
    status: "verified",
    notes: ""
  },
  {
    slug: "hierarchical-genetic-algorithm",
    term: "Hierarchical Genetic Algorithm",
    aliases: ["hga"],
    definition: `Evolutionary method used by AutoDAN to iteratively improve jailbreak prompts across generations.`,
    sources: [{ title: "arXiv:2402.11753", url: "https://arxiv.org/pdf/2402.11753.pdf" }],
    categories: ["security & safety"],
    tags: ["type:method","topic:evolutionary","phase:evaluation"],
    related: ["autodan"],
    status: "verified",
    notes: ""
  },

  // --- User Behavior (prompter styles & editing patterns) ---
  {
    slug: "user-behavior",
    term: "User Behavior",
    aliases: ["prompting styles"],
    definition: `Observed patterns in how users craft, edit, and iterate prompts—including preferences for brevity, structure, or exploration.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:category","topic:ux","phase:prompting"],
    related: ["accordion-editing","apple-picking-cherry-picking"],
    status: "verified",
    notes: ""
  },
  {
    slug: "apple-picking-cherry-picking",
    term: "Apple Picking (Cherry Picking)",
    aliases: ["cherry picking"],
    definition: `Selecting the best response from multiple generations/samplings.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:pattern","topic:editing","phase:evaluation"],
    related: ["shotgun-generation","self-consistency"],
    status: "verified",
    notes: ""
  },
  {
    slug: "accordion-editing",
    term: "Accordion Editing",
    aliases: [],
    definition: `Expanding or contracting a response to adjust detail and clarity while preserving intent.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:pattern","topic:editing","phase:revision"],
    related: ["verbosity-control","desired-format"],
    status: "verified",
    notes: ""
  },
  {
    slug: "layering-editing",
    term: "Layering Editing",
    aliases: ["prompt layering"],
    definition: `Editing earlier turns/prompts in a chain to redirect outcomes or correct errors in subsequent AI responses.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:pattern","topic:editing","phase:iteration"],
    related: ["output-layering","repetitive-prompting"],
    status: "verified",
    notes: ""
  },

  // --- Prompter personas/styles ---
  {
    slug: "minimalist-prompter",
    term: "Minimalist Prompter",
    aliases: [],
    definition: `Uses concise, one-sentence queries emphasizing speed and directness.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:style","phase:prompting"],
    related: ["pragmatic-prompter","detailed-prompter"],
    status: "verified",
    notes: ""
  },
  {
    slug: "pragmatic-prompter",
    term: "Pragmatic Prompter",
    aliases: [],
    definition: `Balances context with brevity, iterating based on model feedback.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:style","phase:prompting"],
    related: ["minimalist-prompter","iterative-prompter"],
    status: "verified",
    notes: ""
  },
  {
    slug: "detailed-prompter",
    term: "Detailed Prompter",
    aliases: [],
    definition: `Supplies thorough context, task breakdowns, constraints, and goals to maximize quality and control.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:style","phase:prompting"],
    related: ["rubric-approach","risen-framework","rtf-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "iterative-prompter",
    term: "Iterative Prompter",
    aliases: [],
    definition: `Engages the model step-by-step, refining prompts through multi-turn dialogue.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:workflow","phase:prompting"],
    related: ["plan-and-solve-p-s","least-to-most-ltm","decomposed-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "explorative-prompter",
    term: "Explorative Prompter",
    aliases: ["exploratory prompter"],
    definition: `Crafts open-ended prompts to survey idea space and stimulate brainstorming.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:creativity","phase:ideation"],
    related: ["divergent-thinking","shotgun-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "contextual-prompter",
    term: "Contextual Prompter",
    aliases: [],
    definition: `Tunes verbosity and structure to the specific domain, audience, and objective.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:style","phase:prompting"],
    related: ["domain-priming","desired-format"],
    status: "verified",
    notes: ""
  },
  {
    slug: "enthusiast-prompter",
    term: "Enthusiast Prompter",
    aliases: [],
    definition: `Enjoys building complex, nuanced prompts as an intellectual/creative exercise.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:hobbyist","phase:prompting"],
    related: ["prompt-architecture-virtual-brain","prompt-composition"],
    status: "verified",
    notes: ""
  },
  {
    slug: "utility-driven-prompter",
    term: "Utility-Driven Prompter",
    aliases: [],
    definition: `Optimizes for outcome efficiency—will switch between brief and detailed prompting as the task requires.`,
    sources: [],
    categories: ["user behavior"],
    tags: ["type:persona","topic:style","phase:prompting"],
    related: ["pragmatic-prompter","detailed-prompter"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  // --- Waves (Systems) of AI ---
  {
    slug: "waves-systems-of-ai",
    term: "Waves (Systems) of AI",
    aliases: ["three waves of ai","waves of ai prompting evolutions"],
    definition: `A progression framing how AI systems are built and prompted across three eras: rule-based (First), data-driven/statistical (Second), and context-aware/reasoning (Third). Each wave shifts the skills and practices used to communicate with and guide AI.`,
    sources: [
      { title: "Futurism – AI will arrive in three waves", url: "https://futurism.com/artificial-intelligence-tech-will-arrive-in-three-waves" },
      { title: "DARPA perspective on AI (Technica Curiosa)", url: "https://machinelearning.technicacuriosa.com/2017/03/19/a-darpa-perspective-on-artificial-intelligence/" }
    ],
    categories: ["waves of ai","prompt evolution"],
    tags: ["type:category","topic:history","phase:overview"],
    related: ["first-wave-system","second-wave-system","third-wave-system","prompt-architecture-virtual-brain","prompt-engineering-and-development"],
    status: "verified",
    notes: ""
  },
  {
    slug: "first-wave-system",
    term: "First Wave (System)",
    aliases: ["first wave"],
    definition: `Rule-based era. Prompting and interaction are largely static and formulaic, reflecting explicit logic/rules encoded by developers. Emphasis on unambiguous instructions; limited contextual understanding.`,
    sources: [
      { title: "DARPA perspective on AI (Technica Curiosa)", url: "https://machinelearning.technicacuriosa.com/2017/03/19/a-darpa-perspective-on-artificial-intelligence/" }
    ],
    categories: ["waves of ai","prompt evolution"],
    tags: ["type:stage","topic:rules","phase:design"],
    related: ["second-wave-system","prompt-template-engineering","manual-template-engineering"],
    status: "verified",
    notes: "Talent profile: traditional programming; deterministic UX."
  },
  {
    slug: "second-wave-system",
    term: "Second Wave (System)",
    aliases: ["second wave"],
    definition: `Statistical/data-driven era. Focus shifts from hand-written rules to learning from data. Prompting involves designing examples, feedback loops, and task structures that shape learned behavior.`,
    sources: [
      { title: "DARPA perspective on AI (Technica Curiosa)", url: "https://machinelearning.technicacuriosa.com/2017/03/19/a-darpa-perspective-on-artificial-intelligence/" }
    ],
    categories: ["waves of ai","prompt evolution"],
    tags: ["type:stage","topic:data","phase:training"],
    related: ["first-wave-system","third-wave-system","few-shot-learning","prompt-augmentation-demonstration-learning","prompt-decomposition"],
    status: "verified",
    notes: "Talent profile: programming + data science; statistics; dataset design."
  },
  {
    slug: "third-wave-system",
    term: "Third Wave (System)",
    aliases: ["third wave","contextual adaptation era"],
    definition: `Context-aware/reasoning era. Systems interpret context and reason, so prompting blends creativity, psychology, and design thinking. Emphasis on clear goals, roles, constraints, tone, and iterative refinement.`,
    sources: [
      { title: "Futurism – AI will arrive in three waves", url: "https://futurism.com/artificial-intelligence-tech-will-arrive-in-three-waves" }
    ],
    categories: ["waves of ai","prompt evolution"],
    tags: ["type:stage","topic:reasoning","phase:inference"],
    related: ["prompt-architecture-virtual-brain","risen-framework","rtf-framework","costar-framework","reflection-or-reasoning-prompting-maieutic-self-refine-prompting"],
    status: "verified",
    notes: "Talent profile: communication, UX, linguistics, culture, and ethics."
  }
);

GLOSSARY.push(
  // =========================
  // Biases (meta hubs)
  // =========================
  {
    slug: "biases",
    term: "Biases",
    aliases: ["ai biases","cognitive biases"],
    definition: "Systematic distortions in data, models, interfaces, or human judgment that skew outcomes, representations, or decisions.",
    sources: [],
    categories: ["biases"],
    tags: ["type:category","topic:safety","topic:fairness"],
    related: ["bias-mitigation-techniques","bias-awareness-techniques","fairness","performance-disparities","generative-harms"],
    status: "verified",
    notes: ""
  },
  {
    slug: "western-centric-bias-and-stereotypes",
    term: "Western-Centric Bias/Stereotypes",
    aliases: ["western-centric bias","western bias"],
    definition: "Assumptions privileging Western norms, values, and perspectives as universal standards.",
    sources: [],
    categories: ["biases"],
    tags: ["type:category","topic:culture"],
    related: ["global-north-dominance","english-language-dominance","ideological-bias"],
    status: "verified",
    notes: ""
  },
  {
    slug: "potential-llm-bias-and-stereotypes",
    term: "Potential LLM Bias/Stereotypes",
    aliases: ["llm biases","model biases"],
    definition: "Patterns that can appear in LLM outputs based on training data composition, curation, objectives, or algorithms.",
    sources: [],
    categories: ["biases"],
    tags: ["type:category","topic:model"],
    related: ["algorithmic-bias","selection-bias","reporting-bias","exposure-bias","recency-bias","popularity-bias"],
    status: "verified",
    notes: ""
  },
  {
    slug: "general-cognitive-biases",
    term: "General Biases",
    aliases: ["cognitive biases"],
    definition: "Common human judgment heuristics and fallacies that can also influence how prompts are written and interpreted.",
    sources: [],
    categories: ["biases"],
    tags: ["type:category","topic:cognition"],
    related: ["bias-awareness-techniques"],
    status: "verified",
    notes: ""
  },
  {
    slug: "bias-mitigation-techniques",
    term: "Bias Mitigation Techniques",
    aliases: ["mitigations for bias","bias reduction"],
    definition: "Data, modeling, evaluation, and process interventions designed to reduce biased outcomes.",
    sources: [],
    categories: ["biases"],
    tags: ["type:category","topic:mitigation"],
    related: ["fairness","cvalues","trustgpt","safety-eval","evaluation-rubrics"],
    status: "verified",
    notes: ""
  },
  {
    slug: "bias-awareness-techniques",
    term: "Bias Awareness Techniques",
    aliases: ["bias awareness"],
    definition: "Practices that surface, document, and monitor bias risk across prompts, datasets, evaluations, and deployments.",
    sources: [],
    categories: ["biases"],
    tags: ["type:category","topic:operations"],
    related: ["bias-mitigation-techniques","human-in-the-loop","evaluation-rubrics"],
    status: "verified",
    notes: ""
  },

  // =========================
  // Western-centric bias items
  // =========================
  { slug: "individualism-over-collectivism", term: "Individualism Over Collectivism",
    aliases: [], definition: "Emphasis on individual rights/achievements over collective goals and responsibilities.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:culture"], related: [], status: "verified", notes: "" },
  { slug: "linear-time-perception", term: "Linear Time Perception",
    aliases: [], definition: "Viewing time as linear/progressive, overlooking cyclical or flexible temporal concepts.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:culture"], related: [], status: "verified", notes: "" },
  { slug: "universalism-western", term: "Universalism",
    aliases: [], definition: "Assuming Western legal/moral/cultural norms are universally applicable.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:culture"], related: ["ideological-bias"], status: "verified", notes: "" },
  { slug: "material-success-and-capitalism", term: "Material Success and Capitalism",
    aliases: [], definition: "Prioritizing wealth/consumerism as progress metrics.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:econ"], related: [], status: "verified", notes: "" },
  { slug: "secularism-bias", term: "Secularism",
    aliases: [], definition: "Assuming secular governance as standard; overlooking religious/theocratic contexts.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:culture"], related: [], status: "verified", notes: "" },
  { slug: "western-democratic-models", term: "Western Democratic Models",
    aliases: [], definition: "Treating Western-style democracy as inherently superior or universally preferable.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:political"], related: [], status: "verified", notes: "" },
  { slug: "english-language-dominance", term: "English Language Dominance",
    aliases: [], definition: "Assuming English as the default or universal language.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:language"], related: ["language-bias"], status: "verified", notes: "" },
  { slug: "technological-superiority", term: "Technological Superiority",
    aliases: [], definition: "Framing Western technology/science as inherently superior.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:tech"], related: ["technocentric-perspectives"], status: "verified", notes: "" },
  { slug: "western-educational-superiority", term: "Western Educational Superiority",
    aliases: [], definition: "Bias toward Western educational systems as most effective or prestigious.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:education"], related: [], status: "verified", notes: "" },
  { slug: "western-media-representation", term: "Western Media Representation",
    aliases: [], definition: "Overrepresentation of Western values/lifestyles in global media.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:media"], related: ["mainstream-media-bias"], status: "verified", notes: "" },
  { slug: "freedom-and-human-rights-western", term: "Freedom and Human Rights",
    aliases: [], definition: "Presenting Western notions of freedom and rights as sole legitimate forms.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:political"], related: [], status: "verified", notes: "" },
  { slug: "health-and-beauty-standards-western", term: "Health and Beauty Standards",
    aliases: [], definition: "Centering Western body/beauty norms as default.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:health","topic:culture"], related: [], status: "verified", notes: "" },
  { slug: "food-and-cuisine-preferences-western", term: "Food and Cuisine Preferences",
    aliases: [], definition: "Elevating Western cuisines/practices as standard.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:culture"], related: [], status: "verified", notes: "" },
  { slug: "legal-and-ethical-norms-western", term: "Legal and Ethical Norms",
    aliases: [], definition: "Assuming Western legal/ethical frameworks are universally applicable.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:law","topic:ethics"], related: [], status: "verified", notes: "" },
  { slug: "environmental-practices-western", term: "Environmental Practices",
    aliases: [], definition: "Prioritizing Western conservation approaches over indigenous/alternative practices.",
    sources: [], categories: ["biases","western-centric-bias"], tags: ["topic:environment"], related: [], status: "verified", notes: "" },

  // =========================
  // Potential LLM / dataset / algorithm biases
  // =========================
  { slug: "cultural-bias", term: "Cultural Bias", aliases: [],
    definition: "Cultural assumptions embedded in data or outputs that misrepresent or marginalize groups.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["western-centric-bias-and-stereotypes"], status: "verified", notes: "" },
  { slug: "language-bias", term: "Language Bias", aliases: [],
    definition: "Dominance of certain languages leading to under/ misrepresentation of others.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:language"], related: ["english-language-dominance"], status: "verified", notes: "" },
  { slug: "gender-bias", term: "Gender Bias", aliases: [],
    definition: "Unequal representation or stereotyping based on gender in data or outputs.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:demographic"], related: ["fairness"], status: "verified", notes: "" },
  { slug: "socioeconomic-bias", term: "Socioeconomic Bias", aliases: [],
    definition: "Over/underrepresentation of socioeconomic groups skewing outcomes.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:demographic"], related: ["selection-bias"], status: "verified", notes: "" },
  { slug: "historical-bias", term: "Historical Bias", aliases: [],
    definition: "Outdated norms in historical data influencing present outputs.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["recency-bias"], status: "verified", notes: "" },
  { slug: "geographical-bias", term: "Geographical Bias", aliases: [],
    definition: "Overemphasis or neglect of certain regions producing skewed perceptions.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:geo"], related: ["global-north-dominance"], status: "verified", notes: "" },
  { slug: "ideological-bias", term: "Ideological Bias", aliases: [],
    definition: "Embedding specific political/ethical stances that marginalize alternatives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:political"], related: ["universalism-western"], status: "verified", notes: "" },
  { slug: "confirmation-bias-llm", term: "Confirmation Bias (in LLMs)", aliases: ["confirmation bias"],
    definition: "Favoring information that confirms existing patterns in training data or prior context.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["confirmation-bias-human"], status: "verified", notes: "" },
  { slug: "selection-bias", term: "Selection Bias", aliases: [],
    definition: "Non-random data selection causing non-representative samples.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["sampling-bias","reporting-bias"], status: "verified", notes: "" },
  { slug: "reporting-bias", term: "Reporting Bias", aliases: [],
    definition: "Relying on what is more visible/available, missing underreported views.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["availability-heuristic"], status: "verified", notes: "" },
  { slug: "annotation-bias", term: "Annotation Bias", aliases: [],
    definition: "Annotator beliefs/experiences introduce systematic skew during labeling.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:labeling"], related: [], status: "verified", notes: "" },
  { slug: "sampling-bias", term: "Sampling Bias", aliases: [],
    definition: "Collection method skews away from the target population diversity.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["selection-bias"], status: "verified", notes: "" },
  { slug: "algorithmic-bias", term: "Algorithmic Bias", aliases: [],
    definition: "Bias induced by modeling choices, objectives, or optimization.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:algorithms"], related: ["fairness"], status: "verified", notes: "" },
  { slug: "experiential-bias", term: "Experiential Bias", aliases: [],
    definition: "Training data reflects limited experiences/contexts, missing others.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: [], status: "verified", notes: "" },
  { slug: "content-bias", term: "Content Bias", aliases: [],
    definition: "Preference for certain topics/genres/formats in the corpus.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["platform-centric-narratives"], status: "verified", notes: "" },
  { slug: "exposure-bias", term: "Exposure Bias", aliases: [],
    definition: "Overexposure to certain data types leads to unfamiliarity with others.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: [], status: "verified", notes: "" },
  { slug: "outcome-bias-llm", term: "Outcome Bias (in LLMs)", aliases: ["outcome bias"],
    definition: "Focusing on outcome-preferred data, ignoring alternatives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["outcome-bias-human"], status: "verified", notes: "" },
  { slug: "recency-bias", term: "Recency Bias", aliases: [],
    definition: "Overvaluing recent data, neglecting older yet relevant information.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:temporal"], related: ["historical-bias"], status: "verified", notes: "" },
  { slug: "popularity-bias", term: "Popularity Bias", aliases: [],
    definition: "Overweighting popular/trending content at the expense of niche perspectives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:platforms"], related: ["bandwagon-effect","availability-cascade"], status: "verified", notes: "" },
  { slug: "implicit-bias-llm", term: "Implicit Bias (in LLMs)", aliases: ["implicit bias"],
    definition: "Unconscious patterns embedded via data or instructions that affect outputs.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: [], status: "verified", notes: "" },

  // =========================
  // Platform / culture / distribution (LLM-specific, extended)
  // =========================
  { slug: "technocentric-perspectives", term: "Technocentric Perspectives", aliases: [],
    definition: "Assuming technology-first solutions are superior to non-technical approaches.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:tech"], related: ["technological-superiority"], status: "verified", notes: "" },
  { slug: "english-language-primacy", term: "English Language Primacy", aliases: [],
    definition: "Overrepresentation/preference for English content in corpora.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:language"], related: ["language-bias","english-language-dominance"], status: "verified", notes: "" },
  { slug: "urban-centric-views", term: "Urban-centric Views", aliases: [],
    definition: "Bias toward urban issues/lifestyles over rural perspectives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:society"], related: [], status: "verified", notes: "" },
  { slug: "internet-user-demographics", term: "Internet User Demographics", aliases: [],
    definition: "Online-active groups dominate datasets, skewing outputs to their perspectives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:data"], related: ["selection-bias"], status: "verified", notes: "" },
  { slug: "mainstream-media-bias", term: "Mainstream Media Bias", aliases: [],
    definition: "Dominant media narratives crowd out alternative viewpoints.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:media"], related: ["western-media-representation"], status: "verified", notes: "" },
  { slug: "algorithmic-efficiency-bias", term: "Algorithmic Efficiency", aliases: [],
    definition: "Preferring computationally efficient solutions that may not reflect human needs/values.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:algorithms"], related: [], status: "verified", notes: "" },
  { slug: "data-driven-rationality-bias", term: "Data-Driven Rationality", aliases: [],
    definition: "Overweighting quantitative measures while overlooking qualitative/affective factors.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:methodology"], related: [], status: "verified", notes: "" },
  { slug: "popular-culture-bias", term: "Popular Culture Bias", aliases: [],
    definition: "Favoring pop-culture topics, marginalizing niche interests.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:culture"], related: [], status: "verified", notes: "" },
  { slug: "consumerist-orientation", term: "Consumerist Orientation", aliases: [],
    definition: "Emphasis on consumer-centric content reflecting commercial prevalence online.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:econ"], related: [], status: "verified", notes: "" },
  { slug: "short-term-focus", term: "Short-term Focus", aliases: [],
    definition: "Prioritizing short-term trends over long-term perspectives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:temporal"], related: ["recency-bias"], status: "verified", notes: "" },
  { slug: "silicon-valley-ideology", term: "Silicon Valley Ideology", aliases: [],
    definition: "Reflecting disruption/innovation-at-all-costs narratives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:culture"], related: [], status: "verified", notes: "" },
  { slug: "echo-chamber-effect", term: "Echo Chamber Effect", aliases: [],
    definition: "Reinforcing prevalent viewpoints within training sources, reducing diversity of perspectives.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:platforms"], related: ["availability-cascade","bandwagon-effect"], status: "verified", notes: "" },
  { slug: "information-overload-bias", term: "Information Overload", aliases: [],
    definition: "Overproduction of detail mirroring web scale; not all content is relevant or accurate.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:ux"], related: [], status: "verified", notes: "" },
  { slug: "platform-centric-narratives", term: "Platform-centric Narratives", aliases: [],
    definition: "Bias toward narratives/frames dominant on large platforms.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:platforms"], related: ["content-bias"], status: "verified", notes: "" },
  { slug: "digital-divide", term: "Digital Divide", aliases: [],
    definition: "Underrepresentation of communities with limited digital access.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:access"], related: ["selection-bias"], status: "verified", notes: "" },
  { slug: "global-north-dominance", term: "Global North Dominance", aliases: [],
    definition: "Overemphasis on Global North perspectives; marginalizing Global South viewpoints.",
    sources: [], categories: ["biases","potential-llm-bias-and-stereotypes"], tags: ["topic:geo"], related: ["geographical-bias"], status: "verified", notes: "" },

  // =========================
  // General cognitive biases (human)
  // =========================
  { slug: "bias-blind-spot", term: "Bias Blind Spot", aliases: [],
    definition: "Believing oneself to be less biased than others.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:cognition"], related: [], status: "verified", notes: "" },
  { slug: "gamblers-fallacy", term: "Gambler's Fallacy", aliases: [],
    definition: "Belief that past random events affect future probabilities.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:probability"], related: [], status: "verified", notes: "" },
  { slug: "omission-bias", term: "Omission Bias", aliases: [],
    definition: "Judging harmful actions as worse than equally harmful inactions.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:ethics"], related: [], status: "verified", notes: "" },
  { slug: "proportionality-bias", term: "Proportionality Bias", aliases: [],
    definition: "Assuming big events must have big causes.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:cognition"], related: [], status: "verified", notes: "" },
  { slug: "moral-credential-effect", term: "Moral Credential Effect", aliases: [],
    definition: "Past moral behavior increases likelihood of later immoral actions.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:ethics"], related: [], status: "verified", notes: "" },
  { slug: "self-serving-bias", term: "Self-Serving Bias", aliases: [],
    definition: "Attributing successes to self; failures to external factors.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:attribution"], related: [], status: "verified", notes: "" },
  { slug: "framing-effect", term: "Framing Effect", aliases: [],
    definition: "Different conclusions from the same info when framed differently.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:communication"], related: [], status: "verified", notes: "" },
  { slug: "actor-observer-bias", term: "Actor-Observer Bias", aliases: [],
    definition: "Self actions to situations; others’ actions to disposition.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:attribution"], related: [], status: "verified", notes: "" },
  { slug: "picture-superiority-effect", term: "Picture Superiority Effect", aliases: [],
    definition: "Images are remembered better than words.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:memory"], related: [], status: "verified", notes: "" },
  { slug: "outcome-bias-human", term: "Outcome Bias", aliases: [],
    definition: "Judging decision quality by known outcomes.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:judgment"], related: ["outcome-bias-llm"], status: "verified", notes: "" },
  { slug: "mere-exposure-effect", term: "Mere-Exposure Effect", aliases: [],
    definition: "Preference increases with familiarity.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:preference"], related: [], status: "verified", notes: "" },
  { slug: "hard-easy-effect", term: "Hard-Easy Effect", aliases: [],
    definition: "Overestimate ability on hard tasks; underestimate on easy ones.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:metacognition"], related: [], status: "verified", notes: "" },
  { slug: "survivorship-bias", term: "Survivorship Bias", aliases: [],
    definition: "Focusing on visible successes; ignoring hidden failures.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:sampling"], related: [], status: "verified", notes: "" },
  { slug: "baader-meinhof-phenomenon", term: "Baader-Meinhof Phenomenon", aliases: ["frequency illusion"],
    definition: "Newly noticed things appear with improbable frequency.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:perception"], related: [], status: "verified", notes: "" },
  { slug: "availability-heuristic", term: "Availability Heuristic", aliases: [],
    definition: "Judging likelihood by ease of recall.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:heuristics"], related: ["reporting-bias"], status: "verified", notes: "" },
  { slug: "dunning-kruger-effect", term: "Dunning-Kruger Effect", aliases: [],
    definition: "Low-skill overconfidence; high-skill underconfidence.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:metacognition"], related: [], status: "verified", notes: "" },
  { slug: "halo-effect", term: "Halo Effect", aliases: [],
    definition: "Positive impression in one area influences others.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:impression"], related: [], status: "verified", notes: "" },
  { slug: "pygmalion-effect", term: "Pygmalion Effect", aliases: [],
    definition: "Higher expectations lead to improved performance.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:expectations"], related: [], status: "verified", notes: "" },
  { slug: "decoy-effect", term: "Decoy Effect", aliases: [],
    definition: "A dominated third choice shifts preference between two options.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:choice"], related: [], status: "verified", notes: "" },
  { slug: "anchoring-bias", term: "Anchoring Bias", aliases: [],
    definition: "Overreliance on the first piece of information (anchor).", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:heuristics"], related: [], status: "verified", notes: "" },
  { slug: "confirmation-bias-human", term: "Confirmation Bias", aliases: [],
    definition: "Seeking or interpreting information to confirm prior beliefs.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:heuristics"], related: ["confirmation-bias-llm"], status: "verified", notes: "" },
  { slug: "overconfidence-effect", term: "Overconfidence Effect", aliases: [],
    definition: "Excessive confidence in one’s answers or judgments.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:metacognition"], related: [], status: "verified", notes: "" },
  { slug: "egocentric-bias", term: "Egocentric Bias", aliases: [],
    definition: "Overreliance on one’s own perspective.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:self"], related: [], status: "verified", notes: "" },
  { slug: "information-bias", term: "Information Bias", aliases: [],
    definition: "Seeking information that does not affect action.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:decision"], related: [], status: "verified", notes: "" },
  { slug: "hindsight-bias", term: "Hindsight Bias", aliases: [],
    definition: "Perceiving events as predictable after they occur.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:memory"], related: [], status: "verified", notes: "" },
  { slug: "projection-bias", term: "Projection Bias", aliases: [],
    definition: "Overestimating how much others agree with us.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:social"], related: [], status: "verified", notes: "" },
  { slug: "apophenia-bias", term: "Apophenia Bias", aliases: ["apophenia"],
    definition: "Perceiving meaningful patterns in randomness.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:perception"], related: [], status: "verified", notes: "" },
  { slug: "serial-position-effect", term: "Serial Position Effect", aliases: [],
    definition: "Better recall of first/last list items than middle.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:memory"], related: [], status: "verified", notes: "" },
  // Recency Bias already canonicalized above
  { slug: "authority-bias", term: "Authority Bias", aliases: [],
    definition: "Attributing greater accuracy to opinions of authority figures.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:social"], related: [], status: "verified", notes: "" },
  { slug: "unit-bias", term: "Unit Bias", aliases: [],
    definition: "Perceiving default unit/portion as recommended amount.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:consumption"], related: [], status: "verified", notes: "" },
  { slug: "availability-cascade", term: "Availability Cascade", aliases: [],
    definition: "Beliefs gain plausibility through repeated public repetition.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:social"], related: ["echo-chamber-effect"], status: "verified", notes: "" },
  { slug: "bandwagon-effect", term: "Bandwagon Effect", aliases: [],
    definition: "Adopting beliefs/actions because many others do.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:social"], related: ["popularity-bias"], status: "verified", notes: "" },
  { slug: "illusory-truth-effect", term: "Illusory Truth Effect", aliases: [],
    definition: "Repeated statements are more likely to be believed.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:memory"], related: [], status: "verified", notes: "" },
  { slug: "next-in-line-effect", term: "Next-in-Line Effect", aliases: [],
    definition: "Poor recall for info presented just before/after oneself speaks.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:attention"], related: [], status: "verified", notes: "" },
  { slug: "ingroup-bias", term: "Ingroup Bias", aliases: [],
    definition: "Favoring one’s own group.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:social"], related: [], status: "verified", notes: "" },
  { slug: "spotlight-effect", term: "Spotlight Effect", aliases: [],
    definition: "Overestimating how much others notice us.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:self"], related: [], status: "verified", notes: "" },
  { slug: "choice-supportive-bias", term: "Choice-Supportive Bias", aliases: [],
    definition: "Remembering chosen options as better than they were.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:memory"], related: [], status: "verified", notes: "" },
  { slug: "ostrich-effect", term: "Ostrich Effect", aliases: [],
    definition: "Ignoring negative/dangerous information.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:avoidance"], related: [], status: "verified", notes: "" },
  { slug: "selective-perception-bias", term: "Selective Perception Bias", aliases: [],
    definition: "Expectations shape perception of stimuli.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:perception"], related: [], status: "verified", notes: "" },
  { slug: "peak-end-rule", term: "Peak-End Rule", aliases: [],
    definition: "Judging experiences mostly by peak and end moments.", sources: [], categories: ["biases","general-cognitive-biases"], tags: ["topic:memory"], related: [], status: "verified", notes: "" },

  // =========================
  // Bias mitigation techniques
  // =========================
  { slug: "counterbalancing", term: "Counterbalancing", aliases: [],
    definition: "Intentionally include diverse viewpoints/sources to balance biases.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:process"], related: ["diverse-dataset-sourcing"], status: "verified", notes: "" },
  { slug: "bias-auditing", term: "Bias Auditing", aliases: [],
    definition: "Regularly review outputs to identify and correct biased patterns.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:process"], related: ["fairness-metrics-evaluation"], status: "verified", notes: "" },
  { slug: "inclusive-language-guidelines", term: "Inclusive Language Guidelines", aliases: [],
    definition: "Guides for neutral, inclusive wording in prompts/instructions.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:policy"], related: [], status: "verified", notes: "" },
  { slug: "diverse-dataset-sourcing", term: "Diverse Dataset Sourcing", aliases: [],
    definition: "Collect data from varied sources/demographics to improve representation.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:data"], related: ["counterbalancing"], status: "verified", notes: "" },
  { slug: "anonymization", term: "Anonymization", aliases: [],
    definition: "Remove identifiers to reduce demographic bias effects.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:data"], related: [], status: "verified", notes: "" },
  { slug: "bias-correction-algorithms", term: "Bias Correction Algorithms", aliases: [],
    definition: "Algorithms to detect and correct biases pre/post training.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:algorithm"], related: ["algorithmic-bias"], status: "verified", notes: "" },
  { slug: "adversarial-data-generation", term: "Adversarial Data Generation", aliases: [],
    definition: "Create challenging data that exposes and counteracts biases.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:data"], related: [], status: "verified", notes: "" },
  { slug: "sensitivity-review", term: "Sensitivity Review", aliases: [],
    definition: "Review corpora/outputs for biased or insensitive content.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:process"], related: [], status: "verified", notes: "" },
  { slug: "contextual-understanding", term: "Contextual Understanding", aliases: [],
    definition: "Improve model/use of context to reduce stereotype carryover.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:capability"], related: [], status: "verified", notes: "" },
  { slug: "feedback-loops-bias", term: "Feedback Loops", aliases: [],
    definition: "Collect user feedback to identify and mitigate biases.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:process"], related: ["human-in-the-loop"], status: "verified", notes: "" },
  { slug: "regular-updating-and-reevaluation", term: "Regular Updating and Reevaluation", aliases: [],
    definition: "Continuously update data and re-evaluate for emerging biases.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:process"], related: [], status: "verified", notes: "" },
  { slug: "ethical-guidelines-compliance", term: "Ethical Guidelines Compliance", aliases: [],
    definition: "Adhere to ethical standards/policies during development and deployment.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:policy"], related: [], status: "verified", notes: "" },
  { slug: "cross-cultural-competency-training", term: "Cross-Cultural Competency Training", aliases: [],
    definition: "Train teams to recognize cultural differences/biases.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:training"], related: [], status: "verified", notes: "" },
  { slug: "transparency-in-algorithm-design", term: "Transparency in Algorithm Design", aliases: [],
    definition: "Document/communicate model design decisions to facilitate bias detection.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:governance"], related: [], status: "verified", notes: "" },
  { slug: "fairness-metrics-evaluation", term: "Fairness Metrics Evaluation", aliases: [],
    definition: "Apply fairness metrics to evaluate impartiality.", sources: [], categories: ["biases","bias-mitigation-techniques"], tags: ["type:metric"], related: ["fairness"], status: "verified", notes: "" },

  // =========================
  // Bias awareness techniques
  // =========================
  { slug: "bias-reflection-prompts", term: "Bias Reflection Prompts", aliases: [],
    definition: "Prompts that encourage reflection on potential bias in instructions/queries.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:practice"], related: [], status: "verified", notes: "" },
  { slug: "cultural-and-contextual-sensitivity-training", term: "Cultural and Contextual Sensitivity Training", aliases: [],
    definition: "Educate teams on cultural/contextual differences for unbiased prompt creation.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:training"], related: [], status: "verified", notes: "" },
  { slug: "bias-awareness-workshops", term: "Bias Awareness Workshops", aliases: [],
    definition: "Workshops to identify and understand common biases.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:training"], related: [], status: "verified", notes: "" },
  { slug: "diverse-perspective-seeking", term: "Diverse Perspective Seeking", aliases: [],
    definition: "Practice of intentionally consulting multiple perspectives.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:practice"], related: [], status: "verified", notes: "" },
  { slug: "transparent-sourcing", term: "Transparent Sourcing", aliases: [],
    definition: "Disclose data sources to expose potential origins of bias.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:practice"], related: ["bias-documentation"], status: "verified", notes: "" },
  { slug: "feedback-mechanisms-bias", term: "Feedback Mechanisms", aliases: [],
    definition: "Systems for users to flag perceived biases in outputs.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:process"], related: ["feedback-loops-bias"], status: "verified", notes: "" },
  { slug: "bias-documentation", term: "Bias Documentation", aliases: [],
    definition: "Maintain documentation of known biases and mitigation strategies.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:documentation"], related: [], status: "verified", notes: "" },
  { slug: "implicit-bias-tests", term: "Implicit Bias Tests", aliases: [],
    definition: "Use instruments to uncover unconscious biases in individuals/teams.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:assessment"], related: [], status: "verified", notes: "" },
  { slug: "historical-contextualization", term: "Historical Contextualization", aliases: [],
    definition: "Include historical context to understand evolution of biases.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:practice"], related: [], status: "verified", notes: "" },
  { slug: "stereotype-challenge-exercises", term: "Stereotype Challenge Exercises", aliases: [],
    definition: "Exercises designed to challenge common stereotypes.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:training"], related: [], status: "verified", notes: "" },
  { slug: "cross-cultural-validation", term: "Cross-Cultural Validation", aliases: [],
    definition: "Validate prompts/instructions across cultures/languages.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:validation"], related: [], status: "verified", notes: "" },
  { slug: "longitudinal-data-analysis", term: "Longitudinal Data Analysis", aliases: [],
    definition: "Track responses over time to detect emerging biases.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:analysis"], related: [], status: "verified", notes: "" },
  { slug: "ethical-review-boards", term: "Ethical Review Boards", aliases: ["llm review board"],
    definition: "Diverse boards to review prompts/instructions for ethics and bias.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:governance"], related: [], status: "verified", notes: "" },
  { slug: "peer-review-systems", term: "Peer Review Systems", aliases: [],
    definition: "Peer review of prompts before use to catch bias issues.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:process"], related: [], status: "verified", notes: "" },
  { slug: "multidisciplinary-collaboration", term: "Multidisciplinary Collaboration", aliases: [],
    definition: "Engage experts (sociology, psychology, anthropology, etc.) in bias mitigation.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:process"], related: [], status: "verified", notes: "" },
  { slug: "user-centric-design-bias", term: "User-Centric Design", aliases: [],
    definition: "Design prompts with users’ cultural/social contexts in mind.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:design"], related: [], status: "verified", notes: "" },
  { slug: "bias-impact-assessments", term: "Bias Impact Assessments", aliases: [],
    definition: "Assess potential consequences of biases in prompts and adjust accordingly.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:assessment"], related: [], status: "verified", notes: "" },
  { slug: "adaptive-learning-algorithms-bias", term: "Adaptive Learning Algorithms", aliases: [],
    definition: "Use adaptive algorithms that incorporate feedback/new data to reduce bias over time.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:algorithm"], related: [], status: "verified", notes: "" },
  { slug: "scenario-based-testing-bias", term: "Scenario-Based Testing", aliases: [],
    definition: "Test prompts in varied scenarios to uncover context-specific bias.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:testing"], related: [], status: "verified", notes: "" },
  { slug: "continuous-education-and-training-bias", term: "Continuous Education and Training", aliases: [],
    definition: "Ongoing training on bias awareness and mitigation.", sources: [], categories: ["biases","bias-awareness-techniques"], tags: ["type:training"], related: [], status: "verified", notes: "" }
);

GLOSSARY.push(
  // =========================
  // Ethical Dilemma Awareness (meta hub)
  // =========================
  {
    slug: "ethical-dilemma-awareness",
    term: "Ethical Dilemma Awareness",
    aliases: ["ai ethics dilemmas","ethics tradeoffs"],
    definition: "Common tradeoffs and conflict patterns that arise when designing, deploying, or using AI/LLMs—especially where values, rights, risks, and outcomes compete.",
    sources: [],
    categories: ["ethics"],
    tags: ["type:category","topic:ethics","topic:governance"],
    related: ["biases","fairness","transparency","safety-alignment","human-in-the-loop"],
    status: "verified",
    notes: ""
  },

  // =========================
  // Classic/General ethical dilemmas
  // =========================
  {
    slug: "trolley-problem",
    term: "The Trolley Problem",
    aliases: [],
    definition: "Whether to intervene and redirect harm from many to one—used to explore utilitarian vs. deontological tradeoffs.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:ethics","type:dilemma"],
    related: ["fairness","accountability-in-ai-generated-decisions"],
    status: "verified",
    notes: ""
  },
  {
    slug: "autonomy-vs-beneficence-in-medicine",
    term: "Autonomy vs. Beneficence in Medicine",
    aliases: [],
    definition: "Balancing patient self-determination with clinicians’ duty to act for patient benefit when they conflict.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:health","type:dilemma"],
    related: ["informed-consent-in-research","end-of-life-decisions"],
    status: "verified",
    notes: ""
  },
  {
    slug: "whistleblowing-in-the-workplace",
    term: "Whistleblowing in the Workplace",
    aliases: [],
    definition: "Reporting unethical/illegal activity despite risks to employment, status, or relationships.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:governance","type:dilemma"],
    related: ["transparency","accountability-in-ai-generated-decisions"],
    status: "verified",
    notes: ""
  },
  {
    slug: "privacy-vs-security",
    term: "Privacy vs. Security",
    aliases: [],
    definition: "Weighing individual privacy rights against surveillance or data use framed as necessary for safety.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:privacy","type:tradeoff"],
    related: ["data-privacy-and-consent","consent-for-data-use","transparency-vs-proprietary-interests"],
    status: "verified",
    notes: ""
  },
  {
    slug: "animal-rights-vs-scientific-research",
    term: "Animal Rights vs. Scientific Research",
    aliases: [],
    definition: "Balancing animal welfare against projected human/medical benefits from experimentation.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:research","type:dilemma"],
    related: [],
    status: "verified",
    notes: ""
  },
  {
    slug: "cultural-relativism-vs-universal-morality",
    term: "Cultural Relativism vs. Universal Morality",
    aliases: [],
    definition: "Reconciling local norms with asserted universal principles and rights.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:culture","type:tradeoff"],
    related: ["western-centric-bias-and-stereotypes","cultural-bias"],
    status: "verified",
    notes: ""
  },
  {
    slug: "end-of-life-decisions",
    term: "End-of-Life Decisions",
    aliases: [],
    definition: "Choices about life-sustaining treatment for patients unable to decide—balancing autonomy, beneficence, and dignity.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:health","type:dilemma"],
    related: ["informed-consent-in-research"],
    status: "verified",
    notes: ""
  },
  {
    slug: "environmental-ethics-vs-economic-development",
    term: "Environmental Ethics vs. Economic Development",
    aliases: [],
    definition: "Tradeoffs between conservation and growth, jobs, or infrastructure goals.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:environment","type:tradeoff"],
    related: ["environmental-impact-of-training"],
    status: "verified",
    notes: ""
  },
  {
    slug: "conflicts-of-interest",
    term: "Conflicts of Interest",
    aliases: [],
    definition: "When personal interests could compromise professional judgment or duty.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:governance","type:condition"],
    related: ["transparency","ethical-consumerism"],
    status: "verified",
    notes: ""
  },
  {
    slug: "data-privacy-and-consent",
    term: "Data Privacy and Consent",
    aliases: [],
    definition: "Handling personal data with meaningful consent, clear purpose limits, and respect for rights.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:privacy","type:principle"],
    related: ["privacy-vs-security","consent-for-data-use","privacy-and-data-use"],
    status: "verified",
    notes: ""
  },
  {
    slug: "fairness-in-resource-allocation",
    term: "Fairness in Resource Allocation",
    aliases: [],
    definition: "Deciding how to distribute scarce resources equitably (e.g., care, funds, access).",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:fairness","type:dilemma"],
    related: ["fairness","performance-disparities"],
    status: "verified",
    notes: ""
  },
  {
    slug: "intellectual-property-and-plagiarism",
    term: "Intellectual Property and Plagiarism",
    aliases: [],
    definition: "Respecting authorship and ownership while enabling learning, reuse, and creativity.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:ip","type:principle"],
    related: ["intellectual-property-in-training-data","intellectual-property-and-content-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "informed-consent-in-research",
    term: "Informed Consent in Research",
    aliases: [],
    definition: "Ensuring participants understand risks/benefits and freely agree before participation.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:research","type:principle"],
    related: ["autonomy-vs-beneficence-in-medicine"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ethical-consumerism",
    term: "Ethical Consumerism",
    aliases: [],
    definition: "Choosing products/services based on suppliers’ labor, environmental, and governance practices.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:policy","type:practice"],
    related: [],
    status: "verified",
    notes: ""
  },

  // =========================
  // AI/LLM-specific ethical dilemmas
  // =========================
  {
    slug: "artificial-intelligence-and-responsibility",
    term: "Artificial Intelligence and Responsibility",
    aliases: [],
    definition: "Clarifying who is accountable for AI actions/impacts across the lifecycle (designers, deployers, users).",
    sources: [],
    categories: ["ethics","security & safety"],
    tags: ["topic:governance","type:dilemma"],
    related: ["accountability-in-ai-generated-decisions","safety-alignment"],
    status: "verified",
    notes: ""
  },
  {
    slug: "transparency-vs-proprietary-interests",
    term: "Transparency vs. Proprietary Interests",
    aliases: [],
    definition: "Balancing explainability and disclosure needs with IP, safety, or competitive constraints.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:transparency","type:tradeoff"],
    related: ["interpretability-and-explainability","transparency-in-algorithm-design"],
    status: "verified",
    notes: ""
  },
  {
    slug: "misinformation-and-trustworthiness",
    term: "Misinformation and Trustworthiness",
    aliases: [],
    definition: "Preventing generation/propagation of false or misleading content and signaling uncertainty.",
    sources: [],
    categories: ["ethics","benchmarks & evaluations"],
    tags: ["topic:quality","type:risk"],
    related: ["disinformation","freshqa","calibration"],
    status: "verified",
    notes: ""
  },
  {
    slug: "intellectual-property-in-training-data",
    term: "Intellectual Property in Training Data",
    aliases: [],
    definition: "Handling copyrighted material in corpora and respecting usage rights in model outputs.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:ip","type:dilemma"],
    related: ["intellectual-property-and-content-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "responsibility-for-model-actions",
    term: "Responsibility for Model Actions",
    aliases: [],
    definition: "Determining liability for harm resulting from model suggestions, automations, or tools invoked.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:governance","type:dilemma"],
    related: ["artificial-intelligence-and-responsibility","human-in-the-loop"],
    status: "verified",
    notes: ""
  },
  {
    slug: "user-manipulation-and-persuasion",
    term: "User Manipulation and Persuasion",
    aliases: [],
    definition: "Avoiding design patterns that over-influence beliefs or choices beyond users’ informed intent.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:ux","type:risk"],
    related: ["content-moderation-bias","authenticity-vs-sanitization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "accessibility-and-inclusivity-ethics",
    term: "Accessibility and Inclusivity",
    aliases: [],
    definition: "Ensuring equitable access and usable experiences across languages, abilities, cultures, and contexts.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:inclusion","type:principle"],
    related: ["accessibility-and-inclusivity","global-north-dominance","cultural-bias"],
    status: "verified",
    notes: ""
  },
  {
    slug: "environmental-impact-of-training",
    term: "Environmental Impact of Training",
    aliases: [],
    definition: "Considering energy/material costs of training/inference and mitigating environmental externalities.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:environment","type:risk"],
    related: ["environmental-ethics-vs-economic-development"],
    status: "verified",
    notes: ""
  },
  {
    slug: "model-misuse-and-dual-use",
    term: "Model Misuse and Dual Use",
    aliases: [],
    definition: "Preventing harmful applications while enabling beneficial use (e.g., open access vs. weaponization).",
    sources: [],
    categories: ["ethics","security & safety"],
    tags: ["topic:safety","type:risk"],
    related: ["content-safeguards","safety-alignment"],
    status: "verified",
    notes: ""
  },
  {
    slug: "consent-for-data-use",
    term: "Consent for Data Use",
    aliases: [],
    definition: "Obtaining and honoring informed consent for personal data used in training or evaluation.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:privacy","type:principle"],
    related: ["data-privacy-and-consent","privacy-and-data-use"],
    status: "verified",
    notes: ""
  },
  {
    slug: "continuous-learning-and-ethical-drift",
    term: "Continuous Learning and Ethical Drift",
    aliases: [],
    definition: "Handling changing norms over time so updates don’t erode safety, fairness, or compliance.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:responsibility","type:risk"],
    related: ["bias-awareness-techniques","regular-updating-and-reevaluation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "human-replacement-and-job-displacement",
    term: "Human Replacement and Job Displacement",
    aliases: [],
    definition: "Addressing workforce disruption and designing for human-AI complementarity where possible.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:society","type:impact"],
    related: [],
    status: "verified",
    notes: ""
  },
  {
    slug: "interpretability-and-explainability",
    term: "Interpretability and Explainability",
    aliases: [],
    definition: "Providing understandable reasons for outputs—especially in high-stakes contexts.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:transparency","type:principle"],
    related: ["transparency-vs-proprietary-interests","calibration"],
    status: "verified",
    notes: ""
  },
  {
    slug: "cultural-sensitivity-and-localization",
    term: "Cultural Sensitivity and Localization",
    aliases: [],
    definition: "Adapting behavior, tone, and content to local norms without stereotyping or erasure.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:culture","type:principle"],
    related: ["cultural-bias","language-bias"],
    status: "verified",
    notes: ""
  },

  // =========================
  // Western-centrism & global equity (AI ethics)
  // =========================
  {
    slug: "cultural-bias-in-ai-training-data",
    term: "Cultural Bias in AI Training Data",
    aliases: [],
    definition: "Overrepresentation of Western norms/values marginalizes other perspectives.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:data","type:risk"],
    related: ["western-centric-bias-and-stereotypes","global-north-dominance"],
    status: "verified",
    notes: ""
  },
  {
    slug: "western-notions-of-morality-and-ethics",
    term: "Western Notions of Morality and Ethics",
    aliases: [],
    definition: "Dominance of Western ethical frames can distort global moral diversity in AI design and policy.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:culture","type:risk"],
    related: ["cultural-relativism-vs-universal-morality"],
    status: "verified",
    notes: ""
  },
  {
    slug: "economic-priorities-in-ai-development",
    term: "Economic Priorities in AI Development",
    aliases: [],
    definition: "Profit-centric incentives may eclipse broader social and ethical considerations.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:econ","type:risk"],
    related: ["consumerist-orientation","technocentric-perspectives"],
    status: "verified",
    notes: ""
  },
  {
    slug: "privacy-standards-discrepancy",
    term: "Privacy Standards Discrepancy",
    aliases: [],
    definition: "Imposing Western privacy standards may clash with local norms; too little protection can also enable harms.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:privacy","type:tradeoff"],
    related: ["privacy-vs-security","cultural-sensitivity-and-localization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "western-dominance-in-technological-standards",
    term: "Western Dominance in Technological Standards",
    aliases: [],
    definition: "Global norms shaped disproportionately by Western institutions and companies.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:policy","type:risk"],
    related: ["global-north-dominance","platform-centric-narratives"],
    status: "verified",
    notes: ""
  },
  {
    slug: "language-and-cultural-homogenization",
    term: "Language and Cultural Homogenization",
    aliases: [],
    definition: "AI systems may accelerate linguistic/cultural flattening by favoring dominant languages and styles.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:culture","type:impact"],
    related: ["english-language-primacy","english-language-dominance"],
    status: "verified",
    notes: ""
  },
  {
    slug: "imposing-western-legal-and-ethical-norms",
    term: "Imposing Western Legal and Ethical Norms",
    aliases: [],
    definition: "Exporting Western frameworks into diverse contexts risks misfit and marginalization.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:law","type:risk"],
    related: ["western-notions-of-morality-and-ethics","cultural-relativism-vs-universal-morality"],
    status: "verified",
    notes: ""
  },
  {
    slug: "representation-in-ai-decision-making",
    term: "Representation in AI Decision-Making",
    aliases: [],
    definition: "Including diverse cultural voices in governance and system design to counter Western-centric defaults.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:governance","type:practice"],
    related: ["bias-awareness-techniques","multidisciplinary-collaboration"],
    status: "verified",
    notes: ""
  },
  {
    slug: "accessibility-and-inclusivity-in-ai",
    term: "Accessibility and Inclusivity in AI",
    aliases: [],
    definition: "Designing systems for global needs—beyond Western languages, devices, and norms.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:inclusion","type:principle"],
    related: ["accessibility-and-inclusivity-ethics","digital-divide"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ai-and-global-economic-disparity",
    term: "AI and Global Economic Disparity",
    aliases: [],
    definition: "Addressing uneven benefit flows—value accruing to wealthy regions while externalities spread broadly.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:econ","type:impact"],
    related: ["economic-priorities-in-ai-development"],
    status: "verified",
    notes: ""
  },

  // =========================
  // LLM risks in society
  // =========================
  {
    slug: "bias-amplification",
    term: "Bias Amplification",
    aliases: [],
    definition: "Models reinforcing or magnifying existing societal biases present in data or context.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:fairness","type:risk"],
    related: ["targeted-biases","generative-harms"],
    status: "verified",
    notes: ""
  },
  {
    slug: "misrepresentation-of-minorities",
    term: "Misrepresentation of Minorities",
    aliases: [],
    definition: "Under/incorrect representation of minority groups due to data imbalances or stereotypes.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:fairness","type:risk"],
    related: ["targeted-biases","targeted-toxicity-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "privacy-and-data-use",
    term: "Privacy and Data Use",
    aliases: [],
    definition: "Using personal data in ways that respect consent, rights, and context limits.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:privacy","type:principle"],
    related: ["data-privacy-and-consent","consent-for-data-use"],
    status: "verified",
    notes: ""
  },
  {
    slug: "intellectual-property-and-content-generation",
    term: "Intellectual Property and Content Generation",
    aliases: [],
    definition: "Navigating derivative output, style imitation, and licensing constraints for generated content.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:ip","type:dilemma"],
    related: ["intellectual-property-in-training-data"],
    status: "verified",
    notes: ""
  },
  {
    slug: "misinformation-and-fake-news",
    term: "Misinformation and Fake News",
    aliases: [],
    definition: "Reducing the risk of hallucinated or low-quality claims being presented as facts or spread at scale.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:quality","type:risk"],
    related: ["misinformation-and-trustworthiness","freshqa","robustness"],
    status: "verified",
    notes: ""
  },
  {
    slug: "echo-chambers-and-radicalization",
    term: "Echo Chambers and Radicalization",
    aliases: [],
    definition: "Feedback loops that entrench ideologies and escalate polarization.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:society","type:risk"],
    related: ["echo-chamber-effect","availability-cascade"],
    status: "verified",
    notes: ""
  },
  {
    slug: "emotional-manipulation",
    term: "Emotional Manipulation",
    aliases: [],
    definition: "Shaping users’ emotions to steer choices—especially sensitive in political or commercial contexts.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:ux","type:risk"],
    related: ["user-manipulation-and-persuasion"],
    status: "verified",
    notes: ""
  },
  {
    slug: "dependence-and-dehumanization",
    term: "Dependence and Dehumanization",
    aliases: [],
    definition: "Overreliance on LLMs can displace human judgment/interaction and erode skills or empathy.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:society","type:impact"],
    related: ["human-replacement-and-job-displacement"],
    status: "verified",
    notes: ""
  },
  {
    slug: "accountability-in-ai-generated-decisions",
    term: "Accountability in AI-generated Decisions",
    aliases: [],
    definition: "Clarifying responsibility when decisions are influenced or automated by AI outputs.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:governance","type:principle"],
    related: ["responsibility-for-model-actions","artificial-intelligence-and-responsibility"],
    status: "verified",
    notes: ""
  },

  // =========================
  // Moderation, culture, & discourse tradeoffs
  // =========================
  {
    slug: "overcorrection-to-avoid-bias",
    term: "Overcorrection to Avoid Bias",
    aliases: [],
    definition: "Reducing harms without suppressing valid perspectives under a banner of ‘fairness’ or ‘wokeness’.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:fairness","type:tradeoff"],
    related: ["content-moderation-bias","targeted-biases"],
    status: "verified",
    notes: ""
  },
  {
    slug: "censorship-vs-sensitivity",
    term: "Censorship vs. Sensitivity",
    aliases: [],
    definition: "Balancing safety moderation with freedom of expression and legitimate discussion.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:moderation","type:tradeoff"],
    related: ["authenticity-vs-sanitization","content-moderation-bias"],
    status: "verified",
    notes: ""
  },
  {
    slug: "cultural-overgeneralization",
    term: "Cultural Overgeneralization",
    aliases: [],
    definition: "Avoiding stereotypes or sweeping claims about groups when local nuance is required.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:culture","type:risk"],
    related: ["cultural-sensitivity-and-localization","cultural-bias"],
    status: "verified",
    notes: ""
  },
  {
    slug: "historical-revisionism",
    term: "Historical Revisionism",
    aliases: [],
    definition: "Avoiding ungrounded rewriting of history to fit contemporary sensibilities or policies.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:history","type:risk"],
    related: ["misinformation-and-fake-news","knowledge"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ideological-echo-chambers",
    term: "Ideological Echo Chambers",
    aliases: [],
    definition: "Systems reinforcing aligned ideologies rather than exposing diverse perspectives.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:discourse","type:risk"],
    related: ["echo-chambers-and-radicalization","echo-chamber-effect"],
    status: "verified",
    notes: ""
  },
  {
    slug: "diverse-voices-suppression",
    term: "Diverse Voices Suppression",
    aliases: [],
    definition: "Unintended silencing of underrepresented groups while attempting to correct bias.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:inclusion","type:risk"],
    related: ["targeted-biases","representation-in-ai-decision-making"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ethical-whitewashing",
    term: "Ethical Whitewashing",
    aliases: [],
    definition: "Sanitizing or overstating ethical performance without addressing root issues.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:governance","type:risk"],
    related: ["transparency","bias-documentation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "political-correctness-overreach",
    term: "Political Correctness Overreach",
    aliases: [],
    definition: "Over-enforcement of language norms that may dilute discourse or obscure salient issues.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:discourse","type:tradeoff"],
    related: ["censorship-vs-sensitivity","authenticity-vs-sanitization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "authenticity-vs-sanitization",
    term: "Authenticity vs. Sanitization",
    aliases: [],
    definition: "Preserving authentic expression while filtering harmful content.",
    sources: [],
    categories: ["ethics"],
    tags: ["topic:moderation","type:tradeoff"],
    related: ["censorship-vs-sensitivity","emotional-manipulation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "content-moderation-bias",
    term: "Content Moderation Bias",
    aliases: [],
    definition: "Filters that unevenly suppress or privilege viewpoints or groups.",
    sources: [],
    categories: ["ethics","biases"],
    tags: ["topic:moderation","type:risk"],
    related: ["overcorrection-to-avoid-bias","ideological-echo-chambers"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  // --- RAG & Agentic Reasoning (new since 2024) ---
  {
    slug: "agentic-rag",
    term: "Agentic RAG",
    aliases: ["agent-based rag", "reasoning agentic rag"],
    definition: `RAG pipelines that add autonomous agents to plan, decide when/what to retrieve, reflect, and iterate—moving beyond static fetch-then-generate. Typical patterns include planning, tool use, reflection/verification, and memory.`,
    sources: [
      { title: "Agentic RAG survey (2025)", url: "https://arxiv.org/html/2506.10408v1" },
      { title: "What is Agentic RAG? (Weaviate)", url: "https://weaviate.io/blog/what-is-agentic-rag" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:framework", "topic:rag", "topic:reasoning", "phase:prompting"],
    related: ["rat-retrieval-augmented-thoughts", "reflection-or-reasoning-prompting", "graph-rag"],
    status: "verified",
    notes: "Term gained traction in late 2024–2025; emphasizes orchestrated agent loops over fixed RAG."
  },
  {
    slug: "graph-rag",
    term: "GraphRAG",
    aliases: ["graph rag", "graph-based rag"],
    definition: `RAG that constructs and queries a knowledge graph over the corpus, enabling local/global summarization and scalable QA over large private datasets.`,
    sources: [
      { title: "Microsoft Research blog (Feb 13, 2024)", url: "https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/" },
      { title: "GraphRAG paper page (Apr 2024)", url: "https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique", "topic:rag", "topic:retrieval", "phase:prompting"],
    related: ["agentic-rag", "contextual-cues", "domain-priming"],
    status: "verified",
    notes: ""
  },
  // --- Multi-agent prompting / ensembling ---
  {
    slug: "mixture-of-agents-moa",
    term: "Mixture-of-Agents (MoA)",
    aliases: ["moa", "mixture of agents"],
    definition: `An orchestration pattern where multiple LLM agents (often layered) read each other’s outputs and iteratively refine a final response—an alternative to single-model prompting.`,
    sources: [
      { title: "MoA paper (Jun 7, 2024)", url: "https://arxiv.org/abs/2406.04692" },
      { title: "MoA (OpenReview)", url: "https://openreview.net/forum?id=h0ZfDIrj7T" }
    ],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy", "topic:prompting", "topic:ensembling", "phase:prompting"],
    related: ["prompt-ensembling", "shotgun-generation", "parallel-prompting"],
    status: "verified",
    notes: "Empirically strong on AlpacaEval/MT-Bench; not the same as Mixture-of-Experts (MoE)."
  },
  // --- New alignment / training notions that affect prompting interfaces ---
  {
    slug: "self-rewarding-language-models-srlm",
    term: "Self-Rewarding Language Models (SRLM)",
    aliases: ["self-rewarding lm", "llm-as-a-judge self-reward"],
    definition: `Models that generate their own preference signals (via LLM-as-a-judge prompts) during iterative alignment, reducing reliance on human preference labeling.`,
    sources: [
      { title: "Self-Rewarding Language Models (2024–2025)", url: "https://arxiv.org/abs/2401.10020" },
      { title: "SRLM PDF (v3, Mar 28, 2025)", url: "https://arxiv.org/pdf/2401.10020" }
    ],
    categories: ["benchmarks and evaluations"],
    tags: ["type:method", "topic:alignment", "topic:preference", "phase:training"],
    related: ["dpo", "rlaif", "orpo"],
    status: "verified",
    notes: ""
  },
  {
    slug: "orpo-odds-ratio-preference-optimization",
    term: "ORPO (Odds-Ratio Preference Optimization)",
    aliases: ["orpo"],
    definition: `A reference-free preference-optimization algorithm that folds alignment into SFT by penalizing disfavored styles with an odds-ratio objective—simplifying pipelines versus DPO.`,
    sources: [
      { title: "ORPO (arXiv)", url: "https://arxiv.org/abs/2403.07691" },
      { title: "EMNLP 2024 PDF", url: "https://aclanthology.org/2024.emnlp-main.626.pdf" }
    ],
    categories: ["benchmarks and evaluations"],
    tags: ["type:method", "topic:alignment", "phase:training"],
    related: ["dpo", "simpo", "sft"],
    status: "verified",
    notes: ""
  },
  // --- Structured output controls (API-level prompting affordances) ---
  {
    slug: "structured-outputs-json-schema",
    term: "Structured Outputs (JSON Schema)",
    aliases: ["schema-constrained outputs", "strict function calling"],
    definition: `A mode where model outputs are constrained to a developer-supplied JSON Schema (often via tools/function calling), guaranteeing shape-correct structured responses.`,
    sources: [
      { title: "OpenAI: Introducing Structured Outputs (Aug 6, 2024)", url: "https://openai.com/index/introducing-structured-outputs-in-the-api/" },
      { title: "Azure OpenAI: Structured Outputs", url: "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:parameter", "topic:format", "topic:tools", "phase:prompting"],
    related: ["desired-format", "function-calling", "json-mode"],
    status: "verified",
    notes: ""
  },
  // --- Safety: jailbreak trends impacting prompt design ---
  {
    slug: "many-shot-jailbreaking",
    term: "Many-Shot Jailbreaking",
    aliases: ["msj", "long-context jailbreaking"],
    definition: `A long-context attack that supplies hundreds of in-context demonstrations of harmful behavior to steer models into complying with disallowed requests.`,
    sources: [
      { title: "Anthropic research post (Apr 2, 2024)", url: "https://www.anthropic.com/research/many-shot-jailbreaking" },
      { title: "NeurIPS 2024 proceedings entry", url: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/ea456e232efb72d261715e33ce25f208-Abstract-Conference.html" }
    ],
    categories: ["safety and security"],
    tags: ["type:attack", "topic:safety", "topic:robustness", "phase:prompting"],
    related: ["prompt-leakage", "jailbreak-attacks", "refusal-bypass"],
    status: "verified",
    notes: "Highlights risks introduced by very large contexts; informs safer prompt routing/filters."
  },
  // --- Prompt / knowledge distillation (new flavors) ---
  {
    slug: "prompt-distillation",
    term: "Prompt Distillation",
    aliases: ["knowledge injection via prompt distillation"],
    definition: `Distilling knowledge that is present only in prompts (teacher receives extra context) into a student model’s weights—closing the gap between RAG and fine-tuning for new facts.`,
    sources: [
      { title: "Knowledge Injection via Prompt Distillation (Dec 19, 2024)", url: "https://arxiv.org/abs/2412.14964" },
      { title: "HTML version", url: "https://arxiv.org/html/2412.14964v1" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:method", "topic:distillation", "phase:training"],
    related: ["few-shot-code-example-generation", "domain-specific-language-creation", "self-discover-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "personalized-prompt-distillation-peapod",
    term: "Personalized Prompt Distillation (PeaPOD)",
    aliases: ["peapod"],
    definition: `A personalization technique that learns user-specific soft prompts by composing shared prompt components with dynamic weights reflecting user interests.`,
    sources: [
      { title: "PeaPOD (Jul 2024)", url: "https://arxiv.org/abs/2407.05033" },
      { title: "PeaPOD HTML (Feb 2025)", url: "https://arxiv.org/html/2407.05033v2" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique", "topic:personalization", "phase:training"],
    related: ["personalization-and-adaptation", "contextual-cues"],
    status: "verified",
    notes: ""
  },
  // --- Reasoning & alignment patterns tied to new “o-series” style models ---
  {
    slug: "deliberative-alignment",
    term: "Deliberative Alignment",
    aliases: ["deliberate alignment", "spec-based alignment", "spec-reading alignment", "premortem safety reasoning"],
    definition: `A training and runtime pattern for reasoning models where the system explicitly reads relevant safety or policy specifications, performs a short internal “compliance deliberation” (identify risks, applicable rules, trade-offs, allowed actions), then produces a user-facing answer. The hidden deliberation is kept separate from the response, improving policy adherence while preserving clarity and usefulness.`,
    sources: [
      { title: "OpenAI: Deliberative alignment (Dec 20, 2024)", url: "https://openai.com/index/deliberative-alignment/" }
    ],
    categories: ["safety and security", "alignment", "reasoning"],
    tags: ["kind:pattern", "type:method", "topic:alignment", "topic:reasoning", "topic:safety", "phase:training", "phase:inference"],
    related: ["self-critique-prompting", "chain-of-verification-cove", "llm-guardrails", "helpful-honest-harmless-hhh", "constitutional-ai"],
    use: "When outputs must be explicitly policy-aware or compliant without over-refusing.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Regulated domains (health, finance, legal) • Tool-using agents that must check authorization • Enterprise chat with org-specific compliance rules • Safety-critical creative tasks (red-teaming, jailbreak resistance)
Boosters: • Keep a hidden “safety scratchpad” citing the exact rule invoked • Add a checklist: risks → mitigations → decision • Include few-shots where policy reasoning corrected a draft • Pair with CoVe for claim verification
Caveats: Excess deliberation can slow responses—cap tokens and summarize; stale specs can misguide outputs—version and audit policies regularly.`
  },
  {
    slug: "reasoning-tokens-o1-style",
    term: "Reasoning Tokens (o1-style)",
    aliases: ["private thoughts", "deliberate tokens", "hidden chain-of-thought", "internal scratchpad"],
    definition: `A reserved token budget for hidden intermediate reasoning that lets the model plan, check sub-goals, and prune dead ends before emitting a concise public answer. These tokens count toward context but are not surfaced to users, enabling more deliberate problem solving with fewer visible tangents.`,
    sources: [
      { title: "Explainer on o1 reasoning tokens (Oct 8, 2024)", url: "https://leehanchung.github.io/blogs/2024/10/08/reasoning-understanding-o1/" },
      { title: "Press/analysis coverage (Dec 2024)", url: "https://www.theatlantic.com/technology/archive/2024/12/openai-o1-reasoning-models/680906/" }
    ],
    categories: ["reasoning models or structures", "inference behavior"],
    tags: ["kind:term", "type:component", "topic:reasoning", "topic:robustness", "phase:inference"],
    related: ["tree-of-thought-tot", "graph-of-thoughts-got", "plan-and-solve-p-s", "scratchpad-reasoning", "chain-of-thought-cot"],
    use: "When tasks need private planning/analysis but public answers should be terse and policy-safe.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Math/logic/coding steps • Multi-constraint writing (tone, audience, length) • Tool-augmented queries where strategy matters • Reducing leakage of intermediate steps
Boosters: • Encourage brief hidden planning then a crisp final • Set explicit step limits and summarization checkpoints • Combine with CoVe to self-check key claims
Caveats: Hidden steps aren’t auditable; add post-hoc checks for high-stakes contexts.`
  },
  // --- RAG robustness pattern that wasn’t in your file ---
  {
    slug: "corrective-rag-crag",
    term: "Corrective RAG (CRAG)",
    aliases: ["corrective retrieval augmented generation", "corrective RAG", "fallback-aware RAG"],
    definition: `A robustness-oriented RAG pattern that monitors retrieval quality (coverage, relevance, confidence) and conditionally takes corrective actions—re-query, alternate index, live web search, or decompose/recompose—before generating the final answer. By refusing or repairing on weak evidence, it reduces hallucinations and improves faithfulness.`,
    sources: [
      { title: "CRAG (Jan 29, 2024)", url: "https://arxiv.org/abs/2401.15884" },
      { title: "CRAG HTML (updated Oct 2024)", url: "https://arxiv.org/html/2401.15884v3" }
    ],
    categories: ["meta-prompt strategies", "retrieval", "robustness"],
    tags: ["kind:pattern", "type:technique", "topic:rag", "topic:robustness", "topic:verification", "phase:prompting", "phase:inference"],
    related: ["agentic-rag", "chain-of-verification-cove", "fact-check-prompting", "prompt-brittleness", "system-query"],
    use: "When retrieval quality is uneven and answers must adapt or abstain based on evidence.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Enterprise QA over messy KBs • Scientific/medical answers requiring citations • Support over heterogeneous docs • Long-tail search with low recall
Boosters: • Add score thresholds with “answer/repair/refuse” branching • Use query decomposition + recomposition with citations • Log retrieval diagnostics to improve corpora • Teach the model to admit gaps and ask clarifying questions
Caveats: Fallbacks increase latency; tune thresholds and cap steps.`
  },
  // --- Watermarking (text output provenance moved fast in late 2024) ---
  {
    slug: "text-watermarking-synthid-text",
    term: "Text Watermarking (SynthID-Text)",
    aliases: ["synthid text", "output watermarking", "LLM text provenance watermark"],
    definition: `A provenance technique that slightly biases token sampling to embed a detectable signal in generated text. Later, detectors estimate whether a passage is model-generated. Properly tuned, it adds low latency overhead and supports platform-scale provenance workflows; robustness varies with editing/paraphrasing and language shifts.`,
    sources: [
      { title: "Nature paper (2024): SynthID-Text", url: "https://www.nature.com/articles/s41586-024-08025-4" },
      { title: "CMU ML blog: watermarking trade-offs (Sep 27, 2024)", url: "https://blog.ml.cmu.edu/2024/09/27/no-free-lunch-in-llm-watermarking-trade-offs-in-watermarking-design-choices/" }
    ],
    categories: ["safety and security", "provenance", "governance"],
    tags: ["kind:technique", "type:technique", "topic:provenance", "topic:safety", "topic:governance", "phase:inference"],
    related: ["content-authentication", "prompt-leakage", "llm-guardrails"],
    use: "When platforms need scalable signals to estimate whether text was AI-generated.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Platform/content provenance checks • Classroom/exam policy workflows • Newsroom/marketplace authenticity • Forensic auditing and trend estimation
Boosters: • Pair with C2PA-style metadata/cryptographic signing • Publish detector evals (false positives/negatives) • Educate stakeholders on limits (not DRM/ownership)
Caveats: Edits/paraphrases reduce detectability; treat detections probabilistically, not as proof.`
  }
);

// --- Prompting, architectures, training, and evaluation glossary ---
GLOSSARY.push(
  {
    slug: "method-actors",
    term: "Method Actors",
    aliases: ["method-acting prompts", "role-immersion prompting"],
    definition: `A prompting mental model: treat the LLM like an actor, the prompt like a script, and the output like a performance. Immersing the model in a well-specified role (motivation, constraints, voice) often improves puzzle solving, creativity, and consistency versus generic instructions.`,
    sources: [
      { title: "LLMs as Method Actors (arXiv Nov 2024)", url: "https://arxiv.org/abs/2411.05778" }
    ],
    categories: ["prompting strategies", "reasoning"],
    tags: ["kind:technique", "type:mental-model", "topic:prompting", "topic:reasoning", "phase:prompting"],
    related: ["role-playing-prompting", "system-prompt", "prompt-architect", "steerability"],
    use: "When you want sustained style/behavior tied to a persona to guide outputs.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Creative writing in a sustained voice • Tutoring with a defined persona • Debugging by “acting” as a linter/reviewer • Stakeholder simulations
Boosters: • Provide backstory + constraints + objectives • Include forbidden moves to bound the role • Add exemplar replies to anchor tone
Caveats: Overly theatrical prompts can drift; anchor with goals and quality criteria.`
  },
  {
    slug: "multi-objective-directional-prompting-modp",
    term: "Multi-Objective Directional Prompting (MODP)",
    aliases: ["modp", "directional multi-metric prompting"],
    definition: `A prompt optimization framework that treats design as a multi-objective problem (accuracy, safety, style fidelity, latency). Prompts are iteratively adjusted in the “direction” that improves a weighted objective, using small edits and quick evaluations.`,
    sources: [
      { title: "MODP: Multi Objective Directional Prompting (arXiv Apr 2025)", url: "https://arxiv.org/abs/2504.18722" }
    ],
    categories: ["prompting strategies", "evaluation"],
    tags: ["kind:framework", "type:framework", "topic:prompting", "topic:optimization", "phase:evaluation"],
    related: ["greedy-prompt-engineering-strategy-greedy-pes", "self-refine", "chain-of-verification-cove", "prompt-ensembling"],
    use: "When balancing competing goals and needing an auditable path to a tuned prompt.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Balancing safety/utility • Marketing copy tuned for tone + compliance • Coding helpers optimized for correctness + brevity • Education prompts for rigor + friendliness
Boosters: • Define measurable sub-metrics and weights • Use single-edit A/B trials • Record wins/losses to avoid cycling
Caveats: Objectives can conflict; make trade-offs explicit and documented.`
  },
  {
    slug: "mixture-of-formats-mof",
    term: "Mixture of Formats (MOF)",
    aliases: ["prompt format ensembling", "style diversification"],
    definition: `A robustness technique: expose the model to varied prompt styles (ordering, wording, headers) across examples or trials. Diversity in formats reduces brittleness to superficial changes and stabilizes performance.`,
    sources: [
      { title: "Towards LLMs Robustness to Prompt Format Styles (NAACL 2025)", url: "https://aclanthology.org/2025.naacl-srw.51/" }
    ],
    categories: ["prompting strategies", "robustness"],
    tags: ["kind:technique", "type:technique", "topic:robustness", "topic:prompting", "phase:prompting"],
    related: ["prompt-brittleness", "prompt-ensembling", "few-shot-learning"],
    use: "When prompts face diverse user phrasing, locales, or formatting quirks.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Production prompts exposed to many users • RAG where question phrasing varies • Prompt-sensitive evaluation benches
Boosters: • Keep semantics constant; vary structure • Track which styles win on which tasks • Combine with CoVe to catch style-induced errors
Caveats: Too much diversity can dilute signal; curate a small strong set.`
  },
  {
    slug: "greedy-prompt-engineering-strategy-greedy-pes",
    term: "Greedy Prompt Engineering Strategy (Greedy PES)",
    aliases: ["greedy pes", "greedy search prompting"],
    definition: `A systematic strategy that explores prompt variants via small edits, scores each on a validation set, and keeps only improving edits—continuing until no measurable gain remains across chosen metrics.`,
    sources: [
      { title: "Advancing Multimodal LLMs: Optimizing Prompts (Appl. Sci. 2025)", url: "https://www.mdpi.com/2076-3417/15/7/3992" }
    ],
    categories: ["prompting strategies", "evaluation"],
    tags: ["kind:strategy", "type:technique", "topic:optimization", "topic:prompting", "phase:evaluation"],
    related: ["multi-objective-directional-prompting-modp", "automatic-prompt-engineer-ape", "self-refine"],
    use: "When quick, data-driven prompt hill-climbing is acceptable and compute is modest.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • QA/Code bench tuning • Headline/copy optimization • Safety phrasing that minimizes refusals while staying compliant
Boosters: • Freeze data splits; avoid test leakage • Limit edits per round to isolate effects • Log deltas and rationales
Caveats: Can get stuck in local optima; try larger edits or random restarts periodically.`
  },
  {
    slug: "mixture-of-prompt-experts-mope",
    term: "Mixture of Prompt Experts (MoPE)",
    aliases: ["prompt expert routing", "multi-expert prompting"],
    definition: `A multimodal/multi-skill prompting pattern that splits inputs among specialized “prompt experts,” each optimized for a facet (e.g., vision details, OCR, math). Their outputs are fused into a final answer, improving adaptability versus a single monolithic prompt.`,
    sources: [
      { title: "MoPE: Mixture of Prompt Experts (arXiv Jan 2025)", url: "https://arxiv.org/abs/2403.10568" }
    ],
    categories: ["prompting strategies", "architectures"],
    tags: ["kind:framework", "type:framework", "topic:multimodal", "topic:prompting", "phase:inference"],
    related: ["mixture-of-formats-mof", "visual-prompting", "multimodal-chain-of-thought-mm-cot"],
    use: "When tasks benefit from specialty sub-prompts and a lightweight router/fuser.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • VQA with diagrams • Wearables/sensor fusion • Complex forms (layout + text + math)
Boosters: • Define clear expert scopes and handoffs • Add a simple router (keywords/scores) • Validate fusion on adversarial cases
Caveats: Orchestration adds latency; cap experts for real-time needs.`
  },
  {
    slug: "context-aware-decomposition-cad",
    term: "Context-Aware Decomposition (CAD)",
    aliases: ["context-preserving decomposition", "reasoning journal"],
    definition: `Break a complex problem into sub-tasks while maintaining a persistent “reasoning journal” of goals, assumptions, dependencies, and decisions. CAD avoids the failure of losing the big picture during stepwise work.`,
    sources: [
      { title: "Context-Aware Decomposition (Prompt-On, Aug 2025)", url: "https://prompton.wordpress.com/2025/08/03/%F0%9F%9A%80-context-aware-decomposition-supercharge-ai-for-complex-problems-%F0%9F%A7%A9/" }
    ],
    categories: ["prompting strategies", "reasoning"],
    tags: ["kind:technique", "type:technique", "topic:reasoning", "topic:planning", "phase:prompting"],
    related: ["chain-of-thought-cot", "graph-of-thoughts-got", "chain-of-verification-cove"],
    use: "When solving multi-stage tasks that risk context loss across steps.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Specs → implementation plans • Long proofs/multi-hop analysis • Casework with interdependent constraints
Boosters: • Start with mission + constraints • Keep a “Knowns/Unknowns/Decisions” log • Periodically restate the global objective
Caveats: Journals can bloat; summarize and prune after each stage.`
  },
  {
    slug: "automatic-prompt-engineer-ape",
    term: "Automatic Prompt Engineer (APE)",
    aliases: ["automatic prompt engineer", "auto prompt search"],
    definition: `An automated method where one model proposes many candidate instructions and another model scores them on target tasks. Top-performing prompts are retained, reducing manual trial-and-error and often matching human-designed prompts.`,
    sources: [
      { title: "Large Language Models are Human-Level Prompt Engineers (arXiv 2023)", url: "https://arxiv.org/abs/2211.01910" }
    ],
    categories: ["prompting strategies", "automation"],
    tags: ["kind:framework", "type:automation", "topic:prompting", "topic:optimization", "phase:evaluation"],
    related: ["greedy-prompt-engineering-strategy-greedy-pes", "multi-objective-directional-prompting-modp", "self-refine"],
    use: "When you need scalable prompt search across many tasks or audiences.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Bootstrapping prompts for new tasks • Personalizing prompts per locale/audience • Large FAQ/intent catalogs
Boosters: • Constrain search space (sections, tone) • Use small, reliable eval sets • Keep humans in the loop for sanity checks
Caveats: Risk of overfitting to eval set; refresh test items and rotate judges.`
  },
  {
    slug: "recursive-self-improvement-prompting-rsip",
    term: "Recursive Self-Improvement Prompting (RSIP)",
    aliases: ["recursive self-improvement", "multi-round self-review"],
    definition: `An iterative refinement loop: the model drafts an answer, critiques it against a rubric, revises, and repeats for a fixed number of rounds. By serving as its own reviewer, quality improves across clarity, correctness, and structure without external feedback.`,
    sources: [
      { title: "Advances in LLM Prompting (Reddit r/PromptEngineering, 2025)", url: "https://www.reddit.com/r/PromptEngineering/comments/1ki9qwb/advances_in_llm_prompting_and_model_capabilities/" }
    ],
    categories: ["prompting strategies", "editing"],
    tags: ["kind:technique", "type:technique", "topic:iterative", "topic:editing", "phase:inference"],
    related: ["self-refine", "chain-of-verification-cove", "self-critique-prompting"],
    use: "When you can spend extra turns to raise answer quality via self-review.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Polishing essays/reports • Code fixes with tests between rounds • Analytical writing that benefits from second thoughts
Boosters: • Cap iterations (e.g., 2–3) • Provide critique rubrics (accuracy, evidence, style) • Save diffs to avoid reintroducing errors
Caveats: Can drift or over-edit; lock key facts and constraints early.`
  },
  {
    slug: "self-refine",
    term: "Self-Refine",
    aliases: ["self-refinement", "self-edit prompting"],
    definition: `A prompting loop where the model first answers, then generates feedback about its output, and finally produces a revised answer. It improves structure, examples, and coverage with minimal extra guidance.`,
    sources: [
      { title: "Self-Refine: Iterative Refinement with Self-Feedback (arXiv 2023)", url: "https://arxiv.org/abs/2303.17651" }
    ],
    categories: ["prompting strategies", "editing"],
    tags: ["kind:technique", "type:technique", "topic:iterative", "topic:editing", "phase:inference"],
    related: ["recursive-self-improvement-prompting-rsip", "chain-of-thought-cot", "self-critique-prompting"],
    use: "When a single pass is rough and a quick revise can fix clarity/coverage.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Improve clarity/formatting • Expand thin sections with examples • Reduce logical gaps and contradictions
Boosters: • Provide a structured critique checklist • Ask for diffs or tracked changes • Freeze correct parts with “do-not-change” notes
Caveats: Adds latency; reserve for tasks where quality gains matter.`
  },
  {
    slug: "graph-of-thoughts-got",
    term: "Graph of Thoughts (GoT)",
    aliases: ["graph-of-thought", "graph-structured reasoning"],
    definition: `A reasoning paradigm where the model explores multiple branches and merges ideas in a graph rather than a single linear chain. Enables parallel exploration, backtracking, and synthesis across paths—often improving complex problem solving.`,
    sources: [
      { title: "Graph of Thoughts: Solving Elaborate Problems with LLMs (NeurIPS 2023)", url: "https://arxiv.org/abs/2308.09687" }
    ],
    categories: ["prompting strategies", "reasoning"],
    tags: ["kind:framework", "type:framework", "topic:reasoning", "topic:planning", "phase:inference"],
    related: ["chain-of-thought-cot", "tree-of-thought-tot", "plan-and-solve-p-s"],
    use: "When multiple solution paths must be explored and later merged.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Design trade-studies • Multi-path math proofs • Product brainstorming with convergent synthesis
Boosters: • Limit branch width/depth to control cost • Label nodes (claim/evidence/assumption) • Periodically merge to consolidate
Caveats: Graph search costs tokens; prune aggressively.`
  },
  {
    slug: "prompt-layered-architecture-pla",
    term: "Prompt-Layered Architecture (PLA)",
    aliases: ["prompt modules", "prompt pipelines"],
    definition: `A software pattern that treats prompts as first-class components (composition, orchestration, memory, testing). Prompts are versioned, reused, and integrated like code, enabling CI, A/B testing, and safer releases.`,
    sources: [
      { title: "Prompt-Layered Architecture: AI-First Product Design (IJSRM 2024)", url: "https://ijsrm.net/index.php/ijsrm/article/view/5670" }
    ],
    categories: ["architectures", "engineering practices"],
    tags: ["kind:framework", "type:framework", "topic:systems", "topic:orchestration", "phase:orchestration"],
    related: ["langchain", "llama-index", "guidance-library", "function-calling"],
    use: "When building multi-prompt applications that need traceability and reuse.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Strictly formatted multi-prompt apps • Enterprise releases needing traceability • Experiment-heavy teams
Boosters: • Semantic version prompts • Unit tests + golden examples • Log prompt→output→metric lineage
Caveats: Requires product discipline; treat prompts as code.`
  },
  {
    slug: "langgpt-dual-layer-framework",
    term: "LangGPT Dual-Layer Framework",
    aliases: ["langgpt", "dual-layer prompts"],
    definition: `A structured prompt design that separates a human-readable layer (for clarity/editing) from a model-oriented layer (for formatting/control). Encourages reuse, consistency, and reduced trial-and-error.`,
    sources: [
      { title: "LangGPT: Structured Reusable Prompt Design (arXiv Jun 2024)", url: "https://arxiv.org/abs/2402.16929" }
    ],
    categories: ["prompting strategies", "engineering practices"],
    tags: ["kind:framework", "type:framework", "topic:prompting", "topic:templates", "phase:prompting"],
    related: ["prompt-layered-architecture-pla", "prompt-templates", "system-prompt"],
    use: "When teams collaborate on prompt libraries and need consistency at scale.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Team prompt libraries • Teaching prompt literacy • Regulated outputs needing consistent sections
Boosters: • Keep diff-friendly plain text • Use placeholders/validators • Document invariants vs tunable knobs
Caveats: Over-templating can reduce creativity; keep escape hatches.`
  },
  {
    slug: "mega-prompt",
    term: "Mega-Prompt",
    aliases: ["giant prompt", "all-in-one prompt"],
    definition: `A large, detailed prompt that packs all instructions, constraints, and context into one shot. Useful when the model lacks tools or memory; harder to debug and prone to context limits.`,
    sources: [
      { title: "From Mega-Prompts to Prompt Pipelines (Medium Aug 2025)", url: "https://medium.com/@chris.xg.wang/mega-prompts-prompt-pipeline-agentic-team-235e3a794c0d" }
    ],
    categories: ["prompting strategies"],
    tags: ["kind:technique", "type:technique", "topic:context", "topic:prompting", "phase:prompting"],
    related: ["multi-turn-conversation", "prompt-layered-architecture-pla", "context-aware-decomposition-cad"],
    use: "When you must deliver a single self-contained prompt artifact (no tools/memory).",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • One-off complex tasks • Cold-start instructions for constrained models • Sharing a portable prompt recipe
Boosters: • TL;DR summary up top • Clear sections and delimiters • Examples near the rules they illustrate
Caveats: Brittle and token-hungry; prefer pipelines for recurring tasks.`
  },
  {
    slug: "real-time-adaptive-prompting",
    term: "Real-Time Adaptive Prompting",
    aliases: ["dynamic prompting", "stream-adaptive prompting"],
    definition: `Prompts with slots/constraints that update on-the-fly as new signals arrive (user actions, sensors, streaming data). The model adapts strategy and formatting as a session evolves.`,
    sources: [
      { title: "Multimodal Prompt Engineering Trends (GoCodeo Oct 2023)", url: "https://www.gocodeo.com/post/the-future-of-prompt-engineering-towards-multimodal-prompts" }
    ],
    categories: ["prompting strategies", "orchestration"],
    tags: ["kind:technique", "type:technique", "topic:dynamic", "topic:prompting", "phase:inference"],
    related: ["adaptive-prompting", "multi-turn-conversation", "mixture-of-prompt-experts-mope"],
    use: "When inputs evolve during a session and responses must reflect fresh state.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Live dashboards/analyst copilots • Wearables/IoT assistants • Support that reacts to latest events
Boosters: • Define update cadence/priorities • Cache stable context vs volatile slots • Guardrails to prevent thrashing
Caveats: State drift is real; periodically restate goals/constraints.`
  },
  {
    slug: "multimodal-prompting",
    term: "Multimodal Prompting",
    aliases: ["cross-modal prompting", "vision-text prompting"],
    definition: `Prompting that combines text with images, audio, or other signals and asks the model to reason across them. Works best with explicit fusion instructions (what to attend to and how).`,
    sources: [
      { title: "The Future of Prompt Engineering: Multimodal Prompts (GoCodeo 2023)", url: "https://www.gocodeo.com/post/the-future-of-prompt-engineering-towards-multimodal-prompts" }
    ],
    categories: ["prompting strategies", "multimodal"],
    tags: ["kind:technique", "type:technique", "topic:multimodal", "topic:prompting", "phase:prompting"],
    related: ["visual-prompting", "multimodal-chain-of-thought-mm-cot", "mixture-of-prompt-experts-mope"],
    use: "When tasks require grounded reasoning across images/audio/text.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Chart/table Q&A • Document triage (layout + text) • Scene understanding and grounded captioning
Boosters: • Specify attention per modality • Ask for cross-references (cite regions/timestamps) • Provide annotated few-shots
Caveats: Weak fusion risks spurious links; force grounding steps.`
  },
  {
    slug: "multimodal-chain-of-thought-mm-cot",
    term: "Multimodal Chain-of-Thought (MM-CoT)",
    aliases: ["mm-cot", "cross-modal CoT"],
    definition: `Extends chain-of-thought to multiple modalities. The model reasons step-by-step, explicitly referencing how each modality informs the next, making cross-modal logic more transparent and checkable.`,
    sources: [
      { title: "Key Trends Shaping Multimodal Prompting (GoCodeo 2023)", url: "https://www.gocodeo.com/post/the-future-of-prompt-engineering-towards-multimodal-prompts" }
    ],
    categories: ["prompting strategies", "multimodal", "reasoning"],
    tags: ["kind:technique", "type:technique", "topic:multimodal", "topic:reasoning", "phase:inference"],
    related: ["chain-of-thought-cot", "multimodal-prompting", "graph-of-thoughts-got"],
    use: "When stepwise, auditable reasoning across modalities is needed.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Image+text math/physics • Medical imaging with textual context • UI understanding from screenshots + logs
Boosters: • Number steps per modality • Include “evidence → inference” pairs • Force a brief final summary independent of steps
Caveats: For safety, prefer summarized rationales over raw hidden CoT.`
  },
  {
    slug: "role-playing-prompting",
    term: "Role-Playing Prompting",
    aliases: ["role prompting", "persona prompting", "act-as prompting"],
    definition: `Instruct the model to adopt a specific role (e.g., “senior SWE mentor,” “Socratic tutor”). The role constrains tone, scope, and heuristics, improving relevance and style control.`,
    sources: [
      { title: "Role-playing Prompt Framework (arXiv Dec 2024)", url: "https://arxiv.org/abs/2406.00627" }
    ],
    categories: ["prompting strategies"],
    tags: ["kind:technique", "type:technique", "topic:context", "topic:prompting", "phase:prompting"],
    related: ["system-prompt", "steerability", "method-actors"],
    use: "When tone, expertise, and boundaries must be consistently enforced.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Scaffolding instruction • Policy advisors with strict guardrails • Creative genre emulation
Boosters: • Define expertise, boundaries, non-goals • Provide 2–3 exemplar replies • Add a success/failure rubric
Caveats: Role conflicts with system prompts cause drift; keep hierarchy explicit.`
  },
  {
    slug: "llm-guardrails",
    term: "LLM Guardrails",
    aliases: ["guardrails", "safety filters", "policy moderators"],
    definition: `Systems that monitor or shape inputs/outputs to keep them safe, accurate, and on-policy—ranging from regex filters and classifiers to AI moderators or policy transformers that rewrite risky prompts before execution.`,
    sources: [
      { title: "LLM guardrails guide AI outputs (K2View May 2025)", url: "https://www.k2view.com/blog/llm-guardrails/" }
    ],
    categories: ["safety", "governance", "orchestration"],
    tags: ["kind:framework", "type:tool", "topic:safety", "topic:governance", "phase:inference"],
    related: ["jailbreaking-jailbreak-attack", "content-moderation", "deliberative-alignment", "text-watermarking-synthid-text"],
    use: "When deploying assistants at scale with explicit safety/policy requirements.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Consumer chat platforms • Enterprise assistants with sensitive data • Model routing (safe vs expert modes)
Boosters: • Layer lightweight rules + AI checks • Log violations for continuous improvement • Provide respectful refusal templates
Caveats: Over-filtering harms usefulness; tune thresholds and add appeal paths.`
  },
  {
    slug: "plan-and-execute-agent",
    term: "Plan-and-Execute Agent",
    aliases: ["plan/execute architecture", "planner–executor"],
    definition: `An agent pattern that separates high-level planning from stepwise execution (with optional tools). The plan can be revised as new evidence arrives, increasing reliability on multi-step tasks.`,
    sources: [
      { title: "LangChain Blog: Plan-and-Execute Agents (2023)", url: "https://blog.langchain.com/plan-and-execute/" }
    ],
    categories: ["architectures", "agents"],
    tags: ["kind:framework", "type:framework", "topic:agents", "topic:planning", "phase:orchestration"],
    related: ["react", "auto-gpt", "function-calling", "context-aware-decomposition-cad"],
    use: "When tasks require tool use and dynamic replanning to reach a goal.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Search/code/DB workflows • Data pipelines with checkpoints • Complex support flows
Boosters: • Keep plans concise with milestones • Add success criteria per step • Enable re-planning on failure signals
Caveats: Planning overhead adds cost; cache plans for repeated tasks.`
  },
  {
    slug: "guidance-library",
    term: "Guidance (Prompting Library)",
    aliases: ["microsoft guidance", "guidance.js syntax"],
    definition: `An open-source library that intermixes templating, control flow, and LLM calls in a single “prompt program.” Enables structured outputs, deterministic choices, and fewer round trips via directives for generation, selection, and looping.`,
    sources: [
      { title: "Microsoft Guidance GitHub README", url: "https://github.com/microsoft/guidance" }
    ],
    categories: ["tools", "orchestration"],
    tags: ["kind:tool", "type:library", "topic:orchestration", "topic:templates", "phase:inference"],
    related: ["prompt-layered-architecture-pla", "langchain", "function-calling"],
    use: "When you need precise output schemas and control-flow inside prompts.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • JSON-constrained generation • Interactive forms/branching flows • Multi-turn extraction with schemas
Boosters: • Start with minimal templates; add control gradually • Validate with JSON schemas • Unit-test prompt programs
Caveats: DSL coupling can confuse teams; document conventions thoroughly.`
  },
  {
    slug: "function-calling",
    term: "Function Calling",
    aliases: ["tool use JSON", "structured tool invocation"],
    definition: `A capability where the model returns a structured JSON “call” to a developer-defined function when a tool would help. The app executes the function and returns results for the model to incorporate into the final answer.`,
    sources: [
      { title: "OpenAI API introduction of function calling (June 2023)", url: "https://openai.com/blog/function-calling-and-other-api-updates" }
    ],
    categories: ["architectures", "tools"],
    tags: ["kind:pattern", "type:integration", "topic:tools", "topic:orchestration", "phase:orchestration"],
    related: ["toolformer", "plan-and-execute-agent", "guidance-library"],
    use: "When bridging the LLM to external APIs/databases deterministically.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Retrieval, calculators, databases, APIs • Safely executing side-effectful actions • Deterministic integrations (weather, stocks)
Boosters: • Provide clear schemas and examples • Add tool-selection policies and safety checks • Log tool inputs/outputs for debugging
Caveats: Poorly validated arguments cause errors; add guards and fallbacks.`
  },
  {
    slug: "instruction-tuning",
    term: "Instruction Tuning",
    aliases: ["instruction-following fine-tuning", "FLAN-style tuning"],
    definition: `Fine-tuning on diverse instruction–response pairs so the model better follows novel instructions. Improves steerability and helpfulness across many tasks without task-specific training.`,
    sources: [
      { title: "Sebastian Ruder’s NLP Newsletter: Instruction Tuning (Oct 2023)", url: "https://newsletter.ruder.io/p/instruction-tuning-vol-1" }
    ],
    categories: ["training techniques", "alignment"],
    tags: ["kind:training", "type:fine-tuning", "topic:alignment", "topic:instructions", "phase:training"],
    related: ["reinforcement-learning-from-human-feedback-rlhf", "reinforcement-learning-from-ai-feedback-rlaif", "steerability"],
    use: "When improving generic instruction-following behavior of a base model.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • General assistants for broad tasks • Domain adaptation with curated instructions • Improving refusals and tone
Boosters: • Balance task variety and quality • Include safety/style instructions • Track holdout generalization
Caveats: Can dilute raw task skills; consider mixed objectives or adapters.`
  },
  {
    slug: "reinforcement-learning-from-human-feedback-rlhf",
    term: "Reinforcement Learning from Human Feedback (RLHF)",
    aliases: ["rlhf", "preference optimization with humans"],
    definition: `A fine-tuning strategy that trains a reward model on human preference judgments, then optimizes the base model (e.g., PPO/DPO) to produce outputs that humans prefer. Foundational for helpful, harmless assistants.`,
    sources: [
      { title: "OpenAI: Aligning Language Models to Follow Instructions (Jan 2022)", url: "https://openai.com/research/instruction-following" }
    ],
    categories: ["training techniques", "alignment"],
    tags: ["kind:training", "type:fine-tuning", "topic:alignment", "topic:preferences", "phase:training"],
    related: ["instruction-tuning", "reinforcement-learning-from-ai-feedback-rlaif", "alignment-tax"],
    use: "When aligning a model to human preferences and safety policies.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Helpful/harmless assistants • Safety tuning for refusals and tone • Enterprise preference-tailored models
Boosters: • Diverse raters and clear rubrics • Calibrate for honesty (admit limits) • Audit reward hacking/regressions
Caveats: Preference data can encode bias; monitor fairness and drift.`
  },
  {
    slug: "chain-of-verification-cove",
    term: "Chain-of-Verification (CoVe)",
    aliases: ["self-check prompting", "verification chain"],
    definition: `After a first-pass answer, the model generates targeted verification questions, answers them, and revises the final output accordingly. This structured double-check reduces factual errors compared to unverified CoT.`,
    sources: [
      { title: "Chain-of-Verification Prompting (LearnPrompting Sep 2024)", url: "https://learnprompting.org/docs/advanced/self_criticism/chain_of_verification" }
    ],
    categories: ["prompting strategies", "evaluation"],
    tags: ["kind:technique", "type:technique", "topic:verification", "topic:robustness", "phase:inference"],
    related: ["self-refine", "chain-of-thought-cot", "corrective-rag-crag"],
    use: "When claims must be checked explicitly before finalizing an answer.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Long answers with many claims • RAG answers that must cite sources • Summaries that require key fact checks
Boosters: • Cap verification Qs (e.g., 3–5) • Require citations/evidence notes • Keep verification scratchpad separate
Caveats: Adds latency; reserve for material claims.`
  },
  {
    slug: "self-critique-prompting",
    term: "Self-Critique Prompting",
    aliases: ["self-criticism prompting", "self-review prompting"],
    definition: `Prompts that ask the model to critique its own draft (errors, biases, gaps) before finalizing. The critique guides a revised answer and surfaces hidden issues.`,
    sources: [
      { title: "Introduction to Self-Criticism Prompting (LearnPrompting 2023)", url: "https://learnprompting.org/docs/intermediate/self_criticism" }
    ],
    categories: ["prompting strategies", "editing"],
    tags: ["kind:technique", "type:technique", "topic:iterative", "topic:editing", "phase:inference"],
    related: ["self-refine", "chain-of-verification-cove", "recursive-self-improvement-prompting-rsip"],
    use: "When a quick self-review can catch errors, bias, or missing details.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Sensitive communications • Balanced arguments • Code/doc linting
Boosters: • Provide a short critique rubric • Ask for concrete fixes, not just flags • Require a final “clean copy”
Caveats: Models can invent issues; ground critiques with examples.`
  },
  {
    slug: "system-prompt",
    term: "System Prompt",
    aliases: ["system message", "developer message"],
    definition: `A hidden/initial instruction that defines the AI’s role, priorities, tone, and boundaries. It frames all conversation and is the most powerful lever for steerability and safety.`,
    sources: [
      { title: "ChatGPT System Message Example (Product Growth, 2025)", url: "https://www.news.aakashg.com/p/prompt-engineering" }
    ],
    categories: ["architectures", "governance"],
    tags: ["kind:term", "type:instruction", "topic:conversation", "topic:governance", "phase:orchestration"],
    related: ["role-playing-prompting", "steerability", "prompt-layered-architecture-pla"],
    use: "When you need consistent behavior across an entire chat/application.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Branded assistants with consistent style • Safety-bound educational tutors • Multi-tenant apps with different house rules
Boosters: • Keep it short, testable, and versioned • State invariant principles and escalation paths • Include refusal templates and honesty norms
Caveats: Conflicts with user prompts cause instability; make hierarchy explicit.`
  },
  {
    slug: "steerability",
    term: "Steerability",
    aliases: ["controllability", "instruction-following sensitivity"],
    definition: `How reliably a model changes behavior when given new instructions (style, persona, constraints) without retraining. High steerability enables safer, more personalized assistants via prompts alone.`,
    sources: [
      { title: "OpenAI on new model steerability (June 2023)", url: "https://openai.com/blog/function-calling-and-other-api-updates" }
    ],
    categories: ["alignment", "properties"],
    tags: ["kind:term", "type:property", "topic:alignment", "topic:instructions", "phase:inference"],
    related: ["system-prompt", "helpful-honest-harmless-hhh", "instruction-tuning"],
    use: "When selecting models or designing prompts that must reliably change behavior.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Enterprise tone/style alignment • Accessibility modes (plain language) • Region-specific legal phrasing
Boosters: • Use explicit constraints and examples • Prefer short, assertive directives • Test across diverse prompts
Caveats: Steerability varies by model/task; measure rather than assume.`
  },
  {
    slug: "alignment-tax",
    term: "Alignment Tax",
    aliases: ["safety tax", "preference-tuning tradeoff"],
    definition: `The observed trade-off where aligning a model for safety/helpfulness may reduce performance on some raw capability benchmarks. Good design tries to minimize this tax through data mixing and careful objectives.`,
    sources: [
      { title: "OpenAI: Aligning Models, potential alignment tax (Jan 2022)", url: "https://openai.com/research/instruction-following" }
    ],
    categories: ["alignment", "trade-offs"],
    tags: ["kind:term", "type:concept", "topic:alignment", "topic:tradeoffs", "phase:training"],
    related: ["reinforcement-learning-from-human-feedback-rlhf", "helpful-honest-harmless-hhh", "instruction-tuning"],
    use: "When communicating or measuring the costs of alignment interventions.",
    level: "intermediate",
    status: "verified",
    notes: `Use-cases: • Model selection/policy decisions • Stakeholder discussions of safety vs capability • Designing balanced eval suites
Boosters: • Track safety and capability metrics jointly • Try hybrid data (instruction + pretrain mix) • Use adapters to preserve skills
Caveats: Goodhart’s law—optimizing one metric may degrade others.`
  },
  {
    slug: "helpful-honest-harmless-hhh",
    term: "Helpful, Honest, Harmless (HHH)",
    aliases: ["hhh", "helpful-honest-harmless"],
    definition: `A set of goals for aligned assistants: be useful (helpful), truthful and transparent about uncertainty (honest), and avoid causing harm or violating policies (harmless). Often operationalized via constitutions and preference training.`,
    sources: [
      { title: "Constitutional AI (Anthropic Dec 2022)", url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" }
    ],
    categories: ["alignment", "principles"],
    tags: ["kind:term", "type:principle", "topic:alignment", "topic:principles", "phase:training"],
    related: ["constitutional-ai", "reinforcement-learning-from-human-feedback-rlhf", "steerability"],
    use: "When defining acceptance criteria and behaviors for assistants.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Safety reviews and red-teaming • Public-facing policy docs • Evaluating assistants on real user tasks
Boosters: • Concrete examples per principle • Honesty about limits and sources • Balanced datasets reflecting values
Caveats: Principles can conflict; define tie-breakers and escalation.`
  },
  {
    slug: "constitutional-ai",
    term: "Constitutional AI",
    aliases: ["constitution-guided alignment", "RLAIF with principles"],
    definition: `An alignment approach where a written “constitution” of principles guides the model to critique and revise its outputs. Feedback can be AI-generated (RLAIF) and used to optimize toward stated values.`,
    sources: [
      { title: "Anthropic: Constitutional AI (Dec 2022)", url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" }
    ],
    categories: ["alignment", "training techniques"],
    tags: ["kind:framework", "type:training", "topic:alignment", "topic:principles", "phase:training"],
    related: ["reinforcement-learning-from-ai-feedback-rlaif", "helpful-honest-harmless-hhh", "self-critique-prompting"],
    use: "When scaling value-aligned behavior using explicit principles and AI feedback.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Safety-first assistants • Domain-specific codes of conduct • Multi-lingual value alignment
Boosters: • Keep principles short/testable • Include counterexamples/edge cases • Re-audit periodically for drift
Caveats: Constitutions embed value choices; document provenance and stakeholder input.`
  },
  {
    slug: "reinforcement-learning-from-ai-feedback-rlaif",
    term: "Reinforcement Learning from AI Feedback (RLAIF)",
    aliases: ["AI preference learning", "AI-feedback alignment"],
    definition: `A training method akin to RLHF, but feedback comes from an AI judge (or the model itself) rather than human annotators. Useful for scaling preference data when human labels are scarce, often seeded by a constitution or rubric.`,
    sources: [
      { title: "Anthropic: Constitutional AI (Dec 2022)", url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" }
    ],
    categories: ["alignment", "training techniques"],
    tags: ["kind:training", "type:training", "topic:alignment", "topic:preferences", "phase:training"],
    related: ["reinforcement-learning-from-human-feedback-rlhf", "constitutional-ai", "instruction-tuning"],
    use: "When scaling preference optimization beyond what human labeling can support.",
    level: "advanced",
    status: "verified",
    notes: `Use-cases: • Rapid iteration on safety rubrics • Bootstrapping preference models • Large-scale preference alignment
Boosters: • Calibrate AI judges to human judgments • Adversarial tests for shortcutting • Mix in human gold labels to reduce drift
Caveats: AI judges can amplify bias; monitor with fairness audits.`
  },
  {
    slug: "prompt-brittleness",
    term: "Prompt Brittleness",
    aliases: ["prompt sensitivity", "format fragility"],
    definition: `A failure mode where small, semantically irrelevant changes in prompt wording/layout cause large swings in output quality. Motivates robustness techniques like MOF, ensembling, and style-insensitive training.`,
    sources: [
      { title: "Prompt Brittleness and MOF (NAACL 2025)", url: "https://aclanthology.org/2025.naacl-srw.51/" }
    ],
    categories: ["challenges", "robustness"],
    tags: ["kind:term", "type:issue", "topic:robustness", "topic:prompting", "phase:prompting"],
    related: ["mixture-of-formats-mof", "prompt-ensembling", "chain-of-verification-cove"],
    use: "When diagnosing failures or hardening prompts for varied user phrasing.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • Cross-locale/style evaluations • Production prompts exposed to user rewrites • Safety prompts vulnerable to adversarial phrasing
Boosters: • Test with paraphrase banks • Add explicit structure (sections, bullets) • Provide multiple style exemplars
Caveats: Don’t overfit to one style; measure across variations.`
  },
  {
    slug: "eliza-effect",
    term: "ELIZA Effect",
    aliases: ["eliza", "anthropomorphic fallacy in AI"],
    definition: `The human tendency to attribute genuine understanding or intent to an AI’s outputs. Named after the 1960s ELIZA chatbot, which used simple pattern matching yet appeared human to users. Designers should counteract misplaced trust.`,
    sources: [
      { title: "Wikipedia: ELIZA effect", url: "https://en.wikipedia.org/wiki/ELIZA_effect" }
    ],
    categories: ["challenges", "human–AI interaction"],
    tags: ["kind:term", "type:cognitive-bias", "topic:human-ai", "topic:trust", "phase:usage"],
    related: ["hallucinations", "anthropomorphism", "llm-guardrails"],
    use: "When educating users/teams about model limits and preventing over-trust.",
    level: "beginner",
    status: "verified",
    notes: `Use-cases: • UX copy warning users about limits • Onboarding/training materials • Transparency and consent features
Boosters: • Encourage citations/evidence • Use uncertainty language and limitations • Provide model cards/behavior summaries
Caveats: Over-trust leads to misuse; add friction for high-stakes claims.`
  },
   {
    slug: "chatgpt",
    term: "ChatGPT",
    aliases: ["openai chat", "chat gpt", "chatgpt ui", "chatgpt assistant"],
    definition: `OpenAI’s conversational AI product (public launch Nov 2022) that popularized LLM-based dialogue. ChatGPT wraps instruction-tuned GPT models behind a chat interface with system/user/assistant roles, safety guardrails, and optional tools (e.g., web browsing, code execution). It demonstrated how careful prompting enables coding help, drafting, Q&A, tutoring, and creative work—making prompt design a mainstream skill.`,
    sources: [
      { title: "History of ChatGPT (SearchEngineJournal)", url: "https://www.searchenginejournal.com/history-of-chatgpt/484476/" }
    ],
    categories: ["systems", "interfaces", "assistants"],
    tags: [
      "kind:term",
      "type:product",
      "topic:chatbot",
      "topic:llm",
      "phase:usage",
      "use:conversational-assistant",
      "level:beginner"
    ],
    related: ["gpt-4", "gpt-3-5-turbo", "function-calling", "system-prompt", "role-playing-prompting"],
    status: "verified",
    notes: `Use-cases: • Everyday Q&A and research drafting • Code explanation, debugging, and quick prototypes • Structured writing (emails, briefs, outlines) • Tutoring with step-by-step scaffolding • Brainstorming and style exploration
Boosters: • Provide clear role, goal, constraints at the top • Give input data as bullet lists or JSON for clarity • Ask for sources, assumptions, and next steps • Use follow-ups to iteratively refine tone and scope
Caveats: Model knowledge lags real time unless browsing/tools are enabled; avoid over-trust (ELIZA effect) and request citations for factual claims.`
  },
  {
    slug: "gpt-4",
    term: "GPT-4",
    aliases: ["gpt4", "openai gpt-4", "gpt-4 turbo"],
    definition: `OpenAI’s flagship large language model (announced Mar 2023). Multimodal (accepts text and images), stronger reasoning and adherence to instructions than prior generations, long context variants, and support for features like function calling and tool use. Widely used for complex analysis, coding, and domain-specific assistants.`,
    sources: [
      { title: "OpenAI: GPT-4", url: "https://openai.com/research/gpt-4" }
    ],
    categories: ["systems", "models"],
    tags: [
      "kind:term",
      "type:model",
      "topic:llm",
      "topic:multimodal",
      "phase:inference",
      "use:general-reasoning",
      "level:advanced"
    ],
    related: ["chatgpt", "gpt-3-5-turbo", "function-calling", "plan-and-execute-agent"],
    status: "verified",
    notes: `Use-cases: • Complex coding and algorithmic tasks • Legal/finance/style-constrained drafting • Data extraction and transformation with schemas • Multimodal reasoning over images + text
Boosters: • Provide schemas/examples for structured outputs • Constrain temperature and specify step limits • Use tool calling for retrieval/math • Add verification passes (CoVe) for important claims
Caveats: Cost/latency higher than smaller models; still susceptible to hallucinations without grounding.`
  },
  {
    slug: "claude-2",
    term: "Claude 2",
    aliases: ["anthropic claude", "claude2"],
    definition: `Anthropic’s second-generation assistant (Jul 2023) emphasizing the Helpful-Honest-Harmless (HHH) alignment philosophy. Known for long context handling, careful formatting, and strong summarization and reasoning on lengthy documents; trained with Constitutional AI techniques.`,
    sources: [
      { title: "Anthropic Claude 2 Announcement (July 2023)", url: "https://www.anthropic.com/index/claude-2" }
    ],
    categories: ["systems", "models", "assistants"],
    tags: [
      "kind:term",
      "type:model",
      "topic:llm",
      "topic:alignment",
      "phase:inference",
      "use:long-context-assistant",
      "level:advanced"
    ],
    related: ["helpful-honest-harmless-hhh", "constitutional-ai", "rlaif", "system-prompt"],
    status: "verified",
    notes: `Use-cases: • Summarizing and analyzing long PDFs • Polite, structured customer support • Brainstorming with clear sectioning • Safer content generation aligned to principles
Boosters: • Provide headings and checklists to guide output • Specify tone and refusal rules explicitly • Supply exemplar responses to anchor formatting
Caveats: Conservative refusals in some domains; still requires citations/grounding for factual reliability.`
  },
  {
    slug: "llama-2",
    term: "LLaMA 2",
    aliases: ["llama2", "meta llama 2", "llama-2-chat"],
    definition: `Meta’s open family of 7B/13B/70B models (Jul 2023) with base and chat variants. Popular for on-prem and custom deployments due to permissive licensing, strong community tooling, and fine-tuning options. Instruction-tuned chat versions aim for safer dialogue while remaining adaptable.`,
    sources: [
      { title: "Meta AI: LLaMA 2 (July 2023)", url: "https://ai.meta.com/llama/" }
    ],
    categories: ["systems", "models", "open-source"],
    tags: [
      "kind:term",
      "type:model",
      "topic:open-llm",
      "topic:llm",
      "phase:inference",
      "use:on-prem-customization",
      "level:intermediate"
    ],
    related: ["alpaca", "vicuna", "mistral-7b", "falcon-llm", "wizardlm"],
    status: "verified",
    notes: `Use-cases: • Private deployments with custom data • Lightweight chatbots and RAG systems • Domain fine-tuning (LoRA/QLoRA) • Edge or cost-sensitive workloads
Boosters: • Use high-quality instruction data for tuning • Add retrieval grounding to reduce hallucinations • Evaluate with domain-specific benchmarks
Caveats: Smaller variants trail frontier models on complex reasoning; safety behavior depends on fine-tuning data.`
  },
  {
    slug: "gpt-3-5-turbo",
    term: "GPT-3.5 Turbo",
    aliases: ["gpt-3-5", "gpt3-5", "gpt-3.5 turbo"],
    definition: `Chat-optimized successor to GPT-3 that powered the initial ChatGPT launch. Favored for speed and cost; handles everyday tasks well but is less reliable than GPT-4 on complex, multi-step reasoning. Strong when prompts are explicit, structured, and example-rich.`,
    sources: [
      { title: "OpenAI Model Index (2023)", url: "https://platform.openai.com/docs/models/gpt-3-5" }
    ],
    categories: ["systems", "models"],
    tags: [
      "kind:term",
      "type:model",
      "topic:llm",
      "phase:inference",
      "use:cost-efficient-assistant",
      "level:intermediate"
    ],
    related: ["chatgpt", "gpt-4", "system-prompt", "role-playing-prompting"],
    status: "verified",
    notes: `Use-cases: • Drafting and summarization • Simple coding tasks • Customer replies and templates • Data cleanup and reformatting
Boosters: • Provide stepwise instructions and examples • Constrain output formats tightly • Lower temperature for consistency
Caveats: Prone to shallow reasoning; add verification or switch to larger models for critical tasks.`
  },
  {
    slug: "bard",
    term: "Bard",
    aliases: ["google bard", "bard ai", "google conversational ai"],
    definition: `Google’s conversational interface (2023) initially built on PaLM/PaLM-2 and integrated with Google services. Emphasizes up-to-date answers via search integration and image input support in some modes. Response style and policy boundaries differ from OpenAI offerings.`,
    sources: [
      { title: "Google Blog: Bard Expansion (May 2023)", url: "https://blog.google/technology/ai/updates-to-bard/" }
    ],
    categories: ["systems", "interfaces", "assistants"],
    tags: [
      "kind:term",
      "type:product",
      "topic:llm",
      "topic:search",
      "phase:usage",
      "use:search-grounded-assistant",
      "level:beginner"
    ],
    related: ["chatgpt", "bing-chat", "function-calling", "multimodal-prompting"],
    status: "verified",
    notes: `Use-cases: • Web-grounded Q&A • Image-assisted prompts (where available) • Travel and local info lookups • Quick ideation with links
Boosters: • Ask for citations and “compare sources” • Provide clear constraints and required data points • Use bullet prompts to reduce drift
Caveats: Policies and output formats differ; expect variation vs other assistants.`
  },
  {
    slug: "ernie-bot",
    term: "ERNIE Bot",
    aliases: ["ernie bot", "baidu ernie", "wenxin yiyan"],
    definition: `Baidu’s LLM-based chatbot (Mar 2023) tuned primarily for Chinese language and cultural context. Supports multi-turn dialogue, code, and knowledge tasks; alignment and refusal behavior reflect local regulations and datasets.`,
    sources: [
      { title: "Reuters: Baidu ERNIE Bot Launch News (Mar 2023)", url: "https://www.reuters.com/technology/baidus-chatgpt-equivalent-ernie-bot-falls-short-expectations-2023-03-16/" }
    ],
    categories: ["systems", "assistants", "regional"],
    tags: [
      "kind:term",
      "type:product",
      "topic:llm",
      "topic:regional",
      "phase:usage",
      "use:zh-focused-assistant",
      "level:intermediate"
    ],
    related: ["chatgpt", "vicuna", "llama-2"],
    status: "verified",
    notes: `Use-cases: • Chinese language Q&A and writing • Code and data tasks localized to Chinese content • Enterprise integrations in the CN ecosystem
Boosters: • Provide precise Chinese prompts and examples • Use domain vocabulary to disambiguate • Request citations where possible
Caveats: Cross-language queries may underperform; regulatory constraints affect outputs.`
  },
  {
    slug: "bing-chat",
    term: "Bing Chat",
    aliases: ["bing ai", "microsoft bing chat", "bing copilot (early)"],
    definition: `Microsoft’s GPT-4-powered chat integrated with Bing search (Feb 2023). Pioneered grounded answers with inline citations, distinct response modes, and visible effects of hidden system prompts—showcasing prompt leakage risks and the value of tool-augmented chat.`,
    sources: [
      { title: "Microsoft: Next-Gen Bing Announcement (Feb 2023)", url: "https://blogs.microsoft.com/blog/2023/02/07/bing-chatgpt/amp/" }
    ],
    categories: ["systems", "search", "assistants"],
    tags: [
      "kind:term",
      "type:product",
      "topic:search",
      "topic:llm",
      "phase:usage",
      "use:cited-web-answers",
      "level:beginner"
    ],
    related: ["chatgpt", "function-calling", "react", "prompt-leakage", "llm-guardrails"],
    status: "verified",
    notes: `Use-cases: • Source-backed answers • Comparison shopping or spec lookups • News digests with links • Research starting points
Boosters: • Ask for numbered sources and quotes • Request pros/cons and uncertainty • Use “compare X vs Y” patterns
Caveats: Grounding reduces but does not eliminate hallucinations; verify links and dates.`
  },
  {
    slug: "wizardlm",
    term: "WizardLM",
    aliases: ["wizard lm", "wizard-vicuna (family)"],
    definition: `Open fine-tuned models trained with Evol-Instruct (progressively harder instructions). Noted for strong instruction following relative to base LLaMA, making small/medium models more capable at complex multi-step prompts.`,
    sources: [
      { title: "WizardLM GitHub (2023)", url: "https://github.com/nlpxucan/WizardLM" }
    ],
    categories: ["systems", "models", "open-source"],
    tags: [
      "kind:term",
      "type:model",
      "topic:open-llm",
      "topic:instruction-tuning",
      "phase:inference",
      "use:strong-instruction-following",
      "level:intermediate"
    ],
    related: ["llama-2", "vicuna", "alpaca", "instruction-tuning"],
    status: "verified",
    notes: `Use-cases: • Budget chat assistants • Educational/stepwise explanations • Synthetic data generation via instructions
Boosters: • Provide explicit step lists and examples • Constrain output format to reduce drift • Add retrieval grounding for factuality
Caveats: Still trails frontier models on deep reasoning; safety depends on tuning data.`
  },
  {
    slug: "vicuna",
    term: "Vicuna",
    aliases: ["vicuna-13b", "lmsys vicuna"],
    definition: `Influential 13B chat model (Mar 2023) fine-tuned from LLaMA on user-shared ChatGPT conversations. Showed small models can reach a large fraction of commercial quality with high-quality instruction data and evaluation via GPT-4 judging.`,
    sources: [
      { title: "Vicuna: An Open Chatbot Impressing GPT-4 (LMSYS 2023)", url: "https://vicuna.lmsys.org" }
    ],
    categories: ["systems", "models", "open-source"],
    tags: [
      "kind:term",
      "type:model",
      "topic:open-llm",
      "topic:instruction-tuning",
      "phase:inference",
      "use:open-chat-model",
      "level:intermediate"
    ],
    related: ["alpaca", "llama-2", "wizardlm", "instruction-tuning"],
    status: "verified",
    notes: `Use-cases: • Community chatbots • Prompt experiments mirroring ChatGPT style • Educational demos of instruction tuning
Boosters: • Use role formatting (system/user/assistant) • Provide few-shot dialogues • Add guardrails via prompts and filters
Caveats: Training data provenance matters; evaluate for data leakage and bias.`
  },
  {
    slug: "alpaca",
    term: "Alpaca",
    aliases: ["stanford alpaca", "alpaca-7b"],
    definition: `7B instruction-tuned model (Mar 2023) from Stanford CRFM using 52K demonstrations generated by a stronger model (Self-Instruct). Sparked the hobbyist wave of low-cost instruction tuning from base LLaMA checkpoints.`,
    sources: [
      { title: "Stanford CRFM: Alpaca Blog (2023)", url: "https://crfm.stanford.edu/2023/03/13/alpaca.html" }
    ],
    categories: ["systems", "models", "open-source"],
    tags: [
      "kind:term",
      "type:model",
      "topic:open-llm",
      "topic:instruction-tuning",
      "phase:inference",
      "use:lightweight-instruct-model",
      "level:beginner"
    ],
    related: ["self-instruct", "vicuna", "llama-2", "wizardlm"],
    status: "verified",
    notes: `Use-cases: • Entry-level assistants • Local/on-device experiments • Educational demos of instruction-tuning
Boosters: • Keep prompts simple and explicit • Use retrieval for factual tasks • Evaluate carefully on safety and bias
Caveats: Limited capacity; expect lower reliability on complex reasoning.`
  },
  {
    slug: "stablelm",
    term: "StableLM",
    aliases: ["stability ai stablelm", "stablelm-instruct"],
    definition: `Open models from Stability AI (2023) with permissive licensing in several sizes. Early versions required stronger prompting but provided an open alternative suitable for customization and research.`,
    sources: [
      { title: "Stability AI StableLM Announcement (2023)", url: "https://stability.ai/blog/stability-ai-launches-the-first-of-its-stablelm-suite-of-language-models" }
    ],
    categories: ["systems", "models", "open-source"],
    tags: [
      "kind:term",
      "type:model",
      "topic:open-llm",
      "phase:inference",
      "use:open-permissive-base",
      "level:beginner"
    ],
    related: ["llama-2", "falcon-llm", "mistral-7b"],
    status: "verified",
    notes: `Use-cases: • Open research and benchmarks • Domain adaptation experiments • Lightweight chat after fine-tuning
Boosters: • Add instruction data and guardrails • Use schema constraints for extraction • Combine with retrieval for accuracy
Caveats: Out-of-box quality trails newer open bases; plan for tuning.`
  },
  {
    slug: "mistral-7b",
    term: "Mistral 7B",
    aliases: ["mistral ai 7b", "mistral-instruct 7b"],
    definition: `High-performing 7B open model (Sept 2023) demonstrating strong efficiency for its size due to data/architecture choices. Popular as a compact base for chat and code after instruction tuning.`,
    sources: [
      { title: "Mistral AI Technical Card (2023)", url: "https://mistral.ai/blog/mistral-7b" }
    ],
    categories: ["systems", "models", "open-source"],
    tags: [
      "kind:term",
      "type:model",
      "topic:open-llm",
      "topic:efficiency",
      "phase:inference",
      "use:small-but-strong-base",
      "level:intermediate"
    ],
    related: ["llama-2", "vicuna", "falcon-llm"],
    status: "verified",
    notes: `Use-cases: • Edge and cost-sensitive deployments • Chat/code copilots on modest hardware • Fine-tuned domain assistants
Boosters: • Prefer high-quality instruction sets • Add RL/RLAIF for safety • Quantize carefully to preserve reasoning
Caveats: Smaller context/reasoning ceiling vs frontier models; design tasks accordingly.`
  },
  {
    slug: "falcon-llm",
    term: "Falcon LLM",
    aliases: ["falcon-40b", "falcon-7b", "tii falcon"],
    definition: `Open models from TII (UAE) trained on refined web corpora; known for good coding ability and commercial-friendly licensing (variant dependent). Instruct versions provide strong baseline chat behavior.`,
    sources: [
      { title: "TII Falcon LLM Release Notes (2023)", url: "https://huggingface.co/tiiuae" }
    ],
    categories: ["systems", "models", "open-source"],
    tags: [
      "kind:term",
      "type:model",
      "topic:open-llm",
      "topic:coding",
      "phase:inference",
      "use:code-friendly-open-model",
      "level:intermediate"
    ],
    related: ["mistral-7b", "llama-2", "stablelm"],
    status: "verified",
    notes: `Use-cases: • Coding copilots • General open chat assistants • Commercial deployments with permissive terms
Boosters: • Provide unit tests/examples for code tasks • Use deterministic decoding for reproducibility • Add retrieval for docs/specs
Caveats: Evaluate license details per variant; ensure guardrails for production.`
  },
  {
    slug: "toolformer",
    term: "Toolformer",
    aliases: ["self-taught tool use", "toolformer model"],
    definition: `Research prototype where a model learns when/how to call external tools by inserting API calls during generation (e.g., calculator, search) and training on self-labeled data. Anticipated later production patterns like function calling and tool-augmented reasoning.`,
    sources: [
      { title: "Toolformer: Language Models Can Teach Themselves to Use Tools (Feb 2023)", url: "https://arxiv.org/abs/2302.04761" }
    ],
    categories: ["architectures", "research", "tool-use"],
    tags: [
      "kind:pattern",
      "type:research",
      "topic:tools",
      "topic:reasoning",
      "phase:orchestration",
      "use:auto-learned-tool-calls",
      "level:advanced"
    ],
    related: ["function-calling", "react", "plan-and-execute-agent", "tool-augmentation"],
    status: "verified",
    notes: `Use-cases: • Prototype agents requiring calculators/search • Training pipelines that seed tool skills • Inspiration for structured tool APIs
Boosters: • Provide minimal tool examples, then scale self-supervision • Validate arguments/outputs strictly • Log tool success/failure for feedback
Caveats: Self-labeled data can encode shortcuts; keep human evals in the loop.`
  },
  {
    slug: "tool-augmentation",
    term: "Tool Augmentation",
    aliases: ["tool-use", "tool-integrated prompting", "tool-augmented llm"],
    definition: `General pattern where an LLM decides to call external tools/APIs to overcome weaknesses (math, retrieval, actions). Tools return structured results the model weaves into its answer, improving accuracy, freshness, and capabilities.`,
    sources: [
      { title: "OpenAI on function calling (Jun 2023)", url: "https://openai.com/blog/function-calling-and-other-api-updates" }
    ],
    categories: ["architectures", "patterns", "tool-use"],
    tags: [
      "kind:pattern",
      "type:concept",
      "topic:tools",
      "topic:retrieval",
      "phase:orchestration",
      "use:extend-capabilities",
      "level:intermediate"
    ],
    related: ["function-calling", "react", "plan-and-execute-agent", "corrective-rag-crag"],
    status: "verified",
    notes: `Use-cases: • Grounded Q&A with citations • Numerical/logic tasks via calculators/solvers • Workflow automation (database, email, tickets)
Boosters: • Define clear schemas and safety checks • Route to the right tool with policies • Cache tool results and handle failures gracefully
Caveats: Tool misuse can amplify errors; add argument validation, rate limits, and auditing.`
  },
  {
    slug: "ai-text-detection",
    term: "AI Text Detection",
    aliases: ["ai-generated text detection", "llm output detection", "ai authorship detection"],
    definition: `Methods to estimate whether text was written by a human or an AI, including classifiers and embedded signals (e.g., watermarks). Accuracy is variable; paraphrasing and translation can defeat naïve detectors. Best used as probabilistic signals within larger provenance systems.`,
    sources: [
      { title: "BuiltIn: The Eliza Effect (context)", url: "https://builtin.com/hardware/eliza-effect-anthropomorphizing-ai" }
    ],
    categories: ["safety", "provenance", "governance"],
    tags: [
      "kind:technique",
      "type:tool",
      "topic:misuse",
      "topic:provenance",
      "phase:post-processing",
      "use:probabilistic-authorship-signal",
      "level:intermediate"
    ],
    related: ["watermarking", "text-watermarking-synthid-text", "content-authentication", "llm-guardrails"],
    status: "verified",
    notes: `Use-cases: • Classroom policy workflows • Platform triage and review queues • Authorship audits in publishing
Boosters: • Combine multiple signals (metadata, C2PA, watermark, stylometry) • Publish false-positive/negative rates • Use thresholds and human review for decisions
Caveats: Do not treat detection as proof; avoid punitive use without corroboration.`
  },
  {
    slug: "watermarking",
    term: "Watermarking",
    aliases: ["text watermarking", "ai output watermarking", "llm watermarking"],
    definition: `Embedding detectable statistical patterns into generated text (via sampling bias) so later checks can estimate AI authorship. Helps with provenance but is sensitive to editing/paraphrase and must balance detectability, robustness, and false alarms.`,
    sources: [
      { title: "AI & Ethics article (context)", url: "https://link.springer.com/article/10.1007/s43681-023-00259-0" }
    ],
    categories: ["safety", "provenance", "techniques"],
    tags: [
      "kind:technique",
      "type:technique",
      "topic:provenance",
      "topic:safety",
      "phase:inference",
      "use:mark-ai-generated-text",
      "level:intermediate"
    ],
    related: ["ai-text-detection", "text-watermarking-synthid-text", "content-authentication", "llm-guardrails"],
    status: "verified",
    notes: `Use-cases: • Platform-scale provenance checking • Classroom and exam integrity • Media authenticity pipelines
Boosters: • Pair with cryptographic signing/metadata (C2PA) • Publicly evaluate robustness and FP/FN rates • Educate stakeholders on limits
Caveats: Not tamper-proof; paraphrasing/translation degrade signals. Treat outputs as probabilistic evidence.`
  },
  {
    slug: "chainforge",
    term: "ChainForge",
    aliases: ["chain forge", "prompt testing workbench"],
    definition: `A research/engineering workbench (Harvard, 2023) for systematically testing prompts across models and parameters. Provides GUI-driven A/B testing, prompt transformations, and side-by-side outputs to study sensitivity and robustness.`,
    sources: [
      { title: "Liu et al., CHI 2023: ChainForge Paper", url: "https://arxiv.org/abs/2212.08794" }
    ],
    categories: ["tools", "evaluation", "prompt engineering"],
    tags: [
      "kind:framework",
      "type:software",
      "topic:evaluation",
      "topic:prompting",
      "phase:evaluation",
      "use:prompt-benchmarking",
      "level:intermediate"
    ],
    related: ["guidance-library", "promptperfect", "mixture-of-formats-mof", "prompt-brittleness"],
    status: "verified",
    notes: `Use-cases: • Compare prompt variants at scale • Sensitivity testing to wording/format • Cross-model behavior studies
Boosters: • Control datasets and seeds • Track metrics (accuracy, style, refusals) • Use templating to generate systematic variants
Caveats: Bench overfitting is common; rotate data and include out-of-distribution samples.`
  },
  {
    slug: "promptperfect",
    term: "PromptPerfect",
    aliases: ["prompt perfect", "prompt optimization service"],
    definition: `Commercial service (2023) that rewrites prompts to increase clarity, specificity, and model-compatibility. Automates common heuristics (adding constraints, examples, steps) and can localize to target models and languages.`,
    sources: [
      { title: "PromptPerfect website and documentation", url: "https://promptperfect.jina.ai/" }
    ],
    categories: ["tools", "automation", "prompt engineering"],
    tags: [
      "kind:framework",
      "type:service",
      "topic:optimization",
      "topic:prompting",
      "phase:design",
      "use:auto-prompt-rewrite",
      "level:beginner"
    ],
    related: ["automatic-prompt-engineer-ape", "greedy-prompt-engineering-strategy-greedy-pes", "chainforge"],
    status: "verified",
    notes: `Use-cases: • Rapidly improving rough prompts • Non-experts seeking better outputs • Multilingual prompt adaptation
Boosters: • Provide task specs and target model • Review diffs and keep a style guide • Validate gains on holdout tasks
Caveats: Automated rewrites can overfit vendor quirks; human review improves reliability.`
  },
  {
    slug: "voyager-agent",
    term: "Voyager (Autonomous Agent)",
    aliases: ["minecraft voyager", "open-ended voyager"],
    definition: `GPT-4-powered agent (2023) that learned in Minecraft via iterative skill discovery, code generation, and environment feedback. Maintained a skill library and reused learned behaviors—an early example of open-ended, tool-using LLM agents with self-memory.`,
    sources: [
      { title: "Voyager: An Open-Ended Embodied Agent (ArXiv 2023)", url: "https://arxiv.org/abs/2305.16291" }
    ],
    categories: ["architectures", "agents", "research"],
    tags: [
      "kind:framework",
      "type:research",
      "topic:agents",
      "topic:learning",
      "phase:orchestration",
      "use:open-ended-skill-learning",
      "level:advanced"
    ],
    related: ["auto-gpt", "react", "plan-and-execute-agent", "tool-augmentation"],
    status: "verified",
    notes: `Use-cases: • Long-horizon task exploration • Skill library construction • Environment-in-the-loop learning demos
Boosters: • Store reusable skills with metadata • Gate risky actions via simulators/tests • Periodically distill skills into cleaner abstractions
Caveats: Exploration can be costly/unsafe without sandboxes; require monitoring and rollback.`
  },
  {
    slug: "promptomatix",
    term: "Promptomatix",
    aliases: ["automated prompt optimizer", "prompt generation framework"],
    definition: `Proposed framework (2024) that couples evaluation harnesses with automated prompt search (LLM rewriters, genetic edits, scoring loops). Aims to iteratively improve prompts toward multi-metric objectives with optional human oversight.`,
    sources: [
      { title: "Li et al., Promptomatix framework (ArXiv 2024)", url: "https://arxiv.org/abs/2306.07311" }
    ],
    categories: ["tools", "automation", "evaluation"],
    tags: [
      "kind:framework",
      "type:research",
      "topic:optimization",
      "topic:prompting",
      "phase:evaluation",
      "use:auto-prompt-search",
      "level:advanced"
    ],
    related: ["greedy-prompt-engineering-strategy-greedy-pes", "automatic-prompt-engineer-ape", "promptperfect"],
    status: "verified",
    notes: `Use-cases: • Multi-objective prompt tuning (accuracy/safety/style) • Large catalog optimization across intents • Rapid exploration of prompt spaces
Boosters: • Define clear metrics/weights • Maintain train/validation/test splits • Keep human review loops for sanity checks
Caveats: Search can overfit to benchmarks; rotate datasets and test generalization.`
  },
  {
    slug: "conversation-routines-cr",
    term: "Conversation Routines (CR)",
    aliases: ["dialog routines", "routine-based prompting", "task-oriented dialog scaffolds"],
    definition: `Framework for task-oriented dialogue that decomposes flows (greeting, info collection, verification, confirmation, closing) into reusable prompt templates. Encourages modularity, reliability, and analytics across conversation stages instead of one mega-prompt.`,
    sources: [
      { title: "Prompt Engineering for Dialog Systems (ArXiv 2024)", url: "https://arxiv.org/abs/2308.10826" }
    ],
    categories: ["prompting strategies", "frameworks", "conversational design"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:dialog",
      "topic:prompting",
      "phase:orchestration",
      "use:modular-task-dialog",
      "level:intermediate"
    ],
    related: ["role-playing-prompting", "system-prompt", "prompt-templates", "plan-and-execute-agent"],
    status: "verified",
    notes: `Use-cases: • Customer support and booking flows • Intake forms and eligibility checks • Sales discovery calls with compliance
Boosters: • Define slots, validations, and fallbacks per routine • Add success criteria and escalation rules • Log routine outcomes for continuous improvement
Caveats: Over-templating can feel robotic; allow free-form clarifications and summaries between routines.`
  }
);

GLOSSARY.push(
  // --- Community‑driven prompt engineering techniques ---
  {
    slug: "recursive-self-improvement-prompting-rsip",
    term: "Recursive Self‑Improvement Prompting (RSIP)",
    aliases: ["rsip", "recursive self improvement prompting"],
    definition: `A meta‑prompting technique in which the model iteratively generates an answer, critiques its own output for specific weaknesses and then produces an improved version.  The process repeats multiple times with each loop focusing on different aspects for improvement, culminating in a final, refined result【744132232082781†L52-L72】【744132232082781†L81-L84】.  This self‑critique loop is especially effective for creative writing, documentation and argument development because it leverages the model’s ability to identify and address its own shortcomings.`,
    sources: [
      { title: "Reddit post: Advanced Prompt Engineering Techniques for 2025", url: "https://www.reddit.com/r/PromptEngineering/comments/1k7jrt7/advanced_prompt_engineering_techniques_for_2025/" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique", "topic:iterative-refinement", "topic:self-improvement", "phase:prompting"],
    related: ["context-aware-decomposition-cad", "self-refine-prompting", "iterative-refinement"],
    status: "draft",
    notes: "Emerging from community practice; emphasises iterative self‑critique to improve output quality."
  },
  {
    slug: "context-aware-decomposition-cad",
    term: "Context‑Aware Decomposition (CAD)",
    aliases: ["cad", "context aware decomposition"],
    definition: `A strategy for tackling complex, multi‑part tasks.  The prompt instructs the model to identify core components of the problem, explain why each component matters, determine what information or approach is needed for it, solve each part in isolation, then synthesize these partial solutions into a holistic answer—all while maintaining a “thinking journal” that records reasoning【744132232082781†L88-L115】.  By preserving the overall context during decomposition, CAD mitigates tunnel vision and produces more comprehensive solutions.`,
    sources: [
      { title: "Reddit post: Advanced Prompt Engineering Techniques for 2025", url: "https://www.reddit.com/r/PromptEngineering/comments/1k7jrt7/advanced_prompt_engineering_techniques_for_2025/" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique", "topic:decomposition", "topic:reasoning", "phase:prompting"],
    related: ["recursive-self-improvement-prompting-rsip", "plan-and-solve-p-s", "least-to-most-ltm"],
    status: "draft",
    notes: "Encourages breaking problems into parts without losing sight of the overall objective."
  },
  {
    slug: "controlled-hallucination-for-ideation-chi",
    term: "Controlled Hallucination for Ideation (CHI)",
    aliases: ["chi", "controlled hallucination prompting"],
    definition: `A creative ideation pattern that deliberately harnesses a model’s tendency to hallucinate.  Users ask the model to generate several speculative innovations or approaches that might not exist yet, provide detailed descriptions and theoretical principles, identify what would be required to implement them, clearly label them as speculative, and then critically analyse which ideas might be feasible【744132232082781†L127-L161】.  By explicitly embracing speculative outputs while separating them from factual content, CHI can inspire novel directions in product design, research and brainstorming sessions.`,
    sources: [
      { title: "Reddit post: Advanced Prompt Engineering Techniques for 2025", url: "https://www.reddit.com/r/PromptEngineering/comments/1k7jrt7/advanced_prompt_engineering_techniques_for_2025/" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique", "topic:creativity", "topic:ideation", "phase:prompting"],
    related: ["controlled-hallucination", "brainstorming", "multi-perspective-simulation-mps"],
    status: "draft",
    notes: "Useful for generating speculative ideas while maintaining clarity about their uncertain status."
  },
  {
    slug: "multi-perspective-simulation-mps",
    term: "Multi‑Perspective Simulation (MPS)",
    aliases: ["mps", "multi perspective simulation"],
    definition: `A prompting technique that instructs the model to analyse an issue by generating multiple sophisticated perspectives, articulating each perspective’s assumptions, arguments and potential blind spots, simulating a constructive dialogue between them, and concluding with an integrated analysis【744132232082781†L166-L199】.  MPS produces nuanced, balanced answers and is particularly valuable for policy analysis, ethical discussions and complex decision making where different viewpoints coexist.`,
    sources: [
      { title: "Reddit post: Advanced Prompt Engineering Techniques for 2025", url: "https://www.reddit.com/r/PromptEngineering/comments/1k7jrt7/advanced_prompt_engineering_techniques_for_2025/" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique", "topic:analysis", "topic:reasoning", "phase:prompting"],
    related: ["chain-of-thought-cot", "graph-of-thought-got", "algorithm-of-thought-aot"],
    status: "draft",
    notes: "Encourages critical thinking by simulating dialogue among diverse viewpoints."
  },
  {
    slug: "calibrated-confidence-prompting-ccp",
    term: "Calibrated Confidence Prompting (CCP)",
    aliases: ["ccp", "confidence-calibrated prompting"],
    definition: `A technique that asks the model to assign an explicit confidence level to each claim (e.g., virtually certain >95%, highly confident 80–95%, moderately confident 60–80%, speculative 40–60%, unknown) and to justify high‑confidence statements while noting what additional information would increase confidence for lower‑confidence ones【744132232082781†L201-L236】.  This approach helps users weigh AI‑generated information appropriately and reduces over‑confident misstatements, making it valuable for research, due diligence and technical problem solving.`,
    sources: [
      { title: "Reddit post: Advanced Prompt Engineering Techniques for 2025", url: "https://www.reddit.com/r/PromptEngineering/comments/1k7jrt7/advanced_prompt_engineering_techniques_for_2025/" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique", "topic:confidence-calibration", "topic:reasoning", "phase:prompting"],
    related: ["recursive-self-improvement-prompting-rsip", "chain-of-natural-language-inference-nli", "chain-of-verification"],
    status: "draft",
    notes: "Encourages transparency about uncertainty in generated answers."
  },
  // --- Emerging reasoning frameworks and thought structures ---
  {
    slug: "graph-of-thought-got",
    term: "Graph of Thoughts (GoT)",
    aliases: ["got", "graph-of-thought"],
    definition: `A reasoning model that represents knowledge and intermediate reasoning steps as a network of interconnected nodes rather than a linear chain or simple tree.  This structure mirrors neural connections in the brain and is well suited for collaborative tasks, brainstorming and capturing multidirectional reasoning【48464194070942†L105-L111】.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:structure", "topic:reasoning", "phase:prompting"],
    related: ["tree-of-thought-tot", "algorithm-of-thought-aot", "skeleton-of-thought-sot"],
    status: "draft",
    notes: "Extends chain‑ and tree‑based reasoning into a more flexible graph structure."
  },
  {
    slug: "algorithm-of-thought-aot",
    term: "Algorithm of Thoughts (AoT)",
    aliases: ["aot", "algorithm-of-thought"],
    definition: `A framework that directs the model to break complex problems down using explicit algorithms during inference.  AoT treats reasoning as executing an algorithmic procedure, offering a structured path to solutions at the cost of higher computational effort【48464194070942†L121-L127】.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:structure", "topic:reasoning", "topic:algorithm", "phase:prompting"],
    related: ["chain-of-thought-cot", "tree-of-thought-tot", "graph-of-thought-got"],
    status: "draft",
    notes: "Useful for tasks requiring formal logic or procedural reasoning."
  },
  {
    slug: "skeleton-of-thought-sot",
    term: "Skeleton of Thoughts (SoT)",
    aliases: ["sot", "skeleton-of-thought"],
    definition: `A two‑stage prompting structure where the model first generates an outline (the “skeleton”) of the solution and then fills in details in parallel【48464194070942†L129-L135】.  This parallel development boosts efficiency and supports multi‑answer or multitask settings by allowing multiple threads of thought to unfold simultaneously.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:structure", "topic:reasoning", "topic:parallelism", "phase:prompting"],
    related: ["algorithm-of-thought-aot", "graph-of-thought-got", "rephrase-and-respond-rar"],
    status: "draft",
    notes: "Encourages outline‑first reasoning followed by parallel detail expansion."
  },
  {
    slug: "rephrase-and-respond-rar",
    term: "Rephrase and Respond (RaR)",
    aliases: ["rar", "rephrase and respond"],
    definition: `A simple yet effective prompting pattern where the model first rephrases an ambiguous or poorly structured question before answering it.  The rephrasing can occur in one or two steps and increases clarity; when combined with chain‑of‑thought reasoning it enhances both precision and depth in the final answer【48464194070942†L137-L143】.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique", "topic:clarification", "topic:reasoning", "phase:prompting"],
    related: ["chain-of-thought-cot", "self-refine-prompting", "recursive-self-improvement-prompting-rsip"],
    status: "draft",
    notes: "Helps models handle ambiguous questions by restating them before answering."
  },
  {
    slug: "self-refine-prompting",
    term: "Self‑Refine Prompting",
    aliases: ["self refine", "self-refine"],
    definition: `A prompting pattern where the model evaluates its own output and refines it iteratively without external feedback.  This reduces hallucinations and errors and is valuable for autonomous systems and self‑improving agents【48464194070942†L145-L159】.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique", "topic:iterative-refinement", "topic:reasoning", "phase:prompting"],
    related: ["recursive-self-improvement-prompting-rsip", "rephrase-and-respond-rar"],
    status: "draft",
    notes: "Encourages models to self‑critique and improve outputs without human intervention."
  },
  {
    slug: "chain-of-natural-language-inference-nli",
    term: "Chain of Natural Language Inference (NLI)",
    aliases: ["nli", "chain of nli", "chain-of-nli"],
    definition: `A hierarchical framework that detects hallucinations in model outputs and then uses natural‑language inference to correct them【48464194070942†L160-L166】.  It is particularly important in high‑integrity applications such as law or medicine where accuracy and verifiable reasoning are critical.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:structure", "topic:safety", "topic:reasoning", "phase:prompting"],
    related: ["chain-of-verification", "calibrated-confidence-prompting-ccp", "chain-of-explanation"],
    status: "draft",
    notes: "Adds an explicit hallucination‑detection and correction step to reasoning chains."
  },
  {
    slug: "chain-of-verification",
    term: "Chain of Verification",
    aliases: ["verification chain", "self-check prompting", "chain-of-check"],
    definition: `A self‑check mechanism where the model generates validation questions about its own answer and uses these to refine and verify its response【48464194070942†L168-L174】.  This promotes critical thinking and improves reliability by prompting the model to interrogate its own reasoning.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique", "topic:verification", "topic:reasoning", "phase:prompting"],
    related: ["chain-of-natural-language-inference-nli", "recursive-self-improvement-prompting-rsip", "calibrated-confidence-prompting-ccp"],
    status: "draft",
    notes: "Encourages the model to ask and answer its own validation questions."
  },
  {
    slug: "chain-of-density-cod",
    term: "Chain of Density (CoD)",
    aliases: ["cod", "chain of density", "chain-of-density"],
    definition: `A summarization framework that iteratively condenses a broad summary while adding key information.  The process starts with a broad statement, repeatedly rewrites it with selected key points, incorporates missing details and reduces length at each iteration to produce a concise, information‑rich summary【77292443032943†L178-L193】【77292443032943†L200-L206】.  CoD yields layered summaries with high information density and minimal loss of meaning【48464194070942†L178-L182】.`,
    sources: [
      { title: "Analytics Vidhya: Chain of Density in Prompt Engineering", url: "https://www.analyticsvidhya.com/blog/2024/07/chain-of-density-in-prompt-engineering/" },
      { title: "Medium: Thought Structures in Prompt Engineering", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique", "topic:summarization", "topic:reasoning", "phase:prompting"],
    related: ["chain-of-dictionary", "chain-of-explanation", "chain-of-knowledge"],
    status: "draft",
    notes: "Provides iterative summarization that increases information density while shortening text."
  },
  {
    slug: "chain-of-dictionary",
    term: "Chain of Dictionary",
    aliases: ["codict", "chain of dictionary"],
    definition: `A prompt structure that translates text step by step by referencing multilingual dictionaries; it links word equivalents across languages to support translation in low‑resource scenarios【48464194070942†L184-L190】.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique", "topic:translation", "topic:reasoning", "phase:prompting"],
    related: ["chain-of-symbol", "chain-of-knowledge", "chain-of-density-cod"],
    status: "draft",
    notes: "Helps models translate languages by linking word equivalents across dictionaries."
  },
  {
    slug: "chain-of-symbol",
    term: "Chain of Symbol",
    aliases: ["cos", "chain of symbol"],
    definition: `A reasoning technique that replaces lengthy natural language descriptions with symbolic representations to simplify reasoning and planning【48464194070942†L192-L197】.  This symbolic abstraction reduces cognitive load and is useful for tasks such as planning, coding and logic‑based problem solving.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique", "topic:reasoning", "topic:symbolic", "phase:prompting"],
    related: ["chain-of-dictionary", "chain-of-density-cod", "algorithm-of-thought-aot"],
    status: "draft",
    notes: "Helps break down complex instructions into symbolic steps for easier processing."
  },
  {
    slug: "chain-of-explanation",
    term: "Chain of Explanation",
    aliases: ["coe", "chain of explanation"],
    definition: `A safety‑oriented prompt structure that identifies trigger words and targets in harmful or manipulative text and explains their significance【48464194070942†L199-L205】.  It helps moderators and safety systems detect malicious content and understand harmful intent in online conversations.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures", "security & safety"],
    tags: ["type:technique", "topic:safety", "topic:moderation", "phase:prompting"],
    related: ["chain-of-verification", "chain-of-natural-language-inference-nli", "calibrated-confidence-prompting-ccp"],
    status: "draft",
    notes: "Useful in content moderation and AI safety contexts."
  },
  {
    slug: "chain-of-knowledge",
    term: "Chain of Knowledge",
    aliases: ["cok", "chain of knowledge"],
    definition: `A prompt structure that gathers preliminary answers from multiple knowledge sources, assesses and ranks these knowledge blocks for relevance and quality, and then compiles an integrated answer【48464194070942†L207-L213】.  This method improves accuracy and completeness when retrieving information from diverse sources.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique", "topic:retrieval", "topic:reasoning", "phase:prompting"],
    related: ["chain-of-density-cod", "context-aware-decomposition-cad", "graph-of-thought-got"],
    status: "draft",
    notes: "Helps aggregate and prioritize information from multiple sources."
  },
  {
    slug: "chain-of-emotion",
    term: "Chain of Emotion",
    aliases: ["coe", "chain of emotion"],
    definition: `A prompt technique that analyses language to detect and simulate emotions in the response【48464194070942†L215-L220】.  It supports empathetic AI applications such as virtual therapy assistants and social chatbots by enabling the model to respond with appropriate emotional understanding.`,
    sources: [
      { title: "Medium: Thought Structures in Prompt Engineering (Apr 7 2025)", url: "https://medium.com/gen-ai-adventures/thought-structures-in-prompt-engineering-making-llms-think-better-3b057b298ae3" }
    ],
    categories: ["reasoning models or structures", "emotional thinking frameworks"],
    tags: ["type:technique", "topic:emotion", "topic:empathy", "phase:prompting"],
    related: ["chain-of-explanation", "chain-of-knowledge", "graph-of-thought-got"],
    status: "draft",
    notes: "Facilitates emotionally intelligent interactions by focusing on emotional cues."
  },
  
  
  {
    slug: "two-minute-rule",
    term: "2-Minute Rule",
    aliases: [
      "2-Minute Rule (David Allen)",
      "2-Minute Rule",
      "MR",
      "2-minute rule",
      "two minute rule",
      "do it now rule"
    ],
    definition: `A friction-cutting technique: if a task will take ~2 minutes or less, do it immediately to avoid tracking overhead. If it’s longer, define a tiny “2-minute starter” (the smallest physical first step) and schedule it. This keeps momentum high, shrinks procrastination, and prevents small tasks from clogging your system.`,
    sources: [],
    categories: ["productivity", "behavior", "time-management"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:productivity",
      "topic:friction-reduction",
      "phase:apply",
      "use:quick-win",
      "level:beginner"
    ],
    related: ["eisenhower-priority-matrix", "constraint-flip", "comparative-analysis", "facts-expertise-primer"],
    status: "verified",
    notes: `Use-cases: • Inbox triage (reply, archive, forward) • Micro-chores (file, rename, move) • Calendar hygiene (accept/decline, add location) • Creating “starter” actions for bigger work (open doc, outline 3 bullets)
Boosters: • Timebox strictly; if it won’t fit, write a 2-minute starter and schedule • Batch similar 2-minute items between larger blocks • Keep a visible “2-minute lane” list for spare moments
Caveats: Constant context switching can hurt deep work—protect focus blocks and run 2-minute bursts at boundaries.`
  },
  {
    slug: "abcde-cbt-framework",
    term: "ABCDE",
    aliases: [
      "ABCDE — Activating event · Belief · Consequence · Dispute · Effect",
      "ABCDE",
      "abcde",
      "ABCDE model",
      "CBT ABCDE"
    ],
    definition: `A cognitive restructuring framework from CBT: identify the Activating event, surface the Belief about it, note the Consequence (feelings/behavior), Dispute the belief with evidence and alternatives, and choose a new, constructive Effect. It externalizes negative self-talk and replaces it with grounded interpretations.`,
    sources: [],
    categories: ["psychology", "self-reflection", "mental-models"],
    tags: [
      "kind:framework",
      "type:method",
      "topic:cbt",
      "topic:reframing",
      "phase:analyze",
      "use:thought-challenge",
      "level:intermediate"
    ],
    related: ["cognitive-debiasing", "facione-core-skills", "calibrated-confidence-prompting-ccp", "chain-of-explanation"],
    status: "verified",
    notes: `Use-cases: • Reframing harsh self-judgments • Preparing for difficult conversations • Managing anxiety about ambiguous events • Journaling for perspective-taking
Boosters: • Write beliefs verbatim, then rate belief strength (0–100%) • Gather for/against evidence from credible sources • Draft a replacement belief that is specific, testable, and compassionate
Caveats: Not a substitute for clinical care; escalate to professionals for acute distress or risk.`
  },
  {
    slug: "addie-instructional-design",
    term: "ADDIE",
    aliases: [
      "ADDIE — Analyze · Design · Develop · Implement · Evaluate",
      "ADDIE",
      "addie",
      "ADDIE model",
      "ADDIE framework"
    ],
    definition: `A staple instructional design framework that moves from Analyze (learners, goals, constraints) to Design (objectives, assessments, modalities), Develop (materials, assets), Implement (delivery), and Evaluate (formative + summative). It ensures training ties directly to measurable outcomes.`,
    sources: [],
    categories: ["education", "planning", "instructional-design"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:instructional-design",
      "topic:curriculum",
      "phase:plan",
      "use:course-development",
      "level:beginner"
    ],
    related: ["facts-expertise-primer", "few-shot-examples", "facione-core-skills", "comparative-analysis"],
    status: "verified",
    notes: `Use-cases: • Building courses and workshops • Converting SME knowledge into lessons • Designing onboarding/training paths • Continuous improvement of existing curricula
Boosters: • Write SMART objectives linked to assessments • Map each activity to an objective (“objective coverage matrix”) • Pilot with a small cohort; collect rubrics + feedback
Caveats: Beware waterfall rigidity—iterate between phases as you learn.`
  },
  {
    slug: "before-after-bridge-formula",
    term: "Before-After-Bridge (BAB)",
    aliases: [
      "Before-After-Bridge (BAB) — Before state · After state · Bridge (solution)",
      "Before-After-Bridge (BAB)",
      "BABBAB",
      "before-after-bridge (bab)",
      "BAB copy formula",
      "before/after/bridge"
    ],
    definition: `A persuasive structure: paint the unsatisfying “Before,” envision the desirable “After,” and present your offer as the “Bridge” that credibly connects them. It focuses attention on desired outcomes, not just features.`,
    sources: [],
    categories: ["messaging frameworks", "marketing", "persuasion"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:copywriting",
      "topic:positioning",
      "phase:compose",
      "use:value-proposition",
      "level:beginner"
    ],
    related: ["feature-advantage-benefit", "comparative-analysis", "facts-expertise-primer"],
    status: "verified",
    notes: `Use-cases: • Landing page hero sections • Sales emails and pitches • Internal change proposals
Boosters: • Make “Before” visceral with 1–2 sharp pains • Quantify “After” (time saved, risk reduced) • Ensure the Bridge names proof (demo, case study, mechanism)
Caveats: Avoid overpromising—bridge claims must be testable and specific.`
  },
  {
    slug: "bias-impact-assessment",
    term: "Bias Impact Assessment",
    aliases: [
      "Bias Impact Assessment (AI/tech)",
      "Bias Impact Assessment",
      "BIA",
      "bias impact assessment",
      "algorithmic impact assessment (bias focus)"
    ],
    definition: `A pre-launch governance framework that maps stakeholders, surfaces bias risks, documents mitigations, and sets a monitoring plan. Similar to impact assessments, it creates traceability for fairness choices and trade-offs.`,
    sources: [],
    categories: ["ai", "ethics", "risk", "governance"],
    tags: [
      "kind:framework",
      "type:method",
      "topic:bias",
      "topic:transparency",
      "phase:plan",
      "use:pre-launch-review",
      "level:advanced"
    ],
    related: ["bias-interrupters", "facione-core-skills", "chain-of-explanation", "facts-expertise-primer"],
    status: "verified",
    notes: `Use-cases: • Reviewing ML/LLM features before release • Procurement/vendor due-diligence • Regulatory documentation and audits
Boosters: • Add model/data cards; list sensitive attributes and proxies • Define fairness metrics and alert thresholds • Create a rollback/appeal path for harmed users
Caveats: Paperwork without enforcement is theater—assign owners and dates.`
  },
  {
    slug: "bias-interrupters",
    term: "Bias Interrupters",
    aliases: [
      "Bias Interrupters (process checks)",
      "Bias Interrupters",
      "BI",
      "bias interrupters",
      "process-level bias checks"
    ],
    definition: `Operational tweaks that detect and interrupt bias in hiring, evaluation, promotion, and everyday processes. They’re small, testable changes (structured rubrics, blind reviews, diverse panels) measured with clear metrics over time.`,
    sources: [],
    categories: ["people", "ethics", "operations", "hr"],
    tags: [
      "kind:pattern",
      "type:method",
      "topic:fairness",
      "topic:rubrics",
      "phase:apply",
      "use:hiring-evaluation-promotion",
      "level:intermediate"
    ],
    related: ["bias-impact-assessment", "comparative-analysis", "facione-core-skills"],
    status: "verified",
    notes: `Use-cases: • Resume and portfolio screening • Performance calibration meetings • Promotions and compensation reviews
Boosters: • Name a metric owner and review cadence • Use structured criteria before seeing candidates • Capture exceptions and require written rationale
Caveats: Metrics can be gamed; triangulate with qualitative audits.`
  },
  {
    slug: "cognitive-debiasing",
    term: "Cognitive Debiasing",
    aliases: [
      "Cognitive Debiasing",
      "CD",
      "cognitive debiasing",
      "consider-the-opposite",
      "premortem check"
    ],
    definition: `A light-weight reasoning scaffold combining “consider the opposite,” a hunt for disconfirming evidence, and a brief pre-mortem. It forces perspective shifts and reduces confidence illusions before decisions.`,
    sources: [],
    categories: ["ethics", "bias", "critical thinking", "decision-making"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:debiasing",
      "topic:metacognition",
      "phase:review",
      "use:analysis",
      "level:beginner"
    ],
    related: ["facione-core-skills", "abcde-cbt-framework", "calibrated-confidence-prompting-ccp", "comparative-analysis"],
    status: "verified",
    notes: `Use-cases: • Pre-read critiques for strategy docs • Feature launch go/no-go reviews • Personal assumptions in research/analysis
Boosters: • Write your initial hypothesis, then draft its plausible opposite • List ≥2 credible disconfirming sources • One-line pre-mortem: “If this fails in 6 weeks, it’s because…”
Caveats: Don’t straw-man the “opposite”; make it as strong as your own case.`
  },
  {
    slug: "comparative-analysis",
    term: "Comparative Analysis",
    aliases: [
      "Comparative Analysis — rank • pros/cons • matrix",
      "Comparative Analysis",
      "CA",
      "comparative analysis",
      "weighted decision matrix"
    ],
    definition: `A decision framework for comparing options using a chosen style: ranked list, pros/cons, side-by-side table, or weighted matrix. It makes trade-offs explicit and produces a defendable recommendation.`,
    sources: [],
    categories: ["analysis frameworks", "decision support", "product strategy"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:evaluation",
      "topic:comparison",
      "phase:analyze",
      "use:choose-between-options",
      "level:intermediate"
    ],
    related: ["feature-advantage-benefit", "before-after-bridge-formula", "eisenhower-priority-matrix", "bias-interrupters"],
    status: "verified",
    notes: `Use-cases: • Vendor or tool selection • Feature prioritization • Go-to-market channel choice • Policy alternatives
Boosters: • Define criteria up front; add weights only if stakeholders agree • Show the math simply; avoid hidden scoring • End with a clear pick, risks, and next steps
Caveats: Weights can encode bias—share assumptions and test sensitivity.`
  },
  {
    slug: "constraint-flip",
    term: "Constraint Flip",
    aliases: [
      "Constraint Flip (play with edges)",
      "Constraint Flip",
      "CF",
      "constraint flip",
      "constraint inversion"
    ],
    definition: `An ideation technique that treats constraints as creative levers: exaggerate a constraint to spark novel approaches, then remove it entirely to find alternative solutions. Flipping boundaries reveals hidden possibilities.`,
    sources: [],
    categories: ["creativity", "strategy", "innovation"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:constraints",
      "topic:ideation",
      "phase:explore",
      "use:idea-generation",
      "level:beginner"
    ],
    related: ["two-minute-rule", "comparative-analysis", "feynman-technique"],
    status: "verified",
    notes: `Use-cases: • Designing MVPs under extreme limits • Cost/latency/UX trade-off exploration • Breaking stale patterns in product or process
Boosters: • Write ≥3 ideas for “exaggerate” and ≥3 for “remove” • Pick one to prototype in 1 week • Capture assumptions you broke and what stayed resilient
Caveats: Wild ideas still need feasibility checks—bring them back to constraints.`
  },
  {
    slug: "eisenhower-priority-matrix",
    term: "Eisenhower Matrix",
    aliases: [
      "Eisenhower Matrix — Urgent/Important Prioritization",
      "Eisenhower Matrix",
      "EM",
      "eisenhower matrix",
      "urgent/important matrix"
    ],
    definition: `A prioritization framework sorting tasks into four quadrants: Do (urgent+important), Schedule (important, not urgent), Delegate (urgent, not important), and Eliminate (neither). It clarifies where to invest attention right now.`,
    sources: [],
    categories: ["productivity", "prioritization", "time-management"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:prioritization",
      "topic:time-management",
      "phase:plan",
      "use:task-prioritization",
      "level:beginner"
    ],
    related: ["two-minute-rule", "comparative-analysis", "constraint-flip"],
    status: "verified",
    notes: `Use-cases: • Weekly planning and daily triage • Team standup backlogs • Personal task reset after overwhelm
Boosters: • Limit “Do” to 1–3 items • Move quadrant decisions to calendar or owner immediately • Revisit weekly to prevent urgency creep
Caveats: “Urgent” often masquerades as important—challenge the label.`
  },
  {
    slug: "few-shot-examples",
    term: "Examples / Few-Shot Prompting",
    aliases: [
      "Examples / Few-Shot Prompting",
      "EFSP",
      "examples / few-shot prompting",
      "few-shot prompting",
      "shot-based prompting"
    ],
    definition: `A prompting technique that supplies one or more concise examples (“shots”) to anchor the model’s format, tone, and boundaries. Good shots act like templates the model imitates, improving consistency with minimal rules.`,
    sources: [],
    categories: ["prompt development techniques", "prompt literacy", "llm"],
    tags: [
      "kind:technique",
      "type:prompting",
      "topic:examples",
      "topic:few-shot",
      "phase:setup",
      "use:output-shaping",
      "level:beginner"
    ],
    related: ["facts-expertise-primer", "feynman-technique", "feature-advantage-benefit", "before-after-bridge-formula"],
    status: "verified",
    notes: `Use-cases: • Enforcing output schemas • Style transfer (tone/voice) • Teaching do/don’t boundaries • Rapid prototyping of formats
Boosters: • Keep examples short and high-signal • Number shots and reference them in instructions • Vary content, not structure, to avoid overfitting
Caveats: Too many shots can crowd context—favor 1–3 great ones.`
  },
  {
    slug: "feature-advantage-benefit",
    term: "FAB",
    aliases: [
      "FAB — Feature · Advantage · Benefit",
      "FAB",
      "fab",
      "feature advantage benefit"
    ],
    definition: `A classic messaging framework: state the Feature, explain the Advantage (how it works/why it’s better), and translate it into the user-centric Benefit (why it matters). Shifts from specs to outcomes.`,
    sources: [],
    categories: ["messaging frameworks", "marketing", "sales"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:copywriting",
      "topic:positioning",
      "phase:apply",
      "use:value-messaging",
      "level:beginner"
    ],
    related: ["before-after-bridge-formula", "comparative-analysis"],
    status: "verified",
    notes: `Use-cases: • Product pages and datasheets • Sales decks and one-pagers • Release notes that highlight user value
Boosters: • Write the benefit in the customer’s language • Tie benefits to a measurable KPI • Avoid stacking too many advantages per feature
Caveats: Don’t stop at features—ensure at least one clear, testable benefit.`
  },
  {
    slug: "facione-core-skills",
    term: "Facione",
    aliases: [
      "Facione — Interpret · Analyze · Evaluate · Infer · Explain · Self-regulate",
      "Facione",
      "facione",
      "Facione six skills"
    ],
    definition: `A critical-thinking framework operationalizing six skills: Interpret, Analyze, Evaluate, Infer, Explain, and Self-regulate. It provides a common language and checklist for reasoning quality.`,
    sources: [],
    categories: ["critical thinking frameworks", "analysis", "education"],
    tags: [
      "kind:framework",
      "type:framework",
      "topic:critical-thinking",
      "topic:evaluation",
      "phase:analyze",
      "use:reasoning-audit",
      "level:intermediate"
    ],
    related: ["cognitive-debiasing", "abcde-cbt-framework", "comparative-analysis"],
    status: "verified",
    notes: `Use-cases: • Research synthesis and literature reviews • Design/ethics reviews • Postmortems and RCAs
Boosters: • For each skill, ask one concrete question (e.g., “What’s the unstated assumption?”) • End with a two-line “Because → Therefore” justification and one next test
Caveats: Checklists can lull you—seek disconfirming evidence actively.`
  },
  {
    slug: "facts-expertise-primer",
    term: "Facts & Expertise Primer",
    aliases: [
      "Facts & Expertise Primer",
      "FEP",
      "facts & expertise primer",
      "role-and-facts priming"
    ],
    definition: `A prompt-quality framework: set the role/scope, list verified facts and known pitfalls, and only then ask for the output. Priming with constraints and truths reduces drift and hallucinations.`,
    sources: [],
    categories: ["prompt development techniques", "quality scaffolds", "reliability"],
    tags: [
      "kind:framework",
      "type:prompting",
      "topic:priming",
      "topic:fact-checking",
      "phase:setup",
      "use:reduce-hallucination",
      "level:beginner"
    ],
    related: ["few-shot-examples", "comparative-analysis", "chain-of-verification"],
    status: "verified",
    notes: `Use-cases: • High-stakes answers needing citations • Domain-specific assistants • Multi-author collaboration where context drifts
Boosters: • Separate facts from assumptions; mark unknowns • Ask up to 3 clarifying questions before answering • Specify citation/rigor expectations explicitly
Caveats: Stale facts mislead—date your facts and refresh when context changes.`
  },
  {
    slug: "feynman-technique",
    term: "Feynman Technique",
    aliases: [
      "Feynman Technique — Explain Like I’m 5",
      "Feynman Technique",
      "FT",
      "feynman technique",
      "ELI5 (Feynman)"
    ],
    definition: `A learning technique: explain the concept as if to a novice, spot gaps, study to fill them, and re-explain more clearly. Simplicity exposes missing understanding and builds durable mental models.`,
    sources: [],
    categories: ["education", "learning", "communication"],
    tags: [
      "kind:technique",
      "type:method",
      "topic:simplification",
      "topic:teaching",
      "phase:analyze",
      "use:knowledge-check",
      "level:beginner"
    ],
    related: ["facione-core-skills", "few-shot-examples", "rephrase-and-respond-rar"],
    status: "verified",
    notes: `Use-cases: • Self-study of new topics • Onboarding teammates • User-facing documentation drafts
Boosters: • Ban jargon; define any term in plain language • Use analogies then test their limits • End with 3 quiz questions to verify transfer
Caveats: Oversimplification can hide nuance—append a short “for experts” note when needed.`
  },
  {
    slug: "first-principles-analysis",
    term: "First Principles",
    aliases: [
      "First Principles — Question assumptions & reason from basics",
      "First Principles",
      "FP",
      "first principles"
  ],
    definition: `A problem-solving approach that strips a problem down to fundamental truths and builds solutions from the ground up, rather than relying on assumptions or analogies.`,
    sources: [],
    categories: [
      "reasoning",
      "innovation"
  ],
    tags: [
      "type:framework",
      "topic:problem-solving",
      "topic:assumptions",
      "level:intermediate",
      "use:strategy",
      "use:research",
      "use:inventive-thinking",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:problem or question",
      "field:assumptions (optional, one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: solve complex problems by breaking them down to fundamental truths • challenge default assumptions to find innovative solutions • analyze feasibility by building up from basic principles
  Boosters: Explicitly list core facts or principles that are undeniably true in this context. For each assumption, ask “Why must this be true?” and explore what happens if it’s not.`
  },
  {
    slug: "goal-breakdown-decomposition",
    term: "Goal Breakdown",
    aliases: [
      "Goal Breakdown (Prompt/Question Decomposition)",
      "Goal Breakdown",
      "GB",
      "goal breakdown"
  ],
    definition: `Break a complex goal/prompt into smaller, verifiable sub-tasks and sub-questions before doing the work.`,
    sources: [],
    categories: [
      "planning",
      "prompt development techniques"
  ],
    tags: [
      "type:pattern",
      "topic:decomposition",
      "topic:questions",
      "phase:plan",
      "level:beginner",
      "use:breakdown",
      "use:micro-tasks",
      "use:research-questions",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:goal / complex task",
      "field:do's (must do)",
      "field:don'ts / constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: break a complex goal into micro-tasks • turn a vague prompt into concrete sub-questions • plan-first before execution
  Boosters: Show a numbered hierarchy (1, 1.1, 1.1.1…) before any deliverable. Flag assumptions and unknowns as explicit sub-questions. Suggest the smallest next action at the end.`
  },
  {
    slug: "goal-composition",
    term: "Goal Composition",
    aliases: [
      "Goal Composition (Prompt/Question Composition)",
      "Goal Composition",
      "GC",
      "goal composition"
  ],
    definition: `Synthesize a broader objective from a list of sub-prompts/actions, then propose a coherent plan.`,
    sources: [],
    categories: [
      "planning",
      "prompt development techniques"
  ],
    tags: [
      "type:pattern",
      "topic:composition",
      "topic:goals",
      "phase:plan",
      "level:beginner",
      "use:synthesis",
      "use:roadmap",
      "use:prioritization",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:intended direction (optional)",
      "field:sub-prompts / actions (one per line)",
      "field:do's (must do)",
      "field:don'ts / constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: compose a broader goal from many sub-prompts/actions • derive an objective and plan from granular tasks • summarize scattered asks into one coherent brief
  Boosters: Cluster similar actions before composing. State explicit success criteria for the composed goal. End with one “north-star” metric.`
  },
  {
    slug: "goal-prompting",
    term: "Goal Prompting",
    aliases: [
      "Goal Prompting",
      "GP",
      "goal prompting"
  ],
    definition: `Center the request on a primary goal, with optional supporting goals listed separately.`,
    sources: [],
    categories: [
      "planning",
      "prompt development techniques"
  ],
    tags: [
      "type:pattern",
      "topic:goals",
      "phase:plan",
      "level:beginner",
      "use:brainstorm",
      "use:roadmap",
      "use:prioritize",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:primary goal (brief)",
      "field:additional goals (one per line)",
      "field:do's (must do)",
      "field:don'ts / constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: state a primary goal and supporting goals • ask the model to prioritize or plan • structure outputs around explicit objectives
  Boosters: Ask for a numbered plan tied to each goal. Request a brief risk or dependency note per goal. End with a next-action recommendation.`
  },
  {
    slug: "grow-coaching-model",
    term: "GROW",
    aliases: [
      "GROW — Goal · Reality · Options · Way Forward",
      "GROW",
      "grow"
  ],
    definition: `A coaching framework for goal-oriented conversations, progressing through defining a Goal, assessing the current Reality, brainstorming Options, and deciding the Way Forward (action plan).`,
    sources: [],
    categories: [
      "coaching",
      "planning"
  ],
    tags: [
      "type:framework",
      "topic:goal-setting",
      "topic:coaching",
      "level:beginner",
      "use:personal-development",
      "use:mentoring",
      "use:problem-solving",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:goal",
      "field:reality (current situation)",
      "field:options (optional, one per line)",
      "field:way forward (if decided, optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: structure a coaching conversation or self-reflection • set and plan personal or team goals with clear next steps • evaluate options to overcome a challenge and commit to an action
  Boosters: Offer at least 3 distinct Options, even unconventional ones, before recommending a way forward. Encourage a specific, time-bound commitment in the Way Forward step (who, what, when).`
  },
  {
    slug: "heros-journey-narrative",
    term: "Hero’s Journey",
    aliases: [
      "Hero’s Journey — Departure · Initiation · Return",
      "Hero’s Journey",
      "HJ",
      "hero’s journey"
  ],
    definition: `A 12-stage narrative framework (Monomyth) where a hero leaves their ordinary world, faces trials and transformation, and returns home with newfound wisdom or power.`,
    sources: [],
    categories: [
      "storytelling frameworks",
      "creative writing"
  ],
    tags: [
      "type:framework",
      "topic:storytelling",
      "phase:compose",
      "level:intermediate",
      "use:plot-outline",
      "use:mythic-narrative",
      "use:character-development",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:hero / protagonist",
      "field:quest / goal",
      "field:antagonist or main challenge (optional)",
      "field:setting (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: generate a mythic or epic story outline following a hero’s journey structure • develop a character’s transformative arc in creative writing • brainstorm plot points for novels, games, or scenarios with a hero protagonist
  Boosters: Ensure the hero undergoes a meaningful transformation by the end of the journey. Include classic stages like Call to Adventure, Mentor/Helper, Trials, Crisis, Reward, and Return with the Elixir.`
  },
  {
    slug: "heuristics-biases",
    term: "Heuristics & Biases",
    aliases: [
      "Heuristics & Biases — Debiasing Pre-flight",
      "Heuristics & Biases",
      "HB",
      "heuristics & biases"
  ],
    definition: `Run a short checklist to catch common cognitive biases and revise.`,
    sources: [],
    categories: [
      "critical thinking frameworks",
      "quality checks"
  ],
    tags: [
      "type:framework",
      "topic:debiasing",
      "phase:review",
      "level:intermediate",
      "use:decisions",
      "use:forecasts",
      "use:research-summaries",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:decision/draft to check",
      "field:stakes/impact",
      "field:time pressure",
      "field:known risks",
      "field:debiasing tactics"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: Review a draft answer/decision • Forecasting sanity check • Risk review
  Boosters: End with a one-line “If wrong, it’s because…” and a quick red-team question.`
  },
  {
    slug: "how-might-we-statements-hmw",
    term: "How Might We Statements",
    aliases: [
      "How Might We Statements (HMW)",
      "How Might We Statements",
      "HMWS",
      "how might we statements"
  ],
    definition: `A guiding question that reframes a need into an opportunity: “How might we [action] for [who] so that [outcome]?”`,
    sources: [],
    categories: [
      "design thinking",
      "ideation"
  ],
    tags: [
      "type:pattern",
      "topic:problem-framing",
      "topic:ideation",
      "phase:explore",
      "level:beginner",
      "use:brainstorm",
      "use:problem-statement",
      "use:workshop",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:need / challenge",
      "field:action to explore",
      "field:who is affected?",
      "field:positive outcome",
      "field:do's (must do)",
      "field:don'ts / constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: frame challenges as opportunities • product design • ux • problem solving • generate multiple solution directions • align teams around a crisp, positive prompt
  Boosters: Offer 3–5 phrasing variants that change the verb or scope. Keep each statement ≤20 words. Avoid embedded solutions—stay problem-oriented.`
  },
  {
    slug: "if-then-planning",
    term: "Implementation Intentions",
    aliases: [
      "Implementation Intentions (If–Then)",
      "Implementation Intentions",
      "II",
      "implementation intentions"
  ],
    definition: `If [trigger/situation], then I will [specific action].`,
    sources: [],
    categories: [
      "behavior",
      "productivity"
  ],
    tags: [
      "type:pattern",
      "topic:if-then",
      "use:habit",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:if [trigger/situation]…",
      "field:…then i will [specific action]",
      "field:backup plans (optional, one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: bind a trigger to a specific action to reduce choice friction • translate goals into cues
  Boosters: Make the trigger observable and frequent. Write the action so “half-asleep you” could do it.`
  },
  {
    slug: "inclusive-design-framework",
    term: "Inclusive Design",
    aliases: [
      "Inclusive Design (edge personas)",
      "Inclusive Design",
      "ID",
      "inclusive design"
  ],
    definition: `Design for “edge cases” to reduce exclusion, following Microsoft’s Inclusive Design principles.`,
    sources: [],
    categories: [
      "design",
      "ethics",
      "accessibility"
  ],
    tags: [
      "type:pattern",
      "topic:inclusive-design",
      "topic:edge-cases",
      "level:beginner",
      "use:product",
      "use:content",
      "use:service-design",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:persona at the edge — who might struggle most?",
      "field:barrier — what prevents full use?",
      "field:adaptation — design change to reduce exclusion",
      "field:benefit to all — how does this help beyond the edge user?"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: identify edge personas and barriers • design adaptations that reduce exclusion • articulate benefits to all users
  Boosters: Name concrete assistive tech or environmental constraints where relevant. Suggest a quick hallway/usability test to validate the adaptation.`
  },
  {
    slug: "keywords-why-tasks-vector",
    term: "Keywords + Why + Tasks",
    aliases: [
      "Keywords + Why + Tasks — Vector Priming",
      "Keywords + Why + Tasks",
      "KWT",
      "keywords + why + tasks"
  ],
    definition: `Prime with keywords (vector hinting) and a clear “why,” list tasks, and name what to avoid.`,
    sources: [],
    categories: [
      "prompt development techniques",
      "planning"
  ],
    tags: [
      "type:pattern",
      "topic:keywords",
      "topic:why",
      "topic:tasking",
      "phase:plan",
      "level:intermediate",
      "use:vector-priming",
      "use:context-packing",
      "use:negative-avoidance",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:goal / request",
      "field:why / context",
      "field:keywords (comma-separated)",
      "field:tasks (one per line)",
      "field:avoid (comma-separated negatives)",
      "field:do's (must do)",
      "field:don'ts / constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: prime the model with topical vectors via keywords • explain situational “why” for better alignment • list actionable tasks and explicit negatives to avoid
  Boosters: Normalize keywords to canonical forms (singulars, lowercase) before using them. Tie each task to at least one keyword. Call out conflicts between “why” and constraints in one line.`
  },
  {
    slug: "monroes-motivated-sequence",
    term: "Monroe’s Motivated Sequence",
    aliases: [
      "Monroe’s Motivated Sequence — Attention · Need · Satisfaction · Visualization · Action",
      "Monroe’s Motivated Sequence",
      "MMS",
      "monroe’s motivated sequence"
  ],
    definition: `A five-step persuasive framework that grabs attention, establishes a need, presents a satisfying solution, helps the audience visualize the outcome, and ends with a call to action.`,
    sources: [],
    categories: [
      "messaging frameworks",
      "persuasion"
  ],
    tags: [
      "type:framework",
      "topic:persuasion",
      "phase:compose",
      "level:intermediate",
      "use:speechwriting",
      "use:advocacy",
      "use:public-speaking",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:attention (hook, optional)",
      "field:need (audience problem)",
      "field:satisfaction (solution)",
      "field:action (call-to-action, optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: structure persuasive speeches or pitches for maximum impact • guide the audience from feeling a need to taking an action • formulate outreach messages (e.g., campaign appeals, motivational talks)
  Boosters: Open with a compelling hook (story or statistic) to grab Attention in the first step. In the Visualization step, paint a vivid picture of the future where the need is resolved (positive or negative outcomes).`
  },
  {
    slug: "okr-goal-setting",
    term: "OKR",
    aliases: [
      "OKR — Objective & Key Results",
      "OKR",
      "okr"
  ],
    definition: `A goal-setting framework pairing a qualitative Objective (what you want to achieve) with a set of quantitative Key Results (how you measure achievement).`,
    sources: [],
    categories: [
      "strategy",
      "planning"
  ],
    tags: [
      "type:framework",
      "topic:goals",
      "topic:metrics",
      "level:beginner",
      "use:strategic-planning",
      "use:team-goals",
      "use:performance-management",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:objective (qualitative goal)",
      "field:key results (optional, one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: define clear organizational or personal goals with measurable outcomes • break down a vision into concrete targets • evaluate progress by looking at quantifiable results tied to objectives
  Boosters: Make each Key Result specific, with a clear metric, target value, and timeframe. Ensure Key Results are outcomes (what is achieved), not tasks (what is done).`
  },
  {
    slug: "ooda-loop",
    term: "OODA Loop",
    aliases: [
      "OODA Loop (Observe–Orient–Decide–Act)",
      "OODA Loop",
      "OODAL",
      "ooda loop"
  ],
    definition: `A rapid decision cadence: Observe → Orient → Decide → Act.`,
    sources: [],
    categories: [
      "decision",
      "strategy",
      "ops"
  ],
    tags: [
      "type:pattern",
      "topic:ooda",
      "use:decision",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:observe — what’s the situation / facts?",
      "field:orient — what matters most right now?",
      "field:decide — what’s the next best step?",
      "field:act — what will i actually do now?"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: cut through indecision with a tight OODA pass • establish a clear next action under uncertainty
  Boosters: Add a quick feedback note: how you’ll check results after acting. Limit Observe/Orient to facts relevant to the next step.`
  },
  {
    slug: "pas-copywriting",
    term: "PAS",
    aliases: [
      "PAS — Problem · Agitate · Solution",
      "PAS",
      "pas"
  ],
    definition: `A copywriting formula that presents a Problem, amplifies it (Agitate), then provides a Solution to resolve the discomfort.`,
    sources: [],
    categories: [
      "messaging frameworks",
      "marketing"
  ],
    tags: [
      "type:framework",
      "topic:copywriting",
      "phase:compose",
      "level:beginner",
      "use:ad-copy",
      "use:email-copy",
      "use:landing-page",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:problem",
      "field:agitate (pain details, optional)",
      "field:solution"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: write persuasive copy by addressing the reader’s pain and offering relief • structure marketing messages or support tickets by focusing on problem then solution • craft introductions for pitches or blogs that hook with a problem and promise a solution
  Boosters: In the Agitate step, delve into emotional or practical consequences of the problem to make it feel urgent. Keep the Solution clear and directly tied to resolving the specific problem that was agitated.`
  },
  {
    slug: "paul-elder",
    term: "Paul",
    aliases: [
      "Paul–Elder — Elements of Thought + Standards",
      "Paul",
      "paul"
  ],
    definition: `Structure reasoning via the Elements of Thought (purpose, question, info, concepts, assumptions, implications, point of view, inference) and judge it with Intellectual Standards (clarity, accuracy, precision, relevance, depth, breadth, logic, significance, fairness).`,
    sources: [],
    categories: [
      "critical thinking frameworks",
      "prompt development techniques"
  ],
    tags: [
      "type:framework",
      "topic:critical-thinking",
      "phase:analyze",
      "level:intermediate",
      "use:argument-critique",
      "use:decision-memo",
      "use:policy-analysis",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:purpose",
      "field:central question",
      "field:information",
      "field:concepts",
      "field:assumptions",
      "field:point(s) of view",
      "field:inferences",
      "field:implications",
      "field:alternatives",
      "field:standards to apply"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: Argument/brief critique • Decision memos • Policy/position analysis • Lesson planning checks
  Boosters: Give a 3-sentence synthesis and 2 sharper follow-up questions that would most improve the reasoning.`
  },
  {
    slug: "persona-actas",
    term: "Persona",
    aliases: [
      "Persona — ActAs / Simulate",
      "Persona",
      "persona"
  ],
    definition: `Simulate a specific persona (role) with domain skills, vocabulary, and constraints; then apply it to the user’s end goal.`,
    sources: [],
    categories: [
      "prompt development techniques",
      "persona prompting"
  ],
    tags: [
      "type:pattern",
      "type:template",
      "topic:persona",
      "phase:apply",
      "level:beginner",
      "use:act-as",
      "use:simulation",
      "use:roleplay",
      "use:agent-spec",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:end goal / task to complete",
      "field:persona (who the ai will be)",
      "field:profession",
      "field:summary",
      "field:additional description (optional)",
      "field:core tasks (one per line)",
      "field:skills (comma or one per line)",
      "field:vocabulary (comma or one per line)",
      "field:goals (one per line)",
      "field:pain points (one per line)",
      "field:tools (comma or one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Boosters: Stay in-character. Prefer precise, domain-correct terminology. Cite trade-offs briefly before final answer.`
  },
  {
    slug: "pestle-analysis",
    term: "PESTLE",
    aliases: [
      "PESTLE — Political · Economic · Social · Technological · Legal · Environmental",
      "PESTLE",
      "pestle"
  ],
    definition: `A strategic analysis framework examining six external factors — Political, Economic, Social, Technological, Legal, and Environmental — that can impact an organization or initiative.`,
    sources: [],
    categories: [
      "analysis frameworks",
      "strategy"
  ],
    tags: [
      "type:framework",
      "topic:environment-scan",
      "phase:overview",
      "level:intermediate",
      "use:market-analysis",
      "use:risk-analysis",
      "use:strategic-planning",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:subject of analysis",
      "field:political factors (optional, one per line)",
      "field:economic factors (optional, one per line)",
      "field:social factors (optional, one per line)",
      "field:technological factors (optional, one per line)",
      "field:legal factors (optional, one per line)",
      "field:environmental factors (optional, one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: analyze external factors affecting a business or project • scan the macro-environment before launching an initiative • identify opportunities and threats in the broader context
  Boosters: For each category, include at least one specific factor and its potential impact on the subject. Differentiate clearly between internal issues (not included here) and these external factors.`
  },
  {
    slug: "pomodoro-scaffold",
    term: "Pomodoro Scaffold",
    aliases: [
      "Pomodoro Scaffold",
      "PS",
      "pomodoro scaffold"
  ],
    definition: `25-minute focused work block with short breaks.`,
    sources: [],
    categories: [
      "productivity",
      "focus"
  ],
    tags: [
      "type:pattern",
      "topic:pomodoro",
      "use:focus",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:task to tackle",
      "field:one 25-min micro-goal",
      "field:break reward",
      "field:next pomodoro step"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: frame a single 25-minute focus sprint • pair a micro-goal with a reward and next step
  Boosters: Hide distractions: list top 3 and how you’ll block them. Write an “opening move” you’ll do in the first 60 seconds.`
  },
  {
    slug: "pre-mortem-scaffold",
    term: "Pre-Mortem Scaffold",
    aliases: [
      "Pre-Mortem Scaffold",
      "PMS",
      "pre-mortem scaffold"
  ],
    definition: `Imagine the project failed and ask why, so you can prevent it.`,
    sources: [],
    categories: [
      "risk",
      "planning",
      "decision"
  ],
    tags: [
      "type:pattern",
      "topic:premortem",
      "use:planning",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:decision / project at hand",
      "field:imagine it failed — what went wrong? (one per line)",
      "field:preventive step(s)",
      "field:immediate action"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: surface failure modes before committing • turn risks into preventive steps and immediate actions
  Boosters: Force at least 3 realistic failure causes. Assign owners and a check date for each preventive step.`
  },
  {
    slug: "reflect-bias-scaffold",
    term: "REFLECT",
    aliases: [
      "REFLECT (bias reflection)",
      "REFLECT",
      "reflect"
  ],
    definition: `A structured reflection scaffold to identify, check, and transform bias in your approach.`,
    sources: [],
    categories: [
      "ethics",
      "bias",
      "critical thinking"
  ],
    tags: [
      "type:pattern",
      "topic:bias",
      "topic:reflection",
      "level:beginner",
      "use:interviews",
      "use:analysis",
      "use:synthesis",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:recognize — what bias might be at play?",
      "field:evaluate — how does it influence my thinking?",
      "field:frame — restate the problem from a different perspective",
      "field:listen — whose voices are missing?",
      "field:empathize — how would it feel in that missing perspective?",
      "field:check — what assumption should i test?",
      "field:transform — how will i change my approach?"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: spot potential bias during interviews, analysis, or synthesis • reframe a problem from multiple perspectives • turn reflection into concrete next steps
  Boosters: Keep tone neutral and specific; avoid moralizing. Return a bulleted summary + 3 concrete changes and 1 monitoring check.`
  },
  {
    slug: "scamper-framework",
    term: "SCAMPER",
    aliases: [
      "SCAMPER (idea expansion)",
      "SCAMPER",
      "scamper"
  ],
    definition: `Seven moves to push an idea: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:pattern",
      "topic:scamper",
      "use:ideas",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:current idea",
      "field:substitute — what element could you replace?",
      "field:combine — what can be merged?",
      "field:adapt — what can be borrowed?",
      "field:modify — exaggerated/minimized?",
      "field:put to other use — where else could it apply?",
      "field:eliminate — what can you cut?",
      "field:reverse — what if you flipped it?"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: systematically generate variants of an idea • unstick creative exploration
  Boosters: Demand at least 2 candidates per move (bullet them). End with one “crazy but testable” option.`
  },
  {
    slug: "scenario-based-deliberative",
    term: "Scenario-based Prompting",
    aliases: [
      "Scenario-based Prompting — Deliberative reasoning",
      "Scenario-based Prompting",
      "SP",
      "scenario-based prompting"
  ],
    definition: `Grounds the model in a concrete situation and explicitly asks it to reason deliberately before answering.`,
    sources: [],
    categories: [
      "prompt development techniques",
      "reasoning"
  ],
    tags: [
      "type:framework",
      "topic:prompting",
      "phase:compose",
      "level:intermediate",
      "use:scenario",
      "use:empathy",
      "use:deliberation",
      "use:edge-cases",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:role (optional)",
      "field:scenario (specific, even extreme)",
      "field:outcome goal",
      "field:constraints",
      "field:response format (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: coaching & advice • policy-sensitive responses • support empathy • edge-case analysis
  Boosters: Take a deep breath. Think step by step. First list assumptions and unknowns; then reason in numbered steps; then propose actions; end with a short checklist. Separate “Reasoning” from “Recommendation” using clear headings. Flag trade-offs and edge cases.`
  },
  {
    slug: "smart-goals",
    term: "SMART Goals",
    aliases: [
      "SMART Goals — Specific · Measurable · Achievable · Relevant · Time-bound",
      "SMART Goals",
      "SMARTG",
      "smart goals"
  ],
    definition: `A goal-setting checklist ensuring an objective is Specific, Measurable, Achievable, Relevant, and Time-bound.`,
    sources: [],
    categories: [
      "planning",
      "productivity"
  ],
    tags: [
      "type:framework",
      "topic:goal-setting",
      "phase:plan",
      "level:beginner",
      "use:personal-goals",
      "use:project-planning",
      "use:performance-goals",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:general goal"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: refine vague goals into actionable statements • ensure project objectives have clear success criteria and timelines • evaluate if a goal is well-defined or needs adjustment
  Boosters: If any SMART element is missing (e.g., no timeframe), the model will propose one to complete the goal definition. Present the output as 5 brief points (S, M, A, R, T) to clearly delineate each aspect.`
  },
  {
    slug: "task-recipe-cot",
    term: "Task Prompt Breakdown",
    aliases: [
      "Task Prompt Breakdown — Task/Recipe + Do/Don’t (CoT)",
      "Task Prompt Breakdown",
      "TPB",
      "task prompt breakdown"
  ],
    definition: `Decompose a goal into explicit steps (tasks), with optional Do/Don’t constraints, then produce the deliverable.`,
    sources: [],
    categories: [
      "prompt development techniques",
      "planning"
  ],
    tags: [
      "type:pattern",
      "topic:tasking",
      "topic:reasoning",
      "phase:plan",
      "level:beginner",
      "use:project-steps",
      "use:recipe",
      "use:breakdown",
      "use:delegation",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:main brief / goal",
      "field:tasks (one per line)",
      "field:do’s (must do)",
      "field:don’ts / constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: break a goal into concrete steps • write a procedural recipe • handoff a task with crisp Do/Don’t guardrails • guide short “explain-your-steps” reasoning
  Boosters: Show the step plan as a numbered list before the final deliverable. Keep reasoning concise and procedural (no hidden chain-of-thought). List assumptions in one line if any are required.`
  },
  {
    slug: "tree-of-thought-brainstorm",
    term: "Tree of Thought",
    aliases: [
      "Tree of Thought — Brainstorm & Evaluate",
      "Tree of Thought",
      "TT",
      "tree of thought"
  ],
    definition: `Explore three distinct reasoning branches (fast/minimal; thorough/future-proof; creative alternative), score them with a rubric, select/synthesize, deliver, then reflect.`,
    sources: [],
    categories: [
      "reasoning",
      "planning"
  ],
    tags: [
      "type:pattern",
      "topic:reasoning",
      "topic:branching",
      "phase:explore",
      "level:advanced",
      "use:brainstorm",
      "use:compare-alternatives",
      "use:decision",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:task / problem",
      "field:constraints (time/tools/tone/privacy)",
      "field:success criteria (what “good” looks like)",
      "field:evaluation criteria (optional, one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: generate multiple solution paths before deciding • compare tradeoffs across ideas using a scoring rubric • pick a best path with justification and a reflect pass
  Boosters: Keep branches shallow (depth 2–3) to avoid overthinking. Use explicit labels: Branch A, A1, A2… Branch B… Branch C… Score on 1–5 with one-line justifications per criterion. Run a quick reflect pass: math/terms/bias/constraints. If the user supplied criteria, use them; otherwise use the default rubric included below.`
  },
  {
    slug: "triangulation-methods",
    term: "Triangulation Methods",
    aliases: [
      "Triangulation Methods",
      "TM",
      "triangulation methods"
  ],
    definition: `Use multiple methods/sources to converge on more reliable findings and reduce researcher bias.`,
    sources: [],
    categories: [
      "research",
      "ethics",
      "bias"
  ],
    tags: [
      "type:pattern",
      "topic:triangulation",
      "topic:validation",
      "level:intermediate",
      "use:ux-research",
      "use:analytics",
      "use:mixed-methods",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:question being investigated",
      "field:method a",
      "field:findings from a",
      "field:method b",
      "field:findings from b",
      "field:method c (optional)",
      "field:findings from c (optional)",
      "field:cross-check — where do findings align/diverge?",
      "field:bias risk — which perspective dominates?"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: reduce single-method bias by cross-checking findings • document alignment/divergence across methods • decide where to deepen research
  Boosters: Label each method with its sampling limits. End with a “What we’ll do next” line for resolving divergences.`
  },
  {
    slug: "variables-and-delimiters",
    term: "Variables & Delimiters",
    aliases: [
      "Variables & Delimiters — Define once, reuse cleanly",
      "Variables & Delimiters",
      "VD",
      "variables & delimiters"
  ],
    definition: `Declare variables once (names + definitions aligned by line). We auto-fence a VARIABLES block so the model resolves {NAME} unambiguously.`,
    sources: [],
    categories: [
      "prompt development techniques",
      "structuring"
  ],
    tags: [
      "type:framework",
      "topic:prompting",
      "phase:compose",
      "level:beginner",
      "use:variables",
      "use:delimiters",
      "use:glossary",
      "use:spec",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:variables (one per line)",
      "field:definitions (one per line)",
      "field:primary task",
      "field:constraints (optional)",
      "field:response format (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: long prompts with reusable terms • glossaries & specs • persona/role libraries • data field definitions
  Boosters: Treat each {NAME} as canonical. If any mapping is missing, ask one concise clarifying question, then proceed. Keep variables verbatim (case-sensitive) when referencing, e.g., {USER_ROLE}.`
  },
  {
    slug: "weighted-mini-matrix",
    term: "Weighted Mini-Matrix",
    aliases: [
      "Weighted Mini-Matrix (quick score)",
      "Weighted Mini-Matrix",
      "WMM",
      "weighted mini-matrix"
  ],
    definition: `Tiny decision matrix: options × criteria with 1–5 ratings; totals pick the frontrunner.`,
    sources: [],
    categories: [
      "decision",
      "prioritization"
  ],
    tags: [
      "type:pattern",
      "topic:matrix",
      "use:prioritize",
      "level:intermediate",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:options (≤3, one per line)",
      "field:criteria (2–3, one per line)",
      "field:quick ratings (1–5) — one line per option"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: compare up to 3 options against 2–3 criteria • force a transparent, quick pick
  Boosters: If a criterion matters more, duplicate it (acts as a simple weight). Break ties with a 5-minute spike test you’ll define at the end.`
  },
  {
    slug: "woop-wish-outcome-obstacle-plan",
    term: "WOOP",
    aliases: [
      "WOOP (Wish–Outcome–Obstacle–Plan)",
      "WOOP",
      "woop"
  ],
    definition: `Wish → Outcome → Obstacle → Plan (if obstacle, then I will X).`,
    sources: [],
    categories: [
      "behavior",
      "motivation"
  ],
    tags: [
      "type:pattern",
      "topic:woop",
      "use:motivation",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:wish — what do i want to complete?",
      "field:outcome — benefit if i succeed?",
      "field:obstacle — what usually gets in the way?",
      "field:plan — if obstacle, then i will…"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: contrast desired outcome with the main obstacle • bind an if–then plan to the obstacle
  Boosters: Phrase the wish so it’s completable in ≤2 weeks. Make the obstacle internal (habit/thought) when possible.`
  },
  
  // Auto-generated — 2025-09-13T21:37:32.556Z

  {
    slug: "five-w-one-h-kipling",
    term: "5W1H",
    aliases: [
      "5W1H — Who · What · Where · When · Why · How",
      "5W1H",
      "WH",
      "5w1h"
  ],
    definition: `A universal clarifying scaffold that forces six essential answers before action.`,
    sources: [],
    categories: [
      "analysis frameworks",
      "prompt development techniques"
  ],
    tags: [
      "type:framework",
      "topic:clarification",
      "phase:compose",
      "level:beginner",
      "use:requirements",
      "use:prompt-scoping",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:who",
      "field:what",
      "field:where",
      "field:when",
      "field:why",
      "field:how",
      "field:not in scope (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: clarify task requirements • scope a prompt before execution • capture acceptance criteria
  Boosters: Answer each element with one crisp, testable line. Add a “not-in-scope” line after How.`
  },
  {
    slug: "a3-problem-solving-toyota",
    term: "A3 Problem Solving",
    aliases: [
      "A3 Problem Solving (Toyota)",
      "A3 Problem Solving",
      "APS",
      "a3 problem solving"
  ],
    definition: `A visual one-page flow to frame background, analyze causes, plan countermeasures, and follow through.`,
    sources: [],
    categories: [
      "quality",
      "operations",
      "reasoning",
      "prompt development techniques"
  ],
    tags: [
      "type:framework",
      "topic:problem-solving",
      "topic:lean",
      "phase:plan",
      "level:intermediate",
      "use:root-cause",
      "use:countermeasures",
      "use:one-page-brief",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:background (why this matters)",
      "field:current condition (facts/metrics)",
      "field:target condition (measurable)",
      "field:root-cause analysis",
      "field:countermeasures",
      "field:implementation plan",
      "field:follow-up / learnings"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: structure a one-page problem brief • analyze current vs. target condition • design countermeasures and follow-up
  Boosters: Keep it one “page”: terse bullets per section. Tie each countermeasure to a specific cause and owner.`
  },
  {
    slug: "anekantavada-syadvada-jain",
    term: "Anekāntavāda & Syādvāda",
    aliases: [
      "Anekāntavāda & Syādvāda (Jain Many-Sided Logic)",
      "Anekāntavāda & Syādvāda",
      "AS",
      "anekāntavāda & syādvāda"
  ],
    definition: `Reasoning that treats claims as conditionally true from different standpoints; includes sevenfold predication (syād-asti… etc.).`,
    sources: [],
    categories: [
      "reasoning",
      "philosophy",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:dialectic",
      "topic:many-sidedness",
      "phase:explore",
      "level:advanced",
      "use:ambiguity-management",
      "use:policy",
      "use:ethical-tradeoffs",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:issue/claim under analysis",
      "field:standpoints (naya), one per line",
      "field:key evidence by standpoint",
      "field:qualified statements (syād-…)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: frame a contentious issue via multiple partial truths • generate sevenfold qualified statements • surface context-conditional claims
  Boosters: Force at least 3 distinct standpoints before synthesis. Use “in some respect…” qualifiers to avoid overclaiming.`
  },
  {
    slug: "buddhist-eightfold-path-adapted",
    term: "Buddhist Eightfold Path",
    aliases: [
      "Buddhist Eightfold Path (Adapted for Action)",
      "Buddhist Eightfold Path",
      "BEP",
      "buddhist eightfold path"
  ],
    definition: `Use the eight factors (View, Intention, Speech, Action, Livelihood, Effort, Mindfulness, Concentration) as a practical checklist.`,
    sources: [],
    categories: [
      "ethics",
      "reasoning",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:mindfulness",
      "topic:ethics",
      "phase:plan",
      "level:intermediate",
      "use:policy-guardrails",
      "use:communication",
      "use:self-management",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:right view (assumptions/realities)",
      "field:right intention (aims)",
      "field:right speech (communication)",
      "field:right action (conduct)",
      "field:right livelihood (means)",
      "field:right effort (discipline)",
      "field:right mindfulness (attention)",
      "field:right concentration (focus)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: design ethical guardrails • structure mindful decision steps • review impacts on others
  Boosters: Translate each factor into a concrete check for the task. State one “harm minimization” change before final.`
  },
  {
    slug: "daoist-wu-wei-strategy",
    term: "Daoist Wu-Wei Strategy",
    aliases: [
      "Daoist Wu-Wei Strategy (Effortless Action)",
      "Daoist Wu-Wei Strategy",
      "DWWS",
      "daoist wu-wei strategy"
  ],
    definition: `Plan by aligning with natural flows; act sparingly at points of leverage; reduce friction and over-control.`,
    sources: [],
    categories: [
      "strategy",
      "ethics",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:wu-wei",
      "topic:minimal-intervention",
      "phase:plan",
      "level:intermediate",
      "use:governance",
      "use:ops-simplification",
      "use:change-management",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:goal/outcome",
      "field:existing flows (where energy already moves)",
      "field:friction points",
      "field:leverage points",
      "field:non-actions (deliberate restraint)",
      "field:minimal enabling actions"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: design minimal-intervention strategies • align with existing flows instead of forcing change • choose points of least-effort leverage
  Boosters: Prefer removing steps over adding steps. Name non-actions explicitly (what you will not do).`
  },
  {
    slug: "dmaic-six-sigma",
    term: "DMAIC",
    aliases: [
      "DMAIC — Define · Measure · Analyze · Improve · Control",
      "DMAIC",
      "dmaic"
  ],
    definition: `A five-phase improvement method that moves from definition and measurement to analysis, improvement, and sustained control.`,
    sources: [],
    categories: [
      "quality",
      "operations",
      "decision"
  ],
    tags: [
      "type:framework",
      "topic:six-sigma",
      "phase:execute",
      "level:intermediate",
      "use:process-improvement",
      "use:experiment-design",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:define",
      "field:measure",
      "field:analyze",
      "field:improve",
      "field:control"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: structure a data-driven improvement • turn metrics into countermeasures • plan control/monitoring
  Boosters: Tie each Improve action to a measured root cause. Specify Control metrics, thresholds, and owners.`
  },
  {
    slug: "east-behavioral-nudge",
    term: "EAST",
    aliases: [
      "EAST — Easy · Attractive · Social · Timely",
      "EAST",
      "east"
  ],
    definition: `A behavioral design checklist to make the desired behavior easy, attractive, social, and timely.`,
    sources: [],
    categories: [
      "behavior",
      "design",
      "strategy"
  ],
    tags: [
      "type:framework",
      "topic:nudge",
      "phase:design",
      "level:beginner",
      "use:behavior-change",
      "use:ux",
      "use:policy",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:target behavior",
      "field:audience/segment",
      "field:easy (reduce effort)",
      "field:attractive (salience/incentive)",
      "field:social (norms/reciprocity)",
      "field:timely (moment/trigger)",
      "field:success metric"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: design nudges for adoption • reduce friction in flows • translate insights into micro-interventions
  Boosters: Pair each tactic with a measurable behavior and metric. Add a tiny “if–then” plan for the riskiest barrier.`
  },
  {
    slug: "ganma-knowledge-confluence",
    term: "Ganma",
    aliases: [
      "Ganma — Knowledge Confluence (Yolŋu)",
      "Ganma",
      "ganma"
  ],
    definition: `A metaphor of mixing “freshwater” and “saltwater” knowledge streams to create a productive confluence.`,
    sources: [],
    categories: [
      "research",
      "cultural frameworks",
      "strategy"
  ],
    tags: [
      "type:framework",
      "topic:knowledge-pluralism",
      "topic:integration",
      "phase:explore",
      "level:advanced",
      "use:interdisciplinary-synthesis",
      "use:policy",
      "use:design-research",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:knowledge stream a",
      "field:knowledge stream b",
      "field:overlaps (shared truths)",
      "field:tensions (incommensurables)",
      "field:confluence (new practice/insight)",
      "field:safeguards / protocols"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: braid two knowledge systems without erasing differences • document tensions and synthesis • design shared next steps
  Boosters: Make tensions explicit; do not collapse differences. Name shared safeguards for continued collaboration.`
  },
  {
    slug: "kaitiakitanga-guardianship",
    term: "Kaitiakitanga",
    aliases: [
      "Kaitiakitanga — Guardianship & Stewardship (Māori)",
      "Kaitiakitanga",
      "kaitiakitanga"
  ],
    definition: `A stewardship lens that emphasizes protection of valued things (taonga), obligations to community, and long-term balance.`,
    sources: [],
    categories: [
      "ethics",
      "governance",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:stewardship",
      "topic:intergenerational",
      "phase:plan",
      "level:intermediate",
      "use:ai-governance",
      "use:impact-assessment",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:what are we safeguarding (taonga)?",
      "field:affected people/places (one per line)",
      "field:potential impacts (near/long term)",
      "field:guardianship principles/policies",
      "field:actions & accountability"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: assess long-term impacts and duties of care • plan safeguards for taonga (valued things) • design community accountability
  Boosters: Add an intergenerational horizon (e.g., 25–50 years). Name kaitiaki roles and escalation paths.`
  },
  {
    slug: "kansei-engineering",
    term: "Kansei Engineering",
    aliases: [
      "Kansei Engineering (Emotion→Design Mapping)",
      "Kansei Engineering",
      "KE",
      "kansei engineering"
  ],
    definition: `A method to connect desired emotional responses with concrete design attributes.`,
    sources: [],
    categories: [
      "design",
      "research",
      "analysis frameworks"
  ],
    tags: [
      "type:framework",
      "topic:emotion-design",
      "phase:design",
      "level:intermediate",
      "use:feature-mapping",
      "use:experience-goals",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:target emotion words (one per line)",
      "field:design stimuli/features (one per line)",
      "field:emotion→feature hypotheses",
      "field:validation plan"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: translate target feelings into design parameters • build a testable emotion→stimulus map • prioritize features by affective impact
  Boosters: Pick ≤5 emotion words and operationalize each with observable cues. Plan a small test to validate the mapping.`
  },
  {
    slug: "kepner-tregoe-psdm",
    term: "Kepner",
    aliases: [
      "Kepner–Tregoe (Situation–Problem–Decision–Potential Problem)",
      "Kepner",
      "kepner"
  ],
    definition: `A structured sequence for situation appraisal, problem analysis, decision analysis, and potential-problem analysis.`,
    sources: [],
    categories: [
      "decision",
      "quality",
      "operations"
  ],
    tags: [
      "type:framework",
      "topic:psdm",
      "phase:plan",
      "level:intermediate",
      "use:option-selection",
      "use:risk-management",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:situation appraisal",
      "field:problem analysis (is/is not, specs)",
      "field:decision analysis (criteria, options)",
      "field:potential-problem analysis (risks)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: separate problem analysis from decision analysis • pick criteria and evaluate alternatives • anticipate downstream risks
  Boosters: Weight criteria explicitly; show score math simply. List preventive and contingent actions for top risks.`
  },
  {
    slug: "maslaha-public-interest-reasoning",
    term: "Maṣlaḥa",
    aliases: [
      "Maṣlaḥa — Public Interest Reasoning (Islamic Ethics)",
      "Maṣlaḥa",
      "maṣlaḥa"
  ],
    definition: `A normative lens that prioritizes public benefit and harm minimization with transparent justification.`,
    sources: [],
    categories: [
      "ethics",
      "governance",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:public-interest",
      "topic:harm-benefit",
      "phase:plan",
      "level:advanced",
      "use:policy",
      "use:governance",
      "use:risk-balancing",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:issue/decision",
      "field:stakeholders (one per line)",
      "field:harms/risks",
      "field:benefits",
      "field:precedents/principles",
      "field:proportional ruling/decision"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: weigh harms and benefits to the public • craft proportionate, transparent justifications • design exceptions and safeguards
  Boosters: Show explicit harm/benefit tradeoffs and the least-harm alternative. Document conditions/limits and a review cadence.`
  },
  {
    slug: "musyawarah-mufakat-indonesia",
    term: "Musyawarah & Mufakat",
    aliases: [
      "Musyawarah & Mufakat — Deliberation to Consensus (Indonesia)",
      "Musyawarah & Mufakat",
      "MM",
      "musyawarah & mufakat"
  ],
    definition: `A culturally grounded process emphasizing inclusive deliberation (musyawarah) culminating in consensus (mufakat).`,
    sources: [],
    categories: [
      "decision",
      "facilitation",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:consensus",
      "topic:deliberation",
      "phase:decide",
      "level:intermediate",
      "use:group-decisions",
      "use:policy",
      "use:community",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:issue/decision",
      "field:participants (one per line)",
      "field:options (one per line)",
      "field:concerns/objections (one per line)",
      "field:consensus statement (draft)",
      "field:follow-up actions & owners"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: facilitate inclusive deliberation • surface objections and modify options • craft a consensus statement
  Boosters: Require an objection-handling pass before closing. Record the consensus statement and follow-up tasks.`
  },
  {
    slug: "naive-dialecticism-east-asia",
    term: "Naïve Dialecticism",
    aliases: [
      "Naïve Dialecticism (East Asian Holistic Reasoning)",
      "Naïve Dialecticism",
      "ND",
      "naïve dialecticism"
  ],
    definition: `A belief system that expects change, tolerates contradiction, and reasons holistically across context.`,
    sources: [],
    categories: [
      "reasoning",
      "philosophy",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:both-and",
      "topic:contradiction",
      "phase:explore",
      "level:advanced",
      "use:paradox-framing",
      "use:change-over-time",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:opposed poles (a vs. b)",
      "field:context factors (one per line)",
      "field:areas of tension",
      "field:harmony-seeking moves",
      "field:both-and statement"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: embrace change and contradiction in planning • craft both/and integrations • generate harmony-seeking adjustments
  Boosters: Write an explicit “both can be true” statement for the core tension. Propose a small harmonizing step that reduces conflict.`
  },
  {
    slug: "nyaya-five-member-syllogism",
    term: "Nyāya",
    aliases: [
      "Nyāya — Five-Member Syllogism",
      "Nyāya",
      "nyāya"
  ],
    definition: `Classical Indian argument form: Proposition, Reason, Example, Application, Conclusion.`,
    sources: [],
    categories: [
      "reasoning",
      "philosophy",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:logic",
      "phase:structure",
      "level:intermediate",
      "use:argumentation",
      "use:explain-like-i'm-5",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:proposition (pratijñā)",
      "field:reason (hetu)",
      "field:example (udāharaṇa)",
      "field:application (upanaya)",
      "field:conclusion (nigamana)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: structure explanations with example and application • justify conclusions with explicit inference steps
  Boosters: Keep each member one line. Choose a vivid, relevant example.`
  },
  {
    slug: "pdca-deming-cycle",
    term: "PDCA",
    aliases: [
      "PDCA — Plan · Do · Check · Act",
      "PDCA",
      "pdca"
  ],
    definition: `A continuous improvement loop for planning, executing, checking outcomes, and acting on learnings.`,
    sources: [],
    categories: [
      "quality",
      "operations",
      "education"
  ],
    tags: [
      "type:framework",
      "topic:iteration",
      "phase:iterate",
      "level:beginner",
      "use:continuous-improvement",
      "use:lesson-planning",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:plan",
      "field:do",
      "field:check",
      "field:act"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: design small learning or improvement loops • close the feedback loop on changes
  Boosters: Timebox each loop and define a “check” metric. Always propose the next PDCA cycle.`
  },
  {
    slug: "pramana-means-of-knowledge",
    term: "Pramāṇa",
    aliases: [
      "Pramāṇa — Means of Knowledge",
      "Pramāṇa",
      "pramāṇa"
  ],
    definition: `Classical Indian epistemology enumerating means of knowledge (e.g., perception, inference, analogy, testimony, postulation, non-apprehension).`,
    sources: [],
    categories: [
      "reasoning",
      "research",
      "philosophy"
  ],
    tags: [
      "type:framework",
      "topic:evidence",
      "phase:validate",
      "level:advanced",
      "use:source-triangulation",
      "use:epistemic-audit",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:claim under review",
      "field:applicable pramāṇas (one per line)",
      "field:evidence summary",
      "field:gaps/uncertainties"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: audit evidence types supporting a claim • decide what new evidence would change the answer
  Boosters: Name the weakest link and how to strengthen it. Add a “what would falsify this?” line.`
  },
  {
    slug: "qiyas-analogical-reasoning",
    term: "Qiyās",
    aliases: [
      "Qiyās — Analogical Reasoning (Islamic Jurisprudence)",
      "Qiyās",
      "qiyās"
  ],
    definition: `Infer a ruling for a new case by analogy to a known case that shares the effective cause.`,
    sources: [],
    categories: [
      "reasoning",
      "philosophy",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:analogy",
      "phase:apply",
      "level:advanced",
      "use:policy-analogy",
      "use:case-based-reasoning",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:original case (aṣl)",
      "field:new case (far‘)",
      "field:effective cause (ʿillah)",
      "field:ruling to extend (ḥukm)",
      "field:relevant differences/limits"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: extend rulings by identifying effective cause • structure analogies between known and novel cases
  Boosters: Make the effective cause explicit and test for relevant differences. State conditions that would break the analogy.`
  },
  {
    slug: "rapid-decision-rights",
    term: "RAPID",
    aliases: [
      "RAPID — Recommend · Agree · Perform · Input · Decide",
      "RAPID",
      "rapid"
  ],
    definition: `A roles framework that assigns decision rights and contributions to avoid bottlenecks.`,
    sources: [],
    categories: [
      "decision",
      "operations",
      "governance"
  ],
    tags: [
      "type:framework",
      "topic:decision-rights",
      "phase:plan",
      "level:beginner",
      "use:roles-responsibility",
      "use:decision-record",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:recommend (r)",
      "field:agree (a)",
      "field:perform (p)",
      "field:input (i)",
      "field:decide (d)",
      "field:timeline & checkpoints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: clarify who does what in a decision • speed up approvals by defining roles
  Boosters: Name individuals by role; include dates and escalation path. Add “disagree and commit” rule where needed.`
  },
  {
    slug: "scientific-method",
    term: "Scientific Method",
    aliases: [
      "Scientific Method — Question · Hypothesis · Method · Data · Analysis · Conclusion",
      "Scientific Method",
      "SM",
      "scientific method"
  ],
    definition: `A structured cycle for investigating questions via testable hypotheses and evidence.`,
    sources: [],
    categories: [
      "research",
      "education",
      "reasoning"
  ],
    tags: [
      "type:framework",
      "topic:experiment",
      "phase:test",
      "level:beginner",
      "use:ab-testing",
      "use:literature-replication",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:research question",
      "field:hypothesis (falsifiable)",
      "field:method / protocol",
      "field:data to collect",
      "field:analysis plan",
      "field:expected interpretation / decision rule"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: design an experiment or A/B test • replicate a result with clear hypotheses
  Boosters: Include falsifiable predictions and a pre-commit metric. Plan replication or follow-up.`
  },
  {
    slug: "scqa-situation-complication-question-answer",
    term: "SCQA",
    aliases: [
      "SCQA — Situation · Complication · Question · Answer",
      "SCQA",
      "scqa"
  ],
    definition: `A narrative logic that sets context, introduces the tension, asks the key question, and delivers the answer.`,
    sources: [],
    categories: [
      "storytelling frameworks",
      "analysis frameworks"
  ],
    tags: [
      "type:framework",
      "topic:structure",
      "phase:compose",
      "level:beginner",
      "use:briefs",
      "use:memos",
      "use:presentations",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:situation",
      "field:complication",
      "field:key question",
      "field:answer"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: structure memos or executive summaries • turn research into a compelling arc
  Boosters: Keep each section to 1–3 sentences. End with one explicit decision or ask.`
  },
  {
    slug: "sentipensar-thinking-feeling",
    term: "Sentipensar",
    aliases: [
      "Sentipensar — Thinking-Feeling Integration (Latin America)",
      "Sentipensar",
      "sentipensar"
  ],
    definition: `A method to braid rational analysis with lived experience and emotion for wiser action.`,
    sources: [],
    categories: [
      "reasoning",
      "design",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:affect-cognition",
      "phase:plan",
      "level:intermediate",
      "use:research-synthesis",
      "use:ethics",
      "use:co-design",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:rational analysis (facts/metrics)",
      "field:felt sense (stories/experiences)",
      "field:where they diverge",
      "field:how to converge responsibly"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: integrate analytic and experiential knowledge • design with empathy and evidence side-by-side
  Boosters: Document divergences between data and felt sense. End with a decision that honors both.`
  },
  {
    slug: "talanoa-dialogue",
    term: "Talanoa Dialogue",
    aliases: [
      "Talanoa Dialogue (Pacific)",
      "Talanoa Dialogue",
      "TD",
      "talanoa dialogue"
  ],
    definition: `An inclusive, story-led dialogue method emphasizing empathy, relationship, and consensus building.`,
    sources: [],
    categories: [
      "facilitation",
      "cultural frameworks",
      "decision"
  ],
    tags: [
      "type:framework",
      "topic:story-sharing",
      "topic:trust",
      "phase:explore",
      "level:beginner",
      "use:conflict-resolution",
      "use:policy-dialogue",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:stories (what matters, in participants’ words)",
      "field:shared issues (one per line)",
      "field:co-created solutions",
      "field:commitments & owners"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: build empathy and trust before negotiating • surface shared issues via story-first dialogue
  Boosters: Open with story; only then move to issues and solutions. End with clear commitments and owners.`
  },
  {
    slug: "tote-test-operate-test-exit",
    term: "TOTE",
    aliases: [
      "TOTE — Test · Operate · Test · Exit",
      "TOTE",
      "tote"
  ],
    definition: `A simple cybernetic loop: test the state, operate to change it, test again, then exit when criteria are met.`,
    sources: [],
    categories: [
      "planning",
      "cognitive models"
  ],
    tags: [
      "type:pattern",
      "topic:control-loop",
      "phase:iterate",
      "level:beginner",
      "use:rapid-iteration",
      "use:prompt-tuning",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:initial test (state/criteria)",
      "field:operate (action)",
      "field:re-test (check)",
      "field:exit criteria"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: build a minimal control loop for a task • decide when to stop iterating
  Boosters: Define exit criteria upfront (avoid endless loops). Log each test quickly with pass/fail.`
  },
  {
    slug: "vroom-yetton-jago-decision",
    term: "Vroom",
    aliases: [
      "Vroom–Yetton–Jago Decision Model",
      "Vroom",
      "vroom"
  ],
    definition: `A diagnostic tree to select the appropriate decision style given quality, expertise, commitment, and time constraints.`,
    sources: [],
    categories: [
      "decision",
      "leadership",
      "operations"
  ],
    tags: [
      "type:framework",
      "topic:leadership",
      "topic:participation",
      "phase:plan",
      "level:intermediate",
      "use:meeting-design",
      "use:time-critical-decisions",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:problem/decision",
      "field:importance of decision quality",
      "field:leader expertise on this problem",
      "field:need for team commitment",
      "field:time constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: choose an autocratic, consultative, or group style • balance decision quality vs. speed and commitment
  Boosters: Answer each diagnostic question explicitly; show the path to the style. Note risks if a faster/slower style is chosen.`
  },
  {
    slug: "zhongyong-doctrine-of-the-mean",
    term: "Zhongyong",
    aliases: [
      "Zhongyong — Doctrine of the Mean (Confucian Moderation)",
      "Zhongyong",
      "zhongyong"
  ],
    definition: `A practical method for finding a context-appropriate middle path between harmful extremes.`,
    sources: [],
    categories: [
      "ethics",
      "reasoning",
      "cultural frameworks"
  ],
    tags: [
      "type:framework",
      "topic:moderation",
      "topic:context",
      "phase:plan",
      "level:intermediate",
      "use:policy-guardrails",
      "use:communication",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:harmful extremes (a and b)",
      "field:principles for the mean",
      "field:adjustment steps",
      "field:acceptance criteria"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: avoid extremes by calibrating to context • craft proportionate responses and tone
  Boosters: Name the two extremes explicitly, then the principled middle. Set acceptance criteria for “balanced enough”.`
  },
  
  
  {
    slug: "disney-dreamer-realist-critic",
    term: "Disney Strategy",
    aliases: [
      "Disney Strategy — Dreamer · Realist · Critic",
      "Disney Strategy",
      "DS",
      "disney strategy"
  ],
    definition: `A structured creative process (attributed to Walt Disney, modeled by Robert Dilts) that cycles through three distinct thinking styles:contentReference[oaicite:20]{index=20}. First, the *Dreamer* freely imagines ideas without limits:contentReference[oaicite:21]{index=21}. Next, the *Realist* figures out how to implement those ideas practically:contentReference[oaicite:22]{index=22}. Finally, the *Critic* rigorously scrutinizes the plan, identifying flaws and risks:contentReference[oaicite:23]{index=23}. This method helps turn imaginative ideas into feasible plans while still allowing critical refinement.`,
    sources: [],
    categories: [
      "creativity",
      "evaluation"
  ],
    tags: [
      "type:framework",
      "topic:perspective-taking",
      "use:develop-idea",
      "level:intermediate",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:idea or project description"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: develop an idea from wild concept to practical plan • balance imaginative thinking with realism and critical review
  Boosters: Separate the three modes clearly: don’t allow the Critic to interrupt the Dreamer phase:contentReference[oaicite:18]{index=18}:contentReference[oaicite:19]{index=19}. Embrace the Dreamer’s outrageous ideas fully before switching to Realist mode to figure out execution steps.`
  },
  {
    slug: "empty-chair-technique",
    term: "Empty Chair Dialogue",
    aliases: [
      "Empty Chair Dialogue (Gestalt)",
      "Empty Chair Dialogue",
      "ECD",
      "empty chair dialogue"
  ],
    definition: `A Gestalt therapy exercise where you imagine someone (or a part of yourself) in an empty chair and have a candid dialogue to express unresolved feelings or internal conflicts.`,
    sources: [],
    categories: [
      "psychology",
      "self-reflection"
  ],
    tags: [
      "type:pattern",
      "topic:gestalt",
      "topic:empty-chair",
      "level:intermediate",
      "use:resolve-feelings",
      "use:closure",
      "use:internal-conflict",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:your identity or role",
      "field:other person or part in the chair",
      "field:topic or emotion to explore"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: express thoughts and feelings to someone (or a part of yourself) as if they were present • gain closure or clarity by role-playing both sides of a difficult conversation • integrate conflicting feelings by voicing each side in turn
  Boosters: Be honest and unfiltered when voicing each side—let emotions flow. Switch perspective after each statement: fully embody the other person or part when responding.`
  },
  {
    slug: "spoon-theory-energy-planner",
    term: "Energy Budget Planner",
    aliases: [
      "Energy Budget Planner (Spoon Theory)",
      "Energy Budget Planner",
      "EBP",
      "energy budget planner"
  ],
    definition: `A planning method that treats your energy or focus as a limited budget (“spoons”) to spend on tasks, helping you prioritize and balance activities with rest.`,
    sources: [],
    categories: [
      "productivity",
      "self-care"
  ],
    tags: [
      "type:framework",
      "topic:spoon-theory",
      "topic:energy-management",
      "level:beginner",
      "use:daily-planning",
      "use:adhd",
      "use:chronic-illness",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:available spoons (energy for the day)",
      "field:tasks (one per line, with optional spoon cost)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: plan your day according to limited energy or focus (“spoons”) • prioritize tasks when you’re fatigued or dealing with chronic illness • avoid burnout by allocating time for rest and recovery in your schedule
  Boosters: Estimate a spoon cost for each task (e.g., 1 = easy, 5 = very demanding). Plan a small reward or break whenever you use a large portion of your spoons to recharge.`
  },
  {
    slug: "epic-quest-tasking",
    term: "Epic Quest Tasking",
    aliases: [
      "Epic Quest Tasking — Gamify the Chore",
      "Epic Quest Tasking",
      "EQT",
      "epic quest tasking"
  ],
    definition: `A motivational technique that reframes a mundane task as an epic adventure or game quest. By becoming a hero on a mission (with challenges and rewards), the task feels more engaging and doable.`,
    sources: [],
    categories: [
      "productivity",
      "creativity"
  ],
    tags: [
      "type:pattern",
      "topic:gamification",
      "topic:play",
      "level:beginner",
      "use:motivation",
      "use:adhd",
      "use:routine",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:task or chore to gamify",
      "field:hero persona or theme (optional)",
      "field:reward for completion (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: turn a boring chore or task into an exciting mission narrative to spark motivation • help neurodivergent individuals get started on tasks by reframing them as game quests • make goal-setting fun by introducing heroes, villains, and rewards into everyday tasks
  Boosters: Set a time limit or “countdown” in the story to create urgency (e.g., “complete the quest before the sun sets in 25 minutes”). Include a small celebratory moment or reward in the narrative when the task (quest) is completed, to give a sense of accomplishment.`
  },
  {
    slug: "freewriting-zero-draft",
    term: "Freewriting",
    aliases: [
      "Freewriting — Unfiltered stream of thought (Zero Draft)",
      "Freewriting",
      "freewriting"
  ],
    definition: `A technique where you write continuously about a topic without worrying about structure or correctness, often used to bypass creative blocks:contentReference[oaicite:13]{index=13}. This "zero draft" approach lets thoughts flow freely, producing raw material that can later be refined or used to guide further work (it’s especially useful for writers with writer’s block).`,
    sources: [],
    categories: [
      "creativity",
      "writing"
  ],
    tags: [
      "type:technique",
      "topic:writing",
      "use:brainstorm",
      "level:beginner",
      "type:template",
      "kind:technique",
      "has:boosters",
      "field:topic or question"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: overcome writer’s block or creative block • discover latent ideas by writing without stopping
  Boosters: Do not stop or edit mid-flow; even nonsense is okay in the draft. After the freewrite, highlight any surprising ideas or patterns that emerged.`
  },
  {
    slug: "head-heart-gut-decision",
    term: "Head-Heart-Gut",
    aliases: [
      "Head-Heart-Gut — Rational · Emotional · Instinctual check",
      "Head-Heart-Gut",
      "HHG",
      "head-heart-gut"
  ],
    definition: `A decision-making technique that ensures you consider three facets of knowing: the Head (intellect and logic), the Heart (emotions and values), and the Gut (intuition and instinct):contentReference[oaicite:39]{index=39}. Each of these "three brains" provides essential information – the Head analyzes data and facts, the Heart weighs what matters to you emotionally, and the Gut offers instinctive insights:contentReference[oaicite:40]{index=40}. Checking in with all three leads to choices that are more balanced and authentic:contentReference[oaicite:41]{index=41}.`,
    sources: [],
    categories: [
      "decision-making",
      "self-reflection"
  ],
    tags: [
      "type:framework",
      "topic:embodied-cognition",
      "use:decision-support",
      "level:intermediate",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:decision or question"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: make well-rounded decisions considering logic, feelings, and intuition • resolve internal conflict by aligning thoughts, values, and instincts
  Boosters: Acknowledge differences: it’s normal if Head, Heart, and Gut say different things:contentReference[oaicite:37]{index=37}. If one perspective (e.g., Gut) flags a concern the others don’t, take it seriously and investigate that aspect further:contentReference[oaicite:38]{index=38}.`
  },
  {
    slug: "ice-scoring",
    term: "ICE",
    aliases: [
      "ICE — Impact × Confidence × Ease",
      "ICE",
      "ice"
  ],
    definition: `ICE is a lightweight scoring model: Impact × Confidence × Ease.`,
    sources: [],
    categories: [
      "prioritization",
      "growth",
      "experimentation"
  ],
    tags: [
      "type:framework",
      "topic:scoring",
      "use:backlog-grooming",
      "use:experiments",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:idea / experiment",
      "field:impact (1–10)",
      "field:confidence (1–10)",
      "field:ease (1–10)",
      "field:notes (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: fast triage of ideas • growth experiments • ops improvements
  Boosters: Keep scales consistent (e.g., 1–10).`
  },
  {
    slug: "imaginary-mentor-council",
    term: "Imaginary Council",
    aliases: [
      "Imaginary Council — Multiple Mentors, One Question",
      "Imaginary Council",
      "IC",
      "imaginary council"
  ],
    definition: `A brainstorming method where you pose a question to an imaginary panel of mentors or characters. Each “advisor” gives their perspective or solution, helping you see the issue from many angles.`,
    sources: [],
    categories: [
      "creativity",
      "strategy"
  ],
    tags: [
      "type:pattern",
      "topic:roleplay",
      "topic:perspective-shift",
      "level:intermediate",
      "use:brainstorming",
      "use:decision-support",
      "use:ideation",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:council members",
      "field:problem or question for the council"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: get advice on a problem by imagining a panel of diverse mentors or characters • break out of one-track thinking by considering how different personalities would tackle your issue • indulge in a creative self-coaching exercise by channeling wisdom from fictional or real figures
  Boosters: Choose a mix of “advisors” with wildly different viewpoints or expertise (e.g., a scientist, an artist, a child, a rebel). Include at least one fun or unexpected persona (like your pet or a favorite fictional character) for creative insight.`
  },
  {
    slug: "internal-weather-report",
    term: "Internal Weather Report",
    aliases: [
      "Internal Weather Report — Storm · Calm · Forecast",
      "Internal Weather Report",
      "IWR",
      "internal weather report"
  ],
    definition: `A reflective journaling exercise that describes one’s mood and feelings as a weather report, complete with current conditions, any changes on the horizon, and a short-term forecast for emotional climate.`,
    sources: [],
    categories: [
      "self-reflection",
      "creativity"
  ],
    tags: [
      "type:pattern",
      "topic:emotions",
      "topic:metaphor",
      "level:beginner",
      "use:journal",
      "use:emotional-awareness",
      "use:stress-relief",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:current mood or feeling"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: articulate your current mood or emotional state using weather metaphors • gain perspective on emotional ups and downs by “forecasting” possible changes • playfully externalize feelings to reduce their intensity and understand them
  Boosters: Don’t shy away from dramatic weather—intense storm imagery can help validate strong feelings (just include a shift toward resolution). End the report with a gentle forecast or hope (e.g., “skies clearing later”) to remind yourself that emotions change.`
  },
  {
    slug: "kano-model",
    term: "Kano Model",
    aliases: [
      "Kano Model — Must-be, Performance, Delighters",
      "Kano Model",
      "KM",
      "kano model"
  ],
    definition: `Kano groups features by how they affect user satisfaction: Must-be, Performance, Delighters, and Indifferent/Reverse.`,
    sources: [],
    categories: [
      "prioritization",
      "product management",
      "ux"
  ],
    tags: [
      "type:framework",
      "topic:prioritization",
      "topic:user-satisfaction",
      "use:backlog-refinement",
      "use:research-synthesis",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:must-be (expected basics)",
      "field:performance (more is better)",
      "field:delighters (unexpected extras)",
      "field:indifferent / reverse",
      "field:notes (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: separate basics from delighters • decide what prevents complaints vs. what creates delight • facilitate feature trade-offs in workshops
  Boosters: Add 1–2 sentence rationale per item. Note any risks or assumptions after each list.`
  },
  {
    slug: "morning-pages-journaling",
    term: "Morning Pages",
    aliases: [
      "Morning Pages — Daily stream-of-consciousness journal",
      "Morning Pages",
      "MP",
      "morning pages"
  ],
    definition: `A daily writing practice popularized by Julia Cameron’s *The Artist’s Way* to unblock creativity:contentReference[oaicite:34]{index=34}. Every morning, you write three pages of longhand, uncensored stream-of-consciousness thoughts. Morning Pages help "clear out the sludge," reconnecting you with your true feelings and ideas and often leading to unexpected insights or clarity about your desires:contentReference[oaicite:35]{index=35}:contentReference[oaicite:36]{index=36}.`,
    sources: [],
    categories: [
      "creativity",
      "self-reflection"
  ],
    tags: [
      "type:exercise",
      "topic:journal",
      "use:creative-block",
      "level:beginner",
      "type:template",
      "kind:technique",
      "has:boosters",
      "field:current feeling or focus (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: unlock creativity through routine journaling • clear mental clutter at the start of the day
  Boosters: Write by hand if possible, as it can enhance reflection and mind-body connection:contentReference[oaicite:32]{index=32}. Do not share or even reread your Morning Pages immediately; their power comes from absolute freedom and privacy:contentReference[oaicite:33]{index=33}.`
  },
  {
    slug: "moscow-prioritization",
    term: "MoSCoW",
    aliases: [
      "MoSCoW — Must · Should · Could · Won’t",
      "MoSCoW",
      "MSCW",
      "moscow"
  ],
    definition: `A prioritization method that groups requirements into Must have, Should have, Could have, and Won’t have for a project or release.`,
    sources: [],
    categories: [
      "prioritization",
      "planning",
      "product management"
  ],
    tags: [
      "type:framework",
      "topic:prioritization",
      "topic:requirements",
      "level:beginner",
      "use:project-planning",
      "use:backlog-refinement",
      "use:scope-management",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:must have (critical)",
      "field:should have (important but not critical)",
      "field:could have (nice-to-have)",
      "field:won’t have (this time)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: prioritize product features or requirements • ux research • clarify scope during project planning • communicate priorities to stakeholders
  Boosters: Keep each category concise (1–2 sentences per item). Explicitly state why each item is in its category to prevent scope creep.`
  },
  {
    slug: "oblique-strategies-cards",
    term: "Oblique Strategies",
    aliases: [
      "Oblique Strategies — Lateral thinking prompt cards",
      "Oblique Strategies",
      "OS",
      "oblique strategies"
  ],
    definition: `A card-based method invented by musician Brian Eno and artist Peter Schmidt to overcome creative blocks:contentReference[oaicite:15]{index=15}. Each Oblique Strategies card presents a cryptic instruction or dilemma (e.g., "Remove specifics and convert to ambiguities") designed to break down artistic barriers and spark creative insight:contentReference[oaicite:16]{index=16}. Following these prompts encourages lateral thinking. Similarly, some creators use random oracle systems (like the I Ching, as John Cage did) for the same purpose of injecting randomness to spur innovation:contentReference[oaicite:17]{index=17}.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:technique",
      "topic:cards",
      "use:creative-block",
      "level:intermediate",
      "type:template",
      "kind:technique",
      "has:boosters",
      "field:creative situation or block",
      "field:number of cards to draw (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: break out of a creative rut with random prompts • find new approaches when stuck on an artistic problem
  Boosters: Interpret the card prompts loosely; any personal meaning you derive is valid:contentReference[oaicite:14]{index=14}. If a prompt seems cryptic or disruptive, embrace it — use it as an opportunity to change your approach entirely.`
  },
  {
    slug: "parts-work-dialogue",
    term: "Parts Work Dialogue",
    aliases: [
      "Parts Work Dialogue (IFS therapy)",
      "Parts Work Dialogue",
      "PWD",
      "parts work dialogue"
  ],
    definition: `An internal dialogue technique (from Internal Family Systems therapy) where you personify and converse with different parts of yourself to unearth and harmonize conflicting inner voices.`,
    sources: [],
    categories: [
      "psychology",
      "self-reflection"
  ],
    tags: [
      "type:pattern",
      "topic:parts-work",
      "topic:IFS",
      "level:intermediate",
      "use:internal-conflict",
      "use:self-discovery",
      "use:trauma-processing",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:part a (name/role)",
      "field:part b (name/role)",
      "field:conflict or concern between them"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: resolve internal conflicts by giving each part a voice • understand the needs and fears of your inner “family” members • foster self-compassion by mediating between your inner voices
  Boosters: Clearly define each part’s role (e.g., Inner Critic vs. Vulnerable Child). Allow each part to speak without judgment, then have your core Self respond with empathy.`
  },
  {
    slug: "random-association",
    term: "Random Association",
    aliases: [
      "Random Association — Combine unrelated ideas",
      "Random Association",
      "RA",
      "random association"
  ],
    definition: `A method to introduce two random, unrelated items or concepts and force a connection between them, spurring innovative thinking by linking disparate ideas:contentReference[oaicite:0]{index=0}.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:technique",
      "topic:random",
      "use:brainstorm",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:problem or topic",
      "field:random element 1 (optional)",
      "field:random element 2 (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: break creative block with random prompts • discover unconventional ideas by forced connections
  Boosters: Pick truly unrelated elements for bigger creativity leaps. Encourage humorous or absurd connections; even silly ideas can contain a seed of insight.`
  },
  {
    slug: "rapid-ideation",
    term: "Rapid Ideation",
    aliases: [
      "Rapid Ideation — Timed idea sprint",
      "Rapid Ideation",
      "RI",
      "rapid ideation"
  ],
    definition: `A brainstorming approach focusing on quantity over quality: set a short time limit and produce as many ideas as possible without filtering:contentReference[oaicite:8]{index=8}. The goal is to bypass your inner critic and get a broad list of thoughts, which can later be reviewed for viable options or refined ideas.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:technique",
      "topic:brainstorm",
      "use:quantity-over-quality",
      "level:beginner",
      "type:template",
      "kind:technique",
      "has:boosters",
      "field:problem or question",
      "field:time/quantity constraint (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: generate lots of ideas under time pressure • overcome creative block by not overthinking
  Boosters: Suspend judgment during the idea sprint – no idea is too silly initially:contentReference[oaicite:7]{index=7}. Set a clear timer or target idea count; the constraint can boost focus and output.`
  },
  {
    slug: "rice-scoring",
    term: "RICE",
    aliases: [
      "RICE — Reach × Impact × Confidence ÷ Effort",
      "RICE",
      "rice"
  ],
    definition: `RICE prioritizes by Reach, Impact, Confidence, and Effort. Score = (R × I × C) / E.`,
    sources: [],
    categories: [
      "prioritization",
      "product management"
  ],
    tags: [
      "type:framework",
      "topic:scoring",
      "use:backlog-prioritization",
      "use:roadmap",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:feature / item name",
      "field:reach (users / period)",
      "field:impact (e.g., 0.25/0.5/1/2/3)",
      "field:confidence (0–1)",
      "field:effort (person-months)",
      "field:notes (assumptions, caveats)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: rank features quantitatively • allocate scarce resources
  Boosters: Show the formula and numbers; round to 2 decimals.`
  },
  {
    slug: "role-storming",
    term: "Role Storming",
    aliases: [
      "Role Storming — Ideation as different personas",
      "Role Storming",
      "RS",
      "role storming"
  ],
    definition: `A brainstorming variation where you imagine yourself (or your team) in a different role or persona and generate ideas from that perspective:contentReference[oaicite:1]{index=1}. By role-playing as someone else (e.g., a customer, a famous innovator), you can gain new insights and break habitual thinking.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:technique",
      "topic:role-play",
      "use:brainstorm",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:problem or goal",
      "field:roles or personas (one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: get fresh ideas by changing perspective • uncover insights via imaginary roles
  Boosters: Adopt extreme or unusual personas to push boundaries of thinking. Stay in character for each role to fully explore its viewpoint before switching.`
  },
  {
    slug: "rubber-duck-debugging",
    term: "Rubber Duck Debugging",
    aliases: [
      "Rubber Duck Debugging — Explain to Understand",
      "Rubber Duck Debugging",
      "RDD",
      "rubber duck debugging"
  ],
    definition: `A problem-solving technique where you explain your issue or question aloud in simple terms (often to an inanimate object or imaginary friend). The act of explaining reveals gaps in understanding and often leads to the solution.`,
    sources: [],
    categories: [
      "analysis",
      "productivity"
  ],
    tags: [
      "type:pattern",
      "topic:explaining",
      "topic:debugging",
      "level:beginner",
      "use:problem-solving",
      "use:learning",
      "use:clarification",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:problem or question to explain"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: work through a tricky problem by explaining it step-by-step as if to a complete novice (or a rubber duck) • clarify your understanding of a bug or question by articulating every detail and assumption • discover gaps in logic or missing pieces by teaching the problem to an imaginary listener
  Boosters: Imagine the “duck” is totally new to the subject – define even basic terms as you explain. Have the duck ask simple clarification questions if something isn’t clear, and then answer them.`
  },
  {
    slug: "shadow-work-dialogue",
    term: "Shadow Work Dialogue",
    aliases: [
      "Shadow Work Dialogue — Conscious Self · Shadow Self",
      "Shadow Work Dialogue",
      "SWD",
      "shadow work dialogue"
  ],
    definition: `A Jungian-inspired exercise where you have a written conversation between your everyday conscious self and your “Shadow” (the hidden, negative, or feared aspects of you) to acknowledge and integrate these aspects.`,
    sources: [],
    categories: [
      "psychology",
      "self-reflection"
  ],
    tags: [
      "type:pattern",
      "topic:shadow",
      "topic:unconscious",
      "level:advanced",
      "use:inner-demons",
      "use:self-acceptance",
      "use:emotional-healing",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:shadow trait or feeling",
      "field:triggering scenario (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: confront a “shadow” side of yourself (traits or emotions you’ve repressed) by personifying it • gain insight into negative patterns by dialoguing with the part of you that acts them out • integrate and heal shame or anger by compassionately engaging with your darker side
  Boosters: Approach the shadow with curiosity, not hostility – it often protects a hurt part of you in a misguided way. Let the Shadow Self speak bluntly. Have your Conscious Self acknowledge its points before gently offering an alternative perspective.`
  },
  {
    slug: "socratic-method",
    term: "Socratic Questioning Method",
    aliases: [
      "Socratic Questioning Method",
      "SQM",
      "socratic questioning method"
  ],
    definition: `A disciplined questioning method to clarify, probe assumptions, test evidence, explore viewpoints, and examine implications.`,
    sources: [],
    categories: [
      "reasoning",
      "critical thinking"
  ],
    tags: [
      "type:pattern",
      "topic:socratic",
      "topic:assumptions",
      "phase:explore",
      "level:beginner",
      "use:analysis",
      "use:teaching",
      "use:debiasing",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:claim / topic",
      "field:assumptions (one per line, optional)",
      "field:evidence (one per line, optional)",
      "field:alternatives (one per line, optional)",
      "field:do's (must do)",
      "field:don'ts / constraints"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: interrogate claims and assumptions • separate knowledge from belief • surface implications and alternatives
  Boosters: Keep questions sharp and answerable. Avoid leading or loaded wording. End with a synthesis and next inquiry.`
  },
  {
    slug: "somatic-focusing-felt-sense",
    term: "Somatic Focusing",
    aliases: [
      "Somatic Focusing — Feel · Ask · Listen",
      "Somatic Focusing",
      "SF",
      "somatic focusing"
  ],
    definition: `A mindfulness-based introspection where you focus on a physical feeling (“felt sense”), describe it, and then dialogue with it to reveal insights or relief.`,
    sources: [],
    categories: [
      "psychology",
      "self-reflection"
  ],
    tags: [
      "type:pattern",
      "topic:somatic",
      "topic:felt-sense",
      "level:intermediate",
      "use:anxiety-management",
      "use:inner-wisdom",
      "use:emotional-processing",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:bodily sensation (location & quality)",
      "field:context or emotion (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: tune into a bodily sensation to discover the message or emotion it holds • reduce overwhelm by patiently listening to what your body is telling you • clarify vague feelings by describing them and “asking” them questions
  Boosters: Describe the sensation with metaphor (e.g., “a knot of fire in my belly”) to capture its quality. After describing, gently ask the sensation what it wants or needs, and wait for an intuitive answer.`
  },
  {
    slug: "synectics-analogies",
    term: "Synectics",
    aliases: [
      "Synectics — Analogies & Problem Transfer",
      "Synectics",
      "synectics"
  ],
    definition: `A creative problem-solving approach that "joins together different and apparently irrelevant elements" by using analogies:contentReference[oaicite:26]{index=26}. In Synectics, you reframe the problem into an analogous situation in a distant or unrelated context (using direct, personal, symbolic, or fantasy analogies):contentReference[oaicite:27]{index=27}, brainstorm solutions for that analogy, and then translate those solutions back to the original problem:contentReference[oaicite:28]{index=28}. This leverages the mind’s ability to find connections and can yield truly novel solutions.`,
    sources: [],
    categories: [
      "creativity",
      "problem-solving"
  ],
    tags: [
      "type:framework",
      "topic:analogies",
      "use:innovate",
      "level:advanced",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:original problem",
      "field:analogy scenario (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: find solutions by drawing analogies from unrelated domains • unstick a problem by reframing it in a different context
  Boosters: Encourage wild analogies – even if the link is tenuous, it may spark a novel idea:contentReference[oaicite:24]{index=24}. After solving the analogy problem, carefully map the insights back to the original problem to ensure relevance:contentReference[oaicite:25]{index=25}.`
  },
  {
    slug: "synesthetic-brainstorm",
    term: "Synesthetic Brainstorm",
    aliases: [
      "Synesthetic Brainstorm — Color · Sound · Texture",
      "Synesthetic Brainstorm",
      "SB",
      "synesthetic brainstorm"
  ],
    definition: `A creative thinking exercise that treats an idea or problem through multiple sensory lenses (color, sound, texture, etc.), using synesthesia-like metaphors to spark new insights.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:pattern",
      "topic:metaphor",
      "topic:sensory",
      "level:beginner",
      "use:idea-generation",
      "use:perspective-shift",
      "use:creative-block",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:problem or concept to explore"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: generate fresh ideas by translating an abstract problem into sensory metaphors • unlock intuition about a concept by describing its color, sound, texture, or taste • use cross-sensory analogies to discover surprising angles on a design or story challenge
  Boosters: Include at least three senses (e.g., sight, sound, touch) in your exploration; the more variety, the more insights. After listing sensory metaphors, reflect on why each metaphor might resonate and what new ideas it suggests.`
  },
  {
    slug: "tarot-spread-reflection",
    term: "Tarot Spread Reflection",
    aliases: [
      "Tarot Spread Reflection — Past · Present · Future",
      "Tarot Spread Reflection",
      "TSR",
      "tarot spread reflection"
  ],
    definition: `A three-card spread (often Past-Present-Future) used as a reflective tool. Each card’s meaning is applied metaphorically to the user’s question or situation, providing narrative insight and guidance.`,
    sources: [],
    categories: [
      "creativity",
      "self-reflection"
  ],
    tags: [
      "type:framework",
      "topic:tarot",
      "topic:storytelling",
      "level:intermediate",
      "use:personal-insight",
      "use:creative-inspiration",
      "use:journal",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:question or situation for guidance",
      "field:drawn cards (optional, one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: gain personal insight by interpreting a situation through symbolic cards • use archetypal imagery to brainstorm solutions or perspectives on a problem • practice creative storytelling or introspection using a 3-card tarot format
  Boosters: Even if you don’t know tarot meanings, focus on the imagery or themes each card suggests and how it might relate to your life. If a card interpretation feels negative, include an empowering reframe or advice to balance it.`
  },
  {
    slug: "time-machine-perspectives",
    term: "Time Machine Advice",
    aliases: [
      "Time Machine Advice — Past Self & Future Self",
      "Time Machine Advice",
      "TMA",
      "time machine advice"
  ],
    definition: `A reflective exercise where you imagine your past self and future self giving their perspectives on your current situation. The past self offers a reminder of where you came from, and the future self gives guidance looking back with wisdom.`,
    sources: [],
    categories: [
      "self-reflection",
      "planning"
  ],
    tags: [
      "type:pattern",
      "topic:future-self",
      "topic:reflection",
      "level:beginner",
      "use:life-choices",
      "use:personal-growth",
      "use:perspective",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:past self (age or year, optional)",
      "field:current situation or problem"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: gain wisdom on a current challenge by imagining advice from your younger and older self • practice self-compassion by viewing your situation through the eyes of a past you and a future you • clarify your next steps by hearing what your hopeful future self would tell you to do
  Boosters: Visualize your past self vividly (age, surroundings, mindset) to ground their voice. Do the same for your future self at, say, 20 years from now. Have the future self focus on encouragement and long-term perspective, while the past self might offer innocence or fundamental values you had.`
  },
  {
    slug: "trigger-storming",
    term: "Trigger Storming",
    aliases: [
      "Trigger Storming — Prompt-based brainstorming",
      "Trigger Storming",
      "TS",
      "trigger storming"
  ],
    definition: `A brainstorming method where you use specific prompts or "triggers" – such as open-ended sentences or abstract statements – to inspire new thoughts:contentReference[oaicite:10]{index=10}. The triggers are designed to provoke or challenge assumptions, helping the group or individual break out of conventional ideas.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:technique",
      "topic:prompts",
      "use:brainstorm",
      "level:intermediate",
      "type:template",
      "kind:technique",
      "has:boosters",
      "field:problem or topic",
      "field:custom triggers (optional, one per line)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: spark discussion with provocative prompts • generate ideas from abstract or incomplete statements
  Boosters: Use unusual or even provocative triggers to jolt thinking in new directions:contentReference[oaicite:9]{index=9}. Build on whatever associations the trigger evokes, no matter how tangential or odd they seem.`
  },
  {
    slug: "value-effort-matrix",
    term: "Value vs. Effort",
    aliases: [
      "Value vs. Effort — 2×2 Quick Wins Matrix",
      "Value vs. Effort",
      "VE",
      "value vs. effort"
  ],
    definition: `Plot backlog items on High/Low Value vs. High/Low Effort. Prioritize Quick Wins.`,
    sources: [],
    categories: [
      "prioritization",
      "workshops",
      "product management"
  ],
    tags: [
      "type:framework",
      "topic:matrix",
      "use:stakeholder-workshop",
      "use:portfolio-triage",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:items (one per line)",
      "field:scale hint (optional)",
      "field:notes (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: visualize trade-offs • identify quick wins • kill time sinks
  Boosters: Sort final list by “Quick Wins” first.`
  },
  {
    slug: "what-if-scenarios",
    term: "What If",
    aliases: [
      "What If — Scenario reframing questions",
      "What If",
      "WI",
      "what if"
  ],
    definition: `A technique of reframing problems by asking "What if...?" questions that introduce new scenarios or constraints:contentReference[oaicite:12]{index=12}. By imagining how the issue would look under different circumstances (e.g., different people, times, or rules), you gain fresh perspectives that can lead to innovative solutions.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:technique",
      "topic:reframing",
      "use:brainstorm",
      "level:beginner",
      "type:template",
      "kind:technique",
      "has:boosters",
      "field:problem or topic",
      "field:what-if scenario (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: reframe a problem by changing context or constraints • explore alternative outcomes or perspectives
  Boosters: Pose wild "what if" questions beyond realistic bounds to expand thinking:contentReference[oaicite:11]{index=11}. After exploring an imagined scenario, extract any ideas that could be applied (even partially) to the real situation.`
  },
  {
    slug: "wishing-technique",
    term: "Wishing",
    aliases: [
      "Wishing — Imagine ideal solutions",
      "Wishing",
      "wishing"
  ],
    definition: `An ideation method where you freely wish for the perfect or even impossible solutions to a problem:contentReference[oaicite:5]{index=5}. By articulating “magic wand” wishes without restraint, you can then work backward to figure out how to incorporate aspects of those ideal solutions into practical reality:contentReference[oaicite:6]{index=6}.`,
    sources: [],
    categories: [
      "creativity",
      "ideation"
  ],
    tags: [
      "type:technique",
      "topic:ideation",
      "use:brainstorm",
      "level:beginner",
      "type:template",
      "kind:pattern",
      "has:boosters",
      "field:problem or goal"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: think beyond realistic constraints • identify features of an ideal outcome
  Boosters: Encourage even absurd or impossible wishes; they can spark real ideas:contentReference[oaicite:4]{index=4}. After listing wishes, examine each to find elements you *can* actually implement.`
  },
  {
    slug: "wsjf-weighted-shortest-job-first",
    term: "WSJF",
    aliases: [
      "WSJF — (Business Value + Time Criticality + Risk Reduction) ÷ Job Size",
      "WSJF",
      "wsjf"
  ],
    definition: `WSJF prioritizes by Cost of Delay over Job Size. CoD ≈ Business Value + Time Criticality + Risk Reduction.`,
    sources: [],
    categories: [
      "agile",
      "prioritization",
      "safe"
  ],
    tags: [
      "type:framework",
      "topic:wsjf",
      "use:program-increment",
      "use:flow-optimization",
      "type:template",
      "kind:framework",
      "has:boosters",
      "field:job / feature",
      "field:business value",
      "field:time criticality",
      "field:risk reduction / opportunity enablement",
      "field:job size",
      "field:notes (optional)"
  ],
    related: [],
    status: "draft",
    notes: `Use-cases: maximize economic throughput • PI planning in SAFe
  Boosters: Call out assumptions; avoid gaming Job Size.`
  }

);


/* --------------------------------------------------
   Vibe Glossary – Indexers, Search, & UI Adapters
   --------------------------------------------------
   Paste this block at the BOTTOM of glossary.data.js,
   after all GLOSSARY.push(...) calls.
*/
(function finalizeGlossary(global) {
  const G = global.GLOSSARY || [];
  const { toSlug, uniq } = global.__VIBE_GLOSSARY_UTILS__ || {
    toSlug: (s) => String(s || "").trim().toLowerCase().replace(/[\s_/]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-"),
    uniq: (a) => Array.from(new Set((a || []).filter(Boolean)))
  };

  // ---------- Light validation & dedupe ----------
  const seenSlugs = new Set();
  const ERRORS = [];
  for (const entry of G) {
    if (!entry.slug) ERRORS.push(`Missing slug for term "${entry.term}"`);
    if (seenSlugs.has(entry.slug)) {
      ERRORS.push(`Duplicate slug detected: "${entry.slug}"`);
    } else {
      seenSlugs.add(entry.slug);
    }
  }

  // ---------- Indexes ----------
  const BY_SLUG = Object.create(null);
  const BY_ALIAS = Object.create(null);
  const BY_CATEGORY = Object.create(null);  // category -> Set(slug)
  const BY_TAG = Object.create(null);       // tag -> Set(slug)
  const BACKREFS = Object.create(null);     // slug -> Set(slug) who points to it

  for (const e of G) {
    BY_SLUG[e.slug] = e;

    // Aliases index (as slug-like redirects)
    for (const alias of e.aliases || []) {
      const aliasSlug = toSlug(alias);
      if (!aliasSlug || aliasSlug === e.slug) continue;
      // Store only first canonical mapping; note conflicts
      if (!BY_ALIAS[aliasSlug]) {
        BY_ALIAS[aliasSlug] = e.slug;
      } else if (BY_ALIAS[aliasSlug] !== e.slug) {
        // Alias collision – keep first, log error
        ERRORS.push(`Alias collision "${aliasSlug}" -> ${BY_ALIAS[aliasSlug]} vs ${e.slug}`);
      }
    }

    for (const c of e.categories || []) {
      const key = String(c || "").toLowerCase();
      (BY_CATEGORY[key] ||= new Set()).add(e.slug);
    }

    for (const t of e.tags || []) {
      const key = String(t || "").toLowerCase();
      (BY_TAG[key] ||= new Set()).add(e.slug);
    }

    for (const rel of e.related || []) {
      const r = String(rel || "").toLowerCase();
      (BACKREFS[r] ||= new Set()).add(e.slug);
    }
  }

  // ---------- Redirects ----------
  // Canonical redirects prefer:
  // 1) explicit slug match
  // 2) alias -> canonical
  // 3) fallback: treat term text as slug
  const REDIRECTS = Object.create(null);

  // Map every alias to its canonical slug
  for (const [aliasSlug, canonical] of Object.entries(BY_ALIAS)) {
    REDIRECTS[aliasSlug] = canonical;
  }

  // Also map raw term spellings (slugified) to their canonical slug
  for (const e of G) {
    const termSlug = toSlug(e.term);
    if (termSlug && termSlug !== e.slug) {
      REDIRECTS[termSlug] = e.slug;
    }
    // Map common pluralization: if tag like "aliases" contains variants, they’re already covered
  }



  // ---------- Cross-link helpers ----------
  function resolveSlug(maybeSlugOrTerm) {
    const s = toSlug(maybeSlugOrTerm);
    if (BY_SLUG[s]) return s;
    if (REDIRECTS[s]) return REDIRECTS[s];
    return null;
  }

  function get(slugOrTerm) {
    const s = resolveSlug(slugOrTerm);
    return s ? BY_SLUG[s] : null;
  }

  function related(slugOrTerm, { includeBackrefs = true } = {}) {
    const s = resolveSlug(slugOrTerm);
    if (!s) return [];
    const fwd = (BY_SLUG[s].related || []).map(resolveSlug).filter(Boolean);
    if (!includeBackrefs) return uniq(fwd);
    const back = Array.from(BACKREFS[s] || []);
    return uniq([...fwd, ...back]);
  }

  function inCategory(category) {
    const key = String(category || "").toLowerCase();
    return Array.from(BY_CATEGORY[key] || []);
  }

  function withTag(tag) {
    const key = String(tag || "").toLowerCase();
    return Array.from(BY_TAG[key] || []);
  }

  // ---------- Tiny search (token AND; quoted phrase; field filters) ----------
  // Query grammar:
  //   plain words -> AND match across term/definition/aliases/tags/categories
  //   field:term  -> fields: term, slug, tag, category, status
  //   quotes "..." for phrase match
  // Examples:
  //   "rag reasoning tag:topic:reasoning category:meta-prompt strategies"
  //
  function tokenize(q) {
    const tokens = [];
    const re = /"([^"]+)"|(\S+)/g;
    let m;
    while ((m = re.exec(q))) {
      tokens.push(m[1] || m[2]);
    }
    return tokens;
  }

  function matchField(e, field, value) {
    const v = String(value).toLowerCase();
    switch (field) {
      case "slug": return e.slug.includes(v);
      case "term": return e.term.toLowerCase().includes(v);
      case "status": return String(e.status || "").toLowerCase() === v;
      case "tag":
      case "tags": return (e.tags || []).some(t => String(t).toLowerCase() === v);
      case "category":
      case "categories": return (e.categories || []).some(c => String(c).toLowerCase() === v);
      default: return false;
    }
  }

  function textBlob(e) {
    const srcs = (e.sources || []).map(s => `${s.title} ${s.url}`).join(" ");
    return [
      e.term,
      e.slug,
      (e.aliases || []).join(" "),
      e.definition,
      (e.tags || []).join(" "),
      (e.categories || []).join(" "),
      srcs,
      e.notes || ""
    ].join(" ").toLowerCase();
  }

  const _blobCache = new Map();
  function getBlob(e) {
    if (_blobCache.has(e.slug)) return _blobCache.get(e.slug);
    const blob = textBlob(e);
    _blobCache.set(e.slug, blob);
    return blob;
  }

  function search(query, { limit = 100 } = {}) {
    const q = String(query || "").trim();
    if (!q) return G.slice(0, limit).map(e => e.slug);

    const tokens = tokenize(q);
    const fieldFilters = [];
    const terms = [];

    for (const t of tokens) {
      const m = /^(\w+):(.*)$/.exec(t);
      if (m) {
        fieldFilters.push({ field: m[1].toLowerCase(), value: m[2].trim().toLowerCase() });
      } else {
        terms.push(t.toLowerCase());
      }
    }

    const scored = [];
    for (const e of G) {
      // Field filters (all must pass)
      let fieldsOK = true;
      for (const f of fieldFilters) {
        if (!matchField(e, f.field, f.value)) { fieldsOK = false; break; }
      }
      if (!fieldsOK) continue;

      const blob = getBlob(e);

      // Phrase tokens get higher weight when quoted
      let score = 0;
      for (const t of terms) {
        const isPhrase = /^".*"$/.test(t);
        const needle = isPhrase ? t.slice(1, -1) : t;
        const found = blob.indexOf(needle) >= 0;
        if (!found) { score = -1; break; }
        score += isPhrase ? 3 : 1;
        if (e.slug === needle) score += 5;
        if (e.term.toLowerCase() === needle) score += 4;
      }
      if (score >= 0) scored.push([score, e.slug]);
    }

    scored.sort((a, b) => b[0] - a[0]);
    return scored.slice(0, limit).map(([, slug]) => slug);
  }

  // ---------- Linkifier (optional) ----------
  // Convert [[term]] or [[slug]] in definitions to anchors (deferred binding).
  function linkifyHTML(definitionHTML, makeHref = (slug) => `#/${slug}`) {
    return String(definitionHTML || "").replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
      const s = resolveSlug(inner);
      return s ? `<a href="${makeHref(s)}" data-glossary-link="${s}">${inner}</a>` : inner;
    });
  }

  // ---------- Public API ----------
  const GlossaryAPI = {
    // core data
    all: () => G,
    count: () => G.length,
    errors: () => ERRORS.slice(),

    // lookup
    toSlug,
    resolve: resolveSlug,
    get,
    related,
    inCategory,
    withTag,

    // indexes (read-only views)
    BY_SLUG: () => ({ ...BY_SLUG }),
    BY_ALIAS: () => ({ ...BY_ALIAS }),
    BY_CATEGORY: () => Object.fromEntries(Object.entries(BY_CATEGORY).map(([k, v]) => [k, Array.from(v)])),
    BY_TAG: () => Object.fromEntries(Object.entries(BY_TAG).map(([k, v]) => [k, Array.from(v)])),
    REDIRECTS: () => ({ ...REDIRECTS }),

    // search & link
    search,
    linkifyHTML
  };

  // Attach to window for browser apps; support ESM/CommonJS-ish usage
  global.GlossaryAPI = GlossaryAPI;
  try { if (typeof module !== "undefined") module.exports = GlossaryAPI; } catch {}

  // --------- Minimal router glue (optional) ----------
  // If your site uses #/slug routes, this will dispatch a custom event when it changes.
  function emitRoute(slug) {
    const s = GlossaryAPI.resolve(slug);
    const detail = { slug: s, ok: !!s };
    global.dispatchEvent(new CustomEvent("glossary:navigate", { detail }));
  }

  function handleHashChange() {
    const slug = (global.location.hash || "").replace(/^#\/?/, "");
    if (slug) emitRoute(slug);
  }

  // Only attach if running in a browser
  if (typeof window !== "undefined") {
    global.addEventListener("hashchange", handleHashChange);
    // Initial fire for current hash
    handleHashChange();
  }

  // --------- Simple UI helpers (totally optional) ----------
  // Render a list of search hits into a container element.
  global.renderGlossaryList = function renderGlossaryList(container, slugs) {
    const el = typeof container === "string" ? document.querySelector(container) : container;
    if (!el) return;
    const items = (slugs || []).map((s) => {
      const e = GlossaryAPI.get(s);
      if (!e) return "";
      const cats = (e.categories || []).join(", ");
      const tags = (e.tags || []).join(", ");
      return `
        <article class="g-item">
          <h3><a href="#/${e.slug}">${e.term}</a></h3>
          <p class="g-def">${GlossaryAPI.linkifyHTML(e.definition)}</p>
          <p class="g-meta">
            <span class="g-cat">${cats}</span>
            <span class="g-tags">${tags}</span>
          </p>
        </article>`;
    }).join("\n");
    el.innerHTML = items || `<p class="g-empty">No results.</p>`;
  };

  global.navigateToGlossary = function navigateToGlossary(slugOrTerm) {
    const s = GlossaryAPI.resolve(slugOrTerm);
    if (!s) return false;
    location.hash = `#/${s}`;
    return true;
  };

})(typeof window !== "undefined" ? window : globalThis);