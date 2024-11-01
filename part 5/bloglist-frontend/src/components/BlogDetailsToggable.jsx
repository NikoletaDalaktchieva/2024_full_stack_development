import { useState, forwardRef, useImperativeHandle } from "react";

const BlogDetailsToggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <span>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>

      <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        {props.children}
      </span>
    </span>
  );
});

export default BlogDetailsToggable;
