// Grab elements
const form         = document.getElementById('bookmark-form');
const nameInput    = document.getElementById('site-name');
const urlInput     = document.getElementById('site-url');
const tagsInput    = document.getElementById('site-tags');
const searchInput  = document.getElementById('searchInput');
const listContainer= document.getElementById('bookmarks-list');

// 1. Save Bookmark
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const url  = urlInput.value.trim();
  const tags = tagsInput.value.trim().toLowerCase();

  if (!name || !url) return;

  const bookmark = { name, url, tags };
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  form.reset();
  displayBookmarks(bookmarks);
});

// 2. Display (all or filtered)  
function displayBookmarks(bookmarks = null) {
  const items = bookmarks || JSON.parse(localStorage.getItem('bookmarks')) || [];
  listContainer.innerHTML = '';
  items.forEach((b, i) => {
    const div = document.createElement('div');
    div.className = 'bookmark';
    div.innerHTML = `
      <div>
        <a href="${b.url}" target="_blank">${b.name}</a>
        ${b.tags ? `<small> • ${b.tags}</small>` : ''}
      </div>
      <button onclick="deleteBookmark(${i})">Delete</button>
    `;
    listContainer.appendChild(div);
  });
}

// 3. Delete  
function deleteBookmark(idx) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(idx, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}

// 4. Search & Filter  
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  const filtered = bookmarks.filter(b =>
    b.name.toLowerCase().includes(q) ||
    (b.tags && b.tags.includes(q))
  );
  displayBookmarks(filtered);
});

// 5. Initial load  
window.addEventListener('DOMContentLoaded', () => displayBookmarks());
