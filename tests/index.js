const tape = require('tape')
const Message = require('../')

tape('message API tests', async t => {
  const aPort = {}
  const json = '{"ticks":77,"data":{"type":"Buffer","data":[116,101,115,116]},"ports":[{}]}'

  const params = {
    data: Buffer.from('test'),
    ports: [aPort],
    ticks: 77
  }

  let message = new Message(params)
  message._fromPort = 'test'

  t.equals(message.fromPort, 'test', 'to getter should work')
  t.equals(message.ports[0], aPort, 'to getter should work')
  t.equals(message.data.toString(), 'test', 'to getter should work')
  t.equals(message.ticks, 77, 'resources getter should work')
  t.equals(message.hops, 0, 'hops should return correctly')
  t.equals(JSON.stringify(message), json)
  t.end()
})
