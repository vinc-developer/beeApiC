'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './CityMap.module.css';

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

interface CityCoordinates {
    name: string;
    cityName?: string; // Nom de la ville seul
    lat: number;
    lon: number;
    fullAddress?: string;
    postalCode?: string;
}

interface CityMapProps {
    cities: string[]; // Tableau de noms de villes
    height?: string; // Hauteur de la carte (défaut: 400px)
    width?: string;  // Largeur de la carte (défaut: 100%)
    zoom?: number; // Niveau de zoom initial (défaut: 6)
    beeApic?: boolean; // Afficher les emplacements Bee Api'C
    isVille?: boolean; // Liste des villes à afficher
}

export default function CityMap({ cities, height = '400px', width = '100%', zoom = 12, beeApic, isVille }: CityMapProps) {
    const [coordinates, setCoordinates] = useState<CityCoordinates[]>([]);
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState<[number, number]>([46.603354, 1.888334]); // Centre de la France par défaut

    useEffect(() => {
        const fetchCoordinates = async () => {
            setLoading(true);
            const results: CityCoordinates[] = [];

            for (const city of cities) {
                try {
                    let response;
                    if (isVille) {
                        response = await fetch(
                            `https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(city)}&limit=1&type=municipality`,
                            {
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }
                        );
                    } else {
                        response = await fetch(
                            `https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(city)}`,
                            {
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }
                        );
                    }
                    // Utilisation de l'API IGN Géoplateforme (officielle et très précise)


                    const data = await response.json();
                    console.log('Données reçues pour', city, data);

                    if (data.features && data.features[0]) {
                        const feature = data.features[0];
                        const [lon, lat] = feature.geometry.coordinates;
                        const properties = feature.properties;

                        // Extraire le nom de la ville depuis les propriétés
                        const cityName = properties.city || properties.name || city;

                        results.push({
                            name: properties.label || city,
                            cityName: cityName,
                            lat,
                            lon,
                            fullAddress: properties.label,
                            postalCode: properties.postcode
                        });
                    } else {
                        console.warn(`Ville non trouvée: ${city}`);
                    }
                } catch (error) {
                    console.error(`Erreur pour la ville ${city}:`, error);
                }

                // Petite pause pour respecter les bonnes pratiques
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            setCoordinates(results);

            // Calculer le centre si on a des coordonnées
            if (results.length > 0) {
                const avgLat = results.reduce((sum, coord) => sum + coord.lat, 0) / results.length;
                const avgLon = results.reduce((sum, coord) => sum + coord.lon, 0) / results.length;
                setCenter([avgLat, avgLon]);
            }

            setLoading(false);
        };

        if (cities.length > 0) {
            fetchCoordinates();
        }
    }, [cities]);

    // Fix pour les icônes Leaflet (uniquement côté client)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const L = require('leaflet');
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        }
    }, []);

    if (loading) {
        return (
            <div className={styles.mapContainer} style={{ height, width }}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingIcon}>🗺️</div>
                    <p className={styles.loadingText}>Chargement de la carte...</p>
                </div>
            </div>
        );
    }

    if (coordinates.length === 0) {
        return (
            <div className={styles.mapContainer} style={{ height, width }}>
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <p className={styles.errorText}>Aucune ville trouvée</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.mapWrapper} style={{ height }}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinates.map((coord, index) => (
                    <Marker key={index} position={[coord.lat, coord.lon]}>
                        <Popup>
                            <div className={styles.popupContent}>
                                <strong className={styles.popupTitle}>
                                    {beeApic && (
                                        <span>🐝 Bee Api'C - </span>
                                    )}
                                    {isVille && coord.cityName ? coord.cityName : coord.name}
                                </strong>
                                <br />
                                {coord.postalCode && (
                                    <>
                                        <small className={styles.popupPostalCode}>Code postal: {coord.postalCode}</small>
                                        <br />
                                    </>
                                )}
                                <small className={styles.popupCoords}>
                                    {coord.lat.toFixed(6)}, {coord.lon.toFixed(6)}
                                </small>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}