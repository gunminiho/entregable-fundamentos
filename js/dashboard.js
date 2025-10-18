$(document).ready(function() {
    
  $("#sidebarToggle").click(function() {
    $("#sidebar").toggleClass("show");
    $(".sidebar-overlay").toggleClass("show");
  });

  $(document).on("click", ".sidebar-overlay.show", function() {
    $("#sidebar").removeClass("show");
    $(this).removeClass("show");
  });

  $(".menu-link").click(function(e) {
    e.preventDefault();
    $(".menu-link").removeClass("active");
    $(this).addClass("active");

    $(".section").addClass("d-none");
    $("#section-" + $(this).data("section")).removeClass("d-none");

    if (window.innerWidth < 768) {
      $("#sidebar").removeClass("show");
      $(".sidebar-overlay").removeClass("show");
    }
  });

  function actualizarHora() {
    const now = new Date();
    $("#horaActual").text(
      now.toLocaleTimeString("es-PE", { hour12: false })
    );
  }

  setInterval(actualizarHora, 1000);
  actualizarHora();
});
