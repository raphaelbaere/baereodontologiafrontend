import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BaereContext } from '../context/BaereProvider';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import '../styles/form.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useParams } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal11(props) {
  const { setAtualize, setAtualize2 } = props;
  const { open11, handleClose11 } = React.useContext(BaereContext);
  const { id } = useParams();

  const [state, setState] = React.useState({
    alergia: "",
    medicacao: "",
    complicacao: "",
    valvula: "",
    hipertenso: "",
    diabetico: "",
  });


  function clearInputs() {
    setState({
      alergia: "",
      medicacao: "",
      complicacao: "",
      valvula: "",
      hipertenso: "",
      diabetico: "",
      })
    };



  function handleChange(evt) {
    console.log(state);
    const value =
    evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };


  const handleSubmit = async () => {
  };

  return (
    <div>
      <Modal
        open={open11}
        onClose={handleClose11}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Adicionar anamnese
          </Typography>
          <div id="action-buttons">
          <Button onClick={clearInputs} variant="outlined" startIcon={<ClearAllIcon />}>
            Limpar os campos
          </Button>
          <Button color="error" variant="contained" startIcon={<DisabledByDefaultIcon />}>
            Cancelar
          </Button>
          </div>
          </div>
          <form id="add-new-ficha">
          <TextField id="outlined-basic" onChange={handleChange} value={state.alergia} name="alergia" type="text" label="Alergia" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} value={state.medicacao} name="medicacao" type="text" label="Medicação" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} value={state.complicacao} name="complicacao" type="text" label="Complicação" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} value={state.valvula} name="valvula" type="text" label="Válvula" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} value={state.hipertenso} name="hipertenso" type="text" label="Hipertenso" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} value={state.diabetico} name="diabetico" type="text" label="Diabético" variant="outlined" />
          </form>
          <Button onClick={handleSubmit} id="adicionar-tratamento" color="success" variant="contained" endIcon={<PostAddIcon />}>
              Adicionar anamnese
            </Button>
        </Box>
      </Modal>
    </div>
  );
}