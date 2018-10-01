import CustomServerSideRender from './CustomServerSideRender';

import { __ } from '@wordpress/i18n';
import { Component, Fragment, createRef, findDOMNode } from '@wordpress/element';
import { ToggleControl, RangeControl, SelectControl } from '@wordpress/components'
import { RichText, InspectorControls } from '@wordpress/editor';
import { select, subscribe } from '@wordpress/data';

export default class InstafeedBlock extends Component {
  constructor() {
    super(...arguments);

    subscribe(this.subscribe.bind(this));

    this.serverSideRef = createRef();
    this.initMasonry = this.initMasonry.bind(this);
    this.reflowMasonry = this.reflowMasonry.bind(this);
    this.sidebarOpen = false;
    this.masonryElement = null;

    this.state = {
      isDoneTyping: true,
      timer: null,
    };
    this.duration = 1000;
  }

  subscribe() {
    const editPost = select('core/edit-post');
    const sidebarOpen = editPost && !!editPost.getActiveGeneralSidebarName();
    if (sidebarOpen !== this.sidebarOpen) {
      window.setTimeout(this.reflowMasonry, 200);
      this.sidebarOpen = sidebarOpen;
    }
  }

  initMasonry() {
    if (!this.serverSideRef.current) {
      return;
    }

    const node = findDOMNode(this.serverSideRef.current);
    const el = jQuery(node).find('.js-masonry');
    if (el.length && !el.data('masonry')) {
      const data = el.data('masonry-options') || {};
      window.setTimeout(() => el.masonry(data), 1000);
      this.masonryElement = el;
    }
  }

  reflowMasonry() {
    if (this.masonryElement) {
      this.masonryElement.masonry('layout');
    }
  }

  render() {
    const { attributes, setAttributes } = this.props;
    const { links, limit, resolution, search, gutter, caption, layout } = attributes;

    const resolutionOptions = [
      { value: 'thumbnail', label: __('thumbnail (150x150)', 'wp-gutenberg-instafeed') },
      { value: 'small', label: __('small (240x240)', 'wp-gutenberg-instafeed') },
      { value: 'medium', label: __('medium (320x320)', 'wp-gutenberg-instafeed') },
      { value: 'large', label: __('large (640x640)', 'wp-gutenberg-instafeed') },
    ];

    const layoutOptions = [
      { value: 'masonry', label: __('masonry', 'wp-gutenberg-instafeed') },
      { value: 'grid', label: __('grid', 'wp-gutenberg-instafeed') },
      { value: 'fit', label: __('fit together', 'wp-gutenberg-instafeed') },
    ];

    const inspectorControls = (
      <InspectorControls>
        <SelectControl
          key="layout-input"
          label={ __('Layout', 'wp-gutenberg-instafeed') }
          value={ layout }
          onChange={ (value) => setAttributes({ layout: value }) }
          select={ layout }
          options={ layoutOptions }
        />
        <RangeControl
          key="limit-input"
          label={ __('Limit', 'wp-gutenberg-instafeed') }
          value={ limit }
          onChange={ (value) => setAttributes({ limit: value }) }
          min={ 1 }
          max={ 12 }
        />
        <SelectControl
          key="resolution-input"
          label={ __('Resolution', 'wp-gutenberg-instafeed') }
          select={ resolution }
          options={ resolutionOptions }
          onChange={ (value) => setAttributes({ resolution: value }) }
          value={ resolution }
        />
        <ToggleControl
          key="gutter-input"
          label={ __('Add a gutter between images.', 'wp-gutenberg-instafeed') }
          checked={ gutter }
          onChange={ () => setAttributes({ gutter: !gutter }) }
        />
        <ToggleControl
          key="links-input"
          label={ __('Wrap the images with a link to the photo on Instagram.', 'wp-gutenberg-instafeed') }
          checked={ links }
          onChange={ () => setAttributes({ links: !links }) }
        />
        <ToggleControl
          key="caption-input"
          label={ __('Display caption.', 'wp-gutenberg-instafeed') }
          checked={ caption }
          onChange={ () => setAttributes({ caption: !caption }) }
        />
      </InspectorControls>
    );

    const searchInput = (
      <RichText
        key="search-input"
        format="string"
        tagName="h3"
        keepPlaceholderOnFocus="true"
        autocompleters={ [] }
        style={ { textAlign: 'center' } }
        value={ search }
        onChange={ value => {
          clearTimeout(this.state.timer);
          const timer = setTimeout(() => this.setState({ isDoneTyping: true }), this.duration);
          this.setState({ isDoneTyping: false, timer: timer});

          setAttributes({ search: value })
        } }
        placeholder={ __('@username or #hashtag', 'wp-gutenberg-instafeed') }
      />
    );

    return (
      <Fragment>
        { inspectorControls }
        { searchInput }
        {
          search && this.state.isDoneTyping ? (
            <Fragment>
              <CustomServerSideRender
                block="genero/instafeed"
                attributes={ attributes }
                onUpdate={ this.initMasonry }
                ref={ this.serverSideRef }
              />
            </Fragment>
          ) : (
            <div key="loading" className="wp-block-embed is-loading">
              <p>{ __('Type a username or hashtag to search for in the field above...', 'wp-gutenberg-instafeed') }</p>
            </div>
          )
        }
      </Fragment>
    );
  }
}
