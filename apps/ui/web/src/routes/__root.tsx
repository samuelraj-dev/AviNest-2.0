import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

export type UserRole = 'admin' | 'faculty' | 'student' | null;
export type RouterContext = {
    role: UserRole;
    login: (role: 'admin' | 'student' | 'faculty') => void;
    logout: () => void;
    isAdmin: boolean;
    isFaculty: boolean;
    isStudent: boolean;
    isAuthenticated: boolean;
};

// export const Route = createRootRoute({
//     component: RootComponent,
// });

export const Route = createRootRouteWithContext<RouterContext>()({
    // component: RootComponent,
    component: () => <Outlet />,
});

// function RootComponent() {
// const { isAdmin, isStudent, isFaculty, isAuthenticated, logout } =
//     Route.useRouteContext();
// const navigate = Route.useNavigate();
// const location = useLocation();

// return (
// <div className="container mx-auto max-w-xl">
//     <NavLink to="/">Home</NavLink>
//     {isAuthenticated ? (
//         <button
//             className="button"
//             onClick={() => {
//                 logout();
//                 navigate({
//                     to: '/',
//                     search: { redirect: location.href },
//                 });
//             }}
//         >
//             Logout
//         </button>
//     ) : (
//         <NavLink to="/login">Login</NavLink>
//     )}

//     <Outlet />
// </div>
// );
// }
