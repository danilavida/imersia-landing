<?php


if (!function_exists('imersia_landing_setup')):

    function imersia_landing_setup()
    {

        add_theme_support('title-tag');

        add_theme_support('post-thumbnails');

        register_nav_menus(array(
            'primary' => esc_html__('Menú Principal', 'imersia-landing'),
        ));

        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));

        add_theme_support('custom-logo', array(
            'height' => 100,
            'width' => 400,
            'flex-height' => true,
            'flex-width' => true,
        ));
    }
endif;

// Hooks
add_action('after_setup_theme', 'imersia_landing_setup');
add_action('wp_head', 'imersia_landing_add_three_js_importmap', 1);
add_action('wp_enqueue_scripts', 'imersia_landing_scripts');
add_action('admin_head', 'imersia_landing_fix_svg_thumb_display');
add_filter('upload_mimes', 'imersia_landing_mime_types');
add_filter('script_loader_tag', 'imersia_add_type_attribute_to_script', 10, 3);

function imersia_landing_add_three_js_importmap()
{
    $three_version = '0.176.0';
    ?>
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@<?php echo $three_version; ?>/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@<?php echo $three_version; ?>/examples/jsm/"
        }
    }
    </script>
    <?php
}

function imersia_landing_scripts()
{
    wp_enqueue_style('imersia-landing-style', get_stylesheet_uri());
    wp_enqueue_script('gsap-js', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', array(), '3.13.0', true);
    wp_enqueue_script('imersia-landing-animations', get_template_directory_uri() . '/js/app.js', array('gsap-js'), '1.0', true);
}

function imersia_add_type_attribute_to_script($tag, $handle, $src)
{
    if ('imersia-landing-animations' === $handle) {
        $tag = '<script type="module" src="' . esc_url($src) . '" id="' . esc_attr($handle) . '-js"></script>';
    }
    return $tag;
}

function imersia_landing_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

function imersia_landing_fix_svg_thumb_display()
{
    echo '<style>
    td.media-icon img[src$=".svg"],
    img[src$=".svg"].attachment-post-thumbnail {
        width: 100% !important;
        height: auto !important;
    }
    </style>';
}
?>