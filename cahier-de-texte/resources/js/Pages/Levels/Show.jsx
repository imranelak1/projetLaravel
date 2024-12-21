import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, level }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Level Details
                </h2>
            }
        >
            <Head title="Level Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Level Information</h3>
                                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{level.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{level.description || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Groups</h3>
                                <div className="mt-2">
                                    {level.groups && level.groups.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {level.groups.map((group) => (
                                                <li key={group.id} className="py-4">
                                                    <Link
                                                        href={`/groups/${group.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {group.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No groups assigned</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Modules</h3>
                                <div className="mt-2">
                                    {level.modules && level.modules.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {level.modules.map((module) => (
                                                <li key={module.id} className="py-4">
                                                    <Link
                                                        href={`/modules/${module.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {module.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No modules assigned</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link
                                    href={`/levels/${level.id}/edit`}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Edit Level
                                </Link>
                                <Link
                                    href="/levels"
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                >
                                    Back to Levels
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
