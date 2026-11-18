/**
 * HYDROFLOW AI - HYDROBOT AI Hydraulic Engineering Assistant
 * Rule-based bilingual (English & Tamil) hydraulic knowledge engine.
 */

class HydroBot {
  constructor() {
    this.windowEl = document.getElementById("hydrobotWindow");
    this.toggleBtn = document.getElementById("hydrobotToggleBtn");
    this.closeBtn = document.getElementById("hydrobotCloseBtn");
    this.messagesContainer = document.getElementById("hydrobotMessages");
    this.inputEl = document.getElementById("hydrobotInput");
    this.sendBtn = document.getElementById("hydrobotSendBtn");
    this.chipsContainer = document.getElementById("hydrobotChips");
    this.isOpen = false;

    this.knowledgeBase = this.buildKnowledgeBase();
    this.initEventListeners();
  }

  initEventListeners() {
    this.toggleBtn?.addEventListener("click", () => this.toggleWindow());
    this.closeBtn?.addEventListener("click", () => this.closeWindow());
    this.sendBtn?.addEventListener("click", () => this.handleSendMessage());

    this.inputEl?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.handleSendMessage();
      }
    });

    // Language change event to refresh prompt chips
    window.addEventListener("languageChanged", () => {
      this.renderQuickChips();
    });

    this.renderQuickChips();
  }

  toggleWindow() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.windowEl?.classList.add("open");
      this.inputEl?.focus();
    } else {
      this.windowEl?.classList.remove("open");
    }
  }

  openWindow() {
    this.isOpen = true;
    this.windowEl?.classList.add("open");
    this.inputEl?.focus();
  }

  closeWindow() {
    this.isOpen = false;
    this.windowEl?.classList.remove("open");
  }

  renderQuickChips() {
    if (!this.chipsContainer) return;
    const isTa = currentLanguage === "ta";

    const chips = isTa ? [
      { text: "ஹார்டி கிராஸ் முறை", query: "ஹார்டி கிராஸ் முறை" },
      { text: "தொடர் குழாய்கள் (Dupuit)", query: "தொடர் குழாய்கள்" },
      { text: "இணை குழாய்கள்", query: "இணை குழாய்கள்" },
      { text: "டார்சி-வீஸ்பாக் சூத்திரம்", query: "டார்சி வீஸ்பாக் சூத்திரம்" },
      { text: "குறியீட்டு மரபு (+/-)", query: "குறியீட்டு மரபு" }
    ] : [
      { text: "Hardy Cross Method", query: "Explain Hardy Cross Method" },
      { text: "Pipes in Series", query: "Explain Pipes in Series Dupuit" },
      { text: "Pipes in Parallel", query: "How do parallel pipes work?" },
      { text: "Darcy-Weisbach Eq.", query: "What is Darcy-Weisbach formula?" },
      { text: "Sign Conventions", query: "Hardy Cross sign convention" }
    ];

    this.chipsContainer.innerHTML = chips.map(c => `
      <button type="button" class="chip-btn" onclick="hydroBot.sendQuery('${c.query}')">
        ${c.text}
      </button>
    `).join('');
  }

  sendQuery(query) {
    if (this.inputEl) {
      this.inputEl.value = query;
      this.handleSendMessage();
    }
  }

  handleSendMessage() {
    const text = this.inputEl?.value.trim();
    if (!text) return;

    this.addMessage(text, "user");
    this.inputEl.value = "";

    // Show simulated typing bubble
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const answer = this.findAnswer(text);
      this.addMessage(answer, "bot");
      this.playWaterChirp();
    }, 450);
  }

  addMessage(htmlContent, sender) {
    if (!this.messagesContainer) return;
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = htmlContent;
    this.messagesContainer.appendChild(bubble);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const typing = document.createElement("div");
    typing.id = "botTypingIndicator";
    typing.className = "chat-bubble bot text-muted fst-italic";
    typing.innerHTML = `<span class="spinner-grow spinner-grow-sm text-info me-1" role="status"></span> HydroBot is thinking...`;
    this.messagesContainer?.appendChild(typing);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    document.getElementById("botTypingIndicator")?.remove();
  }

  playWaterChirp() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      // AudioContext muted/unsupported, safe to ignore
    }
  }

  findAnswer(userText) {
    const isTa = currentLanguage === "ta" || /[\u0B80-\u0BFF]/.test(userText);
    const text = userText.toLowerCase();

    for (const item of this.knowledgeBase) {
      if (item.lang === (isTa ? "ta" : "en")) {
        const matches = item.keywords.some(kw => text.includes(kw.toLowerCase()));
        if (matches) {
          return item.response;
        }
      }
    }

    // Default fallback
    if (isTa) {
      return `
        <strong>ஹைட்ரோபாட் குறிப்பு:</strong><br>
        மன்னிக்கவும், உங்கள் கேள்விக்குரிய துல்லியமான பதில் கிடைக்கவில்லை. நீங்கள் கேட்கக்கூடிய தலைப்புகள்:
        <ul>
          <li><strong>ஹார்டி கிராஸ் முறை:</strong> வளைய சமநிலை, பாய்வு திருத்தம் (&Delta;Q).</li>
          <li><strong>டுபுயிட்ஸ் சமன்பாடு:</strong> தொடர் குழாய்கள் சமமான நீளம் (L<sub>e</sub>) மற்றும் விட்டம் (D<sub>e</sub>).</li>
          <li><strong>இணை குழாய்கள்:</strong> தலை இழப்பு சமநிலை மற்றும் வெளியேற்றப் பகிர்வு.</li>
          <li><strong>டார்சி-வீஸ்பாக் சூத்திரம்:</strong> h<sub>f</sub> = (f &middot; L &middot; Q&sup2;) / (12.1 &middot; D&#8309;).</li>
        </ul>
      `;
    } else {
      return `
        <strong>HydroBot Assistant:</strong><br>
        I specialize in hydraulic calculations! Try asking about:
        <ul>
          <li><strong>Hardy Cross Method:</strong> Loop balancing, head loss summation, &Delta;Q correction formula.</li>
          <li><strong>Dupuit's Equation:</strong> Equivalent length (L<sub>e</sub>) & diameter (D<sub>e</sub>) for pipes in series.</li>
          <li><strong>Pipes in Parallel:</strong> Flow distribution and head loss equality across branches.</li>
          <li><strong>Formulas:</strong> Darcy-Weisbach equation, friction factor f, and sign conventions.</li>
        </ul>
      `;
    }
  }

  buildKnowledgeBase() {
    return [
      // English Knowledge Entries
      {
        lang: "en",
        keywords: ["hardy cross", "loop", "relaxation", "network balancing"],
        response: `
          <strong>Hardy Cross Method Overview:</strong><br>
          Developed by Prof. Hardy Cross in 1936, this is an iterative relaxation method for solving pipe networks.<br><br>
          <strong>Two Governing Laws:</strong>
          <ol>
            <li><strong>Continuity at Junctions:</strong> &Sigma;Q<sub>in</sub> = &Sigma;Q<sub>out</sub> (mass conservation).</li>
            <li><strong>Zero Loop Head Loss:</strong> &Sigma;h<sub>f</sub> = 0 around any closed circuit.</li>
          </ol>
          <strong>Loop Correction Formula:</strong><br>
          <code>&Delta;Q = - [ &Sigma; h<sub>f</sub> ] / [ n &middot; &Sigma; |h<sub>f</sub> / Q| ]</code><br>
          For Darcy-Weisbach where n = 2:<br>
          <code>&Delta;Q = - [ &Sigma; r &middot; Q &middot; |Q| ] / [ &Sigma; 2 &middot; r &middot; |Q| ]</code><br>
          Iterations repeat until |&Delta;Q| drops below tolerance (e.g. 0.0001 m³/s).
        `
      },
      {
        lang: "en",
        keywords: ["series", "dupuit", "compound", "pipes in series"],
        response: `
          <strong>Pipes in Series & Dupuit's Equation:</strong><br>
          When pipes of different diameters and lengths are joined end-to-end:
          <ol>
            <li><strong>Constant Flow:</strong> The same discharge passes through all pipes: <code>Q₁ = Q₂ = ... = Q</code>.</li>
            <li><strong>Additive Head Loss:</strong> Total head loss is the sum: <code>H<sub>L</sub> = h<sub>f1</sub> + h<sub>f2</sub> + ...</code></li>
          </ol>
          <strong>Dupuit's Equation:</strong><br>
          An equivalent pipe of diameter <code>D<sub>e</sub></code> and length <code>L<sub>e</sub></code> satisfies:<br>
          <code>(f<sub>e</sub> &middot; L<sub>e</sub>) / D<sub>e</sub>⁵ = &Sigma; [ (f<sub>i</sub> &middot; L<sub>i</sub>) / D<sub>i</sub>⁵ ]</code><br>
          If friction factors are equal, it simplifies to: <code>L<sub>e</sub> / D<sub>e</sub>⁵ = &Sigma; (L<sub>i</sub> / D<sub>i</sub>⁵)</code>.
        `
      },
      {
        lang: "en",
        keywords: ["parallel", "divided flow", "branch", "pipes in parallel"],
        response: `
          <strong>Pipes in Parallel:</strong><br>
          When a main pipe branches into two or more parallel paths that recombine downstream:
          <ol>
            <li><strong>Equal Head Loss:</strong> Head loss across every branch is identical: <code>h<sub>f1</sub> = h<sub>f2</sub> = ... = H<sub>L</sub></code>.</li>
            <li><strong>Flow Conservation:</strong> Total flow is divided: <code>Q = Q₁ + Q₂ + ... + Q<sub>n</sub></code>.</li>
          </ol>
          <strong>Equivalent Pipe Relation:</strong><br>
          <code>D<sub>e</sub><sup>2.5</sup> / &radic;(f<sub>e</sub> &middot; L<sub>e</sub>) = &Sigma; [ D<sub>i</sub><sup>2.5</sup> / &radic;(f<sub>i</sub> &middot; L<sub>i</sub>) ]</code><br>
          Each branch flow is proportional to its conductance: <code>Q<sub>i</sub> = Q &middot; (k<sub>i</sub> / &Sigma;k)</code>.
        `
      },
      {
        lang: "en",
        keywords: ["darcy", "weisbach", "friction", "hf", "head loss formula"],
        response: `
          <strong>Darcy-Weisbach Formula:</strong><br>
          The standard equation for frictional head loss in circular pipes:<br>
          <code>h<sub>f</sub> = (f &middot; L &middot; V²) / (2 &middot; g &middot; D)</code><br><br>
          Expressing in terms of flow rate Q (where V = 4Q / &pi;D²):<br>
          <code>h<sub>f</sub> = (8 &middot; f &middot; L &middot; Q²) / (&pi;² &middot; g &middot; D⁵) &approx; (f &middot; L &middot; Q²) / (12.1 &middot; D⁵)</code><br>
          Here, <code>r = (8 &middot; f &middot; L) / (&pi;² &middot; g &middot; D⁵)</code> is called the pipe resistance coefficient.
        `
      },
      {
        lang: "en",
        keywords: ["sign", "convention", "clockwise", "direction"],
        response: `
          <strong>Hardy Cross Sign Convention:</strong><br>
          In a closed loop circuit:
          <ul>
            <li><strong>Clockwise Flow:</strong> Assigned as Positive (<code>+Q</code>). Its head loss is positive (<code>+h<sub>f</sub></code>).</li>
            <li><strong>Counter-Clockwise Flow:</strong> Assigned as Negative (<code>-Q</code>). Its head loss is negative (<code>-h<sub>f</sub></code>).</li>
          </ul>
          When &Delta;Q is calculated, adding &Delta;Q increases clockwise flows and decreases counter-clockwise flows until &Sigma;h<sub>f</sub> reaches zero.
        `
      },

      // Tamil Knowledge Entries
      {
        lang: "ta",
        keywords: ["ஹார்டி கிராஸ்", "ஹார்டி", "வலைப்பின்னல்", "வளையம்"],
        response: `
          <strong>ஹார்டி கிராஸ் முறை (Hardy Cross Method):</strong><br>
          1936-ஆம் ஆண்டு பேராசிரியர் ஹார்டி கிராஸ் என்பவரால் உருவாக்கப்பட்ட ஒரு தொடர் மீள்முறை (Iterative method) ஆகும்.<br><br>
          <strong>அடிப்படை விதிகள்:</strong>
          <ol>
            <li><strong>சந்திப்பில் தொடர்ச்சி விதி:</strong> ஒரு சந்திப்பில் நுழையும் பாய்வு = வெளியேறும் பாய்வு (&Sigma;Q = 0).</li>
            <li><strong>வளையத்தில் தலை இழப்பு:</strong> மூடிய வளையத்தில் மொத்த தலை இழப்பு பூஜ்ஜியமாக இருக்க வேண்டும் (&Sigma;h<sub>f</sub> = 0).</li>
          </ol>
          <strong>பாய்வு திருத்த சூத்திரம்:</strong><br>
          <code>&Delta;Q = - [ &Sigma; h<sub>f</sub> ] / [ 2 &middot; &Sigma; |h<sub>f</sub> / Q| ]</code><br>
          &Delta;Q மதிப்பு மிகக் குறைந்த அளவுக்கு (0.0001 மீ³/வி) குறையும் வரை சுற்றுகள் தொடரும்.
        `
      },
      {
        lang: "ta",
        keywords: ["தொடர்", "டுபுயிட்ஸ்", "dupuit", "கூட்டு குழாய்"],
        response: `
          <strong>தொடர் குழாய்கள் & டுபுயிட்ஸ் சமன்பாடு:</strong><br>
          வெவ்வேறு விட்டம் மற்றும் நீளம் கொண்ட குழாய்கள் தொடராக இணைக்கப்படும் போது:
          <ol>
            <li><strong>சமமான பாய்வு:</strong> அனைத்து குழாய்களிலும் ஒரே அளவு நீர் பாய்கிறது: <code>Q₁ = Q₂ = Q</code>.</li>
            <li><strong>மொத்த தலை இழப்பு:</strong> அனைத்து குழாய்களின் தலை இழப்புகளின் கூட்டுத்தொகை: <code>H<sub>L</sub> = h<sub>f1</sub> + h<sub>f2</sub> + ...</code></li>
          </ol>
          <strong>டுபுயிட்ஸ் (Dupuit's) சூத்திரம்:</strong><br>
          <code>(f<sub>e</sub> &middot; L<sub>e</sub>) / D<sub>e</sub>⁵ = &Sigma; [ (f<sub>i</sub> &middot; L<sub>i</sub>) / D<sub>i</sub>⁵ ]</code><br>
          உராய்வு குணகம் (f) சமமாக இருந்தால்:<br>
          <code>L<sub>e</sub> / D<sub>e</sub>⁵ = (L₁ / D₁⁵) + (L₂ / D₂⁵) + ...</code>
        `
      },
      {
        lang: "ta",
        keywords: ["இணை", "இணையான", "கிளை"],
        response: `
          <strong>இணை குழாய்கள் (Pipes in Parallel):</strong><br>
          ஒரு முதன்மைக் குழாய் இரண்டு அல்லது அதற்கு மேற்பட்ட கிளைகளாகப் பிரிந்து மீண்டும் இணையும் போது:
          <ol>
            <li><strong>சமமான தலை இழப்பு:</strong> அனைத்து கிளைகளிலும் தலை இழப்பு சமமாக இருக்கும்: <code>h<sub>f1</sub> = h<sub>f2</sub> = H<sub>L</sub></code>.</li>
            <li><strong>பாய்வுப் பகிர்வு:</strong> மொத்த பாய்வு கிளைகளிடையே பிரிகிறது: <code>Q = Q₁ + Q₂ + ...</code></li>
          </ol>
          <strong>சமமான குழாய் சூத்திரம்:</strong><br>
          <code>D<sub>e</sub><sup>2.5</sup> / &radic;(f<sub>e</sub> &middot; L<sub>e</sub>) = &Sigma; [ D<sub>i</sub><sup>2.5</sup> / &radic;(f<sub>i</sub> &middot; L<sub>i</sub>) ]</code>
        `
      },
      {
        lang: "ta",
        keywords: ["டார்சி", "வீஸ்பாக்", "சூத்திரம்", "உராய்வு"],
        response: `
          <strong>டார்சி-வீஸ்பாக் சூத்திரம் (Darcy-Weisbach):</strong><br>
          குழாய்களில் உராய்வினால் ஏற்படும் தலை இழப்பைக் கணக்கிடும் அடிப்படை சூத்திரம்:<br>
          <code>h<sub>f</sub> = (f &middot; L &middot; V²) / (2 &middot; g &middot; D)</code><br><br>
          வெளியேற்றம் Q-ல் மாற்றும் போது:<br>
          <code>h<sub>f</sub> = (8 &middot; f &middot; L &middot; Q²) / (&pi;² &middot; g &middot; D⁵) &approx; (f &middot; L &middot; Q²) / (12.1 &middot; D⁵)</code>
        `
      },
      {
        lang: "ta",
        keywords: ["குறியீடு", "திசை", "கடிகார"],
        response: `
          <strong>ஹார்டி கிராஸ் திசைக் குறியீட்டு மரபு:</strong><br>
          வளையத்தில் பாய்ம திசையைக் குறிக்க:
          <ul>
            <li><strong>கடிகார திசை பாய்வு:</strong> நேர்மறை (+Q). தலை இழப்பும் நேர்மறை (+h<sub>f</sub>).</li>
            <li><strong>கடிகார எதிர் திசை பாய்வு:</strong> எதிர்மறை (-Q). தலை இழப்பும் எதிர்மறை (-h<sub>f</sub>).</li>
          </ul>
          &Delta;Q திருத்தத்தைக் கூட்டும் போது வளையம் சமநிலையை அடைகிறது.
        `
      }
    ];
  }
}

// Global hydrobot instance
let hydroBot = null;
document.addEventListener("DOMContentLoaded", () => {
  hydroBot = new HydroBot();
});
