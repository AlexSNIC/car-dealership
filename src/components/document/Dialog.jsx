import React from 'react';

const Dialog = ({id, children, showModal, onClose, title, ...props}) => {
  return (
    <div>
      {showModal && (
        <div className="dialog" id={id} {...props}>
          <div className="backdrop" onClick={onClose}></div>
          <div className="dialog__box">
            <div className="dialog__header">
              <h2 className="dialog__header-title">{title}</h2>
              <button className="dialog__header-close" onClick={onClose}>&times;</button>
            </div>
            <div className="dialog__content">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;