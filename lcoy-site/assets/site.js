// LCOY Rwanda 2026 — shared behaviour for index.html and reports.html

// Header border once the page scrolls
const header = document.getElementById('top');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Today's date in Kigali (CAT), as YYYY-MM-DD so dates compare as strings
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Kigali' }).format(new Date());

// Live status in the hero
const statusBox = document.getElementById('status');
if (statusBox) {
  const txt = document.getElementById('status-txt');
  const days = {
    '2026-10-28': ['Live now: day 1 of the National LCOY in Kigali', 'Knowledge, dialogue and arts. The opening plenary is with the Ministry of Environment.'],
    '2026-10-29': ['Live now: day 2 of the National LCOY in Kigali', 'Action, policy and pitching. Youth innovators present their climate solutions.'],
    '2026-10-30': ['Live now: day 3 of the National LCOY in Kigali', 'Culture, heritage and global solidarity, closing with the Arts for Climate grand performance.'],
  };
  let msg;
  if (days[today]) msg = days[today];
  else if (today < '2026-09-26') msg = ['Climate Month starts on 26 September', 'Launching nationwide on Umuganda Day.'];
  else if (today < '2026-10-28') msg = ['Climate Month is underway', 'Youth dialogues are running in districts across Rwanda. The national conference is in Kigali on 28–30 October.'];
  else if (today <= '2026-11-20') { msg = ['LCOY Rwanda 2026 has concluded', 'The youth position paper goes to COP31 in Antalya, 9–20 November.']; statusBox.classList.add('done'); }
  else { msg = ['LCOY Rwanda 2026 is complete', 'The youth position paper was presented at COP31 in Antalya.']; statusBox.classList.add('done'); }
  txt.innerHTML = '';
  const strong = document.createElement('strong');
  strong.textContent = msg[0];
  txt.append(strong, msg[1]);
}

// Mark the conference day that is happening today
document.querySelectorAll('.day[data-day]').forEach(day => {
  const d = day.dataset.day;
  const when = day.querySelector('.day-when');
  if (d === today) {
    day.classList.add('is-now');
    when.insertAdjacentHTML('beforeend', '<span class="tag tag-now">Today</span>');
  } else if (d < today) {
    when.insertAdjacentHTML('beforeend', '<span class="tag tag-done">Done</span>');
  }
});

// Mark programme steps as done, happening now or coming up
document.querySelectorAll('.phase[data-start]').forEach(p => {
  const h = p.querySelector('h3');
  if (today > p.dataset.end) {
    p.classList.add('is-done');
    h.insertAdjacentHTML('beforeend', '<span class="tag tag-done">Done</span>');
  } else if (today >= p.dataset.start) {
    p.classList.add('is-now');
    h.insertAdjacentHTML('beforeend', '<span class="tag tag-now">Happening now</span>');
  }
});

// Province filter on the reports page
const chips = document.querySelectorAll('.chip[data-f]');
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(x => x.setAttribute('aria-pressed', x === c));
  const f = c.dataset.f;
  document.querySelectorAll('[data-p]').forEach(el => el.classList.toggle('hidden', f !== 'all' && el.dataset.p !== f));
}));
