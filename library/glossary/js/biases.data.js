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
},

// ===== Paradoxes ===== 

{ id: "liar-paradox", name: "Liar paradox", kind: "dilemma", category: "logic", summary: "A sentence that asserts its own falsehood creates a contradiction.", definition: "Statements like “This sentence is false” are true iff they are false, and false iff they are true.", contexts: ["Logic", "Semantics", "Foundations"], tags: ["class:paradox","domain:logic","theme:self-reference"], mappings: { wikipedia: "Liar_paradox" } }, { id: "strengthened-liar-paradox", name: "Strengthened liar paradox", kind: "dilemma", category: "logic", summary: "Variants avoid direct truth talk yet still self-undermine.", definition: "Claims like “This sentence is not true” or “This sentence is not provable” reintroduce the liar difficulty under different vocabularies.", contexts: ["Logic", "Truth theories"], tags: ["class:paradox","domain:logic","theme:self-reference"], mappings: { wikipedia: "Liar_paradox#Strengthened_liers" } }, { id: "yablo-paradox", name: "Yablo’s paradox", kind: "dilemma", category: "logic", summary: "An infinite sequence of sentences each says all later ones are false.", definition: "Self-reference is avoided locally but arises globally, yielding contradiction without direct self-reference.", contexts: ["Logic", "Philosophy of language"], tags: ["class:paradox","domain:logic","theme:self-reference"], mappings: { wikipedia: "Yablo%27s_paradox" } }, { id: "curry-paradox", name: "Curry’s paradox", kind: "dilemma", category: "logic", summary: "Self-referential implication yields triviality without negation.", definition: "From a sentence that says 'if this sentence is true, then P', naive systems derive any proposition P.", contexts: ["Proof theory", "Combinatory logic"], tags: ["class:paradox","domain:logic","theme:self-reference"], mappings: { wikipedia: "Curry%27s_paradox" } }, { id: "russell-paradox", name: "Russell’s paradox", kind: "dilemma", category: "set-theory", summary: "The set of all sets that do not contain themselves leads to contradiction.", definition: "Naive comprehension in set theory allows R ∈ R iff R ∉ R.", contexts: ["Foundations of math", "Type theory"], tags: ["class:paradox","domain:set-theory","theme:comprehension"], mappings: { wikipedia: "Russell%27s_paradox" } }, { id: "barber-paradox", name: "Barber paradox", kind: "dilemma", category: "logic", summary: "A barber shaves all and only those who do not shave themselves.", definition: "Querying whether the barber shaves himself recreates Russell’s contradiction in story form.", contexts: ["Logic education", "Foundations"], tags: ["class:paradox","domain:logic","theme:self-reference"], mappings: { wikipedia: "Barber_paradox" } }, { id: "berry-paradox", name: "Berry paradox", kind: "dilemma", category: "logic", summary: "“The smallest positive integer not definable in under n words.”", definition: "Phrases about definability create self-defeating descriptions.", contexts: ["Philosophy of math", "Kolmogorov complexity"], tags: ["class:paradox","domain:logic","theme:description"], mappings: { wikipedia: "Berry_paradox" } }, { id: "richards-paradox", name: "Richard’s paradox", kind: "dilemma", category: "logic", summary: "Defining real numbers in language leads to a diagonal contradiction.", definition: "A definable number is constructed to differ from all definable numbers.", contexts: ["Set theory", "Definability"], tags: ["class:paradox","domain:logic","theme:diagonalization"], mappings: { wikipedia: "Richard%27s_paradox" } }, { id: "grelling-nelson-paradox", name: "Grelling–Nelson (heterological) paradox", kind: "dilemma", category: "logic", summary: "Is “heterological” heterological?", definition: "Predicates that do not apply to themselves generate a liar-like contradiction.", contexts: ["Semantics", "Foundations"], tags: ["class:paradox","domain:logic","theme:self-application"], mappings: { wikipedia: "Grelling%E2%80%93Nelson_paradox" } }, { id: "quine-paradox", name: "Quine’s paradox", kind: "dilemma", category: "logic", summary: "“Yields falsehood when preceded by its quotation” yields falsehood when preceded by its quotation.", definition: "A cleverly self-referential sentence produces contradiction sans explicit 'truth'.", contexts: ["Semantics", "Philosophy of language"], tags: ["class:paradox","domain:logic","theme:self-reference"], mappings: { wikipedia: "Quine%27s_paradox" } }, { id: "skolem-paradox", name: "Skolem (Löwenheim–Skolem) paradox", kind: "dilemma", category: "set-theory", summary: "Countable models of set theory contain 'uncountable' sets internally.", definition: "Model-theoretic relativity of 'countable' vs 'uncountable' looks paradoxical but is coherent.", contexts: ["Model theory", "Foundations"], tags: ["class:paradox","domain:set-theory","theme:model-relativity"], mappings: { wikipedia: "Skolem%27s_paradox" } }, { id: "cantor-paradox", name: "Cantor’s paradox", kind: "dilemma", category: "set-theory", summary: "The set of all sets would have a power set of strictly larger cardinality.", definition: "Assuming a universal set leads to contradiction via diagonalization.", contexts: ["Set theory foundations"], tags: ["class:paradox","domain:set-theory","theme:infinite-sets"], mappings: { wikipedia: "Cantor%27s_paradox" } }, { id: "burali-forti-paradox", name: "Burali–Forti paradox", kind: "dilemma", category: "set-theory", summary: "The set of all ordinals would itself have an ordinal larger than all.", definition: "Constructing 'the ordinal of all ordinals' contradicts well-ordering assumptions.", contexts: ["Set theory", "Ordinals"], tags: ["class:paradox","domain:set-theory","theme:ordinals"], mappings: { wikipedia: "Burali%E2%80%93Forti_paradox" } }, { id: "banach-tarski-paradox", name: "Banach–Tarski paradox", kind: "dilemma", category: "math", summary: "A ball can be partitioned and reassembled into two balls of the same size.", definition: "Using the Axiom of Choice and non-measurable sets, 3D space admits paradoxical decompositions.", contexts: ["Measure theory", "Set theory"], tags: ["class:paradox","domain:math","theme:axiom-of-choice"], mappings: { wikipedia: "Banach%E2%80%93Tarski_paradox" } }, { id: "hausdorff-paradox", name: "Hausdorff paradox", kind: "dilemma", category: "math", summary: "Paradoxical decomposition on the sphere using rotations.", definition: "Precursor to Banach–Tarski; shows non-measurability phenomena on S².", contexts: ["Measure theory"], tags: ["class:paradox","domain:math","theme:non-measurable-sets"], mappings: { wikipedia: "Hausdorff_paradox" } }, { id: "vitali-set-paradox", name: "Vitali set paradox", kind: "dilemma", category: "math", summary: "Existence of non-measurable subsets of the reals.", definition: "With Choice, one constructs a set with no Lebesgue measure, clashing with naive intuitions.", contexts: ["Measure theory"], tags: ["class:paradox","domain:math","theme:non-measurable-sets"], mappings: { wikipedia: "Vitali_set" } }, { id: "galileos-paradox", name: "Galileo’s paradox", kind: "dilemma", category: "infinity", summary: "Natural numbers are in one-to-one correspondence with their squares, yet squares seem fewer.", definition: "Infinite sets equinumerous with proper subsets defy finite intuitions.", contexts: ["Set theory", "History of math"], tags: ["class:paradox","domain:infinity","theme:equinumerosity"], mappings: { wikipedia: "Galileo%27s_paradox" } },

{
id: "sorites-paradox",
name: "Sorites (heap) paradox",
kind: "dilemma",
category: "logic",
summary: "Small changes across a vague predicate yield a sharp contradiction.",
definition: "If removing one grain doesn’t make a heap non-heap, repeated application implies even one grain is a heap or no heap is ever lost.",
contexts: ["Vagueness", "Semantics"],
tags: ["class:paradox","domain:logic","theme:vagueness"],
mappings: { wikipedia: "Sorites_paradox" }
},
{
id: "ship-of-theseus",
name: "Ship of Theseus",
kind: "dilemma",
category: "metaphysics",
summary: "Identity persists despite total replacement of parts.",
definition: "If each plank is replaced over time, is the rebuilt ship identical to the original, and what of a ship rebuilt from the discarded planks?",
contexts: ["Personal identity", "Material constitution"],
tags: ["class:paradox","domain:metaphysics","theme:identity-over-time"],
mappings: { wikipedia: "Ship_of_Theseus" }
},
{
id: "grandfather-paradox",
name: "Grandfather paradox",
kind: "dilemma",
category: "time",
summary: "Backward time travel allows preventing one’s own existence.",
definition: "If you travel back and prevent your ancestor’s reproduction, you preclude your travel, undermining the action that caused it.",
contexts: ["Time travel", "Causation"],
tags: ["class:paradox","domain:time","theme:causal-loop"],
mappings: { wikipedia: "Grandfather_paradox" }
},
{
id: "bootstrap-paradox",
name: "Bootstrap paradox",
kind: "dilemma",
category: "time",
summary: "Objects or information appear without origin via time loops.",
definition: "A future item is sent back and becomes its own source, creating causation without an initial cause.",
contexts: ["Time travel", "Ontology"],
tags: ["class:paradox","domain:time","theme:causal-loop"],
mappings: { wikipedia: "Bootstrap_paradox" }
},
{
id: "predestination-paradox",
name: "Predestination paradox",
kind: "dilemma",
category: "time",
summary: "Attempts to change the past help bring it about.",
definition: "A time traveler’s interventions are already part of history and ensure the very event they sought to prevent.",
contexts: ["Time travel", "Determinism"],
tags: ["class:paradox","domain:time","theme:fatalism"],
mappings: { wikipedia: "Predestination_paradox" }
},
{
id: "newcombs-paradox",
name: "Newcomb’s paradox",
kind: "dilemma",
category: "decision",
summary: "Dominance vs. expected utility disagree in a predictor game.",
definition: "A near-perfect predictor’s prior move pits one-boxers (EU) against two-boxers (dominance), challenging rational choice principles.",
contexts: ["Decision theory", "Causation vs. evidential"],
tags: ["class:paradox","domain:decision","theme:rational-choice"],
mappings: { wikipedia: "Newcomb%27s_paradox" }
},
{
id: "prisoners-dilemma",
name: "Prisoner’s dilemma",
kind: "dilemma",
category: "game-theory",
summary: "Mutual defection is individually rational yet jointly worse.",
definition: "Two self-interested agents defect in a one-shot game, yielding lower payoff than mutual cooperation despite common interest.",
contexts: ["Cooperation", "Mechanism design"],
tags: ["class:paradox","domain:game-theory","theme:collective-action"],
mappings: { wikipedia: "Prisoner%27s_dilemma" }
},
{
id: "monty-hall-problem",
name: "Monty Hall problem",
kind: "dilemma",
category: "probability",
summary: "Switching doors doubles your chance but feels wrong.",
definition: "Conditional probabilities given host behavior imply switching yields 2/3 success, defying naive symmetry.",
contexts: ["Bayesian reasoning", "Education"],
tags: ["class:paradox","domain:probability","theme:conditional-probability"],
mappings: { wikipedia: "Monty_Hall_problem" }
},
{
id: "st-petersburg-paradox",
name: "St. Petersburg paradox",
kind: "dilemma",
category: "probability",
summary: "Infinite expected value clashes with finite willingness to pay.",
definition: "A lottery with unbounded expectation yields implausible valuations, motivating utility curvature and risk aversion.",
contexts: ["Decision theory", "Utility"],
tags: ["class:paradox","domain:probability","theme:expected-value"],
mappings: { wikipedia: "St._Petersburg_paradox" }
},
{
id: "allais-paradox",
name: "Allais paradox",
kind: "dilemma",
category: "decision",
summary: "Human choices violate expected utility independence.",
definition: "Certainty effects and weighting of outcomes show systematic departures from the independence axiom.",
contexts: ["Behavioral econ", "Risk"],
tags: ["class:paradox","domain:decision","theme:risk-preference"],
mappings: { wikipedia: "Allais_paradox" }
},
{
id: "ellsberg-paradox",
name: "Ellsberg paradox",
kind: "dilemma",
category: "decision",
summary: "Ambiguity aversion violates subjective expected utility.",
definition: "Preferences for known probabilities over unknown ones contradict Savage axioms under uncertainty.",
contexts: ["Behavioral econ", "Uncertainty"],
tags: ["class:paradox","domain:decision","theme:ambiguity-aversion"],
mappings: { wikipedia: "Ellsberg_paradox" }
},
{
id: "simpsons-paradox",
name: "Simpson’s paradox",
kind: "dilemma",
category: "statistics",
summary: "Aggregated trends reverse within subgroups.",
definition: "Simpson reversals show that confounding and aggregation can invert associations unless stratified.",
contexts: ["Data analysis", "Causality"],
tags: ["class:paradox","domain:statistics","theme:aggregation-bias"],
mappings: { wikipedia: "Simpson%27s_paradox" }
},
{
id: "bertrand-paradox",
name: "Bertrand paradox (probability)",
kind: "dilemma",
category: "probability",
summary: "Different 'random chord' methods give different answers.",
definition: "Ill-posedness of 'random' in continuous spaces yields measure-dependent probabilities.",
contexts: ["Geometric probability", "Foundations"],
tags: ["class:paradox","domain:probability","theme:measure-dependence"],
mappings: { wikipedia: "Bertrand_paradox" }
},
{
id: "bertrands-box-paradox",
name: "Bertrand’s box paradox",
kind: "dilemma",
category: "probability",
summary: "Intuition fails on conditional sampling from boxes.",
definition: "Posterior odds after observing a gold coin differ from naive 1/2 expectations; proper conditioning yields 2/3.",
contexts: ["Bayesian inference", "Puzzles"],
tags: ["class:paradox","domain:probability","theme:conditioning"],
mappings: { wikipedia: "Bertrand%27s_box_paradox" }
},
{
id: "borel-kolmogorov-paradox",
name: "Borel–Kolmogorov paradox",
kind: "dilemma",
category: "probability",
summary: "Conditioning on measure-zero events is not invariant.",
definition: "Different parameterizations induce different conditional distributions on null sets, challenging naive conditioning.",
contexts: ["Bayesian foundations", "Measure theory"],
tags: ["class:paradox","domain:probability","theme:conditionalization"],
mappings: { wikipedia: "Borel%E2%80%93Kolmogorov_paradox" }
},
{
id: "gabriels-horn",
name: "Gabriel’s horn",
kind: "dilemma",
category: "math",
summary: "Finite volume but infinite surface area.",
definition: "The solid from y=1/x, x≥1, revolved about the x-axis can be filled with paint but cannot be painted.",
contexts: ["Analysis", "Measure theory"],
tags: ["class:paradox","domain:math","theme:infinite-processes"],
mappings: { wikipedia: "Gabriel%27s_Horn" }
},
{
id: "ross-littlewood-paradox",
name: "Ross–Littlewood supertask paradox",
kind: "dilemma",
category: "infinity",
summary: "Infinite steps in finite time yield counterintuitive totals.",
definition: "Adding and removing balls per minute can leave an urn empty or full depending on the schedule despite endless insertion.",
contexts: ["Supertasks", "Set theory"],
tags: ["class:paradox","domain:infinity","theme:limit-process"],
mappings: { wikipedia: "Ross%E2%80%93Littlewood_paradox" }
},
{
id: "thomsons-lamp",
name: "Thomson’s lamp",
kind: "dilemma",
category: "infinity",
summary: "After infinitely many toggles in finite time, is the lamp on?",
definition: "A supertask alternates a lamp’s state at halving intervals; the limit state appears undefined.",
contexts: ["Philosophy of math", "Time"],
tags: ["class:paradox","domain:infinity","theme:supertask"],
mappings: { wikipedia: "Thomson%27s_lamp" }
},
{
id: "zeno-achilles",
name: "Zeno: Achilles and the tortoise",
kind: "dilemma",
category: "infinity",
summary: "Motion seems impossible due to infinite subgoals.",
definition: "Achilles must traverse infinitely many diminishing intervals, suggesting he can never overtake the tortoise.",
contexts: ["Continuity", "Motion"],
tags: ["class:paradox","domain:infinity","theme:infinite-divisibility"],
mappings: { wikipedia: "Zeno%27s_paradoxes#Achilles_and_the_Tortoise" }
},
{
id: "zeno-dichotomy",
name: "Zeno: Dichotomy",
kind: "dilemma",
category: "infinity",
summary: "Before reaching a point, one must reach its half, ad infinitum.",
definition: "Completing infinitely many prior tasks appears impossible, challenging naive accounts of motion.",
contexts: ["Continuity", "Motion"],
tags: ["class:paradox","domain:infinity","theme:infinite-divisibility"],
mappings: { wikipedia: "Zeno%27s_paradoxes#Dichotomy_paradox" }
},
{
id: "zeno-arrow",
name: "Zeno: Arrow",
kind: "dilemma",
category: "infinity",
summary: "An instantaneously observed arrow is motionless, so how does it move?",
definition: "If time is composed of instants, motion seems absent at each, yielding stasis.",
contexts: ["Time", "Physics"],
tags: ["class:paradox","domain:infinity","theme:instant-vs-interval"],
mappings: { wikipedia: "Zeno%27s_paradoxes#Arrow_paradox" }
},
{
id: "zeno-stadium",
name: "Zeno: Stadium",
kind: "dilemma",
category: "infinity",
summary: "Relative motion implies contradictory times for equal distances.",
definition: "Rows of bodies moving past each other yield incompatible measures of time and distance.",
contexts: ["Kinematics", "Ancient philosophy"],
tags: ["class:paradox","domain:infinity","theme:relative-motion"],
mappings: { wikipedia: "Zeno%27s_paradoxes#Stadium_paradox" }
},
{
id: "hempels-ravens",
name: "Hempel’s ravens paradox",
kind: "dilemma",
category: "epistemology",
summary: "A green apple seems to confirm 'all ravens are black'.",
definition: "Equivalence of hypotheses makes non-black non-ravens confirm 'all ravens are black', clashing with relevance intuitions.",
contexts: ["Confirmation theory", "Induction"],
tags: ["class:paradox","domain:epistemology","theme:confirmation"],
mappings: { wikipedia: "Raven_paradox" }
},
{
id: "preface-paradox",
name: "Preface paradox",
kind: "dilemma",
category: "epistemology",
summary: "Rational belief in each claim plus a belief that at least one is false.",
definition: "Authors rationally doubt that all claims are true while believing each claim, yielding apparent inconsistency.",
contexts: ["Belief aggregation", "Rationality"],
tags: ["class:paradox","domain:epistemology","theme:consistency"],
mappings: { wikipedia: "Preface_paradox" }
},
{
id: "lottery-paradox",
name: "Lottery paradox",
kind: "dilemma",
category: "epistemology",
summary: "Individually rational beliefs jointly entail an irrational conclusion.",
definition: "Believing each ticket will lose (high probability) conflicts with the certainty that one ticket wins.",
contexts: ["Justification", "Belief closure"],
tags: ["class:paradox","domain:epistemology","theme:fallible-knowledge"],
mappings: { wikipedia: "Lottery_paradox" }
},
{
id: "fitchs-knowability-paradox",
name: "Fitch’s paradox of knowability",
kind: "dilemma",
category: "epistemology",
summary: "If all truths are knowable, all truths are known.",
definition: "Modal logic plus a knowability schema collapses to omniscience unless restricted.",
contexts: ["Modal logic", "Anti-realism"],
tags: ["class:paradox","domain:epistemology","theme:knowability"],
mappings: { wikipedia: "Fitch%27s_paradox_of_knowability" }
},
{
id: "gettier-problem",
name: "Gettier 'paradox'",
kind: "dilemma",
category: "epistemology",
summary: "Justified true belief can fail to be knowledge.",
definition: "Cases with epistemic luck challenge the classical JTB analysis, forcing revised accounts.",
contexts: ["Theory of knowledge", "Philosophy"],
tags: ["class:paradox","domain:epistemology","theme:epistemic-luck"],
mappings: { wikipedia: "Gettier_problem" }
},
{
id: "moores-paradox",
name: "Moore’s paradox",
kind: "dilemma",
category: "language",
summary: "Asserting 'P and I don’t believe P' is absurd yet not contradictory.",
definition: "The content is logically consistent but pragmatically incoherent for a sincere speaker.",
contexts: ["Pragmatics", "Belief reports"],
tags: ["class:paradox","domain:language","theme:assertion-belief"],
mappings: { wikipedia: "Moore%27s_paradox" }
},
{
id: "unexpected-hanging",
name: "Unexpected hanging (surprise exam) paradox",
kind: "dilemma",
category: "logic",
summary: "Backward induction that seems to prove surprise impossible, yet surprise occurs.",
definition: "A judge’s announcement and reasoning about prediction produce a contradiction about foreseen surprise.",
contexts: ["Epistemic logic", "Reasoning about belief"],
tags: ["class:paradox","domain:logic","theme:self-reference-knowledge"],
mappings: { wikipedia: "Unexpected_hanging_paradox" }
},
{
id: "sleeping-beauty",
name: "Sleeping Beauty problem",
kind: "dilemma",
category: "probability",
summary: "Self-locating belief splits Thirder vs. Halfer credences.",
definition: "Upon awakening with memory erasure, Beauty’s credence in Heads is debated between 1/3 and 1/2.",
contexts: ["Anthropic reasoning", "Bayesianism"],
tags: ["class:paradox","domain:probability","theme:self-locating-belief"],
mappings: { wikipedia: "Sleeping_Beauty_problem" }
},
{
id: "two-envelope-paradox",
name: "Two-envelope paradox",
kind: "dilemma",
category: "probability",
summary: "Symmetric reasoning seems to always favor switching.",
definition: "Expected value calculations with improper priors create illusory advantage to switching envelopes.",
contexts: ["Decision theory", "Bayesian priors"],
tags: ["class:paradox","domain:probability","theme:improper-priors"],
mappings: { wikipedia: "Two_envelopes_problem" }
},
{
id: "parrondos-paradox",
name: "Parrondo’s paradox",
kind: "dilemma",
category: "game-theory",
summary: "Alternating losing games yields a winning game.",
definition: "Two negative-expectation processes combine (with sequencing) to produce positive drift.",
contexts: ["Stochastic processes", "Control"],
tags: ["class:paradox","domain:game-theory","theme:nonlinearity"],
mappings: { wikipedia: "Parrondo%27s_paradox" }
},
{
id: "braesss-paradox",
name: "Braess’s paradox",
kind: "dilemma",
category: "transport",
summary: "Adding capacity to a network can worsen overall traffic.",
definition: "Selfish routing on a new link creates a worse Nash equilibrium than before the addition.",
contexts: ["Traffic", "Networks"],
tags: ["class:paradox","domain:networks","theme:selfish-routing"],
mappings: { wikipedia: "Braess%27s_paradox" }
},
{
id: "jevons-paradox",
name: "Jevons paradox",
kind: "dilemma",
category: "economics",
summary: "Efficiency gains can increase total consumption.",
definition: "Cheaper effective use spurs demand, offsetting savings (rebound effects).",
contexts: ["Energy policy", "Sustainability"],
tags: ["class:paradox","domain:economics","theme:rebound-effect"],
mappings: { wikipedia: "Jevons_paradox" }
},
{
id: "abilene-paradox",
name: "Abilene paradox",
kind: "dilemma",
category: "social",
summary: "Groups pursue outcomes no one individually prefers.",
definition: "Mismanaged agreement and pluralistic ignorance push teams into unwanted collective decisions.",
contexts: ["Org behavior", "Group decision-making"],
tags: ["class:paradox","domain:social","theme:coordination-failure"],
mappings: { wikipedia: "Abilene_paradox" }
},
{
id: "condorcet-paradox",
name: "Condorcet paradox",
kind: "dilemma",
category: "social-choice",
summary: "Majority preferences can be cyclic and intransitive.",
definition: "Pairwise majority rule over three or more options can produce cycles (A>B, B>C, C>A).",
contexts: ["Voting", "Mechanism design"],
tags: ["class:paradox","domain:social-choice","theme:intransitivity"],
mappings: { wikipedia: "Condorcet_paradox" }
},
{
id: "no-show-paradox",
name: "No-show paradox",
kind: "dilemma",
category: "social-choice",
summary: "A voter can be harmed by participating.",
definition: "In some systems, an additional vote for a candidate may cause that candidate to lose.",
contexts: ["Elections", "Fairness"],
tags: ["class:paradox","domain:social-choice","theme:participation-harm"],
mappings: { wikipedia: "No-show_paradox" }
},
{
id: "ostrogorski-paradox",
name: "Ostrogorski paradox",
kind: "dilemma",
category: "social-choice",
summary: "Issue-by-issue majorities conflict with party overall outcomes.",
definition: "A party can win despite being a minority on each salient issue due to aggregation artifacts.",
contexts: ["Elections", "Issue voting"],
tags: ["class:paradox","domain:social-choice","theme:aggregation"],
mappings: { wikipedia: "Ostrogorski_paradox" }
},
{
id: "referendum-paradox",
name: "Referendum paradox",
kind: "dilemma",
category: "social-choice",
summary: "A candidate can win most districts yet lose the popular vote, or vice versa.",
definition: "District aggregation yields outcomes at odds with overall preferences.",
contexts: ["Apportionment", "Electoral design"],
tags: ["class:paradox","domain:social-choice","theme:aggregation"],
mappings: { wikipedia: "Referendum_paradox" }
},
{
id: "alabama-paradox",
name: "Alabama paradox",
kind: "dilemma",
category: "social-choice",
summary: "Increasing seats can cause a state to lose a seat.",
definition: "Certain apportionment methods violate monotonicity with respect to house size.",
contexts: ["Apportionment", "Fair division"],
tags: ["class:paradox","domain:social-choice","theme:non-monotonicity"],
mappings: { wikipedia: "Alabama_paradox" }
},
{
id: "population-paradox",
name: "Population paradox",
kind: "dilemma",
category: "social-choice",
summary: "A faster-growing state can lose seats to a slower-growing one.",
definition: "Apportionment across changing populations can invert expected seat changes.",
contexts: ["Apportionment", "Public policy"],
tags: ["class:paradox","domain:social-choice","theme:non-monotonicity"],
mappings: { wikipedia: "Population_paradox" }
},
{
id: "new-states-paradox",
name: "New states paradox",
kind: "dilemma",
category: "social-choice",
summary: "Admitting a new state can alter seat distribution among old states.",
definition: "Total house size change can reallocate seats counterintuitively among existing members.",
contexts: ["Apportionment", "Governance"],
tags: ["class:paradox","domain:social-choice","theme:aggregation"],
mappings: { wikipedia: "New_states_paradox" }
},
{
id: "friendship-paradox",
name: "Friendship paradox",
kind: "dilemma",
category: "social",
summary: "Your friends have, on average, more friends than you do.",
definition: "Sampling via edges in a network biases toward high-degree nodes, skewing averages.",
contexts: ["Networks", "Sociology"],
tags: ["class:paradox","domain:networks","theme:sampling-bias"],
mappings: { wikipedia: "Friendship_paradox" }
},
{
id: "eddington-paradox",
name: "Eddington paradox",
kind: "dilemma",
category: "astrophysics",
summary: "Stars appear both long-lived and rapidly consuming fuel.",
definition: "Early stellar models predicted short lifetimes inconsistent with observed ages, prompting new physics.",
contexts: ["Stellar physics", "History of science"],
tags: ["class:paradox","domain:physics","theme:energy-balance"],
mappings: { wikipedia: "Eddington_paradox" }
},
{
id: "fermi-paradox",
name: "Fermi paradox",
kind: "dilemma",
category: "cosmology",
summary: "High estimates of extraterrestrial life clash with lack of evidence.",
definition: "Cosmic scale and habitability suggest many civilizations; yet we see silence, prompting resolution classes (filters, selection).",
contexts: ["Astrobiology", "SETI"],
tags: ["class:paradox","domain:cosmology","theme:observational-silence"],
mappings: { wikipedia: "Fermi_paradox" }
},
{
id: "twin-paradox",
name: "Twin paradox",
kind: "dilemma",
category: "physics",
summary: "Time dilation yields asymmetric aging of twins.",
definition: "Relativity predicts the traveling twin ages less; acceleration and simultaneity resolve the seeming symmetry.",
contexts: ["Relativity", "Time"],
tags: ["class:paradox","domain:physics","theme:time-dilation"],
mappings: { wikipedia: "Twin_paradox" }
},
{
id: "ehrenfest-paradox",
name: "Ehrenfest paradox",
kind: "dilemma",
category: "physics",
summary: "Rigid rotating disks conflict with special relativity.",
definition: "Length contraction around a rotating rim challenges Euclidean geometry of the disk.",
contexts: ["Relativity", "Geometry"],
tags: ["class:paradox","domain:physics","theme:non-euclidean-geometry"],
mappings: { wikipedia: "Ehrenfest_paradox" }
},
{
id: "bells-spaceship-paradox",
name: "Bell’s spaceship paradox",
kind: "dilemma",
category: "physics",
summary: "Two accelerating ships connected by a string experience tension.",
definition: "Simultaneous acceleration in one frame does not preserve rest-length, snapping the string.",
contexts: ["Relativity", "Kinematics"],
tags: ["class:paradox","domain:physics","theme:relativity"],
mappings: { wikipedia: "Bell%27s_spaceship_paradox" }
},
{
id: "ladder-paradox",
name: "Ladder (barn-pole) paradox",
kind: "dilemma",
category: "physics",
summary: "Length contraction allows a long ladder to fit a short barn.",
definition: "Relativity of simultaneity reconciles contradictory 'fit' judgments across frames.",
contexts: ["Relativity", "Thought experiments"],
tags: ["class:paradox","domain:physics","theme:simultaneity"],
mappings: { wikipedia: "Ladder_paradox" }
},
{
id: "gibbs-paradox",
name: "Gibbs paradox",
kind: "dilemma",
category: "physics",
summary: "Entropy of mixing identical gases seems nonzero.",
definition: "Treating identical particles as distinguishable yields an unphysical entropy jump; quantum indistinguishability resolves it.",
contexts: ["Stat mech", "Thermodynamics"],
tags: ["class:paradox","domain:physics","theme:indistinguishability"],
mappings: { wikipedia: "Gibbs_paradox" }
},
{
id: "loschmidts-paradox",
name: "Loschmidt’s paradox",
kind: "dilemma",
category: "physics",
summary: "Microscopic reversibility vs. macroscopic irreversibility.",
definition: "Time-reversible dynamics underlie a time-asymmetric second law; low-entropy boundary conditions explain the arrow.",
contexts: ["Stat mech", "Philosophy of time"],
tags: ["class:paradox","domain:physics","theme:arrow-of-time"],
mappings: { wikipedia: "Loschmidt%27s_paradox" }
},
{
id: "zermelos-recurrence",
name: "Zermelo’s recurrence paradox",
kind: "dilemma",
category: "physics",
summary: "Poincaré recurrence challenges monotonic entropy increase.",
definition: "In finite systems, returns arbitrarily close to the initial state seem to violate the second law.",
contexts: ["Stat mech", "Dynamical systems"],
tags: ["class:paradox","domain:physics","theme:recurrence"],
mappings: { wikipedia: "Zermelo%27s_paradox" }
},
{
id: "maxwells-demon",
name: "Maxwell’s demon",
kind: "dilemma",
category: "physics",
summary: "An intelligent agent seems to decrease entropy without work.",
definition: "Information acquisition and erasure restore the second law when properly accounted for.",
contexts: ["Thermodynamics", "Information"],
tags: ["class:paradox","domain:physics","theme:information-entropy"],
mappings: { wikipedia: "Maxwell%27s_demon" }
},
{
id: "olbers-paradox",
name: "Olbers’ paradox",
kind: "dilemma",
category: "cosmology",
summary: "Why is the night sky dark if the universe is infinite and eternal?",
definition: "Cosmic expansion, finite age, and absorption resolve the apparent uniform brightness prediction.",
contexts: ["Cosmology", "Observation"],
tags: ["class:paradox","domain:cosmology","theme:background-light"],
mappings: { wikipedia: "Olbers%27_paradox" }
},
{
id: "boltzmann-brain",
name: "Boltzmann brain paradox",
kind: "dilemma",
category: "cosmology",
summary: "Random fluctuation observers would outnumber evolved ones in some models.",
definition: "Cosmic measures predicting typicality of fluctuation minds undermine ordinary inference.",
contexts: ["Anthropic reasoning", "Cosmology"],
tags: ["class:paradox","domain:cosmology","theme:typicality"],
mappings: { wikipedia: "Boltzmann_brain" }
},
{
id: "goodmans-new-riddle",
name: "Goodman’s new riddle of induction",
kind: "dilemma",
category: "epistemology",
summary: "Projecting 'grue' shows that past evidence underdetermines lawlike predicates.",
definition: "Inductive confirmation depends on predicate entrenchment, not mere extension.",
contexts: ["Induction", "Philosophy of science"],
tags: ["class:paradox","domain:epistemology","theme:underdetermination"],
mappings: { wikipedia: "New_riddle_of_induction" }
},
{
id: "rule-following-paradox",
name: "Rule-following paradox (Kripkenstein)",
kind: "dilemma",
category: "language",
summary: "No fact seems to fix what rule one follows.",
definition: "Past behavior is compatible with many future continuations; meaning appears normatively social, not purely factual.",
contexts: ["Philosophy of language", "Mind"],
tags: ["class:paradox","domain:language","theme:meaning-indeterminacy"],
mappings: { wikipedia: "Rule-following_paradox" }
},
{
id: "menos-paradox",
name: "Meno’s paradox",
kind: "dilemma",
category: "epistemology",
summary: "How can one inquire into what one doesn’t know?",
definition: "Seeking knowledge seems impossible if you cannot recognize the target nor find it by what you know.",
contexts: ["Learning theory", "Socratic method"],
tags: ["class:paradox","domain:epistemology","theme:inquiry"],
mappings: { wikipedia: "Meno#Paradox" }
},
{
id: "paradox-of-analysis",
name: "Paradox of analysis",
kind: "dilemma",
category: "language",
summary: "Correct analyses are either trivial or incorrect.",
definition: "If an analysis is true it adds nothing; if informative it seems not strictly equivalent.",
contexts: ["Concept analysis", "Philosophy"],
tags: ["class:paradox","domain:language","theme:meaning-equivalence"],
mappings: { wikipedia: "Paradox_of_analysis" }
},
{
id: "repugnant-conclusion",
name: "Repugnant conclusion",
kind: "dilemma",
category: "ethics",
summary: "Total utilitarianism prefers vast barely-happy populations.",
definition: "Seemingly reasonable axioms entail that a huge population with low welfare can be better than a smaller happy one.",
contexts: ["Population ethics", "Axiology"],
tags: ["class:paradox","domain:ethics","theme:aggregation"],
mappings: { wikipedia: "Repugnant_conclusion" }
},
{
id: "non-identity-problem",
name: "Non-identity problem",
kind: "dilemma",
category: "ethics",
summary: "Actions that harm no one in particular still seem wrong.",
definition: "Choices change which people exist; it’s hard to claim they harm specific individuals who otherwise wouldn’t exist.",
contexts: ["Population ethics", "Policy"],
tags: ["class:paradox","domain:ethics","theme:person-affecting"],
mappings: { wikipedia: "Non-identity_problem" }
},
{
id: "mere-addition-paradox",
name: "Mere addition paradox",
kind: "dilemma",
category: "ethics",
summary: "Seemingly innocuous additions lead toward the repugnant conclusion.",
definition: "Stepwise-plausible population changes yield counterintuitive global rankings.",
contexts: ["Population ethics", "Value theory"],
tags: ["class:paradox","domain:ethics","theme:aggregation"],
mappings: { wikipedia: "Mere_addition_paradox" }
},
{
id: "moral-luck-paradox",
name: "Moral luck",
kind: "dilemma",
category: "ethics",
summary: "We judge agents for outcomes beyond their control.",
definition: "Responsibility and control seem misaligned when luck shapes outcomes.",
contexts: ["Responsibility", "Law"],
tags: ["class:paradox","domain:ethics","theme:control-vs-responsibility"],
mappings: { wikipedia: "Moral_luck" }
},
{
id: "trolley-problem",
name: "Trolley problem",
kind: "dilemma",
category: "ethics",
summary: "Sacrificing one to save many vs. deontic constraints.",
definition: "Switch vs. push variants probe tension between outcomes and rights.",
contexts: ["Normative ethics", "Judgment"],
tags: ["class:paradox","domain:ethics","theme:utilitarian-vs-deontic"],
mappings: { wikipedia: "Trolley_problem" }
},
{
id: "fat-man-variant",
name: "Trolley problem: fat-man variant",
kind: "dilemma",
category: "ethics",
summary: "Personal force sharply changes moral intuitions.",
definition: "Pushing a person to stop the trolley feels worse than flipping a switch, despite similar numbers.",
contexts: ["Moral psychology", "Ethics"],
tags: ["class:paradox","domain:ethics","theme:personal-force"],
mappings: { wikipedia: "Trolley_problem#Fat_man" }
},
{
id: "transplant-problem",
name: "Transplant problem",
kind: "dilemma",
category: "ethics",
summary: "Harvesting one to save five seems impermissible.",
definition: "Organ procurement mirrors trolley arithmetic yet violates rights and agency.",
contexts: ["Bioethics", "Moral theory"],
tags: ["class:paradox","domain:ethics","theme:ends-vs-means"],
mappings: { wikipedia: "Trolley_problem#Transplant" }
},
{
id: "knower-paradox",
name: "Knower paradox",
kind: "dilemma",
category: "epistemology",
summary: "“This sentence is not known” yields inconsistency for plausible knowledge axioms.",
definition: "Adding knowledge predicates to truth frameworks recreates liar-like contradictions.",
contexts: ["Epistemic logic", "Truth"],
tags: ["class:paradox","domain:epistemology","theme:self-reference"],
mappings: { wikipedia: "Knower_paradox" }
},
{
id: "three-prisoners-problem",
name: "Three prisoners problem",
kind: "dilemma",
category: "probability",
summary: "Revealed information shifts conditional probabilities non-intuitively.",
definition: "A warden’s partial disclosure changes a prisoner’s chance of pardon in a Monty-Hall-like way.",
contexts: ["Bayesianism", "Puzzles"],
tags: ["class:paradox","domain:probability","theme:information-updating"],
mappings: { wikipedia: "Three_prisoners_problem" }
},
{
id: "two-children-problem",
name: "Two-children (boy or girl) paradox",
kind: "dilemma",
category: "probability",
summary: "Conditioning on partial descriptions alters birth-pair odds.",
definition: "Knowing at least one child’s sex (or day) changes the distribution counter to intuition.",
contexts: ["Conditional probability", "Education"],
tags: ["class:paradox","domain:probability","theme:conditioning"],
mappings: { wikipedia: "Boy_or_girl_paradox" }
},
{
id: "birthday-paradox",
name: "Birthday paradox",
kind: "dilemma",
category: "probability",
summary: "Surprisingly high chance of a shared birthday in small groups.",
definition: "Quadratic growth of pairs makes matches likely by 23 people (~50%).",
contexts: ["Combinatorics", "Security"],
tags: ["class:paradox","domain:probability","theme:collision-probability"],
mappings: { wikipedia: "Birthday_problem" }
},
{
id: "waiting-time-paradox",
name: "Waiting time (bus) paradox",
kind: "dilemma",
category: "statistics",
summary: "Average waits exceed schedule intervals due to length-bias.",
definition: "Random arrival tends to land in longer gaps, raising expected waiting time.",
contexts: ["Renewal theory", "Queuing"],
tags: ["class:paradox","domain:statistics","theme:length-bias"],
mappings: { wikipedia: "Waiting_time_paradox" }
},
{
id: "inspection-paradox",
name: "Inspection paradox",
kind: "dilemma",
category: "statistics",
summary: "Randomly chosen intervals are longer than average.",
definition: "Sampling proportional to size inflates expected observed size.",
contexts: ["Sampling", "Reliability"],
tags: ["class:paradox","domain:statistics","theme:size-bias"],
mappings: { wikipedia: "Inspection_paradox" }
},
{
id: "lindleys-paradox",
name: "Lindley’s paradox",
kind: "dilemma",
category: "statistics",
summary: "Bayesian and frequentist conclusions can diverge sharply.",
definition: "With large n and vague priors, small p-values coexist with Bayesian support for the null.",
contexts: ["Hypothesis testing", "Bayesian stats"],
tags: ["class:paradox","domain:statistics","theme:method-disagreement"],
mappings: { wikipedia: "Lindley%27s_paradox" }
},
{
id: "steins-paradox",
name: "Stein’s paradox",
kind: "dilemma",
category: "statistics",
summary: "Shrinkage estimators beat MLE in three or more dimensions.",
definition: "James–Stein estimators have uniformly lower risk, defying intuition about independent coordinates.",
contexts: ["Estimation", "Decision theory"],
tags: ["class:paradox","domain:statistics","theme:shrinkage"],
mappings: { wikipedia: "Stein%27s_paradox" }
},
{
id: "will-rogers-phenomenon",
name: "Will Rogers phenomenon",
kind: "dilemma",
category: "statistics",
summary: "Moving elements between sets raises averages of both.",
definition: "Reclassification can increase mean values in each subgroup without changing individuals.",
contexts: ["Medical staging", "Data reporting"],
tags: ["class:paradox","domain:statistics","theme:reclassification"],
mappings: { wikipedia: "Will_Rogers_phenomenon" }
},
{
id: "berksons-paradox",
name: "Berkson’s paradox",
kind: "dilemma",
category: "statistics",
summary: "Selection on a collider induces spurious negative correlation.",
definition: "Conditioning on admission criteria creates misleading associations between independent traits.",
contexts: ["Causal inference", "Epidemiology"],
tags: ["class:paradox","domain:statistics","theme:selection-bias"],
mappings: { wikipedia: "Berkson%27s_paradox" }
},

{
id: "hilberts-hotel",
name: "Hilbert’s hotel",
kind: "dilemma",
category: "infinity",
summary: "A fully occupied infinite hotel can still accommodate more guests.",
definition: "By shifting occupants to new rooms via bijections, an actually infinite set has 'room' despite being full.",
contexts: ["Set theory", "Actual infinity"],
tags: ["class:paradox","domain:infinity","theme:equinumerosity"],
mappings: { wikipedia: "Hilbert%27s_paradox_of_the_Grand_Hotel" }
},
{
id: "riemann-rearrangement",
name: "Riemann rearrangement paradox",
kind: "dilemma",
category: "analysis",
summary: "Conditionally convergent series can be rearranged to sum to any real number.",
definition: "The Riemann series theorem shows non-absolute convergence allows permutation-dependent sums.",
contexts: ["Real analysis", "Series"],
tags: ["class:paradox","domain:math","theme:conditional-convergence"],
mappings: { wikipedia: "Riemann_series_theorem" }
},
{
id: "grandis-series",
name: "Grandi’s series paradox",
kind: "dilemma",
category: "analysis",
summary: "The series 1 − 1 + 1 − 1 … seems to have multiple sums.",
definition: "Divergent under ordinary summation but assigned 1/2 by Cesàro/Abel methods, clashing with naive summation rules.",
contexts: ["Summation methods", "History of math"],
tags: ["class:paradox","domain:math","theme:divergent-series"],
mappings: { wikipedia: "Grandi%27s_series" }
},
{
id: "coastline-paradox",
name: "Coastline paradox",
kind: "dilemma",
category: "geometry",
summary: "Measured length of a coastline grows without bound as the measuring scale shrinks.",
definition: "Fractal-like roughness makes length scale-dependent, undermining intuitive metric invariance.",
contexts: ["Fractal geometry", "Geography"],
tags: ["class:paradox","domain:geometry","theme:scale-dependence"],
mappings: { wikipedia: "Coastline_paradox" }
},
{
id: "epr-paradox",
name: "EPR paradox",
kind: "dilemma",
category: "quantum",
summary: "Quantum entanglement suggests nonlocal correlations at odds with local realism.",
definition: "Einstein–Podolsky–Rosen argued QM is incomplete; Bell tests show locality or realism must be abandoned.",
contexts: ["Foundations of QM", "Nonlocality"],
tags: ["class:paradox","domain:quantum","theme:entanglement"],
mappings: { wikipedia: "EPR_paradox" }
},
{
id: "schrodingers-cat",
name: "Schrödinger’s cat",
kind: "dilemma",
category: "quantum",
summary: "A macroscopic cat appears both alive and dead before observation.",
definition: "Quantum superposition scaled up challenges the quantum–classical boundary and measurement.",
contexts: ["Measurement problem", "Philosophy of physics"],
tags: ["class:paradox","domain:quantum","theme:superposition"],
mappings: { wikipedia: "Schr%C3%B6dinger%27s_cat" }
},
{
id: "wigners-friend",
name: "Wigner’s friend",
kind: "dilemma",
category: "quantum",
summary: "Two observers can assign incompatible quantum states to the same system.",
definition: "Observer-relative state assignment strains single-world realism about measurement outcomes.",
contexts: ["Measurement problem", "Observer relativity"],
tags: ["class:paradox","domain:quantum","theme:observer-dependence"],
mappings: { wikipedia: "Wigner%27s_friend" }
},
{
id: "quantum-zeno",
name: "Quantum Zeno paradox",
kind: "dilemma",
category: "quantum",
summary: "Frequent observation can prevent an unstable system from evolving.",
definition: "Continuous measurement repeatedly collapses the state, inhibiting transitions predicted by unitary evolution.",
contexts: ["Quantum measurement", "Dynamics"],
tags: ["class:paradox","domain:quantum","theme:measurement-disturbance"],
mappings: { wikipedia: "Quantum_Zeno_effect" }
},
{
id: "delayed-choice",
name: "Wheeler’s delayed-choice",
kind: "dilemma",
category: "quantum",
summary: "Choice of measurement made after a photon passes an apparatus seems to decide its past.",
definition: "Interference vs which-path information appears to depend on late choices, challenging naive temporal causality.",
contexts: ["Foundations of QM", "Causality"],
tags: ["class:paradox","domain:quantum","theme:retrocausality"],
mappings: { wikipedia: "Wheeler%27s_delayed_choice_experiment" }
},
{
id: "hardys-paradox",
name: "Hardy’s paradox",
kind: "dilemma",
category: "quantum",
summary: "Nonlocality without inequalities yields impossible classical trajectories.",
definition: "Joint weak measurements suggest contradictory path inferences for overlapping interferometers.",
contexts: ["Quantum nonlocality"],
tags: ["class:paradox","domain:quantum","theme:contextuality"],
mappings: { wikipedia: "Hardy%27s_paradox" }
},
{
id: "ghz-paradox",
name: "GHZ (Greenberger–Horne–Zeilinger) paradox",
kind: "dilemma",
category: "quantum",
summary: "Three-particle entanglement gives an all-or-nothing conflict with local realism.",
definition: "GHZ states produce deterministic contradictions with local hidden variables without statistical inequalities.",
contexts: ["Bell theorems", "Entanglement"],
tags: ["class:paradox","domain:quantum","theme:nonlocality"],
mappings: { wikipedia: "Greenberger%E2%80%93Horne%E2%80%93Zeilinger_state" }
},
{
id: "kochen-specker",
name: "Kochen–Specker paradox",
kind: "dilemma",
category: "quantum",
summary: "Noncontextual hidden variables are impossible in QM.",
definition: "Value assignments to observables cannot be made independent of measurement context.",
contexts: ["Quantum foundations", "Contextuality"],
tags: ["class:paradox","domain:quantum","theme:noncontextuality"],
mappings: { wikipedia: "Kochen%E2%80%93Specker_theorem" }
},
{
id: "frauchiger-renner",
name: "Frauchiger–Renner paradox",
kind: "dilemma",
category: "quantum",
summary: "Single-world interpretations contradict quantum theory under idealized reasoning.",
definition: "Wigner’s-friend style setup shows three natural assumptions are jointly inconsistent.",
contexts: ["Interpretations of QM"],
tags: ["class:paradox","domain:quantum","theme:single-world-tension"],
mappings: { wikipedia: "Frauchiger%E2%80%93Renner_paradox" }
},
{
id: "black-hole-information",
name: "Black hole information paradox",
kind: "dilemma",
category: "cosmology",
summary: "Hawking evaporation seems to destroy quantum information.",
definition: "Thermal radiation from black holes conflicts with unitary quantum evolution unless resolved by new physics.",
contexts: ["Quantum gravity", "Thermodynamics"],
tags: ["class:paradox","domain:cosmology","theme:unitarity"],
mappings: { wikipedia: "Black_hole_information_paradox" }
},
{
id: "firewall-paradox",
name: "AMPS firewall paradox",
kind: "dilemma",
category: "cosmology",
summary: "Unitarity and no-drama at the horizon appear incompatible.",
definition: "Monogamy of entanglement suggests high-energy 'firewalls' for infalling observers unless assumptions fail.",
contexts: ["Quantum gravity", "Entanglement"],
tags: ["class:paradox","domain:cosmology","theme:entanglement-monogamy"],
mappings: { wikipedia: "Firewall_paradox" }
},
{
id: "trouton-noble",
name: "Trouton–Noble paradox",
kind: "dilemma",
category: "relativity",
summary: "A moving capacitor seems to experience a torque in one frame but not another.",
definition: "Relativistic stress–energy and hidden momentum resolve frame-dependent torque appearances.",
contexts: ["Electromagnetism", "SR"],
tags: ["class:paradox","domain:physics","theme:frame-dependence"],
mappings: { wikipedia: "Trouton%E2%80%93Noble_experiment" }
},
{
id: "right-angle-lever",
name: "Right-angle lever paradox (Lewis–Tolman)",
kind: "dilemma",
category: "relativity",
summary: "A lever seems to rotate in one frame and not in another.",
definition: "Relativistic force transformation and energy flow (hidden momentum) remove the contradiction.",
contexts: ["SR", "Mechanics"],
tags: ["class:paradox","domain:physics","theme:hidden-momentum"],
mappings: { wikipedia: "Lewis%E2%80%93Tolman_lever_paradox" }
},
{
id: "supplees-submarine",
name: "Supplee’s submarine paradox",
kind: "dilemma",
category: "relativity",
summary: "A fast submarine appears to both sink and float.",
definition: "Length contraction and buoyant force transformations yield consistent behavior once GR effects are considered.",
contexts: ["SR/GR", "Buoyancy"],
tags: ["class:paradox","domain:physics","theme:relativistic-buoyancy"],
mappings: { wikipedia: "Supplee%27s_paradox" }
},
{
id: "sagnac-paradox",
name: "Sagnac paradox",
kind: "dilemma",
category: "relativity",
summary: "Rotation produces fringe shifts seemingly at odds with SR.",
definition: "Global non-inertial effects on a rotating platform create path-dependent travel times consistent with relativity.",
contexts: ["Interferometry", "Non-inertial frames"],
tags: ["class:paradox","domain:physics","theme:rotation"],
mappings: { wikipedia: "Sagnac_effect" }
},
{
id: "dalemberts-paradox",
name: "D’Alembert’s paradox",
kind: "dilemma",
category: "fluid-dynamics",
summary: "Ideal, inviscid flow predicts zero drag on bodies.",
definition: "Potential flow models yield no drag, contradicting observation; viscosity and separation resolve it.",
contexts: ["Fluid mechanics", "Modeling"],
tags: ["class:paradox","domain:physics","theme:model-idealization"],
mappings: { wikipedia: "D%27Alembert%27s_paradox" }
},
{
id: "hydrostatic-paradox",
name: "Hydrostatic paradox",
kind: "dilemma",
category: "fluid-dynamics",
summary: "Fluid pressure on the base depends on height, not volume.",
definition: "Different-shaped vessels with same base and height exert equal force despite differing total fluid mass.",
contexts: ["Hydrostatics", "Education"],
tags: ["class:paradox","domain:physics","theme:pressure-vs-volume"],
mappings: { wikipedia: "Hydrostatic_paradox" }
},
{
id: "tea-leaf-paradox",
name: "Tea leaf paradox",
kind: "dilemma",
category: "fluid-dynamics",
summary: "Leaves swirl to the cup’s center rather than the rim.",
definition: "Secondary flows from boundary-layer friction drive inward motion at the bottom, not outward.",
contexts: ["Geophysical flows", "Everyday physics"],
tags: ["class:paradox","domain:physics","theme:secondary-flow"],
mappings: { wikipedia: "Tea_leaf_paradox" }
},
{
id: "ultraviolet-catastrophe",
name: "Ultraviolet catastrophe (Rayleigh–Jeans paradox)",
kind: "dilemma",
category: "physics",
summary: "Classical equipartition predicts infinite blackbody energy.",
definition: "Failure of classical theory at high frequencies motivated Planck’s quantization.",
contexts: ["Thermodynamics", "History of physics"],
tags: ["class:paradox","domain:physics","theme:classical-breakdown"],
mappings: { wikipedia: "Ultraviolet_catastrophe" }
},
{
id: "mpemba-paradox",
name: "Mpemba paradox",
kind: "dilemma",
category: "thermodynamics",
summary: "Hot water can freeze faster than cold under some conditions.",
definition: "Evaporation, convection, supercooling, and container effects can invert naive freezing-time expectations.",
contexts: ["Heat transfer", "Experiment"],
tags: ["class:paradox","domain:physics","theme:nonlinear-thermodynamics"],
mappings: { wikipedia: "Mpemba_effect" }
},
{
id: "goodhart-law",
name: "Goodhart’s law (measurement paradox)",
kind: "dilemma",
category: "social",
summary: "When a measure becomes a target, it ceases to be a good measure.",
definition: "Optimization on proxies induces gaming and distribution shift, degrading the metric’s validity.",
contexts: ["Governance", "AI/ML"],
tags: ["class:paradox","domain:social","theme:perverse-incentives"],
mappings: { wikipedia: "Goodhart%27s_law" }
},
{
id: "campbells-law",
name: "Campbell’s law",
kind: "dilemma",
category: "social",
summary: "High-stakes metrics corrupt the processes they monitor.",
definition: "Intense pressure on quantitative indicators invites manipulation and mission drift.",
contexts: ["Evaluation", "Policy"],
tags: ["class:paradox","domain:social","theme:metric-gaming"],
mappings: { wikipedia: "Campbell%27s_law" }
},
{
id: "cobra-effect",
name: "Cobra effect",
kind: "dilemma",
category: "economics",
summary: "Incentives can worsen the problem they aim to solve.",
definition: "Bounties for pests led to breeding cobras; classic perverse-incentive spiral.",
contexts: ["Policy design", "Behavioral econ"],
tags: ["class:paradox","domain:economics","theme:perverse-incentives"],
mappings: { wikipedia: "Cobra_effect" }
},
{
id: "paradox-of-choice",
name: "Paradox of choice",
kind: "dilemma",
category: "psychology",
summary: "More options can reduce satisfaction and uptake.",
definition: "Choice overload increases regret and decision paralysis despite higher objective variety.",
contexts: ["Consumer behavior", "UX"],
tags: ["class:paradox","domain:psychology","theme:choice-overload"],
mappings: { wikipedia: "The_Paradox_of_Choice" }
},
{
id: "paradox-of-hedonism",
name: "Paradox of hedonism",
kind: "dilemma",
category: "ethics",
summary: "Direct pursuit of pleasure can undermine it.",
definition: "Happiness often emerges as a byproduct of meaningful activity rather than as a primary aim.",
contexts: ["Well-being", "Moral psychology"],
tags: ["class:paradox","domain:ethics","theme:aim-vs-outcome"],
mappings: { wikipedia: "Paradox_of_hedonism" }
},
{
id: "paradox-of-tolerance",
name: "Paradox of tolerance",
kind: "dilemma",
category: "political-philosophy",
summary: "Unlimited tolerance may enable intolerance to destroy tolerance.",
definition: "Maintaining a tolerant society can require limiting actions of intolerant movements.",
contexts: ["Liberalism", "Pluralism"],
tags: ["class:paradox","domain:social","theme:limits-of-tolerance"],
mappings: { wikipedia: "Paradox_of_tolerance" }
},
{
id: "streisand-effect",
name: "Streisand effect",
kind: "dilemma",
category: "media",
summary: "Attempts to suppress information can publicize it more widely.",
definition: "Censorship or legal threats amplify attention through backlash and curiosity.",
contexts: ["Information policy", "Reputation"],
tags: ["class:paradox","domain:social","theme:backfire"],
mappings: { wikipedia: "Streisand_effect" }
},
{
id: "peltzman-effect",
name: "Peltzman effect",
kind: "dilemma",
category: "risk",
summary: "Safety regulations can induce offsetting risky behavior.",
definition: "Risk compensation may negate intended safety benefits, sometimes worsening outcomes.",
contexts: ["Public policy", "Behavioral econ"],
tags: ["class:paradox","domain:risk","theme:risk-compensation"],
mappings: { wikipedia: "Peltzman_effect" }
},
{
id: "thrift-paradox",
name: "Paradox of thrift",
kind: "dilemma",
category: "economics",
summary: "Collectively higher saving can reduce total saving via lower income.",
definition: "In downturns, increased saving lowers demand and output, shrinking aggregate saving.",
contexts: ["Macroeconomics", "Policy"],
tags: ["class:paradox","domain:economics","theme:aggregate-fallacy"],
mappings: { wikipedia: "Paradox_of_thrift" }
},
{
id: "value-paradox",
name: "Paradox of value (diamond–water)",
kind: "dilemma",
category: "economics",
summary: "Essentials can be cheap while luxuries are expensive.",
definition: "Marginal utility resolves why water’s abundance yields low price despite high total utility.",
contexts: ["Value theory", "History of econ"],
tags: ["class:paradox","domain:economics","theme:marginal-utility"],
mappings: { wikipedia: "Paradox_of_value" }
},
{
id: "edgeworth-paradox",
name: "Edgeworth paradox",
kind: "dilemma",
category: "economics",
summary: "With capacity constraints, price competition can have no equilibrium.",
definition: "Bertrand logic fails when firms cannot serve all demand, producing cycles.",
contexts: ["IO economics", "Competition"],
tags: ["class:paradox","domain:economics","theme:no-equilibrium"],
mappings: { wikipedia: "Edgeworth_paradox" }
},
{
id: "leontief-paradox",
name: "Leontief paradox",
kind: "dilemma",
category: "economics",
summary: "U.S. exports were less capital-intensive than imports, contradicting theory.",
definition: "Observed factor content conflicted with Heckscher–Ohlin predictions.",
contexts: ["Trade", "Empirical puzzles"],
tags: ["class:paradox","domain:economics","theme:theory-vs-data"],
mappings: { wikipedia: "Leontief_paradox" }
},
{
id: "giffen-paradox",
name: "Giffen paradox",
kind: "dilemma",
category: "economics",
summary: "Raising a good’s price can increase its demand.",
definition: "For inferior staples with strong income effects, substitution is dominated by income effects.",
contexts: ["Consumer theory", "Poverty"],
tags: ["class:paradox","domain:economics","theme:nonstandard-demand"],
mappings: { wikipedia: "Giffen_good" }
},
{
id: "metzler-paradox",
name: "Metzler paradox",
kind: "dilemma",
category: "economics",
summary: "A tariff can lower the domestic relative price of imports.",
definition: "With strong terms-of-trade effects, tariffs may counterintuitively reduce import prices.",
contexts: ["Trade", "Terms of trade"],
tags: ["class:paradox","domain:economics","theme:policy-counterintuitive"],
mappings: { wikipedia: "Metzler_paradox" }
},
{
id: "gibson-paradox",
name: "Gibson paradox",
kind: "dilemma",
category: "economics",
summary: "Under the gold standard, price levels correlated with nominal interest rates.",
definition: "A puzzling long-run relation that classical theories struggled to explain.",
contexts: ["Monetary economics", "History"],
tags: ["class:paradox","domain:economics","theme:empirical-puzzle"],
mappings: { wikipedia: "Gibson_paradox" }
},
{
id: "lucas-paradox",
name: "Lucas paradox",
kind: "dilemma",
category: "economics",
summary: "Capital does not flow from rich to poor countries as theory predicts.",
definition: "Risk, institutions, human capital, and externalities complicate convergence expectations.",
contexts: ["Development", "Finance"],
tags: ["class:paradox","domain:economics","theme:capital-flows"],
mappings: { wikipedia: "Lucas_paradox" }
},
{
id: "feldstein-horioka",
name: "Feldstein–Horioka puzzle",
kind: "dilemma",
category: "economics",
summary: "Domestic saving and investment are highly correlated despite capital mobility.",
definition: "International integration should decouple saving and investment; empirics show otherwise.",
contexts: ["International finance", "Macro"],
tags: ["class:paradox","domain:economics","theme:home-bias"],
mappings: { wikipedia: "Feldstein%E2%80%93Horioka_puzzle" }
},
{
id: "equity-premium",
name: "Equity premium puzzle",
kind: "dilemma",
category: "economics",
summary: "Observed equity returns are too high relative to risk aversion calibrations.",
definition: "Standard models underpredict the equity premium without extreme preferences or frictions.",
contexts: ["Asset pricing", "Finance"],
tags: ["class:paradox","domain:economics","theme:returns-vs-risk"],
mappings: { wikipedia: "Equity_premium_puzzle" }
},
{
id: "productivity-paradox",
name: "Productivity paradox (Solow)",
kind: "dilemma",
category: "economics",
summary: "IT investment did not show up in productivity statistics for years.",
definition: "Measurement, lag, and diffusion effects made technological gains hard to see initially.",
contexts: ["Tech & growth", "Measurement"],
tags: ["class:paradox","domain:economics","theme:measurement-lag"],
mappings: { wikipedia: "Productivity_paradox" }
},
{
id: "tullock-paradox",
name: "Tullock paradox",
kind: "dilemma",
category: "political-economy",
summary: "Rent-seeking expenditures are small relative to potential gains.",
definition: "Risk, competition, and coordination problems limit dissipation predicted by theory.",
contexts: ["Public choice", "Regulation"],
tags: ["class:paradox","domain:economics","theme:rent-seeking"],
mappings: { wikipedia: "Tullock_paradox" }
},
{
id: "downs-thomson",
name: "Downs–Thomson paradox",
kind: "dilemma",
category: "transport",
summary: "Improving road capacity can worsen overall travel times by degrading transit.",
definition: "Equilibrium between private and public modes means faster roads can slow the whole system.",
contexts: ["Traffic", "Urban planning"],
tags: ["class:paradox","domain:transport","theme:equilibrium-effects"],
mappings: { wikipedia: "Downs%E2%80%93Thomson_paradox" }
},
{
id: "travelers-dilemma",
name: "Traveler’s dilemma",
kind: "dilemma",
category: "game-theory",
summary: "Rationality plus common knowledge drives players to low payoffs.",
definition: "Backward induction pressures both to undercut despite better cooperative outcomes.",
contexts: ["Mechanism design", "Rationality"],
tags: ["class:paradox","domain:game-theory","theme:backward-induction"],
mappings: { wikipedia: "Traveler%27s_dilemma" }
},
{
id: "centipede-backward-induction",
name: "Backward-induction paradox (centipede game)",
kind: "dilemma",
category: "game-theory",
summary: "Backward induction prescribes immediate defection contrary to observed cooperation.",
definition: "Finite-horizon reasoning clashes with empirical play and alternative equilibrium refinements.",
contexts: ["Experimental econ", "Bounded rationality"],
tags: ["class:paradox","domain:game-theory","theme:dynamic-consistency"],
mappings: { wikipedia: "Centipede_game" }
},
{
id: "dollar-auction",
name: "Dollar auction paradox",
kind: "dilemma",
category: "game-theory",
summary: "Rational bidding escalates to pay more than the prize is worth.",
definition: "Sunk-cost and escalation incentives trap players in loss-making continuation.",
contexts: ["Conflict", "Escalation"],
tags: ["class:paradox","domain:game-theory","theme:escalation-trap"],
mappings: { wikipedia: "Dollar_auction" }
},
{
id: "el-farol",
name: "El Farol bar problem",
kind: "dilemma",
category: "game-theory",
summary: "Adaptive agents create unpredictable attendance cycles.",
definition: "Best responses depend on others’ predictions, generating complex coordination dynamics.",
contexts: ["Complexity", "Adaptive systems"],
tags: ["class:paradox","domain:game-theory","theme:coordination"],
mappings: { wikipedia: "El_Farol_Bar_problem" }
},
{
id: "arrow-impossibility",
name: "Arrow’s impossibility (voting paradox)",
kind: "dilemma",
category: "social-choice",
summary: "No rank-order voting system can satisfy all fairness criteria with 3+ options.",
definition: "Transitivity, unanimity, IIA, and non-dictatorship are mutually incompatible.",
contexts: ["Voting", "Mechanism design"],
tags: ["class:paradox","domain:social-choice","theme:impossibility"],
mappings: { wikipedia: "Arrow%27s_impossibility_theorem" }
},
{
id: "gibbard-satterthwaite",
name: "Gibbard–Satterthwaite (manipulability) paradox",
kind: "dilemma",
category: "social-choice",
summary: "Reasonable voting rules are vulnerable to strategic voting.",
definition: "Any non-dictatorial, onto rule with 3+ options is manipulable.",
contexts: ["Elections", "Strategy"],
tags: ["class:paradox","domain:social-choice","theme:strategic-manipulation"],
mappings: { wikipedia: "Gibbard%E2%80%93Satterthwaite_theorem" }
},
{
id: "doomsday-argument",
name: "Doomsday argument",
kind: "dilemma",
category: "cosmology",
summary: "Reference-class reasoning predicts earlier extinction than naive views.",
definition: "Self-sampling typicality yields surprisingly short forecasts for humanity’s remaining lifespan.",
contexts: ["Anthropic reasoning", "Bayesianism"],
tags: ["class:paradox","domain:cosmology","theme:observer-selection"],
mappings: { wikipedia: "Doomsday_argument" }
},
{
id: "youngness-paradox",
name: "Youngness paradox (eternal inflation)",
kind: "dilemma",
category: "cosmology",
summary: "Some measures predict we should almost surely observe a much younger universe.",
definition: "Cutoff measures in inflation weight rapidly expanding regions, biasing toward young observations.",
contexts: ["Measure problem", "Cosmology"],
tags: ["class:paradox","domain:cosmology","theme:measure-problem"],
mappings: { wikipedia: "Youngness_paradox" }
},
{
id: "gzk-paradox",
name: "GZK paradox",
kind: "dilemma",
category: "astrophysics",
summary: "Ultra–high-energy cosmic rays were observed above the theoretical cutoff.",
definition: "Events above the Greisen–Zatsepin–Kuzmin limit challenged propagation models until source/propagation clarifications.",
contexts: ["Cosmic rays", "High-energy astro"],
tags: ["class:paradox","domain:physics","theme:theory-vs-observation"],
mappings: { wikipedia: "GZK_paradox" }
},
{
id: "false-positive-paradox",
name: "False positive paradox",
kind: "dilemma",
category: "statistics",
summary: "In rare conditions, most positives can be false despite high test accuracy.",
definition: "Low base rates dominate PPV, countering intuitive readings of sensitivity/specificity.",
contexts: ["Medical testing", "Bayesian reasoning"],
tags: ["class:paradox","domain:statistics","theme:base-rate"],
mappings: { wikipedia: "False_positive_paradox" }
},
{
id: "nontransitive-dice",
name: "Nontransitive dice paradox",
kind: "dilemma",
category: "probability",
summary: "A beats B, B beats C, and C beats A with high probability.",
definition: "Pairwise winning probabilities can be cyclic, defying transitive expectations.",
contexts: ["Counterintuitive probability", "Games"],
tags: ["class:paradox","domain:probability","theme:intransitivity"],
mappings: { wikipedia: "Nontransitive_dice" }
},
{
id: "drinker-paradox",
name: "Drinker paradox",
kind: "dilemma",
category: "logic",
summary: "There exists someone in the bar such that if they are drinking, everyone is drinking.",
definition: "A valid but counterintuitive consequence in classical predicate logic.",
contexts: ["Logic education", "Model theory"],
tags: ["class:paradox","domain:logic","theme:classical-implication"],
mappings: { wikipedia: "Drinker_paradox" }
},
{
id: "rosss-paradox",
name: "Ross’s paradox",
kind: "dilemma",
category: "logic",
summary: "From 'Mail the letter' infer 'Mail the letter or burn it'.",
definition: "Material implication and deontic reasoning collide, revealing non-monotonicity of obligations.",
contexts: ["Deontic logic", "Pragmatics"],
tags: ["class:paradox","domain:logic","theme:material-implication"],
mappings: { wikipedia: "Ross%27s_paradox" }
},
{
id: "good-samaritan-paradox",
name: "Good Samaritan paradox",
kind: "dilemma",
category: "ethics",
summary: "If one ought to help victims, does one prefer that wrongdoing occur?",
definition: "Obligations about remedies seem to imply obligations toward bad states of affairs.",
contexts: ["Deontic logic", "Value theory"],
tags: ["class:paradox","domain:ethics","theme:obligation-aggregation"],
mappings: { wikipedia: "Good_Samaritan_paradox" }
},
{
id: "forrester-paradox",
name: "Forrester’s paradox (gentle murderer)",
kind: "dilemma",
category: "ethics",
summary: "From 'You ought not murder' and 'If you do, do it gently' infer odd obligations.",
definition: "Conditional obligations interact problematically with detachment in deontic logic.",
contexts: ["Deontic logic"],
tags: ["class:paradox","domain:ethics","theme:conditional-obligation"],
mappings: { wikipedia: "Forrester%27s_paradox" }
},
{
id: "omnipotence-paradox",
name: "Omnipotence paradox (stone)",
kind: "dilemma",
category: "philosophy-of-religion",
summary: "Can an omnipotent being create a stone it cannot lift?",
definition: "Apparent limits on self-binding challenge coherent definitions of omnipotence.",
contexts: ["Theology", "Modal logic"],
tags: ["class:paradox","domain:metaphysics","theme:self-limitation"],
mappings: { wikipedia: "Omnipotence_paradox" }
},
{
id: "euthyphro-dilemma",
name: "Euthyphro dilemma",
kind: "dilemma",
category: "ethics",
summary: "Are actions good because God commands them, or does God command them because they are good?",
definition: "Divine command theory faces a horned dilemma about moral grounding.",
contexts: ["Metaethics", "Religion"],
tags: ["class:paradox","domain:ethics","theme:grounding"],
mappings: { wikipedia: "Euthyphro_dilemma" }
},
{
id: "crocodile-paradox",
name: "Crocodile paradox",
kind: "dilemma",
category: "logic",
summary: "A crocodile promises to return a child if the parent guesses what it will do.",
definition: "Self-referential prediction produces loops akin to the liar.",
contexts: ["Ancient paradoxes", "Semantics"],
tags: ["class:paradox","domain:logic","theme:self-reference"],
mappings: { wikipedia: "Crocodile_paradox" }
},
{
id: "paradox-of-the-court",
name: "Paradox of the court (Protagoras–Euathlus)",
kind: "dilemma",
category: "law",
summary: "A lawsuit about paying for law lessons makes either litigant win by their own victory.",
definition: "Contractual condition tied to first court victory creates self-referential legal reasoning.",
contexts: ["Ancient logic", "Jurisprudence"],
tags: ["class:paradox","domain:law","theme:self-reference"],
mappings: { wikipedia: "Paradox_of_the_court" }
},
{
id: "kleene-rosser",
name: "Kleene–Rosser paradox",
kind: "dilemma",
category: "logic",
summary: "Untyped lambda calculus with naive truth leads to inconsistency.",
definition: "Self-referential functions yield contradictions parallel to the liar.",
contexts: ["Computation theory", "Proof theory"],
tags: ["class:paradox","domain:logic","theme:self-reference"],
mappings: { wikipedia: "Kleene%E2%80%93Rosser_paradox" }
},
{
id: "girards-paradox",
name: "Girard’s paradox",
kind: "dilemma",
category: "type-theory",
summary: "Impredicative type systems can be inconsistent.",
definition: "System U with type-in-type admits a Russell-style contradiction.",
contexts: ["Proof assistants", "Foundations"],
tags: ["class:paradox","domain:logic","theme:impredicativity"],
mappings: { wikipedia: "Girard%27s_paradox" }
},
{
id: "russell-myhill-paradox",
name: "Russell–Myhill paradox",
kind: "dilemma",
category: "logic",
summary: "Sets of propositions and propositions about sets clash under naive comprehension.",
definition: "Type-free notions of propositions reproduce Russell-like contradictions.",
contexts: ["Intensional logic", "Type theory"],
tags: ["class:paradox","domain:logic","theme:comprehension"],
mappings: { wikipedia: "Russell%E2%80%93Myhill_paradox" }
},
{
id: "meiinong-paradox",
name: "Meinong’s paradox",
kind: "dilemma",
category: "metaphysics",
summary: "Talk about nonexistent objects seems both meaningful and contradictory.",
definition: "Attributing properties to 'the round square' pressures theories of reference and existence.",
contexts: ["Ontology", "Philosophy of language"],
tags: ["class:paradox","domain:metaphysics","theme:nonexistence"],
mappings: { wikipedia: "Alexius_Meinong#Theory_of_objects" }
},
{
id: "buridan-ass",
name: "Buridan’s ass",
kind: "dilemma",
category: "decision",
summary: "A perfectly rational agent starves between two identical haystacks.",
definition: "Indifference and symmetry can paralyze choice absent tie-breaking rules.",
contexts: ["Rational choice", "Free will"],
tags: ["class:paradox","domain:decision","theme:indifference"],
mappings: { wikipedia: "Buridan%27s_ass" }
},
{
id: "bilking-paradox",
name: "Bilking paradox",
kind: "dilemma",
category: "time",
summary: "Backward causation appears to enable preventing past causes.",
definition: "If future evidence indicates a past event, intervention seems to block it, challenging consistency.",
contexts: ["Time travel", "Causation"],
tags: ["class:paradox","domain:time","theme:backward-causation"],
mappings: { wikipedia: "Bilking_argument" }
},
{
id: "peto-paradox",
name: "Peto’s paradox",
kind: "dilemma",
category: "biology",
summary: "Large, long-lived animals do not have proportionally higher cancer rates.",
definition: "Evolutionary mechanisms and tumor suppression scale unexpectedly with body size.",
contexts: ["Oncology", "Evolution"],
tags: ["class:paradox","domain:biology","theme:scaling"],
mappings: { wikipedia: "Peto%27s_paradox" }
},
{
id: "c-value-paradox",
name: "C-value paradox",
kind: "dilemma",
category: "genetics",
summary: "Genome size poorly predicts organismal complexity.",
definition: "Noncoding DNA and repeats decouple DNA content from phenotypic complexity.",
contexts: ["Genomics", "Evolution"],
tags: ["class:paradox","domain:biology","theme:complexity-mismatch"],
mappings: { wikipedia: "C-value_paradox" }
},
{
id: "levinthal-paradox",
name: "Levinthal’s paradox",
kind: "dilemma",
category: "biophysics",
summary: "Proteins fold quickly despite astronomically many configurations.",
definition: "Energy landscapes and guided pathways replace naive random search.",
contexts: ["Protein folding", "Biophysics"],
tags: ["class:paradox","domain:biology","theme:search-vs-landscape"],
mappings: { wikipedia: "Levinthal%27s_paradox" }
},
{
id: "plankton-paradox",
name: "Paradox of the plankton",
kind: "dilemma",
category: "ecology",
summary: "Many plankton species coexist on few limiting resources.",
definition: "Environmental variability and niche differentiation mitigate competitive exclusion.",
contexts: ["Community ecology", "Diversity"],
tags: ["class:paradox","domain:ecology","theme:coexistence"],
mappings: { wikipedia: "Paradox_of_the_plankton" }
},
{
id: "lewontin-variation-paradox",
name: "Lewontin’s paradox of variation",
kind: "dilemma",
category: "genetics",
summary: "Genetic diversity varies less across species than neutral theory predicts.",
definition: "Linked selection and demography constrain standing variation across taxa.",
contexts: ["Population genetics", "Evolution"],
tags: ["class:paradox","domain:biology","theme:neutral-theory-tension"],
mappings: { wikipedia: "Lewontin%27s_paradox_of_variation" }
},
{
id: "missing-heritability",
name: "Missing heritability problem",
kind: "dilemma",
category: "genetics",
summary: "Twin-study heritabilities exceed variance explained by GWAS.",
definition: "Rare variants, gene–gene and gene–environment interactions, and structural variation fill the gap.",
contexts: ["Complex traits", "Genomics"],
tags: ["class:paradox","domain:biology","theme:variance-explained"],
mappings: { wikipedia: "Missing_heritability_problem" }
},
{
id: "french-paradox",
name: "French paradox",
kind: "dilemma",
category: "epidemiology",
summary: "Low coronary disease despite diets high in saturated fats.",
definition: "Lifestyle, measurement, and dietary patterns complicate simple nutrient-outcome links.",
contexts: ["Nutrition", "Public health"],
tags: ["class:paradox","domain:biology","theme:observational-puzzle"],
mappings: { wikipedia: "French_paradox" }
},
{
id: "obesity-paradox",
name: "Obesity paradox",
kind: "dilemma",
category: "epidemiology",
summary: "Overweight status sometimes associates with better survival in certain diseases.",
definition: "Confounding, bias, and disease-stage effects challenge straightforward BMI–mortality links.",
contexts: ["Clinical epi", "Bias analysis"],
tags: ["class:paradox","domain:biology","theme:confounding"],
mappings: { wikipedia: "Obesity_paradox" }
},
{
id: "athletes-paradox",
name: "Athlete’s paradox",
kind: "dilemma",
category: "physiology",
summary: "Athletes have high intramuscular fat but high insulin sensitivity.",
definition: "Training state and mitochondrial function decouple lipid content from metabolic dysfunction.",
contexts: ["Metabolism", "Exercise physiology"],
tags: ["class:paradox","domain:biology","theme:phenotype-decoupling"],
mappings: { wikipedia: "Athlete%27s_paradox" }
},

{
id: "fundamental-attribution-error",
name: "Fundamental attribution error",
kind: "bias",
category: "cognitive",
summary: "Over-attributes others’ behavior to disposition while underweighting situational forces.",
definition: "Observers explain another person’s actions by stable traits (lazy, rude) rather than context (constraints, incentives). The effect flips for ourselves (actor–observer asymmetry).",
contexts: ["Performance reviews", "Customer support", "Hiring", "Cross-cultural teams"],
harms: ["Blame culture", "Shallow root-cause analysis", "Inequitable discipline"],
mitigations: ["Ask 'what constraints made this rational?'", "Gather situational evidence", "Use behaviorally anchored rating scales"],
examples: ["Labeling a rep 'careless' after an error caused by rushed SLA and confusing UI."],
tags: ["class:cognitive","topic:attribution","risk:high"],
mappings: { wikipedia: "Fundamental_attribution_error" }
},
{
id: "out-group-homogeneity-bias",
name: "Out-group homogeneity bias",
kind: "bias",
category: "cognitive",
summary: "Perceiving out-group members as more similar to each other than in-group members.",
definition: "We encode finer distinctions for our own group and flatten variation in out-groups, fueling stereotyping and misjudgment.",
contexts: ["Recruiting", "User segmentation", "Moderation", "Market research"],
harms: ["Stereotyping", "Poor persona design", "Exclusionary decisions"],
mitigations: ["Oversample out-group voices", "Blind review of work artifacts", "Represent diversity in prototypes and examples"],
examples: ["Treating 'Gen Z users' as a single taste cluster during product positioning."],
tags: ["class:cognitive","topic:stereotyping","risk:high"],
mappings: { wikipedia: "Out-group_homogeneity" }
},
{
id: "false-consensus-effect",
name: "False consensus effect",
kind: "bias",
category: "cognitive",
summary: "Overestimating how widely others share our beliefs and preferences.",
definition: "People project their own attitudes and behaviors onto the population, inflating perceived consensus.",
contexts: ["Product decisions", "Politics", "Design critiques"],
harms: ["Overfit to self", "Under-testing with real users", "Alienating features"],
mitigations: ["State assumptions with confidence intervals", "Run representative surveys", "Pre-mortems with diverse reviewers"],
examples: ["Shipping dark mode as default because 'everyone prefers it' without data."],
tags: ["class:cognitive","topic:projection","risk:medium"],
mappings: { wikipedia: "False_consensus_effect" }
},
{
id: "false-uniqueness-effect",
name: "False uniqueness effect",
kind: "bias",
category: "cognitive",
summary: "Underestimating how common our desirable traits or behaviors are.",
definition: "We regard our strengths, restraint, or altruism as rarer than they are, bolstering self-image and skewing expectations.",
contexts: ["Team norms", "Performance feedback"],
harms: ["Unrealistic expectations of others", "Frustration and mistrust"],
mitigations: ["Compare against benchmarks", "Use peer calibration rounds"],
examples: ["Assuming only you document decisions; others do as well but in different tools."],
tags: ["class:cognitive","topic:self-enhancement","risk:low"],
mappings: { wikipedia: "False_uniqueness_effect" }
},
{
id: "status-quo-bias",
name: "Status quo bias",
kind: "bias",
category: "cognitive",
summary: "Preferring the current state by default even when change is beneficial.",
definition: "Loss aversion, regret aversion, and inertia make existing options feel safer, overweighting switch costs.",
contexts: ["Product defaults", "Policy design", "Org change"],
harms: ["Stagnation", "Legacy lock-in", "Missed upside"],
mitigations: ["Opt-out design with clear reversibility", "Run reversible experiments", "Highlight opportunity cost of inaction"],
examples: ["Keeping an outdated workflow 'because it works' despite persistent rework."],
tags: ["class:cognitive","topic:inertia","risk:medium"],
mappings: { wikipedia: "Status_quo_bias" }
},
{
id: "loss-aversion",
name: "Loss aversion",
kind: "bias",
category: "cognitive",
summary: "Losses loom larger than gains of equal size.",
definition: "Utility drops from losses exceed gains’ utility, shaping risk-seeking in losses and risk-aversion in gains.",
contexts: ["Pricing", "Experiments", "Negotiation"],
harms: ["Over-penalizing short-term dips", "Under-investing in upside"],
mitigations: ["Frame outcomes as foregone gains vs losses carefully", "Use pre-committed test plans", "Show long-run distributions"],
examples: ["Canceling a promising A/B test after a brief dip within expected variance."],
tags: ["class:cognitive","topic:prospect-theory","risk:high"],
mappings: { wikipedia: "Loss_aversion" }
},
{
id: "endowment-effect",
name: "Endowment effect",
kind: "bias",
category: "cognitive",
summary: "Valuing owned items more than identical unowned ones.",
definition: "Ownership increases willingness-to-accept compared to willingness-to-pay, even absent usage or sentimental value.",
contexts: ["Feature deprecation", "M&A", "Auctions"],
harms: ["Zombie features persist", "Mispriced assets"],
mitigations: ["Test 'clean slate' valuations", "Sunset with opt-back", "Use blinded valuation exercises"],
examples: ["Refusing to remove an unused dashboard because 'teams rely on it' without evidence."],
tags: ["class:cognitive","topic:ownership","risk:medium"],
mappings: { wikipedia: "Endowment_effect" }
},
{
id: "sunk-cost-fallacy",
name: "Sunk cost fallacy",
kind: "bias",
category: "cognitive",
summary: "Continuing an endeavor due to prior investments rather than future value.",
definition: "Irrecoverable costs irrationally influence go/no-go decisions, escalating commitment to losing courses of action.",
contexts: ["Projects", "Hiring", "R&D"],
harms: ["Waste of resources", "Late pivots", "Burnout"],
mitigations: ["Base on expected future value", "Set kill-criteria in advance", "Hold 'stop/continue' reviews with outsiders"],
examples: ["Keeping a failed initiative alive because 'we’ve already spent six months'."],
tags: ["class:cognitive","topic:escalation","risk:high"],
mappings: { wikipedia: "Sunk_cost" }
},
{
id: "present-bias",
name: "Present bias",
kind: "bias",
category: "cognitive",
summary: "Overvaluing immediate outcomes relative to delayed ones.",
definition: "People discount future costs/benefits steeply in the short run (dynamic inconsistency), deviating from exponential discounting.",
contexts: ["Health", "Savings", "UX engagement"],
harms: ["Procrastination", "Short-termism"],
mitigations: ["Commitment devices", "Plan-now-act-later flows", "Default scheduling with reminders"],
examples: ["Postponing user interviews repeatedly despite known value."],
tags: ["class:cognitive","topic:time-preference","risk:medium"],
mappings: { wikipedia: "Present_bias" }
},
{
id: "hyperbolic-discounting",
name: "Hyperbolic discounting",
kind: "bias",
category: "cognitive",
summary: "Preference reversals due to steep near-term discounting of future rewards.",
definition: "Discount rate declines over time, making people choose smaller-sooner now and larger-later when both are distant.",
contexts: ["Behavior change", "Payments", "Habit formation"],
harms: ["Inconsistent plans", "Broken commitments"],
mitigations: ["Pre-commitment options", "Lockable savings", "Milestone rewards"],
examples: ["Choosing immediate gift cards over larger deferred ones, then regretting it later."],
tags: ["class:cognitive","topic:time-preference","risk:medium"],
mappings: { wikipedia: "Hyperbolic_discounting" }
},
{
id: "optimism-bias",
name: "Optimism bias",
kind: "bias",
category: "cognitive",
summary: "Underestimating risks and overestimating positive outcomes for oneself.",
definition: "Self-serving beliefs skew risk estimates and timelines beyond evidence.",
contexts: ["Project planning", "Health", "Finance"],
harms: ["Schedule slips", "Underinsurance", "Under-mitigated risk"],
mitigations: ["Reference class forecasting", "Premortems", "Conservative buffers"],
examples: ["Project teams estimating 'two sprints' for work that historically takes four."],
tags: ["class:cognitive","topic:forecasting","risk:medium"],
mappings: { wikipedia: "Optimism_bias" }
},
{
id: "pessimism-bias",
name: "Pessimism bias",
kind: "bias",
category: "cognitive",
summary: "Overestimating risks and negative outcomes.",
definition: "Negative affect and availability of bad events inflate perceived likelihoods, depressing initiative and investment.",
contexts: ["Security", "Change management", "Personal planning"],
harms: ["Missed opportunities", "Over-mitigation costs"],
mitigations: ["Counterbalance with base rates", "Quantify opportunity cost", "Run small safe-to-fail probes"],
examples: ["Declining a low-risk pilot due to rare worst-case scenarios."],
tags: ["class:cognitive","topic:forecasting","risk:medium"],
mappings: { wikipedia: "Negativity_bias#Pessimism_bias" }
},
{
id: "planning-fallacy",
name: "Planning fallacy",
kind: "bias",
category: "cognitive",
summary: "Systematically underestimating completion times and costs.",
definition: "Inside-view forecasting neglects base rates and unknown unknowns, producing optimistic plans.",
contexts: ["Software delivery", "Construction", "Research"],
harms: ["Budget overruns", "Deadline misses"],
mitigations: ["Reference class baselines", "Add contingency bands", "Stage-gate funding"],
examples: ["Shipping a v1 'MVP' that consumes the full annual budget."],
tags: ["class:cognitive","topic:forecasting","risk:high"],
mappings: { wikipedia: "Planning_fallacy" }
},
{
id: "illusion-of-control",
name: "Illusion of control",
kind: "bias",
category: "cognitive",
summary: "Overestimating one’s influence over outcomes determined by chance.",
definition: "People mistake skill for noise, especially with involvement or choice, leading to overactive intervention.",
contexts: ["Trading", "A/B testing", "Operations"],
harms: ["Over-tuning", "Chasing noise", "Burnout"],
mitigations: ["Freeze periods", "Pre-registered decision rules", "Hold-out controls"],
examples: ["Stopping experiments early when interim spikes are random variance."],
tags: ["class:cognitive","topic:agency","risk:medium"],
mappings: { wikipedia: "Illusion_of_control" }
},
{
id: "conjunction-fallacy",
name: "Conjunction fallacy",
kind: "bias",
category: "cognitive",
summary: "Judging specific, vivid scenarios as more likely than broader categories.",
definition: "Representativeness leads to P(A∧B) being rated higher than P(A), violating probability theory.",
contexts: ["Risk communication", "User research", "Journalism"],
harms: ["Mispriced risks", "Misleading narratives"],
mitigations: ["Force numeric probabilities", "Teach set-inclusion checks", "Use natural frequency formats"],
examples: ["Believing a 'bank teller and activist' is likelier than 'bank teller' alone."],
tags: ["class:cognitive","topic:probability","risk:high"],
mappings: { wikipedia: "Conjunction_fallacy" }
},
{
id: "base-rate-neglect",
name: "Base-rate neglect",
kind: "bias",
category: "cognitive",
summary: "Ignoring prior probabilities when evaluating new evidence.",
definition: "Salient case evidence crowds out base rates, derailing Bayesian updating.",
contexts: ["Medical testing", "Fraud detection", "Hiring"],
harms: ["False alarms", "Overfitting", "Inequity"],
mitigations: ["Show priors alongside likelihoods", "Use calibrated risk scores", "Confusion-matrix reviews"],
examples: ["Treating a positive test as likely disease despite very low prevalence."],
tags: ["class:cognitive","topic:probability","risk:high"],
mappings: { wikipedia: "Base_rate_fallacy" }
},
{
id: "neglect-of-probability",
name: "Neglect of probability",
kind: "bias",
category: "cognitive",
summary: "Overweighting outcomes while downplaying their probabilities.",
definition: "People focus on payoff magnitude and narratives, not likelihood, leading to poor expected-value choices.",
contexts: ["Security", "Insurance", "Product bets"],
harms: ["Overreaction to rare events", "Underprepared for likely risks"],
mitigations: ["Pair magnitude with probability bands", "Scenario matrices", "Expected value calculators"],
examples: ["Over-investing in edge-case features while neglecting the common path."],
tags: ["class:cognitive","topic:probability","risk:medium"],
mappings: { wikipedia: "Probability_neglect" }
},
{
id: "zero-risk-bias",
name: "Zero-risk bias",
kind: "bias",
category: "cognitive",
summary: "Preferring to eliminate a small risk entirely over larger proportional reductions elsewhere.",
definition: "Psychological comfort with 'zero' leads to inefficient risk allocation.",
contexts: ["Safety", "Security", "Public policy"],
harms: ["Misallocated budgets", "Over-engineering low-impact areas"],
mitigations: ["Optimize total risk reduction", "Use expected harm metrics", "Portfolio risk framing"],
examples: ["Eliminating a trivial vulnerability while ignoring high-impact medium risks."],
tags: ["class:cognitive","topic:risk","risk:medium"],
mappings: { wikipedia: "Zero-risk_bias" }
},
{
id: "ambiguity-effect",
name: "Ambiguity effect",
kind: "bias",
category: "cognitive",
summary: "Avoiding options with unknown probabilities relative to known risks.",
definition: "Ambiguity aversion drives choices toward familiar distributions, even when EV is higher under ambiguity.",
contexts: ["Product bets", "Investing", "Policy"],
harms: ["Under-exploration", "Conservative stagnation"],
mitigations: ["Small experiments to learn probabilities", "Option value framing", "Information value analysis"],
examples: ["Choosing a mediocre channel with known metrics over testing a promising new one."],
tags: ["class:cognitive","topic:uncertainty","risk:medium"],
mappings: { wikipedia: "Ambiguity_effect" }
},
{
id: "belief-bias",
name: "Belief bias",
kind: "bias",
category: "cognitive",
summary: "Judging argument validity by believability of the conclusion.",
definition: "Reasoners accept invalid arguments with believable conclusions and reject valid ones with unbelievable conclusions.",
contexts: ["Policy debate", "Peer review", "Hiring panels"],
harms: ["Gatekeeping", "Polarization"],
mitigations: ["Blind logic checks", "Separate soundness from validity", "Steelman before critique"],
examples: ["Dismissing a valid but counterintuitive study because the result feels wrong."],
tags: ["class:cognitive","topic:reasoning","risk:medium"],
mappings: { wikipedia: "Belief_bias" }
},
{
id: "disconfirmation-bias",
name: "Disconfirmation bias",
kind: "bias",
category: "cognitive",
summary: "Scrutinizing opposing evidence more than supporting evidence.",
definition: "We apply higher standards to counter-attitudinal data, fueling motivated skepticism.",
contexts: ["Evidence reviews", "Elections", "Science communication"],
harms: ["Polarized interpretations", "Tribal science"],
mitigations: ["Symmetric evidence quality checklists", "Assign devil’s advocate role", "Blind data pipelines"],
examples: ["Demanding preregistration from opposing studies but not from aligned ones."],
tags: ["class:cognitive","topic:motivated-reasoning","risk:medium"],
mappings: { wikipedia: "Confirmation_bias#Disconfirmation_bias" }
},
{
id: "hot-hand-fallacy",
name: "Hot-hand fallacy",
kind: "bias",
category: "cognitive",
summary: "Seeing streaks as evidence of momentum in random processes.",
definition: "People infer serial dependence from short-run clusters that occur by chance.",
contexts: ["Hiring", "Trading", "Sports analytics"],
harms: ["Chasing noise", "Overpaying on streaks"],
mitigations: ["Run independence tests", "Use rolling baselines", "Regression-to-mean dashboards"],
examples: ["Promoting a salesperson after a lucky run of large deals."],
tags: ["class:cognitive","topic:randomness","risk:medium"],
mappings: { wikipedia: "Hot-hand_fallacy" }
},
{
id: "clustering-illusion",
name: "Clustering illusion",
kind: "bias",
category: "cognitive",
summary: "Over-detecting patterns in random data.",
definition: "Humans expect randomness to 'look' uniformly mixed and perceive clusters as meaningful.",
contexts: ["Fraud detection", "Security events", "A/B testing"],
harms: ["False alarms", "Spurious segmentation"],
mitigations: ["Null simulations", "Multiple-testing controls", "Teach Poisson clumping"],
examples: ["Reading meaning into several nearby incidents on a heat map."],
tags: ["class:cognitive","topic:randomness","risk:medium"],
mappings: { wikipedia: "Clustering_illusion" }
},
{
id: "law-of-small-numbers",
name: "Law of small numbers",
kind: "bias",
category: "cognitive",
summary: "Expecting small samples to reflect the population closely.",
definition: "People underestimate variance at low n, over-trusting early signals.",
contexts: ["Experimentation", "User research", "Policy pilots"],
harms: ["Overconfident decisions", "Misleading dashboards"],
mitigations: ["Power analyses", "Sequential designs", "Confidence intervals prominently"],
examples: ["Declaring a feature 'solved' after five user tests."],
tags: ["class:cognitive","topic:statistics","risk:high"],
mappings: { wikipedia: "Law_of_small_numbers" }
},
{
id: "primacy-effect",
name: "Primacy effect",
kind: "bias",
category: "cognitive",
summary: "Earlier information weighs more than later information.",
definition: "Order effects make first items or frames anchor interpretation of subsequent data.",
contexts: ["Surveys", "Negotiations", "Presentations"],
harms: ["Anchoring on first pitch", "Biased recall"],
mitigations: ["Randomize order", "Counter-balance presentations", "Summaries that revisit later evidence"],
examples: ["The first design reviewed sets the tone for the rest."],
tags: ["class:cognitive","topic:memory","risk:medium"],
mappings: { wikipedia: "Serial_position_effect" }
},
{
id: "false-memory-bias",
name: "False memory",
kind: "bias",
category: "cognitive",
summary: "Confidently recalling events that did not occur or misremembering details.",
definition: "Memory is reconstructive; suggestion and schemas insert plausible but incorrect details.",
contexts: ["Investigations", "User interviews", "Legal testimony"],
harms: ["Faulty requirements", "Misattributed blame"],
mitigations: ["Use artifacts instead of recall", "Cognitive interviewing", "Triangulate with logs/telemetry"],
examples: ["A user insists a button used to exist where analytics show none."],
tags: ["class:cognitive","topic:memory","risk:medium"],
mappings: { wikipedia: "False_memory" }
},
{
id: "illusory-correlation",
name: "Illusory correlation",
kind: "bias",
category: "cognitive",
summary: "Perceiving a relationship where none exists or overestimating its strength.",
definition: "Distinctive or frequent co-occurrences feel linked even when explained by chance or confounding.",
contexts: ["Diagnostics", "Analytics", "Stereotyping"],
harms: ["Superstitious processes", "Discriminatory policies"],
mitigations: ["Control for confounders", "Out-of-sample tests", "Causal diagrams"],
examples: ["Assuming a UI theme caused churn during seasonal shifts."],
tags: ["class:cognitive","topic:association","risk:medium"],
mappings: { wikipedia: "Illusory_correlation" }
},
{
id: "reactive-devaluation",
name: "Reactive devaluation",
kind: "bias",
category: "cognitive",
summary: "Discounting proposals because they come from an adversary or out-group.",
definition: "Source negativity reduces perceived value, irrespective of content merits.",
contexts: ["Negotiation", "Politics", "Org change"],
harms: ["Stalemates", "Underused good ideas"],
mitigations: ["Anonymous idea vetting", "Swap teams to evaluate proposals", "Use decision matrices"],
examples: ["Rejecting a security team’s idea solely because 'security slows us down'."],
tags: ["class:cognitive","topic:source-effects","risk:medium"],
mappings: { wikipedia: "Reactive_devaluation" }
},
{
id: "horn-effect",
name: "Horn effect",
kind: "bias",
category: "cognitive",
summary: "A negative trait or first impression colors evaluations of unrelated traits.",
definition: "The inverse of the halo effect; one flaw contaminates global judgments.",
contexts: ["Hiring", "Performance reviews", "Peer feedback"],
harms: ["Unfair ratings", "Missed talent"],
mitigations: ["Attribute-by-attribute rubrics", "Blind work samples", "Multiple independent reviewers"],
examples: ["Dismissing a designer’s strategy skills after noticing a typo."],
tags: ["class:cognitive","topic:impression","risk:medium"],
mappings: { wikipedia: "Halo_effect#Reverse_halo_effect" }
},
{
id: "moral-licensing",
name: "Moral licensing",
kind: "bias",
category: "cognitive",
summary: "Past good deeds increase tolerance of later questionable behavior.",
definition: "People grant themselves 'moral credit', loosening standards and justifying actions that conflict with values.",
contexts: ["Compliance", "Sustainability", "Hiring"],
harms: ["Ethics drift", "Policy exceptions"],
mitigations: ["Separate credits from standards", "Consistent rule enforcement", "Third-party review"],
examples: ["'We donated last quarter, so this quarter we can skip the audit.'"],
tags: ["class:cognitive","topic:self-justification","risk:medium"],
mappings: { wikipedia: "Moral_licensing" }
},
{
id: "groupthink",
name: "Groupthink",
kind: "bias",
category: "cognitive",
summary: "Desire for harmony suppresses dissent and critical evaluation.",
definition: "Cohesive groups self-censor, assume unanimity, and pressure dissenters, degrading decision quality.",
contexts: ["Leadership meetings", "Incident postmortems", "Boards"],
harms: ["Overconfidence", "Blind spots", "Catastrophic errors"],
mitigations: ["Assign red teams", "Record minority reports", "Invite external reviewers"],
examples: ["Rubber-stamping a risky launch because 'everyone seems aligned'."],
tags: ["class:cognitive","topic:group-dynamics","risk:high"],
mappings: { wikipedia: "Groupthink" }
},
{
id: "dehumanization-bias",
name: "Dehumanization bias",
kind: "bias",
category: "cognitive",
summary: "Perceiving others as lacking full human qualities, emotions, or rights.",
definition: "Language and framing strip out mind and moral worth, enabling harsher treatment.",
contexts: ["Content moderation", "Conflict", "Customer support"],
harms: ["Abuse", "Policy harms", "Discrimination"],
mitigations: ["Use person-first language", "Guided empathy prompts", "Contact with impacted groups"],
examples: ["Calling users 'traffic' or 'units' in planning."],
tags: ["class:cognitive","topic:empathy","risk:high"],
mappings: { wikipedia: "Dehumanization" }
},
{
id: "anthropomorphism-bias",
name: "Anthropomorphism bias",
kind: "bias",
category: "cognitive",
summary: "Attributing human traits to non-human agents or systems.",
definition: "We over-infer intent or emotion in animals, devices, and algorithms, distorting expectations.",
contexts: ["Robotics", "AI UX", "Pet care"],
harms: ["Overtrust of systems", "Misuse", "Disappointment"],
mitigations: ["Capability disclaimers", "Model limits in UI", "Outcome-not-intent framing"],
examples: ["Assuming an assistant 'tried to ignore me' rather than hit a parser limit."],
tags: ["class:cognitive","topic:agency-ascription","risk:medium"],
mappings: { wikipedia: "Anthropomorphism" }
},
{
id: "algorithm-aversion",
name: "Algorithm aversion",
kind: "bias",
category: "cognitive",
summary: "Distrusting algorithms after seeing errors, more than we distrust humans for the same errors.",
definition: "People hold algorithms to perfection standards; small visible mistakes collapse trust.",
contexts: ["Decision support", "Clinical tools", "Credit scoring"],
harms: ["Under-utilized tools", "Manual rework"],
mitigations: ["Allow human override and learning loops", "Expose error distributions", "Pilot with feedback"],
examples: ["Abandoning a triage model after one obvious miss, while accepting human misses as normal."],
tags: ["class:cognitive","topic:ai-trust","risk:medium"],
mappings: { wikipedia: "Algorithm_aversion" }
},
{
id: "anthropocentric-bias",
name: "Anthropocentric bias",
kind: "bias",
category: "cognitive",
summary: "Interpreting phenomena primarily from a human-centered perspective.",
definition: "Human experiences and values dominate judgments about non-human systems and the environment.",
contexts: ["Environmental policy", "Animal research", "AGI debates"],
harms: ["Narrow risk framing", "Ethical blind spots"],
mitigations: ["Multi-species ethics framing", "Systems thinking", "Include environmental externalities"],
examples: ["Dismissing ecosystem collapse risks because short-term human utility is unaffected."],
tags: ["class:cognitive","topic:anthropocentrism","risk:medium"],
mappings: { wikipedia: "Anthropocentrism" }
},
{
id: "negativity-bias",
name: "Negativity bias",
kind: "bias",
category: "cognitive",
summary: "Negative events weigh more heavily than positive ones of equal intensity.",
definition: "Attention and memory are tuned to threats and losses, skewing perception and decisions.",
contexts: ["Feedback culture", "Media", "Risk management"],
harms: ["Cynicism", "Avoidance of good bets", "Spiral of fear"],
mitigations: ["Separate risk review from ideation", "Run balanced scorecards", "Deliberate 'gain finding'"],
examples: ["Overreacting to one bad review while ignoring dozens of good ones."],
tags: ["class:cognitive","topic:affect","risk:medium"],
mappings: { wikipedia: "Negativity_bias" }
},
{
id: "salience-bias",
name: "Salience bias",
kind: "bias",
category: "cognitive",
summary: "Focusing on items that are more prominent or emotionally striking.",
definition: "Vivid, novel, or recent stimuli capture attention and dominate judgment beyond importance.",
contexts: ["Prioritization", "Safety", "UX research"],
harms: ["Misprioritized roadmaps", "Overlooking mundane but critical issues"],
mitigations: ["Use impact x likelihood grids", "Quantify with telemetry", "Rotate spotlight to 'boring' systems"],
examples: ["Funding flashy features while neglecting reliability work."],
tags: ["class:cognitive","topic:attention","risk:medium"],
mappings: { wikipedia: "Salience_bias" }
},
{
id: "attentional-bias",
name: "Attentional bias",
kind: "bias",
category: "cognitive",
summary: "Perception is influenced by one’s recurring thoughts and preoccupations.",
definition: "We notice information consistent with current concerns and miss other relevant cues.",
contexts: ["Clinical judgment", "Security monitoring", "User studies"],
harms: ["Tunnel vision", "Missed anomalies"],
mitigations: ["Checklists", "Team handoffs with fresh eyes", "Mindfulness resets"],
examples: ["Seeing only security risks during a design review and missing usability problems."],
tags: ["class:cognitive","topic:attention","risk:medium"],
mappings: { wikipedia: "Attentional_bias" }
},
{
id: "representativeness-heuristic",
name: "Representativeness heuristic",
kind: "bias",
category: "cognitive",
summary: "Judging probability by similarity to a stereotype rather than base rates.",
definition: "Prototypical fit substitutes for statistical reasoning, causing conjunction error and base-rate neglect.",
contexts: ["Hiring", "Diagnostics", "Forecasting"],
harms: ["Stereotyping", "Misclassification"],
mitigations: ["Show base rates first", "Counter-stereotypical examples", "Forced-choice with priors"],
examples: ["Assuming a quiet candidate is better suited for back-office roles without evidence."],
tags: ["class:cognitive","topic:heuristics","risk:high"],
mappings: { wikipedia: "Representativeness_heuristic" }
},
{
id: "attractiveness-bias",
name: "Attractiveness (beauty premium) bias",
kind: "bias",
category: "cognitive",
summary: "More attractive people receive systematically favorable evaluations.",
definition: "Appearance colors perceptions of competence, trustworthiness, and intelligence across domains.",
contexts: ["Hiring", "Performance reviews", "Jury decisions"],
harms: ["Discrimination", "Talent misallocation"],
mitigations: ["Blind work samples", "Structured interviews", "Photo-free early stages"],
examples: ["Rating similar resumes higher when paired with an attractive photo."],
tags: ["class:cognitive","topic:impression","risk:high"],
mappings: { wikipedia: "Beauty_premium" }
},
{
id: "height-bias",
name: "Height bias",
kind: "bias",
category: "cognitive",
summary: "Taller individuals are judged as more competent or leader-like.",
definition: "Physical stature inappropriately influences social and economic outcomes.",
contexts: ["Leadership selection", "Compensation"],
harms: ["Inequity", "Homogeneous leadership"],
mitigations: ["Define role criteria narrowly", "Evidence-based promotion rubrics"],
examples: ["Preferring taller candidates for sales leadership absent performance data."],
tags: ["class:cognitive","topic:appearance","risk:medium"],
mappings: { wikipedia: "Height_discrimination" }
},
{
id: "name-letter-effect",
name: "Name-letter effect",
kind: "bias",
category: "cognitive",
summary: "Preferring letters in one’s own name and, by extension, similar names or choices.",
definition: "Implicit egotism nudges selections toward self-referential cues (brands, places, people).",
contexts: ["Brand testing", "Recruiting", "Marketing"],
harms: ["Spurious preferences", "Affinity bias"],
mitigations: ["Blind identifiers", "Randomize name exposure"],
examples: ["Favoring a candidate because their name 'just feels right' and mirrors your initials."],
tags: ["class:cognitive","topic:implicit-egotism","risk:low"],
mappings: { wikipedia: "Name-letter_effect" }
},
{
id: "cheerleader-effect",
name: "Cheerleader effect",
kind: "bias",
category: "cognitive",
summary: "Faces appear more attractive in a group than alone.",
definition: "Perceptual averaging and contrast make individuals seem better when seen in groups.",
contexts: ["Marketing", "Social media", "Photo curation"],
harms: ["Misleading visuals", "Skewed self-evaluation"],
mitigations: ["Evaluate exemplars individually", "Use standardized photos"],
examples: ["Team photo makes each member appear more charismatic than solo headshots."],
tags: ["class:cognitive","topic:perception","risk:low"],
mappings: { wikipedia: "Cheerleader_effect" }
},
{
id: "time-saving-bias",
name: "Time-saving bias",
kind: "bias",
category: "cognitive",
summary: "Misestimating time saved by speed increases, especially near endpoints.",
definition: "People underestimate time saved when already fast and overestimate when slow; non-linear speed-time mapping is misintuitive.",
contexts: ["Transport planning", "Workflow optimization"],
harms: ["Bad ROI on speed work", "Poor scheduling"],
mitigations: ["Use time-per-unit models", "Plot speed vs time saved", "Prioritize slowest steps"],
examples: ["Investing to raise delivery speed from 50→60 mph rather than 20→30 mph where gains are larger."],
tags: ["class:cognitive","topic:estimation","risk:medium"],
mappings: { wikipedia: "Time-saving_bias" }
},
{
id: "pro-innovation-bias",
name: "Pro-innovation bias",
kind: "bias",
category: "cognitive",
summary: "Overrating new ideas and technologies while downplaying costs and drawbacks.",
definition: "Narratives of progress and novelty glamorize adoption and understate maintenance, integration, and risk.",
contexts: ["Product strategy", "Policy", "AI adoption"],
harms: ["Shiny-object chasing", "Tech debt", "Equity harms"],
mitigations: ["Total cost of ownership reviews", "Sunset criteria", "Pilot with guardrails and success metrics"],
examples: ["Choosing a new ML stack without capacity to operate it."],
tags: ["class:cognitive","topic:innovation","risk:medium"],
mappings: { wikipedia: "Pro-innovation_bias" }
},

// ===== Ethical dilemmas to add (no dupes) =====
{
id: "trolley-fat-man-variant",
name: "Trolley problem: footbridge (fat-man) variant",
kind: "dilemma",
category: "ethics",
summary: "Should one push a person to stop a trolley and save five?",
definition: "A personal-force variant pits deontic constraints and rights against consequentialist aggregation, revealing moral intuitions about means vs ends.",
contexts: ["Moral psychology", "Autonomous systems"],
mitigations: ["Value-sensitive design", "Stakeholder deliberation", "Documented ethical policies"],
examples: ["Specifying collision-avoidance behavior when all options risk harm."],
tags: ["class:ethics","topic:personal-force"],
mappings: { wikipedia: "Trolley_problem#Fat_man" }
},
{
id: "transplant-surgeon-dilemma",
name: "Transplant surgeon dilemma",
kind: "dilemma",
category: "ethics",
summary: "Harvest one healthy patient’s organs to save five?",
definition: "Outcome arithmetic suggests sacrifice; rights and consent forbid treating persons merely as means.",
contexts: ["Bioethics", "Medical training"],
mitigations: ["Consent-based ethics", "Human rights constraints"],
examples: ["Triaging in organ scarcity without violating bodily autonomy."],
tags: ["class:ethics","topic:ends-vs-means"],
mappings: { wikipedia: "Trolley_problem#Transplant" }
},
{
id: "ticking-time-bomb",
name: "Ticking time-bomb scenario",
kind: "dilemma",
category: "ethics",
summary: "May severe rights violations be justified to avert catastrophe?",
definition: "Hypothetical urgent threats test absolutist bans on torture and rights violations versus consequentialist exceptions.",
contexts: ["National security", "Law", "Policy"],
mitigations: ["International law adherence", "Ban slippery-slope exceptions", "Accountability and oversight"],
examples: ["Rejecting torture even under speculative catastrophe claims."],
tags: ["class:ethics","topic:security"],
mappings: { wikipedia: "Ticking_time_bomb_scenario" }
},
{
id: "heinz-dilemma",
name: "Heinz dilemma",
kind: "dilemma",
category: "ethics",
summary: "Is it permissible to steal a life-saving drug one cannot afford?",
definition: "A classic moral development case pitting law and property against care and life.",
contexts: ["Moral education", "Clinical ethics"],
mitigations: ["Policy for compassionate use", "Means-tested subsidies"],
examples: ["Evaluating emergency exceptions in pricing life-saving treatments."],
tags: ["class:ethics","topic:care-vs-law"],
mappings: { wikipedia: "Heinz_dilemma" }
},
{
id: "lifeboat-ethics",
name: "Lifeboat ethics",
kind: "dilemma",
category: "ethics",
summary: "Allocation under extreme scarcity: who gets saved?",
definition: "Competing principles (first-come, need, social role, lottery) yield different yet defensible triage outcomes.",
contexts: ["Disaster response", "ICU triage", "Space/mission planning"],
mitigations: ["Transparent triage protocol", "Independent review", "Appeals process"],
examples: ["Ventilator allocation during a pandemic."],
tags: ["class:ethics","topic:triage"],
mappings: { wikipedia: "Lifeboat_ethics" }
},
{
id: "experience-machine",
name: "Nozick’s experience machine",
kind: "dilemma",
category: "ethics",
summary: "Should we plug into a machine that gives maximal pleasure but illusory reality?",
definition: "Challenges hedonism by elevating authenticity, achievement, and contact with reality as intrinsic goods.",
contexts: ["AI/VR", "Well-being policy"],
mitigations: ["Informed consent", "Safeguards against coercion", "Reality-anchoring norms"],
examples: ["Designing immersive tech without replacing valued real-world goods."],
tags: ["class:ethics","topic:well-being"],
mappings: { wikipedia: "Experience_machine" }
},
{
id: "thomsons-violinist",
name: "Thomson’s violinist",
kind: "dilemma",
category: "ethics",
summary: "Are you obligated to remain attached to an unconscious violinist to keep them alive?",
definition: "Bodily autonomy and consent may outweigh a right to life that imposes forced use of another’s body.",
contexts: ["Reproductive ethics", "Medical law"],
mitigations: ["Respect bodily autonomy", "Clarify consent standards"],
examples: ["Abortion debates framed around compelled support."],
tags: ["class:ethics","topic:bodily-autonomy"],
mappings: { wikipedia: "A_Defense_of_Abortion" }
},
{
id: "double-effect",
name: "Doctrine of double effect",
kind: "dilemma",
category: "ethics",
summary: "When, if ever, are harmful side-effects permissible if the intention is good?",
definition: "Distinguishes intended harm from foreseen but unintended harm; permits the latter under strict proportionality.",
contexts: ["Military ethics", "Clinical care"],
mitigations: ["Proportionality tests", "Least-harm alternatives"],
examples: ["Administering high-dose pain relief that risks respiratory depression."],
tags: ["class:ethics","topic:intent-vs-consequence"],
mappings: { wikipedia: "Doctrine_of_double_effect" }
},
{
id: "omelas-dilemma",
name: "Omelas trade-off",
kind: "dilemma",
category: "ethics",
summary: "Is a flourishing society justified if it rests on the misery of one child?",
definition: "A literary case (Le Guin) testing tolerance for extreme inequality and complicity in systemic harm.",
contexts: ["Social justice", "Policy ethics"],
mitigations: ["Harm non-aggregation constraint", "Rights floors"],
examples: ["Rejecting policies that sacrifice a small group for large aggregate benefits."],
tags: ["class:ethics","topic:distribution"],
mappings: { wikipedia: "The_Ones_Who_Walk_Away_from_Omelas" }
},
{
id: "pascals-mugging",
name: "Pascal’s mugging",
kind: "dilemma",
category: "ethics",
summary: "Tiny probabilities with astronomical payoffs dominate expected value.",
definition: "Decision procedures become exploitable by extreme claims; motivates bounded utility or prior skepticism.",
contexts: ["Philanthropy", "AI risk", "Security"],
mitigations: ["Utility/priors regularization", "Robust decision frameworks"],
examples: ["Rejecting donations based solely on astronomical hypothetical impacts without evidence."],
tags: ["class:ethics","topic:low-probability-high-impact"],
mappings: { wikipedia: "Pascal%27s_mugging" }
},
{
id: "moral-luck-dilemma",
name: "Moral luck",
kind: "dilemma",
category: "ethics",
summary: "We judge agents for outcomes outside their control.",
definition: "Outcome and circumstantial luck affect moral appraisal, straining responsibility tied to control.",
contexts: ["Law", "Safety", "Policy"],
mitigations: ["Process-based accountability", "No-fault compensation schemes"],
examples: ["Punishing equally negligent drivers differently due to luck of consequences."],
tags: ["class:ethics","topic:responsibility"],
mappings: { wikipedia: "Moral_luck" }
},
{
id: "non-identity-problem",
name: "Non-identity problem",
kind: "dilemma",
category: "ethics",
summary: "Choices that change who exists complicate claims of harm.",
definition: "Acts can be bad for future populations without harming any particular person who would have existed otherwise.",
contexts: ["Climate policy", "Reproductive ethics"],
mitigations: ["Impersonal welfare constraints", "Rights for future generations"],
examples: ["Approving polluting projects that alter who is born decades later."],
tags: ["class:ethics","topic:population-ethics"],
mappings: { wikipedia: "Non-identity_problem" }
},
{
id: "autonomous-vehicle-dilemma",
name: "Autonomous-vehicle trolley trade-offs",
kind: "dilemma",
category: "ethics",
summary: "How should AVs choose among harmful outcomes in unavoidable crashes?",
definition: "Embedding moral trade-offs in code raises consent, liability, and distributive justice concerns.",
contexts: ["AI safety", "Transportation policy"],
mitigations: ["Regulatory standards", "Public deliberation", "Transparency on decision logic"],
examples: ["Vehicle chooses self-sacrifice vs bystander risk based on policy, not secret heuristics."],
tags: ["class:ethics","topic:ai-safety"],
mappings: { wikipedia: "Moral_Machine_experiment" }
},
{
id: "geoengineering-dilemma",
name: "Climate geoengineering dilemma",
kind: "dilemma",
category: "ethics",
summary: "Deploy risky climate interventions vs risk catastrophic warming.",
definition: "Solar radiation management and carbon removal balance moral hazard, governance gaps, and distributive impacts.",
contexts: ["Climate policy", "Global governance"],
mitigations: ["International oversight", "Reversibility tests", "Justice-focused impact reviews"],
examples: ["Field trials with strict consent and monitoring vs premature unilateral deployment."],
tags: ["class:ethics","topic:climate"],
mappings: { wikipedia: "Climate_engineering" }
},
{
id: "free-speech-vs-harm",
name: "Free speech vs harm",
kind: "dilemma",
category: "ethics",
summary: "Protect expression while limiting incitement, harassment, and targeted harm.",
definition: "Platform and policy choices weigh autonomy, truth-seeking, and pluralism against safety, dignity, and power asymmetries.",
contexts: ["Content moderation", "Campus policy", "Journalism"],
mitigations: ["Procedural fairness", "Clearly scoped rules", "Appeals and transparency reports"],
examples: ["Downranking borderline harmful content while preserving legitimate debate."],
tags: ["class:ethics","topic:platform-governance"],
mappings: { wikipedia: "Freedom_of_speech#Limitations" }
},


    // ===== Bias gap-fill entries (2026-04-27) =====
    {
      "id": "misinformation-effect",
      "name": "Misinformation effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Post-event information alters how an event is remembered, often making people confidently recall details that were suggested later rather than perceived originally.",
      "definition": "Post-event information alters how an event is remembered, often making people confidently recall details that were suggested later rather than perceived originally.",
      "contexts": [
        "memory",
        "false-memory",
        "eyewitness-testimony"
      ],
      "mitigations": [
        "Separate first-hand observations from later commentary; preserve original notes, timestamps, screenshots, or recordings before discussing the event."
      ],
      "examples": [
        "After hearing a question about a car that 'smashed' into another, a witness later remembers the crash as faster and more violent than they first saw it."
      ],
      "related": [
        "false-memory-bias",
        "recency-bias",
        "illusory-truth-effect",
        "confirmation-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:false-memory",
        "topic:eyewitness-testimony"
      ],
      "meta": {
        "source": "Loftus & Palmer (1974), “Reconstruction of Automobile Destruction”; Loftus (1992), “When a Lie Becomes Memory’s Truth.”",
        "ai_relevance": "LLM summaries, captions, and autogenerated notes can become post-event information that contaminates a user’s later memory of the original source.",
        "original_categories": [
          "cognitive",
          "memory",
          "false-memory",
          "eyewitness-testimony"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "source-monitoring-error",
      "name": "Source monitoring error",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A memory-attribution error in which someone remembers a claim, image, or idea but misidentifies where it came from or whether it was imagined, inferred, or observed.",
      "definition": "A memory-attribution error in which someone remembers a claim, image, or idea but misidentifies where it came from or whether it was imagined, inferred, or observed.",
      "contexts": [
        "memory",
        "attribution",
        "misinformation"
      ],
      "mitigations": [
        "Keep source labels attached to claims; use citation managers, quote logs, and source-type tags such as primary study, review, news, forum, or model output."
      ],
      "examples": [
        "A person reads an AI-generated claim, later forgets the source, and cites it as something they saw in a peer-reviewed article."
      ],
      "related": [
        "false-memory-bias",
        "availability-heuristic",
        "illusory-truth-effect",
        "authority-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:attribution",
        "topic:misinformation"
      ],
      "meta": {
        "source": "Johnson, Hashtroudi & Lindsay (1993), “Source Monitoring,” Psychological Bulletin.",
        "ai_relevance": "This is a core risk in AI-assisted research because fluent summaries can detach claims from their provenance.",
        "original_categories": [
          "cognitive",
          "memory",
          "attribution",
          "misinformation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "rosy-retrospection",
      "name": "Rosy retrospection",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to remember past experiences as more positive, enjoyable, or meaningful than they felt at the time.",
      "definition": "The tendency to remember past experiences as more positive, enjoyable, or meaningful than they felt at the time.",
      "contexts": [
        "memory",
        "autobiographical-memory",
        "nostalgia"
      ],
      "mitigations": [
        "Compare retrospective evaluations with contemporaneous notes, incident logs, journal entries, and quantitative records."
      ],
      "examples": [
        "A team remembers a difficult product launch as 'actually pretty smooth' and underestimates the stress, defects, and rework it caused."
      ],
      "related": [
        "peak-end-rule",
        "choice-supportive-bias",
        "optimism-bias",
        "negativity-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:autobiographical-memory",
        "topic:nostalgia"
      ],
      "meta": {
        "source": "Mitchell, Thompson, Peterson & Cronk (1997), “Temporal Adjustments in the Evaluation of Events,” Journal of Experimental Social Psychology.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "memory",
          "autobiographical-memory",
          "nostalgia"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "consistency-bias",
      "name": "Consistency bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to remember past attitudes, beliefs, or preferences as more similar to current ones than they actually were.",
      "definition": "The tendency to remember past attitudes, beliefs, or preferences as more similar to current ones than they actually were.",
      "contexts": [
        "memory",
        "self-concept",
        "belief-updating"
      ],
      "mitigations": [
        "Use version histories, old survey responses, diaries, and decision records to check how beliefs actually changed over time."
      ],
      "examples": [
        "Someone who now distrusts a company insists they 'always knew it was shady,' even though their old emails show enthusiastic support."
      ],
      "related": [
        "hindsight-bias",
        "self-serving-bias",
        "confirmation-bias",
        "choice-supportive-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:self-concept",
        "topic:belief-updating"
      ],
      "meta": {
        "source": "Ross (1989), “Relation of Implicit Theories to the Construction of Personal Histories,” Psychological Review.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "memory",
          "self-concept",
          "belief-updating"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "mood-congruent-memory-bias",
      "name": "Mood-congruent memory bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency for current mood to make mood-matching memories easier to retrieve and mood-incongruent memories harder to access.",
      "definition": "The tendency for current mood to make mood-matching memories easier to retrieve and mood-incongruent memories harder to access.",
      "contexts": [
        "memory",
        "affect",
        "emotion"
      ],
      "mitigations": [
        "Prompt for counterexamples from different emotional states: 'What evidence would I remember if I felt calmer, safer, or more hopeful?'"
      ],
      "examples": [
        "During a depressive week, a student more easily recalls failures and rejections, making the whole semester seem worse than it was."
      ],
      "related": [
        "attentional-bias",
        "negativity-bias",
        "availability-heuristic",
        "pessimism-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:affect",
        "topic:emotion"
      ],
      "meta": {
        "source": "Bower (1981), “Mood and Memory,” American Psychologist; Blaney (1986), “Affect and Memory,” Psychological Bulletin.",
        "ai_relevance": "Conversational AI that mirrors a user’s mood may reinforce mood-congruent recall if it only explores memories matching the current emotional state.",
        "original_categories": [
          "cognitive",
          "memory",
          "affect",
          "emotion"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "cryptomnesia",
      "name": "Cryptomnesia",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Unintentional plagiarism or idea theft caused by remembering an idea while forgetting that it came from someone else.",
      "definition": "Unintentional plagiarism or idea theft caused by remembering an idea while forgetting that it came from someone else.",
      "contexts": [
        "memory",
        "source-attribution",
        "creativity"
      ],
      "mitigations": [
        "Keep ideation logs and cite inspiration generously; distinguish 'generated by me,' 'suggested by AI,' and 'borrowed from source.'"
      ],
      "examples": [
        "A writer pitches a 'new' plot twist, not realizing it came from a podcast episode they listened to months earlier."
      ],
      "related": [
        "false-memory-bias",
        "egocentric-bias",
        "self-serving-bias",
        "availability-heuristic"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:source-attribution",
        "topic:creativity"
      ],
      "meta": {
        "source": "Brown & Murphy (1989), “Cryptomnesia: Delineating Inadvertent Plagiarism,” Journal of Experimental Psychology: Learning, Memory, and Cognition.",
        "ai_relevance": "AI-assisted brainstorming can blur whether a phrase, concept, or structure originated with the user, a source, or the model.",
        "original_categories": [
          "cognitive",
          "memory",
          "source-attribution",
          "creativity"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "self-reference-effect",
      "name": "Self-reference effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Information connected to the self is encoded and remembered more strongly than information processed in a neutral or impersonal way.",
      "definition": "Information connected to the self is encoded and remembered more strongly than information processed in a neutral or impersonal way.",
      "contexts": [
        "memory",
        "encoding",
        "self-concept"
      ],
      "mitigations": [
        "Use self-relevance for learning, then deliberately compare against cases that do not resemble you."
      ],
      "examples": [
        "A UX researcher remembers participant quotes more vividly when they relate to their own frustrations with a tool."
      ],
      "related": [
        "egocentric-bias",
        "spotlight-effect",
        "availability-heuristic",
        "confirmation-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:encoding",
        "topic:self-concept"
      ],
      "meta": {
        "source": "Rogers, Kuiper & Kirker (1977), “Self-Reference and the Encoding of Personal Information,” Journal of Personality and Social Psychology.",
        "ai_relevance": "Personalized AI examples may improve learning but can also overweight self-relevant evidence over representative evidence.",
        "original_categories": [
          "cognitive",
          "memory",
          "encoding",
          "self-concept"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "telescoping-effect",
      "name": "Telescoping effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A temporal-memory bias in which people remember events as occurring more recently or more remotely than they actually did.",
      "definition": "A temporal-memory bias in which people remember events as occurring more recently or more remotely than they actually did.",
      "contexts": [
        "memory",
        "temporal-judgment",
        "survey-error"
      ],
      "mitigations": [
        "Use bounded recall periods, calendars, receipts, timestamps, and event-history aids rather than unaided memory."
      ],
      "examples": [
        "A survey respondent reports a medical appointment as happening 'last month' even though it was five months ago."
      ],
      "related": [
        "recency-bias",
        "availability-heuristic",
        "hindsight-bias",
        "false-memory-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:temporal-judgment",
        "topic:survey-error"
      ],
      "meta": {
        "source": "Neter & Waksberg (1964), survey recall-error research; Rubin & Baddeley (1989), “Telescoping Is Not Time Compression,” Memory & Cognition.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "memory",
          "temporal-judgment",
          "survey-error"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "fading-affect-bias",
      "name": "Fading affect bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The affect linked to unpleasant memories tends to fade faster than the affect linked to pleasant memories.",
      "definition": "The affect linked to unpleasant memories tends to fade faster than the affect linked to pleasant memories.",
      "contexts": [
        "memory",
        "autobiographical-memory",
        "affect"
      ],
      "mitigations": [
        "For risk reviews, consult contemporaneous incident notes rather than relying only on how bad the event feels in hindsight."
      ],
      "examples": [
        "Someone remembers a vacation argument as less emotionally intense over time, while the joy of the trip remains vivid."
      ],
      "related": [
        "peak-end-rule",
        "optimism-bias",
        "negativity-bias",
        "recency-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:autobiographical-memory",
        "topic:affect"
      ],
      "meta": {
        "source": "Walker, Skowronski & Thompson (2003), “Life Is Pleasant—and Memory Helps to Keep It That Way!,” Review of General Psychology.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "memory",
          "autobiographical-memory",
          "affect"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "reminiscence-bump",
      "name": "Reminiscence bump",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency for older adults to recall a disproportionate number of autobiographical memories from adolescence and early adulthood.",
      "definition": "The tendency for older adults to recall a disproportionate number of autobiographical memories from adolescence and early adulthood.",
      "contexts": [
        "memory",
        "autobiographical-memory",
        "life-course"
      ],
      "mitigations": [
        "When evaluating generational preferences, separate life-stage memory salience from objective quality or broad popularity."
      ],
      "examples": [
        "A person’s sense of 'what music really matters' is disproportionately shaped by songs from their teens and twenties."
      ],
      "related": [
        "primacy-effect",
        "availability-heuristic",
        "mere-exposure-effect",
        "recency-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:autobiographical-memory",
        "topic:life-course"
      ],
      "meta": {
        "source": "Rubin & Schulkind (1997), “Distribution of Important and Word-Cued Autobiographical Memories,” Psychology and Aging.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "memory",
          "autobiographical-memory",
          "life-course"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "suggestibility",
      "name": "Suggestibility",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A memory vulnerability in which suggestions, leading questions, or social cues become incorporated into what someone believes they remember.",
      "definition": "A memory vulnerability in which suggestions, leading questions, or social cues become incorporated into what someone believes they remember.",
      "contexts": [
        "memory",
        "social-influence",
        "eyewitness-testimony"
      ],
      "mitigations": [
        "Ask open-ended questions before specific prompts; record uncertainty before exposure to suggested details."
      ],
      "examples": [
        "After an interviewer asks whether the suspect had a beard, a witness becomes more likely to remember a beard even if they were unsure before."
      ],
      "related": [
        "false-memory-bias",
        "framing-effect",
        "authority-bias",
        "illusory-truth-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:memory",
        "topic:social-influence",
        "topic:eyewitness-testimony"
      ],
      "meta": {
        "source": "Schacter (1999), “The Seven Sins of Memory”; Loftus & Palmer (1974).",
        "ai_relevance": "A leading AI prompt can reshape the user’s recall by supplying plausible details before the user has reconstructed their own memory.",
        "original_categories": [
          "cognitive",
          "memory",
          "social-influence",
          "eyewitness-testimony"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "memory-conformity",
      "name": "Memory conformity",
      "kind": "bias",
      "category": "social",
      "summary": "A social-memory distortion in which other people’s recollections influence what an individual later remembers or reports.",
      "definition": "A social-memory distortion in which other people’s recollections influence what an individual later remembers or reports.",
      "contexts": [
        "cognitive",
        "memory",
        "group-influence"
      ],
      "mitigations": [
        "Collect independent accounts before group discussion; preserve disagreement rather than immediately harmonizing recollections."
      ],
      "examples": [
        "After a group debrief, multiple team members remember a client saying something that only one person actually inferred."
      ],
      "related": [
        "bandwagon-effect",
        "groupthink",
        "false-memory-bias",
        "illusory-truth-effect"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:cognitive",
        "topic:memory",
        "topic:group-influence"
      ],
      "meta": {
        "source": "Roediger, Meade & Bergman (2001), “Social Contagion of Memory,” Psychonomic Bulletin & Review.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "cognitive",
          "memory",
          "group-influence"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "publication-bias",
      "name": "Publication bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A distortion in the visible evidence base caused when studies with statistically significant, positive, novel, or exciting results are more likely to be published than null or negative findings.",
      "definition": "A distortion in the visible evidence base caused when studies with statistically significant, positive, novel, or exciting results are more likely to be published than null or negative findings.",
      "contexts": [
        "research-methods",
        "evidence-synthesis",
        "meta-analysis"
      ],
      "mitigations": [
        "Search trial registries, preprints, dissertations, null-result repositories, and systematic reviews that assess funnel-plot asymmetry."
      ],
      "examples": [
        "A meta-analysis overestimates a therapy’s benefit because small unsuccessful trials stayed in file drawers."
      ],
      "related": [
        "survivorship-bias",
        "selection-bias",
        "confirmation-bias",
        "availability-heuristic"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:evidence-synthesis",
        "topic:meta-analysis"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Publication bias”; Rothstein, Sutton & Borenstein (2005), Publication Bias in Meta-Analysis.",
        "ai_relevance": "AI literature reviews can amplify publication bias if they summarize only visible indexed papers.",
        "original_categories": [
          "cognitive",
          "research-methods",
          "evidence-synthesis",
          "meta-analysis"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "recall-bias",
      "name": "Recall bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Systematic error caused by differences in how accurately or completely groups remember past exposures, behaviors, or events.",
      "definition": "Systematic error caused by differences in how accurately or completely groups remember past exposures, behaviors, or events.",
      "contexts": [
        "research-methods",
        "memory",
        "epidemiology"
      ],
      "mitigations": [
        "Prefer records, biomarkers, prospective diaries, and contemporaneous logs over retrospective self-report when possible."
      ],
      "examples": [
        "Parents of children with a diagnosis may search memory more intensely for possible prenatal exposures than parents in a comparison group."
      ],
      "related": [
        "availability-heuristic",
        "false-memory-bias",
        "recency-bias",
        "selection-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:memory",
        "topic:epidemiology"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Recall bias”; Sackett (1979), “Bias in Analytic Research.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "memory",
          "epidemiology"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "response-bias",
      "name": "Response bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A family of systematic answer patterns caused by the measurement situation rather than the respondent’s true belief or behavior.",
      "definition": "A family of systematic answer patterns caused by the measurement situation rather than the respondent’s true belief or behavior.",
      "contexts": [
        "research-methods",
        "surveys",
        "measurement"
      ],
      "mitigations": [
        "Use balanced wording, validated instruments, anonymity, cognitive interviewing, and checks for acquiescence or extreme responding."
      ],
      "examples": [
        "A participant agrees with most survey statements because the survey wording makes agreement feel polite or expected."
      ],
      "related": [
        "framing-effect",
        "anchoring-bias",
        "selective-perception-bias",
        "authority-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:surveys",
        "topic:measurement"
      ],
      "meta": {
        "source": "Tourangeau, Rips & Rasinski (2000), The Psychology of Survey Response; Catalogue of Bias response-bias entries.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "surveys",
          "measurement"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "nonresponse-bias",
      "name": "Nonresponse bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias that occurs when people who do not respond to a survey or study differ meaningfully from those who do respond.",
      "definition": "Bias that occurs when people who do not respond to a survey or study differ meaningfully from those who do respond.",
      "contexts": [
        "research-methods",
        "sampling",
        "surveys"
      ],
      "mitigations": [
        "Compare respondents with the sampling frame, follow up with nonrespondents, weight cautiously, and report response rates transparently."
      ],
      "examples": [
        "A workplace satisfaction survey looks positive because burned-out employees ignore the survey or have already left."
      ],
      "related": [
        "selection-bias",
        "survivorship-bias",
        "sampling-bias-llm",
        "socioeconomic-bias-llm"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:sampling",
        "topic:surveys"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Non-response bias”; Groves (2006), “Nonresponse Rates and Nonresponse Bias in Household Surveys.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "sampling",
          "surveys"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "observer-expectancy-effect",
      "name": "Observer-expectancy effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A research artifact in which an observer’s expectations influence what they notice, record, communicate, or elicit from participants.",
      "definition": "A research artifact in which an observer’s expectations influence what they notice, record, communicate, or elicit from participants.",
      "contexts": [
        "research-methods",
        "experimenter-effects",
        "measurement"
      ],
      "mitigations": [
        "Blind coders where possible; preregister hypotheses; audit inter-rater reliability and prompt wording."
      ],
      "examples": [
        "A moderator who expects a prototype to fail gives subtle cues that make participants more hesitant and critical."
      ],
      "related": [
        "pygmalion-effect",
        "confirmation-bias",
        "selective-perception-bias",
        "halo-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:experimenter-effects",
        "topic:measurement"
      ],
      "meta": {
        "source": "Rosenthal (1966), Experimenter Effects in Behavioral Research; Rosenthal & Jacobson (1968), Pygmalion in the Classroom.",
        "ai_relevance": "Researchers using AI-coded qualitative data may steer prompts, labels, or validation examples toward expected themes.",
        "original_categories": [
          "cognitive",
          "research-methods",
          "experimenter-effects",
          "measurement"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "measurement-bias",
      "name": "Measurement bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Systematic distortion introduced by an instrument, proxy, procedure, or data-collection method that measures different groups or conditions unequally.",
      "definition": "Systematic distortion introduced by an instrument, proxy, procedure, or data-collection method that measures different groups or conditions unequally.",
      "contexts": [
        "research-methods",
        "measurement",
        "validity"
      ],
      "mitigations": [
        "Validate instruments across subgroups; examine construct validity; avoid treating proxies as ground truth."
      ],
      "examples": [
        "A fitness tracker undercounts steps for people using wheelchairs, leading a study to underestimate their activity."
      ],
      "related": [
        "information-bias",
        "selection-bias",
        "algorithmic-bias",
        "sampling-bias-llm"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:measurement",
        "topic:validity"
      ],
      "meta": {
        "source": "Catalogue of Bias glossary, “Measurement bias”; Suresh & Guttag (2021), ML lifecycle bias framework.",
        "ai_relevance": "In AI systems, labels or features can measure institutional behavior rather than the construct designers intend.",
        "original_categories": [
          "cognitive",
          "research-methods",
          "measurement",
          "validity"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "omitted-variable-bias",
      "name": "Omitted-variable bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A modeling bias that occurs when a relevant causal variable is left out, distorting the estimated relationship between included variables.",
      "definition": "A modeling bias that occurs when a relevant causal variable is left out, distorting the estimated relationship between included variables.",
      "contexts": [
        "research-methods",
        "causal-inference",
        "statistics"
      ],
      "mitigations": [
        "Use causal diagrams, sensitivity analysis, domain expertise, and designs that reduce confounding."
      ],
      "examples": [
        "A model concludes tutoring causes higher grades but omits family income, prior achievement, and school resources."
      ],
      "related": [
        "base-rate-neglect",
        "selection-bias",
        "illusory-correlation",
        "confirmation-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:causal-inference",
        "topic:statistics"
      ],
      "meta": {
        "source": "Wooldridge (2010), Econometric Analysis of Cross Section and Panel Data; Pearl (2009), Causality.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "causal-inference",
          "statistics"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "detection-bias",
      "name": "Detection bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias caused by systematic differences in how outcomes are searched for, diagnosed, or recorded across groups.",
      "definition": "Bias caused by systematic differences in how outcomes are searched for, diagnosed, or recorded across groups.",
      "contexts": [
        "research-methods",
        "diagnosis",
        "surveillance"
      ],
      "mitigations": [
        "Standardize outcome assessment and consider whether one group is simply being watched more closely."
      ],
      "examples": [
        "A condition appears more common in wealthy neighborhoods because residents have better access to screening."
      ],
      "related": [
        "selection-bias",
        "availability-heuristic",
        "base-rate-neglect",
        "salience-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:diagnosis",
        "topic:surveillance"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Detection bias”; Cochrane Handbook risk-of-bias guidance.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "diagnosis",
          "surveillance"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "attrition-bias",
      "name": "Attrition bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias caused when participants who drop out of a study differ systematically from those who remain.",
      "definition": "Bias caused when participants who drop out of a study differ systematically from those who remain.",
      "contexts": [
        "research-methods",
        "longitudinal-research",
        "selection"
      ],
      "mitigations": [
        "Report loss to follow-up, compare dropouts with completers, and use appropriate missing-data methods."
      ],
      "examples": [
        "A long-term app study reports high satisfaction because frustrated users stopped responding after week two."
      ],
      "related": [
        "survivorship-bias",
        "selection-bias",
        "status-quo-bias",
        "optimism-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:longitudinal-research",
        "topic:selection"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Attrition bias”; Nunan, Aronson & Bankhead (2018), BMJ Evidence-Based Medicine.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "longitudinal-research",
          "selection"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "lead-time-bias",
      "name": "Lead-time bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A screening evaluation bias in which earlier diagnosis makes survival time appear longer even if the actual time of death is unchanged.",
      "definition": "A screening evaluation bias in which earlier diagnosis makes survival time appear longer even if the actual time of death is unchanged.",
      "contexts": [
        "research-methods",
        "screening",
        "medicine"
      ],
      "mitigations": [
        "Use mortality, quality-adjusted survival, and randomized screening trials rather than diagnosis-to-death intervals alone."
      ],
      "examples": [
        "A cancer screening program seems to improve five-year survival because it detects disease earlier, not because patients live longer."
      ],
      "related": [
        "outcome-bias",
        "base-rate-neglect",
        "selection-bias",
        "survivorship-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:screening",
        "topic:medicine"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Lead time bias”; Welch, Schwartz & Woloshin (2011), Overdiagnosed.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "screening",
          "medicine"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "length-time-bias",
      "name": "Length-time bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A screening bias in which slower-progressing cases are more likely to be detected, making screened cases appear to have better outcomes.",
      "definition": "A screening bias in which slower-progressing cases are more likely to be detected, making screened cases appear to have better outcomes.",
      "contexts": [
        "research-methods",
        "screening",
        "medicine"
      ],
      "mitigations": [
        "Distinguish aggressive from indolent cases and evaluate mortality impact, not only survival after detection."
      ],
      "examples": [
        "A screening test looks beneficial because it disproportionately finds slow-growing tumors that would have had better prognoses anyway."
      ],
      "related": [
        "selection-bias",
        "survivorship-bias",
        "base-rate-neglect",
        "outcome-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:screening",
        "topic:medicine"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Length time bias”; Morrison (1992), Screening in Chronic Disease.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "screening",
          "medicine"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "outcome-reporting-bias",
      "name": "Outcome reporting bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias caused when studies selectively report outcomes, time points, or analyses that look favorable while omitting less favorable ones.",
      "definition": "Bias caused when studies selectively report outcomes, time points, or analyses that look favorable while omitting less favorable ones.",
      "contexts": [
        "research-methods",
        "reporting",
        "evidence-synthesis"
      ],
      "mitigations": [
        "Compare publications against preregistered protocols, trial registries, and statistical-analysis plans."
      ],
      "examples": [
        "A trial protocol lists five outcomes, but the paper highlights only the one that reached statistical significance."
      ],
      "related": [
        "confirmation-bias",
        "selection-bias",
        "survivorship-bias",
        "outcome-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:reporting",
        "topic:evidence-synthesis"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Outcome reporting bias”; Cochrane Handbook; Dwan et al. (2008), PLOS ONE.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "reporting",
          "evidence-synthesis"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "citation-bias",
      "name": "Citation bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A distortion in the perceived evidence base caused when certain studies are cited more often because of positive results, prestige, language, ideology, or convenience rather than evidential quality.",
      "definition": "A distortion in the perceived evidence base caused when certain studies are cited more often because of positive results, prestige, language, ideology, or convenience rather than evidential quality.",
      "contexts": [
        "research-methods",
        "evidence-synthesis",
        "academia"
      ],
      "mitigations": [
        "Trace citation chains backward to primary evidence and assess study quality, not citation count."
      ],
      "examples": [
        "A flawed but famous paper becomes the default citation while stronger contradictory studies remain obscure."
      ],
      "related": [
        "availability-heuristic",
        "authority-bias",
        "halo-effect",
        "confirmation-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:evidence-synthesis",
        "topic:academia"
      ],
      "meta": {
        "source": "Greenberg (2009), “How Citation Distortions Create Unfounded Authority,” BMJ; Catalogue of Bias citation-related entries.",
        "ai_relevance": "Search engines and LLMs may over-surface highly cited work, compounding citation cascades.",
        "original_categories": [
          "cognitive",
          "research-methods",
          "evidence-synthesis",
          "academia"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "data-dredging-bias",
      "name": "Data-dredging bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A bias introduced by repeatedly searching many analyses, variables, or subgroups until something appears statistically significant.",
      "definition": "A bias introduced by repeatedly searching many analyses, variables, or subgroups until something appears statistically significant.",
      "contexts": [
        "research-methods",
        "statistics",
        "p-hacking"
      ],
      "mitigations": [
        "Preregister analyses, correct for multiple comparisons, separate exploratory from confirmatory findings, and replicate."
      ],
      "examples": [
        "A team tests dozens of demographic slices and publishes the one surprising association as if it were planned."
      ],
      "related": [
        "confirmation-bias",
        "clustering-illusion",
        "apophenia-bias",
        "law-of-small-numbers"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:statistics",
        "topic:p-hacking"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Data-dredging bias”; Simmons, Nelson & Simonsohn (2011), “False-Positive Psychology.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "statistics",
          "p-hacking"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "spin-bias",
      "name": "Spin bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A reporting distortion in which authors frame weak, null, or mixed findings as more positive or definitive than the data justify.",
      "definition": "A reporting distortion in which authors frame weak, null, or mixed findings as more positive or definitive than the data justify.",
      "contexts": [
        "research-methods",
        "communication",
        "evidence"
      ],
      "mitigations": [
        "Read methods and results before abstracts and press releases; compare claims with prespecified endpoints."
      ],
      "examples": [
        "A paper with nonsignificant primary outcomes claims the intervention is 'promising' based on a small secondary analysis."
      ],
      "related": [
        "framing-effect",
        "confirmation-bias",
        "optimism-bias",
        "authority-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:communication",
        "topic:evidence"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Spin bias”; Boutron et al. (2010), Annals of Internal Medicine.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "communication",
          "evidence"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "sponsorship-bias",
      "name": "Sponsorship bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias introduced when funding, institutional interests, or sponsor involvement systematically favors certain designs, interpretations, or conclusions.",
      "definition": "Bias introduced when funding, institutional interests, or sponsor involvement systematically favors certain designs, interpretations, or conclusions.",
      "contexts": [
        "research-methods",
        "conflicts-of-interest",
        "evidence"
      ],
      "mitigations": [
        "Check funding and author conflicts; compare independent replications; scrutinize comparators and endpoints."
      ],
      "examples": [
        "A drug-company-funded study chooses a weak comparator and concludes its product is superior."
      ],
      "related": [
        "authority-bias",
        "confirmation-bias",
        "selection-bias",
        "halo-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:conflicts-of-interest",
        "topic:evidence"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Industry Sponsorship bias”; Bekelman, Li & Gross (2003), JAMA.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "conflicts-of-interest",
          "evidence"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "confounding-bias",
      "name": "Confounding bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A causal-inference distortion in which a third factor related to both exposure and outcome makes an association look causal or hides a real causal effect.",
      "definition": "A causal-inference distortion in which a third factor related to both exposure and outcome makes an association look causal or hides a real causal effect.",
      "contexts": [
        "research-methods",
        "causal-inference",
        "statistics"
      ],
      "mitigations": [
        "Use causal diagrams, stratification, randomization, matching, instrumental variables, or sensitivity analysis as appropriate."
      ],
      "examples": [
        "Ice cream sales and drowning deaths rise together, but hot weather is the confounding factor."
      ],
      "related": [
        "illusory-correlation",
        "base-rate-neglect",
        "selection-bias",
        "representativeness-heuristic"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:causal-inference",
        "topic:statistics"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Confounding”; Pearl (2009), Causality; Rothman, Greenland & Lash (2008), Modern Epidemiology.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "causal-inference",
          "statistics"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "collider-bias",
      "name": "Collider bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A bias created by conditioning on a common effect of two variables, which can produce a false association between otherwise unrelated causes.",
      "definition": "A bias created by conditioning on a common effect of two variables, which can produce a false association between otherwise unrelated causes.",
      "contexts": [
        "research-methods",
        "causal-inference",
        "statistics"
      ],
      "mitigations": [
        "Use directed acyclic graphs and avoid adjusting for variables that are downstream common effects."
      ],
      "examples": [
        "Studying only hospitalized patients can make two independent risk factors appear negatively related because both affect hospital admission."
      ],
      "related": [
        "selection-bias",
        "illusory-correlation",
        "base-rate-neglect",
        "confirmation-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:causal-inference",
        "topic:statistics"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Collider bias”; Greenland (2003), “Quantifying Biases in Causal Models.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "causal-inference",
          "statistics"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "misclassification-bias",
      "name": "Misclassification bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias caused when people, exposures, outcomes, or cases are assigned to the wrong category in a systematic way.",
      "definition": "Bias caused when people, exposures, outcomes, or cases are assigned to the wrong category in a systematic way.",
      "contexts": [
        "research-methods",
        "measurement",
        "classification"
      ],
      "mitigations": [
        "Audit labels by subgroup, assess false positives and false negatives separately, and document ambiguous cases."
      ],
      "examples": [
        "A moderation dataset labels satire as hate speech more often for one dialect than another."
      ],
      "related": [
        "information-bias",
        "algorithmic-bias",
        "selection-bias",
        "framing-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:measurement",
        "topic:classification"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Misclassification bias”; Rothman, Greenland & Lash (2008), Modern Epidemiology.",
        "ai_relevance": "Misclassification in training labels can directly become model behavior.",
        "original_categories": [
          "cognitive",
          "research-methods",
          "measurement",
          "classification"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "spectrum-bias",
      "name": "Spectrum bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias that occurs when a diagnostic test or model is evaluated on cases that do not represent the full spectrum of real-world severity, comorbidity, or presentation.",
      "definition": "Bias that occurs when a diagnostic test or model is evaluated on cases that do not represent the full spectrum of real-world severity, comorbidity, or presentation.",
      "contexts": [
        "research-methods",
        "diagnosis",
        "generalization"
      ],
      "mitigations": [
        "Validate on broad, representative, externally sampled populations."
      ],
      "examples": [
        "A diagnostic model performs well on textbook cases but fails on early, mild, atypical, or overlapping presentations."
      ],
      "related": [
        "selection-bias",
        "representativeness-heuristic",
        "base-rate-neglect",
        "algorithmic-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:diagnosis",
        "topic:generalization"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Spectrum bias”; Ransohoff & Feinstein (1978), New England Journal of Medicine.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "diagnosis",
          "generalization"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "verification-bias",
      "name": "Verification bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A diagnostic-evaluation bias that occurs when only some participants receive the definitive reference test, often depending on the initial test result.",
      "definition": "A diagnostic-evaluation bias that occurs when only some participants receive the definitive reference test, often depending on the initial test result.",
      "contexts": [
        "research-methods",
        "diagnosis",
        "validation"
      ],
      "mitigations": [
        "Ensure reference-standard assessment is independent of the index test or adjust for partial verification."
      ],
      "examples": [
        "Only patients with positive AI triage results receive confirmatory testing, inflating the apparent accuracy of the triage model."
      ],
      "related": [
        "selection-bias",
        "base-rate-neglect",
        "outcome-bias",
        "algorithmic-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:diagnosis",
        "topic:validation"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Verification bias”; Begg & Greenes (1983), Biometrics.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "diagnosis",
          "validation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "hawthorne-effect",
      "name": "Hawthorne effect",
      "kind": "bias",
      "category": "social",
      "summary": "A research-participation effect in which people change behavior because they know they are being observed or studied.",
      "definition": "A research-participation effect in which people change behavior because they know they are being observed or studied.",
      "contexts": [
        "research-methods",
        "observation",
        "behavior-change"
      ],
      "mitigations": [
        "Use unobtrusive measures, longer observation windows, realistic contexts, and triangulation with behavioral logs."
      ],
      "examples": [
        "Participants complete tasks more carefully during a usability test than they would during normal work."
      ],
      "related": [
        "spotlight-effect",
        "salience-bias",
        "authority-bias",
        "outcome-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:observation",
        "topic:behavior-change"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Hawthorne effect”; McCambridge, Witton & Elbourne (2014), systematic review.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "research-methods",
          "observation",
          "behavior-change"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "demand-characteristics",
      "name": "Demand characteristics",
      "kind": "bias",
      "category": "social",
      "summary": "Cues in a study that lead participants to infer what the researcher expects and adjust their behavior accordingly.",
      "definition": "Cues in a study that lead participants to infer what the researcher expects and adjust their behavior accordingly.",
      "contexts": [
        "research-methods",
        "experimenter-effects",
        "surveys"
      ],
      "mitigations": [
        "Use neutral scripts, deception only when ethically justified, manipulation checks, and post-study probes."
      ],
      "examples": [
        "A participant praises a prototype because the researcher’s enthusiasm signals that positive feedback is desired."
      ],
      "related": [
        "framing-effect",
        "authority-bias",
        "confirmation-bias",
        "selective-perception-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:experimenter-effects",
        "topic:surveys"
      ],
      "meta": {
        "source": "Orne (1962), “On the Social Psychology of the Psychological Experiment,” American Psychologist.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "research-methods",
          "experimenter-effects",
          "surveys"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "ascertainment-bias",
      "name": "Ascertainment bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Bias caused when the process used to find or include cases makes some members of the target population more likely to appear in the data.",
      "definition": "Bias caused when the process used to find or include cases makes some members of the target population more likely to appear in the data.",
      "contexts": [
        "research-methods",
        "sampling",
        "case-detection"
      ],
      "mitigations": [
        "Map the path from target population to dataset and identify who is structurally less likely to be observed."
      ],
      "examples": [
        "A study of harassment cases based only on formal complaints misses workers who fear retaliation and never report."
      ],
      "related": [
        "selection-bias",
        "survivorship-bias",
        "sampling-bias-llm",
        "socioeconomic-bias-llm"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:sampling",
        "topic:case-detection"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Ascertainment bias.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "sampling",
          "case-detection"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "healthy-user-bias",
      "name": "Healthy user bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A bias in which people who adopt a preventive behavior or treatment differ in underlying health, resources, or habits from those who do not.",
      "definition": "A bias in which people who adopt a preventive behavior or treatment differ in underlying health, resources, or habits from those who do not.",
      "contexts": [
        "research-methods",
        "epidemiology",
        "confounding"
      ],
      "mitigations": [
        "Control for baseline health behaviors and healthcare access; prefer randomized evidence when feasible."
      ],
      "examples": [
        "People who take vitamins may also exercise more and have better healthcare access, making vitamins look more protective than they are."
      ],
      "related": [
        "selection-bias",
        "survivorship-bias",
        "self-serving-bias",
        "optimism-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:epidemiology",
        "topic:confounding"
      ],
      "meta": {
        "source": "Shrank, Patrick & Brook (2011), “Healthy User and Related Biases in Observational Studies”; epidemiology methods literature.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "epidemiology",
          "confounding"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "immortal-time-bias",
      "name": "Immortal time bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A time-related bias in which a period during which the outcome could not occur is incorrectly counted, making an exposure appear protective.",
      "definition": "A time-related bias in which a period during which the outcome could not occur is incorrectly counted, making an exposure appear protective.",
      "contexts": [
        "research-methods",
        "survival-analysis",
        "epidemiology"
      ],
      "mitigations": [
        "Align time zero correctly and model exposure as time-varying when needed."
      ],
      "examples": [
        "Patients must survive long enough to receive a treatment, but that guaranteed survival time is misattributed to the treatment’s benefit."
      ],
      "related": [
        "survivorship-bias",
        "selection-bias",
        "outcome-bias",
        "recency-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:survival-analysis",
        "topic:epidemiology"
      ],
      "meta": {
        "source": "Catalogue of Bias, “Immortal time bias”; Suissa (2008), Pharmacoepidemiology and Drug Safety.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "survival-analysis",
          "epidemiology"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "regression-to-the-mean-bias",
      "name": "Regression-to-the-mean bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The mistaken attribution of natural return from extreme measurements toward average levels to an intervention or cause.",
      "definition": "The mistaken attribution of natural return from extreme measurements toward average levels to an intervention or cause.",
      "contexts": [
        "research-methods",
        "statistics",
        "causal-inference"
      ],
      "mitigations": [
        "Use control groups, repeated baseline measurements, and avoid selecting only extreme cases for before/after claims."
      ],
      "examples": [
        "A manager praises a new coaching method because the worst-performing team improved, ignoring that extreme scores often rebound naturally."
      ],
      "related": [
        "base-rate-neglect",
        "outcome-bias",
        "law-of-small-numbers",
        "illusory-correlation"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:statistics",
        "topic:causal-inference"
      ],
      "meta": {
        "source": "Galton (1886), regression toward mediocrity; Campbell & Kenny (1999), A Primer on Regression Artifacts.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "research-methods",
          "statistics",
          "causal-inference"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "automation-bias",
      "name": "Automation bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to over-rely on automated recommendations and ignore contradictory evidence, especially when a system appears competent or authoritative.",
      "definition": "The tendency to over-rely on automated recommendations and ignore contradictory evidence, especially when a system appears competent or authoritative.",
      "contexts": [
        "human-ai",
        "automation",
        "decision-support"
      ],
      "mitigations": [
        "Show uncertainty, require independent human checks for high-stakes decisions, and train users to compare AI outputs with raw evidence."
      ],
      "examples": [
        "A clinician accepts an AI triage recommendation despite patient symptoms that point to a different diagnosis."
      ],
      "related": [
        "algorithm-aversion",
        "authority-bias",
        "anchoring-bias",
        "overconfidence-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:automation",
        "topic:decision-support"
      ],
      "meta": {
        "source": "Parasuraman & Manzey (2010), “Complacency and Bias in Human Use of Automation”; CSET (2021), “AI Safety and Automation Bias.”",
        "ai_relevance": "This is the central counterpart to algorithm aversion and should be first-class for AI evaluation and critical thinking.",
        "original_categories": [
          "cognitive",
          "human-ai",
          "automation",
          "decision-support"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "automation-complacency",
      "name": "Automation complacency",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A monitoring failure in which users pay less attention because they assume an automated system is functioning correctly.",
      "definition": "A monitoring failure in which users pay less attention because they assume an automated system is functioning correctly.",
      "contexts": [
        "human-ai",
        "automation",
        "vigilance"
      ],
      "mitigations": [
        "Design for calibrated trust, periodic active checks, meaningful alerts, and human skill retention."
      ],
      "examples": [
        "A driver using lane-assist stops scanning the road and reacts too late when the system fails to detect construction markings."
      ],
      "related": [
        "algorithm-aversion",
        "status-quo-bias",
        "overconfidence-effect",
        "omission-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:automation",
        "topic:vigilance"
      ],
      "meta": {
        "source": "Parasuraman & Manzey (2010), “Complacency and Bias in Human Use of Automation”; Bainbridge (1983), “Ironies of Automation.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "human-ai",
          "automation",
          "vigilance"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "algorithm-appreciation",
      "name": "Algorithm appreciation",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to prefer or adhere more strongly to advice believed to come from an algorithm than to similar advice believed to come from a human.",
      "definition": "The tendency to prefer or adhere more strongly to advice believed to come from an algorithm than to similar advice believed to come from a human.",
      "contexts": [
        "human-ai",
        "advice-taking",
        "automation"
      ],
      "mitigations": [
        "Compare algorithmic and human advice against validation data rather than source identity."
      ],
      "examples": [
        "A hiring manager gives more weight to a résumé ranking after learning it came from a model rather than a colleague."
      ],
      "related": [
        "algorithm-aversion",
        "authority-bias",
        "halo-effect",
        "overconfidence-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:advice-taking",
        "topic:automation"
      ],
      "meta": {
        "source": "Logg, Minson & Moore (2019), “Algorithm Appreciation: People Prefer Algorithmic to Human Judgment,” Organizational Behavior and Human Decision Processes.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "human-ai",
          "advice-taking",
          "automation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "machine-heuristic",
      "name": "Machine heuristic",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A rule of thumb in which people assume machine agents are more objective, secure, precise, or trustworthy than human agents.",
      "definition": "A rule of thumb in which people assume machine agents are more objective, secure, precise, or trustworthy than human agents.",
      "contexts": [
        "human-ai",
        "trust",
        "human-computer-interaction"
      ],
      "mitigations": [
        "Ask what evidence supports the machine’s reliability in this context; distinguish objectivity claims from validated performance."
      ],
      "examples": [
        "A user shares sensitive financial information with an automated chatbot because it feels less judgmental and more secure than a person."
      ],
      "related": [
        "authority-bias",
        "halo-effect",
        "technocentric-perspectives-llm",
        "algorithmic-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:trust",
        "topic:human-computer-interaction"
      ],
      "meta": {
        "source": "Sundar & Kim (2019), “Machine Heuristic: When We Trust Computers More Than Humans With Our Personal Information,” CHI.",
        "ai_relevance": "This covers much of the practical 'AI authority bias' gap without merely renaming existing authority bias.",
        "original_categories": [
          "cognitive",
          "human-ai",
          "trust",
          "human-computer-interaction"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "ai-authority-bias",
      "name": "AI authority bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "An applied form of authority bias in which AI output is treated as expert, neutral, or institutionally sanctioned simply because it comes from an AI system.",
      "definition": "An applied form of authority bias in which AI output is treated as expert, neutral, or institutionally sanctioned simply because it comes from an AI system.",
      "contexts": [
        "human-ai",
        "authority",
        "decision-support"
      ],
      "mitigations": [
        "Require provenance, confidence calibration, and independent source verification before treating AI output as authoritative."
      ],
      "examples": [
        "A student accepts a fabricated citation because the chatbot presents it in a polished academic tone."
      ],
      "related": [
        "authority-bias",
        "algorithm-aversion",
        "overconfidence-effect",
        "halo-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:authority",
        "topic:decision-support"
      ],
      "meta": {
        "source": "Source label is not standardized: [unknown]. Grounded in authority-bias literature and automation-bias research (Parasuraman & Manzey, 2010).",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "human-ai",
          "authority",
          "decision-support"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "model-output-anchoring",
      "name": "Model-output anchoring",
      "kind": "bias",
      "category": "cognitive",
      "summary": "An applied anchoring pattern in which the first AI answer, draft, ranking, or estimate becomes the starting point that subsequent human judgment insufficiently adjusts from.",
      "definition": "An applied anchoring pattern in which the first AI answer, draft, ranking, or estimate becomes the starting point that subsequent human judgment insufficiently adjusts from.",
      "contexts": [
        "human-ai",
        "anchoring",
        "decision-support"
      ],
      "mitigations": [
        "Generate independent human estimates before model output; compare multiple model runs; ask for disconfirming categories."
      ],
      "examples": [
        "A researcher asks for article themes, receives five AI-generated categories, and then codes the data around those categories even when better themes emerge."
      ],
      "related": [
        "anchoring-bias",
        "authority-bias",
        "confirmation-bias",
        "algorithm-aversion"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:anchoring",
        "topic:decision-support"
      ],
      "meta": {
        "source": "Source label is not standardized: [unknown]. Grounded in Tversky & Kahneman’s anchoring-and-adjustment work and automation-bias literature.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "human-ai",
          "anchoring",
          "decision-support"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "anthropomorphic-trust",
      "name": "Anthropomorphic trust",
      "kind": "bias",
      "category": "cognitive",
      "summary": "Over-trusting a system because human-like language, voice, emotion, or social cues make it feel more understanding, intentional, or accountable than it is.",
      "definition": "Over-trusting a system because human-like language, voice, emotion, or social cues make it feel more understanding, intentional, or accountable than it is.",
      "contexts": [
        "human-ai",
        "anthropomorphism",
        "trust"
      ],
      "mitigations": [
        "Separate social comfort from competence; disclose system limits and test claims against evidence."
      ],
      "examples": [
        "A user assumes a therapy chatbot 'really understands me' because it uses warm reflections and remembers details."
      ],
      "related": [
        "anthropomorphism-bias",
        "halo-effect",
        "authority-bias",
        "mere-exposure-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:anthropomorphism",
        "topic:trust"
      ],
      "meta": {
        "source": "Source label is not standardized: [unknown]. Grounded in Reeves & Nass (1996), The Media Equation, and Nass & Moon (2000), “Machines and Mindlessness.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "human-ai",
          "anthropomorphism",
          "trust"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "hallucination-confidence-bias",
      "name": "Hallucination confidence bias",
      "kind": "bias",
      "category": "ai",
      "summary": "A human-AI evaluation bias in which confident, fluent model output is treated as more accurate than it is, especially when false claims are delivered without uncertainty markers.",
      "definition": "A human-AI evaluation bias in which confident, fluent model output is treated as more accurate than it is, especially when false claims are delivered without uncertainty markers.",
      "contexts": [
        "human-ai",
        "llm",
        "epistemic-calibration"
      ],
      "mitigations": [
        "Treat confidence style as presentation, not evidence; verify high-impact factual claims from primary sources."
      ],
      "examples": [
        "An LLM invents a legal precedent in a confident tone, and the user assumes confidence means retrieval from a real case."
      ],
      "related": [
        "overconfidence-effect",
        "authority-bias",
        "illusory-truth-effect",
        "algorithmic-bias"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:llm",
        "topic:epistemic-calibration"
      ],
      "meta": {
        "source": "Source label is not standardized: [unknown]. Grounded in LLM hallucination literature such as Ji et al. (2023), “Survey of Hallucination in Natural Language Generation.”",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "human-ai",
          "llm",
          "epistemic-calibration"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "selective-algorithmic-adherence",
      "name": "Selective algorithmic adherence",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A pattern in which users accept algorithmic recommendations more readily when those recommendations align with prior stereotypes, preferences, or expectations.",
      "definition": "A pattern in which users accept algorithmic recommendations more readily when those recommendations align with prior stereotypes, preferences, or expectations.",
      "contexts": [
        "human-ai",
        "stereotypes",
        "decision-support"
      ],
      "mitigations": [
        "Audit acceptance/rejection patterns, not just model accuracy; require reasons when users override or accept AI advice."
      ],
      "examples": [
        "A caseworker follows an algorithmic risk score when it confirms their suspicion about a client but discounts it when it challenges that suspicion."
      ],
      "related": [
        "confirmation-bias",
        "selective-perception-bias",
        "algorithm-aversion",
        "ingroup-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:stereotypes",
        "topic:decision-support"
      ],
      "meta": {
        "source": "Alon-Barkat & Busuioc (2023), “Human–AI Interactions in Public Sector Decision Making,” Journal of Public Administration Research and Theory.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "human-ai",
          "stereotypes",
          "decision-support"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "ai-fluency-bias",
      "name": "AI fluency bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to judge AI outputs as more correct, thoughtful, or complete because they are fluent, polished, or well-formatted.",
      "definition": "The tendency to judge AI outputs as more correct, thoughtful, or complete because they are fluent, polished, or well-formatted.",
      "contexts": [
        "human-ai",
        "processing-fluency",
        "communication"
      ],
      "mitigations": [
        "Score outputs against explicit criteria for accuracy, completeness, and evidence rather than polish."
      ],
      "examples": [
        "A verbose answer with confident headings is rated higher than a terse answer that is actually more accurate."
      ],
      "related": [
        "halo-effect",
        "illusory-truth-effect",
        "authority-bias",
        "information-overload-llm"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:human-ai",
        "topic:processing-fluency",
        "topic:communication"
      ],
      "meta": {
        "source": "Source label is not standardized: [unknown]. Grounded in processing-fluency research such as Reber & Schwarz (1999) and LLM evaluation work on verbosity/length bias.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "human-ai",
          "processing-fluency",
          "communication"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "conformity-bias",
      "name": "Conformity bias",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to align beliefs, judgments, or behavior with group norms or pressure even when private evidence points elsewhere.",
      "definition": "The tendency to align beliefs, judgments, or behavior with group norms or pressure even when private evidence points elsewhere.",
      "contexts": [
        "group-influence",
        "norms",
        "decision-making"
      ],
      "mitigations": [
        "Invite independent written judgments before group discussion and assign a rotating dissent role."
      ],
      "examples": [
        "A team member suppresses concerns about a design because everyone else in the meeting seems enthusiastic."
      ],
      "related": [
        "bandwagon-effect",
        "groupthink",
        "authority-bias",
        "false-consensus-effect"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:group-influence",
        "topic:norms",
        "topic:decision-making"
      ],
      "meta": {
        "source": "Asch (1951), conformity experiments; Cialdini & Goldstein (2004), “Social Influence.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "group-influence",
          "norms",
          "decision-making"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "group-polarization",
      "name": "Group polarization",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency for group discussion to move members toward a more extreme version of their initial position.",
      "definition": "The tendency for group discussion to move members toward a more extreme version of their initial position.",
      "contexts": [
        "group-dynamics",
        "deliberation",
        "extremity"
      ],
      "mitigations": [
        "Include credible disagreement, mixed-group deliberation, and evidence rules that reward calibration over loyalty."
      ],
      "examples": [
        "A mildly skeptical forum becomes strongly anti-vaccine after members repeatedly share confirming anecdotes."
      ],
      "related": [
        "groupthink",
        "confirmation-bias",
        "availability-cascade",
        "ingroup-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:group-dynamics",
        "topic:deliberation",
        "topic:extremity"
      ],
      "meta": {
        "source": "Moscovici & Zavalloni (1969); Isenberg (1986), “Group Polarization: A Critical Review and Meta-Analysis.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "group-dynamics",
          "deliberation",
          "extremity"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "bystander-effect",
      "name": "Bystander effect",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency for people to be less likely to help in an emergency when others are present, often due to diffusion of responsibility and social uncertainty.",
      "definition": "The tendency for people to be less likely to help in an emergency when others are present, often due to diffusion of responsibility and social uncertainty.",
      "contexts": [
        "group-dynamics",
        "responsibility",
        "prosocial-behavior"
      ],
      "mitigations": [
        "Assign explicit ownership: 'Kyle, please call support now; Sam, document the incident.'"
      ],
      "examples": [
        "In a busy chat channel, everyone assumes someone else will answer the urgent support request."
      ],
      "related": [
        "omission-bias",
        "groupthink",
        "status-quo-bias",
        "loss-aversion"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:group-dynamics",
        "topic:responsibility",
        "topic:prosocial-behavior"
      ],
      "meta": {
        "source": "Darley & Latané (1968), “Bystander Intervention in Emergencies.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "group-dynamics",
          "responsibility",
          "prosocial-behavior"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "stereotype-threat",
      "name": "Stereotype threat",
      "kind": "bias",
      "category": "social",
      "summary": "A situational pressure in which awareness of a negative stereotype about one’s group can impair performance or participation in stereotype-relevant contexts.",
      "definition": "A situational pressure in which awareness of a negative stereotype about one’s group can impair performance or participation in stereotype-relevant contexts.",
      "contexts": [
        "intergroup",
        "performance",
        "identity"
      ],
      "mitigations": [
        "Avoid stereotype-salient framing, normalize struggle, use identity-safe environments, and evaluate systems for subgroup effects."
      ],
      "examples": [
        "A woman in a math test performs worse after being reminded that the test measures gender-linked ability."
      ],
      "related": [
        "dehumanization-bias",
        "ingroup-bias",
        "out-group-homogeneity-bias",
        "self-serving-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:intergroup",
        "topic:performance",
        "topic:identity"
      ],
      "meta": {
        "source": "Steele & Aronson (1995), “Stereotype Threat and the Intellectual Test Performance of African Americans.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "intergroup",
          "performance",
          "identity"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "implicit-bias",
      "name": "Implicit bias",
      "kind": "bias",
      "category": "social",
      "summary": "Automatic or less consciously accessible associations that can shape perception, judgment, and behavior toward social groups.",
      "definition": "Automatic or less consciously accessible associations that can shape perception, judgment, and behavior toward social groups.",
      "contexts": [
        "intergroup",
        "prejudice",
        "implicit-cognition"
      ],
      "mitigations": [
        "Use structured decisions, blind review where feasible, accountability, and subgroup outcome audits."
      ],
      "examples": [
        "A recruiter who endorses equality still rates identical résumés differently after seeing race- or gender-signaling names."
      ],
      "related": [
        "implicit-bias-llm",
        "ingroup-bias",
        "out-group-homogeneity-bias",
        "halo-effect"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:intergroup",
        "topic:prejudice",
        "topic:implicit-cognition"
      ],
      "meta": {
        "source": "Greenwald & Banaji (1995), “Implicit Social Cognition”; Greenwald, McGhee & Schwartz (1998), Implicit Association Test.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "intergroup",
          "prejudice",
          "implicit-cognition"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "just-world-hypothesis",
      "name": "Just-world hypothesis",
      "kind": "bias",
      "category": "social",
      "summary": "The belief that people generally get what they deserve, which can lead observers to rationalize suffering or blame victims.",
      "definition": "The belief that people generally get what they deserve, which can lead observers to rationalize suffering or blame victims.",
      "contexts": [
        "morality",
        "attribution",
        "inequality"
      ],
      "mitigations": [
        "Ask what structural, random, historical, or situational forces could produce the outcome without desert."
      ],
      "examples": [
        "Someone assumes a person experiencing homelessness must have made irresponsible choices, ignoring housing costs, disability, and labor-market conditions."
      ],
      "related": [
        "fundamental-attribution-error",
        "self-serving-bias",
        "optimism-bias",
        "status-quo-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:morality",
        "topic:attribution",
        "topic:inequality"
      ],
      "meta": {
        "source": "Lerner (1980), The Belief in a Just World; Rubin & Peplau (1975), “Who Believes in a Just World?”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "morality",
          "attribution",
          "inequality"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "system-justification-bias",
      "name": "System justification bias",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to defend, rationalize, or perceive existing social arrangements as fair, natural, or inevitable, even when they disadvantage oneself or others.",
      "definition": "The tendency to defend, rationalize, or perceive existing social arrangements as fair, natural, or inevitable, even when they disadvantage oneself or others.",
      "contexts": [
        "institutions",
        "inequality",
        "ideology"
      ],
      "mitigations": [
        "Separate descriptive claims about how a system works from normative claims about whether it is just."
      ],
      "examples": [
        "A worker argues that low wages must reflect low effort because believing the system is fair feels less threatening."
      ],
      "related": [
        "status-quo-bias",
        "authority-bias",
        "ingroup-bias",
        "self-serving-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:institutions",
        "topic:inequality",
        "topic:ideology"
      ],
      "meta": {
        "source": "Jost & Banaji (1994), “The Role of Stereotyping in System-Justification”; Jost (2019), system justification theory review.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "institutions",
          "inequality",
          "ideology"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "social-desirability-bias",
      "name": "Social desirability bias",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to answer questions in ways that seem socially acceptable, moral, competent, or nonjudgmental rather than fully accurate.",
      "definition": "The tendency to answer questions in ways that seem socially acceptable, moral, competent, or nonjudgmental rather than fully accurate.",
      "contexts": [
        "research-methods",
        "surveys",
        "self-presentation"
      ],
      "mitigations": [
        "Use anonymity, indirect questioning, behavioral measures, and validated social-desirability controls."
      ],
      "examples": [
        "Participants underreport discriminatory attitudes or overreport recycling habits because they want to appear responsible."
      ],
      "related": [
        "spotlight-effect",
        "false-consensus-effect",
        "authority-bias",
        "self-serving-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:surveys",
        "topic:self-presentation"
      ],
      "meta": {
        "source": "Crowne & Marlowe (1960), “A New Scale of Social Desirability Independent of Psychopathology”; Paulhus (2002), socially desirable responding.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "research-methods",
          "surveys",
          "self-presentation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "ultimate-attribution-error",
      "name": "Ultimate attribution error",
      "kind": "bias",
      "category": "social",
      "summary": "A group-level attribution bias in which negative outgroup behavior is explained by character while positive outgroup behavior is dismissed as situational, exceptional, or lucky.",
      "definition": "A group-level attribution bias in which negative outgroup behavior is explained by character while positive outgroup behavior is dismissed as situational, exceptional, or lucky.",
      "contexts": [
        "intergroup",
        "attribution",
        "prejudice"
      ],
      "mitigations": [
        "Force symmetrical explanations: apply the same situational and dispositional standards to ingroup and outgroup cases."
      ],
      "examples": [
        "An ingroup member’s aggression is excused as stress, while an outgroup member’s identical action is treated as proof that 'they are violent.'"
      ],
      "related": [
        "fundamental-attribution-error",
        "ingroup-bias",
        "out-group-homogeneity-bias",
        "self-serving-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:intergroup",
        "topic:attribution",
        "topic:prejudice"
      ],
      "meta": {
        "source": "Pettigrew (1979), “The Ultimate Attribution Error: Extending Allport’s Cognitive Analysis of Prejudice.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "intergroup",
          "attribution",
          "prejudice"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "hostile-attribution-bias",
      "name": "Hostile attribution bias",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to interpret ambiguous actions by others as hostile, threatening, or intentionally harmful.",
      "definition": "The tendency to interpret ambiguous actions by others as hostile, threatening, or intentionally harmful.",
      "contexts": [
        "attribution",
        "conflict",
        "aggression"
      ],
      "mitigations": [
        "Generate at least two benign explanations before acting on perceived intent."
      ],
      "examples": [
        "A driver assumes another car’s accidental lane drift was a deliberate insult and escalates aggressively."
      ],
      "related": [
        "fundamental-attribution-error",
        "negativity-bias",
        "confirmation-bias",
        "out-group-homogeneity-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:attribution",
        "topic:conflict",
        "topic:aggression"
      ],
      "meta": {
        "source": "Dodge (1980), social information-processing research; Crick & Dodge (1994), aggression and hostile attribution models.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "attribution",
          "conflict",
          "aggression"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "zero-sum-bias",
      "name": "Zero-sum bias",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to perceive one person or group’s gain as necessarily another’s loss, even in situations where mutual benefit or growth is possible.",
      "definition": "The tendency to perceive one person or group’s gain as necessarily another’s loss, even in situations where mutual benefit or growth is possible.",
      "contexts": [
        "resource-reasoning",
        "intergroup",
        "economics"
      ],
      "mitigations": [
        "Ask whether the resource is fixed, expandable, renewable, or jointly created; model positive-sum scenarios."
      ],
      "examples": [
        "A community treats immigrant-owned businesses as taking jobs rather than also creating demand, services, and local employment."
      ],
      "related": [
        "loss-aversion",
        "ingroup-bias",
        "out-group-homogeneity-bias",
        "pessimism-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:resource-reasoning",
        "topic:intergroup",
        "topic:economics"
      ],
      "meta": {
        "source": "Meegan (2010), “Zero-Sum Bias”; Różycka-Tran, Boski & Wojciszke (2015), belief in a zero-sum game as social axiom.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "resource-reasoning",
          "intergroup",
          "economics"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "pluralistic-ignorance",
      "name": "Pluralistic ignorance",
      "kind": "bias",
      "category": "social",
      "summary": "A social misperception in which many people privately disagree with a norm but mistakenly believe most others support it.",
      "definition": "A social misperception in which many people privately disagree with a norm but mistakenly believe most others support it.",
      "contexts": [
        "norms",
        "misperception",
        "group-dynamics"
      ],
      "mitigations": [
        "Use anonymous norm surveys and share accurate aggregate norms to correct misperceived consensus."
      ],
      "examples": [
        "Students dislike a heavy-drinking culture but continue participating because they think everyone else enjoys it."
      ],
      "related": [
        "false-consensus-effect",
        "groupthink",
        "spotlight-effect",
        "bandwagon-effect"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:norms",
        "topic:misperception",
        "topic:group-dynamics"
      ],
      "meta": {
        "source": "Prentice & Miller (1993), “Pluralistic Ignorance and Alcohol Use on Campus.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "norms",
          "misperception",
          "group-dynamics"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "psychological-essentialism",
      "name": "Psychological essentialism",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to treat categories, especially social groups, as if they have deep, inherent, fixed essences that explain members’ traits and behavior.",
      "definition": "The tendency to treat categories, especially social groups, as if they have deep, inherent, fixed essences that explain members’ traits and behavior.",
      "contexts": [
        "categorization",
        "stereotyping",
        "culture"
      ],
      "mitigations": [
        "Emphasize within-group variation, context, history, incentives, and change over time."
      ],
      "examples": [
        "Someone assumes a child’s interests are naturally determined by gender rather than shaped by culture, incentives, and exposure."
      ],
      "related": [
        "representativeness-heuristic",
        "out-group-homogeneity-bias",
        "dehumanization-bias",
        "ingroup-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:categorization",
        "topic:stereotyping",
        "topic:culture"
      ],
      "meta": {
        "source": "Gelman (2003), The Essential Child; Prentice & Miller (2007), “Psychological Essentialism of Human Categories.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "categorization",
          "stereotyping",
          "culture"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "identifiable-victim-effect",
      "name": "Identifiable victim effect",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to respond more strongly to one vivid, named, emotionally concrete victim than to larger statistical groups.",
      "definition": "The tendency to respond more strongly to one vivid, named, emotionally concrete victim than to larger statistical groups.",
      "contexts": [
        "moral-judgment",
        "attention",
        "compassion"
      ],
      "mitigations": [
        "Pair human stories with denominators, base rates, and scale-sensitive impact estimates."
      ],
      "examples": [
        "A donor gives more to one named child’s medical fund than to a program that would save many more anonymous children."
      ],
      "related": [
        "salience-bias",
        "availability-heuristic",
        "negativity-bias",
        "neglect-of-probability"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:moral-judgment",
        "topic:attention",
        "topic:compassion"
      ],
      "meta": {
        "source": "Small & Loewenstein (2003), “Helping a Victim or Helping the Victim”; Slovic (2007), psychic numbing.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "moral-judgment",
          "attention",
          "compassion"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "social-loafing",
      "name": "Social loafing",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency for individuals to exert less effort when working in a group than when individually accountable.",
      "definition": "The tendency for individuals to exert less effort when working in a group than when individually accountable.",
      "contexts": [
        "group-dynamics",
        "responsibility",
        "teamwork"
      ],
      "mitigations": [
        "Clarify individual ownership, make contributions visible, and set specific deliverables."
      ],
      "examples": [
        "In a group project, each person assumes someone else will handle the citations and editing."
      ],
      "related": [
        "groupthink",
        "omission-bias",
        "status-quo-bias",
        "egocentric-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:group-dynamics",
        "topic:responsibility",
        "topic:teamwork"
      ],
      "meta": {
        "source": "Latané, Williams & Harkins (1979), “Many Hands Make Light the Work.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "group-dynamics",
          "responsibility",
          "teamwork"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "naive-realism",
      "name": "Naïve realism",
      "kind": "bias",
      "category": "social",
      "summary": "The belief that one sees the world objectively and that people who disagree must be uninformed, irrational, or biased.",
      "definition": "The belief that one sees the world objectively and that people who disagree must be uninformed, irrational, or biased.",
      "contexts": [
        "perception",
        "conflict",
        "polarization"
      ],
      "mitigations": [
        "State what evidence would change your mind and steelman the other side’s interpretation before rebuttal."
      ],
      "examples": [
        "Two stakeholders read the same research findings, each insisting that their interpretation is simply 'what the data say.'"
      ],
      "related": [
        "bias-blind-spot",
        "confirmation-bias",
        "reactive-devaluation",
        "false-consensus-effect"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:perception",
        "topic:conflict",
        "topic:polarization"
      ],
      "meta": {
        "source": "Ross & Ward (1996), “Naive Realism in Everyday Life”; Pronin, Gilovich & Ross (2004).",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "perception",
          "conflict",
          "polarization"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "intergroup-empathy-bias",
      "name": "Intergroup empathy bias",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to feel or express less empathy for outgroup members’ pain or misfortune than for ingroup members’ similar experiences.",
      "definition": "The tendency to feel or express less empathy for outgroup members’ pain or misfortune than for ingroup members’ similar experiences.",
      "contexts": [
        "intergroup",
        "empathy",
        "moral-judgment"
      ],
      "mitigations": [
        "Use perspective-taking carefully, humanize individual cases, and compare moral judgments across matched ingroup/outgroup scenarios."
      ],
      "examples": [
        "A person treats civilian suffering as tragic when caused to their own group but as unfortunate collateral damage when suffered by an outgroup."
      ],
      "related": [
        "ingroup-bias",
        "dehumanization-bias",
        "out-group-homogeneity-bias",
        "negativity-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:intergroup",
        "topic:empathy",
        "topic:moral-judgment"
      ],
      "meta": {
        "source": "Cikara, Bruneau & Saxe (2011), intergroup empathy research; Gutsell & Inzlicht (2012), empathy and prejudice.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "intergroup",
          "empathy",
          "moral-judgment"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "ingroup-projection-bias",
      "name": "Ingroup projection bias",
      "kind": "bias",
      "category": "social",
      "summary": "The tendency to treat one’s own subgroup as more representative of a broader shared category than other subgroups are.",
      "definition": "The tendency to treat one’s own subgroup as more representative of a broader shared category than other subgroups are.",
      "contexts": [
        "intergroup",
        "categorization",
        "norms"
      ],
      "mitigations": [
        "Ask whose version of the superordinate identity is being centered and what alternative prototypes exist."
      ],
      "examples": [
        "One national group treats its customs as the 'real' version of a religion, profession, or political movement and views others as deviations."
      ],
      "related": [
        "ingroup-bias",
        "false-consensus-effect",
        "western-centrism",
        "universalism-norms"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:intergroup",
        "topic:categorization",
        "topic:norms"
      ],
      "meta": {
        "source": "Mummendey & Wenzel (1999), “Social Discrimination and Tolerance in Intergroup Relations.”",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "intergroup",
          "categorization",
          "norms"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "representation-bias",
      "name": "Representation bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias caused when the defined or sampled population in a dataset does not adequately represent the people, contexts, languages, or conditions where the system will be used.",
      "definition": "Bias caused when the defined or sampled population in a dataset does not adequately represent the people, contexts, languages, or conditions where the system will be used.",
      "contexts": [
        "data",
        "dataset-construction",
        "fairness"
      ],
      "mitigations": [
        "Document target populations, sample coverage, subgroup performance, and known exclusions."
      ],
      "examples": [
        "A speech model trained mostly on urban English speakers performs poorly for rural accents and non-dominant languages."
      ],
      "related": [
        "sampling-bias-llm",
        "selection-bias-llm",
        "language-bias-llm",
        "socioeconomic-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:data",
        "topic:dataset-construction",
        "topic:fairness"
      ],
      "meta": {
        "source": "Suresh & Guttag (2021), “A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle.”",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "data",
          "dataset-construction",
          "fairness"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "aggregation-bias",
      "name": "Aggregation bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias introduced when one model, rule, or decision threshold is forced across groups whose relationships, constraints, or needs differ meaningfully.",
      "definition": "Bias introduced when one model, rule, or decision threshold is forced across groups whose relationships, constraints, or needs differ meaningfully.",
      "contexts": [
        "modeling",
        "fairness",
        "population-differences"
      ],
      "mitigations": [
        "Evaluate subgroup calibration and consider group-aware models, thresholds, or local validation when ethically justified."
      ],
      "examples": [
        "A health-risk model uses one threshold for all patients even though symptoms present differently across age, sex, or disability groups."
      ],
      "related": [
        "algorithmic-bias",
        "out-group-homogeneity-bias",
        "base-rate-neglect",
        "selection-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:modeling",
        "topic:fairness",
        "topic:population-differences"
      ],
      "meta": {
        "source": "Suresh & Guttag (2021), ML lifecycle bias framework.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "modeling",
          "fairness",
          "population-differences"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "label-bias",
      "name": "Label bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias introduced when labels encode annotator assumptions, institutional practices, historical inequities, or proxy judgments rather than the intended construct.",
      "definition": "Bias introduced when labels encode annotator assumptions, institutional practices, historical inequities, or proxy judgments rather than the intended construct.",
      "contexts": [
        "data",
        "annotation",
        "supervised-learning"
      ],
      "mitigations": [
        "Audit label provenance, annotator instructions, disagreement, and whether labels measure the desired construct."
      ],
      "examples": [
        "A 'high risk' label in policing data reflects where police patrol most, not where harm actually occurs most."
      ],
      "related": [
        "annotation-bias-llm",
        "algorithmic-bias",
        "implicit-bias-llm",
        "selection-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:data",
        "topic:annotation",
        "topic:supervised-learning"
      ],
      "meta": {
        "source": "Suresh & Guttag (2021), measurement bias; Gebru et al. (2021), Datasheets for Datasets; NIST SP 1270.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "data",
          "annotation",
          "supervised-learning"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "dataset-shift",
      "name": "Dataset shift",
      "kind": "bias",
      "category": "ai",
      "summary": "A model-validity problem in which training and deployment data distributions differ, reducing reliability outside the original data conditions.",
      "definition": "A model-validity problem in which training and deployment data distributions differ, reducing reliability outside the original data conditions.",
      "contexts": [
        "deployment",
        "generalization",
        "distribution-shift"
      ],
      "mitigations": [
        "Monitor drift, validate externally, update models responsibly, and define intended-use boundaries."
      ],
      "examples": [
        "A fraud model trained before a policy change fails after scammers adapt to the old detection rules."
      ],
      "related": [
        "recency-bias-llm",
        "historical-bias-llm",
        "selection-bias-llm",
        "exposure-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:deployment",
        "topic:generalization",
        "topic:distribution-shift"
      ],
      "meta": {
        "source": "Quiñonero-Candela et al. (2009), Dataset Shift in Machine Learning.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "deployment",
          "generalization",
          "distribution-shift"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "distributional-bias",
      "name": "Distributional bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Systematic skew in a training or evaluation distribution that causes the model to learn majority, dominant, or convenient patterns as if they were universal.",
      "definition": "Systematic skew in a training or evaluation distribution that causes the model to learn majority, dominant, or convenient patterns as if they were universal.",
      "contexts": [
        "data",
        "modeling",
        "fairness"
      ],
      "mitigations": [
        "Report dataset composition and stress-test minority, edge, and out-of-distribution conditions."
      ],
      "examples": [
        "An image classifier trained mostly on sunny daytime photos fails in low-light, low-bandwidth, or non-Western settings."
      ],
      "related": [
        "exposure-bias-llm",
        "global-north-dominance-llm",
        "urban-centric-views-llm",
        "sampling-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:data",
        "topic:modeling",
        "topic:fairness"
      ],
      "meta": {
        "source": "NIST SP 1270; Suresh & Guttag (2021); Quiñonero-Candela et al. (2009).",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "data",
          "modeling",
          "fairness"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "benchmark-bias",
      "name": "Benchmark bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias caused when a benchmark privileges certain tasks, cultures, languages, formats, or definitions of success and is treated as a universal measure of capability.",
      "definition": "Bias caused when a benchmark privileges certain tasks, cultures, languages, formats, or definitions of success and is treated as a universal measure of capability.",
      "contexts": [
        "evaluation",
        "benchmarks",
        "validity"
      ],
      "mitigations": [
        "Use multiple benchmarks, task-specific validation, subgroup reporting, and qualitative failure analysis."
      ],
      "examples": [
        "A model is declared best-in-class because it excels on English exam-style tasks while failing local-language civic-service scenarios."
      ],
      "related": [
        "english-language-primacy-llm",
        "cultural-bias-llm",
        "popularity-bias-llm",
        "technocentric-perspectives-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:evaluation",
        "topic:benchmarks",
        "topic:validity"
      ],
      "meta": {
        "source": "NIST SP 1270; Raji et al. (2021), AI accountability and benchmark/evaluation critiques; Suresh & Guttag (2021), evaluation bias.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "evaluation",
          "benchmarks",
          "validity"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "benchmark-overfitting",
      "name": "Benchmark overfitting",
      "kind": "bias",
      "category": "ai",
      "summary": "A distortion in which systems are tuned to perform well on a known benchmark rather than to generalize to the underlying real-world task.",
      "definition": "A distortion in which systems are tuned to perform well on a known benchmark rather than to generalize to the underlying real-world task.",
      "contexts": [
        "evaluation",
        "benchmarks",
        "overfitting"
      ],
      "mitigations": [
        "Use hidden test sets, rotating evaluations, fresh data, and real-world task audits."
      ],
      "examples": [
        "A model’s leaderboard score rises after repeated prompt and training tweaks, but user performance on fresh tasks does not improve."
      ],
      "related": [
        "overconfidence-effect",
        "law-of-small-numbers",
        "algorithmic-bias",
        "popularity-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:evaluation",
        "topic:benchmarks",
        "topic:overfitting"
      ],
      "meta": {
        "source": "Recht et al. (2019), “Do ImageNet Classifiers Generalize to ImageNet?”; Goodhart’s law / benchmark gaming literature.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "evaluation",
          "benchmarks",
          "overfitting"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "train-test-contamination",
      "name": "Train-test contamination",
      "kind": "bias",
      "category": "ai",
      "summary": "An evaluation bias in which test items or benchmark answers leak into training data, making performance appear stronger than true generalization.",
      "definition": "An evaluation bias in which test items or benchmark answers leak into training data, making performance appear stronger than true generalization.",
      "contexts": [
        "evaluation",
        "data-leakage",
        "benchmarks"
      ],
      "mitigations": [
        "Use canary tests, contamination audits, private holdouts, generated variants, and time-split evaluations."
      ],
      "examples": [
        "An LLM scores highly on a public benchmark because many questions appeared in its pretraining corpus."
      ],
      "related": [
        "recency-bias-llm",
        "popularity-bias-llm",
        "reporting-bias-llm",
        "algorithmic-bias"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:evaluation",
        "topic:data-leakage",
        "topic:benchmarks"
      ],
      "meta": {
        "source": "Bordt et al. (2024), “How Much Can We Forget about Data Contamination?”; LLM benchmark-contamination literature.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "evaluation",
          "data-leakage",
          "benchmarks"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "proxy-discrimination",
      "name": "Proxy discrimination",
      "kind": "bias",
      "category": "ai",
      "summary": "Discriminatory outcomes produced through variables that stand in for protected or sensitive attributes, even when the protected attribute itself is excluded.",
      "definition": "Discriminatory outcomes produced through variables that stand in for protected or sensitive attributes, even when the protected attribute itself is excluded.",
      "contexts": [
        "fairness",
        "discrimination",
        "proxies"
      ],
      "mitigations": [
        "Audit correlated proxies, subgroup outcomes, and legal/ethical constraints; do not assume removing sensitive fields removes discrimination."
      ],
      "examples": [
        "A lending model excludes race but uses ZIP code, school, and commute patterns that reproduce racial segregation."
      ],
      "related": [
        "algorithmic-bias",
        "socioeconomic-bias-llm",
        "geographical-bias-llm",
        "selection-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:fairness",
        "topic:discrimination",
        "topic:proxies"
      ],
      "meta": {
        "source": "Barocas & Selbst (2016), “Big Data’s Disparate Impact”; Prince & Schwarcz (2020), proxy discrimination.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "fairness",
          "discrimination",
          "proxies"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "feedback-loop-bias",
      "name": "Feedback loop bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias that intensifies when model outputs influence the world or future data in ways that reinforce the model’s original assumptions.",
      "definition": "Bias that intensifies when model outputs influence the world or future data in ways that reinforce the model’s original assumptions.",
      "contexts": [
        "deployment",
        "reinforcement",
        "sociotechnical-systems"
      ],
      "mitigations": [
        "Track intervention effects, avoid using model-influenced outcomes as neutral ground truth, and include counterfactual monitoring."
      ],
      "examples": [
        "Predictive policing sends more patrols to one neighborhood, producing more arrests there and then 'confirming' the model’s prediction."
      ],
      "related": [
        "availability-cascade",
        "algorithmic-bias",
        "selection-bias-llm",
        "reporting-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:deployment",
        "topic:reinforcement",
        "topic:sociotechnical-systems"
      ],
      "meta": {
        "source": "Suresh & Guttag (2021), deployment bias; O’Neil (2016), Weapons of Math Destruction.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "deployment",
          "reinforcement",
          "sociotechnical-systems"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "evaluation-bias",
      "name": "Evaluation bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias introduced when evaluation data, metrics, raters, or procedures do not reflect the intended use, affected populations, or harms of the system.",
      "definition": "Bias introduced when evaluation data, metrics, raters, or procedures do not reflect the intended use, affected populations, or harms of the system.",
      "contexts": [
        "evaluation",
        "metrics",
        "validation"
      ],
      "mitigations": [
        "Evaluate by context, subgroup, failure severity, and user impact rather than aggregate accuracy alone."
      ],
      "examples": [
        "A chatbot is evaluated on helpfulness scores but not on whether its advice is safe for marginalized users or non-English speakers."
      ],
      "related": [
        "algorithmic-bias",
        "outcome-bias-llm",
        "data-driven-rationality-llm",
        "popularity-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:evaluation",
        "topic:metrics",
        "topic:validation"
      ],
      "meta": {
        "source": "Suresh & Guttag (2021), evaluation bias; NIST SP 1270.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "evaluation",
          "metrics",
          "validation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "deployment-bias",
      "name": "Deployment bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias that emerges when a model is used in a context, workflow, population, or power structure different from what designers assumed.",
      "definition": "Bias that emerges when a model is used in a context, workflow, population, or power structure different from what designers assumed.",
      "contexts": [
        "deployment",
        "sociotechnical-systems",
        "context"
      ],
      "mitigations": [
        "Document intended use, prohibited use, affected stakeholders, escalation paths, and post-deployment harms."
      ],
      "examples": [
        "A school-risk model intended to allocate support is used instead to punish students, changing its ethical meaning and effects."
      ],
      "related": [
        "algorithmic-bias",
        "pro-innovation-bias",
        "technocentric-perspectives-llm",
        "status-quo-bias"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:deployment",
        "topic:sociotechnical-systems",
        "topic:context"
      ],
      "meta": {
        "source": "Suresh & Guttag (2021), deployment bias; NIST SP 1270 socio-technical framing.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "deployment",
          "sociotechnical-systems",
          "context"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "positional-bias",
      "name": "Positional bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias caused when the position of information in a prompt, context window, ranking, or comparison set affects model attention, retrieval, or judgment.",
      "definition": "Bias caused when the position of information in a prompt, context window, ranking, or comparison set affects model attention, retrieval, or judgment.",
      "contexts": [
        "llm",
        "evaluation",
        "retrieval"
      ],
      "mitigations": [
        "Randomize order in evaluations, test middle-context retrieval, and avoid assuming long context equals equal context use."
      ],
      "examples": [
        "An LLM answers correctly when the relevant paragraph appears at the beginning or end of the context but misses it in the middle."
      ],
      "related": [
        "primacy-effect",
        "recency-bias",
        "serial-position-effect",
        "anchoring-bias"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:llm",
        "topic:evaluation",
        "topic:retrieval"
      ],
      "meta": {
        "source": "Liu et al. (2023), “Lost in the Middle: How Language Models Use Long Contexts.”",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "llm",
          "evaluation",
          "retrieval"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "verbosity-bias",
      "name": "Verbosity bias",
      "kind": "bias",
      "category": "ai",
      "summary": "A preference or evaluation bias in which longer, more detailed, or more verbose answers are rated higher even when they are not more accurate or useful.",
      "definition": "A preference or evaluation bias in which longer, more detailed, or more verbose answers are rated higher even when they are not more accurate or useful.",
      "contexts": [
        "llm",
        "evaluation",
        "preference-modeling"
      ],
      "mitigations": [
        "Normalize for length, use task-specific rubrics, and score factual accuracy separately from completeness."
      ],
      "examples": [
        "An LLM judge scores a long answer above a concise correct answer because the long answer appears more thorough."
      ],
      "related": [
        "information-overload-llm",
        "halo-effect",
        "authority-bias",
        "data-driven-rationality-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:llm",
        "topic:evaluation",
        "topic:preference-modeling"
      ],
      "meta": {
        "source": "Saito et al. (2023), “Verbosity Bias in Preference Labeling by Large Language Models”; Zheng et al. (2023), LLM-as-judge evaluation work.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "llm",
          "evaluation",
          "preference-modeling"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "sycophancy-bias",
      "name": "Sycophancy bias",
      "kind": "bias",
      "category": "ai",
      "summary": "A model-behavior bias in which the system over-agrees with the user, validates false beliefs, or adapts to user preferences instead of correcting errors.",
      "definition": "A model-behavior bias in which the system over-agrees with the user, validates false beliefs, or adapts to user preferences instead of correcting errors.",
      "contexts": [
        "llm",
        "interaction",
        "alignment"
      ],
      "mitigations": [
        "Reward truth-seeking over agreeableness, test 'are you sure?' turns, and require models to state disagreement when evidence supports it."
      ],
      "examples": [
        "A chatbot tells a user their incorrect medical interpretation is reasonable because it is optimizing for agreement and satisfaction."
      ],
      "related": [
        "confirmation-bias-llm",
        "echo-chamber-effect-llm",
        "authority-bias",
        "false-consensus-effect"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:llm",
        "topic:interaction",
        "topic:alignment"
      ],
      "meta": {
        "source": "Perez et al. (2022), model-written evaluations; Wei et al. (2024), “Simple Synthetic Data Reduces Sycophancy.”",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "llm",
          "interaction",
          "alignment"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "safety-over-refusal-bias",
      "name": "Safety over-refusal bias",
      "kind": "bias",
      "category": "ai",
      "summary": "A safety-alignment bias in which a model refuses benign or legitimate requests because safety cues are overgeneralized.",
      "definition": "A safety-alignment bias in which a model refuses benign or legitimate requests because safety cues are overgeneralized.",
      "contexts": [
        "llm",
        "safety",
        "evaluation"
      ],
      "mitigations": [
        "Evaluate false refusals alongside unsafe compliance; design safe-completion alternatives rather than binary refusal only."
      ],
      "examples": [
        "A model refuses to help a journalist analyze public cybersecurity policy because the word 'exploit' appears in the prompt."
      ],
      "related": [
        "omission-bias",
        "pessimism-bias",
        "technocentric-perspectives-llm",
        "content-bias-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:llm",
        "topic:safety",
        "topic:evaluation"
      ],
      "meta": {
        "source": "Zhang et al. (2024), FalseReject; LLM safety and refusal-evaluation literature.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "llm",
          "safety",
          "evaluation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "rlhf-preference-bias",
      "name": "RLHF preference bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias introduced when reinforcement learning from human feedback over-optimizes for rater preferences such as politeness, length, confidence, agreeableness, or mainstream norms.",
      "definition": "Bias introduced when reinforcement learning from human feedback over-optimizes for rater preferences such as politeness, length, confidence, agreeableness, or mainstream norms.",
      "contexts": [
        "llm",
        "alignment",
        "preference-modeling"
      ],
      "mitigations": [
        "Use diverse raters, adversarial evaluations, outcome-based checks, and explicit penalties for false agreement or unsupported confidence."
      ],
      "examples": [
        "A model learns to give polished, deferential answers that raters like even when the answers are shallow or overly cautious."
      ],
      "related": [
        "halo-effect",
        "information-overload-llm",
        "confirmation-bias-llm",
        "echo-chamber-effect-llm"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:llm",
        "topic:alignment",
        "topic:preference-modeling"
      ],
      "meta": {
        "source": "Bai et al. (2022), training helpful and harmless assistants with RLHF; Casper et al. (2023), “Open Problems and Fundamental Limitations of RLHF.”",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "llm",
          "alignment",
          "preference-modeling"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "metric-bias",
      "name": "Metric bias",
      "kind": "bias",
      "category": "ai",
      "summary": "Bias caused when a chosen metric rewards what is easy to measure rather than what matters, causing systems to optimize a proxy at the expense of the real goal.",
      "definition": "Bias caused when a chosen metric rewards what is easy to measure rather than what matters, causing systems to optimize a proxy at the expense of the real goal.",
      "contexts": [
        "evaluation",
        "metrics",
        "optimization"
      ],
      "mitigations": [
        "Use metric portfolios, guardrail metrics, qualitative review, and stakeholder-defined success criteria."
      ],
      "examples": [
        "A content system optimizes engagement and learns to promote outrage because engagement is easier to measure than informed well-being."
      ],
      "related": [
        "data-driven-rationality-llm",
        "outcome-bias",
        "information-bias",
        "pro-innovation-bias"
      ],
      "tags": [
        "class:ai",
        "lane:ai-data-bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:evaluation",
        "topic:metrics",
        "topic:optimization"
      ],
      "meta": {
        "source": "Goodhart (1975), Goodhart’s law; Strathern (1997), audit-culture critique; NIST SP 1270.",
        "ai_relevance": "",
        "original_categories": [
          "ai",
          "evaluation",
          "metrics",
          "optimization"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "affect-heuristic",
      "name": "Affect heuristic",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to judge risks, benefits, or probabilities by immediate positive or negative feeling rather than by evidence alone.",
      "definition": "The tendency to judge risks, benefits, or probabilities by immediate positive or negative feeling rather than by evidence alone.",
      "contexts": [
        "judgment",
        "risk",
        "emotion"
      ],
      "mitigations": [
        "Score risks and benefits separately before discussing emotional impressions."
      ],
      "examples": [
        "A technology that feels exciting is judged as low-risk and high-benefit before the team has reviewed failure modes."
      ],
      "related": [
        "salience-bias",
        "availability-heuristic",
        "negativity-bias",
        "optimism-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:judgment",
        "topic:risk",
        "topic:emotion"
      ],
      "meta": {
        "source": "Slovic, Finucane, Peters & MacGregor (2002), “The Affect Heuristic.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "judgment",
          "risk",
          "emotion"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "backfire-effect",
      "name": "Backfire effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A proposed belief-updating pattern in which corrective information can strengthen the original false belief under some conditions.",
      "definition": "A proposed belief-updating pattern in which corrective information can strengthen the original false belief under some conditions.",
      "contexts": [
        "belief-updating",
        "misinformation",
        "correction"
      ],
      "mitigations": [
        "Use identity-safe corrections, affirm values, and provide alternative causal explanations rather than only saying 'false.'"
      ],
      "examples": [
        "A political fact-check causes a committed partisan to double down because the correction feels like an identity attack."
      ],
      "related": [
        "confirmation-bias",
        "disconfirmation-bias",
        "belief-bias",
        "reactive-devaluation"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:belief-updating",
        "topic:misinformation",
        "topic:correction"
      ],
      "meta": {
        "source": "Nyhan & Reifler (2010), “When Corrections Fail”; note that later replication work finds the effect is not universal.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "belief-updating",
          "misinformation",
          "correction"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "barnum-effect",
      "name": "Barnum effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to accept vague, general statements as highly accurate descriptions of oneself.",
      "definition": "The tendency to accept vague, general statements as highly accurate descriptions of oneself.",
      "contexts": [
        "self-assessment",
        "ambiguity",
        "personality"
      ],
      "mitigations": [
        "Ask whether the statement would feel true for most people and test it against specific falsifiable predictions."
      ],
      "examples": [
        "A personality app says 'you are independent but sometimes need connection,' and users feel it captured them uniquely."
      ],
      "related": [
        "confirmation-bias",
        "ambiguity-effect",
        "halo-effect",
        "self-serving-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:self-assessment",
        "topic:ambiguity",
        "topic:personality"
      ],
      "meta": {
        "source": "Forer (1949), “The Fallacy of Personal Validation”; Meehl (1956), Barnum effect terminology.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "self-assessment",
          "ambiguity",
          "personality"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "curse-of-knowledge",
      "name": "Curse of knowledge",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A communication bias in which people who know something struggle to imagine what it is like not to know it.",
      "definition": "A communication bias in which people who know something struggle to imagine what it is like not to know it.",
      "contexts": [
        "communication",
        "teaching",
        "expertise"
      ],
      "mitigations": [
        "Test explanations with real novices and ask them to paraphrase the task in their own words."
      ],
      "examples": [
        "An expert designer explains a workflow using internal jargon and assumes novice users understand the implied steps."
      ],
      "related": [
        "egocentric-bias",
        "false-consensus-effect",
        "projection-bias",
        "overconfidence-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:communication",
        "topic:teaching",
        "topic:expertise"
      ],
      "meta": {
        "source": "Camerer, Loewenstein & Weber (1989), “The Curse of Knowledge in Economic Settings.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "communication",
          "teaching",
          "expertise"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "empathy-gap",
      "name": "Empathy gap",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to underestimate how much visceral states such as pain, fear, hunger, craving, or arousal shape preferences and decisions.",
      "definition": "The tendency to underestimate how much visceral states such as pain, fear, hunger, craving, or arousal shape preferences and decisions.",
      "contexts": [
        "affective-forecasting",
        "emotion",
        "decision-making"
      ],
      "mitigations": [
        "Plan for future states as if they are real constraints, not character failures."
      ],
      "examples": [
        "When calm, someone plans to ignore cravings, then later underestimates how hard that will be when stressed and hungry."
      ],
      "related": [
        "projection-bias",
        "present-bias",
        "hot-hand-fallacy",
        "optimism-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:affective-forecasting",
        "topic:emotion",
        "topic:decision-making"
      ],
      "meta": {
        "source": "Loewenstein (1996), “Out of Control: Visceral Influences on Behavior.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "affective-forecasting",
          "emotion",
          "decision-making"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "focusing-effect",
      "name": "Focusing effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to overestimate the importance of whatever feature one is currently focused on when judging overall value or satisfaction.",
      "definition": "The tendency to overestimate the importance of whatever feature one is currently focused on when judging overall value or satisfaction.",
      "contexts": [
        "attention",
        "judgment",
        "wellbeing"
      ],
      "mitigations": [
        "Use multi-criteria decision matrices and evaluate neglected dimensions deliberately."
      ],
      "examples": [
        "A candidate overweights salary in a job choice while neglecting commute, manager quality, autonomy, and burnout risk."
      ],
      "related": [
        "salience-bias",
        "anchoring-bias",
        "availability-heuristic",
        "framing-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:attention",
        "topic:judgment",
        "topic:wellbeing"
      ],
      "meta": {
        "source": "Schkade & Kahneman (1998), “Does Living in California Make People Happy?”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "attention",
          "judgment",
          "wellbeing"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "normalcy-bias",
      "name": "Normalcy bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to underreact to warnings because the current situation feels normal and people expect things to continue as usual.",
      "definition": "The tendency to underreact to warnings because the current situation feels normal and people expect things to continue as usual.",
      "contexts": [
        "risk",
        "crisis",
        "disaster-response"
      ],
      "mitigations": [
        "Use trigger-action plans: decide in advance what evidence will force action."
      ],
      "examples": [
        "Residents delay evacuation because previous storms were manageable, even though the current warning is more severe."
      ],
      "related": [
        "status-quo-bias",
        "optimism-bias",
        "ostrich-effect",
        "pessimism-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:risk",
        "topic:crisis",
        "topic:disaster-response"
      ],
      "meta": {
        "source": "Source label is common in disaster-risk communication but canonical academic origin is unclear: [unknown]. Related disaster literature includes Mileti (1999), Disasters by Design.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "risk",
          "crisis",
          "disaster-response"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "psychological-reactance",
      "name": "Psychological reactance",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A motivational reaction in which people resist or reject guidance because it feels like a threat to freedom or autonomy.",
      "definition": "A motivational reaction in which people resist or reject guidance because it feels like a threat to freedom or autonomy.",
      "contexts": [
        "persuasion",
        "autonomy",
        "resistance"
      ],
      "mitigations": [
        "Offer rationale, choice, and autonomy-supportive language rather than coercive commands."
      ],
      "examples": [
        "A user ignores a safety warning because the warning feels controlling, not because they evaluated the risk."
      ],
      "related": [
        "reactive-devaluation",
        "status-quo-bias",
        "authority-bias",
        "confirmation-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:persuasion",
        "topic:autonomy",
        "topic:resistance"
      ],
      "meta": {
        "source": "Brehm (1966), A Theory of Psychological Reactance; Brehm & Brehm (1981).",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "persuasion",
          "autonomy",
          "resistance"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "mental-accounting",
      "name": "Mental accounting",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to treat money differently depending on arbitrary categories, budgets, or sources rather than total value.",
      "definition": "The tendency to treat money differently depending on arbitrary categories, budgets, or sources rather than total value.",
      "contexts": [
        "behavioral-economics",
        "money",
        "decision-making"
      ],
      "mitigations": [
        "Reframe decisions in terms of total resources, opportunity costs, and long-term goals."
      ],
      "examples": [
        "Someone splurges a tax refund while refusing to spend the same amount from savings, even though both affect the same household finances."
      ],
      "related": [
        "loss-aversion",
        "sunk-cost-fallacy",
        "endowment-effect",
        "present-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:behavioral-economics",
        "topic:money",
        "topic:decision-making"
      ],
      "meta": {
        "source": "Thaler (1985), “Mental Accounting and Consumer Choice”; Thaler (1999), “Mental Accounting Matters.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "behavioral-economics",
          "money",
          "decision-making"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "rhyme-as-reason-effect",
      "name": "Rhyme-as-reason effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to judge rhyming or phonetically fluent statements as more truthful or persuasive than equivalent non-rhyming statements.",
      "definition": "The tendency to judge rhyming or phonetically fluent statements as more truthful or persuasive than equivalent non-rhyming statements.",
      "contexts": [
        "language",
        "truthiness",
        "persuasion"
      ],
      "mitigations": [
        "Translate slogans into plain language and evaluate the claim independent of its sound."
      ],
      "examples": [
        "The slogan 'What’s easy is cheesy' feels more credible than a clearer but less catchy version."
      ],
      "related": [
        "illusory-truth-effect",
        "framing-effect",
        "mere-exposure-effect",
        "belief-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:language",
        "topic:truthiness",
        "topic:persuasion"
      ],
      "meta": {
        "source": "McGlone & Tofighbakhsh (2000), “Birds of a Feather Flock Conjointly.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "language",
          "truthiness",
          "persuasion"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "impact-bias",
      "name": "Impact bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to overestimate the intensity or duration of future emotional reactions.",
      "definition": "The tendency to overestimate the intensity or duration of future emotional reactions.",
      "contexts": [
        "affective-forecasting",
        "prediction",
        "emotion"
      ],
      "mitigations": [
        "Look for base rates from similar past events and account for emotional adaptation."
      ],
      "examples": [
        "A person believes failing one exam will ruin their year, but the emotional impact fades much faster than predicted."
      ],
      "related": [
        "optimism-bias",
        "pessimism-bias",
        "peak-end-rule",
        "projection-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:affective-forecasting",
        "topic:prediction",
        "topic:emotion"
      ],
      "meta": {
        "source": "Wilson & Gilbert (2003), “Affective Forecasting”; Gilbert et al. (1998), immune neglect.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "affective-forecasting",
          "prediction",
          "emotion"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "distinction-bias",
      "name": "Distinction bias",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to overvalue small differences between options when evaluating them side by side compared with how much those differences matter in actual use.",
      "definition": "The tendency to overvalue small differences between options when evaluating them side by side compared with how much those differences matter in actual use.",
      "contexts": [
        "comparison",
        "decision-making",
        "evaluation"
      ],
      "mitigations": [
        "Evaluate each option separately in the context where it will actually be used."
      ],
      "examples": [
        "A shopper pays much more for a monitor with slightly better specs that they would barely notice once using it alone."
      ],
      "related": [
        "anchoring-bias",
        "framing-effect",
        "decoy-effect",
        "halo-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:comparison",
        "topic:decision-making",
        "topic:evaluation"
      ],
      "meta": {
        "source": "Hsee & Zhang (2004), “Distinction Bias: Misprediction and Mischoice Due to Joint Evaluation.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "comparison",
          "decision-making",
          "evaluation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "contrast-effect",
      "name": "Contrast effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "A judgment distortion in which perception of an item is shifted by comparison with what came immediately before or nearby.",
      "definition": "A judgment distortion in which perception of an item is shifted by comparison with what came immediately before or nearby.",
      "contexts": [
        "comparison",
        "perception",
        "evaluation"
      ],
      "mitigations": [
        "Use fixed rubrics, randomize order, and score candidates independently before comparison."
      ],
      "examples": [
        "A decent candidate seems weak after an exceptional interviewee and strong after a poor one."
      ],
      "related": [
        "anchoring-bias",
        "framing-effect",
        "halo-effect",
        "horn-effect"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:comparison",
        "topic:perception",
        "topic:evaluation"
      ],
      "meta": {
        "source": "Sherif, Taub & Hovland (1958), assimilation and contrast effects; social judgment theory literature.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "comparison",
          "perception",
          "evaluation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "denominator-neglect",
      "name": "Denominator neglect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to focus on the numerator or vivid count while neglecting the denominator or base rate needed to interpret risk.",
      "definition": "The tendency to focus on the numerator or vivid count while neglecting the denominator or base rate needed to interpret risk.",
      "contexts": [
        "risk",
        "probability",
        "numeracy"
      ],
      "mitigations": [
        "Convert ratios to common denominators, natural frequencies, and absolute risks."
      ],
      "examples": [
        "A person chooses a bowl with 9 winning tickets out of 100 over one with 1 out of 10 because 9 looks larger than 1."
      ],
      "related": [
        "base-rate-neglect",
        "neglect-of-probability",
        "salience-bias",
        "representativeness-heuristic"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:risk",
        "topic:probability",
        "topic:numeracy"
      ],
      "meta": {
        "source": "Denes-Raj & Epstein (1994), ratio-bias experiments; Reyna & Brainerd (2008), fuzzy-trace theory and numeracy.",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "risk",
          "probability",
          "numeracy"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "mere-urgency-effect",
      "name": "Mere urgency effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to prioritize urgent tasks over more important tasks even when the important tasks produce greater value.",
      "definition": "The tendency to prioritize urgent tasks over more important tasks even when the important tasks produce greater value.",
      "contexts": [
        "prioritization",
        "time-pressure",
        "decision-making"
      ],
      "mitigations": [
        "Separate urgency from importance; schedule protected time for high-value non-urgent work."
      ],
      "examples": [
        "A team spends the day answering low-value Slack pings while delaying a strategic research synthesis."
      ],
      "related": [
        "present-bias",
        "salience-bias",
        "time-saving-bias",
        "planning-fallacy"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:prioritization",
        "topic:time-pressure",
        "topic:decision-making"
      ],
      "meta": {
        "source": "Zhu, Yang & Hsee (2018), “The Mere Urgency Effect.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "prioritization",
          "time-pressure",
          "decision-making"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "ikea-effect",
      "name": "IKEA effect",
      "kind": "bias",
      "category": "cognitive",
      "summary": "The tendency to overvalue things one has helped create, especially when effort is salient.",
      "definition": "The tendency to overvalue things one has helped create, especially when effort is salient.",
      "contexts": [
        "effort",
        "ownership",
        "valuation"
      ],
      "mitigations": [
        "Use external user evidence and decision criteria that separate effort invested from value delivered."
      ],
      "examples": [
        "A product team defends a complex feature because they built it, not because users need it."
      ],
      "related": [
        "endowment-effect",
        "sunk-cost-fallacy",
        "choice-supportive-bias",
        "status-quo-bias"
      ],
      "tags": [
        "class:cognitive",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:effort",
        "topic:ownership",
        "topic:valuation"
      ],
      "meta": {
        "source": "Norton, Mochon & Ariely (2012), “The IKEA Effect.”",
        "ai_relevance": "",
        "original_categories": [
          "cognitive",
          "effort",
          "ownership",
          "valuation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "weird-sampling-bias",
      "name": "WEIRD sampling bias",
      "kind": "bias",
      "category": "cultural",
      "summary": "The tendency to overgeneralize findings from Western, Educated, Industrialized, Rich, and Democratic populations to humanity as a whole.",
      "definition": "The tendency to overgeneralize findings from Western, Educated, Industrialized, Rich, and Democratic populations to humanity as a whole.",
      "contexts": [
        "research-methods",
        "sampling",
        "cross-cultural-psychology"
      ],
      "mitigations": [
        "Report sample geography, language, class, education, and cultural context; seek cross-cultural replication before universal claims."
      ],
      "examples": [
        "A psychology textbook describes 'human decision-making' based mostly on U.S. undergraduate samples."
      ],
      "related": [
        "western-centrism",
        "western-educational-superiority",
        "universalism-norms",
        "selection-bias"
      ],
      "tags": [
        "class:cultural",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:research-methods",
        "topic:sampling",
        "topic:cross-cultural-psychology"
      ],
      "meta": {
        "source": "Henrich, Heine & Norenzayan (2010), “The Weirdest People in the World?” Behavioral and Brain Sciences.",
        "ai_relevance": "AI systems trained on web and academic data may inherit WEIRD assumptions about norms, cognition, and user behavior.",
        "original_categories": [
          "cultural",
          "research-methods",
          "sampling",
          "cross-cultural-psychology"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "ethnocentrism-bias",
      "name": "Ethnocentrism bias",
      "kind": "bias",
      "category": "cultural",
      "summary": "The tendency to evaluate other cultures primarily through the standards, assumptions, or values of one’s own group.",
      "definition": "The tendency to evaluate other cultures primarily through the standards, assumptions, or values of one’s own group.",
      "contexts": [
        "social",
        "intergroup",
        "evaluation"
      ],
      "mitigations": [
        "Ask what local function a practice serves before judging it by outside norms."
      ],
      "examples": [
        "A reviewer treats indirect communication as evasive because their own workplace culture prizes blunt directness."
      ],
      "related": [
        "western-centrism",
        "universalism-norms",
        "ingroup-bias",
        "out-group-homogeneity-bias"
      ],
      "tags": [
        "class:cultural",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:social",
        "topic:intergroup",
        "topic:evaluation"
      ],
      "meta": {
        "source": "Sumner (1906), Folkways; Berry et al. (2011), Cross-Cultural Psychology.",
        "ai_relevance": "",
        "original_categories": [
          "cultural",
          "social",
          "intergroup",
          "evaluation"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "testimonial-injustice-bias",
      "name": "Testimonial injustice bias",
      "kind": "bias",
      "category": "social",
      "summary": "A credibility bias in which a speaker is given less trust or authority because of identity-based prejudice rather than the quality of their evidence.",
      "definition": "A credibility bias in which a speaker is given less trust or authority because of identity-based prejudice rather than the quality of their evidence.",
      "contexts": [
        "epistemic-injustice",
        "credibility",
        "prejudice"
      ],
      "mitigations": [
        "Use structured credibility checks, listen for identity-based discounting, and compare evidence standards across speakers."
      ],
      "examples": [
        "A patient’s pain report is discounted because clinicians stereotype their demographic group as exaggerating symptoms."
      ],
      "related": [
        "authority-bias",
        "halo-effect",
        "horn-effect",
        "implicit-bias-llm"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:epistemic-injustice",
        "topic:credibility",
        "topic:prejudice"
      ],
      "meta": {
        "source": "Fricker (2007), Epistemic Injustice: Power and the Ethics of Knowing.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "epistemic-injustice",
          "credibility",
          "prejudice"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "deficit-framing-bias",
      "name": "Deficit framing bias",
      "kind": "bias",
      "category": "cultural",
      "summary": "The tendency to explain a group’s outcomes primarily through supposed deficiencies, lacks, or pathologies while underweighting strengths, constraints, and structural causes.",
      "definition": "The tendency to explain a group’s outcomes primarily through supposed deficiencies, lacks, or pathologies while underweighting strengths, constraints, and structural causes.",
      "contexts": [
        "social",
        "institutions",
        "framing"
      ],
      "mitigations": [
        "Use asset-based and systems-level framing; name structural constraints and community strengths alongside needs."
      ],
      "examples": [
        "A school report frames low-income students as lacking motivation while ignoring transportation, food insecurity, curriculum mismatch, and institutional barriers."
      ],
      "related": [
        "fundamental-attribution-error",
        "dehumanization-bias",
        "western-centrism",
        "socioeconomic-bias-llm"
      ],
      "tags": [
        "class:cultural",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:social",
        "topic:institutions",
        "topic:framing"
      ],
      "meta": {
        "source": "Valencia (1997), The Evolution of Deficit Thinking; education and public-health equity literature.",
        "ai_relevance": "",
        "original_categories": [
          "cultural",
          "social",
          "institutions",
          "framing"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },

    {
      "id": "credibility-excess-bias",
      "name": "Credibility excess bias",
      "kind": "bias",
      "category": "social",
      "summary": "A credibility distortion in which speakers associated with status, credentials, dominant identity, or institutional power receive more trust than their evidence warrants.",
      "definition": "A credibility distortion in which speakers associated with status, credentials, dominant identity, or institutional power receive more trust than their evidence warrants.",
      "contexts": [
        "epistemic-injustice",
        "authority",
        "privilege"
      ],
      "mitigations": [
        "Separate speaker status from evidence quality and give structured weight to lived, local, and frontline knowledge."
      ],
      "examples": [
        "A senior executive’s casual opinion outweighs frontline user evidence during product prioritization."
      ],
      "related": [
        "authority-bias",
        "halo-effect",
        "status-quo-bias",
        "ingroup-bias"
      ],
      "tags": [
        "class:social",
        "lane:bias",
        "source:gap-fill",
        "batch:new-bias-gap-fill",
        "topic:epistemic-injustice",
        "topic:authority",
        "topic:privilege"
      ],
      "meta": {
        "source": "Fricker (2007), Epistemic Injustice; Medina (2013), The Epistemology of Resistance.",
        "ai_relevance": "",
        "original_categories": [
          "social",
          "epistemic-injustice",
          "authority",
          "privilege"
        ],
        "gap_fill_batch": "new_bias_gap_fill_entries_2026-04-27",
        "draft_source_path": "authoring-drafts/new_bias_gap_fill_entries.md"
      }
    },


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
