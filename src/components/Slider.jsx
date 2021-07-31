import React from "react";
import { styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = styled((theme) => ({
  slider: {
    width: "90%",
    maxWidth: "200px",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function valuetext(value) {
  return value;
}

const DiscreteSlider = ({ sliderName }) => {
  

  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        {sliderName}
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
    </div>
  );
};

export default DiscreteSlider;
