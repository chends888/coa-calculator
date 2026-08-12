import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingIndicator = ({ text = "Loading resources..." }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
    }}
  >
    <CircularProgress size={28} sx={{ marginBottom: 1.5 }} />
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  </Box>
);

export default LoadingIndicator;
