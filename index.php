<?php
/**
 * El archivo de plantilla principal.
 */

get_header(); // Incluye header.php
?>

<main id="main" class="site-main" role="main">

    <?php if (have_posts()): ?>
        <?php while (have_posts()):
            the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                </header>
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
            </article><?php endwhile; ?>
    <?php else: ?>
        <p><?php _e('No se encontró contenido.', 'imersia-landing'); ?></p>
    <?php endif; ?>

</main>
<?php
get_footer(); // Incluye footer.php
?>