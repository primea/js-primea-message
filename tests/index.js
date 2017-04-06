const tape = require('tape')
const Message = require('../atomic.js')

tape('message API tests', async t => {
  const params = {
    to: '0/2/1/2',
    data: ['test']
  }
  let message = new Message(params)

  t.equals(message.payload.to, params.to, 'to getter should work')
  t.equals(message.payload.data, params.data, 'data getter should work')
  t.equals(message.atomic, true, 'atomic getter should work')
  t.equals(message.hops, 0, 'hops should return correctly')
  t.deepEquals(message.from, '', 'from getter should work')

  const fakeKernelA = Symbol('a')
  const fakeKernelB = Symbol('b')
  message._visited(fakeKernelA)
  t.true(message.isCyclic(fakeKernelA), 'should detect cyclic messages')

  const messageA = new Message()
  const messageB = new Message()
  messageA._visited(fakeKernelA)
  messageA._visited(fakeKernelB)
  messageB._visited(fakeKernelB, messageA)

  t.true(messageB.isCyclic(fakeKernelB), 'should detect cyclic messages')

  const resultPromise = message.result()
  resultPromise.then(result => {
    t.equals(result, 'test', 'message result should work')
    // test trap conditions
    let didTrap = false
    try {
      message.respond('test')
    } catch (e) {
      didTrap = true
    }

    t.true(didTrap, 'should trap if message responds more then once')
  })

  message.respond('test')
  await message._committed()

  t.true(message.hasResponded, 'message should have responded')

  const messageC = new Message()
  messageC._visited(fakeKernelA, messageA)
  messageC._committed().catch((err) => {
    t.equals(err, 'test2', 'should have correct err message')
    t.end()
  })
  messageC.respond()
  messageA._reject('test2')
})
