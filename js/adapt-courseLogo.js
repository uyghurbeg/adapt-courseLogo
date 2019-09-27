define([
    'core/js/adapt',
    './LogoView'
],function(Adapt, LogoView) {

    var CourseLogo = Backbone.Controller.extend({
      initialize: function() {
        this.listenTo(Adapt, "adapt:initialize", this.onDataReady);
      },

      onDataReady: function() {
        if (this.logoView) this.logoView.remove();

        var config = Adapt.course.get("_logo");
        if (!config || !config._isEnabled) return;

        this.logoView = new LogoView({
          model: new Backbone.Model(config)
        });

        var selector = ".navigation";
        var navigationHeigth = $(selector).css("height");
        var navigationWidth = $(selector).css("width");
        navigationHeigth = navigationHeigth.slice(0, -2);
        navigationWidth = navigationWidth.slice(0, -2);
        var logoHeight = config._graphic["height"];
        var logoWidth = config._graphic["width"];
        var windowWidth = $(window).width();
        var positionTop = (navigationHeigth - logoHeight) / 2;
        var positionLeftPercentage = (logoWidth / windowWidth) * 50;
        var positionLeft = 50 - positionLeftPercentage;
        this.logoView.$el.css({
          position: "fixed",
          textAlign: "center",
          width: logoWidth,
          height: logoHeight,
          top: positionTop,
          left: positionLeft + "%",
          margin: "0 10px",
          zIndex: 1001
        });

        this.logoView.$el.insertAfter($(selector));
      }
    });

    return new CourseLogo();

});
