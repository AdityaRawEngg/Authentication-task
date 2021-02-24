import { useRef, useEffect, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
export default function Editor(props) {
  const [content, setContent] = useState("<p>Default Value</p>");
  const editorRef = useRef();

  useEffect(() => {
    // console.log(editorRef.current.editor.core);
  }, []);

  const handleInput = (event) => {
    // console.log(event.data);
  };
  const handleChange = (value) => {
    // console.log(value); //Get the click event
    setContent(value);
  };
  return (
    <SunEditor
      ref={editorRef}
      setContents={content}
      placeholder="Sun Editor"
      height="100%"
      setOptions={{
        buttonList: buttonList.complex,
      }}
      onInput={handleInput}
      onChange={handleChange}
    />
  );
}
