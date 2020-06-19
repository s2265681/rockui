import React from 'react';
import {render, RenderResult} from '@testing-library/react'
import Tabs,{TabsProps} from './tabs'
import TabItem from './tabsItem'

const testProps:TabsProps = {
    defaultIndex:0,
    onSelect:jest.fn(),
    className:'test'
}

let wrapper:RenderResult,tabsElement:HTMLElement,disabledElement:HTMLElement;

const generateTabs =(props:TabsProps)=>{
    return(
        <Tabs {...props}>
            <TabItem label="选项卡一">active</TabItem>
            <TabItem label="选项卡二" disabled>disabled</TabItem>
            <TabItem label="选项卡三">this is tab3</TabItem>
     </Tabs>
    )
}


describe('test Tabs and TabsItem component',()=>{
    beforeEach(()=>{
        wrapper = render(generateTabs(testProps))
        tabsElement = wrapper.getByTestId('test-tabs')
        // activeElement = wrapper.getByText('选项卡一')
        disabledElement = wrapper.getByText('选项卡二')
    })
    it('should render corrent tabs and tabsItem based on default props',()=>{
        expect(tabsElement).toBeInTheDocument();
        expect(tabsElement).toHaveClass('tabs test')
        expect(tabsElement.getElementsByTagName('li').length).toEqual(3)
        expect(disabledElement).toHaveClass('tabs-item is-disabled')
    })
})