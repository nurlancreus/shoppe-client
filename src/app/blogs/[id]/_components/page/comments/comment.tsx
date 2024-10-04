"use client";

import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";
import { CommentType } from "@/types";
import { useState } from "react";
import AddComment from "./add-comment-form";
import CommentList from "./comment-list";
import { formatDate } from "@/utils/helpers";

type CommentProps = {
  comment: CommentType;
  isReply?: boolean;
};

export default function Comment({ comment, isReply = false }: CommentProps) {
  const [addReply, setAddReply] = useState(false);

  return (
    <li className="py-10">
      <article>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-h3-desktop">
              {comment.firstName} {comment.lastName}
            </p>
            <span className="text-body-medium">
              {formatDate(comment.added)}
            </span>
          </div>

          <IconButton
            onClick={() => {
              setAddReply((p) => !p);
            }}
            className="flex items-center gap-1 text-dark-gray"
          >
            <SvgIcon id="share" width={16} height={14} />
            <span className="text-sm">Reply</span>
          </IconButton>
        </div>
        <div>
          <p className="mt-2 text-h5-desktop text-dark-gray">{comment.body}</p>
        </div>
      </article>
      {addReply && (
        <AddComment
          user={{
            firstName: "john",
            lastName: "doe",
            email: "example@gmail.com",
          }}
        />
      )}
      {comment.replies && (
        <div className="ml-10">
          <CommentList comments={comment.replies} />
        </div>
      )}
    </li>
  );
}
