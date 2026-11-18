/**
 * HYDROFLOW AI - Hardy Cross Method Calculation Engine
 * 
 * Solves pipe loop networks using the Hardy Cross relaxation method:
 *   hf = r * Q * |Q|
 *   r = (8 * f * L) / (pi^2 * g * D^5) approx (f * L) / (12.1 * D^5)
 *   Delta Q = - Sum(hf) / Sum(2 * r * |Q|)
 *   Q_next = Q + Delta Q
 */

class HardyCrossSolver {
  constructor() {
    this.tableBody = document.getElementById("hardyCrossTableBody");
    this.resultsContainer = document.getElementById("hardyCrossResults");
    this.pipeCountBadge = document.getElementById("hardyPipeCount");
    this.tolerance = 0.0001; // m³/s
    this.maxIterations = 10;
    
    this.initEventListeners();
    this.loadSampleData(); // Load default sample for student ease
  }

  initEventListeners() {
    document.getElementById("btnAddHardyPipe")?.addEventListener("click", () => this.addPipeRow());
    document.getElementById("btnRemoveHardyPipe")?.addEventListener("click", () => this.removePipeRow());
    document.getElementById("btnClearHardy")?.addEventListener("click", () => this.clearTable());
    document.getElementById("btnSolveHardy")?.addEventListener("click", () => this.solve());
    document.getElementById("btnPresetHardy")?.addEventListener("click", () => this.loadSampleData());
  }

  updatePipeCount() {
    const rows = this.tableBody ? this.tableBody.querySelectorAll("tr") : [];
    if (this.pipeCountBadge) {
      this.pipeCountBadge.textContent = rows.length;
    }
  }

  addPipeRow(id = "", L = "", D = "", Q = "", f = "0.02") {
    if (!this.tableBody) return;
    const rowIndex = this.tableBody.querySelectorAll("tr").length + 1;
    const pipeId = id || `P-${rowIndex}`;

    const tr = document.createElement("tr");
    tr.className = "hardy-pipe-row";
    tr.innerHTML = `
      <td>
        <input type="text" class="form-control form-control-sm form-control-custom font-mono text-center pipe-id" value="${pipeId}" placeholder="e.g. AB">
      </td>
      <td>
        <input type="number" step="any" class="form-control form-control-sm form-control-custom font-mono text-center pipe-length" value="${L}" placeholder="m" required>
      </td>
      <td>
        <input type="number" step="any" class="form-control form-control-sm form-control-custom font-mono text-center pipe-diameter" value="${D}" placeholder="m" required>
      </td>
      <td>
        <input type="number" step="any" class="form-control form-control-sm form-control-custom font-mono text-center pipe-flow" value="${Q}" placeholder="+/- m³/s" required>
      </td>
      <td>
        <input type="number" step="any" class="form-control form-control-sm form-control-custom font-mono text-center pipe-friction" value="${f}" placeholder="0.02" required>
      </td>
      <td class="text-center font-mono text-muted pipe-resistance-cell">-</td>
      <td class="text-center">
        <button type="button" class="btn btn-sm btn-outline-danger btn-icon" title="Remove" onclick="this.closest('tr').remove(); hardySolver.updatePipeCount();">
          <i class="bi bi-trash3"></i>
        </button>
      </td>
    `;
    this.tableBody.appendChild(tr);
    this.updatePipeCount();
  }

  removePipeRow() {
    const rows = this.tableBody?.querySelectorAll("tr");
    if (rows && rows.length > 2) {
      rows[rows.length - 1].remove();
      this.updatePipeCount();
    } else {
      if (typeof showToast === "function") {
        showToast(t("alertMinPipes"), "warning");
      }
    }
  }

  clearTable() {
    if (this.tableBody) {
      this.tableBody.innerHTML = "";
    }
    this.resultsContainer.classList.add("d-none");
    this.updatePipeCount();
  }

  loadSampleData() {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = "";
    // Standard classic 4-pipe single loop textbook problem
    const sample = [
      { id: "AB", L: 600, D: 0.30, Q: 0.050, f: 0.02 },
      { id: "BC", L: 600, D: 0.25, Q: 0.020, f: 0.02 },
      { id: "CD", L: 600, D: 0.20, Q: -0.030, f: 0.02 },
      { id: "DA", L: 600, D: 0.25, Q: -0.050, f: 0.02 }
    ];
    sample.forEach(p => this.addPipeRow(p.id, p.L, p.D, p.Q, p.f));
    if (typeof showToast === "function") {
      showToast("Sample 4-pipe loop loaded!", "info");
    }
  }

  // Calculate resistance r = (8 * f * L) / (pi^2 * g * D^5) approx (f * L) / (12.103 * D^5)
  calculateResistance(L, D, f) {
    const g = 9.81;
    const numerator = 8 * f * L;
    const denominator = Math.PI * Math.PI * g * Math.pow(D, 5);
    return numerator / denominator;
  }

  getPipeInputs() {
    const rows = this.tableBody.querySelectorAll("tr");
    const pipes = [];
    let isValid = true;

    rows.forEach(tr => {
      const id = tr.querySelector(".pipe-id").value.trim() || "Pipe";
      const L = parseFloat(tr.querySelector(".pipe-length").value);
      let D = parseFloat(tr.querySelector(".pipe-diameter").value);
      const Q = parseFloat(tr.querySelector(".pipe-flow").value);
      const f = parseFloat(tr.querySelector(".pipe-friction").value);

      if (isNaN(L) || L <= 0 || isNaN(D) || D <= 0 || isNaN(Q) || isNaN(f) || f <= 0) {
        isValid = false;
        tr.classList.add("table-danger");
      } else {
        tr.classList.remove("table-danger");
        // If student entered D > 10 (likely mm instead of m), auto-convert
        if (D > 5) {
          D = D / 1000;
        }
        const r = this.calculateResistance(L, D, f);
        tr.querySelector(".pipe-resistance-cell").textContent = r.toFixed(2);
        pipes.push({ id, L, D, Q, f, r, currentQ: Q });
      }
    });

    if (!isValid || pipes.length < 2) {
      if (typeof showToast === "function") {
        showToast(pipes.length < 2 ? t("alertMinPipes") : t("alertFillAllFields"), "danger");
      }
      return null;
    }
    return pipes;
  }

  solve() {
    const pipes = this.getPipeInputs();
    if (!pipes) return;

    const iterations = [];
    let isBalanced = false;
    let iterationCount = 0;
    let lastDeltaQ = 0;
    let finalSumHf = 0;

    // Hardy Cross Iterative Loop
    while (iterationCount < this.maxIterations) {
      iterationCount++;
      let sumHf = 0;
      let sumHfOverQ = 0;
      const stepData = [];

      pipes.forEach(pipe => {
        const Q = pipe.currentQ;
        const sign = Q >= 0 ? 1 : -1;
        // Head loss: hf = r * Q * |Q|
        const hf = pipe.r * Q * Math.abs(Q);
        // Derivative term: 2 * r * |Q| = |2 * hf / Q|
        const deriv = 2 * pipe.r * Math.abs(Q);

        sumHf += hf;
        sumHfOverQ += deriv;

        stepData.push({
          id: pipe.id,
          L: pipe.L,
          D: pipe.D,
          f: pipe.f,
          r: pipe.r,
          Q: Q,
          hf: hf,
          deriv: deriv
        });
      });

      // Loop correction factor Delta Q = - Sum(hf) / Sum(2 * r * |Q|)
      const deltaQ = sumHfOverQ !== 0 ? - (sumHf / sumHfOverQ) : 0;
      lastDeltaQ = deltaQ;
      finalSumHf = sumHf;

      // Apply correction to each pipe
      pipes.forEach((pipe, idx) => {
        pipe.currentQ = pipe.currentQ + deltaQ;
        stepData[idx].nextQ = pipe.currentQ;
        stepData[idx].deltaQ = deltaQ;
      });

      iterations.push({
        iterNum: iterationCount,
        sumHf: sumHf,
        sumHfOverQ: sumHfOverQ,
        deltaQ: deltaQ,
        rows: stepData
      });

      // Convergence test
      if (Math.abs(deltaQ) < this.tolerance) {
        isBalanced = true;
        break;
      }
    }

    this.renderResults(iterations, pipes, isBalanced, lastDeltaQ, finalSumHf);
    
    // Animate pressure gauge based on head loss magnitude
    if (typeof updatePressureGauge === "function") {
      const avgHf = pipes.reduce((acc, p) => acc + Math.abs(p.r * p.currentQ * p.currentQ), 0) / pipes.length;
      updatePressureGauge(avgHf);
    }

    if (isBalanced && typeof confetti === "function") {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  }

  renderResults(iterations, finalPipes, isBalanced, lastDeltaQ, finalSumHf) {
    if (!this.resultsContainer) return;
    this.resultsContainer.classList.remove("d-none");

    const statusBadgeHtml = isBalanced 
      ? `<span class="status-badge-balanced"><i class="bi bi-check-circle-fill"></i> ${t("statusBalanced")}</span>`
      : `<span class="status-badge-notbalanced"><i class="bi bi-exclamation-triangle-fill"></i> ${t("statusNotBalanced")}</span>`;

    const statusDesc = isBalanced ? t("statusBalancedDesc") : t("statusNotBalancedDesc");

    // Top Summary Metric Cards
    let html = `
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-cyan">
            <div class="metric-card-value">${iterations.length}</div>
            <div class="metric-card-label">${t("cardIterationsCount")}</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-green">
            <div class="metric-card-value">${Math.abs(lastDeltaQ).toFixed(5)} <span class="fs-6">m³/s</span></div>
            <div class="metric-card-label">${t("cardFlowCorrection")}</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-amber">
            <div class="metric-card-value">${finalSumHf.toFixed(4)} <span class="fs-6">m</span></div>
            <div class="metric-card-label">${t("cardTotalHeadLoss")}</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card" style="border-left: 4px solid ${isBalanced ? 'var(--accent-green)' : 'var(--accent-rose)'};">
            <div class="metric-card-value fs-5 mt-1">${statusBadgeHtml}</div>
            <div class="metric-card-label mt-2">${statusDesc}</div>
          </div>
        </div>
      </div>

      <!-- Final Balanced Discharges Table -->
      <div class="glass-card mb-4">
        <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-water text-info"></i> ${t("finalFlowSummary")}
        </h5>
        <div class="table-responsive">
          <table class="table table-hydraulic">
            <thead>
              <tr>
                <th>${t("thPipeId")}</th>
                <th>${t("thLength")}</th>
                <th>${t("thDiameter")}</th>
                <th>${t("thFriction")}</th>
                <th>${t("thResistance")}</th>
                <th>${t("thNewQ")}</th>
                <th>Flow (L/s)</th>
                <th>Flow Direction</th>
                <th>Head Loss hf (m)</th>
              </tr>
            </thead>
            <tbody>
    `;

    finalPipes.forEach(p => {
      const qM3 = p.currentQ;
      const qLps = qM3 * 1000;
      const dirText = qM3 >= 0 
        ? `<span class="badge bg-primary-subtle text-primary border border-primary"><i class="bi bi-arrow-clockwise"></i> Clockwise (+)</span>` 
        : `<span class="badge bg-warning-subtle text-warning border border-warning"><i class="bi bi-arrow-counterclockwise"></i> Counter-CW (-)</span>`;
      const hf = p.r * qM3 * Math.abs(qM3);

      html += `
        <tr>
          <td class="fw-bold text-info">${p.id}</td>
          <td class="font-mono">${p.L.toFixed(1)}</td>
          <td class="font-mono">${p.D.toFixed(3)}</td>
          <td class="font-mono">${p.f.toFixed(4)}</td>
          <td class="font-mono">${p.r.toFixed(1)}</td>
          <td class="font-mono fw-bold text-success">${qM3.toFixed(5)}</td>
          <td class="font-mono fw-bold">${qLps.toFixed(2)}</td>
          <td>${dirText}</td>
          <td class="font-mono ${hf >= 0 ? 'text-info' : 'text-warning'}">${hf.toFixed(4)}</td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>
      </div>

      <!-- Iteration-by-Iteration Breakdown Tabs -->
      <div class="glass-card mb-4">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h5 class="fw-bold mb-0 d-flex align-items-center gap-2">
            <i class="bi bi-calculator text-info"></i> Iteration Breakdown & Steps
          </h5>
          <ul class="nav nav-pills nav-pills-hydraulic" id="hardyIterTabs" role="tablist">
    `;

    iterations.forEach((it, idx) => {
      html += `
        <li class="nav-item" role="presentation">
          <button class="nav-link ${idx === 0 ? 'active' : ''}" id="tab-iter-${it.iterNum}" data-bs-toggle="pill" data-bs-target="#pane-iter-${it.iterNum}" type="button" role="tab">
            Iter ${it.iterNum}
          </button>
        </li>
      `;
    });

    html += `
          </ul>
        </div>
        <div class="tab-content" id="hardyIterPanes">
    `;

    iterations.forEach((it, idx) => {
      html += `
        <div class="tab-pane fade ${idx === 0 ? 'show active' : ''}" id="pane-iter-${it.iterNum}" role="tabpanel">
          <div class="step-box mb-3">
            <div class="d-flex justify-content-between flex-wrap gap-2">
              <span><strong>Iteration ${it.iterNum}:</strong> &Sigma; h<sub>f</sub> = <code class="formula">${it.sumHf.toFixed(5)} m</code>, &Sigma; 2r|Q| = <code class="formula">${it.sumHfOverQ.toFixed(5)}</code></span>
              <span><strong>Correction:</strong> &Delta;Q = -(${it.sumHf.toFixed(5)}) / (${it.sumHfOverQ.toFixed(5)}) = <code class="formula text-success">${it.deltaQ.toFixed(6)} m³/s</code></span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hydraulic">
              <thead>
                <tr>
                  <th>${t("thPipeId")}</th>
                  <th>Length L (m)</th>
                  <th>Dia D (m)</th>
                  <th>Resistance r</th>
                  <th>Initial Q (m³/s)</th>
                  <th>h<sub>f</sub> = r·Q·|Q| (m)</th>
                  <th>2·r·|Q|</th>
                  <th>&Delta;Q (m³/s)</th>
                  <th>Corrected Q<sub>new</sub> (m³/s)</th>
                </tr>
              </thead>
              <tbody>
      `;

      it.rows.forEach(r => {
        html += `
          <tr>
            <td class="fw-bold text-info">${r.id}</td>
            <td class="font-mono">${r.L.toFixed(1)}</td>
            <td class="font-mono">${r.D.toFixed(3)}</td>
            <td class="font-mono">${r.r.toFixed(1)}</td>
            <td class="font-mono">${r.Q.toFixed(5)}</td>
            <td class="font-mono ${r.hf >= 0 ? 'text-info' : 'text-warning'}">${r.hf.toFixed(5)}</td>
            <td class="font-mono">${r.deriv.toFixed(4)}</td>
            <td class="font-mono text-warning">${r.deltaQ.toFixed(6)}</td>
            <td class="font-mono fw-bold text-success">${r.nextQ.toFixed(5)}</td>
          </tr>
        `;
      });

      html += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.resultsContainer.innerHTML = html;
    this.resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Global solver instance
let hardySolver = null;
document.addEventListener("DOMContentLoaded", () => {
  hardySolver = new HardyCrossSolver();
});
