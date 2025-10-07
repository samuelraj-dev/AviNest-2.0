import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
    '/(dashboard)/student/_layout/library/courses/',
)({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(dashboard)/student/library/courses/"!</div>;
}
