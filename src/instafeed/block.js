const { __ } = wp.i18n;
const { InspectorControls } = wp.blocks;
const { Component, Fragment } = wp.element;
const { TextControl, ToggleControl, RangeControl, SelectControl, ServerSideRender } = wp.components;

export default class InstafeedBlock extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      isDoneTyping: true,
      timer: null,
    };
    this.duration = 1000;
  }

  render() {
    const { attributes, setAttributes } = this.props;
    const { links, limit, resolution, search, gutter, caption, layout } = attributes;

    const resolutionOptions = [
      { value: 'thumbnail', label: __('thumbnail (150x150)') },
      { value: 'small', label: __('small (240x240)') },
      { value: 'medium', label: __('medium (320x320)') },
      { value: 'large', label: __('large (640x640)') },
    ];

    const layoutOptions = [
      { value: 'grid', label: __('grid') },
      { value: 'fit', label: __('fit together') },
    ];

    const searchInput = (
      <div>
        <TextControl
          key="search-input"
          value={ search }
          onChange={ value => setAttributes({ search: value }) }
          onKeyUp={ () => {
            clearTimeout(this.state.timer);
            const timer = setTimeout(() => this.setState({ isDoneTyping: true }), this.duration);
            this.setState({timer: timer});
          } }
          onKeyDown={() => {
            this.setState({ isDoneTyping: false });
            clearTimeout(this.state.timer)
          } }
          style={{textAlign: 'center', border: 'solid 1px rgba(100,100,100,0.25)'}}
          placeholder={ __('@username or #hashtag') }
        />
      </div>
    );

    const inspectorControls = (
      <InspectorControls>
        <SelectControl
          key="layout-input"
          label={ __('Layout') }
          value={ layout }
          onChange={ (value) => setAttributes({ layout: value }) }
          select={ layout }
          options={ layoutOptions }
        />
        <RangeControl
          key="limit-input"
          label={ __('Limit') }
          value={ limit }
          onChange={ (value) => setAttributes({ limit: value }) }
          min={ 1 }
          max={ 12 }
        />
        <SelectControl
          key="resolution-input"
          label={ __('Resolution') }
          select={ resolution }
          options={ resolutionOptions }
          onChange={ (value) => setAttributes({ resolution: value }) }
          value={ resolution }
        />
        <ToggleControl
          key="gutter-input"
          label={ __('Add a gutter between images.' ) }
          checked={ gutter }
          onChange={ () => setAttributes({ gutter: !gutter }) }
        />
        <ToggleControl
          key="links-input"
          label={ __('Wrap the images with a link to the photo on Instagram.' ) }
          checked={ links }
          onChange={ () => setAttributes({ links: !links }) }
        />
        <ToggleControl
          key="caption-input"
          label={ __('Display caption.' ) }
          checked={ caption }
          onChange={ () => setAttributes({ caption: !caption }) }
        />
        {searchInput}
      </InspectorControls>
    );

    const controls = (
      <Fragment>
        { inspectorControls }
      </Fragment>
    );


    return (
      <Fragment>
        { controls }
        { (!search || !this.state.isDoneTyping) ?
            searchInput
          : (
            <ServerSideRender
              block="genero/instafeed"
              attributes={ attributes }
            />
          )
        }
      </Fragment>
    );
  }
}
