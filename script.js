// DOM nodes
const form        = document.getElementById('bookmark-form');
const nameInput   = document.getElementById('site-name');
const urlInput    = document.getElementById('site-url');
const tagsInput   = document.getElementById('site-tags');
const searchInput = document.getElementById('searchInput');
const listDiv     = document.getElementById('bookmarks-list');
const themeBtn    = document.getElementById('theme-toggle');

// Load & save helpers
const load = () => JSON.parse(localStorage.getItem('bookmarks')) || [];
const save = arr => localStorage.setItem('bookmarks', JSON.stringify(arr));

// 1️⃣ Add
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const url  = urlInput.value.trim();
  const tags = tagsInput.value.trim().toLowerCase();
  if (!name || !url) return;

  const bookmarks = load();
  bookmarks.push({ name, url, tags });
  save(bookmarks);

  form.reset();
  render(bookmarks);
});

// 2️⃣ Render (with optional filter)
function render(arr = null) {
  const items = arr || load();
  listDiv.innerHTML = '';

  items.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'bookmark';
    card.innerHTML = `
      <div class="bookmark-info">
        <a href="${b.url}" target="_blank">${b.name}</a>
        ${b.tags ? `<small>Tags: ${b.tags}</small>` : ''}
      </div>
      <div class="bookmark-actions">
        <button title="Up"    onclick="move(${i}, -1)">⬆️</button>
        <button title="Down"  onclick="move(${i}, +1)">⬇️</button>
        <button title="Delete"onclick="del(${i})">🗑️</button>
      </div>
    `;
    listDiv.appendChild(card);
  });
}

// 3️⃣ Delete
function del(idx) {
  const arr = load();
  arr.splice(idx,1);
  save(arr);
  render(arr);
}

// 4️⃣ Move up/down
function move(idx, delta) {
  const arr = load();
  const target = idx + delta;
  if (target < 0 || target >= arr.length) return;
  [arr[idx], arr[target]] = [arr[target], arr[idx]];
  save(arr);
  render(arr);
}

// 5️⃣ Search/filter
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  const filtered = load().filter(b =>
    b.name.toLowerCase().includes(q) ||
    (b.tags && b.tags.includes(q))
  );
  render(filtered);
});

// 6️⃣ Dark-mode toggle
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// 7️⃣ Init
window.addEventListener('DOMContentLoaded', () => {
  render();
  // optionally respect system theme:
  // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   document.body.classList.add('dark');
  //   themeBtn.textContent = '☀️ Light Mode';
  // }
});
