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

                // Estado inicial
                gsap.set(iconDot, { scale: 1, opacity: 1 })
                gsap.set(buttonText, { scale: 1, opacity: 1 })
                gsap.set(buttonRipple, { scale: 0, opacity: 0.5 }) // Onda invisible y semi-opaca al inicio

                const tlLetsTalkEnter = gsap.timeline({
                    paused: true,
                    defaults: { duration: 0.4, ease: 'power1.out' }
                })
                tlLetsTalkEnter
                    .to(letsTalkButton, { backgroundColor: '#0016ec', scale: 1.05 }, 0)
                    .to(buttonText, { scale: 1.03 }, 0)
                    // Animación del punto: un "latido"
                    .to(iconDot, { scale: 1.3, yoyo: true, repeat: 1, duration: 0.2 }, 0)
                    // Animación de la onda: expandir y desvanecer
                    .fromTo(
                        buttonRipple,
                        { scale: 0, opacity: 0.7 }, // Estado inicial de la onda para la animación
                        { scale: 8, opacity: 0, duration: 0.6, ease: 'power2.out' }, // Se expande y desaparece
                        0
                    ) // Inicia al mismo tiempo que las otras animaciones

                const tlLetsTalkLeave = gsap.timeline({
                    paused: true,
                    defaults: { duration: 0.3, ease: 'power1.in' }
                })
                tlLetsTalkLeave
                    .to(letsTalkButton, { backgroundColor: '#2b2e3a', scale: 1.0 }, 0)
                    .to(buttonText, { scale: 1.0 }, 0)
                    .to(iconDot, { scale: 1.0 }, 0) // El punto vuelve a su escala normal

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
        },
        false
    )
})
