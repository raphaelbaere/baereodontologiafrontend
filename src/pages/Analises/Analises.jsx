import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import '../../styles/recharts.css'
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
import Deposits from '../../components/Deposits';
import Orders from '../../components/Orders';
import PieChart from '../../components/PieChart';
import PieChart2 from '../../components/PieChart2';
import PieChart3 from '../../components/PieChart3';
import Title from '../../components/Title';
import BarChart from '../../components/BarChart';
import BarChart2 from '../../components/BarChart2';
import BarChart3 from '../../components/BarChart3';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
  const [atualiza, setAtualiza] = React.useState(Math.random() * 1000000)
  const toggleDrawer = () => {
    setOpen(!open);
  };
    const { urlRequisicao } = React.useContext(BaereContext);

  const [state, setState] = React.useState({
    filtroAno: new Date().getFullYear(),
    years: []
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${urlRequisicao}/pagamentos`);
        const paymentData = await response.json();
  
        // Usar um Set para armazenar anos únicos
        const uniqueYears = new Set();
  
        paymentData.forEach((payment) => {
          const isoDate = new Date(payment.data);
          const year = isoDate.getFullYear();
          uniqueYears.add(year); // Adicionar o ano ao Set
        });
  
        // Converter Set de anos de volta para um array e ordenar (opcional)
        const yearsArray = Array.from(uniqueYears).sort();
  
        // Atualizar o estado com os anos únicos
        setState(prevState => ({
          ...prevState,
          years: yearsArray
        }));
        
      } catch (error) {
        console.error('Erro ao buscar os dados de pagamento:', error);
      }
    };
  
    fetchData();
  }, []);

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
              Análises de Dados
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
            <Paper>
            <Typography align='center' variant="h5" gutterBottom>
                  Referente aos pacientes
            </Typography>
            </Paper>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={7} md={7} lg={4.5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                    width: 400,
                  }}
                >
                <Typography align='center' variant="h5" gutterBottom>
                    Faixa etária
                </Typography>
                  <PieChart setAtualiza={setAtualiza} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={1}>
              <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                    width: 665,
                  }}
                >
                <Typography align='center' variant="h5" gutterBottom>
                    Localização
                </Typography>
                  <BarChart setAtualiza={setAtualiza} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Paper>
            <Typography align='center' variant="h5" gutterBottom>
                  Referente aos tratamentos
            </Typography>
            </Paper>
            <Grid container spacing={4} sx={{marginBottom: '10px'}}>
              {/* Chart */}
              <Grid item xs={1} lg={7.4} sx={{marginBottom: '5px', margin: '0'}}>
              <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                    width: 1078,
                  }}
                >
                <Typography align='start' variant="h5" gutterBottom>
                    Frequência de tratamentos/mês
                </Typography>
                  <BarChart2 setAtualiza={setAtualiza} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
            </Grid>
            <Grid sx={{height: '100%', width: '100%'}} item xs={7} md={7} lg={4.5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 650,
                    width: 1078,
                  }}
                >
                <Typography align='center' variant="h5" gutterBottom>
                  Frequência de tipos de tratamento
                </Typography>
                  <PieChart2 sx={{ height: '100%', width: '100%'}} setAtualiza={setAtualiza} />
                </Paper>
              </Grid>
              <Paper>
            <Typography align='center' sx={{marginTop: '10px'}} variant="h5" gutterBottom>
                  Referente aos pagamentos
            </Typography>
            </Paper>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={7} md={7} lg={4.5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 350,
                    width: 400,
                  }}
                >
                <Typography align='center' variant="h6" gutterBottom>
                    Frequência de tipos de pagamento
                </Typography>
                  <PieChart3 setAtualiza={setAtualiza} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={1}>
              <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 350,
                    width: 665,
                  }}
                >
                <Typography sx={{ml: 2}} align='center' variant="h5" gutterBottom>
                    Arrendamento/mês
                    <FormControl sx={{ ml: 5, mb: 2, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label">Ano</InputLabel>
          <Select
            sx={{ width: 100}}
            labelId="demo-simple-select-label"
            id="filtroAno-select"
            label="filtroAno"
            name="filtroAno"
            value={state.filtroAno}
            onChange={handleChange}
          >
            {state.years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
                </Typography>
                  <BarChart3 setAtualiza={setAtualiza} filtroAno={state.filtroAno} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />    
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}