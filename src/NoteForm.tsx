import React, { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NoteForm({ onSubmit, availableTags, onAddTag }: NoteFormProps) {
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag[]>([]);

  const navigate = useNavigate();

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleOnChangeMarkdown = (event: any) => {
    setMarkdown(event.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: title,
      markdown: markdown,
      tags: selectedTag,
    });

    navigate("..");
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  value={title}
                  onChange={handleOnChangeTitle}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  isMulti
                  onCreateOption={(label) => {
                    const newTag = { id: v4(), label };
                    onAddTag(newTag);
                    setSelectedTag((prev) => [...prev, newTag]);
                  }}
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
          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={15}
              value={markdown}
              onChange={handleOnChangeMarkdown}
            />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="multiple-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
