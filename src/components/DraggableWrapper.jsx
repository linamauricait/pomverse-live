import React from "react";
import Draggable from "react-draggable";

const DraggableWrapper = ({ children }) => {
  return (
    <Draggable handle=".drag-handle">
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;
