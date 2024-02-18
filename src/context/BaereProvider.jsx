/* eslint-disable require-jsdoc */
import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export const BaereContext = createContext();


function BaereProvider({children}) {
  const [open, setOpen] = React.useState(false);

  const urlRequisicao = 'https://extbaereodontoserver2031-dtkwd4jzea-rj.a.run.app';

  const [open2, setOpen2] = React.useState(false);

  const [open3, setOpen3] = React.useState(false);

  const [open4, setOpen4] = React.useState(false);

  const [open5, setOpen5] = React.useState(false);

  const [open6, setOpen6] = React.useState(false);

  const [open7, setOpen7] = React.useState(false);

  const [open8, setOpen8] = React.useState(false);

  const [open9, setOpen9] = React.useState(false);

  const [open10, setOpen10] = React.useState(false);

  
  const [open11, setOpen11] = React.useState(false);


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

  
  const handleOpen7 = () => setOpen7(true);

  const handleClose7 = () => setOpen7(false);

  const handleOpen8 = () => setOpen8(true);

  const handleClose8 = () => setOpen8(false);

  
  const handleOpen9 = () => setOpen9(true);

  const handleClose9 = () => setOpen9(false);

  const handleOpen10 = () => setOpen10(true);

  const handleClose10 = () => setOpen10(false);

  const handleOpen11 = () => setOpen11(true);

  const handleClose11 = () => setOpen11(false);

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
      const response = await fetch(`${urlRequisicao}/pacientes`);
      const data = await response.json();
      console.log(data)
      const dataSorted = data.sort(function(a, b) {
        return b.id - a.id;
    });
      const mapRows = (dataSorted.map((patient) => {
        const date = new Date(patient.data_de_nascimento);
        return createData(patient.nome, format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), patient.cpf, patient.telefone, patient.id)
      }));
      return mapRows;
    } catch (error) {
      console.log(error);
    }
}

async function createRows2(id) {
  function createData(data, tratamento, doutor, dente, valor, realizado, acrescimo, desconto, id) {
    return {
      data, 
      tratamento, 
      doutor, 
      dente,
      valor,
      realizado,
      acrescimo, 
      desconto,
      id
    };
  }
  try {
    const response = await fetch(`${urlRequisicao}/pacientes/${id}`);
    const data = await response.json();
    const dataSorted = data[1].sort(function(a, b) {
      return new Date(b.data) - new Date(a.data);
  });
    const mapRows = dataSorted.map((treatment) => {
      const date = new Date(treatment.data);
      return createData(format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), treatment.tratamento.nome, treatment.doutores.nome, treatment.dente, treatment.valor, treatment.realizado, treatment.acrescimo, treatment.desconto, treatment.id)
    });
    return mapRows;
  } catch (error) {
    console.log(error);
  }
}

async function createRows4() {
  function createData(paciente, data, tratamento, doutor, dente, valor, realizado, acrescimo, desconto, id) {
    return {
      paciente,
      data, 
      tratamento, 
      doutor, 
      dente,
      valor,
      realizado,
      acrescimo, 
      desconto,
      id
    };
  }
  try {
    const response = await fetch(`${urlRequisicao}/tratamentos`);
    const data = await response.json();
    const dataSorted = data.sort(function(a, b) {
      return new Date(b.data) - new Date(a.data);
  });
    const mapRows = dataSorted.map((treatment) => {
      const date = new Date(treatment.data);
      return createData(treatment.paciente.nome, format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), treatment.tratamento.nome, treatment.doutores.nome, treatment.dente, treatment.valor, treatment.realizado, treatment.acrescimo, treatment.desconto, treatment.id)
    });
    return mapRows;
  } catch (error) {
    console.log(error);
  }
}

async function createRows5() {
  function createData(data, pagou, tipo, id) {
    return {
      data, 
      pagou,
      tipo,
      id
    };
  }
  try {
    const response = await fetch(`${urlRequisicao}/pagamentos`);
    const data = await response.json();
    const dataSorted = data.sort(function(a, b) {
      return new Date(b.data) - new Date(a.data);
  });
    const mapRows = dataSorted.map((payment) => {
      const date = new Date(payment.data);
      return createData(format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), payment.pagou, payment.tipo, payment.id)
    });
    return mapRows;
  } catch (error) {
    console.log(error);
  }
}

async function createRows6() {
  function createData(alergia,
  medicacao,
  complicacao,
  valvula,
  hipertenso,
  diabetico) {
    return {
      alergia,
      medicacao,
      complicacao,
      valvula,
      hipertenso,
      diabetico
    };
  }
  try {
    const response = await fetch(`${urlRequisicao}/anamnese`);
    const data = await response.json();

    const mapRows = data.map((anamnese) => {
      return createData(format(anamnese.alergia, anamnese.medicacao, anamnese.complicacao, anamnese.valvula, anamnese.hipertenso, anamnese.diabetico))
    });
    return mapRows;
  } catch (error) {
    console.log(error);
  }
}


async function createRows3(id) {
  function createData(data, pagou, tipo, id) {
    return {
      data, 
      pagou,
      tipo,
      id
    };
  }
  try {
    const response = await fetch(`${urlRequisicao}/pacientes/${id}`);
    const data = await response.json();
    const dataSorted = data[2].sort(function(a, b) {
      return new Date(b.data) - new Date(a.data);
  });
    const mapRows = dataSorted.map((payment) => {
      const date = new Date(payment.data);
      return createData(format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), payment.pagou, payment.tipo, payment.id)
    });
    return mapRows;
  } catch (error) {
    console.log(error);
  }
}



  const values = useMemo(() => ({
    open, setOpen, handleClose, handleOpen, createRows2, createRows3, createRows4, createRows5,
     open2, setOpen2, open6, setOpen6, handleOpen6, handleClose6, handleOpen7, handleClose7, open7,
     handleOpen8, handleClose8, open8, handleClose9, handleOpen9, open9,
      setOpen5, handleOpen5, handleClose5, open5, handleOpen2, handleOpen4, handleClose4, open4,
       setOpen4, open3, setOpen3, handleOpen3, handleClose3, handleClose2, createRows,
        atualiza, setAtualiza, setOpen9, handleClose10, handleOpen10, createRows6, urlRequisicao, open10, handleOpen11, setOpen11, handleClose11, open11,
  }), [open, open2, open3, open4, open5, open6, open7, open8, open9, open10, open11]);

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
