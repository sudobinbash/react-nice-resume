jQuery(document).ready(function($) {
  var time = 380;
  setTimeout(function() {
    $("h1.responsive-headline").fitText(1, { minFontSize: "40px", maxFontSize: "90px" });

    $(".smoothscroll").on("click", function(e) {
      e.preventDefault();
      var target = this.hash,
        $target = $(target);

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top
          },
          800,
          "swing",
          function() {
            window.location.hash = target;
          }
        );
    });

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({
      handler: function(event, direction) {
        var active_section;

        active_section = $(this);
        if (direction === "up") active_section = active_section.prev();

        var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },
      offset: "35%"
    });

    $("header").css({ height: $(window).height() });
    $(window).on("resize", function() {
      $("header").css({ height: $(window).height() });
      $("body").css({ width: $(window).width() });
    });

    $(window).on("scroll", function() {
      var h = $("header").height();
      var y = $(window).scrollTop();
      var nav = $("#nav-wrap");

      if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
        nav.fadeOut("fast");
      } else {
        if (y < h * 0.2) {
          nav.removeClass("opaque").fadeIn("fast");
        } else {
          nav.addClass("opaque").fadeIn("fast");
        }
      }
    });

    $(".flexslider").flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: "slide",
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false
    });

    $("form#contactForm button.submit").click(function() {
      $("#image-loader").fadeIn();

      var firstName = $("#contactForm #firstName").val();
      var lastName = $("#contactForm #lastName").val();
      var contactEmail = $("#contactForm #contactEmail").val();

      var data =
        "FNAME="+firstName
        +"&LNAME="+lastName
        +"&EMAIL="+contactEmail;

      $.ajax({
        type: "GET",
        url: "https://gmail.us6.list-manage.com/subscribe/post-json?u=243abcc9f089c1b7a8c4c4ac5&amp;id=16f84ad99c",
        data: data,
        dataType: 'jsonp',
        jsonp: 'c',
        success: function(msg) {
          // Message was sent
          debugger;
          if (msg.result == "success") {
            $("#image-loader").fadeOut();
            $("#message-warning").hide();
            $("#contactForm").fadeOut();
            $("#message-success").fadeIn();
          }
          // There was an error
          else {
            $("#image-loader").fadeOut();
            $("#message-warning").html(msg.msg);
            $("#message-warning").fadeIn();
          }
        }
      });
      return false;
    });
  }, time);
});
