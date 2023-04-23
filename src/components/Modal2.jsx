import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BaereContext } from '../context/BaereProvider';
import { Button, TextField } from '@mui/material';
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

export default function BasicModal2(props) {
  const { setAtualize, setAtualize2 } = props;
  const { open2, handleClose2 } = React.useContext(BaereContext);
  const { id } = useParams();

  const [state, setState] = React.useState({
    data: "",
    tratamento: "",
    doutor: "",
    valor: "",
    acrescimo: "",
    desconto: "",
  });


  function clearInputs() {
    setState({
      data: "",
      tratamento: "",
      doutor: "",
      valor: "",
      acrescimo: "",
      desconto: "",
      })
    };



  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };


  const handleSubmit = async () => {
    const body = {
      ...state,
      acrescimo: +state.acrescimo,
      desconto: +state.desconto,
      valor: +state.valor,
      doutor_id: +state.doutor,
      tratamento_id: +state.tratamento,
    }
    try {
      const response = await fetch(`https://baereodontologia903-dtkwd4jzea-rj.a.run.app/tratamentos/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setAtualize(body);
      setAtualize2(body);
      handleClose2();
    } catch (e) {
      return({ type: 404, message: e});
    }
  };

  return (
    <div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Adicionar tratamento
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
          <TextField id="outlined-basic" onChange={handleChange} value={state.data} name="data" label="Data do tratamento" type="date" focused variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.tratamento} name="tratamento" type="number" label="Tratamento" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.doutor} name="doutor" type="number" label="Doutor(a)" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.valor} name="valor" type="number" label="Valor" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.acrescimo} name="acrescimo" type="number" label="Acréscimo" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.desconto} name="desconto" type="number" label="Desconto" variant="outlined" />
          </form>
          <Button onClick={handleSubmit} id="adicionar-tratamento" color="success" variant="contained" endIcon={<PostAddIcon />}>
              Adicionar tratamento
            </Button>
        </Box>
      </Modal>
    </div>
  );
}