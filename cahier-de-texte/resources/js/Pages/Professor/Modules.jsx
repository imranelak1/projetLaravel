import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Modules({ auth, modules, isAdmin }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Modules</h2>}
        >
            <Head title="My Modules" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {modules.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {modules.map((module) => (
                                        <div key={module.id} className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-2">{module.name}</h3>
                                            <p className="text-gray-600 mb-4">{module.description}</p>
                                            <div className="text-sm text-gray-500">
                                                <p>Field: {module.field.name}</p>
                                                <p>Level: {module.level.name}</p>
                                            </div>
                                            <div className="mt-4 space-x-2">
                                                <Link
                                                    href={route('diary-entries.create', { module: module.id })}
                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    Add Entry
                                                </Link>
                                                <Link
                                                    href={`/diary-entries?module=${module.id}`}
                                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    View Entries
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No modules assigned yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
