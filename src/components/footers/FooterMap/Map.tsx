"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LocationList } from "./locationList";
import yellowLocationIcon from "../../../../public/Icons/yellow-location.svg";
import blueLocationIcon from "../../../../public/Icons/blue-address-icon.svg";
import L from "leaflet";

interface mapProps {
  page: string;
}

const Map = ({ page }: mapProps) => {
  const markerRef = useRef<Record<number, L.Marker | null>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const position: [number, number] = [59.37844, 17.82824];
  const zoom: number = 12;
  const center = position;
  return (
    <div className="py-3 md:py-5">
      <div className="overflow-hidden rounded-md border border-grey-500 isolate">
        <MapContainer
          center={center}
          zoom={zoom}
          zoomSnap={0.25}
          key={page}
          className="w-full z-10 h-100"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {page === "footer" && (
            <>
              {LocationList.map((location, index) => (
                <Marker
                  position={[location.latitude, location.longitude]}
                  key={index}
                  ref={(ref) => {
                    markerRef.current[location.id] = ref;
                  }}
                  eventHandlers={{
                    click: () => {
                      setSelectedId(location.id);
                    },
                  }}
                >
                  <Popup>
                    <Link
                      href={location.url}
                      target="_blank"
                      className="font-bold font-body"
                    >
                      {location.name}
                    </Link>
                  </Popup>
                </Marker>
              ))}
            </>
          )}
        </MapContainer>
        {page === "footer" && (
          <div className="font-albert flex flex-col text-white font-body font-bold cursor-pointer md:grid md:grid-cols-2 border border-t-0 border-grey-300 rounded-b-md overflow-hidden">
            {LocationList.map((location, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedId(location.id);
                  markerRef.current[location.id]?.openPopup();
                }}
                className={`group flex gap-3 px-4 py-3 md:px-5 border-grey-300 border-t
                ${index % 2 === 1 ? "md:border-l" : ""}
              `}
              >
                {selectedId === location.id ? (
                  <>
                    <div className="w-6.5 h-6.5 bg-yellow-500 rounded-full flex justify-center items-center">
                      <Image
                        src={blueLocationIcon}
                        alt="location"
                        width={16}
                        height={20}
                        className="w-4 h-5 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-accent">{location.name}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-6.5 h-6.5 rounded-full flex items-center justify-center group-hover:bg-yellow-500/30 group-hover:rounded-full">
                      <Image
                        src={yellowLocationIcon}
                        alt="location"
                        width={16}
                        height={20}
                        className="w-4 h-5 object-contain"
                      />
                    </div>
                    <div>
                      <p className="hover:text-yellow-200">{location.name}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
