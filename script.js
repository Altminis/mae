class Carousel {

    /**
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {number} [options.slidesToScroll = 1] nombres d'éléments à faire défiler
     * @param {number} [options.slidesVisible = 1] nombres d'éléments visibles dans un slide
     * @param {boolean} [options.loop = false ] affiche ou non les boutons de scroll
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options);
        let children = [...element.children];
        this.isMobile = false;
        this.currentItem = 0;
        this.moveCallbacks = [];

        //Modification du DOM
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel__container');  
        this.root.setAttribute('tabindex', 0);
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.items = children.map(child => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child);
            this.container.appendChild(item);
            return item;
        })
        this.setStyle();
        this.createNavigation();
        

        //Evenements
        this.moveCallbacks.forEach(cb => cb(0));
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.root.addEventListener('keyup', e => {
            if(e.key === 'ArrowRight' || e.key === 'Right') {
                this.next();
            } else if(e.key === 'ArrowLeft' || e.key === 'Left') {
                this.prev();
            }
        })
    }

    /**
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    /**
     * Applique les bonnes dimension au carousel
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = `${ratio * 100}%`;
        this.items.forEach(item =>  item.style.width = ((100 / this.slidesVisible) / ratio) + "%");
    }

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        if(this.options.loop) {
            return;
        }
        this.onMove(index => {
            if(index === 0) {
                prevButton.classList.add('carousel__prev--hidden');
            } else {
                prevButton.classList.remove('carousel__prev--hidden');
            }

            if(this.items[this.currentItem + this.options.slidesVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden');
            } else {
                nextButton.classList.remove('carousel__next--hidden');
            
            }
        })
    }

    next() {
        this.goToItem(this.currentItem + this.slidesToScroll);
    }

    prev() {
        this.goToItem(this.currentItem - this.slidesToScroll);
    }

    /**
     * Scroll sur l' element ciblé
     * @param {number} index 
     */
    goToItem(index) {
        if(index < 0) {
            if(this.options.loop) {
                index = this.items.length - this.slidesVisible;
            } else {
                return;
            }
            
        } else if ( index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
            if(this.options.loop) {
                index = 0;
            } else {
                return;
            }
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = `translate3d(${translateX}%, 0, 0)`;
        this.currentItem = index;
        this.moveCallbacks.forEach(cb => cb(index));
    }

    onMove(cb) {
        this.moveCallbacks.push(cb);
    }

    onWindowResize() {
        let mobile = window.innerWidth < 800;
        if(this.isMobile !== mobile) {
            this.isMobile = mobile;
            this.setStyle();
            this.moveCallbacks.forEach(cb => cb(this.currentItem));
        }
    }
    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll;
    }

    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible;
    }
}


window.onload = function () {

    //Carousel//
    const carousel = document.querySelector('#temoignage');

    new Carousel(carousel, {
        slidesToScroll: 1,
        slidesVisible: 3,
        loop: true
    })
    // Variables declaration and initialization

    //Variables for the navbar
    const nav = document.querySelector('.myNav');
    const topOfNav = nav.offsetTop;
    const offresContainer = document.querySelector('#offres');
    const offres = offresContainer.querySelectorAll('.offre');
    const boutonBurger = document.querySelector('.toggle-nav');
    const listNav = document.querySelector('.myNav ul');
    const formContact = document.querySelector('.form-contact');
    const submitContact = formContact.querySelector('[type="submit"]');
    const name = formContact.querySelector('[name="name"]');
    const tel = formContact.querySelector('[name="tel"]');
    const email = formContact.querySelector('[name="email"]');
    const formFieldToCheck = 2;
    const messageError = {
        name: 'Veuillez saisir votre nom et prénom',
        contact: 'Vous devez saisir un numéro de téléphone ou une adresse éléctronique'
    }

    const nonEmptyRegexp = /^[A-Za-z]+$/;
    const telephoneRegexp = /^\+?[0-9 ._-]+$/
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // Daily Event

    //Events for navbar
    window.addEventListener('scroll', fixNav);
    function fixNav() {

        if (window.innerWidth > 740 && window.scrollY > topOfNav) {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
            document.body.classList.add('fixed-nav');
        } else if (window.innerWidth <= 740) {
            document.body.classList.add('fixed-nav');
        } else {
            document.body.style.paddingTop = 0;
            document.body.classList.remove('fixed-nav');
        }
    }

    function updateOffersHeight() {
        const height = [...offres].reduce((max, item) => {
            return max < item.offsetHeight ? item.offsetHeight : max;
        }, 0);
        offres.forEach(item => {
            item.style.height = `${height}px`;
        });
    }

    window.addEventListener('resize', updateOffersHeight);
    updateOffersHeight();

    boutonBurger.addEventListener('click', toggleNav);
    function toggleNav(e) {
        this.classList.toggle('active');
        listNav.classList.toggle('active');
        e.preventDefault();
    }

    name.addEventListener('input', handleForm);
    tel.addEventListener('input', handleForm);
    email.addEventListener('input', handleForm);
    function handleForm(e) {
        submitContact.disabled = !(calculateError() >= formFieldToCheck);
    }

    name.addEventListener('focusout', cleanInput);
    tel.addEventListener('focusout', cleanInput);
    email.addEventListener('focusout', cleanInput);
    function cleanInput(e) {

        switch (e.target.name) {
            case 'name':
                if (!nonEmptyRegexp.exec(name.value)) {
                    e.target.placeholder = messageError.name;
                    e.target.value = "";
                }
                break;
            case 'tel':
            case 'email':
                if (!(telephoneRegexp.exec(tel.value) || emailRegexp.exec(email.value))) {
                    e.target.placeholder = messageError.contact;
                    e.target.value = "";
                }
                break;
            default:
        }

    }

    function calculateError() {
        let score = 0;
        if (nonEmptyRegexp.exec(name.value)) {
            score++;
        }
        if (telephoneRegexp.exec(tel.value) || emailRegexp.exec(email.value)) {
            score++;
        }
        return score;
    }
}




