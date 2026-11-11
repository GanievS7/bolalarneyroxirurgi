'use strict';
// Specialty-themed background motion:
//  • NeuralField — drifting neurons with dendrites; nerve impulses travel along synapses and
//    propagate from cell to cell (chain reaction). Reacts to the pointer on desktop.
//  • IonmMonitor — neuromonitoring workstation: free-run EMG, MEP waterfall, SSEP, triggered EMG.
// Both pause off-screen or in a hidden tab, cap device pixel ratio, and render a single
// static frame when the visitor prefers reduced motion.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const rand = (a, b) => a + Math.random() * (b - a);
  const dprOf = () => Math.min(window.devicePixelRatio || 1, 1.5);

  function glowSprite(rgb) {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${rgb},0.95)`);
    grad.addColorStop(0.25, `rgba(${rgb},0.35)`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }

  function lifecycle(target, canvas) {
    let visible = false;
    const sync = () => (visible && !document.hidden && !reduce.matches ? target.start() : target.stop());
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { rootMargin: '80px' }).observe(canvas);
    } else { visible = true; }
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener?.('change', () => { target.resize(); sync(); });
    let timer = 0;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(() => { target.resize(); if (!target.running) target.draw(); }, 150); };
    if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(canvas); else window.addEventListener('resize', onResize);
    target.resize();
    target.draw();
    sync();
  }

  class NeuralField {
    constructor(canvas, preset) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.o = preset;
      this.nodes = [];
      this.pulses = [];
      this.edges = [];
      this.adj = [];
      this.pointer = null;
      this.running = false;
      this.last = 0;
      this.spawnClock = 0;
      this.sprite = glowSprite('128,216,255');
      this.spriteMint = glowSprite('94,242,200');
      this.loop = this.loop.bind(this);
      if (preset.interactive && finePointer.matches) {
        window.addEventListener('pointermove', e => {
          const r = this.canvas.getBoundingClientRect();
          const x = e.clientX - r.left, y = e.clientY - r.top;
          this.pointer = x >= 0 && y >= 0 && x <= r.width && y <= r.height ? { x, y, t: performance.now() } : null;
        }, { passive: true });
        window.addEventListener('pointerleave', () => { this.pointer = null; });
      }
    }

    resize() {
      const r = this.canvas.getBoundingClientRect();
      const dpr = dprOf();
      this.w = Math.max(1, r.width);
      this.h = Math.max(1, r.height);
      this.canvas.width = Math.round(this.w * dpr);
      this.canvas.height = Math.round(this.h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = this.w < 700;
      this.link = this.o.link * (small ? 0.82 : 1);
      const count = Math.max(this.o.min, Math.min(this.o.max, Math.round((this.w * this.h) / this.o.area)));
      this.nodes = Array.from({ length: count }, () => {
        const hub = Math.random() < 0.22;
        const branches = hub ? Array.from({ length: 3 + (Math.random() * 3 | 0) }, () => ({ a: rand(0, Math.PI * 2), l: rand(9, 22), bend: rand(-0.5, 0.5) })) : null;
        return { x: rand(0, this.w), y: rand(0, this.h), vx: rand(-1, 1) * this.o.speed, vy: rand(-1, 1) * this.o.speed, r: hub ? rand(1.8, 2.8) : rand(0.9, 1.7), hub, branches, glow: 0, spin: rand(-0.0006, 0.0006) };
      });
      this.pulses = [];
      this.computeEdges();
    }

    computeEdges() {
      const n = this.nodes, L = this.link, L2 = L * L;
      this.edges = [];
      this.adj = n.map(() => []);
      for (let i = 0; i < n.length; i++) {
        for (let j = i + 1; j < n.length; j++) {
          const dx = n[i].x - n[j].x, dy = n[i].y - n[j].y, d2 = dx * dx + dy * dy;
          if (d2 < L2) { const d = Math.sqrt(d2); this.edges.push([i, j, d]); this.adj[i].push(j); this.adj[j].push(i); }
        }
      }
    }

    spawn(from) {
      if (this.pulses.length >= this.o.maxPulses) return;
      const a = from ?? (Math.random() * this.nodes.length | 0);
      const options = this.adj[a];
      if (!options || !options.length) return;
      const b = options[Math.random() * options.length | 0];
      this.pulses.push({ a, b, t: 0, speed: rand(0.55, 1.1) * this.o.pulseSpeed, mint: Math.random() < 0.28, hops: 0 });
    }

    step(dt) {
      const n = this.nodes, w = this.w, h = this.h, p = this.pointer;
      for (const node of n) {
        if (p && performance.now() - p.t < 2500) {
          const dx = p.x - node.x, dy = p.y - node.y, d2 = dx * dx + dy * dy;
          if (d2 < 26000) { node.vx += dx * 0.0000045 * dt; node.vy += dy * 0.0000045 * dt; }
        }
        const sp = Math.hypot(node.vx, node.vy), max = this.o.speed * 1.8;
        if (sp > max) { node.vx *= max / sp; node.vy *= max / sp; }
        node.x += node.vx * dt; node.y += node.vy * dt;
        if (node.x < -20) node.x = w + 20; else if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20; else if (node.y > h + 20) node.y = -20;
        if (node.glow > 0) node.glow = Math.max(0, node.glow - dt * 0.0016);
        if (node.branches) for (const br of node.branches) br.a += node.spin * dt;
      }
      this.computeEdges();
      this.spawnClock += dt;
      const every = 1000 / this.o.pulseRate;
      while (this.spawnClock > every) { this.spawnClock -= every; this.spawn(); }
      const next = [];
      for (const pulse of this.pulses) {
        const A = n[pulse.a], B = n[pulse.b];
        const d = Math.hypot(A.x - B.x, A.y - B.y);
        if (d > this.link * 1.25) continue; // synapse broke while travelling
        pulse.t += (pulse.speed * dt) / Math.max(d, 30);
        if (pulse.t >= 1) {
          B.glow = 1;
          if (pulse.hops < 6 && Math.random() < this.o.chain) {
            const options = this.adj[pulse.b].filter(k => k !== pulse.a);
            if (options.length) next.push({ a: pulse.b, b: options[Math.random() * options.length | 0], t: 0, speed: pulse.speed, mint: pulse.mint, hops: pulse.hops + 1 });
          }
        } else next.push(pulse);
      }
      this.pulses = next.slice(0, this.o.maxPulses);
      if (p && Math.random() < 0.02 * (dt / 16)) {
        let best = -1, bestD = 1e9;
        n.forEach((node, i) => { const d = (node.x - p.x) ** 2 + (node.y - p.y) ** 2; if (d < bestD) { bestD = d; best = i; } });
        if (best >= 0 && bestD < 22000) { n[best].glow = 1; this.spawn(best); }
      }
    }

    draw() {
      const c = this.ctx, n = this.nodes, L = this.link, o = this.o;
      c.clearRect(0, 0, this.w, this.h);
      c.lineWidth = 1;
      for (const [i, j, d] of this.edges) {
        const a = (1 - d / L) * o.lineAlpha;
        if (a < 0.01) continue;
        c.strokeStyle = `rgba(128,216,255,${a.toFixed(3)})`;
        c.beginPath(); c.moveTo(n[i].x, n[i].y); c.lineTo(n[j].x, n[j].y); c.stroke();
      }
      const p = this.pointer;
      if (p && performance.now() - p.t < 2500) {
        for (const node of n) {
          const d = Math.hypot(node.x - p.x, node.y - p.y);
          if (d < 150) { c.strokeStyle = `rgba(160,226,255,${((1 - d / 150) * 0.35).toFixed(3)})`; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(node.x, node.y); c.stroke(); }
        }
      }
      c.lineWidth = 0.8;
      for (const node of n) {
        if (!node.branches) continue;
        c.strokeStyle = `rgba(128,216,255,${(o.nodeAlpha * 0.45 + node.glow * 0.3).toFixed(3)})`;
        for (const br of node.branches) {
          const ex = node.x + Math.cos(br.a) * br.l, ey = node.y + Math.sin(br.a) * br.l;
          const cx = node.x + Math.cos(br.a + br.bend) * br.l * 0.6, cy = node.y + Math.sin(br.a + br.bend) * br.l * 0.6;
          c.beginPath(); c.moveTo(node.x, node.y); c.quadraticCurveTo(cx, cy, ex, ey); c.stroke();
        }
      }
      for (const node of n) {
        if (node.hub || node.glow > 0.05) {
          const s = (node.hub ? 16 : 10) + node.glow * 26;
          c.globalAlpha = (node.hub ? o.nodeAlpha * 0.5 : 0) + node.glow * 0.8;
          c.drawImage(this.sprite, node.x - s / 2, node.y - s / 2, s, s);
          c.globalAlpha = 1;
        }
        c.fillStyle = `rgba(190,236,255,${Math.min(1, o.nodeAlpha + node.glow * 0.5).toFixed(3)})`;
        c.beginPath(); c.arc(node.x, node.y, node.r + node.glow * 1.2, 0, Math.PI * 2); c.fill();
      }
      for (const pulse of this.pulses) {
        const A = n[pulse.a], B = n[pulse.b];
        const x = A.x + (B.x - A.x) * pulse.t, y = A.y + (B.y - A.y) * pulse.t;
        const tx = A.x + (B.x - A.x) * Math.max(0, pulse.t - 0.35), ty = A.y + (B.y - A.y) * Math.max(0, pulse.t - 0.35);
        const grad = c.createLinearGradient(tx, ty, x, y);
        const rgb = pulse.mint ? '94,242,200' : '128,216,255';
        grad.addColorStop(0, `rgba(${rgb},0)`); grad.addColorStop(1, `rgba(${rgb},${o.pulseAlpha})`);
        c.strokeStyle = grad; c.lineWidth = 1.8;
        c.beginPath(); c.moveTo(tx, ty); c.lineTo(x, y); c.stroke();
        const s = 18;
        c.globalAlpha = o.pulseAlpha;
        c.drawImage(pulse.mint ? this.spriteMint : this.sprite, x - s / 2, y - s / 2, s, s);
        c.globalAlpha = 1;
      }
    }

    loop(now) {
      if (!this.running) return;
      const dt = Math.min(48, now - (this.last || now));
      this.last = now;
      this.step(dt);
      this.draw();
      requestAnimationFrame(this.loop);
    }
    start() { if (this.running) return; this.running = true; this.last = 0; requestAnimationFrame(this.loop); }
    stop() { this.running = false; }
  }

  // Neuromonitoring workstation screen, modelled on real IONM / ENMG software:
  //  • Free-run EMG — scrolling raw channels on a pale grid with spontaneous bursts (neurotonic discharges)
  //  • MEP — 2×2 muscle panels, each a waterfall of stacked responses after a stimulus train
  //  • SSEP — averaged evoked potentials (white + magenta overlay) with a latency cursor
  //  • Triggered EMG — probe stimulation readout with the last compound muscle response
  class IonmMonitor {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.running = false;
      this.loop = this.loop.bind(this);
      this.mono = '600 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      this.monoBig = '700 15px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      this.muscles = [
        { name: 'Lt APB', amp: 1, lat: 0.47 },
        { name: 'Rt APB', amp: 0.9, lat: 0.49 },
        { name: 'Lt TA', amp: 0.8, lat: 0.56 },
        { name: 'Rt TA', amp: 0.85, lat: 0.57 }
      ];
      this.clock = 0;
      this.nextTrial = 0;
      this.nextStim = 1.4;
      this.stimFlash = 0;
      this.avg = 0;
      this.trig = { mA: 0.8, lat: 4.6, uv: 312, wave: null };
      this.ssepLabel = { lat: 38.4, uv: 2.1 };
    }

    gauss(x, c, w) { const z = (x - c) / w; return Math.exp(-z * z); }

    layout() {
      const w = this.w, h = this.h, p = 6;
      if (w >= 520) {
        const top = Math.round(h * 0.6);
        const leftW = Math.round((w - p * 3) * 0.52);
        const botLeftW = Math.round((w - p * 3) * 0.6);
        return {
          free: { x: p, y: p, w: leftW, h: top - p * 1.5 },
          mep: { x: p * 2 + leftW, y: p, w: w - leftW - p * 3, h: top - p * 1.5 },
          ssep: { x: p, y: top + p / 2, w: botLeftW, h: h - top - p * 1.5 },
          trig: { x: p * 2 + botLeftW, y: top + p / 2, w: w - botLeftW - p * 3, h: h - top - p * 1.5 }
        };
      }
      const a = Math.round(h * 0.34), b = Math.round(h * 0.36);
      const half = Math.round((w - p * 3) * 0.56);
      return {
        free: { x: p, y: p, w: w - p * 2, h: a - p },
        mep: { x: p, y: a + p, w: w - p * 2, h: b - p },
        ssep: { x: p, y: a + b + p * 2, w: half, h: h - a - b - p * 3 },
        trig: { x: p * 2 + half, y: a + b + p * 2, w: w - half - p * 3, h: h - a - b - p * 3 }
      };
    }

    resize() {
      const r = this.canvas.getBoundingClientRect();
      const dpr = dprOf();
      this.w = Math.max(1, Math.round(r.width));
      this.h = Math.max(1, Math.round(r.height));
      this.canvas.width = Math.round(this.w * dpr);
      this.canvas.height = Math.round(this.h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.L = this.layout();
      const len = Math.max(60, Math.round((this.L.free.w - 34) * 2));
      this.free = [0, 1].map(i => ({ buf: new Float32Array(len), head: 0, burst: null, next: 0.6 + i * 1.3, color: i ? '#1f4fd1' : '#e3262f', name: i ? 'R TA' : 'L TA' }));
      this.marks = [];
      this.rowH = this.w >= 520 ? 13 : 11;
      this.mep = this.muscles.map(() => ({ trials: [], shift: 0 }));
      // Warm-up so the very first frame already looks like a live recording.
      for (let i = 0; i < len; i++) this.pushSample(1 / 220);
      for (let i = 0; i < 10; i++) this.addTrial(true);
      this.trig.wave = this.cmap(1);
      this.avg = 180;
    }

    sampleFree(ch, dt) {
      const noise = (Math.random() - 0.5) * 0.07 + (Math.random() < 0.004 ? (Math.random() - 0.5) * 0.5 : 0);
      ch.next -= dt;
      if (!ch.burst && ch.next <= 0) { ch.burst = { t: 0, len: 0.45 + Math.random() * 0.5, amp: 0.55 + Math.random() * 0.45 }; }
      if (!ch.burst) return noise;
      const b = ch.burst;
      b.t += dt;
      const k = b.t / b.len;
      if (k >= 1) { ch.burst = null; ch.next = 1.6 + Math.random() * 2.6; return noise; }
      const env = Math.pow(Math.sin(Math.PI * k), 1.4);
      return noise + env * b.amp * (Math.random() * 2 - 1) * (0.55 + 0.45 * Math.abs(Math.sin(b.t * 90)));
    }

    pushSample(dt) {
      for (const ch of this.free) {
        ch.buf[ch.head] = this.sampleFree(ch, dt);
        ch.head = (ch.head + 1) % ch.buf.length;
      }
      this.marks = this.marks.map(m => ({ ...m, age: m.age + 1 })).filter(m => m.age < this.free[0].buf.length);
    }

    cmap(scale) {
      const n = 160, out = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = i / n;
        out[i] = (x > 0.06 && x < 0.075 ? 0.9 : 0) + scale * (1.0 * this.gauss(x, 0.3, 0.035) - 0.75 * this.gauss(x, 0.4, 0.05) + 0.18 * this.gauss(x, 0.52, 0.06)) + (Math.random() - 0.5) * 0.03;
      }
      return out;
    }

    stimulate() {
      // Probe stimulation: artefact + compound muscle response injected into the blue free-run channel.
      const ch = this.free[1], len = ch.buf.length, wave = this.cmap(1.05);
      for (let i = 0; i < 70; i++) {
        const idx = (ch.head + i) % len;
        const src = wave[Math.floor(i / 70 * wave.length)];
        ch.buf[idx] = src * 1.1;
      }
      ch.head = (ch.head + 70) % len;
      this.marks.push({ age: 0 });
      this.trig = { mA: [0.5, 0.8, 1.0, 1.2][Math.random() * 4 | 0], lat: +(4.2 + Math.random() * 0.9).toFixed(1), uv: Math.round(260 + Math.random() * 120), wave };
      this.stimFlash = 1;
    }

    addTrial(silent) {
      const n = 120;
      this.muscles.forEach((m, mi) => {
        const t = new Float32Array(n);
        const amp = m.amp * (0.82 + Math.random() * 0.3);
        const lat = m.lat + (Math.random() - 0.5) * 0.02;
        for (let i = 0; i < n; i++) {
          const x = i / n;
          let v = (Math.random() - 0.5) * 0.05;
          for (let k = 0; k < 5; k++) v += (k % 2 ? -1 : 1) * 0.85 * this.gauss(x, 0.12 + k * 0.022, 0.004);
          v += amp * (0.9 * this.gauss(x, lat, 0.018) - 1.0 * this.gauss(x, lat + 0.045, 0.024) + 0.5 * this.gauss(x, lat + 0.1, 0.03) - 0.25 * this.gauss(x, lat + 0.16, 0.035));
          t[i] = v;
        }
        const panel = this.mep[mi];
        panel.trials.unshift(t);
        if (panel.trials.length > 12) panel.trials.pop();
        panel.shift = silent ? 0 : 1;
      });
    }

    advance(dt) {
      const s = dt / 1000;
      this.clock += s;
      this.acc = (this.acc || 0) + s * 220;
      while (this.acc >= 1) { this.acc -= 1; this.pushSample(1 / 220); }
      if (this.clock >= this.nextTrial) { this.addTrial(false); this.nextTrial = this.clock + 1.7; }
      if (this.clock >= this.nextStim) { this.stimulate(); this.nextStim = this.clock + 3 + Math.random() * 1.5; }
      this.mep.forEach(p => { p.shift = Math.max(0, p.shift - s * 3.2); });
      this.stimFlash = Math.max(0, this.stimFlash - s * 1.6);
      this.avg = this.avg >= 300 ? 40 : this.avg + s * 55;
      if (Math.random() < s * 0.6) this.ssepLabel = { lat: +(38 + Math.random() * 0.8).toFixed(1), uv: +(1.9 + Math.random() * 0.4).toFixed(1) };
    }

    panel(r, title, right, bg = '#020b16') {
      const c = this.ctx;
      c.fillStyle = bg; c.fillRect(r.x, r.y, r.w, r.h);
      c.strokeStyle = '#1e3d5a'; c.lineWidth = 1; c.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1);
      c.fillStyle = '#0c2238'; c.fillRect(r.x + 1, r.y + 1, r.w - 2, 15);
      c.font = this.mono; c.textBaseline = 'middle';
      c.fillStyle = '#9fd8ff'; c.textAlign = 'left'; c.fillText(title, r.x + 6, r.y + 8.5);
      if (right) { c.fillStyle = '#6f93ad'; c.textAlign = 'right'; c.fillText(right, r.x + r.w - 6, r.y + 8.5); }
      c.textAlign = 'left';
      return { x: r.x + 1, y: r.y + 16, w: r.w - 2, h: r.h - 17 };
    }

    grid(r, cols, rows, color) {
      const c = this.ctx;
      c.strokeStyle = color; c.lineWidth = 1;
      c.beginPath();
      for (let i = 1; i < cols; i++) { const x = Math.round(r.x + r.w * i / cols) + 0.5; c.moveTo(x, r.y); c.lineTo(x, r.y + r.h); }
      for (let j = 1; j < rows; j++) { const y = Math.round(r.y + r.h * j / rows) + 0.5; c.moveTo(r.x, y); c.lineTo(r.x + r.w, y); }
      c.stroke();
    }

    trace(data, x0, y0, w, amp, color, width = 1.1, from = 0) {
      const c = this.ctx, n = data.length;
      c.strokeStyle = color; c.lineWidth = width; c.lineJoin = 'round';
      c.beginPath();
      for (let i = 0; i < n; i++) {
        const v = data[(from + i) % n];
        const x = x0 + (i / (n - 1)) * w, y = y0 - v * amp;
        if (i) c.lineTo(x, y); else c.moveTo(x, y);
      }
      c.stroke();
    }

    drawFree() {
      const c = this.ctx;
      const r = this.panel(this.L.free, 'FREE-RUN EMG', '200 ms/div · 50 µV', '#bfe7f6');
      c.fillStyle = '#bfe7f6'; c.fillRect(r.x, r.y, r.w, r.h);
      this.grid(r, 8, 4, 'rgba(0,120,140,0.16)');
      const laneH = r.h / this.free.length, labelW = 32;
      this.free.forEach((ch, i) => {
        const mid = r.y + laneH * i + laneH / 2;
        c.strokeStyle = 'rgba(0,110,90,0.35)'; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(r.x + labelW, mid + 0.5); c.lineTo(r.x + r.w, mid + 0.5); c.stroke(); c.setLineDash([]);
        this.trace(ch.buf, r.x + labelW, mid, r.w - labelW - 4, laneH * 0.42, ch.color, 1, ch.head);
        c.font = this.mono; c.fillStyle = '#0b3550'; c.textBaseline = 'middle';
        c.fillText(`${i + 1}`, r.x + 6, mid - 7); c.fillText(ch.name, r.x + 4, mid + 7);
        if (i) c.fillStyle = 'rgba(10,53,80,0.18)', c.fillRect(r.x, r.y + laneH * i, r.w, 1);
      });
      const len = this.free[0].buf.length, plotW = r.w - labelW - 4;
      c.fillStyle = '#d9480f'; c.font = this.mono;
      for (const m of this.marks) {
        const x = r.x + labelW + plotW * (1 - m.age / len);
        c.beginPath(); c.moveTo(x - 4, r.y + laneH + 3); c.lineTo(x + 4, r.y + laneH + 3); c.lineTo(x, r.y + laneH + 10); c.fill();
        c.fillText('STIM', x + 6, r.y + laneH + 8);
      }
    }

    drawMep() {
      const c = this.ctx;
      const r = this.panel(this.L.mep, 'TcMEP', 'Auto Scroll OFF');
      const cols = 2, rowsN = 2, gw = r.w / cols, gh = r.h / rowsN;
      this.muscles.forEach((m, mi) => {
        const cell = { x: r.x + (mi % cols) * gw, y: r.y + Math.floor(mi / cols) * gh, w: gw, h: gh };
        c.strokeStyle = '#173450'; c.strokeRect(cell.x + 0.5, cell.y + 0.5, cell.w - 1, cell.h - 1);
        c.font = this.mono; c.fillStyle = '#d7ffd9'; c.textBaseline = 'middle'; c.textAlign = 'right';
        c.fillText(m.name, cell.x + cell.w - 5, cell.y + 8);
        c.textAlign = 'left';
        const top = cell.y + 18, avail = cell.h - 22, rowH = this.rowH;
        const rows = Math.max(3, Math.floor(avail / rowH));
        const panel = this.mep[mi];
        const off = panel.shift * panel.shift * (3 - 2 * panel.shift);
        c.save(); c.beginPath(); c.rect(cell.x + 1, top - 4, cell.w - 2, avail + 4); c.clip();
        for (let k = 0; k < Math.min(rows + 1, panel.trials.length); k++) {
          const y = top + rowH * (k + 0.5) - rowH * off;
          const alpha = k === 0 ? 1 : Math.max(0.35, 0.85 - k * 0.05);
          this.trace(panel.trials[k], cell.x + 6, y, cell.w - 12, rowH * 0.42, k === 0 ? `rgba(140,255,120,${alpha})` : `rgba(70,220,90,${alpha})`, k === 0 ? 1.3 : 1);
        }
        c.restore();
      });
    }

    drawSsep() {
      const c = this.ctx;
      const r = this.panel(this.L.ssep, 'SSEP · Tibial', `Avg ${Math.round(this.avg)}`);
      this.grid(r, 6, 2, 'rgba(128,216,255,0.07)');
      const n = 140, lanes = 2, laneH = r.h / lanes;
      const noise = Math.max(0.015, 0.2 - this.avg / 1600);
      for (let l = 0; l < lanes; l++) {
        const mid = r.y + laneH * l + laneH * 0.55;
        for (const [color, shift] of [['rgba(255,255,255,0.95)', 0], ['rgba(222,120,235,0.9)', 0.012]]) {
          const d = new Float32Array(n);
          for (let i = 0; i < n; i++) {
            const x = i / n;
            d[i] = 0.75 * this.gauss(x, 0.28 + shift + l * 0.02, 0.035) - 1.0 * this.gauss(x, 0.4 + shift + l * 0.02, 0.045) + 0.45 * this.gauss(x, 0.58 + shift, 0.06) + (Math.random() - 0.5) * noise;
          }
          this.trace(d, r.x + 8, mid, r.w - 16, laneH * 0.36, color, 1.2);
        }
        const cx = r.x + 8 + (r.w - 16) * (0.4 + l * 0.02);
        c.strokeStyle = 'rgba(94,242,200,0.7)'; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(cx + 0.5, r.y + laneH * l + 4); c.lineTo(cx + 0.5, r.y + laneH * (l + 1) - 2); c.stroke(); c.setLineDash([]);
        c.font = this.mono; c.fillStyle = '#b9fff0'; c.textBaseline = 'top';
        c.fillText(`${l ? 'R' : 'L'}  P37 ${(this.ssepLabel.lat + l * 0.6).toFixed(1)} ms · ${(this.ssepLabel.uv - l * 0.2).toFixed(1)} µV`, r.x + 6, r.y + laneH * l + 3);
      }
    }

    drawTrig() {
      const c = this.ctx;
      const r = this.panel(this.L.trig, 'TRIGGERED EMG', 'Probe');
      const t = this.trig;
      c.font = this.monoBig; c.textBaseline = 'top';
      c.fillStyle = this.stimFlash > 0.05 ? `rgba(255,${190 + 60 * (1 - this.stimFlash)},90,1)` : '#ffd166';
      c.fillText(`${t.mA.toFixed(1)} mA`, r.x + 8, r.y + 6);
      c.font = this.mono; c.fillStyle = '#9fbad0';
      c.fillText(`${t.lat} ms · ${t.uv} µV`, r.x + 8, r.y + 26);
      const dotX = r.x + r.w - 14, dotY = r.y + 13;
      c.fillStyle = this.stimFlash > 0.05 ? '#ffd166' : '#24435e';
      c.beginPath(); c.arc(dotX, dotY, 5 + this.stimFlash * 3, 0, Math.PI * 2); c.fill();
      const plot = { x: r.x + 6, y: r.y + 42, w: r.w - 12, h: r.h - 46 };
      this.grid(plot, 4, 2, 'rgba(255,209,102,0.08)');
      if (t.wave) this.trace(t.wave, plot.x, plot.y + plot.h * 0.55, plot.w, plot.h * 0.4, '#ffd166', 1.4);
    }

    draw() {
      const c = this.ctx;
      c.clearRect(0, 0, this.w, this.h);
      c.fillStyle = '#01070f'; c.fillRect(0, 0, this.w, this.h);
      this.drawFree();
      this.drawMep();
      this.drawSsep();
      this.drawTrig();
    }

    loop(now) {
      if (!this.running) return;
      const dt = Math.min(48, now - (this.last || now));
      this.last = now;
      this.advance(dt);
      this.draw();
      requestAnimationFrame(this.loop);
    }
    start() { if (this.running) return; this.running = true; this.last = 0; requestAnimationFrame(this.loop); }
    stop() { this.running = false; }
  }

  const presets = {
    hero: { area: 15000, min: 30, max: 88, link: 150, speed: 0.018, pulseRate: 3.2, pulseSpeed: 0.32, chain: 0.62, maxPulses: 26, lineAlpha: 0.26, nodeAlpha: 0.55, pulseAlpha: 0.95, interactive: true },
    soft: { area: 24000, min: 20, max: 60, link: 140, speed: 0.012, pulseRate: 1.6, pulseSpeed: 0.26, chain: 0.5, maxPulses: 12, lineAlpha: 0.16, nodeAlpha: 0.38, pulseAlpha: 0.7, interactive: false }
  };

  document.querySelectorAll('canvas[data-neural]').forEach(canvas => {
    if (!canvas.getContext) return;
    lifecycle(new NeuralField(canvas, presets[canvas.dataset.neural] || presets.soft), canvas);
  });
  // Running surgery clock on the monitor title bar.
  const rec = document.querySelector('[data-rec]');
  if (rec && !reduce.matches) {
    const startAt = Date.now() - (42 * 60 + 10) * 1000;
    const pad = n => String(n).padStart(2, '0');
    setInterval(() => { const s = Math.floor((Date.now() - startAt) / 1000); rec.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`; }, 1000);
  }
  document.querySelectorAll('canvas[data-ionm]').forEach(canvas => {
    if (!canvas.getContext) return;
    lifecycle(new IonmMonitor(canvas), canvas);
  });
})();
