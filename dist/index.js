!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=1)}([function(e,t){e.exports=wp.components},function(e,t,n){n(2),n(8),e.exports=n(9)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={instagram:React.createElement("svg",{width:"20px",height:"20px",viewBox:"0 0 1792 1792",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zm-502-220q-7 0-76.5-.5t-105.5 0-96.5 3-103 10-71.5 18.5q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103 18.5 71.5q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103-18.5-71.5q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124t-124-322q-5-88-5-317t5-317q10-208 124-322t322-124q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z"}))},o=n(3),a=n(0),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a["ServerSideRender"]),i(t,[{key:"componentDidUpdate",value:function(e,t){Object(o.isEqual)(e,this.props)||this.fetch(this.props),this.state.response!==t.response&&this.props.onUpdate&&this.props.onUpdate()}}]),t}(),u=n(4),l=n(5),c=n(6),p=n(7),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var b=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return Object(p.subscribe)(e.subscribe.bind(e)),e.serverSideRef=Object(l.createRef)(),e.initMasonry=e.initMasonry.bind(e),e.reflowMasonry=e.reflowMasonry.bind(e),e.sidebarOpen=!1,e.masonryElement=null,e.state={isDoneTyping:!0,timer:null},e.duration=1e3,e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l["Component"]),f(t,[{key:"subscribe",value:function(){var e=!!Object(p.select)("core/edit-post").getActiveGeneralSidebarName();e!==this.sidebarOpen&&(window.setTimeout(this.reflowMasonry,200),this.sidebarOpen=e)}},{key:"initMasonry",value:function(){if(this.serverSideRef.current){var e=Object(l.findDOMNode)(this.serverSideRef.current),t=jQuery(e).find(".js-masonry");if(t.length&&!t.data("masonry")){var n=t.data("masonry-options")||{};window.setTimeout(function(){return t.masonry(n)},1e3),this.masonryElement=t}}}},{key:"reflowMasonry",value:function(){this.masonryElement&&this.masonryElement.masonry("layout")}},{key:"render",value:function(){var e=this,t=this.props,n=t.attributes,r=t.setAttributes,o=n.links,i=n.limit,p=n.resolution,f=n.search,b=n.gutter,g=n.caption,d=n.layout,m=[{value:"thumbnail",label:Object(u.__)("thumbnail (150x150)","wp-gutenberg-instafeed")},{value:"small",label:Object(u.__)("small (240x240)","wp-gutenberg-instafeed")},{value:"medium",label:Object(u.__)("medium (320x320)","wp-gutenberg-instafeed")},{value:"large",label:Object(u.__)("large (640x640)","wp-gutenberg-instafeed")}],y=[{value:"masonry",label:Object(u.__)("masonry","wp-gutenberg-instafeed")},{value:"grid",label:Object(u.__)("grid","wp-gutenberg-instafeed")},{value:"fit",label:Object(u.__)("fit together","wp-gutenberg-instafeed")}],h=React.createElement(c.InspectorControls,null,React.createElement(a.SelectControl,{key:"layout-input",label:Object(u.__)("Layout","wp-gutenberg-instafeed"),value:d,onChange:function(e){return r({layout:e})},select:d,options:y}),React.createElement(a.RangeControl,{key:"limit-input",label:Object(u.__)("Limit","wp-gutenberg-instafeed"),value:i,onChange:function(e){return r({limit:e})},min:1,max:12}),React.createElement(a.SelectControl,{key:"resolution-input",label:Object(u.__)("Resolution","wp-gutenberg-instafeed"),select:p,options:m,onChange:function(e){return r({resolution:e})},value:p}),React.createElement(a.ToggleControl,{key:"gutter-input",label:Object(u.__)("Add a gutter between images.","wp-gutenberg-instafeed"),checked:b,onChange:function(){return r({gutter:!b})}}),React.createElement(a.ToggleControl,{key:"links-input",label:Object(u.__)("Wrap the images with a link to the photo on Instagram.","wp-gutenberg-instafeed"),checked:o,onChange:function(){return r({links:!o})}}),React.createElement(a.ToggleControl,{key:"caption-input",label:Object(u.__)("Display caption.","wp-gutenberg-instafeed"),checked:g,onChange:function(){return r({caption:!g})}})),w=React.createElement(c.RichText,{key:"search-input",format:"string",tagName:"h3",keepPlaceholderOnFocus:"true",autocompleters:[],style:{textAlign:"center"},value:f,onChange:function(t){clearTimeout(e.state.timer);var n=setTimeout(function(){return e.setState({isDoneTyping:!0})},e.duration);e.setState({isDoneTyping:!1,timer:n}),r({search:t})},placeholder:Object(u.__)("@username or #hashtag","wp-gutenberg-instafeed")});return React.createElement(l.Fragment,null,h,w,f&&this.state.isDoneTyping?React.createElement(l.Fragment,null,React.createElement(s,{block:"genero/instafeed",attributes:n,onUpdate:this.initMasonry,ref:this.serverSideRef})):React.createElement("div",{key:"loading",className:"wp-block-embed is-loading"},React.createElement("p",null,Object(u.__)("Type a username or hashtag to search for in the field above...","wp-gutenberg-instafeed"))))}}]),t}(),g=wp.i18n.__;(0,wp.blocks.registerBlockType)("genero/instafeed",{title:g("Instagram feed","wp-gutenberg-instafeed"),icon:r.instagram,category:"embed",supports:{html:!1,align:["center","wide","full"]},keywords:[g("instagram","wp-gutenberg-instafeed"),g("instafeed","wp-gutenberg-instafeed"),g("social","wp-gutenberg-instafeed")],edit:b,save:function(){return null}})},function(e,t){e.exports=lodash},function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.element},function(e,t){e.exports=wp.editor},function(e,t){e.exports=wp.data},function(e,t){},function(e,t){}]);