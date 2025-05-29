<?php


get_header(); // Incluye header.php
?>

<main id="main" class="site-main" role="main">

    <section class="hero-text-section">
        <div class="hero-text-container">
            <h1 class="hero-title">Transforma tu negocio con las soluciones XR de Imersia</h1>
            <p class="hero-subtitle">Imersia se especializa en crear experiencias personalizadas de Realidad Extendida
                (XR) que impulsan la innovación y el compromiso para empresas de todos los sectores.</p>
        </div>
    </section>

    <section class="page-scroll-prompt-section">
        <div class="page-scroll-prompt-container">
            <span class="plus-icon">+</span>
            <span class="plus-icon inner-plus">+</span>
            <span class="scroll-text-content">SCROLL TO EXPLORE</span>
            <span class="plus-icon inner-plus">+</span>
            <span class="plus-icon">+</span>
        </div>
    </section>

    <section class="interactive-shape-section">
        <div class="interactive-container">
            <canvas id="three-canvas" class="interactive-3d-canvas"></canvas>
            <div class="interactive-shape">
            </div>
        </div>
    </section>

</main>
<?php
get_footer();
?>