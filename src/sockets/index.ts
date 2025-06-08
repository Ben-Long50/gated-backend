import { Server } from 'socket.io';

export function setupSocketIO(io: Server) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('character', (characterId) => {
      console.log('character', characterId);

      io.emit('character', characterId);
      console.log('Broadcasted character to all clients');
    });

    socket.on('item', (itemId) => {
      console.log('item', itemId);

      io.emit('item', itemId);
      console.log('Broadcasted item to all clients');
    });

    socket.on('affiliation', (affiliationId) => {
      console.log('affiliation', affiliationId);

      io.emit('affiliation', affiliationId);
      console.log('Broadcasted affiliation to all clients');
    });

    socket.on('disconnect', (reason) => {
      console.log('User disconnected:', socket.id, 'Reason:', reason);
    });

    // You can define more socket events here
  });
}
