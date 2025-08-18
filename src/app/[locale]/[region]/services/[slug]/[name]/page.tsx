import { ServicePerson } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/ServicePerson";

export default async function HomeServicePerson({ params }: any) {
    const slug = await params.slug
    const uuid = await params.name

    return (
        <div className={'layout-width '}>
                <ServicePerson slug={slug} userUuid={uuid}/>
        </div>
    );
}
