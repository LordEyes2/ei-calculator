document.getElementById('calculateBtn').addEventListener('click', function() {
  const rps = parseFloat(document.getElementById('rps').value);
  const runeClone = parseFloat(document.getElementById('runeClone').value);
  const runeType = parseInt(document.getElementById('runeType').value);
  const output = document.getElementById('output');

  if (isNaN(rps) || isNaN(runeClone) || isNaN(runeType) || rps <= 0 || runeClone <= 0) {
    output.textContent = 'Please enter valid positive numbers for RPS and Rune Clone.';
    return;
  }

  // Calculate real RPS as RPS / Rune Clone
  const realRPS = rps / runeClone;
  const totalSeconds = runeType / realRPS;

  let formattedTime = '';
  if (totalSeconds < 60) {
    formattedTime = `${Math.round(totalSeconds)} seconds`;
  } else if (totalSeconds < 3600) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.round(totalSeconds % 60);
    formattedTime = `${mins} minutes${secs > 0 ? `, ${secs} seconds` : ''}`;
  } else {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.round(totalSeconds % 60);
    formattedTime = `${hrs} hours${mins > 0 ? `, ${mins} minutes` : ''}${secs > 0 ? `, ${secs} seconds` : ''}`;
  }

  const runeNames = {
    1000000: 'Eternal',
    2500000: 'Oblivion',
    10000000: 'Umbralith',
    20000000: 'Nuclear',
    25000000: 'Aero'
  };
  const runeLabel = runeNames[runeType] || 'Rune';
  let stats = '';
  // Rune stats template
  const runeStats = {
    1000000: `<b>Bonuses:</b><ul>
      <li>100x Energy</li>
      <li>25x Flux</li>
      <li>10x Surge</li>
      <li>1x Voltage</li>
      <li>2x Rarity Speed (2x Max)</li>
    </ul>`,
    2500000: `<b>Bonuses:</b><ul>
      <li>150x Energy</li>
      <li>50x Flux</li>
      <li>25x Surge</li>
      <li>5x Voltage</li>
      <li>1x Chips</li>
      <li>1x Passive Luck (1x Max)</li>
    </ul>`,
    10000000: `<b>Bonuses:</b><ul>
      <li>250x Energy</li>
      <li>150 Flux</li>
      <li>100x Surge</li>
      <li>50x Voltage</li>
      <li>2x Chips</li>
      <li>0.5x Watts (10x Max)</li>
      <li>5x Wood (50x Max)</li>
      <li>0.5x Tree Damage (5x Max)</li>
      <li>Secret Upgrade</li>
    </ul>`,
    20000000: `<b>Bonuses:</b><ul>
      <li>500x Energy</li>
      <li>250x Flux</li>
      <li>200x Surge</li>
      <li>100x Voltage</li>
      <li>5x Chips</li>
      <li>1x Watts (10x Max)</li>
      <li>2x Passive Speed (2x Max)</li>
      <li>2x Rune Speed (2x Max)</li>
    </ul>`,
    25000000: `<b>Bonuses:</b><ul>
      <li>300x Energy</li>
      <li>175x Flux</li>
      <li>125x Surge</li>
      <li>100x Voltage</li>
      <li>1x Watts (10x Max)</li>
      <li>5x Wood (50x Max)</li>
      <li>1x Clovers (10x Max)</li>
      <li>Secret Stat</li>
    </ul>`
  };
  if (runeStats[runeType]) {
    stats = `<br><br>${runeStats[runeType]}`;
  }

  output.innerHTML = `To get <b>1 ${runeLabel}</b>:<br>
    With RPS: <b>${rps}</b> and Rune Clone: <b>${runeClone}</b><br>
    <b>Real RPS: ${realRPS.toFixed(2)}</b><br>
    <b>~${formattedTime}</b>${stats}`;
});
