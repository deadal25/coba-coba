document.addEventListener("DOMContentLoaded", function () {
    const resetPasswordForm = document.getElementById("resetPasswordForm");

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const token = document.getElementById("token").value;
            const newPassword = document.getElementById("newPassword").value;
            let resetData = JSON.parse(localStorage.getItem("resetToken"));
            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (resetData && resetData.resetToken === token) {
                users[resetData.email].password = newPassword;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.removeItem("resetToken");

                document.getElementById("resetMessage").innerText = "Password berhasil diubah! Silakan login.";
                document.getElementById("resetMessage").style.color = "green";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                document.getElementById("resetMessage").innerText = "Token salah atau kadaluarsa!";
                document.getElementById("resetMessage").style.color = "red";
            }
        });
    }
});
