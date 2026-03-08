"use client";

import React from "react";
import { ReactSVG } from "react-svg";

type CommentProps = {
  children?: React.ReactNode;
  isChild?: boolean;
  forMobile?: boolean;
  replyCount?: number;
  name?: string;
  role?: string;
  timestamp?: string;
  avatarSrc?: string;
  content?: string;
};

const Comment = ({
  children,
  isChild = true,
  forMobile = false,
  replyCount = 0,
  name = "Utange Kevin",
  role = "Instructor",
  timestamp = "",
  avatarSrc = "/assets/person_1.png",
  content = `Welcome to the Product Design forum. You can discuss all things product design here and ask questions and you will get answers from either the instructor, your fellow students, or past TBC students of product Design. Kindly be respectful in the chat. Cheers.`,
}: CommentProps) => {
  const [showReplies, setShowReplies] = React.useState(false);
  const [showReplyInput, setShowReplyInput] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const replyComposerId = React.useId();
  const repliesPanelId = React.useId();

  const childRepliesCount = React.Children.count(children);
  const resolvedReplyCount = replyCount > 0 ? replyCount : childRepliesCount;
  const hasReplies = childRepliesCount > 0 || replyCount > 0;
  const isPrivilegedRole = /instructor|admin|moderator/i.test(role);

  const avatarSize = isChild ? "size-10" : forMobile ? "size-10" : "size-11";
  const bodyTextSize = forMobile ? "text-[14px]" : "text-[15px]";

  return (
    <article className="w-full">
      <div className={isChild ? "relative pl-4 sm:pl-5" : ""}>
        {isChild ? (
          <span
            aria-hidden
            className="absolute left-0 top-1 bottom-2 w-px rounded-full bg-gradient-to-b from-primary-200/80 via-neutral-300 to-transparent"
          />
        ) : null}

        <div
          className={`rounded-2xl border border-neutral-200/90 bg-white/80 px-3.5 py-3 backdrop-blur-sm sm:px-4 sm:py-4 ${
            showReplies ? "shadow-[0_10px_26px_-22px_rgba(0,0,0,0.45)]" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <div className="rounded-full ring-1 ring-neutral-200/90 ring-offset-2 ring-offset-white">
                <img
                  src={avatarSrc}
                  alt={`${name}'s avatar`}
                  className={`${avatarSize} rounded-full object-cover`}
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h4 className="truncate text-sm font-semibold text-neutral-900 sm:text-[15px]">
                  {name}
                </h4>

                {role ? (
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${
                      isPrivilegedRole
                        ? "border-primary-200 bg-primary-50 text-primary-700"
                        : "border-neutral-200 bg-neutral-50 text-neutral-600"
                    }`}
                  >
                    {role}
                  </span>
                ) : null}

                {timestamp ? (
                  <span className="text-xs text-neutral-500">{timestamp}</span>
                ) : null}
              </div>

              <p
                className={`mt-2 whitespace-pre-line font-normal leading-6 text-neutral-800 ${bodyTextSize}`}
              >
                {content}
              </p>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setShowReplyInput((prev) => !prev)}
                  aria-expanded={showReplyInput}
                  aria-controls={replyComposerId}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1.5 text-sm font-medium text-neutral-600 transition-[color,background-color,border-color,transform] duration-200 hover:border-neutral-200 hover:bg-neutral-50 hover:text-primary active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center opacity-85 transition-opacity group-hover:opacity-100">
                    <ReactSVG src="/icons/reply.svg" />
                  </span>
                  <span>{showReplyInput ? "Cancel" : "Reply"}</span>
                </button>

                {hasReplies ? (
                  <button
                    type="button"
                    onClick={() => setShowReplies((prev) => !prev)}
                    aria-expanded={showReplies}
                    aria-controls={repliesPanelId}
                    className="group inline-flex min-h-9 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-600 transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-primary-200 hover:bg-primary-50/60 hover:text-primary active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    <span>
                      {resolvedReplyCount}{" "}
                      {resolvedReplyCount === 1 ? "reply" : "replies"}
                    </span>
                    <span
                      className={`inline-flex transition-transform duration-300 ${
                        showReplies ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ReactSVG src="/icons/angle-down.svg" />
                    </span>
                  </button>
                ) : null}
              </div>

              <div
                id={replyComposerId}
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                  showReplyInput
                    ? "mt-3 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`rounded-xl border border-neutral-200 bg-white/95 p-3 transition-[transform,opacity] duration-300 ease-out ${
                      showReplyInput
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1 opacity-0"
                    }`}
                  >
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      className="min-h-[92px] w-full resize-none rounded-lg bg-transparent text-sm leading-6 text-neutral-900 outline-none placeholder:text-neutral-500"
                    />
                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowReplyInput(false);
                          setReplyText("");
                        }}
                        className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-[opacity,transform] duration-200 hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
                        disabled={!replyText.trim()}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id={repliesPanelId}
        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
          showReplies ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`space-y-3 ${isChild ? "pl-4 sm:pl-5" : "pl-2 sm:pl-4"} ${
              showReplies ? "translate-y-0" : "-translate-y-1"
            } transition-transform duration-300 ease-out`}
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Comment;
