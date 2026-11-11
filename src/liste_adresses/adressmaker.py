from geopy.geocoders import Nominatim

# 1. Initialiser le géocodeur en précisant un "user_agent" (nom de votre application)
geolocator = Nominatim(user_agent="mon_script_geocodage")

# 2. Définir l'adresse à rechercher
adresse = "107 Rue de Rivoli, 75001 Paris, France"

# 3. Récupérer les coordonnées
location = geolocator.geocode(adresse)

if location:
  print(f"Adresse trouvée : {location.address}")
  print(f"Latitude : {location.latitude}")
  print(f"Longitude : {location.longitude}")
else:
  print("Impossible de trouver cette adresse.")