"use client";
import dynamic from "next/dynamic";

interface mapWrapperProps {
  page: string;
}

const Map = dynamic(() => import("./Map"), { ssr: false });

const MapWrapper = ({ page }: mapWrapperProps) => {
  return (
    // <div className="mx-auto lg:w-8/10"> 
      <Map page={page} />
    // </div>
  )
};

export default MapWrapper;
