/* global ajaxurl, tinymce, wpLinkL10n, setUserSetting, wpActiveEditor */
var wpLink;

( function( $ ) {
<<<<<<< HEAD
	var editor, searchTimer, River, Query, correctedURL,
=======
	var editor, searchTimer, River, Query,
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
		inputs = {},
		rivers = {},
		isTouch = ( 'ontouchend' in document );

<<<<<<< HEAD
	function getLink() {
		return editor.dom.getParent( editor.selection.getNode(), 'a' );
	}

=======
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
	wpLink = {
		timeToTriggerRiver: 150,
		minRiverAJAXDuration: 200,
		riverBottomThreshold: 5,
		keySensitivity: 100,
		lastSearch: '',
		textarea: '',

		init: function() {
			inputs.wrap = $('#wp-link-wrap');
			inputs.dialog = $( '#wp-link' );
			inputs.backdrop = $( '#wp-link-backdrop' );
			inputs.submit = $( '#wp-link-submit' );
			inputs.close = $( '#wp-link-close' );
<<<<<<< HEAD

			// Input
			inputs.text = $( '#wp-link-text' );
			inputs.url = $( '#wp-link-url' );
			inputs.nonce = $( '#_ajax_linking_nonce' );
			inputs.openInNewTab = $( '#wp-link-target' );
			inputs.search = $( '#wp-link-search' );

=======
			// URL
			inputs.url = $( '#url-field' );
			inputs.nonce = $( '#_ajax_linking_nonce' );
			// Secondary options
			inputs.title = $( '#link-title-field' );
			// Advanced Options
			inputs.openInNewTab = $( '#link-target-checkbox' );
			inputs.search = $( '#search-field' );
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
			// Build Rivers
			rivers.search = new River( $( '#search-results' ) );
			rivers.recent = new River( $( '#most-recent-results' ) );
			rivers.elements = inputs.dialog.find( '.query-results' );

			// Get search notice text
			inputs.queryNotice = $( '#query-notice-message' );
			inputs.queryNoticeTextDefault = inputs.queryNotice.find( '.query-notice-default' );
			inputs.queryNoticeTextHint = inputs.queryNotice.find( '.query-notice-hint' );

			// Bind event handlers
			inputs.dialog.keydown( wpLink.keydown );
			inputs.dialog.keyup( wpLink.keyup );
			inputs.submit.click( function( event ) {
				event.preventDefault();
				wpLink.update();
			});
			inputs.close.add( inputs.backdrop ).add( '#wp-link-cancel a' ).click( function( event ) {
				event.preventDefault();
				wpLink.close();
			});

			$( '#wp-link-search-toggle' ).on( 'click', wpLink.toggleInternalLinking );

			rivers.elements.on( 'river-select', wpLink.updateFields );

			// Display 'hint' message when search field or 'query-results' box are focused
			inputs.search.on( 'focus.wplink', function() {
				inputs.queryNoticeTextDefault.hide();
				inputs.queryNoticeTextHint.removeClass( 'screen-reader-text' ).show();
			} ).on( 'blur.wplink', function() {
				inputs.queryNoticeTextDefault.show();
				inputs.queryNoticeTextHint.addClass( 'screen-reader-text' ).hide();
			} );

<<<<<<< HEAD
			inputs.search.on( 'keyup input', function() {
=======
			inputs.search.keyup( function() {
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				var self = this;

				window.clearTimeout( searchTimer );
				searchTimer = window.setTimeout( function() {
					wpLink.searchInternalLinks.call( self );
				}, 500 );
			});
<<<<<<< HEAD

			inputs.url.on( 'paste', function() {
				setTimeout( wpLink.correctURL, 0 );
			} );

			inputs.url.on( 'blur', wpLink.correctURL );
		},

		// If URL wasn't corrected last time and doesn't start with http:, https:, ? # or /, prepend http://
		correctURL: function () {
			var url = $.trim( inputs.url.val() );

			if ( url && correctedURL !== url && ! /^(?:[a-z]+:|#|\?|\.|\/)/.test( url ) ) {
				inputs.url.val( 'http://' + url );
				correctedURL = url;
			}
		},

		open: function( editorId ) {
			var ed,
				$body = $( document.body );

			$body.addClass( 'modal-open' );
=======
		},

		open: function( editorId ) {
			var ed;

			$( document.body ).addClass( 'modal-open' );
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18

			wpLink.range = null;

			if ( editorId ) {
				window.wpActiveEditor = editorId;
			}

			if ( ! window.wpActiveEditor ) {
				return;
			}

			this.textarea = $( '#' + window.wpActiveEditor ).get( 0 );

			if ( typeof tinymce !== 'undefined' ) {
<<<<<<< HEAD
				// Make sure the link wrapper is the last element in the body,
				// or the inline editor toolbar may show above the backdrop.
				$body.append( inputs.backdrop, inputs.wrap );

=======
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				ed = tinymce.get( wpActiveEditor );

				if ( ed && ! ed.isHidden() ) {
					editor = ed;
				} else {
					editor = null;
				}

				if ( editor && tinymce.isIE ) {
					editor.windowManager.bookmark = editor.selection.getBookmark();
				}
			}

			if ( ! wpLink.isMCE() && document.selection ) {
				this.textarea.focus();
				this.range = document.selection.createRange();
			}

			inputs.wrap.show();
			inputs.backdrop.show();

			wpLink.refresh();
<<<<<<< HEAD

=======
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
			$( document ).trigger( 'wplink-open', inputs.wrap );
		},

		isMCE: function() {
			return editor && ! editor.isHidden();
		},

		refresh: function() {
<<<<<<< HEAD
			var text = '';

=======
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
			// Refresh rivers (clear links, check visibility)
			rivers.search.refresh();
			rivers.recent.refresh();

			if ( wpLink.isMCE() ) {
				wpLink.mceRefresh();
			} else {
<<<<<<< HEAD
				// For the Text editor the "Link text" field is always shown
				if ( ! inputs.wrap.hasClass( 'has-text-field' ) ) {
					inputs.wrap.addClass( 'has-text-field' );
				}

				if ( document.selection ) {
					// Old IE
					text = document.selection.createRange().text || '';
				} else if ( typeof this.textarea.selectionStart !== 'undefined' &&
					( this.textarea.selectionStart !== this.textarea.selectionEnd ) ) {
					// W3C
					text = this.textarea.value.substring( this.textarea.selectionStart, this.textarea.selectionEnd ) || '';
				}

				inputs.text.val( text );
=======
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				wpLink.setDefaultValues();
			}

			if ( isTouch ) {
				// Close the onscreen keyboard
				inputs.url.focus().blur();
			} else {
				// Focus the URL field and highlight its contents.
				// If this is moved above the selection changes,
				// IE will show a flashing cursor over the dialog.
				inputs.url.focus()[0].select();
			}

			// Load the most recent results if this is the first time opening the panel.
			if ( ! rivers.recent.ul.children().length ) {
				rivers.recent.ajax();
			}
<<<<<<< HEAD

			correctedURL = inputs.url.val().replace( /^http:\/\//, '' );
		},

		hasSelectedText: function( linkNode ) {
			var html = editor.selection.getContent();

			// Partial html and not a fully selected anchor element
			if ( /</.test( html ) && ( ! /^<a [^>]+>[^<]+<\/a>$/.test( html ) || html.indexOf('href=') === -1 ) ) {
				return false;
			}

			if ( linkNode ) {
				var nodes = linkNode.childNodes, i;

				if ( nodes.length === 0 ) {
					return false;
				}

				for ( i = nodes.length - 1; i >= 0; i-- ) {
					if ( nodes[i].nodeType != 3 ) {
						return false;
					}
				}
			}

			return true;
		},

		mceRefresh: function() {
			var text,
				selectedNode = editor.selection.getNode(),
				linkNode = editor.dom.getParent( selectedNode, 'a[href]' ),
				onlyText = this.hasSelectedText( linkNode );

			if ( linkNode ) {
				text = linkNode.innerText || linkNode.textContent;
				inputs.url.val( editor.dom.getAttrib( linkNode, 'href' ) );
				inputs.openInNewTab.prop( 'checked', '_blank' === editor.dom.getAttrib( linkNode, 'target' ) );
				inputs.submit.val( wpLinkL10n.update );
			} else {
				text = editor.selection.getContent({ format: 'text' });
				this.setDefaultValues();
			}

			if ( onlyText ) {
				inputs.text.val( text || '' );
				inputs.wrap.addClass( 'has-text-field' );
			} else {
				inputs.text.val( '' );
				inputs.wrap.removeClass( 'has-text-field' );
=======
		},

		mceRefresh: function() {
			var e;

			// If link exists, select proper values.
			if ( e = editor.dom.getParent( editor.selection.getNode(), 'A' ) ) {
				// Set URL and description.
				inputs.url.val( editor.dom.getAttrib( e, 'href' ) );
				inputs.title.val( editor.dom.getAttrib( e, 'title' ) );
				// Set open in new tab.
				inputs.openInNewTab.prop( 'checked', ( '_blank' === editor.dom.getAttrib( e, 'target' ) ) );
				// Update save prompt.
				inputs.submit.val( wpLinkL10n.update );

			// If there's no link, set the default values.
			} else {
				wpLink.setDefaultValues();
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
			}
		},

		close: function() {
			$( document.body ).removeClass( 'modal-open' );

			if ( ! wpLink.isMCE() ) {
				wpLink.textarea.focus();

				if ( wpLink.range ) {
					wpLink.range.moveToBookmark( wpLink.range.getBookmark() );
					wpLink.range.select();
				}
			} else {
				editor.focus();
			}

			inputs.backdrop.hide();
			inputs.wrap.hide();
<<<<<<< HEAD

			correctedURL = false;

=======
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
			$( document ).trigger( 'wplink-close', inputs.wrap );
		},

		getAttrs: function() {
<<<<<<< HEAD
			wpLink.correctURL();

			return {
				href: $.trim( inputs.url.val() ),
=======
			return {
				href: inputs.url.val(),
				title: inputs.title.val(),
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				target: inputs.openInNewTab.prop( 'checked' ) ? '_blank' : ''
			};
		},

<<<<<<< HEAD
		buildHtml: function(attrs) {
			var html = '<a href="' + attrs.href + '"';

			if ( attrs.target ) {
				html += ' target="' + attrs.target + '"';
			}

			return html + '>';
		},

		update: function() {
			if ( wpLink.isMCE() ) {
				wpLink.mceUpdate();
			} else {
				wpLink.htmlUpdate();
			}
		},

		htmlUpdate: function() {
			var attrs, text, html, begin, end, cursor, selection,
				textarea = wpLink.textarea;

			if ( ! textarea ) {
				return;
			}

			attrs = wpLink.getAttrs();
			text = inputs.text.val();

			// If there's no href, return.
			if ( ! attrs.href ) {
				return;
			}

			html = wpLink.buildHtml(attrs);
=======
		update: function() {
			if ( wpLink.isMCE() )
				wpLink.mceUpdate();
			else
				wpLink.htmlUpdate();
		},

		htmlUpdate: function() {
			var attrs, html, begin, end, cursor, title, selection,
				textarea = wpLink.textarea;

			if ( ! textarea )
				return;

			attrs = wpLink.getAttrs();

			// If there's no href, return.
			if ( ! attrs.href || attrs.href == 'http://' )
				return;

			// Build HTML
			html = '<a href="' + attrs.href + '"';

			if ( attrs.title ) {
				title = attrs.title.replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /"/g, '&quot;' );
				html += ' title="' + title + '"';
			}

			if ( attrs.target ) {
				html += ' target="' + attrs.target + '"';
			}

			html += '>';
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18

			// Insert HTML
			if ( document.selection && wpLink.range ) {
				// IE
				// Note: If no text is selected, IE will not place the cursor
				//       inside the closing tag.
				textarea.focus();
<<<<<<< HEAD
				wpLink.range.text = html + ( text || wpLink.range.text ) + '</a>';
=======
				wpLink.range.text = html + wpLink.range.text + '</a>';
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				wpLink.range.moveToBookmark( wpLink.range.getBookmark() );
				wpLink.range.select();

				wpLink.range = null;
			} else if ( typeof textarea.selectionStart !== 'undefined' ) {
				// W3C
<<<<<<< HEAD
				begin = textarea.selectionStart;
				end = textarea.selectionEnd;
				selection = text || textarea.value.substring( begin, end );
				html = html + selection + '</a>';
				cursor = begin + html.length;

				// If no text is selected, place the cursor inside the closing tag.
				if ( begin === end && ! selection ) {
					cursor -= 4;
				}

				textarea.value = (
					textarea.value.substring( 0, begin ) +
					html +
					textarea.value.substring( end, textarea.value.length )
				);
=======
				begin       = textarea.selectionStart;
				end         = textarea.selectionEnd;
				selection   = textarea.value.substring( begin, end );
				html        = html + selection + '</a>';
				cursor      = begin + html.length;

				// If no text is selected, place the cursor inside the closing tag.
				if ( begin == end )
					cursor -= '</a>'.length;

				textarea.value = textarea.value.substring( 0, begin ) + html +
					textarea.value.substring( end, textarea.value.length );
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18

				// Update cursor position
				textarea.selectionStart = textarea.selectionEnd = cursor;
			}

			wpLink.close();
			textarea.focus();
		},

		mceUpdate: function() {
<<<<<<< HEAD
			var attrs = wpLink.getAttrs(),
				link, text;
=======
			var link,
				attrs = wpLink.getAttrs();
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18

			wpLink.close();
			editor.focus();

			if ( tinymce.isIE ) {
				editor.selection.moveToBookmark( editor.windowManager.bookmark );
			}

<<<<<<< HEAD
			if ( ! attrs.href ) {
=======
			link = editor.dom.getParent( editor.selection.getNode(), 'a[href]' );

			// If the values are empty, unlink and return
			if ( ! attrs.href || attrs.href == 'http://' ) {
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				editor.execCommand( 'unlink' );
				return;
			}

<<<<<<< HEAD
			link = getLink();

			if ( inputs.wrap.hasClass( 'has-text-field' ) ) {
				text = inputs.text.val() || attrs.href;
			}

			if ( link ) {
				if ( text ) {
					if ( 'innerText' in link ) {
						link.innerText = text;
					} else {
						link.textContent = text;
					}
				}

				editor.dom.setAttribs( link, attrs );
			} else {
				if ( text ) {
					editor.selection.setNode( editor.dom.create( 'a', attrs, text ) );
				} else {
					editor.execCommand( 'mceInsertLink', false, attrs );
				}
			}

			editor.nodeChanged();
=======
			if ( link ) {
				editor.dom.setAttribs( link, attrs );
			} else {
				editor.execCommand( 'mceInsertLink', false, attrs );
			}

			// Move the cursor to the end of the selection
			editor.selection.collapse();
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
		},

		updateFields: function( e, li ) {
			inputs.url.val( li.children( '.item-permalink' ).val() );
<<<<<<< HEAD
		},

		setDefaultValues: function() {
			var selection,
				emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
				urlRegexp = /^(https?|ftp):\/\/[A-Z0-9.-]+\.[A-Z]{2,4}[^ "]*$/i;

			if ( this.isMCE() ) {
				selection = editor.selection.getContent();
			} else if ( document.selection && wpLink.range ) {
				selection = wpLink.range.text;
			} else if ( typeof this.textarea.selectionStart !== 'undefined' ) {
				selection = this.textarea.value.substring( this.textarea.selectionStart, this.textarea.selectionEnd );
			}

=======
			inputs.title.val( li.hasClass( 'no-title' ) ? '' : li.children( '.item-title' ).text() );
		},

		setDefaultValues: function() {
			var selection = editor && editor.selection.getContent(),
				emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
				urlRegexp = /^(https?|ftp):\/\/[A-Z0-9.-]+\.[A-Z]{2,4}[^ "]*$/i;

>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
			if ( selection && emailRegexp.test( selection ) ) {
				// Selection is email address
				inputs.url.val( 'mailto:' + selection );
			} else if ( selection && urlRegexp.test( selection ) ) {
				// Selection is URL
				inputs.url.val( selection.replace( /&amp;|&#0?38;/gi, '&' ) );
			} else {
				// Set URL to default.
<<<<<<< HEAD
				inputs.url.val( '' );
			}

=======
				inputs.url.val( 'http://' );
			}

			// Set description to default.
			inputs.title.val( '' );

>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
			// Update save prompt.
			inputs.submit.val( wpLinkL10n.save );
		},

		searchInternalLinks: function() {
			var t = $( this ), waiting,
				search = t.val();

			if ( search.length > 2 ) {
				rivers.recent.hide();
				rivers.search.show();

				// Don't search if the keypress didn't change the title.
				if ( wpLink.lastSearch == search )
					return;

				wpLink.lastSearch = search;
<<<<<<< HEAD
				waiting = t.parent().find( '.spinner' ).addClass( 'is-active' );

				rivers.search.change( search );
				rivers.search.ajax( function() {
					waiting.removeClass( 'is-active' );
=======
				waiting = t.parent().find('.spinner').show();

				rivers.search.change( search );
				rivers.search.ajax( function() {
					waiting.hide();
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				});
			} else {
				rivers.search.hide();
				rivers.recent.show();
			}
		},

		next: function() {
			rivers.search.next();
			rivers.recent.next();
		},

		prev: function() {
			rivers.search.prev();
			rivers.recent.prev();
		},

		keydown: function( event ) {
			var fn, id,
				key = $.ui.keyCode;

			if ( key.ESCAPE === event.keyCode ) {
				wpLink.close();
				event.stopImmediatePropagation();
			} else if ( key.TAB === event.keyCode ) {
				id = event.target.id;

				// wp-link-submit must always be the last focusable element in the dialog.
				// following focusable elements will be skipped on keyboard navigation.
				if ( id === 'wp-link-submit' && ! event.shiftKey ) {
					inputs.close.focus();
					event.preventDefault();
				} else if ( id === 'wp-link-close' && event.shiftKey ) {
					inputs.submit.focus();
					event.preventDefault();
				}
			}

			if ( event.keyCode !== key.UP && event.keyCode !== key.DOWN ) {
				return;
			}

			if ( document.activeElement &&
				( document.activeElement.id === 'link-title-field' || document.activeElement.id === 'url-field' ) ) {
				return;
			}

			fn = event.keyCode === key.UP ? 'prev' : 'next';
			clearInterval( wpLink.keyInterval );
			wpLink[ fn ]();
			wpLink.keyInterval = setInterval( wpLink[ fn ], wpLink.keySensitivity );
			event.preventDefault();
		},

		keyup: function( event ) {
			var key = $.ui.keyCode;

			if ( event.which === key.UP || event.which === key.DOWN ) {
				clearInterval( wpLink.keyInterval );
				event.preventDefault();
			}
		},

		delayedCallback: function( func, delay ) {
			var timeoutTriggered, funcTriggered, funcArgs, funcContext;

			if ( ! delay )
				return func;

			setTimeout( function() {
				if ( funcTriggered )
					return func.apply( funcContext, funcArgs );
				// Otherwise, wait.
				timeoutTriggered = true;
			}, delay );

			return function() {
				if ( timeoutTriggered )
					return func.apply( this, arguments );
				// Otherwise, wait.
				funcArgs = arguments;
				funcContext = this;
				funcTriggered = true;
			};
		},

		toggleInternalLinking: function( event ) {
			var visible = inputs.wrap.hasClass( 'search-panel-visible' );

			inputs.wrap.toggleClass( 'search-panel-visible', ! visible );
			setUserSetting( 'wplink', visible ? '0' : '1' );
			inputs[ ! visible ? 'search' : 'url' ].focus();
			event.preventDefault();
		}
	};

	River = function( element, search ) {
		var self = this;
		this.element = element;
		this.ul = element.children( 'ul' );
		this.contentHeight = element.children( '#link-selector-height' );
		this.waiting = element.find('.river-waiting');

		this.change( search );
		this.refresh();

		$( '#wp-link .query-results, #wp-link #link-selector' ).scroll( function() {
			self.maybeLoad();
		});
		element.on( 'click', 'li', function( event ) {
			self.select( $( this ), event );
		});
	};

	$.extend( River.prototype, {
		refresh: function() {
			this.deselect();
			this.visible = this.element.is( ':visible' );
		},
		show: function() {
			if ( ! this.visible ) {
				this.deselect();
				this.element.show();
				this.visible = true;
			}
		},
		hide: function() {
			this.element.hide();
			this.visible = false;
		},
		// Selects a list item and triggers the river-select event.
		select: function( li, event ) {
			var liHeight, elHeight, liTop, elTop;

			if ( li.hasClass( 'unselectable' ) || li == this.selected )
				return;

			this.deselect();
			this.selected = li.addClass( 'selected' );
			// Make sure the element is visible
			liHeight = li.outerHeight();
			elHeight = this.element.height();
			liTop = li.position().top;
			elTop = this.element.scrollTop();

			if ( liTop < 0 ) // Make first visible element
				this.element.scrollTop( elTop + liTop );
			else if ( liTop + liHeight > elHeight ) // Make last visible element
				this.element.scrollTop( elTop + liTop - elHeight + liHeight );

			// Trigger the river-select event
			this.element.trigger( 'river-select', [ li, event, this ] );
		},
		deselect: function() {
			if ( this.selected )
				this.selected.removeClass( 'selected' );
			this.selected = false;
		},
		prev: function() {
			if ( ! this.visible )
				return;

			var to;
			if ( this.selected ) {
				to = this.selected.prev( 'li' );
				if ( to.length )
					this.select( to );
			}
		},
		next: function() {
			if ( ! this.visible )
				return;

			var to = this.selected ? this.selected.next( 'li' ) : $( 'li:not(.unselectable):first', this.element );
			if ( to.length )
				this.select( to );
		},
		ajax: function( callback ) {
			var self = this,
				delay = this.query.page == 1 ? 0 : wpLink.minRiverAJAXDuration,
				response = wpLink.delayedCallback( function( results, params ) {
					self.process( results, params );
					if ( callback )
						callback( results, params );
				}, delay );

			this.query.ajax( response );
		},
		change: function( search ) {
			if ( this.query && this._search == search )
				return;

			this._search = search;
			this.query = new Query( search );
			this.element.scrollTop( 0 );
		},
		process: function( results, params ) {
			var list = '', alt = true, classes = '',
				firstPage = params.page == 1;

			if ( ! results ) {
				if ( firstPage ) {
					list += '<li class="unselectable no-matches-found"><span class="item-title"><em>' +
						wpLinkL10n.noMatchesFound + '</em></span></li>';
				}
			} else {
				$.each( results, function() {
					classes = alt ? 'alternate' : '';
					classes += this.title ? '' : ' no-title';
					list += classes ? '<li class="' + classes + '">' : '<li>';
					list += '<input type="hidden" class="item-permalink" value="' + this.permalink + '" />';
					list += '<span class="item-title">';
					list += this.title ? this.title : wpLinkL10n.noTitle;
					list += '</span><span class="item-info">' + this.info + '</span></li>';
					alt = ! alt;
				});
			}

			this.ul[ firstPage ? 'html' : 'append' ]( list );
		},
		maybeLoad: function() {
			var self = this,
				el = this.element,
				bottom = el.scrollTop() + el.height();

			if ( ! this.query.ready() || bottom < this.contentHeight.height() - wpLink.riverBottomThreshold )
				return;

			setTimeout(function() {
				var newTop = el.scrollTop(),
					newBottom = newTop + el.height();

				if ( ! self.query.ready() || newBottom < self.contentHeight.height() - wpLink.riverBottomThreshold )
					return;

<<<<<<< HEAD
				self.waiting.addClass( 'is-active' );
				el.scrollTop( newTop + self.waiting.outerHeight() );

				self.ajax( function() {
					self.waiting.removeClass( 'is-active' );
=======
				self.waiting.show();
				el.scrollTop( newTop + self.waiting.outerHeight() );

				self.ajax( function() {
					self.waiting.hide();
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
				});
			}, wpLink.timeToTriggerRiver );
		}
	});

	Query = function( search ) {
		this.page = 1;
		this.allLoaded = false;
		this.querying = false;
		this.search = search;
	};

	$.extend( Query.prototype, {
		ready: function() {
			return ! ( this.querying || this.allLoaded );
		},
		ajax: function( callback ) {
			var self = this,
				query = {
					action : 'wp-link-ajax',
					page : this.page,
					'_ajax_linking_nonce' : inputs.nonce.val()
				};

			if ( this.search )
				query.search = this.search;

			this.querying = true;

			$.post( ajaxurl, query, function( r ) {
				self.page++;
				self.querying = false;
				self.allLoaded = ! r;
				callback( r, query );
			}, 'json' );
		}
	});

	$( document ).ready( wpLink.init );
})( jQuery );
