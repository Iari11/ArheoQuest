// User data
let money = 0;
const artifacts = [];
const collected = [];

// Generate 20 unique artifacts
for (let i = 1; i <= 20; i++) {
  const artifact = {
    id: i,
    name: `Artifact ${i}`,
    time: `Period ${Math.floor(Math.random()*5+1)}`,
    rarity: ['Common','Uncommon','Rare','Legendary'][Math.floor(Math.random()*4)],
    story: `This is a unique artifact number ${i}. It has a fascinating history.`,
    x: Math.random()*400+20,
    y: Math.random()*400+20,
    icon: 'https://i.imgur.com/Fz9dH4g.png' // Replace with cute artifact icon later
  };
  artifacts.push(artifact);
}

// Place artifacts on map
const map = document.getElementById('map');
artifacts.forEach(a => {
  const el = document.createElement('div');
  el.className = 'artifact';
  el.style.left = `${a.x}px`;
  el.style.top = `${a.y}px`;
  el.style.backgroundImage = `url(${a.icon})`;
  el.title = `${a.name} (${a.rarity})`;
  el.addEventListener('click', () => collectArtifact(a, el));
  map.appendChild(el);
});

function collectArtifact(a, el) {
  if (!collected.includes(a.id)) {
    collected.push(a.id);
    el.remove();
    money += 10;
    updateMoney();
    showPopup(`${a.name} collected! ${a.story}`);
    addToMuseum(a);
  }
}

function addToMuseum(a) {
  const museum = document.getElementById('museum');
  const card = document.createElement('div');
  card.className = 'artifact-card';
  card.innerHTML = `<strong>${a.name}</strong><br>${a.time}<br>${a.rarity}`;
  museum.appendChild(card);
}

function updateMoney() {
  document.getElementById('money-display').textContent = `Coins: ${money}`;
}

// Popup
function showPopup(text) {
  const popup = document.getElementById('popup');
  document.getElementById('popup-text').textContent = text;
  popup.classList.remove('hidden');
}

document.getElementById('close-popup').addEventListener('click', () => {
  document.getElementById('popup').classList.add('hidden');
});

// Sliders affect money every 5 seconds
setInterval(() => {
  const light = document.getElementById('light').value;
  const temp = document.getElementById('temp').value;
  const humidity = document.getElementById('humidity').value;

  let bonus = 0;
  if (light>40 && light<60) bonus += 1;
  if (temp>40 && temp<60) bonus += 1;
  if (humidity>40 && humidity<60) bonus += 1;

  money += bonus;
  updateMoney();
}, 5000);
