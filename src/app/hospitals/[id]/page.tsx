import { notFound } from 'next/navigation';
import { HOSPITALS, DOCTORS } from '@/data/mockData';
import { HospitalDetailClient } from './HospitalDetailClient';

export async function generateStaticParams() {
  return HOSPITALS.map((h) => ({
    id: h.id,
  }));
}

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
  const hospital = HOSPITALS.find(h => h.id === params.id);

  if (!hospital) {
    return notFound();
  }

  const hospitalDoctors = DOCTORS.filter(d => d.hospitalId === hospital.id);

  return <HospitalDetailClient hospital={hospital} hospitalDoctors={hospitalDoctors} />;
}
