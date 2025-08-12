import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { Detail } from '../../../Navbar/Navbar';

interface Props {
  className?: string;
  detail: Detail
}

export const Description = ({ className, detail }: Props) => {
  const t = useTranslations();

  const getClientTypeLabel = (clientType: string) => {
    if (clientType === 'individual') {
      return "Jismoniy shaxs";
    }
    else if (clientType === 'business') {
      return "Biznes";
    }
    // Add more conditions if needed for other types
    return clientType; // Fallback to the raw value if not matched
  };

  const getPaymentMethodLabel = (paymentMethod: string) => {
    if (paymentMethod === 'step_by_step') {
      return "Bosqichma-bosqich to'lov";
    }
    else if (paymentMethod === 'postpayment') {
      return "Ish tugagandan keyin to'lov";
    }
    else if (paymentMethod === 'prepayment') {
      return "Oldindan to'lov";
    }
    return paymentMethod; 
  };

  const tags = [
    detail.category_name,
    getClientTypeLabel(detail.client_type),
    getPaymentMethodLabel(detail.payment_method)
  ];

  return (
    <div className={cn(className, "w-full flex flex-col gap-4")}>
      <p className="text-xl font-semibold uppercase">
        {t('WorksPage.content.description.title')}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="py-1 px-3 text-sm rounded-full bg-maket-bg text-maket-gray"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-3 text-base text-maket-primary leading-relaxed">
        <p>{detail.description}</p>
      </div>
    </div>
  );
};