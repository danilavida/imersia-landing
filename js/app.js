document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM cargado - Listo para GSAP')

    window.addEventListener(
        'load',
        function (e) {
            console.log('Ventana cargada - Todos los recursos listos')

            const letsTalkButton = document.querySelector('.lets-talk-button')
            if (letsTalkButton) {
                const buttonText = letsTalkButton.querySelector('.button-text')
                const iconDot = letsTalkButton.querySelector('.button-icon.dot')
                const buttonRipple = letsTalkButton.querySelector('.button-ripple')

                gsap.set(iconDot, { scale: 1, opacity: 1 })
                gsap.set(buttonText, { scale: 1, opacity: 1 })
                gsap.set(buttonRipple, { scale: 0, opacity: 0.5 })

                const tlLetsTalkEnter = gsap.timeline({
                    paused: true,
                    defaults: { duration: 0.4, ease: 'power1.out' }
                })
                tlLetsTalkEnter
                    .to(letsTalkButton, { backgroundColor: '#0016ec', scale: 1.05 }, 0)
                    .to(buttonText, { scale: 1.03 }, 0)

                    .to(iconDot, { scale: 1.3, yoyo: true, repeat: 1, duration: 0.2 }, 0)

                    .fromTo(
                        buttonRipple,
                        { scale: 0, opacity: 0.7 },
                        { scale: 8, opacity: 0, duration: 0.6, ease: 'power2.out' },
                        0
                    )

                const tlLetsTalkLeave = gsap.timeline({
                    paused: true,
                    defaults: { duration: 0.3, ease: 'power1.in' }
                })
                tlLetsTalkLeave
                    .to(letsTalkButton, { backgroundColor: '#2b2e3a', scale: 1.0 }, 0)
                    .to(buttonText, { scale: 1.0 }, 0)
                    .to(iconDot, { scale: 1.0 }, 0)

                letsTalkButton.addEventListener('mouseenter', () =>
                    tlLetsTalkEnter.restart()
                )
                letsTalkButton.addEventListener('mouseleave', () =>
                    tlLetsTalkLeave.restart()
                )
            }

            // --- Animación para el botón "MENU" ---
            const menuButton = document.querySelector('.menu-toggle')
            if (menuButton) {
                const menuText = menuButton.querySelector('.button-text')
                const menuIconDots = menuButton.querySelector('.button-icon.dots')

                gsap.set(menuIconDots, { rotation: 0, scale: 1 })
                gsap.set(menuText, { x: 0 })

                const tlMenuEnter = gsap.timeline({ paused: true })
                tlMenuEnter
                    .to(
                        menuButton,
                        {
                            duration: 0.3,
                            backgroundColor: '#ffffff',
                            color: '#2b2e3a',
                            ease: 'power1.out'
                        },
                        0
                    )
                    .to(menuButton, { duration: 0.2, scale: 1.05, ease: 'power1.out' }, 0)

                    .to(
                        menuIconDots,
                        {
                            duration: 0.15,
                            scaleY: 0.7,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.out'
                        },
                        0
                    )
                    .to(
                        menuIconDots,
                        {
                            duration: 0.3,
                            rotation: 90,
                            transformOrigin: 'center center',
                            ease: 'bounce.out',
                            delay: 0.1
                        },
                        0
                    )
                    .to(menuText, { duration: 0.3, x: -5, ease: 'power1.out' }, 0)

                const tlMenuLeave = gsap.timeline({ paused: true })
                tlMenuLeave
                    .to(
                        menuButton,
                        {
                            duration: 0.3,
                            backgroundColor: '#e4e6ef',
                            color: '#333333',
                            scale: 1.0,
                            ease: 'power1.in'
                        },
                        0
                    )
                    .to(
                        menuIconDots,
                        { duration: 0.3, rotation: 0, scale: 1, ease: 'power1.in' },
                        0
                    )
                    .to(menuText, { duration: 0.3, x: 0, ease: 'power1.in' }, 0)

                menuButton.addEventListener('mouseenter', () => tlMenuEnter.restart())
                menuButton.addEventListener('mouseleave', () => tlMenuLeave.restart())
            }

            // --- Animación para el LOGO ---
            const logo = document.querySelector('.custom-logo')

            if (logo) {
                const feTurbulence = document.querySelector('#liquidFilter feTurbulence')
                const feDisplacementMap = document.querySelector(
                    '#liquidFilter feDisplacementMap'
                )

                if (feTurbulence && feDisplacementMap) {
                    let hoverAnimation = null

                    logo.addEventListener('mouseenter', () => {
                        gsap.to(feDisplacementMap, {
                            duration: 0.3,
                            attr: { scale: 19 },
                            ease: 'power2.out'
                        })
                        gsap.to(feTurbulence, {
                            duration: 0.3,
                            attr: { baseFrequency: '0.03 0.07' },
                            ease: 'power2.out'
                        })

                        let turbulenceAttrs = {
                            seed: parseFloat(feTurbulence.getAttribute('seed')) || 0
                        }
                        hoverAnimation = gsap.to(turbulenceAttrs, {
                            seed: turbulenceAttrs.seed + 7,
                            duration: 1,
                            ease: 'none',
                            repeat: -1,
                            onUpdate: function () {
                                feTurbulence.setAttribute(
                                    'seed',
                                    Math.floor(this.targets()[0].seed)
                                )
                            }
                        })
                    })

                    logo.addEventListener('mouseleave', () => {
                        gsap.to(feDisplacementMap, {
                            duration: 0.9,
                            attr: { scale: 0 },
                            ease: 'power2.in'
                        })
                        gsap.to(feTurbulence, {
                            duration: 0.5,
                            attr: { baseFrequency: '0.04 0.08' },
                            ease: 'power2.in'
                        })

                        if (hoverAnimation) {
                            hoverAnimation.kill()
                        }
                    })
                } else {
                    console.error(
                        'No se pudieron encontrar los elementos del filtro SVG (#liquidFilter feTurbulence/feDisplacementMap). Asegúrate de que el SVG del filtro esté en el DOM.'
                    )
                }
            }

            // --- Animación para el Texto Hero ---
            const heroTitle = document.querySelector('.hero-title')
            const heroSubtitle = document.querySelector('.hero-subtitle')

            if (heroTitle && heroSubtitle) {
                const tlHeroText = gsap.timeline({
                    defaults: { duration: 0.8, ease: 'power2.out' } // Duración y ease por defecto
                })

                tlHeroText
                    .to(heroTitle, {
                        opacity: 1,
                        y: 0 // Mover a su posición final (desde translateY(-60px))
                    })
                    .to(
                        heroSubtitle,
                        {
                            opacity: 1,
                            y: 0 // Mover a su posición final (desde translateY(-40px))
                        },
                        '-=0.5'
                    ) // Inicia 0.5s antes de que termine la animación anterior (superposición)
            }

            const interactiveContainer = document.querySelector('.interactive-container')
            const interactiveShape = document.querySelector('.interactive-shape')

            if (interactiveContainer && interactiveShape) {
                // Factores para la animación (puedes jugar con estos valores)
                const parallaxFactor = 0.09 // Cuánto se moverá la forma (más pequeño = menos movimiento)
                const rotationFactor = 0.11 // Cuánto rotará la forma

                // Usamos gsap.quickTo para actualizaciones de movimiento del mouse fluidas y optimizadas
                // Estas funciones se configuran una vez y luego se llaman con el nuevo valor.
                const shapeX = gsap.quickTo(interactiveShape, 'x', {
                    duration: 0.6,
                    ease: 'power3.out'
                })
                const shapeY = gsap.quickTo(interactiveShape, 'y', {
                    duration: 0.6,
                    ease: 'power3.out'
                })
                const shapeRotX = gsap.quickTo(interactiveShape, 'rotationX', {
                    duration: 0.6,
                    ease: 'power3.out'
                })
                const shapeRotY = gsap.quickTo(interactiveShape, 'rotationY', {
                    duration: 0.6,
                    ease: 'power3.out'
                })
                // Podríamos añadir también rotationZ si quieres un giro plano
                // const shapeRotZ = gsap.quickTo(interactiveShape, "rotationZ", { duration: 0.6, ease: "power3.out" });

                interactiveContainer.addEventListener('mousemove', (event) => {
                    const rect = interactiveContainer.getBoundingClientRect()

                    // Coordenadas del mouse relativas al viewport
                    const mouseX = event.clientX
                    const mouseY = event.clientY

                    // Centro del contenedor interactivo
                    const containerCenterX = rect.left + rect.width / 2
                    const containerCenterY = rect.top + rect.height / 2

                    // Diferencia entre la posición del mouse y el centro del contenedor
                    // Normalizamos un poco dividiendo por el ancho/alto para que el efecto no sea extremo
                    const deltaX = (mouseX - containerCenterX) / (rect.width / 2) // Rango de -1 a 1 aprox.
                    const deltaY = (mouseY - containerCenterY) / (rect.height / 2) // Rango de -1 a 1 aprox.

                    // Aplicar el movimiento de parallax (dirección opuesta al mouse)
                    // Multiplicamos por un factor para controlar la "fuerza" del movimiento
                    shapeX(deltaX * -(rect.width * parallaxFactor)) // Mueve en X
                    shapeY(deltaY * -(rect.height * parallaxFactor)) // Mueve en Y

                    // Aplicar rotación basada en la posición del mouse
                    // El mouse moviéndose horizontalmente (deltaX) rota en el eje Y
                    // El mouse moviéndose verticalmente (deltaY) rota en el eje X
                    shapeRotX(deltaY * -(20 * rotationFactor)) // Rota en X (ej. max 20 grados)
                    shapeRotY(deltaX * (20 * rotationFactor)) // Rota en Y (ej. max 20 grados)
                    // shapeRotZ(deltaX * (10 * rotationFactor)); // Ejemplo de rotación plana
                })

                interactiveContainer.addEventListener('mouseleave', () => {
                    // Volver la forma a su posición y rotación original suavemente
                    gsap.to(interactiveShape, {
                        duration: 0.8,
                        x: 0,
                        y: 0,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0, // Asegúrate de resetear rotationZ si la usas
                        ease: 'elastic.out(1, 0.75)' // Un ease elástico para un retorno agradable
                    })
                })

                // Para que la rotación 3D se vea bien, el elemento padre (o la forma misma)
                // podría necesitar 'transform-style: preserve-3d;' y el contenedor un 'perspective'.
                // Añadamos esto con GSAP para asegurar que se aplique:
                gsap.set(interactiveContainer, { perspective: 800 }) // Perspectiva en el contenedor
                gsap.set(interactiveShape, { transformStyle: 'preserve-3d' }) // Para la forma
            }

            // --- Animación para la sección "SCROLL TO EXPLORE" ---
            const scrollPromptContainer = document.querySelector(
                '.page-scroll-prompt-container'
            )

            if (scrollPromptContainer) {
                // Animación sutil de "bobbing" (sube y baja)
                gsap.to(scrollPromptContainer, {
                    y: '-10px', // Mover 10px hacia arriba
                    duration: 1.8, // Duración de un ciclo de la animación (subir y bajar)
                    ease: 'sine.inOut', // Tipo de easing para un movimiento suave
                    repeat: -1, // Repetir la animación indefinidamente
                    yoyo: true // Hace que la animación vaya y vuelva (sube, luego baja)
                })
            }
        },

        false
    )
})
