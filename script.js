window.onload = function(){
    // Variables declaration and initialization

    //Variables for the navbar
    const nav = document.querySelector('.myNav');
    const topOfNav = nav.offsetTop;


    // Daily Event

    //Events for navbar
    window.addEventListener('scroll', fixNav);
    function fixNav(){
        console.log(window.scrollY, topOfNav);
        if(window.scrollY> topOfNav){
            document.body.style.paddingTop = nav.offsetHeight + 'px';
            document.body.classList.add('fixed-nav');
        }else{
            document.body.style.paddingTop = 0;
            document.body.classList.remove('fixed-nav');
        }
    }
}