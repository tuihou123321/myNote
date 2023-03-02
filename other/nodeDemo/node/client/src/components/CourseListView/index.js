import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ListView } from 'antd-mobile';

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

// const data = this.props.data;
const NUM_SECTIONS = 6;
const NUM_ROWS_PER_SECTION = 1;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {

  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = ii;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];


}

class CourseListView extends Component {
  constructor(props) {
    super(props);
    console.log('this.props', this.props)
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    console.log('dataSource', dataSource)

    this.state = {
      data: this.props.data,
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    // simulate initial Ajax
    setTimeout(() => {
      genData();
      console.log('genData', );
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log(nextProps.data,this.state.data)
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data })
    }
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      genData(++pageIndex);
      this.props.getPage(pageIndex)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  listContent() {

  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          height: 0,
          borderTop: '1px solid #f0f0f0',
          margin: '0 15px'
        }}
      />
    );
    let index = this.state.data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      console.log('sectionID',sectionID)
      if (index < 0) {
        index = this.state.data.length - 1;
      }
      const obj = this.state.data[index--];

      const price = obj.price !== 0 ?
        (<span style={{ color: '#FF6E27' }}>¥<span style={{ fontSize: '.18rem' }}>{obj.price}</span>.00</span>) :
        (<span style={{ color: '#34cd65' }}>免费</span>);
      const link = `/courseDetail/${obj.id}`
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>

          <a href={link} style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <img style={{ height: '.8rem', width: '1.48rem', marginRight: '.15rem' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1, flex: 1, position: 'relative' }}>
              <div style={{ paddingTop: '.08rem', lineHeight: '1.2', fontWeight: 'bold', fontSize: '.16rem' }}>{obj.title}</div>
              <div style={{ position: "absolute", bottom: '.01rem', fontSize: '.12rem' }}>
                {price}
                <span style={{ color: '#b3b3b3', paddingLeft: '.15rem' }}>人气：{obj.applyNo}</span>
              </div>
            </div>
          </a>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ lineHeight: '.4rem', background: '#f2f5f7', color: '#999999', textAlign: 'center' }}>
          {this.state.isLoading ? '正在加载更多...' : '加载完成'}
        </div>)}
        renderBodyComponent={() => <MyBody />}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={10}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default CourseListView;
