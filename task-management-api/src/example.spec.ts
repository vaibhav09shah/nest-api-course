describe('Example Test', () => {
    it('equals true', () => {
        expect(true).toEqual(true)
    })
})

describe('add two numbers', () => {
    it('adds two numbers ', () => {
        expect(addNumber(2,2)).toEqual(4)
    })
})

function addNumber (num1, num2 ) {
    return num1 + num2;
}