// Retrieve all accounts from localStorage
function getAccounts() {
    return JSON.parse(localStorage.getItem("accounts")) || [];
  }
  
  // Retrieve the currently logged-in user
  function getLoggedInUser() {
    const username = localStorage.getItem("loggedInUser");
    return getAccounts().find(account => account.username === username);
  }
  
  // Logout the user and redirect to the login page
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  }
  
  // Format the date as DD/MM/YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  // Populate the dashboard with account details
  function populateDashboard() {
    const user = getLoggedInUser();
  
    // If no user is logged in, redirect to the login page
    if (!user) {
      logout();
      return;
    }
  
    // Dynamically populate account details in the table
    const table = document.getElementById("accountDetails");
    table.innerHTML = `
      <tr><th>Field</th><th>Value</th></tr>
      <tr><td>Full Name</td><td>${user.fullName}</td></tr>
      <tr><td>Username</td><td>${user.username}</td></tr>
      <tr><td>Password</td><td>${"*".repeat(user.password.length)}</td></tr>
      <tr><td>Date of Birth</td><td>${formatDate(user.dateOfBirth)}</td></tr>
      <tr><td>Gender</td><td>${user.gender}</td></tr>
      <tr><td>Phone Number</td><td>${user.phoneNumber}</td></tr>
      <tr><td>Email Address</td><td>${user.emailAddress}</td></tr>
      <tr><td>Wallet</td><td>₹${user.wallet.toFixed(2)}</td></tr>
      <tr><td>Portfolio</td><td>${
        user.portfolio.length > 0
          ? JSON.stringify(user.portfolio)
          : "You don't have any share"
      }</td></tr>
    `;
  }
  
  // Run the populateDashboard function once the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", populateDashboard);
  