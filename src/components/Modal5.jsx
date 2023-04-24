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

export default function BasicModal5(props) {
  const { setAtualize, setSelected, selected } = props;
  const { open5, handleClose5 } = React.useContext(BaereContext);

  const handleDelete = async () => {
    try {
        const response = await fetch(`https://baereodontologiav900-dtkwd4jzea-rj.a.run.app/tratamentos/${selected.id}`, {
          method: 'DELETE',
        });
        setAtualize(response);
        handleClose5();
        setSelected([]);
      } catch (e) {
        return({ type: 404, message: e});
      } finally {
      }
  }

  return (
    <div>
      <Modal
        open={open5}
        onClose={handleClose5}
        aria-labelledby="deleted-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="deleted-box" sx={style}>
          <Typography className="deleted-title" variant="h6" component="h2">
            Tem certeza que deseja <span className="delete-span">remover</span> o tratamento de ID <span className="deleted-name">{selected.id}</span>
          </Typography>
          <div className="buttons-delete-box">
          <Button onClick={handleDelete} color="error" className="delete-button">Sim, desejo remover o tratamento</Button>
          <Button onClick={handleClose5} className="non-delete-button">Não desejo remover o tratamento</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}