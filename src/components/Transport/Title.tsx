import { Box, Text, TextField } from "@radix-ui/themes";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setTitle } from "@/state/slices/projectSlice";

export default function Title() {
  const { title } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <Box>
      {isEditing ? (
        <TextField.Root
          ref={inputRef}
          value={title}
          onChange={handleChange}
          onBlur={handleBlur}
          size={"2"}
        />
      ) : (
        <Box px={"2"}>
          <Text
            weight={"medium"}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            {title}
          </Text>
        </Box>
      )}
    </Box>
  );
}
