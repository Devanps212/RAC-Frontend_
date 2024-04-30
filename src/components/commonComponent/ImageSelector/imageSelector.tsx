import React from "react";

const ImageSelector: React.FC<{ images: [string, string[]], handleClick : (bigImage: string, smallImage: string)=>void }> = ({ images, handleClick }) => {
    const [bigImg, smallImg] = images;

    const handleImage = (index: number)=>{
        console.log("index : ", index)
        const smallToBig = smallImg[index]
        console.log("smallToBig : ", smallToBig)
        console.log("bigImg ; ", bigImg)
        handleClick(smallToBig, bigImg)
    }

    return (
        <>
            <img src={bigImg ? bigImg : "small_car_image_3.jpg"} alt="Big Car Image" className="img-thumbnail mb-2" style={{ width: "100%" }} />
            <div className="d-flex justify-content-center align-items-center">
                {smallImg && smallImg.length > 0 && smallImg.map((image, index) => (
                    <div className="col" key={index}>
                        <img src={image} alt={`Small Car Image ${index}`} onClick={()=>handleImage((index))} className="img-thumbnail mb-2" style={{ width: "100%", height: "100%" }} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ImageSelector;
