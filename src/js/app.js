import { animations } from './functions/animations.js';

document.addEventListener('DOMContentLoaded', () => {
	const intro = document.querySelector('.intro');
    const sectionHeaders = document.querySelectorAll('section .section__header');
    const mainSectionHeader = document.querySelector('.section__header-fixed');
    const mainSectionHeaderTitle = document.querySelector('.section__header-fixed .section__header-title');

	// $(".mask-phone").mask("+375(99) 99-99-999");

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

	/* MODAL */
	const sectionBtn = document.querySelector('.section__button');
	const partnerModal = document.querySelector('.partner-modal');
	const modalCloseBtns = document.querySelectorAll('.modal__close');

	const openModal = (modal) => {
		document.body.style.overflowY = 'hidden';
		modal.classList.add('modal--active');

		outsideClickModal(modal);
		escEnterModal(modal);
	};

	const closeModal = (modal) => {
		document.body.style.overflowY = 'auto';
		modal.classList.remove('modal--active');

		const inputs = document.querySelectorAll(`.${modal.classList[0]} input[type="text"]`);
		inputs.forEach(input => {
			input.style.border = '1px solid #999';
		});
		
		inputs[inputs.length - 1].nextElementSibling.textContent = '';

		resetInputs(inputs);
	};

	const outsideClickModal = (modal) => {
		modal.addEventListener('click', (e) => {
			if (e.target.parentElement === modal) {
				closeModal(modal);
			}
		});
	};

	const escEnterModal = (modal) => {
		document.addEventListener('keyup', function (e) {
			if (e.keyCode === 27) {
				closeModal(modal);
			}
		});
	};

	sectionBtn.addEventListener('click', () => {
		openModal(partnerModal);
	});

	modalCloseBtns.forEach(modalCloseBtn => {
		modalCloseBtn.addEventListener('click', () => {
			const modal = modalCloseBtn.parentElement.parentElement.parentElement;
			closeModal(modal);
		});
	});
	/* MODAL */

	/* VALIDATE FORM */
	const buttonsPartnerSend = document.querySelectorAll('.partner__form-button');

	function resetInputs(inputs) {
		inputs.forEach(input => input.value = '');
	};

	const validateForm = (button) => {
		const form = button.parentElement;
		const classForm = form.classList[0];
		const inputs = document.querySelectorAll(`.${classForm} input[type="text"]`);
		const message = document.querySelector(`.${classForm} .partner__message`);

		let k = 0;

		let arrayAddValue = [];

		const validateInput = (input) => {
			if(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(input.value) && input.name === 'name') {
				input.style.border = '1px solid #999';
				k++;
				
				if(!arrayAddValue.includes(input.name)) {
					arrayAddValue.push(input.name);
				}
			} else if(/((-|\\+)?[0-9]+(\\.[0-9]+)?)+/u.test(input.value) && input.name === 'phone' && (input.value.length >= 7 && input.value.length <= 18)) {
				input.style.border = '1px solid #999';
				k++;
				
				if(!arrayAddValue.includes(input.name)) {
					arrayAddValue.push(input.name);
				}
			} else {
				input.style.border = '1px solid red';

				if (arrayAddValue.includes(input.name)) {
					const elemIndex = arrayAddValue.findIndex(inputIsValidate => inputIsValidate === input.name);
					arrayAddValue = [...arrayAddValue.slice(0, elemIndex), ...arrayAddValue.slice(elemIndex + 1)];
					// console.log(arrayAddValue);
				}
			}
		};
		
		inputs.forEach((input, index) => {
			if(!input.value) {
				input.style.border = '1px solid red';

				if (arrayAddValue.includes(input.name)) {
					const elemIndex = arrayAddValue.findIndex(inputIsValidate => inputIsValidate === input.name);
					arrayAddValue = [...arrayAddValue.slice(0, elemIndex), ...arrayAddValue.slice(elemIndex + 1)];
					// console.log(arrayAddValue);
				}
			} else {
				validateInput(input);
				// console.log(arrayAddValue);
			}

			input.addEventListener('input', () => {
				if(!input.value) {
					input.style.border = '1px solid red';
					// message.textContent = 'Заполните пустые поля';

					if (arrayAddValue.includes(input.name)) {
						const elemIndex = arrayAddValue.findIndex(inputIsValidate => inputIsValidate === input.name);
						arrayAddValue = [...arrayAddValue.slice(0, elemIndex), ...arrayAddValue.slice(elemIndex + 1)];
						// console.log(arrayAddValue);
					}
				} else {
					// message.textContent = '';
					validateInput(input);
					// console.log(arrayAddValue);
				}
				// console.log(arrayAddValue);

				// if(arrayAddValue.length !== inputs.length) {
				// 	message.textContent = 'Заполните пустые поля';
				// } else {
				// 	message.textContent = '';
				// }
			});
		});
		
		if(k == inputs.length) {
			// console.log('Форма отправлена');

			let formData = new FormData(form);
			// formData.append('formTitle', titleForm);
			fetch('sendmail.php', {
				method: 'POST',
				body: formData
			})
			.then((data) => {
				// console.log(data);

				document.querySelector('.alert').classList.add('alert--active');
				document.querySelector('.alert__close').addEventListener('click', () => {
					document.querySelector('.alert').classList.remove('alert--active');
				});

				setTimeout(() => {
					document.querySelector('.alert').classList.remove('alert--active');
				}, 4000);
				
				if(form.parentElement.classList[0] === 'partner-modal__content') {
					closeModal(form.parentElement.parentElement.parentElement);
				} else {
					resetInputs(inputs);
				}
			})
		}

		// if(arrayAddValue.length !== inputs.length) {
		// 	message.textContent = 'Заполните пустые поля';
		// } else {
		// 	message.textContent = '';
		// }
	};

	buttonsPartnerSend.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			
			validateForm(e.target);
		});
	});
	/* VALIDATE FORM */
});