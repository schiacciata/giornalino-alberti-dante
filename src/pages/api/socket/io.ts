import { NextApiResponseServerIo } from '@/types/socket';
import { Server as NetServer } from 'http';
import { Server as ServerIO } from 'socket.io';
import { NextApiRequest } from 'next';
import { db } from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });
    
    io.on('connection', (s) => {
      s.on('create-room', async (fileId) => {
        const document = await db.page.findFirstOrThrow({
          where: {
            id: fileId,
          },
          select: {
            content: true,
          }
        });

        const { content } = document;
      
        s.join(fileId);
        s.emit("load-file", content);

      });
      s.on('send-changes', (deltas, fileId) => {
        s.to(fileId).emit('receive-changes', deltas, fileId);
      });
      s.on('send-cursor-move', (range, fileId, cursorId) => {
        s.to(fileId).emit('receive-cursor-move', range, fileId, cursorId);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;