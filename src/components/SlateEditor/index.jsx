import { useEffect, useState, useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./components/toolbar";
import { CustomEditor } from "./components/toolbar/customEditor";

export default function SlateEditor(props) {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const editor = useMemo(() => withReact(createEditor()), []);
  const onChangeHandler = (event) => {
    setValue(event);
    console.log(value);
  };

  const onKeyDownHandler = (event) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "`":
          event.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
          break;
        case "b":
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
          break;
        case "l":
          event.preventDefault();
          CustomEditor.toggleItalicMark(editor);
          break;
        case "u":
          event.preventDefault();
          CustomEditor.toggleUnderLineMark(editor);
          break;

        default:
          break;
      }
    }
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={onChangeHandler}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDownHandler}
      />
    </Slate>
  );
}

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "normal",
      }}
    >
      {props.children}
    </span>
  );
  // console.log(props.children.props);
  // if (props.leaf.bold) {
  //   return <strong {...props.attributes}>{props.children}</strong>;
  // }
  // if (props.leaf.italic) {
  //   return <em {...props.attributes}>{props.children}</em>;
  // }
  // if (props.leaf.underline) {
  //   return <u>{props.children}</u>;
  // }

  // return <DefaultElement {...props} />;
};
const CodeElement = (props) => {
  console.log("Code Element", props.children.props.node.children[0].text);
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
const UnderlineTag = (props) => {
  console.log("underline tag");
  return <u {...props.attributes}>{props.children}</u>;
};
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
