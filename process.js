function shutdown_() {
  server.close(() => process.exit(0));
  connections.forEach(conn => conn.destroy());
}

process.on('exit', (code) => {
  console.log('Process exiting with code:', code);
});



server.on("close", () => {
  console.log("Server closed# ", new Date().toLocaleTimeString());
});


process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down...' , new Date().toLocaleTimeString());
  server.close(() => {
    console.log('SIGINT: Server closed gracefully' , new Date().toLocaleTimeString());
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down...');
  server.close(() => {
    console.log('SIGTERM: Server closed gracefully');
    process.exit(0);
  });
});

process.on('SIGQUIT', () => {
  console.log('SIGQUIT received. Shutting down...');
  server.close(() => {
    console.log('SIGQUIT: Server closed gracefully');
    process.exit(0);
  });
}); 

const shutdown = (signal) => {
  console.log(`\nReceived ${signal}`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => {
  process.on(sig, shutdown);
});

// This will NEVER run
process.on('SIGKILL', () => {
  console.log('SIGKILL caught');
});