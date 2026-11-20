let carouselSequence = 0;

function initializeCarousels() {
	document.querySelectorAll<HTMLElement>('.image-carousel:not([data-carousel-ready])').forEach((carousel) => {
		const slides = Array.from(carousel.children).filter(
			(child): child is HTMLElement => child instanceof HTMLElement &&
				(child.matches('img, picture') || child.querySelector('img') !== null),
		);
		if (slides.length === 0) return;

		const stage = document.createElement('div');
		stage.className = 'image-carousel__stage';
		const viewport = document.createElement('div');
		viewport.className = 'image-carousel__viewport';
		viewport.id = `image-carousel-viewport-${++carouselSequence}`;
		stage.append(viewport);
		carousel.prepend(stage);

		// Wrap each Markdown paragraph so direct <img> elements also retain their alt text.
		const panels = slides.map((slide, index) => {
			const panel = document.createElement('div');
			panel.className = 'image-carousel__slide';
			panel.setAttribute('role', 'group');
			panel.setAttribute('aria-roledescription', 'diapositive');
			panel.setAttribute('aria-label', `${index + 1} sur ${slides.length}`);
			slide.classList.add('image-carousel__slide');
			panel.append(slide);
			viewport.append(panel);
			const images = slide.matches('img') ? [slide as HTMLImageElement] : slide.querySelectorAll('img');
			images.forEach((image) => { image.draggable = false; });
			panel.hidden = index !== 0;
			return panel;
		});

		carousel.setAttribute('role', 'region');
		carousel.setAttribute('aria-roledescription', 'carrousel');
		if (!carousel.hasAttribute('aria-label') && !carousel.hasAttribute('aria-labelledby')) {
			carousel.setAttribute('aria-label', 'Galerie d’images');
		}
		carousel.dataset.carouselReady = '';
		if (slides.length === 1) return;

		carousel.tabIndex = 0;
		const status = document.createElement('span');
		status.className = 'sr-only';
		status.setAttribute('role', 'status');
		status.setAttribute('aria-atomic', 'true');
		const pagination = document.createElement('div');
		pagination.className = 'image-carousel__pagination';
		pagination.setAttribute('role', 'group');
		pagination.setAttribute('aria-label', 'Choisir une image');
		let current = 0;
		const dots: HTMLButtonElement[] = [];

		function showSlide(index: number) {
			const next = (index + panels.length) % panels.length;
			if (next === current) return;
			// Keep keyboard focus visible when a linked image is being hidden.
			if (panels[current].contains(document.activeElement)) carousel.focus({ preventScroll: true });
			current = next;
			panels.forEach((panel, i) => { panel.hidden = i !== current; });
			dots.forEach((dot, i) => {
				if (i === current) dot.setAttribute('aria-current', 'true');
				else dot.removeAttribute('aria-current');
			});
			status.textContent = `Image ${current + 1} sur ${panels.length}`;
		}

		function createArrow(direction: -1 | 1) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = `image-carousel__arrow image-carousel__arrow--${direction === -1 ? 'previous' : 'next'}`;
			button.setAttribute('aria-label', direction === -1 ? 'Image précédente' : 'Image suivante');
			button.setAttribute('aria-controls', viewport.id);
			const icon = document.createElement('span');
			icon.setAttribute('aria-hidden', 'true');
			icon.textContent = direction === -1 ? '‹' : '›';
			button.append(icon);
			button.addEventListener('click', () => showSlide(current + direction));
			return button;
		}

		panels.forEach((_, index) => {
			const dot = document.createElement('button');
			dot.type = 'button';
			dot.className = 'image-carousel__dot';
			dot.setAttribute('aria-label', `Afficher l’image ${index + 1} sur ${panels.length}`);
			dot.setAttribute('aria-controls', viewport.id);
			if (index === 0) dot.setAttribute('aria-current', 'true');
			dot.addEventListener('click', () => showSlide(index));
			dots.push(dot);
			pagination.append(dot);
		});
		stage.append(createArrow(-1), createArrow(1));
		carousel.append(pagination, status);

		carousel.addEventListener('keydown', (event) => {
			if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
			if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]')) return;
			const destinations: Record<string, number> = {
				ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: panels.length - 1,
			};
			if (!(event.key in destinations)) return;
			event.preventDefault();
			showSlide(destinations[event.key]);
		});

		let gesture: { id: number; x: number; y: number } | null = null;
		let suppressSwipeClick = false;
		viewport.addEventListener('pointerdown', (event) => {
			if (!event.isPrimary) return;
			suppressSwipeClick = false;
			if (event.pointerType === 'mouse') return;
			gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
			// Keep the browser's implicit touch capture on the image so taps on links still work.
		});
		viewport.addEventListener('pointercancel', () => { gesture = null; });
		viewport.addEventListener('pointerup', (event) => {
			if (!gesture || gesture.id !== event.pointerId) return;
			const dx = event.clientX - gesture.x;
			const dy = event.clientY - gesture.y;
			gesture = null;
			if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
				suppressSwipeClick = true;
				showSlide(current + (dx < 0 ? 1 : -1));
			}
		});
		viewport.addEventListener('click', (event) => {
			if (suppressSwipeClick && event.detail > 0) {
				event.preventDefault();
				event.stopPropagation();
				suppressSwipeClick = false;
			}
		}, true);
	});
}

initializeCarousels();
document.addEventListener('astro:page-load', initializeCarousels);
