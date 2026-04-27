

// function Complaint() {
//     return (
//         <>
//             <Navbar />

//             <div className="student-dashboard">

//                 <div className="welcome"></div>

//                 <div className="actions"></div>

//                 <div className="stats"></div>

//                 <div className="recent-complaints"></div>

//             </div>
//         </>
//     );
// }

import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Increase
      </button>
    </div>
  );
}

export default Counter;


