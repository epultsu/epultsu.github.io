// E-Pult: меню и форма заявки. Без внешних библиотек.
(function () {

  // Переключатель темы: выбор сохраняется в браузере; без выбора — как в системе.
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(t) {
    root.setAttribute('data-theme', t);
    if (btn) {
      var dark = t === 'dark';
      btn.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
      btn.setAttribute('title', dark ? 'Светлая тема' : 'Тёмная тема');
    }
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0e1113' : '#262a2c');
    setImages(t);
  }

  // Картинки для темы: в тёмной берём файл с суффиксом -dark, в светлой — обычный.
  // Если тёмной версии нет, показываем светлую; если нет и её — остаётся рамка-заглушка.
  function setImages(t) {
    document.querySelectorAll('img[data-light]').forEach(function (img) {
      if (!img._ep) {
        img._ep = true;
        img.addEventListener('error', function () {
          var cur = img.getAttribute('src');
          if (cur === img.dataset.dark && !img._fellBack) {
            img._fellBack = true;
            img.setAttribute('src', img.dataset.light);
          } else {
            img.hidden = true;
          }
        });
        img.addEventListener('load', function () { img.hidden = false; });
      }
      var want = t === 'dark' ? img.dataset.dark : img.dataset.light;
      if (t === 'dark' && img._fellBack) want = img.dataset.light;
      if (img.getAttribute('src') !== want) img.setAttribute('src', want);
    });
  }
  apply(root.getAttribute('data-theme') || 'light');
  if (btn) {
    btn.addEventListener('click', function () {
      var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(t);
      try { localStorage.setItem('theme', t); } catch (e) {}
    });
  }
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (err) {}
      if (!saved) apply(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var dd = document.querySelector('.dd > button');
  if (dd) {
    dd.addEventListener('click', function () {
      var p = dd.parentElement;
      var open = p.classList.toggle('open');
      dd.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Форма заявки. GitHub Pages не принимает POST, поэтому по умолчанию заявка
  // уходит письмом через почтовую программу посетителя. Чтобы получать заявки
  // напрямую, укажите адрес обработчика (например, Formspree) в data-endpoint.
  document.querySelectorAll('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var ok = form.querySelector('.form-ok');
      var endpoint = form.getAttribute('data-endpoint');
      if (endpoint) {
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw 0; done(); })
          .catch(function () { mail(); });
      } else { mail(); }
      function mail() {
        var lines = [];
        data.forEach(function (v, k) { if (k !== 'consent') lines.push(k + ': ' + v); });
        var subject = 'Заявка с сайта e-pult.su — ' + (data.get('Услуга') || 'консультация');
        window.location.href = 'mailto:info@e-pult.su?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        done();
      }
      function done() { if (ok) ok.style.display = 'block'; form.reset(); }
    });
  });
})();
