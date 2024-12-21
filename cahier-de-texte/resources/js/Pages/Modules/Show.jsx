import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, module }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Module Details
                </h2>
            }
        >
            <Head title="Module Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Module Information</h3>
                                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{module.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{module.description || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Field</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <Link
                                                href={`/fields/${module.field.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {module.field.name}
                                            </Link>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Level</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <Link
                                                href={`/levels/${module.level.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {module.level.name}
                                            </Link>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Professor</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {module.user ? (
                                                <Link
                                                    href={`/professors/${module.user.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    {module.user.name}
                                                </Link>
                                            ) : (
                                                'Not Assigned'
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Diary Entries</h3>
                                <div className="mt-2">
                                    {module.diary_entries && module.diary_entries.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {module.diary_entries.map((entry) => (
                                                <li key={entry.id} className="py-4">
                                                    <Link
                                                        href={`/diary-entries/${entry.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {new Date(entry.session_date).toLocaleDateString()} - 
                                                        {entry.group.name}
                                                    </Link>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {entry.start_time} - {entry.end_time}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No diary entries yet</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                {auth.user.role === 'admin' && (
                                    <Link
                                        href={`/modules/${module.id}/edit`}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Edit Module
                                    </Link>
                                )}
                                <Link
                                    href="/modules"
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                >
                                    Back to Modules
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
