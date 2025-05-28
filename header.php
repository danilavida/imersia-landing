<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?> <?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <div id="page" class="site">
        <header id="masthead" class="site-header" role="banner">
            <div class="site-branding">
                <p class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"
                        rel="home"><?php bloginfo('name'); ?></a></p>
                <p class="site-description"><?php bloginfo('description'); ?></p>
            </div>
            <nav id="site-navigation" class="main-navigation" role="navigation">
            </nav>
        </header>
        <div id="content" class="site-content">