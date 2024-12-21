import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';

export default function Index({ auth, fields }) {
    const columns = [
        {
            header: 'Name',
            accessor: (field) => field.name,
        },
        {
            header: 'Description',
            accessor: (field) => field.description || 'N/A',
        },
        {
            header: 'Groups',
            accessor: (field) => field.groups?.length || 0,
        },
        {
            header: 'Modules',
            accessor: (field) => field.modules?.length || 0,
        },
    ];

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this field?')) {
            router.delete(`/fields/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Fields
                    </h2>
                    <Link
                        href="/fields/create"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Field
                    </Link>
                </div>
            }
        >
            <Head title="Fields" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        data={fields}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
