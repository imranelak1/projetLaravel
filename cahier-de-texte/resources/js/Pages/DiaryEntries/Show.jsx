import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, diaryEntry }) {
    const canEdit = auth.user.role === 'admin' || auth.user.id === diaryEntry.user_id;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Diary Entry Details
                </h2>
            }
        >
            <Head title="Diary Entry Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Session Information</h3>
                                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Module</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <Link
                                                href={`/modules/${diaryEntry.module.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {diaryEntry.module.name}
                                            </Link>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Group</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <Link
                                                href={`/groups/${diaryEntry.group.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {diaryEntry.group.name}
                                            </Link>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Professor</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <Link
                                                href={`/professors/${diaryEntry.user.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {diaryEntry.user.name}
                                            </Link>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Session Date</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(diaryEntry.session_date).toLocaleDateString()}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Time</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {diaryEntry.start_time} - {diaryEntry.end_time}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Session Content</h3>
                                <div className="mt-2 prose max-w-none">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        {diaryEntry.content.split('\n').map((paragraph, index) => (
                                            <p key={index} className="mb-2">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                {canEdit && (
                                    <Link
                                        href={`/diary-entries/${diaryEntry.id}/edit`}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Edit Entry
                                    </Link>
                                )}
                                <Link
                                    href="/diary-entries"
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                >
                                    Back to Diary Entries
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
