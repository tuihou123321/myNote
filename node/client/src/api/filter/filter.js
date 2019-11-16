export function UserBalanceListsFilter(result){
  // let {dealMoney,createTime}=result;
  // let listsItem={
  //   "id":10,
  //   "name":"企业发放",
  //   "money":"100.00",
  //   "balance":"309.00",
  //   "time":"2018-01-25 14:30"
  // }
  // let lists=[];
  //
  //
  //
  // return {
  //   total,
  //   balance:dealMoney,
  //   lists
  // }

  return result;
}

export function psyListsFilter(result){
  let {list}=result;
  list=list.map(item=>{
    let {id,coverUrl,title,content}=item;
    return {
      id,
      name:title,
      cover:coverUrl,
      content,
    }
  })
  result.list=list
  return result;
}


export function articleChangeName(lists){
  if(lists){
    lists.forEach(item=>{
      item.title=item.catName;
    })
  }
  return lists;
}

