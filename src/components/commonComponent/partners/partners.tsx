import React from "react";
import "./partners.css"

interface PartnerLogo {
  src: string;
  alt: string;
}

const CollaboratedPartners: React.FC = () => {
  const partnerLogos: PartnerLogo[] = [
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870221/carLogo/Logo-bmw-vector-transparent-PNG_q5l0zn.png',
      alt: 'BMW Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870227/carLogo/pngwing.com_10_t2tdsy.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870225/carLogo/pngwing.com_8_ux3fbi.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870224/carLogo/pngwing.com_2_aiuy8g.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870223/carLogo/pngwing.com_3_giezfq.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870223/carLogo/pngwing.com_11_vxzcmb.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870222/carLogo/pngwing.com_5_jhvsxd.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870222/carLogo/pngwing.com_4_m6rcei.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870220/carLogo/pngwing.com_12_vlwni5.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870219/carLogo/pngwing.com_9_txbnhi.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870220/carLogo/pngwing.com_6_ttaqxc.png',
      alt: 'Car Logo',
    },
    {
      src: 'https://res.cloudinary.com/dlkrxem40/image/upload/v1716870218/carLogo/pngwing.com_7_khpl5m.png',
      alt: 'Car Logo',
    },
  ];

  return (
    <div className="container container-lists">
    <div className="row">
      <div className="col-12">
        <h4 className="text-center" style={{fontFamily:'Orbitron'}}>Partner Cars</h4>
        <div className="logo-list mt-2">
          <ul className="row-1">
            {partnerLogos.slice(0, 7).map((logo, index) => (
              <li key={index}>
                <img
                  src={logo.src}
                  className="list-images"
                  alt={logo.alt}
                />
              </li>
            ))}
          </ul>
          <ul className="row-2">
            {partnerLogos.slice(7).map((logo, index) => (
              <li key={index}>
                <img
                  src={logo.src}
                  className="list-images"
                  alt={logo.alt}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>

  );
};

export default CollaboratedPartners;
