import React, {Component} from 'react';
import ReactDOM from 'react-dom';

  class Modal extends Component {
      constructor(props) {
          super(props);
      }
      handleClose = () => {
          this.props.handleClose();
      }
      
      render() {
        let showHideClassName = this.props.show ? 'modal-div display-block' : 'modal-div display-none';
          return (
            <div className={showHideClassName}>
                <section className='modal-main'>
                    {this.props.children}
                    
                </section>
            </div>
          );
      }
  }
  
  export default Modal;
