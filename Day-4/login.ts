const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const loginError = document.getElementById("loginError") as HTMLParagraphElement;

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "123";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    window.location.href = "homepage.html";
  } else {
    loginError.style.display = "block";
  }
});
