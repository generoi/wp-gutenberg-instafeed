<?php

namespace GeneroWP\BlockInstafeed\instafeed;

use GeneroWP\Common\Singleton;
use GeneroWP\Common\Templating;

class Instafeed
{
    use Singleton;
    use Templating;

    const HASHTAG = 'h';
    const USERNAME = 'u';

    public function __construct()
    {
        register_block_type('genero/instafeed', array(
            'attributes' => [
                'align' => [
                    'type' => 'string',
                ],
                'search' => [
                    'type' => 'string',
                    'default' => '',
                ],
                'links' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'gutter' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'layout' => [
                    'type' => 'string',
                    'default' => 'masonry',
                ],
                'caption' => [
                    'type' => 'boolean',
                    'default' => false,
                ],
                'limit' => [
                    'type' => 'number',
                    'default' => 12,
                ],
                'resolution' => [
                    'type' => 'string',
                    'default' => 'thumbnail',
                ],
            ],
            'render_callback' => [$this, 'render'],
        ));
    }

    public function render($attributes)
    {
        if (empty($attributes['search'])) {
            return '';
        }
        $classes[] = !empty($attributes['align']) ? "align{$attributes['align']}" : '';
        $classes[] = !empty($attributes['gutter']) ? 'has-gutter' : '';
        $classes[] = !empty($attributes['layout']) ? "is-{$attributes['layout']}": '';
        $classes[] = !empty($attributes['resolution']) ? "is-{$attributes['resolution']}": '';
        $attributes['classes'] = array_filter($classes);
        $attributes['media'] = $this->getMedia($attributes);

        if ($attributes['layout'] === 'masonry') {
            wp_enqueue_script('masonry');
            $attributes['masonry'] = [
                'itemSelector' => '.wp-block-genero-instafeed__item',
                'fitWidth' => true,
            ];
        }

        return $this->template('gutenberg', 'views/instafeed.php', $attributes);
    }

    public function getMedia($attributes)
    {
        $search = $attributes['search'];
        $type = $this->getSearchType($search);
        $transient_id = "genero-insta-{$type}-" . sanitize_title_with_dashes($search);
        $cache_time = apply_filters('wp-genero-gutenberg/instafeed/cachetime', DAY_IN_SECONDS);

        if (!($data = get_transient($transient_id))) {
            $media = $this->scrape($type, $search);
            $media = $this->normalize($media);

            $data = base64_encode(serialize($media));
            set_transient($transient_id, $data, $cache_time);
            return $media;
        }

        return unserialize(base64_decode($data));
    }

    /**
     * @see https://github.com/scottsweb/wp-instagram-widget/blob/master/wp-instagram-widget.php
     */
    public function scrape($type, $search)
    {
        $search = str_replace(['#', '@'], '', $search);
        switch ($type) {
            case self::HASHTAG:
                $url = "https://instagram.com/explore/tags/{$search}";
                break;
            default:
                $url = "https://instagram.com/{$search}";
                break;
        }

        $remote = wp_remote_get($url);
        if (is_wp_error($remote)) {
            return new \WP_Error('site_down', esc_html__('Unable to communicate with Instagram.', 'wp-genero-gutenberg'));
        }
        if (wp_remote_retrieve_response_code($remote) !== 200) {
            return new \WP_Error('invalid_response', esc_html__('Instagram did not return a 200.', 'wp-genero-gutenberg'));
        }

        $shards = explode('window._sharedData = ', $remote['body']);
        $html  = explode(';</script>', $shards[1]);
        $json = json_decode($html[0]);

        if (!$json) {
            return new \WP_Error('bad_json', esc_html__('Instagram has returned invalid data.', 'wp-genero-gutenberg'));
        }

        $media = $json->entry_data->ProfilePage[0]->graphql->user->edge_owner_to_timeline_media->edges ?? null;
        if (!$media) {
            $media = $json->entry_data->TagPage[0]->graphql->hashtag->edge_hashtag_to_media->edges ?? null;
        }
        if (!$media) {
            return new \WP_Error('bad_json_2', esc_html__('Instagram has returned invalid data.', 'wp-genero-gutenberg'));
        }
        if (!is_array($media)) {
            return new \WP_Error('bad_array', esc_html__('Instagram has returned invalid data.', 'wp-genero-gutenberg'));
        }
        return $media;
    }

    public function normalize($media)
    {
        $result = [];
        foreach ($media as $single) {
            $caption = $single->node->edge_media_to_caption->edges[0]->node->text ?? '';

            $object = new \stdClass;
            $object->type = $single->node->is_video ? 'video' : 'image';
            $object->caption = wp_kses($caption, []);
            $object->link = trailingslashit('https://instagram.com/p/' . $single->node->shortcode);
            $object->time = $single->node->taken_at_timestamp;
            $object->comments = $single->node->edge_media_to_comment->count;
            $object->likes = $single->node->edge_liked_by->count;
            $object->media = (object) [
                'thumbnail'   => $single->node->thumbnail_resources[0],
                'small'       => $single->node->thumbnail_resources[1],
                'medium'      => $single->node->thumbnail_resources[2],
                'large'       => $single->node->thumbnail_resources[4],
            ];

            $result[] = $object;
        }
        return $result;
    }

    public function getSearchType($search)
    {
        $search = trim(strtolower($search));
        switch (substr($search, 0, 1)) {
            case '#':
                return self::HASHTAG;
            default:
                return self::USERNAME;
        }
    }
}

Instafeed::getInstance();
