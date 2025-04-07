import ProfileSection from "@/components/ProfileSection/ProfileSection";
import Dashboard from "@/components/Dashboard";

export default function Profile() {
    const exampleProfile = {
        username: "JohnDoe",
        password: "password123",
        rating: 4.5,
        name: "John Doe",
        email: "john.doe@example.com",
        pronouns: "he/him",
        aboutMe: "I am a software engineer and I love to code.",
        itemsSold: 10,
        itemsBought: 5,
    }
    return (
        <div>
            <Dashboard />
            <ProfileSection {...exampleProfile} />
        </div>
    )
}
