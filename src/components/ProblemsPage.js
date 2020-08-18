import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Spinner } from 'react-bootstrap'

import { getProblemsetProblems } from '../api/codeforces'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allProblems, setAllProblems] = useState([])

  useEffect(() => {
    const getAllProblems = async () => {
      setIsLoading(true)

      let problems = await getProblemsetProblems()

      setIsLoading(false)
      setAllProblems(problems)
    }

    getAllProblems()
  }, [])

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

      { isLoading && <Spinner animation="border" /> }
    </div>
  )
}
