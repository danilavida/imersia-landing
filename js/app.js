import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

document.addEventListener('DOMContentLoaded', function (event) {
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

            // The GSAP animation logic for .interactive-shape (parallax effect)
            // has been removed as it's being replaced by the 3D model interaction.
            // The new interaction logic is within the setupModelInteraction function.

            // --- Animación para la sección "SCROLL TO EXPLORE" ---
            const scrollPromptContainer = document.querySelector(
                '.page-scroll-prompt-container'
            )

            if (scrollPromptContainer) {
                gsap.to(scrollPromptContainer, {
                    y: '-10px', 
                    duration: 1.8, 
                    ease: 'sine.inOut', 
                    repeat: -1, 
                    yoyo: true 
                })
            }

            const threeCanvas = document.getElementById('three-canvas')

            if (threeCanvas) {
                const scene = new THREE.Scene()
                const container = document.querySelector('.interactive-container')
                const camera = new THREE.PerspectiveCamera(
                    75,
                    container.clientWidth / container.clientHeight,
                    0.1,
                    1000
                )
                camera.position.z = 5

                const renderer = new THREE.WebGLRenderer({
                    canvas: threeCanvas,
                    antialias: true,
                    alpha: true
                })
                renderer.setSize(container.clientWidth, container.clientHeight)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

                const controls = new OrbitControls(camera, renderer.domElement)
                controls.enableDamping = true
                controls.dampingFactor = 0.05
                controls.screenSpacePanning = false
                controls.minDistance = 2
                controls.maxDistance = 10
                // controls.autoRotate = true;
                // controls.autoRotateSpeed = 0.5;
                // controls.target.set(0, -1, 0); 

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
                scene.add(ambientLight)

                const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
                directionalLight.position.set(5, 10, 7.5)
                scene.add(directionalLight)

                const loader = new GLTFLoader()
                const modelUrl = 'http://imersia-awesome.local/wp-content/uploads/2025/05/Quest3.glb' // User needs to update this URL

                let model

                // Render Loop
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

                // Load the model
                loader.load(
                    modelUrl,
                    function (gltf) {
                        model = gltf.scene
                        const box = new THREE.Box3().setFromObject(model)
                        const center = box.getCenter(new THREE.Vector3())
                        model.position.sub(center) 

                        const desiredSize = 5 
                        const currentSize = box.getSize(new THREE.Vector3())
                        const scale =
                            desiredSize /
                            Math.max(currentSize.x, currentSize.y, currentSize.z)
                        model.scale.set(scale, scale, scale)

                        scene.add(model)
                        console.log('Modelo 3D cargado correctamente.')
                        setupModelInteraction(model)
                    },
                    undefined, // onProgress callback (optional)
                    function (error) {
                        console.error('Error al cargar el modelo 3D:', error)
                    }
                )

                function setupModelInteraction(targetModel) {
                    if (!container || !targetModel) return

                    const rotationFactor = 0.3 // Adjust as needed

                    const modelRotX = gsap.quickTo(targetModel.rotation, 'x', {
                        duration: 0.6,
                        ease: 'power3.out'
                    })
                    const modelRotY = gsap.quickTo(targetModel.rotation, 'y', {
                        duration: 0.6,
                        ease: 'power3.out'
                    })

                    container.addEventListener('mousemove', (event) => {
                        const rect = container.getBoundingClientRect()
                        const mouseX = event.clientX
                        const mouseY = event.clientY
                        const containerCenterX = rect.left + rect.width / 2
                        const containerCenterY = rect.top + rect.height / 2
                        const deltaX = (mouseX - containerCenterX) / (rect.width / 2)
                        const deltaY = (mouseY - containerCenterY) / (rect.height / 2)

                        modelRotX(deltaY * -rotationFactor) // Rotate on X based on mouse Y movement
                        modelRotY(deltaX * rotationFactor) // Rotate on Y based on mouse X movement
                    })

                    container.addEventListener('mouseleave', () => {
                        gsap.to(targetModel.rotation, {
                            duration: 0.8,
                            x: 0,
                            y: 0,
                            ease: 'elastic.out(1, 0.75)'
                        })
                    })
                }
            } else {
                console.error("No se encontró el elemento canvas con id 'three-canvas'.")
            }
        },

        false
    )
})
