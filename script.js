const form = document.getElementById('bookmark-form');
const siteNameInput = document.getElementById('site-name');
const siteUrlInput = document.getElementById('site-url');
const bookmarksList = document.getElementById('bookmarks-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = siteNameInput.value;
  const url = siteUrlInput.value;

  const bookmark = { name, url };

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  siteNameInput.value = '';
  siteUrlInput.value = '';

  displayBookmarks();
});

function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarksList.innerHTML = '';

  bookmarks.forEach((bookmark, index) => {
    const div = document.createElement('div');
    div.className = 'bookmark';
    div.innerHTML = `
      <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
      <button onclick="deleteBookmark(${index})">Delete</button>
    `;
    bookmarksList.appendChild(div);
  });
}

function deleteBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}

displayBookmarks(); // Initial call
