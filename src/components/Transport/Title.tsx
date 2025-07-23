import { Box, Text, TextField } from "@radix-ui/themes";
import { useState, useRef } from "react";

export default function Title() {
  const [title, setTitle] = useState("New Project");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <Box>
      {isEditing ? (
        <TextField.Root
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          size={"2"}
        />
      ) : (
        <Box px={"2"}>
          <Text weight={"medium"} onClick={handleClick} style={{ cursor: "pointer" }}>
            {title}
          </Text>
        </Box>
      )}
    </Box>
  );
}
