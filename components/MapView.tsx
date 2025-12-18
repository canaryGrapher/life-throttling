'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Popup, ViewStateChangeEvent } from 'react-map-gl/maplibre';
import { Place, Country } from '../types';
import { ArrowLeft, X } from './Icons';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapViewProps {
  data: Country[];
  onBack: () => void;
  onPlaceClick: (place: Place) => void;
}

interface PlaceWithLocation extends Place {
  cityName: string;
  stateName: string;
}

export const MapView: React.FC<MapViewProps> = ({ data, onBack, onPlaceClick }) => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceWithLocation | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 5,
  });

  // Collect all places with their location info
  const places: PlaceWithLocation[] = useMemo(() => {
    const result: PlaceWithLocation[] = [];
    data.forEach(country => {
      country.states.forEach(state => {
        state.cities.forEach(city => {
          city.places.forEach(place => {
            if (place.lat && place.lng) {
              result.push({
                ...place,
                cityName: city.name,
                stateName: state.name,
              });
            }
          });
        });
      });
    });
    return result;
  }, [data]);

  const handleViewStateChange = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  const handleMarkerClick = useCallback((place: PlaceWithLocation) => {
    setSelectedPlace(place);
  }, []);

  const handlePopupClose = useCallback(() => {
    setSelectedPlace(null);
  }, []);

  const handlePopupClick = useCallback(() => {
    if (selectedPlace) {
      onPlaceClick(selectedPlace);
    }
  }, [selectedPlace, onPlaceClick]);

  const handleMapClick = useCallback((e: any) => {
    // Close popup when clicking anywhere on the map
    // The popup content has stopPropagation, so clicks inside won't trigger this
    if (selectedPlace) {
      setSelectedPlace(null);
    }
  }, [selectedPlace]);

  // Using OpenFreeMap - completely free, no API keys required!
  // Learn more at: https://openfreemap.org

  const handleMapLoad = useCallback(() => {
    setIsMapLoaded(true);
    setMapError(null);
  }, []);

  const handleMapError = useCallback((e: { error: Error }) => {
    console.error('Map error:', e.error);
    setMapError(e.error.message);
    setIsMapLoaded(false);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-50">
      {!isMapLoaded && !mapError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4 mx-auto"></div>
            <div className="font-serif text-lg font-medium text-gray-600">Loading map...</div>
          </div>
        </div>
      )}
      
      {mapError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-2 text-red-600">Map Error</h2>
            <p className="text-muted-foreground mb-4">{mapError}</p>
            <button
              onClick={() => {
                setMapError(null);
                setIsMapLoaded(false);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <Map
        {...viewState}
        onMove={handleViewStateChange}
        onLoad={handleMapLoad}
        onError={handleMapError}
        onClick={handleMapClick}
        style={{ width: '100%', height: '100%' }}
        // Custom style using OpenFreeMap / OpenStreetMap tiles without political boundaries
        mapStyle={{
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              // attribution: '',
            },
          },
          layers: [
            {
              id: 'osm-base',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        }}
        // attributionControl={true}
        reuseMaps={true}
      >
        {/* Custom Attribution */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-gray-600 shadow-lg z-10">
          <a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenStreetMap</a>
        </div>

        {/* Markers */}
        {places.map((place) => (
          <Marker
            key={place.id}
            longitude={place.lng}
            latitude={place.lat}
            anchor="center"
            onClick={(e: any) => {
              e.originalEvent?.stopPropagation();
              e.stopPropagation?.();
              handleMarkerClick(place);
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-150 group-hover:shadow-xl group-hover:shadow-primary/50" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/20 animate-ping" />
            </div>
          </Marker>
        ))}

        {/* Popup */}
        {selectedPlace && (
          <Popup
            longitude={selectedPlace.lng}
            latitude={selectedPlace.lat}
            anchor="bottom"
            onClose={handlePopupClose}
            closeButton={false}
            closeOnClick={false}
            className="custom-popup"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="min-w-[200px] font-sans relative"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePopupClose();
                }}
                className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Close popup"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>

              <div
                onClick={handlePopupClick}
                className="cursor-pointer"
              >
                <div className="relative h-[120px] w-full rounded-lg overflow-hidden mb-2">
                  <img
                    src={selectedPlace.image}
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-[10px] font-bold text-black shadow-lg">
                    CLICK TO VIEW
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-base leading-tight mb-1">
                  {selectedPlace.name}
                </h3>
                <div className="text-xs text-muted-foreground font-medium">
                  {selectedPlace.cityName}, {selectedPlace.stateName}
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Overlay Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-10">
        <button
          onClick={onBack}
          className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white transition-colors shadow-lg font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to List</span>
        </button>

        <div className="bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 px-6 py-3 rounded-2xl shadow-lg max-w-xs text-right hidden md:block pointer-events-auto">
          <h2 className="font-serif font-bold text-xl">Journey Map</h2>
          <p className="text-xs text-gray-500 mt-1">
            Click markers to preview. Click popup to read adventure logs.
          </p>
        </div>
      </div>
    </div>
  );
};
