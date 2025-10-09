var AMPSwitch = function () {
  var _ampSwitchButton;
  var _tooltip;
  var _switchDebounceTimeout;
  var _tooltipKey = 'suppress-tooltip';

  var _toggleAmpSwitch = function () {
    _ampSwitchButton.classList.add('collapsed');
    if (_tooltip) _tooltip.classList.add('collapsed');

    if (_switchDebounceTimeout) {
      clearTimeout(_switchDebounceTimeout);
    }

    _switchDebounceTimeout = setTimeout(function () {
      _ampSwitchButton.classList.remove('collapsed');
      if (_tooltip) _tooltip.classList.remove('collapsed');
    }, 500);
  }
  
  var _removeTooltip = function () {
    _tooltip.parentNode.removeChild(_tooltip);
    _tooltip = null;
  }

  var _initTooltip = function () {
    _tooltip = document.getElementById('calacademy-amp-switch-tooltip');
    if (!_tooltip) return;

    if (localStorage.getItem(_tooltipKey)) {
      _removeTooltip();
      return;
    }

    // close button
    var closeBtn = _tooltip.getElementsByTagName('button');
    
    if (closeBtn.length == 1) {
      
      closeBtn[0].addEventListener('click', function () {
        // suppress tooltip
        localStorage.setItem(_tooltipKey, true);
        _removeTooltip();
      });
    
    }

    // show
    _tooltip.classList.add('hydrated');
  }

  this.initialize = function () {
    _ampSwitchButton = document.getElementById('calacademy-amp-switch');
    
    if (!_ampSwitchButton) return;
    if (_ampSwitchButton.classList.contains('hydrated')) return;

    _initTooltip();
    
    _ampSwitchButton.classList.add('hydrated');
    window.addEventListener('scroll', _toggleAmpSwitch);
  }

  this.initialize();
}
;
var CalAcademyAMPSwitch = function (endpointUrl) {
	var $ = jQuery;

	var _insertUI = function (href) {
		// fallback
		if (typeof(href) != 'string') {
			href = $('link[rel="amphtml"]').attr('href');
		}

		$('html').addClass('calacademy-amp-ready');
		
		var ui = $('<div id="calacademy-amp-switch"><a href="' + href + '">View simplified version</a></div>');
		ui.insertBefore('footer');

		if (typeof(AMPSwitch) == 'function') {
			var myAmpSwitch = new AMPSwitch();	
		}
	}

	var _onData = function (data) {		
		if (!$.isArray(data.ampUrls)) {
			_onError();
			return;
		}

		var href = null;
		var obj = data.ampUrls[0];
		
		if (obj.ampUrl) href = obj.ampUrl;
		if (obj.cdnAmpUrl) href = obj.cdnAmpUrl;

		_insertUI(href);
	}

	var _onError = function () {
		_insertUI(null);
	}

	this.initialize = function () {
		if ($('link[rel="amphtml"]').length == 1) {
			var url = window.location.href.replace('www-local', 'www');

			var endpoint = endpointUrl;
			endpoint += '?url=' + encodeURIComponent(url);

			$.getJSON(endpoint, _onData).fail(_onError);
		}
	}

	this.initialize();
}
;
