const form = document.getElementById('userForm');
const nameInput = document.getElementById('nameInput');
const userList = document.getElementById('userList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;

  await fetch('/add_user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  nameInput.value = '';
  fetchUsers();
});

async function fetchUsers() {
    const res = await fetch('/users');
    const users = await res.json();
    userList.innerHTML = '';
  
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${user.name} (ID: ${user.id})
        <button onclick="deleteUser(${user.id})" style="margin-left: 10px;">❌ Delete</button>
      `;
      userList.appendChild(li);
    });

}

fetchUsers();
async function deleteUser(userId) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    await fetch(`/users/${userId}`, {
      method: 'DELETE'
    });
  
    fetchUsers();
}
