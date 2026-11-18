/**
 * HYDROFLOW AI - Equivalent Pipe Method Calculation Engine
 * 
 * Supports:
 *   1. Pipes in Series (Dupuit's Equation: fe*Le / De^5 = Sum(fi*Li / Di^5))
 *   2. Pipes in Parallel (Discharge sum & Equal head loss: De^2.5 / sqrt(fe*Le) = Sum(Di^2.5 / sqrt(fi*Li)))
 */

class EquivalentPipeSolver {
  constructor() {
    this.mode = "series"; // 'series' or 'parallel'
    this.target = "findLe"; // 'findLe' or 'findDe'
    this.tableBody = document.getElementById("equivPipeTableBody");
    this.resultsContainer = document.getElementById("equivPipeResults");
    this.schematicContainer = document.getElementById("pipeSchematicDisplay");
    
    this.initEventListeners();
    this.loadSampleData();
  }

  initEventListeners() {
    // Mode toggling (Series vs Parallel)
    document.getElementById("btnModeSeries")?.addEventListener("click", () => this.setMode("series"));
    document.getElementById("btnModeParallel")?.addEventListener("click", () => this.setMode("parallel"));

    // Target calculation toggling (Find Le vs Find De)
    document.getElementById("targetSelect")?.addEventListener("change", (e) => {
      this.target = e.target.value;
      this.updateTargetInputsUI();
    });

    document.getElementById("btnAddEquivPipe")?.addEventListener("click", () => this.addPipeRow());
    document.getElementById("btnRemoveEquivPipe")?.addEventListener("click", () => this.removePipeRow());
    document.getElementById("btnClearEquiv")?.addEventListener("click", () => this.clearTable());
    document.getElementById("btnSolveEquiv")?.addEventListener("click", () => this.solve());
    document.getElementById("btnPresetEquiv")?.addEventListener("click", () => this.loadSampleData());
  }

  setMode(newMode) {
    this.mode = newMode;
    const btnSeries = document.getElementById("btnModeSeries");
    const btnParallel = document.getElementById("btnModeParallel");

    if (newMode === "series") {
      btnSeries?.classList.add("active");
      btnParallel?.classList.remove("active");
    } else {
      btnParallel?.classList.add("active");
      btnSeries?.classList.remove("active");
    }

    this.loadSampleData();
  }

  updateTargetInputsUI() {
    const diaWrapper = document.getElementById("targetDiaWrapper");
    const lenWrapper = document.getElementById("targetLenWrapper");

    if (this.target === "findLe") {
      diaWrapper?.classList.remove("d-none");
      lenWrapper?.classList.add("d-none");
    } else {
      diaWrapper?.classList.add("d-none");
      lenWrapper?.classList.remove("d-none");
    }
  }

  addPipeRow(id = "", L = "", D = "", f = "0.02") {
    if (!this.tableBody) return;
    const count = this.tableBody.querySelectorAll("tr").length + 1;
    const prefix = this.mode === "series" ? "Sec" : "Branch";
    const pipeId = id || `${prefix}-${count}`;

    const tr = document.createElement("tr");
    tr.className = "equiv-pipe-row";
    tr.innerHTML = `
      <td>
        <input type="text" class="form-control form-control-sm form-control-custom font-mono text-center pipe-id" value="${pipeId}" placeholder="P-${count}">
      </td>
      <td>
        <input type="number" step="any" class="form-control form-control-sm form-control-custom font-mono text-center pipe-length" value="${L}" placeholder="m" required>
      </td>
      <td>
        <input type="number" step="any" class="form-control form-control-sm form-control-custom font-mono text-center pipe-diameter" value="${D}" placeholder="m" required>
      </td>
      <td>
        <input type="number" step="any" class="form-control form-control-sm form-control-custom font-mono text-center pipe-friction" value="${f}" placeholder="0.02" required>
      </td>
      <td class="text-center font-mono text-muted equiv-ratio-cell">-</td>
      <td class="text-center">
        <button type="button" class="btn btn-sm btn-outline-danger btn-icon" title="Remove" onclick="this.closest('tr').remove();">
          <i class="bi bi-trash3"></i>
        </button>
      </td>
    `;
    this.tableBody.appendChild(tr);
  }

  removePipeRow() {
    const rows = this.tableBody?.querySelectorAll("tr");
    if (rows && rows.length > 2) {
      rows[rows.length - 1].remove();
    } else {
      if (typeof showToast === "function") {
        showToast("Compound systems require at least 2 pipes.", "warning");
      }
    }
  }

  clearTable() {
    if (this.tableBody) {
      this.tableBody.innerHTML = "";
    }
    this.resultsContainer?.classList.add("d-none");
  }

  loadSampleData() {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = "";

    if (this.mode === "series") {
      // Classic series compound pipe: 3 sections carrying 0.08 m³/s
      const sampleSeries = [
        { id: "S1", L: 300, D: 0.30, f: 0.02 },
        { id: "S2", L: 200, D: 0.20, f: 0.02 },
        { id: "S3", L: 400, D: 0.25, f: 0.02 }
      ];
      sampleSeries.forEach(p => this.addPipeRow(p.id, p.L, p.D, p.f));
      
      const inputQ = document.getElementById("equivTotalQ");
      const inputDe = document.getElementById("targetDeInput");
      const inputFe = document.getElementById("equivFeInput");
      if (inputQ) inputQ.value = "0.08";
      if (inputDe) inputDe.value = "0.30";
      if (inputFe) inputFe.value = "0.02";

    } else {
      // Classic parallel pipe system: 2 branches carrying 0.12 m³/s
      const sampleParallel = [
        { id: "Branch-1", L: 600, D: 0.30, f: 0.02 },
        { id: "Branch-2", L: 800, D: 0.40, f: 0.02 }
      ];
      sampleParallel.forEach(p => this.addPipeRow(p.id, p.L, p.D, p.f));

      const inputQ = document.getElementById("equivTotalQ");
      const inputDe = document.getElementById("targetDeInput");
      const inputFe = document.getElementById("equivFeInput");
      if (inputQ) inputQ.value = "0.12";
      if (inputDe) inputDe.value = "0.35";
      if (inputFe) inputFe.value = "0.02";
    }

    if (typeof showToast === "function") {
      showToast(`${this.mode === 'series' ? 'Series' : 'Parallel'} sample loaded!`, "info");
    }
  }

  getPipes() {
    const rows = this.tableBody.querySelectorAll("tr");
    const pipes = [];
    let isValid = true;

    rows.forEach(tr => {
      const id = tr.querySelector(".pipe-id").value.trim() || "P";
      const L = parseFloat(tr.querySelector(".pipe-length").value);
      let D = parseFloat(tr.querySelector(".pipe-diameter").value);
      const f = parseFloat(tr.querySelector(".pipe-friction").value);

      if (isNaN(L) || L <= 0 || isNaN(D) || D <= 0 || isNaN(f) || f <= 0) {
        isValid = false;
        tr.classList.add("table-danger");
      } else {
        tr.classList.remove("table-danger");
        if (D > 5) D = D / 1000; // Auto-convert mm to m
        pipes.push({ id, L, D, f });
      }
    });

    if (!isValid || pipes.length < 2) {
      if (typeof showToast === "function") {
        showToast(pipes.length < 2 ? "Minimum 2 pipe sections required." : t("alertFillAllFields"), "danger");
      }
      return null;
    }
    return pipes;
  }

  solve() {
    const pipes = this.getPipes();
    if (!pipes) return;

    const totalQ = parseFloat(document.getElementById("equivTotalQ").value) || 0.05;
    const fe = parseFloat(document.getElementById("equivFeInput").value) || 0.02;

    if (this.mode === "series") {
      this.solveSeries(pipes, totalQ, fe);
    } else {
      this.solveParallel(pipes, totalQ, fe);
    }
  }

  solveSeries(pipes, Q, fe) {
    const targetSelect = document.getElementById("targetSelect").value;
    let Le = 0;
    let De = 0;
    let sumTerms = 0;
    const pipeDetails = [];
    let totalHeadLoss = 0;

    // Sum Dupuit terms: Sum(fi * Li / Di^5)
    pipes.forEach(p => {
      const term = (p.f * p.L) / Math.pow(p.D, 5);
      sumTerms += term;

      // Section head loss: hf = (f * L * Q^2) / (12.103 * D^5)
      const hf = (p.f * p.L * Math.pow(Q, 2)) / (12.103 * Math.pow(p.D, 5));
      totalHeadLoss += hf;

      pipeDetails.push({
        id: p.id,
        L: p.L,
        D: p.D,
        f: p.f,
        term: term,
        hf: hf
      });
    });

    if (targetSelect === "findLe") {
      De = parseFloat(document.getElementById("targetDeInput").value);
      if (isNaN(De) || De <= 0) De = pipes[0].D;
      if (De > 5) De = De / 1000;
      // Le = (De^5 / fe) * Sum(fi * Li / Di^5)
      Le = (Math.pow(De, 5) / fe) * sumTerms;
    } else {
      Le = parseFloat(document.getElementById("targetLeInput").value);
      if (isNaN(Le) || Le <= 0) Le = pipes.reduce((acc, p) => acc + p.L, 0);
      // De = [ (fe * Le) / Sum(fi * Li / Di^5) ]^0.2
      De = Math.pow((fe * Le) / sumTerms, 0.2);
    }

    this.renderSeriesResults({
      pipes: pipeDetails,
      Q: Q,
      fe: fe,
      De: De,
      Le: Le,
      sumTerms: sumTerms,
      totalHeadLoss: totalHeadLoss,
      targetSelect: targetSelect
    });

    this.renderSchematic("series", pipes, De, Le);

    if (typeof updatePressureGauge === "function") {
      updatePressureGauge(totalHeadLoss);
    }
  }

  solveParallel(pipes, Q, fe) {
    const targetSelect = document.getElementById("targetSelect").value;
    let Le = 0;
    let De = 0;
    let sumConductance = 0;
    const pipeDetails = [];

    // Parallel conveyance Ki = sqrt(12.103 * Di^5 / (fi * Li))
    // Or simplified ratio term: Di^2.5 / sqrt(fi * Li)
    pipes.forEach(p => {
      const term = Math.pow(p.D, 2.5) / Math.sqrt(p.f * p.L);
      sumConductance += term;
      pipeDetails.push({
        id: p.id,
        L: p.L,
        D: p.D,
        f: p.f,
        term: term
      });
    });

    // Flow distribution: Qi = Q * (term_i / sumConductance)
    let systemHeadLoss = 0;
    pipeDetails.forEach(p => {
      p.Qi = Q * (p.term / sumConductance);
      // Head loss across this branch: hf = (f * L * Qi^2) / (12.103 * D^5)
      p.hf = (p.f * p.L * Math.pow(p.Qi, 2)) / (12.103 * Math.pow(p.D, 5));
    });

    systemHeadLoss = pipeDetails[0].hf;

    if (targetSelect === "findLe") {
      De = parseFloat(document.getElementById("targetDeInput").value);
      if (isNaN(De) || De <= 0) De = pipes[0].D;
      if (De > 5) De = De / 1000;
      // De^2.5 / sqrt(fe * Le) = sumConductance
      // sqrt(Le) = De^2.5 / (sqrt(fe) * sumConductance)
      const sqrtLe = Math.pow(De, 2.5) / (Math.sqrt(fe) * sumConductance);
      Le = Math.pow(sqrtLe, 2);
    } else {
      Le = parseFloat(document.getElementById("targetLeInput").value);
      if (isNaN(Le) || Le <= 0) Le = pipes[0].L;
      // De^2.5 = sqrt(fe * Le) * sumConductance
      // De = [ sqrt(fe * Le) * sumConductance ]^(1 / 2.5) = [ ... ]^0.4
      De = Math.pow(Math.sqrt(fe * Le) * sumConductance, 0.4);
    }

    this.renderParallelResults({
      pipes: pipeDetails,
      Q: Q,
      fe: fe,
      De: De,
      Le: Le,
      sumConductance: sumConductance,
      systemHeadLoss: systemHeadLoss,
      targetSelect: targetSelect
    });

    this.renderSchematic("parallel", pipes, De, Le);

    if (typeof updatePressureGauge === "function") {
      updatePressureGauge(systemHeadLoss);
    }
  }

  renderSeriesResults(data) {
    if (!this.resultsContainer) return;
    this.resultsContainer.classList.remove("d-none");

    const html = `
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-cyan">
            <div class="metric-card-value">${data.De.toFixed(4)} <span class="fs-6">m</span></div>
            <div class="metric-card-label">${t("cardEquivDiaResult")} (${(data.De * 1000).toFixed(1)} mm)</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-green">
            <div class="metric-card-value">${data.Le.toFixed(2)} <span class="fs-6">m</span></div>
            <div class="metric-card-label">${t("cardEquivLenResult")}</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-amber">
            <div class="metric-card-value">${data.totalHeadLoss.toFixed(4)} <span class="fs-6">m</span></div>
            <div class="metric-card-label">${t("cardTotalHeadLossResult")}</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card" style="border-left: 4px solid var(--water-blue);">
            <div class="metric-card-value">${data.Q.toFixed(4)} <span class="fs-6">m³/s</span></div>
            <div class="metric-card-label">${t("cardTotalDischargeResult")} (${(data.Q * 1000).toFixed(1)} L/s)</div>
          </div>
        </div>
      </div>

      <!-- Step-by-Step Derivation Box -->
      <div class="glass-card mb-4">
        <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-file-earmark-text text-info"></i> ${t("stepByStepDerivation")} (Dupuit's Equation)
        </h5>
        <div class="step-box">
          <p class="mb-1"><strong>1. Fundamental Series Law:</strong> Flow rate is identical through all sections: <code>Q₁ = Q₂ = ... = Q = ${data.Q} m³/s</code></p>
          <p class="mb-1"><strong>2. Total Head Loss:</strong> H<sub>L</sub> = h<sub>f1</sub> + h<sub>f2</sub> + ... = &Sigma; [ (f<sub>i</sub> · L<sub>i</sub> · Q²) / (12.1 · D<sub>i</sub>⁵) ] = <code class="formula">${data.totalHeadLoss.toFixed(4)} m</code></p>
          <p class="mb-1"><strong>3. Dupuit's Equivalent Expression:</strong></p>
          <div class="p-2 my-2 bg-dark rounded font-mono text-info border border-secondary">
            (f<sub>e</sub> · L<sub>e</sub>) / D<sub>e</sub>⁵ = &Sigma; [ (f<sub>i</sub> · L<sub>i</sub>) / D<sub>i</sub>⁵ ] = ${data.sumTerms.toFixed(2)}
          </div>
          <p class="mb-0">
            ${data.targetSelect === 'findLe' 
              ? `Given equivalent diameter <code>D<sub>e</sub> = ${data.De.toFixed(3)} m</code>, solving for equivalent length:<br>
                 <code class="formula">L<sub>e</sub> = (D<sub>e</sub>⁵ / f<sub>e</sub>) · &Sigma; [ f<sub>i</sub>·L<sub>i</sub> / D<sub>i</sub>⁵ ] = (${Math.pow(data.De,5).toExponential(4)} / ${data.fe}) · ${data.sumTerms.toFixed(2)} = <strong>${data.Le.toFixed(2)} meters</strong></code>`
              : `Given equivalent length <code>L<sub>e</sub> = ${data.Le.toFixed(2)} m</code>, solving for equivalent diameter:<br>
                 <code class="formula">D<sub>e</sub> = [ (f<sub>e</sub> · L<sub>e</sub>) / &Sigma;(f<sub>i</sub>·L<sub>i</sub>/D<sub>i</sub>⁵) ]<sup>0.2</sup> = [ (${data.fe} · ${data.Le.toFixed(2)}) / ${data.sumTerms.toFixed(2)} ]<sup>0.2</sup> = <strong>${data.De.toFixed(4)} meters (${(data.De*1000).toFixed(1)} mm)</strong></code>`
            }
          </p>
        </div>

        <h6 class="fw-bold mt-4 mb-2">Section-by-Section Head Loss Breakdown:</h6>
        <div class="table-responsive">
          <table class="table table-hydraulic">
            <thead>
              <tr>
                <th>Section</th>
                <th>Length L (m)</th>
                <th>Dia D (m)</th>
                <th>f</th>
                <th>(f·L)/D⁵</th>
                <th>Head Loss h<sub>f</sub> (m)</th>
                <th>% of Total Loss</th>
              </tr>
            </thead>
            <tbody>
              ${data.pipes.map(p => `
                <tr>
                  <td class="fw-bold text-info">${p.id}</td>
                  <td class="font-mono">${p.L.toFixed(1)}</td>
                  <td class="font-mono">${p.D.toFixed(3)}</td>
                  <td class="font-mono">${p.f.toFixed(4)}</td>
                  <td class="font-mono">${p.term.toFixed(1)}</td>
                  <td class="font-mono fw-bold text-warning">${p.hf.toFixed(4)}</td>
                  <td class="font-mono">${((p.hf / data.totalHeadLoss) * 100).toFixed(1)}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.resultsContainer.innerHTML = html;
    this.resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  renderParallelResults(data) {
    if (!this.resultsContainer) return;
    this.resultsContainer.classList.remove("d-none");

    const html = `
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-cyan">
            <div class="metric-card-value">${data.De.toFixed(4)} <span class="fs-6">m</span></div>
            <div class="metric-card-label">${t("cardEquivDiaResult")} (${(data.De * 1000).toFixed(1)} mm)</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-green">
            <div class="metric-card-value">${data.Le.toFixed(2)} <span class="fs-6">m</span></div>
            <div class="metric-card-label">${t("cardEquivLenResult")}</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card accent-amber">
            <div class="metric-card-value">${data.systemHeadLoss.toFixed(4)} <span class="fs-6">m</span></div>
            <div class="metric-card-label">${t("cardTotalHeadLossResult")} (Across All Branches)</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="metric-card" style="border-left: 4px solid var(--water-blue);">
            <div class="metric-card-value">${data.Q.toFixed(4)} <span class="fs-6">m³/s</span></div>
            <div class="metric-card-label">${t("cardTotalDischargeResult")} (${(data.Q * 1000).toFixed(1)} L/s)</div>
          </div>
        </div>
      </div>

      <!-- Step-by-Step Derivation Box -->
      <div class="glass-card mb-4">
        <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-file-earmark-text text-info"></i> ${t("stepByStepDerivation")} (Parallel Network)
        </h5>
        <div class="step-box">
          <p class="mb-1"><strong>1. Fundamental Parallel Law:</strong> Head loss is equal across all branches: <code>h<sub>f1</sub> = h<sub>f2</sub> = ... = H<sub>L</sub> = ${data.systemHeadLoss.toFixed(4)} m</code></p>
          <p class="mb-1"><strong>2. Flow Continuity:</strong> Total discharge splits across branches: <code>Q = &Sigma; Q<sub>i</sub> = ${data.Q} m³/s</code></p>
          <p class="mb-1"><strong>3. Equivalent Flow Conductance Formula:</strong></p>
          <div class="p-2 my-2 bg-dark rounded font-mono text-info border border-secondary">
            D<sub>e</sub><sup>2.5</sup> / &radic;(f<sub>e</sub> · L<sub>e</sub>) = &Sigma; [ D<sub>i</sub><sup>2.5</sup> / &radic;(f<sub>i</sub> · L<sub>i</sub>) ] = ${data.sumConductance.toFixed(4)}
          </div>
          <p class="mb-0">
            ${data.targetSelect === 'findLe' 
              ? `Given equivalent diameter <code>D<sub>e</sub> = ${data.De.toFixed(3)} m</code>, solving for equivalent length:<br>
                 <code class="formula">L<sub>e</sub> = [ D<sub>e</sub><sup>2.5</sup> / (&radic;f<sub>e</sub> · &Sigma;k<sub>i</sub>) ]² = <strong>${data.Le.toFixed(2)} meters</strong></code>`
              : `Given equivalent length <code>L<sub>e</sub> = ${data.Le.toFixed(2)} m</code>, solving for equivalent diameter:<br>
                 <code class="formula">D<sub>e</sub> = [ &radic;(f<sub>e</sub> · L<sub>e</sub>) · &Sigma;k<sub>i</sub> ]<sup>0.4</sup> = <strong>${data.De.toFixed(4)} meters (${(data.De*1000).toFixed(1)} mm)</strong></code>`
            }
          </p>
        </div>

        <h6 class="fw-bold mt-4 mb-2">${t("branchDistributionTitle")}:</h6>
        <div class="table-responsive">
          <table class="table table-hydraulic">
            <thead>
              <tr>
                <th>Branch</th>
                <th>Length L (m)</th>
                <th>Dia D (m)</th>
                <th>Conductance k<sub>i</sub></th>
                <th>Discharge Q<sub>i</sub> (m³/s)</th>
                <th>Discharge (L/s)</th>
                <th>% of Total Q</th>
                <th>Branch h<sub>f</sub> (m)</th>
              </tr>
            </thead>
            <tbody>
              ${data.pipes.map(p => `
                <tr>
                  <td class="fw-bold text-info">${p.id}</td>
                  <td class="font-mono">${p.L.toFixed(1)}</td>
                  <td class="font-mono">${p.D.toFixed(3)}</td>
                  <td class="font-mono">${p.term.toFixed(4)}</td>
                  <td class="font-mono fw-bold text-success">${p.Qi.toFixed(5)}</td>
                  <td class="font-mono fw-bold">${(p.Qi * 1000).toFixed(2)}</td>
                  <td class="font-mono">${((p.Qi / data.Q) * 100).toFixed(1)}%</td>
                  <td class="font-mono text-warning">${p.hf.toFixed(4)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.resultsContainer.innerHTML = html;
    this.resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  renderSchematic(type, pipes, De, Le) {
    if (!this.schematicContainer) return;

    if (type === "series") {
      // Draw Series SVG Pipeline
      let svgContent = `
        <svg viewBox="0 0 650 160" width="100%" height="160" class="pipe-svg">
          <defs>
            <linearGradient id="pipeMetalGrad" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stop-color="#1e3a5f"/>
              <stop offset="50%" stop-color="#2a5282"/>
              <stop offset="100%" stop-color="#0f223d"/>
            </linearGradient>
            <linearGradient id="pipeEquivGrad" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stop-color="#0284c7"/>
              <stop offset="50%" stop-color="#00f0ff"/>
              <stop offset="100%" stop-color="#0369a1"/>
            </linearGradient>
          </defs>
          <!-- Compound Pipe Pipeline -->
          <text x="10" y="25" fill="#00f0ff" font-weight="700" font-size="12">COMPOUND PIPES IN SERIES</text>
      `;

      let startX = 20;
      const totalWidth = 600;
      const totalLength = pipes.reduce((acc, p) => acc + p.L, 0);

      pipes.forEach((p, idx) => {
        const segWidth = Math.max(70, (p.L / totalLength) * totalWidth);
        const pipeHeight = Math.min(48, Math.max(16, p.D * 80));
        const pipeY = 60 - pipeHeight / 2;

        svgContent += `
          <g>
            <rect x="${startX}" y="${pipeY}" width="${segWidth}" height="${pipeHeight}" rx="4" fill="url(#pipeMetalGrad)" stroke="#00b4d8" stroke-width="1.5"/>
            <!-- Water flow center line -->
            <line x1="${startX}" y1="60" x2="${startX + segWidth}" y2="60" stroke="#00f0ff" stroke-width="2" class="water-flow-path"/>
            <text x="${startX + segWidth / 2}" y="63" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle" font-weight="600">${p.id}: D=${p.D}m, L=${p.L}m</text>
          </g>
        `;
        startX += segWidth;
      });

      // Equivalent Pipe below
      const eqHeight = Math.min(48, Math.max(16, De * 80));
      svgContent += `
        <text x="10" y="112" fill="#10b981" font-weight="700" font-size="12">EQUIVALENT UNIFORM PIPE</text>
        <rect x="20" y="${135 - eqHeight / 2}" width="600" height="${eqHeight}" rx="4" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2"/>
        <line x1="20" y1="135" x2="620" y2="135" stroke="#10b981" stroke-width="2.5" class="water-flow-path"/>
        <text x="320" y="139" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle" font-weight="700">De = ${De.toFixed(3)} m (${(De*1000).toFixed(0)} mm) | Le = ${Le.toFixed(1)} m</text>
      </svg>
      `;

      this.schematicContainer.innerHTML = svgContent;

    } else {
      // Draw Parallel SVG Pipeline
      let svgContent = `
        <svg viewBox="0 0 650 210" width="100%" height="210" class="pipe-svg">
          <defs>
            <linearGradient id="pipeParallelGrad" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stop-color="#1e3a5f"/>
              <stop offset="50%" stop-color="#2a5282"/>
              <stop offset="100%" stop-color="#0f223d"/>
            </linearGradient>
          </defs>
          <!-- Main Inlet -->
          <rect x="15" y="75" width="60" height="30" fill="url(#pipeParallelGrad)" stroke="#00f0ff" stroke-width="1.5"/>
          <line x1="15" y1="90" x2="75" y2="90" stroke="#00f0ff" stroke-width="2.5" class="water-flow-path"/>
          <text x="45" y="82" fill="#00f0ff" font-size="9" text-anchor="middle">Inlet Q</text>

          <!-- Junction Box Left -->
          <rect x="75" y="25" width="20" height="130" fill="#0f223d" stroke="#00b4d8" stroke-width="1.5"/>

          <!-- Junction Box Right -->
          <rect x="520" y="25" width="20" height="130" fill="#0f223d" stroke="#00b4d8" stroke-width="1.5"/>

          <!-- Main Outlet -->
          <rect x="540" y="75" width="60" height="30" fill="url(#pipeParallelGrad)" stroke="#00f0ff" stroke-width="1.5"/>
          <line x1="540" y1="90" x2="600" y2="90" stroke="#00f0ff" stroke-width="2.5" class="water-flow-path"/>
          <text x="570" y="82" fill="#00f0ff" font-size="9" text-anchor="middle">Outlet Q</text>
      `;

      const branchSpacing = 110 / (pipes.length);
      pipes.forEach((p, idx) => {
        const branchY = 40 + idx * 60;
        const bHeight = Math.min(32, Math.max(14, p.D * 70));

        svgContent += `
          <g>
            <rect x="95" y="${branchY - bHeight / 2}" width="425" height="${bHeight}" fill="url(#pipeParallelGrad)" stroke="#00b4d8" stroke-width="1"/>
            <line x1="95" y1="${branchY}" x2="520" y2="${branchY}" stroke="#00f0ff" stroke-width="2" class="water-flow-path"/>
            <text x="307" y="${branchY + 4}" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">${p.id}: D=${p.D}m, L=${p.L}m (Q=${p.Qi ? p.Qi.toFixed(4) : '-'} m³/s)</text>
          </g>
        `;
      });

      // Equivalent bar at bottom
      svgContent += `
        <text x="20" y="180" fill="#10b981" font-weight="700" font-size="11">EQUIVALENT SINGLE PIPE:</text>
        <rect x="180" y="170" width="400" height="20" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.5" rx="3"/>
        <line x1="180" y1="180" x2="580" y2="180" stroke="#10b981" stroke-width="2" class="water-flow-path"/>
        <text x="380" y="184" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">De = ${De.toFixed(3)} m (${(De*1000).toFixed(0)} mm) | Le = ${Le.toFixed(1)} m</text>
      </svg>
      `;

      this.schematicContainer.innerHTML = svgContent;
    }
  }
}

// Global solver instance
let equivSolver = null;
document.addEventListener("DOMContentLoaded", () => {
  equivSolver = new EquivalentPipeSolver();
});
