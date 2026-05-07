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
  { id: 'resolution', valId: 'resolution-val', prop: 'resolution' },
  { id: 'grainIntensity', valId: 'grainIntensity-val', prop: 'grainIntensity' },
  { id: 'grainScale', valId: 'grainScale-val', prop: 'grainScale' },
  { id: 'grainSpeed', valId: 'grainSpeed-val', prop: 'grainSpeed' },
  { id: 'backgroundAlpha', valId: 'backgroundAlpha-val', prop: 'backgroundAlpha' },
  { id: 'flowDistortionA', valId: 'flowDistortionA-val', prop: 'flowDistortionA' },
  { id: 'flowDistortionB', valId: 'flowDistortionB-val', prop: 'flowDistortionB' },
  { id: 'flowScale', valId: 'flowScale-val', prop: 'flowScale' },
  { id: 'flowEase', valId: 'flowEase-val', prop: 'flowEase' },
  // Procedural Texture
  { id: 'textureEase', valId: 'textureEase-val', prop: 'textureEase' },
  { id: 'textureVoidLikelihood', valId: 'textureVoidLikelihood-val', prop: 'textureVoidLikelihood' },
  { id: 'textureVoidWidthMin', valId: 'textureVoidWidthMin-val', prop: 'textureVoidWidthMin' },
  { id: 'textureVoidWidthMax', valId: 'textureVoidWidthMax-val', prop: 'textureVoidWidthMax' },
  { id: 'textureBandDensity', valId: 'textureBandDensity-val', prop: 'textureBandDensity' },
  { id: 'textureColorBlending', valId: 'textureColorBlending-val', prop: 'textureColorBlending' },
  { id: 'textureSeed', valId: 'textureSeed-val', prop: 'textureSeed' },
  { id: 'textureShapeTriangles', valId: 'textureShapeTriangles-val', prop: 'textureShapeTriangles' },
  { id: 'textureShapeCircles', valId: 'textureShapeCircles-val', prop: 'textureShapeCircles' },
  { id: 'textureShapeBars', valId: 'textureShapeBars-val', prop: 'textureShapeBars' },
  { id: 'textureShapeSquiggles', valId: 'textureShapeSquiggles-val', prop: 'textureShapeSquiggles' },
  // Grain Extra
  { id: 'grainSparsity', valId: 'grainSparsity-val', prop: 'grainSparsity' },
  // Offsets
  { id: 'yOffset', valId: 'yOffset-val', prop: 'yOffset' },
  { id: 'yOffsetWaveMultiplier', valId: 'yOffsetWaveMultiplier-val', prop: 'yOffsetWaveMultiplier' },
  { id: 'yOffsetColorMultiplier', valId: 'yOffsetColorMultiplier-val', prop: 'yOffsetColorMultiplier' },
  { id: 'yOffsetFlowMultiplier', valId: 'yOffsetFlowMultiplier-val', prop: 'yOffsetFlowMultiplier' },
  // Domain Warp
  { id: 'domainWarpIntensity', valId: 'domainWarpIntensity-val', prop: 'domainWarpIntensity' },
  { id: 'domainWarpScale', valId: 'domainWarpScale-val', prop: 'domainWarpScale' },
  // Vignette
  { id: 'vignetteIntensity', valId: 'vignetteIntensity-val', prop: 'vignetteIntensity' },
  { id: 'vignetteRadius', valId: 'vignetteRadius-val', prop: 'vignetteRadius' },
  // Fresnel
  { id: 'fresnelPower', valId: 'fresnelPower-val', prop: 'fresnelPower' },
  { id: 'fresnelIntensity', valId: 'fresnelIntensity-val', prop: 'fresnelIntensity' },
  // Iridescence
  { id: 'iridescenceIntensity', valId: 'iridescenceIntensity-val', prop: 'iridescenceIntensity' },
  { id: 'iridescenceSpeed', valId: 'iridescenceSpeed-val', prop: 'iridescenceSpeed' },
  // Effects
  { id: 'bloomIntensity', valId: 'bloomIntensity-val', prop: 'bloomIntensity' },
  { id: 'bloomThreshold', valId: 'bloomThreshold-val', prop: 'bloomThreshold' },
  { id: 'chromaticAberration', valId: 'chromaticAberration-val', prop: 'chromaticAberration' },
];

// Toggles (checkboxes que não são cores)
const TOGGLES = [
  { id: 'wireframe', prop: 'wireframe' },
  { id: 'flowEnabled', prop: 'flowEnabled' },
  { id: 'enableProceduralTexture', prop: 'enableProceduralTexture' },
  { id: 'domainWarpEnabled', prop: 'domainWarpEnabled' },
  { id: 'fresnelEnabled', prop: 'fresnelEnabled' },
  { id: 'iridescenceEnabled', prop: 'iridescenceEnabled' },
];

// Número de cores
const NUM_COLORS = 6;

// ============================================================
// Monta o objeto NeatConfig completo a partir dos controles
// ============================================================
function buildConfig() {
  const colors = [];
  for (let i = 1; i <= NUM_COLORS; i++) {
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

  // Procedural background color
  const pbgEl = document.getElementById('proceduralBackgroundColor');
  if (pbgEl) config.proceduralBackgroundColor = pbgEl.value;

  // Fresnel color
  const frcEl = document.getElementById('fresnelColor');
  if (frcEl) config.fresnelColor = frcEl.value;

  // Toggles
  TOGGLES.forEach(t => {
    const el = document.getElementById(t.id);
    if (el) config[t.prop] = el.checked;
  });

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
  } catch (e) { }
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
      if (el) {
        el.value = config[s.prop];
        updateSliderBackground(el);
      }
      if (valEl) {
        const step = el ? parseFloat(el.step) : 0.1;
        const decimals = step < 0.1 ? 2 : 1;
        valEl.textContent = parseFloat(config[s.prop]).toFixed(decimals);
      }
    }
  });

  // Background
  if (config.backgroundColor) {
    const bgEl = document.getElementById('backgroundColor');
    if (bgEl) bgEl.value = config.backgroundColor;
  }

  // Procedural background color
  if (config.proceduralBackgroundColor) {
    const pbgEl = document.getElementById('proceduralBackgroundColor');
    if (pbgEl) pbgEl.value = config.proceduralBackgroundColor;
  }

  // Fresnel color
  if (config.fresnelColor) {
    const frcEl = document.getElementById('fresnelColor');
    if (frcEl) frcEl.value = config.fresnelColor;
  }

  // Toggles
  TOGGLES.forEach(t => {
    if (typeof config[t.prop] === 'boolean') {
      const el = document.getElementById(t.id);
      if (el) el.checked = config[t.prop];
    }
  });
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
      { color: '#b392f0', enabled: false },
      { color: '#e0d4ff', enabled: false }
    ],
    speed: 1.5, waveAmplitude: 3, waveFrequencyX: 2, waveFrequencyY: 2,
    horizontalPressure: 3, verticalPressure: 4, colorBlending: 8,
    colorSaturation: -2, colorBrightness: 0.8, shadows: 3, highlights: 4,
    resolution: 1, grainIntensity: 0.05, grainScale: 2, grainSpeed: 1,
    backgroundColor: '#0a0a2e', backgroundAlpha: 1,
    wireframe: false, flowEnabled: true,
    flowDistortionA: 0, flowDistortionB: 0, flowScale: 1, flowEase: 0
  },
  celebracao: {
    colors: [
      { color: '#f2994a', enabled: true },
      { color: '#f2c94c', enabled: true },
      { color: '#eb5757', enabled: true },
      { color: '#ff6b6b', enabled: true },
      { color: '#ffd93d', enabled: true },
      { color: '#ff9ff3', enabled: false }
    ],
    speed: 5, waveAmplitude: 7, waveFrequencyX: 4, waveFrequencyY: 3,
    horizontalPressure: 4, verticalPressure: 3, colorBlending: 6,
    colorSaturation: 3, colorBrightness: 1.3, shadows: 1, highlights: 7,
    resolution: 1, grainIntensity: 0, grainScale: 2, grainSpeed: 1,
    backgroundColor: '#ff6600', backgroundAlpha: 1,
    wireframe: false, flowEnabled: true,
    flowDistortionA: 0, flowDistortionB: 0, flowScale: 1, flowEase: 0
  },
  pregacao: {
    colors: [
      { color: '#2d3436', enabled: true },
      { color: '#636e72', enabled: true },
      { color: '#b2bec3', enabled: true },
      { color: '#dfe6e9', enabled: false },
      { color: '#74b9ff', enabled: true },
      { color: '#a29bfe', enabled: false }
    ],
    speed: 1, waveAmplitude: 2, waveFrequencyX: 1.5, waveFrequencyY: 2,
    horizontalPressure: 3, verticalPressure: 3, colorBlending: 7,
    colorSaturation: -3, colorBrightness: 0.7, shadows: 4, highlights: 3,
    resolution: 1, grainIntensity: 0.1, grainScale: 3, grainSpeed: 0.5,
    backgroundColor: '#1a1a2e', backgroundAlpha: 1,
    wireframe: false, flowEnabled: true,
    flowDistortionA: 0, flowDistortionB: 0, flowScale: 1, flowEase: 0
  },
  ceu: {
    colors: [
      { color: '#0c0c3a', enabled: true },
      { color: '#1a1a5e', enabled: true },
      { color: '#4a1a8a', enabled: true },
      { color: '#2e0854', enabled: true },
      { color: '#000033', enabled: true },
      { color: '#0a0a2e', enabled: false }
    ],
    speed: 0.8, waveAmplitude: 4, waveFrequencyX: 1, waveFrequencyY: 1.5,
    horizontalPressure: 2, verticalPressure: 5, colorBlending: 9,
    colorSaturation: 1, colorBrightness: 0.6, shadows: 6, highlights: 2,
    resolution: 1, grainIntensity: 0.15, grainScale: 2, grainSpeed: 0.3,
    backgroundColor: '#000011', backgroundAlpha: 1,
    wireframe: false, flowEnabled: true,
    flowDistortionA: 1, flowDistortionB: 0.5, flowScale: 2, flowEase: 0.3
  },
  fogo: {
    colors: [
      { color: '#ff0000', enabled: true },
      { color: '#ff4500', enabled: true },
      { color: '#ff8c00', enabled: true },
      { color: '#ffd700', enabled: true },
      { color: '#8b0000', enabled: true },
      { color: '#4a0000', enabled: false }
    ],
    speed: 6, waveAmplitude: 8, waveFrequencyX: 5, waveFrequencyY: 4,
    horizontalPressure: 5, verticalPressure: 6, colorBlending: 4,
    colorSaturation: 5, colorBrightness: 1.4, shadows: 2, highlights: 8,
    resolution: 1, grainIntensity: 0, grainScale: 2, grainSpeed: 1,
    backgroundColor: '#1a0000', backgroundAlpha: 1,
    wireframe: false, flowEnabled: true,
    flowDistortionA: 2, flowDistortionB: 1, flowScale: 3, flowEase: 0.1
  }
};

// ============================================================
// Atualiza o background do slider para simular o progresso (Webkit)
// ============================================================
function updateSliderBackground(el) {
  if (!el) return;
  const min = parseFloat(el.min) || 0;
  const max = parseFloat(el.max) || 100;
  const val = parseFloat(el.value);
  const percentage = (val - min) / (max - min) * 100;

  el.style.background = `linear-gradient(to right, #235aff ${percentage}%, #1e1f25 ${percentage}%)`;
}

// ============================================================
// Inicialização
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Vincular eventos a todos os sliders
  SLIDERS.forEach(s => {
    const el = document.getElementById(s.id);
    const valEl = document.getElementById(s.valId);
    if (el) {
      updateSliderBackground(el);
      el.addEventListener('input', () => {
        updateSliderBackground(el);
        if (valEl) {
          const step = parseFloat(el.step);
          const decimals = step < 0.1 ? 2 : 1;
          valEl.textContent = parseFloat(el.value).toFixed(decimals);
        }
        sync();
      });
    }
  });

  // Vincular eventos aos color pickers
  for (let i = 1; i <= NUM_COLORS; i++) {
    const colorEl = document.getElementById(`cor${i}`);
    const enabledEl = document.getElementById(`cor${i}-enabled`);
    if (colorEl) colorEl.addEventListener('input', sync);
    if (enabledEl) enabledEl.addEventListener('change', sync);
  }

  // Background color
  const bgEl = document.getElementById('backgroundColor');
  if (bgEl) bgEl.addEventListener('input', sync);

  // Procedural background color
  const pbgEl = document.getElementById('proceduralBackgroundColor');
  if (pbgEl) pbgEl.addEventListener('input', sync);

  const frcEl = document.getElementById('fresnelColor');
  if (frcEl) frcEl.addEventListener('input', sync);

  // Toggles
  TOGGLES.forEach(t => {
    const el = document.getElementById(t.id);
    if (el) el.addEventListener('change', sync);
  });

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

  // Import/Export e Presets Customizados
  initCustomPresets();

  // Restaurar última config salva
  try {
    const saved = localStorage.getItem('neat_last_config');
    if (saved) {
      const config = JSON.parse(saved);
      applyConfigToControls(config);
    }
  } catch (e) { }

  // Enviar config inicial para a exibição
  setTimeout(sync, 300);
});

// ============================================================
// Import / Export e Presets Customizados
// ============================================================
function initCustomPresets() {
  const btnExport = document.getElementById('btn-export');
  const btnImport = document.getElementById('btn-import');
  const btnSavePreset = document.getElementById('btn-save-preset');
  const customPresetsList = document.getElementById('custom-presets-list');

  // Exportar JSON (Copiar para Área de Transferência)
  btnExport.addEventListener('click', () => {
    const config = buildConfig();
    const json = JSON.stringify(config, null, 2);

    navigator.clipboard.writeText(json).then(() => {
      const originalText = btnExport.textContent;
      btnExport.textContent = "¡Copiado!";
      btnExport.style.background = "#2BE19A";
      setTimeout(() => {
        btnExport.textContent = originalText;
        btnExport.style.background = "";
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar: ', err);
      alert("Erro ao copiar para a área de transferência.");
    });
  });

  // Importar JSON (Colar de Texto)
  btnImport.addEventListener('click', () => {
    const jsonStr = prompt("Cole o código JSON do seu preset aqui:");
    if (!jsonStr) return;

    try {
      // Usando Function em vez de JSON.parse para suportar chaves sem aspas, aspas simples, etc.
      const config = (new Function("return " + jsonStr))();
      
      if (typeof config === 'object' && config !== null) {
        applyConfigToControls(config);
        sync();
        alert("Configuração aplicada com sucesso!");
      } else {
        throw new Error("O código não é um objeto válido.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao ler o código. Verifique se ele foi copiado corretamente (falta de colchetes ou chaves).");
    }
  });

  // Salvar Novo Preset Customizado
  let customPresets = [];
  try {
    const saved = localStorage.getItem('neat_custom_presets');
    if (saved) customPresets = JSON.parse(saved);
  } catch (e) { }

  function renderCustomPresets() {
    customPresetsList.innerHTML = '';
    customPresets.forEach((preset, index) => {
      const container = document.createElement('div');
      container.className = 'preset-item';

      const btn = document.createElement('button');
      btn.className = 'botao';
      btn.textContent = `${preset.name}`;

      btn.addEventListener('click', () => {
        applyConfigToControls(preset.config);
        sync();
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-delete-preset';
      delBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      `;
      delBtn.title = "Excluir preset";

      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Deseja excluir o preset "${preset.name}"?`)) {
          customPresets.splice(index, 1);
          localStorage.setItem('neat_custom_presets', JSON.stringify(customPresets));
          renderCustomPresets();
        }
      });

      container.appendChild(btn);
      container.appendChild(delBtn);
      customPresetsList.appendChild(container);
    });
  }

  btnSavePreset.addEventListener('click', () => {
    const nome = prompt("Digite um nome para o seu novo preset:");
    if (!nome || nome.trim() === "") return;

    const config = buildConfig();
    customPresets.push({ name: nome.trim(), config });
    localStorage.setItem('neat_custom_presets', JSON.stringify(customPresets));
    renderCustomPresets();
  });

  renderCustomPresets();
}
