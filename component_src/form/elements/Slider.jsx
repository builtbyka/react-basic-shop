import React from 'react';
import ReactSlider from 'react-slider';

class Slider extends React.Component {

   constructor(props){
        super(props);
        let {options, prefill} = this.props;
        this.state = {
          val : (prefill > 0 ? prefill : options[2]),
          options: options
        }
        this.onChange = this.onChange.bind(this);
    }

  onChange(e){
    let {options, onSelect, name, prefill} = this.props;
    let ob = {currentTarget: {}};
    ob.currentTarget.name = name;
    ob.currentTarget.value = e;
    this.props.onSelect(ob);
    this.setState({val: e});
  }

	render(){
		return (
            <div>
              <ReactSlider name={name} onChange={this.onChange} className="activity-slider" min={this.state.options[0]} max={this.state.options[1]} defaultValue={this.state.val} withBars>
                <div className="handler">{this.state.val}</div>
              </ReactSlider>
            </div>
		)
	}
}

export default Slider