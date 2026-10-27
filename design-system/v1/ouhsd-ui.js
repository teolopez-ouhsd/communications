/* ==========================================================================
   OUHSD Design System v1.0  |  ouhsd-ui.js
   Optional. About 150 lines, no dependencies. Adds the behavior CSS cannot:
     - keyboard support for tabs
     - dialog open/close helpers
     - toast messages (OUHSD.toast)
     - mobile navigation toggle
     - filter chips (aria-pressed)
     - copy-to-clipboard buttons
   Everything is wired with data attributes, so no setup code is needed.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Tabs ----------
     <div class="ou-tabs" role="tablist" aria-label="...">
       <button class="ou-tab" role="tab" id="t1" aria-controls="p1" aria-selected="true">One</button>
       <button class="ou-tab" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">Two</button>
     </div>
     <div class="ou-tabpanel" role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0">...</div>
     <div class="ou-tabpanel" role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden>...</div> */
  function initTabs(list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  }

  /* ---------- Dialog ----------
     <button data-ou-open="#my-dialog">Open</button>
     <dialog class="ou-dialog" id="my-dialog" aria-labelledby="my-title"> ... <button data-ou-close>Cancel</button> </dialog> */
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-ou-open]');
    if (opener) {
      var dlg = document.querySelector(opener.getAttribute('data-ou-open'));
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
      return;
    }
    var closer = e.target.closest('[data-ou-close]');
    if (closer) {
      var parent = closer.closest('dialog');
      if (parent) parent.close();
      return;
    }
    // Click on the backdrop (the dialog element itself) closes it
    if (e.target.tagName === 'DIALOG' && e.target.classList.contains('ou-dialog')) e.target.close();
  });

  /* ---------- Toast ----------
     OUHSD.toast('Saved.', { type: 'success', duration: 5000 })
     types: info (default), success, warning, error. Errors stay until dismissed. */
  var region;
  function toast(message, opts) {
    opts = opts || {};
    var type = opts.type || 'info';
    if (!region) {
      region = document.createElement('div');
      region.className = 'ou-toast-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'false');
      document.body.appendChild(region);
    }
    var el = document.createElement('div');
    el.className = 'ou-alert ou-toast' + (type !== 'info' ? ' ou-alert--' + type : '');
    el.setAttribute('role', type === 'error' ? 'alert' : 'status');
    var text = document.createElement('div');
    text.textContent = message;
    var close = document.createElement('button');
    close.className = 'ou-btn ou-btn--text ou-btn--icon ou-btn--sm';
    close.setAttribute('aria-label', 'Dismiss message');
    close.innerHTML = '<span class="ou-icon ou-icon--x" aria-hidden="true"></span>';
    function remove() { if (el.parentNode) el.parentNode.removeChild(el); }
    close.addEventListener('click', remove);
    el.appendChild(text);
    el.appendChild(close);
    region.appendChild(el);
    var duration = opts.duration === undefined ? (type === 'error' ? 0 : 6000) : opts.duration;
    if (duration > 0) setTimeout(remove, duration);
    return el;
  }

  /* ---------- Mobile nav toggle ----------
     <button class="ou-btn ou-btn--outline ou-header__toggle" data-ou-nav-toggle aria-controls="main-nav" aria-expanded="false">Menu</button>
     <nav id="main-nav" class="ou-header__nav" aria-label="Main"> ... </nav> */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-ou-nav-toggle]');
    if (!btn) return;
    var nav = document.getElementById(btn.getAttribute('aria-controls'));
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (nav) nav.setAttribute('data-open', open ? 'true' : 'false');
  });

  /* ---------- Filter chips ----------
     <button class="ou-chip" aria-pressed="false" data-ou-chip>Label</button>
     Add data-ou-chip-group="single" on the parent for one-at-a-time behavior. */
  document.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-ou-chip]');
    if (!chip) return;
    var group = chip.parentElement;
    var pressed = chip.getAttribute('aria-pressed') === 'true';
    if (group && group.getAttribute('data-ou-chip-group') === 'single') {
      group.querySelectorAll('[data-ou-chip]').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
    } else {
      chip.setAttribute('aria-pressed', pressed ? 'false' : 'true');
    }
  });

  /* ---------- Copy to clipboard ----------
     <button data-ou-copy="#some-id">Copy</button>  (copies the text of that element)
     <button data-ou-copy-text="#E20031">Copy</button> (copies the literal value) */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-ou-copy], [data-ou-copy-text]');
    if (!btn) return;
    var text = btn.hasAttribute('data-ou-copy-text')
      ? btn.getAttribute('data-ou-copy-text')
      : (document.querySelector(btn.getAttribute('data-ou-copy')) || {}).textContent;
    if (!text) return;
    var done = function () {
      var label = btn.getAttribute('data-ou-copied') || 'Copied';
      toast(label, { type: 'success', duration: 2200 });
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text.trim()).then(done, function () { toast('Copy failed. Select the text and copy it manually.', { type: 'error' }); });
    }
  });

  function init() {
    document.querySelectorAll('.ou-tabs[role="tablist"]').forEach(initTabs);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.OUHSD = { toast: toast, version: '1.0.0' };
})();
