document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM cargado - Listo para GSAP')

    window.addEventListener(
        'load',
        function (e) {
            console.log('Ventana cargada - Todos los recursos listos')

            // --- Animación para el botón "LET'S TALK" ---
            const letsTalkButton = document.querySelector('.lets-talk-button')
            if (letsTalkButton) {
                const buttonText = letsTalkButton.querySelector('.button-text')
                const iconDot = letsTalkButton.querySelector('.button-icon.dot')
                
                gsap.set(iconDot, { x: 0, opacity: 1, scale: 1, rotation: 0 })
                gsap.set(buttonText, { x: 0, opacity: 1 })

                const tlLetsTalkEnter = gsap.timeline({ paused: true })
                tlLetsTalkEnter
                    .to(
                        letsTalkButton,
                        { duration: 0.3, backgroundColor: '#0016ec', ease: 'power1.out' },
                        0
                    )
                    .to(
                        letsTalkButton,
                        { duration: 0.2, scale: 1.05, ease: 'power1.out' },
                        0
                    )
                    .to(
                        iconDot,
                        {
                            duration: 0.3,
                            x: 5,
                            scale: 1.3,
                            rotation: 360,
                            ease: 'power2.out'
                        },
                        0
                    ) // El punto salta y gira
                    .to(buttonText, { duration: 0.3, x: 10, ease: 'power1.out' }, 0) // El texto se mueve un poco

                const tlLetsTalkLeave = gsap.timeline({ paused: true })
                tlLetsTalkLeave
                    .to(
                        letsTalkButton,
                        {
                            duration: 0.3,
                            backgroundColor: '#2b2e3a',
                            scale: 1.0,
                            ease: 'power1.in'
                        },
                        0
                    )
                    .to(
                        iconDot,
                        {
                            duration: 0.3,
                            x: 0,
                            scale: 1,
                            rotation: 0,
                            opacity: 1,
                            ease: 'power2.in'
                        },
                        0
                    )
                    .to(
                        buttonText,
                        { duration: 0.3, x: 0, opacity: 1, ease: 'power1.in' },
                        0
                    )

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

                // Estado inicial
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
                    // Animación para los puntos: un pequeño "baile" y luego rotación
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
                    ) // Se aplastan y vuelven
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
                    ) // Rotan con rebote
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
