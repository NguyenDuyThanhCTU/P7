// import React from "react";

// const Input = ({ name, placeholder, Type, isChange, submit }) => {
//   const handleClick = () => {
//     submit();
//   };

//   return (
//     <div>
//       <label>{name}</label>
//       <div className="flex gap-5 mt-2">
//         {Type && (
//           <div onClick={setSelected}>
//             <Type
//               placeholder={placeholder}
//               type="text"
//               className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-full"
//               onChange={(e) => isChange(e.target.value)}
//             />
//           </div>
//         )}
//         <div>
//           <button
//             className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl w-[95px]"
//             onClick={handleClick}
//           >
//             Cập nhật
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Input;
