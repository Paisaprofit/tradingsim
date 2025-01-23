function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts")) || [];
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const accounts = getAccounts();
  const account = accounts.find(acc => acc.username === username);

  if (!account || account.password !== password) {
    document.getElementById("loginMessage").textContent = "Error: Invalid username or password!";
    return;
  }

  localStorage.setItem("loggedInUser", username);
  window.location.href = "index.html";
}
