---
order: 0
title: 基本
---


````jsx
import { Modal, Button } from 'b-rc';

class App extends React.Component{
  constructor(props){
     super(props) 
     this.showModal = this.showModal.bind(this)
     this.handleOk = this.handleOk.bind(this)
     this.handleCancel = this.handleCancel.bind(this)
     this.state = {
        visible: false
     }
  }
  
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>
        <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  }
};

ReactDOM.render(<App />, mountNode);
````
