import { Hono } from 'hono';
const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app.get('/todos/:id', async (c) => {
	const id = c.req.param('id');
	try {
		const { results } = await c.env.DB.prepare('SELECT * FROM todos WHERE id = ?').bind(id).all();
		return c.json(results);
	} catch (error) {
		return c.json({ error }, 500);
	}
});

app.get('/todos', async (c) => {
	try {
		const { results } = await c.env.DB.prepare('SELECT * FROM todos').all();
		return c.json(results);
	} catch (error) {
		return c.json({ error }, 500);
	}
});

export default app;
