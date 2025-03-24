document.addEventListener("DOMContentLoaded", function () {
    // Redirect ke login jika belum login
    if (!localStorage.getItem("loggedInUser") && 
        !window.location.pathname.includes("index.html") && 
        !window.location.pathname.includes("register.html")) {
        window.location.href = "login.html";
    }

    // Registrasi - Simpan akun ke localStorage
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("registerPwd").value;
            
            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[email]) {
                document.getElementById("registerMessage").innerText = "Email sudah terdaftar! Silakan login.";
                document.getElementById("registerMessage").style.color = "red";
            } else {
                users[email] = { fullName, password };
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem(`data_${email}`, JSON.stringify({})); // Simpan data kosong untuk pengguna
                
                document.getElementById("registerMessage").innerText = "Registrasi berhasil! Silakan login.";
                document.getElementById("registerMessage").style.color = "green";
            }
        });
    }

    // Login - Periksa akun di localStorage
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const username = document.getElementById("userName").value;
            const password = document.getElementById("pwd").value;
            
            let users = JSON.parse(localStorage.getItem("users")) || {};
            
            if (users[username] && users[username].password === password) {
                localStorage.setItem("loggedInUser", username);
                window.location.href = "login.html";
            } else {
                document.getElementById("message").innerText = "Username atau password salah!";
                document.getElementById("message").style.color = "red";
            }
        });
    }

    // Logout - Hapus session dan kembali ke login
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }

    // Fungsi untuk mendapatkan data pengguna saat ini
    function getUserData() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            return JSON.parse(localStorage.getItem(`data_${loggedInUser}`)) || {};
        }
        return null;
    }

    // Fungsi untuk menyimpan data hanya untuk pengguna yang sedang login
    function saveUserData(data) {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            localStorage.setItem(`data_${loggedInUser}`, JSON.stringify(data));
        }
    }

    // Contoh penggunaan
    if (localStorage.getItem("loggedInUser")) {
        let userData = getUserData();
        console.log("Data pengguna:", userData);

        // Simpan data baru
        userData.lastLogin = new Date().toISOString();
        saveUserData(userData);
    }
});
