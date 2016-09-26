import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Shop from '../component_src/Shop';
import Basket from '../component_src/Basket';
import ShopItems from '../component_src/ShopItems';
import Checkout from '../component_src/Checkout';


describe('Shop container', () => {
  it('should render basket', function () {
        const wrapper = shallow(<Shop/>);
        expect(wrapper.containsAllMatchingElements([
          <Basket/>
        ])).to.equal(true);
    });
    it('should render shop items', function () {
        const wrapper = shallow(<Shop/>);
        expect(wrapper.containsAllMatchingElements([
          <ShopItems/>
        ])).to.equal(true);
    });
    it('should allow user to add to basket', () => {
      const wrapper = shallow(<Shop/>);
      wrapper.setState({items: {Milk : {Image : "../img/milk.jpg", Measure: "per bottle", Price : 1.3, quantity : 1}}});
      wrapper.instance().updateBasket("Milk", "1");
      expect(wrapper.state('itemsBought')).to.eql({Milk : {Image : "../img/milk.jpg", Measure: "per bottle", Price : 1.3, quantity : 1}});
    });
});

describe('Basket container', () => {
  it('should change state to atCheckout when clicked', () => {
    const wrapper = shallow(<Basket/>);
    const addButton = wrapper.find('button');
    addButton.simulate('click');
    expect(wrapper.state('atCheckout')).to.eql(true);
  });
  it('should render the checkout when state atcheckout true', () => {
    const wrapper = shallow(<Basket/>);
    wrapper.setState({atCheckout : true});
    expect(wrapper.containsAllMatchingElements([
          <Checkout/>
    ])).to.equal(true);
    });
    it('should calculate the GBP total of the basket', () => {
      const wrapper = shallow(<Basket/>);
      wrapper.instance().componentWillReceiveProps({itemsBought:{Milk : {Image : "../img/milk.jpg", Measure: "per bottle", Price : 1.3, quantity : 2}}});
      expect(wrapper.state('basketTotal')).to.equal('2.60');
    });
});

describe('Checkout container', () => {
  it('render "No items in your basket" if basket empty', () => {
    const itemsBought = {};
    const wrapper = shallow(<Checkout itemsBought={itemsBought}/>);
    expect(wrapper.find('li')).to.have.length(2);
    expect(wrapper.containsAllMatchingElements([
          <li className="no-items">No items in your basket</li>
    ])).to.equal(true);
  });
});