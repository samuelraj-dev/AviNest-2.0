import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouterContextState } from '@/lib/use-router-context-state';
import { ThemeProvider } from '@/components/theme-provider';

const router = createRouter({
    routeTree,
    defaultPendingMs: 0,
    defaultPreload: 'intent',
    context: {
        role: null,
        login: () => {},
        logout: () => {},
        isAdmin: false,
        isFaculty: false,
        isStudent: false,
        isAuthenticated: false,
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            refetchOnWindowFocus: true,
        },
    },
});

function App() {
    const routerContextState = useRouterContextState();
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} context={routerContextState} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
export default App;
