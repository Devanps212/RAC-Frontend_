import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './imageCropper.css'

interface ImageCropperProps {
  image: string;
  onCrop: (file: File) => void;
  onClose: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCrop, onClose }) => {
  const cropperRef = useRef<HTMLImageElement & { cropper: Cropper }>(null);
  const [showCropper, setShowCropper] = useState(true);

  const cropImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'croppedImage.png', {
            type: 'image/png',
          });
          onCrop(file);
          onClose();
        }
      });
    }
  };

  return (
    <div className={`modal ${showCropper ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Crop Image</h5>
          <button type="button" className="close" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Cropper
            src={image}
            className="custom-cropper"
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={cropImage}>
            Crop Image
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
