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

export default function BasicModal3(props) {
  const { setAtualize, setAtualize2 } = props;
  const { open3, handleClose3 } = React.useContext(BaereContext);
  const { urlRequisicao } = React.useContext(BaereContext);
  const { id } = useParams();

  const [state, setState] = React.useState({
    data: "",
    pagou: "",
    tipo: "",
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
      pagou: +state.pagou
    }
    try {
      const response = await fetch(`${urlRequisicao}/pagamentos/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setAtualize(body);
      setAtualize2(body);
      handleClose3();
    } catch (e) {
      return({ type: 404, message: e});
    }
  }

  return (
    <div>
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Adicionar pagamento
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
          <TextField id="outlined-basic" onChange={handleChange} name="data" value={state.data} label="Data do pagamento" type="date" focused variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} name="pagou" value={state.pagou} type="number" label="Pagou" variant="outlined" />
            <FormControl>
            <InputLabel id="demo-simple-select-label2">Tipo do pagamento</InputLabel>
            <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select-label2"
            label="Tipo do pagamento"
            name="tipo"
            sx={{ width: '130px' }}
            value={state.tipo}
            onChange={handleChange}
          >
            <MenuItem value={'PIX'}>PIX</MenuItem>
            <MenuItem value={'Dinheiro'}>Dinheiro</MenuItem>
            <MenuItem value={'Débito'}>Débito</MenuItem>
            <MenuItem value={'Crédito'}>Crédito</MenuItem>
          </Select>
          </FormControl>
          </form>
          <Button onClick={handleSubmit} id="adicionar-tratamento" color="success" variant="contained" endIcon={<PostAddIcon />}>
              Adicionar pagamento
            </Button>
        </Box>
      </Modal>
    </div>
  );
}