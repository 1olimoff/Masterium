// components/FilterBar/FilterBarServer.tsx
import FilterBarClient from "./FilterBarClient";

interface Props {
    catalogs: string[];
    locations: string[];
}

export default function FilterBarServer({ catalogs, locations }: Props) {
    // Можно делать любую дополнительную логику на сервере.
    // Но чаще всего хватит простого «проброса» пропсов
    return <FilterBarClient catalogs={catalogs} locations={locations} />;
}
