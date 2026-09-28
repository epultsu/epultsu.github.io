// E-Pult: меню и форма заявки. Без внешних библиотек.
(function () {
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
