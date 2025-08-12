import { cn } from '@/root/business/lib/utils';
import { openWorksList } from '@/root/business/api/main/openWorks/openWorksList';
import { OpenWorksClient } from './OpenWorksClient';

interface Props {
  className?: string;
}

export const OpenWorks = async ({ className }: Props) => {

  const openWorks = await openWorksList();
  
  return (
    <section className={cn(className, 'w-full flex flex-col gap-4 md:gap-6')}>
      <OpenWorksClient openWorks={openWorks} />
    </section>
  );
};