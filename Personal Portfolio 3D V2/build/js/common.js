// svg icons support ie11
(function () {
    svg4everybody();
})();

// check if touch device
function isTouchDevice() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function mq(query) {
        return window.matchMedia(query).matches;
    };
    if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

if (isTouchDevice()) {
    $('body').addClass('touch-device');
}

// header
(function () {
    var header = $('.js-header'),
        burger = header.find('.js-header-burger'),
        wrapper = header.find('.js-header-wrapper'),
        html = $('html'),
        body = $('body');
    burger.on('click', function () {
        burger.toggleClass('active');
        wrapper.toggleClass('visible');
        html.toggleClass('no-scroll');
        body.toggleClass('no-scroll');
    });
})();

// carousel arrows
var navArrows = ['\n    <span><svg class="icon icon-arrow-prev">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use>\n    </svg></span>', '<span><svg class="icon icon-arrow-next">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use>\n    </svg></span>'];

// owl carousel
$(document).ready(function () {
    var slider = $('.js-slider-details');

    slider.owlCarousel({
        items: 3,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: false,
        loop: true,
        smartSpeed: 700,
        responsive: {
            320: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });

    // slider.on('changed.owl.carousel', function(event) {
    //     const items = slider.find('.owl-item');
    //     items.removeClass('left');
    //     items.eq(event.item.index).prevAll().addClass('left');

    // });

    // $(document).on('click', '.owl-item', function(){
    //     itemsIndex = $(this).index();
    //     slider.trigger('to.owl.carousel', itemsIndex);
    // });

    $('.js-slider-review').owlCarousel({
        items: 1,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: false,
        loop: true,
        smartSpeed: 700,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            320: {
                nav: false,
                dots: true
            },
            768: {
                nav: true,
                dots: false
            }
        }
    });

    $('.js-slider-cases').owlCarousel({
        items: 2,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: false,
        loop: true,
        smartSpeed: 700,
        responsive: {
            320: {
                nav: false,
                dots: true,
                items: 1
            },
            768: {
                nav: true,
                dots: false,
                items: 2
            }
        }
    });
});

// owl carousel
(function () {
    var slider = $('.js-owl');
    if (slider.length) {
        slider.each(function () {
            var _this = $(this),
                itemsMobileAlbum = _this.data('items-mobile-album'),
                itemsMobilePortrait = _this.data('items-mobile-portrait');
            console.log(itemsMobileAlbum);
            if (itemsMobileAlbum && itemsMobilePortrait) {
                owlMobileAlbum(_this, itemsMobileAlbum, itemsMobilePortrait);
                $(window).resize(function () {
                    owlMobileAlbum(_this, itemsMobileAlbum, itemsMobilePortrait);
                });
            }
            if (!itemsMobileAlbum && itemsMobilePortrait) {
                owlMobilePortrait(_this, itemsMobilePortrait);
                $(window).resize(function () {
                    owlMobilePortrait(_this, itemsMobilePortrait);
                });
            }
        });
    }

    // mobile album
    function owlMobileAlbum(obj, itemsMobileAlbum, itemsMobilePortrait) {
        var optionLoop = true;
        if (obj.is('[data-no-loop]')) {
            optionLoop = false;
        }
        var optionAutoHeight = false;
        if (obj.is('[data-autoheight]')) {
            optionAutoHeight = true;
        }
        var fullWidth = window.innerWidth;
        if (navigator.platform.indexOf('Win') > -1) {
            var mobilePoint = 766; // windows
        } else {
            var mobilePoint = 767; // mac os
        }
        // console.log(mobilePoint); 
        if (fullWidth <= mobilePoint) {
            if (!obj.hasClass('owl-carousel')) {
                obj.addClass('owl-carousel');
                obj.owlCarousel({
                    items: itemsMobileAlbum,
                    nav: false,
                    dots: true,
                    loop: optionLoop,
                    smartSpeed: 600,
                    autoHeight: optionAutoHeight,
                    responsive: {
                        0: {
                            items: itemsMobilePortrait
                        },
                        480: {
                            items: itemsMobileAlbum
                        }
                    }
                });
            }
        } else {
            obj.removeClass('owl-carousel');
            obj.trigger('destroy.owl.carousel');
        }
    }

    // mobile portrait
    function owlMobilePortrait(obj, itemsMobilePortrait) {
        var optionLoop = true;
        if (obj.is('[data-no-loop]')) {
            optionLoop = false;
        }
        var optionAutoHeight = false;
        if (obj.is('[data-autoheight]')) {
            optionAutoHeight = true;
        }
        var windowWidth = $(window).width();
        if (windowWidth <= 479) {
            if (!obj.hasClass('owl-carousel')) {
                obj.addClass('owl-carousel');
                obj.owlCarousel({
                    items: itemsMobilePortrait,
                    nav: false,
                    dots: true,
                    smartSpeed: 600,
                    loop: optionLoop,
                    autoHeight: optionAutoHeight
                });
            }
        } else {
            obj.removeClass('owl-carousel');
            obj.trigger('destroy.owl.carousel');
        }
    }
})();

// aos animation
AOS.init();

// parallax effect
(function () {
    var parallax = $('.js-parallax');
    if (parallax.length) {
        parallax.each(function () {
            var _this = $(this),
                scale = _this.data('scale'),
                orientation = _this.data('orientation');

            new simpleParallax(_this[0], {
                scale: scale,
                orientation: orientation,
                delay: .5,
                overflow: true,
                transition: 'cubic-bezier(0,0,0,1)'
            });
        });
    }
})();

// scroll to section
(function () {
    var btn = $('.js-scroll');
    btn.click(function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 1000
        });
        return false;
    });
})();

// set the starting position of the cursor outside of the screen
var clientX = -100;
var clientY = -100;
var innerCursor = document.querySelector(".cursor");

var initCursor = function initCursor() {
    // add listener to track the current mouse position
    document.addEventListener("mousemove", function (e) {
        clientX = e.clientX;
        clientY = e.clientY;
    });

    // transform the innerCursor to the current mouse position
    // use requestAnimationFrame() for smooth performance
    var render = function render() {
        innerCursor.style.transform = 'translate(' + clientX + 'px, ' + clientY + 'px)';
        // if you are already using TweenMax in your project, you might as well
        // use TweenMax.set() instead
        // TweenMax.set(innerCursor, {
        //   x: clientX,
        //   y: clientY
        // });

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

initCursor();