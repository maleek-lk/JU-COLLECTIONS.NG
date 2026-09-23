/* =========================================================
   JU COLLECTIONS
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SETTINGS
       ===================================================== */

    // Replace this with the client's real WhatsApp number.
    // Format: country code + number, without + or spaces.
    const WHATSAPP_NUMBER = "2347034393016";


    /* =====================================================
       PRODUCT DATA
       ===================================================== */

    const products = [

        // GIFTS

        {
            name: "Gift Box",
            category: "gifts",
            categoryName: "Gifts",
            folder: "gift_box",
            image: "gift_box-01.jpg",
            description: "Beautifully curated gift boxes for memorable moments."
        },

        {
            name: "Gift Bag",
            category: "gifts",
            categoryName: "Gifts",
            folder: "gift_bag",
            image: "gift_bag-01.jpg",
            description: "Elegant gift bags ready to complete your special moment."
        },

        {
            name: "Chocolate Box",
            category: "gifts",
            categoryName: "Gifts",
            folder: "chocolate_box",
            image: "chocolate_box-01.jpg",
            description: "A sweet addition to birthdays, celebrations and thoughtful surprises."
        },

        {
            name: "Qur'an Gift Box",
            category: "gifts",
            categoryName: "Gifts",
            folder: "Qur'an_gift_box",
            image: "Qur'an_gift_box-01.jpg",
            description: "A meaningful gift curated for faith, reflection and special occasions."
        },

        {
            name: "Flask",
            category: "gifts",
            categoryName: "Gifts",
            folder: "flask",
            image: "flask-01.jpg",
            description: "A practical and stylish addition to a personalized gift."
        },


        // FASHION

        {
            name: "Abaya",
            category: "fashion",
            categoryName: "Fashion",
            folder: "abaya",
            image: "abaya-01.jpg",
            description: "Elegant modest wear designed for a refined everyday look."
        },

        {
            name: "Jalabiya",
            category: "fashion",
            categoryName: "Fashion",
            folder: "jalabiya",
            image: "jalabiya-01.jpg",
            description: "Relaxed elegance with a polished, sophisticated finish."
        },


        // BAGS

        {
            name: "Hand Bag",
            category: "bags",
            categoryName: "Bags",
            folder: "hand_bag",
            image: "hand_bag-01.jpg",
            description: "Statement handbags selected to complement your style."
        },


        // SHOES

        {
            name: "Men's Shoes",
            category: "shoes",
            categoryName: "Shoes",
            folder: "male_shoes",
            image: "male_shoes-01.jpg",
            description: "Polished footwear for everyday style and special occasions."
        },


        // BEAUTY

        {
            name: "Perfume",
            category: "beauty",
            categoryName: "Beauty",
            folder: "perfume",
            image: "perfume-01.jpg",
            description: "Fragrance pieces that add the finishing touch to any gift."
        }

    ];


    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    const productGrid =
        document.getElementById("productGrid");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const categoryCards =
        document.querySelectorAll(".category-card");

    const menuButton =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const modal =
        document.getElementById("productModal");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modalClose =
        document.getElementById("modalClose");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalWhatsApp =
        document.getElementById("modalWhatsApp");

    const toast =
        document.getElementById("toast");

    const year =
        document.getElementById("year");


    /* =====================================================
       YEAR
       ===================================================== */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       PRODUCT IMAGE PATH
       ===================================================== */

    function getImagePath(product) {

        return (
            "assets/" +
            product.folder +
            "/" +
            product.image
        );

    }


    /* =====================================================
       ESCAPE HTML
       Prevents product data from breaking markup.
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       RENDER PRODUCTS
       ===================================================== */

    function renderProducts(filter = "all") {

        if (!productGrid) {
            return;
        }

        const filteredProducts =
            filter === "all"
                ? products
                : products.filter(
                    product =>
                        product.category === filter
                );


        if (!filteredProducts.length) {

            productGrid.innerHTML = `
                <div class="empty-products">
                    No products found.
                </div>
            `;

            return;
        }


        productGrid.innerHTML =
            filteredProducts
                .map((product, index) => {

                    const name =
                        escapeHTML(product.name);

                    const category =
                        escapeHTML(product.categoryName);

                    const description =
                        escapeHTML(product.description);

                    const image =
                        getImagePath(product);

                    return `
                        <article
                            class="product-card"
                            data-index="${products.indexOf(product)}"
                            style="--delay:${index * 0.05}s"
                        >

                            <div class="product-image">

                                <img
                                    src="${image}"
                                    alt="${name}"
                                    loading="lazy"
                                >

                                <span class="product-tag">
                                    ${category}
                                </span>

                            </div>

                            <div class="product-info">

                                <h3>
                                    ${name}
                                </h3>

                                <p>
                                    ${description}
                                </p>

                            </div>

                        </article>
                    `;

                })
                .join("");


        attachProductEvents();

    }


    /* =====================================================
       PRODUCT EVENTS
       ===================================================== */

    function attachProductEvents() {

        const cards =
            document.querySelectorAll(
                ".product-card"
            );


        cards.forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            card.dataset.index
                        );

                    const product =
                        products[index];

                    if (product) {
                        openProductModal(product);
                    }

                }
            );

        });


        /*
         * Fallback for missing images.
         */

        const images =
            document.querySelectorAll(
                ".product-image img"
            );


        images.forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                }
            );

        });

    }


    /* =====================================================
       FILTER PRODUCTS
       ===================================================== */

    function setFilter(filter) {

        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === filter
            );

        });


        renderProducts(filter);

    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;

                setFilter(filter);

                scrollToShop();

            }
        );

    });


    /* =====================================================
       CATEGORY CARDS
       ===================================================== */

    categoryCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const filter =
                    card.dataset.filter;

                setFilter(filter);

                scrollToShop();

            }
        );

    });


    /* =====================================================
       SCROLL TO SHOP
       ===================================================== */

    function scrollToShop() {

        const shop =
            document.getElementById("shop");

        if (!shop) {
            return;
        }

        shop.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================================
       PRODUCT MODAL
       ===================================================== */

    function openProductModal(product) {

        if (!modal) {
            return;
        }


        const image =
            getImagePath(product);


        modalImage.src =
            image;

        modalImage.alt =
            product.name;


        modalTitle.textContent =
            product.name;


        modalCategory.textContent =
            product.categoryName;


        modalDescription.textContent =
            product.description;


        const message =
            `Hello JU Collections, I'm interested in the ${product.name}. Please send me the available options and price.`;


        modalWhatsApp.href =
            createWhatsAppLink(message);


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeProductModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProductModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProductModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeProductModal();

            }

        }
    );


    /* =====================================================
       WHATSAPP
       ===================================================== */

    function createWhatsAppLink(message) {

        return (
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message)
        );

    }


    function setupWhatsAppLinks() {

        const links =
            document.querySelectorAll(
                ".whatsapp-link"
            );


        links.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const message =
                        link.dataset.message ||
                        "Hello JU Collections, I'd like to make an enquiry.";

                    const url =
                        createWhatsAppLink(message);

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        });

    }


    setupWhatsAppLinks();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "active"
                );

                const isOpen =
                    mobileMenu.classList.contains(
                        "active"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen
                );

                menuButton.textContent =
                    isOpen ? "×" : "☰";

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    menuButton.textContent =
                        "☰";

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .hero-content, .hero-visual"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(min-width: 851px)"
        ).matches
    ) {

        let ticking = false;


        window.addEventListener(
            "mousemove",
            event => {

                if (ticking) {
                    return;
                }

                window.requestAnimationFrame(
                    () => {

                        const x =
                            (
                                event.clientX /
                                window.innerWidth
                            ) - 0.5;

                        const y =
                            (
                                event.clientY /
                                window.innerHeight
                            ) - 0.5;


                        const mainCard =
                            document.querySelector(
                                ".hero-card-main"
                            );

                        const smallCard =
                            document.querySelector(
                                ".hero-card-small"
                            );

                        const orb =
                            document.querySelector(
                                ".hero-orb"
                            );


                        if (mainCard) {

                            mainCard.style.transform =
                                `
                                rotate(5deg)
                                translate(
                                    ${x * 10}px,
                                    ${y * 10}px
                                )
                                `;

                        }


                        if (smallCard) {

                            smallCard.style.transform =
                                `
                                rotate(-8deg)
                                translate(
                                    ${x * -8}px,
                                    ${y * -8}px
                                )
                                `;

                        }


                        if (orb) {

                            orb.style.transform =
                                `
                                translate(
                                    ${x * 8}px,
                                    ${y * 8}px
                                )
                                `;

                        }


                        ticking = false;

                    }
                );

                ticking = true;

            }
        );

    }


    /* =====================================================
       IMAGE FALLBACK FOR HERO
       ===================================================== */

    document
        .querySelectorAll(
            ".hero-card img"
        )
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                }
            );

        });


    /* =====================================================
       TOAST
       ===================================================== */

    let toastTimer;


    function showToast(message) {

        if (!toast) {
            return;
        }


        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );


        clearTimeout(
            toastTimer
        );


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2500
            );

    }


    /* =====================================================
       INITIAL RENDER
       ===================================================== */

    renderProducts("all");


    /* =====================================================
       IMAGE PRELOAD
       ===================================================== */

    /*
     * Preloads the first image from each
     * collection to make the initial experience
     * feel faster on mobile.
     */

    products.forEach(product => {

        const image =
            new Image();

        image.src =
            getImagePath(product);

    });

});
