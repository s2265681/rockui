import React from 'react';
import {render,fireEvent} from '@testing-library/react'
import { Input,InputProps } from './input'

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
  }

describe('test Input component',()=>{
    it('should render the corrent default Input',()=>{
        // 1、 定义render一个wrapper
        const wrapper = render(<Input {...defaultProps}/>)
        // 2、 找到这个节点，通过id or class or placeholderText
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        // 开始期待
        // 3、 期待在文档流中
        expect(testNode).toBeInTheDocument()
        // 4、 期待有一个什么样的class
        expect(testNode).toHaveClass('rock-input-inner')
        // 5、 测试、期待点击事件值的绑定
        fireEvent.change(testNode,{target:{value:'23'}})
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual('23')
    })
    it('should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder="disabled"/>)
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
      })
      it('should render different input sizes on size property', () => {
        const wrapper = render(<Input placeholder="sizes" size="lg" />)
        const testContainer = wrapper.container.querySelector('.rock-input-wrapper')
        expect(testContainer).toHaveClass('input-size-lg')
      })
      it('should render prepand and append element on addonBefore/addonAfter property', () => {
        const {queryByText, container } = render(<Input placeholder="pend" addonBefore="https://" addonAfter=".com"/>)
        const testContainer = container.querySelector('.rock-input-wrapper')
        expect(testContainer).toHaveClass('input-group input-group-addonBefore input-group-addonAfter')
        expect(queryByText('https://')).toBeInTheDocument()
        expect(queryByText('.com')).toBeInTheDocument()
      })
})