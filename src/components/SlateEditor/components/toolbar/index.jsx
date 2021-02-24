import { Button } from "@material-ui/core";
import { useSlate } from "slate-react";
import { CustomEditor } from "./customEditor";

const Toolbar = () => {
  const editor = useSlate();
  const onBoldHandler = (event) => {
    event.preventDefault(event);
    CustomEditor.toggleBoldMark(editor);
  };
  const onItalicHandler = (event) => {
    event.preventDefault(event);
    CustomEditor.toggleItalicMark(editor);
  };
  const onUnderLineHandler = (event) => {
    event.preventDefault(event);
    CustomEditor.toggleUnderLineMark(editor);
  };
  return (
    <div>
      <Button onClick={onBoldHandler}>B</Button>
      <Button onClick={onItalicHandler}>I</Button>
      <Button onClick={onUnderLineHandler}>U</Button>
    </div>
  );
};
export default Toolbar;
