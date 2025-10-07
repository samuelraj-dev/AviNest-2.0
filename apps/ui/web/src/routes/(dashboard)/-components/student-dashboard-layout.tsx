import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import {
    BookOpenIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    FileCheckIcon,
    LogOutIcon,
    MenuIcon,
    NotebookIcon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/mode-toggle';

type RouteGroupType = {
    group: string;
    items: {
        href: string;
        label: string;
        icon: ReactNode;
    }[];
};

const ROUTE_GROUPS: RouteGroupType[] = [
    {
        group: 'Dashboard',
        items: [],
    },
    {
        group: 'Library',
        items: [
            {
                href: '/student/library/courses',
                label: 'Courses',
                icon: <BookOpenIcon />,
            },
            {
                href: '/student/library/notes',
                label: 'Notes',
                icon: <NotebookIcon />,
            },
            {
                href: '/student/library/assignments',
                label: 'Assignments',
                icon: <FileCheckIcon />,
            },
        ],
    },
    {
        group: 'Placement Assistant',
        items: [
            {
                href: '/student/placement-assistance/core-cs',
                label: 'Core CS',
                icon: <></>,
            },
            {
                href: '/student/placement-assistance/dsa-patterns',
                label: 'DSA Patterns',
                icon: <></>,
            },
            {
                href: '/student/placement-assistance/system-design',
                label: 'System Design',
                icon: <></>,
            },
            {
                href: '/student/placement-assistance/low-level-design',
                label: 'Low Level Design',
                icon: <></>,
            },
            {
                href: '/student/placement-assistance/behavioral-interviews',
                label: 'Behavioral Interviews',
                icon: <></>,
            },
            {
                href: '/student/library/aptitude',
                label: 'Aptitude',
                icon: <></>,
            },
        ],
    },
    {
        group: 'Learning',
        items: [
            {
                href: '/student/learning/roadmaps',
                label: 'Roadmaps',
                icon: <></>,
            },
        ],
    },
];

type RouteGroupProps = RouteGroupType;

const RouteGroup = ({ group, items }: RouteGroupProps) => {
    const [open, setOpen] = useState(true);
    const pathname = useLocation();

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger asChild>
                <Button
                    className="text-foreground/80 w-full mb-2 font-normal flex justify-between"
                    variant="ghost"
                >
                    {group}
                    <div
                        className={`transition-transform ${open ? 'rotate-180' : ''}`}
                    >
                        <ChevronDownIcon />
                    </div>
                </Button>
            </Collapsible.Trigger>
            <Collapsible.Content forceMount>
                <motion.div
                    className={`ml-6 flex flex-col gap-2 ${!open ? 'pointer-events-none' : ''}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: open ? 'auto' : 0,
                        opacity: open ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                    {items.map((item) => (
                        <Button
                            className={`w-full justify-start font-normal`}
                            variant="link"
                            asChild
                            key={item.href}
                        >
                            <Link
                                className={`flex items-center rounded-md px-5 py-1 transition-all ${
                                    pathname.href === item.href
                                        ? 'bg-foreground/10 hover:bg-foreground/5'
                                        : 'hover:bg-foreground/10'
                                }`}
                                to={item.href}
                            >
                                {item.icon}
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        </Button>
                    ))}
                </motion.div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            <div className="bg-background fixed z-10 flex h-13 w-screen items-center justify-between border px-2">
                <Collapsible.Root
                    className="h-full"
                    open={open}
                    onOpenChange={setOpen}
                >
                    <Collapsible.Trigger className="m-2" asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </Collapsible.Trigger>
                </Collapsible.Root>
                <div className="flex">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex h-9 items-center gap-2 px-2"
                            >
                                <Avatar className="size-8">
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <span className="hidden md:inline">
                                    Student
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <div className="flex items-center gap-3 px-2 py-1.5">
                                <Avatar className="size-10">
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">
                                        Student
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        student@avinest.com
                                    </p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {}}
                                variant="destructive"
                            >
                                <LogOutIcon className="size-4" /> Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Collapsible.Root
                className="fixed top-0 left-0 z-20 h-dvh"
                open={open}
                onOpenChange={setOpen}
            >
                <Collapsible.Content forceMount>
                    <div
                        className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Student Dashboard</h1>
                            <Collapsible.Trigger asChild>
                                <Button size="icon" variant="outline">
                                    <ChevronLeftIcon />
                                </Button>
                            </Collapsible.Trigger>
                        </div>
                        <Separator className="my-2" />
                        <div className="mt-4">
                            {ROUTE_GROUPS.map((routeGroup) => (
                                <RouteGroup
                                    {...routeGroup}
                                    key={routeGroup.group}
                                />
                            ))}
                        </div>
                    </div>
                </Collapsible.Content>
            </Collapsible.Root>

            <main
                className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? 'ml-64' : 'ml-0'}`}
            >
                <Outlet />
            </main>
        </div>
    );
};

export { DashboardLayout };
