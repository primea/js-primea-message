const tape = require('tape')
const Message = require('../index.js')

tape('message API tests', async t => {
  const params = {
    to: '0/2/1/2',
    data: ['test'],
    atomic: true
  }
  const message = new Message(params)

  t.equals(message.to, params.to, 'to getter should work')
  t.equals(message.data, params.data, 'data getter should work')
  t.equals(message.caps, params.caps, 'caps getter should work')
  t.equals(message.atomic, params.atomic, 'atomic getter should work')
  t.deepEquals(message.from, [], 'from getter should work')

  const toPort = message.nextPort()
  t.equals(toPort, '0', 'should have correct to port')

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

    didTrap = false
    try {
      message.nextPort()
    } catch (e) {
      didTrap = true
    }

    t.true(didTrap, 'message shouldnot be allowed to be sent after it has responed')
    t.end()
  })

  message.respond('test')
})
