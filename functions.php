<?php
/**
 * Funciones y definiciones del tema Imersia Landing.
 */

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

function imersia_landing_scripts()
{
    wp_enqueue_style('imersia-landing-style', get_stylesheet_uri());

}
add_action('wp_enqueue_scripts', 'imersia_landing_scripts');

?>