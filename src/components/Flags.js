import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import images from "../images.json";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 133,
    width: 200
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class Flags extends React.Component {
  // is a stateful component but uses props as well
  constructor(props) {
    super(props);
    this.state = {
      spacing: "16",
      score: 0,
      topscore: 0,
      images
    };
  }

  changeSpacing = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  // Randomizes flag placement after components mounted
  componentDidMount = () => {
    let newImages = JSON.parse(JSON.stringify(this.state.images));
    newImages.sort(() => Math.random() - 0.5);
    this.setState({ images: newImages });
  }

  // updates the score and top score of the App Parent Component
  updateAppScores = () => {
    this.props.onScoreChange(this.state.score);
    this.props.onTSChange(this.state.topscore);
  };

  // shuffles the images array after a flag was clicked
  // 1. assigns the value of this.state.images to newImages
  // 2. checks if the clicked property of the value parameter is equal to 1
  //    if value.clicked === 1 then reset score to 0, save topscore to the new highest score, reset clicked properties to 0
  //    if value.clicked === 0 then set clicked property to 1, increment score by 1, increment topscore if score === topscore 
  shuffleArray = (event, value) => {
    let newImages = JSON.parse(JSON.stringify(this.state.images));
    if (value.clicked) {
      if (this.state.score > this.state.topscore) {
        this.setState(
          { score: 0, topscore: this.state.score },
          this.updateAppScores
        );
      } else {
        this.setState({ score: 0 }, this.updateAppScores);
      }
      newImages.forEach(img => {
        img.clicked = 0;
      });
    } else {
      if (this.state.score === this.state.topscore) {
        this.setState(
          {
            score: this.state.score + 1,
            topscore: this.state.topscore + 1
          },
          this.updateAppScores
        );
      } else {
        this.setState({ score: this.state.score + 1 }, this.updateAppScores);
      }

      newImages.filter(img => {
        return img.id === parseInt(event.target.id);
      })[0].clicked = 1;
    }
    newImages.sort(() => Math.random() - 0.5);
    this.setState({ images: newImages });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            {this.state.images.map((value, idx) => (
              <Grid key={value.id} item>
                <Paper className={classes.paper}>
                  <img
                    src={value.img}
                    id={value.id}
                    onClick={e => this.shuffleArray(e, value)}
                    clicked={value.clicked}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormLabel>How close you want the flags to be?</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="Spacing"
                  value={spacing}
                  onChange={this.changeSpacing("spacing")}
                  row
                >
                  <FormControlLabel value="0" control={<Radio />} label="0" />
                  <FormControlLabel value="8" control={<Radio />} label="8" />
                  <FormControlLabel value="16" control={<Radio />} label="16" />
                  <FormControlLabel value="24" control={<Radio />} label="24" />
                  <FormControlLabel value="32" control={<Radio />} label="32" />
                  <FormControlLabel value="40" control={<Radio />} label="40" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Flags.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Flags);
