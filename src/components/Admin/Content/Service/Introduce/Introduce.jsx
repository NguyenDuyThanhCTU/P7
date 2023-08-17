import React, { useState } from "react";
import TextEditor from "../../../../Item/TextEditor";

const Introduce = () => {
  const [editorData, setEditorData] = useState("");
  return (
    <div className="flex gap-5">
      <div className="flex-1">
        {" "}
        <TextEditor editorData={editorData} setEditorData={setEditorData} />
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Introduce;
