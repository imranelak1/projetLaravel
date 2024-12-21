import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputField from '@/Components/Form/InputField';
import SelectField from '@/Components/Form/SelectField';
import TextArea from '@/Components/Form/TextArea';

export default function Edit({ auth, module, fields, levels, professors }) {
    const [values, setValues] = useState({
        name: module.name || '',
        description: module.description || '',
        field_id: module.field_id || '',
        level_id: module.level_id || '',
        professor_ids: module.professors?.map(p => p.id) || [], 
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        
        if (key === 'professor_ids') {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setValues(values => ({
                ...values,
                [key]: selectedOptions,
            }));
        } else {
            setValues(values => ({
                ...values,
                [key]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('modules.update', module.id), values, {
            onError: (errors) => setErrors(errors),
            preserveScroll: true,
        });
    };

    const fieldOptions = fields.map(field => ({
        value: field.id,
        label: field.name
    }));

    const levelOptions = levels.map(level => ({
        value: level.id,
        label: level.name
    }));

    const professorOptions = professors.map(professor => ({
        value: professor.id,
        label: professor.name
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Module: {module.name}
                </h2>
            }
        >
            <Head title={`Edit Module: ${module.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <InputField
                                    label="Name"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />

                                <TextArea
                                    label="Description"
                                    id="description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    error={errors.description}
                                />

                                <SelectField
                                    label="Field"
                                    id="field_id"
                                    name="field_id"
                                    value={values.field_id}
                                    onChange={handleChange}
                                    options={fieldOptions}
                                    error={errors.field_id}
                                    required
                                />

                                <SelectField
                                    label="Level"
                                    id="level_id"
                                    name="level_id"
                                    value={values.level_id}
                                    onChange={handleChange}
                                    options={levelOptions}
                                    error={errors.level_id}
                                    required
                                />

                                <div>
                                    <label htmlFor="professor_ids" className="block text-sm font-medium text-gray-700">
                                        Professors <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="professor_ids"
                                        name="professor_ids"
                                        multiple
                                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                                            errors.professor_ids ? 'border-red-500' : ''
                                        }`}
                                        value={values.professor_ids}
                                        onChange={handleChange}
                                        required
                                        size={Math.min(professorOptions.length, 5)}
                                    >
                                        {professorOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.professor_ids && (
                                        <p className="mt-2 text-sm text-red-600">{errors.professor_ids}</p>
                                    )}
                                    <p className="mt-2 text-sm text-gray-500">
                                        Hold Ctrl (Windows) or Command (Mac) to select multiple professors
                                    </p>
                                </div>

                                <div className="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update Module
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
