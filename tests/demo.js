define(['jquery','colorpicker'],
function(  $    , Colorpicker ) {


	window.cpicker = Colorpicker.build({
		$items: $('#color-picker td'),
		colorAttr: 'data-value',
	});

	cpicker.on('change', function(color) {
		console.log(color);
	});

	cpicker.on('hover', function(color, $target) {
		$target.css({ opacity: 0.8 });
	});

	cpicker.on('leave', function(color, $target) {
		$target.css({ opacity: 1 });
	});



	window.listcpicker = Colorpicker.build({
		$items: $('#colorlist li')
	});

	listcpicker.on('change', function(color) {
		console.log('list picker color: ' + color)
	})

});