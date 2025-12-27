const artifacts = [
  { name: "Casca Dacică", story: "O cască purtată de războinicii daci.", period: "1st century BC", rarity: "Rar", x: 200, y: 150 },
  { name: "Monedă Romană", story: "Monedă bătută în Dacia romană.", period: "2nd century AD", rarity: "Comun", x: 450, y: 250 },
  { name: "Vază Antică", story: "O vază decorată frumos.", period: "1st century AD", rarity: "Necomun", x: 600, y: 120 },
  { name: "Brățară Tracică", story: "O brățară purtată de nobilii tracici.", period: "3rd century BC", rarity: "Rar", x: 350, y: 80 },
  { name: "Amforă Romană", story: "Amforă folosită pentru transportul vinului.", period: "1st century AD", rarity: "Necomun", x: 520, y: 200 },
  { name: "Statuetă Dacică", story: "O mică statuetă reprezentând un zeu dac.", period: "2nd century BC", rarity: "Foarte Rar", x: 700, y: 180 }
];

let collectedArtifacts = JSON.parse(localStorage.getItem('collectedArtifacts')) || [];
let money = parseInt(localStorage.getItem('money')) || 0;
let decorations = JSON.parse(localStorage.getItem('decorations')) || { background: '#fdf6f0', frame: '#a0522d' };

const mapContainer = document.getElementById('map-container');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');
const artifactName = document.getElementById('artifact-name');
const artifactStory = document.getElementById('artifact-story');
const artifactPeriod = document.getElementById('artifact-period');
const artifactRarity = document.getElementById('artifact-rarity');
const collectBtn = document.getElementById('collect-btn');
const museumGallery = document.getElementById('museum-gallery');
const moneyDisplay = document.getElementById('money');

// Display artifacts on map
function displayArtifacts() {
  artifacts.forEach((art, index) => {
    if (!collectedArtifacts.find(a => a.name === art.name)) {
      const div = document.createElement('div');
      div.classList.add('artifact');
      div.style.left = art.x + 'px';
      div.style.top = art.y + 'px';
      div.textContent = "🪨";
      div.title = art.name;
      div.addEventListener('click', () => openPopup(index));
      mapContainer.appendChild(div);
      art.element = div;
    }
  });
}

// Open popup
function openPopup(index) {
  currentArtifact = artifacts[index];
  artifactName.textContent = currentArtifact.name;
  artifactStory.textContent = currentArtifact.story;
  artifactPeriod.textContent = currentArtifact.period;
  artifactRarity.textContent = currentArtifact.rarity;
  popup.classList.remove('hidden');
}

// Close popup
closePopup.addEventListener('click', () => popup.classList.add('hidden'));

// Collect artifact
collectBtn.addEventListener('click', () => {
  if (currentArtifact && !collectedArtifacts.find(a => a.name === currentArtifact.name)) {
    // Add sliders for care
    currentArtifact.light = 50;
    currentArtifact.temp = 50;
    currentArtifact.humidity = 50;
    collectedArtifacts.push(currentArtifact);
    localStorage.setItem('collectedArtifacts', JSON.stringify(collectedArtifacts));
    popup.classList.add('hidden');
    updateMuseum();
  }
});

// Update museum display
function updateMuseum() {
  museumGallery.innerHTML = '';
  museumGallery.style.backgroundColor = decorations.background;
  collectedArtifacts.forEach((art, idx) => {
    const div = document.createElement('div');
    div.classList.add('museum-artifact');
    div.style.border = `3px solid ${decorations.frame}`;
    div.innerHTML = `
      <h4>${art.name}</h4>
      <p>${art.period}</p>
      <p>${art.rarity}</p>
      <div class="sliders">
        <label>💡 Lumina</label><input type="range" min="0" max="100" value="${art.light}" data-type="light" data-index="${idx}">
        <label>🌡️ Temperatura</label><input type="range" min="0" max="100" value="${art.temp}" data-type="temp" data-index="${idx}">
        <label>💧 Umiditate</label><input type="range" min="0" max="100" value="${art.humidity}" data-type="humidity" data-index="${idx}">
      </div>
    `;
    museumGallery.appendChild(div);
  });

  // Add event listeners for sliders
  document.querySelectorAll('.museum-artifact input[type="range"]').forEach(slider => {
    slider.addEventListener('input', e => {
      const idx = e.target.dataset.index;
      const type = e.target.dataset.type;
      collectedArtifacts[idx][type] = parseInt(e.target.value);
    });
  });
}

// Decoration function
function setDecoration(type, color) {
  decorations[type] = color;
  localStorage.setItem('decorations', JSON.stringify(decorations));
  updateMuseum();
}

// Earn money from artifacts every 5 seconds
setInterval(() => {
  collectedArtifacts.forEach(art => {
    if (art.light >= 40 && art.light <= 60 &&
        art.temp >= 45 && art.temp <= 55 &&
        art.humidity >= 45 && art.humidity <= 55) {
      let earnings = 5;
      if (art.rarity === "Necomun") earnings = 8;
      if (art.rarity === "Rar") earnings = 12;
      if (art.rarity === "Foarte Rar") earnings = 20;
      money += earnings;
    }
  });
  localStorage.setItem('money', money);
  moneyDisplay.textContent = `💰 Bani: ${money}`;
}, 5000);

displayArtifacts();
updateMuseum();
moneyDisplay.textContent = `💰 Bani: ${money}`;

