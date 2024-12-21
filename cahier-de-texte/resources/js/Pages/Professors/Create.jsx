import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputField from '@/Components/Form/InputField';

export default function Create({ auth }) {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/professors', values, {
            onError: (errors) => setErrors(errors),
            onSuccess: () => router.visit('/professors'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Professor
                </h2>
            }
        >
            <Head title="Add Professor" />

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

                                <InputField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    required
                                />

                                <InputField
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    type="password"
                                    value={values.password_confirmation}
                                    onChange={handleChange}
                                    error={errors.password_confirmation}
                                    required
                                />

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Create Professor Account
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
