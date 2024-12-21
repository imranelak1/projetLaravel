import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, group }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Group Details
                </h2>
            }
        >
            <Head title="Group Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Group Information</h3>
                                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{group.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Field</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <Link
                                                href={`/fields/${group.field.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {group.field.name}
                                            </Link>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Level</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <Link
                                                href={`/levels/${group.level.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {group.level.name}
                                            </Link>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Diary Entries</h3>
                                <div className="mt-2">
                                    {group.diary_entries && group.diary_entries.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {group.diary_entries.map((entry) => (
                                                <li key={entry.id} className="py-4">
                                                    <Link
                                                        href={`/diary-entries/${entry.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {new Date(entry.session_date).toLocaleDateString()} - {entry.module.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No diary entries yet</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link
                                    href={`/groups/${group.id}/edit`}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Edit Group
                                </Link>
                                <Link
                                    href="/groups"
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                >
                                    Back to Groups
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
