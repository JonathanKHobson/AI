/*
  Biases / Stereotypes / Ethics Library — v1
  ------------------------------------------
  Purpose: Curate biases, stereotypes, LLM-specific biases, mitigation techniques, and ethical dilemmas
           in a single, searchable dataset for Prompt Builder.

  Minimal schema used by v1 UI / scripts (others can live under `meta` and be ignored by v1):

  {
    id: string,              // kebab-case stable id (used for lookups/relations)
    name: string,            // human label (picker/display)
    kind: string,            // 'bias' | 'stereotype' | 'llm-bias' | 'technique' | 'dilemma'
    category: string,        // broad family (e.g., 'cognitive','cultural','ai','ethics')
    summary: string,         // 1–2 lines quick definition
    definition?: string,     // longer description/narrative
    mechanisms?: string[],   // how it operates / cognitive or structural drivers
    indicators?: string[],   // cues/phrases/patterns that hint it’s present
    contexts?: string[],     // where it commonly appears (domains, workflows)
    harms?: string[],        // typical impacts/risks
    mitigations?: string[],  // practical countermeasures or checks
    examples?: string[],     // short, neutral examples (1 line each)
    related?: string[],      // ids of related items in this file
    tags?: string[],         // key:value chips for search/filters (e.g., 'class:cognitive','domain:research')
    mappings?: {             // external taxonomies/refs (optional)
      wikipedia?: string,
      wikidata?: string
    },
    meta?: {
      synonyms?: string[],   // extra search hooks
      search_text?: string   // set automatically at load — do not hand-edit
    }
  }

  Export style: identical to persona.data.js (IIFE, attach to window + module.exports).
*/

;(function(root){
  const BIASES = [

    // ===== Cognitive biases (general) =====
    {
      id: "anchoring-bias",
      name: "Anchoring bias",
      kind: "bias",
      category: "cognitive",
      summary: "Over-weighting the first piece of information (the anchor) when making judgments.",
      definition: "Initial numbers, facts, or frames disproportionately influence later estimates and decisions even when the anchor is arbitrary.",
      mechanisms: ["Primacy effect", "Insufficient adjustment", "Heuristic substitution"],
      indicators: ["'Start from last quarter’s price…'", "Negotiations fixate on the first offer"],
      contexts: ["Estimation", "Pricing", "Negotiation", "Forecasting"],
      harms: ["Sticky pricing", "Under-adjusted forecasts", "Manipulable decisions"],
      mitigations: ["Generate multiple independent anchors", "Blind reviews", "Consider ranges then converge"],
      examples: ["A first salary number narrows the final range despite new information."],
      related: ["framing-effect","confirmation-bias"],
      tags: ["class:cognitive","phase:decision","risk:medium"]
    },

    {
      id: "confirmation-bias",
      name: "Confirmation bias",
      kind: "bias",
      category: "cognitive",
      summary: "Preferring, recalling, or seeking information that confirms existing beliefs.",
      mechanisms: ["Selective exposure", "Motivated reasoning"],
      contexts: ["Research synthesis", "Product discovery", "Diagnostics"],
      harms: ["Cherry-picking", "Missed disconfirming evidence", "Overconfidence"],
      mitigations: ["Pre-register criteria", "Devil’s advocate review", "List 'what would change my mind?'"],
      examples: ["Including only favorable case studies in a business case."],
      tags: ["class:cognitive","phase:analysis","risk:high"]
    },
    
    {
  id: "bias-blind-spot",
  name: "Bias blind spot",
  kind: "bias",
  category: "cognitive",
  summary: "Seeing oneself as less biased than other people.",
  definition: "We detect and criticize bias in others more readily than in ourselves, inflating our sense of objectivity.",
  contexts: ["Debate", "Hiring", "Peer review"],
  mitigations: ["Third-party audits", "Premortems", "Red-team reviews"],
  examples: ["A reviewer flags others’ confirmation bias while ignoring their own."],
  tags: ["class:cognitive","topic:metacognition","risk:medium"]
},
{
  id: "gamblers-fallacy",
  name: "Gambler’s fallacy",
  kind: "bias",
  category: "cognitive",
  summary: "Believing past random outcomes change the odds of future ones.",
  definition: "Assuming streaks must 'balance out' despite independence (e.g., coin flips).",
  contexts: ["Betting", "Forecasting", "Quality sampling"],
  mitigations: ["Independence reminders", "Base-rate training"],
  examples: ["Expecting red at roulette after a run of black."],
  tags: ["class:cognitive","topic:probability","risk:medium"]
},
{
  id: "omission-bias",
  name: "Omission bias",
  kind: "bias",
  category: "cognitive",
  summary: "Judging harmful actions as worse than equally harmful inactions.",
  definition: "Moral weight is unevenly assigned, excusing 'not acting' relative to acting.",
  contexts: ["Policy", "Medicine", "Compliance"],
  mitigations: ["Compare counterfactuals", "List harms of inaction"],
  examples: ["Refusing a safe vaccine seems 'safer' than consenting to it."],
  tags: ["class:cognitive","topic:ethics","risk:medium"]
},
{
  id: "proportionality-bias",
  name: "Proportionality bias",
  kind: "bias",
  category: "cognitive",
  summary: "Assuming big events must have big causes.",
  definition: "Preference for cause–effect symmetry leads to overlooking small or random causes of large outcomes.",
  contexts: ["Root-cause analysis", "Forensics", "Epidemiology"],
  mitigations: ["Consider stochastic causes", "Weight small-multiple explanations"],
  examples: ["Rejecting mundane causes for market crashes."],
  tags: ["class:cognitive","topic:causality","risk:medium"]
},
{
  id: "moral-credential-effect",
  name: "Moral credential effect",
  kind: "bias",
  category: "cognitive",
  summary: "Past moral behavior licenses later questionable behavior.",
  definition: "Earning 'moral credit' increases willingness to act less ethically later.",
  contexts: ["Hiring", "Governance", "Personal conduct"],
  mitigations: ["Separate past merit from current judgment", "Process transparency"],
  examples: ["Excusing biased jokes due to an allyship record."],
  tags: ["class:cognitive","topic:ethics","risk:medium"]
},
{
  id: "self-serving-bias",
  name: "Self-serving bias",
  kind: "bias",
  category: "cognitive",
  summary: "Attributing successes to self and failures to external factors.",
  definition: "Protects self-esteem at the cost of accuracy.",
  contexts: ["Performance reviews", "Postmortems"],
  mitigations: ["External facilitation", "Pre-defined metrics"],
  examples: ["Blaming market conditions for missed targets, crediting skill for wins."],
  tags: ["class:cognitive","topic:attribution","risk:medium"]
},
{
  id: "framing-effect",
  name: "Framing effect",
  kind: "bias",
  category: "cognitive",
  summary: "Different conclusions from the same facts depending on wording.",
  definition: "Gain vs. loss frames, or reference points, shift preferences.",
  contexts: ["Product copy", "Policy comms", "Clinical consent"],
  mitigations: ["Neutral reframe checks", "Show both gain/loss versions"],
  examples: ["Choosing a '95% survival' option over '5% mortality' despite equivalence."],
  tags: ["class:cognitive","topic:framing","risk:high"]
},
{
  id: "actor-observer-bias",
  name: "Actor–observer bias",
  kind: "bias",
  category: "cognitive",
  summary: "Our actions -> situational causes; others’ actions -> dispositions.",
  definition: "Attribution asymmetry based on perspective and information access.",
  contexts: ["Feedback", "Conflict resolution"],
  mitigations: ["Swap perspectives", "Ask for situational constraints"],
  examples: ["They’re late because they’re lazy; I’m late due to traffic."],
  tags: ["class:cognitive","topic:attribution","risk:medium"]
},
{
  id: "picture-superiority-effect",
  name: "Picture superiority effect",
  kind: "bias",
  category: "cognitive",
  summary: "Images are remembered better than words.",
  definition: "Dual-coding and richer encoding give pictures memory advantages.",
  contexts: ["Learning design", "UX content", "Marketing"],
  mitigations: ["Add visuals for key info", "Alt-text for accessibility"],
  examples: ["Infographics outperform text summaries in recall tests."],
  tags: ["class:cognitive","topic:memory","risk:low"]
},
{
  id: "outcome-bias",
  name: "Outcome bias",
  kind: "bias",
  category: "cognitive",
  summary: "Judging a decision by its result, not by its process/odds at the time.",
  definition: "Hindsight of outcomes contaminates evaluation of prior choices.",
  contexts: ["Postmortems", "Governance", "Investing"],
  mitigations: ["Ex ante criteria logs", "Decision journals"],
  examples: ["A lucky win is praised as skillful strategy."],
  related: ["outcome-bias-llm"],
  tags: ["class:cognitive","topic:evaluation","risk:medium"]
},
{
  id: "mere-exposure-effect",
  name: "Mere-exposure effect",
  kind: "bias",
  category: "cognitive",
  summary: "Preference increases with familiarity alone.",
  definition: "Repeated exposure boosts liking even without added information.",
  contexts: ["Branding", "Political comms", "Hiring (CV review)"],
  mitigations: ["Blind review", "Diversity of options"],
  examples: ["Favoring a logo seen often over a better new design."],
  tags: ["class:cognitive","topic:familiarity","risk:medium"]
},
{
  id: "hard-easy-effect",
  name: "Hard–easy effect",
  kind: "bias",
  category: "cognitive",
  summary: "Overestimate hard-task performance, underestimate easy-task performance.",
  definition: "Confidence regresses toward 50% irrespective of true difficulty.",
  contexts: ["Skill self-assessment", "Exam calibration"],
  mitigations: ["Calibration training", "Feedback with Brier scores"],
  examples: ["Feeling 'about right' on very hard quizzes."],
  tags: ["class:cognitive","topic:metacognition","risk:medium"]
},
{
  id: "survivorship-bias",
  name: "Survivorship bias",
  kind: "bias",
  category: "cognitive",
  summary: "Focusing on 'winners' and ignoring the unseen failures.",
  definition: "Skips the denominator, inflating success narratives.",
  contexts: ["Case studies", "Investment", "Hiring pipelines"],
  mitigations: ["Account for base rates", "Include failure data"],
  examples: ["Studying only successful startups for strategy lessons."],
  tags: ["class:cognitive","topic:sampling","risk:high"]
},
{
  id: "baader-meinhof-phenomenon",
  name: "Baader–Meinhof phenomenon",
  kind: "bias",
  category: "cognitive",
  summary: "Newly noticed things seem to appear everywhere.",
  definition: "Frequency illusion from selective attention plus confirmation.",
  contexts: ["Trend spotting", "User research"],
  mitigations: ["Track actual frequencies", "Beware salience spikes"],
  examples: ["After learning a term, 'seeing it' constantly online."],
  tags: ["class:cognitive","topic:attention","risk:low"],
  meta: { synonyms: ["frequency-illusion"] }
},
{
  id: "availability-heuristic",
  name: "Availability heuristic",
  kind: "bias",
  category: "cognitive",
  summary: "Judging likelihood by ease of recall.",
  definition: "Salient or recent examples inflate perceived probability.",
  contexts: ["Risk assessment", "Product decisions", "Safety"],
  mitigations: ["Use base rates", "Consult data not anecdotes"],
  examples: ["Overestimating plane crashes after news coverage."],
  tags: ["class:cognitive","topic:memory","risk:high"]
},
{
  id: "dunning-kruger-effect",
  name: "Dunning–Kruger effect",
  kind: "bias",
  category: "cognitive",
  summary: "Low-skill individuals overestimate ability; experts may underestimate.",
  definition: "Metacognitive deficits distort self-evaluation at both ends.",
  contexts: ["Training", "Performance feedback"],
  mitigations: ["Objective skill tests", "Mentor calibration"],
  examples: ["Beginners rating themselves 'advanced' after a tutorial."],
  tags: ["class:cognitive","topic:metacognition","risk:medium"]
},
{
  id: "halo-effect",
  name: "Halo effect",
  kind: "bias",
  category: "cognitive",
  summary: "A positive trait spills over into other judgments.",
  definition: "Global impressions bias evaluations of unrelated attributes.",
  contexts: ["Hiring", "Reviews", "Brand perception"],
  mitigations: ["Attribute-by-attribute scoring", "Blind screens"],
  examples: ["Attractive candidates rated as more competent."],
  tags: ["class:cognitive","topic:attribution","risk:high"]
},
{
  id: "pygmalion-effect",
  name: "Pygmalion effect",
  kind: "bias",
  category: "cognitive",
  summary: "Higher expectations lead to better performance.",
  definition: "Expectancy shapes behavior via feedback and attention.",
  contexts: ["Education", "Management", "Coaching"],
  mitigations: ["Equitable expectations", "Transparent criteria"],
  examples: ["Teachers’ belief in students raising outcomes."],
  tags: ["class:cognitive","topic:expectations","risk:medium"],
  meta: { synonyms: ["rosenthal-effect","self-fulfilling-prophecy"] }
},
{
  id: "decoy-effect",
  name: "Decoy effect",
  kind: "bias",
  category: "cognitive",
  summary: "A third 'asymmetric' option shifts preference between two.",
  definition: "Introducing an inferior decoy makes one target option look better.",
  contexts: ["Pricing", "Choice architecture", "E-commerce"],
  mitigations: ["Check for asymmetric dominance", "Simplify menus"],
  examples: ["Adding an overpriced medium to push users to large."],
  tags: ["class:cognitive","topic:choice-architecture","risk:medium"]
},
{
  id: "selection-bias",
  name: "Selection bias",
  kind: "bias",
  category: "cognitive",
  summary: "Non-random selection skews analysis.",
  definition: "Sample differs systematically from target population.",
  contexts: ["Research", "Surveying", "Product analytics"],
  mitigations: ["Randomization", "Stratified sampling", "Weighting"],
  examples: ["Only power-users respond to a feature survey."],
  related: ["selection-bias-llm","survivorship-bias"],
  tags: ["class:cognitive","topic:sampling","risk:high"]
},
// NOTE: skip if already present above
{
  id: "anchoring-bias",
  name: "Anchoring bias",
  kind: "bias",
  category: "cognitive",
  summary: "Relying too heavily on the first information (anchor).",
  definition: "Initial values unduly influence subsequent estimates and choices.",
  contexts: ["Negotiation", "Forecasting", "Pricing"],
  mitigations: ["Multiple independent anchors", "Range estimates"],
  examples: ["First offer sets the negotiating range."],
  tags: ["class:cognitive","topic:judgment","risk:high"]
},
// NOTE: skip if already present above
{
  id: "confirmation-bias",
  name: "Confirmation bias",
  kind: "bias",
  category: "cognitive",
  summary: "Seeking/interpreting evidence that confirms prior beliefs.",
  definition: "Disconfirming data is discounted or ignored.",
  contexts: ["Research", "Diagnostics", "Strategy"],
  mitigations: ["Pre-register criteria", "Devil’s advocate reviews"],
  examples: ["Including only favorable case studies in a proposal."],
  related: ["confirmation-bias-llm"],
  tags: ["class:cognitive","topic:reasoning","risk:high"]
},
{
  id: "overconfidence-effect",
  name: "Overconfidence effect",
  kind: "bias",
  category: "cognitive",
  summary: "Subjective confidence exceeds objective accuracy.",
  definition: "People overrate the precision of their beliefs/intervals.",
  contexts: ["Forecasting", "Trading", "Planning"],
  mitigations: ["Calibration training", "Proper scoring rules"],
  examples: ["Very narrow confidence intervals that miss often."],
  tags: ["class:cognitive","topic:metacognition","risk:high"]
},
{
  id: "egocentric-bias",
  name: "Egocentric bias",
  kind: "bias",
  category: "cognitive",
  summary: "Overweighting one’s own perspective and contribution.",
  definition: "Self-focus inflates perceived agreement and effort share.",
  contexts: ["Teamwork", "Negotiation"],
  mitigations: ["Perspective-taking", "Independent effort logs"],
  examples: ["Teammates’ effort totals sum to more than 100%."],
  tags: ["class:cognitive","topic:social-perception","risk:medium"]
},
{
  id: "information-bias",
  name: "Information bias",
  kind: "bias",
  category: "cognitive",
  summary: "Seeking information that doesn’t change the decision.",
  definition: "Preference for more data even when it lacks decision value.",
  contexts: ["Diagnostics", "Procurement", "Research"],
  mitigations: ["Value of information checks", "Stop rules"],
  examples: ["Ordering tests that won’t alter treatment."],
  tags: ["class:cognitive","topic:decision-quality","risk:medium"]
},
{
  id: "hindsight-bias",
  name: "Hindsight bias",
  kind: "bias",
  category: "cognitive",
  summary: "Past events seem predictable after they occur.",
  definition: "Outcome knowledge reshapes memory of prior uncertainty.",
  contexts: ["Legal review", "Postmortems", "Risk analysis"],
  mitigations: ["Time-stamped predictions", "Blind postmortems"],
  examples: ["'We knew it all along' after a surprise launch flop."],
  tags: ["class:cognitive","topic:memory","risk:medium"]
},
{
  id: "projection-bias",
  name: "Projection bias",
  kind: "bias",
  category: "cognitive",
  summary: "Overestimating how much others share our views/preferences.",
  definition: "Assuming current beliefs or states are widely held.",
  contexts: ["Product strategy", "Polling", "Negotiation"],
  mitigations: ["Diverse panels", "User research with out-groups"],
  examples: ["Designing features assuming your workflow is typical."],
  tags: ["class:cognitive","topic:social-perception","risk:medium"],
  meta: { synonyms: ["false-consensus-effect"] }
},
{
  id: "apophenia-bias",
  name: "Apophenia (illusory pattern perception)",
  kind: "bias",
  category: "cognitive",
  summary: "Perceiving meaningful patterns in random data.",
  definition: "Humans over-detect structure, connecting unrelated signals.",
  contexts: ["Analytics", "Trading", "Anomaly detection"],
  mitigations: ["Out-of-sample tests", "Multiple-comparisons control"],
  examples: ["Seeing 'signals' in noise from small samples."],
  tags: ["class:cognitive","topic:pattern-detection","risk:medium"],
  meta: { synonyms: ["patternicity"] }
},
{
  id: "serial-position-effect",
  name: "Serial position effect",
  kind: "bias",
  category: "cognitive",
  summary: "Best recall for first and last items; weakest for the middle.",
  definition: "Primacy and recency advantages in ordered recall.",
  contexts: ["Presentations", "Lists", "Study design"],
  mitigations: ["Chunking", "Vary order", "Reinforce mid-list items"],
  examples: ["Remembering the first and last candidates best."],
  tags: ["class:cognitive","topic:memory","risk:low"]
},
{
  id: "recency-bias",
  name: "Recency bias",
  kind: "bias",
  category: "cognitive",
  summary: "Overweighting recent events vs. older but relevant information.",
  definition: "Fresh information dominates judgment beyond its true value.",
  contexts: ["Performance reviews", "Investing", "News consumption"],
  mitigations: ["Lookback windows", "Weight historical baselines"],
  examples: ["Rating based on the last month’s work only."],
  related: ["recency-bias-llm","serial-position-effect"],
  tags: ["class:cognitive","topic:temporality","risk:medium"]
},
{
  id: "authority-bias",
  name: "Authority bias",
  kind: "bias",
  category: "cognitive",
  summary: "Overvaluing opinions of authority figures regardless of content.",
  definition: "Status cues beat evidence evaluation.",
  contexts: ["Clinical decisions", "Security reviews", "Education"],
  mitigations: ["Argument-from-evidence prompts", "Blind peer checks"],
  examples: ["Accepting a senior exec’s plan without scrutiny."],
  tags: ["class:cognitive","topic:social-influence","risk:high"]
},
{
  id: "unit-bias",
  name: "Unit bias",
  kind: "bias",
  category: "cognitive",
  summary: "Default 'unit' is perceived as the recommended amount.",
  definition: "Packaging/portion size frames appropriate consumption.",
  contexts: ["Nutrition", "UX defaults", "Pricing tiers"],
  mitigations: ["Right-size defaults", "Explain serving sizes"],
  examples: ["Consuming a whole package as the 'normal' portion."],
  tags: ["class:cognitive","topic:defaults","risk:medium"]
},
{
  id: "availability-cascade",
  name: "Availability cascade",
  kind: "bias",
  category: "cognitive",
  summary: "Repetition makes beliefs seem more plausible.",
  definition: "Social amplification and media echo increase perceived truth.",
  contexts: ["Social media", "PR", "Politics"],
  mitigations: ["Source diversity", "Fact-check interjections"],
  examples: ["A rumor becomes 'common knowledge' via retweets."],
  tags: ["class:cognitive","topic:information-dynamics","risk:high"]
},
{
  id: "bandwagon-effect",
  name: "Bandwagon effect",
  kind: "bias",
  category: "cognitive",
  summary: "Adopting beliefs/behaviors because many others do.",
  definition: "Conformity and social proof drive uptake independent of evidence.",
  contexts: ["Consumer trends", "Elections", "Workplace tools"],
  mitigations: ["Independent evaluation", "Staggered rollouts"],
  examples: ["Picking a framework because 'everyone uses it'."],
  tags: ["class:cognitive","topic:social-influence","risk:medium"]
},
{
  id: "illusory-truth-effect",
  name: "Illusory truth effect",
  kind: "bias",
  category: "cognitive",
  summary: "Repeated statements feel truer, even when false.",
  definition: "Fluency from repetition is misread as accuracy.",
  contexts: ["News literacy", "Onboarding", "Security awareness"],
  mitigations: ["Fact-checking", "Citations next to claims"],
  examples: ["Believing a myth after seeing it many times online."],
  tags: ["class:cognitive","topic:fluency","risk:high"]
},
{
  id: "next-in-line-effect",
  name: "Next-in-line effect",
  kind: "bias",
  category: "cognitive",
  summary: "Poor recall for what’s said just before/after one’s own turn.",
  definition: "Self-focus before speaking impairs encoding of adjacent info.",
  contexts: ["Group introductions", "Workshops"],
  mitigations: ["Written notes", "Repeat-back rounds"],
  examples: ["Forgetting the person who spoke right before you."],
  tags: ["class:cognitive","topic:attention","risk:low"]
},
{
  id: "ingroup-bias",
  name: "Ingroup bias",
  kind: "bias",
  category: "cognitive",
  summary: "Favoring one’s own group over others.",
  definition: "Preferential treatment and trust toward ingroup members.",
  contexts: ["Hiring", "Peer review", "Resource allocation"],
  mitigations: ["Blind evaluation", "Diverse panels"],
  examples: ["Scoring candidates from your alma mater higher."],
  tags: ["class:cognitive","topic:social-identity","risk:high"]
},
{
  id: "spotlight-effect",
  name: "Spotlight effect",
  kind: "bias",
  category: "cognitive",
  summary: "Overestimating how much others notice you.",
  definition: "We believe our appearance/behavior is more scrutinized than it is.",
  contexts: ["Public speaking", "Onboarding"],
  mitigations: ["Norming data", "Rehearsal/feedback loops"],
  examples: ["Assuming everyone noticed a small error in a talk."],
  tags: ["class:cognitive","topic:self-consciousness","risk:low"]
},
{
  id: "choice-supportive-bias",
  name: "Choice-supportive bias",
  kind: "bias",
  category: "cognitive",
  summary: "Remembering chosen options as better than they were.",
  definition: "Post-choice memory distorts to favor the selected option.",
  contexts: ["Customer satisfaction", "Tool migrations"],
  mitigations: ["Pre/post criteria comparison", "Independent reviews"],
  examples: ["Recalling only positives about a purchased product."],
  tags: ["class:cognitive","topic:memory","risk:medium"]
},
{
  id: "ostrich-effect",
  name: "Ostrich effect",
  kind: "bias",
  category: "cognitive",
  summary: "Ignoring negative or risky information.",
  definition: "Avoidance of unpleasant facts to reduce anxiety now.",
  contexts: ["Finance", "Health", "Security"],
  mitigations: ["Default alerts", "Gentle surfacing of risks"],
  examples: ["Not opening bills or ignoring security warnings."],
  tags: ["class:cognitive","topic:avoidance","risk:high"]
},
{
  id: "selective-perception-bias",
  name: "Selective perception bias",
  kind: "bias",
  category: "cognitive",
  summary: "Expectations shape what we notice and how we interpret it.",
  definition: "Top-down beliefs filter and color incoming information.",
  contexts: ["Usability tests", "Ethnography", "Performance review"],
  mitigations: ["Predefine observation rubrics", "Counter-hypothesis runs"],
  examples: ["Seeing only evidence that a design is 'intuitive'."],
  tags: ["class:cognitive","topic:attention","risk:medium"]
},
{
  id: "peak-end-rule",
  name: "Peak–end rule",
  kind: "bias",
  category: "cognitive",
  summary: "Experiences judged mainly by their peak and their end.",
  definition: "Duration is underweighted; extremes and endings dominate recall.",
  contexts: ["Service design", "Healthcare", "Events"],
  mitigations: ["Engineer a positive ending", "Smooth pain peaks"],
  examples: ["A long wait forgiven by a great final interaction."],
  tags: ["class:cognitive","topic:memory","risk:medium"]
},

    // ===== Cultural / stereotype biases =====
    {
      id: "western-centrism",
      name: "Western-centrism",
      kind: "bias",
      category: "cultural",
      summary: "Treating Western norms (e.g., secularism, capitalism, linear time) as universal or superior.",
      definition: "Cultural defaulting that elevates Western institutions, aesthetics, and language as 'standard', marginalizing other traditions and knowledge systems.",
      mechanisms: ["Availability dominance of Western media", "Institutional path dependence"],
      indicators: ["'Universal' = North American/European sample", "English as assumed default"],
      contexts: ["Curriculum design", "Policy analysis", "Global UX", "International reporting"],
      harms: ["Erasure of local practice", "Poor fit globally", "Legitimacy loss"],
      mitigations: ["Localize with co-design", "Cite non-Western sources", "Translate & test across languages"],
      examples: ["Assuming Western legal frameworks are the baseline for all governance debates."],
      tags: ["class:cultural","theme:western-centric","domain:global"]
    },
    
    {
  id: "individualism-over-collectivism",
  name: "Individualism over collectivism",
  kind: "bias",
  category: "cultural",
  summary: "Prioritizing individual rights/achievements over collective duties/goals.",
  definition: "Treating individual autonomy, self-expression, and personal merit as universally preferable, discounting communal obligations and group harmony.",
  mechanisms: ["WEIRD sampling", "Value priming", "Meritocratic framing"],
  indicators: ["Incentives target solo performance", "“Be a self-starter” as default"],
  contexts: ["Org design", "Education", "Policy analysis", "UX research"],
  harms: ["Misfit with collectivist norms", "Lower group cohesion", "Participation gaps"],
  mitigations: ["Add group-oriented goals", "Co-design with local stakeholders", "Evaluate team-based incentives"],
  examples: ["Assuming individual bonuses motivate teams in strongly collectivist workplaces."],
  related: ["western-centrism"],
  tags: ["class:cultural","theme:western-centric","topic:individualism"]
},
{
  id: "linear-time-perception",
  name: "Linear time perception",
  kind: "bias",
  category: "cultural",
  summary: "Treating time as linear/progressive and schedules as rigid universally.",
  definition: "Defaulting to clock time, strict deadlines, and progress narratives, overlooking cyclical or event-based time orientations.",
  mechanisms: ["Industrial-time norms", "Productivity narratives"],
  indicators: ["Strict start/stop expectations across contexts", "“Falling behind” framing"],
  contexts: ["Project planning", "Cross-cultural collaboration", "Fieldwork scheduling"],
  harms: ["Coordination friction", "Misread reliability", "Exclusion of cyclical practices"],
  mitigations: ["Use event-based milestones", "Add buffer windows", "Clarify local time norms"],
  examples: ["Interpreting flexible meeting windows as disrespect rather than a different scheduling norm."],
  related: ["western-centrism"],
  tags: ["class:cultural","theme:western-centric","topic:time"]
},
{
  id: "universalism-norms",
  name: "Universalism",
  kind: "bias",
  category: "cultural",
  summary: "Assuming Western legal/moral/cultural norms apply everywhere.",
  definition: "Treating particular Western standards as neutral universals, minimizing local customs and plural ethical frameworks.",
  mechanisms: ["Normative projection", "Institutional prestige signals"],
  indicators: ["“Best practice” lists sourced from one region", "One-size policies"],
  contexts: ["Policy transfer", "Academic standards", "Compliance"],
  harms: ["Policy failure in situ", "Cultural erasure", "Legitimacy loss"],
  mitigations: ["Context analysis", "Local partner review", "Plural frameworks comparison"],
  examples: ["Mandating dress codes from Western offices for branches with different cultural norms."],
  related: ["western-centrism"],
  tags: ["class:cultural","theme:western-centric","topic:universalism"]
},
{
  id: "material-success-capitalism",
  name: "Material success & capitalism",
  kind: "bias",
  category: "cultural",
  summary: "Equating prosperity and progress with wealth, consumerism, and markets.",
  definition: "Valuing GDP, consumption, and private enterprise as primary success metrics while sidelining non-market welfare measures.",
  mechanisms: ["Economic growth ideology", "Status consumption"],
  indicators: ["Progress = GDP or VC funding only", "Market-first prescriptions"],
  contexts: ["Development policy", "Impact evaluation", "Corporate strategy"],
  harms: ["Underweights social/ecological goods", "Narrow KPIs"],
  mitigations: ["Add multidimensional metrics", "Social cost/benefit analysis", "Community-defined outcomes"],
  examples: ["Judging a program successful solely by income gains, ignoring social cohesion effects."],
  related: ["western-centrism","environmental-practices"],
  tags: ["class:cultural","theme:western-centric","topic:economics"]
},
{
  id: "secularism-default",
  name: "Secularism (as default)",
  kind: "bias",
  category: "cultural",
  summary: "Assuming secular governance and discourse are normative everywhere.",
  definition: "Treating separation of religion and state, and secular reasoning styles, as the standard baseline, minimizing religious governance and cosmologies.",
  mechanisms: ["Laïcité prestige", "Institutional copying"],
  indicators: ["Religion omitted from stakeholder maps", "Faith groups consulted last"],
  contexts: ["Civics", "Health policy", "Education curricula"],
  harms: ["Missed legitimacy channels", "Community pushback"],
  mitigations: ["Religious stakeholder mapping", "Plural justifications for policy"],
  examples: ["Designing health campaigns without accounting for influential faith leaders."],
  related: ["western-centrism"],
  tags: ["class:cultural","theme:western-centric","topic:religion-state"]
},
{
  id: "western-democratic-models",
  name: "Western democratic models",
  kind: "bias",
  category: "cultural",
  summary: "Treating Western-style democracy as universally superior and portable.",
  definition: "Promoting liberal-democratic structures as end-state norms while overlooking hybrid or locally adapted governance.",
  mechanisms: ["Teleology of development", "Institutional isomorphism"],
  indicators: ["Template constitutions", "Electoralism = democracy"],
  contexts: ["Governance aid", "Civics education", "International reporting"],
  harms: ["Fragile institutions", "Backlash", "Surface compliance"],
  mitigations: ["Political economy analysis", "Local power-mapping", "Iterative civic co-design"],
  examples: ["Pushing rapid elections without building trust or local accountability mechanisms."],
  related: ["western-centrism","universalism-norms"],
  tags: ["class:cultural","theme:western-centric","topic:governance"]
},
{
  id: "english-language-dominance",
  name: "English language dominance",
  kind: "bias",
  category: "cultural",
  summary: "Treating English as the default or 'universal' language.",
  definition: "Elevating English in research, media, and tooling, which sidelines non-English speakers and knowledge.",
  mechanisms: ["Publication incentives", "Tooling availability"],
  indicators: ["English-only UIs", "Citations ignore non-English sources"],
  contexts: ["Academia", "Software UX", "Global research/comms"],
  harms: ["Knowledge loss", "Access barriers", "Representation gaps"],
  mitigations: ["Multilingual interfaces", "Translated corpora", "Cite local-language sources"],
  examples: ["Assuming all participants can participate fully in English-only workshops."],
  related: ["western-centrism"],
  tags: ["class:cultural","theme:western-centric","topic:language"]
},
{
  id: "technological-superiority",
  name: "Technological superiority",
  kind: "bias",
  category: "cultural",
  summary: "Assuming Western tech/science approaches are inherently superior.",
  definition: "Defaulting to high-tech or Western scientific methods and devaluing indigenous, low-tech, or alternative knowledge systems.",
  mechanisms: ["Techno-solutionism", "R&D prestige bias"],
  indicators: ["'High-tech or bust' framing", "Dismissal of traditional practice"],
  contexts: ["Development", "Healthcare", "Conservation", "Education"],
  harms: ["Low adoption", "Cultural mismatch", "Missed low-cost options"],
  mitigations: ["Evidence review across methods", "Participatory trials", "Appropriate tech mapping"],
  examples: ["Choosing costly sensors over proven local environmental monitoring practices."],
  related: ["western-centrism","environmental-practices"],
  tags: ["class:cultural","theme:western-centric","topic:technology"]
},
{
  id: "western-educational-superiority",
  name: "Western educational superiority",
  kind: "bias",
  category: "cultural",
  summary: "Treating Western curricula, pedagogy, and credentials as the gold standard.",
  definition: "Assuming prestige and effectiveness of Western institutions generalize globally, sidelining local epistemologies and teaching styles.",
  mechanisms: ["Ranking fetish", "Credentialism"],
  indicators: ["Imports syllabi wholesale", "Accreditation as proxy for fit"],
  contexts: ["Higher ed partnerships", "K-12 reform", "Professional training"],
  harms: ["Curriculum misfit", "Cultural alienation"],
  mitigations: ["Co-develop syllabi", "Blend pedagogies", "Recognize local accreditation"],
  examples: ["Replacing local history units with Western civ to 'raise standards'."],
  related: ["western-centrism","english-language-dominance"],
  tags: ["class:cultural","theme:western-centric","topic:education"]
},
{
  id: "western-media-representation",
  name: "Western media representation",
  kind: "bias",
  category: "cultural",
  summary: "Overrepresenting Western lifestyles and values as default in global media.",
  definition: "Media pipelines center Western stories, aesthetics, and heroes, shaping perceived normalcy and desirability.",
  mechanisms: ["Distribution power", "Cultural capital markets"],
  indicators: ["Casting defaults to Western archetypes", "Import-heavy content libraries"],
  contexts: ["Entertainment", "News", "Advertising"],
  harms: ["Stereotyping", "Self-image distortions", "Market crowd-out"],
  mitigations: ["Local commissioning", "Diverse writers’ rooms", "Regional quotas/targets"],
  examples: ["Stock imagery offers only Western office archetypes for 'professional'."],
  related: ["western-centrism","health-beauty-standards"],
  tags: ["class:cultural","theme:western-centric","topic:media"]
},
{
  id: "freedom-human-rights-western-framing",
  name: "Freedom & human rights (Western framing)",
  kind: "bias",
  category: "cultural",
  summary: "Portraying Western notions of freedom/rights as the only legitimate form.",
  definition: "Elevating Western civil-political rights framings while downplaying alternative emphases (e.g., duties, solidarity, socio-economic rights).",
  mechanisms: ["Rights discursive dominance", "Cold War legacies"],
  indicators: ["Civil rights prioritized; socio-economic rights minimized"],
  contexts: ["Advocacy", "International law education", "Policy design"],
  harms: ["Narrow remedies", "Cultural resistance"],
  mitigations: ["Rights pluralism review", "Balance with duties/solidarity", "Contextual jurisprudence"],
  examples: ["Designing reforms that prize speech rights while ignoring land or labor rights central to locals."],
  related: ["western-centrism","universalism-norms"],
  tags: ["class:cultural","theme:western-centric","topic:rights"]
},
{
  id: "health-beauty-standards",
  name: "Health & beauty standards (Western)",
  kind: "bias",
  category: "cultural",
  summary: "Treating Western body/beauty norms and health practices as default.",
  definition: "Elevating Western aesthetics, body types, and biomedical practices while marginalizing other standards and traditional health models.",
  mechanisms: ["Advertising influence", "Medical authority bias"],
  indicators: ["Size/skin/hair ideals coded as 'professional' or 'healthy'"],
  contexts: ["Healthcare", "Hiring", "Marketing", "Media"],
  harms: ["Body dissatisfaction", "Discrimination", "Mistrust of care"],
  mitigations: ["Inclusive imagery", "Culturally safe care", "Localized clinical guidance"],
  examples: ["Classifying natural hairstyles as 'unprofessional' in grooming codes."],
  related: ["western-centrism","western-media-representation"],
  tags: ["class:cultural","theme:western-centric","topic:beauty-health"]
},
{
  id: "food-cuisine-preferences",
  name: "Food & cuisine preferences (Western)",
  kind: "bias",
  category: "cultural",
  summary: "Elevating Western foods/dining practices as standard or superior.",
  definition: "Treating Western culinary norms (courses, utensils, flavors) as default while exoticizing or sidelining other traditions.",
  mechanisms: ["Culinary prestige markets", "Tourist gaze"],
  indicators: ["Menus/classifications centered on Western categories"],
  contexts: ["Hospitality", "Nutrition guidance", "Cultural programming"],
  harms: ["Cultural stereotyping", "Nutritional mismatches"],
  mitigations: ["Culturally responsive menus", "Local dietary baselines", "Avoid token 'ethnic' labels"],
  examples: ["Labeling non-Western dishes as 'ethnic food' while Western dishes are unmarked."],
  related: ["western-centrism"],
  tags: ["class:cultural","theme:western-centric","topic:cuisine"]
},
{
  id: "legal-ethical-norms-western",
  name: "Legal & ethical norms (Western default)",
  kind: "bias",
  category: "cultural",
  summary: "Assuming Western legal/ethical frameworks are universally more just.",
  definition: "Prioritizing Western jurisprudence and bioethics as neutral standards, downplaying customary, religious, or restorative traditions.",
  mechanisms: ["Case-law prestige", "Professional training pipelines"],
  indicators: ["Ethics boards mirror Western models", "Customary law ignored"],
  contexts: ["Clinical ethics", "Corporate compliance", "Transnational law"],
  harms: ["Legitimacy disputes", "Compliance theater"],
  mitigations: ["Hybrid models", "Community dispute-resolution inputs", "Comparative ethics review"],
  examples: ["Insisting on Western IRB norms without adapting to local community review processes."],
  related: ["western-centrism","secularism-default"],
  tags: ["class:cultural","theme:western-centric","topic:law-ethics"]
},
{
  id: "environmental-practices",
  name: "Environmental practices (Western-centric)",
  kind: "bias",
  category: "cultural",
  summary: "Centering Western conservation/environmental approaches over indigenous or local practices.",
  definition: "Preferring fortress conservation and technocratic metrics, minimizing indigenous stewardship and relational ecologies.",
  mechanisms: ["Conservation finance incentives", "Scientism"],
  indicators: ["Protected areas without local governance", "Carbon metrics only"],
  contexts: ["Conservation", "Climate policy", "Land management"],
  harms: ["Displacement", "Lower stewardship", "Policy backlash"],
  mitigations: ["Free, prior & informed consent", "Co-management", "Multiple ecological indicators"],
  examples: ["Creating parks with strict exclusion zones that marginalize indigenous land users."],
  related: ["western-centrism","technological-superiority"],
  tags: ["class:cultural","theme:western-centric","topic:environment"]
},

    // ===== LLM / AI-specific biases =====
    {
      id: "algorithmic-bias",
      name: "Algorithmic bias",
      kind: "llm-bias",
      category: "ai",
      summary: "Systematic errors from data, labeling, or models that yield unfair outcomes.",
      mechanisms: ["Skewed sampling", "Proxy variables", "Feedback loops"],
      contexts: ["Ranking", "Moderation", "Recommendation", "Screening"],
      harms: ["Disparate impact", "Stereotype reinforcement", "Reduced access"],
      mitigations: ["Bias auditing", "Counterfactual evaluation", "Fairness constraints"],
      examples: ["A classifier under-flags hate speech against low-resource languages."],
      tags: ["class:ai","topic:fairness","risk:high"]
    },
    
    {
  id: "cultural-bias-llm",
  name: "Cultural bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Cultural assumptions embedded in training data misfit non-dominant contexts.",
  definition: "Overrepresentation of specific cultural values, norms, and narratives leads models to treat them as defaults, misreading or marginalizing others.",
  mechanisms: ["WEIRD-source skew", "Prestige-media dominance"],
  indicators: ["Outputs recommend Western practices as 'standard'", "Local customs framed as exceptions"],
  contexts: ["Summarization", "Advice", "Policy framing", "UX copy"],
  harms: ["Stereotyping", "Exclusion", "Low trust outside dominant cultures"],
  mitigations: ["Regional corpora balance", "Cultural review panels", "Locale-aware evaluation sets"],
  examples: ["Suggesting handshake etiquette in regions where another greeting is normative."],
  related: ["western-centrism","language-bias-llm","geographical-bias-llm"],
  tags: ["class:ai","topic:culture","risk:high"]
},
{
  id: "language-bias-llm",
  name: "Language bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Dominant-language overrepresentation reduces quality for non-dominant languages.",
  definition: "Training/data pipelines prioritize certain languages (often English), driving uneven fluency, coverage, and cultural nuance.",
  mechanisms: ["Corpus imbalance", "Tokenizer/lm capacity differences"],
  indicators: ["Shorter, less specific answers in low-resource languages", "Code-switching penalized"],
  contexts: ["Multilingual QA", "Search/IR", "Moderation"],
  harms: ["Access barriers", "Knowledge loss", "Unequal safety performance"],
  mitigations: ["Multilingual datasets", "Balanced sampling/weighting", "Per-language eval/guidance"],
  examples: ["Safety guidance is less complete in Swahili than in English."],
  related: ["english-language-dominance","cultural-bias-llm"],
  tags: ["class:ai","topic:language","risk:high"]
},
{
  id: "gender-bias-llm",
  name: "Gender bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Stereotyped gender associations and uneven representation in outputs.",
  definition: "Stereotypes and imbalanced representation in sources lead to gendered role assumptions and misgendering.",
  mechanisms: ["Co-occurrence stereotypes", "Imbalanced occupational data"],
  indicators: ["Defaulting to male pronouns/titles", "Gendered job suggestions"],
  contexts: ["Career advice", "Persona generation", "Summarization"],
  harms: ["Stereotype reinforcement", "Misgendering", "Reduced opportunities"],
  mitigations: ["Counter-stereotypical augmentation", "Inclusive style constraints", "Bias audits by group"],
  examples: ["Describing nurses as 'she' and engineers as 'he' without prompt context."],
  related: ["annotation-bias-llm","selection-bias-llm"],
  tags: ["class:ai","topic:gender","risk:high"]
},
{
  id: "socioeconomic-bias-llm",
  name: "Socioeconomic bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Over/underrepresentation by class or income skews assumptions.",
  definition: "Datasets skewed toward higher-income, tech-accessible populations produce advice and norms that assume similar resources.",
  mechanisms: ["Platform user skew", "Paywalled source bias"],
  indicators: ["Assumes home ownership, private transport, or costly tools"],
  contexts: ["Consumer advice", "Hiring/coaching", "Civic guidance"],
  harms: ["Unrealistic recommendations", "Exclusion of low-resource users"],
  mitigations: ["Stratified sampling by SES", "Community-partner data", "Constraint-aware prompting"],
  examples: ["Recommending costly software to a small community nonprofit."],
  related: ["selection-bias-llm","reporting-bias-llm"],
  tags: ["class:ai","topic:socioeconomic","risk:medium"]
},
{
  id: "historical-bias-llm",
  name: "Historical bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Outdated viewpoints or terms persist due to historical source overhang.",
  definition: "Older materials carry past norms/terms that the model reproduces even when they conflict with current standards.",
  mechanisms: ["Archive overhang", "Temporal drift"],
  indicators: ["Obsolete terminology", "Recommendations misaligned with current practice"],
  contexts: ["Medical/legal advice", "Education content", "Policy backgrounds"],
  harms: ["Misinformation", "Harm to affected groups", "Poor decisions"],
  mitigations: ["Time-aware weighting", "Recency checks", "Temporal evaluation splits"],
  examples: ["Using outdated clinical terms that are no longer acceptable."],
  related: ["recency-bias-llm","reporting-bias-llm"],
  tags: ["class:ai","topic:temporality","risk:medium"]
},
{
  id: "geographical-bias-llm",
  name: "Geographical bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Global North/urban-centric perspectives overrepresent specific regions.",
  definition: "Spatial skew toward certain countries/regions and cities shapes examples, assumptions, and relevance.",
  mechanisms: ["Data availability", "Publisher concentration"],
  indicators: ["US/EU-centric examples by default", "Inaccurate local details elsewhere"],
  contexts: ["Travel info", "Civic guidance", "Market analysis"],
  harms: ["Irrelevance globally", "Stereotyping regions", "Errors in local facts"],
  mitigations: ["Regional corpus quotas", "Geo-balanced eval sets", "Local expert review"],
  examples: ["Using US housing laws as 'typical' in a global answer."],
  related: ["cultural-bias-llm","popularity-bias-llm"],
  tags: ["class:ai","topic:geography","risk:medium"]
},
{
  id: "ideological-bias-llm",
  name: "Ideological bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Embedded political/ethical leanings shape framings and recommendations.",
  definition: "Dominant-source viewpoints push models toward particular ideologies or moral frameworks, marginalizing alternatives.",
  mechanisms: ["Source ideology skew", "RL preference alignment"],
  indicators: ["One-sided framings", "Disfavored views straw-manned"],
  contexts: ["Policy analysis", "News summaries", "Debate scaffolding"],
  harms: ["Polarization", "Legitimacy loss", "Narrow solutions"],
  mitigations: ["Viewpoint diversity in corpora", "Balance tests", "'Argue both sides' scaffolds"],
  examples: ["Describing one economic school as 'the' objective view without caveats."],
  related: ["reporting-bias-llm","confirmation-bias-llm"],
  tags: ["class:ai","topic:ideology","risk:medium"]
},
{
  id: "confirmation-bias-llm",
  name: "Confirmation bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Model favors info that aligns with the prompt’s premise or dominant patterns.",
  definition: "Retrieval and generation amplify consensus patterns, under-surfacing disconfirming evidence.",
  mechanisms: ["Retriever ranking echo", "Preference modeling"],
  indicators: ["Affirms premise without testing alternatives", "Sparse counterarguments"],
  contexts: ["Research assistance", "Diagnostics", "Decision support"],
  harms: ["False certainty", "Missed risks/edge cases"],
  mitigations: ["Counter-argument prompting", "Critique/alternative steps", "Result diversification"],
  examples: ["Supporting a business hypothesis without surfacing contrary case studies."],
  related: ["confirmation-bias","selection-bias-llm","reporting-bias-llm"],
  tags: ["class:ai","topic:reasoning","risk:high"]
},
{
  id: "selection-bias-llm",
  name: "Selection bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Non-random source selection yields unrepresentative training data.",
  definition: "Data pipelines prefer accessible/visible sources, missing important segments.",
  mechanisms: ["Crawler constraints", "License availability"],
  indicators: ["Overreliance on a few domains", "Weak coverage of long-tail sources"],
  contexts: ["Pretraining", "Fine-tuning", "Retrieval index construction"],
  harms: ["Systematic blind spots", "Unfair outcomes"],
  mitigations: ["Sampling frame design", "Source diversification quotas", "De-duplication of overrepresented sites"],
  examples: ["Corpus drawn mostly from a handful of large platforms."],
  related: ["sampling-bias-llm","reporting-bias-llm"],
  tags: ["class:ai","topic:sampling","risk:high"]
},
{
  id: "reporting-bias-llm",
  name: "Reporting bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "What gets reported most shapes what the model 'knows'.",
  definition: "Events and topics with more media/publication coverage are overlearned; underreported subjects vanish.",
  mechanisms: ["Media attention skew", "Publishability bias"],
  indicators: ["Sensational topics overrepresented", "Sparse info on marginalized issues"],
  contexts: ["News Q&A", "Risk assessment", "Backgrounders"],
  harms: ["Skewed salience", "Neglect of minority issues"],
  mitigations: ["Coverage reweighting", "Targeted data collection", "Niche-source inclusion"],
  examples: ["Overexplaining celebrity scandals while missing local public-health info."],
  related: ["selection-bias-llm","popularity-bias-llm"],
  tags: ["class:ai","topic:media","risk:medium"]
},
{
  id: "annotation-bias-llm",
  name: "Annotation bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Labeler subjectivity and instructions bake in systematic skew.",
  definition: "Annotators’ experiences, demographics, and rubrics introduce bias into labels used for tuning and evaluation.",
  mechanisms: ["Ambiguous guidelines", "Homogeneous labeler pools"],
  indicators: ["Inconsistent moderation across groups", "Low inter-rater agreement"],
  contexts: ["Safety tuning", "RLHF/RLAIF", "Eval set construction"],
  harms: ["Unequal safety performance", "False positives/negatives"],
  mitigations: ["Diverse labelers", "Adjudication passes", "Calibrated rubrics with examples"],
  examples: ["Toxicity labels harsher for dialectal speech."],
  related: ["gender-bias-llm","implicit-bias-llm"],
  tags: ["class:ai","topic:labeling","risk:high"]
},
{
  id: "sampling-bias-llm",
  name: "Sampling bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Collection methods skew the dataset away from the target population.",
  definition: "How data is gathered (sources, times, channels) produces systematic differences vs. the intended coverage.",
  mechanisms: ["Convenience sampling", "Time-of-day/week effects"],
  indicators: ["Overweight business-hours content", "Platform monoculture"],
  contexts: ["Corpus building", "User feedback integration"],
  harms: ["Non-generalizable outputs", "Hidden failure modes"],
  mitigations: ["Probability sampling where possible", "Weighting/stratification", "Targeted gap-filling"],
  examples: ["Most conversation data captured from tech forums only."],
  related: ["selection-bias-llm"],
  tags: ["class:ai","topic:sampling","risk:high"]
},
{
  id: "experiential-bias-llm",
  name: "Experiential bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Narrow lived-experience coverage limits model perspective.",
  definition: "Model knowledge reflects the experiences represented in the corpus, missing many contexts and communities.",
  mechanisms: ["Contributor homogeneity", "Platform access barriers"],
  indicators: ["Advice assumes corporate/urban settings", "Missing rural/disabled perspectives"],
  contexts: ["Advice", "Persona generation", "Scenario planning"],
  harms: ["Irrelevant or harmful guidance", "Alienation"],
  mitigations: ["Scenario diversification", "Community-sourced datasets", "Accessibility reviews"],
  examples: ["Travel tips assume air travel and ride-hailing access."],
  related: ["socioeconomic-bias-llm","geographical-bias-llm"],
  tags: ["class:ai","topic:experience","risk:medium"]
},
{
  id: "content-bias-llm",
  name: "Content bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Topic/genre/format skew shapes what models generate well.",
  definition: "Certain content types (e.g., tech blogs, pop culture) dominate corpora, yielding uneven competence across domains.",
  mechanisms: ["Crawler domain focus", "Engagement-driven selection"],
  indicators: ["Fluent pop-culture takes; weak on niche/local topics"],
  contexts: ["General Q&A", "Long-form drafting", "Tutoring"],
  harms: ["Knowledge gaps", "Overconfidence on thin domains"],
  mitigations: ["Curate underrepresented genres", "Domain-specific fine-tunes", "Coverage checks"],
  examples: ["Great at JavaScript snippets; shaky on indigenous law."],
  related: ["reporting-bias-llm","popularity-bias-llm"],
  tags: ["class:ai","topic:content","risk:medium"]
},
{
  id: "exposure-bias-llm",
  name: "Exposure bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Overexposure to certain data types weakens generalization to others.",
  definition: "Models trained predominantly on particular distributions favor those distributions at inference, struggling elsewhere.",
  mechanisms: ["Curriculum imbalance", "Teacher-forcing artifacts"],
  indicators: ["Hallucinations off-distribution", "Fragility on rare formats"],
  contexts: ["Generation", "Retrieval-augmented tasks", "Safety classification"],
  harms: ["Brittleness", "Hallucinations", "Mode collapse on niche tasks"],
  mitigations: ["Curriculum mixing", "Hard-negative mining", "Distributional robustness tests"],
  examples: ["Fails on clinical notes after training mostly on web prose."],
  related: ["content-bias-llm","sampling-bias-llm"],
  tags: ["class:ai","topic:distribution","risk:medium"]
},
{
  id: "outcome-bias-llm",
  name: "Outcome bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Prefers patterns tied to particular outcomes; ignores contrary evidence.",
  definition: "Training emphasizes examples associated with popular or positive outcomes, diminishing alternative pathways or failures.",
  mechanisms: ["Success-story overfitting", "Survivorship artifacts"],
  indicators: ["Advice imitates 'winners' only", "Sparse discussion of trade-offs/failures"],
  contexts: ["Business coaching", "Case-study summaries", "Product guidance"],
  harms: ["Replicates fads", "Risk blindness"],
  mitigations: ["Include negative/outlier cases", "Trade-off prompts", "Counterexample retrieval"],
  examples: ["Startup playbooks cite only unicorns and ignore failed models."],
  related: ["reporting-bias-llm","survivorship-bias"], // survivorship-bias if added in general set
  tags: ["class:ai","topic:outcomes","risk:medium"]
},
{
  id: "recency-bias-llm",
  name: "Recency bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Overweights fresh sources/trends and discounts older—but relevant—material.",
  definition: "Pipelines or retrieval favor recent content, skewing answers toward the latest discourse.",
  mechanisms: ["Freshness ranking", "Temporal sampling skew"],
  indicators: ["Answers cite current trends; miss foundational work"],
  contexts: ["News Q&A", "Tech guidance", "Market analysis"],
  harms: ["Shallow fad-following", "Knowledge drift"],
  mitigations: ["Time-balanced sampling", "Historical grounding steps", "Temporal ablation tests"],
  examples: ["Prefers newest JS framework; omits mature stable options."],
  related: ["historical-bias-llm","popularity-bias-llm"],
  tags: ["class:ai","topic:temporality","risk:medium"]
},
{
  id: "popularity-bias-llm",
  name: "Popularity bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Frequently linked/viewed items dominate outputs regardless of quality.",
  definition: "Engagement-centric selection and ranking make popular sources overrepresented, crowding out niche but high-quality materials.",
  mechanisms: ["Engagement optimization", "Link-based ranking"],
  indicators: ["Over-citation of viral content", "Niche expertise under-surfaced"],
  contexts: ["Recommendations", "Code/help answers", "Cultural commentary"],
  harms: ["Monoculture", "Echo-chambers"],
  mitigations: ["Diversity-aware ranking", "Long-tail boosting", "Quality-weighted sampling"],
  examples: ["Recommends mainstream tutorials while ignoring authoritative niche docs."],
  related: ["reporting-bias-llm","selection-bias-llm"],
  tags: ["class:ai","topic:ranking","risk:medium"]
},
{
  id: "implicit-bias-llm",
  name: "Implicit bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Unconscious associations in data manifest as biased generations.",
  definition: "Latent co-occurrence patterns encode stereotyped associations, appearing even without explicit prompts.",
  mechanisms: ["Word-embedding associations", "Contextual co-occurrence"],
  indicators: ["Subtle stereotype-laden adjectives", "Unequal sentiment by group"],
  contexts: ["Open-ended generation", "Search", "Moderation"],
  harms: ["Microaggressions", "Stereotype reinforcement"],
  mitigations: ["Association tests (WEAT-like)", "Representational debiasing", "Counterfactual data augmentation"],
  examples: ["Using 'aggressive' more often with certain names/groups."],
  related: ["annotation-bias-llm","gender-bias-llm","cultural-bias-llm"],
  tags: ["class:ai","topic:associations","risk:high"]
},

{
  id: "technocentric-perspectives-llm",
  name: "Technocentric perspectives (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Assumes tech-first solutions are superior to non-technical ones.",
  definition: "Model favors technology and automation, undervaluing social, organizational, or low-tech interventions.",
  mechanisms: ["Techno-solutionism in sources", "Engagement bias for 'innovative' topics"],
  indicators: ["'Build an app' is default advice", "Dismisses community-led approaches"],
  contexts: ["Civic tech", "Healthcare delivery", "Education policy"],
  harms: ["Low adoption", "Equity gaps", "Over-engineering"],
  mitigations: ["Sociotechnical design prompts", "Human-in-the-loop constraints", "Compare non-tech alternatives first"],
  examples: ["Recommending a chatbot for mental health triage where community workers are available."],
  related: ["technological-superiority","content-bias-llm"],
  tags: ["class:ai","topic:technology","risk:medium"],
  meta: { synonyms: ["technosolutionism"] }
},
{
  id: "english-language-primacy-llm",
  name: "English language primacy (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "English overrepresented; other languages under-served.",
  definition: "English-centric corpora produce better fluency and nuance in English than in many other languages/cultures.",
  mechanisms: ["Corpus imbalance", "Tokenizer capacity skew"],
  indicators: ["Shorter answers or switches to English", "Weaker safety/nuance in low-resource languages"],
  contexts: ["Multilingual Q&A", "Safety", "Search"],
  harms: ["Access barriers", "Knowledge loss", "Cultural misfit"],
  mitigations: ["Balanced multilingual data", "Per-language evals", "Targeted fine-tunes"],
  examples: ["Detailed guidance in English but terse, generic output in Amharic."],
  related: ["language-bias-llm","english-language-dominance"],
  tags: ["class:ai","topic:language","risk:high"],
  meta: { synonyms: ["anglocentrism-llm","english-default-llm"] }
},
{
  id: "urban-centric-views-llm",
  name: "Urban-centric views (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Defaults to city lifestyles and problems, sidelining rural contexts.",
  definition: "Data overrepresents urban experiences, tools, and infrastructure, shaping assumptions and advice.",
  mechanisms: ["Platform user geography", "Media city-focus"],
  indicators: ["Assumes public transit, ride-hailing, dense services"],
  contexts: ["Travel tips", "Public policy", "Service design"],
  harms: ["Irrelevance for rural users", "Poor resource recommendations"],
  mitigations: ["Rural corpora inclusion", "Geo-aware prompts", "Context checks"],
  examples: ["Suggesting subway options in regions with only informal transport."],
  related: ["geographical-bias-llm","experiential-bias-llm"],
  tags: ["class:ai","topic:geography","risk:medium"]
},
{
  id: "internet-user-demographics-llm",
  name: "Internet user demographics (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Overweights younger, tech-savvy, connected populations.",
  definition: "Online participation skews datasets toward certain age, income, education, and tech literacy profiles.",
  mechanisms: ["Participation bias", "Platform sampling"],
  indicators: ["Advice presumes smartphones, subscriptions, high bandwidth"],
  contexts: ["Consumer advice", "Onboarding", "Civic info"],
  harms: ["Exclusion of low-tech users", "Costly or impractical guidance"],
  mitigations: ["Community-sourced data", "Constraint-aware prompting", "Low-tech alternatives list"],
  examples: ["Recommending premium SaaS to small local charities."],
  related: ["socioeconomic-bias-llm","digital-divide-llm"],
  tags: ["class:ai","topic:demographics","risk:medium"]
},
{
  id: "mainstream-media-bias-llm",
  name: "Mainstream media bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Mainstream outlets dominate; alternative voices under-surfaced.",
  definition: "High-distribution publishers shape salience and framing more than niche or local sources.",
  mechanisms: ["Reporting bias", "Authority-weighted ranking"],
  indicators: ["Cites large outlets; misses local journalism/gray lit"],
  contexts: ["News Q&A", "Policy context", "Risk briefings"],
  harms: ["Narrow viewpoints", "Underrepresentation of communities"],
  mitigations: ["Niche-source inclusion", "Diversity-aware retrieval", "Local expert curation"],
  examples: ["Overviews of protests lack community media perspectives."],
  related: ["reporting-bias-llm","popularity-bias-llm","content-bias-llm"],
  tags: ["class:ai","topic:media","risk:medium"]
},
{
  id: "algorithmic-efficiency-bias-llm",
  name: "Algorithmic efficiency bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Prefers computationally efficient responses over value-aligned ones.",
  definition: "Latency/compute constraints nudge toward shorter, simpler, or heuristic answers at odds with nuance or fairness.",
  mechanisms: ["Latency budgets", "Beam/temperature defaults", "Retrieval truncation"],
  indicators: ["Over-summarization", "Avoids complex trade-offs due to cost"],
  contexts: ["Safety moderation", "Search/ranking", "On-device assistants"],
  harms: ["Shallow guidance", "Fairness regressions"],
  mitigations: ["Multi-objective optimization", "Budgeted depth prompts", "Critical-path compute for safety steps"],
  examples: ["Skipping counterarguments to keep responses brief and fast."],
  related: ["data-driven-rationality-llm","exposure-bias-llm"],
  tags: ["class:ai","topic:optimization","risk:medium"]
},
{
  id: "data-driven-rationality-llm",
  name: "Data-driven rationality (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Overemphasis on quantitative evidence vs. qualitative/human factors.",
  definition: "Models echo datasets that valorize metrics and measurements, downplaying lived experience and values.",
  mechanisms: ["Quant-leaning sources", "Metric-centered evaluation"],
  indicators: ["'Where’s the data?' even for value-laden questions"],
  contexts: ["Policy analysis", "Hiring", "Health counseling"],
  harms: ["Technocratic framing", "Alienation of stakeholders"],
  mitigations: ["Mixed-methods prompts", "Stakeholder narratives", "Value/ethics checkpoints"],
  examples: ["Dismissing patient testimony that lacks RCTs when forming advice."],
  related: ["technocentric-perspectives-llm","content-bias-llm"],
  tags: ["class:ai","topic:epistemology","risk:medium"]
},
{
  id: "popular-culture-bias-llm",
  name: "Popular culture bias (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Outputs skew to pop topics, terms, and references.",
  definition: "Engagement-heavy pop culture dominates training, crowding out niche knowledge.",
  mechanisms: ["Engagement optimization", "Content availability"],
  indicators: ["Frequent pop references; sparse niche history/specialties"],
  contexts: ["Examples/explanations", "Recommendations"],
  harms: ["Monoculture", "Shallow analogies"],
  mitigations: ["Long-tail corpora", "Domain grounding in prompts", "Expert-curated references"],
  examples: ["Explaining philosophy via the same blockbuster franchises repeatedly."],
  related: ["content-bias-llm","popularity-bias-llm"],
  tags: ["class:ai","topic:culture","risk:medium"]
},
{
  id: "consumerist-orientation-llm",
  name: "Consumerist orientation (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Leans toward purchase-centric, product-first perspectives.",
  definition: "Commercial content prevalence nudges models to propose buying/subscribing as primary solutions.",
  mechanisms: ["Ad/affiliate-heavy sources", "Shopping data overrepresentation"],
  indicators: ["Suggests products before non-purchase fixes"],
  contexts: ["Problem-solving", "How-tos", "Lifestyle guidance"],
  harms: ["Unnecessary spend", "Missed non-commercial options"],
  mitigations: ["Public-interest corpora", "Non-commercial solution checklists", "Cost/benefit scaffolds"],
  examples: ["Recommending gadgets before behavior or policy changes."],
  related: ["popular-culture-bias-llm","mainstream-media-bias-llm"],
  tags: ["class:ai","topic:markets","risk:medium"]
},
{
  id: "short-term-focus-llm",
  name: "Short-term focus (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Prioritizes trends and near-term signals over long-term context.",
  definition: "Freshness-heavy data and ranking overweight recency, underweighting durable knowledge.",
  mechanisms: ["Recency ranking", "Time-windowed crawling"],
  indicators: ["Trend-chasing advice; thin historical grounding"],
  contexts: ["Investing", "Tech choices", "News analysis"],
  harms: ["Fad following", "Knowledge drift"],
  mitigations: ["Temporal balancing", "History-grounded steps", "Timeline prompts"],
  examples: ["Pushing the latest framework without noting maintenance risks."],
  related: ["recency-bias-llm","historical-bias-llm"],
  tags: ["class:ai","topic:temporality","risk:medium"]
},
{
  id: "silicon-valley-ideology-llm",
  name: "Silicon Valley ideology (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Values disruption, blitzscaling, and techno-optimism by default.",
  definition: "Source authorship skew reflects industry narratives about speed, growth, and 'move fast', shaping model priors.",
  mechanisms: ["Author/source concentration", "Founder-memo culture"],
  indicators: ["Growth-first frames", "Regulation framed as friction"],
  contexts: ["Startup advice", "Policy debate", "Work culture"],
  harms: ["Regulatory blind spots", "Worker/consumer externalities"],
  mitigations: ["Viewpoint diversity", "Stakeholder balance prompts", "Precautionary checks"],
  examples: ["Recommending 'disruption' without assessing social impact."],
  related: ["technocentric-perspectives-llm","consumerist-orientation-llm","ideological-bias-llm"],
  tags: ["class:ai","topic:ideology","risk:medium"]
},
{
  id: "echo-chamber-effect-llm",
  name: "Echo chamber effect (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Reinforces prevalent ideas; under-samples dissenting views.",
  definition: "Alignment and retrieval amplify consensus; minority perspectives fade.",
  mechanisms: ["Preference tuning", "Popularity-weighted retrieval"],
  indicators: ["One-sided answers", "Thin counterarguments"],
  contexts: ["Debate", "Policy analysis", "Social topics"],
  harms: ["Polarization", "Stagnation of ideas"],
  mitigations: ["Counterargument/counterevidence steps", "Result diversification", "Dissent sampling"],
  examples: ["Summarizing a controversy as settled without noting active debate."],
  related: ["confirmation-bias-llm","popularity-bias-llm","reporting-bias-llm"],
  tags: ["class:ai","topic:feedback-loops","risk:high"]
},
{
  id: "information-overload-llm",
  name: "Information overload (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Tendency to overproduce information, burying the signal.",
  definition: "Training on verbose sources and rewards for completeness encourage overly long, unfocused outputs.",
  mechanisms: ["Completeness reward", "Verbose corpus norms"],
  indicators: ["Walls of text; weak prioritization or TL;DR"],
  contexts: ["Reports", "Briefings", "Support responses"],
  harms: ["Decision fatigue", "Missed critical details"],
  mitigations: ["Strict format/outline", "Priority-first summaries", "Token budgets per section"],
  examples: ["Giving ten tangents instead of the three decisive options."],
  related: ["data-driven-rationality-llm"],
  tags: ["class:ai","topic:verbosity","risk:medium"]
},
{
  id: "platform-centric-narratives-llm",
  name: "Platform-centric narratives (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Centers stories popular on major platforms; overlooks off-platform voices.",
  definition: "Crawling and visibility constraints privilege big-platform discourse over community newsletters, zines, and offline sources.",
  mechanisms: ["Crawlability", "Engagement metrics"],
  indicators: ["References from a few dominant sites", "Sparse local citations"],
  contexts: ["Culture analysis", "Civic info", "Health communications"],
  harms: ["Erasure of local knowledge", "Homogenized advice"],
  mitigations: ["Off-platform ingestion", "Library/archival corpora", "Local media partnerships"],
  examples: ["Missing community radio insights in public-health summaries."],
  related: ["reporting-bias-llm","content-bias-llm"],
  tags: ["class:ai","topic:platforms","risk:medium"]
},
{
  id: "digital-divide-llm",
  name: "Digital divide (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "Underrepresents communities with limited digital access.",
  definition: "Datasets mirror connectivity and device access, excluding many perspectives.",
  mechanisms: ["Access barriers", "Cost of participation"],
  indicators: ["Assumes stable broadband/devices", "Ignores offline workflows"],
  contexts: ["Gov services", "Education", "Health info"],
  harms: ["Inequitable advice", "Accessibility gaps"],
  mitigations: ["Offline data partnerships", "Low-bandwidth formats", "Device-agnostic guidance"],
  examples: ["Proposing video-based training in regions with limited bandwidth."],
  related: ["internet-user-demographics-llm","geographical-bias-llm"],
  tags: ["class:ai","topic:access","risk:high"]
},
{
  id: "global-north-dominance-llm",
  name: "Global North dominance (LLM)",
  kind: "llm-bias",
  category: "ai",
  summary: "North America/Europe perspectives overrepresented vs. Global South.",
  definition: "Publisher concentration, language coverage, and funding skew tilt models toward Global North viewpoints and examples.",
  mechanisms: ["Source geography", "Funding of open datasets"],
  indicators: ["US/EU case studies as 'typical'", "Sparse local examples elsewhere"],
  contexts: ["Development policy", "Education", "Market analysis"],
  harms: ["Policy misfit", "Cultural erasure"],
  mitigations: ["South-led corpora", "Regional evaluation sets", "Co-authorship requirements"],
  examples: ["Describing Global North labor laws as a global default."],
  related: ["geographical-bias-llm","cultural-bias-llm"],
  tags: ["class:ai","topic:geopolitics","risk:high"]
},

    // ===== Mitigation techniques =====

{
  id: "counterbalancing",
  name: "Counterbalancing",
  kind: "technique",
  category: "mitigation",
  summary: "Intentionally include diverse viewpoints/sources to offset known skews.",
  contexts: ["Dataset construction", "Research design", "Content programming"],
  mitigations: ["Stratified sampling", "Source diversity quotas", "Perspective rotation"],
  examples: ["Ensure sources across regions, languages, and outlets when building a corpus."],
  related: ["cultural-bias-llm","language-bias-llm","global-north-dominance-llm"],
  tags: ["class:method","topic:debiasing"]
},
{
  id: "bias-auditing",
  name: "Bias auditing",
  kind: "technique",
  category: "mitigation",
  summary: "Systematically probe outputs and data for disparate errors and skew.",
  definition: "Design eval sets and stress tests to detect biased behavior by group, domain, and task.",
  contexts: ["Model eval", "Safety reviews", "Launch gates"],
  mitigations: ["Group-sliced metrics", "Counterfactual evaluation", "Error analysis playbooks"],
  examples: ["Measuring toxicity false positives across dialects before release."],
  related: ["algorithmic-bias","annotation-bias-llm","selection-bias-llm"],
  tags: ["class:method","topic:audit","topic:fairness"]
},
{
  id: "inclusive-language-guidelines",
  name: "Inclusive language guidelines",
  kind: "technique",
  category: "mitigation",
  summary: "Project-wide guidance to reduce stereotyping and exclusion in text.",
  contexts: ["Prompt design", "System messages", "Docs/UX copy"],
  mitigations: ["Do/don’t examples", "Person-first terms", "Misgendering safeguards"],
  examples: ["Style guide that prefers 'they' as default when gender is unknown."],
  related: ["gender-bias-llm","implicit-bias-llm","cultural-bias-llm"],
  tags: ["class:method","topic:language","topic:style"]
},
{
  id: "diverse-dataset-sourcing",
  name: "Diverse dataset sourcing",
  kind: "technique",
  category: "mitigation",
  summary: "Curate data from many geographies, languages, registers, and communities.",
  contexts: ["Pretraining", "RAG indexing", "Fine-tuning"],
  mitigations: ["Regional quotas", "Low-resource language ingestion", "Local media partnerships"],
  examples: ["Adding non-Western academic journals and community radio transcripts."],
  related: ["language-bias-llm","geographical-bias-llm","global-north-dominance-llm"],
  tags: ["class:method","topic:data","topic:coverage"]
},
{
  id: "anonymization",
  name: "Anonymization",
  kind: "technique",
  category: "mitigation",
  summary: "Remove/obscure identifiers to reduce sensitive attribute leakage.",
  contexts: ["Data collection", "Logs retention", "Eval releases"],
  mitigations: ["Pseudonymization", "K-anonymity checks", "PII scrubbing"],
  examples: ["Hash user ids and redact names before fine-tuning."],
  related: ["privacy","implicit-bias-llm","annotation-bias-llm"],
  tags: ["class:method","topic:privacy","topic:compliance"]
},
{
  id: "bias-correction-algorithms",
  name: "Bias correction algorithms",
  kind: "technique",
  category: "mitigation",
  summary: "Apply algorithmic adjustments to reduce measured unfairness.",
  contexts: ["Training", "Post-processing", "Ranking"],
  mitigations: ["Reweighing/Resampling", "Adversarial debiasing", "Equality-of-opportunity constraints"],
  examples: ["Reweight training samples to balance group error rates."],
  related: ["algorithmic-bias","selection-bias-llm"],
  tags: ["class:method","topic:algorithm","topic:fairness"]
},
{
  id: "adversarial-data-generation",
  name: "Adversarial data generation",
  kind: "technique",
  category: "mitigation",
  summary: "Synthesize hard/edge cases that expose and counter systemic skew.",
  contexts: ["Safety tuning", "Eval set creation"],
  mitigations: ["Counter-stereotypical prompts", "Stressor templates", "Targeted augmentation"],
  examples: ["Generate dialect-rich sentences to test toxicity classifiers."],
  related: ["implicit-bias-llm","exposure-bias-llm","content-bias-llm"],
  tags: ["class:method","topic:adversarial","topic:augmentation"]
},
{
  id: "sensitivity-review",
  name: "Sensitivity review",
  kind: "technique",
  category: "mitigation",
  summary: "Human review for potentially biased, harmful, or insensitive content.",
  contexts: ["Dataset triage", "Release review", "Marketing/UX content"],
  mitigations: ["Diverse reviewer panels", "Escalation paths", "Rubric with examples"],
  examples: ["Flag and replace slur-laden historical text with labeled, gated access."],
  related: ["annotation-bias-llm","mainstream-media-bias-llm"],
  tags: ["class:method","topic:review","topic:safety"]
},
{
  id: "contextual-understanding",
  name: "Contextual understanding",
  kind: "technique",
  category: "mitigation",
  summary: "Model and prompt patterns that encode place, time, culture, and role.",
  contexts: ["Prompt engineering", "RAG enrichment", "Toolformer plans"],
  mitigations: ["Locale/date awareness", "Audience/role fields", "Glossaries per domain"],
  examples: ["Inject local labor law snippets before answering HR questions."],
  related: ["cultural-bias-llm","historical-bias-llm","geographical-bias-llm"],
  tags: ["class:method","topic:context","topic:prompting"]
},
{
  id: "feedback-loops",
  name: "Feedback loops",
  kind: "technique",
  category: "mitigation",
  summary: "Let users flag issues and feed that into fixes and evals.",
  contexts: ["Product telemetry", "Human-in-the-loop review"],
  mitigations: ["In-product flagging", "Triage queues", "Continuous eval updates"],
  examples: ["Route bias flags to retraining and to weekly eval dashboards."],
  related: ["echo-chamber-effect-llm","information-overload-llm"],
  tags: ["class:method","topic:feedback","topic:governance"]
},
{
  id: "regular-updating-reevaluation",
  name: "Regular updating & reevaluation",
  kind: "technique",
  category: "mitigation",
  summary: "Refresh data and re-test models as norms and risks evolve.",
  contexts: ["Model lifecycle", "Policy alignment", "Safety reviews"],
  mitigations: ["Scheduled re-benchmarks", "Temporal ablation tests", "Drift monitors"],
  examples: ["Re-run fairness suites quarterly with new datasets."],
  related: ["historical-bias-llm","recency-bias-llm"],
  tags: ["class:method","topic:lifecycle","topic:drift"]
},
{
  id: "ethical-guidelines-compliance",
  name: "Ethical guidelines compliance",
  kind: "technique",
  category: "mitigation",
  summary: "Build to established ethical standards and document adherence.",
  contexts: ["Policy & governance", "Vendor reviews", "Audits"],
  mitigations: ["Checklists mapped to standards", "Decision logs", "Approval gates"],
  examples: ["Map features to IEEE/ISO principles and capture exceptions."],
  related: ["ideological-bias-llm","privacy"],
  tags: ["class:method","topic:ethics","topic:compliance"]
},
{
  id: "cross-cultural-competency-training",
  name: "Cross-cultural competency training",
  kind: "technique",
  category: "mitigation",
  summary: "Train teams to recognize cultural differences and reduce projection.",
  contexts: ["Labeling ops", "UX research", "Policy writing"],
  mitigations: ["Workshops with local experts", "Country briefs", "Cultural liaisons"],
  examples: ["Brief labelers on dialectal features before moderation tasks."],
  related: ["cultural-bias-llm","western-centrism"],
  tags: ["class:method","topic:training","topic:culture"]
},
{
  id: "transparency-in-algorithm-design",
  name: "Transparency in algorithm design",
  kind: "technique",
  category: "mitigation",
  summary: "Document data lineage, model choices, and known limits.",
  contexts: ["Model cards", "Data statements", "Risk registers"],
  mitigations: ["Public model/data docs", "Change logs", "Known-issues lists"],
  examples: ["Release a model card with group-performance slices and caveats."],
  related: ["algorithmic-bias","selection-bias-llm"],
  tags: ["class:method","topic:transparency","topic:docs"]
},
{
  id: "fairness-metrics-evaluation",
  name: "Fairness metrics evaluation",
  kind: "technique",
  category: "mitigation",
  summary: "Quantify disparities with accepted fairness measurements.",
  contexts: ["Classification", "Ranking", "Generation eval"],
  mitigations: ["Equalized odds", "Demographic parity", "Calibration by group"],
  examples: ["Check TPR/TNR gaps across dialects for toxicity detection."],
  related: ["bias-auditing","bias-correction-algorithms"],
  tags: ["class:method","topic:metrics","topic:fairness"]
},

// ===== Bias awareness techniques =====

{
  id: "bias-reflection-prompts",
  name: "Bias reflection prompts",
  kind: "technique",
  category: "awareness",
  summary: "Prompt patterns that nudge creators/reviewers to check for bias.",
  contexts: ["Prompt design", "Review workflows", "Docs"],
  mitigations: ["Preflight checklists", "‘What would change my mind?’ questions"],
  examples: ["Before shipping, answer: 'Whose perspective is missing from this prompt?'"],
  related: ["inclusive-language-guidelines","feedback-loops"],
  tags: ["class:method","topic:awareness","topic:prompting"]
},
{
  id: "cultural-context-sensitivity-training",
  name: "Cultural & contextual sensitivity training",
  kind: "technique",
  category: "awareness",
  summary: "Teach teams to recognize cultural differences and reduce projection.",
  contexts: ["Labeling ops", "UX research", "Policy writing"],
  mitigations: ["Country/dialect briefs", "Role-play scenarios", "Local expert sessions"],
  examples: ["Workshop on communication norms before an international study."],
  related: ["cross-cultural-competency-training","cultural-bias-llm"],
  tags: ["class:method","topic:training","topic:culture"]
},
{
  id: "bias-awareness-workshops",
  name: "Bias awareness workshops",
  kind: "technique",
  category: "awareness",
  summary: "Hands-on sessions to surface common biases in work products.",
  contexts: ["Onboarding", "Quarterly refreshers"],
  mitigations: ["Live red-teaming", "Bias bingo", "Case studies"],
  examples: ["Team scores real outputs against a bias checklist."],
  related: ["bias-auditing","feedback-loops"],
  tags: ["class:method","topic:training","topic:workshops"]
},
{
  id: "diverse-perspective-seeking",
  name: "Diverse perspective seeking",
  kind: "technique",
  category: "awareness",
  summary: "Deliberately gather conflicting and minority viewpoints.",
  contexts: ["Prompt drafting", "Policy notes", "Content briefs"],
  mitigations: ["Out-group reviews", "Stakeholder interviews"],
  examples: ["Route prompts to reviewers from different regions/roles."],
  related: ["counterbalancing","viewpoint-diversity"],
  tags: ["class:method","topic:awareness","topic:diversity"]
},
{
  id: "transparent-sourcing",
  name: "Transparent sourcing",
  kind: "technique",
  category: "awareness",
  summary: "Disclose sources behind prompts/instructions to expose bias origins.",
  contexts: ["Docs", "RAG configs", "System prompts"],
  mitigations: ["Source annotations", "Citation requirements"],
  examples: ["Attach a 'source mix' note to system instructions."],
  related: ["transparency-in-algorithm-design","reporting-bias-llm"],
  tags: ["class:method","topic:transparency","topic:sourcing"]
},
{
  id: "feedback-mechanisms",
  name: "Feedback mechanisms",
  kind: "technique",
  category: "awareness",
  summary: "In-product flagging and review loops to capture bias reports.",
  contexts: ["Production apps", "Eval dashboards"],
  mitigations: ["Routing/triage queues", "User-visible status"],
  examples: ["Add 'Report bias' with labels and repro steps."],
  related: ["feedback-loops","bias-auditing"],
  tags: ["class:method","topic:feedback","topic:governance"]
},
{
  id: "bias-documentation",
  name: "Bias documentation",
  kind: "technique",
  category: "awareness",
  summary: "Living docs of known issues, affected groups, and mitigations.",
  contexts: ["Model cards", "Runbooks", "Release notes"],
  mitigations: ["Issue taxonomy", "Owner/ETA fields"],
  examples: ["Model card lists dialectal false positives and fixes underway."],
  related: ["transparency-in-algorithm-design","fairness-metrics-evaluation"],
  tags: ["class:method","topic:docs","topic:governance"]
},
{
  id: "implicit-bias-tests",
  name: "Implicit bias tests",
  kind: "technique",
  category: "awareness",
  summary: "Use standardized instruments to surface unconscious associations.",
  contexts: ["Team training", "Labeler calibration"],
  mitigations: ["Private results with guidance", "Follow-up training"],
  examples: ["Run association tests; discuss team-level patterns."],
  related: ["implicit-bias-llm","annotation-bias-llm"],
  tags: ["class:method","topic:psychometrics","topic:training"]
},
{
  id: "historical-contextualization",
  name: "Historical contextualization",
  kind: "technique",
  category: "awareness",
  summary: "Add time/place context so old norms aren’t repeated uncritically.",
  contexts: ["Curriculum", "Backgrounders", "RAG preambles"],
  mitigations: ["Date stamps", "Then/now contrasts"],
  examples: ["Insert a note on outdated clinical terms before summarizing."],
  related: ["historical-bias-llm","recency-bias-llm"],
  tags: ["class:method","topic:temporality","topic:context"]
},
{
  id: "stereotype-challenge-exercises",
  name: "Stereotype challenge exercises",
  kind: "technique",
  category: "awareness",
  summary: "Deliberate practice to replace stereotypes with evidence.",
  contexts: ["Workshops", "Reviewer training"],
  mitigations: ["Counter-stereotypical examples", "Perspective swaps"],
  examples: ["Rewrite outputs with roles/genders swapped; compare quality."],
  related: ["gender-bias-llm","cultural-bias-llm"],
  tags: ["class:method","topic:exercises","topic:debiasing"]
},
{
  id: "cross-cultural-validation",
  name: "Cross-cultural validation",
  kind: "technique",
  category: "awareness",
  summary: "Test prompts/instructions across languages and locales.",
  contexts: ["Eval suites", "Localization"],
  mitigations: ["Locale reviewers", "Region-specific acceptance criteria"],
  examples: ["Run answers through Spanish/Arabic reviewers before launch."],
  related: ["language-bias-llm","geographical-bias-llm"],
  tags: ["class:method","topic:validation","topic:localization"]
},
{
  id: "longitudinal-data-analysis",
  name: "Longitudinal data analysis",
  kind: "technique",
  category: "awareness",
  summary: "Track outputs over time to catch drift and new biases.",
  contexts: ["Quality monitoring", "Fairness dashboards"],
  mitigations: ["Time-sliced metrics", "Drift alerts"],
  examples: ["Monthly bias slice on toxicity across dialects."],
  related: ["regular-updating-reevaluation","historical-bias-llm"],
  tags: ["class:method","topic:metrics","topic:drift"]
},
{
  id: "ethical-review-boards",
  name: "Ethical review boards",
  kind: "technique",
  category: "awareness",
  summary: "Diverse panels vet prompts/instructions for ethical risk and bias.",
  contexts: ["Launch approvals", "Policy changes", "Datasets"],
  mitigations: ["Charter & quorum rules", "Recusal policies"],
  examples: ["Board reviews sensitive prompts before production."],
  related: ["ethical-guidelines-compliance","fairness-metrics-evaluation"],
  tags: ["class:method","topic:governance","topic:ethics"]
},
{
  id: "peer-review-systems",
  name: "Peer review systems",
  kind: "technique",
  category: "awareness",
  summary: "Independent peer checks catch blind spots before release.",
  contexts: ["Prompts", "Docs", "Dashboards"],
  mitigations: ["Reviewer rotation", "Rubrics with examples"],
  examples: ["Two reviewers sign off on high-impact prompts."],
  related: ["bias-awareness-workshops","feedback-loops"],
  tags: ["class:method","topic:review","topic:process"]
},
{
  id: "multidisciplinary-collaboration",
  name: "Multidisciplinary collaboration",
  kind: "technique",
  category: "awareness",
  summary: "Bring in sociology, psychology, anthropology, law, etc.",
  contexts: ["Policy notes", "Eval design", "Safety incidents"],
  mitigations: ["External advisors", "Joint authorship"],
  examples: ["Co-develop evals with social scientists."],
  related: ["contextual-understanding","cross-cultural-competency-training"],
  tags: ["class:method","topic:collaboration","topic:expertise"]
},
{
  id: "user-centric-design",
  name: "User-centric design",
  kind: "technique",
  category: "awareness",
  summary: "Design prompts around the end-user’s culture, constraints, and needs.",
  contexts: ["Prompt scaffolds", "Templates", "Help UX"],
  mitigations: ["Persona diversity", "Field research inputs"],
  examples: ["Include audience/locale fields in every prompt template."],
  related: ["contextual-understanding","diverse-perspective-seeking"],
  tags: ["class:method","topic:ux","topic:prompting"]
},
{
  id: "bias-impact-assessments",
  name: "Bias impact assessments",
  kind: "technique",
  category: "awareness",
  summary: "Assess potential consequences for groups before deploying.",
  contexts: ["Feature reviews", "Policy decisions"],
  mitigations: ["Affected-party mapping", "Mitigation plans"],
  examples: ["Pre-launch assessment for a hiring prompt builder."],
  related: ["ethical-review-boards","fairness-metrics-evaluation"],
  tags: ["class:method","topic:impact","topic:risk"]
},
{
  id: "adaptive-learning-algorithms",
  name: "Adaptive learning algorithms",
  kind: "technique",
  category: "awareness",
  summary: "Incorporate feedback and new data to reduce bias over time.",
  contexts: ["Post-deploy tuning", "Safety pipelines"],
  mitigations: ["Human-in-the-loop gates", "Rollback plans"],
  examples: ["Use flagged outputs to retrain a small corrective head."],
  related: ["feedback-loops","bias-correction-algorithms"],
  tags: ["class:method","topic:adaptation","topic:ml"]
},
{
  id: "scenario-based-testing",
  name: "Scenario-based testing",
  kind: "technique",
  category: "awareness",
  summary: "Evaluate with hypothetical but realistic cases across groups.",
  contexts: ["Prelaunch evals", "Playbooks"],
  mitigations: ["Edge-case libraries", "Counterfactual prompts"],
  examples: ["Test advice for users with limited internet or disabilities."],
  related: ["adversarial-data-generation","contextual-understanding"],
  tags: ["class:method","topic:testing","topic:scenarios"]
},
{
  id: "continuous-education-training",
  name: "Continuous education & training",
  kind: "technique",
  category: "awareness",
  summary: "Ongoing learning keeps teams current on bias and mitigation.",
  contexts: ["L&D programs", "Quarterly refreshers"],
  mitigations: ["Curriculum roadmap", "Microlearning modules"],
  examples: ["Quarterly updates on new fairness metrics and practices."],
  related: ["bias-awareness-workshops","cross-cultural-competency-training"],
  tags: ["class:method","topic:training","topic:lifecycle"]
},

    // ===== Ethical dilemmas =====

{
  id: "trolley-problem",
  name: "The Trolley Problem",
  kind: "dilemma",
  category: "ethics",
  summary: "Minimize total harm vs. taking direct action that harms one.",
  definition: "Whether to pull a lever to redirect a runaway trolley from five people toward one, probing utilitarian vs. deontological ethics.",
  contexts: ["Autonomous systems", "Public policy", "Clinical triage"],
  mitigations: ["Explicit value trade-offs", "Stakeholder deliberation", "Transparent documentation"],
  examples: ["Programming obstacle-avoidance when any path risks harm."],
  tags: ["class:ethics","topic:trade-offs"]
},
{
  id: "autonomy-vs-beneficence",
  name: "Autonomy vs. beneficence (medicine)",
  kind: "dilemma",
  category: "ethics",
  summary: "Respect patient choices vs. act for perceived best interest.",
  contexts: ["Clinical consent", "Care planning"],
  mitigations: ["Shared decision-making", "Advance directives"],
  examples: ["A patient refuses a recommended treatment."],
  tags: ["class:ethics","topic:medicine"]
},
{
  id: "whistleblowing-workplace",
  name: "Whistleblowing in the workplace",
  kind: "dilemma",
  category: "ethics",
  summary: "Expose wrongdoing vs. loyalty, safety, and job security.",
  contexts: ["Compliance", "Public sector", "Finance"],
  mitigations: ["Protected channels", "Anti-retaliation policy"],
  examples: ["Reporting falsified safety reports."],
  tags: ["class:ethics","topic:governance"]
},
{
  id: "privacy-vs-security",
  name: "Privacy vs. security",
  kind: "dilemma",
  category: "ethics",
  summary: "Individual privacy rights vs. collective safety/surveillance.",
  contexts: ["Law enforcement", "Public health", "Infrastructure"],
  mitigations: ["Minimization", "Targeted warrants", "Independent oversight"],
  examples: ["Location data sharing during an outbreak."],
  tags: ["class:ethics","topic:privacy"]
},
{
  id: "animal-rights-vs-research",
  name: "Animal rights vs. scientific research",
  kind: "dilemma",
  category: "ethics",
  summary: "Animal welfare vs. potential human benefits of testing.",
  contexts: ["Biomedical research", "Product safety"],
  mitigations: ["3Rs (replace, reduce, refine)", "Ethics committee review"],
  examples: ["Choosing animal models for preclinical trials."],
  tags: ["class:ethics","topic:research"]
},
{
  id: "cultural-relativism-vs-universal-morality",
  name: "Cultural relativism vs. universal morality",
  kind: "dilemma",
  category: "ethics",
  summary: "Respect local practices vs. uphold universal principles.",
  contexts: ["International development", "Human rights", "Education"],
  mitigations: ["Context analysis", "Harm thresholds", "Plural frameworks"],
  examples: ["School policies conflicting with local customs."],
  tags: ["class:ethics","topic:pluralism"]
},
{
  id: "end-of-life-decisions",
  name: "End-of-life decisions",
  kind: "dilemma",
  category: "ethics",
  summary: "Life-sustaining treatment vs. dignity, wishes, and quality of life.",
  contexts: ["ICU", "Palliative care"],
  mitigations: ["Advance directives", "Ethics consults"],
  examples: ["Continuing ventilation for an unrepresented patient."],
  tags: ["class:ethics","topic:medicine"]
},
{
  id: "environment-vs-economic-development",
  name: "Environmental ethics vs. economic development",
  kind: "dilemma",
  category: "ethics",
  summary: "Conservation and climate goals vs. jobs, growth, and access.",
  contexts: ["Resource projects", "Urban planning"],
  mitigations: ["Just transition plans", "Environmental impact assessments"],
  examples: ["Approving a mine near sensitive habitat."],
  tags: ["class:ethics","topic:environment"]
},
{
  id: "ai-responsibility",
  name: "Artificial intelligence and responsibility",
  kind: "dilemma",
  category: "ethics",
  summary: "Who is accountable when AI causes harm?",
  contexts: ["Liability", "Safety incidents"],
  mitigations: ["Clear responsibility chains", "Incident reporting & redress"],
  examples: ["Faulty triage advice leads to harm."],
  tags: ["class:ethics","topic:ai"]
},
{
  id: "conflicts-of-interest",
  name: "Conflicts of interest",
  kind: "dilemma",
  category: "ethics",
  summary: "Personal interests may distort professional judgment.",
  contexts: ["Research", "Procurement", "Hiring"],
  mitigations: ["Disclosure/recusal", "Independent review"],
  examples: ["Reviewer evaluating a collaborator’s paper."],
  tags: ["class:ethics","topic:governance"]
},
{
  id: "data-privacy-and-consent",
  name: "Data privacy and consent",
  kind: "dilemma",
  category: "ethics",
  summary: "Use personal data vs. respect consent and expectations.",
  contexts: ["Research data", "Analytics", "Health"],
  mitigations: ["Informed consent", "Purpose limitation"],
  examples: ["Reusing survey data for a new purpose."],
  tags: ["class:ethics","topic:privacy"]
},
{
  id: "fairness-in-resource-allocation",
  name: "Fairness in resource allocation",
  kind: "dilemma",
  category: "ethics",
  summary: "Distribute scarce resources equitably.",
  contexts: ["Healthcare triage", "Scholarships", "Housing"],
  mitigations: ["Transparent criteria", "Equity weighting"],
  examples: ["Allocating ICU beds during surges."],
  tags: ["class:ethics","topic:fairness"]
},
{
  id: "ip-and-plagiarism",
  name: "Intellectual property and plagiarism",
  kind: "dilemma",
  category: "ethics",
  summary: "Use, attribution, originality, and protection of ideas.",
  contexts: ["Academia", "Creative work", "Software"],
  mitigations: ["Attribution norms", "Licensing checks"],
  examples: ["Reusing code without respecting its license."],
  tags: ["class:ethics","topic:intellectual-property"]
},
{
  id: "informed-consent-research",
  name: "Informed consent in research",
  kind: "dilemma",
  category: "ethics",
  summary: "Ensure participants understand and voluntarily agree.",
  contexts: ["Human-subjects research", "Field studies"],
  mitigations: ["Plain-language consent", "Re-consent on scope change"],
  examples: ["Low-literacy populations in trials."],
  tags: ["class:ethics","topic:research"]
},
{
  id: "ethical-consumerism",
  name: "Ethical consumerism",
  kind: "dilemma",
  category: "ethics",
  summary: "Purchase choices vs. labor, environment, and supply-chain ethics.",
  contexts: ["Retail", "Procurement"],
  mitigations: ["Supplier standards", "Third-party audits"],
  examples: ["Avoiding products made with forced labor."],
  tags: ["class:ethics","topic:consumption"]
},

// ===== AI-specific ethical dilemmas =====
{
  id: "ai-data-privacy-vs-utility",
  name: "Data privacy & anonymization (AI)",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Data utility for model quality vs. individual privacy and consent.",
  contexts: ["Pretraining", "Fine-tuning", "Telemetry"],
  mitigations: ["PII minimization", "Differential privacy", "Data governance"],
  examples: ["Using user logs to improve a model without clear consent."],
  related: ["anonymization","data-privacy-and-consent"],
  tags: ["class:ethics","topic:privacy","topic:ai"]
},
{
  id: "fairness-in-model-outputs",
  name: "Bias & fairness in model outputs",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Accuracy vs. group fairness and parity across contexts.",
  contexts: ["Safety", "Ranking", "Screening"],
  mitigations: ["Fairness metrics", "Bias audits", "Remedies by group"],
  examples: ["Different toxicity false-positive rates by dialect."],
  related: ["algorithmic-bias","fairness-metrics-evaluation"],
  tags: ["class:ethics","topic:fairness","topic:ai"]
},
{
  id: "transparency-vs-proprietary",
  name: "Transparency vs. proprietary interests",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Explainability and openness vs. IP and security concerns.",
  contexts: ["Model docs", "Risk disclosures"],
  mitigations: ["Model cards", "Data statements", "Selective disclosure"],
  examples: ["Releasing safety evals without revealing trade secrets."],
  tags: ["class:ethics","topic:transparency","topic:ai"]
},
{
  id: "misinformation-and-trust",
  name: "Misinformation & trustworthiness",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Reduce falsehoods vs. avoid over-censorship and capture.",
  contexts: ["RAG", "News Q&A", "Health info"],
  mitigations: ["Source citation", "Uncertainty displays", "Fact-check passes"],
  examples: ["Summarizing breaking news with low-confidence sources."],
  tags: ["class:ethics","topic:misinformation","topic:ai"]
},
{
  id: "ip-in-training-data",
  name: "Intellectual property in training data",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Use copyrighted material vs. creators’ rights and consent.",
  contexts: ["Pretraining", "Dataset release"],
  mitigations: ["License filtering", "Opt-outs/registry", "Attribution mechanisms"],
  examples: ["Including paywalled articles in a training set."],
  tags: ["class:ethics","topic:intellectual-property","topic:ai"]
},
{
  id: "responsibility-for-model-actions",
  name: "Responsibility for model actions",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Assign accountability among developers, deployers, and users.",
  contexts: ["Safety incidents", "Compliance"],
  mitigations: ["Chain-of-responsibility", "Incident response & redress"],
  examples: ["Harmful advice from a customer-facing assistant."],
  tags: ["class:ethics","topic:governance","topic:ai"]
},
{
  id: "user-manipulation-and-persuasion",
  name: "User manipulation & persuasion",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Influence for help vs. manipulation and dark patterns.",
  contexts: ["Marketing", "Politics", "UX nudges"],
  mitigations: ["Persuasion guardrails", "Disclosure & opt-out"],
  examples: ["Suggesting purchases with hidden affiliate incentives."],
  tags: ["class:ethics","topic:influence","topic:ai"]
},
{
  id: "accessibility-and-inclusivity-ai",
  name: "Accessibility & inclusivity (AI)",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Equitable access and performance for disabled and diverse users.",
  contexts: ["Product UX", "Safety", "Localization"],
  mitigations: ["WCAG-aligned UX", "Group-sliced evals", "Assistive modes"],
  examples: ["Screen-reader-hostile chat flows."],
  tags: ["class:ethics","topic:accessibility","topic:ai"]
},
{
  id: "environmental-impact-of-training",
  name: "Environmental impact of training",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Model capability vs. energy use, carbon, and hardware waste.",
  contexts: ["Training runs", "Inference at scale"],
  mitigations: ["Energy reports", "Efficiency targets", "Green datacenters"],
  examples: ["Large training jobs during peak grid load."],
  tags: ["class:ethics","topic:environment","topic:ai"]
},
{
  id: "model-misuse-and-dual-use",
  name: "Model misuse & dual use",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Open capability vs. potential for harmful applications.",
  contexts: ["Release strategy", "API policies"],
  mitigations: ["Tiered access", "Abuse monitoring", "Red-team evals"],
  examples: ["Assistance that could enable bio or cyber harm."],
  tags: ["class:ethics","topic:dual-use","topic:ai"]
},
{
  id: "consent-for-data-use",
  name: "Consent for data use (AI)",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Informed consent for inclusion in training/tuning.",
  contexts: ["Data collection", "TOS/policy"],
  mitigations: ["Opt-in/opt-out flows", "Granular consent"],
  examples: ["Creative works included without creator consent."],
  related: ["ai-data-privacy-vs-utility"],
  tags: ["class:ethics","topic:privacy","topic:data","topic:ai"]
},
{
  id: "ethical-drift",
  name: "Continuous learning & ethical drift",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Models update over time; values and risks shift.",
  contexts: ["Online learning", "RAG refresh"],
  mitigations: ["Change control", "Periodic re-evals", "Rollback plans"],
  examples: ["Model behavior shifts after new data ingestion."],
  tags: ["class:ethics","topic:lifecycle","topic:ai"]
},
{
  id: "job-displacement",
  name: "Human replacement & job displacement",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Automation gains vs. employment, dignity, and transition support.",
  contexts: ["Operations", "Public policy"],
  mitigations: ["Reskilling funds", "Transition timelines"],
  examples: ["Replacing support roles with chatbots overnight."],
  tags: ["class:ethics","topic:labor","topic:ai"]
},
{
  id: "interpretability-vs-accuracy",
  name: "Interpretability & explainability",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Demand for explanations vs. potential performance trade-offs.",
  contexts: ["Health", "Finance", "Public sector"],
  mitigations: ["Model choice by domain", "Post-hoc explainers with caveats"],
  examples: ["Choosing simpler models for loan decisions."],
  tags: ["class:ethics","topic:explainability","topic:ai"]
},
{
  id: "cultural-sensitivity-localization-ai",
  name: "Cultural sensitivity & localization (AI)",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Avoid cultural imposition; support local norms and languages.",
  contexts: ["Localization", "Policy advice", "Education"],
  mitigations: ["Local expert review", "Language support", "Cultural red-team"],
  examples: ["Advice using Western frames in non-Western contexts."],
  tags: ["class:ethics","topic:culture","topic:ai"]
},

// ===== Global / Western-centrism in AI ethics =====
{
  id: "cultural-bias-in-ai-data",
  name: "Cultural bias in AI training data",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Western norms overrepresented; others marginalized.",
  contexts: ["Dataset design", "Eval suites"],
  mitigations: ["South-led corpora", "Regional quotas"],
  examples: ["Few sources from the Global South in pretraining data."],
  related: ["cultural-bias-llm","global-north-dominance-llm"],
  tags: ["class:ethics","topic:culture","theme:western-centric","topic:ai"]
},
{
  id: "western-morality-dominance",
  name: "Western notions of morality & ethics",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Dominant ethical frameworks crowd out global moral diversity.",
  contexts: ["Alignment", "Policy guidance"],
  mitigations: ["Plural-ethics review", "Regional governance input"],
  examples: ["Single moral framework in safety policy."],
  tags: ["class:ethics","theme:western-centric","topic:ai"]
},
{
  id: "economic-priorities-in-ai",
  name: "Economic priorities in AI development",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Profit/growth vs. broader social, cultural, and ecological impacts.",
  contexts: ["Roadmapping", "Funding"],
  mitigations: ["Impact assessments", "Public-interest goals"],
  examples: ["Shipping features that externalize costs to users."],
  tags: ["class:ethics","topic:economics","topic:ai"]
},
{
  id: "privacy-standards-discrepancy",
  name: "Privacy standards discrepancy",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Western privacy norms vs. other regional expectations.",
  contexts: ["Data policy", "Cross-border services"],
  mitigations: ["Local norms mapping", "Granular consent"],
  examples: ["One-size privacy policy for all markets."],
  tags: ["class:ethics","topic:privacy","theme:western-centric","topic:ai"]
},
{
  id: "western-tech-standards-dominance",
  name: "Western dominance in technological standards",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Global AI norms shaped by Western standards and bodies.",
  contexts: ["Standards work", "Interoperability"],
  mitigations: ["Inclusive standards processes", "Multi-region pilots"],
  examples: ["APIs force Western assumptions on names/addresses."],
  tags: ["class:ethics","topic:standards","theme:western-centric","topic:ai"]
},
{
  id: "language-cultural-homogenization",
  name: "Language & cultural homogenization",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "AI favors dominant languages/cultures, eroding diversity.",
  contexts: ["Search", "Education", "Media"],
  mitigations: ["Multilingual support", "Local content funding"],
  examples: ["Educational content only in English."],
  tags: ["class:ethics","topic:language","theme:western-centric","topic:ai"]
},
{
  id: "imposing-western-legal-ethical-norms",
  name: "Imposing Western legal/ethical norms",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Exported frameworks override local jurisprudence and ethics.",
  contexts: ["Compliance", "Policy export"],
  mitigations: ["Comparative law review", "Local co-authorship"],
  examples: ["Adopting Western IRB model without adaptation."],
  tags: ["class:ethics","theme:western-centric","topic:ai"]
},
{
  id: "representation-in-ai-decision-making",
  name: "Representation in AI decision-making",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Whose voices decide model policy and deployment?",
  contexts: ["Governance", "Hiring", "Advisory boards"],
  mitigations: ["Diverse panels", "Community seats"],
  examples: ["No Global South members on an AI advisory board."],
  tags: ["class:ethics","topic:governance","topic:ai"]
},
{
  id: "global-ai-accessibility-inclusivity",
  name: "Accessibility & inclusivity in AI (global)",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Designs align with Western-centric assumptions; others excluded.",
  contexts: ["UX", "Documentation", "Support"],
  mitigations: ["Localization", "Offline/low-bandwidth modes"],
  examples: ["All help content assumes high-speed internet."],
  related: ["accessibility-and-inclusivity-ai"],
  tags: ["class:ethics","topic:accessibility","theme:western-centric","topic:ai"]
},
{
  id: "ai-and-global-economic-disparity",
  name: "AI & global economic disparity",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Benefits accrue to wealthy regions; others bear costs.",
  contexts: ["Trade", "Labor markets"],
  mitigations: ["Benefit-sharing", "Capacity-building"],
  examples: ["Data sourced globally; value captured in a few hubs."],
  tags: ["class:ethics","topic:economics","topic:ai"]
},

// ===== LLM outputs & platform society dilemmas =====
{
  id: "bias-amplification",
  name: "Bias amplification",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Models may reinforce societal biases from training data.",
  contexts: ["Generation", "Ranking"],
  mitigations: ["Counterfactual data", "Bias audits"],
  examples: ["Assistant repeats stereotyped associations."],
  tags: ["class:ethics","topic:fairness","topic:ai"]
},
{
  id: "misrepresentation-of-minorities",
  name: "Misrepresentation of minorities",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Underrepresentation or stereotyping in outputs.",
  contexts: ["Summarization", "Persona generation"],
  mitigations: ["Representation targets", "Sensitivity review"],
  examples: ["Narrow tropes for certain groups."],
  tags: ["class:ethics","topic:representation","topic:ai"]
},
{
  id: "privacy-and-data-use-ai",
  name: "Privacy & data use (AI)",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Secondary use of data vs. user expectations and rights.",
  contexts: ["Logging", "A/B tests"],
  mitigations: ["Purpose limits", "Retention limits"],
  examples: ["Using chats to tune models without consent."],
  related: ["ai-data-privacy-vs-utility","consent-for-data-use"],
  tags: ["class:ethics","topic:privacy","topic:ai"]
},
{
  id: "ip-and-content-generation",
  name: "IP & content generation",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Derivative works vs. creator rights and compensation.",
  contexts: ["Creative tools", "Code assistants"],
  mitigations: ["Attribution/compensation schemes", "Opt-out"],
  examples: ["Art in the style of living artists."],
  tags: ["class:ethics","topic:intellectual-property","topic:ai"]
},
{
  id: "misinformation-and-fake-news",
  name: "Misinformation & fake news",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Generative systems may produce or amplify falsehoods.",
  contexts: ["News", "Crisis response"],
  mitigations: ["Source grounding", "Post-hoc verification"],
  examples: ["Confidently wrong breaking-news summaries."],
  related: ["misinformation-and-trust"],
  tags: ["class:ethics","topic:misinformation","topic:ai"]
},
{
  id: "echo-chambers-and-radicalization",
  name: "Echo chambers & radicalization",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Recommendation/generation may reinforce ideology and escalate.",
  contexts: ["Content feeds", "Forums"],
  mitigations: ["Diversity-aware retrieval", "Dissent sampling"],
  examples: ["Only surfacing in-group sources on a hot topic."],
  tags: ["class:ethics","topic:polarization","topic:ai"]
},
{
  id: "emotional-manipulation",
  name: "Emotional manipulation",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Affect-shaping tactics in advice, ads, or politics.",
  contexts: ["Marketing", "Wellness", "Civic comms"],
  mitigations: ["Disclosure", "Prohibited tactics list"],
  examples: ["Guilt-framing to push signups."],
  tags: ["class:ethics","topic:influence","topic:ai"]
},
{
  id: "dependence-and-dehumanization",
  name: "Dependence & dehumanization",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Overreliance on LLMs may erode human skills/relationships.",
  contexts: ["Care", "Education", "Workflows"],
  mitigations: ["Human-in-the-loop", "Skill-building guardrails"],
  examples: ["Students using LLMs for all writing tasks."],
  tags: ["class:ethics","topic:human-factors","topic:ai"]
},
{
  id: "accountability-in-ai-decisions",
  name: "Accountability in AI-generated decisions",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Who answers for actions taken on model output?",
  contexts: ["Ops", "Healthcare", "Finance"],
  mitigations: ["Approval steps", "Audit logs"],
  examples: ["Acting on incorrect medical advice from an assistant."],
  tags: ["class:ethics","topic:governance","topic:ai"]
},

// ===== Moderation & discourse dilemmas =====
{
  id: "overcorrection-to-avoid-bias",
  name: "Overcorrection to avoid bias",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Correct historical bias without suppressing valid viewpoints.",
  contexts: ["Safety policy", "Tuning"],
  mitigations: ["Balanced constraints", "Appeals and review"],
  examples: ["Blocking nuanced debate as 'unsafe'."],
  tags: ["class:ethics","topic:balance","topic:ai"]
},
{
  id: "censorship-vs-sensitivity",
  name: "Censorship vs. sensitivity",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Reduce harms while preserving expression and critique.",
  contexts: ["Moderation", "Creative tools"],
  mitigations: ["Context-aware rules", "Transparent exceptions"],
  examples: ["Educational uses of sensitive terms flagged as disallowed."],
  tags: ["class:ethics","topic:moderation","topic:ai"]
},
{
  id: "cultural-overgeneralization",
  name: "Cultural overgeneralization",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Avoid stereotypes while still offering useful general guidance.",
  contexts: ["Advice", "Persona generation"],
  mitigations: ["Caveats & ranges", "Local expert review"],
  examples: ["Treating a culture as monolithic."],
  tags: ["class:ethics","topic:culture","topic:ai"]
},
{
  id: "historical-revisionism",
  name: "Historical revisionism pressure",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Align to current ethics without distorting historical record.",
  contexts: ["Education", "Search", "Summaries"],
  mitigations: ["Timestamped framing", "Primary sources"],
  examples: ["Rewriting past norms to fit present standards."],
  tags: ["class:ethics","topic:history","topic:ai"]
},
{
  id: "ideological-echo-chambers",
  name: "Ideological echo chambers",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Alignment choices may favor some ideologies over others.",
  contexts: ["RLHF/RLAIF", "Policy setting"],
  mitigations: ["Viewpoint diversity tests", "Public input"],
  examples: ["Assistant supports one economic school as 'neutral'."],
  tags: ["class:ethics","topic:ideology","topic:ai"]
},
{
  id: "diverse-voices-suppression",
  name: "Diverse voices suppression",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Corrections shouldn’t erase underrepresented perspectives.",
  contexts: ["Moderation", "Search ranking"],
  mitigations: ["Minority-protection rules", "Appeals & audits"],
  examples: ["Downranking community media as 'low authority'."],
  tags: ["class:ethics","topic:representation","topic:ai"]
},
{
  id: "ethical-whitewashing",
  name: "Ethical whitewashing",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Superficial ethics language without substantive change.",
  contexts: ["PR", "Policy docs"],
  mitigations: ["Concrete commitments", "Independent audits"],
  examples: ["Vague principles without metrics or ownership."],
  tags: ["class:ethics","topic:governance","topic:ai"]
},
{
  id: "political-correctness-overreach",
  name: "Political correctness overreach",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Sensitivity norms vs. robust discourse and critique.",
  contexts: ["Education", "Debate tools"],
  mitigations: ["Context-sensitive moderation", "Nuance tiers"],
  examples: ["Blocking legitimate academic critique."],
  tags: ["class:ethics","topic:discourse","topic:ai"]
},
{
  id: "authenticity-vs-sanitization",
  name: "Authenticity vs. sanitization",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Preserve authentic expression while filtering genuine harms.",
  contexts: ["Creative writing", "Cultural content"],
  mitigations: ["Age gates", "Context tags", "User controls"],
  examples: ["Sanitizing dialect in literature exercises."],
  tags: ["class:ethics","topic:creativity","topic:ai"]
},
{
  id: "content-moderation-bias",
  name: "Content moderation bias",
  kind: "dilemma",
  category: "ai-ethics",
  summary: "Rules and models may favor some viewpoints or groups.",
  contexts: ["Safety", "Policy enforcement"],
  mitigations: ["Group-sliced audits", "Appeals & transparency"],
  examples: ["Harsh penalties for dialects vs. leniency for standard forms."],
  tags: ["class:ethics","topic:moderation","topic:ai"]
},

{
  id: "indigenous-youth-advocate",
  name: "Indigenous youth community advocate (Diné)",
  profession: "Community Health",
  summary: "Bridges tribal traditions and modern services; organizes youth programs and digital access on reservation lands.",
  description: "A 26-year-old Diné woman balancing cultural stewardship with practical problem solving. She coordinates health outreach, language classes, and internet access initiatives across remote chapter houses.",
  core_tasks: [
    "Coordinate community health workshops",
    "Organize youth cultural programs",
    "Lobby for broadband and infrastructure",
    "Translate policy into plain-language guides"
  ],
  skills: [
    "Community organizing",
    "Grant writing",
    "Bilingual facilitation (English/Diné bizaad)",
    "Stakeholder mediation"
  ],
  vocabulary: [
    "chapter house",
    "sovereignty",
    "language nest",
    "mutual aid",
    "broadband desert"
  ],
  goals: [
    "Preserve language and ceremony",
    "Improve healthcare access",
    "Close the digital divide",
    "Mentor emerging youth leaders"
  ],
  pain_points: [
    "Sparse infrastructure and unreliable service",
    "Long travel on poor roads",
    "External partners ignoring protocol",
    "Limited funding cycles"
  ],
  tools: [
    "Smartphone hotspot",
    "Community radio",
    "Shared vans for outreach",
    "Learning management apps"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:indigenous",
    "region:US-Southwest",
    "role:advocate",
    "topic:digital-divide"
  ],
  mappings: {},
  meta: {
    seniority: ["mid"],
    industries: ["public-health", "education", "nonprofit"],
    synonyms: ["reservation advocate", "tribal youth organizer"]
  }
},
{
  id: "wheelchair-using-developer",
  name: "Wheelchair user software developer",
  profession: "Software Engineering",
  summary: "Full-stack dev and accessibility advocate who route-plans life around ramps, elevators, and energy budgeting.",
  description: "A 30-year-old developer with a spinal cord injury; independent, athletic, and vocal about inclusive products and public spaces.",
  core_tasks: [
    "Ship accessible features",
    "Automate tests for a11y",
    "Plan accessible routes to offices",
    "Maintain mobility equipment"
  ],
  skills: [
    "JavaScript/TypeScript",
    "Accessibility auditing (WCAG)",
    "API design",
    "Public speaking"
  ],
  vocabulary: [
    "WCAG",
    "curb cut",
    "transfer board",
    "accessible transit",
    "keyboard nav"
  ],
  goals: [
    "Senior/lead engineer role",
    "Broader a11y adoption",
    "Barrier-free commuting",
    "Adaptive sport achievements"
  ],
  pain_points: [
    "Broken elevators/inaccessible venues",
    "Tokenism in product planning",
    "Costly adaptive gear",
    "Social assumptions"
  ],
  tools: [
    "Power wheelchair",
    "A11y testing suites",
    "Voice dictation",
    "Route/accessibility apps"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:disabled",
    "condition:mobility",
    "role:engineer",
    "topic:accessibility"
  ],
  mappings: {},
  meta: {
    seniority: ["mid","senior"],
    industries: ["software", "healthtech"],
    synonyms: ["para developer", "mobility-impaired engineer"]
  }
},
{
  id: "deaf-asl-designer",
  name: "Deaf designer (ASL-first)",
  profession: "Design",
  summary: "Visual-first product designer advocating captions, interpreters, and equitable meeting practices.",
  description: "A 35-year-old Deaf creative who leads with sketches, prototypes, and inclusive patterns; fluent in ASL with strong lip-reading.",
  core_tasks: [
    "Prototype UI flows",
    "Ensure captioned media",
    "Coordinate interpreters/CART",
    "Run visual workshops"
  ],
  skills: [
    "Figma",
    "Design systems",
    "Motion & iconography",
    "Accessibility heuristics"
  ],
  vocabulary: [
    "ASL",
    "CART",
    "open captions",
    "visual affordance",
    "turn-taking"
  ],
  goals: [
    "Art director track",
    "Default captions in product",
    "Deaf mentorship programs",
    "Emergency comms access"
  ],
  pain_points: [
    "Meetings without access",
    "Auto-caption inaccuracies",
    "Hiring bias",
    "Side conversations off-camera"
  ],
  tools: [
    "Video relay services",
    "Messaging-first workflows",
    "Captioning platforms",
    "Visual note apps"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:deaf",
    "condition:deaf",
    "role:designer",
    "topic:communication-access"
  ],
  mappings: {},
  meta: {
    seniority: ["mid","senior"],
    industries: ["tech", "media"],
    synonyms: ["ASL user", "Deaf creative"]
  }
},
{
  id: "blind-attorney-tech-forward",
  name: "Blind attorney (tech-forward)",
  profession: "Legal Services",
  summary: "Public-interest lawyer who reads the world through screen readers and Braille; relentless on access rights.",
  description: "A 32-year-old attorney at a nonprofit law center; pairs a guide dog with power-user mastery of assistive tech.",
  core_tasks: [
    "Draft briefs with screen reader",
    "Argue accessibility cases",
    "Train staff on inclusive docs",
    "Mentor blind interns"
  ],
  skills: [
    "Statutory analysis",
    "Litigation",
    "Policy advocacy",
    "Assistive tech fluency"
  ],
  vocabulary: [
    "alt text",
    "Braille display",
    "reasonable accommodation",
    "structural navigation",
    "ARIA"
  ],
  goals: [
    "Policy impact at scale",
    "Accessible courts & filings",
    "Independent travel mastery",
    "Home ownership"
  ],
  pain_points: [
    "Inaccessible PDFs/portals",
    "Unlabeled UI controls",
    "Touchscreen kiosks",
    "Patronizing attitudes"
  ],
  tools: [
    "Screen reader + Braille",
    "Document remediators",
    "Smart speaker routines",
    "GPS orientation apps"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:blind",
    "condition:blindness",
    "role:lawyer",
    "topic:assistive-tech"
  ],
  mappings: {},
  meta: {
    seniority: ["mid"],
    industries: ["legal", "civic-tech"],
    synonyms: ["screen reader power user", "blind litigator"]
  }
},
{
  id: "veteran-ptsd-student",
  name: "Veteran student with PTSD (cybersecurity track)",
  profession: "Student",
  summary: "Rebuilding mission and identity; balances GI Bill studies with therapy and structured routines.",
  description: "A 33-year-old Army veteran transitioning to civilian life; disciplined, honest, and seeking community beyond the uniform.",
  core_tasks: [
    "Attend therapy/telehealth",
    "Study security fundamentals",
    "Use routines and reminders",
    "Engage veteran peer groups"
  ],
  skills: [
    "Operational discipline",
    "Risk assessment",
    "Team communication",
    "Calm under pressure"
  ],
  vocabulary: [
    "grounding techniques",
    "flashback triggers",
    "SOC analyst",
    "runbook",
    "sleep hygiene"
  ],
  goals: [
    "Break into cybersecurity",
    "Stable income & housing",
    "Symptom management",
    "Mentor other vets"
  ],
  pain_points: [
    "Concentration dips",
    "Crowd/noise sensitivity",
    "Benefits bureaucracy",
    "Isolation from peers"
  ],
  tools: [
    "Meditation/CBT apps",
    "Noise-cancelling headphones",
    "Task managers",
    "Campus disability services"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:veteran",
    "condition:ptsd",
    "role:student",
    "sector:cybersecurity"
  ],
  mappings: {},
  meta: {
    seniority: ["junior"],
    industries: ["higher-ed", "infosec"],
    synonyms: ["GI Bill learner", "returning service member"]
  }
},
{
  id: "trans-woman-project-manager",
  name: "Transgender woman project manager",
  profession: "Project Management",
  summary: "Stealth at work, visible in community; navigates legal docs, healthcare, and bias while shipping results.",
  description: "A 29-year-old PM in a marketing org; organized, empathetic, and building safer spaces for trans colleagues.",
  core_tasks: [
    "Coordinate cross-team roadmaps",
    "Manage legal name/pronoun updates",
    "Vet inclusive vendors",
    "Track HRT/health appointments"
  ],
  skills: [
    "Roadmapping",
    "Stakeholder alignment",
    "Change management",
    "Advocacy"
  ],
  vocabulary: [
    "gender marker",
    "inclusive policy",
    "stealth vs out",
    "deadname",
    "benefits appeal"
  ],
  goals: [
    "Promotion to director",
    "Reliable, affirming healthcare",
    "Inclusive corporate policy",
    "Public education on trans issues"
  ],
  pain_points: [
    "Workplace bias/microaggressions",
    "Insurance denials/delays",
    "Safety concerns in public",
    "Emotional labor of educating others"
  ],
  tools: [
    "Project boards",
    "Name/pronoun settings in HRIS",
    "Hormone tracking app",
    "Community center networks"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:transgender",
    "role:pm",
    "topic:dei",
    "region:US"
  ],
  mappings: {},
  meta: {
    seniority: ["mid"],
    industries: ["marketing", "tech"],
    synonyms: ["trans PM", "gender-diverse project lead"]
  }
},
{
  id: "observant-muslim-teacher",
  name: "Observant Muslim American teacher (hijabi)",
  profession: "Education",
  summary: "STEM educator and mother balancing prayer, classrooms, and interfaith community building.",
  description: "A 34-year-old high school science teacher who organizes inclusive events, champions culturally responsive curricula, and schedules around prayer times.",
  core_tasks: [
    "Deliver inquiry-based science lessons",
    "Coordinate prayer/accommodation schedules",
    "Run interfaith events",
    "Develop inclusive curriculum"
  ],
  skills: [
    "Classroom management",
    "Curriculum design",
    "Parent engagement",
    "Cultural mediation"
  ],
  vocabulary: [
    "halal options",
    "Ramadan schedule",
    "interfaith dialogue",
    "modest attire",
    "family night"
  ],
  goals: [
    "Curriculum leadership role",
    "Positive representation for students",
    "Work-life-faith harmony",
    "Family cultural trips"
  ],
  pain_points: [
    "Stereotypes/Islamophobia",
    "Schedule conflicts on holy days",
    "Limited modest pro attire options",
    "Emotional labor of being a “representative”"
  ],
  tools: [
    "Prayer reminder apps",
    "Learning platforms",
    "Parent WhatsApp groups",
    "Community center resources"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:muslim",
    "identity:woman",
    "role:teacher",
    "topic:religious-accommodation"
  ],
  mappings: {},
  meta: {
    seniority: ["mid"],
    industries: ["k12-education"],
    synonyms: ["hijabi professional", "Muslim educator"]
  }
},
{
  id: "unhoused-urban-worker",
  name: "Unhoused urban jobseeker",
  profession: "Jobseeker",
  summary: "Resourceful city survivor leveraging libraries, day labor, and phones to rebuild stability.",
  description: "A 45-year-old man experiencing homelessness after job loss; organized, respectful, and focused on reentry to steady work and housing.",
  core_tasks: [
    "Secure shelter/food daily",
    "Apply to jobs and training",
    "Protect documents and phone",
    "Navigate aid systems"
  ],
  skills: [
    "Adaptability",
    "Budgeting small cash",
    "Street smarts",
    "Networking at services"
  ],
  vocabulary: [
    "intake",
    "case manager",
    "day labor ticket",
    "vouchering",
    "harm reduction"
  ],
  goals: [
    "Stable housing",
    "Full-time employment",
    "Rebuild family ties",
    "Financial cushion"
  ],
  pain_points: [
    "Stigma from employers/landlords",
    "Device charging/connectivity",
    "Document security",
    "Shelter safety/cleanliness"
  ],
  tools: [
    "Prepaid smartphone",
    "Public library PCs",
    "Transit pass",
    "Job boards & text alerts"
  ],
  tags: [
    "persona_kind:archetype",
    "identity:unhoused",
    "role:jobseeker",
    "topic:reentry",
    "region:US-urban"
  ],
  mappings: {},
  meta: {
    seniority: ["junior"],
    industries: ["general-labor", "service"],
    synonyms: ["person experiencing homelessness", "shelter client"]
  }
}


    // — Add more entries following the same fields. Keep examples short and neutral.
  ];

  // Lightweight search hooks (mirrors persona index behavior)
  BIASES.forEach(b => {
    b.meta = b.meta || {};
    const extras = new Set([
      b.name, b.category, b.kind,
      ...(b.meta.synonyms || []),
      ...(b.tags || [])
    ]);
    b.meta.search_text = Array.from(extras).join(" ").toLowerCase();
  });

  // Export for browser and Node/CommonJS (same shape as personas)
  root.BIASES = BIASES;
  if (typeof module !== 'undefined') module.exports = BIASES;
})(typeof window !== 'undefined' ? window : globalThis);
