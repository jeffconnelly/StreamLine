/*
 * Author: Instapage.com
 * Credits: Carl Hartl https://github.com/carhartl/jquery-cookie/blob/master/jquery.cookie.js
 * License: MIT
 * Version: 1.1
 */

function InstapageExternalConversion( page, variation )
{
	var c;

	var Cookie = function()
	{
		var pluses = /\+/g;

		this.decode = function(s)
		{
			try
			{
				// If we can't decode the cookie, ignore it, it's unusable.
				return decodeURIComponent(s.replace(pluses, ' '));
			}
			catch(e)
			{
			}
		};

		this.decodeAndParse = function(s)
		{
			if (s.indexOf('"') === 0)
			{
				// This is a quoted cookie as according to RFC2068, unescape...
				s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			}

			s = this.decode(s);

			return s;
		};

		this.get = function cookie( key )
		{
			var result = false;
			var i;
			var parts;
			var name;
			var cookie;
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			var cookies = document.cookie ? document.cookie.split('; ') : [];

			for( i = 0, l = cookies.length; i < l; i++)
			{
				parts = cookies[i].split('=');
				name = this.decode(parts.shift());
				cookie = parts.join('=');

				if ( key && key === name )
				{
					result = this.decodeAndParse(cookie);
					break;
				}

				// Prevent storing a cookie that we couldn't decode.
				if (!key && (cookie = this.decodeAndParse(cookie)) !== undefined) {
					result[name] = cookie;
				}
			}

			return result;
		};

		this.set = function( key, value )
		{
			var d = new Date();
			var expires;

			d.setTime( d.getTime() + ( 7 * 24 * 60 * 60 * 1000) );
			expires = "expires=" + d.toUTCString();
			document.cookie = key + "=" + value + "; " + expires + "; path=/";
		};
	};

	var useCookie = function()
	{
		var page_from_cookie = c.get( 'instapage.conversion' + page );

		if( !page_from_cookie )
		{
			return;
		}
		else
		{
			data_from_cookie = JSON.parse( page_from_cookie );

			if( typeof data_from_cookie.external_image !== 'undefined' )
			{
				reportConversion( data_from_cookie.variation, data_from_cookie );
			}
		}
	};

	var reportConversion = function( variation, data )
	{
		var image = new Image();
		var image_src = ( data && data.external_image ) ? data.external_image : ( "//app.instapage.com/ajax/stats/conversion-pixel/"+ page + "/" + variation + "/transparent.png" );

		if( !variation )
		{
			variation = 'A';
		}

		function successSend()
		{
			window.InstapageLocalStorage.conversionDataSent( page, data, variation );
			c.set( 'instapage.conversion' + page, page );
		}

		image.onload = successSend;
		image.src = image_src;
	};

	var loadScript = function( script_src, callback)
	{
		var head = document.getElementsByTagName( 'head' )[ 0 ];
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = script_src;

		// most browsers
		script.onload = callback;

		// IE 6 & 7
		script.onreadystatechange = function()
		{
			if( this.readyState === 'complete' )
			{
				callback();
			}
		};
		head.appendChild( script );
	};

	// we have to know which page we convert
	if( !page )
	{
		return;
	}

	loadScript( '//instapage-scripts.s3.amazonaws.com/server-storage-local.js', function()
	{
		loadScript( '//instapage-scripts.s3.amazonaws.com/jstorage.js', function()
		{
			c = new Cookie();

			if( typeof ServerStorageLocal === 'function' )
			{
				window.InstapageLocalStorage = new ServerStorageLocal();

				window.InstapageLocalStorage.getConversionData( page, function( data )
				{
					if( !data )
					{
						useCookie();
					}
					else
					{
						if( data.timestamp_sent && data.timestamp_sent > Date.now() - ( 7 * 24 * 60 * 60 * 1000 ) )
						{
							return;
						}

						reportConversion( data.variation, data );
					}
				} );
			}
			else
			{
				useCookie();
			}

		} );
	} );

}
