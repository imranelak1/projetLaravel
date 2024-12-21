import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, professor }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Professor Details
                </h2>
            }
        >
            <Head title="Professor Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Professor Information</h3>
                                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{professor.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{professor.email}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Assigned Modules</h3>
                                <div className="mt-2">
                                    {professor.modules && professor.modules.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {professor.modules.map((module) => (
                                                <li key={module.id} className="py-4">
                                                    <Link
                                                        href={`/modules/${module.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {module.name} - {module.field.name} ({module.level.name})
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No modules assigned</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Recent Diary Entries</h3>
                                <div className="mt-2">
                                    {professor.diary_entries && professor.diary_entries.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {professor.diary_entries.map((entry) => (
                                                <li key={entry.id} className="py-4">
                                                    <Link
                                                        href={`/diary-entries/${entry.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {new Date(entry.session_date).toLocaleDateString()} - 
                                                        {entry.module.name} ({entry.group.name})
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No diary entries yet</p>
                                    )}
                                </div>
                            </div>

                            {auth.user.role === 'admin' && (
                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={`/professors/${professor.id}/edit`}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Edit Professor
                                    </Link>
                                    <Link
                                        href="/professors"
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                    >
                                        Back to Professors
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
