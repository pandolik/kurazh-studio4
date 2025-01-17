document.addEventListener('DOMContentLoaded', function () {

// ICON ARROW
    const arrowTop = document.getElementById('arrowTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            arrowTop.style.display = 'flex';
        } else {
            arrowTop.style.display = 'none';
        }
    });
    arrowTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

// Open menu
    document.addEventListener('click', documentClick);
    function documentClick(e) {
        const targetItem = e.target;
        if (targetItem.closest('.icon-menu')) {
            document.documentElement.classList.toggle('menu-open');
        }
    }

// Click on the button, opening a hidden block. Section Projects
    const button = document.getElementById("button-our-projects-more");
    const blocks = document.querySelectorAll(".block-container");
    button.addEventListener("click", function () {
        blocks.forEach((block) => {
            // Проверяем текущее состояние блока
            if (block.style.display === "none" || block.style.display === "") {
                block.style.display = "flex"; // Если скрыт или не определен, показываем блок
            } else {
                block.style.display = "none"; // Если отображается, скрываем блок
            }
        });
    });

// HEADER, FOOTER LINKS
    document.querySelectorAll('.link__menu').forEach(function (link) {
        link.addEventListener('click', function (event) {
            // Find the element with the data-target attribute
            var targetElement = event.target.closest('[data-target]');
            if (!targetElement) return; // Exit if no such element

            var targetSelector = targetElement.getAttribute('data-target');
            var block = document.querySelector(targetSelector);
            if (block) {
                block.classList.add('block-outlined');
                block.scrollIntoView({ behavior: 'smooth' });
                setTimeout(function () {
                    block.classList.remove('block-outlined');
                    document.documentElement.classList.remove('menu-open');
                }, 100);
            }
        });
    });

// DOWNLOAD IMAGE
    const downloadButton = document.querySelector('.slider__circle span');
    const image = document.getElementById('enlarged-image');

    downloadButton.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = 'image.jpg';  // Имя файла при скачивании
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

// Button Default Container
    document.getElementById('default__button').addEventListener('click', function () {
        var block = document.querySelector('.section-wrapper__projects');
        block.classList.add('block-outlined');
        block.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function () {
            block.classList.remove('block-outlined');
        }, 1000); // Remove the outlined effect after 1 second (1000 milliseconds)
    });

// Animation in Main section
    function fadeInOnScroll(elementId, duration) {
        var distance = window.innerWidth; 
        var op = 0; 
        var interval = 1;
        var increment = interval / duration;
        var element = document.getElementById(elementId);
        var isVisible = false;

        function fadeIn() {
            if (!isVisible && isElementInViewport(element)) {
                isVisible = true;
                var timer = setInterval(function () {
                    op += increment;
                    if (op >= 1) {
                        clearInterval(timer);
                    }
                    element.style.opacity = op;
                    distance -= increment * window.innerWidth; // Уменьшаем расстояние на ширину окна, чтобы анимация была справа налево
                    element.style.transform = `translateX(-${distance}px)`; 
                }, interval);
            }
        }

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        window.addEventListener('scroll', fadeIn);
    }




// Animation in Default-container section
    const fadeInElements = ['default-container__p', 'default-container__text', 'classes', 'curators__title', 'about-us__title', 'contact__title'];

    fadeInElements.forEach(elementId => {
        fadeInOnScroll(elementId, 100);
    });

// OPEN ANSVER in QUESTION
    // const buttons = document.querySelectorAll('.question__button');
    // let activeContent = null;
    // let activeButton = null;

    // buttons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         const content = button.nextElementSibling;

    //         if (activeContent && activeContent !== content) {
    //             activeContent.classList.remove('active');
    //             activeButton.querySelector('svg').classList.remove('rotate');
    //         }

    //         if (content.classList.contains('active')) {
    //             content.classList.remove('active');
    //             button.querySelector('svg').classList.remove('rotate');
    //             activeContent = null;
    //             activeButton = null;
    //         } else {
    //             content.classList.add('active');
    //             button.querySelector('svg').classList.add('rotate');
    //             activeContent = content;
    //             activeButton = button;
    //         }
    //     });
    // });

// PLAYER ANIMATION - BLOCK APPEAREANS
    // const playerWrapper = document.querySelector('.player__wrapp');

    // if (playerWrapper) {
    //     const playerObserver = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 playerWrapper.classList.add('visible');
    //                 playerObserver.unobserve(playerWrapper); // Остановить наблюдение после срабатывания
    //             }
    //         });
    //     }, {
    //         threshold: 0.2
    //     });
    //     playerObserver.observe(playerWrapper);
    // } else {
    //     console.error('Player wrapper not found');
    // }

// ABOUT US ANIMATION - BLOCK APPEAREANS
const usBodySections = document.querySelectorAll('.us__body');

usBodySections.forEach(usBodySection => {
    const usBodyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                usBodyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    usBodyObserver.observe(usBodySection);
});

const aboutUsSectionReverse = document.querySelector('.about-us__body.about-us__body--reverse');
const aboutUsObserverReverse = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            aboutUsObserverReverse.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});
aboutUsObserverReverse.observe(aboutUsSectionReverse);


// contact__body
const contactBodySections = document.querySelectorAll('.contact__body');

    contactBodySections.forEach(contactBodySection => {
        const contactBodyObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    contactBodyObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        contactBodyObserver.observe(contactBodySection);
    });


// CURATORS ANIMATION - BLOCK APPEAREANS
    // Опции для первого наблюдателя
    const addVisibleClass = (entries, observer, delayMultiplier) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * delayMultiplier); // Задержка для каждого элемента
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observerOptions1 = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observerOptions2 = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer1 = new IntersectionObserver((entries, observer) => {
                addVisibleClass(entries, observer, 400);
            }, observerOptions1);

            const observer2 = new IntersectionObserver((entries, observer) => {
                addVisibleClass(entries, observer, 500);
            }, observerOptions2);

            // Наблюдение за блоками info__block
            const infoBlocks = document.querySelectorAll('.info__block');
            infoBlocks.forEach((block) => {
                observer1.observe(block);
            });

            // Наблюдение за секцией team
            const sectionTeam = document.querySelector('.section__team');
            observer1.observe(sectionTeam);

            // Наблюдение за блоками curators и posters
            const curators1 = document.querySelector('.curators__1');
            const curators2 = document.querySelector('.curators__2');
            const posters = document.querySelectorAll('.poster-now');

            observer2.observe(curators1);
            observer2.observe(curators2);
            posters.forEach((poster) => {
                observer2.observe(poster);
            });


// INFO WRAPPER
    const infoblocks = document.querySelectorAll(".info__block");
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const infoblocksArray = Array.from(infoblocks);
                infoblocksArray.forEach((block, index) => {
                    setTimeout(() => {
                        block.classList.add("visible");
                    }, index * 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(document.querySelector('.info__wrapper'));






// // Privacy & Secrity
// const consentCheckbox = document.getElementById('consent');
// const submitButton = document.getElementById('submit');

// consentCheckbox.addEventListener('change', () => {
//     submitButton.disabled = !consentCheckbox.checked;
// });







// Про кiностудiю
document.getElementById('aboutBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    alert('Нажаль кнопка найближчим часом не працюватиме');
});

// Посилання на фiльм
document.getElementById('wait-movie').addEventListener('click', function(event) {
    event.preventDefault(); 
    alert('Скоро з\'явиться у прокатi');
});

// Стаття про команду
document.getElementById('team__button-movie').addEventListener('click', function(event) {
    event.preventDefault(); 
    alert('Упс... Стаття не готова. Приносимо вибачення');
});
document.getElementById('about__button').addEventListener('click', function(event) {
    event.preventDefault(); 
    alert('Упс... Стаття не готова. Приносимо вибачення');
});




// function copyText() {
//         var textToCopy = document.getElementById('message').value;
//         navigator.clipboard.writeText(textToCopy).then(function() {
//             alert('Текст успішно скопійовано!');
//         }).catch(function(error) {
//             console.error('Помилка при копіюванні тексту: ', error);
//         });
//     }
// function checkConsent() {
//     if (!consent.checked) {
//         alert("Будь ласка, підтвердіть згоду з політикою конфіденційності та умовами використання.");
//            return false; 
//     }
//     return true; 
// }

//     function copyText() {
//         if (!document.getElementById('consent').checked) {
//             alert("Будь ласка, підтвердіть згоду з політикою конфіденційності та умовами використання.");
//             return;
//         }

//         var textToCopy = document.getElementById('message').value;
//         navigator.clipboard.writeText(textToCopy).then(function() {
//             alert('Текст успішно скопійовано!');
//         }).catch(function(error) {
//             console.error('Помилка при копіюванні тексту: ', error);
//         });
//     }

    // function handleFormSubmit(event) {
    //     if (!checkConsent()) {
    //         event.preventDefault(); 
    //         return false;
    //     }

    //     copyText(); 
    //     return true;
    // }

    // function checkConsent() {
    //     if (!document.getElementById('consentCheckbox').checked) {
    //         alert("Будь ласка, підтвердіть згоду з політикою конфіденційності та умовами використання.");
    //         return false; 
    //     }
    //     return true; 
    // }

    // function copyText() {
    //     var textToCopy = document.getElementById('message').value;
    //     navigator.clipboard.writeText(textToCopy).then(function() {
    //         // alert('Текст успішно скопійовано!');
    //         return null
    //     }).catch(function(error) {
    //         console.error('Помилка при копіюванні тексту: ', error);
    //     });
    // }



        function handleFormSubmit(event) {
                if (!checkConsent()) {
                    event.preventDefault();
                    return false;
                }

                copyText();
                return true;
            }

            function checkConsent() {
                if (!document.getElementById('consentCheckbox').checked) {
                    alert("Будь ласка, підтвердіть згоду з політикою конфіденційності та умовами використання.");
                    return false;
                }
                return true;
            }

            function copyText() {
                var textToCopy = document.getElementById('message').value;
                navigator.clipboard.writeText(textToCopy).then(function() {
                    // alert('Текст успішно скопійовано!');
                    return null
                }).catch(function(error) {
                    console.error('Помилка при копіюванні тексту: ', error);
                });
            }

            document.querySelector('.feedback-form form').addEventListener('submit', handleFormSubmit);

});

