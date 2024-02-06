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
  width: '35%',
  height: '35%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal4(props) {
  const { setAtualize, setSelected, selected } = props;
  const { open4, handleClose4 } = React.useContext(BaereContext);

  const handleDelete = async () => {
    try {
      console.log(selected)
      await Promise.all(selected.map(async (item) => {
        const response = await fetch(`https://baereodontologiav888-dtkwd4jzea-rj.a.run.app/pacientes/${item.id}`, {
          method: 'DELETE',
        });
        return response;
      }));
      // Atualize após a deleção de todos os pacientes
      setAtualize(true);
      handleClose4();
      setSelected([]);
    } catch (error) {
      console.error('Erro ao excluir pacientes:', error);
    }
  }

  return (
    <div>
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="deleted-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="deleted-box" sx={style}>
          <Typography className="deleted-title" variant="h6" component="h2">
            Tem certeza que deseja remover as fichas selecionadas?
          </Typography>
          <div className="buttons-delete-box">
          <Button onClick={handleDelete} color="error" className="delete-button">Sim, desejo remover as fichas</Button>
          <Button onClick={handleClose4} className="non-delete-button">Não desejo remover as fichas</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}