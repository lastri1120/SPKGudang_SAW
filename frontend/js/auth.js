const API_AUTH = "http://localhost:3000/api/auth";

/* ======================
   LOGIN
====================== */
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error");

  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // ✅ SIMPAN LOGIN
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ PINDAH HALAMAN (INI YANG KAMU BUTUH)
      window.location.href = "index.html";
    } else {
      errorEl.textContent = data.message;
    }
  })
  .catch(err => {
    errorEl.textContent = "Server error";
    console.error(err);
  });
}

/* ======================
   CEK LOGIN (PROTEKSI)
====================== */
function cekLogin() {
  const isLogin = localStorage.getItem("login");

  if (!isLogin) {
    window.location.href = "login.html";
  }
}

/* ======================
   LOGOUT
====================== */
function logout() {
  localStorage.removeItem("login");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

