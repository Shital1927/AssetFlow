const API = '/api/items';

async function loadItems() {
  const res = await fetch(API);
  const items = await res.json();
  const list = document.getElementById('itemList');
  list.innerHTML = '';

  if (items.length === 0) {
    list.innerHTML = '<li class="empty" style="justify-content:center;">No items yet. Add one above.</li>';
    return;
  }

  items.forEach(item => {
    const li = document.createElement('li');
    li.dataset.id = item._id;
    li.innerHTML = `
      <span class="item-name">${escapeHtml(item.name)}<span class="item-status">${escapeHtml(item.status)}</span></span>
      <span class="actions">
        <button class="btn-secondary" onclick="startEdit('${item._id}', '${escapeAttr(item.name)}')">Edit</button>
        <button class="btn-danger" onclick="deleteItem('${item._id}')">Delete</button>
      </span>
    `;
    list.appendChild(li);
  });
}

async function createItem() {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();
  if (!name) return;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  input.value = '';
  loadItems();
}

function startEdit(id, currentName) {
  const li = document.querySelector(`li[data-id="${id}"]`);
  li.innerHTML = `
    <input type="text" class="edit-input" id="edit-${id}" value="${currentName}" />
    <span class="actions">
      <button class="btn-primary" onclick="saveEdit('${id}')">Save</button>
      <button class="btn-secondary" onclick="loadItems()">Cancel</button>
    </span>
  `;
}

async function saveEdit(id) {
  const newName = document.getElementById(`edit-${id}`).value.trim();
  if (!newName) return;

  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName }),
  });

  loadItems();
}

async function deleteItem(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadItems();
}

// Basic escaping to avoid breaking HTML when rendering item names
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Allow pressing Enter to add an item
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('nameInput');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') createItem();
    });
  }
});

loadItems();
