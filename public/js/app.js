// App initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dashboard if on dashboard page
  if (document.getElementById('overview-section')) {
    initializeDashboard();
  }

  // Setup navigation
  setupNavigation();
  
  // Load initial data
  loadDashboardData();
});

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section;
      showSection(section);
      
      // Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
    });
  });
}

function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  
  // Show selected section
  const sectionId = `${sectionName}-section`;
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add('active');
  }
}

async function loadDashboardData() {
  try {
    // Load banned count
    const bansResponse = await fetch('/api/bans/count');
    const bansData = await bansResponse.json();
    if (bansData.success) {
      document.getElementById('banned-count').textContent = bansData.count;
    }

    // Load bots count
    const botsResponse = await fetch('/api/bots');
    const botsData = await botsResponse.json();
    if (botsData.success) {
      document.getElementById('active-bots').textContent = botsData.bots.length;
      displayBots(botsData.bots);
    }

    // Load banned list
    const bannedResponse = await fetch('/api/bans');
    const bannedData = await bannedResponse.json();
    if (bannedData.success) {
      displayBannedList(bannedData.bans);
    }

    // Check server status
    const statusResponse = await fetch('/health');
    if (statusResponse.ok) {
      document.getElementById('server-status').innerHTML = '🟢 Actif';
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
}

function displayBannedList(bans) {
  const tbody = document.getElementById('banned-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  if (bans.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #999;">Aucun numéro banni</td></tr>';
    return;
  }

  bans.forEach(ban => {
    const row = document.createElement('tr');
    const date = new Date(ban.bannedAt).toLocaleDateString();
    row.innerHTML = `
      <td>${ban.number}</td>
      <td>${date}</td>
      <td>${ban.reason || 'N/A'}</td>
      <td>
        <button class="btn" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="handleUnban('${ban.number}')">Débannir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function displayBots(bots) {
  const container = document.getElementById('bots-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (bots.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Aucun bot créé</p>';
    return;
  }

  bots.forEach(bot => {
    const card = document.createElement('div');
    card.className = 'bot-card';
    const statusClass = bot.active ? 'active' : 'inactive';
    const statusText = bot.active ? 'Actif' : 'Inactif';
    
    card.innerHTML = `
      <h4>${bot.name}</h4>
      <p>${bot.description || 'Pas de description'}</p>
      <span class="bot-status ${statusClass}">${statusText}</span>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="editBot('${bot.id}')">Éditer</button>
        <button class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: #ff6b6b; color: white;" onclick="deleteBot('${bot.id}')">Supprimer</button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function handleBan(event) {
  event.preventDefault();
  
  const number = document.getElementById('ban-number').value;
  const reason = document.getElementById('ban-reason').value;
  
  try {
    const response = await fetch('/api/bans/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, reason })
    });
    
    const data = await response.json();
    if (data.success) {
      alert('✅ Numéro banni avec succès');
      document.getElementById('ban-form').reset();
      loadDashboardData();
    } else {
      alert('❌ Erreur: ' + data.error);
    }
  } catch (error) {
    console.error('Error banning number:', error);
    alert('❌ Erreur lors du bannissement');
  }
}

async function handleUnban(number) {
  if (!confirm(`Êtes-vous sûr de vouloir débannir ${number} ?`)) return;
  
  try {
    const response = await fetch('/api/bans/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number })
    });
    
    const data = await response.json();
    if (data.success) {
      alert('✅ Numéro débanni avec succès');
      loadDashboardData();
    } else {
      alert('❌ Erreur: ' + data.error);
    }
  } catch (error) {
    console.error('Error unbanning number:', error);
    alert('❌ Erreur lors du débannissement');
  }
}

async function handleCreateBot(event) {
  event.preventDefault();
  
  const name = document.getElementById('bot-name').value;
  const description = document.getElementById('bot-description').value;
  
  try {
    const response = await fetch('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, active: true })
    });
    
    const data = await response.json();
    if (data.success) {
      alert('✅ Bot créé avec succès');
      document.getElementById('bot-form').reset();
      loadDashboardData();
    } else {
      alert('❌ Erreur: ' + data.error);
    }
  } catch (error) {
    console.error('Error creating bot:', error);
    alert('❌ Erreur lors de la création du bot');
  }
}

function editBot(botId) {
  alert('Fonction d\'édition à implémenter - Bot ID: ' + botId);
}

async function deleteBot(botId) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce bot ?')) return;
  
  try {
    const response = await fetch(`/api/bots/${botId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    if (data.success) {
      alert('✅ Bot supprimé');
      loadDashboardData();
    } else {
      alert('❌ Erreur: ' + data.error);
    }
  } catch (error) {
    console.error('Error deleting bot:', error);
    alert('❌ Erreur lors de la suppression');
  }
}

function saveSettings() {
  const banSystemEnabled = document.getElementById('system-ban').checked;
  const pluginsEnabled = document.getElementById('system-plugins').checked;
  
  const settings = {
    enableBanSystem: banSystemEnabled,
    enablePlugins: pluginsEnabled
  };
  
  localStorage.setItem('cesario-settings', JSON.stringify(settings));
  alert('✅ Paramètres enregistrés');
}

function logout() {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    localStorage.removeItem('auth-token');
    window.location.href = '/';
  }
}

function initializeDashboard() {
  // Load saved settings
  const savedSettings = localStorage.getItem('cesario-settings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    document.getElementById('system-ban').checked = settings.enableBanSystem;
    document.getElementById('system-plugins').checked = settings.enablePlugins;
  }
}
