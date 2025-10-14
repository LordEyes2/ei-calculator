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
      { label: 'Watts', type: 'exponential', base: 1, growth: 1.0000015, cap: 100000 }, // Updated growth
      { label: 'Wood', type: 'linear', base: 5, growth: 1, cap: 50 },
      { label: 'Clovers', type: 'linear', base: 1, growth: 1, cap: 10 }
    ]
  }
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

  // Remove existing canvas if any
  container.innerHTML = '<canvas></canvas>';
  const canvas = container.querySelector('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Calculate maxCount based on cap or a default threshold
  let maxCount = 50000; // Default max if no cap or calculation fails
  if (stat.cap !== undefined && stat.type === 'exponential') {
    // For new exponential model: value = base * (1.0000015 ^ count) <= cap
    // Solve for maxCount: log(cap / base) / log(1.0000015)
    const logBase = Math.log(stat.cap / stat.base) / Math.log(1.0000015);
    if (isFinite(logBase) && logBase > 0) {
      maxCount = Math.ceil(logBase);
    }
    maxCount = Math.min(maxCount, 50000000); // Cap at 50M for performance
  }

  const data = [];
  let increment = 1;
  if (maxCount >= 10000000) increment = 10000;
  else if (maxCount >= 1000000) increment = 1000;
  else if (maxCount >= 100000) increment = 100;
  else if (maxCount >= 10000) increment = 10;

  // Start at count = 0 with initial value
  data.push({ x: 0, y: stat.base });
  for (let i = 1; i <= maxCount; i += increment) {
    const value = stat.base * Math.pow(1.0000015, i); // Use 1.0000015 ^ count
    data.push({ x: i, y: Math.min(value, stat.cap) }); // Apply cap
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

function formatValue(value) {
  if (value === 0) return '0';
  if (value < 1000) return value.toLocaleString();
  if (value < 1000000) return (value / 1000).toFixed(1) + 'K';
  return (value / 1000000).toFixed(1) + 'M';
}

function renderRuneList() {
  const hideInstant = document.getElementById('hideInstantToggle').checked;
  const showGraphs = document.getElementById('showGraphsToggle').checked;
  const rps = parseFloat(document.getElementById('rps').value);
  const runeClone = parseFloat(document.getElementById('runeClone').value);
  const realRPS = (rps > 0 && runeClone > 0) ? rps / runeClone : 0;

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
      <b>${rune.name}</b> <span style="color:#aaa;">(1/${rune.chance.toLocaleString()})</span>
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
  const rps = parseFloat(document.getElementById('rps').value);
  const runeClone = parseFloat(document.getElementById('runeClone').value);
  const output = document.getElementById('output');

  if (isNaN(rps) || isNaN(runeClone) || rps <= 0 || runeClone <= 0) {
    output.textContent = 'Please enter valid positive numbers for RPS and Rune Clone.';
    renderRuneList();
    return;
  }

  const realRPS = rps / runeClone;
  output.innerHTML = `<b>Real RPS: ${realRPS.toFixed(2)}</b>`;
  renderRuneList();
});

document.getElementById('hideInstantToggle').addEventListener('change', renderRuneList);
document.getElementById('showGraphsToggle').addEventListener('change', renderRuneList);

renderRuneList();
