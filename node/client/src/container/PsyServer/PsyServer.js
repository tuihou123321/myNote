import React, {Component} from 'react';
import { WingBlank, Carousel } from "antd-mobile"
// import bannerLists from "../../mock/commonData/Banner"
import bannerNavLists from "./enums/enums"
// import BannerNavLists from "../../components/BannerNavLists/BannerNavLists";
import Layout from "../../layout/Layout";
import ItemWrap from "../../components/ItemWrap/ItemWrap"
import Item3_3 from "../../components/Item/Item3_3"
import { docterLists } from "../../api/api"
import GetIndexBannerHOC from "../../HOC/GetIndexBannerHOC"
import PropTypes from "prop-types"
import bannerNav from "./component/BannerNav"

class PsyServer extends Component {
  static PropTypes={
    bannerLists: PropTypes.array
  }
  state = {
    lists:[]
  }
  getDocterlists=()=>{
    docterLists({
      page:1,
      pageSize:5
    },(result)=>{
      this.setState({
        lists:result.list
      })
    })
  }
  componentDidMount() {
    this.getDocterlists();
  }
  render() {
    let {lists}=this.state;
    // let {bannerLists}=this.props;

    return (
      <Layout title={"心理服务"} url={"/"}>
        {/*<WingBlank>*/}
          {/*<Carousel*/}
            {/*autoplay={false}*/}
            {/*infinite*/}
            {/*beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}*/}
            {/*afterChange={index => console.log('slide to', index)}*/}
          {/*>*/}
            {/*{bannerLists.length>0 && bannerLists.map((item,index) => (*/}
              {/*<a*/}
                {/*key={index}*/}
                {/*href={item.bannerLinkUrl}*/}
                {/*style={{ display: 'inline-block', width: '100%', height: 170 }}*/}
              {/*>*/}
                {/*<img*/}
                  {/*src={item.bannerImageUrl}*/}
                  {/*alt=""*/}
                  {/*style={{ width: '100%', verticalAlign: 'top' }}*/}
                  {/*// onError={e => this.handleError(e)}*/}
                {/*/>*/}
              {/*</a>*/}
            {/*))}*/}
          {/*</Carousel>*/}
        {/*</WingBlank>*/}

        {bannerNav(bannerNavLists)}

        <ItemWrap smallTitle={"专家团队"} leftTitle={"更多"} url={"/Expert"} className={"psyServerWrap"} noBottom={true}>
          {
            lists.length>0 && lists.map((item,index)=>(
              <Item3_3 {...{item}} key={index} jumpToM={true}/>
            ))
          }
        </ItemWrap>
      </Layout>
    );
  }
}
export default GetIndexBannerHOC(PsyServer);
