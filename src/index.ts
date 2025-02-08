import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { todos } from './db/schema';
import { eq } from 'drizzle-orm';

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app
	.get('/todos', async (c) => {
		try {
			const db = drizzle(c.env.DB);
			const results = await db.select().from(todos);
			return c.json(results);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.get('/todos/:id', async (c) => {
		const id = parseInt(c.req.param('id'));
		try {
			const db = drizzle(c.env.DB);
			const results = await db.select().from(todos).where(eq(todos.id, id));
			return c.json(results);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.post('todos', async (c) => {
		const { title, description } = await c.req.json<typeof todos.$inferInsert>();
		try {
			const db = drizzle(c.env.DB);
			await db.insert(todos).values({ title, description });
			return c.json({ message: 'success' }, 201);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.delete('/todos/:id', async (c) => {
		const id = parseInt(c.req.param('id'));
		try {
			const db = drizzle(c.env.DB);
			await db.delete(todos).where(eq(todos.id, id));
			return c.json({ message: 'success' }, 200);
		} catch (error) {
			return c.json({ error }, 500);
		}
	})
	.put('/todos/:id', async (c) => {
		const id = parseInt(c.req.param('id'));
		const { title, description } = await c.req.json<typeof todos.$inferInsert>();
		try {
			const db = drizzle(c.env.DB);
			await db.update(todos).set({ title, description }).where(eq(todos.id, id));
			return c.json({ message: 'success' }, 200);
		} catch (error) {
			return c.json({ error }, 500);
		}
	});

export default app;
