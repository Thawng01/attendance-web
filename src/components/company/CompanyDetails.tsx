import React, { useState } from "react";
import type { Company } from "../../../type";

const CompanyDetails = ({ company }: { company: Company }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: company?.name,
        username: company?.username,
        email: company?.email,
        description: company?.description || "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // await onUpdateCompany(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update company:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!isEditing) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Company Information
                    </h2>
                    {/* <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Edit Information
                    </button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                        </label>
                        <p className="text-gray-900 bg-white/20 backdrop-blur-md p-3 rounded-lg">
                            {company?.name}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <p className="text-gray-900 bg-white/20 backdrop-blur-md p-3 rounded-lg">
                            {company?.username}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <p className="text-gray-900 bg-white/20 backdrop-blur-md p-3 rounded-lg">
                            {company?.email}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Member Since
                        </label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            {new Date(company?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <p className="text-gray-900 bg-white/20 backdrop-blur-md p-3 rounded-lg min-h-[80px]">
                            {company?.description || "No description provided"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                    Edit Company Information
                </h2>
                <div className="space-x-3">
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setFormData({
                                name: company.name,
                                username: company.username,
                                email: company.email,
                                description: company.description || "",
                            });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Company Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Username *
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your company..."
                    />
                </div>
            </div>
        </form>
    );
};

export default CompanyDetails;
