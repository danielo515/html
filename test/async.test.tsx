import assert from 'node:assert'
import test from 'node:test'
import Html from '../index'
import { setImmediate } from 'node:timers/promises'

async function Async(props: Html.PropsWithChildren) {
  await setImmediate() // simple way to ensure async-ness
  return <div>{props.children}</div>
}

function Sync(props: Html.PropsWithChildren) {
  return <div>{props.children}</div>
}

test('async components', async () => {
  assert(<Sync>{1}</Sync>, '<div>1</div>')
  assert.ok(<Async>{1}</Async> instanceof Promise)
  assert(await (<Async>{1}</Async>), '<div>1</div>')
})

test('async children', async () => {
  const html = (
    <Sync>
      <Async>{1}</Async>
    </Sync>
  )

  assert.ok(html instanceof Promise)
  assert(await html, '<div>1</div>')
})