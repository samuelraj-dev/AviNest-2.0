import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
    '/(dashboard)/student/_layout/library/notes/',
)({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(dashboard)/student/_layout/library/notes/"!</div>;
}
