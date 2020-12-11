(function ($) {
    "use strict";

    $(window).on('load', function () {
        $('.preloader').fadeOut();
        $('#preloader').delay(550).fadeOut('slow');
        $('body').delay(450).css({'overflow': 'visible'});
    });

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('.top-header').addClass('fixed-menu');
        } else {
            $('.top-header').removeClass('fixed-menu');
        }
    });

    var $slides = $('#slides');
    if ($slides && $slides.length) {
        $('#slides').superslides({
            inherit_width_from: '.cover-slides',
            inherit_height_from: '.cover-slides',
            play: 5000,
            animation: 'fade',
        });

        $(".cover-slides ul li").append("<div class='overlay-background'></div>");
    }

    var navItems = [
        ["index.html", "Home"],
        ["menu.html", "Menu"],
        ["about.html", "About Us"],
        ["gallery.html", "Gallery"],
        ["contact.html", 'Contact']
    ];

    
    navLinks();

    function navLinks() {
        let mainMenu = document.querySelectorAll(".navbar-nav")[0];

        for (var i = 0; i < navItems.length; i++) {
            var li = document.createElement("li");
            li.classList.add('nav-item');
            var a = document.createElement('a');
            a.setAttribute('href', navItems[i][0]);
            a.classList.add('nav-link');
            a.textContent = navItems[i][1];

            if (document.body.getAttribute('data-page') === navItems[i][1].toLowerCase()) {
                li.classList.add('active');
            }

            li.appendChild(a);

            mainMenu.appendChild(li);
        }
    }

    //ABOUT
    
    if(window.location.href.indexOf("index.html") != -1 || window.location.href.indexOf("about.html") != -1){
        $('#about-animation').children().first().css("left","-150px");
        $('#about-animation').children().last().css("right","-150px");
        aboutScroll();
        $(document).scroll(aboutScroll);
        function aboutScroll(){
            if($(document).scrollTop() > $('#about-animation').offset().top - 600 && $(document).scrollTop() < $('#about-animation').offset().top + $('#about-animation').height()) {
                $('#about-animation').stop().animate({"opacity":"1"});
                $('#about-animation').children().first().stop().animate({"left":"0px"});
                $('#about-animation').children().last().stop().animate({"right":"0px"});
            }
            else {
                $('#about-animation').stop().animate({"opacity":"0"});
                $('#about-animation').children().first().stop().animate({"left":"-150px"});
                $('#about-animation').children().last().stop().animate({"right":"-150px"});
            }
        }
    }
    
    //STAFF
    var staff = [
        {
            img: 'images/stuff-img-01.jpg',
            name: 'William Nelson',
            position: 'CHEF DE CUISINE',
            socials: {
                facebook: 'https://www.facebook.com',
                google: 'https://www.google.com',
                twitter: 'https://www.twitter.com'
            }
        },
		{
			img: 'images/stuff-img-02.jpg',
			name: 'Kristian Justice',
			position: 'SOUS CHEF',
			socials: {
				facebook: 'https://www.facebook.com',
				google: 'https://www.google.com',
				twitter: 'https://www.twitter.com'
			}
		},
		{
			img: 'images/stuff-img-03.jpg',
			name: 'Steve Thomson',
			position: 'COMMIS CHEF',
			socials: {
				facebook: 'https://www.facebook.com',
				google: 'https://www.google.com',
				twitter: 'https://www.twitter.com'
			}
		}
    ]

    printOutStaff();

    function printOutStaff() {
        var staffWrapper = document.querySelector('.staff-wrapper');

        if (staffWrapper) {
            staff.forEach(function (item) {
                var staffItem = `<div class="col-md-4 col-sm-6">
									<div class="our-team">
										<img src="${item.img}" alt="${item.name}">
									<div class="team-content">
									<h3 class="title">${item.name}</h3>
									<span class="post">${item.position}</span>
									<ul class="social">
										<li><a href="${item.socials.facebook}"><i class="fa fa-facebook-f"></i></a></li>
										<li><a href="${item.socials.twitter}"><i class="fa fa-twitter"></i></a></li>
										<li><a href="${item.socials.google}"><i class="fa fa-google-plus"></i></a></li>
									</ul>
								</div>
							</div>
						</div>`

                staffWrapper.innerHTML += staffItem;
            })
        }
    }

    //	Contact form
    var $contactForm = $('#contactForm');
    
    if ($contactForm) {
        $('#message').keyup(function(){
            if($('#message').val() == ''){
                $('#message-count').stop().fadeOut();
            }
            else {
                if($('#message').val().length>100){
                    $('#message').val($('#message').val().substring(0,100));
                }
                $('#message-count').stop().fadeIn().text(String(100 - $('#message').val().length));
            }
        });
        function showError(element, attribute) {
            element.addClass('is-invalid');
            element.next().text(element.attr(attribute));
        }

        function removeError(element) {
            element.removeClass('is-invalid');
            element.next().text('');
        }

        function regexValidator(item, regex) {
            if (!regex.test($(item).val())) {
                showError($(item), 'data-error-regex');
            } else {
                removeError($(item));
            }
        }

        var $name = $contactForm.find('#name');
        var $email = $contactForm.find('#email');
        var $guest = $contactForm.find('#guest');
        var $message = $contactForm.find('#message');
        var formFields = [$name, $email, $guest, $message];

        formFields.forEach(function (item) {
            $(item).on('blur change', function () {
                if ($(item).attr('required') && $(item).val() === '') {
                    showError($(item), 'data-error');
                    return;
                } else {
                    removeError($(item));
                }

                if ($(item).attr('data-error-regex')) {
                    if ($(item).attr('name') === 'email') {
                        var EMAIL_REGEX = /^\w([\.-]?\w+\d*)*@\w+\.\w{2,4}$/;
                        regexValidator(item, EMAIL_REGEX);
                    }

                    if ($(item).attr('name') === 'name') {
                        var NAME_REGEX = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,15}(\s[A-ZŠĐŽČĆ][a-zšđžčć]{2,15})*$/;
                        regexValidator(item, NAME_REGEX);
                    }

                    if ($(item).attr('name') === 'message') {
                        var MESSAGE_REGEX = /^[\w\s\.\?!-\d]{1,100}$/m;
                        regexValidator(item, MESSAGE_REGEX);
                    }
                }
            })
        });

        $contactForm.on('submit', function (event) {
            event.preventDefault();
            var valid = true;
            $contactForm.find('.with-errors').each(function (index, item) {
                if ($(item).text() !== '') {
                    valid = false;
                }
            })

            var $msgSubmit = $('#msgSubmit');
            if (valid) {
                $msgSubmit.text('Your form has been submitted. We\'ll contact you soon.');

                formFields.forEach(function (item) {
                    removeError($(item));
                    $(item).val('');
                });
            } else {
                $msgSubmit.text('Please check your form once again and submit.');
            }
            $msgSubmit.removeClass('hidden');
        })
    }


    //	Dinamicko ispisivanje galerije
    var $gallery = $('.tz-gallery');
    if ($gallery) {
        var $row = $gallery.find('.row');

        var slike = [
            {
                path: 'images/gallery-img-01.jpg',
                name: 'Gallery Images Shells'
            },
            {
                path: 'images/gallery-img-02.jpg',
                name: 'Gallery Images Seafood'
            },
            {
                path: 'images/gallery-img-03.jpg',
                name: 'Gallery Images Vegetables'
            },
            {
                path: 'images/gallery-img-04.jpg',
                name: 'Gallery Images Rice'
            },

            {
                path: 'images/gallery-img-05.jpg',
                name: 'Gallery Images Beans'
            },
            {
                path: 'images/gallery-img-06.jpg',
                name: 'Gallery Images Dessert'
            },
            {
                path: 'images/img-01.jpg',
                name: 'Scotch whisky'
            },
            {
                path: 'images/img-04.jpg',
                name: 'Hamburger'
            },
            {
                path: 'images/img-06.jpg',
                name: 'Gallery Images Drinks'
            },
            {
                path: 'images/img-05.jpg',
                name: 'Gallery Images Drinks'
            },
            {
                path: 'images/img-03.jpg',
                name: 'Gallery Images Drinks'
            },
            {
                path: 'images/img-09.jpg',
                name: 'Gallery Images Drinks'
            },
        ]

        var $loadMoreBtn = $('[data-load-more]');
        var showMore = true;

        $loadMoreBtn.on('click', function (){
            if (showMore) {
                appendGallery(6, 12);
                $loadMoreBtn.text('Show less');
                showMore = !showMore;
                return;
            }
            appendGallery(0, 6, true);
            $loadMoreBtn.text('Show more');
            showMore = !showMore;
        })

        function appendGalleryImage(item) {
            $row.append(`<div class="col-sm-6 col-md-4 col-lg-4">
				<a class="lightbox" href="${item.path}">
					<img class="img-fluid" src="${item.path}" alt="${item.name}">
				</a>
			</div>`);
        }

        function appendGallery(offset, limit, clear) {
            if (clear) {
                $row.html('');
            }
            for(var i = offset; i < limit; i++) {
                appendGalleryImage(slike[i]);
            }

            if (window.baguetteBox) {
                window.baguetteBox.run('.tz-gallery', {
                    animation: 'fadeIn',
                    noScrollbars: true
                });
            }
        }

        appendGallery(0, 6);
    }

    //    contact-guest-select
    var contactGuestSelect = $('.contact-guest-select');
    if (contactGuestSelect) {
        var valuesList = [{
            value: '',
            label: 'Please Select Person'
        }, {
            value: 1,label: 1
        }, {
            value: 2, label: 2
        }, {
            value: 3,label: 3
        }, {
            value: 4,label: 4
        }, {
            value: 5,label: 5
        },];
        valuesList.forEach(function (item, index) {
            var optionItem = document.createElement('option');
            if (!index) {
                optionItem.setAttribute('selected', 'selected');
            }
            optionItem.value = item.value;
            optionItem.textContent = item.label;
            contactGuestSelect.append(optionItem);
        })

    }

//	dinamicko generisanje slika na menu strani
    var $menuImageList = $('.menu-image-list');
    if ($menuImageList) {
        var menuSlike = [
            {
                path: 'images/img-01.jpg',
                name: 'Lagavulin',
                label: 'Scotch whisky',
                price: '$7.79',
                type: 'drinks'
            },

            {
                path: 'images/img-02.jpg',
                name: 'Strawberry Smoothie',
                label: 'Smoothie',
                price: '$9.79',
                type: 'drinks'
            },
            {
                path: 'images/img-03.jpg',
                name: 'Blanc de Blancs',
                label: 'Champagne',
                price: '$10.79',
                type: 'drinks'
            },
            {
                path: 'images/img-04.jpg',
                name: 'Beef Burger',
                label: 'Hamburger',
                price: '15.79',
                type: 'lunch'
            },
            {
                path: 'images/img-05.jpg',
                name: 'Shrimp Salad with Green Curry',
                label: 'Seafood',
                price: '18.79',
                type: 'lunch'
            },
            {
                path: 'images/img-06.jpg',
                name: 'Chicken In Lemon Butter Saucen',
                label: 'Chicke',
                price: '20.79',
                type: 'lunch'
            },
            {
                path: 'images/img-07.jpg',
                name: 'Chocolate Peanut Butter Cake',
                label: 'Cakes',
                price: '25.79',
                type: 'dinner'
            },
            {
                path: 'images/img-08.jpg',
                name: 'Sushi Salad',
                label: 'Sushi',
                price: '22.79',
                type: 'dinner'
            },
            {
                path: 'images/img-09.jpg',
                name: 'Chicken Fajitas',
                label: 'Mexican food',
                price: '24.79',
                type: 'dinner'
            }
        ]

        menuSlike.forEach(function (item) {
            $menuImageList.append(`
			<div class="col-lg-4 col-md-6 special-grid ${item.type}">
				<div class="gallery-single fix">
					<img src="${item.path}" class="img-fluid" alt="${item.name}">
					<div class="why-text">
						<h4>${item.label}</h4>
						<p>${item.name}</p>
						<h5>${item.price}</h5>
					</div>
				</div>
			</div>`)
        });

        var $dataFilters = $('[data-filter]');
        if ($dataFilters) {
            $dataFilters.on('click', function (event) {
                var $current = $(event.currentTarget);
                var filter = $(event.currentTarget).attr('data-filter');
                $dataFilters.removeClass('active');
                $current.addClass('active');

                $menuImageList.find('.special-grid').each(function (index, item) {
                    if (!$(item).hasClass(filter) && filter !== '*') {
                        $(item).fadeOut();
                    } else {
                        $(item).fadeIn();
                    }
                })
            })
        }
    }


}(jQuery));
