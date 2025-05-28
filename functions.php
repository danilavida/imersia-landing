<?php
/**
 * Funciones y definiciones del tema Imersia Landing.
 */

// Por ahora, este archivo está casi vacío.
// Aquí agregaremos funciones para encolar estilos, scripts,
// registrar menús, áreas de widgets, y otras funcionalidades del tema.

if (!function_exists('imersia_landing_setup')):
    /**
     * Configuración básica del tema.
     */
    function imersia_landing_setup()
    {
        // Añade soporte para title-tag. El tema no necesita añadir <title> en header.php
        add_theme_support('title-tag');

        // Añade soporte para miniaturas de entradas (Featured Images)
        add_theme_support('post-thumbnails');

        // Registra un menú de navegación
        register_nav_menus(array(
            'primary' => esc_html__('Menú Principal', 'imersia-landing'),
        ));

        // Habilitar soporte para HTML5 en ciertos elementos
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));

        // Soporte para logo personalizado
        add_theme_support('custom-logo', array(
            'height' => 100, // Define la altura máxima sugerida para tu logo
            'width' => 400, // Define el ancho máximo sugerido para tu logo
            'flex-height' => true,
            'flex-width' => true,
        ));
    }
endif; // imersia_landing_setup
add_action('after_setup_theme', 'imersia_landing_setup');

/**
 * Encolar scripts y estilos.
 */
function imersia_landing_scripts()
{
    // Encola el archivo style.css principal del tema.
    wp_enqueue_style('imersia-landing-style', get_stylesheet_uri());

    // Si tienes otros archivos CSS, los encolarías aquí.
    // Ejemplo: wp_enqueue_style( 'imersia-landing-custom', get_template_directory_uri() . '/css/custom.css' );

    // Si tienes archivos JavaScript, los encolarías aquí.
    // Ejemplo: wp_enqueue_script( 'imersia-landing-custom-js', get_template_directory_uri() . '/js/custom.js', array('jquery'), '1.0', true );
}
add_action('wp_enqueue_scripts', 'imersia_landing_scripts');

?>