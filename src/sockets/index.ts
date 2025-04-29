import { Server } from 'socket.io';

export function setupSocketIO(io: Server) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('character', (characterId) => {
      console.log('character', characterId);

      io.emit('character', characterId);
      console.log('Broadcasted character to all clients');
    });

    socket.on('disconnect', (reason) => {
      console.log('User disconnected:', socket.id, 'Reason:', reason);
    });

    // You can define more socket events here
  });
}
