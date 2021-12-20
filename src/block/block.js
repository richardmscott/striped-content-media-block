/**
 * BLOCK: striped-content-media-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { select } = wp.data;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import classNames from 'classnames';
import { RichText,
         AlignmentToolbar,
         MediaUpload,
         BlockControls,
         PanelColorSettings,
         InnerBlocks,
         MediaPlaceholder,
         InspectorControls,
         useBlockProps,
         withColors,
         getColorClassName,
         getColorObjectByColorValue
 } from '@wordpress/block-editor';

 import { Icon, Panel, PanelBody, PanelRow, Toolbar, ToolbarButton, Button } from '@wordpress/components'

 const pullLeft = () => (
    <Icon
        icon={
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M4 18h6V6H4v12zm9-9.5V10h7V8.5h-7zm0 7h7V14h-7v1.5z"></path></svg>
        }
    />
);

const pullRight = () => (
    <Icon
        icon={
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M14 6v12h6V6h-6zM4 10h7V8.5H4V10zm0 5.5h7V14H4v1.5z"></path></svg>
        }
    />
);

const imageIcon = () => (
    <Icon 
    icon={
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>
}
    />
);

/**
 * Register: Striped Content and Media Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

 const BlockWithColorSettings = (props) => {
    const {
        className,
        isSelected,
        textColor,
        setTextColor,
        backgroundColor,
        setBackgroundColor,
        attributes: { content, title, align, alignment, imgUrl, mediaPosition },
        setAttributes
    } = props;

    const classes = classNames('alignfull', (backgroundColor != undefined ? backgroundColor.class : ''), (textColor != undefined ? textColor.class : ''), 'image-position-' + mediaPosition);

    const blockProps = useBlockProps( {
        className: classes,
    } );

    const onChangeTitle = (value) => {
        setAttributes( { title: value } );
    };
    const onChangeContent = (value) => {
        setAttributes( { content: value } );
    };
    const onChangeAlignment = ( newAlignment ) => {
        setAttributes( {
            alignment: newAlignment === undefined ? 'none' : newAlignment,
        } );
    };
    const selectImage = ( value ) => {
        console.log(value);
        setAttributes( {
            imgUrl: value.sizes.full.url,
        } );
    };
    const onChangeMediaAlignment = ( newMediaPosition ) => {
        setAttributes( {
            mediaPosition: (mediaPosition === 'left' ? 'right' : 'left'),
        } );
    };

    return (
        <div { ...blockProps }>
            <p>{ console.log(blockProps)}</p>
            {
                <BlockControls>
                    <Toolbar>
                    <ToolbarButton
          className={classNames('components-toolbar__control', (mediaPosition === 'left' ? 'is-pressed' : ''))}
          label={__('Show media on left')}
          icon={pullLeft}
          value="left"
          aria-pressed={mediaPosition === 'left'}
          onClick={onChangeMediaAlignment}
        /> 
     <ToolbarButton
         className={classNames('components-toolbar__control', (mediaPosition === 'right' ? 'is-pressed' : ''))}
          label={__('Show media on right')}
          icon={pullRight}
          aria-pressed={mediaPosition === 'right'}
          value="right"
          onClick={onChangeMediaAlignment}
        /> 
    <MediaUpload
      onSelect={selectImage}
      allowedTypes={['image']}
      value={imgUrl}
      render={({ open }) => (
        <Button
          className="components-toolbar__control"
          label={__('Edit media')}
          icon={imageIcon}
          onClick={open}
        />
      )}
    /></Toolbar>
                    <AlignmentToolbar
                        value={ alignment }
                        onChange={ onChangeAlignment }
                    />
                </BlockControls>
                }

    <InspectorControls>
    <Panel header="My Panel">

        <PanelBody title="My Block Settings" initialOpen={ true }>
            <PanelRow>My Panel Inputs and Labels</PanelRow>
        </PanelBody>
    </Panel>
				<PanelColorSettings 
					title={__('Color settings')}
					colorSettings={[
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __('Text color')
						},
                        {
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __('Background color')
						},
					]}
				/>
			</InspectorControls>
        <div className="striped-content-media-block-inner">       
        <div className="block-contentandimage">
        <div className="striped-content-media-container-title">
        <RichText
            tagName="h2"
            className="callout-title"
            onChange={ onChangeTitle }
            placeholder={__("title")}
            value={ title }
        />
        </div>
        <div className="striped-content-media-container-media"> 
{imgUrl ?
        <MediaUpload 
        onSelect={selectImage}
        render={ ({open}) => {
            return <button onClick={open}><img 
                src={imgUrl}
                onClick={open}
                /></button>;
        }}
    />
  :
  <MediaPlaceholder
    icon="format-image"
    labels={{
      title: __('Media area'),
    }}
    className="block-image"
    onSelect={selectImage}
    accept="image/*"
    allowedTypes={['image']}
  />
}


        </div>
        <div className="striped-content-media-container-text">
        <InnerBlocks allowedBlocks={ ['core/buttons', 'core/paragraph'] } />
        </div>
        </div>
        </div>
        </div>
    );
};


registerBlockType( 'cgb/block-striped-content-media-block', {
	apiVersion: 2,
    title: 'Striped Content and Media Block',
    icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M14 6v12h6V6h-6zM4 10h7V8.5H4V10zm0 5.5h7V14H4v1.5z"></path></svg>,
    category: 'common',
    getEditWrapperProps( attributes ) {
        return { 'data-align': 'full' };
    },
    attributes: {
		title: {
			type: 'array',
			source: 'children',
            selector: ".callout-title"
		},
        content: {
            type: 'array',
            source: 'children',
            selector: '.callout-body',
        },
        align: {
            type: 'string',
            default: 'full',
        },
        alignment: {
            type: 'string',
            alignment: 'left',
        },
        textColor: {
			type: 'string'
		},
        customTextColor: {
			type: 'string'
		},
		backgroundColor: {
			type: 'string'
		},
        customBackgroundColor: {
			type: 'string'
		},
        imgUrl: {
        type: 'string',
        default: ''
        },
        mediaPosition: {
            type: 'string',
            default: 'left'
        }
    },
    supports: {
        align: false
    },
    example: {
        attributes: {
            title: 'YO?',
            content: 'Hello World',
            alignment: 'full',
        },
    },
    edit: withColors({textColor: 'color', backgroundColor: 'background-color'})(BlockWithColorSettings),
    save: ( props ) => {
        const {
            attributes: { content, title, align, alignment, backgroundColor, textColor, imgUrl, mediaPosition },
            setAttributes,
            className,
        } = props;

        let classes = classNames('alignfull', (backgroundColor != undefined ? getColorClassName('background-color', backgroundColor) : ''), (textColor != undefined ? getColorClassName('color', textColor) : ''), 'image-position-' + mediaPosition);

        const blockProps = useBlockProps.save( {
            className: classes
        } );
        
        return (
            <div { ...blockProps }>
            <div className="striped-content-media-block-inner">
            <div className="block-contentandimage">
            <div className="striped-content-media-container-title">
            <RichText.Content
                tagName="h2"
                className="callout-title"
                value={ title }
            />
                </div>
            <div className="striped-content-media-container-media">
                <img src={imgUrl} />
            </div>
            <div class="striped-content-media-container-text">
            <RichText.Content
            tagName="div"
            className="callout-body"
            value={ content }
        />
        <InnerBlocks.Content />
        </div>
        </div>
        </div>
        </div>
        );
    },
} );