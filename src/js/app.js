document.addEventListener('DOMContentLoaded', () => {
	const intro = document.querySelector('.intro');
    const sectionHeaders = document.querySelectorAll('section .section__header');
    const mainSectionHeader = document.querySelector('.section__header-fixed');
    const mainSectionHeaderTitle = document.querySelector('.section__header-fixed .section__header-title');

    sectionHeaders.forEach(sectionHeader => {
        // sectionHeader.style.display = 'none';
        const sectionHeaderTop = sectionHeader.parentElement.parentElement.getBoundingClientRect().top;
    });

    window.addEventListener('scroll', () => {
        console.log(document.documentElement.scrollTop);
        if(document.documentElement.scrollTop > sectionHeaders[0].parentElement.parentElement.getBoundingClientRect().top + intro.clientHeight - mainSectionHeader.clientHeight) {
			mainSectionHeader.classList.add('active');
            // mainSectionHeaderTitle.textContent = 'О компании';
        } else if(document.documentElement.scrollTop < sectionHeaders[0].parentElement.parentElement.getBoundingClientRect().top + intro.clientHeight - mainSectionHeader.clientHeight) {
			mainSectionHeader.classList.remove('active');
        }
    });



	const sections = [...document.querySelectorAll("section")];

	let options = {
		rootMargin: "0px",
		threshold: 0.5
	};

	const callback = (entries, observer) => {
		entries.forEach(entry => {
			const { target } = entry;
			
			// if (entry.intersectionRatio >= 0.25) {
			// 	console.log(target);
			// } else {

			// }
			if(entry.isIntersecting) {
				console.log(target);
				mainSectionHeaderTitle.textContent = target.firstElementChild.firstElementChild.textContent;
				console.log();
			}
		});
	};

	const observer = new IntersectionObserver(callback, options);

	sections.forEach((section, index) => {
		observer.observe(section);
	});
});