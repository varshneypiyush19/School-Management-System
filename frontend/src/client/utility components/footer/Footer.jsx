import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">School Managemnt System</Typography>
        <Typography variant="p">Copyright@2025</Typography>
      </Box>
    </>
  );
}
