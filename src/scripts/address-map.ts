import 'leaflet/dist/leaflet.css';
import type { Marker } from 'leaflet';

interface MapAddress {
	id: string;
	title: string;
	venue: string;
	address: string;
	coordinates?: [number, number];
}

async function initializeAddressMap() {
	const explorer = document.querySelector<HTMLElement>('[data-address-explorer]');
	const container = document.getElementById('addresses-map');
	const list = document.getElementById('address-list');
	const status = document.querySelector<HTMLElement>('[data-map-status]');
	const resetButton = document.querySelector<HTMLButtonElement>('[data-reset-map]');
	if (!explorer || !container || !list || !status || container.dataset.initialized) return;
	container.dataset.initialized = 'true';
	status.textContent = 'Chargement de la carte…';

	const buttons = Array.from(explorer.querySelectorAll<HTMLButtonElement>('[data-select-address]'));
	buttons.forEach((button) => { button.disabled = true; });

	try {
		const L = await import('leaflet');
		const addresses = JSON.parse(explorer.dataset.addresses ?? '[]') as MapAddress[];
		const markers = new Map<string, Marker>();
		const cards = new Map(
			Array.from(list.querySelectorAll<HTMLElement>('[data-address-id]'))
				.map((card) => [card.dataset.addressId!, card]),
		);
		const paris: [number, number] = [48.8566, 2.3522];
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const map = L.map(container, { scrollWheelZoom: false }).setView(paris, 12);
		L.control.scale({ imperial: false }).addTo(map);
		map.zoomControl.setPosition('topright');
		map.zoomControl.getContainer()?.querySelector('.leaflet-control-zoom-in')?.setAttribute('aria-label', 'Zoomer');
		map.zoomControl.getContainer()?.querySelector('.leaflet-control-zoom-out')?.setAttribute('aria-label', 'Dézoomer');

		// Le fond peut être remplacé ici par un autre fournisseur compatible Leaflet.
		const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
		tiles.on('tileerror', () => {
			status.textContent = 'Le fond de carte est indisponible. Les adresses restent consultables dans la liste.';
		});

		function clearSelection() {
			cards.forEach((card) => card.classList.remove('is-selected'));
			buttons.forEach((button) => button.setAttribute('aria-pressed', 'false'));
			markers.forEach((marker) => marker.getElement()?.classList.remove('is-selected'));
		}

		const selectAddress = (address: MapAddress, fromMarker: boolean) => {
			const marker = markers.get(address.id);
			if (!marker || !address.coordinates) return;
			clearSelection();
			const card = cards.get(address.id);
			card?.classList.add('is-selected');
			buttons.find((button) => button.dataset.selectAddress === address.id)?.setAttribute('aria-pressed', 'true');
			marker.getElement()?.classList.add('is-selected');
			map.setView(address.coordinates, 15, { animate: !reduceMotion });
			marker.openPopup();
			status.textContent = `${address.venue} — ${address.address}`;

			if (fromMarker && card) {
				list.scrollTo({
					top: list.scrollTop + card.getBoundingClientRect().top - list.getBoundingClientRect().top - 8,
					behavior: reduceMotion ? 'instant' : 'smooth',
				});
				if (window.matchMedia('(max-width: 900px)').matches) {
					card.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'instant' : 'smooth' });
				}
			} else if (window.matchMedia('(max-width: 900px)').matches) {
				container.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'instant' : 'smooth' });
			}
		};

		addresses.forEach((address, index) => {
			if (!address.coordinates) return;
			const icon = L.divIcon({
				className: 'address-marker',
				html: `<span>${index + 1}</span>`,
				iconSize: [34, 34],
				iconAnchor: [17, 17],
				popupAnchor: [0, -20],
			});
			const marker = L.marker(address.coordinates, { icon, title: address.venue }).addTo(map);
			const popup = document.createElement('div');
			const title = document.createElement('strong');
			title.textContent = address.title;
			const location = document.createElement('p');
			location.textContent = `${address.venue} — ${address.address}`;
			popup.append(title, location);
			marker.bindPopup(popup);
			marker.on('click', () => selectAddress(address, true));
			const markerElement = marker.getElement();
			markerElement?.setAttribute('aria-label', address.venue);
			markerElement?.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					event.stopPropagation();
					selectAddress(address, true);
				}
			});
			markers.set(address.id, marker);
			const button = buttons.find((item) => item.dataset.selectAddress === address.id);
			if (button) {
				button.disabled = false;
				button.addEventListener('click', () => selectAddress(address, false));
			}
		});

		const showOverview = () => {
			clearSelection();
			map.closePopup();
			if (markers.size > 1) {
				map.fitBounds(L.featureGroup([...markers.values()]).getBounds(), { padding: [35, 35], maxZoom: 13 });
			} else {
				map.setView(paris, 12, { animate: !reduceMotion });
			}
			status.textContent = 'Choisis une fiche ou un point pour découvrir une adresse.';
		};
		showOverview();
		if (resetButton) {
			resetButton.hidden = false;
			resetButton.addEventListener('click', showOverview);
		}
	} catch (error) {
		status.textContent = 'La carte ne peut pas être chargée. Tu peux toujours consulter les adresses ci-contre ou ouvrir OpenStreetMap.';
		console.error('Impossible de charger la carte des adresses.', error);
	}
}

initializeAddressMap();
