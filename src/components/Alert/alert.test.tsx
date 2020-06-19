import React from 'react';
import {render} from '@testing-library/react'
import Alert from './alert'

const defaultProps={
    className:'cll'
}

const testProps = {
    type: 'error',
    className: 'klass',
    message:'Nice',
  }

  describe('test Alert component',()=>{
      it('should render the corrent default alert',()=>{
         const wrapper = render(<Alert data-testid="test" {...defaultProps}/>)
         const element = wrapper.getByTestId('test') as HTMLButtonElement
         expect(element).toBeInTheDocument()
         expect(element.tagName).toEqual("DIV")
        //  expect(element).toHaveClass('alert alert-success cll')
      })

    //   it('should render the corrent default alert',()=>{
    //     const wrapper = render(<Alert data-testid="test" {...testProps}/>)
    //     const element = wrapper.getByTestId('test') as HTMLButtonElement
    //     expect(element).toBeInTheDocument()
    //     expect(element.tagName).toEqual("DIV")
    //     expect(element).toHaveClass('alert alert-error klass')
    //  })
  })

  