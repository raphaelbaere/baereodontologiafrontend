import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../../components/listItem';
import Chart from '../../components/Chart';
import Deposits from '../../components/Deposits';
import Orders from '../../components/Orders';
import { Avatar } from '@mui/material';
import '../../styles/ficha.css'
import CustomizedTables from '../../components/EnhancedTable2';
import EnhancedTable2 from '../../components/EnhancedTable2';
import BasicModal2 from '../../components/Modal2';
import EnhancedTable3 from '../../components/EnhancedTable3';
import BasicModal3 from '../../components/Modal3';
import { useParams } from 'react-router-dom';
import { BaereContext } from '../../context/BaereProvider';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Baere Odontologia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const theme2 = createTheme({
    palette: {
      primary: {
        main: '#212532',
      },
      secondary: {
        main: '#212532',
      },
    },
  });

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [patientFile, setPatientFile] = React.useState([]);
  const [atualize2, setAtualize2] = React.useState('');
  const { id } = useParams();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const getPatientFile = async () => {
      try {
        const response = await fetch(`https://baereodontologiav888-dtkwd4jzea-rj.a.run.app/pacientes/${id}`);
        const data = await response.json();
        setPatientFile(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPatientFile();
  }, [atualize2]);

  return (
    <ThemeProvider theme={theme2}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {patientFile.length > 0 ? `Ficha de ${patientFile[0][0].nome}` : '?'}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ height: '160vh'}}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
                <Typography
                        component="h1"
                        variant="h4"
                        color="inherit"
                        >
                        {patientFile.length > 0 ? `${patientFile[0][0].nome}` : '?'}
                    </Typography>
                    <div id="inner-ficha">
                    <div id="ficha-infos">
                    {patientFile.length > 0 ? (
                      <React.Fragment>
                    <p>CPF: {`${patientFile[0][0].cpf}`} </p>
                    <p>Data de Nascimento: {`${new Date(patientFile[0][0].data_de_nascimento)}`}</p>
                    <p>Telefone: {`${patientFile[0][0].telefone}`}</p>
                    <p>CEP: {`${patientFile[0][0].endereco.cep || 'Não especificado'}`}</p>
                    <p>Estado: {`${patientFile[0][0].endereco.estado}`}</p>
                    <p>Cidade: {`${patientFile[0][0].endereco.cidade}`}</p>
                    <p>Bairro: {`${patientFile[0][0].endereco.bairro}`}</p>
                    <p>Rua: {`${patientFile[0][0].endereco.rua}`}</p>
                    <p>Número: {`${patientFile[0][0].endereco.numero}`}</p>
                    <p>Profissão: {`${patientFile[0][0].profissao.nome}`}</p>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <p>Loading</p>
                      </React.Fragment>
                    )}
                    </div>
                    </div>
                    <Divider>Controle de tratamentos</Divider>
                    <EnhancedTable2 setAtualize2={setAtualize2} treatments={patientFile.length > 0 ? patientFile[1] || [] : []} />
                    <Divider>Controle de pagamentos</Divider>
                    <EnhancedTable3 setAtualize2={setAtualize2} payments={patientFile.length > 0 ? patientFile[2] || [] : []} />
                    <div id="payments">
                      {patientFile.length > 0 ? (
                         <h3 id="total">Total: R${(patientFile[1].reduce((accum,item) => accum + item.valor, 0) + patientFile[1].reduce((accum, item) => accum + item.acrescimo, 0)) - (patientFile[1].reduce((accum, item) => accum + item.desconto, 0))} |
                          Pagou: <span id="pagou">R${patientFile[2].reduce((accum,item) => accum + item.pagou, 0)}</span> |
                           Resta: <span id="resta">R${(patientFile[2].reduce((accum,item) => accum - item.pagou, patientFile[1].reduce((accum,item) => accum + item.valor, 0)) + patientFile[1].reduce((accum, item) => accum + item.acrescimo, 0))  - (patientFile[1].reduce((accum, item) => accum + item.desconto, 0))}</span></h3>
                      ) : (
                        <h3>Loading</h3>
                      )}
                    </div>
                    <Copyright sx={{ pt: 4 }} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}