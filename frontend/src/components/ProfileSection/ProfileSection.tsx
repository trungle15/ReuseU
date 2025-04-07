import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router";
import EditProfileModal from "./EditProfileModal";

interface ProfileProps {
    username: string,
    password: string,
    rating: number,
    name: string,
    email: string,
    pronouns: string,
    aboutMe: string,
    itemsSold: number,
    itemsBought: number,
}

interface ProfileData {
    username: string,
    name: string,
    email: string,
    pronouns: string,
    aboutMe: string,
}

const ProfileSection: React.FC<ProfileProps> = ({username, password, rating, name, email, pronouns, aboutMe, itemsSold, itemsBought}) => {
    const router = useRouter();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        username,
        name,
        email,
        pronouns,
        aboutMe
    });

    const handleBack = () => {
        router.back();
    }

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    }

    const handleSaveProfile = (newData: ProfileData) => {
        setProfileData(newData);
        setIsEditModalOpen(false);
        // TODO: Add API call to save profile changes
    }

    return (
        <div className="flex justify-center h-screen">
            <div className="grid grid-cols-8 gap-4 items-center w-full max-w-5xl mx-auto">
                <div className="col-span-4">
                    <div className="flex flex-col gap-4">
                        <UserCircleIcon className="w-128 h-128" />
                        <span className="text-2xl font-bold">Username: {profileData.username}</span>
                        <span className="text-2xl font-bold">Password: {password}</span>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex flex-col gap-4">
                        <span className="text-2xl font-bold">Rating: {rating}</span>
                        <span className="text-2xl font-bold">Name: {profileData.name}</span>
                        <span className="text-2xl font-bold">Email: {profileData.email}</span>
                        <span className="text-2xl font-bold">Pronouns: {profileData.pronouns}</span>
                        <span className="text-2xl font-bold">About Me: {profileData.aboutMe}</span>
                        <span className="text-2xl font-bold">Items sold: {itemsSold}</span>
                        <span className="text-2xl font-bold">Items bought: {itemsBought}</span>
                    </div>
                </div>
                <div className="col-span-8 flex justify-end gap-4">
                    <button 
                        onClick={handleBack}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Back
                    </button>
                    <button 
                        onClick={handleEditClick}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#2A9FD0] rounded-md hover:bg-[#2589B4]"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveProfile}
                initialData={profileData}
            />
        </div>
    );
}

export default ProfileSection;