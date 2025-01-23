function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts")) || [];
}

function saveAccounts(accounts) {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function register() {
  const fullName = document.getElementById("fullName").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const dateOfBirth = document.getElementById("dateOfBirth").value;
  const gender = document.getElementById("gender").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const emailAddress = document.getElementById("emailAddress").value;

  const accounts = getAccounts();

  if (accounts.some(account => account.username === username)) {
    document.getElementById("registerMessage").textContent = "Error: Username already exists!";
    return;
  }

  const newAccount = {
    fullName,
    username,
    password,
    dateOfBirth,
    gender,
    phoneNumber,
    emailAddress,
    wallet: 0,
    portfolio: []
  };

  accounts.push(newAccount);
  saveAccounts(accounts);

  document.getElementById("registerMessage").textContent = "Account created successfully!";
  window.location.href = "login.html";
}
