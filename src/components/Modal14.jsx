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
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal14(props) {
    const { setAtualize, setAtualize2 } = props;
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
            setAtualize(Math.random() * 9999);
            setAtualize2(Math.random() * 9999);
            handleClose14();
          } catch (error) {
            console.error('Erro ao excluir evento:', error);
          }
    }

    const arrumarData = (date) => {
        const newDateData = new Date(date);
        // Adicionando 1 dia à data
        newDateData.setDate(newDateData.getDate());

        // Obtendo o dia, mês e ano formatados
        const day = newDateData.getDate();
        const month = newDateData.getMonth() + 1; // Mês começa do zero, então somamos 1
        const year = newDateData.getFullYear();

        // Formatando a data no formato dd/MM/yyyy
        const formattedEndDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

        return formattedEndDate
    }

    const arrumarDataMaisUm = (date) => {
        const newDateData = new Date(date);
        // Adicionando 1 dia à data
        newDateData.setDate(newDateData.getDate());

        // Obtendo o dia, mês e ano formatados
        const day = newDateData.getDate() + 1;
        const month = newDateData.getMonth() + 1; // Mês começa do zero, então somamos 1
        const year = newDateData.getFullYear();

        // Formatando a data no formato dd/MM/yyyy
        const formattedEndDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

        return formattedEndDate
    }

    React.useEffect(() => {
        const fetchEvento = async () => {
            const response = await fetch(`${urlRequisicao}/eventos/${eventSelected.id}`);
            const data = await response.json();
            setState((prev) => ({
                ...prev,
                evento: data
            }));
            setAtualize(data);
            setAtualize2(data);
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
                                     {state.evento[0]?.paciente}
                                </Typography>
                                <Typography>
                                    <strong>
                                    O evento começará no dia:
                                    </strong>
                                     {arrumarDataMaisUm(state.evento[0]?.start_date)}
                                </Typography>
                                <Typography>
                                    <strong>
                                    O evento encerrará no dia:
                                    </strong>
                                    {arrumarData(state.evento[0]?.end_date)}
                                </Typography>
                            </div>
                        )}
                    </div>
                    <Button sx={{ width: '20%', height: '15%'}} onClick={handleSubmit} id="adicionar-tratamento" color="error" variant="contained" endIcon={<DeleteIcon />}>
                        Remover evento
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}