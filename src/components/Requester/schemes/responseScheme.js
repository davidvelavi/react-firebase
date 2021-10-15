export const responseScheme = {
  id: 'getScheme',
  type: 'array',
  items: {
    properties: {
      body: { type: 'string' },
      id: { type: 'number' },
      title: { type: 'string' },
      userId: { type: 'number' },
    },
  },
};
