import { Notification, User } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: number;
      firstName?: string;
      lastName?: string;
      role?: string;
      profilePicture?: string;
      facebookId?: string;
      googleId?: string;
      receivedNotifications?: Notification[];
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}
