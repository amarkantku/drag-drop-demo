import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { server } from './mocks/server';

describe('<App /> test suite', () => {
	beforeEach(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('renders learn react link', async () => {
		await act(() => render(<App />));
		await waitFor(() => {
			expect(screen.getByText('Tom')).toBeInTheDocument();
			expect(screen.getByRole('list').children.length).toBe(3);
		});
	});
});
