import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Stack,
  ThemeProvider,
  createTheme,
  FormControl,
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  Button,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Table from './components/Table';
import Modal from './components/FeatureModal';
import axiosClient from './config/axiosClient';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

// MultipleSelect
const magTypeValues = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// fetching features data from the API
const getData = async (page = 1, perPage = 10, magType) => {
  let response = undefined;
  try {
    response = await axiosClient.get('api/features', {
      params: {
        page: page,
        per_page: perPage,
        mag_type: magType
      }
    });
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

// fetching comments 
const getComments = async(featureId) => {
  let response = undefined;
  if (!featureId) return [];
  try {
    response = await axiosClient.get(`api/features/${featureId}/comments`);
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

const postComment = async(featureId, body) => {
  try {
    console.log(featureId, body);
    await axiosClient.post(
      `api/features/${featureId}/comments`, 
      {body: body}
    );
  } catch (error) {
    console.log(error);
  }
}

function App() {

  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [magTypeSelected, setMagTypeSelected] = useState([]);

  const fetchData = () => {
    getData(page, perPage, magTypeSelected)
      .then(res => {
        setData(res.data);
        setPagination(res.pagination);
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  // Modal
  const [selectedFeature, setSelectedFeature] = useState({});
  const handleSelectFeature = (id) => {
    let feature = data.find(e => e.id == id);
    setSelectedFeature(feature);
    setOpenModal(true);
  }
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  // MultipleSelect
  const theme = useTheme();

  const handleChangeMagType = (event) => {
    const {
      target: { value },
    } = event;
    setMagTypeSelected(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // Page Select
  const handleChangePage = (event) => {
    setPage(event.target.value);
  }

  // Per_Page Select
  const handleChangePerPage = (event) => {
    setPerPage(event.target.value);
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>

        <Container>

          <Modal open={openModal} handleClose={handleCloseModal} data={selectedFeature} getComments={getComments} postComment={postComment}/>

          <Stack direction='row'>
            <Typography variant='h1'>Latest Earthquakes</Typography>
          </Stack>

          <Stack direction='column'>

            <Stack direction='row' justifyContent='center' gap={2} paddingY={2}>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="magTypeMultipleSelectLabel">Select Mag Type</InputLabel>
                <Select
                  labelId="magTypeMultipleSelectLabel"
                  id="magTypeMultipleSelect"
                  multiple
                  value={magTypeSelected}
                  onChange={handleChangeMagType}
                  input={<OutlinedInput id="select-multiple-chip" label="Select Mag Type" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {magTypeValues.map((mgType) => (
                    <MenuItem
                      key={mgType}
                      value={mgType}
                      style={getStyles(mgType, magTypeSelected, theme)}
                    >
                      {mgType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="page"
                label="Page"
                variant="outlined"
                type='number'
                value={page}
                onChange={handleChangePage}
              />
              <TextField
                id="per_page"
                label="Per Page"
                variant="outlined"
                type='number'
                value={perPage}
                onChange={handleChangePerPage}
              />

              <Button
                startIcon={<SearchIcon />}
                variant='contained'
                onClick={fetchData}
              >
                Search
              </Button>

            </Stack>

            <Table data={data} handleSelectData={handleSelectFeature}/>
          </Stack>

          <Stack direction='row' sx={{mt:2, p: 2}} justifyContent='center' alignItems='center' gap={2}>
            <Typography>Developed by Ignacio Orellano</Typography>
            <Link href='https://linkedin.com/in/ignacio-orellano' target='_blank'>
              <LinkedInIcon />
            </Link>
          </Stack>

        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
