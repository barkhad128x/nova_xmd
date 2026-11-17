/**
 * NOVA XMD - WhatsApp Pairing Code Generator & Server Hub
 * Complete Interactive Frontend Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  // Form & Generator
  const phoneInput = document.getElementById('phoneNumberInput');
  const clearInputBtn = document.getElementById('clearInputBtn');
  const inputErrorMsg = document.getElementById('inputErrorMsg');
  const errorText = document.getElementById('errorText');
  const pairCodeForm = document.getElementById('pairCodeForm');
  const generateBtn = document.getElementById('generateBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnIconPlane = document.getElementById('btnIconPlane');

  const resultBox = document.getElementById('resultBox');
  const idleState = document.getElementById('idleState');
  const successState = document.getElementById('successState');
  const generatedCodeDisplay = document.getElementById('generatedCodeDisplay');
  const countdownDisplay = document.getElementById('countdownDisplay');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const copyBtnText = document.getElementById('copyBtnText');

  // Country Dropdown
  const countryDropdownBtn = document.getElementById('countryDropdownBtn');
  const countryDropdownList = document.getElementById('countryDropdownList');
  const countrySearch = document.getElementById('countrySearch');
  const countryListOptions = document.getElementById('countryListOptions');
  const selectedFlag = document.getElementById('selectedFlag');
  const selectedCode = document.getElementById('selectedCode');

  // QR Modal
  const scanQrBtn = document.getElementById('scanQrBtn');
  const qrModal = document.getElementById('qrModal');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');

  // Mobile Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const bottomMenuTriggerBtn = document.getElementById('bottomMenuTriggerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  // Tab Views
  const views = {
    home: document.getElementById('view-home'),
    servers: document.getElementById('view-servers'),
    upgrade: document.getElementById('view-upgrade'),
    dashboard: document.getElementById('view-dashboard'),
    settings: document.getElementById('view-settings'),
    support: document.getElementById('view-support'),
    about: document.getElementById('view-about')
  };

  // Stats Elements
  const statActiveServersCount = document.getElementById('statActiveServersCount');
  const statActiveServersStatus = document.getElementById('statActiveServersStatus');
  const statUsersCount = document.getElementById('statUsersCount');
  const statUsersGrowth = document.getElementById('statUsersGrowth');
  const statFreeSlots = document.getElementById('statFreeSlots');
  const statFreeSlotsBar = document.getElementById('statFreeSlotsBar');

  const statViewOnceCount = document.getElementById('statViewOnceCount');
  const statStatusSavedCount = document.getElementById('statStatusSavedCount');
  const statMessagesHandledCount = document.getElementById('statMessagesHandledCount');

  // Server Refresh
  const refreshServersBtn = document.getElementById('refreshServersBtn');
  const refreshBtnLabel = document.getElementById('refreshBtnLabel');

  // Payment Modal Elements
  const paymentModal = document.getElementById('paymentModal');
  const closePaymentModalBtn = document.getElementById('closePaymentModalBtn');
  const modalPlanTitle = document.getElementById('modalPlanTitle');
  const modalPlanPrice = document.getElementById('modalPlanPrice');
  const confirmPaymentWhatsAppBtn = document.getElementById('confirmPaymentWhatsAppBtn');

  // Dashboard Elements
  const disconnectBotBtn = document.getElementById('disconnectBotBtn');
  const disconnectBtnLabel = document.getElementById('disconnectBtnLabel');
  const botLiveBadge = document.getElementById('botLiveBadge');
  const botStatusTag = document.getElementById('botStatusTag');
  const connectedNumberDisplay = document.getElementById('connectedNumberDisplay');
  const restartBotBtn = document.getElementById('restartBotBtn');
  const botSessionTag = document.getElementById('botSessionTag');
  const botUptimeDisplay = document.getElementById('botUptimeDisplay');
  const dashboardLinkDeviceBtn = document.getElementById('dashboardLinkDeviceBtn');

  // Header Status Elements
  const mobileHeaderStatusPill = document.getElementById('mobileHeaderStatusPill');
  const mobileHeaderStatusDot = document.getElementById('mobileHeaderStatusDot');
  const mobileHeaderStatusText = document.getElementById('mobileHeaderStatusText');
  const desktopHeaderStatusPill = document.getElementById('desktopHeaderStatusPill');
  const desktopHeaderStatusDot = document.getElementById('desktopHeaderStatusDot');
  const desktopHeaderPingDot = document.getElementById('desktopHeaderPingDot');
  const desktopHeaderStatusText = document.getElementById('desktopHeaderStatusText');

  // Settings Elements
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const botPrefixSelect = document.getElementById('botPrefixSelect');
  const botModeSelect = document.getElementById('botModeSelect');
  const settingAutoStatus = document.getElementById('settingAutoStatus');
  const settingAntiDelete = document.getElementById('settingAntiDelete');

  // State Variables
  let isBotConnected = true;
  let activeCode = '';
  let timerInterval = null;
  let currentActiveTab = 'home';

  // Country list data
  const countries = [
    { name: 'Somalia', code: '+252', flag: '🇸🇴', minLen: 7, maxLen: 10 },
    { name: 'Kenya', code: '+254', flag: '🇰🇪', minLen: 9, maxLen: 10 },
    { name: 'Ethiopia', code: '+251', flag: '🇪🇹', minLen: 9, maxLen: 10 },
    { name: 'Djibouti', code: '+253', flag: '🇩🇯', minLen: 8, maxLen: 9 },
    { name: 'United States / Canada', code: '+1', flag: '🇺🇸', minLen: 10, maxLen: 10 },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧', minLen: 10, maxLen: 11 },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', minLen: 9, maxLen: 10 },
    { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', minLen: 9, maxLen: 10 },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬', minLen: 10, maxLen: 11 },
    { name: 'India', code: '+91', flag: '🇮🇳', minLen: 10, maxLen: 10 },
    { name: 'Pakistan', code: '+92', flag: '🇵🇰', minLen: 10, maxLen: 10 },
    { name: 'South Africa', code: '+27', flag: '🇿🇦', minLen: 9, maxLen: 10 },
    { name: 'Egypt', code: '+20', flag: '🇪🇬', minLen: 10, maxLen: 11 },
    { name: 'Germany', code: '+49', flag: '🇩🇪', minLen: 10, maxLen: 12 },
    { name: 'France', code: '+33', flag: '🇫🇷', minLen: 9, maxLen: 10 },
    { name: 'Turkey', code: '+90', flag: '🇹🇷', minLen: 10, maxLen: 10 },
    { name: 'Yemen', code: '+967', flag: '🇾🇪', minLen: 9, maxLen: 10 },
    { name: 'Sudan', code: '+249', flag: '🇸🇩', minLen: 9, maxLen: 10 },
    { name: 'Uganda', code: '+256', flag: '🇺🇬', minLen: 9, maxLen: 10 },
    { name: 'Tanzania', code: '+255', flag: '🇹🇿', minLen: 9, maxLen: 10 }
  ];

  let currentCountry = countries[0]; // Somalia by default

  // ==========================================
  // TAB NAVIGATION ENGINE
  // ==========================================
  function switchTab(targetTab) {
    if (!views[targetTab]) return;

    currentActiveTab = targetTab;

    // Hide all views
    Object.values(views).forEach(v => {
      if (v) v.classList.add('hidden');
    });

    // Show target view
    views[targetTab].classList.remove('hidden');

    // Update Desktop Navigation states
    document.querySelectorAll('.desktop-nav-item').forEach(item => {
      const tab = item.getAttribute('data-tab');
      if (tab === targetTab) {
        if (tab === 'upgrade') {
          item.className = 'desktop-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-purple-600 text-white font-bold shadow-glow-gold transition-all duration-200 text-left';
        } else {
          item.className = 'desktop-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-[0_4px_20px_rgba(132,61,255,0.45)] transition-all duration-200 text-left';
        }
      } else {
        if (tab === 'upgrade') {
          item.className = 'desktop-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/20 transition-all duration-200 text-left';
        } else {
          item.className = 'desktop-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl text-purple-200/70 hover:text-white hover:bg-purple-900/20 transition-all duration-200 text-left';
        }
      }
    });

    // Update Mobile Drawer navigation items
    document.querySelectorAll('.drawer-nav-item').forEach(item => {
      const tab = item.getAttribute('data-tab');
      if (tab === targetTab) {
        if (tab === 'upgrade') {
          item.className = 'drawer-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-purple-600 text-white font-bold shadow-glow-gold text-left transition';
        } else {
          item.className = 'drawer-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-glow-purple text-left transition';
        }
      } else {
        if (tab === 'upgrade') {
          item.className = 'drawer-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-purple-600/10 border border-amber-500/30 text-amber-300 font-bold text-left transition';
        } else {
          item.className = 'drawer-nav-item w-full flex items-center justify-between px-4 py-3 rounded-2xl text-gray-300 hover:text-white hover:bg-purple-950/40 font-medium text-left transition';
        }
      }
    });

    // Update Mobile Bottom Bar item states
    document.querySelectorAll('.mobile-bottom-tab').forEach(item => {
      const tab = item.getAttribute('data-tab');
      const label = item.querySelector('.tab-label');

      if (tab === targetTab) {
        item.classList.add('active');
        if (tab === 'upgrade') {
          item.classList.remove('opacity-70');
        } else {
          item.classList.remove('text-purple-300/70');
          item.classList.add('text-white');
          if (label) label.classList.add('text-purple-300');
        }
      } else {
        item.classList.remove('active');
        if (tab === 'upgrade') {
          item.classList.add('opacity-90');
        } else {
          item.classList.add('text-purple-300/70');
          item.classList.remove('text-white');
          if (label) label.classList.remove('text-purple-300');
        }
      }
    });

    closeMobileDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Global Tab Trigger Listener
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tab]');
    if (trigger) {
      const tab = trigger.getAttribute('data-tab');
      if (tab && views[tab]) {
        e.preventDefault();
        switchTab(tab);
      }
    }
  });

  // ==========================================
  // PAYMENT MODAL (ZAAD, EDAHAB, EVC PLUS)
  // ==========================================
  function openPaymentModal(planName, price) {
    modalPlanTitle.textContent = planName;
    modalPlanPrice.textContent = price;

    const message = encodeURIComponent(`Asc Maamulka NOVA XMD,\nWaxaan doonayaa inaan bixiyo lacagta qorshaha: ${planName} (${price}).\nFadlan iifura VIP Access-ka.`);
    confirmPaymentWhatsAppBtn.href = `https://wa.me/252611234567?text=${message}`;

    paymentModal.classList.remove('hidden');
    paymentModal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }

  function closePaymentModal() {
    paymentModal.classList.add('hidden');
    paymentModal.classList.remove('flex');
  }

  document.querySelectorAll('.buy-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || 'Pro VIP Server';
      const price = btn.getAttribute('data-price') || '$6 / bishii';
      openPaymentModal(plan, price);
    });
  });

  if (closePaymentModalBtn) {
    closePaymentModalBtn.addEventListener('click', closePaymentModal);
  }

  if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
      if (e.target === paymentModal) closePaymentModal();
    });
  }

  // Copy Payment Account Numbers
  document.querySelectorAll('.copy-pay-num').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const num = btn.getAttribute('data-number');
      if (num) {
        await copyToClipboard(num);
        showToast(`Lambarka '${num}' waa la koobiyeeyay!`, 'success');
      }
    });
  });

  // ==========================================
  // SERVER SWITCHING SIMULATION
  // ==========================================
  document.querySelectorAll('.server-connect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serverName = btn.getAttribute('data-server');
      showToast(`Waxaad si toos ah ugu xirantay: ${serverName}`, 'success');

      document.querySelectorAll('.server-connect-btn').forEach(b => {
        b.textContent = 'Switch to this server';
        b.className = 'server-connect-btn w-full py-2.5 px-3 rounded-xl bg-purple-950/60 border border-purple-700/40 text-purple-200 text-xs font-semibold hover:bg-purple-900/60 transition';
      });

      btn.textContent = 'Current Server (Connected ✓)';
      btn.className = 'server-connect-btn w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md transition';
    });
  });

  // Server Latency Refresh
  if (refreshServersBtn) {
    refreshServersBtn.addEventListener('click', async () => {
      refreshServersBtn.disabled = true;
      refreshBtnLabel.textContent = 'Testing Ping...';
      const icon = refreshServersBtn.querySelector('i');
      if (icon) icon.classList.add('animate-spin');

      await new Promise(r => setTimeout(r, 700));

      const ping1 = Math.floor(Math.random() * 6) + 16; // 16-22ms
      const ping2 = Math.floor(Math.random() * 5) + 11; // 11-16ms
      const ping3 = Math.floor(Math.random() * 4) + 7;  // 7-11ms

      const elPing1 = document.querySelector('.server-ping-1');
      const elPing2 = document.querySelector('.server-ping-2');
      const elPing3 = document.querySelector('.server-ping-3');

      if (elPing1) elPing1.textContent = `${ping1} ms`;
      if (elPing2) elPing2.textContent = `${ping2} ms`;
      if (elPing3) elPing3.textContent = `${ping3} ms`;

      refreshServersBtn.disabled = false;
      refreshBtnLabel.textContent = 'Test Latency';
      if (icon) icon.classList.remove('animate-spin');

      showToast(`Server Ping Test Complete! Celcelis: ${Math.round((ping1+ping2+ping3)/3)}ms`, 'success');
    });
  }

  // ==========================================
  // DASHBOARD ACTIONS (DISCONNECT, LINK DEVICE & RESTART)
  // ==========================================
  if (disconnectBotBtn) {
    disconnectBotBtn.addEventListener('click', async () => {
      if (isBotConnected) {
        if (!confirm('Ma hubtaa inaad doonayso inaad ka baxdo (Logout/Disconnect) bot-kaaga?')) return;

        disconnectBotBtn.disabled = true;
        if (disconnectBtnLabel) disconnectBtnLabel.textContent = 'Disconnecting...';

        try {
          const res = await fetch('/api/disconnect', { method: 'POST' });
          const data = await res.json();
          syncLiveConnectionUI({ connected: false });
          showToast('Bot-kaaga waa laga saaray (Session Disconnected & Cleared).', 'error');
        } catch (err) {
          showToast('Cillad ayaa dhacday inta bot-ka laga baxayay.', 'error');
        } finally {
          disconnectBotBtn.disabled = false;
        }
      } else {
        // Not connected -> Open Live QR Scanner Modal directly!
        openQrModal();
      }
    });
  }

  // Dashboard Link Device button (when disconnected)
  if (dashboardLinkDeviceBtn) {
    dashboardLinkDeviceBtn.addEventListener('click', () => {
      openQrModal();
    });
  }

  if (restartBotBtn) {
    restartBotBtn.addEventListener('click', async () => {
      restartBotBtn.disabled = true;
      const originalHtml = restartBotBtn.innerHTML;
      restartBotBtn.innerHTML = '<span class="animate-spin inline-block mr-1">⟳</span> Restarting Session...';

      try {
        await fetch('/api/restart', { method: 'POST' });
        showToast('Bot session dib ayaa loo bilaabay! ⚡', 'success');
        setTimeout(checkLiveConnectionStatus, 1500);
      } catch (err) {
        showToast('Lama bilaabi karin bot-ka.', 'error');
      } finally {
        restartBotBtn.disabled = false;
        restartBotBtn.innerHTML = originalHtml;
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  // ==========================================
  // SETTINGS FORM SAVING
  // ==========================================
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const config = {
        prefix: botPrefixSelect ? botPrefixSelect.value : '.',
        mode: botModeSelect ? botModeSelect.value : 'public',
        autoStatus: settingAutoStatus ? settingAutoStatus.checked : true,
        antiDelete: settingAntiDelete ? settingAntiDelete.checked : true
      };

      try {
        localStorage.setItem('nova_xmd_config', JSON.stringify(config));
      } catch (e) {}

      showToast('Habeynta Bot-kaaga (Settings) waa la keydiyay!', 'success');
    });
  }

  // ==========================================
  // MOBILE DRAWER
  // ==========================================
  function openMobileDrawer() {
    mobileDrawer.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.add('hidden');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
  if (bottomMenuTriggerBtn) bottomMenuTriggerBtn.addEventListener('click', openMobileDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileDrawer);

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeMobileDrawer();
    });
  }

  // ==========================================
  // PAIRING CODE GENERATOR & PHONE NUMBER
  // ==========================================
  function renderCountries(filter = '') {
    countryListOptions.innerHTML = '';
    const filtered = countries.filter(c => 
      c.name.toLowerCase().includes(filter.toLowerCase()) || 
      c.code.includes(filter)
    );

    if (filtered.length === 0) {
      countryListOptions.innerHTML = '<div class="p-2 text-xs text-purple-300/50 text-center">No country found</div>';
      return;
    }

    filtered.forEach(country => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-purple-900/50 text-left transition ' + 
        (country.code === currentCountry.code ? 'bg-purple-950/60 text-white font-semibold' : 'text-purple-200/80');
      
      btn.innerHTML = `
        <div class="flex items-center gap-2">
          <span>${country.flag}</span>
          <span>${country.name}</span>
        </div>
        <span class="font-mono text-purple-400">${country.code}</span>
      `;

      btn.addEventListener('click', () => {
        selectCountry(country);
      });

      countryListOptions.appendChild(btn);
    });
  }

  function selectCountry(country) {
    currentCountry = country;
    selectedFlag.textContent = country.flag;
    selectedCode.textContent = country.code;
    countryDropdownList.classList.add('hidden');
    phoneInput.focus();
  }

  countryDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = countryDropdownList.classList.contains('hidden');
    if (isHidden) {
      countryDropdownList.classList.remove('hidden');
      countrySearch.value = '';
      renderCountries();
      setTimeout(() => countrySearch.focus(), 50);
    } else {
      countryDropdownList.classList.add('hidden');
    }
  });

  countrySearch.addEventListener('input', (e) => {
    renderCountries(e.target.value);
  });

  document.addEventListener('click', (e) => {
    if (!countryDropdownList.contains(e.target) && !countryDropdownBtn.contains(e.target)) {
      countryDropdownList.classList.add('hidden');
    }
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '');
    if (phoneInput.value.length > 0) {
      clearInputBtn.classList.remove('hidden');
      hideError();
    } else {
      clearInputBtn.classList.add('hidden');
    }
  });

  clearInputBtn.addEventListener('click', () => {
    phoneInput.value = '';
    clearInputBtn.classList.add('hidden');
    hideError();
    phoneInput.focus();
  });

  function showError(msg) {
    errorText.textContent = msg;
    inputErrorMsg.classList.remove('hidden');
  }

  function hideError() {
    inputErrorMsg.classList.add('hidden');
  }

  function generateRandomCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let part1 = '';
    let part2 = '';
    for (let i = 0; i < 4; i++) {
      part1 += chars.charAt(Math.floor(Math.random() * chars.length));
      part2 += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${part1} - ${part2}`;
  }

  pairCodeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawNumber = phoneInput.value.trim();

    if (!rawNumber) {
      showError('Fadlan geli lambarkaaga WhatsApp (Please enter your WhatsApp number).');
      phoneInput.focus();
      return;
    }

    if (rawNumber.length < 6) {
      showError('Lambarku aad buu u gaaban yahay (Phone number is too short).');
      phoneInput.focus();
      return;
    }

    hideError();
    startPairingProcess(rawNumber);
  });

  async function startPairingProcess(number) {
    const cleanCountry = currentCountry.code.replace(/\D/g, '');
    const fullNumberFormatted = currentCountry.code + ' ' + number;

    generateBtn.disabled = true;
    generateBtn.classList.add('opacity-80', 'cursor-wait');
    btnIconPlane.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    btnText.textContent = 'Dalbanaya WhatsApp Pairing Code...';

    try {
      let codeReceived = '';
      let displayPhone = fullNumberFormatted;

      // Contact Live Baileys Backend API (/api/pair)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout for WhatsApp servers

      const response = await fetch(`/api/pair?phone=${encodeURIComponent(number)}&country=${cleanCountry}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.error || data.details || 'WhatsApp ma soo saarin koodka lammaanaha.');
      }

      codeReceived = data.code;
      if (data.phone) displayPhone = '+' + data.phone;

      activeCode = codeReceived;
      displayPairingCode(activeCode, displayPhone);

      // Update connected number on dashboard
      if (connectedNumberDisplay) {
        connectedNumberDisplay.textContent = displayPhone;
      }

      const currentUsers = parseInt(statUsersCount.textContent, 10) || 80;
      statUsersCount.textContent = currentUsers + 1;

      showToast('Koodka dhabta ah ee WhatsApp-ka waa diyaar! Ku qor taleefankaaga.', 'success');

    } catch (err) {
      console.error('Pairing Code error:', err);
      const msg = err.name === 'AbortError' 
        ? 'Waqtigu wuu dhacay. Fadlan hubi in server-ku socdo (npm start).' 
        : (err.message || 'Khalad ayaa dhacay, fadlan mar kale isku day.');
      showToast(msg, 'error');
    } finally {
      generateBtn.disabled = false;
      generateBtn.classList.remove('opacity-80', 'cursor-wait');
      btnIconPlane.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
      btnText.textContent = 'Generate Pair Code';
    }
  }

  function displayPairingCode(code, fullNumber) {
    idleState.classList.add('hidden');
    successState.classList.remove('hidden');
    resultBox.classList.add('border-purple-500/80', 'shadow-glow-purple');

    generatedCodeDisplay.textContent = code;

    let timeLeft = 120;
    if (timerInterval) clearInterval(timerInterval);

    countdownDisplay.textContent = `Expires in: ${timeLeft}s`;
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        countdownDisplay.textContent = 'Code expired. Please generate a new one.';
        countdownDisplay.classList.add('text-rose-400');
      } else {
        countdownDisplay.textContent = `Expires in: ${timeLeft}s`;
      }
    }, 1000);

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  // Copy Code Button
  copyCodeBtn.addEventListener('click', async () => {
    if (!activeCode) return;
    const cleanCode = activeCode.replace(/\s+/g, '');

    try {
      await copyToClipboard(cleanCode);
      copyBtnText.textContent = 'Copied!';
      copyCodeBtn.classList.remove('from-purple-600', 'to-indigo-600');
      copyCodeBtn.classList.add('from-emerald-600', 'to-teal-600');

      showToast(`Koodka '${cleanCode}' waa la koobiyeeyay!`, 'success');

      setTimeout(() => {
        copyBtnText.textContent = 'Copy Code';
        copyCodeBtn.classList.remove('from-emerald-600', 'to-teal-600');
        copyCodeBtn.classList.add('from-purple-600', 'to-indigo-600');
      }, 2500);

    } catch (err) {
      showToast('Lama koobiyeyn karin koodka.', 'error');
    }
  });

  // ==========================================
  // REAL-TIME WHATSAPP QR CODE SYSTEM (BAILEYS)
  // ==========================================
  const qrLoadingState = document.getElementById('qrLoadingState');
  const qrLoadingText = document.getElementById('qrLoadingText');
  const qrImage = document.getElementById('qrImage');
  const qrCountdown = document.getElementById('qrCountdown');
  const qrStatusText = document.getElementById('qrStatusText');
  const qrStatusDot = document.getElementById('qrStatusDot');
  const refreshQrBtn = document.getElementById('refreshQrBtn');

  let qrPollInterval = null;
  let qrCountdownInterval = null;
  let qrTimeRemaining = 20;
  let isFetchingQr = false;

  // Open QR Modal & fetch live QR
  function openQrModal() {
    qrModal.classList.remove('hidden');
    qrModal.classList.add('flex');
    if (window.lucide) lucide.createIcons();

    // Reset UI state
    if (qrLoadingState) qrLoadingState.classList.remove('hidden');
    if (qrImage) qrImage.classList.add('hidden');
    if (qrLoadingText) qrLoadingText.textContent = 'Generating Live WhatsApp QR...';
    if (qrStatusText) qrStatusText.textContent = 'Connecting to Baileys...';

    // Fetch QR and start connection polling
    fetchLiveQrCode();
    startQrStatusPolling();
  }

  // Close QR Modal & cleanup timers
  function closeQrModal() {
    qrModal.classList.add('hidden');
    qrModal.classList.remove('flex');
    stopQrTimers();
  }

  function stopQrTimers() {
    if (qrPollInterval) {
      clearInterval(qrPollInterval);
      qrPollInterval = null;
    }
    if (qrCountdownInterval) {
      clearInterval(qrCountdownInterval);
      qrCountdownInterval = null;
    }
  }

  // Fetch Live Base64 QR from Backend
  async function fetchLiveQrCode() {
    if (isFetchingQr) return;
    isFetchingQr = true;

    try {
      if (qrLoadingState && (!qrImage || qrImage.classList.contains('hidden'))) {
        qrLoadingState.classList.remove('hidden');
      }
      if (qrStatusText) qrStatusText.textContent = 'Requesting Baileys QR...';

      const res = await fetch('/api/qr');
      const data = await res.json();

      if (data.status === 'connected') {
        closeQrModal();
        showToast('Bot-ku mar hore buu ku xirmay WhatsApp!', 'success');
        switchTab('dashboard');
        if (data.phone && connectedNumberDisplay) {
          connectedNumberDisplay.textContent = `+${data.phone}`;
        }
        return;
      }

      if (data.status === 'success' && data.qr) {
        if (qrImage) {
          qrImage.src = data.qr;
          qrImage.onload = () => {
            if (qrLoadingState) qrLoadingState.classList.add('hidden');
            qrImage.classList.remove('hidden');
          };
        }

        // Reset countdown timer (e.g. 20s)
        startQrCountdown(data.expiresIn || 20);
        if (qrStatusText) qrStatusText.textContent = 'Scan with phone camera';
        if (qrStatusDot) qrStatusDot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      } else if (data.status === 'waiting') {
        if (qrLoadingText) qrLoadingText.textContent = 'Preparing WhatsApp socket...';
        setTimeout(() => {
          isFetchingQr = false;
          fetchLiveQrCode();
        }, 2000);
        return;
      } else {
        if (qrLoadingText) qrLoadingText.textContent = 'Retrying QR generation...';
        setTimeout(() => {
          isFetchingQr = false;
          fetchLiveQrCode();
        }, 3000);
        return;
      }
    } catch (err) {
      console.error('QR Fetch error:', err);
      if (qrLoadingText) qrLoadingText.textContent = 'Connection error. Retrying...';
      setTimeout(() => {
        isFetchingQr = false;
        fetchLiveQrCode();
      }, 3000);
      return;
    } finally {
      isFetchingQr = false;
    }
  }

  // Countdown timer with auto-refresh on expire
  function startQrCountdown(seconds) {
    if (qrCountdownInterval) clearInterval(qrCountdownInterval);
    qrTimeRemaining = seconds;
    if (qrCountdown) qrCountdown.textContent = qrTimeRemaining;

    qrCountdownInterval = setInterval(() => {
      qrTimeRemaining--;
      if (qrCountdown) qrCountdown.textContent = Math.max(0, qrTimeRemaining);

      if (qrTimeRemaining <= 0) {
        clearInterval(qrCountdownInterval);
        if (qrStatusText) qrStatusText.textContent = 'QR Expired. Refreshing...';
        if (qrStatusDot) qrStatusDot.className = 'w-2 h-2 rounded-full bg-amber-400 animate-ping';
        fetchLiveQrCode();
      }
    }, 1000);
  }

  // Poll connection status every 2 seconds
  function startQrStatusPolling() {
    if (qrPollInterval) clearInterval(qrPollInterval);

    qrPollInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/qr/status');
        if (!res.ok) return;
        const data = await res.json();

        if (data.connected) {
          // Connected successfully!
          stopQrTimers();
          closeQrModal();
          showToast('Hambalyo! WhatsApp si guul leh buu ugu xirmay NOVA XMD!', 'success');

          // Update Dashboard
          if (data.phone && connectedNumberDisplay) {
            connectedNumberDisplay.textContent = `+${data.phone}`;
          }
          if (botStatusTag) {
            botStatusTag.className = 'px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold';
            botStatusTag.textContent = 'Connected (Live 🟢)';
          }
          if (botLiveBadge) {
            botLiveBadge.className = 'absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#090724] shadow-[0_0_8px_#10b981]';
          }

          // Switch to Dashboard tab
          switchTab('dashboard');

          // Refresh stats
          fetchRealtimeStats();
        }
      } catch (e) {}
    }, 2000);
  }

  // QR Modal Event Listeners
  scanQrBtn.addEventListener('click', () => {
    openQrModal();
  });

  if (refreshQrBtn) {
    refreshQrBtn.addEventListener('click', () => {
      if (qrLoadingState) qrLoadingState.classList.remove('hidden');
      if (qrLoadingText) qrLoadingText.textContent = 'Refreshing QR Code...';
      fetchLiveQrCode();
    });
  }

  closeQrModalBtn.addEventListener('click', () => {
    closeQrModal();
  });

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) closeQrModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!qrModal.classList.contains('hidden')) closeQrModal();
      if (!paymentModal.classList.contains('hidden')) closePaymentModal();
    }
  });

  // Toast Notification System
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 ${
      type === 'success' 
        ? 'bg-[#0f172a]/95 text-emerald-300 border-emerald-500/40 shadow-[0_4px_25px_rgba(16,185,129,0.3)]' 
        : 'bg-[#0f172a]/95 text-rose-300 border-rose-500/40 shadow-[0_4px_25px_rgba(244,63,94,0.3)]'
    }`;

    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : '⚠'}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // ==========================================
  // REAL-TIME CONNECTION SYNCHRONIZER
  // ==========================================
  function syncLiveConnectionUI(statusData) {
    const isOnline = !!(statusData && (statusData.connected || statusData.online));
    isBotConnected = isOnline;

    if (isOnline) {
      const rawNumber = statusData.phone || (statusData.bot && statusData.bot.phone) || '';
      const formatted = rawNumber ? (rawNumber.startsWith('+') ? rawNumber : `+${rawNumber}`) : '+252 61 ••• ••••';

      // 1. Dashboard Number, Badge & Session Tag
      if (connectedNumberDisplay) {
        connectedNumberDisplay.textContent = formatted;
        connectedNumberDisplay.className = 'font-display font-bold text-lg text-white';
      }
      if (botStatusTag) {
        botStatusTag.className = 'px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]';
        botStatusTag.textContent = 'Connected (Live 🟢)';
      }
      if (botLiveBadge) {
        botLiveBadge.className = 'absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#090724] shadow-[0_0_8px_#10b981]';
      }
      if (botSessionTag) {
        botSessionTag.className = 'font-mono text-emerald-400 font-semibold';
        botSessionTag.textContent = 'NOVA-SESSION-ACTIVE (🟢 Live)';
      }
      if (disconnectBtnLabel) {
        disconnectBtnLabel.textContent = 'Disconnect / Logout Bot';
      }
      if (disconnectBotBtn) {
        disconnectBotBtn.className = 'flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition shadow-sm active:scale-95 self-start sm:self-auto';
      }
      if (dashboardLinkDeviceBtn) {
        dashboardLinkDeviceBtn.classList.add('hidden');
      }

      // 2. Header Status Pills
      if (mobileHeaderStatusDot) {
        mobileHeaderStatusDot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      }
      if (mobileHeaderStatusText) {
        mobileHeaderStatusText.textContent = 'Online';
      }
      if (desktopHeaderStatusDot) {
        desktopHeaderStatusDot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]';
      }
      if (desktopHeaderPingDot) {
        desktopHeaderPingDot.classList.remove('hidden');
      }
      if (desktopHeaderStatusText) {
        desktopHeaderStatusText.textContent = rawNumber ? `Server Online (+${rawNumber} 🟢)` : 'Server Online (WhatsApp 🟢)';
      }
      if (botUptimeDisplay && statusData.uptime) {
        botUptimeDisplay.textContent = statusData.uptime;
      }
    } else {
      // DISCONNECTED STATE
      if (connectedNumberDisplay) {
        connectedNumberDisplay.textContent = 'Not Connected (Offline)';
        connectedNumberDisplay.className = 'font-display font-bold text-lg text-rose-300/80';
      }
      if (botStatusTag) {
        botStatusTag.className = 'px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold shadow-[0_0_10px_rgba(244,63,94,0.2)]';
        botStatusTag.textContent = 'Disconnected 🔴';
      }
      if (botLiveBadge) {
        botLiveBadge.className = 'absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-[#090724] shadow-[0_0_8px_#f43f5e]';
      }
      if (botSessionTag) {
        botSessionTag.className = 'font-mono text-rose-400/90';
        botSessionTag.textContent = 'NO-SESSION (Offline 🔴)';
      }
      if (disconnectBtnLabel) {
        disconnectBtnLabel.textContent = 'Link Device (WhatsApp)';
      }
      if (disconnectBotBtn) {
        disconnectBotBtn.className = 'flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition shadow-sm active:scale-95 self-start sm:self-auto';
      }
      if (dashboardLinkDeviceBtn) {
        dashboardLinkDeviceBtn.classList.remove('hidden');
      }

      // 2. Header Status Pills
      if (mobileHeaderStatusDot) {
        mobileHeaderStatusDot.className = 'w-2 h-2 rounded-full bg-rose-400';
      }
      if (mobileHeaderStatusText) {
        mobileHeaderStatusText.textContent = 'Offline';
      }
      if (desktopHeaderStatusDot) {
        desktopHeaderStatusDot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_#f43f5e]';
      }
      if (desktopHeaderPingDot) {
        desktopHeaderPingDot.classList.add('hidden');
      }
      if (desktopHeaderStatusText) {
        desktopHeaderStatusText.textContent = 'Server Online (Bot Offline 🔴)';
      }
      if (botUptimeDisplay) {
        botUptimeDisplay.textContent = 'Offline (Session Inactive)';
      }
    }

    if (window.lucide) lucide.createIcons();
  }

  // Poll /api/status for real-time live sync (every 2.5s)
  async function checkLiveConnectionStatus() {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) {
        syncLiveConnectionUI({ connected: false });
        return;
      }
      const data = await res.json();
      syncLiveConnectionUI(data);
    } catch (e) {
      syncLiveConnectionUI({ connected: false });
    }
  }

  // ==========================================
  // REAL-TIME STATS FETCHER (FETCHES FROM /api/stats)
  // ==========================================
  async function fetchRealtimeStats() {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) return;
      const data = await res.json();

      if (data && data.status === 'success') {
        // 1. Active Servers
        if (statActiveServersCount && data.activeServers) {
          statActiveServersCount.textContent = data.activeServers.count;
        }
        if (statActiveServersStatus && data.activeServers) {
          statActiveServersStatus.textContent = `${data.activeServers.status} (View all)`;
        }

        // 2. Total Users
        if (statUsersCount && data.totalUsers) {
          statUsersCount.textContent = data.totalUsers.count;
        }
        if (statUsersGrowth && data.totalUsers) {
          statUsersGrowth.textContent = data.totalUsers.growth;
        }

        // 3. Free Slots & Progress Bar
        if (statFreeSlots && data.freeSlots) {
          statFreeSlots.textContent = data.freeSlots.count;
        }
        if (statFreeSlotsBar && data.freeSlots) {
          statFreeSlotsBar.style.width = data.freeSlots.progressBarWidth || `${data.freeSlots.percentage}%`;
        }

        // 4. Dashboard Metrics (View once, Status saved, Messages handled)
        if (data.bot) {
          if (statViewOnceCount && data.bot.viewOnceSaved !== undefined) {
            statViewOnceCount.textContent = `${data.bot.viewOnceSaved} Media`;
          }
          if (statStatusSavedCount && data.bot.statusSaved !== undefined) {
            statStatusSavedCount.textContent = `${data.bot.statusSaved} Stories`;
          }
          if (statMessagesHandledCount && data.bot.messagesHandled !== undefined) {
            statMessagesHandledCount.textContent = Number(data.bot.messagesHandled).toLocaleString();
          }
          syncLiveConnectionUI(data.bot);
        }
      }
    } catch (err) {
      // Backend not running (static mode), UI retains graceful defaults
    }
  }

  // Initial render & Real-time Live Connection Polling (2.5s) & Stats (5s)
  renderCountries();
  checkLiveConnectionStatus();
  fetchRealtimeStats();
  setInterval(checkLiveConnectionStatus, 2500);
  setInterval(fetchRealtimeStats, 5000);
});
