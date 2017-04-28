const tape = require('tape')
const Message = require('../')

tape('message API tests', async t => {
  const params = {
    to: '0/2/1/2',
    data: ['test'],
    resources: 77
  }
  let message = new Message(params)
  message._fromPort = 'test'

  t.equals(message.fromPort, 'test', 'to getter should work')
  t.equals(message.payload.to, params.to, 'to getter should work')
  t.equals(message.payload.data, params.data, 'data getter should work')
  t.equals(message.resources, 77, 'resources getter should work')
  t.equals(message.hops, 0, 'hops should return correctly')
  t.end()
})
