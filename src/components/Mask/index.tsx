import React, { FunctionComponent } from "react";

interface Props {
  visible: boolean;
  onMouseMove?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Mask: FunctionComponent<Props> = (props) => {
  const { visible, onMouseMove, onMouseUp } = props;
  if (!visible) return <></>;
  return (
    <div
      className="show_mask"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default Mask;
