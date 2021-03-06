/*!
 * VisualEditor DataModel ImageNode class.
 *
 * @copyright 2011-2018 VisualEditor Team and others; see http://ve.mit-license.org
 */

/**
 * DataModel image node.
 *
 * @class
 * @abstract
 * @mixins ve.dm.FocusableNode
 * @mixins ve.dm.ResizableNode
 *
 * @constructor
 */
ve.dm.ImageNode = function VeDmImageNode() {
	// Mixin constructors
	ve.dm.FocusableNode.call( this );
	ve.dm.ResizableNode.call( this );
};

/* Inheritance */

OO.mixinClass( ve.dm.ImageNode, ve.dm.FocusableNode );

OO.mixinClass( ve.dm.ImageNode, ve.dm.ResizableNode );

/* Static Methods */

/**
 * @inheritdoc ve.dm.Model
 */
ve.dm.ImageNode.static.describeChanges = function ( attributeChanges, attributes ) {
	var key, sizeFrom, sizeTo, change,
		customKeys = [ 'width', 'height' ],
		descriptions = [];

	function describeSize( width, height ) {
		return width + ve.msg( 'visualeditor-dimensionswidget-times' ) + height + ve.msg( 'visualeditor-dimensionswidget-px' );
	}

	if ( 'width' in attributeChanges || 'height' in attributeChanges ) {
		sizeFrom = describeSize(
			'width' in attributeChanges ? attributeChanges.width.from : attributes.width,
			'height' in attributeChanges ? attributeChanges.height.from : attributes.height
		);
		sizeTo = describeSize(
			'width' in attributeChanges ? attributeChanges.width.to : attributes.width,
			'height' in attributeChanges ? attributeChanges.height.to : attributes.height
		);

		descriptions.push( ve.msg( 'visualeditor-changedesc-image-size', sizeFrom, sizeTo ) );
	}
	for ( key in attributeChanges ) {
		if ( customKeys.indexOf( key ) === -1 ) {
			change = this.describeChange( key, attributeChanges[ key ] );
			descriptions.push( change );
		}
	}
	return descriptions;
};

/**
 * @inheritdoc ve.dm.Node
 */
ve.dm.ImageNode.static.describeChange = function ( key, change ) {
	if ( key === 'align' ) {
		return ve.msg( 'visualeditor-changedesc-align',
			ve.msg( 'visualeditor-align-widget-' + change.from ),
			ve.msg( 'visualeditor-align-widget-' + change.to )
		);
	}
	// Parent method
	return ve.dm.Node.static.describeChange.apply( this, arguments );
};

/* Methods */

/**
 * @inheritdoc
 */
ve.dm.ImageNode.prototype.createScalable = function () {
	return new ve.dm.Scalable( {
		currentDimensions: {
			width: this.getAttribute( 'width' ),
			height: this.getAttribute( 'height' )
		},
		minDimensions: {
			width: 1,
			height: 1
		}
	} );
};
