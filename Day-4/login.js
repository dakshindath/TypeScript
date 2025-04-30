var loginForm = document.getElementById("loginForm");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var loginError = document.getElementById("loginError");
var VALID_USERNAME = "admin";
var VALID_PASSWORD = "123";
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var username = usernameInput.value.trim();
    var password = passwordInput.value.trim();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        window.location.href = "homepage.html";
    }
    else {
        loginError.style.display = "block";
    }
});
