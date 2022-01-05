import React from "react";

export default function ({
  votesUp,
  votesDown,
  isTeacher,
  voteUp,
  voteDown,
  clear,
}: {
  votesUp: number;
  votesDown: number;
  voteUp: () => void;
  voteDown: () => void;
  clear: () => void;
  isTeacher: boolean;
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
      {isTeacher && <button onClick={clear}>Clear</button>}
    </div>
  );
}
