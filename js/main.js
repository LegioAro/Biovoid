$(document).ready(function () {
    $('.burger').click(function (event) {
        $('.burger,.header__navigation').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.header__navigation').click(function (event) {
        $('.header__navigation,.burger').removeClass('active');
        $('body').removeClass('lock');
    })
});