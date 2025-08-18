import {Service} from "@/root/ui/dev/components/shared/tamplates/Services/Service/Service";

export default async function HomeServicePage({params}: any) {
    const slug = await params.slug

    return (
        <div className={'layout-width'}>
            <Service slug={slug} />
        </div>
    );
}
