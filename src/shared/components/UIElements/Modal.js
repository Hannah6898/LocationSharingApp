import "./Modal.css";
import  ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import React from 'react'

//This function holds the structure of the modal and uses props to fill in the content and the classes 
function ModalOverlay(props) {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSumbit={
          props.onSumbit ? props.onSumbit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentclass}`}>
          {props.children}
        </div>
      </form>
      <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

//This function get exported and hold the transitions for the Modal 
function Modal(props) {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );

  //...props forwards the props sent to Model to Model OverLay
}

export default Modal;
