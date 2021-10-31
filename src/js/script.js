const hamburgerLine = document.querySelector('.hamburger__line')
const menuList = document.querySelector('.nav-menu__link__list')
document.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains('hamburger__line' || e.target.classList.contains('hamburger__icon'))) {
        hamburgerLine.classList.toggle("hamburger__active");
        menuList.classList.toggle('nav-menu__active');
    } else {
        hamburgerLine.classList.remove("hamburger__active");
        menuList.classList.remove('nav-menu__active');
    }
});