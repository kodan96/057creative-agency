$(document).ready(() => {
    let currentIndex = 0;
    const images = document.querySelectorAll('.slide');
    //--------------------------------------------------------Functions--------------------------------------------------------//

    gsap.registerPlugin(ScrollTrigger);

    $.fn.toggleAttr = function(attr, val1, val2) {
        return this.each(function () {
            $(this).attr(attr, $(this).attr(attr) == val1? val2 : val1);
        });
    }

    function menuToggle() {
        $('.open').toggle();
        $('.close').toggle();
        $('.open').toggleAttr('aria-expanded', 'true', 'false');
        $('.close').toggleAttr('aria-expanded', 'false', 'true');
        $('nav').slideToggle();
    }

    function showImage(index) {
        const texts = ['Brand naming & guidelines', 'Brand identity & merchandise', 'Brand identity & merchandise']
        const titles = ['Lean Product Roadmap', 'New Majestic Hotel', 'Crypto Dashboard']
        const subtitles = ['2019 Project', '2018 Project', '2016 Project']
        const title = $('.slider-overlay-title')
        const subtitle = $('.slider-overlay-subtitle')
        const header = $('.slide-header')

        images.forEach((image, i) => {
            if (i === index) {
                image.classList.remove('hidden');
                title.text(titles[i]);
                subtitle.text(subtitles[i]);
                header.text(texts[i]);
            } else {
                image.classList.add('hidden');
            }
        });
    }

    const fadeOutSlider = (callback) => {
        const tl = gsap.timeline({
            onComplete: callback
        });
    
        const slider = document.querySelector('.slider');
        const header = $('.slide-header')
    
        tl.to([slider, header], {
            opacity: 0,
            x: -100,
            duration: 0.5,
            stagger: .3,
            ease: 'power1.out'
        });
    }
    
    const fadeInSlider = () => {
        const slider = document.querySelector('.slider');
        const header = $('.slide-header')
        gsap.to([slider, header], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: .2,
            stagger: 0.3,
            ease: 'power1.out'
        });
    }
    
    function nextImage() {
        fadeOutSlider(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
            fadeInSlider();
        });
    }
    
    function previousImage() {
        fadeOutSlider(() => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
            fadeInSlider();
        });
    }
    
    
    // Initial display of the first image
    showImage(currentIndex);




    //----------------------------------------------------Event Listeners--------------------------------------------------------//
    $('.open, .close').on('click', menuToggle);

    $('.prev').on('click', previousImage);
    $('.next').on('click', nextImage);

})