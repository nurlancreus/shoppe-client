import React from "react";
import AddCommentForm from "./add-comment-form";
import Heading from "@/components/ui/heading";
import CommentList from "./comment-list";
import { cookies } from "next/headers";

const commentsData = [
  {
    id: "comment-1",
    firstName: "Charlie",
    lastName: "Jones",
    added: "2024-10-01T12:32:41.858351",
    body: "This is the body of comment 1.",
    replies: [
      {
        id: "reply-1-1",
        firstName: "Eva",
        lastName: "Williams",
        added: "2024-09-27T12:32:41.858389",
        body: "This is a reply to comment 1, reply 1.",
      },
      {
        id: "reply-1-2",
        firstName: "David",
        lastName: "Williams",
        added: "2024-09-29T12:32:41.858402",
        body: "This is a reply to comment 1, reply 2.",
      },
    ],
  },
  {
    id: "comment-2",
    firstName: "Charlie",
    lastName: "Brown",
    added: "2024-09-30T12:32:41.858413",
    body: "This is the body of comment 2.",
    replies: [
      {
        id: "reply-2-1",
        firstName: "Alice",
        lastName: "Brown",
        added: "2024-09-28T12:32:41.858426",
        body: "This is a reply to comment 2, reply 1.",
      },
      {
        id: "reply-2-2",
        firstName: "David",
        lastName: "Williams",
        added: "2024-09-27T12:32:41.858432",
        body: "This is a reply to comment 2, reply 2.",
      },
    ],
  },
  {
    id: "comment-3",
    firstName: "Alice",
    lastName: "Williams",
    added: "2024-10-02T12:32:41.858438",
    body: "This is the body of comment 3.",
    replies: [
      {
        id: "reply-3-1",
        firstName: "Eva",
        lastName: "Jones",
        added: "2024-10-03T12:32:41.858445",
        body: "This is a reply to comment 3, reply 1.",
      },
    ],
  },
];

let user = null;

export default function Comments() {
  const _cookies = cookies();

  const userDataCookie = _cookies.get("userData");
  let user = null;

  if (userDataCookie) {
    try {
      user = JSON.parse(userDataCookie.value);
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }

  return (
    <section id="replies" className="px-36">
      <div className="mb-16 mt-12">
        <header>
          <Heading as="h4">Leave a Reply</Heading>
          <p className="mb-16 mt-4 text-body-medium text-dark-gray">
            Your email address will not be published. Required fields are marked
            *
          </p>
        </header>
        <AddCommentForm />
      </div>
      <div>
        <h5 className="mb-11">Comments({commentsData.length})</h5>
        <CommentList comments={commentsData} />
      </div>
    </section>
  );
}
