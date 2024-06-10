import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';

function Prayer({ name, time }) {
  return (
    <Card sx={{ width: 345, marginLeft: "20px", marginTop: "20px" }}>
      {/* <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          /> */}
      <CardContent>
        <h2>{name}</h2>
        <h1>{time}</h1>
      </CardContent>
    </Card>
  );
}

export default Prayer;
