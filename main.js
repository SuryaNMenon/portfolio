/* =====================================================================
   Surya's portfolio: rendering + interactions
   Reads every word from window.SITE_CONTENT (content.js).
   Plain JavaScript, no libraries.
   ===================================================================== */
(function () {
  'use strict';

  var C = window.SITE_CONTENT;
  if (!C) return;

  var doc = document;
  var root = doc.documentElement;
  var mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduceMotion = !!(mqReduce && mqReduce.matches);
  var motionOK = !reduceMotion && 'IntersectionObserver' in window;
  var THEME_KEY = 'sm-theme';

  /* ---------- Tiny helpers ---------- */
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  // h('div', { class: 'x', text: 'hi' }, child, [children])
  function h(tag, props) {
    var node = doc.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'svg') node.innerHTML = v;            // trusted, built-in icons only
        else if (k === 'style') node.style.cssText = v;
        else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }
  function append(parent, child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(parent, c); }); return; }
    parent.appendChild(child.nodeType ? child : doc.createTextNode(String(child)));
  }
  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  /* ---------- Icons (drawn for this site) ---------- */
  function svg(inner, opts) {
    opts = opts || {};
    var attrs = 'viewBox="' + (opts.vb || '0 0 24 24') + '" aria-hidden="true" focusable="false"';
    if (opts.fill) attrs += ' fill="currentColor"';
    else attrs += ' fill="none" stroke="currentColor" stroke-width="' + (opts.sw || 2) + '" stroke-linecap="square" stroke-linejoin="miter"';
    if (opts.cls) attrs += ' class="' + opts.cls + '"';
    return '<svg ' + attrs + '>' + inner + '</svg>';
  }
  var I = {
    download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>', { sw: 2.5 }),
    moon: svg('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>', { fill: true }),
    menu: svg('<path d="M4 7h16M4 12h16M4 17h10"/>', { cls: 'i-menu' }),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>', { cls: 'i-close' }),
    down: svg('<path d="M12 5v13M6 12l6 6 6-6"/>', { sw: 2.5 }),
    up: svg('<path d="M12 19V6M6 12l6-6 6 6"/>', { sw: 2.5 }),
    chev: svg('<path d="M6 9l6 6 6-6"/>', { cls: 'chev' }),
    copy: svg('<rect x="8" y="8" width="12" height="12"/><path d="M16 8V4H4v12h4"/>', { cls: 'i-copy' }),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', { cls: 'i-check', sw: 2.5 }),
    mail: svg('<rect x="3" y="5" width="18" height="14"/><path d="M3 7l9 6 9-6"/>'),
    external: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>'),
    linkedin: svg('<path fill-rule="evenodd" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2.9 7.4V18h2.6v-7.6zm1.3-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm3.3 4V18h2.6v-4c0-1.1.4-2 1.6-2s1.4 1 1.4 2.1V18h2.6v-4.6c0-2.4-1.3-3.3-3-3.3-1.3 0-2.2.6-2.6 1.3v-1z"/>', { fill: true }),
    right: svg('<path d="M5 12h13M12 6l6 6-6 6"/>', { sw: 2.5 }),
    expand: svg('<path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/>'),
    star: svg('<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6-4.5-4.2 6.1-.7z"/>', { fill: true }),
    save: svg('<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7V3M8 21v-7h8v7"/>'),
    person: svg('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/>'),
    d20: svg('<path d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4z"/><path class="acc" d="M12 7.5l5 8.2H7z"/><path d="M12 2.5v5M3.5 7.4L12 7.5l8.5-.1M3.5 7.4L7 15.7M20.5 7.4L17 15.7M3.5 16.6L7 15.7M20.5 16.6L17 15.7M12 21.5L7 15.7M12 21.5l5-5.8"/>', { sw: 1.4 }),
    controller: svg('<path d="M7 8h10a4.5 4.5 0 0 1 4.4 5.4l-.8 4a2.5 2.5 0 0 1-4.3 1.2L14.5 16h-5l-1.8 2.6a2.5 2.5 0 0 1-4.3-1.2l-.8-4A4.5 4.5 0 0 1 7 8z"/><path d="M8 10.5v4M6 12.5h4"/><path class="acc" d="M15.5 11h.01M18 13.5h.01" stroke-width="2.6" stroke-linecap="round"/>', { sw: 1.6 })
  };
  // Badge pieces: hexagon frame, fill, glyph (shield or star), lock
  var HEX = 'M26 2l23 13v28L26 56 3 43V15z';
  function badgeIcon(kind) {
    var glyph = kind === 'story'
      ? '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6-4.5-4.2 6.1-.7z" fill="currentColor"/>'
      : '<path d="M12 3l7 3v5.5c0 4.4-3 7.9-7 9.5-4-1.6-7-5.1-7-9.5V6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.8 12.2l2.3 2.3 4.2-4.4" fill="none" stroke="currentColor" stroke-width="2.2"/>';
    return '' +
      '<svg class="hex-fill" viewBox="0 0 52 58" aria-hidden="true" focusable="false"><path d="' + HEX + '" fill="currentColor"/></svg>' +
      '<svg class="hex-line" viewBox="0 0 52 58" aria-hidden="true" focusable="false"><path d="' + HEX + '" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' +
      '<svg class="glyph" viewBox="-14 -17 52 58" aria-hidden="true" focusable="false">' + glyph + '</svg>' +
      '<svg class="glyph-locked" viewBox="-14 -17 52 58" aria-hidden="true" focusable="false"><rect x="6" y="11" width="12" height="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  }

  // Themed placeholder art, used only when a project has no images yet
  function questArt(kind) {
    var grid = '';
    for (var x = 20; x < 320; x += 20) grid += '<path class="a-soft" d="M' + x + ' 0V180"/>';
    for (var y = 20; y < 180; y += 20) grid += '<path class="a-soft" d="M0 ' + y + 'H320"/>';
    var body;
    if (kind === 'monitor') {
      body = '' +
        '<rect class="a-line a-fill-bg" x="40" y="22" width="240" height="122" stroke-width="1.5"/>' +
        '<path class="a-line" d="M160 144v14M128 160h64" stroke-width="1.5"/>' +
        '<text class="a-text" x="52" y="40" font-size="8">HEMODYNAMIC SIGNAL</text>' +
        '<path class="a-soft" d="M52 96H268" stroke-dasharray="2 4"/>' +
        '<polyline class="a-line" fill="none" stroke-width="1.6" points="52,96 78,96 84,90 90,96 98,96 104,66 110,118 116,96 140,96 146,90 152,96 160,96 166,66 172,118 178,96 200,96 206,90 212,96"/>' +
        '<polyline class="a-accent" fill="none" stroke-width="2" points="212,96 222,96 228,50 234,128 240,82 246,104 252,96 268,96"/>' +
        '<circle class="a-accent" cx="234" cy="90" r="30" fill="none" stroke-width="1.5" stroke-dasharray="4 4"/>' +
        '<text class="a-text" x="200" y="136" font-size="8">ANOMALY</text>';
    } else {
      var hosts = [45, 95, 135, 185, 225, 275];
      var links = '<path class="a-line" d="M160 30v12M160 66v18M160 84L85 118M160 84l75 34" stroke-width="1.4" fill="none"/>';
      hosts.forEach(function (hx, i) {
        var sx = i < 3 ? 85 : 235;
        links += '<path class="a-line" d="M' + sx + ' 126L' + hx + ' 152" stroke-width="1" fill="none"/>';
      });
      var nodes = '' +
        '<text class="a-text" x="160" y="22" font-size="8" text-anchor="middle">INTERNET</text>' +
        '<rect class="a-fill-accent" x="146" y="42" width="28" height="24"/>' +
        '<path d="M160 47l6 2.5v4.5c0 3.6-2.5 6.3-6 7.6-3.5-1.3-6-4-6-7.6v-4.5z" fill="none" stroke="#FAFAFA" stroke-width="1.5"/>' +
        '<text class="a-text" x="182" y="58" font-size="8">FIREWALL</text>' +
        '<rect class="a-line a-fill-bg" x="150" y="78" width="20" height="12" stroke-width="1.4"/>' +
        '<rect class="a-line a-fill-bg" x="73" y="114" width="24" height="12" stroke-width="1.4"/>' +
        '<rect class="a-line a-fill-bg" x="223" y="114" width="24" height="12" stroke-width="1.4"/>';
      hosts.forEach(function (hx) {
        nodes += '<rect class="a-line a-fill-bg" x="' + (hx - 7) + '" y="152" width="14" height="10" stroke-width="1.2"/>';
      });
      body = links + nodes;
    }
    return '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' +
      (kind === 'monitor' ? 'Illustration: a patient monitor showing a signal with one anomaly circled.' : 'Illustration: a campus network map with a firewall between the internet and the network.') +
      '"><g stroke-width="1" fill="none">' + grid + '</g>' + body + '</svg>';
  }

  /* ---------- Section heading (shared) ---------- */
  var ORDER = ['experience', 'projects', 'education', 'leadership', 'achievements', 'skills', 'hobbies', 'contact'];

  function sectionHead(key) {
    var s = C.sections[key];
    var idx = ORDER.indexOf(key) + 1;
    return h('header', { class: 'section-head', 'data-reveal': '' },
      h('p', { class: 'eyebrow label', 'aria-hidden': 'true' },
        h('span', { class: 'eyebrow-index', text: pad2(idx) }),
        h('span', { class: 'rule' },
          h('span', { class: 'rule-line' }),
          h('span', { class: 'rule-tracer' }, h('span'))
        )
      ),
      h('h2', { class: 'section-title', id: key + '-title', 'data-scramble': '' },
        h('span', { class: 't-real', text: s.title })
      ),
      s.intro ? h('p', { class: 'section-intro', text: s.intro }) : null
    );
  }

  function statsList(items, cls) {
    return h('dl', { class: 'stats ' + (cls || '') },
      items.map(function (it) {
        return h('div', { class: 'stat' },
          h('dt', { text: it.label }),
          h('dd', { text: it.value })
        );
      })
    );
  }

  function bulletList(items) {
    return h('ul', { class: 'bullets' }, items.map(function (d) { return h('li', { text: d }); }));
  }

  function chipList(items) {
    return h('ul', { class: 'chips' }, items.map(function (c) { return h('li', { class: 'chip', text: c }); }));
  }

  function wrap() { return h('div', { class: 'wrap' }); }

  /* ---------- Top bar ---------- */
  function renderTopBar() {
    var T = C.topBar;
    $('#brand').appendChild(h('span', { class: 'brand-name', text: C.meta.shortName }));

    $('#site-nav').setAttribute('aria-label', T.navLabel);
    var list = $('#nav-list');
    ORDER.forEach(function (key) {
      list.appendChild(h('li', null,
        h('a', { class: 'nav-link', href: '#' + key, 'data-target': key, text: C.sections[key].navLabel })
      ));
    });

    var actions = $('#topbar-actions');

    // Resume: one button that opens the download choices
    var resumeBtn = h('button', {
      class: 'btn resume-btn',
      type: 'button',
      id: 'resume-btn',
      'aria-expanded': 'false',
      'aria-controls': 'resume-pop',
      svg: I.download
    }, h('span', { text: T.resumeButton }));
    resumeBtn.insertAdjacentHTML('beforeend', I.chev);
    var pop = h('div', { class: 'resume-pop', id: 'resume-pop', hidden: true },
      h('p', { class: 'label resume-pop-title', id: 'resume-pop-title', text: T.resumeMenuLabel }),
      h('ul', { class: 'resume-options', 'aria-labelledby': 'resume-pop-title' },
        T.resumes.map(function (r) {
          var href = r.file, name = r.downloadName;
          try { href = encodeURI(decodeURI(r.file)); } catch (e) { /* keep as typed */ }
          if (!name) {
            name = String(r.file).split('/').pop();
            try { name = decodeURIComponent(name); } catch (e) { /* keep as typed */ }
          }
          return h('li', null,
            // "download" saves the file. Browsers that ignore it (for example when the
            // page is opened straight from a folder) open the PDF in a new tab instead.
            h('a', { class: 'resume-option', href: href, download: name, target: '_blank', rel: 'noopener', svg: I.download },
              h('span', { class: 'ro-label', text: r.label }),
              h('span', { class: 'ro-note label', text: r.note })
            )
          );
        })
      )
    );
    actions.appendChild(h('div', { class: 'resume-menu', id: 'resume-menu' }, resumeBtn, pop));

    var sw = h('button', {
      class: 'theme-switch',
      type: 'button',
      role: 'switch',
      'aria-checked': 'false',
      'aria-label': T.themeLabel,
      id: 'theme-switch'
    },
      h('span', { class: 'ts-text', 'aria-hidden': 'true' }),
      h('span', { class: 'ts-track', 'aria-hidden': 'true' },
        h('span', { class: 'ts-icon sun', svg: I.sun }),
        h('span', { class: 'ts-icon moon', svg: I.moon }),
        h('span', { class: 'ts-knob' })
      )
    );
    actions.appendChild(sw);

    var mb = h('button', {
      class: 'menu-btn',
      type: 'button',
      id: 'menu-btn',
      'aria-expanded': 'false',
      'aria-controls': 'nav-list',
      'aria-label': T.menuOpen
    });
    mb.innerHTML = I.menu + I.close;
    mb.appendChild(h('span', { class: 'mb-text', 'aria-hidden': 'true', text: T.menuOpen }));
    actions.appendChild(mb);
  }

  /* ---------- Intro (hero) ---------- */
  var RING = '<svg viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">' +
    '<circle class="ring-line" cx="100" cy="100" r="99"/>' +
    '<path class="ring-accent" d="M133.9 7A99 99 0 0 1 193 66.1"/>' +
    '<path class="ring-accent" d="M66.1 193A99 99 0 0 1 7 133.9"/></svg>';

  function renderHero() {
    var H = C.hero;
    var sec = $('#top');

    // headline with optional highlighted phrase
    var title = h('h1', { class: 'hero-title hero-enter', id: 'hero-title', style: '--d:1' });
    var at = H.highlight ? H.headline.indexOf(H.highlight) : -1;
    if (at >= 0) {
      append(title, H.headline.slice(0, at));
      append(title, h('span', { class: 'hl', text: H.highlight }));
      append(title, H.headline.slice(at + H.highlight.length));
    } else {
      append(title, H.headline);
    }

    var copy = h('div', { class: 'hero-copy' },
      h('p', { class: 'hero-name hero-enter', style: '--d:0' },
        h('span', { class: 'pip', 'aria-hidden': 'true' }),
        h('span', { text: H.name }),
        h('span', { class: 'note', text: H.nameNote })
      ),
      title,
      h('p', { class: 'hero-sub hero-enter', style: '--d:2', text: H.subline }),
      h('div', { class: 'hero-actions hero-enter', style: '--d:3' },
        H.buttons.map(function (b) {
          var a = h('a', { class: 'btn btn-lg ' + (b.primary ? 'btn-primary' : 'btn-ghost'), href: b.href }, b.label);
          if (b.primary) a.insertAdjacentHTML('beforeend', I.right);
          return a;
        })
      )
    );

    var portrait = h('div', { class: 'portrait-wrap hero-enter', style: '--d:1' },
      h('div', { class: 'portrait-ring', 'aria-hidden': 'true', svg: RING }),
      h('div', { class: 'portrait' },
        h('img', {
          src: H.portraitSrc,
          alt: H.portraitAlt,
          width: H.portraitWidth,
          height: H.portraitHeight,
          fetchpriority: 'high',
          decoding: 'async'
        })
      )
    );

    var facts = h('dl', { class: 'facts hero-enter', style: '--d:4', 'aria-label': H.factsLabel },
      H.facts.map(function (f) {
        return h('div', { class: 'fact' },
          h('dt', { class: 'label', text: f.label }),
          h('dd', { text: f.value })
        );
      })
    );

    sec.appendChild(h('div', { class: 'wrap' },
      h('div', { class: 'hero-inner' }, copy, portrait),
      facts
    ));
  }

  /* ---------- Experience ---------- */
  function renderExperience() {
    var E = C.experience;
    var w = wrap();
    w.appendChild(sectionHead('experience'));

    w.appendChild(h('div', { class: 'company card hud', 'data-reveal': '' },
      h('div', { class: 'company-logos' },
        E.logos.map(function (l) {
          return h('div', { class: 'logo-plate' },
            h('img', { src: l.src, alt: l.alt, width: l.width, height: l.height, loading: 'lazy', decoding: 'async' })
          );
        })
      ),
      h('div', { class: 'company-text' },
        h('h3', { class: 'company-name', text: E.company }),
        h('p', { class: 'company-meta', text: E.location + ' · ' + E.span })
      ),
      E.recognition && E.recognition.title ? h('div', { class: 'company-award' },
        h('p', { class: 'label', text: E.recognition.label }),
        h('p', { class: 'company-award-title', svg: I.star },
          h('span', { text: E.recognition.title }),
          E.recognition.count ? h('span', { class: 'award-count', text: E.recognition.count }) : null
        ),
        E.recognition.when && E.recognition.when.length ? chipList(E.recognition.when) : null
      ) : null
    ));

    var list = h('ol', { class: 'level-list' });
    E.levels.forEach(function (L, i) {
      var slug = L.level.toLowerCase();
      var logId = 'log-' + slug;
      var log = h('div', { class: 'log', id: logId, hidden: true }, bulletList(L.details));
      var toggleText = h('span', { text: E.showDetails });
      var toggle = h('button', {
        class: 'btn btn-ghost log-toggle',
        type: 'button',
        'aria-expanded': 'false',
        'aria-controls': logId
      }, toggleText);
      toggle.insertAdjacentHTML('beforeend', I.chev);
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        log.hidden = open;
        toggleText.textContent = open ? E.showDetails : E.hideDetails;
      });

      list.appendChild(h('li', { class: 'level', 'data-reveal': '' },
        h('div', { class: 'level-node' + (i === 0 ? ' is-top' : ''), 'aria-hidden': 'true', text: L.level }),
        h('article', { class: 'level-card card', 'aria-labelledby': 'role-' + slug },
          h('h4', { class: 'level-role', id: 'role-' + slug, text: L.role }),
          h('p', { class: 'level-meta', text: L.dates + ' · ' + L.location }),
          h('p', { class: 'level-summary', text: L.summary }),
          statsList(L.stats, 'stats-3'),
          toggle,
          log
        )
      ));

      // the promotion marker sits between the two roles
      if (i === 0 && E.levels.length > 1) {
        list.appendChild(h('li', { class: 'level-up', 'data-reveal': '' },
          h('div', { class: 'level-up-node', 'aria-hidden': 'true', svg: I.up }),
          h('p', { class: 'level-up-text' },
            h('span', { class: 'lu', 'aria-hidden': 'true', text: E.promotion.label }),
            h('span', { class: 'lu-detail', 'aria-hidden': 'true', text: E.promotion.detail }),
            h('span', { class: 'visually-hidden', text: E.promotion.srText })
          )
        ));
      }
    });

    w.appendChild(h('div', { class: 'levels' },
      h('span', { class: 'rail-fill', 'aria-hidden': 'true' }),
      list
    ));
    $('#experience').appendChild(w);
  }

  /* ---------- Projects ---------- */
  function projectFigure(q, Lb) {
    var imgs = q.images || [];
    if (!imgs.length) {
      var ph = h('div', { class: 'quest-art' });
      ph.innerHTML = questArt(q.art || 'network');
      return ph;
    }
    var img = h('img', { loading: 'lazy', decoding: 'async' });
    var frame = h('a', { class: 'figure-frame', target: '_blank', rel: 'noopener' },
      img,
      h('span', { class: 'figure-zoom', 'aria-hidden': 'true', svg: I.expand }),
      h('span', { class: 'visually-hidden', text: ' ' + Lb.fullSize })
    );
    var cap = h('figcaption', { class: 'figure-cap' });
    var tabs = null;

    function show(j) {
      var im = imgs[j];
      img.src = im.src;
      img.alt = im.alt || '';
      img.width = im.width;
      img.height = im.height;
      frame.href = im.src;
      cap.textContent = im.caption || '';
      if (tabs) $$('.figure-tab', tabs).forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === j)); });
    }

    if (imgs.length > 1) {
      tabs = h('div', { class: 'figure-tabs', role: 'group', 'aria-label': Lb.views },
        imgs.map(function (im, j) {
          return h('button', {
            class: 'figure-tab', type: 'button', 'aria-pressed': 'false',
            onclick: function () { show(j); }
          }, im.tab || String(j + 1));
        })
      );
    }
    show(0);
    return h('figure', { class: 'project-figure' }, frame, h('div', { class: 'figure-bar' }, cap, tabs));
  }

  function renderProjects() {
    var P = C.projects, Lb = P.labels;
    var w = wrap();
    w.appendChild(sectionHead('projects'));
    var grid = h('div', { class: 'quests' });

    P.items.forEach(function (q, i) {
      grid.appendChild(h('article', { class: 'quest card', 'data-reveal': '', style: '--i:' + i, 'aria-labelledby': 'project-' + i },
        projectFigure(q, Lb),
        h('div', { class: 'quest-body' },
          h('div', null,
            h('h3', { class: 'quest-title', id: 'project-' + i, text: q.title }),
            h('dl', { class: 'quest-meta' },
              h('div', null, h('dt', { class: 'label', text: Lb.client }), h('dd', { text: q.client })),
              h('div', null, h('dt', { class: 'label', text: Lb.party }), h('dd', { text: q.party }))
            )
          ),
          q.badge ? h('p', { class: 'award', svg: I.star }, q.badge) : null,
          h('div', null,
            h('h4', { class: 'label sub-label', text: Lb.results }),
            statsList(q.results, 'stats-2')
          ),
          h('div', null,
            h('h4', { class: 'label sub-label', text: Lb.did }),
            bulletList(q.did)
          ),
          h('div', null,
            h('h4', { class: 'label sub-label', text: Lb.pmSkills }),
            chipList(q.pmSkills)
          )
        )
      ));
    });

    w.appendChild(grid);
    $('#projects').appendChild(w);
  }

  /* ---------- Education ---------- */
  function renderEducation() {
    var E = C.education, Lb = E.labels;
    var w = wrap();
    w.appendChild(sectionHead('education'));
    var grid = h('div', { class: 'schools' });

    E.schools.forEach(function (s, i) {
      var pub = s.publication;
      grid.appendChild(h('article', { class: 'school card', 'data-reveal': '', style: '--i:' + i, 'aria-labelledby': 'school-' + i },
        h('div', { class: 'school-head' },
          h('div', { class: 'school-logo' },
            h('img', { src: s.logoSrc, alt: s.logoAlt, width: s.logoWidth, height: s.logoHeight, loading: 'lazy', decoding: 'async' })
          ),
          h('div', null,
            h('h3', { class: 'school-name', id: 'school-' + i, text: s.name }),
            h('p', { class: 'school-loc', text: s.location })
          )
        ),
        h('div', null,
          h('p', { class: 'school-degree', text: s.degree }),
          h('p', { class: 'school-date' },
            h('span', { class: 'status' + (s.current ? ' is-current' : ''), text: s.current ? Lb.current : Lb.done }),
            ' · ' + s.date
          )
        ),
        // 1. accomplishments
        s.highlights && s.highlights.length ? h('ul', { class: 'highlights' },
          s.highlights.map(function (t) { return h('li', { class: 'award', svg: I.star }, t); })
        ) : null,
        // 2. coursework
        s.courses && s.courses.length ? h('div', null,
          h('h4', { class: 'label sub-label', text: Lb.courses }),
          chipList(s.courses)
        ) : null,
        // 3. everything else from college: assistantships, publication
        s.assistantships && s.assistantships.length ? h('div', { class: 'school-extra' },
          h('h4', { class: 'label sub-label', text: Lb.assistantships }),
          h('ul', { class: 'assist-list' },
            s.assistantships.map(function (a) {
              return h('li', null, h('strong', { text: a.role }), h('span', { text: a.area }));
            })
          )
        ) : null,
        pub && pub.title ? h('div', { class: 'school-pub school-extra' },
          h('h4', { class: 'label sub-label', text: Lb.publication }),
          h('p', { class: 'pub-title', text: pub.title }),
          h('p', { class: 'pub-venue', text: pub.venue }),
          pub.url ? h('a', { class: 'btn btn-ghost pub-link', href: pub.url, target: '_blank', rel: 'noopener noreferrer' },
            pub.linkLabel,
            h('span', { class: 'visually-hidden', text: ' (opens in a new tab)' }),
            h('span', { svg: I.external, style: 'display:inline-flex' })
          ) : null
        ) : null
      ));
    });
    w.appendChild(grid);
    $('#education').appendChild(w);
  }

  /* ---------- Leadership ---------- */
  function renderLeadership() {
    var L = C.leadership, F = L.featured;
    var w = wrap();
    w.appendChild(sectionHead('leadership'));
    var slots = h('ul', { class: 'party-slots', 'aria-hidden': 'true' });
    for (var i = 0; i < 5; i++) slots.appendChild(h('li', { svg: I.person }));

    w.appendChild(h('article', { class: 'guild card hud', 'data-reveal': '', 'aria-labelledby': 'lead-role' },
      h('div', null,
        h('p', { class: 'label', text: F.dates }),
        h('h3', { class: 'guild-org', id: 'lead-role', text: F.role }),
        h('p', { class: 'guild-role', text: F.org }),
        h('p', { class: 'guild-summary', text: F.summary })
      ),
      h('div', null,
        h('div', { class: 'party' },
          slots,
          h('p', { class: 'party-text' }, h('strong', { text: F.teamLabel }), h('span', { text: F.teamNote }))
        ),
        statsList(F.stats, 'stats-rows')
      )
    ));

    if (L.roles && L.roles.length) {
      w.appendChild(h('h3', { class: 'roles-title', 'data-reveal': '', text: L.earlierTitle }));
      w.appendChild(h('ol', { class: 'role-timeline' },
        L.roles.map(function (r) {
          return h('li', { class: 'role-item', 'data-reveal': '' },
            h('p', { class: 'role-dates label', text: r.dates }),
            h('div', null,
              h('h4', { class: 'role-title', text: r.role }),
              h('p', { class: 'role-org', text: r.org }),
              r.points && r.points.length ? bulletList(r.points) : null,
              r.chips && r.chips.length ? h('div', { class: 'role-chips' },
                r.chipsLabel ? h('p', { class: 'label sub-label', text: r.chipsLabel }) : null,
                chipList(r.chips)
              ) : null
            )
          );
        })
      ));
    }
    $('#leadership').appendChild(w);
  }

  /* ---------- Certifications & awards ---------- */
  function renderAchievements() {
    var A = C.achievements;
    var w = wrap();
    w.appendChild(sectionHead('achievements'));

    function group(title, items, kind) {
      if (!items || !items.length) return null;
      return h('div', { class: 'badge-group' },
        h('h3', { class: 'label badge-group-title', text: title }),
        h('ul', { class: 'badges' },
          items.map(function (b, i) {
            return h('li', { 'data-reveal': '', style: '--i:' + Math.min(i, 4) },
              h('div', { class: 'badge', 'data-kind': kind },
                b.logoSrc
                  ? h('div', { class: 'cert-logo' },
                      h('img', { src: b.logoSrc, alt: b.logoAlt || '', width: b.logoWidth, height: b.logoHeight, loading: 'lazy', decoding: 'async' }))
                  : h('div', { class: 'badge-icon', 'aria-hidden': 'true', svg: badgeIcon(kind) }),
                h('div', null,
                  h('p', { class: 'badge-name', text: b.name }),
                  h('p', { class: 'badge-meta', text: b.tag })
                )
              )
            );
          })
        )
      );
    }

    w.appendChild(group(A.certGroupLabel, A.certs, 'cert'));
    w.appendChild(group(A.awardGroupLabel, A.awards, 'story'));
    $('#achievements').appendChild(w);
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    var S = C.skills;
    var w = wrap();
    w.appendChild(sectionHead('skills'));

    // dedupe across all groups (case-insensitive) and drop empty groups
    var seen = {};
    var groups = S.groups.map(function (g) {
      var items = (g.items || []).filter(function (s) {
        var k = String(s).trim().toLowerCase();
        if (!k || seen[k]) return false;
        seen[k] = true;
        return true;
      });
      return { id: g.id, name: g.name, items: items };
    }).filter(function (g) { return g.items.length > 0; });

    var total = groups.reduce(function (n, g) { return n + g.items.length; }, 0);
    var status = h('p', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
    var filters = h('div', { class: 'filters', role: 'group', 'aria-label': S.filterLabel, 'data-reveal': '' });
    var panel = h('div', { class: 'slot-groups' });

    function filterBtn(id, name, count) {
      return h('button', { class: 'filter', type: 'button', 'aria-pressed': id === 'all' ? 'true' : 'false', 'data-filter': id },
        h('span', { text: name }),
        h('span', { class: 'count', 'aria-hidden': 'true', text: String(count) }),
        h('span', { class: 'visually-hidden', text: ' (' + count + ')' })
      );
    }
    filters.appendChild(filterBtn('all', S.allLabel, total));
    groups.forEach(function (g) { filters.appendChild(filterBtn(g.id, g.name, g.items.length)); });

    groups.forEach(function (g, i) {
      panel.appendChild(h('section', { class: 'slot-group card', 'data-group': g.id, 'data-reveal': '', style: '--i:' + i, 'aria-labelledby': 'slot-' + g.id },
        h('div', { class: 'slot-head' },
          h('h3', { class: 'slot-name', id: 'slot-' + g.id, text: g.name }),
          h('span', { class: 'label', text: g.items.length + ' ' + (g.items.length === 1 ? S.countOne : S.countMany) })
        ),
        h('ul', { class: 'skills' }, g.items.map(function (s) { return h('li', { class: 'skill', text: s }); }))
      ));
    });

    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      var id = btn.getAttribute('data-filter');
      $$('.filter', filters).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      var shownCount = 0, shownName = S.allLabel;
      $$('.slot-group', panel).forEach(function (g) {
        var show = id === 'all' || g.getAttribute('data-group') === id;
        var wasHidden = g.hidden;
        g.hidden = !show;
        g.classList.add('is-in');              // filtering never leaves a group invisible
        if (show) {
          shownCount += g.querySelectorAll('.skill').length;
          if (id !== 'all') shownName = $('.slot-name', g).textContent;
          if (wasHidden && motionOK) {
            g.classList.remove('just-shown'); void g.offsetWidth; g.classList.add('just-shown');
          }
        }
      });
      panel.classList.toggle('is-single', id !== 'all');
      status.textContent = S.statusTemplate.replace('{count}', shownCount).replace('{group}', shownName);
    });

    w.appendChild(filters);
    w.appendChild(status);
    w.appendChild(panel);
    $('#skills').appendChild(w);
  }

  /* ---------- Hobbies ---------- */
  function renderHobbies() {
    var Hb = C.hobbies;
    var w = wrap();
    w.appendChild(sectionHead('hobbies'));
    w.appendChild(h('div', { class: 'hobbies' },
      Hb.items.map(function (hb, i) {
        // the d20 is a real button: it rolls the die
        var icon = hb.icon === 'd20'
          ? h('button', { class: 'hobby-icon d20-btn', type: 'button', 'aria-label': Hb.rollLabel, title: Hb.rollLabel, 'data-roll': '', svg: I.d20 })
          : h('div', { class: 'hobby-icon', 'aria-hidden': 'true', svg: I[hb.icon] || I.d20 });
        return h('article', { class: 'hobby card', 'data-reveal': '', style: '--i:' + i },
          icon,
          h('div', null,
            h('h3', { class: 'hobby-title', text: hb.title }),
            h('p', { class: 'hobby-text', text: hb.text }),
            hb.aside ? h('p', { class: 'hobby-line', text: '“' + hb.aside + '”' }) : null
          )
        );
      })
    ));
    $('#hobbies').appendChild(w);
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    var K = C.contact, M = C.meta;
    var w = wrap();
    w.appendChild(sectionHead('contact'));

    var emailText = h('span', { class: 'email-text', id: 'email-text', text: M.email });
    var status = h('p', { class: 'contact-status', role: 'status', 'aria-live': 'polite' });
    var copyLabel = h('span', { text: K.copyLabel });
    var copyBtn = h('button', { class: 'btn copy-btn', type: 'button' });
    copyBtn.innerHTML = I.copy + I.check;
    copyBtn.appendChild(copyLabel);

    var resetTimer;
    copyBtn.addEventListener('click', function () {
      copyText(M.email).then(function (ok) {
        clearTimeout(resetTimer);
        if (ok) {
          copyBtn.classList.add('is-copied');
          copyLabel.textContent = K.copiedLabel;
          status.textContent = K.copiedStatus;
          resetTimer = setTimeout(function () {
            copyBtn.classList.remove('is-copied');
            copyLabel.textContent = K.copyLabel;
            status.textContent = '';
          }, 2600);
        } else {
          try {
            var r = doc.createRange();
            r.selectNodeContents(emailText);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
          } catch (e) { /* ignore */ }
          status.textContent = K.copyFailStatus;
        }
      });
    });

    w.appendChild(h('div', { class: 'contact-panel hud', 'data-reveal': '' },
      h('p', { class: 'contact-closing', text: K.closing }),
      h('div', { class: 'contact-box' },
        h('div', { class: 'email-row' },
          h('span', { class: 'label', text: K.emailLabel }),
          emailText
        ),
        h('div', { class: 'contact-actions' },
          copyBtn,
          h('a', { class: 'btn btn-primary', href: 'mailto:' + M.email, svg: I.mail }, K.mailLabel),
          h('a', { class: 'btn btn-ghost', href: M.linkedin, target: '_blank', rel: 'noopener noreferrer', svg: I.linkedin },
            K.linkedinLabel,
            h('span', { class: 'visually-hidden', text: ' (opens in a new tab)' })
          )
        ),
        status
      )
    ));
    $('#contact').appendChild(w);
  }

  function copyText(text) {
    return new Promise(function (resolve) {
      function fallback() {
        var ok = false;
        try {
          var ta = h('textarea', { readonly: true, 'aria-hidden': 'true', style: 'position:fixed;top:0;left:0;opacity:0;pointer-events:none' });
          ta.value = text;
          doc.body.appendChild(ta);
          ta.select();
          ok = doc.execCommand && doc.execCommand('copy');
          doc.body.removeChild(ta);
        } catch (e) { ok = false; }
        resolve(!!ok);
      }
      try {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { resolve(true); }, fallback);
          return;
        }
      } catch (e) { /* fall through */ }
      fallback();
    });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var F = C.footer;
    var year = h('span', { id: 'year', text: String(new Date().getFullYear()) });
    $('#footer').appendChild(h('div', { class: 'wrap footer-inner' },
      h('p', { class: 'footer-thanks', text: F.thanks }),
      h('p', { class: 'footer-meta' }, C.meta.fullName + ' · ' + C.meta.location + ' · ', year)
    ));
    // floating button, always within reach once you have scrolled
    doc.body.appendChild(h('a', { class: 'to-top', id: 'to-top', href: '#top', 'aria-label': F.backToTop, title: F.backToTop, svg: I.up }));
  }

  /* =====================================================================
     Interactions
     ===================================================================== */

  // Only one pop-up (resume choices, phone menu) is open at a time.
  var closers = [];
  function closeOthers(me) { closers.forEach(function (fn) { if (fn !== me) fn(); }); }

  /* ---------- Resume choices ---------- */
  function initResumeMenu() {
    var btn = $('#resume-btn'), pop = $('#resume-pop'), box = $('#resume-menu');
    function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }
    function set(open, returnFocus) {
      btn.setAttribute('aria-expanded', String(open));
      pop.hidden = !open;
      if (!open && returnFocus) btn.focus();
    }
    var closeMe = function () { if (isOpen()) set(false); };
    closers.push(closeMe);

    btn.addEventListener('click', function () {
      var next = !isOpen();
      if (next) closeOthers(closeMe);
      set(next);
    });
    pop.addEventListener('click', function (e) {
      if (e.target.closest('a')) setTimeout(function () { set(false); }, 0);   // let the download start first
    });
    doc.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) set(false, true);
    });
    doc.addEventListener('click', function (e) {
      if (isOpen() && !box.contains(e.target)) set(false);
    });
    box.addEventListener('focusout', function (e) {
      if (isOpen() && e.relatedTarget && !box.contains(e.relatedTarget)) set(false);
    });
  }

  /* ---------- Day / night ---------- */
  function initTheme() {
    var T = C.topBar;
    var sw = $('#theme-switch');
    var text = $('.ts-text', sw);
    var animTimer;

    function saved() {
      try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
    }
    function apply(theme, animate) {
      if (animate && !reduceMotion) {
        root.classList.add('theme-anim');
        clearTimeout(animTimer);
        animTimer = setTimeout(function () { root.classList.remove('theme-anim'); }, 280);
      }
      root.setAttribute('data-theme', theme);
      sw.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
      text.textContent = theme === 'dark' ? T.themeNight : T.themeDay;
    }

    apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);

    sw.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next, true);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode: fine */ }
    });

    // follow the system setting until the visitor picks one
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        var s = saved();
        if (s !== 'light' && s !== 'dark') apply(e.matches ? 'dark' : 'light', true);
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ---------- Phone / tablet menu ---------- */
  function initMenu() {
    var T = C.topBar;
    var header = $('#topbar');
    var btn = $('#menu-btn');
    var btnText = $('.mb-text', btn);
    var list = $('#nav-list');

    function set(open, returnFocus) {
      header.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? T.menuClose : T.menuOpen);
      btnText.textContent = open ? T.menuClose : T.menuOpen;
      if (!open && returnFocus) btn.focus();
    }
    function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }

    var closeMe = function () { if (isOpen()) set(false); };
    closers.push(closeMe);

    btn.addEventListener('click', function () {
      var next = !isOpen();
      if (next) closeOthers(closeMe);
      set(next);
    });
    list.addEventListener('click', function (e) {
      if (e.target.closest('a')) set(false);
    });
    doc.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) set(false, true);
    });
    doc.addEventListener('click', function (e) {
      if (isOpen() && !header.contains(e.target)) set(false);
    });
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 1200px)');
      var onWide = function (e) { if (e.matches) set(false); };
      if (wide.addEventListener) wide.addEventListener('change', onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  }

  /* ---------- Progress bar + active menu item ---------- */
  function initScrollState() {
    var fill = $('#xp-fill');
    var links = $$('.nav-link');
    var targets = links.map(function (a) { return { link: a, el: doc.getElementById(a.getAttribute('data-target')) }; })
      .filter(function (t) { return t.el; });
    var header = $('#topbar');
    var toTop = $('#to-top');
    var ticking = false;
    var current = null;

    function update() {
      ticking = false;
      var y = window.pageYOffset || root.scrollTop;
      var max = root.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      fill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      if (toTop) toTop.classList.toggle('is-on', y > 480);

      var line = header.offsetHeight + window.innerHeight * 0.3;
      var active = null;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i].el.getBoundingClientRect().top <= line) active = targets[i];
      }
      if (max > 0 && max - y < 4 && targets.length) active = targets[targets.length - 1];
      if (active !== current) {
        if (current) current.link.removeAttribute('aria-current');
        if (active) active.link.setAttribute('aria-current', 'location');
        current = active;
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------- Heading scramble (once per heading, < 1s) ---------- */
  var GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  function scramble(hEl) {
    if (hEl.getAttribute('data-scrambled')) return;
    hEl.setAttribute('data-scrambled', '1');
    var real = $('.t-real', hEl);
    if (!real) return;
    var text = real.textContent;
    var n = text.length;
    var fx = h('span', { class: 't-fx', 'aria-hidden': 'true' });
    hEl.appendChild(fx);
    hEl.classList.add('is-scrambling');

    var settle = [];
    for (var i = 0; i < n; i++) settle.push(90 + (i / Math.max(1, n - 1)) * 420 + Math.random() * 90);
    var start = null, lastSwap = 0, shown = '';
    function finish() {
      hEl.classList.remove('is-scrambling');
      if (fx.parentNode) fx.parentNode.removeChild(fx);
    }
    function frame(t) {
      if (start === null) start = t;
      var e = t - start;
      if (e - lastSwap >= 45 || !shown) {
        lastSwap = e;
        var out = '', done = true;
        for (var j = 0; j < n; j++) {
          var ch = text.charAt(j);
          if (ch === ' ' || e >= settle[j]) out += ch;
          else { done = false; out += GLYPHS.charAt((Math.random() * GLYPHS.length) | 0); }
        }
        shown = out;
        fx.textContent = out;
        if (done) { finish(); return; }
      }
      if (e > 750) { finish(); return; }   // hard stop, always well under a second
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  /* ---------- Reveals, career path line, badge icons ---------- */
  function initMotion() {
    if (!motionOK) return;

    var pending = $$('[data-reveal], .levels');
    var revealIO;
    // Content the visitor has already scrolled past shows up instantly,
    // so nothing pops in when they scroll back up.
    function settleAbove() {
      pending = pending.filter(function (n) {
        if (n.classList.contains('is-in')) return false;
        if (n.getBoundingClientRect().bottom < 0) {
          n.classList.add('no-anim', 'is-in');
          revealIO.unobserve(n);
          return false;
        }
        return true;
      });
    }
    revealIO = new IntersectionObserver(function (entries) {
      var hit = false;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        hit = true;
        revealIO.unobserve(en.target);
        en.target.classList.add('is-in');
      });
      if (hit) settleAbove();
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    pending.forEach(function (n) { revealIO.observe(n); });

    var titleIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        titleIO.unobserve(en.target);
        scramble(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.6 });
    $$('[data-scramble]').forEach(function (n) { titleIO.observe(n); });

    var badgeIO = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (en) { return en.isIntersecting; });
      batch.forEach(function (en, i) {
        var b = en.target;
        badgeIO.unobserve(b);
        setTimeout(function () {
          b.classList.add('is-unlocked', 'just-unlocked');
          setTimeout(function () { b.classList.remove('just-unlocked'); }, 900);
        }, 250 + Math.min(i, 6) * 110);
      });
    }, { threshold: 0.6 });
    $$('.badge').forEach(function (n) { badgeIO.observe(n); });

    // printing: show everything
    window.addEventListener('beforeprint', function () {
      $$('[data-reveal]').forEach(function (n) { n.classList.add('is-in'); });
      $$('.badge').forEach(function (n) { n.classList.add('is-unlocked'); });
    });
  }

  /* ---------- Easter egg: type d20 ---------- */
  function initEasterEgg() {
    var E = C.easterEgg;
    var trigger = (E.trigger || 'd20').toLowerCase();
    var buffer = '';
    var toast = null, hideTimer;

    function build() {
      toast = h('div', { class: 'roll-toast', role: 'status', 'aria-live': 'polite' });
      toast.innerHTML = '<svg class="roll-die" viewBox="0 0 52 52" aria-hidden="true" focusable="false">' +
        '<path class="die-face" d="M26 2l21 12v24L26 50 5 38V14z"/>' +
        '<text class="die-num" x="26" y="31.5" text-anchor="middle" font-size="16"></text></svg>';
      toast.appendChild(h('div', null,
        h('p', { class: 'roll-title' }),
        h('p', { class: 'roll-msg' })
      ));
      doc.body.appendChild(toast);
    }

    function roll() {
      if (!toast) build();
      var n = 1 + Math.floor(Math.random() * 20);
      var M = E.messages;
      var msg = n === 20 ? M.nat20 : n === 1 ? M.nat1 : n >= 15 ? M.high : n >= 6 ? M.mid : M.low;
      $('.die-num', toast).textContent = String(n);
      $('.roll-title', toast).textContent = E.title.replace('{n}', n);
      $('.roll-msg', toast).textContent = msg;
      toast.classList.remove('is-rolling');
      void toast.offsetWidth;
      if (!reduceMotion) toast.classList.add('is-rolling');
      toast.classList.add('is-showing');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { toast.classList.remove('is-showing'); }, 4600);
    }

    $$('[data-roll]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!reduceMotion) { b.classList.remove('is-spun'); void b.offsetWidth; b.classList.add('is-spun'); }
        roll();
      });
    });

    doc.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-trigger.length);
      if (buffer === trigger) { buffer = ''; roll(); }
    });
  }

  /* =====================================================================
     Boot
     ===================================================================== */
  try {
    if (motionOK) root.classList.add('motion');
    renderTopBar();
    renderHero();
    renderExperience();
    renderProjects();
    renderEducation();
    renderLeadership();
    renderAchievements();
    renderSkills();
    renderHobbies();
    renderContact();
    renderFooter();
  } catch (err) {
    root.classList.remove('motion');      // never leave content hidden
    if (window.console) console.error('Render error:', err);
  }

  [initTheme, initResumeMenu, initMenu, initScrollState, initMotion, initEasterEgg].forEach(function (fn) {
    try { fn(); } catch (err) {
      if (fn === initMotion) root.classList.remove('motion');
      if (window.console) console.error(err);
    }
  });

  // live updates if the visitor turns on reduced motion mid-visit
  if (mqReduce) {
    var onReduce = function (e) {
      reduceMotion = e.matches;
      if (e.matches) {
        root.classList.remove('motion');
        $$('[data-reveal]').forEach(function (n) { n.classList.add('is-in'); });
      }
    };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onReduce);
    else if (mqReduce.addListener) mqReduce.addListener(onReduce);
  }
})();
