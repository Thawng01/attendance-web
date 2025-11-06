import CompanyInfo from "@/components/company/CompanyInfo";
import { useAuth } from "@/contexts/AuthContext";

const CompanyDetailPage = () => {
    const { user } = useAuth();

    if (!user) return;

    return (
        <div>
            <CompanyInfo company={user} />
        </div>
    );
};

export default CompanyDetailPage;
