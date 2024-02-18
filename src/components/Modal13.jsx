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
import { format } from 'date-fns';

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

export default function BasicModal13(props) {
  const { setAtualize, setSelected, selected } = props;
  const { open13, handleClose13 } = React.useContext(BaereContext);
  const { urlRequisicao } = React.useContext(BaereContext);
  const handleDelete = async () => {
    try {
      await Promise.all(selected.map(async (item) => {
        const response = await fetch(`${urlRequisicao}/anamnese/${item.id}`, {
          method: 'DELETE',
        });
        return response;
      }));
      setAtualize(true);
      handleClose13();
      setSelected([]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Modal
        open={open13}
        onClose={handleClose13}
        aria-labelledby="deleted-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="deleted-box" sx={style}>
          <Typography className="deleted-title" variant="h6" component="h2">
            Tem certeza que deseja <span className="delete-span">remover</span> as anamneses selecionados?
          </Typography>
          <div className="buttons-delete-box">
            <Button onClick={handleDelete} color="error" className="delete-button">Sim, desejo remover as anamneses</Button>
            <Button onClick={handleClose13} className="non-delete-button">Não desejo remover as anamneses</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}