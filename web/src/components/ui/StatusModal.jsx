import React from "react";
import "./statusModal.css";

const StatusModal = ({ type = "success", message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-box ${type}`}>
        <div className="icon">{type === "success" ? "✔️" : "❌"}</div>

        <h2>{type === "success" ? "Success" : "Error"}</h2>
        <p>{message}</p>

        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default StatusModal;

// import { useState } from "react";
// import StatusModal from "./StatusModal";

// function App() {
//   const [modal, setModal] = useState(null);

//   return (
//     <div>
//       <button onClick={() => setModal({ type: "success", msg: "Data saved!" })}>
//         Show Success
//       </button>

//       <button
//         onClick={() => setModal({ type: "error", msg: "Something failed!" })}
//       >
//         Show Error
//       </button>

//       {modal && (
//         <StatusModal
//           type={modal.type}
//           message={modal.msg}
//           onClose={() => setModal(null)}
//         />
//       )}
//     </div>
//   );
// }
