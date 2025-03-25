document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const newPassword = document.getElementById("newPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[email]) {
                // Simpan password baru ke localStorage
                users[email].password = newPassword;
                localStorage.setItem("users", JSON.stringify(users));

                document.getElementById("message").innerText = "Password berhasil diubah! Silakan login.";
                document.getElementById("message").style.color = "green";

                setTimeout(() => {
                    window.location.href = "index.html"; // Redirect ke login setelah 2 detik
                }, 5000);
            } else {
                document.getElementById("message").innerText = "Email tidak ditemukan! Silakan coba lagi.";
                document.getElementById("message").style.color = "red";
            }
        });
    }
});
