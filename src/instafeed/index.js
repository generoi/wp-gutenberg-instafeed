import './style.scss';
import './editor.scss';
import blockIcons from './icons'
import InstafeedBlock from './block';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('genero/instafeed', {
  title: __('Instagram feed', 'wp-gutenberg-instafeed'),
  icon: blockIcons.instagram,
  category: 'embed',
  supports: {
    html: false,
    align: ['center', 'wide', 'full'],
  },
  keywords: [
    __('instagram', 'wp-gutenberg-instafeed'),
    __('instafeed', 'wp-gutenberg-instafeed'),
    __('social', 'wp-gutenberg-instafeed'),
  ],

  edit: InstafeedBlock,

  save: () => {
    return null;
  },
});

