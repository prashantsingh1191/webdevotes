import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag } from "./App";
import { useState } from "react";
import ReactSelect from "react-select";

type NotePropsApp = {
    availableTags: Tag[]
}

export function NoteList({availableTags}:NotePropsApp) {
    const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
  return (
    <>
      <Row>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  isMulti
                  
                  options={availableTags.map(tag => {
                    return {label:tag.label, value:tag.id}
                  }) }
                  value={selectedTag.map((tags) => {
                    return { label: tags.label, value: tags.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTag(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                />
              </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}
