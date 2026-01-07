const API_LOGIN = "http://localhost:3000/api/user/login";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // ⛔ cegah reload

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(API_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // SIMPAN LOGIN
        localStorage.setItem("user", JSON.stringify(data.user));

        // setelah login sukses
        localStorage.setItem("login", "true");
        window.location.href = "index.html";

        // REDIRECT KE DASHBOARD
        window.location.href = "index.html";
      } else {
        document.getElementById("msg").innerText = data.message;
      }
    })
    .catch(err => {
      document.getElementById("msg").innerText = "Server error";
      console.error(err);
    });
});
