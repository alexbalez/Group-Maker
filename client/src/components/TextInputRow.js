import React, { Component } from 'react';
import './components.css';

class TextInputRow extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }

        this.saveValue = this.saveValue.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
    }

    onValueChange(e){
        this.setState({value: e.target.value})
    }

    saveValue(){
        this.props.save(this.state.value)
    }

    componentDidUpdate(){
        this.inputBox.focus()
    }

    render() {
        return (
            <div className="row">
                <h4 className="col-sm m-0 p-0">{this.props.title}</h4>
                <input 
                    className="col-sm" type="text" defaultValue={this.props.value} 
                    onChange={this.onValueChange} 
                    readOnly={!this.props.isOpenForEdit}
                    //create a reference to the input box so we can grab the focus
                    ref={inputRef => (this.inputBox = inputRef)}
                />
                {
                    !this.props.isOpenForEdit ?

                        <div className="col-sm">
                            <button className="btn btn-warning btn-sm" onClick={this.props.toggleForEdit}>Edit</button>
                        </div>
                        :
                        <div className="col-sm">
                            <button className="btn btn-primary btn-sm" onClick={this.props.toggleForEdit}>Cancel</button>
                            <button className="btn btn-success btn-sm ml-1" onClick={this.saveValue}>Save</button>
                        </div>
                }
            </div>
        );
    }
}

export default TextInputRow;
