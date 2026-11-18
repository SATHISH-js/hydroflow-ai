/**
 * HYDROFLOW AI - Bilingual Language Translations (English & Tamil)
 * Supports dynamic runtime switching without page reload.
 */

const translations = {
  en: {
    // Brand & Navigation
    brandName: "HYDROFLOW AI",
    brandSubtitle: "Hydraulic Engineering Calculator",
    navHome: "Home",
    navHardyCross: "Hardy Cross Method",
    navEquivalentPipe: "Equivalent Pipe",
    navScanner: "Camera Scanner",
    navDocs: "Manual",
    navHydroBot: "HydroBot AI",
    themeHydraulicBlue: "Hydraulic Blue",
    themeDark: "Dark Cyber",
    themeLight: "Light Blueprint",
    languageSelect: "Language",
    
    // Hero Section
    heroBadge: "Smart Fluid Dynamics v2.4",
    heroTitle: "Precision Hydraulic Engineering Calculator",
    heroSubtitle: "Empowering civil & mechanical engineering students to compute closed-loop network distribution and equivalent pipe systems with step-by-step clarity.",
    btnGetStarted: "Start Calculating",
    btnOpenBot: "Ask HydroBot AI",
    btnLaunchScanner: "Scan Problem Sheet",
    metricLoopBalancing: "Loop Network Balancing",
    metricSeriesParallel: "Series & Parallel Pipes",
    metricStepByStep: "Step-by-Step Derivation",
    gaugeTitle: "Network Pressure Monitor",
    gaugeUnit: "Head Loss (m)",
    gaugeStatusNormal: "Hydraulic Equilibrium",
    
    // Method Cards (Home)
    cardsHeading: "Hydraulic Calculation Engines",
    cardsSubheading: "Select a method below to start your hydraulic analysis with interactive parameter tables and iterative solvers.",
    hardyCardTitle: "Hardy Cross Method",
    hardyCardBadge: "Network Loop Analysis",
    hardyCardDesc: "Iterative relaxation method for determining discharge in closed pipe networks. Calculates loop head losses, flow corrections (ΔQ), and balances the network.",
    btnExploreHardy: "Explore Hardy Cross",
    equivCardTitle: "Equivalent Pipe Method",
    equivCardBadge: "Compound Pipe Systems",
    equivCardDesc: "Replaces complex pipes in series or parallel with a single uniform equivalent pipe using Dupuit's equation and head loss equivalence principles.",
    btnExploreEquiv: "Explore Equivalent Pipe",
    
    // Feature Highlights (Home)
    featureScannerTitle: "Smart Camera Scanner",
    featureScannerDesc: "Capture or upload textbook diagrams, lab sheets, or pipe data tables to extract values automatically with OCR.",
    btnTryScanner: "Open Camera Scanner",
    featureBotTitle: "HydroBot AI Assistant",
    featureBotDesc: "Got stuck with signs, head loss formulas, or Dupuit's equation? Chat with our bilingual AI hydraulic assistant.",
    btnChatBot: "Launch HydroBot",
    
    // Hardy Cross Section
    hardyPageTitle: "Hardy Cross Network Loop Solver",
    hardyPageSubtitle: "Enter pipe geometry, initial assumed flow rates, and friction factors. The solver iterates using ΔQ = -Σ(h_f) / (n · Σ|h_f/Q|) until balanced.",
    hardyPresetBtn: "Load Sample 4-Pipe Loop",
    hardyAddPipeBtn: "Add Pipe",
    hardyRemovePipeBtn: "Remove Last Pipe",
    hardySolveBtn: "Solve Loop Network",
    hardyClearBtn: "Clear Fields",
    hardyUnitsNote: "Sign convention: Clockwise flow is Positive (+), Counter-Clockwise is Negative (-).",
    
    // Table Headers (Hardy Cross)
    thPipeId: "Pipe ID",
    thLength: "Length L (m)",
    thDiameter: "Diameter D (m)",
    thFlow: "Initial Flow Q (m³/s)",
    thFriction: "Friction f",
    thResistance: "Resistance r",
    thActions: "Action",
    
    // Hardy Cross Results
    resultsTitle: "Hardy Cross Calculation Results",
    iterationTab: "Iteration",
    finalFlowSummary: "Final Balanced Discharges",
    statusBalanced: "NETWORK BALANCED",
    statusNotBalanced: "NOT BALANCED (TOLERANCE NOT MET)",
    statusBalancedDesc: "Network head loss algebraic sum converged within tolerance (ΔQ < 0.0001 m³/s).",
    statusNotBalancedDesc: "Network did not fully converge within max iterations. Check sign conventions or friction factors.",
    thIteration: "Iter",
    thHf: "Head Loss hf (m)",
    thHfOverQ: "|hf / Q| or 2r|Q|",
    thDeltaQ: "Loop Correction ΔQ",
    thNewQ: "Corrected Flow Q_new (m³/s)",
    cardTotalHeadLoss: "Algebraic Loop Head Loss Σhf",
    cardFlowCorrection: "Last Flow Correction |ΔQ|",
    cardIterationsCount: "Iterations Run",
    cardNetworkStatus: "Convergence Status",
    
    // Equivalent Pipe Section
    equivPageTitle: "Equivalent Pipe Method Calculator",
    equivPageSubtitle: "Convert compound pipe networks in series or parallel into an equivalent uniform pipe with identical head loss and flow capacity.",
    tabPipesSeries: "Pipes in Series (Dupuit's Eq.)",
    tabPipesParallel: "Pipes in Parallel (Divided Flow)",
    equivTargetLabel: "Target Calculation:",
    targetFindLe: "Find Equivalent Length (Le) for given Diameter (De)",
    targetFindDe: "Find Equivalent Diameter (De) for given Length (Le)",
    labelTargetDia: "Chosen Equivalent Diameter De (m):",
    labelTargetLen: "Chosen Equivalent Length Le (m):",
    labelTotalDischarge: "Total System Discharge Q (m³/s):",
    labelEqFriction: "Equivalent Pipe Friction Factor fe:",
    equivPresetBtn: "Load Sample Problem",
    equivAddPipeBtn: "Add Pipe Section",
    equivRemovePipeBtn: "Remove Pipe",
    equivSolveBtn: "Compute Equivalent Pipe",
    equivClearBtn: "Clear Inputs",
    
    // Table Headers (Equivalent Pipe)
    thSectionId: "Section ID",
    thBranchId: "Branch ID",
    thEquivLength: "Length L (m)",
    thEquivDia: "Diameter D (m)",
    thEquivFriction: "Friction Factor f",
    thBranchFlow: "Branch Discharge Q (m³/s)",
    
    // Equivalent Pipe Results
    equivResultTitle: "Equivalent Pipe Solution & Derivation",
    cardEquivDiaResult: "Equivalent Diameter (De)",
    cardEquivLenResult: "Equivalent Length (Le)",
    cardTotalHeadLossResult: "Total System Head Loss (Hf)",
    cardTotalDischargeResult: "Total System Flow (Q)",
    stepByStepDerivation: "Step-by-Step Mathematical Derivation",
    branchDistributionTitle: "Individual Branch Flow Distribution (Parallel)",
    pipeSchematicTitle: "Interactive Network Schematic",
    
    // Camera Scanner Modal
    scannerModalTitle: "Hydraulic Problem Scanner & OCR",
    scannerInstructions: "Point your camera at a textbook problem or upload a clean photo of your hydraulic pipe parameters table.",
    btnStartCamera: "Start Camera",
    btnCapturePhoto: "Capture Photo",
    btnSwitchCamera: "Flip Camera",
    btnUploadImage: "Upload Image File",
    scannerStatusReady: "Ready to capture or upload image.",
    scannerStatusProcessing: "Scanning & running optical recognition...",
    scannerStatusSuccess: "Values extracted successfully! Review and edit below before inserting.",
    scannerStatusError: "Could not read numbers clearly. Please enter values manually or upload a clearer photo.",
    extractedValuesTitle: "Recognized Hydraulic Values (Editable)",
    btnApplyHardy: "Confirm & Solve in Hardy Cross",
    btnApplyEquiv: "Confirm & Solve in Equivalent Pipe",
    btnCloseScanner: "Close",
    
    // HydroBot AI Assistant
    botTitle: "HydroBot AI",
    botSubtitle: "Hydraulic Assistant",
    botWelcome: "Hello! I am HydroBot, your AI hydraulic engineering tutor. I can explain the Hardy Cross loop method, Dupuit's series equation, parallel pipe head loss, formulas, and sign conventions. How can I assist you today?",
    botPlaceholder: "Ask a hydraulic question in English or Tamil...",
    btnSend: "Send",
    quickPromptHardy: "Explain Hardy Cross Method",
    quickPromptSeries: "Explain Pipes in Series (Dupuit's)",
    quickPromptParallel: "How do parallel pipes work?",
    quickPromptFormulas: "What is Darcy-Weisbach formula?",
    quickPromptSigns: "Hardy Cross sign convention",
    
    // Footer & Common
    footerText: "HYDROFLOW AI – Designed for Civil & Hydraulic Engineering Students.",
    footerFormulasNote: "Formulas: Darcy-Weisbach hf = (f · L · Q²) / (12.1 · D⁵) | Dupuit's Le / De⁵ = Σ(Li / Di⁵)",
    alertFillAllFields: "Please enter valid numerical values for all pipe fields.",
    alertMinPipes: "A closed loop requires at least 2 pipes to form a network.",
    toastCopied: "Values copied to calculation form!"
  },
  
  ta: {
    // Brand & Navigation
    brandName: "ஹைட்ரோஃப்ளோ AI (HYDROFLOW AI)",
    brandSubtitle: "நீரியல் பொறியியல் கால்குலேட்டர்",
    navHome: "முகப்பு",
    navHardyCross: "ஹார்டி கிராஸ் முறை",
    navEquivalentPipe: "சமமான குழாய் முறை",
    navScanner: "கேமரா ஸ்கேனர்",
    navDocs: "கையேடு",
    navHydroBot: "ஹைட்ரோபாட் AI",
    themeHydraulicBlue: "ஹைட்ராலிக் நீலம்",
    themeDark: "டார்க் சைபர்",
    themeLight: "லைட் புளூபிரிண்ட்",
    languageSelect: "மொழி / Language",
    
    // Hero Section
    heroBadge: "நுண்ணிய நீரியக்கவியல் v2.4",
    heroTitle: "துல்லியமான நீரியல் பொறியியல் கால்குலேட்டர்",
    heroSubtitle: "சிவில் மற்றும் மெக்கானிக்கல் பொறியியல் மாணவர்கள் மூடிய குழாய் வலையமைப்பு மற்றும் சமமான குழாய் முறைகளை படிநிலைகளுடன் எளிதாக கணக்கிட உதவும் தளம்.",
    btnGetStarted: "கணக்கீட்டைத் தொடங்குங்கள்",
    btnOpenBot: "ஹைட்ரோபாட்டிடம் கேளுங்கள்",
    btnLaunchScanner: "வினாத்தாளை ஸ்கேன் செய்க",
    metricLoopBalancing: "வலையமைப்பு சமநிலைப்படுத்துதல்",
    metricSeriesParallel: "தொடர் & இணை குழாய்கள்",
    metricStepByStep: "படி-படியான தீர்வு விளக்கம்",
    gaugeTitle: "வலையமைப்பு அழுத்த மானி",
    gaugeUnit: "தலை இழப்பு / Head Loss (மீ)",
    gaugeStatusNormal: "நீரியல் சமநிலை",
    
    // Method Cards (Home)
    cardsHeading: "நீரியல் கணக்கீட்டு முறைகள்",
    cardsSubheading: "கீழே உள்ள முறைகளில் ஒன்றைத் தேர்ந்தெடுத்து, ஊடாடும் அட்டவணைகள் மற்றும் தீர்விகளுடன் உங்கள் கணக்கீட்டைத் தொடங்குங்கள்.",
    hardyCardTitle: "ஹார்டி கிராஸ் முறை (Hardy Cross)",
    hardyCardBadge: "வலையமைப்பு வளைய பகுப்பாய்வு",
    hardyCardDesc: "மூடிய குழாய் வளையங்களில் பாய்ம வெளியேற்றத்தை கணக்கிடும் மீள்முறை முறை. தலை இழப்புகள், பாய்வு திருத்தங்கள் (ΔQ) மற்றும் சமநிலையைக் கணக்கிடுகிறது.",
    btnExploreHardy: "ஹார்டி கிராஸ் காண்க",
    equivCardTitle: "சமமான குழாய் முறை (Equivalent Pipe)",
    equivCardBadge: "கூட்டு குழாய் அமைப்புகள்",
    equivCardDesc: "டுபுயிட்ஸ் (Dupuit's) சமன்பாட்டைப் பயன்படுத்தி தொடர் அல்லது இணை குழாய்களை ஒரே சமமான குழாயாக மாற்றிக் கணக்கிடுகிறது.",
    btnExploreEquiv: "சமமான குழாய் காண்க",
    
    // Feature Highlights (Home)
    featureScannerTitle: "ஸ்மார்ட் கேமரா ஸ்கேனர்",
    featureScannerDesc: "புத்தக வினாக்கள், ஆய்வக தாள்கள் அல்லது அட்டவணைகளை புகைப்படம் எடுத்து OCR மூலம் தானாக எண்களை உள்ளிடலாம்.",
    btnTryScanner: "கேமரா ஸ்கேனரைத் திற",
    featureBotTitle: "ஹைட்ரோபாட் AI உதவியாளர்",
    featureBotDesc: "குறியீடுகள், சூத்திரங்கள் அல்லது டுபுயிட்ஸ் சமன்பாடு பற்றி சந்தேகமா? எங்கள் தமிழ்/ஆங்கில AI உதவியாளரிடம் கேளுங்கள்.",
    btnChatBot: "ஹைட்ரோபாட் தொடங்கு",
    
    // Hardy Cross Section
    hardyPageTitle: "ஹார்டி கிராஸ் வலையமைப்பு தீர்வு",
    hardyPageSubtitle: "குழாய் நீளம், விட்டம், ஆரம்ப பாய்வு மற்றும் உராய்வு குணகம் ஆகியவற்றை உள்ளிடவும். ΔQ = -Σ(h_f) / (n · Σ|h_f/Q|) சூத்திரம் மூலம் சமநிலையை எட்டும்.",
    hardyPresetBtn: "மாதிரி 4-குழாய் வளையத்தை ஏற்று",
    hardyAddPipeBtn: "குழாய் சேர்க்க",
    hardyRemovePipeBtn: "கடைசி குழாயை நீக்கு",
    hardySolveBtn: "வலையமைப்பை தீர்க்கவும்",
    hardyClearBtn: "அனைத்தையும் அழிக்க",
    hardyUnitsNote: "திசை குறியீடு: கடிகார திசை பாய்வு நேர்மறை (+), கடிகார எதிர் திசை எதிர்மறை (-).",
    
    // Table Headers (Hardy Cross)
    thPipeId: "குழாய் எண்/பெயர்",
    thLength: "நீளம் L (மீ)",
    thDiameter: "விட்டம் D (மீ)",
    thFlow: "ஆரம்ப பாய்வு Q (மீ³/வி)",
    thFriction: "உராய்வு f",
    thResistance: "எதிர்ப்பு r",
    thActions: "செயல்",
    
    // Hardy Cross Results
    resultsTitle: "ஹார்டி கிராஸ் கணக்கீட்டு முடிவுகள்",
    iterationTab: "சுற்று / Iteration",
    finalFlowSummary: "இறுதி சமநிலைப்படுத்தப்பட்ட பாய்வு",
    statusBalanced: "வலையமைப்பு சமநிலையானது (BALANCED)",
    statusNotBalanced: "சமநிலையை எட்டவில்லை (NOT BALANCED)",
    statusBalancedDesc: "வலையமைப்பின் தலை இழப்பு கூடுதல் சகிப்புத்தன்மைக்குள் சமநிலையை அடைந்தது (ΔQ < 0.0001 மீ³/வி).",
    statusNotBalancedDesc: "அதிகபட்ச சுற்றுகளில் சமநிலையை எட்டவில்லை. பாய்வின் திசைக் குறியீடுகளை சரிபார்க்கவும்.",
    thIteration: "சுற்று",
    thHf: "தலை இழப்பு hf (மீ)",
    thHfOverQ: "|hf / Q| அல்லது 2r|Q|",
    thDeltaQ: "பாய்வு திருத்தம் ΔQ",
    thNewQ: "திருத்தப்பட்ட பாய்வு Q_new (மீ³/வி)",
    cardTotalHeadLoss: "மொத்த வளைய தலை இழப்பு Σhf",
    cardFlowCorrection: "கடைசி திருத்தம் |ΔQ|",
    cardIterationsCount: "செயல்பட்ட சுற்றுகள்",
    cardNetworkStatus: "சமநிலை நிலை",
    
    // Equivalent Pipe Section
    equivPageTitle: "சமமான குழாய் முறை கால்குலேட்டர்",
    equivPageSubtitle: "தொடர் அல்லது இணை குழாய் வலையமைப்பை ஒரே சீரான சமமான குழாயாக மாற்றிக் கணக்கிடவும்.",
    tabPipesSeries: "தொடர் குழாய்கள் (டுபுயிட்ஸ் முறை)",
    tabPipesParallel: "இணை குழாய்கள் (பகிர்வு பாய்வு)",
    equivTargetLabel: "கணக்கிட வேண்டிய இலக்கு:",
    targetFindLe: "கொடுக்கப்பட்ட விட்டத்திற்கு சமமான நீளம் (Le) காண்க",
    targetFindDe: "கொடுக்கப்பட்ட நீளத்திற்கு சமமான விட்டம் (De) காண்க",
    labelTargetDia: "தேர்ந்தெடுக்கப்பட்ட சமமான விட்டம் De (மீ):",
    labelTargetLen: "தேர்ந்தெடுக்கப்பட்ட சமமான நீளம் Le (மீ):",
    labelTotalDischarge: "மொத்த வெளியேற்றம் Q (மீ³/வி):",
    labelEqFriction: "சமமான உராய்வு குணகம் fe:",
    equivPresetBtn: "மாதிரி கணக்கை ஏற்று",
    equivAddPipeBtn: "குழாய் பகுதியை சேர்க்க",
    equivRemovePipeBtn: "குழாயை நீக்கு",
    equivSolveBtn: "சமமான குழாய் கணக்கிடுக",
    equivClearBtn: "அழிக்க",
    
    // Table Headers (Equivalent Pipe)
    thSectionId: "பகுதி எண்",
    thBranchId: "கிளை எண்",
    thEquivLength: "நீளம் L (மீ)",
    thEquivDia: "விட்டம் D (மீ)",
    thEquivFriction: "உராய்வு காரணி f",
    thBranchFlow: "கிளை பாய்வு Q (மீ³/வி)",
    
    // Equivalent Pipe Results
    equivResultTitle: "சமமான குழாய் தீர்வு மற்றும் படிநிலைகள்",
    cardEquivDiaResult: "சமமான விட்டம் (De)",
    cardEquivLenResult: "சமமான நீளம் (Le)",
    cardTotalHeadLossResult: "மொத்த தலை இழப்பு (Hf)",
    cardTotalDischargeResult: "மொத்த பாய்வு (Q)",
    stepByStepDerivation: "படி-படியான கணித விளக்கம்",
    branchDistributionTitle: "ஒவ்வொரு கிளை குழாய் பாய்வு பகிர்வு (இணை)",
    pipeSchematicTitle: "ஊடாடும் குழாய் வலையமைப்பு வரைபடம்",
    
    // Camera Scanner Modal
    scannerModalTitle: "நீரியல் வினாத்தாள் ஸ்கேனர் & OCR",
    scannerInstructions: "உங்கள் பாடப்புத்தக வினா அல்லது ஆய்வக தாளை கேமராவில் காட்டவும் அல்லது புகைப்படத்தை பதிவேற்றவும்.",
    btnStartCamera: "கேமராவைத் தொடங்கு",
    btnCapturePhoto: "புகைப்படம் எடு",
    btnSwitchCamera: "கேமரா மாற்று",
    btnUploadImage: "படக் கோப்பைப் பதிவேற்று",
    scannerStatusReady: "புகைப்படம் எடுக்க அல்லது பதிவேற்ற தயாராக உள்ளது.",
    scannerStatusProcessing: "எண்களைக் கண்டறிந்து பகுப்பாய்வு செய்கிறது...",
    scannerStatusSuccess: "எண்கள் வெற்றிகரமாக பிரித்தெடுக்கப்பட்டன! சரிபார்த்து உள்ளிடவும்.",
    scannerStatusError: "எண்களை சரியாக படிக்க முடியவில்லை. நேரடியாக உள்ளிடவும் அல்லது தெளிவான படத்தை பதிவேற்றவும்.",
    extractedValuesTitle: "கண்டறியப்பட்ட மதிப்புகள் (திருத்தக்கூடியவை)",
    btnApplyHardy: "ஹார்டி கிராஸில் உறுதிசெய்து தீர்க்கவும்",
    btnApplyEquiv: "சமமான குழாயில் உறுதிசெய்து தீர்க்கவும்",
    btnCloseScanner: "மூடு",
    
    // HydroBot AI Assistant
    botTitle: "ஹைட்ரோபாட் AI (HydroBot)",
    botSubtitle: "நீரியல் வழிகாட்டி",
    botWelcome: "வணக்கம்! நான் ஹைட்ரோபாட் (HydroBot), உங்கள் நீரியல் பொறியியல் AI வழிகாட்டி. ஹார்டி கிராஸ் முறை, டுபுயிட்ஸ் சமன்பாடு, தொடர் மற்றும் இணை குழாய் தலை இழப்பு மற்றும் சூத்திரங்களை நான் தமிழில் விளக்குவேன். உங்களுக்கு என்ன சந்தேகம்?",
    botPlaceholder: "உங்கள் சந்தேகத்தை தமிழ் அல்லது ஆங்கிலத்தில் தட்டச்சு செய்யவும்...",
    btnSend: "அனுப்பு",
    quickPromptHardy: "ஹார்டி கிராஸ் முறை விளக்கம்",
    quickPromptSeries: "தொடர் குழாய்கள் (டுபுயிட்ஸ் சமன்பாடு)",
    quickPromptParallel: "இணை குழாய்கள் எவ்வாறு இயங்குகின்றன?",
    quickPromptFormulas: "டார்சி-வீஸ்பாக் சூத்திரம் என்ன?",
    quickPromptSigns: "ஹார்டி கிராஸ் குறியீட்டு மரபு",
    
    // Footer & Common
    footerText: "HYDROFLOW AI – சிவில் மற்றும் நீரியல் பொறியியல் மாணவர்களுக்காக உருவாக்கப்பட்டது.",
    footerFormulasNote: "சூத்திரங்கள்: டார்சி-வீஸ்பாக் hf = (f · L · Q²) / (12.1 · D⁵) | டுபுயிட்ஸ் Le / De⁵ = Σ(Li / Di⁵)",
    alertFillAllFields: "அனைத்து குழாய் விவரங்களுக்கும் சரியான எண்களை உள்ளிடவும்.",
    alertMinPipes: "மூடிய வளையத்திற்கு குறைந்தது 2 குழாய்கள் தேவை.",
    toastCopied: "மதிப்புகள் படிவத்தில் வெற்றிகரமாக சேர்க்கப்பட்டன!"
  }
};

// Global language state
let currentLanguage = (typeof localStorage !== "undefined" && localStorage.getItem("hydroflow_lang")) || "en";

function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("hydroflow_lang", lang);
    }
    applyTranslations();
  }
}

function t(key) {
  return (translations[currentLanguage] && translations[currentLanguage][key]) 
    || (translations.en && translations.en[key]) 
    || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translated = t(key);
    if (translated) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translated;
      } else {
        el.innerHTML = translated;
      }
    }
  });
  
  // Update html lang attribute
  document.documentElement.lang = currentLanguage;

  // Update navbar language label and dropdown checkmarks
  const langLabel = document.getElementById("currentLangLabel");
  if (langLabel) {
    langLabel.textContent = currentLanguage === "ta" ? "தமிழ்" : "English";
  }

  document.querySelectorAll("[data-lang-choice]").forEach(link => {
    const choice = link.getAttribute("data-lang-choice");
    if (choice === currentLanguage) {
      link.classList.add("active", "fw-bold");
      if (!link.querySelector(".bi-check2")) {
        const icon = document.createElement("i");
        icon.className = "bi bi-check2 ms-2";
        link.appendChild(icon);
      }
    } else {
      link.classList.remove("active", "fw-bold");
      link.querySelector(".bi-check2")?.remove();
    }
  });
  
  // Fire custom event for dynamic components (Hardy Cross, Equiv Pipe, HydroBot)
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: currentLanguage } }));
}
