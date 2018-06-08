const { ServerSideRender } = wp.components;
const { findDOMNode } = wp.element;

export class CustomServerSideRender extends ServerSideRender {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidUpdate() {
    this.onUpdate(findDOMNode(this));
  }

  onUpdate(event) {
    if (this.props.onUpdate) {
      this.props.onUpdate(event);
    }
  }
}

export default CustomServerSideRender;
