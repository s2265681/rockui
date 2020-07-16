import React from 'react';
var Transition = function (props) {
    return React.createElement("div", null, "transition");
};
// const Transition: React.FC<TransitionProps> = (props) => {
//   const {
//     children,
//     classNames,
//     animation,
//     wrapper,
//     ...restProps
//   } = props
//   return (
//     <CSSTransition
//       classNames = { classNames ? classNames : animation}
//       {...restProps}
//     >
//       {wrapper ? <div>{children}</div> : children}
//     </CSSTransition>
//   )
// }
// Transition.defaultProps = {
//   // unmountOnExit: true,
//   appear: true,
// }
export default Transition;
