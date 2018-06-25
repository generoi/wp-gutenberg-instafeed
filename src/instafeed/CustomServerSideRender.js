import isEqual from 'lodash/isEqual';

const { ServerSideRender } = wp.components;

// https://github.com/WordPress/gutenberg/issues/7346
export class CustomServerSideRender extends ServerSideRender {
  componentDidUpdate(prevProps, prevState) {
    // core
    if (!isEqual(prevProps, this.props)) {
      this.fetch(this.props);
    }
    // custom
    if (this.state.response !== prevState.response) {
      if (this.props.onUpdate) {
        this.props.onUpdate();
      }
    }
  }
}

export default CustomServerSideRender;
