import React from 'react';


export default function ReportTable({testResult,className}){
   let isNumber=testResult[0].number;
    return (
      <div className={`m10 ml0 bdrs10 bdrb0 w100p ${className}`}>
        <table className={"w100p tac"}>
          <tbody>
            <tr className={"tac"}>
              <td className={"p10 bdb1"}>类型</td>
              {isNumber && <td className={"p10 bdb1"}>平均分</td>}
              <td className={"p10 bdb1"}>总分</td>
            </tr>
            {
             testResult.map((item,index)=>(
               item.score>=0 && <tr className={"tac"} key={index}>
                  <td className={"p10 bdb1"}>{item.name}</td>
                  {item.number &&   <td className={"p10 bdb1"}>{(item.score/item.number).toFixed(2)}分</td>}
                  <td className={"p10 bdb1"}>{item.score}分</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
}
