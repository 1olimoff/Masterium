import { ServicePerson } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/ServicePerson";
import Head from "next/head";

export default async function HomeServicePerson({ params, slug }: any) {
    const user_uuid = await params.name
    const userslug = await params.slug

    return (
        <div className={'layout-width px-2'}>
                <ServicePerson slug={userslug} userUuid={user_uuid} />
        </div>
    );
}
