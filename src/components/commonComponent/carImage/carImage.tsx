import React from "react";

interface Props {
  pathImage?: string[];
}

const CarImageComponent: React.FC<Props> = ({ pathImage }) => {

    console.log(pathImage)
  if (!Array.isArray(pathImage)) {
    return null;
  }

  const imagePath = pathImage ? pathImage[0] : '';

  console.log(imagePath)
  return (
    <img 
    src={imagePath} 
    alt="car Image" 
    width={200} 
    height={200}
    className="mb-4"/>
  );
};

export default CarImageComponent;
