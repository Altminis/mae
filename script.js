window.onload = function(){
    // Variables declaration and initialization

    //Variables for the navbar
    const nav = document.querySelector('.myNav');
    const topOfNav = nav.offsetTop;
    const boutonBurger = document.querySelector('.toggle-nav');
    const listNav = document.querySelector('.myNav ul');


    // Daily Event

    //Events for navbar
    window.addEventListener('scroll', fixNav);
    function fixNav(){
        if(window.scrollY> topOfNav){
            document.body.style.paddingTop = nav.offsetHeight + 'px';
            document.body.classList.add('fixed-nav');
        }else{
            document.body.style.paddingTop = 0;
            document.body.classList.remove('fixed-nav');
        }
    }

    boutonBurger.addEventListener('click', toggleNav);
    function toggleNav(e){
        this.classList.toggle('active');
        listNav.classList.toggle('active');
        e.preventDefault();
    }

}




