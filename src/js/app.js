/**
 * Main application namespace
 * @namespace app
 */
var app = window.app || {};


/**
 * Player controller
 * @memberof app
 */
app.player = function () {
	var $elements = $('[data-panel]'),
		panel = {},
		i;

	function printPoints (points) {
		var $this = $(this);
		$this.find('.sb-panel-digit').html(('0' + points).slice(-2));
	}

	function togglePoints (action) {
		var $this = $(this),
			points = panel[$this.attr('data-panel')].counter[(action) ? 'next' : 'prev']();

		printPoints.call($this, points);
	}

	function resetPoints () {
		var $this = $(this),
			points = panel[$this.attr('data-panel')].counter.first();

		printPoints.call($this, points);
	}

	$elements.each(function (index, element) {
		var $element = $(element);

		panel[$element.attr('data-panel')] = {
			counter: new Pager(100, false)
		};

		var h = new Hammer(element);
		h.on('swipeleft', function () {
			$element.find('.sb-button-less').trigger('click');
		});
		h.on('swiperight', function () {
			$element.find('.sb-button-more').trigger('click');
		});
	});

	$('.sb-button').on('click', function () {
		var $this = $(this),
			$parent = $this.parent();

		if ($parent.is('[data-panel^="set"]')) {
			$elements.filter('[data-panel^="points"]').each(function (index, element) {
				var $element = $(element);
				panel[$element.attr('data-panel')].counter.first();
				resetPoints.call($element);
			});
		}
		togglePoints.call($parent, $this.hasClass('sb-button-more'));
	});

	$('.sb-title').on('click', function () {
		var i = $('body')[0];
		if (i.requestFullscreen) {
			i.requestFullscreen();
		} else if (i.webkitRequestFullscreen) {
			i.webkitRequestFullscreen();
		} else if (i.mozRequestFullScreen) {
			i.mozRequestFullScreen();
		} else if (i.msRequestFullscreen) {
			i.msRequestFullscreen();
		}
	});

	if ('ontouchstart' in window) {
		$('html').addClass('is-touch');
	}
};


/**
 * Main init method
 * @memberof app
 */
app.init = function () {
	app.player();

};


/**
 * Initializes the application
 */
app.init();
