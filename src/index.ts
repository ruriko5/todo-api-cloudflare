import { Hono } from 'hono';
const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app
	.get('/todos', async (c) => {
		try {
			const { results } = await c.env.DB.prepare('SELECT * FROM todos').all();
			return c.json(results);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.get('/todos/:id', async (c) => {
		const id = c.req.param('id');
		try {
			const { results } = await c.env.DB.prepare('SELECT * FROM todos WHERE id = ?').bind(id).all();
			return c.json(results);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.post('todos', async (c) => {
		const { title, description } = await c.req.json();
		try {
			await c.env.DB.prepare('INSERT INTO todos (title, description) VALUES (?, ?)').bind(title, description).run();
			return c.json({ message: 'success' }, 201);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.delete('/todos/:id', async (c) => {
		const id = c.req.param('id');
		try {
			await c.env.DB.prepare('DELETE FROM todos WHERE id = ?').bind(id).run();
			return c.json({ message: 'success' }, 200);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.put('/todos/:id', async (c) => {
		const id = c.req.param('id');
		const { title, description } = await c.req.json();
		try {
			await c.env.DB.prepare('UPDATE todos SET title = ?, description = ? WHERE id = ?').bind(title, description, id).run();
			return c.json({ message: 'success' }, 200);
		} catch (error) {
			return c.json({ error }, 500);
		}
	});

export default app;
