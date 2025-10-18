$(document).ready(function() {
  const usuarioDemo = { username: "admin", password: "1234" };

  $("#loginForm").on("submit", function(e) {
    e.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();

    if (username === usuarioDemo.username && password === usuarioDemo.password) {
      localStorage.setItem("usuarioLogeado", username);
      window.location.href = "dashboard.html";
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Usuario o contraseña incorrectos',
        confirmButtonColor: '#dc3545'
      });
    }
  });

  $("#logoutBtn").on("click", function() {
    localStorage.removeItem("usuarioLogeado");
    window.location.href = "index.html";
  });
});
