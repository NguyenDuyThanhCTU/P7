import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = ({ initialValue, onChange }) => {
  const [editorData, setEditorData] = useState(initialValue);

  useEffect(() => {
    setEditorData(initialValue);
  }, [initialValue]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    onChange(data);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
