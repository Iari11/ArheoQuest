const artifacts = [
  { name: "Casca Dacică", story: "O cască purtată de războinicii daci în războaiele antice.", period: "1st century BC", rarity: "Rar", x: 200, y: 150 },
  { name: "Monedă Romană", story: "O monedă bătută în Dacia romană, cu chipul împăratului.", period: "2nd century AD", rarity: "Comun", x: 450, y: 250 },
  { name: "Vază Antică", story: "O vază decorată frumos dintr-o așezare romană.", period: "1st century AD", rarity: "Necomun", x: 600, y: 120 },
  { name: "Brățară Tracică", story: "O brățară purtată de nobilii tracici, simbol al statutului.", period: "3rd century BC", rarity: "Rar", x: 350, y: 80 },
  { name: "Amforă Romană", story: "O amforă folosită pentru transportul vinului în Imperiul Roman.", period: "1st century AD", rarity: "Necomun", x: 520, y: 200 },
  { name: "Statuetă Dacică", story: "O mică statuetă reprezentând un zeu dac.", period: "2nd century BC", rarity: "Foarte Rar", x: 700, y: 180 }
];

let collectedArtifacts = JSON.parse(localStorage.getItem('collectedArtifacts')) || [];
let money = parseInt(localStorage.getItem('money')) || 0;

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

let currentArtifact = null;

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
    collectedArtifacts.push(currentArtifact);
    localStorage.setItem('collectedArtifacts', JSON.stringify(collectedArtifacts));
    money += 10;
    localStorage.setItem('money', money);
    updateMuseum();
    moneyDisplay.textContent = `💰 Bani: ${money}`;
    if (currentArtifact.element) currentArtifact.element.remove();
    popup.classList.add('hidden');
  }
});

// Update museum
function updateMuseum() {
  museumGallery.innerHTML = '';
  collectedArtifacts.forEach(art => {
    const div = document.createElement('div');
    div.classList.add('museum-artifact');
    div.innerHTML = `<h4>${art.name}</h4><p>${art.period}</p><p>${art.rarity}</p>`;
    museumGallery.appendChild(div);
  });
}

displayArtifacts();
updateMuseum();
moneyDisplay.textContent = `💰 Bani: ${money}`;
