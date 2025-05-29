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
            'height' => 100, // Define la altura máxima sugerida para tu logo
            'width' => 400, // Define el ancho máximo sugerido para tu logo
            'flex-height' => true,
            'flex-width' => true,
        ));
    }
endif;
add_action('after_setup_theme', 'imersia_landing_setup');

function imersia_landing_add_three_js_importmap()
{
    // Reemplaza <version> con la versión específica que quieres, ej: 0.164.1 o la que encontraste 0.176.0
    // Asegúrate de que la versión en el importmap coincida con la que usarás.
    // La información que pasaste dice 0.176.0, así que la usaremos.
    $three_version = '0.176.0'; // O la versión más reciente compatible que desees usar
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
add_action('wp_head', 'imersia_landing_add_three_js_importmap', 1); // '1' para prioridad alta

function imersia_landing_scripts()
{
    wp_enqueue_style('imersia-landing-style', get_stylesheet_uri());


    wp_enqueue_script('gsap-js', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', array(), '3.13.0', true);

    wp_enqueue_script('imersia-landing-animations', get_template_directory_uri() . '/js/app.js', array('gsap-js'), '1.0', true);

    wp_enqueue_script('imersia-landing-animations', get_template_directory_uri() . '/js/app.js', array('gsap-js'), '1.0', true); //
    add_filter('script_loader_tag', 'imersia_add_type_attribute_to_script', 10, 3);
    // Si en el futuro usas plugins de GSAP como ScrollTrigger, los añadirías aquí también,
    // por ejemplo:
    // wp_enqueue_script( 'gsap-st', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', array('gsap-js'), '3.13.0', true ); 
}
add_action('wp_enqueue_scripts', 'imersia_landing_scripts');

function imersia_add_type_attribute_to_script($tag, $handle, $src)
{
    // Solo añade type="module" a tu script 'imersia-landing-animations'
    if ('imersia-landing-animations' === $handle) {
        $tag = '<script type="module" src="' . esc_url($src) . '" id="' . esc_attr($handle) . '-js"></script>';
    }
    return $tag;
}

// Habilitar la subida de archivos SVG
function imersia_landing_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'imersia_landing_mime_types');

// Opcional: Mostrar miniaturas de SVG en la biblioteca de medios (puede no ser perfecto para todos los SVGs)
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
add_action('admin_head', 'imersia_landing_fix_svg_thumb_display');

?>