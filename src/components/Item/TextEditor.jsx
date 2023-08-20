import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const TextEditor = ({ editorData, setEditorData }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  // const editorConfiguration = {
  //   toolbar: {
  //     items: [
  //       // ... your existing toolbar items
  //       "imageUpload", // Include the image upload button
  //     ],
  //     shouldNotGroupWhenFull: true,
  //   },
  //   upload: {
  //     upload: async (file) => {
  //       try {
  //         const url = await uploadImage(file, "ckeditor"); // Adjust the location as needed
  //         if (url) {
  //           return { default: url };
  //         }
  //       } catch (error) {
  //         console.error("Error uploading file:", error);
  //         return null;
  //       }
  //     },
  //   },
  // };

  return (
    <div className="CKEditor">
      <CKEditor
        editor={Editor}
        data={editorData}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
