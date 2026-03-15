(() => {
  'use strict';
  const D = 0x30C1B95A4BC06DC9FB29FA981CCCCC5826E7FBEF2F251E41E4F25C79CB3D415A0130E88D12CFFAB07196D39C52229D553FA71C032CBE7900E9CB1C03317B34D70667F886E488A2E4C2DFC3BBC225E4709C2A5CDAF4611CF6399AB07F2B86C854940966B607B16BA1F68A18B5FD94141760AA4AFEDD3965E57475FCE84F5F1D35n;
  const N = 0x9B8F82EC3C3469C3DDB39FDCCC1A7C4449885DE8EEA49A2DADD2AD82984F38AF35BD2559DCA4BA666C649D8529A66F6439EE929DEA02D6A0C7F46837E6F4604C13E28D60F144D4EEFCE947912F9876A90F059A7FAC926078BEDFB2122F8190E1156192DABC71E14E11C8D7A15C20148B0DF5E545299E2F86028896684EE80A09n;

  const OLD_N = new Uint8Array([
    0x83, 0xB0, 0xBC, 0x5C, 0xD1, 0x61, 0xAE, 0x1E, 0x3A, 0x64, 0x68, 0x7C, 0x41, 0x6D, 0xB3, 0x22,
    0x48, 0x87, 0xBB, 0x18, 0xD7, 0x2B, 0xCA, 0xB0, 0x89, 0xCF, 0xC2, 0xC6, 0x5C, 0x2E, 0xBB, 0xCF,
    0x45, 0x22, 0x3A, 0x86, 0x9C, 0x86, 0xA7, 0xCB, 0xA9, 0x05, 0x84, 0x0D, 0xC0, 0xFA, 0x0D, 0x5C,
    0x03, 0xE7, 0xBA, 0x00, 0x96, 0x32, 0x96, 0xEC, 0x50, 0xA5, 0xBD, 0xAD, 0xEF, 0xFF, 0xA2, 0x94,
    0xEC, 0x1F, 0xF9, 0x0E, 0x39, 0xA2, 0x3D, 0x21, 0x16, 0xD7, 0x61, 0x85, 0xDD, 0x96, 0x65, 0xCB,
    0x77, 0xB4, 0xFE, 0x1C, 0x28, 0x63, 0x2F, 0x75, 0x74, 0x2C, 0x1D, 0xDB, 0xC0, 0x83, 0xBD, 0x05,
    0xD8, 0x9A, 0x15, 0xD1, 0xAF, 0x1B, 0xAA, 0xAE, 0xB0, 0xBE, 0x4C, 0x17, 0xC1, 0xFD, 0x28, 0x40,
    0x8C, 0xD6, 0xB6, 0xB7, 0x8A, 0x86, 0xA7, 0x66, 0x57, 0x6A, 0xFF, 0xEA, 0xA7, 0xDF, 0x2E, 0xBF
  ]);

  const NEW_N = new Uint8Array([
    0x09, 0x0A, 0xE8, 0x4E, 0x68, 0x96, 0x88, 0x02, 0x86, 0x2F, 0x9E, 0x29, 0x45, 0xE5, 0xF5, 0x0D,
    0x8B, 0x14, 0x20, 0x5C, 0xA1, 0xD7, 0xC8, 0x11, 0x4E, 0xE1, 0x71, 0xBC, 0xDA, 0x92, 0x61, 0x15,
    0xE1, 0x90, 0x81, 0x2F, 0x12, 0xB2, 0xDF, 0xBE, 0x78, 0x60, 0x92, 0xAC, 0x7F, 0x9A, 0x05, 0x0F,
    0xA9, 0x76, 0x98, 0x2F, 0x91, 0x47, 0xE9, 0xFC, 0xEE, 0xD4, 0x44, 0xF1, 0x60, 0x8D, 0xE2, 0x13,
    0x4C, 0x60, 0xF4, 0xE6, 0x37, 0x68, 0xF4, 0xC7, 0xA0, 0xD6, 0x02, 0xEA, 0x9D, 0x92, 0xEE, 0x39,
    0x64, 0x6F, 0xA6, 0x29, 0x85, 0x9D, 0x64, 0x6C, 0x66, 0xBA, 0xA4, 0xDC, 0x59, 0x25, 0xBD, 0x35,
    0xAF, 0x38, 0x4F, 0x98, 0x82, 0xAD, 0xD2, 0xAD, 0x2D, 0x9A, 0xA4, 0xEE, 0xE8, 0x5D, 0x88, 0x49,
    0x44, 0x7C, 0x1A, 0xCC, 0xDC, 0x9F, 0xB3, 0xDD, 0xC3, 0x69, 0x34, 0x3C, 0xEC, 0x82, 0x8F, 0x9B
  ]);

  const DOM = {
    log: document.getElementById('log'),
    logEmpty: document.getElementById('log-empty'),
    btnPatch: document.getElementById('btn-patch'),
    btnClear: document.getElementById('btn-clear'),
    langSelect: document.getElementById('lang-select'),
    sysidPatch: document.getElementById('sysid-patch'),
    exeInput: document.getElementById('exe-input'),
    uploadArea: document.getElementById('upload-area'),
    uploadLoaded: document.getElementById('upload-loaded'),
    uploadFilename: document.getElementById('upload-filename'),
  };

  let state = {
    selectedExe: null,
    currentLang: getDefaultLanguage()
  };

  function getDefaultLanguage() {
    const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();

    if (lang.startsWith('zh')) {
      if (lang.includes('tw') || lang.includes('hk') || lang.includes('hant')) {
        return 'zh-tw';
      }
      return 'zh-cn';
    }
    if (lang.startsWith('ko')) return 'ko';

    return 'en';
  }

  function updateTranslations() {
    const t = i18n[state.currentLang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.innerHTML = t[key];
    });

    if (DOM.langSelect.value !== state.currentLang) {
      DOM.langSelect.value = state.currentLang;
    }
  }

  function getTimestamp() {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }

  function logAction(msg, type = '') {
    DOM.logEmpty.style.display = 'none';
    const entry = document.createElement('div');
    entry.className = 'log__entry';
    entry.innerHTML = `<span class="log__ts">${getTimestamp()}</span><span class="log__msg log__msg--${type}">${msg}</span>`;
    DOM.log.appendChild(entry);
    DOM.log.scrollTop = DOM.log.scrollHeight;
  }

  function modpow(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp & 1n) result = result * base % mod;
      exp >>= 1n;
      base = base * base % mod;
    }
    return result;
  }

  function generateSlc(sysid) {
    const M = BigInt('0x000000010000000000000001000000000000000000000000' + sysid + '00000001');
    const ans = modpow(M, D, N);
    const bytes = new Uint8Array(128);
    let val = ans;
    for (let i = 0; i < 128; i++) {
      bytes[i] = Number(val & 0xffn);
      val >>= 8n;
    }
    if (val > 0n) throw new Error('RSA result overflowed 128 bytes');
    return bytes;
  }

  function findBytes(haystack, needle) {
    outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
      for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) continue outer;
      }
      return i;
    }
    return -1;
  }

  function patchExe(buffer) {
    const view = new Uint8Array(buffer);
    const pos = findBytes(view, OLD_N);
    if (pos === -1) return null;
    const patched = new Uint8Array(buffer.slice(0));
    patched.set(NEW_N, pos);
    return patched;
  }

  function triggerDownload(data, filename, mime = 'application/octet-stream') {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function validateSysid(val) {
    if (val.length !== 8 || /[^0-9A-F]/.test(val)) return i18n[state.currentLang].logInvalidId;
    return null;
  }

  function loadExeFile(file) {
    if (!file) return;
    state.selectedExe = file;
    DOM.uploadFilename.textContent = file.name;
    DOM.uploadArea.classList.add('upload-area--loaded');
    DOM.btnPatch.disabled = false;
    logAction(`${i18n[state.currentLang].logLoaded}: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
  }

  function initEvents() {
    DOM.langSelect.addEventListener('change', (e) => {
      state.currentLang = e.target.value;
      updateTranslations();
    });

    DOM.exeInput.addEventListener('change', () => loadExeFile(DOM.exeInput.files[0]));

    ['dragover', 'dragenter'].forEach(evt =>
      DOM.uploadArea.addEventListener(evt, e => e.preventDefault())
    );

    DOM.uploadArea.addEventListener('drop', e => {
      e.preventDefault();
      loadExeFile(e.dataTransfer.files[0]);
    });

    DOM.sysidPatch.addEventListener('input', () => {
      DOM.sysidPatch.value = DOM.sysidPatch.value.replace(/[^0-9a-fA-F]/g, '');
    });

    DOM.btnClear.addEventListener('click', () => {
      DOM.log.innerHTML = '';
      DOM.log.appendChild(DOM.logEmpty);
      DOM.logEmpty.style.display = '';
    });

    DOM.btnPatch.addEventListener('click', async () => {
      const t = i18n[state.currentLang];
      const sysid = DOM.sysidPatch.value.trim().toUpperCase();
      const err = validateSysid(sysid);

      if (err) { logAction(err, 'err'); return; }
      if (!state.selectedExe) { logAction(t.logNoExe, 'err'); return; }

      DOM.btnPatch.disabled = true;
      logAction(`${t.logReading} ${state.selectedExe.name}…`);

      try {
        const buffer = await state.selectedExe.arrayBuffer();
        logAction(t.logSearching);

        const patched = patchExe(buffer);
        if (!patched) {
          logAction(t.logNotFound, 'err');
          DOM.btnPatch.disabled = false;
          return;
        }
        logAction(t.logReplaced, 'ok');

        logAction(`${t.logGenerating} ${sysid}…`, 'accent');
        const slc = generateSlc(sysid);
        logAction(t.logGenerated, 'ok');

        logAction(t.logBuilding);
        const zip = new JSZip();
        zip.file('sai2.exe', patched);
        zip.file('lic.slc', slc);

        const blob = await zip.generateAsync({
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 1 }
        }, meta => {
          if (meta.percent % 25 < 1) logAction(`${t.logCompressing} ${Math.round(meta.percent)}%`);
        });

        triggerDownload(blob, 'sai2-patched.zip', 'application/zip');
        logAction(t.logDownloaded, 'ok');
      } catch (e) {
        logAction(`${t.logError} ${e.message}`, 'err');
      }

      DOM.btnPatch.disabled = false;
    });
  }

  function init() {
    updateTranslations();
    initEvents();
  }

  document.addEventListener('DOMContentLoaded', init);

})();
