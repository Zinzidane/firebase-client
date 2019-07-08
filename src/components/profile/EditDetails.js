import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme,
  button: {
    float: 'right'
  }
});

const editDetails = props => {
  const [details, setDetails] = useState({
    bio: '',
    website: '',
    location: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  // state = {
  //   bio: '',
  //   website: '',
  //   location: '',
  //   open: false
  // };
  const mapUserDetailsToState = (credentials) => {
    setDetails({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    })
    // this.setState({
    //   bio: credentials.bio ? credentials.bio : '',
    //   website: credentials.website ? credentials.website : '',
    //   location: credentials.location ? credentials.location : ''
    // });
  };
  const handleOpen = () => {
    setIsOpen(true);
    mapUserDetailsToState(props.credentials);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const { credentials } = props;
    mapUserDetailsToState(credentials);
  }, []);
  // componentDidMount() {
  //   const { credentials } = this.props;
  //   this.mapUserDetailsToState(credentials);
  // }

  const handleChange = (event) => {
    setDetails({
      [event.target.name]: event.target.value
    });
    // this.setState({
    //   [event.target.name]: event.target.value
    // });
  };
  const handleSubmit = () => {
    const userDetails = {
      bio: details.bio,
      website: details.website,
      location: details.location
    };
    props.editUserDetails(userDetails);
    handleClose();
  };
  const { classes } = props;
  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={details.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={details.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={details.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

editDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(editDetails));
