mutation create($status: Status, $content: RichTextAST) {
  createArticle(data: {
    status: $status
    title: "Maybe Keepish 3"
    content: $content
  }) {
		id
    title
    content {
      raw
      html
      markdown
      text
    }
    summary
  }
}




{
  "status": "PUBLISHED",
  "content": {
    "object": "value",
    "document": {
      "object": "document",
      "data": {},
      "nodes": [{
        "object": "block",
        "type": "paragraph",
        "data": {},
        "nodes": [{
          "object": "text",
          "leaves": [{
            "object": "leaf",
            "text": "Hello World",
            "marks": []
          }]
        }]
      }]
    }
  }
}