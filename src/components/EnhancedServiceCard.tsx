import Image from 'next/image';

type EnhancedServiceCardProps = {
  title: string;
  description: string;
  benefits: string[];
  imageSrc: string;
  imageAlt?: string;
  reverse?: boolean; // Para alternar imagen/texto
};

export default function EnhancedServiceCard({
  title,
  description,
  benefits,
  imageSrc,
  imageAlt = '',
  reverse = false,
}: EnhancedServiceCardProps) {
  return (
    <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-center bg-white shadow-md rounded-xl overflow-hidden mb-10`}>
      {/* Texto */}
      <div className="w-full lg:w-1/2 p-8">
        <h3 className="text-primary text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-2 text-foreground text-sm">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Imagen */}
      <div className="w-full lg:w-1/2">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
