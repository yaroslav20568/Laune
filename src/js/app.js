import { animations } from './functions/animations.js';

document.addEventListener('DOMContentLoaded', () => {
	const intro = document.querySelector('.intro');
    const sectionHeaders = document.querySelectorAll('section .section__header');
    const mainSectionHeader = document.querySelector('.section__header-fixed');
    const mainSectionHeaderTitle = document.querySelector('.section__header-fixed .section__header-title');


	const observerFunction = () => {
		const sections = document.querySelectorAll("section");
	
		let options = {
			rootMargin: `0px 0px 0px ${mainSectionHeader.clientHeight}px`,
			threshold: /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ? 0.1 : 0.4
		};
	
		const callback = (entries, observer) => {
			entries.forEach(entry => {
				const { target } = entry;

				if(entry.isIntersecting && target.classList[0] === 'about-company') {
					mainSectionHeader.classList.add('active');
				}

				if(entry.isIntersecting) {
					mainSectionHeaderTitle.textContent = target.firstElementChild.firstElementChild.textContent;
				}
	
				if(entry.isIntersecting && target.classList[0] === 'partner-start') {
					mainSectionHeaderTitle.textContent = target.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent;
				}
			});
		};
	
		const observer = new IntersectionObserver(callback, options);
	
		sections.forEach((section, index) => {
			observer.observe(section);
		});
	};


    sectionHeaders.forEach(sectionHeader => {
        sectionHeader.style.display = 'none';
        const sectionHeaderTop = sectionHeader.parentElement.parentElement.getBoundingClientRect().top;
    });

    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > sectionHeaders[0].parentElement.parentElement.getBoundingClientRect().top + intro.clientHeight - mainSectionHeader.clientHeight) {
			mainSectionHeader.classList.add('active');
        } else {
			mainSectionHeader.classList.remove('active');
        }
    });

	observerFunction();

	window.addEventListener('resize', () => {
		observerFunction();
	});


	const isAnimation = () => {
		if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) && document.documentElement.clientWidth > 1200 && document.documentElement.clientHeight >= 925) {
			document.body.classList.add('active');
			animations();
		} else {
			document.body.classList.remove('active');
		}
	};

	isAnimation();
});