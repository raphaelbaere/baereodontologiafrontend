import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BaereContext } from '../context/BaereProvider';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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

export default function BasicModal10(props) {
  const { setAtualize, handleSelectSlot } = props;
  const { open10, handleClose10 } = React.useContext(BaereContext);
  const { urlRequisicao, endDate, startDate } = React.useContext(BaereContext);
  const { id } = useParams();

  const [state, setState] = React.useState({
    titulo: "",
    paciente: "",
    doutor: "",
    tratamento: "",
    pacientes: [],
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const handleSubmit = async () => {
    const body = {
      ...state,
      paciente_id: +state.paciente,
      doutor_id: +state.doutor,
      tratamento_id: +state.tratamento,
      start_date: startDate,
      end_date: endDate,
    }
    console.log(body)
    try {
      const response = await fetch(`${urlRequisicao}/eventos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      handleClose10();
      setAtualize(body);
    } catch (e) {
      return({ type: 404, message: e});
    }
  }

  React.useEffect(() => {
    const fetchPacientes = async () => {
      const response = await fetch(`${urlRequisicao}/pacientes`);
      const data = await response.json();
      setState((prev) => ({
        ...prev,
        pacientes: data
    }));
    }
    fetchPacientes();
  }, [])

  return (
    <div>
      <Modal
        open={open10}
        onClose={handleClose10}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Adicionar evento
          </Typography>
          <div id="action-buttons">
          <Button variant="outlined" startIcon={<ClearAllIcon />}>
            Limpar os campos
          </Button>
          <Button color="error" variant="contained" startIcon={<DisabledByDefaultIcon />}>
            Cancelar
          </Button>
          </div>
          </div>
          <form id="add-new-ficha">
          <TextField id="outlined-basic" onChange={handleChange} name="titulo" value={state.titulo} type="text" label="Título do evento" variant="outlined" />
          <FormControl>
            <InputLabel id="demo-simple-select-label2">Paciente</InputLabel>
            <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select-label2"
            label="Paciente"
            name="paciente"
            sx={{ width: '200px' }}
            value={state.paciente}
            onChange={handleChange}
          >
            {state.pacientes.map((item) => (
              <MenuItem value={item.id}>{item.nome}</MenuItem>
            ))}
          </Select>
          </FormControl>
            <FormControl>
            <InputLabel id="demo-simple-select-label2">Doutor</InputLabel>
            <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select-label2"
            label="Doutor"
            name="doutor"
            sx={{ width: '150px' }}
            value={state.doutor}
            onChange={handleChange}
          >
            <MenuItem value={'1'}>Renan Baere</MenuItem>
          </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label2" sx={{ width: '500px'}}>Tratamento</InputLabel>
            <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select-label2"
            label="Tratamento"
            name="tratamento"
            sx={{ width: '200px' }}
            value={state.tratamento}
            onChange={handleChange}
          >
            <MenuItem value={'2'}>Extração simples</MenuItem>
            <MenuItem value={'3'}>Extração siso</MenuItem>
            <MenuItem value={'4'}>Radiografia</MenuItem>
            <MenuItem value={'5'}>Restauração 1 face</MenuItem>
            <MenuItem value={'6'}>Restauração 2 faces</MenuItem>
            <MenuItem value={'7'}>Restauração 3 faces</MenuItem>
            <MenuItem value={'8'}>Canal Uniradicular</MenuItem>
            <MenuItem value={'9'}>Canal Biradicular</MenuItem>
            <MenuItem value={'10'}>Canal Multiradicular</MenuItem>
            <MenuItem value={'11'}>Provisório Unitário</MenuItem>
            <MenuItem value={'12'}>Provisório Total</MenuItem>
            <MenuItem value={'13'}>Bloco</MenuItem>
            <MenuItem value={'14'}>Coroa</MenuItem>
            <MenuItem value={'15'}>Pino Intraradicular</MenuItem>
            <MenuItem value={'16'}>Prótese Total</MenuItem>
            <MenuItem value={'17'}>Prótese Parcial (ROACH)</MenuItem>
            <MenuItem value={'18'}>Ponte Móvel</MenuItem>
            <MenuItem value={'19'}>Ponte Fixa</MenuItem>
            <MenuItem value={'20'}>Ponte Adesiva</MenuItem>
            <MenuItem value={'21'}>Flex</MenuItem>
            <MenuItem value={'22'}>Cimentação</MenuItem>
            <MenuItem value={'23'}>Conserto</MenuItem>
            <MenuItem value={'1'}>Limpeza</MenuItem>
            <MenuItem value={'24'}>Clareamento</MenuItem>
            <MenuItem value={'25'}>Manutenção Ortodontia</MenuItem>
          </Select>
          </FormControl>
          </form>
          <Button onClick={handleSubmit} id="adicionar-tratamento" color="success" variant="contained" endIcon={<PostAddIcon />}>
              Adicionar evento
            </Button>
        </Box>
      </Modal>
    </div>
  );
}