import React from 'react';

export default function ImageCenter({img,className,children,style}) {
  return (
      <div className={`rel df aic white ${className}`} style={{
        backgroundSize:"cover",
        backgroundImage:`url(${img})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center center",
        backgroundColor: "#f2f4f5",
        ...style
      }}>
        <div className={"abs z1 w100p h100p"}>
          {children}
        </div>

        {
          children && <div className={`bg-black t0 l0 abs w100p op3 ${className}`}/>
        }
      </div>
  );
}
