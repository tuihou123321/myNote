import React from 'react';
import {Link} from "react-router-dom"
import {loadImage, tagsLimit} from "../../utils/common";
import ImageCenter from "../Layout/ImageCenter"
import OnlineStatus from "./component/OnlineStatus"
import PropTypes from "prop-types"


let propTypes = {}

function Item3_2({item}) {
  return (
      <Link to={`/confide/detail/${item.id}`} className={"w100p"}>
        <div className={"df mt20"}>
          <div className={"rel w90 mr15 pt5"}>
            <ImageCenter className={"w90 h90 bdrs5"} img={item.head}/>
            <div className={"white abs  fz10 w100p tac"} style={{backgroundColor:"rgba(0,0,0,0.3)",top:"0.78rem"}}>
              已倾听{item.listenNums}次
            </div>
          </div>
          <div className={"fx1 bdb1 pr15 w100p rel"}>
              <div className={"fx1"}>

                <div className="df">
                  <div className="fx1">
                    <div className={"b fz16 pb5"}>
                      {item.name}
                    </div>
                    <div className={"line2 h37 pb5"} style={{WebkitBoxOrient: "vertical"}}>
                      {item.desc}
                    </div>
                  </div>
                  <div className="w45 lh45">
                    <OnlineStatus item={item}/>
                  </div>
                </div>

                <div className={"mb20"}>
                  <table>
                    <tbody>
                    <tr>
                      {
                        item.tags && item.tags.length>0 && tagsLimit(item.tags,14).map((item,index)=>{
                          return <td className={"tagBot"} key={index}>{item}</td>
                        })
                      }
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </div>
      </Link>
  );
}

Item3_2.propTypes = propTypes;
export default Item3_2;
