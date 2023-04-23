import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.jpeg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import '../../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="#e6d7b5" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Baere Odontologia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn () {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get('usuario'),
      password: data.get('senha')
    };
    try {
      const response = await fetch('https://baereodontologia903-dtkwd4jzea-rj.a.run.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (response.status === 200) {
        navigate('/home')
      }
    } catch(e) {
      console.log(e);
      return({ type: 404, message: e});
    }
};

  return (
    <div id="main-container">
      <div id="container">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="Baere Odontologia Logo" id="logo">
          </img>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuário"
              name="usuario"
              InputLabelProps={{style : {color : '#e6d7b5'} }}
              autoFocus
              sx={{ input: { color: '#e6d7b5' }, fieldset: { borderColor: "#e6d7b5" }}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              color="primary"
              id="senha"
              InputLabelProps={{style : {color : '#e6d7b5'} }}
              autoComplete="current-password"
              sx={{ input: { color: '#e6d7b5' }, fieldset: { borderColor: "#e6d7b5" }}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ENTRAR
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 0 }} />
      </div>
    </div>
  );
}