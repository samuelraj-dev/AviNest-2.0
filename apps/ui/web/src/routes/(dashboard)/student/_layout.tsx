import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../-components/student-dashboard-layout';

export const Route = createFileRoute('/(dashboard)/student/_layout')({
    component: DashboardLayout,
});
