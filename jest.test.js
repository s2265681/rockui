test('test common matcher',()=>{
    expect(2+2).toBe(4)
    expect(2+2).not.toBe(5)
})

test('test to be true or false',()=>{
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})

test('test to be true or false',()=>{
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})


test('test number',()=>{
    expect(4).toBeGreaterThan(3)  // 大于
    expect(2).toBeLessThan(3)     // 小于
})

test('test object',()=>{
    expect({name:'rock'}).toStrictEqual({name:'rock'})
})