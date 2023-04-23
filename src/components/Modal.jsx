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

export default function BasicModal(props) {
  const { setAtualize } = props;
  const { open, handleClose } = React.useContext(BaereContext);
  const [state, setState] = React.useState({
    nome: "",
    data_de_nascimento: "",
    cpf: "",
    email: "",
    profissao: "",
    telefone: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    cep: "",
  })

  function clearInputs() {
    setState({
      nome: "",
      data_de_nascimento: "",
      cpf: "",
      email: "",
      profissao: "",
      telefone: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      cep: "",
      })
    };


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
      dataDeNascimento: state.data_de_nascimento,
    }
    try {
      const response = await fetch('https://baereodontologiaversaofinal-dtkwd4jzea-rj.a.run.app/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setAtualize(body);
      handleClose();
    } catch (e) {
      return({ type: 404, message: e});
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Adicionar ficha
          </Typography>
          <div id="action-buttons">
          <Button 
          variant="outlined" 
          onClick={() => clearInputs()}
          startIcon={<ClearAllIcon />}
          >
            Limpar os campos
          </Button>
          <Button onClick={handleClose} color="error" variant="contained" startIcon={<DisabledByDefaultIcon />}>
            Cancelar
          </Button>
          </div>
          </div>
          <form id="add-new-ficha">
            <TextField id="outlined-basic" onChange={handleChange} value={state.nome} name="nome" type="text" label="Nome" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.data_de_nascimento} name="data_de_nascimento" label="Data de nascimento" type="date" focused variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.cpf} name="cpf" type="text" label="CPF" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.email} name="email" type="text" label="Email" variant="outlined" />            
            <TextField id="outlined-basic" onChange={handleChange} value={state.profissao} name="profissao" type="text" label="Profissão" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.telefone} name="telefone" type="text" label="Telefone" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.estado} name="estado" type="text" label="Estado" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.cidade} name="cidade" type="text" label="Cidade" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.bairro} name="bairro" type="text" label="Bairro" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.rua} name="rua" type="text" label="Rua" variant="outlined" />            
            <TextField id="outlined-basic" onChange={handleChange} value={state.numero} name="numero" type="text" label="Número" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.cep} name="cep" type="text" label="CEP" variant="outlined" />
          </form>
          <Button onClick={handleSubmit} id="adicionar-ficha" color="success" variant="contained" endIcon={<PostAddIcon />}>
              Adicionar ficha
            </Button>
        </Box>
      </Modal>
    </div>
  );
}