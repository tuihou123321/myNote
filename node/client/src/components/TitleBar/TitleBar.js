import React  from 'react';
import {Link} from "react-router-dom"
import {loadImage} from "../../utils/common"

export default function TitleBar({imgName,children,url,className=""}){
    return (
      <div className={`df jcb ${className}`}>
        <div className={"df aic"}>
          <img src={loadImage(imgName)} alt="" style={{width:"0.16rem",height:"0.16rem"}} className={"mr10"}/>
          <b>{children}</b>
        </div>
        {
          url && <Link className={"plr20 bdrs20 bd1 fz12 dib"} to={url}><span>更多</span></Link>
        }
      </div>
    );
}
