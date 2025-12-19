import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ScaleIcon from "@mui/icons-material/Scale";
import StraightenIcon from "@mui/icons-material/Straighten";
import PhishingIcon from "@mui/icons-material/Phishing";
import Stack from "@mui/material/Stack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip";

export default function CatchCards({ catches = [], speciesMap = {} }) {
  return (
    <div>
      {catches.map((catchObj) => {
        const speciesName = speciesMap[catchObj.species_id] || "Unknown";
        return (
          <Card key={catchObj.id} variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Stack // sx must be max width and justify center to center align
                sx={{ width: "100%", mb: 2 }}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <PhishingIcon fontSize="large" color="primary" />
                <Typography variant="h4">{speciesName}</Typography>
              </Stack>
              <Stack
                sx={{ width: "100%", mb: 2 }}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <ScaleIcon fontSize="medium" color="primary" />
                <Chip
                  label={`${catchObj.weight} lbs`}
                  size="large"
                  sx={{ fontSize: "1.5rem", height: 36 }}
                />
              </Stack>
              <Stack
                variant="h6"
                sx={{ width: "100%", mb: 2 }}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <StraightenIcon fontSize="medium" color="primary" />
                <Chip
                  label={`${catchObj.length} in`}
                  size="large"
                  sx={{ fontSize: "1.5rem", height: 36 }}
                />
              </Stack>
              <Stack
                sx={{ width: "100%", mb: 2 }}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <AccessTimeIcon fontSize="medium" color="primary" />
                <Typography variant="h5">
                  {new Date(catchObj.date_caught).toLocaleDateString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
