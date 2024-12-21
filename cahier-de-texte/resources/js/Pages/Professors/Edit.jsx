import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputField from '@/Components/Form/InputField';

export default function Edit({ auth, professor }) {
    const [values, setValues] = useState({
        name: professor.name,
        email: professor.email,
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/professors/${professor.id}`, values, {
            onError: (errors) => setErrors(errors),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Professor
                </h2>
            }
        >
            <Head title="Edit Professor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    label="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />

                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                />

                                <div className="mt-6 border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                                    <p className="mt-1 text-sm text-gray-500">Leave blank to keep current password</p>

                                    <InputField
                                        label="New Password"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />

                                    <InputField
                                        label="Confirm New Password"
                                        name="password_confirmation"
                                        type="password"
                                        value={values.password_confirmation}
                                        onChange={handleChange}
                                        error={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Update Professor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
