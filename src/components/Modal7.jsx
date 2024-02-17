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

export default function BasicModal7(props) {
  const { setAtualize, setAtualize2, selected } = props;
  const { open7, handleClose7 } = React.useContext(BaereContext);
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
      const response = await fetch(`${urlRequisicao}/pagamentos/${selected.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log(response)
      setAtualize(body);
      setAtualize2(body);
      handleClose7();
    } catch (e) {
      console.log(e)
    }
  }

  function convertISODateToFormat(isoDate) {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    let month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se o mês for menor que 10
    let day = date.getUTCDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se o dia for menor que 10

    return `${year}-${month}-${day}`;
}



  React.useEffect(() => {
    const getCampos = async () => {
        try {
            let response;
            if (id) {
                response = await fetch(`${urlRequisicao}/pacientes/${id}`, {
                    method: 'GET',
                });
            } else {
                response = await fetch(`${urlRequisicao}/pagamentos`, {
                    method: 'GET',
                });
            }
            if (!response.ok) {
                throw new Error('Falha ao obter os dados');
            }
            const data = await response.json(); // Parse do corpo da resposta como JSON

            let filteredData;
            if (id) {
                filteredData = data[2].filter(item => item.id === selected.id);
            } else {
                filteredData = data.filter(item => item.id === selected.id);
            }
            setState({
                data: convertISODateToFormat(filteredData[0].data),
                pagou: filteredData[0].pagou,
                tipo: filteredData[0].tipo,
            })
            console.log(filteredData)
        } catch (error) {
            console.error('Erro ao obter os dados:', error);
            return { type: 404, message: error.message };
        }
    }
    getCampos()
  }, [open7])

  return (
    <div>
      <Modal
        open={open7}
        onClose={handleClose7}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Modificar pagamento
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
          <Button onClick={handleSubmit} id="modificar-tratamento" color="success" variant="contained" endIcon={<PostAddIcon />}>
              Modificar pagamento
            </Button>
        </Box>
      </Modal>
    </div>
  );
}