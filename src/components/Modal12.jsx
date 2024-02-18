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

export default function BasicModal12(props) {
  const { setAtualize, setAtualize2, selected, setSelected } = props;
  const { open12, handleClose12 } = React.useContext(BaereContext);
  const { urlRequisicao } = React.useContext(BaereContext);
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
    const body = {
      ...state,
    }
    try {
      const response = await fetch(`${urlRequisicao}/anamnese/${selected.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      handleClose12();
      setSelected([]);
      setAtualize(body);
      setAtualize2(body);
    } catch (e) {
      return({ type: 404, message: e});
    }
  };

  React.useEffect(() => {
    const getCampos = async () => {
        try {
            let response;
            response = await fetch(`${urlRequisicao}/anamnese/${id}`, {
                    method: 'GET',
                });
            if (!response.ok) {
                throw new Error('Falha ao obter os dados');
            }
            const data = await response.json(); // Parse do corpo da resposta como JSON
            console.log(data, 'eoq')
            let filteredData;
            if (id) {
                filteredData = data.filter(item => item.id === selected.id);
            }
            console.log(filteredData, 'ue')
            setState({
                alergia: filteredData[0].alergia,
                medicacao: filteredData[0].medicacao,
                complicacao: filteredData[0].complicacao,
                valvula: filteredData[0].valvula,
                hipertenso: filteredData[0].hipertenso,
                diabetico: filteredData[0].diabetico,
                })
        } catch (error) {
            console.error('Erro ao obter os dados:', error);
            return { type: 404, message: error.message };
        }
    }
    getCampos()
  }, [open12])

  return (
    <div>
      <Modal
        open={open12}
        onClose={handleClose12}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Editar anamnese
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
              Editar anamnese
            </Button>
        </Box>
      </Modal>
    </div>
  );
}