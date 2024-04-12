import { http, HttpResponse } from 'msw';

export const handlers = [
	http.post('/login', async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		if (!email) {
			return new HttpResponse('Missing email', { status: 400 });
		}
	}),
	http.get('/pets', ({ request, params, cookies }) => {
		// console.log(request, params, cookies);
		return HttpResponse.json(['Tom', 'Jerry', 'Spike']);
	}),
	http.get('/user', ({ cookies }) => {
		const { session } = cookies;
		if (!session) {
			return new HttpResponse(null, { status: 401 });
		}
	}),
	http.post('/pets', async ({ request }) => {
		// Read the intercepted request body as JSON.
		const pets = await request.json();

		return HttpResponse.json(pets, { status: 201 });
	}),
];
