"use client";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { leapfrog } from "ldrs";

leapfrog.register();

function Loading({ open }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={open} aria-describedby="alert-dialog-description">
      <DialogContent>
        <l-leapfrog size="50" speed="2.5" color="#47a67e" bg-opacity=".01"></l-leapfrog>
      </DialogContent>
    </Dialog>
  );
}

export default Loading;
