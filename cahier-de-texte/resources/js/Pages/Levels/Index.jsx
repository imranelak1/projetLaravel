import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';

export default function Index({ auth, levels }) {
    const columns = [
        {
            header: 'Name',
            accessor: (level) => level.name,
        },
        {
            header: 'Description',
            accessor: (level) => level.description || 'N/A',
        },
        {
            header: 'Groups',
            accessor: (level) => level.groups?.length || 0,
        },
        {
            header: 'Modules',
            accessor: (level) => level.modules?.length || 0,
        },
    ];

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this level?')) {
            router.delete(`/levels/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Levels
                    </h2>
                    <Link
                        href="/levels/create"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Level
                    </Link>
                </div>
            }
        >
            <Head title="Levels" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        data={levels}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
