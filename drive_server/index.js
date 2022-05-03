import app from './app.js';

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log('🚀 Running on port', PORT));
