var ServerStorageLocal = function( options )
{
	var _base = this;
	this.message = false;
	this.data = false;
	this.event = false;
	this.events = [];
	this.iframe = window.frames[ 'instapage-local-storage' ] ? window.frames[ 'instapage-local-storage' ] : false;
	this.options = options;
	this.local_data = {};

	function resiveMessage( event )
	{
		_base.events.push( event );
		_base.event = event;
		_base.message = event.data;

		try
		{
			_base.data = JSON.parse( event.data );

			if( _base.data.message === 'get' )
			{
				_base.local_data[ _base.data.key ] = _base.data.response;
			}
		}
		catch( e )
		{
		}
	}

	window.addEventListener("message", resiveMessage, false);
};

ServerStorageLocal.prototype.connect = function( data )
{
	if( !data )
	{
		return;
	}

	if( typeof ijQuery === "undefined" )
	{
		ijQuery = $;
	}

	if( this.iframe === window )
	// if( this.iframe )
	{
		if( data.request === 'get' )
		{
			return ijQuery.jStorage.get( data.key );
		}
		else if( data.request === 'set' )
		{
			return ijQuery.jStorage.set( data.key, data.val );
		}
	}
	else
	{
		data.good = true;

		this.iframe.postMessage( data, '*' );
		return false;
	}
};

ServerStorageLocal.prototype.get = function( key, dont_decode )
{
	if( typeof __page_type !== 'undefined' && __page_type === 2 && !dont_decode )
	{
		key = base64_decode( key );
	}

	if( !this.iframe || !key )
	{
		return false;
	}

	if( this.local_data[ key ] )
	{
		return this.local_data[ key ];
	}
	else
	{
		this.local_data[ key ] = this.connect({ request: 'get', key: key });
		this.local_data[ key ] = this.local_data[ key ] ? this.local_data[ key ] : this.getData( key );

		return this.local_data[ key ];
	}
};

ServerStorageLocal.prototype.getData = function( key )
{
	return this.data && this.data[ key ] ? this.data[ key ] : '';
};

ServerStorageLocal.prototype.getMessage = function()
{
	return this.message;
};

ServerStorageLocal.prototype.set = function( key, val, dont_decode )
{
	if( !this.iframe )
	{
		return false;
	}

	if( typeof __page_type !== 'undefined' && __page_type === 2 && !dont_decode )
	{
		key = base64_decode( key );
	}

	this.connect({ request: 'set', key: key, val: val });
};

ServerStorageLocal.prototype.test = function()
{
	if( !this.iframe )
	{
		return false;
	}

	this.connect({ request: 'test' });
};

ServerStorageLocal.prototype.fillForm = function()
{
	var _base = this;

	if( this.iframe )
	{
		ijQuery( '.field-text input, .field-textarea textarea' ).each( function()
		{
			var that = ijQuery( this );
			var name = that.attr( 'name' );
			var val = _base.get( name );
			if( !val )
			{
				setTimeout( function()
				{
					val = _base.get( name );
					that.val( val ? val : '' );
				}, 100 );
			}
			else
			{
				that.val( val );
			}
		});

		ijQuery( '.field-select select' ).each( function()
		{
			var that = ijQuery( this );
			var name = that.attr( 'name' );
			var val = _base.get( name );

			if( !val )
			{
				setTimeout( function()
				{
					val = _base.get( name );

					if( val )
					{
						that.find( '[value="' + val + '"]' ).attr( 'selected', true );
					}
				}, 100 );
			}
			else
			{
				that.find( '[value="' + val + '"]' ).attr( 'selected', true );
			}
		});


		ijQuery( '.field-radio input, .field-checkbox input[type="checkbox"]' ).each( function()
		{
			var that = ijQuery( this );
			var name = that.attr( 'name' );
			var val = _base.get( name );

			if( !val )
			{
				setTimeout( function()
				{
					val = _base.get( name );

					if( val === that.attr( 'value' ) && that.attr( 'name' ) === name )
					{
						that.prop('checked', true);
					}
				}, 100 );
			}
			else
			{
				if( val === that.attr( 'value' ) && that.attr( 'name' ) === name )
				{
					that.selected( true );
				}
			}
		});
	}
};

ServerStorageLocal.prototype.saveConversionData = function( page, variation )
{
	var data_to_save = {
		page_id: page,
		variation: variation,
		timestamp_created: Date.now(),
		timestamp_sent: null
	};

	if( this.iframe )
	{
		this.set( 'instapage_conversion_' + page, data_to_save, true );
	}
};

ServerStorageLocal.prototype.conversionDataSent = function( page, data, variation )
{
	if( this.iframe )
	{
		if( !data )
		{
			data = {
				page_id: page,
				variation: variation,
				timestamp_created: Date.now(),
				timestamp_sent: null
			};
		}
		else
		{
			data.timestamp_sent = Date.now();
		}

		this.set( 'instapage_conversion_' + page, data, true );
	}
};

ServerStorageLocal.prototype.getConversionData = function( page, callback )
{
	var data;
	var _base = this;

	if( this.iframe )
	{
		data = this.get( 'instapage_conversion_' + page, true );

		if( data )
		{
			callback( data );
		}
		else
		{
			setTimeout( function()
			{
				data = _base.get( 'instapage_conversion_' + page, true );

				callback( data );
			}, 100 );
		}
	}
};
