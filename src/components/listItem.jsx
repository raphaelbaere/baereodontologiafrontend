import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to="/home">
    <ListItemButton component="a" to="/home">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Painel" />
    </ListItemButton>
    </Link>
    <Link to="/pacientes">
    <ListItemButton component="a" to="/pacientes">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Pacientes" />
    </ListItemButton>
    </Link>
    <Link to="/atendimentos">
    <ListItemButton component="a" to="/atendimentos">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Atendimentos" />
    </ListItemButton>
    </Link>
    <Link to="/pagamentos">
    <ListItemButton component="a" to="/">
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Financeiro" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
  </React.Fragment>
);