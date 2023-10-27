"use client";

import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button variant="contained" color="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
