document.addEventListener("DOMContentLoaded", function () {
    // Pastikan pengguna sudah login
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    // Ambil data pengguna dari localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};
    let userData = users[loggedInUser] || {};

    // Menampilkan data di halaman
    document.getElementById("userEmail").innerText = loggedInUser;
    document.getElementById("userFullName").innerText = userData.fullName || "Tidak Diketahui";
    
    // Untuk mengganti password
    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const newPassword = document.getElementById("newPassword").value;

            if (newPassword.trim().length < 6) {
                document.getElementById("passwordMessage").innerText = "Password harus minimal 6 karakter!";
                document.getElementById("passwordMessage").style.color = "red";
                return;
            }

            users[loggedInUser].password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));

            document.getElementById("passwordMessage").innerText = "Password berhasil diperbarui!";
            document.getElementById("passwordMessage").style.color = "green";
        });
    }
});
