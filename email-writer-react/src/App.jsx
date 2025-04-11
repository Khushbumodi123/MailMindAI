import { useState } from 'react';
import './App.css'

function App() {
  const [emailContent, setEmailContent] = useState('');
  // const [tone, setTone] = useState('');
  // const [generatedReply, setGeneratedReply] = useState('');
  // const [loding, setLoading] = useState(false);
  // const [error, setError] = useState('');

  return (
    <Container maxWidth="md" sx={{ py:4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          Multiline
          rows={6}
          label="Original Email Content"
          variant="outlined"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        </Box>
    </Container>
  )
}

export default App
