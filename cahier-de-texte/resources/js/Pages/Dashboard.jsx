import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-3xl font-bold text-gray-900">{stats.totalModules}</div>
                            <div className="text-sm text-gray-600">Total Modules</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-3xl font-bold text-gray-900">{stats.totalProfessors}</div>
                            <div className="text-sm text-gray-600">Total Professors</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-3xl font-bold text-gray-900">{stats.totalFields}</div>
                            <div className="text-sm text-gray-600">Total Fields</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-3xl font-bold text-gray-900">{stats.totalLevels}</div>
                            <div className="text-sm text-gray-600">Total Levels</div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Link
                                    href="/modules"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <div className="font-semibold text-gray-900">Manage Modules</div>
                                        <div className="text-sm text-gray-600">View and manage all modules</div>
                                    </div>
                                </Link>
                                <Link
                                    href="/professors"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <div className="font-semibold text-gray-900">Manage Professors</div>
                                        <div className="text-sm text-gray-600">View and manage professors</div>
                                    </div>
                                </Link>
                                <Link
                                    href="/fields"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <div className="font-semibold text-gray-900">Manage Fields</div>
                                        <div className="text-sm text-gray-600">View and manage fields</div>
                                    </div>
                                </Link>
                                <Link
                                    href="/levels"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <div className="font-semibold text-gray-900">Manage Levels</div>
                                        <div className="text-sm text-gray-600">View and manage levels</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {auth.user.role === 'admin' ? (
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900">Admin Dashboard</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Link
                                    href="/professors"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        Manage Professors
                                    </h5>
                                    <p className="text-gray-600">
                                        Create and manage professor accounts
                                    </p>
                                </Link>

                                <Link
                                    href="/fields"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        Manage Fields
                                    </h5>
                                    <p className="text-gray-600">
                                        Create and manage academic fields
                                    </p>
                                </Link>

                                <Link
                                    href="/levels"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        Manage Levels
                                    </h5>
                                    <p className="text-gray-600">
                                        Create and manage academic levels
                                    </p>
                                </Link>

                                <Link
                                    href="/groups"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        Manage Groups
                                    </h5>
                                    <p className="text-gray-600">
                                        Create and manage student groups
                                    </p>
                                </Link>

                                <Link
                                    href="/modules"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        Manage Modules
                                    </h5>
                                    <p className="text-gray-600">
                                        Create modules and assign professors
                                    </p>
                                </Link>

                                <Link
                                    href="/diary-entries"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        View Diary Entries
                                    </h5>
                                    <p className="text-gray-600">
                                        View all professors' diary entries
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900">Professor Dashboard</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Link
                                    href="/modules"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        My Modules
                                    </h5>
                                    <p className="text-gray-600">
                                        View your assigned modules
                                    </p>
                                </Link>

                                <Link
                                    href="/diary-entries"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        Diary Entries
                                    </h5>
                                    <p className="text-gray-600">
                                        Manage your diary entries
                                    </p>
                                </Link>

                                <Link
                                    href="/diary-entries/create"
                                    className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                        New Entry
                                    </h5>
                                    <p className="text-gray-600">
                                        Create a new diary entry
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
