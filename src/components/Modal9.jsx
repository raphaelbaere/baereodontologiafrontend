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

export default function BasicModal9(props) {
  const { setAtualize, setAtualize2, selected } = props;
  const { open9, handleClose9 } = React.useContext(BaereContext);
  const { urlRequisicao } = React.useContext(BaereContext);
  const { id } = useParams();

  const [state, setState] = React.useState({
    data: "",
    tratamento: "",
    doutor: "",
    valor: "",
    acrescimo: "",
    desconto: "",
    custo: "",
    dente: "",
    realizado: false,
  });


  function clearInputs() {
    setState({
      data: "",
      tratamento: "",
      doutor: "",
      valor: "",
      acrescimo: "",
      desconto: "",
      custo: "",
      dente: "",
      realizado: false,
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
      data: state.data,
      acrescimo: +state.acrescimo,
      desconto: +state.desconto + (+state.custo),
      valor: +state.valor,
      doutor_id: +state.doutor,
      tratamento_id: +state.tratamento,
      realizado: state.realizado ? 'Sim' : 'Não',
    }
    try {
      const response = await fetch(`${urlRequisicao}/tratamentos/${selected.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      handleClose9();
      setAtualize(body);
      setAtualize2(body);
      console.log(response)
    } catch (e) {
      return({ type: 404, message: e});
    }
  };

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
                response = await fetch(`${urlRequisicao}/tratamentos`, {
                    method: 'GET',
                });
            }
            if (!response.ok) {
                throw new Error('Falha ao obter os dados');
            }
            const data = await response.json(); // Parse do corpo da resposta como JSON
            let filteredData;
            if (id) {
                filteredData = data[1].filter(item => item.id === selected.id);
            } else {
                console.log(selected)
                filteredData = data.filter(item => item.paciente.nome === selected.paciente && item.id === selected.id);
                console.log(filteredData)
            }
            setState({
                data: convertISODateToFormat(filteredData[0].data),
                tratamento: filteredData[0].tratamento.id,
                doutor: filteredData[0].doutores.id,
                valor: filteredData[0].valor,
                acrescimo: filteredData[0].acrescimo,
                desconto: filteredData[0].desconto,
                custo: 0,
                dente: filteredData[0].dente,
                realizado: filteredData[0].realizado === 'Sim' ? true : false,
                })
        } catch (error) {
            console.error('Erro ao obter os dados:', error);
            return { type: 404, message: error.message };
        }
    }
    getCampos()
  }, [open9])

  return (
    <div>
      <Modal
        open={open9}
        onClose={handleClose9}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="form-header">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Modificar tratamento
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
          <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label">Tratamento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="tratamento-select"
            label="Tratamento"
            name="tratamento"
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
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label2">Doutor</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="doutor-select"
            label="Doutor(a)"
            name="doutor"
            value={state.doutor}
            onChange={handleChange}
          >
            <MenuItem value={'1'}>Renan Baere</MenuItem>
          </Select>
        </FormControl>
        <TextField id="outlined-basic" onChange={handleChange} value={state.dente} name="dente" type="text" label="Dente" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.valor} name="valor" type="number" label="Valor" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.acrescimo} name="acrescimo" type="number" label="Acréscimo" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.desconto} name="desconto" type="number" label="Desconto" variant="outlined" />
            <TextField id="outlined-basic" onChange={handleChange} value={state.custo} name="custo" type="number" label="Custo" variant="outlined" />
            <FormControlLabel control={<Checkbox color="success" name="realizado" checked={state.realizado} onChange={handleChange} />} label="Realizado?" />
          </form>
          <Button onClick={handleSubmit} id="adicionar-tratamento" color="success" variant="contained" endIcon={<PostAddIcon />}>
              Modificar tratamento
            </Button>
        </Box>
      </Modal>
    </div>
  );
}