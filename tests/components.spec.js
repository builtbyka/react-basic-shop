import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Shop from '../component_src/Shop';
import Basket from '../component_src/Basket';
import ShopItems from '../component_src/ShopItems';

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
    it('add total of items before sending to basket', () => {
      const wrapper = shallow(<Shop/>);
      wrapper.setState({items: {Milk : {Image : "../img/milk.jpg", Measure: "per bottle", Price : 1.3, quantity : 1}}});
      wrapper.instance().updateBasket("Milk", "1");
      expect(wrapper.state('itemsBought')).to.eql({Milk : {Image : "../img/milk.jpg", Measure: "per bottle", Price : 1.3, quantity : 1}});
    });
});
