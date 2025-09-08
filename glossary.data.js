

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
    aliases: [],
    definition: `Conducting in-depth studies of how people interact with AI systems to improve user experience (UX), trust, and overall efficacy. Includes formative research, usability testing, and behavioral analysis of human–AI collaboration.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:discipline","topic:human-ai","topic:ux","phase:evaluation"],
    related: ["ai-human-technical-communication","artificial-intelligence-ai"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ai-human-technical-communication",
    term: "AI-Human Technical Communication",
    aliases: [],
    definition: `Translating complex AI concepts and system behavior into language and structures accessible to both LLMs and diverse human audiences (including non-technical stakeholders). Covers documentation, prompt specs, and decision/rationale narratives.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:discipline","topic:communication","topic:human-ai","phase:ideation"],
    related: ["ai-human-research-and-analysis","prompt-engineering-and-development"],
    status: "verified",
    notes: ""
  },
  {
    slug: "alignment",
    term: "Alignment",
    aliases: [],
    definition: `The degree and process of steering an AI system to better reflect human preferences, values, and constraints (e.g., safety, helpfulness). Encompasses preference learning, instruction tuning, policy design, and evaluation.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:concept","topic:safety","topic:llm","phase:evaluation"],
    related: ["artificial-intelligence-ai","artificial-general-intelligence-agi","artificial-superintelligence-asi"],
    status: "verified",
    notes: ""
  },
  {
    slug: "architecture",
    term: "Architecture",
    aliases: [],
    definition: `The structural design of a system or process—its components, parameters, and their relationships/operations—independent of specific parameter values.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:concept","topic:systems"],
    related: ["prompt-engineering-and-development","prompt-architect"],
    status: "verified",
    notes: ""
  },
  {
    slug: "artificial-intelligence-ai",
    term: "Artificial Intelligence (AI)",
    aliases: ["ai"],
    definition: `A field of techniques for creating systems that perform tasks requiring forms of perception, reasoning, or decision-making; also used to refer to specific systems that simulate aspects of human cognition.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:concept","topic:llm"],
    related: ["artificial-general-intelligence-agi","artificial-narrow-intelligence-ani","artificial-superintelligence-asi","generative-ai"],
    status: "verified",
    notes: ""
  },
  {
    slug: "artificial-general-intelligence-agi",
    term: "Artificial General Intelligence",
    aliases: ["agi","strong ai"],
    definition: `Hypothetical AI with the ability to learn, reason, and apply knowledge broadly across domains, at least as well as a human.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:concept","topic:llm"],
    related: ["artificial-intelligence-ai","artificial-superintelligence-asi","artificial-narrow-intelligence-ani","alignment"],
    status: "verified",
    notes: ""
  },
  {
    slug: "artificial-narrow-intelligence-ani",
    term: "Artificial Narrow Intelligence",
    aliases: ["ani","weak ai"],
    definition: `AI systems specialized for specific tasks or domains (the predominant form of AI in practical use).`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:concept","topic:llm"],
    related: ["artificial-intelligence-ai","artificial-general-intelligence-agi"],
    status: "verified",
    notes: ""
  },
  {
    slug: "artificial-superintelligence-asi",
    term: "Artificial Superintelligence",
    aliases: ["asi"],
    definition: `A speculative form of AI that would surpass human capabilities across fields, including scientific creativity, general wisdom, and social skills.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:concept","topic:llm"],
    related: ["artificial-general-intelligence-agi","alignment"],
    status: "verified",
    notes: ""
  },
  {
    slug: "generative-ai",
    term: "Generative AI",
    aliases: ["genai","generative artificial intelligence"],
    definition: `AI systems designed to generate content (text, images, audio, video, code) by modeling data distributions and sampling from them under guidance (e.g., prompts or conditions).`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:concept","topic:generative","topic:llm","phase:prompting"],
    related: ["artificial-intelligence-ai","prompt-engineering-and-development"],
    status: "verified",
    notes: ""
  },
  {
    slug: "human-and-ai-behavior",
    term: "Human and AI Behavior",
    aliases: [],
    definition: `A lens for translating human needs and nuances into AI-amenable structures—and interpreting AI capabilities/limits into actionable, user-friendly experiences.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:discipline","topic:human-ai","topic:ux","phase:ideation"],
    related: ["ai-human-research-and-analysis","ai-human-technical-communication"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-engineering-and-development",
    term: "Prompt Engineering and Development",
    aliases: ["prompt engineering","prompt design","prompt development"],
    definition: `Designing, refining, and systematizing prompts, guardrails, and evaluation loops to guide AI behavior—maximizing desired outcomes while mitigating failure modes.`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:discipline","topic:prompting","phase:prompting"],
    related: ["prompt-architect","architecture","generative-ai"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-architect",
    term: "Prompt Architect",
    aliases: [],
    definition: `A role that extends “prompt engineering” into product/system design—framing behaviors, structures, and UX for prompt-driven systems by blending technical and humanistic disciplines (e.g., linguistics, psychology, philosophy).`,
    sources: [],
    categories: ["overarching"],
    tags: ["type:role","topic:prompting","phase:ideation"],
    related: ["prompt-engineering-and-development","architecture"],
    status: "verified",
    notes: ""
  },
  {
    slug: "waves-of-ai-prompting-evolutions",
    term: "Waves of AI Prompting Evolutions",
    aliases: ["three waves of ai","darpa three waves"],
    definition: `A three-phase view of AI progress:  
1) **Rule-based systems** with handcrafted knowledge;  
2) **Statistical learning** (e.g., neural networks) that improves from data but has opaque reasoning;  
3) **Contextual adaptation**, fusing structured knowledge with learning to reason within context and act as trusted assistants.`,
    sources: [
      { title: "Futurism overview", url: "https://futurism.com/artificial-intelligence-tech-will-arrive-in-three-waves" },
      { title: "A DARPA Perspective on AI", url: "https://machinelearning.technicacuriosa.com/2017/03/19/a-darpa-perspective-on-artificial-intelligence/" }
    ],
    categories: ["overarching"],
    tags: ["type:concept","topic:llm","phase:ideation"],
    related: ["artificial-intelligence-ai"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  {
    slug: "prompt-architecture",
    term: "Prompt Architecture",
    aliases: ["virtual brain"],
    definition: `The specific arrangement and connections of prompts, strategies, and evaluation loops that produce consistent, modular behavior across tasks.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:prompting"],
    related: ["prompt-engineering-and-development","architecture","generative-ai","prompt-architect"],
    status: "verified",
    notes: ""
  },
  {
    slug: "clear-path-forward-framework",
    term: "CLEAR Path Forward Framework",
    aliases: [],
    definition: `An AI prompt-literacy framework: **Concise**, **Logical**, **Explicit**, **Adaptive**, **Reflective**—aimed at structuring effective, iterative interactions.`,
    sources: [
      { title: "ScienceDirect (Computers & Education)", url: "https://www.sciencedirect.com/science/article/abs/pii/S0099133323000599" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:ideation"],
    related: ["raccca-framework","rubric-approach"],
    status: "verified",
    notes: ""
  },
  {
    slug: "clear-prompting-method",
    term: "CLEAR Prompting Method",
    aliases: [],
    definition: `A prompting checklist: **Clarity**, **Length**, **Empathy**, **Actionability**, **Relevance**—to improve instruction quality and fit.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:prompting"],
    related: ["clear-path-forward-framework","rubric-approach"],
    status: "verified",
    notes: "Needs source"
  },
  {
    slug: "clear-framework",
    term: "CLEAR Framework",
    aliases: [],
    definition: `A problem-framing tool: **Challenge**, **Limitation**, **Effect**, **Action**, **Result**—used to outline issues, constraints, and a path to outcomes.`,
    sources: [
      { title: "LinkedIn article", url: "https://www.linkedin.com/pulse/demystifying-prompt-engineering-unveiling-art-behind-effective" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:ideation"],
    related: ["par-method","star-technique","aida-model","swot-analysis"],
    status: "verified",
    notes: ""
  },
  {
    slug: "swot-analysis",
    term: "SWOT Analysis",
    aliases: [],
    definition: `Strategic analysis of **Strengths**, **Weaknesses**, **Opportunities**, **Threats**—useful for scoping prompts, projects, or product bets.`,
    sources: [
      { title: "MindTools SWOT overview", url: "https://www.mindtools.com/amtbj63/swot-analysis" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:ideation"],
    related: ["aida-model","par-method","star-technique","clear-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "par-method",
    term: "PAR Method",
    aliases: [],
    definition: `Narrative structure for results: **Problem** → **Action** → **Result**—helps specify tasks and demonstrate impact.`,
    sources: [
      { title: "Indeed: PAR Method", url: "https://www.indeed.com/career-advice/interviewing/par-method" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:prompting"],
    related: ["star-technique","clear-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "aida-model",
    term: "AIDA Model",
    aliases: [],
    definition: `Marketing flow: **Attention** → **Interest** → **Desire** → **Action**—useful for persuasive prompts and content planning.`,
    sources: [
      { title: "Siege Media: AIDA", url: "https://www.siegemedia.com/creation/aida-model" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:ideation"],
    related: ["swot-analysis","par-method"],
    status: "verified",
    notes: ""
  },
  {
    slug: "star-technique",
    term: "STAR Technique",
    aliases: [],
    definition: `Response structure: **Situation**, **Task**, **Action**, **Result**—useful for clarifying context and expected outcomes in prompts.`,
    sources: [
      { title: "The Muse: STAR method", url: "https://www.themuse.com/advice/star-interview-method" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:prompting"],
    related: ["par-method","clear-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "peas-framework",
    term: "PEAS Framework",
    aliases: [],
    definition: `AI task spec: **Performance measure**, **Environment**, **Actuators**, **Sensors**—describes agents and evaluation environment.`,
    sources: [
      { title: "Analytics Vidhya: PEAS", url: "https://www.analyticsvidhya.com/blog/2022/08/simplifying-ai-models-with-the-peas-representation-system" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:llm","phase:ideation"],
    related: ["alignment","architecture"],
    status: "verified",
    notes: ""
  },
  {
    slug: "rtf-framework",
    term: "RTF Framework",
    aliases: ["role-task-format"],
    definition: `Prompt pattern: **Role** (who the model is), **Task** (what to do), **Format** (how to respond). A general-purpose scaffold for most requests.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:pattern","topic:prompting","phase:prompting"],
    related: ["risen-framework","ratio-framework","rodes-framework","costar-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "risen-framework",
    term: "RISEN Framework",
    aliases: [],
    definition: `Prompt scaffold for complex tasks: **Role**, **Instructions**, **Steps**, **End goal**, **Narrowing** (focus).`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:pattern","topic:prompting","phase:prompting"],
    related: ["rtf-framework","costar-framework","rodes-framework","ratio-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ratio-framework",
    term: "RATIO Framework",
    aliases: [],
    definition: `Prompt elements: **ROLE**, **AUDIENCE**, **TASK**, **INSTRUCTIONS**, **OUTPUT**—centers audience and deliverable shape.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:pattern","topic:prompting","phase:prompting"],
    related: ["rtf-framework","risen-framework","rodes-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "rodes-framework",
    term: "RODES Framework",
    aliases: [],
    definition: `Prompt elements: **Role**, **Objective**, **Details**, **Examples**, **Sense Check**—useful when you have good exemplars.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:pattern","topic:prompting","phase:prompting"],
    related: ["ratio-framework","rtf-framework","costar-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "costar-framework",
    term: "COSTAR Framework",
    aliases: [],
    definition: `Prompt fields: **Context**, **Objective**, **Style**, **Tone**, **Audience**, **Response** (format). Guides the model to target content and structure.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:pattern","topic:prompting","phase:prompting"],
    related: ["rtf-framework","risen-framework","ratio-framework","rodes-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "golden-circle-framework",
    term: "Golden Circle Framework",
    aliases: ["what-why-how"],
    definition: `Purpose-first framing: **WHY** → **HOW** → **WHAT** (or variants). Useful for mission, messaging, and prompt framing.`,
    sources: [
      { title: "Business Model Ideas", url: "https://www.businessmodelideas.com/blog/why-how-what-the-golden-circle-as-a-leadership-tool" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:prompting","phase:ideation"],
    related: ["aida-model","swot-analysis"],
    status: "verified",
    notes: ""
  },
  {
    slug: "rubric-approach",
    term: "Rubric Approach",
    aliases: [],
    definition: `Guiding or evaluating an AI with predefined criteria and standards. Often paired with exemplars and scoring guidelines.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:technique","topic:evaluation","phase:evaluation"],
    related: ["raccca-framework","prompt-fine-tuning"],
    status: "verified",
    notes: "Needs source"
  },
  {
    slug: "prompt-template-engineering",
    term: "Prompt Template Engineering",
    aliases: [],
    definition: `Designing reusable prompt templates/functions to improve task performance and consistency.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique","topic:prompting","phase:prompting"],
    related: ["manual-template-engineering","automated-template-learning"],
    status: "verified",
    notes: ""
  },
  {
    slug: "manual-template-engineering",
    term: "Manual Template Engineering",
    aliases: [],
    definition: `Creating intuitive templates through human introspection and expert iteration.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique","topic:prompting","phase:prompting"],
    related: ["prompt-template-engineering","automated-template-learning"],
    status: "verified",
    notes: ""
  },
  {
    slug: "automated-template-learning",
    term: "Automated Template Learning",
    aliases: [],
    definition: `Using search/optimization to discover high-performing prompts or templates automatically.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:technique","topic:prompting","phase:prompting"],
    related: ["prompt-template-engineering","manual-template-engineering"],
    status: "verified",
    notes: ""
  },
  {
    slug: "raccca-framework",
    term: "RACCCA Framework",
    aliases: [],
    definition: `Output quality lens: **Relevance**, **Accuracy**, **Completeness**, **Clarity**, **Coherence**, **Appropriateness**—helpful for review and self-critique.`,
    sources: [
      { title: "Andrew Maynard: Intro to Prompt Engineering", url: "https://andrewmaynard.net/an-introduction-to-basic-prompt-engineering-with-chatgpt/" }
    ],
    categories: ["prompt development techniques"],
    tags: ["type:framework","topic:evaluation","phase:evaluation"],
    related: ["rubric-approach","clear-path-forward-framework"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-fine-tuning",
    term: "Prompt Fine-Tuning",
    aliases: ["iterative prompting"],
    definition: `Making small, targeted adjustments (constraints, examples, formatting, steps) to improve output quality.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:technique","topic:prompting","phase:debugging"],
    related: ["raccca-framework","rubric-approach"],
    status: "verified",
    notes: ""
  },
  {
    slug: "clarity-and-precision",
    term: "Clarity and Precision",
    aliases: [],
    definition: `Explicit, unambiguous instructions improve tokenization alignment and reduce misinterpretation—leading to more relevant outputs.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:principle","topic:prompting","phase:prompting"],
    related: ["desired-format","verbosity-control","contextual-information"],
    status: "verified",
    notes: ""
  },
  {
    slug: "contextual-information",
    term: "Contextual Information",
    aliases: [],
    definition: `Providing background, constraints, and examples to anchor the model’s understanding and improve fit to the situation.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:principle","topic:prompting","phase:prompting"],
    related: ["clarity-and-precision","scaffolding"],
    status: "verified",
    notes: ""
  },
  {
    slug: "desired-format",
    term: "Desired Format",
    aliases: [],
    definition: `Specifying schemas, sections, or output types (e.g., JSON, table, bullet list) to match expectations and downstream consumption.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:principle","topic:prompting","phase:prompting"],
    related: ["verbosity-control","clarity-and-precision"],
    status: "verified",
    notes: ""
  },
  {
    slug: "verbosity-control",
    term: "Verbosity Control",
    aliases: [],
    definition: `Controlling response length and detail (brief, concise, elaborate) to suit the task and cognitive load.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:principle","topic:prompting","phase:prompting"],
    related: ["desired-format","clarity-and-precision"],
    status: "verified",
    notes: ""
  },
  {
    slug: "scaffolding",
    term: "Scaffolding",
    aliases: ["decomposition","stepwise prompting"],
    definition: `Breaking complex tasks into smaller, ordered instructions to maintain focus, reduce error, and enable self-checking.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["fallback-pattern","contextual-information"],
    status: "verified",
    notes: ""
  },
  {
    slug: "fallback-pattern",
    term: "Fallback Pattern",
    aliases: [],
    definition: `Including contingency steps (e.g., try alt method, ask a clarifying question, reduce scope) when the primary approach fails or confidence is low.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:pattern","topic:prompting","phase:debugging"],
    related: ["scaffolding","prompt-fine-tuning"],
    status: "verified",
    notes: ""
  },
  {
    slug: "easy-for-you-easy-for-it",
    term: "Easy for You, Easy for It",
    aliases: [],
    definition: `Heuristic: if a request is hard for a person to do in one pass, use layered outputs or multi-prompt strategies.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:principle","topic:prompting","phase:ideation"],
    related: ["scaffolding","fallback-pattern"],
    status: "verified",
    notes: ""
  },
  {
    slug: "put-smart-get-smart",
    term: "Put Smart, Get Smart",
    aliases: [],
    definition: `Heuristic: well-structured, specific prompts generally yield higher-quality outputs.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:principle","topic:prompting","phase:prompting"],
    related: ["clarity-and-precision","desired-format"],
    status: "verified",
    notes: ""
  },
  {
    slug: "the-divergent-intern",
    term: "The Divergent Intern",
    aliases: [],
    definition: `A humanizing mental model: treat the AI like a bright but divergent intern—explain the **why**, provide context, and check work.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:metaphor","topic:prompting","phase:ideation"],
    related: ["the-collaborative-partner","the-10000-experts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "the-collaborative-partner",
    term: "The Collaborative Partner",
    aliases: [],
    definition: `A mental model emphasizing back-and-forth iteration—prompting as a dialogue, not a one-way command.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:metaphor","topic:prompting","phase:ideation"],
    related: ["the-divergent-intern","the-10000-experts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "the-10000-experts",
    term: "The 10,000 Experts",
    aliases: ["ten-thousand-experts","10000-experts"],
    definition: `A metaphor: think of the model as a room full of experts—be explicit about **which** expert (persona) you want.`,
    sources: [],
    categories: ["prompt development techniques"],
    tags: ["type:metaphor","topic:prompting","phase:ideation"],
    related: ["the-collaborative-partner","the-divergent-intern","rtf-framework","ratio-framework"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  {
    slug: "composition",
    term: "Composition",
    aliases: [],
    definition: `The elements of a prompt architecture—such as guiding questions, contextual info, and explicit instructions—that combine to shape model behavior.`,
    sources: [],
    categories: ["prompt architecture"],
    tags: ["type:component","topic:prompting","phase:prompting"],
    related: ["sequence","contextual-cues","master-prompts","prompt-architecture"],
    status: "verified",
    notes: ""
  },
  {
    slug: "sequence",
    term: "Sequence",
    aliases: [],
    definition: `The ordering of elements or prompts within a prompt architecture, which affects how the model interprets and prioritizes information.`,
    sources: [],
    categories: ["prompt architecture"],
    tags: ["type:component","topic:prompting","phase:prompting"],
    related: ["composition","contextual-cues","master-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "contextual-cues",
    term: "Contextual Cues",
    aliases: [],
    definition: `Supplementary information (hints, examples, constraints, metadata) embedded in prompts to steer interpretation and ensure relevance.`,
    sources: [],
    categories: ["prompt architecture"],
    tags: ["type:component","topic:context","phase:prompting"],
    related: ["composition","sequence","master-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "master-prompts",
    term: "Master Prompts",
    aliases: ["overarching prompts"],
    definition: `High-level or persistent prompts that define scope, goals, or role—providing an umbrella of guidance under which sub-prompts operate.`,
    sources: [],
    categories: ["prompt architecture"],
    tags: ["type:component","topic:prompting","phase:prompting"],
    related: ["composition","sequence","contextual-cues","prompt-architecture"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  // --- Art of Prompting ---
  {
    slug: "creativity",
    term: "Creativity",
    aliases: [],
    definition: `Applying innovative thinking, experimentation, and style adaptation in prompt crafting to enhance engagement and output quality.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:principle","topic:prompting","phase:ideation"],
    related: ["intuition","iterative-refinement","personalization-and-adaptation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "intuition",
    term: "Intuition",
    aliases: [],
    definition: `Leveraging observation, tacit knowledge, and experience to apply nuanced strategies that improve AI responses.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:principle","topic:prompting","phase:ideation"],
    related: ["creativity","experiential-knowledge","strategic-thinking"],
    status: "verified",
    notes: ""
  },
  {
    slug: "iterative-refinement",
    term: "Iterative Refinement",
    aliases: ["prompt iteration","iterative prompting"],
    definition: `Process of continuously testing, analyzing, and adjusting prompts based on feedback and performance results.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:technique","topic:prompting","phase:debugging"],
    related: ["creativity","strategic-thinking","prompt-fine-tuning"],
    status: "verified",
    notes: ""
  },
  {
    slug: "personalization-and-adaptation",
    term: "Personalization and Adaptation",
    aliases: ["adaptive prompting","personalized prompting"],
    definition: `Tailoring prompts to individual user preferences, language styles, and needs to create meaningful, customized interactions.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:principle","topic:human-ai","phase:prompting"],
    related: ["creativity","collaboration-and-interdisciplinary-knowledge"],
    status: "verified",
    notes: ""
  },
  {
    slug: "collaboration-and-interdisciplinary-knowledge",
    term: "Collaboration and Interdisciplinary Knowledge",
    aliases: ["interdisciplinary prompting"],
    definition: `Drawing on expertise from multiple domains (e.g., linguistics, psychology, design, philosophy) to craft context-rich, accurate prompts.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:principle","topic:human-ai","phase:ideation"],
    related: ["personalization-and-adaptation","technical-knowledge"],
    status: "verified",
    notes: ""
  },
  {
    slug: "technical-knowledge",
    term: "Technical Knowledge",
    aliases: [],
    definition: `Applying understanding of AI architectures, tokenization, embeddings, and training dynamics to design effective prompts.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:principle","topic:llm","phase:prompting"],
    related: ["experiential-knowledge","strategic-thinking"],
    status: "verified",
    notes: ""
  },
  {
    slug: "experiential-knowledge",
    term: "Experiential Knowledge",
    aliases: [],
    definition: `Leveraging lessons and insights from lived experiences to improve prompt effectiveness and contextual fit.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:principle","topic:human-ai","phase:prompting"],
    related: ["intuition","technical-knowledge"],
    status: "verified",
    notes: ""
  },
  {
    slug: "strategic-thinking",
    term: "Strategic Thinking",
    aliases: [],
    definition: `Deliberate planning and structuring of prompts to achieve specific goals or interaction outcomes.`,
    sources: [],
    categories: ["art of prompting"],
    tags: ["type:principle","topic:prompting","phase:ideation"],
    related: ["iterative-refinement","intuition","creativity"],
    status: "verified",
    notes: ""
  },

  // --- Types of Prompts ---
  {
    slug: "reductive-prompts",
    term: "Reductive Prompts",
    aliases: ["summarization prompts"],
    definition: `Prompts designed to summarize or condense information into shorter forms.`,
    sources: [],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:reduction","phase:prompting"],
    related: ["extractive-prompting","evaluation-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "transformative-prompts",
    term: "Transformative Prompts",
    aliases: ["rewriting prompts"],
    definition: `Prompts that request rewriting, rephrasing, or changing existing content into a new form.`,
    sources: [],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:transformation","phase:prompting"],
    related: ["expansion-prompting","generative-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "generative-prompts",
    term: "Generative Prompts",
    aliases: [],
    definition: `Prompts that instruct the AI to create new content (text, images, ideas, or solutions).`,
    sources: [],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:generative","phase:prompting"],
    related: ["expansion-prompting","evaluation-prompting","transformative-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "extractive-prompting",
    term: "Extractive Prompting",
    aliases: [],
    definition: `A subtype of reductive/transformative prompting where specific pieces of information are isolated or extracted from a larger body of content.`,
    sources: [],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:reduction","phase:prompting"],
    related: ["reductive-prompts","transformative-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "evaluation-prompting",
    term: "Evaluation Prompting",
    aliases: [],
    definition: `A subtype of generative/reductive prompting where content is assessed or critiqued against criteria or standards.`,
    sources: [],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:evaluation","phase:evaluation"],
    related: ["generative-prompts","reductive-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "expansion-prompting",
    term: "Expansion Prompting",
    aliases: [],
    definition: `A subtype of generative/transformative prompting where new material is added or elaborated on top of existing content.`,
    sources: [],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:transformation","phase:prompting"],
    related: ["generative-prompts","transformative-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "discrete-prompts",
    term: "Discrete Prompts",
    aliases: ["hard prompts"],
    definition: `Prompts expressed in natural language templates (human-readable phrases) rather than embeddings.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:prompting","phase:prompting"],
    related: ["continuous-prompts"],
    status: "verified",
    notes: ""
  },
  {
    slug: "continuous-prompts",
    term: "Continuous Prompts",
    aliases: ["soft prompts"],
    definition: `Prompts represented directly in the model’s embedding space (e.g., learned vectors) rather than natural language.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["types of prompts"],
    tags: ["type:prompt","topic:embedding","phase:training"],
    related: ["discrete-prompts"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  // --- Multi-prompt Strategies ---
  {
    slug: "sequential-linear-prompting",
    term: "Sequential (Linear) Prompting",
    aliases: ["linear prompting"],
    definition: `Sending multiple prompts in a sequential or linear order, where each builds upon prior outputs.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:prompting","phase:prompting"],
    related: ["parallel-prompting","multi-step-interactions"],
    status: "verified",
    notes: ""
  },
  {
    slug: "parallel-prompting",
    term: "Parallel Prompting",
    aliases: [],
    definition: `Sending multiple prompts simultaneously in parallel, either in the same input or in side-by-side inputs.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:prompting","phase:prompting"],
    related: ["sequential-linear-prompting","shotgun-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "conditional-prompting",
    term: "Conditional Prompting",
    aliases: [],
    definition: `Triggering specific prompts only when certain conditions or rules are met.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:prompting","phase:prompting"],
    related: ["constraint-prompting","multi-step-interactions"],
    status: "verified",
    notes: ""
  },
  {
    slug: "contextual-prompting",
    term: "Contextual Prompting",
    aliases: ["priming"],
    definition: `Sending a dedicated prompt for fine-tuning or establishing context before delivering the main request.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:context","phase:prompting"],
    related: ["priming-prompt","domain-priming"],
    status: "verified",
    notes: ""
  },
  {
    slug: "constraint-prompting",
    term: "Constraint Prompting",
    aliases: [],
    definition: `Providing prompts with explicit rules or constraints to control or limit output.`,
    sources: [
      { title: "Jonathan Kyle Hobson – Intelligent User Experiences", url: "https://www.linkedin.com/pulse/intelligent-user-experiences-merging-ai-interaction-hobson" }
    ],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:constraints","phase:prompting"],
    related: ["constraint-based-prompting","constraint-application"],
    status: "verified",
    notes: ""
  },
  {
    slug: "multi-shot-strategies",
    term: "Multi-shot Prompting",
    aliases: ["multi-input strategies"],
    definition: `Sending prompts across multiple inputs, often chaining outputs from one prompt as inputs to another.`,
    sources: [],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:prompting","phase:prompting"],
    related: ["sequential-linear-prompting","multi-step-interactions"],
    status: "verified",
    notes: "Needs source"
  },
  {
    slug: "output-layering",
    term: "Output Layering",
    aliases: [],
    definition: `Building upon prior outputs layer by layer to handle complex tasks.`,
    sources: [],
    categories: ["multi-prompt strategies"],
    tags: ["type:technique","topic:prompting","phase:prompting"],
    related: ["multi-step-interactions","sequential-linear-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "shotgun-generation",
    term: "Shotgun Generation",
    aliases: [],
    definition: `Submitting a variety of prompts simultaneously and selecting the best response.`,
    sources: [],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:prompting","phase:prompting"],
    related: ["parallel-prompting","infinite-generation"],
    status: "verified",
    notes: "Needs source"
  },
  {
    slug: "infinite-generation",
    term: "Infinite Generation",
    aliases: [],
    definition: `Designing a stable prompt set reusable across multiple inputs without modification.`,
    sources: [
      { title: "arXiv 2302.11382", url: "https://arxiv.org/abs/2302.11382" }
    ],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:prompting","phase:prompting"],
    related: ["shotgun-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "multi-step-interactions",
    term: "Multi-step Interactions",
    aliases: [],
    definition: `Using a series of back-and-forth prompts and responses to facilitate dynamic, conversational exchanges.`,
    sources: [],
    categories: ["multi-prompt strategies"],
    tags: ["type:strategy","topic:conversation","phase:prompting"],
    related: ["sequential-linear-prompting","output-layering"],
    status: "verified",
    notes: ""
  },

  // --- Meta-Prompt, Multi-input, Fine-tuning Strategies ---
  {
    slug: "self-discover-framework",
    term: "Self-discover Framework",
    aliases: [],
    definition: `Allows the AI to refine or modify its own prompt selection strategy to find the most effective approach.`,
    sources: [
      { title: "arXiv 2402.03620", url: "https://arxiv.org/abs/2402.03620" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:framework","topic:meta","phase:prompting"],
    related: ["meta-prompting","prompt-ensembling"],
    status: "verified",
    notes: ""
  },
  {
    slug: "domain-specific-language-creation",
    term: "Domain-Specific Language (DSL) Creation",
    aliases: ["dsl creation"],
    definition: `Enabling a model to create and use a domain-specific language for structuring concepts and interactions.`,
    sources: [
      { title: "arXiv 2303.07839", url: "https://arxiv.org/abs/2303.07839" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:strategy","topic:meta","phase:training"],
    related: ["few-shot-code-example-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "few-shot-code-example-generation",
    term: "Few-shot Code Example Generation",
    aliases: [],
    definition: `Creating small code examples (e.g., API usage) as demonstrations to teach the model correct application.`,
    sources: [
      { title: "arXiv 2303.07839", url: "https://arxiv.org/abs/2303.07839" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique","topic:code","phase:training"],
    related: ["domain-specific-language-creation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-ensembling",
    term: "Prompt Ensembling",
    aliases: [],
    definition: `Using multiple prompts together and combining results to improve reliability and accuracy.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique","topic:ensemble","phase:training"],
    related: ["prompt-augmentation","prompt-composition"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-augmentation",
    term: "Prompt Augmentation",
    aliases: ["demonstration learning"],
    definition: `Adding answered prompts as demonstrations to strengthen model alignment and task adherence.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique","topic:prompting","phase:training"],
    related: ["prompt-ensembling","prompt-composition"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-composition",
    term: "Prompt Composition",
    aliases: [],
    definition: `Constructing a complex prompt from multiple sub-prompts for modularity and clarity.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique","topic:prompting","phase:prompting"],
    related: ["prompt-decomposition"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-decomposition",
    term: "Prompt Decomposition",
    aliases: [],
    definition: `Breaking down a complex prompt into smaller, simpler sub-prompts.`,
    sources: [
      { title: "ACM (10.1145/3560815)", url: "https://doi.org/10.1145/3560815" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique","topic:prompting","phase:prompting"],
    related: ["prompt-composition","scaffolding"],
    status: "verified",
    notes: ""
  },
  {
    slug: "meta-prompting",
    term: "Meta-Prompting",
    aliases: [],
    definition: `Providing the AI with reasoning models, benchmarks, or knowledge of its own behavior so it can refine its prompting.`,
    sources: [],
    categories: ["meta-prompt strategies"],
    tags: ["type:strategy","topic:meta","phase:prompting"],
    related: ["self-discover-framework","contextual-adjustment"],
    status: "verified",
    notes: ""
  },
  {
    slug: "contextual-adjustment",
    term: "Contextual Adjustment",
    aliases: [],
    definition: `Modifying prompts based on added or shifted context to better reach a desired outcome.`,
    sources: [],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique","topic:context","phase:prompting"],
    related: ["meta-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "bias-mitigation",
    term: "Bias Mitigation or Awareness",
    aliases: ["bias awareness"],
    definition: `Applying strategies to reduce or highlight biases in outputs to promote fairness and inclusivity.`,
    sources: [],
    categories: ["meta-prompt strategies"],
    tags: ["type:strategy","topic:safety","phase:evaluation"],
    related: ["addressing-biases-and-ethical-concerns"],
    status: "verified",
    notes: ""
  },
  {
    slug: "prompt-modification",
    term: "Prompt Modification or Poly-Prompting",
    aliases: ["poly-prompting"],
    definition: `Altering or expanding user prompts (e.g., for inclusivity or bias mitigation) before sending them to the AI system.`,
    sources: [],
    categories: ["meta-prompt strategies"],
    tags: ["type:strategy","topic:prompting","phase:prompting"],
    related: ["bias-mitigation","contextual-adjustment"],
    status: "verified",
    notes: ""
  },
  {
    slug: "temperature-topk-sampling",
    term: "Temperature and Top-k Sampling",
    aliases: [],
    definition: `Adjusting decoding parameters like *temperature* (randomness) or *top-k* (probability cutoff) to control variation in outputs.`,
    sources: [],
    categories: ["meta-prompt strategies"],
    tags: ["type:parameter","topic:training","phase:prompting"],
    related: [],
    status: "verified",
    notes: ""
  },
  {
    slug: "rat-retrieval-augmented-thoughts",
    term: "RAT (Retrieval Augmented Thoughts)",
    aliases: [],
    definition: `Combines RAG with CoT by retrieving relevant information at each reasoning step, ensuring every intermediate step is fact-informed.`,
    sources: [],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique","topic:rag","topic:reasoning","phase:prompting"],
    related: ["reflection-or-reasoning-prompting","system-query"],
    status: "verified",
    notes: ""
  },

  // --- Challenges and Opportunities ---
  {
    slug: "addressing-biases-and-ethical-concerns",
    term: "Addressing Biases and Ethical Concerns",
    aliases: [],
    definition: `Identifying, surfacing, and mitigating biases in AI outputs while embedding fairness and ethical standards.`,
    sources: [],
    categories: ["challenges and opportunities"],
    tags: ["type:challenge","topic:safety","phase:evaluation"],
    related: ["bias-mitigation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "handling-specialized-domains",
    term: "Handling Specialized Domains",
    aliases: [],
    definition: `Improving prompt design for accuracy and safety in specialized fields (e.g., law, medicine) through expert collaboration.`,
    sources: [],
    categories: ["challenges and opportunities"],
    tags: ["type:challenge","topic:domain","phase:prompting"],
    related: ["domain-priming","fact-check-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "adapting-to-evolving-ai-capabilities",
    term: "Adapting to Evolving AI Capabilities",
    aliases: [],
    definition: `Updating and adapting prompt strategies as AI capabilities advance, to ensure continued effectiveness and relevance.`,
    sources: [],
    categories: ["challenges and opportunities"],
    tags: ["type:challenge","topic:prompting","phase:prompting"],
    related: ["meta-prompting","contextual-adjustment"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  // --- Conversational Design ---
  {
    slug: "conversational-design",
    term: "Conversational Design",
    aliases: [],
    definition: `The practice of crafting natural, interactive conversations between people and systems—designing both dialogue flow and the specific language/tone so computers communicate in human-like, goal-directed ways.`,
    sources: [
      { title: "Google: Intro to Conversational Design (YouTube #1)", url: "https://www.youtube.com/watch?v=OV3qmkVuLxk" },
      { title: "Google: Conversational Design (YouTube #2)", url: "https://www.youtube.com/watch?v=vafh50qmWMM" }
    ],
    categories: ["conversational design"],
    tags: ["type:discipline","topic:human-ai","phase:ideation"],
    related: ["interaction-flows","conversational-ui","voice-user-interface-vui","brand-persona","inclusivity-in-conversation-design","ai-human-technical-communication"],
    status: "verified",
    notes: ""
  },
  {
    slug: "socio-linguistics",
    term: "Socio-linguistics",
    aliases: ["sociolinguistics"],
    definition: `A subfield of linguistics that studies how language use varies across social contexts and how social factors shape interpretation.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:foundation","topic:linguistics","phase:ideation"],
    related: ["linguistic-diversity","linguistic-bias","brand-persona"],
    status: "verified",
    notes: ""
  },
  {
    slug: "conversational-repair",
    term: "Conversational Repair",
    aliases: [],
    definition: `Strategies to detect and correct misunderstandings or ambiguities so both parties regain shared understanding.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:technique","topic:conversation","phase:debugging"],
    related: ["ambiguity-reduction","explicit-instruction","escalated-errors"],
    status: "verified",
    notes: ""
  },
  {
    slug: "conversational-ui",
    term: "Conversational UI",
    aliases: [],
    definition: `The visual/interaction layer of chat or voice systems (message layout, affordances, error states, confirmations) that supports dialogue.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:ui","topic:design","phase:implementation"],
    related: ["voice-user-interface-vui","smart-display","voice-forward-device","interaction-flows"],
    status: "verified",
    notes: ""
  },
  {
    slug: "linguistic-diversity",
    term: "Linguistic Diversity",
    aliases: [],
    definition: `Support for multiple languages, dialects, and vernaculars so systems understand and respond inclusively.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:principle","topic:inclusion","phase:ideation"],
    related: ["socio-linguistics","inclusivity-in-conversation-design","linguistic-bias"],
    status: "verified",
    notes: ""
  },
  {
    slug: "interaction-flows",
    term: "Interaction Flows",
    aliases: ["dialogue flows"],
    definition: `The sequence/structure of conversational turns that guide users to complete tasks or goals.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:artifact","topic:conversation","phase:design"],
    related: ["turn-taking","conversational-design","sample-dialogue"],
    status: "verified",
    notes: ""
  },
  {
    slug: "discourse-markers",
    term: "Discourse Markers",
    aliases: [],
    definition: `Words/phrases (e.g., “um,” “well,” “so”) that structure discourse, signal cognition, or manage conversational flow.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:concept","topic:linguistics","phase:ideation"],
    related: ["pauses","turn-taking"],
    status: "verified",
    notes: ""
  },
  {
    slug: "brand-persona",
    term: "Brand Persona",
    aliases: [],
    definition: `A system’s consistent voice and tone that reflect brand values across interactions.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:principle","topic:style","phase:design"],
    related: ["conversational-design","inclusivity-in-conversation-design"],
    status: "verified",
    notes: ""
  },
  {
    slug: "action-driven-conversations",
    term: "Action-Driven Conversations",
    aliases: [],
    definition: `Dialogues structured to lead to specific user actions/outcomes (task completion, configuration, transactions).`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:principle","topic:conversation","phase:design"],
    related: ["interaction-flows","intent","conversational-actions"],
    status: "verified",
    notes: ""
  },
  {
    slug: "linguistic-bias",
    term: "Linguistic Bias",
    aliases: [],
    definition: `The assumption that certain language forms are superior, which can influence design decisions and exclude users.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:risk","topic:safety","phase:evaluation"],
    related: ["inclusivity-in-conversation-design","socio-linguistics","bias-mitigation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "turn-taking",
    term: "Turn-Taking",
    aliases: [],
    definition: `The alternation of speakers in dialogue—core to pacing, interruptions, and multi-party conversations.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:concept","topic:conversation","phase:design"],
    related: ["interaction-flows","pauses"],
    status: "verified",
    notes: ""
  },
  {
    slug: "multimodal-conversation-design",
    term: "Multimodal Conversation Design",
    aliases: [],
    definition: `Designing conversations that combine text, voice, visuals, gestures, or haptics for richer interactions.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:discipline","topic:multimodal","phase:design"],
    related: ["conversational-ui","smart-display","voice-forward-device"],
    status: "verified",
    notes: ""
  },
  {
    slug: "inclusivity-in-conversation-design",
    term: "Inclusivity in Conversation Design",
    aliases: ["inclusive conversation design"],
    definition: `Ensuring conversational systems respect diverse languages, dialects, cultural norms, and accessibility needs.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:principle","topic:inclusion","phase:design"],
    related: ["linguistic-diversity","linguistic-bias","brand-persona"],
    status: "verified",
    notes: ""
  },
  {
    slug: "cooperative-principle",
    term: "Cooperative Principle",
    aliases: [],
    definition: `Grice’s idea that interlocutors generally aim to be informative, truthful, relevant, and clear to make conversation work.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:principle","topic:pragmatics","phase:ideation"],
    related: ["maxim-of-relevance","ambiguity-reduction"],
    status: "verified",
    notes: ""
  },
  {
    slug: "maxim-of-relevance",
    term: "Maxim of Relevance",
    aliases: [],
    definition: `A Gricean maxim: contributions should be relevant to the current topic/context.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:principle","topic:pragmatics","phase:ideation"],
    related: ["cooperative-principle"],
    status: "verified",
    notes: ""
  },
  {
    slug: "sample-dialogue",
    term: "Sample Dialogue",
    aliases: ["sample conversation"],
    definition: `A scripted exchange illustrating how a conversational system should handle a scenario or use case.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:artifact","topic:conversation","phase:design"],
    related: ["interaction-flows","utterance","intent","entity"],
    status: "verified",
    notes: ""
  },
  {
    slug: "ambiguity-of-language",
    term: "Ambiguity of Language",
    aliases: [],
    definition: `Many words/phrases have multiple meanings; interpretation depends on context, culture, and discourse.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:concept","topic:linguistics","phase:ideation"],
    related: ["ambiguity-reduction","conversational-repair"],
    status: "verified",
    notes: ""
  },
  {
    slug: "pauses",
    term: "Pauses",
    aliases: [],
    definition: `Intentional or natural breaks in conversation that signal hesitation, uncertainty, turn transitions, or processing time.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:concept","topic:conversation","phase:design"],
    related: ["turn-taking","discourse-markers"],
    status: "verified",
    notes: ""
  },
  {
    slug: "conversational-actions",
    term: "Conversational Actions",
    aliases: [],
    definition: `Custom voice/chat experiences (e.g., Google Assistant-era “Actions”) that let users invoke services through dialogue.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:artifact","topic:platform","phase:implementation"],
    related: ["voice-user-interface-vui","intent","utterance","entity"],
    status: "verified",
    notes: ""
  },
  {
    slug: "voice-user-interface-vui",
    term: "Voice User Interface (VUI)",
    aliases: ["vui"],
    definition: `Interfaces controlled via speech; users interact using voice commands instead of (or alongside) graphical UI.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:ui","topic:voice","phase:implementation"],
    related: ["smart-display","voice-forward-device","conversational-ui"],
    status: "verified",
    notes: ""
  },
  {
    slug: "smart-display",
    term: "Smart Display",
    aliases: [],
    definition: `Voice-enabled devices with screens that show visual context, confirmations, or media alongside conversational responses.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:device","topic:multimodal","phase:implementation"],
    related: ["voice-user-interface-vui","conversational-ui"],
    status: "verified",
    notes: ""
  },
  {
    slug: "voice-forward-device",
    term: "Voice-forward Device",
    aliases: [],
    definition: `Devices primarily driven by voice input but capable of visual feedback or interactions.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:device","topic:voice","phase:implementation"],
    related: ["voice-user-interface-vui","smart-display"],
    status: "verified",
    notes: ""
  },
  {
    slug: "subvocalization",
    term: "Subvocalization",
    aliases: [],
    definition: `Detection/interpretation of inaudible speech signals (e.g., throat/nerve sensing) to enable silent input.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:technology","topic:voice","phase:research"],
    related: ["silent-speech"],
    status: "verified",
    notes: ""
  },
  {
    slug: "silent-speech",
    term: "Silent Speech",
    aliases: [],
    definition: `Interaction methods that allow communication/commands without audible sound to preserve privacy in public spaces.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:technology","topic:voice","phase:research"],
    related: ["subvocalization"],
    status: "verified",
    notes: ""
  },
  {
    slug: "escalated-errors",
    term: "Escalated Errors",
    aliases: [],
    definition: `A progressive remediation pattern: the system offers increasingly specific prompts or recovery options as confusion persists.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:pattern","topic:ux","phase:debugging"],
    related: ["conversational-repair","ambiguity-reduction"],
    status: "verified",
    notes: ""
  },
  {
    slug: "utterance",
    term: "Utterance",
    aliases: [],
    definition: `A phrase/text a user might say or type to interact with an agent.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:concept","topic:nlu","phase:design"],
    related: ["intent","entity","interaction-model"],
    status: "verified",
    notes: ""
  },
  {
    slug: "intent",
    term: "Intent",
    aliases: [],
    definition: `An action or goal a user wants to achieve; defined by a set of training utterances that trigger it.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:concept","topic:nlu","phase:design"],
    related: ["utterance","entity","interaction-model"],
    status: "verified",
    notes: ""
  },
  {
    slug: "entity",
    term: "Entity",
    aliases: [],
    definition: `A variable slot within an utterance (e.g., date, location) that captures dynamic values supplied by users.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:concept","topic:nlu","phase:design"],
    related: ["utterance","intent","interaction-model"],
    status: "verified",
    notes: ""
  },
  {
    slug: "interaction-model",
    term: "Interaction Model",
    aliases: [],
    definition: `The overall model of a skill/agent: paths, intents, utterances, entities, and rules that define conversation behavior.`,
    sources: [],
    categories: ["conversational design"],
    tags: ["type:artifact","topic:nlu","phase:design"],
    related: ["utterance","intent","entity","interaction-flows"],
    status: "verified",
    notes: ""
  },

  // --- Reasoning Models or Structures ---
  {
    slug: "reasoning-models-or-structures",
    term: "Reasoning Models or Structures",
    aliases: [],
    definition: `Patterns that organize a model’s intermediate reasoning—linear steps, branching search, planning, summarization, decomposition, or code generation.`,
    sources: [
      { title: "Self-Discover (arXiv 2402.03620)", url: "https://arxiv.org/abs/2402.03620" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:category","topic:reasoning","phase:prompting"],
    related: ["chain-of-thought-cot","tree-of-thought-tot","scratchpad-reasoning","question-summarization","question-decomposition","program-generation","plan-and-solve-p-s","least-to-most-ltm","decomposed-prompting"],
    status: "verified",
    notes: ""
  },
  {
    slug: "chain-of-thought-cot",
    term: "Chain of Thought (CoT)",
    aliases: ["cot","chain-of-thought"],
    definition: `A step-by-step reasoning trace that makes intermediate decisions explicit before the final answer.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["least-to-most-ltm","plan-and-solve-p-s","tree-of-thought-tot","scratchpad-reasoning"],
    status: "verified",
    notes: ""
  },
  {
    slug: "tree-of-thought-tot",
    term: "Tree of Thought (ToT)",
    aliases: ["tot","tree-of-thought"],
    definition: `Branching exploration of alternative reasoning paths, allowing backtracking and evaluation of candidate solutions.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["chain-of-thought-cot","plan-and-solve-p-s","least-to-most-ltm"],
    status: "verified",
    notes: ""
  },
  {
    slug: "scratchpad-reasoning",
    term: "Scratchpad Reasoning",
    aliases: [],
    definition: `Externalizing intermediate notes, tables, sketches, or symbolic work to aid systematic reasoning.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["question-decomposition","program-generation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "question-summarization",
    term: "Question Summarization (Cognitive Verifier)",
    aliases: ["cognitive verifier"],
    definition: `Reducing a complex prompt to its core question(s) to improve clarity and alignment.`,
    sources: [
      { title: "arXiv 2302.11382", url: "https://arxiv.org/abs/2302.11382" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:clarity","phase:prompting"],
    related: ["question-decomposition","ambiguity-reduction"],
    status: "verified",
    notes: ""
  },
  {
    slug: "question-decomposition",
    term: "Question Decomposition",
    aliases: [],
    definition: `Breaking a complex prompt into smaller sub-questions to solve incrementally.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["scaffolding","least-to-most-ltm","plan-and-solve-p-s"],
    status: "verified",
    notes: ""
  },
  {
    slug: "program-generation",
    term: "Program Generation",
    aliases: [],
    definition: `Generating code or algorithmic steps as an intermediate tool for reasoning or automation.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:code","phase:prompting"],
    related: ["scratchpad-reasoning","plan-and-solve-p-s"],
    status: "verified",
    notes: ""
  },
  {
    slug: "plan-and-solve-p-s",
    term: "Plan and Solve (P&S)",
    aliases: ["plan-and-solve"],
    definition: `Creating a plan (subgoals/steps) before executing to improve reliability and structure.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["least-to-most-ltm","chain-of-thought-cot","tree-of-thought-tot"],
    status: "verified",
    notes: ""
  },
  {
    slug: "least-to-most-ltm",
    term: "Least to Most (LtM)",
    aliases: ["least-to-most"],
    definition: `Starting with simpler components, progressively tackling more complex parts once groundwork is established.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["plan-and-solve-p-s","question-decomposition"],
    status: "verified",
    notes: ""
  },
  {
    slug: "decomposed-prompting",
    term: "Decomposed Prompting",
    aliases: [],
    definition: `General approach of splitting a task into smaller components to improve accuracy and controllability.`,
    sources: [],
    categories: ["reasoning models or structures"],
    tags: ["type:technique","topic:reasoning","phase:prompting"],
    related: ["question-decomposition","scaffolding"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  // --- Additional Reasoning Models — Logical and Analytical Reasoning ---
  {
    slug: "analogical-reasoning",
    term: "Analogical Reasoning",
    aliases: [],
    definition: `Inferring new knowledge by mapping similarities between two situations or domains.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:reasoning","phase:ideation"],
    related: ["abductive-reasoning","inductive-reasoning","narrative-reasoning"],
    status: "verified",
    notes: "Common in design, psychology, creative work."
  },
  {
    slug: "counterfactual-reasoning",
    term: "Counterfactual Reasoning",
    aliases: [],
    definition: `Considering alternative realities—what would happen if antecedent conditions were different—to test causal hypotheses or plans.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:reasoning","phase:ideation"],
    related: ["causal-reasoning","probabilistic-reasoning"],
    status: "verified",
    notes: "Used in philosophy, psychology, strategic planning."
  },
  {
    slug: "narrative-reasoning",
    term: "Narrative Reasoning",
    aliases: [],
    definition: `Building and interpreting stories to make sense of events, motives, and outcomes.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:reasoning","phase:ideation"],
    related: ["analogical-reasoning","holistic-reasoning"],
    status: "verified",
    notes: "Applied in literature, history, therapy, branding."
  },
  {
    slug: "holistic-reasoning",
    term: "Holistic Reasoning",
    aliases: [],
    definition: `Viewing problems as interconnected wholes, emphasizing relationships over isolated parts.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:systems","phase:ideation"],
    related: ["systems-thinking","ecological-reasoning"],
    status: "verified",
    notes: "Used in global thinking, management, environmental analysis."
  },
  {
    slug: "intuitive-reasoning",
    term: "Intuitive Reasoning",
    aliases: [],
    definition: `Making judgments rapidly without explicit stepwise logic, grounded in tacit expertise.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:heuristics","phase:ideation"],
    related: ["experiential-reasoning","reflective-reasoning"],
    status: "verified",
    notes: "Seen in creative arts, emergency response, leadership."
  },
  {
    slug: "deductive-reasoning",
    term: "Deductive Reasoning",
    aliases: [],
    definition: `Deriving specific conclusions from general premises; validity depends on logical form.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:logic","phase:prompting"],
    related: ["syllogistic-reasoning","inductive-reasoning","abductive-reasoning"],
    status: "verified",
    notes: "Used in mathematics, logic, programming."
  },
  {
    slug: "inductive-reasoning",
    term: "Inductive Reasoning",
    aliases: [],
    definition: `Generalizing from specific observations to broader rules or trends; conclusions are probabilistic.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:inference","phase:prompting"],
    related: ["probabilistic-reasoning","abductive-reasoning","deductive-reasoning"],
    status: "verified",
    notes: "Common in science, sociology, market analysis."
  },
  {
    slug: "abductive-reasoning",
    term: "Abductive Reasoning",
    aliases: [],
    definition: `Forming the most plausible hypothesis to explain observations (inference to the best explanation).`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:hypotheses","phase:prompting"],
    related: ["inductive-reasoning","deductive-reasoning","counterfactual-reasoning"],
    status: "verified",
    notes: "Used in diagnostics, detective work, AI."
  },
  {
    slug: "syllogistic-reasoning",
    term: "Syllogistic Reasoning",
    aliases: ["syllogism"],
    definition: `A deductive form combining major and minor premises to reach a conclusion.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:logic","phase:prompting"],
    related: ["deductive-reasoning"],
    status: "verified",
    notes: "Applied in logic, philosophy, mathematics."
  },
  {
    slug: "probabilistic-reasoning",
    term: "Probabilistic Reasoning",
    aliases: [],
    definition: `Reasoning with uncertainty using probabilities to guide inference and decisions.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:statistics","phase:prompting"],
    related: ["inductive-reasoning","counterfactual-reasoning","computational-reasoning"],
    status: "verified",
    notes: "Used in risk analysis, statistics, AI."
  },
  {
    slug: "computational-reasoning",
    term: "Computational Reasoning",
    aliases: [],
    definition: `Applying algorithmic and data-structural thinking to solve problems and reason about processes.`,
    sources: [],
    categories: ["additional reasoning models","logical and analytical reasoning"],
    tags: ["type:reasoning","topic:computing","phase:prompting"],
    related: ["computational-thinking","program-generation"],
    status: "verified",
    notes: "Common in CS and data analysis."
  },

  // --- Additional Reasoning Models — Scientific and Empirical Reasoning ---
  {
    slug: "causal-reasoning",
    term: "Causal Reasoning",
    aliases: [],
    definition: `Identifying and validating cause–effect relationships to explain or predict outcomes.`,
    sources: [],
    categories: ["additional reasoning models","scientific and empirical reasoning"],
    tags: ["type:reasoning","topic:causality","phase:prompting"],
    related: ["counterfactual-reasoning","probabilistic-reasoning","systems-thinking"],
    status: "verified",
    notes: "Used in science, history, law, medicine."
  },
  {
    slug: "systems-thinking",
    term: "Systems Thinking",
    aliases: [],
    definition: `Understanding complex systems via interactions, feedback loops, and emergent behavior.`,
    sources: [],
    categories: ["additional reasoning models","scientific and empirical reasoning","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:systems","phase:ideation"],
    related: ["holistic-reasoning","complex-adaptive-systems-cas-thinking","critical-systems-thinking-cst"],
    status: "verified",
    notes: "Used in management, environmental analysis, policy design."
  },
  {
    slug: "ecological-reasoning",
    term: "Ecological Reasoning",
    aliases: [],
    definition: `Reasoning grounded in ecological relationships, constraints, and dynamics.`,
    sources: [],
    categories: ["additional reasoning models","scientific and empirical reasoning","social and ethical reasoning"],
    tags: ["type:reasoning","topic:environment","phase:ideation"],
    related: ["systems-thinking","holistic-reasoning"],
    status: "verified",
    notes: "Used in environmental science and sustainability planning."
  },
  {
    slug: "evolutionary-reasoning",
    term: "Evolutionary Reasoning",
    aliases: [],
    definition: `Explaining or predicting behavior using evolutionary principles (e.g., selection, adaptation, fitness).`,
    sources: [],
    categories: ["additional reasoning models","scientific and empirical reasoning"],
    tags: ["type:reasoning","topic:biology","phase:ideation"],
    related: ["causal-reasoning","probabilistic-reasoning"],
    status: "verified",
    notes: "Applied in biology, anthropology, behavioral econ."
  },
  {
    slug: "experiential-reasoning",
    term: "Experiential Reasoning",
    aliases: [],
    definition: `Using first-hand experiences and observations to inform judgments and decisions.`,
    sources: [],
    categories: ["additional reasoning models","scientific and empirical reasoning"],
    tags: ["type:reasoning","topic:experience","phase:prompting"],
    related: ["intuitive-reasoning","reflective-reasoning","reflective-practice"],
    status: "verified",
    notes: "Seen in clinical work, diagnosis, arts."
  },

  // --- Additional Reasoning Models — Temporal and Spatial Reasoning ---
  {
    slug: "spatial-reasoning",
    term: "Spatial Reasoning",
    aliases: [],
    definition: `Understanding spatial relations among objects and mentally transforming shapes and layouts.`,
    sources: [],
    categories: ["additional reasoning models","temporal and spatial reasoning"],
    tags: ["type:reasoning","topic:spatial","phase:prompting"],
    related: ["computational-reasoning","program-generation"],
    status: "verified",
    notes: "Used in architecture, engineering, navigation."
  },
  {
    slug: "temporal-reasoning",
    term: "Temporal Reasoning",
    aliases: [],
    definition: `Reasoning about time, event order, duration, and temporal dependencies.`,
    sources: [],
    categories: ["additional reasoning models","temporal and spatial reasoning"],
    tags: ["type:reasoning","topic:time","phase:prompting"],
    related: ["plan-and-solve-p-s","least-to-most-ltm"],
    status: "verified",
    notes: "Used in history, planning, project management."
  },

  // --- Additional Reasoning Models — Social and Ethical Reasoning ---
  {
    slug: "normative-reasoning",
    term: "Normative Reasoning",
    aliases: [],
    definition: `Evaluating actions or policies against moral principles or norms to judge rightness/wrongness.`,
    sources: [],
    categories: ["additional reasoning models","social and ethical reasoning"],
    tags: ["type:reasoning","topic:ethics","phase:evaluation"],
    related: ["bias-mitigation","addressing-biases-and-ethical-concerns"],
    status: "verified",
    notes: "Used in ethics, law, moral philosophy."
  },

  // --- Additional Reasoning Models — Interdisciplinary and Complex Reasoning ---
  {
    slug: "transactive-reasoning",
    term: "Transactive Reasoning",
    aliases: [],
    definition: `Reasoning that emerges through interaction and knowledge exchange among people or agents.`,
    sources: [],
    categories: ["additional reasoning models","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:collaboration","phase:prompting"],
    related: ["parallel-reasoning","dialectical-reasoning"],
    status: "verified",
    notes: "Used in education and collaborative work."
  },
  {
    slug: "multimodal-reasoning",
    term: "Multimodal Reasoning",
    aliases: [],
    definition: `Integrating signals across modalities (text, vision, audio) to improve inference and decisions.`,
    sources: [],
    categories: ["additional reasoning models","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:multimodal","phase:prompting"],
    related: ["computational-reasoning","spatial-reasoning"],
    status: "verified",
    notes: "Seen in robotics, HCI, AI."
  },
  {
    slug: "quantum-reasoning",
    term: "Quantum Reasoning",
    aliases: [],
    definition: `Applying quantum-mechanical principles (e.g., superposition, interference) to model or solve problems.`,
    sources: [],
    categories: ["additional reasoning models","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:quantum","phase:research"],
    related: ["computational-reasoning"],
    status: "verified",
    notes: "Applied in quantum computing and theoretical physics."
  },
  {
    slug: "interdisciplinary-reasoning",
    term: "Interdisciplinary Reasoning",
    aliases: [],
    definition: `Combining methods and perspectives from multiple disciplines to tackle complex problems.`,
    sources: [],
    categories: ["additional reasoning models","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:integration","phase:ideation"],
    related: ["systems-thinking","design-thinking","cross-domain-reasoning"],
    status: "verified",
    notes: "Used in research, innovation, policy analysis."
  },
  {
    slug: "reflective-reasoning",
    term: "Reflective Reasoning",
    aliases: [],
    definition: `Deliberately examining one’s own thinking and assumptions to improve judgments.`,
    sources: [],
    categories: ["additional reasoning models","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:metacognition","phase:evaluation"],
    related: ["meta-reasoning","reflective-practice"],
    status: "verified",
    notes: "Used in education, philosophy, personal development."
  },
  {
    slug: "parallel-reasoning",
    term: "Parallel Reasoning",
    aliases: [],
    definition: `Handling multiple information streams or subproblems concurrently to accelerate or diversify inference.`,
    sources: [],
    categories: ["additional reasoning models","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:computation","phase:prompting"],
    related: ["transactive-reasoning","computational-reasoning"],
    status: "verified",
    notes: "Relevant in computing and multitasking contexts."
  },
  {
    slug: "dialectical-reasoning",
    term: "Dialectical Reasoning",
    aliases: [],
    definition: `Resolving contradictions via thesis–antithesis–synthesis cycles (structured debate).`,
    sources: [],
    categories: ["additional reasoning models","interdisciplinary and complex reasoning"],
    tags: ["type:reasoning","topic:debate","phase:prompting"],
    related: ["reflective-reasoning","transactive-reasoning"],
    status: "verified",
    notes: "Used in philosophy, critical thinking."
  },

  // --- Additional Thinking Systems / Structures ---
  {
    slug: "integrated-reasoning",
    term: "Integrated Reasoning",
    aliases: [],
    definition: `Combining quantitative, verbal, and analytical reasoning concurrently to solve problems.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:reasoning","phase:prompting"],
    related: ["computational-thinking","meta-reasoning"],
    status: "verified",
    notes: "Used in business, management, education."
  },
  {
    slug: "critical-systems-thinking-cst",
    term: "Critical Systems Thinking (CST)",
    aliases: ["cst"],
    definition: `A systems approach informed by critical theory—surfacing boundaries, power, and values while designing interventions.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:systems","phase:ideation"],
    related: ["systems-thinking","complex-adaptive-systems-cas-thinking"],
    status: "verified",
    notes: "Applied to policy analysis and organizational change."
  },
  {
    slug: "meta-reasoning",
    term: "Meta-Reasoning",
    aliases: [],
    definition: `Monitoring and controlling one’s own reasoning process (planning, checking, revising strategies).`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:metacognition","phase:evaluation"],
    related: ["reflective-reasoning","self-discover-framework"],
    status: "verified",
    notes: "Used in AI, cognitive science, personal development."
  },
  {
    slug: "cross-domain-reasoning",
    term: "Cross-Domain Reasoning",
    aliases: [],
    definition: `Applying models/strategies from one field to another to generate insights or solutions.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:integration","phase:ideation"],
    related: ["interdisciplinary-reasoning","analogical-reasoning","design-thinking"],
    status: "verified",
    notes: "Useful in interdisciplinary research and innovation."
  },
  {
    slug: "complex-adaptive-systems-cas-thinking",
    term: "Complex Adaptive Systems (CAS) Thinking",
    aliases: ["cas thinking"],
    definition: `Understanding systems of interacting agents that adapt over time, producing emergent dynamics.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:systems","phase:ideation"],
    related: ["systems-thinking","critical-systems-thinking-cst"],
    status: "verified",
    notes: "Used in ecology, economics, org behavior."
  },
  {
    slug: "design-thinking",
    term: "Design Thinking",
    aliases: [],
    definition: `A solution-focused, iterative approach: empathize → define → ideate → prototype → test.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:design","phase:ideation"],
    related: ["cross-domain-reasoning","integrated-reasoning","strategic-reasoning"],
    status: "verified",
    notes: "Used in product design, strategy, education."
  },
  {
    slug: "strategic-reasoning",
    term: "Strategic Reasoning",
    aliases: [],
    definition: `Planning and decision-making that accounts for long-term outcomes, incentives, and interactions.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:strategy","phase:ideation"],
    related: ["design-thinking","probabilistic-reasoning"],
    status: "verified",
    notes: "Used in business strategy, military, game theory."
  },
  {
    slug: "heuristic-systematic-model",
    term: "Heuristic-Systematic Model",
    aliases: ["hsm"],
    definition: `Dual-process account: fast heuristic processing vs. slower systematic analysis.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:model","topic:cognition","phase:ideation"],
    related: ["intuitive-reasoning","reflective-reasoning"],
    status: "verified",
    notes: "Used in psychology, advertising, decision-making."
  },
  {
    slug: "computational-thinking",
    term: "Computational Thinking",
    aliases: [],
    definition: `Formulating problems and solutions in computable terms (decomposition, abstraction, algorithms, evaluation).`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:framework","topic:computing","phase:prompting"],
    related: ["computational-reasoning","program-generation"],
    status: "verified",
    notes: "Used in CS, education, data analysis."
  },
  {
    slug: "reflective-practice",
    term: "Reflective Practice",
    aliases: [],
    definition: `A continuous cycle of action and reflection to learn from experience and improve performance.`,
    sources: [],
    categories: ["additional thinking systems/structures"],
    tags: ["type:practice","topic:metacognition","phase:evaluation"],
    related: ["experiential-reasoning","reflective-reasoning","meta-reasoning"],
    status: "verified",
    notes: "Used in professional development, education, healthcare."
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
    aliases: ["deliberate alignment", "spec-based alignment"],
    definition: `Training procedure for reasoning models that explicitly reads safety specifications and reasons about them *before* answering—aimed at safer, policy-aware outputs.`,
    sources: [
      { title: "OpenAI: Deliberative alignment (Dec 20, 2024)", url: "https://openai.com/index/deliberative-alignment/" }
    ],
    categories: ["safety and security"],
    tags: ["type:method", "topic:alignment", "topic:reasoning", "phase:training"],
    related: ["reflection-or-reasoning-prompting", "fact-check-prompting", "bias-mitigation"],
    status: "verified",
    notes: ""
  },
  {
    slug: "reasoning-tokens-o1-style",
    term: "Reasoning Tokens (o1-style)",
    aliases: ["private thoughts", "deliberate tokens"],
    definition: `Hidden intermediate “thinking” steps (token budget reserved for reasoning) that enable more deliberate problem solving; they count against context but are not surfaced to users.`,
    sources: [
      { title: "Explainer on o1 reasoning tokens (Oct 8, 2024)", url: "https://leehanchung.github.io/blogs/2024/10/08/reasoning-understanding-o1/" },
      { title: "Press/analysis coverage (Dec 2024)", url: "https://www.theatlantic.com/technology/archive/2024/12/openai-o1-reasoning-models/680906/" }
    ],
    categories: ["reasoning models or structures"],
    tags: ["type:component", "topic:reasoning", "phase:inference"],
    related: ["tree-of-thought-tot", "plan-and-solve-p-s", "scratchpad-reasoning"],
    status: "verified",
    notes: "User-hidden chain-of-thought; influences prompt budgeting and eval."
  },
  // --- RAG robustness pattern that wasn’t in your file ---
  {
    slug: "corrective-rag-crag",
    term: "Corrective RAG (CRAG)",
    aliases: ["corrective retrieval augmented generation"],
    definition: `A RAG variant that evaluates retrieval quality and conditionally triggers alternate actions (e.g., web search, re-query, decompose-recompose) to reduce hallucinations.`,
    sources: [
      { title: "CRAG (Jan 29, 2024)", url: "https://arxiv.org/abs/2401.15884" },
      { title: "CRAG HTML (updated Oct 2024)", url: "https://arxiv.org/html/2401.15884v3" }
    ],
    categories: ["meta-prompt strategies"],
    tags: ["type:technique", "topic:rag", "topic:robustness", "phase:prompting"],
    related: ["agentic-rag", "fact-check-prompting", "system-query"],
    status: "verified",
    notes: ""
  },
  // --- Watermarking (text output provenance moved fast in late 2024) ---
  {
    slug: "text-watermarking-synthid-text",
    term: "Text Watermarking (SynthID-Text)",
    aliases: ["synthid text", "output watermarking"],
    definition: `A production-oriented watermarking scheme that modifies sampling to embed detectable signals in generated text—supporting provenance checks with limited latency hit.`,
    sources: [
      { title: "Nature paper (2024): SynthID-Text", url: "https://www.nature.com/articles/s41586-024-08025-4" },
      { title: "CMU ML blog: watermarking trade-offs (Sep 27, 2024)", url: "https://blog.ml.cmu.edu/2024/09/27/no-free-lunch-in-llm-watermarking-trade-offs-in-watermarking-design-choices/" }
    ],
    categories: ["safety and security"],
    tags: ["type:technique", "topic:provenance", "topic:safety", "phase:inference"],
    related: ["prompt-leakage", "content-authentication", "safety-alignment"],
    status: "verified",
    notes: ""
  }
);

GLOSSARY.push(
  {
    slug: "method-actors",
    term: "Method Actors",
    aliases: [],
    definition: `A prompt engineering mental model likening LLMs to actors, prompts to scripts, and outputs to performances. Under this approach, an LLM “method acts” a role via its prompt, which significantly improved puzzle-solving performance in experiments:contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}.`,
    sources: [
      { title: "LLMs as Method Actors (arXiv Nov 2024)", url: "https://arxiv.org/abs/2411.05778" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:prompting","type:mental-model"],
    related: ["chain-of-thought-cot","prompt-architect"],
    status: "draft",
    notes: ""
  },
  {
    slug: "multi-objective-directional-prompting-modp",
    term: "Multi-Objective Directional Prompting (MODP)",
    aliases: ["modp"],
    definition: `A prompt optimization framework that treats prompt design as a multi-objective, metrics-driven problem:contentReference[oaicite:2]{index=2}. MODP considers not only task accuracy but also a model’s intrinsic behavior and other goals (e.g. safety), then iteratively adjusts prompts to balance these objectives:contentReference[oaicite:3]{index=3}.`,
    sources: [
      { title: "MODP: Multi Objective Directional Prompting (arXiv Apr 2025)", url: "https://arxiv.org/abs/2504.18722" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:prompting","type:framework"],
    related: ["mixture-of-formats-mof","greedy-prompt-engineering-strategy-greedy-pes"],
    status: "draft",
    notes: ""
  },
  {
    slug: "mixture-of-formats-mof",
    term: "Mixture of Formats (MOF)",
    aliases: [],
    definition: `A robustness technique where prompts are shown to the model in diverse style formats during few-shot examples:contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}. By training or prompting with varied styles (e.g. different wording or ordering), MOF reduces prompt brittleness and sensitivity to superficial prompt changes:contentReference[oaicite:6]{index=6}.`,
    sources: [
      { title: "Towards LLMs Robustness to Prompt Format Styles (NAACL 2025)", url: "https://aclanthology.org/2025.naacl-srw.51/" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:robustness","type:technique"],
    related: ["prompt-brittleness","few-shot-learning"],
    status: "draft",
    notes: ""
  },
  {
    slug: "greedy-prompt-engineering-strategy-greedy-pes",
    term: "Greedy Prompt Engineering Strategy (Greedy PES)",
    aliases: ["greedy pes"],
    definition: `An approach to systematically optimize prompts by exhaustively searching and scoring variations:contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}. Greedy PES adjusts prompt phrasing and structure in iterations, selecting changes that improve multi-metric performance (e.g. accuracy, coherence, safety) on evaluation data:contentReference[oaicite:9]{index=9}:contentReference[oaicite:10]{index=10}.`,
    sources: [
      { title: "Advancing Multimodal LLMs: Optimizing Prompts (Appl. Sci. 2025)", url: "https://www.mdpi.com/2076-3417/15/7/3992" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:optimization","type:technique"],
    related: ["multi-objective-directional-prompting-modp","self-refine"],
    status: "draft",
    notes: ""
  },
  {
    slug: "mixture-of-prompt-experts-mope",
    term: "Mixture of Prompt Experts (MoPE)",
    aliases: [],
    definition: `A multimodal prompting technique that divides input features among multiple specialized “prompt experts”:contentReference[oaicite:11]{index=11}. Each prompt expert handles a different modality or aspect, and their outputs are fused, which improved performance and adaptiveness in multimodal tasks compared to a single unified prompt:contentReference[oaicite:12]{index=12}.`,
    sources: [
      { title: "MoPE: Mixture of Prompt Experts (arXiv Jan 2025)", url: "https://arxiv.org/abs/2403.10568" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:multimodal","type:framework"],
    related: ["mixture-of-formats-mof","visual-prompting"],
    status: "draft",
    notes: ""
  },
  {
    slug: "context-aware-decomposition-cad",
    term: "Context-Aware Decomposition (CAD)",
    aliases: [],
    definition: `A prompting technique that breaks a complex problem into sub-tasks while keeping the big-picture context in mind:contentReference[oaicite:13]{index=13}:contentReference[oaicite:14]{index=14}. The AI is instructed to maintain a “reasoning journal” of the overall goal and relationships between parts as it solves each piece, which avoids losing context that simple decomposition might cause:contentReference[oaicite:15]{index=15}:contentReference[oaicite:16]{index=16}.`,
    sources: [
      { title: "Context-Aware Decomposition (Prompt-On, Aug 2025)", url: "https://prompton.wordpress.com/2025/08/03/%F0%9F%9A%80-context-aware-decomposition-supercharge-ai-for-complex-problems-%F0%9F%A7%A9/" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:reasoning","type:technique"],
    related: ["chain-of-thought-cot","chain-of-verification-cove"],
    status: "draft",
    notes: ""
  },
  {
    slug: "automatic-prompt-engineer-ape",
    term: "Automatic Prompt Engineer (APE)",
    aliases: ["automatic prompt engineer"],
    definition: `A method where an LLM itself generates and evaluates a large pool of candidate instructions to find the most effective prompt for a task:contentReference[oaicite:17]{index=17}. In APE, one model proposes many possible prompts and another model scores their performance, achieving human-level prompt design on numerous tasks without human prompt writers:contentReference[oaicite:18]{index=18}:contentReference[oaicite:19]{index=19}.`,
    sources: [
      { title: "Large Language Models are Human-Level Prompt Engineers (arXiv 2023)", url: "https://arxiv.org/abs/2211.01910" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:prompting","type:automation"],
    related: ["self-refine","greedy-prompt-engineering-strategy-greedy-pes"],
    status: "draft",
    notes: ""
  },
  {
    slug: "recursive-self-improvement-prompting-rsip",
    term: "Recursive Self-Improvement Prompting (RSIP)",
    aliases: ["recursive self-improvement"],
    definition: `An iterative refinement approach where the AI generates an answer, then critiques its own output and attempts a revised answer, repeating this cycle:contentReference[oaicite:20]{index=20}. By serving as its own reviewer and editor in each round, an LLM can significantly improve the quality of its solution or writing over multiple iterations:contentReference[oaicite:21]{index=21}.`,
    sources: [
      { title: "Advances in LLM Prompting (Reddit r/PromptEngineering, 2025)", url: "https://www.reddit.com/r/PromptEngineering/comments/1ki9qwb/advances_in_llm_prompting_and_model_capabilities/" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:iterative","type:technique"],
    related: ["self-refine","chain-of-verification-cove"],
    status: "draft",
    notes: ""
  },
  {
    slug: "self-refine",
    term: "Self-Refine",
    aliases: ["self-refinement"],
    definition: `An approach where an LLM is prompted to refine its initial answer using feedback it generates itself:contentReference[oaicite:22]{index=22}. For example, the model produces an answer, then (possibly under a new prompt) identifies flaws or areas to improve, and produces a revised answer. This loop can repeat, enabling the model to improve its output without external feedback:contentReference[oaicite:23]{index=23}:contentReference[oaicite:24]{index=24}.`,
    sources: [
      { title: "Self-Refine: Iterative Refinement with Self-Feedback (arXiv 2023)", url: "https://arxiv.org/abs/2303.17651" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:iterative","type:technique"],
    related: ["recursive-self-improvement-prompting-rsip","chain-of-thought-cot"],
    status: "draft",
    notes: ""
  },
  {
    slug: "graph-of-thoughts-got",
    term: "Graph of Thoughts (GoT)",
    aliases: ["graph-of-thought"],
    definition: `A prompting paradigm where the model explores multiple reasoning paths in a graph structure (with branches merging or intersecting) rather than a single chain:contentReference[oaicite:25]{index=25}:contentReference[oaicite:26]{index=26}. This allows backtracking and combining of different solution paths. Graph-of-Thoughts was proposed to improve complex problem solving by searching a network of reasoning steps, outperforming strictly linear chain-of-thought in some cases:contentReference[oaicite:27]{index=27}:contentReference[oaicite:28]{index=28}.`,
    sources: [
      { title: "Graph of Thoughts: Solving Elaborate Problems with LLMs (NeurIPS 2023)", url: "https://arxiv.org/abs/2308.09687" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:reasoning","type:framework"],
    related: ["chain-of-thought-cot","tree-of-thought-tot"],
    status: "draft",
    notes: ""
  },
  {
    slug: "prompt-layered-architecture-pla",
    term: "Prompt-Layered Architecture (PLA)",
    aliases: [],
    definition: `A software design pattern that treats prompts as first-class modules in a system’s architecture:contentReference[oaicite:29]{index=29}:contentReference[oaicite:30]{index=30}. In PLA, an application is built in layered stages (prompt composition, prompt orchestration, response handling, memory management, etc.), allowing systematic reuse, versioning, and testing of prompts similar to software components:contentReference[oaicite:31]{index=31}:contentReference[oaicite:32]{index=32}.`,
    sources: [
      { title: "Prompt-Layered Architecture: AI-First Product Design (IJSRM 2024)", url: "https://ijsrm.net/index.php/ijsrm/article/view/5670" }
    ],
    categories: ["architectures"],
    tags: ["topic:systems","type:framework"],
    related: ["langchain","llama-index"],
    status: "draft",
    notes: ""
  },
  {
    slug: "langgpt-dual-layer-framework",
    term: "LangGPT Dual-Layer Framework",
    aliases: ["langgpt"],
    definition: `A structured prompt design methodology treating prompts like a programming language:contentReference[oaicite:33]{index=33}. LangGPT introduces a two-layer prompt format: a normative, easy-to-read structure for users, and an extended layer for model consumption, enabling reusable and modular prompt components:contentReference[oaicite:34]{index=34}:contentReference[oaicite:35]{index=35}. It aims to reduce trial-and-error by bringing consistency and reusability to prompt construction.`,
    sources: [
      { title: "LangGPT: Structured Reusable Prompt Design (arXiv Jun 2024)", url: "https://arxiv.org/abs/2402.16929" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:prompting","type:framework"],
    related: ["prompt-layered-architecture-pla","prompt-templates"],
    status: "draft",
    notes: ""
  },
  {
    slug: "mega-prompt",
    term: "Mega-Prompt",
    aliases: [],
    definition: `A very large, detailed prompt that attempts to pack in all relevant instructions, context, and information for a complex task in one go:contentReference[oaicite:36]{index=36}:contentReference[oaicite:37]{index=37}. Mega-prompts can span hundreds or thousands of tokens (for models with extended context windows) to try to achieve a task in a single prompt, as opposed to breaking it into multiple steps. While fast for simple cases, they can hit context length limits and be hard to debug for very complex tasks:contentReference[oaicite:38]{index=38}:contentReference[oaicite:39]{index=39}.`,
    sources: [
      { title: "From Mega-Prompts to Prompt Pipelines (Medium Aug 2025)", url: "https://medium.com/@chris.xg.wang/mega-prompts-prompt-pipeline-agentic-team-235e3a794c0d" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:context","type:technique"],
    related: ["multi-turn-conversation","prompt-brittleness"],
    status: "draft",
    notes: ""
  },
  {
    slug: "real-time-adaptive-prompting",
    term: "Real-Time Adaptive Prompting",
    aliases: ["dynamic prompting"],
    definition: `A technique where prompts are adjusted on-the-fly as new input arrives or the context changes during a live session:contentReference[oaicite:40]{index=40}. Often used in streaming data or edge cases (e.g. wearable sensors or live feeds), the prompt includes modular slots or instructions that update continuously based on the latest information, allowing the LLM to adapt its responses moment-to-moment:contentReference[oaicite:41]{index=41}.`,
    sources: [
      { title: "Multimodal Prompt Engineering Trends (GoCodeo Oct 2023)", url: "https://www.gocodeo.com/post/the-future-of-prompt-engineering-towards-multimodal-prompts" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:dynamic","type:technique"],
    related: ["adaptive-prompting","multi-turn-conversation"],
    status: "draft",
    notes: ""
  },
  {
    slug: "multimodal-prompting",
    term: "Multimodal Prompting",
    aliases: [],
    definition: `Prompting that involves inputs (and possibly outputs) beyond just text, such as images, audio, or other data streams:contentReference[oaicite:42]{index=42}:contentReference[oaicite:43]{index=43}. For example, a single prompt might include a text instruction alongside an image. Multimodal prompting strategies address how to fuse these inputs (e.g. describing an image in text before asking a question about it) so that LLMs can reason across modalities:contentReference[oaicite:44]{index=44}:contentReference[oaicite:45]{index=45}.`,
    sources: [
      { title: "The Future of Prompt Engineering: Multimodal Prompts (GoCodeo 2023)", url: "https://www.gocodeo.com/post/the-future-of-prompt-engineering-towards-multimodal-prompts" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:multimodal","type:technique"],
    related: ["visual-prompting","multimodal-chain-of-thought-mm-cot"],
    status: "draft",
    notes: ""
  },
  {
    slug: "multimodal-chain-of-thought-mm-cot",
    term: "Multimodal Chain-of-Thought (MM-CoT)",
    aliases: ["mm-cot"],
    definition: `A reasoning approach extending *chain-of-thought* prompting to multimodal inputs:contentReference[oaicite:46]{index=46}. The model is guided to produce step-by-step reasoning that references each modality in sequence (e.g. *“Analyze the image… now relate it to this audio… now draw a conclusion”*), thereby making its cross-modal reasoning explicit and interpretable:contentReference[oaicite:47]{index=47}:contentReference[oaicite:48]{index=48}. MM-CoT helps ensure the model properly uses both visual and textual context in tasks like image-question answering.`,
    sources: [
      { title: "Key Trends Shaping Multimodal Prompting (GoCodeo 2023)", url: "https://www.gocodeo.com/post/the-future-of-prompt-engineering-towards-multimodal-prompts" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:multimodal","type:technique"],
    related: ["chain-of-thought-cot","multimodal-prompting"],
    status: "draft",
    notes: ""
  },
  {
    slug: "role-playing-prompting",
    term: "Role-Playing Prompting",
    aliases: ["role prompting","persona prompting"],
    definition: `Instructing an LLM to adopt a specific role or persona as it responds:contentReference[oaicite:49]{index=49}:contentReference[oaicite:50]{index=50}. By prefacing a prompt with a role (e.g. “You are a veteran software engineer advising a novice” or “Act as a Shakespearean poet”), the model’s style, tone, and allowed knowledge are shaped by that persona. This can yield more contextually appropriate or creative outputs and is often used to guide an AI assistant’s behavior in dialogues.`,
    sources: [
      { title: "Role-playing Prompt Framework (arXiv Dec 2024)", url: "https://arxiv.org/abs/2406.00627" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:context","type:technique"],
    related: ["system-prompt","persona"],
    status: "draft",
    notes: ""
  },
  {
    slug: "llm-guardrails",
    term: "LLM Guardrails",
    aliases: ["guardrails"],
    definition: `Any agent, rule, or filtering system that monitors or adjusts an LLM’s inputs/outputs to ensure they stay safe, accurate, and on-policy:contentReference[oaicite:51]{index=51}:contentReference[oaicite:52]{index=52}. Guardrails can be as simple as regex filters or as complex as additional AI moderators. They aim to prevent harmful, biased, or disallowed content by constraining the model’s behavior via post-processing, or even by altering prompts in real-time:contentReference[oaicite:53]{index=53}:contentReference[oaicite:54]{index=54}.`,
    sources: [
      { title: "LLM guardrails guide AI outputs (K2View May 2025)", url: "https://www.k2view.com/blog/llm-guardrails/" }
    ],
    categories: ["safety"],
    tags: ["topic:safety","type:tool"],
    related: ["jailbreaking-jailbreak-attack","content-moderation"],
    status: "draft",
    notes: ""
  },
  {
    slug: "plan-and-execute-agent",
    term: "Plan-and-Execute Agent",
    aliases: [],
    definition: `An LLM-based agent architecture that separates the problem-solving process into two phases: first **planning** a sequence of steps or sub-goals given a complex task, then **executing** each step with the LLM (possibly using tools) in turn:contentReference[oaicite:55]{index=55}:contentReference[oaicite:56]{index=56}. This contrasts with prompting the model to solve it in one shot or with a fixed chain. Plan-and-Execute agents have been shown to handle complex, multi-step tasks more reliably by allowing re-planning and focusing on one sub-task at a time.`,
    sources: [
      { title: "LangChain Blog: Plan-and-Execute Agents (2023)", url: "https://blog.langchain.com/plan-and-execute/" }
    ],
    categories: ["architectures"],
    tags: ["topic:agents","type:framework"],
    related: ["react","auto-gpt"],
    status: "draft",
    notes: ""
  },
  {
    slug: "guidance-library",
    term: "Guidance (Prompting Library)",
    aliases: ["microsoft guidance"],
    definition: `An open-source library by Microsoft that provides a specialized syntax to intermix templating, control flow, and LLM generation calls in one prompt program:contentReference[oaicite:57]{index=57}. Guidance allows developers to guide LLM output structure (e.g., “gen” to generate text, “select” to choose options) and incorporate logic (like loops or conditionals) in prompts, yielding more deterministic and formatted outputs with fewer API calls:contentReference[oaicite:58]{index=58}:contentReference[oaicite:59]{index=59}.`,
    sources: [
      { title: "Microsoft Guidance GitHub README", url: "https://github.com/microsoft/guidance" }
    ],
    categories: ["tools"],
    tags: ["topic:orchestration","type:library"],
    related: ["prompt-layered-architecture-pla","langchain"],
    status: "draft",
    notes: ""
  },
  {
    slug: "function-calling",
    term: "Function Calling",
    aliases: [],
    definition: `A capability of some LLMs (introduced by OpenAI in 2023) to output a structured JSON object calling a developer-defined function when appropriate:contentReference[oaicite:60]{index=60}:contentReference[oaicite:61]{index=61}. Instead of replying in text, the model decides a certain user query would be best handled by an external tool/API and returns a JSON with arguments. The calling application can then execute the function (e.g. a web search or database query) and return the result to the model. This mechanism bridges LLMs with external tools more reliably than prompting alone:contentReference[oaicite:62]{index=62}:contentReference[oaicite:63]{index=63}.`,
    sources: [
      { title: "OpenAI API introduction of function calling (June 2023)", url: "https://openai.com/blog/function-calling-and-other-api-updates" }
    ],
    categories: ["architectures"],
    tags: ["topic:tools","type:integration"],
    related: ["automatic-prompt-engineer-ape","toolformer"],
    status: "draft",
    notes: ""
  },
  {
    slug: "instruction-tuning",
    term: "Instruction Tuning",
    aliases: [],
    definition: `Fine-tuning a model on a dataset of many different tasks described in natural language instructions, with the outputs demonstrating the desired behavior:contentReference[oaicite:64]{index=64}. By training on diverse instruction–response pairs (possibly across hundreds of tasks), an LLM becomes much better at following novel instructions zero-shot. This technique (pioneered by FLAN and T0) underpins modern “instruction-following” models and makes them more aligned with user intentions:contentReference[oaicite:65]{index=65}.`,
    sources: [
      { title: "Sebastian Ruder’s NLP Newsletter: Instruction Tuning (Oct 2023)", url: "https://newsletter.ruder.io/p/instruction-tuning-vol-1" }
    ],
    categories: ["training techniques"],
    tags: ["topic:alignment","type:fine-tuning"],
    related: ["reinforcement-learning-from-human-feedback-rlhf","few-shot-learning"],
    status: "draft",
    notes: ""
  },
  {
    slug: "reinforcement-learning-from-human-feedback-rlhf",
    term: "Reinforcement Learning from Human Feedback (RLHF)",
    aliases: ["rlhf"],
    definition: `A fine-tuning strategy where human preference data is used as the reward signal to train the model’s behavior:contentReference[oaicite:66]{index=66}:contentReference[oaicite:67]{index=67}. Typically, human labelers rank or choose better model outputs; a reward model is trained on this, and then the base model is further optimized (often via PPO) to generate outputs that maximize this learned reward. RLHF was critical in training helpful, aligned assistants (like InstructGPT) by incorporating human judgment of safety and quality into the model’s objectives:contentReference[oaicite:68]{index=68}:contentReference[oaicite:69]{index=69}.`,
    sources: [
      { title: "OpenAI: Aligning Language Models to Follow Instructions (Jan 2022)", url: "https://openai.com/research/instruction-following" }
    ],
    categories: ["training techniques"],
    tags: ["topic:alignment","type:fine-tuning"],
    related: ["instruction-tuning","reinforcement-learning-from-ai-feedback-rlaif"],
    status: "draft",
    notes: ""
  },
  {
    slug: "chain-of-verification-cove",
    term: "Chain-of-Verification (CoVe)",
    aliases: [],
    definition: `A self-checking prompting technique where after producing an initial answer, the model generates a series of verification questions about its answer, answers those, and then uses those answers to correct or refine the final output:contentReference[oaicite:70]{index=70}:contentReference[oaicite:71]{index=71}. CoVe effectively has the model double-check its work (especially factual assertions) with targeted sub-queries, significantly reducing factual errors (hallucinations) compared to a standard chain-of-thought approach:contentReference[oaicite:72]{index=72}:contentReference[oaicite:73]{index=73}.`,
    sources: [
      { title: "Chain-of-Verification Prompting (LearnPrompting Sep 2024)", url: "https://learnprompting.org/docs/advanced/self_criticism/chain_of_verification" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:verification","type:technique"],
    related: ["chain-of-thought-cot","self-refine"],
    status: "draft",
    notes: ""
  },
  {
    slug: "self-critique-prompting",
    term: "Self-Critique Prompting",
    aliases: ["self-criticism prompting"],
    definition: `Any prompt strategy that explicitly asks an LLM to review or criticize its own draft output before finalizing an answer:contentReference[oaicite:74]{index=74}. For example, after an initial response, the assistant might be prompted: *“Identify any errors or biases above.”* The model’s critique is then used to revise the answer. This approach leverages the model’s strengths in proofreading and analysis to improve accuracy or safety without external feedback:contentReference[oaicite:75]{index=75}.`,
    sources: [
      { title: "Introduction to Self-Criticism Prompting (LearnPrompting 2023)", url: "https://learnprompting.org/docs/intermediate/self_criticism" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:iterative","type:technique"],
    related: ["self-refine","chain-of-verification-cove"],
    status: "draft",
    notes: ""
  },
  {
    slug: "system-prompt",
    term: "System Prompt",
    aliases: ["system message"],
    definition: `A hidden or initial prompt that defines the AI’s role, style, and boundaries in chat-based LLMs:contentReference[oaicite:76]{index=76}. It’s provided by the developer (not the end-user) to steer the model’s behavior consistently (for example: *“You are a helpful assistant who only speaks in a formal tone…”*). The user’s prompts are then interpreted in context of this system-level instruction. System prompts are key to “steerability,” allowing constraints like refusals or personas to be enforced across interactions:contentReference[oaicite:77]{index=77}:contentReference[oaicite:78]{index=78}.`,
    sources: [
      { title: "ChatGPT System Message Example (Product Growth, 2025)", url: "https://www.news.aakashg.com/p/prompt-engineering" }
    ],
    categories: ["architectures"],
    tags: ["topic:conversation","type:instruction"],
    related: ["role-playing-prompting","steerability"],
    status: "draft",
    notes: ""
  },
  {
    slug: "steerability",
    term: "Steerability",
    aliases: [],
    definition: `An LLM’s amenability to control via prompts or instructions without retraining. A model with high steerability reliably changes style or behavior when given different system or user directives (e.g. “reply tersely” or adopting a persona):contentReference[oaicite:79]{index=79}. Achieving steerability is a goal of alignment work — for instance, OpenAI’s 2023 updates explicitly improved GPT-3.5’s steerability through system messages, meaning developers can more easily guide the model’s tone and responses:contentReference[oaicite:80]{index=80}.`,
    sources: [
      { title: "OpenAI on new model steerability (June 2023)", url: "https://openai.com/blog/function-calling-and-other-api-updates" }
    ],
    categories: ["alignment"],
    tags: ["topic:alignment","type:property"],
    related: ["system-prompt","helpful-honest-harmless-hhh"],
    status: "draft",
    notes: ""
  },
  {
    slug: "alignment-tax",
    term: "Alignment Tax",
    aliases: [],
    definition: `The trade-off where aligning an LLM to be safer or follow instructions can slightly reduce its performance on other tasks:contentReference[oaicite:81]{index=81}. For example, fine-tuning a model with RLHF for harmlessness might make it worse at certain academic benchmarks – a “tax” paid in capability for better alignment. Researchers try to minimize this tax (OpenAI found mixing in some original pre-training data during RLHF could maintain performance while still improving alignment):contentReference[oaicite:82]{index=82}:contentReference[oaicite:83]{index=83}.`,
    sources: [
      { title: "OpenAI: Aligning Models, potential alignment tax (Jan 2022)", url: "https://openai.com/research/instruction-following" }
    ],
    categories: ["alignment"],
    tags: ["topic:alignment","type:concept"],
    related: ["reinforcement-learning-from-human-feedback-rlhf","helpful-honest-harmless-hhh"],
    status: "draft",
    notes: ""
  },
  {
    slug: "helpful-honest-harmless-hhh",
    term: "Helpful, Honest, Harmless (HHH)",
    aliases: ["hhh"],
    definition: `A trio of goals for aligned AI assistants: being **Helpful** (useful and following user intent), **Honest** (truthful and transparent about uncertainty), and **Harmless** (not producing dangerous or toxic outputs). The HHH principles were highlighted by Anthropic for training their Claude models, using a “constitution” of values to achieve them:contentReference[oaicite:84]{index=84}:contentReference[oaicite:85]{index=85}. Essentially, an HHH-aligned AI tries to effectively solve user requests (and admit limits), while refusing or safe-completing anything that could cause harm.`,
    sources: [
      { title: "Constitutional AI (Anthropic Dec 2022)", url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" }
    ],
    categories: ["alignment"],
    tags: ["topic:alignment","type:principle"],
    related: ["constitutional-ai","reinforcement-learning-from-human-feedback-rlhf"],
    status: "draft",
    notes: ""
  },
  {
    slug: "constitutional-ai",
    term: "Constitutional AI",
    aliases: [],
    definition: `An alignment technique where an AI model is guided by a set of explicit written principles (a “constitution”) and uses them to critique and improve its outputs:contentReference[oaicite:86]{index=86}:contentReference[oaicite:87]{index=87}. For example, the model might have a rule like “avoid hate speech,” and when generating a response, it checks and revises its output according to that rule. This approach, used by Anthropic for Claude, involves the model generating self-critiques based on the constitution and fine-tuning on those revisions, a process known as *reinforcement learning from AI feedback (RLAIF)*:contentReference[oaicite:88]{index=88}:contentReference[oaicite:89]{index=89}.`,
    sources: [
      { title: "Anthropic: Constitutional AI (Dec 2022)", url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" }
    ],
    categories: ["alignment"],
    tags: ["topic:alignment","type:training"],
    related: ["reinforcement-learning-from-ai-feedback-rlaif","helpful-honest-harmless-hhh"],
    status: "draft",
    notes: ""
  },
  {
    slug: "reinforcement-learning-from-ai-feedback-rlaif",
    term: "Reinforcement Learning from AI Feedback (RLAIF)",
    aliases: [],
    definition: `An alignment training method similar to RLHF but where the feedback on outputs comes from an AI model (or the trained model itself) rather than human annotators:contentReference[oaicite:90]{index=90}. In practice, an AI model is used to judge or vote on which of two outputs is better according to a set of principles, and that “AI preference” trains the policy model. RLAIF was demonstrated in Constitutional AI, where the model’s self-critiquing (per a fixed constitution) served as the feedback signal to refine the assistant:contentReference[oaicite:91]{index=91}:contentReference[oaicite:92]{index=92}.`,
    sources: [
      { title: "Anthropic: Constitutional AI (Dec 2022)", url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" }
    ],
    categories: ["alignment"],
    tags: ["topic:alignment","type:training"],
    related: ["reinforcement-learning-from-human-feedback-rlhf","constitutional-ai"],
    status: "draft",
    notes: ""
  },
  {
    slug: "prompt-brittleness",
    term: "Prompt Brittleness",
    aliases: [],
    definition: `The phenomenon where an LLM’s performance or output changes dramatically with small, semantically irrelevant changes in the prompt wording or format:contentReference[oaicite:93]{index=93}:contentReference[oaicite:94]{index=94}. For example, rephrasing a question or adding innocuous phrases might cause a correct answer to turn into an incorrect one (and vice-versa). Prompt brittleness makes LLM behavior unpredictable and is a motivation for techniques like Mixture of Formats and prompt robustness training:contentReference[oaicite:95]{index=95}:contentReference[oaicite:96]{index=96}.`,
    sources: [
      { title: "Prompt Brittleness and MOF (NAACL 2025)", url: "https://aclanthology.org/2025.naacl-srw.51/" }
    ],
    categories: ["challenges"],
    tags: ["topic:robustness","type:issue"],
    related: ["mixture-of-formats-mof","prompt-ensembling"],
    status: "draft",
    notes: ""
  },
  {
    slug: "eliza-effect",
    term: "ELIZA Effect",
    aliases: ["eliza"],
    definition: `The tendency of people to ascribe human-like understanding or intent to AI outputs, even when the AI is just blindly generating text:contentReference[oaicite:97]{index=97}. Named after the 1960s ELIZA chatbot (which used simple pattern matching yet often convinced users it understood them), this effect leads users to anthropomorphize chatbots and assume a level of intelligence or empathy that isn’t really there:contentReference[oaicite:98]{index=98}:contentReference[oaicite:99]{index=99}. It’s a caution in prompt engineering and user experience design to remind users that the AI’s knowledge and reasoning are limited to its training data and algorithms.`,
    sources: [
      { title: "Wikipedia: ELIZA effect", url: "https://en.wikipedia.org/wiki/ELIZA_effect" }
    ],
    categories: ["challenges"],
    tags: ["topic:human-ai","type:cognitive-bias"],
    related: ["hallucinations","anthropomorphism"],
    status: "draft",
    notes: ""
  },
  {
    slug: "chatgpt",
    term: "ChatGPT",
    aliases: [],
    definition: `OpenAI’s AI chatbot interface, launched publicly in Nov 2022, which popularized LLM-based conversations:contentReference[oaicite:100]{index=100}:contentReference[oaicite:101]{index=101}. ChatGPT is powered by GPT-3.5 and GPT-4 models (as of 2023) and fine-tuned for dialogue. Its release demonstrated the versatility of prompt engineering to elicit coding help, writing drafts, Q&A, etc., and led to widespread interest in conversational AI. Many prompt engineering techniques were first widely explored through ChatGPT prompts.`,
    sources: [
      { title: "History of ChatGPT (SearchEngineJournal)", url: "https://www.searchenginejournal.com/history-of-chatgpt/484476/" }
    ],
    categories: ["systems"],
    tags: ["topic:chatbot","type:product"],
    related: ["gpt-4","bard"],
    status: "draft",
    notes: ""
  },
  {
    slug: "gpt-4",
    term: "GPT-4",
    aliases: [],
    definition: `OpenAI’s flagship large language model announced in March 2023, succeeding GPT-3. It is multimodal (can accept text and images as input) and demonstrated substantially improved reasoning, creativity, and instruction-following abilities. GPT-4 has a larger knowledge base and more advanced skills than previous models; for example, it performs well on academic and professional exams and introduced features like function calling and a longer 32K token context window:contentReference[oaicite:102]{index=102}:contentReference[oaicite:103]{index=103}. Many prompt engineering techniques that worked on GPT-3 still apply, but GPT-4 generally handles complex prompts and subtle instructions more reliably.`,
    sources: [
      { title: "OpenAI API Release Notes (Mar 2023)", url: "https://openai.com/research/gpt-4" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["chatgpt","gpt-3-5-turbo"],
    status: "draft",
    notes: ""
  },
  {
    slug: "claude-2",
    term: "Claude 2",
    aliases: ["anthropic claude"],
    definition: `Anthropic’s second-generation LLM (released July 2023) designed to be a helpful, harmless, and honest AI assistant. Claude 2 can handle very long inputs (up to 100K tokens) and is trained with Constitutional AI techniques for alignment. It often excels at tasks requiring extended reasoning or summarization of long documents due to its context length. Prompt engineers note that Claude tends to follow explicit formatting instructions closely and may be less likely to refuse borderline requests compared to ChatGPT (though it still has guardrails).`,
    sources: [
      { title: "Anthropic Claude 2 Announcement (July 2023)", url: "https://www.anthropic.com/index/claude-2" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["helpful-honest-harmless-hhh","constitutional-ai"],
    status: "draft",
    notes: ""
  },
  {
    slug: "llama-2",
    term: "LLaMA 2",
    aliases: [],
    definition: `A family of open-source LLMs (7B, 13B, 70B parameters) released by Meta in July 2023 as the successor to LLaMA. LLaMA 2 models were trained on 2 trillion tokens and come in both a base version and a fine-tuned chat version. They are widely used in the community for custom applications because of their openness. Many instruction-following tricks and prompt patterns that work for ChatGPT also work for LLaMA 2-chat, though its quality is roughly on par with earlier GPT-3.5 models in many areas. Being open, it allows on-premises use and further fine-tuning by anyone (subject to its license).`,
    sources: [
      { title: "Meta AI: LLaMA 2 (July 2023)", url: "https://ai.meta.com/llama/" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["alpaca","vicuna"],
    status: "draft",
    notes: ""
  },
  {
    slug: "gpt-3-5-turbo",
    term: "GPT-3.5 Turbo",
    aliases: ["gpt-3-5","gpt3-5"],
    definition: `The model behind the original ChatGPT (2022) – essentially an improved, chat-optimized version of GPT-3. It was the first widely deployed instruction-tuned LLM. GPT-3.5 Turbo can handle about 4K tokens (there is also a 16K version) and serves as the default for many API applications due to its speed and cost. Prompt-wise, it is less capable than GPT-4 on complex tasks, so prompt engineers often find they must use more explicit or structured prompts to get the desired output from GPT-3.5. It introduced features like the system message to steer behavior and, later, function calling support.`,
    sources: [
      { title: "OpenAI Model Index (2023)", url: "https://platform.openai.com/docs/models/gpt-3-5" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["chatgpt","gpt-4"],
    status: "draft",
    notes: ""
  },
  {
    slug: "bard",
    term: "Bard",
    aliases: ["google bard"],
    definition: `Google’s conversational LLM interface (opened to public in 2023) built on its Pathways Language Model (PaLM and later PaLM 2). Bard is integrated with Google’s search and can access up-to-date information. For prompt engineers, Bard initially had more limitations (e.g. shorter outputs, more refusals) but has been rapidly improving. It allows some unique interactions like image uploads with prompts. While Bard generally follows user instructions, it may apply Google’s stricter content policies. It serves as Google’s answer to ChatGPT, and many prompts that work in ChatGPT can be tried on Bard, though the style and formatting of responses differ.`,
    sources: [
      { title: "Google Blog: Bard Expansion (May 2023)", url: "https://blog.google/technology/ai/updates-to-bard/" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:product"],
    related: ["chatgpt","bing-chat"],
    status: "draft",
    notes: ""
  },
  {
    slug: "ernie-bot",
    term: "ERNIE Bot",
    aliases: ["ernie bot"],
    definition: `A Chinese LLM-based chatbot launched by Baidu in March 2023. ERNIE Bot is based on Baidu’s ERNIE large model and was one of the first major Chinese competitors to ChatGPT. It supports multi-turn dialogue in Chinese (and some English) and handles tasks like code, calculation, and generative writing. Prompt-wise, ERNIE Bot is tuned for the Chinese language and cultural context; many prompting techniques carry over, but it may have different refusal triggers and knowledge gaps due to training on Chinese-centric data and complying with local regulations. It marked a significant step in China’s AI development, similar to how Bard did for Google.`,
    sources: [
      { title: "Reuters: Baidu ERNIE Bot Launch News (Mar 2023)", url: "https://www.reuters.com/technology/baidus-chatgpt-equivalent-ernie-bot-falls-short-expectations-2023-03-16/" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:product"],
    related: ["chatgpt","vicuna"],
    status: "draft",
    notes: ""
  },
  {
    slug: "bing-chat",
    term: "Bing Chat",
    aliases: ["bing ai"],
    definition: `Microsoft’s AI chat integrated into Bing search (launched Feb 2023) powered by OpenAI’s GPT-4. It combines a search engine with a chat interface, using web results to ground its answers. Bing Chat introduced many users to prompt engineering via its modes (e.g. “Creative” vs “Precise”) and revealed how slight prompt tweaks could alter an AI’s style and correctness. Early on, users discovered the system prompt (“Sydney”) and prompt-leaked it, showing the importance of hidden instructions. Bing Chat will cite sources for factual statements, so a prompt engineer working with it may focus on queries that encourage factual, source-supported responses. It is a prominent example of an LLM augmented with tool use (web search) via prompt integration.`,
    sources: [
      { title: "Microsoft: Next-Gen Bing Announcement (Feb 2023)", url: "https://blogs.microsoft.com/blog/2023/02/07/bing-chatgpt/amp/" }
    ],
    categories: ["systems"],
    tags: ["topic:search","type:product"],
    related: ["chatgpt","function-calling"],
    status: "draft",
    notes: ""
  },
  {
    slug: "wizardlm",
    term: "WizardLM",
    aliases: [],
    definition: `A series of open fine-tuned LLMs (2023) known for being trained on “evol-Instruct” data (instructions that increase in complexity) to push model capability. For example, WizardLM-13B was one model that demonstrated surprisingly strong performance after being fine-tuned on instructions that gradually evolve. In practice, WizardLM variants follow instructions better than base LLaMA models. As a term, “WizardLM” often implies an improved instruction-following open model (many derivatives like Wizard-Vicuna, etc.). It highlights how iterative instruction tuning (simulating a tutor guiding complexity) can yield more robust prompt following. Prompt engineers using WizardLM find it generally more responsive to complex multi-step prompts than the base model.`,
    sources: [
      { title: "WizardLM GitHub (2023)", url: "https://github.com/nlpxucan/WizardLM" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["vicuna","llama-2"],
    status: "draft",
    notes: ""
  },
  {
    slug: "vicuna",
    term: "Vicuna",
    aliases: [],
    definition: `An influential 13B-parameter chat model released in March 2023, created by fine-tuning LLaMA on user-shared ChatGPT conversations. Vicuna demonstrated that relatively small models (13B) could reach ~90% of ChatGPT quality by leveraging high-quality instruction data. It sparked a wave of open chat model development. Vicuna is often used as a reference open model; prompt engineering on Vicuna is similar to ChatGPT (since that’s what it was trained on) – it responds to system/user/assistant role format and follows instructions well, albeit with less factual accuracy at times. The Vicuna project also released evaluation benchmarks like GPT-4 scoring, establishing a template for comparing chat models via prompts.`,
    sources: [
      { title: "Vicuna: An Open Chatbot Impressing GPT-4 (LMSYS 2023)", url: "https://vicuna.lmsys.org" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["alpaca","llama-2"],
    status: "draft",
    notes: ""
  },
  {
    slug: "alpaca",
    term: "Alpaca",
    aliases: [],
    definition: `A 7B-parameter model fine-tuned by Stanford (Mar 2023) on 52K instruction-following demonstrations generated by OpenAI’s text-davinci-003. Alpaca was an early example of academia using OpenAI to bootstrap an instruction-tuned model from LLaMA. Its release (and replication instructions) kickstarted the hobbyist LLM fine-tuning trend. Alpaca is relatively lightweight; it follows basic prompts and questions decently but struggles with complex instructions due to its size. Still, the “Alpaca formula” (using a strong model to generate training prompts & outputs) became a paradigm for cheaply improving LLM behavior – a prompt engineering success at dataset creation. The name and model are frequently referenced in open-source AI discussions about cheap instruct-tuning.`,
    sources: [
      { title: "Stanford CRFM: Alpaca Blog (2023)", url: "https://crfm.stanford.edu/2023/03/13/alpaca.html" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["llama-2","self-instruct"],
    status: "draft",
    notes: ""
  },
  {
    slug: "stablelm",
    term: "StableLM",
    aliases: [],
    definition: `A series of open-source LLMs released by Stability AI (in April 2023) with model sizes ranging up to 7B and 15B. StableLM was trained on a new dataset built from scratch (The Pile and others). While StableLM’s initial versions were less polished than LLaMA or GPT-3, they are fully open under a permissive license. Stability also fine-tuned some StableLM models for chat/instructions. In prompt engineering terms, StableLM responds to basic prompts but may require more guided prompting since it wasn’t as extensively instruction-tuned as Alpaca/Vicuna. It’s noteworthy as part of the movement toward fully open model alternatives and demonstrates the trade-off between openness and out-of-the-box capability (where careful prompts can still extract reasonable results).`,
    sources: [
      { title: "Stability AI StableLM Announcement (2023)", url: "https://stability.ai/blog/stability-ai-launches-the-first-of-its-stablelm-suite-of-language-models" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["llama-2","gpt-3-5-turbo"],
    status: "draft",
    notes: ""
  },
  {
    slug: "mistral-7b",
    term: "Mistral 7B",
    aliases: [],
    definition: `A 7-billion-parameter open model released in Sept 2023 by Mistral AI that set a new state-of-the-art for its size. Mistral 7B was trained on a large diverse corpus and introduced architectural tweaks. The result is a model that, when properly prompt-tuned (via fine-tuning or clever prompting), can sometimes rival larger 13B+ models on certain tasks. For the prompt engineer, Mistral 7B is an attractive small model that still responds well to instruction prompts. Many community fine-tunes quickly adopted Mistral as a base. It highlights that model size isn’t everything – data quality and training matter – meaning that with the right prompt or fine-tuning, a 7B model can punch above its weight class.`,
    sources: [
      { title: "Mistral AI Technical Card (2023)", url: "https://mistral.ai/blog/mistral-7b" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["llama-2","vicuna"],
    status: "draft",
    notes: ""
  },
  {
    slug: "falcon-llm",
    term: "Falcon LLM",
    aliases: ["falcon-40b","falcon-7b"],
    definition: `A family of large language models released by the Technology Innovation Institute (UAE) in 2023 that achieved top rankings among open models. Falcon 40B (and the smaller Falcon 7B) were trained on high-quality refined web data. Falcon models are known to be especially good at coding tasks out-of-the-box. They have been widely adopted and further fine-tuned (the Falcon 40B-Instruct is the chat optimized version). In prompt use, Falcon-Instruct follows instructions well and tends to produce coherent, on-topic responses. Its availability under a permissive license (for Falcon 7B, and Falcon 40B under royalty-free license) made it popular for commercial use. Essentially, Falcon demonstrated that non-big-tech groups could train competitive LLMs, giving prompt engineers another powerful base model to work with.`,
    sources: [
      { title: "TII Falcon LLM Release Notes (2023)", url: "https://huggingface.co/tiiuae" }
    ],
    categories: ["systems"],
    tags: ["topic:llm","type:model"],
    related: ["llama-2","stablelm"],
    status: "draft",
    notes: ""
  },
  {
    slug: "toolformer",
    term: "Toolformer",
    aliases: [],
    definition: `A proof-of-concept model (introduced by Meta AI in early 2023) that taught itself to use external tools (like a calculator, search engine, etc.) via API calls embedded in its output:contentReference[oaicite:104]{index=104}:contentReference[oaicite:105]{index=105}. Toolformer was trained to decide *when* and *how* to call a tool and incorporate the result into its text generation, all in a single forward pass. For example, it might insert a call \`<calc>(23*7)\` and then continue the sentence with the returned result. This was achieved with a handful of API usage examples and then letting the model practice on unlabeled data. Toolformer showed that even without explicit fine-tuning on tool use via RL, a model can learn to invoke tools via prompting. It inspired later production features like function calling. In essence, it’s an early example of an LLM augmenting itself with tools in a *self-supervised* way:contentReference[oaicite:106]{index=106}.`,
    sources: [
      { title: "Toolformer: Language Models Can Teach Themselves to Use Tools (Feb 2023)", url: "https://arxiv.org/abs/2302.04761" }
    ],
    categories: ["architectures"],
    tags: ["topic:tools","type:research"],
    related: ["function-calling","automatic-prompt-engineer-ape"],
    status: "draft",
    notes: ""
  },
  {
    slug: "tool-augmentation",
    term: "Tool Augmentation",
    aliases: ["tool-use"],
    definition: `Broadly, any approach that extends an LLM’s capabilities by integrating external tools or APIs into its prompting loop:contentReference[oaicite:107]{index=107}. Instead of relying only on the model’s internal knowledge, tool-augmented systems prompt the model to decide when to use tools (calculators, web search, databases) and to incorporate the results into its answer:contentReference[oaicite:108]{index=108}. This can be done with special prompt tokens (as in ReAct, Toolformer) or via structured outputs (as in function calling). Tool augmentation is a key method to overcome LLM limitations in arithmetic, up-to-date info, or interacting with external environments.`,
    sources: [
      { title: "OpenAI on function calling (Jun 2023)", url: "https://openai.com/blog/function-calling-and-other-api-updates" }
    ],
    categories: ["architectures"],
    tags: ["topic:tools","type:concept"],
    related: ["react","toolformer"],
    status: "draft",
    notes: ""
  },
  {
    slug: "ai-text-detection",
    term: "AI Text Detection",
    aliases: ["ai-generated text detection"],
    definition: `Techniques and tools for determining whether a given text was written by a human or generated by an AI. AI text detection methods include classifier models trained on human vs AI text, as well as statistical watermarks inserted into AI outputs:contentReference[oaicite:109]{index=109}. In 2023, several AI detectors (like GPTZero) emerged, but they proved unreliable on large models and often misflag human text. OpenAI’s own detector was discontinued due to poor accuracy. The most promising approach remains watermarking: subtly biasing an LLM’s word choices so that an algorithm can later spot the signature. For prompt engineers, understanding detection is important if trying to avoid plagiarism or test whether a model’s output can be trusted as original. However, as of 2024, detection is not fully solved.`,
    sources: [
      { title: "BuiltIn: The Eliza Effect (2023) – describes anthropomorphism and detection", url: "https://builtin.com/hardware/eliza-effect-anthropomorphizing-ai" }
    ],
    categories: ["safety"],
    tags: ["topic:misuse","type:tool"],
    related: ["watermarking","eliza-effect"],
    status: "draft",
    notes: ""
  },
  {
    slug: "watermarking",
    term: "Watermarking",
    aliases: [],
    definition: `In the context of LLMs, the embedding of a hidden pattern into generated text to signal it was machine-produced. For example, a watermarking algorithm might bias the model to prefer certain synonyms or sentence structures such that, statistically, the distribution of word n-grams has a secret signature. A detector can later pick up that signature with high probability, while a human reader wouldn’t notice a difference in style:contentReference[oaicite:110]{index=110}. Watermarking is seen as a way to enable AI text detection without requiring external classifiers. However, it can be defeated by paraphrasing and isn’t yet widely implemented in public models. It remains a proposed solution to help identify AI-generated content for misuse prevention (like academic cheating or disinformation).`,
    sources: [
      { title: "Anthropomorphism in AI – mentions Eliza effect & detection (AI and Ethics 2023)", url: "https://link.springer.com/article/10.1007/s43681-023-00259-0" }
    ],
    categories: ["safety"],
    tags: ["topic:misuse","type:technique"],
    related: ["ai-text-detection","zero-width-prompt-injection"],
    status: "draft",
    notes: ""
  },
  {
    slug: "chainforge",
    term: "ChainForge",
    aliases: [],
    definition: `A research tool (Harvard, 2023) for prompt engineers to systematically test and visualize prompts across different LLMs and settings. ChainForge provides a GUI to enter a base prompt and automatically generate variations or chains of prompts, then call the models and display all the outputs side by side. It supports A/B testing of prompts, as well as applying transformations (like paraphrasing or adding context) to prompts in bulk. The goal is to treat prompt design scientifically – one can see which phrasing yields the preferred result under controlled conditions. It’s useful for prompt debugging and benchmarking model behavior. ChainForge’s development highlights the emergence of dedicated prompt engineering IDEs or studios to streamline the prompt iteration process.`,
    sources: [
      { title: "Liu et al., CHI 2023: ChainForge Paper", url: "https://arxiv.org/abs/2212.08794" }
    ],
    categories: ["tools"],
    tags: ["topic:analysis","type:software"],
    related: ["guidance-library","prompt-perfect"],
    status: "draft",
    notes: ""
  },
  {
    slug: "promptperfect",
    term: "PromptPerfect",
    aliases: [],
    definition: `A commercial prompt optimization service (launched 2023) that takes an input prompt and returns a refined version aimed at getting better results from LLMs. PromptPerfect’s algorithms perform operations like rephrasing, adding context, adjusting specificity, and removing ambiguity – essentially an automated prompt engineering assistant. For example, given a rough prompt, it might add explicit instructions or break it into steps if it knows the target model prefers that. It supports multiple languages and models. While tools like this can save time, they also demonstrate that prompt engineering has heuristics that can be learned – and even AI can attempt to optimize prompts for other AI. Some users reported mixed success: it often improves clarity, but not always model accuracy. Nonetheless, PromptPerfect represents the trend of tooling that encapsulates community best practices for prompts and applies them automatically.`,
    sources: [
      { title: "PromptPerfect website and documentation", url: "https://promptperfect.jina.ai/" }
    ],
    categories: ["tools"],
    tags: ["topic:automation","type:service"],
    related: ["automatic-prompt-engineer-ape","greedy-prompt-engineering-strategy-greedy-pes"],
    status: "draft",
    notes: ""
  },
  {
    slug: "voyager-agent",
    term: "Voyager (Autonomous Agent)",
    aliases: [],
    definition: `An experimental GPT-4-powered agent introduced in 2023 that learned to play Minecraft autonomously, making it one of the first lifelong learning LLM agents. Voyager used GPT-4 prompts to generate and execute Minecraft code, collected feedback from the game environment, and iteratively improved its skills without human intervention. It notably stored discovered skills in a prompt library and reused them (a form of self-memory). The project demonstrated that an LLM can explore and adapt in an open-ended world, writing its own prompts for new goals. It’s an early showcase of an autonomous AI “player” and is often referenced as a step toward agents that can continuously learn. In prompt engineering, Voyager highlights concepts like skill libraries (storing prompts/results for later) and environment feedback loops as extensions beyond static prompting.`,
    sources: [
      { title: "Voyager: An Open-Ended Embodied Agent (ArXiv 2023)", url: "https://arxiv.org/abs/2305.16291" }
    ],
    categories: ["architectures"],
    tags: ["topic:agents","type:research"],
    related: ["auto-gpt","react"],
    status: "draft",
    notes: ""
  },
  {
    slug: "promptomatix",
    term: "Promptomatix",
    aliases: [],
    definition: `A proposed automated prompt-generation framework (2024) that builds on prompt evaluation tools (like PromptBench or PromptFoo) by adding optimization loops:contentReference[oaicite:111]{index=111}. While prior tools could evaluate prompts, Promptomatix also suggests new candidate prompts (using techniques like genetic algorithms or LLM-based rewriters) and tests them, iteratively improving a prompt for a given task. The system can integrate human-in-the-loop feedback or run fully autonomously. Promptomatix is emblematic of the next generation of prompt engineering tools that not only assist in evaluation but actively generate better prompts – effectively partial automation of a prompt engineer’s job. It’s often discussed alongside other automated prompting efforts like AutoPrompt or APE, highlighting how prompt engineering is becoming a target for optimization algorithms.`,
    sources: [
      { title: "Li et al., Promptomatix framework (ArXiv 2024)", url: "https://arxiv.org/abs/2306.07311" }
    ],
    categories: ["tools"],
    tags: ["topic:automation","type:research"],
    related: ["greedy-prompt-engineering-strategy-greedy-pes","promptperfect"],
    status: "draft",
    notes: ""
  },
  {
    slug: "conversation-routines-cr",
    term: "Conversation Routines (CR)",
    aliases: [],
    definition: `A structured prompt engineering framework for task-oriented dialogues (proposed 2024):contentReference[oaicite:112]{index=112}. Conversation Routines break down typical dialog flows (like those in customer service or booking systems) into reusable prompt templates for each part of the interaction (greeting, collecting info, confirming, closing, etc.). By defining these routines, developers can systematically prompt an LLM through a complex transaction. CR was introduced to make LLM-driven dialog systems more modular and reliable, by providing a scaffold of mini-prompts for each “routine” instead of one giant prompt. It reflects how prompt patterns can be standardized for particular domains (like requirements elicitation or support chats) so that the conversation stays on track.`,
    sources: [
      { title: "Prompt Engineering for Dialog Systems (ArXiv 2024)", url: "https://arxiv.org/abs/2308.10826" }
    ],
    categories: ["prompting strategies"],
    tags: ["topic:dialog","type:framework"],
    related: ["role-playing-prompting","prompt-templates"],
    status: "draft",
    notes: ""
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
