import {loadImage} from "../../../utils/common";

export let navFooter=[
  {
    "icon":loadImage("icon_tab_home_nor@3X.png"),
    "selectedIcon":loadImage("icon_tab_home_pre@3X.png"),
    "name":"首页",
    "url":"/"
  },
  {
    "icon":loadImage("ico_ly@3x.png"),
    "selectedIcon":loadImage("ico_ly@3xB.png"),
    "name":"留言",
    "url":"/Message"
  },
  {
    "icon":loadImage("ico_zx@3x.png"),
    "selectedIcon":loadImage("ico_zx@3xB.png"),
    "name":"咨询",
    "url":"/FaceRf"
  },
  {
    "icon":loadImage("icon_tab_mine_nor@3X.png"),
    "selectedIcon":loadImage("icon_tab_mine_pre@3X.png"),
    "name":"我的",
    "url":"/user"
  }
]
