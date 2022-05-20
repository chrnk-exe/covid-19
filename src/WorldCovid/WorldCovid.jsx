import React from 'react';
import clases from './WorldCovid.module.css'
const Choose=()=>{
  return(
  <div className={clases.choose}>
    <input name="country" list="countries" className={clases.choose__input}/>
<datalist id="countries">
   <option value="Naples" />
   <option value="London" />
   <option value="Berlin" />
   <option value="New York" />
   <option value="Frattamaggiore" />
</datalist>
    <input name="time" list="times" className={clases.choose__input} />
<datalist id="times">
   <option value="2 weeks" />
   <option value="1 mounth" />
   <option value="3 mounth" />
   <option value="6 mounth" />
</datalist>
<input name="amount" list="amounts" className={clases.choose__input}/>
<datalist id="amounts">
   <option value="all" />
   <option value="new" />
   <option value="lethal" />
</datalist>
<button id="">Submit</button>
  </div>
)}
const WorldCovid = () => {
  return (<>
    <div>WorldCovid</div>
    <Choose/></>
  );
};

export default WorldCovid;
