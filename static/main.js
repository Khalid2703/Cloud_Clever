document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user-form");
    const nameInput = document.getElementById("name");
    const userList = document.getElementById("user-list");
  
    async function loadUsers() {
      const res = await fetch("/users");
      const users = await res.json();
      userList.innerHTML = "";
      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} (ID: ${user.id})`;
        userList.appendChild(li);
      });
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = nameInput.value;
      await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      nameInput.value = "";
      loadUsers();
    });
  
    loadUsers();
  });
  