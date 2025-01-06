import prisma from '../config/database.js';

const bookServices = {
  getBook: async () => {
    try {
      const book = await prisma.bookEntry.findMany({
        select: { id: true, title: true },
        orderBy: { id: 'asc' },
      });
      return book;
    } catch (error) {
      throw new Error('Failed to fetch book');
    }
  },

  getBookEntryByTitle: async (bookEntryTitle: string) => {
    try {
      console.log(bookEntryTitle);

      const bookEntry = await prisma.bookEntry.findUnique({
        where: { title: bookEntryTitle },
      });

      return bookEntry;
    } catch (error) {
      throw new Error('Failed to fetch book');
    }
  },

  createBookEntry: async (formData) => {
    try {
      const bookEntry = await prisma.bookEntry.upsert({
        where: { id: formData.bookEntryId || 0 },
        update: {
          title: formData.title.toLowerCase(),
          content: formData.content,
        },
        create: {
          title: formData.title.toLowerCase(),
          content: formData.content,
        },
      });
      return bookEntry;
    } catch (error) {
      throw new Error('Failed to create or update book entry');
    }
  },

  deleteBookEntry: async (bookEntryId) => {
    try {
      await prisma.bookEntry.delete({
        where: {
          id: Number(bookEntryId),
        },
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete book entry');
    }
  },
};

export default bookServices;
