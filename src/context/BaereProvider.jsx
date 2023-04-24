/* eslint-disable require-jsdoc */
import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export const BaereContext = createContext();


function BaereProvider({children}) {
  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [open3, setOpen3] = React.useState(false);

  const [open4, setOpen4] = React.useState(false);

  const [open5, setOpen5] = React.useState(false);

  const [open6, setOpen6] = React.useState(false);

  const [atualiza, setAtualiza] = React.useState(false);

  const handleOpen2 = () => setOpen2(true);

  const handleClose2 = () => setOpen2(false);

  const handleOpen3 = () => setOpen3(true);

  const handleClose3 = () => setOpen3(false);

  const handleOpen4 = () => setOpen4(true);

  const handleClose4 = () => setOpen4(false);

  const handleOpen5 = () => setOpen5(true);

  const handleClose5 = () => setOpen5(false);

  const handleOpen6 = () => setOpen6(true);

  const handleClose6 = () => setOpen6(false);

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
      const response = await fetch('https://baereodontologiav900-dtkwd4jzea-rj.a.run.app/pacientes');
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

async function createRows2(id) {
  function createData(data, tratamento, doutor, valor, acrescimo, desconto, id) {
    return {
      data, 
      tratamento, 
      doutor, 
      valor,
      acrescimo, 
      desconto,
      id
    };
  }
  try {
    const response = await fetch(`https://baereodontologiav900-dtkwd4jzea-rj.a.run.app/pacientes/${id}`);
    const data = await response.json();
    const mapRows = data[1].map((treatment) => {
      const date = new Date(treatment.data);
      return createData(format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), treatment.tratamento.nome, treatment.doutores.nome, treatment.valor, treatment.acrescimo, treatment.desconto, treatment.id)
    });
    return mapRows;
  } catch (error) {
    console.log(error);
  }
}

async function createRows3(id) {
  function createData(data, pagou, id) {
    return {
      data, 
      pagou,
      id
    };
  }
  try {
    const response = await fetch(`https://baereodontologiav900-dtkwd4jzea-rj.a.run.app/pacientes/${id}`);
    const data = await response.json();
    console.log(data)
    const mapRows = data[2].map((payment) => {
      const date = new Date(payment.data);
      return createData(format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), payment.pagou, payment.id)
    });
    return mapRows;
  } catch (error) {
    console.log(error);
  }
}



  const values = useMemo(() => ({
    open, setOpen, handleClose, handleOpen, createRows2, createRows3,
     open2, setOpen2, open6, setOpen6, handleOpen6, handleClose6, setOpen5, handleOpen5, handleClose5, open5, handleOpen2, handleOpen4, handleClose4, open4, setOpen4, open3, setOpen3, handleOpen3, handleClose3, handleClose2, createRows, atualiza, setAtualiza
  }), [open, open2, open3, open4, open5, open6]);

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
