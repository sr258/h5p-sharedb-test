import React from "react";

export default function ({
  votesUp,
  votesDown,
  voteUp,
  voteDown,
}: {
  votesUp: number;
  votesDown: number;
  voteUp: () => void;
  voteDown: () => void;
}) {
  return (
    <div>
      <h1>Voting machine</h1>
      <div>{votesUp}</div>
      <button
        onClick={() => {
          voteUp();
        }}
      >
        👍
      </button>
      <div>{votesDown}</div>
      <button
        onClick={() => {
          voteDown();
        }}
      >
        👎
      </button>
    </div>
  );
}
