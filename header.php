<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <div id="page" class="site">
        <header id="masthead" class="site-header" role="banner">
            <div class="header-container">
                <div class="site-branding">
                    <?php
                    if (has_custom_logo()) {
                        the_custom_logo();
                    } elseif (is_front_page() && is_home()) {
                        echo '<h1 class="site-title"><a href="' . esc_url(home_url('/')) . '" rel="home">' . get_bloginfo('name') . '</a></h1>';
                    } else {
                        echo '<p class="site-title"><a href="' . esc_url(home_url('/')) . '" rel="home">' . get_bloginfo('name') . '</a></p>';
                    }
                    // Opcionalmente, puedes añadir la descripción del sitio si lo deseas
                    // $description = get_bloginfo('description', 'display');
                    // if ($description || is_customize_preview()) {
                    //     echo '<p class="site-description">' . $description . '</p>';
                    // }
                    ?>
                </div>
                <nav id="site-navigation" class="main-navigation" role="navigation">
                    <button class="menu-button lets-talk-button">LET'S TALK</button>
                    <button class="menu-button menu-toggle">MENU</button>
                </nav>
            </div>
        </header>
        <div id="content" class="site-content">