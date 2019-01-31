window.onload = function () {
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
                if(!nonEmptyRegexp.exec(name.value)){
                    e.target.placeholder = messageError.name;
                    e.target.value = "";
                }
                break;
            case 'tel':
            case 'email':
                if(!(telephoneRegexp.exec(tel.value) || emailRegexp.exec(email.value))){
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




