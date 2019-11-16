import React  from 'react';

export default function Explain(){
  return (
    <div className="bg-white p10 pt15 pb15 bdrs10 mt10">
      <h3 className={"tac fz16 p15"}>阅读说明</h3>
      <div className={"grey"}>
        <h4 className={"p5"}>感谢您的参与，阅读本报告时，请注意以下事项：</h4>
        <p>♦&nbsp;&nbsp;阅读时可以先查看图表快速掌握报告内容，然后有针对性地阅读对应文字；</p>
        <p>♦&nbsp;&nbsp;如报告与你自己或他人的感知有出入，可回忆测试时是否有事情影响了你，或者是否自己答题时有所顾虑；</p>
        <p>♦&nbsp;&nbsp;本报告不可作为临床诊断的依据，也不赞成把它作为你生活和工作中重大决策的唯一依据；</p>
        <p>♦&nbsp;&nbsp;如对报告内容有不理解的地方，建议向有专业资质的人员进行咨询</p>
      </div>
    </div>
  )
}
