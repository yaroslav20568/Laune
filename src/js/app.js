document.addEventListener('DOMContentLoaded', () => {
    const sectionHeaders = document.querySelectorAll('section .section__header');
    const mainSectionHeader = document.querySelector('.section__header-fixed');
    const mainSectionHeaderTitle = document.querySelector('.section__header-fixed .section__header-title');

    sectionHeaders.forEach(sectionHeader => {
        sectionHeader.style.display = 'none';
        const sectionHeaderTop = sectionHeader.parentElement.parentElement.getBoundingClientRect().top;
        console.log(sectionHeaderTop);
        
    });

    window.addEventListener('scroll', () => {
        console.log(document.documentElement.scrollTop);
        if(document.documentElement.scrollTop > sectionHeaders[0].parentElement.parentElement.getBoundingClientRect().top) {
            mainSectionHeader.style.display = 'block';
            mainSectionHeaderTitle.textContent = 'О компании';
        } else if(document.documentElement.scrollTop > sectionHeaders[0].parentElement.parentElement.getBoundingClientRect().top) {
            mainSectionHeaderTitle.textContent = 'О продуктах';
        } else {
            mainSectionHeader.style.display = 'none';
        }
    });

    // document.body.innerHTML += `
    //     <div class="section__header-fixed">
    //         <div class="container">
    //             <div class="section__header">
    //                 <h2 class="section__header-title">Цели сомпании</h2>
    //                 <img src="img/section-logo.svg" alt="logo section" class="section__header-img">
    //             </div>
    //         </div>
    //     </div>
    // `;
});