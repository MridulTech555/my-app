import React, { useRef }  from 'react';
import CheckAllList from './CheckAllComponent';
import './App.css';


function App () {
  const childRef1 = useRef(null);
  const childRef2 = useRef(null);

  const submitForm = () => {
    alert('Your submit code goes here');
  } 

    return (
      <div className="boxWrapper">
        <div className="contentWrapper">
          <div><CheckAllList childRef={childRef1} title='Companies' options = {['Stream Flare', 'Kloudbound', 'Soundpatrol']} /></div>
          <div><CheckAllList childRef={childRef2} title='Roles' options = {['Data Science', 'Data Engineering', 'Developer']} /></div>
        </div>
        <div className="btnWrapper">
          <button className="btn">Cancel</button>
          <button className="btn primary-btn" onClick={submitForm}>Apply Filter</button>
        </div>  
      </div>
    );

}

export default App;