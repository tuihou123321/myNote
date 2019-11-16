import React from 'react';

let testResult2=[{
  score: 9,
  name: "躯体化",
  number: 12
}, {
  score: 12,
  name: "强迫症状",
  number: 10
}]

export default function ReportTableCommon({testResult}){
    return (
      <div className={"m10 ml0 bdrs10 bdrb0 w100p"}>
        <table className={"white w100p tac"}>
          <tr className={"tac"}>
            <td className={"p10 bdt1Green"}>类型</td>
            {testResult[0].number && <td className={"p10 bdt1Green"}>平均分</td>}
            <td className={"p10 bdt1Green"}>总分</td>
          </tr>
          {
           testResult.map(item=>(
              <tr className={"tac"}>
                <td className={"p10 bdt1Green"}>{item.name}</td>
                {item.number &&  <td className={"p10 bdt1Green"}>{(item.score/item.number).toFixed(2)}分</td>}
                <td className={"p10 bdt1Green"}>{item.number}分</td>
              </tr>
            ))
          }
        </table>
      </div>
    );
}
