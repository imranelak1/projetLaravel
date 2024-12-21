import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, modules, canCreate = true, canEdit = true, canDelete = true }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Modules
                    </h2>
                    {canCreate && (
                        <Link
                            href={route('modules.create')}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Create Module
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Modules" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {modules.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Field
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Level
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Professors
                                                </th>
                                                {(canEdit || canDelete) && (
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {modules.map((module) => (
                                                <tr key={module.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {module.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {module.field.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {module.level.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {module.professors.length > 0 ? (
                                                            <ul>
                                                                {module.professors.map((professor) => (
                                                                    <li key={professor.id}>{professor.name}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="text-gray-500">Not Assigned</span>
                                                        )}
                                                    </td>
                                                    {(canEdit || canDelete) && (
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                            {canEdit && (
                                                                <Link
                                                                    href={route('modules.edit', module.id)}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Edit
                                                                </Link>
                                                            )}
                                                            {canDelete && (
                                                                <Link
                                                                    href={route('modules.destroy', module.id)}
                                                                    method="delete"
                                                                    as="button"
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Delete
                                                                </Link>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">No modules found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
