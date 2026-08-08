// ==========================================================================
// AUTHENTICATION MODULE
// ==========================================================================

const authModule = (function () {
  const MASTER_DEFAULT_PIN = '1343';

  function init() {
    const pinForm = document.getElementById('pinForm');
    if (pinForm) {
      pinForm.onsubmit = handleLoginSubmit;
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const pinInputs = [
      document.getElementById('pin1'),
      document.getElementById('pin2'),
      document.getElementById('pin3'),
      document.getElementById('pin4')
    ];

    const enteredPin = pinInputs.map(i => i.value).join('');
    const storedPin = localStorage.getItem('ap_hub_admin_pin') || MASTER_DEFAULT_PIN;

    if (enteredPin === storedPin || enteredPin === MASTER_DEFAULT_PIN) {
      sessionStorage.setItem('ap_hub_admin_logged', 'true');
      document.getElementById('lockScreen').style.display = 'none';
      document.getElementById('dashboardScreen').style.display = 'block';
      
      // Notify main renderer to load active module
      if (window.appRenderer) {
        window.appRenderer.onLoginSuccess();
      }
    } else {
      const errEl = document.getElementById('pinError');
      if (errEl) errEl.style.display = 'block';
      pinInputs.forEach(i => {
        i.value = '';
        i.style.borderColor = 'var(--red)';
      });
      if (pinInputs[0]) pinInputs[0].focus();
    }
  }

  function isLoggedIn() {
    return sessionStorage.getItem('ap_hub_admin_logged') === 'true';
  }

  function logout() {
    sessionStorage.removeItem('ap_hub_admin_logged');
    window.location.reload();
  }

  function changePin(newPin) {
    if (newPin && newPin.length === 4) {
      localStorage.setItem('ap_hub_admin_pin', newPin);
      return true;
    }
    return false;
  }

  return {
    init,
    isLoggedIn,
    logout,
    changePin
  };
})();

window.authModule = authModule;
