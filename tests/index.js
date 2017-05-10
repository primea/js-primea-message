const tape = require('tape')
const Message = require('../')

tape('message API tests', async t => {
  const aPort = Symbol('A')

  const params = {
    data: 'test',
    ports: [aPort],
    resources: {
      ticks: 77,
      priority: 100
    }
  }

  let message = new Message(params)
  message._fromPort = 'test'

  t.equals(message.fromPort, 'test', 'to getter should work')
  t.equals(message.ports[0], aPort, 'to getter should work')
  t.equals(message.data, 'test', 'to getter should work')
  t.equals(message.ticks, 77, 'resources getter should work')
  t.equals(message.priority, 100, 'resources getter should work')
  t.equals(message.hops, 0, 'hops should return correctly')
  t.end()
})
