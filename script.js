window.onload = function () {
    // Variables declaration and initialization

    //Variables for the navbar
    const nav = document.querySelector('.myNav');
    const topOfNav = nav.offsetTop;
    const offresContainer = document.querySelector('#offres');
    const offres = offresContainer.querySelectorAll('.offre');

    // Daily Event

    //Events for navbar
    window.addEventListener('scroll', fixNav);
    function fixNav() {
        if (window.scrollY > topOfNav) {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
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

}