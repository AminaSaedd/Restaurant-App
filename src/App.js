
import { Container, Typography } from '@material-ui/core';
import './App.css';
import Index from './components/Order/Index';
function App() {
  return (
   <Container maxWidth="md">
<Typography
variant='h2'
align='center'
gutterBottom
>
Restuarant App 
</Typography>

<Index/>
   </Container>
  );
}

export default App;
