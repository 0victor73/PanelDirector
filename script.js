// Canal de broadcast para sincronizar com a exibição
const channel = new BroadcastChannel('neat_sync');

// ============================================================
// IDs de todos os sliders e seus displays de valor
// ============================================================
const SLIDERS = [
  { id: 'speed', valId: 'speed-val', prop: 'speed' },
  { id: 'waveAmplitude', valId: 'waveAmplitude-val', prop: 'waveAmplitude' },
  { id: 'waveFrequencyX', valId: 'waveFrequencyX-val', prop: 'waveFrequencyX' },
  { id: 'waveFrequencyY', valId: 'waveFrequencyY-val', prop: 'waveFrequencyY' },
  { id: 'horizontalPressure', valId: 'horizontalPressure-val', prop: 'horizontalPressure' },
  { id: 'verticalPressure', valId: 'verticalPressure-val', prop: 'verticalPressure' },
  { id: 'colorBlending', valId: 'colorBlending-val', prop: 'colorBlending' },
  { id: 'colorSaturation', valId: 'colorSaturation-val', prop: 'colorSaturation' },
  { id: 'colorBrightness', valId: 'colorBrightness-val', prop: 'colorBrightness' },
  { id: 'shadows', valId: 'shadows-val', prop: 'shadows' },
  { id: 'highlights', valId: 'highlights-val', prop: 'highlights' },
];

// ============================================================
// Monta o objeto NeatConfig completo a partir dos controles
// ============================================================
function buildConfig() {
  const colors = [];
  for (let i = 1; i <= 5; i++) {
    const colorEl = document.getElementById(`cor${i}`);
    const enabledEl = document.getElementById(`cor${i}-enabled`);
    if (colorEl) {
      colors.push({
        color: colorEl.value,
        enabled: enabledEl ? enabledEl.checked : true
      });
    }
  }

  const config = { colors };

  // Sliders
  SLIDERS.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) config[s.prop] = parseFloat(el.value);
  });

  // Background color
  const bgEl = document.getElementById('backgroundColor');
  if (bgEl) config.backgroundColor = bgEl.value;

  // Wireframe
  const wfEl = document.getElementById('wireframe');
  if (wfEl) config.wireframe = wfEl.checked;

  return config;
}

// ============================================================
// Envia a config completa para a exibição via BroadcastChannel
// ============================================================
function sync() {
  const config = buildConfig();
  channel.postMessage({ acao: 'updateConfig', config });

  // Salvar última configuração no localStorage
  try {
    localStorage.setItem('neat_last_config', JSON.stringify(config));
  } catch (e) {}
}

// ============================================================
// Aplica uma config nos controles do painel (para presets/slots)
// ============================================================
function applyConfigToControls(config) {
  if (!config) return;

  // Cores
  if (config.colors && Array.isArray(config.colors)) {
    config.colors.forEach((c, i) => {
      const idx = i + 1;
      const colorEl = document.getElementById(`cor${idx}`);
      const enabledEl = document.getElementById(`cor${idx}-enabled`);
      if (colorEl && c.color) colorEl.value = c.color;
      if (enabledEl && typeof c.enabled === 'boolean') enabledEl.checked = c.enabled;
    });
  }

  // Sliders
  SLIDERS.forEach(s => {
    if (config[s.prop] !== undefined) {
      const el = document.getElementById(s.id);
      const valEl = document.getElementById(s.valId);
      if (el) el.value = config[s.prop];
      if (valEl) valEl.textContent = parseFloat(config[s.prop]).toFixed(1);
    }
  });

  // Background
  if (config.backgroundColor) {
    const bgEl = document.getElementById('backgroundColor');
    if (bgEl) bgEl.value = config.backgroundColor;
  }

  // Wireframe
  if (typeof config.wireframe === 'boolean') {
    const wfEl = document.getElementById('wireframe');
    if (wfEl) wfEl.checked = config.wireframe;
  }
}

// ============================================================
// Presets temáticos
// ============================================================
const PRESETS = {
  adoracao: {
    colors: [
      { color: '#1a2a6c', enabled: true },
      { color: '#2d3a8c', enabled: true },
      { color: '#4a5ac7', enabled: true },
      { color: '#7b68ee', enabled: true },
      { color: '#b392f0', enabled: false }
    ],
    speed: 1.5,
    waveAmplitude: 3,
    waveFrequencyX: 2,
    waveFrequencyY: 2,
    horizontalPressure: 3,
    verticalPressure: 4,
    colorBlending: 8,
    colorSaturation: -2,
    colorBrightness: 0.8,
    shadows: 3,
    highlights: 4,
    backgroundColor: '#0a0a2e',
    wireframe: false
  },
  celebracao: {
    colors: [
      { color: '#f2994a', enabled: true },
      { color: '#f2c94c', enabled: true },
      { color: '#eb5757', enabled: true },
      { color: '#ff6b6b', enabled: true },
      { color: '#ffd93d', enabled: true }
    ],
    speed: 5,
    waveAmplitude: 7,
    waveFrequencyX: 4,
    waveFrequencyY: 3,
    horizontalPressure: 4,
    verticalPressure: 3,
    colorBlending: 6,
    colorSaturation: 3,
    colorBrightness: 1.3,
    shadows: 1,
    highlights: 7,
    backgroundColor: '#ff6600',
    wireframe: false
  },
  pregacao: {
    colors: [
      { color: '#2d3436', enabled: true },
      { color: '#636e72', enabled: true },
      { color: '#b2bec3', enabled: true },
      { color: '#dfe6e9', enabled: false },
      { color: '#74b9ff', enabled: true }
    ],
    speed: 1,
    waveAmplitude: 2,
    waveFrequencyX: 1.5,
    waveFrequencyY: 2,
    horizontalPressure: 3,
    verticalPressure: 3,
    colorBlending: 7,
    colorSaturation: -3,
    colorBrightness: 0.7,
    shadows: 4,
    highlights: 3,
    backgroundColor: '#1a1a2e',
    wireframe: false
  },
  ceu: {
    colors: [
      { color: '#0c0c3a', enabled: true },
      { color: '#1a1a5e', enabled: true },
      { color: '#4a1a8a', enabled: true },
      { color: '#2e0854', enabled: true },
      { color: '#000033', enabled: true }
    ],
    speed: 0.8,
    waveAmplitude: 4,
    waveFrequencyX: 1,
    waveFrequencyY: 1.5,
    horizontalPressure: 2,
    verticalPressure: 5,
    colorBlending: 9,
    colorSaturation: 1,
    colorBrightness: 0.6,
    shadows: 6,
    highlights: 2,
    backgroundColor: '#000011',
    wireframe: false
  },
  fogo: {
    colors: [
      { color: '#ff0000', enabled: true },
      { color: '#ff4500', enabled: true },
      { color: '#ff8c00', enabled: true },
      { color: '#ffd700', enabled: true },
      { color: '#8b0000', enabled: true }
    ],
    speed: 6,
    waveAmplitude: 8,
    waveFrequencyX: 5,
    waveFrequencyY: 4,
    horizontalPressure: 5,
    verticalPressure: 6,
    colorBlending: 4,
    colorSaturation: 5,
    colorBrightness: 1.4,
    shadows: 2,
    highlights: 8,
    backgroundColor: '#1a0000',
    wireframe: false
  }
};

// ============================================================
// Inicialização
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Vincular eventos a todos os sliders
  SLIDERS.forEach(s => {
    const el = document.getElementById(s.id);
    const valEl = document.getElementById(s.valId);
    if (el) {
      el.addEventListener('input', () => {
        if (valEl) valEl.textContent = parseFloat(el.value).toFixed(1);
        sync();
      });
    }
  });

  // Vincular eventos aos color pickers
  for (let i = 1; i <= 5; i++) {
    const colorEl = document.getElementById(`cor${i}`);
    const enabledEl = document.getElementById(`cor${i}-enabled`);
    if (colorEl) colorEl.addEventListener('input', sync);
    if (enabledEl) enabledEl.addEventListener('change', sync);
  }

  // Background color
  const bgEl = document.getElementById('backgroundColor');
  if (bgEl) bgEl.addEventListener('input', sync);

  // Wireframe
  const wfEl = document.getElementById('wireframe');
  if (wfEl) wfEl.addEventListener('change', sync);

  // Botões de preset temático
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetName = btn.getAttribute('data-preset');
      const preset = PRESETS[presetName];
      if (preset) {
        applyConfigToControls(preset);
        sync();
      }
    });
  });

  // Slots de memória (botões numerados)
  initSlots();

  // Restaurar última config salva
  try {
    const saved = localStorage.getItem('neat_last_config');
    if (saved) {
      const config = JSON.parse(saved);
      applyConfigToControls(config);
    }
  } catch (e) {}

  // Enviar config inicial para a exibição
  setTimeout(sync, 300);
});

// ============================================================
// Slots de memória (salvar/carregar presets personalizados)
// ============================================================
function initSlots() {
  const botoes = document.querySelectorAll('.botao-salvo');
  let activeSlot = null;

  // Carregar slots salvos
  const slots = {};
  for (let i = 1; i <= 6; i++) {
    const raw = localStorage.getItem(`neat_slot_${i}`);
    slots[i] = raw ? JSON.parse(raw) : null;
  }

  // Atualizar tooltips
  function updateTitles() {
    botoes.forEach(b => {
      const slot = b.getAttribute('data-slot');
      b.title = slots[slot] ? 'Clique para carregar · Duplo clique para salvar' : 'Duplo clique para salvar';
    });
  }

  botoes.forEach(b => {
    const slot = b.getAttribute('data-slot');

    // Clique simples: carregar
    b.addEventListener('click', () => {
      botoes.forEach(btn => btn.classList.remove('ativo'));
      b.classList.add('ativo');
      activeSlot = slot;

      if (slots[slot]) {
        applyConfigToControls(slots[slot]);
        sync();
      }
    });

    // Duplo clique: salvar
    b.addEventListener('dblclick', () => {
      const config = buildConfig();
      slots[slot] = config;
      localStorage.setItem(`neat_slot_${slot}`, JSON.stringify(config));
      b.title = 'Salvo! Clique para carregar';

      // Feedback visual
      b.classList.add('ativo');
      setTimeout(() => {
        if (activeSlot !== slot) b.classList.remove('ativo');
      }, 600);
    });
  });

  updateTitles();

  // Restaurar slot ativo
  const persistedSlot = localStorage.getItem('neat_active_slot');
  if (persistedSlot && slots[persistedSlot]) {
    const btn = document.querySelector(`.botao-salvo[data-slot="${persistedSlot}"]`);
    if (btn) {
      btn.classList.add('ativo');
      activeSlot = persistedSlot;
    }
  }
}
