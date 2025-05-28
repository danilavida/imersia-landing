</div>
<footer id="colophon" class="site-footer" role="contentinfo">
    <div class="site-info">
        &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Todos los derechos reservados.
    </div>
</footer>
</div>
<svg style="position:absolute; width:0; height:0; overflow:hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <filter id="liquidFilter">

            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" seed="0"
                result="turbulenceOutput" />

            <feDisplacementMap in="SourceGraphic" in2="turbulenceOutput" scale="0" xChannelSelector="R"
                yChannelSelector="G" result="displacementOutput" />

            <!-- <feGaussianBlur in="displacementOutput" stdDeviation="1" /> -->

        </filter>
    </defs>
</svg>

<?php wp_footer(); ?>
</body>

</html>