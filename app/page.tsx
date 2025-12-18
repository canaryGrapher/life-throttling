import { redirect } from 'next/navigation';
import { travelData } from '../data';

export default function RootPage() {
  const firstCountryId = travelData[0]?.id;

  if (!firstCountryId) {
    return null;
  }

  redirect(`/country/${firstCountryId}`);
}

