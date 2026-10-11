/* Editable content. Use null for files or contacts that are not yet available. */
window.SITE_CONTENT = {
  contactEmail: null,
  components: [
    { id: "dispatch", number: "01", icon: "route", category: "RESPOND", title: "Intelligent dispatch", subtitle: "The right help, without the guesswork.", description: "Match a roadside incident to the right provider by considering diagnostic uncertainty, travel time, and the cost of a mismatch.", owner: "Janukshan Sivakumar", color: "orange", tags: ["Diagnostic triage", "Decision support"], fullTitle: "Dispatch Optimization & Smart Recovery", detail: "The Uncertainty-Aware Dispatch Optimization framework combines driver-reported symptoms and available vehicle telemetry to estimate the service needed. Expected-cost minimization considers provider suitability and traffic impact, with a Bayesian feedback loop designed to refine later decisions.", steps: ["Collect symptoms and available OBD-II signals", "Estimate a probability for each service need", "Compare providers using expected cost and impact", "Use resolution feedback to update diagnostic probabilities"], tools: "Node.js · TypeScript · Python · PostgreSQL", file: "documents/proposal-dispatch.pdf" },
    { id: "geo", number: "02", icon: "map", category: "UNDERSTAND", title: "Traffic intelligence", subtitle: "See the impact beyond the incident.", description: "Understand how a breakdown affects the surrounding road network, and use that context to inform recovery priorities.", owner: "Mohomed Asath", color: "blue", tags: ["Impact scoring", "Spatial analysis"], fullTitle: "Geo-Intelligence & Traffic Impact Analysis", detail: "A five-factor impact model considers capacity loss, traffic volume, time, location, and incident severity. SUMO simulation supports evaluation, while KDE and DBSCAN methods explore spatial incident patterns. A dashboard brings impact scores, hotspots, and what-if scenarios together.", steps: ["Collect road-network and incident context", "Calculate an interpretable traffic impact score", "Evaluate congestion effects using simulation", "Share priorities and hotspot insights with dispatch"], tools: "Python · SUMO · OSMnx · scikit-learn · Leaflet", file: "documents/proposal-geo-intelligence.pdf" },
    { id: "maintenance", number: "03", icon: "pulse", category: "ANTICIPATE", title: "Predictive maintenance", subtitle: "Care for the vehicle before the breakdown.", description: "Bring vehicle telemetry, driving behaviour, and service history together to estimate component health and guide maintenance.", owner: "Samudith Tharindaka", color: "green", tags: ["Vehicle telemetry", "Remaining useful life"], fullTitle: "Predictive Maintenance for Service Management", detail: "The maintenance component combines ELM327 OBD-II readings, smartphone motion signals, and recorded services. Models estimate the remaining life of selected vehicle components, while fault information and service recommendations help connect an assessment to practical follow-up.", steps: ["Gather OBD-II telemetry and smartphone sensor data", "Extract driving features and include service history", "Estimate component health and remaining useful life", "Connect recommendations to parts and services"], tools: "Python · FastAPI · Random Forest · XGBoost · React Native", file: "documents/proposal-predictive-maintenance.pdf" },
    { id: "claims", number: "04", icon: "cube", category: "VERIFY", title: "3D accident claims", subtitle: "A clearer picture when it matters.", description: "Explore guided image capture and 3D reconstruction to support accident documentation with privacy-aware access to evidence.", owner: "Dilnuk De Silva", color: "purple", tags: ["3D reconstruction", "Privacy by design"], fullTitle: "Intelligent 3D Accident Claim System", detail: "This component investigates multi-angle mobile capture, low-light enhancement, and 3D scene reconstruction for accident claims. Timestamp and location checks aim to improve evidence integrity, with role-scoped access designed to limit which claim information each stakeholder can see.", steps: ["Guide the driver through multi-angle photo capture", "Improve visibility in low-light images", "Reconstruct the scene and check capture metadata", "Deliver appropriate evidence to each authorized role"], tools: "React Native · Python · OpenMVG · OpenMVS · Three.js", file: "documents/proposal-claims-privacy.pdf" }
  ],
  research: {
    literature: { kicker: "THE FOUNDATION", title: "Looking at the whole journey.", intro: "Our proposal literature reviews examine four areas that are often studied separately. Kaduna.lk investigates how their insights can work together in a roadside assistance workflow.", items: [
      { title: "Dispatch under uncertainty", text: "Provider matching, diagnostic triage, and stochastic decision methods inform dispatch when the exact service need is not yet known.", file: "documents/proposal-dispatch.pdf" },
      { title: "Traffic and spatial analysis", text: "Incident-induced congestion, traffic simulation, and spatial clustering inform how road context can contribute to recovery priorities.", file: "documents/proposal-geo-intelligence.pdf" },
      { title: "Condition-based vehicle care", text: "OBD-II diagnostics, driving-behaviour features, and remaining-useful-life models inform maintenance that accounts for vehicle use.", file: "documents/proposal-predictive-maintenance.pdf" },
      { title: "Image-based accident evidence", text: "Multi-view reconstruction, image enhancement, metadata checks, and privacy by design inform richer claim documentation.", file: "documents/proposal-claims-privacy.pdf" }
    ] },
    gap: { kicker: "THE OPPORTUNITY", title: "The missing connections.", intro: "The proposals identify integration gaps between diagnosing a problem, prioritizing an incident, maintaining a vehicle, and documenting a claim.", items: [
      { title: "Service needs are uncertain", text: "Nearest-provider matching alone does not resolve uncertainty about the equipment or expertise a breakdown requires." },
      { title: "Road impact needs a local context", text: "Recovery decisions need an interpretable way to account for incident impact and Sri Lankan road conditions." },
      { title: "Predictions need a next step", text: "A maintenance estimate becomes more useful when service history, parts, and professional services connect to the same workflow." },
      { title: "Evidence needs context and access boundaries", text: "Accident imagery needs to be considered alongside lighting, capture metadata, scene geometry, and appropriate access." }
    ] },
    problem: { kicker: "OUR RESEARCH QUESTION", title: "How can roadside care work as one?", intro: "How can a unified platform combine uncertain vehicle symptoms, traffic impact, maintenance signals, and accident evidence to support better-informed roadside and automotive service decisions in Sri Lanka?", items: [
      { title: "For the driver", text: "Reduce the friction of explaining a breakdown, finding suitable help, and understanding the next maintenance action." },
      { title: "For service providers", text: "Give providers useful incident context and a clearer understanding of the likely service requirements." },
      { title: "For the wider ecosystem", text: "Connect recovery priorities and claim documentation while designing appropriate boundaries around sensitive information." }
    ] },
    objectives: { kicker: "WHAT WE AIM TO ACHIEVE", title: "Four objectives. A shared outcome.", intro: "Design, implement, and evaluate a connected roadside assistance and automotive services platform, with each component contributing a distinct research objective.", items: [
      { title: "Improve dispatch decisions", text: "Model diagnostic uncertainty and select providers through expected-cost optimization and feedback." },
      { title: "Make traffic impact actionable", text: "Develop and evaluate impact scoring, congestion estimates, and spatial hotspot analysis." },
      { title: "Connect health insights to vehicle care", text: "Combine telemetry, behaviour, and service records to estimate component condition and recommend follow-up." },
      { title: "Improve accident documentation", text: "Explore guided capture, 3D reconstruction, evidence checks, and privacy-aware delivery." }
    ] },
    methodology: { kicker: "OUR APPROACH", title: "Evidence into informed action.", intro: "The project follows an iterative process across four components. Simulations and prototype evaluation support development; field validation remains a separate step.", items: [
      { title: "01 — Understand & collect", text: "Review related work, define stakeholder needs, and prepare road data, vehicle signals, incident scenarios, and image inputs." },
      { title: "02 — Model & develop", text: "Build the diagnostic, traffic, maintenance, and reconstruction pipelines as focused services." },
      { title: "03 — Connect & demonstrate", text: "Integrate the components through shared API contracts and mobile or web interfaces." },
      { title: "04 — Evaluate & refine", text: "Use component-specific metrics, simulation scenarios, functional testing, and documented prototype feedback to refine the system." }
    ] },
    technologies: { kicker: "THE TOOLKIT", title: "Built with purpose.", intro: "The project combines a mobile application, a web dashboard, and specialist analysis services. The technologies below support the research platform; this showcase itself is plain HTML, CSS, and JavaScript.", groups: [
      { title: "APPLICATIONS", tags: ["React Native", "Expo", "Next.js", "TypeScript"] },
      { title: "SERVICES & DATA", tags: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Supabase"] },
      { title: "MODELLING & ANALYSIS", tags: ["scikit-learn", "XGBoost", "SUMO", "OSMnx", "Leaflet"] },
      { title: "VISION & TELEMETRY", tags: ["OpenMVG", "OpenMVS", "Three.js", "ELM327 / OBD-II"] }
    ] }
  },
  milestones: [
    { id: "proposal-submission", title: "Proposal submission", date: "15 March 2026", startDate: "2026-03-15", endDate: "2026-03-15", group: "March", description: "Submit the project proposal reports describing the problem, literature review, research objectives, and proposed methods.", marks: null, file: "#documents", linkLabel: "Explore proposal reports" },
    { id: "proposal-presentation", title: "Proposal presentation", date: "16–18 March 2026", startDate: "2026-03-16", endDate: "2026-03-18", group: "March", description: "Present the research direction and the proposed contributions of the four components.", marks: null, file: "documents/proposal-presentation.pdf", linkLabel: "View presentation" },
    { id: "progress-1", title: "Progress Presentation I", date: "11–13 May 2026", startDate: "2026-05-11", endDate: "2026-05-13", group: "May", description: "Demonstrate prototype progress, addressed requirements, design contributions, and early feedback.", marks: null, file: "documents/progress-presentation-1.pdf", linkLabel: "View presentation" },
    { id: "checklist", title: "Checklist submission", date: "13 May 2026", startDate: "2026-05-13", endDate: "2026-05-13", group: "May", description: "Submit the assessment checklist and the required supporting project records.", marks: null },
    { id: "progress-2", title: "Progress Presentation II", date: "31 August–2 September 2026", startDate: "2026-08-31", endDate: "2026-09-02", group: "August – September", description: "Present further implementation, integration progress, and evaluation of the research components.", marks: null, file: "documents/progress-presentation-2.pdf", linkLabel: "View presentation" },
    { id: "draft-thesis", title: "Draft thesis submission", date: "11 October 2026", startDate: "2026-10-11", endDate: "2026-10-11", group: "October", description: "Submit the draft thesis for review, covering research methods, implementation, evaluation, and conclusions.", marks: null },
    { id: "website", title: "Website submission", date: "11 October 2026", startDate: "2026-10-11", endDate: "2026-10-11", group: "October", description: "Submit the research website presenting the project domain, milestones, documents, presentations, and team.", marks: null },
    { id: "final-checklist", title: "Final checklist submission", date: "14 October 2026", startDate: "2026-10-14", endDate: "2026-10-14", group: "October", description: "Submit the final checklist and required evidence for the completed research work.", marks: null },
    { id: "final-viva", title: "Final presentation & viva", date: "19–21 October 2026", startDate: "2026-10-19", endDate: "2026-10-21", group: "October", description: "Demonstrate the integrated platform and discuss the research findings and each member’s contribution.", marks: null },
    { id: "website-logbook", title: "Website evaluation & logbook submission", date: "19–21 October 2026", startDate: "2026-10-19", endDate: "2026-10-21", group: "October", description: "Present the research website for evaluation and submit the project logbook.", marks: null },
    { id: "paper", title: "Research paper submission", date: "23 October 2026", startDate: "2026-10-23", endDate: "2026-10-23", group: "October", description: "Submit the research paper describing the contributions, methods, and evaluation findings.", marks: null },
    { id: "final-thesis", title: "Final thesis submission", date: "28 October 2026", startDate: "2026-10-28", endDate: "2026-10-28", group: "October", description: "Submit the final thesis incorporating the completed research and review feedback.", marks: null },
    { id: "publication-evidence", title: "Research paper publication evidence", date: "1 December 2026", startDate: "2026-12-01", endDate: "2026-12-01", group: "December", description: "Submit the required evidence of research paper publication.", marks: null }
  ],
  documents: [
    { title: "Topic Assessment", subtitle: "Approved research topic & scope", category: "PROJECT", file: "documents/topic-assessment.pdf", date: "January 2026" },
    { title: "Dispatch Optimization", subtitle: "Individual project proposal", author: "Janukshan Sivakumar", category: "PROPOSAL", file: "documents/proposal-dispatch.pdf", date: "March 2026" },
    { title: "Geo-Intelligence", subtitle: "Individual project proposal", author: "Mohomed Asath", category: "PROPOSAL", file: "documents/proposal-geo-intelligence.pdf", date: "March 2026" },
    { title: "Predictive Maintenance", subtitle: "Individual project proposal", author: "Samudith Tharindaka", category: "PROPOSAL", file: "documents/proposal-predictive-maintenance.pdf", date: "March 2026" },
    { title: "3D Accident Claims", subtitle: "Individual project proposal", author: "Dilnuk De Silva", category: "PROPOSAL", file: "documents/proposal-claims-privacy.pdf", date: "March 2026" },
    { title: "Project Charter", subtitle: "Group document", category: "PROJECT", file: null },
    { title: "Checklist Documents", subtitle: "Assessment checklists I–IV", category: "PROJECT", file: null },
    { title: "UADO: Uncertainty-Aware Dispatch Optimization", subtitle: "Research paper · expected-cost dispatch with Bayesian feedback", author: "Janukshan Sivakumar", category: "RESEARCH PAPER", file: "documents/paper-uado-dispatch.pdf", date: "October 2026" },
    { title: "Gaussian Splatting for Fraud-Resistant 3D Vehicle Reconstruction", subtitle: "Research paper · Sri Lankan motor insurance claims", author: "Dilnuk De Silva", category: "RESEARCH PAPER", file: "documents/paper-3d-gaussian-splatting.pdf", date: "October 2026" },
    { title: "Geo-Intelligence Research Paper", subtitle: "Traffic impact scoring & hotspot analysis", author: "Mohomed Asath", category: "RESEARCH PAPER", file: null },
    { title: "Predictive Maintenance Research Paper", subtitle: "Component health & remaining useful life", author: "Samudith Tharindaka", category: "RESEARCH PAPER", file: null },
    { title: "Final Group Report", subtitle: "Integrated project report", category: "FINAL REPORT", file: null },
    { title: "Final Individual Reports", subtitle: "Four component reports", category: "FINAL REPORT", file: null },
    { title: "Research Poster", subtitle: "Project overview & findings", category: "POSTER", file: null }
  ],
  presentations: [
    { title: "Project Proposal", subtitle: "Research direction & proposed solution", date: "March 2026", file: "documents/proposal-presentation.pdf", slides: 30 },
    { title: "Progress Presentation I", subtitle: "Prototype development & early feedback", date: "May 2026", file: "documents/progress-presentation-1.pdf", slides: 24 },
    { title: "Progress Presentation II", subtitle: "Integration & evaluation", date: "September 2026", file: "documents/progress-presentation-2.pdf", slides: 14 },
    { title: "Final Presentation", subtitle: "The complete research journey", file: null }
  ],
  team: [
    { name: "Janukshan Sivakumar", id: "IT22635266", component: "Dispatch Optimization & Smart Recovery", photo: "assets/janukshan.png", number: "01", email: null },
    { name: "Mohomed Asath", id: "IT22633422", component: "Geo-Intelligence & Traffic Impact Analysis", photo: "assets/asath.png", number: "02", email: null },
    { name: "Samudith Tharindaka", id: "IT22639776", component: "Predictive Maintenance for Service Management", photo: "assets/samudith.jpg", number: "03", email: null },
    { name: "Dilnuk De Silva", id: "IT22001252", component: "Intelligent 3D Accident Claim System", photo: "assets/dilnuk.png", number: "04", email: null }
  ]
};
