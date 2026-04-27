// import React, { useState } from "react";
// import "../styles/login.css";

// function Login() {

//   const [role, setRole] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Login as ${role}`);
//   };

//   return (
//     <div className="container">

//       <div className="login-box">

//         <h2>Welcome Back</h2>
//         <p className="subtitle">Login to continue</p>

//         <form onSubmit={handleSubmit}>

//           {/* ROLE SELECT */}
//           <label>Login As</label>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="student">Student</option>
//             <option value="staff">Staff</option>
//             <option value="hod">HOD</option>
//           </select>

//           {/* PRN / EMPLOYEE ID */}
//           {role && (
//             <>
//               <label>
//                 {role === "student" ? "PRN Number" : "Employee ID"}
//               </label>
//               <input
//                 type="text"
//                 placeholder={
//                   role === "student"
//                     ? "Enter PRN Number"
//                     : "Enter Employee ID"
//                 }
//                 required
//               />
//             </>
//           )}

//           {/* PASSWORD */}
//           {role && (
//             <>
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 required
//               />

//               <button type="submit">Login</button>
//             </>
//           )}

//         </form>

//       </div>

//     </div>
//   );
// }

// export default Login;