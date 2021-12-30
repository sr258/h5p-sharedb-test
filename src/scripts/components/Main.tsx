import React, { useRef } from "react";

export default function ({
  text,
  onChange,
}: {
  text?: string;
  onChange: (oldValue: string, newValue: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Text: {text}</h1>
      <input type="text" ref={inputRef}></input>
      <button
        onClick={() => {
          if (inputRef.current?.value && text) {
            onChange(text, inputRef.current.value);
          }
        }}
      ></button>
    </div>
  );
}
