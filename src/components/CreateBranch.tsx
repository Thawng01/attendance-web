import React, { useState } from "react";
import GradientButton from "./GradientButton";
import usePost from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CreateBranch({ isOpen, onClose }: ModalProps) {
    const [branchName, setBranchName] = useState("");

    const queryClient = useQueryClient();
    const { mutate, isPending, error } = usePost("/branches", () => {
        queryClient.invalidateQueries({ queryKey: ["/branches"] });
        setBranchName("");
        onClose();
    });

    console.log("error create : ", error);
    if (!isOpen) return null;

    const handleCreate = () => {
        if (!branchName.trim()) {
            alert("Please enter branch name");
            return;
        }

        mutate({ name: branchName });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 z-10">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                {/* Modal Form */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Create New Branch
                </h2>
                <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="Enter branch name"
                    className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none mb-4 text-gray-800"
                />

                <GradientButton onClick={handleCreate} disabled={isPending}>
                    {isPending ? "Creating..." : "Create Branch"}
                </GradientButton>
            </div>
        </div>
    );
}
