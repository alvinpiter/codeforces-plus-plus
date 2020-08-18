import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')

  return (
    <div>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              placeholder="Your handle"
              onChange={e => setHandle(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Button
              type="submit"
              onClick={e => {
                e.preventDefault()
                console.log(handle)
              }}
            > Submit</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  )
}
