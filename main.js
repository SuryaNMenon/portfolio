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
    star: svg('<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6-4.5-4.2 6.1-.7z"/>', { fill: true }),
    save: svg('<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7V3M8 21v-7h8v7"/>'),
    person: svg('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/>'),
    d20: svg('<path d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4z"/><path class="acc" d="M12 7.5l5 8.2H7z"/><path d="M12 2.5v5M3.5 7.4L12 7.5l8.5-.1M3.5 7.4L7 15.7M20.5 7.4L17 15.7M3.5 16.6L7 15.7M20.5 16.6L17 15.7M12 21.5L7 15.7M12 21.5l5-5.8"/>', { sw: 1.4 }),
    controller: svg('<path d="M7 8h10a4.5 4.5 0 0 1 4.4 5.4l-.8 4a2.5 2.5 0 0 1-4.3 1.2L14.5 16h-5l-1.8 2.6a2.5 2.5 0 0 1-4.3-1.2l-.8-4A4.5 4.5 0 0 1 7 8z"/><path d="M8 10.5v4M6 12.5h4"/><path class="acc" d="M15.5 11h.01M18 13.5h.01" stroke-width="2.6" stroke-linecap="round"/>', { sw: 1.6 })
  };
  var EMBLEM = '<svg viewBox="0 0 15 15" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' +
    '<rect class="emblem-bg" width="15" height="15" rx="2"/>' +
    '<path class="emblem-px" d="M3 3h4v1h-4zM2 4h1v1h-1zM2 5h1v1h-1zM3 6h3v1h-3zM6 7h1v1h-1zM6 8h1v1h-1zM2 9h4v1h-4zM8 3h1v1h-1zM12 3h1v1h-1zM8 4h2v1h-2zM11 4h2v1h-2zM8 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM8 6h1v1h-1zM12 6h1v1h-1zM8 7h1v1h-1zM12 7h1v1h-1zM8 8h1v1h-1zM12 8h1v1h-1zM8 9h1v1h-1zM12 9h1v1h-1z"/>' +
    '<rect class="emblem-bar" x="2" y="11" width="11" height="1"/></svg>';

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

  // Themed placeholder art for project cards (until real images are added)
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

  function sectionHead(key, extra) {
    var s = C.sections[key];
    var idx = ORDER.indexOf(key) + 1;
    return h('header', { class: 'section-head', 'data-reveal': '' },
      h('p', { class: 'eyebrow label' },
        h('span', { class: 'eyebrow-index', 'aria-hidden': 'true', text: pad2(idx) }),
        h('span', { text: s.navLabel + (extra ? ' · ' + extra : '') })
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

  function wrap() { return h('div', { class: 'wrap' }); }

  /* ---------- Top bar ---------- */
  function renderTopBar() {
    var T = C.topBar;
    var brand = $('#brand');
    brand.setAttribute('aria-label', T.homeLabel);
    brand.innerHTML = EMBLEM;
    brand.appendChild(h('span', { class: 'brand-name', 'aria-hidden': 'true', text: C.meta.playerName }));

    $('#site-nav').setAttribute('aria-label', T.navLabel);
    var list = $('#nav-list');
    ORDER.forEach(function (key) {
      list.appendChild(h('li', null,
        h('a', { class: 'nav-link', href: '#' + key, 'data-target': key, text: C.sections[key].navLabel })
      ));
    });

    var actions = $('#topbar-actions');
    actions.appendChild(h('a', {
      class: 'btn btn-primary resume-btn',
      href: C.meta.resumeFile,
      download: C.meta.resumeDownloadName,
      svg: I.download
    }, h('span', { class: 'lg', text: T.resumeLabel }), h('span', { class: 'sm', text: T.resumeShort })));

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

  /* ---------- Hero ---------- */
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
      h('p', { class: 'hero-tag hero-enter', style: '--d:0' },
        h('span', { class: 'pip', 'aria-hidden': 'true' }),
        H.tag,
        h('span', { class: 'sep', 'aria-hidden': 'true', text: '·' }),
        C.meta.playerName
      ),
      title,
      h('p', { class: 'hero-name hero-enter', style: '--d:2' },
        H.name + ' ',
        h('span', { class: 'note', text: H.nameNote })
      ),
      h('p', { class: 'hero-sub hero-enter', style: '--d:3', text: H.subline }),
      h('ul', { class: 'start-menu hero-enter', style: '--d:4', 'aria-label': H.menuLabel },
        H.menu.map(function (m) {
          return h('li', null,
            h('a', { class: 'menu-option', href: m.href },
              h('span', { class: 'sel', 'aria-hidden': 'true' }),
              h('span', { text: m.label }),
              h('span', { class: 'hint', 'aria-hidden': 'true', text: m.hint })
            )
          );
        })
      )
    );

    var card = h('div', { class: 'player hud hero-enter', style: '--d:3', role: 'group', 'aria-label': H.cardTitle },
      h('div', { class: 'player-head label' },
        h('span', { text: H.cardTitle }),
        h('span', { class: 'player-status', text: H.cardStatus })
      ),
      h('div', { class: 'portrait' },
        h('img', {
          src: H.portraitSrc,
          alt: H.portraitAlt,
          width: H.portraitWidth,
          height: H.portraitHeight,
          fetchpriority: 'high',
          decoding: 'async'
        }),
        h('span', { class: 'portrait-tag', 'aria-hidden': 'true' }, h('span', { text: 'P1 ' }), C.meta.playerName)
      ),
      h('dl', { class: 'player-stats' },
        H.stats.map(function (s) {
          return h('div', null, h('dt', { class: 'label', text: s.label }), h('dd', { text: s.value }));
        })
      ),
      h('div', { class: 'best-run' },
        h('p', { class: 'label', text: H.bestRun.label }),
        h('p', { text: H.bestRun.value })
      )
    );

    var cue = h('a', { class: 'press-start hero-enter', style: '--d:6', href: H.scrollCueTarget },
      h('span', { class: 'keycap', 'aria-hidden': 'true', svg: I.down }),
      H.scrollCue
    );

    var inner = h('div', { class: 'wrap hero-inner' }, copy, card);
    sec.appendChild(inner);
    sec.appendChild(cue);
  }

  /* ---------- Experience: levels ---------- */
  function renderExperience() {
    var E = C.experience;
    var w = wrap();
    w.appendChild(sectionHead('experience'));

    w.appendChild(h('div', { class: 'world card hud', 'data-reveal': '' },
      h('div', { class: 'logo-plate' },
        h('img', { src: E.logoSrc, alt: E.logoAlt, width: E.logoWidth, height: E.logoHeight, loading: 'lazy', decoding: 'async' })
      ),
      h('div', { class: 'world-text' },
        h('p', { class: 'label', text: E.worldLabel + ' · ' + E.location }),
        h('h3', { class: 'world-company', text: E.company }),
        h('p', { class: 'world-meta', text: E.span })
      )
    ));

    var list = h('ol', { class: 'level-list' });
    E.levels.forEach(function (L, i) {
      var logId = 'log-' + L.level.toLowerCase();
      var log = h('div', { class: 'log', id: logId, hidden: true },
        h('ul', { class: 'bullets' }, L.details.map(function (d) { return h('li', { text: d }); }))
      );
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
        h('article', { class: 'level-card card', 'aria-labelledby': 'role-' + L.level.toLowerCase() },
          h('div', { class: 'level-top' },
            h('span', { class: 'label', text: L.levelName })
          ),
          h('h4', { class: 'level-role', id: 'role-' + L.level.toLowerCase() },
            L.role + ' ',
            h('span', { class: 'visually-hidden', text: '(' + L.levelName + ')' })
          ),
          h('p', { class: 'level-meta', text: L.dates + ' · ' + L.location }),
          h('p', { class: 'level-summary', text: L.summary }),
          statsList(L.stats, 'stats-3'),
          toggle,
          log
        )
      ));

      // the level-up marker sits between the two levels
      if (i === 0 && E.levels.length > 1) {
        list.appendChild(h('li', { class: 'level-up', 'data-reveal': '' },
          h('div', { class: 'level-up-node', 'aria-hidden': 'true', svg: I.up }),
          h('p', { class: 'level-up-text' },
            h('span', { class: 'lu', 'aria-hidden': 'true', text: E.levelUp.label }),
            h('span', { class: 'lu-detail', 'aria-hidden': 'true', text: E.levelUp.detail }),
            h('span', { class: 'visually-hidden', text: E.levelUp.srText })
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

  /* ---------- Projects: side quests ---------- */
  function renderProjects() {
    var P = C.projects, Lb = P.labels;
    var w = wrap();
    w.appendChild(sectionHead('projects'));
    var grid = h('div', { class: 'quests' });

    P.items.forEach(function (q, i) {
      var art = h('div', { class: 'quest-art' });
      if (q.imageSrc) {
        art.appendChild(h('img', { src: q.imageSrc, alt: q.imageAlt || '', width: 1280, height: 720, loading: 'lazy', decoding: 'async' }));
      } else {
        art.innerHTML = questArt(q.art);
      }

      grid.appendChild(h('article', { class: 'quest card', 'data-reveal': '', style: '--i:' + i, 'aria-labelledby': 'quest-' + i },
        art,
        h('div', { class: 'quest-body' },
          h('div', null,
            h('p', { class: 'label', text: Lb.quest + ' ' + pad2(i + 1) }),
            h('h3', { class: 'quest-title', id: 'quest-' + i, text: q.title }),
            h('dl', { class: 'quest-meta' },
              h('div', null, h('dt', { class: 'label', text: Lb.client }), h('dd', { text: q.client })),
              h('div', null, h('dt', { class: 'label', text: Lb.party }), h('dd', { text: q.party }))
            )
          ),
          q.badge ? h('p', { class: 'award', svg: I.star }, q.badge) : null,
          h('div', null,
            h('h4', { class: 'label sub-label', text: Lb.did }),
            h('ul', { class: 'bullets' }, q.did.map(function (d) { return h('li', { text: d }); }))
          ),
          h('div', null,
            h('h4', { class: 'label sub-label', text: Lb.rewards }),
            statsList(q.rewards, 'stats-2')
          ),
          h('div', null,
            h('h4', { class: 'label sub-label', text: Lb.pmMoves }),
            h('ul', { class: 'chips' }, q.pmMoves.map(function (m) { return h('li', { class: 'chip', text: m }); }))
          )
        )
      ));
    });

    w.appendChild(grid);
    $('#projects').appendChild(w);
  }

  /* ---------- Education: training grounds ---------- */
  function renderEducation() {
    var E = C.education, Lb = E.labels;
    var w = wrap();
    w.appendChild(sectionHead('education'));
    var grid = h('div', { class: 'schools' });

    E.schools.forEach(function (s, i) {
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
        h('p', { class: 'status label' + (s.current ? ' is-current' : ''), text: s.current ? Lb.current : Lb.done }),
        h('div', null,
          h('p', { class: 'school-degree', text: s.degree }),
          h('p', { class: 'school-date', text: s.date })
        ),
        s.highlight ? h('p', { class: 'highlight', text: s.highlight }) : null,
        s.courses && s.courses.length ? h('div', null,
          h('h4', { class: 'label sub-label', text: Lb.courses }),
          h('ul', { class: 'chips' }, s.courses.map(function (c) { return h('li', { class: 'chip', text: c }); }))
        ) : null
      ));
    });
    w.appendChild(grid);

    var pub = E.publication;
    if (pub && pub.title) {
      w.appendChild(h('article', { class: 'publication card hud', 'data-reveal': '', 'aria-labelledby': 'pub-title' },
        h('div', null,
          h('p', { class: 'label', text: Lb.publication }),
          h('h3', { class: 'pub-title', id: 'pub-title', text: pub.title }),
          h('p', { class: 'pub-venue', text: pub.venue })
        ),
        pub.url ? h('a', { class: 'btn btn-ghost', href: pub.url, target: '_blank', rel: 'noopener noreferrer' },
          pub.linkLabel,
          h('span', { class: 'visually-hidden', text: ' (opens in a new tab)' }),
          h('span', { svg: I.external, style: 'display:inline-flex' })
        ) : null
      ));
    }
    $('#education').appendChild(w);
  }

  /* ---------- Leadership: guild hall ---------- */
  function renderLeadership() {
    var L = C.leadership;
    var w = wrap();
    w.appendChild(sectionHead('leadership'));
    var slots = h('ul', { class: 'party-slots', 'aria-hidden': 'true' });
    for (var i = 0; i < 5; i++) slots.appendChild(h('li', { svg: I.person }));

    w.appendChild(h('article', { class: 'guild card hud', 'data-reveal': '', 'aria-labelledby': 'guild-org' },
      h('div', null,
        h('p', { class: 'label', text: L.dates }),
        h('h3', { class: 'guild-org', id: 'guild-org', text: L.org }),
        h('p', { class: 'guild-role', text: L.role }),
        h('p', { class: 'guild-summary', text: L.summary })
      ),
      h('div', null,
        h('div', { class: 'party' },
          slots,
          h('p', { class: 'party-text' }, h('strong', { text: L.partyLabel }), h('span', { text: L.partyNote }))
        ),
        statsList(L.stats, 'stats-rows')
      )
    ));
    $('#leadership').appendChild(w);
  }

  /* ---------- Achievements: unlocked ---------- */
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
                h('div', { class: 'badge-icon', 'aria-hidden': 'true', svg: badgeIcon(kind) }),
                h('div', null,
                  h('p', { class: 'badge-name', text: b.name }),
                  h('p', { class: 'badge-meta' },
                    h('span', { text: b.tag }),
                    h('span', { class: 'badge-state', text: A.unlockedLabel })
                  )
                )
              )
            );
          })
        )
      );
    }

    w.appendChild(group(A.certGroupLabel, A.certs, 'cert'));
    w.appendChild(group(A.storyGroupLabel, A.story, 'story'));
    $('#achievements').appendChild(w);
  }

  /* ---------- Skills: loadout ---------- */
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
          h('span', { class: 'label', text: g.items.length + (g.items.length === 1 ? ' slot' : ' slots') })
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

  /* ---------- Hobbies: between sessions ---------- */
  function renderHobbies() {
    var w = wrap();
    w.appendChild(sectionHead('hobbies'));
    w.appendChild(h('div', { class: 'hobbies' },
      C.hobbies.map(function (hb, i) {
        return h('article', { class: 'hobby card', 'data-reveal': '', style: '--i:' + i },
          h('div', { class: 'hobby-icon', 'aria-hidden': 'true', svg: I[hb.icon] || I.d20 }),
          h('div', null,
            h('h3', { class: 'hobby-title', text: hb.title }),
            h('p', { class: 'hobby-line', text: '“' + hb.line + '”' })
          )
        );
      })
    ));
    $('#hobbies').appendChild(w);
  }

  /* ---------- Contact: two-player mode ---------- */
  function renderContact() {
    var K = C.contact, M = C.meta;
    var w = wrap();
    w.appendChild(sectionHead('contact', K.eyebrow));

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
      h('p', { class: 'saved', svg: I.save }, F.saved),
      h('p', null, '© ', year, ' ' + C.meta.fullName + ' · ' + C.meta.location + '. ' + F.builtWith),
      h('a', { class: 'top-link', href: '#top', svg: I.up }, F.backToTop)
    ));
  }

  /* =====================================================================
     Interactions
     ===================================================================== */

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

    btn.addEventListener('click', function () { set(!isOpen()); });
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

  /* ---------- XP bar + active menu item ---------- */
  function initScrollState() {
    var fill = $('#xp-fill');
    var links = $$('.nav-link');
    var targets = links.map(function (a) { return { link: a, el: doc.getElementById(a.getAttribute('data-target')) }; })
      .filter(function (t) { return t.el; });
    var header = $('#topbar');
    var ticking = false;
    var current = null;

    function update() {
      ticking = false;
      var y = window.pageYOffset || root.scrollTop;
      var max = root.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      fill.style.transform = 'scaleX(' + p.toFixed(4) + ')';

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

  /* ---------- Reveals, level path, unlocks ---------- */
  function initMotion() {
    if (!motionOK) return;

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        revealIO.unobserve(en.target);
        en.target.classList.add('is-in');
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    $$('[data-reveal], .levels').forEach(function (n) { revealIO.observe(n); });

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

  [initTheme, initMenu, initScrollState, initMotion, initEasterEgg].forEach(function (fn) {
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
