import React from "react";
import Comment from "./comment";
import { CommentType } from "@/types";

export default function CommentList({ comments }: { comments: CommentType[] }) {
  return (
    <ul className="divide-y divide-gray">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
