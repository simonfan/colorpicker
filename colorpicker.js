define(['jquery','buildable','backbone','underscore','_interface'], 
function(   $   , Buildable , Backbone , undef      , undef      ) {

	// default show and hide methods for the color picker.
	// these functions are called in the context of the Colorpicker object.
	function dfShow($items, defer) {
		var fulltime = $items.length * 40;

		_.each($items, function(item, index) {

			setTimeout(function() {
				$(item).animate({ opacity: 1 }, 450);
			}, index * 40);
		});

		setTimeout(function() {
			defer.resolve();
		}, fulltime);
	}

	function dfHide($items, defer) {
		var fulltime = $items.length * 40;

		_.each($items, function(item, index) {

			setTimeout(function() {
				$(item).animate({ opacity: 0 }, 450);
			}, (index * 40));
		});

		setTimeout(function() {
			defer.resolve();
		}, fulltime);
	}

	var Colorpicker = Object.create(Buildable);
	Colorpicker.extend(Backbone.Events, {
		init: function(data) {
			_.interface({
				id: 'Colorpicker',
				obj: data,
				typeofs: {
					$items: 'object',
					colorAttr: ['string', 'undefined'],
					method: ['string', 'undefined'],
					show: ['function', 'undefined'],
					hide: ['function', 'undefined'],
				}
			});

			_.bindAll(this);

			// options
			this.$items = data.$items;
			this.colorAttr = data.colorAttr || 'data-color';
			this.method = data.method || 'click';

			// status
			this.selected = '';

			// showing and hiding methods
			this._show = data.show || dfShow;
			this._hide = data.hide || dfHide;

			this._build();

			// set!
			this.trigger('ready', this);

			// show!
			this.show();
		},

		_build: function() {
			this._setColors();

			this.$items
				.hover(this._hoverOn, this._hoverOff)
				.click(this._click);
		},

		_setColors: function() {
			var _this = this;

			_.each(this.$items, function(item, index) {
				var $item = $(item);

				$item.css({ backgroundColor: _this._getcolor($item) });
			});
		},

		_hoverOn: function(e) {
			var $target = $(e.target),
				color = this._getcolor($target);

			this.trigger('hover', color, $target);

			if (this.method === 'hover') {
				this.select(color);
			}
		},

		_hoverOff: function(e) {
			var $target = $(e.target),
				color = this._getcolor($target);

			this.trigger('leave', color, $target);

			if (this.method === 'hover') {
				this.select('');
			}
		},

		_click: function(e) {
			var $target = $(e.target),
				color = this._getcolor($target);

			this.trigger('click', color, $target);

			if (this.method === 'click') {
				this.select(color);
			}
		},

		_getcolor: function($el) {
			return $el.prop(this.colorAttr) || $el.attr(this.colorAttr);
		},

		///////////////
		////// API ////
		///////////////
		select: function(color) {
			if (this.selected !== color) {
				this.selected = color;

				this.trigger('change', color);
			}
		},

		show: function() {
			this.trigger('show-ini');

			var _this = this,
				defer = $.Deferred();

			this._show(this.$items, defer);

			$.when(defer).then(function() {
				_this.trigger('show-end');
			});

			return defer;
		},

		hide: function() {
			this.trigger('hide-ini');

			var _this = this,
				defer = $.Deferred();

			this._hide(this.$items, defer);

			$.when(defer).then(function() {
				_this.trigger('hide-end');
			});

			return defer;
		},
	});


	return Colorpicker;

});