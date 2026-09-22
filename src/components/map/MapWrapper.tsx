"use client"
import dynamic from "next/dynamic";

interface mapWrapperProps {
    page: string,
}

const Map = dynamic(() => import("@/components/map/Map"),
    { ssr: false });

const MapWrapper = ({ page }: mapWrapperProps) => {
    return (
        <Map page={page} />
    )
}

export default MapWrapper