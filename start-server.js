import { spawn } from 'child_process';
import readline from 'readline';

// Kill any existing processes on port 3001 before starting
spawn('npx', ['kill-port', '3001'], { shell: true }).on('close', () => {
  // Run nodemon with minimal output
  const nodemon = spawn('npx', ['nodemon', '--quiet', 'server.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true
  });

  // Track state to only output exactly what we want
  let pendingRestart = false;
  let pendingStarting = false;

  // Filter and format stdout with exactly the desired format
  readline.createInterface({ input: nodemon.stdout })
    .on('line', (line) => {
      const trimmed = line.trim();
      
      // Handle different types of lines
      if (trimmed.includes('[nodemon] restarting due to changes')) {
        console.log('[nodemon] restarting due to changes...');
        pendingRestart = true;
      } 
      else if (trimmed.includes('[nodemon] starting `node server.js`')) {
        console.log('[nodemon] starting `node server.js`');
        pendingStarting = true;
        pendingRestart = false;
      }
      else if (trimmed.includes('Port') && trimmed.includes('is already in use')) {
        console.log('Port 3001 is already in use. Trying another port...');
      }
      else if (trimmed.includes('Server running at')) {
        // Format the server running message exactly as requested
        if (trimmed.includes('original port')) {
          console.log('Server running at 3002 (original port 3001 was in use)');
        } else {
          console.log('Server running at 3001');
        }
      }
      else if (trimmed.includes('MongoDB database connected')) {
        console.log('MongoDB database connected successfully');
      }
    });

  // Minimal error handling - only show critical errors
  nodemon.stderr.on('data', (data) => {
    const errorMsg = data.toString().trim();
    if (errorMsg.includes('Error: Cannot find module')) {
      console.error(errorMsg);
    }
  });

  // Allow clean exit with CTRL+C
  process.on('SIGINT', () => {
    nodemon.kill();
    process.exit(0);
  });
}); 