import React from 'react';
import {render} from '@testing-library/react'
import { Icon, IconProps } from './icon'

const defaultProps: IconProps = {
    theme : 'primary',
    icon: 'coffee'
  }

describe('test Icon component',()=>{
    it('should render the corrent default Icon',()=>{
        // 1、 定义render一个wrapper
        const wrapper = render(<Icon {...defaultProps} data-testid="test-icon"/>)
        // 2、 找到这个节点，通过id or class or placeholderText
        const testNode = wrapper.getByTestId('test-icon') as HTMLInputElement
        // 开始期待
        // 3、 期待在文档流中
        expect(testNode).toBeInTheDocument()
        // 4、 期待有一个什么样的class
        expect(testNode).toHaveClass('rock-icon')
    })
})