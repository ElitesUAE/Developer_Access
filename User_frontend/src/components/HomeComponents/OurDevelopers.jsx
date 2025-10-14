import AutoSlider from "./AutoSlider";

const partnerLogos = [
  {
    src: "https://cdn.cdnlogo.com/logos/a/70/amazon.svg",
    alt: "Amazon",
  },
  {
    src: "https://cdn.cdnlogo.com/logos/g/35/google.svg",
    alt: "Google",
  },
  {
    src: "https://cdn.cdnlogo.com/logos/a/53/apple.svg",
    alt: "Apple",
  },
  {
    src: "https://cdn.cdnlogo.com/logos/m/91/microsoft.svg",
    alt: "Microsoft",
  },
  {
    src: "https://cdn.cdnlogo.com/logos/s/85/samsung.svg",
    alt: "Samsung",
  },
  {
    src: "https://cdn.cdnlogo.com/logos/n/80/nike.svg",
    alt: "Nike",
  },
];

export default function DevelopersSection() {
  return (
    <AutoSlider
      images={partnerLogos}
      subtitle="Prestigious Collaborations"
      title="Our Partners"
      theme="light"
      variant="bordered"
      showGrayscale={true}
    />
  );
}
