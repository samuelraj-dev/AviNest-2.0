import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod';

export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
    validateSearch: z.object({
        redirect: z.string().default('/'),
    }),
    beforeLoad: async ({ context, search }) => {
        const { isAdmin, isStudent, isFaculty, isAuthenticated } = context;
        if (isAuthenticated) {
            throw redirect({
                to:
                    search.redirect ||
                    (isAdmin
                        ? '/admin/dashboard'
                        : isStudent
                          ? '/student/dashboard'
                          : isFaculty
                            ? '/faculty/dashboard'
                            : search.redirect),
            });
        }
    },
    pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
    const { login } = Route.useRouteContext();
    const navigate = Route.useNavigate();
    const router = useRouter();
    const search = Route.useSearch();

    const [username, setUsername] = useState('');

    return (
        <form>
            <input
                className="input"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
            />
            <button
                className="button"
                type="submit"
                onClick={() => {
                    if (username === 'admin') {
                        login('admin');
                    } else if (username === 'student') {
                        login('student');
                    } else if (username === 'faculty') {
                        login('faculty');
                    } else {
                        alert(
                            'Invalid username. Use "admin", "student", or "faculty".',
                        );
                        return;
                    }
                    router.invalidate();
                    navigate({ to: search.redirect });
                }}
            >
                Login
            </button>
        </form>
    );
}
