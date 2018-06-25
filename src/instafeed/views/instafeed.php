<div class="wp-block-genero-instafeed <?php echo implode(' ', $classes); ?>">
  <?php if (!empty($search)) : ?>
    <h2 class="wp-block-genero-instafeed__title"><?php echo esc_html($search); ?></h2>
  <?php endif; ?>
  <div class="wp-block-genero-instafeed__list<?php echo !empty($masonry) ? ' js-masonry' : '' ?>" <?php if (!empty($masonry)) : ?>data-masonry-options='<?php echo json_encode($masonry); ?>'<?php endif; ?>>
    <?php foreach (array_slice($media, 0, $limit) as $instance) : ?>
      <div class="wp-block-genero-instafeed__item">
        <?php if ($links) : ?>
          <a class="wp-block-genero-instafeed__link" href="<?php echo $instance->link; ?>" target="_blank">
        <?php endif; ?>
          <figure class="wp-block-genero-instafeed__figure">
            <?php $image = $instance->media->{$resolution}; ?>
            <?php $description = preg_replace('/\s+/', ' ', esc_attr($instance->caption)); ?>
            <img
              class="wp-block-genero-instafeed__image"
              src="<?php echo esc_url($image->src); ?>"
              width="<?php echo esc_attr($image->config_width); ?>"
              height="<?php echo esc_attr($image->config_height); ?>"
              alt="<?php echo $description; ?>"
              title="<?php echo $description; ?>"
            />
            <?php if ($caption) : ?>
              <figcaption class="wp-block-genero-instafeed__caption">
                <p><?php echo wp_trim_words($description, 80); ?></p>
              </figcaption>
            <?php endif; ?>
          </figure>
        <?php if ($links) : ?>
          </a>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
