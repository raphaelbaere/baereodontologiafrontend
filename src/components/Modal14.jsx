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
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal14(props) {
    const { setAtualize } = props;
    const { open14, handleClose14 } = React.useContext(BaereContext);
    const { urlRequisicao, eventSelected } = React.useContext(BaereContext);
    const { id } = useParams();

    const [state, setState] = React.useState({
        titulo: "",
        paciente: "",
        doutor: "",
        tratamento: "",
        evento: [],
    })

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const handleSubmit = async () => {
        try {
              const response = await fetch(`${urlRequisicao}/eventos/${eventSelected.id}`, {
                method: 'DELETE',
              });
            // Atualize após a deleção de todos os pacientes
            setAtualize(true);
            handleClose14();
          } catch (error) {
            console.error('Erro ao excluir evento:', error);
          }
    }

    React.useEffect(() => {
        const fetchEvento = async () => {
            const response = await fetch(`${urlRequisicao}/eventos/${eventSelected.id}`);
            const data = await response.json();
            console.log(data);
            setState((prev) => ({
                ...prev,
                evento: data
            }));
        }
        fetchEvento();
    }, [eventSelected])

    return (
        <div>
            <Modal
                open={open14}
                onClose={handleClose14}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div id="form-header">
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Informações do evento
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
                    <div id="info-event">
                        {state.evento[0] && (
                            <div id="event-inner">
                            <Typography>
                                <strong>
                                Título do Evento:
                                </strong>
                                     {state.evento[0]?.titulo}
                                </Typography>
                                <Typography>
                                    <strong>
                                    Tratamento a realizar:
                                    </strong>
                                     {state.evento[0]?.tratamento.nome}
                                </Typography>
                                <Typography>
                                <strong>
                                Doutor marcado:
                                    </strong>
                                     {state.evento[0]?.doutores.nome}
                                </Typography>
                                <Typography>
                                    <strong>
                                    Paciente que receberá o tratamento:
                                    </strong>
                                     {state.evento[0]?.paciente.nome}
                                </Typography>
                                <Typography>
                                    <strong>
                                    O evento começará no dia:
                                    </strong>
                                     {format(new Date(state.evento[0]?.start_date), 'dd/MM/yyyy')}
                                </Typography>
                                <Typography>
                                    <strong>
                                    O evento encerrará no dia:
                                    </strong>
                                    {format(new Date(new Date(state.evento[0]?.end_date).setDate(new Date(state.evento[0]?.end_date).getDate() + 1)), 'dd/MM/yyyy')}
                                </Typography>
                            </div>
                        )}
                    </div>
                    <Button sx={{ width: '20%', height: '10%'}} onClick={handleSubmit} id="adicionar-tratamento" color="error" variant="contained" endIcon={<DeleteIcon />}>
                        Remover evento
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}