# HYDROFLOW AI – Hydraulic Engineering Calculator

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/SATHISH-js/hydroflow-ai)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SATHISH-js/hydroflow-ai)

A modern, responsive, and lightweight web application designed for civil and mechanical engineering students to perform fundamental hydraulic network calculations with step-by-step mathematical derivations.

* **GitHub Repository:** [https://github.com/SATHISH-js/hydroflow-ai](https://github.com/SATHISH-js/hydroflow-ai)
* **1-Click Live Deploy on Vercel:** [Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/SATHISH-js/hydroflow-ai)
* **Claim Temporary Deployment:** [Claim on Vercel](https://vercel.com/claim-deployment?code=55c7d9fa-78c1-4784-8a53-9f1493f225a5)

---

## 🌟 Key Features

1. **Hardy Cross Method (Loop Relaxation)**:
   - Dynamic pipe configuration (Add, Remove, Clear, Sample Problem).
   - Solves loop networks using the Darcy-Weisbach head loss relation:
     $$h_f = r \cdot Q \cdot |Q| \quad \text{where} \quad r = \frac{8 f L}{\pi^2 g D^5} \approx \frac{f L}{12.1 D^5}$$
   - Computes loop flow correction:
     $$\Delta Q = -\frac{\sum h_f}{\sum 2 r |Q|}$$
   - Iteration-by-iteration breakdown tables showing $L$, $D$, $f$, $r$, $Q_0$, $h_f$, $2r|Q|$, $\Delta Q$, and $Q_{\text{new}}$.
   - Status indicators: **NETWORK BALANCED** (green badge with celebration) or **NOT BALANCED** if tolerance is not met.

2. **Equivalent Pipe Method**:
   - **Pipes in Series (Dupuit's Equation)**:
     $$\frac{f_e L_e}{D_e^5} = \sum_{i=1}^n \frac{f_i L_i}{D_i^5}$$
     - Flexible target options: Find Equivalent Length ($L_e$) for a specified Diameter ($D_e$), or Find Equivalent Diameter ($D_e$) for a specified Length ($L_e$).
     - Individual section head loss breakdown and total system head loss ($H_L$).
   - **Pipes in Parallel (Divided Flow)**:
     $$\frac{D_e^{2.5}}{\sqrt{f_e L_e}} = \sum_{i=1}^n \frac{D_i^{2.5}}{\sqrt{f_i L_i}}$$
     - Equal head loss across branches, discharge distribution ($Q_i$), and equivalent pipe dimensions.
   - **Real-Time Interactive SVG Schematic**:
     - Visual diagram illustrating the physical pipe network with flowing water animations and real-time dimension annotations.

3. **Smart Camera Scanner & OCR**:
   - Live camera stream via `navigator.mediaDevices.getUserMedia` with flash scanner animation.
   - Image file upload (PNG/JPG) for textbook problems or laboratory data sheets.
   - Tesseract.js optical character recognition with intelligent heuristic parsing of lengths, diameters, flows, and friction factors.
   - Interactive preview table to review and edit recognized values before applying directly to either calculator.

4. **HYDROBOT AI Assistant**:
   - Floating chat widget in the bottom-right corner.
   - Bilingual rule-based knowledge engine supporting **English** and **Tamil (தமிழ்)**.
   - Explains formulas (Darcy-Weisbach, Dupuit, Hazen-Williams, Reynolds number), sign conventions, and calculation steps.
   - Quick question suggestion chips and synthesized water droplet chirp audio feedback.

5. **Bilingual Support (English & Tamil)**:
   - Full translation of all menus, cards, forms, tables, steps, badges, alerts, and chatbot prompts.
   - Instant switching with no page reload, saved in `localStorage`.

6. **3 Futuristic Hydraulic Themes**:
   - **Hydraulic Blue**: Deep navy background with cyan and water-blue glowing accents.
   - **Dark Cyber**: High-contrast obsidian with neon aqua highlights.
   - **Light Blueprint**: Crisp technical engineering blueprint style.
   - Smooth theme transition, saved in `localStorage`.

7. **Lightweight Animations**:
   - Animated water flowing through pipes (SVG `stroke-dasharray` animation).
   - Rotating pressure gauge with animated needle responding to calculated head loss.
   - Floating water droplet particles on background canvas.

---

## 🚀 How to Run

Because **HYDROFLOW AI** is built using clean modern vanilla HTML, CSS, JavaScript, and Bootstrap 5, **no complex build steps, backend server, or database installation is required!**

### Option 1: Direct Browser Launch (Easiest)
1. Navigate to the project directory: `d:\water`
2. Double-click `index.html` to open it in your browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Local HTTP Server
If testing the live camera scanner feature, modern browsers require either `localhost` or `https://` to grant camera permissions:
```bash
# Using Node.js npx:
npx serve d:\water

# OR using Python:
cd d:\water
python -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

---

## 📂 Project Structure

```
d:\water\
│
├── index.html               # Main single-page application
├── README.md                # Project documentation & run guide
│
├── css\
│   └── style.css            # Hydraulic styling, glassmorphism, animations & themes
│
├── js\
│   ├── app.js               # Navigation coordinator, theme & gauge controller
│   ├── translations.js      # English & Tamil dynamic translation engine
│   ├── hardycross.js        # Hardy Cross iterative loop solver & table renderer
│   ├── equivalentpipe.js    # Equivalent pipe solver & SVG schematic renderer
│   ├── scanner.js           # OCR camera scanner & numerical extractor
│   └── hydrobot.js          # Bilingual HydroBot AI chatbot
│
└── assets\
    └── favicon.svg          # Modern water valve / pipe logo
```

---

## 🧪 Quick Test Walkthrough

1. **Hardy Cross Calculation**:
   - Click **Hardy Cross Method** in the navbar.
   - Click **"Load Sample 4-Pipe Loop"** to fill textbook test values ($L=600\text{ m}, f=0.02$, loop flow).
   - Click **"Solve Loop Network"**.
   - Notice the metric cards update, final flow directions (Clockwise/Counter-CW) display, and the green **NETWORK BALANCED** badge appears with celebratory confetti!
   - Click the **Iteration tabs** (Iter 1, Iter 2, Iter 3) to view the intermediate mathematical steps and $\Delta Q$ corrections.

2. **Equivalent Pipe Calculation**:
   - Click **Equivalent Pipe** in the navbar.
   - Select either **"Pipes in Series"** or **"Pipes in Parallel"**.
   - Click **"Load Sample Problem"** to populate realistic pipe data.
   - Click **"Compute Equivalent Pipe"**.
   - Check the resulting $D_e$, $L_e$, total head loss $H_f$, step-by-step Dupuit derivation, and view the animated **Interactive Network Schematic** below!

3. **Language & Theme Switching**:
   - In the navbar, select **"தமிழ் (Tamil)"** to translate the entire interface instantly into Tamil.
   - Switch themes between **Hydraulic Blue**, **Dark Cyber**, and **Light Blueprint**.

4. **HydroBot AI**:
   - Click the floating cyan bot icon in the bottom right.
   - Click any quick chip (e.g., *"Explain Hardy Cross Method"* or *"ஹார்டி கிராஸ் முறை விளக்கம்"*).
