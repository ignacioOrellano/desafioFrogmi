import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, Link, TextField, Button, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '5%',
  boxShadow: 24,
  p: 4,
};


const FeatureModal = ({ open, handleClose, data, getComments, postComment }) => {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleChangeNewComment = (event) => {
    setNewComment(event.target.value)
  }

  const updateComments = () => {
    getComments(data.id)
    .then(res => res ? setComments(res) : setComments([]));
  }

  useEffect(() => {
    if(data) updateComments();     
      
    setNewComment('');
  }, [open]);

  const handleClickPost = (event) => {
    postComment(data.id, newComment)
    .then(res => updateComments());
  }


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {data.attributes ?
        <Box sx={style}>
          <Typography id="feature-title" variant="h4" component="h2" marginBottom={1}>
            {data.attributes.title}
          </Typography>
          <Typography id="feature-place">
            <strong>Place:</strong> {data.attributes.place}
          </Typography>
          <strong>Time:</strong> {data.attributes.time}
          <Typography id="feature-time">
          </Typography>
          <Typography id="feature-magnitude">
            <strong>Magnitude:</strong> {data.attributes.magnitude}
          </Typography>
          <Typography id="feature-magType">
            <strong>Magnitude type:</strong>  {data.attributes.mag_type}
          </Typography>
          <Typography id="feature-tsunami">
            <strong>Tsunami:</strong> {data.attributes.tsunami.toString()}
          </Typography>
          <Typography id="feature-coordinates-lat">
            <strong>Latitude:</strong> {data.attributes.coordinates.latitude}
          </Typography>
          <Typography id="feature-coordinates-long">
            <strong>Longitude:</strong> {data.attributes.coordinates.longitude}
          </Typography>
          <Typography id="feature-coordinates">
            <strong>Link:</strong> <Link href={data.links.external_url} target='_blank'>{data.links.external_url}</Link>
          </Typography>

          <Stack direction='column' mt={2}>
            <Typography variant='h6'>Comments section</Typography>
            <Box sx={{ maxHeight: 250, overflow: 'scroll' }}>
              {comments.length > 0? comments.map((c, index) => {
                return (
                  <>
                    <Typography>Comment {index+1}</Typography>
                    <Typography pl={2}>{c.body}</Typography>
                  </>
                )
              }): <Typography pl={2}>No comments yet!</Typography>}
            </Box>

            <Box sx={{ marginTop: 2 }}>
              <Stack direction='row' gap={2}>
                <TextField 
                  fullWidth 
                  id='comment-body'
                  label='Put your comment here!'
                  value={newComment}
                  onChange={handleChangeNewComment}
                />
                <Button
                  startIcon={<AddCircleIcon />}
                  variant='contained'
                  onClick={handleClickPost}
                  sx={{paddingLeft: 3}}
                >
                  Comment
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>

        : <></>}
    </Modal>
  )
}

export default FeatureModal