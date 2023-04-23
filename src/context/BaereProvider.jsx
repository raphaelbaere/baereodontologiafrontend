/* eslint-disable require-jsdoc */
import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export const BaereContext = createContext();


function BaereProvider({children}) {
  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [open3, setOpen3] = React.useState(false);

  const [atualiza, setAtualiza] = React.useState(false);

  const handleOpen2 = () => setOpen2(true);

  const handleClose2 = () => setOpen2(false);

  const handleOpen3 = () => setOpen3(true);

  const handleClose3 = () => setOpen3(false);

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => setOpen(false);

  async function createRows() {
    function createData(nome, data, cpf, telefone, id) {
      return {
        nome,
        data,
        cpf,
        telefone,
        id,
      };
    }
    try {
      const response = await fetch('https://baereodontologia903-dtkwd4jzea-rj.a.run.app/pacientes');
      const data = await response.json();
      const mapRows = (data.map((patient) => {
        const date = new Date(patient.data_de_nascimento);
        return createData(patient.nome, format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), patient.cpf, patient.telefone, patient.id)
      }));
      return mapRows;
    } catch (error) {
      console.log(error);
    }
}



  const values = useMemo(() => ({
    open, setOpen, handleClose, handleOpen,
     open2, setOpen2, handleOpen2, open3, setOpen3, handleOpen3, handleClose3, handleClose2, createRows, atualiza, setAtualiza
  }), [open, open2, open3]);

  return (
    <BaereContext.Provider value={ values }>
      {children}
    </BaereContext.Provider>
  );
}


BaereProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaereProvider;
