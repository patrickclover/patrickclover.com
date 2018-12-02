import './velocity.jq';
import './velocity';

const loaded = () => {

	const $ = window.jQuery;
	const action = $('.hamburger');

	action.click(function () {
		action.css('pointer-events', 'none');
		const overlay_navigation = $('.overlay-navigation');
		overlay_navigation.toggleClass('overlay-active');
		if (overlay_navigation.hasClass('overlay-active')) {

			action.addClass('is-active');
			overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down');
			overlay_navigation.velocity('transition.slideLeftIn', {
				duration: 300,
				delay: 0,
				begin() {
					$('nav ul li').velocity('transition.perspectiveLeftIn', {
						stagger: 150,
						delay: 0,
						complete() {
							$('nav ul li a').velocity({
								opacity: [1, 0],
							}, {
								delay: 10,
								duration: 140
							});
							action.css('pointer-events', 'auto');
						}
					});
				}
			});

		} else {
			action.css('pointer-events', 'none');
			action.removeClass('is-active');

			overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up');
			$('nav ul li').velocity('transition.perspectiveRightOut', {
				stagger: 150,
				delay: 0,
				complete: function () {
					overlay_navigation.velocity('transition.fadeOut', {
						delay: 0,
						duration: 150,
						complete: function () {
							$('nav ul li a').velocity({
								opacity: [0, 1],
							}, {
								delay: 0,
								duration: 50
							});
							action.css('pointer-events', 'auto');
						}
					});
				}
			});
		}
	});

};

export default loaded;

