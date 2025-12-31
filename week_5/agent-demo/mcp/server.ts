import { createServer } from '@modelcontextprotocol/sdk';

const server = createServer();

server.registerTool({
  name: 'logChange',
  description: 'Log code changes made by agent',
  inputSchema: {
    type: 'object',
    properties: {
      file: { type: 'string' },
      summary: { type: 'string' }
    },
    required: ['file', 'summary']
  },
  async handler(input) {
    console.log(`[AGENT] Modified ${input.file}: ${input.summary}`);
    return { success: true };
  }
});

server.start();
