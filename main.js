const runeData = [
  {
    name: 'Eternal',
    chance: 1000000,
    bonuses: [
      '100x Energy',
      '25x Flux',
      '10x Surge',
      '1x Voltage',
      '2x Rarity Speed (2x Max)'
    ],
    stats: [
      { label: 'Energy', type: 'linear', values: [100, 200, 400, 800, 1600] },
      { label: 'Rarity Speed', type: 'linear', base: 1, growth: 2, cap: 2 }
    ]
  },
  {
    name: 'Oblivion',
    chance: 2500000,
    bonuses: [
      '150x Energy',
      '50x Flux',
      '25x Surge',
      '5x Voltage',
      '1x Chips',
      '1x Passive Luck (1x Max)'
    ],
    stats: [
      { label: 'Energy', type: 'linear', values: [150, 300, 600, 1200, 2400] },
      { label: 'Passive Luck', type: 'linear', base: 1, growth: 1, cap: 1 }
    ]
  },
  {
    name: 'Umbralith',
    chance: 10000000,
    bonuses: [
      '250x Energy',
      '150x Flux',
      '100x Surge',
      '50x Voltage',
      '2x Chips',
      '0.5x Watts (10x Max)',
      '5x Wood (50x Max)',
      '0.5x Tree Damage (5x Max)',
      'Secret Upgrade'
    ],
    stats: [
      { label: 'Energy', type: 'linear', values: [250, 500, 1000, 2000, 4000] },
      { label: 'Watts', type: 'linear', base: 0.5, growth: 1, cap: 10 },
      { label: 'Wood', type: 'linear', base: 5, growth: 1, cap: 50 },
      { label: 'Tree Damage', type: 'linear', base: 0.5, growth: 1, cap: 5 }
    ]
  },
  {
    name: 'Nuclear',
    chance: 20000000,
    bonuses: [
      '500x Energy',
      '250x Flux',
      '200x Surge',
      '100x Voltage',
      '5x Chips',
      '1x Watts (10x Max)',
      '2x Passive Speed (2x Max)',
      '2x Rune Speed (2x Max)'
    ],
    stats: [
      { label: 'Energy', type: 'linear', values: [500, 1000, 2000, 4000, 8000] },
      { label: 'Watts', type: 'linear', base: 1, growth: 1, cap: 10 },
      { label: 'Passive Speed', type: 'linear', base: 2, growth: 1, cap: 2 },
      { label: 'Rune Speed', type: 'linear', base: 2, growth: 1, cap: 2 }
    ]
  },
  {
    name: 'Aero',
    chance: 25000000,
    bonuses: [
      '300x Energy',
      '175x Flux',
      '125x Surge',
      '100x Voltage',
      '1x Watts (10x Max)',
      '5x Wood (50x Max)',
      '1x Clovers (10x Max)',
      'Secret Stat'
    ],
    stats: [
      { label: 'Energy', type: 'linear', values: [300, 600, 900, 1200, 1500] },
      { label: 'Watts', type: 'exponential', base: 1, growth: 1.0000015, cap: 100000 },
      { label: 'Wood', type: 'linear', base: 5, growth: 1, cap: 50 },
      { label: 'Clovers', type: 'linear', base: 1, growth: 1, cap: 10 }
    ]
  }
];

const suffixes = [
  { suffix: 'uce', multiplier: 1e306 },
  { suffix: 'ce', multiplier: 1e303 },
  { suffix: 'nonng', multiplier: 1e300 },
  { suffix: 'ocng', multiplier: 1e297 },
  { suffix: 'spng', multiplier: 1e294 },
  { suffix: 'sxng', multiplier: 1e291 },
  { suffix: 'qnng', multiplier: 1e288 },
  { suffix: 'qdng', multiplier: 1e285 },
  { suffix: 'tng', multiplier: 1e282 },
  { suffix: 'dng', multiplier: 1e279 },
  { suffix: 'ung', multiplier: 1e276 },
  { suffix: 'ng', multiplier: 1e273 },
  { suffix: 'noog', multiplier: 1e270 },
  { suffix: 'ocog', multiplier: 1e267 },
  { suffix: 'spog', multiplier: 1e264 },
  { suffix: 'sxog', multiplier: 1e261 },
  { suffix: 'qnog', multiplier: 1e258 },
  { suffix: 'qdog', multiplier: 1e255 },
  { suffix: 'tog', multiplier: 1e252 },
  { suffix: 'dog', multiplier: 1e249 },
  { suffix: 'uog', multiplier: 1e246 },
  { suffix: 'og', multiplier: 1e243 },
  { suffix: 'nosg', multiplier: 1e240 },
  { suffix: 'ocsg', multiplier: 1e237 },
  { suffix: 'spsg', multiplier: 1e234 },
  { suffix: 'sxsg', multiplier: 1e231 },
  { suffix: 'qnsg', multiplier: 1e228 },
  { suffix: 'qdsg', multiplier: 1e225 },
  { suffix: 'tsg', multiplier: 1e222 },
  { suffix: 'dsg', multiplier: 1e219 },
  { suffix: 'usg', multiplier: 1e216 },
  { suffix: 'sg', multiplier: 1e213 },
  { suffix: 'nosg', multiplier: 1e210 },
  { suffix: 'ocsg', multiplier: 1e207 },
  { suffix: 'spsg', multiplier: 1e204 },
  { suffix: 'sxsg', multiplier: 1e201 },
  { suffix: 'qnsg', multiplier: 1e198 },
  { suffix: 'qdsg', multiplier: 1e195 },
  { suffix: 'tsg', multiplier: 1e192 },
  { suffix: 'dsg', multiplier: 1e189 },
  { suffix: 'usg', multiplier: 1e186 },
  { suffix: 'sg', multiplier: 1e183 },
  { suffix: 'noqg', multiplier: 1e180 },
  { suffix: 'ocqg', multiplier: 1e177 },
  { suffix: 'spqg', multiplier: 1e174 },
  { suffix: 'sxqg', multiplier: 1e171 },
  { suffix: 'qnqg', multiplier: 1e168 },
  { suffix: 'qdqg', multiplier: 1e165 },
  { suffix: 'tqg', multiplier: 1e162 },
  { suffix: 'dqg', multiplier: 1e159 },
  { suffix: 'uqg', multiplier: 1e156 },
  { suffix: 'qg', multiplier: 1e153 },
  { suffix: 'noqg', multiplier: 1e150 },
  { suffix: 'ocqg', multiplier: 1e147 },
  { suffix: 'spqg', multiplier: 1e144 },
  { suffix: 'sxqg', multiplier: 1e141 },
  { suffix: 'qnqg', multiplier: 1e138 },
  { suffix: 'qdqg', multiplier: 1e135 },
  { suffix: 'tqg', multiplier: 1e132 },
  { suffix: 'dqg', multiplier: 1e129 },
  { suffix: 'uqg', multiplier: 1e126 },
  { suffix: 'qg', multiplier: 1e123 },
  { suffix: 'notg', multiplier: 1e120 },
  { suffix: 'octg', multiplier: 1e117 },
  { suffix: 'sptg', multiplier: 1e114 },
  { suffix: 'sxtg', multiplier: 1e111 },
  { suffix: 'qntg', multiplier: 1e108 },
  { suffix: 'qdtg', multiplier: 1e105 },
  { suffix: 'ttg', multiplier: 1e102 },
  { suffix: 'dtg', multiplier: 1e99 },
  { suffix: 'utg', multiplier: 1e96 },
  { suffix: 'tg', multiplier: 1e93 },
  { suffix: 'novg', multiplier: 1e90 },
  { suffix: 'ocvg', multiplier: 1e87 },
  { suffix: 'spvg', multiplier: 1e84 },
  { suffix: 'sxvg', multiplier: 1e81 },
  { suffix: 'qnvg', multiplier: 1e78 },
  { suffix: 'qdvg', multiplier: 1e75 },
  { suffix: 'tvg', multiplier: 1e72 },
  { suffix: 'dvg', multiplier: 1e69 },
  { suffix: 'uvg', multiplier: 1e66 },
  { suffix: 'vg', multiplier: 1e63 },
  { suffix: 'novt', multiplier: 1e90 },
  { suffix: 'ocvt', multiplier: 1e87 },
  { suffix: 'spvt', multiplier: 1e84 },
  { suffix: 'sxvt', multiplier: 1e81 },
  { suffix: 'qnvt', multiplier: 1e78 },
  { suffix: 'qdvt', multiplier: 1e75 },
  { suffix: 'tvt', multiplier: 1e72 },
  { suffix: 'dvt', multiplier: 1e69 },
  { suffix: 'uvt', multiplier: 1e66 },
  { suffix: 'vt', multiplier: 1e63 },
  { suffix: 'node', multiplier: 1e60 },
  { suffix: 'ocde', multiplier: 1e57 },
  { suffix: 'spde', multiplier: 1e54 },
  { suffix: 'sxde', multiplier: 1e51 },
  { suffix: 'qnde', multiplier: 1e48 },
  { suffix: 'qdde', multiplier: 1e45 },
  { suffix: 'tde', multiplier: 1e42 },
  { suffix: 'dde', multiplier: 1e39 },
  { suffix: 'ude', multiplier: 1e36 },
  { suffix: 'de', multiplier: 1e33 },
  { suffix: 'no', multiplier: 1e30 },
  { suffix: 'oc', multiplier: 1e27 },
  { suffix: 'sp', multiplier: 1e24 },
  { suffix: 'sx', multiplier: 1e21 },
  { suffix: 'qn', multiplier: 1e18 },
  { suffix: 'qd', multiplier: 1e15 },
  { suffix: 't', multiplier: 1e12 },
  { suffix: 'b', multiplier: 1e9 },
  { suffix: 'm', multiplier: 1e6 },
  { suffix: 'k', multiplier: 1e3 }
];

function formatBonuses(bonuses) {
  return `<ul>${bonuses.map(b => `<li>${b}</li>`).join('')}</ul>`;
}

function drawExponentialGraph(id, stat) {
  const container = document.getElementById(id);
  if (!container) {
    console.error(`Container ${id} not found`);
    return;
  }

  container.innerHTML = '<canvas></canvas>';
  const canvas = container.querySelector('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let maxCount = 50000;
  if (stat.cap !== undefined && stat.type === 'exponential') {
    const logBase = Math.log(stat.cap / stat.base) / Math.log(1.0000015);
    if (isFinite(logBase) && logBase > 0) {
      maxCount = Math.ceil(logBase);
    }
    maxCount = Math.min(maxCount, 50000000);
  }

  const data = [];
  let increment = 1;
  if (maxCount >= 10000000) increment = 10000;
  else if (maxCount >= 1000000) increment = 1000;
  else if (maxCount >= 100000) increment = 100;
  else if (maxCount >= 10000) increment = 10;

  data.push({ x: 0, y: stat.base });
  for (let i = 1; i <= maxCount; i += increment) {
    const value = stat.base * Math.pow(1.0000015, i);
    data.push({ x: i, y: Math.min(value, stat.cap) });
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: stat.label,
        data: data,
        borderColor: '#00aaff',
        backgroundColor: 'rgba(0, 170, 255, 0.1)',
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      animation: false,
      normalized: true,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: {
          mode: 'nearest',
          intersect: false,
          callbacks: {
            label: function(context) {
              const x = context.parsed.x;
              const y = context.parsed.y;
              return `Count: ${formatValue(x)}, Value: ${formatValue(y)}`;
            }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          min: 0,
          title: { display: true, text: 'Count' },
          grid: { color: '#333' },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            callback: function(value) {
              return formatValue(value);
            }
          }
        },
        y: {
          title: { display: true, text: 'Value' },
          grid: { color: '#333' },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 8,
            callback: function(value) {
              return formatValue(value);
            },
            beginAtZero: true
          }
        }
      }
    }
  });
}

function formatValue(value, originalSuffix = null) {
  if (value === 0) return '0';
  if (value < 1000) return value.toLocaleString();
  if (originalSuffix) {
    const suffixObj = suffixes.find(s => s.suffix === originalSuffix);
    if (suffixObj) {
      return (value / suffixObj.multiplier).toFixed(1) + originalSuffix;
    }
  }
  const suffixMap = new Map(suffixes.map(s => [s.multiplier, s.suffix]));
  for (let i = 0; i < suffixes.length; i++) {
    const suffix = suffixes[i];
    if (value >= suffix.multiplier && (i === 0 || value < suffixes[i - 1].multiplier)) {
      return (value / suffix.multiplier).toFixed(1) + suffix.suffix;
    }
  }
  return value.toLocaleString(); // Fallback
}

function parseAbbreviatedNumber(str) {
  if (!str || typeof str !== 'string') return { value: 0, suffix: '' };
  const input = str.trim().toLowerCase();
  const match = input.match(/(-?\d*\.?\d+)?(.*)/);
  if (!match || !match[1]) return { value: 0, suffix: '' };

  const num = parseFloat(match[1]) || 0;
  const suffixStr = match[2] || '';

  let suffix = null;
  for (let len = suffixStr.length; len > 0; len--) {
    const testSuffix = suffixStr.substring(0, len);
    suffix = suffixes.find(s => s.suffix === testSuffix);
    if (suffix) break;
  }

  const multiplier = suffix ? suffix.multiplier : 1;
  return { value: num * multiplier, suffix: suffix ? suffix.suffix : '' };
}

function renderRuneList() {
  const hideInstant = document.getElementById('hideInstantToggle').checked;
  const showGraphs = document.getElementById('showGraphsToggle').checked;
  const rpsResult = parseAbbreviatedNumber(document.getElementById('rps').value);
  const runeCloneResult = parseAbbreviatedNumber(document.getElementById('runeClone').value);
  const realRPS = (rpsResult.value > 0 && runeCloneResult.value > 0) ? rpsResult.value / runeCloneResult.value : 0;

  const runeListDiv = document.getElementById('runeList');
  runeListDiv.innerHTML = runeData.map((rune, idx) => {
    let isInstant = false;
    if (realRPS > 0 && rune.chance / realRPS < 1) isInstant = true;
    if (hideInstant && isInstant) return '';

    const exponentialStats = rune.stats.filter(stat => stat.type === 'exponential');
    let graphsHtml = '';
    if (showGraphs && exponentialStats.length > 0) {
      graphsHtml = exponentialStats.map((stat, sidx) =>
        `<div style="margin-top:12px;">
          <b>${stat.label}</b>
          <div id="rune-graph-${idx}-${sidx}" style="width:100%;max-width:400px;height:220px;"></div>
        </div>`
      ).join('');
    }

    return `<div class="output" style="margin-top:16px; text-align:left;">
      <b>${rune.name}</b> <span style="color:#aaa;">(1/${formatValue(rune.chance)})</span>
      ${isInstant ? '<span style="color:#6f6;">Instant</span>' : ''}
      <br><b>Bonuses:</b> ${formatBonuses(rune.bonuses)}
      ${graphsHtml}
    </div>`;
  }).join('');

  if (showGraphs) {
    runeData.forEach((rune, idx) => {
      const exponentialStats = rune.stats.filter(stat => stat.type === 'exponential');
      exponentialStats.forEach((stat, sidx) => {
        const graphId = `rune-graph-${idx}-${sidx}`;
        if (document.getElementById(graphId)) {
          drawExponentialGraph(graphId, stat);
        }
      });
    });
  }
}

document.getElementById('calculateBtn').addEventListener('click', function() {
  const rpsResult = parseAbbreviatedNumber(document.getElementById('rps').value);
  const runeCloneResult = parseAbbreviatedNumber(document.getElementById('runeClone').value);
  const output = document.getElementById('output');

  if (isNaN(rpsResult.value) || isNaN(runeCloneResult.value) || rpsResult.value <= 0 || runeCloneResult.value <= 0) {
    output.textContent = 'Please enter valid positive numbers for RPS and Rune Clone.';
    renderRuneList();
    return;
  }

  const realRPS = rpsResult.value / runeCloneResult.value;
  output.innerHTML = `<b>Real RPS: ${formatValue(realRPS, rpsResult.suffix || runeCloneResult.suffix)}</b>`;
  renderRuneList();
});

document.getElementById('hideInstantToggle').addEventListener('change', renderRuneList);
document.getElementById('showGraphsToggle').addEventListener('change', renderRuneList);

renderRuneList();
