import * as THREE from 'three' //
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js' // <-- AÑADIR ESTA LÍNEA

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

            const heroTitle = document.querySelector('.hero-title')
            const heroSubtitle = document.querySelector('.hero-subtitle')

            if (heroTitle && heroSubtitle) {
                const tlHeroText = gsap.timeline({
                    defaults: { duration: 0.8, ease: 'power2.out' } // Duración y ease por defecto
                })

                tlHeroText
                    .to(heroTitle, {
                        opacity: 1,
                        y: 0
                    })
                    .to(
                        heroSubtitle,
                        {
                            opacity: 1,
                            y: 0
                        },
                        '-=0.5'
                    )
            }

            const interactiveContainer = document.querySelector('.interactive-container')
            const interactiveShape = document.querySelector('.interactive-shape')

            if (interactiveContainer && interactiveShape) {
                const parallaxFactor = 1 // Cuánto se moverá la forma (más pequeño = menos movimiento)
                const rotationFactor = 2 // Cuánto rotará la forma

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

                interactiveContainer.addEventListener('mousemove', (event) => {
                    const rect = interactiveContainer.getBoundingClientRect()

                    const mouseX = event.clientX
                    const mouseY = event.clientY

                    const containerCenterX = rect.left + rect.width / 2
                    const containerCenterY = rect.top + rect.height / 2

                    const deltaX = (mouseX - containerCenterX) / (rect.width / 2)
                    const deltaY = (mouseY - containerCenterY) / (rect.height / 2)

                    shapeX(deltaX * -(rect.width * parallaxFactor))
                    shapeY(deltaY * -(rect.height * parallaxFactor))

                    shapeRotX(deltaY * -(20 * rotationFactor))
                    shapeRotY(deltaX * (20 * rotationFactor))
                })

                interactiveContainer.addEventListener('mouseleave', () => {
                    gsap.to(interactiveShape, {
                        duration: 0.8,
                        x: 0,
                        y: 0,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        ease: 'elastic.out(1, 0.75)'
                    })
                })

                gsap.set(interactiveContainer, { perspective: 800 })
                gsap.set(interactiveShape, { transformStyle: 'preserve-3d' })
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

            const threeCanvas = document.getElementById('three-canvas')

            if (threeCanvas) {
                // 1. Escena
                const scene = new THREE.Scene()
                // Opcional: Color de fondo para la escena (si no quieres que sea transparente)
                // scene.background = new THREE.Color(0x1a1c24); // Mismo color que .interactive-container

                // 2. Cámara
                // Usaremos las dimensiones del contenedor padre para el aspect ratio
                const container = document.querySelector('.interactive-container')
                const camera = new THREE.PerspectiveCamera(
                    75, // FOV (Campo de visión)
                    container.clientWidth / container.clientHeight, // Aspect ratio
                    0.1, // Near clipping plane
                    1000 // Far clipping plane
                )
                camera.position.z = 5 // Ajusta esto según el tamaño de tu modelo

                // 3. Renderer
                const renderer = new THREE.WebGLRenderer({
                    canvas: threeCanvas,
                    antialias: true, // Para bordes más suaves
                    alpha: true // Para fondo transparente y ver el fondo del .interactive-container
                })
                renderer.setSize(container.clientWidth, container.clientHeight)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Para pantallas de alta resolución

                const controls = new OrbitControls(camera, renderer.domElement)
                controls.enableDamping = true // Suaviza el movimiento (inercia)
                controls.dampingFactor = 0.05 // Factor de suavizado
                controls.screenSpacePanning = false // Controla cómo se hace el paneo
                controls.minDistance = 2 // Distancia mínima de zoom
                controls.maxDistance = 10 // Distancia máxima de zoom
                // controls.autoRotate = true; // Descomenta para que rote automáticamente al inicio
                // controls.autoRotateSpeed = 0.5; // Velocidad de autorotación

                // Ajusta el "target" de los controles si tu modelo no está en el origen (0,0,0)
                // o si quieres que rote alrededor de un punto específico del modelo.
                // Por defecto, es THREE.Vector3(0,0,0).
                // Ejemplo: Si tu modelo está centrado en Y=-1:
                // controls.target.set(0, -1, 0);

                // 4. Luces (muy importante para ver el modelo glb)
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) // Luz ambiental suave
                scene.add(ambientLight)

                const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5) // Luz direccional más fuerte
                directionalLight.position.set(5, 10, 7.5) // Posición de la luz
                scene.add(directionalLight)

                // 5. Cargar el modelo GLB
                const loader = new GLTFLoader()
                // Reemplaza 'URL_DE_TU_MODELO.glb' con la URL real de tu archivo .glb subido a la biblioteca de medios
                // Puedes obtener esta URL desde la biblioteca de medios de WordPress después de subir el archivo.
                const modelUrl =
                    'http://imersia-awesome.local/wp-content/uploads/2025/05/Quest3.glb' // <<<<------ ¡¡ACTUALIZA ESTA URL!!

                let model // Para guardar una referencia al modelo cargado

                loader.load(
                    modelUrl,
                    function (gltf) {
                        model = gltf.scene
                        // Opcional: Ajustar la escala o posición del modelo si es necesario
                        // model.scale.set(0.5, 0.5, 0.5);
                        // model.position.y = -1; // Ejemplo para centrarlo
                        scene.add(model)
                        console.log('Modelo 3D cargado correctamente.')
                    },
                    undefined, // función onProgress (opcional)
                    function (error) {
                        console.error('Error al cargar el modelo 3D:', error)
                    }
                )

                // 6. Bucle de animación (Render Loop)
                function animate() {
                    requestAnimationFrame(animate)

                    controls.update()

                    renderer.render(scene, camera)
                }
                animate()

                // 7. Manejo de redimensionamiento de ventana (para que el canvas sea responsivo)
                window.addEventListener('resize', () => {
                    camera.aspect = container.clientWidth / container.clientHeight
                    camera.updateProjectionMatrix()
                    renderer.setSize(container.clientWidth, container.clientHeight)
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
                })

                // 8. Integrar con tu animación de GSAP existente (para el parallax del modelo)
                // La animación de .interactive-shape debe ahora aplicarse al 'model' o a la 'scene'/'camera'
                const interactiveContainer = document.querySelector(
                    '.interactive-container'
                ) // Ya lo tienes arriba
                // Elimina la lógica de GSAP para 'interactiveShape' y sus quickTo
                // if (interactiveContainer && interactiveShape) { ... }

                if (interactiveContainer && model) {
                    // O espera a que el modelo se cargue
                    // Esta parte es conceptual y puede necesitar ajustes una vez el modelo esté cargado
                    // Sería mejor meter esta lógica DENTRO del callback de loader.load o asegurar que 'model' existe.
                }
                // La lógica de GSAP para mover la forma (.interactive-shape) que tenías:
                // const parallaxFactor = 0.09;
                // const rotationFactor = 0.11;
                // ... y los event listeners 'mousemove' y 'mouseleave' ...
                // Ahora deberías aplicar estas rotaciones/posiciones a 'model.rotation.x', 'model.rotation.y',
                // 'model.position.x', 'model.position.y', etc.
                // O podrías rotar un Group que contenga el modelo.

                // ----- INICIO: Reemplazo de animación GSAP para modelo 3D -----
                // (Esta parte debe activarse DESPUÉS de que el modelo se cargue)
                // Para simplificar, la pondremos aquí, pero idealmente se inicializa
                // o se activa una vez 'model' está definido.

                // function setupModelInteraction(targetModel) {
                //     if (!interactiveContainer || !targetModel) return

                //     const parallaxFactor = 0.05 // Puedes ajustar estos valores
                //     const rotationFactor = 0.3 // Puedes ajustar estos valores

                //     // Usamos gsap.quickTo para actualizaciones de movimiento del mouse fluidas y optimizadas
                //     const modelRotX = gsap.quickTo(targetModel.rotation, 'x', {
                //         duration: 0.6,
                //         ease: 'power3.out'
                //     })
                //     const modelRotY = gsap.quickTo(targetModel.rotation, 'y', {
                //         duration: 0.6,
                //         ease: 'power3.out'
                //     })
                //     // Para movimiento de parallax (opcional, podría ser confuso con la rotación)
                //     // const modelPosX = gsap.quickTo(targetModel.position, 'x', { duration: 0.6, ease: 'power3.out' });
                //     // const modelPosY = gsap.quickTo(targetModel.position, 'y', { duration: 0.6, ease: 'power3.out' });

                //     interactiveContainer.addEventListener('mousemove', (event) => {
                //         const rect = interactiveContainer.getBoundingClientRect()
                //         const mouseX = event.clientX
                //         const mouseY = event.clientY
                //         const containerCenterX = rect.left + rect.width / 2
                //         const containerCenterY = rect.top + rect.height / 2
                //         const deltaX = (mouseX - containerCenterX) / (rect.width / 2)
                //         const deltaY = (mouseY - containerCenterY) / (rect.height / 2)

                //         // Aplicar rotación basada en la posición del mouse
                //         modelRotX(deltaY * -rotationFactor) // Rota en X basado en movimiento Y del mouse
                //         modelRotY(deltaX * rotationFactor) // Rota en Y basado en movimiento X del mouse

                //         // Opcional: Parallax
                //         // modelPosX(deltaX * -(rect.width * parallaxFactor * 0.1)); // Movimiento más sutil para posición
                //         // modelPosY(deltaY * (rect.height * parallaxFactor * 0.1));
                //     })

                //     interactiveContainer.addEventListener('mouseleave', () => {
                //         gsap.to(targetModel.rotation, {
                //             duration: 0.8,
                //             x: 0,
                //             y: 0,
                //             ease: 'elastic.out(1, 0.75)'
                //         })
                //         // Opcional: Resetear posición si usaste parallax
                //         // gsap.to(targetModel.position, {
                //         //     duration: 0.8, x: 0, y: 0, // Asegúrate que la posición inicial sea (0,0) o la que desees
                //         //     ease: 'elastic.out(1, 0.75)'
                //         // });
                //     })
                // }

                // Modifica el callback de carga del modelo para llamar a setupModelInteraction
                loader.load(
                    modelUrl,
                    function (gltf) {
                        model = gltf.scene
                        // Centrar el modelo si su pivote no está en el centro
                        const box = new THREE.Box3().setFromObject(model)
                        const center = box.getCenter(new THREE.Vector3())
                        model.position.sub(center) // Mueve el modelo para que su centro geométrico sea (0,0,0)

                        // Escalar si es necesario (ejemplo)
                        const desiredSize = 5 // Tamaño deseado para la dimensión más grande
                        const currentSize = box.getSize(new THREE.Vector3())
                        const scale =
                            desiredSize /
                            Math.max(currentSize.x, currentSize.y, currentSize.z)
                        model.scale.set(scale, scale, scale)

                        scene.add(model)
                        console.log('Modelo 3D cargado correctamente.')
                        // setupModelInteraction(model)
                    },
                    undefined,
                    function (error) {
                        console.error('Error al cargar el modelo 3D:', error)
                    }
                )
                // ----- FIN: Reemplazo de animación GSAP para modelo 3D -----
            } else {
                console.error("No se encontró el elemento canvas con id 'three-canvas'.")
            }
        },

        false
    )
})
