import React  from 'react';

export default function BannerLayout({name,sharePic,bannerBase64,nickName,head120,head120Base64,modal1,isShare,bannerImage64LimitHeight}){
  // if(head120){
  //   head120=head120.replace("https:","http:");
  // }
  // if(banner){
  //   banner=banner.replace("https:","http:");
  // }
  // let baseImage=(
  //   <img src={bannerImage64LimitHeight} alt="" className={"w100p"}/>
  // )

  //分享生成的图片，第一步图片转成base64,第二步图片尺寸裁剪；
  let baseImage=(
    <div className={"w100p fz18 bdrs10 bdrsb0 rel"}>
      <div className={"abs t20 l20 ovh"}>
        {
          nickName && (
            <div className={"df aic"}>
              <img src={isShare ? head120Base64:head120} alt=""  className={"mr10 bdrs50p bd2white w30 h30"}/>
              <span className={"fz14 white txs1"}>{nickName}</span>
            </div>
          )
        }
      </div>
      <span className={"abs white w100p tac mt25p z2"}><em className={"n txs1 w90p"}>{name}</em></span>
      <img src={isShare ? bannerBase64:sharePic} alt="" className={"w100p bdrs10 bdrsb0"}/>
    </div>
  )

  //默认图片样式，使用原始图片；
  let base=(
    <div className={"w100p fz18 bdrs10 bdrsb0 rel banner"} id={"bannerImageBox"}>
      {/*<div className={"abs t20 l20 z2"}>*/}
        {/*{*/}
          {/*nickName && (*/}
            {/*<div className={"df aic"}>*/}
              {/*<img src={isShare ? head120Base64:head120} alt=""  className={"mr10 bdrs50p bd2white w30 h30"}/>*/}
              {/*<span className={"fz14 white txs1"}>{nickName}</span>*/}
            {/*</div>*/}
          {/*)*/}
        {/*}*/}
      {/*</div>*/}
      <span className={"abs white w100p tac mt25p z2"}><em className={"n txs1 w90p"}>{name}</em></span>
      <img src={isShare ? bannerBase64:sharePic} alt="" className={"w100p bdrs10 bdrsb0 bannerImg "}/>
    </div>
  )

  return (
    <div>{isShare?baseImage:base}</div>
  )
}

